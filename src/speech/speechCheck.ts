// ==========================================
// 🎤 KONUŞMA KONTROL MOTORU — Ağız Jimnastiği için
// • Edge tarayıcı/kapasitörlü konuşma tanıma (SR) ile kullanıcının söylediğini
//   metne çevirir ve hedefle karşılaştırır (benzerlik + hız ölçümü).
// • SR yoksa/izin verilmezse zarifçe "kendi kendini değerlendir" moduna düşer.
// ==========================================

import { SpeechRecognition as NativeSpeechRecognition } from '@capacitor-community/speech-recognition';

export interface SpeechAttempt {
  transcript: string;
  durationMs: number;   // mikrofon açılışından sonuca kadarki süre (yaklaşık konuşma süresi)
  engine: 'native' | 'browser';
}

type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: { results: { transcript: string }[][] }) => void) | null;
  onerror: ((event: { error?: string; message?: string }) => void) | null;
  onend: (() => void) | null;
};
type SRConstructor = new () => BrowserSpeechRecognition;

function getSRConstructor(): SRConstructor | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as Window & { SpeechRecognition?: SRConstructor; webkitSpeechRecognition?: SRConstructor };
  return w.SpeechRecognition || w.webkitSpeechRecognition;
}

export function isSpeechCoachAvailable(): boolean {
  return Boolean(getSRConstructor());
}

/** Tek atımlık Rusça dinleme: native (Capacitor) → tarayıcı Web Speech zinciri. */
export async function listenOnceRu(lang = 'ru-RU', timeoutMs = 9000): Promise<SpeechAttempt> {
  const started = Date.now();
  // 1) Native plugin (Android APK) — web preview'da çöker, yutarız
  try {
    const availability = await NativeSpeechRecognition.available();
    if (availability.available) {
      const perm = await NativeSpeechRecognition.checkPermissions().catch(() => ({ speechRecognition: 'prompt' as const }));
      if (perm.speechRecognition !== 'granted') {
        const req = await NativeSpeechRecognition.requestPermissions();
        if (req.speechRecognition !== 'granted') throw new Error('mic-denied');
      }
      const result = await NativeSpeechRecognition.start({
        language: lang, maxResults: 1, popup: false, partialResults: false,
        prompt: 'Hedef metni hızlı ve net söyle',
      });
      const transcript = result.matches?.[0] || '';
      return { transcript, durationMs: Date.now() - started, engine: 'native' };
    }
  } catch (e) {
    void NativeSpeechRecognition.stop().catch(() => undefined);
    if ((e as Error)?.message === 'mic-denied') throw e;
  }

  // 2) Tarayıcı Web Speech
  const Ctor = getSRConstructor();
  if (!Ctor) throw new Error('unsupported');
  return new Promise<SpeechAttempt>((resolve, reject) => {
    const rec = new Ctor();
    let settled = false;
    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      rec.abort();
      reject(new Error('no-speech'));
    }, timeoutMs);

    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (ev) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      const transcript = ev.results?.[0]?.[0]?.transcript || '';
      resolve({ transcript, durationMs: Date.now() - started, engine: 'browser' });
    };
    rec.onerror = (ev) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      const code = ev.error || ev.message || 'error';
      reject(new Error(code === 'no-speech' ? 'no-speech' : code));
    };
    rec.onend = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      reject(new Error('no-speech'));
    };
    try { rec.start(); } catch { if (!settled) { settled = true; window.clearTimeout(timer); reject(new Error('error')); } }
  });
}

// ---------- Benzerlik + hız puanı ----------

/** Kiril katlamalı normalizasyon (ё→е, noktalama temizliği). */
export const normSpeech = (s: string): string =>
  (s || '').toLowerCase().replace(/ё/g, 'е').replace(/[.,!?«»"“”()\-–—:;']/g, ' ').replace(/\s+/g, ' ').trim();

/** Levenshtein mesafesi (küçük metinler için yeterli). */
function lev(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[n];
}

/** Söylenen metnin hedefe benzerliği: token örtüşmesi × karakter benzerliği (0-1). */
export function speechSimilarity(spokenRaw: string, targetRaw: string): number {
  const spoken = normSpeech(spokenRaw);
  const target = normSpeech(targetRaw);
  if (!spoken || !target) return 0;
  if (spoken === target) return 1;
  const sTokens = new Set(spoken.split(' '));
  const tTokens = target.split(' ');
  const hit = tTokens.filter(t => sTokens.has(t)).length;
  const tokenScore = tTokens.length ? hit / tTokens.length : 0;
  const dist = lev(spoken, target);
  const charScore = 1 - dist / Math.max(spoken.length, target.length);
  return Math.max(0, Math.min(1, tokenScore * 0.65 + Math.max(0, charScore) * 0.35));
}

/** Hız puanı: hedef metin kaç harf/sn hızla söylendi (motor tanıma gecikmesi telafili). */
export function speedCharsPerSec(targetRaw: string, durationMs: number): number {
  const chars = normSpeech(targetRaw).replace(/\s/g, '').length;
  const eff = Math.max(0.7, durationMs / 1000 - 0.9); // tanıma/buton gecikmesi telafisi
  return chars / eff;
}

export type SpeedRating = 'lightning' | 'good' | 'slow';

export function rateSpeed(cps: number): SpeedRating {
  if (cps >= 4.2) return 'lightning';
  if (cps >= 2.8) return 'good';
  return 'slow';
}

export const SPEED_LABEL: Record<SpeedRating, string> = {
  lightning: '⚡ YILDIRIM — ağzın Rusça kilitlendi!',
  good: '🔥 İYİ TEMPO — bir tık daha hız!',
  slow: '🐢 Yavaş kaldı — modele uyup tekrar dene',
};
