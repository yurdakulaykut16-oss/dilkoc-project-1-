import type { CEFRLevel, CurriculumTopic } from "../../engine/types";

const A1: CurriculumTopic[] = [
  {
    id: "ru-a1-vocab-alphabet",
    languageCode: "ru",
    cefrLevel: "A1",
    skillId: "vocabulary",
    title: "Kiril Alfabesi ve Temel Kelimeler",
    prerequisites: [],
  },
  {
    id: "ru-a1-vocab-greetings",
    languageCode: "ru",
    cefrLevel: "A1",
    skillId: "vocabulary",
    title: "Selamlaşma",
    prerequisites: ["ru-a1-vocab-alphabet"],
  },
  {
    id: "ru-a1-gram-gender",
    languageCode: "ru",
    cefrLevel: "A1",
    skillId: "grammar",
    title: "İsim Cinsiyeti (Род)",
    prerequisites: ["ru-a1-vocab-alphabet"],
  },
  {
    id: "ru-a1-gram-nominative-case",
    languageCode: "ru",
    cefrLevel: "A1",
    skillId: "grammar",
    title: "Yalın Hal (Именительный падеж)",
    prerequisites: ["ru-a1-gram-gender"],
  },
  {
    id: "ru-a1-reading-simple-texts",
    languageCode: "ru",
    cefrLevel: "A1",
    skillId: "reading",
    title: "Basit Metinleri Anlama",
    prerequisites: ["ru-a1-vocab-alphabet"],
  },
  {
    id: "ru-a1-listening-basic-dialogues",
    languageCode: "ru",
    cefrLevel: "A1",
    skillId: "listening",
    title: "Temel Diyalogları Dinleme",
    prerequisites: ["ru-a1-vocab-greetings"],
  },
  {
    id: "ru-a1-writing-simple-sentences",
    languageCode: "ru",
    cefrLevel: "A1",
    skillId: "writing",
    title: "Basit Cümleler Yazma",
    prerequisites: ["ru-a1-gram-nominative-case"],
  },
  {
    id: "ru-a1-speaking-self-intro",
    languageCode: "ru",
    cefrLevel: "A1",
    skillId: "speaking",
    title: "Kendini Tanıtma",
    prerequisites: ["ru-a1-vocab-greetings", "ru-a1-gram-gender"],
  },
];

// A2-C2 will be added in later phases without changing the curriculum engine.
export const ruCurriculum: Record<CEFRLevel, CurriculumTopic[]> = {
  A1,
  A2: [],
  B1: [],
  B2: [],
  C1: [],
  C2: [],
};
