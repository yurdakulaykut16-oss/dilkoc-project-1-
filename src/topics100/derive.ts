// ============================================================================
// 100 KONU — TÜRÜTME MOTORU (derive)
// ----------------------------------------------------------------------------
// Tüm 100 konu tek kaynaktan türetilir: UNITS_DATA (A1-C2, 72 ünite).
//
//  1-33   Harf konuları   : harfin geçtiği B1-C2 öncelikli kelimeler +
//                           aynı harfi içeren ünite cümleleri + diyalog satırları.
//  34-41  Fonetik konuları: 2 hece pratiği + 6 ses kuralı (akanje, ikanje,
//                           sonda sedasızlaşma, yumuşatma, iyotlaşma, vurgu).
//  42-100 Müfredat ön-hazırlık: 5 A2 + 22 B1 + 17 B2 + 15 C1/C2 ünitesi
//                           birebir (kelime + cümle + diyalog).
//
// Harf/fonetik konuları "aynı format"ı korur: items + sentences + dialogue.
// Örneklerin unitId/level alanı hangi üniteye ait olduğunu gösterir —
// böylece her konu müfredata GERÇEK bir bağlantı taşır.
// ============================================================================

import {
  UNITS_DATA,
  type UnitModule,
  type DialogueLine,
  type WordDetail,
} from '../curriculumData';
import type {
  Topic100,
  Topic100Item,
  Topic100Sentence,
  Topic100Line,
  CefrTag,
} from './types';
import { LETTER_INFO, THIN_LETTER_SUPPLEMENT, SYLLABLE_TOPICS } from './letterNotes';

// ---------------------------------------------------------------------------
// Seviye ağırlığı: üst seviyelerden örnek seçilir (ön-hazırlık ilkesi).
// ---------------------------------------------------------------------------
const LEVEL_SCORE: Record<CefrTag, number> = {
  'C1/C2': 40,
  B2: 30,
  B1: 20,
  A2: 10,
  A1: 5,
};

// ---------------------------------------------------------------------------
// Tek seferde tüm ünite içeriğini düzleştir.
// ---------------------------------------------------------------------------
interface FlatWord extends Topic100Item {
  unitNum: number;
}
interface FlatSentence extends Topic100Sentence {
  unitNum: number;
}
interface FlatLine extends Topic100Line {
  unitNum: number;
}

const UNITS: UnitModule[] = [...UNITS_DATA].sort((a, b) => a.unitNumber - b.unitNumber);

const FLAT_WORDS: FlatWord[] = (() => {
  // Aynı kelime birkaç ünitede geçebilir: en yüksek seviyeli (sonra en
  // erken) geçişi kalır — örnek havuzu zengin ve tekrarlı olmayan olsun.
  const best = new Map<string, FlatWord>();
  for (const u of UNITS) {
    for (const w of u.words) {
      const key = w.ru.toLowerCase();
      const cand: FlatWord = {
        ru: w.ru,
        reading: w.reading,
        tr: w.tr,
        level: w.level,
        unitId: u.id,
        unitNum: u.unitNumber,
      };
      const cur = best.get(key);
      if (
        !cur ||
        LEVEL_SCORE[w.level] > LEVEL_SCORE[cur.level as CefrTag] ||
        (LEVEL_SCORE[w.level] === LEVEL_SCORE[cur.level as CefrTag] && u.unitNumber < cur.unitNum)
      ) {
        best.set(key, cand);
      }
    }
  }
  return [...best.values()];
})();

const FLAT_SENTENCES: FlatSentence[] = UNITS.flatMap((u) =>
  u.sentences.map((s) => ({
    ru: s.ru,
    tr: s.tr,
    unitId: u.id,
    level: u.levelGroup,
    unitNum: u.unitNumber,
  }))
);

const FLAT_LINES: FlatLine[] = UNITS.flatMap((u) =>
  (u.dialogue ?? []).map((l: DialogueLine) => ({
    speaker: l.speaker,
    ru: l.ru,
    reading: l.reading,
    tr: l.tr,
    unitId: u.id,
    level: u.levelGroup,
    unitNum: u.unitNumber,
  }))
);

