import { getDb } from "./client";
import type { LanguageCode, PlacementAnswer, PlacementResult } from "../engine/types";
import { updateProfileLevel } from "./profileRepo";

/** Persists a placement result and seeds the language's learner profile with it. */
export async function savePlacementResult(
  languageCode: LanguageCode,
  result: PlacementResult,
  answers: PlacementAnswer[]
): Promise<void> {
  const db = await getDb();
  await db.execute(
    "INSERT INTO placement_test_results (language_code, cefr_level, score, raw_answers) VALUES ($1, $2, $3, $4)",
    [languageCode, result.level, result.score, JSON.stringify(answers)]
  );
  await updateProfileLevel(languageCode, result.level, result.score);
}
