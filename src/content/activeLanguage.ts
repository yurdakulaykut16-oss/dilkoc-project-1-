export type TargetLang = 'ru' | 'en';

const LANG_KEY = 'dilkoc_target_lang';
const SHOW_MENU_KEY = 'dilkoc_show_menu';

export interface TargetLangMeta {
  code: TargetLang;
  name: string;
  nativeName: string;
  flag: string;
  academy: string;
  banner: string;
  wordLabel: string;
  wordLabelUpper: string;
  ttsTag: 'ru-RU' | 'en-US';
  sttTag: 'ru-RU' | 'en-US';
  scriptRe: RegExp;
  accentColor: string;
}

export const LANGUAGES: TargetLangMeta[] = [
  {
    code: 'ru',
    name: 'Rusça',
    nativeName: 'Русский',
    flag: '🇷🇺',
    academy: 'RUSÇA AKADEMİSİ',
    banner: 'Rusça Akademisi — Alfabeden Dizi Seviyesine',
    wordLabel: 'Rusçası',
    wordLabelUpper: 'RUSÇASI',
    ttsTag: 'ru-RU',
    sttTag: 'ru-RU',
    scriptRe: /[а-яё]/i,
    accentColor: '#38bdf8',
  },
  {
    code: 'en',
    name: 'İngilizce',
    nativeName: 'English',
    flag: '🇬🇧',
    academy: 'İNGİLİZCE AKADEMİSİ',
    banner: 'İngilizce Akademisi — Fonetikten Ustalık Seviyesine',
    wordLabel: 'İngilizcesi',
    wordLabelUpper: 'İNGİLİZCESİ',
    ttsTag: 'en-US',
    sttTag: 'en-US',
    scriptRe: /[a-z]/i,
    accentColor: '#a78bfa',
  },
];

function metaFor(code: TargetLang): TargetLangMeta {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export function getSavedTargetLang(): TargetLang | null {
  try {
    const raw = localStorage.getItem(LANG_KEY);
    if (raw === 'ru' || raw === 'en') return raw;
  } catch {}
  return null;
}

function readInitial(): TargetLang {
  return getSavedTargetLang() ?? 'ru';
}

let _active: TargetLang = readInitial();

export function getTargetLang(): TargetLang {
  return _active;
}

export function isEnglish(): boolean {
  return _active === 'en';
}

export function setTargetLang(lang: TargetLang): void {
  _active = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch {}
}

export function langMeta(): TargetLangMeta {
  return metaFor(_active);
}

export function requestMainMenu(): void {
  try { localStorage.setItem(SHOW_MENU_KEY, '1'); } catch {}
  try { window.location.reload(); } catch {}
}

export function consumeMainMenuRequest(): boolean {
  try {
    if (localStorage.getItem(SHOW_MENU_KEY) === '1') {
      localStorage.removeItem(SHOW_MENU_KEY);
      return true;
    }
  } catch {}
  return false;
}

const TURKISH_CHARS = /[çğışİöü]/;

export function detectSpeechTag(text: string): 'ru-RU' | 'en-US' | 'tr-TR' {
  const t = text || '';
  if (/[а-яё]/i.test(t)) return 'ru-RU';
  if (TURKISH_CHARS.test(t)) return 'tr-TR';
  return _active === 'en' ? 'en-US' : 'tr-TR';
}

export function isTargetScript(text: string): boolean {
  if (_active === 'en') return /[a-z]/i.test(text) && !TURKISH_CHARS.test(text);
  return /[а-яё]/i.test(text);
}
