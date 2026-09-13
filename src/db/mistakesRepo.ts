import { getDb } from "./client";
import type { LanguageCode, MistakeRecord, SkillId } from "../engine/types";

interface MistakeRow {
  id: number;
  language_code: LanguageCode;
  skill_id: SkillId;
  topic_id: string | null;
  detail: string;
  created_at: string;
}

export async function recordMistake(
  languageCode: LanguageCode,
  skillId: SkillId,
  detail: string,
  topicId?: string
): Promise<void> {
  const db = await getDb();
  await db.execute("INSERT INTO mistakes (language_code, skill_id, topic_id, detail) VALUES ($1, $2, $3, $4)", [
    languageCode,
    skillId,
    topicId ?? null,
    detail,
  ]);
}

export async function getRecentMistakes(languageCode: LanguageCode, limit = 30): Promise<MistakeRecord[]> {
  const db = await getDb();
  const rows = await db.select<MistakeRow[]>(
    "SELECT * FROM mistakes WHERE language_code = $1 ORDER BY created_at DESC LIMIT $2",
    [languageCode, limit]
  );
  return rows.map((r) => ({
    id: r.id,
    languageCode: r.language_code,
    skillId: r.skill_id,
    topicId: r.topic_id ?? undefined,
    detail: r.detail,
    createdAt: r.created_at,
  }));
}
