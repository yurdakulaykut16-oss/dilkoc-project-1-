// ============================================================================
// 🔥 SERİ (STREAK) DEPOSU — localStorage anahtarı: dilkoc_stats_v1
// Tek görevi GERÇEK seri takibi: XP kazanılan her günde seri işlenir;
// dün de çalışıldıysa +1, gün atlandıysa 1'e döner.
// (Lig / günlük hedef / rozet / istatistik ekranı kaldırıldı — kullanıcı isteği.)
// ============================================================================

import { isEnglish } from './content/activeLanguage';

const STATS_KEY = isEnglish() ? 'dilkoc_stats_en_v1' : 'dilkoc_stats_v1';

export interface StatsState {
  lastActiveDay: string;            // 'YYYY-MM-DD' — en son XP kazanılan gün
  streak: number;                   // aktif gün serisi
  bestStreak: number;               // tüm zamanların en iyi serisi
  dailyXp: Record<string, number>;  // gün → o gün kazanılan XP (seri hesabının kaydı)
}

export function todayStr(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export function loadStats(): StatsState {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      return {
        lastActiveDay: d.lastActiveDay || '',
        streak: d.streak || 0,
        bestStreak: d.bestStreak || 0,
        dailyXp: d.dailyXp || {},
      };
    }
  } catch (e) { console.error(e); }
  return { lastActiveDay: '', streak: 0, bestStreak: 0, dailyXp: {} };
}

function saveStats(s: StatsState) {
  // dailyXp'yi son 60 günle sınırla (localStorage şişmesin)
  const keys = Object.keys(s.dailyXp).sort();
  if (keys.length > 60) for (const k of keys.slice(0, keys.length - 60)) delete s.dailyXp[k];
  localStorage.setItem(STATS_KEY, JSON.stringify(s));
}

// Görünen seri: dün ya da bugün çalışıldıysa geçerli, gün atlandıysa 0.
export function effectiveStreak(s: StatsState): number {
  if (!s.lastActiveDay) return 0;
  if (s.lastActiveDay === todayStr() || s.lastActiveDay === todayStr(-1)) return s.streak;
  return 0; // gün atlandı — seri koptu
}

// XP kazanımını işler: günlük toplamı artırır, seriyi günceller.
export function recordXpGain(amount: number): StatsState {
  const s = loadStats();
  const today = todayStr();
  if (s.lastActiveDay !== today) {
    s.streak = s.lastActiveDay === todayStr(-1) ? s.streak + 1 : 1;
    s.lastActiveDay = today;
  }
  s.bestStreak = Math.max(s.bestStreak, s.streak);
  s.dailyXp[today] = (s.dailyXp[today] || 0) + Math.max(0, amount);
  saveStats(s);
  return s;
}
