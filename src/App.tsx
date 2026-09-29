import { TextToSpeech } from '@capacitor-community/text-to-speech';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import AiTutor from './components/AiTutor';
// 🔥 GERÇEK SERİ TAKİBİ: XP kazanılan günler sayılır, gün atlanırsa seri sıfırlanır
import { effectiveStreak, loadStats, recordXpGain, todayStr } from './statsStore';

// MICROSOFT EDGE TTS: Rusça = ru-RU-Svetlana/DmitryNeural, Türkçe = tr-TR-Emel/AhmetNeural.
// Dinleme ekranlarındaki hız düğmesi perde korumalı (preservesPitch) çalışır — kelime bozulmaz.
import { edgeSpeak, getVoicePrefs, stopEdgeSpeech } from './tts/edgeTts';
// ÖĞRENEN MODELİ: çözülen sorulardan zaman/edat eksik haritası + kişisel rota
import { recordWordResult, recordSkill, recordSentenceResult, skillKeyForGrammarUnit, resetLearner } from './learnerModel';
// ANLAMSAL FARK ANALİZİ: cümle egzersizlerinde "doğru/yanlış" yerine anlam farkı raporu
import { analyzeSentenceDiff } from './semanticFeedback';
import type { SentenceAnalysis } from './semanticFeedback';
import LearningRoute from './components/LearningRoute';
import WordGraph3D from './components/WordGraph3D';
import type { RescueTarget } from './components/WordGraph3D';
import RescueTest from './components/RescueTest';
import type { RescueResult } from './components/RescueTest';
import CoachShorts from './components/CoachShorts';
// ⚡ ULTRA PAKET: deneme sınavları + kart evi + ultra zorluk modu
import MockExamScreen from './components/MockExamScreen';
import FlashcardArena from './components/FlashcardArena';
// 🗣️ AĞIZ JİMNASTİĞİ: günlük hız odaklı konuşma ödevi (tekerleme + kelime/cümle zinciri)
import SpeechGym from './components/SpeechGym';
import { buildDailyDrills, loadSpeechDay } from './speech/dailyDrills';
import { isUltraMode, setUltraMode, subscribeUltra, storyPassRatio, topicPassPct, gatePassNeed, retentionDose, srsIntervalFor, xpGain } from './ultra/ultraMode';
import { clearExamAttempts } from './ultra/examStore';
import { TOPICS_100, TOPICS_100_TOTAL, topicCatInfo, buildTopicDrills, topicFullText, LEVELS, topicSourceUnits, sourceUnitInfo } from './topics100';
import type { Topic100, Topic100Question, CefrTag } from './topics100';

// HİKAYE MODÜLÜ (Story & Summary): her 10 ünitede bir açılan kontrol noktası hikayeleri
// + Türkçe özet analiz motoru. Tüm mantık src/storyModule içinde modüler tutulur.
import { STORIES, STORY_CAST, storyTriggeredAtUnit, gateStoryForUnitNumber, isStoryUnlocked, nextPendingStory, evaluateTurkishSummary } from './storyModule';
import type { CheckpointStory, SummaryEvaluation } from './storyModule';

// Seviye renkleri (tek yol kartlarındaki seviye etiketlerinde ortak kullanılır)
const LEVEL_COLORS: Record<CefrTag, string> = {
  A1: '#10b981',
  A2: '#38bdf8',
  B1: '#f59e0b',
  B2: '#f43f5e',
  'C1/C2': '#a78bfa',
};

import { ALPHABET_LESSONS_EXTRA } from './alphabetExtra';
import { ALPHABET_LESSONS_EXTRA2 } from './alphabetExtra2';
import { UNITS_DATA, ALL_WORDS, ALL_SENTENCES } from './curriculumData';
import { GRAMMAR_FOUNDATION_UNITS } from './grammarFoundationData';
import type { WordDetail, DialogueLine, SmesharikiQuestion, SmesharikiScene, UnitModule } from './curriculumData';
// Dışarıdan bu isimleri App'ten alan kodlar için geriye uyum re-export'ları:
export { UNITS_DATA, ALL_WORDS, ALL_SENTENCES };
export type { WordDetail, DialogueLine, SmesharikiQuestion, SmesharikiScene, UnitModule };

// ==========================================
// 1. VERİ MODELLERİ & TİPLER
// ==========================================

// ==========================================
// 2. SADE HARF KARTLARI — Kalıcı öğrenme için minimalist yapı:
//    HARF → SES İPUCU → NET FONETİK KURAL → 1-2 TEMEL ÖRNEK KELİME.
//    (Uzun açıklamalar ve yoğun metinler bilerek kaldırıldı.)
// ==========================================

export interface AlphabetLetter {
  id: string;
  upper: string;
  lower: string;
  translit: string;      // Kısa ses kodu: "A", "O / A"
  soundHint: string;     // Kısa ses ipucu (tek satır, kafa karıştırmaz)
  phoneticRule: string;  // Net ve tek cümlelik fonetik kural
  examples: { ru: string; reading: string; tr: string }[]; // 1-2 temel örnek kelime
}


// ==========================================
// 2. HARF DERSLERİ & FONETİK (Tüm Kiril Alfabesi - 33 Harf, 8 Ünite)
// ==========================================

export interface ReadingDrill {
  word: string;
  correct: string;
  distractors: string[];
  tr: string;
}

export const ALPHABET_LESSONS: { id: string; title: string; subtitle: string; letters: AlphabetLetter[]; readingDrills: ReadingDrill[] }[] = [
  {
    id: 'alpha_1',
    title: 'Temel Sesler',
    subtitle: 'А, О, К, М + akanje kuralı (О → A)',
    letters: [
      { id: 'a', upper: 'А', lower: 'а', translit: "A", soundHint: "Türkçedeki net A gibi", phoneticRule: "Vurgulu ya da vurgusuz, hep net A okunur.", examples: [{ ru: "АПТЕКА", reading: "Aptéka", tr: "Eczane" }, { ru: "МАМА", reading: "Máma", tr: "Anne" }] },
      { id: 'o', upper: 'О', lower: 'о', translit: "O / A", soundHint: "Vurguluyken O, vurgusuzken A", phoneticRule: "Vurguluysa O, vurgusuzsa A okunur (akanje kuralı).", examples: [{ ru: "ОКНО", reading: "Aknó", tr: "Pencere" }, { ru: "ДОМ", reading: "Dom", tr: "Ev" }] },
      { id: 'k', upper: 'К', lower: 'к', translit: "K", soundHint: "Sert K sesi", phoneticRule: "Türkçedeki K ile birebir aynıdır.", examples: [{ ru: "КАФЕ", reading: "Kafé", tr: "Kafe" }, { ru: "КНИГА", reading: "Kníga", tr: "Kitap" }] },
      { id: 'm', upper: 'М', lower: 'м', translit: "M", soundHint: "Dudak M sesi", phoneticRule: "Türkçedeki M ile birebir aynıdır.", examples: [{ ru: "МОСКВА", reading: "Maskvá", tr: "Moskova" }, { ru: "МОРЕ", reading: "Mórye", tr: "Deniz" }] },
    ],
    readingDrills: [
      { word: 'мама', correct: 'Máma', distractors: ['Mamá', 'Momo', 'Amam'], tr: 'Anne' },
      { word: 'как', correct: 'Kak', distractors: ['Koka', 'Aka', 'Kaka'], tr: 'Nasıl' },
      { word: 'мак', correct: 'Mak', distractors: ['Maka', 'Mok', 'Kam'], tr: 'Gelincik (çiçek)' },
      { word: 'кора', correct: 'Korá', distractors: ['Kóra', 'Kara', 'Rako'], tr: 'Kabuk (ağaç)' },
      { word: 'мороз', correct: 'Marós', distractors: ['Moroz', 'Maros', 'Romaz'], tr: 'Don / Ayaz' }
    ]
  },
  {
    id: 'alpha_2',
    title: 'Yalancı Dostlar',
    subtitle: 'Latin gibi görünen В, Р, Е + ikanje (Е → İ)',
    letters: [
      { id: 'v', upper: 'В', lower: 'в', translit: "V", soundHint: "B görünümlü ama V okunur", phoneticRule: "Her zaman V okunur; alt dudak üst dişlere değer.", examples: [{ ru: "ВОДА", reading: "Vadá", tr: "Su" }, { ru: "ВРАЧ", reading: "Vrach", tr: "Doktor" }] },
      { id: 'r', upper: 'Р', lower: 'р', translit: "R", soundHint: "P görünümlü ama R okunur", phoneticRule: "Dil damakta titreyen güçlü R sesidir.", examples: [{ ru: "РАБОТА", reading: "Rabóta", tr: "İş" }, { ru: "РУКА", reading: "Ruká", tr: "El" }] },
      { id: 'e', upper: 'Е', lower: 'е', translit: "E / İ", soundHint: "Vurguluyken E, vurgusuzken İ", phoneticRule: "Vurgulu yerde E, vurgusuz yerde İ sesine kayar (ikanje kuralı).", examples: [{ ru: "МЕТРО", reading: "Mitró", tr: "Metro" }, { ru: "ЕДА", reading: "Yedá", tr: "Yemek" }] },
    ],
    readingDrills: [
      { word: 'море', correct: 'Mórye', distractors: ['Moré', 'Mero', 'Ormé'], tr: 'Deniz' },
      { word: 'вера', correct: 'Véra', distractors: ['Vyera', 'Erva', 'Ravye'], tr: 'İman / İsim' },
      { word: 'рак', correct: 'Rak', distractors: ['Raka', 'Kar', 'Ark'], tr: 'Yengeç' },
      { word: 'ветер', correct: 'Vyétyer', distractors: ['Veter', 'Vitér', 'Tever'], tr: 'Rüzgar' },
      { word: 'нерв', correct: 'Nyerv', distractors: ['Nerv', 'Nirev', 'Verne'], tr: 'Sinir' }
    ]
  },
  {
    id: 'alpha_3',
    title: 'Patlamalı Ünsüzler',
    subtitle: 'Б, Д, Г, П, Т + sonda sedasızlaşma',
    letters: [
      { id: 'b', upper: 'Б', lower: 'б', translit: "B / P", soundHint: "Dudak patlamalı B", phoneticRule: "Kelime sonunda P sesine döner: хлеб → khlep.", examples: [{ ru: "БАНК", reading: "Bank", tr: "Banka" }, { ru: "ХЛЕБ", reading: "Khlep", tr: "Ekmek" }] },
      { id: 'd', upper: 'Д', lower: 'д', translit: "D / T", soundHint: "Net D sesi", phoneticRule: "Kelime sonunda T sesine döner: город → górat.", examples: [{ ru: "ДОМ", reading: "Dom", tr: "Ev" }, { ru: "ГОРОД", reading: "Górat", tr: "Şehir" }] },
      { id: 'g', upper: 'Г', lower: 'г', translit: "G / K", soundHint: "Sert G sesi", phoneticRule: "Kelime sonunda K sesine döner: друг → druk. (его kelimesinde istisna olarak V okunur)", examples: [{ ru: "ГОД", reading: "Gót", tr: "Yıl" }, { ru: "ГОЛОВА", reading: "Galavá", tr: "Baş" }] },
      { id: 'p', upper: 'П', lower: 'п', translit: "P", soundHint: "Nefessiz P sesi", phoneticRule: "Her zaman net P okunur.", examples: [{ ru: "ПАРК", reading: "Park", tr: "Park" }, { ru: "ПАПА", reading: "Pápa", tr: "Baba" }] },
      { id: 't', upper: 'Т', lower: 'т', translit: "T", soundHint: "Net T sesi", phoneticRule: "Türkçedeki T ile birebir aynıdır.", examples: [{ ru: "ТАКСИ", reading: "Taksí", tr: "Taksi" }, { ru: "ТАМ", reading: "Tam", tr: "Orada" }] },
    ],
    readingDrills: [
      { word: 'город', correct: 'Górat', distractors: ['Gorod', 'Garod', 'Gorat'], tr: 'Şehir' },
      { word: 'погода', correct: 'Pagóda', distractors: ['Pogoda', 'Pagoda', 'Pogodá'], tr: 'Hava Durumu' },
      { word: 'работа', correct: 'Rabóta', distractors: ['Robota', 'Rabota', 'Ravota'], tr: 'İş' },
      { word: 'обед', correct: 'Abyét', distractors: ['Obed', 'Abed', 'Obyet'], tr: 'Öğle yemeği' },
      { word: 'подарок', correct: 'Padárak', distractors: ['Podarok', 'Padarak', 'Padórok'], tr: 'Hediye' }
    ]
  },
  {
    id: 'alpha_4',
    title: 'Akıcı Ünsüzler',
    subtitle: 'Н, Л, С, Ф, Х, У',
    letters: [
      { id: 'n', upper: 'Н', lower: 'н', translit: "N", soundHint: "Diş arkası N", phoneticRule: "Türkçedeki N ile birebir aynıdır.", examples: [{ ru: "НЕТ", reading: "Nyet", tr: "Hayır" }, { ru: "НОЧЬ", reading: "Noch'", tr: "Gece" }] },
      { id: 'l', upper: 'Л', lower: 'л', translit: "L", soundHint: "Kalın L sesi", phoneticRule: "Genelde kalın L okunur; E ve İ önünde yumuşar.", examples: [{ ru: "СТОЛ", reading: "Stol", tr: "Masa" }, { ru: "ЛЕТО", reading: "Léto", tr: "Yaz" }] },
      { id: 's', upper: 'С', lower: 'с', translit: "S", soundHint: "Sedasız S sesi", phoneticRule: "Her zaman S okunur, Z sesine dönüşmez.", examples: [{ ru: "СЫР", reading: "Syr", tr: "Peynir" }, { ru: "СУП", reading: "Sup", tr: "Çorba" }] },
      { id: 'f', upper: 'Ф', lower: 'ф', translit: "F", soundHint: "Dudak-diş F", phoneticRule: "Türkçedeki F ile birebir aynıdır.", examples: [{ ru: "ФИЛЬМ", reading: "Fil'm", tr: "Film" }, { ru: "ФОТО", reading: "Fóta", tr: "Fotoğraf" }] },
      { id: 'kh', upper: 'Х', lower: 'х', translit: "H (Kh)", soundHint: "Boğazdan kalın H", phoneticRule: "Boğazdan sürtünmeli kalın H sesi (Arapçadaki ح gibi).", examples: [{ ru: "ХОРОШО", reading: "Haraşó", tr: "İyi / Güzel" }, { ru: "ХОЛОД", reading: "Kholód", tr: "Soğuk" }] },
      { id: 'u', upper: 'У', lower: 'у', translit: "U", soundHint: "Net U sesi", phoneticRule: "Her zaman net U okunur, değişmez.", examples: [{ ru: "УТРО", reading: "Útra", tr: "Sabah" }, { ru: "УЛИЦА", reading: "Úlitsa", tr: "Sokak" }] },
    ],
    readingDrills: [
      { word: 'суп', correct: 'Sup', distractors: ['Sap', 'Sop', 'Sub'], tr: 'Çorba' },
      { word: 'стол', correct: 'Stol', distractors: ['Stal', 'Stul', 'Sotl'], tr: 'Masa' },
      { word: 'окно', correct: 'Aknó', distractors: ['Okno', 'Akno', 'Okná'], tr: 'Pencere' },
      { word: 'улица', correct: 'Úlitsa', distractors: ['Ulitsa', 'Olitsa', 'Ulitza'], tr: 'Sokak' },
      { word: 'холод', correct: 'Kholód', distractors: ['Holod', 'Kholad', 'Kolod'], tr: 'Soğuk' }
    ]
  },
  {
    id: 'alpha_5',
    title: 'Vızıltılı Ünsüzler',
    subtitle: 'Ж, З, Ц, Ч — dizilerde en sık duyulan sesler',
    letters: [
      { id: 'zh', upper: 'Ж', lower: 'ж', translit: "J (Zh)", soundHint: "Fransızca J gibi vızıltı", phoneticRule: "Her zaman sert vızıltılı J; sonda Ş sesine döner: муж → mush.", examples: [{ ru: "ЖЕНА", reading: "Zhená", tr: "Eş (kadın)" }, { ru: "ЖУРНАЛ", reading: "Zhurnál", tr: "Dergi" }] },
      { id: 'z', upper: 'З', lower: 'з', translit: "Z / S", soundHint: "Vızıltılı Z sesi", phoneticRule: "Kelime sonunda S sesine döner: глаз → glas.", examples: [{ ru: "ЗИМА", reading: "Zimá", tr: "Kış" }, { ru: "ЗАВТРА", reading: "Záfta", tr: "Yarın" }] },
      { id: 'ts', upper: 'Ц', lower: 'ц', translit: "Ts", soundHint: "T+S tek ses gibi", phoneticRule: "T ve S sesleri birleşik tek sesmiş gibi okunur; her zaman serttir.", examples: [{ ru: "ОТЕЦ", reading: "Atéts", tr: "Baba" }, { ru: "ЦЕНА", reading: "Tséná", tr: "Fiyat" }] },
      { id: 'ch', upper: 'Ч', lower: 'ч', translit: "Ç (Ch)", soundHint: "Yumuşak Ç sesi", phoneticRule: "Her zaman yumuşak Ç okunur, asla sertleşmez.", examples: [{ ru: "ЧАЙ", reading: "Chay", tr: "Çay" }, { ru: "ЧАС", reading: "Chas", tr: "Saat" }] },
    ],
    readingDrills: [
      { word: 'чай', correct: 'Chay', distractors: ['Tsay', 'Shay', 'Kay'], tr: 'Çay' },
      { word: 'зима', correct: 'Zimá', distractors: ['Zima', 'Sima', 'Zhima'], tr: 'Kış' },
      { word: 'отец', correct: 'Atéts', distractors: ['Otets', 'Atech', 'Odets'], tr: 'Baba' },
      { word: 'журнал', correct: 'Zhurnál', distractors: ['Jurnal', 'Zhurnal', 'Zurnál'], tr: 'Dergi' },
      { word: 'центр', correct: 'Tséntr', distractors: ['Sentr', 'Tsentr', ' Centr' ], tr: 'Merkez' }
    ]
  },
  {
    id: 'alpha_6',
    title: 'Islık Sesleri',
    subtitle: 'Ш, Щ, Й, И + sertlik-yumuşaklık ayrımı',
    letters: [
      { id: 'sh', upper: 'Ш', lower: 'ш', translit: "Ş (Sh)", soundHint: "Her zaman sert Ş", phoneticRule: "Sert Ş okunur; yanına İ gelse bile yumuşamaz.", examples: [{ ru: "ШКОЛА", reading: "Shkóla", tr: "Okul" }, { ru: "ШЕСТЬ", reading: "Shest'", tr: "Altı" }] },
      { id: 'shch', upper: 'Щ', lower: 'щ', translit: "ŞÇ (Shch)", soundHint: "Uzun yumuşak ŞÇ", phoneticRule: "Yumuşak ve uzatılmış ŞÇ okunur; Ш ile karıştırma.", examples: [{ ru: "БОРЩ", reading: "Borshch", tr: "Borş çorbası" }, { ru: "ЩЁТКА", reading: "Shchyótka", tr: "Fırça" }] },
      { id: 'y', upper: 'Й', lower: 'й', translit: "Y", soundHint: "Kısa Y sesi", phoneticRule: "Ünlüden sonra kısa bir Y sesi ekler: мой → moy.", examples: [{ ru: "МОЙ", reading: "Moy", tr: "Benim" }, { ru: "МУЗЕЙ", reading: "Muzéy", tr: "Müze" }] },
      { id: 'i', upper: 'И', lower: 'и', translit: "İ", soundHint: "Net İ sesi", phoneticRule: "Net İ okunur; önündeki ünsüzü yumuşatır.", examples: [{ ru: "ИГРА", reading: "Igrá", tr: "Oyun" }, { ru: "ИВАН", reading: "Ivan", tr: "İvan" }] },
    ],
    readingDrills: [
      { word: 'школа', correct: 'Shkóla', distractors: ['Skola', 'Shkolá', 'Chkola'], tr: 'Okul' },
      { word: 'музей', correct: 'Muzéy', distractors: ['Muzei', 'Musey', 'Muzyey'], tr: 'Müze' },
      { word: 'борщ', correct: 'Borshch', distractors: ['Borsh', 'Borsk', 'Borts'], tr: 'Borş (Çorba)' },
      { word: 'шесть', correct: 'Shest\'', distractors: ['Shest', 'Sest\'', 'Shesht\''], tr: 'Altı' },
      { word: 'мой', correct: 'Moy', distractors: ['Moi', 'Myo', 'Om'], tr: 'Benim (eril)' }
    ]
  },
  {
    id: 'alpha_7',
    title: 'İyotlu Harfler',
    subtitle: 'Ё, Ю, Я — önceki ünsüzü yumuşatan sesler',
    letters: [
      { id: 'yo', upper: 'Ё', lower: 'ё', translit: "Yo", soundHint: "Her zaman vurgulu Yo", phoneticRule: "Hep Yo okunur ve daima vurguludur.", examples: [{ ru: "ЁЛКА", reading: "Yólka", tr: "Yılbaşı ağacı" }, { ru: "АКТЁР", reading: "Aktyór", tr: "Aktör" }] },
      { id: 'yu', upper: 'Ю', lower: 'ю', translit: "Yu", soundHint: "Yu sesi", phoneticRule: "Yu okunur; önündeki ünsüzü yumuşatır.", examples: [{ ru: "ЮБКА", reading: "Yúpka", tr: "Etek" }, { ru: "ЮГ", reading: "Yug", tr: "Güney" }] },
      { id: 'ya', upper: 'Я', lower: 'я', translit: "Ya", soundHint: "Ya sesi", phoneticRule: "Ya okunur; önündeki ünsüzü yumuşatır (я = ben).", examples: [{ ru: "Я", reading: "Ya", tr: "Ben" }, { ru: "ЯБЛОКО", reading: "Yáblaka", tr: "Elma" }] },
    ],
    readingDrills: [
      { word: 'ёлка', correct: 'Yólka', distractors: ['Yelka', 'Iolka', 'Olka'], tr: 'Yılbaşı Ağacı' },
      { word: 'юбка', correct: 'Yúpka', distractors: ['Yubka', 'Iubka', 'Yopka'], tr: 'Etek' },
      { word: 'пятница', correct: 'Pyátnitsa', distractors: ['Pyatnitsa', 'Patnitsa', 'Pitnitsa'], tr: 'Cuma' },
      { word: 'юг', correct: 'Yug', distractors: ['Yog', 'Ug', 'Uyg'], tr: 'Güney' },
      { word: 'язык', correct: 'Yazýk', distractors: ['Yazyk', 'Iazyk', 'Yazik'], tr: 'Dil' }
    ]
  },
  {
    id: 'alpha_8',
    title: 'Sessiz İşaretler',
    subtitle: 'Ъ, Ы, Ь, Э — Rusçaya özgü harfler',
    letters: [
      { id: 'hard', upper: 'Ъ', lower: 'ъ', translit: "(Sert İşaret)", soundHint: "Sesi yoktur", phoneticRule: "Ses vermez; sonraki Е/Ё/Ю/Я harfi ayrı hecede okunur.", examples: [{ ru: "ОБЪЕКТ", reading: "Ab-yékt", tr: "Nesne" }, { ru: "ПОДЪЕЗД", reading: "Pad-yézd", tr: "Apartman girişi" }] },
      { id: 'y2', upper: 'Ы', lower: 'ы', translit: "I", soundHint: "Kalın I sesi", phoneticRule: "Boğazdan gelen kalın I sesidir (Türkçedeki kalın ı gibi).", examples: [{ ru: "ТЫ", reading: "Ty", tr: "Sen" }, { ru: "МЫ", reading: "My", tr: "Biz" }] },
      { id: 'soft', upper: 'Ь', lower: 'ь', translit: "(Yumuşak İşaret)", soundHint: "Sesi yoktur", phoneticRule: "Ses vermez; önündeki ünsüzü yumuşatır: день → dyen'.", examples: [{ ru: "ДЕНЬ", reading: "Dyen'", tr: "Gün" }, { ru: "МАТЬ", reading: "Mat'", tr: "Anne" }] },
      { id: 'e2', upper: 'Э', lower: 'э', translit: "E", soundHint: "Kalın, net E", phoneticRule: "Önündeki ünsüzü yumuşatmaz; kalın ve net E okunur.", examples: [{ ru: "ЭТО", reading: "Éta", tr: "Bu" }, { ru: "ЭТАЖ", reading: "Etázh", tr: "Kat (bina)" }] },
    ],
    readingDrills: [
      { word: 'это', correct: 'Éta', distractors: ['Eto', 'Yeto', 'Ita'], tr: 'Bu' },
      { word: 'ты', correct: 'Ty', distractors: ['Ti', 'Tay', 'Tu'], tr: 'Sen' },
      { word: 'день', correct: "Dyen'", distractors: ['Den', 'Deny', 'Dyeny'], tr: 'Gün' },
      { word: 'мы', correct: 'My', distractors: ['Mi', 'Mu', 'Ma'], tr: 'Biz' },
      { word: 'сыр', correct: 'Syr', distractors: ['Sir', 'Sur', 'Sar'], tr: 'Peynir' }
    ]
  },
  {
    id: 'alpha_9',
    title: 'Vurgu Okulu',
    subtitle: 'Vurgusuz hecelerde sesler nasıl değişir? (akanje & ikanje pratiği)',
    letters: [
      { id: 'r9_o', upper: 'О', lower: 'о', translit: 'A (vurgusuz)', soundHint: 'Vurgusuz О her zaman A okunur', phoneticRule: 'Молоко → "Malakó": kelimedeki İKİ vurgusuz О da A sesine dönüştü, sadece vurgulu son hece O kaldı... o da yok, o da A değil O! Vurgu sondadır: ko hecesi net O okunur.', examples: [{ ru: 'МОЛОКО', reading: 'Malakó', tr: 'Süt' }, { ru: 'ХОРОШО', reading: 'Haraşó', tr: 'İyi / Güzel' }] },
      { id: 'r9_e', upper: 'Е', lower: 'е', translit: 'İ (vurgusuz)', soundHint: 'Vurgusuz Е zayıflar, İ gibi duyulur', phoneticRule: 'Телефон → "Tilifón": iki vurgusuz Е de İ sesine yaklaşır (ikanje kuralı).', examples: [{ ru: 'ТЕЛЕФОН', reading: 'Tilifón', tr: 'Telefon' }, { ru: 'СЕСТРА', reading: 'Sistrá', tr: 'Kız kardeş' }] },
      { id: 'r9_ya', upper: 'Я', lower: 'я', translit: 'Yİ (vurgusuz)', soundHint: 'Vurgusuz Я bile İ sesine kayar', phoneticRule: 'Язык → "Yizík": vurgusuz Я, YA değil Yİ gibi okunur.', examples: [{ ru: 'ЯЗЫК', reading: 'Yizík', tr: 'Dil (lisan)' }, { ru: 'ЯЙЦО', reading: 'Yiytsó', tr: 'Yumurta' }] },
    ],
    readingDrills: [
      { word: 'молоко', correct: 'Malakó', distractors: ['Moloko', 'Malóka', 'Mólaka'], tr: 'Süt' },
      { word: 'хорошо', correct: 'Haraşó', distractors: ['Horoşo', 'Haróşa', 'Hóraşa'], tr: 'İyi / Güzel' },
      { word: 'спасибо', correct: 'Spasíba', distractors: ['Spasibó', 'Spósiba', 'Spasíbo'], tr: 'Teşekkürler' },
      { word: 'погода', correct: 'Pagóda', distractors: ['Pogóda', 'Pagodá', 'Pógada'], tr: 'Hava durumu' },
      { word: 'голова', correct: 'Galavá', distractors: ['Golová', 'Gálava', 'Galóva'], tr: 'Kafa' },
      { word: 'дорога', correct: 'Daróga', distractors: ['Doróga', 'Darogá', 'Dóraga'], tr: 'Yol' },
      { word: 'собака', correct: 'Sabáka', distractors: ['Sobáka', 'Sabaká', 'Sóbaka'], tr: 'Köpek' },
      { word: 'окно', correct: 'Aknó', distractors: ['Oknó', 'Ákna', 'Okná'], tr: 'Pencere' }
    ]
  },
  {
    id: 'alpha_10',
    title: 'Sedasızlaşma Dojo',
    subtitle: 'Kelime sonundaki Б, В, Г, Д, Ж, З seslerini sertleştirme sanatı',
    letters: [
      { id: 'r10_b', upper: 'Б', lower: 'б (sonda)', translit: 'P (sonda)', soundHint: 'Kelime sonunda Б → P olur', phoneticRule: 'Хлеб → "Hlyep": sondaki Б sedasızlaşıp P okunur.', examples: [{ ru: 'ХЛЕБ', reading: 'Hlyep', tr: 'Ekmek' }, { ru: 'ЗУБ', reading: 'Zup', tr: 'Diş' }] },
      { id: 'r10_d', upper: 'Д', lower: 'д (sonda)', translit: 'T (sonda)', soundHint: 'Kelime sonunda Д → T olur', phoneticRule: 'Город → "Górat": sondaki Д sedasızlaşıp T okunur.', examples: [{ ru: 'ГОРОД', reading: 'Górat', tr: 'Şehir' }, { ru: 'САД', reading: 'Sat', tr: 'Bahçe' }] },
      { id: 'r10_v', upper: 'В', lower: 'в (sonda)', translit: 'F (sonda)', soundHint: 'Kelime sonunda ve sert ünsüz önünde В → F', phoneticRule: 'Любовь → "Lyubóf\'": sondaki ВЬ, F gibi okunur; Автобус → "Aftóbus": Т\'den önceki В de F olur.', examples: [{ ru: 'ЛЮБОВЬ', reading: "Lyubóf'", tr: 'Aşk' }, { ru: 'АВТОБУС', reading: 'Aftóbus', tr: 'Otobüs' }] },
      { id: 'r10_g', upper: 'Г', lower: 'г (sonda)', translit: 'K (sonda)', soundHint: 'Kelime sonunda Г → K olur', phoneticRule: 'Друг → "Druk": sondaki Г sedasızlaşıp K okunur.', examples: [{ ru: 'ДРУГ', reading: 'Druk', tr: 'Arkadaş' }, { ru: 'СНЕГ', reading: 'Snyek', tr: 'Kar' }] },
      { id: 'r10_zh', upper: 'Ж З', lower: 'ж з (sonda)', translit: 'Ş / S (sonda)', soundHint: 'Sonda Ж → Ş, З → S olur', phoneticRule: 'Нож → "Noş", Глаз → "Glas": vızıltılı sesler sonda ıslığa döner.', examples: [{ ru: 'НОЖ', reading: 'Noş', tr: 'Bıçak' }, { ru: 'ГЛАЗ', reading: 'Glas', tr: 'Göz' }] },
    ],
    readingDrills: [
      { word: 'хлеб', correct: 'Hlyep', distractors: ['Hlyeb', 'Hilep', 'Hleb'], tr: 'Ekmek' },
      { word: 'город', correct: 'Górat', distractors: ['Górad', 'Garót', 'Gorod'], tr: 'Şehir' },
      { word: 'друг', correct: 'Druk', distractors: ['Drug', 'Duruk', 'Drúga'], tr: 'Arkadaş' },
      { word: 'нож', correct: 'Noş', distractors: ['Noj', 'Nош', 'Nója'], tr: 'Bıçak' },
      { word: 'глаз', correct: 'Glas', distractors: ['Glaz', 'Gılas', 'Glása'], tr: 'Göz' },
      { word: 'снег', correct: 'Snyek', distractors: ['Snyeg', 'Sneg', 'Sinek'], tr: 'Kar' },
      { word: 'водка', correct: 'Vótka', distractors: ['Vódka', 'Vatká', 'Vodak'], tr: 'Votka' },
      { word: 'завтра', correct: 'Záftra', distractors: ['Závtra', 'Zaftará', 'Zavatra'], tr: 'Yarın' },
      { word: 'всё', correct: 'Fsyo', distractors: ['Vsyo', 'Fıse', 'Vise'], tr: 'Her şey' }
    ]
  },
  {
    id: 'alpha_11',
    title: 'Yumuşatma Atölyesi',
    subtitle: 'Ь işaretiyle biten kelimeleri gerçekten "ince" okuma pratiği',
    letters: [
      { id: 'r11_t', upper: 'ТЬ', lower: 'ть', translit: "T'", soundHint: 'İnce T — dilin ortası damağa yapışır', phoneticRule: 'Мать → "Mat\'": sert "mat" değil, T sesi incelerek biter.', examples: [{ ru: 'МАТЬ', reading: "Mat'", tr: 'Anne' }, { ru: 'ЖИТЬ', reading: "Jıt'", tr: 'Yaşamak' }] },
      { id: 'r11_n', upper: 'НЬ', lower: 'нь', translit: "N'", soundHint: 'İnce N — "ny" gibi ama tek ses', phoneticRule: 'День → "Dyen\'": N sesi yumuşayarak biter, "den" değil.', examples: [{ ru: 'ДЕНЬ', reading: "Dyen'", tr: 'Gün' }, { ru: 'ОСЕНЬ', reading: "Ósin'", tr: 'Sonbahar' }] },
      { id: 'r11_l', upper: 'ЛЬ', lower: 'ль', translit: "L'", soundHint: 'İnce L — Türkçe "gel" kelimesindeki L gibi', phoneticRule: 'Соль → "Sol\'": kalın Rus L\'si burada incelir.', examples: [{ ru: 'СОЛЬ', reading: "Sol'", tr: 'Tuz' }, { ru: 'МЕДАЛЬ', reading: "Midál'", tr: 'Madalya' }] },
      { id: 'r11_r', upper: 'РЬ', lower: 'рь', translit: "R'", soundHint: 'İnce, titrek R', phoneticRule: 'Дверь → "Dvyer\'": R titreşirken incelir.', examples: [{ ru: 'ДВЕРЬ', reading: "Dvyer'", tr: 'Kapı' }, { ru: 'ЦАРЬ', reading: "Tsar'", tr: 'Çar' }] },
    ],
    readingDrills: [
      { word: 'мать', correct: "Mat'", distractors: ['Mat', 'Matı', 'Máti'], tr: 'Anne' },
      { word: 'день', correct: "Dyen'", distractors: ['Den', 'Dyen', 'Déni'], tr: 'Gün' },
      { word: 'соль', correct: "Sol'", distractors: ['Sol', 'Solı', 'Sóli'], tr: 'Tuz' },
      { word: 'гость', correct: "Gost'", distractors: ['Gost', 'Gostı', 'Gósti'], tr: 'Misafir' },
      { word: 'дверь', correct: "Dvyer'", distractors: ['Dver', 'Dıver', 'Dvyera'], tr: 'Kapı' },
      { word: 'осень', correct: "Ósin'", distractors: ['Osen', 'Asén', 'Ósen'], tr: 'Sonbahar' },
      { word: 'семь', correct: "Syem'", distractors: ['Sem', 'Syem', 'Semi'], tr: 'Yedi' },
      { word: 'десять', correct: "Dyésit'", distractors: ['Desyat', 'Disyát', 'Dyesyat'], tr: 'On' },
      { word: 'любить', correct: "Lyubít'", distractors: ['Lyubit', 'Lubít', 'Lyúbit'], tr: 'Sevmek' }
    ]
  },
  {
    id: 'alpha_12',
    title: 'Hece Kuralları',
    subtitle: 'ЖИ-ШИ, ЧА-ЩА, ЧУ-ЩУ, ЦИ — Rus okullarında ezberletilen 4 altın hece',
    letters: [
      { id: 'r12_zhi', upper: 'ЖИ ШИ', lower: 'жи ши', translit: 'JI / ŞI', soundHint: 'И yazılır ama I okunur!', phoneticRule: 'Ж ve Ş HER ZAMAN serttir: Машина → "Maşína" derken ş\'den sonraki ses aslında kalın I\'dır.', examples: [{ ru: 'МАШИНА', reading: 'Maşína', tr: 'Araba' }, { ru: 'ЖИЗНЬ', reading: "Jızn'", tr: 'Hayat' }] },
      { id: 'r12_cha', upper: 'ЧА ЩА', lower: 'ча ща', translit: 'ÇA / ŞÇA', soundHint: 'Ч ve Щ her zaman yumuşaktır', phoneticRule: 'Я değil А yazılır: Чай → "Çay", Площадь → "Plóşşit\'".', examples: [{ ru: 'ЧАЙ', reading: 'Çay', tr: 'Çay' }, { ru: 'ПЛОЩАДЬ', reading: "Plóşşit'", tr: 'Meydan' }] },
      { id: 'r12_chu', upper: 'ЧУ ЩУ', lower: 'чу щу', translit: 'ÇU / ŞÇU', soundHint: 'Ю değil У yazılır', phoneticRule: 'Чудо → "Çúda", Щука → "Şşúka" — kural gereği hep У harfi kullanılır.', examples: [{ ru: 'ЧУДО', reading: 'Çúda', tr: 'Mucize' }, { ru: 'ЩУКА', reading: 'Şşúka', tr: 'Turna balığı' }] },
      { id: 'r12_tsi', upper: 'ЦИ', lower: 'ци', translit: 'TSI', soundHint: 'Ц her zaman serttir, И → I okunur', phoneticRule: 'Цирк → "Tsırk": И yazılsa da kalın I duyulur.', examples: [{ ru: 'ЦИРК', reading: 'Tsırk', tr: 'Sirk' }, { ru: 'ЦИФРА', reading: 'Tsıfra', tr: 'Rakam' }] },
    ],
    readingDrills: [
      { word: 'машина', correct: 'Maşína', distractors: ['Maşiná', 'Máşina', 'Mişána'], tr: 'Araba' },
      { word: 'жизнь', correct: "Jızn'", distractors: ['Jizn', 'Jízni', 'Zijn'], tr: 'Hayat' },
      { word: 'час', correct: 'Çyas', distractors: ['Ças', 'Çyás', 'Tsas'], tr: 'Saat (zaman dilimi)' },
      { word: 'чай', correct: 'Çay', distractors: ['Tsay', 'Şay', 'Çya'], tr: 'Çay' },
      { word: 'площадь', correct: "Plóşşit'", distractors: ['Ploşad', 'Plaşşát', 'Plóşad'], tr: 'Meydan' },
      { word: 'чудо', correct: 'Çúda', distractors: ['Çudó', 'Şúda', 'Tsúda'], tr: 'Mucize' },
      { word: 'щука', correct: 'Şşúka', distractors: ['Şuká', 'Çúka', 'Skúka'], tr: 'Turna balığı' },
      { word: 'цирк', correct: 'Tsırk', distractors: ['Tsirk', 'Sirk', 'Çırk'], tr: 'Sirk' }
    ]
  },
  {
    id: 'alpha_13',
    title: 'Sessiz Harf Avı',
    subtitle: 'Yazılan ama OKUNMAYAN harfler: солнце, сердце, здравствуйте...',
    letters: [
      { id: 'r13_l', upper: 'ЛНЦ', lower: 'лнц', translit: 'NTS (Л düşer)', soundHint: 'СОЛНЦЕ kelimesinde Л okunmaz', phoneticRule: 'Солнце → "Sóntse": ЛНЦ üçlüsünde Л sessizce kaybolur.', examples: [{ ru: 'СОЛНЦЕ', reading: 'Sóntse', tr: 'Güneş' }] },
      { id: 'r13_d', upper: 'РДЦ / ЗДН', lower: 'рдц / здн', translit: 'RTS / ZN (Д düşer)', soundHint: 'СЕРДЦЕ ve ПРАЗДНИК kelimelerinde Д okunmaz', phoneticRule: 'Сердце → "Syértse", Праздник → "Práznik": Д harfi iki ünsüz arasında düşer.', examples: [{ ru: 'СЕРДЦЕ', reading: 'Syértse', tr: 'Kalp' }, { ru: 'ПРАЗДНИК', reading: 'Práznik', tr: 'Bayram' }] },
      { id: 'r13_v', upper: 'ВСТВ', lower: 'вств', translit: 'STV (ilk В düşer)', soundHint: 'ЗДРАВСТВУЙТЕ ve ЧУВСТВО kelimelerinde ilk В okunmaz', phoneticRule: 'Здравствуйте → "Zdrástvuytye", Чувство → "Çústva": ВСТВ kümesindeki ilk В düşer.', examples: [{ ru: 'ЗДРАВСТВУЙТЕ', reading: 'Zdrástvuytye', tr: 'Merhaba (resmi)' }, { ru: 'ЧУВСТВО', reading: 'Çústva', tr: 'Duygu' }] },
      { id: 'r13_t', upper: 'СТН', lower: 'стн', translit: 'SN (Т düşer)', soundHint: 'ЛЕСТНИЦА kelimesinde Т okunmaz', phoneticRule: 'Лестница → "Lyésnitsa", Известный → "Izvyésnıy": СТН kümesinde Т düşer.', examples: [{ ru: 'ЛЕСТНИЦА', reading: 'Lyésnitsa', tr: 'Merdiven' }, { ru: 'ИЗВЕСТНЫЙ', reading: 'Izvyésnıy', tr: 'Ünlü / Bilinen' }] },
    ],
    readingDrills: [
      { word: 'солнце', correct: 'Sóntse', distractors: ['Sólntse', 'Salnısé', 'Sólnitse'], tr: 'Güneş' },
      { word: 'сердце', correct: 'Syértse', distractors: ['Syérdtse', 'Serdisé', 'Sirdtsé'], tr: 'Kalp' },
      { word: 'лестница', correct: 'Lyésnitsa', distractors: ['Lyéstnitsa', 'Listnítsa', 'Lesnitsá'], tr: 'Merdiven' },
      { word: 'чувство', correct: 'Çústva', distractors: ['Çúvstva', 'Çuvusto', 'Tsústva'], tr: 'Duygu' },
      { word: 'праздник', correct: 'Práznik', distractors: ['Prázdnik', 'Prazník', 'Pırazdnik'], tr: 'Bayram' },
      { word: 'поздно', correct: 'Pózna', distractors: ['Pózdna', 'Paznó', 'Pozıdno'], tr: 'Geç' },
      { word: 'счастье', correct: 'Şşástye', distractors: ['Sçastye', 'Şastyé', 'Sşásti'], tr: 'Mutluluk' },
      { word: 'известный', correct: 'Izvyésnıy', distractors: ['Izvyéstnıy', 'İzvestní', 'Izvisnói'], tr: 'Ünlü / Bilinen' }
    ]
  },
  {
    id: 'alpha_14',
    title: 'Gizli V Kuralı',
    subtitle: 'ЕГО/-ОГО ekleri "-YİVO/-OVA" okunur + -ТСЯ = -TSA',
    letters: [
      { id: 'r14_ego', upper: 'ЕГО', lower: 'его', translit: 'YİVÓ (Г → V!)', soundHint: 'Bu ekteki Г her zaman V okunur', phoneticRule: 'Его → "Yivó", Сегодня → "Sivódnya": tarihî bir istisna, Г burada V\'dir.', examples: [{ ru: 'ЕГО', reading: 'Yivó', tr: 'Onun / Onu' }, { ru: 'СЕГОДНЯ', reading: 'Sivódnya', tr: 'Bugün' }] },
      { id: 'r14_ogo', upper: '-ОГО', lower: '-ого', translit: '-OVA (Г → V!)', soundHint: 'Sıfat çekim eki -ого da V ile okunur', phoneticRule: 'Ничего → "Niçivó", Красного → "Krásnava": ek içindeki Г daima V.', examples: [{ ru: 'НИЧЕГО', reading: 'Niçivó', tr: 'Hiçbir şey' }, { ru: 'КРАСНОГО', reading: 'Krásnava', tr: 'Kırmızının' }] },
      { id: 'r14_tsya', upper: '-ТСЯ', lower: '-тся / -ться', translit: '-TSA', soundHint: 'İki yazım, TEK ses: uzun TS + A', phoneticRule: 'Нравится → "Nrávitsa", Учиться → "Uçítsa": -тся ve -ться aynı şekilde okunur.', examples: [{ ru: 'НРАВИТСЯ', reading: 'Nrávitsa', tr: 'Hoşa gidiyor' }, { ru: 'УЧИТЬСЯ', reading: 'Uçítsa', tr: 'Okumak / Öğrenim görmek' }] },
    ],
    readingDrills: [
      { word: 'его', correct: 'Yivó', distractors: ['Yegó', 'Égo', 'Yigó'], tr: 'Onun / Onu' },
      { word: 'сегодня', correct: 'Sivódnya', distractors: ['Segódnya', 'Sigadnyá', 'Sevódna'], tr: 'Bugün' },
      { word: 'ничего', correct: 'Niçivó', distractors: ['Niçegó', 'Níçego', 'Niçivá'], tr: 'Hiçbir şey' },
      { word: 'нравится', correct: 'Nrávitsa', distractors: ['Nrávitsya', 'Nravítsa', 'Narávitsa'], tr: 'Hoşa gidiyor' },
      { word: 'учится', correct: 'Úçitsa', distractors: ['Úçitsya', 'Uçítsa', 'Uçisyá'], tr: 'Ders çalışıyor / Okuyor' },
      { word: 'красного', correct: 'Krásnava', distractors: ['Krásnogo', 'Krasnavá', 'Kırásnago'], tr: 'Kırmızının' },
      { word: 'русского', correct: 'Rúskava', distractors: ['Rússkogo', 'Ruskagó', 'Rúskogo'], tr: 'Rusçanın / Rus\'un' },
      { word: 'одного', correct: 'Adnavó', distractors: ['Odnogó', 'Ádnogo', 'Adnagá'], tr: 'Birinin' }
    ]
  },
  {
    id: 'alpha_15',
    title: 'Şehir Tabelaları',
    subtitle: 'Moskova sokağında hayatta kalma: gerçek tabelaları oku',
    letters: [
      { id: 'r15_apteka', upper: 'АПТЕКА', lower: 'аптека', translit: 'Aptyéka', soundHint: 'Yeşil haçlı tabela = eczane', phoneticRule: 'Vurgu ortada: ap-TYÉ-ka. Her köşede bir tane vardır.', examples: [{ ru: 'АПТЕКА', reading: 'Aptyéka', tr: 'Eczane' }] },
      { id: 'r15_vyhod', upper: 'ВЫХОД', lower: 'выход', translit: 'Vıhat', soundHint: 'Metrodaki en hayati kelime: ÇIKIŞ', phoneticRule: 'Выход → "Vıhat": sondaki Д sedasızlaşır (T). ВХОД (giriş) ise "Fhot" okunur — В burada F!', examples: [{ ru: 'ВЫХОД', reading: 'Vıhat', tr: 'Çıkış' }, { ru: 'ВХОД', reading: 'Fhot', tr: 'Giriş' }] },
      { id: 'r15_kassa', upper: 'КАССА', lower: 'касса', translit: 'Kássa', soundHint: 'Çift С uzun okunur', phoneticRule: 'Касса → "Kás-sa": çift ünsüz hafifçe uzatılır.', examples: [{ ru: 'КАССА', reading: 'Kássa', tr: 'Kasa / Gişe' }] },
      { id: 'r15_magazin', upper: 'МАГАЗИН', lower: 'магазин', translit: 'Magazín', soundHint: 'Dergi değil, MARKET demek!', phoneticRule: 'Магазин → mağaza/market ("yalancı dost" kelime: magazin dergisi değildir).', examples: [{ ru: 'МАГАЗИН', reading: 'Magazín', tr: 'Market / Mağaza' }, { ru: 'ПРОДУКТЫ', reading: 'Pradúktı', tr: 'Gıda market' }] },
    ],
    readingDrills: [
      { word: 'магазин', correct: 'Magazín', distractors: ['Mágazin', 'Magázin', 'Magazí'], tr: 'Market / Mağaza' },
      { word: 'аптека', correct: 'Aptyéka', distractors: ['Áptika', 'Aptiká', 'Apteká'], tr: 'Eczane' },
      { word: 'вокзал', correct: 'Vagzál', distractors: ['Vokzál', 'Vágzal', 'Vokazál'], tr: 'Gar / Tren istasyonu' },
      { word: 'больница', correct: "Bal'nítsa", distractors: ['Bolnitsá', 'Bólnitsa', 'Balnitsá'], tr: 'Hastane' },
      { word: 'ресторан', correct: 'Ristarán', distractors: ['Restorán', 'Réstoran', 'Ristorána'], tr: 'Restoran' },
      { word: 'остановка', correct: 'Astanófka', distractors: ['Ostanóvka', 'Astanovká', 'Óstanofka'], tr: 'Durak' },
      { word: 'вход', correct: 'Fhot', distractors: ['Vhod', 'Vıhot', 'Fıhod'], tr: 'Giriş' },
      { word: 'туалет', correct: 'Tualyét', distractors: ['Túalet', 'Tualét', 'Tvalyet'], tr: 'Tuvalet' },
      { word: 'метро', correct: 'Mitró', distractors: ['Métro', 'Mitrá', 'Metró'], tr: 'Metro' }
    ]
  },
  {
    id: 'alpha_16',
    title: 'Hız Okuma Finali',
    subtitle: 'Uzun kelime maratonu — buradan geçen her tabelayı okur!',
    letters: [
      { id: 'r16_pozh', upper: 'ПОЖАЛУЙСТА', lower: 'пожалуйста', translit: 'Pajálusta', soundHint: 'Günde 50 kez duyacaksın: LÜTFEN / RİCA EDERİM', phoneticRule: 'Пожалуйста → "Pajálusta": УЙ hecesindeki Й hızlı konuşmada kaybolur.', examples: [{ ru: 'ПОЖАЛУЙСТА', reading: 'Pajálusta', tr: 'Lütfen / Rica ederim' }] },
      { id: 'r16_prepod', upper: 'ПРЕПОДАВАТЕЛЬ', lower: 'преподаватель', translit: "Pripadavátil'", soundHint: '14 harf ama korkma: pri-pa-da-VÁ-til', phoneticRule: 'Uzun kelimeleri VURGULU heceden geriye doğru kur: ВА → давá → падавá → припадавátil\'.', examples: [{ ru: 'ПРЕПОДАВАТЕЛЬ', reading: "Pripadavátil'", tr: 'Öğretim görevlisi' }] },
      { id: 'r16_dosto', upper: 'ДОСТОПРИМЕЧАТЕЛЬНОСТЬ', lower: 'достопримечательность', translit: "Dastaprimiçátil'nast'", soundHint: 'Rusçanın en ünlü canavar kelimesi: GEZİLECEK YER', phoneticRule: '22 harf! Parçala: даста-прими-ЧÁ-тиль-насть. Turist rehberlerinin göz bebeği.', examples: [{ ru: 'ДОСТОПРИМЕЧАТЕЛЬНОСТЬ', reading: "Dastaprimiçátil'nast'", tr: 'Gezilecek yer' }] },
      { id: 'r16_zdor', upper: 'ЗДОРОВЬЕ', lower: 'здоровье', translit: 'Zdaróvye', soundHint: 'Kadeh kaldırırken: На здоровье!', phoneticRule: 'ВЬЕ üçlüsü "vye" diye tek hamlede okunur: zda-RÓV-ye.', examples: [{ ru: 'ЗДОРОВЬЕ', reading: 'Zdaróvye', tr: 'Sağlık' }] },
    ],
    readingDrills: [
      { word: 'пожалуйста', correct: 'Pajálusta', distractors: ['Pojaluystá', 'Pajaluystá', 'Pójalusta'], tr: 'Lütfen / Rica ederim' },
      { word: 'преподаватель', correct: "Pripadavátil'", distractors: ['Prepodavátel', 'Pripodavatél', 'Prípadavatil'], tr: 'Öğretim görevlisi' },
      { word: 'путешествие', correct: 'Putişéstviye', distractors: ['Puteşestvié', 'Pútişestvie', 'Putişestvíye'], tr: 'Seyahat' },
      { word: 'поздравляю', correct: 'Pazdravlyáyu', distractors: ['Pozdravlyayú', 'Pázdravlyayu', 'Pozıdravlyáyu'], tr: 'Tebrik ederim' },
      { word: 'международный', correct: 'Mijdunaródnıy', distractors: ['Mejdunárodnıy', 'Mijdunarodní', 'Méjdunarodnıy'], tr: 'Uluslararası' },
      { word: 'достопримечательность', correct: "Dastaprimiçátil'nast'", distractors: ['Dostoprimeçatelnóst', 'Dastáprimeçatilnast', 'Dostoprímeçatelnost'], tr: 'Gezilecek yer' },
      { word: 'электричество', correct: 'Eliktríçistva', distractors: ['Elektriçestvó', 'Eléktriçestva', 'Eliktriçistvá'], tr: 'Elektrik' },
      { word: 'четверг', correct: 'Çitvyérk', distractors: ['Çetvérg', 'Çítverk', 'Çitvyérg'], tr: 'Perşembe' },
      { word: 'здоровье', correct: 'Zdaróvye', distractors: ['Zdórovye', 'Zdaravyé', 'Zıdorovye'], tr: 'Sağlık' }
    ]
  },
  // 30 EK OKUMA DERSİ (17-46): sayılar, günler, renkler, isimler, menüler, hız turları
  ...ALPHABET_LESSONS_EXTRA,
  // 30 EK OKUMA DERSİ (47-76): havaalanı, otel, kafe, banka, acil durum, vurgu ikizleri, sessiz harfler, mezuniyet
  ...ALPHABET_LESSONS_EXTRA2
];

