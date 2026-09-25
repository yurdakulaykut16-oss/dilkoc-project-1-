// ============================================================================
// HARF NOTLARI + İNCE HARF TAMAMLAYICILARI + HECE KONULARI
// ----------------------------------------------------------------------------
// - LETTER_NOTES: 33 harfin kısa fonetik notu (kulak eğitimi).
// - THIN_LETTER_SUPPLEMENT: müfredatta az geçen harfler (Ъ, Э) için elle
//   seçilmiş B1-C2 seviyesi kelimeler — hepsi gerçek kullanım sözcükleri.
// - SYLLABLE_TOPICS: 8 fonetik konunun 2 "hece pratiği" konusunun içeriği.
// ============================================================================

import type { Topic100Item } from './types';

/** 33 harf — büyük harf + kısa fonetik not (Alfabedeki sırayla). */
export const LETTER_INFO: { glyph: string; note: string }[] = [
  { glyph: 'А', note: '"a" sesi — Türkçedekiyle aynı. Vurgulu olsun olmasın hep net okunur.' },
  { glyph: 'Б', note: '"b" sesi. Kelime sonunda "p" olarak sedasızlaşır (брат -> brat).' },
  { glyph: 'В', note: 'Y görünümlü ama "v" okunur. Alt dudak üst dişlere hafifçe değer.' },
  { glyph: 'Г', note: '"g" sesi. Kelime sonunda "k" olur (год -> gót, гость -> gást).' },
  { glyph: 'Д', note: '"d" sesi. Kelime sonunda "t" olur (друг -> druk, сад -> sat).' },
  { glyph: 'Е', note: 'Vurgulu "e", vurgusuz "i" (ikanje). Baş harfte "ye" gibi (еда -> yéda).' },
  { glyph: 'Ё', note: '"yo" sesi (başta), sonra "o" olur. Günlük metinlerde bazen "е" yazılır.' },
  { glyph: 'Ж', note: '"j" ile "ş" arası vızıltı (zh). Sadece "ж" sesi verir, değişmez.' },
  { glyph: 'З', note: '"z" sesi. Başta "з" yumuşak sesleri (и, е, я) yumuşatır: земля -> yémlya.' },
  { glyph: 'И', note: '"ı" ile "i" arası, açık ağızla okunan kısa "i". Türkçedeki "i"ye benzer.' },
  { glyph: 'Й', note: '"j/y" yarım ünsüzü. Sözcük içinde kısa "y" gibi okunur (мой -> moy).' },
  { glyph: 'К', note: 'Sert "k" sesi — Türkçeyle birebir aynı.' },
  { glyph: 'Л', note: '"l" sesi. Genelde "dark L" (kalın l), yumuşak ünlüden önce yumuşar.' },
  { glyph: 'М', note: '"m" sesi — Türkçeyle aynı, dudaklar tam kapanır.' },
  { glyph: 'Н', note: '"n" sesi. Dil ucu üst dişlere değerek nazal çıkarılır.' },
  { glyph: 'О', note: 'AKANJE KURALI: vurgulu "o", vurgusuz "a" (окно -> aknó). Rusçanın en önemli kuralı.' },
  { glyph: 'П', note: '"p" sesi — Türkçeyle aynı, nefessiz ve sert.' },
  { glyph: 'Р', note: 'Güçlü titreşimli "r". Dil ucu damakta sertçe titrer (Türkçe "r"den güçlü).' },
  { glyph: 'С', note: 'Islık "s" sesi. "S" ve "sz" arasında, dişlerle çıkarılır.' },
  { glyph: 'Т', note: '"t" sesi — Türkçeyle aynı, net ve sert.' },
  { glyph: 'У', note: '"u" sesi — Türkçedeki "u"ya çok yakın, dudaklar hafifçe ileri.' },
  { glyph: 'Ф', note: '"f" sesi — Türkçeyle aynı, hafif fısıltılı.' },
  { glyph: 'Х', note: 'Boğazdan gelen "kh" (h-s arası, derin h). "Хлеб" her zaman kulağa gelir.' },
  { glyph: 'Ц', note: '"ts" iki sesli hece. Türkçedeki "c" gibi (tsa, tsi).' },
  { glyph: 'Ч', note: '"ş"den yumuşak "ch" (c-h arası). Çay, çanta, çam derken hep çalar.' },
  { glyph: 'Ш', note: '"ş" sesi. Sert ve net, şapka gibi "sh" okunur.' },
  { glyph: 'Щ', note: '"ç" ya da uzatılmış "şş" (shch). Dil ucu damakta, iki heceli.' },
  { glyph: 'Ъ', note: 'SES VERMEZ! Hece ayırıcıdır: объявление -> abaly-av-yé-niye.' },
  { glyph: 'Ы', note: '"ı"ya benzer ama arka damaktan gelen kuru "ı". Türkçede birebir karşılığı yok.' },
  { glyph: 'Ь', note: 'SES VERMEZ! Önceki ünsüzü yumuşatır: день -> dyén, палец -> pálets.' },
  { glyph: 'Э', note: 'Açık ağızla "e" (é). Genelde yabancı kelimelerde ve "этаж" gibi sözcüklerde.' },
  { glyph: 'Ю', note: '"yu" (başta) / "u" (sonra). Yumuşak "u" sesi verir.' },
  { glyph: 'Я', note: '"ya" (başta) / "a" (sonra). En çok "я" (ben) sözcüğünde dinlenir.' },
];

