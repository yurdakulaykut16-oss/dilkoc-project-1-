import type { GrammarTopicContent } from "../../engine/types";

export const enGrammar: GrammarTopicContent[] = [
  {
    topicId: "en-a1-gram-tobe",
    languageCode: "en",
    explanation: '"To be" fiili kişiye göre değişir: I am, you/we/they are, he/she/it is.',
    examples: ["I am a student.", "She is happy.", "They are here."],
    exercises: [
      { id: "en-a1-gram-tobe-mc1", topicId: "en-a1-gram-tobe", languageCode: "en", type: "multiple_choice", prompt: "She ___ a teacher.", expectedAnswer: "is", options: ["am", "is", "are"] },
      { id: "en-a1-gram-tobe-fb1", topicId: "en-a1-gram-tobe", languageCode: "en", type: "fill_blank", prompt: "They ___ my friends.", expectedAnswer: "are" },
      { id: "en-a1-gram-tobe-tr1", topicId: "en-a1-gram-tobe", languageCode: "en", type: "translation", prompt: "Ben mutluyum. (I ___ happy.)", expectedAnswer: "am" },
      { id: "en-a1-gram-tobe-co1", topicId: "en-a1-gram-tobe", languageCode: "en", type: "correction", prompt: "Cümledeki hatayı düzelt.", incorrectSentence: "He are a doctor.", expectedAnswer: "He is a doctor." },
      { id: "en-a1-gram-tobe-sb1", topicId: "en-a1-gram-tobe", languageCode: "en", type: "sentence_building", prompt: "Kelimeleri doğru sırala.", expectedAnswer: "We are students." },
    ],
  },
  {
    topicId: "en-a1-gram-articles",
    languageCode: "en",
    explanation: '"a/an" belirsiz, "the" belirli nesneler için kullanılır. Ünlü sesle başlayan kelimelerde "an" kullanılır.',
    examples: ["I have a cat.", "She is an engineer.", "The book is on the table."],
    exercises: [
      { id: "en-a1-gram-art-mc1", topicId: "en-a1-gram-articles", languageCode: "en", type: "multiple_choice", prompt: "I saw ___ elephant.", expectedAnswer: "an", options: ["a", "an", "the"] },
      { id: "en-a1-gram-art-fb1", topicId: "en-a1-gram-articles", languageCode: "en", type: "fill_blank", prompt: "This is ___ apple.", expectedAnswer: "an" },
      { id: "en-a1-gram-art-co1", topicId: "en-a1-gram-articles", languageCode: "en", type: "correction", prompt: "Cümledeki hatayı düzelt.", incorrectSentence: "I have a orange.", expectedAnswer: "I have an orange." },
      { id: "en-a1-gram-art-sb1", topicId: "en-a1-gram-articles", languageCode: "en", type: "sentence_building", prompt: "Kelimeleri doğru sırala.", expectedAnswer: "The dog is big." },
    ],
  },
];
