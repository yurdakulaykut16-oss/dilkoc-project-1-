import type { DialogueLine, UnitModule, WordDetail } from '../curriculumData';

type SentenceDrill = UnitModule['sentences'][number];

type RawWord = {
  ru: string;
  tr: string;
  note?: string;
};

type ThemeProfile = {
  id: string;
  label: string;
  keywords: string[];
  sceneTitle: string;
  placeRu: string;
  placeTr: string;
  focusTr: string;
  speakers: [string, string];
  words: RawWord[];
};

const raw = (ru: string, tr: string, note?: string): RawWord => ({ ru, tr, note });

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

function safeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_]/g, '_');
}

function normalize(text: string): string {
  return text.toLocaleLowerCase('tr').replace(/ё/g, 'е').trim();
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function keywordMatches(haystack: string, keyword: string): boolean {
  const needle = normalize(keyword);
  if (needle.length <= 2) {
    return new RegExp(`(^|[^a-zA-ZçğıöşüÇĞİÖŞÜа-яА-ЯеЕ])${escapeRegex(needle)}($|[^a-zA-ZçğıöşüÇĞİÖŞÜа-яА-ЯеЕ])`, 'u').test(haystack);
  }
  return haystack.includes(needle);
}

function rotate<T>(items: T[], amount: number): T[] {
  if (items.length <= 1) return [...items];
  const n = ((amount % items.length) + items.length) % items.length;
  return [...items.slice(n), ...items.slice(0, n)];
}

function tokenizeSentence(ru: string): string[] {
  return ru
    .replace(/[“”]/g, '"')
    .split(/\s+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function makeSentence(ru: string, tr: string, offset: number): SentenceDrill {
  const correct = tokenizeSentence(ru);
  return {
    ru,
    tr,
    scrambled: rotate(correct, Math.max(1, offset % Math.max(1, correct.length))),
    correct,
  };
}

const THEME_PROFILES: ThemeProfile[] = [
  {
    id: 'cooking',
    label: 'Mutfak ve yemek',
    keywords: ['aşç', 'mutfak', 'yemek', 'tarif', 'baharat', 'çorba', 'hamur', 'salata', 'balık', 'et yemeği', 'ızgara', 'tatlı', 'pasta', 'şef', 'sos', 'menü tadımı', 'degüstasyon', 'michelin'],
    sceneTitle: 'Yeni Tarif Provası',
    placeRu: 'на кухне',
    placeTr: 'mutfakta',
    focusTr: 'malzeme, teknik ve tarif anlatımını farklı kelimelerle pekiştirme',
    speakers: ['Şef', 'Yardımcı'],
    words: [
      raw('Разделочная доска', 'Kesme tahtası'), raw('Половник', 'Kepçe'), raw('Тёрка', 'Rende'), raw('Противень', 'Fırın tepsisi'),
      raw('Духовка', 'Fırın'), raw('Тушить', 'Kısık ateşte pişirmek'), raw('Обжарить', 'Hafif kızartmak'), raw('Перемешать', 'Karıştırmak'),
      raw('Щепотка соли', 'Bir tutam tuz'), raw('Сливочный соус', 'Kremalı sos'), raw('Хрустящая корочка', 'Çıtır kabuk'), raw('Нежная начинка', 'Yumuşak iç harç'),
      raw('Подача блюда', 'Yemeğin sunumu'), raw('Свежая зелень', 'Taze yeşillik'), raw('Маринад', 'Marine sosu'), raw('Гарнир', 'Garnitür'),
    ],
  },
  {
    id: 'cafe_restaurant',
    label: 'Kafe ve sipariş',
    keywords: ['kafe', 'restoran', 'sipariş', 'barista', 'garson', 'menü', 'içecek', 'kahve', 'çay', 'rezervasyon'],
    sceneTitle: 'Farklı Sipariş Sahnesi',
    placeRu: 'в кафе',
    placeTr: 'kafede',
    focusTr: 'sipariş verme, hesap isteme ve servis durumlarını yeni ifadelerle çalışma',
    speakers: ['Müşteri', 'Garson'],
    words: [
      raw('Латте', 'Latte'), raw('Капучино', 'Cappuccino'), raw('Травяной чай', 'Bitki çayı'), raw('Лимонад', 'Limonata'),
      raw('Десерт дня', 'Günün tatlısı'), raw('Столик у окна', 'Pencere kenarı masa'), raw('Бронь', 'Rezervasyon'), raw('Заказ навынос', 'Paket sipariş'),
      raw('Счёт отдельно', 'Hesap ayrı'), raw('Чаевые', 'Bahşiş'), raw('Без сахара', 'Şekersiz'), raw('С собой', 'Paket / al götür'),
      raw('Свободный стол', 'Boş masa'), raw('Острый соус', 'Acı sos'), raw('Основное блюдо', 'Ana yemek'), raw('Вегетарианский вариант', 'Vejetaryen seçenek'),
    ],
  },
  {
    id: 'transport_travel',
    label: 'Ulaşım ve seyahat',
    keywords: ['ulaşım', 'metro', 'taksi', 'otobüs', 'tren', 'havalimanı', 'havaalanı', 'seyahat', 'otel', 'bagaj', 'rota', 'uçak', 'yön', 'şehir'],
    sceneTitle: 'Yeni Rota Planı',
    placeRu: 'на вокзале',
    placeTr: 'istasyonda',
    focusTr: 'rota, yön, bilet ve seyahat aksaklıklarını farklı kelimelerle anlatma',
    speakers: ['Yolcu', 'Görevli'],
    words: [
      raw('Остановка', 'Durak'), raw('Маршрут', 'Güzergâh'), raw('Пересадка', 'Aktarma'), raw('Выход к городу', 'Şehre çıkış'),
      raw('Платформа', 'Peron'), raw('Электронный билет', 'Elektronik bilet'), raw('Посадка', 'Biniş'), raw('Задержка рейса', 'Sefer gecikmesi'),
      raw('Ручная кладь', 'El bagajı'), raw('Камера хранения', 'Emanet dolabı'), raw('Навигатор', 'Navigasyon'), raw('Пешеходный переход', 'Yaya geçidi'),
      raw('Обратный билет', 'Dönüş bileti'), raw('Прокат машины', 'Araç kiralama'), raw('Регистрация на рейс', 'Uçuş check-in'), raw('Ближайшая станция', 'En yakın istasyon'),
    ],
  },
  {
    id: 'shopping_money',
    label: 'Alışveriş ve ödeme',
    keywords: ['alışveriş', 'market', 'mağaza', 'kıyafet', 'fiyat', 'para', 'ödeme', 'indirim', 'kasa', 'beden', 'ayakkabı'],
    sceneTitle: 'Mağazada Yeni Diyalog',
    placeRu: 'в магазине',
    placeTr: 'mağazada',
    focusTr: 'ürün sorma, fiyat karşılaştırma, beden ve ödeme ifadelerini çeşitlendirme',
    speakers: ['Müşteri', 'Satıcı'],
    words: [
      raw('Скидка', 'İndirim'), raw('Размер', 'Beden'), raw('Примерочная', 'Deneme kabini'), raw('Касса', 'Kasa'),
      raw('Чек', 'Fiş'), raw('Наличные', 'Nakit'), raw('Бесконтактная оплата', 'Temassız ödeme'), raw('Доставка', 'Teslimat'),
      raw('Возврат товара', 'Ürün iadesi'), raw('Гарантия', 'Garanti'), raw('Корзина', 'Sepet'), raw('Акция', 'Kampanya'),
      raw('Дешевле', 'Daha ucuz'), raw('Дороже', 'Daha pahalı'), raw('Подходит', 'Uyuyor / uygun'), raw('Пакет не нужен', 'Poşet gerekmez'),
    ],
  },
  {
    id: 'health',
    label: 'Sağlık ve eczane',
    keywords: ['sağlık', 'doktor', 'hastane', 'eczane', 'ağrı', 'ilaç', 'tıp', 'randevu', 'acil', 'muayene'],
    sceneTitle: 'Klinikte Ek Görüşme',
    placeRu: 'в клинике',
    placeTr: 'klinikte',
    focusTr: 'şikâyet anlatma, randevu alma ve ilaç talimatlarını yeni sözlerle pekiştirme',
    speakers: ['Hasta', 'Doktor'],
    words: [
      raw('Запись к врачу', 'Doktor randevusu'), raw('Рецепт', 'Reçete'), raw('Давление', 'Tansiyon'), raw('Температура', 'Ateş'),
      raw('Кашель', 'Öksürük'), raw('Насморк', 'Burun akıntısı'), raw('Боль в горле', 'Boğaz ağrısı'), raw('Осмотр', 'Muayene'),
      raw('Анализ крови', 'Kan tahlili'), raw('Дозировка', 'Dozaj'), raw('Побочный эффект', 'Yan etki'), raw('Скорая помощь', 'Ambulans'),
      raw('Страховка', 'Sigorta'), raw('Самочувствие', 'Genel hâl'), raw('Выздоравливать', 'İyileşmek'), raw('Принимать лекарство', 'İlaç almak'),
    ],
  },
  {
    id: 'finance_legal_admin',
    label: 'Banka, hukuk ve resmî işler',
    keywords: ['banka', 'hukuk', 'resmî', 'resmi', 'belge', 'emlak', 'kira', 'ipotek', 'yatırım', 'gümrük', 'mahkeme', 'vergi', 'vize', 'sigorta', 'sözleşme'],
    sceneTitle: 'Ofiste Belge Kontrolü',
    placeRu: 'в офисе',
    placeTr: 'resmî ofiste',
    focusTr: 'belge, başvuru, sözleşme ve para işlemlerini farklı ama yakın ifadelerle çalışma',
    speakers: ['Başvuran', 'Uzman'],
    words: [
      raw('Заявление', 'Başvuru dilekçesi'), raw('Справка', 'Resmî belge / yazı'), raw('Доверенность', 'Vekâletname'), raw('Подпись', 'İmza'),
      raw('Печать', 'Mühür'), raw('Срок действия', 'Geçerlilik süresi'), raw('Налог', 'Vergi'), raw('Пошлина', 'Harç'),
      raw('Банковский перевод', 'Banka havalesi'), raw('Ипотечный платёж', 'Konut kredisi taksiti'), raw('Договор аренды', 'Kira sözleşmesi'), raw('Право собственности', 'Mülkiyet hakkı'),
      raw('Таможенная декларация', 'Gümrük beyannamesi'), raw('Юридическая консультация', 'Hukuki danışmanlık'), raw('Иск', 'Dava dilekçesi'), raw('Решение суда', 'Mahkeme kararı'),
    ],
  },
  {
    id: 'work_business',
    label: 'İş ve profesyonel hayat',
    keywords: ['iş', 'ofis', 'cv', 'kariyer', 'toplantı', 'sunum', 'yönetim', 'proje', 'şirket', 'startup', 'ticaret', 'müzakere', 'ortaklık', 'ihale', 'müşteri', 'rapor'],
    sceneTitle: 'Toplantıda Yeni Plan',
    placeRu: 'на встрече',
    placeTr: 'toplantıda',
    focusTr: 'iş takibi, görev paylaşımı, raporlama ve karar alma ifadelerini çoğaltma',
    speakers: ['Yönetici', 'Çalışan'],
    words: [
      raw('Дедлайн', 'Teslim tarihi'), raw('Отчёт', 'Rapor'), raw('Созвон', 'Online görüşme'), raw('Повестка встречи', 'Toplantı gündemi'),
      raw('Задача', 'Görev'), raw('Ответственный', 'Sorumlu kişi'), raw('Согласовать', 'Mutabık kalmak'), raw('Приоритет', 'Öncelik'),
      raw('Бюджет проекта', 'Proje bütçesi'), raw('Коммерческое предложение', 'Ticari teklif'), raw('Партнёрство', 'Ortaklık'), raw('Переговоры', 'Müzakereler'),
      raw('Риск', 'Risk'), raw('Результат', 'Sonuç'), raw('План действий', 'Eylem planı'), raw('Обратная связь', 'Geri bildirim'),
    ],
  },
  {
    id: 'relationship_social',
    label: 'Tanışma, flört ve sosyal hayat',
    keywords: ['flört', 'randevu', 'aşk', 'ilişki', 'parti', 'bar', 'kulüp', 'duygu', 'tanışma', 'arkadaş', 'spor salonu', 'parkta'],
    sceneTitle: 'Yeni Sosyal Sahne',
    placeRu: 'на встрече',
    placeTr: 'buluşmada',
    focusTr: 'tanışma, iltifat, sınır koyma ve buluşma ayarlama ifadelerini değiştirme',
    speakers: ['Kişi A', 'Kişi B'],
    words: [
      raw('Свидание', 'Randevu / buluşma'), raw('Симпатия', 'Hoşlanma'), raw('Комплимент', 'İltifat'), raw('Неловкая пауза', 'Garip sessizlik'),
      raw('Общие интересы', 'Ortak ilgi alanları'), raw('Пригласить на кофе', 'Kahveye davet etmek'), raw('Переписка', 'Mesajlaşma'), raw('Флиртовать', 'Flört etmek'),
      raw('Личные границы', 'Kişisel sınırlar'), raw('Искренность', 'Samimiyet'), raw('Ревность', 'Kıskançlık'), raw('Доверие', 'Güven'),
      raw('Отношения', 'İlişki'), raw('Понравиться', 'Hoşuna gitmek'), raw('Договориться о встрече', 'Buluşma ayarlamak'), raw('Сделать первый шаг', 'İlk adımı atmak'),
    ],
  },
  {
    id: 'greeting_politeness',
    label: 'Selamlaşma ve nezaket',
    keywords: ['selam', 'vedalaş', 'nezaket', 'kibar', 'özür', 'tanıtım', 'sohbet', 'adım', 'merhaba'],
    sceneTitle: 'Yeni Tanışma Diyaloğu',
    placeRu: 'в разговоре',
    placeTr: 'sohbette',
    focusTr: 'selamlaşma, kısa cevap ve kibar soru kalıplarını farklı örneklerle pekiştirme',
    speakers: ['Yeni Kişi', 'Arkadaş'],
    words: [
      raw('Добрый день', 'İyi günler'), raw('Рад познакомиться', 'Tanıştığıma memnun oldum'), raw('Как настроение?', 'Keyfin nasıl?'), raw('Всего доброго', 'Her şey gönlünce olsun'),
      raw('До скорого', 'Yakında görüşürüz'), raw('Извините за вопрос', 'Soru için kusura bakmayın'), raw('Можно уточнить?', 'Netleştirebilir miyim?'), raw('Ничего страшного', 'Sorun değil'),
      raw('Спасибо за помощь', 'Yardım için teşekkürler'), raw('Очень мило', 'Çok nazik'), raw('Рад видеть', 'Gördüğüme sevindim'), raw('Передавайте привет', 'Selam söyleyin'),
      raw('Как вас зовут?', 'Adınız nedir?'), raw('Меня зовут...', 'Benim adım...'), raw('Приятного дня', 'İyi günler dilerim'), raw('Увидимся позже', 'Sonra görüşürüz'),
    ],
  },
  {
    id: 'family',
    label: 'Aile ve yakın çevre',
    keywords: ['aile', 'anne', 'baba', 'kardeş', 'akraba', 'eş', 'çocuk', 'komşuluk'],
    sceneTitle: 'Aile Albümü Sohbeti',
    placeRu: 'дома',
    placeTr: 'evde',
    focusTr: 'akrabalık, yaş, sahiplik ve aile hakkında kısa anlatımı çeşitlendirme',
    speakers: ['Kuzen', 'Akraba'],
    words: [
      raw('Бабушка', 'Büyükanne'), raw('Дедушка', 'Büyükbaba'), raw('Родители', 'Ebeveynler'), raw('Родственники', 'Akrabalar'),
      raw('Племянник', 'Erkek yeğen'), raw('Племянница', 'Kız yeğen'), raw('Двоюродный брат', 'Kuzen erkek'), raw('Двоюродная сестра', 'Kuzen kız'),
      raw('Семейный ужин', 'Aile yemeği'), raw('Семейная фотография', 'Aile fotoğrafı'), raw('Старший', 'Yaşça büyük'), raw('Младшая', 'Yaşça küçük kız'),
      raw('Заботиться', 'İlgilenmek / bakmak'), raw('Навещать', 'Ziyaret etmek'), raw('Домашние правила', 'Ev kuralları'), raw('Близкие люди', 'Yakın insanlar'),
    ],
  },
  {
    id: 'home_daily',
    label: 'Ev ve gündelik düzen',
    keywords: ['ev', 'oda', 'mobilya', 'temizlik', 'misafir', 'kiralık', 'komşu', 'apartman', 'tamir', 'tadilat'],
    sceneTitle: 'Evde Yeni Plan',
    placeRu: 'в квартире',
    placeTr: 'dairede',
    focusTr: 'ev eşyaları, düzen, arıza ve misafir ağırlama kelimelerini farklılaştırma',
    speakers: ['Ev Sahibi', 'Misafir'],
    words: [
      raw('Прихожая', 'Antre'), raw('Полка', 'Raf'), raw('Шкаф', 'Dolap'), raw('Занавески', 'Perdeler'),
      raw('Пылесос', 'Elektrik süpürgesi'), raw('Мусорное ведро', 'Çöp kovası'), raw('Стиральная машина', 'Çamaşır makinesi'), raw('Розетка', 'Priz'),
      raw('Лампочка', 'Ampul'), raw('Кран течёт', 'Musluk akıyor'), raw('Уютно', 'Rahat / sıcak ortam'), raw('Проветрить комнату', 'Odayı havalandırmak'),
      raw('Ключи от дома', 'Ev anahtarları'), raw('Соседи сверху', 'Üst kattaki komşular'), raw('Гостиная', 'Salon'), raw('Запасное одеяло', 'Yedek battaniye'),
    ],
  },
  {
    id: 'time_weather',
    label: 'Zaman ve hava',
    keywords: ['saat', 'zaman', 'günler', 'aylar', 'hava', 'mevsim', 'yağmur', 'kış', 'yaz', 'sabah', 'akşam'],
    sceneTitle: 'Takvim ve Hava Planı',
    placeRu: 'на улице',
    placeTr: 'dışarıda',
    focusTr: 'gün planı, sıklık, hava durumu ve mevsim sözlerini yeni cümlelere taşıma',
    speakers: ['Arkadaş 1', 'Arkadaş 2'],
    words: [
      raw('Расписание', 'Program / zaman çizelgesi'), raw('Рано утром', 'Sabah erken'), raw('Поздно вечером', 'Akşam geç'), raw('В полдень', 'Öğleyin'),
      raw('Через час', 'Bir saat sonra'), raw('На следующей неделе', 'Gelecek hafta'), raw('Пасмурно', 'Kapalı hava'), raw('Моросит дождь', 'Çiseleyen yağmur'),
      raw('Жара', 'Sıcak hava'), raw('Прохладно', 'Serin'), raw('Сильный ветер', 'Kuvvetli rüzgâr'), raw('Прогноз погоды', 'Hava tahmini'),
      raw('Вовремя', 'Zamanında'), raw('Опоздать', 'Geç kalmak'), raw('Часто', 'Sık sık'), raw('Редко', 'Nadiren'),
    ],
  },
  {
    id: 'technology_media',
    label: 'Teknoloji ve medya',
    keywords: ['telefon', 'internet', 'sosyal medya', 'medya', 'yapay', 'yz', 'uygulama', 'mesaj', 'stream', 'yayın', 'şifre', 'bilgisayar'],
    sceneTitle: 'Ekranda Yeni Sorun',
    placeRu: 'онлайн',
    placeTr: 'çevrim içi ortamda',
    focusTr: 'mesajlaşma, bağlantı, medya ve dijital güvenlik ifadelerini çeşitlendirme',
    speakers: ['Kullanıcı', 'Destek'],
    words: [
      raw('Пароль', 'Şifre'), raw('Уведомление', 'Bildirim'), raw('Ссылка', 'Bağlantı / link'), raw('Вложение', 'Ek dosya'),
      raw('Обновление', 'Güncelleme'), raw('Настройки', 'Ayarlar'), raw('Загрузка', 'İndirme / yükleme'), raw('Прямой эфир', 'Canlı yayın'),
      raw('Подписчик', 'Abone / takipçi'), raw('Комментарий', 'Yorum'), raw('Лента новостей', 'Haber akışı'), raw('Конфиденциальность', 'Gizlilik'),
      raw('Искусственный интеллект', 'Yapay zekâ'), raw('Сбой системы', 'Sistem arızası'), raw('Резервная копия', 'Yedek kopya'), raw('Голосовое сообщение', 'Sesli mesaj'),
    ],
  },
  {
    id: 'education_language',
    label: 'Eğitim ve dil öğrenimi',
    keywords: ['okul', 'ders', 'kitap', 'sınav', 'ödev', 'öğretmen', 'kütüphane', 'dil', 'okuma', 'yazma', 'alfabe'],
    sceneTitle: 'Ders Sonrası Ek Çalışma',
    placeRu: 'на уроке',
    placeTr: 'derste',
    focusTr: 'öğrenme, soru sorma, kural açıklama ve çalışma rutini kelimelerini artırma',
    speakers: ['Öğrenci', 'Öğretmen'],
    words: [
      raw('Тетрадь', 'Defter'), raw('Задание', 'Görev / ödev'), raw('Правило', 'Kural'), raw('Произношение', 'Telaffuz'),
      raw('Ударение', 'Vurgu'), raw('Словарь', 'Sözlük'), raw('Пример', 'Örnek'), raw('Ошибка', 'Hata'),
      raw('Повторение', 'Tekrar'), raw('Объяснение', 'Açıklama'), raw('Вопрос', 'Soru'), raw('Ответ', 'Cevap'),
      raw('Домашняя работа', 'Ev ödevi'), raw('Экзамен', 'Sınav'), raw('Читать вслух', 'Sesli okumak'), raw('Запомнить', 'Hatırlamak / ezberlemek'),
    ],
  },
  {
    id: 'culture_arts',
    label: 'Kültür, sanat ve eğlence',
    keywords: ['film', 'sinema', 'konser', 'sanat', 'edebiyat', 'müze', 'tiyatro', 'festival', 'müzik', 'resim', 'kültür'],
    sceneTitle: 'Etkinlik Öncesi Sohbet',
    placeRu: 'в музее',
    placeTr: 'müzede',
    focusTr: 'etkinlik, eser, zevk ve kültür yorumlarını farklı kelimelerle anlatma',
    speakers: ['Ziyaretçi', 'Arkadaş'],
    words: [
      raw('Выставка', 'Sergi'), raw('Картина', 'Tablo'), raw('Скульптура', 'Heykel'), raw('Экскурсия', 'Rehberli tur'),
      raw('Спектакль', 'Tiyatro oyunu'), raw('Сцена', 'Sahne'), raw('Билет на концерт', 'Konser bileti'), raw('Аплодисменты', 'Alkış'),
      raw('Сюжет', 'Konu / olay örgüsü'), raw('Герой фильма', 'Film kahramanı'), raw('Рецензия', 'Eleştiri yazısı'), raw('Впечатление', 'İzlenim'),
      raw('Любимый жанр', 'Favori tür'), raw('Современное искусство', 'Çağdaş sanat'), raw('Книжная полка', 'Kitap rafı'), raw('Творческая встреча', 'Yaratıcı buluşma'),
    ],
  },
  {
    id: 'nature_environment',
    label: 'Doğa, hayvanlar ve çevre',
    keywords: ['hayvan', 'doğa', 'çevre', 'piknik', 'kamp', 'orman', 'deniz', 'hava kirliliği', 'ekoloji', 'bahçe'],
    sceneTitle: 'Doğada Yeni Rota',
    placeRu: 'в парке',
    placeTr: 'parkta',
    focusTr: 'doğa, canlılar, kamp ve çevre koruma ifadelerini yeni örneklerle pekiştirme',
    speakers: ['Gezgin', 'Arkadaş'],
    words: [
      raw('Тропа', 'Patika'), raw('Палатка', 'Çadır'), raw('Костёр', 'Kamp ateşi'), raw('Рюкзак', 'Sırt çantası'),
      raw('Комар', 'Sivrisinek'), raw('Птицы', 'Kuşlar'), raw('Следы животных', 'Hayvan izleri'), raw('Лесной воздух', 'Orman havası'),
      raw('Берег реки', 'Nehir kıyısı'), raw('Собрать мусор', 'Çöp toplamak'), raw('Переработка', 'Geri dönüşüm'), raw('Экономить воду', 'Su tasarrufu yapmak'),
      raw('Заповедник', 'Doğa koruma alanı'), raw('Погодные условия', 'Hava koşulları'), raw('Безопасный маршрут', 'Güvenli rota'), raw('Солнечная поляна', 'Güneşli açıklık'),
    ],
  },
  {
    id: 'religion_tradition',
    label: 'Din, gelenek ve bayram',
    keywords: ['din', 'dua', 'bayram', 'gelenek', 'kültür ve din', 'inanç', 'ramazan', 'kilise', 'cami', 'ritüel'],
    sceneTitle: 'Bayram Ziyareti',
    placeRu: 'в гостях',
    placeTr: 'ziyarette',
    focusTr: 'saygılı konuşma, gelenek, kutlama ve inançla ilgili temel ifadeleri çeşitlendirme',
    speakers: ['Misafir', 'Ev Sahibi'],
    words: [
      raw('Праздничный день', 'Bayram günü'), raw('Традиция', 'Gelenek'), raw('Молитва', 'Dua'), raw('Уважение', 'Saygı'),
      raw('Гость', 'Misafir'), raw('Пожелание', 'Dilek / temenni'), raw('Благодарность', 'Şükran'), raw('Доброе дело', 'İyi amel / iyilik'),
      raw('Пост', 'Oruç'), raw('Семейный стол', 'Aile sofrası'), raw('Подарок детям', 'Çocuklara hediye'), raw('Память предков', 'Ataları anma'),
      raw('Мир в доме', 'Evde huzur'), raw('Соседи', 'Komşular'), raw('Светлый праздник', 'Mübarek / aydınlık bayram'), raw('Поздравлять', 'Kutlamak / tebrik etmek'),
    ],
  },
  {
    id: 'grammar_structure',
    label: 'Gramer ve cümle mantığı',
    keywords: ['gramer', 'ismin', 'padej', 'падеж', 'edat', 'fiil', 'olumsuzluk', 'tonlama', 'deyim', 'atasözü', 'mecaz', 'eş seslilik', 'ironi', 'eşdizim', 'nüans', 'cümle anahtarı', 'cümlede anlam'],
    sceneTitle: 'Kuralı Yeni Örnekle Açma',
    placeRu: 'на доске',
    placeTr: 'tahtada',
    focusTr: 'aynı gramer konusunu yeni teknik terimler ve örnek cümlelerle tekrar etme',
    speakers: ['Öğretmen', 'Öğrenci'],
    words: [
      raw('Окончание', 'Ek / kelime sonu'), raw('Падежный вопрос', 'Hâl sorusu'), raw('Род слова', 'Kelimenin cinsiyeti'), raw('Число', 'Sayı / tekil-çoğul'),
      raw('Вид глагола', 'Fiil görünüşü'), raw('Приставка', 'Önek'), raw('Суффикс', 'Sonek'), raw('Связка', 'Bağlayıcı unsur'),
      raw('Порядок слов', 'Kelime sırası'), raw('Устойчивое выражение', 'Kalıplaşmış ifade'), raw('Скрытый смысл', 'Gizli anlam'), raw('Ироничный оттенок', 'İronik nüans'),
      raw('Контекст решает', 'Bağlam belirler'), raw('Прямое значение', 'Gerçek anlam'), raw('Переносное значение', 'Mecaz anlam'), raw('Типичная ошибка', 'Tipik hata'),
    ],
  },
  {
    id: 'sports_body_beauty',
    label: 'Spor, beden ve bakım',
    keywords: ['spor', 'vücut', 'beden', 'kuaför', 'saç', 'giyim', 'antrenman', 'fitness', 'salon', 'sağlıklı yaşam'],
    sceneTitle: 'Antrenman ve Bakım Planı',
    placeRu: 'в зале',
    placeTr: 'salonda',
    focusTr: 'beden, egzersiz, bakım ve görünüşle ilgili yakın ama yeni kelimeler',
    speakers: ['Antrenör', 'Üye'],
    words: [
      raw('Разминка', 'Isınma'), raw('Тренировка', 'Antrenman'), raw('Подход', 'Set'), raw('Повторение упражнения', 'Egzersiz tekrarı'),
      raw('Растяжка', 'Esneme'), raw('Пульс', 'Nabız'), raw('Осанка', 'Duruş'), raw('Усталость', 'Yorgunluk'),
      raw('Стрижка', 'Saç kesimi'), raw('Укладка', 'Fön / şekillendirme'), raw('Удобная обувь', 'Rahat ayakkabı'), raw('Спортивная форма', 'Spor kıyafeti'),
      raw('Зеркало', 'Ayna'), raw('Восстановление', 'Toparlanma'), raw('Цель на месяц', 'Aylık hedef'), raw('Лёгкая нагрузка', 'Hafif yüklenme'),
    ],
  },
  {
    id: 'advanced_debate',
    label: 'İleri tartışma ve analiz',
    keywords: ['haber', 'analiz', 'görüş', 'felsefe', 'bilim', 'kriz', 'diplomasi', 'politika', 'psikoloji', 'argüman', 'akademik', 'borsa'],
    sceneTitle: 'Fikir Masasında Yeni Tartışma',
    placeRu: 'за круглым столом',
    placeTr: 'yuvarlak masa tartışmasında',
    focusTr: 'kanıt, yorum, bağlam ve karşı görüş bildirme kelimelerini ileri düzeyde çeşitlendirme',
    speakers: ['Analist', 'Muhatap'],
    words: [
      raw('Аргумент', 'Argüman'), raw('Источник данных', 'Veri kaynağı'), raw('Гипотеза', 'Hipotez'), raw('Вывод', 'Sonuç / çıkarım'),
      raw('Противоречие', 'Çelişki'), raw('Уязвимое место', 'Zayıf nokta'), raw('Системный риск', 'Sistemik risk'), raw('Долгосрочный эффект', 'Uzun vadeli etki'),
      raw('Общественный запрос', 'Toplumsal talep'), raw('Экспертная оценка', 'Uzman değerlendirmesi'), raw('Баланс интересов', 'Çıkar dengesi'), raw('Мягкая сила', 'Yumuşak güç'),
      raw('Этическая дилемма', 'Etik ikilem'), raw('Научный подход', 'Bilimsel yaklaşım'), raw('Критическое мышление', 'Eleştirel düşünme'), raw('Смена перспективы', 'Perspektif değişimi'),
    ],
  },
  {
    id: 'emergency_safety',
    label: 'Acil durum ve güvenlik',
    keywords: ['acil', 'güvenlik', 'kaza', 'yangın', 'polis', 'yardım', 'tehlike', 'kayıp', 'problem'],
    sceneTitle: 'Acil Durum Provası',
    placeRu: 'на месте происшествия',
    placeTr: 'olay yerinde',
    focusTr: 'yardım isteme, risk belirtme ve hızlı talimat verme ifadelerini yenileme',
    speakers: ['Kişi', 'Görevli'],
    words: [
      raw('Опасность', 'Tehlike'), raw('Будьте осторожны', 'Dikkatli olun'), raw('Пожарная сигнализация', 'Yangın alarmı'), raw('Запасной выход', 'Acil çıkış'),
      raw('Потерянный документ', 'Kayıp belge'), raw('Сообщить в полицию', 'Polise bildirmek'), raw('Место встречи', 'Buluşma noktası'), raw('Первая помощь', 'İlk yardım'),
      raw('Свидетель', 'Tanık'), raw('Описание человека', 'Kişi tarifi'), raw('Срочно', 'Acilen'), raw('Не паниковать', 'Panik yapmamak'),
      raw('Проверить адрес', 'Adresi kontrol etmek'), raw('Позвать на помощь', 'Yardım çağırmak'), raw('Закрыть дверь', 'Kapıyı kapatmak'), raw('Оставаться на линии', 'Hatta kalmak'),
    ],
  },
];

const GENERAL_PROFILE: ThemeProfile = {
  id: 'general_daily',
  label: 'Gündelik iletişim',
  keywords: [],
  sceneTitle: 'Günlük Hayatta Yeni Mini Sahne',
  placeRu: 'в обычной ситуации',
  placeTr: 'gündelik durumda',
  focusTr: 'aynı seviye için farklı pratik kelimeler ve kısa iletişim kalıpları',
  speakers: ['Kişi 1', 'Kişi 2'],
  words: [
    raw('Ситуация', 'Durum'), raw('Подсказка', 'İpucu'), raw('Вариант', 'Seçenek'), raw('Причина', 'Sebep'),
    raw('Решение', 'Çözüm'), raw('План', 'Plan'), raw('Шаг за шагом', 'Adım adım'), raw('Уточнение', 'Netleştirme'),
    raw('Привычка', 'Alışkanlık'), raw('Новая фраза', 'Yeni ifade'), raw('Короткий ответ', 'Kısa cevap'), raw('Полезное слово', 'Faydalı kelime'),
    raw('Повторить ещё раз', 'Bir kez daha tekrar etmek'), raw('Понять смысл', 'Anlamı kavramak'), raw('Сказать проще', 'Daha basit söylemek'), raw('Готово', 'Hazır / tamam'),
  ],
};

const LEVEL_WORDS: Record<UnitModule['levelGroup'], RawWord[]> = {
  A1: [
    raw('Здесь', 'Burada'), raw('Там', 'Orada'), raw('Можно?', 'Olur mu?'), raw('Нужно', 'Gerekli'), raw('Хочу', 'İstiyorum'), raw('Не знаю', 'Bilmiyorum'), raw('Ещё раз', 'Bir daha'), raw('Хорошая идея', 'İyi fikir'),
  ],
  A2: [
    raw('Сначала', 'Önce'), raw('Потом', 'Sonra'), raw('Обычно', 'Genellikle'), raw('Иногда', 'Bazen'), raw('Если нужно', 'Gerekirse'), raw('Без проблем', 'Sorun değil'), raw('Удобно', 'Uygun / rahat'), raw('Немного позже', 'Biraz sonra'),
  ],
  B1: [
    raw('Обсудить детали', 'Detayları görüşmek'), raw('Предложить вариант', 'Seçenek önermek'), raw('Проверить заранее', 'Önceden kontrol etmek'), raw('Сравнить условия', 'Şartları karşılaştırmak'), raw('Принять решение', 'Karar almak'), raw('Сделать вывод', 'Sonuç çıkarmak'), raw('Уточнить позицию', 'Pozisyonu netleştirmek'), raw('Договориться заранее', 'Önceden anlaşmak'),
  ],
  B2: [
    raw('Сложный контекст', 'Karmaşık bağlam'), raw('Практический подход', 'Pratik yaklaşım'), raw('Гибкая стратегия', 'Esnek strateji'), raw('Взвесить риски', 'Riskleri tartmak'), raw('Убедительный пример', 'İkna edici örnek'), raw('Ключевой фактор', 'Kilit faktör'), raw('Сильная сторона', 'Güçlü taraf'), raw('Слабая сторона', 'Zayıf taraf'),
  ],
  'C1/C2': [
    raw('Многослойный смысл', 'Çok katmanlı anlam'), raw('Тонкое различие', 'İnce ayrım'), raw('Концептуальная рамка', 'Kavramsal çerçeve'), raw('Обоснованная критика', 'Gerekçeli eleştiri'), raw('Неоднозначная трактовка', 'Muğlak yorum'), raw('Риторический ход', 'Retorik hamle'), raw('Сдержанная формулировка', 'Ölçülü ifade'), raw('Контраргумент', 'Karşı argüman'),
  ],
};

const EXTRA_FALLBACK_WORDS: RawWord[] = [
  raw('Новый пример', 'Yeni örnek'), raw('Другая ситуация', 'Başka durum'), raw('Похожая тема', 'Benzer konu'), raw('Живая практика', 'Canlı pratik'),
  raw('Мини-диалог', 'Mini diyalog'), raw('Смысл фразы', 'İfadenin anlamı'), raw('Связь слов', 'Kelimelerin bağlantısı'), raw('Полезный контекст', 'Faydalı bağlam'),
  raw('Естественная речь', 'Doğal konuşma'), raw('Быстрый ответ', 'Hızlı cevap'), raw('Точная фраза', 'Doğru ifade'), raw('Проверка понимания', 'Anlama kontrolü'),
];

function profileFor(unit: UnitModule): ThemeProfile {
  const haystack = normalize(`${unit.title} ${unit.description} ${unit.category} ${unit.icon}`);
  return THEME_PROFILES.find((profile) => profile.keywords.some((keyword) => keywordMatches(haystack, keyword))) ?? GENERAL_PROFILE;
}

function pickDifferentWords(unit: UnitModule, profile: ThemeProfile, index: number): RawWord[] {
  const original = new Set(unit.words.map((word) => normalize(word.ru)));
  const wanted = Math.max(8, Math.min(12, unit.words.length || 10));
  const pool = rotate([
    ...profile.words,
    ...LEVEL_WORDS[unit.levelGroup],
    ...GENERAL_PROFILE.words,
    ...EXTRA_FALLBACK_WORDS,
  ], index * 5 + unit.id.length);
  const seen = new Set<string>();
  const picked: RawWord[] = [];

  for (const candidate of pool) {
    const key = normalize(candidate.ru);
    if (seen.has(key) || original.has(key)) continue;
    seen.add(key);
    picked.push(candidate);
    if (picked.length >= wanted) break;
  }

  return picked;
}

function toWordDetails(words: RawWord[], unit: UnitModule, unitId: string, profile: ThemeProfile): WordDetail[] {
  return words.map((word, index) => ({
    id: `${unitId}_w${String(index + 1).padStart(2, '0')}`,
    ru: word.ru,
    reading: transliterate(word.ru),
    tr: word.tr,
    level: unit.levelGroup,
    usageNote: word.note ?? `${profile.label} temasının alternatif kelime havuzundan gelir; önceki ünitedeki ana konuya benzer, fakat içerik farklıdır.`,
  }));
}

function buildSentences(words: RawWord[], profile: ThemeProfile, index: number): SentenceDrill[] {
  const [a, b, c, d] = rotate(words, index).slice(0, 4);
  return [
    makeSentence(`В этой теме часто звучит «${a.ru}».`, `Bu konuda sıkça “${a.tr}” ifadesi duyulur.`, index + 1),
    makeSentence(`В ${profile.placeRu} полезно помнить «${b.ru}».`, `${profile.placeTr} “${b.tr}” ifadesini hatırlamak işe yarar.`, index + 2),
    makeSentence(`Сначала скажи «${c.ru}», потом уточни детали.`, `Önce “${c.tr}” de, sonra detayları netleştir.`, index + 3),
    makeSentence(`Без фразы «${d.ru}» диалог звучит беднее.`, `“${d.tr}” ifadesi olmadan diyalog daha eksik kalır.`, index + 4),
  ];
}

function buildDialogue(words: RawWord[], profile: ThemeProfile, index: number): DialogueLine[] {
  const [a, b, c, d, e] = rotate(words, index * 2).slice(0, 5);
  const [firstSpeaker, secondSpeaker] = profile.speakers;
  const lines = [
    {
      speaker: firstSpeaker,
      ru: `У нас новая ситуация ${profile.placeRu}. Мне пригодится «${a.ru}».`,
      tr: `${profile.placeTr} yeni bir durum var. “${a.tr}” işime yarayacak.`,
    },
    {
      speaker: secondSpeaker,
      ru: `Хорошо. Добавь «${b.ru}» и не забудь «${c.ru}».`,
      tr: `Tamam. “${b.tr}” ekle ve “${c.tr}” ifadesini unutma.`,
    },
    {
      speaker: firstSpeaker,
      ru: `Если меня спросят, я отвечу коротко: «${d.ru}».`,
      tr: `Bana sorarlarsa kısa cevap vereceğim: “${d.tr}”.`,
    },
    {
      speaker: secondSpeaker,
      ru: `Отлично. В конце можно сказать «${e.ru}», и речь станет естественнее.`,
      tr: `Harika. Sonda “${e.tr}” denebilir; konuşma daha doğal olur.`,
    },
  ];

  return lines.map((line) => ({ ...line, reading: transliterate(line.ru) }));
}

function buildGrammarExplain(unit: UnitModule, profile: ThemeProfile): string {
  return `📌 BENZER KONU — FARKLI İÇERİK:\n1. Bu ek ünite "${unit.title}" konusuna yakın ilerler; amaç aynı iletişim alanını yeni kelimelerle ikinci kez çalışmaktır.\n2. Odak: ${profile.focusTr}.\n3. Cümle ve diyaloglar önceki üniteden kopya değildir; yeni kelime havuzu, yeni mini sahne ve farklı sıralama kullanılır.`;
}

export function createMirrorUnits(sourceUnits: UnitModule[], startUnitNumber?: number): UnitModule[] {
  const sortedSource = [...sourceUnits].sort((a, b) => a.unitNumber - b.unitNumber || a.id.localeCompare(b.id));
  const firstMirrorNumber = startUnitNumber ?? Math.ceil(Math.max(...sortedSource.map((unit) => unit.unitNumber))) + 1;

  return sortedSource.map((unit, index) => {
    const profile = profileFor(unit);
    const unitId = `mirror_${String(index + 1).padStart(4, '0')}_${safeId(unit.id)}`;
    const rawWords = pickDifferentWords(unit, profile, index);

    return {
      ...unit,
      id: unitId,
      unitNumber: firstMirrorNumber + index,
      title: `Benzer Konu: ${unit.title}`,
      description: `${unit.description} — aynı konu ailesinde, fakat farklı kelime ve sahne içeriğiyle ek pratik.`,
      category: unit.category,
      grammarExplain: buildGrammarExplain(unit, profile),
      words: toWordDetails(rawWords, unit, unitId, profile),
      sentences: buildSentences(rawWords, profile, index),
      sceneTitle: `${profile.sceneTitle}: ${unit.title}`,
      sceneContext: `Bu ek ünite, "${unit.title}" temasına benzer bir bağlam kurar; konu tanıdık kalır ama kelimeler, örnek cümleler ve diyalog satırları yenidir.`,
      dialogue: buildDialogue(rawWords, profile, index),
      smeshariki: undefined,
    };
  });
}
