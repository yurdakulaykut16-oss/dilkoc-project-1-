import type { VocabItem } from "./types";

export interface ReviewOutcome {
  correct: boolean;
  responseTimeMs?: number;
}

type SrsFields = Pick<
  VocabItem,
  "easeFactor" | "repetitions" | "intervalDays" | "nextReviewDate" | "memoryStrength" | "mistakeCount" | "lastReviewedAt"
>;

/** Maps a boolean outcome + response speed to an SM-2 quality grade (0-5). */
function toQuality(outcome: ReviewOutcome): number {
  if (!outcome.correct) return 2;
  if (outcome.responseTimeMs === undefined) return 4;
  if (outcome.responseTimeMs < 3000) return 5;
  if (outcome.responseTimeMs < 8000) return 4;
  return 3;
}

/**
 * Computes the next review schedule for a vocab item using SM-2, prioritizing
 * items the learner is likely to forget by shrinking intervals on mistakes
 * and tracking a 0-1 memoryStrength used for review-queue ordering.
 */
export function scheduleReview(item: VocabItem, outcome: ReviewOutcome, now = new Date()): SrsFields {
  const quality = toQuality(outcome);
  let { easeFactor, repetitions, intervalDays } = item;

  if (quality < 3) {
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  easeFactor = Math.round(easeFactor * 100) / 100;

  const memoryStrength = Math.min(1, Math.max(0, item.memoryStrength + (outcome.correct ? 0.15 : -0.25)));
  const mistakeCount = outcome.correct ? item.mistakeCount : item.mistakeCount + 1;

  const nextReviewDate = new Date(now);
  nextReviewDate.setDate(nextReviewDate.getDate() + intervalDays);

  return {
    easeFactor,
    repetitions,
    intervalDays,
    nextReviewDate: nextReviewDate.toISOString(),
    memoryStrength: Math.round(memoryStrength * 100) / 100,
    mistakeCount,
    lastReviewedAt: now.toISOString(),
  };
}

/** Returns due items sorted so weakest, most forgettable words come first. */
export function getDueItems(items: VocabItem[], now = new Date()): VocabItem[] {
  return items
    .filter((item) => new Date(item.nextReviewDate).getTime() <= now.getTime())
    .sort((a, b) => a.memoryStrength - b.memoryStrength || a.nextReviewDate.localeCompare(b.nextReviewDate));
}
