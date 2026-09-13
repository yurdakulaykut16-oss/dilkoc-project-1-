import type { CEFRLevel } from "./types";

export const CEFR_LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

// Midpoint score (0-100) representing each level's typical difficulty.
const LEVEL_MIDPOINT: Record<CEFRLevel, number> = {
  A1: 8,
  A2: 25,
  B1: 42,
  B2: 58,
  C1: 75,
  C2: 92,
};

const LEVEL_UPPER_BOUND: Record<CEFRLevel, number> = {
  A1: 17,
  A2: 34,
  B1: 50,
  B2: 67,
  C1: 84,
  C2: 101,
};

export function scoreFromLevel(level: CEFRLevel): number {
  return LEVEL_MIDPOINT[level];
}

export function levelFromScore(score: number): CEFRLevel {
  const clamped = Math.min(100, Math.max(0, score));
  for (const level of CEFR_LEVELS) {
    if (clamped < LEVEL_UPPER_BOUND[level]) return level;
  }
  return "C2";
}

/**
 * Continuously adjusts the learner's underlying 0-100 CEFR score after a
 * single graded activity (exercise, review, mini test, ...). Called after
 * placement too, so level tracking never depends solely on the initial test.
 */
export function updateCefrScore(
  currentScore: number,
  correct: boolean,
  questionLevel: CEFRLevel,
  alpha = 0.12
): number {
  const difficulty = scoreFromLevel(questionLevel);
  const sample = correct ? difficulty : Math.max(0, difficulty - 20);
  const next = currentScore + alpha * (sample - currentScore);
  return Math.min(100, Math.max(0, Math.round(next * 10) / 10));
}
