// ============================================================================
// 🇬🇧 İNGİLİZCE HARF NOTLARI + HECE KONULARI + İNCE HARF TAMAMLAYICILARI
// ----------------------------------------------------------------------------
// Rusça letterNotes.ts ile aynı format: her harf/diygraf için kısa fonetik
// not. 26 harf + 6 diygraf (TH, SH, CH, PH, WH, NG) = 32 harf konusu.
// ============================================================================

import type { Topic100Item } from '../../topics100/types';

/** 26 harf + 6 diygraf — İngilizce fonetik notları (Türkçe açıklamalı). */
export const EN_LETTER_INFO: { glyph: string; note: string }[] = [
  { glyph: 'A', note: 'İki yüzü var: kısa "e" (cat → KET) ve magic E ile "ey" (name → NEYM). Harfin adı "ey".' },
  { glyph: 'B', note: 'Türkçe "b" ile birebir: book → BUK. Sürpriz yok, güvenli harf.' },
  { glyph: 'C', note: 'Kendi sesi YOK: E/I/Y önünde "s" (city → SİTİ), başka yerde "k" (cat → KET).' },
  { glyph: 'D', note: 'Türkçe "d" gibi: door → DOR. Sondaki -ed eki ayrı okunur (t/d/ıd).' },
  { glyph: 'E', note: 'Kısa "e" (bed → BED); kelime sonunda çoğunlukla SESSİZ (make → MEYK). Harfin adı "ii".' },
  { glyph: 'F', note: 'Türkçe "f": fish → FİŞ. Alt diş üst dudağa değer.' },
  { glyph: 'G', note: 'İki yüzü var: sert "g" (go → GOU), E/I/Y önünde "c" gibi (page → PEYC).' },
  { glyph: 'H', note: 'Nefesli "h": hello → heLOU. Boğazdan değil, hafifçe üflenir.' },
  { glyph: 'I', note: 'Kapalı hecede kısa "i" (big → BİG); magic E ile "ay" (like → LAYK). Harfin adı "ay".' },
  { glyph: 'J', note: 'Türkçedeki "c" sesi: job → CAB. Rusçadaki "j" ile KARIŞTIRMA.' },
  { glyph: 'K', note: 'Türkçe "k": key → Kİİ. "kn-" başlangıcında SESSİZDİR (know → NOU).' },
  { glyph: 'L', note: 'Dil ucu diş dibine değer: live → LİV. Kelime sonunda koyu L (full → FUL).' },
  { glyph: 'M', note: 'Türkçe "m": mother → MADır. Dudaklar kapanır, ses burundan gelir.' },
  { glyph: 'N', note: 'Türkçe "n": name → NEYM. "ng" birleşince tek ses olur (sing → SİNG).' },
  { glyph: 'O', note: 'Kısa "a" gibi duyulur (hot → HAT); uzununca "ou" (go → GOU). Harfin adı "ou".' },
  { glyph: 'P', note: 'Nefesli "p": pen → PEN. Türkçedekinden daha bol nefeslidir.' },
  { glyph: 'Q', note: 'Hep U ile gezer: "qu" = "ku" (queen → KUİN). Tek başına neredeyse hiç yoktur.' },
  { glyph: 'R', note: 'Titremez! Dil ucu geriye kıvrılır: red → RED. Türkçe "r"den yumuşak.' },
  { glyph: 'S', note: 'Islık "s": sun → SAN. Sonda sesliden sonra "z" olur (dogs → DAGZ).' },
  { glyph: 'T', note: 'Nefesli "t": tea → Tİİ. Amerikan aksanında iki ünlü arası yumuşar (water → UORır).' },
  { glyph: 'U', note: 'Kısa "a" gibi (cup → KAP); "u_e" ile "yu" (cute → KYUUT). Harfin adı "yuu".' },
  { glyph: 'V', note: 'Üst dişler alt dudağa değer: very → VERİ. W ile karıştıran anlaşılmaz!' },
  { glyph: 'W', note: 'Dudaklar "u" gibi yuvarlanır: water → UO-tır. Dişler dudağa DEĞMEZ.' },
  { glyph: 'X', note: 'Hep "ks": box → BOKS. Kelime sonunda altı çizili sessiz gibi hızlı okunur.' },
  { glyph: 'Y', note: 'Ünsüz "y" (yes → YES); kelime sonunda ünlü olur (happy → HEPi).' },
  { glyph: 'Z', note: 'Vızıltılı "z": zoo → ZUU. İngilizcede "zed" (İngiltere) / "ziı" (ABD) adı vardır.' },
  { glyph: 'TH', note: 'İngilizcenin imzası! Dil ucu dişler arasına çıkar: sessiz θ (think) / sesli ð (this).' },
  { glyph: 'SH', note: 'İki harf TEK ses: "ş". shop → ŞOP, fish → FİŞ.' },
  { glyph: 'CH', note: 'İki harf TEK ses: "ç". chair → ÇEİR, kitchen → KİÇın.' },
  { glyph: 'PH', note: 'İki harf TEK ses: "f". phone → FOUN, photo → FOto. Yunanca köken kelimelerin imzası.' },
  { glyph: 'WH', note: 'Çoğunlukla "u" ile okunur: what → UOT, where → UER. Ama who → HU (w duyulmaz!)' },
  { glyph: 'NG', note: 'Tek ses "ng": sing → SİNG. G ayrıca söylenmez; dil arkada kapanır.' },
];

