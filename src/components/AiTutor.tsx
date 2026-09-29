import { SpeechRecognition as NativeSpeechRecognition } from '@capacitor-community/speech-recognition';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_WORDS, UNITS_DATA } from '../curriculumData';
import type { UnitModule, WordDetail } from '../curriculumData';
// MICROSOFT EDGE TTS — BİRİNCİL SES: botun Türkçe konuşmaları tr-TR-Emel/AhmetNeural,
// Rusça telaffuzları ru-RU-Svetlana/DmitryNeural ile okunur (Rotam ekranından seçilir).
import { webSpeak } from '../tts/webSpeech';
import AiChat from './AiChat';
import { getBotVoiceProfile, speakWithBotVoice } from '../tts/voiceStudio';

type CoachMistake = { id: string; ru: string; tr: string; reason: string };
type CoachSrsItem = { ru: string; tr: string; box: number; nextReview: number; type: 'word' | 'letter' };
type SpeechLang = 'tr-TR' | 'ru-RU';
type TaskKind = 'tr_to_ru' | 'ru_to_tr' | 'sentence_to_tr';
type ResponseMode = 'voice' | 'text';

type SpeechPart = {
  text: string;
  lang: SpeechLang;
  rate: number;
};

type MouthViseme = 'rest' | 'closed' | 'open' | 'wide' | 'round' | 'teeth' | 'smile';

type CandidateWord = {
  ru: string;
  tr: string;
  reading?: string;
  source: string;
  priority: number;
};

type CandidateSentence = {
  ru: string;
  tr: string;
  source: string;
};

type LearningFocus = {
  pathPosition: number;
  pathTotal: number;
  title: string;
  icon: string;
  description?: string;
  words: { ru: string; tr: string; reading?: string }[];
  sentences: { ru: string; tr: string }[];
};

type AiTask = {
  id: string;
  kind: TaskKind;
  title: string;
  botInstruction: string;
  ru: string;
  tr: string;
  reading?: string;
  source: string;
  expectedLang: SpeechLang;
  showRussianBeforeAnswer: boolean;
  shouldSpeakRussianInPrompt: boolean;
};

type AttemptRecord = {
  correct: boolean;
  transcript: string;
  feedback: string;
};

type ChatMessage = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  tone?: 'good' | 'bad' | 'neutral';
};

type EvaluationResult = {
  correct: boolean;
  message: string;
  spoken: string;
  details: string[];
};

type RecognitionAlternative = { transcript: string; confidence?: number };
type RecognitionResult = { readonly length: number; readonly isFinal?: boolean; [index: number]: RecognitionAlternative };
type RecognitionResultList = { readonly length: number; [index: number]: RecognitionResult };
type RecognitionEventLike = Event & { results: RecognitionResultList };
type RecognitionErrorEventLike = Event & { error?: string; message?: string };
type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: RecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
};
type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;
type PuterAudioApi = {
  ai?: {
    txt2speech?: (text: string, languageOrOptions?: string | Record<string, unknown>, options?: Record<string, unknown>) => Promise<HTMLAudioElement>;
  };
};

const AI_PROGRESS_KEY = 'RUSSIAN_AI_COACH_DAILY_V1';
const TURKISH_STOP_WORDS = new Set(['bir', 've', 'ile', 'de', 'da', 'mi', 'mı', 'mu', 'mü', 'ben', 'sen', 'o', 'bu', 'şu', 'için', 'gibi']);

// ElevenLabs tarafı opsiyonel yapılandırılır: Android/SPA içine gizli anahtar gömmek güvenli değildir.
// En temiz kullanım: VITE_ELEVENLABS_PROXY_URL ile kendi güvenli proxy'nize ses isteği göndermek.
// Yine de geliştirme için VITE_ELEVENLABS_API_KEY verilirse Adam adlı ücretsiz erkek sesine bağlanır.
const AI_ENV = ((import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env || {});
const ELEVENLABS_FREE_MALE_VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ'; // Kullanıcının istediği ElevenLabs bot sesi
const ELEVENLABS_MODEL_ID = AI_ENV.VITE_ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
const ELEVENLABS_VOICE_ID = AI_ENV.VITE_ELEVENLABS_VOICE_ID || ELEVENLABS_FREE_MALE_VOICE_ID;
const ELEVENLABS_PROXY_URL = AI_ENV.VITE_ELEVENLABS_PROXY_URL;
const ELEVENLABS_API_KEY = AI_ENV.VITE_ELEVENLABS_API_KEY;
const PUTER_TTS_ENABLED = AI_ENV.VITE_DISABLE_PUTER_TTS !== 'true';
// PC'de bulut AI ses servisi cevap vermezse uygulama tamamen sessiz kalmasın diye
// tarayıcı/cihaz sesi yedek olarak açık. Asıl öncelik yine internet AI sesleri.
// İstersen .env.local içine VITE_ALLOW_DEVICE_TTS=false yazarak yedeği kapatabilirsin.
const ALLOW_DEVICE_TTS_FALLBACK = AI_ENV.VITE_ALLOW_DEVICE_TTS !== 'false';
let puterScriptPromise: Promise<void> | null = null;

export interface AiTutorProps {
  completedUnits: string[];
  completedTopics: string[];
  completedAlpha: string[];
  completedGrammar: string[];
  learningFocus: LearningFocus;
  mistakes: CoachMistake[];
  srsBank: CoachSrsItem[];
  addMistake: (ru: string, tr: string, reason: string) => void;
  addToSRS: (ru: string, tr: string, type: 'word' | 'letter') => void;
  onEarnXp: (amount: number) => void;
}

function hasCyrillic(text: string) {
  return /[\u0400-\u04FF]/.test(text);
}

function stableHash(text: string) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: T[], seed: number) {
  const arr = [...items];
  const random = mulberry32(seed || 1);
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeRu(text: string) {
  return text
    .toLocaleLowerCase('ru-RU')
    .replace(/ё/g, 'е')
    .replace(/[.,!?;:()\[\]{}«»"'`´’‘“”\-—–]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeTr(text: string) {
  return text
    .replace(/\([^)]*\)/g, ' ')
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:()\[\]{}«»"'`´’‘“”\-—–]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(text: string, lang: SpeechLang) {
  const normal = lang === 'ru-RU' ? normalizeRu(text) : normalizeTr(text);
  return normal
    .split(' ')
    .map((x) => x.trim())
    .filter((x) => x.length > 1 && (lang === 'ru-RU' || !TURKISH_STOP_WORDS.has(x)));
}

function levenshtein(a: string, b: string) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

// Kapsama (substring) kontrolü tek başına kullanılınca çok kısa cevaplar yanlışlıkla
// DOĞRU sayılıyordu: beklenen "как дела" iken kullanıcı sadece "да" dese
// expected.includes(heard) true dönüyordu. Artık kapsama, uzunluk oranı yeterliyse geçerli.
function containsMatch(heard: string, expected: string) {
  if (!heard || !expected) return false;
  const longer = Math.max(heard.length, expected.length);
  const shorter = Math.min(heard.length, expected.length);
  if (shorter / longer < 0.6) return false;
  return heard.includes(expected) || expected.includes(heard);
}

function similarity(a: string, b: string) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const max = Math.max(a.length, b.length);
  return Math.max(0, 1 - levenshtein(a, b) / max);
}

function uniquePush(map: Map<string, CandidateWord>, word: CandidateWord) {
  const key = normalizeRu(word.ru);
  if (!key || !hasCyrillic(word.ru)) return;
  const current = map.get(key);
  if (!current || word.priority > current.priority) map.set(key, word);
}

function wordFromAllWords(ru: string): WordDetail | undefined {
  return ALL_WORDS.find((w) => normalizeRu(w.ru) === normalizeRu(ru));
}

function buildDailyPlan(params: {
  completedUnits: string[];
  completedTopics: string[];
  completedAlpha: string[];
  completedGrammar: string[];
  learningFocus: LearningFocus;
  mistakes: CoachMistake[];
  srsBank: CoachSrsItem[];
}) {
  const day = todayKey();
  const progressSalt = `${params.completedUnits.length}-${params.completedTopics.length}-${params.completedAlpha.length}-${params.completedGrammar.length}`;
  const seed = stableHash(`${day}-${progressSalt}`);
  const completedUnitModules = UNITS_DATA.filter((u) => params.completedUnits.includes(u.id));
  const currentUnit = UNITS_DATA.find((u) => !params.completedUnits.includes(u.id)) || UNITS_DATA[UNITS_DATA.length - 1];
  const activeUnits: UnitModule[] = Array.from(new Map([currentUnit, ...completedUnitModules.slice(-3)].map((u) => [u.id, u])).values());
  const wordMap = new Map<string, CandidateWord>();
  const focus = params.learningFocus;
  const focusSource = `${focus.icon} Şu an: Ünite ${focus.pathPosition}/${focus.pathTotal} • ${focus.title}`;

  // En yüksek öncelik: haritadaki tek sıra öğrenme yolunda kullanıcının gerçekten bulunduğu kart.
  // Bu kart harf, fonetik dinleme, gramer veya müfredat ünitesi olabilir.
  focus.words.forEach((word) => {
    uniquePush(wordMap, {
      ru: word.ru,
      tr: word.tr,
      reading: word.reading,
      source: focusSource,
      priority: 6,
    });
  });

  // Eğer mevcut kart bir gramer açıklaması gibi doğrudan kelime taşımıyorsa, yakın müfredat ünitesiyle destekle.
  if (wordMap.size === 0) {
    currentUnit.words.slice(0, 8).forEach((word) => {
      uniquePush(wordMap, {
        ru: word.ru,
        tr: word.tr,
        reading: word.reading,
        source: `${currentUnit.icon} Yaklaşan kelime desteği: ${currentUnit.title}`,
        priority: 3,
      });
    });
  }

  params.srsBank
    .filter((item) => item.type === 'word' && item.nextReview <= Date.now())
    .forEach((item) => {
      const word = wordFromAllWords(item.ru);
      uniquePush(wordMap, {
        ru: item.ru,
        tr: item.tr,
        reading: word?.reading,
        source: `Bugünkü tekrar • Kutu ${item.box}/5`,
        priority: 5,
      });
    });

  params.mistakes.forEach((mistake) => {
    const word = wordFromAllWords(mistake.ru);
    uniquePush(wordMap, {
      ru: mistake.ru,
      tr: mistake.tr,
      reading: word?.reading,
      source: `Unutulanlar • ${mistake.reason}`,
      priority: 4,
    });
  });

  activeUnits.forEach((unit) => {
    unit.words.forEach((word) => {
      uniquePush(wordMap, {
        ru: word.ru,
        tr: word.tr,
        reading: word.reading,
        source: `${unit.icon} Ünite ${unit.unitNumber}: ${unit.title}`,
        priority: 2,
      });
    });
  });

  if (wordMap.size < 6) {
    ALL_WORDS.slice(0, 12).forEach((word) => {
      uniquePush(wordMap, {
        ru: word.ru,
        tr: word.tr,
        reading: word.reading,
        source: 'Başlangıç güvenli havuzu',
        priority: 1,
      });
    });
  }

  const sortedWords = seededShuffle(Array.from(wordMap.values()), seed).sort((a, b) => b.priority - a.priority);
  const focusSentenceCandidates: CandidateSentence[] = focus.sentences.map((sentence) => ({
    ru: sentence.ru,
    tr: sentence.tr,
    source: focusSource,
  }));
  const supportingSentences: CandidateSentence[] = activeUnits.flatMap((unit) =>
    unit.sentences.map((sentence) => ({
      ru: sentence.ru,
      tr: sentence.tr,
      source: `${unit.icon} Ünite ${unit.unitNumber}: ${unit.title}`,
    })),
  );
  const sentenceCandidates: CandidateSentence[] = [
    ...focusSentenceCandidates,
    ...supportingSentences.filter((sentence) => !focusSentenceCandidates.some((focusSentence) => normalizeRu(focusSentence.ru) === normalizeRu(sentence.ru))),
  ];
  const dailySentences = seededShuffle(sentenceCandidates, seed + 97);
  const tasks: AiTask[] = [];

  sortedWords.slice(0, 6).forEach((word, index) => {
    if (index % 2 === 0) {
      tasks.push({
        id: `${day}-tr-to-ru-${stableHash(word.ru + word.tr)}`,
        kind: 'tr_to_ru',
        title: 'Türkçeden Rusçaya söyle',
        botInstruction: `Şunu Rusça söyle: ${word.tr}. Hazır olunca Bas Konuş'a dokun.`,
        ru: word.ru,
        tr: word.tr,
        reading: word.reading,
        source: word.source,
        expectedLang: 'ru-RU',
        showRussianBeforeAnswer: false,
        shouldSpeakRussianInPrompt: false,
      });
    } else {
      tasks.push({
        id: `${day}-ru-to-tr-${stableHash(word.ru + word.tr)}`,
        kind: 'ru_to_tr',
        title: 'Duyduğunu Türkçeye çevir',
        botInstruction: 'Şimdi bir Rusça kelime söyleyeceğim. Türkçesini söyle.',
        ru: word.ru,
        tr: word.tr,
        reading: word.reading,
        source: word.source,
        expectedLang: 'tr-TR',
        showRussianBeforeAnswer: false,
        shouldSpeakRussianInPrompt: true,
      });
    }
  });

  dailySentences.slice(0, 3).forEach((sentence) => {
    const kind: TaskKind = 'sentence_to_tr';
    tasks.push({
      id: `${day}-${kind}-${stableHash(sentence.ru + sentence.tr)}`,
      kind,
      title: 'Cümleyi Türkçeye çevir',
      botInstruction: 'Şimdi bir Rusça cümle söyleyeceğim. Anlamını Türkçe söyle.',
      ru: sentence.ru,
      tr: sentence.tr,
      source: sentence.source,
      expectedLang: 'tr-TR',
      showRussianBeforeAnswer: false,
      shouldSpeakRussianInPrompt: true,
    });
  });

  return seededShuffle(tasks, seed + 211).slice(0, 8);
}

function getSpeechRecognitionConstructor() {
  if (typeof window === 'undefined') return undefined;
  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
}

// Mikrofonun neden açılmadığını AYIRT ETMEK gerekir; eskiden her hata tek bir
// "izin reddedildi" mesajına düşüyordu ve kullanıcı çözümü bulamıyordu.
type MicIssue = 'ok' | 'iframe' | 'insecure' | 'unsupported' | 'denied' | 'no-device' | 'busy' | 'unknown';

function isInsideIframe() {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    // Cross-origin iframe erişimi engellerse zaten iframe içindeyiz demektir.
    return true;
  }
}

