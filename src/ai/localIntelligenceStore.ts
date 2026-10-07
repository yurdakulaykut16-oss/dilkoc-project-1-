const DB_NAME = 'dilkoc-local-intelligence';
const STORE = 'answer-cache';

function openLegacyDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise(resolve => {
    try {
      const request = indexedDB.open(DB_NAME);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'key' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/** Purges Q/A records saved by older versions; the agent no longer reads or writes this cache. */
export async function clearLocalAnswerCache(): Promise<void> {
  try {
    const db = await openLegacyDb();
    if (!db) return;
    try {
      if (!db.objectStoreNames.contains(STORE)) return;
      const transaction = db.transaction(STORE, 'readwrite');
      transaction.objectStore(STORE).clear();
      await new Promise<void>(resolve => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => resolve();
        transaction.onabort = () => resolve();
      });
    } finally {
      db.close();
    }
  } catch {
    // Storage can be blocked in private or embedded browsing; no new prompts or answers are written.
  }
}
