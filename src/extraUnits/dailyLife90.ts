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

function makeWords(spec: RawSpec, unitIndex: number): WordDetail[] {
  const [, level, , title, , , , , words] = spec;
  return words.map(([ru, tr], wordIndex) => ({
    id: `daily90_${String(unitIndex + 1).padStart(2, '0')}_w${String(wordIndex + 1).padStart(2, '0')}`,
    ru,
    reading: transliterate(ru),
    tr,
    level,
    usageNote: `${title} gündelik hayat ünitesinde kullanılan pratik kelime/kalıp.`,
  }));
}

function makeSentences(spec: RawSpec, unitIndex: number): SentenceDrill[] {
  const [, , , , , placeRu, placeTr, , words] = spec;
  const [a, b, c, d] = rotate(words, unitIndex % words.length);
  return [
    sentence(`В ${placeRu} мне нужен «${a[0]}».`, `${placeTr} “${a[1]}” gerekiyor.`, unitIndex + 1),
    sentence(`Я спрашиваю про «${b[0]}» заранее.`, `“${b[1]}” hakkında önceden soru soruyorum.`, unitIndex + 2),
    sentence(`Если есть проблема, помогает фраза «${c[0]}».`, `Sorun varsa “${c[1]}” ifadesi yardımcı olur.`, unitIndex + 3),
    sentence(`В обычной жизни важно помнить «${d[0]}».`, `Gündelik hayatta “${d[1]}” hatırlamak önemlidir.`, unitIndex + 4),
  ];
}

function makeDialogue(spec: RawSpec, unitIndex: number): DialogueLine[] {
  const [, , , title, , placeRu, placeTr, speakers, words] = spec;
  const [a, b, c, d, e] = rotate(words, unitIndex * 2).slice(0, 5);
  const lines = [
    {
      speaker: speakers[0],
      ru: `Сегодня ${placeRu} у меня тема: «${a[0]}».`,
      tr: `Bugün ${placeTr} konum: “${a[1]}”.`,
    },
    {
      speaker: speakers[1],
      ru: `Тогда проверь «${b[0]}» и не забудь «${c[0]}».`,
      tr: `O zaman “${b[1]}” kontrol et ve “${c[1]}” unutma.`,
    },
    {
      speaker: speakers[0],
      ru: `Хорошо. Если спросят, я скажу про «${d[0]}».`,
      tr: `Tamam. Sorarlarsa “${d[1]}” hakkında söyleyeceğim.`,
    },
    {
      speaker: speakers[1],
      ru: `Отлично. Так тема «${title}» звучит естественно, особенно с «${e[0]}».`,
      tr: `Harika. Böylece “${title}” konusu özellikle “${e[1]}” ile doğal duyulur.`,
    },
  ];

  return lines.map((line) => ({ ...line, reading: transliterate(line.ru) }));
}

function makeUnit(spec: RawSpec, index: number, unitNumber: number): UnitModule {
  const [id, level, icon, title, description, , placeTr] = spec;
  return {
    id: `daily_life_90_${String(index + 1).padStart(2, '0')}_${id}`,
    unitNumber,
    levelGroup: level,
    title,
    description,
    category: 'Gündelik Hayat 90 • Farklı Konular',
    color: COLORS[level],
    icon,
    grammarExplain: `📌 GÜNDELİK HAYAT ODAĞI:\n1. Bu ünitede "${title}" bağlamında gerçek hayatta duyulabilecek kelimeler çalışılır.\n2. Kelimeleri tek tek değil; soru sorma, açıklama yapma ve kısa cevap verme içinde kullan.\n3. Seviye ${level}: cümleler ${level === 'A1' ? 'çok kısa ve doğrudan' : level === 'A2' ? 'pratik ve bağlamlı' : level === 'B1' ? 'durum anlatan' : level === 'B2' ? 'detay ve sorun çözme odaklı' : 'nüanslı ve resmî/yarı resmî'} tutulmuştur.`,
    words: makeWords(spec, index),
    sentences: makeSentences(spec, index),
    sceneTitle: `${title} Mini Sahnesi`,
    sceneContext: `${placeTr} geçen farklı bir gündelik hayat durumu; amaç konuyu bağımsız kelimeler, kısa cümleler ve mini diyalogla pekiştirmektir.`,
    dialogue: makeDialogue(spec, index),
  };
}

