import type { UnitModule } from '../curriculumData';

export const EXTRA_GRAM_CASES: UnitModule[] = [
  {
    id: 'mod_case_1',
    unitNumber: 12,
    levelGroup: 'A2',
    title: 'İsmin 1. Hali — Yalın (Кто? Что?)',
    description: 'Cümlenin öznesi: kelimenin sözlükteki "temiz" hali',
    category: 'Cümle Anahtarı',
    color: '#38bdf8',
    icon: '1️⃣',
    grammarExplain: `📌 ИМЕНИТЕЛЬНЫЙ ПАДЕЖ (YALIN HAL) — "KİM? NE?":
1. Cümlede İŞİ YAPAN kişi/şey yalın haldedir: "МАМА читает." (Anne okuyor.) — kim okuyor? МАМА.
2. Sözlükte gördüğün her kelime bu haldedir: книга, стол, окно. Değişmemiş, "fabrika çıkışı" hal.
3. "Это + yalın hal" tanıtma kalıbıdır: "Это книга." (Bu bir kitap.) — 6 halin yolculuğu hep buradan başlar.
🧭 YOL HARİTASI: Önümüzdeki 6 ünitede AYNI kelimeleri (книга, брат, Москва...) cümleden cümleye şekil değiştirirken izleyeceksin!`,
    words: [
      { id: 'wc12_1', ru: 'Кто?', reading: 'Kto?', tr: 'Kim?', level: 'A2', usageNote: 'Yalın halin canlılar için sorusu: "Кто это? — Это брат."' },
      { id: 'wc12_2', ru: 'Что?', reading: 'Şto?', tr: 'Ne?', level: 'A2', usageNote: 'Yalın halin cansızlar için sorusu; Ч burada Ş okunur!' },
      { id: 'wc12_3', ru: 'Книга', reading: 'Kníga', tr: 'Kitap (yalın)', level: 'A2', usageNote: '6 halin baş kahramanı: bu üniteden itibaren her halde onu göreceksin.' },
      { id: 'wc12_4', ru: 'Брат', reading: 'Brat', tr: 'Erkek kardeş (yalın)', level: 'A2', usageNote: 'İkinci kahramanımız — canlı isimlerin değişimini onda izleyeceğiz.' },
      { id: 'wc12_5', ru: 'Москва', reading: 'Maskvá', tr: 'Moskova (yalın)', level: 'A2', usageNote: 'Üçüncü kahraman — şehir ismi de hal değiştirir!' },
      { id: 'wc12_6', ru: 'Это книга.', reading: 'Éta kníga.', tr: 'Bu bir kitap.', level: 'A2', usageNote: 'Tanıtma kalıbı: "bu X\'tir" derken X hep yalındır.' },
      { id: 'wc12_7', ru: 'Мама читает.', reading: 'Máma çitáyet.', tr: 'Anne okuyor.', level: 'A2', usageNote: 'Özne yalın: işi yapan "мама".' },
      { id: 'wc12_8', ru: 'Стол стоит.', reading: 'Stol staít.', tr: 'Masa duruyor.', level: 'A2', usageNote: 'Cansız özne de yalın haldedir.' },
      { id: 'wc12_9', ru: 'Подлежащее', reading: 'Padlijáşşiye', tr: 'Özne (dilbilgisi terimi)', level: 'A2', usageNote: 'Rus okul çocuklarının ezberlediği ilk gramer terimi.' },
      { id: 'wc12_10', ru: 'Словарная форма', reading: 'Slavárnaya fórma', tr: 'Sözlük hali', level: 'A2', usageNote: 'Sözlükte aradığın her kelimeyi YALIN halde bulursun.' }
    ],
    sentences: [
      { ru: 'Это мой брат.', tr: 'Bu benim erkek kardeşim.', scrambled: ['брат.', 'Это', 'мой'], correct: ['Это', 'мой', 'брат.'] },
      { ru: 'Книга лежит на столе.', tr: 'Kitap masanın üstünde duruyor.', scrambled: ['на столе.', 'Книга', 'лежит'], correct: ['Книга', 'лежит', 'на столе.'] }
    ],
    sceneTitle: 'Altı Halin Yol Haritası',
    sceneContext: 'Dima, Rusça öğretmeni Vera Pavlovna\'dan halleri öğrenmeye başlıyor — önce en kolayı: hiç değişmeyen yalın hal.',
    dialogue: [
      { speaker: 'Vera Pavlovna', ru: 'Дима, что это?', reading: 'Díma, şto éta?', tr: 'Dima, bu ne?' },
      { speaker: 'Dima', ru: 'Это книга. Это стол. Это Москва!', reading: 'Éta kníga. Éta stol. Éta Maskvá!', tr: 'Bu bir kitap. Bu bir masa. Bu Moskova!' },
      { speaker: 'Vera Pavlovna', ru: 'Отлично! Это именительный падеж. Самый лёгкий!', reading: 'Atlíçna! Éta imenítil\'nıy padyéj. Sámıy lyóhkiy!', tr: 'Harika! Bu yalın hal. En kolayı!' },
      { speaker: 'Dima', ru: 'Лёгкий? А дальше будет сложно?', reading: 'Lyóhkiy? A dál\'şe búdit slójna?', tr: 'Kolay mı? Sonrası zor mu olacak?' }
    ]
  },
  {
    id: 'mod_case_2',
    unitNumber: 13,
    levelGroup: 'A2',
    title: 'İsmin 2. Hali — Tamlayan (Кого? Чего?)',
    description: '"Yok", "kimin" ve miktar: Rusçanın en çalışkan hali',
    category: 'Cümle Anahtarı',
    color: '#a78bfa',
    icon: '2️⃣',
    grammarExplain: `📌 РОДИТЕЛЬНЫЙ ПАДЕЖ (TAMLAYAN) — "KİMİN? NEYİN? / YOK":
1. YOKLUK hep bu halle: "Нет книги" (Kitap yok) — книга → книгИ. "У меня нет времени!" (Zamanım yok!)
2. SAHİPLİK: "книга брата" (kardeşimin kitabı) — брат → братА. Türkçedeki "-in" ekinin işini yapar.
3. MİKTAR: "стакан воды" (bir bardak su), "много работы" (çok iş) — ölçülen şey tamlayanda.
🔧 TİPİK DÖNÜŞÜM: -а/-я → -ы/-и (книга→книги); eril ünsüz → +а (брат→брата); Москва→Москвы.`,
    words: [
      { id: 'wc13_1', ru: 'Кого? Чего?', reading: 'Kavó? Çivó?', tr: 'Kimin? Neyin?', level: 'A2', usageNote: 'Г harfi bu soru kelimelerinde V okunur: "kavó".' },
      { id: 'wc13_2', ru: 'Нет книги', reading: 'Nyet knígi', tr: 'Kitap yok', level: 'A2', usageNote: 'КнигА → книгИ: yokluk tamlayan ister.' },
      { id: 'wc13_3', ru: 'У меня нет...', reading: 'U minyá nyet...', tr: 'Bende ... yok', level: 'A2', usageNote: 'Günlük hayatın en sık kalıbı: "У меня нет денег!" (Param yok!)' },
      { id: 'wc13_4', ru: 'Книга брата', reading: 'Kníga bráta', tr: 'Kardeşimin kitabı', level: 'A2', usageNote: 'БраТ → братА: sahibi tamlayana koy.' },
      { id: 'wc13_5', ru: 'Стакан воды', reading: 'Stakán vadı́', tr: 'Bir bardak su', level: 'A2', usageNote: 'ВодА → водЫ: ölçülen şey tamlayanda.' },
      { id: 'wc13_6', ru: 'Чашка чая', reading: 'Çáşka çáya', tr: 'Bir fincan çay', level: 'A2', usageNote: 'Чай → чая. Mutfak dili tamlayan doludur!' },
      { id: 'wc13_7', ru: 'Из Москвы', reading: 'Iz Maskvı́', tr: 'Moskova\'dan', level: 'A2', usageNote: '"из" (…-den) edatı hep tamlayan ister: Москва → Москвы.' },
      { id: 'wc13_8', ru: 'Без сахара', reading: 'Bis sáhara', tr: 'Şekersiz', level: 'A2', usageNote: '"без" (…-siz) de tamlayan ister: "кофе без сахара".' },
      { id: 'wc13_9', ru: 'Много работы', reading: 'Mnóga rabótı', tr: 'Çok iş', level: 'A2', usageNote: 'много/мало (çok/az) hep tamlayanla: работА → работЫ.' },
      { id: 'wc13_10', ru: 'До завтра!', reading: 'Da záftra!', tr: 'Yarına kadar / Yarın görüşürüz!', level: 'A2', usageNote: '"до" (…-e kadar) tamlayan ister — vedalaşma bile bu halde!' }
    ],
    sentences: [
      { ru: 'У меня нет времени.', tr: 'Zamanım yok.', scrambled: ['времени.', 'У меня', 'нет'], correct: ['У меня', 'нет', 'времени.'] },
      { ru: 'Дайте чашку чая без сахара.', tr: 'Şekersiz bir fincan çay verin.', scrambled: ['без сахара.', 'Дайте', 'чашку чая'], correct: ['Дайте', 'чашку чая', 'без сахара.'] }
    ],
    sceneTitle: 'Her Şey "Yok"la Başladı',
    sceneContext: 'Kafede tamlayan hali dersi: Dima sipariş vermeye çalışıyor ama kafede hiçbir şey yok — mükemmel pratik!',
    dialogue: [
      { speaker: 'Dima', ru: 'Можно чашку кофе?', reading: 'Mójna çáşku kófe?', tr: 'Bir fincan kahve alabilir miyim?' },
      { speaker: 'Garson', ru: 'Извините, у нас нет кофе.', reading: 'Izviníte, u nas nyet kófe.', tr: 'Üzgünüm, kahvemiz yok.' },
      { speaker: 'Dima', ru: 'Тогда стакан воды и кусок торта?', reading: 'Tagdá stakán vadı́ i kusók tórta?', tr: 'O zaman bir bardak su ve bir dilim pasta?' },
      { speaker: 'Garson', ru: 'Торта тоже нет. Есть чай без сахара!', reading: 'Tórta tóje nyet. Yest\' çay bis sáhara!', tr: 'Pasta da yok. Şekersiz çay var!' }
    ]
  },
  {
    id: 'mod_case_3',
    unitNumber: 14,
    levelGroup: 'A2',
    title: 'İsmin 3. Hali — Yönelme (Кому? Чему?)',
    description: '"Kime?" sorusu: verme, söyleme, yaş ve "lazım" kalıbı',
    category: 'Cümle Anahtarı',
    color: '#34d399',
    icon: '3️⃣',
    grammarExplain: `📌 ДАТЕЛЬНЫЙ ПАДЕЖ (YÖNELME) — "KİME? NEYE?":
1. VERME/SÖYLEME yönü: "Я даю книгу брату" (Kitabı kardeşiME veriyorum) — брат → братУ.
2. "МНЕ нужно..." (Bana lazım) ve "МНЕ нравится..." (Hoşuma gidiyor): Rusça "ben"i değil "banA"yı kullanır!
3. YAŞ söyleme: "Мне 25 лет" (25 yaşındayım) = kelimesi kelimesine "BanA 25 yıl".
🔧 TİPİK DÖNÜŞÜM: eril +у/-ю (брат→брату), dişil -а→-е (мама→маме), Москва→Москве.`,
    words: [
      { id: 'wc14_1', ru: 'Кому? Чему?', reading: 'Kamú? Çimú?', tr: 'Kime? Neye?', level: 'A2', usageNote: 'Yönelme halinin soruları.' },
      { id: 'wc14_2', ru: 'Мне', reading: 'Mnye', tr: 'Bana', level: 'A2', usageNote: 'Rusçanın en çalışkan zamiri: "мне нужно, мне нравится, мне 25 лет".' },
      { id: 'wc14_3', ru: 'Тебе', reading: 'Tibyé', tr: 'Sana', level: 'A2', usageNote: '"Тебе нравится?" (Hoşuna gidiyor mu?)' },
      { id: 'wc14_4', ru: 'Брату', reading: 'Brátu', tr: 'Kardeşe', level: 'A2', usageNote: 'Брат → братУ: "Я звоню брату" (Kardeşimi arıyorum — kelimesi kelimesine: kardeşiME telefon ediyorum).' },
      { id: 'wc14_5', ru: 'Маме', reading: 'Mámye', tr: 'Anneye', level: 'A2', usageNote: 'МамА → мамЕ: "Подарок маме" (Anneye hediye).' },
      { id: 'wc14_6', ru: 'Мне нужно', reading: 'Mnye nújna', tr: 'Bana lazım / …-mem gerek', level: 'A2', usageNote: '"Мне нужно работать" (Çalışmam lazım) — günlük hayatın motoru.' },
      { id: 'wc14_7', ru: 'Мне нравится', reading: 'Mnye nrávitsa', tr: 'Hoşuma gidiyor', level: 'A2', usageNote: 'Kelimesi kelimesine "bana hoş geliyor" — beğenen kişi yönelmededir!' },
      { id: 'wc14_8', ru: 'Мне 25 лет', reading: 'Mnye dvádtsat\' pyat\' lyet', tr: '25 yaşındayım', level: 'A2', usageNote: 'Rusçada yaş "bana X yıl" diye söylenir.' },
      { id: 'wc14_9', ru: 'К врачу', reading: 'K vraçú', tr: 'Doktora', level: 'A2', usageNote: '"к" (…-e doğru) edatı yönelme ister: "иду к врачу" (doktora gidiyorum).' },
      { id: 'wc14_10', ru: 'Позвонить другу', reading: 'Pazvanít\' drúgu', tr: 'Arkadaşı aramak', level: 'A2', usageNote: 'Rusçada ARANAN kişi yönelmededir: друг → другу.' }
    ],
    sentences: [
      { ru: 'Мне нравится эта книга.', tr: 'Bu kitap hoşuma gidiyor.', scrambled: ['эта книга.', 'Мне', 'нравится'], correct: ['Мне', 'нравится', 'эта книга.'] },
      { ru: 'Я звоню маме каждый день.', tr: 'Anneme her gün telefon ediyorum.', scrambled: ['каждый день.', 'Я', 'маме', 'звоню'], correct: ['Я', 'звоню', 'маме', 'каждый день.'] }
    ],
    sceneTitle: 'Hediye Kime?',
    sceneContext: 'Dima hediye dağıtıyor: anneye çiçek, kardeşe kitap, kendine pasta — yönelme hali sahada!',
    dialogue: [
      { speaker: 'Dima', ru: 'Эти цветы — маме. Эта книга — брату.', reading: 'Éti tsvitı́ — mámye. Éta kníga — brátu.', tr: 'Bu çiçekler — anneme. Bu kitap — kardeşime.' },
      { speaker: 'Lena', ru: 'А что тебе?', reading: 'A şto tibyé?', tr: 'Peki sana ne var?' },
      { speaker: 'Dima', ru: 'Мне? Мне нужен только торт!', reading: 'Mnye? Mnye nújın tól\'ka tort!', tr: 'Bana mı? Bana sadece pasta lazım!' },
      { speaker: 'Lena', ru: 'Классика. Тебе всегда нужен торт.', reading: 'Klásika. Tibyé fsigdá nújın tort.', tr: 'Klasik. Sana her zaman pasta lazım.' }
    ]
  },
  {
    id: 'mod_case_4',
    unitNumber: 15,
    levelGroup: 'A2',
    title: 'İsmin 4. Hali — Belirtme (Кого? Что?)',
    description: 'Eylemin hedefi: "kitabı okuyorum, kardeşi görüyorum"',
    category: 'Cümle Anahtarı',
    color: '#f472b6',
    icon: '4️⃣',
    grammarExplain: `📌 ВИНИТЕЛЬНЫЙ ПАДЕЖ (BELİRTME) — "KİMİ? NEYİ?":
1. Eylemin HEDEFİ bu haldedir: "Я читаю книгУ" (KitabI okuyorum) — книга → книгу. Türkçedeki "-ı/-i" ekinin kardeşi!
2. ALTIN KURAL: Cansız erillerde belirtme = YALIN ("вижу стол"), CANLI erillerde belirtme = TAMLAYAN ("вижу братА")!
3. Dişil -а → -у: "люблю мамУ" (annemi seviyorum), "пью водУ" (su içiyorum).
4. Yön bildirmede de kullanılır: "еду в МосквУ" (Moskova'YA gidiyorum) — в + belirtme = -e doğru!`,
    words: [
      { id: 'wc15_1', ru: 'Кого? Что?', reading: 'Kavó? Şto?', tr: 'Kimi? Neyi?', level: 'A2', usageNote: 'Belirtme soruları: canlıda "кого", cansızda "что".' },
      { id: 'wc15_2', ru: 'Читаю книгу', reading: 'Çitáyu knígu', tr: 'Kitabı okuyorum', level: 'A2', usageNote: 'КнигА → книгУ: hedefteki dişil isim -у alır.' },
      { id: 'wc15_3', ru: 'Вижу брата', reading: 'Víju bráta', tr: 'Kardeşi görüyorum', level: 'A2', usageNote: 'CANLI eril: belirtme = tamlayan (брата)!' },
      { id: 'wc15_4', ru: 'Вижу стол', reading: 'Víju stol', tr: 'Masayı görüyorum', level: 'A2', usageNote: 'CANSIZ eril: belirtme = yalın (стол) — hiç değişmez!' },
      { id: 'wc15_5', ru: 'Люблю маму', reading: 'Lyublyú mámu', tr: 'Annemi seviyorum', level: 'A2', usageNote: 'Sevginin hedefi belirtmede: мамА → мамУ.' },
      { id: 'wc15_6', ru: 'Пью воду', reading: 'Pyu vódu', tr: 'Su içiyorum', level: 'A2', usageNote: 'ВодА → вóдУ — dikkat: vurgu başa kayar!' },
      { id: 'wc15_7', ru: 'Еду в Москву', reading: 'Yédu v Maskvú', tr: 'Moskova\'ya gidiyorum', level: 'A2', usageNote: '"в + belirtme" = YÖN: Москва → Москву.' },
      { id: 'wc15_8', ru: 'Смотрю фильм', reading: 'Smatryú fil\'m', tr: 'Film izliyorum', level: 'A2', usageNote: 'Cansız eril фильм değişmedi — kural işliyor.' },
      { id: 'wc15_9', ru: 'Жду друга', reading: 'Jdu drúga', tr: 'Arkadaşı bekliyorum', level: 'A2', usageNote: 'Canlı eril: друг → друга.' },
      { id: 'wc15_10', ru: 'Купить хлеб', reading: 'Kupít\' hlyep', tr: 'Ekmek almak', level: 'A2', usageNote: 'Alışverişin hedefi hep belirtmededir: "купи хлеб и молоко!"' }
    ],
    sentences: [
      { ru: 'Я читаю интересную книгу.', tr: 'İlginç bir kitap okuyorum.', scrambled: ['книгу.', 'Я', 'интересную', 'читаю'], correct: ['Я', 'читаю', 'интересную', 'книгу.'] },
      { ru: 'Завтра я еду в Москву.', tr: 'Yarın Moskova\'ya gidiyorum.', scrambled: ['в Москву.', 'Завтра', 'еду', 'я'], correct: ['Завтра', 'я', 'еду', 'в Москву.'] }
    ],
    sceneTitle: 'Markette Hedef Listesi',
    sceneContext: 'Alışveriş listesi baştan sona belirtme hali: ekmeği, sütü, peyniri al — kardeşi de markette gör!',
    dialogue: [
      { speaker: 'Lena', ru: 'Купи хлеб, молоко и сыр!', reading: 'Kupí hlyep, malakó i sır!', tr: 'Ekmek, süt ve peynir al!' },
      { speaker: 'Dima', ru: 'Уже покупаю. О! Я вижу твоего брата!', reading: 'Ujé pakupáyu. O! Ya víju tvayivó bráta!', tr: 'Alıyorum bile. O! Kardeşini görüyorum!' },
      { speaker: 'Lena', ru: 'Брата? Он тоже покупает воду и торт?', reading: 'Bráta? On tóje pakupáyet vódu i tort?', tr: 'Kardeşimi mi? O da mı su ve pasta alıyor?' },
      { speaker: 'Dima', ru: 'Нет, он просто смотрит холодильник!', reading: 'Nyet, on prósta smótrit haladíl\'nik!', tr: 'Hayır, sadece buzdolabına bakıyor!' }
    ]
  },
  {
    id: 'mod_case_5',
    unitNumber: 16,
    levelGroup: 'A2',
    title: 'İsmin 5. Hali — Araç (Кем? Чем?)',
    description: '"Neyle? Kiminle?" — araç, birliktelik ve meslek kalıbı',
    category: 'Cümle Anahtarı',
    color: '#fb923c',
    icon: '5️⃣',
    grammarExplain: `📌 ТВОРИТЕЛЬНЫЙ ПАДЕЖ (ARAÇ HALİ) — "KİMLE? NEYLE?":
1. ARAÇ: "пишу ручкОЙ" (kalemLE yazıyorum) — ручка → ручкой. Edatsız, tek başına "ile" demek!
2. BİRLİKTELİK "с + araç hali": "чай с сахарОМ" (şekerLİ çay), "с братОМ" (kardeşimLE).
3. MESLEK/OLMA: "Я работаю врачОМ" (Doktor olarak çalışıyorum), "Он стал шефОМ" (Şef oldu).
🔧 TİPİK DÖNÜŞÜM: eril +ом/-ем (брат→братом), dişil -а→-ой (мама→мамой), Москва→Москвой.`,
    words: [
      { id: 'wc16_1', ru: 'Кем? Чем?', reading: 'Kyem? Çem?', tr: 'Kimle/Kim olarak? Neyle?', level: 'A2', usageNote: 'Araç halinin soruları.' },
      { id: 'wc16_2', ru: 'Ручкой', reading: 'Rúçkay', tr: 'Kalemle', level: 'A2', usageNote: 'Edat YOK: ручка+ой kendi başına "kalemle" demek.' },
      { id: 'wc16_3', ru: 'С братом', reading: 'S brátam', tr: 'Kardeşle', level: 'A2', usageNote: 'Birliktelikte "с" edatı gelir: брат → братом.' },
      { id: 'wc16_4', ru: 'С мамой', reading: 'S mámay', tr: 'Anneyle', level: 'A2', usageNote: 'МамА → мамОЙ: "гуляю с мамой" (annemle geziyorum).' },
      { id: 'wc16_5', ru: 'Чай с сахаром', reading: 'Çay s sáharam', tr: 'Şekerli çay', level: 'A2', usageNote: 'Yemek dili araç hali doludur: "кофе с молоком" (sütlü kahve).' },
      { id: 'wc16_6', ru: 'Работаю врачом', reading: 'Rabótayu vraçóm', tr: 'Doktor olarak çalışıyorum', level: 'A2', usageNote: 'Meslek söylerken araç hali: врач → врачом.' },
      { id: 'wc16_7', ru: 'Платить картой', reading: 'Platít\' kártay', tr: 'Kartla ödemek', level: 'A2', usageNote: 'Tanıdık geldi mi? ATM ünitesindeki kalıp buradan geliyor!' },
      { id: 'wc16_8', ru: 'Ехать поездом', reading: 'Yéhat\' póyizdam', tr: 'Trenle gitmek', level: 'A2', usageNote: 'Ulaşım araçları da araç halini sever: поезд → поездом.' },
      { id: 'wc16_9', ru: 'Стать шефом', reading: 'Stat\' şéfam', tr: 'Şef olmak', level: 'A2', usageNote: '"стать" (olmak) fiili araç hali ister — kariyer kelimesi!' },
      { id: 'wc16_10', ru: 'Под Москвой', reading: 'Pad Maskvóy', tr: 'Moskova yakınında', level: 'A2', usageNote: '"под" (altında/yakınında) araç haliyle: Москва → Москвой.' }
    ],
    sentences: [
      { ru: 'Я пью кофе с молоком.', tr: 'Sütlü kahve içiyorum.', scrambled: ['с молоком.', 'Я', 'кофе', 'пью'], correct: ['Я', 'пью', 'кофе', 'с молоком.'] },
      { ru: 'Вечером я гуляю с братом.', tr: 'Akşam kardeşimle geziyorum.', scrambled: ['с братом.', 'Вечером', 'гуляю', 'я'], correct: ['Вечером', 'я', 'гуляю', 'с братом.'] }
    ],
    sceneTitle: 'Neyle ve Kiminle?',
    sceneContext: 'Kafede sipariş dersi: sütlü mü şekerli mi, kartla mı nakitle mi, yalnız mı kardeşle mi?',
    dialogue: [
      { speaker: 'Garson', ru: 'Кофе с молоком или с сахаром?', reading: 'Kófe s malakóm íli s sáharam?', tr: 'Kahve sütlü mü şekerli mi?' },
      { speaker: 'Dima', ru: 'С молоком! Я здесь с братом, ему тоже кофе.', reading: 'S malakóm! Ya zdyes\' s brátam, yimú tóje kófe.', tr: 'Sütlü! Kardeşimle geldim, ona da kahve.' },
      { speaker: 'Garson', ru: 'Платить будете картой?', reading: 'Platít\' búditye kártay?', tr: 'Kartla mı ödeyeceksiniz?' },
      { speaker: 'Dima', ru: 'Картой. Брат платит наличными. Он старомодный!', reading: 'Kártay. Brat plátit nalíçnımi. On staramódnıy!', tr: 'Kartla. Kardeşim nakit ödüyor. O eski kafalı!' }
    ]
  },
  {
    id: 'mod_case_6',
    unitNumber: 17,
    levelGroup: 'A2',
    title: 'İsmin 6. Hali — Bulunma (О ком? О чём? Где?)',
    description: '"Nerede?" ve "ne hakkında?" — asla edatsız gezmeyen hal',
    category: 'Cümle Anahtarı',
    color: '#facc15',
    icon: '6️⃣',
    grammarExplain: `📌 ПРЕДЛОЖНЫЙ ПАДЕЖ (BULUNMA) — "NEREDE? NE HAKKINDA?":
1. YER: "в МосквЕ" (Moskova'DA), "на столЕ" (masaDA) — Москва → Москве. Türkçedeki "-de/-da"!
2. KONU: "думаю о братЕ" (kardeşi düşünüyorum), "фильм о любвИ" (aşk hakkında film).
3. Bu hal Rusçanın TEK edatsız yaşayamayan halidir — adı bile "edatlı hal" (предложный)! Hep в/на/о ile gezer.
🎓 MEZUNİYET: 6 hali bitirdin! Artık "Я еду в Москву" (yön) ile "Я живу в Москве" (yer) farkını duyabiliyorsun.`,
    words: [
      { id: 'wc17_1', ru: 'Где?', reading: 'Gdye?', tr: 'Nerede?', level: 'A2', usageNote: 'Bulunma halinin en sık sorusu.' },
      { id: 'wc17_2', ru: 'О ком? О чём?', reading: 'A kom? A çyom?', tr: 'Kim hakkında? Ne hakkında?', level: 'A2', usageNote: 'Konu bildirme soruları.' },
      { id: 'wc17_3', ru: 'В Москве', reading: 'V Maskvyé', tr: 'Moskova\'da', level: 'A2', usageNote: 'Москва → МосквЕ: "Я живу в Москве."' },
      { id: 'wc17_4', ru: 'На столе', reading: 'Na stalyé', tr: 'Masada / Masanın üstünde', level: 'A2', usageNote: 'Стол → столЕ: "Книга на столе."' },
      { id: 'wc17_5', ru: 'В кафе', reading: 'F kafé', tr: 'Kafede', level: 'A2', usageNote: 'Yabancı kökenli "кафе" hiç çekilmez — şanslısın!' },
      { id: 'wc17_6', ru: 'О брате', reading: 'A brátye', tr: 'Kardeş hakkında', level: 'A2', usageNote: 'Брат → братЕ: "думаю о брате".' },
      { id: 'wc17_7', ru: 'О любви', reading: 'A lyubví', tr: 'Aşk hakkında', level: 'A2', usageNote: 'Любовь → любви: şarkıların yarısı "о любви"dir.' },
      { id: 'wc17_8', ru: 'В книге', reading: 'F knígye', tr: 'Kitapta', level: 'A2', usageNote: 'КнигА → книгЕ: kahramanımızın son dönüşümü!' },
      { id: 'wc17_9', ru: 'На работе', reading: 'Na rabótye', tr: 'İşte / İş yerinde', level: 'A2', usageNote: '"Я на работе" (İşteyim) — günlük mesajların klasiği.' },
      { id: 'wc17_10', ru: 'Мечтать о море', reading: 'Miçtát\' a mórye', tr: 'Denizi hayal etmek', level: 'A2', usageNote: 'Hayaller de bulunma halinde kurulur: "мечтаю об отпуске!"' }
    ],
    sentences: [
      { ru: 'Я живу в Москве.', tr: 'Moskova\'da yaşıyorum.', scrambled: ['в Москве.', 'Я', 'живу'], correct: ['Я', 'живу', 'в Москве.'] },
      { ru: 'Мы говорим о новой книге.', tr: 'Yeni kitap hakkında konuşuyoruz.', scrambled: ['о новой книге.', 'Мы', 'говорим'], correct: ['Мы', 'говорим', 'о новой книге.'] }
    ],
    sceneTitle: 'Altı Halin Finali',
    sceneContext: 'Vera Pavlovna final sınavı yapıyor: aynı üç kelime — книга, брат, Москва — altı halde döndü, tur tamamlandı!',
    dialogue: [
      { speaker: 'Vera Pavlovna', ru: 'Финальный тест! Где ты живёшь?', reading: 'Finál\'nıy test! Gdye tı jivyóş?', tr: 'Final testi! Nerede yaşıyorsun?' },
      { speaker: 'Dima', ru: 'Я живу в Москве. Работаю в кафе. Думаю о торте.', reading: 'Ya jivú v Maskvyé. Rabótayu f kafé. Dúmayu a tórtye.', tr: 'Moskova\'da yaşıyorum. Kafede çalışıyorum. Pastayı düşünüyorum.' },
      { speaker: 'Vera Pavlovna', ru: 'Опять торт! Но грамматика — идеальная. Пять!', reading: 'Apyát\' tort! No gramátika — idiál\'naya. Pyat\'!', tr: 'Yine pasta! Ama gramer — kusursuz. Beş (tam not)!' },
      { speaker: 'Dima', ru: 'Шесть падежей — и все о торте!', reading: 'Şest\' padijéy — i fsye a tórtye!', tr: 'Altı hal — ve hepsi pasta hakkında!' }
    ]
  },
  {
    id: 'mod_stress_1',
    unitNumber: 18,
    levelGroup: 'A2',
    title: 'Vurgu Cambazlığı — Anlam Değiştiren Vurgu',
    description: 'Aynı yazılış, bambaşka anlam: замОк mu зАмок mu?',
    category: 'Telaffuz & Vurgu',
    color: '#e879f9',
    icon: '🎪',
    grammarExplain: `📌 VURGU = ANLAM:
1. Rusçada vurgu işareti YAZILMAZ ama anlamı değiştirir: "зАмок" (kale) ≠ "замОк" (kilit) — aynı harfler!
2. Vurgu kayınca sesler de değişir (akanje): "мУка" (ıstırap) net U ile; "мукА" (un) sonda vurgulu.
3. Bu kelimelerde bağlam kurtarıcıdır: fırında "мука" dersen kimse ıstırap anlamaz — ama vurguyu doğru koyarsan profesyonel duyulursun!`,
    words: [
      { id: 'ws18_1', ru: 'зАмок', reading: 'ZÁmak', tr: 'Kale / Şato', level: 'A2', usageNote: 'Vurgu BAŞTA: kale. Almanca "Schloss"tan gelir.' },
      { id: 'ws18_2', ru: 'замОк', reading: 'ZamÓk', tr: 'Kilit', level: 'A2', usageNote: 'Vurgu SONDA: kilit. Kapındaki şey bu.' },
      { id: 'ws18_3', ru: 'мУка', reading: 'MÚka', tr: 'Istırap / Eziyet', level: 'A2', usageNote: 'Vurgu başta: dram kelimesi.' },
      { id: 'ws18_4', ru: 'мукА', reading: 'MukÁ', tr: 'Un', level: 'A2', usageNote: 'Vurgu sonda: mutfak kelimesi. Aşçılık ünitelerinin dostu!' },
      { id: 'ws18_5', ru: 'дорОга', reading: 'DarÓga', tr: 'Yol', level: 'A2', usageNote: 'Vurgu ortada: isim.' },
      { id: 'ws18_6', ru: 'дорогА', reading: 'DaragÁ', tr: 'Pahalıdır (dişil)', level: 'A2', usageNote: 'Vurgu sonda: "эта сумка дорога!" (bu çanta pahalı!)' },
      { id: 'ws18_7', ru: 'Хлопок', reading: 'HLÓpak / HlapÓk', tr: 'Pamuk / El çırpması', level: 'A2', usageNote: 'хлОпок = pamuk; хлопОк = alkış sesi. Tekstil mi konser mi?' },
      { id: 'ws18_8', ru: 'Орган', reading: 'ÓRgan / ArgÁn', tr: 'Organ / Org (çalgı)', level: 'A2', usageNote: 'Оrgan = vücut organı; оргАн = kilise orgu.' },
      { id: 'ws18_9', ru: 'СтОит / СтоИт', reading: 'STÓit / StaÍT', tr: 'Değer (fiyat) / Ayakta duruyor', level: 'A2', usageNote: '"Сколько стОит?" fiyat sorar; "он стоИт" ayakta durur.' },
      { id: 'ws18_10', ru: 'ПлАчу / ПлачУ', reading: 'PLÁçu / PlaçÚ', tr: 'Ağlıyorum / Ödüyorum', level: 'A2', usageNote: 'Fatura gelince ikisi aynı anda olabilir!' }
    ],
    sentences: [
      { ru: 'Сколько стоит эта мука?', tr: 'Bu un ne kadar?', scrambled: ['мука?', 'Сколько', 'эта', 'стоит'], correct: ['Сколько', 'стоит', 'эта', 'мука?'] },
      { ru: 'Старый замок стоит на горе.', tr: 'Eski kale dağın üstünde duruyor.', scrambled: ['на горе.', 'Старый', 'стоит', 'замок'], correct: ['Старый', 'замок', 'стоит', 'на горе.'] }
    ],
    sceneTitle: 'Kale mi Kilit mi?',
    sceneContext: 'Dima turist rehberine "kilidi görmeye geldim" diyor — vurgu yüzünden herkes şaşkın.',
    dialogue: [
      { speaker: 'Dima', ru: 'Я хочу посмотреть замОк!', reading: 'Ya haçú pasmatryét\' zamÓk!', tr: 'Kilidi görmek istiyorum!' },
      { speaker: 'Rehber', ru: 'ЗамОк? Может быть, зАмок?', reading: 'ZamÓk? Mójıt bıt\', ZÁmak?', tr: 'Kilidi mi? Belki kaleyi?' },
      { speaker: 'Dima', ru: 'Ой! Да, зАмок! Большой, красивый зАмок!', reading: 'Oy! Da, ZÁmak! Bal\'şóy, krasívıy ZÁmak!', tr: 'Ah! Evet, kaleyi! Büyük, güzel kaleyi!' },
      { speaker: 'Rehber', ru: 'Хорошо! А замОк — вот он, на двери замка!', reading: 'Haraşó! A zamÓk — vot on, na dvyerí zámka!', tr: 'Güzel! Kilit de işte — kalenin kapısında!' }
    ]
  },
  {
    id: 'mod_stress_2',
    unitNumber: 19,
    levelGroup: 'A2',
    title: 'Hareketli Vurgu — Çekimle Kayan Vurgu',
    description: 'рукА ama рУку: hal değişince vurgu da göç eder',
    category: 'Telaffuz & Vurgu',
    color: '#22d3ee',
    icon: '🎢',
    grammarExplain: `📌 GÖÇEBE VURGU:
1. Bazı kelimelerde vurgu çekim sırasında YER DEĞİŞTİRİR: "рукА" (el) ama "рУку" (eli); "водА" ama "вОду".
2. Çoğulda da kayar: "гОрод" (şehir) → "городА" (şehirler); "нОги" (bacaklar) ← "ногА" (bacak).
3. Kural yerine ŞARKI gibi ezberle: "рукА-рУку, водА-вОду, ногА-нОгу" — üçü de aynı melodiyle kayar!`,
    words: [
      { id: 'ws19_1', ru: 'рукА → рУку', reading: 'rukÁ → rÚku', tr: 'El → Eli', level: 'A2', usageNote: 'Belirtmede vurgu başa göçer: "дай рУку!" (elini ver!)' },
      { id: 'ws19_2', ru: 'водА → вОду', reading: 'vadÁ → vÓdu', tr: 'Su → Suyu', level: 'A2', usageNote: '"Пью вОду" — belirtme halinde vurgu başta.' },
      { id: 'ws19_3', ru: 'ногА → нОгу', reading: 'nagÁ → nÓgu', tr: 'Bacak → Bacağı', level: 'A2', usageNote: 'Aynı melodi: sondan başa.' },
      { id: 'ws19_4', ru: 'головА → гОлову', reading: 'galavÁ → gÓlavu', tr: 'Baş → Başı', level: 'A2', usageNote: 'Üç heceli ama aynı kural: "болит гОлову"... hayır! "болит головА" — dikkat, burada yalın!' },
      { id: 'ws19_5', ru: 'гОрод → городА', reading: 'gÓrat → garadÁ', tr: 'Şehir → Şehirler', level: 'A2', usageNote: 'Çoğulda vurgu SONA kaçar — tersine göç!' },
      { id: 'ws19_6', ru: 'дОм → домА', reading: 'dom → damÁ', tr: 'Ev → Evler', level: 'A2', usageNote: '"домА" hem "evler" hem "evde" (дОма) — vurgu ayırt eder!' },
      { id: 'ws19_7', ru: 'окнО → Окна', reading: 'aknÓ → Ókna', tr: 'Pencere → Pencereler', level: 'A2', usageNote: 'Tekilde sonda, çoğulda başta — tam tersi de olur.' },
      { id: 'ws19_8', ru: 'зимА → зИму', reading: 'zimÁ → zÍmu', tr: 'Kış → Kışı', level: 'A2', usageNote: '"Всю зИму" (bütün kış) — vurgu başa.' },
      { id: 'ws19_9', ru: 'ценА → цЕны', reading: 'tsınÁ → TSÉnı', tr: 'Fiyat → Fiyatlar', level: 'A2', usageNote: '"ЦЕны растут!" (Fiyatlar artıyor!) — haberlerin klasiği.' },
      { id: 'ws19_10', ru: 'дОма / домА', reading: 'dÓma / damÁ', tr: 'Evde / Evler', level: 'A2', usageNote: '"Я дОма" (evdeyim) ≠ "красивые домА" (güzel evler).' }
    ],
    sentences: [
      { ru: 'Дай мне руку, пожалуйста.', tr: 'Bana elini ver lütfen.', scrambled: ['пожалуйста.', 'Дай', 'руку,', 'мне'], correct: ['Дай', 'мне', 'руку,', 'пожалуйста.'] },
      { ru: 'Я весь день дома пью воду.', tr: 'Bütün gün evde su içiyorum.', scrambled: ['пью воду.', 'Я', 'дома', 'весь день'], correct: ['Я', 'весь день', 'дома', 'пью воду.'] }
    ],
    sceneTitle: 'Vurgu Göç Mevsimi',
    sceneContext: 'Vera Pavlovna elinde metronomla vurgu ritmi çalıştırıyor: rukÁ-rÚku, vadÁ-vÓdu!',
    dialogue: [
      { speaker: 'Vera Pavlovna', ru: 'Повторяй: рукА — рУку! ВодА — вОду!', reading: 'Paftaryáy: rukÁ — rÚku! VadÁ — vÓdu!', tr: 'Tekrarla: el — eli! Su — suyu!' },
      { speaker: 'Dima', ru: 'РукА — рУку... Это как песня!', reading: 'RukÁ — rÚku... Éta kak pyésnya!', tr: 'El — eli... Bu şarkı gibi!' },
      { speaker: 'Vera Pavlovna', ru: 'Именно! Ударение — это музыка языка.', reading: 'Íminna! Udaryéniye — éta múzıka yizıká.', tr: 'Aynen! Vurgu — dilin müziğidir.' },
      { speaker: 'Dima', ru: 'Тогда я хочу быть диджеем русского языка!', reading: 'Tagdá ya haçú bıt\' didjéyem rúskava yizıká!', tr: 'O zaman Rusçanın DJ\'i olmak istiyorum!' }
    ]
  },
  {
    id: 'mod_stress_3',
    unitNumber: 20,
    levelGroup: 'A2',
    title: 'Е mi Ё mu? — İki Noktanın Gücü',
    description: 'все/всё, небо/нёбо: yazıda gizlenen ama seste yaşayan fark',
    category: 'Telaffuz & Vurgu',
    color: '#fbbf24',
    icon: '🎯',
    grammarExplain: `📌 Ё'NÜN GİZLİ HAYATI:
1. Ruslar Ё'nün noktalarını çoğu zaman YAZMAZ (е yazarlar) ama HEP Ё okurlar: "ее" yazılır, "yeyó" okunur!
2. Ё HER ZAMAN vurguludur — kelimede Ё varsa vurgu tartışması bitmiştir.
3. Bazı çiftlerde fark anlamdadır: "все" (herkes) ≠ "всё" (her şey); "небо" (gökyüzü) ≠ "нёбо" (damak)!`,
    words: [
      { id: 'ws20_1', ru: 'все', reading: 'fsye', tr: 'Herkes', level: 'A2', usageNote: '"Все пришли" (herkes geldi) — insanlar.' },
      { id: 'ws20_2', ru: 'всё', reading: 'fsyo', tr: 'Her şey', level: 'A2', usageNote: '"Всё хорошо" (her şey yolunda) — şeyler.' },
      { id: 'ws20_3', ru: 'нЕбо', reading: 'NYÉba', tr: 'Gökyüzü', level: 'A2', usageNote: 'Şairlerin kelimesi.' },
      { id: 'ws20_4', ru: 'нЁбо', reading: 'NYÓba', tr: 'Damak (ağızda)', level: 'A2', usageNote: 'Diş hekimlerinin kelimesi. İki nokta her şeyi değiştirdi!' },
      { id: 'ws20_5', ru: 'осЁл', reading: 'asyól', tr: 'Eşek', level: 'A2', usageNote: 'Ё vurgulu: "asyól".' },
      { id: 'ws20_6', ru: 'осЕл', reading: 'asyél', tr: 'Çöktü / Dibe oturdu', level: 'A2', usageNote: '"Дом осел" (ev oturdu/çöktü) — inşaat terimi.' },
      { id: 'ws20_7', ru: 'ЕЁ зовут Лена', reading: 'YiYÓ zavút Lyéna', tr: 'Onun adı Lena', level: 'A2', usageNote: '"её" yazılışı "yiyó" okunur — noktalar yazılmasa bile!' },
      { id: 'ws20_8', ru: 'Ещё', reading: 'Yişşó', tr: 'Daha / Henüz', level: 'A2', usageNote: 'Günlük hayatın en sık Ё\'lü kelimesi: "ещё раз!" (bir daha!)' },
      { id: 'ws20_9', ru: 'Мёд', reading: 'Myot', tr: 'Bal', level: 'A2', usageNote: 'Ё vurgulu, sondaki Д sedasızlaşır: "myot".' },
      { id: 'ws20_10', ru: 'Пёс / Пес?', reading: 'Pyos', tr: 'Köpek (erkek)', level: 'A2', usageNote: 'Yazıda "пес" görsen de "pyos" oku — Ё gizlense de yaşar!' }
    ],
    sentences: [
      { ru: 'Всё хорошо, все дома.', tr: 'Her şey yolunda, herkes evde.', scrambled: ['все дома.', 'Всё', 'хорошо,'], correct: ['Всё', 'хорошо,', 'все дома.'] },
      { ru: 'Ещё чай с мёдом, пожалуйста!', tr: 'Bir daha ballı çay lütfen!', scrambled: ['пожалуйста!', 'Ещё', 'с мёдом,', 'чай'], correct: ['Ещё', 'чай', 'с мёдом,', 'пожалуйста!'] }
    ],
    sceneTitle: 'İki Noktanın Davası',
    sceneContext: 'Dima gazetede "все" görüyor ama ne zaman "vsye" ne zaman "vsyo" okuyacağını çözemez — Vera Pavlovna noktaların tarihini anlatıyor.',
    dialogue: [
      { speaker: 'Dima', ru: 'Здесь написано «все». Это «fsye» или «fsyo»?', reading: 'Zdyes\' napísana «vsye». Éta «fsye» íli «fsyo»?', tr: 'Burada "все" yazıyor. Bu "fsye" mi "fsyo" mu?' },
      { speaker: 'Vera Pavlovna', ru: 'Смотри на смысл! Люди — «все», вещи — «всё».', reading: 'Smatrí na smısl! Lyúdi — «fsye», vyéşşi — «fsyo».', tr: 'Anlama bak! İnsanlar — "fsye", şeyler — "fsyo".' },
      { speaker: 'Dima', ru: 'А почему они не пишут точки?!', reading: 'A paçimú aní ni píşut tóçki?!', tr: 'Peki neden noktaları yazmıyorlar?!' },
      { speaker: 'Vera Pavlovna', ru: 'Это старая русская загадка. Привыкай!', reading: 'Éta stáraya rúskaya zagátka. Privıkáy!', tr: 'Bu eski bir Rus bilmecesi. Alış!' }
    ]
  },
  {
    id: 'mod_stress_4',
    unitNumber: 21,
    levelGroup: 'A2',
    title: 'Fiil Vurguları — звонИт, полОжил, началА',
    description: 'Rusların bile yanlış yaptığı vurgular: doğrusunu sen söyle!',
    category: 'Telaffuz & Vurgu',
    color: '#4ade80',
    icon: '🥁',
    grammarExplain: `📌 FİİL VURGUSU TUZAKLARI:
1. "звонИт" (arıyor) — vurgu SONDA! "звОнит" demek Rusya'da eğitimsizlik göstergesi sayılır; doğru söylersen hoca gibi duyulursun.
2. Geçmiş zaman dişilde vurgu SONA kaçar: "нАчал" (başladı-eril) ama "началА" (başladı-dişil); "пОнял/понялА", "взЯл/взялА".
3. "положИть" (koymak): "полОжил" değil "положИл"... ve asla "покласть" deme — o kelime yok!`,
    words: [
      { id: 'ws21_1', ru: 'звонИт', reading: 'zvanÍT', tr: 'Arıyor (telefon)', level: 'A2', usageNote: 'VURGU SONDA! Bu tek kelime seni yerli gibi gösterir.' },
      { id: 'ws21_2', ru: 'позвонИшь', reading: 'pazvanÍŞ', tr: 'Arayacaksın', level: 'A2', usageNote: '"Ты мне позвонИшь?" (Beni arayacak mısın?) — vurgu yine sonda.' },
      { id: 'ws21_3', ru: 'нАчал / началА', reading: 'NÁçal / naçalÁ', tr: 'Başladı (eril/dişil)', level: 'A2', usageNote: 'Dişilde vurgu sona zıplar — klasik tuzak.' },
      { id: 'ws21_4', ru: 'пОнял / понялА', reading: 'PÓnyal / panyalÁ', tr: 'Anladı (eril/dişil)', level: 'A2', usageNote: '"Я всё пОнял!" der erkek; "Я всё понялА!" der kadın.' },
      { id: 'ws21_5', ru: 'взЯл / взялА', reading: 'VZYAL / vzyalÁ', tr: 'Aldı (eril/dişil)', level: 'A2', usageNote: 'Aynı melodi: eril başta, dişil sonda.' },
      { id: 'ws21_6', ru: 'бЫл / былА', reading: 'BIL / bılÁ', tr: 'İdi (eril/dişil)', level: 'A2', usageNote: '"Он бЫл дома, она былА на работе."' },
      { id: 'ws21_7', ru: 'положИл', reading: 'palajÍL', tr: 'Koydu', level: 'A2', usageNote: '"Куда ты положИл ключи?" (Anahtarları nereye koydun?)' },
      { id: 'ws21_8', ru: 'красИвее', reading: 'krasÍviye', tr: 'Daha güzel', level: 'A2', usageNote: '"красивЕе" değil "красИвее" — sınav klasiği!' },
      { id: 'ws21_9', ru: 'тОрты', reading: 'TÓRtı', tr: 'Pastalar', level: 'A2', usageNote: '"тортЫ" değil "тОрты" — pastacıda bile vurgu önemli!' },
      { id: 'ws21_10', ru: 'договОр', reading: 'dagavÓR', tr: 'Sözleşme', level: 'A2', usageNote: '"дОговор" halk ağzıdır; iş hayatında "договОр" de.' }
    ],
    sentences: [
      { ru: 'Мама звонит мне каждый вечер.', tr: 'Annem beni her akşam arıyor.', scrambled: ['каждый вечер.', 'Мама', 'мне', 'звонит'], correct: ['Мама', 'звонит', 'мне', 'каждый вечер.'] },
      { ru: 'Она поняла всё и начала работать.', tr: 'O her şeyi anladı ve çalışmaya başladı.', scrambled: ['работать.', 'Она', 'и начала', 'поняла всё'], correct: ['Она', 'поняла всё', 'и начала', 'работать.'] }
    ],
    sceneTitle: 'Vurgu Polisi',
    sceneContext: 'Kafede biri "звОнит" diyor; Vera Pavlovna\'nın kaşı kalkıyor — Dima ilk kez birini düzeltme şerefine eriyor.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Извините, мой телефон звОнит!', reading: 'Izviníte, moy tilifón ZVÓnit!', tr: 'Pardon, telefonum çalıyor! (yanlış vurgu)' },
      { speaker: 'Dima', ru: 'ЗвонИт! Правильно — звонИт!', reading: 'ZvanÍT! Právil\'na — zvanÍT!', tr: 'ZvanİT! Doğrusu — zvanİT!' },
      { speaker: 'Vera Pavlovna', ru: 'Браво, Дима! Ты теперь настоящий москвич.', reading: 'Bráva, Díma! Tı tipyér\' nastayáşşiy maskvíç.', tr: 'Bravo Dima! Artık gerçek bir Moskovalısın.' },
      { speaker: 'Müşteri', ru: 'Спасибо... наверное. Алло? Я тебе перезвонЮ!', reading: 'Spasíba... navérnaye. Aló? Ya tibyé pirizvanyÚ!', tr: 'Teşekkürler... herhalde. Alo? Seni sonra ararım!' }
    ]
  }
];