/**
 * İnce harf tamamlayıcıları — İngilizce müfredatta az geçen harfler
 * (Z, X, Q, J) için elle seçilmiş tamamlayıcı kelimeler.
 */
export const EN_THIN_LETTER_SUPPLEMENT: Record<string, Topic100Item[]> = {
  Z: [
    { ru: 'zero', reading: 'ZIROU', tr: 'sıfır', level: 'A1' },
    { ru: 'zoo', reading: 'ZUU', tr: 'hayvanat bahçesi', level: 'A1' },
    { ru: 'size', reading: 'SAYZ', tr: 'beden, boyut', level: 'A2' },
    { ru: 'amazing', reading: 'eMEYzing', tr: 'şaşırtıcı', level: 'B1' },
    { ru: 'citizen', reading: 'SITızın', tr: 'vatandaş', level: 'B1' },
    { ru: 'organize', reading: 'ORgınayz', tr: 'organize etmek', level: 'B1' },
    { ru: 'horizon', reading: 'hoRAYzın', tr: 'ufuk', level: 'B2' },
    { ru: 'emphasize', reading: 'EMfısıyz', tr: 'vurgulamak', level: 'B2' },
  ],
  X: [
    { ru: 'box', reading: 'BOKS', tr: 'kutu', level: 'A1' },
    { ru: 'six', reading: 'SİKS', tr: 'altı', level: 'A1' },
    { ru: 'taxi', reading: 'TEKSİ', tr: 'taksi', level: 'A1' },
    { ru: 'extra', reading: 'EKstrı', tr: 'ekstra', level: 'A2' },
    { ru: 'exercise', reading: 'EKsırsayz', tr: 'egzersiz', level: 'A2' },
    { ru: 'example', reading: 'igZEMPıl', tr: 'örnek', level: 'A1' },
    { ru: 'exactly', reading: 'igZEKTli', tr: 'tam olarak', level: 'B1' },
    { ru: 'anxious', reading: 'ENGşıs', tr: 'endişeli', level: 'B2' },
  ],
  Q: [
    { ru: 'queen', reading: 'KUİN', tr: 'kraliçe', level: 'A1' },
    { ru: 'quick', reading: 'KUİK', tr: 'hızlı', level: 'A1' },
    { ru: 'quiet', reading: 'KUAYıt', tr: 'sessiz', level: 'A1' },
    { ru: 'question', reading: 'KUESçın', tr: 'soru', level: 'A1' },
    { ru: 'quality', reading: 'KUOLıti', tr: 'kalite', level: 'B1' },
    { ru: 'quantity', reading: 'KUONtıti', tr: 'miktar', level: 'B1' },
    { ru: 'quotation', reading: 'kuOUTEYşın', tr: 'alıntı', level: 'B2' },
    { ru: 'consequence', reading: 'KONsıkUENS', tr: 'sonuç', level: 'B2' },
  ],
  J: [
    { ru: 'job', reading: 'CAB', tr: 'iş', level: 'A1' },
    { ru: 'juice', reading: 'CUUS', tr: 'meyve suyu', level: 'A1' },
    { ru: 'January', reading: 'CANyuweri', tr: 'ocak', level: 'A1' },
    { ru: 'enjoy', reading: 'inCOY', tr: 'keyfini çıkarmak', level: 'A2' },
    { ru: 'journey', reading: 'CÖRni', tr: 'yolculuk', level: 'B1' },
    { ru: 'justice', reading: 'CASTıs', tr: 'adalet', level: 'B2' },
    { ru: 'majority', reading: 'meCORıti', tr: 'çoğunluk', level: 'B2' },
    { ru: 'prejudice', reading: 'PREcidis', tr: 'önyargı', level: 'C1' },
  ],
  PH: [
    { ru: 'photo', reading: 'FOtou', tr: 'fotoğraf', level: 'A1' },
    { ru: 'phrase', reading: 'FREYZ', tr: 'ifade, kalıp', level: 'B1' },
    { ru: 'graph', reading: 'GRAF', tr: 'grafik', level: 'B1' },
    { ru: 'trophy', reading: 'TROUfi', tr: 'kupa, ödül', level: 'B1' },
    { ru: 'physical', reading: 'Fİzikıl', tr: 'fiziksel', level: 'B2' },
    { ru: 'pharmacy', reading: 'FARmısi', tr: 'eczane', level: 'B1' },
    { ru: 'philosophy', reading: 'fiLOSOfi', tr: 'felsefe', level: 'B2' },
    { ru: 'paragraph', reading: 'PERıgraf', tr: 'paragraf', level: 'B2' },
  ],
  WH: [
    { ru: 'what', reading: 'UOT', tr: 'ne', level: 'A1' },
    { ru: 'when', reading: 'UEN', tr: 'ne zaman', level: 'A1' },
    { ru: 'where', reading: 'UER', tr: 'nerede', level: 'A1' },
    { ru: 'white', reading: 'UAYT', tr: 'beyaz', level: 'A1' },
    { ru: 'why', reading: 'UAY', tr: 'neden', level: 'A1' },
    { ru: 'while', reading: 'UAYL', tr: 'iken', level: 'A2' },
    { ru: 'somewhere', reading: 'SAMUER', tr: 'bir yerde', level: 'B1' },
    { ru: 'anywhere', reading: 'ENIUER', tr: 'herhangi bir yerde', level: 'B1' },
  ],
  V: [
    { ru: 'very', reading: 'VERİ', tr: 'çok', level: 'A1' },
    { ru: 'video', reading: 'VİDİOU', tr: 'video', level: 'A1' },
    { ru: 'travel', reading: 'TREvıl', tr: 'seyahat', level: 'A2' },
    { ru: 'voice', reading: 'VOYS', tr: 'ses', level: 'B1' },
    { ru: 'university', reading: 'yunİVERsıti', tr: 'üniversite', level: 'A2' },
    { ru: 'adventure', reading: 'edVENçır', tr: 'macera', level: 'B1' },
    { ru: 'invest', reading: 'inVEST', tr: 'yatırım yapmak', level: 'B2' },
    { ru: 'creative', reading: 'kriEYtıv', tr: 'yaratıcı', level: 'B2' },
  ],
};

