import type { LocalRussianAnswer } from './localRussianAgent';

export const LOCAL_INTELLIGENCE_MAX_BYTES = 1024 * 1024 * 1024;
export const LOCAL_INTELLIGENCE_MAX_LABEL = '1 GB';
const BUILT_IN_KNOWLEDGE_RESERVE_BYTES = 32 * 1024 * 1024;
const PERSISTENT_CACHE_MAX_BYTES = LOCAL_INTELLIGENCE_MAX_BYTES - BUILT_IN_KNOWLEDGE_RESERVE_BYTES;

const DB_NAME = 'dilkoc-local-intelligence';
const DB_VERSION = 1;
const STORE = 'answer-cache';
// LocalRussianAnswer şekli değiştiğinde (followUps / depth alanları) bu sürüm artırılır;
// böylece eski önbellek kayıtları otomatik olarak geçersizleşir.
const CACHE_VERSION = 2;

type CachedAnswerRecord = {
  key: string;
  answer: LocalRussianAnswer;
  bytes: number;
  createdAt: number;
  lastUsed: number;
  version: number;
};

const memoryCache = new Map<string, LocalRussianAnswer>();

function normalizeKey(query: string, focusTitle: string) {
  return `${CACHE_VERSION}:${focusTitle.toLocaleLowerCase('tr-TR')}:${query.toLocaleLowerCase('tr-TR').trim().replace(/\s+/g, ' ')}`;
}

function estimateBytes(value: unknown) {
  return new Blob([JSON.stringify(value)]).size;
}

function openDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise(resolve => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'key' });
        store.createIndex('lastUsed', 'lastUsed');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

function requestResult<T>(request: IDBRequest<T>): Promise<T | null> {
  return new Promise(resolve => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

export async function getLocalAnswerCache(query: string, focusTitle: string): Promise<LocalRussianAnswer | null> {
  const key = normalizeKey(query, focusTitle);
  const memory = memoryCache.get(key);
  if (memory) return memory;
  const db = await openDb();
  if (!db) return null;
  const transaction = db.transaction(STORE, 'readonly');
  const record = await requestResult(transaction.objectStore(STORE).get(key)) as CachedAnswerRecord | null;
  db.close();
  if (!record || record.version !== CACHE_VERSION) return null;
  memoryCache.set(key, record.answer);
  return record.answer;
}

async function enforceOneGbLimit(db: IDBDatabase) {
  const read = db.transaction(STORE, 'readonly');
  const records = await requestResult(read.objectStore(STORE).getAll()) as CachedAnswerRecord[] | null;
  if (!records?.length) return;
  let total = records.reduce((sum, record) => sum + record.bytes, 0);
  if (total <= PERSISTENT_CACHE_MAX_BYTES) return;

  const oldestFirst = [...records].sort((a, b) => a.lastUsed - b.lastUsed);
  const write = db.transaction(STORE, 'readwrite');
  const store = write.objectStore(STORE);
  for (const record of oldestFirst) {
    if (total <= PERSISTENT_CACHE_MAX_BYTES) break;
    store.delete(record.key);
    memoryCache.delete(record.key);
    total -= record.bytes;
  }
}

export async function putLocalAnswerCache(query: string, focusTitle: string, answer: LocalRussianAnswer): Promise<void> {
  const key = normalizeKey(query, focusTitle);
  memoryCache.set(key, answer);
  const db = await openDb();
  if (!db) return;
  const now = Date.now();
  const record: CachedAnswerRecord = {
    key,
    answer,
    bytes: estimateBytes({ key, answer }),
    createdAt: now,
    lastUsed: now,
    version: CACHE_VERSION,
  };
  const transaction = db.transaction(STORE, 'readwrite');
  transaction.objectStore(STORE).put(record);
  await new Promise<void>(resolve => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => resolve();
    transaction.onabort = () => resolve();
  });
  await enforceOneGbLimit(db);
  db.close();
}
