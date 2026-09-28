// ==========================================================
// 100 ÜNİTELİK BÜYÜK PAKET — BÖLÜM 5 / C1-C2 (20 ünite)
// unitNumber: 180.9601 – 180.9620 (C1 bölgesinin sonu)
// Akademik/bürokratik üslup + derin CÜMLEDE ANLAM + KÜLTÜR + DİN
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const PACK100_C1: UnitModule[] = [
  {
    id: 'p100_c1_academic', unitNumber: 180.9601, levelGroup: 'C1/C2',
    title: 'Akademik Üslup', description: 'Makale yaz, tez savun',
    category: 'Akademik Dil', color: '#1e3a8a', icon: '🎓',
    grammarExplain: `📌 НАУЧНЫЙ СТИЛЬ:
1. Kişisel özneden kaçınılır: Рассматривается вопрос… / Следует отметить, что…
2. Bağlaçlar yoğundur: тем не менее, следовательно, в связи с этим.
3. İsimleşme (номинализация) akademik metnin imzasıdır: проведение анализа = analiz yapılması.`,
    words: [
      W('p100c1ac_1', 'Следует отметить', 'Slyédut atmyétit', 'Belirtmek gerekir ki', 'C1/C2', 'Akademik metinlerin en sık geçiş kalıbı.'),
      W('p100c1ac_2', 'Тем не менее', 'Tyem ni myénye', 'Yine de', 'C1/C2', 'Karşıtlık bildiren resmî bağlaç.'),
      W('p100c1ac_3', 'Следовательно', 'Slyédavatilna', 'Dolayısıyla', 'C1/C2', 'Mantıksal sonuç bildirir.'),
      W('p100c1ac_4', 'Анализ', 'Análiz', 'Çözümleme', 'C1/C2', 'Провести анализ = analiz yapmak.'),
      W('p100c1ac_5', 'Обоснование', 'Abasnavániye', 'Gerekçelendirme', 'C1/C2', 'Tez savunmasının ana bölümü.'),
      W('p100c1ac_6', 'Апробация', 'Apraobátsiya', 'Sınama / Onaylanma', 'C1/C2', 'Rus akademisinde tez şartlarından biridir.')
    ],
    sentences: [
      S('Следует отметить, что данные противоречивы.', 'Belirtmek gerekir ki veriler çelişkilidir.'),
      S('Тем не менее вывод остаётся спорным.', 'Yine de sonuç tartışmalı kalmaktadır.'),
      S('В работе проведён подробный анализ.', 'Çalışmada ayrıntılı bir analiz yapılmıştır.')
    ]
  },
  {
    id: 'p100_c1_bureau', unitNumber: 180.9602, levelGroup: 'C1/C2',
    title: 'Bürokratik Dil', description: 'Dilekçe, resmî yazışma, kurum dili',
    category: 'Akademik Dil', color: '#475569', icon: '🗂️',
    grammarExplain: `📌 КАНЦЕЛЯРИТ:
1. Dilekçe kalıbı: Прошу предоставить… / Прошу рассмотреть возможность…
2. Edat öbekleri: в целях, в связи с, на основании, в соответствии с.
3. Bu üslup aşırı kullanıldığında eleştirilir; ama resmî belgelerde zorunludur.`,
    words: [
      W('p100c1bu_1', 'Заявление', 'Zayavlyéniye', 'Dilekçe / Beyan', 'C1/C2', 'Подать заявление = dilekçe vermek.'),
      W('p100c1bu_2', 'В связи с', 'F svizí s', '…-den dolayı', 'C1/C2', 'Araç hâli ister.'),
      W('p100c1bu_3', 'На основании', 'Na asnaváni', '…-e dayanarak', 'C1/C2', 'Tamlayan hâl ister.'),
      W('p100c1bu_4', 'Справка', 'Správka', 'Belge / Yazı', 'C1/C2', 'Rus bürokrasisinin simge kelimesi.'),
      W('p100c1bu_5', 'Предоставить', 'Pridastávit', 'Sağlamak / Vermek', 'C1/C2', 'Resmî dilde дать yerine kullanılır.'),
      W('p100c1bu_6', 'Надлежащий', 'Nadlijáşşiy', 'Gereken / Usulüne uygun', 'C1/C2', 'Ağır bürokratik sıfat.')
    ],
    sentences: [
      S('Прошу предоставить справку с места работы.', 'İş yerinden belge verilmesini rica ederim.'),
      S('В связи с изменением графика заседание перенесено.', 'Takvim değişikliği nedeniyle oturum ertelenmiştir.'),
      S('Документы оформлены надлежащим образом.', 'Belgeler usulüne uygun düzenlenmiştir.')
    ]
  },
  {
    id: 'p100_c1_nuance', unitNumber: 180.9603, levelGroup: 'C1/C2',
    title: 'Cümlede Anlam: Nüans Ayrımı', description: 'Yakın kelimeler arasındaki ince fark',
    category: 'Cümlede Anlam', color: '#c026d3', icon: '🔍',
    grammarExplain: `📌 ОТТЕНКИ ЗНАЧЕНИЯ:
1. ошибка (hata) / промах (gaf) / заблуждение (yanılgı) — aynı alan, farklı derinlik.
2. Fiil çiftleri: узнать (öğrenmek/tanımak) ≠ познать (idrak etmek).
3. C1 düzeyinde doğruluk değil YERİNDELİK ölçülür; sözlük anlamı değil kullanım alanı öğrenilir.`,
    words: [
      W('p100c1nu_1', 'Заблуждение', 'Zablujdyéniye', 'Yanılgı', 'C1/C2', 'Uzun süreli, sistemli hata.'),
      W('p100c1nu_2', 'Промах', 'Prómah', 'Gaf / Isıraksama', 'C1/C2', 'Tek seferlik dikkatsizlik.'),
      W('p100c1nu_3', 'Оттенок', 'Attyénak', 'Ton / Nüans', 'C1/C2', 'Hem renk hem anlam tonu için.'),
      W('p100c1nu_4', 'Тонкость', 'Tónkast', 'İncelik', 'C1/C2', 'Тонкости языка = dilin incelikleri.'),
      W('p100c1nu_5', 'Различать', 'Razliçát', 'Ayırt etmek', 'C1/C2', 'Различать оттенки значений.'),
      W('p100c1nu_6', 'Уместность', 'Umyésnast', 'Yerindelik', 'C1/C2', 'Üslup değerlendirmesinin ölçütü.')
    ],
    sentences: [
      S('Важно различать оттенки значений.', 'Anlam tonlarını ayırt etmek önemlidir.'),
      S('Это распространённое заблуждение.', 'Bu yaygın bir yanılgıdır.'),
      S('Здесь решает не точность, а уместность.', 'Burada belirleyici olan doğruluk değil, yerindeliktir.')
    ]
  },
  {
    id: 'p100_c1_archaic', unitNumber: 180.9604, levelGroup: 'C1/C2',
    title: 'Cümlede Anlam: Yüksek Üslup', description: 'Arkaizmler ve şiirsel dil',
    category: 'Cümlede Anlam', color: '#7e22ce', icon: '📜',
    grammarExplain: `📌 ВЫСОКИЙ СТИЛЬ:
1. Kilise Slavcası kökenli ikizler: глаза / очи, губы / уста, город / град.
2. Yüksek üslup sözcükleri bugün şiirde, hitabette ya da ironide kullanılır.
3. Ünlü kısalma farkı: голова (Rusça) ↔ глава (Slavca) — ikincisi "bölüm/başkan" anlamına kaymıştır.`,
    words: [
      W('p100c1ar_1', 'Очи', 'Óçi', 'Gözler (şiirsel)', 'C1/C2', 'глаза\'nın yüksek üslup karşılığı.'),
      W('p100c1ar_2', 'Уста', 'Ustá', 'Dudaklar / Ağız (şiirsel)', 'C1/C2', 'Из уст в уста = ağızdan ağıza.'),
      W('p100c1ar_3', 'Град', 'Grat', 'Şehir (şiirsel)', 'C1/C2', 'Петроград, Волгоград adlarında yaşar.'),
      W('p100c1ar_4', 'Ныне', 'Níni', 'Şimdi (kitabî)', 'C1/C2', 'сейчас\'ın arkaik biçimi.'),
      W('p100c1ar_5', 'Дабы', 'Dábı', '…-sın diye (arkaik)', 'C1/C2', 'чтобы\'nin eski karşılığı; bugün ironiktir.'),
      W('p100c1ar_6', 'Архаизм', 'Arhaízm', 'Arkaizm', 'C1/C2', 'Karşıtı неологизм.')
    ],
    sentences: [
      S('Эти слова передаются из уст в уста.', 'Bu sözler ağızdan ağıza aktarılıyor.'),
      S('Ныне такие формы звучат архаично.', 'Bugün böyle biçimler arkaik duruyor.'),
      S('Поэт использует высокий стиль.', 'Şair yüksek üslubu kullanıyor.')
    ]
  },
  {
    id: 'p100_c1_litmeta', unitNumber: 180.9605, levelGroup: 'C1/C2',
    title: 'Cümlede Anlam: Edebî Çözümleme', description: 'İmge, sembol, motif',
    category: 'Cümlede Anlam', color: '#831843', icon: '🕯️',
    grammarExplain: `📌 ЛИТЕРАТУРОВЕДЧЕСКИЙ АНАЛИЗ:
1. Çözümleme kalıpları: Автор прибегает к метафоре… / Образ … символизирует…
2. Alıntı: как пишет автор, «…»
3. Yorum yumuşatma: можно предположить, что… (…-diği düşünülebilir).`,
    words: [
      W('p100c1lm_1', 'Образ', 'Óbras', 'İmge / Tip', 'C1/C2', 'Edebiyat eleştirisinin merkez terimi.'),
      W('p100c1lm_2', 'Метафора', 'Mitáfara', 'Metafor', 'C1/C2', 'Karşılaştırma yapılmadan kurulan benzetme.'),
      W('p100c1lm_3', 'Символ', 'Símval', 'Sembol', 'C1/C2', 'Rus sembolizmi ayrı bir akımdır.'),
      W('p100c1lm_4', 'Мотив', 'Matíf', 'Motif / İzlek', 'C1/C2', 'Yinelenen anlam birimi.'),
      W('p100c1lm_5', 'Прибегать к', 'Pribigát k', '…-e başvurmak', 'C1/C2', 'Yönelme hâli ister.'),
      W('p100c1lm_6', 'Трактовка', 'Traktófka', 'Yorum', 'C1/C2', 'Разные трактовки текста.')
    ],
    sentences: [
      S('Автор прибегает к развёрнутой метафоре.', 'Yazar genişletilmiş bir metafora başvuruyor.'),
      S('Образ дороги символизирует судьбу.', 'Yol imgesi kaderi simgeliyor.'),
      S('Возможны разные трактовки финала.', 'Finalin farklı yorumları mümkündür.')
    ]
  },
  {
    id: 'p100_c1_humour', unitNumber: 180.9606, levelGroup: 'C1/C2',
    title: 'Cümlede Anlam: Mizah ve Kelime Oyunu', description: 'Anekdot ve söz cambazlığı',
    category: 'Cümlede Anlam', color: '#ea580c', icon: '🃏',
    grammarExplain: `📌 ЯЗЫКОВАЯ ИГРА:
1. Kelime oyunu çoğunlukla çok anlamlılık ve eş seslilik üzerine kurulur.
2. Rus anekdotu (анекдот) sözlü bir tür olup ani "punchline" ile biter.
3. Mizahı anlamak C2 göstergesidir: kültürel arka plan olmadan şaka çevrilemez.`,
    words: [
      W('p100c1hu_1', 'Анекдот', 'Anikdót', 'Fıkra', 'C1/C2', 'Türkçedeki "anekdot"tan farklıdır: şaka demektir.'),
      W('p100c1hu_2', 'Каламбур', 'Kalambúr', 'Kelime oyunu', 'C1/C2', 'Fransızcadan gelir.'),
      W('p100c1hu_3', 'Остроумие', 'Astraúmiye', 'Nüktedanlık', 'C1/C2', '"Keskin akıl" bileşiği.'),
      W('p100c1hu_4', 'Подколоть', 'Patkalót', 'Takılmak / Sataşmak', 'C1/C2', 'Dostça iğneleme.'),
      W('p100c1hu_5', 'Сарказм', 'Sarkázm', 'Alaycılık', 'C1/C2', 'İroninin sert biçimi.'),
      W('p100c1hu_6', 'Переносное значение', 'Pirinósnaye znaçéniye', 'Mecazi anlam', 'C1/C2', 'Kelime oyunlarının kaynağı.')
    ],
    sentences: [
      S('Он мастер тонкого каламбура.', 'İnce kelime oyunlarının ustasıdır.'),
      S('Это была дружеская подколка, не более.', 'Bu dostça bir takılmaydı, fazlası değil.'),
      S('В его словах чувствуется сарказм.', 'Sözlerinde alay seziliyor.')
    ]
  },
  {
    id: 'p100_c1_philosophy', unitNumber: 180.9607, levelGroup: 'C1/C2',
    title: 'Kültür: Rus Düşüncesi', description: 'Batıcılar, Slavcılar, Rus fikri',
    category: 'Kültür', color: '#0f172a', icon: '🧭',
    grammarExplain: `📌 FİKİR TARİHİ DİLİ:
1. Akım adları -ство / -изм ile: славянофильство, западничество, евразийство.
2. Tartışma kalıbı: спор между … и … (… ile … arasındaki tartışma).
3. Karşıtlık: в противовес (…-e karşılık), yönelme hâli ister.`,
    words: [
      W('p100c1ph_1', 'Западники', 'Západniki', 'Batıcılar', 'C1/C2', '19. yüzyıl düşünce akımı.'),
      W('p100c1ph_2', 'Славянофилы', 'Slavyanafílı', 'Slavcılar', 'C1/C2', 'Batıcıların karşı kutbu.'),
      W('p100c1ph_3', 'Мировоззрение', 'Miravazzryéniye', 'Dünya görüşü', 'C1/C2', 'Üç kökten oluşan uzun bileşik.'),
      W('p100c1ph_4', 'Самобытность', 'Samabıtnast', 'Özgünlük / Kendine özgülük', 'C1/C2', 'Slavcı söylemin anahtar kavramı.'),
      W('p100c1ph_5', 'Противоречие', 'Prativaryéçiye', 'Çelişki', 'C1/C2', 'Diyalektik tartışmanın temel terimi.'),
      W('p100c1ph_6', 'Осмысление', 'Asmıslyéniye', 'Anlamlandırma', 'C1/C2', 'Философское осмысление истории.')
    ],
    sentences: [
      S('Спор западников и славянофилов не окончен.', 'Batıcılarla Slavcıların tartışması bitmiş değil.'),
      S('Это вопрос мировоззрения.', 'Bu bir dünya görüşü meselesidir.'),
      S('В его позиции есть внутреннее противоречие.', 'Tutumunda içsel bir çelişki var.')
    ]
  },
  {
    id: 'p100_c1_poetry', unitNumber: 180.9608, levelGroup: 'C1/C2',
    title: 'Kültür: Şiir ve Puşkin Dili', description: 'Vezin, kafiye, şiirsel sözdizim',
    category: 'Kültür', color: '#6d28d9', icon: '🪶',
    grammarExplain: `📌 ŞİİR DİLİ:
1. Şiirde kelime sırası serbesttir (инверсия): Гляжу я в окна… düz yazıda Я гляжу в окна olurdu.
2. Vezin terimleri: ямб, хорей; Puşkin çoğunlukla dört ayaklı iamb kullanır.
3. Şiir ezberi (наизусть) Rus eğitim geleneğinin merkezindedir.`,
    words: [
      W('p100c1po_1', 'Поэзия', 'Paéziya', 'Şiir (sanatı)', 'C1/C2', 'Tek şiir ise стихотворение.'),
      W('p100c1po_2', 'Рифма', 'Rífma', 'Kafiye', 'C1/C2', 'Рифмовать = kafiyelendirmek.'),
      W('p100c1po_3', 'Размер', 'Razmyér', 'Vezin / Ölçü', 'C1/C2', 'Aynı kelime "boyut/beden" demektir.'),
      W('p100c1po_4', 'Инверсия', 'İnvyérsiya', 'Devrik söz dizimi', 'C1/C2', 'Şiirsel etkinin başlıca aracı.'),
      W('p100c1po_5', 'Наизусть', 'Naizúst', 'Ezbere', 'C1/C2', 'Учить наизусть = ezberlemek.'),
      W('p100c1po_6', 'Строфа', 'Strafá', 'Kıta', 'C1/C2', 'Онегинская строфа Puşkin\'in icadıdır.')
    ],
    sentences: [
      S('Он знает эту поэму наизусть.', 'Bu şiiri ezbere biliyor.'),
      S('Инверсия усиливает поэтический эффект.', 'Devrik dizim şiirsel etkiyi güçlendirir.'),
      S('Пушкин создал особую строфу.', 'Puşkin özel bir kıta biçimi yarattı.')
    ]
  },
  {
    id: 'p100_c1_identity', unitNumber: 180.9609, levelGroup: 'C1/C2',
    title: 'Kültür: Kimlik ve Toplum', description: 'Ulus, hafıza, aidiyet tartışmaları',
    category: 'Kültür', color: '#0c4a6e', icon: '🧩',
    grammarExplain: `📌 HASSAS KONULARDA DİL:
1. Yumuşatıcılar zorunludur: пожалуй, скорее всего, в известной степени.
2. Genelleme kaçınması: часть общества считает… (toplumun bir kesimi …).
3. Kutuplaşmış konularda "мы/они" karşıtlığından kaçınmak üslup olgunluğudur.`,
    words: [
      W('p100c1id_1', 'Идентичность', 'İdintíçnast', 'Kimlik', 'C1/C2', 'Sosyal bilimler terimi.'),
      W('p100c1id_2', 'Принадлежность', 'Prinadlyéjnast', 'Aidiyet', 'C1/C2', 'Yönelme hâliyle: принадлежность к группе.'),
      W('p100c1id_3', 'Память', 'Pámit', 'Hafıza', 'C1/C2', 'Историческая память = tarihsel hafıza.'),
      W('p100c1id_4', 'Поколение', 'Pakalyéniye', 'Kuşak', 'C1/C2', 'Разрыв поколений = kuşak çatışması.'),
      W('p100c1id_5', 'В известной степени', 'V izvyésnay stypini', 'Bir ölçüde', 'C1/C2', 'Akademik yumuşatıcı.'),
      W('p100c1id_6', 'Обобщение', 'Abapşşéniye', 'Genelleme', 'C1/C2', 'Избегать обобщений = genellemeden kaçınmak.')
    ],
    sentences: [
      S('Историческая память формирует идентичность.', 'Tarihsel hafıza kimliği biçimlendirir.'),
      S('В известной степени это верно.', 'Bir ölçüde bu doğrudur.'),
      S('Следует избегать поспешных обобщений.', 'Aceleci genellemelerden kaçınmak gerekir.')
    ]
  },
  {
    id: 'p100_c1_tradition', unitNumber: 180.961, levelGroup: 'C1/C2',
    title: 'Kültür: Gelenek ve Modernlik', description: 'Değişen toplumda süreklilik',
    category: 'Kültür', color: '#a16207', icon: '⏳',
    grammarExplain: `📌 SÜREÇ ANLATIMI:
1. Değişim fiilleri: сохраняться (korunmak), утрачиваться (yitirilmek), трансформироваться.
2. Zaman zarfları: постепенно, всё чаще, по мере того как…
3. Karşılaştırmalı yapı: если раньше…, то сегодня… (eskiden … iken bugün …).`,
    words: [
      W('p100c1tr_1', 'Преемственность', 'Priyémstvinnast', 'Süreklilik / Devralma', 'C1/C2', 'Kuşaklar arası aktarım.'),
      W('p100c1tr_2', 'Утрачивать', 'Utráçivat', 'Yitirmek', 'C1/C2', 'терять\'ın kitabî eşdeğeri.'),
      W('p100c1tr_3', 'Возрождение', 'Vazrajdyéniye', 'Yeniden doğuş', 'C1/C2', 'Rönesans anlamı da vardır.'),
      W('p100c1tr_4', 'Уклад', 'Uklát', 'Yaşam düzeni', 'C1/C2', 'Традиционный уклад жизни.'),
      W('p100c1tr_5', 'Постепенно', 'Pastipyénna', 'Yavaş yavaş', 'C1/C2', 'Süreç anlatımının anahtar zarfı.'),
      W('p100c1tr_6', 'Переосмысление', 'Piriasmıslyéniye', 'Yeniden yorumlama', 'C1/C2', 'Kültür tartışmalarının sık terimi.')
    ],
    sentences: [
      S('Если раньше это было нормой, то сегодня всё иначе.', 'Eskiden bu bir normken bugün her şey farklı.'),
      S('Традиционный уклад постепенно утрачивается.', 'Geleneksel yaşam düzeni yavaş yavaş yitiriliyor.'),
      S('Мы наблюдаем возрождение интереса к ремёслам.', 'Zanaatlara ilginin yeniden canlandığını görüyoruz.')
    ]
  },
  {
    id: 'p100_c1_theology', unitNumber: 180.9611, levelGroup: 'C1/C2',
    title: 'Din: Teoloji Terminolojisi', description: 'İlahiyat metinlerinin dili',
    category: 'Din ve Maneviyat', color: '#ca8a04', icon: '✝️',
    grammarExplain: `📌 БОГОСЛОВСКИЙ ЯЗЫК:
1. Bileşik terimler Слав. köklerle kurulur: богословие (ilahiyat), богослужение (ibadet).
2. Soyut ekler: -ство, -ение yoğundur: воплощение, спасение.
3. Metinlerde eski çekimler korunur: во имя Отца… (in nomine kalıbının çevirisi).`,
    words: [
      W('p100c1tg_1', 'Богословие', 'Bagaslóviye', 'İlahiyat', 'C1/C2', '"Tanrı sözü" bileşiği.'),
      W('p100c1tg_2', 'Богослужение', 'Bagaslujéniye', 'İbadet / Ayin', 'C1/C2', 'Resmî ve teknik terim.'),
      W('p100c1tg_3', 'Спасение', 'Spasyéniye', 'Kurtuluş', 'C1/C2', 'Спасибо kelimesiyle aynı kökten.'),
      W('p100c1tg_4', 'Откровение', 'Atkravyéniye', 'Vahiy', 'C1/C2', 'Kitab-ı Mukaddes\'in son kitabının adı da budur.'),
      W('p100c1tg_5', 'Догмат', 'Dógmat', 'Dogma / İnanç esası', 'C1/C2', 'Vurgu ilk hecededir.'),
      W('p100c1tg_6', 'Аскеза', 'Askyéza', 'Çilecilik', 'C1/C2', 'Manastır geleneğinin merkezinde.')
    ],
    sentences: [
      S('Богословие изучается в духовных академиях.', 'İlahiyat, ruhban akademilerinde okutulur.'),
      S('Этот догмат был принят на соборе.', 'Bu inanç esası konsilde kabul edildi.'),
      S('Аскеза понимается как путь к духовной свободе.', 'Çilecilik, manevi özgürlüğe giden yol olarak anlaşılır.')
    ]
  },
  {
    id: 'p100_c1_slavonic', unitNumber: 180.9612, levelGroup: 'C1/C2',
    title: 'Din: Kilise Slavcası İzleri', description: 'Modern Rusçadaki eski katman',
    category: 'Din ve Maneviyat', color: '#78350f', icon: '🔤',
    grammarExplain: `📌 СЛАВЯНИЗМЫ:
1. Ses ikizleri: -оро-/-ра- (город/град), -оло-/-ла- (голова/глава), -ере-/-ре- (берег/брег).
2. Slavca biçim daha SOYUT ve YÜKSEK anlam taşır: страна (ülke) / сторона (yan).
3. Bu katmanı tanımak, Rusça kelime dağarcığını iki katına çıkarır.`,
    words: [
      W('p100c1sl_1', 'Глава', 'Glavá', 'Bölüm / Baş(kan)', 'C1/C2', 'голова\'nın Slavca ikizi, soyutlaşmıştır.'),
      W('p100c1sl_2', 'Страна', 'Straná', 'Ülke', 'C1/C2', 'сторона (yan/taraf) ile aynı kökten.'),
      W('p100c1sl_3', 'Храбрый', 'Hrábrıy', 'Yiğit', 'C1/C2', 'хоробрый halk biçiminden Slavca ikizi.'),
      W('p100c1sl_4', 'Нрав', 'Nraf', 'Huy / Mizaç', 'C1/C2', 'норов halk biçiminin yüksek eşdeğeri.'),
      W('p100c1sl_5', 'Церковнославянский', 'Tsirkavnaslavyánskiy', 'Kilise Slavcası', 'C1/C2', 'Ayin dili olarak hâlâ kullanılır.'),
      W('p100c1sl_6', 'Заимствование', 'Zaímstvavaniye', 'Ödünçleme', 'C1/C2', 'Dilbilim terimi.')
    ],
    sentences: [
      S('Многие книжные слова пришли из церковнославянского.', 'Pek çok kitabî sözcük Kilise Slavcasından gelmiştir.'),
      S('Пары «город — град» показывают этот процесс.', '"Gorod — grad" çiftleri bu süreci gösterir.'),
      S('Заимствования обогащают язык.', 'Ödünçlemeler dili zenginleştirir.')
    ]
  },
  {
    id: 'p100_c1_religions', unitNumber: 180.9613, levelGroup: 'C1/C2',
    title: 'Din: Rusya\'da Dinler Tarihi', description: 'Paganlıktan çokdinliliğe',
    category: 'Din ve Maneviyat', color: '#15803d', icon: '🏺',
    grammarExplain: `📌 TARİHSEL SÜREÇ ANLATIMI:
1. Dönemleme: до принятия христианства, в синодальный период, в советскую эпоху.
2. Edilgen ve kişisiz yapı hâkimdir: Церкви были закрыты.
3. Nesnellik dili: принято считать, что… (… olduğu kabul edilir).`,
    words: [
      W('p100c1rg_1', 'Язычество', 'Yizıçistva', 'Paganlık', 'C1/C2', 'Hristiyanlık öncesi Slav inancı.'),
      W('p100c1rg_2', 'Конфессия', 'Kanfyéssiya', 'Mezhep / İnanç topluluğu', 'C1/C2', 'Resmî belgelerde kullanılır.'),
      W('p100c1rg_3', 'Веротерпимость', 'Vyerativrpímast', 'Dinî hoşgörü', 'C1/C2', 'İmparatorluk dönemi politik terimi.'),
      W('p100c1rg_4', 'Гонения', 'Ganyéniya', 'Zulüm / Baskı', 'C1/C2', 'Sovyet dönemi din politikası bağlamında.'),
      W('p100c1rg_5', 'Секуляризация', 'Sikulyarizátsiya', 'Sekülerleşme', 'C1/C2', 'Sosyolojik terim.'),
      W('p100c1rg_6', 'Возрождение веры', 'Vazrajdyéniye vyérı', 'İnancın yeniden canlanması', 'C1/C2', '1990\'ları anlatan sabit ifade.')
    ],
    sentences: [
      S('Принято считать, что христианство пришло в 988 году.', 'Hristiyanlığın 988\'de geldiği kabul edilir.'),
      S('В советскую эпоху церкви были закрыты.', 'Sovyet döneminde kiliseler kapatıldı.'),
      S('Сегодня в стране действует множество конфессий.', 'Bugün ülkede pek çok inanç topluluğu faaliyet gösteriyor.')
    ]
  },
  {
    id: 'p100_c1_ethics', unitNumber: 180.9614, levelGroup: 'C1/C2',
    title: 'Din: Maneviyat ve Etik', description: 'Ahlak tartışmasının sözlüğü',
    category: 'Din ve Maneviyat', color: '#0d9488', icon: '🫱',
    grammarExplain: `📌 AHLAKİ MUHAKEME:
1. Zorunluluk dereceleri: следует (gerekir) < должен (zorunda) < обязан (yükümlü).
2. Değer yargısı yumuşatma: с этической точки зрения (etik açıdan).
3. İkilem kurma: с одной стороны — с другой стороны.`,
    words: [
      W('p100c1et_1', 'Нравственность', 'Nrávstvinnast', 'Ahlak', 'C1/C2', 'мораль\'den daha içsel bir kavram sayılır.'),
      W('p100c1et_2', 'Долг', 'Dolk', 'Ödev / Borç', 'C1/C2', 'Hem ahlaki ödev hem parasal borç.'),
      W('p100c1et_3', 'Сострадание', 'Sastradániye', 'Şefkat', 'C1/C2', '"Birlikte acı çekmek" bileşiği.'),
      W('p100c1et_4', 'Дилемма', 'Dilyémma', 'İkilem', 'C1/C2', 'Нравственная дилемма.'),
      W('p100c1et_5', 'Оправдание', 'Apravdániye', 'Mazeret / Haklı çıkarma', 'C1/C2', 'Hukukta "beraat" anlamı da vardır.'),
      W('p100c1et_6', 'Бескорыстие', 'Biskarístiye', 'Çıkarsızlık', 'C1/C2', 'Yüksek ahlaki erdem olarak anılır.')
    ],
    sentences: [
      S('Это классическая нравственная дилемма.', 'Bu klasik bir ahlaki ikilemdir.'),
      S('С этической точки зрения решение спорно.', 'Etik açıdan karar tartışmalıdır.'),
      S('Сострадание не требует оправданий.', 'Şefkatin gerekçeye ihtiyacı yoktur.')
    ]
  },
  {
    id: 'p100_c1_diplomacy', unitNumber: 180.9615, levelGroup: 'C1/C2',
    title: 'Diplomatik Dil', description: 'Nazikçe reddetmenin sanatı',
    category: 'İş Hayatı', color: '#1e40af', icon: '🕴️',
    grammarExplain: `📌 ДИПЛОМАТИЧЕСКИЙ ЯЗЫК:
1. Dolaylılık esastır: Мы вынуждены констатировать… (… saptamak durumundayız.)
2. Kaygı dereceleri: обеспокоены < серьёзно обеспокоены < глубоко обеспокоены.
3. Zımni ret: Мы примем это к сведению. (Bunu dikkate alacağız.) — çoğu zaman "hayır" demektir.`,
    words: [
      W('p100c1di_1', 'Переговоры', 'Pirigavórı', 'Müzakereler', 'C1/C2', 'Daima çoğuldur.'),
      W('p100c1di_2', 'Обеспокоенность', 'Abispakóyinnast', 'Kaygı', 'C1/C2', 'Выразить обеспокоенность = kaygı dile getirmek.'),
      W('p100c1di_3', 'Принять к сведению', 'Prinyát k svyédiniyu', 'Bilgi olarak almak', 'C1/C2', 'Kibar geçiştirme kalıbı.'),
      W('p100c1di_4', 'Взаимность', 'Vzaímnast', 'Karşılıklılık', 'C1/C2', 'Diplomasinin temel ilkesi.'),
      W('p100c1di_5', 'Урегулирование', 'Urigulíravaniye', 'Çözüm süreci', 'C1/C2', 'Мирное урегулирование = barışçıl çözüm.'),
      W('p100c1di_6', 'Сдержанно', 'Sdyérjanna', 'Ölçülü biçimde', 'C1/C2', 'Diplomatik üslubun zarfı.')
    ],
    sentences: [
      S('Стороны выразили серьёзную обеспокоенность.', 'Taraflar ciddi kaygı dile getirdi.'),
      S('Мы примем ваше предложение к сведению.', 'Teklifinizi bilgi olarak alacağız.'),
      S('Переговоры прошли в сдержанном тоне.', 'Görüşmeler ölçülü bir tonda geçti.')
    ]
  },
  {
    id: 'p100_c1_psychology', unitNumber: 180.9616, levelGroup: 'C1/C2',
    title: 'Psikoloji Dili', description: 'İç dünyayı hassasiyetle anlatmak',
    category: 'Bilim', color: '#9333ea', icon: '🧘',
    grammarExplain: `📌 PSİKOLOJİK SÖYLEM:
1. "Ben dili": Я чувствую, что… suçlamayı azaltır.
2. Süreç fiilleri -ся ile: справляться (baş etmek), восстанавливаться (toparlanmak).
3. Terapi dilinde yumuşatma zorunludur: возможно, вам стоит…`,
    words: [
      W('p100c1ps_1', 'Тревога', 'Trivóga', 'Kaygı / Anksiyete', 'C1/C2', 'Klinik terim olarak da kullanılır.'),
      W('p100c1ps_2', 'Выгорание', 'Vıgarániye', 'Tükenmişlik', 'C1/C2', 'Профессиональное выгорание.'),
      W('p100c1ps_3', 'Справляться', 'Spravlyátsa', 'Baş etmek', 'C1/C2', 'Araç hâli ister: справляться со стрессом.'),
      W('p100c1ps_4', 'Осознанность', 'Asaznánnast', 'Farkındalık', 'C1/C2', 'Mindfulness karşılığı.'),
      W('p100c1ps_5', 'Границы', 'Granítsı', 'Sınırlar', 'C1/C2', 'Личные границы = kişisel sınırlar.'),
      W('p100c1ps_6', 'Поддержка', 'Paddyérjka', 'Destek', 'C1/C2', 'Оказать поддержку = destek olmak.')
    ],
    sentences: [
      S('Он с трудом справляется со стрессом.', 'Stresle güçlükle baş ediyor.'),
      S('Важно уважать личные границы.', 'Kişisel sınırlara saygı önemlidir.'),
      S('Профессиональное выгорание — частая проблема.', 'Mesleki tükenmişlik sık görülen bir sorundur.')
    ]
  },
  {
    id: 'p100_c1_critique', unitNumber: 180.9617, levelGroup: 'C1/C2',
    title: 'Eleştiri Yazısı', description: 'Değerlendir, gerekçelendir, yargıla',
    category: 'Akademik Dil', color: '#be123c', icon: '✍️',
    grammarExplain: `📌 РЕЦЕНЗИЯ YAPISI:
1. Giriş: Работа посвящена… (Çalışma …-e ayrılmıştır.)
2. Olumlu: Несомненным достоинством является…
3. Eleştiri yumuşatma: В качестве замечания можно отметить…`,
    words: [
      W('p100c1cr_1', 'Рецензия', 'Ritsénziya', 'Eleştiri yazısı', 'C1/C2', 'Akademide zorunlu bir tür.'),
      W('p100c1cr_2', 'Достоинство', 'Dastóinstva', 'Meziyet', 'C1/C2', 'Karşıtı недостаток.'),
      W('p100c1cr_3', 'Замечание', 'Zamiçániye', 'Eleştirel not', 'C1/C2', 'Kibar eleştirinin adı.'),
      W('p100c1cr_4', 'Посвящена', 'Pasvişşiná', '…-e ayrılmış', 'C1/C2', 'Kısa edilgen ortaç biçimi.'),
      W('p100c1cr_5', 'Убедительно', 'Ubidítilna', 'İkna edici biçimde', 'C1/C2', 'Автор убедительно доказывает…'),
      W('p100c1cr_6', 'Спорный', 'Spórnıy', 'Tartışmalı', 'C1/C2', 'Спорный тезис.')
    ],
    sentences: [
      S('Работа посвящена анализу современной прозы.', 'Çalışma çağdaş düzyazının analizine ayrılmıştır.'),
      S('Несомненным достоинством является ясность изложения.', 'Şüphesiz bir meziyeti anlatımın açıklığıdır.'),
      S('В качестве замечания можно отметить слабую аргументацию.', 'Eleştiri olarak zayıf argümantasyon belirtilebilir.')
    ]
  },
  {
    id: 'p100_c1_history', unitNumber: 180.9618, levelGroup: 'C1/C2',
    title: 'Tarih Yazımı', description: 'Kaynak, yorum, dönemleme',
    category: 'Akademik Dil', color: '#92400e', icon: '🏺',
    grammarExplain: `📌 ИСТОРИОГРАФИЯ:
1. Yüzyıl: в XIX веке (в девятнадцатом веке) — Roma rakamı yazılır, Rusça okunur.
2. Kaynak dili: согласно летописи (vakayinameye göre).
3. Yorum belirtme: по мнению историков, … (tarihçilere göre …).`,
    words: [
      W('p100c1hi_1', 'Летопись', 'Lyétapis', 'Vakayiname', 'C1/C2', '"Yıl yazımı" bileşiği.'),
      W('p100c1hi_2', 'Источниковедение', 'İstóçnikavyédiniye', 'Kaynak bilimi', 'C1/C2', 'Tarih biliminin alt dalı.'),
      W('p100c1hi_3', 'Эпоха', 'Epóha', 'Çağ / Dönem', 'C1/C2', 'период daha dar bir zamanı anlatır.'),
      W('p100c1hi_4', 'Наследие', 'Naslyédiye', 'Miras', 'C1/C2', 'Культурное наследие = kültürel miras.'),
      W('p100c1hi_5', 'Достоверность', 'Dastavyérnast', 'Güvenilirlik', 'C1/C2', 'Kaynak eleştirisinin ölçütü.'),
      W('p100c1hi_6', 'Интерпретация', 'İntirpritátsiya', 'Yorum', 'C1/C2', 'трактовка ile yakın anlamlı.')
    ],
    sentences: [
      S('Согласно летописи, город был основан в XII веке.', 'Vakayinameye göre şehir 12. yüzyılda kurulmuştur.'),
      S('Достоверность источника вызывает сомнения.', 'Kaynağın güvenilirliği şüphe uyandırıyor.'),
      S('По мнению историков, интерпретация устарела.', 'Tarihçilere göre bu yorum eskimiştir.')
    ]
  },
  {
    id: 'p100_c1_rhetoric', unitNumber: 180.9619, levelGroup: 'C1/C2',
    title: 'Retorik ve Hitabet', description: 'Topluluk önünde etkili konuşma',
    category: 'İş Hayatı', color: '#b45309', icon: '🎙️',
    grammarExplain: `📌 РИТОРИЧЕСКИЕ ПРИЁМЫ:
1. Retorik soru: Разве это справедливо? — cevap beklemez, etki yaratır.
2. Üçleme (триада): быстро, чётко, эффективно.
3. Hitap: Уважаемые коллеги! resmî konuşmanın standart açılışıdır.`,
    words: [
      W('p100c1rt_1', 'Риторика', 'Ritórika', 'Retorik', 'C1/C2', 'Hem sanat hem olumsuz anlamda "laf kalabalığı".'),
      W('p100c1rt_2', 'Выступление', 'Vıstuplyéniye', 'Konuşma / Sunum', 'C1/C2', 'Выступать с докладом = bildiri sunmak.'),
      W('p100c1rt_3', 'Аудитория', 'Auditóriya', 'Dinleyici kitlesi', 'C1/C2', 'Hem salon hem izleyici demektir.'),
      W('p100c1rt_4', 'Пафос', 'Páfas', 'Coşku / Yüce ton', 'C1/C2', 'Aşırısı olumsuz değerlendirilir.'),
      W('p100c1rt_5', 'Тезис', 'Tézis', 'Tez / Ana savı', 'C1/C2', 'Çoğulu тезисы = bildiri özeti.'),
      W('p100c1rt_6', 'Убеждать', 'Ubijdát', 'İkna etmek', 'C1/C2', 'Tamamlanmışı убедить.')
    ],
    sentences: [
      S('Уважаемые коллеги, позвольте изложить основной тезис.', 'Değerli meslektaşlar, ana tezi sunmama izin verin.'),
      S('Разве это справедливо?', 'Bu adil mi peki?'),
      S('Оратор сумел убедить аудиторию.', 'Konuşmacı dinleyicileri ikna etmeyi başardı.')
    ]
  },
  {
    id: 'p100_c1_translation', unitNumber: 180.962, levelGroup: 'C1/C2',
    title: 'Çeviri Sanatı', description: 'Rusça–Türkçe aktarımın tuzakları',
    category: 'Cümlede Anlam', color: '#0f766e', icon: '🔁',
    grammarExplain: `📌 ÇEVİRİ STRATEJİLERİ:
1. Birebir çeviri (калька) çoğu zaman yanlış sonuç verir: Как дела? ≠ "İşler nasıl?"
2. Rusçanın hâl sistemi Türkçenin ekleriyle örtüşmez; önce CÜMLE İŞLEVİ belirlenir.
3. Fiil görünüşü Türkçede zaman/kip seçimiyle karşılanır: Я читал (okuyordum) / Я прочитал (okudum).`,
    words: [
      W('p100c1tl_1', 'Перевод', 'Pirivót', 'Çeviri', 'C1/C2', 'Aynı kelime "havale" ve "geçiş" demektir.'),
      W('p100c1tl_2', 'Дословный', 'Daslóvnıy', 'Birebir / Sözcüğü sözcüğüne', 'C1/C2', 'Karşıtı вольный (serbest).'),
      W('p100c1tl_3', 'Эквивалент', 'Ekvivalyént', 'Eşdeğer', 'C1/C2', 'Deyim çevirisinin anahtar kavramı.'),
      W('p100c1tl_4', 'Калька', 'Kálka', 'Öykünme çeviri', 'C1/C2', 'Kaynak dilin yapısının kopyalanması.'),
      W('p100c1tl_5', 'Адаптация', 'Adaptátsiya', 'Uyarlama', 'C1/C2', 'Kültürel ögelerin dönüştürülmesi.'),
      W('p100c1tl_6', 'Передать смысл', 'Piridát smısl', 'Anlamı aktarmak', 'C1/C2', 'İyi çevirinin ölçütü.')
    ],
    sentences: [
      S('Дословный перевод здесь невозможен.', 'Burada birebir çeviri mümkün değil.'),
      S('Переводчик должен передать смысл, а не слова.', 'Çevirmen kelimeleri değil anlamı aktarmalıdır.'),
      S('Для этой идиомы есть турецкий эквивалент.', 'Bu deyimin Türkçe bir eşdeğeri var.')
    ]
  }
];
