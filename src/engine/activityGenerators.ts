import type { Activity, ActivityType, FlashcardMode, GrammarExerciseType, LessonActivity, LessonContext, MistakeRecord, SkillId, VocabItem } from "./types";
import { buildFlashcard } from "./flashcards";
import { getGrammarTopicContent, getReadingPassageForTopic, getWritingPromptsForTopic } from "../languages/registry";

const GRAMMAR_TYPE_TO_ACTIVITY_TYPE: Record<GrammarExerciseType, ActivityType> = {
  multiple_choice: "multiple_choice",
  fill_blank: "sentence_completion",
  translation: "translation",
  correction: "grammar_practice",
  sentence_building: "sentence_construction",
};

/** Builds a grammar activity from real topic content when available, falling
 *  back to a generic prompt if this topic has no authored exercises yet. */
function buildGrammarActivity(ctx: LessonContext, topicId: string, title: string): Activity {
  const content = getGrammarTopicContent(ctx.languageCode, topicId);
  const exercise = content?.exercises[0];
  if (!exercise) {
    return {
      id: `grammar-${topicId}`,
      type: "grammar_practice",
      skillId: "grammar",
      languageCode: ctx.languageCode,
      prompt: `${title} üzerinde pratik yap.`,
      data: { topicId },
      relatedTopicId: topicId,
    };
  }
  return {
    id: `grammar-${exercise.id}`,
    type: GRAMMAR_TYPE_TO_ACTIVITY_TYPE[exercise.type],
    skillId: "grammar",
    languageCode: ctx.languageCode,
    prompt: exercise.incorrectSentence ? `${exercise.prompt} "${exercise.incorrectSentence}"` : exercise.prompt,
    data: { topicId, exerciseId: exercise.id, exerciseType: exercise.type, expectedAnswer: exercise.expectedAnswer, options: exercise.options },
    relatedTopicId: topicId,
  };
}

/** Reading comprehension activity from an authored passage's first question. */
function buildReadingActivity(ctx: LessonContext, topicId: string, title: string): Activity {
  const passage = getReadingPassageForTopic(ctx.languageCode, topicId);
  const question = passage?.questions[0];
  if (!passage || !question) {
    return {
      id: `reading-${topicId}`,
      type: "reading_comprehension",
      skillId: "reading",
      languageCode: ctx.languageCode,
      prompt: `${title} üzerinde pratik yap.`,
      data: { topicId },
      relatedTopicId: topicId,
    };
  }
  return {
    id: `reading-${question.id}`,
    type: "reading_comprehension",
    skillId: "reading",
    languageCode: ctx.languageCode,
    prompt: question.prompt,
    data: {
      topicId,
      passageId: passage.id,
      passageTitle: passage.title,
      passageText: passage.text,
      questionId: question.id,
      expectedAnswer: question.expectedAnswer,
      options: question.options,
    },
    relatedTopicId: topicId,
  };
}

/** Writing activity (sentence_writing or free_writing) from authored prompts. */
function buildWritingActivity(ctx: LessonContext, topicId: string, title: string): Activity {
  const prompts = getWritingPromptsForTopic(ctx.languageCode, topicId);
  const writingPrompt = prompts[0];
  if (!writingPrompt) {
    return {
      id: `writing-${topicId}`,
      type: "writing_placeholder",
      skillId: "writing",
      languageCode: ctx.languageCode,
      prompt: `${title} üzerinde pratik yap.`,
      data: { topicId },
      relatedTopicId: topicId,
    };
  }
  return {
    id: `writing-${writingPrompt.id}`,
    type: "writing_placeholder",
    skillId: "writing",
    languageCode: ctx.languageCode,
    prompt: writingPrompt.instruction,
    data: {
      topicId,
      promptId: writingPrompt.id,
      writingType: writingPrompt.type,
      requiredWords: writingPrompt.requiredWords,
      minWords: writingPrompt.minWords,
    },
    relatedTopicId: topicId,
  };
}

