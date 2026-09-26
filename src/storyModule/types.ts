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

/**
 * Hikaye türü:
 *  - 'checkpoint' : her 10 müfredat ünitesinin sonunda açılan KONTROL NOKTASI hikayesi
 *                   (isteğe bağlı — istediğin skolla tamamlanabilir, sonraki üniteyi kilitlemez).
 *  - 'levelFinal' : BÖLÜM (seviye) FİNALİ — A1/A2/B1/B2/C1 sonlarında açılır. Özetin
 *                   TAMAMEN doğru yazılması + Seviye Tekrar Sınavı'ndan geçmek gerekir;
 *                   tamamlanmadan SONRAKİ BÖLÜMÜN üniteleri açılmaz (kapı mekanizması).
 */
export type StoryKind = 'checkpoint' | 'levelFinal';

/** 10'ar ünitelik kontrol noktası hikayesi / bölüm finali. */
export interface CheckpointStory {
  id: string;         // 'story_cp1' / 'story_lf_a2' ...
  kind: StoryKind;    // kontrol noktası mı bölüm finali mi
  checkpoint: number | null; // 1..8 (yalnız 'checkpoint' türünde; bölüm finallerinde null)
  unitFrom: number;   // kapsanan ilk ünite
  unitTo: number;     // kapsanan son ünite (tamamlandığında hikaye açılır)
  levelId?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2';  // bölüm finali: hangi bölümün finali
  nextLevelId?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2'; // bölüm finali: tamamlayınca açılan bölüm (kapı)
  titleRu: string;
  titleTr: string;
  framingTr: string;  // HIMYM / Кухня tarzı çerçeve anlatımı (Türkçe kurgu notu)
  icon: string;
  color: string;
  banner?: string;    // AI ile üretilmiş sahne görseli (public/ altında yol) — isteğe bağlı
  searchQuery?: string; // "Bu tarz sahneyi izle" YouTube arama sorgusu (gerçek sahne kesitleri)
  paragraphs: StoryLine[];
  newWords: StoryNewWord[];   // maksimum 5-6 yeni kelime
  keyPoints: StoryKeyPoint[]; // özet analizinin ana fikirleri
  misleading: StoryMislead[]; // yanlış anlama dedektörleri
  recycleWords?: { ru: string; tr: string; from: string }[]; // önceki bölümlerden tekrar edilen kelimeler (kalıcı öğrenme)
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
