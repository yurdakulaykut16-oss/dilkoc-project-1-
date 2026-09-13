import type { AnswerEvaluation, GrammarExerciseType } from "./types";

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/[.,!?;:"'()]/g, "").replace(/\s+/g, " ");
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[a.length][b.length];
}

function similarityRatio(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return Math.round((1 - levenshtein(a, b) / maxLen) * 100) / 100;
}

/** Grades a grammar exercise answer. sentence_building reuses the same
 *  token-sequence logic as the flashcard evaluator (right words/wrong order). */
export function evaluateGrammarAnswer(
  type: GrammarExerciseType,
  expectedAnswer: string,
  userAnswer: string
): AnswerEvaluation {
  const normExpected = normalize(expectedAnswer);
  const normUser = normalize(userAnswer);

  if (type === "sentence_building") {
    const expectedTokens = normExpected.split(" ").filter(Boolean);
    const userTokens = normUser.split(" ").filter(Boolean);
    const exact = expectedTokens.length === userTokens.length && expectedTokens.every((t, i) => t === userTokens[i]);
    const sameWordsWrongOrder =
      !exact &&
      expectedTokens.length === userTokens.length &&
      [...expectedTokens].sort().join(" ") === [...userTokens].sort().join(" ");
    return {
      correct: exact,
      similarity: exact ? 1 : sameWordsWrongOrder ? 0.7 : similarityRatio(normExpected, normUser),
      feedback: exact ? "Doğru." : sameWordsWrongOrder ? "Kelimeler doğru ama sıralama yanlış." : "Yanlış.",
    };
  }

  const similarity = similarityRatio(normExpected, normUser);
  const correct = normUser.length > 0 && normExpected === normUser;
  return {
    correct,
    similarity,
    feedback: correct ? "Doğru." : similarity >= 0.7 ? "Yakın ama tam doğru değil." : "Yanlış.",
  };
}
