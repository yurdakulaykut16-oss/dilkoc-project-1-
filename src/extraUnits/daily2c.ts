import type { UnitModule } from '../curriculumData';

export const EXTRA_DAILY2C_B2: UnitModule[] = [
  {
    id: 'mod_b2_e1',
    unitNumber: 127,
    levelGroup: 'B2',
    title: 'Sigorta & Hasar Bildirimi',
    description: 'Poliçe okuma, hasar bildirme ve tazminat peşinde koşma sanatı',
    category: 'Gündelik Yaşam',
    color: '#0284c7',
    icon: '🛡️',
    grammarExplain: `📌 SİGORTA DİLİ:
1. "Страховой случай" (sigorta olayı/hasar durumu) — başına bir şey geldiğinde sigortacıya söyleyeceğin ilk kalıp: "У меня страховой случай!"
2. "Застраховать + Accusative" (sigortalatmak): "застраховать квартиру" (daireyi sigortalatmak); dönüşlü hali "застраховаться" = kendini sigortalatmak.
3. "Возместить ущерб" (zararı tazmin etmek) — resmi dilin çekirdeği; dilekçelerde "прошу возместить ущерб" diye yazılır.`,
    words: [
      { id: 'wd127_1', ru: 'Страховка', reading: 'Strahófka', tr: 'Sigorta', level: 'B2', usageNote: 'Resmî hali "страхование"; konuşmada hep "страховка".' },
      { id: 'wd127_2', ru: 'Полис', reading: 'Pólis', tr: 'Poliçe', level: 'B2', usageNote: '"Страховой полис" — numarasını bir yere kaydet.' },
      { id: 'wd127_3', ru: 'Страховой случай', reading: 'Strahavóy slúçay', tr: 'Hasar durumu', level: 'B2', usageNote: 'Sigortanın devreye girdiği an; kanıt topla, sonra ara.' },
      { id: 'wd127_4', ru: 'Ущерб', reading: 'Uşşérp', tr: 'Zarar/hasar', level: 'B2', usageNote: 'Sonda Б→П okunur; "оценить ущерб" = hasarı değerlendirmek.' },
      { id: 'wd127_5', ru: 'Возмещение', reading: 'Vazmişşéniye', tr: 'Tazminat', level: 'B2', usageNote: 'Beklenen mutlu son: "получить возмещение".' },
      { id: 'wd127_6', ru: 'Франшиза', reading: 'Franşíza', tr: 'Muafiyet (sigortada)', level: 'B2', usageNote: 'Küçük hasarı cebinden ödediğin kısım — sözleşmede küçük puntoyla yazar.' },
      { id: 'wd127_7', ru: 'Оформить полис', reading: "Afórmit' pólis", tr: 'Poliçe yaptırmak', level: 'B2', usageNote: 'Bürokrasinin ana fiili "оформить" yine sahnede.' },
      { id: 'wd127_8', ru: 'Затопить', reading: "Zatapít'", tr: 'Su basmak', level: 'B2', usageNote: '"Соседи затопили" (komşular su bastı) — Rus apartman klasiği.' },
      { id: 'wd127_9', ru: 'Справка о ДТП', reading: 'Správka a de-te-pé', tr: 'Kaza tutanağı', level: 'B2', usageNote: 'ДТП = trafik kazası kısaltması; справка yine iş başında.' },
      { id: 'wd127_10', ru: 'Выплата', reading: 'Vı́plata', tr: 'Ödeme (tazminat)', level: 'B2', usageNote: '"Когда будет выплата?" — sigortacıya en sık sorulan soru.' }
    ],
    sentences: [
      { ru: 'Соседи затопили квартиру, это страховой случай.', tr: 'Komşular daireyi su bastı, bu bir hasar durumu.', scrambled: ['квартиру,', 'Соседи затопили', 'страховой случай.', 'это'], correct: ['Соседи затопили', 'квартиру,', 'это', 'страховой случай.'] },
      { ru: 'Когда я получу возмещение ущерба?', tr: 'Zarar tazminatını ne zaman alacağım?', scrambled: ['возмещение', 'Когда я', 'ущерба?', 'получу'], correct: ['Когда я', 'получу', 'возмещение', 'ущерба?'] }
    ],
    sceneTitle: 'Tavandan Gelen Sürpriz',
    sceneContext: 'Üst komşunun makinesi taşıyor, Dima\'nın tavanı göl oluyor; sigorta temsilcisi hasar fotoğrafları çekerken Dima poliçesini kahraman gibi uzatıyor.',
    dialogue: [
      { speaker: 'Dima', ru: 'Добрый день! Соседи сверху затопили. Потолок теперь — карта мира.', reading: 'Dóbrıy dyen\'! Sasyédi svyérhu zatapíli. Patalók tipyér\' — kárta míra.', tr: 'İyi günler! Üst komşular su bastı. Tavan artık bir dünya haritası.' },
      { speaker: 'Sigortacı', ru: 'Сочувствую. Полис у вас с собой? И фото ущерба, пожалуйста.', reading: 'Saçúfstvuyu. Pólis u vas s sabóy? I fóta uşşérba, pajálusta.', tr: 'Geçmiş olsun. Poliçeniz yanınızda mı? Ve hasar fotoğrafları lütfen.' },
      { speaker: 'Dima', ru: 'Вот полис, вот тридцать фотографий. Я был готов к этому дню.', reading: 'Vot pólis, vot trítsat\' fatagráfiy. Ya bıl gatóf k étamu dnyu.', tr: 'İşte poliçe, işte otuz fotoğraf. Bu güne hazırlıklıydım.' },
      { speaker: 'Sigortacı', ru: 'Идеальный клиент. Выплата будет через десять дней.', reading: 'Idiál\'nıy kliyént. Vı́plata búdit çyéris dyésit\' dnyey.', tr: 'Kusursuz müşteri. Ödeme on gün içinde yapılır.' }
    ]
  },
  {
    id: 'mod_b2_e2',
    unitNumber: 128,
    levelGroup: 'B2',
    title: 'Ehliyet & Direksiyon Sınavı',
    description: 'Sürücü kursu, teori sınavı ve gergin direksiyon günü',
    category: 'Gündelik Yaşam',
    color: '#dc2626',
    icon: '🚦',
    grammarExplain: `📌 EHLİYET YOLU:
1. "Сдавать экзамен" (sınava girmek) ≠ "сдать экзамен" (sınavı GEÇMEK): görünüş çifti burada hayati — "Я сдавал три раза, наконец сдал!" (Üç kez girdim, sonunda geçtim!)
2. "Права" (haklar) günlük dilde EHLİYET demektir: "получить права" = ehliyet almak.
3. Direksiyonda emirler Imperative ile yağar: "поверните направо" (sağa dönün), "припаркуйтесь" (park edin), "не волнуйтесь" (heyecanlanmayın — en zoru bu).`,
    words: [
      { id: 'wd128_1', ru: 'Права', reading: 'Pravá', tr: 'Ehliyet', level: 'B2', usageNote: 'Kelime anlamı "haklar"; bağlamda hep ehliyettir.' },
      { id: 'wd128_2', ru: 'Автошкола', reading: 'Aftaşkóla', tr: 'Sürücü kursu', level: 'B2', usageNote: 'Teori + direksiyon; hocalar sabır abidesidir.' },
      { id: 'wd128_3', ru: 'Экзамен', reading: 'Ekzámin', tr: 'Sınav', level: 'B2', usageNote: '"Сдать экзамен" = geçmek; "провалить" = çakmak.' },
      { id: 'wd128_4', ru: 'Вождение', reading: 'Vajdyéniye', tr: 'Araç kullanma', level: 'B2', usageNote: '"Экзамен по вождению" = direksiyon sınavı.' },
      { id: 'wd128_5', ru: 'Инспектор', reading: 'Inspyéktar', tr: 'Sınav memuru', level: 'B2', usageNote: 'Yan koltuktaki kader hakemi; selam ver, aynaları kontrol et.' },
      { id: 'wd128_6', ru: 'Перекрёсток', reading: 'Pirikryóstak', tr: 'Kavşak', level: 'B2', usageNote: 'Sınavın dönüm noktası — kelimenin tam anlamıyla.' },
      { id: 'wd128_7', ru: 'Парковка', reading: 'Parkófka', tr: 'Park etme/otopark', level: 'B2', usageNote: '"Параллельная парковка" — efsanevi korku.' },
      { id: 'wd128_8', ru: 'Зеркало', reading: 'Zyérkala', tr: 'Ayna', level: 'B2', usageNote: 'Sınavda üç saniyede bir bakılır: "смотрите в зеркала!"' },
      { id: 'wd128_9', ru: 'Поворотник', reading: 'Pavarótnik', tr: 'Sinyal', level: 'B2', usageNote: '"Включите поворотник" — unutursan puan gider.' },
      { id: 'wd128_10', ru: 'Пересдача', reading: 'Piriszdáça', tr: 'Bütünleme (tekrar sınav)', level: 'B2', usageNote: '"Пере-" öneki yine iş başında: yeniden-verme.' }
    ],
    sentences: [
      { ru: 'Я наконец сдал экзамен по вождению!', tr: 'Sonunda direksiyon sınavını geçtim!', scrambled: ['экзамен', 'Я наконец', 'по вождению!', 'сдал'], correct: ['Я наконец', 'сдал', 'экзамен', 'по вождению!'] },
      { ru: 'Поверните направо и припаркуйтесь у школы.', tr: 'Sağa dönün ve okulun yanına park edin.', scrambled: ['направо', 'Поверните', 'у школы.', 'и припаркуйтесь'], correct: ['Поверните', 'направо', 'и припаркуйтесь', 'у школы.'] }
    ],
    sceneTitle: 'Paralel Park Finali',
    sceneContext: 'Dima üçüncü denemesinde direksiyon sınavında; taş yüzlü sınav memuru paralel parkı işaret ediyor — tüm Moskova nefesini tutuyor.',
    dialogue: [
      { speaker: 'İnspektör', ru: 'Так. Параллельная парковка. Вон между теми машинами.', reading: 'Tak. Paralyél\'naya parkófka. Von myéjdu tyémi maşínami.', tr: 'Evet. Paralel park. Şu arabaların arasına.' },
      { speaker: 'Dima', ru: 'Зеркало, поворотник, спокойствие... Я тренировался во сне.', reading: 'Zyérkala, pavarótnik, spakóystviye... Ya trinirávalsya va snye.', tr: 'Ayna, sinyal, sakinlik... Rüyamda bile çalıştım.' },
      { speaker: 'İnspektör', ru: 'Идеально. С третьего раза, но идеально. Поздравляю, права ваши.', reading: 'Idiál\'na. S tryétyiva ráza, no idiál\'na. Pazdravlyáyu, pravá váşi.', tr: 'Kusursuz. Üçüncü seferde ama kusursuz. Tebrikler, ehliyet sizin.' },
      { speaker: 'Dima', ru: 'Спасибо! Теперь главный экзамен — московские пробки.', reading: 'Spasíba! Tipyér\' glávnıy ekzámin — maskófskiye própki.', tr: 'Teşekkürler! Şimdi asıl sınav — Moskova trafiği.' }
    ]
  },
  {
    id: 'mod_b2_e3',
    unitNumber: 129,
    levelGroup: 'B2',
    title: 'Apartman Sakinleri Toplantısı',
    description: 'Yönetim şirketi, aidat zammı ve oy çokluğuyla demokrasi',
    category: 'Gündelik Yaşam',
    color: '#7c3aed',
    icon: '🏢',
    grammarExplain: `📌 TOPLANTI DİLİ:
1. "Собрание жильцов" (sakinler toplantısı) — apartman demokrasisinin parlamentosu; gündem "повестка дня" ile açılır.
2. "Голосовать за/против + Accusative" (lehine/aleyhine oy vermek): "кто за? кто против?" (kim lehte? kim aleyhte?) — toplantının kalp atışı.
3. "Управляющая компания" (yönetim şirketi) her derdin muhatabıdır: asansör, çatı, kalorifer — hepsi "УК"ya yazılır.`,
    words: [
      { id: 'wd129_1', ru: 'Собрание', reading: 'Sabrániye', tr: 'Toplantı', level: 'B2', usageNote: '"Общее собрание" = genel kurul.' },
      { id: 'wd129_2', ru: 'Жильцы', reading: "Jıl'tsı́", tr: 'Sakinler', level: 'B2', usageNote: 'Apartmanda oturan herkes; toplantının seçmenleri.' },
      { id: 'wd129_3', ru: 'Управляющая компания', reading: 'Upravlyáyuşşaya kampániya', tr: 'Yönetim şirketi', level: 'B2', usageNote: 'Kısaca "УК"; şikayetlerin tek adresi.' },
      { id: 'wd129_4', ru: 'Взнос', reading: 'Vznos', tr: 'Aidat/katkı payı', level: 'B2', usageNote: '"Повысить взносы" (aidatları artırmak) — toplantıyı alevlendiren cümle.' },
      { id: 'wd129_5', ru: 'Голосование', reading: 'Galasavániye', tr: 'Oylama', level: 'B2', usageNote: '"Ставлю на голосование" = oylamaya sunuyorum.' },
      { id: 'wd129_6', ru: 'Повестка дня', reading: 'Pavyéstka dnya', tr: 'Gündem', level: 'B2', usageNote: 'Toplantının menüsü; dışına çıkan sözünü kaybeder.' },
      { id: 'wd129_7', ru: 'Протокол', reading: 'Pratakól', tr: 'Tutanak', level: 'B2', usageNote: 'Yazılmayan karar, alınmamış karardır.' },
      { id: 'wd129_8', ru: 'Лифт', reading: 'Lift', tr: 'Asansör', level: 'B2', usageNote: 'Her toplantının birinci gündem maddesi: "лифт опять не работает".' },
      { id: 'wd129_9', ru: 'Большинство', reading: "Bal'şınstvó", tr: 'Çoğunluk', level: 'B2', usageNote: '"Большинством голосов" = oy çokluğuyla.' },
      { id: 'wd129_10', ru: 'Домовой чат', reading: 'Damavóy çat', tr: 'Apartman grubu (sohbet)', level: 'B2', usageNote: 'Modern toplantı salonu: gece 23:00 mesaj yağmuru.' }
    ],
    sentences: [
      { ru: 'Кто за ремонт лифта? Голосуем!', tr: 'Asansör tamiri için kim lehte? Oyluyoruz!', scrambled: ['ремонт лифта?', 'Кто за', 'Голосуем!'], correct: ['Кто за', 'ремонт лифта?', 'Голосуем!'] },
      { ru: 'Решение принято большинством голосов.', tr: 'Karar oy çokluğuyla alındı.', scrambled: ['принято', 'Решение', 'голосов.', 'большинством'], correct: ['Решение', 'принято', 'большинством', 'голосов.'] }
    ],
    sceneTitle: 'Asansör Meselesi',
    sceneContext: 'Yıllık sakinler toplantısı: gündemde bozuk asansör ve aidat zammı; Galina Petrovna başkanlık ediyor, Dima ilk kez oy kullanıyor.',
    dialogue: [
      { speaker: 'Galina Petrovna', ru: 'Первый вопрос повестки: лифт. Он не работает с марта.', reading: 'Pyérvıy vaprós pavyéstki: lift. On ni rabótayit s márta.', tr: 'Gündemin ilk maddesi: asansör. Marttan beri çalışmıyor.' },
      { speaker: 'Dima', ru: 'Я живу на девятом этаже. Я голосую за ремонт двумя руками.', reading: 'Ya jıvú na divyátam etajé. Ya galasúyu za rimónt dvumyá rukámi.', tr: 'Dokuzuncu katta oturuyorum. Tamir için iki elimle oy veriyorum.' },
      { speaker: 'Komşu', ru: 'А кто заплатит? Опять повысят взносы!', reading: 'A kto zaplátit? Apyát\' pavı́syat vznósı!', tr: 'Peki kim ödeyecek? Yine aidatları artıracaklar!' },
      { speaker: 'Galina Petrovna', ru: 'Спокойно! Ставлю на голосование. Кто за — поднимите руку.', reading: 'Spakóyna! Stávlyu na galasavániye. Kto za — padnimítye rúku.', tr: 'Sakin olun! Oylamaya sunuyorum. Lehte olanlar el kaldırsın.' }
    ]
  },
  {
    id: 'mod_b2_e4',
    unitNumber: 130,
    levelGroup: 'B2',
    title: 'Taşınma Günü',
    description: 'Koli bandı, hamallar, kırılacak eşya ve yeni ev partisi',
    category: 'Gündelik Yaşam',
    color: '#ea580c',
    icon: '📦',
    grammarExplain: `📌 TAŞINMA DİLİ:
1. "Переезд" (taşınma) yine "пере-" (öte/yeniden) önekiyle: переехать = taşınmak. Rus atasözü der ki: "iki taşınma bir yangına bedeldir" — "два переезда равны одному пожару".
2. "Грузчики" (hamallar/nakliyeciler) çağrılır: "заказать грузчиков" = nakliyeci tutmak.
3. "Осторожно, хрупкое!" (dikkat, kırılacak!) — koli üzerine yazılan en önemli kelime; осторожно'yu tabelalardan hatırlıyorsun.`,
    words: [
      { id: 'wd130_1', ru: 'Переезд', reading: 'Piriyést', tr: 'Taşınma', level: 'B2', usageNote: 'Sonda Д→Т; hayatın en yorucu macerası.' },
      { id: 'wd130_2', ru: 'Грузчики', reading: 'Grúşşiki', tr: 'Hamallar/nakliyeciler', level: 'B2', usageNote: 'ЗЧ birleşip ŞŞ okunur; piyanoda fiyat ikiye katlanır.' },
      { id: 'wd130_3', ru: 'Коробка', reading: 'Karópka', tr: 'Koli/kutu', level: 'B2', usageNote: 'Taşınmanın atom birimi; asla yetmez.' },
      { id: 'wd130_4', ru: 'Скотч', reading: 'Skotç', tr: 'Koli bandı', level: 'B2', usageNote: 'İngilizceden gelmiştir; ses tonuyla ölçülür: ne kadar cızırtı, o kadar taşınma.' },
      { id: 'wd130_5', ru: 'Хрупкое', reading: 'Hrúpkaye', tr: 'Kırılacak (eşya)', level: 'B2', usageNote: 'Koliye büyük harfle yazılır, yine de en üste konur.' },
      { id: 'wd130_6', ru: 'Газель', reading: "Gazyél'", tr: 'Nakliye kamyoneti', level: 'B2', usageNote: 'Marka isim cins isim olmuş: her taşınma bir "Газель"le başlar.' },
      { id: 'wd130_7', ru: 'Разобрать', reading: "Razabrát'", tr: 'Sökmek (mobilya)', level: 'B2', usageNote: '"Разобрать шкаф" = dolabı sökmek; vidalar hep bir eksik çıkar.' },
      { id: 'wd130_8', ru: 'Собрать', reading: "Sabrát'", tr: 'Kurmak/monte etmek', level: 'B2', usageNote: 'Sökmenin tersi ve iki katı zoru.' },
      { id: 'wd130_9', ru: 'Новоселье', reading: "Navasyél'ye", tr: 'Yeni ev partisi', level: 'B2', usageNote: 'Taşınmanın ödülü; misafir eli boş gelmez: tuz-ekmek klasiktir.' },
      { id: 'wd130_10', ru: 'Этажом выше', reading: 'Etajóm vı́şe', tr: 'Bir kat yukarı', level: 'B2', usageNote: 'Hamalların en sevmediği iki kelime.' }
    ],
    sentences: [
      { ru: 'Осторожно, в этой коробке хрупкое!', tr: 'Dikkat, bu kolide kırılacak eşya var!', scrambled: ['в этой коробке', 'Осторожно,', 'хрупкое!'], correct: ['Осторожно,', 'в этой коробке', 'хрупкое!'] },
      { ru: 'Мы заказали газель и двух грузчиков.', tr: 'Bir kamyonet ve iki nakliyeci ayarladık.', scrambled: ['газель', 'Мы заказали', 'и двух грузчиков.'], correct: ['Мы заказали', 'газель', 'и двух грузчиков.'] }
    ],
    sceneTitle: 'Kırk İki Koli',
    sceneContext: 'Dima yeni dairesine taşınıyor; hamallar piyano olmadığına şükrediyor, Lena kolilere "kitaplar" yazıyor — hepsi kitap çıkıyor.',
    dialogue: [
      { speaker: 'Hamal', ru: 'Так, сорок две коробки. А пианино есть?', reading: 'Tak, sórak dvye karópki. A pianína yest\'?', tr: 'Evet, kırk iki koli. Peki piyano var mı?' },
      { speaker: 'Dima', ru: 'Пианино нет. Но есть двадцать коробок книг.', reading: 'Pianína nyet. No yest\' dvátsat\' karópak knik.', tr: 'Piyano yok. Ama yirmi koli kitap var.' },
      { speaker: 'Hamal', ru: 'Книги... Это как пианино, только по частям.', reading: 'Knígi... Éta kak pianína, tól\'ka pa çistyám.', tr: 'Kitaplar... Piyano gibi, sadece parça parça.' },
      { speaker: 'Lena', ru: 'Зато на новоселье я испеку пирог. Всем, кто донесёт.', reading: 'Zató na navasyél\'ye ya ispikú pirók. Fsyem, kto danisyót.', tr: 'Karşılığında yeni ev partisinde turta yapacağım. Taşıyabilen herkese.' }
    ]
  },
  {
    id: 'mod_b2_e5',
    unitNumber: 131,
    levelGroup: 'B2',
    title: 'Dача & Piknik Organizasyonu',
    description: 'Şaşlık ritüeli, mangal komutanlığı ve sivrisinek diplomasisi',
    category: 'Gündelik Yaşam',
    color: '#16a34a',
    icon: '🍢',
    grammarExplain: `📌 DAÇA & PİKNİK DİLİ:
1. "На дачу / на даче" (dачаya / dачаda): дача Rus yazının başkentidir; "поехать на дачу" cuma akşamı ulusal göçtür.
2. Şaşlık bir yemek değil ritüeldir: "мариновать" (marine etmek) tartışması aile meclisinde çözülür — kefirli mi, soğanlı mu, sirkeli mi?
3. "Жарить на мангале" (mangalda pişirmek): mangalın başındaki kişi "шашлычный генерал"dır — tavsiyeye açık ama komutaya kapalıdır.`,
    words: [
      { id: 'wd131_1', ru: 'Дача', reading: 'Dáça', tr: 'Yazlık/bağ evi', level: 'B2', usageNote: 'Rus ruhunun yazlık adresi; bahçesinde mutlaka salatalık.' },
      { id: 'wd131_2', ru: 'Шашлык', reading: 'Şaşlı́k', tr: 'Şaşlık (şiş kebap)', level: 'B2', usageNote: 'Türkçe "şişlik"le akraba; pikniğin baş kahramanı.' },
      { id: 'wd131_3', ru: 'Мангал', reading: 'Mangál', tr: 'Mangal', level: 'B2', usageNote: 'Kelime Türkçeyle ortak — mangal kültürü de öyle.' },
      { id: 'wd131_4', ru: 'Мариновать', reading: "Marinavát'", tr: 'Marine etmek', level: 'B2', usageNote: 'Her ailenin gizli tarifi ve bitmeyen tartışması.' },
      { id: 'wd131_5', ru: 'Угли', reading: 'Úgli', tr: 'Kömür/köz', level: 'B2', usageNote: '"Жарить на углях" = közde pişirmek; alev düşmandır.' },
      { id: 'wd131_6', ru: 'Шампур', reading: 'Şampúr', tr: 'Şiş', level: 'B2', usageNote: 'Eti dizdiğin metal şiş; dönüş hakkı mangal generalinindir.' },
      { id: 'wd131_7', ru: 'Комары', reading: 'Kamarı́', tr: 'Sivrisinekler', level: 'B2', usageNote: 'Dача akşamının davetsiz misafirleri; "средство от комаров" şart.' },
      { id: 'wd131_8', ru: 'Грядка', reading: 'Gryátka', tr: 'Sebze tarhı', level: 'B2', usageNote: 'Babuşkanın kutsal toprağı; basma, sadece hayran ol.' },
      { id: 'wd131_9', ru: 'Урожай', reading: 'Urajáy', tr: 'Hasat/mahsul', level: 'B2', usageNote: 'Sonbahar dönüşünde bagaj dolusu kabak: "урожай!"' },
      { id: 'wd131_10', ru: 'Свежий воздух', reading: 'Svyéjıy vózduh', tr: 'Temiz hava', level: 'B2', usageNote: 'Dачаya gitmenin resmî gerekçesi; gerçek gerekçe: şaşlık.' }
    ],
    sentences: [
      { ru: 'В субботу мы едем на дачу жарить шашлык.', tr: 'Cumartesi şaşlık yapmaya yazlığa gidiyoruz.', scrambled: ['мы едем', 'В субботу', 'жарить шашлык.', 'на дачу'], correct: ['В субботу', 'мы едем', 'на дачу', 'жарить шашлык.'] },
      { ru: 'Кто отвечает за мангал и угли?', tr: 'Mangal ve kömürden kim sorumlu?', scrambled: ['за мангал', 'Кто', 'и угли?', 'отвечает'], correct: ['Кто', 'отвечает', 'за мангал', 'и угли?'] }
    ],
    sceneTitle: 'Şaşlık Zirvesi',
    sceneContext: 'Dача bahçesinde büyük piknik: Dima mangal komutanlığına terfi ediyor, marinat tartışması diplomatik krize dönüşüyor, sivrisinekler herkesi eşitliyor.',
    dialogue: [
      { speaker: 'Dima', ru: 'Я мариновал мясо в кефире. Это секрет моего дедушки.', reading: 'Ya marinavál myása f kifíre. Éta sikryét mayivó dyéduşki.', tr: 'Eti kefirde marine ettim. Bu dedemin sırrı.' },
      { speaker: 'Galina Petrovna', ru: 'В кефире?! Только уксус и лук! Так делали всегда!', reading: 'F kifíre?! Tól\'ka úksus i luk! Tak dyélali fsigdá!', tr: 'Kefirde mi?! Sadece sirke ve soğan! Hep böyle yapılırdı!' },
      { speaker: 'Lena', ru: 'Тихо! У мангала один генерал. Сегодня это Дима.', reading: 'Tíha! U mangála adín ginirál. Sivódnya éta Díma.', tr: 'Sessizlik! Mangalın tek generali olur. Bugün o Dima.' },
      { speaker: 'Dima', ru: 'Спасибо. Первый приказ: все берут средство от комаров.', reading: 'Spasíba. Pyérvıy prikás: fsye birút sryétstva at kamaróf.', tr: 'Teşekkürler. İlk emir: herkes sivrisinek kovucu alsın.' }
    ]
  },
  {
    id: 'mod_b2_e6',
    unitNumber: 132,
    levelGroup: 'B2',
    title: 'Postanede Resmî İşler',
    description: 'İadeli taahhütlü mektup, tebligat kağıdı ve postane kuyruğu kültürü',
    category: 'Gündelik Yaşam',
    color: '#2563eb',
    icon: '📮',
    grammarExplain: `📌 POSTANE DİLİ:
1. "Заказное письмо" (taahhütlü mektup) — resmî yazışmaların kralı; "с уведомлением" (iadeli) dersen karşı tarafın aldığına dair kağıt sana döner.
2. "Извещение" (tebligat/bildirim kağıdı) posta kutusuna düşer: onu alıp pasaportla gişeye gidersin — ritüel tamamlanır.
3. "До востребования" (postrestant): adres yerine "gelene kadar postanede beklesin" demektir — eski romanların gizli mektup yöntemi!`,
    words: [
      { id: 'wd132_1', ru: 'Почта', reading: 'Póçta', tr: 'Postane/posta', level: 'B2', usageNote: '"Почта России" — sabrın millî sınavı.' },
      { id: 'wd132_2', ru: 'Заказное письмо', reading: 'Zakaznóye pis\'mó', tr: 'Taahhütlü mektup', level: 'B2', usageNote: 'Resmî kurumlar sadece bunu ciddiye alır.' },
      { id: 'wd132_3', ru: 'Уведомление', reading: 'Uvidamlyéniye', tr: 'Alındı bildirimi', level: 'B2', usageNote: '"С уведомлением о вручении" = iadeli taahhütlü.' },
      { id: 'wd132_4', ru: 'Извещение', reading: 'Izvişşéniye', tr: 'Tebligat kağıdı', level: 'B2', usageNote: 'Posta kutusundaki küçük kağıt; büyük kuyrukların davetiyesi.' },
      { id: 'wd132_5', ru: 'Отправитель', reading: "Atpravítil'", tr: 'Gönderen', level: 'B2', usageNote: 'Zarfın sol üstü; "-тель" eki yine meslek/rol üretti.' },
      { id: 'wd132_6', ru: 'Получатель', reading: "Paluçátil'", tr: 'Alıcı', level: 'B2', usageNote: 'Zarfın sağ altı; pasaportsuz teslim yok.' },
      { id: 'wd132_7', ru: 'Индекс', reading: 'Índiks', tr: 'Posta kodu', level: 'B2', usageNote: 'Altı rakam; zarfın köşesindeki noktalı kutulara yazılır.' },
      { id: 'wd132_8', ru: 'Марка', reading: 'Márka', tr: 'Pul', level: 'B2', usageNote: 'Koleksiyonluk olanı ayrı, yapıştırmalık olanı ayrı tutku.' },
      { id: 'wd132_9', ru: 'Бандероль', reading: "Bandiról'", tr: 'Küçük koli/paket', level: 'B2', usageNote: 'Kitap boyu gönderiler; Fransızcadan misafir.' },
      { id: 'wd132_10', ru: 'До востребования', reading: 'Da vastryébavaniya', tr: 'Postrestant', level: 'B2', usageNote: 'Adressiz teslim: postane bekletir, sen pasaportla alırsın.' }
    ],
    sentences: [
      { ru: 'Мне нужно отправить заказное письмо с уведомлением.', tr: 'İadeli taahhütlü mektup göndermem gerekiyor.', scrambled: ['заказное письмо', 'Мне нужно', 'с уведомлением.', 'отправить'], correct: ['Мне нужно', 'отправить', 'заказное письмо', 'с уведомлением.'] },
      { ru: 'Вот извещение и мой паспорт.', tr: 'İşte tebligat kağıdı ve pasaportum.', scrambled: ['извещение', 'Вот', 'и мой паспорт.'], correct: ['Вот', 'извещение', 'и мой паспорт.'] }
    ],
    sceneTitle: 'Gizemli Tebligat',
    sceneContext: 'Dima\'nın kutusuna tebligat düşüyor: gönderen belirsiz, heyecan büyük; kuyruk sonunda gelen paket — büyükannesinden el örgüsü çoraplar.',
    dialogue: [
      { speaker: 'Dima', ru: 'Вот извещение. Я не знаю, кто отправитель. Интрига!', reading: 'Vot izvişşéniye. Ya ni znáyu, kto atpravítil\'. Intríga!', tr: 'İşte tebligat. Göndereni bilmiyorum. Heyecan!' },
      { speaker: 'Gişe memuru', ru: 'Паспорт, пожалуйста. Так... бандероль из Новосибирска.', reading: 'Páspart, pajálusta. Tak... bandiról\' iz Navasibírska.', tr: 'Pasaport lütfen. Bakalım... Novosibirsk\'ten küçük koli.' },
      { speaker: 'Dima', ru: 'Из Новосибирска? Это же бабушка!', reading: 'Iz Navasibírska? Éta je bábuşka!', tr: 'Novosibirsk\'ten mi? O büyükannem!' },
      { speaker: 'Gişe memuru', ru: 'Судя по весу — шерстяные носки. У меня глаз намётан.', reading: 'Súdya pa vyésu — şırstinı́ye naskí. U minyá glas namyótan.', tr: 'Ağırlığına bakılırsa — yün çorap. Gözüm ustalaştı bu işte.' }
    ]
  },
  {
    id: 'mod_b2_e7',
    unitNumber: 133,
    levelGroup: 'B2',
    title: 'Poliklinik Kaydı & Sağlık Sigortası',
    description: 'ОМС poliçesi, doktor randevusu ve aile hekimi sistemi',
    category: 'Gündelik Yaşam',
    color: '#0d9488',
    icon: '🏥',
    grammarExplain: `📌 POLİKLİNİK DİLİ:
1. "Полис ОМС" (zorunlu sağlık sigortası poliçesi) — ücretsiz devlet sağlığının anahtar kartı; onsuz kayıt yok.
2. "Записаться к + Dative" (randevu almak): "записаться к терапевту" (dahiliyeciye randevu almak) — artık çoğu Госуслуги'den yapılır.
3. "Участковый врач" (bölge hekimi): adresine göre atanan aile hekimin; "по участку" sistemi mahalle mantığıyla çalışır.`,
    words: [
      { id: 'wd133_1', ru: 'Поликлиника', reading: 'Paliklínika', tr: 'Poliklinik', level: 'B2', usageNote: 'Devlet ayakta tedavi merkezi; sabah 7 kuyruğu efsanedir.' },
      { id: 'wd133_2', ru: 'Полис ОМС', reading: 'Pólis o-em-és', tr: 'Sağlık sigortası poliçesi', level: 'B2', usageNote: 'Zorunlu ve ücretsiz; cüzdanda pasaportla yan yana durur.' },
      { id: 'wd133_3', ru: 'Записаться', reading: "Zapisátsa", tr: 'Randevu almak', level: 'B2', usageNote: '"Записаться к врачу" = doktora yazılmak.' },
      { id: 'wd133_4', ru: 'Терапевт', reading: 'Tirapyéft', tr: 'Dahiliyeci', level: 'B2', usageNote: 'Sistemin kapısı: önce o, sonra uzmanlar.' },
      { id: 'wd133_5', ru: 'Участковый', reading: 'Uçástkavıy', tr: 'Bölge hekimi', level: 'B2', usageNote: 'Adresine atanmış doktor; seni yıllardır tanır.' },
      { id: 'wd133_6', ru: 'Направление', reading: 'Napravlyéniye', tr: 'Sevk kağıdı', level: 'B2', usageNote: 'Uzmana gitmenin bileti: "направление к кардиологу".' },
      { id: 'wd133_7', ru: 'Регистратура', reading: 'Rigistratúra', tr: 'Kayıt bankosu', level: 'B2', usageNote: 'Polikliniğin komuta merkezi; kartlar burada yaşar.' },
      { id: 'wd133_8', ru: 'Медкарта', reading: 'Midkárta', tr: 'Hasta dosyası', level: 'B2', usageNote: 'Çocukluğundan beri her şey içinde; kalın bir roman.' },
      { id: 'wd133_9', ru: 'Больничный', reading: "Bal'níçnıy", tr: 'Hastalık raporu', level: 'B2', usageNote: '"Взять больничный" = rapor almak; işverene resmi mazeret.' },
      { id: 'wd133_10', ru: 'Прививка', reading: 'Privífka', tr: 'Aşı', level: 'B2', usageNote: '"Сделать прививку" = aşı olmak.' }
    ],
    sentences: [
      { ru: 'Я хочу записаться к терапевту на завтра.', tr: 'Yarın için dahiliyeciye randevu almak istiyorum.', scrambled: ['записаться', 'Я хочу', 'на завтра.', 'к терапевту'], correct: ['Я хочу', 'записаться', 'к терапевту', 'на завтра.'] },
      { ru: 'Возьмите направление и полис ОМС.', tr: 'Sevk kağıdını ve sigorta poliçesini alın.', scrambled: ['направление', 'Возьмите', 'и полис ОМС.'], correct: ['Возьмите', 'направление', 'и полис ОМС.'] }
    ],
    sceneTitle: 'Kayıt Bankosu Diplomasisi',
    sceneContext: 'Dima ilk kez devlet polikliniğine kaydoluyor; kayıt bankosundaki deneyimli memure ОМС poliçesini görünce yumuşuyor, medkarta töreni başlıyor.',
    dialogue: [
      { speaker: 'Memure', ru: 'Полис, паспорт, и скажите адрес — определим ваш участок.', reading: 'Pólis, páspart, i skajítye ádris — apridilím vaş uçástak.', tr: 'Poliçe, pasaport, ve adresinizi söyleyin — bölgenizi belirleyelim.' },
      { speaker: 'Dima', ru: 'Вот всё. Я даже принёс копии. Две.', reading: 'Vot fsyo. Ya dáje prinyós kópii. Dvye.', tr: 'Hepsi burada. Kopya bile getirdim. İki tane.' },
      { speaker: 'Memure', ru: 'Копии?.. Молодой человек, вы знаете нашу систему.', reading: 'Kópii?.. Maladóy çilavyék, vı znáyitye náşu sistyému.', tr: 'Kopya mı?.. Delikanlı, sistemimizi biliyorsunuz.' },
      { speaker: 'Dima', ru: 'Меня закалило МФЦ. Теперь запишите меня к терапевту, пожалуйста.', reading: 'Minyá zakalíla em-ef-tsé. Tipyér\' zapişítye minyá k tirapyéftu, pajálusta.', tr: 'Beni MFC pişirdi. Şimdi lütfen dahiliyeciye kaydedin.' }
    ]
  }
];

