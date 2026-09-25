// ============================================================================
// 100 KONU — DERLEME + TEST SORULARI (index)
// ----------------------------------------------------------------------------
// Dışa açılan isimler Faz 1'dekiyle aynı (App.tsx bu isimleri kullanır):
//   TOPICS_100, TOPICS_100_TOTAL, TOPIC_100_CATS, topicCatInfo,
//   buildTopicDrills, topicFullText, Topic100, Topic100Question
// Yeni (Faz 2): LETTER_GLYPHS, LEVELS, getTopicByNum, topicsOfCat,
//   topicSourceUnits, sourceUnitInfo
// ============================================================================

import { UNITS_DATA } from '../curriculumData';
import type { Topic100, Topic100Question, Topic100Cat, CefrTag } from './types';
import { LETTER_INFO, SYLLABLE_TOPICS } from './letterNotes';
import {
  buildLetterTopic,
  buildPreviewTopic,
  buildRuleTopic,
  buildSyllableTopic,
  previewUnits,
  PHONETIC_RULES,
} from './derive';

export type { Topic100, Topic100Question, Topic100Cat, CefrTag } from './types';
export type { Topic100Item, Topic100Sentence, Topic100Line } from './types';

// ---------------------------------------------------------------------------
// Kategoriler
// ---------------------------------------------------------------------------
export const TOPIC_100_CATS: { id: Topic100Cat; label: string; icon: string; color: string }[] = [
  { id: 'harf', label: 'Harfler — Müfredattan Örnekler (33 Konu)', icon: '🔤', color: '#3b82f6' },
  { id: 'fonetik', label: 'Fonetik Kurallar (8 Konu)', icon: '🧪', color: '#f59e0b' },
  { id: 'mufredat', label: 'Müfredat Ön Hazırlık (59 Konu)', icon: '🎧', color: '#ec4899' },
];

export function topicCatInfo(id: Topic100Cat) {
  return TOPIC_100_CATS.find((c) => c.id === id)!;
}

export const LEVELS: CefrTag[] = ['A1', 'A2', 'B1', 'B2', 'C1/C2'];

// ---------------------------------------------------------------------------
// 100 konunun tam dizilişi: 33 harf + 8 fonetik + 59 müfredat ön-hazırlık.
// ---------------------------------------------------------------------------
export const LETTER_GLYPHS: string[] = LETTER_INFO.map((l) => l.glyph);

const LETTER_TOPICS: Topic100[] = LETTER_GLYPHS.map((g, i) => buildLetterTopic(g, i + 1));
const SYLLABLE_TOPICS_T: Topic100[] = SYLLABLE_TOPICS.map((s, i) => buildSyllableTopic(s, 34 + i));
const RULE_TOPICS: Topic100[] = PHONETIC_RULES.map((r, i) => buildRuleTopic(r, 36 + i));
const PREVIEW_TOPICS: Topic100[] = previewUnits().map((u, i) => buildPreviewTopic(u, 42 + i));

export const TOPICS_100: Topic100[] = [
  ...LETTER_TOPICS,
  ...SYLLABLE_TOPICS_T,
  ...RULE_TOPICS,
  ...PREVIEW_TOPICS,
];
export const TOPICS_100_TOTAL = TOPICS_100.length; // === 100

export function getTopicByNum(num: number): Topic100 | undefined {
  return TOPICS_100.find((t) => t.num === num);
}

export function topicsOfCat(cat: Topic100Cat): Topic100[] {
  return TOPICS_100.filter((t) => t.cat === cat);
}

/** Konunun örneklerinin geldiği ünite kimlikleri (müfredat bağlantısı). */
export function topicSourceUnits(t: Topic100): string[] {
  const ids = new Set<string>();
  for (const i of t.items) if (i.unitId) ids.add(i.unitId);
  for (const s of t.sentences) if (s.unitId) ids.add(s.unitId);
  for (const d of t.dialogue) if (d.unitId) ids.add(d.unitId);
  return [...ids];
}

export function sourceUnitInfo(unitId?: string) {
  if (!unitId) return null;
  const u = UNITS_DATA.find((x) => x.id === unitId);
  return u ? { num: u.unitNumber, title: u.title, level: u.levelGroup, icon: u.icon } : null;
}

