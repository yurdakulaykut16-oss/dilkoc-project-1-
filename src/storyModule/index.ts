import { STORIES, STORY_UNITS_PER_CHECKPOINT } from './storyData';
import { isEnglish } from '../content/activeLanguage';

const IS_ENGLISH = isEnglish();
import type { CheckpointStory } from './types';

export { STORIES, STORY_UNITS_PER_CHECKPOINT, STORY_CHECKPOINT_COUNT, STORY_CAST } from './storyData';
export type { CheckpointStory, SummaryEvaluation, StoryLine, StoryNewWord, StoryKeyPoint, StoryMislead } from './types';
export { evaluateTurkishSummary } from './summaryEvaluation';

export function storyForCheckpoint(checkpoint: number): CheckpointStory | undefined {
  return STORIES.find((s) => s.checkpoint === checkpoint);
}

export function storyTriggeredAtUnit(unitNumber: number): CheckpointStory | undefined {
  return STORIES.find((s) => s.unitTo === unitNumber);
}

export function gateStoryForUnitNumber(unitNumber: number): CheckpointStory | undefined {
  const gates = STORIES.filter((s) => s.kind === 'levelFinal' && s.unitTo < unitNumber);
  return gates.length > 0 ? gates[gates.length - 1] : undefined;
}

export function gateStoryForLevel(level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'C1/C2'): CheckpointStory | undefined {
  const previousLevel: Record<typeof level, CheckpointStory['levelId'] | null> = {
    A1: null,
    A2: 'A1',
    B1: 'A2',
    B2: 'B1',
    C1: 'B2',
    C2: 'B2',
    'C1/C2': 'B2',
  };
  const neededFinal = previousLevel[level];
  return neededFinal ? STORIES.find((s) => s.kind === 'levelFinal' && s.levelId === neededFinal) : undefined;
}

export function levelOfUnitNumber(unitNumber: number): 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2' {
  if (IS_ENGLISH) {
    if (unitNumber <= 8) return 'A1';
    if (unitNumber <= 16) return 'A2';
    if (unitNumber <= 24) return 'B1';
    if (unitNumber <= 32) return 'B2';
    return 'C1/C2';
  }
  if (unitNumber <= 11) return 'A1';
  if (unitNumber <= 61) return 'A2';
  if (unitNumber <= 126) return 'B1';
  if (unitNumber <= 181) return 'B2';
  return 'C1/C2';
}

export function isStoryUnlocked(story: CheckpointStory, completedUnitCount: number): boolean {
  return completedUnitCount >= story.unitTo;
}

export function nextPendingStory(completedUnitCount: number, completedStoryIds: string[]): CheckpointStory | undefined {
  return STORIES.find((s) => isStoryUnlocked(s, completedUnitCount) && !completedStoryIds.includes(s.id));
}

export function checkpointForUnitNumber(unitNumber: number): number | null {
  return unitNumber % STORY_UNITS_PER_CHECKPOINT === 0 ? unitNumber / STORY_UNITS_PER_CHECKPOINT : null;
}