function buildSkillActivity(ctx: LessonContext, skillId: SkillId, topicId: string, title: string): Activity {
  if (skillId === "grammar") return buildGrammarActivity(ctx, topicId, title);
  if (skillId === "reading") return buildReadingActivity(ctx, topicId, title);
  if (skillId === "writing") return buildWritingActivity(ctx, topicId, title);
  return {
    id: `skill-${topicId}`,
    type: skillToActivityType(skillId) ?? "multiple_choice",
    skillId,
    languageCode: ctx.languageCode,
    prompt: `${title} üzerinde pratik yap.`,
    data: { topicId },
    relatedTopicId: topicId,
  };
}

const MAX_REVIEW_ITEMS = 6;
const MAX_NEW_VOCAB_ITEMS = 4;
const MAX_SENTENCE_BUILDING_ITEMS = 2;
const MIN_MISTAKE_REPEATS = 2;
const MAX_MISTAKE_TOPICS = 3;
const MAX_WEAK_SKILLS = 2;
const DISTRACTOR_COUNT = 3;

const REVIEW_MODE_CYCLE: FlashcardMode[] = ["active_recall", "reverse_recall", "translation"];

function reviewMode(item: VocabItem): FlashcardMode {
  return REVIEW_MODE_CYCLE[item.repetitions % REVIEW_MODE_CYCLE.length];
}

/** Very weak items get recognition scaffolding (multiple choice); everything
 *  else stays production/recall, per "prefer active recall over recognition". */
function activityTypeForReview(mode: FlashcardMode, weak: boolean): ActivityType {
  if (weak) return "multiple_choice";
  return mode === "translation" ? "translation" : "vocab_recall";
}

function pickDistractors(item: VocabItem, pool: VocabItem[], mode: FlashcardMode): string[] {
  const field: "word" | "translation" = mode === "reverse_recall" ? "word" : "translation";
  const seen = new Set<string>([item[field]]);
  const out: string[] = [];
  for (const candidate of pool) {
    if (candidate.id === item.id) continue;
    const value = candidate[field];
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
    if (out.length >= DISTRACTOR_COUNT) break;
  }
  return out;
}

/** Due spaced-repetition reviews — highest priority, drives active recall. */
export function generateReviewActivities(ctx: LessonContext): LessonActivity[] {
  const distractorPool = [...ctx.dueVocab, ...ctx.newVocabCandidates];
  return ctx.dueVocab.slice(0, MAX_REVIEW_ITEMS).map((item) => {
    const mode = reviewMode(item);
    const weak = item.memoryStrength < 0.3;
    const distractors = weak ? pickDistractors(item, distractorPool, mode) : [];
    const prompt = buildFlashcard(item, mode, distractors);
    const type = activityTypeForReview(mode, weak);

    const activity: Activity = {
      id: `review-${item.id}`,
      type,
      skillId: "vocabulary",
      languageCode: ctx.languageCode,
      prompt: prompt.question,
      data: { mode, vocabItemId: item.id, expectedAnswer: prompt.expectedAnswer, options: prompt.options },
      relatedVocabId: item.id,
    };
    return {
      activity,
      reason: `Tekrar zamanı: "${item.word}" (hatırlama gücü %${Math.round(item.memoryStrength * 100)})`,
    };
  });
}

/** New vocabulary, capped so a single lesson never front-loads too much unseen material. */
export function generateNewVocabActivities(ctx: LessonContext): LessonActivity[] {
  return ctx.newVocabCandidates.slice(0, MAX_NEW_VOCAB_ITEMS).map((item) => {
    const prompt = buildFlashcard(item, "sentence_completion");
    return {
      activity: {
        id: `new-${item.id}`,
        type: "sentence_completion",
        skillId: "vocabulary",
        languageCode: ctx.languageCode,
        prompt: prompt.question,
        data: { mode: "sentence_completion", vocabItemId: item.id, expectedAnswer: prompt.expectedAnswer },
        relatedVocabId: item.id,
      },
      reason: `Yeni kelime, bağlam içinde tanıtılıyor: "${item.word}"`,
    };
  });
}

/** Sentence-building production practice for words the learner already retains reasonably well. */
export function generateSentenceBuildingActivities(ctx: LessonContext): LessonActivity[] {
  const candidates = ctx.dueVocab.filter((item) => item.memoryStrength >= 0.5 && item.exampleSentence);
  return candidates.slice(0, MAX_SENTENCE_BUILDING_ITEMS).map((item) => {
    const prompt = buildFlashcard(item, "sentence_building");
    return {
      activity: {
        id: `build-${item.id}`,
        type: "sentence_construction",
        skillId: "sentenceConstruction",
        languageCode: ctx.languageCode,
        prompt: prompt.question,
        data: { mode: "sentence_building", vocabItemId: item.id, expectedAnswer: prompt.expectedAnswer },
        relatedVocabId: item.id,
      },
      reason: `Üretken pratik: "${item.word}" ile cümle kur`,
    };
  });
}

