import type { WritingPrompt } from "../../engine/types";

export const ruWriting: WritingPrompt[] = [
  {
    id: "ru-a1-writing-1",
    topicId: "ru-a1-writing-simple-sentences",
    languageCode: "ru",
    cefrLevel: "A1",
    type: "sentence_writing",
    instruction: '"книга", "дом" ve "и" kelimelerini kullanarak bir cümle yaz.',
    requiredWords: ["книга", "дом", "и"],
  },
  {
    id: "ru-a1-writing-2",
    topicId: "ru-a1-writing-simple-sentences",
    languageCode: "ru",
    cefrLevel: "A1",
    type: "free_writing",
    instruction: "Kendini 3 cümleyle tanıt (adın, yaşın, nereli olduğun).",
    minWords: 8,
  },
];
