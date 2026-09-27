// ==========================================================
// EK MÜFREDAT — GÜNDELİK YAŞAM 2 KAT PAKETİ, PARTİ 1/3 (A2, Ünite 32-41)
// "Gündelik hayatta kullanacağım her şey" genişlemesi: metro rutini,
// eczane, kart/ATM, sabah rutini, evcil hayvan, terzi, usta çağırma,
// hediye seçme, mesajlaşma ve kayıp eşya.
// Format, curriculumData.ts'teki UNITS_DATA ile BİREBİR aynıdır.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_DAILY2A: UnitModule[] = [
  {
    id: 'mod_a2_d1',
    unitNumber: 32,
    levelGroup: 'A2',
    title: 'Metro & Şehir İçi Ulaşım Rutini',
    description: 'Her gün binilen metro/otobüs: kart basma, aktarma, inilecek durak',
    category: 'Gündelik Yaşam',
    color: '#0ea5e9',
    icon: '🚇',
    grammarExplain: `📌 ULAŞIMDA YÖN & DURAK DİLİ:
1. "Ехать на + Prepositional" (bir araçLA gitmek): "еду на метро" (metroyla gidiyorum), "на автобусе" (otobüsle).
2. "Выходить на + durak" (durakta inmek): metroda klasik soru — "Вы выходите на следующей?" (Bir sonrakinde iniyor musunuz?)
3. "Пересадка" (aktarma) kelimesi "пере-" (öte/yeniden) önekiyle kurulur: сделать пересадку = aktarma yapmak.`,
    words: [
      { id: 'wd32_1', ru: 'Метро', reading: 'Mitró', tr: 'Metro', level: 'A2', usageNote: 'Vurgu sondadır; Moskova metrosu şehrin gurur kaynağıdır.' },
      { id: 'wd32_2', ru: 'Станция', reading: 'Stántsiya', tr: 'İstasyon', level: 'A2', usageNote: 'Metro durağı "станция", otobüs durağı "остановка"dır — karıştırma!' },
      { id: 'wd32_3', ru: 'Остановка', reading: 'Astanófka', tr: 'Durak', level: 'A2', usageNote: 'Vurgusuz О\'lar A okunur: "astanófka".' },
      { id: 'wd32_4', ru: 'Проездной', reading: 'Prayiznóy', tr: 'Ulaşım kartı / Abonman', level: 'A2', usageNote: 'Moskova\'da "Тройка" kartı en bilinen örnektir.' },
      { id: 'wd32_5', ru: 'Пересадка', reading: 'Pirisátka', tr: 'Aktarma', level: 'A2', usageNote: '"Сделать пересадку" (aktarma yapmak) kalıbıyla kullanılır.' },
      { id: 'wd32_6', ru: 'Вагон', reading: 'Vagón', tr: 'Vagon', level: 'A2', usageNote: '"Первый вагон из центра" (merkezden ilk vagon) buluşma klasiğidir.' },
      { id: 'wd32_7', ru: 'Следующая', reading: 'Slyéduyuşşaya', tr: 'Bir sonraki (durak)', level: 'A2', usageNote: 'Anonslardaki en ünlü kelime: "Следующая станция..."' },
      { id: 'wd32_8', ru: 'Выход', reading: 'Vı́hat', tr: 'Çıkış', level: 'A2', usageNote: 'Sondaki Д sedasızlaşır; "выход в город" = şehre çıkış.' },
      { id: 'wd32_9', ru: 'Троллейбус', reading: 'Tralyéybus', tr: 'Troleybüs', level: 'A2', usageNote: 'Rus şehirlerinin klasik elektrikli otobüsü.' },
      { id: 'wd32_10', ru: 'Час пик', reading: 'Çyas pik', tr: 'Yoğun saat', level: 'A2', usageNote: 'Sabah 8-9 metrosu: "в час пик" (yoğun saatte).' }
    ],
    sentences: [
      { ru: 'Я еду на работу на метро.', tr: 'İşe metroyla gidiyorum.', scrambled: ['на метро.', 'Я', 'на работу', 'еду'], correct: ['Я', 'еду', 'на работу', 'на метро.'] },
      { ru: 'Вы выходите на следующей остановке?', tr: 'Bir sonraki durakta iniyor musunuz?', scrambled: ['остановке?', 'Вы', 'на следующей', 'выходите'], correct: ['Вы', 'выходите', 'на следующей', 'остановке?'] }
    ],
    sceneTitle: 'Sabah Metrosunda',
    sceneContext: 'Yoğun saatte metroda geçen tipik bir sabah: kart basma, kalabalık vagon ve inilecek durağı kaçırmama telaşı.',
    dialogue: [
      { speaker: 'Yolcu', ru: 'Извините, вы выходите на следующей?', reading: 'Izviníte, vı vıhóditye na slyéduyuşşey?', tr: 'Affedersiniz, bir sonrakinde iniyor musunuz?' },
      { speaker: 'Dima', ru: 'Нет, проходите, пожалуйста.', reading: 'Nyet, prahadítye, pajálusta.', tr: 'Hayır, geçin lütfen.' },
      { speaker: 'Yolcu', ru: 'А где пересадка на кольцевую линию?', reading: 'A gdye pirisátka na kal\'tsevúyu líniyu?', tr: 'Peki çevre hattına aktarma nerede?' },
      { speaker: 'Dima', ru: 'Через одну станцию. Я тоже там выхожу.', reading: 'Çyéris adnú stántsiyu. Ya tóje tam vıhajú.', tr: 'Bir istasyon sonra. Ben de orada iniyorum.' }
    ]
  },
  {
    id: 'mod_a2_d2',
    unitNumber: 33,
    levelGroup: 'A2',
    title: 'Eczane & Küçük Şikayetler',
    description: 'Eczane tezgahında derdini anlatma: ağrı, soğuk algınlığı, ilaç sorma',
    category: 'Gündelik Yaşam',
    color: '#10b981',
    icon: '💊',
    grammarExplain: `📌 AĞRI ANLATMA KALIBI:
1. "У меня болит + organ": "У меня болит голова" (Başım ağrıyor) — Rusçada "ben ağrıyorum" değil, "bende ağrıyor" denir.
2. Çoğul organlarda fiil değişir: "болят зубы" (dişlerim ağrıyor).
3. "Что-нибудь от + Genitive" (bir şey ... için): "Что-нибудь от головы" (baş ağrısı için bir şey) — eczanenin altın kalıbı.`,
    words: [
      { id: 'wd33_1', ru: 'Аптека', reading: 'Aptyéka', tr: 'Eczane', level: 'A2', usageNote: 'Rusya\'da eczaneler 7/24 açık olabilir: "круглосуточно".' },
      { id: 'wd33_2', ru: 'Лекарство', reading: 'Likárstva', tr: 'İlaç', level: 'A2', usageNote: 'Nötr cinstir; "лекарство от кашля" (öksürük ilacı).' },
      { id: 'wd33_3', ru: 'Таблетка', reading: 'Tablyétka', tr: 'Hap / Tablet', level: 'A2', usageNote: '"Принять таблетку" (hap almak) kalıbıyla kullanılır.' },
      { id: 'wd33_4', ru: 'Болит', reading: 'Balít', tr: 'Ağrıyor', level: 'A2', usageNote: '"У меня болит..." kalıbının kalbi; çoğulda "болят".' },
      { id: 'wd33_5', ru: 'Температура', reading: 'Timpiratúra', tr: 'Ateş (vücut ısısı)', level: 'A2', usageNote: '"У меня температура" = ateşim var; 36,6 normaldir.' },
      { id: 'wd33_6', ru: 'Простуда', reading: 'Prastúda', tr: 'Soğuk algınlığı', level: 'A2', usageNote: 'Rus kışının resmi hastalığı; fiili "простудиться".' },
      { id: 'wd33_7', ru: 'Рецепт', reading: 'Ritsépt', tr: 'Reçete', level: 'A2', usageNote: 'Hem doktor reçetesi hem yemek tarifi anlamına gelir!' },
      { id: 'wd33_8', ru: 'Витамины', reading: 'Vitamíny', tr: 'Vitaminler', level: 'A2', usageNote: 'Kışın eczane vitrinlerinin yıldızıdır.' },
      { id: 'wd33_9', ru: 'Пластырь', reading: "Plástır'", tr: 'Yara bandı', level: 'A2', usageNote: 'Yumuşak işaretle biter; çantada taşımak adettir.' },
      { id: 'wd33_10', ru: 'Сироп', reading: 'Siróp', tr: 'Şurup', level: 'A2', usageNote: '"Сироп от кашля" (öksürük şurubu) en sık istenen üründür.' }
    ],
    sentences: [
      { ru: 'У меня болит голова.', tr: 'Başım ağrıyor.', scrambled: ['голова.', 'У меня', 'болит'], correct: ['У меня', 'болит', 'голова.'] },
      { ru: 'Дайте что-нибудь от простуды, пожалуйста.', tr: 'Soğuk algınlığı için bir şey verin lütfen.', scrambled: ['пожалуйста.', 'Дайте', 'от простуды,', 'что-нибудь'], correct: ['Дайте', 'что-нибудь', 'от простуды,', 'пожалуйста.'] }
    ],
    sceneTitle: 'Gece Eczanesinde',
    sceneContext: 'Soğuk bir akşam, nöbetçi eczane: boğazı ağrıyan bir müşteri eczacıya derdini anlatıyor.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Здравствуйте! У меня болит горло и температура.', reading: 'Zdrástvuytye! U minyá balít górla i timpiratúra.', tr: 'Merhaba! Boğazım ağrıyor ve ateşim var.' },
      { speaker: 'Eczacı', ru: 'Похоже на простуду. Вот сироп и таблетки.', reading: 'Pahóje na prastúdu. Vot siróp i tablyétki.', tr: 'Soğuk algınlığına benziyor. İşte şurup ve haplar.' },
      { speaker: 'Müşteri', ru: 'А рецепт нужен?', reading: 'A ritsépt nújın?', tr: 'Peki reçete gerekiyor mu?' },
      { speaker: 'Eczacı', ru: 'Нет, это без рецепта. Пейте три раза в день.', reading: 'Nyet, éta bis ritsépta. Pyéytye tri ráza v dyen\'.', tr: 'Hayır, bu reçetesiz. Günde üç kez için.' }
    ]
  },
  {
    id: 'mod_a2_d3',
    unitNumber: 34,
    levelGroup: 'A2',
    title: 'Kart, Nakit & ATM',
    description: 'Günlük ödemeler: kartla ödeme, para çekme, bozuk para ve para üstü',
    category: 'Gündelik Yaşam',
    color: '#f59e0b',
    icon: '💳',
    grammarExplain: `📌 ÖDEME DİLİ:
1. "Платить картой / наличными" (kartla / nakitle ödemek): araçsal hâl (Творительный падеж) kullanılır — kart İLE.
2. "Снять деньги" (para çekmek) ↔ "положить деньги" (para yatırmak): ATM'nin iki temel fiili.
3. Kasada klasik soru: "Картой или наличными?" (Kart mı nakit mi?) — tek kelimeyle "Картой!" diye cevap verilebilir.`,
    words: [
      { id: 'wd34_1', ru: 'Карта', reading: 'Kárta', tr: 'Kart (banka kartı)', level: 'A2', usageNote: 'Hem harita hem kart demektir; bağlam belirler.' },
      { id: 'wd34_2', ru: 'Наличные', reading: 'Nalíçnıye', tr: 'Nakit', level: 'A2', usageNote: 'Hep çoğuldur; kısaca "нал" da denir (argo).' },
      { id: 'wd34_3', ru: 'Банкомат', reading: 'Bankamát', tr: 'ATM', level: 'A2', usageNote: '"Где ближайший банкомат?" (En yakın ATM nerede?) hayat kurtarır.' },
      { id: 'wd34_4', ru: 'Снять деньги', reading: "Snyat' dyén'gi", tr: 'Para çekmek', level: 'A2', usageNote: 'ATM ekranındaki ana işlem: "снятие наличных".' },
      { id: 'wd34_5', ru: 'Перевод', reading: 'Pirivót', tr: 'Havale / Transfer', level: 'A2', usageNote: 'Hem para transferi hem çeviri anlamındadır!' },
      { id: 'wd34_6', ru: 'Сдача', reading: 'Zdáça', tr: 'Para üstü', level: 'A2', usageNote: 'С, Д\'den önce sedalılaşıp Z okunur: "zdáça".' },
      { id: 'wd34_7', ru: 'Платить', reading: "Platít'", tr: 'Ödemek', level: 'A2', usageNote: 'Tamamlanmış hali "заплатить"tir.' },
      { id: 'wd34_8', ru: 'Бесплатно', reading: 'Bisplátna', tr: 'Ücretsiz', level: 'A2', usageNote: 'Herkesin en sevdiği kelime; "без платы" (ödemesiz) kökünden gelir.' },
      { id: 'wd34_9', ru: 'Кошелёк', reading: 'Kaşılyók', tr: 'Cüzdan', level: 'A2', usageNote: 'Ё her zaman vurguludur: kaşıl-YOK.' },
      { id: 'wd34_10', ru: 'Мелочь', reading: "Myélaç'", tr: 'Bozuk para', level: 'A2', usageNote: '"У вас есть мелочь?" (Bozuğunuz var mı?) kasa klasiğidir.' }
    ],
    sentences: [
      { ru: 'Можно заплатить картой?', tr: 'Kartla ödeyebilir miyim?', scrambled: ['картой?', 'Можно', 'заплатить'], correct: ['Можно', 'заплатить', 'картой?'] },
      { ru: 'Где ближайший банкомат?', tr: 'En yakın ATM nerede?', scrambled: ['банкомат?', 'Где', 'ближайший'], correct: ['Где', 'ближайший', 'банкомат?'] }
    ],
    sceneTitle: 'Kasada Kart Krizi',
    sceneContext: 'Küçük bir dükkanda kart cihazı çalışmıyor; müşteri nakit arıyor, kasiyer ATM tarif ediyor.',
    dialogue: [
      { speaker: 'Kasiyer', ru: 'Извините, терминал не работает. Только наличные.', reading: 'Izviníte, terminál ni rabótayet. Tól\'ka nalíçnıye.', tr: 'Üzgünüm, cihaz çalışmıyor. Sadece nakit.' },
      { speaker: 'Müşteri', ru: 'Ой, у меня нет наличных. Где банкомат?', reading: 'Oy, u minyá nyet nalíçnıh. Gdye bankamát?', tr: 'Ah, nakitim yok. ATM nerede?' },
      { speaker: 'Kasiyer', ru: 'За углом, рядом с аптекой. Это бесплатно.', reading: 'Za uglóm, ryádam s aptyékay. Éta bisplátna.', tr: 'Köşeyi dönünce, eczanenin yanında. Ücretsiz.' },
      { speaker: 'Müşteri', ru: 'Спасибо! Я сниму деньги и вернусь.', reading: 'Spasíba! Ya snimú dyén\'gi i virnús\'.', tr: 'Teşekkürler! Para çekip döneceğim.' }
    ]
  },
  {
    id: 'mod_a2_d4',
    unitNumber: 35,
    levelGroup: 'A2',
    title: 'Sabah Rutini & Günlük Program',
    description: 'Uyanmaktan uyumaya bir gün: rutin fiiller ve saat kalıpları',
    category: 'Gündelik Yaşam',
    color: '#f97316',
    icon: '⏰',
    grammarExplain: `📌 DÖNÜŞLÜ RUTİN FİİLLERİ (-СЯ):
1. Günlük rutinin yıldızları dönüşlüdür: "просыпаться" (uyanmak), "одеваться" (giyinmek), "ложиться спать" (yatmak) — eylem kişinin KENDİNE döner.
2. "-ться/-тся" her zaman "-tsa" okunur: ложиться → "lajítsa".
3. Saat + "в": "в семь часов" (saat yedide) — rutin anlatmanın temel kalıbı.`,
    words: [
      { id: 'wd35_1', ru: 'Просыпаться', reading: 'Prasıpátsa', tr: 'Uyanmak', level: 'A2', usageNote: 'Dönüşlü fiildir; "я просыпаюсь в семь" (yedide uyanırım).' },
      { id: 'wd35_2', ru: 'Вставать', reading: "Fstavát'", tr: 'Kalkmak', level: 'A2', usageNote: 'Uyanmak ayrı, kalkmak ayrı — ikisi arasında telefon vardır.' },
      { id: 'wd35_3', ru: 'Будильник', reading: "Budíl'nik", tr: 'Çalar saat / Alarm', level: 'A2', usageNote: '"Будить" (uyandırmak) fiilinden türer.' },
      { id: 'wd35_4', ru: 'Душ', reading: 'Duş', tr: 'Duş', level: 'A2', usageNote: '"Принимать душ" (duş almak) — Türkçeyle birebir kalıp.' },
      { id: 'wd35_5', ru: 'Завтракать', reading: "Záftrakat'", tr: 'Kahvaltı yapmak', level: 'A2', usageNote: '"Завтра" (yarın) ile karıştırma — kökleri gerçekten aynıdır!' },
      { id: 'wd35_6', ru: 'Опаздывать', reading: "Apázdıvat'", tr: 'Geç kalmak', level: 'A2', usageNote: '"Я опаздываю!" (Geç kalıyorum!) sabahın en dramatik cümlesi.' },
      { id: 'wd35_7', ru: 'Возвращаться', reading: 'Vazvraşşátsa', tr: 'Geri dönmek', level: 'A2', usageNote: '"Возвращаюсь домой в шесть" (altıda eve dönüyorum).' },
      { id: 'wd35_8', ru: 'Ужинать', reading: "Újinat'", tr: 'Akşam yemeği yemek', level: 'A2', usageNote: 'Обедать öğle, ужинать akşam — ikisini karıştıran aç kalır.' },
      { id: 'wd35_9', ru: 'Ложиться спать', reading: "Lajítsa spat'", tr: 'Yatmaya gitmek', level: 'A2', usageNote: '"Я ложусь спать в одиннадцать" (on birde yatarım).' },
      { id: 'wd35_10', ru: 'Расписание', reading: 'Raspisániye', tr: 'Program / Tarife', level: 'A2', usageNote: 'Hem ders programı hem otobüs tarifesi için kullanılır.' }
    ],
    sentences: [
      { ru: 'Я просыпаюсь в семь часов.', tr: 'Saat yedide uyanıyorum.', scrambled: ['в семь часов.', 'Я', 'просыпаюсь'], correct: ['Я', 'просыпаюсь', 'в семь часов.'] },
      { ru: 'Вечером я возвращаюсь домой и ужинаю.', tr: 'Akşam eve dönüyorum ve akşam yemeği yiyorum.', scrambled: ['и ужинаю.', 'я', 'Вечером', 'возвращаюсь домой'], correct: ['Вечером', 'я', 'возвращаюсь домой', 'и ужинаю.'] }
    ],
    sceneTitle: 'Alarm Beş Kez Çaldı',
    sceneContext: 'Klasik bir pazartesi sabahı: alarm ertelemeleri, hızlı duş ve kapıda kaybolan anahtarlar.',
    dialogue: [
      { speaker: 'Anlatıcı', ru: 'Будильник звонит в седьмой раз.', reading: 'Budíl\'nik zvanít f sid\'móy ras.', tr: 'Alarm yedinci kez çalıyor.' },
      { speaker: 'Dima', ru: 'Ой, я опаздываю! Где мои ключи?!', reading: 'Oy, ya apázdıvayu! Gdye maí klyuçí?!', tr: 'Eyvah, geç kalıyorum! Anahtarlarım nerede?!' },
      { speaker: 'Anlatıcı', ru: 'Он не завтракает. Только кофе — и бегом на метро.', reading: 'On ni záftrakayet. Tól\'ka kófe — i bigóm na mitró.', tr: 'Kahvaltı yapmıyor. Sadece kahve — ve koşarak metroya.' },
      { speaker: 'Dima', ru: 'Сегодня я точно лягу спать в десять!', reading: 'Sivódnya ya tóçna lyágu spat\' v dyésit\'!', tr: 'Bugün kesinlikle onda yatacağım!' }
    ]
  },
  {
    id: 'mod_a2_d5',
    unitNumber: 36,
    levelGroup: 'A2',
    title: 'Evcil Hayvan & Parkta Yürüyüş',
    description: 'Köpek gezdirme, mama, tasma ve veteriner temelleri',
    category: 'Gündelik Yaşam',
    color: '#a3e635',
    icon: '🐕',
    grammarExplain: `📌 HAYVAN SAHİBİ DİLİ:
1. "Гулять с + Творительный" (biriyle/bir şeyle gezmek): "гулять с собакой" (köpekle gezmek) — köpekli hayatın ana fiili.
2. "У меня есть + hayvan": "У меня есть кошка" (Kedim var) — sahiplik kalıbı.
3. "Кормить" (mama vermek/beslemek) fiili + Accusative: "кормить собаку" (köpeği beslemek).`,
    words: [
      { id: 'wd36_1', ru: 'Собака', reading: 'Sabáka', tr: 'Köpek', level: 'A2', usageNote: 'Dişildir; @ işaretine de Ruslar "sobaka" der!' },
      { id: 'wd36_2', ru: 'Кошка', reading: 'Kóşka', tr: 'Kedi', level: 'A2', usageNote: 'Genel kedi "кошка", erkek kedi "кот"tur.' },
      { id: 'wd36_3', ru: 'Гулять', reading: "Gulyát'", tr: 'Gezmek / Dolaşmak', level: 'A2', usageNote: '"Гулять с собакой" günde iki kez zorunlu ritüeldir.' },
      { id: 'wd36_4', ru: 'Поводок', reading: 'Pavadók', tr: 'Tasma kayışı', level: 'A2', usageNote: '"Собака на поводке" (köpek tasmada) park kuralıdır.' },
      { id: 'wd36_5', ru: 'Корм', reading: 'Korm', tr: 'Mama', level: 'A2', usageNote: '"Сухой корм" (kuru mama) en yaygın türdür.' },
      { id: 'wd36_6', ru: 'Кормить', reading: "Karmít'", tr: 'Beslemek / Mama vermek', level: 'A2', usageNote: '"Не кормите голубей!" (Güvercinleri beslemeyin!) park tabelası klasiği.' },
      { id: 'wd36_7', ru: 'Ветеринар', reading: 'Vitirinár', tr: 'Veteriner', level: 'A2', usageNote: 'Kısaca "ветврач" da denir.' },
      { id: 'wd36_8', ru: 'Хвост', reading: 'Hvost', tr: 'Kuyruk', level: 'A2', usageNote: '"Вилять хвостом" (kuyruk sallamak) mutluluğun kanıtıdır.' },
      { id: 'wd36_9', ru: 'Порода', reading: 'Paróda', tr: 'Cins / Irk (hayvan)', level: 'A2', usageNote: '"Какой породы ваша собака?" (Köpeğiniz ne cinsi?) park sohbetinin ilk sorusu.' },
      { id: 'wd36_10', ru: 'Играть', reading: "Igrát'", tr: 'Oynamak', level: 'A2', usageNote: '"Играть с мячом" (topla oynamak) — köpeklerin milli sporu.' }
    ],
    sentences: [
      { ru: 'Утром я гуляю с собакой в парке.', tr: 'Sabah köpekle parkta geziyorum.', scrambled: ['в парке.', 'я', 'Утром', 'гуляю с собакой'], correct: ['Утром', 'я', 'гуляю с собакой', 'в парке.'] },
      { ru: 'Какой породы ваша собака?', tr: 'Köpeğiniz hangi cins?', scrambled: ['собака?', 'Какой', 'ваша', 'породы'], correct: ['Какой', 'породы', 'ваша', 'собака?'] }
    ],
    sceneTitle: 'Parkta İki Köpek, İki Sahip',
    sceneContext: 'Sabah parkında iki köpek sahibi tanışıyor; köpekler çoktan arkadaş oldu bile.',
    dialogue: [
      { speaker: 'Dima', ru: 'Какая красивая собака! Какой породы?', reading: 'Kakáya krasívaya sabáka! Kakóy paródı?', tr: 'Ne güzel bir köpek! Hangi cins?' },
      { speaker: 'Komşu', ru: 'Это корги. Его зовут Борис. А ваша?', reading: 'Éta kórgi. Yivó zavút Barís. A váşa?', tr: 'Bu bir corgi. Adı Boris. Sizinki?' },
      { speaker: 'Dima', ru: 'Лайка. Она любит играть с мячом.', reading: 'Láyka. Aná lyúbit igrát\' s myaçóm.', tr: 'Layka. Topla oynamayı seviyor.' },
      { speaker: 'Komşu', ru: 'Смотрите, они уже играют вместе!', reading: 'Smatrítye, aní ujé igráyut vmyéstye!', tr: 'Bakın, çoktan birlikte oynuyorlar!' }
    ]
  },
  {
    id: 'mod_a2_d6',
    unitNumber: 37,
    levelGroup: 'A2',
    title: 'Terzi & Kuru Temizleme',
    description: 'Leke çıkarma, paça kısaltma, fermuar değişimi ve teslim alma',
    category: 'Gündelik Yaşam',
    color: '#8b5cf6',
    icon: '🧵',
    grammarExplain: `📌 HİZMET TESLİM DİLİ:
1. "Можно + mastar?" (yapılabilir mi?): "Можно укоротить брюки?" (Pantolon kısaltılabilir mi?)
2. "Будет готово + zaman" (hazır olacak): "Будет готово завтра" (Yarın hazır olur) — her atölyenin cevabı.
3. "Забрать" (teslim almak): "Я пришёл забрать куртку" (Montu almaya geldim).`,
    words: [
      { id: 'wd37_1', ru: 'Химчистка', reading: 'Himçístka', tr: 'Kuru temizleme', level: 'A2', usageNote: '"Химическая чистка"nın (kimyasal temizlik) kısaltmasıdır.' },
      { id: 'wd37_2', ru: 'Пятно', reading: 'Pitnó', tr: 'Leke', level: 'A2', usageNote: '"Пятно от кофе" (kahve lekesi) — pazartesi klasiği.' },
      { id: 'wd37_3', ru: 'Гладить', reading: "Gládit'", tr: 'Ütülemek', level: 'A2', usageNote: 'Aynı fiil "okşamak" da demektir — kediyi de gömleği de "gladit" edersin!' },
      { id: 'wd37_4', ru: 'Шить', reading: "Şıt'", tr: 'Dikmek', level: 'A2', usageNote: 'Terzinin ana fiili; "сшить костюм" (takım diktirmek).' },
      { id: 'wd37_5', ru: 'Пуговица', reading: 'Púgavitsa', tr: 'Düğme', level: 'A2', usageNote: '"Оторвалась пуговица" (düğme koptu) — terziye gidiş sebebi #1.' },
      { id: 'wd37_6', ru: 'Молния', reading: 'Mólniya', tr: 'Fermuar', level: 'A2', usageNote: 'Aynı kelime "şimşek" demektir — fermuar da şimşek gibi açılır!' },
      { id: 'wd37_7', ru: 'Укоротить', reading: "Ukaratít'", tr: 'Kısaltmak', level: 'A2', usageNote: '"Укоротить брюки" (paça kısaltmak) en sık istenen işlemdir.' },
      { id: 'wd37_8', ru: 'Ткань', reading: "Tkan'", tr: 'Kumaş', level: 'A2', usageNote: 'Dişildir; "тонкая ткань" (ince kumaş).' },
      { id: 'wd37_9', ru: 'Готово', reading: 'Gatóva', tr: 'Hazır', level: 'A2', usageNote: '"Когда будет готово?" (Ne zaman hazır olur?) — atölye sorusu #1.' },
      { id: 'wd37_10', ru: 'Забрать', reading: "Zabrát'", tr: 'Teslim almak', level: 'A2', usageNote: 'Fişi kaybetme — "забрать без чека" dramdır.' }
    ],
    sentences: [
      { ru: 'Можно укоротить эти брюки?', tr: 'Bu pantolon kısaltılabilir mi?', scrambled: ['брюки?', 'Можно', 'эти', 'укоротить'], correct: ['Можно', 'укоротить', 'эти', 'брюки?'] },
      { ru: 'Когда будет готово моё пальто?', tr: 'Paltom ne zaman hazır olur?', scrambled: ['моё пальто?', 'Когда', 'готово', 'будет'], correct: ['Когда', 'будет', 'готово', 'моё пальто?'] }
    ],
    sceneTitle: 'Düğün Öncesi Terzi Krizi',
    sceneContext: 'Cumartesi düğün var, ceketin kolları uzun ve gömlekte kahve lekesi — terzi ve kuru temizlemeci aynı anda devrede.',
    dialogue: [
      { speaker: 'Dima', ru: 'Здравствуйте! Можно укоротить рукава до субботы?', reading: 'Zdrástvuytye! Mójna ukaratít\' rukavá da subótı?', tr: 'Merhaba! Kollar cumartesiye kadar kısaltılabilir mi?' },
      { speaker: 'Terzi', ru: 'До субботы? Хм... Будет готово в пятницу вечером.', reading: 'Da subótı? Hm... Búdit gatóva f pyátnitsu vyéçiram.', tr: 'Cumartesiye mi? Hımm... Cuma akşamı hazır olur.' },
      { speaker: 'Dima', ru: 'Отлично! А это пятно от кофе — в химчистку?', reading: 'Atlíçna! A éta pitnó at kófe — f himçístku?', tr: 'Harika! Peki bu kahve lekesi — kuru temizlemeye mi?' },
      { speaker: 'Terzi', ru: 'Да, рядом. Скажите им: срочно!', reading: 'Da, ryádam. Skajítye im: sróçna!', tr: 'Evet, hemen yanda. Onlara söyleyin: acil!' }
    ]
  },
  {
    id: 'mod_a2_d7',
    unitNumber: 38,
    levelGroup: 'A2',
    title: 'Usta Çağırma & Ev Arızaları',
    description: 'Damlayan musluk, atan sigorta: arıza bildirme ve usta ile konuşma',
    category: 'Gündelik Yaşam',
    color: '#ef4444',
    icon: '🔧',
    grammarExplain: `📌 ARIZA BİLDİRME:
1. "Сломался / сломалась / сломалось" (bozuldu): cins uyumlu geçmiş zaman — "кран сломался" (musluk bozuldu), "розетка сломалась".
2. "Не работает" (çalışmıyor) her arızanın joker cümlesidir: "Свет не работает!"
3. "Вызвать мастера" (usta çağırmak): tamamlanmış fiil — sonuç odaklıdır.`,
    words: [
      { id: 'wd38_1', ru: 'Мастер', reading: 'Mástir', tr: 'Usta / Tamirci', level: 'A2', usageNote: '"Вызвать мастера" (usta çağırmak) kalıbıyla kullanılır.' },
      { id: 'wd38_2', ru: 'Сломался', reading: 'Slamálsya', tr: 'Bozuldu', level: 'A2', usageNote: 'Eril geçmiş; dişilde "сломалась" olur.' },
      { id: 'wd38_3', ru: 'Кран', reading: 'Kran', tr: 'Musluk', level: 'A2', usageNote: 'Aynı kelime inşaat vinci de demektir!' },
      { id: 'wd38_4', ru: 'Течёт', reading: 'Tiçót', tr: 'Akıtıyor / Sızdırıyor', level: 'A2', usageNote: '"Кран течёт" (musluk damlatıyor) — gece uykusunun düşmanı.' },
      { id: 'wd38_5', ru: 'Розетка', reading: 'Razyétka', tr: 'Priz', level: 'A2', usageNote: 'Elektrikli hayatın merkezi; "вилка" ise fiştir.' },
      { id: 'wd38_6', ru: 'Свет', reading: 'Svyet', tr: 'Işık / Elektrik', level: 'A2', usageNote: '"Света нет!" (Elektrik yok!) — apartman grubunun en hızlı mesajı.' },
      { id: 'wd38_7', ru: 'Чинить', reading: "Çinít'", tr: 'Tamir etmek', level: 'A2', usageNote: 'Tamamlanmışı "починить": "Почините, пожалуйста!" (Tamir edin lütfen!)' },
      { id: 'wd38_8', ru: 'Вызвать', reading: "Vı́zvat'", tr: 'Çağırmak (servis)', level: 'A2', usageNote: 'Usta, taksi, ambulans — hepsi "вызвать" ile çağrılır.' },
      { id: 'wd38_9', ru: 'Инструменты', reading: 'Instrumyéntı', tr: 'Aletler', level: 'A2', usageNote: 'Ustanın çantası; tekili "инструмент".' },
      { id: 'wd38_10', ru: 'Работает', reading: 'Rabótayet', tr: 'Çalışıyor', level: 'A2', usageNote: '"Теперь работает!" (Şimdi çalışıyor!) — mutlu son cümlesi.' }
    ],
    sentences: [
      { ru: 'Кран течёт, нужно вызвать мастера.', tr: 'Musluk akıtıyor, usta çağırmak lazım.', scrambled: ['мастера.', 'Кран течёт,', 'вызвать', 'нужно'], correct: ['Кран течёт,', 'нужно', 'вызвать', 'мастера.'] },
      { ru: 'Розетка не работает уже два дня.', tr: 'Priz iki gündür çalışmıyor.', scrambled: ['уже два дня.', 'Розетка', 'работает', 'не'], correct: ['Розетка', 'не', 'работает', 'уже два дня.'] }
    ],
    sceneTitle: 'Usta Kapıda',
    sceneContext: 'Damlayan musluk sonunda sahibini yendi: usta geldi, alet çantası açıldı, teşhis konuluyor.',
    dialogue: [
      { speaker: 'Usta', ru: 'Здравствуйте! Что у вас сломалось?', reading: 'Zdrástvuytye! Şto u vas slamálas\'?', tr: 'Merhaba! Neyiniz bozuldu?' },
      { speaker: 'Dima', ru: 'Кран на кухне течёт. Всю ночь: кап-кап-кап!', reading: 'Kran na kúhnye tiçót. Fsyu noç\': kap-kap-kap!', tr: 'Mutfaktaki musluk akıtıyor. Bütün gece: tıp-tıp-tıp!' },
      { speaker: 'Usta', ru: 'Понятно. Сейчас посмотрим... Готово! Теперь работает.', reading: 'Panyátna. Siyçás pasmótrim... Gatóva! Tipyér\' rabótayet.', tr: 'Anlaşıldı. Şimdi bakalım... Tamam! Artık çalışıyor.' },
      { speaker: 'Dima', ru: 'Вы волшебник! Сколько я должен?', reading: 'Vı valşébnik! Skól\'ka ya dóljın?', tr: 'Siz bir sihirbazsınız! Borcum ne kadar?' }
    ]
  },
  {
    id: 'mod_a2_d8',
    unitNumber: 39,
    levelGroup: 'A2',
    title: 'Hediye Seçme & Tebrik',
    description: 'Doğum günü hediyesi seçme, paketleme ve tebrik kalıpları',
    category: 'Gündelik Yaşam',
    color: '#ec4899',
    icon: '🎁',
    grammarExplain: `📌 HEDİYE & TEBRİK DİLİ:
1. "Дарить + Dative" (birine hediye etmek): "Я дарю маме цветы" (Anneme çiçek hediye ediyorum) — alan kişi -e hâlindedir.
2. "Поздравлять с + Творительный": "Поздравляю с днём рождения!" (Doğum gününü kutlarım!) — kutlanan şey İLE verilir.
3. Dilek kalıbı "Желаю + Genitive": "Желаю счастья и здоровья!" (Mutluluk ve sağlık dilerim!)`,
    words: [
      { id: 'wd39_1', ru: 'Подарок', reading: 'Padárak', tr: 'Hediye', level: 'A2', usageNote: '"Подарок на день рождения" (doğum günü hediyesi).' },
      { id: 'wd39_2', ru: 'Дарить', reading: "Darít'", tr: 'Hediye etmek', level: 'A2', usageNote: 'Alan kişi -e hâlinde: "дарить другу" (arkadaşa hediye etmek).' },
      { id: 'wd39_3', ru: 'Выбирать', reading: "Vıbirát'", tr: 'Seçmek', level: 'A2', usageNote: 'Hediye seçmek yarım gün sürer: "выбирать подарок".' },
      { id: 'wd39_4', ru: 'Упаковка', reading: 'Upakófka', tr: 'Paket / Ambalaj', level: 'A2', usageNote: '"Подарочная упаковка" (hediye paketi) kasada sorulur.' },
      { id: 'wd39_5', ru: 'Открытка', reading: 'Atkrı́tka', tr: 'Tebrik kartı', level: 'A2', usageNote: 'İçine söz yazılır; "открыть" (açmak) kökünden gelir.' },
      { id: 'wd39_6', ru: 'Поздравлять', reading: "Pazdravlyát'", tr: 'Kutlamak / Tebrik etmek', level: 'A2', usageNote: '"Поздравляю!" tek başına "Tebrikler!" demektir.' },
      { id: 'wd39_7', ru: 'С днём рождения!', reading: 'S dnyom rajdyéniya!', tr: 'Doğum günün kutlu olsun!', level: 'A2', usageNote: 'Yılın en çok yazılan Rusça cümlesi.' },
      { id: 'wd39_8', ru: 'Сюрприз', reading: 'Syurpríz', tr: 'Sürpriz', level: 'A2', usageNote: 'Fransızcadan geçmiştir; herkes bilir, kimse bozmaz.' },
      { id: 'wd39_9', ru: 'Цветы', reading: 'Tsvitı́', tr: 'Çiçekler', level: 'A2', usageNote: 'DİKKAT: Rusya\'da hediye çiçek TEK sayıda olmalıdır — çift sayı cenazeye özgüdür!' },
      { id: 'wd39_10', ru: 'Желаю', reading: 'Jıláyu', tr: 'Dilerim', level: 'A2', usageNote: '"Желаю счастья!" (Mutluluk dilerim!) tebrik konuşmasının bel kemiği.' }
    ],
    sentences: [
      { ru: 'Я выбираю подарок для мамы.', tr: 'Annem için hediye seçiyorum.', scrambled: ['для мамы.', 'Я', 'подарок', 'выбираю'], correct: ['Я', 'выбираю', 'подарок', 'для мамы.'] },
      { ru: 'Поздравляю с днём рождения! Желаю счастья!', tr: 'Doğum gününü kutlarım! Mutluluk dilerim!', scrambled: ['Желаю счастья!', 'Поздравляю', 'с днём рождения!'], correct: ['Поздравляю', 'с днём рождения!', 'Желаю счастья!'] }
    ],
    sceneTitle: 'Son Dakika Hediyesi',
    sceneContext: 'Parti iki saat sonra başlıyor; hediyeci dükkanında panik alışverişi ve paket kuyruğu.',
    dialogue: [
      { speaker: 'Dima', ru: 'Помогите! Мне нужен подарок для подруги. Срочно!', reading: 'Pamagítye! Mnye nújın padárak dlya padrúgi. Sróçna!', tr: 'Yardım edin! Kız arkadaşım için hediye lazım. Acil!' },
      { speaker: 'Satıcı', ru: 'Спокойно! Что она любит?', reading: 'Spakóyna! Şto aná lyúbit?', tr: 'Sakin olun! Neleri sever?' },
      { speaker: 'Dima', ru: 'Книги, чай и кошек.', reading: 'Knígi, çay i kóşık.', tr: 'Kitapları, çayı ve kedileri.' },
      { speaker: 'Satıcı', ru: 'Вот книга о кошках и чашка. Подарочная упаковка — бесплатно!', reading: 'Vot kníga a kóşkah i çáşka. Padáraçnaya upakófka — bisplátna!', tr: 'İşte kediler hakkında bir kitap ve fincan. Hediye paketi — ücretsiz!' }
    ]
  },
  {
    id: 'mod_a2_d9',
    unitNumber: 40,
    levelGroup: 'A2',
    title: 'Mesajlaşma & Sosyal Medya Dili',
    description: 'Mesaj yazma, sesli mesaj, fotoğraf gönderme ve şarj dramı',
    category: 'Gündelik Yaşam',
    color: '#38bdf8',
    icon: '📱',
    grammarExplain: `📌 DİJİTAL GÜNDELİK DİL:
1. "Написать / отправить + Dative" (birine yazmak/göndermek): "Напиши мне!" (Bana yaz!) — günlük vedaların yenisi.
2. Kısaltmalar: "спс" (спасибо=teşekkürler), "пжл" (пожалуйста=lütfen), "щас" (сейчас=şimdi) — mesajlaşmanın hız dili.
3. "Телефон сел" (telefon şarjı bitti): kelimenin tam anlamıyla "telefon oturdu" — Rusçanın en tatlı deyimlerinden.`,
    words: [
      { id: 'wd40_1', ru: 'Сообщение', reading: 'Saabşşéniye', tr: 'Mesaj', level: 'A2', usageNote: 'Günlük dilde kısaca "сообщ" ya da "смс" denir.' },
      { id: 'wd40_2', ru: 'Написать', reading: "Napisát'", tr: 'Yazmak (mesaj)', level: 'A2', usageNote: '"Напиши мне!" (Bana yaz!) modern vedalaşmanın standardı.' },
      { id: 'wd40_3', ru: 'Отправить', reading: "Atprávit'", tr: 'Göndermek', level: 'A2', usageNote: 'Mesaj, fotoğraf, konum — hepsi "отправить" ile gider.' },
      { id: 'wd40_4', ru: 'Голосовое', reading: 'Galasavóye', tr: 'Sesli mesaj', level: 'A2', usageNote: '"Голосовое сообщение"nin kısaltması; kimisi sever, kimisi nefret eder.' },
      { id: 'wd40_5', ru: 'Фото', reading: 'Fóta', tr: 'Fotoğraf', level: 'A2', usageNote: 'Çekimsizdir: hep "фото" kalır.' },
      { id: 'wd40_6', ru: 'Лайк', reading: 'Layk', tr: 'Beğeni (like)', level: 'A2', usageNote: '"Поставить лайк" (beğeni bırakmak) kalıbıyla kullanılır.' },
      { id: 'wd40_7', ru: 'Подписаться', reading: 'Patpisátsa', tr: 'Abone olmak / Takip etmek', level: 'A2', usageNote: 'Her videonun sonunda duyacağın kelime: "Подпишись!"' },
      { id: 'wd40_8', ru: 'Удалить', reading: "Udalít'", tr: 'Silmek', level: 'A2', usageNote: '"Удалить сообщение" — pişmanlığın dijital çözümü.' },
      { id: 'wd40_9', ru: 'Экран', reading: 'Ekrán', tr: 'Ekran', level: 'A2', usageNote: '"Разбил экран" (ekranı kırdım) — pahalı bir cümle.' },
      { id: 'wd40_10', ru: 'Зарядка', reading: 'Zaryátka', tr: 'Şarj / Şarj aleti', level: 'A2', usageNote: '"У кого есть зарядка?" (Kimde şarj aleti var?) evrensel yardım çağrısı.' }
    ],
    sentences: [
      { ru: 'Отправь мне фото, пожалуйста.', tr: 'Bana fotoğrafı gönder lütfen.', scrambled: ['пожалуйста.', 'Отправь', 'фото,', 'мне'], correct: ['Отправь', 'мне', 'фото,', 'пожалуйста.'] },
      { ru: 'Мой телефон сел, где зарядка?', tr: 'Telefonumun şarjı bitti, şarj aleti nerede?', scrambled: ['где зарядка?', 'Мой', 'сел,', 'телефон'], correct: ['Мой', 'телефон', 'сел,', 'где зарядка?'] }
    ],
    sceneTitle: 'Beş Dakikalık Sesli Mesaj',
    sceneContext: 'Bir arkadaş beş dakikalık sesli mesaj atmış; diğeri metroda dinleyemiyor — modern hayat krizi.',
    dialogue: [
      { speaker: 'Lena', ru: 'Ты получил моё голосовое?', reading: 'Tı paluçíl mayó galasavóye?', tr: 'Sesli mesajımı aldın mı?' },
      { speaker: 'Dima', ru: 'Пять минут?! Я в метро, напиши текстом, пжл!', reading: 'Pyat\' minút?! Ya v mitró, napişí tyékstam, pajálusta!', tr: 'Beş dakika mı?! Metrodayım, yazıyla yaz lütfen!' },
      { speaker: 'Lena', ru: 'Ладно! Отправила. И фото тоже посмотри!', reading: 'Ládna! Atprávila. I fóta tóje pasmatrí!', tr: 'Tamam! Gönderdim. Fotoğrafa da bak!' },
      { speaker: 'Dima', ru: 'Класс! Ставлю лайк. Ой... телефон сел!', reading: 'Klas! Stávlyu layk. Oy... tilifón syel!', tr: 'Süper! Beğeni bırakıyorum. Eyvah... şarj bitti!' }
    ]
  },
  {
    id: 'mod_a2_d10',
    unitNumber: 41,
    levelGroup: 'A2',
    title: 'Kayıp Eşya & Emanet Bürosu',
    description: 'Cüzdan düşürme, kayıp bildirme ve emanet bürosunda eşya tarifi',
    category: 'Gündelik Yaşam',
    color: '#64748b',
    icon: '🧳',
    grammarExplain: `📌 KAYIP & BULUNTU DİLİ:
1. "Я потерял / потеряла" (kaybettim): eril/dişil geçmiş zaman ayrımı — konuşan kişiye göre değişir.
2. "Оставить" (bırakmak/unutmak): "Я оставил ключи дома" (Anahtarları evde bıraktım/unuttum).
3. Tarif kalıbı: "Какого цвета?" (Ne renk?), "Что внутри?" (İçinde ne var?) — büro memurunun standart soruları.`,
    words: [
      { id: 'wd41_1', ru: 'Потерять', reading: "Patiryát'", tr: 'Kaybetmek', level: 'A2', usageNote: '"Я потерял кошелёк!" — turistin kâbus cümlesi.' },
      { id: 'wd41_2', ru: 'Найти', reading: 'Naytí', tr: 'Bulmak', level: 'A2', usageNote: 'Geçmişi "нашёл/нашла": "Я нашёл ключи!" (Anahtarları buldum!)' },
      { id: 'wd41_3', ru: 'Ключи', reading: 'Klyuçí', tr: 'Anahtarlar', level: 'A2', usageNote: 'En sık kaybedilen eşya şampiyonu.' },
      { id: 'wd41_4', ru: 'Бюро находок', reading: 'Byuró nahódak', tr: 'Kayıp eşya bürosu', level: 'A2', usageNote: 'Kelimesi kelimesine "buluntular bürosu".' },
      { id: 'wd41_5', ru: 'Оставить', reading: "Astávit'", tr: 'Bırakmak / Unutmak', level: 'A2', usageNote: '"Я оставил сумку в автобусе" (Çantayı otobüste unuttum).' },
      { id: 'wd41_6', ru: 'Вспомнить', reading: "Fspómnit'", tr: 'Hatırlamak', level: 'A2', usageNote: '"Вспомнил!" (Hatırladım!) — aydınlanma anının kelimesi.' },
      { id: 'wd41_7', ru: 'Вернуть', reading: "Virnút'", tr: 'Geri vermek / İade etmek', level: 'A2', usageNote: '"Вам вернули кошелёк?" (Cüzdanınızı geri verdiler mi?)' },
      { id: 'wd41_8', ru: 'Документы', reading: 'Dakumyéntı', tr: 'Belgeler / Kimlik', level: 'A2', usageNote: 'Pasaport+kimlik+ehliyet üçlüsünün ortak adı; kaybı büyük dramdır.' },
      { id: 'wd41_9', ru: 'Внутри', reading: 'Vnutrí', tr: 'İçinde', level: 'A2', usageNote: '"Что было внутри?" (İçinde ne vardı?) — büro memurunun sorusu.' },
      { id: 'wd41_10', ru: 'Повезло', reading: 'Pavizló', tr: 'Şanslıymışsın / Şans eseri', level: 'A2', usageNote: '"Тебе повезло!" (Şanslısın!) — cüzdan bulununca söylenir.' }
    ],
    sentences: [
      { ru: 'Я потерял кошелёк в метро.', tr: 'Cüzdanımı metroda kaybettim.', scrambled: ['в метро.', 'Я', 'кошелёк', 'потерял'], correct: ['Я', 'потерял', 'кошелёк', 'в метро.'] },
      { ru: 'Что было внутри сумки?', tr: 'Çantanın içinde ne vardı?', scrambled: ['сумки?', 'Что', 'внутри', 'было'], correct: ['Что', 'было', 'внутри', 'сумки?'] }
    ],
    sceneTitle: 'Emanet Bürosunda Mucize',
    sceneContext: 'Metroda unutulan çanta için emanet bürosuna umutsuz bir ziyaret — ve mutlu son.',
    dialogue: [
      { speaker: 'Dima', ru: 'Здравствуйте! Я оставил сумку в вагоне метро.', reading: 'Zdrástvuytye! Ya astávil súmku v vagónye mitró.', tr: 'Merhaba! Çantamı metro vagonunda unuttum.' },
      { speaker: 'Memur', ru: 'Какого цвета сумка? Что было внутри?', reading: 'Kakóva tsvyéta súmka? Şto bı́la vnutrí?', tr: 'Çanta ne renk? İçinde ne vardı?' },
      { speaker: 'Dima', ru: 'Чёрная. Внутри документы и ключи.', reading: 'Çórnaya. Vnutrí dakumyéntı i klyuçí.', tr: 'Siyah. İçinde belgeler ve anahtarlar var.' },
      { speaker: 'Memur', ru: 'Вам повезло! Её нашли час назад. Вот она.', reading: 'Vam pavizló! Yiyó naşlí çyas nazát. Vot aná.', tr: 'Şanslısınız! Bir saat önce bulundu. İşte burada.' }
    ]
  }
];
