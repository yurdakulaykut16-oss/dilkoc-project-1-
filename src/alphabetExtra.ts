import type { AlphabetLetter, ReadingDrill } from './App';

export interface AlphabetLessonExtra {
  id: string;
  title: string;
  subtitle: string;
  letters: AlphabetLetter[];
  readingDrills: ReadingDrill[];
}

export const ALPHABET_LESSONS_EXTRA: AlphabetLessonExtra[] = [
  {
    id: 'alpha_17', title: 'Sayıları Oku: 1-10', subtitle: 'Fiyat, telefon, saat — sayısız hayatta kalamazsın',
    letters: [
      { id: 'a17_1', upper: 'ОДИН', lower: 'один', translit: 'Adín', soundHint: 'Bir — vurgusuz О yine A', phoneticRule: 'Один → "Adín": akanje kuralı sayılarda da işler.', examples: [{ ru: 'ОДИН', reading: 'Adín', tr: 'Bir' }, { ru: 'ДВА', reading: 'Dva', tr: 'İki' }] },
      { id: 'a17_2', upper: 'ЧЕТЫРЕ', lower: 'четыре', translit: 'Çitı́rye', soundHint: 'Dört — Ч+И birleşimi', phoneticRule: 'Четыре → "Çitı́rye": vurgu ortada, baştaki Е zayıflar.', examples: [{ ru: 'ТРИ', reading: 'Tri', tr: 'Üç' }, { ru: 'ЧЕТЫРЕ', reading: 'Çitı́rye', tr: 'Dört' }] },
      { id: 'a17_3', upper: 'ВОСЕМЬ', lower: 'восемь', translit: "Vósim'", soundHint: 'Sekiz — yumuşak М ile biter', phoneticRule: 'Восемь → "Vósim\'": sondaki МЬ incedir.', examples: [{ ru: 'ВОСЕМЬ', reading: "Vósim'", tr: 'Sekiz' }, { ru: 'ДЕВЯТЬ', reading: "Dyévit'", tr: 'Dokuz' }] },
    ],
    readingDrills: [
      { word: 'один', correct: 'Adín', distractors: ['Odín', 'Ádin', 'Odna'], tr: 'Bir' },
      { word: 'пять', correct: "Pyat'", distractors: ['Pyat', 'Pat', 'Piyat'], tr: 'Beş' },
      { word: 'шесть', correct: "Şest'", distractors: ['Şest', 'Sest', 'Şist'], tr: 'Altı' },
      { word: 'семь', correct: "Syem'", distractors: ['Sem', 'Syem', 'Semi'], tr: 'Yedi' },
      { word: 'девять', correct: "Dyévit'", distractors: ['Devyát', 'Dévyat', 'Divyát'], tr: 'Dokuz' },
      { word: 'десять', correct: "Dyésit'", distractors: ['Desyát', 'Désyat', 'Disyát'], tr: 'On' }
    ]
  },
  {
    id: 'alpha_18', title: 'Sayıları Oku: 11-1000', subtitle: 'Uzun sayılar aslında kısa okunur: -дцать = -tsat',
    letters: [
      { id: 'a18_1', upper: 'ОДИННАДЦАТЬ', lower: 'одиннадцать', translit: "Adínnatsat'", soundHint: 'On bir — ДЦ tek TS okunur', phoneticRule: '-надцать eki hep "-natsat\'" okunur: Д sessizleşir.', examples: [{ ru: 'ОДИННАДЦАТЬ', reading: "Adínnatsat'", tr: 'On bir' }] },
      { id: 'a18_2', upper: 'ДВАДЦАТЬ', lower: 'двадцать', translit: "Dvátsat'", soundHint: 'Yirmi — yine ДЦ = TS', phoneticRule: 'Двадцать → "Dvátsat\'": yazıda 8 harf, seste 6 ses.', examples: [{ ru: 'ДВАДЦАТЬ', reading: "Dvátsat'", tr: 'Yirmi' }, { ru: 'СОРОК', reading: 'Sórak', tr: 'Kırk' }] },
      { id: 'a18_3', upper: 'ТЫСЯЧА', lower: 'тысяча', translit: 'Tı́syaça', soundHint: 'Bin — Ы ile başlar gibi ama T önde', phoneticRule: 'Тысяча → "Tı́syaça": vurgu başta; günlük dilde "тыща" bile denir.', examples: [{ ru: 'СТО', reading: 'Sto', tr: 'Yüz' }, { ru: 'ТЫСЯЧА', reading: 'Tı́syaça', tr: 'Bin' }] },
    ],
    readingDrills: [
      { word: 'двенадцать', correct: "Dvinátsat'", distractors: ['Dvenadsat', 'Dvinádtsat', 'Dvadtsát'], tr: 'On iki' },
      { word: 'пятнадцать', correct: "Pitnátsat'", distractors: ['Pyatnadsát', 'Pitnadsat', 'Pátnatsat'], tr: 'On beş' },
      { word: 'пятьдесят', correct: 'Pidisyát', distractors: ['Pyatdesát', 'Pídesyat', 'Pitdesát'], tr: 'Elli' },
      { word: 'девяносто', correct: 'Divinósta', distractors: ['Devyanósto', 'Divnósta', 'Devinostá'], tr: 'Doksan' },
      { word: 'сто', correct: 'Sto', distractors: ['Sta', 'Sito', 'Tso'], tr: 'Yüz' }
    ]
  },
  {
    id: 'alpha_19', title: 'Haftanın Günleri', subtitle: 'Pazartesiden pazara: takvimi sök',
    letters: [
      { id: 'a19_1', upper: 'ПОНЕДЕЛЬНИК', lower: 'понедельник', translit: "Panidyél'nik", soundHint: 'Pazartesi — "hiçbir şey yapmama günü" kökünden!', phoneticRule: 'По-не-ДЕЛЬ-ник: vurgu ДЕЛЬ hecesinde, baştaki О ve Е zayıflar.', examples: [{ ru: 'ПОНЕДЕЛЬНИК', reading: "Panidyél'nik", tr: 'Pazartesi' }] },
      { id: 'a19_2', upper: 'ВТОРНИК', lower: 'вторник', translit: 'Ftórnik', soundHint: 'Salı — baştaki В, F okunur!', phoneticRule: 'Вторник → "Ftórnik": sert Т\'den önce В sedasızlaşır.', examples: [{ ru: 'ВТОРНИК', reading: 'Ftórnik', tr: 'Salı' }, { ru: 'СРЕДА', reading: 'Sridá', tr: 'Çarşamba' }] },
      { id: 'a19_3', upper: 'ВОСКРЕСЕНЬЕ', lower: 'воскресенье', translit: "Vaskrisyén'ye", soundHint: 'Pazar — "diriliş" kelimesiyle aynı', phoneticRule: 'Вос-кре-СЕНЬ-е: dört hece boyunca akanje + sonda НЬЕ = "n\'ye".', examples: [{ ru: 'СУББОТА', reading: 'Subóta', tr: 'Cumartesi' }, { ru: 'ВОСКРЕСЕНЬЕ', reading: "Vaskrisyén'ye", tr: 'Pazar' }] },
    ],
    readingDrills: [
      { word: 'вторник', correct: 'Ftórnik', distractors: ['Vtórnik', 'Ftorník', 'Vitórnik'], tr: 'Salı' },
      { word: 'среда', correct: 'Sridá', distractors: ['Sréda', 'Sirdá', 'Sredá'], tr: 'Çarşamba' },
      { word: 'пятница', correct: 'Pyátnitsa', distractors: ['Pyatnitsá', 'Pátnitsa', 'Pyatnísa'], tr: 'Cuma' },
      { word: 'суббота', correct: 'Subóta', distractors: ['Súbbota', 'Subbotá', 'Sabóta'], tr: 'Cumartesi' },
      { word: 'выходной', correct: 'Vıhadnóy', distractors: ['Vıhódnoy', 'Vihodnóy', 'Vıhadný'], tr: 'Tatil günü' }
    ]
  },
  {
    id: 'alpha_20', title: 'Aylar & Mevsimler', subtitle: 'Ocaktan aralığa: hepsi yumuşak işaretle biter (neredeyse)',
    letters: [
      { id: 'a20_1', upper: 'ЯНВАРЬ', lower: 'январь', translit: "Yinvár'", soundHint: 'Ocak — vurgusuz Я, Yİ olur', phoneticRule: 'Январь → "Yinvár\'": baştaki Я zayıflar, sonda ince Р.', examples: [{ ru: 'ЯНВАРЬ', reading: "Yinvár'", tr: 'Ocak' }, { ru: 'МАРТ', reading: 'Mart', tr: 'Mart' }] },
      { id: 'a20_2', upper: 'СЕНТЯБРЬ', lower: 'сентябрь', translit: "Sintyábr'", soundHint: 'Eylül — БРЬ üçlüsü tek hamlede', phoneticRule: 'Сентябрь → "Sintyábr\'": sondaki -брь zinciri "br\'" diye sıkışır.', examples: [{ ru: 'СЕНТЯБРЬ', reading: "Sintyábr'", tr: 'Eylül' }, { ru: 'ОКТЯБРЬ', reading: "Aktyábr'", tr: 'Ekim' }] },
      { id: 'a20_3', upper: 'ВЕСНА', lower: 'весна', translit: 'Visná', soundHint: 'İlkbahar — vurgu sonda', phoneticRule: 'Весна → "Visná", лето → "lyéta", осень → "ósin\'", зима → "zimá" — dört mevsim dört melodi.', examples: [{ ru: 'ВЕСНА', reading: 'Visná', tr: 'İlkbahar' }, { ru: 'ЛЕТО', reading: 'Lyéta', tr: 'Yaz' }] },
    ],
    readingDrills: [
      { word: 'февраль', correct: "Fivrál'", distractors: ['Fevrál', 'Févral', 'Fivral'], tr: 'Şubat' },
      { word: 'август', correct: 'Ávgust', distractors: ['Avgúst', 'Ágvust', 'Avgusta'], tr: 'Ağustos' },
      { word: 'октябрь', correct: "Aktyábr'", distractors: ['Oktyábr', 'Aktyabr', 'Óktyabr'], tr: 'Ekim' },
      { word: 'декабрь', correct: "Dikábr'", distractors: ['Dekábr', 'Dékabr', 'Dikabr'], tr: 'Aralık' },
      { word: 'зима', correct: 'Zimá', distractors: ['Zíma', 'Zımá', 'Zyima'], tr: 'Kış' }
    ]
  },
  {
    id: 'alpha_21', title: 'Renkleri Oku', subtitle: 'Kızıl Meydan neden "güzel meydan" demek? Renklerle öğren',
    letters: [
      { id: 'a21_1', upper: 'КРАСНЫЙ', lower: 'красный', translit: 'Krásnıy', soundHint: 'Kırmızı — eski Rusçada "güzel"!', phoneticRule: 'Красный → "Krásnıy": -ый eki hep "-ıy" okunur.', examples: [{ ru: 'КРАСНЫЙ', reading: 'Krásnıy', tr: 'Kırmızı' }, { ru: 'БЕЛЫЙ', reading: 'Byélıy', tr: 'Beyaz' }] },
      { id: 'a21_2', upper: 'ЖЁЛТЫЙ', lower: 'жёлтый', translit: 'Jóltıy', soundHint: 'Sarı — Ё vurgulu, Ж kalın', phoneticRule: 'Жёлтый → "Jóltıy": sarı şemsiye hikayesinin rengi!', examples: [{ ru: 'ЖЁЛТЫЙ', reading: 'Jóltıy', tr: 'Sarı' }, { ru: 'ЗЕЛЁНЫЙ', reading: 'Zilyónıy', tr: 'Yeşil' }] },
      { id: 'a21_3', upper: 'ГОЛУБОЙ', lower: 'голубой', translit: 'Galubóy', soundHint: 'Açık mavi — Rusçada iki ayrı mavi vardır!', phoneticRule: 'Голубой (açık mavi) ≠ синий (koyu mavi): Ruslar için bunlar iki FARKLI renktir.', examples: [{ ru: 'ГОЛУБОЙ', reading: 'Galubóy', tr: 'Açık mavi' }, { ru: 'СИНИЙ', reading: 'Síniy', tr: 'Koyu mavi' }] },
    ],
    readingDrills: [
      { word: 'белый', correct: 'Byélıy', distractors: ['Bélıy', 'Bielíy', 'Byelí'], tr: 'Beyaz' },
      { word: 'чёрный', correct: 'Çórnıy', distractors: ['Çernıy', 'Çorní', 'Tsórnıy'], tr: 'Siyah' },
      { word: 'зелёный', correct: 'Zilyónıy', distractors: ['Zelénıy', 'Zilyoní', 'Zelyónıy'], tr: 'Yeşil' },
      { word: 'серый', correct: 'Syérıy', distractors: ['Sérıy', 'Siríy', 'Syerı́'], tr: 'Gri' },
      { word: 'розовый', correct: 'Rózavıy', distractors: ['Rozóvıy', 'Rózoví', 'Razóvıy'], tr: 'Pembe' }
    ]
  },
  {
    id: 'alpha_22', title: 'Aile Kelimeleri', subtitle: 'Бабушка sadece nine değil, bir kurumdur',
    letters: [
      { id: 'a22_1', upper: 'БАБУШКА', lower: 'бабушка', translit: 'Bábuşka', soundHint: 'Nine — vurgu BAŞTA', phoneticRule: 'Бабушка → "Bábuşka" (babúşka değil!): en sık yanlış vurgulanan Rusça kelime.', examples: [{ ru: 'БАБУШКА', reading: 'Bábuşka', tr: 'Nine' }, { ru: 'ДЕДУШКА', reading: 'Dyéduşka', tr: 'Dede' }] },
      { id: 'a22_2', upper: 'СЕМЬЯ', lower: 'семья', translit: "Sim'yá", soundHint: 'Aile — ЬЯ = apayrı "ya" hecesi', phoneticRule: 'Семья → "Sim\'yá": Ь burada М ile Я\'yı ayırır, "simya" değil "sim-ya".', examples: [{ ru: 'СЕМЬЯ', reading: "Sim'yá", tr: 'Aile' }] },
      { id: 'a22_3', upper: 'ДОЧЬ', lower: 'дочь', translit: "Doç'", soundHint: 'Kız evlat — tek heceli, ince biter', phoneticRule: 'Дочь → "Doç\'", муж → "muş" (Ж sonda Ş!), жена → "jıná".', examples: [{ ru: 'ДОЧЬ', reading: "Doç'", tr: 'Kız evlat' }, { ru: 'СЫН', reading: 'Sın', tr: 'Oğul' }] },
    ],
    readingDrills: [
      { word: 'сестра', correct: 'Sistrá', distractors: ['Séstra', 'Sestrá', 'Sistra'], tr: 'Kız kardeş' },
      { word: 'муж', correct: 'Muş', distractors: ['Muj', 'Muz', 'Múja'], tr: 'Koca (eş)' },
      { word: 'жена', correct: 'Jıná', distractors: ['Jéna', 'Jená', 'Zená'], tr: 'Karı (eş)' },
      { word: 'родители', correct: 'Radítili', distractors: ['Rodíteli', 'Raditéli', 'Róditeli'], tr: 'Anne-baba' },
      { word: 'дядя', correct: 'Dyádya', distractors: ['Dadya', 'Dyadyá', 'Diadá'], tr: 'Amca/Dayı' }
    ]
  },
  {
    id: 'alpha_23', title: 'Vücut Turu', subtitle: 'Eczane ünitesine hazırlık: neresi ağrıyor, söyleyebil',
    letters: [
      { id: 'a23_1', upper: 'ГОЛОВА', lower: 'голова', translit: 'Galavá', soundHint: 'Baş — üç hece, iki akanje', phoneticRule: 'Голова → "Galavá": iki vurgusuz О da A oldu, vurgu sonda.', examples: [{ ru: 'ГОЛОВА', reading: 'Galavá', tr: 'Baş / Kafa' }] },
      { id: 'a23_2', upper: 'ЖИВОТ', lower: 'живот', translit: 'Jıvót', soundHint: 'Karın — ЖИ yine "jı"', phoneticRule: 'Живот → "Jıvót": ЖИ hecesi kural gereği kalın I ile okunur.', examples: [{ ru: 'ЖИВОТ', reading: 'Jıvót', tr: 'Karın' }, { ru: 'СПИНА', reading: 'Spiná', tr: 'Sırt' }] },
      { id: 'a23_3', upper: 'ГЛАЗА', lower: 'глаза', translit: 'Glazá', soundHint: 'Gözler — tekili глаз (glas)', phoneticRule: 'Глаз (tekil) sonda S; глаза (çoğul) ortada Z — sedasızlaşma sadece sondadır!', examples: [{ ru: 'ГЛАЗА', reading: 'Glazá', tr: 'Gözler' }, { ru: 'УХО', reading: 'Úha', tr: 'Kulak' }] },
    ],
    readingDrills: [
      { word: 'рука', correct: 'Ruká', distractors: ['Rúka', 'Raká', 'Rıka'], tr: 'El / Kol' },
      { word: 'нога', correct: 'Nagá', distractors: ['Nóga', 'Nogá', 'Nagú'], tr: 'Bacak / Ayak' },
      { word: 'зубы', correct: 'Zúbı', distractors: ['Zubı́', 'Zúpı', 'Zyubı'], tr: 'Dişler' },
      { word: 'горло', correct: 'Górla', distractors: ['Garló', 'Górlo', 'Gorlá'], tr: 'Boğaz' },
      { word: 'сердце', correct: 'Syértse', distractors: ['Syérdtse', 'Sertsé', 'Sirdtsé'], tr: 'Kalp' }
    ]
  },
  {
    id: 'alpha_24', title: 'Yemek Masası', subtitle: 'Aşçılık bölümüne ısınma: temel yiyecekleri söküyoruz',
    letters: [
      { id: 'a24_1', upper: 'КАША', lower: 'каша', translit: 'Káşa', soundHint: 'Lapa — Rus kahvaltısının temeli', phoneticRule: 'Каша → "Káşa": kısa, net, vurgu başta. "Щи да каша — пища наша!"', examples: [{ ru: 'КАША', reading: 'Káşa', tr: 'Kaşa (lapa)' }, { ru: 'СУП', reading: 'Sup', tr: 'Çorba' }] },
      { id: 'a24_2', upper: 'МЯСО', lower: 'мясо', translit: 'Myása', soundHint: 'Et — МЯ yumuşak başlar', phoneticRule: 'Мясо → "Myása": Я önceki М\'yi yumuşatır, sondaki О zayıf A.', examples: [{ ru: 'МЯСО', reading: 'Myása', tr: 'Et' }, { ru: 'РЫБА', reading: 'Rı́ba', tr: 'Balık' }] },
      { id: 'a24_3', upper: 'КАРТОШКА', lower: 'картошка', translit: 'Kartóşka', soundHint: 'Patates — resmi adı картофель', phoneticRule: 'Картошка günlük dil, картофель resmi dil — ikisini de tanı.', examples: [{ ru: 'КАРТОШКА', reading: 'Kartóşka', tr: 'Patates' }, { ru: 'ЯЙЦО', reading: 'Yiytsó', tr: 'Yumurta' }] },
    ],
    readingDrills: [
      { word: 'масло', correct: 'Másla', distractors: ['Masló', 'Máslo', 'Mısla'], tr: 'Tereyağı / Yağ' },
      { word: 'огурец', correct: 'Aguryéts', distractors: ['Ogurets', 'Agúrets', 'Ogúrits'], tr: 'Salatalık' },
      { word: 'помидор', correct: 'Pamidór', distractors: ['Pomidór', 'Pamídor', 'Pomídor'], tr: 'Domates' },
      { word: 'колбаса', correct: 'Kalbasá', distractors: ['Kolbása', 'Kálbasa', 'Kolbasá'], tr: 'Sosis/Salam' },
      { word: 'варенье', correct: "Varyén'ye", distractors: ['Varénye', 'Varinyé', 'Váranye'], tr: 'Reçel' }
    ]
  },
  {
    id: 'alpha_25', title: 'İçecekler Rafı', subtitle: 'Kvas, kompot, kefir: Rus buzdolabının üç silahşörü',
    letters: [
      { id: 'a25_1', upper: 'КВАС', lower: 'квас', translit: 'Kvas', soundHint: 'Kvas — ekmekten yapılan milli içecek', phoneticRule: 'Квас → "Kvas": КВ kümesi tek hamlede, yazıldığı gibi.', examples: [{ ru: 'КВАС', reading: 'Kvas', tr: 'Kvas' }, { ru: 'СОК', reading: 'Sok', tr: 'Meyve suyu' }] },
      { id: 'a25_2', upper: 'КОМПОТ', lower: 'компот', translit: 'Kampót', soundHint: 'Komposto suyu — her yemekhanenin üçüncüsü', phoneticRule: 'Компот → "Kampót": ilk О zayıf; "первое, второе и компот!" klasiği.', examples: [{ ru: 'КОМПОТ', reading: 'Kampót', tr: 'Komposto' }] },
      { id: 'a25_3', upper: 'КЕФИР', lower: 'кефир', translit: 'Kifír', soundHint: 'Kefir — Kafkas hediyesi', phoneticRule: 'Кефир → "Kifír": vurgusuz Е zayıflar, vurgu sonda.', examples: [{ ru: 'КЕФИР', reading: 'Kifír', tr: 'Kefir' }, { ru: 'ПИВО', reading: 'Píva', tr: 'Bira' }] },
    ],
    readingDrills: [
      { word: 'вино', correct: 'Vinó', distractors: ['Víno', 'Vinjó', 'Viná'], tr: 'Şarap' },
      { word: 'морс', correct: 'Mors', distractors: ['Morz', 'Mórsa', 'Marós'], tr: 'Meyveli içecek (mors)' },
      { word: 'лимонад', correct: 'Limanát', distractors: ['Limonád', 'Límonad', 'Limonat'], tr: 'Limonata / Gazoz' },
      { word: 'кипяток', correct: 'Kipitók', distractors: ['Kípyatok', 'Kipyaták', 'Kipitka'], tr: 'Kaynar su' },
      { word: 'сливки', correct: 'Slífki', distractors: ['Slivkí', 'Sılivki', 'Slifká'], tr: 'Krema' }
    ]
  },
  {
    id: 'alpha_26', title: 'Şehir Turu', subtitle: 'Müze, tiyatro, köprü: turist rotası kelimeleri',
    letters: [
      { id: 'a26_1', upper: 'УЛИЦА', lower: 'улица', translit: 'Úlitsa', soundHint: 'Sokak/Cadde — adres dilinin temeli', phoneticRule: 'Улица → "Úlitsa": vurgu başta; adreslerde "ул." diye kısaltılır.', examples: [{ ru: 'УЛИЦА', reading: 'Úlitsa', tr: 'Sokak' }, { ru: 'МОСТ', reading: 'Most', tr: 'Köprü' }] },
      { id: 'a26_2', upper: 'ЦЕРКОВЬ', lower: 'церковь', translit: "Tsérkaf'", soundHint: 'Kilise — soğan kubbelerin adı', phoneticRule: 'Церковь → "Tsérkaf\'": sondaki ВЬ sedasızlaşıp incelir.', examples: [{ ru: 'ЦЕРКОВЬ', reading: "Tsérkaf'", tr: 'Kilise' }] },
      { id: 'a26_3', upper: 'ГОСТИНИЦА', lower: 'гостиница', translit: 'Gastínitsa', soundHint: 'Otel — "misafir" kökünden', phoneticRule: 'Гостиница → "Gastínitsa": гость (misafir) + -ница (yer eki) = misafirhane.', examples: [{ ru: 'ГОСТИНИЦА', reading: 'Gastínitsa', tr: 'Otel' }, { ru: 'МУЗЕЙ', reading: 'Muzyéy', tr: 'Müze' }] },
    ],
    readingDrills: [
      { word: 'театр', correct: 'Tiátr', distractors: ['Teátr', 'Tyatr', 'Teatra'], tr: 'Tiyatro' },
      { word: 'библиотека', correct: 'Bibliatyéka', distractors: ['Bibliotéka', 'Biblíoteka', 'Biblatéka'], tr: 'Kütüphane' },
      { word: 'парк', correct: 'Park', distractors: ['Párka', 'Pırk', 'Parík'], tr: 'Park' },
      { word: 'банк', correct: 'Bank', distractors: ['Banık', 'Bánka', 'Bang'], tr: 'Banka' },
      { word: 'площадь', correct: "Plóşşit'", distractors: ['Ploşad', 'Plaşşát', 'Plóşad'], tr: 'Meydan' }
    ]
  },
  {
    id: 'alpha_27', title: 'Meslekleri Oku', subtitle: 'Doktor, öğretmen, aşçı: "Кем ты работаешь?" hazırlığı',
    letters: [
      { id: 'a27_1', upper: 'ВРАЧ', lower: 'врач', translit: 'Vraç', soundHint: 'Doktor — tek hece, ВР kümesi', phoneticRule: 'Врач → "Vraç": ВР başta tek hamlede çıkar.', examples: [{ ru: 'ВРАЧ', reading: 'Vraç', tr: 'Doktor' }, { ru: 'ПОВАР', reading: 'Póvar', tr: 'Aşçı' }] },
      { id: 'a27_2', upper: 'УЧИТЕЛЬ', lower: 'учитель', translit: "Uçítil'", soundHint: 'Öğretmen — sonda ince ЛЬ', phoneticRule: 'Учитель → "Uçítil\'": -тель eki meslek üretir (строитель, водитель...).', examples: [{ ru: 'УЧИТЕЛЬ', reading: "Uçítil'", tr: 'Öğretmen' }] },
      { id: 'a27_3', upper: 'ИНЖЕНЕР', lower: 'инженер', translit: 'Injınyér', soundHint: 'Mühendis — Fransız aksanıyla gelmiş', phoneticRule: 'Инженер → "Injınyér": ЖЕ hecesi "jı" gibi kalınlaşır.', examples: [{ ru: 'ИНЖЕНЕР', reading: 'Injınyér', tr: 'Mühendis' }] },
    ],
    readingDrills: [
      { word: 'водитель', correct: "Vadítil'", distractors: ['Vodítel', 'Vadityél', 'Vóditel'], tr: 'Şoför' },
      { word: 'продавец', correct: 'Pradavyéts', distractors: ['Prodavéts', 'Pradávets', 'Prodovéts'], tr: 'Satıcı' },
      { word: 'юрист', correct: 'Yuríst', distractors: ['Júrist', 'Yúrist', 'Yurísta'], tr: 'Avukat/Hukukçu' },
      { word: 'актёр', correct: 'Aktyór', distractors: ['Aktér', 'Áktyor', 'Akter'], tr: 'Aktör' },
      { word: 'строитель', correct: "Straítil'", distractors: ['Stroítel', 'Straityél', 'Stróitel'], tr: 'İnşaatçı' }
    ]
  },
  {
    id: 'alpha_28', title: 'Hareket Fiilleri', subtitle: 'идти/ехать farkı: yürüyerek mi araçla mı?',
    letters: [
      { id: 'a28_1', upper: 'ИДТИ', lower: 'идти', translit: 'Ittí', soundHint: 'Yürüyerek gitmek — ДТ tek T', phoneticRule: 'Идти → "Ittí": Д, Т\'ye yapışıp kaybolur. SADECE yürümek için!', examples: [{ ru: 'ИДТИ', reading: 'Ittí', tr: 'Gitmek (yürüyerek)' }] },
      { id: 'a28_2', upper: 'ЕХАТЬ', lower: 'ехать', translit: "Yéhat'", soundHint: 'Araçla gitmek — Е başta YE', phoneticRule: 'Ехать → "Yéhat\'": araba, metro, trenle gidiş. Yürüyerek "ехать" denmez!', examples: [{ ru: 'ЕХАТЬ', reading: "Yéhat'", tr: 'Gitmek (araçla)' }] },
      { id: 'a28_3', upper: 'БЕЖАТЬ', lower: 'бежать', translit: "Biját'", soundHint: 'Koşmak — geç kalanların fiili', phoneticRule: 'Бежать → "Biját\'": vurgusuz Е zayıflar. "Я бегу!" (Koşuyorum!)', examples: [{ ru: 'БЕЖАТЬ', reading: "Biját'", tr: 'Koşmak' }, { ru: 'ЛЕТЕТЬ', reading: "Lityét'", tr: 'Uçmak' }] },
    ],
    readingDrills: [
      { word: 'ходить', correct: "Hadít'", distractors: ['Hódit', 'Hodít', 'Haditı'], tr: 'Yürümek (düzenli)' },
      { word: 'ездить', correct: "Yézdit'", distractors: ['Yezdít', 'Ézdit', 'Yizdít'], tr: 'Gitmek (düzenli, araçla)' },
      { word: 'плыть', correct: "Plıt'", distractors: ['Plit', 'Pılıt', 'Plıtı'], tr: 'Yüzmek' },
      { word: 'нести', correct: 'Nistí', distractors: ['Nésti', 'Nestí', 'Nisti'], tr: 'Taşımak' },
      { word: 'бегу', correct: 'Bigú', distractors: ['Bégu', 'Begú', 'Bigya'], tr: 'Koşuyorum' }
    ]
  },
  {
    id: 'alpha_29', title: 'Günlük Fiiller', subtitle: 'Konuş, dinle, oku, yaz: dilin dört motoru',
    letters: [
      { id: 'a29_1', upper: 'ГОВОРИТЬ', lower: 'говорить', translit: "Gavarít'", soundHint: 'Konuşmak — çifte akanje', phoneticRule: 'Говорить → "Gavarít\'": iki О da A. "Вы говорите по-русски?"', examples: [{ ru: 'ГОВОРИТЬ', reading: "Gavarít'", tr: 'Konuşmak' }] },
      { id: 'a29_2', upper: 'СЛУШАТЬ', lower: 'слушать', translit: "Slúşat'", soundHint: 'Dinlemek — vurgu başta', phoneticRule: 'Слушать (dinlemek) ≠ слышать (duymak): biri çabadır, öteki sonuç!', examples: [{ ru: 'СЛУШАТЬ', reading: "Slúşat'", tr: 'Dinlemek' }, { ru: 'ДУМАТЬ', reading: "Dúmat'", tr: 'Düşünmek' }] },
      { id: 'a29_3', upper: 'ОТДЫХАТЬ', lower: 'отдыхать', translit: "Addıhát'", soundHint: 'Dinlenmek — ТД çifti tek D', phoneticRule: 'Отдыхать → "Addıhát\'": Т, Д\'ye asimile olur. Tatilin fiili!', examples: [{ ru: 'ОТДЫХАТЬ', reading: "Addıhát'", tr: 'Dinlenmek' }] },
    ],
    readingDrills: [
      { word: 'читать', correct: "Çitát'", distractors: ['Çítat', 'Tsitát', 'Çitat'], tr: 'Okumak' },
      { word: 'писать', correct: "Pisát'", distractors: ['Písat', 'Pısát', 'Pisat'], tr: 'Yazmak' },
      { word: 'знать', correct: "Znat'", distractors: ['Znat', 'Zınat', 'Znatı'], tr: 'Bilmek' },
      { word: 'понимать', correct: "Panimát'", distractors: ['Ponímat', 'Panímat', 'Ponimát'], tr: 'Anlamak' },
      { word: 'смотреть', correct: "Smatryét'", distractors: ['Smotrét', 'Smótret', 'Smatret'], tr: 'Bakmak/İzlemek' }
    ]
  },
  {
    id: 'alpha_30', title: 'Zıt Sıfatlar', subtitle: 'Büyük-küçük, sıcak-soğuk: karşıtlıklarla oku',
    letters: [
      { id: 'a30_1', upper: 'БОЛЬШОЙ', lower: 'большой', translit: "Bal'şóy", soundHint: 'Büyük — ЛЬ ortada ince', phoneticRule: 'Большой → "Bal\'şóy": Большой театр = Bolşoy Tiyatrosu, kelimesi kelimesine "Büyük Tiyatro"!', examples: [{ ru: 'БОЛЬШОЙ', reading: "Bal'şóy", tr: 'Büyük' }, { ru: 'МАЛЕНЬКИЙ', reading: "Málin'kiy", tr: 'Küçük' }] },
      { id: 'a30_2', upper: 'ГОРЯЧИЙ', lower: 'горячий', translit: 'Garyáçiy', soundHint: 'Sıcak (dokunulur) — çay için bu', phoneticRule: 'Горячий (sıcak nesne) ≠ жаркий (sıcak hava): çay горячий, yaz жаркий!', examples: [{ ru: 'ГОРЯЧИЙ', reading: 'Garyáçiy', tr: 'Sıcak (nesne)' }, { ru: 'ХОЛОДНЫЙ', reading: 'Halódnıy', tr: 'Soğuk' }] },
      { id: 'a30_3', upper: 'ВКУСНЫЙ', lower: 'вкусный', translit: 'Fkúsnıy', soundHint: 'Lezzetli — baştaki В, F okunur', phoneticRule: 'Вкусный → "Fkúsnıy": sert К\'dan önce В sedasızlaşır. "Очень вкусно!"', examples: [{ ru: 'ВКУСНЫЙ', reading: 'Fkúsnıy', tr: 'Lezzetli' }] },
    ],
    readingDrills: [
      { word: 'старый', correct: 'Stárıy', distractors: ['Starıy', 'Stárí', 'Starói'], tr: 'Eski / Yaşlı' },
      { word: 'новый', correct: 'Nóvıy', distractors: ['Novıy', 'Nóví', 'Navói'], tr: 'Yeni' },
      { word: 'быстрый', correct: 'Bı́strıy', distractors: ['Bistrıy', 'Bıstrí', 'Bistrói'], tr: 'Hızlı' },
      { word: 'медленный', correct: 'Myédlinnıy', distractors: ['Medlénnıy', 'Midlenní', 'Médlenni'], tr: 'Yavaş' },
      { word: 'дорогой', correct: 'Daragóy', distractors: ['Dórogoy', 'Dorogói', 'Darógoy'], tr: 'Pahalı / Değerli' }
    ]
  },
  {
    id: 'alpha_31', title: 'Hava & Doğa', subtitle: 'Дождь kelimesini okuyabilirsen her şeyi okursun',
    letters: [
      { id: 'a31_1', upper: 'ДОЖДЬ', lower: 'дождь', translit: "Doşt'", soundHint: 'Yağmur — 5 harf, 3.5 ses', phoneticRule: 'Дождь → "Doşt\'": ЖДЬ kümesi sonda "şt\'" diye sıkışır. Sarı şemsiye havası!', examples: [{ ru: 'ДОЖДЬ', reading: "Doşt'", tr: 'Yağmur' }, { ru: 'ВЕТЕР', reading: 'Vyétir', tr: 'Rüzgar' }] },
      { id: 'a31_2', upper: 'ГРОЗА', lower: 'гроза', translit: 'Grazá', soundHint: 'Fırtına/Gök gürültülü sağanak', phoneticRule: 'Гроза → "Grazá": vurgu sonda; "grozní" (korkunç) ile akrabadır.', examples: [{ ru: 'ГРОЗА', reading: 'Grazá', tr: 'Fırtına' }, { ru: 'ЛЁД', reading: 'Lyot', tr: 'Buz' }] },
      { id: 'a31_3', upper: 'СОЛНЕЧНО', lower: 'солнечно', translit: 'Sólniçna', soundHint: 'Güneşli — yine sessiz Л!', phoneticRule: 'Солнечно → "Sólniçna": солнце\'deki gibi Л okunmaz.', examples: [{ ru: 'СОЛНЕЧНО', reading: 'Sólniçna', tr: 'Güneşli' }, { ru: 'ОБЛАКО', reading: 'Óblaka', tr: 'Bulut' }] },
    ],
    readingDrills: [
      { word: 'туман', correct: 'Tumán', distractors: ['Túman', 'Tuman', 'Tumána'], tr: 'Sis' },
      { word: 'жара', correct: 'Jará', distractors: ['Jára', 'Jarah', 'Zará'], tr: 'Sıcaklık (aşırı)' },
      { word: 'холодно', correct: 'Hóladna', distractors: ['Holódno', 'Haladnó', 'Hóladno'], tr: 'Soğuk (hava)' },
      { word: 'тепло', correct: 'Tipló', distractors: ['Tépla', 'Tepló', 'Típlo'], tr: 'Ilık / Sıcacık' },
      { word: 'мороз', correct: 'Marós', distractors: ['Moróz', 'Móroz', 'Marózı'], tr: 'Ayaz / Don' }
    ]
  },
  {
    id: 'alpha_32', title: 'Hayvanlar Alemi', subtitle: 'Ayı, kurt, kirpi: masalların kadrosunu oku',
    letters: [
      { id: 'a32_1', upper: 'МЕДВЕДЬ', lower: 'медведь', translit: "Midvyét'", soundHint: 'Ayı — "bal bilen" demek!', phoneticRule: 'Медведь → "Midvyét\'": мёд (bal) + ведать (bilmek) = bal bilen. Sonda ince Т.', examples: [{ ru: 'МЕДВЕДЬ', reading: "Midvyét'", tr: 'Ayı' }, { ru: 'ВОЛК', reading: 'Volk', tr: 'Kurt' }] },
      { id: 'a32_2', upper: 'ЁЖ', lower: 'ёж', translit: 'Yoş', soundHint: 'Kirpi — iki harf, tam kural seti', phoneticRule: 'Ёж → "Yoş": Ё vurgulu, Ж sonda Ş. Smeshariki\'nin Yojik\'i!', examples: [{ ru: 'ЁЖ', reading: 'Yoş', tr: 'Kirpi' }, { ru: 'ЗАЯЦ', reading: 'Záyits', tr: 'Tavşan' }] },
      { id: 'a32_3', upper: 'ЛОШАДЬ', lower: 'лошадь', translit: "Lóşıt'", soundHint: 'At — dişil bir kelime', phoneticRule: 'Лошадь → "Lóşıt\'": sondaki ДЬ sedasızlaşıp incelir.', examples: [{ ru: 'ЛОШАДЬ', reading: "Lóşıt'", tr: 'At' }, { ru: 'КОРОВА', reading: 'Karóva', tr: 'İnek' }] },
    ],
    readingDrills: [
      { word: 'лиса', correct: 'Lisá', distractors: ['Lísa', 'Liza', 'Lısá'], tr: 'Tilki' },
      { word: 'белка', correct: 'Byélka', distractors: ['Bélka', 'Bilká', 'Byelká'], tr: 'Sincap' },
      { word: 'птица', correct: 'Ptítsa', distractors: ['Pititsa', 'Ptitsá', 'Pıtítsa'], tr: 'Kuş' },
      { word: 'рыбка', correct: 'Rı́pka', distractors: ['Rıbka', 'Ribká', 'Ribka'], tr: 'Balıkçık' },
      { word: 'котёнок', correct: 'Katyónak', distractors: ['Koténok', 'Katinók', 'Kótenok'], tr: 'Kedi yavrusu' }
    ]
  },
  {
    id: 'alpha_33', title: 'Kıyafet Dolabı', subtitle: 'Şapkadan çizmeye: Rus kışının üniforması',
    letters: [
      { id: 'a33_1', upper: 'КУРТКА', lower: 'куртка', translit: 'Kúrtka', soundHint: 'Mont — РТК üçlüsüne dikkat', phoneticRule: 'Куртка → "Kúrtka": üç ünsüz art arda ama panik yok, hepsi okunur.', examples: [{ ru: 'КУРТКА', reading: 'Kúrtka', tr: 'Mont' }, { ru: 'ШАПКА', reading: 'Şápka', tr: 'Bere/Şapka' }] },
      { id: 'a33_2', upper: 'ПАЛЬТО', lower: 'пальто', translit: "Pal'tó", soundHint: 'Palto — Türkçeyle akraba!', phoneticRule: 'Пальто hiç çekilmez (yabancı kökenli): hep "pal\'tó" kalır.', examples: [{ ru: 'ПАЛЬТО', reading: "Pal'tó", tr: 'Palto' }] },
      { id: 'a33_3', upper: 'ОБУВЬ', lower: 'обувь', translit: "Óbuf'", soundHint: 'Ayakkabı (genel) — sonda ВЬ = F\'', phoneticRule: 'Обувь → "Óbuf\'": mağaza tabelalarının klasiği.', examples: [{ ru: 'ОБУВЬ', reading: "Óbuf'", tr: 'Ayakkabı' }, { ru: 'САПОГИ', reading: 'Sapagí', tr: 'Çizmeler' }] },
    ],
    readingDrills: [
      { word: 'рубашка', correct: 'Rubáşka', distractors: ['Rúbaşka', 'Rubaşká', 'Rıbáşka'], tr: 'Gömlek' },
      { word: 'брюки', correct: 'Bryúki', distractors: ['Brúki', 'Biryúki', 'Bryukí'], tr: 'Pantolon' },
      { word: 'платье', correct: 'Plátye', distractors: ['Platyé', 'Pılatye', 'Plátiye'], tr: 'Elbise' },
      { word: 'носки', correct: 'Naskí', distractors: ['Nóski', 'Noskí', 'Naskı'], tr: 'Çoraplar' },
      { word: 'перчатки', correct: 'Pirçátki', distractors: ['Perçátki', 'Pírçatki', 'Perçatkí'], tr: 'Eldivenler' }
    ]
  },
  {
    id: 'alpha_34', title: 'Ev Eşyaları', subtitle: 'Buzdolabından yastığa: ev turu',
    letters: [
      { id: 'a34_1', upper: 'ХОЛОДИЛЬНИК', lower: 'холодильник', translit: "Haladíl'nik", soundHint: 'Buzdolabı — "soğuk yapan"', phoneticRule: 'Холодильник → "Haladíl\'nik": холод (soğuk) kökü + -ильник (alet eki).', examples: [{ ru: 'ХОЛОДИЛЬНИК', reading: "Haladíl'nik", tr: 'Buzdolabı' }] },
      { id: 'a34_2', upper: 'КРОВАТЬ', lower: 'кровать', translit: "Kravát'", soundHint: 'Yatak — sonda ince T', phoneticRule: 'Кровать → "Kravát\'": Yunancadan gelmiştir, "kerevet"le akrabadır!', examples: [{ ru: 'КРОВАТЬ', reading: "Kravát'", tr: 'Yatak' }, { ru: 'ДИВАН', reading: 'Diván', tr: 'Kanepe' }] },
      { id: 'a34_3', upper: 'ЗЕРКАЛО', lower: 'зеркало', translit: 'Zyérkala', soundHint: 'Ayna — vurgu başta', phoneticRule: 'Зеркало → "Zyérkala": son iki О da zayıf A.', examples: [{ ru: 'ЗЕРКАЛО', reading: 'Zyérkala', tr: 'Ayna' }, { ru: 'ШКАФ', reading: 'Şkaf', tr: 'Dolap' }] },
    ],
    readingDrills: [
      { word: 'стул', correct: 'Stul', distractors: ['Stol', 'Sıtul', 'Stula'], tr: 'Sandalye' },
      { word: 'подушка', correct: 'Padúşka', distractors: ['Póduşka', 'Poduşká', 'Padoşka'], tr: 'Yastık' },
      { word: 'одеяло', correct: 'Adiyála', distractors: ['Odeyálo', 'Ódeyala', 'Adéyalo'], tr: 'Battaniye/Yorgan' },
      { word: 'ковёр', correct: 'Kavyór', distractors: ['Kóver', 'Kovér', 'Kavér'], tr: 'Halı' },
      { word: 'чайник', correct: 'Çáynik', distractors: ['Çayník', 'Tsáynik', 'Çaynák'], tr: 'Çaydanlık' }
    ]
  },
  {
    id: 'alpha_35', title: 'Erkek İsimleri', subtitle: 'Aleksandr\'dan Sergey\'e: isimleri ilk duyuşta yakala',
    letters: [
      { id: 'a35_1', upper: 'АЛЕКСАНДР', lower: 'Александр', translit: 'Aliksándr', soundHint: 'En popüler Rus erkek ismi', phoneticRule: 'Александр → "Aliksándr": kısaltması Саша (Sáşa) — bambaşka görünür ama aynı kişi!', examples: [{ ru: 'АЛЕКСАНДР', reading: 'Aliksándr', tr: 'Aleksandr (Saşa)' }] },
      { id: 'a35_2', upper: 'ДМИТРИЙ', lower: 'Дмитрий', translit: 'Dmítriy', soundHint: 'ДМ başta tek hamlede', phoneticRule: 'Дмитрий → "Dmítriy": kısaltması Дима — bizim kahramanımız!', examples: [{ ru: 'ДМИТРИЙ', reading: 'Dmítriy', tr: 'Dmitriy (Dima)' }] },
      { id: 'a35_3', upper: 'СЕРГЕЙ', lower: 'Сергей', translit: 'Sirgyéy', soundHint: 'Vurgu sonda — "Syergey" değil!', phoneticRule: 'Сергей → "Sirgyéy": ilk Е zayıflar; kısaltması Серёжа (Siryója).', examples: [{ ru: 'СЕРГЕЙ', reading: 'Sirgyéy', tr: 'Sergey' }] },
    ],
    readingDrills: [
      { word: 'Владимир', correct: 'Vladímir', distractors: ['Vládimir', 'Vladimír', 'Vıladimir'], tr: 'Vladimir (Vova)' },
      { word: 'Николай', correct: 'Nikaláy', distractors: ['Níkolay', 'Nikólay', 'Nikalay'], tr: 'Nikolay (Kolya)' },
      { word: 'Андрей', correct: 'Andryéy', distractors: ['Ándrey', 'Andrei', 'Andıréy'], tr: 'Andrey' },
      { word: 'Михаил', correct: 'Mihaíl', distractors: ['Míhail', 'Mihail', 'Mıháil'], tr: 'Mihail (Mişa)' },
      { word: 'Алексей', correct: 'Aliksyéy', distractors: ['Áleksey', 'Aleksei', 'Aliksyey'], tr: 'Aleksey (Lyoşa)' }
    ]
  },
  {
    id: 'alpha_36', title: 'Kadın İsimleri', subtitle: 'Anastasia\'dan Yulia\'ya: -я ile biten zarafet',
    letters: [
      { id: 'a36_1', upper: 'АНАСТАСИЯ', lower: 'Анастасия', translit: 'Anastasíya', soundHint: 'Vurgu Сİ hecesinde', phoneticRule: 'Анастасия → "Anastasíya": kısaltması Настя (Nástya).', examples: [{ ru: 'АНАСТАСИЯ', reading: 'Anastasíya', tr: 'Anastasia (Nastya)' }] },
      { id: 'a36_2', upper: 'ЕКАТЕРИНА', lower: 'Екатерина', translit: 'Yikatirína', soundHint: 'Başta YE, vurgu Rİ hecesinde', phoneticRule: 'Екатерина → "Yikatirína": kısaltması Катя (Kátya).', examples: [{ ru: 'ЕКАТЕРИНА', reading: 'Yikatirína', tr: 'Yekaterina (Katya)' }] },
      { id: 'a36_3', upper: 'ОЛЬГА', lower: 'Ольга', translit: "Ól'ga", soundHint: 'ЛЬ ortada ince', phoneticRule: 'Ольга → "Ól\'ga": kısaltması Оля (Ólya).', examples: [{ ru: 'ОЛЬГА', reading: "Ól'ga", tr: 'Olga (Olya)' }] },
    ],
    readingDrills: [
      { word: 'Наталья', correct: "Natál'ya", distractors: ['Natalyá', 'Nátalya', 'Natália'], tr: 'Natalya (Nataşa)' },
      { word: 'Татьяна', correct: "Tat'yána", distractors: ['Tátyana', 'Tatyaná', 'Tatiana'], tr: 'Tatyana (Tanya)' },
      { word: 'Ирина', correct: 'Irína', distractors: ['Írina', 'Iriná', 'İrena'], tr: 'İrina (İra)' },
      { word: 'Светлана', correct: 'Svitlána', distractors: ['Svétlana', 'Svetlaná', 'Sıvetlana'], tr: 'Svetlana (Sveta)' },
      { word: 'Юлия', correct: 'Yúliya', distractors: ['Yulíya', 'Júlia', 'Yuliyá'], tr: 'Yulia (Yulya)' }
    ]
  },
  {
    id: 'alpha_37', title: 'Şehirler & Coğrafya', subtitle: 'Sibirya\'dan Baykal\'a: harita okuma turu',
    letters: [
      { id: 'a37_1', upper: 'САНКТ-ПЕТЕРБУРГ', lower: 'Санкт-Петербург', translit: 'Sankt-Pitirbúrk', soundHint: 'Kuzeyin başkenti — sonda Г→К', phoneticRule: 'Петербург → "Pitirbúrk": vurgusuz Е\'ler zayıflar, sondaki Г sedasızlaşır. Kısaca Питер!', examples: [{ ru: 'САНКТ-ПЕТЕРБУРГ', reading: 'Sankt-Pitirbúrk', tr: 'Sankt-Petersburg' }] },
      { id: 'a37_2', upper: 'СИБИРЬ', lower: 'Сибирь', translit: "Sibír'", soundHint: 'Sibirya — dişil bir kelime!', phoneticRule: 'Сибирь → "Sibír\'": sonda ince Р; "в Сибири" (Sibirya\'da).', examples: [{ ru: 'СИБИРЬ', reading: "Sibír'", tr: 'Sibirya' }, { ru: 'ВОЛГА', reading: 'Vólga', tr: 'Volga' }] },
      { id: 'a37_3', upper: 'НОВОСИБИРСК', lower: 'Новосибирск', translit: 'Navasibírsk', soundHint: 'РСК üçlüsüyle biten dev şehir', phoneticRule: 'Новосибирск → "Navasibírsk": iki akanje + sonda üç ünsüz.', examples: [{ ru: 'НОВОСИБИРСК', reading: 'Navasibírsk', tr: 'Novosibirsk' }] },
    ],
    readingDrills: [
      { word: 'Казань', correct: "Kazán'", distractors: ['Kázan', 'Kazan', 'Kazánya'], tr: 'Kazan' },
      { word: 'Сочи', correct: 'Sóçi', distractors: ['Soçí', 'Sótsi', 'Sóşi'], tr: 'Soçi' },
      { word: 'Владивосток', correct: 'Vladivastók', distractors: ['Vladivostók', 'Vladívostok', 'Vıladivostok'], tr: 'Vladivostok' },
      { word: 'Байкал', correct: 'Baykál', distractors: ['Báykal', 'Baykala', 'Bıkál'], tr: 'Baykal Gölü' },
      { word: 'Екатеринбург', correct: 'Yikatirinbúrk', distractors: ['Yekaterinbúrg', 'Ekáterinburg', 'Yikaterinbúrg'], tr: 'Yekaterinburg' }
    ]
  },
  {
    id: 'alpha_38', title: 'Yalancı Dostlar', subtitle: 'Магазин dergi DEĞİL, фамилия aile DEĞİL!',
    letters: [
      { id: 'a38_1', upper: 'ЖУРНАЛ', lower: 'журнал', translit: 'Jurnál', soundHint: 'DERGİ demek (magazin değil!)', phoneticRule: 'Журнал = dergi; магазин = mağaza/market. İkisi de Türkçe sezgiyi ters köşe yapar!', examples: [{ ru: 'ЖУРНАЛ', reading: 'Jurnál', tr: 'Dergi' }] },
      { id: 'a38_2', upper: 'ФАМИЛИЯ', lower: 'фамилия', translit: 'Famíliya', soundHint: 'SOYAD demek (aile değil!)', phoneticRule: 'Фамилия = soyad! Aile ise семья. Formlarda "Имя и фамилия" = ad ve soyad.', examples: [{ ru: 'ФАМИЛИЯ', reading: 'Famíliya', tr: 'Soyad' }] },
      { id: 'a38_3', upper: 'КОСТЮМ', lower: 'костюм', translit: 'Kastyúm', soundHint: 'Takım elbise (kostüm de olur)', phoneticRule: 'Костюм hem takım elbise hem kostüm; iş görüşmesinde "в костюме" gelmek şarttır.', examples: [{ ru: 'КОСТЮМ', reading: 'Kastyúm', tr: 'Takım elbise' }] },
    ],
    readingDrills: [
      { word: 'газета', correct: 'Gazyéta', distractors: ['Gazéta', 'Gázeta', 'Gazetá'], tr: 'Gazete' },
      { word: 'институт', correct: 'Institút', distractors: ['Ínstitut', 'Instítut', 'İnstituta'], tr: 'Enstitü/Yüksekokul' },
      { word: 'парик', correct: 'Parík', distractors: ['Párik', 'Parik', 'Pırík'], tr: 'Peruk (park değil!)' },
      { word: 'курс', correct: 'Kurs', distractors: ['Kúrsa', 'Kırs', 'Kursu'], tr: 'Kur / Kurs' },
      { word: 'бланк', correct: 'Blank', distractors: ['Bılank', 'Blánka', 'Blang'], tr: 'Form (boş kağıt)' }
    ]
  },
  {
    id: 'alpha_39', title: 'Uluslararası Kelimeler', subtitle: 'Bildiğin kelimeleri Kiril kılığında tanı',
    letters: [
      { id: 'a39_1', upper: 'КОМПЬЮТЕР', lower: 'компьютер', translit: "Kamp'yúter", soundHint: 'Bilgisayar — ПЬЮ üçlüsüne dikkat', phoneticRule: 'Компьютер → "Kamp\'yúter": Ь burada П ile Ю\'yu ayırır.', examples: [{ ru: 'КОМПЬЮТЕР', reading: "Kamp'yúter", tr: 'Bilgisayar' }] },
      { id: 'a39_2', upper: 'ИНТЕРНЕТ', lower: 'интернет', translit: 'Intırnét', soundHint: 'İnternet — TE sert okunur', phoneticRule: 'Интернет → "Intırnét": yabancı kelimelerde ТЕ bazen sert "tı" kalır.', examples: [{ ru: 'ИНТЕРНЕТ', reading: 'Intırnét', tr: 'İnternet' }] },
      { id: 'a39_3', upper: 'УНИВЕРСИТЕТ', lower: 'университет', translit: 'Univirsityét', soundHint: '11 harf ama tanıdık', phoneticRule: 'Университет → "Univirsityét": vurgu sonda, ortadaki Е\'ler zayıflar.', examples: [{ ru: 'УНИВЕРСИТЕТ', reading: 'Univirsityét', tr: 'Üniversite' }] },
    ],
    readingDrills: [
      { word: 'программа', correct: 'Pragráma', distractors: ['Prográmma', 'Prógrama', 'Pırogram'], tr: 'Program' },
      { word: 'музыка', correct: 'Múzıka', distractors: ['Muzıká', 'Muzíka', 'Múzika'], tr: 'Müzik' },
      { word: 'футбол', correct: 'Futból', distractors: ['Fútbol', 'Futbol', 'Fudból'], tr: 'Futbol' },
      { word: 'шоколад', correct: 'Şakalát', distractors: ['Şokolád', 'Şókolad', 'Çokolát'], tr: 'Çikolata' },
      { word: 'такси', correct: 'Taksí', distractors: ['Táksi', 'Taksi', 'Tıksí'], tr: 'Taksi' }
    ]
  },
  {
    id: 'alpha_40', title: 'Zor Ünsüz Kümeleri', subtitle: 'ВСТР, ВЗГЛ, ЗДР: dört ünsüzü tek nefeste söyle',
    letters: [
      { id: 'a40_1', upper: 'ВСТРЕЧА', lower: 'встреча', translit: 'Fstryéça', soundHint: 'Buluşma — ВСТР dörtlüsü!', phoneticRule: 'Встреча → "Fstryéça": В sedasızlaşır (F), sonra STR tek hamlede. "До встречи!" (Görüşmek üzere!)', examples: [{ ru: 'ВСТРЕЧА', reading: 'Fstryéça', tr: 'Buluşma' }] },
      { id: 'a40_2', upper: 'ВЗГЛЯД', lower: 'взгляд', translit: 'Vzglyat', soundHint: 'Bakış — ВЗГЛ dörtlüsü', phoneticRule: 'Взгляд → "Vzglyat": dört ünsüz + sonda Д→Т. Romanların favori kelimesi.', examples: [{ ru: 'ВЗГЛЯД', reading: 'Vzglyat', tr: 'Bakış' }] },
      { id: 'a40_3', upper: 'ЗДАНИЕ', lower: 'здание', translit: 'Zdániye', soundHint: 'Bina — ЗД yumuşak giriş', phoneticRule: 'Здание → "Zdániye": -ие eki "-iye" okunur.', examples: [{ ru: 'ЗДАНИЕ', reading: 'Zdániye', tr: 'Bina' }] },
    ],
    readingDrills: [
      { word: 'страна', correct: 'Straná', distractors: ['Strána', 'Sıtrana', 'Stranı́'], tr: 'Ülke' },
      { word: 'быстро', correct: 'Bı́stra', distractors: ['Bıstró', 'Bístro', 'Bistrá'], tr: 'Hızlıca' },
      { word: 'спросить', correct: "Sprasít'", distractors: ['Sprósit', 'Spırasit', 'Sprosít'], tr: 'Sormak' },
      { word: 'государство', correct: 'Gasudárstva', distractors: ['Gosudárstvo', 'Gósudarstva', 'Gasudarstvá'], tr: 'Devlet' },
      { word: 'здоровый', correct: 'Zdaróvıy', distractors: ['Zdórovıy', 'Zdoróví', 'Zıdaróvıy'], tr: 'Sağlıklı' }
    ]
  },
  {
    id: 'alpha_41', title: 'Kalıp Cümleleri Oku', subtitle: 'Как дела, конечно, до встречи: blok halinde tanı',
    letters: [
      { id: 'a41_1', upper: 'КАК ДЕЛА?', lower: 'как дела?', translit: 'Kak dilá?', soundHint: 'Nasılsın? — iki kelime tek nefes', phoneticRule: 'Как дела → "Kak dilá": vurgusuz Е zayıflar; cevap "Хорошо!"', examples: [{ ru: 'КАК ДЕЛА?', reading: 'Kak dilá?', tr: 'Nasılsın?' }] },
      { id: 'a41_2', upper: 'ВСЁ В ПОРЯДКЕ', lower: 'всё в порядке', translit: 'Fsyo f paryátke', soundHint: 'Her şey yolunda — iki F sesi', phoneticRule: 'Всё в порядке → "Fsyo f paryátke": her iki В de sedasızlaşır!', examples: [{ ru: 'ВСЁ В ПОРЯДКЕ', reading: 'Fsyo f paryátke', tr: 'Her şey yolunda' }] },
      { id: 'a41_3', upper: 'С УДОВОЛЬСТВИЕМ', lower: 'с удовольствием', translit: "S udavól'stviyem", soundHint: 'Memnuniyetle — davetlere cevap', phoneticRule: 'С удовольствием → "S udavól\'stviyem": davete en şık evet.', examples: [{ ru: 'С УДОВОЛЬСТВИЕМ', reading: "S udavól'stviyem", tr: 'Memnuniyetle' }] },
    ],
    readingDrills: [
      { word: 'до встречи', correct: 'Da fstryéçi', distractors: ['Do vstréçi', 'Da vstreçí', 'Dó fstreçi'], tr: 'Görüşmek üzere' },
      { word: 'может быть', correct: "Mójıt bıt'", distractors: ['Mojét bıt', 'Mózet bit', 'Mójet bít'], tr: 'Belki' },
      { word: 'ничего себе', correct: 'Niçivó sibyé', distractors: ['Niçégo sébe', 'Níçego sebé', 'Niçevo síbe'], tr: 'Vay canına!' },
      { word: 'что делать', correct: "Şto dyélat'", distractors: ['Çto délat', 'Şto dilát', 'Çito délat'], tr: 'Ne yapmalı' },
      { word: 'добро пожаловать', correct: "Dabró pajálavat'", distractors: ['Dobró pojálovat', 'Dábro pajalavát', 'Dobro pózhalovat'], tr: 'Hoş geldiniz' }
    ]
  },
  {
    id: 'alpha_42', title: 'ЧН = ŞN İstisnaları', subtitle: 'Конечно "kanyéşna" okunur — eski Moskova aksanı yaşıyor',
    letters: [
      { id: 'a42_1', upper: 'КОНЕЧНО', lower: 'конечно', translit: 'Kanyéşna', soundHint: 'Tabii ki — ЧН burada ŞN!', phoneticRule: 'Конечно → "Kanyéşna": eski Moskova telaffuzu bu kelimede zorunludur.', examples: [{ ru: 'КОНЕЧНО', reading: 'Kanyéşna', tr: 'Tabii ki' }] },
      { id: 'a42_2', upper: 'СКУЧНО', lower: 'скучно', translit: 'Skúşna', soundHint: 'Sıkıcı — yine ŞN', phoneticRule: 'Скучно → "Skúşna": "Мне скучно!" (Sıkıldım!) — Dima\'nın kafe akşamı!', examples: [{ ru: 'СКУЧНО', reading: 'Skúşna', tr: 'Sıkıcı' }] },
      { id: 'a42_3', upper: 'ЧТО', lower: 'что', translit: 'Şto', soundHint: 'Ne — ЧТ burada ŞT!', phoneticRule: 'Что → "Şto", чтобы → "ştóbı": en sık iki istisna.', examples: [{ ru: 'ЧТО', reading: 'Şto', tr: 'Ne' }, { ru: 'ЧТОБЫ', reading: 'Ştóbı', tr: '…için / …diye' }] },
    ],
    readingDrills: [
      { word: 'яичница', correct: 'Yiíşnitsa', distractors: ['Yaíçnitsa', 'Yaiçnítsa', 'Yiçnitsá'], tr: 'Sahanda yumurta' },
      { word: 'нарочно', correct: 'Naróşna', distractors: ['Naróçna', 'Nároşna', 'Naroşná'], tr: 'Bilerek / Kasten' },
      { word: 'булочная', correct: 'Búlaşnaya', distractors: ['Búloçnaya', 'Bulaşnayá', 'Buloşná'], tr: 'Fırın (dükkan)' },
      { word: 'скворечник', correct: 'Skvaryéşnik', distractors: ['Skvoréçnik', 'Skvaréçnik', 'Skvoreşník'], tr: 'Kuş evi' },
      { word: 'девичник', correct: 'Divíşnik', distractors: ['Devíçnik', 'Diviçník', 'Déviçnik'], tr: 'Kına gecesi (kız partisi)' }
    ]
  },
  {
    id: 'alpha_43', title: 'Tabelalar 2 — Mağaza Modu', subtitle: 'Açık mı kapalı mı, it mi çek mi? Kapıda kalma!',
    letters: [
      { id: 'a43_1', upper: 'ОТКРЫТО', lower: 'открыто', translit: 'Atkrı́ta', soundHint: 'AÇIK — yeşil tabela', phoneticRule: 'Открыто → "Atkrı́ta" / Закрыто → "Zakrı́ta": kapı kaderini bu iki kelime belirler.', examples: [{ ru: 'ОТКРЫТО', reading: 'Atkrı́ta', tr: 'Açık' }, { ru: 'ЗАКРЫТО', reading: 'Zakrı́ta', tr: 'Kapalı' }] },
      { id: 'a43_2', upper: 'ОСТОРОЖНО', lower: 'осторожно', translit: 'Astarójna', soundHint: 'DİKKAT — metro anonsunun yıldızı', phoneticRule: '"Осторожно, двери закрываются!" (Dikkat, kapılar kapanıyor!) — günde 20 kez duyarsın.', examples: [{ ru: 'ОСТОРОЖНО', reading: 'Astarójna', tr: 'Dikkat' }] },
      { id: 'a43_3', upper: 'ПЕРЕРЫВ', lower: 'перерыв', translit: 'Piriríf', soundHint: 'MOLA — Rus dükkanlarının klasiği', phoneticRule: 'Перерыв → "Piriríf": sonda В→F. "Перерыв 13:00-14:00" tabelası ulusal gelenektir.', examples: [{ ru: 'ПЕРЕРЫВ', reading: 'Piriríf', tr: 'Mola / Ara' }] },
    ],
    readingDrills: [
      { word: 'скидка', correct: 'Skítka', distractors: ['Skídka', 'Skidká', 'Sıkítka'], tr: 'İndirim' },
      { word: 'распродажа', correct: 'Raspradája', distractors: ['Rasprodája', 'Ráspradaja', 'Rasprodaja'], tr: 'Büyük indirim (sale)' },
      { word: 'от себя', correct: 'At sibyá', distractors: ['Ot sébya', 'At sébya', 'Ot sibya'], tr: 'İtiniz' },
      { word: 'к себе', correct: 'K sibyé', distractors: ['K sébe', 'Ka sebé', 'K síbe'], tr: 'Çekiniz' },
      { word: 'не курить', correct: "Ni kurít'", distractors: ['Ne kúrit', 'Ni kúrit', 'Ne kurít'], tr: 'Sigara içilmez' }
    ]
  },
  {
    id: 'alpha_44', title: 'Menü Okuma Kampı', subtitle: 'Борщ, пельмени, блины: restoranda şaşırma',
    letters: [
      { id: 'a44_1', upper: 'БОРЩ', lower: 'борщ', translit: 'Borşş', soundHint: 'Pancar çorbası — Щ uzun ŞŞ', phoneticRule: 'Борщ → "Borşş": 4 harf, ulusal hazine. Смета́на (kaymak) ile servis edilir!', examples: [{ ru: 'БОРЩ', reading: 'Borşş', tr: 'Borç çorbası' }] },
      { id: 'a44_2', upper: 'ПЕЛЬМЕНИ', lower: 'пельмени', translit: "Pil'myéni", soundHint: 'Rus mantısı — ЛЬ ortada ince', phoneticRule: 'Пельмени → "Pil\'myéni": Sibirya\'nın dünyaya hediyesi.', examples: [{ ru: 'ПЕЛЬМЕНИ', reading: "Pil'myéni", tr: 'Pelmeni' }] },
      { id: 'a44_3', upper: 'СЧЁТ', lower: 'счёт', translit: 'Şşot', soundHint: 'Hesap — СЧ birleşip ŞŞ olur!', phoneticRule: 'Счёт → "Şşot": СЧ kümesi Щ gibi okunur. "Счёт, пожалуйста!" (Hesap lütfen!)', examples: [{ ru: 'СЧЁТ', reading: 'Şşot', tr: 'Hesap' }] },
    ],
    readingDrills: [
      { word: 'блины', correct: 'Blinı́', distractors: ['Blíni', 'Bılini', 'Bliný'], tr: 'Krep (blini)' },
      { word: 'салат', correct: 'Salát', distractors: ['Sálat', 'Salat', 'Salta'], tr: 'Salata' },
      { word: 'котлета', correct: 'Katlyéta', distractors: ['Kotléta', 'Kátleta', 'Kotletá'], tr: 'Köfte' },
      { word: 'гарнир', correct: 'Garnír', distractors: ['Gárnir', 'Garnir', 'Garnira'], tr: 'Garnitür' },
      { word: 'десерт', correct: 'Disyért', distractors: ['Désert', 'Desért', 'Dısert'], tr: 'Tatlı' }
    ]
  },
  {
    id: 'alpha_45', title: 'Hız Turu 1 — Resmî Dil', subtitle: 'возможность, обязательно: uzun ama ritmik',
    letters: [
      { id: 'a45_1', upper: 'ВОЗМОЖНОСТЬ', lower: 'возможность', translit: "Vazmójnast'", soundHint: 'İmkan — -ОСТЬ eki hep "-ast\'"', phoneticRule: '-ость ile biten her kelime dişildir ve "-ast\'" okunur: возможность, новость, скорость.', examples: [{ ru: 'ВОЗМОЖНОСТЬ', reading: "Vazmójnast'", tr: 'İmkan' }] },
      { id: 'a45_2', upper: 'ОБЯЗАТЕЛЬНО', lower: 'обязательно', translit: "Abizátil'na", soundHint: 'Mutlaka — söz verirken kullan', phoneticRule: 'Обязательно → "Abizátil\'na": beş hece, tek vurgu (ЗА).', examples: [{ ru: 'ОБЯЗАТЕЛЬНО', reading: "Abizátil'na", tr: 'Mutlaka' }] },
      { id: 'a45_3', upper: 'ПРАВИТЕЛЬСТВО', lower: 'правительство', translit: "Pravítil'stva", soundHint: 'Hükümet — haber bülteni kelimesi', phoneticRule: 'Правительство → "Pravítil\'stva": haberleri anlamanın ilk adımı.', examples: [{ ru: 'ПРАВИТЕЛЬСТВО', reading: "Pravítil'stva", tr: 'Hükümet' }] },
    ],
    readingDrills: [
      { word: 'новости', correct: 'Nóvasti', distractors: ['Novósti', 'Navostí', 'Nóvosti'], tr: 'Haberler' },
      { word: 'скорость', correct: "Skórast'", distractors: ['Skorost', 'Skarós', 'Skórost'], tr: 'Hız' },
      { word: 'поздравляем', correct: 'Pazdravlyáyem', distractors: ['Pozdravlyáem', 'Pázdravlyaem', 'Pozdrávlyaem'], tr: 'Tebrik ederiz' },
      { word: 'внимание', correct: 'Vnimániye', distractors: ['Vnímanie', 'Vnimaniyé', 'Vinimánie'], tr: 'Dikkat' },
      { word: 'расписание', correct: 'Raspisániye', distractors: ['Ráspisanie', 'Raspisaniyé', 'Rospisánie'], tr: 'Tarife / Program' }
    ]
  },
  {
    id: 'alpha_46', title: 'Hız Turu 2 — Büyük Final', subtitle: 'Canavar kelimeler: bunları okuyan HER ŞEYİ okur!',
    letters: [
      { id: 'a46_1', upper: 'ПРЕДПРИНИМАТЕЛЬ', lower: 'предприниматель', translit: "Pritprinimátil'", soundHint: 'Girişimci — 15 harf', phoneticRule: 'Пред-при-ни-МА-тель: vurgudan geriye kur. Д→Т sedasızlaşması içeride bile işler.', examples: [{ ru: 'ПРЕДПРИНИМАТЕЛЬ', reading: "Pritprinimátil'", tr: 'Girişimci' }] },
      { id: 'a46_2', upper: 'ЗДРАВООХРАНЕНИЕ', lower: 'здравоохранение', translit: 'Zdravaahranyéniye', soundHint: 'Sağlık sistemi — çift ОО!', phoneticRule: 'Здраво+охранение = "sağlığı koruma": bileşik kelimeleri parçalara böl.', examples: [{ ru: 'ЗДРАВООХРАНЕНИЕ', reading: 'Zdravaahranyéniye', tr: 'Sağlık sistemi' }] },
      { id: 'a46_3', upper: 'ВЗАИМОПОНИМАНИЕ', lower: 'взаимопонимание', translit: 'Vzaimapanimániye', soundHint: 'Karşılıklı anlayış — ilişkilerin anahtarı', phoneticRule: 'Взаимо (karşılıklı) + понимание (anlama): çift terapistlerinin favorisi.', examples: [{ ru: 'ВЗАИМОПОНИМАНИЕ', reading: 'Vzaimapanimániye', tr: 'Karşılıklı anlayış' }] },
    ],
    readingDrills: [
      { word: 'самостоятельность', correct: "Samastayátil'nast'", distractors: ['Samostoyátelnost', 'Sámostoyatelnost', 'Samastoyatelnóst'], tr: 'Bağımsızlık / Özerklik' },
      { word: 'недоразумение', correct: 'Nidarazumyéniye', distractors: ['Nedorazuménie', 'Nédorazumenie', 'Nidorazuméniye'], tr: 'Yanlış anlaşılma' },
      { word: 'продолжительность', correct: "Pradaljítil'nast'", distractors: ['Prodoljítelnost', 'Pródoljitelnost', 'Prodoljitelnóst'], tr: 'Süre' },
      { word: 'переподготовка', correct: 'Piripadgatófka', distractors: ['Perepodgotóvka', 'Píripodgotovka', 'Perepódgotovka'], tr: 'Yeniden eğitim' },
      { word: 'путешественник', correct: 'Putişéstvinnik', distractors: ['Puteşéstvennik', 'Pútişestvennik', 'Puteşestvenník'], tr: 'Gezgin' }
    ]
  }
];
