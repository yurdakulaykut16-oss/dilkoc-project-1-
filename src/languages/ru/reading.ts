import type { ReadingPassage } from "../../engine/types";

export const ruReading: ReadingPassage[] = [
  {
    id: "ru-a1-reading-1",
    topicId: "ru-a1-reading-simple-texts",
    languageCode: "ru",
    cefrLevel: "A1",
    title: "Мой день",
    text: "Меня зовут Анна. Я студентка. Я встаю в семь часов. Я завтракаю. Потом я иду в школу. Вечером я читаю книгу.",
    questions: [
      { id: "ru-a1-r1-q1", type: "multiple_choice", prompt: "Кто Анна?", expectedAnswer: "студентка", options: ["учитель", "студентка", "врач"] },
      { id: "ru-a1-r1-q2", type: "short_answer", prompt: "Во сколько Анна встаёт?", expectedAnswer: "семь" },
      { id: "ru-a1-r1-q3", type: "short_answer", prompt: "Что Анна делает вечером?", expectedAnswer: "читает книгу" },
    ],
    translationPrompt: { targetSentence: "Я завтракаю.", expectedAnswer: "kahvaltı yapıyorum" },
  },
];