// ---------------------------------------------------------------------------
// Seçim yardımcıları
// ---------------------------------------------------------------------------
/**
 * Seviye dengeli seçim: üst seviye öncelikli ama her seviyeden sınırlı
 * sayıda (C1/C2 ≤3, B2 ≤3, B1 ≤3, A2 ≤2, A1 ≤2) + her üniteden ≤ perUnit.
 * Böylece konu hem "üst seviye ön-hazırlık" taşır hem sıçrama yapmaz.
 */
const LEVEL_CAPS: [CefrTag, number][] = [
  ['C1/C2', 3],
  ['B2', 3],
  ['B1', 3],
  ['A2', 2],
  ['A1', 2],
];

function selectByLevel<T extends { level?: CefrTag; unitId?: string; unitNum?: number }>(
  pool: T[],
  max: number,
  perUnit = 2,
): T[] {
  pool.sort((a, b) => LEVEL_SCORE[(b.level as CefrTag) || 'A1'] - LEVEL_SCORE[(a.level as CefrTag) || 'A1'] || (a.unitNum || 0) - (b.unitNum || 0));
  const out: T[] = [];
  const perLevel: Record<string, number> = {};
  const perUnitCount: Record<string, number> = {};
  for (const [lv, cap] of LEVEL_CAPS) {
    if (out.length >= max) break;
    for (const w of pool) {
      if (out.length >= max) break;
      if (w.level !== lv) continue;
      if ((perLevel[lv] || 0) >= cap) continue;
      const uid = w.unitId as string;
      if (uid && (perUnitCount[uid] || 0) >= perUnit) continue;
      perLevel[lv] = (perLevel[lv] || 0) + 1;
      if (uid) perUnitCount[uid] = (perUnitCount[uid] || 0) + 1;
      out.push(w);
    }
  }
  return out;
}

function pickWordsForLetter(glyph: string, max = 10): Topic100Item[] {
  const low = glyph.toLowerCase();
  const pool = FLAT_WORDS.filter((w) => w.ru.toLowerCase().includes(low));
  const out: Topic100Item[] = selectByLevel(pool, max, 3).map((w) => ({
    ru: w.ru,
    reading: w.reading,
    tr: w.tr,
    unitId: w.unitId,
    level: w.level,
  }));
  // Havuz küçükse (ör. Щ) ünite sınırını kaldırıp kalan kelimeleri de ekle.
  if (out.length < Math.min(pool.length, max)) {
    const have = new Set(out.map((o) => o.ru.toLowerCase()));
    for (const w of pool) {
      if (out.length >= max) break;
      if (have.has(w.ru.toLowerCase())) continue;
      have.add(w.ru.toLowerCase());
      out.push({ ru: w.ru, reading: w.reading, tr: w.tr, unitId: w.unitId, level: w.level });
    }
  }
  // İnce harfler için tamamlayıcı (8 kelime hedefi).
  const supp = THIN_LETTER_SUPPLEMENT[glyph] || [];
  const have = new Set(out.map((o) => o.ru.toLowerCase()));
  for (const s of supp) {
    if (out.length >= max) break;
    if (have.has(s.ru.toLowerCase())) continue;
    have.add(s.ru.toLowerCase());
    out.push({ ...s });
  }
  return out;
}

// NOT: Kelime kartları + pratik odaklı akış için konu başına cümle/diyalog
// sayısı bilinçli olarak düşük tutulur (each ≈ 2); uzun listeler yorar.
function pickSentencesForLetter(glyph: string, max = 2): Topic100Sentence[] {
  const low = glyph.toLowerCase();
  const pool = FLAT_SENTENCES.filter((s) => s.ru.toLowerCase().includes(low));
  pool.sort((a, b) => LEVEL_SCORE[b.level as CefrTag] - LEVEL_SCORE[a.level as CefrTag] || a.unitNum - b.unitNum);
  const out: Topic100Sentence[] = [];
  const perUnit = new Set<string>();
  for (const s of pool) {
    if (out.length >= max) break;
    if (perUnit.has(s.unitId as string)) continue;
    perUnit.add(s.unitId as string);
    out.push({ ru: s.ru, tr: s.tr, unitId: s.unitId, level: s.level });
  }
  return out;
}