export const ALL_ALPHA_LETTERS = ALPHABET_LESSONS.flatMap(x => x.letters);

// GERÇEK ALFABE DERSİ SAYISI: 33 harfin tamamı ilk 16 derste öğretilir.
// 17. dersten itibarenki "dersler" (sayılar, aylar, renkler, menü, tabela,
// hız turları...) harf değil TEMATİK KELİME OKUMA pratiğidir; yol üzerinde
// alfabe bloğuna değil, müfredat ünitelerinin arasına yerleştirilirler.
export const CORE_ALPHA_LESSON_COUNT = 16;


function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SAVE_KEY = 'RUSSIAN_MASTER_DUO_V1';

interface SaveState {
  xp: number;
  streak: number;
  gems: number;
  completedAlpha: string[];
  completedGrammar: string[];
  completedUnits: string[];
  completedTopics: string[];
  completedStories: string[]; // tamamlanan hikaye modülü kontrol noktaları (story_cp1...)
  mistakes: { id: string; ru: string; tr: string; reason: string }[];
  srsBank: SRSItem[];
  // ZAYIF NOKTA İSTATİSTİĞİ: kelime bazında TOPLAM hata sayacı.
  // "Unutulanlar" kütüğünden farkı: kelime doğru cevaplanıp kütükten silinse bile
  // buradaki sayaç kalır — hangi kelimelerde KRONİK olarak zorlandığını gösterir.
  errorStats?: Record<string, { count: number; tr: string; last: number }>;
}

export interface SRSItem {
  ru: string;
  tr: string;
  box: number; // 1-5 arası "kutu" (Leitner sistemi): kutu arttıkça tekrar aralığı büyür
  nextReview: number; // bir sonraki tekrarın yapılacağı zaman (timestamp)
  type: 'word' | 'letter';
}

  // Leitner kutu aralıkları artık src/ultra/ultraMode.ts içindeki srsIntervalFor(box) ile hesaplanır:
// normalde 1-3-7-16-35 gün; ⚡ ULTRA MOD açıkken 1-2-4-8-14 güne SIKILAŞIR (daha sık tekrar = daha kalıcı).
const DAY_MS = 24 * 60 * 60 * 1000;

// ==========================================
// 4. ANA UYGULAMA BİLEŞENİ
// ==========================================

const SceneBanner: React.FC<{ icon: string; color: string; label: string }> = ({ icon, color, label }) => (
  <div style={{
    background: `linear-gradient(135deg, ${color}35, ${color}0f)`,
    border: `1px solid ${color}55`,
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    overflow: 'hidden',
    position: 'relative'
  }}>
    <div style={{ position: 'absolute', top: '-24px', right: '-16px', width: '100px', height: '100px', borderRadius: '50%', background: `${color}25` }} />
    <div style={{ position: 'absolute', bottom: '-30px', right: '50px', width: '64px', height: '64px', borderRadius: '50%', background: `${color}18` }} />
    <div style={{ fontSize: '46px', fontWeight: 900, zIndex: 1, color, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))', lineHeight: 1 }}>{icon}</div>
    <div style={{ fontSize: '13px', fontWeight: 800, color, zIndex: 1 }}>{label}</div>
  </div>
);

// Ünite banner'ı: /unit-art/{unitId}.jpg görselini gösterir; görsel yoksa
// (veya yüklenemezse) otomatik olarak ikonlu SceneBanner'a geri döner.
const UnitBanner: React.FC<{ unitId: string; icon: string; color: string; label: string }> = ({ unitId, icon, color, label }) => {
  const [imgOk, setImgOk] = useState(true);
  useEffect(() => { setImgOk(true); }, [unitId]);
  if (!imgOk) return <SceneBanner icon={icon} color={color} label={label} />;
  return (
    <div style={{
      border: `1px solid ${color}55`,
      borderRadius: '16px',
      marginBottom: '16px',
      overflow: 'hidden',
      position: 'relative',
      background: `linear-gradient(135deg, ${color}35, ${color}0f)`
    }}>
      <img
        src={`/unit-art/${unitId}.jpg`}
        alt={label}
        onError={() => setImgOk(false)}
        style={{ display: 'block', width: '100%', aspectRatio: '16 / 7', objectFit: 'cover' }}
      />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '26px 16px 10px',
        background: 'linear-gradient(180deg, rgba(10,12,20,0) 0%, rgba(10,12,20,0.82) 100%)',
        display: 'flex', alignItems: 'center', gap: '10px'
      }}>
        <span style={{ fontSize: '22px', lineHeight: 1 }}>{icon}</span>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{label}</span>
      </div>
    </div>
  );
};

const ALPHA_BANNER_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#64748b'];

// 🎧 DİNLEME HIZI DÜĞMESİ — sadece dinleme ekranlarında görünür.
// Perde korumalı (preservesPitch) çalışır: ses yavaşlarken/hızlanırken kelimenin
// tınısı BOZULMAZ (incelme/kalınlaşma olmaz). 1× = normal ders temposu.
const LISTEN_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];
const ListenSpeedControl: React.FC<{ speed: number; onChange: (s: number) => void }> = ({ speed, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '8px 12px', margin: '0 0 14px' }}>
    <span style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', marginRight: '4px' }}>🎚️ DİNLEME HIZI</span>
    {LISTEN_SPEEDS.map(s => (
      <button
        key={s}
        onClick={() => onChange(s)}
        title={s < 1 ? 'Yavaşlat — kelime bozulmadan (perde korumalı)' : s > 1 ? 'Hızlandır — kelime bozulmadan (perde korumalı)' : 'Normal hız'}
        style={{
          padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 900, fontSize: '12px',
          background: speed === s ? '#38bdf8' : '#1e293b', color: speed === s ? '#07111f' : '#cbd5e1',
          border: `1px solid ${speed === s ? '#38bdf8' : '#334155'}`,
        }}
      >
        {s === 0.5 ? '🐢 0.5×' : s === 1.5 ? '🐇 1.5×' : `${s}×`}
      </button>
    ))}
    <span style={{ fontSize: '10px', color: '#475569', marginLeft: 'auto' }}>perde korumalı: kelime bozulmaz</span>
  </div>
);

// ==========================================
// TEK MÜFREDAT YOLU (SINGLE PATH)
// "Aşama 1 / Aşama 2 / Aşama 3" gruplandırması YOK: alfabe + dinleme konuları +
// müfredat üniteleri tek bir sıralı çizgi üzerinde "Ünite 1, Ünite 2, ..."
// olarak akar ve her kart bir önceki tamamlanınca açılır.
//   SIRALAMA (yeni başlayan dostu):
//   1) Alfabe dersi 1 → o derste öğrenilen harflerin dinleme konuları → Alfabe dersi 2 → ...
//      (ÖNCE harfi öğren, HEMEN ARDINDAN kulağını o harfe alıştır — henüz
//       öğrenilmemiş harflerin/ileri seviye kelimelerin konusu ÖNE GELMEZ)
//   2) Fonetik dinleme konuları (heceler + akanje/ikanje vb. kurallar)
//   3) Zamanlar + özne/yüklem/edat (cümle temelleri)
//   4) Müfredat üniteleri; (varsa) hemen öncesinde dinleme ön-hazırlığıyla
// ==========================================
export type PathStep =
  | { kind: 'alpha'; lessonIdx: number }
  | { kind: 'grammar'; grammarIdx: number }
  | { kind: 'topic'; topicIdx: number }
  | { kind: 'unit'; unitIdx: number };

export const PATH: PathStep[] = (() => {
  const steps: PathStep[] = [];
  const usedTopics = new Set<number>();
  // GERÇEK ALFABE = ilk 16 ders (33 harfin tamamı burada öğretilir).
  // 17. dersten itibaren gelenler (aylar, renkler, aile, menü, tabela...)
  // harf dersi DEĞİL, tematik KELİME OKUMA pratiğidir — yolun başına yığılmaz,
  // müfredat ünitelerinin arasına serpiştirilir (aşağıda).
  const CORE_ALPHA = CORE_ALPHA_LESSON_COUNT;
  // 1) ALFABE ÖNCE: her GERÇEK alfabe dersinin HEMEN ARDINDAN, o derste öğrenilen
  //    harflerin 🎧 dinleme konuları gelir (harfini bilmediğin sesi dinlemezsin).
  ALPHABET_LESSONS.slice(0, CORE_ALPHA).forEach((lesson, li) => {
    steps.push({ kind: 'alpha', lessonIdx: li });
    lesson.letters.forEach(l => {
      const tIdx = TOPICS_100.findIndex(t => t.cat === 'harf' && t.letterGlyph === l.upper);
      if (tIdx !== -1 && !usedTopics.has(tIdx)) {
        usedTopics.add(tIdx);
        steps.push({ kind: 'topic', topicIdx: tIdx });
      }
    });
  });
  // Güvenlik ağı: alfabe derslerinde karşılığı bulunmayan harf konusu kaldıysa sona ekle
  TOPICS_100.forEach((t, idx) => {
    if (t.cat === 'harf' && !usedTopics.has(idx)) { usedTopics.add(idx); steps.push({ kind: 'topic', topicIdx: idx }); }
  });
  // 2) HECE PRATİĞİ (2 fonetik hece konusu) — harfleri sese bağlama köprüsü
  TOPICS_100.forEach((t, idx) => { if (t.cat === 'fonetik' && t.num < 36) steps.push({ kind: 'topic', topicIdx: idx }); });
  // 3) ALFABEDEN HEMEN SONRA: SAYILAR + ZAMANLAR + ÖZNE/YÜKLEM/EDATLAR (cümle temelleri).
  //    Dinleme kural konuları bu temellerden SONRA gelir — önce dilin iskeleti kurulur.
  for (let i = 0; i < GRAMMAR_FOUNDATION_UNITS.length; i++) steps.push({ kind: 'grammar', grammarIdx: i });
  // 4) Fonetik ses kuralı konuları (akanje, ikanje, sedasızlaşma...) — temellerden sonra
  TOPICS_100.forEach((t, idx) => { if (t.cat === 'fonetik' && t.num >= 36) steps.push({ kind: 'topic', topicIdx: idx }); });
  const previewByUnit = new Map<string, number>();
  TOPICS_100.forEach((t, idx) => { if (t.cat === 'mufredat' && t.unitId && !previewByUnit.has(t.unitId)) previewByUnit.set(t.unitId, idx); });
  // 5) MÜFREDAT + ARAYA SERPİŞTİRİLMİŞ OKUMA PRATİĞİ: tematik okuma dersleri
  //    (17-76: sayılar, aylar, renkler, menü, tabela, hız turları...) artık
  //    alfabe bloğunda DEĞİL — her 3 müfredat ünitesinde bir "📖 OKUMA PRATİĞİ"
  //    kartı olarak kelime öğrenmenin içine dağıtılır.
  let readingIdx = CORE_ALPHA;
  UNITS_DATA.forEach((u, uIdx) => {
    const pIdx = previewByUnit.get(u.id);
    if (pIdx !== undefined) steps.push({ kind: 'topic', topicIdx: pIdx });
    steps.push({ kind: 'unit', unitIdx: uIdx });
    if (readingIdx < ALPHABET_LESSONS.length && uIdx % 3 === 2) {
      steps.push({ kind: 'alpha', lessonIdx: readingIdx });
      readingIdx++;
    }
  });
  // Güvenlik ağı: dağıtımdan artan okuma dersi kaldıysa sona ekle
  while (readingIdx < ALPHABET_LESSONS.length) { steps.push({ kind: 'alpha', lessonIdx: readingIdx }); readingIdx++; }
  return steps;
})();

// Yoldaki her adımın global "ÜNİTE N" numarası (kart etiketleri + ekran içi referanslar ortak sayacı kullanır)
export const UNIT_PATH_POS: number[] = UNITS_DATA.map((_, i) => PATH.findIndex(s => s.kind === 'unit' && s.unitIdx === i) + 1);
export const TOPIC_PATH_POS: number[] = TOPICS_100.map((_, i) => PATH.findIndex(s => s.kind === 'topic' && s.topicIdx === i) + 1);

// Bu adımın seviye etiketi (kart çipi + seviye renkleri için)
const stepLevel = (s: PathStep): CefrTag =>
  s.kind === 'unit' ? UNITS_DATA[s.unitIdx].levelGroup
  : s.kind === 'grammar' ? GRAMMAR_FOUNDATION_UNITS[s.grammarIdx].levelGroup
  : s.kind === 'topic' ? (TOPICS_100[s.topicIdx].levelGroup || 'A1')
  : 'A1';

// Her seviyenin yoldaki İLK adımı — seviye çiplerine tıklayınca oraya kaydırılır
const LEVEL_ANCHORS: Record<CefrTag, number> = (() => {
  const a = {} as Record<CefrTag, number>;
  for (const lv of LEVELS) a[lv] = PATH.findIndex(s => stepLevel(s) === lv);
  return a;
})();

