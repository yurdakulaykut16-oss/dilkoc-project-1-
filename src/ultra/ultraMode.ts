// ==========================================
// ⚡ ULTRA MOD — "Kalıcı Öğrenme: ULTRA Seviye"
// Tek anahtarla TÜM uygulama DAHA DA zorlaşır (temel seviye zaten zorlaştırıldı):
//   • Türkçeleştirme sınavı barajı %90 → %95
//   • Dinleme konusu testi barajı %80 → %90
//   • Bölüm finali kapı sınavı 8/10 → 9/10
//   • Sınavlara karışan 🔁 kalıcı tekrar soruları 12 → 18 (dinleme 8 → 12)
//   • Yanlış soru 1 kez değil 2 KEZ sınav sonunda tekrar sorulur
//   • SRS (aralıklı tekrar) aralıkları sıkılaşır: 1-3-7-16-35 gün → 1-2-4-8-14 gün
//   • Ödül: tüm XP kazanımları ×1.5
// Tercih localStorage'da saklanır (dilkoc_ultra_v1).
// ==========================================

const ULTRA_KEY = 'dilkoc_ultra_v1';

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
  try { localStorage.setItem(ULTRA_KEY, on ? '1' : '0'); } catch { /* yoksay */ }
  listeners.forEach(fn => fn());
}

/** React tarafında tercih değişimini dinlemek için basit abonelik. */
export function subscribeUltra(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// ---------- Dinamik barajlar / dozlar ----------

/** Ünite bitişi Türkçeleştirme sınavı geçme oranı — temel: %90, ultra: %95 */
export const storyPassRatio = (): number => (isUltraMode() ? 0.95 : 0.90);

/** Dinleme konusu ("kulağı alıştır") testi geçme yüzdesi — temel: %80, ultra: %90 */
export const topicPassPct = (): number => (isUltraMode() ? 90 : 80);

/** Bölüm finali seviye tekrar sınavı geçme baremi (10 sorudan) — temel: 8, ultra: 9 */
export const gatePassNeed = (): number => (isUltraMode() ? 9 : 8);

/** Sınavlara enjekte edilen kalıcı tekrar sorusu sayısı (baz → ultra dozu ×1.5) */
export const retentionDose = (base: number): number =>
  isUltraMode() ? Math.round(base * 1.5) : base;

/** Leitner kutu aralıkları (gün). Ultra'da tekrarlar daha SIK gelir. */
export const SRS_INTERVALS_NORMAL = [1, 3, 7, 16, 35];
export const SRS_INTERVALS_ULTRA = [1, 2, 4, 8, 14];
export const srsIntervals = (): number[] => (isUltraMode() ? SRS_INTERVALS_ULTRA : SRS_INTERVALS_NORMAL);
/** Kutu numarası (1-5) için o modun gün aralığı */
export const srsIntervalFor = (box: number): number =>
  srsIntervals()[Math.max(0, Math.min(box - 1, srsIntervals().length - 1))];

/** XP çarpanı — Ultra modda daha zor iş → daha çok ödül */
export const xpGain = (base: number): number => (isUltraMode() ? Math.round(base * 1.5) : base);
