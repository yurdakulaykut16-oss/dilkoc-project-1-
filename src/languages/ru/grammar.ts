import type { GrammarTopicContent } from "../../engine/types";

export const ruGrammar: GrammarTopicContent[] = [
  {
    topicId: "ru-a1-gram-gender",
    languageCode: "ru",
    explanation: "Rusçada isimler eril, dişil ve nötr olabilir. Genelde eril ünsüzle, dişil -а/-я ile, nötr -о/-е ile biter.",
    examples: ["стол (eril)", "книга (dişil)", "окно (nötr)"],
    exercises: [
      { id: "ru-a1-gram-gen-mc1", topicId: "ru-a1-gram-gender", languageCode: "ru", type: "multiple_choice", prompt: "«книга» kelimesinin cinsiyeti nedir?", expectedAnswer: "dişil", options: ["eril", "dişil", "nötr"] },
      { id: "ru-a1-gram-gen-fb1", topicId: "ru-a1-gram-gender", languageCode: "ru", type: "fill_blank", prompt: "«окно» — bu kelime ___ cinsiyettedir.", expectedAnswer: "nötr" },
      { id: "ru-a1-gram-gen-co1", topicId: "ru-a1-gram-gender", languageCode: "ru", type: "correction", prompt: "Hatayı düzelt.", incorrectSentence: "Это большой книга.", expectedAnswer: "Это большая книга." },
    ],
  },
  {
    topicId: "ru-a1-gram-nominative-case",
    languageCode: "ru",
    explanation: "Yalın hal (именительный падеж), cümlenin öznesini gösterir ve sözlükteki temel biçimdir.",
    examples: ["Кошка спит.", "Студент читает.", "Это дом."],
    exercises: [
      { id: "ru-a1-gram-nom-mc1", topicId: "ru-a1-gram-nominative-case", languageCode: "ru", type: "multiple_choice", prompt: "Cümlenin öznesini seç: «Собака бежит».", expectedAnswer: "собака", options: ["собака", "бежит", "и"] },
      { id: "ru-a1-gram-nom-tr1", topicId: "ru-a1-gram-nominative-case", languageCode: "ru", type: "translation", prompt: "Bu bir ev. (Это ___.)", expectedAnswer: "дом" },
      { id: "ru-a1-gram-nom-sb1", topicId: "ru-a1-gram-nominative-case", languageCode: "ru", type: "sentence_building", prompt: "Kelimeleri doğru sırala.", expectedAnswer: "Кошка спит." },
    ],
  },
];
