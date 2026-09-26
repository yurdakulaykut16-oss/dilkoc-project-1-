// ============================================================================
// HİKAYE MODÜLÜ — DIŞA AÇILAN API (index)
// ----------------------------------------------------------------------------
// App.tsx yalnızca bu dosyadan import eder; veri (storyData) ve analiz motoru
// (summaryEvaluation) burada birleştirilir. Böylece modül kendi içinde
// bütündür: tipler + veri + motor + yardımcılar.
//
// KULLANIM (App.tsx):
//   const story = storyForCheckpoint(3);          // 3. kontrol noktası hikayesi
//   const unlocked = isStoryUnlocked(story, 27);  // 27 ünite tamamlandıysa true
//   const result = evaluateTurkishSummary(story, 'özet metni...');
// ============================================================================

import { STORIES, STORY_UNITS_PER_CHECKPOINT } from './storyData';
import type { CheckpointStory } from './types';

export { STORIES, STORY_UNITS_PER_CHECKPOINT, STORY_CHECKPOINT_COUNT, STORY_CAST } from './storyData';
export type { CheckpointStory, SummaryEvaluation, StoryLine, StoryNewWord, StoryKeyPoint, StoryMislead } from './types';
export { evaluateTurkishSummary } from './summaryEvaluation';

/** N numarasına ait kontrol noktası hikayesini döndürür (yoksa undefined). */
export function storyForCheckpoint(checkpoint: number): CheckpointStory | undefined {
  return STORIES.find((s) => s.checkpoint === checkpoint);
}

/**
 * Bir hikaye, kapsadığı ünite aralığının SON ünitesi tamamlanmışsa açılır.
 * Yol doğrusal olduğu için "X ünite tamamlandı" ⟺ "ilk X ünite tamamlandı".
 */
export function isStoryUnlocked(story: CheckpointStory, completedUnitCount: number): boolean {
  return completedUnitCount >= story.unitTo;
}

/** Tamamlanmamış ve açılmış ilk hikayeyi döndürür (otomatik açılış için). */
export function nextPendingStory(completedUnitCount: number, completedStoryIds: string[]): CheckpointStory | undefined {
  return STORIES.find((s) => isStoryUnlocked(s, completedUnitCount) && !completedStoryIds.includes(s.id));
}

/** Bir ünitenin numarası hangi kontrol noktasına denk gelir? (10 → 1, 20 → 2...) */
export function checkpointForUnitNumber(unitNumber: number): number | null {
  return unitNumber % STORY_UNITS_PER_CHECKPOINT === 0 ? unitNumber / STORY_UNITS_PER_CHECKPOINT : null;
}