export default function App() {
  const [activeTab, setActiveTab] = useState<'MAP' | 'PROFILE' | 'MISTAKES' | 'METHODS' | 'CONNECTIONS'>('MAP');
  const [screen, setScreen] = useState<'MAP' | 'AI_TUTOR' | 'ALPHA' | 'ALPHA_CHECK' | 'ALPHA_READING' | 'GRAMMAR' | 'TOPIC' | 'TOPIC_TEST' | 'STORY' | 'DIALOG' | 'SMESHARIKI' | 'FLASHCARD' | 'MATCH' | 'TYPING' | 'SENTENCE' | 'QUIZ' | 'UNIT_STORY' | 'STORY_TEST' | 'STORY_RESULT' | 'CHECKPOINT_STORY' | 'ROUTE' | 'GRAPH' | 'SHORTS' | 'RESCUE' | 'MOCK' | 'CARDS' | 'SPEAK'>('MAP');
  // Sınav/test motorunun hangi bağlamda çalıştığını belirtir: her biri bittiğinde farklı bir sonraki adıma geçer
  const [quizContext, setQuizContext] = useState<'ALPHA_FINAL' | 'GRAMMAR_FOUNDATION' | 'LISTENING' | 'UNIT_FINAL' | 'REVIEW' | 'SRS_REVIEW' | 'MARATHON' | 'WEAKSPOT'>('UNIT_FINAL');
  // Harf bazlı anlık tanıma testi
  const [alphaCheckQ, setAlphaCheckQ] = useState<{ type: 'reading' | 'listen'; prompt: string; correct: string; options: string[] } | null>(null);
  // Okuma testi (kelime okuma alıştırması) durumu
  const [readingDrillIdx, setReadingDrillIdx] = useState(0);
  const [readingOptions, setReadingOptions] = useState<string[]>([]);

  // İlerleme & Oyunlaştırma
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [gems, setGems] = useState(250);
  const [completedAlpha, setCompletedAlpha] = useState<string[]>([]);
  const [completedGrammar, setCompletedGrammar] = useState<string[]>([]);
  const [completedUnits, setCompletedUnits] = useState<string[]>([]);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [completedStories, setCompletedStories] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<{ id: string; ru: string; tr: string; reason: string }[]>([]);
  const [srsBank, setSrsBank] = useState<SRSItem[]>([]);
  // Kelime bazlı kronik hata sayaçları (Zayıf Noktalarım paneli bunu okur)
  const [errorStats, setErrorStats] = useState<Record<string, { count: number; tr: string; last: number }>>({});

  // 📊 GERÇEK SERİ: XP kazanımlarını statsStore'a akıtan delta takibi
  const prevXpRef = useRef<number | null>(null);
  // 🔊 KELİME KARTI OTOMATİK SESLENDİRME tercihi (localStorage'da saklanır)
  const [autoSpeak, setAutoSpeak] = useState(() => localStorage.getItem('dilkoc_autospeak') !== '0');
  // ⚡ ULTRA MOD: tüm barajlar yükselir, SRS aralıkları sıkılaşır, XP ×1.5
  const [ultra, setUltra] = useState(isUltraMode());
  useEffect(() => subscribeUltra(() => setUltra(isUltraMode())), []);

  // KULAĞI ALIŞTIR — 100 KONU (sesli dinleme + "dinle & seç" test) durumu
  const [topicIdx, setTopicIdx] = useState(0);              // seçili 100'lük konu (TOPICS_100 indeksi)
  const [topicQs, setTopicQs] = useState<Topic100Question[]>([]); // testin 5 dinleme sorusu
  const [topicQIdx, setTopicQIdx] = useState(0);
  const [topicQCorrect, setTopicQCorrect] = useState(0);
  const [topicQDone, setTopicQDone] = useState(false);
  // Ses testi sonucu (harita: "🔊 Ses Testi" butonu)
  const [soundTest, setSoundTest] = useState<'idle' | 'ok' | 'error'>('idle');
  // Harita seviye sekmelerinin scroll hedefleri
  const levelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // İndeksler
  const [alphaIdx, setAlphaIdx] = useState(0);
  const [letterIdx, setLetterIdx] = useState(0);
  const [grammarIdx, setGrammarIdx] = useState(0);

  const [unitIdx, setUnitIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Egzersiz Durumları
  const [matchPairs, setMatchPairs] = useState<{ ru: string; tr: string }[]>([]);
  const [selectedRu, setSelectedRu] = useState<string | null>(null);
  const [selectedTr, setSelectedTr] = useState<string | null>(null);
  const [donePairs, setDonePairs] = useState<string[]>([]);

  // NOT: Rusça (veya Türkçe) klavyesi olmayan öğrenciler için bu adım YAZARAK değil,
  // 4 seçenek arasından SEÇEREK yapılır — klavye derdi olmadan da "üretici hatırlama"
  // (kelimeyi görüp anlamını aktif olarak bulma) gerçekleşir.
  const [typingIdx, setTypingIdx] = useState(0);
  const [typingOptions, setTypingOptions] = useState<string[]>([]);

  const [sentIdx, setSentIdx] = useState(0);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  // ANLAMSAL FARK ANALİZİ: cümle egzersizinde son yanlış denemenin detaylı raporu
  const [sentenceAnalysis, setSentenceAnalysis] = useState<SentenceAnalysis | null>(null);

  // 🎧 DİNLEME HIZI (sadece dinleme ekranlarında): perde korumalı — kelime bozulmadan
  // yavaşlar/hızlanır. 1 = normal.
  const [listenSpeed, setListenSpeed] = useState(1);
  const listenSpeedRef = useRef(1);
  useEffect(() => { listenSpeedRef.current = listenSpeed; }, [listenSpeed]);
  const listenContextRef = useRef(false); // o an dinleme ekranında mıyız?

  // ⚡ HIZLI KURTARMA TESTİ: 3D ağda tıklanan kırmızı/zayıf düğüm
  const [rescueTarget, setRescueTarget] = useState<RescueTarget | null>(null);

  // Смешарики (Smeshariki) sahnesi anlama sorusu ilerlemesi
  const [smeshQIdx, setSmeshQIdx] = useState(0);

  // Sınav Durumu
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ isError: boolean; message: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // ÜNİTE HİKAYESİ & TÜRKÇELEŞTİRME SINAVI (A1 hariç her ünitede): ünitede öğrenilen kelime/cümlelerle
  // kurulmuş kısa bir sahne/hikaye okutulur, ardından her cümle Türkçeye çevrilerek sınanır.
  // Minimum %90 başarı gerekir (⚡ ultra: %95); altında kalınırsa ünite kelimeleri karıştırılıp baştan tekrar ettirilir.
  const [storyLines, setStoryLines] = useState<{ speaker: string; ru: string; reading?: string; tr: string }[]>([]);
  const [storyTestQuestions, setStoryTestQuestions] = useState<{ prompt: string; correct: string; options: string[] }[]>([]);
  const [storyTestIdx, setStoryTestIdx] = useState(0);
  const [storyTestCorrect, setStoryTestCorrect] = useState(0);
  const [storyChosenAnswer, setStoryChosenAnswer] = useState<string | null>(null);
  const [storyResult, setStoryResult] = useState<{ passed: boolean; percent: number; correctCount: number; total: number } | null>(null);

  // HİKAYE MODÜLÜ (Story & Summary) DURUMU — her 10 ünitede bir açılan kontrol noktası hikayesi:
  // Rusça hikaye okunur (Türkçesi satır satır gizli), altındaki sözlük kartlarından yeni
  // kelimeler öğrenilir, ardından kullanıcının yazdığı TÜRKÇE ÖZET analiz edilir.
  const [storyCheckpointIdx, setStoryCheckpointIdx] = useState(0);        // STORIES indeksi
  const [storyRevealed, setStoryRevealed] = useState<number[]>([]);        // çevirisi açılmış satırlar
  const [storySummaryText, setStorySummaryText] = useState('');            // kullanıcının Türkçe özeti
  const [storyEvalResult, setStoryEvalResult] = useState<SummaryEvaluation | null>(null); // analiz sonucu
  const [storyQuizPassed, setStoryQuizPassed] = useState(false); // bölüm finali: seviye tekrar sınavı geçildi mi
  const [levelQuiz, setLevelQuiz] = useState<{ questions: { ru: string; tr: string; options: string[] }[]; idx: number; correctCount: number; picked: string | null; finished: boolean } | null>(null); // bölüm finali seviye tekrar sınavı

  // KAYIT YÜKLE
  useEffect(() => {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      try {
        const d: SaveState = JSON.parse(raw);
        setXp(d.xp || 0);
        prevXpRef.current = d.xp || 0; // XP-delta takibi kayıtlı değerden başlasın (yükleme "kazanç" sayılmasın)
        setStreak(d.streak || 1);
        setGems(d.gems || 250);
        setCompletedAlpha(d.completedAlpha || []);
        setCompletedGrammar(d.completedGrammar || []);
        setCompletedUnits(d.completedUnits || []);
        setCompletedTopics(d.completedTopics || []);
        setCompletedStories(d.completedStories || []);
        setMistakes(d.mistakes || []);
        setSrsBank(d.srsBank || []);
        setErrorStats(d.errorStats || {});
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // OTOMATİK KAYIT
  useEffect(() => {
    const d: SaveState = { xp, streak, gems, completedAlpha, completedGrammar, completedUnits, completedTopics, completedStories, mistakes, srsBank, errorStats };
    localStorage.setItem(SAVE_KEY, JSON.stringify(d));
  }, [xp, streak, gems, completedAlpha, completedGrammar, completedUnits, completedTopics, completedStories, mistakes, srsBank, errorStats]);

  // 📊 AÇILIŞTA SERİ TAZELEME: statsStore'daki gerçek seri (dün/bugün çalışıldı mı?)
  // eski kayıttaki sabit değerin yerine geçer.
  useEffect(() => {
    const s = loadStats();
    setStreak(Math.max(1, effectiveStreak(s)));
  }, []);

  // 📊 XP-DELTA KANCASI: xp her arttığında kazancı güne yazar, seriyi günceller.
  // Böylece TÜM ekranlardaki (quiz, eşleştirme, kurtarma...) setXp çağrıları tek
  // noktadan istatistiğe akar — ayrı ayrı elden geçirmek gerekmez.
  useEffect(() => {
    if (prevXpRef.current === null) { prevXpRef.current = xp; return; }
    const delta = xp - prevXpRef.current;
    prevXpRef.current = xp;
    if (delta > 0) {
      const s = recordXpGain(delta);
      setStreak(Math.max(1, s.streak));
    }
  }, [xp]);

  // 🔊 Kelime kartı otomatik seslendirme tercihini kalıcılaştır
  useEffect(() => { localStorage.setItem('dilkoc_autospeak', autoSpeak ? '1' : '0'); }, [autoSpeak]);

  // Dinleme bağlamı takibi: hız düğmesi SADECE dinleme ekranlarında sesi etkiler
  // (TOPIC = dinleme konusu, TOPIC_TEST = dinle&seç, DIALOG/SMESHARIKI = sahne dinleme,
  //  QUIZ yalnızca LISTENING bağlamındayken).
  useEffect(() => {
    listenContextRef.current =
      screen === 'TOPIC' || screen === 'TOPIC_TEST' || screen === 'DIALOG' || screen === 'SMESHARIKI' ||
      (screen === 'QUIZ' && quizContext === 'LISTENING');
  }, [screen, quizContext]);

  // Ekran değişince çalan Edge TTS sesini kes (yarım kalmış uzun dinlemeler sürmesin)
  useEffect(() => { stopEdgeSpeech(); }, [screen]);

  // SESLENDİRME — ÖNCE MICROSOFT EDGE TTS (Rusça: Svetlana/Dmitry, Türkçe: Emel/Ahmet).
  // rate parametresiyle yavaş (0.55) veya normal (0.85) tempoda okuma.
  // Dinleme ekranlarında ek olarak perde korumalı hız çarpanı (listenSpeed) uygulanır:
  // ses YAVAŞLARKEN/HIZLANIRKEN kelimenin perdesi BOZULMAZ (preservesPitch).
  // Edge TTS erişilemezse eski native/web TTS zinciri devreye girer.
  const speak = async (txt: string, rate = 0.85, onEnd?: () => void, onError?: () => void) => {
    const isRussian = /[а-яё]/i.test(txt);
    const prefs = getVoicePrefs();
    const playbackRate = listenContextRef.current ? listenSpeedRef.current : 1;
    const edgeOk = await edgeSpeak(txt, {
      voice: isRussian ? prefs.ru : prefs.tr,
      // rate < 0.7 → "Yavaşça Dinle": sentez temposu da düşürülür (heceler ayrışır)
      prosodyRate: rate < 0.7 ? '-35%' : rate < 0.83 ? '-12%' : '-5%',
      playbackRate,
    });
    if (edgeOk) { onEnd?.(); return; }

    const chunks: string[] = [];
    let rest = txt.trim();
    while (rest.length > 110) {
      const marks = [rest.lastIndexOf('. ', 110), rest.lastIndexOf('! ', 110), rest.lastIndexOf('? ', 110), rest.lastIndexOf(', ', 110)];
      const cut = Math.max(...marks);
      const idx = cut > 30 ? cut + 1 : 110;
      chunks.push(rest.slice(0, idx));
      rest = rest.slice(idx).trim();
    }
    if (rest) chunks.push(rest);

    // Yedek zincir de dinleme hız çarpanına uyar (TTS motoru hızı perdeyi bozmadan uygular)
    const effRate = rate * (listenContextRef.current ? listenSpeedRef.current : 1);
    try {
      // Mobil (APK) için native TTS
      await TextToSpeech.stop();
      for (const c of chunks) {
        await TextToSpeech.speak({
          text: c,
          lang: isRussian ? 'ru-RU' : 'tr-TR',
          rate: effRate,
          pitch: 1.0,
          volume: 1.0,
          category: 'playback',
        });
      }
      onEnd?.();
    } catch (e) {
      // Tarayıcıda çalışırken web TTS'ine düş (parçalar sırayla kuyruklanır)
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        let last = chunks.length - 1;
        chunks.forEach((c, i) => {
          const u = new SpeechSynthesisUtterance(c);
          u.lang = isRussian ? 'ru-RU' : 'tr-TR';
          u.rate = effRate;
          if (i === last) {
            u.onend = () => onEnd?.();
            u.onerror = () => onError?.();
          }
          window.speechSynthesis.speak(u);
        });
      } else if (onError) {
        onError();
      }
    }
  };

  const addMistake = (ru: string, tr: string, reason: string) => {
    // Kronik hata sayacı: kütükte zaten olsa bile HER yanlışta +1 —
    // böylece "en çok hangi kelimede takılıyorum?" sorusunun gerçek cevabı birikir.
    setErrorStats(prev => {
      const cur = prev[ru];
      return { ...prev, [ru]: { count: (cur?.count || 0) + 1, tr, last: Date.now() } };
    });
    setMistakes(prev => {
      if (prev.some(x => x.ru === ru)) return prev;
      return [...prev, { id: `${ru}-${Date.now()}`, ru, tr, reason }];
    });
  };

  // Bir kelime/harf tamamen öğrenildiğinde (ünite/alfabe dersi bitince) ARALIKLI TEKRAR havuzuna eklenir.
  // Buradan itibaren gün/hafta sonra otomatik olarak tekrar karşımıza çıkacak — kalıcı hafıza için asıl motor budur.
  const addToSRS = (ru: string, tr: string, type: 'word' | 'letter') => {
    setSrsBank(prev => {
      if (prev.some(x => x.ru === ru)) return prev;
      return [...prev, { ru, tr, box: 1, nextReview: Date.now() + srsIntervalFor(1) * DAY_MS, type }];
    });
  };

  // TÜM İLERLEMEYİ BAŞA SARAR: XP, seri, elmas, tamamlanan üniteler, hatalar ve tekrar havuzu — hepsi sıfırlanır.
  const resetProgress = () => {
    localStorage.removeItem(SAVE_KEY);
    clearExamAttempts(); // deneme sınavı geçmişi de temizlenir
    resetLearner(); // zaman/edat beceri haritası ve kelime hafıza modeli de sıfırlanır
    setXp(0);
    setStreak(1);
    setGems(250);
    setCompletedAlpha([]);
    setCompletedGrammar([]);
    setCompletedUnits([]);
    setCompletedTopics([]);
    setCompletedStories([]);
    setMistakes([]);
    setSrsBank([]);
    setAlphaIdx(0);
    setLetterIdx(0);
    setGrammarIdx(0);
    setUnitIdx(0);
    setCardIdx(0);
    setIsFlipped(false);
    setShowResetConfirm(false);
    setActiveTab('MAP');
    setScreen('MAP');
  };

  // İLERLEME HESAPLAMA (tek yol: alfabe dersleri + dinleme konuları + müfredat üniteleri;
  // sayılar UNITS_DATA'dan otomatik türetilir — hikaye kontrol noktaları hariç)
  const totalTasks = PATH.length;
  const completedCount = completedAlpha.length + completedGrammar.length + completedTopics.length + completedUnits.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  // TEK YOL KİLİT MANTIĞI: her kart, yolda kendinden önceki kart bitince açılır.
  const isStepDone = (s: PathStep): boolean =>
    s.kind === 'alpha' ? completedAlpha.includes(ALPHABET_LESSONS[s.lessonIdx].id)
    : s.kind === 'grammar' ? completedGrammar.includes(GRAMMAR_FOUNDATION_UNITS[s.grammarIdx].id)
    : s.kind === 'topic' ? completedTopics.includes(TOPICS_100[s.topicIdx].id)
    : completedUnits.includes(UNITS_DATA[s.unitIdx].id);
  // BÖLÜM FİNALİ KAPISI: bir adım, kendisinden önce biten bölüm finali hikayesi
  // TAMAMLANMADIYSA kilitli kalır. Böylece A2 → B1 → B2 → C1 geçişleri ancak o
  // bölümün final hikayesi (özet %100 + seviye sınavı) bitince açılır.
  const unitNumberOfStep = (s: PathStep): number => {
    if (s.kind === 'unit') return UNITS_DATA[s.unitIdx].unitNumber;
    if (s.kind === 'grammar') return 0; // cümle temelleri tüm müfredat kapılarından önce gelir
    if (s.kind === 'topic') {
      const t = TOPICS_100[s.topicIdx];
      if (t.cat === 'mufredat' && t.unitId) {
        const u = UNITS_DATA.find(x => x.id === t.unitId);
        if (u) return u.unitNumber; // ön-dinleme konusu, ait olduğu ünitenin numarasını taşır
      }
    }
    return 0; // alfabe / harf / fonetik adımları tüm bölümlerden önce gelir → kapı yok
  };
  const isStepUnlocked = (pos: number) => {
    if (pos === 0 || isStepDone(PATH[pos - 1])) {
      const gate = gateStoryForUnitNumber(unitNumberOfStep(PATH[pos]));
      if (gate && !completedStories.includes(gate.id)) return false; // bölüm finali kapısı kilitli
      return true;
    }
    return false;
  };

  // Yoldaki bir adımı (alfabe / konu / ünite) içeriğiyle aç
  const openStep = (s: PathStep) => {
    setFeedback(null);
    if (s.kind === 'alpha') { setAlphaIdx(s.lessonIdx); setLetterIdx(0); setScreen('ALPHA'); }
    else if (s.kind === 'grammar') { setGrammarIdx(s.grammarIdx); setScreen('GRAMMAR'); }
    else if (s.kind === 'topic') { setTopicIdx(s.topicIdx); setScreen('TOPIC'); }
    else { setUnitIdx(s.unitIdx); setCardIdx(0); setIsFlipped(false); setScreen('STORY'); }
  };

  // AKIŞ KONTROLLERİ

  // Harfi gördükten sonra rastgele ya "okunuşu seç" ya da "dinle ve harfi seç" testi üretir
  const buildAlphaCheck = (l: AlphabetLetter) => {
    const wantsListening = Math.random() < 0.5;
    if (wantsListening) {
      const correctLabel = `${l.upper} ${l.lower}`;
      return {
        type: 'listen' as const,
        prompt: 'Dinlediğiniz harf hangisi?',
        correct: correctLabel,
        options: shuffle([correctLabel, ...shuffle(ALL_ALPHA_LETTERS.filter(x => x.id !== l.id)).slice(0, 3).map(x => `${x.upper} ${x.lower}`)])
      };
    }
    return {
      type: 'reading' as const,
      prompt: `"${l.upper} ${l.lower}" harfi nasıl okunur?`,
      correct: l.translit,
      options: shuffle([l.translit, ...shuffle(ALL_ALPHA_LETTERS.filter(x => x.translit !== l.translit)).slice(0, 3).map(x => x.translit)])
    };
  };

  // Bir harfi öğrendikten sonra "Devam Et" ile anlık tanıma testine geçilir
  const startAlphaCheck = () => {
    const l = ALPHABET_LESSONS[alphaIdx].letters[letterIdx];
    setAlphaCheckQ(buildAlphaCheck(l));
    setFeedback(null);
    setScreen('ALPHA_CHECK');
  };

  const loadReadingDrill = (idx: number) => {
    const drill = ALPHABET_LESSONS[alphaIdx].readingDrills[idx];
    setReadingDrillIdx(idx);
    setReadingOptions(shuffle([drill.correct, ...drill.distractors]));
    setFeedback(null);
  };

  const startAlphaFinalQuiz = () => {
    const les = ALPHABET_LESSONS[alphaIdx];
    const q: any[] = les.letters.map(l => ({
      prompt: `"${l.upper} ${l.lower}" harfinin okunuş/fonetik kuralı nedir?`,
      correct: l.translit,
      options: shuffle([l.translit, ...shuffle(ALL_ALPHA_LETTERS.filter(x => x.translit !== l.translit)).slice(0, 3).map(x => x.translit)]),
      ru: `${l.upper} ${l.lower}`, tr: l.translit
    }));
    // KALICI ÖĞRENME TÜM PROJEDE: bitiş sınavına ÖNCEKİ derslerden 2 harf + 2 okuma sorusu karışır —
    // alfabe dersleri de asla "emekli" olmaz, eski harfler düzenli geri döner.
    if (alphaIdx > 0) {
      const prevLessons = ALPHABET_LESSONS.slice(0, alphaIdx);
      shuffle(prevLessons.flatMap(x => x.letters)).slice(0, 2).forEach(l => q.push({
        prompt: `🔁 KALICI TEKRAR (önceki ders) — "${l.upper} ${l.lower}" nasıl okunuyordu?`,
        correct: l.translit,
        options: shuffle([l.translit, ...shuffle(ALL_ALPHA_LETTERS.filter(x => x.translit !== l.translit)).slice(0, 3).map(x => x.translit)]),
        ru: `${l.upper} ${l.lower}`, tr: l.translit
      }));
      shuffle(prevLessons.flatMap(x => x.readingDrills)).slice(0, 2).forEach(d => q.push({
        prompt: `🔁 KALICI TEKRAR (önceki ders) — "${d.word}" kelimesinin doğru okunuşu hangisi?`,
        correct: d.correct,
        options: shuffle([d.correct, ...d.distractors]),
        ru: d.word, tr: d.correct
      }));
    }
    setQuizContext('ALPHA_FINAL');
    setQuizQuestions(shuffle(q));
    setQuizIdx(0);
    setScreen('QUIZ');
  };

  // CÜMLE TEMELLERİ — özne/yüklem/edat mini üniteleri için 4 soruluk hızlı kontrol.
  const startGrammarQuiz = () => {
    const unit = GRAMMAR_FOUNDATION_UNITS[grammarIdx];
    if (!unit) return;
    const q = unit.quiz.map(item => ({
      prompt: item.prompt,
      correct: item.correct,
      options: shuffle(item.options),
      ru: item.prompt,
      tr: item.correct
    }));
    setQuizContext('GRAMMAR_FOUNDATION');
    setQuizQuestions(q);
    setQuizIdx(0);
    setFeedback(null);
    setScreen('QUIZ');
  };

  // Anlık harf tanıma testi cevabı: yanlışta AYNI soru tekrar sorulur (ilerlemez)
  const handleAlphaCheckAnswer = (ans: string) => {
    if (!alphaCheckQ) return;
    const les = ALPHABET_LESSONS[alphaIdx];
    if (ans === alphaCheckQ.correct) {
      setFeedback(null);
      if (letterIdx + 1 < les.letters.length) {
        setLetterIdx(letterIdx + 1);
        setScreen('ALPHA');
      } else if (les.readingDrills && les.readingDrills.length > 0) {
        loadReadingDrill(0);
        setScreen('ALPHA_READING');
      } else {
        startAlphaFinalQuiz();
      }
    } else {
      const l = les.letters[letterIdx];
      addMistake(`${l.upper} ${l.lower}`, l.translit, 'Harf Tanıma Hatası');
      setFeedback({ isError: true, message: `❌ Doğrusu: "${alphaCheckQ.correct}". Tekrar dene!` });
    }
  };

  // Okuma testi cevabı: yanlışta AYNI kelime tekrar sorulur (ilerlemez)
  const handleReadingAnswer = (ans: string) => {
    const les = ALPHABET_LESSONS[alphaIdx];
    const drill = les.readingDrills[readingDrillIdx];
    if (ans === drill.correct) {
      setFeedback(null);
      if (readingDrillIdx + 1 < les.readingDrills.length) {
        loadReadingDrill(readingDrillIdx + 1);
      } else {
        startAlphaFinalQuiz();
      }
    } else {
      addMistake(drill.word, drill.correct, 'Okuma Hatası');
      setFeedback({ isError: true, message: `❌ Doğru okunuş: "${drill.correct}". Tekrar dene!` });
    }
  };

  // ==========================================
  // KULAĞI ALIŞTIR — 100 KONU (sesli dinleme) AKIŞI
  // Konu: kelimeleri + Rusça dinleme metnini normal/yavaş tempoda dinle,
  // ardından 4 "dinle & seç" sorusundan geç. Kulağın sese alışması burda tamamlanır.
  // ==========================================
  const currentTopic: Topic100 | null = TOPICS_100[topicIdx] ?? null;
  const currentTopicDone = currentTopic ? completedTopics.includes(currentTopic.id) : false;

  // Tümü normal tempoda: kelimeler + cümleler (tek TTS çağrısı)
  const playTopicNormal = () => { if (currentTopic) speak(topicFullText(currentTopic), 0.85); };
  // Tümü yavaş tempoda: kulağın her heceyi ayırt edebilmesi için
  const playTopicSlow = () => { if (currentTopic) speak(topicFullText(currentTopic), 0.55); };

  // Teste başla: 5 "dinle & seç" sorusu üret (harf konularında 1 harf sorusu dahil)
  const startTopicTest = () => {
    if (!currentTopic) return;
    setTopicQs(buildTopicDrills(currentTopic));
    setTopicQIdx(0);
    setTopicQCorrect(0);
    setTopicQDone(false);
    setFeedback(null);
    setScreen('TOPIC_TEST');
  };

  // Yeni soruya geçince hedef sesi otomatik çal (kulağı dinlemeye zorlar)
  useEffect(() => {
    if (screen === 'TOPIC_TEST' && !topicQDone && topicQs.length > 0) {
      const q = topicQs[topicQIdx];
      if (q) {
        const t = window.setTimeout(() => speak(q.audio, 0.8), 350);
        return () => window.clearTimeout(t);
      }
    }
  }, [screen, topicQIdx, topicQDone, topicQs]);

  // "Dinle & seç" sorusu cevabı: yanlışta AYNI soru tekrar sorulur (sesi tekrar dinle)
  const handleTopicAnswer = (ans: string) => {
    const q = topicQs[topicQIdx];
    if (!q || !currentTopic) return;
    // ÖĞRENEN MODELİ: dinleme cevabı da kelime hafıza haritasına işlenir
    recordWordResult(q.audio, q.answer !== q.audio ? q.answer : '', ans === q.answer);
    if (ans === q.answer) {
      setXp(x => x + 5);
      setFeedback(null);
      const correctSoFar = topicQCorrect + 1;
      setTopicQCorrect(correctSoFar);
      if (topicQIdx + 1 < topicQs.length) {
        setTopicQIdx(topicQIdx + 1);
      } else {
        // Test bitti — temel baraj %80, ⚡ ultra modda %90 (topicPassPct)
        const percent = Math.round((correctSoFar / topicQs.length) * 100);
        const passed = percent >= topicPassPct();
        setTopicQDone(true);
        if (passed && !completedTopics.includes(currentTopic.id)) {
          setCompletedTopics(prev => [...prev, currentTopic.id]);
          setXp(x => x + 20);
          setGems(g => g + 12);
          // Konunun kelimeleri ARALIKLI TEKRAR havuzuna eklenir (kalıcı hafıza motoru):
          // dinlediğin kelime günler sonra tekrar karşına çıkar.
          currentTopic.items.slice(0, 8).forEach(it => addToSRS(it.ru, it.tr, 'word'));
        }
      }
    } else {
      addMistake(q.answer, 'Kulağa alışma testi (Dinleme Konusu)', 'Dinleme Hatası');
      setFeedback({ isError: true, message: `❌ Tekrar dinle ve dene! Doğrusu: "${q.answer}"` });
      speak(q.audio, 0.8);
    }
  };

  const checkMatch = (ru: string, tr: string) => {
    const pair = matchPairs.find(m => m.ru === ru && m.tr === tr);
    if (pair) {
      setDonePairs(p => [...p, ru]);
      setSelectedRu(null); setSelectedTr(null);
      setXp(x => x + 10);
    } else {
      addMistake(ru, tr, 'Eşleştirme Yanlış');
      setSelectedRu(null); setSelectedTr(null);
      setFeedback({ isError: true, message: `❌ "${ru}" eşleşmesi hatalıydı.` });
    }
  };

  // Bir kelime kartı için 4 seçenekli tanıma testi hazırlar (yazmaya gerek kalmadan)
  const loadTypingOptions = (idx: number) => {
    const word = UNITS_DATA[unitIdx].words[idx];
    setTypingOptions(shuffle([word.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== word.tr)).slice(0, 3).map(x => x.tr)]));
  };

  const handleTyping = (chosen: string) => {
    const word = UNITS_DATA[unitIdx].words[typingIdx];
    recordWordResult(word.ru, word.tr, chosen === word.tr);
    if (chosen === word.tr) {
      setXp(x => x + 15); setFeedback(null);
      if (typingIdx + 1 < UNITS_DATA[unitIdx].words.length) {
        setTypingIdx(typingIdx + 1);
        loadTypingOptions(typingIdx + 1);
      } else {
        setSentIdx(0); setBuiltWords([]); setSentenceAnalysis(null); setScreen('SENTENCE');
      }
    } else {
      addMistake(word.ru, word.tr, `Tanıma Hatası (${chosen} seçildi)`);
      setFeedback({ isError: true, message: `⚠️ Doğru cevap: "${word.tr}" olmalıydı.` });
    }
  };

  const checkSentence = () => {
    const s = UNITS_DATA[unitIdx].sentences[sentIdx];
    const isCorrect = builtWords.join(' ') === s.correct.join(' ');
    // ÖĞRENEN MODELİ: cümlenin ölçtüğü zaman/edat becerileri haritaya işlenir
    recordSentenceResult(s.ru, isCorrect);
    if (isCorrect) {
      setXp(x => x + 25); setBuiltWords([]); setFeedback(null); setSentenceAnalysis(null);
      if (sentIdx + 1 < UNITS_DATA[unitIdx].sentences.length) {
        setSentIdx(sentIdx + 1);
      } else {
        startUnitQuiz();
      }
    } else {
      addMistake(s.ru, s.tr, 'Cümle Dizilim Hatası');
      // ANLAMSAL FARK ANALİZİ: salt "yanlış" demek yerine, kullanıcının cümlesi ile
      // ideal cümle arasındaki farkı anlam düzeyinde raporla (zaman kayması, edat,
      // çekim, eksik/fazla kelime, dizilim/vurgu farkı).
      setSentenceAnalysis(analyzeSentenceDiff(builtWords, s.correct, s.ru, s.tr));
      setFeedback({ isError: true, message: `🚨 İdeal cümle: "${s.ru}" — aşağıda cümlenin anlamsal analizi var.` });
    }
  };

  // Смешарики sahnesindeki anlama sorusuna verilen cevabı kontrol eder
  const handleSmeshAnswer = (ans: string) => {
    const mod = UNITS_DATA[unitIdx];
    const scene = mod.smeshariki!;
    const q = scene.questions[smeshQIdx];
    if (ans === q.correct) {
      setXp(x => x + 12);
      setFeedback(null);
      if (smeshQIdx + 1 < scene.questions.length) {
        setSmeshQIdx(smeshQIdx + 1);
      } else {
        setSmeshQIdx(0);
        setScreen('FLASHCARD');
      }
    } else {
      addMistake(q.prompt, q.correct, 'Смешарики Sahnesi Anlama Hatası');
      setFeedback({ isError: true, message: `❌ Doğrusu: "${q.correct}". Tekrar dene!` });
    }
  };

  // Kelime kartlarını bitirince sesli dinleme testine geçilir (metin gizli, sadece ses)
  const startListening = () => {
    const mod = UNITS_DATA[unitIdx];
    const uWords = mod.words;
    const q = shuffle(uWords).map(w => ({
      prompt: '',
      correct: w.tr,
      options: shuffle([w.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr)]),
      ru: w.ru, tr: w.tr, audioOnly: true
    }));
    // KALICI ÖĞRENME TÜM PROJEDE: dinleme testine de eski ünitelerden 8 tekrar sorusu karışır (⚡ ultra modda 12).
    const reviewQ = buildReviewInjection(mod, retentionDose(8));
    setQuizContext('LISTENING');
    setQuizQuestions(shuffle([...q, ...reviewQ]));
    setQuizIdx(0);
    setScreen('QUIZ');
  };

  // ==========================================
  // KALICI ÖĞRENME — KARMA TEKRAR ENJEKSİYONU (Interleaving + Genişleyen Aralık)
  // Bir ünite %100 doğru tamamlansa BİLE kelimeleri kaybolmaz: sonraki HER ünitenin
  // bitiş sınavına, önceki ünitelerden seçilen "🔁 KALICI TEKRAR" soruları karışır.
  // Seçim iki bilimsel ilkeye dayanır:
  //  1) Genişleyen aralık (expanding retrieval): 1, 2, 3, 5, 8, 13, 21 ünite geriden kelime çekilir —
  //     yeni öğrenilen sık, eskiden öğrenilen seyrek ama DÜZENLİ sorulur.
  //  2) Kümülatif rastgele örnekleme (RST — araştırmalarda kümülatif sınavdan daha dengeli
  //     bulunmuştur): TÜM geçmiş ünitelerden rastgele örnek eklenir, hiçbir kelime "emekli" olmaz.
  //  + Üretim etkisi (production effect): soruların yarısı ters yönde (TR → RU) sorulur.
  //  + Vadesi gelen Aralıklı Tekrar (SRS) kelimeleri öncelik alır; doğru cevap kutu atlatır.
  const buildReviewInjection = (mod: UnitModule, count: number) => {
    const prevUnits = UNITS_DATA.filter(u => u.unitNumber < mod.unitNumber);
    if (prevUnits.length === 0 || count <= 0) return [] as any[];
    const pool: WordDetail[] = [];
    [1, 2, 3, 5, 8, 13, 21].forEach(off => {
      const u = prevUnits.find(x => x.unitNumber === mod.unitNumber - off);
      if (u) pool.push(...shuffle(u.words).slice(0, 4));
    });
    pool.push(...shuffle(prevUnits.flatMap(u => u.words)).slice(0, 10));
    const dueRu = new Set(srsBank.filter(i => i.nextReview <= Date.now()).map(i => i.ru));
    const uniq = [...new Map(pool.map(w => [w.ru, w])).values()].filter(w => !mod.words.some(mw => mw.ru === w.ru));
    const prioritized = [...uniq].sort((a, b) => (dueRu.has(b.ru) ? 1 : 0) - (dueRu.has(a.ru) ? 1 : 0));
    return prioritized.slice(0, count).map((w, i) => {
      if (i % 2 === 1) {
        // Üretim etkisi: Türkçeden Rusçayı GERİ ÇAĞIRMAK, pasif tanımadan çok daha güçlü iz bırakır.
        return {
          prompt: `🔁 KALICI TEKRAR (eski üniteden) — "${w.tr}" kelimesinin RUSÇASI hangisi?`,
          correct: w.ru,
          options: shuffle([w.ru, ...shuffle(ALL_WORDS.filter(x => x.ru !== w.ru)).slice(0, 3).map(x => x.ru)]),
          ru: w.ru, tr: w.tr, review: true
        };
      }
      return {
        prompt: `🔁 KALICI TEKRAR (eski üniteden) — "${w.ru}" ne anlama geliyordu?`,
        correct: w.tr,
        options: shuffle([w.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr)]),
        ru: w.ru, tr: w.tr, review: true
      };
    });
  };

  // ÜNİTE BİTİŞ SINAVI — GENİŞLETİLMİŞ: her kelime İKİ yönde sorulur (tanıma RU→TR
  // + üretim TR→RU), araya dinleme soruları ve cümle anlama soruları eklenir,
  // üstüne 10 adet "eski kelime" kalıcı tekrar sorusu karışır. Amaç: bir üniteyi
  // geçmek için kelimeyi yalnızca TANIMAK yetmez — GERİ ÇAĞIRMAK, DUYMAK ve
  // BAĞLAMDA ANLAMAK da gerekir (test etkisi × 4 kanal = kalıcı iz).
  const startUnitQuiz = () => {
    const mod = UNITS_DATA[unitIdx];
    const uWords = mod.words;
    // 1) TANIMA: RU → TR (her kelime)
    const q: any[] = uWords.map(w => ({
      prompt: `"${w.ru}" kelimesinin Türkçe karşılığı nedir?`,
      correct: w.tr,
      options: shuffle([w.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr)]),
      ru: w.ru, tr: w.tr
    }));
    // 2) ÜRETİM: TR → RU (her kelime — geri çağırma, pasif tanımadan çok daha güçlü iz bırakır)
    uWords.forEach(w => q.push({
      prompt: `✍️ ÜRETİM — "${w.tr}" kelimesinin RUSÇASI hangisi?`,
      correct: w.ru,
      options: shuffle([w.ru, ...shuffle(ALL_WORDS.filter(x => x.ru !== w.ru)).slice(0, 3).map(x => x.ru)]),
      ru: w.ru, tr: w.tr
    }));
    // 3) DİNLEME: ünitenin 5 kelimesi yalnız SESLE sorulur (kulak kanalı da sınanır)
    shuffle([...uWords]).slice(0, 5).forEach(w => q.push({
      prompt: '',
      correct: w.tr,
      options: shuffle([w.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr)]),
      ru: w.ru, tr: w.tr, audioOnly: true
    }));
    // 4) BAĞLAM: ünite cümleleri anlama soruları (kelime cümle içinde tanınmalı)
    shuffle([...mod.sentences]).slice(0, 4).forEach(s => q.push({
      prompt: `📖 BAĞLAM — «${s.ru}» cümlesi ne anlatıyor?`,
      correct: s.tr,
      options: shuffle([s.tr, ...shuffle(ALL_SENTENCES.filter(x => x.tr !== s.tr)).slice(0, 3).map(x => x.tr)]),
      ru: s.ru, tr: s.tr
    }));
    // 5) KALICI TEKRAR: eski ünitelerden 12 soru (⚡ ultra modda 18) — genişleyen aralık + SRS öncelikli
    const reviewQ = buildReviewInjection(mod, retentionDose(12));
    setQuizContext('UNIT_FINAL');
    setQuizQuestions(shuffle([...q, ...reviewQ]));
    setQuizIdx(0);
    setScreen('QUIZ');
  };

  // ==========================================
  // ÜNİTE HİKAYESİ & TÜRKÇELEŞTİRME SINAVI (A1 hariç)
  // ==========================================

  // Geçmek için gereken minimum başarı: temelde %90, ⚡ ULTRA modda %95 (src/ultra/ultraMode.ts)
  const STORY_PASS_THRESHOLD = storyPassRatio();

  // O ünitede zaten yazılmış olan dizi sahnesi (dialogue) ve örnek cümlelerden (sentences),
  // ünitenin kelime dağarcığıyla doğrudan bağlantılı, akıcı okunan kısa bir "hikaye/sahne" kurar.
  const buildUnitStory = (mod: UnitModule) => {
    const lines: { speaker: string; ru: string; reading?: string; tr: string }[] = [];
    if (mod.dialogue && mod.dialogue.length > 0) {
      mod.dialogue.forEach(d => lines.push({ speaker: d.speaker, ru: d.ru, reading: d.reading, tr: d.tr }));
    }
    (mod.sentences || []).forEach(s => lines.push({ speaker: 'Hikaye', ru: s.ru, tr: s.tr }));
    return lines;
  };

  // Hikayedeki her cümle için 4 seçenekli "bu cümlenin Türkçesi hangisi?" sorusu üretir.
  // Yanlış şıklar, o hikayeye ait olmayan başka ünitelerin cümlelerinden seçilir.
  const buildStoryTest = (lines: { ru: string; tr: string }[]) => {
    const distractPool = ALL_SENTENCES.filter(s => !lines.some(l => l.tr === s.tr));
    return shuffle(lines).map(l => {
      const distractors = shuffle(distractPool.filter(s => s.tr !== l.tr)).slice(0, 3).map(s => s.tr);
      return { prompt: l.ru, correct: l.tr, options: shuffle([l.tr, ...distractors]) };
    });
  };

  // Ünitenin kelime/cümle/sınav akışı bitince çağrılır: hikaye ekranını hazırlar.
  const startUnitStory = () => {
    const mod = UNITS_DATA[unitIdx];
    setStoryLines(buildUnitStory(mod));
    setScreen('UNIT_STORY');
  };

  // Hikaye okunduktan sonra Türkçeleştirme sınavını başlatır.
  const startStoryTest = () => {
    const lines = storyLines.length > 0 ? storyLines : buildUnitStory(UNITS_DATA[unitIdx]);
    setStoryTestQuestions(buildStoryTest(lines));
    setStoryTestIdx(0);
    setStoryTestCorrect(0);
    setStoryChosenAnswer(null);
    setFeedback(null);
    setScreen('STORY_TEST');
  };

  // Sınavda bir cümleye cevap verilince (doğru/yanlış fark etmeksizin sonraki cümleye geçilebilir;
  // asıl değerlendirme sınav sonunda toplam yüzdeye göre yapılır).
  const handleStoryTestAnswer = (ans: string) => {
    if (storyChosenAnswer) return; // Aynı soru için tekrar sayılmasın
    const q = storyTestQuestions[storyTestIdx];
    // ÖĞRENEN MODELİ: Rusça hikaye cümlesinin ölçtüğü zaman/edat becerileri haritaya işlenir
    if (/[а-яё]/i.test(q.prompt)) recordSentenceResult(q.prompt, ans === q.correct);
    setStoryChosenAnswer(ans);
    if (ans === q.correct) {
      setXp(x => x + 20);
      setStoryTestCorrect(c => c + 1);
    } else {
      addMistake(q.prompt, q.correct, 'Hikaye Türkçeleştirme Hatası');
    }
  };

  // "Devam Et" ile sonraki cümleye geçilir; son cümledeyse sınav sonucu hesaplanır.
  const continueStoryTest = () => {
    const isLast = storyTestIdx + 1 >= storyTestQuestions.length;
    if (!isLast) {
      setStoryChosenAnswer(null);
      setStoryTestIdx(i => i + 1);
      return;
    }
    const total = storyTestQuestions.length;
    const correctCount = storyTestCorrect;
    const percent = Math.round((correctCount / total) * 100);
    const passed = correctCount / total >= STORY_PASS_THRESHOLD;
    if (passed) {
      const mod = UNITS_DATA[unitIdx];
      if (!completedUnits.includes(mod.id)) setCompletedUnits(p => [...p, mod.id]);
      mod.words.forEach(w => addToSRS(w.ru, w.tr, 'word'));
      setGems(g => g + 80);
    }
    setStoryChosenAnswer(null);
    setStoryResult({ passed, percent, correctCount, total });
    setScreen('STORY_RESULT');
  };

  // Baraj geçilemezse: ünitenin kelimeleri KARIŞTIRILIR ve tüm ünite (kartlar → eşleştirme →
  // hızlı tanıma → cümle kurma → sınav → hikaye) baştan tekrar ettirilir; böylece daha iyi ezberlenir.
  const retryUnitShuffled = () => {
    const mod = UNITS_DATA[unitIdx];
    mod.words = shuffle(mod.words);
    setStoryResult(null);
    setStoryLines([]);
    setStoryTestQuestions([]);
    setStoryTestIdx(0);
    setStoryTestCorrect(0);
    setStoryChosenAnswer(null);
    setCardIdx(0);
    setIsFlipped(false);
    setFeedback(null);
    setScreen('FLASHCARD');
  };

  // ==========================================
  // HİKAYE MODÜLÜ (Story & Summary) — HER 10 ÜNİTEDE BİR OTOMATİK AÇILIR
  // Kullanıcı 10 müfredat ünitesini (kelime/cümle içerikli) tamamlayınca sistem,
  // o 10 ünitenin kelimeleriyle yazılmış HIMYM tarzı bir hikaye modülü açar.
  // Hikayede en fazla 5-6 yeni kelime vardır; anlamları sözlük kartı olarak gösterilir.
  // Kullanıcı Rusça metni okur → Türkçe özetini yazar → analiz motoru
  // "X doğru nokta / Y eksik-yanlış" şeklinde yapıcı geri bildirim üretir.
  // ==========================================

  // Tamamlanan müfredat ünitesi sayısı (yol doğrusal olduğu için bu, ilk N ünitenin
  // tamamlandığı anlamına gelir → N=10,20,30... anlarında kontrol noktası hikayesi açılır).
  const completedUnitsCount = completedUnits.length;
  const storyDone = (s: CheckpointStory) => completedStories.includes(s.id);

  // Haritada "okunmayı bekleyen" ilk hikaye (varsa üstte uyarı kartı çizer)
  const pendingCheckpointStory = nextPendingStory(completedUnitsCount, completedStories);

  // Bir kontrol noktası hikayesini ekranla: satır çevirileri kapanır, özet alanı sıfırlanır.
  const openCheckpointStory = (s: CheckpointStory) => {
    setStoryCheckpointIdx(STORIES.findIndex(x => x.id === s.id));
    setStoryRevealed([]);
    setStorySummaryText('');
    setStoryEvalResult(null);
    setStoryQuizPassed(false);
    setLevelQuiz(null);
    setFeedback(null);
    setScreen('CHECKPOINT_STORY');
  };

  // Özeti analiz et: "X doğru nokta / Y eksik-yanlış anlaşılan yer" geri bildirimini üretir.
  const analyzeStorySummary = () => {
    const story = STORIES[storyCheckpointIdx];
    if (!story) return;
    const result = evaluateTurkishSummary(story, storySummaryText);
    setStoryEvalResult(result);
  };

  // Özet TAMAMEN doğru mu? (bölüm finali kapısı için: eksik nokta ve yanlış anlama sıfır)
  const isSummaryPerfect = (ev: SummaryEvaluation | null): boolean =>
    !!ev && !ev.tooShort && !ev.wrongLanguage && ev.missing.length === 0 && ev.misunderstood.length === 0;

  // Hikaye modülünü tamamla: ödül + yeni kelimeler Aralıklı Tekrar (SRS) havuzuna eklenir.
  // BÖLÜM FİNALİ ise kapı kuralları işler: özet %100 + seviye tekrar sınavı geçilmeden
  // tamamlanamaz (yani sonraki bölüm açılmaz).
  const completeCheckpointStory = () => {
    const story = STORIES[storyCheckpointIdx];
    if (!story) { setScreen('MAP'); return; }
    if (!completedStories.includes(story.id)) {
      if (story.kind === 'levelFinal') {
        if (!isSummaryPerfect(storyEvalResult)) {
          setFeedback({ isError: true, message: '🚧 Bölüm finali kapısı: özetin TAMAMEN doğru olmalı! Eksik nokta ve yanlış anlama sıfır olana kadar özetini düzenlemeye devam et.' });
          return;
        }
        if (!storyQuizPassed) {
          setFeedback({ isError: true, message: `🚧 Bölüm finali kapısı: Seviye Tekrar Sınavı'ndan en az ${gatePassNeed()}/10 alman gerekiyor!${isUltraMode() ? ' (⚡ ULTRA barajı)' : ''}` });
          return;
        }
      }
      setCompletedStories(p => [...p, story.id]);
      const baseXp = story.kind === 'levelFinal' ? 150 : 100;
      setXp(x => x + baseXp + (storyEvalResult ? storyEvalResult.scorePercent : 0));
      setGems(g => g + (story.kind === 'levelFinal' ? 100 : 60));
      story.newWords.forEach(w => addToSRS(w.ru, w.tr, 'word'));
    }
    setScreen('MAP');
    setActiveTab('MAP');
  };

  // SEVİYE TEKRAR SINAVI (bölüm finalleri) — önceki bölümlerdekiler dahil tüm öğrenilen
  // kelimelerden karışık sorular: 6 soru bitirilen bölümden, 4 soru önceki bölümlerden.
  // Amaç: A'dan öğrenilen kelimeler B'de de tekrar edilerek KALICI hale gelsin.
  const buildLevelQuiz = (story: CheckpointStory) => {
    const pool = UNITS_DATA.filter(u => u.unitNumber <= story.unitTo);
    const levelWords = pool.filter(u => u.unitNumber >= story.unitFrom).flatMap(u => u.words);
    const oldWords = pool.filter(u => u.unitNumber < story.unitFrom).flatMap(u => u.words);
    const chosen = [...shuffle(levelWords).slice(0, 6), ...shuffle(oldWords).slice(0, 4)];
    if (chosen.length < 10) {
      const rest = shuffle([...levelWords, ...oldWords].filter(w => !chosen.some(c => c.id === w.id)));
      chosen.push(...rest.slice(0, 10 - chosen.length));
    }
    const all = [...levelWords, ...oldWords];
    const questions = chosen.map(w => {
      const distractors = shuffle(all.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr);
      return { ru: w.ru, tr: w.tr, options: shuffle([w.tr, ...distractors]) };
    });
    setStoryQuizPassed(false);
    setLevelQuiz({ questions, idx: 0, correctCount: 0, picked: null, finished: false });
  };

  // Sınavda bir şıkka tıklanınca: doğruysa +5 XP, yanlışsa "Unutulanlar" kütüğüne girer.
  const answerLevelQuiz = (opt: string) => {
    if (!levelQuiz || levelQuiz.picked !== null) return; // aynı soruya çift tıklama engeli
    const q = levelQuiz.questions[levelQuiz.idx];
    const isCorrect = opt === q.tr;
    if (isCorrect) setXp(x => x + 5);
    else addMistake(q.ru, q.tr, 'Seviye Tekrar Sınavı (Bölüm Finali)');
    setLevelQuiz(lq => lq ? { ...lq, picked: opt, correctCount: lq.correctCount + (isCorrect ? 1 : 0) } : null);
  };

  // Sınavda sonraki soruya geç / sınavı bitir (temelde >= 8/10, ⚡ ultrada 9/10 → geçti).
  const advanceLevelQuiz = () => {
    if (!levelQuiz) return;
    if (levelQuiz.idx + 1 < levelQuiz.questions.length) {
      setLevelQuiz(lq => lq ? { ...lq, idx: lq.idx + 1, picked: null } : null);
    } else {
      const passed = levelQuiz.correctCount >= gatePassNeed(); // ⚡ ultra modda baraj 9/10
      if (passed) setStoryQuizPassed(true);
      setLevelQuiz(lq => lq ? { ...lq, finished: true } : null);
    }
  };

  // Haritaya dönüş: BEKLEYEN bir hikaye kontrol noktası varsa onu OTOMATİK AÇ
  // ("her 10 ünite tamamlanınca sistem otomatik hikaye modülü açsın" kuralı burada çalışır).
  const returnToMapOrStory = () => {
    const pending = nextPendingStory(completedUnits.length, completedStories);
    if (pending) openCheckpointStory(pending);
    else { setScreen('MAP'); setActiveTab('MAP'); }
  };

  // GENEL TEKRAR MOTORU: "Unutulanlar" kütüğündeki HER şey doğru cevaplanana kadar tekrar tekrar sorulur.
  // Doğru cevaplanan kelime kütükten tamamen silinir (ustalaşıldı sayılır); yanlış cevaplanan kalır ve aynı soru yeniden sorulur.
  const startGlobalReview = () => {
    if (mistakes.length === 0) return;
    const q = shuffle(mistakes).map(m => ({
      prompt: m.reason === 'Cümle Temeli Hatası' ? m.ru : `"${m.ru}" ne anlama gelir?`,
      correct: m.tr,
      options: shuffle([m.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== m.tr)).slice(0, 3).map(x => x.tr)]),
      ru: m.ru, tr: m.tr
    }));
    setQuizContext('REVIEW');
    setQuizQuestions(q);
    setQuizIdx(0);
    setActiveTab('MAP');
    setScreen('QUIZ');
  };

  // ==========================================
  // ZAYIF NOKTA MOTORU — KİŞİSELLEŞTİRİLMİŞ EK TEST
  // errorStats'taki kronik hata sayaçlarına göre EN ÇOK yanlış yapılan ~12 kelimeden
  // kişiye özel bir sınav kurar. Sorular iki yönlü sorulur (tanıma + üretim) ve her
  // kelime doğru cevaplandıkça sayaç 1 azalır — panel zamanla "iyileşmeyi" gösterir.
  // ==========================================
  const weakWords = Object.entries(errorStats)
    .map(([ru, v]) => ({ ru, tr: v.tr, count: v.count, last: v.last }))
    .filter(w => w.count > 0)
    .sort((a, b) => b.count - a.count || b.last - a.last);

  const startWeakspotQuiz = () => {
    const target = weakWords.slice(0, 12);
    if (target.length === 0) return;
    const q = shuffle(target.flatMap(w => {
      const rec = {
        prompt: `🎯 ZAYIF NOKTA — "${w.ru}" ne anlama geliyor?`,
        correct: w.tr,
        options: shuffle([w.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr)]),
        ru: w.ru, tr: w.tr
      };
      // Üretim etkisi: en kronik ilk 6 kelime TERS yönde de sorulur (TR → RU)
      if (w.count >= 2 && ALL_WORDS.some(x => x.ru === w.ru)) {
        return [rec, {
          prompt: `🎯 ZAYIF NOKTA (üretim) — "${w.tr}" kelimesinin RUSÇASI hangisi?`,
          correct: w.ru,
          options: shuffle([w.ru, ...shuffle(ALL_WORDS.filter(x => x.ru !== w.ru)).slice(0, 3).map(x => x.ru)]),
          ru: w.ru, tr: w.tr
        }];
      }
      return [rec];
    })).slice(0, 16);
    setQuizContext('WEAKSPOT');
    setQuizQuestions(q);
    setQuizIdx(0);
    setActiveTab('MAP');
    setScreen('QUIZ');
  };

  // Zayıf kelimenin hangi ünite/kategoriden geldiğini bulur (panelde rozet olarak gösterilir)
  const findWordHome = (ru: string) => {
    const u = UNITS_DATA.find(x => x.words.some(w => w.ru === ru));
    return u ? { title: u.title, category: u.category, icon: u.icon, color: u.color } : null;
  };

  // ARALIKLI TEKRAR (SPACED REPETITION) OTURUMU: Sadece bugün "vadesi gelmiş" kelimeler sorulur.
  // Bu, kalıcı hafızanın bilimsel temelidir — beyin bir bilgiyi unutmaya en yakın olduğu anda tekrar hatırlarsa iz kalıcılaşır.
  const dueSRS = srsBank.filter(i => i.nextReview <= Date.now());

  // 🗣️ GÜNLÜK AĞIZ ÖDEVİ durumu (haritadaki günlük plan kartı bunu okur)
  const todaysSpeechDrills = useMemo(() => buildDailyDrills(completedUnits), [completedUnits]);
  const speechDay = loadSpeechDay();
  const speechDoneCount = todaysSpeechDrills.filter(d => speechDay.done.includes(d.id)).length;

  // AI koçu da haritadaki TEK SIRA öğrenme yolunu takip eder: Ünite 1 → Ünite {PATH.length}.
  // Yani koç, sadece müfredat kelime ünitelerini değil; harf, fonetik dinleme, gramer ve ünite kartlarının
  // hangisinde kaldıysan onu "şu anki ünite" kabul eder.
  const aiPathIndexRaw = PATH.findIndex(s => !isStepDone(s));
  const aiPathIndex = aiPathIndexRaw === -1 ? Math.max(0, PATH.length - 1) : aiPathIndexRaw;
  const aiStep = PATH[aiPathIndex];
  const aiLearningFocus = (() => {
    const base = { pathPosition: aiPathIndex + 1, pathTotal: PATH.length };
    if (aiStep.kind === 'alpha') {
      const lesson = ALPHABET_LESSONS[aiStep.lessonIdx];
      return {
        ...base,
        icon: '🔤',
        title: lesson.title,
        description: lesson.subtitle,
        words: [
          ...lesson.readingDrills.map(d => ({ ru: d.word, tr: d.tr, reading: d.correct })),
          ...lesson.letters.flatMap(l => l.examples.map(e => ({ ru: e.ru, tr: e.tr, reading: e.reading })))
        ].slice(0, 14),
        sentences: lesson.readingDrills.map(d => ({ ru: d.word, tr: d.tr }))
      };
    }
    if (aiStep.kind === 'grammar') {
      const g = GRAMMAR_FOUNDATION_UNITS[aiStep.grammarIdx];
      return {
        ...base,
        icon: g.icon,
        title: g.title,
        description: g.description,
        words: g.examples.map(e => ({ ru: e.ru, tr: e.tr, reading: e.reading })),
        sentences: g.examples.map(e => ({ ru: e.ru, tr: e.tr }))
      };
    }
    if (aiStep.kind === 'topic') {
      const t = TOPICS_100[aiStep.topicIdx];
      return {
        ...base,
        icon: t.icon,
        title: t.titleTr,
        description: t.descTr,
        words: t.items.map(i => ({ ru: i.ru, tr: i.tr, reading: i.reading })),
        sentences: [...t.sentences.map(s => ({ ru: s.ru, tr: s.tr })), ...t.dialogue.map(d => ({ ru: d.ru, tr: d.tr }))]
      };
    }
    const u = UNITS_DATA[aiStep.unitIdx];
    return {
      ...base,
      icon: u.icon,
      title: u.title,
      description: u.description,
      words: u.words.map(w => ({ ru: w.ru, tr: w.tr, reading: w.reading })),
      sentences: [...u.sentences.map(s => ({ ru: s.ru, tr: s.tr })), ...(u.dialogue || []).map(d => ({ ru: d.ru, tr: d.tr }))]
    };
  })();

  const startSRSReview = () => {
    if (dueSRS.length === 0) return;
    const q = shuffle(dueSRS).map(item => ({
      prompt: `"${item.ru}" ne anlama gelir? (Kutu ${item.box}/5)`,
      correct: item.tr,
      options: shuffle([item.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== item.tr)).slice(0, 3).map(x => x.tr)]),
      ru: item.ru, tr: item.tr
    }));
    setQuizContext('SRS_REVIEW');
    setQuizQuestions(q);
    setQuizIdx(0);
    setActiveTab('MAP');
    setScreen('QUIZ');
  };

  // 🔀 KARMA MARATON (Kümülatif Rastgele Örnekleme Sınavı):
  // Tamamlanmış TÜM ünitelerin kelime havuzundan rastgele 15 soru çeker — vadesi gelmemiş
  // olsa bile her kelime her an sorulabilir; hiçbir bilgi "bitti" rafına kalkmaz.
  // Araştırmalar (randomly sampled tests), bu yöntemin tüm kelimeleri dengeli biçimde
  // canlı tuttuğunu gösteriyor. Soruların yarısı üretim yönünde (TR → RU) sorulur.
  const startMarathon = () => {
    const doneUnits = UNITS_DATA.filter(u => completedUnits.includes(u.id));
    const pool = doneUnits.flatMap(u => u.words);
    if (pool.length === 0) return;
    const sample = shuffle(pool).slice(0, 15);
    const q = sample.map((w, i) => {
      if (i % 2 === 1) {
        return {
          prompt: `🔀 MARATON — "${w.tr}" kelimesinin RUSÇASI hangisi?`,
          correct: w.ru,
          options: shuffle([w.ru, ...shuffle(ALL_WORDS.filter(x => x.ru !== w.ru)).slice(0, 3).map(x => x.ru)]),
          ru: w.ru, tr: w.tr
        };
      }
      return {
        prompt: `🔀 MARATON — "${w.ru}" ne anlama geliyor?`,
        correct: w.tr,
        options: shuffle([w.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr)]),
        ru: w.ru, tr: w.tr
      };
    });
    setQuizContext('MARATHON');
    setQuizQuestions(q);
    setQuizIdx(0);
    setActiveTab('MAP');
    setScreen('QUIZ');
  };

  const handleQuizAnswer = (ans: string) => {
    const q = quizQuestions[quizIdx];
    // ÖĞRENEN MODELİ: her çözülen soru (doğru + yanlış) zaman/edat/kelime haritasına işlenir —
    // 🧭 Kişisel Rota ve 🕸️ 3D Kelime Ağı bu veriden beslenir.
    if ((q as any).ru) recordWordResult((q as any).ru, (q as any).tr || q.correct, ans === q.correct);
    if (quizContext === 'GRAMMAR_FOUNDATION') {
      const sk = skillKeyForGrammarUnit(GRAMMAR_FOUNDATION_UNITS[grammarIdx]?.id || '');
      if (sk) recordSkill(sk, ans === q.correct);
    }
    if (ans === q.correct) {
      setXp(x => x + xpGain(quizContext === 'REVIEW' ? 5 : quizContext === 'SRS_REVIEW' ? 8 : 20)); // ⚡ ultra modda XP ×1.5
      setFeedback(null);
      if (quizContext === 'WEAKSPOT') {
        // İyileşme: zayıf nokta testinde doğru cevap sayacı 1 azaltır (0'a inince kelime panelden düşer)
        setErrorStats(prev => {
          const cur = prev[q.ru];
          if (!cur) return prev;
          const next = { ...prev };
          if (cur.count <= 1) delete next[q.ru]; else next[q.ru] = { ...cur, count: cur.count - 1 };
          return next;
        });
      }
      if (quizContext === 'REVIEW') {
        // Ustalaşılan kelimeyi Unutulanlar kütüğünden kaldır
        setMistakes(prev => prev.filter(m => !(m.ru === q.ru && m.tr === q.tr)));
      }
      if (quizContext === 'SRS_REVIEW' || (q as any).review) {
        // Doğru bilindi: bir sonraki kutuya terfi eder, tekrar aralığı büyür (1→3→7→16→35 gün;
        // ⚡ ultra modda 1→2→4→8→14). (🔁 KALICI TEKRAR soruları da kutuyu ilerletir.)
        setSrsBank(prev => prev.map(item => {
          if (item.ru !== q.ru) return item;
          const newBox = Math.min(item.box + 1, 5);
          return { ...item, box: newBox, nextReview: Date.now() + srsIntervalFor(newBox) * DAY_MS };
        }));
      }
      if (quizIdx + 1 < quizQuestions.length) {
        setQuizIdx(quizIdx + 1);
      } else {
        if (quizContext === 'ALPHA_FINAL') {
          const id = ALPHABET_LESSONS[alphaIdx].id;
          if (!completedAlpha.includes(id)) setCompletedAlpha(p => [...p, id]);
          ALPHABET_LESSONS[alphaIdx].letters.forEach(l => addToSRS(`${l.upper} ${l.lower}`, l.translit, 'letter'));
          ALPHABET_LESSONS[alphaIdx].readingDrills.forEach(d => addToSRS(d.word, d.correct, 'word'));
          setGems(g => g + 50);
          setScreen('MAP');
        } else if (quizContext === 'GRAMMAR_FOUNDATION') {
          const unit = GRAMMAR_FOUNDATION_UNITS[grammarIdx];
          if (unit && !completedGrammar.includes(unit.id)) setCompletedGrammar(p => [...p, unit.id]);
          setXp(x => x + 30);
          setGems(g => g + 25);
          setScreen('MAP');
        } else if (quizContext === 'LISTENING') {
          setMatchPairs(shuffle(UNITS_DATA[unitIdx].words).map(x => ({ ru: x.ru, tr: x.tr })));
          setDonePairs([]);
          setScreen('MATCH');
        } else if (quizContext === 'UNIT_FINAL') {
          const mod = UNITS_DATA[unitIdx];
          setGems(g => g + 50);
          if (mod.levelGroup === 'A1') {
            // A1 seviyesinde hikaye/Türkçeleştirme sınavı yok — ünite doğrudan tamamlanır.
            if (!completedUnits.includes(mod.id)) setCompletedUnits(p => [...p, mod.id]);
            mod.words.forEach(w => addToSRS(w.ru, w.tr, 'word'));
            // Bu ünite bir hikayenin son ünitesiyse (10. ünite → kontrol noktası 1,
            // 6. ünite → A1 bölüm finali...) hikaye modülü OTOMATİK açılır.
            const s = storyTriggeredAtUnit(mod.unitNumber);
            if (s && !completedStories.includes(s.id)) { openCheckpointStory(s); return; }
            setScreen('MAP');
          } else {
            // A1 dışındaki her ünitede: ünite, kelimelerle bağlantılı bir hikaye + Türkçeleştirme sınavıyla biter.
            // Ünite ancak bu sınavdan minimum %90 (⚡ ultra: %95) alınca tamamlanmış sayılır (SRS'e ekleme de o an yapılır).
            startUnitStory();
          }
        } else if (quizContext === 'SRS_REVIEW') {
          setScreen('MAP');
        } else if (quizContext === 'MARATHON') {
          setGems(g => g + 40);
          setScreen('MAP');
        } else if (quizContext === 'WEAKSPOT') {
          setGems(g => g + 35);
          setScreen('MAP');
          setActiveTab('MISTAKES');
        } else {
          setScreen('MAP');
          setActiveTab('MISTAKES');
        }
      }
    } else {
      const reason = (q as any).review ? 'Kalıcı Tekrarda Unutuldu (eski ünite)' : quizContext === 'LISTENING' ? 'Dinleme Hatası' : quizContext === 'REVIEW' ? 'Tekrar Testinde Yine Yanlış' : quizContext === 'ALPHA_FINAL' ? 'Alfabe Sınavı Hatası' : quizContext === 'GRAMMAR_FOUNDATION' ? 'Cümle Temeli Hatası' : quizContext === 'SRS_REVIEW' ? 'Aralıklı Tekrarda Unutuldu' : quizContext === 'MARATHON' ? 'Karma Maratonda Unutuldu' : quizContext === 'WEAKSPOT' ? 'Zayıf Nokta Testinde Yine Yanlış' : 'Sınav Hatası';
      addMistake(q.ru, q.tr, reason);
      if (quizContext === 'SRS_REVIEW' || quizContext === 'MARATHON' || (q as any).review) {
        // Unutulan kelime kutu 1'e geri düşer: yarın tekrar sorulacak (kalıcı hafıza mantığının kalbi)
        setSrsBank(prev => prev.map(item => item.ru === q.ru ? { ...item, box: 1, nextReview: Date.now() + srsIntervalFor(1) * DAY_MS } : item));
      }
      // KALICI ÖĞRENME — YENİDEN SORMA KURALI: yanlışlanan soru sınavın SONUNA
      // (şıkları yeniden karılarak) bir kez daha eklenir. "Doğrusu buymuş" deyip
      // geçmek yetmez; aynı bilgi sınav bitmeden bir kez daha GERİ ÇAĞRILMALIDIR.
      // ⚡ ULTRA MOD: soru 1 değil 2 KEZ geri gelir — kaybetmek yok, öğrenmek var.
      const maxRequeue = isUltraMode() ? 2 : 1;
      const rqCount = (q as any).requeueCount || 0;
      if (rqCount < maxRequeue && (quizContext === 'UNIT_FINAL' || quizContext === 'LISTENING' || quizContext === 'ALPHA_FINAL' || quizContext === 'GRAMMAR_FOUNDATION')) {
        setQuizQuestions(prev => [...prev, { ...q, options: shuffle([...(q.options as string[])]), requeued: true, requeueCount: rqCount + 1 }]);
      }
      setFeedback({ isError: true, message: `❌ Yanlış cevap. Doğrusu: "${q.correct}" — bu soru sınav sonunda TEKRAR gelecek!${isUltraMode() ? ' (⚡ ULTRA: 2 kez)' : ''}` });
    }
  };

  // ==========================================
  // 🧭 ROTA + 🕸️ 3D AĞ + ⚡ KURTARMA TESTİ YARDIMCILARI
  // ==========================================
  // Rotadan bir gramer ünitesine atla (ör. zayıf çıkan "geçmiş zaman" ünitesi)
  const openGrammarById = (grammarUnitId: string) => {
    const gi = GRAMMAR_FOUNDATION_UNITS.findIndex(g => g.id === grammarUnitId);
    if (gi === -1) return;
    setGrammarIdx(gi);
    setActiveTab('MAP');
    setFeedback(null);
    setScreen('GRAMMAR');
  };

  // 3D ağda kırmızı/zayıf düğüme tıklanınca: 1 dakikalık hedefli kurtarma testi
  const startRescue = (t: RescueTarget) => {
    stopEdgeSpeech();
    setRescueTarget(t);
    setActiveTab('MAP');
    setScreen('RESCUE');
  };

  // Kurtarma testi bitti: geçildiyse kelimenin SRS kutusu yükselir (ağda yeşile döner),
  // kronik hata sayacı düşer; geçilemediyse kutu 1'e iner (yarın tekrar sorulur).
  const finishRescue = (r: RescueResult) => {
    const t = rescueTarget;
    if (t?.kind === 'word' && t.ru) {
      const ru = t.ru;
      if (r.passed) {
        setSrsBank(prev => prev.map(item => {
          if (item.ru !== ru) return item;
          const newBox = Math.min(item.box + 1, 5);
          return { ...item, box: newBox, nextReview: Date.now() + srsIntervalFor(newBox) * DAY_MS };
        }));
        setErrorStats(prev => {
          const cur = prev[ru];
          if (!cur) return prev;
          const next = { ...prev };
          if (cur.count <= 2) delete next[ru]; else next[ru] = { ...cur, count: cur.count - 2 };
          return next;
        });
        setMistakes(prev => prev.filter(m => m.ru !== ru));
        setXp(x => x + 15);
        setGems(g => g + 5);
      } else {
        setSrsBank(prev => prev.map(item => item.ru === ru ? { ...item, box: 1, nextReview: Date.now() + srsIntervalFor(1) * DAY_MS } : item));
      }
    } else if (t?.kind === 'skill' && r.passed) {
      setXp(x => x + 15);
      setGems(g => g + 5);
    }
    setRescueTarget(null);
    setScreen('GRAPH');
  };

  // 🃏 KART EVİ — kart modlarından gelen Leitner oyları: bildi → kutu yükselir,
  // bilemedi → kutu 1'e düşer (yarın geri döner). Havuzda olmayan kelime önce eklenir.
  const handleSrsGrade = (ru: string, tr: string, good: boolean) => {
    setSrsBank(prev => {
      const box1 = good ? 2 : 1;
      if (!prev.some(i => i.ru === ru)) {
        return [...prev, { ru, tr, box: box1, nextReview: Date.now() + srsIntervalFor(box1) * DAY_MS, type: 'word' as const }];
      }
      return prev.map(item => {
        if (item.ru !== ru) return item;
        const box = good ? Math.min(item.box + 1, 5) : 1;
        return { ...item, box, nextReview: Date.now() + srsIntervalFor(box) * DAY_MS };
      });
    });
  };

  // ⌨️ KLAVYE KISAYOLLARI: 1-4 tuşları test ekranlarındaki şıkları seçer
  // (QUIZ tüm bağlamlarda + dinle&seç TOPIC_TEST). Girdi alanlarında devre dışıdır.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key < '1' || e.key > '4') return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const i = Number(e.key) - 1;
      if (screen === 'QUIZ') {
        const q = quizQuestions[quizIdx];
        if (q && q.options && q.options[i] !== undefined) handleQuizAnswer(q.options[i]);
      } else if (screen === 'TOPIC_TEST' && !topicQDone) {
        const q = topicQs[topicQIdx];
        if (q && q.options[i] !== undefined) handleTopicAnswer(q.options[i]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // 🔊 KELİME KARTI OTOMATİK SESLENDİRME: kart her değiştiğinde Rusça kelime
  // otomatik okunur (kapatılabilir). Kulak + göz aynı anda çalışır.
  useEffect(() => {
    if (screen !== 'FLASHCARD' || !autoSpeak) return;
    const w = UNITS_DATA[unitIdx]?.words[cardIdx];
    if (!w) return;
    const t = setTimeout(() => { speak(w.ru); }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, unitIdx, cardIdx, autoSpeak]);

  // 🗓️ GÜNÜN KELİMESİ: tarihin deterministik hash'i ile her gün TÜM havuzdan
  // farklı bir kelime seçilir — herkes aynı gün aynı kelimeyi görür.
  const wordOfDay = useMemo(() => {
    const d = todayStr();
    let h = 0;
    for (let i = 0; i < d.length; i++) h = (h * 31 + d.charCodeAt(i)) >>> 0;
    return ALL_WORDS[h % ALL_WORDS.length];
  }, []);

  // 🔤/📖 AYRIMI: gerçek alfabe dersleri (ilk 16) ile tematik okuma pratiği ayrı sayılır
  const coreAlphaIds = new Set(ALPHABET_LESSONS.slice(0, CORE_ALPHA_LESSON_COUNT).map(l => l.id));
  const coreAlphaDone = completedAlpha.filter(id => coreAlphaIds.has(id)).length;
  const readingLessonsDone = completedAlpha.length - coreAlphaDone;

  // STİLLER
  const containerStyle: React.CSSProperties = { maxWidth: '720px', margin: '0 auto', padding: '16px' };
  const cardBox: React.CSSProperties = { background: '#1e293b', borderRadius: '16px', padding: '24px', border: '1px solid #334155', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' };
  const primaryBtn: React.CSSProperties = { width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(59,130,246,0.4)', transition: 'transform 0.1s' };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ÜST İLERLEME & İSTATİSTİK BARI (DUOLINGO TARZI) */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: '#1e293b', borderBottom: '1px solid #334155', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => { setScreen('MAP'); setActiveTab('MAP'); }}>
          <span style={{ fontSize: '24px' }}>🇷🇺</span>
          <span style={{ fontWeight: 900, fontSize: '16px', color: '#38bdf8', letterSpacing: '0.5px' }}>RUSÇA AKADEMİSİ</span>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontWeight: 800, fontSize: '14px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button onClick={() => { setActiveTab('MAP'); setScreen('SPEAK'); }} style={{ background: 'transparent', border: 'none', color: '#34d399', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }} title="Günlük ağız ödevi — tekerleme + hızlı kelime/cümle zincirleri; hız ve akıcılık ölçülür">🗣️ Konuşma</button>
          <button onClick={() => { setActiveTab('MAP'); setScreen('MOCK'); }} style={{ background: 'transparent', border: 'none', color: '#22d3ee', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }} title="Seviye denemeleri — süreli karma sınav (şıklı/eşleştirmeli/yazma) + günlük mini deneme">📝 Denemeler</button>
          <button onClick={() => { setActiveTab('MAP'); setScreen('CARDS'); }} style={{ background: 'transparent', border: 'none', color: '#f59e0b', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }} title="Kart Evi — klasik çevir-çalış, yıldırım 60sn, üretim (yazma) ve eşleştirme kartları">🃏 Kartlar</button>
          <button onClick={() => { setActiveTab('MAP'); setScreen('ROUTE'); }} style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }} title="Çözdüğün sorulardan çıkarılan zaman/edat eksik haritası ve kişisel rota">🧭 Rotam</button>
          <button onClick={() => { setActiveTab('MAP'); setScreen('GRAPH'); }} style={{ background: 'transparent', border: 'none', color: '#22d3ee', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }} title="Bildiğin kelimelerin 3D ağı — unutulmak üzere olanlar kırmızı yanar">🕸️ Kelime Ağı</button>
          <button onClick={() => { setActiveTab('MAP'); setScreen('SHORTS'); }} style={{ background: 'transparent', border: 'none', color: '#fb923c', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }} title="Hatalarına özel AI üretimi 15-30 saniyelik dikey mikro dersler">🎬 Koç Akışı</button>
          <button onClick={() => { setActiveTab('METHODS'); setScreen('MAP'); }} style={{ background: 'transparent', border: 'none', color: '#a78bfa', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }}>📚 Yöntemler</button>
          <button onClick={() => { setActiveTab('CONNECTIONS'); setScreen('MAP'); }} style={{ background: 'transparent', border: 'none', color: '#f472b6', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }}>🕸️ Hikaye Bağları</button>
          <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>🔥 {streak}</span>
          <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>💎 {gems}</span>
          <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>⚡ {xp} XP</span>
          <button
            onClick={() => setUltraMode(!ultra)}
            title={ultra
              ? '⚡ ULTRA MOD AÇIK — barajlar: çeviri %95, dinleme %90, kapı 9/10; kalıcı tekrar dozu ×1.6; yanlış soru 2 kez geri gelir; SRS aralıkları sıkı (1-2-4-8-14 gün); XP ×1.5. Kapatmak için tıkla.'
              : 'ULTRA MOD kapalı — açınca tüm sınavlar zorlaşır ama XP ×1.5 olur. Açmak için tıkla.'}
            style={{
              padding: '5px 10px', borderRadius: '999px', cursor: 'pointer', fontWeight: 900, fontSize: '11px',
              border: ultra ? '1px solid #f97316' : '1px solid #475569',
              background: ultra ? 'linear-gradient(135deg, #f97316, #ef4444)' : 'transparent',
              color: ultra ? '#fff' : '#64748b',
              boxShadow: ultra ? '0 0 14px rgba(249,115,22,0.5)' : 'none',
            }}
          >{ultra ? '⚡ ULTRA' : 'ultra kapalı'}</button>
        </div>
      </div>

      {/* İLERLEME ÇUBUĞU */}
      <div style={{ background: '#0f172a', height: '6px', width: '100%' }}>
        <div style={{ background: 'linear-gradient(90deg, #3b82f6, #10b981)', height: '100%', width: `${progressPercent}%`, transition: 'width 0.3s' }} />
      </div>

      <div style={containerStyle}>

        {/* ANA HARİTA GÖRÜNÜMÜ */}
        {screen === 'MAP' && activeTab === 'MAP' && (
          <div>
            <SceneBanner icon="🇷🇺" color="#38bdf8" label="Rusça Akademisi — Alfabeden Dizi Seviyesine" />

            {/* 🗓️ GÜNÜN KELİMESİ — tarihe göre deterministik seçilir, dinlenebilir */}
            <div style={{ ...cardBox, marginBottom: '16px', border: '1px solid #f59e0b55', background: 'linear-gradient(135deg, rgba(245,158,11,0.12), #1e293b)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '30px' }}>🗓️</div>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', letterSpacing: '0.5px' }}>GÜNÜN KELİMESİ</div>
                  <div style={{ fontSize: '24px', fontWeight: 900, marginTop: '2px' }}>{wordOfDay.ru}</div>
                  <div style={{ fontSize: '13px', color: '#94a3b8' }}>{wordOfDay.reading} — <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{wordOfDay.tr}</span> <span style={{ color: '#64748b' }}>({wordOfDay.level})</span></div>
                  <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '6px' }}>💡 {wordOfDay.usageNote}</div>
                </div>
                <button onClick={() => speak(wordOfDay.ru)} style={{ padding: '14px 18px', borderRadius: '50%', background: '#f59e0b', border: 'none', color: '#0f172a', cursor: 'pointer', fontSize: '20px' }} title="Dinle">🔊</button>
              </div>
            </div>

            {/* 📋 GÜNLÜK AKILLI PLAN — vadesi gelen SRS + zayıf kelimeler + sıradaki adım */}
            <div style={{ ...cardBox, marginBottom: '16px', border: '1px solid #22c55e55' }}>
              <div style={{ fontWeight: 900, marginBottom: '10px' }}>📋 Bugünün Planı — unutmadan tekrar et</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <button onClick={startSRSReview} disabled={dueSRS.length === 0}
                  style={{ padding: '12px', borderRadius: '12px', border: '1px solid #334155', background: dueSRS.length > 0 ? 'rgba(245,158,11,0.15)' : '#0f172a', color: '#e2e8f0', cursor: dueSRS.length > 0 ? 'pointer' : 'default', textAlign: 'left', opacity: dueSRS.length > 0 ? 1 : 0.5 }}>
                  <div style={{ fontWeight: 900, fontSize: '14px' }}>📅 Aralıklı tekrar</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{dueSRS.length > 0 ? `${dueSRS.length} kelimenin vadesi geldi — şimdi tekrar et!` : 'Bugün vadesi gelen kelime yok 🎉'}</div>
                </button>
                <button onClick={startWeakspotQuiz} disabled={weakWords.length === 0}
                  style={{ padding: '12px', borderRadius: '12px', border: '1px solid #334155', background: weakWords.length > 0 ? 'rgba(249,115,22,0.15)' : '#0f172a', color: '#e2e8f0', cursor: weakWords.length > 0 ? 'pointer' : 'default', textAlign: 'left', opacity: weakWords.length > 0 ? 1 : 0.5 }}>
                  <div style={{ fontWeight: 900, fontSize: '14px' }}>🎯 Zayıf noktalar</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{weakWords.length > 0 ? `${weakWords.length} kronik kelime seni bekliyor` : 'Kronik hatan yok — harika!'}</div>
                </button>
                <button onClick={() => { setActiveTab('MAP'); setScreen('SPEAK'); }}
                  style={{ padding: '12px', borderRadius: '12px', border: '1px solid #10b98155', background: speechDoneCount >= todaysSpeechDrills.length ? 'rgba(16,185,129,0.18)' : 'rgba(16,185,129,0.08)', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontWeight: 900, fontSize: '14px' }}>🗣️ Ağız ödevi {speechDoneCount >= todaysSpeechDrills.length ? '✅' : ''}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                    {speechDoneCount >= todaysSpeechDrills.length
                      ? 'Bugünkü ses antrenmanı bitti — yarın yenisi gelir!'
                      : `${todaysSpeechDrills.length} hızlı söyleyiş görevi var (${speechDoneCount} bitti) — ezber değil, TEMPO!`}
                  </div>
                </button>
                <div style={{ padding: '12px', borderRadius: '12px', border: '1px solid #334155', background: 'rgba(56,189,248,0.12)', textAlign: 'left' }}>
                  <div style={{ fontWeight: 900, fontSize: '14px' }}>{aiLearningFocus.icon} Sıradaki adım</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{aiLearningFocus.title} <span style={{ color: '#64748b' }}>({aiLearningFocus.pathPosition}/{aiLearningFocus.pathTotal})</span> — haritada seni bekliyor ⬇️</div>
                </div>
              </div>
            </div>

            {/* ⚡ ULTRA ÖĞRENME MERKEZİ — 📝 deneme sınavları + 🃏 kart evi + ultra zorluk modu */}
            <div style={{ ...cardBox, marginBottom: '16px', border: `1px solid ${ultra ? '#f97316' : '#22d3ee'}55`, background: ultra ? 'linear-gradient(135deg, rgba(249,115,22,0.14), #1e293b)' : 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(245,158,11,0.06), #1e293b)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <div style={{ fontWeight: 900 }}>⚡ Ultra Öğrenme Merkezi {ultra && <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: 'linear-gradient(135deg,#f97316,#ef4444)', padding: '3px 8px', borderRadius: '999px', marginLeft: '6px' }}>ULTRA AKTİF · XP ×1.5</span>}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <button onClick={() => { setActiveTab('MAP'); setScreen('MOCK'); }} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #22d3ee55', background: 'rgba(34,211,238,0.12)', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontWeight: 900, fontSize: '14px', color: '#22d3ee' }}>📝 Deneme Sınavları</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>A1→C1/C2 + GENEL: süreli 6 bölümlü karma sınav — ⌨️ yazma bölümü dahil</div>
                </button>
                <button onClick={() => { setActiveTab('MAP'); setScreen('CARDS'); }} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #f59e0b55', background: 'rgba(245,158,11,0.1)', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontWeight: 900, fontSize: '14px', color: '#f59e0b' }}>🃏 Kart Evi</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>4 mod: klasik çevir-çalış · ⚡ yıldırım 60sn · ✍️ üretim yazma (ZOR) · 🔗 eşleştirme</div>
                </button>
                <button onClick={() => { setActiveTab('MAP'); setScreen('SPEAK'); }} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #10b98155', background: 'rgba(16,185,129,0.1)', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontWeight: 900, fontSize: '14px', color: '#34d399' }}>🗣️ Ağız Jimnastiği</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Günlük ses ödevi ({speechDoneCount}/{todaysSpeechDrills.length}) — tekerleme + hız zincirleri; ezber DEĞİL tempo</div>
                </button>
                <button onClick={() => setUltraMode(!ultra)} style={{ padding: '12px', borderRadius: '12px', border: `1px solid ${ultra ? '#f97316' : '#475569'}`, background: ultra ? 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(239,68,68,0.15))' : '#0f172a', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ fontWeight: 900, fontSize: '14px', color: ultra ? '#fb923c' : '#94a3b8' }}>⚡ Ultra Mod: {ultra ? 'AÇIK' : 'KAPALI'}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{ultra ? 'Barajlar yükseldi (%95/%90/9-10), tekrarlar sıkılaştı, yanlış soru 2 kez geri geliyor — karşılığında XP ×1.5!' : 'Açınca tüm sınavlar zorlaşır, tekrarlar sıklaşır, XP ×1.5 olur'}</div>
                </button>
              </div>
            </div>

            {/* SESLİ YAPAY ZEKA KOÇU — kullanıcının ilerlemesine göre günlük konuşma/çeviri/telaffuz tekrarı */}
            <div style={{ ...cardBox, marginBottom: '24px', border: '1px solid #38bdf8', background: 'linear-gradient(135deg, rgba(56,189,248,0.18), rgba(168,85,247,0.12), #1e293b)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '58px', height: '58px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '30px', background: 'radial-gradient(circle at 30% 20%, #e0f2fe, #38bdf8 50%, #1d4ed8)', boxShadow: '0 12px 25px rgba(56,189,248,0.22)', position: 'relative' }}>
                    🪐
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#7dd3fc', fontWeight: 900 }}>YENİ • GEZEGEN KOÇ • SESLİ TÜRKÇE AI</div>
                    <div style={{ fontSize: '20px', fontWeight: 950, marginTop: '2px' }}>Bulunduğun üniteye göre günlük konuşma</div>
                    <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.5 }}>Öğrenme Yolu Ünite 1 → {PATH.length} içinde kaldığın karta göre; Rusça söyleme, dinlediğini çevirme ve telaffuz kontrolü.</div>
                  </div>
                </div>
                <button onClick={() => { setFeedback(null); setActiveTab('MAP'); setScreen('AI_TUTOR'); }} style={{ background: 'linear-gradient(135deg, #38bdf8, #22c55e)', border: 'none', color: '#07111f', padding: '13px 18px', borderRadius: '12px', fontWeight: 950, cursor: 'pointer', boxShadow: '0 10px 25px rgba(34,197,94,0.22)' }}>
                  🪐 Sesli Koça Git
                </button>
              </div>
            </div>

            {/* GÜNLÜK ARALIKLI TEKRAR (SPACED REPETITION) KARTI — KALICI HAFIZANIN KALBİ */}
            {srsBank.length > 0 && (
              <div style={{ ...cardBox, marginBottom: '24px', border: dueSRS.length > 0 ? '1px solid #f59e0b' : '1px solid #334155', background: dueSRS.length > 0 ? 'linear-gradient(135deg, rgba(245,158,11,0.15), #1e293b)' : '#1e293b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800 }}>📅 BUGÜNÜN ARALIKLI TEKRARLARI</div>
                    <div style={{ fontSize: '20px', fontWeight: 900, marginTop: '2px' }}>{dueSRS.length > 0 ? `${dueSRS.length} kelime/harf hatırlanmayı bekliyor!` : 'Bugün için tekrar yok, harika gidiyorsun! ✅'}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Toplam {srsBank.length} kelime/harf uzun süreli hafıza takibinde.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {dueSRS.length > 0 && (
                      <button onClick={startSRSReview} style={{ background: '#f59e0b', border: 'none', color: '#0f172a', padding: '12px 18px', borderRadius: '10px', fontWeight: 900, cursor: 'pointer' }}>▶️ Tekrarı Başlat</button>
                    )}
                    {completedUnits.length > 0 && (
                      <button onClick={startMarathon} style={{ background: 'transparent', border: '2px solid #a78bfa', color: '#a78bfa', padding: '10px 16px', borderRadius: '10px', fontWeight: 900, cursor: 'pointer' }} title="Tamamlanmış TÜM ünitelerden rastgele 15 soru — vadesi gelmese bile her kelime sorulabilir!">🔀 Karma Maraton</button>
                    )}
                  </div>
                </div>
                {completedUnits.length > 0 && (
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '10px', borderTop: '1px dashed #334155', paddingTop: '8px' }}>
                    🧠 <b>Kalıcı öğrenme motoru açık:</b> Bir üniteyi %100 bitirsen bile kelimeleri emekli olmaz — sonraki her ünitenin sınavına "🔁 KALICI TEKRAR" soruları olarak karışır (1-2-3-5-8-13-21 ünite geriden + tüm geçmişten rastgele) ve yarısı ters yönde (TR → RU) sorulur.
                  </div>
                )}
              </div>
            )}

            {/* HİKAYE MODÜLÜ UYARISI — 10 ünitelik kontrol noktası tamamlandıysa ve hikaye henüz
                okunmadıysa üstte göz alıcı bir kartla hatırlatılır (otomatik açılış kaçırılsa bile). */}
            {pendingCheckpointStory && (
              <div style={{ ...cardBox, marginBottom: '24px', border: '1px solid #f59e0b', background: 'linear-gradient(135deg, rgba(245,158,11,0.18), rgba(217,70,239,0.10))' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800 }}>📖 HİKAYE MODÜLÜ AÇILDI — {pendingCheckpointStory.unitFrom}-{pendingCheckpointStory.unitTo}. ÜNİTELER TAMAMLANDI!</div>
                    <div style={{ fontSize: '19px', fontWeight: 900, marginTop: '2px' }}>{pendingCheckpointStory.icon} {pendingCheckpointStory.titleTr}</div>
                    <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
                      {pendingCheckpointStory.kind === 'levelFinal'
                        ? `🎬 BÖLÜM FİNALİ (${pendingCheckpointStory.levelId} sonu): özetin TAMAMEN doğru olması + Seviye Tekrar Sınavı gerekiyor. Tamamlanana kadar ${pendingCheckpointStory.nextLevelId} bölümü kilitli kalır!`
                        : 'Son 10 ünitede öğrendiğin kelimelerle yazılmış hikaye + 6 yeni kelime + Türkçe özet sınavı. Skorun kadar XP kazanılır!'}
                    </div>
                  </div>
                  <button onClick={() => openCheckpointStory(pendingCheckpointStory)} style={{ background: '#f59e0b', border: 'none', color: '#0f172a', padding: '12px 18px', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '14px' }}>
                    ▶️ Hikayeyi Aç
                  </button>
                </div>
              </div>
            )}

            {/* İLERLEME ÖZET KARTI */}
            <div style={{ ...cardBox, marginBottom: '24px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>GENEL KURS İLERLEMESİ</div>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#38bdf8', marginTop: '2px' }}>%{progressPercent} Tamamlandı</div>
              </div>
              <button onClick={() => setActiveTab('MISTAKES')} style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 14px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>
                🚨 Unutulanlar ({mistakes.length})
              </button>
            </div>

            {/* BAŞA SARMA / İLERLEMEYİ SIFIRLAMA */}
            <div style={{ textAlign: 'right', marginBottom: '24px' }}>
              {!showResetConfirm ? (
                <button onClick={() => setShowResetConfirm(true)} style={{ background: 'transparent', border: '1px solid #475569', color: '#94a3b8', padding: '8px 14px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}>
                  ⏮️ Tüm İlerlemeyi Sıfırla / Baştan Başla
                </button>
              ) : (
                <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid #ef4444', borderRadius: '12px', padding: '14px', display: 'inline-flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                  <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '13px' }}>Emin misin? XP, seri, elmas ve tüm tamamlanan dersler silinecek!</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setShowResetConfirm(false)} style={{ background: '#334155', border: 'none', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Vazgeç</button>
                    <button onClick={resetProgress} style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>Evet, Sıfırla</button>
                  </div>
                </div>
              )}
            </div>

            {/* TEK MÜFREDAT YOLU — "Aşama 1/2/3" gruplandırması YOK: Ünite 1 → {PATH.length} ard arda tek sıra.
                Tüm kartlar aynı renkli ünite kartı tasarımını kullanır; seviye etiketleri LEVEL_COLORS ile renklendirilir. */}
            <div>
              <div style={{ ...cardBox, padding: '14px 18px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 900 }}>🗺️ Öğrenme Yolu</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>Ünite 1'den {PATH.length}'e kadar tek sıra — her kart, bir önceki bitince açılır.</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700 }}>
                    🔤 {coreAlphaDone}/{CORE_ALPHA_LESSON_COUNT} alfabe • 📖 {readingLessonsDone}/{ALPHABET_LESSONS.length - CORE_ALPHA_LESSON_COUNT} okuma pratiği • 🧩 {completedGrammar.length}/{GRAMMAR_FOUNDATION_UNITS.length} cümle temeli • 🎧 {completedTopics.length}/{TOPICS_100_TOTAL} dinleme • 📚 {completedUnits.length}/{UNITS_DATA.length} ünite • 📕 {completedStories.length}/{STORIES.length} hikaye
                  </div>
                </div>
                {/* Seviye sıçrama çipleri + ses testi */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {LEVELS.map(lv => (
                    <button key={lv} onClick={() => levelRefs.current[lv]?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{
                      background: '#0f172a', border: `1px solid ${LEVEL_COLORS[lv]}55`, borderRadius: '8px', padding: '5px 10px',
                      cursor: 'pointer', color: LEVEL_COLORS[lv], fontWeight: 900, fontSize: '11px'
                    }}>{lv}</button>
                  ))}
                  <span style={{ flex: 1 }} />
                  <button onClick={() => { setSoundTest('idle'); speak('Алло! Здравствуйте! Это голос теста. Хорошего дня!', 0.85, () => setSoundTest('ok'), () => setSoundTest('error')); }} style={{ background: '#0f172a', border: '1px solid #475569', color: '#e2e8f0', padding: '5px 10px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer', fontSize: '11px' }}>
                    🔊 Ses Testi
                  </button>
                  {soundTest === 'ok' && <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>✅ Ses çalışıyor</span>}
                  {soundTest === 'error' && <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 800 }}>❌ Ses yok</span>}
                </div>
              </div>

              {/* Yol kartları — her 10. müfredat ünitesinin hemen ardından bir HİKAYE KONTROL
                  NOKTASI kartı gelir (kilitli/açık/tamamlanlı durumlarıyla). */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {PATH.map((step, pos) => {
                  const done = isStepDone(step);
                  const unl = isStepUnlocked(pos);
                  const lv = stepLevel(step);
                  let color: string, icon: string, title: string, desc: string, kindTag: string;
                  if (step.kind === 'alpha') {
                    const les = ALPHABET_LESSONS[step.lessonIdx];
                    const isCoreAlpha = step.lessonIdx < CORE_ALPHA_LESSON_COUNT;
                    color = ALPHA_BANNER_COLORS[step.lessonIdx % ALPHA_BANNER_COLORS.length];
                    // Gerçek harf dersi: harf ikonlu ALFABE kartı. Tematik ders: 📖 OKUMA PRATİĞİ
                    // (kelime öğrenme — müfredat aralarına serpiştirilmiştir, alfabe DEĞİLDİR).
                    icon = isCoreAlpha ? les.letters[0].upper : '📖';
                    title = les.title;
                    desc = les.subtitle;
                    kindTag = isCoreAlpha ? '🔤 ALFABE' : '📖 OKUMA PRATİĞİ';
                  } else if (step.kind === 'grammar') {
                    const g = GRAMMAR_FOUNDATION_UNITS[step.grammarIdx];
                    color = g.color;
                    icon = g.icon;
                    title = g.title;
                    desc = g.description;
                    kindTag = '🧩 CÜMLE TEMELİ';
                  } else if (step.kind === 'topic') {
                    const t = TOPICS_100[step.topicIdx];
                    const cat = topicCatInfo(t.cat);
                    color = t.cat === 'mufredat' && t.levelGroup ? LEVEL_COLORS[t.levelGroup] : cat.color;
                    icon = t.icon;
                    title = t.titleTr;
                    desc = t.cat === 'mufredat' ? 'Ünitenin kelimelerine dinleyerek ön hazırlık' : t.descTr;
                    kindTag = t.cat === 'harf' ? '🎧 HARF DİNLEME' : t.cat === 'fonetik' ? '🎧 FONETİK DİNLEME' : '🎧 ÖN HAZIRLIK';
                  } else {
                    const mod = UNITS_DATA[step.unitIdx];
                    color = mod.color;
                    icon = mod.icon;
                    title = mod.title;
                    desc = mod.description;
                    kindTag = '📚 MÜFREDAT';
                  }
                  // Bu ünite bir hikayenin (kontrol noktası ya da bölüm finali) sonuncusuysa hikaye kartı da çiz.
                  const cpStory = step.kind === 'unit' ? storyTriggeredAtUnit(UNITS_DATA[step.unitIdx].unitNumber) : undefined;
                  return (
                    <React.Fragment key={pos}>
                    <div ref={el => { if (pos === LEVEL_ANCHORS[lv]) levelRefs.current[lv] = el; }} onClick={() => { if (unl) openStep(step); }} style={{
                      ...cardBox, cursor: unl ? 'pointer' : 'not-allowed', opacity: unl ? 1 : 0.5,
                      border: `1px solid ${done ? '#10b981' : unl ? color : '#334155'}`, position: 'relative', overflow: 'hidden', scrollMarginTop: '84px'
                    }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: 900, flexShrink: 0 }}>
                          {done ? '✅' : unl ? icon : '🔒'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '10px', fontWeight: 900, background: '#0f172a', color: LEVEL_COLORS[lv], padding: '2px 6px', borderRadius: '4px' }}>{lv} - ÜNİTE {pos + 1}</span>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b' }}>{kindTag}</span>
                          </div>
                          <div style={{ fontWeight: 800, fontSize: '17px' }}>{title}</div>
                          <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '2px' }}>{desc}</div>
                        </div>
                      </div>
                    </div>
                    {cpStory && (() => {
                      const sDone = storyDone(cpStory);
                      const sUnl = isStoryUnlocked(cpStory, completedUnitsCount);
                      const isFinal = cpStory.kind === 'levelFinal';
                      const spanLen = cpStory.unitTo - cpStory.unitFrom + 1;
                      const sProgress = Math.max(0, Math.min(spanLen, completedUnitsCount - cpStory.unitFrom + 1));
                      return (
                        <div onClick={() => { if (sUnl) openCheckpointStory(cpStory); }} style={{
                          ...cardBox, cursor: sUnl ? 'pointer' : 'not-allowed', opacity: sUnl ? 1 : 0.55,
                          border: `1px solid ${sDone ? '#10b981' : sUnl ? (isFinal ? '#fbbf24' : '#f59e0b') : '#334155'}`,
                          background: sUnl && !sDone
                            ? (isFinal ? 'linear-gradient(135deg, rgba(251,191,36,0.20), rgba(239,68,68,0.10))' : 'linear-gradient(135deg, rgba(245,158,11,0.16), rgba(217,70,239,0.10))')
                            : '#1e293b',
                          position: 'relative', overflow: 'hidden'
                        }}>
                          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: sDone ? '#10b981' : sUnl ? (isFinal ? 'linear-gradient(135deg, #fbbf24, #ef4444)' : 'linear-gradient(135deg, #f59e0b, #d946ef)') : '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>
                              {sDone ? '✅' : sUnl ? (isFinal ? '🎬' : '📖') : '🔒'}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '10px', fontWeight: 900, background: '#0f172a', color: sDone ? '#10b981' : sUnl ? (isFinal ? '#fbbf24' : '#f59e0b') : '#64748b', padding: '2px 6px', borderRadius: '4px' }}>
                                  {isFinal ? `🎬 ${cpStory.levelId} BÖLÜM FİNALİ` : `KONTROL NOKTASI ${cpStory.checkpoint}`}
                                </span>
                                <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b' }}>{isFinal ? '🔒 KAPILI: özet %100 + seviye sınavı' : '📖 HİKAYE & ÖZET'}</span>
                              </div>
                              <div style={{ fontWeight: 800, fontSize: '17px' }}>{cpStory.titleTr} <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 700 }}>— {cpStory.titleRu}</span></div>
                              <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '2px' }}>
                                {sUnl
                                  ? (isFinal
                                      ? `⚠️ ${cpStory.nextLevelId} bölümü bu final tamamlanana kadar KİLİTLİ • ${cpStory.newWords.length} yeni kelime + eski kelimeler tekrarı`
                                      : `Ünite ${cpStory.unitFrom}-${cpStory.unitTo} kelimeleriyle yazıldı • ${cpStory.newWords.length} yeni kelime • özet + analiz`)
                                  : (isFinal
                                      ? `${cpStory.levelId} bölümü tamamlandığında açılır (${sProgress}/${spanLen} ünite)`
                                      : `Ünite ${cpStory.unitFrom}-${cpStory.unitTo} tamamlandığında açılır (${sProgress}/${spanLen} ünite)`)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* KALICI HAFIZA YÖNTEMLERİ — BİLİMSEL AÇIKLAMA VE UYGULAMA REHBERİ */}
        {activeTab === 'METHODS' && (
          <div style={cardBox}>
            <button onClick={() => setActiveTab('MAP')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', marginBottom: '12px' }}>← Haritaya Dön</button>
            <SceneBanner icon="🧠" color="#a78bfa" label="Kalıcı Hafıza Rehberi" />
            <h2 style={{ marginTop: 0, color: '#a78bfa' }}>Öğrendiklerin Nasıl Kalıcı Hale Gelir?</h2>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.7' }}>
              Beynimiz yeni bir bilgiyi ilk gördüğünde onu "kısa süreli hafızaya" koyar. Eğer o bilgiyle doğru zamanlarda, doğru şekilde tekrar karşılaşmazsan, birkaç gün içinde <b>%80'e kadarı unutulur</b> (buna "unutma eğrisi" denir). Bu uygulama, seni bu eğriyle savaşacak şekilde otomatik olarak kurgulandı. İşte kullandığımız ve senin de bilerek uygulaman gereken yöntemler:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
              {[
                { icon: '📅', title: '1. Aralıklı Tekrar (Spaced Repetition) — UYGULAMA OTOMATİK YAPIYOR', text: 'Öğrendiğin her kelime/harf otomatik olarak bir "kutuya" girer. Doğru hatırladıkça bir sonraki tekrar 1 gün → 3 gün → 7 gün → 16 gün → 35 gün sonraya ertelenir. Yanlış hatırlarsan kutu sıfırlanır. Bu, hiçbir şeyi tam unutmadan tam da unutmaya yaklaştığın anda hatırlatarak kalıcı hafızaya kazımanın bilimsel yoludur. TEK YAPMAN GEREKEN: Ana ekrandaki "📅 Bugünün Tekrarları" kartını HER GÜN kontrol etmek ve asla ertelememek.' },
                { icon: '🎯', title: '2. Aktif Hatırlama (Active Recall)', text: 'Bir kelime kartını çevirmeden ÖNCE, cevabı zihninden tahmin etmeye çalış. Sadece "okumak" değil, "hatırlamaya çalışmak" hafızayı güçlendirir. Bu yüzden uygulamada kartları çevirmeden önce mutlaka kendine sor: "Bunun anlamı neydi?"' },
                { icon: '🔊', title: '3. Sesli Tekrar / Gölgeleme (Shadowing)', text: 'Her kelimenin ve dizi repliğinin yanındaki 🔊 butonuna bas, sesi dinle, DURDUR ve aynı tonlamayla yüksek sesle kendin tekrar et. Sadece görsel değil, işitsel ve kas hafızası (ağzının hareketi) da devreye girince kalıcılık çok artar. Bunu her yeni kelimede en az 2 kez yap.' },
                { icon: '🎬', title: '4. Bağlamsal / Duygusal Kodlama (Elaborative Encoding)', text: 'Kelimeyi tek başına değil, dizi sahnesindeki duygusal bağlamıyla (kavga, itiraf, kutlama) hatırlamaya çalış. Beyin, izole bilgilerden çok HİKAYE ve DUYGUYA bağlı bilgileri çok daha uzun süre saklar. Bu yüzden her ünitede önce sahneyi izliyorsun — o sahneyi hayal ederek kelimeyi hatırlamaya çalış.' },
                { icon: '🔀', title: '5. Karışık Pratik (Interleaving)', text: '"Unutulanlar" ve "Aralıklı Tekrar" oturumları FARKLI ünitelerdeki kelimeleri birbirine karıştırarak sorar. Aynı konuyu art arda çalışmak yerine karışık çalışmak, beyni her seferinde "hangi kelimeydi bu?" diye gerçekten düşünmeye zorlar — bu da kalıcılığı artırır.' },
                { icon: '🗣️', title: '6. Öğretme Tekniği (Feynman Yöntemi)', text: 'Öğrendiğin bir gramer kuralını (örneğin akanje kuralını) kendi cümlelerinle, sanki hiç Rusça bilmeyen birine anlatıyormuş gibi yüksek sesle veya yazarak anlatmayı dene. Bir şeyi başkasına açıklayabiliyorsan, gerçekten öğrenmişsindir.' },
                { icon: '🎯', title: '7. Üretici Pratik > Pasif Tanıma (Klavyesiz Versiyon)', text: 'Kelimeyi görmeden ÖNCE anlamını zihninden tahmin etmeye çalışmak, sadece okumaktan çok daha güçlüdür. "Hızlı Tanıma Testi" ekranı bunu klavyeye ihtiyaç duymadan sağlar: kelimeyi görüyorsun, cevabı aklından üretiyorsun, sonra 4 seçenek arasından doğrusunu buluyorsun. Kâğıda/klavyeye yazmak isteğe bağlıdır, hafızada kalıcılık için şart değildir.' },
                { icon: '🐰', title: '8. Anlaşılır Girdi (Comprehensible Input) — Смешарики (Smeshariki) Yöntemi', text: 'Dil edinimindeki en güçlü yöntemlerden biri, seviyenin biraz altındaki ama tamamen anlaşılır içeriği bol bol dinlemektir (Krashen\'in "i+1" hipotezi). Смешарики gerçek Rus çocuklarının bile ilk izlediği çizgi dizidir: kısa cümleler, yavaş tempo, net telaffuz. Her A1/A2 ünitesinin sonunda çıkan "🐰 Смешарики Sahnesi" bu yüzden var: önce basit bir örnek diyalogla ısın, sonra "Gerçek Bölümü Aç" butonuyla YouTube\'da o karakterlerin GERÇEK bölümünü izle. Anlamadığın kelimeler olsa bile durma, akışı takip et — beyin devam ede ede örüntüleri kendi kendine çözer.' },
                { icon: '🔁', title: '9. Aynı İçeriği Tekrar İzleme (Repeated Viewing)', text: 'Bir Смешарики bölümünü bir kez izlemek yetmez. Aynı bölümü 2-3 gün arayla tekrar izlediğinde, ilk seferde kaçırdığın kelimeleri fark edersin — çünkü artık o kelimeler uygulamada öğrendiğin kelimeler haline geldi. Bu, pasif izlemeyi aktif bir "tanıma tatmini"ne çevirir ve kalıcılığı ciddi şekilde artırır.' },
                { icon: '😴', title: '10. Uyku ve Hafıza Pekiştirmesi', text: 'Kısa süreli hafızadaki bilginin uzun süreli hafızaya "kaydedilmesi" büyük ölçüde UYKU sırasında gerçekleşir. Yeni bir üniteyi akşam bitirip hemen ardından uyumak, o bilgiyi sabaha kalıcılaştırma ihtimalini belirgin şekilde artırır.' },
                { icon: '🎧', title: `11. Kulağı Alıştırma — ${TOPICS_100_TOTAL} Dinleme Konusu (yolun içinde)`, text: `Gözden önce KULAK öğrenir: Rusçaya maruz kalmak (exposure) beynin ses örüntülerini tanımasını sağlar. Öğrenme yolundaki önce 🧩 cümle temeli kartları (özne-yüklem-edat), sonra 🎧 rozetli kartlar bunu yapar — 33 harf + 8 fonetik konusu ve müfredat ön-hazırlık konuları (ilgili ünitenin hemen öncesinde, yani konuyu duyduktan saniyeler sonra ünitesine girersin). Toplam ${TOPICS_100_TOTAL} konunun her biri kelime kartları odaklıdır: tek tek 🔊 dinle, "Konuyu Dinle" / "Yavaşça Dinle" ile akışa bat, sonra 5 soruluk "dinle & seç" testiyle kanıtla. Günde 3-5 konu dinlemek, 2-3 hafta içinde doğal konuşma hızını kavraman için yeterlidir.` },
                { icon: '📖', title: '12. Hikaye & Özet — Okuma Anlama + Üretici Çıktı (10\'lu kontrol noktaları + bölüm finalleri)', text: 'İki tür hikaye var: (1) Her 10 müfredat ünitesinin sonunda bir HİKAYE KONTROL NOKTASI açılır: o 10 ünitede öğrendiğin kelimelerle yazılmış, içinde en fazla 5-6 yeni kelime olan bir sit-com hikayesi. (2) Her bölümün (A1, A2, B1, B2, C1/C2) sonunda bir BÖLÜM FİNALİ açılır — bunlar KAPILIDIR: özetin TAMAMEN doğru yazılması ve Seviye Tekrar Sınavı\'ndan en az 8/10 (ULTRA modda 9/10!) alınması şarttır; geçmeden sonraki bölüm açılmaz! Hikayeler iki tarzda: Dima\'nın 2035\'te çocuklarına anlattığı HIMYM tadında bölümler VE «Кухня» dizisinden esinlenen mutfak komedileri (Şef Pyotr, garson Lyosha, Nina, Semyon — «Ван Гог» restoranı). Okurken istediğin satırın çevirisini açabilir, yeni kelimeleri sözlük kartlarından, ESKİ kelimeleri "Eski Kelimeler" bölümünden tekrar edersin — çünkü B\'deyken A kelimeleri unutulmasın diye finallere bilerek serpiştirildiler (kalıcı öğrenme!). Ardından en önemli adım: ÖZETİNİ TÜRKÇE YAZ — okuduğunu kendi cümlelerinle yeniden kurmak "üretici çıktı"dır ve pasif tanımadan çok daha güçlü kalıcılaşır. Analiz motoru özetini ana fikirlerle karşılaştırır: kaç doğru nokta yakaladığını, neyi kaçırdığını ve neleri yanlış anladığını söyler. Bölüm finallerinde ayrıca 10 soruluk seviye sınavı vardır: 6 soru bitirilen bölümden, 4 soru önceki bölümlerden. Düşük skor alırsan hikayeyi tekrar oku — ikinci okuma, tıpkı bir sitcom\'u tekrar izlemek gibi, her zaman daha kolaydır.' },
                { icon: '♾️', title: '13. Hiçbir Kelime Emekli Olmaz — Sınav İçi Karma Tekrar (YENİ, OTOMATİK)', text: 'Bir üniteyi %100 doğru bitirsen bile o ünitenin kelimeleri seninle yolculuğa devam eder: SONRAKİ HER ünitenin bitiş sınavına, önceki ünitelerden seçilen 5 adet "🔁 KALICI TEKRAR" sorusu otomatik karışır. Seçim genişleyen aralık ilkesine göre yapılır: 1, 2, 3, 5, 8, 13 ve 21 ünite geriden kelimeler + TÜM geçmişten rastgele örnekler. Araştırmalar (spaced/expanding retrieval) bunun, bilgiyi tam unutma eşiğinde yakalayıp kalıcılaştırdığını gösteriyor. Bu sorularda yanılırsan kelime Aralıklı Tekrar kutusunda 1. kutuya düşer ve ertesi gün yeniden sorulur.' },
                { icon: '🔄', title: '14. Üretim Etkisi (Production Effect) — Ters Yön Soruları (YENİ, OTOMATİK)', text: 'Rusça kelimeyi görüp Türkçesini TANIMAK kolaydır; zor ve asıl kalıcı olan, Türkçesinden Rusçasını GERİ ÇAĞIRMAKTIR. Bu yüzden karma tekrar ve maraton sorularının yarısı ters yönde sorulur: "Tuz kelimesinin Rusçası hangisi?" Beynin cevabı üretmek için harcadığı ekstra çaba (desirable difficulty), izi çok daha derin kazır.' },
                { icon: '🔀', title: '15. Karma Maraton — Kümülatif Rastgele Örnekleme Sınavı (YENİ, İSTEĞE BAĞLI)', text: 'Ana ekrandaki "🔀 Karma Maraton" butonu, tamamladığın TÜM ünitelerin kelime havuzundan rastgele 15 soru çeker — vadesi gelmemiş, çoktan "öğrenilmiş" kelimeler bile her an sorulabilir. Araştırmalar, rastgele örneklenmiş kümülatif testlerin (RST) tüm kelimeleri dengeli biçimde canlı tuttuğunu ve sınav kapsamı büyüdükçe zayıf kelimelerin kendiliğinden ortaya çıktığını gösteriyor. Haftada 2-3 maraton, "eskiden biliyordum" cümlesini sözlüğünden siler.' },
                { icon: '🪜', title: '16. Ardışık Yeniden Öğrenme (Successive Relearning)', text: 'En güçlü kombinasyon: aynı kelimeyi FARKLI oturumlarda, FARKLI biçimlerde tekrar tekrar öğrenme kriterine ulaştırmak. Uygulamada bu döngü hazır: kelimeyi önce kartta görürsün → ünite sınavında tanırsın → sonraki ünitelerin karma tekrarlarında hatırlarsın → Aralıklı Tekrar gününde geri çağırırsın → bölüm finali hikayesinde bağlam içinde okursun. Aynı bilgiye 5 farklı kapıdan girmek, tek kapıdan 5 kez girmekten çok daha kalıcıdır.' }
              ].map((m, i) => (
                <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px' }}>
                  <div style={{ fontSize: '28px', flexShrink: 0 }}>{m.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#a78bfa', marginBottom: '4px' }}>{m.title}</div>
                    <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.6' }}>{m.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', padding: '14px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', fontSize: '13px', color: '#fecaca' }}>
              ⚠️ Not: Bu uygulamada hiçbir yerde Rusça (Kiril) klavyeyle bir şey YAZMAN istenmez — senin isteğin üzerine bilinçli olarak böyle tasarlandı. "Hızlı Tanıma Testi" dahil tüm alıştırmalar seçmeli (dokunmalı) çalışır. Kâğıda harf/kelime yazarak tekrar etme yöntemi de bu listeye dahil edilmedi. Ama merak edersen: motor hafıza (elle yazmak) da faydalıdır, sadece TEK BAŞINA yeterli değildir — yukarıdaki yöntemlerle birleştirilmelidir.
            </div>
          </div>
        )}

        {/* HİKAYE BAĞLANTI HARİTASI — hangi hikaye hangisine bağlanır (ÖZET YOK) */}
        {activeTab === 'CONNECTIONS' && (
          <div style={cardBox}>
            <button onClick={() => setActiveTab('MAP')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', marginBottom: '12px' }}>← Haritaya Dön</button>
            <SceneBanner icon="🕸️" color="#f472b6" label="Hikaye Bağlantı Haritası" />
            <h2 style={{ marginTop: 0, color: '#f472b6' }}>Hangi Hikaye Hangisine Bağlanıyor?</h2>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.7' }}>
              13 hikayenin tamamı <b>tek bir dizi evreninde</b> geçer ve iki anlatı kolu üzerinde ilerler.
              Aşağıda yalnızca hikayelerin <b>birbirine nasıl bağlandığı</b> gösterilir — içerik/özet yoktur, sürpriz bozulmaz.
            </p>

            {/* İKİ ANLATI KOLU */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginTop: '16px' }}>
              <div style={{ background: '#0f172a', border: '1px solid #eab308', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontWeight: 900, color: '#eab308', marginBottom: '8px' }}>🎙️ KOL 1 — HIMYM Çerçevesi</div>
                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.7' }}>
                  Anlatıcı: <b>Dima</b> — 2035 yılında çocuklarına anlatıyor. Bu koldaki her hikaye aynı anlatının bir parçasıdır:
                </div>
                <ul style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: '1.9', margin: '8px 0 0', paddingLeft: '18px' }}>
                  <li>☂️ Sarı Şemsiye <span style={{ color: '#64748b' }}>(A1 Finali — pilot bölüm)</span></li>
                  <li>🌧️ Bölüm 1: Annenizle Nasıl Tanıştım → 🥂 Bölüm 8: Düğün <span style={{ color: '#64748b' }}>(8 kontrol noktası hikayesi, sırayla)</span></li>
                  <li>☂️ Gerçek Hikaye <span style={{ color: '#64748b' }}>(C1/C2 Finali — dizi finali)</span></li>
                </ul>
              </div>
              <div style={{ background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontWeight: 900, color: '#38bdf8', marginBottom: '8px' }}>🍽️ KOL 2 — «Ван Гог» Restoranı («Кухня» tarzı)</div>
                <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.7' }}>
                  Ortak mekân: <b>«Ван Гог» restoranı</b>. Ortak kadro: <b>Şef Pyotr, Lyosha, Nina, Semyon</b>:
                </div>
                <ul style={{ fontSize: '13px', color: '#e2e8f0', lineHeight: '1.9', margin: '8px 0 0', paddingLeft: '18px' }}>
                  <li>🍳 Yeni Garson <span style={{ color: '#64748b' }}>(A2 Finali)</span></li>
                  <li>🍽️ «Ван Гог»ta Akşam Yemeği <span style={{ color: '#64748b' }}>(B1 Finali — crossover)</span></li>
                  <li>🌹 Şefin Akşamı <span style={{ color: '#64748b' }}>(B2 Finali)</span></li>
                </ul>
              </div>
            </div>

            {/* BAĞLANTILAR */}
            <h3 style={{ color: '#f472b6', margin: '22px 0 10px' }}>🔗 Bağlantılar</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '☂️', type: 'MOTİF', color: '#eab308', from: 'Sarı Şemsiye (A1 Finali)', to: 'Gerçek Hikaye (C1/C2 Finali)', why: 'Pilot bölümde ortaya çıkan sarı şemsiyenin sırrı, dizi finalinde çözülür. Aynı nesne iki hikayeyi uçtan uca birbirine bağlar.' },
                { icon: '🎙️', type: 'ANLATICI', color: '#eab308', from: 'Bölüm 1-8 (kontrol noktaları)', to: 'Sarı Şemsiye + Gerçek Hikaye', why: 'Hepsi aynı çerçeve anlatının parçası: Dima 2035\'te çocuklarına anlatıyor. Bölüm 1\'deki soru, ancak dizi finalinde cevaplanır.' },
                { icon: '💙', type: 'KARAKTER', color: '#eab308', from: 'Son Bekâr (Bölüm 7)', to: 'Düğün (Bölüm 8)', why: 'Bölüm 7\'nin sonu, Bölüm 8\'deki düğünün doğrudan hazırlığıdır — aynı çift, aynı olay örgüsü devam eder.' },
                { icon: '📍', type: 'MEKÂN + KADRO', color: '#38bdf8', from: 'Yeni Garson (A2 Finali)', to: '«Ван Гог»ta Akşam Yemeği (B1) → Şefin Akşamı (B2)', why: 'Üç hikaye de aynı restoranda geçer; Şef Pyotr, Lyosha, Nina ve Semyon üçünde de sahnededir. Lyosha\'nın restorandaki yolculuğu A2\'de başlar.' },
                { icon: '🔀', type: 'CROSSOVER', color: '#a78bfa', from: 'HIMYM kadrosu (Bölüm 1-8)', to: '«Ван Гог»ta Akşam Yemeği (B1 Finali)', why: 'İki anlatı kolu burada kesişir: kontrol noktası hikayelerinin karakterleri (Dima, Marina, Tyoma) restoran koluna misafir olur.' },
                { icon: '🍰', type: 'CALLBACK', color: '#38bdf8', from: '«Ван Гог»ta Akşam Yemeği (B1)', to: 'Şefin Akşamı (B2)', why: 'B1 finalindeki meşhur "düşen tatlı" olayı, B2 finalinde hatırlanır ve göndermeyle geri döner.' },
                { icon: '💍', type: 'KARAKTER YAYI', color: '#38bdf8', from: 'Şefin Akşamı (B2 Finali)', to: 'Önceki «Ван Гог» hikayeleri', why: 'Pyotr ile Nina arasındaki çizgi A2\'den beri adım adım örülür ve B2 finalinde doruk noktasına ulaşır.' },
                { icon: '👨‍🍳', type: 'ÜNİTE BAĞI', color: '#10b981', from: 'Aşçılık üniteleri (32-41, 86-96, 135-144, 175-183)', to: '«Ван Гог» hikaye kolu', why: 'Aşçılık ünitelerinin diyalogları da «Ван Гог» mutfağında geçer: Lyosha\'nın çıraklıktan kendi hayaline uzanan yolunu ünite ünite izlersiniz.' }
              ].map((c, i) => (
                <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '26px', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: c.color, letterSpacing: '0.5px', marginBottom: '4px' }}>{c.type}</div>
                    <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '14px', marginBottom: '4px' }}>{c.from} <span style={{ color: c.color }}>⟶</span> {c.to}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.6' }}>{c.why}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '18px', padding: '12px 14px', borderRadius: '10px', background: 'rgba(244,114,182,0.08)', border: '1px solid #f472b6', fontSize: '13px', color: '#fbcfe8' }}>
              💡 Bu haritada bilerek hiçbir olay örgüsü anlatılmaz — bağların tadını hikayeleri sırayla okuyarak çıkarın.
            </div>
          </div>
        )}

        {/* HATA / UNUTULANLAR KÜTÜĞÜ */}
        {activeTab === 'MISTAKES' && (
          <div style={cardBox}>
            <button onClick={() => setActiveTab('MAP')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', marginBottom: '12px' }}>← Haritaya Dön</button>
            {/* 🎯 ZAYIF NOKTALARIM — kronik hata panosu + kişiye özel ek test */}
            <div style={{ background: '#0f172a', borderRadius: '14px', padding: '18px', border: '1px solid #f97316', marginBottom: '22px' }}>
              <h2 style={{ color: '#f97316', marginTop: 0, marginBottom: '6px' }}>🎯 Zayıf Noktalarım</h2>
              <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: 0 }}>
                Burası anlık hata listesi değil, <b>kronik</b> hata panosudur: bir kelimeyi her yanlışladığında sayaç artar,
                zayıf nokta testinde doğru bildiğinde azalır. Sayaç sıfırlanınca kelime panodan düşer — gerçek iyileşme budur.
              </p>
              {weakWords.length === 0 ? (
                <p style={{ color: '#10b981', fontWeight: 700, marginBottom: 0 }}>Kronik zayıf noktan yok — pano tertemiz! 💪</p>
              ) : (
                <>
                  <button onClick={startWeakspotQuiz} style={{ ...primaryBtn, background: '#f97316', boxShadow: '0 4px 14px rgba(249,115,22,0.4)', marginBottom: '16px' }}>
                    🎯 Bana Özel Zayıf Nokta Testi Başlat ({Math.min(weakWords.length, 12)} kelime)
                  </button>
                  {weakWords.slice(0, 15).map(w => {
                    const home = findWordHome(w.ru);
                    const maxCount = weakWords[0].count;
                    const pct = Math.max(8, Math.round((w.count / maxCount) * 100));
                    return (
                      <div key={w.ru} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                          <span style={{ fontWeight: 800, color: '#f8fafc' }}>{w.ru} <span style={{ color: '#94a3b8', fontWeight: 600 }}>— {w.tr}</span></span>
                          <span style={{ color: '#f97316', fontWeight: 900 }}>{w.count}× yanlış</span>
                        </div>
                        <div style={{ height: '7px', background: '#1e293b', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: w.count >= 4 ? '#ef4444' : w.count >= 2 ? '#f97316' : '#facc15', borderRadius: '4px' }} />
                        </div>
                        {home && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>{home.icon} {home.title} • {home.category}</div>}
                      </div>
                    );
                  })}
                  {weakWords.length > 15 && <div style={{ fontSize: '12px', color: '#94a3b8' }}>… ve {weakWords.length - 15} kelime daha (test en kronik olanlardan başlar)</div>}
                </>
              )}
            </div>

            <h2 style={{ color: '#ef4444', marginTop: 0 }}>🚨 Unutulan Kelimeler Kütüğü</h2>
            {mistakes.length === 0 ? <p style={{ color: '#10b981', fontWeight: 700 }}>Harika! Şu an hiç hatanız yok.</p> : (
              <>
                <p style={{ color: '#cbd5e1', fontSize: '13px' }}>Bu kelimeler sen doğru cevaplayana kadar tekrar tekrar karşına çıkacak. Doğru cevapladığında listeden silinir, yanlış cevapladığında listede kalır ve hemen tekrar sorulur.</p>
                <button onClick={startGlobalReview} style={{ ...primaryBtn, background: '#ef4444', boxShadow: '0 4px 14px rgba(239,68,68,0.4)', marginBottom: '20px' }}>🔁 Şimdi Tekrar Et ({mistakes.length})</button>
              </>
            )}
            {mistakes.map(m => (
              <div key={m.id} style={{ background: '#0f172a', padding: '12px', borderRadius: '10px', border: '1px solid #334155', marginBottom: '8px' }}>
                <div style={{ fontWeight: 800, color: '#38bdf8' }}>{m.ru} - {m.tr}</div>
                <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{m.reason}</div>
              </div>
            ))}
          </div>
        )}

        {/* DERS EKRANLARI */}
        {screen !== 'MAP' && activeTab === 'MAP' && (
          <div style={cardBox}>
            <button onClick={() => setScreen('MAP')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', marginBottom: '16px' }}>← {screen === 'AI_TUTOR' ? 'Haritaya Dön' : 'Dersten Çık'}</button>

            {feedback && (
              <div style={{ padding: '14px', borderRadius: '10px', background: feedback.isError ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)', border: `1px solid ${feedback.isError ? '#ef4444' : '#10b981'}`, color: '#fff', marginBottom: '16px', fontWeight: 700 }}>
                {feedback.message}
              </div>
            )}

            {/* 🧭 KİŞİSELLEŞTİRİLMİŞ ÖĞRENİM ROTASI — çözülen sorulardan zaman/edat eksik haritası */}
            {screen === 'ROUTE' && (
              <LearningRoute
                errorStats={errorStats}
                onOpenGrammar={openGrammarById}
                onStartRescue={startRescue}
                onOpenShorts={() => setScreen('SHORTS')}
              />
            )}

            {/* 🕸️ 3D KELİME AĞI — bildiklerin bölüm/teknik/seviye bağlarıyla; unutulanlar kırmızı */}
            {screen === 'GRAPH' && (
              <WordGraph3D
                srsBank={srsBank}
                errorStats={errorStats}
                completedUnits={completedUnits}
                onStartRescue={startRescue}
              />
            )}

            {/* 🎬 KOÇ AKIŞI — hatalara özel AI üretimi 15-30 sn dikey mikro dersler */}
            {screen === 'SHORTS' && <CoachShorts errorStats={errorStats} />}

            {/* ⚡ HIZLI KURTARMA TESTİ — 3D ağda tıklanan kırmızı/zayıf düğüme 60 sn hedefli test */}
            {screen === 'RESCUE' && rescueTarget && (
              <RescueTest
                target={rescueTarget}
                speak={(t, r) => { void speak(t, r); }}
                onFinish={finishRescue}
                onExit={() => { setRescueTarget(null); setScreen('GRAPH'); }}
              />
            )}

            {/* 📝 DENEME SINAVLARI — tamamlanan ünitelerden süreli, 6 bölümlü karma sınav */}
            {screen === 'MOCK' && (
              <MockExamScreen
                completedUnits={completedUnits}
                onXp={n => setXp(x => x + n)}
                onMistake={addMistake}
                onRecordResult={recordWordResult}
              />
            )}

            {/* 🃏 KART EVİ — klasik / yıldırım / üretim-yazma / eşleştirme kart modları */}
            {screen === 'CARDS' && (
              <FlashcardArena
                completedUnits={completedUnits}
                dueSrs={dueSRS}
                onXp={n => setXp(x => x + n)}
                onMistake={addMistake}
                onSrsGrade={handleSrsGrade}
                onRecordResult={recordWordResult}
              />
            )}

            {/* 🗣️ AĞIZ JİMNASTİĞİ — günlük hız odaklı konuşma ödevi (ezber değil tempo) */}
            {screen === 'SPEAK' && (
              <SpeechGym
                completedUnits={completedUnits}
                onXp={n => setXp(x => x + n)}
                onRecordResult={recordWordResult}
              />
            )}

            {screen === 'AI_TUTOR' && (
              <AiTutor
                completedUnits={completedUnits}
                completedTopics={completedTopics}
                completedAlpha={completedAlpha}
                completedGrammar={completedGrammar}
                learningFocus={aiLearningFocus}
                mistakes={mistakes}
                srsBank={srsBank}
                addMistake={addMistake}
                addToSRS={addToSRS}
                onEarnXp={(amount) => setXp(x => x + amount)}
              />
            )}

            {/* CÜMLE TEMELLERİ — alfabeden sonra gelen özne/yüklem/edat mini üniteleri */}
            {screen === 'GRAMMAR' && (() => {
              const g = GRAMMAR_FOUNDATION_UNITS[grammarIdx];
              if (!g) return null;
              const done = completedGrammar.includes(g.id);
              const pathPos = PATH.findIndex(s => s.kind === 'grammar' && s.grammarIdx === grammarIdx) + 1;
              const prevStep = pathPos > 1 ? PATH[pathPos - 2] : null;
              const nextStep = pathPos < PATH.length ? PATH[pathPos] : null;
              return (
                <div>
                  <SceneBanner icon={g.icon} color={g.color} label={`Ünite ${pathPos} • Cümle Temeli`} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 900, background: '#0f172a', color: g.color, padding: '2px 8px', borderRadius: '4px' }}>{g.levelGroup} • ALFABEDEN SONRA GRAMER</span>
                      <h2 style={{ marginTop: '8px', marginBottom: '4px', fontSize: '22px' }}>{g.title}</h2>
                      <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: 0, lineHeight: 1.6 }}>{g.description}</p>
                    </div>
                    {done && <span style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#10b981', padding: '6px 12px', borderRadius: '10px', fontWeight: 900, fontSize: '12px' }}>✅ Tamamlandı</span>}
                  </div>

                  <div style={{ background: '#0f172a', padding: '18px', borderRadius: '12px', border: `1px solid ${g.color}66`, margin: '16px 0', fontSize: '14px', lineHeight: '1.7' }}>
                    <div style={{ fontSize: '12px', color: g.color, fontWeight: 900, marginBottom: '6px' }}>ANA FİKİR</div>
                    {g.coreConcept}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px', marginBottom: '18px' }}>
                    {g.keyPoints.map((point, i) => (
                      <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px 14px', lineHeight: 1.55 }}>
                        <div style={{ fontSize: '11px', color: g.color, fontWeight: 900, marginBottom: '4px' }}>KURAL {i + 1}</div>
                        <div style={{ fontSize: '13px', color: '#e2e8f0' }}>{point}</div>
                      </div>
                    ))}
                  </div>

                  {g.changeRules && g.changeRules.length > 0 && (
                    <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
                      <div style={{ fontSize: '12px', color: '#fbbf24', fontWeight: 900, marginBottom: '8px' }}>🔁 NEYE GÖRE DEĞİŞİR?</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {g.changeRules.map((rule, i) => (
                          <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px' }}>
                            <div style={{ fontWeight: 900, color: '#fbbf24', marginBottom: '4px' }}>{rule.label}</div>
                            <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.55 }}>{rule.explanation}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                              {rule.examples.map((ex, j) => (
                                <span key={j} style={{ fontSize: '12px', color: '#e2e8f0', background: '#1e293b', border: '1px solid #334155', borderRadius: '999px', padding: '4px 9px' }}>{ex}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 800, marginBottom: '8px' }}>ÖRNEK CÜMLELER — özne / yüklem / edat parçalarına ayrılmış:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                    {g.examples.map((ex, i) => (
                      <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                          <div>
                            <div style={{ fontSize: '18px', fontWeight: 900 }}>{ex.ru}</div>
                            <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '2px' }}>/{ex.reading}/</div>
                            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '3px' }}>{ex.tr}</div>
                          </div>
                          <button onClick={() => speak(ex.ru, 0.8)} style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }} title="Cümleyi dinle">🔊</button>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                          {ex.subject && <span style={{ fontSize: '11px', fontWeight: 800, color: '#93c5fd', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.45)', padding: '4px 8px', borderRadius: '8px' }}>Özne: {ex.subject}</span>}
                          {ex.predicate && <span style={{ fontSize: '11px', fontWeight: 800, color: '#fcd34d', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.45)', padding: '4px 8px', borderRadius: '8px' }}>Yüklem: {ex.predicate}</span>}
                          {ex.preposition && <span style={{ fontSize: '11px', fontWeight: 800, color: '#c4b5fd', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.45)', padding: '4px 8px', borderRadius: '8px' }}>Edat: {ex.preposition}</span>}
                        </div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', lineHeight: 1.5 }}>💡 {ex.note}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: '12px', padding: '14px', marginBottom: '18px' }}>
                    <div style={{ fontSize: '12px', color: '#86efac', fontWeight: 900, marginBottom: '8px' }}>✅ HIZLI KONTROL LİSTESİ</div>
                    <ol style={{ margin: 0, paddingLeft: '18px', color: '#d1fae5', fontSize: '13px', lineHeight: 1.7 }}>
                      {g.miniChecklist.map((item, i) => <li key={i}>{item}</li>)}
                    </ol>
                  </div>

                  <button onClick={startGrammarQuiz} style={{ ...primaryBtn, background: g.color, boxShadow: `0 4px 14px ${g.color}55`, color: '#0f172a' }}>
                    🧠 4 Soruluk Kontrol Testine Geç →
                  </button>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                    {prevStep && (
                      <button onClick={() => openStep(prevStep)} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#334155', border: 'none', color: '#cbd5e1', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>
                        ← Ünite {pathPos - 1}
                      </button>
                    )}
                    {nextStep && (
                      <button onClick={() => { if (isStepUnlocked(pathPos)) openStep(nextStep); }} disabled={!isStepUnlocked(pathPos)} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: isStepUnlocked(pathPos) ? '#334155' : '#1e293b', border: 'none', color: isStepUnlocked(pathPos) ? '#cbd5e1' : '#475569', fontWeight: 800, cursor: isStepUnlocked(pathPos) ? 'pointer' : 'not-allowed', fontSize: '13px' }}>
                        {isStepUnlocked(pathPos) ? `Ünite ${pathPos + 1} →` : `🔒 Ünite ${pathPos + 1}`}
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* 100 KONU — KONU DETAYI (sesli dinleme + test) */}
            {/* Format BİREBİR ünitelerle aynı: KELİMELER + CÜMLELER + SAHNE/DİYALOG. */}
            {screen === 'TOPIC' && currentTopic && (() => {
              const cat = topicCatInfo(currentTopic.cat);
              const relatedUnit = currentTopic.unitId ? UNITS_DATA.find(u => u.id === currentTopic.unitId) : undefined;
              const relatedIdx = relatedUnit ? UNITS_DATA.indexOf(relatedUnit) : -1;
              const relatedStepPos = relatedIdx >= 0 ? UNIT_PATH_POS[relatedIdx] - 1 : -1;
              const relatedUnlocked = relatedStepPos >= 0 && isStepUnlocked(relatedStepPos);
              const srcUnits = topicSourceUnits(currentTopic).slice(0, 4);
              const isSyllable = currentTopic.cat === 'fonetik' && currentTopic.items.every(i => i.ru.length <= 4);
              const pathPos = TOPIC_PATH_POS[topicIdx]; // yoldaki global "ÜNİTE N" numarası
              const prevStep = pathPos > 1 ? PATH[pathPos - 2] : null;
              const nextStep = pathPos < PATH.length ? PATH[pathPos] : null;
              return (
                <div>
                  <SceneBanner icon={cat.icon} color={cat.color} label={`Ünite ${pathPos} • Dinleme Konusu — ${cat.label.split(' (')[0]}`} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                        {currentTopic.levelGroup && (
                          <span style={{ fontSize: '11px', fontWeight: 900, background: `${LEVEL_COLORS[currentTopic.levelGroup]}22`, color: LEVEL_COLORS[currentTopic.levelGroup], border: `1px solid ${LEVEL_COLORS[currentTopic.levelGroup]}`, padding: '2px 8px', borderRadius: '6px' }}>{currentTopic.levelGroup} • MÜFREDAT ÖN HAZIRLIK</span>
                        )}
                      </div>
                      <h2 style={{ marginTop: 0, marginBottom: '2px' }}>{currentTopic.titleTr}</h2>
                      {currentTopic.titleRu && <div style={{ fontSize: '15px', color: cat.color, fontWeight: 800 }}>{currentTopic.titleRu}</div>}
                      <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '6px', lineHeight: '1.6' }}>{currentTopic.descTr}</p>
                      {srcUnits.length > 0 && (
                        <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                          {srcUnits.map(vid => {
                            const ui = sourceUnitInfo(vid);
                            if (!ui) return null;
                            const uIdx = UNITS_DATA.findIndex(u => u.id === vid);
                            return (
                              <span key={vid} style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', background: '#0f172a', border: '1px solid #334155', padding: '2px 7px', borderRadius: '6px' }}>
                                {ui.icon} Ünite {uIdx >= 0 ? UNIT_PATH_POS[uIdx] : ui.num} · {ui.level}
                              </span>
                            );
                          })}
                          <span style={{ fontSize: '10px', color: '#475569' }}>örneklerin geldiği üniteler</span>
                        </div>
                      )}
                    </div>
                    {currentTopicDone && (
                      <span style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#10b981', padding: '6px 12px', borderRadius: '10px', fontWeight: 900, fontSize: '12px', whiteSpace: 'nowrap' }}>✅ Konu Tamamlandı</span>
                    )}
                  </div>

                  {/* 🎚️ Dinleme hızı — kelime bozulmadan yavaşlat/hızlandır (perde korumalı) */}
                  <div style={{ marginTop: '18px' }}>
                    <ListenSpeedControl speed={listenSpeed} onChange={setListenSpeed} />
                  </div>

                  {/* SESLİ DİNLEME BUTONLARI — kulağı alıştırmanın kalbi */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '0 0 18px' }}>
                    <button onClick={playTopicNormal} style={{ flex: 1, minWidth: '150px', padding: '14px', borderRadius: '12px', background: '#3b82f6', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 900, cursor: 'pointer' }}>🎧 Konuyu Dinle</button>
                    <button onClick={playTopicSlow} style={{ flex: 1, minWidth: '150px', padding: '14px', borderRadius: '12px', background: '#8b5cf6', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 900, cursor: 'pointer' }}>🐢 Yavaşça Dinle</button>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '12px', marginTop: '-8px', marginBottom: '18px' }}>İpucu: dinlerken aynı sözleri yüksek sesle tekrarla (gölgeleme / shadowing) — kulağın bu konuda en hızlı gelişir.</p>

                  {/* KELİME LİSTESİ — her kelimenin kendi 🔊 butonu + seviye etiketi var */}
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, marginBottom: '8px' }}>
                    {isSyllable ? 'HECELER & SESLER' : 'KELİMELER'} — yanındaki 🔊 ile sesini dinle:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '10px', marginBottom: '22px' }}>
                    {currentTopic.items.map((it, i) => (
                      <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 900, fontSize: '16px' }}>{it.ru}</span>
                            {it.level && (
                              <span style={{ fontSize: '9px', fontWeight: 900, color: LEVEL_COLORS[it.level], border: `1px solid ${LEVEL_COLORS[it.level]}66`, padding: '1px 5px', borderRadius: '4px' }}>{it.level}</span>
                            )}
                          </div>
                          <div style={{ fontSize: '12px', color: '#38bdf8' }}>{it.reading}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{it.tr}</div>
                        </div>
                        <button onClick={() => speak(it.ru, 0.8)} style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }} title="Dinle">🔊</button>
                      </div>
                    ))}
                  </div>

                  {/* CÜMLELER — ünitelerdeki sentences bloğuyla aynı format */}
                  {currentTopic.sentences.length > 0 && (
                    <>
                      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, marginBottom: '8px' }}>CÜMLELER — dinle, durdur ve aynen tekrarla:</div>
                      {currentTopic.sentences.map((s, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px 14px', marginBottom: '8px' }}>
                          <button onClick={() => speak(s.ru, 0.8)} style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }} title="Cümleyi dinle">🔊</button>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: '1.5' }}>{s.ru}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>{s.tr}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* SAHNE / DİYALOG — ünitelerdeki dialogue bloğuyla aynı format */}
                  {currentTopic.dialogue.length > 0 && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>🎬 SAHNE / DİYALOG — her satırı dinle ve rol yap:</div>
                        <button onClick={() => speak(currentTopic.dialogue.map(d => d.ru).join(' '), 0.8)} style={{ background: '#7c3aed', border: 'none', color: '#fff', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 800 }}>
                          🎧 Diyaloğu Dinle
                        </button>
                      </div>
                      {currentTopic.dialogue.map((d, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: i % 2 === 0 ? 'rgba(59,130,246,0.07)' : 'rgba(139,92,246,0.07)', border: '1px solid #334155', borderRadius: '12px', padding: '12px 14px', marginBottom: '8px' }}>
                          <div style={{ flexShrink: 0 }}>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: i % 2 === 0 ? '#60a5fa' : '#a78bfa', background: '#0f172a', border: `1px solid ${i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}55`, padding: '3px 8px', borderRadius: '8px' }}>{d.speaker}</span>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: '1.5' }}>{d.ru}</div>
                            <div style={{ fontSize: '12px', color: '#38bdf8' }}>{d.reading}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{d.tr}</div>
                          </div>
                          <button onClick={() => speak(d.ru, 0.8)} style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }} title="Satırı dinle">🔊</button>
                        </div>
                      ))}
                    </>
                  )}

                  {/* İLGİLİ MÜFREDAT ÜNİTESİ — müfredat ön-hazırlık konularında */}
                  {relatedUnit && (
                    <div style={{ ...cardBox, padding: '14px 18px', margin: '18px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', border: `1px solid ${relatedUnlocked ? `${LEVEL_COLORS[relatedUnit.levelGroup]}88` : '#334155'}` }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>🔗 BU KONUNUN MÜFREDAT ÜNİTESİ</div>
                        <div style={{ fontWeight: 800, fontSize: '15px', marginTop: '4px' }}>
                          {relatedUnit.icon} Ünite {relatedStepPos + 1}: {relatedUnit.title}{' '}
                          <span style={{ color: LEVEL_COLORS[relatedUnit.levelGroup], fontSize: '11px', fontWeight: 900 }}>({relatedUnit.levelGroup})</span>
                        </div>
                      </div>
                      <button
                        onClick={() => { if (relatedUnlocked) openStep(PATH[relatedStepPos]); }}
                        disabled={!relatedUnlocked}
                        style={{ background: relatedUnlocked ? LEVEL_COLORS[relatedUnit.levelGroup] : '#334155', color: relatedUnlocked ? '#0f172a' : '#64748b', border: 'none', padding: '10px 16px', borderRadius: '10px', fontWeight: 900, cursor: relatedUnlocked ? 'pointer' : 'not-allowed', fontSize: '13px' }}
                      >
                        {relatedUnlocked ? '▶️ Ünitede Çalış' : '🔒 Ünite Kilitli'}
                      </button>
                    </div>
                  )}

                  <button onClick={startTopicTest} style={{ ...primaryBtn, background: '#14b8a6', boxShadow: '0 4px 14px rgba(20,184,166,0.4)', marginTop: '14px' }}>
                    ▶️ Teste Başla (5 Soruluk "Dinle & Seç") →
                  </button>

                  {/* ÖNCEKİ / SONRAKİ ADIM — tek yol üzerinde gezinme (sonraki adım, bu konu bitince açılır) */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                    {prevStep && (
                      <button onClick={() => openStep(prevStep)} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#334155', border: 'none', color: '#cbd5e1', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>
                        ← Ünite {pathPos - 1}
                      </button>
                    )}
                    {nextStep && (
                      <button onClick={() => { if (isStepUnlocked(pathPos)) openStep(nextStep); }} disabled={!isStepUnlocked(pathPos)} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: isStepUnlocked(pathPos) ? '#334155' : '#1e293b', border: 'none', color: isStepUnlocked(pathPos) ? '#cbd5e1' : '#475569', fontWeight: 800, cursor: isStepUnlocked(pathPos) ? 'pointer' : 'not-allowed', fontSize: '13px' }}>
                        {isStepUnlocked(pathPos) ? `Ünite ${pathPos + 1} →` : `🔒 Ünite ${pathPos + 1}`}
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* 100 KONU — "DİNLE & SEÇ" TESTİ */}
            {screen === 'TOPIC_TEST' && currentTopic && (() => {
              const cat = topicCatInfo(currentTopic.cat);
              const q = topicQs[topicQIdx];
              if (topicQDone) {
                const percent = topicQs.length ? Math.round((topicQCorrect / topicQs.length) * 100) : 0;
                const passed = percent >= topicPassPct();
                return (
                  <div style={{ textAlign: 'center' }}>
                    <SceneBanner icon={passed ? '🏆' : '🎧'} color={passed ? '#10b981' : '#f59e0b'} label={`Ünite ${TOPIC_PATH_POS[topicIdx]} — Test Sonucu`} />
                    <div style={{ fontSize: '52px', fontWeight: 900, color: passed ? '#10b981' : '#f59e0b', margin: '24px 0 8px' }}>%{percent}</div>
                    <p style={{ color: '#cbd5e1', fontSize: '14px' }}>{topicQs.length} sorudan {topicQCorrect} tanesini doğru yanıtladın. Geçmek için en az %{topicPassPct()} gerekiyor{isUltraMode() ? ' (⚡ ULTRA barajı)' : ''}.</p>
                    {passed && (
                      <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>📅 Konudaki {Math.min(currentTopic.items.length, 8)} kelime otomatik olarak Aralıklı Tekrar havuzuna eklendi.</p>
                    )}
                    {passed ? (
                      <>
                        <p style={{ color: '#10b981', fontWeight: 800, fontSize: '15px' }}>✅ Konu tamamlandı! +20 XP ve +12 elmas kazandın. Kulağın bu konuya alıştı.</p>
                        {(() => {
                          const pathPos = TOPIC_PATH_POS[topicIdx];
                          const nextStep = pathPos < PATH.length ? PATH[pathPos] : null;
                          return (
                            <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                              {nextStep && (
                                <button onClick={() => openStep(nextStep)} style={{ ...primaryBtn, flex: 1, width: 'auto', background: '#10b981', boxShadow: '0 4px 14px rgba(16,185,129,0.4)' }}>▶ Ünite {pathPos + 1}'e Devam Et →</button>
                              )}
                              <button onClick={() => setScreen('MAP')} style={{ background: '#334155', border: 'none', color: '#cbd5e1', padding: '16px 20px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', fontSize: '16px' }}>Haritaya Dön</button>
                            </div>
                          );
                        })()}
                      </>
                    ) : (
                      <>
                        <p style={{ color: '#f59e0b', fontWeight: 800, fontSize: '15px' }}>🐢 Barajı geçemedin. Konuyu bir kez daha dinle (özellikle yavaş modu), sonra testi tekrar et — kulak alıştıkça kolaylaşır.</p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
                          <button onClick={() => setScreen('TOPIC')} style={{ flex: 1, minWidth: '160px', padding: '14px', borderRadius: '12px', background: '#8b5cf6', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 900, cursor: 'pointer' }}>🎧 Konuyu Tekrar Dinle</button>
                          <button onClick={startTopicTest} style={{ flex: 1, minWidth: '160px', padding: '14px', borderRadius: '12px', background: '#ef4444', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 900, cursor: 'pointer' }}>🔁 Testi Tekrar Et</button>
                        </div>
                      </>
                    )}
                  </div>
                );
              }
              if (!q) return null;
              return (
                <div>
                  <SceneBanner icon={cat.icon} color={cat.color} label={`🎧 Dinle & Seç — Soru ${topicQIdx + 1}/${topicQs.length}`} />
                  <ListenSpeedControl speed={listenSpeed} onChange={setListenSpeed} />
                  <div style={{ background: '#0f172a', padding: '30px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0' }}>
                    <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '16px' }}>{q.prompt}</div>
                    <button onClick={() => speak(q.audio, 0.8)} style={{ padding: '18px 26px', borderRadius: '50%', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '28px' }}>🔊</button>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '12px' }}>Ses otomatik çaldı; istersen tekrar dokun. Doğru yazıyı seç — kulak ayırt etmeli.</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {q.options.map((opt, i) => (
                      <button key={i} onClick={() => handleTopicAnswer(opt)} style={{ padding: '16px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '15px' }}><span style={{ opacity: 0.35, fontSize: '11px', marginRight: '6px' }}>{i + 1}</span>{opt}</button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* HARF EKRANI — Sade yapı: HARF → SES İPUCU → NET KURAL → 1-2 ÖRNEK KELİME */}
            {screen === 'ALPHA' && (
              <div>
                {(() => {
                  const l = ALPHABET_LESSONS[alphaIdx].letters[letterIdx];
                  const lesColor = ALPHA_BANNER_COLORS[alphaIdx % ALPHA_BANNER_COLORS.length];
                  return (
                    <div>
                      <SceneBanner icon={`${ALPHABET_LESSONS[alphaIdx].letters[0].upper}${ALPHABET_LESSONS[alphaIdx].letters[0].lower}`} color={lesColor} label={ALPHABET_LESSONS[alphaIdx].title} />
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 800 }}>HARF {letterIdx + 1} / {ALPHABET_LESSONS[alphaIdx].letters.length}</div>

                      {/* 1) HARF */}
                      <div style={{ background: '#0f172a', padding: '26px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0 12px' }}>
                        <div style={{ fontSize: '84px', fontWeight: 900, color: '#3b82f6', lineHeight: 1.1 }}>{l.upper} {l.lower}</div>
                        <button onClick={() => speak(l.upper)} style={{ padding: '8px 18px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 800, marginTop: '14px' }}>🔊 Harfi Dinle</button>
                      </div>

                      {/* 2) SES İPUCU */}
                      <div style={{ background: '#0f172a', padding: '14px 16px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#38bdf8', background: '#1e293b', border: '1px solid #38bdf855', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>SES İPUCU</span>
                        <span style={{ fontWeight: 800, fontSize: '16px' }}>/{l.translit}/ — {l.soundHint}</span>
                      </div>

                      {/* 3) NET FONETİK KURAL */}
                      <div style={{ background: '#0f172a', padding: '14px 16px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#f59e0b', background: '#1e293b', border: '1px solid #f59e0b55', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>KURAL</span>
                        <span style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: '1.5' }}>{l.phoneticRule}</span>
                      </div>

                      {/* 4) 1-2 TEMEL ÖRNEK KELİME */}
                      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, margin: '8px 0 8px' }}>ÖRNEK KELİMELER</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '18px' }}>
                        {l.examples.map((ex, i) => (
                          <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px 14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontWeight: 900, fontSize: '18px', color: '#10b981' }}>{ex.ru}</span>
                              <button onClick={() => speak(ex.ru, 0.8)} style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '6px 9px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', flexShrink: 0 }}>🔊</button>
                            </div>
                            <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '2px' }}>/{ex.reading}/</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{ex.tr}</div>
                          </div>
                        ))}
                      </div>

                      <button onClick={startAlphaCheck} style={primaryBtn}>Devam Et →</button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* HARF ANLIK TANIMA TESTİ (her harften sonra tekrar tekrar sorulur) */}
            {screen === 'ALPHA_CHECK' && alphaCheckQ && (
              <div>
                <SceneBanner icon={`${ALPHABET_LESSONS[alphaIdx].letters[0].upper}${ALPHABET_LESSONS[alphaIdx].letters[0].lower}`} color={ALPHA_BANNER_COLORS[alphaIdx % ALPHA_BANNER_COLORS.length]} label="⚡ Anlık Harf Testi" />
                <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800 }}>⚡ ANLIK TEST — Doğru cevap verene kadar devam edemezsin!</div>
                {alphaCheckQ.type === 'listen' ? (
                  <div style={{ background: '#0f172a', padding: '30px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0' }}>
                    <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '14px' }}>{alphaCheckQ.prompt}</div>
                    <button onClick={() => speak(alphaCheckQ.correct.split(' ')[0])} style={{ padding: '18px 26px', borderRadius: '50%', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '28px' }}>🔊</button>
                  </div>
                ) : (
                  <div style={{ background: '#0f172a', padding: '30px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0', fontSize: '18px', fontWeight: 800 }}>
                    {alphaCheckQ.prompt}
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {alphaCheckQ.options.map((opt, i) => (
                    <button key={i} onClick={() => handleAlphaCheckAnswer(opt)} style={{ padding: '16px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>{opt}</button>
                  ))}
                </div>
              </div>
            )}

            {/* HARF GRUBU BİTİNCE OKUMA TESTİ (fonetik kuralları gerçek kelimelerde uygulama) */}
            {screen === 'ALPHA_READING' && (
              <div>
                {(() => {
                  const les = ALPHABET_LESSONS[alphaIdx];
                  const drill = les.readingDrills[readingDrillIdx];
                  return (
                    <div>
                      <SceneBanner icon="📖" color={ALPHA_BANNER_COLORS[alphaIdx % ALPHA_BANNER_COLORS.length]} label="Okuma Testi" />
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 800 }}>📖 OKUMA TESTİ {readingDrillIdx + 1} / {les.readingDrills.length}</div>
                      <p style={{ color: '#94a3b8', fontSize: '13px' }}>Öğrendiğin kuralları gerçek bir kelimede uygula: bu kelime nasıl okunur?</p>
                      <div style={{ background: '#0f172a', padding: '30px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0' }}>
                        <div style={{ fontSize: '48px', fontWeight: 900, color: '#3b82f6' }}>{drill.word}</div>
                        <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '8px' }}>({drill.tr})</div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {readingOptions.map((opt, i) => (
                          <button key={i} onClick={() => handleReadingAnswer(opt)} style={{ padding: '16px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>{opt}</button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* DERS ANLATIM EKRANI */}
            {screen === 'STORY' && (
              <div>
                {(() => {
                  const mod = UNITS_DATA[unitIdx];
                  return (
                    <div>
                      <UnitBanner unitId={mod.id} icon={mod.icon} color={mod.color} label={`${mod.levelGroup} • ${mod.category}`} />
                      <span style={{ fontSize: '11px', fontWeight: 900, background: '#0f172a', color: mod.color, padding: '2px 8px', borderRadius: '4px' }}>ÜNİTE {UNIT_PATH_POS[unitIdx]} GRAMER & İPUÇLARI</span>
                      <h2 style={{ marginTop: '8px', fontSize: '22px' }}>{mod.title}</h2>

                      <div style={{ background: '#0f172a', padding: '18px', borderRadius: '12px', border: '1px solid #334155', margin: '16px 0', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                        {mod.grammarExplain}
                      </div>

                      <button onClick={() => setScreen(mod.dialogue ? 'DIALOG' : 'FLASHCARD')} style={primaryBtn}>
                        {mod.dialogue ? '🎬 Dizi Sahnesini İzle →' : 'Kelime Kartlarına Geç →'}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* DİZİ SAHNESİ EKRANI */}
            {screen === 'DIALOG' && (
              <div>
                {(() => {
                  const mod = UNITS_DATA[unitIdx];
                  return (
                    <div>
                      <UnitBanner unitId={mod.id} icon={mod.icon} color={mod.color} label={mod.sceneTitle || 'Dizi Sahnesi'} />
                      <span style={{ fontSize: '11px', fontWeight: 900, background: '#0f172a', color: mod.color, padding: '2px 8px', borderRadius: '4px' }}>🎬 DİZİ SAHNESİ</span>
                      <h2 style={{ marginTop: '8px', marginBottom: '2px', fontSize: '22px' }}>{mod.sceneTitle}</h2>
                      <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: 0 }}>{mod.sceneContext}</p>

                      {/* 🎚️ Dinleme hızı — kelime bozulmadan yavaşlat/hızlandır (sadece dinleme bölümü) */}
                      <ListenSpeedControl speed={listenSpeed} onChange={setListenSpeed} />

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0' }}>
                        {(mod.dialogue || []).map((line, i) => (
                          <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontWeight: 900, color: mod.color, fontSize: '13px' }}>{line.speaker}</span>
                              <button onClick={() => speak(line.ru)} style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '16px' }}>🔊</button>
                            </div>
                            <div style={{ fontSize: '17px', fontWeight: 800, marginTop: '4px' }}>{line.ru}</div>
                            <div style={{ fontSize: '13px', color: '#38bdf8', marginTop: '2px' }}>/{line.reading}/</div>
                            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px' }}>{line.tr}</div>
                          </div>
                        ))}
                      </div>

                      <button onClick={() => { if (mod.smeshariki) { setSmeshQIdx(0); setFeedback(null); setScreen('SMESHARIKI'); } else { setScreen('FLASHCARD'); } }} style={primaryBtn}>
                        {mod.smeshariki ? (mod.smeshariki.source === 'kukhnya' ? '🍳 Кухня Sahnesiyle Pekiştir →' : '🐰 Смешарики Sahnesiyle Pekiştir →') : 'Kelime Kartlarına Geç →'}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* СМЕШАРИКИ (SMESHARIKI) VİDEO SAHNESİ + ANLAMA SORULARI — Anlaşılır Girdi (Comprehensible Input) yöntemi */}
            {screen === 'SMESHARIKI' && (
              <div>
                {(() => {
                  const mod = UNITS_DATA[unitIdx];
                  const scene = mod.smeshariki;
                  if (!scene) return null;
                  const isK = scene.source === 'kukhnya';
                  const sceneColor = isK ? '#ef4444' : '#fb923c';
                  return (
                    <div>
                      <SceneBanner icon={isK ? '🍳' : '🐰'} color={sceneColor} label={isK ? 'Кухня (Kitchen) Sahnesiyle Pekiştirme' : 'Смешарики (Smeshariki) ile Pekiştirme'} />
                      <span style={{ fontSize: '11px', fontWeight: 900, background: '#0f172a', color: sceneColor, padding: '2px 8px', borderRadius: '4px' }}>{isK ? 'DİZİ SAHNESİ — КУХНИЯ TARZI (AI İLE YAZILMIŞ BENZER SAHNE)' : 'ÇİZGİ DİZİ SAHNESİ — GERÇEK BÖLÜMLE DİNLEME PRATİĞİ'}</span>
                      <h2 style={{ marginTop: '8px', marginBottom: '2px', fontSize: '20px' }}>{scene.episodeRu}</h2>
                      <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>{scene.episodeTr} • Karakterler: {scene.characters.join(', ')}</div>
                      <p style={{ color: '#cbd5e1', fontSize: '13px' }}>{scene.contextTr}</p>

                      {/* 🎚️ Dinleme hızı — kelime bozulmadan yavaşlat/hızlandır (sadece dinleme bölümü) */}
                      <ListenSpeedControl speed={listenSpeed} onChange={setListenSpeed} />

                      {/* Кухня sahneleri için AI ile üretilmiş sahne görseli */}
                      {isK && (
                        <div style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${sceneColor}55`, marginBottom: '14px' }}>
                          <img src="scene/kuhnya-kitchen.jpg" alt="«Ван Гог» mutfağı sahnesi" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }} />
                        </div>
                      )}

                      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(scene.searchQuery)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <div style={{ background: `linear-gradient(135deg, ${sceneColor}35, ${sceneColor}0f)`, border: `1px solid ${sceneColor}55`, borderRadius: '12px', padding: '16px', margin: '14px 0', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                          <div style={{ fontSize: '30px' }}>▶️</div>
                          <div>
                            <div style={{ fontWeight: 800, color: sceneColor }}>{isK ? 'Bu tarz gerçek «Кухня» sahnesini YouTube\'da aç' : 'Gerçek Смешарики Bölümünü YouTube\'da Aç'}</div>
                            <div style={{ fontSize: '12px', color: '#cbd5e1' }}>{isK ? 'Rusya\'nın efsanevi mutfak komedisi «Кухня»dan bu tarz sahneleri orijinal haliyle izle.' : 'Basit ve yavaş tempolu orijinal sahneyi izleyerek kulağını Rusçaya alıştır.'}</div>
                          </div>
                        </div>
                      </a>

                      <div style={{ fontSize: '12px', fontWeight: 800, color: sceneColor, margin: '18px 0 8px' }}>✏️ ÖRNEK PEKİŞTİRME DİYALOĞU (Karakter tarzına uygun, öğretici amaçlı)</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                        {scene.miniDialogue.map((line, i) => (
                          <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontWeight: 900, color: sceneColor, fontSize: '13px' }}>{line.speaker}</span>
                              <button onClick={() => speak(line.ru)} style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '16px' }}>🔊</button>
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 800, marginTop: '4px' }}>{line.ru}</div>
                            <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '2px' }}>/{line.reading}/</div>
                            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px' }}>{line.tr}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#38bdf8', marginBottom: '8px' }}>
                        🎧 ANLAMA SORUSU — {smeshQIdx + 1} / {scene.questions.length}{isK ? ' (Кухня sahnesi)' : ''}
                      </div>
                      <div style={{ background: '#0f172a', padding: '18px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center', marginBottom: '14px', fontWeight: 800 }}>
                        {scene.questions[smeshQIdx].prompt}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {scene.questions[smeshQIdx].options.map((opt, i) => (
                          <button key={i} onClick={() => handleSmeshAnswer(opt)} style={{ padding: '14px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>{opt}</button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* KELİME KARTLARI */}
            {screen === 'FLASHCARD' && (
              <div>
                {(() => {
                  const mod = UNITS_DATA[unitIdx];
                  const w = mod.words[cardIdx];
                  return (
                    <div>
                      <UnitBanner unitId={mod.id} icon={mod.icon} color={mod.color} label={mod.title} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>KELİME {cardIdx + 1} / {mod.words.length}</div>
                        {/* 🔊 OTOMATİK SESLENDİRME AÇMA/KAPAMA: kart değişince kelime kendiliğinden okunur */}
                        <button onClick={() => setAutoSpeak(v => !v)}
                          title="Kart her değiştiğinde Rusça kelimeyi otomatik okur"
                          style={{ background: autoSpeak ? 'rgba(34,197,94,0.15)' : '#0f172a', border: `1px solid ${autoSpeak ? '#22c55e' : '#334155'}`, color: autoSpeak ? '#22c55e' : '#64748b', borderRadius: '999px', padding: '6px 12px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}>
                          {autoSpeak ? '🔊 Otomatik ses: AÇIK' : '🔇 Otomatik ses: KAPALI'}
                        </button>
                      </div>

                      <div onClick={() => setIsFlipped(!isFlipped)} style={{ minHeight: '180px', background: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', margin: '20px 0' }}>
                        {!isFlipped ? (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '36px', fontWeight: 900 }}>{w.ru}</div>
                            <div style={{ fontSize: '16px', color: '#38bdf8', marginTop: '6px' }}>/{w.reading}/</div>
                            <button onClick={(e) => { e.stopPropagation(); speak(w.ru); }} style={{ marginTop: '12px', background: '#3b82f6', border: 'none', color: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}>🔊 Dinle</button>
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '28px', fontWeight: 900, color: '#10b981' }}>{w.tr}</div>
                            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '8px' }}>💡 Not: {w.usageNote}</div>
                          </div>
                        )}
                      </div>

                      <button onClick={() => {
                        if (cardIdx + 1 < mod.words.length) { setCardIdx(cardIdx + 1); setIsFlipped(false); }
                        else { startListening(); }
                      }} style={primaryBtn}>
                        {cardIdx + 1 < mod.words.length ? 'Sonraki Kelime →' : '🎧 Dinleme Testine Geç →'}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* EŞLEŞTİRME TESTİ */}
            {screen === 'MATCH' && (
              <div>
                <UnitBanner unitId={UNITS_DATA[unitIdx].id} icon={UNITS_DATA[unitIdx].icon} color={UNITS_DATA[unitIdx].color} label={UNITS_DATA[unitIdx].title} />
                <h3>🧩 Kelimeleri Eşleştir</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '20px 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {matchPairs.map((p, i) => (
                      <button key={i} onClick={() => { setSelectedRu(p.ru); if (selectedTr) checkMatch(p.ru, selectedTr); }} disabled={donePairs.includes(p.ru)} style={{ padding: '14px', borderRadius: '10px', background: donePairs.includes(p.ru) ? '#0f172a' : selectedRu === p.ru ? '#3b82f6' : '#1e293b', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>{p.ru}</button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {shuffle(matchPairs).map((p, i) => (
                      <button key={i} onClick={() => { setSelectedTr(p.tr); if (selectedRu) checkMatch(selectedRu, p.tr); }} disabled={donePairs.includes(p.ru)} style={{ padding: '14px', borderRadius: '10px', background: donePairs.includes(p.ru) ? '#0f172a' : selectedTr === p.tr ? '#10b981' : '#1e293b', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>{p.tr}</button>
                    ))}
                  </div>
                </div>
                {donePairs.length === matchPairs.length && (
                  <button onClick={() => { setTypingIdx(0); loadTypingOptions(0); setScreen('TYPING'); }} style={primaryBtn}>Hızlı Tanıma Testine Geç →</button>
                )}
              </div>
            )}

            {/* HIZLI TANIMA TESTİ (klavyesiz — Rusça/Kiril klavyesi olmayanlar için 4 seçenekli üretici hatırlama) */}
            {screen === 'TYPING' && (
              <div>
                <UnitBanner unitId={UNITS_DATA[unitIdx].id} icon={UNITS_DATA[unitIdx].icon} color={UNITS_DATA[unitIdx].color} label={UNITS_DATA[unitIdx].title} />
                <h3>⚡ Anlamını Hatırla ve Seç</h3>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '-8px' }}>Kelimeyi çevirmeden ÖNCE anlamını zihninden tahmin etmeye çalış, sonra doğru seçeneğe dokun. (Klavye gerekmez.)</p>
                <div style={{ background: '#0f172a', padding: '24px', borderRadius: '14px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0' }}>
                  <div style={{ fontSize: '32px', fontWeight: 900 }}>{UNITS_DATA[unitIdx].words[typingIdx].ru}</div>
                  <button onClick={() => speak(UNITS_DATA[unitIdx].words[typingIdx].ru)} style={{ marginTop: '10px', background: 'transparent', border: '1px solid #334155', borderRadius: '20px', color: '#38bdf8', padding: '6px 14px', cursor: 'pointer' }}>🔊 Dinle</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {typingOptions.map((opt, i) => (
                    <button key={i} onClick={() => handleTyping(opt)} style={{ padding: '16px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>{opt}</button>
                  ))}
                </div>
              </div>
            )}

            {/* CÜMLE KURMA TESTİ */}
            {screen === 'SENTENCE' && (
              <div>
                <UnitBanner unitId={UNITS_DATA[unitIdx].id} icon={UNITS_DATA[unitIdx].icon} color={UNITS_DATA[unitIdx].color} label={UNITS_DATA[unitIdx].title} />
                <h3>💬 Cümleyi Oluştur</h3>
                {(() => {
                  const s = UNITS_DATA[unitIdx].sentences[sentIdx];
                  return (
                    <div>
                      <div style={{ background: '#0f172a', padding: '14px', borderRadius: '10px', border: '1px solid #334155', textAlign: 'center', marginBottom: '16px', color: '#38bdf8', fontWeight: 800 }}>
                        "{s.tr}"
                      </div>
                      <div style={{ minHeight: '54px', background: '#0f172a', border: '2px dashed #334155', borderRadius: '12px', padding: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {builtWords.map((w, i) => (
                          <button key={i} onClick={() => setBuiltWords(prev => prev.filter(x => x !== w))} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 800 }}>{w} ✕</button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
                        {s.scrambled.map((w, i) => (
                          <button key={i} onClick={() => setBuiltWords(prev => [...prev, w])} disabled={builtWords.includes(w)} style={{ padding: '10px 16px', borderRadius: '10px', background: builtWords.includes(w) ? '#0f172a' : '#1e293b', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>{w}</button>
                        ))}
                      </div>
                      <button onClick={checkSentence} style={primaryBtn}>Cümleyi Tamamla</button>

                      {/* 🔬 ANLAMSAL FARK ANALİZİ — "doğru/yanlış" değil, ANLAM farkı raporu */}
                      {sentenceAnalysis && (
                        <div style={{ marginTop: '16px', background: '#0f172a', border: '1px solid #f59e0b66', borderRadius: '14px', padding: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: '#f59e0b' }}>🔬 ANLAMSAL FARK ANALİZİ — cümlen ideal cümleden nasıl sapıyor?</div>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: sentenceAnalysis.closeness >= 70 ? '#10b981' : sentenceAnalysis.closeness >= 40 ? '#f59e0b' : '#ef4444' }}>
                              anlamsal yakınlık: %{sentenceAnalysis.closeness}
                            </div>
                          </div>
                          <div style={{ height: '7px', background: '#1e293b', borderRadius: '4px', margin: '8px 0 12px', overflow: 'hidden' }}>
                            <div style={{ width: `${sentenceAnalysis.closeness}%`, height: '100%', borderRadius: '4px', background: sentenceAnalysis.closeness >= 70 ? '#10b981' : sentenceAnalysis.closeness >= 40 ? '#f59e0b' : '#ef4444', transition: 'width 0.4s' }} />
                          </div>
                          <p style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 800, color: '#e2e8f0', lineHeight: 1.55 }}>{sentenceAnalysis.verdictTr}</p>
                          {sentenceAnalysis.points.map((p, i) => (
                            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '8px 10px', borderRadius: '10px', marginBottom: '6px', background: p.type === 'err' ? 'rgba(239,68,68,0.10)' : p.type === 'warn' ? 'rgba(245,158,11,0.10)' : 'rgba(16,185,129,0.10)', border: `1px solid ${p.type === 'err' ? '#ef444455' : p.type === 'warn' ? '#f59e0b55' : '#10b98155'}` }}>
                              <span style={{ flexShrink: 0 }}>{p.icon}</span>
                              <span style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.55 }}>{p.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* SARMAL QUIZ / DİNLEME TESTİ / ALFABE SINAVI / GENEL TEKRAR (hepsi aynı motoru kullanır) */}
            {screen === 'QUIZ' && quizQuestions[quizIdx] && (
              <div>
                {quizContext === 'ALPHA_FINAL' && <SceneBanner icon={`${ALPHABET_LESSONS[alphaIdx].letters[0].upper}${ALPHABET_LESSONS[alphaIdx].letters[0].lower}`} color={ALPHA_BANNER_COLORS[alphaIdx % ALPHA_BANNER_COLORS.length]} label="Alfabe Bitiş Sınavı" />}
                {quizContext === 'GRAMMAR_FOUNDATION' && <SceneBanner icon={GRAMMAR_FOUNDATION_UNITS[grammarIdx].icon} color={GRAMMAR_FOUNDATION_UNITS[grammarIdx].color} label={GRAMMAR_FOUNDATION_UNITS[grammarIdx].title} />}
                {(quizContext === 'LISTENING' || quizContext === 'UNIT_FINAL') && <UnitBanner unitId={UNITS_DATA[unitIdx].id} icon={UNITS_DATA[unitIdx].icon} color={UNITS_DATA[unitIdx].color} label={UNITS_DATA[unitIdx].title} />}
                {quizContext === 'REVIEW' && <SceneBanner icon="🔁" color="#ef4444" label="Genel Tekrar Testi" />}
                {quizContext === 'SRS_REVIEW' && <SceneBanner icon="📅" color="#f59e0b" label="Aralıklı Tekrar (Spaced Repetition)" />}
                {quizContext === 'MARATHON' && <SceneBanner icon="🔀" color="#a78bfa" label="Karma Maraton — Tüm Geçmişten Rastgele" />}
                {quizContext === 'WEAKSPOT' && <SceneBanner icon="🎯" color="#f97316" label="Zayıf Nokta Antrenmanı — Sana Özel Test" />}
                <div style={{ fontSize: '12px', color: quizContext === 'REVIEW' || quizContext === 'SRS_REVIEW' ? '#f59e0b' : quizContext === 'MARATHON' ? '#a78bfa' : '#38bdf8', fontWeight: 800 }}>
                  {quizContext === 'ALPHA_FINAL' && `🔤 ALFABE BİTİŞ SINAVI — SORU ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'GRAMMAR_FOUNDATION' && `🧩 CÜMLE TEMELLERİ KONTROLÜ — SORU ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'LISTENING' && `🎧 DİNLEME TESTİ — SORU ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'UNIT_FINAL' && `✅ ÜNİTE BİTİŞ SINAVI (+ 🔁 kalıcı tekrar soruları) — SORU ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'REVIEW' && `🔁 GENEL TEKRAR (Doğru cevaplayana kadar sorulur!) — ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'SRS_REVIEW' && `📅 ARALIKLI TEKRAR — ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'MARATHON' && `🔀 KARMA MARATON — ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'WEAKSPOT' && `🎯 ZAYIF NOKTA ANTRENMANI (kişiye özel) — ${quizIdx + 1} / ${quizQuestions.length}`}
                </div>

                {quizQuestions[quizIdx].audioOnly ? (
                  <div style={{ background: '#0f172a', padding: '30px', borderRadius: '14px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0' }}>
                    <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: 0 }}>Dinle ve doğru Türkçe anlamı seç.</p>
                    {quizContext === 'LISTENING' && <ListenSpeedControl speed={listenSpeed} onChange={setListenSpeed} />}
                    <button onClick={() => speak(quizQuestions[quizIdx].ru)} style={{ padding: '20px 28px', borderRadius: '50%', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '30px' }}>🔊</button>
                  </div>
                ) : (
                  <div style={{ background: '#0f172a', padding: '24px', borderRadius: '14px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0', fontWeight: 800, fontSize: '18px' }}>
                    {quizQuestions[quizIdx].prompt}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {quizQuestions[quizIdx].options.map((opt: string, i: number) => (
                    <button key={i} onClick={() => handleQuizAnswer(opt)} style={{ padding: '16px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer' }}><span style={{ opacity: 0.35, fontSize: '11px', marginRight: '6px' }}>{i + 1}</span>{opt}</button>
                  ))}
                </div>
              </div>
            )}

            {/* ÜNİTE HİKAYESİ (A1 hariç, ünite bitince) — kelimelerle bağlantılı kısa sahne/hikaye, Türkçesi gizli */}
            {screen === 'UNIT_STORY' && (
              <div>
                {(() => {
                  const mod = UNITS_DATA[unitIdx];
                  return (
                    <div>
                      <SceneBanner icon={mod.icon} color={mod.color} label={`${mod.title} — Hikaye`} />
                      <span style={{ fontSize: '11px', fontWeight: 900, background: '#0f172a', color: mod.color, padding: '2px 8px', borderRadius: '4px' }}>📖 ÜNİTE HİKAYESİ</span>
                      <h2 style={{ marginTop: '8px', marginBottom: '2px', fontSize: '22px' }}>Bu Ünitenin Kelimeleriyle Kısa Bir Hikaye</h2>
                      <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: 0 }}>
                        Önce hikayeyi oku ve dinle (Türkçesi bilerek gösterilmiyor). Sonra her cümleyi Türkçeleştirmen istenecek — geçmek için en az <strong style={{ color: '#f8fafc' }}>%{Math.round(STORY_PASS_THRESHOLD * 100)}</strong> doğru gerekiyor{isUltraMode() ? ' (⚡ ULTRA barajı)' : ''}. Geçemezsen ünitenin kelimeleri karıştırılıp baştan tekrar ettirilecek.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0' }}>
                        {storyLines.map((line, i) => (
                          <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontWeight: 900, color: mod.color, fontSize: '13px' }}>{line.speaker}</span>
                              <button onClick={() => speak(line.ru)} style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '16px' }}>🔊</button>
                            </div>
                            <div style={{ fontSize: '17px', fontWeight: 800, marginTop: '4px' }}>{line.ru}</div>
                            {line.reading && <div style={{ fontSize: '13px', color: '#38bdf8', marginTop: '2px' }}>/{line.reading}/</div>}
                          </div>
                        ))}
                      </div>

                      <button onClick={startStoryTest} style={primaryBtn}>📝 Türkçeleştirme Sınavına Başla →</button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TÜRKÇELEŞTİRME SINAVI — hikayenin her cümlesi için doğru Türkçe karşılığı seçilir */}
            {screen === 'STORY_TEST' && storyTestQuestions[storyTestIdx] && (
              <div>
                {(() => {
                  const mod = UNITS_DATA[unitIdx];
                  const q = storyTestQuestions[storyTestIdx];
                  return (
                    <div>
                      <SceneBanner icon={mod.icon} color={mod.color} label={`${mod.title} — Türkçeleştirme Sınavı`} />
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 800 }}>
                        📝 TÜRKÇELEŞTİRME SINAVI — CÜMLE {storyTestIdx + 1} / {storyTestQuestions.length} (Geçme notu: %{Math.round(STORY_PASS_THRESHOLD * 100)}{isUltraMode() ? ' ⚡' : ''})
                      </div>
                      <div style={{ background: '#0f172a', padding: '24px', borderRadius: '14px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0' }}>
                        <div style={{ fontSize: '19px', fontWeight: 900 }}>{q.prompt}</div>
                        <button onClick={() => speak(q.prompt)} style={{ marginTop: '10px', background: 'transparent', border: '1px solid #334155', borderRadius: '20px', color: '#38bdf8', padding: '6px 14px', cursor: 'pointer' }}>🔊 Dinle</button>
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '-8px' }}>Bu cümlenin Türkçesi hangisi?</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {q.options.map((opt: string, i: number) => {
                          const showState = !!storyChosenAnswer;
                          const isChosen = storyChosenAnswer === opt;
                          const isCorrectOpt = opt === q.correct;
                          return (
                            <button
                              key={i}
                              onClick={() => handleStoryTestAnswer(opt)}
                              disabled={showState}
                              style={{
                                padding: '16px', borderRadius: '12px',
                                background: showState && isCorrectOpt ? 'rgba(16,185,129,0.25)' : showState && isChosen ? 'rgba(239,68,68,0.25)' : '#0f172a',
                                border: `1px solid ${showState && isCorrectOpt ? '#10b981' : showState && isChosen ? '#ef4444' : '#334155'}`,
                                color: '#fff', fontWeight: 800, cursor: showState ? 'default' : 'pointer'
                              }}
                            >{opt}</button>
                          );
                        })}
                      </div>
                      {storyChosenAnswer && (
                        <button onClick={continueStoryTest} style={{ ...primaryBtn, marginTop: '16px' }}>
                          {storyTestIdx + 1 < storyTestQuestions.length ? 'Sonraki Cümle →' : 'Sonucu Gör →'}
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* SINAV SONUCU — baraj (%90/⚡%95) üstü geçer; altındaysa kelimeler karıştırılıp tekrar ettirilir */}
            {screen === 'STORY_RESULT' && storyResult && (
              <div>
                {(() => {
                  const mod = UNITS_DATA[unitIdx];
                  return (
                    <div style={{ textAlign: 'center' }}>
                      <SceneBanner icon={storyResult.passed ? '🎉' : '🔁'} color={storyResult.passed ? '#10b981' : '#ef4444'} label={`${mod.title} — Sınav Sonucu`} />
                      <h2 style={{ fontSize: '26px', margin: '8px 0' }}>{storyResult.passed ? 'Tebrikler, Geçtin! 🎉' : 'Bu Sefer Olmadı 😕'}</h2>
                      <div style={{ fontSize: '48px', fontWeight: 900, color: storyResult.passed ? '#10b981' : '#ef4444', margin: '12px 0' }}>%{storyResult.percent}</div>
                      <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                        {storyResult.total} cümleden {storyResult.correctCount} tanesini doğru Türkçeleştirdin. Geçmek için en az %{Math.round(STORY_PASS_THRESHOLD * 100)} gerekiyor.
                      </p>
                      {storyResult.passed ? (
                        <>
                          <p style={{ color: '#10b981', fontWeight: 800 }}>✅ Ünite tamamlandı! Kelimeler kalıcı hafıza (SRS) havuzuna eklendi ve +80 elmas kazandın.</p>
                          <button onClick={returnToMapOrStory} style={primaryBtn}>
                            {pendingCheckpointStory ? '📖 Hikaye Modülü Açıldı →' : 'Haritaya Dön →'}
                          </button>
                        </>
                      ) : (
                        <>
                          <p style={{ color: '#ef4444', fontWeight: 800 }}>❌ %{Math.round(STORY_PASS_THRESHOLD * 100)} barajını geçemedin. Kelimeler karıştırılıp ünite baştan tekrar ettirilecek — böylece daha iyi ezberleyeceksin.</p>
                          <button onClick={retryUnitShuffled} style={{ ...primaryBtn, background: '#ef4444', boxShadow: '0 4px 14px rgba(239,68,68,0.4)' }}>🔀 Üniteyi Karıştırıp Tekrar Et</button>
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ============================================================
                HİKAYE MODÜLÜ (STORY & SUMMARY) — HER 10 ÜNİTEDE BİR AÇILIR
                1) Rusça hikaye (satır çevirileri tıklanınca açılır) + 🔊 dinleme
                2) Sözlük kartları: hikayedeki en fazla 5-6 YENİ kelime
                3) Türkçe özet alanı + analiz: "X doğru nokta / Y eksik-yanlış"
                ============================================================ */}
            {screen === 'CHECKPOINT_STORY' && (() => {
              const story = STORIES[storyCheckpointIdx];
              if (!story) return null;
              const storyFullRu = story.paragraphs.map(p => p.ru).join(' ');
              const summaryWordCount = storySummaryText.trim() ? storySummaryText.trim().split(/\s+/).length : 0;
              const ev = storyEvalResult;
              const isFinal = story.kind === 'levelFinal';
              const summaryPerfect = isSummaryPerfect(ev);
              return (
                <div>
                  <SceneBanner icon={story.icon} color={story.color} label={isFinal ? `Bölüm Finali — ${story.levelId} Sonu` : `Hikaye Modülü — Kontrol Noktası ${story.checkpoint}`} />
                  <span style={{ fontSize: '11px', fontWeight: 900, background: '#0f172a', color: story.color, padding: '2px 8px', borderRadius: '4px' }}>{isFinal ? `🎬 ${story.levelId} BÖLÜM FİNALİ — ÜNİTE ${story.unitFrom}-${story.unitTo}` : `📖 ÜNİTE ${story.unitFrom}-${story.unitTo} KELİMELERİYLE YAZILDI`}</span>
                  <h2 style={{ marginTop: '8px', marginBottom: '2px', fontSize: '22px' }}>{story.titleTr} <span style={{ color: story.color, fontSize: '16px' }}>— {story.titleRu}</span></h2>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: 0, lineHeight: '1.6', fontStyle: 'italic' }}>{story.framingTr}</p>

                  {/* AI ile üretilmiş sahne görseli (telifsiz benzer sahne) */}
                  {story.banner && (
                    <div style={{ borderRadius: '14px', overflow: 'hidden', border: `1px solid ${story.color}55`, marginBottom: '14px', position: 'relative' }}>
                      <img src={story.banner} alt={`${story.titleTr} sahnesi`} style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(2,6,23,0.92))', padding: '18px 14px 10px', fontSize: '11px', color: '#e2e8f0' }}>
                        🤖 Bu sahne görseli yapay zeka ile üretilmiştir — dizinin ruhuna yazılmış benzer bir sahnedir.
                      </div>
                    </div>
                  )}

                  {/* Gerçek sahne kesitleri: YouTube arama linki (bu tarz sahneleri orijinal dizide izle) */}
                  {story.searchQuery && (
                    <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(story.searchQuery)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.14), rgba(239,68,68,0.04))', border: '1px solid #ef444455', borderRadius: '12px', padding: '13px 16px', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <div style={{ fontSize: '26px' }}>🎬</div>
                        <div>
                          <div style={{ fontWeight: 800, color: '#f87171', fontSize: '14px' }}>Bu tarz sahneyi gerçek dizide izle</div>
                          <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Hikayenin ilham aldığı tarzda sahneleri YouTube'da ara: «{story.searchQuery}»</div>
                        </div>
                      </div>
                    </a>
                  )}

                  {/* Bölüm finali kapısı — kurallar */}
                  {isFinal && (
                    <div style={{ background: 'rgba(251,191,36,0.10)', border: '1px solid #fbbf2455', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 900, color: '#fbbf24' }}>🚧 BÖLÜM FİNALİ KAPISI</div>
                      <div style={{ fontSize: '12.5px', color: '#e2e8f0', marginTop: '6px', lineHeight: 1.6 }}>
                        {story.levelId === 'C1/C2'
                          ? `Bu, DİZİ FİNALİDİR: özetin TAMAMEN doğru olmalı ve Seviye Tekrar Sınavı'ndan en az ${gatePassNeed()}/10 almalısın${isUltraMode() ? ' (⚡ ULTRA barajı)' : ''}. Mezuniyet ancak böyle! 🎓`
                          : `Sonraki bölüme (${story.nextLevelId}) geçmek için: ① özetin TAMAMEN doğru olmalı (tüm ana noktalar, yanlış anlama yok) ② Seviye Tekrar Sınavı'ndan en az ${gatePassNeed()}/10 almalısın${isUltraMode() ? ' (⚡ ULTRA)' : ''}.`}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', background: summaryPerfect ? 'rgba(16,185,129,0.2)' : '#1e293b', border: `1px solid ${summaryPerfect ? '#10b981' : '#334155'}`, color: summaryPerfect ? '#10b981' : '#94a3b8' }}>
                          {summaryPerfect ? '✅ ① Özet: mükemmel' : ev ? `⏳ ① Özet: ${ev.missing.length} eksik, ${ev.misunderstood.length} yanlış anlama` : '⏳ ① Özet: bekliyor'}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', background: storyQuizPassed ? 'rgba(16,185,129,0.2)' : '#1e293b', border: `1px solid ${storyQuizPassed ? '#10b981' : '#334155'}`, color: storyQuizPassed ? '#10b981' : '#94a3b8' }}>
                          {storyQuizPassed ? '✅ ② Seviye sınavı: geçildi' : '⏳ ② Seviye sınavı: bekliyor'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* KADRO — tekrarlayan karakterler, sitcom dinamikleri */}
                  <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px 14px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '8px' }}>🎭 KADRO</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {STORY_CAST.map(c => (
                        <span key={c.name} title={c.desc} style={{ fontSize: '11px', fontWeight: 800, background: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', padding: '4px 10px', borderRadius: '999px', cursor: 'help' }}>
                          {c.emoji} {c.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SESLENDİRME */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '0 0 16px' }}>
                    <button onClick={() => speak(storyFullRu, 0.85)} style={{ flex: 1, minWidth: '150px', padding: '14px', borderRadius: '12px', background: '#3b82f6', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 900, cursor: 'pointer' }}>🎧 Hikayeyi Dinle</button>
                    <button onClick={() => speak(storyFullRu, 0.55)} style={{ flex: 1, minWidth: '150px', padding: '14px', borderRadius: '12px', background: '#8b5cf6', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 900, cursor: 'pointer' }}>🐢 Yavaşça Dinle</button>
                  </div>

                  {/* HİKAYE METNİ — Türkçe çeviriler GİZLİ; satıra dokununca açılır */}
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, marginBottom: '8px' }}>📖 HİKAYE — önce Rusça oku; takıldığın satıra dokunup çevirisini açabilirsin:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                    {story.paragraphs.map((line, i) => {
                      const revealed = storyRevealed.includes(i);
                      return (
                        <div key={i} style={{
                          background: line.narrator ? 'rgba(245,158,11,0.06)' : '#0f172a',
                          border: `1px solid ${line.narrator ? 'rgba(245,158,11,0.35)' : '#334155'}`,
                          borderLeft: line.narrator ? '3px solid #f59e0b' : '3px solid #334155',
                          borderRadius: '12px', padding: '12px 14px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 900, color: line.narrator ? '#f59e0b' : story.color, background: '#1e293b', padding: '2px 8px', borderRadius: '6px' }}>{line.speaker}</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => setStoryRevealed(prev => revealed ? prev.filter(x => x !== i) : [...prev, i])} style={{ background: revealed ? '#334155' : 'transparent', border: '1px solid #475569', color: revealed ? '#94a3b8' : '#38bdf8', padding: '3px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>
                                {revealed ? 'çeviriyi gizle' : '🇹🇷 çeviriyi göster'}
                              </button>
                              <button onClick={() => speak(line.ru, 0.8)} title="Satırı dinle" style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '3px 9px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>🔊</button>
                            </div>
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: line.narrator ? 600 : 800, marginTop: '6px', lineHeight: '1.55' }}>{line.ru}</div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>/{line.reading}/</div>
                          {revealed && <div style={{ fontSize: '13px', color: '#38bdf8', marginTop: '6px', borderTop: '1px dashed #334155', paddingTop: '6px' }}>{line.tr}</div>}
                        </div>
                      );
                    })}
                  </div>

                  {/* SÖZLÜK KARTLARI — hikayedeki yeni kelimeler (maks. 5-6) */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800 }}>🃏 SÖZLÜK KARTLARI — bu hikayedeki <u>{story.newWords.length} yeni kelime</u>:</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '10px', marginBottom: '24px' }}>
                    {story.newWords.map((w, i) => (
                      <div key={i} style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.10), #0f172a)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: '12px', padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: 900, fontSize: '16px' }}>{w.ru}</span>
                            <span style={{ fontSize: '9px', fontWeight: 900, color: '#0f172a', background: '#f59e0b', padding: '1px 6px', borderRadius: '4px' }}>YENİ</span>
                          </div>
                          <button onClick={() => speak(w.ru, 0.8)} style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '6px 9px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', flexShrink: 0 }}>🔊</button>
                        </div>
                        <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '2px' }}>/{w.reading}/</div>
                        <div style={{ fontSize: '13px', color: '#f8fafc', fontWeight: 700, marginTop: '2px' }}>{w.tr}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', lineHeight: 1.5 }}>💡 {w.note}</div>
                      </div>
                    ))}
                  </div>

                  {/* ESKİ KELİMELER TEKRARI — önceki bölümlerden bu hikayede geri dönen kelimeler
                      (kalıcı öğrenme: B'deyken A kelimeleri unutulmasın diye her finalde tekrar) */}
                  {story.recycleWords && story.recycleWords.length > 0 && (
                    <div style={{ background: '#0f172a', border: '1px solid #3b82f655', borderRadius: '14px', padding: '16px', marginBottom: '18px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#60a5fa', marginBottom: '4px' }}>🔁 ESKİ KELİMELER BU HİKAYEDE GERİ DÖNDÜ — tanıdık mı?</div>
                      <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 10px' }}>Kalıcı öğrenme için önceki bölümlerin kelimeleri bu hikayeye bilerek serpiştirildi. Hikayede görürsen: {"o kelimeyi hatırladın demektir — işte kalıcı ezber böyle olur!"}</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {story.recycleWords.map((w, i) => (
                          <span key={i} title={w.from} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, background: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', padding: '5px 10px', borderRadius: '999px', cursor: 'help' }}>
                            <b style={{ color: '#93c5fd' }}>{w.ru}</b> <span style={{ color: '#64748b' }}>·</span> {w.tr} <span style={{ color: '#475569', fontSize: '10px' }}>({w.from})</span>
                            <button onClick={() => speak(w.ru, 0.8)} style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '13px', padding: 0 }}>🔊</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TÜRKÇE ÖZET ALANI */}
                  <div style={{ background: '#0f172a', border: '1px solid #f59e0b55', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800, marginBottom: '6px' }}>📝 TÜRKÇE ÖZETİNİ YAZ — hikayeyi kendi cümlelerinle özetle:</div>
                    <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: 0, marginBottom: '10px' }}>
                      Kim, nerede, ne oldu, nasıl bitti? Analiz motoru özetini hikayenin ana noktalarıyla karşılaştırıp
                      <strong style={{ color: '#f8fafc' }}> kaç doğru nokta</strong> yakaladığını ve <strong style={{ color: '#f8fafc' }}>kaç eksik/yanlış anlaşılan yer</strong> olduğunu söyleyecek.
                      {isFinal && <strong style={{ color: '#fbbf24' }}> Bu bir bölüm finali: kapıyı açmak için özetin TAMAMEN doğru olması gerekiyor — eksik kalırsa ipuçlarına bak ve düzenleyerek tekrar analiz et.</strong>}
                    </p>
                    <textarea
                      value={storySummaryText}
                      onChange={e => { setStorySummaryText(e.target.value); if (storyEvalResult) { setStoryEvalResult(null); setLevelQuiz(null); } }}
                      placeholder="Örn: Bu hikayede Dima, çocuklarına anneleriyle nasıl tanıştığını anlatıyor. Yağmurlu bir akşam..."
                      rows={6}
                      style={{ width: '100%', boxSizing: 'border-box', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#f8fafc', fontSize: '14px', padding: '12px', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{summaryWordCount} kelime • en az 10 kelime önerilir</span>
                      <button
                        onClick={analyzeStorySummary}
                        disabled={storySummaryText.trim().length < 15}
                        style={{ background: storySummaryText.trim().length < 15 ? '#334155' : '#f59e0b', border: 'none', color: storySummaryText.trim().length < 15 ? '#64748b' : '#0f172a', padding: '12px 20px', borderRadius: '10px', fontWeight: 900, cursor: storySummaryText.trim().length < 15 ? 'not-allowed' : 'pointer', fontSize: '14px' }}
                      >
                        🤖 Özetimi Analiz Et
                      </button>
                    </div>
                  </div>

                  {/* ANALİZ SONUCU — X doğru / Y eksik-yanlış + yapıcı geri bildirim */}
                  {ev && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.10), #0f172a)', border: `1px solid ${ev.scorePercent >= 60 ? '#10b981' : ev.scorePercent >= 35 ? '#f59e0b' : '#ef4444'}`, borderRadius: '14px', padding: '18px', marginTop: '14px' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ width: '84px', height: '84px', borderRadius: '50%', border: `6px solid ${ev.scorePercent >= 60 ? '#10b981' : ev.scorePercent >= 35 ? '#f59e0b' : '#ef4444'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, flexShrink: 0 }}>
                          %{ev.scorePercent}
                        </div>
                        <div style={{ flex: 1, minWidth: '220px' }}>
                          <div style={{ fontSize: '18px', fontWeight: 900 }}>{ev.title}</div>
                          <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.6 }}>{ev.message}</div>
                        </div>
                      </div>

                      {/* Özet istatistikleri: X doğru / Y eksik-yanlış */}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                        <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: '10px', padding: '10px 16px', flex: 1, minWidth: '150px', textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: 900, color: '#10b981' }}>{ev.correctCount}</div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>DOĞRU NOKTA</div>
                        </div>
                        <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid #ef4444', borderRadius: '10px', padding: '10px 16px', flex: 1, minWidth: '150px', textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: 900, color: '#ef4444' }}>{ev.issueCount}</div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#ef4444' }}>EKSİK / YANLIŞ ANLAŞILAN</div>
                        </div>
                        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '10px 16px', flex: 1, minWidth: '150px', textAlign: 'center' }}>
                          <div style={{ fontSize: '24px', fontWeight: 900, color: '#38bdf8' }}>{ev.wordCount}</div>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>KELİME</div>
                        </div>
                      </div>

                      {/* Doğru yakalanan noktalar */}
                      {ev.matched.length > 0 && (
                        <div style={{ marginTop: '14px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#10b981', marginBottom: '6px' }}>✅ DOĞRU YAKALADIĞIN NOKTALAR ({ev.matched.length}):</div>
                          {ev.matched.map(m => (
                            <div key={m.id} style={{ fontSize: '12px', color: '#cbd5e1', padding: '6px 10px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px', marginBottom: '4px' }}>✓ {m.textTr}</div>
                          ))}
                        </div>
                      )}

                      {/* Yanlış anlaşılan yerler */}
                      {ev.misunderstood.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#ef4444', marginBottom: '6px' }}>⚠️ YANLIŞ ANLAŞILAN YERLER ({ev.misunderstood.length}):</div>
                          {ev.misunderstood.map((m, i) => (
                            <div key={i} style={{ fontSize: '12px', color: '#fecaca', padding: '6px 10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', marginBottom: '4px' }}>⚠ {m.noteTr}</div>
                          ))}
                        </div>
                      )}

                      {/* Eksik noktalar (ipuçlarıyla — cevabı ifşa etmez) */}
                      {ev.missing.length > 0 && (
                        <div style={{ marginTop: '12px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', marginBottom: '6px' }}>🧩 EKSİK NOKTALAR ({ev.missing.length}) — ipuçları:</div>
                          {ev.missing.map(m => (
                            <div key={m.id} style={{ fontSize: '12px', color: '#e2e8f0', padding: '6px 10px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '8px', marginBottom: '4px' }}>→ {m.hintTr}</div>
                          ))}
                        </div>
                      )}

                      {/* Gelişim önerileri */}
                      {ev.tips.length > 0 && (
                        <div style={{ marginTop: '12px', fontSize: '12px', color: '#94a3b8', lineHeight: 1.7 }}>
                          {ev.tips.map((t, i) => <div key={i}>💡 {t}</div>)}
                        </div>
                      )}

                      {/* Aksiyon butonları — bölüm finalinde kapı kuralları işler */}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => setStoryEvalResult(null)}
                          style={{ flex: 1, minWidth: '160px', padding: '14px', borderRadius: '12px', background: '#334155', border: 'none', color: '#e2e8f0', fontWeight: 800, cursor: 'pointer', fontSize: '14px' }}
                        >
                          🔁 Özetimi Düzenle
                        </button>
                        {!isFinal ? (
                          <button
                            onClick={completeCheckpointStory}
                            style={{ flex: 1, minWidth: '160px', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #d946ef)', border: 'none', color: '#0f172a', fontWeight: 900, cursor: 'pointer', fontSize: '14px' }}
                          >
                            ✅ Tamamla (+{100 + ev.scorePercent} XP)
                          </button>
                        ) : summaryPerfect && storyQuizPassed ? (
                          <button
                            onClick={completeCheckpointStory}
                            style={{ flex: 1, minWidth: '160px', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #fbbf24, #ef4444)', border: 'none', color: '#0f172a', fontWeight: 900, cursor: 'pointer', fontSize: '14px' }}
                          >
                            🎓 {story.levelId === 'C1/C2' ? 'Mezuniyeti Tamamla' : `${story.nextLevelId} Bölümüne Geç`} (+{150 + ev.scorePercent} XP)
                          </button>
                        ) : (
                          <div style={{ flex: 1, minWidth: '160px', padding: '14px', borderRadius: '12px', background: '#334155', color: '#94a3b8', fontWeight: 800, fontSize: '13px', textAlign: 'center', lineHeight: 1.5 }}>
                            {summaryPerfect ? '⏳ Sınavı geçince buton açılır ↓' : `🚧 Özet henüz tam değil: ${ev.missing.length} eksik, ${ev.misunderstood.length} yanlış anlama`}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SEVİYE TEKRAR SINAVI — bölüm finali 2. kapısı: önceki bölümlerdekiler
                      dahil tüm kelimelerden karışık sorular (kalıcı öğrenme tekrarı) */}
                  {isFinal && summaryPerfect && !storyQuizPassed && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), #0f172a)', border: '1px solid #3b82f6', borderRadius: '14px', padding: '18px', marginTop: '14px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 900, color: '#60a5fa' }}>🔁 SEVİYE TEKRAR SINAVI — {story.levelId} KAPISI (2/2)</div>
                      <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '4px', marginBottom: '12px', lineHeight: 1.6 }}>
                        10 soru: <strong style={{ color: '#e2e8f0' }}>6 soru bu bölümün kelimelerinden, 4 soru önceki bölümlerden</strong> (A'dan B'ye geçtiysen A kelimeleri de karışık gelir!). Geçmek için en az {gatePassNeed()} doğru{isUltraMode() ? ' (⚡ ULTRA barajı)' : ''}. Yanlışların "Unutulanlar" havuzuna eklenir.
                      </p>
                      {!levelQuiz ? (
                        <button onClick={() => buildLevelQuiz(story)} style={primaryBtn}>▶️ Sınavı Başlat (10 soru)</button>
                      ) : !levelQuiz.finished ? (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', fontWeight: 800, marginBottom: '8px' }}>
                            <span>SORU {levelQuiz.idx + 1} / {levelQuiz.questions.length}</span>
                            <span>✅ {levelQuiz.correctCount} doğru</span>
                          </div>
                          <div style={{ background: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center', fontWeight: 800, fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            «{levelQuiz.questions[levelQuiz.idx].ru}»
                            <button onClick={() => speak(levelQuiz.questions[levelQuiz.idx].ru, 0.8)} title="Dinle" style={{ background: '#1d4ed8', border: 'none', color: '#fff', padding: '5px 9px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>🔊</button>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {levelQuiz.questions[levelQuiz.idx].options.map((opt, i) => {
                              const isPicked = levelQuiz.picked !== null && opt === levelQuiz.picked;
                              const isRight = levelQuiz.picked !== null && opt === levelQuiz.questions[levelQuiz.idx].tr;
                              return (
                                <button key={i} onClick={() => answerLevelQuiz(opt)} disabled={levelQuiz.picked !== null} style={{ padding: '13px', borderRadius: '12px', background: isRight ? 'rgba(16,185,129,0.25)' : isPicked ? 'rgba(239,68,68,0.25)' : '#0f172a', border: `1px solid ${isRight ? '#10b981' : isPicked ? '#ef4444' : '#334155'}`, color: '#fff', fontWeight: 800, cursor: levelQuiz.picked !== null ? 'default' : 'pointer', fontSize: '14px' }}>{opt}</button>
                              );
                            })}
                          </div>
                          {levelQuiz.picked !== null && (
                            <button onClick={advanceLevelQuiz} style={{ ...primaryBtn, marginTop: '12px' }}>
                              {levelQuiz.idx + 1 < levelQuiz.questions.length ? 'Sonraki Soru →' : 'Sonucu Gör →'}
                            </button>
                          )}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '36px', fontWeight: 900, color: levelQuiz.correctCount >= 7 ? '#10b981' : '#ef4444' }}>{levelQuiz.correctCount} / {levelQuiz.questions.length}</div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: levelQuiz.correctCount >= 7 ? '#10b981' : '#ef4444', margin: '4px 0 12px', lineHeight: 1.6 }}>
                            {levelQuiz.correctCount >= 7
                              ? '✅ SINAVI GEÇTİN! Artık bölümü tamamlayıp sonraki bölüme geçebilirsin.'
                              : `❌ Yeterli değil (en az ${gatePassNeed()}/10 gerekiyor${isUltraMode() ? ' ⚡' : ''}). Yanlışların "Unutulanlar" havuzuna eklendi — yeni sorularla tekrar dene!`}
                          </div>
                          {levelQuiz.correctCount < 7 && (
                            <button onClick={() => buildLevelQuiz(story)} style={primaryBtn}>🔁 Yeni Kelimelerle Tekrar Dene</button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Analiz edilmeden tamamlama — YALNIZ kontrol noktası hikayelerinde
                      (bölüm finallerinde özet+sınav zorunludur, geçilemez) */}
                  {!ev && !isFinal && (
                    <button onClick={completeCheckpointStory} style={{ ...primaryBtn, background: 'transparent', border: '1px solid #475569', color: '#94a3b8', marginTop: '12px' }}>
                      Hikayeyi sonra tekrar okuyacağım — haritaya dön
                    </button>
                  )}
                  {!ev && isFinal && (
                    <div style={{ ...primaryBtn, background: 'transparent', border: '1px dashed #fbbf2455', color: '#fbbf24', marginTop: '12px', textAlign: 'center', fontSize: '13px', cursor: 'default' }}>
                      🚧 Bu bir bölüm finali: özetin TAMAMEN doğru yazılması ve seviye sınavının geçilmesi zorunlu — geçiş yok!
                    </div>
                  )}
                </div>
              );
            })()}

          </div>
        )}

      </div>
    </div>
  );
}