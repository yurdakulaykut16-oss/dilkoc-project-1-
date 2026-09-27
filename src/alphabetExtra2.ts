// ==========================================================
// ALFABE GENİŞLEME PAKETİ 2 — 30 EK OKUMA DERSİ (47-76)
// 17-46 arası temel okuma kondisyonunu tamamladık; buradan
// sonrası SAHA ANTRENMANI: havaalanı, otel, kafe, banka,
// acil durum, vurgu ikizleri, sessiz harfler ve mezuniyet.
// Her ders: 3 kart + okuma testi.
// ==========================================================
import type { AlphabetLessonExtra } from './alphabetExtra';

export const ALPHABET_LESSONS_EXTRA2: AlphabetLessonExtra[] = [
  {
    id: 'alpha_47', title: 'Havaalanı & Pasaport', subtitle: 'Аэропорт tabelasını okuyamayan uçağı kaçırır',
    letters: [
      { id: 'a47_1', upper: 'АЭРОПОРТ', lower: 'аэропорт', translit: 'Aerapórt', soundHint: 'Havaalanı — А ve Э yan yana, iki ayrı ses', phoneticRule: 'Аэропорт → "Aerapórt": vurgu sonda, ortadaki О akanje ile A olur.', examples: [{ ru: 'АЭРОПОРТ', reading: 'Aerapórt', tr: 'Havaalanı' }, { ru: 'РЕЙС', reading: 'Ryeys', tr: 'Uçuş / Sefer' }] },
      { id: 'a47_2', upper: 'ПАСПОРТ', lower: 'паспорт', translit: 'Páspart', soundHint: 'Pasaport — vurgu BAŞTA', phoneticRule: 'Паспорт → "Páspart": ikinci О vurgusuz kaldığı için A\'ya döner.', examples: [{ ru: 'ПАСПОРТ', reading: 'Páspart', tr: 'Pasaport' }, { ru: 'ВИЗА', reading: 'Víza', tr: 'Vize' }] },
      { id: 'a47_3', upper: 'БАГАЖ', lower: 'багаж', translit: 'Bagáş', soundHint: 'Bagaj — sondaki Ж sertleşip Ş olur', phoneticRule: 'Багаж → "Bagáş": kelime sonunda sesli ünsüz Ж sedasızlaşır ve Ş okunur.', examples: [{ ru: 'БАГАЖ', reading: 'Bagáş', tr: 'Bagaj' }, { ru: 'БИЛЕТ', reading: 'Bilyét', tr: 'Bilet' }] },
    ],
    readingDrills: [
      { word: 'рейс', correct: 'Ryeys', distractors: ['Reys', 'Riyés', 'Ryes'], tr: 'Uçuş / Sefer' },
      { word: 'виза', correct: 'Víza', distractors: ['Vizá', 'Vısa', 'Wíza'], tr: 'Vize' },
      { word: 'билет', correct: 'Bilyét', distractors: ['Bílet', 'Bilét', 'Bilyet'], tr: 'Bilet' },
      { word: 'регистрация', correct: 'Rigistrátsıya', distractors: ['Registrátsiya', 'Rigistratsıyá', 'Régistratsıya'], tr: 'Check-in / Kayıt' },
      { word: 'таможня', correct: 'Tamójnya', distractors: ['Tamojnyá', 'Támojnya', 'Tamóşnya'], tr: 'Gümrük' },
      { word: 'выход', correct: 'Vı́hat', distractors: ['Vıhót', 'Víhod', 'Vıhád'], tr: 'Çıkış' }
    ]
  },
  {
    id: 'alpha_48', title: 'Tren & Metro', subtitle: 'Вокзал neden "vagzal" okunur? Ötümlüleşme sahnede',
    letters: [
      { id: 'a48_1', upper: 'ВОКЗАЛ', lower: 'вокзал', translit: 'Vagzál', soundHint: 'Gar — К burada G okunur!', phoneticRule: 'Вокзал → "Vagzál": sesli З, önündeki sessiz К\'yı kendine benzetir (ters yönlü benzeşme).', examples: [{ ru: 'ВОКЗАЛ', reading: 'Vagzál', tr: 'Gar / İstasyon' }, { ru: 'МЕТРО', reading: 'Mitró', tr: 'Metro' }] },
      { id: 'a48_2', upper: 'ПОЕЗД', lower: 'поезд', translit: 'Póyist', soundHint: 'Tren — sondaki Д, T okunur', phoneticRule: 'Поезд → "Póyist": vurgu başta, Е zayıflar, sondaki ЗД kümesi "st" gibi sertleşir.', examples: [{ ru: 'ПОЕЗД', reading: 'Póyist', tr: 'Tren' }, { ru: 'ВАГОН', reading: 'Vagón', tr: 'Vagon' }] },
      { id: 'a48_3', upper: 'ЭЛЕКТРИЧКА', lower: 'электричка', translit: 'Eliktríçka', soundHint: 'Banliyö treni — Rus günlük hayatının klasiği', phoneticRule: 'Электричка → "Eliktríçka": vurgusuz Е\'ler İ\'ye yaklaşır, vurgu РИ hecesinde.', examples: [{ ru: 'ЭЛЕКТРИЧКА', reading: 'Eliktríçka', tr: 'Banliyö treni' }, { ru: 'СТАНЦИЯ', reading: 'Stántsıya', tr: 'İstasyon / Durak' }] },
    ],
    readingDrills: [
      { word: 'метро', correct: 'Mitró', distractors: ['Métro', 'Metró', 'Mıtró'], tr: 'Metro' },
      { word: 'станция', correct: 'Stántsıya', distractors: ['Stantsıyá', 'Stánsiya', 'Stantsíya'], tr: 'İstasyon' },
      { word: 'вагон', correct: 'Vagón', distractors: ['Vágon', 'Vagon', 'Wagón'], tr: 'Vagon' },
      { word: 'расписание', correct: 'Raspisániye', distractors: ['Rasapisaníye', 'Ráspisanie', 'Raspisaniyé'], tr: 'Tarife' },
      { word: 'платформа', correct: 'Platfórma', distractors: ['Plátforma', 'Platformá', 'Platfórm'], tr: 'Peron' }
    ]
  },
  {
    id: 'alpha_49', title: 'Otel Check-in', subtitle: 'Завтрак dahil mi? Kahvaltıyı okuyamayan aç kalır',
    letters: [
      { id: 'a49_1', upper: 'ГОСТИНИЦА', lower: 'гостиница', translit: 'Gastínitsa', soundHint: 'Otel — "gost" (misafir) kökünden', phoneticRule: 'Гостиница → "Gastínitsa": baştaki О zayıflar, vurgu Тİ hecesinde.', examples: [{ ru: 'ГОСТИНИЦА', reading: 'Gastínitsa', tr: 'Otel' }, { ru: 'КЛЮЧ', reading: 'Klyuç', tr: 'Anahtar' }] },
      { id: 'a49_2', upper: 'НОМЕР', lower: 'номер', translit: 'Nómir', soundHint: 'Oda — otelde "numara" değil ODA demek!', phoneticRule: 'Номер → "Nómir": vurgusuz Е kapanıp İ\'ye döner. Otelde "мой номер" = odam.', examples: [{ ru: 'НОМЕР', reading: 'Nómir', tr: 'Oda (otelde)' }, { ru: 'ЭТАЖ', reading: 'Etáş', tr: 'Kat' }] },
      { id: 'a49_3', upper: 'ЗАВТРАК', lower: 'завтрак', translit: 'Záftrak', soundHint: 'Kahvaltı — В burada F okunur', phoneticRule: 'Завтрак → "Záftrak": sessiz Т\'den önce В sedasızlaşıp F olur.', examples: [{ ru: 'ЗАВТРАК', reading: 'Záftrak', tr: 'Kahvaltı' }, { ru: 'ДУШ', reading: 'Duş', tr: 'Duş' }] },
    ],
    readingDrills: [
      { word: 'ключ', correct: 'Klyuç', distractors: ['Kluç', 'Klyuts', 'Kılyuç'], tr: 'Anahtar' },
      { word: 'этаж', correct: 'Etáş', distractors: ['Etáj', 'Étaj', 'Etaş'], tr: 'Kat' },
      { word: 'лифт', correct: 'Lift', distractors: ['Líft', 'Lifit', 'Lyift'], tr: 'Asansör' },
      { word: 'бронь', correct: "Bron'", distractors: ['Bron', 'Brón', 'Broni'], tr: 'Rezervasyon' },
      { word: 'полотенце', correct: 'Palatyéntse', distractors: ['Polotentsé', 'Palotyentsé', 'Pólotentse'], tr: 'Havlu' }
    ]
  },
  {
    id: 'alpha_50', title: 'Market Rafları', subtitle: 'Скидка (indirim) kelimesini gören Rus koşar — sen de oku',
    letters: [
      { id: 'a50_1', upper: 'ПРОДУКТЫ', lower: 'продукты', translit: 'Pradúktı', soundHint: 'Gıda / market — her köşede bu tabela var', phoneticRule: 'Продукты → "Pradúktı": baştaki О akanje ile A, sondaki Ы kalın okunur.', examples: [{ ru: 'ПРОДУКТЫ', reading: 'Pradúktı', tr: 'Gıda ürünleri' }, { ru: 'ПАКЕТ', reading: 'Pakyét', tr: 'Poşet' }] },
      { id: 'a50_2', upper: 'СКИДКА', lower: 'скидка', translit: 'Skítka', soundHint: 'İndirim — Д burada T okunur', phoneticRule: 'Скидка → "Skítka": sessiz К\'dan önce Д sedasızlaşır.', examples: [{ ru: 'СКИДКА', reading: 'Skítka', tr: 'İndirim' }, { ru: 'ЦЕНА', reading: 'Tsıná', tr: 'Fiyat' }] },
      { id: 'a50_3', upper: 'ЦЕНА', lower: 'цена', translit: 'Tsıná', soundHint: 'Fiyat — Ц her zaman serttir', phoneticRule: 'Цена → "Tsıná": Ц sert olduğu için vurgusuz Е burada I gibi duyulur.', examples: [{ ru: 'ЦЕНА', reading: 'Tsıná', tr: 'Fiyat' }, { ru: 'КАССА', reading: 'Kássa', tr: 'Kasa' }] },
    ],
    readingDrills: [
      { word: 'пакет', correct: 'Pakyét', distractors: ['Páket', 'Pakét', 'Pakyet'], tr: 'Poşet' },
      { word: 'сдача', correct: 'Zdáça', distractors: ['Sdáça', 'Sdaçá', 'Zdaşá'], tr: 'Para üstü' },
      { word: 'молоко', correct: 'Malakó', distractors: ['Móloko', 'Molokó', 'Malóka'], tr: 'Süt' },
      { word: 'сыр', correct: 'Sır', distractors: ['Sir', 'Sıır', 'Syr'], tr: 'Peynir' },
      { word: 'дёшево', correct: 'Dyóşıva', distractors: ['Dyoşevó', 'Deşóvo', 'Dyóşevo'], tr: 'Ucuz' }
    ]
  },
  {
    id: 'alpha_51', title: 'Eczane & Sağlık', subtitle: 'Аптека yeşil haçla parlar — içindekileri de oku',
    letters: [
      { id: 'a51_1', upper: 'АПТЕКА', lower: 'аптека', translit: 'Aptyéka', soundHint: 'Eczane — vurgu ortada', phoneticRule: 'Аптека → "Aptyéka": ТЕ hecesi yumuşak "tye" okunur.', examples: [{ ru: 'АПТЕКА', reading: 'Aptyéka', tr: 'Eczane' }, { ru: 'ВРАЧ', reading: 'Vraç', tr: 'Doktor' }] },
      { id: 'a51_2', upper: 'ЛЕКАРСТВО', lower: 'лекарство', translit: 'Likárstva', soundHint: 'İlaç — РСТВ dörtlüsünden korkma', phoneticRule: 'Лекарство → "Likárstva": vurgu КАР hecesinde, baş ve son zayıflar.', examples: [{ ru: 'ЛЕКАРСТВО', reading: 'Likárstva', tr: 'İlaç' }, { ru: 'ТАБЛЕТКА', reading: 'Tablyétka', tr: 'Hap / Tablet' }] },
      { id: 'a51_3', upper: 'БОЛЬ', lower: 'боль', translit: "Bol'", soundHint: 'Ağrı — sondaki Л incedir', phoneticRule: 'Боль → "Bol\'": yumuşak işaret Л\'yi inceltir. Больница (hastane) da aynı kökten.', examples: [{ ru: 'БОЛЬ', reading: "Bol'", tr: 'Ağrı' }, { ru: 'БОЛЬНИЦА', reading: "Bal'nítsa", tr: 'Hastane' }] },
    ],
    readingDrills: [
      { word: 'таблетка', correct: 'Tablyétka', distractors: ['Tabletká', 'Táblitka', 'Tablétka'], tr: 'Hap / Tablet' },
      { word: 'рецепт', correct: 'Ritsépt', distractors: ['Retsépt', 'Rétsept', 'Risépt'], tr: 'Reçete' },
      { word: 'температура', correct: 'Timpiratúra', distractors: ['Temperatúra', 'Timpiraturá', 'Tempiratúra'], tr: 'Ateş / Sıcaklık' },
      { word: 'витамины', correct: 'Vitamínı', distractors: ['Vítaminı', 'Vitaminı́', 'Vitamíni'], tr: 'Vitaminler' },
      { word: 'здоров', correct: 'Zdaróf', distractors: ['Zdoróv', 'Zdórov', 'Zdaróv'], tr: 'Sağlıklı' }
    ]
  },
  {
    id: 'alpha_52', title: 'Spor Dünyası', subtitle: 'Футбол neden "fudbol" okunur? Ötümlüleşme yine iş başında',
    letters: [
      { id: 'a52_1', upper: 'ФУТБОЛ', lower: 'футбол', translit: 'Fudból', soundHint: 'Futbol — Т burada D okunur!', phoneticRule: 'Футбол → "Fudból": sesli Б, önündeki Т\'yi kendine benzetip D yapar.', examples: [{ ru: 'ФУТБОЛ', reading: 'Fudból', tr: 'Futbol' }, { ru: 'МЯЧ', reading: 'Myaç', tr: 'Top' }] },
      { id: 'a52_2', upper: 'ХОККЕЙ', lower: 'хоккей', translit: 'Hakkyéy', soundHint: 'Hokey — Rusya\'nın milli sporu', phoneticRule: 'Хоккей → "Hakkyéy": çift К tek uzunca К gibi, vurgu sonda.', examples: [{ ru: 'ХОККЕЙ', reading: 'Hakkyéy', tr: 'Hokey' }, { ru: 'КОМАНДА', reading: 'Kamánda', tr: 'Takım' }] },
      { id: 'a52_3', upper: 'ТРЕНИРОВКА', lower: 'тренировка', translit: 'Trinirófka', soundHint: 'Antrenman — В yine F oldu', phoneticRule: 'Тренировка → "Trinirófka": sessiz К\'dan önce В sedasızlaşır.', examples: [{ ru: 'ТРЕНИРОВКА', reading: 'Trinirófka', tr: 'Antrenman' }, { ru: 'ПОБЕДА', reading: 'Pabyéda', tr: 'Zafer' }] },
    ],
    readingDrills: [
      { word: 'спорт', correct: 'Sport', distractors: ['Spórt', 'Siport', 'Şport'], tr: 'Spor' },
      { word: 'мяч', correct: 'Myaç', distractors: ['Maç', 'Myats', 'Miyáç'], tr: 'Top' },
      { word: 'победа', correct: 'Pabyéda', distractors: ['Pobéda', 'Pabidá', 'Póbeda'], tr: 'Zafer' },
      { word: 'команда', correct: 'Kamánda', distractors: ['Kómanda', 'Komandá', 'Kamandá'], tr: 'Takım' },
      { word: 'плавание', correct: 'Plávaniye', distractors: ['Plavaníye', 'Plaványe', 'Plávanie'], tr: 'Yüzme' }
    ]
  },
  {
    id: 'alpha_53', title: 'Müzik & Sanat', subtitle: 'Музыка kelimesinde vurgu BAŞTA — çoğu yabancı yanlış söyler',
    letters: [
      { id: 'a53_1', upper: 'МУЗЫКА', lower: 'музыка', translit: 'Múzıka', soundHint: 'Müzik — vurgu MU hecesinde!', phoneticRule: 'Музыка → "Múzıka" (muzıká değil!): en sık yanlış vurgulanan kelimelerden.', examples: [{ ru: 'МУЗЫКА', reading: 'Múzıka', tr: 'Müzik' }, { ru: 'ПЕСНЯ', reading: 'Pyésnya', tr: 'Şarkı' }] },
      { id: 'a53_2', upper: 'КАРТИНА', lower: 'картина', translit: 'Kartína', soundHint: 'Tablo — Van Gogh ünitesine selam', phoneticRule: 'Картина → "Kartína": vurgu Тİ hecesinde, net okunur.', examples: [{ ru: 'КАРТИНА', reading: 'Kartína', tr: 'Tablo / Resim' }, { ru: 'ХУДОЖНИК', reading: 'Hudójnik', tr: 'Ressam' }] },
      { id: 'a53_3', upper: 'КОНЦЕРТ', lower: 'концерт', translit: 'Kantsért', soundHint: 'Konser — Ц yine TS', phoneticRule: 'Концерт → "Kantsért": baştaki О zayıflar, ЦЕ = "tse".', examples: [{ ru: 'КОНЦЕРТ', reading: 'Kantsért', tr: 'Konser' }, { ru: 'СЦЕНА', reading: 'Stséna', tr: 'Sahne' }] },
    ],
    readingDrills: [
      { word: 'песня', correct: 'Pyésnya', distractors: ['Pesnyá', 'Pisnyá', 'Pésna'], tr: 'Şarkı' },
      { word: 'балет', correct: 'Balyét', distractors: ['Bálet', 'Balét', 'Balyet'], tr: 'Bale' },
      { word: 'художник', correct: 'Hudójnik', distractors: ['Hudojník', 'Húdojnik', 'Hudóşnik'], tr: 'Ressam' },
      { word: 'сцена', correct: 'Stséna', distractors: ['Sséna', 'Sitséna', 'Scéna'], tr: 'Sahne' },
      { word: 'гитара', correct: 'Gitára', distractors: ['Gítara', 'Gitará', 'Guitára'], tr: 'Gitar' }
    ]
  },
  {
    id: 'alpha_54', title: 'Teknoloji Kelimeleri', subtitle: 'Компьютер içinde gizli bir Ь var — onu duyabilecek misin?',
    letters: [
      { id: 'a54_1', upper: 'ТЕЛЕФОН', lower: 'телефон', translit: 'Tilifón', soundHint: 'Telefon — iki vurgusuz Е üst üste', phoneticRule: 'Телефон → "Tilifón": vurgu sonda olduğu için iki Е de İ\'ye zayıflar.', examples: [{ ru: 'ТЕЛЕФОН', reading: 'Tilifón', tr: 'Telefon' }, { ru: 'ЭКРАН', reading: 'Ekrán', tr: 'Ekran' }] },
      { id: 'a54_2', upper: 'КОМПЬЮТЕР', lower: 'компьютер', translit: "Kamp'yútir", soundHint: 'Bilgisayar — ПЬЮ üçlüsü "p-yu"', phoneticRule: 'Компьютер → "Kamp\'yútir": Ь, П ile Ю\'yu ayırır; ТЕ burada istisna olarak sert "te" okunur.', examples: [{ ru: 'КОМПЬЮТЕР', reading: "Kamp'yútir", tr: 'Bilgisayar' }, { ru: 'ИНТЕРНЕТ', reading: 'Internét', tr: 'İnternet' }] },
      { id: 'a54_3', upper: 'ЗАРЯДКА', lower: 'зарядка', translit: 'Zaryátka', soundHint: 'Şarj (aleti) — Д yine T', phoneticRule: 'Зарядка → "Zaryátka": sessiz К\'dan önce Д sedasızlaşır.', examples: [{ ru: 'ЗАРЯДКА', reading: 'Zaryátka', tr: 'Şarj / Şarj aleti' }, { ru: 'ЗВОНОК', reading: 'Zvanók', tr: 'Arama / Zil' }] },
    ],
    readingDrills: [
      { word: 'интернет', correct: 'Internét', distractors: ['İnternet', 'Intyernét', 'Íntirnet'], tr: 'İnternet' },
      { word: 'экран', correct: 'Ekrán', distractors: ['Ékran', 'Ekran', 'İkrán'], tr: 'Ekran' },
      { word: 'наушники', correct: 'Naúşniki', distractors: ['Nauşníki', 'Náuşniki', 'Nauşnikí'], tr: 'Kulaklık' },
      { word: 'приложение', correct: 'Prilajéniye', distractors: ['Prilojeníye', 'Prílojenie', 'Prilojéniye'], tr: 'Uygulama' },
      { word: 'кнопка', correct: 'Knópka', distractors: ['Kınopká', 'Knopká', 'Knóbka'], tr: 'Düğme / Tuş' }
    ]
  },
  {
    id: 'alpha_55', title: 'Okul & Üniversite', subtitle: 'Экзамен kelimesinde КЗ yine GZ okunur — sınava hazır ol',
    letters: [
      { id: 'a55_1', upper: 'УРОК', lower: 'урок', translit: 'Urók', soundHint: 'Ders — kısa ve net', phoneticRule: 'Урок → "Urók": vurgu sonda, iki hece.', examples: [{ ru: 'УРОК', reading: 'Urók', tr: 'Ders' }, { ru: 'ШКОЛА', reading: 'Şkóla', tr: 'Okul' }] },
      { id: 'a55_2', upper: 'ЭКЗАМЕН', lower: 'экзамен', translit: 'Egzámin', soundHint: 'Sınav — К burada G okunur!', phoneticRule: 'Экзамен → "Egzámin": sesli З, önündeki К\'yı G yapar (вокзал kuralının aynısı).', examples: [{ ru: 'ЭКЗАМЕН', reading: 'Egzámin', tr: 'Sınav' }, { ru: 'СТУДЕНТ', reading: 'Studyént', tr: 'Öğrenci (üniv.)' }] },
      { id: 'a55_3', upper: 'ТЕТРАДЬ', lower: 'тетрадь', translit: "Titrát'", soundHint: 'Defter — sondaki ДЬ ince T olur', phoneticRule: 'Тетрадь → "Titrát\'": kelime sonunda ДЬ hem sedasızlaşır hem ince kalır.', examples: [{ ru: 'ТЕТРАДЬ', reading: "Titrát'", tr: 'Defter' }, { ru: 'РУЧКА', reading: 'Rúçka', tr: 'Kalem' }] },
    ],
    readingDrills: [
      { word: 'студент', correct: 'Studyént', distractors: ['Stúdent', 'Studént', 'Sitüdént'], tr: 'Öğrenci' },
      { word: 'ручка', correct: 'Rúçka', distractors: ['Ruçká', 'Rúşka', 'Ruşká'], tr: 'Kalem' },
      { word: 'доска', correct: 'Daská', distractors: ['Dóska', 'Doská', 'Daskı́'], tr: 'Tahta' },
      { word: 'вопрос', correct: 'Vaprós', distractors: ['Vópros', 'Voprós', 'Vapróśta'], tr: 'Soru' },
      { word: 'ответ', correct: 'Atvyét', distractors: ['Otvét', 'Ótvet', 'Atvét'], tr: 'Cevap' }
    ]
  },
  {
    id: 'alpha_56', title: 'İş Hayatı', subtitle: 'Зарплата (maaş) ve отпуск (izin): çalışanın iki sevgilisi',
    letters: [
      { id: 'a56_1', upper: 'РАБОТА', lower: 'работа', translit: 'Rabóta', soundHint: 'İş — "rab" (köle) kökünden geliyor!', phoneticRule: 'Работа → "Rabóta": vurgu ortada, ilk ve son O\'lar A okunur... ilki zaten A!', examples: [{ ru: 'РАБОТА', reading: 'Rabóta', tr: 'İş' }, { ru: 'ОФИС', reading: 'Ófis', tr: 'Ofis' }] },
      { id: 'a56_2', upper: 'ЗАРПЛАТА', lower: 'зарплата', translit: 'Zarpláta', soundHint: 'Maaş — зар(аботная) плата kısaltması', phoneticRule: 'Зарплата → "Zarpláta": РПЛ üçlüsü tek nefeste, vurgu ЛА hecesinde.', examples: [{ ru: 'ЗАРПЛАТА', reading: 'Zarpláta', tr: 'Maaş' }, { ru: 'НАЧАЛЬНИК', reading: "Naçál'nik", tr: 'Şef / Müdür' }] },
      { id: 'a56_3', upper: 'ОТПУСК', lower: 'отпуск', translit: 'Ótpusk', soundHint: 'Yıllık izin — vurgu BAŞTA', phoneticRule: 'Отпуск → "Ótpusk": vurgu ilk hecede, sondaki СК net biter.', examples: [{ ru: 'ОТПУСК', reading: 'Ótpusk', tr: 'Yıllık izin' }, { ru: 'КОЛЛЕГА', reading: 'Kallyéga', tr: 'İş arkadaşı' }] },
    ],
    readingDrills: [
      { word: 'офис', correct: 'Ófis', distractors: ['Ofís', 'Offís', 'Ófiz'], tr: 'Ofis' },
      { word: 'начальник', correct: "Naçál'nik", distractors: ['Naçalník', 'Náçalnik', 'Naşálnik'], tr: 'Şef / Müdür' },
      { word: 'коллега', correct: 'Kallyéga', distractors: ['Kólega', 'Kollegá', 'Kalligá'], tr: 'İş arkadaşı' },
      { word: 'собрание', correct: 'Sabrániye', distractors: ['Sobraníye', 'Sóbranie', 'Sabraniyé'], tr: 'Toplantı' },
      { word: 'договор', correct: 'Dagavór', distractors: ['Dógovor', 'Dogóvor', 'Dagóvar'], tr: 'Sözleşme' }
    ]
  },
  {
    id: 'alpha_57', title: 'Duygular Sözlüğü', subtitle: 'Любовь sonda F ile biter — aşk bile sedasızlaşır',
    letters: [
      { id: 'a57_1', upper: 'ЛЮБОВЬ', lower: 'любовь', translit: "Lyubóf'", soundHint: 'Aşk — sondaki ВЬ ince F olur', phoneticRule: 'Любовь → "Lyubóf\'": kelime sonundaki В sedasızlaşır ama Ь inceliği korur.', examples: [{ ru: 'ЛЮБОВЬ', reading: "Lyubóf'", tr: 'Aşk / Sevgi' }, { ru: 'РАДОСТЬ', reading: "Rádast'", tr: 'Sevinç' }] },
      { id: 'a57_2', upper: 'СЧАСТЬЕ', lower: 'счастье', translit: 'Şşástye', soundHint: 'Mutluluk — СЧ birlikte Щ okunur!', phoneticRule: 'Счастье → "Şşástye": С+Ч birleşince tek uzun Щ sesi verir.', examples: [{ ru: 'СЧАСТЬЕ', reading: 'Şşástye', tr: 'Mutluluk' }, { ru: 'ГРУСТЬ', reading: "Grust'", tr: 'Hüzün' }] },
      { id: 'a57_3', upper: 'СТРАХ', lower: 'страх', translit: 'Strah', soundHint: 'Korku — sert Х ile biter', phoneticRule: 'Страх → "Strah": СТР üçlüsü tek hamlede, sondaki Х boğazdan.', examples: [{ ru: 'СТРАХ', reading: 'Strah', tr: 'Korku' }, { ru: 'НАДЕЖДА', reading: 'Nadyéjda', tr: 'Umut' }] },
    ],
    readingDrills: [
      { word: 'радость', correct: "Rádast'", distractors: ['Radóst', 'Rádost', 'Radást'], tr: 'Sevinç' },
      { word: 'улыбка', correct: 'Ulı́pka', distractors: ['Ulıbká', 'Úlıbka', 'Ulíbka'], tr: 'Gülümseme' },
      { word: 'слёзы', correct: 'Slyózı', distractors: ['Slezı́', 'Slyozı́', 'Silyózı'], tr: 'Gözyaşları' },
      { word: 'надежда', correct: 'Nadyéjda', distractors: ['Nádejda', 'Nadejdá', 'Nadyeşdá'], tr: 'Umut' },
      { word: 'грусть', correct: "Grust'", distractors: ['Grust', 'Gruşt', 'Gurúst'], tr: 'Hüzün' }
    ]
  },
  {
    id: 'alpha_58', title: 'Zaman Kelimeleri', subtitle: 'Сегодня\'da Г neden V okunur? Zaman ünitelerine köprü',
    letters: [
      { id: 'a58_1', upper: 'СЕГОДНЯ', lower: 'сегодня', translit: 'Sivódnya', soundHint: 'Bugün — Г burada V okunur!', phoneticRule: 'Сегодня → "Sivódnya": -его-/-ого- kalıplarında Г tarihsel olarak V okunur.', examples: [{ ru: 'СЕГОДНЯ', reading: 'Sivódnya', tr: 'Bugün' }, { ru: 'СЕЙЧАС', reading: 'Siyçás', tr: 'Şimdi' }] },
      { id: 'a58_2', upper: 'ВЧЕРА', lower: 'вчера', translit: 'Fçirá', soundHint: 'Dün — baştaki В, F okunur', phoneticRule: 'Вчера → "Fçirá": sessiz Ч\'den önce В sedasızlaşır.', examples: [{ ru: 'ВЧЕРА', reading: 'Fçirá', tr: 'Dün' }, { ru: 'ПОТОМ', reading: 'Patóm', tr: 'Sonra' }] },
      { id: 'a58_3', upper: 'ЗАВТРА', lower: 'завтра', translit: 'Záftra', soundHint: 'Yarın — завтрак (kahvaltı) ile karıştırma!', phoneticRule: 'Завтра → "Záftra": Т\'den önce В yine F. Завтра = yarın, завтрак = kahvaltı.', examples: [{ ru: 'ЗАВТРА', reading: 'Záftra', tr: 'Yarın' }, { ru: 'УТРОМ', reading: 'Útram', tr: 'Sabahleyin' }] },
    ],
    readingDrills: [
      { word: 'сейчас', correct: 'Siyçás', distractors: ['Séyças', 'Seyçás', 'Siçás'], tr: 'Şimdi' },
      { word: 'потом', correct: 'Patóm', distractors: ['Pótom', 'Potóm', 'Pattóm'], tr: 'Sonra' },
      { word: 'всегда', correct: 'Fsigdá', distractors: ['Vsegdá', 'Fsyégda', 'Vısegda'], tr: 'Her zaman' },
      { word: 'никогда', correct: 'Nikagdá', distractors: ['Níkogda', 'Nikógda', 'Nikagıdá'], tr: 'Asla' },
      { word: 'вечером', correct: 'Vyéçiram', distractors: ['Veçeróm', 'Viçéram', 'Vyeçerom'], tr: 'Akşamleyin' }
    ]
  },
  {
    id: 'alpha_59', title: 'Soru Kelimeleri', subtitle: 'Что neden "şto" okunur? En ünlü istisna burada',
    letters: [
      { id: 'a59_1', upper: 'ЧТО', lower: 'что', translit: 'Şto', soundHint: 'Ne? — Ч burada Ş okunur!', phoneticRule: 'Что → "Şto": Rusçanın en ünlü istisnası. Чтобы da "ştóbı" okunur.', examples: [{ ru: 'ЧТО', reading: 'Şto', tr: 'Ne?' }, { ru: 'КТО', reading: 'Kto', tr: 'Kim?' }] },
      { id: 'a59_2', upper: 'КОГДА', lower: 'когда', translit: 'Kagdá', soundHint: 'Ne zaman? — vurgu sonda', phoneticRule: 'Когда → "Kagdá": vurgusuz О yine A oldu.', examples: [{ ru: 'КОГДА', reading: 'Kagdá', tr: 'Ne zaman?' }, { ru: 'ГДЕ', reading: 'Gdye', tr: 'Nerede?' }] },
      { id: 'a59_3', upper: 'ПОЧЕМУ', lower: 'почему', translit: 'Paçimú', soundHint: 'Neden? — üç hece, vurgu sonda', phoneticRule: 'Почему → "Paçimú": О ve Е ikisi de zayıflar, vurgu МУ hecesinde.', examples: [{ ru: 'ПОЧЕМУ', reading: 'Paçimú', tr: 'Neden?' }, { ru: 'КАК', reading: 'Kak', tr: 'Nasıl?' }] },
    ],
    readingDrills: [
      { word: 'кто', correct: 'Kto', distractors: ['Şto', 'Kıto', 'Kito'], tr: 'Kim?' },
      { word: 'где', correct: 'Gdye', distractors: ['Gde', 'Gıdé', 'Jdye'], tr: 'Nerede?' },
      { word: 'как', correct: 'Kak', distractors: ['Kák', 'Kaak', 'Kag'], tr: 'Nasıl?' },
      { word: 'сколько', correct: "Skól'ka", distractors: ['Skolkó', 'Skólko', 'Sıkólka'], tr: 'Kaç / Ne kadar?' },
      { word: 'зачем', correct: 'Zaçém', distractors: ['Záçem', 'Zaşém', 'Zaçyom'], tr: 'Ne için?' }
    ]
  },
  {
    id: 'alpha_60', title: 'Meyveler & Sebzeler', subtitle: 'Pazarda etiket okuma turu: огурец\'ten вишня\'ya',
    letters: [
      { id: 'a60_1', upper: 'ОГУРЕЦ', lower: 'огурец', translit: 'Aguryéts', soundHint: 'Salatalık — baştaki О yine A', phoneticRule: 'Огурец → "Aguryéts": vurgu sonda, Ц ile net biter.', examples: [{ ru: 'ОГУРЕЦ', reading: 'Aguryéts', tr: 'Salatalık' }, { ru: 'ЛУК', reading: 'Luk', tr: 'Soğan' }] },
      { id: 'a60_2', upper: 'ПОМИДОР', lower: 'помидор', translit: 'Pamidór', soundHint: 'Domates — İtalyanca "pomodoro"dan', phoneticRule: 'Помидор → "Pamidór": ilk О zayıflar, vurgu sonda.', examples: [{ ru: 'ПОМИДОР', reading: 'Pamidór', tr: 'Domates' }, { ru: 'КАПУСТА', reading: 'Kapústa', tr: 'Lahana' }] },
      { id: 'a60_3', upper: 'КАРТОШКА', lower: 'картошка', translit: 'Kartóşka', soundHint: 'Patates — günlük dil; resmi adı картофель', phoneticRule: 'Картошка → "Kartóşka": vurgu ТОШ hecesinde. Rus mutfağının temeli.', examples: [{ ru: 'КАРТОШКА', reading: 'Kartóşka', tr: 'Patates' }, { ru: 'ГРУША', reading: 'Grúşa', tr: 'Armut' }] },
    ],
    readingDrills: [
      { word: 'морковь', correct: "Markóf'", distractors: ['Morkóv', 'Márkov', 'Markóv'], tr: 'Havuç' },
      { word: 'капуста', correct: 'Kapústa', distractors: ['Kápusta', 'Kapustá', 'Kabústa'], tr: 'Lahana' },
      { word: 'груша', correct: 'Grúşa', distractors: ['Gruşá', 'Grúsa', 'Gurúşa'], tr: 'Armut' },
      { word: 'вишня', correct: 'Víşnya', distractors: ['Vişnyá', 'Víşna', 'Wíşnya'], tr: 'Vişne' },
      { word: 'лук', correct: 'Luk', distractors: ['Lyuk', 'Luuk', 'Lug'], tr: 'Soğan' }
    ]
  },
  {
    id: 'alpha_61', title: 'Tatlılar & Pastane', subtitle: 'Мороженое: beş heceli dondurma — yaza hazırlık',
    letters: [
      { id: 'a61_1', upper: 'МОРОЖЕНОЕ', lower: 'мороженое', translit: 'Marójınaye', soundHint: 'Dondurma — 5 hece ama ritmi kolay', phoneticRule: 'Мороженое → "Marójınaye": vurgu РО hecesinde, ЖЕ kalın "jı" okunur.', examples: [{ ru: 'МОРОЖЕНОЕ', reading: 'Marójınaye', tr: 'Dondurma' }, { ru: 'ТОРТ', reading: 'Tort', tr: 'Pasta' }] },
      { id: 'a61_2', upper: 'КОНФЕТА', lower: 'конфета', translit: 'Kanfyéta', soundHint: 'Şeker(leme) — vurgu ortada', phoneticRule: 'Конфета → "Kanfyéta": baştaki О zayıflar, ФЕ = "fye".', examples: [{ ru: 'КОНФЕТА', reading: 'Kanfyéta', tr: 'Şekerleme' }, { ru: 'САХАР', reading: 'Sáhar', tr: 'Şeker (toz)' }] },
      { id: 'a61_3', upper: 'ШОКОЛАД', lower: 'шоколад', translit: 'Şıkalát', soundHint: 'Çikolata — sondaki Д, T okunur', phoneticRule: 'Шоколад → "Şıkalát": iki vurgusuz О zayıflar, sonda Д sedasızlaşır.', examples: [{ ru: 'ШОКОЛАД', reading: 'Şıkalát', tr: 'Çikolata' }, { ru: 'МЁД', reading: 'Myot', tr: 'Bal' }] },
    ],
    readingDrills: [
      { word: 'печенье', correct: "Piçén'ye", distractors: ['Peçénye', 'Piçénye', 'Péçenye'], tr: 'Kurabiye' },
      { word: 'варенье', correct: "Varyén'ye", distractors: ['Varénye', 'Várenye', 'Varinyé'], tr: 'Reçel' },
      { word: 'сахар', correct: 'Sáhar', distractors: ['Sahár', 'Sáşar', 'Sağar'], tr: 'Şeker' },
      { word: 'мёд', correct: 'Myot', distractors: ['Myod', 'Med', 'Miyót'], tr: 'Bal' },
      { word: 'торт', correct: 'Tort', distractors: ['Tórta', 'Dort', 'Toort'], tr: 'Pasta' }
    ]
  },
  {
    id: 'alpha_62', title: 'Kafe Modu', subtitle: 'Счёт, пожалуйста! Hesabı isteyebilen aç kalmaz',
    letters: [
      { id: 'a62_1', upper: 'КОФЕ', lower: 'кофе', translit: 'Kófi', soundHint: 'Kahve — sondaki Е zayıflar', phoneticRule: 'Кофе → "Kófi": vurgu başta; kelime istisna olarak ERİL kabul edilir.', examples: [{ ru: 'КОФЕ', reading: 'Kófi', tr: 'Kahve' }, { ru: 'ЧАШКА', reading: 'Çáşka', tr: 'Fincan' }] },
      { id: 'a62_2', upper: 'СЧЁТ', lower: 'счёт', translit: 'Şşot', soundHint: 'Hesap — СЧ yine Щ sesi', phoneticRule: 'Счёт → "Şşot": счастье kuralının aynısı; С+Ч = uzun Щ.', examples: [{ ru: 'СЧЁТ', reading: 'Şşot', tr: 'Hesap' }, { ru: 'СОК', reading: 'Sok', tr: 'Meyve suyu' }] },
      { id: 'a62_3', upper: 'ОФИЦИАНТ', lower: 'официант', translit: 'Afitsıánt', soundHint: 'Garson — ЦИА üçlüsü "tsıa"', phoneticRule: 'Официант → "Afitsıánt": Ц serttir, И ondan sonra I gibi duyulur.', examples: [{ ru: 'ОФИЦИАНТ', reading: 'Afitsıánt', tr: 'Garson' }, { ru: 'ЗАКАЗ', reading: 'Zakás', tr: 'Sipariş' }] },
    ],
    readingDrills: [
      { word: 'капучино', correct: 'Kapuçína', distractors: ['Kápuçino', 'Kapuçinó', 'Kaputsíno'], tr: 'Kapuçino' },
      { word: 'чашка', correct: 'Çáşka', distractors: ['Çaşká', 'Tsáşka', 'Çáska'], tr: 'Fincan' },
      { word: 'вкусно', correct: 'Fkúsna', distractors: ['Vkusnó', 'Vıkúsno', 'Fkusnó'], tr: 'Lezzetli' },
      { word: 'заказ', correct: 'Zakás', distractors: ['Zakáz', 'Zákaz', 'Sakás'], tr: 'Sipariş' },
      { word: 'сок', correct: 'Sok', distractors: ['Sók', 'Şok', 'Sog'], tr: 'Meyve suyu' }
    ]
  },
  {
    id: 'alpha_63', title: 'Bayram & Kutlama', subtitle: 'Праздник kelimesindeki Д hiç okunmaz — sürpriz!',
    letters: [
      { id: 'a63_1', upper: 'ПРАЗДНИК', lower: 'праздник', translit: 'Práznik', soundHint: 'Bayram — Д sessizdir!', phoneticRule: 'Праздник → "Práznik": ЗДН kümesinde Д okunmaz (sessiz harf).', examples: [{ ru: 'ПРАЗДНИК', reading: 'Práznik', tr: 'Bayram / Kutlama' }, { ru: 'ГОСТЬ', reading: "Gost'", tr: 'Misafir' }] },
      { id: 'a63_2', upper: 'ПОДАРОК', lower: 'подарок', translit: 'Padárak', soundHint: 'Hediye — iki О da zayıflar', phoneticRule: 'Подарок → "Padárak": vurgu ДА hecesinde, baş ve son O\'lar A olur.', examples: [{ ru: 'ПОДАРОК', reading: 'Padárak', tr: 'Hediye' }, { ru: 'САЛЮТ', reading: 'Salyút', tr: 'Havai fişek' }] },
      { id: 'a63_3', upper: 'ДЕНЬ РОЖДЕНИЯ', lower: 'день рождения', translit: "Dyen' Rajdyéniya", soundHint: 'Doğum günü — "doğuş günü" demek', phoneticRule: 'День рождения → "Dyen\' Rajdyéniya": РОЖД kümesi tek nefeste "rajd".', examples: [{ ru: 'ДЕНЬ РОЖДЕНИЯ', reading: "Dyen' Rajdyéniya", tr: 'Doğum günü' }, { ru: 'НОВЫЙ ГОД', reading: 'Nóvıy Got', tr: 'Yeni Yıl' }] },
    ],
    readingDrills: [
      { word: 'подарок', correct: 'Padárak', distractors: ['Podárok', 'Pódarok', 'Padarók'], tr: 'Hediye' },
      { word: 'гость', correct: "Gost'", distractors: ['Gost', 'Goşt', 'Gosti'], tr: 'Misafir' },
      { word: 'салют', correct: 'Salyút', distractors: ['Sályut', 'Salut', 'Salyu'], tr: 'Havai fişek' },
      { word: 'поздравление', correct: 'Pazdravlyéniye', distractors: ['Pozdravleníye', 'Pázdravlenie', 'Pozdrávlenie'], tr: 'Tebrik' },
      { word: 'веселье', correct: "Visyél'ye", distractors: ['Vesélye', 'Vísel'], tr: 'Eğlence' }
    ]
  },
  {
    id: 'alpha_64', title: 'Aşk & Arkadaşlık', subtitle: 'Друг sonda K okunur — dostluk bile sedasızlaşır',
    letters: [
      { id: 'a64_1', upper: 'ДРУГ', lower: 'друг', translit: 'Druk', soundHint: 'Arkadaş (erkek) — sondaki Г, K okunur', phoneticRule: 'Друг → "Druk": kelime sonunda Г sedasızlaşır. Çoğulu друзья = "druz\'yá".', examples: [{ ru: 'ДРУГ', reading: 'Druk', tr: 'Arkadaş (e)' }, { ru: 'ПОДРУГА', reading: 'Padrúga', tr: 'Arkadaş (k)' }] },
      { id: 'a64_2', upper: 'СВИДАНИЕ', lower: 'свидание', translit: 'Svidániye', soundHint: 'Randevu / buluşma — до свидания buradan!', phoneticRule: 'Свидание → "Svidániye": До свидания = "buluşana kadar" demek.', examples: [{ ru: 'СВИДАНИЕ', reading: 'Svidániye', tr: 'Randevu' }, { ru: 'ВМЕСТЕ', reading: 'Vmyéstye', tr: 'Birlikte' }] },
      { id: 'a64_3', upper: 'ПОЦЕЛУЙ', lower: 'поцелуй', translit: 'Patsılúy', soundHint: 'Öpücük — Ц sert, Е zayıf', phoneticRule: 'Поцелуй → "Patsılúy": sert Ц\'den sonra Е, I gibi duyulur.', examples: [{ ru: 'ПОЦЕЛУЙ', reading: 'Patsılúy', tr: 'Öpücük' }, { ru: 'ЦВЕТЫ', reading: 'Tsvitı́', tr: 'Çiçekler' }] },
    ],
    readingDrills: [
      { word: 'подруга', correct: 'Padrúga', distractors: ['Pódruga', 'Podrugá', 'Padruká'], tr: 'Kız arkadaş' },
      { word: 'любимый', correct: 'Lyubímıy', distractors: ['Lyúbimıy', 'Lubimí', 'Lyubimı́y'], tr: 'Sevgili / En sevilen' },
      { word: 'цветы', correct: 'Tsvitı́', distractors: ['Tsvétı', 'Svitı́', 'Tsvyetı'], tr: 'Çiçekler' },
      { word: 'письмо', correct: "Pis'mó", distractors: ['Písmo', 'Pisımó', 'Pismá'], tr: 'Mektup' },
      { word: 'вместе', correct: 'Vmyéstye', distractors: ['Vmesté', 'Fmyéste', 'Vımésti'], tr: 'Birlikte' }
    ]
  },
  {
    id: 'alpha_65', title: 'Banka & Para', subtitle: 'Рубль tek hecede biter: "rubl\'" — dene bakalım',
    letters: [
      { id: 'a65_1', upper: 'ДЕНЬГИ', lower: 'деньги', translit: "Dyén'gi", soundHint: 'Para — НЬ incecik', phoneticRule: 'Деньги → "Dyén\'gi": ortadaki НЬ yumuşak, Г net okunur.', examples: [{ ru: 'ДЕНЬГИ', reading: "Dyén'gi", tr: 'Para' }, { ru: 'БАНК', reading: 'Bank', tr: 'Banka' }] },
      { id: 'a65_2', upper: 'РУБЛЬ', lower: 'рубль', translit: "Rubl'", soundHint: 'Ruble — БЛЬ üçlüsü tek hecede', phoneticRule: 'Рубль → "Rubl\'": sondaki -бль tek hamlede söylenir, araya ünlü koyma!', examples: [{ ru: 'РУБЛЬ', reading: "Rubl'", tr: 'Ruble' }, { ru: 'КАРТА', reading: 'Kárta', tr: 'Kart' }] },
      { id: 'a65_3', upper: 'ОБМЕН', lower: 'обмен', translit: 'Abmyén', soundHint: 'Döviz bozdurma — tabelalarda ara', phoneticRule: 'Обмен (валют) → "Abmyén": baştaki О zayıflar. Döviz bürosu tabelası.', examples: [{ ru: 'ОБМЕН', reading: 'Abmyén', tr: 'Değişim / Döviz' }, { ru: 'НАЛИЧНЫЕ', reading: 'Nalíçnıye', tr: 'Nakit' }] },
    ],
    readingDrills: [
      { word: 'банк', correct: 'Bank', distractors: ['Bánka', 'Bang', 'Banık'], tr: 'Banka' },
      { word: 'карта', correct: 'Kárta', distractors: ['Kartá', 'Kárda', 'Karıta'], tr: 'Kart' },
      { word: 'наличные', correct: 'Nalíçnıye', distractors: ['Naliçnıyé', 'Náliçnıe', 'Nalişnıye'], tr: 'Nakit' },
      { word: 'банкомат', correct: 'Bankamát', distractors: ['Bánkomat', 'Bankomát', 'Bankamat'], tr: 'ATM' },
      { word: 'перевод', correct: 'Pirivót', distractors: ['Perevód', 'Pírevot', 'Pirivód'], tr: 'Havale / Çeviri' }
    ]
  },
  {
    id: 'alpha_66', title: 'Yön Tarifi', subtitle: 'Направо mu налево mu? Yanlış okursan ters gidersin',
    letters: [
      { id: 'a66_1', upper: 'НАПРАВО', lower: 'направо', translit: 'Napráva', soundHint: 'Sağa — право (sağ/hak) kökünden', phoneticRule: 'Направо → "Napráva": sondaki О vurgusuz, A okunur.', examples: [{ ru: 'НАПРАВО', reading: 'Napráva', tr: 'Sağa' }, { ru: 'НАЛЕВО', reading: 'Nalyéva', tr: 'Sola' }] },
      { id: 'a66_2', upper: 'ПРЯМО', lower: 'прямо', translit: 'Pryáma', soundHint: 'Düz / dosdoğru — РЯ = "rya"', phoneticRule: 'Прямо → "Pryáma": Р, Я\'dan önce incelir.', examples: [{ ru: 'ПРЯМО', reading: 'Pryáma', tr: 'Düz ileri' }, { ru: 'РЯДОМ', reading: 'Ryádam', tr: 'Yakında / Yanında' }] },
      { id: 'a66_3', upper: 'ОСТАНОВКА', lower: 'остановка', translit: 'Astanófka', soundHint: 'Durak — В yine F oldu', phoneticRule: 'Остановка → "Astanófka": baştaki О zayıflar, ВК kümesinde В sedasızlaşır.', examples: [{ ru: 'ОСТАНОВКА', reading: 'Astanófka', tr: 'Durak' }, { ru: 'ПЕРЕКРЁСТОК', reading: 'Pirikryóstak', tr: 'Kavşak' }] },
    ],
    readingDrills: [
      { word: 'налево', correct: 'Nalyéva', distractors: ['Nálevo', 'Nalevó', 'Nalyevó'], tr: 'Sola' },
      { word: 'рядом', correct: 'Ryádam', distractors: ['Ryadóm', 'Rádom', 'Riyádom'], tr: 'Yakında' },
      { word: 'далеко', correct: 'Dalikó', distractors: ['Dáleko', 'Dalyéko', 'Dalekó'], tr: 'Uzak' },
      { word: 'близко', correct: 'Blíska', distractors: ['Blizkó', 'Blísko', 'Bilísko'], tr: 'Yakın' },
      { word: 'перекрёсток', correct: 'Pirikryóstak', distractors: ['Perekrestók', 'Pírekrestok', 'Pirikrestók'], tr: 'Kavşak' }
    ]
  },
  {
    id: 'alpha_67', title: 'Acil Durum Sözlüğü', subtitle: 'Осторожно! Bu kelimeyi metroda her gün duyacaksın',
    letters: [
      { id: 'a67_1', upper: 'ПОМОЩЬ', lower: 'помощь', translit: "Pómaşş'", soundHint: 'Yardım — Щ uzun ve ince', phoneticRule: 'Помощь → "Pómaşş\'": vurgu başta; "На помощь!" = İmdat!', examples: [{ ru: 'ПОМОЩЬ', reading: "Pómaşş'", tr: 'Yardım' }, { ru: 'ПОЖАР', reading: 'Pajár', tr: 'Yangın' }] },
      { id: 'a67_2', upper: 'ОСТОРОЖНО', lower: 'осторожно', translit: 'Astarójna', soundHint: 'Dikkat! — metro anonslarının yıldızı', phoneticRule: 'Осторожно → "Astarójna": üç vurgusuz О da A okunur; vurgu РОЖ hecesinde.', examples: [{ ru: 'ОСТОРОЖНО', reading: 'Astarójna', tr: 'Dikkat!' }, { ru: 'ОПАСНО', reading: 'Apásna', tr: 'Tehlikeli' }] },
      { id: 'a67_3', upper: 'ПОЛИЦИЯ', lower: 'полиция', translit: 'Palítsıya', soundHint: 'Polis — ЦИ yine "tsı"', phoneticRule: 'Полиция → "Palítsıya": vurgu Лİ hecesinde, Ц sert.', examples: [{ ru: 'ПОЛИЦИЯ', reading: 'Palítsıya', tr: 'Polis' }, { ru: 'СКОРАЯ', reading: 'Skóraya', tr: 'Ambulans' }] },
    ],
    readingDrills: [
      { word: 'пожар', correct: 'Pajár', distractors: ['Pójar', 'Pojár', 'Paşár'], tr: 'Yangın' },
      { word: 'опасно', correct: 'Apásna', distractors: ['Opásno', 'Apasnó', 'Ópasna'], tr: 'Tehlikeli' },
      { word: 'скорая', correct: 'Skóraya', distractors: ['Skoráya', 'Skórıya', 'Sıkóraya'], tr: 'Ambulans' },
      { word: 'спасите', correct: 'Spasítye', distractors: ['Spásite', 'Spasité', 'Sıpasíte'], tr: 'Kurtarın!' },
      { word: 'тревога', correct: 'Trivóga', distractors: ['Trévoga', 'Trevogá', 'Tirivóga'], tr: 'Alarm' }
    ]
  },
  {
    id: 'alpha_68', title: 'İnternet & Sosyal Medya', subtitle: 'Пароль unutma, ссылка\'ya dikkat et',
    letters: [
      { id: 'a68_1', upper: 'ПАРОЛЬ', lower: 'пароль', translit: "Paról'", soundHint: 'Şifre — sondaki ЛЬ ince', phoneticRule: 'Пароль → "Paról\'": Fransızca "parole"den; sondaki Л yumuşak.', examples: [{ ru: 'ПАРОЛЬ', reading: "Paról'", tr: 'Şifre' }, { ru: 'САЙТ', reading: 'Sayt', tr: 'Site' }] },
      { id: 'a68_2', upper: 'СООБЩЕНИЕ', lower: 'сообщение', translit: 'Saapşéniye', soundHint: 'Mesaj — ОО yan yana iki hece', phoneticRule: 'Сообщение → "Saapşéniye": Б, sessiz Щ\'den önce P olur; ОО = "aa".', examples: [{ ru: 'СООБЩЕНИЕ', reading: 'Saapşéniye', tr: 'Mesaj' }, { ru: 'ПОЧТА', reading: 'Póçta', tr: 'Posta / E-posta' }] },
      { id: 'a68_3', upper: 'ССЫЛКА', lower: 'ссылка', translit: 'Ssı́lka', soundHint: 'Link — çift С uzun okunur', phoneticRule: 'Ссылка → "Ssı́lka": baştaki çift С tek uzun S gibi, Ы kalın.', examples: [{ ru: 'ССЫЛКА', reading: 'Ssı́lka', tr: 'Bağlantı / Link' }, { ru: 'ФАЙЛ', reading: 'Fayl', tr: 'Dosya' }] },
    ],
    readingDrills: [
      { word: 'сайт', correct: 'Sayt', distractors: ['Sáit', 'Sayıt', 'Şayt'], tr: 'Site' },
      { word: 'почта', correct: 'Póçta', distractors: ['Poçtá', 'Póşta', 'Paçtá'], tr: 'Posta' },
      { word: 'файл', correct: 'Fayl', distractors: ['Fáil', 'Fayıl', 'Fal'], tr: 'Dosya' },
      { word: 'сеть', correct: "Syet'", distractors: ['Set', 'Syet', 'Sit'], tr: 'Ağ' },
      { word: 'загрузка', correct: 'Zagrúska', distractors: ['Zagrúzka', 'Zágruzka', 'Zagruská'], tr: 'İndirme / Yükleme' }
    ]
  },
  {
    id: 'alpha_69', title: 'Doğa Yürüyüşü', subtitle: 'Лес, гора, река: dacha hafta sonuna hazırlık',
    letters: [
      { id: 'a69_1', upper: 'ЛЕС', lower: 'лес', translit: 'Lyes', soundHint: 'Orman — Л, Е\'den önce incelir', phoneticRule: 'Лес → "Lyes": tek hece; Rus masallarının ana sahnesi.', examples: [{ ru: 'ЛЕС', reading: 'Lyes', tr: 'Orman' }, { ru: 'ПОЛЕ', reading: 'Pólye', tr: 'Tarla / Kır' }] },
      { id: 'a69_2', upper: 'ОЗЕРО', lower: 'озеро', translit: 'Ózira', soundHint: 'Göl — vurgu BAŞTA', phoneticRule: 'Озеро → "Ózira": vurgu ilk hecede, kalan ünlüler zayıflar. Baykal bir озеро!', examples: [{ ru: 'ОЗЕРО', reading: 'Ózira', tr: 'Göl' }, { ru: 'РЕКА', reading: 'Riká', tr: 'Nehir' }] },
      { id: 'a69_3', upper: 'ГОРА', lower: 'гора', translit: 'Gará', soundHint: 'Dağ — vurgu sonda', phoneticRule: 'Гора → "Gará": vurgusuz О yine A. Çoğulu горы = "górı" (vurgu başa kayar!).', examples: [{ ru: 'ГОРА', reading: 'Gará', tr: 'Dağ' }, { ru: 'НЕБО', reading: 'Nyéba', tr: 'Gökyüzü' }] },
    ],
    readingDrills: [
      { word: 'река', correct: 'Riká', distractors: ['Réka', 'Reká', 'Rıká'], tr: 'Nehir' },
      { word: 'поле', correct: 'Pólye', distractors: ['Polyé', 'Póle', 'Palyé'], tr: 'Tarla / Kır' },
      { word: 'трава', correct: 'Travá', distractors: ['Tráva', 'Tırava', 'Travın'], tr: 'Çimen / Ot' },
      { word: 'небо', correct: 'Nyéba', distractors: ['Nebó', 'Nyebó', 'Néba'], tr: 'Gökyüzü' },
      { word: 'дерево', correct: 'Dyériva', distractors: ['Derevó', 'Dirévo', 'Dyerevó'], tr: 'Ağaç' }
    ]
  },
  {
    id: 'alpha_70', title: 'Uzay & Bilim', subtitle: 'Гагарин\'in dilinde "Поехали!" — uzay kelimelerini oku',
    letters: [
      { id: 'a70_1', upper: 'КОСМОС', lower: 'космос', translit: 'Kósmas', soundHint: 'Uzay — vurgu başta', phoneticRule: 'Космос → "Kósmas": ikinci О zayıflar. Rusça uzay çağının ana kelimesi.', examples: [{ ru: 'КОСМОС', reading: 'Kósmas', tr: 'Uzay' }, { ru: 'РАКЕТА', reading: 'Rakyéta', tr: 'Roket' }] },
      { id: 'a70_2', upper: 'ЗВЕЗДА', lower: 'звезда', translit: 'Zvizdá', soundHint: 'Yıldız — ЗВ ikilisi tek nefeste', phoneticRule: 'Звезда → "Zvizdá": vurgu sonda, Е zayıflar.', examples: [{ ru: 'ЗВЕЗДА', reading: 'Zvizdá', tr: 'Yıldız' }, { ru: 'ЛУНА', reading: 'Luná', tr: 'Ay' }] },
      { id: 'a70_3', upper: 'НАУКА', lower: 'наука', translit: 'Naúka', soundHint: 'Bilim — АУ iki ayrı hece', phoneticRule: 'Наука → "Naúka": А ve У ayrı ayrı okunur, vurgu У\'da.', examples: [{ ru: 'НАУКА', reading: 'Naúka', tr: 'Bilim' }, { ru: 'ПЛАНЕТА', reading: 'Planyéta', tr: 'Gezegen' }] },
    ],
    readingDrills: [
      { word: 'ракета', correct: 'Rakyéta', distractors: ['Ráketa', 'Rakéta', 'Rakyetá'], tr: 'Roket' },
      { word: 'луна', correct: 'Luná', distractors: ['Lúna', 'Lyuná', 'Luuna'], tr: 'Ay' },
      { word: 'планета', correct: 'Planyéta', distractors: ['Pláneta', 'Planetá', 'Planéta'], tr: 'Gezegen' },
      { word: 'спутник', correct: 'Spútnik', distractors: ['Sputník', 'Spudník', 'Spútnig'], tr: 'Uydu' },
      { word: 'земля', correct: 'Zimlyá', distractors: ['Zémlya', 'Zemlyá', 'Zimlá'], tr: 'Dünya / Toprak' }
    ]
  },
  {
    id: 'alpha_71', title: 'Masal & Edebiyat', subtitle: 'Сказка\'da З neden S okunur? Kitap kurdu turu',
    letters: [
      { id: 'a71_1', upper: 'СКАЗКА', lower: 'сказка', translit: 'Skáska', soundHint: 'Masal — З burada S okunur', phoneticRule: 'Сказка → "Skáska": sessiz К\'dan önce З sedasızlaşır.', examples: [{ ru: 'СКАЗКА', reading: 'Skáska', tr: 'Masal' }, { ru: 'ГЕРОЙ', reading: 'Giróy', tr: 'Kahraman' }] },
      { id: 'a71_2', upper: 'ПИСАТЕЛЬ', lower: 'писатель', translit: "Pisátil'", soundHint: 'Yazar — vurgu СА hecesinde', phoneticRule: 'Писатель → "Pisátil\'": -тель eki hep "-til\'" gibi zayıf okunur.', examples: [{ ru: 'ПИСАТЕЛЬ', reading: "Pisátil'", tr: 'Yazar' }, { ru: 'СТИХИ', reading: 'Stihí', tr: 'Şiirler' }] },
      { id: 'a71_3', upper: 'БИБЛИОТЕКА', lower: 'библиотека', translit: 'Bibliatyéka', soundHint: 'Kütüphane — 5 hece, ritmik', phoneticRule: 'Библиотека → "Bibliatyéka": vurgu ТЕ hecesinde, О zayıflar.', examples: [{ ru: 'БИБЛИОТЕКА', reading: 'Bibliatyéka', tr: 'Kütüphane' }, { ru: 'СТРАНИЦА', reading: 'Stranítsa', tr: 'Sayfa' }] },
    ],
    readingDrills: [
      { word: 'герой', correct: 'Giróy', distractors: ['Géroy', 'Gyeróy', 'Geróy'], tr: 'Kahraman' },
      { word: 'история', correct: 'Istóriya', distractors: ['İstoriyá', 'Ístoriya', 'Istoríya'], tr: 'Tarih / Hikâye' },
      { word: 'страница', correct: 'Stranítsa', distractors: ['Stránitsa', 'Stranitsá', 'Straníssa'], tr: 'Sayfa' },
      { word: 'читатель', correct: "Çitátil'", distractors: ['Çitatél', 'Çítatel', 'Şitátil'], tr: 'Okur' },
      { word: 'стихи', correct: 'Stihí', distractors: ['Stíhi', 'Stikí', 'Sıtíhi'], tr: 'Şiirler' }
    ]
  },
  {
    id: 'alpha_72', title: 'Vurgu İkizleri', subtitle: 'Замок kale mi kilit mi? Vurgu anlamı değiştirir!',
    letters: [
      { id: 'a72_1', upper: 'ЗАМОК', lower: 'замок', translit: 'Zámak / Zamók', soundHint: 'Aynı yazılış, iki kelime!', phoneticRule: 'ЗÁмок = kale, замÓк = kilit. Vurgu değişince ANLAM değişir!', examples: [{ ru: 'ЗАМОК (kale)', reading: 'Zámak', tr: 'Kale' }, { ru: 'ЗАМОК (kilit)', reading: 'Zamók', tr: 'Kilit' }] },
      { id: 'a72_2', upper: 'МУКА', lower: 'мука', translit: 'Múka / Muká', soundHint: 'Eziyet mi un mu? Vurguya bak', phoneticRule: 'МÝка = eziyet, мукÁ = un. Fırıncıyla filozofu vurgu ayırır.', examples: [{ ru: 'МУКА (eziyet)', reading: 'Múka', tr: 'Eziyet' }, { ru: 'МУКА (un)', reading: 'Muká', tr: 'Un' }] },
      { id: 'a72_3', upper: 'СТОИТ', lower: 'стоит', translit: 'Stóit / Staít', soundHint: 'Değer mi duruyor mu?', phoneticRule: 'СтÓит = (fiyatı) eder/değer, стоИт = ayakta duruyor. "Сколько стоит?" = Kaç para?', examples: [{ ru: 'СТОИТ (değer)', reading: 'Stóit', tr: '(Fiyatı) eder' }, { ru: 'СТОИТ (duruyor)', reading: 'Staít', tr: 'Duruyor' }] },
    ],
    readingDrills: [
      { word: 'дома', correct: 'Dóma', distractors: ['Damá', 'Domá', 'Dumá'], tr: 'Evde' },
      { word: 'окна', correct: 'Ókna', distractors: ['Akná', 'Okná', 'Ókno'], tr: 'Pencereler (çoğulda vurgu başa!)' },
      { word: 'руки', correct: 'Rúki', distractors: ['Rukí', 'Rukı́', 'Rúkı'], tr: 'Eller (çoğulda vurgu başa!)' },
      { word: 'белки', correct: 'Byélki', distractors: ['Bilkí', 'Bélki', 'Byelkí'], tr: 'Sincaplar (белкИ = proteinler!)' },
      { word: 'хлопок', correct: 'Hlópak', distractors: ['Hlapók', 'Hlopók', 'Hılópak'], tr: 'Pamuk (хлопÓк = el çırpma!)' }
    ]
  },
  {
    id: 'alpha_73', title: 'Sessiz Harfler Kulübü', subtitle: 'Солнце\'de Л, здравствуйте\'de В okunmaz — hayalet harfler',
    letters: [
      { id: 'a73_1', upper: 'СОЛНЦЕ', lower: 'солнце', translit: 'Sóntse', soundHint: 'Güneş — Л hayalettir!', phoneticRule: 'Солнце → "Sóntse": ЛНЦ kümesinde Л okunmaz.', examples: [{ ru: 'СОЛНЦЕ', reading: 'Sóntse', tr: 'Güneş' }, { ru: 'СЕРДЦЕ', reading: 'Syértse', tr: 'Kalp (Д okunmaz)' }] },
      { id: 'a73_2', upper: 'ЗДРАВСТВУЙТЕ', lower: 'здравствуйте', translit: 'Zdrástvuytye', soundHint: 'Merhaba — ilk В okunmaz!', phoneticRule: 'Здравствуйте → "Zdrástvuytye": ВСТВ kümesindeki ilk В sessizdir.', examples: [{ ru: 'ЗДРАВСТВУЙТЕ', reading: 'Zdrástvuytye', tr: 'Merhaba (resmî)' }, { ru: 'ЧУВСТВО', reading: 'Çústva', tr: 'His (В okunmaz)' }] },
      { id: 'a73_3', upper: 'ЛЕСТНИЦА', lower: 'лестница', translit: 'Lyésnitsa', soundHint: 'Merdiven — Т hayalettir', phoneticRule: 'Лестница → "Lyésnitsa": СТН kümesinde Т okunmaz.', examples: [{ ru: 'ЛЕСТНИЦА', reading: 'Lyésnitsa', tr: 'Merdiven' }, { ru: 'ПОЗДНО', reading: 'Pózna', tr: 'Geç (Д okunmaz)' }] },
    ],
    readingDrills: [
      { word: 'сердце', correct: 'Syértse', distractors: ['Syérdtse', 'Serdsé', 'Sirtsé'], tr: 'Kalp' },
      { word: 'чувство', correct: 'Çústva', distractors: ['Çúvstva', 'Çuvstvó', 'Çústvo'], tr: 'His / Duygu' },
      { word: 'поздно', correct: 'Pózna', distractors: ['Pózdna', 'Poznó', 'Pazdnó'], tr: 'Geç' },
      { word: 'известный', correct: 'Izvyésnıy', distractors: ['İzvéstnıy', 'Izvistnı́y', 'İzvyéstnıy'], tr: 'Ünlü / Tanınmış' },
      { word: 'счастливый', correct: 'Şşislívıy', distractors: ['Sçastlívıy', 'Şşastlívıy', 'Şislivı́y'], tr: 'Mutlu (Т okunmaz!)' }
    ]
  },
  {
    id: 'alpha_74', title: 'Ь ve Ъ Turnuvası', subtitle: 'Объявление ve вьюга: işaretlerin final sınavı',
    letters: [
      { id: 'a74_1', upper: 'ОБЪЯВЛЕНИЕ', lower: 'объявление', translit: 'Abyivlyéniye', soundHint: 'İlan / duyuru — Ъ araya duvar örer', phoneticRule: 'Объявление → "Ab-yivlyéniye": Ъ, Б ile Я\'yı ayırır; "abyav" değil "ab-yiv".', examples: [{ ru: 'ОБЪЯВЛЕНИЕ', reading: 'Abyivlyéniye', tr: 'İlan / Duyuru' }, { ru: 'ОБЪЕКТ', reading: 'Abyékt', tr: 'Nesne / Tesis' }] },
      { id: 'a74_2', upper: 'ВЬЮГА', lower: 'вьюга', translit: "V'yúga", soundHint: 'Kar fırtınası — ВЬЮ = "v-yu"', phoneticRule: 'Вьюга → "V\'yúga": Ь, В ile Ю arasına ince bir "y" geçişi koyar.', examples: [{ ru: 'ВЬЮГА', reading: "V'yúga", tr: 'Kar fırtınası' }, { ru: 'ПЬЕСА', reading: "P'yésa", tr: 'Tiyatro oyunu' }] },
      { id: 'a74_3', upper: 'СЪЕСТЬ', lower: 'съесть', translit: "Syest'", soundHint: 'Yiyip bitirmek — Ъ olmadan anlam değişir!', phoneticRule: 'Съесть → "S-yest\'": Ъ olmasa "сесть" (oturmak) olurdu. Bir işaret, koca fark!', examples: [{ ru: 'СЪЕСТЬ', reading: "Syest'", tr: 'Yiyip bitirmek' }, { ru: 'СЕСТЬ', reading: "Syest' (ince)", tr: 'Oturmak' }] },
    ],
    readingDrills: [
      { word: 'объект', correct: 'Abyékt', distractors: ['Obyékt', 'Abékt', 'Óbyekt'], tr: 'Nesne / Tesis' },
      { word: 'обезьяна', correct: "Abiz'yána", distractors: ['Obezyána', 'Abizána', 'Obyezyaná'], tr: 'Maymun' },
      { word: 'съёмка', correct: 'Syómka', distractors: ['Syemká', 'Sómka', 'Siyómka'], tr: 'Çekim (film)' },
      { word: 'платье', correct: 'Plátye', distractors: ['Platyé', 'Plátiye', 'Pilátye'], tr: 'Elbise' },
      { word: 'пьеса', correct: "P'yésa", distractors: ['Pyesá', 'Pésa', 'Piyésa'], tr: 'Tiyatro oyunu' }
    ]
  },
  {
    id: 'alpha_75', title: 'Hız Turu 3 — Sokak Dili', subtitle: 'Давай, ладно, пока: Rusların her cümlede kullandıkları',
    letters: [
      { id: 'a75_1', upper: 'ДАВАЙ', lower: 'давай', translit: 'Daváy', soundHint: 'Hadi! / Tamam! / Görüşürüz! — çok işlevli', phoneticRule: 'Давай → "Daváy": Ruslar bu kelimeyle vedalaşır bile: "Ну всё, давай!"', examples: [{ ru: 'ДАВАЙ', reading: 'Daváy', tr: 'Hadi / Tamam' }, { ru: 'ПОКА', reading: 'Paká', tr: 'Görüşürüz' }] },
      { id: 'a75_2', upper: 'ЛАДНО', lower: 'ладно', translit: 'Ládna', soundHint: 'Peki / tamam — günlük onay', phoneticRule: 'Ладно → "Ládna": sondaki О zayıflar. Хорошо\'nun sokak versiyonu.', examples: [{ ru: 'ЛАДНО', reading: 'Ládna', tr: 'Peki / Tamam' }, { ru: 'КОРОЧЕ', reading: 'Karóçi', tr: 'Kısacası' }] },
      { id: 'a75_3', upper: 'ВООБЩЕ', lower: 'вообще', translit: 'Vaapşé', soundHint: 'Genel olarak / hiç — ОО yine "aa"', phoneticRule: 'Вообще → "Vaapşé": Б, Щ\'den önce P olur; gençlerin ağzından düşmez.', examples: [{ ru: 'ВООБЩЕ', reading: 'Vaapşé', tr: 'Genel olarak / Hiç' }, { ru: 'СЕРЬЁЗНО', reading: "Sir'yózna", tr: 'Cidden' }] },
    ],
    readingDrills: [
      { word: 'пока', correct: 'Paká', distractors: ['Póka', 'Poká', 'Paka'], tr: 'Görüşürüz' },
      { word: 'короче', correct: 'Karóçi', distractors: ['Kóroçe', 'Koroçé', 'Karoşé'], tr: 'Kısacası' },
      { word: 'серьёзно', correct: "Sir'yózna", distractors: ['Seryóznó', 'Siryozná', 'Sériyozna'], tr: 'Cidden' },
      { word: 'наверное', correct: 'Navyérnaye', distractors: ['Navernóye', 'Návernoe', 'Navirnayé'], tr: 'Muhtemelen' },
      { word: 'договорились', correct: "Dagavarílis'", distractors: ['Dogovorílis', 'Dagavórilis', 'Dogavorilís'], tr: 'Anlaştık' }
    ]
  },
  {
    id: 'alpha_76', title: 'Büyük Mezuniyet', subtitle: 'Производительность\'u okuyabiliyorsan diploma senin!',
    letters: [
      { id: 'a76_1', upper: 'ПРЕДПРИНИМАТЕЛЬ', lower: 'предприниматель', translit: "Pritprinimátil'", soundHint: 'Girişimci — 16 harf, sakin ol', phoneticRule: 'Предприниматель → "Prit-prini-MÁ-til\'": Д, П\'den önce T olur; vurgudan geriye kur.', examples: [{ ru: 'ПРЕДПРИНИМАТЕЛЬ', reading: "Pritprinimátil'", tr: 'Girişimci' }] },
      { id: 'a76_2', upper: 'ПРОИЗВОДИТЕЛЬНОСТЬ', lower: 'производительность', translit: "Praizvadítil'nast'", soundHint: 'Verimlilik — 18 harflik canavar', phoneticRule: 'Производительность → "Pra-izva-Dİ-til\'-nast\'": iki О da A, sonda çifte yumuşaklık.', examples: [{ ru: 'ПРОИЗВОДИТЕЛЬНОСТЬ', reading: "Praizvadítil'nast'", tr: 'Verimlilik' }] },
      { id: 'a76_3', upper: 'ЗДРАВООХРАНЕНИЕ', lower: 'здравоохранение', translit: 'Zdravaahranyéniye', soundHint: 'Sağlık sistemi — ОО ortada "aa"', phoneticRule: 'Здравоохранение → "Zdrava-ahra-NYÉ-niye": sağlık + koruma birleşik kelimesi.', examples: [{ ru: 'ЗДРАВООХРАНЕНИЕ', reading: 'Zdravaahranyéniye', tr: 'Sağlık sistemi' }] },
    ],
    readingDrills: [
      { word: 'обстоятельство', correct: "Apstayátil'stva", distractors: ['Obstoyatélstvo', 'Abstáyatelstva', 'Opstoyatilstvó'], tr: 'Koşul / Durum' },
      { word: 'правительство', correct: "Pravítil'stva", distractors: ['Pravitelstvó', 'Právitelstva', 'Pravítelstvo'], tr: 'Hükümet' },
      { word: 'соотечественник', correct: 'Saatyéçistvinnik', distractors: ['Sooteçéstvennik', 'Saotéçestvinik', 'Sootiçestvénnik'], tr: 'Vatandaş / Hemşehri' },
      { word: 'усовершенствование', correct: 'Usavirşénstvavaniye', distractors: ['Usoverşenstvovániye', 'Úsoverşenstvovanie', 'Usavirşinstvavaníye'], tr: 'İyileştirme' },
      { word: 'путешественник', correct: 'Putişéstvinnik', distractors: ['Puteşéstvennik', 'Putişestvenník', 'Pútişestvinik'], tr: 'Gezgin' },
      { word: 'поздравляем', correct: 'Pazdravlyáim', distractors: ['Pozdravlyáem', 'Pázdravlyaem', 'Pozdıravlyáim'], tr: 'Tebrik ederiz — MEZUN OLDUN! 🎓' }
    ]
  },
];
