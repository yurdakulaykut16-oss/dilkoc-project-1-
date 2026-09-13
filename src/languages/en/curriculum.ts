import type { CEFRLevel, CurriculumTopic } from "../../engine/types";

const A1: CurriculumTopic[] = [
  {
    id: "en-a1-vocab-greetings",
    languageCode: "en",
    cefrLevel: "A1",
    skillId: "vocabulary",
    title: "Selamlaşma ve Tanışma Kelimeleri",
    prerequisites: [],
  },
  {
    id: "en-a1-vocab-numbers-time",
    languageCode: "en",
    cefrLevel: "A1",
    skillId: "vocabulary",
    title: "Sayılar ve Saat",
    prerequisites: ["en-a1-vocab-greetings"],
  },
  {
    id: "en-a1-gram-tobe",
    languageCode: "en",
    cefrLevel: "A1",
    skillId: "grammar",
    title: "\"To be\" Fiili",
    prerequisites: ["en-a1-vocab-greetings"],
  },
  {
    id: "en-a1-gram-articles",
    languageCode: "en",
    cefrLevel: "A1",
    skillId: "grammar",
    title: "Articles: a / an / the",
    prerequisites: ["en-a1-gram-tobe"],
  },
  {
    id: "en-a1-reading-simple-texts",
    languageCode: "en",
    cefrLevel: "A1",
    skillId: "reading",
    title: "Basit Metinleri Anlama",
    prerequisites: ["en-a1-gram-tobe"],
  },
  {
    id: "en-a1-listening-basic-dialogues",
    languageCode: "en",
    cefrLevel: "A1",
    skillId: "listening",
    title: "Temel Diyalogları Dinleme",
    prerequisites: ["en-a1-vocab-greetings"],
  },
  {
    id: "en-a1-writing-simple-sentences",
    languageCode: "en",
    cefrLevel: "A1",
    skillId: "writing",
    title: "Basit Cümleler Yazma",
    prerequisites: ["en-a1-gram-articles"],
  },
  {
    id: "en-a1-speaking-self-intro",
    languageCode: "en",
    cefrLevel: "A1",
    skillId: "speaking",
    title: "Kendini Tanıtma",
    prerequisites: ["en-a1-vocab-greetings", "en-a1-gram-tobe"],
  },
];

// A2-C2 will be added in later phases without changing the curriculum engine.
export const enCurriculum: Record<CEFRLevel, CurriculumTopic[]> = {
  A1,
  A2: [],
  B1: [],
  B2: [],
  C1: [],
  C2: [],
};
