import type { DialogueLine, UnitModule, WordDetail } from '../curriculumData';

type Level = UnitModule['levelGroup'];
type SentenceDrill = UnitModule['sentences'][number];
type WordPair = readonly [ru: string, tr: string];
type SpeakerPair = readonly [first: string, second: string];
type RawSpec = readonly [
  id: string,
  level: Level,
  icon: string,
  title: string,
  description: string,
  placeRu: string,
  placeTr: string,
  speakers: SpeakerPair,
  words: readonly WordPair[],
];

const COLORS: Record<Level, string> = {
  A1: '#22c55e',
  A2: '#06b6d4',
  B1: '#f97316',
  B2: '#8b5cf6',
  C1: '#a78bfa',
  C2: '#c084fc',
  'C1/C2': '#ef4444',
};

const RU_LATIN: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'ye', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y',
  к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
  х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: "'", э: 'e', ю: 'yu', я: 'ya',
};

function transliterate(text: string): string {
  return [...text].map((char) => {
    const lower = char.toLocaleLowerCase('ru');
    const mapped = RU_LATIN[lower];
    if (!mapped) return char;
    return char === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1);
  }).join('');
}

function rotate<T>(items: readonly T[], amount: number): T[] {
  if (items.length <= 1) return [...items];
  const n = ((amount % items.length) + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

function tokenize(ru: string): string[] {
  return ru.split(/\s+/).map((x) => x.trim()).filter(Boolean);
}

function sentence(ru: string, tr: string, offset: number): SentenceDrill {
  const correct = tokenize(ru);
  return {
    ru,
    tr,
    scrambled: rotate(correct, Math.max(1, offset % correct.length)),
    correct,
  };
}

type Template = (placeRu: string, placeTr: string, w: readonly WordPair[]) => { ru: string; tr: string };

const A1_TEMPLATES: Template[] = [
  (pRu, pTr, w) => ({ ru: `Самое важное ${pRu} — «${w[0][0]}».`, tr: `${pTr} en önemlisi "${w[0][1]}".` }),
  (_p, _t, w) => ({ ru: `Я ищу «${w[1][0]}».`, tr: `"${w[1][1]}" arıyorum.` }),
  (_p, _t, w) => ({ ru: `У меня есть «${w[2][0]}».`, tr: `Bende "${w[2][1]}" var.` }),
  (_p, _t, w) => ({ ru: `«${w[3][0]}» помогает мне каждый день.`, tr: `"${w[3][1]}" bana her gün yardım eder.` }),
  (_p, _t, w) => ({ ru: `Скажи мне простое слово про «${w[0][0]}».`, tr: `Bana "${w[0][1]}" ile ilgili basit bir şey söyle.` }),
];

const A2_TEMPLATES: Template[] = [
  (pRu, pTr, w) => ({ ru: `Вчера ${pRu} мне пригодился «${w[0][0]}».`, tr: `Dün ${pTr} "${w[0][1]}" işime yaradı.` }),
  (_p, _t, w) => ({ ru: `Завтра я снова пойду и спрошу про «${w[1][0]}».`, tr: `Yarın yine gidip "${w[1][1]}" soracağım.` }),
  (_p, _t, w) => ({ ru: `Если что-то случится, я вспомню «${w[2][0]}».`, tr: `Bir aksilik olursa "${w[2][1]}" aklıma gelir.` }),
  (_p, _t, w) => ({ ru: `Мой совет: сначала «${w[3][0]}», потом остальное.`, tr: `Tavsiyem: önce "${w[3][1]}", sonra gerisi.` }),
  (_p, _t, w) => ({ ru: `Обычно я начинаю с «${w[0][0]}».`, tr: `Genelde "${w[0][1]}" ile başlarım.` }),
];

const B1_TEMPLATES: Template[] = [
  (_p, pTr, w) => ({ ru: `В этой ситуации первое, о чём я спросил, — «${w[0][0]}».`, tr: `${pTr} ilk sorduğum şey "${w[0][1]}" oldu.` }),
  (_p, _t, w) => ({ ru: `Если бы я знал про «${w[1][0]}» раньше, всё было бы легче.`, tr: `"${w[1][1]}" daha önce bilseydim her şey daha kolay olurdu.` }),
  (_p, _t, w) => ({ ru: `Я собираюсь узнать всё про «${w[2][0]}» до конца недели.`, tr: `"${w[2][1]}" hakkında her şeyi hafta sonuna kadar öğreneceğim.` }),
  (_p, _t, w) => ({ ru: `Мне сказали: если забуду «${w[3][0]}», придётся вернуться ещё раз.`, tr: `"${w[3][1]}" unutursam tekrar gelmem gerektiği söylendi.` }),
  (_p, _t, w) => ({ ru: `Сначала разберись с «${w[0][0]}», потом остальное само пойдёт.`, tr: `Önce "${w[0][1]}" hallet, gerisi kendiliğinden gelir.` }),
];

const B2_TEMPLATES: Template[] = [
  (_p, _t, w) => ({ ru: `В такой ситуации решающим фактором становится «${w[0][0]}».`, tr: `Böyle bir durumda belirleyici olan "${w[0][1]}" olur.` }),
  (_p, _t, w) => ({ ru: `Без «${w[1][0]}» мы рискуем отложить весь процесс.`, tr: `"${w[1][1]}" olmadan tüm süreci erteleme riskimiz var.` }),
  (_p, _t, w) => ({ ru: `Желательно заранее уточнить детали: «${w[2][0]}».`, tr: `"${w[2][1]}" detaylarını önceden netleştirmekte fayda var.` }),
  (_p, _t, w) => ({ ru: `Я попросил документы по «${w[3][0]}», чтобы избежать недоразумений.`, tr: `Yanlış anlaşılma olmasın diye "${w[3][1]}" belgelerini istedim.` }),
  (_p, _t, w) => ({ ru: `Если «${w[0][0]}» не устроит стороны, поиск решения займёт недели.`, tr: `"${w[0][1]}" tarafları memnun etmezse çözüm haftalar sürer.` }),
];

const C_TEMPLATES: Template[] = [
  (_p, _t, w) => ({ ru: `В рамках данной процедуры особую роль играет «${w[0][0]}».`, tr: `Bu prosedür kapsamında "${w[0][1]}" özel bir rol oynuyor.` }),
  (_p, _t, w) => ({ ru: `Отсутствие «${w[1][0]}» может повлечь юридические последствия.`, tr: `"${w[1][1]}" eksikliği hukuki sonuçlar doğurabilir.` }),
  (_p, _t, w) => ({ ru: `Сторонам необходимо согласовать условия по «${w[2][0]}».`, tr: `Tarafların "${w[2][1]}" koşullarında mutabık kalması gerekir.` }),
  (_p, _t, w) => ({ ru: `По мнению присутствовавших, самым спорным пунктом был «${w[3][0]}».`, tr: `Katılımcılara göre en tartışmalı madde "${w[3][1]}" idi.` }),
  (_p, _t, w) => ({ ru: `Следует письменно зафиксировать все договорённости относительно «${w[0][0]}».`, tr: `"${w[0][1]}" ile ilgili tüm anlaşmalar yazılı olarak kayıt altına alınmalı.` }),
];

const TEMPLATES_BY_LEVEL: Record<Level, Template[]> = {
  A1: A1_TEMPLATES,
  A2: A2_TEMPLATES,
  B1: B1_TEMPLATES,
  B2: B2_TEMPLATES,
  C1: C_TEMPLATES,
  C2: C_TEMPLATES,
  'C1/C2': C_TEMPLATES,
};

const DAILY_LIFE_PLUS_SPECS = [
  ['rainy_day', 'A1', '🌧️', 'Evde Yağmurlu Gün', 'Yağmur, pencere, battaniye ve sıcak çay kelimeleri', 'в квартире в дождливый день', 'evde yağmurlu günde', ['Ev Arkadaşı', 'Arkadaş'], [['Дождь', 'Yağmur'], ['Зонт', 'Şemsiye'], ['Окно', 'Pencere'], ['Плед', 'Battaniye'], ['Горячий чай', 'Sıcak çay'], ['Книга', 'Kitap']]],
  ['snow_play', 'A1', '❄️', 'Kar Gününde Dışarıda', 'Kar topu, eldiven, atkı ve kızak tepesi', 'на улице в снегу', 'karlı sokakta', ['Çocuk', 'Arkadaş'], [['Снег', 'Kar'], ['Перчатки', 'Eldivenler'], ['Шарф', 'Atkı'], ['Снежок', 'Kartopu'], ['Свитер', 'Kazak'], ['Горка', 'Kızak tepesi']]],
  ['morning_walk', 'A1', '🚶', 'Sabah Yürüyüşü', 'Park, bank, temiz hava ve sessizlik', 'в парке утром', 'sabah parkta', ['Komşu', 'Kişi'], [['Парк', 'Park'], ['Скамейка', 'Banka (oturak)'], ['Воздух', 'Hava'], ['Тишина', 'Sessizlik'], ['Солнце', 'Güneş'], ['Шаги', 'Adımlar']]],
  ['tea_break', 'A1', '🫖', 'Çay Molası', 'Demlik, bardak, şeker ve mola sohbeti', 'на кухне за чаем', 'çay molasında', ['Arkadaş 1', 'Arkadaş 2'], [['Чайник', 'Demlik ve çaydanlık'], ['Стакан', 'Bardak'], ['Сахар', 'Şeker'], ['Ложка', 'Kaşık'], ['Перерыв', 'Mola'], ['Беседа', 'Sohbet']]],
  ['watering_plants', 'A1', '🪴', 'Çiçekleri Sulamak', 'Saksı, sulama kabı, yaprak ve pencere önü', 'у подоконника', 'pencere önünde', ['Anne', 'Çocuk'], [['Цветок', 'Çiçek'], ['Горшок', 'Saksı'], ['Вода', 'Su'], ['Лейка', 'Sulama kabı'], ['Подоконник', 'Pencere önü'], ['Лист', 'Yaprak']]],
  ['gift_wrapping', 'A1', '🎀', 'Hediye Paketleme', 'Kutu, kâğıt, kurdele, makas ve sürpriz', 'за столом с подарком', 'hediye masasında', ['Kardeş', 'Anne'], [['Подарок', 'Hediye'], ['Коробка', 'Kutu'], ['Бумага', 'Paket kâğıdı'], ['Лента', 'Kurdele'], ['Ножницы', 'Makas'], ['Сюрприз', 'Sürpriz']]],
  ['lost_item', 'A1', '🧐', 'Kayıp Eşyayı Aramak', 'Aramak, cep, çanta, kanepe ve bulundu', 'в комнате', 'odada', ['Kişi', 'Ev Arkadaşı'], [['Потерять', 'Kaybetmek'], ['Искать', 'Aramak'], ['Диван', 'Kanepe'], ['Сумка', 'Çanta'], ['Карман', 'Cep'], ['Нашёлся', 'Bulundu']]],
  ['video_call_family', 'A1', '📱', 'Aileyle Video Görüşme', 'Arama, ekran, kamera, ses ve gülümseme', 'на видеозвонке', 'video görüşmede', ['Evlat', 'Anne'], [['Звонок', 'Arama'], ['Экран', 'Ekran'], ['Камера', 'Kamera'], ['Слышишь', 'Duyuyor musun'], ['Улыбка', 'Gülümseme'], ['Мама', 'Anne']]],
  ['decorating_room', 'A1', '🎈', 'Odayı Süslemek', 'Balon, süs şeridi, masa ve mumlar', 'в комнате перед праздником', 'kutlama öncesi odada', ['Eş', 'Arkadaş'], [['Шарик', 'Balon'], ['Гирлянда', 'Süs şeridi'], ['Стол', 'Masa'], ['Стулья', 'Sandalyeler'], ['Свечи', 'Mumlar'], ['Праздник', 'Özel gün']]],
  ['street_musician', 'A1', '🎸', 'Meydanda Sokak Müzisyeni', 'Gitar, şarkı, melodi, izleyiciler ve alkış', 'на площади', 'meydanda', ['Dinleyici', 'Müzisyen'], [['Гитара', 'Gitar'], ['Песня', 'Şarkı'], ['Мелодия', 'Melodi'], ['Зрители', 'İzleyenler'], ['Площадь', 'Meydan'], ['Аплодисменты', 'Alkış']]],
  ['ice_cream_stand', 'A1', '🍦', 'Dondurmacıda', 'Külah, çikolata, çilek ve sıra', 'у ларька с мороженым', 'dondurmacıda', ['Müşteri', 'Satıcı'], [['Мороженое', 'Dondurma'], ['Рожок', 'Külah'], ['Шоколад', 'Çikolata'], ['Клубника', 'Çilek'], ['Фисташки', 'Antep fıstığı'], ['Очередь', 'Sıra']]],
  ['neighbor_help', 'A1', '🤝', 'Komşudan Yardım İstemek', 'Ödünç almak, kapı sesi, teşekkür ve emanet', 'у соседской двери', 'komşu kapısında', ['Kişi', 'Komşu'], [['Одолжить', 'Ödünç almak'], ['Стук', 'Kapı sesi'], ['Спасибо', 'Teşekkür'], ['Яйца', 'Yumurtalar'], ['Сосед', 'Komşu'], ['Помочь', 'Yardım etmek']]],
  ['optician', 'A2', '👓', 'Optik Mağazasında', 'Çerçeve, cam, göz muayenesi ve görüş', 'в оптике', 'optik mağazasında', ['Müşteri', 'Optisyen'], [['Очки', 'Gözlük'], ['Оправа', 'Çerçeve'], ['Линзы', 'Camlar'], ['Проверка зрения', 'Göz muayenesi'], ['Зрение', 'Görüş'], ['Солнцезащитные', 'Güneş gözlüğü']]],
  ['shoe_shopping', 'A2', '👟', 'Ayakkabı Alışverişi', 'Numara, deneme, dar-kalıp ve indirim', 'в обувном магазине', 'ayakkabı mağazasında', ['Müşteri', 'Satıcı'], [['Размер', 'Numara'], ['Примерить', 'Denemek'], ['Узкие', 'Dar'], ['Кеды', 'Spor ayakkabı'], ['Скидка', 'İndirim'], ['Чек', 'Fiş']]],
  ['id_photo', 'A2', '📸', 'Biyometrik Fotoğraf', 'Belge fotoğrafı, arka fon, baskı ve ebat', 'в фотоателье', 'fotoğraf stüdyosunda', ['Müşteri', 'Fotoğrafçı'], [['Фотограф', 'Fotoğrafçı'], ['Документ', 'Belge'], ['Фон', 'Arka fon'], ['Печать', 'Baskı'], ['Размер фото', 'Fotoğraf ebadı'], ['Улыбка', 'Gülümseme']]],
  ['driver_theory_exam', 'A2', '🚦', 'Ehliyet Teorik Sınavı', 'Soru, puan, geçiş üstünlüğü, levha ve kavşak', 'на экзамене в автошколе', 'sürücü kursu sınavında', ['Aday', 'Sınav Görevlisi'], [['Экзамен', 'Sınav'], ['Вопрос', 'Soru'], ['Балл', 'Puan'], ['Приоритет', 'Geçiş üstünlüğü'], ['Знак', 'Trafik levhası'], ['Перекрёсток', 'Kavşak']]],
  ['first_workday', 'A2', '💼', 'İlk İş Günü', 'İş arkadaşı, giriş kartı, ofis ve öğle yemeği', 'в первый день на работе', 'ilk iş gününde', ['Yeni Çalışan', 'Kollega'], [['Коллега', 'İş arkadaşı'], ['Кабинет', 'Ofis odası'], ['Пропуск', 'Giriş kartı'], ['Обед', 'Öğle yemeği'], ['Документы', 'Evraklar'], ['Шеф', 'Yönetici']]],
  ['school_report_day', 'A2', '📋', 'Karne Günü', 'Notlar, övgü, tatil başlangıcı ve paylaşmak', 'со школьным дневником', 'karne gününde', ['Öğrenci', 'Veli'], [['Оценки', 'Notlar'], ['Пятёрка', 'En yüksek not'], ['Похвастаться', 'Göstermek / övünmek'], ['Каникулы', 'Tatil'], ['Похвала', 'Övgü'], ['Настроение', 'Heves']]],
  ['vet_checkup', 'A2', '🐶', 'Veterinerde Muayene', 'Klinik, tahlil, aşı, ateş ve tasma', 'в ветклинике', 'veteriner kliniğinde', ['Hayvan Sahibi', 'Veteriner'], [['Ветеринар', 'Veteriner'], ['Клиника', 'Klinik'], ['Анализ', 'Tahlil'], ['Прививка', 'Aşı'], ['Температура', 'Ateş'], ['Ошейник', 'Tasma']]],
  ['cracked_screen', 'A2', '📱', 'Ekranı Kırdım', 'Çatlak, usta, değişim, garanti ve kılıf', 'в ремонтной мастерской', 'telefon tamircisinde', ['Müşteri', 'Usta'], [['Трещина', 'Çatlak'], ['Экран', 'Ekran'], ['Мастер', 'Usta'], ['Замена', 'Değişim'], ['Гарантия', 'Garanti'], ['Чехол', 'Kılıf']]],
  ['kombi_problem', 'A2', '🔥', 'Kombi ve Isınma Sorunu', 'Petek, kombi, ısı ve soğuk oda', 'дома зимой', 'kışın evde', ['Ev Sahibi', 'Usta'], [['Батареи', 'Petekler'], ['Котёл', 'Kombi'], ['Тепло', 'Isı'], ['Холодно', 'Soğuk'], ['Включить', 'Açmak'], ['Труба', 'Boru']]],
  ['noisy_neighbor', 'A2', '🔊', 'Gürültülü Komşu', 'Gürültü, duvar, matkap ve gece sessizliği', 'в квартире ночью', 'gece evde', ['Kiracı', 'Komşu'], [['Шум', 'Gürültü'], ['Стена', 'Duvar'], ['Дрель', 'Matkap'], ['Ночью', 'Gece'], ['Тишина', 'Sessizlik'], ['Уважать', 'Saygı göstermek']]],
  ['moving_couch', 'A2', '🛋️', 'Kanepeyi Taşımak', 'Ağır, köşe, koridor, bel ve kaldırmak', 'в коридоре с диваном', 'koridorda kanepeyle', ['Arkadaş 1', 'Arkadaş 2'], [['Диван', 'Kanepe'], ['Тяжёлый', 'Ağır'], ['Угол', 'Köşe'], ['Коридор', 'Koridor'], ['Спина', 'Bel'], ['Приподнять', 'Kaldırmak']]],
  ['sunglasses_choice', 'A2', '😎', 'Güneş Gözlüğü Seçimi', 'UV koruma, renk, konfor ve denemek', 'в магазине очков', 'gözlük mağazasında', ['Müşteri', 'Satıcı'], [['Защита', 'Koruma'], ['УФ-лучи', 'UV ışınları'], ['Цвет', 'Renk'], ['Комфорт', 'Rahatlık'], ['Примерить', 'Denemek'], ['Жара', 'Sıcak']]],
  ['swim_class_signup', 'A2', '🏊', 'Yüzme Kursu Kaydı', 'Havuz, grup, bone, kart ve derinlik', 'в бассейне', 'yüzme havuzunda', ['Veli', 'Yönetici'], [['Бассейн', 'Havuz'], ['Группа', 'Grup'], ['Тренер', 'Antrenör'], ['Шапочка', 'Bone'], ['Абонемент', 'Üyelik kartı'], ['Глубина', 'Derinlik']]],
  ['city_tour', 'A2', '🗺️', 'Şehir Turuna Katılmak', 'Rehber, buluşma, merkez ve otobüs', 'на экскурсии', 'şehir turunda', ['Turist', 'Rehber'], [['Экскурсия', 'Tur / gezi'], ['Гид', 'Rehber'], ['Встреча', 'Buluşma'], ['Центр', 'Merkez'], ['Достопримечательность', 'Gezilecek yer'], ['Автобус', 'Otobüs']]],
  ['tenant_repair', 'B1', '🏠', 'Kiracı Olarak Arıza Bildirme', 'Arıza bildirme, malik, parça değişimi ve tarih', 'со звонком арендодателю', 'ev sahibini ararken', ['Kiracı', 'Ev Sahibi'], [['Поломка', 'Arıza'], ['Собственник', 'Malik / ev sahibi'], ['Когда придёте?', 'Ne zaman geleceksiniz?'], ['Договор аренды', 'Kira sözleşmesi'], ['Компенсация', 'Telafi'], ['Следующий месяц', 'Gelecek ay']]],
  ['car_inspection', 'B1', '🚗', 'Araç Muayene İstasyonu', 'Muayene, randevu, fren, far ve süre', 'на техническом осмотре', 'araç muayenesinde', ['Sürücü', 'Memur'], [['Осмотр', 'Muayene'], ['Талон', 'Sıra bileti'], ['Допуск', 'Geçiş hakkı'], ['Тормоза', 'Frenler'], ['Фары', 'Farlar'], ['Срок', 'Süre']]],
  ['teacher_meeting', 'B1', '👨‍👩‍👧', 'Öğretmenle Birebir Görüşme', 'Başarı durumu, dikkat, ödev ve destek', 'на родительском собрании', 'veli görüşmesinde', ['Veli', 'Öğretmen'], [['Встреча', 'Görüşme'], ['Успеваемость', 'Başarı durumu'], ['Внимание', 'Dikkat'], ['Домашняя работа', 'Ev ödevi'], ['Совет', 'Tavsiye'], ['Поддержка', 'Destek']]],
  ['tax_office', 'B1', '🏛️', 'Vergi Dairesinde', 'Borç, belge, vezne penceresi ve ödeme', 'в налоговой инспекции', 'vergi dairesinde', ['Mükellef', 'Memur'], [['Налог', 'Vergi'], ['Задолженность', 'Borç'], ['Справка', 'Belge'], ['Окно', 'Vezne penceresi'], ['Квитанция', 'Ödeme fişi'], ['Оплатить', 'Ödemek']]],
  ['wedding_planning', 'B1', '💍', 'Düğün Organizasyonu', 'Salon, davetli, sunucu, davetiye ve bütçe', 'на встрече с организатором', 'organizatörle görüşmede', ['Çift', 'Organizatör'], [['Зал', 'Salon'], ['Гости', 'Davetliler'], ['Тамада', 'Düğün sunucusu'], ['Приглашения', 'Davetiyeler'], ['Бюджет', 'Bütçe'], ['Меню', 'Yemek listesi']]],
  ['vaccine_day', 'B1', '💉', 'Aşı Randevusu', 'Kol, yan etki, tarih ve gözlem', 'в прививочном кабинете', 'aşı odasında', ['Hasta', 'Hemşire'], [['Прививка', 'Aşı'], ['Плечо', 'Kol'], ['Побочный эффект', 'Yan etki'], ['Дата', 'Tarih'], ['Наблюдение', 'Gözlem'], ['Удостоверение', 'Aşı belgesi']]],
  ['home_insur', 'B1', '🏠', 'Evi Sigortalatmak', 'Poliçe kapsamı, yangın, su baskını ve prim', 'у страхового агента', 'sigorta acentesinde', ['Ev Sahibi', 'Acente'], [['Страхование', 'Sigortalama'], ['Ущерб', 'Hasar'], ['Пожар', 'Yangın'], ['Затопление', 'Su baskını'], ['Премия', 'Prim'], ['Франшиза', 'Muafiyet']]],
  ['card_fraud', 'B1', '💳', 'Karttan Habersiz Para Çekildi', 'Şüpheli çekim, bloke, başvuru ve iade', 'со звонком в банк', 'bankayı ararken', ['Müşteri', 'Banka Çalışanı'], [['Списание', 'Karttan çekim'], ['Подозрительный', 'Şüpheli'], ['Заблокировать', 'Bloke etmek'], ['Заявление', 'Başvuru dilekçesi'], ['Возврат', 'İade'], ['SMS-уведомление', 'SMS bildirimi']]],
  ['building_meeting', 'B1', '🏢', 'Apartman Toplantısı', 'Tadilat, aidat, oylama ve tutanak', 'на собрании жильцов', 'apartman toplantısında', ['Kiracı', 'Yönetici'], [['Собрание', 'Toplantı'], ['Капремонт', 'Büyük tadilat'], ['Взнос', 'Aidat'], ['Голосование', 'Oylama'], ['Протокол', 'Tutanak'], ['Решение', 'Karar']]],
  ['moving_day', 'B1', '📦', 'Taşınma ve Nakliye', 'Taşıyıcı, kırılır eşya, nakliye aracı ve kutular', 'в день переезда', 'taşınma gününde', ['Ev Sahibi', 'Nakliyeci'], [['Переезд', 'Taşınma'], ['Грузчики', 'Taşıyıcılar'], ['Хрупкое', 'Kırılır eşya'], ['Машина', 'Nakliye aracı'], ['Коробки', 'Kutular'], ['Этаж', 'Kat']]],
  ['driving_lesson', 'B1', '🚙', 'Direksiyon Dersi', 'Eğitmen, debriyaj, sinyal ve gerilim', 'на уроке вождения', 'direksiyon dersinde', ['Öğrenci', 'Eğitmen'], [['Инструктор', 'Eğitmen'], ['Сцепление', 'Debriyaj'], ['Ручной тормоз', 'El freni'], ['Поворотник', 'Sinyal'], ['Зеркало', 'Ayna'], ['Нервничать', 'Gerilmek']]],
  ['hardware_store', 'B1', '🔧', 'El Aletleri Alışverişi', 'Tornavida, çekiç, dübel ve şerit metre', 'в хозяйственном магазине', 'nalburda', ['Müşteri', 'Satıcı'], [['Отвёртка', 'Tornavida'], ['Молоток', 'Çekiç'], ['Дюбель', 'Dübel'], ['Шуруп', 'Vida'], ['Уровень', 'Su terazisi'], ['Рулетка', 'Şerit metre']]],
  ['open_uni_signup', 'B1', '🎓', 'Açık Öğretim Kaydı', 'Kayıt, sınav dönemi, ders kitabı ve diploma', 'при подаче документов в вуз', 'üniversiteye kayıt verirken', ['Öğrenci', 'Memur'], [['Регистрация', 'Kayıt'], ['Дистанционно', 'Uzaktan'], ['Сессия', 'Sınav dönemi'], ['Учебник', 'Ders kitabı'], ['Взнос', 'Ücret'], ['Диплом', 'Diploma']]],
  ['rent_raise_talk', 'B1', '📜', 'Kira Zammı Konuşması', 'Zam oranı, piyasa rayici ve uzlaşma', 'в разговоре о повышении аренды', 'kira zammı görüşmesinde', ['Kiracı', 'Ev Sahibi'], [['Повышение', 'Zam'], ['Индексация', 'Endeksleme'], ['По рынку', 'Piyasa rayici'], ['Договориться', 'Uzlaşmak'], ['Устно', 'Sözlü'], ['Письменно', 'Yazılı']]],
  ['notary_power', 'B2', '📜', 'Noterde Vekâletname', 'Vekâlet, mühür, ücret ve onay', 'у нотариуса', 'noter odasında', ['Vatandaş', 'Noter'], [['Доверенность', 'Vekâletname'], ['Подпись', 'İmza'], ['Печать', 'Mühür'], ['Тариф', 'Ücret tarifesi'], ['Удостоверить', 'Onaylamak'], ['Представитель', 'Temsilci']]],
  ['court_prep', 'B2', '⚖️', 'Mahkeme Gününe Hazırlık', 'Dosya, duruşma, tanık ve karar', 'накануне судебного заседания', 'duruşma öncesi', ['Davacı', 'Avukat'], [['Дело', 'Dosya / dava'], ['Заседание', 'Duruşma'], ['Свидетель', 'Tanık'], ['Иск', 'Dava'], ['Адвокат', 'Avukat'], ['Решение', 'Karar']]],
  ['customs_parcel', 'B2', '🛃', 'Gümrükte Kalan Paket', 'Vergi, beyan, limit ve gümrük işlemi', 'на таможне', 'gümrükte', ['Alıcı', 'Gümrük Memuru'], [['Таможня', 'Gümrük'], ['Пошлина', 'Gümrük vergisi'], ['Декларация', 'Beyan'], ['Растаможка', 'Gümrük işlemleri'], ['Лимит', 'Limit'], ['Проверка', 'Denetim']]],
  ['mortgage_talk', 'B2', '🏦', 'Konut Kredisi Görüşmesi', 'Peşinat, faiz, taksit ve erken ödeme', 'в банке об ипотеке', 'bankada kredi görüşmesinde', ['Müşteri', 'Uzman'], [['Ипотека', 'Konut kredisi'], ['Первоначальный взнос', 'Peşinat'], ['Ставка', 'Faiz oranı'], ['Ануитет', 'Sabit taksit'], ['Досрочно', 'Erken ödeme'], ['Поручитель', 'Kefil']]],
  ['salary_negotiation', 'B2', '🤝', 'Maaş Pazarlığı', 'Teklif, beklentiler, performans ve revizyon', 'в переговорной', 'pazarlık odasında', ['Aday', 'İK Müdürü'], [['Предложение', 'Teklif'], ['Ожидания', 'Beklentiler'], ['Показатели', 'Performans göstergeleri'], ['Гибкий график', 'Esnek çalışma'], ['Пересмотр', 'Revizyon'], ['Опыт', 'Deneyim']]],
  ['freelance_contract', 'B2', '✍️', 'Sözleşme Son Kontrol', 'Madde, teslim, avans ve telif', 'перед подписанием договора', 'sözleşme imzasından önce', ['Serbest Çalışan', 'Müşteri'], [['Пункт', 'Madde'], ['Сроки', 'Teslim süreleri'], ['Предоплата', 'Avans'], ['Правки', 'Revizyonlar'], ['Ответственность', 'Sorumluluk'], ['Авторские права', 'Telif']]],
  ['business_permit', 'B2', '🏛️', 'İşyeri Açma Ruhsatı', 'Ruhsat, itfaiye denetimi ve hijyen kuralları', 'с заявлением на лицензию', 'ruhsat başvurusunda', ['Girişimci', 'Müfettiş'], [['Разрешение', 'Ruhsat'], ['Пожарная инспекция', 'İtfaiye denetimi'], ['Санитарная норма', 'Hijyen kuralları'], ['Площадь', 'Metrekare'], ['Акт', 'Kontrol raporu'], ['Подать документы', 'Belgeleri vermek']]],
  ['consumer_rights', 'B2', '⚖️', 'Tüketici Hakem Heyeti', 'İtiraz yazısı, bilirkişi ve tazmin', 'в комиссии по правам потребителя', 'tüketici komisyonunda', ['Tüketici', 'Uzman'], [['Права потребителя', 'Tüketici hakları'], ['Претензия', 'İtiraz yazısı'], ['Экспертиза', 'Bilirkişi incelemesi'], ['Возместить', 'Tazmin etmek'], ['Комиссия', 'Komisyon'], ['Обжаловать', 'İtiraz etmek']]],
  ['police_statement', 'B2', '🚔', 'Karakolda İfade', 'Çalınan eşya, kamera kayıtları ve tarif', 'в отделении полиции', 'karakolda', ['Mağdur', 'Memur'], [['Заявление', 'İfade / başvuru'], ['Украли', 'Çalındı'], ['Свидетель', 'Tanık'], ['Камеры', 'Kameralar'], ['Описание', 'Tarif'], ['Расследование', 'Soruşturma']]],
  ['school_transfer', 'B2', '🎓', 'Okul Nakil Başvurusu', 'Dosya, gerekçe, kontenjan ve danışman', 'с заявлением о переводе', 'nakil başvurusunda', ['Öğrenci', 'Sekreter'], [['Перевод', 'Nakil'], ['Личное дело', 'Öğrenci dosyası'], ['Основание', 'Gerekçe'], ['Свободное место', 'Boş kontenjan'], ['Куратор', 'Danışman'], ['Зачёт', 'Kredi saydırma']]],
  ['home_buying_deal', 'B2', '🏡', 'Evi Satın Alma Pazarlığı', 'Kapora, tapu kaydı, eksper ve satış işlemi', 'на переговорах о покупке', 'satın alma pazarlığında', ['Alıcı', 'Emlakçı'], [['Торг', 'Pazarlık'], ['Задаток', 'Kapora'], ['Кадастровая выписка', 'Tapu kaydı'], ['Агентство', 'Emlak ofisi'], ['Оценщик', 'Eksper'], ['Сделка', 'Satış işlemi']]],
  ['bill_dispute', 'B2', '🧾', 'Yanlış Faturaya İtiraz', 'Sayaç değeri, yeniden hesaplama ve ceza', 'в споре о счёте', 'fatura itirazında', ['Müşteri', 'Destek Hattı'], [['Перерасчёт', 'Yeniden hesaplama'], ['Показания', 'Sayaç değeri'], ['Начисление', 'Tahakkuk'], ['Штраф', 'Ceza'], ['Ошибка', 'Hata'], ['Линия поддержки', 'Destek hattı']]],
  ['inheritance_talk', 'C1/C2', '🕯️', 'Miras Paylaşımı Görüşmesi', 'Vasiyet, varis, pay ve eşit bölüşüm', 'в разговоре о наследстве', 'miras görüşmesinde', ['Varis', 'Avukat'], [['Наследство', 'Miras'], ['Завещание', 'Vasiyet'], ['Наследник', 'Varis'], ['Доля', 'Pay'], ['Свидетельство', 'Resmî belge'], ['Равные части', 'Eşit paylar']]],
  ['bankruptcy_meeting', 'C1/C2', '📉', 'İflas Sürecinde Görüşme', 'Alacaklı, varlıklar ve yeniden yapılandırma', 'при обсуждении банкротства', 'iflas görüşmesinde', ['Borçlu', 'Finans Danışmanı'], [['Банкротство', 'İflas'], ['Кредитор', 'Alacaklı'], ['Активы', 'Varlıklar'], ['Суд', 'Mahkeme'], ['Реструктуризация', 'Yeniden yapılandırma'], ['Расчёты', 'Ödemeler dengesi']]],
  ['urban_renewal', 'C1/C2', '🏗️', 'Kentsel Dönüşüm Toplantısı', 'Tahliye, müteahhit, tazmin ve yıkım', 'на собрании о реновации', 'kentsel dönüşüm toplantısında', ['Malik', 'Proje Temsilcisi'], [['Реновация', 'Kentsel dönüşüm'], ['Расселение', 'Tahliye'], ['Застройщик', 'Müteahhit'], ['Компенсация', 'Tazminat'], ['Единогласно', 'Oybirliği ile'], ['Снос', 'Yıkım']]],
  ['press_statement', 'C1/C2', '🎙️', 'Basın Açıklaması Hazırlığı', 'İfade biçimi, ton, resmî görüş ve sızıntı', 'подготовке заявления для прессы', 'basın açıklaması hazırlığında', ['Sözcü', 'Editör'], [['Формулировка', 'İfade biçimi'], ['Тон', 'Üslup'], ['Официальная позиция', 'Resmî görüş'], ['Утечка', 'Sızıntı'], ['Оговорка', 'Dil sürçmesi'], ['Вопросы', 'Sorular']]],
  ['thesis_defense', 'C1/C2', '🎓', 'Tez Savunması Provası', 'Hipotez, jüri, metodoloji ve slaytlar', 'предзащите диссертации', 'tez savunması provasında', ['Doktora Adayı', 'Danışman'], [['Диссертация', 'Tez'], ['Гипотеза', 'Hipotez'], ['Оппонент', 'Muhalif hoca'], ['Актуальность', 'Güncellik'], ['Методология', 'Metodoloji'], ['Слайды', 'Slaytlar']]],
  ['financial_audit', 'C1/C2', '🔍', 'Mali Denetime Hazırlık', 'Denetçi, örneklem, uyumsuzluk ve teyit', 'подготовке к аудиту', 'mali denetim hazırlığında', ['Muhasebeci', 'Denetçi'], [['Аудит', 'Denetim'], ['Проверяющий', 'Denetçi'], ['Выборка', 'Örneklem'], ['Расхождение', 'Uyumsuzluk'], ['Подтверждение', 'Teyit'], ['Документация', 'Evrak dosyası']]],
  ['labor_court', 'C1/C2', '🧑‍⚖️', 'İş Mahkemesi Süreci', 'İhtilaf, talepler, deliller ve temyiz', 'в трудовом споре', 'iş anlaşmazlığında', ['Çalışan', 'Avukat'], [['Трудовой спор', 'İş anlaşmazlığı'], ['Увольнение', 'İşten çıkarma'], ['Взыскание', 'Tahsilat'], ['Требования', 'Talepler'], ['Доказательства', 'Deliller'], ['Апелляция', 'Temyiz']]],
  ['consulate_emergency', 'C1/C2', '🏛️', 'Konsoloslukta Acil İşlem', 'Geçici belge, vize ve görevli erişim', 'в консульстве экстренно', 'konsoloslukta acil durumda', ['Vatandaş', 'Görevli'], [['Консульство', 'Konsolosluk'], ['Экстренный', 'Acil'], ['Виза', 'Vize'], ['Временное свидетельство', 'Geçici belge'], ['Дипломат', 'Diplomat'], ['Горячая линия', 'Acil hat']]],
] as const satisfies readonly RawSpec[];

function makeWords(spec: RawSpec, unitIndex: number): WordDetail[] {
  const [, level, , title, , , , , words] = spec;
  return words.map(([ru, tr], wordIndex) => ({
    id: `dlp_${String(unitIndex + 1).padStart(2, '0')}_w${String(wordIndex + 1).padStart(2, '0')}`,
    ru,
    reading: transliterate(ru),
    tr,
    level,
    usageNote: `${title} gündelik hayat ünitesinde kullanılan pratik kelime/kalıp.`,
  }));
}

function makeSentences(spec: RawSpec, unitIndex: number): SentenceDrill[] {
  const [, level, , , , placeRu, placeTr, , words] = spec;
  const w = rotate(words, unitIndex % words.length);
  const templates = TEMPLATES_BY_LEVEL[level];
  const cut = rotate(templates, unitIndex).slice(0, 5);
  return cut.map((fn, i) => {
    const built = fn(placeRu, placeTr, w);
    return sentence(built.ru, built.tr, unitIndex + i + 1);
  });
}

function makeDialogue(spec: RawSpec, unitIndex: number): DialogueLine[] {
  const [, , , title, , placeRu, placeTr, speakers, words] = spec;
  const [a, b, c, d, e] = rotate(words, unitIndex * 2).slice(0, 5);
  const lines = [
    {
      speaker: speakers[0],
      ru: `У меня сегодня дело ${placeRu}: тема «${a[0]}».`,
      tr: `Bugün ${placeTr} işim var: konu "${a[1]}".`,
    },
    {
      speaker: speakers[1],
      ru: `Сначала реши вопрос с «${b[0]}», потом спроси про «${c[0]}».`,
      tr: `Önce "${b[1]}" işini hallet, sonra "${c[1]}" hakkında sor.`,
    },
    {
      speaker: speakers[0],
      ru: `А «${d[0]}» точно понадобится?`,
      tr: `"${d[1]}" kesin gerekli mi?`,
    },
    {
      speaker: speakers[1],
      ru: `Конечно! Без него тема «${title}» не работает, да и «${e[0]}» пригодится.`,
      tr: `Elbette! O olmadan "${title}" konusu yürümez, "${e[1]}" da lazım olur.`,
    },
  ];
  return lines.map((line) => ({ ...line, reading: transliterate(line.ru) }));
}

function makeUnit(spec: RawSpec, index: number, unitNumber: number): UnitModule {
  const [id, level, icon, title, description, , placeTr] = spec;
  return {
    id: `daily_life_plus_${String(index + 1).padStart(2, '0')}_${id}`,
    unitNumber,
    levelGroup: level,
    title,
    description,
    category: 'Gündelik Hayat PLUS • Gerçek Durumlar',
    color: COLORS[level],
    icon,
    grammarExplain: `📌 GÜNDELİK HAYAT ODAĞI:\n1. Bu ünitede "${title}" bağlamında gerçek hayatta duyulabilecek kelimeler çalışılır.\n2. Cümle kuruluşları ${level === 'A1' ? 'kısa ve doğrudan (у меня есть / я ищу)' : level === 'A2' ? 'geçmiş-gelecek yaşı ile pratik kalıplar' : level === 'B1' ? 'koşul cümleleri ve dolaylı aktarım' : level === 'B2' ? 'risk, şart ve öneri bildiren ikincil cümleler' : 'resmî/hukukî söylem (необходимо, следует зафиксировать)'} üstüne kuruludur.\n3. Önce kelimeyi ezberleme; sahnenin (${placeTr}) içinde kullan — böyle öğrenilen kalır.`,
    words: makeWords(spec, index),
    sentences: makeSentences(spec, index),
    sceneTitle: `${title} Mini Sahnesi`,
    sceneContext: `${placeTr} geçen gerçekçi bir gündelik durum; amaç konuyu bağımsız kelimeler, cümleler ve mini diyalogla pekiştirmektir.`,
    dialogue: makeDialogue(spec, index),
  };
}

export function createDailyLifePlus(startUnitNumber: number): UnitModule[] {
  return DAILY_LIFE_PLUS_SPECS.map((spec, index) => makeUnit(spec, index, startUnitNumber + index));
}
