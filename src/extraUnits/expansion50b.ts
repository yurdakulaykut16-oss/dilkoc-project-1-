// ==========================================================
// GENİŞLEME PAKETİ 50 — BÖLÜM 2: B1 (10 ünite) + B2 (10 ünite)
// Kesirli unitNumber'lar (95.x / 143.x) seviye bölgelerine
// sıralanır; hikâye tetikleyicileri etkilenmez.
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const EXPANSION_B1: UnitModule[] = [
  {
    id: 'exp_b1_cv', unitNumber: 95.1, levelGroup: 'B1',
    title: 'CV ve İş Görüşmesi', description: 'Özgeçmiş hazırlama ve mülakat soruları',
    category: 'İş Hayatı', color: '#0284c7', icon: '📋',
    grammarExplain: `📌 MÜLAKAT DİLİ:
1. "Расскажите о себе." (Kendinizden bahsedin.) — her mülakatın ilk sorusu.
2. Deneyim: "У меня пять лет опыта работы в..." (...'de beş yıl iş deneyimim var.)
3. "устраиваться на работу" = işe girmek; "увольняться" = işten ayrılmak.`,
    words: [
      W('exp_b1cv_1', 'Резюме', 'Rizyumé', 'Özgeçmiş / CV', 'B1', 'Değişmez nötr kelime; Fransızcadan.'),
      W('exp_b1cv_2', 'Собеседование', 'Sabisyédavaniye', 'İş görüşmesi / Mülakat', 'B1', 'беседа (sohbet) kökünden gelir.'),
      W('exp_b1cv_3', 'Опыт', 'Ópıt', 'Deneyim', 'B1', 'опыт работы = iş deneyimi.'),
      W('exp_b1cv_4', 'Навык', 'Návık', 'Beceri', 'B1', 'CV\'lerde ключевые навыки = temel beceriler.'),
      W('exp_b1cv_5', 'Зарплата', 'Zarpláta', 'Maaş', 'B1', 'заработная плата (kazanılmış ödeme) kısaltmasıdır.'),
      W('exp_b1cv_6', 'Должность', 'Dóljnast', 'Pozisyon / Görev', 'B1', 'должен (borçlu/yükümlü) köküyle akrabadır.')
    ],
    sentences: [
      S('Я отправил резюме в вашу компанию.', 'Şirketinize özgeçmişimi gönderdim.'),
      S('У меня большой опыт работы.', 'Büyük bir iş deneyimim var.')
    ]
  },
  {
    id: 'exp_b1_office', unitNumber: 95.2, levelGroup: 'B1',
    title: 'Ofiste Bir Gün', description: 'Toplantı, e-posta, son teslim tarihi',
    category: 'İş Hayatı', color: '#4f46e5', icon: '💼',
    grammarExplain: `📌 OFİS RUSÇASI:
1. "назначить встречу" = toplantı ayarlamak; "перенести встречу" = toplantıyı ertelemek.
2. Rus iş yazışması resmî "Вы" ile yapılır; e-posta "Уважаемый..." (Sayın...) diye başlar.
3. срок (süre/vade): "успеть в срок" = zamanında yetiştirmek.`,
    words: [
      W('exp_b1of_1', 'Совещание', 'Savişşániye', 'Toplantı', 'B1', 'İş toplantısı; встреча daha genel buluşmadır.'),
      W('exp_b1of_2', 'Отчёт', 'Atçót', 'Rapor', 'B1', 'считать (saymak) kökünden; Ё vurguludur.'),
      W('exp_b1of_3', 'Срок', 'Srok', 'Süre / Vade / Deadline', 'B1', 'крайний срок = son teslim tarihi.'),
      W('exp_b1of_4', 'Коллега', 'Kalyéga', 'Meslektaş / İş arkadaşı', 'B1', 'Hem kadın hem erkek için aynı biçim.'),
      W('exp_b1of_5', 'Начальник', 'Naçálnik', 'Müdür / Amir', 'B1', 'начало (başlangıç) kökünden: baştaki kişi.'),
      W('exp_b1of_6', 'Задача', 'Zadáça', 'Görev / İş', 'B1', 'Hem matematik problemi hem iş görevi demektir.')
    ],
    sentences: [
      S('Совещание начнётся через десять минут.', 'Toplantı on dakika sonra başlayacak.'),
      S('Мне нужно закончить отчёт в срок.', 'Raporu zamanında bitirmem gerekiyor.')
    ]
  },
  {
    id: 'exp_b1_car', unitNumber: 95.3, levelGroup: 'B1',
    title: 'Araba ve Trafik', description: 'Direksiyon başında: yol, kural, benzin',
    category: 'Gündelik Yaşam', color: '#dc2626', icon: '🚗',
    grammarExplain: `📌 TRAFİK DİLİ:
1. "водить машину" = araba kullanmak (genel yetenek); "ехать за рулём" = direksiyonda olmak.
2. "заправить машину" = arabaya yakıt almak; benzinlik = заправка.
3. Yol tarifinde emir kipi: поверните направо (sağa dönün), езжайте прямо (düz gidin).`,
    words: [
      W('exp_b1car_1', 'Руль', 'Rul', 'Direksiyon', 'B1', 'за рулём = direksiyon başında.'),
      W('exp_b1car_2', 'Права', 'Pravá', 'Ehliyet', 'B1', 'Kelime anlamı "haklar"; водительские права kısaltması.'),
      W('exp_b1car_3', 'Заправка', 'Zapráfka', 'Benzin istasyonu', 'B1', 'В sedasızlaşır: zapráfka.'),
      W('exp_b1car_4', 'Пробка', 'Própka', 'Trafik sıkışıklığı', 'B1', 'Asıl anlamı "mantar tıpa"; trafikte tıkanıklık demektir.'),
      W('exp_b1car_5', 'Светофор', 'Svitafór', 'Trafik lambası', 'B1', 'свет (ışık) + фор (taşıyan): ışık taşıyan.'),
      W('exp_b1car_6', 'Штраф', 'Ştraf', 'Ceza / Para cezası', 'B1', 'Almanca "Strafe"den gelir.')
    ],
    sentences: [
      S('Утром в городе большие пробки.', 'Sabah şehirde büyük trafik var.'),
      S('Мне нужно заправить машину.', 'Arabaya yakıt almam gerekiyor.')
    ]
  },
  {
    id: 'exp_b1_repair', unitNumber: 95.4, levelGroup: 'B1',
    title: 'Tamircide', description: 'Arıza anlatma, usta ile pazarlık',
    category: 'Gündelik Yaşam', color: '#78716c', icon: '🔧',
    grammarExplain: `📌 ARIZA ANLATMA:
1. "сломался/сломалась" = bozuldu: Телефон сломался. Машина сломалась.
2. "не работает" = çalışmıyor — en evrensel arıza cümlesi.
3. "Сколько будет стоить ремонт?" = Tamir ne kadar tutar?`,
    words: [
      W('exp_b1rep_1', 'Ремонт', 'Rimónt', 'Tamir / Onarım', 'B1', 'Kapılarda "Закрыто на ремонт" (tadilat nedeniyle kapalı) yazar.'),
      W('exp_b1rep_2', 'Мастер', 'Mástir', 'Usta / Tamirci', 'B1', 'вызвать мастера = usta çağırmak.'),
      W('exp_b1rep_3', 'Сломаться', 'Slamátsa', 'Bozulmak', 'B1', 'Geçmişte: сломался (eril) / сломалась (dişil).'),
      W('exp_b1rep_4', 'Запчасть', 'Zapçást', 'Yedek parça', 'B1', 'запасная часть (yedek parça) kısaltması.'),
      W('exp_b1rep_5', 'Гарантия', 'Garántiya', 'Garanti', 'B1', 'по гарантии = garanti kapsamında.'),
      W('exp_b1rep_6', 'Чинить', 'Çinít', 'Tamir etmek', 'B1', 'Tamamlanmışı починить; ремонтировать de eş anlamlı.')
    ],
    sentences: [
      S('Моя стиральная машина сломалась.', 'Çamaşır makinem bozuldu.'),
      S('Мастер придёт завтра утром.', 'Usta yarın sabah gelecek.')
    ]
  },
  {
    id: 'exp_b1_phone', unitNumber: 95.5, levelGroup: 'B1',
    title: 'Telefon ve Ayarlar', description: 'Şarj, uygulama, ekran — dijital günlük dil',
    category: 'Teknoloji', color: '#7c3aed', icon: '📱',
    grammarExplain: `📌 TELEFON RUSÇASI:
1. "зарядить телефон" = telefonu şarj etmek; "телефон разрядился" = şarjı bitti.
2. скачать (indirmek) ↔ удалить (silmek) uygulama fiilleridir.
3. Rus günlük dilinde İngilizce teknoloji kelimeleri Ruslaşır: лайкнуть (like atmak).`,
    words: [
      W('exp_b1ph_1', 'Зарядка', 'Zaryátka', 'Şarj / Şarj aleti', 'B1', 'Hem şarj işlemi hem kablo için kullanılır.'),
      W('exp_b1ph_2', 'Приложение', 'Prilajéniye', 'Uygulama / App', 'B1', 'приложить (iliştirmek) kökünden.'),
      W('exp_b1ph_3', 'Экран', 'Ekrán', 'Ekran', 'B1', 'Fransızca écran\'dan; Türkçeyle aynı kaynak.'),
      W('exp_b1ph_4', 'Скачать', 'Skaçát', 'İndirmek', 'B1', 'качать (pompalamak) kökünden türedi.'),
      W('exp_b1ph_5', 'Настройки', 'Nastróyki', 'Ayarlar', 'B1', 'Menülerde hep çoğul görürsün.'),
      W('exp_b1ph_6', 'Пароль', 'Paról', 'Şifre / Parola', 'B1', 'Fransızca "parole"den; Türkçe parola ile akraba.')
    ],
    sentences: [
      S('Мой телефон разрядился.', 'Telefonumun şarjı bitti.'),
      S('Скачай это приложение бесплатно.', 'Bu uygulamayı ücretsiz indir.')
    ]
  },
  {
    id: 'exp_b1_social', unitNumber: 95.6, levelGroup: 'B1',
    title: 'Sosyal Medya', description: 'Paylaşım, yorum, abone — internet Rusçası',
    category: 'Teknoloji', color: '#db2777', icon: '📲',
    grammarExplain: `📌 İNTERNET RUSÇASI:
1. "подписаться на + kanal/kişi" = abone olmak: подписаться на канал.
2. соцсети = социальные сети (sosyal ağlar) kısaltması.
3. İnternet argosu hızla değişir ama выложить (paylaşmak/yüklemek) kalıcıdır.`,
    words: [
      W('exp_b1sm_1', 'Соцсети', 'Sotssyéti', 'Sosyal medya', 'B1', 'социальные сети kısaltması; hep çoğul.'),
      W('exp_b1sm_2', 'Подписчик', 'Patpísçik', 'Abone / Takipçi', 'B1', 'подписаться (imzalamak/abone olmak) kökünden.'),
      W('exp_b1sm_3', 'Сообщение', 'Saabşşéniye', 'Mesaj', 'B1', 'общий (ortak) kökünden: ortaklaştırılan şey.'),
      W('exp_b1sm_4', 'Комментарий', 'Kamintáriy', 'Yorum', 'B1', 'Günlük dilde kısaca коммент denir.'),
      W('exp_b1sm_5', 'Выложить', 'Vılajıt', 'Paylaşmak / Yüklemek', 'B1', 'выложить фото = fotoğraf paylaşmak.'),
      W('exp_b1sm_6', 'Ссылка', 'Ssılka', 'Bağlantı / Link', 'B1', 'Asıl anlamı "sürgün"dü; internetle "link" oldu.')
    ],
    sentences: [
      S('Я выложил новое фото в соцсети.', 'Sosyal medyaya yeni fotoğraf paylaştım.'),
      S('Отправь мне ссылку на видео.', 'Bana videonun linkini gönder.')
    ]
  },
  {
    id: 'exp_b1_library', unitNumber: 95.7, levelGroup: 'B1',
    title: 'Kütüphane ve Okuma', description: 'Kitap ödünç alma, tür seçme, okuma alışkanlığı',
    category: 'Kültür', color: '#a16207', icon: '📚',
    grammarExplain: `📌 OKUMA DİLİ:
1. "взять книгу в библиотеке" = kütüphaneden kitap almak (ödünç).
2. Tür adları: роман (roman), рассказ (öykü), стихи (şiirler).
3. читать / прочитать çifti: süreç ↔ bitirme. "Я прочитал книгу" = kitabı bitirdim.`,
    words: [
      W('exp_b1lib_1', 'Библиотека', 'Bibliatyéka', 'Kütüphane', 'B1', 'Yunanca biblion (kitap) kökünden.'),
      W('exp_b1lib_2', 'Роман', 'Ramán', 'Roman', 'B1', 'Aynı zamanda erkek ismidir (Roman).'),
      W('exp_b1lib_3', 'Рассказ', 'Rasskás', 'Öykü / Hikâye', 'B1', 'рассказать (anlatmak) kökünden.'),
      W('exp_b1lib_4', 'Писатель', 'Pisátyel', 'Yazar', 'B1', 'Tolstoy, Dostoyevski — великие писатели.'),
      W('exp_b1lib_5', 'Страница', 'Stranítsa', 'Sayfa', 'B1', 'на странице десять = onuncu sayfada.'),
      W('exp_b1lib_6', 'Читатель', 'Çitátyel', 'Okur / Okuyucu', 'B1', 'читать (okumak) + -тель (yapan kişi eki).')
    ],
    sentences: [
      S('Я взял эту книгу в библиотеке.', 'Bu kitabı kütüphaneden aldım.'),
      S('Мой любимый писатель — Чехов.', 'En sevdiğim yazar Çehov.')
    ]
  },
  {
    id: 'exp_b1_concert', unitNumber: 95.8, levelGroup: 'B1',
    title: 'Konser ve Müzik', description: 'Sahne, bilet, şarkı — müzik hayatı',
    category: 'Kültür', color: '#e11d48', icon: '🎸',
    grammarExplain: `📌 MÜZİK DİLİ:
1. "играть на + çalgı (-е hâli)": играть на гитаре (gitar çalmak).
2. "идти на концерт" = konsere gitmek; "быть на концерте" = konserde olmak.
3. песня (şarkı) ↔ петь (şarkı söylemek): Она поёт красиво.`,
    words: [
      W('exp_b1mus_1', 'Концерт', 'Kantsért', 'Konser', 'B1', 'на концерте = konserde (в değil на).'),
      W('exp_b1mus_2', 'Песня', 'Pyésnya', 'Şarkı', 'B1', 'петь (söylemek) kökünden.'),
      W('exp_b1mus_3', 'Сцена', 'Stséna', 'Sahne', 'B1', 'на сцене = sahnede.'),
      W('exp_b1mus_4', 'Гитара', 'Gitára', 'Gitar', 'B1', 'играть на гитаре kalıbıyla kullan.'),
      W('exp_b1mus_5', 'Зритель', 'Zrítyel', 'Seyirci', 'B1', 'зреть (görmek, eski fiil) kökünden.'),
      W('exp_b1mus_6', 'Выступление', 'Vıstuplyéniye', 'Sahne alma / Performans', 'B1', 'выступать = sahneye çıkmak, konuşma yapmak.')
    ],
    sentences: [
      S('Мы идём на концерт в субботу.', 'Cumartesi konsere gidiyoruz.'),
      S('Эта песня очень популярна.', 'Bu şarkı çok popüler.')
    ]
  },
  {
    id: 'exp_b1_camping', unitNumber: 95.9, levelGroup: 'B1',
    title: 'Kamp ve Doğa Yürüyüşü', description: 'Çadır, kamp ateşi, rota — поход kültürü',
    category: 'Gündelik Yaşam', color: '#16a34a', icon: '⛺',
    grammarExplain: `📌 ПОХОД (DOĞA GEZİSİ) DİLİ:
1. "идти в поход" = kampa/doğa yürüyüşüne gitmek — Rus gençliğinin klasiği.
2. "разжечь костёр" = kamp ateşi yakmak; "поставить палатку" = çadır kurmak.
3. Yön/mekân çifti: в горы (dağlara — yön) ↔ в горах (dağlarda — mekân).`,
    words: [
      W('exp_b1cmp_1', 'Поход', 'Pahót', 'Doğa yürüyüşü / Kamp gezisi', 'B1', 'ходить (yürümek) kökünden.'),
      W('exp_b1cmp_2', 'Палатка', 'Palátka', 'Çadır', 'B1', 'поставить палатку = çadır kurmak.'),
      W('exp_b1cmp_3', 'Костёр', 'Kastyór', 'Kamp ateşi', 'B1', 'Gitar + костёр = klasik Rus kamp akşamı.'),
      W('exp_b1cmp_4', 'Рюкзак', 'Ryugzák', 'Sırt çantası', 'B1', 'Almanca Rucksack\'tan; К sedalılaşıp G okunur.'),
      W('exp_b1cmp_5', 'Маршрут', 'Marşrút', 'Rota / Güzergâh', 'B1', 'Almanca üzerinden Fransızcadan gelir.'),
      W('exp_b1cmp_6', 'Спальник', 'Spálnik', 'Uyku tulumu', 'B1', 'спальный мешок (uyku torbası) kısaltması.')
    ],
    sentences: [
      S('Летом мы идём в поход в горы.', 'Yazın dağlara doğa yürüyüşüne gidiyoruz.'),
      S('Вечером мы разожгли костёр.', 'Akşam kamp ateşi yaktık.')
    ]
  },
  {
    id: 'exp_b1_emergency', unitNumber: 95.95, levelGroup: 'B1',
    title: 'Acil Durumlar', description: 'Yardım çağırma, 112, kayıp eşya bildirme',
    category: 'Gündelik Yaşam', color: '#b91c1c', icon: '🚨',
    grammarExplain: `📌 ACİL DURUM KALIPLARI:
1. "Помогите!" (İmdat/Yardım edin!) — hayat kurtaran kelime.
2. "Вызовите скорую/полицию!" = Ambulans/polis çağırın!
3. Rusya'da acil numara 112'dir; скорая помощь (ambulans) kısaca скорая denir.`,
    words: [
      W('exp_b1em_1', 'Помощь', 'Pómaşş', 'Yardım', 'B1', 'скорая помощь = ambulans (hızlı yardım).'),
      W('exp_b1em_2', 'Скорая', 'Skóraya', 'Ambulans', 'B1', 'Tam adı скорая помощь; günlük dilde kısaltılır.'),
      W('exp_b1em_3', 'Пожар', 'Pajár', 'Yangın', 'B1', 'Yangın söndürme aracı: пожарная машина.'),
      W('exp_b1em_4', 'Полиция', 'Palítsiya', 'Polis (teşkilat)', 'B1', 'Tek polis memuru: полицейский.'),
      W('exp_b1em_5', 'Потерять', 'Patiryát', 'Kaybetmek', 'B1', 'Я потерял паспорт. = Pasaportumu kaybettim.'),
      W('exp_b1em_6', 'Опасно', 'Apásna', 'Tehlikeli', 'B1', 'Uyarı levhalarında sık görülür: Опасно!')
    ],
    sentences: [
      S('Вызовите скорую, пожалуйста!', 'Ambulans çağırın lütfen!'),
      S('Я потерял свой паспорт.', 'Pasaportumu kaybettim.')
    ]
  }
];