export const EXTRA_DAILY2C_C1: UnitModule[] = [
  {
    id: 'mod_c1_e1',
    unitNumber: 182,
    levelGroup: 'C1/C2',
    title: 'Noterde: Vekaletname & Tasdik',
    description: 'Vekaletname çıkarma, imza tasdiki ve miras evrakının ağır dili',
    category: 'Gündelik Yaşam',
    color: '#92400e',
    icon: '📜',
    grammarExplain: `📌 NOTER DİLİ (yüksek bürokratik stil):
1. "Заверить у нотариуса" (noterde tasdik ettirmek): kopya, imza, çeviri — resmiyet isteyen her kağıdın yolu buradan geçer.
2. "Доверенность на + Accusative" (bir iş için vekaletname): "доверенность на продажу квартиры" (daire satışı vekaleti) — kime ne yetkisi verdiğini kelimesi kelimesine okur noter.
3. Noter metinleri "нижеподписавшийся" (aşağıda imzası bulunan) gibi zincir sıfat-fiillerle konuşur — C1 gramerinin gerçek hayattaki zirvesi!`,
    words: [
      { id: 'wd182_1', ru: 'Нотариус', reading: 'Natárius', tr: 'Noter', level: 'C1/C2', usageNote: 'Randevuyla çalışır; kalemi kılıçtan keskindir.' },
      { id: 'wd182_2', ru: 'Доверенность', reading: "Davyérinnast'", tr: 'Vekaletname', level: 'C1/C2', usageNote: '"Генеральная доверенность" = genel vekaletname — büyük yetki, büyük sorumluluk.' },
      { id: 'wd182_3', ru: 'Заверить', reading: "Zavyérit'", tr: 'Tasdik etmek', level: 'C1/C2', usageNote: '"Заверить копию" = kopyayı onaylatmak.' },
      { id: 'wd182_4', ru: 'Наследство', reading: 'Naslyétstva', tr: 'Miras', level: 'C1/C2', usageNote: '"Вступить в наследство" = mirası devralmak; altı ay yasal süre.' },
      { id: 'wd182_5', ru: 'Завещание', reading: 'Zavişşániye', tr: 'Vasiyetname', level: 'C1/C2', usageNote: 'Rus romanlarının motoru; noterde saklanır.' },
      { id: 'wd182_6', ru: 'Нижеподписавшийся', reading: 'Nijıpatpisáfşıysya', tr: 'Aşağıda imzası bulunan', level: 'C1/C2', usageNote: 'Tek kelimelik bürokrasi şiiri; sınavda okuyabilirsen C1\'sin.' },
      { id: 'wd182_7', ru: 'Полномочия', reading: 'Palnamóçiya', tr: 'Yetkiler', level: 'C1/C2', usageNote: '"Передать полномочия" = yetki devretmek.' },
      { id: 'wd182_8', ru: 'Подлинник', reading: 'Pódlinnik', tr: 'Asıl nüsha', level: 'C1/C2', usageNote: 'Kopyanın atası; noter önce onu görmek ister.' },
      { id: 'wd182_9', ru: 'Нотариальная контора', reading: "Natariál'naya kantóra", tr: 'Noterlik', level: 'C1/C2', usageNote: 'Kapıda pirinç tabela, içeride mutlak sessizlik.' },
      { id: 'wd182_10', ru: 'Вступить в силу', reading: "Fstupít' f sílu", tr: 'Yürürlüğe girmek', level: 'C1/C2', usageNote: 'Belgelerin doğum anı: "документ вступает в силу".' }
    ],
    sentences: [
      { ru: 'Мне нужно заверить копию диплома у нотариуса.', tr: 'Diplomanın kopyasını noterde tasdik ettirmem gerekiyor.', scrambled: ['копию диплома', 'Мне нужно', 'у нотариуса.', 'заверить'], correct: ['Мне нужно', 'заверить', 'копию диплома', 'у нотариуса.'] },
      { ru: 'Доверенность вступает в силу с момента подписания.', tr: 'Vekaletname imza anından itibaren yürürlüğe girer.', scrambled: ['вступает в силу', 'Доверенность', 'подписания.', 'с момента'], correct: ['Доверенность', 'вступает в силу', 'с момента', 'подписания.'] }
    ],
    sceneTitle: 'Tek Kelimelik Sınav',
    sceneContext: 'Dima büyükannesi adına vekaletname çıkarttırıyor; noter "нижеподписавшийся" kelimesini tek nefeste okuyunca Dima alkışlamamak için kendini zor tutuyor.',
    dialogue: [
      { speaker: 'Noter', ru: 'Читаю вслух: "Я, нижеподписавшийся, уполномочиваю..."', reading: 'Çitáyu fsluh: "Ya, nijıpatpisáfşıysya, upalnamóçivayu..."', tr: 'Yüksek sesle okuyorum: "Ben, aşağıda imzası bulunan, yetkilendiriyorum..."' },
      { speaker: 'Dima', ru: 'Вы произнесли это без паузы. Моё уважение.', reading: 'Vı praiznisli éta byes páuzı. Mayó uvajéniye.', tr: 'Bunu duraksamadan telaffuz ettiniz. Saygılarımı sunarım.' },
      { speaker: 'Noter', ru: 'Двадцать лет практики. Подпишите здесь. Подлинник останется у вас.', reading: 'Dvátsat\' lyet práktiki. Patpişítye zdyes\'. Pódlinnik astánitsa u vas.', tr: 'Yirmi yıllık pratik. Şurayı imzalayın. Asıl nüsha sizde kalacak.' },
      { speaker: 'Dima', ru: 'Готово. Теперь я официально взрослый человек.', reading: 'Gatóva. Tipyér\' ya afitsiál\'na vzróslıy çilavyék.', tr: 'Tamam. Artık resmen yetişkin bir insanım.' }
    ]
  },
  {
    id: 'mod_c1_e2',
    unitNumber: 183,
    levelGroup: 'C1/C2',
    title: 'Vergi Dairesi & Beyanname',
    description: 'Yıllık beyanname, vergi iadesi ve ИНН numarasının gizemi',
    category: 'Gündelik Yaşam',
    color: '#4d7c0f',
    icon: '🧾',
    grammarExplain: `📌 VERGİ DİLİ:
1. "Подать декларацию" (beyanname vermek) — yıllık ritüel; form "три-НДФЛ" diye anılır, dostluğu zor kazanılır.
2. "Налоговый вычет" (vergi iadesi/indirimi) — sistemin tatlı sürprizi: eğitim, tedavi, ev alımı için ödediğin verginin bir kısmı geri döner!
3. "Задолженность" (borç/vergi borcu) kelimesini ezberle: "у вас задолженность" duymak istemediğin cümledir; "задолженности нет" ise devletin aşk ilanıdır.`,
    words: [
      { id: 'wd183_1', ru: 'Налоговая', reading: 'Nalógavaya', tr: 'Vergi dairesi', level: 'C1/C2', usageNote: '"Налоговая инспекция"nın kısaltması; herkes sadece "налоговая" der.' },
      { id: 'wd183_2', ru: 'Декларация', reading: 'Diklarátsiya', tr: 'Beyanname', level: 'C1/C2', usageNote: '"Подать декларацию" = beyanname vermek; son gün 30 Nisan.' },
      { id: 'wd183_3', ru: 'Налог', reading: 'Nalók', tr: 'Vergi', level: 'C1/C2', usageNote: 'Gelir vergisi "НДФЛ" yüzde on üçtür — dünyaca meşhur düz oran.' },
      { id: 'wd183_4', ru: 'Вычет', reading: 'Vı́çit', tr: 'Vergi iadesi/indirimi', level: 'C1/C2', usageNote: '"Получить вычет" — bilenin kazandığı oyun.' },
      { id: 'wd183_5', ru: 'ИНН', reading: 'i-en-én', tr: 'Vergi numarası', level: 'C1/C2', usageNote: 'On iki haneli kimliğin; işe girerken ilk sorulan şey.' },
      { id: 'wd183_6', ru: 'Задолженность', reading: "Zadóljınnast'", tr: 'Borç (vergi)', level: 'C1/C2', usageNote: '"Задолженности нет" = borcu yoktur — çerçeveletip asılası cümle.' },
      { id: 'wd183_7', ru: 'Самозанятый', reading: 'Samazányatıy', tr: 'Serbest çalışan', level: 'C1/C2', usageNote: 'Yeni nesil statü: yüzde dört vergiyle freelancer hayatı.' },
      { id: 'wd183_8', ru: 'Отчётность', reading: "Atçyótnast'", tr: 'Raporlama/dönem raporu', level: 'C1/C2', usageNote: 'Muhasebecinin mevsimi: "сдать отчётность".' },
      { id: 'wd183_9', ru: 'Штраф', reading: 'Ştraf', tr: 'Ceza', level: 'C1/C2', usageNote: 'Geç kalmanın faturası; "заплатить штраф" = ceza ödemek.' },
      { id: 'wd183_10', ru: 'Личный кабинет', reading: 'Líçnıy kabinyét', tr: 'Kişisel hesap (portal)', level: 'C1/C2', usageNote: 'Verginin online yüzü; kuyruğun modern alternatifi.' }
    ],
    sentences: [
      { ru: 'Я подал декларацию через личный кабинет.', tr: 'Beyannameyi kişisel hesap üzerinden verdim.', scrambled: ['декларацию', 'Я подал', 'личный кабинет.', 'через'], correct: ['Я подал', 'декларацию', 'через', 'личный кабинет.'] },
      { ru: 'Вы можете получить налоговый вычет за обучение.', tr: 'Eğitim için vergi iadesi alabilirsiniz.', scrambled: ['получить', 'Вы можете', 'за обучение.', 'налоговый вычет'], correct: ['Вы можете', 'получить', 'налоговый вычет', 'за обучение.'] }
    ],
    sceneTitle: 'Yüzde On Üçün Dönüşü',
    sceneContext: 'Dima Rusça kursunun faturasıyla vergi dairesinde: eğitim harcamasına iade istiyor; memure "dil kursu da sayılır" deyince Dima gözlerine inanamıyor.',
    dialogue: [
      { speaker: 'Dima', ru: 'Говорят, за обучение можно получить вычет. Даже за курсы русского?', reading: 'Gavaryát, za abuçyéniye mójna paluçít\' vı́çit. Dáje za kúrsı rúskava?', tr: 'Eğitim için iade alınabiliyormuş. Rusça kursu için bile mi?' },
      { speaker: 'Memure', ru: 'Конечно. Договор и чеки есть? Тогда тринадцать процентов вернём.', reading: 'Kanyéşna. Dagavór i çyéki yest\'? Tagdá trinátsat\' pratséntaf virnyóm.', tr: 'Tabii ki. Sözleşme ve fişler var mı? O zaman yüzde on üçünü iade ederiz.' },
      { speaker: 'Dima', ru: 'Есть всё! Получается, государство платит мне за то, что я учу русский?', reading: 'Yest\' fsyo! Paluçáyitsa, gasudárstva plátit mnye za to, şto ya uçú rúskiy?', tr: 'Hepsi var! Yani devlet Rusça öğrendiğim için bana para mı ödüyor?' },
      { speaker: 'Memure', ru: 'Именно так. Учитесь дальше — это официально выгодно.', reading: 'Íminna tak. Uçítyes\' dál\'şe — éta afitsiál\'na vı́gadna.', tr: 'Aynen öyle. Öğrenmeye devam edin — bu resmen kârlı.' }
    ]
  },
  {
    id: 'mod_c1_e3',
    unitNumber: 184,
    levelGroup: 'C1/C2',
    title: 'Tüketici Hakları & Resmî Şikayet',
    description: 'İade reddine karşı претензия yazma ve hakkını kibar ama çelik gibi arama',
    category: 'Gündelik Yaşam',
    color: '#be123c',
    icon: '⚖️',
    grammarExplain: `📌 ŞİKAYET DİLİ (kibar çelik):
1. "Претензия" (resmî şikayet/ihtar) — mağazaya yazılı verilen belge; sözlü tartışmanın bittiği, hukukun başladığı yer.
2. "Закон о защите прав потребителей" (tüketici hakları kanunu) — bu kelime grubunu telaffuz eden müşteri, mağazada anında terfi eder: sorun "yönetici seviyesine" çıkar.
3. "В течение + Genitive" (… içinde): "в течение четырнадцати дней" (on dört gün içinde) — iade hakkının zaman çerçevesi hep bu kalıpla söylenir.`,
    words: [
      { id: 'wd184_1', ru: 'Претензия', reading: 'Prityénziya', tr: 'Resmî şikayet/ihtar', level: 'C1/C2', usageNote: '"Написать претензию" = ihtarname yazmak; iki nüsha, biri sana.' },
      { id: 'wd184_2', ru: 'Потребитель', reading: "Patribítil'", tr: 'Tüketici', level: 'C1/C2', usageNote: '"Права потребителя" = tüketici hakları; "-тель" ailesinin en güçlü üyesi.' },
      { id: 'wd184_3', ru: 'Возврат', reading: 'Vazvrát', tr: 'İade', level: 'C1/C2', usageNote: '"Возврат товара" = ürün iadesi; "возврат денег" = para iadesi.' },
      { id: 'wd184_4', ru: 'Брак', reading: 'Brak', tr: 'Kusur/defo', level: 'C1/C2', usageNote: 'Dikkat: aynı kelime "evlilik" demektir! "Заводской брак" = fabrika hatası.' },
      { id: 'wd184_5', ru: 'Гарантийный срок', reading: 'Garantíynıy srok', tr: 'Garanti süresi', level: 'C1/C2', usageNote: 'Bitmeden bir gün önce bozulan cihazlar için kutsal takvim.' },
      { id: 'wd184_6', ru: 'Чек', reading: 'Çek', tr: 'Fiş', level: 'C1/C2', usageNote: 'Hakkın kağıttan kanıtı; yasal olarak şart değil ama hayatı kolaylaştırır.' },
      { id: 'wd184_7', ru: 'Экспертиза', reading: 'Ekspirtíza', tr: 'Bilirkişi incelemesi', level: 'C1/C2', usageNote: 'Mağaza "kullanıcı hatası" derse devreye girer.' },
      { id: 'wd184_8', ru: 'Роспотребнадзор', reading: 'Raspatribnadzór', tr: 'Tüketici koruma kurumu', level: 'C1/C2', usageNote: 'Tek kelimelik sihir: adını duyan mağaza müdürü kibarlaşır.' },
      { id: 'wd184_9', ru: 'Компенсация', reading: 'Kampinsátsiya', tr: 'Tazminat', level: 'C1/C2', usageNote: '"Потребовать компенсацию" = tazminat talep etmek.' },
      { id: 'wd184_10', ru: 'Отказ', reading: 'Atkás', tr: 'Ret', level: 'C1/C2', usageNote: '"Письменный отказ" (yazılı ret) iste — bir sonraki adımın delili olur.' }
    ],
    sentences: [
      { ru: 'Я хочу вернуть товар в течение четырнадцати дней.', tr: 'Ürünü on dört gün içinde iade etmek istiyorum.', scrambled: ['вернуть товар', 'Я хочу', 'четырнадцати дней.', 'в течение'], correct: ['Я хочу', 'вернуть товар', 'в течение', 'четырнадцати дней.'] },
      { ru: 'Это заводской брак, и я требую возврат денег.', tr: 'Bu fabrika hatası ve para iadesi talep ediyorum.', scrambled: ['заводской брак,', 'Это', 'возврат денег.', 'и я требую'], correct: ['Это', 'заводской брак,', 'и я требую', 'возврат денег.'] }
    ],
    sceneTitle: 'Kibar Çelik Operasyonu',
    sceneContext: 'Dima\'nın yeni su ısıtıcısı üç günde bozuluyor; mağaza önce "kullanıcı hatası" diyor — Dima gülümseyerek претензия kelimesini telaffuz edince müdür masaya geliyor.',
    dialogue: [
      { speaker: 'Satıcı', ru: 'Чайник сломался? Наверное, вы неправильно им пользовались.', reading: 'Çáynik slamálsya? Navyérna, vı niprávil\'na im pól\'zavalis\'.', tr: 'Isıtıcı mı bozuldu? Herhalde yanlış kullandınız.' },
      { speaker: 'Dima', ru: 'Я кипятил воду. Это его единственная работа. Вот чек, вот претензия в двух экземплярах.', reading: 'Ya kipitíl vódu. Éta yivó yidínstvinnaya rabóta. Vot çek, vot prityénziya v dvuh ekzimplyárah.', tr: 'Su kaynattım. Tek işi buydu. İşte fiş, işte iki nüsha şikayet dilekçesi.' },
      { speaker: 'Müdür', ru: 'Претензия?.. Не нужно бумаг! Мы вернём деньги сегодня же.', reading: 'Prityénziya?.. Ni nújna bumák! Mı virnyóm dyén\'gi sivódnya je.', tr: 'İhtarname mi?.. Kağıda gerek yok! Parayı bugün iade ediyoruz.' },
      { speaker: 'Dima', ru: 'Волшебное слово. Лучше, чем "пожалуйста".', reading: 'Valşébnaye slóva. Lúçşe, çem "pajálusta".', tr: 'Sihirli kelime. "Lütfen"den bile güçlü.' }
    ]
  }
];
