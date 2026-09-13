import { getDb } from "./client";
import type { CEFRLevel, LanguageCode, LearnerProfile } from "../engine/types";
import { scoreFromLevel } from "../engine/cefr";

interface ProfileRow {
  language_code: LanguageCode;
  cefr_level: CEFRLevel;
  cefr_score: number;
  streak: number;
  total_study_minutes: number;
}

function fromRow(row: ProfileRow): LearnerProfile {
  return {
    languageCode: row.language_code,
    cefrLevel: row.cefr_level,
    cefrScore: row.cefr_score,
    streak: row.streak,
    totalStudyMinutes: row.total_study_minutes,
  };
}

/** Returns the profile for a language, creating a fresh A1 one if it doesn't exist yet. */
export async function getOrCreateProfile(languageCode: LanguageCode): Promise<LearnerProfile> {
  const db = await getDb();
  const rows = await db.select<ProfileRow[]>(
    "SELECT * FROM learner_profiles WHERE language_code = $1",
    [languageCode]
  );
  if (rows.length > 0) return fromRow(rows[0]);

  const startScore = scoreFromLevel("A1");
  await db.execute(
    "INSERT INTO learner_profiles (language_code, cefr_level, cefr_score) VALUES ($1, $2, $3)",
    [languageCode, "A1", startScore]
  );
  return { languageCode, cefrLevel: "A1", cefrScore: startScore, streak: 0, totalStudyMinutes: 0 };
}

export async function updateProfileLevel(
  languageCode: LanguageCode,
  cefrLevel: CEFRLevel,
  cefrScore: number
): Promise<void> {
  const db = await getDb();
  await db.execute(
    "UPDATE learner_profiles SET cefr_level = $1, cefr_score = $2, updated_at = datetime('now') WHERE language_code = $3",
    [cefrLevel, cefrScore, languageCode]
  );
}
