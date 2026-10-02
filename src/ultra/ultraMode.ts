import { isEnglish } from '../content/activeLanguage';

const ULTRA_KEY = isEnglish() ? 'dilkoc_ultra_en_v1' : 'dilkoc_ultra_v1';

let _cache: boolean | null = null;
const listeners = new Set<() => void>();

export function isUltraMode(): boolean {
  if (_cache === null) {
    try { _cache = localStorage.getItem(ULTRA_KEY) === '1'; } catch { _cache = false; }
  }
  return _cache;
}

export function setUltraMode(on: boolean): void {
  _cache = on;
  try { localStorage.setItem(ULTRA_KEY, on ? '1' : '0'); } catch {}
  listeners.forEach(fn => fn());
}

export function subscribeUltra(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const storyPassRatio = (): number => (isUltraMode() ? 0.95 : 0.90);

export const topicPassPct = (): number => (isUltraMode() ? 90 : 80);

export const gatePassNeed = (): number => (isUltraMode() ? 9 : 8);

export const retentionDose = (base: number): number =>
  isUltraMode() ? Math.round(base * 1.5) : base;

export const SRS_INTERVALS_NORMAL = [1, 3, 7, 16, 35];
export const SRS_INTERVALS_ULTRA = [1, 2, 4, 8, 14];
export const srsIntervals = (): number[] => (isUltraMode() ? SRS_INTERVALS_ULTRA : SRS_INTERVALS_NORMAL);
export const srsIntervalFor = (box: number): number =>
  srsIntervals()[Math.max(0, Math.min(box - 1, srsIntervals().length - 1))];

export const xpGain = (base: number): number => (isUltraMode() ? Math.round(base * 1.5) : base);
