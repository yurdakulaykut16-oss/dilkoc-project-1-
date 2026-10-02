// ============================================================================
// HEDEF DİL SEÇİMİ — Ana menüde seçilen öğrenme dili (Rusça / İngilizce)
// ----------------------------------------------------------------------------
// Bu modül KASITLI olarak yaprak (leaf) modüldür: hiçbir veri/içerik modülü
// import etmez. Böylece ana menü ekrandayken Rusça/İngilizce müfredat
// modülleri belleğe YÜKLENMEZ; dil seçilip sayfa yenilendiğinde tüm içerik
// modülleri DOĞRU dil ile modül-init aşamasında kurulur (PATH, TOPICS_100,
// ALL_WORDS gibi türetilmiş sabitler dahil).
//
// Kullanım akışı:
//   1) main.tsx açılışta kayıtlı dili okur: yoksa ANA MENÜ gösterilir.
//   2) Menüden dil seçilince setTargetLang() + sayfa yenilenir.
//   3) Uygulama içindeki "🌐 Ana Menü" düğmesi requestMainMenu() ile işaret
//      bırakır ve yenilenir; main.tsx işareti görüp menüyü açar.
// ============================================================================

export type TargetLang = 'ru' | 'en';

const LANG_KEY = 'dilkoc_target_lang';
const SHOW_MENU_KEY = 'dilkoc_show_menu';

export interface TargetLangMeta {
  code: TargetLang;
  /** Türkçe adı: "Rusça" / "İngilizce" */
  name: string;
  /** Kendi dilinde adı: "Русский" / "English" */
  nativeName: string;
  flag: string;
  /** Üst bar başlığı: "RUSÇA AKADEMİSİ" / "İNGİLİZCE AKADEMİSİ" */
  academy: string;
  /** Harita banner'ı */
  banner: string;
  /** "Rusçası" / "İngilizcesi" — soru metinlerinde kullanılır */
  wordLabel: string;
  /** "RUSÇASI" / "İNGİLİZCESİ" — büyük harfli soru metinleri */
  wordLabelUpper: string;
  /** Cihaz/TTS dil etiketi */
  ttsTag: 'ru-RU' | 'en-US';
  /** Ses tanıma (konuşma koçu) dil etiketi */
  sttTag: 'ru-RU' | 'en-US';
  /** Hedef dilin yazısını tanıyan regex (Kiril / Latin-İngilizce) */
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

/** Kayıtlı dili okur (kayıt yoksa null → ana menü gösterilir). */
export function getSavedTargetLang(): TargetLang | null {
  try {
    const raw = localStorage.getItem(LANG_KEY);
    if (raw === 'ru' || raw === 'en') return raw;
  } catch { /* yok say */ }
  return null;
}

function readInitial(): TargetLang {
  return getSavedTargetLang() ?? 'ru';
}

/** Aktif hedef dil. Veri modüllerinin modül-init aşamasında okuduğu değerdir. */
let _active: TargetLang = readInitial();

export function getTargetLang(): TargetLang {
  return _active;
}

export function isEnglish(): boolean {
  return _active === 'en';
}

/** Dili seçip KALICI OLARAK kaydeder (ana menü seçimi). */
export function setTargetLang(lang: TargetLang): void {
  _active = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch { /* yok say */ }
}

/** Aktif dilin meta bilgisi (bayrak, adlar, TTS etiketi...). */
export function langMeta(): TargetLangMeta {
  return metaFor(_active);
}

/** Ana menüye dönüş isteği: işaret bırakır ve sayfayı yeniler;
 *  main.tsx açılışta işareti görüp dil seçim menüsünü gösterir. */
export function requestMainMenu(): void {
  try { localStorage.setItem(SHOW_MENU_KEY, '1'); } catch { /* yok say */ }
  try { window.location.reload(); } catch { /* yok say */ }
}

/** Ana menü isteği varsa tüketir (true döner ve işareti siler). */
export function consumeMainMenuRequest(): boolean {
  try {
    if (localStorage.getItem(SHOW_MENU_KEY) === '1') {
      localStorage.removeItem(SHOW_MENU_KEY);
      return true;
    }
  } catch { /* yok say */ }
  return false;
}

// ---------------------------------------------------------------------------
// SESLENDİRME DİLİ TESPİTİ
// Metnin hedef dil mi yoksa arayüz dili (Türkçe) mi olduğunu anlar:
//   - Kiril harf varsa → Rusça
//   - Türkçeye özgü harf varsa (ç, ğ, ı, İ, ö, ş, ü) → Türkçe
//   - yoksa → hedef dil Rusçaysa Türkçe, İngilizceyse İngilizce
// (Türkçe arayüz metinleri neredeyse her zaman Türkçe'ye özgü harf içerir;
//  hedef dil kelimeleri hiçbir zaman içermez.)
// ---------------------------------------------------------------------------
const TURKISH_CHARS = /[çğışİöü]/;

export function detectSpeechTag(text: string): 'ru-RU' | 'en-US' | 'tr-TR' {
  const t = text || '';
  if (/[а-яё]/i.test(t)) return 'ru-RU';
  if (TURKISH_CHARS.test(t)) return 'tr-TR';
  return _active === 'en' ? 'en-US' : 'tr-TR';
}

/** Metin hedef dilin yazısıyla yazılmış mı? (öğrenen modeli/ses zinciri için) */
export function isTargetScript(text: string): boolean {
  // İngilizce hedefte Latin harf hem Türkçe hem İngilizce olabilir:
  // Türkçe'ye özgü harf YOKSA hedef dil kabul edilir.
  if (_active === 'en') return /[a-z]/i.test(text) && !TURKISH_CHARS.test(text);
  return /[а-яё]/i.test(text);
}
