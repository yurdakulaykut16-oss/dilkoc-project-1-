import { isEnglish } from './content/activeLanguage';

const STATS_KEY = isEnglish() ? 'dilkoc_stats_en_v1' : 'dilkoc_stats_v1';

export interface StatsState {
  lastActiveDay: string;
  streak: number;
  bestStreak: number;
  dailyXp: Record<string, number>;
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
  const keys = Object.keys(s.dailyXp).sort();
  if (keys.length > 60) for (const k of keys.slice(0, keys.length - 60)) delete s.dailyXp[k];
  localStorage.setItem(STATS_KEY, JSON.stringify(s));
}

export function effectiveStreak(s: StatsState): number {
  if (!s.lastActiveDay) return 0;
  if (s.lastActiveDay === todayStr() || s.lastActiveDay === todayStr(-1)) return s.streak;
  return 0;
}

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
