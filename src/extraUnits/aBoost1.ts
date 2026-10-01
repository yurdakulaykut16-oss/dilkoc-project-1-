// ==========================================================
// A SEVİYESİ BÜYÜK GENİŞLEME — BÖLÜM 1/3 (18 ünite, A1 temel)
// unitNumber 10.9601-10.9618: temel A1 günlük kelime genişlemesi.
// Selamlaşma, zaman, hava, alışveriş ve basit günlük kalıplar içerir.
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const A_BOOST_1: UnitModule[] = [
  {
    id: 'xa1_greet', unitNumber: 10.9601, levelGroup: 'A1',
    title: 'Selamlaşma Sanatı', description: 'Resmî ve samimi selamlar: kime hangisi?',
    category: 'Temel Kelimeler', color: '#38bdf8', icon: '👋',
    grammarExplain: `📌 SELAM SEÇİMİ:
1. Здравствуйте = resmî/çoğul "merhaba"; Привет = samimi "selam".
2. Günün saatine göre: Доброе утро (sabah), Добрый день (gündüz), Добрый вечер (akşam).
3. "Как дела?" (Nasılsın?) sorusuna kısa cevap: Хорошо! / Нормально.`,
    words: [
      W('xa1_gr_1', 'Здравствуйте', 'Zdrástvuytye', 'Merhaba (resmî)', 'A1', 'İlk В okunmaz; tanımadıklarına ve büyüklere söylenir.'),
      W('xa1_gr_2', 'Привет', 'Privyét', 'Selam', 'A1', 'Sadece arkadaşlara ve yaşıtlara.'),
      W('xa1_gr_3', 'Доброе утро', 'Dóbraye útra', 'Günaydın', 'A1', 'Sabah 11-12\'ye kadar kullanılır.'),
      W('xa1_gr_4', 'Добрый вечер', 'Dóbrıy vyéçir', 'İyi akşamlar', 'A1', 'Akşam buluşmalarının açılış cümlesi.'),
      W('xa1_gr_5', 'Как дела?', 'Kak dilá?', 'Nasılsın?', 'A1', 'Kelimesi kelimesine "işler nasıl?" demektir.'),
      W('xa1_gr_6', 'Рад видеть', 'Rat vídit', 'Görmek güzel', 'A1', 'Kadın söylerse: Рада видеть.')
    ],
    sentences: [
      S('Добрый вечер! Как дела?', 'İyi akşamlar! Nasılsın?'),
      S('Привет! Рад тебя видеть.', 'Selam! Seni görmek güzel.')
    ]
  },
  {
    id: 'xa1_bye', unitNumber: 10.9602, levelGroup: 'A1',
    title: 'Vedalaşma', description: 'Hoşça kal demenin beş yolu',
    category: 'Temel Kelimeler', color: '#818cf8', icon: '🫡',
    grammarExplain: `📌 VEDA SEÇİMİ:
1. До свидания = resmî "hoşça kalın" (kelimesi kelimesine: buluşmaya kadar).
2. Пока = samimi "bay bay". До завтра = yarın görüşürüz.
3. Спокойной ночи yalnızca gece yatmadan önce söylenir.`,
    words: [
      W('xa1_by_1', 'До свидания', 'Da svidániya', 'Hoşça kalın', 'A1', 'Resmî veda; свидание = buluşma/randevu.'),
      W('xa1_by_2', 'Пока', 'Paká', 'Bay bay / Görüşürüz', 'A1', 'Sadece samimi ortamda.'),
      W('xa1_by_3', 'До завтра', 'Da záftra', 'Yarın görüşürüz', 'A1', 'до + zaman = "...e kadar" kalıbı.'),
      W('xa1_by_4', 'До встречи', 'Da fstryéçi', 'Görüşmek üzere', 'A1', 'встреча = buluşma; vedalaşırken kullanılır.'),
      W('xa1_by_5', 'Спокойной ночи', 'Spakóynay nóçi', 'İyi geceler', 'A1', '"Sakin gece" demektir; yatmadan önce.'),
      W('xa1_by_6', 'Счастливо', 'Şşislíva', 'İyi şanslar / Hoşça kal', 'A1', 'Günlük, sıcak bir veda.')
    ],
    sentences: [
      S('До завтра, до встречи!', 'Yarına, görüşmek üzere!'),
      S('Спокойной ночи, мама.', 'İyi geceler anne.')
    ]
  },
  {
    id: 'xa1_polite', unitNumber: 10.9603, levelGroup: 'A1',
    title: 'Sihirli Kelimeler', description: 'Teşekkür, rica, özür: nezaketin üç direği',
    category: 'Temel Kelimeler', color: '#f472b6', icon: '🙏',
    grammarExplain: `📌 NEZAKET ÜÇGENİ:
1. Спасибо (teşekkürler) → cevabı: Пожалуйста (rica ederim).
2. Пожалуйста aynı zamanda "lütfen" demektir — çift görevli!
3. Извините = özür dilerim (resmî); Прости = affet (samimi).`,
    words: [
      W('xa1_po_1', 'Спасибо', 'Spasíba', 'Teşekkürler', 'A1', 'Kökeni "Спаси Бог" (Tanrı korusun).'),
      W('xa1_po_2', 'Пожалуйста', 'Pajálusta', 'Lütfen / Rica ederim', 'A1', 'İki anlamı da çok kullanılır.'),
      W('xa1_po_3', 'Извините', 'İzvinítye', 'Özür dilerim', 'A1', 'Dikkat çekmek için de kullanılır: "İzvinite!..."'),
      W('xa1_po_4', 'Простите', 'Prastítye', 'Affedersiniz', 'A1', 'извините ile eş görevli, biraz daha yumuşak.'),
      W('xa1_po_5', 'Ничего', 'Niçivó', 'Önemli değil / Bir şey değil', 'A1', 'Г burada V okunur: niçivó.'),
      W('xa1_po_6', 'Будьте добры', 'Búttye dabrı', 'Lütfen (kibarca rica)', 'A1', '"İyi olun" = zahmet olmazsa.')
    ],
    sentences: [
      S('Спасибо большое!', 'Çok teşekkürler!'),
      S('Извините, пожалуйста.', 'Özür dilerim, lütfen.')
    ]
  },
  {
    id: 'xa1_yesno', unitNumber: 10.9604, levelGroup: 'A1',
    title: 'Evet, Hayır, Belki', description: 'Onaylama ve reddetme kelimeleri',
    category: 'Temel Kelimeler', color: '#34d399', icon: '✅',
    grammarExplain: `📌 ONAY VE RET:
1. Да = evet, Нет = hayır. Rusçada "yok" da нет ile söylenir: Времени нет (zaman yok).
2. Конечно = tabii ki (Ч burada Ş okunur: kanyéşna!).
3. Может быть = belki; kararsızlığın resmî hâli.`,
    words: [
      W('xa1_yn_1', 'Да', 'Da', 'Evet', 'A1', 'En kısa ve en önemli kelime.'),
      W('xa1_yn_2', 'Нет', 'Nyet', 'Hayır / Yok', 'A1', 'Hem ret hem yokluk bildirir.'),
      W('xa1_yn_3', 'Конечно', 'Kanyéşna', 'Tabii ki', 'A1', 'ЧН istisnası: ŞN okunur!'),
      W('xa1_yn_4', 'Может быть', 'Mójıt bıt', 'Belki', 'A1', 'Kelimesi kelimesine "olabilir".'),
      W('xa1_yn_5', 'Хорошо', 'Haraşó', 'Tamam / İyi', 'A1', 'Anlaşma bildirir: "Haraşó!" = Anlaştık!'),
      W('xa1_yn_6', 'Точно', 'Tóçna', 'Kesinlikle / Aynen', 'A1', 'Gençlerin favori onay kelimesi.')
    ],
    sentences: [
      S('Да, конечно, можно!', 'Evet, tabii ki, olur!'),
      S('Может быть, завтра.', 'Belki yarın.')
    ]
  },
  {
    id: 'xa1_pronouns', unitNumber: 10.9605, levelGroup: 'A1',
    title: 'Ben, Sen, Biz', description: 'Kişi zamirleri: cümlenin öznesini tanı',
    category: 'Temel Kelimeler', color: '#fbbf24', icon: '🧍',
    grammarExplain: `📌 KİŞİ ZAMİRLERİ:
1. я (ben), ты (sen), он/она (o), мы (biz), вы (siz), они (onlar).
2. вы hem "siz" (çoğul) hem kibar "siz"dir — tanımadığına вы de!
3. Rusçada şimdiki zamanda "olmak" düşer: Я студент. (Ben öğrenciyim.)`,
    words: [
      W('xa1_pr_1', 'Я', 'Ya', 'Ben', 'A1', 'Cümle ortasında da büyük yazılmaz (İngilizce I gibi değil).'),
      W('xa1_pr_2', 'Ты', 'Tı', 'Sen', 'A1', 'Sadece samimi ortamda; yoksa вы kullan.'),
      W('xa1_pr_3', 'Он / Она', 'On / Aná', 'O (eril/dişil)', 'A1', 'Nesneler için de cinsiyete göre он/она denir.'),
      W('xa1_pr_4', 'Мы', 'Mı', 'Biz', 'A1', 'Ы sesi: dilini geriye çek.'),
      W('xa1_pr_5', 'Вы', 'Vı', 'Siz', 'A1', 'Kibarlık вы\'sı mektuplarda büyük yazılır: Вы.'),
      W('xa1_pr_6', 'Они', 'Aní', 'Onlar', 'A1', 'Akanje: oni değil aní.')
    ],
    sentences: [
      S('Я студент, а ты?', 'Ben öğrenciyim, ya sen?'),
      S('Мы дома, они в кафе.', 'Biz evdeyiz, onlar kafede.')
    ]
  },
  {
    id: 'xa1_family1', unitNumber: 10.9606, levelGroup: 'A1',
    title: 'Çekirdek Aile', description: 'Anne, baba, kardeşler: en yakın çember',
    category: 'Temel Kelimeler', color: '#fb7185', icon: '👨‍👩‍👧',
    grammarExplain: `📌 AİLE VE SAHİPLİK:
1. мой/моя uyumu: мой брат (eril), моя сестра (dişil).
2. "У меня есть..." = ...im var: У меня есть брат.
3. Rusçada abla/kız kardeş ayrımı yok: ikisi de сестра.`,
    words: [
      W('xa1_f1_1', 'Мама', 'Máma', 'Anne', 'A1', 'Resmî hâli мать; günlük dilde hep мама.'),
      W('xa1_f1_2', 'Папа', 'Pápa', 'Baba', 'A1', 'Resmî hâli отец.'),
      W('xa1_f1_3', 'Брат', 'Brat', 'Erkek kardeş', 'A1', 'Abi/kardeş ayrımı yoktur.'),
      W('xa1_f1_4', 'Сестра', 'Sistrá', 'Kız kardeş', 'A1', 'Vurgu sonda: sistrÁ.'),
      W('xa1_f1_5', 'Сын', 'Sın', 'Oğul', 'A1', 'Çoğulu kural dışı: сыновья.'),
      W('xa1_f1_6', 'Дочь', 'Doç', 'Kız (evlat)', 'A1', 'Dişil, yumuşak işaretle biter.')
    ],
    sentences: [
      S('У меня есть брат и сестра.', 'Bir erkek ve bir kız kardeşim var.'),
      S('Моя мама дома.', 'Annem evde.')
    ]
  },
  {
    id: 'xa1_family2', unitNumber: 10.9607, levelGroup: 'A1',
    title: 'Geniş Aile', description: 'Babaanne, dede, hala, amca: sülale turu',
    category: 'Temel Kelimeler', color: '#f97316', icon: '👵',
    grammarExplain: `📌 GENİŞ AİLE:
1. бабушка Rus kültüründe bir kurumdur: torun bakar, turta yapar, herkesi doyurur.
2. тётя hem teyze hem hala; дядя hem amca hem dayı — Rusça ayırmaz!
3. муж (koca) / жена (karı): Это мой муж. (Bu benim eşim.)`,
    words: [
      W('xa1_f2_1', 'Бабушка', 'Bábuşka', 'Babaanne / Anneanne', 'A1', 'Vurgu başta: BÁbuşka.'),
      W('xa1_f2_2', 'Дедушка', 'Dyéduşka', 'Dede', 'A1', 'Дед Мороз = Noel Baba\'nın Rus\'u.'),
      W('xa1_f2_3', 'Тётя', 'Tyótya', 'Teyze / Hala', 'A1', 'Çocuklar yabancı kadınlara da тётя der.'),
      W('xa1_f2_4', 'Дядя', 'Dyádya', 'Amca / Dayı', 'A1', 'Aynı şekilde yabancı erkeklere de дядя denir.'),
      W('xa1_f2_5', 'Муж', 'Muş', 'Koca / Eş', 'A1', 'Sondaki Ж sedasızlaşıp Ş okunur.'),
      W('xa1_f2_6', 'Жена', 'Jıná', 'Karı / Eş', 'A1', 'Vurgu sonda; женщина (kadın) ile akraba.')
    ],
    sentences: [
      S('Бабушка готовит очень вкусно.', 'Babaannem çok lezzetli yemek yapar.'),
      S('Мой дядя живёт в Москве.', 'Amcam Moskova\'da yaşıyor.')
    ]
  },
  {
    id: 'xa1_money', unitNumber: 10.9608, levelGroup: 'A1',
    title: 'Para ve Fiyat', description: 'Kaç para? Pahalı mı? Alışverişin dili',
    category: 'Gündelik Yaşam', color: '#22c55e', icon: '💰',
    grammarExplain: `📌 PARA KONUŞMASI:
1. Сколько стоит? = Ne kadar? (tekil); Сколько стоят? (çoğul).
2. платить/заплатить = ödemek: Я заплачу! (Ben öderim!)
3. деньги (para) HEP çoğuldur: Деньги есть? (Para var mı?)`,
    words: [
      W('xa1_mo_1', 'Деньги', 'Dyéngi', 'Para', 'A1', 'Hep çoğul kullanılır; tekili yok!'),
      W('xa1_mo_2', 'Цена', 'Tsıná', 'Fiyat', 'A1', 'Vurgu sonda; чек = fiş.'),
      W('xa1_mo_3', 'Платить', 'Platít', 'Ödemek', 'A1', 'плата (ödeme) kökünden; зарплата da buradan.'),
      W('xa1_mo_4', 'Дорого', 'Dóraga', 'Pahalı', 'A1', '"Это очень дорого!" pazarlığın ilk cümlesi.'),
      W('xa1_mo_5', 'Дёшево', 'Dyóşıva', 'Ucuz', 'A1', 'Ё her zaman vurguludur.'),
      W('xa1_mo_6', 'Бесплатно', 'Bisplátna', 'Ücretsiz', 'A1', 'без платы = ödemesiz; herkesin sevdiği kelime.')
    ],
    sentences: [
      S('Сколько это стоит?', 'Bu ne kadar?'),
      S('Это дорого, а это бесплатно!', 'Bu pahalı, ama bu ücretsiz!')
    ]
  },
  {
    id: 'xa1_time', unitNumber: 10.9609, levelGroup: 'A1',
    title: 'Saat Kaç?', description: 'Saat, dakika ve günün bölümleri',
    category: 'Gündelik Yaşam', color: '#06b6d4', icon: '🕐',
    grammarExplain: `📌 ZAMAN SORMA:
1. Который час? / Сколько времени? = Saat kaç?
2. Cevap: Сейчас три часа. (Şu an saat üç.) 1 час, 2-4 часа, 5+ часов.
3. Günün bölümleri araç hâliyle zarf olur: утром (sabahleyin), вечером (akşamleyin).`,
    words: [
      W('xa1_ti_1', 'Час', 'Çyas', 'Saat (süre)', 'A1', 'два часа = iki saat / saat iki.'),
      W('xa1_ti_2', 'Минута', 'Minúta', 'Dakika', 'A1', 'Одну минуту! = Bir dakika!'),
      W('xa1_ti_3', 'Утро', 'Útra', 'Sabah', 'A1', 'Доброе утро buradan gelir.'),
      W('xa1_ti_4', 'День', 'Dyen', 'Gün / Gündüz', 'A1', 'Добрый день = iyi günler.'),
      W('xa1_ti_5', 'Вечер', 'Vyéçir', 'Akşam', 'A1', 'вечером = akşamleyin.'),
      W('xa1_ti_6', 'Ночь', 'Noç', 'Gece', 'A1', 'Dişildir; спокойной ночи buradan.')
    ],
    sentences: [
      S('Сейчас два часа дня.', 'Şu an öğleden sonra saat iki.'),
      S('Вечером я дома.', 'Akşam evdeyim.')
    ]
  },
  {
    id: 'xa1_morning', unitNumber: 10.961, levelGroup: 'A1',
    title: 'Sabah Rutini', description: 'Kalk, yıkan, kahvaltı et: güne başlama fiilleri',
    category: 'Gündelik Yaşam', color: '#f59e0b', icon: '🌅',
    grammarExplain: `📌 RUTİN FİİLLERİ:
1. вставать = kalkmak: Я встаю в семь. (Yedide kalkarım.)
2. -ся'lı fiiller kendine dönüktür: умываться (yüzünü yıkamak), одеваться (giyinmek).
3. Sıralama bağlacı: сначала (önce), потом (sonra).`,
    words: [
      W('xa1_mn_1', 'Вставать', 'Fstavát', 'Kalkmak', 'A1', 'Я встаю = kalkıyorum; В sedasızlaşıp F okunur.'),
      W('xa1_mn_2', 'Умываться', 'Umıvátsa', 'Yüzünü yıkamak', 'A1', '-ться TSA okunur.'),
      W('xa1_mn_3', 'Одеваться', 'Adivátsa', 'Giyinmek', 'A1', 'одежда (giysi) kökünden.'),
      W('xa1_mn_4', 'Завтракать', 'Záftrakat', 'Kahvaltı etmek', 'A1', 'завтрак (kahvaltı) + fiil eki.'),
      W('xa1_mn_5', 'Душ', 'Duş', 'Duş', 'A1', 'принимать душ = duş almak.'),
      W('xa1_mn_6', 'Рано', 'Rána', 'Erken', 'A1', 'Zıddı: поздно (geç — Д okunmaz!).')
    ],
    sentences: [
      S('Я встаю рано утром.', 'Sabah erken kalkarım.'),
      S('Сначала душ, потом завтрак.', 'Önce duş, sonra kahvaltı.')
    ]
  },
  {
    id: 'xa1_evening', unitNumber: 10.9611, levelGroup: 'A1',
    title: 'Akşam Rutini', description: 'Akşam yemeği, dinlenme, uyku',
    category: 'Gündelik Yaşam', color: '#8b5cf6', icon: '🌙',
    grammarExplain: `📌 AKŞAM FİİLLERİ:
1. ужинать = akşam yemeği yemek; обедать = öğle yemeği yemek.
2. ложиться спать = yatmaya gitmek (kelimesi kelimesine: uyumaya uzanmak).
3. отдыхать = dinlenmek — hem kanepede hem tatilde kullanılır.`,
    words: [
      W('xa1_ev_1', 'Ужин', 'Újın', 'Akşam yemeği', 'A1', 'ужинать = akşam yemeği yemek.'),
      W('xa1_ev_2', 'Отдыхать', 'Addıhát', 'Dinlenmek', 'A1', 'отдых (dinlenme) kökünden.'),
      W('xa1_ev_3', 'Смотреть', 'Smatryét', 'İzlemek / Bakmak', 'A1', 'смотреть фильм = film izlemek.'),
      W('xa1_ev_4', 'Спать', 'Spat', 'Uyumak', 'A1', 'Я сплю = uyuyorum (Л ortaya girer!).'),
      W('xa1_ev_5', 'Ложиться', 'Lajıtsa', 'Yatmak', 'A1', 'ложиться спать kalıbıyla kullanılır.'),
      W('xa1_ev_6', 'Устал', 'Ustál', 'Yorgunum (erkek)', 'A1', 'Kadın: устала. Geçmiş biçim ama "şu an yorgunum" demektir.')
    ],
    sentences: [
      S('Вечером мы ужинаем вместе.', 'Akşam birlikte yemek yeriz.'),
      S('Я устал и ложусь спать.', 'Yoruldum ve yatıyorum.')
    ]
  },
  {
    id: 'xa1_school', unitNumber: 10.9612, levelGroup: 'A1',
    title: 'Okul Çantası', description: 'Kitap, defter, kalem: derse hazırlık',
    category: 'Temel Kelimeler', color: '#3b82f6', icon: '🎒',
    grammarExplain: `📌 OKUL DİLİ:
1. урок = ders: на уроке (derste), после урока (dersten sonra).
2. читать (okumak) ↔ писать (yazmak): dilin iki temel motoru.
3. "Дай, пожалуйста, ручку." = Kalemi ver lütfen. (дай = ver!)`,
    words: [
      W('xa1_sc_1', 'Книга', 'Kníga', 'Kitap', 'A1', 'КН kümesi tek nefeste: kniga.'),
      W('xa1_sc_2', 'Тетрадь', 'Titrát', 'Defter', 'A1', 'Dişildir; sondaki ДЬ T okunur.'),
      W('xa1_sc_3', 'Ручка', 'Rúçka', 'Kalem (tükenmez)', 'A1', 'Aynı zamanda "kapı kolu" demektir!'),
      W('xa1_sc_4', 'Карандаш', 'Karandáş', 'Kurşun kalem', 'A1', 'Türkçe "kara taş"tan geldiği söylenir!'),
      W('xa1_sc_5', 'Урок', 'Urók', 'Ders', 'A1', 'на уроке = derste.'),
      W('xa1_sc_6', 'Учить', 'Uçít', 'Öğrenmek / Ezberlemek', 'A1', 'учить слова = kelime ezberlemek.')
    ],
    sentences: [
      S('Я читаю интересную книгу.', 'İlginç bir kitap okuyorum.'),
      S('Дай, пожалуйста, ручку.', 'Kalemi ver lütfen.')
    ]
  },
  {
    id: 'xa1_furniture', unitNumber: 10.9613, levelGroup: 'A1',
    title: 'Ev Eşyaları', description: 'Yatak, dolap, lamba: oda turu',
    category: 'Temel Kelimeler', color: '#a78bfa', icon: '🛋️',
    grammarExplain: `📌 NEREDE DURUYOR?
1. на + eşya = üstünde: на диване (kanepede), на кровати (yatakta).
2. в шкафу = dolabın içinde (kural dışı -у eki!).
3. стоит (dikili durur) / лежит (yatar) — Rusça eşyanın duruşunu söyler!`,
    words: [
      W('xa1_fu_1', 'Кровать', 'Kravát', 'Yatak', 'A1', 'Dişildir; на кровати = yatakta.'),
      W('xa1_fu_2', 'Шкаф', 'Şkaf', 'Dolap', 'A1', 'в шкафу = dolapta (kural dışı!).'),
      W('xa1_fu_3', 'Диван', 'Diván', 'Kanepe', 'A1', 'Türkçe "divan"la aynı kökten!'),
      W('xa1_fu_4', 'Лампа', 'Lámpa', 'Lamba', 'A1', 'Türkçeyle ortak Fransızca kök.'),
      W('xa1_fu_5', 'Ковёр', 'Kavyór', 'Halı', 'A1', 'Duvara halı asmak eski Rus geleneğidir!'),
      W('xa1_fu_6', 'Стул', 'Stul', 'Sandalye', 'A1', 'стол (masa) ile karıştırma: стул = sandalye.')
    ],
    sentences: [
      S('Кошка спит на диване.', 'Kedi kanepede uyuyor.'),
      S('Лампа стоит на столе.', 'Lamba masanın üstünde duruyor.')
    ]
  },
  {
    id: 'xa1_kitchen', unitNumber: 10.9614, levelGroup: 'A1',
    title: 'Mutfak Çekmecesi', description: 'Tabak, bardak, kaşık: sofra kurma',
    category: 'Temel Kelimeler', color: '#f43f5e', icon: '🍽️',
    grammarExplain: `📌 SOFRA DİLİ:
1. есть ложкой/вилкой = kaşıkla/çatalla yemek (araç hâli).
2. накрывать на стол = sofra kurmak.
3. чашка чая = bir fincan çay; стакан воды = bir bardak su.`,
    words: [
      W('xa1_ki_1', 'Тарелка', 'Taryélka', 'Tabak', 'A1', 'глубокая тарелка = çorba tabağı.'),
      W('xa1_ki_2', 'Чашка', 'Çáşka', 'Fincan', 'A1', 'чашка кофе = bir fincan kahve.'),
      W('xa1_ki_3', 'Ложка', 'Lóşka', 'Kaşık', 'A1', 'ЖК → ŞK sedasızlaşması.'),
      W('xa1_ki_4', 'Вилка', 'Vílka', 'Çatal', 'A1', 'Eski Rusçada "küçük dirgen" demekti.'),
      W('xa1_ki_5', 'Нож', 'Noş', 'Bıçak', 'A1', 'Sondaki Ж sedasızlaşıp Ş okunur.'),
      W('xa1_ki_6', 'Чайник', 'Çáynik', 'Çaydanlık / Su ısıtıcısı', 'A1', 'Mecazen "acemi" anlamına da gelir!')
    ],
    sentences: [
      S('Чашка стоит на столе.', 'Fincan masanın üstünde.'),
      S('Я ем суп ложкой.', 'Çorbayı kaşıkla içerim.')
    ]
  },
  {
    id: 'xa1_clothes', unitNumber: 10.9615, levelGroup: 'A1',
    title: 'Gardırop', description: 'Gömlek, pantolon, elbise: günlük giyim',
    category: 'Temel Kelimeler', color: '#ec4899', icon: '👕',
    grammarExplain: `📌 GİYİM DİLİ:
1. носить = (düzenli) giymek: Я ношу джинсы. (Kot giyerim.)
2. надевать = (o an) giymek: Надень куртку! (Montunu giy!)
3. брюки (pantolon) hep çoğuldur — tıpkı Türkçedeki "pantolonlar" gibi düşünme, tek pantolon da брюки!`,
    words: [
      W('xa1_cl_1', 'Рубашка', 'Rubáşka', 'Gömlek', 'A1', 'рубить (kesmek) kökünden gelir.'),
      W('xa1_cl_2', 'Брюки', 'Bryúki', 'Pantolon', 'A1', 'Hep çoğul kullanılır.'),
      W('xa1_cl_3', 'Платье', 'Plátye', 'Elbise', 'A1', 'Nötr cinstir: красивое платье.'),
      W('xa1_cl_4', 'Юбка', 'Yúpka', 'Etek', 'A1', 'Б sedasızlaşıp P okunur: yúpka.'),
      W('xa1_cl_5', 'Куртка', 'Kúrtka', 'Mont / Ceket', 'A1', 'Günlük dış giyimin genel adı.'),
      W('xa1_cl_6', 'Обувь', 'Óbuf', 'Ayakkabı (genel)', 'A1', 'Sondaki ВЬ F okunur; tekil toplu isimdir.')
    ],
    sentences: [
      S('Это новое платье.', 'Bu yeni bir elbise.'),
      S('Надень куртку, холодно!', 'Montunu giy, hava soğuk!')
    ]
  },
  {
    id: 'xa1_winter', unitNumber: 10.9616, levelGroup: 'A1',
    title: 'Kış Dolabı', description: 'Şapka, atkı, eldiven: Rus kışına hazırlık',
    category: 'Temel Kelimeler', color: '#60a5fa', icon: '🧣',
    grammarExplain: `📌 KIŞ GİYİMİ:
1. Rusya'da kış ciddi iştir: без шапки (şapkasız) gezeni бабушка azarlar!
2. надевать шапку = şapka takmak; снимать = çıkarmak.
3. тепло одеваться = kalın giyinmek.`,
    words: [
      W('xa1_wi_1', 'Шапка', 'Şápka', 'Bere / Şapka', 'A1', 'Kışın millî üniforması.'),
      W('xa1_wi_2', 'Шарф', 'Şarf', 'Atkı', 'A1', 'Almanca kökenli kısa bir kelime.'),
      W('xa1_wi_3', 'Перчатки', 'Pirçátki', 'Eldivenler', 'A1', 'перст (eski "parmak") kökünden.'),
      W('xa1_wi_4', 'Сапоги', 'Sapagí', 'Çizmeler', 'A1', 'Kışın vazgeçilmezi; tekili сапог.'),
      W('xa1_wi_5', 'Пальто', 'Paltó', 'Palto', 'A1', 'Türkçeyle aynı! Değişmez nötr kelime.'),
      W('xa1_wi_6', 'Свитер', 'Svítır', 'Kazak', 'A1', 'İngilizce sweater\'dan; Э gibi okunur: svíter.')
    ],
    sentences: [
      S('Зимой я ношу шапку и шарф.', 'Kışın bere ve atkı takarım.'),
      S('Где мои перчатки?', 'Eldivenlerim nerede?')
    ]
  },
  {
    id: 'xa1_health', unitNumber: 10.9617, levelGroup: 'A1',
    title: 'Sağlık Köşesi', description: 'Hasta mısın? Temel sağlık kelimeleri',
    category: 'Gündelik Yaşam', color: '#14b8a6', icon: '🤒',
    grammarExplain: `📌 SAĞLIK KONUŞMASI:
1. Я болею. = Hastayım. / Я здоров(а). = Sağlıklıyım.
2. У меня болит... = ...m ağrıyor (болит + tekil organ).
3. Будь здоров! = Çok yaşa! (hapşırana söylenir; kelimesi kelimesine "sağlıklı ol").`,
    words: [
      W('xa1_he_1', 'Болеть', 'Balyét', 'Hasta olmak / Ağrımak', 'A1', 'Hem hastalık hem taraftarlık ("takım tutmak") anlamı var!'),
      W('xa1_he_2', 'Здоровый', 'Zdaróvıy', 'Sağlıklı', 'A1', 'здоровье = sağlık.'),
      W('xa1_he_3', 'Больной', 'Balnóy', 'Hasta', 'A1', 'Hem sıfat hem "hasta kişi" ismi.'),
      W('xa1_he_4', 'Голова болит', 'Galavá balít', 'Baş ağrıyor', 'A1', 'En sık şikâyet kalıbı.'),
      W('xa1_he_5', 'Лекарство', 'Likárstva', 'İlaç', 'A1', 'лечить (tedavi etmek) kökünden.'),
      W('xa1_he_6', 'Выздоравливай', 'Vızdarávlivay', 'Geçmiş olsun', 'A1', '"İyileş!" demektir; hastaya söylenir.')
    ],
    sentences: [
      S('У меня болит голова.', 'Başım ağrıyor.'),
      S('Выздоравливай скорее!', 'Çabuk iyileş!')
    ]
  },
  {
    id: 'xa1_weather1', unitNumber: 10.9618, levelGroup: 'A1',
    title: 'Hava Durumu 1', description: 'Güneş, yağmur, kar: pencereden bakınca',
    category: 'Gündelik Yaşam', color: '#0ea5e9', icon: '⛅',
    grammarExplain: `📌 HAVA CÜMLELERİ (öznesiz!):
1. Идёт дождь. = Yağmur yağıyor. (kelimesi kelimesine: yağmur gidiyor!)
2. Идёт снег. = Kar yağıyor. Светит солнце. = Güneş parlıyor.
3. Сегодня тепло/холодно. = Bugün hava sıcak/soğuk. (özne yok, zarf yeter.)`,
    words: [
      W('xa1_w1_1', 'Солнце', 'Sóntse', 'Güneş', 'A1', 'Л okunmaz: sóntse.'),
      W('xa1_w1_2', 'Дождь', 'Doşt', 'Yağmur', 'A1', 'Metinmizin baş kahramanı! ЖДЬ sonda ŞT gibi okunur.'),
      W('xa1_w1_3', 'Снег', 'Snyek', 'Kar', 'A1', 'Sondaki Г sedasızlaşıp K okunur.'),
      W('xa1_w1_4', 'Тепло', 'Tipló', 'Sıcak (hava)', 'A1', 'Мне тепло = bana sıcak/üşümüyorum.'),
      W('xa1_w1_5', 'Холодно', 'Hóladna', 'Soğuk (hava)', 'A1', 'Rus kışının bir numaralı kelimesi.'),
      W('xa1_w1_6', 'Небо', 'Nyéba', 'Gökyüzü', 'A1', 'голубое небо = masmavi gök.')
    ],
    sentences: [
      S('Сегодня идёт дождь.', 'Bugün yağmur yağıyor.'),
      S('Зимой холодно, летом тепло.', 'Kışın soğuk, yazın sıcak olur.')
    ]
  }
];