function pickLinesForLetter(glyph: string, max = 2): Topic100Line[] {
  const low = glyph.toLowerCase();
  const pool = FLAT_LINES.filter((l) => l.ru.toLowerCase().includes(low));
  pool.sort((a, b) => LEVEL_SCORE[b.level as CefrTag] - LEVEL_SCORE[a.level as CefrTag] || a.unitNum - b.unitNum);
  const out: Topic100Line[] = [];
  const perUnit = new Set<string>();
  for (const l of pool) {
    if (out.length >= max) break;
    if (perUnit.has(l.unitId as string)) continue;
    perUnit.add(l.unitId as string);
    out.push({ speaker: l.speaker, ru: l.ru, reading: l.reading, tr: l.tr, unitId: l.unitId, level: l.level });
  }
  return out;
}

/** Ünite diyalog yetersizse kelimelerden kısa bir pratik diyalog kur. */
function synthesizeLines(items: Topic100Item[]): Topic100Line[] {
  if (items.length === 0) return [];
  const a = items[0];
  const b = items[1] || items[0];
  const lines: Topic100Line[] = [
    {
      speaker: 'Аня',
      ru: `Смотри, это ${a.ru.toLowerCase()}!`,
      reading: `Smátri, éta ${a.reading}!`,
      tr: `Bak, bu ${a.tr}!`,
    },
    {
      speaker: 'Макс',
      ru: `${a.ru} — новое слово!`,
      reading: `${a.reading} — novóye slóvo!`,
      tr: `${a.ru} — yeni kelime!`,
    },
    {
      speaker: 'Аня',
      ru: `Мне нравится слово «${b.ru}»!`,
      reading: `Mné nrávitstya slóvo, ${b.reading}!`,
      tr: `«${b.tr}» kelimesini beğendim!`,
    },
  ];
  return lines;
}

/** Ünite cümlesi yetersizse kelimelerden pratik cümleler kur. */
function synthesizeSentences(items: Topic100Item[]): Topic100Sentence[] {
  if (items.length === 0) return [];
  return items.slice(0, 3).map((w) => ({
    ru: `Это ${w.ru.toLowerCase()}.`,
    tr: `Bu ${w.tr}.`,
  }));
}

// ---------------------------------------------------------------------------
// 1) HARF KONULARI (33)
// ---------------------------------------------------------------------------
export function buildLetterTopic(glyph: string, num: number): Topic100 {
  const info = LETTER_INFO.find((l) => l.glyph === glyph);
  const items = pickWordsForLetter(glyph);
  let sentences = pickSentencesForLetter(glyph);
  let dialogue = pickLinesForLetter(glyph);
  if (sentences.length < 1) sentences = [...sentences, ...synthesizeSentences(items)];
  if (dialogue.length < 2) dialogue = [...dialogue, ...synthesizeLines(items)];
  return {
    id: `t100_harf_${glyph.toLowerCase()}`,
    num,
    cat: 'harf',
    icon: glyph,
    titleRu: `Буква ${glyph}`,
    titleTr: `Harf ${glyph}`,
    descTr: info?.note || '',
    letterGlyph: glyph,
    items,
    sentences: sentences.slice(0, 2),
    dialogue: dialogue.slice(0, 2),
  };
}

// ---------------------------------------------------------------------------
// 2) Fonetik konuları: 2 hece + 6 kural
// ---------------------------------------------------------------------------
const VOWELS = 'аеёиоуыэюя';

interface PhoneticRule {
  icon: string;
  titleRu: string;
  titleTr: string;
  descTr: string;
  /** Kelime eşleştiricisi. */
  matchWord: (w: string) => boolean;
  /** Cümle/diyalog filtrelemek için (isteğe bağlı) harf. */
  filterLetter?: string;
}

