// ==========================================
// 📝 DENEME SINAVI GEÇMİŞİ — localStorage deposu
// Her deneme sınavı sonucu burada saklanır: tarih, seviye, puan,
// beceri kırılımı ve süre. En iyi puanlar harita kartında ve
// rapor ekranında gösterilir.
// ==========================================

export interface ExamAttempt {
  id: string;
  level: string;                    // A1 | A2 | B1 | B2 | C1/C2 | GENEL
  date: number;                     // timestamp
  total: number;                    // soru sayısı
  correct: number;
  percent: number;                  // 0-100
  passed: boolean;
  durationSec: number;
  /** beceri → [doğru, toplam] */
  skills: Record<string, [number, number]>;
  ultra: boolean;                   // ultra modda çözüldüyse ayrıca işaretlenir
}

const EXAM_KEY = 'dilkoc_exams_v1';
const MAX_ATTEMPTS = 60; // deposu şişmesin: en yeni 60 deneme tutulur

export function loadExamAttempts(): ExamAttempt[] {
  try {
    const raw = localStorage.getItem(EXAM_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as ExamAttempt[]) : [];
  } catch {
    return [];
  }
}

export function saveExamAttempt(a: Omit<ExamAttempt, 'id' | 'date'>): ExamAttempt {
  const full: ExamAttempt = { ...a, id: `ex_${Date.now()}_${Math.floor(Math.random() * 1e6)}`, date: Date.now() };
  const arr = [full, ...loadExamAttempts()].slice(0, MAX_ATTEMPTS);
  try { localStorage.setItem(EXAM_KEY, JSON.stringify(arr)); } catch { /* yoksay */ }
  return full;
}

export function clearExamAttempts(): void {
  try { localStorage.removeItem(EXAM_KEY); } catch { /* yoksay */ }
}

export function bestAttemptFor(level: string, attempts?: ExamAttempt[]): ExamAttempt | null {
  const arr = attempts ?? loadExamAttempts();
  let best: ExamAttempt | null = null;
  for (const a of arr) {
    if (a.level !== level) continue;
    if (!best || a.percent > best.percent) best = a;
  }
  return best;
}

export function lastAttempts(level: string | null, n: number, attempts?: ExamAttempt[]): ExamAttempt[] {
  const arr = attempts ?? loadExamAttempts();
  return arr.filter(a => !level || a.level === level).slice(0, n);
}

export const fmtDate = (ts: number): string =>
  new Date(ts).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' }) +
  ' ' + new Date(ts).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