/** İngilizce hece pratiği konuları (fonetik bölümünün ilk 2 konusu). */
export const EN_SYLLABLE_TOPICS: {
  icon: string;
  titleRu: string;
  titleTr: string;
  descTr: string;
  items: { ru: string; reading: string; tr: string }[];
}[] = [
  {
    icon: '🔤',
    titleRu: 'Short vowels: a, e, i, o, u',
    titleTr: 'Kısa Ünlü Sesler',
    descTr: 'İngilizcenin 5 kısa ünlüsü harf adlarından TAMAMEN farklıdır: a→"e", e→"e", i→"i", o→"a", u→"a". Bu 5 sesi kulağına kazımadan hiçbir kelime doğru okunamaz.',
    items: [
      { ru: 'cat', reading: 'KET', tr: 'kısa a → "e" gibi' },
      { ru: 'bed', reading: 'BED', tr: 'kısa e → "e"' },
      { ru: 'sit', reading: 'SİT', tr: 'kısa i → "i"' },
      { ru: 'hot', reading: 'HAT', tr: 'kısa o → "a" gibi' },
      { ru: 'cup', reading: 'KAP', tr: 'kısa u → "a" gibi' },
    ],
  },
  {
    icon: '🎵',
    titleRu: 'Syllables: ma, pa, ta, ka',
    titleTr: 'Ünsüz + Ünlü Heceler',
    descTr: 'Temel heceleri (ma, pa, ta, ka, sa, ra, ba, da) İngilizce vurgusuyla dinle — İngilizce heceler Türkçeden daha "yumuşak" ve akan bir ritim taşır.',
    items: [
      { ru: 'ma', reading: 'MA', tr: 'hece "ma" — mother' },
      { ru: 'pa', reading: 'PA', tr: 'hece "pa" — paper' },
      { ru: 'ta', reading: 'TA', tr: 'hece "ta" — table' },
      { ru: 'ka', reading: 'KA', tr: 'hece "ka" — kitchen' },
      { ru: 'sa', reading: 'SA', tr: 'hece "sa" — sunny' },
      { ru: 'ra', reading: 'RA', tr: 'hece "ra" — rain (r titremez!)' },
      { ru: 'ba', reading: 'BA', tr: 'hece "ba" — banana' },
      { ru: 'da', reading: 'DA', tr: 'hece "da" — dancing' },
    ],
  },
];