export const PHONETIC_RULES: PhoneticRule[] = [
  {
    icon: '🅰️',
    titleRu: 'Аканье: О -> А',
    titleTr: 'Akanje (О → А)',
    descTr: 'Vurgusuz "О" konuşma dilinde "A" olur: окно -> aknó, вода -> vadá. Kulağı bu dönüşüme alıştır.',
    matchWord: (w) => w.includes('о'),
    filterLetter: 'о',
  },
  {
    icon: '🅸',
    titleRu: 'Иканье: Е -> И',
    titleTr: 'Ikanje (Е → İ)',
    descTr: 'Vurgusuz "Е" konuşma dilinde "İ"ye kayar: метро -> mitró, место -> mítsa.',
    matchWord: (w) => w.includes('е'),
    filterLetter: 'е',
  },
  {
    icon: '🔇',
    titleRu: 'Звонкие -> глухие на конце',
    titleTr: 'Sonda Sedasızlaşma',
    descTr: 'Kelime sonunda sedeli ünsüzler sedesize döner: брат -> brát (p), дом -> dom (t), год -> gót (k).',
    matchWord: (w) => /[бвгдзж]$/.test(w.trim()),
  },
  {
    icon: '🍮',
    titleRu: 'Мягкий знак ь',
    titleTr: 'Yumuşatma (Ь)',
    descTr: '"Ь" sesi vermez ama önceki ünsüzü yumuşatır: день -> dyén, король -> karól.',
    matchWord: (w) => w.includes('ь'),
    filterLetter: 'ь',
  },
  {
    icon: '🎯',
    titleRu: 'Йодирование: ю, я, ё, е',
    titleTr: 'İyotlaşma (Ю, Я, Ё)',
    descTr: 'Ю, Я, Ё ve Е ünlüleri kendinden önce "y" yarım ünsüzü getirir: юг -> yug, яблоко -> yáblaka.',
    matchWord: (w) => /^(ю|я|ё)/.test(w) || /[лнмрвй](е|ю|я|ё)/.test(w),
    filterLetter: 'ю',
  },
  {
    icon: '⛰️',
    titleRu: 'Ударение в длинных словах',
    titleTr: 'Uzun Kelimelerde Vurgu',
    descTr: 'Ruscada vurgu sabit yere düşmez; her kelimeyi kendi vurgusuyla öğrenmek zorundasın. Uzun, çok heceli kelimeleri vurgularıyla birlikte dinle.',
    matchWord: (w) => VOWELS.split('').filter((v) => w.includes(v)).length >= 3,
  },
];

function pickWordsForRule(rule: PhoneticRule, max = 8): Topic100Item[] {
  const pool = FLAT_WORDS.filter((w) => rule.matchWord(w.ru.toLowerCase()));
  let out = selectByLevel(pool, max, 2).map((w) => ({
    ru: w.ru,
    reading: w.reading,
    tr: w.tr,
    unitId: w.unitId,
    level: w.level,
  }));
  // Güvenlik: havuz dar kalsa üst seviye kelimelerden doldur.
  if (out.length < 4) {
    const have = new Set(out.map((o) => o.ru.toLowerCase()));
    const fill = FLAT_WORDS.filter((w) => !have.has(w.ru.toLowerCase()));
    fill.sort((a, b) => LEVEL_SCORE[b.level as CefrTag] - LEVEL_SCORE[a.level as CefrTag]);
    for (const w of fill) {
      if (out.length >= max) break;
      out.push({ ru: w.ru, reading: w.reading, tr: w.tr, unitId: w.unitId, level: w.level });
    }
  }
  return out;
}

export function buildRuleTopic(rule: PhoneticRule, num: number): Topic100 {
  const items = pickWordsForRule(rule);
  // Cümle/diyalog: olasıysa kuralın harfini içeren, yoksa üst seviye örnekler.
  let sentences = rule.filterLetter
    ? FLAT_SENTENCES.filter((s) => s.ru.toLowerCase().includes(rule.filterLetter as string))
    : FLAT_SENTENCES;
  let lines = rule.filterLetter
    ? FLAT_LINES.filter((l) => l.ru.toLowerCase().includes(rule.filterLetter as string))
    : FLAT_LINES;
  sentences.sort((a, b) => LEVEL_SCORE[b.level as CefrTag] - LEVEL_SCORE[a.level as CefrTag] || a.unitNum - b.unitNum);
  lines.sort((a, b) => LEVEL_SCORE[b.level as CefrTag] - LEVEL_SCORE[a.level as CefrTag] || a.unitNum - b.unitNum);

  const take = <T extends { unitId?: string }>(pool: T[], max: number) => {
    const out: T[] = [];
    const perUnit = new Set<string>();
    for (const p of pool) {
      if (out.length >= max) break;
      if (p.unitId && perUnit.has(p.unitId)) continue;
      if (p.unitId) perUnit.add(p.unitId);
      out.push(p);
    }
    return out;
  };

  const sents = take(sentences, 2).map((s) => ({ ru: s.ru, tr: s.tr, unitId: s.unitId, level: s.level }));
  const dlg = take(lines, 2).map((l) => ({
    speaker: l.speaker,
    ru: l.ru,
    reading: l.reading,
    tr: l.tr,
    unitId: l.unitId,
    level: l.level,
  }));
  return {
    id: `t100_fonetik_${num}`,
    num,
    cat: 'fonetik',
    icon: rule.icon,
    titleRu: rule.titleRu,
    titleTr: rule.titleTr,
    descTr: rule.descTr,
    items,
    sentences: sents.length ? sents : synthesizeSentences(items),
    dialogue: dlg.length ? dlg : synthesizeLines(items),
  };
}