const DAILY_LIFE_SPECS = [
  ['morning_routine', 'A1', '🌅', 'Sabah Rutini', 'Uyanma, hazırlanma, kahvaltı ve evden çıkma kelimeleri', 'дома утром', 'sabah evde', ['Ev Arkadaşı', 'Arkadaş'], [['Будильник', 'Alarm'], ['Проснуться', 'Uyanmak'], ['Умыться', 'Yüzünü yıkamak'], ['Завтрак', 'Kahvaltı'], ['Зубная щётка', 'Diş fırçası'], ['Выйти из дома', 'Evden çıkmak']]],
  ['bathroom_basics', 'A1', '🚿', 'Banyo Temelleri', 'Duş, havlu, sabun ve lavabo gibi günlük banyo kelimeleri', 'в ванной', 'banyoda', ['Kişi', 'Ev Arkadaşı'], [['Душ', 'Duş'], ['Полотенце', 'Havlu'], ['Мыло', 'Sabun'], ['Шампунь', 'Şampuan'], ['Зеркало', 'Ayna'], ['Раковина', 'Lavabo']]],
  ['getting_dressed', 'A1', '👕', 'Giyinme ve Kıyafet Seçme', 'Günlük kıyafetleri giyme ve basit tercih belirtme', 'у шкафа', 'dolabın yanında', ['Kardeş', 'Arkadaş'], [['Рубашка', 'Gömlek'], ['Брюки', 'Pantolon'], ['Носки', 'Çorap'], ['Куртка', 'Ceket / mont'], ['Обувь', 'Ayakkabı'], ['Надеть', 'Giymek']]],
  ['keys_door', 'A1', '🔑', 'Anahtar ve Kapı İşleri', 'Kapıyı açma, kapatma, kilit ve apartman girişi kelimeleri', 'у двери', 'kapıda', ['Komşu', 'Ev Sahibi'], [['Ключ', 'Anahtar'], ['Дверь', 'Kapı'], ['Замок', 'Kilit'], ['Открыть', 'Açmak'], ['Закрыть', 'Kapatmak'], ['Подъезд', 'Apartman girişi']]],
  ['elevator_stairs', 'A1', '🛗', 'Asansör ve Merdiven', 'Kat, düğme, yukarı-aşağı ve merdiven ifadeleri', 'в подъезде', 'apartman girişinde', ['Komşu', 'Çocuk'], [['Лифт', 'Asansör'], ['Этаж', 'Kat'], ['Кнопка', 'Düğme'], ['Лестница', 'Merdiven'], ['Наверх', 'Yukarı'], ['Вниз', 'Aşağı']]],
  ['bakery', 'A1', '🥐', 'Mahalle Fırını', 'Ekmek, poğaça, tazelik ve paket isteme', 'в пекарне', 'fırında', ['Müşteri', 'Fırıncı'], [['Пекарня', 'Fırın'], ['Хлеб', 'Ekmek'], ['Булочка', 'Küçük çörek'], ['Свежий', 'Taze'], ['Нарезать', 'Dilimlemek'], ['Пакет', 'Poşet']]],
  ['corner_shop', 'A1', '🛒', 'Bakkal ve Küçük Market', 'Süt, yumurta, peynir, fiyat ve para üstü konuşmaları', 'в магазине у дома', 'mahalle marketinde', ['Müşteri', 'Kasiyer'], [['Магазин у дома', 'Mahalle marketi'], ['Молоко', 'Süt'], ['Яйца', 'Yumurta'], ['Сыр', 'Peynir'], ['Цена', 'Fiyat'], ['Сдача', 'Para üstü']]],
  ['pharmacy_basics', 'A1', '💊', 'Eczane Temelleri', 'Basit ilaç, vitamin, reçete ve eczacı kelimeleri', 'в аптеке', 'eczanede', ['Müşteri', 'Eczacı'], [['Аптека', 'Eczane'], ['Пластырь', 'Yara bandı'], ['Сироп', 'Şurup'], ['Витамины', 'Vitaminler'], ['Рецепт', 'Reçete'], ['Фармацевт', 'Eczacı']]],
  ['bus_stop', 'A1', '🚏', 'Otobüs Durağı', 'Durakta bekleme, hat ve kart kullanma', 'на остановке', 'durakta', ['Yolcu', 'Başka Yolcu'], [['Остановка', 'Durak'], ['Автобус', 'Otobüs'], ['Маршрут', 'Güzergâh'], ['Карта', 'Kart'], ['Ждать', 'Beklemek'], ['Выйти', 'İnmek / çıkmak']]],
  ['taxi_app', 'A1', '🚕', 'Taksi Uygulaması', 'Adres girme, sürücü, ödeme ve apartman girişi', 'в такси', 'taksi konuşmasında', ['Yolcu', 'Şoför'], [['Такси', 'Taksi'], ['Адрес', 'Adres'], ['Водитель', 'Sürücü'], ['Приложение', 'Uygulama'], ['Подъезд', 'Apartman girişi'], ['Оплата', 'Ödeme']]],
  ['street_directions', 'A1', '🧭', 'Sokakta Yön Sorma', 'Sağa-sola, düz gitme, trafik ışığı ve yakınlık kelimeleri', 'на улице', 'sokakta', ['Turist', 'Yerli'], [['Улица', 'Sokak'], ['Повернуть', 'Dönmek'], ['Прямо', 'Düz'], ['Рядом', 'Yakında'], ['Далеко', 'Uzak'], ['Светофор', 'Trafik ışığı']]],
  ['atm_cash', 'A1', '🏧', 'ATM ve Nakit Çekme', 'Kart, şifre, bakiye ve makbuz kelimeleri', 'у банкомата', 'ATM önünde', ['Kişi', 'Arkadaş'], [['Банкомат', 'ATM'], ['Карта', 'Kart'], ['Пин-код', 'PIN kodu'], ['Снять деньги', 'Para çekmek'], ['Баланс', 'Bakiye'], ['Квитанция', 'Makbuz']]],
  ['phone_battery', 'A1', '🔋', 'Telefon Şarjı', 'Şarj aleti, priz, kablo ve pil yüzdesi', 'у розетки', 'prizin yanında', ['Arkadaş 1', 'Arkadaş 2'], [['Телефон', 'Telefon'], ['Зарядка', 'Şarj aleti'], ['Батарея', 'Pil'], ['Розетка', 'Priz'], ['Кабель', 'Kablo'], ['Процент', 'Yüzde']]],
  ['home_wifi', 'A1', '📶', 'Ev İnterneti ve Wi-Fi', 'Şifre, modem, sinyal ve yeniden başlatma', 'дома у роутера', 'evde modem yanında', ['Ev Sahibi', 'Misafir'], [['Вай-фай', 'Wi-Fi'], ['Пароль', 'Şifre'], ['Роутер', 'Modem / router'], ['Сигнал', 'Sinyal'], ['Интернет', 'İnternet'], ['Перезагрузить', 'Yeniden başlatmak']]],
  ['laundry', 'A1', '🧺', 'Çamaşır Yıkama', 'Makine, deterjan, leke, kurutma ve ütüleme', 'у стиральной машины', 'çamaşır makinesi yanında', ['Ev Arkadaşı', 'Kişi'], [['Стирать', 'Yıkamak'], ['Порошок', 'Deterjan'], ['Машинка', 'Makine'], ['Сушить', 'Kurutmak'], ['Гладить', 'Ütülemek'], ['Пятно', 'Leke']]],
  ['cleaning_home', 'A1', '🧹', 'Ev Temizliği', 'Süpürge, paspas, toz ve çöp kelimeleri', 'во время уборки', 'temizlik sırasında', ['Anne', 'Çocuk'], [['Уборка', 'Temizlik'], ['Веник', 'Süpürge'], ['Швабра', 'Paspas'], ['Пыль', 'Toz'], ['Мусор', 'Çöp'], ['Чисто', 'Temiz']]],
  ['trash_sorting', 'A1', '♻️', 'Çöp Ayırma', 'Kâğıt, plastik, cam ve geri dönüşüm kutuları', 'у контейнеров', 'çöp konteynerlerinin yanında', ['Komşu', 'Kişi'], [['Мусор', 'Çöp'], ['Контейнер', 'Konteyner'], ['Бумага', 'Kâğıt'], ['Пластик', 'Plastik'], ['Стекло', 'Cam'], ['Переработка', 'Geri dönüşüm']]],
  ['light_bulb', 'A1', '💡', 'Ampul Değiştirme', 'Işık, anahtar, patlayan ampul ve dikkat etme', 'в комнате', 'odada', ['Ev Sahibi', 'Komşu'], [['Лампочка', 'Ampul'], ['Свет', 'Işık'], ['Перегореть', 'Patlamak / yanmamak'], ['Заменить', 'Değiştirmek'], ['Выключатель', 'Anahtar / düğme'], ['Осторожно', 'Dikkatli']]],
  ['parcel_pickup', 'A1', '📦', 'Kargo Teslim Alma', 'Kurye, teslim kodu, imza ve paket alma', 'у двери', 'kapıda', ['Kurye', 'Alıcı'], [['Посылка', 'Kargo paketi'], ['Курьер', 'Kurye'], ['Код', 'Kod'], ['Получить', 'Teslim almak'], ['Подпись', 'İmza'], ['Доставка', 'Teslimat']]],
  ['return_package', 'A1', '↩️', 'Ürün İadesi', 'Fiş, beden, paketleme ve değişim kelimeleri', 'в пункте выдачи', 'teslim noktasında', ['Müşteri', 'Görevli'], [['Возврат', 'İade'], ['Чек', 'Fiş'], ['Размер', 'Beden'], ['Упаковка', 'Ambalaj'], ['Отправить', 'Göndermek'], ['Обмен', 'Değişim']]],
  ['school_parent_note', 'A2', '🏫', 'Okuldan Veli Notu', 'Öğretmen mesajı, imza ve veli toplantısı', 'у школьного дневника', 'okul günlüğü yanında', ['Veli', 'Öğretmen'], [['Родитель', 'Veli'], ['Учитель', 'Öğretmen'], ['Дневник', 'Okul günlüğü'], ['Подписать', 'İmzalamak'], ['Собрание', 'Toplantı'], ['Домашнее задание', 'Ev ödevi']]],
  ['job_interview_basic', 'A2', '💼', 'İş Görüşmesi Temelleri', 'CV, deneyim, maaş ve açık pozisyon kelimeleri', 'на собеседовании', 'iş görüşmesinde', ['Aday', 'İK Uzmanı'], [['Собеседование', 'İş görüşmesi'], ['Резюме', 'CV'], ['Опыт', 'Deneyim'], ['Навык', 'Beceri'], ['Вакансия', 'Açık pozisyon'], ['Зарплата', 'Maaş']]],
  ['colleague_lunch', 'A2', '🍱', 'İş Arkadaşıyla Öğle Arası', 'Mola, yemekhane, sohbet ve işe dönme', 'на обеденном перерыве', 'öğle arasında', ['Çalışan', 'İş Arkadaşı'], [['Коллега', 'İş arkadaşı'], ['Обеденный перерыв', 'Öğle molası'], ['Столовая', 'Yemekhane'], ['Контейнер', 'Saklama kabı'], ['Разговор', 'Sohbet'], ['Вернуться', 'Dönmek']]],
  ['sim_card', 'A2', '📱', 'SIM Kart ve Telefon Tarifesi', 'Dakika, GB, pasaport ve bakiye yükleme', 'в салоне связи', 'telefon bayisinde', ['Müşteri', 'Danışman'], [['Сим-карта', 'SIM kart'], ['Тариф', 'Tarife'], ['Минуты', 'Dakikalar'], ['Гигабайты', 'GB internet'], ['Пополнить', 'Bakiye yüklemek'], ['Паспорт', 'Pasaport']]],
  ['gym_signup', 'A2', '🏋️', 'Spor Salonuna Yazılma', 'Abonelik, antrenör, soyunma odası ve program', 'в тренажёрном зале', 'spor salonunda', ['Üye', 'Danışman'], [['Абонемент', 'Abonelik'], ['Тренажёрный зал', 'Spor salonu'], ['Раздевалка', 'Soyunma odası'], ['Тренер', 'Antrenör'], ['Расписание', 'Program'], ['Полотенце', 'Havlu']]],
  ['hairdresser', 'A2', '💇', 'Kuaförde Saç Kesimi', 'Randevu, kesim, boya ve fön kelimeleri', 'в парикмахерской', 'kuaförde', ['Müşteri', 'Kuaför'], [['Парикмахерская', 'Kuaför'], ['Стрижка', 'Saç kesimi'], ['Чёлка', 'Kâkül'], ['Покрасить', 'Boyatmak'], ['Укладка', 'Fön / şekillendirme'], ['Записаться', 'Randevu almak']]],
  ['doctor_appointment', 'A2', '🩺', 'Doktor Randevusu', 'Randevu, sıra numarası, şikâyet ve muayene', 'в поликлинике', 'poliklinikte', ['Hasta', 'Sekreter'], [['Запись к врачу', 'Doktor randevusu'], ['Талон', 'Sıra fişi'], ['Кабинет', 'Oda / muayene odası'], ['Жалоба', 'Şikâyet'], ['Температура', 'Ateş'], ['Осмотр', 'Muayene']]],
  ['dentist_visit', 'A2', '🦷', 'Dişçi Ziyareti', 'Diş ağrısı, dolgu, gargara ve sonraki randevu', 'у стоматолога', 'dişçide', ['Hasta', 'Dişçi'], [['Стоматолог', 'Dişçi'], ['Зуб', 'Diş'], ['Пломба', 'Dolgu'], ['Боль', 'Ağrı'], ['Полоскать', 'Çalkalamak'], ['Следующий приём', 'Sonraki randevu']]],
  ['optician', 'A2', '👓', 'Gözlükçü ve Optik', 'Göz muayenesi, çerçeve ve lens kelimeleri', 'в оптике', 'optikçide', ['Müşteri', 'Optikçi'], [['Оптика', 'Optik mağazası'], ['Очки', 'Gözlük'], ['Линзы', 'Lensler'], ['Проверка зрения', 'Göz kontrolü'], ['Оправа', 'Çerçeve'], ['Рецепт', 'Reçete']]],
  ['veterinarian', 'A2', '🐾', 'Veterinerde Evcil Hayvan', 'Kedi, köpek, aşı, mama ve tasma konuşmaları', 'у ветеринара', 'veterinerde', ['Hayvan Sahibi', 'Veteriner'], [['Ветеринар', 'Veteriner'], ['Кошка', 'Kedi'], ['Собака', 'Köpek'], ['Прививка', 'Aşı'], ['Корм', 'Mama'], ['Поводок', 'Tasma']]],
  ['post_office', 'A2', '📮', 'Postane İşleri', 'Zarf, pul, bildirim ve gönderi işlemleri', 'на почте', 'postanede', ['Müşteri', 'Memur'], [['Почта', 'Postane'], ['Конверт', 'Zarf'], ['Марка', 'Pul'], ['Извещение', 'Bildirim kâğıdı'], ['Очередь', 'Sıra'], ['Отправление', 'Gönderi']]],
  ['dry_cleaner', 'A2', '🧥', 'Kuru Temizleme', 'Palto, leke, aciliyet, makbuz ve teslim alma', 'в химчистке', 'kuru temizlemede', ['Müşteri', 'Görevli'], [['Химчистка', 'Kuru temizleme'], ['Пальто', 'Palto'], ['Пятно', 'Leke'], ['Срочно', 'Acil'], ['Квитанция', 'Makbuz'], ['Забрать', 'Teslim almak']]],
  ['tailor', 'A2', '🪡', 'Terzide Paça ve Tadilat', 'Pantolon kısaltma, ölçü alma ve prova', 'в ателье', 'terzide', ['Müşteri', 'Terzi'], [['Ателье', 'Terzi / atölye'], ['Подшить брюки', 'Pantolon paçası yapmak'], ['Рукав', 'Kol'], ['Мерка', 'Ölçü'], ['Примерка', 'Prova'], ['Готово', 'Hazır']]],
  ['shoe_repair', 'A2', '👞', 'Ayakkabı Tamiri', 'Topuk, taban, bağcık ve usta konuşmaları', 'в ремонте обуви', 'ayakkabı tamircisinde', ['Müşteri', 'Usta'], [['Ремонт обуви', 'Ayakkabı tamiri'], ['Каблук', 'Topuk'], ['Подошва', 'Taban'], ['Шнурки', 'Bağcık'], ['Клей', 'Yapıştırıcı'], ['Мастер', 'Usta']]],
  ['car_wash', 'A2', '🚗', 'Oto Yıkama', 'Dış yıkama, iç temizlik, cila ve sıra', 'на автомойке', 'oto yıkamada', ['Sürücü', 'Görevli'], [['Автомойка', 'Oto yıkama'], ['Кузов', 'Araç dış gövdesi'], ['Салон', 'Araç içi'], ['Пылесос', 'Elektrik süpürgesi'], ['Воск', 'Cila'], ['Очередь', 'Sıra']]],
  ['parking', 'A2', '🅿️', 'Otopark ve Park Ücreti', 'Park yeri, bariyer, saatlik ödeme ve ceza', 'на парковке', 'otoparkta', ['Sürücü', 'Görevli'], [['Парковка', 'Otopark'], ['Место', 'Yer'], ['Шлагбаум', 'Bariyer'], ['Оплатить', 'Ödemek'], ['Час', 'Saat'], ['Штраф', 'Ceza']]],
  ['fuel_station', 'A2', '⛽', 'Benzinlikte Konuşma', 'Benzin, dizel, depo, pompa ve kasa kelimeleri', 'на заправке', 'benzinlikte', ['Sürücü', 'Pompacı'], [['Заправка', 'Benzinlik'], ['Бензин', 'Benzin'], ['Дизель', 'Dizel'], ['Полный бак', 'Tam depo'], ['Колонка', 'Pompa'], ['Касса', 'Kasa']]],
  ['bicycle_repair', 'A2', '🚲', 'Bisiklet Tamiri', 'Tekerlek, zincir, fren ve pompa kelimeleri', 'в веломастерской', 'bisiklet tamircisinde', ['Bisikletçi', 'Usta'], [['Велосипед', 'Bisiklet'], ['Колесо', 'Tekerlek'], ['Цепь', 'Zincir'], ['Насос', 'Pompa'], ['Тормоз', 'Fren'], ['Мастерская', 'Tamir atölyesi']]],
  ['picnic_prep', 'A2', '🧺', 'Piknik Hazırlığı', 'Örtü, termos, sandviç ve piknik sepeti', 'перед пикником', 'piknik öncesinde', ['Arkadaş 1', 'Arkadaş 2'], [['Пикник', 'Piknik'], ['Плед', 'Örtü'], ['Корзина', 'Sepet'], ['Термос', 'Termos'], ['Сэндвич', 'Sandviç'], ['Муравьи', 'Karıncalar']]],
  ['birthday_party', 'A2', '🎂', 'Doğum Günü Partisi', 'Mum, pasta, hediye, tebrik ve misafirler', 'на дне рождения', 'doğum gününde', ['Ev Sahibi', 'Misafir'], [['День рождения', 'Doğum günü'], ['Свечи', 'Mumlar'], ['Торт', 'Pasta'], ['Подарок', 'Hediye'], ['Поздравление', 'Tebrik'], ['Гости', 'Misafirler']]],
  ['wedding_invitation', 'A2', '💌', 'Düğün Davetiyesi', 'Tarih, kıyafet, banket ve tebrik kelimeleri', 'перед свадьбой', 'düğün öncesinde', ['Davetli', 'Arkadaş'], [['Приглашение', 'Davetiye'], ['Свадьба', 'Düğün'], ['Дата', 'Tarih'], ['Наряд', 'Kıyafet'], ['Банкет', 'Davet yemeği'], ['Поздравить', 'Tebrik etmek']]],
  ['relatives_visit', 'A2', '👪', 'Akraba Ziyareti', 'Eve giderken hediye, çay, fotoğraf albümü ve sohbet', 'в гостях у родственников', 'akraba ziyaretinde', ['Kuzen', 'Teyze'], [['Родственники', 'Akrabalar'], ['Гостинец', 'Ziyaret hediyesi'], ['Чай', 'Çay'], ['Фотоальбом', 'Fotoğraf albümü'], ['Расспросить', 'Hâl hatır sormak'], ['Уехать', 'Ayrılmak / gitmek']]],
  ['neighbor_noise', 'A2', '🔇', 'Komşu Gürültüsü', 'Geç saat, sessiz olma, özür ve anlaşma', 'у соседей', 'komşuda', ['Komşu 1', 'Komşu 2'], [['Сосед', 'Komşu'], ['Шум', 'Gürültü'], ['Поздно', 'Geç'], ['Тише', 'Daha sessiz'], ['Извиниться', 'Özür dilemek'], ['Договориться', 'Anlaşmak']]],
  ['landlord_call', 'A2', '🏠', 'Ev Sahibini Arama', 'Kira, musluk, tamir, sözleşme ve acil durum', 'по телефону с хозяином', 'ev sahibiyle telefonda', ['Kiracı', 'Ev Sahibi'], [['Хозяин квартиры', 'Ev sahibi'], ['Аренда', 'Kira'], ['Кран', 'Musluk'], ['Ремонт', 'Tamir'], ['Договор', 'Sözleşme'], ['Срочно', 'Acil']]],
  ['moving_boxes', 'A2', '📦', 'Taşınma Kutuları', 'Taşınma, koli, nakliyeci, adres ve yerleşme', 'во время переезда', 'taşınma sırasında', ['Kiracı', 'Nakliyeci'], [['Переезд', 'Taşınma'], ['Коробка', 'Kutu / koli'], ['Грузчики', 'Nakliyeciler'], ['Лифт', 'Asansör'], ['Адрес', 'Adres'], ['Распаковать', 'Kutuları açmak']]],
  ['renting_apartment', 'B1', '🏘️', 'Kiralık Daire Görme', 'Depozito, aidat, komşular ve ev şartlarını konuşma', 'на осмотре квартиры', 'daire görmeye gidildiğinde', ['Kiracı Adayı', 'Emlakçı'], [['Снять квартиру', 'Daire kiralamak'], ['Залог', 'Depozito'], ['Коммунальные услуги', 'Faturalar / aidat giderleri'], ['Соседи', 'Komşular'], ['Осмотр', 'Evi görme'], ['Условия', 'Şartlar']]],
  ['utility_bills', 'B1', '🧾', 'Faturaları Ödeme', 'Elektrik, su, gaz, sayaç ve online ödeme', 'при оплате счетов', 'fatura öderken', ['Ev Sahibi', 'Kiracı'], [['Счёт за свет', 'Elektrik faturası'], ['Вода', 'Su'], ['Газ', 'Gaz'], ['Показания счётчика', 'Sayaç göstergesi'], ['Квитанция', 'Makbuz'], ['Оплатить онлайн', 'Online ödemek']]],
  ['cancel_subscription', 'B1', '🚫', 'Abonelik İptali', 'Otomatik ödeme, destek hattı, onay ve para iadesi', 'в личном кабинете', 'online hesap panelinde', ['Müşteri', 'Destek'], [['Подписка', 'Abonelik'], ['Отменить', 'İptal etmek'], ['Автоплатёж', 'Otomatik ödeme'], ['Служба поддержки', 'Müşteri destek'], ['Подтверждение', 'Onay'], ['Возврат средств', 'Para iadesi']]],
  ['customer_support', 'B1', '🎧', 'Müşteri Hizmetleri Araması', 'Çağrı merkezi, başvuru numarası ve çözüm takibi', 'на горячей линии', 'destek hattında', ['Müşteri', 'Operatör'], [['Горячая линия', 'Çağrı hattı'], ['Оператор', 'Operatör'], ['Номер заявки', 'Başvuru numarası'], ['Проблема', 'Sorun'], ['Решить', 'Çözmek'], ['Ожидание', 'Bekleme']]],
  ['lost_wallet', 'B1', '👛', 'Kayıp Cüzdan', 'Belge, banka kartı, kart iptali ve kayıp bürosu', 'в бюро находок', 'kayıp eşya bürosunda', ['Kişi', 'Görevli'], [['Кошелёк', 'Cüzdan'], ['Потерять', 'Kaybetmek'], ['Документы', 'Belgeler'], ['Банковская карта', 'Banka kartı'], ['Заблокировать', 'Bloke etmek'], ['Бюро находок', 'Kayıp eşya bürosu']]],
  ['police_report', 'B1', '👮', 'Polise Kayıp Başvurusu', 'Tutanak, tanık, pasaport ve eşya tarifi', 'в полиции', 'poliste', ['Başvuran', 'Polis'], [['Заявление в полицию', 'Polise dilekçe'], ['Паспорт', 'Pasaport'], ['Свидетель', 'Tanık'], ['Описание', 'Tarif / açıklama'], ['Украли', 'Çalındı'], ['Протокол', 'Tutanak']]],
  ['city_office', 'B1', '🏛️', 'Belediye ve Resmî İşlem', 'Belge, form, gişe ve mühür kelimeleri', 'в мэрии', 'belediyede', ['Vatandaş', 'Memur'], [['Мэрия', 'Belediye'], ['Очередь', 'Sıra'], ['Справка', 'Resmî yazı'], ['Бланк', 'Form'], ['Окно приёма', 'Başvuru gişesi'], ['Печать', 'Mühür']]],
  ['library_membership', 'B1', '📚', 'Kütüphane Üyeliği', 'Okur kartı, katalog, kitap iadesi ve süre uzatma', 'в библиотеке', 'kütüphanede', ['Okur', 'Kütüphaneci'], [['Библиотека', 'Kütüphane'], ['Читательский билет', 'Okur kartı'], ['Каталог', 'Katalog'], ['Вернуть книгу', 'Kitap iade etmek'], ['Продлить', 'Süre uzatmak'], ['Тихий зал', 'Sessiz salon']]],
  ['book_club', 'B1', '📖', 'Kitap Kulübü Sohbeti', 'Bölüm, yazar, izlenim ve tavsiye konuşmaları', 'в книжном клубе', 'kitap kulübünde', ['Okur 1', 'Okur 2'], [['Книжный клуб', 'Kitap kulübü'], ['Глава', 'Bölüm'], ['Обсуждение', 'Tartışma'], ['Автор', 'Yazar'], ['Впечатление', 'İzlenim'], ['Рекомендация', 'Tavsiye']]],
  ['cinema_ticket', 'B1', '🎬', 'Sinema Bileti', 'Seans, koltuk, altyazı ve geç kalma ifadeleri', 'в кинотеатре', 'sinemada', ['Müşteri', 'Gişe Görevlisi'], [['Кинотеатр', 'Sinema'], ['Сеанс', 'Seans'], ['Места', 'Koltuklar'], ['Попкорн', 'Patlamış mısır'], ['Субтитры', 'Altyazılar'], ['Опоздать', 'Geç kalmak']]],
  ['theater_cloakroom', 'B1', '🎭', 'Tiyatro ve Vestiyer', 'Vestiyer, dürbün, ara ve alkış kelimeleri', 'в театре', 'tiyatroda', ['Seyirci', 'Görevli'], [['Театр', 'Tiyatro'], ['Гардероб', 'Vestiyer'], ['Бинокль', 'Dürbün'], ['Антракт', 'Ara'], ['Программа', 'Program broşürü'], ['Аплодисменты', 'Alkış']]],
  ['museum_audio_guide', 'B1', '🏛️', 'Müze ve Sesli Rehber', 'Sergi, eser, rehber ve bilet kelimeleri', 'в музее', 'müzede', ['Ziyaretçi', 'Rehber'], [['Музей', 'Müze'], ['Аудиогид', 'Sesli rehber'], ['Экспонат', 'Sergi eseri'], ['Выставка', 'Sergi'], ['Билет', 'Bilet'], ['Экскурсовод', 'Tur rehberi']]],
  ['beach_day', 'B1', '🏖️', 'Plaj Günü', 'Mayo, güneş kremi, şemsiye ve dalga kelimeleri', 'на пляже', 'plajda', ['Arkadaş 1', 'Arkadaş 2'], [['Пляж', 'Plaj'], ['Купальник', 'Mayo'], ['Солнцезащитный крем', 'Güneş kremi'], ['Зонт', 'Şemsiye'], ['Волны', 'Dalgalar'], ['Полотенце', 'Havlu']]],
  ['swimming_pool', 'B1', '🏊', 'Yüzme Havuzu', 'Bone, kulvar, duş, cankurtaran ve üyelik', 'в бассейне', 'havuzda', ['Üye', 'Cankurtaran'], [['Бассейн', 'Havuz'], ['Шапочка', 'Bone'], ['Дорожка', 'Kulvar'], ['Душ', 'Duş'], ['Абонемент', 'Üyelik'], ['Спасатель', 'Cankurtaran']]],
  ['hiking_day', 'B1', '🥾', 'Doğa Yürüyüşü', 'Patika, sırt çantası, harita ve gün batmadan dönme', 'в походе', 'doğa yürüyüşünde', ['Gezgin', 'Arkadaş'], [['Поход', 'Yürüyüş / doğa gezisi'], ['Тропа', 'Patika'], ['Рюкзак', 'Sırt çantası'], ['Карта', 'Harita'], ['Родник', 'Su kaynağı'], ['Вернуться засветло', 'Hava kararmadan dönmek']]],
  ['camping', 'B1', '⛺', 'Kamp Gecesi', 'Çadır, uyku tulumu, kamp ateşi ve fener', 'в кемпинге', 'kampta', ['Kampçı 1', 'Kampçı 2'], [['Палатка', 'Çadır'], ['Спальник', 'Uyku tulumu'], ['Костёр', 'Kamp ateşi'], ['Фонарик', 'Fener'], ['Репеллент', 'Sinek kovucu'], ['Утренний туман', 'Sabah sisi']]],
  ['gardening', 'B1', '🌱', 'Bahçe İşleri', 'Tohum, fide, yabani ot ve hasat kelimeleri', 'в саду', 'bahçede', ['Komşu', 'Bahçıvan'], [['Сад', 'Bahçe'], ['Лейка', 'Sulama kabı'], ['Семена', 'Tohumlar'], ['Рассада', 'Fide'], ['Сорняк', 'Yabani ot'], ['Урожай', 'Hasat']]],
  ['farmers_market', 'B1', '🥬', 'Semt Pazarı ve Üretici Tezgâhı', 'Ev yapımı peynir, bal, tartı ve pazarlık', 'на фермерском рынке', 'üretici pazarında', ['Müşteri', 'Satıcı'], [['Фермерский рынок', 'Üretici pazarı'], ['Домашний сыр', 'Ev yapımı peynir'], ['Мёд', 'Bal'], ['Торговаться', 'Pazarlık etmek'], ['Весы', 'Terazi'], ['Свежий урожай', 'Taze hasat']]],
  ['houseplants', 'B1', '🪴', 'Ev Bitkileri', 'Saksı, sulama, yaprak ve güneşli yer', 'у комнатных растений', 'ev bitkilerinin yanında', ['Bitki Sahibi', 'Arkadaş'], [['Комнатное растение', 'Ev bitkisi'], ['Горшок', 'Saksı'], ['Поливать', 'Sulamak'], ['Пересадить', 'Saksı değiştirmek'], ['Листья', 'Yapraklar'], ['Солнечное место', 'Güneşli yer']]],
  ['pet_care', 'B1', '🐶', 'Evcil Hayvan Bakımı', 'Mama kabı, tüy tarama, oyuncak ve veteriner', 'дома с питомцем', 'evde evcil hayvanla', ['Hayvan Sahibi', 'Arkadaş'], [['Домашний питомец', 'Evcil hayvan'], ['Лоток', 'Kum kabı'], ['Миска', 'Mama kabı'], ['Чесать шерсть', 'Tüy taramak'], ['Игрушка', 'Oyuncak'], ['Ветеринар', 'Veteriner']]],
  ['playground', 'B1', '🛝', 'Çocuk Parkı', 'Salıncak, kaydırak, kum havuzu ve çocuğu izleme', 'на детской площадке', 'çocuk parkında', ['Veli', 'Çocuk'], [['Детская площадка', 'Çocuk parkı'], ['Качели', 'Salıncak'], ['Горка', 'Kaydırak'], ['Песочница', 'Kum havuzu'], ['Очередь', 'Sıra'], ['Следить за ребёнком', 'Çocuğu izlemek']]],
  ['daycare', 'B1', '🧸', 'Kreş ve Anaokulu', 'Öğretmen, yedek kıyafet, uyku saati ve veli grubu', 'в детском саду', 'kreşte', ['Veli', 'Öğretmen'], [['Детский сад', 'Anaokulu / kreş'], ['Воспитатель', 'Öğretmen / bakıcı'], ['Сменная одежда', 'Yedek kıyafet'], ['Тихий час', 'Uyku saati'], ['Забрать вовремя', 'Zamanında almak'], ['Родительский чат', 'Veli grubu']]],
  ['baby_needs', 'B1', '🍼', 'Bebek İhtiyaçları', 'Bebek arabası, bez, biberon ve bebek püresi', 'с малышом', 'bebekle dışarıda', ['Anne', 'Baba'], [['Коляска', 'Bebek arabası'], ['Подгузник', 'Bebek bezi'], ['Бутылочка', 'Biberon'], ['Салфетки', 'Islak mendil'], ['Детское пюре', 'Bebek püresi'], ['Укачать', 'Sallayarak uyutmak']]],
  ['elderly_care', 'B1', '👵', 'Yaşlı Yakınına Yardım', 'İlaç, tansiyon, yürüyüş ve sabır kelimeleri', 'у пожилого родственника', 'yaşlı akrabanın yanında', ['Torun', 'Dede'], [['Пожилой человек', 'Yaşlı kişi'], ['Лекарства', 'İlaçlar'], ['Давление', 'Tansiyon'], ['Прогулка', 'Yürüyüş'], ['Помочь подняться', 'Kalkmasına yardım etmek'], ['Терпение', 'Sabır']]],
  ['leftovers_mealprep', 'B1', '🥡', 'Artan Yemek ve Meal Prep', 'Kalan yemekleri saklama, ısıtma ve haftalık plan', 'на кухне вечером', 'akşam mutfakta', ['Ev Arkadaşı', 'Kişi'], [['Остатки еды', 'Artan yemekler'], ['Контейнер', 'Saklama kabı'], ['Разогреть', 'Isıtmak'], ['Заморозить', 'Dondurmak'], ['План питания', 'Yemek planı'], ['Не выбрасывать', 'Çöpe atmamak']]],
  ['remote_work', 'B2', '💻', 'Evden Çalışma Düzeni', 'Çalışma köşesi, online toplantı, kamera ve mola', 'на удалённой работе', 'evden çalışırken', ['Çalışan', 'Ekip Arkadaşı'], [['Удалённая работа', 'Uzaktan çalışma'], ['Рабочее место', 'Çalışma alanı'], ['Созвон', 'Online görüşme'], ['Камера', 'Kamera'], ['Фон', 'Arka plan'], ['Перерыв', 'Mola']]],
  ['video_meeting', 'B2', '🎥', 'Video Toplantı Sorunları', 'Mikrofon, ekran paylaşımı, gündem ve kayıt', 'на видеовстрече', 'video toplantıda', ['Sunucu', 'Katılımcı'], [['Видеовстреча', 'Video toplantı'], ['Микрофон', 'Mikrofon'], ['Демонстрация экрана', 'Ekran paylaşımı'], ['Повестка', 'Gündem'], ['Запись встречи', 'Toplantı kaydı'], ['Техническая пауза', 'Teknik ara']]],
  ['online_shopping', 'B2', '🛍️', 'Online Alışveriş', 'Sepet, indirim kodu, kargo takibi ve yorum', 'в интернет-магазине', 'online mağazada', ['Müşteri', 'Destek'], [['Онлайн-заказ', 'Online sipariş'], ['Корзина', 'Sepet'], ['Промокод', 'Promosyon kodu'], ['Доставка', 'Teslimat'], ['Отследить', 'Takip etmek'], ['Отзыв', 'Yorum']]],
  ['food_delivery_app', 'B2', '🍔', 'Yemek Teslimat Uygulaması', 'Kurye takibi, teslim süresi, not ve puanlama', 'в приложении доставки', 'teslimat uygulamasında', ['Müşteri', 'Kurye'], [['Доставка еды', 'Yemek teslimatı'], ['Курьер на карте', 'Haritadaki kurye'], ['Время прибытия', 'Varış zamanı'], ['Комментарий к заказу', 'Sipariş notu'], ['Бесконтактно', 'Temassız'], ['Оценить заказ', 'Siparişi puanlamak']]],
  ['store_complaint', 'B2', '🧑‍💼', 'Mağazada Şikâyet', 'Ayıplı ürün, değişim, garanti ve yazılı cevap', 'в магазине после покупки', 'alışveriş sonrası mağazada', ['Müşteri', 'Müdür'], [['Жалоба в магазин', 'Mağazaya şikâyet'], ['Брак', 'Ayıp / kusur'], ['Обмен', 'Değişim'], ['Гарантийный срок', 'Garanti süresi'], ['Менеджер', 'Müdür'], ['Письменный ответ', 'Yazılı cevap']]],
  ['monthly_budget', 'B2', '📊', 'Aylık Bütçe Planı', 'Gelir, gider, birikim ve harcama sınırı', 'за семейным бюджетом', 'aile bütçesi yaparken', ['Eş 1', 'Eş 2'], [['Семейный бюджет', 'Aile bütçesi'], ['Доход', 'Gelir'], ['Расход', 'Gider'], ['Накопления', 'Birikim'], ['Лимит', 'Limit'], ['Финансовая привычка', 'Finansal alışkanlık']]],
  ['saving_goal', 'B2', '🎯', 'Birikim Hedefi', 'Hedef koyma, para ayırma ve beklenmedik giderler', 'при планировании накоплений', 'birikim planlarken', ['Kişi', 'Arkadaş'], [['Цель накоплений', 'Birikim hedefi'], ['Откладывать', 'Para ayırmak'], ['Копилка', 'Kumbara'], ['Процент', 'Yüzde'], ['Непредвиденные расходы', 'Beklenmedik giderler'], ['Мотивация', 'Motivasyon']]],
  ['payday', 'B2', '💵', 'Maaş Günü Planı', 'Avans, prim, bordro, vergi ve harcama planı', 'в день зарплаты', 'maaş gününde', ['Çalışan', 'Arkadaş'], [['День зарплаты', 'Maaş günü'], ['Аванс', 'Avans'], ['Премия', 'Prim'], ['Расчётный лист', 'Bordro'], ['Налоги', 'Vergiler'], ['Планировать траты', 'Harcamaları planlamak']]],
  ['insurance_claim', 'B2', '🛡️', 'Sigorta Başvurusu', 'Hasar, poliçe, değerlendirme ve ödeme süreci', 'в страховой компании', 'sigorta şirketinde', ['Müşteri', 'Uzman'], [['Страховой случай', 'Sigorta olayı'], ['Полис', 'Poliçe'], ['Ущерб', 'Hasar'], ['Оценка', 'Değerlendirme'], ['Заявка', 'Başvuru'], ['Выплата', 'Ödeme']]],
  ['volunteering', 'B2', '🤲', 'Gönüllülük ve Yardım', 'Eşya toplama, koordinatör, topluluk ve ücretsiz yardım', 'на волонтёрской встрече', 'gönüllü buluşmasında', ['Gönüllü', 'Koordinatör'], [['Волонтёрство', 'Gönüllülük'], ['Благотворительность', 'Hayır işi'], ['Сбор вещей', 'Eşya toplama'], ['Координатор', 'Koordinatör'], ['Помочь бесплатно', 'Ücretsiz yardım etmek'], ['Сообщество', 'Topluluk']]],
  ['social_media_etiquette', 'B2', '📲', 'Sosyal Medya Nezaketi', 'Özel mesaj, yorum, paylaşım ve dijital kibarlık', 'в социальных сетях', 'sosyal medyada', ['Kullanıcı 1', 'Kullanıcı 2'], [['Социальные сети', 'Sosyal medya'], ['Личное сообщение', 'Özel mesaj'], ['Публичный пост', 'Herkese açık paylaşım'], ['Комментарий', 'Yorum'], ['Репост', 'Yeniden paylaşım'], ['Цифровая вежливость', 'Dijital nezaket']]],
  ['dating_app', 'B2', '💞', 'Tanışma Uygulaması', 'Profil, eşleşme, ilk mesaj ve güvenli buluşma', 'в приложении знакомств', 'tanışma uygulamasında', ['Kişi A', 'Kişi B'], [['Приложение знакомств', 'Tanışma uygulaması'], ['Анкета', 'Profil formu'], ['Совпадение', 'Eşleşme'], ['Первое сообщение', 'İlk mesaj'], ['Безопасная встреча', 'Güvenli buluşma'], ['Отказать вежливо', 'Kibarca reddetmek']]],
  ['house_party', 'B2', '🎉', 'Ev Partisi Planı', 'Atıştırmalık, müzik listesi, alt komşu ve temizlik', 'на домашней вечеринке', 'ev partisinde', ['Ev Sahibi', 'Arkadaş'], [['Домашняя вечеринка', 'Ev partisi'], ['Закуски', 'Atıştırmalıklar'], ['Плейлист', 'Çalma listesi'], ['Соседи снизу', 'Alt kattaki komşular'], ['Убрать после гостей', 'Misafirlerden sonra toplamak'], ['Договориться о тишине', 'Sessizlik konusunda anlaşmak']]],
  ['board_game_night', 'B2', '🎲', 'Kutu Oyunu Gecesi', 'Kurallar, zar, piyon, sıra ve tartışmalı durum', 'за настольной игрой', 'kutu oyunu başında', ['Oyuncu 1', 'Oyuncu 2'], [['Настольная игра', 'Kutu oyunu'], ['Правила', 'Kurallar'], ['Кубик', 'Zar'], ['Фишка', 'Piyon'], ['Ход', 'Hamle / sıra'], ['Спорный момент', 'Tartışmalı an']]],
  ['minor_traffic_accident', 'B2', '🚘', 'Küçük Trafik Kazası', 'Çizik, kaza tutanağı, fotoğraf ve sigorta', 'после небольшого ДТП', 'küçük kazadan sonra', ['Sürücü 1', 'Sürücü 2'], [['Небольшое ДТП', 'Küçük trafik kazası'], ['Царапина', 'Çizik'], ['Европротокол', 'Basit kaza tutanağı'], ['Фото повреждений', 'Hasar fotoğrafı'], ['Страховая', 'Sigorta şirketi'], ['Не спорить', 'Tartışmamak']]],
  ['emergency_pharmacy_night', 'C1/C2', '🌙', 'Gece Nöbetçi Eczane', 'Acil ilaç, muadil, talimat ve yan etki dili', 'в дежурной аптеке', 'nöbetçi eczanede', ['Müşteri', 'Eczacı'], [['Дежурная аптека', 'Nöbetçi eczane'], ['Ночной режим', 'Gece çalışma düzeni'], ['Срочное лекарство', 'Acil ilaç'], ['Аналог препарата', 'İlacın muadili'], ['Инструкция', 'Kullanım talimatı'], ['Побочная реакция', 'Yan etki']]],
  ['power_outage', 'C1/C2', '🕯️', 'Elektrik Kesintisi', 'Arıza servisi, powerbank, buzdolabı ve planlı kesinti', 'при отключении электричества', 'elektrik kesintisinde', ['Komşu', 'Apartman Görevlisi'], [['Отключение электричества', 'Elektrik kesintisi'], ['Аварийная служба', 'Arıza servisi'], ['Свеча', 'Mum'], ['Пауэрбанк', 'Powerbank'], ['Холодильник', 'Buzdolabı'], ['Плановое отключение', 'Planlı kesinti']]],
  ['water_cut', 'C1/C2', '🚰', 'Su Kesintisi ve Apartman Duyurusu', 'Su stoğu, yönetim şirketi, tesisatçı ve duyuru', 'при отключении воды', 'su kesintisinde', ['Kiracı', 'Yönetici'], [['Отключение воды', 'Su kesintisi'], ['Запас воды', 'Su stoğu'], ['Управляющая компания', 'Apartman yönetim şirketi'], ['Сантехник', 'Tesisatçı'], ['Горячая линия', 'Destek hattı'], ['Объявление в подъезде', 'Apartman duyurusu']]],
  ['travel_packing', 'C1/C2', '🧳', 'Seyahat Valizi Hazırlama', 'Eşya listesi, el bagajı, ilaç çantası ve fazla bagaj', 'перед поездкой', 'seyahat öncesinde', ['Yolcu', 'Arkadaş'], [['Список вещей', 'Eşya listesi'], ['Ручная кладь', 'El bagajı'], ['Зарядные устройства', 'Şarj cihazları'], ['Аптечка', 'İlk yardım/ilaç çantası'], ['Перевес багажа', 'Fazla bagaj'], ['Документы под рукой', 'Belgeler el altında']]],
  ['hotel_checkin_security', 'C1/C2', '🏨', 'Otel Girişi ve Güvenli Check-in', 'Resepsiyon, depozito, kart anahtar ve geç çıkış', 'на стойке регистрации', 'otel resepsiyonunda', ['Misafir', 'Resepsiyonist'], [['Заселение в отель', 'Otele giriş'], ['Стойка регистрации', 'Resepsiyon'], ['Депозит', 'Depozito'], ['Карта-ключ', 'Kart anahtar'], ['Поздний выезд', 'Geç çıkış'], ['Проверка паспорта', 'Pasaport kontrolü']]],
] as const satisfies readonly RawSpec[];

export function createDailyLife90(startUnitNumber: number): UnitModule[] {
  return DAILY_LIFE_SPECS.map((spec, index) => makeUnit(spec, index, startUnitNumber + index));
}
