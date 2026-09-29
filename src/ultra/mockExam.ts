// ==========================================
// 📝 DENEME SINAVI ÜRETİCİ — "Gerçek sınav provası"
// Kullanıcının TAMAMLADIĞI ünitelerden, her seviye için 6 beceri bölümlü,
// süreli ve karma bir deneme sınavı üretir:
//   A) 📖 Kelime Tanıma  (RU → TR, şıklı)
//   B) ✍️ Üretim         (TR → RU, şıklı — geri çağırma)
//   C) 🎧 Dinleme        (yalnız ses — şıklı)
//   D) 💬 Bağlam         (cümle ne anlatıyor?)
//   E) 🧩 Boşluk Doldurma (cümlede eksik kelime)
//   F) ⌨️ Yazma           (TR verilir, Rusça YAZILIR — en zor bölüm)
// Sorular yalnızca tamamlanmış ünitelerden çekilir → deneme gerçek
// seviyeni ölçer; yanlışlar hata kütüğüne ve öğrenen modeline işlenir.
// ==========================================

import { UNITS_DATA } from '../curriculumData';
import type { WordDetail, UnitModule } from '../curriculumData';
import { isUltraMode } from './ultraMode';

export type ExamLevelId = 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2' | 'GENEL' | 'GUNLUK';

export interface ExamLevelDef {
  id: ExamLevelId;
  title: string;
  icon: string;
  color: string;
  questionCount: number;   // mix dizisinin toplamı
  /** [vocab, production, listening, context, cloze, typing, match] */
  mix: [number, number, number, number, number, number, number];
  passPct: number;         // dinamik (ultra moda göre yükselir)
}

export const EXAM_LEVELS: ExamLevelDef[] = [
  { id: 'GUNLUK', title: "Günün Mini Denemesi", icon: '🗓️', color: '#ec4899', questionCount: 12, mix: [2, 2, 2, 1, 2, 1, 2], passPct: 70 },
  { id: 'A1', title: 'A1 Denemesi', icon: '🌱', color: '#10b981', questionCount: 26, mix: [5, 4, 4, 4, 4, 3, 2], passPct: 70 },
  { id: 'A2', title: 'A2 Denemesi', icon: '⚡', color: '#38bdf8', questionCount: 26, mix: [5, 4, 4, 4, 4, 3, 2], passPct: 70 },
  { id: 'B1', title: 'B1 Denemesi', icon: '🔥', color: '#f59e0b', questionCount: 26, mix: [5, 4, 4, 4, 4, 3, 2], passPct: 70 },
  { id: 'B2', title: 'B2 Denemesi', icon: '💎', color: '#f43f5e', questionCount: 26, mix: [5, 4, 4, 4, 4, 3, 2], passPct: 70 },
  { id: 'C1/C2', title: 'C1/C2 Denemesi', icon: '👑', color: '#a78bfa', questionCount: 26, mix: [5, 4, 4, 4, 4, 3, 2], passPct: 70 },
  { id: 'GENEL', title: 'GENEL ULTRA DENEME', icon: '🌪️', color: '#22d3ee', questionCount: 33, mix: [6, 5, 5, 5, 5, 4, 3], passPct: 70 },
];

export const examPassPct = (def: ExamLevelDef): number => (isUltraMode() ? 85 : def.passPct);

export type ExamSkillKey = 'vocab' | 'production' | 'listening' | 'context' | 'cloze' | 'typing' | 'match';

export const EXAM_SKILL_LABEL: Record<ExamSkillKey, string> = {
  vocab: '📖 Kelime Tanıma',
  production: '✍️ Üretim',
  listening: '🎧 Dinleme',
  context: '💬 Bağlam',
  cloze: '🧩 Boşluk Doldurma',
  typing: '⌨️ Yazma',
  match: '🔗 Eşleştirme',
};

