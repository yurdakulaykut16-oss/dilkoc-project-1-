import type { PlacementAnswer, PlacementQuestion, PlacementResult, SkillId } from "./types";
import { levelFromScore, scoreFromLevel } from "./cefr";

/**
 * Scores a placement test. Not the only source of level truth: the result
 * seeds LearnerProfile.cefrScore, which updateCefrScore() then adjusts
 * continuously as the learner does regular activities.
 */
export function scorePlacementTest(
  questions: PlacementQuestion[],
  answers: PlacementAnswer[]
): PlacementResult {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.answer]));

  let weightedSum = 0;
  let totalWeight = 0;
  const skillCorrect: Partial<Record<SkillId, number>> = {};
  const skillTotal: Partial<Record<SkillId, number>> = {};

  for (const q of questions) {
    const given = answerMap.get(q.id);
    const correct = given !== undefined && given === q.correctAnswer;
    const difficulty = scoreFromLevel(q.level);
    const value = correct ? difficulty : difficulty * 0.2;

    weightedSum += value;
    totalWeight += 1;

    skillTotal[q.skillId] = (skillTotal[q.skillId] ?? 0) + 1;
    if (correct) skillCorrect[q.skillId] = (skillCorrect[q.skillId] ?? 0) + 1;
  }

  const score = totalWeight === 0 ? scoreFromLevel("A1") : weightedSum / totalWeight;

  const skillBreakdown: Partial<Record<SkillId, number>> = {};
  for (const skill of Object.keys(skillTotal) as SkillId[]) {
    const total = skillTotal[skill] ?? 0;
    const correct = skillCorrect[skill] ?? 0;
    skillBreakdown[skill] = total === 0 ? 0 : Math.round((correct / total) * 100);
  }

  return {
    level: levelFromScore(score),
    score: Math.round(score * 10) / 10,
    skillBreakdown,
  };
}
