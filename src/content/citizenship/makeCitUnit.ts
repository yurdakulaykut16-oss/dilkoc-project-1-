import type { UnitModule } from '../../curriculumData';

export type CitWord = [string, string, string, string?];
export type CitSent = [string, string];
export type CitLine = [string, string, string, string];

function derange(words: string[]): string[] {
  if (words.length < 2) return [...words];
  for (let shift = 1; shift < words.length; shift++) {
    const out = words.map((_, i) => words[(i + shift) % words.length]);
    if (out.every((w, i) => w !== words[i])) return out;
  }
  return [...words].reverse();
}

export function makeCitUnit(cfg: {
  id: string;
  unitNumber: number;
  level: UnitModule['levelGroup'];
  icon: string;
  title: string;
  desc: string;
  category: string;
  color: string;
  grammar: string;
  words: CitWord[];
  sents: CitSent[];
  dlg: CitLine[];
}): UnitModule {
  return {
    id: cfg.id,
    unitNumber: cfg.unitNumber,
    levelGroup: cfg.level,
    title: cfg.title,
    description: cfg.desc,
    category: cfg.category,
    color: cfg.color,
    icon: cfg.icon,
    grammarExplain: cfg.grammar,
    words: cfg.words.map(([ru, reading, tr, note], i) => ({
      id: `${cfg.id}_w${i + 1}`,
      ru,
      reading,
      tr,
      level: cfg.level,
      usageNote: note ?? '',
    })),
    sentences: cfg.sents.map(([ru, tr]) => {
      const correct = ru.split(' ').filter(Boolean);
      return { ru, tr, correct, scrambled: derange(correct) };
    }),
    dialogue: cfg.dlg.map(([speaker, ru, reading, tr]) => ({ speaker, ru, reading, tr })),
  };
}