export interface ExamQuestion {
  id: string;
  skill: ExamSkillKey;
  kind: 'choice' | 'typing' | 'match';
  audioOnly?: boolean;
  prompt: string;
  hint?: string;
  speakText?: string;      // dinleme sorusunda otomatik çalınacak metin
  options?: string[];
  correct: string;         // seçilecek / yazılacak doğru cevap (match'te özet etiket)
  accept?: string[];       // yazma sorusunda kabul edilen varyantlar
  pairs?: { ru: string; tr: string }[]; // eşleştirme sorusunun çiftleri (3 çift)
  ru: string;              // hata kütüğü & öğrenen modeli için kaynak kelime/cümle
  tr: string;
  seconds: number;         // bu soruya ayrılan süre
}

export interface BuiltExam {
  level: ExamLevelId;
  title: string;
  color: string;
  icon: string;
  passPct: number;
  questions: ExamQuestion[];
  totalSeconds: number;
}

/** Kelime listesinden benzersiz şık değerleri çek (aynı çeviriye sahip iki kelime
 *  şıklara iki kez girmesin — yoksa soru bozuk olur). */
function pickUniqueDistractors(words: WordDetail[], field: 'ru' | 'tr', exclude: string, n: number, rand: () => number = Math.random): string[] {
  const seen = new Set<string>([exclude]);
  const out: string[] = [];
  for (const w of makeShuffle(rand)(words)) {
    const v = w[field];
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
    if (out.length >= n) break;
  }
  return out;
}

function makeShuffle(rand: () => number) {
  return function shuffleWith<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
}

