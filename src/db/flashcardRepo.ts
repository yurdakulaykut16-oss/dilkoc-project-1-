import type { AnswerEvaluation, FlashcardMode, VocabItem } from "../engine/types";
import { buildFlashcard } from "../engine/flashcards";
import { evaluateAnswer } from "../engine/answerEvaluation";
import { evaluateMasteryImpact } from "../engine/masteryTracking";
import { recordReview } from "./vocabRepo";
import { recordMistake } from "./mistakesRepo";
import { getSkillScores, upsertSkillScore } from "./skillScoreRepo";

export interface FlashcardSubmission {
  vocabItem: VocabItem;
  mode: FlashcardMode;
  userAnswer: string;
  responseTimeMs?: number;
}

export interface FlashcardSubmissionResult {
  evaluation: AnswerEvaluation;
  updatedVocabItem: VocabItem;
  updatedVocabularySkillScore: number;
}

/**
 * Grades a flashcard answer, then propagates the result into the existing
 * systems: SRS schedule (vocabRepo), vocabulary skill score, and — on
 * failure — a mistake record. The lesson engine picks all of this up
 * automatically next time it reads due vocab / skill scores / mistakes.
 */
export async function submitFlashcardAnswer(
  submission: FlashcardSubmission,
  now = new Date()
): Promise<FlashcardSubmissionResult> {
  const { vocabItem, mode, userAnswer, responseTimeMs } = submission;

  const prompt = buildFlashcard(vocabItem, mode);
  const evaluation = evaluateAnswer(mode, prompt.expectedAnswer, userAnswer);

  const updatedVocabItem = await recordReview(vocabItem, { correct: evaluation.correct, responseTimeMs }, now);

  const impact = evaluateMasteryImpact(evaluation, vocabItem, mode);
  const currentScores = await getSkillScores(vocabItem.languageCode);
  const currentScore = currentScores.find((s) => s.skillId === "vocabulary")?.score ?? 50;
  const updatedVocabularySkillScore = Math.min(100, Math.max(0, currentScore + impact.skillScoreDelta));
  await upsertSkillScore(vocabItem.languageCode, "vocabulary", updatedVocabularySkillScore);

  if (impact.mistake) {
    await recordMistake(vocabItem.languageCode, impact.mistake.skillId, impact.mistake.detail);
  }

  return { evaluation, updatedVocabItem, updatedVocabularySkillScore };
}
