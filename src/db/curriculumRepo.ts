import { getDb } from "./client";
import type { CEFRLevel, CurriculumTopicView, LanguageCode, TopicProgress } from "../engine/types";
import { getCurriculumTopics } from "../languages/registry";
import { buildCurriculumView, computeLevelCompletion, isLevelComplete, nextCefrLevel } from "../engine/curriculum";
import { getOrCreateProfile, updateProfileLevel } from "./profileRepo";
import { scoreFromLevel } from "../engine/cefr";

interface ProgressRow {
  language_code: LanguageCode;
  topic_id: string;
  status: "in_progress" | "completed";
  mastery_score: number;
}

async function getProgressRows(languageCode: LanguageCode): Promise<TopicProgress[]> {
  const db = await getDb();
  const rows = await db.select<ProgressRow[]>(
    "SELECT * FROM curriculum_progress WHERE language_code = $1",
    [languageCode]
  );
  return rows.map((r) => ({
    languageCode: r.language_code,
    topicId: r.topic_id,
    status: r.status,
    masteryScore: r.mastery_score,
  }));
}

export async function getCurriculumView(languageCode: LanguageCode, level: CEFRLevel): Promise<CurriculumTopicView[]> {
  const topics = getCurriculumTopics(languageCode, level);
  const progress = await getProgressRows(languageCode);
  return buildCurriculumView(topics, progress);
}

export async function setTopicProgress(
  languageCode: LanguageCode,
  topicId: string,
  status: "in_progress" | "completed",
  masteryScore: number
): Promise<void> {
  const db = await getDb();
  await db.execute(
    `INSERT INTO curriculum_progress (language_code, topic_id, status, mastery_score, updated_at)
     VALUES ($1, $2, $3, $4, datetime('now'))
     ON CONFLICT(language_code, topic_id) DO UPDATE SET status = $3, mastery_score = $4, updated_at = datetime('now')`,
    [languageCode, topicId, status, masteryScore]
  );
}

/**
 * Marks a topic completed, then checks whether the learner's current CEFR
 * level is now fully covered. If so, and curriculum data for the next level
 * already exists, advances the shared learner profile.
 */
export async function completeTopic(languageCode: LanguageCode, topicId: string, masteryScore: number): Promise<void> {
  await setTopicProgress(languageCode, topicId, "completed", masteryScore);

  const profile = await getOrCreateProfile(languageCode);
  const levelTopics = getCurriculumTopics(languageCode, profile.cefrLevel);
  const progress = await getProgressRows(languageCode);

  if (isLevelComplete(levelTopics, progress)) {
    const next = nextCefrLevel(profile.cefrLevel);
    if (next && getCurriculumTopics(languageCode, next).length > 0) {
      await updateProfileLevel(languageCode, next, scoreFromLevel(next));
    }
  }
}

export async function getLevelCompletion(languageCode: LanguageCode, level: CEFRLevel) {
  const topics = getCurriculumTopics(languageCode, level);
  const progress = await getProgressRows(languageCode);
  return computeLevelCompletion(topics, progress);
}