// Arena/CodeSandbox gibi ortamlar uygulamayı cross-origin iframe içinde gösterir.
// iframe etiketinde allow="microphone" yoksa tarayıcı izin penceresini HİÇ açmadan
// reddeder; bu durumda tek çözüm sayfayı yeni sekmede açmaktır.
function iframeMicAllowed() {
  if (!isInsideIframe()) return true;
  const featurePolicy = (document as Document & {
    featurePolicy?: { allowsFeature: (feature: string) => boolean };
  }).featurePolicy;
  try {
    if (featurePolicy?.allowsFeature) return featurePolicy.allowsFeature('microphone');
  } catch {
    /* tarayıcı desteklemiyorsa aşağıdaki varsayıma düş */
  }
  const permissionsPolicy = (document as Document & {
    permissionsPolicy?: { allowsFeature: (feature: string) => boolean };
  }).permissionsPolicy;
  try {
    if (permissionsPolicy?.allowsFeature) return permissionsPolicy.allowsFeature('microphone');
  } catch {
    /* yoksay */
  }
  // Tespit edemiyorsak izin varmış gibi deneriz; gerçek hata aşağıda yakalanır.
  return true;
}

function micIssueMessage(issue: MicIssue) {
  switch (issue) {
    case 'iframe':
      return 'Mikrofon burada engelli: uygulama bir önizleme çerçevesi (iframe) içinde açık ve çerçeveye mikrofon izni verilmemiş. Tarayıcı izin penceresini bu yüzden hiç göstermiyor. “Yeni sekmede aç” butonuna bas; orada mikrofon sorunsuz çalışır. Bu arada yazılı cevap alanını kullanabilirsin.';
    case 'insecure':
      return 'Mikrofon yalnızca güvenli bağlantıda (https veya localhost) çalışır. Sayfa http üzerinden açık olduğu için tarayıcı mikrofonu kapatıyor. https adresini kullan ya da yazılı cevap ver.';
    case 'unsupported':
      return 'Bu tarayıcı mikrofon erişimini desteklemiyor. Chrome/Edge kullan veya aşağıdaki yazılı cevap alanından devam et.';
    case 'denied':
      return 'Mikrofon izni reddedilmiş. Adres çubuğundaki kilit simgesi → Site ayarları → Mikrofon: “İzin ver” yapıp sayfayı yenile.';
    case 'no-device':
      return 'Bilgisayarda kullanılabilir bir mikrofon bulunamadı. Mikrofonu tak, sistem ses ayarlarından giriş cihazını seç ve tekrar dene.';
    case 'busy':
      return 'Mikrofon başka bir uygulama tarafından kullanılıyor (Zoom, Discord, Meet vb.). O uygulamayı kapatıp tekrar dene.';
    default:
      return 'Mikrofon başlatılamadı. Yeni sekmede açmayı dene ya da yazılı cevap alanını kullan.';
  }
}

async function ensureBrowserMicPermission(): Promise<MicIssue> {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return 'unsupported';
  if (!window.isSecureContext && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'insecure';
  }
  if (!iframeMicAllowed()) return 'iframe';
  // Güvensiz bağlam ve izinsiz iframe'lerde mediaDevices tanımsız olur; eskiden bu
  // durumda fonksiyon "true" dönüp hatayı gizliyordu.
  if (!navigator.mediaDevices?.getUserMedia) return isInsideIframe() ? 'iframe' : 'unsupported';
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return 'ok';
  } catch (error) {
    const name = (error as { name?: string })?.name || '';
    if (name === 'NotFoundError' || name === 'OverconstrainedError') return 'no-device';
    if (name === 'NotReadableError' || name === 'AbortError') return 'busy';
    if (name === 'NotAllowedError' || name === 'SecurityError') return isInsideIframe() ? 'iframe' : 'denied';
    return isInsideIframe() ? 'iframe' : 'unknown';
  }
}

