import type { FlashcardMode, FlashcardPrompt, LanguageCode, VocabItem } from "./types";
import { seedFromString, shuffleDeterministic } from "./random";

function languageLabel(lang: LanguageCode): string {
  return lang === "ru" ? "Rusça" : "İngilizce";
}

function fallbackSentence(item: VocabItem): string {
  return item.exampleSentence && item.exampleSentence.trim().length > 0 ? item.exampleSentence : `${item.word}.`;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function blankOutWord(sentence: string, word: string): string {
  const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
  return pattern.test(sentence) ? sentence.replace(pattern, "___") : `___ (${sentence})`;
}

function tokenize(sentence: string): string[] {
  return sentence.trim().split(/\s+/).filter(Boolean);
}

/** Builds multiple-choice options (answer + distractors) in stable-but-varied order. */
function buildOptions(answer: string, distractors: string[], seed: number): string[] | undefined {
  if (distractors.length === 0) return undefined;
  const pool = [answer, ...distractors.filter((d) => d !== answer)];
  return shuffleDeterministic(pool, seed);
}

/**
 * Builds a flashcard prompt for a vocab item in a given mode. Pure and
 * language-agnostic: all EN/RU differences come from the VocabItem data.
 * distractors (optional) turn a recall prompt into a scaffolded
 * recognition prompt - used for very weak items.
 */
export function buildFlashcard(item: VocabItem, mode: FlashcardMode, distractors: string[] = []): FlashcardPrompt {
  const seed = seedFromString(`${item.id}-${mode}`);

  switch (mode) {
    case "active_recall":
      return {
        mode,
        vocabItemId: item.id,
        question: `"${item.word}" ne demek?`,
        expectedAnswer: item.translation,
        options: buildOptions(item.translation, distractors, seed),
      };
    case "reverse_recall":
      return {
        mode,
        vocabItemId: item.id,
        question: `"${item.translation}" kelimesinin ${languageLabel(item.languageCode)} karşılığı nedir?`,
        expectedAnswer: item.word,
        options: buildOptions(item.word, distractors, seed),
      };
    case "translation": {
      const sentence = fallbackSentence(item);
      return {
        mode,
        vocabItemId: item.id,
        question: `Bağlam içinde çevir: "${sentence}" cümlesinde "${item.word}" ne anlama geliyor?`,
        expectedAnswer: item.translation,
        sentenceTemplate: sentence,
      };
    }
    case "sentence_completion": {
      const sentence = fallbackSentence(item);
      return {
        mode,
        vocabItemId: item.id,
        question: blankOutWord(sentence, item.word),
        expectedAnswer: item.word,
        sentenceTemplate: sentence,
      };
    }
    case "sentence_building": {
      const sentence = fallbackSentence(item);
      const scrambled = shuffleDeterministic(tokenize(sentence), seedFromString(`${item.id}-tokens`));
      return {
        mode,
        vocabItemId: item.id,
        question: `Kelimeleri kullanarak doğru cümleyi oluştur: ${scrambled.join(" / ")}`,
        expectedAnswer: sentence,
        sentenceTemplate: sentence,
      };
    }
  }
}