export const EXPANSION_B2: UnitModule[] = [
  {
    id: 'exp_b2_hospital', unitNumber: 143.1, levelGroup: 'B2',
    title: 'Hastanede İleri Düzey', description: 'Muayene, tahlil, teşhis — doktorla derin konuşma',
    category: 'Sağlık', color: '#0891b2', icon: '🏥',
    grammarExplain: `📌 TIBBİ KONUŞMA:
1. "Меня беспокоит..." (Beni ... rahatsız ediyor) — semptom anlatmanın kibar yolu.
2. "сдать анализы" = tahlil yaptırmak; "поставить диагноз" = teşhis koymak.
3. Edilgen yapılar tıpta yaygındır: "Вам назначено лечение." (Size tedavi verildi.)`,
    words: [
      W('exp_b2h_1', 'Обследование', 'Apslyédavaniye', 'Muayene / Tetkik', 'B2', 'пройти обследование = tetkikten geçmek.'),
      W('exp_b2h_2', 'Анализ', 'Anális', 'Tahlil', 'B2', 'сдать анализ крови = kan tahlili vermek.'),
      W('exp_b2h_3', 'Диагноз', 'Diágnas', 'Teşhis', 'B2', 'поставить диагноз = teşhis koymak.'),
      W('exp_b2h_4', 'Лечение', 'Liçéniye', 'Tedavi', 'B2', 'лечить (tedavi etmek) kökünden.'),
      W('exp_b2h_5', 'Давление', 'Davlyéniye', 'Tansiyon / Basınç', 'B2', 'у меня высокое давление = tansiyonum yüksek.'),
      W('exp_b2h_6', 'Страховка', 'Strahófka', 'Sigorta', 'B2', 'медицинская страховка = sağlık sigortası.')
    ],
    sentences: [
      S('Меня беспокоит боль в спине.', 'Sırt ağrısı beni rahatsız ediyor.'),
      S('Врач назначил мне лечение.', 'Doktor bana tedavi verdi.')
    ]
  },
  {
    id: 'exp_b2_contract', unitNumber: 143.2, levelGroup: 'B2',
    title: 'Sözleşme ve Hukuk Dili', description: 'İmza, madde, taraflar — resmî belgeleri anlama',
    category: 'İş Hayatı', color: '#475569', icon: '⚖️',
    grammarExplain: `📌 RESMÎ BELGE DİLİ:
1. Sözleşmelerde taraflar: "Стороны договорились о..." (Taraflar ... konusunda anlaştı.)
2. "в соответствии с + araç hâli" = ...'e uygun olarak: в соответствии с договором.
3. Edilgen sıfat-fiiller resmî dilin imzasıdır: подписанный (imzalanmış), указанный (belirtilen).`,
    words: [
      W('exp_b2c_1', 'Договор', 'Dagavór', 'Sözleşme', 'B2', 'заключить договор = sözleşme imzalamak/akdetmek.'),
      W('exp_b2c_2', 'Подпись', 'Pótpis', 'İmza', 'B2', 'поставить подпись = imza atmak.'),
      W('exp_b2c_3', 'Сторона', 'Staraná', 'Taraf', 'B2', 'Hukukta taraf; günlük dilde yön/taraf.'),
      W('exp_b2c_4', 'Условие', 'Uslóviye', 'Şart / Koşul', 'B2', 'условия договора = sözleşme şartları.'),
      W('exp_b2c_5', 'Обязательство', 'Abizátilstva', 'Yükümlülük', 'B2', 'обязан (yükümlü) kökünden.'),
      W('exp_b2c_6', 'Юрист', 'Yuríst', 'Hukukçu / Avukat', 'B2', 'Mahkeme avukatı özel olarak адвокат denir.')
    ],
    sentences: [
      S('Мы подписали договор вчера.', 'Sözleşmeyi dün imzaladık.'),
      S('Прочитайте все условия внимательно.', 'Tüm şartları dikkatlice okuyun.')
    ]
  },
  {
    id: 'exp_b2_startup', unitNumber: 143.3, levelGroup: 'B2',
    title: 'Startup Dünyası', description: 'Yatırım, proje, ekip — girişimcilik Rusçası',
    category: 'İş Hayatı', color: '#9333ea', icon: '🚀',
    grammarExplain: `📌 GİRİŞİMCİLİK DİLİ:
1. "запустить проект" = proje başlatmak (roket fırlatmakla aynı fiil!).
2. "привлечь инвестиции" = yatırım çekmek.
3. İngilizce terimler Ruslaşır: стартап, питч, дедлайн — ama çekim eklerini alırlar.`,
    words: [
      W('exp_b2s_1', 'Стартап', 'Startáp', 'Startup / Girişim', 'B2', 'İngilizceden; normal isim gibi çekimlenir.'),
      W('exp_b2s_2', 'Инвестор', 'İnvyéstar', 'Yatırımcı', 'B2', 'привлечь инвестора = yatırımcı bulmak.'),
      W('exp_b2s_3', 'Запустить', 'Zapustít', 'Başlatmak / Fırlatmak', 'B2', 'Hem roket hem proje için aynı fiil.'),
      W('exp_b2s_4', 'Прибыль', 'Príbıl', 'Kâr', 'B2', 'Zıddı: убыток (zarar).'),
      W('exp_b2s_5', 'Команда', 'Kamánda', 'Ekip / Takım', 'B2', 'Hem spor takımı hem iş ekibi.'),
      W('exp_b2s_6', 'Рынок', 'Rınak', 'Pazar / Piyasa', 'B2', 'выйти на рынок = pazara girmek.')
    ],
    sentences: [
      S('Мы запустили наш стартап в прошлом году.', 'Startup\'ımızı geçen yıl başlattık.'),
      S('Инвестор поверил в нашу команду.', 'Yatırımcı ekibimize inandı.')
    ]
  },
  {
    id: 'exp_b2_marketing', unitNumber: 143.4, levelGroup: 'B2',
    title: 'Pazarlama ve Reklam', description: 'Marka, hedef kitle, kampanya dili',
    category: 'İş Hayatı', color: '#ea580c', icon: '📣',
    grammarExplain: `📌 PAZARLAMA DİLİ:
1. "целевая аудитория" = hedef kitle — pazarlamanın anahtar terimi.
2. "продвигать товар" = ürünü tanıtmak/pazarlamak.
3. Reklam sloganlarında emir kipi hükmeder: Купи! Попробуй! Узнай больше!`,
    words: [
      W('exp_b2mk_1', 'Реклама', 'Rikláma', 'Reklam', 'B2', 'рекламный ролик = reklam filmi.'),
      W('exp_b2mk_2', 'Бренд', 'Brent', 'Marka', 'B2', 'Sondaki Д sedasızlaşır; известный бренд = ünlü marka.'),
      W('exp_b2mk_3', 'Аудитория', 'Auditóriya', 'Kitle / İzleyici', 'B2', 'Hem üniversite amfisi hem hedef kitle.'),
      W('exp_b2mk_4', 'Продвижение', 'Pradvijéniye', 'Tanıtım / Promosyon', 'B2', 'двигать (hareket ettirmek) kökünden.'),
      W('exp_b2mk_5', 'Скидка', 'Skítka', 'İndirim', 'B2', 'скидка тридцать процентов = %30 indirim.'),
      W('exp_b2mk_6', 'Спрос', 'Spros', 'Talep', 'B2', 'спрос и предложение = arz ve talep.')
    ],
    sentences: [
      S('Наша реклама привлекла новую аудиторию.', 'Reklamımız yeni bir kitle çekti.'),
      S('Спрос на этот товар растёт.', 'Bu ürüne talep artıyor.')
    ]
  },
  {
    id: 'exp_b2_presentation', unitNumber: 143.5, levelGroup: 'B2',
    title: 'Sunum Yapma Sanatı', description: 'Slayt, grafik, soru-cevap — topluluk önünde konuşma',
    category: 'İş Hayatı', color: '#0d9488', icon: '🎤',
    grammarExplain: `📌 SUNUM KALIPLARI:
1. Açılış: "Сегодня я расскажу о..." (Bugün ... hakkında anlatacağım.)
2. Geçiş: "Перейдём к следующему слайду." (Sonraki slayta geçelim.)
3. Kapanış: "Есть ли у вас вопросы?" (Sorunuz var mı?)`,
    words: [
      W('exp_b2pr_1', 'Доклад', 'Daklát', 'Sunum / Bildiri', 'B2', 'делать доклад = sunum yapmak.'),
      W('exp_b2pr_2', 'Слайд', 'Slayt', 'Slayt', 'B2', 'на следующем слайде = sonraki slaytta.'),
      W('exp_b2pr_3', 'График', 'Gráfik', 'Grafik / Çizelge', 'B2', 'Hem grafik hem çalışma programı demektir.'),
      W('exp_b2pr_4', 'Убедить', 'Ubidít', 'İkna etmek', 'B2', 'убедительный = ikna edici.'),
      W('exp_b2pr_5', 'Вывод', 'Vıvat', 'Sonuç / Çıkarım', 'B2', 'сделать вывод = sonuç çıkarmak.'),
      W('exp_b2pr_6', 'Вопрос', 'Vaprós', 'Soru', 'B2', 'задать вопрос = soru sormak (задать fiiliyle!).')
    ],
    sentences: [
      S('Посмотрите на этот график.', 'Bu grafiğe bakın.'),
      S('В конце я сделаю краткий вывод.', 'Sonunda kısa bir sonuç çıkaracağım.')
    ]
  },
  {
    id: 'exp_b2_environment', unitNumber: 143.6, levelGroup: 'B2',
    title: 'Çevre ve İklim', description: 'Geri dönüşüm, kirlilik, iklim değişikliği tartışmaları',
    category: 'Toplum', color: '#15803d', icon: '🌍',
    grammarExplain: `📌 ÇEVRE TARTIŞMASI DİLİ:
1. "загрязнение окружающей среды" = çevre kirliliği — haber dilinin klasiği.
2. "влиять на + belirtme hâli" = ...'i etkilemek: влиять на климат.
3. Soyut isimler -ние/-ство ekleriyle türer: изменение (değişim), потепление (ısınma).`,
    words: [
      W('exp_b2en_1', 'Окружающая среда', 'Akrujáyuşşaya sridá', 'Çevre', 'B2', 'Kelimesi kelimesine "kuşatan ortam".'),
      W('exp_b2en_2', 'Загрязнение', 'Zagriznyéniye', 'Kirlilik', 'B2', 'грязь (kir/çamur) kökünden.'),
      W('exp_b2en_3', 'Переработка', 'Pirirabótka', 'Geri dönüşüm', 'B2', 'пере- (yeniden) + работка (işleme).'),
      W('exp_b2en_4', 'Климат', 'Klímat', 'İklim', 'B2', 'изменение климата = iklim değişikliği.'),
      W('exp_b2en_5', 'Мусор', 'Músar', 'Çöp', 'B2', 'сортировать мусор = çöpü ayrıştırmak.'),
      W('exp_b2en_6', 'Потепление', 'Patiplyéniye', 'Isınma', 'B2', 'глобальное потепление = küresel ısınma.')
    ],
    sentences: [
      S('Загрязнение воздуха — большая проблема.', 'Hava kirliliği büyük bir sorun.'),
      S('Мы должны сортировать мусор.', 'Çöpü ayrıştırmalıyız.')
    ]
  },
  {
    id: 'exp_b2_therapy', unitNumber: 143.7, levelGroup: 'B2',
    title: 'Psikoloji ve İç Dünya', description: 'Duyguları derinlemesine anlatma, stres ve motivasyon',
    category: 'Sağlık', color: '#c026d3', icon: '🧠',
    grammarExplain: `📌 DUYGU DERİNLİĞİ:
1. "переживать из-за + tamlayan" = ... yüzünden kaygılanmak: переживать из-за работы.
2. "справиться с + araç hâli" = ...'in üstesinden gelmek: справиться со стрессом.
3. Dönüşlü fiiller iç dünyayı anlatır: волноваться, успокоиться, расслабиться.`,
    words: [
      W('exp_b2th_1', 'Стресс', 'Stress', 'Stres', 'B2', 'справиться со стрессом = stresle başa çıkmak.'),
      W('exp_b2th_2', 'Переживать', 'Pirijıvát', 'Kaygılanmak / Dert etmek', 'B2', '"Не переживай!" = Dert etme!'),
      W('exp_b2th_3', 'Успокоиться', 'Uspakóitsa', 'Sakinleşmek', 'B2', 'покой (huzur) kökünden dönüşlü fiil.'),
      W('exp_b2th_4', 'Уверенность', 'Uvyérinnast', 'Özgüven / Emin olma', 'B2', 'уверенность в себе = kendine güven.'),
      W('exp_b2th_5', 'Привычка', 'Privıçka', 'Alışkanlık', 'B2', 'привыкнуть (alışmak) kökünden.'),
      W('exp_b2th_6', 'Цель', 'Tsel', 'Hedef / Amaç', 'B2', 'поставить цель = hedef koymak.')
    ],
    sentences: [
      S('Не переживай, всё будет хорошо.', 'Dert etme, her şey iyi olacak.'),
      S('Спорт помогает справиться со стрессом.', 'Spor stresle başa çıkmaya yardım eder.')
    ]
  },
  {
    id: 'exp_b2_renovation', unitNumber: 143.8, levelGroup: 'B2',
    title: 'Ev Tadilatı', description: 'Duvar boyama, zemin, usta pazarlığı — ремонт kültürü',
    category: 'Gündelik Yaşam', color: '#a3a3a3', icon: '🛠️',
    grammarExplain: `📌 TADİLAT DİLİ:
1. Rusçada "делать ремонт" (tadilat yapmak) neredeyse millî bir uğraştır.
2. "покрасить стены" = duvarları boyamak; "поклеить обои" = duvar kâğıdı yapıştırmak.
3. Zaman kestirimi: "Ремонт займёт две недели." (Tadilat iki hafta sürer.)`,
    words: [
      W('exp_b2rn_1', 'Стена', 'Stiná', 'Duvar', 'B2', 'Çoğulu стены (vurgu başa kayar).'),
      W('exp_b2rn_2', 'Обои', 'Abói', 'Duvar kâğıdı', 'B2', 'Hep çoğul kullanılır; Rus evlerinin klasiği.'),
      W('exp_b2rn_3', 'Краска', 'Kráska', 'Boya', 'B2', 'красить = boyamak; красный (kırmızı) ile akraba.'),
      W('exp_b2rn_4', 'Пол', 'Pol', 'Zemin / Döşeme', 'B2', 'Dikkat: пол hem "zemin" hem "cinsiyet" demektir!'),
      W('exp_b2rn_5', 'Потолок', 'Patalók', 'Tavan', 'B2', 'Akanje ile: patalók.'),
      W('exp_b2rn_6', 'Плитка', 'Plítka', 'Fayans / Karo', 'B2', 'положить плитку = fayans döşemek.')
    ],
    sentences: [
      S('Мы делаем ремонт в квартире.', 'Dairede tadilat yapıyoruz.'),
      S('Я хочу покрасить стены в белый цвет.', 'Duvarları beyaza boyamak istiyorum.')
    ]
  },
  {
    id: 'exp_b2_prosport', unitNumber: 143.9, levelGroup: 'B2',
    title: 'Profesyonel Spor', description: 'Maç, şampiyona, rekor — spor haberleri dili',
    category: 'Kültür', color: '#2563eb', icon: '🏆',
    grammarExplain: `📌 SPOR HABERİ DİLİ:
1. "выиграть у + tamlayan" = ...'i yenmek: Мы выиграли у соперника.
2. "со счётом 3:1" = 3-1'lik skorla — skor okuma kalıbı.
3. побить рекорд = rekor kırmak (kelimesi kelimesine "rekoru dövmek").`,
    words: [
      W('exp_b2sp_1', 'Соревнование', 'Sarivnavániye', 'Yarışma / Müsabaka', 'B2', 'Genelde çoğul: соревнования.'),
      W('exp_b2sp_2', 'Чемпионат', 'Çimpianát', 'Şampiyona', 'B2', 'чемпионат мира = dünya şampiyonası.'),
      W('exp_b2sp_3', 'Соперник', 'Sapyérnik', 'Rakip', 'B2', 'сильный соперник = güçlü rakip.'),
      W('exp_b2sp_4', 'Победа', 'Pabyéda', 'Zafer / Galibiyet', 'B2', 'победить = yenmek; День Победы = Zafer Günü.'),
      W('exp_b2sp_5', 'Рекорд', 'Rikórt', 'Rekor', 'B2', 'побить рекорд = rekor kırmak.'),
      W('exp_b2sp_6', 'Тренер', 'Trénir', 'Antrenör', 'B2', 'главный тренер = baş antrenör/teknik direktör.')
    ],
    sentences: [
      S('Наша команда выиграла чемпионат.', 'Takımımız şampiyonayı kazandı.'),
      S('Он побил мировой рекорд.', 'O, dünya rekorunu kırdı.')
    ]
  },
  {
    id: 'exp_b2_media', unitNumber: 143.95, levelGroup: 'B2',
    title: 'Medya ve Haber Dili', description: 'Gazete başlıkları, kaynak, manşet çözümleme',
    category: 'Toplum', color: '#525252', icon: '📰',
    grammarExplain: `📌 HABER DİLİ:
1. "по данным + tamlayan" = ...verilerine göre: по данным исследования.
2. "сообщать/сообщить" = bildirmek — haber metinlerinin ana fiili.
3. Başlıklar genelde fiilsizdir: "Рост цен на нефть" (Petrol fiyatlarında artış).`,
    words: [
      W('exp_b2md_1', 'Новости', 'Nóvasti', 'Haberler', 'B2', 'Hep çoğul; tekili новость (havadis).'),
      W('exp_b2md_2', 'Источник', 'İstóçnik', 'Kaynak', 'B2', 'по данным источника = kaynağa göre.'),
      W('exp_b2md_3', 'Заголовок', 'Zagalóvak', 'Başlık / Manşet', 'B2', 'голова (baş) kökünden.'),
      W('exp_b2md_4', 'Событие', 'Sabıtiye', 'Olay', 'B2', 'главное событие дня = günün ana olayı.'),
      W('exp_b2md_5', 'Сообщить', 'Saabşşít', 'Bildirmek / Haber vermek', 'B2', 'Haber metinlerinin bir numaralı fiili.'),
      W('exp_b2md_6', 'Мнение', 'Mnyéniye', 'Görüş / Kanaat', 'B2', 'по моему мнению = bence, benim görüşüme göre.')
    ],
    sentences: [
      S('СМИ сообщили о важном событии.', 'Medya önemli bir olayı bildirdi.'),
      S('Каждый источник даёт своё мнение.', 'Her kaynak kendi görüşünü veriyor.')
    ]
  }
];
