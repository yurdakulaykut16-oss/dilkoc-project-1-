// ============================================================================
// 📊 İSTATİSTİK DEPOSU — GERÇEK SERİ (STREAK), GÜNLÜK HEDEF, LİG ve ROZETLER
// localStorage anahtarı: dilkoc_stats_v1
// - Seri: her XP kazanılan günde işlenir; dün de çalışıldıysa +1, gün
//   atlandıysa 1'e döner. (Eski sürümdeki sabit "1" değerinin yerini alır.)
// - dailyXp: gün gün kazanılan XP (son 14 günlük grafik buradan çizilir).
// - Lig: toplam XP eşiklerine göre Bronz → Efsane.
// - Yedekleme: uygulamanın TÜM localStorage durumunu tek JSON olarak
//   dışa/içe aktarır (ilerleme + öğrenci modeli + istatistik + ses tercihi).
// ============================================================================

const STATS_KEY = 'dilkoc_stats_v1';

export const DAILY_GOAL_XP = 50;

export interface StatsState {
  lastActiveDay: string;            // 'YYYY-MM-DD' — en son XP kazanılan gün
  streak: number;                   // aktif gün serisi
  bestStreak: number;               // tüm zamanların en iyi serisi
  dailyXp: Record<string, number>;  // gün → o gün kazanılan XP
  rescuePassed: number;             // geçilen hızlı kurtarma testi sayısı
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
        rescuePassed: d.rescuePassed || 0,
      };
    }
  } catch (e) { console.error(e); }
  return { lastActiveDay: '', streak: 0, bestStreak: 0, dailyXp: {}, rescuePassed: 0 };
}

function saveStats(s: StatsState) {
  // dailyXp'yi son 60 günle sınırla (localStorage şişmesin)
  const keys = Object.keys(s.dailyXp).sort();
  if (keys.length > 60) for (const k of keys.slice(0, keys.length - 60)) delete s.dailyXp[k];
  localStorage.setItem(STATS_KEY, JSON.stringify(s));
}

// Gün kontrolü: XP kazanmadan da (uygulama açılınca) seri durumunu tazeler.
// Dün ya da bugün çalışılmadıysa görünen seri "riskte" sayılır ama sıfırlama
// yalnızca yeni XP kazanımında kesinleşir; burada yalnız okuma amaçlı düzeltiriz.
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

export function recordRescuePass(): StatsState {
  const s = loadStats();
  s.rescuePassed += 1;
  saveStats(s);
  return s;
}

export function xpToday(s: StatsState): number {
  return s.dailyXp[todayStr()] || 0;
}

// Son 14 günün XP dizisi (grafik için, eskiden yeniye)
export function last14Days(s: StatsState): { day: string; label: string; xp: number }[] {
  const out: { day: string; label: string; xp: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const day = todayStr(-i);
    out.push({ day, label: day.slice(8), xp: s.dailyXp[day] || 0 });
  }
  return out;
}

// ------------------------------------------------------------------
// LİG / SEVİYE SİSTEMİ — toplam XP eşikleri
// ------------------------------------------------------------------
export interface League { name: string; icon: string; min: number; color: string }

export const LEAGUES: League[] = [
  { name: 'Bronz',   icon: '🥉', min: 0,     color: '#b45309' },
  { name: 'Gümüş',   icon: '🥈', min: 300,   color: '#94a3b8' },
  { name: 'Altın',   icon: '🥇', min: 900,   color: '#f59e0b' },
  { name: 'Safir',   icon: '🔷', min: 2000,  color: '#3b82f6' },
  { name: 'Yakut',   icon: '🔴', min: 4000,  color: '#ef4444' },
  { name: 'Elmas',   icon: '💠', min: 7000,  color: '#22d3ee' },
  { name: 'Usta',    icon: '🏅', min: 11000, color: '#a78bfa' },
  { name: 'Efsane',  icon: '👑', min: 16000, color: '#facc15' },
];

export function leagueForXp(xp: number): { league: League; next: League | null; progress: number } {
  let idx = 0;
  for (let i = 0; i < LEAGUES.length; i++) if (xp >= LEAGUES[i].min) idx = i;
  const league = LEAGUES[idx];
  const next = idx + 1 < LEAGUES.length ? LEAGUES[idx + 1] : null;
  const progress = next ? Math.min(1, (xp - league.min) / (next.min - league.min)) : 1;
  return { league, next, progress };
}

