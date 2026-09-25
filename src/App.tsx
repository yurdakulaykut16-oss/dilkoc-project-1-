import { TextToSpeech } from '@capacitor-community/text-to-speech';
import React, { useState, useEffect, useRef } from 'react';
import { TOPICS_100, TOPICS_100_TOTAL, TOPIC_100_CATS, topicCatInfo, buildTopicDrills, topicFullText, LEVELS, topicSourceUnits, sourceUnitInfo } from './topics100';
import type { Topic100, Topic100Question, CefrTag } from './topics100';

// Seviye renkleri (haritada + 100 Konu kartlarında ortak kullanılır)
const LEVEL_COLORS: Record<CefrTag, string> = {
  A1: '#10b981',
  A2: '#38bdf8',
  B1: '#f59e0b',
  B2: '#f43f5e',
  'C1/C2': '#a78bfa',
};

const LEVEL_META: Record<CefrTag, { title: string; desc: string }> = {
  A1: { title: 'A1 — Başlangıç', desc: 'Tanışma, aile, kafe, yol sorma, sayılar, hava durumu' },
  A2: { title: 'A2 — Temel', desc: 'Alışveriş, telefon, randevu, duygular, doktor, nezaket' },
  B1: { title: 'B1 — Günlük Yaşam', desc: 'İş görüşmesi, hastane, kiralık, flört, şikayet, polis' },
  B2: { title: 'B2 — İleri Günlük', desc: 'Maaş pazarlığı, miras, düğün, kaza, sınır koyma' },
  'C1/C2': { title: 'C1/C2 — Üst Düzey', desc: 'Deyimler, mahkeme, ironi, sunum, jargon, analiz' },
};

import { UNITS_DATA, ALL_WORDS, ALL_SENTENCES } from './curriculumData';
import type { WordDetail, DialogueLine, SmesharikiQuestion, SmesharikiScene, UnitModule } from './curriculumData';
// Dışarıdan bu isimleri App'ten alan kodlar için geriye uyum re-export'ları:
export { UNITS_DATA, ALL_WORDS, ALL_SENTENCES };
export type { WordDetail, DialogueLine, SmesharikiQuestion, SmesharikiScene, UnitModule };

// ==========================================
// 1. VERİ MODELLERİ & TİPLER
// ==========================================

export interface AlphabetLetter {
  id: string;
  upper: string;
  lower: string;
  translit: string;
  soundHint: string;
  phoneticRule: string;
  example: { ru: string; reading: string; tr: string; context: string };
  pronunciationDetails: string;
  moreExamples: { ru: string; reading: string; tr: string; context: string }[];
  commonMistakes: string;
  practiceTips: string;
}


