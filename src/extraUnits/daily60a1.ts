// ==========================================================
// GÜNDELİK HAYAT GENİŞLEMESİ — 60 ÜNİTE / BÖLÜM 1: A1 (20 ünite)
// unitNumber: 10.9721 – 10.9740
// Odak: evde, sokakta, markette her gün gerçekten kullanılan diller.
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const DAILY60_A1: UnitModule[] = [
  {
    id: 'd60_a1_hygiene', unitNumber: 10.9721, levelGroup: 'A1',
    title: 'Sabah Bakımı', description: 'Diş fırçala, duş al, hazırlan',
    category: 'Günlük Hayat', color: '#0ea5e9', icon: '🪥',
    grammarExplain: `📌 DÖNÜŞLÜ GÜNLÜK FİİLLER:
1. Kendine yaptığın işler -ся ile biter: умываться (yüzünü yıkamak), причёсываться (taranmak).
2. Bir nesneye yapılıyorsa -ся düşer: чистить зубы (diş fırçalamak) — "kendini fırçalamak" denmez.
3. Sıra anlatımı: сначала… потом… (önce… sonra…).`,
    words: [
      W('d60a1hy_1', 'Умываться', 'Umıvátsa', 'Yüzünü yıkamak', 'A1', 'Sabah rutininin ilk fiili.'),
      W('d60a1hy_2', 'Чистить зубы', 'Çístit zúbı', 'Diş fırçalamak', 'A1', 'Sabit eşdizim; "мыть зубы" denmez.'),
      W('d60a1hy_3', 'Душ', 'Duş', 'Duş', 'A1', 'Принять душ = duş almak.'),
      W('d60a1hy_4', 'Полотенце', 'Palatyéntse', 'Havlu', 'A1', 'Nötr cinstir.'),
      W('d60a1hy_5', 'Мыло', 'Míla', 'Sabun', 'A1', 'Sıvı sabun жидкое мыло.'),
      W('d60a1hy_6', 'Расчёска', 'Raşşóska', 'Tarak', 'A1', 'Ё vurguludur.')
    ],
    sentences: [
      S('Сначала я умываюсь, потом чищу зубы.', 'Önce yüzümü yıkarım, sonra dişlerimi fırçalarım.'),
      S('Я принимаю душ каждое утро.', 'Her sabah duş alırım.'),
      S('Где чистое полотенце?', 'Temiz havlu nerede?')
    ]
  },
  {
    id: 'd60_a1_cleaning', unitNumber: 10.9722, levelGroup: 'A1',
    title: 'Ev İşleri', description: 'Süpür, sil, topla',
    category: 'Günlük Hayat', color: '#22c55e', icon: '🧹',
    grammarExplain: `📌 RİCA VE GÖREV PAYLAŞIMI:
1. Nazik rica: Помой, пожалуйста, посуду. (Lütfen bulaşıkları yıka.)
2. "Sıra sende" = Твоя очередь.
3. "…-mem gerek" = Мне нужно + mastar: Мне нужно убрать комнату.`,
    words: [
      W('d60a1cl_1', 'Убирать', 'Ubirát', 'Toplamak / Temizlemek', 'A1', 'Убираться в квартире = evi toplamak.'),
      W('d60a1cl_2', 'Мыть посуду', 'Mıt pasúdu', 'Bulaşık yıkamak', 'A1', 'посуда tek kelimeyle tüm bulaşığı anlatır.'),
      W('d60a1cl_3', 'Пылесос', 'Pılisós', 'Elektrikli süpürge', 'A1', '"Toz emen" anlamında bileşik kelime.'),
      W('d60a1cl_4', 'Мусор', 'Músar', 'Çöp', 'A1', 'Выносить мусор = çöpü çıkarmak.'),
      W('d60a1cl_5', 'Стирать', 'Stirát', 'Çamaşır yıkamak', 'A1', 'Bulaşık için мыть, çamaşır için стирать.'),
      W('d60a1cl_6', 'Грязный', 'Gryáznıy', 'Kirli', 'A1', 'Karşıtı чистый.')
    ],
    sentences: [
      S('Мне нужно убрать комнату.', 'Odayı toplamam gerek.'),
      S('Помой, пожалуйста, посуду.', 'Lütfen bulaşıkları yıka.'),
      S('Кто вынесет мусор?', 'Çöpü kim çıkaracak?')
    ]
  },
  {
    id: 'd60_a1_breakfast', unitNumber: 10.9723, levelGroup: 'A1',
    title: 'Kahvaltı Sofrası', description: 'Sabah ne yiyip içiyorsun?',
    category: 'Günlük Hayat', color: '#f59e0b', icon: '🍳',
    grammarExplain: `📌 "С" İLE EŞLİK:
1. "…-li" demek için с + araç hâli: чай с сахаром (şekerli çay), хлеб с маслом (tereyağlı ekmek).
2. "…-siz" ise без + tamlayan: кофе без сахара.
3. Tercih: Я обычно пью… (Genelde … içerim.)`,
    words: [
      W('d60a1br_1', 'Завтрак', 'Záftrak', 'Kahvaltı', 'A1', 'В harfi F okunur.'),
      W('d60a1br_2', 'Бутерброд', 'Butirbrót', 'Sandviç / Tereyağlı ekmek', 'A1', 'Almancadan gelir; tek dilim ekmek üstü yiyecektir.'),
      W('d60a1br_3', 'Каша', 'Káşa', 'Lapa', 'A1', 'Rus kahvaltısının klasiği.'),
      W('d60a1br_4', 'Кофе', 'Kófye', 'Kahve', 'A1', 'Çekimsizdir; geleneksel olarak eril sayılır.'),
      W('d60a1br_5', 'Сахар', 'Sáhar', 'Şeker', 'A1', 'С сахаром / без сахара.'),
      W('d60a1br_6', 'Голодный', 'Galódnıy', 'Aç', 'A1', 'Я голоден (erkek) / голодна (kadın).')
    ],
    sentences: [
      S('Я пью чай с сахаром.', 'Şekerli çay içerim.'),
      S('На завтрак я ем кашу.', 'Kahvaltıda lapa yerim.'),
      S('Я очень голоден.', 'Çok açım.')
    ]
  },
  {
    id: 'd60_a1_numbers100', unitNumber: 10.9724, levelGroup: 'A1',
    title: 'Sayılar 20–100 ve Fiyatlar', description: 'Kasada rakamları anla',
    category: 'Günlük Hayat', color: '#16a34a', icon: '💵',
    grammarExplain: `📌 FİYATI DUYMAK:
1. Onluklar: двадцать, тридцать, сорок, пятьдесят, шестьдесят, семьдесят, восемьдесят, девяносто, сто.
2. сорок (40) ve девяносто (90) kural dışıdır, ezberlenir.
3. Fiyat: сто пятьдесят рублей (150 ruble) — sayı + рублей.`,
    words: [
      W('d60a1nu_1', 'Тридцать', 'Trítsat', 'Otuz', 'A1', '-дцать eki "on" demektir.'),
      W('d60a1nu_2', 'Сорок', 'Sórak', 'Kırk', 'A1', 'Kural dışı; "çetvertik" kürk demeti sayımından gelir.'),
      W('d60a1nu_3', 'Пятьдесят', 'Pitdisyát', 'Elli', 'A1', 'Vurgu sondadır.'),
      W('d60a1nu_4', 'Девяносто', 'Divinósta', 'Doksan', 'A1', 'Tek kural dışı onluk.'),
      W('d60a1nu_5', 'Сто', 'Sto', 'Yüz', 'A1', 'Двести = iki yüz.'),
      W('d60a1nu_6', 'Всего', 'Fsivó', 'Toplam', 'A1', 'Г, V okunur: Всего сто рублей.')
    ],
    sentences: [
      S('Всего сто пятьдесят рублей.', 'Toplam yüz elli ruble.'),
      S('Это стоит сорок рублей.', 'Bu kırk ruble.'),
      S('У меня только сто рублей.', 'Sadece yüz rublem var.')
    ]
  },
  {
    id: 'd60_a1_shopsmall', unitNumber: 10.9725, levelGroup: 'A1',
    title: 'Küçük Alışveriş', description: 'İstemek, göstermek, denemek',
    category: 'Günlük Hayat', color: '#ec4899', icon: '🛍️',
    grammarExplain: `📌 MAĞAZADA ÜÇ KALIP:
1. İstek: Дайте, пожалуйста… (Lütfen … verin.)
2. Gösterme: Покажите, пожалуйста… (Lütfen … gösterin.)
3. İzin sorma: Можно посмотреть? (Bakabilir miyim?) / Можно примерить? (Deneyebilir miyim?)`,
    words: [
      W('d60a1sh_1', 'Дайте', 'Dáyti', 'Verin', 'A1', 'Emir kipi; пожалуйста ile kibarlaşır.'),
      W('d60a1sh_2', 'Покажите', 'Pakajíti', 'Gösterin', 'A1', 'Vitrindeki ürün için birebir kalıp.'),
      W('d60a1sh_3', 'Примерить', 'Primyérit', 'Denemek (giysi)', 'A1', 'Примерочная = kabin.'),
      W('d60a1sh_4', 'Размер', 'Razmyér', 'Beden', 'A1', 'Какой у вас размер?'),
      W('d60a1sh_5', 'Пакет', 'Pakyét', 'Poşet', 'A1', 'Пакет нужен? = Poşet ister misiniz?'),
      W('d60a1sh_6', 'Касса', 'Kássa', 'Kasa', 'A1', 'Оплата на кассе = ödeme kasada.')
    ],
    sentences: [
      S('Покажите, пожалуйста, вот это.', 'Lütfen şunu gösterin.'),
      S('Можно примерить?', 'Deneyebilir miyim?'),
      S('Пакет не нужен, спасибо.', 'Poşet gerekmiyor, teşekkürler.')
    ]
  },
  {
    id: 'd60_a1_neighbors', unitNumber: 10.9726, levelGroup: 'A1',
    title: 'Apartman ve Komşular', description: 'Kat, daire, asansör',
    category: 'Günlük Hayat', color: '#8b5cf6', icon: '🏢',
    grammarExplain: `📌 ADRES SÖYLEMEK:
1. Sıra sayısıyla kat: на пятом этаже (beşinci katta).
2. Daire numarası: квартира двадцать три.
3. Rusya'da "birinci kat" zemin kattır; Türkiye'deki gibi bir üstü değildir.`,
    words: [
      W('d60a1ne_1', 'Этаж', 'Etáj', 'Kat', 'A1', 'Vurgu sondadır: на этажé.'),
      W('d60a1ne_2', 'Квартира', 'Kvartíra', 'Daire', 'A1', 'Kısaltması кв.'),
      W('d60a1ne_3', 'Лифт', 'Lift', 'Asansör', 'A1', 'Лифт не работает = asansör bozuk.'),
      W('d60a1ne_4', 'Подъезд', 'Padyést', 'Apartman girişi', 'A1', 'Rus binalarında numaralı bölümdür.'),
      W('d60a1ne_5', 'Сосед', 'Sasyét', 'Komşu', 'A1', 'Dişili соседка.'),
      W('d60a1ne_6', 'Ключ', 'Klyuç', 'Anahtar', 'A1', 'Aynı kelime "pınar" da demektir.')
    ],
    sentences: [
      S('Я живу на пятом этаже.', 'Beşinci katta oturuyorum.'),
      S('Лифт сегодня не работает.', 'Asansör bugün çalışmıyor.'),
      S('Наши соседи очень тихие.', 'Komşularımız çok sessiz.')
    ]
  },
  {
    id: 'd60_a1_pets', unitNumber: 10.9727, levelGroup: 'A1',
    title: 'Evcil Hayvanlar', description: 'Besle, gezdir, sev',
    category: 'Günlük Hayat', color: '#f97316', icon: '🐕',
    grammarExplain: `📌 SAHİPLİK VE BAKIM:
1. "…-im var" = У меня есть кот.
2. Besleme: кормить кого чем — кормить кота рыбой (kediyi balıkla beslemek).
3. Gezdirme: гулять с собакой (köpekle yürümek), с + araç hâli.`,
    words: [
      W('d60a1pe_1', 'Кот', 'Kot', 'Kedi (erkek)', 'A1', 'Dişi kedi кошка.'),
      W('d60a1pe_2', 'Собака', 'Sabáka', 'Köpek', 'A1', 'Cinsiyetten bağımsız dişil kelimedir.'),
      W('d60a1pe_3', 'Кормить', 'Karmít', 'Beslemek', 'A1', 'Корм = mama.'),
      W('d60a1pe_4', 'Гулять', 'Gulyát', 'Gezmek / Yürümek', 'A1', 'Гулять с собакой.'),
      W('d60a1pe_5', 'Ветеринар', 'Vitirinár', 'Veteriner', 'A1', 'Kısaltması ветврач.'),
      W('d60a1pe_6', 'Миска', 'Míska', 'Mama kabı', 'A1', 'Küçük kâse anlamındadır.')
    ],
    sentences: [
      S('У меня есть кот и собака.', 'Bir kedim ve bir köpeğim var.'),
      S('Я гуляю с собакой каждый вечер.', 'Her akşam köpeğimi gezdiririm.'),
      S('Не забудь покормить кота.', 'Kediyi beslemeyi unutma.')
    ]
  },
  {
    id: 'd60_a1_children', unitNumber: 10.9728, levelGroup: 'A1',
    title: 'Çocuklar ve Oyun', description: 'Oyun parkı, oyuncak, uyku',
    category: 'Günlük Hayat', color: '#facc15', icon: '🧸',
    grammarExplain: `📌 ÇOCUKLA KONUŞMA DİLİ:
1. Emirler kısa ve samimidir: Иди сюда! (Buraya gel!) Осторожно! (Dikkat!)
2. Küçültme ekleri bol kullanılır: ручка, ножка, котик.
3. "Oyun oynamak" = играть в + belirtme hâli: играть в мяч.`,
    words: [
      W('d60a1ch_1', 'Ребёнок', 'Ribyónak', 'Çocuk', 'A1', 'Çoğulu kural dışı: дети.'),
      W('d60a1ch_2', 'Игрушка', 'İgrúşka', 'Oyuncak', 'A1', 'играть fiilinden.'),
      W('d60a1ch_3', 'Площадка', 'Ploşşátka', 'Oyun parkı', 'A1', 'Детская площадка tam adıdır.'),
      W('d60a1ch_4', 'Осторожно', 'Astarójna', 'Dikkat', 'A1', 'Uyarı levhalarında da görülür.'),
      W('d60a1ch_5', 'Спать', 'Spat', 'Uyumak', 'A1', 'Пора спать = uyku vakti.'),
      W('d60a1ch_6', 'Плакать', 'Plákat', 'Ağlamak', 'A1', 'Не плачь! = Ağlama!')
    ],
    sentences: [
      S('Дети играют на площадке.', 'Çocuklar oyun parkında oynuyor.'),
      S('Осторожно, там ступенька!', 'Dikkat, orada basamak var!'),
      S('Пора спать, уже поздно.', 'Uyku vakti, saat geç oldu.')
    ]
  },
  {
    id: 'd60_a1_door', unitNumber: 10.9729, levelGroup: 'A1',
    title: 'Kapıda: Zil, Kurye, Misafir', description: 'Kim o? Geliyorum!',
    category: 'Günlük Hayat', color: '#0891b2', icon: '🚪',
    grammarExplain: `📌 KAPI DİYALOĞU:
1. Soru: Кто там? (Kim o?)
2. Cevap: Это я. / Курьер. / Соседи.
3. Davet: Входите, пожалуйста! (Buyurun, girin!) — resmî çoğul emir.`,
    words: [
      W('d60a1do_1', 'Звонок', 'Zvanók', 'Zil', 'A1', 'Aynı kelime "telefon araması" demektir.'),
      W('d60a1do_2', 'Курьер', 'Kuryér', 'Kurye', 'A1', 'Online alışverişin günlük kelimesi.'),
      W('d60a1do_3', 'Входите', 'Fhadíti', 'Girin', 'A1', 'Kibar davet kalıbı.'),
      W('d60a1do_4', 'Подождите', 'Padajdíti', 'Bekleyin', 'A1', 'Секунду, подождите! = Bir saniye!'),
      W('d60a1do_5', 'Открыть', 'Atkrít', 'Açmak', 'A1', 'Karşıtı закрыть.'),
      W('d60a1do_6', 'Замок', 'Zamók', 'Kilit', 'A1', 'Vurgu sonda = kilit, başta = şato.')
    ],
    sentences: [
      S('Кто там? — Это курьер.', 'Kim o? — Kurye.'),
      S('Подождите секунду, открываю!', 'Bir saniye bekleyin, açıyorum!'),
      S('Входите, пожалуйста.', 'Buyurun, girin.')
    ]
  },
  {
    id: 'd60_a1_clock', unitNumber: 10.973, levelGroup: 'A1',
    title: 'Saat Söyleme', description: 'Kaçta? Yarım, çeyrek, buçuk',
    category: 'Günlük Hayat', color: '#6366f1', icon: '🕐',
    grammarExplain: `📌 SAAT KALIPLARI:
1. Tam saat: Сейчас три часа. (Saat üç.) 1 → час, 2-4 → часа, 5+ → часов.
2. "…-de" = в: в три часа (üçte).
3. Günlük konuşmada yarım saat: полтретьего (iki buçuk) — "üçün yarısı" mantığıyla kurulur, dikkat!`,
    words: [
      W('d60a1cl2_1', 'Час', 'Ças', 'Saat', 'A1', 'Hem birim hem "saat 1".'),
      W('d60a1cl2_2', 'Минута', 'Minúta', 'Dakika', 'A1', 'Минутку! = Bir dakika!'),
      W('d60a1cl2_3', 'Полчаса', 'Palçisá', 'Yarım saat', 'A1', 'Tek kelime yazılır.'),
      W('d60a1cl2_4', 'Опаздывать', 'Apázdıvat', 'Geç kalmak', 'A1', 'Я опаздываю = Geç kalıyorum.'),
      W('d60a1cl2_5', 'Рано', 'Rána', 'Erken', 'A1', 'Karşıtı поздно.'),
      W('d60a1cl2_6', 'Будильник', 'Budílnik', 'Çalar saat', 'A1', 'будить (uyandırmak) fiilinden.')
    ],
    sentences: [
      S('Сколько сейчас времени?', 'Saat kaç?'),
      S('Встреча в три часа.', 'Buluşma saat üçte.'),
      S('Извини, я немного опаздываю.', 'Kusura bakma, biraz geç kalıyorum.')
    ]
  },
  {
    id: 'd60_a1_goodbye', unitNumber: 10.9731, levelGroup: 'A1',
    title: 'Vedalaşma ve Nezaket', description: 'Görüşürüz, iyi günler',
    category: 'Günlük Hayat', color: '#14b8a6', icon: '👋',
    grammarExplain: `📌 VEDA KALIPLARI:
1. Resmî: До свидания. Samimi: Пока.
2. Dilek kalıbı tamlayan hâldedir: Хорошего дня! Удачи! Счастливого пути!
3. "Görüşürüz" = Увидимся / До встречи.`,
    words: [
      W('d60a1gb_1', 'До свидания', 'Da svidániya', 'Hoşça kalın', 'A1', 'Resmî standart veda.'),
      W('d60a1gb_2', 'Пока', 'Paká', 'Görüşürüz / Hoşça kal', 'A1', 'Sadece samimi ilişkilerde.'),
      W('d60a1gb_3', 'Удачи', 'Udáçi', 'Bol şans', 'A1', 'Tamlayan hâlde donmuş dilek.'),
      W('d60a1gb_4', 'Хорошего дня', 'Haróşiva dnya', 'İyi günler', 'A1', 'Kasiyerler ve garsonlar sık söyler.'),
      W('d60a1gb_5', 'Спокойной ночи', 'Spakóynay nóçi', 'İyi geceler', 'A1', '"Sakin gece" anlamındadır.'),
      W('d60a1gb_6', 'Береги себя', 'Birigí sibyá', 'Kendine iyi bak', 'A1', 'Samimi, sıcak veda.')
    ],
    sentences: [
      S('До свидания, хорошего дня!', 'Hoşça kalın, iyi günler!'),
      S('Пока, увидимся завтра.', 'Görüşürüz, yarın görüşmek üzere.'),
      S('Удачи тебе на экзамене!', 'Sınavda bol şans!')
    ]
  },
  {
    id: 'd60_a1_requests', unitNumber: 10.9732, levelGroup: 'A1',
    title: 'Küçük Ricalar', description: 'Yardım iste, izin al',
    category: 'Günlük Hayat', color: '#a855f7', icon: '🙏',
    grammarExplain: `📌 RİCANIN ÜÇ SEVİYESİ:
1. Emir + пожалуйста: Помогите, пожалуйста. (Yardım edin lütfen.)
2. Soru biçimi daha kibar: Вы не могли бы помочь?
3. İzin: Можно…? (…-ebilir miyim?) — Можно войти? Можно спросить?`,
    words: [
      W('d60a1rq_1', 'Помогите', 'Pamagíti', 'Yardım edin', 'A1', 'Acil durumda tek başına bağırılır.'),
      W('d60a1rq_2', 'Можно', 'Mójna', '…-ebilir miyim', 'A1', 'Kişisiz izin kalıbı.'),
      W('d60a1rq_3', 'Нельзя', 'Nilzyá', 'Yasak / Olmaz', 'A1', 'можно kelimesinin karşıtı.'),
      W('d60a1rq_4', 'Повторите', 'Paftaríti', 'Tekrar edin', 'A1', 'Anlamadığında ilk cümlen olmalı.'),
      W('d60a1rq_5', 'Помедленнее', 'Pamyédlinniye', 'Biraz daha yavaş', 'A1', 'Говорите помедленнее, пожалуйста.'),
      W('d60a1rq_6', 'Конечно', 'Kanyéşna', 'Tabii ki', 'A1', 'ЧН burada "şn" okunur.')
    ],
    sentences: [
      S('Повторите, пожалуйста, помедленнее.', 'Lütfen biraz daha yavaş tekrar edin.'),
      S('Можно задать вопрос?', 'Bir soru sorabilir miyim?'),
      S('Здесь курить нельзя.', 'Burada sigara içmek yasak.')
    ]
  },
  {
    id: 'd60_a1_cafeorder', unitNumber: 10.9733, levelGroup: 'A1',
    title: 'Kafede Sipariş', description: 'Bir kahve lütfen',
    category: 'Günlük Hayat', color: '#b45309', icon: '☕',
    grammarExplain: `📌 SİPARİŞ KALIBI:
1. En pratik yol: Мне, пожалуйста, кофе. (Bana bir kahve lütfen.)
2. "Yanında" = и ещё…: И ещё воду, пожалуйста.
3. Garson sorar: Это всё? (Hepsi bu mu?) — cevabın: Да, всё.`,
    words: [
      W('d60a1cf_1', 'Меню', 'Minyú', 'Menü', 'A1', 'Çekimsizdir, nötr cinstir.'),
      W('d60a1cf_2', 'Чашка', 'Çáşka', 'Fincan', 'A1', 'Чашка кофе = bir fincan kahve.'),
      W('d60a1cf_3', 'Вода', 'Vadá', 'Su', 'A1', 'Без газа = gazsız, с газом = gazlı.'),
      W('d60a1cf_4', 'Счёт', 'Şşot', 'Hesap', 'A1', 'Счёт, пожалуйста = hesap lütfen.'),
      W('d60a1cf_5', 'С собой', 'S sabóy', 'Paket / Yanımda götüreceğim', 'A1', 'Kafede kilit kalıptır.'),
      W('d60a1cf_6', 'Вкусно', 'Fkúsna', 'Lezzetli', 'A1', 'Очень вкусно! = Çok lezzetli!')
    ],
    sentences: [
      S('Мне, пожалуйста, кофе с собой.', 'Bana bir kahve lütfen, paket olsun.'),
      S('И ещё воду без газа.', 'Bir de gazsız su.'),
      S('Счёт, пожалуйста.', 'Hesap lütfen.')
    ]
  },
  {
    id: 'd60_a1_walk', unitNumber: 10.9734, levelGroup: 'A1',
    title: 'Parkta Yürüyüş', description: 'Hava almak, oturmak, dinlenmek',
    category: 'Günlük Hayat', color: '#65a30d', icon: '🌳',
    grammarExplain: `📌 "НА УЛИЦЕ" KALIBI:
1. "Dışarıda" = на улице (kelime kelime "sokakta").
2. "Yürüyüşe çıkmak" = пойти гулять.
3. "…-de oturmak" = сидеть на скамейке (bankta oturmak).`,
    words: [
      W('d60a1wa_1', 'Парк', 'Park', 'Park', 'A1', 'В парке = parkta.'),
      W('d60a1wa_2', 'Скамейка', 'Skamyéyka', 'Bank', 'A1', 'Скамья daha resmî biçimidir.'),
      W('d60a1wa_3', 'Свежий воздух', 'Svyéjiy vózduh', 'Temiz hava', 'A1', 'Подышать свежим воздухом.'),
      W('d60a1wa_4', 'Дерево', 'Dyériva', 'Ağaç', 'A1', 'Çoğulu kural dışı: деревья.'),
      W('d60a1wa_5', 'Отдых', 'Óddıh', 'Dinlenme', 'A1', 'отдыхать fiilinden.'),
      W('d60a1wa_6', 'Красиво', 'Krasíva', 'Güzel (şekilde)', 'A1', 'Как здесь красиво! = Burası ne güzel!')
    ],
    sentences: [
      S('Сегодня хорошая погода, пойдём гулять.', 'Bugün hava güzel, yürüyüşe çıkalım.'),
      S('Давай сядем на скамейку.', 'Hadi banka oturalım.'),
      S('Как здесь красиво!', 'Burası ne kadar güzel!')
    ]
  },
  {
    id: 'd60_a1_aisles', unitNumber: 10.9735, levelGroup: 'A1',
    title: 'Market Reyonları', description: 'Neyi nerede bulurum?',
    category: 'Günlük Hayat', color: '#0284c7', icon: '🛒',
    grammarExplain: `📌 YER SORMA:
1. Где я могу найти…? (…-i nerede bulabilirim?)
2. Cevap: В третьем ряду. (Üçüncü sırada.) / Справа от входа.
3. Yokluk: Этого сейчас нет. (Şu an yok.) — tamlayan hâl kullanılır.`,
    words: [
      W('d60a1ai_1', 'Молочный отдел', 'Malóçnıy addyél', 'Süt ürünleri reyonu', 'A1', 'отдел = reyon/bölüm.'),
      W('d60a1ai_2', 'Овощи', 'Óvaşşi', 'Sebzeler', 'A1', 'Tekili овощ, genelde çoğul kullanılır.'),
      W('d60a1ai_3', 'Фрукты', 'Frúktı', 'Meyveler', 'A1', 'Tekili фрукт.'),
      W('d60a1ai_4', 'Тележка', 'Tilyéjka', 'Alışveriş arabası', 'A1', 'Sepet ise корзина.'),
      W('d60a1ai_5', 'Очередь', 'Óçirit', 'Sıra / Kuyruk', 'A1', 'Стоять в очереди = sırada beklemek.'),
      W('d60a1ai_6', 'Найти', 'Naytí', 'Bulmak', 'A1', 'Не могу найти = Bulamıyorum.')
    ],
    sentences: [
      S('Где я могу найти молочный отдел?', 'Süt ürünleri reyonunu nerede bulabilirim?'),
      S('Овощи и фрукты справа от входа.', 'Sebze ve meyveler girişin sağında.'),
      S('Здесь большая очередь.', 'Burada uzun bir kuyruk var.')
    ]
  },
  {
    id: 'd60_a1_sleep', unitNumber: 10.9736, levelGroup: 'A1',
    title: 'Uyku ve Dinlenme', description: 'Yorgunum, uykum var',
    category: 'Günlük Hayat', color: '#4338ca', icon: '😴',
    grammarExplain: `📌 KİŞİSİZ HÂL BİLDİRME:
1. Bedensel durumlar yönelme hâliyle: Мне холодно. Мне жарко. Мне хочется спать.
2. "Uykum var" = Я хочу спать / Мне хочется спать.
3. "İyi uyudum" = Я хорошо выспался (erkek) / выспалась (kadın).`,
    words: [
      W('d60a1sl_1', 'Устать', 'Ustát', 'Yorulmak', 'A1', 'Я устал / устала.'),
      W('d60a1sl_2', 'Выспаться', 'Víspatsa', 'İyice uyumak', 'A1', 'Не выспался = uykusunu alamadı.'),
      W('d60a1sl_3', 'Подушка', 'Padúşka', 'Yastık', 'A1', 'ухо (kulak) köküyle akrabadır.'),
      W('d60a1sl_4', 'Одеяло', 'Adiyála', 'Yorgan', 'A1', 'одевать (giydirmek) kökünden.'),
      W('d60a1sl_5', 'Кровать', 'Kravát', 'Yatak', 'A1', 'Dişildir.'),
      W('d60a1sl_6', 'Отдохнуть', 'Addahnút', 'Dinlenmek (biraz)', 'A1', 'Tamamlanmış biçimdir.')
    ],
    sentences: [
      S('Я очень устал, хочу спать.', 'Çok yoruldum, uyumak istiyorum.'),
      S('Сегодня я хорошо выспался.', 'Bugün iyi uyudum.'),
      S('Тебе нужно отдохнуть.', 'Dinlenmen gerekiyor.')
    ]
  },
  {
    id: 'd60_a1_reactions', unitNumber: 10.9737, levelGroup: 'A1',
    title: 'Günlük Tepki Sözleri', description: 'Ünlemler ve kısa cevaplar',
    category: 'Günlük Hayat', color: '#e11d48', icon: '💬',
    grammarExplain: `📌 KISA TEPKİLER:
1. Rusça konuşmada tam cümle şart değildir: Правда? Ясно. Ладно.
2. Onay: Договорились! (Anlaştık!)
3. Şaşkınlık: Серьёзно? (Cidden mi?) — tonlamayla anlamı güçlenir.`,
    words: [
      W('d60a1re_1', 'Ясно', 'Yásna', 'Anlaşıldı', 'A1', 'Kısa, nötr onay.'),
      W('d60a1re_2', 'Ладно', 'Ládna', 'Peki / Tamam', 'A1', 'Samimi kabul.'),
      W('d60a1re_3', 'Серьёзно', 'Siryózna', 'Cidden mi', 'A1', 'Soru tonuyla şaşkınlık bildirir.'),
      W('d60a1re_4', 'Договорились', 'Dagavarílis', 'Anlaştık', 'A1', 'Plan yapmanın kapanış cümlesi.'),
      W('d60a1re_5', 'Жаль', 'Jal', 'Yazık', 'A1', 'Как жаль! = Ne yazık!'),
      W('d60a1re_6', 'Не за что', 'Ni za şto', 'Rica ederim', 'A1', 'Teşekküre verilen samimi cevap.')
    ],
    sentences: [
      S('Ясно, спасибо большое.', 'Anlaşıldı, çok teşekkürler.'),
      S('Встретимся в шесть? — Договорились!', 'Altıda buluşalım mı? — Anlaştık!'),
      S('Как жаль, что ты не смог прийти.', 'Gelemediğin için ne yazık.')
    ]
  },
  {
    id: 'd60_a1_furniture', unitNumber: 10.9738, levelGroup: 'A1',
    title: 'Ev Eşyaları ve Mobilya', description: 'Evin içini tarif et',
    category: 'Günlük Hayat', color: '#92400e', icon: '🛋️',
    grammarExplain: `📌 VAR/YOK İLE ODA TARİFİ:
1. "…-de … var" = В комнате есть диван.
2. Yokluk tamlayan hâl ister: В комнате нет стола.
3. Konum: у окна (pencerenin yanında), в углу (köşede).`,
    words: [
      W('d60a1fu_1', 'Диван', 'Diván', 'Kanepe', 'A1', 'Türkçeyle ortak kökten gelir.'),
      W('d60a1fu_2', 'Шкаф', 'Şkaf', 'Dolap', 'A1', 'В шкафу = dolapta (kural dışı hâl).'),
      W('d60a1fu_3', 'Стул', 'Stul', 'Sandalye', 'A1', 'Çoğulu kural dışı: стулья.'),
      W('d60a1fu_4', 'Холодильник', 'Haladílnik', 'Buzdolabı', 'A1', 'холод (soğuk) kökünden.'),
      W('d60a1fu_5', 'Зеркало', 'Zérkala', 'Ayna', 'A1', 'Nötr cinstir.'),
      W('d60a1fu_6', 'Полка', 'Pólka', 'Raf', 'A1', 'Kitaplık книжная полка.')
    ],
    sentences: [
      S('В комнате есть диван и шкаф.', 'Odada bir kanepe ve dolap var.'),
      S('Молоко в холодильнике.', 'Süt buzdolabında.'),
      S('Поставь стул у окна.', 'Sandalyeyi pencerenin yanına koy.')
    ]
  },
  {
    id: 'd60_a1_weekend', unitNumber: 10.9739, levelGroup: 'A1',
    title: 'Hafta Sonu Planı', description: 'Ne yapalım? Hadi gidelim!',
    category: 'Günlük Hayat', color: '#db2777', icon: '📅',
    grammarExplain: `📌 TEKLİF ETMEK:
1. En yaygın kalıp: Давай + gelecek/mastar: Давай пойдём в кино!
2. Çoğul/resmî: Давайте встретимся.
3. Soru: Что будем делать в выходные? (Hafta sonu ne yapacağız?)`,
    words: [
      W('d60a1we_1', 'Выходные', 'Vıhadníye', 'Hafta sonu', 'A1', 'Daima çoğul sıfat-isimdir.'),
      W('d60a1we_2', 'Давай', 'Daváy', 'Hadi', 'A1', 'Teklifin anahtar kelimesi.'),
      W('d60a1we_3', 'Планы', 'Plánı', 'Planlar', 'A1', 'Какие у тебя планы?'),
      W('d60a1we_4', 'Свободен', 'Svabódin', 'Boş / Müsait', 'A1', 'Kadın свободна der.'),
      W('d60a1we_5', 'Занят', 'Zányat', 'Meşgul', 'A1', 'Kadın занята der.'),
      W('d60a1we_6', 'Вместе', 'Vmyésti', 'Birlikte', 'A1', 'Пойдём вместе!')
    ],
    sentences: [
      S('Какие у тебя планы на выходные?', 'Hafta sonu için planların ne?'),
      S('Давай пойдём в кино вместе.', 'Hadi birlikte sinemaya gidelim.'),
      S('В субботу я занят, а в воскресенье свободен.', 'Cumartesi meşgulüm ama pazar boşum.')
    ]
  },
  {
    id: 'd60_a1_smallhealth', unitNumber: 10.974, levelGroup: 'A1',
    title: 'Küçük Rahatsızlıklar', description: 'Nezle, öksürük, ağrı',
    category: 'Günlük Hayat', color: '#dc2626', icon: '🤒',
    grammarExplain: `📌 ŞİKÂYETİ ANLATMAK:
1. У меня + isim: У меня насморк. (Nezleyim.) У меня температура.
2. Ağrı: У меня болит горло. Çoğulda болят.
3. İyi dilek: Выздоравливай! (Geçmiş olsun!)`,
    words: [
      W('d60a1he_1', 'Насморк', 'Násmark', 'Nezle / Burun akıntısı', 'A1', 'нос (burun) kökünden.'),
      W('d60a1he_2', 'Кашель', 'Káşil', 'Öksürük', 'A1', 'Fiili кашлять.'),
      W('d60a1he_3', 'Простуда', 'Prastúda', 'Soğuk algınlığı', 'A1', 'Простудиться = üşütmek.'),
      W('d60a1he_4', 'Таблетка', 'Tablyétka', 'Hap', 'A1', 'Eczanede en sık duyulan kelime.'),
      W('d60a1he_5', 'Аптека', 'Aptyéka', 'Eczane', 'A1', 'Türkçedeki "apotek" ile aynı kökten.'),
      W('d60a1he_6', 'Выздоравливай', 'Vızdarávlivay', 'Geçmiş olsun', 'A1', 'Kelime kelime "iyileş".')
    ],
    sentences: [
      S('У меня насморк и кашель.', 'Nezleyim ve öksürüğüm var.'),
      S('Где ближайшая аптека?', 'En yakın eczane nerede?'),
      S('Выздоравливай скорее!', 'Çabuk geçmiş olsun!')
    ]
  }
];
