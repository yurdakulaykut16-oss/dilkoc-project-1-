import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const PACK100_B2: UnitModule[] = [
  {
    id: 'p100_b2_conditional', unitNumber: 143.9601, levelGroup: 'B2',
    title: 'Koşul Kipi (бы)', description: 'Olsaydı, yapardım: gerçek dışı durumlar',
    category: 'İleri Dilbilgisi', color: '#7c3aed', icon: '🌀',
    grammarExplain: `📌 СОСЛАГАТЕЛЬНОЕ НАКЛОНЕНИЕ:
1. Kalıp: geçmiş zaman (-л) + бы. Kip değişmez, zaman belirsizdir: Я бы поехал = Giderdim / gidecektim.
2. Şart cümlesi: Если бы у меня было время, я бы пришёл.
3. Kibar rica: Я бы хотел… (…-mek isterdim) — Я хочу\'dan çok daha naziktir.`,
    words: [
      W('p100b2co_1', 'Бы', 'Bı', '-sa / -ardı parçacığı', 'B2', 'Vurgusuzdur, fiile bitişik okunur; б biçimi de vardır.'),
      W('p100b2co_2', 'Если бы', 'Yésli bı', 'Eğer …-saydı', 'B2', 'Gerçekleşmemiş şartı anlatır.'),
      W('p100b2co_3', 'Возможность', 'Vazmójnast', 'İmkân / Olasılık', 'B2', 'Если бы была возможность…'),
      W('p100b2co_4', 'Предположить', 'Pridpalajít', 'Varsaymak', 'B2', 'Предположим, что… = Diyelim ki…'),
      W('p100b2co_5', 'Вряд ли', 'Vryat li', 'Pek sanmam', 'B2', 'Kibar bir şüphe ifadesidir.'),
      W('p100b2co_6', 'На твоём месте', 'Na tvayóm myésti', 'Senin yerinde olsam', 'B2', 'Tavsiye vermenin en yumuşak yolu.')
    ],
    sentences: [
      S('Если бы у меня было время, я бы пришёл.', 'Zamanım olsaydı gelirdim.'),
      S('На твоём месте я бы согласился.', 'Senin yerinde olsam kabul ederdim.'),
      S('Вряд ли он успеет сегодня.', 'Bugün yetiştirebileceğini pek sanmam.')
    ]
  },
  {
    id: 'p100_b2_reported', unitNumber: 143.9602, levelGroup: 'B2',
    title: 'Dolaylı Anlatım', description: 'Başkasının sözünü aktar',
    category: 'İleri Dilbilgisi', color: '#0369a1', icon: '💬',
    grammarExplain: `📌 КОСВЕННАЯ РЕЧЬ:
1. Rusçada zaman KAYMAZ: Он сказал: «Я занят» → Он сказал, что он занят. (İngilizcedeki geri kayma yoktur.)
2. Evet/hayır sorusu ли ile aktarılır: Он спросил, приду ли я.
3. Emir ise чтобы + geçmiş: Он сказал, чтобы я пришёл.`,
    words: [
      W('p100b2rp_1', 'Утверждать', 'Utvirjdát', 'İddia etmek', 'B2', 'Haber dilinde çok yaygındır.'),
      W('p100b2rp_2', 'Сообщить', 'Saapşşít', 'Bildirmek', 'B2', 'Resmî duyurular için.'),
      W('p100b2rp_3', 'Ли', 'Li', '…-ıp -madığı', 'B2', 'Vurgusuz soru parçacığı; ikinci sırada durur.'),
      W('p100b2rp_4', 'Чтобы', 'Ştóbı', '…-sın diye', 'B2', 'Ardından daima geçmiş zaman ya da mastar gelir.'),
      W('p100b2rp_5', 'По словам', 'Pa slavám', '…-in sözlerine göre', 'B2', 'Tamlayan hâl ister: по словам директора.'),
      W('p100b2rp_6', 'Ссылаться', 'Ssılátsa', 'Atıfta bulunmak', 'B2', 'Ссылаться на источник = kaynağa dayanmak.')
    ],
    sentences: [
      S('Он сказал, что не сможет прийти.', 'Gelemeyeceğini söyledi.'),
      S('Она спросила, знаю ли я ответ.', 'Cevabı bilip bilmediğimi sordu.'),
      S('По словам директора, проект закрыт.', 'Müdürün sözlerine göre proje kapandı.')
    ]
  },
  {
    id: 'p100_b2_prefixes', unitNumber: 143.9603, levelGroup: 'B2',
    title: 'Fiil Önekleri Sistemi', description: 'Tek kök, on anlam',
    category: 'İleri Dilbilgisi', color: '#b91c1c', icon: '🧬',
    grammarExplain: `📌 ÖNEK = ANLAM MOTORU:
1. при- yaklaşma (прийти: varmak), у- uzaklaşma (уйти: çekip gitmek).
2. пере- karşıya/tekrar (перейти: karşıya geçmek, переделать: yeniden yapmak).
3. вы- dışarı (выйти), за- uğrama (зайти), до- sona kadar (дойти).
4. Önek eklenince fiil çoğunlukla BİTMİŞ görünüşe geçer.`,
    words: [
      W('p100b2pf_1', 'Прийти', 'Priytí', 'Varmak / Gelmek', 'B2', 'при- = yaklaşıp varmak.'),
      W('p100b2pf_2', 'Перейти', 'Piriytí', 'Karşıya geçmek', 'B2', 'Перейти дорогу = yolun karşısına geçmek.'),
      W('p100b2pf_3', 'Зайти', 'Zaytí', 'Uğramak', 'B2', 'Зайти в гости = ziyarete uğramak.'),
      W('p100b2pf_4', 'Выйти', 'Vıytí', 'Çıkmak', 'B2', 'Выйти замуж = (kadın) evlenmek.'),
      W('p100b2pf_5', 'Дойти', 'Daytí', 'Ulaşmak (yürüyerek)', 'B2', 'До меня дошло = Kafama dank etti.'),
      W('p100b2pf_6', 'Переделать', 'Piridyélat', 'Baştan yapmak', 'B2', 'пере- burada "yeniden" anlamındadır.')
    ],
    sentences: [
      S('Зайди ко мне после работы.', 'İşten sonra bana uğra.'),
      S('Нам пришлось всё переделать.', 'Her şeyi baştan yapmak zorunda kaldık.'),
      S('Он вышел из комнаты.', 'Odadan çıktı.')
    ]
  },
  {
    id: 'p100_b2_register', unitNumber: 143.9604, levelGroup: 'B2',
    title: 'Cümlede Anlam: Üslup Katmanları', description: 'Resmî, günlük, argo',
    category: 'Cümlede Anlam', color: '#c2410c', icon: '🎚️',
    grammarExplain: `📌 СТИЛИСТИЧЕСКИЕ ПЛАСТЫ:
1. Aynı fikir üç katmanda: Я устал (nötr) / Я утомлён (kitabî) / Я вымотался (günlük).
2. Resmî üslupta isimleşme artar: осуществить проверку (denetim gerçekleştirmek) = проверить.
3. Yanlış katman seçimi anlamı değil TONU bozar; iş yazışmasında argo kullanmak ciddi hatadır.`,
    words: [
      W('p100b2rg_1', 'Официальный', 'Afitsiálnıy', 'Resmî', 'B2', 'Официально-деловой стиль = resmî yazı üslubu.'),
      W('p100b2rg_2', 'Разговорный', 'Razgavórnıy', 'Konuşma diline ait', 'B2', 'Sözlüklerde "разг." kısaltmasıyla gösterilir.'),
      W('p100b2rg_3', 'Осуществить', 'Asuşşistvít', 'Gerçekleştirmek', 'B2', 'Ağır bürokratik fiil.'),
      W('p100b2rg_4', 'Вымотаться', 'Vımatatsa', 'Bitkin düşmek', 'B2', 'Tamamen günlük dildir.'),
      W('p100b2rg_5', 'Просторечие', 'Prastaryéçiye', 'Halk ağzı / Kaba dil', 'B2', 'Yazıda kaçınılması gereken katman.'),
      W('p100b2rg_6', 'Уместный', 'Umyésnıy', 'Yerinde / Uygun', 'B2', 'Уместное слово = bağlama uygun sözcük.')
    ],
    sentences: [
      S('В официальном письме такой тон неуместен.', 'Resmî bir mektupta bu ton uygun değildir.'),
      S('Это разговорное выражение.', 'Bu, konuşma diline ait bir ifadedir.'),
      S('Компания осуществила проверку качества.', 'Şirket kalite denetimi gerçekleştirdi.')
    ]
  },
  {
    id: 'p100_b2_irony', unitNumber: 143.9605, levelGroup: 'B2',
    title: 'Cümlede Anlam: İroni ve Alt Metin', description: 'Söylenmeyeni duymak',
    category: 'Cümlede Anlam', color: '#a21caf', icon: '😏',
    grammarExplain: `📌 ПОДТЕКСТ:
1. İroni çoğunlukla TONLAMA ve abartıyla verilir: Ну конечно, ты всегда прав! (Tabii ya, hep haklısın!)
2. Kalıp ironi işaretleri: тоже мне (amma da), ещё бы (hadi canım), как же (ne gezer).
3. Rus mizahında eksiltili cümle ve ani sessizlik de anlam taşır.`,
    words: [
      W('p100b2ir_1', 'Ирония', 'İróniya', 'İroni', 'B2', 'Sarkazm (сарказм) daha sert biçimidir.'),
      W('p100b2ir_2', 'Тоже мне', 'Tóje mnye', 'Amma da …', 'B2', 'Küçümseme katan kalıp: Тоже мне специалист!'),
      W('p100b2ir_3', 'Ещё бы', 'Yişşó bı', 'Hadi canım / Tabii ki', 'B2', 'Bağlama göre onay ya da alay olabilir.'),
      W('p100b2ir_4', 'Как же', 'Kak je', 'Ne gezer', 'B2', 'İnanmadığını ima eder.'),
      W('p100b2ir_5', 'Намекать', 'Namikát', 'İma etmek', 'B2', 'Намекать на что-то.'),
      W('p100b2ir_6', 'Подтекст', 'Pattyékst', 'Alt metin', 'B2', 'Edebiyat çözümlemesinin anahtar kavramı.')
    ],
    sentences: [
      S('Ну конечно, ты всегда прав!', 'Tabii ya, sen hep haklısın!'),
      S('Он явно на что-то намекает.', 'Belli ki bir şey ima ediyor.'),
      S('В этом тексте есть скрытый подтекст.', 'Bu metinde gizli bir alt metin var.')
    ]
  },
  {
    id: 'p100_b2_collocation', unitNumber: 143.9606, levelGroup: 'B2',
    title: 'Cümlede Anlam: Eşdizimlilik', description: 'Hangi kelime hangisiyle gider?',
    category: 'Cümlede Anlam', color: '#0e7490', icon: '🧲',
    grammarExplain: `📌 СОЧЕТАЕМОСТЬ СЛОВ:
1. Rusçada "karar vermek" принять решение, "önlem almak" принять меры\'dir; делать denmez.
2. Yanlış eşdizim dilbilgisel olarak doğru ama kulağa YABANCI gelir.
3. Sık kalıplar: оказать помощь (yardım etmek), обратить внимание (dikkat etmek), играть роль (rol oynamak).`,
    words: [
      W('p100b2cl_1', 'Принять решение', 'Prinyát rişéniye', 'Karar vermek', 'B2', 'решить fiilinin resmî eşdeğeri.'),
      W('p100b2cl_2', 'Оказать помощь', 'Akazát pómaşş', 'Yardım sağlamak', 'B2', 'Resmî ve kurumsal bağlam.'),
      W('p100b2cl_3', 'Обратить внимание', 'Abratít vnimániye', 'Dikkat çekmek/etmek', 'B2', 'на + belirtme hâli ister.'),
      W('p100b2cl_4', 'Играть роль', 'İgrát rol', 'Rol oynamak', 'B2', 'Yaygın hata: "иметь роль" yanlıştır.'),
      W('p100b2cl_5', 'Иметь значение', 'İmyét znaçéniye', 'Önem taşımak', 'B2', 'Bir öncekiyle karıştırılan ikiz kalıptır.'),
      W('p100b2cl_6', 'Вести переговоры', 'Vistí pirigavórı', 'Müzakere yürütmek', 'B2', 'İş dilinin temel eşdizimi.')
    ],
    sentences: [
      S('Мы приняли трудное решение.', 'Zor bir karar aldık.'),
      S('Обратите внимание на этот пункт.', 'Bu maddeye dikkat edin.'),
      S('Это не имеет значения.', 'Bunun bir önemi yok.')
    ]
  },
  {
    id: 'p100_b2_abstract', unitNumber: 143.9607, levelGroup: 'B2',
    title: 'Cümlede Anlam: Soyut Kavramlar', description: 'Adalet, özgürlük, sorumluluk',
    category: 'Cümlede Anlam', color: '#4338ca', icon: '🧠',
    grammarExplain: `📌 SOYUT İSİM YAPIMI:
1. -ость: свобода → независимость, ответственный → ответственность.
2. -ение/-ание: развивать → развитие, понимать → понимание.
3. Soyut isimler çoğunlukla tekil kullanılır ve tamlayan hâlle bağlanır: чувство ответственности.`,
    words: [
      W('p100b2ab_1', 'Справедливость', 'Spravidlívast', 'Adalet', 'B2', 'Rus toplumsal söyleminin merkez kavramı.'),
      W('p100b2ab_2', 'Свобода', 'Svabóda', 'Özgürlük', 'B2', 'Свобода слова = ifade özgürlüğü.'),
      W('p100b2ab_3', 'Ответственность', 'Atvyétstvinnast', 'Sorumluluk', 'B2', 'Нести ответственность = sorumluluk taşımak.'),
      W('p100b2ab_4', 'Достоинство', 'Dastóinstva', 'Onur / Meziyet', 'B2', 'Hem "haysiyet" hem "artı yön" demektir.'),
      W('p100b2ab_5', 'Ценность', 'Tsénnast', 'Değer', 'B2', 'Çoğulu ценности = (toplumsal) değerler.'),
      W('p100b2ab_6', 'Развитие', 'Razvítiye', 'Gelişim', 'B2', 'Устойчивое развитие = sürdürülebilir kalkınma.')
    ],
    sentences: [
      S('Каждый несёт ответственность за свои слова.', 'Herkes sözlerinin sorumluluğunu taşır.'),
      S('Для него справедливость важнее денег.', 'Onun için adalet paradan önemlidir.'),
      S('Это вопрос человеческого достоинства.', 'Bu bir insan onuru meselesidir.')
    ]
  },
  {
    id: 'p100_b2_soviet', unitNumber: 143.9608, levelGroup: 'B2',
    title: 'Kültür: Sovyet Mirası', description: 'Kelimelerde yaşayan yakın tarih',
    category: 'Kültür', color: '#b91c1c', icon: '🏛️',
    grammarExplain: `📌 TARİHSEL SÖZCÜKLER:
1. Sovyet dönemi kısaltma üretiminde rekor kırdı: колхоз (kolektif çiftlik), КГБ, СССР.
2. Bu kelimeler bugün tarihsel ya da ironik kullanılır.
3. Tarihten söz ederken в советское время (Sovyet döneminde) kalıbı kullanılır.`,
    words: [
      W('p100b2sv_1', 'Советский', 'Savyétskiy', 'Sovyet', 'B2', 'совет (kurul/öğüt) kelimesinden.'),
      W('p100b2sv_2', 'Колхоз', 'Kalhós', 'Kolhoz', 'B2', 'коллективное хозяйство kısaltması.'),
      W('p100b2sv_3', 'Очередь', 'Óçirit', 'Kuyruk / Sıra', 'B2', 'Sovyet gündelik hayatının simgesi.'),
      W('p100b2sv_4', 'Дефицит', 'Difitsít', 'Kıtlık / Bulunmayan mal', 'B2', 'O dönemin anahtar kelimesidir.'),
      W('p100b2sv_5', 'Перестройка', 'Piristróyka', 'Perestroyka', 'B2', '"Yeniden yapılanma" demektir.'),
      W('p100b2sv_6', 'Ностальгия', 'Nastalgíya', 'Nostalji', 'B2', 'Ностальгия по СССР tartışmalı bir olgudur.')
    ],
    sentences: [
      S('В советское время был большой дефицит.', 'Sovyet döneminde büyük bir kıtlık vardı.'),
      S('Люди стояли в очереди часами.', 'İnsanlar saatlerce kuyrukta bekliyordu.'),
      S('У старшего поколения есть ностальгия.', 'Yaşlı kuşakta nostalji var.')
    ]
  },
  {
    id: 'p100_b2_cinema', unitNumber: 143.9609, levelGroup: 'B2',
    title: 'Kültür: Rus Sineması', description: 'Tarkovski\'den çağdaş filmlere',
    category: 'Kültür', color: '#334155', icon: '🎬',
    grammarExplain: `📌 ELEŞTİRİ DİLİ:
1. Değerlendirme: Фильм произвёл на меня впечатление. / Сюжет затянут. (Konu ağır ilerliyor.)
2. Karşılaştırma: по сравнению с … (…-e kıyasla) araç hâli ister.
3. Görüş bildirme: На мой взгляд… (Bana kalırsa…) — По-моему\'den daha resmîdir.`,
    words: [
      W('p100b2ci_1', 'Режиссёр', 'Rijissór', 'Yönetmen', 'B2', 'Fransızcadan; çift С yazılır.'),
      W('p100b2ci_2', 'Сюжет', 'Syujét', 'Konu / Olay örgüsü', 'B2', 'Спойлер vermemek için kullanılan sözcük.'),
      W('p100b2ci_3', 'Съёмки', 'Syómki', 'Çekim', 'B2', 'Sert işaret Ъ ayırıcı görevdedir.'),
      W('p100b2ci_4', 'Актёрская игра', 'Aktyórskaya igrá', 'Oyunculuk', 'B2', 'Eleştiri metinlerinin sabit ifadesi.'),
      W('p100b2ci_5', 'Затянутый', 'Zatyánutıy', 'Ağır / Uzatılmış', 'B2', 'Olumsuz eleştiri sıfatı.'),
      W('p100b2ci_6', 'Шедевр', 'Şıdévr', 'Şaheser', 'B2', 'Fransızca chef-d\'œuvre\'den.')
    ],
    sentences: [
      S('На мой взгляд, это настоящий шедевр.', 'Bana kalırsa bu gerçek bir şaheser.'),
      S('Сюжет немного затянут.', 'Konu biraz ağır ilerliyor.'),
      S('Актёрская игра была великолепной.', 'Oyunculuk muhteşemdi.')
    ]
  },
  {
    id: 'p100_b2_art', unitNumber: 143.961, levelGroup: 'B2',
    title: 'Kültür: Sanat ve Müzeler', description: 'Ermitaj, Tretyakov, avangart',
    category: 'Kültür', color: '#7e22ce', icon: '🖼️',
    grammarExplain: `📌 SANAT ANLATIMI:
1. "…-in tablosu" = картина + tamlayan: картина Репина.
2. "…-i tasvir etmek" = изображать + belirtme hâli.
3. Sergi: выставка проходит в … (sergi …-de düzenleniyor).`,
    words: [
      W('p100b2ar_1', 'Картина', 'Kartína', 'Tablo', 'B2', 'Aynı kelime "manzara/durum" mecazıyla da kullanılır.'),
      W('p100b2ar_2', 'Художник', 'Hudójnik', 'Ressam / Sanatçı', 'B2', 'Geniş anlamda görsel sanatçı.'),
      W('p100b2ar_3', 'Выставка', 'Vístafka', 'Sergi', 'B2', 'выставлять (sergilemek) fiilinden.'),
      W('p100b2ar_4', 'Авангард', 'Avangárt', 'Avangart', 'B2', 'Malevich ve Kandinsky ile Rus avangardı.'),
      W('p100b2ar_5', 'Изображать', 'İzabraját', 'Tasvir etmek', 'B2', 'Tamamlanmışı изобразить.'),
      W('p100b2ar_6', 'Подлинник', 'Pódlinnik', 'Orijinal eser', 'B2', 'Karşıtı копия / подделка (sahte).')
    ],
    sentences: [
      S('Эта картина изображает русскую деревню.', 'Bu tablo bir Rus köyünü tasvir ediyor.'),
      S('Выставка проходит в Третьяковской галерее.', 'Sergi Tretyakov Galerisi\'nde düzenleniyor.'),
      S('Это подлинник, а не копия.', 'Bu orijinal, kopya değil.')
    ]
  },
  {
    id: 'p100_b2_regions', unitNumber: 143.9611, levelGroup: 'B2',
    title: 'Kültür: Halklar ve Bölgeler', description: 'Tatarlar, Kafkasya, Sibirya',
    category: 'Kültür', color: '#059669', icon: '🗺️',
    grammarExplain: `📌 HALK ADLARI:
1. Halk adı + dişil biçim: татарин / татарка, якут / якутка.
2. "…-ce konuşmak" = говорить по-татарски (по- + -ски kalıbı).
3. Rusya 190\'dan fazla halkı barındıran çokuluslu bir federasyondur: многонациональная страна.`,
    words: [
      W('p100b2re_1', 'Народ', 'Narót', 'Halk', 'B2', 'Çoğulu народы = halklar.'),
      W('p100b2re_2', 'Татары', 'Tatárı', 'Tatarlar', 'B2', 'Rusya\'nın en kalabalık ikinci halkı.'),
      W('p100b2re_3', 'Кавказ', 'Kafkás', 'Kafkasya', 'B2', 'на Кавказе (в değil) denir.'),
      W('p100b2re_4', 'Сибирь', 'Sibír', 'Sibirya', 'B2', 'Dişildir: в Сибири.'),
      W('p100b2re_5', 'Многонациональный', 'Mnaganatsianálnıy', 'Çokuluslu', 'B2', 'Anayasa metninde geçen anahtar sıfat.'),
      W('p100b2re_6', 'Обычаи', 'Abıçai', 'Töreler', 'B2', 'Bölgesel farklılıkları anlatırken kullanılır.')
    ],
    sentences: [
      S('Россия — многонациональная страна.', 'Rusya çokuluslu bir ülkedir.'),
      S('На Кавказе очень сильны традиции гостеприимства.', 'Kafkasya\'da misafirperverlik gelenekleri çok güçlüdür.'),
      S('Он говорит по-татарски и по-русски.', 'Tatarca ve Rusça konuşuyor.')
    ]
  },
  {
    id: 'p100_b2_rel_philosophy', unitNumber: 143.9612, levelGroup: 'B2',
    title: 'Din: İnanç Felsefesi', description: 'Vicdan, kader, anlam arayışı',
    category: 'Din ve Maneviyat', color: '#a16207', icon: '🕊️',
    grammarExplain: `📌 SOYUT TARTIŞMA KALIPLARI:
1. Речь идёт о … (Söz konusu olan …) — bulunma hâli ister.
2. Fikir bildirme: Я склоняюсь к мысли, что… (… düşüncesine meylediyorum.)
3. Karşı çıkma: Я не согласен с тем, что…`,
    words: [
      W('p100b2rf_1', 'Совесть', 'Sóvist', 'Vicdan', 'B2', 'Dostoyevski romanlarının merkez kavramı.'),
      W('p100b2rf_2', 'Судьба', 'Sudbá', 'Kader', 'B2', 'Halk dilinde "alın yazısı" olarak da geçer.'),
      W('p100b2rf_3', 'Смирение', 'Smiryéniye', 'Tevazu / Teslimiyet', 'B2', 'Ortodoks maneviyatının anahtar erdemi.'),
      W('p100b2rf_4', 'Милосердие', 'Milasyérdiye', 'Merhamet', 'B2', '"Tatlı kalp" kökünden bileşik kelime.'),
      W('p100b2rf_5', 'Искупление', 'İskuplyéniye', 'Kefaret', 'B2', 'Teolojik terim.'),
      W('p100b2rf_6', 'Духовность', 'Duhóvnast', 'Maneviyat', 'B2', 'дух (ruh) kökünden.')
    ],
    sentences: [
      S('Речь идёт о свободе совести.', 'Söz konusu olan vicdan özgürlüğüdür.'),
      S('Он верит в судьбу.', 'O kadere inanıyor.'),
      S('Милосердие важнее наказания.', 'Merhamet cezadan önemlidir.')
    ]
  },
  {
    id: 'p100_b2_rel_history', unitNumber: 143.9613, levelGroup: 'B2',
    title: 'Din: Kilise Tarihi', description: 'Vaftizden patrikliğe',
    category: 'Din ve Maneviyat', color: '#92400e', icon: '📿',
    grammarExplain: `📌 TARİHSEL ANLATIM:
1. Tarih verirken: в 988 году князь Владимир крестил Русь.
2. Edilgen geçmiş ortaç yaygındır: Русь была крещена в 988 году.
3. Dönem belirtme: при Иване Грозном (Korkunç İvan döneminde).`,
    words: [
      W('p100b2rh_1', 'Крещение', 'Krişşéniye', 'Vaftiz', 'B2', 'Крещение Руси = Rusya\'nın Hristiyanlaşması (988).'),
      W('p100b2rh_2', 'Патриарх', 'Patriárh', 'Patrik', 'B2', 'Rus Ortodoks Kilisesi\'nin başı.'),
      W('p100b2rh_3', 'Монастырь', 'Manastır', 'Manastır', 'B2', 'Türkçedeki kelimeyle neredeyse aynı okunur.'),
      W('p100b2rh_4', 'Раскол', 'Raskól', 'Bölünme / Şizma', 'B2', '17. yüzyılda Eski İnananlar ayrılığı.'),
      W('p100b2rh_5', 'Святой', 'Svitóy', 'Aziz / Kutsal', 'B2', 'Hem sıfat hem isim olarak kullanılır.'),
      W('p100b2rh_6', 'Собор', 'Sabór', 'Katedral / Konsil', 'B2', 'İki anlamlı: yapı ve dinî meclis.')
    ],
    sentences: [
      S('Русь была крещена в 988 году.', 'Rusya 988 yılında vaftiz edildi.'),
      S('Раскол разделил церковь на два лагеря.', 'Şizma kiliseyi iki kampa böldü.'),
      S('Этот монастырь основан в XV веке.', 'Bu manastır 15. yüzyılda kuruldu.')
    ]
  },
  {
    id: 'p100_b2_rel_islamic', unitNumber: 143.9614, levelGroup: 'B2',
    title: 'Din: Rusçada İslamî Kavramlar', description: 'Fıkıh, ümmet, medrese',
    category: 'Din ve Maneviyat', color: '#15803d', icon: '☪️',
    grammarExplain: `📌 ALINTI TERİMLERİN ÇEKİMİ:
1. Arapça-Türkçe kökenli terimler Rusça hâl sistemine girer: в мечети, о шариате, из медресе (çekimsiz).
2. Sonu ünsüzle bitenler eril sayılır: намаз, минарет, имам.
3. Resmî metinlerde "исламский" sıfatı kullanılır: исламское право (İslam hukuku).`,
    words: [
      W('p100b2ri_1', 'Шариат', 'Şariát', 'Şeriat', 'B2', 'Hukuki bağlamda исламское право da denir.'),
      W('p100b2ri_2', 'Медресе', 'Midrisé', 'Medrese', 'B2', 'Çekimsizdir, nötr sayılır.'),
      W('p100b2ri_3', 'Умма', 'Úmma', 'Ümmet', 'B2', 'Dinî topluluk anlamında.'),
      W('p100b2ri_4', 'Муфтий', 'Múftiy', 'Müftü', 'B2', 'Муфтият = müftülük kurumu.'),
      W('p100b2ri_5', 'Минарет', 'Minarét', 'Minare', 'B2', 'Kazan\'daki Kul Şerif Camii ünlüdür.'),
      W('p100b2ri_6', 'Паломничество', 'Palómniçistva', 'Hac / Ziyaret', 'B2', 'Hac için хадж terimi de kullanılır.')
    ],
    sentences: [
      S('Муфтий выступил с обращением к верующим.', 'Müftü inananlara bir konuşma yaptı.'),
      S('В Казани работает несколько медресе.', 'Kazan\'da birkaç medrese faaliyette.'),
      S('Паломничество в Мекку называется хадж.', 'Mekke\'ye yapılan ziyarete hac denir.')
    ]
  },
  {
    id: 'p100_b2_media', unitNumber: 143.9615, levelGroup: 'B2',
    title: 'Medya ve Haber Dili', description: 'Manşet okumayı öğren',
    category: 'Toplum', color: '#1d4ed8', icon: '📰',
    grammarExplain: `📌 HABER ÜSLUBU:
1. Haber cümleleri edilgen ve isimleşme yüklüdür: Принято решение о повышении цен.
2. Kaynak belirtme: как сообщает агентство… (ajansın bildirdiğine göre…)
3. Manşetlerde fiil sık atlanır: Президент — в Казани.`,
    words: [
      W('p100b2me_1', 'Новость', 'Nóvast', 'Haber', 'B2', 'Çoğulu новости = haber bülteni.'),
      W('p100b2me_2', 'Заголовок', 'Zagalóvak', 'Başlık / Manşet', 'B2', 'глава (baş) kökünden.'),
      W('p100b2me_3', 'Источник', 'İstóçnik', 'Kaynak', 'B2', 'Hem haber kaynağı hem su kaynağı.'),
      W('p100b2me_4', 'Достоверный', 'Dastavyérnıy', 'Güvenilir', 'B2', 'Достоверная информация = doğrulanmış bilgi.'),
      W('p100b2me_5', 'Слух', 'Sluh', 'Söylenti', 'B2', 'Aynı kelime "işitme" demektir.'),
      W('p100b2me_6', 'Освещать', 'Asvişşát', 'Haberini yapmak', 'B2', 'Kelime kelime "aydınlatmak".')
    ],
    sentences: [
      S('Как сообщает агентство, переговоры продолжаются.', 'Ajansın bildirdiğine göre görüşmeler sürüyor.'),
      S('Это непроверенный слух.', 'Bu doğrulanmamış bir söylenti.'),
      S('СМИ широко освещают это событие.', 'Medya bu olayı geniş biçimde haberleştiriyor.')
    ]
  },
  {
    id: 'p100_b2_law', unitNumber: 143.9616, levelGroup: 'B2',
    title: 'Hukuk ve Haklar', description: 'Sözleşme, dava, yükümlülük',
    category: 'Toplum', color: '#475569', icon: '⚖️',
    grammarExplain: `📌 HUKUK DİLİ:
1. Yükümlülük: обязан + mastar (yapmakla yükümlü), имеет право + mastar (hakkı vardır).
2. Yasaya atıf: согласно закону (yönelme hâli) / в соответствии с законом (araç hâli).
3. Edilgen kalıplar hâkimdir: Договор был расторгнут.`,
    words: [
      W('p100b2la_1', 'Закон', 'Zakón', 'Kanun', 'B2', 'Соблюдать закон = kanuna uymak.'),
      W('p100b2la_2', 'Договор', 'Dagavór', 'Sözleşme', 'B2', 'Vurgu sondadır; дОговор halk ağzı sayılır.'),
      W('p100b2la_3', 'Обязанность', 'Abyázannast', 'Yükümlülük', 'B2', 'Karşıtı право (hak).'),
      W('p100b2la_4', 'Иск', 'İsk', 'Dava', 'B2', 'Подать иск = dava açmak.'),
      W('p100b2la_5', 'Нарушение', 'Naruşéniye', 'İhlal', 'B2', 'нарушать fiilinden.'),
      W('p100b2la_6', 'Адвокат', 'Advakát', 'Avukat', 'B2', 'Savcı ise прокурор.')
    ],
    sentences: [
      S('Согласно закону, вы имеете право на защиту.', 'Kanuna göre savunma hakkınız var.'),
      S('Договор был расторгнут в прошлом месяце.', 'Sözleşme geçen ay feshedildi.'),
      S('Это серьёзное нарушение правил.', 'Bu kuralların ciddi bir ihlali.')
    ]
  },
  {
    id: 'p100_b2_economy', unitNumber: 143.9617, levelGroup: 'B2',
    title: 'Ekonomi ve Piyasa', description: 'Enflasyon, arz, talep',
    category: 'İş Hayatı', color: '#047857', icon: '📈',
    grammarExplain: `📌 EĞİLİM ANLATIMI:
1. Artış/azalış: вырасти на 5% (5 puan artmak) ↔ вырасти в 5 раз (5 katına çıkmak). на / в farkı kritiktir.
2. Kıyas: по сравнению с прошлым годом.
3. Neden: из-за (olumsuz sebep) ↔ благодаря (olumlu sebep).`,
    words: [
      W('p100b2ec_1', 'Инфляция', 'İnflyátsiya', 'Enflasyon', 'B2', 'Уровень инфляции = enflasyon oranı.'),
      W('p100b2ec_2', 'Спрос', 'Spros', 'Talep', 'B2', 'Спрос и предложение = arz ve talep.'),
      W('p100b2ec_3', 'Предложение', 'Pridlajéniye', 'Arz / Teklif / Cümle', 'B2', 'Üç anlamı bağlam ayırır.'),
      W('p100b2ec_4', 'Прибыль', 'Príbıl', 'Kâr', 'B2', 'Zarar ise убыток.'),
      W('p100b2ec_5', 'Налог', 'Nalók', 'Vergi', 'B2', 'Платить налоги = vergi ödemek.'),
      W('p100b2ec_6', 'Валюта', 'Valyúta', 'Döviz', 'B2', 'Курс валюты = döviz kuru.')
    ],
    sentences: [
      S('Цены выросли на десять процентов.', 'Fiyatlar yüzde on arttı.'),
      S('Спрос превышает предложение.', 'Talep arzı aşıyor.'),
      S('Компания получила хорошую прибыль.', 'Şirket iyi bir kâr elde etti.')
    ]
  },
  {
    id: 'p100_b2_science', unitNumber: 143.9618, levelGroup: 'B2',
    title: 'Bilim ve Teknoloji', description: 'Araştırma, veri, hipotez',
    category: 'Bilim', color: '#0284c7', icon: '🔬',
    grammarExplain: `📌 BİLİMSEL ÜSLUP:
1. Kişisiz yapı tercih edilir: Было установлено, что… (… olduğu saptandı.)
2. Sonuç: Таким образом, можно сделать вывод… (Böylece şu sonuca varılabilir…)
3. Bilim metinlerinde "мы" (bilimsel biz) kullanımı yaygındır: Мы рассмотрели…`,
    words: [
      W('p100b2sc_1', 'Исследование', 'İsslyédavaniye', 'Araştırma', 'B2', 'Провести исследование = araştırma yürütmek.'),
      W('p100b2sc_2', 'Гипотеза', 'Gipóteza', 'Hipotez', 'B2', 'Выдвинуть гипотезу = hipotez ileri sürmek.'),
      W('p100b2sc_3', 'Данные', 'Dánnıye', 'Veri', 'B2', 'Daima çoğuldur.'),
      W('p100b2sc_4', 'Вывод', 'Vívat', 'Sonuç / Çıkarım', 'B2', 'Сделать вывод = sonuca varmak.'),
      W('p100b2sc_5', 'Внедрение', 'Vnidryéniye', 'Uygulamaya geçirme', 'B2', 'Teknoloji transferinin anahtar sözcüğü.'),
      W('p100b2sc_6', 'Искусственный интеллект', 'İskústvinnıy intillyékt', 'Yapay zekâ', 'B2', 'Kısaltması ИИ.')
    ],
    sentences: [
      S('Было установлено, что метод работает.', 'Yöntemin işe yaradığı saptandı.'),
      S('Данные показывают положительную динамику.', 'Veriler olumlu bir eğilim gösteriyor.'),
      S('Внедрение новых технологий требует времени.', 'Yeni teknolojilerin uygulanması zaman ister.')
    ]
  },
  {
    id: 'p100_b2_debate', unitNumber: 143.9619, levelGroup: 'B2',
    title: 'Tartışma ve İkna', description: 'Görüşünü savun, karşı çık',
    category: 'Cümlede Anlam', color: '#be123c', icon: '🗨️',
    grammarExplain: `📌 ARGÜMAN KURMA:
1. Görüş: С одной стороны… с другой стороны… (Bir yandan… öte yandan…)
2. İtiraz: Позвольте не согласиться. (İzninizle katılmıyorum.) — en kibar karşı çıkış.
3. Kanıt: Это подтверждается тем, что…`,
    words: [
      W('p100b2de_1', 'Аргумент', 'Argumyént', 'Argüman', 'B2', 'Привести аргумент = argüman ileri sürmek.'),
      W('p100b2de_2', 'Возражение', 'Vazrajéniye', 'İtiraz', 'B2', 'Возражать = itiraz etmek.'),
      W('p100b2de_3', 'Подтверждать', 'Pattvirjdát', 'Doğrulamak', 'B2', 'Karşıtı опровергать (çürütmek).'),
      W('p100b2de_4', 'Убедительный', 'Ubidítilnıy', 'İkna edici', 'B2', 'Убедительный аргумент.'),
      W('p100b2de_5', 'Компромисс', 'Kampramíss', 'Uzlaşma', 'B2', 'Найти компромисс = orta yol bulmak.'),
      W('p100b2de_6', 'Точка зрения', 'Tóçka zryéniya', 'Bakış açısı', 'B2', 'С моей точки зрения = bence.')
    ],
    sentences: [
      S('Позвольте не согласиться с вами.', 'İzninizle size katılmıyorum.'),
      S('Ваш аргумент звучит убедительно.', 'Argümanınız ikna edici geliyor.'),
      S('Нам нужно найти компромисс.', 'Bir uzlaşma bulmamız gerekiyor.')
    ]
  },
  {
    id: 'p100_b2_worklife', unitNumber: 143.962, levelGroup: 'B2',
    title: 'Ofis Politikası ve İletişim', description: 'Toplantı, geri bildirim, çatışma',
    category: 'İş Hayatı', color: '#334155', icon: '🏢',
    grammarExplain: `📌 KURUMSAL NEZAKET:
1. Rica: Не могли бы вы…? (…-ir misiniz acaba?) en kibar biçimdir.
2. Geri bildirim yumuşatma: Мне кажется, здесь можно доработать.
3. E-posta kapanışı: С уважением, … (Saygılarımla, …)`,
    words: [
      W('p100b2wl_1', 'Совещание', 'Savişşániye', 'Toplantı', 'B2', 'встреча\'dan daha resmîdir.'),
      W('p100b2wl_2', 'Обратная связь', 'Abrátnaya svyas', 'Geri bildirim', 'B2', 'Teknik terimden iş diline geçmiştir.'),
      W('p100b2wl_3', 'Дедлайн', 'Dedláyn', 'Teslim tarihi', 'B2', 'Resmîsi срок сдачи.'),
      W('p100b2wl_4', 'Конфликт', 'Kanflíkt', 'Çatışma', 'B2', 'Уладить конфликт = anlaşmazlığı çözmek.'),
      W('p100b2wl_5', 'Согласовать', 'Saglasavát', 'Mutabık kalmak / Onaylatmak', 'B2', 'Bürokraside en sık fiillerdendir.'),
      W('p100b2wl_6', 'Ответственный', 'Atvyétstvinnıy', 'Sorumlu', 'B2', 'Ответственный за проект.')
    ],
    sentences: [
      S('Не могли бы вы согласовать это с руководством?', 'Bunu yönetimle mutabık kılabilir misiniz?'),
      S('Совещание перенесли на среду.', 'Toplantı çarşambaya ertelendi.'),
      S('Спасибо за обратную связь.', 'Geri bildiriminiz için teşekkürler.')
    ]
  }
];
