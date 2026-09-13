import type { AnswerEvaluation } from "./types";

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

/** Comprehension question / translation grading: exact normalized match,
 *  with similarity for near-miss feedback. Same approach as flashcards/grammar. */
export function evaluateReadingAnswer(expectedAnswer: string, userAnswer: string): AnswerEvaluation {
  const normExpected = normalize(expectedAnswer);
  const normUser = normalize(userAnswer);
  const similarity = similarityRatio(normExpected, normUser);
  const correct = normUser.length > 0 && normExpected === normUser;
  return {
    correct,
    similarity,
    feedback: correct ? "Doğru." : similarity >= 0.7 ? "Yakın ama tam doğru değil." : "Yanlış.",
  };
}

/** Sentence writing: deterministically checkable — did the required words appear? */
export function evaluateSentenceWriting(requiredWords: string[], userAnswer: string): AnswerEvaluation {
  const normUser = normalize(userAnswer);
  const userWords = new Set(normUser.split(" ").filter(Boolean));
  const missing = requiredWords.filter((w) => !userWords.has(normalize(w)));
  const correct = missing.length === 0 && normUser.length > 0;
  const similarity = requiredWords.length === 0 ? (normUser.length > 0 ? 1 : 0) : 1 - missing.length / requiredWords.length;
  return {
    correct,
    similarity: Math.round(similarity * 100) / 100,
    feedback: correct ? "Doğru, gerekli kelimeler kullanıldı." : missing.length > 0 ? `Eksik kelime(ler): ${missing.join(", ")}` : "Cümle boş.",
  };
}

/**
 * Free writing has no single correct answer, so it can't be marked
 * correct/incorrect deterministically. This only checks the objective,
 * automatable part (minimum length) and leaves correctness null-like
 * (correct=false, similarity=coverage) — never claims to grade quality.
 */
export function evaluateFreeWriting(minWords: number, userAnswer: string): AnswerEvaluation {
  const wordCount = userAnswer.trim().split(/\s+/).filter(Boolean).length;
  const meetsLength = wordCount >= minWords;
  return {
    correct: meetsLength,
    similarity: minWords === 0 ? 1 : Math.min(1, Math.round((wordCount / minWords) * 100) / 100),
    feedback: meetsLength
      ? `Uzunluk şartı karşılandı (${wordCount} kelime). İçerik otomatik değerlendirilmez.`
      : `En az ${minWords} kelime yazmalısın (şu an ${wordCount}).`,
  };
}