/** Tohum/seed'li RNG (mulberry32) — GÜNLÜK mini deneme gün boyu aynı kalsın diye. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashStringSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}

export function todaySeedStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${`${d.getDate()}`.padStart(2, '0')}`;
}

/** Rusça yazma cevabı normalizasyonu: ё→е, küçük harf, noktalama/ekstra boşluk temizliği. */
export function normalizeRu(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[.,!?«»"“”()\-–—:;]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function typingMatches(input: string, correct: string, accept: string[] = []): boolean {
  const n = normalizeRu(input);
  if (!n) return false;
  if (n === normalizeRu(correct)) return true;
  return accept.some(a => normalizeRu(a) === n);
}

/** Bir seviye denemesi için kaynak havuz: tamamlanmış ünitelerin kelime/cümleleri. */
interface Pool {
  words: WordDetail[];
  sentences: { ru: string; tr: string }[];
  distractWords: WordDetail[];      // yanlış şık havuzu (mümkünse aynı seviyeden)
  distractSentences: { ru: string; tr: string }[];
  unitsUsed: number;
}

function buildPool(level: ExamLevelId, completedIds: string[]): Pool {
  const done = UNITS_DATA.filter(u => completedIds.includes(u.id));
  const inLevel = (u: UnitModule) => (level === 'GENEL' || level === 'GUNLUK' ? true : u.levelGroup === level);
  const from = done.filter(inLevel);
  const words = from.flatMap(u => u.words);
  const sentences = from.flatMap(u => [
    ...u.sentences.map(s => ({ ru: s.ru, tr: s.tr })),
    ...(u.dialogue || []).map(d => ({ ru: d.ru, tr: d.tr })),
  ]);
  // Karıştırıcı şıklar mümkünse aynı seviyeden, yoksa tüm havuzdan:
  const levelAll = UNITS_DATA.filter(inLevel).flatMap(u => u.words);
  const levelAllSent = UNITS_DATA.filter(inLevel).flatMap(u => u.sentences.map(s => ({ ru: s.ru, tr: s.tr })));
  return {
    words,
    sentences,
    distractWords: levelAll.length > 0 ? levelAll : UNITS_DATA.flatMap(u => u.words),
    distractSentences: levelAllSent.length > 0 ? levelAllSent : UNITS_DATA.flatMap(u => u.sentences.map(s => ({ ru: s.ru, tr: s.tr }))),
    unitsUsed: from.length,
  };
}

/** Boşluk doldurma: cümleden içerikli bir kelimeyi sil, doğru şık olarak ver. */
function makeCloze(sent: { ru: string; tr: string }, pool: Pool, id: string, rand: () => number): ExamQuestion | null {
  const shuffleR = makeShuffle(rand);
  const tokens = sent.ru.split(/\s+/);
  const strip = (t: string) => t.replace(/[.,!?«»"“”()—–-]/g, '');
  // Cümlede tam haliyle geçen ve havuzda kelime kartı olan bir token tercih et:
  const candidates = tokens
    .map((raw, idx) => ({ raw, idx, clean: strip(raw) }))
    .filter(t => t.clean.replace(/ё/g, 'е').length >= 4);
  if (candidates.length === 0) return null;
  const poolRuSet = new Set(pool.words.map(w => w.ru.toLowerCase().replace(/ё/g, 'е')));
  const good = candidates.filter(c => poolRuSet.has(c.clean.toLowerCase().replace(/ё/g, 'е')));
  const pick = (good.length > 0 ? shuffleR(good) : shuffleR(candidates))[0];
  const blanked = tokens.map((t, i) => (i === pick.idx ? '＿＿＿' : t)).join(' ');
  const distractors = pickUniqueDistractors(pool.distractWords.filter(w => normalizeRu(w.ru) !== normalizeRu(pick.clean)), 'ru', pick.clean, 3, rand);
  if (distractors.length < 3) return null;
  return {
    id,
    skill: 'cloze',
    kind: 'choice',
    prompt: `Boşluğa hangi kelime gelmeli?\n«${blanked}»`,
    hint: `Cümlenin Türkçesi: ${sent.tr}`,
    options: shuffleR([pick.clean, ...distractors]),
    correct: pick.clean,
    ru: sent.ru,
    tr: sent.tr,
    seconds: 25,
  };
}

/** Seviye denemesi hazırlar; yeterli havuz yoksa null döner.
 *  seed verilirse sorular deterministik sıralanır (GÜNLÜK mini deneme: gün boyu aynı sınav). */
export function buildMockExam(level: ExamLevelId, completedIds: string[], seed?: number): BuiltExam | null {
  const def = EXAM_LEVELS.find(l => l.id === level)!;
  const pool = buildPool(level, completedIds);
  const [nVocab, nProd, nListen, nCtx, nCloze, nType, nMatch] = def.mix;

  // GÜNLÜK mini deneme: günün tohumuyla sabit sınav (herkes, her koşuda aynı 12 soru)
  const useSeed = seed ?? (level === 'GUNLUK' ? hashStringSeed(`exam:${todaySeedStr()}:${level}`) : undefined);
  const rand = useSeed === undefined ? Math.random : mulberry32(useSeed);
  const shuffleR = makeShuffle(rand);

  const words = shuffleR([...new Map(pool.words.map(w => [w.ru, w])).values()]);
  const sents = shuffleR([...new Map(pool.sentences.map(s => [s.ru, s])).values()]);

  const needWords = nVocab + nProd + nListen + nType + nMatch * 3;
  if (words.length < Math.max(8, Math.floor(needWords * 0.7)) || pool.distractWords.length < 4 || pool.distractSentences.length < 4) {
    return null;
  }

  const qs: ExamQuestion[] = [];
  let wi = 0;
  const nextWord = () => words[wi++ % words.length];
  const distFor = (w: WordDetail, field: 'ru' | 'tr') => pickUniqueDistractors(pool.distractWords, field, w[field], 3, rand);

  // A) Kelime Tanıma RU→TR
  for (let i = 0; i < nVocab; i++) {
    const w = nextWord();
    const ds = distFor(w, 'tr');
    if (ds.length < 3) continue;
    qs.push({
      id: `v_${i}`, skill: 'vocab', kind: 'choice',
      prompt: `«${w.ru}» kelimesinin anlamı nedir?`,
      hint: w.reading ? `Okunuşu: ${w.reading}` : undefined,
      options: shuffleR([w.tr, ...ds]), correct: w.tr, ru: w.ru, tr: w.tr, seconds: 20,
    });
  }
  // B) Üretim TR→RU
  for (let i = 0; i < nProd; i++) {
    const w = nextWord();
    const ds = distFor(w, 'ru');
    if (ds.length < 3) continue;
    qs.push({
      id: `p_${i}`, skill: 'production', kind: 'choice',
      prompt: `✍️ ÜRETİM — "${w.tr}" kelimesinin RUSÇASI hangisi?`,
      options: shuffleR([w.ru, ...ds]), correct: w.ru, ru: w.ru, tr: w.tr, seconds: 22,
    });
  }
  // C) Dinleme (yalnız ses)
  for (let i = 0; i < nListen; i++) {
    const w = nextWord();
    const ds = distFor(w, 'tr');
    if (ds.length < 3) continue;
    qs.push({
      id: `l_${i}`, skill: 'listening', kind: 'choice', audioOnly: true,
      prompt: 'Dinlediğin kelimenin anlamı hangisi?',
      speakText: w.ru,
      options: shuffleR([w.tr, ...ds]), correct: w.tr, ru: w.ru, tr: w.tr, seconds: 25,
    });
  }
  // D) Bağlam — cümle anlama
  for (let i = 0, si = 0; i < nCtx && si < sents.length; si++) {
    const s = sents[si];
    const seenTr = new Set<string>([s.tr]);
    const ds: string[] = [];
    for (const x of shuffleR(pool.distractSentences)) {
      if (!x.tr || seenTr.has(x.tr)) continue;
      seenTr.add(x.tr);
      ds.push(x.tr);
      if (ds.length >= 3) break;
    }
    if (ds.length < 3) continue;
    qs.push({
      id: `c_${i}`, skill: 'context', kind: 'choice',
      prompt: `💬 BAĞLAM — «${s.ru}» ne anlatıyor?`,
      options: shuffleR([s.tr, ...ds]), correct: s.tr, ru: s.ru, tr: s.tr, seconds: 28,
    });
    i++;
  }
  // E) Boşluk doldurma
  let clozeMade = 0;
  for (let si = 0; si < sents.length * 2 && clozeMade < nCloze; si++) {
    const s = sents[si % sents.length];
    if (!s || qs.some(q => q.skill === 'cloze' && q.prompt.includes(s.ru.slice(0, 12)))) continue;
    const q = makeCloze(s, pool, `g_${clozeMade}`, rand);
    if (q) { qs.push(q); clozeMade++; }
  }
  // F) Yazma — TR verilir, RU YAZILIR (en zor bölüm)
  for (let i = 0; i < nType; i++) {
    const w = nextWord();
    qs.push({
      id: `t_${i}`, skill: 'typing', kind: 'typing',
      prompt: `⌨️ YAZMA — "${w.tr}" kelimesini RUSÇA yaz:`,
      hint: `İlk harf: ${w.ru[0]?.toUpperCase() || '?'} · ${w.ru.replace(/ё/gi, 'е').length} harf`,
      accept: [w.ru.replace(/ё/gi, 'е')],
      correct: w.ru, ru: w.ru, tr: w.tr, seconds: 35,
    });
  }
  // G) Eşleştirme — 3 çifti süreli mini oyunda bağla (tek hata hakkı)
  for (let i = 0; i < nMatch; i++) {
    const trio = [nextWord(), nextWord(), nextWord()].filter((w): w is WordDetail => Boolean(w));
    if (trio.length < 3) break;
    qs.push({
      id: `e_${i}`, skill: 'match', kind: 'match',
      prompt: '🔗 EŞLEŞTİRME — Rusça ↔ Türkçe çiftlerini hatasız bağla:',
      pairs: trio.map(w => ({ ru: w.ru, tr: w.tr })),
      correct: `${trio.length}/${trio.length} çift`,
      ru: trio[0].ru, tr: trio[0].tr, seconds: 45,
    });
  }

  if (qs.length < Math.floor(def.questionCount * 0.6)) return null;

  return {
    level,
    title: def.title,
    color: def.color,
    icon: def.icon,
    passPct: examPassPct(def),
    questions: shuffleR(qs),
    totalSeconds: qs.reduce((a, q) => a + q.seconds, 0),
  };
}

/** Bir seviye denemesi için minimum içerik durumu — butonu kilitlemek/açmak için. */
export function examReadiness(level: ExamLevelId, completedIds: string[]): { ready: boolean; units: number; words: number } {
  const pool = buildPool(level, completedIds);
  const uniqWords = new Set(pool.words.map(w => w.ru)).size;
  return { ready: pool.unitsUsed >= 1 && uniqWords >= 8 && pool.sentences.length >= 4, units: pool.unitsUsed, words: uniqWords };
}
