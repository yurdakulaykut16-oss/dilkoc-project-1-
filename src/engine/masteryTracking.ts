import type { AnswerEvaluation, FlashcardMode, GrammarExercise, SkillId, VocabItem } from "./types";

const CORRECT_SKILL_SCORE_DELTA = 1.5;
const INCORRECT_SKILL_SCORE_DELTA = -2.5;

export interface MasteryImpact {
  skillScoreDelta: number;
  mistake?: { skillId: SkillId; detail: string; topicId?: string };
}

/** Turns a graded flashcard answer into a vocabulary skill-score nudge and,
 *  on failure, a mistake record for the lesson engine's repeated-mistake logic. */
export function evaluateMasteryImpact(
  evaluation: AnswerEvaluation,
  vocabItem: VocabItem,
  mode: FlashcardMode
): MasteryImpact {
  if (evaluation.correct) {
    return { skillScoreDelta: CORRECT_SKILL_SCORE_DELTA };
  }
  return {
    skillScoreDelta: INCORRECT_SKILL_SCORE_DELTA,
    mistake: {
      skillId: "vocabulary",
      detail: `"${vocabItem.word}" (${mode}) hatası — beklenen: "${vocabItem.translation}"`,
    },
  };
}

/** Same idea for grammar exercises: nudges the grammar skill score and logs
 *  a topic-tagged mistake so repeated errors surface in future lessons. */
export function evaluateGrammarMasteryImpact(evaluation: AnswerEvaluation, exercise: GrammarExercise): MasteryImpact {
  if (evaluation.correct) {
    return { skillScoreDelta: CORRECT_SKILL_SCORE_DELTA };
  }
  return {
    skillScoreDelta: INCORRECT_SKILL_SCORE_DELTA,
    mistake: {
      skillId: "grammar",
      topicId: exercise.topicId,
      detail: `${exercise.prompt} — beklenen: "${exercise.expectedAnswer}"`,
    },
  };
}

export function evaluateReadingMasteryImpact(evaluation: AnswerEvaluation, topicId: string, prompt: string): MasteryImpact {
  if (evaluation.correct) return { skillScoreDelta: CORRECT_SKILL_SCORE_DELTA };
  return {
    skillScoreDelta: INCORRECT_SKILL_SCORE_DELTA,
    mistake: { skillId: "reading", topicId, detail: `${prompt} — yanlış cevap` },
  };
}

/** Writing mistakes are only logged when deterministically checkable
 *  (sentence_writing missing a required word) — free writing quality is
 *  never auto-judged as a "mistake". */
export function evaluateWritingMasteryImpact(evaluation: AnswerEvaluation, topicId: string, detail: string): MasteryImpact {
  if (evaluation.correct) return { skillScoreDelta: CORRECT_SKILL_SCORE_DELTA };
  return {
    skillScoreDelta: INCORRECT_SKILL_SCORE_DELTA,
    mistake: { skillId: "writing", topicId, detail },
  };
}