// ==========================================
// 2. DETAYLI HARF & FONETİK DERSLERİ (Tüm Kiril Alfabesi - 33 Harf)
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
    title: 'Ünite 1: Temel Sesler & Akanje (А/О) Kuralı',
    subtitle: "Rusçanın en hayati fonetik kuralı: Vurgusuz O harfinin A okunması",
    letters: [
      { id: 'a', upper: 'А', lower: 'а', translit: 'A', soundHint: 'Türkçedeki net A gibi', phoneticRule: 'Vurgu nerede olursa olsun net "A" okunur.', example: { ru: 'Аптека', reading: 'Aptéka', tr: 'Eczane', context: 'Gündelik Hayat' }, pronunciationDetails: 'Ağızı genişlet, dil dişlere değmeden net bir "a" sesi çıkar. Yuvarlak değil, açık bir ses.', moreExamples: [{ ru: 'Анна', reading: 'Ánna', tr: 'Anna (isim)', context: 'İsimler' }, { ru: 'Мама', reading: 'Máma', tr: 'Anne', context: 'Aile' }, { ru: 'Стол', reading: 'Stol', tr: 'Masa', context: 'Ev Eşyası' }, { ru: 'Автобус', reading: 'Aftóbus', tr: 'Otobüs', context: 'Ulaşım' }], commonMistakes: 'Vurgusuz pozisyonlarda bile "a" sesi kaymaz, her zaman net kalır.', practiceTips: 'Türkçedeki "a" ile aynı, bol bol pratik yap.' },
      { id: 'o', upper: 'О', lower: 'о', translit: 'O / A', soundHint: 'Akanje Kuralı (Kritik!)', phoneticRule: 'Rusçada O harfi vurguluysa "O", vurgusuzsa "A" okunur. Örn: Окно -> Aknó', example: { ru: 'Окно', reading: 'Aknó', tr: 'Pencere', context: 'Fonetik Temel' }, pronunciationDetails: 'Vurguluyken dudaklar yuvarlaklaşır, vurgusuzken ağız biraz açılır, "a" sesine yaklaşır.', moreExamples: [{ ru: 'Работа', reading: 'Rabóta', tr: 'İş', context: 'İş Hayatı' }, { ru: 'Дом', reading: 'Dom', tr: 'Ev', context: 'Konut' }, { ru: 'Слово', reading: 'Slóva', tr: 'Kelime', context: 'Dil' }, { ru: 'Огонь', reading: 'Agón\'', tr: 'Ateş', context: 'Doğa' }], commonMistakes: 'Vurgusuz "о" harflerini "o" olarak okumak en sık yapılan hatadır.', practiceTips: 'Her zaman vurgu pozisyonuna dikkat et, akanje kuralı Rusça için hayati önem taşır.' },
      { id: 'k', upper: 'К', lower: 'к', translit: 'K', soundHint: 'Sert K sesi', phoneticRule: 'Türkçedeki K ile birebir aynıdır.', example: { ru: 'Кафе', reading: 'Kafé', tr: 'Kafe', context: 'Sosyalleşme' }, pronunciationDetails: 'Dil arka damakta durur, sert bir "k" sesi çıkar. Türkçedeki ile birebir aynı.', moreExamples: [{ ru: 'Книга', reading: 'Kníga', tr: 'Kitap', context: 'Eğitim' }, { ru: 'Ключ', reading: 'Klyuch', tr: 'Anahtar', context: 'Ev' }, { ru: 'Кошка', reading: 'Kóshka', tr: 'Kedi', context: 'Hayvanlar' }, { ru: 'Кино', reading: 'Kinó', tr: 'Sinema', context: 'Eğlence' }], commonMistakes: 'Yumuşak "k" sesi yoktur, her zaman sert kalır.', practiceTips: 'Türkçedeki "k" ile tam aynı, rahatlıkla kullanabilirsin.' },
      { id: 'm', upper: 'М', lower: 'м', translit: 'M', soundHint: 'Dudak Mʼsi', phoneticRule: 'Dudaklar tam kapatılarak çıkarılır.', example: { ru: 'Москва', reading: 'Maskvá', tr: 'Moskova', context: 'Şehir İsmi' }, pronunciationDetails: 'Dudaklar tam kapanır, nazal bir "m" sesi çıkar. Türkçedeki ile aynı.', moreExamples: [{ ru: 'Море', reading: 'Mórye', tr: 'Deniz', context: 'Doğa' }, { ru: 'Муж', reading: 'Muzh', tr: 'Koca', context: 'Aile' }, { ru: 'Мыло', reading: 'Mýlo', tr: 'Sabun', context: 'Kozmetik' }, { ru: 'Магазин', reading: 'Magazín', tr: 'Mağaza', context: 'Alışveriş' }], commonMistakes: 'Genelde doğru okunur, nadiren sorun yaşanır.', practiceTips: 'Dudakları tam kapatmayı alışkanlık haline getir.' }
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
    title: 'Ünite 2: Yalancı Dostlar & Ikanje (Е/И) Kuralı',
    subtitle: 'Latin harflerine benzeyip farklı okunan harfler ve E->İ dönüşümü',
    letters: [
      { id: 'v', upper: 'В', lower: 'в', translit: 'V', soundHint: 'Bʼye benzer ama V okunur', phoneticRule: 'Alt dudak üst dişlere yumuşakça değer.', example: { ru: 'Вода', reading: 'Vadá', tr: 'Su', context: 'Temel İhtiyaç' }, pronunciationDetails: 'Alt dudak üst dişlere hafifçe değer, nazal bir "v" sesi çıkar. Türkçedeki "v" ile benzer.', moreExamples: [{ ru: 'Врач', reading: 'Vrach', tr: 'Doktor', context: 'Sağlık' }, { ru: 'Вечер', reading: 'Vécher', tr: 'Akşam', context: 'Zaman' }, { ru: 'Время', reading: 'Vrémya', tr: 'Zaman', context: 'Zaman' }, { ru: 'Вопрос', reading: 'Vaprós', tr: 'Soru', context: 'İletişim' }], commonMistakes: 'Bazen "b" ile karıştırılır, diş teması ayırt edici özelliktir.', practiceTips: 'Alt dudak hafifçe üst dişlere değerek, nazal sesi hisset.' },
      { id: 'r', upper: 'Р', lower: 'р', translit: 'R', soundHint: 'Pʼye benzer ama R okunur', phoneticRule: 'Dil damakta güçlü titretilir.', example: { ru: 'Работа', reading: 'Rabóta', tr: 'İş / Çalışma', context: 'İş Hayatı' }, pronunciationDetails: 'Dil ucu damakta güçlü titretilir, sesli "r" sesi çıkar. Türkçedeki "r"den daha güçlüdür.', moreExamples: [{ ru: 'Русский', reading: 'Rússkiy', tr: 'Rusça', context: 'Dil' }, { ru: 'Рыба', reading: 'Rýba', tr: 'Balık', context: 'Yiyecek' }, { ru: 'Рука', reading: 'Ruká', tr: 'El', context: 'Vücut' }, { ru: 'Ресторан', reading: 'Restarán', tr: 'Restoran', context: 'Yiyecek' }], commonMistakes: 'Türkçedeki gibi hafif titreterek değil, güçlü titreterek okunmalıdır.', practiceTips: 'Dil ucu damakta güçlü titreş almayı pratik et.' },
{ id: 'e', upper: 'Е', lower: 'е', translit: 'E / İ', soundHint: 'Ikanje Kuralı', phoneticRule: 'Vurgusuz "Е" harfi konuşma dilinde "İ" sesine kayar. Örn: Метро -> Mitró', example: { ru: 'Метро', reading: 'Mitró', tr: 'Metro', context: 'Ulaşım' }, pronunciationDetails: 'Vurguluyken net "e", vurgusuzken "i" sesine yaklaşır. Akanje kuralının bir parçasıdır.', moreExamples: [{ ru: 'Еда', reading: 'Yedá', tr: 'Yemek', context: 'Gıda' }, { ru: 'Ещё', reading: 'Yeshchó', tr: 'Henüz', context: 'Zaman' }, { ru: 'Европа', reading: 'Yevrópa', tr: 'Avrupa', context: 'Coğrafya' }, { ru: 'Апрель', reading: 'Aprél\'', tr: 'Nisan', context: 'Zaman' }], commonMistakes: 'Vurgusuz pozisyonlarda "e" okumak yaygın bir hatadır.', practiceTips: 'Vurgu pozisyonuna dikkat et, ikanje kuralı hayatidir.' }
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
    title: 'Ünite 3: Temel Patlamalı Ünsüzler & Sonda Sedasızlaşma',
    subtitle: 'Б, Д, Г, П, Т harfleri ve kelime sonunda sedasızlaşma kuralı',
    letters: [
      { id: 'b', upper: 'Б', lower: 'б', translit: 'B', soundHint: 'Dudak patlamalı B', phoneticRule: "Kelime sonunda sedasızlaşarak P olarak okunur. Örn: Хлеб -> Khlep", example: { ru: 'Банк', reading: 'Bank', tr: 'Banka', context: 'Finans' }, pronunciationDetails: 'Dudaklar patlayarak açılır, net bir "b" sesi çıkar. Kelime sonunda "p" sesine dönüşür.', moreExamples: [{ ru: 'Брат', reading: 'Brat', tr: 'Erkek kardeş', context: 'Aile' }, { ru: 'Большой', reading: 'Bol\'shóy', tr: 'Büyük', context: 'Sıfat' }, { ru: 'Белый', reading: 'Bélyy', tr: 'Beyaz', context: 'Renk' }, { ru: 'Библиотека', reading: 'Bibliatéka', tr: 'Kütüphane', context: 'Eğitim' }], commonMistakes: 'Kelime sonunda "b" okumak sık yapılan hatadır, "p" olmalıdır.', practiceTips: 'Kelime sonuna dikkat et, sedasızlaşma kuralını alışkanlık haline getir.' },
      { id: 'd', upper: 'Д', lower: 'д', translit: 'D', soundHint: 'Net D sesi', phoneticRule: "Kelime sonunda sedasızlaşarak T olarak okunur. Örn: Город -> Górat", example: { ru: 'Дом', reading: 'Dom', tr: 'Ev', context: 'Günlük Yaşam' }, pronunciationDetails: 'Dil üst dişlere değerek patlatılır, net bir "d" sesi çıkar. Kelime sonunda "t" sesine dönüşür.', moreExamples: [{ ru: 'День', reading: 'Dyen\'', tr: 'Gün', context: 'Zaman' }, { ru: 'Дерево', reading: 'Dérevo', tr: 'Ağaç', context: 'Doğa' }, { ru: 'Девушка', reading: 'Dévushka', tr: 'Kız (genç kadın)', context: 'İnsan' }, { ru: 'Сад', reading: 'Sat', tr: 'Bahçe', context: 'Doğa' }], commonMistakes: 'Kelime sonunda "d" okumak sık yapılan hatadır, "t" olmalıdır.', practiceTips: 'Kelime sonuna dikkat et, sedasızlaşma kuralını alışkanlık haline getir.' },
      { id: 'g', upper: 'Г', lower: 'г', translit: 'G', soundHint: 'Sert G sesi', phoneticRule: "Kelime sonunda K olarak sedasızlaşır (Друг -> Druk). Bazı ek hallerinde (Его, Сегодня) istisnai olarak V okunur.", example: { ru: 'Год', reading: 'God', tr: 'Yıl', context: 'Zaman' }, pronunciationDetails: 'Arka damakta oluşan sert bir "g" sesi. Kelime sonunda "k" sesine dönüşür. İstisnai durumlarda "v" okunur.', moreExamples: [{ ru: 'Голова', reading: 'Galavá', tr: 'Baş', context: 'Vücut' }, { ru: 'Город', reading: 'Górat', tr: 'Şehir', context: 'Yerleşim' }, { ru: 'Гость', reading: 'Gost\'', tr: 'Misafir', context: 'Sosyal' }, { ru: 'Флаг', reading: 'Flak', tr: 'Bayrak', context: 'Sembol' }], commonMistakes: 'İstisnai "v" okunuşlarını ezberlemek gerekir, genelde "k" dönüşür.', practiceTips: 'İstisnai durumları not et, genelde kelime sonunda "k" beklenir.' },
      { id: 'p', upper: 'П', lower: 'п', translit: 'P', soundHint: 'Nefessiz sert P', phoneticRule: 'Her zaman sert ve nefessiz bir P sesi verir.', example: { ru: 'Парк', reading: 'Park', tr: 'Park', context: 'Şehir' }, pronunciationDetails: 'Dudaklar patlayarak açılır, nefessiz bir "p" sesi çıkar. Türkçedeki ile birebir aynıdır.', moreExamples: [{ ru: 'Папа', reading: 'Pápa', tr: 'Baba', context: 'Aile' }, { ru: 'Письмо', reading: 'Pís\'mo', tr: 'Mektup', context: 'İletişim' }, { ru: 'Первый', reading: 'Pérvy', tr: 'İlk', context: 'Sıfat' }, { ru: 'Компьютер', reading: 'Kamp\'yúter', tr: 'Bilgisayar', context: 'Teknoloji' }], commonMistakes: 'Genelde doğru okunur, nadiren sorun yaşanır.', practiceTips: 'Türkçedeki "p" ile tam aynı, rahatlıkla kullanabilirsin.' },
      { id: 't', upper: 'Т', lower: 'т', translit: 'T', soundHint: 'Net T sesi', phoneticRule: 'Türkçedeki gibi net bir T sesi verir.', example: { ru: 'Такси', reading: 'Taksí', tr: 'Taksi', context: 'Ulaşım' }, pronunciationDetails: 'Dil üst dişlere değerek patlatılır, net bir "t" sesi çıkar. Türkçedeki ile birebir aynıdır.', moreExamples: [{ ru: 'Телефон', reading: 'Tilifón', tr: 'Telefon', context: 'Teknoloji' }, { ru: 'Товарищ', reading: 'Tavárishch', tr: 'Arkadaş', context: 'Sosyal' }, { ru: 'Там', reading: 'Tam', tr: 'Orada', context: 'Zarf' }, { ru: 'Тетрадь', reading: 'Titrát\'', tr: 'Defter', context: 'Eğitim' }], commonMistakes: 'Genelde doğru okunur, nadiren sorun yaşanır.', practiceTips: 'Türkçedeki "t" ile tam aynı, rahatlıkla kullanabilirsin.' }
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
    title: 'Ünite 4: Akıcı Ünsüzler & Sürtünmeliler',
    subtitle: 'Н, Л, С, Ф, Х, У harfleri ve temel telaffuz incelikleri',
    letters: [
      { id: 'n', upper: 'Н', lower: 'н', translit: 'N', soundHint: 'Diş arkası N', phoneticRule: 'Dil ucu üst dişlere değerek çıkar.', example: { ru: 'Нет', reading: 'Nyet', tr: 'Hayır', context: 'Temel Kelime' }, pronunciationDetails: 'Dil ucu üst dişlere hafifçe değerek nazal bir "n" sesi çıkar. Türkçedeki ile benzer.', moreExamples: [{ ru: 'Новый', reading: 'Nóvy', tr: 'Yeni', context: 'Sıfat' }, { ru: 'Начало', reading: 'Nachálo', tr: 'Başlangıç', context: 'Zaman' }, { ru: 'Ночь', reading: 'Noch\'', tr: 'Gece', context: 'Zaman' }, { ru: 'Небо', reading: 'Nyéba', tr: 'Gökyüzü', context: 'Doğa' }], commonMistakes: 'Genelde doğru okunur, nadiren sorun yaşanır.', practiceTips: 'Dil ucu diş temasını hafif tut, nazal sesi hisset.' },
      { id: 'l', upper: 'Л', lower: 'л', translit: 'L', soundHint: 'Kalın L sesi', phoneticRule: 'Genelde kalın (İngilizce "dark L" gibi) okunur, yumuşak ünlü önünde yumuşar.', example: { ru: 'Стол', reading: 'Stol', tr: 'Masa', context: 'Ev Eşyası' }, pronunciationDetails: 'Dil ucu damakta durur, kalın bir "l" sesi çıkar. Yumuşak ünlülerden önce yumuşar.', moreExamples: [{ ru: 'Люди', reading: 'Lyúdi', tr: 'İnsanlar', context: 'Toplum' }, { ru: 'Лето', reading: 'Léto', tr: 'Yaz', context: 'Mevsim' }, { ru: 'Лимон', reading: 'Limón', tr: 'Limon', context: 'Yiyecek' }, { ru: 'Лимонад', reading: 'Limanát', tr: 'Limonata', context: 'İçecek' }], commonMistakes: 'İngilizce "dark L" ile karıştırılabilir, ancak Türkçedeki "l" daha yakındır.', practiceTips: 'Dil ucu damakta kalın bir ses çıkarmaya odaklan.' },
      { id: 's', upper: 'С', lower: 'с', translit: 'S', soundHint: 'Sedasız S', phoneticRule: 'Her zaman sedasız S sesi verir, asla Z okunmaz.', example: { ru: 'Сыр', reading: 'Syr', tr: 'Peynir', context: 'Yiyecek' }, pronunciationDetails: 'Dil üst dişlere yakın durur, sedasız bir "s" sesi çıkar. Asla z sesine dönüşmez.', moreExamples: [{ ru: 'Сказка', reading: 'Skázka', tr: 'Masal', context: 'Edebiyat' }, { ru: 'Семья', reading: 'Sim\'ya', tr: 'Aile', context: 'Aile' }, { ru: 'Срок', reading: 'Srok', tr: 'Süre', context: 'Zaman' }, { ru: 'Сумка', reading: 'Súmka', tr: 'Çanta', context: 'Eşya' }], commonMistakes: 'Bazen "z" ile karıştırılır, sedasız olduğunu hatırla.', practiceTips: 'Sedasız sese odaklan, z sesinden ayırt.' },
      { id: 'f', upper: 'Ф', lower: 'ф', translit: 'F', soundHint: 'Dudak-diş F', phoneticRule: 'Türkçedeki F ile birebir aynıdır.', example: { ru: 'Фильм', reading: "Fil'm", tr: 'Film', context: 'Eğlence' }, pronunciationDetails: 'Alt dudak üst dişlere değerek nazal bir "f" sesi çıkar. Türkçedeki ile birebir aynıdır.', moreExamples: [{ ru: 'Факультет', reading: 'Fakúl\'tet', tr: 'Fakülte', context: 'Eğitim' }, { ru: 'Фамилия', reading: 'Famíliya', tr: 'Soyadı', context: 'Kimlik' }, { ru: 'Флаг', reading: 'Flag', tr: 'Bayrak', context: 'Sembol' }, { ru: 'Фото', reading: 'Fóta', tr: 'Fotoğraf', context: 'Teknoloji' }], commonMistakes: 'Genelde doğru okunur, nadiren sorun yaşanır.', practiceTips: 'Türkçedeki "f" ile tam aynı, rahatlıkla kullanabilirsin.' },
      { id: 'kh', upper: 'Х', lower: 'х', translit: 'H (Kh)', soundHint: 'Boğazdan gelen kalın H', phoneticRule: 'Arapçadaki "Hı" harfine yakın, boğazdan sürtünerek çıkan bir sestir.', example: { ru: 'Хорошо', reading: 'Haraşó', tr: 'İyi / Güzel', context: 'Günlük Onay' }, pronunciationDetails: 'Boğazın arkasından sürtünerek çıkan kalın bir "h" sesi. Arapçadaki "hı"ya benzer.', moreExamples: [{ ru: 'Хлеб', reading: 'Khlep', tr: 'Ekmek', context: 'Yiyecek' }, { ru: 'Хотеть', reading: 'Hotét\'', tr: 'İstemek', context: 'Fiil' }, { ru: 'Холод', reading: 'Kholód', tr: 'Soğuk', context: 'Hava' }, { ru: 'Художник', reading: 'Khudózhnik', tr: 'Ressam', context: 'Meslek' }], commonMistakes: 'Bazen "h" yerine daha yumuşak bir sesle okunur, kalın sesi korumak gerekir.', practiceTips: 'Boğazdan sürtünerek kalın sesi hisset.' },
      { id: 'u', upper: 'У', lower: 'у', translit: 'U', soundHint: 'Net U sesi', phoneticRule: 'Vurgudan bağımsız, her zaman net bir "U" sesi verir.', example: { ru: 'Утро', reading: 'Útra', tr: 'Sabah', context: 'Zaman' }, pronunciationDetails: 'Dudaklar yuvarlaklaşır, net bir "u" sesi çıkar. Vurgudan bağımsız her zaman aynı okunur.', moreExamples: [{ ru: 'Улица', reading: 'Úlitsa', tr: 'Sokak', context: 'Yerleşim' }, { ru: 'Учитель', reading: 'Uchítel\'', tr: 'Öğretmen', context: 'Eğitim' }, { ru: 'Урок', reading: 'Urok', tr: 'Ders', context: 'Eğitim' }, { ru: 'Улыбка', reading: 'Ulýpka', tr: 'Gülümseme', context: 'Duygu' }], commonMistakes: 'Genelde doğru okunur, nadiren sorun yaşanır.', practiceTips: 'Dudakları yuvarlaklaştırarak net u sesi üret.' }
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
    title: 'Ünite 5: Vızıltılı ve Kaynaşık Ünsüzler',
    subtitle: 'Ж, З, Ц, Ч harfleri — dizilerde en sık duyacağınız sesler',
    letters: [
      { id: 'zh', upper: 'Ж', lower: 'ж', translit: 'J (Zh)', soundHint: 'Fransızca "J" gibi', phoneticRule: 'Her zaman sert okunur (jambon kelimesindeki J gibi); vurgusuzken hafifçe "Şı"ya yaklaşır.', example: { ru: 'Жена', reading: 'Zhená', tr: 'Eş (Kadın)', context: 'Aile' }, pronunciationDetails: 'Dilin önü damakta sıkıca kapanır, sert bir "zh" sesi çıkar. Fransızca "j" gibidir.', moreExamples: [{ ru: 'Жизнь', reading: 'Zhizn\'', tr: 'Hayat', context: 'Yaşam' }, { ru: 'Журнал', reading: 'Zhurnál', tr: 'Dergi', context: 'Basın' }, { ru: 'Желтый', reading: 'Zhélty', tr: 'Sarı', context: 'Renk' }, { ru: 'Жёлтый', reading: 'Zhyólty', tr: 'Sarı', context: 'Renk' }], commonMistakes: 'Bazen "ş" ile karıştırılır, ancak "zh" daha sert ve gıcırtılıdır.', practiceTips: 'Dil önü damakta sıkıca kapanarak sert sesi hisset.' },
      { id: 'z', upper: 'З', lower: 'з', translit: 'Z', soundHint: 'Vızıltılı Z', phoneticRule: 'Kelime sonunda sedasızlaşarak S olarak okunur.', example: { ru: 'Зима', reading: 'Zimá', tr: 'Kış', context: 'Mevsim' }, pronunciationDetails: 'Dil üst dişlere yakın durur, vızıltılı bir "z" sesi çıkar. Kelime sonunda "s" sesine dönüşür.', moreExamples: [{ ru: 'Завтра', reading: 'Záfta', tr: 'Yarın', context: 'Zaman' }, { ru: 'Завод', reading: 'Zavód', tr: 'Fabrika', context: 'Sanayi' }, { ru: 'Здание', reading: 'Zdániye', tr: 'Bina', context: 'Mimari' }, { ru: 'Здание', reading: 'Zdániye', tr: 'Bina', context: 'Mimari' }], commonMistakes: 'Kelime sonunda "z" okumak sık yapılan hatadır, "s" olmalıdır.', practiceTips: 'Kelime sonuna dikkat et, sedasızlaşma kuralını alışkanlık haline getir.' },
      { id: 'ts', upper: 'Ц', lower: 'ц', translit: 'Ts', soundHint: '"Ts" tek ses gibi', phoneticRule: 'T ve S sesleri birleşik tek bir sesmiş gibi okunur; her zaman serttir.', example: { ru: 'Отец', reading: 'Atéts', tr: 'Baba', context: 'Aile' }, pronunciationDetails: 'T ve S sesleri birleşik tek bir sesmiş gibi hızlıca okunur. Her zaman serttir.', moreExamples: [{ ru: 'Центр', reading: 'Tséntr', tr: 'Merkez', context: 'Yerleşim' }, { ru: 'Цвет', reading: 'Tsvét', tr: 'Renk', context: 'Görsel' }, { ru: 'Цена', reading: 'Tséná', tr: 'Fiyat', context: 'Ekonomi' }, { ru: 'Царь', reading: 'Tsar\'', tr: 'Çar', context: 'Tarih' }], commonMistakes: 'Bazen "s" ile karıştırılır, ancak "ts" tek bir ses birimidir.', practiceTips: 'T ve S arasındaki geçişi hızlı ve tek bir ses olarak hisset.' },
      { id: 'ch', upper: 'Ч', lower: 'ч', translit: 'Ç (Ch)', soundHint: 'Yumuşak Ç', phoneticRule: 'Her zaman yumuşak bir "Ç" sesi verir, asla sertleşmez.', example: { ru: 'Чай', reading: 'Chay', tr: 'Çay', context: 'Günlük İçecek' }, pronunciationDetails: 'Dil önü damakta yumuşakça kapanır, yumuşak bir "ç" sesi çıkar. Asla sertleşmez.', moreExamples: [{ ru: 'Человек', reading: 'Chelovék', tr: 'İnsan', context: 'Toplum' }, { ru: 'Час', reading: 'Chas', tr: 'Saat', context: 'Zaman' }, { ru: 'Чтение', reading: 'Chténiye', tr: 'Okuma', context: 'Eğitim' }, { ru: 'Чашка', reading: 'Cháshka', tr: 'Fincan', context: 'Ev Eşyası' }], commonMistakes: 'Bazen sert "ç" okunur, ancak her zaman yumuşak olmalıdır.', practiceTips: 'Dil önü damakta yumuşakça kapanarak yumuşak sesi hisset.' }
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
    title: 'Ünite 6: Islık Sesleri & Yarı Ünsüzler',
    subtitle: 'Ш, Щ, Й, И harfleri ve sertlik-yumuşaklık ayrımı',
    letters: [
      { id: 'sh', upper: 'Ш', lower: 'ш', translit: 'Ş (Sh)', soundHint: 'Her zaman sert Ş', phoneticRule: 'Ardından İ gelse bile "E" gibi okunur (Шить -> Shyt\').', example: { ru: 'Школа', reading: 'Shkóla', tr: 'Okul', context: 'Eğitim' }, pronunciationDetails: 'Dilin önü damakta kapanır, sert bir "ş" sesi çıkar. Ardından İ gelse bile yumuşamaz.', moreExamples: [{ ru: 'Шум', reading: 'Shum', tr: 'Gürültü', context: 'Ses' }, { ru: 'Шесть', reading: 'Shest\'', tr: 'Altı', context: 'Sayı' }, { ru: 'Шоколад', reading: 'Shakalád', tr: 'Çikolata', context: 'Yiyecek' }, { ru: 'Шапка', reading: 'Shápka', tr: 'Şapka', context: 'Kıyafet' }], commonMistakes: 'Bazen "şç" ile karıştırılır, ancak "ş" her zaman serttir.', practiceTips: 'Dil önü damakta sert bir şekilde kapanarak sesi hisset.' },
      { id: 'shch', upper: 'Щ', lower: 'щ', translit: 'Şç (Shch)', soundHint: 'Her zaman yumuşak ve uzun', phoneticRule: 'Ш ile karıştırılmamalı; daima yumuşak ve uzatılarak "şç" şeklinde okunur.', example: { ru: 'Борщ', reading: 'Borshch', tr: 'Borş (Çorba)', context: 'Yemek' }, pronunciationDetails: 'Dilin önü damakta yumuşakça kapanır, uzun bir "şç" sesi çıkar. Ш ile karıştırılmamalıdır.', moreExamples: [{ ru: 'Щука', reading: 'Shchúka', tr: 'Sazan', context: 'Balık' }, { ru: 'Щётка', reading: 'Shchyótka', tr: 'Fırça', context: 'Eşya' }, { ru: 'Щедрый', reading: 'Shchédry', tr: 'Cömert', context: 'Karakter' }, { ru: 'Ящик', reading: 'Yáshchik', tr: 'Kutu', context: 'Eşya' }], commonMistakes: 'Ş ile karıştırılır, ancak "şç" her zaman yumuşak ve uzundur.', practiceTips: 'Yumuşak ve uzun sesi hisset, Ş sert sesinden ayırt.' },
      { id: 'y', upper: 'Й', lower: 'й', translit: 'Y (kısa İ)', soundHint: 'Ünlüden sonra kısa Y', phoneticRule: 'Ünlülerden sonra gelip kısa bir "y" sesi ekler (Мой -> Moy).', example: { ru: 'Музей', reading: 'Muzéy', tr: 'Müze', context: 'Gezi' }, pronunciationDetails: 'Ünlülerden sonra gelip kısa bir "y" sesi ekler. Türkçedeki "y" gibi ama daha kısa.', moreExamples: [{ ru: 'Мой', reading: 'Moy', tr: 'Benim (eril)', context: 'İyelik' }, { ru: 'Твой', reading: 'Tvoy', tr: 'Senin', context: 'İyelik' }, { ru: 'День', reading: 'Dyen\'', tr: 'Gün', context: 'Zaman' }, { ru: 'Май', reading: 'May', tr: 'Mayıs', context: 'Zaman' }], commonMistakes: 'Bazen uzun "i" ile karıştırılır, ancak kısa bir sesidir.', practiceTips: 'Kısa bir "y" sesi olarak hisset, ünlüden hemen sonra gelmesi gerekir.' },
      { id: 'i', upper: 'И', lower: 'и', translit: 'İ', soundHint: 'Net İ, yumuşatan harf', phoneticRule: 'Net bir "İ" sesi verir ve önündeki ünsüzü daima yumuşatır.', example: { ru: 'Иван', reading: 'Ivan', tr: 'İvan (isim)', context: 'İsimler' }, pronunciationDetails: 'Net bir "İ" sesi verir ve önündeki ünsüzü daima yumuşatır. Türkçedeki "i" ile benzer.', moreExamples: [{ ru: 'История', reading: 'Istóriya', tr: 'Tarih', context: 'Eğitim' }, { ru: 'Игра', reading: 'Igrá', tr: 'Oyun', context: 'Eğlence' }, { ru: 'Иметь', reading: 'Imét\'', tr: 'Sahip olmak', context: 'Fiil' }, { ru: 'Институт', reading: 'Institút', tr: 'Enstitü', context: 'Eğitim' }], commonMistakes: 'Bazen "ı" ile karıştırılır, ancak net bir "i" sesidir.', practiceTips: 'Net bir "i" sesi olarak hisset, önündeki ünsüzü yumuşatmayı unutma.' }
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
    title: 'Ünite 7: İyotlu Harfler & Yumuşatma Kuralı',
    subtitle: 'Ё, Ю, Я harfleri — kendinden önceki ünsüzü yumuşatan sesler',
    letters: [
      { id: 'yo', upper: 'Ё', lower: 'ё', translit: 'Yo', soundHint: 'Her zaman vurgulu', phoneticRule: 'Rusçada her zaman vurguludur ve hiçbir zaman değişmez, hep "Yo" okunur.', example: { ru: 'Ёлка', reading: 'Yólka', tr: 'Yılbaşı Ağacı', context: 'Kutlama' }, pronunciationDetails: 'Her zaman vurguludur ve hiçbir zaman değişmez, hep "yo" okunur. Diğer harflerden farklı olarak vurgusu bellidir.', moreExamples: [{ ru: 'Ёжик', reading: 'Yózhik', tr: 'Kirpi', context: 'Hayvan' }, { ru: 'Пётр', reading: 'Pyotr', tr: 'Petro (isim)', context: 'İsimler' }, { ru: 'Вёсла', reading: 'Vyósla', tr: ' kürek', context: 'Denizcilik' }, { ru: 'Актёр', reading: 'Aktyór', tr: 'Aktör', context: 'Meslek' }], commonMistakes: 'Bazen "e" ile karıştırılır, ancak her zaman vurgulu "yo" okunur.', practiceTips: 'Her zaman vurgulu olduğunu hatırla, vurgusu bellidir.' },
      { id: 'yu', upper: 'Ю', lower: 'ю', translit: 'Yu', soundHint: 'Önündeki harfi yumuşatır', phoneticRule: '"Yu" sesi verir ve kendinden önceki ünsüzü yumuşatır.', example: { ru: 'Юбка', reading: 'Yúpka', tr: 'Etek', context: 'Kıyafet' }, pronunciationDetails: '"Yu" sesi verir ve kendinden önceki ünsüzü yumuşatır. Türkçedeki "yu" ile benzer.', moreExamples: [{ ru: 'Юг', reading: 'Yug', tr: 'Güney', context: 'Coğrafya' }, { ru: 'Юность', reading: 'Yúnost\'', tr: 'Gençlik', context: 'Yaşam' }, { ru: 'Юра', reading: 'Yúra', tr: 'Yura (isim)', context: 'İsimler' }, { ru: 'Юрист', reading: 'Yuríst', tr: 'Avukat', context: 'Meslek' }], commonMistakes: 'Bazen "u" ile karıştırılır, ancak "yu" ikili bir ses birimidir.', practiceTips: 'Önündeki ünsüzü yumuşatmayı hisset.' },
      { id: 'ya', upper: 'Я', lower: 'я', translit: 'Ya', soundHint: 'Vurgusuzken İʼye yaklaşır', phoneticRule: '"Ya" sesi verir; vurgusuzsa konuşma dilinde "İ"ye yaklaşabilir (Пятница -> Pyátnitsa).', example: { ru: 'Я', reading: 'Ya', tr: 'Ben', context: 'Zamir' }, pronunciationDetails: '"Ya" sesi verir; vurgusuzsa konuşma dilinde "i"ye yaklaşabilir. Türkçedeki "ya" ile benzer.', moreExamples: [{ ru: 'Язык', reading: 'Yazyk', tr: 'Dil', context: 'İletişim' }, { ru: 'Япония', reading: 'Yapóniya', tr: 'Japonya', context: 'Coğrafya' }, { ru: 'Ярко', reading: 'Yárka', tr: 'Parlak', context: 'Sıfat' }, { ru: 'Пятно', reading: 'Pyatnó', tr: 'Leke', context: 'Ev' }], commonMistakes: 'Vurgusuz pozisyonlarda "i" sesine yaklaşır, ancak kök olarak "ya" olarak okunur.', practiceTips: 'Vurgu pozisyonuna dikkat et, vurgusuzken "i"ye yaklaşabilir.' }
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
    title: 'Ünite 8: Sessiz İşaretler & Özel Harfler',
    subtitle: 'Ъ, Ы, Ь, Э — Rusçaya özgü, Latin alfabesinde karşılığı olmayan harfler',
    letters: [
      { id: 'hard', upper: 'Ъ', lower: 'ъ', translit: '(Sert İşaret)', soundHint: 'Sesi yoktur', phoneticRule: "Kendi başına sesi yoktur; kendinden sonraki iyotlu harfin (Е,Ё,Ю,Я) ayrı hecede okunmasını sağlar.", example: { ru: 'Объект', reading: 'Ab-yékt', tr: 'Nesne / Obje', context: 'Resmi Dil' }, pronunciationDetails: 'Kendi başına sesi yoktur; kendinden sonraki iyotlu harfin ayrı hecede okunmasını sağlar. Türkçede karşılığı yoktur.', moreExamples: [{ ru: 'Подъезд', reading: 'Pad-yézd', tr: 'Apartman girişi', context: 'Konut' }, { ru: 'Съезд', reading: 'S\'yezd', tr: 'Kongre', context: 'Toplantı' }, { ru: 'Объяснить', reading: 'Ab-yasnít\'', tr: 'Açıklamak', context: 'Fiil' }, { ru: 'Разъезд', reading: 'Raz-yézd', tr: 'Kavşak / ayrılma', context: 'Ulaşım' }], commonMistakes: 'Sesi olmadığı için bazen atlanır, ancak işlevi önemlidir.', practiceTips: 'İyotlu harfleri ayırmak için kullanıldığını hatırla.' },
      { id: 'y2', upper: 'Ы', lower: 'ы', translit: 'I (kalın)', soundHint: 'Türkçedeki kalın I', phoneticRule: 'Türkçedeki kalın "I" sesine en yakın harftir, dilin arkasından çıkar.', example: { ru: 'Ты', reading: 'Ty', tr: 'Sen', context: 'Zamir' }, pronunciationDetails: 'Türkçedeki kalın "I" sesine en yakın harftir, dilin arkasından çıkar. Sert ve kalın bir ses.', moreExamples: [{ ru: 'Мы', reading: 'My', tr: 'Biz', context: 'Zamir' }, { ru: 'Вы', reading: 'Vy', tr: 'Siz', context: 'Zamir' }, { ru: 'Сын', reading: 'Syn', tr: 'Oğul', context: 'Aile' }, { ru: 'Рыба', reading: 'Rýba', tr: 'Balık', context: 'Yiyecek' }], commonMistakes: 'Bazen "i" ile karıştırılır, ancak kalın bir "ı" sesidir.', practiceTips: 'Dilin arkasından kalın bir ses çıkararak hisset.' },
      { id: 'soft', upper: 'Ь', lower: 'ь', translit: '(Yumuşatma İşareti)', soundHint: 'Sesi yoktur', phoneticRule: 'Kendi başına sesi yoktur; kendinden önceki ünsüzü yumuşatır.', example: { ru: 'День', reading: "Dyen'", tr: 'Gün', context: 'Zaman' }, pronunciationDetails: 'Kendi başına sesi yoktur; kendinden önceki ünsüzü yumuşatır. Türkçede karşılığı yoktur.', moreExamples: [{ ru: 'Мать', reading: 'Mat\'', tr: 'Anne', context: 'Aile' }, { ru: 'Дочь', reading: 'Doch\'', tr: 'Kız', context: 'Aile' }, { ru: 'Сыр', reading: 'Syr', tr: 'Peynir', context: 'Yiyecek' }, { ru: 'Пить', reading: 'Pit\'', tr: 'İçmek', context: 'Fiil' }], commonMistakes: 'Sesi olmadığı için bazen atlanır, ancak yumuşatma işlevi önemlidir.', practiceTips: 'Önündeki ünsüzü yumuşattığını hisset.' },
      { id: 'e2', upper: 'Э', lower: 'э', translit: 'E (açık)', soundHint: 'Kalın ve net E', phoneticRule: 'Е harfinden farklı olarak önündeki ünsüzü yumuşatmaz, kalın ve net okunur.', example: { ru: 'Это', reading: 'Éta', tr: 'Bu', context: 'Temel Kelime' }, pronunciationDetails: 'Е harfinden farklı olarak önündeki ünsüzü yumuşatmaz, kalın ve net okunur. Sadece kelimelerin başında kullanılır.', moreExamples: [{ ru: 'Экономика', reading: 'Ekonómika', tr: 'Ekonomi', context: 'Ekonomi' }, { ru: 'Энергия', reading: 'Energíya', tr: 'Enerji', context: 'Fizik' }, { ru: 'Экзамен', reading: 'Ekzámén', tr: 'Sınav', context: 'Eğitim' }, { ru: 'Этаж', reading: 'Etázh', tr: 'Kat (bina)', context: 'Ev' }], commonMistakes: 'Bazen "е" ile karıştırılır, ancak önündeki ünsüzü yumuşatmaz.', practiceTips: 'Önündeki ünsüzü yumuşatmaz, kalın ve net sesi hisset.' }
    ],
    readingDrills: [
      { word: 'это', correct: 'Éta', distractors: ['Eto', 'Yeto', 'Ita'], tr: 'Bu' },
      { word: 'ты', correct: 'Ty', distractors: ['Ti', 'Tay', 'Tu'], tr: 'Sen' },
      { word: 'день', correct: "Dyen'", distractors: ['Den', 'Deny', 'Dyeny'], tr: 'Gün' },
      { word: 'мы', correct: 'My', distractors: ['Mi', 'Mu', 'Ma'], tr: 'Biz' },
      { word: 'сыр', correct: 'Syr', distractors: ['Sir', 'Sur', 'Sar'], tr: 'Peynir' }
    ]
  }
];

export const ALL_ALPHA_LETTERS = ALPHABET_LESSONS.flatMap(x => x.letters);


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
  completedUnits: string[];
  completedTopics: string[];
  mistakes: { id: string; ru: string; tr: string; reason: string }[];
  srsBank: SRSItem[];
}

export interface SRSItem {
  ru: string;
  tr: string;
  box: number; // 1-5 arası "kutu" (Leitner sistemi): kutu arttıkça tekrar aralığı büyür
  nextReview: number; // bir sonraki tekrarın yapılacağı zaman (timestamp)
  type: 'word' | 'letter';
}

// Leitner kutu aralıkları (gün cinsinden): kutu 1 = ertesi gün, kutu 5 = 35 gün sonra (uzun süreli hafıza)
const SRS_INTERVALS_DAYS = [1, 3, 7, 16, 35];
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

const ALPHA_BANNER_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#64748b'];

export default function App() {
  const [activeTab, setActiveTab] = useState<'MAP' | 'PROFILE' | 'MISTAKES' | 'METHODS'>('MAP');
  const [screen, setScreen] = useState<'MAP' | 'ALPHA' | 'ALPHA_CHECK' | 'ALPHA_READING' | 'TOPIC' | 'TOPIC_TEST' | 'STORY' | 'DIALOG' | 'SMESHARIKI' | 'FLASHCARD' | 'MATCH' | 'TYPING' | 'SENTENCE' | 'QUIZ' | 'UNIT_STORY' | 'STORY_TEST' | 'STORY_RESULT'>('MAP');
  // Sınav/test motorunun hangi bağlamda çalıştığını belirtir: her biri bittiğinde farklı bir sonraki adıma geçer
  const [quizContext, setQuizContext] = useState<'ALPHA_FINAL' | 'LISTENING' | 'UNIT_FINAL' | 'REVIEW' | 'SRS_REVIEW'>('UNIT_FINAL');
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
  const [completedUnits, setCompletedUnits] = useState<string[]>([]);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<{ id: string; ru: string; tr: string; reason: string }[]>([]);
  const [srsBank, setSrsBank] = useState<SRSItem[]>([]);

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

  // Смешарики (Smeshariki) sahnesi anlama sorusu ilerlemesi
  const [smeshQIdx, setSmeshQIdx] = useState(0);

  // Sınav Durumu
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ isError: boolean; message: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // ÜNİTE HİKAYESİ & TÜRKÇELEŞTİRME SINAVI (A1 hariç her ünitede): ünitede öğrenilen kelime/cümlelerle
  // kurulmuş kısa bir sahne/hikaye okutulur, ardından her cümle Türkçeye çevrilerek sınanır.
  // Minimum %85 başarı gerekir; altında kalınırsa ünite kelimeleri karıştırılıp baştan tekrar ettirilir.
  const [storyLines, setStoryLines] = useState<{ speaker: string; ru: string; reading?: string; tr: string }[]>([]);
  const [storyTestQuestions, setStoryTestQuestions] = useState<{ prompt: string; correct: string; options: string[] }[]>([]);
  const [storyTestIdx, setStoryTestIdx] = useState(0);
  const [storyTestCorrect, setStoryTestCorrect] = useState(0);
  const [storyChosenAnswer, setStoryChosenAnswer] = useState<string | null>(null);
  const [storyResult, setStoryResult] = useState<{ passed: boolean; percent: number; correctCount: number; total: number } | null>(null);

  // KAYIT YÜKLE
  useEffect(() => {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      try {
        const d: SaveState = JSON.parse(raw);
        setXp(d.xp || 0);
        setStreak(d.streak || 1);
        setGems(d.gems || 250);
        setCompletedAlpha(d.completedAlpha || []);
        setCompletedUnits(d.completedUnits || []);
        setMistakes(d.mistakes || []);
        setSrsBank(d.srsBank || []);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // OTOMATİK KAYIT
  useEffect(() => {
    const d: SaveState = { xp, streak, gems, completedAlpha, completedUnits, completedTopics, mistakes, srsBank };
    localStorage.setItem(SAVE_KEY, JSON.stringify(d));
  }, [xp, streak, gems, completedAlpha, completedUnits, completedTopics, mistakes, srsBank]);

  // SESLENDİRME — rate parametresiyle yavaş (0.55) veya normal (0.85) tempoda okuma.
  // SES SAĞLAMLILIĞI: uzun metin cümle sınırlarından kısa parçalara bölünür ve
  // sırayla kuyruklanır — tarayıcı TTS uzun tek metni ~15 sn'de KESTİĞİ için bu
  // bölme "sesin ortasında kesilmesi" sorununu tamamen önler.
  const speak = async (txt: string, rate = 0.85, onEnd?: () => void, onError?: () => void) => {
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

    try {
      // Mobil (APK) için native TTS
      await TextToSpeech.stop();
      for (const c of chunks) {
        await TextToSpeech.speak({
          text: c,
          lang: 'ru-RU',
          rate: rate,
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
          u.lang = 'ru-RU';
          u.rate = rate;
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
      return [...prev, { ru, tr, box: 1, nextReview: Date.now() + SRS_INTERVALS_DAYS[0] * DAY_MS, type }];
    });
  };

  // TÜM İLERLEMEYİ BAŞA SARAR: XP, seri, elmas, tamamlanan üniteler, hatalar ve tekrar havuzu — hepsi sıfırlanır.
  const resetProgress = () => {
    localStorage.removeItem(SAVE_KEY);
    setXp(0);
    setStreak(1);
    setGems(250);
    setCompletedAlpha([]);
    setCompletedUnits([]);
    setCompletedTopics([]);
    setMistakes([]);
    setSrsBank([]);
    setAlphaIdx(0);
    setLetterIdx(0);
    setUnitIdx(0);
    setCardIdx(0);
    setIsFlipped(false);
    setShowResetConfirm(false);
    setActiveTab('MAP');
    setScreen('MAP');
  };

  // İLERLEME HESAPLAMA (Alfabe 8 ders + 100 Konu + 72 müfredat ünitesi A1→C1/C2)
  const totalTasks = ALPHABET_LESSONS.length + TOPICS_100_TOTAL + UNITS_DATA.length;
  const completedCount = completedAlpha.length + completedTopics.length + completedUnits.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  // KİLİT MANTIKLARI
  const isAlphaUnlocked = (idx: number) => idx === 0 || completedAlpha.includes(ALPHABET_LESSONS[idx - 1].id);
  const isAllAlphaDone = () => completedAlpha.length === ALPHABET_LESSONS.length;
  const isUnitUnlocked = (idx: number) => {
    if (!isAllAlphaDone()) return false;
    if (idx === 0) return true;
    return completedUnits.includes(UNITS_DATA[idx - 1].id);
  };

  // SEVİYE KİLİT MANTIĞI (sıralı A1→A2→B1→B2→C1/C2): bir seviye açılır
  // bir önceki seviyenin TÜM üniteleri tamamlanınca.
  const isLevelComplete = (lv: CefrTag) => {
    const units = UNITS_DATA.filter(u => u.levelGroup === lv);
    return units.length > 0 && units.every(u => completedUnits.includes(u.id));
  };
  const isLevelUnlocked = (lvIdx: number) => lvIdx === 0 || isLevelComplete(LEVELS[lvIdx - 1]);

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
    const q = les.letters.map(l => ({
      prompt: `"${l.upper} ${l.lower}" harfinin okunuş/fonetik kuralı nedir?`,
      correct: l.translit,
      options: shuffle([l.translit, ...shuffle(ALL_ALPHA_LETTERS.filter(x => x.translit !== l.translit)).slice(0, 3).map(x => x.translit)]),
      ru: `${l.upper} ${l.lower}`, tr: l.translit
    }));
    setQuizContext('ALPHA_FINAL');
    setQuizQuestions(shuffle(q));
    setQuizIdx(0);
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
    if (ans === q.answer) {
      setXp(x => x + 5);
      setFeedback(null);
      const correctSoFar = topicQCorrect + 1;
      setTopicQCorrect(correctSoFar);
      if (topicQIdx + 1 < topicQs.length) {
        setTopicQIdx(topicQIdx + 1);
      } else {
        // Test bitti
        const percent = Math.round((correctSoFar / topicQs.length) * 100);
        const passed = percent >= 75;
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
      addMistake(q.answer, 'Kulağa alışma testi (100 Konu)', 'Dinleme Hatası');
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
    if (chosen === word.tr) {
      setXp(x => x + 15); setFeedback(null);
      if (typingIdx + 1 < UNITS_DATA[unitIdx].words.length) {
        setTypingIdx(typingIdx + 1);
        loadTypingOptions(typingIdx + 1);
      } else {
        setSentIdx(0); setBuiltWords([]); setScreen('SENTENCE');
      }
    } else {
      addMistake(word.ru, word.tr, `Tanıma Hatası (${chosen} seçildi)`);
      setFeedback({ isError: true, message: `⚠️ Doğru cevap: "${word.tr}" olmalıydı.` });
    }
  };

  const checkSentence = () => {
    const s = UNITS_DATA[unitIdx].sentences[sentIdx];
    if (builtWords.join(' ') === s.correct.join(' ')) {
      setXp(x => x + 25); setBuiltWords([]); setFeedback(null);
      if (sentIdx + 1 < UNITS_DATA[unitIdx].sentences.length) {
        setSentIdx(sentIdx + 1);
      } else {
        startUnitQuiz();
      }
    } else {
      addMistake(s.ru, s.tr, 'Cümle Dizilim Hatası');
      setFeedback({ isError: true, message: `🚨 Doğru sıralama: "${s.ru}"` });
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
    const uWords = UNITS_DATA[unitIdx].words;
    const q = shuffle(uWords).map(w => ({
      prompt: '',
      correct: w.tr,
      options: shuffle([w.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr)]),
      ru: w.ru, tr: w.tr, audioOnly: true
    }));
    setQuizContext('LISTENING');
    setQuizQuestions(q);
    setQuizIdx(0);
    setScreen('QUIZ');
  };

  const startUnitQuiz = () => {
    const uWords = UNITS_DATA[unitIdx].words;
    const q = uWords.map(w => ({
      prompt: `"${w.ru}" kelimesinin Türkçe karşılığı nedir?`,
      correct: w.tr,
      options: shuffle([w.tr, ...shuffle(ALL_WORDS.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr)]),
      ru: w.ru, tr: w.tr
    }));
    setQuizContext('UNIT_FINAL');
    setQuizQuestions(shuffle(q));
    setQuizIdx(0);
    setScreen('QUIZ');
  };

  // ==========================================
  // ÜNİTE HİKAYESİ & TÜRKÇELEŞTİRME SINAVI (A1 hariç)
  // ==========================================

  const STORY_PASS_THRESHOLD = 0.85; // Geçmek için gereken minimum başarı oranı: %85

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

  // %85 barajı geçilemezse: ünitenin kelimeleri KARIŞTIRILIR ve tüm ünite (kartlar → eşleştirme →
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

  // GENEL TEKRAR MOTORU: "Unutulanlar" kütüğündeki HER şey doğru cevaplanana kadar tekrar tekrar sorulur.
  // Doğru cevaplanan kelime kütükten tamamen silinir (ustalaşıldı sayılır); yanlış cevaplanan kalır ve aynı soru yeniden sorulur.
  const startGlobalReview = () => {
    if (mistakes.length === 0) return;
    const q = shuffle(mistakes).map(m => ({
      prompt: `"${m.ru}" ne anlama gelir?`,
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

  // ARALIKLI TEKRAR (SPACED REPETITION) OTURUMU: Sadece bugün "vadesi gelmiş" kelimeler sorulur.
  // Bu, kalıcı hafızanın bilimsel temelidir — beyin bir bilgiyi unutmaya en yakın olduğu anda tekrar hatırlarsa iz kalıcılaşır.
  const dueSRS = srsBank.filter(i => i.nextReview <= Date.now());

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

  const handleQuizAnswer = (ans: string) => {
    const q = quizQuestions[quizIdx];
    if (ans === q.correct) {
      setXp(x => x + (quizContext === 'REVIEW' ? 5 : quizContext === 'SRS_REVIEW' ? 8 : 20));
      setFeedback(null);
      if (quizContext === 'REVIEW') {
        // Ustalaşılan kelimeyi Unutulanlar kütüğünden kaldır
        setMistakes(prev => prev.filter(m => !(m.ru === q.ru && m.tr === q.tr)));
      }
      if (quizContext === 'SRS_REVIEW') {
        // Doğru bilindi: bir sonraki kutuya terfi eder, tekrar aralığı büyür (1→3→7→16→35 gün)
        setSrsBank(prev => prev.map(item => {
          if (item.ru !== q.ru) return item;
          const newBox = Math.min(item.box + 1, SRS_INTERVALS_DAYS.length);
          return { ...item, box: newBox, nextReview: Date.now() + SRS_INTERVALS_DAYS[newBox - 1] * DAY_MS };
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
            setScreen('MAP');
          } else {
            // A1 dışındaki her ünitede: ünite, kelimelerle bağlantılı bir hikaye + Türkçeleştirme sınavıyla biter.
            // Ünite ancak bu sınavdan minimum %85 alınca tamamlanmış sayılır (SRS'e ekleme de o an yapılır).
            startUnitStory();
          }
        } else if (quizContext === 'SRS_REVIEW') {
          setScreen('MAP');
        } else {
          setScreen('MAP');
          setActiveTab('MISTAKES');
        }
      }
    } else {
      const reason = quizContext === 'LISTENING' ? 'Dinleme Hatası' : quizContext === 'REVIEW' ? 'Tekrar Testinde Yine Yanlış' : quizContext === 'ALPHA_FINAL' ? 'Alfabe Sınavı Hatası' : quizContext === 'SRS_REVIEW' ? 'Aralıklı Tekrarda Unutuldu' : 'Sınav Hatası';
      addMistake(q.ru, q.tr, reason);
      if (quizContext === 'SRS_REVIEW') {
        // Unutulan kelime kutu 1'e geri düşer: yarın tekrar sorulacak (kalıcı hafıza mantığının kalbi)
        setSrsBank(prev => prev.map(item => item.ru === q.ru ? { ...item, box: 1, nextReview: Date.now() + SRS_INTERVALS_DAYS[0] * DAY_MS } : item));
      }
      setFeedback({ isError: true, message: `❌ Yanlış cevap. Doğrusu: "${q.correct}"` });
    }
  };

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

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontWeight: 800, fontSize: '14px' }}>
          <button onClick={() => { setActiveTab('METHODS'); setScreen('MAP'); }} style={{ background: 'transparent', border: 'none', color: '#a78bfa', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }}>📚 Yöntemler</button>
          <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>🔥 {streak}</span>
          <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>💎 {gems}</span>
          <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>⚡ {xp} XP</span>
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

            {/* GÜNLÜK ARALIKLI TEKRAR (SPACED REPETITION) KARTI — KALICI HAFIZANIN KALBİ */}
            {srsBank.length > 0 && (
              <div style={{ ...cardBox, marginBottom: '24px', border: dueSRS.length > 0 ? '1px solid #f59e0b' : '1px solid #334155', background: dueSRS.length > 0 ? 'linear-gradient(135deg, rgba(245,158,11,0.15), #1e293b)' : '#1e293b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 800 }}>📅 BUGÜNÜN ARALIKLI TEKRARLARI</div>
                    <div style={{ fontSize: '20px', fontWeight: 900, marginTop: '2px' }}>{dueSRS.length > 0 ? `${dueSRS.length} kelime/harf hatırlanmayı bekliyor!` : 'Bugün için tekrar yok, harika gidiyorsun! ✅'}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Toplam {srsBank.length} kelime/harf uzun süreli hafıza takibinde.</div>
                  </div>
                  {dueSRS.length > 0 && (
                    <button onClick={startSRSReview} style={{ background: '#f59e0b', border: 'none', color: '#0f172a', padding: '12px 18px', borderRadius: '10px', fontWeight: 900, cursor: 'pointer' }}>▶️ Tekrarı Başlat</button>
                  )}
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

            {/* AŞAMA 1: HARFLER & FONETİK */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ background: '#3b82f6', color: '#fff', fontSize: '11px', fontWeight: 900, padding: '3px 8px', borderRadius: '6px' }}>AŞAMA 1</span>
                <h3 style={{ margin: 0, fontSize: '18px' }}>Kiril Alfabesi ve Fonetik Kuralları (33 Harf)</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ALPHABET_LESSONS.map((les, idx) => {
                  const unl = isAlphaUnlocked(idx);
                  const done = completedAlpha.includes(les.id);
                  return (
                    <div key={les.id} onClick={() => { if (unl) { setAlphaIdx(idx); setLetterIdx(0); setScreen('ALPHA'); } }} style={{
                      ...cardBox, padding: '16px 20px', cursor: unl ? 'pointer' : 'not-allowed', opacity: unl ? 1 : 0.5,
                      borderLeft: `6px solid ${done ? '#10b981' : unl ? '#3b82f6' : '#475569'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '16px', color: '#f8fafc' }}>{les.title}</div>
                        <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>{les.subtitle}</div>
                      </div>
                      <span style={{ fontSize: '24px' }}>{done ? '✅' : unl ? '🔓' : '🔒'}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AŞAMA 2: KULAĞI ALIŞTIR — 100 KONU (sesli dinleme + "dinle & seç" testleri) */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={{ background: '#14b8a6', color: '#fff', fontSize: '11px', fontWeight: 900, padding: '3px 8px', borderRadius: '6px' }}>AŞAMA 2</span>
                <h3 style={{ margin: 0, fontSize: '18px' }}>🎧 Kulağı Alıştır: Alfabe & Dinleme — 100 Konu</h3>
              </div>

              <div style={{ ...cardBox, padding: '14px 18px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', fontSize: '12px', color: '#94a3b8', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span>Her konuyu <b style={{ color: '#14b8a6' }}>sesli</b> dinle (normal + yavaş tempo), sonra 5 soruluk "dinle & seç" testinden geç. Örnekler doğrudan A2-C1/C2 müfredat ünitelerinden geldiği için bu bölüm aynı zamanda üst seviyeye sesli ön-hazırlıktır.</span>
                  <span style={{ fontWeight: 900, color: '#14b8a6', whiteSpace: 'nowrap' }}>{completedTopics.length}/{TOPICS_100_TOTAL} konu tamam</span>
                </div>
                <div style={{ height: '8px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.round((completedTopics.length / TOPICS_100_TOTAL) * 100)}%`, background: '#14b8a6', transition: 'width 0.4s' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {(() => {
                    const next = TOPICS_100.find(t => !completedTopics.includes(t.id));
                    return next ? (
                      <button onClick={() => { setTopicIdx(TOPICS_100.indexOf(next)); setFeedback(null); setScreen('TOPIC'); }} style={{ background: '#14b8a6', border: 'none', color: '#0f172a', padding: '10px 16px', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '13px' }}>
                        ▶️ Sıradaki Konu: {next.num}. {next.titleTr}
                      </button>
                    ) : (
                      <span style={{ color: '#10b981', fontWeight: 900, fontSize: '13px' }}>🏆 Tüm 100 konu tamamlandı!</span>
                    );
                  })()}
                  <button onClick={() => { setSoundTest('idle'); speak('Алло! Здравствуйте! Это голос теста. Хорошего дня!', 0.85, () => setSoundTest('ok'), () => setSoundTest('error')); }} style={{ background: '#334155', border: '1px solid #475569', color: '#e2e8f0', padding: '10px 16px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>
                    🔊 Ses Testi
                  </button>
                  {soundTest === 'ok' && <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 800 }}>✅ Ses çalışıyor</span>}
                  {soundTest === 'error' && <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: 800 }}>❌ Ses çalınamadı — cihaz sesini kontrol et</span>}
                </div>
              </div>

              {TOPIC_100_CATS.map(cat => {
                const list = TOPICS_100.filter(t => t.cat === cat.id);
                const doneCount = list.filter(t => completedTopics.includes(t.id)).length;
                // Müfredat ön-hazırlık kategorisi seviyelere ayrılır (A2 → C1/C2)
                const groups = cat.id === 'mufredat'
                  ? LEVELS.filter(lv => list.some(t => t.levelGroup === lv)).map(lv => ({ label: `${lv} • ${LEVEL_META[lv].title.split(' — ')[0]}`, color: LEVEL_COLORS[lv], items: list.filter(t => t.levelGroup === lv) }))
                  : [{ label: '', color: cat.color, items: list }];
                const renderCard = (t: Topic100) => {
                  const done = completedTopics.includes(t.id);
                  const src = t.unitId ? sourceUnitInfo(t.unitId) : null;
                  return (
                    <div key={t.id} onClick={() => { setTopicIdx(TOPICS_100.indexOf(t)); setFeedback(null); setScreen('TOPIC'); }} style={{
                      ...cardBox, padding: '10px 8px', cursor: 'pointer', textAlign: 'center',
                      border: `1px solid ${done ? cat.color : '#334155'}`, background: done ? `${cat.color}1a` : '#1e293b'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <span style={{ fontSize: '9px', fontWeight: 900, color: '#64748b' }}>#{t.num}</span>
                        <span style={{ fontSize: '12px' }}>{done ? '✅' : ''}</span>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 900, color: done ? cat.color : '#f8fafc', lineHeight: 1.2 }}>{t.icon}</div>
                      <div style={{ fontSize: '11px', fontWeight: 800, marginTop: '4px', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.titleTr}</div>
                      <div style={{ fontSize: '10px', color: t.levelGroup ? LEVEL_COLORS[t.levelGroup] : '#64748b', fontWeight: t.levelGroup ? 900 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.levelGroup ? `${t.levelGroup} • Ünite ${src ? src.num : ''}` : t.titleRu}
                      </div>
                    </div>
                  );
                };
                return (
                  <div key={cat.id} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '16px' }}>{cat.icon}</span>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: cat.color }}>{cat.label}</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>({doneCount}/{list.length})</span>
                    </div>
                    {groups.map((g, gi) => (
                      <div key={gi} style={{ marginBottom: gi === groups.length - 1 ? 0 : '12px' }}>
                        {g.label && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 900, color: g.color }}>{g.label}</span>
                            <span style={{ fontSize: '10px', color: '#64748b' }}>({g.items.filter(t => completedTopics.includes(t.id)).length}/{g.items.length})</span>
                            <span style={{ flex: 1, height: '1px', background: '#334155' }} />
                          </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))', gap: '8px' }}>
                          {g.items.map(renderCard)}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* AŞAMA 3: MÜFREDAT ÜNİTELERİ (A1→C1/C2, seviye seviye) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={{ background: '#f59e0b', color: '#fff', fontSize: '11px', fontWeight: 900, padding: '3px 8px', borderRadius: '6px' }}>AŞAMA 3</span>
                <h3 style={{ margin: 0, fontSize: '18px' }}>Müfredat Üniteleri ({UNITS_DATA.length} Ünite — A1'den C1/C2'ye)</h3>
              </div>

              {!isAllAlphaDone() && (
                <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', color: '#f59e0b', fontSize: '13px', marginBottom: '14px', fontWeight: 600 }}>
                  🔒 Ünite modüllerine geçebilmek için lütfen önce Alfabe derslerini tamamlayın.
                </div>
              )}

              {/* SEVİYE SEÇİCİ — tıkla, seviye başına atla */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '16px' }}>
                {LEVELS.map((lv, li) => {
                  const units = UNITS_DATA.filter(m => m.levelGroup === lv);
                  const done = units.filter(m => completedUnits.includes(m.id)).length;
                  const pct = units.length ? Math.round((done / units.length) * 100) : 0;
                  const unlocked = isLevelUnlocked(li);
                  return (
                    <button key={lv} onClick={() => levelRefs.current[lv]?.scrollIntoView({ behavior: 'smooth', block: 'start' })} style={{
                      flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                      background: unlocked ? '#1e293b' : '#172033', border: `1px solid ${unlocked ? LEVEL_COLORS[lv] : '#334155'}`,
                      borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', opacity: unlocked ? 1 : 0.55, minWidth: '84px'
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: unlocked ? LEVEL_COLORS[lv] : '#64748b' }}>{unlocked ? '' : '🔒 '}{lv} <span style={{ fontSize: '10px', color: '#64748b' }}>%{pct}</span></span>
                      <span style={{ width: '100%', height: '4px', background: '#0f172a', borderRadius: '2px', overflow: 'hidden' }}>
                        <span style={{ display: 'block', height: '100%', width: `${pct}%`, background: LEVEL_COLORS[lv] }} />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                {LEVELS.map((lv, li) => {
                  const units = UNITS_DATA.filter(m => m.levelGroup === lv);
                  const done = units.filter(m => completedUnits.includes(m.id)).length;
                  const unlocked = isLevelUnlocked(li);
                  const meta = LEVEL_META[lv];
                  return (
                    <div key={lv} ref={el => { levelRefs.current[lv] = el; }} style={{ scrollMarginTop: '84px' }}>
                      {/* SEVİYE BAŞLIĞI */}
                      <div style={{
                        ...cardBox, padding: '14px 18px', marginBottom: '14px',
                        background: `linear-gradient(135deg, ${LEVEL_COLORS[lv]}18, #1e293b)`,
                        border: `1px solid ${unlocked ? `${LEVEL_COLORS[lv]}88` : '#334155'}`,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap'
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 900, background: LEVEL_COLORS[lv], color: '#0f172a', padding: '3px 8px', borderRadius: '6px' }}>{lv}</span>
                            <span style={{ fontSize: '16px', fontWeight: 900, color: LEVEL_COLORS[lv] }}>{meta.title}</span>
                            {!unlocked && <span style={{ fontSize: '14px' }}>🔒</span>}
                          </div>
                          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{meta.desc}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '18px', fontWeight: 900, color: done === units.length ? '#10b981' : '#f8fafc' }}>{done}/{units.length} ünite</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>
                            {done === units.length ? 'Seviye tamamlandı 🏆' : unlocked ? 'Önceki seviyeyi bitirince açılır — üniteler sırayla açılır' : 'Önceki seviyenin tüm üniteleri gerekli'}
                          </div>
                        </div>
                      </div>

                      {/* SEVİYE ÜNİTE KARTLARI */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {units.map(mod => {
                          const idx = UNITS_DATA.indexOf(mod);
                          const unl = isUnitUnlocked(idx);
                          const done = completedUnits.includes(mod.id);
                          return (
                            <div key={mod.id} onClick={() => { if (unl) { setUnitIdx(idx); setCardIdx(0); setIsFlipped(false); setScreen('STORY'); } }} style={{
                              ...cardBox, cursor: unl ? 'pointer' : 'not-allowed', opacity: unl ? 1 : 0.5,
                              border: `1px solid ${done ? '#10b981' : unl ? mod.color : '#334155'}`, position: 'relative', overflow: 'hidden'
                            }}>
                              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                                  {done ? '✅' : mod.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 900, background: '#0f172a', color: mod.color, padding: '2px 6px', borderRadius: '4px' }}>{mod.levelGroup} - ÜNİTE {mod.unitNumber}</span>
                                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>• {mod.category}</span>
                                  </div>
                                  <div style={{ fontWeight: 800, fontSize: '17px' }}>{mod.title}</div>
                                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '2px' }}>{mod.description}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
                { icon: '🎧', title: '11. Kulağı Alıştırma — 100 Konu (AŞAMA 2)', text: 'Gözden önce KULAK öğrenir: Rusçaya maruz kalmak (exposure) beynin ses örüntülerini tanımasını sağlar. Haritadaki "🎧 Kulağı Alıştır: 100 Konu" bölümü tam da bunu yapar — 33 harf konusu (örnek kelimeler, cümleler ve diyaloglar doğrudan A2-C1/C2 müfredat ünitelerinden seçilir, yani alfabeyi çalışırken üst seviyeye sesli ön-hazırlık yaparsın), 8 fonetik konusu (heceler + akanje, ikanje, sonda sedasızlaşma gibi ses kuralları) ve 59 müfredat ön-hazırlık konusu (A2, B1, B2 ve C1/C2 ünitelerinin sesli halinden). Her konunun formatı günlük ünitelerle BİREBİR aynıdır: kelimeler + cümleler + diyalog/sahne. Her konuda: kelimeleri tek tek 🔊 dinle, "Konuyu Dinle" ve "Yavaşça Dinle" ile Rusça akışa bat, sonra 5 soruluk "dinle & seç" testinde kulağının gerçekten ayırt edip edemediğini kanıtla (testin son sorusu başka bir konudan gelir — konular birbirinden bağımsız değildir). Günde 3-5 konu dinlemek, 2-3 hafta içinde doğal konuşma hızını kavraman için yeterli maruz kalma sağlar.' }
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

        {/* HATA / UNUTULANLAR KÜTÜĞÜ */}
        {activeTab === 'MISTAKES' && (
          <div style={cardBox}>
            <button onClick={() => setActiveTab('MAP')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', marginBottom: '12px' }}>← Haritaya Dön</button>
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
            <button onClick={() => setScreen('MAP')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', marginBottom: '16px' }}>← Dersten Çık</button>

            {feedback && (
              <div style={{ padding: '14px', borderRadius: '10px', background: feedback.isError ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)', border: `1px solid ${feedback.isError ? '#ef4444' : '#10b981'}`, color: '#fff', marginBottom: '16px', fontWeight: 700 }}>
                {feedback.message}
              </div>
            )}

            {/* 100 KONU — KONU DETAYI (sesli dinleme + test) */}
            {/* Format BİREBİR ünitelerle aynı: KELİMELER + CÜMLELER + SAHNE/DİYALOG. */}
            {screen === 'TOPIC' && currentTopic && (() => {
              const cat = topicCatInfo(currentTopic.cat);
              const relatedUnit = currentTopic.unitId ? UNITS_DATA.find(u => u.id === currentTopic.unitId) : undefined;
              const relatedIdx = relatedUnit ? UNITS_DATA.indexOf(relatedUnit) : -1;
              const relatedUnlocked = relatedIdx >= 0 && isUnitUnlocked(relatedIdx);
              const srcUnits = topicSourceUnits(currentTopic).slice(0, 4);
              const isSyllable = currentTopic.cat === 'fonetik' && currentTopic.items.every(i => i.ru.length <= 4);
              return (
                <div>
                  <SceneBanner icon={cat.icon} color={cat.color} label={`${currentTopic.num}. Konu — ${cat.label.split(' (')[0]}`} />
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
                            return (
                              <span key={vid} style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', background: '#0f172a', border: '1px solid #334155', padding: '2px 7px', borderRadius: '6px' }}>
                                {ui.icon} Ünite {ui.num} · {ui.level}
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

                  {/* SESLİ DİNLEME BUTONLARI — kulağı alıştırmanın kalbi */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '18px 0' }}>
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
                          {relatedUnit.icon} Ünite {relatedUnit.unitNumber}: {relatedUnit.title}{' '}
                          <span style={{ color: LEVEL_COLORS[relatedUnit.levelGroup], fontSize: '11px', fontWeight: 900 }}>({relatedUnit.levelGroup})</span>
                        </div>
                      </div>
                      <button
                        onClick={() => { if (relatedUnlocked) { setUnitIdx(relatedIdx); setCardIdx(0); setIsFlipped(false); setScreen('STORY'); } }}
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

                  {/* ÖNCEKİ / SONRAKİ KONU — bölüm içinde hızlı gezinme */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                    {topicIdx > 0 && (
                      <button onClick={() => { setTopicIdx(topicIdx - 1); setFeedback(null); }} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#334155', border: 'none', color: '#cbd5e1', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>
                        ← {TOPICS_100[topicIdx - 1].num}. Konu
                      </button>
                    )}
                    {topicIdx < TOPICS_100.length - 1 && (
                      <button onClick={() => { setTopicIdx(topicIdx + 1); setFeedback(null); }} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#334155', border: 'none', color: '#cbd5e1', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>
                        {TOPICS_100[topicIdx + 1].num}. Konu →
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
                const passed = percent >= 75;
                return (
                  <div style={{ textAlign: 'center' }}>
                    <SceneBanner icon={passed ? '🏆' : '🎧'} color={passed ? '#10b981' : '#f59e0b'} label={`Konu ${currentTopic.num} Test Sonucu`} />
                    <div style={{ fontSize: '52px', fontWeight: 900, color: passed ? '#10b981' : '#f59e0b', margin: '24px 0 8px' }}>%{percent}</div>
                    <p style={{ color: '#cbd5e1', fontSize: '14px' }}>{topicQs.length} sorudan {topicQCorrect} tanesini doğru yanıtladın. Geçmek için en az %75 (4/5) gerekiyor.</p>
                    {passed && (
                      <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>📅 Konudaki {Math.min(currentTopic.items.length, 8)} kelime otomatik olarak Aralıklı Tekrar havuzuna eklendi.</p>
                    )}
                    {passed ? (
                      <>
                        <p style={{ color: '#10b981', fontWeight: 800, fontSize: '15px' }}>✅ Konu tamamlandı! +20 XP ve +12 elmas kazandın. Kulağın bu konuya alıştı.</p>
                        <button onClick={() => setScreen('MAP')} style={{ ...primaryBtn, background: '#10b981', boxShadow: '0 4px 14px rgba(16,185,129,0.4)', marginTop: '16px' }}>Haritaya Dön →</button>
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
                  <div style={{ background: '#0f172a', padding: '30px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0' }}>
                    <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '16px' }}>{q.prompt}</div>
                    <button onClick={() => speak(q.audio, 0.8)} style={{ padding: '18px 26px', borderRadius: '50%', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '28px' }}>🔊</button>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '12px' }}>Ses otomatik çaldı; istersen tekrar dokun. Doğru yazıyı seç — kulak ayırt etmeli.</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {q.options.map((opt, i) => (
                      <button key={i} onClick={() => handleTopicAnswer(opt)} style={{ padding: '16px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '15px' }}>{opt}</button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* HARF EKRANI */}
            {screen === 'ALPHA' && (
              <div>
                {(() => {
                  const l = ALPHABET_LESSONS[alphaIdx].letters[letterIdx];
                  return (
                    <div>
                      <SceneBanner icon={`${ALPHABET_LESSONS[alphaIdx].letters[0].upper}${ALPHABET_LESSONS[alphaIdx].letters[0].lower}`} color={ALPHA_BANNER_COLORS[alphaIdx % ALPHA_BANNER_COLORS.length]} label={ALPHABET_LESSONS[alphaIdx].title} />
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 800 }}>HARF {letterIdx + 1} / {ALPHABET_LESSONS[alphaIdx].letters.length}</div>
                      <div style={{ background: '#0f172a', padding: '30px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0' }}>
                        <div style={{ fontSize: '72px', fontWeight: 900, color: '#3b82f6' }}>{l.upper} {l.lower}</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '8px' }}>/{l.translit}/ — {l.soundHint}</div>
                        <p style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '12px', lineHeight: '1.5' }}>{l.phoneticRule}</p>
                        <button onClick={() => speak(l.upper)} style={{ padding: '8px 18px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 800, marginTop: '12px' }}>🔊 Harfi Dinle</button>
                      </div>

                      <div style={{ background: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '20px' }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>ÖRNEK KULLANIM:</div>
                        <div style={{ fontWeight: 900, fontSize: '22px', color: '#10b981', marginTop: '4px' }}>{l.example.ru} ({l.example.reading})</div>
                        <div style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '2px' }}>Türkçesi: {l.example.tr}</div>
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
                      <SceneBanner icon={mod.icon} color={mod.color} label={`${mod.levelGroup} • ${mod.category}`} />
                      <span style={{ fontSize: '11px', fontWeight: 900, background: '#0f172a', color: mod.color, padding: '2px 8px', borderRadius: '4px' }}>ÜNİTE {mod.unitNumber} GRAMER & İPUÇLARI</span>
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
                      <SceneBanner icon={mod.icon} color={mod.color} label={mod.sceneTitle || 'Dizi Sahnesi'} />
                      <span style={{ fontSize: '11px', fontWeight: 900, background: '#0f172a', color: mod.color, padding: '2px 8px', borderRadius: '4px' }}>🎬 DİZİ SAHNESİ</span>
                      <h2 style={{ marginTop: '8px', marginBottom: '2px', fontSize: '22px' }}>{mod.sceneTitle}</h2>
                      <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: 0 }}>{mod.sceneContext}</p>

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
                        {mod.smeshariki ? '🐰 Смешарики Sahnesiyle Pekiştir →' : 'Kelime Kartlarına Geç →'}
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
                  return (
                    <div>
                      <SceneBanner icon="🐰" color="#fb923c" label="Смешарики (Smeshariki) ile Pekiştirme" />
                      <span style={{ fontSize: '11px', fontWeight: 900, background: '#0f172a', color: '#fb923c', padding: '2px 8px', borderRadius: '4px' }}>ÇİZGİ DİZİ SAHNESİ — GERÇEK BÖLÜMLE DİNLEME PRATİĞİ</span>
                      <h2 style={{ marginTop: '8px', marginBottom: '2px', fontSize: '20px' }}>{scene.episodeRu}</h2>
                      <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>{scene.episodeTr} • Karakterler: {scene.characters.join(', ')}</div>
                      <p style={{ color: '#cbd5e1', fontSize: '13px' }}>{scene.contextTr}</p>

                      <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(scene.searchQuery)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <div style={{ background: 'linear-gradient(135deg, #fb923c35, #fb923c0f)', border: '1px solid #fb923c55', borderRadius: '12px', padding: '16px', margin: '14px 0', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                          <div style={{ fontSize: '30px' }}>▶️</div>
                          <div>
                            <div style={{ fontWeight: 800, color: '#fb923c' }}>Gerçek Смешарики Bölümünü YouTube'da Aç</div>
                            <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Basit ve yavaş tempolu orijinal sahneyi izleyerek kulağını Rusçaya alıştır.</div>
                          </div>
                        </div>
                      </a>

                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#fb923c', margin: '18px 0 8px' }}>✏️ ÖRNEK PEKİŞTİRME DİYALOĞU (Karakter tarzına uygun, öğretici amaçlı)</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                        {scene.miniDialogue.map((line, i) => (
                          <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontWeight: 900, color: '#fb923c', fontSize: '13px' }}>{line.speaker}</span>
                              <button onClick={() => speak(line.ru)} style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '16px' }}>🔊</button>
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 800, marginTop: '4px' }}>{line.ru}</div>
                            <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '2px' }}>/{line.reading}/</div>
                            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '4px' }}>{line.tr}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#38bdf8', marginBottom: '8px' }}>
                        🎧 ANLAMA SORUSU — {smeshQIdx + 1} / {scene.questions.length}
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
                      <SceneBanner icon={mod.icon} color={mod.color} label={mod.title} />
                      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>KELİME {cardIdx + 1} / {mod.words.length}</div>

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
                <SceneBanner icon={UNITS_DATA[unitIdx].icon} color={UNITS_DATA[unitIdx].color} label={UNITS_DATA[unitIdx].title} />
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
                <SceneBanner icon={UNITS_DATA[unitIdx].icon} color={UNITS_DATA[unitIdx].color} label={UNITS_DATA[unitIdx].title} />
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
                <SceneBanner icon={UNITS_DATA[unitIdx].icon} color={UNITS_DATA[unitIdx].color} label={UNITS_DATA[unitIdx].title} />
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
                    </div>
                  );
                })()}
              </div>
            )}

            {/* SARMAL QUIZ / DİNLEME TESTİ / ALFABE SINAVI / GENEL TEKRAR (hepsi aynı motoru kullanır) */}
            {screen === 'QUIZ' && quizQuestions[quizIdx] && (
              <div>
                {quizContext === 'ALPHA_FINAL' && <SceneBanner icon={`${ALPHABET_LESSONS[alphaIdx].letters[0].upper}${ALPHABET_LESSONS[alphaIdx].letters[0].lower}`} color={ALPHA_BANNER_COLORS[alphaIdx % ALPHA_BANNER_COLORS.length]} label="Alfabe Bitiş Sınavı" />}
                {(quizContext === 'LISTENING' || quizContext === 'UNIT_FINAL') && <SceneBanner icon={UNITS_DATA[unitIdx].icon} color={UNITS_DATA[unitIdx].color} label={UNITS_DATA[unitIdx].title} />}
                {quizContext === 'REVIEW' && <SceneBanner icon="🔁" color="#ef4444" label="Genel Tekrar Testi" />}
                {quizContext === 'SRS_REVIEW' && <SceneBanner icon="📅" color="#f59e0b" label="Aralıklı Tekrar (Spaced Repetition)" />}
                <div style={{ fontSize: '12px', color: quizContext === 'REVIEW' || quizContext === 'SRS_REVIEW' ? '#f59e0b' : '#38bdf8', fontWeight: 800 }}>
                  {quizContext === 'ALPHA_FINAL' && `🔤 ALFABE BİTİŞ SINAVI — SORU ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'LISTENING' && `🎧 DİNLEME TESTİ — SORU ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'UNIT_FINAL' && `✅ ÜNİTE BİTİŞ SINAVI — SORU ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'REVIEW' && `🔁 GENEL TEKRAR (Doğru cevaplayana kadar sorulur!) — ${quizIdx + 1} / ${quizQuestions.length}`}
                  {quizContext === 'SRS_REVIEW' && `📅 ARALIKLI TEKRAR — ${quizIdx + 1} / ${quizQuestions.length}`}
                </div>

                {quizQuestions[quizIdx].audioOnly ? (
                  <div style={{ background: '#0f172a', padding: '30px', borderRadius: '14px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0' }}>
                    <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: 0 }}>Dinle ve doğru Türkçe anlamı seç.</p>
                    <button onClick={() => speak(quizQuestions[quizIdx].ru)} style={{ padding: '20px 28px', borderRadius: '50%', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '30px' }}>🔊</button>
                  </div>
                ) : (
                  <div style={{ background: '#0f172a', padding: '24px', borderRadius: '14px', border: '1px solid #334155', textAlign: 'center', margin: '16px 0', fontWeight: 800, fontSize: '18px' }}>
                    {quizQuestions[quizIdx].prompt}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {quizQuestions[quizIdx].options.map((opt: string, i: number) => (
                    <button key={i} onClick={() => handleQuizAnswer(opt)} style={{ padding: '16px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>{opt}</button>
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
                        Önce hikayeyi oku ve dinle (Türkçesi bilerek gösterilmiyor). Sonra her cümleyi Türkçeleştirmen istenecek — geçmek için en az <strong style={{ color: '#f8fafc' }}>%85</strong> doğru gerekiyor. Geçemezsen ünitenin kelimeleri karıştırılıp baştan tekrar ettirilecek.
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
                        📝 TÜRKÇELEŞTİRME SINAVI — CÜMLE {storyTestIdx + 1} / {storyTestQuestions.length} (Geçme notu: %85)
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

            {/* SINAV SONUCU — %85 üstü geçer ve ünite tamamlanır; altındaysa kelimeler karıştırılıp tekrar ettirilir */}
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
                        {storyResult.total} cümleden {storyResult.correctCount} tanesini doğru Türkçeleştirdin. Geçmek için en az %85 gerekiyor.
                      </p>
                      {storyResult.passed ? (
                        <>
                          <p style={{ color: '#10b981', fontWeight: 800 }}>✅ Ünite tamamlandı! Kelimeler kalıcı hafıza (SRS) havuzuna eklendi ve +80 elmas kazandın.</p>
                          <button onClick={() => setScreen('MAP')} style={primaryBtn}>Haritaya Dön →</button>
                        </>
                      ) : (
                        <>
                          <p style={{ color: '#ef4444', fontWeight: 800 }}>❌ %85 barajını geçemedin. Kelimeler karıştırılıp ünite baştan tekrar ettirilecek — böylece daha iyi ezberleyeceksin.</p>
                          <button onClick={retryUnitShuffled} style={{ ...primaryBtn, background: '#ef4444', boxShadow: '0 4px 14px rgba(239,68,68,0.4)' }}>🔀 Üniteyi Karıştırıp Tekrar Et</button>
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}