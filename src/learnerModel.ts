import { isEnglish } from './content/activeLanguage';

const LEARNER_KEY = isEnglish() ? 'dilkoc_learner_model_en_v1' : 'dilkoc_learner_model_v1';
export const LEARNER_EVENT = 'dilkoc-learner-updated';

export interface SkillStat { correct: number; wrong: number; last: number }

export interface LearnerData {
  skills: Record<string, SkillStat>;
  words: Record<string, { tr: string; correct: number; wrong: number; lastSeen: number; lastCorrect: number }>;
}

let cache: LearnerData | null = null;

export function loadLearner(): LearnerData {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(LEARNER_KEY);
    if (raw) { cache = JSON.parse(raw); return cache!; }
  } catch {}
  cache = { skills: {}, words: {} };
  return cache;
}

function save() {
  if (!cache) return;
  try { localStorage.setItem(LEARNER_KEY, JSON.stringify(cache)); } catch {}
  try { window.dispatchEvent(new CustomEvent(LEARNER_EVENT)); } catch {}
}

export function resetLearner() {
  cache = { skills: {}, words: {} };
  try { localStorage.removeItem(LEARNER_KEY); } catch {}
  try { window.dispatchEvent(new CustomEvent(LEARNER_EVENT)); } catch {}
}

export const PREPOSITIONS: string[] = isEnglish()
  ? ['in', 'on', 'at', 'to', 'from', 'with', 'for', 'about', 'by', 'of', 'into', 'out', 'over', 'under', 'between', 'among', 'through', 'during', 'after', 'before', 'near', 'without', 'until', 'since', 'against', 'around', 'behind', 'despite', 'upon', 'within', 'toward', 'towards', 'across', 'along', 'beside', 'beyond', 'past', 'up', 'down', 'off']
  : ['в', 'на', 'к', 'у', 'с', 'из', 'о', 'об', 'по', 'за', 'под', 'над', 'от', 'до', 'для', 'без', 'через', 'при', 'между', 'перед', 'около', 'после', 'про'];

const FUTURE_AUX = ['буду', 'будешь', 'будет', 'будем', 'будете', 'будут'];
const PAST_RE = /^[а-яё]{2,}(л|ла|ло|ли)(сь|ся)?$/i;
const PRESENT_STRONG_RE = /^[а-яё]{2,}(ешь|ёшь|ет|ёт|ем|ём|ете|ёте|ют|ишь|ит|им|ите|ат|ят)(ся|сь)?$/i;
const PRESENT_WEAK_RE = /^[а-яё]{2,}(ю|у)(сь)?$/i;
const NOT_VERB = new Set(['привет', 'момент', 'билет', 'кабинет', 'пакет', 'банкет', 'бюджет', 'секрет', 'совет', 'ответ', 'обед', 'сосед', 'салат', 'халат', 'брат', 'закат', 'адвокат', 'шоколад', 'стол', 'стул', 'пол', 'футбол', 'гол', 'укол', 'зал', 'вокзал', 'канал', 'мама', 'папа', 'вода', 'еда', 'среда', 'звезда', 'это', 'кто', 'что', 'место', 'лето', 'мясо', 'молоко', 'окно', 'кино', 'вино', 'пальто', 'метро', 'утро', 'много', 'мало', 'дело', 'тело', 'им', 'ним', 'вам', 'нам', 'там', 'сам', 'зачем', 'причём', 'днём', 'потом', 'дом', 'том', 'ем', 'семь', 'восемь']);

