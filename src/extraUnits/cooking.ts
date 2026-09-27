// ==========================================================
// AŞÇILIK MÜFREDATI (PAKET 1/2) — 20 ÜNİTE (A2 +5, B1 +6, B2 +5, C1 +4); devamı cooking2.ts
// Önce kelimeler → malzemeler → teknikler → tarifler → profesyonel mutfak.
// Diyaloglar «Кухня» kadrosuyla (Şef Pyotr, Lyosha, Nina) yazılmıştır —
// hikaye modülündeki «Ван Гог» restoranı evrenine bağlanır.
//   A2 : Ünite 32-36  (mutfak eşyaları, temel ürünler, sebze hazırlığı, ölçüler, ilk tarif)
//   B1 : Ünite 86-91  (pişirme fiilleri, tarif okuma, çorbalar, hamur işleri, salatalar, kazalar)
//   B2 : Ünite 135-139 (et & balık, tatlılar, turşu/konserve, misafir sofrası, restoran mutfağı)
//   C1 : Ünite 175-178 (şef dili, tabak sunumu, degüstasyon, kendi restoranını açmak)
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_COOKING: UnitModule[] = [
  // ============================ A2 ============================
  {
    id: 'mod_a2_k1',
    unitNumber: 32,
    levelGroup: 'A2',
    title: 'Mutfak Eşyaları',
    description: 'Tencere, tava, bıçak, ocak — mutfağın temel sözlüğü',
    category: 'Aşçılık',
    color: '#f59e0b',
    icon: '🍳',
    grammarExplain: `📌 MUTFAKTA "NEREDE?" SORUSU:
1. "Где нож?" (Bıçak nerede?) sorusuna yer bildiren hâl (Предложный падеж) ile cevap verilir: "Нож на столе." (Bıçak masada.)
2. "на плите" (ocağın üstünde), "в холодильнике" (buzdolabının içinde) — НА üst yüzey, В iç mekân demektir.
3. Mutfak eşyalarının çoğu dişildir: кастрюля, сковорода, тарелка, чашка — hepsi -а/-я ile biter.`,
    words: [
      { id: 'wck1_1', ru: 'Кухня', reading: 'Kúhnya', tr: 'Mutfak', level: 'A2', usageNote: 'Hem mutfak (oda) hem "mutfak kültürü" (русская кухня = Rus mutfağı) anlamındadır.' },
      { id: 'wck1_2', ru: 'Кастрюля', reading: 'Kastryúlya', tr: 'Tencere', level: 'A2', usageNote: 'Dişildir; çorbalar bunda pişer.' },
      { id: 'wck1_3', ru: 'Сковорода', reading: 'Skavaradá', tr: 'Tava', level: 'A2', usageNote: 'Vurgu sondadır; blini (krep) tavasız olmaz.' },
      { id: 'wck1_4', ru: 'Нож', reading: 'Noş', tr: 'Bıçak', level: 'A2', usageNote: 'Kelime sonundaki Ж sedasızlaşıp Ş okunur.' },
      { id: 'wck1_5', ru: 'Тарелка', reading: 'Taryélka', tr: 'Tabak', level: 'A2', usageNote: '"Тарелка супа" (bir tabak çorba) kalıbında sık geçer.' },
      { id: 'wck1_6', ru: 'Чашка', reading: 'Çáşka', tr: 'Fincan', level: 'A2', usageNote: '"Чашка чая" (bir fincan çay) — Rus mutfağının kalbi.' },
      { id: 'wck1_7', ru: 'Плита', reading: 'Plitá', tr: 'Ocak', level: 'A2', usageNote: '"На плите" (ocakta) — tencerenin doğal adresi.' },
      { id: 'wck1_8', ru: 'Холодильник', reading: 'Haladíl\'nik', tr: 'Buzdolabı', level: 'A2', usageNote: '"Холод" (soğuk) kökünden türemiştir.' },
      { id: 'wck1_9', ru: 'Чайник', reading: 'Çáynik', tr: 'Çaydanlık / Su ısıtıcısı', level: 'A2', usageNote: 'Rus mutfağında günde en az beş kez kaynar.' }
    ],
    sentences: [
      { ru: 'Кастрюля на плите.', tr: 'Tencere ocakta.', scrambled: ['на', 'Кастрюля', 'плите.'], correct: ['Кастрюля', 'на', 'плите.'] },
      { ru: 'Нож и тарелка на столе.', tr: 'Bıçak ve tabak masada.', scrambled: ['тарелка', 'Нож', 'на столе.', 'и'], correct: ['Нож', 'и', 'тарелка', 'на столе.'] }
    ],
    sceneTitle: 'Lyosha\'nın İlk Mutfak Turu',
    sceneContext: '«Ван Гог» mutfağında Şef Pyotr, yeni bulaşıkçı-aday Lyosha\'ya mutfağı tanıtıyor — her eşyanın adını tek tek soruyor.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Лёша! Это — кухня. Это — плита. Что это?', reading: 'Lyóşa! Éta — kúhnya. Éta — plitá. Şto éta?', tr: 'Lyosha! Bu — mutfak. Bu — ocak. Bu ne?' },
      { speaker: 'Lyosha', ru: 'Это... кастрюля? Или сковорода?', reading: 'Éta... kastryúlya? Íli skavaradá?', tr: 'Bu... tencere mi? Yoksa tava mı?' },
      { speaker: 'Şef Pyotr', ru: 'Это кастрюля! Сковорода — там, на плите.', reading: 'Éta kastryúlya! Skavaradá — tam, na plityé.', tr: 'Bu tencere! Tava — orada, ocağın üstünde.' },
      { speaker: 'Lyosha', ru: 'Понял, шеф! А где нож?', reading: 'Pónyal, şef! A gdye noş?', tr: 'Anladım, şef! Peki bıçak nerede?' }
    ]
  },
  {
    id: 'mod_a2_k2',
    unitNumber: 33,
    levelGroup: 'A2',
    title: 'Temel Malzemeler',
    description: 'Un, yumurta, yağ, şeker, tuz — her tarifin başladığı yer',
    category: 'Aşçılık',
    color: '#fbbf24',
    icon: '🥚',
    grammarExplain: `📌 MİKTAR + TAMLAYAN HÂLİ (Родительный):
1. Tariflerde miktar sözcüğünden sonra tamlayan hâli gelir: "стакан муки" (bir bardak un), "литр молока" (bir litre süt).
2. "Нет + tamlayan": "Нет соли" (tuz yok), "Нет яиц" (yumurta yok) — eksik malzeme böyle söylenir.
3. Sayılamayanlar tekildir: мука, сахар, соль hep tekil kullanılır.`,
    words: [
      { id: 'wck2_1', ru: 'Мука', reading: 'Muká', tr: 'Un', level: 'A2', usageNote: 'Vurgu sondadır; "мУка" derseniz "eziyet" olur — vurgu hayat kurtarır!' },
      { id: 'wck2_2', ru: 'Яйцо', reading: 'Yiytsó', tr: 'Yumurta', level: 'A2', usageNote: 'Çoğulu düzensizdir: яйца (yáytsa).' },
      { id: 'wck2_3', ru: 'Масло', reading: 'Másla', tr: 'Tereyağı / Yağ', level: 'A2', usageNote: 'Сливочное масло = tereyağı, растительное масло = sıvı yağ.' },
      { id: 'wck2_4', ru: 'Сахар', reading: 'Sáhar', tr: 'Şeker', level: 'A2', usageNote: '"Чай с сахаром" (şekerli çay) kalıbında geçer.' },
      { id: 'wck2_5', ru: 'Соль', reading: 'Sol\'', tr: 'Tuz', level: 'A2', usageNote: 'Dişildir; misafire "ekmek-tuz" (хлеб-соль) sunmak Rus geleneğidir.' },
      { id: 'wck2_6', ru: 'Перец', reading: 'Pyérits', tr: 'Karabiber / Biber', level: 'A2', usageNote: 'Hem baharat hem sebze biber anlamındadır.' },
      { id: 'wck2_7', ru: 'Рис', reading: 'Ris', tr: 'Pirinç', level: 'A2', usageNote: 'Kaşanın (lapa) ana malzemelerinden biridir.' },
      { id: 'wck2_8', ru: 'Вода', reading: 'Vadá', tr: 'Su', level: 'A2', usageNote: 'Akanje ile "vadá" okunur; vurgu sondadır.' }
    ],
    sentences: [
      { ru: 'Для блинов нужны мука, яйца и молоко.', tr: 'Krepler için un, yumurta ve süt gerekli.', scrambled: ['нужны', 'Для блинов', 'и молоко.', 'мука,', 'яйца'], correct: ['Для блинов', 'нужны', 'мука,', 'яйца', 'и молоко.'] },
      { ru: 'В супе мало соли.', tr: 'Çorbada tuz az.', scrambled: ['мало', 'В супе', 'соли.'], correct: ['В супе', 'мало', 'соли.'] }
    ],
    sceneTitle: 'Eksik Malzeme Krizi',
    sceneContext: 'Lyosha markete gitmeden önce Nina ile depo sayımı yapıyor — tabii ki en kritik malzeme bitmiştir.',
    dialogue: [
      { speaker: 'Nina', ru: 'Лёша, у нас есть мука и сахар?', reading: 'Lyóşa, u nas yest\' muká i sáhar?', tr: 'Lyosha, unumuz ve şekerimiz var mı?' },
      { speaker: 'Lyosha', ru: 'Мука есть. Сахар есть. Но нет яиц!', reading: 'Muká yest\'. Sáhar yest\'. No nyet yiíts!', tr: 'Un var. Şeker var. Ama yumurta yok!' },
      { speaker: 'Nina', ru: 'Как нет яиц?! Сегодня блины в меню!', reading: 'Kak nyet yiíts?! Sivódnya bliný v minyú!', tr: 'Nasıl yumurta yok?! Bugün menüde krep var!' },
      { speaker: 'Lyosha', ru: 'Спокойно! Магазин рядом. Десять минут!', reading: 'Spakóyna! Magazín ryádam. Dyésit\' minút!', tr: 'Sakin ol! Market yakın. On dakika!' }
    ]
  },
  {
    id: 'mod_a2_k3',
    unitNumber: 34,
    levelGroup: 'A2',
    title: 'Sebze Hazırlığı',
    description: 'Patates, soğan, havuç — yıkamak, soymak ve ağlamamak',
    category: 'Aşçılık',
    color: '#84cc16',
    icon: '🥕',
    grammarExplain: `📌 MUTFAK EMİR KİPİ (basit):
1. Tariflerde ve mutfakta emir kipi kullanılır: "Мой!" (yıka!), "Чисти!" (soy!). Kibar hâli -те ekiyle: "Мойте", "Чистите".
2. "Надо + fiil" kalıbı: "Надо мыть овощи" (Sebzeleri yıkamak gerek) — kural bildirmenin en kolay yolu.
3. Sebze adlarının çoğu günlük dilde küçültmeli söylenir: картошка (patates), морковка (havuç).`,
    words: [
      { id: 'wck3_1', ru: 'Картошка', reading: 'Kartóşka', tr: 'Patates', level: 'A2', usageNote: 'Resmî adı картофель ama herkes картошка der.' },
      { id: 'wck3_2', ru: 'Лук', reading: 'Luk', tr: 'Soğan', level: 'A2', usageNote: 'Aynı zamanda "yay" demektir — bağlam kurtarır.' },
      { id: 'wck3_3', ru: 'Морковь', reading: 'Markóf\'', tr: 'Havuç', level: 'A2', usageNote: 'Dişildir; günlük dilde морковка denir.' },
      { id: 'wck3_4', ru: 'Капуста', reading: 'Kapústa', tr: 'Lahana', level: 'A2', usageNote: 'Şçi çorbasının ve turşunun yıldızıdır.' },
      { id: 'wck3_5', ru: 'Помидор', reading: 'Pamidór', tr: 'Domates', level: 'A2', usageNote: 'İtalyanca "pomodoro"dan gelir.' },
      { id: 'wck3_6', ru: 'Огурец', reading: 'Aguryéts', tr: 'Salatalık', level: 'A2', usageNote: 'Turşusu (солёный огурец) Rus sofrasının klasiğidir.' },
      { id: 'wck3_7', ru: 'Мыть', reading: 'Myt\'', tr: 'Yıkamak', level: 'A2', usageNote: '"Мыть овощи" (sebze yıkamak), "мыть посуду" (bulaşık yıkamak).' },
      { id: 'wck3_8', ru: 'Чистить', reading: 'Çístit\'', tr: 'Soymak / Temizlemek', level: 'A2', usageNote: '"Чистить картошку" (patates soymak) — mutfak stajının ilk görevi.' }
    ],
    sentences: [
      { ru: 'Сначала надо мыть овощи.', tr: 'Önce sebzeleri yıkamak gerek.', scrambled: ['надо', 'Сначала', 'овощи.', 'мыть'], correct: ['Сначала', 'надо', 'мыть', 'овощи.'] },
      { ru: 'Лёша чистит картошку и плачет от лука.', tr: 'Lyosha patates soyuyor ve soğandan ağlıyor.', scrambled: ['и плачет', 'картошку', 'Лёша', 'от лука.', 'чистит'], correct: ['Лёша', 'чистит', 'картошку', 'и плачет', 'от лука.'] }
    ],
    sceneTitle: 'Soğan vs. Lyosha: 1-0',
    sceneContext: 'Lyosha\'nın ilk hazırlık görevi: bir dağ patates ve iki kilo soğan. Gözyaşları gerçek, motivasyon tartışmalı.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Лёша, чисти картошку. Потом — лук.', reading: 'Lyóşa, çísti kartóşku. Patóm — luk.', tr: 'Lyosha, patatesi soy. Sonra — soğanı.' },
      { speaker: 'Lyosha', ru: 'Шеф, я плачу! Это лук виноват!', reading: 'Şef, ya pláçu! Éta luk vinavát!', tr: 'Şef, ağlıyorum! Suçlu olan soğan!' },
      { speaker: 'Şef Pyotr', ru: 'Мой лук холодной водой. И не плачь.', reading: 'Moy luk halódnay vadóy. İ ni plaç\'.', tr: 'Soğanı soğuk suyla yıka. Ve ağlama.' },
      { speaker: 'Lyosha', ru: 'Это не слёзы, шеф. Это... эмоции!', reading: 'Éta ni slyózı, şef. Éta... emótsii!', tr: 'Bunlar gözyaşı değil, şef. Bunlar... duygular!' }
    ]
  },
  {
    id: 'mod_a2_k4',
    unitNumber: 35,
    levelGroup: 'A2',
    title: 'Ölçüler & Miktarlar',
    description: 'Gram, litre, bardak, kaşık — tarifin matematiği',
    category: 'Aşçılık',
    color: '#38bdf8',
    icon: '⚖️',
    grammarExplain: `📌 ÖLÇÜLER VE SAYILAR:
1. Ölçü + tamlayan hâli: "сто грамм сахара" (yüz gram şeker), "литр воды" (bir litre su), "стакан муки" (bir bardak un).
2. 2-3-4'ten sonra tekil tamlayan: "два стакана" (iki bardak); 5 ve üzeri çoğul tamlayan: "пять стаканов".
3. "Сколько нужно...?" (Ne kadar ... gerekli?) tarif sorusunun kalıbıdır: "Сколько нужно муки?"`,
    words: [
      { id: 'wck4_1', ru: 'Грамм', reading: 'Gram', tr: 'Gram', level: 'A2', usageNote: 'Tartıda "сто грамм" (100 gram) en sık duyulan kalıptır.' },
      { id: 'wck4_2', ru: 'Килограмм', reading: 'Kilagrám', tr: 'Kilogram', level: 'A2', usageNote: 'Günlük dilde kısaca "кило" denir.' },
      { id: 'wck4_3', ru: 'Литр', reading: 'Litr', tr: 'Litre', level: 'A2', usageNote: '"Литр молока" (bir litre süt) market klasiği.' },
      { id: 'wck4_4', ru: 'Стакан', reading: 'Stakán', tr: 'Bardak', level: 'A2', usageNote: 'Rus tariflerinin ölçü birimi: "стакан муки" (bir su bardağı un).' },
      { id: 'wck4_5', ru: 'Ложка', reading: 'Lóşka', tr: 'Kaşık', level: 'A2', usageNote: 'Столовая ложка = yemek kaşığı, чайная ложка = çay kaşığı.' },
      { id: 'wck4_6', ru: 'Кусок', reading: 'Kusók', tr: 'Parça / Dilim', level: 'A2', usageNote: '"Кусок хлеба" (bir dilim ekmek), "кусок торта" (bir dilim pasta).' },
      { id: 'wck4_7', ru: 'Немного', reading: 'Nimnóga', tr: 'Biraz', level: 'A2', usageNote: '"Немного соли" (biraz tuz) — şefin en sevdiği belirsiz ölçü.' },
      { id: 'wck4_8', ru: 'Половина', reading: 'Palavína', tr: 'Yarım / Yarısı', level: 'A2', usageNote: '"Половина стакана" (yarım bardak); kısaca "пол-" da denir: полстакана.' }
    ],
    sentences: [
      { ru: 'Сколько нужно муки для теста?', tr: 'Hamur için ne kadar un gerekli?', scrambled: ['муки', 'Сколько', 'для теста?', 'нужно'], correct: ['Сколько', 'нужно', 'муки', 'для теста?'] },
      { ru: 'Два стакана муки и половина литра молока.', tr: 'İki bardak un ve yarım litre süt.', scrambled: ['и половина', 'муки', 'Два стакана', 'литра молока.'], correct: ['Два стакана', 'муки', 'и половина', 'литра молока.'] }
    ],
    sceneTitle: 'Lyosha\'nın "Göz Kararı" Felsefesi',
    sceneContext: 'Nina tarif defteriyle hassas ölçüm yaparken Lyosha "göz kararı" ekolünü savunuyor. Şefin sabrı ölçülemiyor.',
    dialogue: [
      { speaker: 'Nina', ru: 'Рецепт: двести грамм сахара. Ровно.', reading: 'Ritsépt: dvyésti gram sáhara. Róvna.', tr: 'Tarif: iki yüz gram şeker. Tam olarak.' },
      { speaker: 'Lyosha', ru: 'Зачем? Я вижу глазами! Немного сахара — и всё.', reading: 'Zaçyém? Ya víju glazámi! Nimnóga sáhara — i fsyo.', tr: 'Niye? Ben gözle görüyorum! Biraz şeker — o kadar.' },
      { speaker: 'Nina', ru: 'В прошлый раз твоё "немного" — это был килограмм!', reading: 'F próşlıy ras tvayó "nimnóga" — éta bıl kilagrám!', tr: 'Geçen sefer senin "biraz"ın — bir kiloydu!' },
      { speaker: 'Lyosha', ru: 'И все сказали: очень вкусно!', reading: 'İ fsye skazáli: óçin\' fkúsna!', tr: 'Ve herkes dedi ki: çok lezzetli!' }
    ]
  },
  {
    id: 'mod_a2_k5',
    unitNumber: 36,
    levelGroup: 'A2',
    title: 'İlk Tarif — Kahvaltı',
    description: 'Kaşa, krep, sandviç — "hazır!" ve "lezzetli!" diyebilmek',
    category: 'Aşçılık',
    color: '#fb923c',
    icon: '🥞',
    grammarExplain: `📌 "PİŞİRMEK" FİİLLERİ (giriş):
1. Жарить = yağda/tavada kızartmak (блины жарят). Варить = suda haşlamak/pişirmek (кашу варят).
2. "Готово!" (Hazır!) — yemek bitince söylenen sihirli kelime. "Я готовлю" = pişiriyorum, "готовить" = yemek yapmak.
3. Beğenme kalıpları: "Вкусно!" (Lezzetli!), "Очень вкусно!" (Çok lezzetli!), "Объедение!" (Parmaklarını yersin!).`,
    words: [
      { id: 'wck5_1', ru: 'Завтрак', reading: 'Záftrak', tr: 'Kahvaltı', level: 'A2', usageNote: '"Что на завтрак?" (Kahvaltıda ne var?) günün ilk sorusudur.' },
      { id: 'wck5_2', ru: 'Каша', reading: 'Káşa', tr: 'Kaşa / Lapa', level: 'A2', usageNote: 'Rus kahvaltısının temeli; yulaf (овсяная) ve irmik (манная) çeşidi meşhurdur.' },
      { id: 'wck5_3', ru: 'Блины', reading: 'Blinı́', tr: 'Blini / Krep', level: 'A2', usageNote: 'Tekili блин; Maslenitsa bayramının yıldızıdır.' },
      { id: 'wck5_4', ru: 'Бутерброд', reading: 'Butırbrót', tr: 'Sandviç', level: 'A2', usageNote: 'Almanca "Butterbrot"tan gelir; üstü açık yapılır.' },
      { id: 'wck5_5', ru: 'Жарить', reading: 'Járit\'', tr: 'Kızartmak', level: 'A2', usageNote: 'Tavada pişen her şey için: "жарить блины".' },
      { id: 'wck5_6', ru: 'Варить', reading: 'Varít\'', tr: 'Haşlamak / Pişirmek', level: 'A2', usageNote: '"Варить кашу", "варить яйца" — suda pişirme fiilidir.' },
      { id: 'wck5_7', ru: 'Готово', reading: 'Gatóva', tr: 'Hazır', level: 'A2', usageNote: 'Mutfaktan salona müjde: "Всё готово!" (Her şey hazır!)' },
      { id: 'wck5_8', ru: 'Вкусно', reading: 'Fkúsna', tr: 'Lezzetli', level: 'A2', usageNote: 'В sesi F okunur; aşçıya verilecek en güzel hediye bu kelimedir.' }
    ],
    sentences: [
      { ru: 'Я варю кашу на завтрак.', tr: 'Kahvaltıya kaşa pişiriyorum.', scrambled: ['кашу', 'Я', 'на завтрак.', 'варю'], correct: ['Я', 'варю', 'кашу', 'на завтрак.'] },
      { ru: 'Блины готовы — очень вкусно!', tr: 'Krepler hazır — çok lezzetli!', scrambled: ['готовы —', 'Блины', 'вкусно!', 'очень'], correct: ['Блины', 'готовы —', 'очень', 'вкусно!'] }
    ],
    sceneTitle: 'Lyosha\'nın İlk Blini Zaferi',
    sceneContext: 'Lyosha hayatında ilk kez tek başına blini pişiriyor. İlk üç tanesi tavana yapıştı ama dördüncüsü... bir şaheser.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Шеф! Я жарю блины! Первый блин... упал.', reading: 'Şef! Ya járyu blinı́! Pyérvıy blin... upál.', tr: 'Şef! Krep pişiriyorum! İlk krep... düştü.' },
      { speaker: 'Şef Pyotr', ru: 'Первый блин комом. Это нормально. Жарь дальше!', reading: 'Pyérvıy blin kómam. Éta narmál\'na. Jar\' dál\'şe!', tr: 'İlk krep topak olur (atasözü). Bu normal. Pişirmeye devam!' },
      { speaker: 'Lyosha', ru: 'Четвёртый готов! Нина, попробуй!', reading: 'Çitvyórtıy gatóf! Nína, papróbuy!', tr: 'Dördüncü hazır! Nina, tadına bak!' },
      { speaker: 'Nina', ru: 'Хм... Вкусно! Лёша, это правда вкусно!', reading: 'Hm... Fkúsna! Lyóşa, éta právda fkúsna!', tr: 'Hmm... Lezzetli! Lyosha, bu gerçekten lezzetli!' }
    ]
  },

  // ============================ B1 ============================
  {
    id: 'mod_b1_k1',
    unitNumber: 86,
    levelGroup: 'B1',
    title: 'Pişirme Fiilleri',
    description: 'Kesmek, doğramak, karıştırmak, eklemek — mutfağın fiil çekirdeği',
    category: 'Aşçılık',
    color: '#ef4444',
    icon: '🔪',
    grammarExplain: `📌 GÖRÜNÜŞ ÇİFTLERİ MUTFAKTA (несов./сов.):
1. Резать (süreç: kesiyorum) / нарезать (sonuç: doğradım-bitti). Tarifler genelde bitmişlik (сов.) ister: "Нарежьте лук".
2. Мешать (karıştırmak-süreç) / смешать (karıştırıp birleştirmek-sonuç): "Смешайте муку и яйца".
3. Добавить her tarifin bel kemiğidir: "Добавьте соль по вкусу" (Damak tadınıza göre tuz ekleyin).`,
    words: [
      { id: 'wck6_1', ru: 'Резать', reading: 'Ryézat\'', tr: 'Kesmek', level: 'B1', usageNote: 'Süreç fiili; "острый нож хорошо режет" (keskin bıçak iyi keser).' },
      { id: 'wck6_2', ru: 'Нарезать', reading: 'Naryézat\'', tr: 'Doğramak (bitirmek)', level: 'B1', usageNote: 'Tarif emri: "Нарежьте кубиками" (küp küp doğrayın).' },
      { id: 'wck6_3', ru: 'Мешать', reading: 'Mişát\'', tr: 'Karıştırmak', level: 'B1', usageNote: 'Dikkat: aynı fiil "engel olmak" da demektir — "Не мешай!" (Karışma/engelleme!).' },
      { id: 'wck6_4', ru: 'Добавить', reading: 'Dabávit\'', tr: 'Eklemek', level: 'B1', usageNote: '"Добавить по вкусу" (damak zevkine göre eklemek) tariflerin klasiğidir.' },
      { id: 'wck6_5', ru: 'Тушить', reading: 'Tuşı́t\'', tr: 'Ağır ateşte pişirmek', level: 'B1', usageNote: 'Kapak kapalı, kısık ateş; aynı fiil "yangın söndürmek" de demektir!' },
      { id: 'wck6_6', ru: 'Печь', reading: 'Pyeç\'', tr: 'Fırında pişirmek', level: 'B1', usageNote: 'Hem fiil (pişirmek) hem isim (soba/fırın) olabilir.' },
      { id: 'wck6_7', ru: 'Разогреть', reading: 'Razagryét\'', tr: 'Isıtmak', level: 'B1', usageNote: '"Разогрейте духовку до 180 градусов" — fırın tariflerinin ilk cümlesi.' },
      { id: 'wck6_8', ru: 'Попробовать', reading: 'Papróbavat\'', tr: 'Tatmak / Denemek', level: 'B1', usageNote: 'Şefin altın kuralı: "Всегда пробуй!" (Her zaman tat!).' }
    ],
    sentences: [
      { ru: 'Нарежьте лук и добавьте его в суп.', tr: 'Soğanı doğrayın ve çorbaya ekleyin.', scrambled: ['и добавьте', 'лук', 'Нарежьте', 'его в суп.'], correct: ['Нарежьте', 'лук', 'и добавьте', 'его в суп.'] },
      { ru: 'Сначала разогрейте сковороду, потом жарьте.', tr: 'Önce tavayı ısıtın, sonra kızartın.', scrambled: ['потом жарьте.', 'разогрейте', 'Сначала', 'сковороду,'], correct: ['Сначала', 'разогрейте', 'сковороду,', 'потом жарьте.'] }
    ],
    sceneTitle: 'Bıçak Akademisi',
    sceneContext: 'Şef Pyotr, Lyosha\'ya doğrama teknikleri öğretiyor. Lyosha\'nın "küpleri" şu an daha çok soyut sanat.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Лёша, нарежь морковь кубиками. Кубиками!', reading: 'Lyóşa, naryéj markóf\' kúbikami. Kúbikami!', tr: 'Lyosha, havucu küp küp doğra. Küp küp!' },
      { speaker: 'Lyosha', ru: 'Шеф, это и есть кубики! Просто... творческие.', reading: 'Şef, éta i yest\' kúbiki! Prósta... tvórçiskiye.', tr: 'Şef, bunlar zaten küp! Sadece... yaratıcı küpler.' },
      { speaker: 'Şef Pyotr', ru: 'Это не кубики, это абстракция. Смотри: держи нож так и режь медленно.', reading: 'Éta ni kúbiki, éta abstráktsiya. Smatrí: dirjí noş tak i ryeş myédlinna.', tr: 'Bunlar küp değil, soyutlama. Bak: bıçağı böyle tut ve yavaş kes.' },
      { speaker: 'Lyosha', ru: 'О! Получается! Я — художник ножа!', reading: 'O! Paluçáyitsa! Ya — hudójnik najá!', tr: 'O! Oluyor! Ben — bıçağın ressamıyım!' }
    ]
  },
  {
    id: 'mod_b1_k2',
    unitNumber: 87,
    levelGroup: 'B1',
    title: 'Tarif Okuma — Adım Adım',
    description: '"Önce... sonra... ardından" — bir tarifi baştan sona takip etmek',
    category: 'Aşçılık',
    color: '#a78bfa',
    icon: '📖',
    grammarExplain: `📌 TARİFİN SIRA BAĞLAÇLARI:
1. Сначала (önce) → потом (sonra) → затем (ardından) → в конце (en sonunda). Bu dörtlü her tarifin iskeletidir.
2. Tarif emirleri -те ile biter (siz kipi): "Смешайте, добавьте, варите 20 минут".
3. "Довести до кипения" (kaynama noktasına getirmek) ve "на медленном огне" (kısık ateşte) — tariflerin iki klasik kalıbı.`,
    words: [
      { id: 'wck7_1', ru: 'Рецепт', reading: 'Ritsépt', tr: 'Tarif', level: 'B1', usageNote: 'Hem yemek tarifi hem doktor reçetesi anlamındadır.' },
      { id: 'wck7_2', ru: 'Сначала', reading: 'Snaçála', tr: 'Önce / İlk olarak', level: 'B1', usageNote: 'Her tarifin ilk kelimesi.' },
      { id: 'wck7_3', ru: 'Затем', reading: 'Zatyém', tr: 'Ardından', level: 'B1', usageNote: '"Потом"un biraz daha resmî kardeşi; yazılı tariflerde sık geçer.' },
      { id: 'wck7_4', ru: 'Смешать', reading: 'Smişát\'', tr: 'Karıştırıp birleştirmek', level: 'B1', usageNote: '"Смешайте все ингредиенты" (tüm malzemeleri karıştırın).' },
      { id: 'wck7_5', ru: 'Кипеть', reading: 'Kipyét\'', tr: 'Kaynamak', level: 'B1', usageNote: '"Вода кипит" (su kaynıyor); "довести до кипения" = kaynatana kadar ısıtmak.' },
      { id: 'wck7_6', ru: 'Огонь', reading: 'Agón\'', tr: 'Ateş', level: 'B1', usageNote: '"На медленном огне" (kısık ateşte), "на сильном огне" (harlı ateşte).' },
      { id: 'wck7_7', ru: 'Крышка', reading: 'Krı́şka', tr: 'Kapak', level: 'B1', usageNote: '"Накройте крышкой" (kapağını kapatın) — tuşlamanın (тушить) şartı.' },
      { id: 'wck7_8', ru: 'Минута', reading: 'Minúta', tr: 'Dakika', level: 'B1', usageNote: '"Варите двадцать минут" (yirmi dakika pişirin) — süre hep tamlayanla.' }
    ],
    sentences: [
      { ru: 'Сначала смешайте муку и яйца, затем добавьте молоко.', tr: 'Önce unu ve yumurtaları karıştırın, ardından sütü ekleyin.', scrambled: ['затем добавьте', 'муку и яйца,', 'Сначала', 'молоко.', 'смешайте'], correct: ['Сначала', 'смешайте', 'муку и яйца,', 'затем добавьте', 'молоко.'] },
      { ru: 'Варите суп двадцать минут на медленном огне.', tr: 'Çorbayı kısık ateşte yirmi dakika pişirin.', scrambled: ['двадцать минут', 'Варите', 'на медленном огне.', 'суп'], correct: ['Варите', 'суп', 'двадцать минут', 'на медленном огне.'] }
    ],
    sceneTitle: 'Tarif Defteri Kutsal Kitaptır',
    sceneContext: 'Nina, büyükannesinin el yazısı tarif defterini mutfağa getirmiştir. Lyosha "ben tarif okumam, hissederim" diyor. Sonuç: tartışma.',
    dialogue: [
      { speaker: 'Nina', ru: 'Читай рецепт: сначала — тесто, затем — начинка.', reading: 'Çitáy ritsépt: snaçála — tyésta, zatyém — naçínka.', tr: 'Tarifi oku: önce — hamur, ardından — iç harç.' },
      { speaker: 'Lyosha', ru: 'Я не читаю рецепты. Я чувствую кухню сердцем!', reading: 'Ya ni çitáyu ritséptı. Ya çústvuyu kúhnyu syértsem!', tr: 'Ben tarif okumam. Mutfağı kalbimle hissederim!' },
      { speaker: 'Nina', ru: 'Твоё сердце в прошлый раз забыло сахар.', reading: 'Tvayó syértse f próşlıy ras zabı́la sáhar.', tr: 'Senin kalbin geçen sefer şekeri unuttu.' },
      { speaker: 'Lyosha', ru: 'Ладно. Сначала тесто. Я читаю, читаю!', reading: 'Ládna. Snaçála tyésta. Ya çitáyu, çitáyu!', tr: 'Tamam. Önce hamur. Okuyorum, okuyorum!' }
    ]
  },
  {
    id: 'mod_b1_k3',
    unitNumber: 88,
    levelGroup: 'B1',
    title: 'Çorbalar — Borşç & Şçi',
    description: 'Et suyu, pancar, smetana — Rus çorba kültürünün iki efsanesi',
    category: 'Aşçılık',
    color: '#dc2626',
    icon: '🍲',
    grammarExplain: `📌 ÇORBA SOFRASI KALIPLARI:
1. "Суп со сметаной" (smetanalı çorba) — С + araç hâli (Творительный): borşç smetanasız düşünülemez.
2. "Налить суп" (çorba koymak/dökmek): "Налей мне тарелку борща" (Bana bir tabak borşç koy).
3. Tat yorumları: "наваристый" (yoğun/özlü), "горячий" (sıcak), "как у бабушки" (büyükanneninki gibi) — en büyük övgü.`,
    words: [
      { id: 'wck8_1', ru: 'Борщ', reading: 'Borşç', tr: 'Borşç (pancar çorbası)', level: 'B1', usageNote: 'Kırmızı rengini pancardan alır; smetana ile servis edilir.' },
      { id: 'wck8_2', ru: 'Щи', reading: 'Şçi', tr: 'Şçi (lahana çorbası)', level: 'B1', usageNote: 'Rusya\'nın en eski çorbası; "Щи да каша — пища наша" atasözü meşhurdur.' },
      { id: 'wck8_3', ru: 'Бульон', reading: 'Bul\'ón', tr: 'Et suyu', level: 'B1', usageNote: 'İyi çorbanın sırrı; saatlerce kısık ateşte kaynar.' },
      { id: 'wck8_4', ru: 'Свёкла', reading: 'Svyókla', tr: 'Pancar', level: 'B1', usageNote: 'Ё her zaman vurguludur: svyókla. Borşçun kimliğidir.' },
      { id: 'wck8_5', ru: 'Сметана', reading: 'Smitána', tr: 'Smetana (ekşi krema)', level: 'B1', usageNote: 'Çorbaya bir kaşık atılır; Rus mutfağının beyaz altını.' },
      { id: 'wck8_6', ru: 'Укроп', reading: 'Ukróp', tr: 'Dereotu', level: 'B1', usageNote: 'Rus mutfağında her şeyin üstüne serpilir. Her şeyin.' },
      { id: 'wck8_7', ru: 'Налить', reading: 'Nalít\'', tr: 'Dökmek / Koymak (sıvı)', level: 'B1', usageNote: '"Налить суп в тарелку" (çorbayı tabağa koymak).' },
      { id: 'wck8_8', ru: 'Наваристый', reading: 'Navárist\u0131y', tr: 'Özlü / Yoğun (çorba)', level: 'B1', usageNote: 'İyi pişmiş et suyunun övgü sıfatı.' }
    ],
    sentences: [
      { ru: 'Борщ со сметаной — это классика.', tr: 'Smetanalı borşç — bu bir klasiktir.', scrambled: ['— это', 'со сметаной', 'Борщ', 'классика.'], correct: ['Борщ', 'со сметаной', '— это', 'классика.'] },
      { ru: 'Бульон должен кипеть на медленном огне два часа.', tr: 'Et suyu kısık ateşte iki saat kaynamalı.', scrambled: ['должен кипеть', 'два часа.', 'Бульон', 'на медленном огне'], correct: ['Бульон', 'должен кипеть', 'на медленном огне', 'два часа.'] }
    ],
    sceneTitle: 'Borşç Sınavı',
    sceneContext: 'Şef Pyotr\'un ünlü borşç testi: Lyosha ilk kez tek başına borşç pişirdi. Şef tadıyor... mutfak nefesini tuttu.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Так. Цвет — хороший. Запах — хороший. Пробую.', reading: 'Tak. Tsvyet — haróşiy. Zápah — haróşiy. Próbuyu.', tr: 'Evet. Renk — iyi. Koku — iyi. Tadıyorum.' },
      { speaker: 'Lyosha', ru: 'Шеф, я варил бульон три часа! Как бабушка учила!', reading: 'Şef, ya varíl bul\'ón tri çisá! Kak bábuşka uçíla!', tr: 'Şef, et suyunu üç saat kaynattım! Büyükannemin öğrettiği gibi!' },
      { speaker: 'Şef Pyotr', ru: '...Наваристый. Добавь сметану и укроп. Это... хороший борщ, Лёша.', reading: '...Navárist\u0131y. Dabáf\' smitánu i ukróp. Éta... haróşiy borşç, Lyóşa.', tr: '...Özlü olmuş. Smetana ve dereotu ekle. Bu... iyi bir borşç, Lyosha.' },
      { speaker: 'Nina', ru: 'Лёша, он улыбается. Запомни этот день.', reading: 'Lyóşa, on ulıbáyitsa. Zapómni état dyen\'.', tr: 'Lyosha, gülümsüyor. Bu günü aklına yaz.' }
    ]
  },
  {
    id: 'mod_b1_k4',
    unitNumber: 89,
    levelGroup: 'B1',
    title: 'Hamur İşleri — Blini & Pirojki',
    description: 'Hamur, maya, iç harç — oklava ile tanışma vakti',
    category: 'Aşçılık',
    color: '#eab308',
    icon: '🥟',
    grammarExplain: `📌 HAMUR SÖZLÜĞÜ:
1. Тесто (hamur) tekildir ve nötrdür: "тесто поднимается" (hamur kabarıyor) — mayalı hamurun mucizesi.
2. Начинка (iç harç) + С: "пирожки с капустой" (lahanalı pirojki), "с мясом" (etli), "с яблоками" (elmalı).
3. Раскатать тесто (hamuru açmak), лепить (şekil vermek) — el işçiliğinin iki fiili.`,
    words: [
      { id: 'wck9_1', ru: 'Тесто', reading: 'Tyésta', tr: 'Hamur', level: 'B1', usageNote: '"Тесто поднялось!" (Hamur kabardı!) — mutfağın küçük bayramı.' },
      { id: 'wck9_2', ru: 'Дрожжи', reading: 'Drójji', tr: 'Maya', level: 'B1', usageNote: 'Hep çoğul kullanılır; hamurun canlı motoru.' },
      { id: 'wck9_3', ru: 'Начинка', reading: 'Naçínka', tr: 'İç harç / Dolgu', level: 'B1', usageNote: 'Pirojkinin ruhu: lahana, et, elma, patates...' },
      { id: 'wck9_4', ru: 'Пирожки', reading: 'Pirajkí', tr: 'Pirojki (içli poğaça)', level: 'B1', usageNote: 'Tekili пирожок; büyük hâli пирог (turta).' },
      { id: 'wck9_5', ru: 'Раскатать', reading: 'Raskatát\'', tr: 'Hamur açmak', level: 'B1', usageNote: '"Раскатайте тесто скалкой" (hamuru oklavayla açın).' },
      { id: 'wck9_6', ru: 'Скалка', reading: 'Skálka', tr: 'Oklava', level: 'B1', usageNote: 'Rus mutfak komedilerinin klasik "silahı".' },
      { id: 'wck9_7', ru: 'Лепить', reading: 'Lipít\'', tr: 'Şekil vermek / Yoğurup kapatmak', level: 'B1', usageNote: '"Лепить пирожки/пельмени" — aile boyu yapılan ritüel.' },
      { id: 'wck9_8', ru: 'Духовка', reading: 'Duhófka', tr: 'Fırın', level: 'B1', usageNote: '"Поставить в духовку" (fırına vermek); duhófka okunur.' }
    ],
    sentences: [
      { ru: 'Раскатайте тесто и положите начинку.', tr: 'Hamuru açın ve iç harcı koyun.', scrambled: ['и положите', 'тесто', 'Раскатайте', 'начинку.'], correct: ['Раскатайте', 'тесто', 'и положите', 'начинку.'] },
      { ru: 'Пирожки с капустой пекутся в духовке двадцать минут.', tr: 'Lahanalı pirojki fırında yirmi dakika pişer.', scrambled: ['пекутся в духовке', 'Пирожки', 'двадцать минут.', 'с капустой'], correct: ['Пирожки', 'с капустой', 'пекутся в духовке', 'двадцать минут.'] }
    ],
    sceneTitle: 'Pirojki Fabrikası',
    sceneContext: 'Büyük sipariş: yarına 200 pirojki. Bütün ekip masada hamur açıyor; Lyosha\'nın pirojkileri nedense hep "modern sanat" oluyor.',
    dialogue: [
      { speaker: 'Nina', ru: 'Лёша, лепи аккуратно! Начинка не должна убегать.', reading: 'Lyóşa, lipí akurátna! Naçínka ni daljná ubigát\'.', tr: 'Lyosha, düzgün kapat! İç harç kaçmamalı.' },
      { speaker: 'Lyosha', ru: 'Моя начинка не убегает. Она... исследует мир.', reading: 'Mayá naçínka ni ubigáyit. Aná... islyéduyit mir.', tr: 'Benim iç harcım kaçmıyor. O... dünyayı keşfediyor.' },
      { speaker: 'Şef Pyotr', ru: 'Раскатай тесто тоньше и лепи как я: раз, два — готово.', reading: 'Raskatáy tyésta tón\'şe i lipí kak ya: ras, dva — gatóva.', tr: 'Hamuru daha ince aç ve benim gibi kapat: bir, iki — tamam.' },
      { speaker: 'Lyosha', ru: 'Раз, два... О! Красиво! Двести штук — легко!', reading: 'Ras, dva... O! Krasíva! Dvyésti ştuk — lihkó!', tr: 'Bir, iki... O! Güzel! İki yüz tane — çocuk oyuncağı!' }
    ]
  },
  {
    id: 'mod_b1_k5',
    unitNumber: 90,
    levelGroup: 'B1',
    title: 'Salatalar & Mezeler',
    description: 'Olivye, vinegret, zakuska — bayram sofrasının açılış takımı',
    category: 'Aşçılık',
    color: '#22c55e',
    icon: '🥗',
    grammarExplain: `📌 SALATA & MEZE KALIPLARI:
1. Заправить салат (salatayı soslamak): "заправить майонезом/маслом" — С\'siz, araç hâliyle söylenir.
2. Нарезать кубиками (küp küp doğramak) — Olivye\'nin tek geometrisi budur.
3. Закуска (meze) kelimesi "закусить" (atıştırmak) fiilinden gelir; çoğulu закуски bayram sofrasını açar.`,
    words: [
      { id: 'wck10_1', ru: 'Салат', reading: 'Salát', tr: 'Salata', level: 'B1', usageNote: 'Hem yemek hem marul anlamına gelir.' },
      { id: 'wck10_2', ru: 'Оливье', reading: 'Aliv\'yé', tr: 'Olivye salatası', level: 'B1', usageNote: 'Yılbaşı sofrasının değişmez kraliçesi; Fransız şef Olivier\'den adını alır.' },
      { id: 'wck10_3', ru: 'Винегрет', reading: 'Vinigryét', tr: 'Vinegret (pancarlı salata)', level: 'B1', usageNote: 'Pancarlı, mor renkli halk klasiği.' },
      { id: 'wck10_4', ru: 'Закуска', reading: 'Zakúska', tr: 'Meze / Ordövr', level: 'B1', usageNote: 'Ana yemekten önce gelen her şey: turşu, salata, balık...' },
      { id: 'wck10_5', ru: 'Майонез', reading: 'Mayanés', tr: 'Mayonez', level: 'B1', usageNote: 'Rus mutfağının (tartışmalı) millî sosu.' },
      { id: 'wck10_6', ru: 'Заправить', reading: 'Zaprávit\'', tr: 'Soslamak / Sos katmak', level: 'B1', usageNote: '"Заправить салат маслом" (salatayı yağla soslamak).' },
      { id: 'wck10_7', ru: 'Кубик', reading: 'Kúbik', tr: 'Küp (doğrama)', level: 'B1', usageNote: '"Нарезать кубиками" — Olivye\'nin anayasası.' },
      { id: 'wck10_8', ru: 'Праздничный', reading: 'Prázniçn\u0131y', tr: 'Bayramlık / Şölen-', level: 'B1', usageNote: '"Праздничный стол" (bayram sofrası); Д okunmaz: "prázniçn\u0131y".' }
    ],
    sentences: [
      { ru: 'Нарежьте всё кубиками и заправьте майонезом.', tr: 'Her şeyi küp küp doğrayın ve mayonezle soslayın.', scrambled: ['кубиками', 'Нарежьте', 'майонезом.', 'всё', 'и заправьте'], correct: ['Нарежьте', 'всё', 'кубиками', 'и заправьте', 'майонезом.'] },
      { ru: 'Без оливье праздничный стол не праздничный.', tr: 'Olivye olmadan bayram sofrası bayram sofrası değildir.', scrambled: ['праздничный стол', 'Без оливье', 'не праздничный.'], correct: ['Без оливье', 'праздничный стол', 'не праздничный.'] }
    ],
    sceneTitle: 'Olivye Anayasası',
    sceneContext: 'Yılbaşı menüsü hazırlanıyor. Lyosha, Olivye\'ye "modern bir dokunuş" (avokado!) eklemeyi önerince mutfakta anayasa krizi çıkıyor.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'А давайте добавим в оливье авокадо! Это модно!', reading: 'A daváyte dabávim v aliv\'yé avakáda! Éta módna!', tr: 'Hadi Olivye\'ye avokado ekleyelim! Bu moda!' },
      { speaker: 'Şef Pyotr', ru: 'Авокадо?! В оливье?! Лёша, это не салат, это преступление.', reading: 'Avakáda?! V aliv\'yé?! Lyóşa, éta ni salát, éta pristupléniye.', tr: 'Avokado mu?! Olivye\'ye mi?! Lyosha, bu salata değil, bu bir suç.' },
      { speaker: 'Nina', ru: 'Рецепт классический: картошка, морковь, яйца, майонез. Точка.', reading: 'Ritsépt klasíçiskiy: kartóşka, markóf\', yáytsa, mayanés. Tóçka.', tr: 'Tarif klasiktir: patates, havuç, yumurta, mayonez. Nokta.' },
      { speaker: 'Lyosha', ru: 'Ладно, ладно. Но кубики нарежу я. Я теперь мастер кубиков!', reading: 'Ládna, ládna. No kúbiki naryéju ya. Ya tipyér\' mástir kúbikaf!', tr: 'Tamam, tamam. Ama küpleri ben doğrayacağım. Artık küp ustasıyım!' }
    ]
  },
  {
    id: 'mod_b1_k6',
    unitNumber: 91,
    levelGroup: 'B1',
    title: 'Mutfak Kazaları & Kurtarma',
    description: '"Tuzu fazla kaçırdım!", "Dibi tuttu!" — felaketi yemeğe çevirme sanatı',
    category: 'Aşçılık',
    color: '#f97316',
    icon: '🧯',
    grammarExplain: `📌 MUTFAK FELAKETLERİ DİLİ:
1. Пересолить = tuzu fazla kaçırmak. Efsane deyim: "Пересолила — значит, влюбилась!" (Tuzu kaçırdıysa âşık olmuş demektir!)
2. Подгореть (dibi tutmak/hafif yanmak): "Каша подгорела" — özne yemektir, suçlu ise genelde telefon.
3. Kurtarma kalıpları: "Можно исправить" (düzeltilebilir), "Не беда" (dert değil), "Начнём заново" (baştan başlayalım).`,
    words: [
      { id: 'wck11_1', ru: 'Пересолить', reading: 'Pirisalít\'', tr: 'Tuzu fazla kaçırmak', level: 'B1', usageNote: '"Пере-" öneki "fazla" demektir: пережарить (fazla kızartmak) da böyle kurulur.' },
      { id: 'wck11_2', ru: 'Подгореть', reading: 'Padgaryét\'', tr: 'Dibi tutmak / Hafif yanmak', level: 'B1', usageNote: '"Блины подгорели" (krepler yandı) — ilk blini dramı.' },
      { id: 'wck11_3', ru: 'Сырой', reading: 'S\u0131róy', tr: 'Çiğ / Pişmemiş', level: 'B1', usageNote: '"Курица сырая внутри!" (Tavuk içi çiğ!) — mutfak korku filmi repliği.' },
      { id: 'wck11_4', ru: 'Спасти', reading: 'Spastí', tr: 'Kurtarmak', level: 'B1', usageNote: '"Спасти суп" (çorbayı kurtarmak) — bir patates çoğu tuz felaketini çözer.' },
      { id: 'wck11_5', ru: 'Исправить', reading: 'İsprávit\'', tr: 'Düzeltmek', level: 'B1', usageNote: '"Всё можно исправить" (her şey düzeltilebilir) — şef felsefesi.' },
      { id: 'wck11_6', ru: 'Заново', reading: 'Zánava', tr: 'Baştan / Yeniden', level: 'B1', usageNote: '"Начать заново" (baştan başlamak) — bazen tek çıkış yolu.' },
      { id: 'wck11_7', ru: 'Не беда', reading: 'Ni bidá', tr: 'Dert değil / Sorun değil', level: 'B1', usageNote: 'Moral kalıbı: "Подгорело? Не беда!"' },
      { id: 'wck11_8', ru: 'Получилось', reading: 'Paluçílas\'', tr: 'Oldu / Başardık', level: 'B1', usageNote: 'Mutfağın zafer çığlığı: "У меня получилось!" (Başardım!)' }
    ],
    sentences: [
      { ru: 'Я пересолил суп, но его можно спасти.', tr: 'Çorbanın tuzunu fazla kaçırdım ama kurtarılabilir.', scrambled: ['суп,', 'Я пересолил', 'спасти.', 'но его можно'], correct: ['Я пересолил', 'суп,', 'но его можно', 'спасти.'] },
      { ru: 'Не беда! Начнём заново — и всё получится.', tr: 'Dert değil! Baştan başlayalım — her şey olacak.', scrambled: ['Начнём заново —', 'Не беда!', 'получится.', 'и всё'], correct: ['Не беда!', 'Начнём заново —', 'и всё', 'получится.'] }
    ],
    sceneTitle: 'Tuz Felaketi ve Patates Mucizesi',
    sceneContext: 'Lyosha telefonda konuşurken çorbaya iki kez tuz attı. Nina panikte, ama Şef Pyotr\'un gizli silahı var: bir adet çiğ patates.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Катастрофа! Я пересолил борщ! Дважды!', reading: 'Katastrófa! Ya pirisalíl borşç! Dvájd\u0131!', tr: 'Felaket! Borşçun tuzunu fazla kaçırdım! İki kez!' },
      { speaker: 'Nina', ru: 'Дважды?! Как можно солить суп и говорить по телефону?!', reading: 'Dvájd\u0131?! Kak mójna salít\' sup i gavarít\' pa tilifónu?!', tr: 'İki kez mi?! İnsan nasıl hem çorba tuzlar hem telefonla konuşur?!' },
      { speaker: 'Şef Pyotr', ru: 'Спокойно. Клади сырую картошку в кастрюлю. Она заберёт соль.', reading: 'Spakóyna. Kladí s\u0131rúyu kartóşku f kastryúlyu. Aná zabiryót sol\'.', tr: 'Sakin. Tencereye çiğ patates koy. Tuzu o çekecek.' },
      { speaker: 'Lyosha', ru: 'Получилось! Шеф, вы волшебник! Картошка-герой!', reading: 'Paluçílas\'! Şef, v\u0131 valşébnik! Kartóşka-giróy!', tr: 'Oldu! Şef, siz bir sihirbazsınız! Kahraman patates!' }
    ]
  },

  // ============================ B2 ============================
  {
    id: 'mod_b2_k1',
    unitNumber: 135,
    levelGroup: 'B2',
    title: 'Et & Balık Teknikleri',
    description: 'Marine etmek, fırınlamak, pişirme derecesi — proteinin ustalık sınıfı',
    category: 'Aşçılık',
    color: '#b91c1c',
    icon: '🥩',
    grammarExplain: `📌 ET USTALIĞI DİLİ:
1. Мариновать (marine etmek) / замариновать (marine edip bitirmek): "Замаринуйте мясо на ночь" (Eti gece boyu marine edin).
2. Прожарка (pişme derecesi) restoran sorusudur: "Какая прожарка?" — "Средняя" (orta/medium).
3. Запекать в духовке (fırında pişirmek) ≠ жарить (tavada kızartmak) — ikisini karıştıran, şefin bakışıyla tanışır.`,
    words: [
      { id: 'wck12_1', ru: 'Мариновать', reading: 'Marinavát\'', tr: 'Marine etmek', level: 'B2', usageNote: 'Şaşlık (шашлык) kültürünün ilk ve en tartışmalı adımı.' },
      { id: 'wck12_2', ru: 'Запекать', reading: 'Zapikát\'', tr: 'Fırında pişirmek', level: 'B2', usageNote: '"Запечённая рыба" (fırınlanmış balık) menülerin klasiği.' },
      { id: 'wck12_3', ru: 'Прожарка', reading: 'Prajárka', tr: 'Pişme derecesi', level: 'B2', usageNote: 'С кровью (az pişmiş), средняя (orta), полная (tam pişmiş).' },
      { id: 'wck12_4', ru: 'Стейк', reading: 'Steyk', tr: 'Biftek / Steak', level: 'B2', usageNote: 'İngilizceden geçmiştir; э harfiyle yazılır.' },
      { id: 'wck12_5', ru: 'Филе', reading: 'Filé', tr: 'Fileto', level: 'B2', usageNote: 'Çekimsizdir (hiç değişmez): из филе, с филе...' },
      { id: 'wck12_6', ru: 'Специи', reading: 'Spétsii', tr: 'Baharatlar', level: 'B2', usageNote: 'Tekili специя; "не жалей специй" (baharattan kaçınma) usta öğüdüdür.' },
      { id: 'wck12_7', ru: 'Сочный', reading: 'Sóçn\u0131y', tr: 'Sulu / Yumuşacık', level: 'B2', usageNote: 'Etin en büyük övgüsü: "сочный стейк".' },
      { id: 'wck12_8', ru: 'Отдыхать', reading: 'Atd\u0131hát\'', tr: 'Dinlenmek (et için de!)', level: 'B2', usageNote: 'Profesyonel sır: "Мясо должно отдохнуть" (Et dinlenmeli) — kesmeden önce 5 dakika.' }
    ],
    sentences: [
      { ru: 'Замаринуйте мясо на ночь со специями.', tr: 'Eti baharatlarla gece boyu marine edin.', scrambled: ['мясо', 'Замаринуйте', 'со специями.', 'на ночь'], correct: ['Замаринуйте', 'мясо', 'на ночь', 'со специями.'] },
      { ru: 'После жарки мясо должно отдохнуть пять минут.', tr: 'Kızartmadan sonra et beş dakika dinlenmeli.', scrambled: ['мясо', 'После жарки', 'пять минут.', 'должно отдохнуть'], correct: ['После жарки', 'мясо', 'должно отдохнуть', 'пять минут.'] }
    ],
    sceneTitle: 'Steak Diplomasisi',
    sceneContext: 'VIP masa "tam pişmiş ama sulu" steak istiyor — fizik kurallarına aykırı bir sipariş. Şef Pyotr\'un yüzü, mutfağın hava durumu raporu.',
    dialogue: [
      { speaker: 'Nina', ru: 'Столик семь просит стейк полной прожарки. Но сочный.', reading: 'Stólik syem\' prósit steyk pólnay prajárki. No sóçn\u0131y.', tr: 'Yedi numaralı masa tam pişmiş steak istiyor. Ama sulu.' },
      { speaker: 'Şef Pyotr', ru: 'Полная прожарка И сочный?! Это как холодный кипяток!', reading: 'Pólnaya prajárka İ sóçn\u0131y?! Éta kak halódn\u0131y kipitók!', tr: 'Tam pişmiş VE sulu mu?! Bu soğuk kaynar su gibi bir şey!' },
      { speaker: 'Lyosha', ru: 'Шеф, а если запекать медленно и дать мясу отдохнуть?', reading: 'Şef, a yésli zapikát\' myédlinna i dat\' myásu atdahnút\'?', tr: 'Şef, ya yavaş fırınlar ve eti dinlendirirsek?' },
      { speaker: 'Şef Pyotr', ru: '...Лёша. Иногда ты меня удивляешь. Делаем так!', reading: '...Lyóşa. İnagdá t\u0131 minyá udivlyáyeş. Dyélayem tak!', tr: '...Lyosha. Bazen beni şaşırtıyorsun. Öyle yapıyoruz!' }
    ]
  },
  {
    id: 'mod_b2_k2',
    unitNumber: 136,
    levelGroup: 'B2',
    title: 'Fırıncılık & Tatlılar',
    description: 'Medovik, krem, çırpmak, süslemek — tatlı departmanının incelikleri',
    category: 'Aşçılık',
    color: '#f472b6',
    icon: '🍰',
    grammarExplain: `📌 PASTACILIK DİLİ:
1. Взбить (çırpmak): "взбить сливки/белки" (krema/yumurta akı çırpmak) — pastacılığın kol kası.
2. Украсить (süslemek) + araç hâli: "украсить ягодами" (meyvelerle süslemek), "украсить кремом".
3. Küçültme ekleri tatlıda zirve yapar: тортик (pastacık), кусочек (dilimcik) — "ещё кусочек?" (bir dilimcik daha?).`,
    words: [
      { id: 'wck13_1', ru: 'Выпечка', reading: 'V\u0131́piçka', tr: 'Fırın işleri / Hamur tatlıları', level: 'B2', usageNote: 'Fırından çıkan her şeyin ortak adı: "домашняя выпечка" (ev yapımı).' },
      { id: 'wck13_2', ru: 'Торт', reading: 'Tort', tr: 'Pasta', level: 'B2', usageNote: 'Doğum gününün baş kahramanı.' },
      { id: 'wck13_3', ru: 'Медовик', reading: 'Midavík', tr: 'Medovik (ballı kat pastası)', level: 'B2', usageNote: '"Мёд" (bal) kökünden; Rus pastanelerinin efsanesi.' },
      { id: 'wck13_4', ru: 'Взбить', reading: 'Vzbit\'', tr: 'Çırpmak', level: 'B2', usageNote: '"Взбейте белки в пену" (akları köpük olana dek çırpın).' },
      { id: 'wck13_5', ru: 'Крем', reading: 'Krem', tr: 'Krema', level: 'B2', usageNote: 'Katları birleştiren diplomat.' },
      { id: 'wck13_6', ru: 'Ваниль', reading: 'Vaníl\'', tr: 'Vanilya', level: 'B2', usageNote: 'Dişildir; kokusu bütün mutfağı ele geçirir.' },
      { id: 'wck13_7', ru: 'Украсить', reading: 'Ukrásit\'', tr: 'Süslemek', level: 'B2', usageNote: 'Pastanın son ve en fotoğraflık adımı.' },
      { id: 'wck13_8', ru: 'Кусочек', reading: 'Kusóçik', tr: 'Dilimcik', level: 'B2', usageNote: '"Ну ещё один кусочек!" (Haydi bir dilimcik daha!) — diyetin resmî sonu.' }
    ],
    sentences: [
      { ru: 'Взбейте крем и украсьте торт ягодами.', tr: 'Kremayı çırpın ve pastayı meyvelerle süsleyin.', scrambled: ['крем', 'Взбейте', 'ягодами.', 'и украсьте торт'], correct: ['Взбейте', 'крем', 'и украсьте торт', 'ягодами.'] },
      { ru: 'Медовик должен ночь стоять в холодильнике.', tr: 'Medovik bir gece buzdolabında beklemeli.', scrambled: ['должен', 'Медовик', 'в холодильнике.', 'ночь стоять'], correct: ['Медовик', 'должен', 'ночь стоять', 'в холодильнике.'] }
    ],
    sceneTitle: 'Medovik Operasyonu',
    sceneContext: 'Nina\'nın doğum günü yarın. Şef Pyotr gizlice medovik yapıyor; Lyosha "yardım" ediyor — yani kremayı kaşıklıyor.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Тише! Это сюрприз. Взбей крем, а я делаю коржи.', reading: 'Tíşe! Éta syurprís. Vzbyey krem, a ya dyélayu karjí.', tr: 'Sessiz! Bu bir sürpriz. Kremayı çırp, ben katları yapıyorum.' },
      { speaker: 'Lyosha', ru: 'Крем готов! Я только... проверил вкус. Восемь раз.', reading: 'Krem gatóf! Ya tól\'ka... pravyéril fkus. Vósim\' ras.', tr: 'Krema hazır! Ben sadece... tadını kontrol ettim. Sekiz kez.' },
      { speaker: 'Şef Pyotr', ru: 'Восемь?! Лёша! Ладно. Украсим ягодами — и в холодильник.', reading: 'Vósim\'?! Lyóşa! Ládna. Ukrásim yágadami — i f haladíl\'nik.', tr: 'Sekiz mi?! Lyosha! Neyse. Meyvelerle süsleyelim — ve buzdolabına.' },
      { speaker: 'Nina', ru: '(на следующий день) Медовик?! Для меня?! Вы... вы лучшие.', reading: '(na slyéduyuşşiy dyen\') Midavík?! Dlya minyá?! V\u0131... v\u0131 lúçşiye.', tr: '(ertesi gün) Medovik mi?! Benim için mi?! Siz... siz harikasınız.' }
    ]
  },
  {
    id: 'mod_b2_k3',
    unitNumber: 137,
    levelGroup: 'B2',
    title: 'Turşu & Kışlık Konserve',
    description: 'Kavanoz, salamura, reçel — Rus balkonlarının altın stoku',
    category: 'Aşçılık',
    color: '#65a30d',
    icon: '🥒',
    grammarExplain: `📌 KIŞLIK HAZIRLIK (заготовки) DİLİ:
1. Солить/квасить: солёные огурцы (salamura salatalık), квашеная капуста (lahana turşusu) — fermantasyon millî spordur.
2. Закатать банку = kavanozun kapağını makineyle kapatmak; "закатки" bütün kışlık stokun adıdır.
3. Варенье (reçel) çayla içilir, ekmeğe sürülmez — kültürel detay: kaşıkla, küçük tabakta (розетка) servis edilir.`,
    words: [
      { id: 'wck14_1', ru: 'Соленья', reading: 'Salyén\'ya', tr: 'Turşular / Salamuralar', level: 'B2', usageNote: 'Bütün tuzlanmış kışlıkların ortak adı.' },
      { id: 'wck14_2', ru: 'Банка', reading: 'Bánka', tr: 'Kavanoz', level: 'B2', usageNote: '"Трёхлитровая банка" (3 litrelik kavanoz) balkonların klasiği.' },
      { id: 'wck14_3', ru: 'Квасить', reading: 'Kvásit\'', tr: 'Fermente etmek', level: 'B2', usageNote: '"Квашеная капуста" C vitamini deposu kabul edilir.' },
      { id: 'wck14_4', ru: 'Варенье', reading: 'Varyén\'ye', tr: 'Reçel', level: 'B2', usageNote: 'Vişne (вишнёвое) ve ahududu (малиновое) en itibarlılarıdır; hasta olunca ilaç sayılır.' },
      { id: 'wck14_5', ru: 'Закатать', reading: 'Zakatát\'', tr: 'Kavanoz kapatmak (konserve)', level: 'B2', usageNote: 'Ağustos sonu bütün mutfaklar bu fiille yaşar.' },
      { id: 'wck14_6', ru: 'Погреб', reading: 'Pógryip', tr: 'Kiler / Mahzen', level: 'B2', usageNote: 'Dação olanın gururla gösterdiği yer altı hazine odası.' },
      { id: 'wck14_7', ru: 'Запас', reading: 'Zapás', tr: 'Stok / Erzak', level: 'B2', usageNote: '"Запасы на зиму" (kışlık erzak) — babuşka ekonomisinin temeli.' },
      { id: 'wck14_8', ru: 'Урожай', reading: 'Urajáy', tr: 'Hasat / Mahsul', level: 'B2', usageNote: '"Богатый урожай" (bereketli hasat) dacha sezonunun zafer raporudur.' }
    ],
    sentences: [
      { ru: 'Бабушка закатала тридцать банок огурцов.', tr: 'Büyükanne otuz kavanoz salatalık turşusu kurdu.', scrambled: ['тридцать банок', 'Бабушка', 'огурцов.', 'закатала'], correct: ['Бабушка', 'закатала', 'тридцать банок', 'огурцов.'] },
      { ru: 'Варенье пьют с чаем, а не мажут на хлеб.', tr: 'Reçel çayla içilir, ekmeğe sürülmez.', scrambled: ['с чаем,', 'Варенье пьют', 'на хлеб.', 'а не мажут'], correct: ['Варенье пьют', 'с чаем,', 'а не мажут', 'на хлеб.'] }
    ],
    sceneTitle: 'Babuşkanın Kavanoz İmparatorluğu',
    sceneContext: 'Şef Pyotr\'un annesi restorana "biraz" kışlık getirmiş: 47 kavanoz. Lyosha kileri düzenlerken kavanoz felsefesiyle tanışıyor.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Шеф, тут сорок семь банок! Кто это всё съест?!', reading: 'Şef, tut sórak syem\' bának! Kto éta fsyo s\u0131yést?!', tr: 'Şef, burada kırk yedi kavanoz var! Bunları kim yiyecek?!' },
      { speaker: 'Şef Pyotr', ru: 'Мама говорит: запас карман не тянет. Неси в погреб.', reading: 'Máma gavarít: zapás karmán ni tyánit. Nisí f pógryip.', tr: 'Annem der ki: stok cebe yük olmaz. Kilere taşı.' },
      { speaker: 'Lyosha', ru: 'О, вишнёвое варенье! Можно я... одну ложку?', reading: 'O, vişnyóvaye varyén\'ye! Mójna ya... adnú lóşku?', tr: 'O, vişne reçeli! Ben bir... bir kaşık alabilir miyim?' },
      { speaker: 'Şef Pyotr', ru: 'Одну! И это — с чаем, культурно. Не из банки!', reading: 'Adnú! İ éta — s çáyem, kul\'túrna. Ni iz bánki!', tr: 'Bir tane! O da — çayla, kültürlü şekilde. Kavanozdan değil!' }
    ]
  },
  {
    id: 'mod_b2_k4',
    unitNumber: 138,
    levelGroup: 'B2',
    title: 'Misafir Sofrası & Menü Planlama',
    description: 'Servis düzeni, ikram etme, kadeh kalıpları — ev sahipliğinin mutfak tarafı',
    category: 'Aşçılık',
    color: '#8b5cf6',
    icon: '🍽️',
    grammarExplain: `📌 EV SAHİBİ / MİSAFİR KALIPLARI:
1. Угощать (ikram etmek): "Угощайтесь!" (Buyurun, alın!) — sofranın sihirli kelimesi.
2. Menü sırası: закуски (mezeler) → горячее (ana sıcak) → десерт. "Что на горячее?" (Ana yemek ne?)
3. "Добавки?" (Tekrar ister misin?) sorusuna misafir "Не откажусь!" (Hayır demem!) diye cevap verir — kibarlık dansı.`,
    words: [
      { id: 'wck15_1', ru: 'Сервировка', reading: 'Sirvirófka', tr: 'Sofra düzeni / Servis', level: 'B2', usageNote: '"Сервировать стол" (sofrayı kurmak) fiiliyle akrabadır.' },
      { id: 'wck15_2', ru: 'Угощать', reading: 'Ugaşşát\'', tr: 'İkram etmek', level: 'B2', usageNote: '"Угощайтесь!" kalıbı sofrada en sık duyulan davettir.' },
      { id: 'wck15_3', ru: 'Горячее', reading: 'Garyáçiye', tr: 'Ana sıcak yemek', level: 'B2', usageNote: 'Sıfattan isimleşmiştir: "на горячее — рыба" (ana yemek — balık).' },
      { id: 'wck15_4', ru: 'Десерт', reading: 'Disyért', tr: 'Tatlı / Desert', level: 'B2', usageNote: 'Sofranın mutlu sonu.' },
      { id: 'wck15_5', ru: 'Салфетка', reading: 'Salfyétka', tr: 'Peçete', level: 'B2', usageNote: 'Şık sofrada kumaş (тканевая) olanı kullanılır.' },
      { id: 'wck15_6', ru: 'Тост', reading: 'Tost', tr: 'Kadeh konuşması', level: 'B2', usageNote: 'Rus sofrasında tost kısa olmaz; "За здоровье!" (Sağlığa!) en kısasıdır.' },
      { id: 'wck15_7', ru: 'Хозяйка', reading: 'Hazyáyka', tr: 'Ev sahibesi', level: 'B2', usageNote: '"Хозяйка — золотые руки" (altın elli ev sahibesi) büyük övgüdür.' },
      { id: 'wck15_8', ru: 'Добавка', reading: 'Dabáfka', tr: 'Tekrar / İkinci porsiyon', level: 'B2', usageNote: '"Можно добавки?" (Tekrar alabilir miyim?) — aşçıya madalya gibidir.' }
    ],
    sentences: [
      { ru: 'Угощайтесь, пожалуйста! На горячее сегодня рыба.', tr: 'Buyurun lütfen! Bugün ana yemek balık.', scrambled: ['пожалуйста!', 'Угощайтесь,', 'сегодня рыба.', 'На горячее'], correct: ['Угощайтесь,', 'пожалуйста!', 'На горячее', 'сегодня рыба.'] },
      { ru: 'Сначала закуски, потом горячее, в конце — десерт.', tr: 'Önce mezeler, sonra ana yemek, en sonda — tatlı.', scrambled: ['потом горячее,', 'Сначала закуски,', '— десерт.', 'в конце'], correct: ['Сначала закуски,', 'потом горячее,', 'в конце', '— десерт.'] }
    ],
    sceneTitle: 'Restoranda Özel Gün Menüsü',
    sceneContext: 'Büyük bir aile, yıldönümü yemeği için restoranı komple kiralamıştır. Menü planı: Nina\'nın hassas düzeni vs. büyükbabanın "her şeyden çok olsun" talebi.',
    dialogue: [
      { speaker: 'Nina', ru: 'План меню: три закуски, борщ, на горячее — утка, десерт — медовик.', reading: 'Plan minyú: tri zakúski, borşç, na garyáçiye — útka, disyért — midavík.', tr: 'Menü planı: üç meze, borşç, ana yemek — ördek, tatlı — medovik.' },
      { speaker: 'Şef Pyotr', ru: 'Хорошо. Сервировка — праздничная. Салфетки — тканевые!', reading: 'Haraşó. Sirvirófka — prázniçnaya. Salfyétki — tkániv\u0131ye!', tr: 'Güzel. Sofra düzeni — bayramlık. Peçeteler — kumaş!' },
      { speaker: 'Lyosha', ru: 'А если гости попросят добавки? Дедушка выглядит серьёзно.', reading: 'A yésli gósti paprósyat dabáfki? Dyéduşka v\u0131́gliditsa siryózna.', tr: 'Ya misafirler tekrar isterse? Büyükbaba ciddi görünüyor.' },
      { speaker: 'Şef Pyotr', ru: 'Готовим с запасом! Хозяйка вечера сказала: никто не уйдёт голодным!', reading: 'Gatóvim s zapásam! Hazyáyka vyéçira skazála: niktó ni uydyót galódn\u0131m!', tr: 'Yedekli pişiriyoruz! Gecenin ev sahibesi dedi ki: kimse aç gitmeyecek!' }
    ]
  },
  {
    id: 'mod_b2_k5',
    unitNumber: 139,
    levelGroup: 'B2',
    title: 'Restoran Mutfağında Bir Gün',
    description: 'Sipariş, vardiya, servis paniği — profesyonel mutfağın nabzı',
    category: 'Aşçılık',
    color: '#0ea5e9',
    icon: '👨‍🍳',
    grammarExplain: `📌 PROFESYONEL MUTFAK JARGONU:
1. "Заказ на стол пять!" (Beş numaraya sipariş!) — mutfakta cümleler kısadır, fiiller emirdir.
2. Успевать/успеть (yetişmek): "Мы не успеваем!" (Yetişemiyoruz!) — аврал (yoğunluk paniği) ilan cümlesi.
3. Подача (servis/sunum) çift anlamlıdır: hem tabağın çıkışı hem sunum estetiği. "Подача — через две минуты!"`,
    words: [
      { id: 'wck16_1', ru: 'Заказ', reading: 'Zakás', tr: 'Sipariş', level: 'B2', usageNote: '"Заказ готов!" (Sipariş hazır!) mutfağın kalp atışıdır.' },
      { id: 'wck16_2', ru: 'Смена', reading: 'Smyéna', tr: 'Vardiya', level: 'B2', usageNote: '"Ночная смена" (gece vardiyası) efsanelerin doğduğu yerdir.' },
      { id: 'wck16_3', ru: 'Подача', reading: 'Padáça', tr: 'Servis / Sunum', level: 'B2', usageNote: 'Şefin son kontrolü: "Подача должна быть идеальной".' },
      { id: 'wck16_4', ru: 'Аврал', reading: 'Avrál', tr: 'Yoğunluk paniği / Koşuşturma', level: 'B2', usageNote: 'Denizcilikten gelmiştir; cuma akşamı 20:00 = аврал.' },
      { id: 'wck16_5', ru: 'Цех', reading: 'Tseh', tr: 'Bölüm / İstasyon', level: 'B2', usageNote: '"Горячий цех" (sıcak bölüm), "холодный цех" (soğuk bölüm).' },
      { id: 'wck16_6', ru: 'Успевать', reading: 'Uspivát\'', tr: 'Yetişmek', level: 'B2', usageNote: '"Успеваем?" — "Успеваем!" mutfak diyaloğunun %40\'ı budur.' },
      { id: 'wck16_7', ru: 'Команда', reading: 'Kamánda', tr: 'Ekip', level: 'B2', usageNote: '"Кухня — это команда" — Şef Pyotr\'un birinci kuralı.' },
      { id: 'wck16_8', ru: 'Су-шеф', reading: 'Su-şéf', tr: 'Sous-şef (şef yardımcısı)', level: 'B2', usageNote: 'Mutfak hiyerarşisinin ikinci basamağı; Fransızcadan gelir.' }
    ],
    sentences: [
      { ru: 'Заказ на стол пять: борщ и два стейка!', tr: 'Beş numaralı masaya sipariş: borşç ve iki steak!', scrambled: ['на стол пять:', 'Заказ', 'и два стейка!', 'борщ'], correct: ['Заказ', 'на стол пять:', 'борщ', 'и два стейка!'] },
      { ru: 'Пятница, вечер, полный зал — у нас аврал, но команда успевает.', tr: 'Cuma, akşam, salon dolu — koşuşturma var ama ekip yetişiyor.', scrambled: ['полный зал —', 'Пятница, вечер,', 'но команда успевает.', 'у нас аврал,'], correct: ['Пятница, вечер,', 'полный зал —', 'у нас аврал,', 'но команда успевает.'] }
    ],
    sceneTitle: 'Cuma Akşamı: Tam Kadro Savaş',
    sceneContext: 'Salon dolu, siparişler yağıyor, bir ocak arızalı. Şef Pyotr orkestra şefi gibi; Lyosha ilk kez sıcak bölümde ve hayatta kalmaya çalışıyor.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Аврал! Лёша — в горячий цех! Нина — подача на семь и девять!', reading: 'Avrál! Lyóşa — v garyáçiy tseh! Nína — padáça na syem\' i dyévit\'!', tr: 'Koşuşturma! Lyosha — sıcak bölüme! Nina — yedi ve dokuza servis!' },
      { speaker: 'Lyosha', ru: 'Три заказа сразу! Шеф, я не успеваю!', reading: 'Tri zakáza srázu! Şef, ya ni uspiváyu!', tr: 'Aynı anda üç sipariş! Şef, yetişemiyorum!' },
      { speaker: 'Şef Pyotr', ru: 'Успеваешь! Дыши. Один заказ — одно движение. Кухня — это команда!', reading: 'Uspiváyeş! D\u0131şı́. Adín zakás — adnó dvijéniye. Kúhnya — éta kamánda!', tr: 'Yetişiyorsun! Nefes al. Bir sipariş — bir hamle. Mutfak — bir ekiptir!' },
      { speaker: 'Nina', ru: 'Зал аплодирует, шеф. Все заказы вышли вовремя. Все.', reading: 'Zal apladíruyit, şef. Fsye zakáz\u0131 v\u0131́şli vóvrimya. Fsye.', tr: 'Salon alkışlıyor, şef. Bütün siparişler zamanında çıktı. Hepsi.' }
    ]
  },

  // ============================ C1 ============================
  {
    id: 'mod_c1_k1',
    unitNumber: 175,
    levelGroup: 'C1/C2',
    title: 'Şef Dili & Profesyonel Teknikler',
    description: 'Blanşe etmek, karamelize etmek, redüksiyon — yüksek mutfağın terminolojisi',
    category: 'Aşçılık',
    color: '#7c3aed',
    icon: '🎓',
    grammarExplain: `📌 YÜKSEK MUTFAK TERMİNOLOJİSİ:
1. Fransız kökenli fiiller -ировать ile Rusçalaşır: бланшировать, карамелизировать, фламбировать — hepsi hem несов. hem сов. gibi davranabilir.
2. Редукция (redüksiyon): "уварить соус наполовину" (sosu yarıya indirmek) — aynı işlemin öz Rusça anlatımı.
3. "Довести до совершенства" (mükemmelliğe ulaştırmak) — şef perfeksiyonizminin resmî kalıbı.`,
    words: [
      { id: 'wck17_1', ru: 'Бланшировать', reading: 'Blanşíravat\'', tr: 'Blanşe etmek', level: 'C1/C2', usageNote: 'Kaynar suya daldırıp buzlu suya almak; rengi kilitler.' },
      { id: 'wck17_2', ru: 'Карамелизировать', reading: 'Karamilizíravat\'', tr: 'Karamelize etmek', level: 'C1/C2', usageNote: '"Карамелизированный лук" (karamelize soğan) menü süsüdür.' },
      { id: 'wck17_3', ru: 'Соус', reading: 'Sóus', tr: 'Sos', level: 'C1/C2', usageNote: '"Соус — душа блюда" (sos, yemeğin ruhudur) — Fransız-Rus mutfak atasözü.' },
      { id: 'wck17_4', ru: 'Редукция', reading: 'Ridúktsiya', tr: 'Redüksiyon (sos koyulaştırma)', level: 'C1/C2', usageNote: 'Sosun suyunu uçurup yoğunlaştırmak.' },
      { id: 'wck17_5', ru: 'Текстура', reading: 'Tikstúra', tr: 'Doku / Tekstür', level: 'C1/C2', usageNote: '"Играть на контрасте текстур" (doku kontrastıyla oynamak) şef repliği.' },
      { id: 'wck17_6', ru: 'Баланс вкуса', reading: 'Baláns fkúsa', tr: 'Tat dengesi', level: 'C1/C2', usageNote: 'Tuzlu-tatlı-ekşi-acı dörtgeninin diplomasisi.' },
      { id: 'wck17_7', ru: 'Техника', reading: 'Téhnika', tr: 'Teknik', level: 'C1/C2', usageNote: '"Техника решает всё" — ustalığın özeti.' },
      { id: 'wck17_8', ru: 'Совершенство', reading: 'Savirşénstva', tr: 'Mükemmellik', level: 'C1/C2', usageNote: '"Довести до совершенства" (mükemmelliğe ulaştırmak).' }
    ],
    sentences: [
      { ru: 'Бланшируйте овощи, чтобы сохранить цвет и текстуру.', tr: 'Rengi ve dokuyu korumak için sebzeleri blanşe edin.', scrambled: ['овощи,', 'Бланшируйте', 'цвет и текстуру.', 'чтобы сохранить'], correct: ['Бланшируйте', 'овощи,', 'чтобы сохранить', 'цвет и текстуру.'] },
      { ru: 'Уварите соус наполовину — редукция даст глубокий вкус.', tr: 'Sosu yarıya indirin — redüksiyon derin bir tat verecek.', scrambled: ['наполовину —', 'Уварите соус', 'глубокий вкус.', 'редукция даст'], correct: ['Уварите соус', 'наполовину —', 'редукция даст', 'глубокий вкус.'] }
    ],
    sceneTitle: 'Usta Sınıfı: Şefin Akademisi',
    sceneContext: 'Şef Pyotr, artık sıcak bölümün yıldızı olan Lyosha\'ya yüksek mutfak tekniklerini öğretiyor. Lyosha not defteri tutuyor — evet, ARTIK not tutuyor.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Сегодня — соусы. Смотри: уварива­ем наполовину. Это редукция.', reading: 'Sivódnya — sóus\u0131. Smatrí: uvarívayem napalavínu. Éta ridúktsiya.', tr: 'Bugün — soslar. Bak: yarıya indiriyoruz. Bu redüksiyon.' },
      { speaker: 'Lyosha', ru: 'Записываю: редукция — душа соуса. А соус — душа блюда!', reading: 'Zapís\u0131vayu: ridúktsiya — duşá sóusa. A sóus — duşá blyúda!', tr: 'Not alıyorum: redüksiyon — sosun ruhu. Sos da — yemeğin ruhu!' },
      { speaker: 'Şef Pyotr', ru: 'Теперь бланшируй спаржу. Цвет должен остаться ярким.', reading: 'Tipyér\' blanşíruy spárju. Tsvyet dóljen astátsa yárkim.', tr: 'Şimdi kuşkonmazı blanşe et. Renk canlı kalmalı.' },
      { speaker: 'Lyosha', ru: 'Шеф... а когда-нибудь я стану су-шефом?', reading: 'Şef... a kagdá-nibut\' ya stánu su-şéfam?', tr: 'Şef... bir gün sous-şef olabilecek miyim?' }
    ]
  },
  {
    id: 'mod_c1_k2',
    unitNumber: 176,
    levelGroup: 'C1/C2',
    title: 'Tabak Sunumu & Estetik',
    description: 'Kompozisyon, aksan, minimalizm — göz de yer',
    category: 'Aşçılık',
    color: '#ec4899',
    icon: '🎨',
    grammarExplain: `📌 SUNUM ESTETİĞİ DİLİ:
1. "Едят глазами" (Gözle yenir) — sunumun anayasal gerekçesi.
2. Sanat sözlüğü mutfağa taşınır: композиция, акцент, минимализм — hepsi tabak üstü kavramlardır.
3. "Выложить" (yerleştirmek/dizmek): "выложите пюре кольцом" (püreyi halka şeklinde yerleştirin) — sunum fiilidir.`,
    words: [
      { id: 'wck18_1', ru: 'Презентация', reading: 'Prizintátsiya', tr: 'Sunum / Prezantasyon', level: 'C1/C2', usageNote: 'Tabağın sahneye çıkışı.' },
      { id: 'wck18_2', ru: 'Гарнир', reading: 'Garnír', tr: 'Garnitür', level: 'C1/C2', usageNote: 'Ana ögenin sahne arkadaşı: püre, sebze, tahıl.' },
      { id: 'wck18_3', ru: 'Порция', reading: 'Pórtsiya', tr: 'Porsiyon', level: 'C1/C2', usageNote: 'Fine dining\'de "küçük ama kusursuz" felsefesi geçerlidir.' },
      { id: 'wck18_4', ru: 'Композиция', reading: 'Kampazítsiya', tr: 'Kompozisyon', level: 'C1/C2', usageNote: 'Tabağın resim gibi kurgulanması.' },
      { id: 'wck18_5', ru: 'Акцент', reading: 'Aktsént', tr: 'Vurgu / Aksan', level: 'C1/C2', usageNote: '"Яркий акцент" (canlı vurgu): bir damla sos, bir yaprak fesleğen.' },
      { id: 'wck18_6', ru: 'Минимализм', reading: 'Minimalízm', tr: 'Minimalizm', level: 'C1/C2', usageNote: 'Büyük tabak, az öge, çok etki.' },
      { id: 'wck18_7', ru: 'Выложить', reading: 'V\u0131́lajit\'', tr: 'Yerleştirmek / Dizmek', level: 'C1/C2', usageNote: 'Sunumun ana fiili: "красиво выложить на тарелку".' },
      { id: 'wck18_8', ru: 'Аппетитно', reading: 'Apitítna', tr: 'İştah açıcı (görünüm)', level: 'C1/C2', usageNote: '"Выглядит аппетитно!" (İştah açıcı görünüyor!) ilk sınavın geçildiğinin işaretidir.' }
    ],
    sentences: [
      { ru: 'Сначала едят глазами — подача решает многое.', tr: 'Önce gözle yenir — sunum çok şey belirler.', scrambled: ['едят глазами —', 'Сначала', 'решает многое.', 'подача'], correct: ['Сначала', 'едят глазами —', 'подача', 'решает многое.'] },
      { ru: 'Выложите гарнир кольцом и добавьте яркий акцент соусом.', tr: 'Garnitürü halka şeklinde yerleştirin ve sosla canlı bir vurgu ekleyin.', scrambled: ['кольцом', 'Выложите гарнир', 'соусом.', 'и добавьте яркий акцент'], correct: ['Выложите гарнир', 'кольцом', 'и добавьте яркий акцент', 'соусом.'] }
    ],
    sceneTitle: 'Tabak Ressamları',
    sceneContext: 'Yeni menü fotoğraf çekimi var. Her tabak bir tablo olmalı. Lyosha\'nın "bol soslu bereket" ekolü, Nina\'nın minimalizmiyle karşı karşıya.',
    dialogue: [
      { speaker: 'Nina', ru: 'Минимализм, Лёша: большая тарелка, маленькая порция, один акцент.', reading: 'Minimalízm, Lyóşa: bal\'şáya taryélka, málin\'kaya pórtsiya, adín aktsént.', tr: 'Minimalizm, Lyosha: büyük tabak, küçük porsiyon, tek vurgu.' },
      { speaker: 'Lyosha', ru: 'Но гость хочет есть! Где еда? Тут два кусочка и точка соуса!', reading: 'No gost\' hóçit yest\'! Gdye idá? Tut dva kusóçka i tóçka sóusa!', tr: 'Ama misafir yemek istiyor! Yemek nerede? Burada iki dilimcik ve bir nokta sos var!' },
      { speaker: 'Şef Pyotr', ru: 'Композиция — как картина. Выложи гарнир кольцом... Вот так. Видишь?', reading: 'Kampazítsiya — kak kartína. V\u0131́laji garnír kal\'tsóm... Vot tak. Vídiş?', tr: 'Kompozisyon — tablo gibidir. Garnitürü halka yap... İşte böyle. Görüyor musun?' },
      { speaker: 'Lyosha', ru: 'Ох... Выглядит аппетитно. Ладно, красота тоже еда!', reading: 'Oh... V\u0131́gliditsa apitítna. Ládna, krasatá tóje idá!', tr: 'Oh... İştah açıcı görünüyor. Tamam, güzellik de yemekmiş!' }
    ]
  },
  {
    id: 'mod_c1_k3',
    unitNumber: 177,
    levelGroup: 'C1/C2',
    title: 'Degüstasyon & Yemek Eleştirisi',
    description: 'Ağızda kalan tat, uyum, nüans — yemeği kelimelerle anlatma sanatı',
    category: 'Aşçılık',
    color: '#9f1239',
    icon: '🍷',
    grammarExplain: `📌 TAT ELEŞTİRİSİ DİLİ:
1. Послевкусие (ağızda kalan tat): "долгое послевкусие" (uzun süren tat) — degüstasyonun zarif kelimesi.
2. Сочетание (uyum/kombinasyon): "неожиданное сочетание вкусов" (beklenmedik tat uyumu) — eleştirmen övgüsü.
3. Nüans sıfatları: изысканный (rafine), тонкий (ince), насыщенный (yoğun), гармоничный (uyumlu) — dört temel eleştiri kartı.`,
    words: [
      { id: 'wck19_1', ru: 'Дегустация', reading: 'Digustátsiya', tr: 'Degüstasyon / Tadım', level: 'C1/C2', usageNote: 'Yeni menünün jüri günü.' },
      { id: 'wck19_2', ru: 'Вкус', reading: 'Fkus', tr: 'Tat / Zevk', level: 'C1/C2', usageNote: 'Hem damak tadı hem estetik zevk: "у него есть вкус" (zevk sahibi).' },
      { id: 'wck19_3', ru: 'Послевкусие', reading: 'Paslifkúsiye', tr: 'Ağızda kalan tat', level: 'C1/C2', usageNote: 'Şarap ve yemek eleştirisinin imza kelimesi.' },
      { id: 'wck19_4', ru: 'Сочетание', reading: 'Saçitániye', tr: 'Uyum / Kombinasyon', level: 'C1/C2', usageNote: '"Сочетание вкусов" (tatların uyumu) menü mühendisliğinin kalbi.' },
      { id: 'wck19_5', ru: 'Изысканный', reading: 'İz\u0131́skann\u0131y', tr: 'Rafine / Zarif', level: 'C1/C2', usageNote: 'Eleştirmenlerin en cömert sıfatı.' },
      { id: 'wck19_6', ru: 'Оттенок', reading: 'Attyénak', tr: 'Nüans / Tat tonu', level: 'C1/C2', usageNote: '"Оттенок ванили" (vanilya nüansı) — degüstasyon şiiri.' },
      { id: 'wck19_7', ru: 'Критик', reading: 'Krítik', tr: 'Eleştirmen', level: 'C1/C2', usageNote: 'Mutfakların hem korkulu rüyası hem gizli motivasyonu.' },
      { id: 'wck19_8', ru: 'Гармония', reading: 'Garmóniya', tr: 'Uyum / Harmoni', level: 'C1/C2', usageNote: '"Гармония вкуса и текстуры" — mükemmel tabağın formülü.' }
    ],
    sentences: [
      { ru: 'У этого соуса тонкий оттенок ванили и долгое послевкусие.', tr: 'Bu sosun ince bir vanilya nüansı ve uzun süren bir tadı var.', scrambled: ['тонкий оттенок ванили', 'У этого соуса', 'послевкусие.', 'и долгое'], correct: ['У этого соуса', 'тонкий оттенок ванили', 'и долгое', 'послевкусие.'] },
      { ru: 'Критик назвал сочетание вкусов изысканным.', tr: 'Eleştirmen tat kombinasyonunu rafine olarak nitelendirdi.', scrambled: ['сочетание вкусов', 'Критик назвал', 'изысканным.'], correct: ['Критик назвал', 'сочетание вкусов', 'изысканным.'] }
    ],
    sceneTitle: 'Eleştirmen Geldi',
    sceneContext: 'Moskova\'nın en korkulan yemek eleştirmeni rezervasyonsuz gelmiştir. Mutfakta herkes nefesini tuttu; sadece tabaklar konuşacak.',
    dialogue: [
      { speaker: 'Nina', ru: 'Столик три... это ОН. Критик. Тот самый.', reading: 'Stólik tri... éta ON. Krítik. Tot sám\u0131y.', tr: 'Üç numaralı masa... o, TA KENDİSİ. Eleştirmen. O meşhur olan.' },
      { speaker: 'Şef Pyotr', ru: 'Без паники. Готовим как всегда: с душой. Подача — идеальная.', reading: 'Bis pániki. Gatóvim kak fsigdá: s duşóy. Padáça — idiál\'naya.', tr: 'Panik yok. Her zamanki gibi pişiriyoruz: ruhla. Sunum — kusursuz.' },
      { speaker: 'Lyosha', ru: 'Он попробовал борщ... Он молчит... Почему он молчит?!', reading: 'On papróbaval borşç... On malçít... Paçimú on malçít?!', tr: 'Borşçu tattı... Susuyor... Neden susuyor?!' },
      { speaker: 'Nina', ru: 'Он написал: "Гармония. Изысканно. Как у бабушки, но в смокинге."', reading: 'On napisál: "Garmóniya. İz\u0131́skanna. Kak u bábuşki, no f smókinge."', tr: 'Şöyle yazmış: "Harmoni. Rafine. Büyükannemin yemeği gibi ama smokinli."' }
    ]
  },
  {
    id: 'mod_c1_k4',
    unitNumber: 178,
    levelGroup: 'C1/C2',
    title: 'Kendi Restoranını Açmak',
    description: 'Konsept, maliyet, tedarikçi, açılış — mutfak hayalinin iş planı',
    category: 'Aşçılık',
    color: '#0d9488',
    icon: '🏪',
    grammarExplain: `📌 RESTORAN GİRİŞİMCİLİĞİ DİLİ:
1. Себестоимость (maliyet) restoranın matematiğidir: "себестоимость блюда" (yemeğin maliyeti) menü fiyatının üçte biri olmalı der klasik kural.
2. Концепция sorusu yatırımcının ilk sorusudur: "Какая у вас концепция?" (Konseptiniz ne?)
3. Hayal kalıbı: "Мечта сбылась" (hayal gerçek oldu) — açılış gecesinin cümlesi.`,
    words: [
      { id: 'wck20_1', ru: 'Концепция', reading: 'Kantséptsiya', tr: 'Konsept', level: 'C1/C2', usageNote: 'Restoranın kimlik kartı: "домашняя кухня в смокинге" gibi.' },
      { id: 'wck20_2', ru: 'Себестоимость', reading: 'Sibistóimast\'', tr: 'Maliyet (birim)', level: 'C1/C2', usageNote: 'Menü mühendisliğinin acımasız gerçeği.' },
      { id: 'wck20_3', ru: 'Маржа', reading: 'Márja', tr: 'Kâr marjı', level: 'C1/C2', usageNote: 'Tatlılarda yüksek, et yemeklerinde naziktir.' },
      { id: 'wck20_4', ru: 'Поставщик', reading: 'Pastafşşík', tr: 'Tedarikçi', level: 'C1/C2', usageNote: 'Taze ürünün gizli kahramanı; sabah 6 telefonlarının sahibi.' },
      { id: 'wck20_5', ru: 'Аренда', reading: 'Aryénda', tr: 'Kira', level: 'C1/C2', usageNote: 'İş planının en büyük kalemi; "аренда съедает маржу" (kira marjı yer).' },
      { id: 'wck20_6', ru: 'Открытие', reading: 'Atkr\u0131́tiye', tr: 'Açılış', level: 'C1/C2', usageNote: '"Торжественное открытие" (görkemli açılış) — kurdele ve gözyaşı günü.' },
      { id: 'wck20_7', ru: 'Риск', reading: 'Risk', tr: 'Risk', level: 'C1/C2', usageNote: '"Кто не рискует, тот не пьёт шампанское" (Risk almayan şampanya içmez).' },
      { id: 'wck20_8', ru: 'Мечта', reading: 'Miçtá', tr: 'Hayal', level: 'C1/C2', usageNote: 'Bütün bu müfredatın başladığı yer: "мечта о своём ресторане".' }
    ],
    sentences: [
      { ru: 'Себестоимость блюда — треть цены в меню.', tr: 'Yemeğin maliyeti — menü fiyatının üçte biri.', scrambled: ['блюда —', 'Себестоимость', 'в меню.', 'треть цены'], correct: ['Себестоимость', 'блюда —', 'треть цены', 'в меню.'] },
      { ru: 'Кто не рискует, тот не открывает ресторан.', tr: 'Risk almayan, restoran açamaz.', scrambled: ['тот не открывает', 'Кто не рискует,', 'ресторан.'], correct: ['Кто не рискует,', 'тот не открывает', 'ресторан.'] }
    ],
    sceneTitle: 'Lyosha\'nın Hayali: «Блин!» Kafe',
    sceneContext: 'Yıllar sonra... Lyosha kendi krep kafesini açmak istiyor. İş planını eski ustası Şef Pyotr\'a sunuyor. Ustalık yolculuğu tamamlanıyor.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Шеф, моя концепция: кафе «Блин!». Блины, варенье, душа.', reading: 'Şef, mayá kantséptsiya: kafé «Blin!». Bliný, varyén\'ye, duşá.', tr: 'Şef, konseptim: «Blin!» kafe. Krepler, reçel, ruh.' },
      { speaker: 'Şef Pyotr', ru: 'Себестоимость? Маржа? Поставщики? Аренда?', reading: 'Sibistóimast\'? Márja? Pastafşşikí? Aryénda?', tr: 'Maliyet? Marj? Tedarikçiler? Kira?' },
      { speaker: 'Lyosha', ru: 'Всё посчитано. Вот бизнес-план. Я учился у лучшего.', reading: 'Fsyo pasşítana. Vot bíznis-plan. Ya uçílsya u lúçşiva.', tr: 'Hepsi hesaplandı. İşte iş planı. En iyisinden öğrendim.' },
      { speaker: 'Şef Pyotr', ru: '(листает план) ...Первый блин не будет комом, Лёша. Я приду на открытие. С мамиными банками.', reading: '(listáyit plan) ...Pyérv\u0131y blin ni búdit kómam, Lyóşa. Ya pridú na atkr\u0131́tiye. S máminimi bánkami.', tr: '(planı karıştırır) ...İlk krep topak olmayacak, Lyosha. Açılışa geleceğim. Annemin kavanozlarıyla.' }
    ]
  }
];
