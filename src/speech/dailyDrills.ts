// ==========================================
// 🗓️ GÜNLÜK AĞIZ ÖDEVİ — deterministik günlük antrenman üreteci
// Her gün gece yarısı yenilenen 7 görev: 3 kelime zinciri (×3 hızlı
// tekrar), 2 tekerleme, 2 cümle zinciri (×2). Kelimeler TAMAMLANAN
// ünitelerden gelir ama EZBER ÖLÇÜLMEZ — ölçülen şey TEMPO ve AKICILIK.
// ==========================================

import { UNITS_DATA, ALL_WORDS } from '../curriculumData';
import type { WordDetail } from '../curriculumData';
import { TWISTERS } from './twisters';
import type { Twister } from './twisters';
import { isEnglish } from '../content/activeLanguage';

export interface SpeechDrill {
  id: string;
  kind: 'chain' | 'twister' | 'sentence';
  title: string;          // kısa görev başlığı, örn. "×3 HIZLI TEKRAR"
  target: string;         // söylenecek tam metin (tekrarlar dahil)
  base: string;           // tek birim (kelime/cümle/tekerleme) — model seslendirme
  reps: number;
  reading?: string;
  tr?: string;            // gösterilir ama ezber gerekmez
  tip?: string;
}

// Günlük ağız ödevi kaydı dillere göre ayrılır.
const DAY_KEY = isEnglish() ? 'dilkoc_speech_en_v1' : 'dilkoc_speech_v1';

export interface SpeechDayState {
  day: string;
  done: string[];         // tamamlanan drill id'leri
  bestCps: number;        // günün en iyi harf/sn rekoru
}

export function todayStrLocal(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const dd = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${dd}`;
}

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickSeeded<T>(arr: T[], n: number, rand: () => number): T[] {
  const idx = arr.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, Math.min(n, idx.length)).map(i => arr[i]);
}

/** Zor telaffuz edilen, 2+ heceli kelimelere öncelik (kalın I, ь, щ, кümeler içerenler). */
function mouthScore(w: WordDetail): number {
  let s = 0;
  const ru = w.ru.toLowerCase();
  if (isEnglish()) {
    // İngilizce: TH, W, sessiz harfler ve ünsüz kümeleri ağız jimnastiğidir.
    if (/th/.test(ru)) s += 3;
    if (/^wr|^kn|gh|mb$/.test(ru)) s += 2;
    if (/(str|spr|scr|thr|shr|bl|cl|fl|gl|pl|sl)/.test(ru)) s += 2;
    if (/w/.test(ru)) s += 1;
    if (/[aeiou]{2,}/.test(ru)) s += 1; // ünlü takımları
  } else {
    if (/[ы]/i.test(ru)) s += 3;
    if (/[щ]/i.test(ru)) s += 3;
    if (/[ь]/i.test(ru)) s += 2;
    if (/(тр|др|стр|здр|вств|вств|кр|пр|бр)/i.test(ru)) s += 2;
    if (/[ж]/i.test(ru)) s += 1;
  }
  s += Math.min(3, Math.floor(ru.length / 3));
  return s;
}

export function buildDailyDrills(completedIds: string[], day = todayStrLocal()): SpeechDrill[] {
  const rand = mulberry32(hashStr(`speech:${day}`));
  const drills: SpeechDrill[] = [];
  let n = 0;

  // Kelime havuzu: önce tamamlanan ünitelerin "ağız yoran" kelimeleri, yoksa A1 havuzu
  const known = UNITS_DATA.filter(u => completedIds.includes(u.id)).flatMap(u => u.words);
  const hardPool = (arr: WordDetail[]) =>
    [...new Map(arr.map(w => [w.ru, w])).values()]
      .filter(w => w.ru.replace(/ё/gi, 'е').length >= 4)
      .sort((a, b) => mouthScore(b) - mouthScore(a));
  const poolHard = hardPool(known.length > 0 ? known : ALL_WORDS);
  const poolAny = hardPool(ALL_WORDS);

  // 3 kelime zinciri: zor havuzun ilk %40'ından günün seçimi (yoksa genel havuzdan)
  const zone = poolHard.length >= 12 ? poolHard.slice(0, Math.ceil(poolHard.length * 0.4)) : poolAny;
  pickSeeded(zone.length >= 3 ? zone : poolAny, 3, rand).forEach(w => {
    drills.push({
      id: `d${day}_c${n++}`,
      kind: 'chain',
      title: '×3 HIZLI KELİME ZİNCİRİ',
      target: `${w.ru} ${w.ru} ${w.ru}`,
      base: w.ru,
      reps: 3,
      reading: w.reading,
      tr: w.tr,
      tip: 'Kelimeyi 3 kez ARKA ARKAYA, duraksamadan söyle — amaç ezber değil, dil hızı.',
    });
  });

  // 2 tekerleme (günün deterministik seçimi)
  const two = pickSeeded(TWISTERS, 2, rand);
  two.forEach((t: Twister) => {
    drills.push({
      id: `d${day}_t${n++}`,
      kind: 'twister',
      title: '🌀 BUGÜNÜN TEKERLEMESİ',
      target: t.ru,
      base: t.ru,
      reps: 1,
      reading: t.reading,
      tr: t.tr,
      tip: `${t.tip} — önce yavaş modele uy, sonra hızlı dene.`,
    });
  });

  // 2 cümle zinciri ×2 (kısa, konuşmalık cümleler; önce tamamlanan ünitelerden)
  const sentPool = (known.length > 0
    ? UNITS_DATA.filter(u => completedIds.includes(u.id)).flatMap(u => [...u.sentences.map(s => s.ru), ...(u.dialogue || []).map(d => d.ru)])
    : UNITS_DATA.slice(0, 8).flatMap(u => u.sentences.map(s => s.ru))
  ).map(s => s.trim()).filter(s => {
    const wc = s.split(/\s+/).length;
    return wc >= 3 && wc <= 6;
  });
  pickSeeded([...new Set(sentPool)], 2, rand).forEach(s => {
    drills.push({
      id: `d${day}_s${n++}`,
      kind: 'sentence',
      title: '×2 HIZLI CÜMLE ZİNCİRİ',
      target: `${s} ${s}`,
      base: s,
      reps: 2,
      tip: 'Cümleyi 2 kez arka arkaya, nefes almadan söylemeyi dene.',
    });
  });

  return drills;
}

// ---------- günlük durum deposu ----------

export function loadSpeechDay(): SpeechDayState {
  const day = todayStrLocal();
  try {
    const raw = localStorage.getItem(DAY_KEY);
    if (raw) {
      const d = JSON.parse(raw) as SpeechDayState;
      if (d.day === day && Array.isArray(d.done)) return { day, done: d.done, bestCps: d.bestCps || 0 };
    }
  } catch { /* yoksay */ }
  return { day, done: [], bestCps: 0 };
}

export function saveSpeechDay(state: SpeechDayState): void {
  try { localStorage.setItem(DAY_KEY, JSON.stringify(state)); } catch { /* yoksay */ }
}

export function markDrillDone(id: string, cps: number): SpeechDayState {
  const cur = loadSpeechDay();
  const next: SpeechDayState = {
    day: cur.day,
    done: cur.done.includes(id) ? cur.done : [...cur.done, id],
    bestCps: Math.max(cur.bestCps, cps),
  };
  saveSpeechDay(next);
  return next;
}
