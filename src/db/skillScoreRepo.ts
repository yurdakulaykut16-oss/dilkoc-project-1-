import { getDb } from "./client";
import type { LanguageCode, SkillId, SkillScore } from "../engine/types";

interface SkillScoreRow {
  language_code: LanguageCode;
  skill_id: SkillId;
  score: number;
}

export async function getSkillScores(languageCode: LanguageCode): Promise<SkillScore[]> {
  const db = await getDb();
  const rows = await db.select<SkillScoreRow[]>("SELECT * FROM skill_scores WHERE language_code = $1", [
    languageCode,
  ]);
  return rows.map((r) => ({ languageCode: r.language_code, skillId: r.skill_id, score: r.score }));
}

export async function upsertSkillScore(languageCode: LanguageCode, skillId: SkillId, score: number): Promise<void> {
  const db = await getDb();
  await db.execute(
    `INSERT INTO skill_scores (language_code, skill_id, score, updated_at) VALUES ($1, $2, $3, datetime('now'))
     ON CONFLICT(language_code, skill_id) DO UPDATE SET score = $3, updated_at = datetime('now')`,
    [languageCode, skillId, score]
  );
}