interface MistakeGroup {
  skillId: SkillId;
  topicId?: string;
  count: number;
  sampleDetail: string;
}

function groupRepeatedMistakes(mistakes: MistakeRecord[]): MistakeGroup[] {
  const groups = new Map<string, MistakeGroup>();
  for (const m of mistakes) {
    const key = `${m.skillId}:${m.topicId ?? ""}`;
    const existing = groups.get(key);
    if (existing) existing.count += 1;
    else groups.set(key, { skillId: m.skillId, topicId: m.topicId, count: 1, sampleDetail: m.detail });
  }
  return [...groups.values()]
    .filter((g) => g.count >= MIN_MISTAKE_REPEATS)
    .sort((a, b) => b.count - a.count);
}

/** Targeted practice for mistakes the learner keeps making, not just isolated errors. */
export function generateMistakeReviewActivities(ctx: LessonContext): LessonActivity[] {
  return groupRepeatedMistakes(ctx.recentMistakes)
    .slice(0, MAX_MISTAKE_TOPICS)
    .map((group, i) => ({
      activity: {
        id: `mistake-${group.skillId}-${i}`,
        type: group.skillId === "grammar" ? "grammar_practice" : "sentence_construction",
        skillId: group.skillId,
        languageCode: ctx.languageCode,
        prompt: `Sık yapılan hatayı düzelt: ${group.sampleDetail}`,
        data: { topicId: group.topicId, occurrences: group.count },
        relatedTopicId: group.topicId,
      },
      reason: `Tekrarlanan hata (${group.count} kez): ${group.sampleDetail}`,
    }));
}

export function skillToActivityType(skillId: SkillId): ActivityType | null {
  switch (skillId) {
    case "grammar":
      return "grammar_practice";
    case "reading":
      return "reading_comprehension";
    case "listening":
      return "listening_placeholder";
    case "writing":
      return "writing_placeholder";
    case "vocabulary":
      return "translation";
    case "sentenceConstruction":
      return "sentence_construction";
    default:
      return null; // speaking/pronunciation/comprehension activities not yet implemented
  }
}

/** Practice for the learner's currently weakest skills, using unlocked curriculum topics. */
export function generateWeakSkillActivities(ctx: LessonContext): LessonActivity[] {
  const scoreBySkill = new Map(ctx.skillScores.map((s) => [s.skillId, s.score]));
  const skillsInCurriculum = new Set(ctx.curriculumView.map((v) => v.topic.skillId));
  const weakestFirst = [...skillsInCurriculum].sort(
    (a, b) => (scoreBySkill.get(a) ?? 50) - (scoreBySkill.get(b) ?? 50)
  );

  const activities: LessonActivity[] = [];
  for (const skillId of weakestFirst.slice(0, MAX_WEAK_SKILLS)) {
    const type = skillToActivityType(skillId);
    if (!type) continue;
    const topicView = ctx.curriculumView.find(
      (v) => v.topic.skillId === skillId && (v.status === "available" || v.status === "in_progress")
    );
    if (!topicView) continue;

    const activity = buildSkillActivity(ctx, skillId, topicView.topic.id, topicView.topic.title);
    activities.push({
      activity,
      reason: `Zayıf beceri: ${skillId} (puan ${Math.round(scoreBySkill.get(skillId) ?? 50)})`,
    });
  }
  return activities;
}

/** Introduces the next unlocked curriculum topic not already covered this lesson. */
export function generateCurriculumProgressionActivities(ctx: LessonContext, excludeTopicIds: Set<string>): LessonActivity[] {
  const next = ctx.curriculumView.find((v) => v.status === "available" && !excludeTopicIds.has(v.topic.id));
  if (!next) return [];
  const activity = buildSkillActivity(ctx, next.topic.skillId, next.topic.id, next.topic.title);
  return [{ activity, reason: `Müfredatta sırada: ${next.topic.title}` }];
}
