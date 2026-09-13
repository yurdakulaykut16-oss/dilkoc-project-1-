import type { CEFRLevel, CurriculumTopic, GrammarTopicContent, LanguageCode, ReadingPassage, WritingPrompt } from "../engine/types";
import { enCurriculum } from "./en/curriculum";
import { ruCurriculum } from "./ru/curriculum";
import { enGrammar } from "./en/grammar";
import { ruGrammar } from "./ru/grammar";
import { enReading } from "./en/reading";
import { ruReading } from "./ru/reading";
import { enWriting } from "./en/writing";
import { ruWriting } from "./ru/writing";

const LANGUAGE_CURRICULA: Record<LanguageCode, Record<CEFRLevel, CurriculumTopic[]>> = {
  en: enCurriculum,
  ru: ruCurriculum,
};

const LANGUAGE_GRAMMAR: Record<LanguageCode, GrammarTopicContent[]> = {
  en: enGrammar,
  ru: ruGrammar,
};

const LANGUAGE_READING: Record<LanguageCode, ReadingPassage[]> = {
  en: enReading,
  ru: ruReading,
};

const LANGUAGE_WRITING: Record<LanguageCode, WritingPrompt[]> = {
  en: enWriting,
  ru: ruWriting,
};

export function getCurriculumTopics(languageCode: LanguageCode, level: CEFRLevel): CurriculumTopic[] {
  return LANGUAGE_CURRICULA[languageCode]?.[level] ?? [];
}

export function getGrammarTopicContent(languageCode: LanguageCode, topicId: string): GrammarTopicContent | null {
  return LANGUAGE_GRAMMAR[languageCode]?.find((g) => g.topicId === topicId) ?? null;
}

export function getReadingPassageForTopic(languageCode: LanguageCode, topicId: string): ReadingPassage | null {
  return LANGUAGE_READING[languageCode]?.find((r) => r.topicId === topicId) ?? null;
}

export function getWritingPromptsForTopic(languageCode: LanguageCode, topicId: string): WritingPrompt[] {
  return LANGUAGE_WRITING[languageCode]?.filter((w) => w.topicId === topicId) ?? [];
}