// ---------------------------------------------------------------------------
// Konu dinleme metni: kelimeler + cümleler + diyalog (RU).
// ---------------------------------------------------------------------------
export function topicFullText(t: Topic100): string {
  const parts: string[] = [];
  for (const i of t.items) parts.push(i.ru);
  for (const s of t.sentences) parts.push(s.ru);
  for (const d of t.dialogue) parts.push(d.ru);
  return parts.join('. ');
}

// ---------------------------------------------------------------------------
// Test soruları — deterministik (konu numarası seed'li), her zaman 5 soru:
//   harf konuları : 1 harf + 3 kelime + 1 karışık tekrar
//   diğer konular : 4 kelime + 1 karışık tekrar
// Karışık soru başka bir konudan kelime sorar => konular arası bağ.
// ---------------------------------------------------------------------------
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LETTER_NAME_RU: Record<string, string> = {
  А: 'а', Б: 'бэ', В: 'вэ', Г: 'гэ', Д: 'дэ', Е: 'е', Ё: 'ё', Ж: 'жэ',
  З: 'зэ', И: 'и', Й: 'йот', К: 'ка', Л: 'эль', М: 'эм', Н: 'эн', О: 'о',
  П: 'пэ', Р: 'эр', С: 'эс', Т: 'тэ', У: 'у', Ф: 'эф', Х: 'ха', Ц: 'цэ',
  Ч: 'че', Ш: 'ша', Щ: 'ща', Ъ: 'твёрдый знак', Ы: 'ы', Ь: 'мягкий знак',
  Э: 'э', Ю: 'ю', Я: 'я',
};

export function buildTopicDrills(t: Topic100): Topic100Question[] {
  const rnd = mulberry32(t.num * 7919 + 13);
  const qs: Topic100Question[] = [];
  const nWords = t.cat === 'harf' ? 3 : 4;

  if (t.cat === 'harf' && t.letterGlyph) {
    const g = t.letterGlyph;
    const others = seededShuffle(LETTER_GLYPHS.filter((x) => x !== g), rnd).slice(0, 3);
    qs.push({
      type: 'letter',
      prompt: '🔤 Hangi harfin sesini duyuyorsun?',
      answer: g,
      options: seededShuffle([g, ...others], rnd),
      audio: LETTER_NAME_RU[g] || g,
      hint: `Harf ${g} — ${t.descTr}`,
    });
  }

  // Kelime soruları: konunun kendi kelimelerinden (tekerrürsüz).
  const pool = seededShuffle(t.items, rnd);
  for (let i = 0; i < nWords && i < pool.length; i++) {
    const w = pool[i];
    const distract = pool.filter((x) => x.ru !== w.ru).slice(0, 3).map((x) => x.ru);
    qs.push({
      type: 'word',
      prompt: '🔊 Hangi kelimeyi duyuyorsun?',
      answer: w.ru,
      options: seededShuffle([w.ru, ...distract], rnd),
      audio: w.ru,
      hint: `${w.reading} — ${w.tr}${w.level ? ` (${w.level})` : ''}`,
    });
  }

  // Karışık tekrar: başka bir konudan gelen kelime (konular arası bağ).
  // Şıklarda asla tekrar olmasın: aynı kelime birden fazla konuda olabilir.
  const otherTopics = TOPICS_100.filter((x) => x.num !== t.num && x.items.length > 0);
  const other = otherTopics[Math.floor(rnd() * otherTopics.length)];
  const otherItem = other.items[Math.floor(rnd() * other.items.length)];
  const mixedDistract = seededShuffle(t.items, rnd)
    .filter((x) => x.ru.toLowerCase() !== otherItem.ru.toLowerCase())
    .slice(0, 3)
    .map((x) => x.ru);
  if (mixedDistract.length < 3) {
    const fill = seededShuffle(other.items, rnd)
      .filter((x) => x.ru.toLowerCase() !== otherItem.ru.toLowerCase() && !mixedDistract.includes(x.ru));
    for (const f of fill) {
      if (mixedDistract.length >= 3) break;
      mixedDistract.push(f.ru);
    }
  }
  qs.push({
    type: 'mixed',
    prompt: '🔁 Karışık tekrar — hangi kelimeyi duydun?',
    answer: otherItem.ru,
    options: seededShuffle([otherItem.ru, ...mixedDistract], rnd),
    audio: otherItem.ru,
    hint: `${otherItem.ru} — ${otherItem.tr} (Konu ${other.num} den geliyor)`,
  });

  return qs.slice(0, 5);
}
