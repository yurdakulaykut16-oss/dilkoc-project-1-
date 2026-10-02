import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const A_BOOST_3: UnitModule[] = [
  {
    id: 'xa1_meet', unitNumber: 10.9637, levelGroup: 'A1',
    title: 'Tanışma Kalıpları', description: 'Adım..., memnun oldum: ilk temas cümleleri',
    category: 'Gündelik A1', color: '#38bdf8', icon: '🤝',
    grammarExplain: `📌 TANIŞMA:
1. Меня зовут... = Benim adım... (kelimesi kelimesine: "beni ... diye çağırırlar").
2. Как тебя/вас зовут? = Adın/Adınız ne?
3. Очень приятно! = Çok memnun oldum!`,
    words: [
      W('xa1_mt2_1', 'Знакомиться', 'Znakómitsa', 'Tanışmak', 'A1', 'Давайте познакомимся! = Tanışalım!'),
      W('xa1_mt2_2', 'Меня зовут', 'Minyá zavút', 'Benim adım', 'A1', 'Metinde: "Меня зовут Дима."'),
      W('xa1_mt2_3', 'Имя', 'Ímya', 'İsim', 'A1', 'Как ваше имя? = İsminiz ne?'),
      W('xa1_mt2_4', 'Приятно', 'Priyátna', 'Memnun oldum / Hoş', 'A1', 'Очень приятно! tanışmanın kapanışı.'),
      W('xa1_mt2_5', 'Встреча', 'Fstryéça', 'Buluşma / Karşılaşma', 'A1', 'Metinnin adındaki fiilin kökü!'),
      W('xa1_mt2_6', 'Встретить', 'Fstryétit', 'Karşılaşmak / Tanışmak', 'A1', 'Bir kişiyle karşılaşmayı veya tanışmayı anlatır.')
    ],
    sentences: [
      S('Меня зовут Дима, очень приятно!', 'Benim adım Maksim, çok memnun oldum!'),
      S('Как вас зовут?', 'Adınız ne?')
    ]
  },
  {
    id: 'xa1_intro', unitNumber: 10.9638, levelGroup: 'A1',
    title: 'Kendini Tanıtma', description: 'Nereli, ne iş, kaç yaşında: mini portre',
    category: 'Gündelik A1', color: '#818cf8', icon: '🪪',
    grammarExplain: `📌 MİNİ PORTRE:
1. Я живу в... = ...de yaşıyorum: Я живу в Москве.
2. Я работаю... = çalışıyorum; Я учусь... = okuyorum.
3. Мне ... лет = ... yaşındayım: Мне двадцать пять лет.`,
    words: [
      W('xa1_in_1', 'Жить', 'Jıt', 'Yaşamak', 'A1', 'Я живу = yaşıyorum.'),
      W('xa1_in_2', 'Город', 'Górat', 'Şehir', 'A1', 'в городе = şehirde.'),
      W('xa1_in_3', 'Работать', 'Rabótat', 'Çalışmak', 'A1', 'работа = iş.'),
      W('xa1_in_4', 'Учиться', 'Uçítsa', 'Okumak / Öğrenim görmek', 'A1', 'Я учусь в университете.'),
      W('xa1_in_5', 'Лет', 'Lyet', 'Yaş (5+ için)', 'A1', 'Мне 25 лет; год/года/лет kuralı.'),
      W('xa1_in_6', 'Откуда', 'Atkúda', 'Nereden / Nereli', 'A1', 'Откуда вы? = Nerelisiniz?')
    ],
    sentences: [
      S('Я живу и работаю в Москве.', 'Moskova\'da yaşıyor ve çalışıyorum.'),
      S('Откуда вы? — Я из Турции.', 'Nerelisiniz? — Türkiye\'denim.')
    ]
  },
  {
    id: 'xa1_polite2', unitNumber: 10.9639, levelGroup: 'A1',
    title: 'Kibarca İzin İsteme', description: '"Можно...?" — Rusçanın sihirli kapı anahtarı',
    category: 'Gündelik A1', color: '#f472b6', icon: '🚪',
    grammarExplain: `📌 МОЖНО KALIBI:
1. Можно + fiil = ...bilir miyim?: Можно сесть здесь? (Buraya oturabilir miyim?)
2. Cevap: Конечно! (tabii) / Пожалуйста! (buyurun) / Нельзя. (olmaz.)
3. Günlük izin istemede sık kullanılır: "Можно сесть здесь?"`,
    words: [
      W('xa1_p2_1', 'Можно', 'Mójna', 'Olabilir / ...bilir miyim?', 'A1', 'İzin istemenin evrensel anahtarı.'),
      W('xa1_p2_2', 'Нельзя', 'Nilzyá', 'Yasak / Olmaz', 'A1', 'можно\'nun zıddı.'),
      W('xa1_p2_3', 'Сесть', 'Syest', 'Oturmak (bir kere)', 'A1', 'Можно сесть? = Oturabilir miyim?'),
      W('xa1_p2_4', 'Место', 'Myésta', 'Yer', 'A1', 'Это место свободно? = Bu yer boş mu?'),
      W('xa1_p2_5', 'Свободно', 'Svabódna', 'Boş / Serbest', 'A1', 'Hem koltuk hem kişi için: я свободен.'),
      W('xa1_p2_6', 'Занято', 'Zányata', 'Dolu / Meşgul', 'A1', 'Это место занято = bu yer dolu.')
    ],
    sentences: [
      S('Можно сесть здесь?', 'Buraya oturabilir miyim?'),
      S('Это место свободно?', 'Bu yer boş mu?')
    ]
  },
  {
    id: 'xa1_cafemeet', unitNumber: 10.964, levelGroup: 'A1',
    title: 'Kafede Buluşma', description: 'Kafe, pencere kenarı, akşam: sahneyi kur',
    category: 'Gündelik A1', color: '#a16207', icon: '🫖',
    grammarExplain: `📌 SAHNE: KAFE (кофейня!):
1. кофейня = kahveci/kafe — buluşma ve sipariş sahnelerinde sık geçer.
2. у окна = pencere kenarında (у + tamlayan = yanında).
3. сидеть = oturuyor olmak (durum); сесть = oturmak (an).`,
    words: [
      W('xa1_cm_1', 'Кофейня', 'Kafyéynya', 'Kahveci / Kafe', 'A1', 'Metinnin sahnesi birebir bu kelime!'),
      W('xa1_cm_2', 'Сидеть', 'Sidyét', 'Oturmak (durum)', 'A1', 'Я сижу у окна = pencere kenarında oturuyorum.'),
      W('xa1_cm_3', 'У окна', 'U akná', 'Pencere kenarında', 'A1', 'у + isim = ...nın yanında.'),
      W('xa1_cm_4', 'Один', 'Adín', 'Yalnız / Bir', 'A1', 'Я сижу один = tek başıma oturuyorum.'),
      W('xa1_cm_5', 'Девушка', 'Dyévuşka', 'Genç kadın / Kız', 'A1', 'Garsona seslenirken de kullanılır!'),
      W('xa1_cm_6', 'Молодой человек', 'Maladóy çilavyék', 'Genç adam', 'A1', 'Erkeğe kibar hitap.')
    ],
    sentences: [
      S('Я сижу в кофейне у окна.', 'Kafede pencere kenarında oturuyorum.'),
      S('Девушка сидит одна.', 'Genç kadın tek başına oturuyor.')
    ]
  },
  {
    id: 'xa1_rainyday', unitNumber: 10.9641, levelGroup: 'A1',
    title: 'Yağmurlu Akşam', description: 'Dışarıda yağmur, içeride sıcak bir ortam',
    category: 'Gündelik A1', color: '#0ea5e9', icon: '🌧️',
    grammarExplain: `📌 SAHNE: YAĞMUR:
1. На улице дождь. = Dışarıda yağmur var.
2. идёт дождь = yağmur yağıyor; дождь кончился = yağmur dindi.
3. мокрый = ıslak: мокрая улица (ıslak sokak).`,
    words: [
      W('xa1_rd_1', 'На улице', 'Na úlitse', 'Dışarıda / Sokakta', 'A1', 'Hem "sokakta" hem "dışarıda" demektir.'),
      W('xa1_rd_2', 'Идёт дождь', 'İdyót doşt', 'Yağmur yağıyor', 'A1', 'Kelimesi kelimesine: yağmur gidiyor.'),
      W('xa1_rd_3', 'Мокрый', 'Mókrıy', 'Islak', 'A1', 'мокрая одежда = ıslak giysi.'),
      W('xa1_rd_4', 'Капля', 'Káplya', 'Damla', 'A1', 'капли дождя = yağmur damlaları.'),
      W('xa1_rd_5', 'Тучи', 'Túçi', 'Kara bulutlar', 'A1', 'облако (bulut) beyazı, туча karası.'),
      W('xa1_rd_6', 'Кончиться', 'Kónçitsa', 'Bitmek / Dinmek', 'A1', 'Дождь кончился = yağmur dindi.')
    ],
    sentences: [
      S('На улице идёт дождь.', 'Dışarıda yağmur yağıyor.'),
      S('Моя куртка мокрая.', 'Montum ıslak.')
    ]
  },
  {
    id: 'xa1_smalltalk', unitNumber: 10.9642, levelGroup: 'A1',
    title: 'Hava Sohbeti', description: 'Погода — как жизнь: küçük konuşma sanatı',
    category: 'Gündelik A1', color: '#22d3ee', icon: '🌤️',
    grammarExplain: `📌 KÜÇÜK KONUŞMA:
1. Какая сегодня погода! = Bugün hava ne güzel/kötü! (ünlem olarak).
2. не говорите про погоду = havadan bahsetmeyin — про + belirtme = hakkında.
3. Maksim'nın cevabı: "Погода — как жизнь!" (Hava, hayat gibi!) — karşılaştırma как ile.`,
    words: [
      W('xa1_st_1', 'Погода', 'Pagóda', 'Hava durumu', 'A1', 'Metinnin yasaklı(!) sohbet konusu.'),
      W('xa1_st_2', 'Про', 'Pra', 'Hakkında', 'A1', 'говорить про погоду = havadan bahsetmek.'),
      W('xa1_st_3', 'Жизнь', 'Jızn', 'Hayat', 'A1', '"Погода — как жизнь!" — Maksim\'nın felsefesi.'),
      W('xa1_st_4', 'Как', 'Kak', 'Gibi / Nasıl', 'A1', 'Karşılaştırmada "gibi": как жизнь.'),
      W('xa1_st_5', 'Солнце', 'Sóntse', 'Güneş', 'A1', 'Сегодня солнце, завтра дождь.'),
      W('xa1_st_6', 'Тема', 'Tyéma', 'Konu', 'A1', 'другая тема = başka konu.')
    ],
    sentences: [
      S('Не говорите про погоду!', 'Havadan bahsetmeyin!'),
      S('Сегодня солнце, завтра дождь.', 'Bugün güneş, yarın yağmur.')
    ]
  },
  {
    id: 'xa1_menu', unitNumber: 10.9643, levelGroup: 'A1',
    title: 'Menü Başında', description: 'Menüyü oku, seç, karar ver(eme)',
    category: 'Gündelik A1', color: '#f59e0b', icon: '📜',
    grammarExplain: `📌 MENÜ SAHNESİ:
1. в пятый раз = beşinci kez; tekrar eden eylemi anlatır.
2. выбирать = seçmek (süreç); выбрать = seçmek (karar!).
3. раз = kez: первый раз (ilk kez), в пятый раз (beşinci kez).`,
    words: [
      W('xa1_mn2_1', 'Меню', 'Minyú', 'Menü', 'A1', 'Değişmeyen nötr kelimedir; kafede çok kullanılır.'),
      W('xa1_mn2_2', 'Выбирать', 'Vıbirát', 'Seçmek', 'A1', 'Долго выбираю = uzun uzun seçiyorum.'),
      W('xa1_mn2_3', 'Раз', 'Ras', 'Kez / Defa', 'A1', 'в пятый раз = beşinci kez.'),
      W('xa1_mn2_4', 'Пить', 'Pit', 'İçmek', 'A1', 'Я пил кофе = kahve içiyordum.'),
      W('xa1_mn2_5', 'Чай', 'Çay', 'Çay', 'A1', 'Metinde fiyatı bile konuşuldu!'),
      W('xa1_mn2_6', 'Кофе', 'Kófe', 'Kahve', 'A1', 'Eril istisna: вкусный кофе.')
    ],
    sentences: [
      S('Я читаю меню в пятый раз.', 'Menüyü beşinci kez okuyorum.'),
      S('Я пил кофе у окна.', 'Pencere kenarında kahve içiyordum.')
    ]
  },
  {
    id: 'xa1_topics', unitNumber: 10.9644, levelGroup: 'A1',
    title: 'Sohbet Konuları', description: 'Aileden çay fiyatına: iki saatlik sohbet',
    category: 'Gündelik A1', color: '#d946ef', icon: '🗣️',
    grammarExplain: `📌 NEDEN BAHSETTİLER?
1. говорить о + (-е hâli) = ...den bahsetmek: о семье (aileden), о погоде (havadan).
2. даже = bile: "даже о ценах на чай" (çay fiyatlarından bile!).
3. цена на + ürün = ...nın fiyatı: цены на чай.`,
    words: [
      W('xa1_tp_1', 'Говорить о', 'Gavarít a', 'Hakkında konuşmak', 'A1', 'Мы говорили о семье.'),
      W('xa1_tp_2', 'Семья', 'Simyá', 'Aile', 'A1', 'о семье = aileden (bahsetmek).'),
      W('xa1_tp_3', 'Цены', 'Tsénı', 'Fiyatlar', 'A1', 'цены на чай = çay fiyatları.'),
      W('xa1_tp_4', 'Даже', 'Dájı', 'Bile / Hatta', 'A1', 'Metinnin espri kelimesi.'),
      W('xa1_tp_5', 'Интересно', 'İntiryésna', 'İlginç', 'A1', 'Мне интересно = ilgimi çekiyor.'),
      W('xa1_tp_6', 'Разговор', 'Razgavór', 'Sohbet / Konuşma', 'A1', 'длинный разговор = uzun sohbet.')
    ],
    sentences: [
      S('Мы говорили о семье и о погоде.', 'Aileden ve havadan konuştuk.'),
      S('Даже о ценах на чай!', 'Hatta çay fiyatlarından bile!')
    ]
  },
  {
    id: 'xa1_twohours', unitNumber: 10.9645, levelGroup: 'A1',
    title: 'İki Saat Uçtu', description: 'Zaman nasıl geçti: süre anlatımı',
    category: 'Gündelik A1', color: '#10b981', icon: '⏳',
    grammarExplain: `📌 SÜRE ANLATIMI:
1. Мы говорили два часа. = İki saat konuştuk. (süre: yalın belirtme).
2. долго = uzun süre; быстро = hızlı: Время идёт быстро!
3. вместе = birlikte: два часа вместе (birlikte iki saat).`,
    words: [
      W('xa1_th_1', 'Два часа', 'Dva çisá', 'İki saat', 'A1', 'Metindeki sohbet süresi!'),
      W('xa1_th_2', 'Долго', 'Dólga', 'Uzun süre', 'A1', 'Мы долго говорили.'),
      W('xa1_th_3', 'Быстро', 'Bıstra', 'Hızlı / Çabuk', 'A1', 'Время идёт быстро = zaman hızlı geçiyor.'),
      W('xa1_th_4', 'Время', 'Vryémya', 'Zaman', 'A1', 'Nötr, kural dışı bir isim.'),
      W('xa1_th_5', 'Вместе', 'Vmyéstye', 'Birlikte', 'A1', 'Мы вместе = biz birlikteyiz.'),
      W('xa1_th_6', 'Весело', 'Vyésila', 'Eğlenceli / Neşeli', 'A1', 'Нам весело = eğleniyoruz.')
    ],
    sentences: [
      S('Мы говорили два часа.', 'İki saat konuştuk.'),
      S('Время идёт очень быстро.', 'Zaman çok hızlı geçiyor.')
    ]
  },
  {
    id: 'xa1_strange', unitNumber: 10.9646, levelGroup: 'A1',
    title: 'Garip Ama Hoş', description: '"Это странно. Но мне нравится." — beğeni dili',
    category: 'Gündelik A1', color: '#ec4899', icon: '😄',
    grammarExplain: `📌 BEĞENİ KALIBI:
1. Мне нравится... = ...hoşuma gidiyor (kelimesi kelimesine: bana hoş geliyor).
2. странно = garip; смешно = komik; мило = tatlı/şirin.
3. Но = ama: "Это странно. НО мне нравится!"`,
    words: [
      W('xa1_sg_1', 'Странно', 'Stránna', 'Garip / Tuhaf', 'A1', 'Bir durumun tuhaf olduğunu anlatır.'),
      W('xa1_sg_2', 'Нравится', 'Nrávitsa', 'Hoşuma gidiyor', 'A1', 'Мне нравится = hoşuma gidiyor.'),
      W('xa1_sg_3', 'Но', 'No', 'Ama', 'A1', 'Kısa ama güçlü bağlaç.'),
      W('xa1_sg_4', 'Очень', 'Óçin', 'Çok', 'A1', 'очень странно = çok garip.'),
      W('xa1_sg_5', 'Смешно', 'Smişnó', 'Komik', 'A1', 'смех = gülüş, kahkaha.'),
      W('xa1_sg_6', 'Мило', 'Míla', 'Tatlı / Şirin', 'A1', 'Как мило! = Ne tatlı!')
    ],
    sentences: [
      S('Это очень странно.', 'Bu çok garip.'),
      S('Но мне нравится!', 'Ama hoşuma gidiyor!')
    ]
  },
  {
    id: 'xa1_number', unitNumber: 10.9647, levelGroup: 'A1',
    title: 'Numaranı Alabilir miyim?', description: 'Telefon numarası isteme ve verme',
    category: 'Gündelik A1', color: '#7c3aed', icon: '📱',
    grammarExplain: `📌 NUMARA SAHNESİ:
1. Можно твой номер? = Numaranı alabilir miyim?
2. записать = not etmek: Я запишу твой номер. (Numaranı kaydedeyim.)
3. дать = vermek: Дай мне свой номер! (Bana numaranı ver!)`,
    words: [
      W('xa1_nm_1', 'Номер телефона', 'Nómir tilifóna', 'Telefon numarası', 'A1', 'Metinnin dönüm noktası!'),
      W('xa1_nm_2', 'Записать', 'Zapisát', 'Not etmek / Kaydetmek', 'A1', 'Запиши мой номер = numaramı kaydet.'),
      W('xa1_nm_3', 'Дать', 'Dat', 'Vermek', 'A1', 'Дай = ver! (emir).'),
      W('xa1_nm_4', 'Взять', 'Vzyat', 'Almak', 'A1', 'взять номер = numarayı almak.'),
      W('xa1_nm_5', 'Обещать', 'Abişşát', 'Söz vermek', 'A1', 'Я обещаю = söz veriyorum.'),
      W('xa1_nm_6', 'Мой / Твой', 'Moy / Tvoy', 'Benim / Senin', 'A1', 'мой номер, твой номер.')
    ],
    sentences: [
      S('Можно твой номер телефона?', 'Telefon numaranı alabilir miyim?'),
      S('Хорошо, запиши мой номер.', 'Tamam, numaramı kaydet.')
    ]
  },
  {
    id: 'xa1_busy', unitNumber: 10.9648, levelGroup: 'A1',
    title: 'Meşgul ve Müsait', description: '"Сегодня я занята" — programını söyle',
    category: 'Gündelik A1', color: '#f97316', icon: '📅',
    grammarExplain: `📌 MEŞGULİYET:
1. занят (erkek) / занята (kadın) = meşgul: Сегодня я занята.
2. свободен / свободна = müsait: Вы свободны вечером? (Akşam müsait misiniz?)
3. дела = işler: У меня дела. (İşlerim var.)`,
    words: [
      W('xa1_bs_1', 'Занят / Занята', 'Zányat / Zanyatá', 'Meşgul (e/k)', 'A1', 'Konuşanın cinsiyetine göre değişir: я занят / я занята.'),
      W('xa1_bs_2', 'Свободен / Свободна', 'Svabódin / Svabódna', 'Müsait (e/k)', 'A1', 'Telefondaki soru: вы свободны вечером?'),
      W('xa1_bs_3', 'Дела', 'Dilá', 'İşler', 'A1', 'У меня дела = işlerim var.'),
      W('xa1_bs_4', 'Вечером', 'Vyéçiram', 'Akşamleyin', 'A1', 'Buluşmaların altın saati.'),
      W('xa1_bs_5', 'План', 'Plan', 'Plan', 'A1', 'У тебя есть планы? = Planın var mı?'),
      W('xa1_bs_6', 'Потому что', 'Patamú şta', 'Çünkü', 'A1', 'Почему? sorusunun cevabı.')
    ],
    sentences: [
      S('Сегодня я занята, извини.', 'Bugün meşgulüm, kusura bakma.'),
      S('Ты свободен вечером?', 'Akşam müsait misin?')
    ]
  },
  {
    id: 'xa1_waiting', unitNumber: 10.9649, levelGroup: 'A1',
    title: 'En Uzun Gün', description: 'Beklemek, sabır ve "koca bir gün"',
    category: 'Gündelik A1', color: '#64748b', icon: '🕰️',
    grammarExplain: `📌 BEKLEYİŞ SAHNESİ:
1. ждать = beklemek: Я ждал завтра. (Yarını bekledim.)
2. целый день = koca bir gün; самый длинный день = en uzun gün.
3. самый + sıfat = en...: самый длинный (en uzun), самый лучший (en iyi).`,
    words: [
      W('xa1_wt_1', 'Ждать', 'Jdat', 'Beklemek', 'A1', 'Я жду тебя = seni bekliyorum.'),
      W('xa1_wt_2', 'Целый', 'Tsélıy', 'Koca / Bütün', 'A1', 'целый день = koca bir gün.'),
      W('xa1_wt_3', 'Длинный', 'Dlínnıy', 'Uzun', 'A1', 'самый длинный день = en uzun gün.'),
      W('xa1_wt_4', 'Самый', 'Sámıy', 'En (üstünlük)', 'A1', 'Metinnin sözlük kelimesi!'),
      W('xa1_wt_5', 'Терпение', 'Tirpyéniye', 'Sabır', 'A1', 'Терпение! = Sabır!'),
      W('xa1_wt_6', 'Наконец', 'Nakanyéts', 'Sonunda', 'A1', 'Uzun bekleyişin tatlı sonu.')
    ],
    sentences: [
      S('Я ждал целый день.', 'Koca bir gün bekledim.'),
      S('Это был самый длинный день.', 'Bu en uzun gündü.')
    ]
  },
  {
    id: 'xa1_ring', unitNumber: 10.965, levelGroup: 'A1',
    title: 'Telefon Çaldı!', description: 'Вдруг зазвонил телефон: sürpriz anı',
    category: 'Gündelik A1', color: '#22c55e', icon: '☎️',
    grammarExplain: `📌 SÜRPRİZ ANI:
1. вдруг = birden: Вдруг зазвонил телефон! (Birden telefon çaldı!)
2. зазвонить = çalmaya başlamak (за- öneki = başlama).
3. голос = ses (insan sesi): знакомый голос (tanıdık ses).`,
    words: [
      W('xa1_rg_1', 'Вдруг', 'Vdruk', 'Birden / Aniden', 'A1', 'Metinnin sözlük kelimesi; anlatının kalp atışı.'),
      W('xa1_rg_2', 'Зазвонил', 'Zazvaníl', 'Çalmaya başladı', 'A1', 'за- öneki başlamayı anlatır.'),
      W('xa1_rg_3', 'Звонок', 'Zvanók', 'Zil / Arama', 'A1', 'один звонок = bir arama.'),
      W('xa1_rg_4', 'Ответить', 'Atvyétit', 'Cevap vermek', 'A1', 'ответить на звонок = aramayı yanıtlamak.'),
      W('xa1_rg_5', 'Голос', 'Gólas', 'Ses (insan)', 'A1', 'звук = ses (genel); голос = insan sesi.'),
      W('xa1_rg_6', 'Знакомый', 'Znakómıy', 'Tanıdık', 'A1', 'знакомый голос = tanıdık ses.')
    ],
    sentences: [
      S('Вдруг зазвонил телефон.', 'Birden telefon çaldı.'),
      S('Я слышу знакомый голос.', 'Tanıdık bir ses duyuyorum.')
    ]
  },
  {
    id: 'xa1_firstmove', unitNumber: 10.9651, levelGroup: 'A1',
    title: 'İlk Adım Cesareti', description: 'Kim önce arar? Cesaret kelimeleri',
    category: 'Gündelik A1', color: '#e11d48', icon: '💪',
    grammarExplain: `📌 İLK ADIM:
1. первый = ilk/birinci: звонить первым = ilk arayan olmak.
2. думать = düşünmek: Вы думаете, что... (...olduğunu düşünüyorsunuz).
3. Metindeki cümle: "девушки не звонят первыми" (kızlar önce aramaz) — Anna bu kuralı yıktı!`,
    words: [
      W('xa1_fm_1', 'Первый', 'Pyérvıy', 'İlk / Birinci', 'A1', 'первый шаг = ilk adım.'),
      W('xa1_fm_2', 'Думать', 'Dúmat', 'Düşünmek', 'A1', 'Я думаю, что... = bence...'),
      W('xa1_fm_3', 'Смелый', 'Smyélıy', 'Cesur', 'A1', 'смелость = cesaret.'),
      W('xa1_fm_4', 'Решить', 'Rişıt', 'Karar vermek', 'A1', 'Я решила позвонить = aramaya karar verdim.'),
      W('xa1_fm_5', 'Шаг', 'Şak', 'Adım', 'A1', 'первый шаг самый трудный = ilk adım en zoru.'),
      W('xa1_fm_6', 'Бояться', 'Bayátsa', 'Korkmak', 'A1', 'Не бойся! = Korkma!')
    ],
    sentences: [
      S('Она решила позвонить первой.', 'O (kadın) ilk aramaya karar verdi.'),
      S('Первый шаг самый трудный.', 'İlk adım en zorudur.')
    ]
  },
  {
    id: 'xa1_exception', unitNumber: 10.9652, levelGroup: 'A1',
    title: 'Bugün İstisna', description: 'Kural, istisna ve özel anlar',
    category: 'Gündelik A1', color: '#8b5cf6', icon: '✨',
    grammarExplain: `📌 İSTİSNA CÜMLESİ:
1. исключение = istisna: "Сегодня — исключение." (Bugün istisna.)
2. правило = kural: исключение из правила (kuralın istisnası).
3. особенный = özel: особенный день (özel gün).`,
    words: [
      W('xa1_ex_1', 'Исключение', 'İsklyuçéniye', 'İstisna', 'A1', 'Kural dışı özel durumu anlatır.'),
      W('xa1_ex_2', 'Правило', 'Právila', 'Kural', 'A1', 'по правилам = kurallara göre.'),
      W('xa1_ex_3', 'Особенный', 'Asóbinnıy', 'Özel', 'A1', 'особенный вечер = özel akşam.'),
      W('xa1_ex_4', 'Момент', 'Mamyént', 'An', 'A1', 'важный момент = önemli an.'),
      W('xa1_ex_5', 'Судьба', 'Sudbá', 'Kader', 'A1', 'Это судьба! = Bu kader!'),
      W('xa1_ex_6', 'Случай', 'Slúçay', 'Tesadüf / Durum', 'A1', 'счастливый случай = mutlu tesadüf.')
    ],
    sentences: [
      S('Сегодня — исключение!', 'Bugün — istisna!'),
      S('Это был особенный момент.', 'Bu özel bir andı.')
    ]
  },
  {
    id: 'xa1_storytell', unitNumber: 10.9653, levelGroup: 'A1',
    title: 'Anlatı Kurmak', description: 'Bir olayı baştan sona anlatma kalıpları',
    category: 'Gündelik A1', color: '#0d9488', icon: '📖',
    grammarExplain: `📌 ANLATICI DİLİ:
1. рассказать = anlatmak: Я расскажу вам историю. (Size bir olay anlatacağım.)
2. называться = adlandırılmak: Она называется... (Adı ...)
3. начало (başlangıç) ↔ конец (son): у истории есть начало и конец.`,
    words: [
      W('xa1_sy_1', 'История', 'İstóriya', 'Metin', 'A1', 'Metinnin sözlük kelimesi; hem "tarih" demek.'),
      W('xa1_sy_2', 'Рассказать', 'Rasskazát', 'Anlatmak', 'A1', 'Maksim\'nın açılış fiili!'),
      W('xa1_sy_3', 'Называться', 'Nazıvátsa', 'Adlandırılmak', 'A1', 'Она называется... = Adı...'),
      W('xa1_sy_4', 'Дети', 'Dyéti', 'Çocuklar', 'A1', '"Дети, сегодня я расскажу вам..."'),
      W('xa1_sy_5', 'Начало', 'Naçála', 'Başlangıç', 'A1', 'начало истории = anlatının başı.'),
      W('xa1_sy_6', 'Конец', 'Kanyéts', 'Son', 'A1', 'счастливый конец = mutlu son.')
    ],
    sentences: [
      S('Я расскажу вам одну историю.', 'Size bir olay anlatacağım.'),
      S('У истории счастливый конец.', 'Metinnin mutlu sonu var.')
    ]
  },
  {
    id: 'xa1_finally', unitNumber: 10.9654, levelGroup: 'A1',
    title: 'Наконец-то: Sonunda!', description: 'Rahatlama ve kapanış cümleleri',
    category: 'Gündelik A1', color: '#facc15', icon: '💛',
    grammarExplain: `📌 FİNAL CÜMLESİ:
1. наконец-то = sonunda! (rahatlamalı, duygulu "sonunda").
2. "Наконец-то я встретил её." = Sonunda onunla tanıştım.
3. Kapanış cümlelerinde rahatlama ve sonuç duygusu verir.`,
    words: [
      W('xa1_fn_1', 'Наконец-то', 'Nakanyéts-ta', 'Sonunda!', 'A1', 'Metinnin son sözlük kelimesi.'),
      W('xa1_fn_2', 'Встретил', 'Fstryétil', 'Karşılaştım / Tanıştım', 'A1', 'Встретить fiilinin erkek geçmiş zaman biçimi.'),
      W('xa1_fn_3', 'Счастливый', 'Şşislívıy', 'Mutlu', 'A1', 'счастье = mutluluk.'),
      W('xa1_fn_4', 'Любовь', 'Lyubóf', 'Aşk / Sevgi', 'A1', 'Sonda В sedasızlaşıp F okunur.'),
      W('xa1_fn_5', 'Вот так', 'Vot tak', 'İşte böyle', 'A1', 'Bir olayı özetleyip kapatırken kullanılır.'),
      W('xa1_fn_6', 'Помнить', 'Pómnit', 'Hatırlamak', 'A1', 'Я помню этот день = o günü hatırlıyorum.')
    ],
    sentences: [
      S('Наконец-то я встретил её!', 'Sonunda onunla tanıştım!'),
      S('Вот так начинается наша история.', 'İşte anlatımız böyle başlıyor.')
    ]
  }
];
