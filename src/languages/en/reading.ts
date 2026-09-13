import type { ReadingPassage } from "../../engine/types";

export const enReading: ReadingPassage[] = [
  {
    id: "en-a1-reading-1",
    topicId: "en-a1-reading-simple-texts",
    languageCode: "en",
    cefrLevel: "A1",
    title: "My Day",
    text: "My name is Anna. I am a student. I get up at seven. I have breakfast. Then I go to school. In the evening, I read a book.",
    questions: [
      { id: "en-a1-r1-q1", type: "multiple_choice", prompt: "What is Anna?", expectedAnswer: "a student", options: ["a teacher", "a student", "a doctor"] },
      { id: "en-a1-r1-q2", type: "short_answer", prompt: "What time does Anna get up?", expectedAnswer: "seven" },
      { id: "en-a1-r1-q3", type: "short_answer", prompt: "What does Anna do in the evening?", expectedAnswer: "read a book" },
    ],
    translationPrompt: { targetSentence: "I have breakfast.", expectedAnswer: "kahvaltı yapıyorum" },
  },
];
