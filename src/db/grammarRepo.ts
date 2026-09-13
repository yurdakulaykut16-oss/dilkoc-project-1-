import type { AnswerEvaluation, GrammarExercise } from "../engine/types";
import { evaluateGrammarAnswer } from "../engine/grammarEvaluation";
import { evaluateGrammarMasteryImpact } from "../engine/masteryTracking";
import { getGrammarTopicContent } from "../languages/registry";
import { recordMistake } from "./mistakesRepo";
import { getSkillScores, upsertSkillScore } from "./skillScoreRepo";

export interface GrammarSubmissionResult {
  evaluation: AnswerEvaluation;
  updatedGrammarSkillScore: number;
}

/** Grades a grammar exercise answer, then updates the grammar skill score and,
 *  on failure, logs a topic-tagged mistake — same pattern as flashcardRepo. */
export async function submitGrammarAnswer(exercise: GrammarExercise, userAnswer: string): Promise<GrammarSubmissionResult> {
  const evaluation = evaluateGrammarAnswer(exercise.type, exercise.expectedAnswer, userAnswer);
  const impact = evaluateGrammarMasteryImpact(evaluation, exercise);

  const currentScores = await getSkillScores(exercise.languageCode);
  const currentScore = currentScores.find((s) => s.skillId === "grammar")?.score ?? 50;
  const updatedGrammarSkillScore = Math.min(100, Math.max(0, currentScore + impact.skillScoreDelta));
  await upsertSkillScore(exercise.languageCode, "grammar", updatedGrammarSkillScore);

  if (impact.mistake) {
    await recordMistake(exercise.languageCode, impact.mistake.skillId, impact.mistake.detail, impact.mistake.topicId);
  }

  return { evaluation, updatedGrammarSkillScore };
}

export function getGrammarContent(languageCode: Parameters<typeof getGrammarTopicContent>[0], topicId: string) {
  return getGrammarTopicContent(languageCode, topicId);
}