const EN_WILL = new Set(['will', "will", 'shall', "ll", 'wo', "won't", 'won’t']);
const EN_GOING = new Set(['going']);
const EN_PAST_BE = new Set(['was', 'were']);
const EN_PRESENT_BE = new Set(['am', 'is', 'are', "'m", "'re", "'s", '’s', '’m', '’re']);
const EN_PAST_DO = new Set(['did', "didn't", 'didn’t']);
const EN_PRESENT_DO = new Set(['do', 'does', "don't", 'doesn’t', 'doesn’t', "don’t", 'doesn']);
const EN_IRREGULAR_PAST = new Set(['went', 'saw', 'did', 'had', 'made', 'took', 'came', 'said', 'got', 'knew', 'thought', 'found', 'bought', 'brought', 'told', 'ate', 'drank', 'drove', 'ran', 'swam', 'wrote', 'spoke', 'broke', 'fell', 'felt', 'kept', 'left', 'met', 'paid', 'put', 'sat', 'stood', 'taught', 'threw', 'understood', 'wore', 'won', 'lost', 'gave', 'grew', 'heard', 'held', 'kept', 'led', 'let', 'lay', 'lost', 'meant', 'read', 'rode', 'rose', 'sang', 'slept', 'sold', 'spent', 'stuck', 'struck', 'swung', 'taught', 'woke', 'won']);
const EN_ED_NOT_PAST = new Set(['bed', 'red', 'need', 'indeed', 'seed', 'speed', 'feed', 'hundred', 'thousand', 'sacred', 'naked', 'rugged', 'wicked', 'learned', 'ragged', 'dogged', 'blessed', 'aged', 'beloved', 'netted', 'fitted']);
const EN_S_NOT_VERB = new Set(['this', 'these', 'those', 'thus', 'yes', 'us', 'as', 'is', 'his', 'its', 'bus', 'gas', 'was', 'has', 'does', 'goes', 'news', 'glass', 'class', 'dress', 'address', 'business', 'office', 'practice', 'promise', 'purpose', 'service', 'space', 'success', 'tennis', 'virus', 'analysis', 'campus', 'chorus', 'circus', 'focus', 'genius', 'illness', 'justice', 'kindness', 'less', 'miss', 'press', 'stress', 'surface', 'sense', 'noise', 'rose', 'nose', 'base', 'case', 'chase', 'pause', 'abuse', 'whose', 'house', 'mouse', 'mouth', 'yours', 'ours', 'theirs', 'perhaps', 'always', 'sometimes', 'usually', 'clothes', 'glasses', 'shoes', 'cheese', 'please', 'else', 'cross', 'across', 'loss', 'boss', 'guess', 'pass', 'mass', 'discuss', 'express', 'impress', 'princess', 'progress', 'access', 'excess', 'princess', 'status', 'bonus', 'plus', 'versus', 'campus', 'canvas', 'mathematics', 'physics', 'politics', 'economics', 'linguistics', 'electronics', 'statistics', 'classics', 'gymnastics', 'always', 'never', 'weeks', 'months', 'years', 'days', 'thanks', 'congratulations', 'savings', 'earnings', 'belongings', 'surroundings', 'outskirts', 'headquarters', 'series', 'species', 'movies', 'stories', 'libraries', 'cities', 'babies', 'ladies', 'gentlemen', 'children', 'men', 'women', 'feet', 'teeth', 'people']);

function tokenize(ru: string): string[] {
  return ru.toLowerCase().replace(/[«»"“”.,!?;:()\-–—]/g, ' ').split(/\s+/).filter(Boolean);
}

export type TenseKey = 'tense:present' | 'tense:past' | 'tense:future';

function detectTensesEn(text: string): TenseKey[] {
  const tokens = tokenize(text);
  const found = new Set<TenseKey>();
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i].replace(/[’]/g, "'");
    const next = i + 1 < tokens.length ? tokens[i + 1].replace(/[’]/g, "'") : '';
    if (EN_WILL.has(t)) { found.add('tense:future'); continue; }
    if (EN_GOING.has(t) && next === 'to') { found.add('tense:future'); continue; }
    if (EN_PAST_BE.has(t)) { found.add('tense:past'); continue; }
    if (EN_PAST_DO.has(t)) { found.add('tense:past'); continue; }
    if (EN_PRESENT_BE.has(t)) { found.add('tense:present'); continue; }
    if (EN_PRESENT_DO.has(t) && next !== '') { found.add('tense:present'); continue; }
    if (t === 'have' || t === 'has' || t === "'ve" || t === "'s") {
      if (EN_IRREGULAR_PAST.has(next) || (/[a-z]ed$/.test(next) && !EN_ED_NOT_PAST.has(next)) || /[a-z](en|ne)$/.test(next)) {
        found.add('tense:past');
        continue;
      }
      found.add('tense:present');
      continue;
    }
    if (t === 'had') {
      if (EN_IRREGULAR_PAST.has(next) || /[a-z]ed$/.test(next) || /[a-z]en$/.test(next)) found.add('tense:past');
      else found.add('tense:past');
      continue;
    }
    if (EN_IRREGULAR_PAST.has(t)) { found.add('tense:past'); continue; }
    if (/[a-z]ed$/.test(t) && !EN_ED_NOT_PAST.has(t) && t.length > 3) { found.add('tense:past'); continue; }
    if (/[a-z](s|es|ies)$/.test(t) && !EN_S_NOT_VERB.has(t) && !/ss$/.test(t) && !/us$/.test(t) && !/is$/.test(t) && t.length > 2) {
      if (!/[a-z]ing$/.test(t)) found.add('tense:present');
    }
    if (/[a-z]ing$/.test(t) && tokens.length > 1) {
      if (!EN_PAST_BE.has(tokens[Math.max(0, i - 1)]) && !EN_PAST_BE.has(tokens[Math.min(tokens.length - 1, i + 1)])) found.add('tense:present');
    }
  }
  return Array.from(found);
}

