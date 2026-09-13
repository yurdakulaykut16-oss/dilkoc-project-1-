import type { CEFRLevel, CurriculumTopic, CurriculumTopicView, TopicProgress, TopicStatus } from "./types";
import { CEFR_LEVELS } from "./cefr";

const LEVEL_ADVANCE_THRESHOLD_PERCENT = 80;

export function isUnlocked(topic: CurriculumTopic, completedTopicIds: Set<string>): boolean {
  return topic.prerequisites.every((id) => completedTopicIds.has(id));
}

/** Combines static curriculum data with a learner's stored progress into a renderable view. */
export function buildCurriculumView(topics: CurriculumTopic[], progress: TopicProgress[]): CurriculumTopicView[] {
  const progressByTopic = new Map(progress.map((p) => [p.topicId, p]));
  const completedIds = new Set(progress.filter((p) => p.status === "completed").map((p) => p.topicId));

  return topics.map((topic) => {
    const p = progressByTopic.get(topic.id);
    let status: TopicStatus;
    if (p?.status === "completed") status = "completed";
    else if (p?.status === "in_progress") status = "in_progress";
    else status = isUnlocked(topic, completedIds) ? "available" : "locked";
    return { topic, status, masteryScore: p?.masteryScore ?? 0 };
  });
}

export function computeLevelCompletion(
  topics: CurriculumTopic[],
  progress: TopicProgress[]
): { completed: number; total: number; percent: number } {
  const completedIds = new Set(progress.filter((p) => p.status === "completed").map((p) => p.topicId));
  const completed = topics.filter((t) => completedIds.has(t.id)).length;
  const total = topics.length;
  return { completed, total, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
}

export function isLevelComplete(topics: CurriculumTopic[], progress: TopicProgress[]): boolean {
  if (topics.length === 0) return false;
  return computeLevelCompletion(topics, progress).percent >= LEVEL_ADVANCE_THRESHOLD_PERCENT;
}

export function nextCefrLevel(level: CEFRLevel): CEFRLevel | null {
  const idx = CEFR_LEVELS.indexOf(level);
  return idx >= 0 && idx < CEFR_LEVELS.length - 1 ? CEFR_LEVELS[idx + 1] : null;
}
