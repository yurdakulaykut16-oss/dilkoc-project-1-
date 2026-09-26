// ============================================================================
// HİKAYE MODÜLÜ — TİPLER (Story & Summary Feature)
// ----------------------------------------------------------------------------
// Kullanıcı her 10 müfredat ünitesini (kelime/cümle içerikli) tamamladığında
// açılan "kontrol noktası hikayesi"nin veri modeli:
//   • Hikaye, son 10 ünitede öğrenilen kelimelerle kurulur.
//   • İçinde en fazla 5-6 YENİ kelime bulunur; anlamları sözlük kartı olarak
//     hikayenin altında gösterilir.
//   • Kullanıcı Rusça metni okur, Türkçe özetini yazar; analiz motoru
//     (summaryEvaluation.ts) özeti ana fikirlerle karşılaştırıp yapıcı geri
//     bildirim üretir.
// ============================================================================

/** Hikayedeki bir satır: anlatıcı anlatımı ya da karakter repliği. */
export interface StoryLine {
  speaker: string;   // 'Anlatıcı (2035)' | 'Дима' | 'Тёма' | ...
  ru: string;        // Rusça metin
  reading: string;   // Latin harflerle okunuş
  tr: string;        // Türkçe karşılık (özet yazılmadan önce gizli tutulur)
  narrator?: boolean; // true ise anlatıcı satırı (farklı stille gösterilir)
}

/** Hikayede ilk kez karşılaşılan yeni kelime — sözlük kartı olarak listelenir. */
export interface StoryNewWord {
  ru: string;
  reading: string;
  tr: string;
  note: string; // kullanım notu
}

/**
 * Özet analizinde kullanılan "ana fikir" (key point).
 * Bir ana fikir yakalanmış sayılması için her kelime grubundan (keywordGroups)
 * en az BİR kelimenin özette geçmesi gerekir. Gruplar ana fikrin bileşenlerini
 * temsil eder; eş anlamlılar (senler) aynı grupta toplanır.
 */
export interface StoryKeyPoint {
  id: string;
  textTr: string;           // ana fikrin Türkçe açıklaması (geri bildirimde gösterilir)
  hintTr: string;           // kaçırıldığında verilecek ipucu (cevabı ifşa etmez)
  keywordGroups: string[][]; // eş anlamlı kelime grupları (küçük harf, Türkçe)
}

/** Özette geçerse "yanlış anlaşılmış" sayılan kalıplar (mümkün olduğunca seçici yazılır). */
export interface StoryMislead {
  tokens: string[]; // özet metninde bu dizilerden biri geçerse uyarı çıkar
  noteTr: string;   // düzeltme / yapıcı açıklama
}

/** 10'ar ünitelik kontrol noktası hikayesi. */
export interface CheckpointStory {
  id: string;         // 'story_cp1' ...
  checkpoint: number; // 1..N (her 10 ünitede bir)
  unitFrom: number;   // kapsanan ilk ünite (10k-9)
  unitTo: number;     // kapsanan son ünite (10k)
  titleRu: string;
  titleTr: string;
  framingTr: string;  // HIMYM tarzı çerçeve anlatımı (Türkçe kurgu notu)
  icon: string;
  color: string;
  paragraphs: StoryLine[];
  newWords: StoryNewWord[];   // maksimum 5-6 yeni kelime
  keyPoints: StoryKeyPoint[]; // özet analizinin ana fikirleri
  misleading: StoryMislead[]; // yanlış anlama dedektörleri
}

/** Özet analizinin sonucu — App.tsx bu yapıyı ekrana basar. */
export interface SummaryEvaluation {
  wordCount: number;
  tooShort: boolean;       // özet çok kısa (en az ~10 kelime beklenir)
  wrongLanguage: boolean;  // özet ağırlıklı Kiril alfabetinde yazılmış
  matched: { id: string; textTr: string }[];          // yakalanan doğru noktalar
  missing: { id: string; hintTr: string }[];          // eksik noktalar (ipuçlarıyla)
  misunderstood: { noteTr: string }[];                // yanlış anlaşılan yerler
  correctCount: number;    // X
  issueCount: number;      // Y (eksik + yanlış anlaşılan)
  scorePercent: number;
  title: string;           // geri bildirim başlığı (HIMYM aromalı)
  message: string;         // yapıcı ana mesaj
  tips: string[];          // gelişim önerileri
}
