import { detectSpeechTag } from '../content/activeLanguage';
export type SpeechLangTag = 'tr-TR' | 'ru-RU' | 'en-US';

let cachedVoices: SpeechSynthesisVoice[] | null = null;

export function webSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

export async function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!webSpeechSupported()) return [];
  if (cachedVoices && cachedVoices.length > 0) return cachedVoices;
  const synth = window.speechSynthesis;
  const now = synth.getVoices();
  if (now.length > 0) {
    cachedVoices = now;
    return now;
  }
  return new Promise<SpeechSynthesisVoice[]>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      synth.removeEventListener('voiceschanged', finish);
      cachedVoices = synth.getVoices();
      resolve(cachedVoices);
    };
    synth.addEventListener('voiceschanged', finish);
    window.setTimeout(finish, 1200);
  });
}

function scoreVoice(voice: SpeechSynthesisVoice, lang: SpeechLangTag) {
  const voiceLang = (voice.lang || '').toLowerCase().replace('_', '-');
  const target = lang.toLowerCase();
  const base = target.split('-')[0];
  const name = (voice.name || '').toLowerCase();
  let score = 0;
  if (voiceLang === target) score += 120;
  else if (voiceLang.startsWith(base)) score += 70;
  else return -1;
  if (name.includes('natural') || name.includes('neural')) score += 30;
  if (name.includes('google')) score += 22;
  if (name.includes('microsoft')) score += 18;
  if (name.includes('yandex')) score += 14;
  if (voice.localService) score += 6;
  if (voice.default) score += 4;
  return score;
}

export async function hasVoiceFor(lang: SpeechLangTag): Promise<boolean> {
  const voices = await loadVoices();
  return voices.some((v) => scoreVoice(v, lang) >= 0);
}

export async function pickVoice(lang: SpeechLangTag): Promise<SpeechSynthesisVoice | null> {
  const voices = await loadVoices();
  const ranked = voices
    .map((voice) => ({ voice, score: scoreVoice(voice, lang) }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.voice || null;
}

function splitForSpeech(text: string, maxLen = 180): string[] {
  const out: string[] = [];
  let rest = text.trim();
  while (rest.length > maxLen) {
    const marks = [
      rest.lastIndexOf('. ', maxLen),
      rest.lastIndexOf('! ', maxLen),
      rest.lastIndexOf('? ', maxLen),
      rest.lastIndexOf(', ', maxLen),
      rest.lastIndexOf(' ', maxLen),
    ];
    const cut = Math.max(...marks);
    const idx = cut > 30 ? cut + 1 : maxLen;
    out.push(rest.slice(0, idx).trim());
    rest = rest.slice(idx).trim();
  }
  if (rest) out.push(rest);
  return out.filter(Boolean);
}

export function stopWebSpeech() {
  if (!webSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
  }
}

export interface WebSpeakOptions {
  lang?: SpeechLangTag;
  rate?: number;
  pitch?: number;
  volume?: number;
  onChunkStart?: (chunk: string) => void;
  onChunkEnd?: () => void;
}

function speakChunk(chunk: string, voice: SpeechSynthesisVoice | null, lang: SpeechLangTag, opts: WebSpeakOptions): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = voice?.lang || lang;
    if (voice) utterance.voice = voice;
    utterance.rate = Math.min(2, Math.max(0.5, opts.rate ?? 1));
    utterance.pitch = Math.min(2, Math.max(0, opts.pitch ?? 1));
    utterance.volume = Math.min(1, Math.max(0, opts.volume ?? 1));

    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.clearInterval(keepAlive);
      window.clearTimeout(guard);
      opts.onChunkEnd?.();
      resolve(ok);
    };

    utterance.onend = () => finish(true);
    utterance.onerror = (event) => {
      const reason = (event as SpeechSynthesisErrorEvent).error;
      finish(reason === 'interrupted' || reason === 'canceled');
    };

    const keepAlive = window.setInterval(() => {
      if (synth.speaking && !synth.paused) {
        synth.pause();
        synth.resume();
      }
    }, 9000);

    const guard = window.setTimeout(() => finish(false), Math.max(8000, chunk.length * 180));

    opts.onChunkStart?.(chunk);
    synth.speak(utterance);
  });
}

export async function webSpeak(text: string, opts: WebSpeakOptions = {}): Promise<boolean> {
  const clean = (text || '').trim();
  if (!clean) return true;
  if (!webSpeechSupported()) return false;

  const lang: SpeechLangTag = opts.lang || detectSpeechTag(clean);
  const voice = await pickVoice(lang);
  if (!voice && lang === 'ru-RU') {
    const anyVoice = await loadVoices();
    if (anyVoice.length === 0) return false;
  }

  const synth = window.speechSynthesis;
  try {
    synth.cancel();
  } catch {
  }

  let allOk = true;
  for (const chunk of splitForSpeech(clean)) {
    const ok = await speakChunk(chunk, voice, lang, opts);
    if (!ok) allOk = false;
  }
  return allOk;
}