function loadStoredAttempts(day: string) {
  try {
    const raw = localStorage.getItem(AI_PROGRESS_KEY);
    if (!raw) return {} as Record<string, AttemptRecord>;
    const parsed = JSON.parse(raw) as { day?: string; attempts?: Record<string, AttemptRecord> };
    return parsed.day === day && parsed.attempts ? parsed.attempts : {};
  } catch {
    return {} as Record<string, AttemptRecord>;
  }
}

function taskPromptParts(task: AiTask, index: number, total: number): SpeechPart[] {
  const order = `${index + 1}. görev, ${total} görevden.`;
  const parts: SpeechPart[] = [{ text: `${order} ${task.botInstruction}`, lang: 'tr-TR', rate: 1 }];
  if (task.shouldSpeakRussianInPrompt) {
    parts.push({ text: task.ru, lang: 'ru-RU', rate: task.kind === 'sentence_to_tr' ? 0.92 : 0.96 });
  }
  parts.push({ text: task.expectedLang === 'ru-RU' ? 'Şimdi Bas Konuş butonuna bas ve Rusça cevap ver.' : 'Şimdi Bas Konuş butonuna bas ve Türkçe cevap ver.', lang: 'tr-TR', rate: 1 });
  return parts;
}

function evaluateTask(task: AiTask, transcript: string): EvaluationResult {
  if (task.expectedLang === 'ru-RU') {
    const expected = normalizeRu(task.ru);
    const heard = normalizeRu(transcript);
    const expectedTokens = tokens(task.ru, 'ru-RU');
    const heardTokens = tokens(transcript, 'ru-RU');
    const tokenHits = expectedTokens.filter((word) => heardTokens.includes(word)).length;
    const tokenRecall = expectedTokens.length === 0 ? 0 : tokenHits / expectedTokens.length;
    const closeEnough = containsMatch(heard, expected) || similarity(heard, expected) >= 0.72 || tokenRecall >= 0.72;
    const missing = expectedTokens.filter((word) => !heardTokens.includes(word));
    if (closeEnough) {
      return {
        correct: true,
        message: `✅ Harika! Cihaz seni “${transcript}” diye duydu. Hedef: “${task.ru}”. Telaffuzun anlaşılır görünüyor.`,
        spoken: 'Harika, bu anlaşılırdı. Rusça cevabın hedefe yeterince yakın. Bir sonraki göreve geçebiliriz.',
        details: task.reading ? [`Okunuş ipucu: ${task.reading}`] : [],
      };
    }
    const missingText = missing.length > 0 ? ` Eksik ya da kaymış bölüm: ${missing.join(', ')}.` : '';
    return {
      correct: false,
      message: `❌ Henüz tam değil. Ben “${transcript}” duydum; beklenen “${task.ru}”.${missingText}`,
      spoken: `Henüz tam değil. Beklenen cevap ${task.ru}. ${task.reading ? `Okunuş ipucu: ${task.reading}.` : ''} Kelimeyi bölmeden, tek akışta ve net tekrar dene.`,
      details: [
        `Doğru Rusça: ${task.ru}`,
        task.reading ? `Okunuş: ${task.reading}` : 'İpucu: Kelimeyi bölmeden, tek akışta ve net tekrar et.',
        'Not: Telaffuz kontrolü, cihazın konuşmanı hangi metne çevirdiğine göre yapılır.',
      ],
    };
  }

  const expected = normalizeTr(task.tr);
  const heard = normalizeTr(transcript);
  const expectedTokens = tokens(task.tr, 'tr-TR');
  const heardTokens = tokens(transcript, 'tr-TR');
  const tokenHits = expectedTokens.filter((word) => heardTokens.includes(word)).length;
  const tokenRecall = expectedTokens.length === 0 ? 0 : tokenHits / expectedTokens.length;
  const closeEnough = containsMatch(heard, expected) || similarity(heard, expected) >= 0.68 || tokenRecall >= 0.58;
  const missing = expectedTokens.filter((word) => !heardTokens.includes(word));
  if (closeEnough) {
    return {
      correct: true,
      message: `✅ Doğru! “${task.ru}” için Türkçe cevabın kabul edildi: “${transcript}”.`,
      spoken: 'Doğru, çevirin anlam olarak kabul edildi. Güzel ilerliyorsun.',
      details: [`Beklenen anlam: ${task.tr}`],
    };
  }
  return {
    correct: false,
    message: `❌ Çeviri yanlış ya da eksik. Ben “${transcript}” duydum. Doğru cevap: “${task.tr}”.`,
    spoken: `Çeviride hata var. Doğru cevap: ${task.tr}. ${missing.length > 0 ? `Özellikle şu anlam parçaları eksik: ${missing.join(', ')}.` : 'Cümledeki ana anlamı tekrar düşün.'}`,
    details: [
      `Rusça: ${task.ru}`,
      `Doğru Türkçe: ${task.tr}`,
      missing.length > 0 ? `Eksik anlam parçaları: ${missing.join(', ')}` : 'İpucu: Önce yüklemi, sonra kişi/nesne bilgisini yakala.',
    ],
  };
}

function splitSpeechText(text: string) {
  // Bulut AI TTS uzun metni tek seferde daha akıcı okur; küçük parçalara bölmek
  // konuşmada gereksiz duraklama yapıyordu. Bu yüzden sınır yüksek tutuldu.
  const maxLen = 950;
  const chunks: string[] = [];
  let rest = text.trim();
  while (rest.length > maxLen) {
    const marks = [rest.lastIndexOf('. ', maxLen), rest.lastIndexOf('! ', maxLen), rest.lastIndexOf('? ', maxLen), rest.lastIndexOf(', ', maxLen)];
    const cut = Math.max(...marks);
    const idx = cut > 160 ? cut + 1 : maxLen;
    chunks.push(rest.slice(0, idx).trim());
    rest = rest.slice(idx).trim();
  }
  if (rest) chunks.push(rest);
  return chunks;
}

function visemeForChar(char: string): MouthViseme {
  const c = char.toLocaleLowerCase('tr-TR');
  if (!c.trim() || /[.,!?;:]/.test(c)) return 'rest';
  if ('bmpбпм'.includes(c)) return 'closed';
  if ('aıаая'.includes(c)) return 'open';
  if ('eiиеэы'.includes(c)) return 'wide';
  if ('ouöüоуюё'.includes(c)) return 'round';
  if ('fvszşjчцсзжшщх'.includes(c)) return 'teeth';
  if ('rlйyğ'.includes(c)) return 'smile';
  return 'wide';
}

function visemeDelayForChar(char: string, lang: SpeechLang, rate: number) {
  const base = lang === 'tr-TR' ? 72 : 78;
  if (/[.,!?]/.test(char)) return 150;
  if (/[,;:]/.test(char)) return 115;
  if (!char.trim()) return 54;
  return Math.max(38, Math.round(base / Math.max(0.75, rate)));
}

async function playAudioBlob(blob: Blob, rate: number, onStart?: () => void) {
  const url = URL.createObjectURL(blob);
  try {
    await new Promise<void>((resolve, reject) => {
      const audio = new Audio(url);
      audio.playbackRate = Math.min(1.08, Math.max(0.88, rate));
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error('audio-playback-failed'));
      const playPromise = audio.play();
      onStart?.();
      void playPromise.catch(reject);
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function loadPuterScript() {
  if (!PUTER_TTS_ENABLED || typeof window === 'undefined') return false;
  const puterWindow = window as Window & { puter?: PuterAudioApi };
  if (puterWindow.puter?.ai?.txt2speech) return true;
  if (!puterScriptPromise) {
    puterScriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-puter-js="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('puter-script-error')), { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      script.dataset.puterJs = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('puter-script-error'));
      document.head.appendChild(script);
    });
  }
  await puterScriptPromise;
  return Boolean(puterWindow.puter?.ai?.txt2speech);
}

async function speakWithPuter(text: string, _lang: SpeechLang, rate: number, onStart?: () => void) {
  if (!(await loadPuterScript())) return false;
  const puterWindow = window as Window & { puter?: PuterAudioApi };
  // Puter sağlayıcılarında bilinmeyen opsiyonlar bazen çağrıyı düşürebiliyor.
  // Bu yüzden PC'de konuşmanın kesin başlaması için dokümantasyondaki sade parametreleri kullanıyoruz.
  const language = _lang;
  const cloudVoices: Record<string, unknown>[] = [
    // 1) Ana ses: kullanıcının verdiği ElevenLabs voice ID.
    {
      provider: 'elevenlabs',
      language,
      voice: ELEVENLABS_VOICE_ID,
      model: ELEVENLABS_MODEL_ID,
    },
    // 2) Yedek: ElevenLabs v3 desteklenirse daha performanslı/karakterli okuma verir.
    {
      provider: 'elevenlabs',
      language,
      voice: ELEVENLABS_VOICE_ID,
      model: 'eleven_v3',
    },
    // 3) Google/device değil; internet AI ses yedeği olarak Speechify kullan.
    {
      provider: 'speechify',
      language,
      model: 'simba-multilingual',
      voice: 'hugh_32',
    },
    {
      provider: 'speechify',
      language,
      model: 'simba-multilingual',
      voice: 'dominic_32',
    },
    // 4) Son internet AI yedeği: xAI. Google TTS bilerek bulut yedeği yapılmıyor.
    {
      provider: 'xai',
      language,
      voice: 'leo',
      output_format: 'mp3',
    },
  ];

  for (const options of cloudVoices) {
    try {
      const audio = await puterWindow.puter?.ai?.txt2speech?.(text, options);
      if (!audio) continue;
      audio.playbackRate = Math.min(1.06, Math.max(0.92, rate));
      audio.volume = 1;
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error('puter-audio-playback-failed'));
        const playPromise = audio.play();
        onStart?.();
        void playPromise.catch(reject);
      });
      return true;
    } catch (error) {
      console.warn('Puter cloud TTS provider fallback:', error);
    }
  }
  return false;
}