export function detectTenses(ru: string): TenseKey[] {
  if (isEnglish()) return detectTensesEn(ru);
  const tokens = tokenize(ru);
  const found = new Set<TenseKey>();
  let futureAux = false;
  let weakPresent = false;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (FUTURE_AUX.includes(t)) { futureAux = true; found.add('tense:future'); continue; }
    if (NOT_VERB.has(t)) continue;
    if (PAST_RE.test(t)) { found.add('tense:past'); continue; }
    if (PRESENT_STRONG_RE.test(t)) { found.add(futureAux ? 'tense:future' : 'tense:present'); continue; }
    const prev = i > 0 ? tokens[i - 1] : '';
    if (PRESENT_WEAK_RE.test(t) && !PREPOSITIONS.includes(prev)) weakPresent = true;
  }
  if (weakPresent && found.size === 0) found.add('tense:present');
  return Array.from(found);
}

export function detectPreps(ru: string): string[] {
  const tokens = tokenize(ru);
  const found: string[] = [];
  for (const t of tokens) if (PREPOSITIONS.includes(t) && !found.includes(t)) found.push(t);
  return found;
}

export function classifySentenceSkills(ru: string): string[] {
  return [...detectTenses(ru), ...detectPreps(ru).map(p => `prep:${p}`)];
}

export function recordSkill(key: string, correct: boolean) {
  const d = loadLearner();
  const s = d.skills[key] || { correct: 0, wrong: 0, last: 0 };
  if (correct) s.correct += 1; else s.wrong += 1;
  s.last = Date.now();
  d.skills[key] = s;
  save();
}

export function recordSentenceResult(ru: string, correct: boolean) {
  const keys = classifySentenceSkills(ru);
  if (keys.length === 0) return;
  const d = loadLearner();
  for (const key of keys) {
    const s = d.skills[key] || { correct: 0, wrong: 0, last: 0 };
    if (correct) s.correct += 1; else s.wrong += 1;
    s.last = Date.now();
    d.skills[key] = s;
  }
  save();
}

export function recordWordResult(ru: string, tr: string, correct: boolean) {
  if (!ru) return;
  const d = loadLearner();
  const w = d.words[ru] || { tr, correct: 0, wrong: 0, lastSeen: 0, lastCorrect: 0 };
  w.tr = tr || w.tr;
  if (correct) { w.correct += 1; w.lastCorrect = Date.now(); } else w.wrong += 1;
  w.lastSeen = Date.now();
  d.words[ru] = w;
  save();
  const low = ru.trim().toLowerCase();
  if (PREPOSITIONS.includes(low)) recordSkill(`prep:${low}`, correct);
  if (ru.trim().includes(' ')) recordSentenceResult(ru, correct);
}