// ------------------------------------------------------------------
// ROZETLER — 12 başarı rozeti
// ------------------------------------------------------------------
export interface BadgeInput {
  xp: number;
  stats: StatsState;
  completedAlpha: number;
  completedUnits: number;
  completedTopics: number;
  completedGrammar: number;
  completedStories: number;
  srsCount: number;
  fixedMistakes: boolean; // hata kütüğü boş VE en az 1 ünite bitmiş
}

export interface Badge { id: string; icon: string; title: string; desc: string; earned: boolean }

export function computeBadges(x: BadgeInput): Badge[] {
  const s = x.stats;
  return [
    { id: 'first_step',  icon: '👣', title: 'İlk Adım',        desc: 'İlk XP\'ni kazan',                          earned: x.xp > 0 },
    { id: 'alpha_5',     icon: '🔤', title: 'Harf Avcısı',     desc: '5 alfabe dersi bitir',                      earned: x.completedAlpha >= 5 },
    { id: 'alpha_all',   icon: '🎓', title: 'Kiril Ustası',    desc: 'Tüm alfabe derslerini bitir (33 harf)',     earned: x.completedAlpha >= 16 },
    { id: 'streak_3',    icon: '🔥', title: 'Kıvılcım',        desc: '3 günlük seri yap',                         earned: s.bestStreak >= 3 },
    { id: 'streak_7',    icon: '🌋', title: 'Alev Alev',       desc: '7 günlük seri yap',                         earned: s.bestStreak >= 7 },
    { id: 'goal_day',    icon: '🎯', title: 'Hedef Tamam',     desc: `Bir günde ${DAILY_GOAL_XP} XP hedefini doldur`, earned: Object.values(s.dailyXp).some(v => v >= DAILY_GOAL_XP) },
    { id: 'unit_1',      icon: '📦', title: 'İlk Ünite',       desc: 'İlk üniteni tamamla',                       earned: x.completedUnits >= 1 },
    { id: 'unit_10',     icon: '🏗️', title: 'İnşaatçı',        desc: '10 ünite tamamla',                          earned: x.completedUnits >= 10 },
    { id: 'topic_10',    icon: '🎧', title: 'Keskin Kulak',    desc: '10 dinleme konusu bitir',                   earned: x.completedTopics >= 10 },
    { id: 'grammar_5',   icon: '🧩', title: 'Cümle Mimarı',    desc: '5 gramer temeli bitir',                     earned: x.completedGrammar >= 5 },
    { id: 'srs_50',      icon: '📅', title: 'Hafıza Bankası',  desc: 'SRS bankasında 50 kelime biriktir',         earned: x.srsCount >= 50 },
    { id: 'zero_debt',   icon: '✨', title: 'Temiz Sayfa',     desc: 'Hata kütüğünü tamamen temizle',             earned: x.fixedMistakes },
  ];
}

// ------------------------------------------------------------------
// YEDEKLEME — tüm ilerlemeyi tek JSON olarak dışa/içe aktar
// ------------------------------------------------------------------
const BACKUP_KEYS = [
  'RUSSIAN_MASTER_DUO_V1',     // ana ilerleme (XP, üniteler, SRS, hatalar)
  'dilkoc_learner_model_v1',   // öğrenci modeli (beceri/kelime gücü)
  'dilkoc_stats_v1',           // seri + günlük XP + rozet sayaçları
  'dilkoc_edge_tts_voices_v1', // seçili Edge TTS sesleri
  'dilkoc_autospeak',          // kelime kartı otomatik seslendirme tercihi
];

export function exportProgress(): string {
  const data: Record<string, string | null> = {};
  for (const k of BACKUP_KEYS) data[k] = localStorage.getItem(k);
  return JSON.stringify({ app: 'dilkoc-rusca-akademisi', version: 1, exportedAt: new Date().toISOString(), data }, null, 2);
}

export function importProgress(json: string): boolean {
  try {
    const parsed = JSON.parse(json);
    if (!parsed || parsed.app !== 'dilkoc-rusca-akademisi' || !parsed.data) return false;
    for (const k of BACKUP_KEYS) {
      const v = parsed.data[k];
      if (typeof v === 'string') localStorage.setItem(k, v);
    }
    return true;
  } catch {
    return false;
  }
}
