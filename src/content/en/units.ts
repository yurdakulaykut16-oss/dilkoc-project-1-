// ============================================================================
// 🇬🇧 İNGİLİZCE MÜFREDATI — BİRLEŞTİRİCİ (units)
// ----------------------------------------------------------------------------
// Ham veri (unitsA/B/C) burada Rusça müfredatla AYNI interface'e
// (curriculumData.UnitModule) dönüştürülür:
//   • kelime kimlikleri otomatik üretilir,
//   • cümlelerin "scrambled" dizisi deterministik yer değiştirmeyle kurulur,
//   • kelime seviyesi ünitenin seviyesini alır.
// curriculumData.ts, aktif dil 'en' olduğunda UNITS_DATA olarak bu diziyi kullanır.
// ============================================================================

import type { UnitModule, WordDetail } from '../../curriculumData';
import type { EnRawUnit } from './unitsA';
import { EN_UNITS_A } from './unitsA';
import { EN_UNITS_B } from './unitsB';
import { EN_UNITS_C } from './unitsC';

/** Deterministik yer değiştirme: doğru dizilişten FARKLI bir karışım üretir. */
function derange(words: string[]): string[] {
  if (words.length < 2) return [...words];
  const shift = Math.ceil(words.length / 2);
  return words.map((_, i) => words[(i + shift) % words.length]);
}

function buildUnit(raw: EnRawUnit): UnitModule {
  const words: WordDetail[] = raw.words.map(([word, reading, tr, note], i) => ({
    id: `${raw.id}_w${i + 1}`,
    ru: word, // NOT: "ru" alanı hedef dil metnini taşır (burada İngilizce)
    reading,
    tr,
    level: raw.levelGroup,
    usageNote: note,
  }));

  return {
    id: raw.id,
    unitNumber: raw.unitNumber,
    levelGroup: raw.levelGroup,
    title: raw.title,
    description: raw.description,
    category: raw.category,
    color: raw.color,
    icon: raw.icon,
    grammarExplain: raw.grammarExplain,
    words,
    sentences: raw.sentences.map(([en, tr]) => {
      const correct = en.split(' ').filter(Boolean);
      return { ru: en, tr, correct, scrambled: derange(correct) };
    }),
    sceneTitle: raw.sceneTitle,
    sceneContext: raw.sceneContext,
    dialogue: raw.dialogue.map(([speaker, en, reading, tr]) => ({ speaker, ru: en, reading, tr })),
  };
}

const ALL: EnRawUnit[] = [...EN_UNITS_A, ...EN_UNITS_B, ...EN_UNITS_C];

/** İngilizce müfredatı: A1 (8) → A2 (8) → B1 (8) → B2 (8) → C1 (8) → C1/C2 (8) = 48 ünite. */
export const EN_UNITS: UnitModule[] = ALL
  .map(buildUnit)
  .sort((a, b) => a.unitNumber - b.unitNumber);
