import type { AnswerEvaluation, ComprehensionQuestion, LanguageCode, WritingPrompt } from "../engine/types";
import {
  evaluateFreeWriting,
  evaluateReadingAnswer,
  evaluateSentenceWriting,
} from "../engine/readingWritingEvaluation";
import { evaluateReadingMasteryImpact, evaluateWritingMasteryImpact } from "../engine/masteryTracking";
import { recordMistake } from "./mistakesRepo";
import { getSkillScores, upsertSkillScore } from "./skillScoreRepo";
import { getReadingPassageForTopic, getWritingPromptsForTopic } from "../languages/registry";

export interface SkillSubmissionResult {
  evaluation: AnswerEvaluation;
  updatedSkillScore: number;
}

async function applyImpact(
  languageCode: LanguageCode,
  skillId: "reading" | "writing",
  evaluation: AnswerEvaluation,
  topicId: string,
  detailIfWrong: string
): Promise<number> {
  const impact =
    skillId === "reading"
      ? evaluateReadingMasteryImpact(evaluation, topicId, detailIfWrong)
      : evaluateWritingMasteryImpact(evaluation, topicId, detailIfWrong);

  const currentScores = await getSkillScores(languageCode);
  const currentScore = currentScores.find((s) => s.skillId === skillId)?.score ?? 50;
  const updated = Math.min(100, Math.max(0, currentScore + impact.skillScoreDelta));
  await upsertSkillScore(languageCode, skillId, updated);
  if (impact.mistake) {
    await recordMistake(languageCode, impact.mistake.skillId, impact.mistake.detail, impact.mistake.topicId);
  }
  return updated;
}

export async function submitReadingAnswer(
  languageCode: LanguageCode,
  topicId: string,
  question: ComprehensionQuestion,
  userAnswer: string
): Promise<SkillSubmissionResult> {
  const evaluation = evaluateReadingAnswer(question.expectedAnswer, userAnswer);
  const updatedSkillScore = await applyImpact(languageCode, "reading", evaluation, topicId, question.prompt);
  return { evaluation, updatedSkillScore };
}

export async function submitWritingAnswer(
  languageCode: LanguageCode,
  topicId: string,
  prompt: WritingPrompt,
  userAnswer: string
): Promise<SkillSubmissionResult> {
  const evaluation =
    prompt.type === "sentence_writing"
      ? evaluateSentenceWriting(prompt.requiredWords ?? [], userAnswer)
      : evaluateFreeWriting(prompt.minWords ?? 0, userAnswer);
  const updatedSkillScore = await applyImpact(languageCode, "writing", evaluation, topicId, prompt.instruction);
  return { evaluation, updatedSkillScore };
}

export function getReadingPassage(languageCode: LanguageCode, topicId: string) {
  return getReadingPassageForTopic(languageCode, topicId);
}

export function getWritingPrompts(languageCode: LanguageCode, topicId: string) {
  return getWritingPromptsForTopic(languageCode, topicId);
}