export function skillKeyForGrammarUnit(unitId: string): string | null {
  if (unitId.startsWith('tense_past')) return 'tense:past';
  if (unitId.startsWith('tense_present')) return 'tense:present';
  if (unitId.startsWith('tense_future')) return 'tense:future';
  if (unitId === 'tense_aspect' || unitId === 'tense_overview' || unitId === 'tense_review') return 'tense:aspect';
  if (unitId === 'gram_prepositions') return isEnglish() ? 'prep:in' : 'prep:в';
  return null;
}

export interface SkillSummaryRow {
  key: string;
  group: 'zaman' | 'edat';
  label: string;
  correct: number;
  wrong: number;
  total: number;
  accuracy: number;
  weakness: number;
  status: 'strong' | 'mid' | 'weak' | 'unknown';
}

const TENSE_LABELS: Record<string, string> = isEnglish()
  ? {
      'tense:present': 'Present (Simple/Continuous)',
      'tense:past': 'Past (Simple/Continuous/Perfect)',
      'tense:future': 'Future (will / going to)',
      'tense:aspect': 'Zaman Sistemi & Karma',
    }
  : {
      'tense:present': 'Şimdiki Zaman',
      'tense:past': 'Geçmiş Zaman (-л)',
      'tense:future': 'Gelecek Zaman (буду...)',
      'tense:aspect': 'Görünüş (вид) & Karma',
    };

const PREP_HINTS: Record<string, string> = isEnglish()
  ? {
      'in': 'içinde (mekân/ay/yıl)', 'on': 'üstünde (yüzey/gün)', 'at': 'noktada (yer/saat)', 'to': '-e doğru',
      'from': '-den (kaynak)', 'with': 'ile (beraberlik/araç)', 'for': 'için / boyunca', 'about': 'hakkında',
      'by': 'tarafından / yanında', 'of': '-nin (aitlik)', 'into': 'içine (hareket)', 'out': 'dışarı',
      'over': 'üstünde / fazla', 'under': 'altında', 'between': 'arasında (iki şey)', 'among': 'arasında (grup)',
      'through': 'içinden (geçerek)', 'during': 'sırasında', 'after': '-den sonra', 'before': '-den önce',
      'near': 'yakınında', 'without': '-sız', 'until': '-e kadar', 'since': '-den beri', 'against': 'karşı',
      'around': 'etrafında', 'behind': 'arkasında', 'despite': 'e rağmen', 'upon': 'üzerine (resmi)',
      'within': 'içinde (süre/sınır)', 'toward': '-e doğru', 'towards': '-e doğru', 'across': 'karşıya',
      'along': 'boyunca', 'beside': 'yanında', 'beyond': 'ötesinde', 'past': 'ötesinde / geçerek',
      'up': 'yukarı', 'down': 'aşağı', 'off': 'kapalı/uzağa',
    }
  : {
      'в': 'içinde / -e (yön)', 'на': 'üstünde / -de', 'к': '-e doğru', 'у': '-in yanında / -de var',
      'с': 'ile / -den beri', 'из': 'içinden / -den', 'о': 'hakkında', 'об': 'hakkında', 'по': 'boyunca / göre',
      'за': 'arkasında / için', 'под': 'altında', 'над': 'üstünde (boşlukta)', 'от': '-den (uzaklaşma)',
      'до': '-e kadar', 'для': 'için', 'без': '-sız', 'через': 'içinden / sonra', 'при': 'yanında / sırasında',
      'между': 'arasında', 'перед': 'önünde', 'около': 'yakınında', 'после': '-den sonra', 'про': 'hakkında (konuşma dili)',
    };