/**
 * İnce harf tamamlayıcıları — müfredat kelimeleriyle hedeflenen 8 kelime
 * sayısına ulaşılamayan harfler için elle seçilmiş örnekler.
 * Seviye B1-C2: "alfabe çalışması = üst seviye ön-hazırlık" ilkesi.
 */
export const THIN_LETTER_SUPPLEMENT: Record<string, Topic100Item[]> = {
  'Ъ': [
    { ru: 'Объявление', reading: 'abaly-av-yé-niye', tr: 'ilan', level: 'B2' },
    { ru: 'Объём', reading: 'ab-yóm', tr: 'hacim, boyut', level: 'B2' },
    { ru: 'Подъём', reading: 'pód-yom', tr: 'yükseliş, kalkış', level: 'B1' },
    { ru: 'Въезд', reading: 'vyézd', tr: 'giriş (yol)', level: 'B2' },
    { ru: 'Съезд', reading: 'syéd', tr: 'kongre', level: 'B2' },
    { ru: 'Съёмка', reading: 'syóymka', tr: 'çekim (kamera)', level: 'B1' },
    { ru: 'Объезд', reading: 'ab-yézd', tr: 'çevre yol', level: 'B2' },
  ],
  'Э': [
    { ru: 'Этаж', reading: 'é-taj', tr: 'kat (bina)', level: 'A2' },
    { ru: 'Экзамен', reading: 'éksamen', tr: 'sınav', level: 'B1' },
    { ru: 'Экскурсия', reading: 'ékskursoriya', tr: 'gezi', level: 'B1' },
    { ru: 'Эскалатор', reading: 'eskalyatór', tr: 'yürüyen merdiven', level: 'B1' },
    { ru: 'Эхо', reading: 'éha', tr: 'yankı', level: 'B2' },
  ],
};

/** Hece pratiği konuları (fonetik bölümünün ilk 2 konusu). */
export const SYLLABLE_TOPICS: {
  icon: string;
  titleRu: string;
  titleTr: string;
  descTr: string;
  items: { ru: string; reading: string; tr: string }[];
}[] = [
  {
    icon: '🔤',
    titleRu: 'Гласные: а, о, е, и, ы, у',
    titleTr: 'Ünlü Heceler',
    descTr: '6 ünlünün hecelerini (а-о-е-и-ы-у) yavaş yavaş dinle. Rus ünlüleri vurgudan bağımsız kalarak aynı sesi korur (akanje dışında).',
    items: [
      { ru: 'А', reading: 'a', tr: 'ünlü hece "a"' },
      { ru: 'О', reading: 'a (vurgusuz), o (vurgulu)', tr: 'ünlü hece "o" — akanje' },
      { ru: 'Е', reading: 'i (vurgusuz), ye (vurgulu)', tr: 'ünlü hece "e" — ikanje' },
      { ru: 'И', reading: 'i', tr: 'ünlü hece "i"' },
      { ru: 'Ы', reading: 'ı (arkada)', tr: 'ünlü hece "ı"' },
      { ru: 'У', reading: 'u', tr: 'ünlü hece "u"' },
    ],
  },
  {
    icon: '🎵',
    titleRu: 'Слоги: ма, па, та, ка',
    titleTr: 'Ünsüz + Ünlü Heceler',
    descTr: 'Sıklık sırasına göre temel heceleri (ма, па, та, ка, са, ра, ба, да) dinle — hecenin ritmi Rusça cümlelerin ritmidir.',
    items: [
      { ru: 'Ма', reading: 'ma', tr: 'hece "ma"' },
      { ru: 'Па', reading: 'pa', tr: 'hece "pa"' },
      { ru: 'Та', reading: 'ta', tr: 'hece "ta"' },
      { ru: 'Ка', reading: 'ka', tr: 'hece "ka"' },
      { ru: 'Са', reading: 'sa', tr: 'hece "sa"' },
      { ru: 'Ра', reading: 'ra', tr: 'hece "ra" — titreşimli r' },
      { ru: 'Ба', reading: 'ba', tr: 'hece "ba"' },
      { ru: 'Да', reading: 'da', tr: 'hece "da"' },
    ],
  },
];
