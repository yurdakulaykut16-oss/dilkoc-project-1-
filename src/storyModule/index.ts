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
 * Bir ünitenin tamamlanmasıyla TETİKLENEN hikayeyi döndürür (kontrol noktası ya da
 * bölüm finali). Yol doğrusal olduğu için her ünitenin en fazla bir hikayesi vardır:
 *   ünite 6 → A1 finali, ünite 10 → kontrol noktası 1, ünite 18 → A2 finali ...
 * Hikayesi olmayan üniteler için undefined döner.
 */
export function storyTriggeredAtUnit(unitNumber: number): CheckpointStory | undefined {
  return STORIES.find((s) => s.unitTo === unitNumber);
}

/**
 * BÖLÜM FİNALİ KAPISI: verilen ünite numarasından önce biten EN YAKIN bölüm finalini
 * döndürür. Bu final tamamlanmadan o ünite (ve ön-dinleme konusu) açılamaz.
 * Örnek: unitNumber=19 (B1'in ilk ünitesi) → A2 finali (ünite 18'de biter).
 */
export function gateStoryForUnitNumber(unitNumber: number): CheckpointStory | undefined {
  const gates = STORIES.filter((s) => s.kind === 'levelFinal' && s.unitTo < unitNumber);
  return gates.length > 0 ? gates[gates.length - 1] : undefined;
}

/** Bir ünite numarasının ait olduğu müfredat bölümünü (A1..C1/C2) döndürür. */
export function levelOfUnitNumber(unitNumber: number): 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2' {
  if (unitNumber <= 6) return 'A1';
  if (unitNumber <= 18) return 'A2';
  if (unitNumber <= 43) return 'B1';
  if (unitNumber <= 64) return 'B2';
  return 'C1/C2';
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