export function skillSummary(): SkillSummaryRow[] {
  const d = loadLearner();
  const rows: SkillSummaryRow[] = [];
  const keys = new Set<string>([...Object.keys(TENSE_LABELS), ...Object.keys(d.skills)]);
  keys.forEach(key => {
    const isTense = key.startsWith('tense:');
    const isPrep = key.startsWith('prep:');
    if (!isTense && !isPrep) return;
    const s = d.skills[key] || { correct: 0, wrong: 0, last: 0 };
    const total = s.correct + s.wrong;
    const accuracy = total > 0 ? Math.round((s.correct / total) * 100) : 0;
    const weakness = total === 0 ? 0.5 : Math.min(1, (s.wrong * 1.6) / (total + 1));
    const prep = key.slice(5);
    rows.push({
      key,
      group: isTense ? 'zaman' : 'edat',
      label: isTense ? (TENSE_LABELS[key] || key) : `«${prep}» — ${PREP_HINTS[prep] || 'edat'}`,
      correct: s.correct,
      wrong: s.wrong,
      total,
      accuracy,
      weakness,
      status: total === 0 ? 'unknown' : accuracy >= 80 ? 'strong' : accuracy >= 55 ? 'mid' : 'weak',
    });
  });
  return rows.sort((a, b) => b.weakness - a.weakness || b.total - a.total);
}

export interface RouteStep {
  id: string;
  icon: string;
  title: string;
  why: string;
  action:
    | { type: 'grammar'; grammarUnitId: string }
    | { type: 'rescue'; skillKey: string }
    | { type: 'rescueWord'; ru: string; tr: string }
    | { type: 'shorts' };
  severity: 'high' | 'mid' | 'low';
}

export function buildLearningRoute(errorStats: Record<string, { count: number; tr: string; last: number }>): RouteStep[] {
  const rows = skillSummary().filter(r => r.total > 0);
  const steps: RouteStep[] = [];

  const grammarUnitFor = (key: string): string => {
    if (key === 'tense:past') return 'tense_past';
    if (key === 'tense:present') return 'tense_present_e';
    if (key === 'tense:future') return 'tense_future_budu';
    if (key === 'tense:aspect') return 'tense_aspect';
    return 'gram_prepositions';
  };

  for (const r of rows) {
    if (r.status === 'weak') {
      steps.push({
        id: `route_${r.key}`,
        icon: r.group === 'zaman' ? '⏳' : '📍',
        title: `${r.label} — güçlendir`,
        why: `${r.total} soruda %${r.accuracy} isabet (${r.wrong} hata). Bu ${r.group === 'zaman' ? 'zaman' : 'edat'} şu an en zayıf halkan.`,
        action: { type: 'grammar', grammarUnitId: grammarUnitFor(r.key) },
        severity: 'high',
      });
      steps.push({
        id: `rescue_${r.key}`,
        icon: '⚡',
        title: `${r.label} — 1 dk hızlı test`,
        why: 'Kuralı okuduktan hemen sonra 60 saniyelik hedefli testle mühürle.',
        action: { type: 'rescue', skillKey: r.key },
        severity: 'high',
      });
    } else if (r.status === 'mid') {
      steps.push({
        id: `route_${r.key}`,
        icon: r.group === 'zaman' ? '⏱️' : '🧭',
        title: `${r.label} — pekiştir`,
        why: `%${r.accuracy} isabet: fena değil ama otomatikleşmedi. Kısa bir hedefli test yeter.`,
        action: { type: 'rescue', skillKey: r.key },
        severity: 'mid',
      });
    }
  }

  const weakWords = Object.entries(errorStats)
    .map(([ru, v]) => ({ ru, tr: v.tr, count: v.count }))
    .filter(w => w.count >= 2)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
  for (const w of weakWords) {
    steps.push({
      id: `word_${w.ru}`,
      icon: '🩹',
      title: `«${w.ru}» kelimesini kurtar`,
      why: `${w.count} kez yanlışlandı — 1 dakikalık kurtarma testiyle taze tut.`,
      action: { type: 'rescueWord', ru: w.ru, tr: w.tr },
      severity: w.count >= 4 ? 'high' : 'mid',
    });
  }

  if (steps.length > 0) {
    steps.push({
      id: 'shorts',
      icon: '🎬',
      title: 'Koç Akışı: hatalarına özel 15-30 sn mikro dersler',
      why: 'Zayıf konuların dikey video/animasyon dersleri otomatik üretildi — kaydırarak izle.',
      action: { type: 'shorts' },
      severity: 'low',
    });
  }

  const order = { high: 0, mid: 1, low: 2 } as const;
  return steps.sort((a, b) => order[a.severity] - order[b.severity]).slice(0, 12);
}