async function speakWithElevenLabs(text: string, lang: SpeechLang, rate: number, onStart?: () => void) {
  if (!ELEVENLABS_PROXY_URL && !ELEVENLABS_API_KEY) return false;
  const body = {
    text,
    voiceId: ELEVENLABS_VOICE_ID,
    modelId: ELEVENLABS_MODEL_ID,
    lang,
    voice_settings: {
      stability: 0.34,
      similarity_boost: 0.86,
      style: 0.58,
      use_speaker_boost: true,
    },
  };
  const response = ELEVENLABS_PROXY_URL
    ? await fetch(ELEVENLABS_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    : await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
        method: 'POST',
        headers: {
          Accept: 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY || '',
        },
        body: JSON.stringify({
          text,
          model_id: ELEVENLABS_MODEL_ID,
          voice_settings: body.voice_settings,
        }),
      });
  if (!response.ok) throw new Error(`elevenlabs-tts-${response.status}`);
  await playAudioBlob(await response.blob(), rate, onStart);
  return true;
}

// NOT: Eski elle yazılmış ses seçme/yükleme yardımcıları (voiceScore, getSpeechVoices)
// kaldırıldı; bu iş artık src/tts/webSpeech.ts içindeki ortak motorda yapılıyor.
async function speakWithWebSpeech(text: string, lang: SpeechLang, rate: number, onStart?: () => void) {
  // Ortak tarayıcı motoru: ses listesi bekleme, uzun metin bölme, Chrome'un
  // 15 saniyede susma hatasına karşı keep-alive ve dil bazlı ses seçimi içerir.
  return webSpeak(text, {
    lang,
    rate,
    pitch: lang === 'tr-TR' ? 0.95 : 1,
    onChunkStart: () => onStart?.(),
  });
}

async function speakOne(text: string, lang: SpeechLang, rate: number, onChunkStart?: (chunk: string) => void, onChunkEnd?: () => void) {
  const chunks = splitSpeechText(text);
  for (const chunk of chunks) {
    // 1) Önce gerçek VoiceStudio yerel profil/modeli; model henüz hazır değilse
    // seçili cloud AI profili denenir. Hiçbir aşamada Edge websocket TTS yoktur.
    try {
      if (PUTER_TTS_ENABLED && await speakWithBotVoice(chunk, rate, () => onChunkStart?.(chunk))) {
        onChunkEnd?.();
        continue;
      }
    } catch (error) {
      onChunkEnd?.();
      console.warn('VoiceStudio AI TTS fallback:', error);
    }
    // 2) Yerel/cloud AI sağlayıcıları başarısızsa aşağıda Puter proxy ve
    // cihazın diline göre seçilen Web Speech son çare olarak kullanılır.
    try {
      if (await speakWithPuter(chunk, lang, rate, () => onChunkStart?.(chunk))) {
        onChunkEnd?.();
        continue;
      }
    } catch (error) {
      onChunkEnd?.();
      console.warn('Puter TTS fallback:', error);
    }
    try {
      if (await speakWithElevenLabs(chunk, lang, rate, () => onChunkStart?.(chunk))) {
        onChunkEnd?.();
        continue;
      }
    } catch (error) {
      onChunkEnd?.();
      console.warn('ElevenLabs TTS fallback:', error);
    }
    // Asıl amaç internet AI sesi. PC'de bulut servisleri o an cevap vermezse uygulama sessiz kalmasın.
    if (!ALLOW_DEVICE_TTS_FALLBACK) {
      // Ağız animasyonu sonsuza kadar açık kalmasın diye burada da kapatılır.
      onChunkEnd?.();
      console.warn('Cloud AI TTS başarısız oldu; cihaz TTS fallback kapalı olduğu için konuşma atlandı.');
      continue;
    }
    if (await speakWithWebSpeech(chunk, lang, rate, () => onChunkStart?.(chunk))) {
      onChunkEnd?.();
      continue;
    }
    onChunkEnd?.();
    try {
      onChunkStart?.(chunk);
      await TextToSpeech.speak({
        text: chunk,
        lang,
        rate,
        pitch: 1,
        volume: 1,
        category: 'playback',
      });
      onChunkEnd?.();
    } catch {
      onChunkEnd?.();
      // Son çare: bu cihazda hiç TTS yoksa sessizce devam et.
    }
  }
}

