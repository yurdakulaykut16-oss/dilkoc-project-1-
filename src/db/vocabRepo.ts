import { getDb } from "./client";
import type { LanguageCode, VocabItem } from "../engine/types";
import { getDueItems, scheduleReview, type ReviewOutcome } from "../engine/srs";

interface VocabRow {
  id: number;
  language_code: LanguageCode;
  word: string;
  translation: string;
  pronunciation: string | null;
  example_sentence: string | null;
  difficulty: number;
  memory_strength: number;
  ease_factor: number;
  repetitions: number;
  interval_days: number;
  next_review_date: string;
  mistake_count: number;
  last_reviewed_at: string | null;
}

function fromRow(row: VocabRow): VocabItem {
  return {
    id: row.id,
    languageCode: row.language_code,
    word: row.word,
    translation: row.translation,
    pronunciation: row.pronunciation ?? undefined,
    exampleSentence: row.example_sentence ?? undefined,
    difficulty: row.difficulty,
    memoryStrength: row.memory_strength,
    easeFactor: row.ease_factor,
    repetitions: row.repetitions,
    intervalDays: row.interval_days,
    nextReviewDate: row.next_review_date,
    mistakeCount: row.mistake_count,
    lastReviewedAt: row.last_reviewed_at ?? undefined,
  };
}

export async function getDueVocab(languageCode: LanguageCode, now = new Date()): Promise<VocabItem[]> {
  const db = await getDb();
  const rows = await db.select<VocabRow[]>(
    "SELECT * FROM vocab_items WHERE language_code = $1",
    [languageCode]
  );
  return getDueItems(rows.map(fromRow), now);
}

/** Vocab never reviewed yet (repetitions = 0), easiest first, for introducing new material. */
export async function getNewVocabCandidates(languageCode: LanguageCode, limit = 8): Promise<VocabItem[]> {
  const db = await getDb();
  const rows = await db.select<VocabRow[]>(
    "SELECT * FROM vocab_items WHERE language_code = $1 AND repetitions = 0 ORDER BY difficulty ASC LIMIT $2",
    [languageCode, limit]
  );
  return rows.map(fromRow);
}

/** Grades a review and persists the SM-2 schedule update + history row. */
export async function recordReview(item: VocabItem, outcome: ReviewOutcome, now = new Date()): Promise<VocabItem> {
  const db = await getDb();
  const updated = scheduleReview(item, outcome, now);

  await db.execute(
    `UPDATE vocab_items SET ease_factor = $1, repetitions = $2, interval_days = $3,
     next_review_date = $4, memory_strength = $5, mistake_count = $6, last_reviewed_at = $7
     WHERE id = $8`,
    [
      updated.easeFactor,
      updated.repetitions,
      updated.intervalDays,
      updated.nextReviewDate,
      updated.memoryStrength,
      updated.mistakeCount,
      updated.lastReviewedAt,
      item.id,
    ]
  );
  await db.execute(
    "INSERT INTO review_history (vocab_item_id, correct, response_ms) VALUES ($1, $2, $3)",
    [item.id, outcome.correct ? 1 : 0, outcome.responseTimeMs ?? null]
  );

  return { ...item, ...updated };
}
