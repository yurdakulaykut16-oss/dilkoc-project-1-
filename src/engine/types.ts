// Shared types used by the language-agnostic learning engine.
// Language-specific data (vocab, grammar, curriculum) lives under src/languages/<code>
// and conforms to these shapes. No per-language engine logic should exist.

export type LanguageCode = "en" | "ru";

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type SkillId =
  | "vocabulary"
  | "grammar"
  | "reading"
  | "listening"
  | "writing"
  | "speaking"
  | "pronunciation"
  | "sentenceConstruction"
  | "comprehension";

export interface LanguageConfig {
  code: LanguageCode;
  nativeName: string;
  script: "latin" | "cyrillic";
}

export interface VocabItem {
  id: number;
  languageCode: LanguageCode;
  word: string;
  translation: string;
  pronunciation?: string;
  exampleSentence?: string;
  difficulty: number; // 0-1
  memoryStrength: number; // 0-1, higher = better retained
  easeFactor: number; // SM-2 ease factor, default 2.5
  repetitions: number;
  intervalDays: number;
  nextReviewDate: string; // ISO date
  mistakeCount: number;
  lastReviewedAt?: string;
}

export interface LearnerProfile {
  languageCode: LanguageCode;
  cefrLevel: CEFRLevel;
  cefrScore: number; // continuous 0-100 estimate underlying the CEFR level
  streak: number;
  totalStudyMinutes: number;
}

export interface SkillScore {
  languageCode: LanguageCode;
  skillId: SkillId;
  score: number; // 0-100
}

export interface PlacementQuestion {
  id: string;
  languageCode: LanguageCode;
  level: CEFRLevel;
  skillId: SkillId;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export interface PlacementAnswer {
  questionId: string;
  answer: string;
}

export interface PlacementResult {
  level: CEFRLevel;
  score: number;
  skillBreakdown: Partial<Record<SkillId, number>>;
}

export type TopicStatus = "locked" | "available" | "in_progress" | "completed";

export interface CurriculumTopic {
  id: string;
  languageCode: LanguageCode;
  cefrLevel: CEFRLevel;
  skillId: SkillId;
  title: string;
  prerequisites: string[]; // ids of CurriculumTopic
}

export interface TopicProgress {
  languageCode: LanguageCode;
  topicId: string;
  status: Extract<TopicStatus, "in_progress" | "completed">;
  masteryScore: number; // 0-100
}

export interface CurriculumTopicView {
  topic: CurriculumTopic;
  status: TopicStatus;
  masteryScore: number;
}

export type ActivityType =
  | "vocab_recall"
  | "translation"
  | "sentence_completion"
  | "sentence_construction"
  | "multiple_choice"
  | "grammar_practice"
  | "reading_comprehension"
  | "listening_placeholder"
  | "writing_placeholder";

/** Generic activity payload. The lesson engine never inspects `data` itself —
 *  only the (future) activity UI/grader needs to know its shape — so new
 *  activity types can be added without touching the engine. */
export interface Activity {
  id: string;
  type: ActivityType;
  skillId: SkillId;
  languageCode: LanguageCode;
  prompt: string;
  data: Record<string, unknown>;
  relatedTopicId?: string;
  relatedVocabId?: number;
}

export interface LessonActivity {
  activity: Activity;
  reason: string;
}

export interface Lesson {
  id: string;
  languageCode: LanguageCode;
  cefrLevel: CEFRLevel;
  estimatedDifficulty: number; // 0-1
  targetSkills: SkillId[];
  activities: LessonActivity[];
  expectedDurationMinutes: number;
  generatedAt: string;
}

export interface MistakeRecord {
  id: number;
  languageCode: LanguageCode;
  skillId: SkillId;
  topicId?: string;
  detail: string;
  createdAt: string;
}

export interface LessonContext {
  languageCode: LanguageCode;
  profile: LearnerProfile;
  skillScores: SkillScore[];
  dueVocab: VocabItem[];
  newVocabCandidates: VocabItem[];
  recentMistakes: MistakeRecord[];
  curriculumView: CurriculumTopicView[];
}

export type FlashcardMode = "active_recall" | "reverse_recall" | "translation" | "sentence_completion" | "sentence_building";

export interface FlashcardPrompt {
  mode: FlashcardMode;
  vocabItemId: number;
  question: string;
  expectedAnswer: string;
  options?: string[];
  sentenceTemplate?: string;
}

export interface AnswerEvaluation {
  correct: boolean;
  similarity: number; // 0-1, exact match = 1
  feedback: string;
}

export type GrammarExerciseType = "multiple_choice" | "fill_blank" | "translation" | "correction" | "sentence_building";

export interface GrammarExercise {
  id: string;
  topicId: string;
  languageCode: LanguageCode;
  type: GrammarExerciseType;
  prompt: string;
  expectedAnswer: string;
  options?: string[];
  incorrectSentence?: string; // for "correction" exercises
}

export interface GrammarTopicContent {
  topicId: string; // matches CurriculumTopic.id
  languageCode: LanguageCode;
  explanation: string;
  examples: string[];
  exercises: GrammarExercise[];
}

export interface ComprehensionQuestion {
  id: string;
  type: "multiple_choice" | "short_answer";
  prompt: string;
  expectedAnswer: string;
  options?: string[];
}

export interface ReadingPassage {
  id: string;
  topicId: string; // matches CurriculumTopic.id
  languageCode: LanguageCode;
  cefrLevel: CEFRLevel;
  title: string;
  text: string;
  questions: ComprehensionQuestion[];
  translationPrompt?: { targetSentence: string; expectedAnswer: string };
}

export type WritingPromptType = "sentence_writing" | "free_writing";

export interface WritingPrompt {
  id: string;
  topicId: string;
  languageCode: LanguageCode;
  cefrLevel: CEFRLevel;
  type: WritingPromptType;
  instruction: string;
  requiredWords?: string[]; // sentence_writing: words that must appear
  minWords?: number; // free_writing: minimum length
}