export default function AiTutor({
  completedUnits,
  completedTopics,
  completedAlpha,
  completedGrammar,
  learningFocus,
  mistakes,
  srsBank,
  addMistake,
  addToSRS,
  onEarnXp,
}: AiTutorProps) {
  const day = useMemo(() => todayKey(), []);
  // Plan verisi her render'da tazelenir; böylece kullanıcı haritada ilerleyince
  // koç hâlâ eski üniteyi sormaz. Plan YALNIZCA oturum başlamadan yeniden kurulur,
  // yani ders ortasında sorular değişip akış bozulmaz.
  const planData = useRef({ completedUnits, completedTopics, completedAlpha, completedGrammar, learningFocus, mistakes, srsBank });
  planData.current = { completedUnits, completedTopics, completedAlpha, completedGrammar, learningFocus, mistakes, srsBank };
  const focusKey = `${learningFocus.pathPosition}|${learningFocus.title}|${completedUnits.length}|${completedTopics.length}|${completedAlpha.length}|${completedGrammar.length}`;
  const [planKey, setPlanKey] = useState(focusKey);
  const tasks = useMemo(() => buildDailyPlan(planData.current), [planKey]);
  const focus = learningFocus;
  const elevenLabsEnabled = Boolean(ELEVENLABS_PROXY_URL || ELEVENLABS_API_KEY);
  // Botun ana sesi VoiceStudio paletindeki seçili AI sesidir; Edge websocket
  // TTS kullanılmaz. Yerel model hazır değilse seçili cloud, sonra cihaz dili.
  const ttsBadge = useMemo(() => {
    const profile = getBotVoiceProfile();
    if (PUTER_TTS_ENABLED) {
      return { label: `🎚️ ${profile.label}`, hint: 'VoiceStudio yerel profili öncelikli; Edge TTS kullanılmıyor.' };
    }
    if (elevenLabsEnabled) return { label: '🎙️ ElevenLabs proxy aktif', hint: 'ElevenLabs proxy yapılandırılmış.' };
    return { label: ALLOW_DEVICE_TTS_FALLBACK ? '🔊 Cihaz dili fallback açık' : '🔇 AI ses bekleniyor', hint: 'VoiceStudio modeli hazır olduğunda seçili profil kullanılacak.' };
  }, [elevenLabsEnabled]);
  const [attempts, setAttempts] = useState<Record<string, AttemptRecord>>(() => loadStoredAttempts(day));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState('Koç hazır. Başlatınca Türkçe konuşacak, Rusça görev verecek.');
  const [lastResult, setLastResult] = useState<EvaluationResult | null>(null);
  const [manualAnswer, setManualAnswer] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [micHelpVisible, setMicHelpVisible] = useState(false);
  const [micIssue, setMicIssue] = useState<MicIssue>('ok');
  // iframe içindeysek mikrofon zaten çalışmayacak; kullanıcıyı butona basıp
  // hayal kırıklığına uğramadan önce uyar.
  const [embedded] = useState(() => isInsideIframe());
  const [mouthViseme, setMouthViseme] = useState<MouthViseme>('rest');
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const speechRunRef = useRef(0);
  // isSpeaking/isListening state'leri asenkron geri çağrılarda (konuşma tanıma sonucu,
  // native plugin promise'i) ESKİ değerle yakalanıyordu; bu yüzden cevaplar bazen
  // sessizce yutuluyordu. Ref'ler her zaman güncel değeri verir.
  const isSpeakingRef = useRef(false);
  const isListeningRef = useRef(false);
  const messageSeqRef = useRef(0);
  const autoAdvanceRef = useRef<number | null>(null);
  const lipSyncTimerRef = useRef<number | null>(null);
  const recognitionSupported = Boolean(getSpeechRecognitionConstructor());
  const currentTask = tasks[currentIndex];
  const completedToday = tasks.filter((task) => attempts[task.id]?.correct).length;
  const finishedToday = tasks.length > 0 && completedToday === tasks.length;

  useEffect(() => {
    localStorage.setItem(AI_PROGRESS_KEY, JSON.stringify({ day, attempts }));
  }, [attempts, day]);

  useEffect(() => {
    if (sessionStarted || focusKey === planKey) return;
    setPlanKey(focusKey);
    setCurrentIndex(0);
    setLastResult(null);
  }, [focusKey, planKey, sessionStarted]);

  useEffect(() => {
    if (sessionStarted) return;
    const next = tasks.findIndex((task) => !attempts[task.id]?.correct);
    setCurrentIndex(next === -1 ? 0 : next);
  }, [attempts, sessionStarted, tasks]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      if (lipSyncTimerRef.current !== null) window.clearTimeout(lipSyncTimerRef.current);
      if (autoAdvanceRef.current !== null) window.clearTimeout(autoAdvanceRef.current);
      void NativeSpeechRecognition.stop().catch(() => undefined);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      void TextToSpeech.stop();
    };
  }, []);

  const addMessage = (role: 'bot' | 'user', text: string, tone: ChatMessage['tone'] = 'neutral') => {
    // Eski kimlik `${Date.now()}-${prev.length}` idi; liste 9 mesajda sabitlendiği için
    // aynı milisaniyede eklenen mesajlar AYNI React key'ini alıp uyarı/kaybolma yapıyordu.
    messageSeqRef.current += 1;
    const id = `msg-${messageSeqRef.current}`;
    setMessages((prev) => [...prev, { id, role, text, tone }].slice(-9));
  };

  const stopLipSync = () => {
    if (lipSyncTimerRef.current !== null) {
      window.clearTimeout(lipSyncTimerRef.current);
      lipSyncTimerRef.current = null;
    }
    setMouthViseme('rest');
  };

  const beginLipSync = (text: string, lang: SpeechLang, rate: number) => {
    stopLipSync();
    const letters = Array.from(text.length > 0 ? text : ' ');
    let index = 0;
    const tick = () => {
      const char = letters[index % letters.length];
      setMouthViseme(visemeForChar(char));
      index += 1;
      lipSyncTimerRef.current = window.setTimeout(tick, visemeDelayForChar(char, lang, rate));
    };
    tick();
  };

  const mouthShapes: Record<MouthViseme, React.CSSProperties> = {
    rest: { width: '34px', height: '7px', borderRadius: '999px', top: '95px', background: '#061226' },
    closed: { width: '36px', height: '5px', borderRadius: '999px', top: '97px', background: '#061226' },
    open: { width: '30px', height: '30px', borderRadius: '50%', top: '86px', background: '#061226' },
    wide: { width: '50px', height: '14px', borderRadius: '999px', top: '93px', background: '#061226' },
    round: { width: '27px', height: '27px', borderRadius: '50%', top: '87px', background: '#061226' },
    teeth: { width: '44px', height: '12px', borderRadius: '9px', top: '94px', background: 'linear-gradient(180deg, #f8fafc 0 42%, #061226 43% 100%)' },
    smile: { width: '44px', height: '13px', borderRadius: '0 0 999px 999px', top: '94px', background: '#061226' },
  };

  const stopListeningIfNeeded = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    void NativeSpeechRecognition.stop().catch(() => undefined);
    isListeningRef.current = false;
    setIsListening(false);
  };

  const setSpeaking = (value: boolean) => {
    isSpeakingRef.current = value;
    setIsSpeaking(value);
  };

  const setListening = (value: boolean) => {
    isListeningRef.current = value;
    setIsListening(value);
  };

  const cancelAutoAdvance = () => {
    if (autoAdvanceRef.current !== null) {
      window.clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  };

  const speakParts = async (parts: SpeechPart[]) => {
    const runId = speechRunRef.current + 1;
    speechRunRef.current = runId;
    stopListeningIfNeeded();
    setSpeaking(true);
    setStatusText('Yapay zeka konuşuyor… Bas Konuş kilitli.');
    try {
      try { await TextToSpeech.stop(); } catch { /* native TTS olmayabilir */ }
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      for (const part of parts) {
        if (speechRunRef.current !== runId) return;
        await speakOne(
          part.text,
          part.lang,
          part.rate,
          (chunk) => beginLipSync(chunk, part.lang, part.rate),
          stopLipSync,
        );
      }
    } finally {
      if (speechRunRef.current === runId) {
        stopLipSync();
        setSpeaking(false);
        setStatusText('Sıra sende. Bas Konuş sadece dokunduğunda dinler.');
      }
    }
  };

  const playTaskPrompt = async (task: AiTask, index: number) => {
    const visiblePrompt = task.showRussianBeforeAnswer
      ? `${task.botInstruction} “${task.ru}”`
      : task.botInstruction;
    addMessage('bot', visiblePrompt);
    await speakParts(taskPromptParts(task, index, tasks.length));
  };

  const startSession = () => {
    if (!currentTask) return;
    cancelAutoAdvance();
    setSessionStarted(true);
    setLastResult(null);
    setStatusText('Yapay zeka konuşuyor…');
    addMessage('bot', `Merhaba! Şu an öğrenme yolunda ${focus.pathPosition}. ünitedesin: ${focus.title}. Bugünkü soruları bu konumuna göre hazırladım.`);
    void speakParts([
      { text: `Merhaba! Ben Türkçe konuşan Rusça koçunum. Şu an öğrenme yolunda ${focus.pathPosition}. ünitedesin: ${focus.title}. Bugün bu karttan ve tekrar havuzundan ${tasks.length} kısa görev yaptıracağım. Ben konuşurken mikrofon kapalı kalacak.`, lang: 'tr-TR', rate: 1 },
    ]).then(() => playTaskPrompt(currentTask, currentIndex));
  };

  const handleTranscript = (transcript: string, mode: ResponseMode) => {
    // Eskiden buradaki `isSpeaking` kontrolü ESKİ state'i okuyordu ve mikrofondan
    // gelen cevap bazen sessizce yok sayılıyordu. Artık güncel ref okunuyor.
    if (!currentTask || isSpeakingRef.current) return;
    const cleanTranscript = transcript.trim();
    if (!cleanTranscript) return;
    cancelAutoAdvance();
    stopListeningIfNeeded();
    setManualAnswer('');
    setLastResult(null);
    addMessage('user', `${mode === 'voice' ? '🎙️' : '⌨️'} ${cleanTranscript}`);
    const evaluation = evaluateTask(currentTask, cleanTranscript);
    setLastResult(evaluation);
    setAttempts((prev) => ({ ...prev, [currentTask.id]: { correct: evaluation.correct, transcript: cleanTranscript, feedback: evaluation.message } }));
    addMessage('bot', evaluation.message, evaluation.correct ? 'good' : 'bad');
    if (evaluation.correct) {
      onEarnXp(currentTask.kind === 'sentence_to_tr' ? 14 : 10);
      if (currentTask.kind !== 'sentence_to_tr') addToSRS(currentTask.ru, currentTask.tr, 'word');
    } else {
      addMistake(
        currentTask.ru,
        currentTask.tr,
        currentTask.expectedLang === 'ru-RU' ? 'AI Koç Telaffuz/Rusça Üretim Hatası' : 'AI Koç Çeviri Hatası',
      );
    }
    const speech: SpeechPart[] = [{ text: evaluation.spoken, lang: 'tr-TR', rate: 1 }];
    if (!evaluation.correct && currentTask.expectedLang === 'ru-RU') speech.push({ text: currentTask.ru, lang: 'ru-RU', rate: 0.92 });
    const answeredId = currentTask.id;
    void speakParts(speech).then(() => {
      // Doğru cevaptan sonra kullanıcı "→" butonuna basmak zorunda kalıyordu ve
      // akış duruyordu. Artık koç kendi kendine sıradaki göreve geçip soruyu okur.
      if (!evaluation.correct) return;
      cancelAutoAdvance();
      autoAdvanceRef.current = window.setTimeout(() => {
        autoAdvanceRef.current = null;
        if (isSpeakingRef.current || isListeningRef.current) return;
        if (tasks[currentIndex]?.id !== answeredId) return;
        goNext();
      }, 900);
    });
  };

  const startListening = async () => {
    if (!currentTask || isSpeakingRef.current || isListeningRef.current) return;
    cancelAutoAdvance();
    setMicHelpVisible(false);
    setListening(true);
    setStatusText(currentTask.expectedLang === 'ru-RU' ? 'Dinliyorum… Rusça söyle.' : 'Dinliyorum… Türkçe cevap ver.');

    // Android Studio / APK içinde Web Speech çoğu cihazda "not-allowed" verir.
    // Bu yüzden önce Capacitor'ın native konuşma tanıma plugin'ini deneriz; web preview'da
    // plugin yoksa otomatik olarak tarayıcı Web Speech fallback'ine geçer.
    try {
      const availability = await NativeSpeechRecognition.available();
      if (availability.available) {
        const permission = await NativeSpeechRecognition.checkPermissions().catch(() => ({ speechRecognition: 'prompt' as const }));
        if (permission.speechRecognition !== 'granted') {
          const requested = await NativeSpeechRecognition.requestPermissions();
          if (requested.speechRecognition !== 'granted') {
            setListening(false);
            setMicHelpVisible(true);
            setStatusText('Mikrofon izni verilmedi. Android ayarlarından mikrofon iznini aç veya yazılı cevap alanını kullan.');
            return;
          }
        }
        const result = await NativeSpeechRecognition.start({
          language: currentTask.expectedLang,
          maxResults: 3,
          popup: false,
          partialResults: false,
          prompt: currentTask.expectedLang === 'ru-RU' ? 'Rusça cevabını söyle' : 'Türkçe cevabını söyle',
        });
        setListening(false);
        const transcript = result.matches?.[0] || '';
        if (transcript) handleTranscript(transcript, 'voice');
        else setStatusText('Ses anlaşılmadı. Tekrar Bas Konuş veya yazılı cevap alanını kullan.');
        return;
      }
    } catch {
      // Web ortamında plugin "not implemented" diyebilir; sorun değil, aşağıdaki fallback çalışır.
      // Native taraf yarıda kaldıysa mikrofon oturumunu kapat ki buton kilitli kalmasın.
      void NativeSpeechRecognition.stop().catch(() => undefined);
    }

    const Recognition = getSpeechRecognitionConstructor();
    if (!Recognition) {
      setListening(false);
      setMicIssue('unsupported');
      setMicHelpVisible(true);
      setStatusText('Bu cihaz/tarayıcı konuşma tanımayı desteklemiyor. Aşağıdaki yazılı cevap alanını kullanabilirsin.');
      return;
    }
    // Teşhis olumsuz olsa bile VAZGEÇMEYİZ: bazı tarayıcılarda getUserMedia
    // sondası başarısız olsa da webkitSpeechRecognition kendi izin akışıyla
    // çalışabiliyor. Bu yüzden uyarıyı gösterip yine de varsayılan tarayıcı
    // API'siyle denemeye devam ederiz; gerçek sonucu recognition.onerror verir.
    const micState = await ensureBrowserMicPermission();
    if (micState !== 'ok') {
      setMicIssue(micState);
      setMicHelpVisible(true);
      setStatusText(`${micIssueMessage(micState)} Yine de tarayıcının kendi mikrofon iznini deniyorum…`);
      if (micState === 'unsupported' || micState === 'no-device') {
        setListening(false);
        return;
      }
    }
    try {
      const recognition = new Recognition();
      recognitionRef.current = recognition;
      recognition.lang = currentTask.expectedLang;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;
      recognition.onresult = (event) => {
        // Tarayıcı API'si çalıştı: önceki uyarı kutusunu kaldır.
        setMicHelpVisible(false);
        setMicIssue('ok');
        const transcript = event.results[0]?.[0]?.transcript || '';
        handleTranscript(transcript, 'voice');
      };
      recognition.onerror = (event) => {
        setListening(false);
        const code = event.error || event.message || 'izin ya da bağlantı hatası';
        if (code === 'not-allowed' || code === 'service-not-allowed') {
          const issue: MicIssue = isInsideIframe() ? 'iframe' : 'denied';
          setMicIssue(issue);
          setMicHelpVisible(true);
          setStatusText(micIssueMessage(issue));
          return;
        }
        if (code === 'no-speech') {
          setStatusText('Ses algılanmadı. Mikrofona biraz daha yakın konuş ya da yazılı cevap alanını kullan.');
          return;
        }
        setStatusText(`Mikrofon dinlemesi durdu: ${code}.`);
      };
      recognition.onend = () => {
        setListening(false);
        recognitionRef.current = null;
      };
      recognition.start();
    } catch {
      setListening(false);
      setStatusText('Mikrofon başlatılamadı. Android ayarlarından mikrofon iznini kontrol et veya yazılı cevap ver.');
    }
  };

  const requestBrowserMicAccess = async () => {
    setStatusText('Mikrofon izni tekrar isteniyor… Tarayıcı izin penceresi açılırsa İzin Ver seç.');
    const state = await ensureBrowserMicPermission();
    setMicIssue(state);
    setMicHelpVisible(state !== 'ok');
    setStatusText(state === 'ok'
      ? 'Mikrofon izni alındı. Şimdi Bas Konuş ile tekrar dene.'
      : micIssueMessage(state));
  };

  const openCoachInNewTab = () => {
    if (typeof window === 'undefined') return;
    // iframe içindeyken window.location zaten uygulamanın kendi adresidir; onu
    // yeni sekmede açmak mikrofonu üst sayfanın izin kısıtından kurtarır.
    const target = window.location.href;
    const opened = window.open(target, '_blank', 'noopener,noreferrer');
    if (!opened) {
      // Pop-up engellendiyse kullanıcı adresi elle kopyalayabilsin.
      setStatusText(`Yeni sekme açılamadı (pop-up engelli olabilir). Bu adresi tarayıcında elle aç: ${target}`);
    }
  };

  const goNext = () => {
    cancelAutoAdvance();
    if (tasks.length === 0) return;
    const nextIndex = tasks.findIndex((task, index) => index > currentIndex && !attempts[task.id]?.correct);
    const fallbackIndex = tasks.findIndex((task) => !attempts[task.id]?.correct);
    const targetIndex = nextIndex !== -1 ? nextIndex : fallbackIndex;
    if (targetIndex === -1) {
      setLastResult(null);
      setStatusText('Bugünkü yapay zeka tekrarın tamamlandı. Harika iş!');
      void speakParts([{ text: 'Bugünkü yapay zeka tekrarın tamamlandı. Harika iş çıkardın!', lang: 'tr-TR', rate: 1 }]);
      return;
    }
    setCurrentIndex(targetIndex);
    setLastResult(null);
    void playTaskPrompt(tasks[targetIndex], targetIndex);
  };

  const retryCurrent = () => {
    cancelAutoAdvance();
    if (!currentTask) return;
    setLastResult(null);
    void playTaskPrompt(currentTask, currentIndex);
  };

  const submitManual = (event: React.FormEvent) => {
    event.preventDefault();
    handleTranscript(manualAnswer, 'text');
  };

  const resetDailyCoach = () => {
    cancelAutoAdvance();
    stopListeningIfNeeded();
    speechRunRef.current += 1;
    setSpeaking(false);
    setAttempts({});
    setCurrentIndex(0);
    setLastResult(null);
    setMessages([]);
    setSessionStarted(false);
    setStatusText('Günlük koç sıfırlandı. Başlatınca yeniden konuşacağım.');
  };

  if (tasks.length === 0 || !currentTask) {
    return (
      <div>
        <h2 style={{ marginTop: 0 }}>🤖 Yapay Zeka Koçu</h2>
        <p style={{ color: '#cbd5e1' }}>Şu an görev üretilemedi. Önce haritadan birkaç kelime/ünite tamamla, sonra tekrar gel.</p>
      </div>
    );
  }

  return (
    <div>
      <AiChat
        completedUnits={completedUnits}
        completedTopics={completedTopics}
        completedAlpha={completedAlpha}
        completedGrammar={completedGrammar}
        learningFocus={learningFocus}
        mistakes={mistakes}
        srsBank={srsBank}
      />
      <style>{`
        @keyframes planetIntro { 0% { transform: translateY(42px) scale(.72) rotate(-9deg); opacity: 0; } 55% { transform: translateY(-18px) scale(1.08) rotate(5deg); opacity: 1; } 78% { transform: translateY(7px) scale(.98) rotate(-2deg); } 100% { transform: translateY(0) scale(1) rotate(0); opacity: 1; } }
        @keyframes planetFloat { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-14px) rotate(1deg); } }
        @keyframes planetRing { 0% { transform: translate(-50%, -50%) rotate(-15deg) scaleX(1); } 50% { transform: translate(-50%, -50%) rotate(-10deg) scaleX(1.05); } 100% { transform: translate(-50%, -50%) rotate(-15deg) scaleX(1); } }
        @keyframes planetListen { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,.55), 0 0 42px rgba(56,189,248,.28); } 50% { box-shadow: 0 0 0 20px rgba(34,197,94,0), 0 0 58px rgba(34,197,94,.36); } }
        @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes starBlink { 0%, 100% { opacity: .28; transform: scale(.86); } 50% { opacity: 1; transform: scale(1.12); } }
        @keyframes planetHappy { 0%, 100% { transform: translateY(0) scale(1); } 35% { transform: translateY(-18px) scale(1.08); } 65% { transform: translateY(4px) scale(.98); } }
        @keyframes planetWrong { 0%, 100% { transform: translateX(0) rotate(0); } 20% { transform: translateX(-9px) rotate(-3deg); } 45% { transform: translateX(8px) rotate(3deg); } 70% { transform: translateX(-5px) rotate(-1.5deg); } }
        .praktika-stage { position: relative; min-height: 620px; overflow: hidden; border-radius: 28px; padding: 18px; background: radial-gradient(circle at 50% 18%, rgba(56,189,248,.26), transparent 26%), radial-gradient(circle at 20% 80%, rgba(245,158,11,.12), transparent 28%), linear-gradient(180deg, #050816 0%, #0f172a 55%, #111827 100%); border: 1px solid rgba(125,211,252,.25); box-shadow: inset 0 0 80px rgba(14,165,233,.08), 0 22px 60px rgba(0,0,0,.28); }
        .stage-stars span { position: absolute; width: 4px; height: 4px; border-radius: 999px; background: #dbeafe; animation: starBlink 2.8s ease-in-out infinite; }
        .stage-stars span:nth-child(1) { left: 13%; top: 18%; animation-delay: .1s; }
        .stage-stars span:nth-child(2) { left: 78%; top: 15%; animation-delay: .7s; }
        .stage-stars span:nth-child(3) { left: 88%; top: 45%; animation-delay: 1.1s; }
        .stage-stars span:nth-child(4) { left: 18%; top: 54%; animation-delay: 1.6s; }
        .stage-stars span:nth-child(5) { left: 62%; top: 72%; animation-delay: 2s; }
        .stage-topbar { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; position: relative; z-index: 3; }
        .coach-pill { display: inline-flex; align-items: center; gap: 7px; padding: 7px 10px; border-radius: 999px; background: rgba(15,23,42,.72); border: 1px solid rgba(148,163,184,.22); color: #cbd5e1; font-size: 12px; font-weight: 900; backdrop-filter: blur(10px); }
        .planet-wrap { min-height: 270px; display: grid; place-items: center; position: relative; z-index: 2; margin: 16px 0 8px; }
        .planet-avatar { position: relative; width: 230px; height: 230px; display: grid; place-items: center; filter: drop-shadow(0 28px 50px rgba(14,165,233,.22)); }
        .planet-avatar.happy { animation: planetHappy .7s cubic-bezier(.2,1.25,.45,1); }
        .planet-avatar.wrong { animation: planetWrong .55s ease-in-out; }
        .planet-avatar.listening { animation: planetListen 1.25s ease-in-out infinite; border-radius: 50%; }
        .planet-orbit { position: absolute; inset: -34px; border: 1px dashed rgba(125,211,252,.22); border-radius: 50%; animation: orbitSpin 18s linear infinite; }
        .planet-ring { position: absolute; left: 50%; top: 51%; width: 318px; height: 74px; transform: translate(-50%, -50%) rotate(-15deg); border-radius: 50%; background: linear-gradient(90deg, transparent 0%, rgba(250,204,21,.18) 15%, #facc15 36%, #fde68a 50%, #f59e0b 65%, rgba(250,204,21,.16) 84%, transparent 100%); box-shadow: 0 0 24px rgba(245,158,11,.28); animation: planetRing 3.6s ease-in-out infinite; }
        .planet-ring::after { content: ''; position: absolute; inset: 18px 34px; border-radius: 50%; background: #071122; box-shadow: inset 0 0 24px rgba(14,165,233,.12); }
        .planet-core { position: relative; width: 156px; height: 156px; border-radius: 50%; background: radial-gradient(circle at 30% 20%, #eff6ff 0 10%, #7dd3fc 25%, #2563eb 60%, #1e3a8a 100%); border: 3px solid rgba(191,219,254,.55); overflow: hidden; animation: planetIntro .95s cubic-bezier(.2,1.35,.38,1) both, planetFloat 4.2s ease-in-out .95s infinite; box-shadow: inset -22px -28px 42px rgba(15,23,42,.38), inset 12px 12px 24px rgba(255,255,255,.24); }
        .planet-core::before { content: ''; position: absolute; left: -18px; top: 42px; width: 200px; height: 42px; background: rgba(255,255,255,.16); transform: rotate(-18deg); border-radius: 999px; }
        .planet-core::after { content: ''; position: absolute; right: 24px; bottom: 22px; width: 24px; height: 24px; border-radius: 50%; background: rgba(14,165,233,.35); box-shadow: -58px -46px 0 8px rgba(59,130,246,.22), -20px 20px 0 5px rgba(96,165,250,.24); }
        .planet-face { position: absolute; inset: 0; z-index: 2; }
        .planet-eye { position: absolute; top: 56px; width: 17px; height: 22px; border-radius: 999px; background: #061226; box-shadow: inset 3px 5px 0 rgba(255,255,255,.18); }
        .planet-eye.left { left: 48px; }
        .planet-eye.right { right: 48px; }
        .clock-tick { position: absolute; left: 50%; top: 50%; width: 4px; height: 18px; border-radius: 999px; background: rgba(6,18,38,.82); transform-origin: 50% 0; box-shadow: 0 1px 0 rgba(255,255,255,.18); }
        .clock-tick.t1 { transform: rotate(0deg) translateY(-68px); }
        .clock-tick.t2 { transform: rotate(45deg) translateY(-68px); }
        .clock-tick.t3 { transform: rotate(90deg) translateY(-68px); }
        .clock-tick.t4 { transform: rotate(135deg) translateY(-68px); }
        .clock-tick.t5 { transform: rotate(180deg) translateY(-68px); }
        .clock-tick.t6 { transform: rotate(225deg) translateY(-68px); }
        .clock-tick.t7 { transform: rotate(270deg) translateY(-68px); }
        .clock-tick.t8 { transform: rotate(315deg) translateY(-68px); }
        .planet-mouth { position: absolute; left: 50%; transform: translateX(-50%); box-shadow: inset 0 -4px 0 rgba(255,255,255,.08), 0 1px 0 rgba(255,255,255,.10); transition: width .075s linear, height .075s linear, top .075s linear, border-radius .075s linear, background .075s linear; }
        .task-panel { position: relative; z-index: 3; margin: 0 auto; max-width: 620px; border-radius: 24px; padding: 18px; background: rgba(15,23,42,.72); border: 1px solid rgba(148,163,184,.18); backdrop-filter: blur(16px); }
        .voice-dock { position: relative; z-index: 4; margin: 16px auto 0; max-width: 560px; display: grid; grid-template-columns: 76px 1fr 76px; align-items: center; gap: 12px; }
        .dock-btn { min-height: 56px; border-radius: 18px; border: 1px solid rgba(148,163,184,.28); background: rgba(15,23,42,.72); color: #e2e8f0; font-weight: 950; cursor: pointer; }
        .dock-btn:disabled { opacity: .45; cursor: not-allowed; }
        .mic-btn { width: 98px; height: 98px; justify-self: center; border-radius: 50%; border: none; display: grid; place-items: center; color: #061226; font-size: 31px; font-weight: 950; background: linear-gradient(135deg, #fde68a, #f59e0b); box-shadow: 0 22px 44px rgba(245,158,11,.28); cursor: pointer; }
        .mic-btn.listening { background: linear-gradient(135deg, #86efac, #22c55e); box-shadow: 0 0 0 14px rgba(34,197,94,.12), 0 22px 44px rgba(34,197,94,.28); }
        .mic-btn:disabled { background: #475569; color: #cbd5e1; box-shadow: none; cursor: not-allowed; }
        .manual-form { max-width: 560px; margin: 12px auto 0; display: grid; grid-template-columns: 1fr auto; gap: 8px; position: relative; z-index: 4; }
        .manual-form input { min-width: 0; background: rgba(2,6,23,.72); border: 1px solid rgba(148,163,184,.24); color: #f8fafc; border-radius: 14px; padding: 13px 14px; outline: none; }
        .manual-form button { background: rgba(51,65,85,.9); color: #fff; border: none; border-radius: 14px; padding: 0 14px; font-weight: 900; cursor: pointer; }
        .manual-form button:disabled { opacity: .45; cursor: not-allowed; }
        .daily-list { margin-top: 16px; background: #0f172a; border: 1px solid #334155; border-radius: 18px; padding: 14px; }
        @media (max-width: 560px) { .praktika-stage { padding: 14px; min-height: 650px; } .planet-avatar { width: 205px; height: 205px; } .planet-core { width: 138px; height: 138px; } .planet-ring { width: 280px; height: 66px; } .voice-dock { grid-template-columns: 64px 1fr 64px; gap: 8px; } .mic-btn { width: 86px; height: 86px; } }
      `}</style>

      <div className="praktika-stage">
        <div className="stage-stars"><span /><span /><span /><span /><span /></div>

        <div className="stage-topbar">
          <span className="coach-pill">🪐 Sesli koç</span>
          <span className="coach-pill">{focus.icon} Şu an: Ünite {focus.pathPosition}/{focus.pathTotal} • {focus.title}</span>
          <span className="coach-pill" title={ttsBadge.hint}>{ttsBadge.label}</span>
          <span className="coach-pill">{embedded ? '⌨️ Önizlemede yazılı mod' : recognitionSupported ? '🎧 Bas konuş hazır' : '⌨️ Yazılı yedek mod'}</span>
        </div>

        <div className="planet-wrap">
          <div className={`planet-avatar ${isSpeaking ? 'speaking' : ''} ${isListening ? 'listening' : ''} ${lastResult?.correct ? 'happy' : lastResult ? 'wrong' : ''}`}>
            <div className="planet-orbit" />
            <div className="planet-ring" />
            <div className="planet-core">
              <div className="planet-face">
                <span className="clock-tick t1" />
                <span className="clock-tick t2" />
                <span className="clock-tick t3" />
                <span className="clock-tick t4" />
                <span className="clock-tick t5" />
                <span className="clock-tick t6" />
                <span className="clock-tick t7" />
                <span className="clock-tick t8" />
                <span className="planet-eye left" />
                <span className="planet-eye right" />
                <span className="planet-mouth" style={mouthShapes[mouthViseme]} />
              </div>
            </div>
          </div>
        </div>

        <div className="task-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#93c5fd', fontWeight: 950, letterSpacing: '.5px' }}>GÖREV {currentIndex + 1} / {tasks.length} • {currentTask.source}</div>
              <h2 style={{ margin: '7px 0 6px', color: '#f8fafc', fontSize: '24px' }}>{currentTask.title}</h2>
              <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.65, fontSize: '14px' }}>{currentTask.botInstruction}</p>
            </div>
            <div style={{ minWidth: '112px', textAlign: 'right', color: isSpeaking ? '#facc15' : isListening ? '#86efac' : '#7dd3fc', fontWeight: 950, fontSize: '13px' }}>
              {isSpeaking ? 'Konuşuyor' : isListening ? 'Dinliyor' : 'Hazır'}
            </div>
          </div>

          {(currentTask.showRussianBeforeAnswer || lastResult) && (
            <div style={{ marginTop: '14px', display: 'grid', gap: '10px' }}>
              <div style={{ background: 'rgba(2,6,23,.62)', border: '1px solid rgba(148,163,184,.18)', borderRadius: '16px', padding: '14px' }}>
                <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 950, marginBottom: '5px' }}>RUSÇA</div>
                <div style={{ fontSize: '22px', fontWeight: 950, color: '#e0f2fe' }}>{currentTask.ru}</div>
                {currentTask.reading && <div style={{ fontSize: '13px', color: '#93c5fd', marginTop: '4px' }}>Okunuş: {currentTask.reading}</div>}
              </div>
              {lastResult && (
                <div style={{ background: lastResult.correct ? 'rgba(16,185,129,0.13)' : 'rgba(239,68,68,0.13)', border: `1px solid ${lastResult.correct ? '#10b981' : '#ef4444'}`, borderRadius: '16px', padding: '14px' }}>
                  <div style={{ fontWeight: 950, color: lastResult.correct ? '#86efac' : '#fecaca', marginBottom: '8px' }}>{lastResult.message}</div>
                  <div style={{ display: 'grid', gap: '5px', color: '#cbd5e1', fontSize: '13px', lineHeight: 1.55 }}>
                    {lastResult.details.map((detail) => <div key={detail}>• {detail}</div>)}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: '14px', padding: '12px 14px', borderRadius: '14px', background: 'rgba(2,6,23,.62)', border: '1px dashed rgba(148,163,184,.28)', color: '#cbd5e1', fontSize: '13px', lineHeight: 1.5 }}>
            {statusText}
          </div>

          {embedded && !micHelpVisible && (
            <div style={{ marginTop: '10px', padding: '12px', borderRadius: '14px', background: 'rgba(56,189,248,.10)', border: '1px solid rgba(56,189,248,.42)', color: '#bae6fd', fontSize: '12px', lineHeight: 1.55 }}>
              <b>Önizleme penceresindesin.</b> Tarayıcılar, önizleme çerçevesine (iframe) mikrofon izni vermez; bu yüzden “Bas Konuş” burada çalışmaz. Sesli çalışmak için sayfayı yeni sekmede aç, ya da aşağıdaki yazılı cevap alanını kullan — değerlendirme ve puanlama aynı şekilde işler.
              <div style={{ marginTop: '10px' }}>
                <button onClick={openCoachInNewTab} style={{ background: '#38bdf8', color: '#04263a', border: 'none', borderRadius: '10px', padding: '9px 11px', fontWeight: 900, cursor: 'pointer' }}>Yeni sekmede aç (mikrofon çalışsın)</button>
              </div>
            </div>
          )}

          {micHelpVisible && (
            <div style={{ marginTop: '10px', padding: '12px', borderRadius: '14px', background: 'rgba(245,158,11,.10)', border: '1px solid rgba(245,158,11,.42)', color: '#fde68a', fontSize: '12px', lineHeight: 1.55 }}>
              <b>{micIssue === 'iframe' ? 'Mikrofon önizleme çerçevesinde açılmıyor.' : micIssue === 'insecure' ? 'Bağlantı güvenli değil.' : micIssue === 'no-device' ? 'Mikrofon bulunamadı.' : micIssue === 'busy' ? 'Mikrofon meşgul.' : 'Mikrofon erişimi engellendi.'}</b>{' '}
              {micIssueMessage(micIssue)}
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                <button onClick={requestBrowserMicAccess} style={{ background: '#f59e0b', color: '#111827', border: 'none', borderRadius: '10px', padding: '9px 11px', fontWeight: 900, cursor: 'pointer' }}>Mikrofon iznini tekrar iste</button>
                <button onClick={openCoachInNewTab} style={{ background: 'transparent', color: '#fde68a', border: '1px solid rgba(245,158,11,.65)', borderRadius: '10px', padding: '9px 11px', fontWeight: 900, cursor: 'pointer' }}>Yeni sekmede aç</button>
              </div>
            </div>
          )}
        </div>

        {!sessionStarted ? (
          <div style={{ maxWidth: '560px', margin: '18px auto 0', position: 'relative', zIndex: 4 }}>
            <button onClick={startSession} style={{ width: '100%', padding: '17px', borderRadius: '18px', border: 'none', color: '#061226', background: 'linear-gradient(135deg, #fde68a, #f59e0b)', fontSize: '16px', fontWeight: 950, cursor: 'pointer', boxShadow: '0 18px 42px rgba(245,158,11,.28)' }}>
              Başla ve konuşsun
            </button>
          </div>
        ) : (
          <>
            <div className="voice-dock">
              <button className="dock-btn" onClick={() => void playTaskPrompt(currentTask, currentIndex)} disabled={isSpeaking || isListening}>🔁</button>
              <button className={`mic-btn ${isListening ? 'listening' : ''}`} onClick={startListening} disabled={isSpeaking || isListening} title="Bas Konuş">
                {isListening ? '●' : isSpeaking ? '🔒' : '🎙️'}
              </button>
              <button className="dock-btn" onClick={lastResult?.correct ? goNext : retryCurrent} disabled={isSpeaking || isListening || (lastResult?.correct ? finishedToday : false)}>{lastResult?.correct ? '→' : '↻'}</button>
            </div>

            <form onSubmit={submitManual} className="manual-form">
              <input
                value={manualAnswer}
                onChange={(event) => setManualAnswer(event.target.value)}
                placeholder={currentTask.expectedLang === 'ru-RU' ? 'Yedek: Rusça cevabı yaz…' : 'Yedek: Türkçe cevabı yaz…'}
                disabled={isSpeaking || isListening}
              />
              <button disabled={!manualAnswer.trim() || isSpeaking || isListening}>Kontrol</button>
            </form>
          </>
        )}

        {finishedToday && (
          <div style={{ position: 'relative', zIndex: 4, maxWidth: '560px', margin: '14px auto 0', background: 'rgba(16,185,129,0.14)', border: '1px solid #10b981', borderRadius: '16px', padding: '14px' }}>
            <div style={{ fontSize: '17px', fontWeight: 950, color: '#a7f3d0' }}>Bugünkü sesli tekrar tamamlandı!</div>
            <p style={{ margin: '6px 0 12px', color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6 }}>Yarın geldiğinde koç kaldığın üniteye ve tekrar havuzuna göre yeni görevler açacak.</p>
            <button onClick={resetDailyCoach} style={{ background: 'transparent', border: '1px solid #10b981', color: '#a7f3d0', borderRadius: '10px', padding: '10px 14px', fontWeight: 900, cursor: 'pointer' }}>Bugünü sıfırla</button>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div style={{ marginTop: '16px', background: '#0f172a', border: '1px solid #334155', borderRadius: '18px', padding: '14px' }}>
          <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 950, marginBottom: '10px' }}>KONUŞMA AKIŞI</div>
          <div style={{ display: 'grid', gap: '8px' }}>
            {messages.map((message) => (
              <div key={message.id} style={{ justifySelf: message.role === 'user' ? 'end' : 'start', maxWidth: '88%', background: message.role === 'user' ? '#1d4ed8' : message.tone === 'bad' ? 'rgba(239,68,68,0.16)' : message.tone === 'good' ? 'rgba(16,185,129,0.16)' : '#1e293b', border: `1px solid ${message.role === 'user' ? '#3b82f6' : message.tone === 'bad' ? '#ef4444' : message.tone === 'good' ? '#10b981' : '#334155'}`, color: '#f8fafc', borderRadius: message.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', padding: '10px 12px', fontSize: '13px', lineHeight: 1.5 }}>
                {message.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="daily-list">
        <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 950, marginBottom: '10px' }}>BUGÜNKÜ SORULAR VE CEVAPLAR</div>
        <div style={{ display: 'grid', gap: '8px' }}>
          {tasks.map((task, index) => {
            const attempt = attempts[task.id];
            return (
              <div key={task.id} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: '10px', alignItems: 'start', background: index === currentIndex ? 'rgba(56,189,248,0.09)' : '#111827', border: `1px solid ${index === currentIndex ? '#38bdf8' : '#334155'}`, borderRadius: '12px', padding: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'grid', placeItems: 'center', background: attempt?.correct ? '#10b981' : attempt ? '#ef4444' : '#334155', fontWeight: 950 }}>{attempt?.correct ? '✓' : index + 1}</div>
                <div>
                  <div style={{ fontWeight: 900, color: '#e2e8f0', fontSize: '13px' }}>{task.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>{task.source}</div>
                  {(attempt || finishedToday || task.showRussianBeforeAnswer) && (
                    <div style={{ color: '#cbd5e1', fontSize: '12px', marginTop: '6px', lineHeight: 1.55 }}>
                      <b>Rusça:</b> {task.ru} <span style={{ color: '#64748b' }}>•</span> <b>Türkçe:</b> {task.tr}
                      {attempt && <div style={{ color: attempt.correct ? '#86efac' : '#fecaca', marginTop: '2px' }}>Son cevap: {attempt.transcript}</div>}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
