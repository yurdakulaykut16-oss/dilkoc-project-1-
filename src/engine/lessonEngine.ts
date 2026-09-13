import type { ActivityType, Lesson, LessonActivity, LessonContext, SkillId } from "./types";
import {
  generateCurriculumProgressionActivities,
  generateMistakeReviewActivities,
  generateNewVocabActivities,
  generateReviewActivities,
  generateSentenceBuildingActivities,
  generateWeakSkillActivities,
} from "./activityGenerators";
import { seedFromString, shuffleDeterministic } from "./random";

const DEFAULT_MAX_ACTIVITIES = 10;

const ACTIVITY_DURATION_MIN: Record<ActivityType, number> = {
  vocab_recall: 1,
  translation: 1.5,
  multiple_choice: 0.75,
  sentence_completion: 1.5,
  sentence_construction: 2,
  grammar_practice: 2.5,
  reading_comprehension: 3,
  listening_placeholder: 2,
  writing_placeholder: 3,
};

export interface LessonOptions {
  maxActivities?: number;
  now?: Date;
}


/** Round-robins across buckets (in priority order) so a lesson mixes
 *  reviews/mistakes/weak-skills/new material instead of grouping by type. */
function interleave(buckets: LessonActivity[][], budget: number): LessonActivity[] {
  const selected: LessonActivity[] = [];
  const cursors = buckets.map(() => 0);
  let progressed = true;
  while (progressed && selected.length < budget) {
    progressed = false;
    for (let b = 0; b < buckets.length && selected.length < budget; b++) {
      if (cursors[b] < buckets[b].length) {
        selected.push(buckets[b][cursors[b]]);
        cursors[b] += 1;
        progressed = true;
      }
    }
  }
  return selected;
}

/**
 * Builds today's personalized lesson from due reviews, weak skills, repeated
 * mistakes, and curriculum progression. Language-agnostic: all language
 * differences live in the LessonContext data (vocab, curriculum, mistakes),
 * not in this function.
 */
export function generateLesson(ctx: LessonContext, options: LessonOptions = {}): Lesson {
  const maxActivities = options.maxActivities ?? DEFAULT_MAX_ACTIVITIES;
  const now = options.now ?? new Date();
  const dateSeed = seedFromString(`${ctx.languageCode}-${now.toISOString().slice(0, 10)}`);

  // Priority order: due reviews (spaced repetition) > repeated mistakes >
  // weakest skills > curriculum progression > brand-new vocabulary.
  const reviewBucket = generateReviewActivities(ctx);
  const mistakeBucket = generateMistakeReviewActivities(ctx);
  const weakSkillBucket = generateWeakSkillActivities(ctx);

  const coveredTopics = new Set(
    [...mistakeBucket, ...weakSkillBucket]
      .map((a) => a.activity.relatedTopicId)
      .filter((id): id is string => Boolean(id))
  );
  const progressionBucket = generateCurriculumProgressionActivities(ctx, coveredTopics);
  const newVocabBucket = generateNewVocabActivities(ctx);
  const sentenceBuildingBucket = generateSentenceBuildingActivities(ctx);

  const buckets = [
    reviewBucket,
    mistakeBucket,
    weakSkillBucket,
    progressionBucket,
    newVocabBucket,
    sentenceBuildingBucket,
  ].map((bucket, i) => shuffleDeterministic(bucket, dateSeed + i));

  const activities = interleave(buckets, maxActivities);
  const targetSkills = Array.from(new Set(activities.map((a) => a.activity.skillId))) as SkillId[];

  const avgSkillScore = ctx.skillScores.length
    ? ctx.skillScores.reduce((sum, s) => sum + s.score, 0) / ctx.skillScores.length
    : 50;
  const estimatedDifficulty =
    Math.round(Math.min(1, Math.max(0, 0.6 * (ctx.profile.cefrScore / 100) + 0.4 * (avgSkillScore / 100))) * 100) /
    100;

  const expectedDurationMinutes = Math.round(
    activities.reduce((sum, a) => sum + (ACTIVITY_DURATION_MIN[a.activity.type] ?? 1.5), 0)
  );

  return {
    id: `lesson-${ctx.languageCode}-${now.toISOString().slice(0, 10)}`,
    languageCode: ctx.languageCode,
    cefrLevel: ctx.profile.cefrLevel,
    estimatedDifficulty,
    targetSkills,
    activities,
    expectedDurationMinutes,
    generatedAt: now.toISOString(),
  };
}
