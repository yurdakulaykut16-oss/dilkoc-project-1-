import type { WritingPrompt } from "../../engine/types";

export const enWriting: WritingPrompt[] = [
  {
    id: "en-a1-writing-1",
    topicId: "en-a1-writing-simple-sentences",
    languageCode: "en",
    cefrLevel: "A1",
    type: "sentence_writing",
    instruction: '"a", "book" ve "the" kelimelerini kullanarak bir cümle yaz.',
    requiredWords: ["a", "book", "the"],
  },
  {
    id: "en-a1-writing-2",
    topicId: "en-a1-writing-simple-sentences",
    languageCode: "en",
    cefrLevel: "A1",
    type: "free_writing",
    instruction: "Kendini 3 cümleyle tanıt (adın, yaşın, nereli olduğun).",
    minWords: 10,
  },
];
