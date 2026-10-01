import type { DialogueLine, UnitModule, WordDetail } from '../curriculumData';

type Level = UnitModule['levelGroup'];
type SentenceDrill = UnitModule['sentences'][number];
type Mode = 'service' | 'kitchen' | 'management';

type RawWord = {
  ru: string;
  tr: string;
  note?: string;
};

type RestaurantSpec = {
  id: string;
  level: Level;
  mode: Mode;
  title: string;
  description: string;
  grammarFocus: string;
  sceneTitle: string;
  sceneContext: string;
  icon: string;
  words: RawWord[];
};

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

const w = (ru: string, tr: string, note?: string): RawWord => ({ ru, tr, note });

function transliterate(text: string): string {
  return [...text].map((char) => {
    const lower = char.toLocaleLowerCase('ru');
    const mapped = RU_LATIN[lower];
    if (!mapped) return char;
    return char === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1);
  }).join('');
}

function tokenize(ru: string): string[] {
  return ru.split(/\s+/).map((x) => x.trim()).filter(Boolean);
}

function rotate<T>(items: T[], amount: number): T[] {
  if (items.length <= 1) return [...items];
  const n = ((amount % items.length) + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
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

function makeWords(spec: RestaurantSpec, unitIndex: number): WordDetail[] {
  return spec.words.map((item, wordIndex) => ({
    id: `rest50_${String(unitIndex + 1).padStart(2, '0')}_w${String(wordIndex + 1).padStart(2, '0')}`,
    ru: item.ru,
    reading: transliterate(item.ru),
    tr: item.tr,
    level: spec.level,
    usageNote: item.note ?? `${spec.title} ünitesinde garsonluk, aşçılık veya restoran servisi bağlamında kullanılır.`,
  }));
}

function makeSentences(spec: RestaurantSpec, offset: number): SentenceDrill[] {
  const [a, b, c, d] = spec.words;
  if (spec.mode === 'kitchen') {
    return [
      sentence(`Шеф проверяет ${a.ru} перед сменой.`, `Şef vardiya öncesi “${a.tr}” kontrol eder.`, offset + 1),
      sentence(`На кухне важно подготовить ${b.ru} заранее.`, `Mutfakta “${b.tr}” önceden hazırlamak önemlidir.`, offset + 2),
      sentence(`Повар объясняет, как использовать ${c.ru}.`, `Aşçı “${c.tr}” nasıl kullanılacağını açıklar.`, offset + 3),
      sentence(`Без порядка ${d.ru} быстро теряется.`, `Düzen olmazsa “${d.tr}” çabuk kaybolur.`, offset + 4),
    ];
  }
  if (spec.mode === 'management') {
    return [
      sentence(`Менеджер обсуждает ${a.ru} с командой.`, `Müdür ekiple “${a.tr}” konusunu görüşür.`, offset + 1),
      sentence(`Для сервиса нужен чёткий ${b.ru}.`, `Servis için net bir “${b.tr}” gerekir.`, offset + 2),
      sentence(`Команда заранее проверяет ${c.ru}.`, `Ekip “${c.tr}” konusunu önceden kontrol eder.`, offset + 3),
      sentence(`Хороший ресторан быстро замечает ${d.ru}.`, `İyi restoran “${d.tr}” durumunu hızlı fark eder.`, offset + 4),
    ];
  }
  return [
    sentence(`Гость спрашивает про ${a.ru}.`, `Misafir “${a.tr}” hakkında soru soruyor.`, offset + 1),
    sentence(`Официант предлагает ${b.ru} к заказу.`, `Garson siparişe “${b.tr}” öneriyor.`, offset + 2),
    sentence(`В меню сегодня есть ${c.ru}.`, `Menüde bugün “${c.tr}” var.`, offset + 3),
    sentence(`К столу принесли ${d.ru}.`, `Masaya “${d.tr}” getirildi.`, offset + 4),
  ];
}

function makeDialogue(spec: RestaurantSpec, offset: number): DialogueLine[] {
  const [a, b, c, d, e] = rotate(spec.words, offset % spec.words.length);
  if (spec.mode === 'kitchen') {
    const lines = [
      { speaker: 'Şef', ru: `Сегодня работаем аккуратно: сначала ${a.ru}.`, tr: `Bugün dikkatli çalışıyoruz: önce “${a.tr}”.` },
      { speaker: 'Aşçı', ru: `Понял. Потом подготовлю ${b.ru} и ${c.ru}.`, tr: `Anladım. Sonra “${b.tr}” ve “${c.tr}” hazırlayacağım.` },
      { speaker: 'Şef', ru: `Проверь ${d.ru}, гости уже ждут.`, tr: `“${d.tr}” kontrol et, misafirler bekliyor.` },
      { speaker: 'Aşçı', ru: `Готово. Осталось только ${e.ru}.`, tr: `Hazır. Sadece “${e.tr}” kaldı.` },
    ];
    return lines.map((line) => ({ ...line, reading: transliterate(line.ru) }));
  }
  if (spec.mode === 'management') {
    const lines = [
      { speaker: 'Müdür', ru: `Перед открытием проверяем ${a.ru}.`, tr: `Açılıştan önce “${a.tr}” kontrol ediyoruz.` },
      { speaker: 'Kaptan Garson', ru: `Я уже отметил ${b.ru} и ${c.ru}.`, tr: `“${b.tr}” ve “${c.tr}” konularını işaretledim.` },
      { speaker: 'Müdür', ru: `Если появится ${d.ru}, говорим спокойно.`, tr: `“${d.tr}” ortaya çıkarsa sakin konuşuyoruz.` },
      { speaker: 'Kaptan Garson', ru: `Хорошо, команда помнит про ${e.ru}.`, tr: `Tamam, ekip “${e.tr}” konusunu hatırlıyor.` },
    ];
    return lines.map((line) => ({ ...line, reading: transliterate(line.ru) }));
  }
  const lines = [
    { speaker: 'Garson', ru: `Добрый вечер! Хотите посмотреть ${a.ru}?`, tr: `İyi akşamlar! “${a.tr}” bakmak ister misiniz?` },
    { speaker: 'Misafir', ru: `Да, и расскажите, пожалуйста, про ${b.ru}.`, tr: `Evet, ayrıca “${b.tr}” hakkında bilgi verir misiniz?` },
    { speaker: 'Garson', ru: `Конечно. К этому хорошо подходит ${c.ru}.`, tr: `Elbette. Bunun yanına “${c.tr}” iyi gider.` },
    { speaker: 'Misafir', ru: `Отлично. Тогда добавьте ${d.ru} и ${e.ru}.`, tr: `Harika. O zaman “${d.tr}” ve “${e.tr}” ekleyin.` },
  ];
  return lines.map((line) => ({ ...line, reading: transliterate(line.ru) }));
}

function makeUnit(spec: RestaurantSpec, index: number, unitNumber: number): UnitModule {
  return {
    id: `restaurant_service_50_${String(index + 1).padStart(2, '0')}_${spec.id}`,
    unitNumber,
    levelGroup: spec.level,
    title: spec.title,
    description: spec.description,
    category: 'Aşçılık • Garsonluk • Lokanta Servisi',
    color: COLORS[spec.level],
    icon: spec.icon,
    grammarExplain: `📌 RESTORAN DİLİ ODAĞI:\n1. ${spec.grammarFocus}\n2. Kelimeleri yalnız ezberleme; garson-misafir, şef-aşçı veya müdür-ekip diyaloğunda kullan.\n3. Her cümlede sipariş, hazırlık, servis hızı ve nezaket bağlamını fark et.`,
    words: makeWords(spec, index),
    sentences: makeSentences(spec, index),
    sceneTitle: spec.sceneTitle,
    sceneContext: spec.sceneContext,
    dialogue: makeDialogue(spec, index),
  };
}

const RESTAURANT_SPECS: RestaurantSpec[] = [
  {
    id: 'restaurant_roles', level: 'A2', mode: 'service', icon: '🍽️',
    title: 'Restoran Ekibi ve Görevler',
    description: 'Garson, komi, aşçı, şef ve müdür rollerini ayırt etme',
    grammarFocus: 'Kim ne yapar sorularında meslek adları ve basit geniş zaman kullanılır.',
    sceneTitle: 'Vardiya Öncesi Tanışma',
    sceneContext: 'Yeni çalışan ekip üyelerini ve görevlerini öğrenir.',
    words: [w('Официант', 'Garson'), w('Повар', 'Aşçı'), w('Шеф-повар', 'Baş aşçı / şef'), w('Бармен', 'Barmen'), w('Хостес', 'Karşılama görevlisi'), w('Менеджер зала', 'Salon müdürü'), w('Помощник официанта', 'Komi'), w('Кассир', 'Kasiyer')],
  },
  {
    id: 'guest_greeting', level: 'A2', mode: 'service', icon: '🙋',
    title: 'Misafiri Karşılama',
    description: 'Kapıda karşılama, masa sorma ve nazik yönlendirme kalıpları',
    grammarFocus: 'Nazik soru kalıpları: «Хотите...?», «Можно...?», «Проходите, пожалуйста».',
    sceneTitle: 'Kapıda İlk Temas',
    sceneContext: 'Garson misafiri kapıda karşılar ve masaya yönlendirir.',
    words: [w('Добро пожаловать', 'Hoş geldiniz'), w('Столик на двоих', 'İki kişilik masa'), w('У окна', 'Pencere kenarında'), w('Проходите', 'Buyurun geçin'), w('Свободно', 'Boş / müsait'), w('Бронирование', 'Rezervasyon'), w('Подождите минуту', 'Bir dakika bekleyin'), w('Ваш столик готов', 'Masanız hazır')],
  },
  {
    id: 'reservation_calls', level: 'A2', mode: 'service', icon: '📞',
    title: 'Telefonla Rezervasyon Alma',
    description: 'Saat, kişi sayısı, isim ve telefon bilgisini alma',
    grammarFocus: 'Saat ve sayı ifadeleri rezervasyon konuşmalarında net tekrar edilir.',
    sceneTitle: 'Rezervasyon Telefonu',
    sceneContext: 'Restoran telefonu çalar; görevli bilgileri doğru kaydeder.',
    words: [w('Забронировать столик', 'Masa ayırtmak'), w('На какое время?', 'Saat kaça?'), w('На сколько человек?', 'Kaç kişi için?'), w('Ваше имя?', 'Adınız?'), w('Номер телефона', 'Telefon numarası'), w('Подтвердить бронь', 'Rezervasyonu onaylamak'), w('Отменить бронь', 'Rezervasyonu iptal etmek'), w('Опоздать на десять минут', 'On dakika gecikmek')],
  },
  {
    id: 'table_setting', level: 'A2', mode: 'service', icon: '🍴',
    title: 'Masa Düzeni ve Kuver',
    description: 'Çatal, bıçak, tabak ve bardak yerleşimi',
    grammarFocus: 'Yer bildiren ifadeler: «справа», «слева», «рядом с...» servis düzeninde sık geçer.',
    sceneTitle: 'Servis Öncesi Masa Kontrolü',
    sceneContext: 'Garson açılıştan önce masaları standart düzene getirir.',
    words: [w('Приборы', 'Çatal-bıçak takımı'), w('Вилка', 'Çatal'), w('Нож', 'Bıçak'), w('Ложка', 'Kaşık'), w('Тарелка', 'Tabak'), w('Бокал', 'Kadeh'), w('Салфетка', 'Peçete'), w('Скатерть', 'Masa örtüsü')],
  },
  {
    id: 'menu_sections', level: 'A2', mode: 'service', icon: '📋',
    title: 'Menü Bölümleri',
    description: 'Başlangıç, ana yemek, tatlı ve içecek kategorileri',
    grammarFocus: '«У нас есть...» kalıbı menüdeki seçenekleri anlatmak için kullanılır.',
    sceneTitle: 'Menüyü Tanıtma',
    sceneContext: 'Garson misafire menünün bölümlerini kısaca açıklar.',
    words: [w('Закуски', 'Başlangıçlar'), w('Салаты', 'Salatalar'), w('Супы', 'Çorbalar'), w('Горячие блюда', 'Sıcak ana yemekler'), w('Гарниры', 'Garnitürler'), w('Десерты', 'Tatlılar'), w('Напитки', 'İçecekler'), w('Детское меню', 'Çocuk menüsü')],
  },
  {
    id: 'taking_order', level: 'A2', mode: 'service', icon: '📝',
    title: 'Sipariş Alma Kalıpları',
    description: 'Hazır mısınız, ne alırsınız, tekrar edeyim mi gibi temel servis cümleleri',
    grammarFocus: 'Nazik emir ve soru kalıpları: «скажите», «повторить?», «что будете?».',
    sceneTitle: 'İlk Sipariş',
    sceneContext: 'Garson siparişi acele ettirmeden alır ve tekrar eder.',
    words: [w('Вы готовы заказать?', 'Siparişe hazır mısınız?'), w('Что будете?', 'Ne alırsınız?'), w('Повторить заказ?', 'Siparişi tekrar edeyim mi?'), w('Без лука', 'Soğansız'), w('Соус отдельно', 'Sos ayrı'), w('Средняя прожарка', 'Orta pişmiş'), w('Добавить гарнир', 'Garnitür eklemek'), w('Сразу или позже?', 'Hemen mi sonra mı?')],
  },
  {
    id: 'water_drinks', level: 'A2', mode: 'service', icon: '🥤',
    title: 'Su ve İçecek Servisi',
    description: 'Su, meyve suyu, gazlı içecek ve buz isteme konuşmaları',
    grammarFocus: '«с» ve «без» yapıları içecek isteklerinde çok kullanılır.',
    sceneTitle: 'İçecek Siparişi',
    sceneContext: 'Misafir yemek öncesi içecek seçer.',
    words: [w('Минеральная вода', 'Maden suyu'), w('Без газа', 'Gazsız'), w('Со льдом', 'Buzlu'), w('Без льда', 'Buzsuz'), w('Свежевыжатый сок', 'Taze sıkılmış meyve suyu'), w('Газированный напиток', 'Gazlı içecek'), w('Графин воды', 'Sürahi su'), w('Ломтик лимона', 'Limon dilimi')],
  },
  {
    id: 'coffee_tea_service', level: 'A2', mode: 'service', icon: '☕',
    title: 'Kahve ve Çay Servisi',
    description: 'Kahve çeşitleri, demleme ve şeker-süt tercihleri',
    grammarFocus: 'Tercih bildirirken «мне, пожалуйста...» ve «можно без...» kalıpları kullanılır.',
    sceneTitle: 'Kafe Köşesinde Sipariş',
    sceneContext: 'Garson sıcak içecek seçeneklerini açıklar.',
    words: [w('Эспрессо', 'Espresso'), w('Американо', 'Americano'), w('Капучино', 'Cappuccino'), w('Чёрный чай', 'Siyah çay'), w('Зелёный чай', 'Yeşil çay'), w('Молоко отдельно', 'Süt ayrı'), w('Сахарница', 'Şekerlik'), w('Заварить чай', 'Çay demlemek')],
  },
  {
    id: 'breakfast_service', level: 'A2', mode: 'service', icon: '🍳',
    title: 'Kahvaltı Servisi',
    description: 'Yumurta, peynir, reçel, ekmek ve kahvaltı saati konuşmaları',
    grammarFocus: 'Zaman ifadeleri ve «ещё» kelimesi kahvaltı servisinde sık tekrar edilir.',
    sceneTitle: 'Sabah Kahvaltısı',
    sceneContext: 'Otelde veya lokantada kahvaltı tabağı hazırlanır.',
    words: [w('Завтрак включён', 'Kahvaltı dahil'), w('Яичница', 'Sahanda yumurta'), w('Омлет', 'Omlet'), w('Сырная тарелка', 'Peynir tabağı'), w('Варенье', 'Reçel'), w('Тост', 'Tost'), w('Свежий хлеб', 'Taze ekmek'), w('До десяти утра', 'Sabah ona kadar')],
  },
  {
    id: 'soup_service', level: 'A2', mode: 'service', icon: '🥣',
    title: 'Çorba Servisi',
    description: 'Çorba türleri, sıcaklık ve yanında ekmek isteme',
    grammarFocus: 'Sıfatlar yemeği niteler: sıcak, yoğun, hafif, acı.',
    sceneTitle: 'Çorba Önerisi',
    sceneContext: 'Garson günün çorbasını açıklar.',
    words: [w('Суп дня', 'Günün çorbası'), w('Куриный бульон', 'Tavuk suyu'), w('Грибной суп', 'Mantar çorbası'), w('Острый суп', 'Acı çorba'), w('Сухарики', 'Kruton'), w('Горячий', 'Sıcak'), w('Густой', 'Koyu / yoğun'), w('Половник', 'Kepçe')],
  },
  {
    id: 'salad_station', level: 'A2', mode: 'service', icon: '🥗',
    title: 'Salata ve Sos Seçenekleri',
    description: 'Salata malzemeleri, sosu ayrı isteme ve tazelik sözleri',
    grammarFocus: '«с чем?» sorusu sos ve malzeme belirtmede kullanılır.',
    sceneTitle: 'Salata Siparişi',
    sceneContext: 'Misafir hafif bir salata seçer ve sosu ayrı ister.',
    words: [w('Листья салата', 'Marul yaprakları'), w('Помидоры черри', 'Cherry domates'), w('Огурец', 'Salatalık'), w('Оливковое масло', 'Zeytinyağı'), w('Бальзамический уксус', 'Balzamik sirke'), w('Заправка отдельно', 'Sos ayrı'), w('Свежая зелень', 'Taze yeşillik'), w('Семечки', 'Çekirdekler / tohumlar')],
  },
  {
    id: 'main_course_explaining', level: 'A2', mode: 'service', icon: '🍛',
    title: 'Ana Yemek Anlatımı',
    description: 'Yemeğin içeriğini, porsiyonu ve yanında gelenleri açıklama',
    grammarFocus: '«подаётся с...» kalıbı bir yemeğin yanında ne geldiğini anlatır.',
    sceneTitle: 'Ana Yemek Tavsiyesi',
    sceneContext: 'Garson kararsız misafire ana yemekleri açıklar.',
    words: [w('Порция', 'Porsiyon'), w('Подаётся с рисом', 'Pilavla servis edilir'), w('Домашний соус', 'Ev yapımı sos'), w('Куриное филе', 'Tavuk fileto'), w('Говядина', 'Dana eti'), w('Запечённые овощи', 'Fırın sebzeler'), w('Блюдо дня', 'Günün yemeği'), w('Сытный', 'Doyurucu')],
  },
  {
    id: 'dessert_service', level: 'A2', mode: 'service', icon: '🍰',
    title: 'Tatlı Sunumu',
    description: 'Tatlı tepsisi, dondurma, meyve ve kahveyle önerme',
    grammarFocus: 'Öneri yaparken «советую» ve «попробуйте» kalıpları kullanılır.',
    sceneTitle: 'Yemek Sonrası Tatlı',
    sceneContext: 'Garson tatlıları masaya tanıtır.',
    words: [w('Десертная карта', 'Tatlı menüsü'), w('Медовик', 'Medovik pastası'), w('Чизкейк', 'Cheesecake'), w('Мороженое', 'Dondurma'), w('Фруктовая тарелка', 'Meyve tabağı'), w('Шоколадный соус', 'Çikolata sosu'), w('Сладкий', 'Tatlı'), w('Порекомендовать десерт', 'Tatlı önermek')],
  },
  {
    id: 'takeaway_counter', level: 'A2', mode: 'service', icon: '🥡',
    title: 'Paket Servis ve Al-Götür',
    description: 'Paket siparişi hazırlama, kapak, poşet ve bekleme süresi',
    grammarFocus: 'Gelecek zaman ve süre bildirme: «будет готово через...».',
    sceneTitle: 'Paket Tezgâhı',
    sceneContext: 'Müşteri siparişini paket yaptırır.',
    words: [w('Заказ навынос', 'Al-götür sipariş'), w('Контейнер', 'Paket kabı'), w('Крышка', 'Kapak'), w('Пакет', 'Poşet'), w('Приборы с собой', 'Paket çatal-bıçak'), w('Будет готово через десять минут', 'On dakikaya hazır olur'), w('Не пролить', 'Dökmemek'), w('Номер заказа', 'Sipariş numarası')],
  },
  {
    id: 'bill_payment', level: 'A2', mode: 'service', icon: '💳',
    title: 'Hesap ve Ödeme',
    description: 'Hesabı isteme, kart/nakit ödeme ve hesabı bölme',
    grammarFocus: 'Araç hâli ödeme biçiminde görünür: «картой», «наличными».',
    sceneTitle: 'Hesap Zamanı',
    sceneContext: 'Misafir hesabı ister ve ödeme yöntemini söyler.',
    words: [w('Принесите счёт', 'Hesabı getirin'), w('Оплата картой', 'Kartla ödeme'), w('Наличными', 'Nakit'), w('Разделить счёт', 'Hesabı bölmek'), w('Терминал', 'POS cihazı'), w('Сдача', 'Para üstü'), w('Чек', 'Fiş'), w('Подпись на чеке', 'Fişe imza')],
  },
  {
    id: 'tips_receipt', level: 'A2', mode: 'service', icon: '🧾',
    title: 'Bahşiş, Fiş ve Kapanış Sözü',
    description: 'Bahşiş sorma, fiş verme ve misafiri uğurlama ifadeleri',
    grammarFocus: 'Teşekkür ve vedalaşma kalıpları servis kapanışında nazik ton kurar.',
    sceneTitle: 'Servis Sonu',
    sceneContext: 'Garson ödeme sonrası masayı iyi dilekle kapatır.',
    words: [w('Чаевые', 'Bahşiş'), w('Включено в счёт', 'Hesaba dahil'), w('Оставить на столе', 'Masaya bırakmak'), w('Фискальный чек', 'Mali fiş'), w('Спасибо за визит', 'Ziyaretiniz için teşekkürler'), w('Приходите ещё', 'Yine bekleriz'), w('Хорошего вечера', 'İyi akşamlar'), w('До свидания', 'Hoşça kalın')],
  },
  {
    id: 'basic_complaints', level: 'A2', mode: 'service', icon: '🙏',
    title: 'Basit Şikâyetleri Dinleme',
    description: 'Soğuk yemek, geç servis, yanlış sipariş gibi durumlarda sakin cevap',
    grammarFocus: 'Özür kalıpları: «извините», «сейчас исправим», «я уточню».',
    sceneTitle: 'Yanlış Gelen Tabak',
    sceneContext: 'Garson hatayı kabul eder ve çözüm üretir.',
    words: [w('Извините за ожидание', 'Beklettiğimiz için özür dileriz'), w('Заказ перепутали', 'Sipariş karıştı'), w('Блюдо остыло', 'Yemek soğudu'), w('Сейчас заменим', 'Hemen değiştireceğiz'), w('Я уточню на кухне', 'Mutfakta soracağım'), w('Ошибка', 'Hata'), w('Компенсация', 'Telafi'), w('Спасибо за понимание', 'Anlayışınız için teşekkürler')],
  },
  {
    id: 'allergen_questions', level: 'A2', mode: 'service', icon: '⚠️',
    title: 'Alerjen Sorma ve Açıklama',
    description: 'Fıstık, gluten, süt ürünü ve yumurta alerjisi hakkında güvenli konuşma',
    grammarFocus: '«есть ли...?» sorusu içerik ve alerjen kontrolünde kullanılır.',
    sceneTitle: 'Alerji Kontrolü',
    sceneContext: 'Garson siparişi almadan önce alerjen bilgisini netleştirir.',
    words: [w('Аллергия', 'Alerji'), w('Орехи', 'Kuruyemiş'), w('Глютен', 'Gluten'), w('Молочные продукты', 'Süt ürünleri'), w('Яйцо', 'Yumurta'), w('Следы арахиса', 'Yer fıstığı izi'), w('Безопасно для вас?', 'Sizin için güvenli mi?'), w('Уточнить состав', 'İçeriği netleştirmek')],
  },
  {
    id: 'vegan_requests', level: 'A2', mode: 'service', icon: '🌱',
    title: 'Vejetaryen ve Vegan İstekler',
    description: 'Et, süt ürünü ve yumurta içermeyen seçenekleri açıklama',
    grammarFocus: '«без + genitif» yapısı yemekte olmayan malzemeyi belirtir.',
    sceneTitle: 'Bitkisel Menü Sorusu',
    sceneContext: 'Misafir vegan seçenekleri sorar.',
    words: [w('Вегетарианское блюдо', 'Vejetaryen yemek'), w('Веганский вариант', 'Vegan seçenek'), w('Без мяса', 'Etsiz'), w('Без молока', 'Sütsüz'), w('Растительное масло', 'Bitkisel yağ'), w('Овощной бульон', 'Sebze suyu'), w('Тофу', 'Tofu'), w('Спросить у шефа', 'Şefe sormak')],
  },
  {
    id: 'families_children', level: 'A2', mode: 'service', icon: '🧒',
    title: 'Çocuklu Misafirlere Servis',
    description: 'Mama sandalyesi, çocuk menüsü ve küçük porsiyon konuşmaları',
    grammarFocus: 'Küçültme ve nezaket ifadeleri çocuklu masada sıcak ton kurar.',
    sceneTitle: 'Aile Masası',
    sceneContext: 'Garson çocuklu aileye uygun seçenekleri sunar.',
    words: [w('Детский стул', 'Mama sandalyesi'), w('Маленькая порция', 'Küçük porsiyon'), w('Не острое', 'Acısız'), w('Соломинка', 'Pipet'), w('Пластиковый стакан', 'Plastik bardak'), w('Детская ложка', 'Çocuk kaşığı'), w('Раскраска', 'Boyama kâğıdı'), w('Подогреть пюре', 'Püreyi ısıtmak')],
  },
  {
    id: 'mise_en_place', level: 'B1', mode: 'kitchen', icon: '🔪',
    title: 'Mutfakta Mise en Place',
    description: 'Servis öncesi hazırlık, kaplar, ölçüler ve istasyon düzeni',
    grammarFocus: 'Hazırlık adımlarında önce-sonra bağlaçları ve edilgen anlamlı kalıplar kullanılır.',
    sceneTitle: 'Servis Öncesi Hazırlık',
    sceneContext: 'Aşçılar servis başlamadan tüm istasyonları hazırlar.',
    words: [w('Заготовки', 'Ön hazırlıklar'), w('Рабочая станция', 'Çalışma istasyonu'), w('Маркировка', 'Etiketleme'), w('Порционные контейнеры', 'Porsiyon kapları'), w('Весы', 'Terazi'), w('Мерный стакан', 'Ölçü bardağı'), w('Чистая доска', 'Temiz kesme tahtası'), w('Список подготовки', 'Hazırlık listesi')],
  },
  {
    id: 'knife_cuts', level: 'B1', mode: 'kitchen', icon: '🥕',
    title: 'Doğrama Teknikleri',
    description: 'Küp, jülyen, dilim ve ince kıyım gibi mutfak kesimleri',
    grammarFocus: 'Fiil mastarları ve sonuç bildiren zarflar teknik anlatımda kullanılır.',
    sceneTitle: 'Kesim Tahtasında Eğitim',
    sceneContext: 'Şef yeni aşçıya doğru kesim ölçülerini gösterir.',
    words: [w('Нарезать кубиками', 'Küp doğramak'), w('Нарезать соломкой', 'Jülyen doğramak'), w('Тонкие ломтики', 'İnce dilimler'), w('Мелко порубить', 'İnce kıymak'), w('Острый нож', 'Keskin bıçak'), w('Одинаковый размер', 'Eşit boyut'), w('Безопасный хват', 'Güvenli tutuş'), w('Обрезки овощей', 'Sebze kırpıntıları')],
  },
  {
    id: 'cooking_methods', level: 'B1', mode: 'kitchen', icon: '🔥',
    title: 'Pişirme Teknikleri',
    description: 'Haşlama, kızartma, fırınlama, buharda pişirme ve soteleme',
    grammarFocus: 'Teknik fiillerde görünüş farkı sürecin tamamlanıp tamamlanmadığını hissettirir.',
    sceneTitle: 'Ocak Başında Teknik Dersi',
    sceneContext: 'Şef her yemeğe uygun pişirme yöntemini seçtirir.',
    words: [w('Варить', 'Haşlamak'), w('Жарить', 'Kızartmak'), w('Запекать', 'Fırınlamak'), w('Тушить', 'Kısık ateşte pişirmek'), w('Готовить на пару', 'Buharda pişirmek'), w('Обжарить быстро', 'Hızlı sotelemek'), w('Температура сковороды', 'Tava sıcaklığı'), w('Степень готовности', 'Pişme derecesi')],
  },
  {
    id: 'sauce_station', level: 'B1', mode: 'kitchen', icon: '🥘',
    title: 'Sos İstasyonu',
    description: 'Ana soslar, kıvam, azaltma ve son dokunuş kelimeleri',
    grammarFocus: 'Kıvam tarifinde karşılaştırma ve derece zarfları kullanılır.',
    sceneTitle: 'Sos Tenceresinin Başında',
    sceneContext: 'Şef sosun kıvamını ve tadını kontrol eder.',
    words: [w('Соусная станция', 'Sos istasyonu'), w('Уварить соус', 'Sosu çektirmek'), w('Густая консистенция', 'Yoğun kıvam'), w('Сливочная база', 'Kremalı baz'), w('Кислинка', 'Hafif ekşilik'), w('Баланс вкуса', 'Tat dengesi'), w('Процедить', 'Süzmek'), w('Финальный штрих', 'Son dokunuş')],
  },
  {
    id: 'meat_prep', level: 'B1', mode: 'kitchen', icon: '🥩',
    title: 'Et Hazırlığı ve Pişme Derecesi',
    description: 'Marine, dinlendirme, mühürleme ve pişme derecesini konuşma',
    grammarFocus: 'Süre ve derece ifadeleri et hazırlığında kesin anlam taşır.',
    sceneTitle: 'Izgara Bölümü',
    sceneContext: 'Aşçı et siparişlerini pişme derecesine göre ayırır.',
    words: [w('Маринад', 'Marine sosu'), w('Замариновать', 'Marine etmek'), w('Обсушить мясо', 'Eti kurulamak'), w('Запечатать соки', 'Suyunu içinde mühürlemek'), w('С кровью', 'Az pişmiş'), w('Средняя прожарка', 'Orta pişmiş'), w('Хорошо прожаренное', 'İyi pişmiş'), w('Дать отдохнуть', 'Dinlendirmek')],
  },
  {
    id: 'fish_seafood', level: 'B1', mode: 'kitchen', icon: '🐟',
    title: 'Balık ve Deniz Ürünleri',
    description: 'Taze balık kontrolü, fileto, kılçık ve limonlu servis',
    grammarFocus: 'Nitelik sıfatları tazelik ve pişme durumunu açıklar.',
    sceneTitle: 'Balık İstasyonu',
    sceneContext: 'Şef balığın tazeliğini ve servis şeklini kontrol eder.',
    words: [w('Свежая рыба', 'Taze balık'), w('Филе', 'Fileto'), w('Кости', 'Kılçıklar'), w('Креветки', 'Karides'), w('Мидии', 'Midye'), w('Лимонный сок', 'Limon suyu'), w('Хрустящая кожа', 'Çıtır deri'), w('Не пересушить', 'Kurutmamak')],
  },
  {
    id: 'vegetable_garnish', level: 'B1', mode: 'kitchen', icon: '🥦',
    title: 'Sebze Garnitürleri',
    description: 'Sebzeyi diri tutma, renk koruma ve tabakta denge',
    grammarFocus: 'Amaç bildiren «чтобы» yapısı garnitür hazırlığında kullanılır.',
    sceneTitle: 'Renkli Garnitür Hazırlığı',
    sceneContext: 'Aşçı tabağın yan ürününü dengeli hazırlar.',
    words: [w('Гарнир из овощей', 'Sebze garnitürü'), w('Бланшировать', 'Blanşe etmek'), w('Сохранить цвет', 'Rengi korumak'), w('Хрустящая текстура', 'Çıtır doku'), w('Пюре из картофеля', 'Patates püresi'), w('Запечённая морковь', 'Fırın havuç'), w('Сливочное масло', 'Tereyağı'), w('Посыпать зеленью', 'Yeşillik serpmek')],
  },
  {
    id: 'dough_bread', level: 'B1', mode: 'kitchen', icon: '🥖',
    title: 'Hamur, Ekmek ve Mayalama',
    description: 'Hamur yoğurma, mayalama, fırınlama ve kabuk kontrolü',
    grammarFocus: 'Süreç anlatımında «дать + mastar» kalıbı sık görülür.',
    sceneTitle: 'Fırın Köşesi',
    sceneContext: 'Ekmek hamuru servis öncesi hazırlanır.',
    words: [w('Замесить тесто', 'Hamur yoğurmak'), w('Дрожжи', 'Maya'), w('Расстойка', 'Mayalanma / dinlenme'), w('Мука', 'Un'), w('Хрустящая корочка', 'Çıtır kabuk'), w('Мягкий мякиш', 'Yumuşak iç doku'), w('Противень', 'Fırın tepsisi'), w('Посыпать мукой', 'Un serpmek')],
  },
  {
    id: 'pastry_basics', level: 'B1', mode: 'kitchen', icon: '🧁',
    title: 'Pastacılık Temelleri',
    description: 'Krema, bisküvi tabanı, dolgu ve süsleme kelimeleri',
    grammarFocus: 'Ölçü ve oran ifadeleri pastacılıkta hatayı azaltır.',
    sceneTitle: 'Tatlı Atölyesi',
    sceneContext: 'Pastacı servis için küçük tatlıları hazırlar.',
    words: [w('Кондитер', 'Pastacı'), w('Крем', 'Krema'), w('Бисквит', 'Pandispanya'), w('Начинка', 'İç dolgu'), w('Ваниль', 'Vanilya'), w('Сахарная пудра', 'Pudra şekeri'), w('Украшение', 'Süsleme'), w('Охладить десерт', 'Tatlıyı soğutmak')],
  },
  {
    id: 'stock_storage', level: 'B1', mode: 'kitchen', icon: '📦',
    title: 'Stok, Depo ve Mal Kabul',
    description: 'Ürün teslim alma, tarih kontrolü ve raf düzeni',
    grammarFocus: 'Pasif anlamlı ifadeler stok kontrolünde resmi ve net konuşma sağlar.',
    sceneTitle: 'Depoda Sayım',
    sceneContext: 'Ekip teslim gelen ürünleri kontrol eder.',
    words: [w('Поставка продуктов', 'Ürün teslimatı'), w('Накладная', 'İrsaliye'), w('Срок годности', 'Son kullanma tarihi'), w('Склад', 'Depo'), w('Полка', 'Raf'), w('Инвентаризация', 'Envanter sayımı'), w('Остатки', 'Kalan stok'), w('Принять товар', 'Mal kabul etmek')],
  },
  {
    id: 'hygiene_haccp', level: 'B1', mode: 'kitchen', icon: '🧼',
    title: 'Hijyen ve HACCP Temelleri',
    description: 'El yıkama, çapraz bulaşma, eldiven ve yüzey dezenfeksiyonu',
    grammarFocus: 'Zorunluluk bildiren «нужно» ve «нельзя» güvenlik talimatlarında kullanılır.',
    sceneTitle: 'Hijyen Kontrolü',
    sceneContext: 'Şef servis öncesi hijyen kurallarını hatırlatır.',
    words: [w('Мыть руки', 'Ellerini yıkamak'), w('Перчатки', 'Eldiven'), w('Дезинфекция поверхности', 'Yüzey dezenfeksiyonu'), w('Раздельные доски', 'Ayrı kesme tahtaları'), w('Сырая курица', 'Çiğ tavuk'), w('Готовый продукт', 'Hazır ürün'), w('Температурный журнал', 'Sıcaklık kayıt defteri'), w('Проверка чистоты', 'Temizlik kontrolü')],
  },
  {
    id: 'cold_chain', level: 'B1', mode: 'kitchen', icon: '❄️',
    title: 'Soğuk Zincir ve Sıcaklık',
    description: 'Buzdolabı, dondurucu, çözündürme ve sıcaklık takibi',
    grammarFocus: 'Sıcaklık sayıları ve karşılaştırmalar gıda güvenliğinde önemlidir.',
    sceneTitle: 'Dolap Kontrolü',
    sceneContext: 'Aşçı dolap sıcaklıklarını kayda geçirir.',
    words: [w('Холодильник', 'Buzdolabı'), w('Морозильник', 'Dondurucu'), w('Разморозить правильно', 'Doğru çözündürmek'), w('Температура хранения', 'Saklama sıcaklığı'), w('Не нарушать цепочку', 'Zinciri bozmamak'), w('Охлаждённый продукт', 'Soğutulmuş ürün'), w('Лёд', 'Buz'), w('Быстро охладить', 'Hızlı soğutmak')],
  },
  {
    id: 'shift_handover', level: 'B1', mode: 'management', icon: '🕒',
    title: 'Vardiya Değişimi',
    description: 'Devir teslim, eksik ürün, bekleyen masa ve not bırakma',
    grammarFocus: 'Geçmiş zaman ve raporlama kalıpları vardiya devrinde kullanılır.',
    sceneTitle: 'Akşam Vardiyası Devir Teslimi',
    sceneContext: 'Giden ekip gelen ekibe servis durumunu aktarır.',
    words: [w('Смена', 'Vardiya'), w('Передать информацию', 'Bilgiyi devretmek'), w('Ожидающий стол', 'Bekleyen masa'), w('Особая просьба', 'Özel istek'), w('Закончился продукт', 'Ürün bitti'), w('Записка для кухни', 'Mutfak notu'), w('Ответственный официант', 'Sorumlu garson'), w('План зала', 'Salon planı')],
  },
  {
    id: 'rush_hour', level: 'B1', mode: 'management', icon: '⚡',
    title: 'Yoğun Saat Yönetimi',
    description: 'Kalabalık salonda sıra, bekleme süresi ve hızlı koordinasyon',
    grammarFocus: 'Öncelik ve emir kipleri hızlı servis koordinasyonunda kullanılır.',
    sceneTitle: 'Akşam Yoğunluğu',
    sceneContext: 'Salon doludur; müdür görevleri hızlı dağıtır.',
    words: [w('Полная посадка', 'Tam doluluk'), w('Очередь у входа', 'Kapıda sıra'), w('Время ожидания', 'Bekleme süresi'), w('Приоритетный заказ', 'Öncelikli sipariş'), w('Быстрая отдача', 'Hızlı çıkış'), w('Свободный официант', 'Boşta garson'), w('Срочно на третий стол', 'Acil üçüncü masaya'), w('Сохранять спокойствие', 'Sakin kalmak')],
  },
  {
    id: 'kitchen_service_coordination', level: 'B1', mode: 'management', icon: '🔔',
    title: 'Mutfak ve Salon Koordinasyonu',
    description: 'Zil, hazır tabak, masa numarası ve servis sırası',
    grammarFocus: 'Kısa komutlar ve masa numaraları mutfak-salon iletişimini hızlandırır.',
    sceneTitle: 'Servis Penceresi',
    sceneContext: 'Şef ve garson tabak çıkışlarını koordine eder.',
    words: [w('Сервисное окно', 'Servis penceresi'), w('Звонок готовности', 'Hazır zili'), w('Стол номер пять', 'Beş numaralı masa'), w('Забрать тарелки', 'Tabakları almak'), w('Не задерживать', 'Geciktirmemek'), w('Горячее готово', 'Sıcak yemek hazır'), w('Одновременно подать', 'Aynı anda servis etmek'), w('Проверить чек', 'Adisyonu kontrol etmek')],
  },
  {
    id: 'pos_order_system', level: 'B1', mode: 'management', icon: '🖥️',
    title: 'POS ve Adisyon Sistemi',
    description: 'Sipariş girişi, not ekleme, iptal ve masa taşıma',
    grammarFocus: 'Teknik servis fiilleri dijital sistemde net ve kısa kullanılır.',
    sceneTitle: 'Kasa Ekranı',
    sceneContext: 'Garson siparişi POS sistemine doğru girer.',
    words: [w('Ввести заказ', 'Siparişi girmek'), w('Добавить комментарий', 'Not eklemek'), w('Отменить позицию', 'Kalemi iptal etmek'), w('Перенести стол', 'Masayı taşımak'), w('Закрыть чек', 'Adisyonu kapatmak'), w('Открытый счёт', 'Açık hesap'), w('Скидка вручную', 'Manuel indirim'), w('Печать на кухню', 'Mutfağa fiş basımı')],
  },
  {
    id: 'special_requests_ticket', level: 'B1', mode: 'management', icon: '📌',
    title: 'Özel İstek ve Mutfak Notları',
    description: 'Alerjen, pişme derecesi, sos ayrı ve özel masa notunu doğru iletme',
    grammarFocus: 'Dolaylı anlatım kalıpları misafir isteğini mutfağa taşır.',
    sceneTitle: 'Notlu Sipariş',
    sceneContext: 'Garson özel isteği eksiksiz sisteme yazar.',
    words: [w('Особая пометка', 'Özel not'), w('Без соли', 'Tuzsuz'), w('Соус отдельно', 'Sos ayrı'), w('Не смешивать', 'Karıştırmamak'), w('Гость просит', 'Misafir istiyor'), w('Кухня должна знать', 'Mutfak bilmeli'), w('Проверить перед подачей', 'Servisten önce kontrol etmek'), w('Повторить вслух', 'Sesli tekrar etmek')],
  },
  {
    id: 'wine_pairing', level: 'B2', mode: 'service', icon: '🍷',
    title: 'Şarap ve Yemek Eşleşmesi',
    description: 'Basit sommelier diliyle gövde, asidite ve öneri anlatma',
    grammarFocus: 'Tat profili anlatırken soyut sıfatlar ve karşılaştırma kullanılır.',
    sceneTitle: 'Şarap Önerisi',
    sceneContext: 'Garson yemeğe uygun içecek eşleşmesi önerir.',
    words: [w('Сомелье', 'Sommelier'), w('Сухое вино', 'Sek şarap'), w('Полусладкое', 'Yarı tatlı'), w('Кислотность', 'Asidite'), w('Тело вина', 'Şarabın gövdesi'), w('Послевкусие', 'Bitiş tadı'), w('Сочетание с рыбой', 'Balıkla eşleşme'), w('Дегустационный бокал', 'Tadım kadehi')],
  },
  {
    id: 'tasting_menu', level: 'B2', mode: 'service', icon: '🍱',
    title: 'Tadım Menüsü Anlatımı',
    description: 'Çok aşamalı menü, sıra, porsiyon ve tempo yönetimi',
    grammarFocus: 'Sıralama bağlaçları tadım menüsünün akışını açıklar.',
    sceneTitle: 'Tadım Menüsü Başlıyor',
    sceneContext: 'Garson misafire menünün akışını ve temposunu anlatır.',
    words: [w('Дегустационное меню', 'Tadım menüsü'), w('Подача за подачей', 'Servis servis ilerleme'), w('Маленькая порция', 'Küçük porsiyon'), w('Темп ужина', 'Yemeğin temposu'), w('Амюз-буш', 'Amuse-bouche'), w('Переходный курс', 'Ara geçiş tabağı'), w('Финальный десерт', 'Final tatlısı'), w('Объяснить концепцию', 'Konsepti açıklamak')],
  },
  {
    id: 'banquet_service', level: 'B2', mode: 'management', icon: '🎉',
    title: 'Banket ve Davet Servisi',
    description: 'Kalabalık davette masa planı, toplu servis ve zamanlama',
    grammarFocus: 'Planlama dilinde edilgen yapılar ve kesin saat ifadeleri kullanılır.',
    sceneTitle: 'Düğün Yemeği Hazırlığı',
    sceneContext: 'Ekip davet servisini masa planına göre organize eder.',
    words: [w('Банкет', 'Banket / davet yemeği'), w('План рассадки', 'Oturma planı'), w('Общая подача', 'Toplu servis'), w('Тост ведущего', 'Sunucunun kadeh konuşması'), w('Предварительный заказ', 'Ön sipariş'), w('График кухни', 'Mutfak zaman çizelgesi'), w('Гости с детьми', 'Çocuklu misafirler'), w('Финальная уборка', 'Son temizlik')],
  },
  {
    id: 'room_service', level: 'B2', mode: 'service', icon: '🏨',
    title: 'Oda Servisi',
    description: 'Otelde odaya yemek götürme, tepsi, imza ve zaman bildirimi',
    grammarFocus: 'Oda numarası ve resmi hitap servis güvenliği için net söylenir.',
    sceneTitle: 'Odaya Kahvaltı',
    sceneContext: 'Görevli tepsiyi odaya çıkarır ve teslimatı tamamlar.',
    words: [w('Обслуживание в номере', 'Oda servisi'), w('Номер комнаты', 'Oda numarası'), w('Тележка', 'Servis arabası'), w('Поднос', 'Tepsi'), w('Подписать счёт', 'Hesabı imzalamak'), w('Оставить у двери', 'Kapıya bırakmak'), w('Время доставки', 'Teslimat saati'), w('Не беспокоить', 'Rahatsız etmeyin')],
  },
  {
    id: 'catering_delivery', level: 'B2', mode: 'management', icon: '🚚',
    title: 'Catering Teslimatı',
    description: 'Dış etkinliğe yemek taşıma, sıcak tutma ve ekipman listesi',
    grammarFocus: 'Lojistik anlatımında kontrol listesi ve şart cümleleri kullanılır.',
    sceneTitle: 'Etkinlik Alanına Sevkiyat',
    sceneContext: 'Restoran ekibi catering siparişini dış mekâna taşır.',
    words: [w('Кейтеринг', 'Catering'), w('Термоконтейнер', 'Isı korumalı kap'), w('Список оборудования', 'Ekipman listesi'), w('Адрес площадки', 'Etkinlik adresi'), w('Время разгрузки', 'Boşaltma saati'), w('Сервировочная линия', 'Servis hattı'), w('Запасные приборы', 'Yedek takımlar'), w('Ответственный на месте', 'Sahadaki sorumlu')],
  },
  {
    id: 'online_reviews', level: 'B2', mode: 'management', icon: '⭐',
    title: 'Online Yorumlara Cevap',
    description: 'Olumlu/olumsuz yorum, özür, açıklama ve davet dili',
    grammarFocus: 'Resmi ama sıcak cevaplarda bağlaçlar ve yumuşatıcı ifadeler önemlidir.',
    sceneTitle: 'Yorum Paneli',
    sceneContext: 'Müdür internet yorumlarını profesyonel dille yanıtlar.',
    words: [w('Отзыв гостя', 'Misafir yorumu'), w('Рейтинг', 'Puanlama'), w('Благодарим за обратную связь', 'Geri bildirim için teşekkür ederiz'), w('Нам жаль', 'Üzgünüz'), w('Разобраться в ситуации', 'Durumu incelemek'), w('Пригласить снова', 'Tekrar davet etmek'), w('Публичный ответ', 'Herkese açık cevap'), w('Репутация ресторана', 'Restoran itibarı')],
  },
  {
    id: 'guest_loyalty', level: 'B2', mode: 'management', icon: '🤝',
    title: 'Misafir Sadakati ve CRM',
    description: 'Daimi misafir, tercih notları, doğum günü ve kişiselleştirme',
    grammarFocus: 'Geçmiş tercihlere gönderme yapan ifadeler kişisel servis dili kurar.',
    sceneTitle: 'Daimi Misafir Geldi',
    sceneContext: 'Ekip sık gelen misafirin tercihlerini hatırlar.',
    words: [w('Постоянный гость', 'Daimi misafir'), w('Карточка гостя', 'Misafir kartı'), w('Любимый столик', 'Favori masa'), w('Предпочтения', 'Tercihler'), w('День рождения', 'Doğum günü'), w('Комплимент от шефа', 'Şeften ikram'), w('Персональное предложение', 'Kişisel teklif'), w('Вернуться снова', 'Tekrar gelmek')],
  },
  {
    id: 'menu_costing', level: 'B2', mode: 'management', icon: '💰',
    title: 'Menü Maliyeti ve Fiyatlama',
    description: 'Porsiyon maliyeti, kâr marjı, tedarik ve fiyat dengesi',
    grammarFocus: 'Neden-sonuç bağlaçları fiyat açıklamalarında kullanılır.',
    sceneTitle: 'Yeni Menü Toplantısı',
    sceneContext: 'Müdür ve şef yeni yemeğin maliyetini hesaplar.',
    words: [w('Себестоимость блюда', 'Yemeğin maliyeti'), w('Маржа', 'Kâr marjı'), w('Цена в меню', 'Menü fiyatı'), w('Поставщик', 'Tedarikçi'), w('Сезонный продукт', 'Mevsim ürünü'), w('Порционный вес', 'Porsiyon gramajı'), w('Наценка', 'Fiyat bindirimi'), w('Фудкост', 'Food cost')],
  },
  {
    id: 'waste_control', level: 'B2', mode: 'management', icon: '♻️',
    title: 'Fire ve İsraf Kontrolü',
    description: 'Artan ürün, porsiyon kontrolü, yeniden kullanım ve sürdürülebilir mutfak',
    grammarFocus: 'Miktar ve azaltma fiilleri operasyon raporlarında kullanılır.',
    sceneTitle: 'Günün Sonu Fire Raporu',
    sceneContext: 'Şef ve müdür israfı azaltmak için plan yapar.',
    words: [w('Пищевые отходы', 'Gıda atığı'), w('Списать продукт', 'Ürünü fire yazmak'), w('Контроль порций', 'Porsiyon kontrolü'), w('Остатки за день', 'Günlük kalanlar'), w('Повторно использовать безопасно', 'Güvenli şekilde yeniden kullanmak'), w('Сократить потери', 'Kayıpları azaltmak'), w('Экологичная кухня', 'Çevreci mutfak'), w('Отчёт по списанию', 'Fire raporu')],
  },
  {
    id: 'staff_training', level: 'B2', mode: 'management', icon: '🎓',
    title: 'Personel Eğitimi',
    description: 'Yeni garson eğitimi, gölge vardiya ve servis standardı',
    grammarFocus: 'Talimat, geri bildirim ve hedef cümleleri eğitim dilinin temelidir.',
    sceneTitle: 'Yeni Garson Eğitimi',
    sceneContext: 'Kaptan garson yeni personele servis standardını anlatır.',
    words: [w('Стажёр', 'Stajyer'), w('Наставник', 'Mentor'), w('Стандарт сервиса', 'Servis standardı'), w('Теневая смена', 'Gölge vardiya'), w('Обратная связь', 'Geri bildirim'), w('Ошибки новичка', 'Yeni başlayan hataları'), w('Практическая тренировка', 'Uygulamalı eğitim'), w('Оценка навыков', 'Beceri değerlendirmesi')],
  },
  {
    id: 'delay_crisis', level: 'C1/C2', mode: 'management', icon: '🚨',
    title: 'Kriz ve Gecikme Yönetimi',
    description: 'Mutfak gecikmesi, kızgın misafir ve telafi stratejisi',
    grammarFocus: 'Kriz dilinde kabul, açıklama ve çözüm önerisi dengeli verilir.',
    sceneTitle: 'Geciken Ana Yemek',
    sceneContext: 'Müdür servis krizini sakin ve profesyonel dille yönetir.',
    words: [w('Критическая задержка', 'Kritik gecikme'), w('Недовольный гость', 'Memnun olmayan misafir'), w('Деэскалация', 'Gerilimi düşürme'), w('Признать проблему', 'Sorunu kabul etmek'), w('Предложить компенсацию', 'Telafi önermek'), w('Контролировать тон', 'Tonu kontrol etmek'), w('Сохранить доверие', 'Güveni korumak'), w('Послеинцидентный разбор', 'Olay sonrası değerlendirme')],
  },
  {
    id: 'fine_dining_language', level: 'C1/C2', mode: 'service', icon: '🍾',
    title: 'Fine Dining Servis Dili',
    description: 'Üst düzey restoranda zarif açıklama, ritim ve görünmez servis',
    grammarFocus: 'Dolaylı, ölçülü ve zarif ifadeler üst seviye servis tonunu kurar.',
    sceneTitle: 'Şık Restoranda Sessiz Servis',
    sceneContext: 'Garson yemeği detaylı ama abartmadan tanıtır.',
    words: [w('Изысканная подача', 'Zarif sunum'), w('Ненавязчивый сервис', 'Rahatsız etmeyen servis'), w('Ритм вечера', 'Gecenin ritmi'), w('Авторское блюдо', 'Şefe özel yemek'), w('Тонкая кислинка', 'İnce ekşilik'), w('Деликатная текстура', 'Narin doku'), w('Гастрономический акцент', 'Gastronomik vurgu'), w('Элегантное завершение', 'Zarif kapanış')],
  },
  {
    id: 'opening_closing_routine', level: 'C1/C2', mode: 'management', icon: '🔐',
    title: 'Lokanta Açılış ve Kapanış Rutini',
    description: 'Günün başı ve sonunda kasa, temizlik, güvenlik ve rapor kontrolü',
    grammarFocus: 'Kontrol listesi dili, sorumluluk ve tamamlanmış eylem vurgusuyla kurulur.',
    sceneTitle: 'Günün Son Kontrolü',
    sceneContext: 'Müdür kapanış listesiyle restoranı güvenli şekilde kapatır.',
    words: [w('Открыть смену', 'Vardiyayı açmak'), w('Закрыть кассу', 'Kasayı kapatmak'), w('Итоговый отчёт', 'Gün sonu raporu'), w('Проверить сигнализацию', 'Alarmı kontrol etmek'), w('Выключить оборудование', 'Ekipmanı kapatmak'), w('Санитарный обход', 'Hijyen turu'), w('Ключ от входа', 'Giriş anahtarı'), w('Ответственный за закрытие', 'Kapanış sorumlusu')],
  },
];

export function createRestaurantService50(startUnitNumber: number): UnitModule[] {
  return RESTAURANT_SPECS.map((spec, index) => makeUnit(spec, index, startUnitNumber + index));
}