export function buildSyllableTopic(s: (typeof SYLLABLE_TOPICS)[number], num: number): Topic100 {
  return {
    id: `t100_fonetik_${num}`,
    num,
    cat: 'fonetik',
    icon: s.icon,
    titleRu: s.titleRu,
    titleTr: s.titleTr,
    descTr: s.descTr,
    items: s.items.map((i) => ({ ru: i.ru, reading: i.reading, tr: i.tr })),
    sentences: [
      { ru: 'А, о, е, и, ы, у. Смотри, как меняется звук.', tr: '"a, o, e, i, ı, u" hecelerini sırayla dinle.' },
      { ru: 'Говори медленно вместе со мной.', tr: 'Benimle birlikte yavaşça tekrar et.' },
    ],
    dialogue: [
      { speaker: 'Аня', ru: 'Ма-ма! Па-па! Так легко!', reading: 'Ma-ma! Pa-pa! Tak lyéyga!', tr: 'Ma-ma! Pa-pa! Çok kolay!' },
      { speaker: 'Макс', ru: 'Ра-ра-ра, как радио!', reading: 'Ra-ra-ra, kak radió!', tr: 'Ra-ra-ra, radyo gibi!' },
    ],
  };
}

// ---------------------------------------------------------------------------
// 3) MÜFREDAT ÖN-HAZIRLIK (59): 5 A2 + 22 B1 + 17 B2 + 15 C1/C2
// ---------------------------------------------------------------------------
const A2_PREVIEW_IDS = ['mod_a2_1', 'mod_a2_2', 'mod_a2_6', 'mod_a2_7', 'mod_a2_10'];

export function previewUnits(): UnitModule[] {
  const a2 = UNITS.filter((u) => A2_PREVIEW_IDS.includes(u.id));
  const b1 = UNITS.filter((u) => u.levelGroup === 'B1');
  const b2 = UNITS.filter((u) => u.levelGroup === 'B2');
  const c1 = UNITS.filter((u) => u.levelGroup === 'C1/C2');
  return [...a2, ...b1, ...b2, ...c1];
}

export function buildPreviewTopic(u: UnitModule, num: number): Topic100 {
  const items: Topic100Item[] = u.words.slice(0, 10).map((w: WordDetail) => ({
    ru: w.ru,
    reading: w.reading,
    tr: w.tr,
    unitId: u.id,
    level: w.level,
  }));
  // Cümle yoğunluğu düşük: en fazla 2 örnek cümle + en fazla 3 diyalog satırı.
  const dialogue: Topic100Line[] = (u.dialogue ?? [])
    .slice(0, 3)
    .map((l: DialogueLine) => ({
      speaker: l.speaker,
      ru: l.ru,
      reading: l.reading,
      tr: l.tr,
      unitId: u.id,
      level: u.levelGroup,
    }));
  // Ünite diyalogu 2 satırdan kısaysa ünitenin kendi kelimeleriyle
  // pratik bir satır ekle (format her konuda eşit kalsın).
  if (dialogue.length < 2) {
    dialogue.push(...synthesizeLines(items).slice(0, 3 - dialogue.length));
  }
  return {
    id: `t100_mufredat_${u.id}`,
    num,
    cat: 'mufredat',
    icon: u.icon,
    titleTr: u.title,
    descTr: `Müfredat ön-hazırlığı: "${u.title}" ünitesinin (${u.levelGroup}) kelimelerini, cümlelerini ve diyalogunu ileriden dinle.`,
    unitId: u.id,
    levelGroup: u.levelGroup,
    items,
    sentences: u.sentences.slice(0, 2).map((s) => ({
      ru: s.ru,
      tr: s.tr,
      unitId: u.id,
      level: u.levelGroup,
    })),
    dialogue,
  };
}

export type { PhoneticRule };
