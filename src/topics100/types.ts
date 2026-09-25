// ============================================================================
// 100 KONU — TİP TANIMLARI (Faz 2: müfredata bağlı)
// ----------------------------------------------------------------------------
// ÖNEMLİ: Her konu, müfredat üniteleriyle BİREBİR aynı veri formatını kullanır:
//   - items     => kelime kartları  (WordDetail karşılığı: ru/reading/tr)
//   - sentences => cümleler        (UnitModule.sentences karşılığı)
//   - dialogue  => diyalog/sahne   (UnitModule.dialogue karşılığı)
// Böylece A1-C2 üniteleriyle "aynı mimari, aynı akış, sadece zorluk artar".
// unitId alanı konunun örneklerinin hangi ünitelerden geldiğini kaydeder.
// ============================================================================

export type Topic100Cat = 'harf' | 'fonetik' | 'mufredat';

export type CefrTag = 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2';

/** Kelime kartı — ünite WordDetail yapısıyla aynı alanlar + kaynak. */
export interface Topic100Item {
  ru: string;
  reading: string;
  tr: string;
  /** Örnek hangi üniteye ait (müfredat bağlantısı). */
  unitId?: string;
  /** Örnek kelimenin CEFR etiketi. */
  level?: CefrTag;
}

/** Cümle — ünite sentences yapısıyla aynı alanlar + kaynak. */
export interface Topic100Sentence {
  ru: string;
  tr: string;
  unitId?: string;
  level?: CefrTag;
}

/** Diyalog satırı — ünite DialogueLine yapısıyla aynı alanlar + kaynak. */
export interface Topic100Line {
  speaker: string;
  ru: string;
  reading: string;
  tr: string;
  unitId?: string;
  level?: CefrTag;
}

export interface Topic100 {
  id: string;
  num: number;
  cat: Topic100Cat;
  icon: string;
  titleRu?: string;
  titleTr: string;
  descTr: string;
  /** Harf konuları için büyük harf (А). */
  letterGlyph?: string;
  /** Müfredat konuları için ilgili ünite. */
  unitId?: string;
  /** Müfredat konuları için ünite seviyesi. */
  levelGroup?: CefrTag;
  items: Topic100Item[];
  sentences: Topic100Sentence[];
  dialogue: Topic100Line[];
}

/** Soru: word = kelime eşleştirme, letter = harf sesi, mixed = karışık tekrar. */
export interface Topic100Question {
  type: 'word' | 'letter' | 'mixed';
  prompt: string;
  answer: string;
  options: string[];
  /** TTS ile okunacak metin. */
  audio: string;
  hint: string;
}
