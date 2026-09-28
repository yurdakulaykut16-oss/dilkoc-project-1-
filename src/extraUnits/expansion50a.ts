// ==========================================================
// GENİŞLEME PAKETİ 50 — BÖLÜM 1: A1 (10 ünite) + A2 (10 ünite)
// Kesirli unitNumber'lar (10.x / 40.x) sayesinde mevcut seviye
// bölgelerine sıralanır; hikâye tetikleyicileri (tam sayı
// eşitliği) etkilenmez. Diyalog alanı bilinçli olarak boş:
// App diyalogsuz ünitelerde doğrudan FLASHCARD'a geçer.
// ==========================================================
import type { UnitModule, WordDetail } from '../curriculumData';

// Cümle üretici: correct = kelime dizisi (noktalama bitişik),
// scrambled = deterministik ters çevirme (her zaman correct'ten farklı).
export const S = (ru: string, tr: string) => {
  const correct = ru.split(' ');
  const scrambled = [...correct].reverse();
  return { ru, tr, scrambled, correct };
};

export const W = (
  id: string, ru: string, reading: string, tr: string,
  level: WordDetail['level'], usageNote: string
): WordDetail => ({ id, ru, reading, tr, level, usageNote });

export const EXPANSION_A1: UnitModule[] = [
  {
    id: 'exp_a1_colors', unitNumber: 10.1, levelGroup: 'A1',
    title: 'Renkler', description: 'Temel renkleri tanı ve nesneleri renkleriyle tarif et',
    category: 'Temel Kelimeler', color: '#f43f5e', icon: '🎨',
    grammarExplain: `📌 RENKLER SIFATTIR:
1. Renk sıfatları ismin cinsine uyar: красный дом (eril), красная машина (dişil), красное яблоко (nötr).
2. "Какого цвета...?" (Ne renk...?) sorusuyla renk sorulur.
3. Sözlükte renkler eril biçimle (-ый/-ий/-ой) verilir.`,
    words: [
      W('exp_a1c_1', 'Красный', 'Krásnıy', 'Kırmızı', 'A1', 'Kızıl Meydan (Красная площадь) aynı kökten gelir; eski Rusçada "güzel" demekti.'),
      W('exp_a1c_2', 'Синий', 'Síniy', 'Mavi (koyu)', 'A1', 'Rusçada iki ayrı mavi vardır: синий (koyu) ve голубой (açık).'),
      W('exp_a1c_3', 'Зелёный', 'Zilyónıy', 'Yeşil', 'A1', 'Ё her zaman vurguludur: zilyÓnıy.'),
      W('exp_a1c_4', 'Жёлтый', 'Jóltıy', 'Sarı', 'A1', 'Ж sesi Türkçe J gibidir: jóltıy.'),
      W('exp_a1c_5', 'Белый', 'Byélıy', 'Beyaz', 'A1', 'Beyaz Rusya (Белоруссия) bu kelimeden gelir.'),
      W('exp_a1c_6', 'Чёрный', 'Çórnıy', 'Siyah', 'A1', 'Karadeniz = Чёрное море (Siyah Deniz).')
    ],
    sentences: [
      S('Это красный дом.', 'Bu kırmızı bir ev.'),
      S('Моя машина белая.', 'Benim arabam beyaz.')
    ]
  },
  {
    id: 'exp_a1_body', unitNumber: 10.2, levelGroup: 'A1',
    title: 'Vücudumuz', description: 'Vücut bölümlerini öğren, ağrıyı anlat',
    category: 'Temel Kelimeler', color: '#fb7185', icon: '🫀',
    grammarExplain: `📌 "У МЕНЯ БОЛИТ..." KALIBI:
1. "Ağrıyor" demek için: У меня болит голова. (Başım ağrıyor.)
2. Çoğul organlarda болят kullanılır: У меня болят ноги.
3. Vücut kelimelerinin çoğu kural dışı çoğul yapar: глаз → глаза, ухо → уши.`,
    words: [
      W('exp_a1b_1', 'Голова', 'Galavá', 'Baş / Kafa', 'A1', 'Akanje: golova değil galavá okunur.'),
      W('exp_a1b_2', 'Рука', 'Ruká', 'El / Kol', 'A1', 'Rusça el ve kolu tek kelimeyle karşılar.'),
      W('exp_a1b_3', 'Нога', 'Nagá', 'Ayak / Bacak', 'A1', 'Ayak ve bacak da tek kelimedir: нога.'),
      W('exp_a1b_4', 'Глаз', 'Glas', 'Göz', 'A1', 'Sondaki З sedasızlaşıp S okunur; çoğulu глаза.'),
      W('exp_a1b_5', 'Сердце', 'Syértse', 'Kalp', 'A1', 'Ortadaki Д okunmaz — sessiz harf tuzağı.'),
      W('exp_a1b_6', 'Зуб', 'Zup', 'Diş', 'A1', 'Sondaki Б sedasızlaşıp P okunur; dişçi = зубной врач.')
    ],
    sentences: [
      S('У меня болит голова.', 'Başım ağrıyor.'),
      S('Мои глаза устали.', 'Gözlerim yoruldu.')
    ]
  },
  {
    id: 'exp_a1_food', unitNumber: 10.3, levelGroup: 'A1',
    title: 'Temel Yiyecekler', description: 'Sofradaki en temel yiyecek adları',
    category: 'Temel Kelimeler', color: '#f59e0b', icon: '🍎',
    grammarExplain: `📌 YEMEK FİİLLERİ:
1. есть = yemek, пить = içmek. Я ем (yiyorum), я пью (içiyorum).
2. "Я хочу..." (istiyorum) + yiyecek adı en pratik kalıptır.
3. Sevmek için любить + isim: Я люблю суп. (Çorbayı severim.)`,
    words: [
      W('exp_a1f_1', 'Яблоко', 'Yáblaka', 'Elma', 'A1', 'Nötr cinstir; çoğulu яблоки.'),
      W('exp_a1f_2', 'Суп', 'Sup', 'Çorba', 'A1', 'Rus mutfağının kalbi: борщ da bir çorbadır.'),
      W('exp_a1f_3', 'Каша', 'Káşa', 'Lapa / Kaşa', 'A1', 'Rus kahvaltısının klasiği; yulaf, karabuğday vb.'),
      W('exp_a1f_4', 'Масло', 'Másla', 'Tereyağı / Yağ', 'A1', 'Hem tereyağı hem sıvı yağ için kullanılır.'),
      W('exp_a1f_5', 'Яйцо', 'Yiytsó', 'Yumurta', 'A1', 'Vurgu sondadır; çoğulu яйца (vurgu başa kayar).'),
      W('exp_a1f_6', 'Рис', 'Ris', 'Pirinç', 'A1', 'Kısa ve uluslararası bir kelime; Türkçeyle akraba değildir.')
    ],
    sentences: [
      S('Я ем яблоко.', 'Elma yiyorum.'),
      S('Я хочу суп.', 'Çorba istiyorum.')
    ]
  },
  {
    id: 'exp_a1_home', unitNumber: 10.4, levelGroup: 'A1',
    title: 'Ev ve Odalar', description: 'Evin bölümleri ve "nerede?" sorusu',
    category: 'Temel Kelimeler', color: '#8b5cf6', icon: '🏠',
    grammarExplain: `📌 "ГДЕ?" + В/НА:
1. "Nerede?" sorusuna в + yer (-е ekiyle) cevabı verilir: в комнате (odada).
2. кухня → на кухне (mutfakta) — kural dışı olarak на alır.
3. дом (ev/bina) ile квартира (daire) farklıdır; Ruslar çoğunlukla dairede yaşar.`,
    words: [
      W('exp_a1h_1', 'Комната', 'Kómnata', 'Oda', 'A1', 'Vurgu ilk hecededir: KÓmnata.'),
      W('exp_a1h_2', 'Кухня', 'Kúhnya', 'Mutfak', 'A1', '"Mutfakta" derken на кухне denir (в değil!).'),
      W('exp_a1h_3', 'Ванная', 'Vánnaya', 'Banyo', 'A1', 'Aslında sıfattır: ванная комната (küvet odası) kısaltmasıdır.'),
      W('exp_a1h_4', 'Окно', 'Aknó', 'Pencere', 'A1', 'Akanje: okno değil aknó; nötr cinstir.'),
      W('exp_a1h_5', 'Дверь', 'Dvyer', 'Kapı', 'A1', 'Yumuşak işaretle biter, dişil cinstir.'),
      W('exp_a1h_6', 'Стол', 'Stol', 'Masa', 'A1', '"Столовая" (yemekhane) bu kökten gelir.')
    ],
    sentences: [
      S('Мама на кухне.', 'Annem mutfakta.'),
      S('В комнате большое окно.', 'Odada büyük bir pencere var.')
    ]
  },
  {
    id: 'exp_a1_days', unitNumber: 10.5, levelGroup: 'A1',
    title: 'Haftanın Günleri', description: 'Günleri say, planını söyle',
    category: 'Temel Kelimeler', color: '#06b6d4', icon: '📅',
    grammarExplain: `📌 GÜNLER VE "В":
1. "... günü" demek için в + gün (ismin -у/-е hâli): в понедельник (pazartesi günü).
2. Gün adları küçük harfle yazılır: понедельник, вторник...
3. среда (çarşamba) "orta" demektir — haftanın ortası; воскресенье (pazar) "diriliş"ten gelir.`,
    words: [
      W('exp_a1d_1', 'Понедельник', 'Panidyélnik', 'Pazartesi', 'A1', '"Неделя"dan (hafta) sonra gelen gün demektir.'),
      W('exp_a1d_2', 'Среда', 'Sridá', 'Çarşamba', 'A1', '"Orta" kökünden: haftanın ortası.'),
      W('exp_a1d_3', 'Пятница', 'Pyátnitsa', 'Cuma', 'A1', 'пять (beş) kökünden: beşinci gün.'),
      W('exp_a1d_4', 'Суббота', 'Subóta', 'Cumartesi', 'A1', 'İbranice "şabat"tan gelir; çift Б yazılır.'),
      W('exp_a1d_5', 'Воскресенье', 'Vaskrisyénye', 'Pazar', 'A1', '"Diriliş" anlamındadır; tatil günü.'),
      W('exp_a1d_6', 'Сегодня', 'Sivódnya', 'Bugün', 'A1', 'Г burada V okunur — en ünlü okuma istisnası!')
    ],
    sentences: [
      S('Сегодня пятница.', 'Bugün cuma.'),
      S('В субботу я отдыхаю.', 'Cumartesi günü dinleniyorum.')
    ]
  },
  {
    id: 'exp_a1_jobs', unitNumber: 10.6, levelGroup: 'A1',
    title: 'Meslekler', description: 'Mesleğini söyle, karşındakine sor',
    category: 'Temel Kelimeler', color: '#10b981', icon: '👷',
    grammarExplain: `📌 MESLEK SÖYLEME:
1. Rusçada "ben doktorum" derken şimdiki zamanda "olmak" fiili düşer: Я врач.
2. "Кто ты по профессии?" = "Mesleğin ne?"
3. Çoğu meslek adı hem kadın hem erkek için aynıdır: врач, инженер.`,
    words: [
      W('exp_a1j_1', 'Врач', 'Vraç', 'Doktor', 'A1', 'Resmî kelimedir; günlük dilde доктор da denir.'),
      W('exp_a1j_2', 'Учитель', 'Uçítyel', 'Öğretmen', 'A1', 'Kadın öğretmen: учительница.'),
      W('exp_a1j_3', 'Инженер', 'İnjinyér', 'Mühendis', 'A1', 'Fransızcadan geçmiştir, Türkçedekiyle aynı kök.'),
      W('exp_a1j_4', 'Повар', 'Póvar', 'Aşçı', 'A1', 'варить (kaynatmak) kökünden gelir.'),
      W('exp_a1j_5', 'Водитель', 'Vadítyel', 'Şoför', 'A1', 'водить (araç sürmek) fiilinden.'),
      W('exp_a1j_6', 'Студент', 'Studyént', 'Üniversite öğrencisi', 'A1', 'Okul öğrencisi ise ученик denir.')
    ],
    sentences: [
      S('Я врач.', 'Ben doktorum.'),
      S('Мой брат — инженер.', 'Erkek kardeşim mühendis.')
    ]
  },
  {
    id: 'exp_a1_animals', unitNumber: 10.7, levelGroup: 'A1',
    title: 'Hayvanlar', description: 'Evcil ve vahşi hayvan adları',
    category: 'Temel Kelimeler', color: '#84cc16', icon: '🐻',
    grammarExplain: `📌 "У МЕНЯ ЕСТЬ..." İLE SAHİPLİK:
1. "Kedim var" = У меня есть кошка.
2. Hayvan adlarında dişil/eril çiftler olabilir: кот (erkek kedi) / кошка (kedi).
3. Ayı (медведь) Rus kültürünün sembolüdür; "bal bilen" demektir.`,
    words: [
      W('exp_a1a_1', 'Кошка', 'Kóşka', 'Kedi', 'A1', 'Genel kelime dişildir; erkek kedi = кот.'),
      W('exp_a1a_2', 'Собака', 'Sabáka', 'Köpek', 'A1', 'Akanje: sabáka. Dişil cinstir.'),
      W('exp_a1a_3', 'Медведь', 'Midvyét', 'Ayı', 'A1', '"Bal bilen" demektir; sondaki ДЬ sedasızlaşır.'),
      W('exp_a1a_4', 'Птица', 'Ptítsa', 'Kuş', 'A1', 'PT ile başlayan zor bir ünsüz kümesi — pıtitsa deme!'),
      W('exp_a1a_5', 'Рыба', 'Rıba', 'Balık', 'A1', 'Ы sesi için dilini geriye çek: rıba.'),
      W('exp_a1a_6', 'Лошадь', 'Lóşat', 'At', 'A1', 'Türkçe "alaşa"yla akrabadır; dişil cinstir.')
    ],
    sentences: [
      S('У меня есть собака.', 'Bir köpeğim var.'),
      S('Кошка спит на столе.', 'Kedi masanın üstünde uyuyor.')
    ]
  },
  {
    id: 'exp_a1_feelings', unitNumber: 10.8, levelGroup: 'A1',
    title: 'Duygular', description: 'Nasıl hissettiğini söylemeyi öğren',
    category: 'Temel Kelimeler', color: '#ec4899', icon: '😊',
    grammarExplain: `📌 DUYGU KALIPLARI:
1. "Мне..." + zarf duygu bildirir: Мне хорошо. (İyiyim.) Мне грустно. (Üzgünüm.)
2. Sıfatla da olur: Я рад (mutluyum — erkek), Я рада (kadın).
3. "Как дела?" sorusuna bu ünitedeki kelimelerle cevap verebilirsin.`,
    words: [
      W('exp_a1e_1', 'Рад', 'Rat', 'Memnun / Sevinçli', 'A1', 'Kadın söylerse рада olur; sondaki Д T okunur.'),
      W('exp_a1e_2', 'Грустный', 'Grúsnıy', 'Üzgün', 'A1', 'Ortadaki Т okunmaz: grúsnıy.'),
      W('exp_a1e_3', 'Весёлый', 'Visyólıy', 'Neşeli', 'A1', 'Ё vurguludur; весело = eğlenceli bir şekilde.'),
      W('exp_a1e_4', 'Устал', 'Ustál', 'Yoruldum (erkek)', 'A1', 'Kadın: устала. Geçmiş zaman biçimidir.'),
      W('exp_a1e_5', 'Счастье', 'Şşástye', 'Mutluluk', 'A1', 'СЧ birleşimi Щ gibi okunur: şşástye.'),
      W('exp_a1e_6', 'Страх', 'Strah', 'Korku', 'A1', 'Х sesi Türkçe sert H gibidir.')
    ],
    sentences: [
      S('Я очень рад!', 'Çok memnunum!'),
      S('Сегодня мне грустно.', 'Bugün üzgünüm.')
    ]
  },
  {
    id: 'exp_a1_city', unitNumber: 10.9, levelGroup: 'A1',
    title: 'Şehirdeki Yerler', description: 'Okul, mağaza, park... yer adları ve yol tarifi başlangıcı',
    category: 'Temel Kelimeler', color: '#3b82f6', icon: '🏙️',
    grammarExplain: `📌 "ГДЕ?" ŞEHİRDE:
1. "Nerede?" в/на + yer: в школе (okulda), в парке (parkta), на почте (postanede).
2. "Где находится...?" = "... nerede bulunuyor?" kibarca sormak için.
3. идти (yürüyerek gitmek) ↔ ехать (araçla gitmek) ayrımına şimdiden alış.`,
    words: [
      W('exp_a1t_1', 'Школа', 'Şkóla', 'Okul', 'A1', 'Yunanca kökenlidir; в школе = okulda.'),
      W('exp_a1t_2', 'Магазин', 'Magazín', 'Mağaza / Dükkân', 'A1', 'Sahte dost! Dergi değil, mağaza demektir.'),
      W('exp_a1t_3', 'Парк', 'Park', 'Park', 'A1', 'Uluslararası kelime; в парке = parkta.'),
      W('exp_a1t_4', 'Улица', 'Úlitsa', 'Sokak / Cadde', 'A1', 'на улице hem "sokakta" hem "dışarıda" demektir.'),
      W('exp_a1t_5', 'Метро', 'Mitró', 'Metro', 'A1', 'Değişmez (çekimlenmez) nötr bir kelimedir.'),
      W('exp_a1t_6', 'Больница', 'Balnítsa', 'Hastane', 'A1', 'боль (ağrı) kökünden gelir.')
    ],
    sentences: [
      S('Школа находится в центре.', 'Okul merkezde bulunuyor.'),
      S('Я иду в магазин.', 'Mağazaya gidiyorum.')
    ]
  },
  {
    id: 'exp_a1_drinks', unitNumber: 10.95, levelGroup: 'A1',
    title: 'İçecekler', description: 'Çay, kahve, su — sipariş vermeye ilk adım',
    category: 'Temel Kelimeler', color: '#a855f7', icon: '🍵',
    grammarExplain: `📌 İÇECEK SİPARİŞİ:
1. En kibar kalıp: "Можно чай, пожалуйста?" (Çay alabilir miyim, lütfen?)
2. пить (içmek) çekimi: я пью, ты пьёшь, он пьёт.
3. Rus çay kültürü güçlüdür: çay yanında limon (чай с лимоном) klasiktir.`,
    words: [
      W('exp_a1r_1', 'Чай', 'Çay', 'Çay', 'A1', 'Türkçeyle aynı! Çin kökenli ortak kelime.'),
      W('exp_a1r_2', 'Кофе', 'Kófe', 'Kahve', 'A1', 'İstisna: -е ile bitse de ERİL kabul edilir.'),
      W('exp_a1r_3', 'Вода', 'Vadá', 'Su', 'A1', 'Akanje: vadá. "Votka" bu kelimenin küçültmesidir.'),
      W('exp_a1r_4', 'Сок', 'Sok', 'Meyve suyu', 'A1', 'апельсиновый сок = portakal suyu.'),
      W('exp_a1r_5', 'Молоко', 'Malakó', 'Süt', 'A1', 'Çifte akanje: malakó. Nötr cinstir.'),
      W('exp_a1r_6', 'Стакан', 'Stakán', 'Bardak', 'A1', 'Türkçedeki "istikan" (çay bardağı) buradan gelir.')
    ],
    sentences: [
      S('Я пью чай с лимоном.', 'Limonlu çay içiyorum.'),
      S('Можно стакан воды?', 'Bir bardak su alabilir miyim?')
    ]
  }
];

export const EXPANSION_A2: UnitModule[] = [
  {
    id: 'exp_a2_pharmacy', unitNumber: 40.1, levelGroup: 'A2',
    title: 'Eczanede', description: 'İlaç isteme, tarif sorma, doz anlama',
    category: 'Gündelik Yaşam', color: '#14b8a6', icon: '💊',
    grammarExplain: `📌 ECZANE KALIPLARI:
1. "У вас есть что-нибудь от...?" (...için bir şeyiniz var mı?) + hastalık: от головы, от кашля.
2. "по рецепту" = reçeteyle, "без рецепта" = reçetesiz.
3. Doz: "по одной таблетке два раза в день" (günde iki kez birer tablet).`,
    words: [
      W('exp_a2p_1', 'Аптека', 'Aptyéka', 'Eczane', 'A2', 'Yeşil haç işaretiyle bulunur; Yunanca kökenli.'),
      W('exp_a2p_2', 'Лекарство', 'Likárstva', 'İlaç', 'A2', 'лечить (tedavi etmek) kökünden gelir.'),
      W('exp_a2p_3', 'Таблетка', 'Tablyétka', 'Tablet / Hap', 'A2', 'Fransızca kökenli; küçültme ekiyle kurulmuştur.'),
      W('exp_a2p_4', 'Рецепт', 'Ritsépt', 'Reçete', 'A2', 'Hem reçete hem yemek tarifi anlamına gelir!'),
      W('exp_a2p_5', 'Кашель', 'Káşıl', 'Öksürük', 'A2', 'от кашля = öksürüğe karşı.'),
      W('exp_a2p_6', 'Температура', 'Timpiratúra', 'Ateş / Sıcaklık', 'A2', '"У меня температура" = Ateşim var.')
    ],
    sentences: [
      S('У вас есть что-нибудь от кашля?', 'Öksürük için bir şeyiniz var mı?'),
      S('Это лекарство только по рецепту.', 'Bu ilaç sadece reçeteyle.')
    ]
  },
  {
    id: 'exp_a2_hairdresser', unitNumber: 40.2, levelGroup: 'A2',
    title: 'Kuaförde', description: 'Saç kestirme, model tarif etme',
    category: 'Gündelik Yaşam', color: '#f472b6', icon: '💇',
    grammarExplain: `📌 KUAFÖRDE İSTEK BİLDİRME:
1. "Подстригите меня, пожалуйста." (Saçımı kesin lütfen.) — emir kipi + пожалуйста.
2. "покороче" (biraz daha kısa), "подлиннее" (biraz daha uzun) — по- öneki "birazcık" katar.
3. Randevu: "Можно записаться на завтра?" (Yarına kayıt olabilir miyim?)`,
    words: [
      W('exp_a2h_1', 'Парикмахерская', 'Parikmáhirskaya', 'Kuaför salonu', 'A2', 'Almanca "Perückenmacher"den (perukçu) gelir.'),
      W('exp_a2h_2', 'Стрижка', 'Stríşka', 'Saç kesimi', 'A2', 'ЖК birleşiminde Ж sedasızlaşıp Ş okunur.'),
      W('exp_a2h_3', 'Волосы', 'Vólası', 'Saçlar', 'A2', 'Hep çoğul kullanılır; tekili волос tek tel demektir.'),
      W('exp_a2h_4', 'Покороче', 'Pakaróçi', 'Biraz daha kısa', 'A2', 'по- öneki isteği yumuşatır.'),
      W('exp_a2h_5', 'Записаться', 'Zapisátsa', 'Randevu almak', 'A2', '-ться dönüşlü ek TSA okunur.'),
      W('exp_a2h_6', 'Зеркало', 'Zyérkala', 'Ayna', 'A2', 'Kuaförün olmazsa olmazı; nötr cinstir.')
    ],
    sentences: [
      S('Я хочу записаться на стрижку.', 'Saç kesimi için randevu almak istiyorum.'),
      S('Сделайте покороче, пожалуйста.', 'Biraz daha kısa yapın lütfen.')
    ]
  },
  {
    id: 'exp_a2_gym', unitNumber: 40.3, levelGroup: 'A2',
    title: 'Spor Salonunda', description: 'Antrenman, üyelik ve ekipman konuşmaları',
    category: 'Gündelik Yaşam', color: '#f97316', icon: '🏋️',
    grammarExplain: `📌 SPOR FİİLLERİ:
1. заниматься + araç hâli: заниматься спортом (sporla uğraşmak).
2. "Ходить в зал" = spor salonuna (düzenli) gitmek — tekrarlı hareket fiili ходить.
3. раз/раза: один раз (bir kez), два раза (iki kez), пять раз (beş kez).`,
    words: [
      W('exp_a2g_1', 'Тренировка', 'Trinirófka', 'Antrenman', 'A2', 'В sedasızlaşıp F okunur: trinirófka.'),
      W('exp_a2g_2', 'Зал', 'Zal', 'Salon / Spor salonu', 'A2', 'Günlük dilde спортзал kısaca зал denir.'),
      W('exp_a2g_3', 'Абонемент', 'Abanimyént', 'Üyelik / Abonelik', 'A2', 'Fransızca kökenli; aylık üyelik kartı.'),
      W('exp_a2g_4', 'Бегать', 'Byégat', 'Koşmak', 'A2', 'Tekrarlı koşma; tek yönlü koşma = бежать.'),
      W('exp_a2g_5', 'Сильный', 'Sílnıy', 'Güçlü', 'A2', 'сила (güç) kökünden.'),
      W('exp_a2g_6', 'Отдых', 'Óddıh', 'Dinlenme', 'A2', 'Setler arası mola da отдых kelimesiyle söylenir.')
    ],
    sentences: [
      S('Я хожу в зал три раза в неделю.', 'Haftada üç kez spor salonuna gidiyorum.'),
      S('После тренировки нужен отдых.', 'Antrenmandan sonra dinlenme gerekli.')
    ]
  },
  {
    id: 'exp_a2_cinema', unitNumber: 40.4, levelGroup: 'A2',
    title: 'Sinemada', description: 'Bilet alma, film seçme, seans sorma',
    category: 'Gündelik Yaşam', color: '#6366f1', icon: '🎬',
    grammarExplain: `📌 SİNEMA KALIPLARI:
1. "билет на + film/seans": билет на вечерний сеанс (akşam seansına bilet).
2. "Во сколько начинается...?" (... saat kaçta başlıyor?)
3. Film türleri: комедия, драма, боевик (aksiyon), ужасы (korku).`,
    words: [
      W('exp_a2k_1', 'Кинотеатр', 'Kinatiátr', 'Sinema (bina)', 'A2', 'кино film sanatı, кинотеатр binadır.'),
      W('exp_a2k_2', 'Билет', 'Bilyét', 'Bilet', 'A2', 'Türkçeyle aynı Fransızca kökten gelir.'),
      W('exp_a2k_3', 'Сеанс', 'Siáns', 'Seans', 'A2', 'вечерний сеанс = akşam seansı.'),
      W('exp_a2k_4', 'Фильм', 'Film', 'Film', 'A2', 'смотреть фильм = film izlemek.'),
      W('exp_a2k_5', 'Место', 'Myésta', 'Yer / Koltuk', 'A2', 'ряд (sıra) + место (koltuk) bilette yazar.'),
      W('exp_a2k_6', 'Попкорн', 'Papkórn', 'Patlamış mısır', 'A2', 'İngilizceden geçmiş, çekimlenir: с попкорном.')
    ],
    sentences: [
      S('Два билета на вечерний сеанс, пожалуйста.', 'Akşam seansına iki bilet lütfen.'),
      S('Во сколько начинается фильм?', 'Film saat kaçta başlıyor?')
    ]
  },
  {
    id: 'exp_a2_train', unitNumber: 40.5, levelGroup: 'A2',
    title: 'Tren Yolculuğu', description: 'Gar, peron, vagon — Rusya\'nın klasik ulaşımı',
    category: 'Gündelik Yaşam', color: '#0ea5e9', icon: '🚆',
    grammarExplain: `📌 TREN KALIPLARI:
1. "поезд в/до + şehir": поезд до Москвы (Moskova treni).
2. отправление (kalkış) ↔ прибытие (varış) — tabelalarda görürsün.
3. Rus trenlerinde vagon tipleri: плацкарт (açık kuşetli), купе (kompartıman).`,
    words: [
      W('exp_a2t_1', 'Поезд', 'Póist', 'Tren', 'A2', 'Çoğulu поезда (vurgu sona kayar).'),
      W('exp_a2t_2', 'Вокзал', 'Vagzál', 'Gar', 'A2', 'Londra\'daki Vauxhall istasyonundan geldiği söylenir!'),
      W('exp_a2t_3', 'Платформа', 'Platfórma', 'Peron', 'A2', 'Tabelada путь (hat/yol) da yazabilir.'),
      W('exp_a2t_4', 'Вагон', 'Vagón', 'Vagon', 'A2', 'номер вагона = vagon numarası bilette yazar.'),
      W('exp_a2t_5', 'Купе', 'Kupé', 'Kompartıman', 'A2', 'Değişmez nötr kelime; 4 kişilik kapalı bölme.'),
      W('exp_a2t_6', 'Расписание', 'Raspisániye', 'Tarife / Sefer saatleri', 'A2', 'писать (yazmak) kökünden gelir.')
    ],
    sentences: [
      S('Поезд до Москвы отправляется в восемь.', 'Moskova treni sekizde kalkıyor.'),
      S('Наш вагон — номер пять.', 'Bizim vagon beş numara.')
    ]
  },
  {
    id: 'exp_a2_hotel', unitNumber: 40.6, levelGroup: 'A2',
    title: 'Otelde', description: 'Rezervasyon, check-in ve oda talepleri',
    category: 'Gündelik Yaşam', color: '#eab308', icon: '🏨',
    grammarExplain: `📌 OTEL KALIPLARI:
1. "Я забронировал номер." (Oda rezerve ettim.) — otelde номер "oda" demektir!
2. "номер на двоих" = iki kişilik oda; "с завтраком" = kahvaltı dahil.
3. Check-in = заселение, check-out = выезд.`,
    words: [
      W('exp_a2o_1', 'Гостиница', 'Gastínitsa', 'Otel', 'A2', 'гость (misafir) kökünden; отель de kullanılır.'),
      W('exp_a2o_2', 'Номер', 'Nómir', 'Oda (otelde)', 'A2', 'Dikkat: otelde номер sayı değil ODA demektir.'),
      W('exp_a2o_3', 'Бронь', 'Bron', 'Rezervasyon', 'A2', 'забронировать = rezerve etmek fiilinin kısaltması.'),
      W('exp_a2o_4', 'Ключ', 'Klyuç', 'Anahtar', 'A2', 'ключ от номера = oda anahtarı.'),
      W('exp_a2o_5', 'Завтрак', 'Záftrak', 'Kahvaltı', 'A2', 'В sedasızlaşır: záftrak. "Завтра" (yarın) ile karıştırma!'),
      W('exp_a2o_6', 'Этаж', 'Etáş', 'Kat', 'A2', 'Sondaki Ж sedasızlaşıp Ş okunur; на втором этаже = ikinci katta.')
    ],
    sentences: [
      S('Я забронировал номер на двоих.', 'İki kişilik oda rezerve ettim.'),
      S('Завтрак входит в стоимость?', 'Kahvaltı fiyata dahil mi?')
    ]
  },
  {
    id: 'exp_a2_post', unitNumber: 40.7, levelGroup: 'A2',
    title: 'Postanede', description: 'Mektup, koli gönderme ve adres yazma',
    category: 'Gündelik Yaşam', color: '#22c55e', icon: '📮',
    grammarExplain: `📌 POSTANE KALIPLARI:
1. отправить (göndermek) + ismin -и hâli yön: отправить письмо в Турцию.
2. Rusçada adres büyükten küçüğe yazılır: ülke → şehir → sokak → isim.
3. "Сколько идёт посылка?" = "Koli ne kadar sürede gider?"`,
    words: [
      W('exp_a2m_1', 'Почта', 'Póçta', 'Postane / Posta', 'A2', 'на почте = postanede (в değil на!).'),
      W('exp_a2m_2', 'Письмо', 'Pismó', 'Mektup', 'A2', 'писать (yazmak) kökünden; nötr cinstir.'),
      W('exp_a2m_3', 'Посылка', 'Pasılka', 'Koli / Paket', 'A2', 'послать (göndermek) kökünden gelir.'),
      W('exp_a2m_4', 'Марка', 'Márka', 'Pul', 'A2', 'Koleksiyonculuk hâlâ yaygın bir hobidir.'),
      W('exp_a2m_5', 'Адрес', 'Ádris', 'Adres', 'A2', 'Vurgu başta: Ádris. Çoğulu адреса.'),
      W('exp_a2m_6', 'Отправить', 'Atprávit', 'Göndermek', 'A2', 'Tamamlanmış görünüş; süreç hâli отправлять.')
    ],
    sentences: [
      S('Я хочу отправить посылку в Турцию.', 'Türkiye\'ye koli göndermek istiyorum.'),
      S('Напишите адрес, пожалуйста.', 'Adresi yazın lütfen.')
    ]
  },
  {
    id: 'exp_a2_guest', unitNumber: 40.8, levelGroup: 'A2',
    title: 'Misafirlikte', description: 'Rus evine davet: hediye, sofra ve nezaket',
    category: 'Gündelik Yaşam', color: '#d946ef', icon: '🎁',
    grammarExplain: `📌 MİSAFİRLİK KÜLTÜRÜ:
1. "идти в гости" = misafirliğe gitmek; "быть в гостях" = misafirlikte olmak.
2. Rus evine girerken ayakkabı çıkarılır, ev sahibi terlik (тапочки) verir.
3. "Угощайтесь!" = "Buyurun, alın!" (ikram kalıbı).`,
    words: [
      W('exp_a2v_1', 'Гость', 'Gost', 'Misafir', 'A2', 'идти в гости = misafirliğe gitmek kalıbı çok yaygın.'),
      W('exp_a2v_2', 'Подарок', 'Padárak', 'Hediye', 'A2', 'дарить (hediye etmek) kökünden.'),
      W('exp_a2v_3', 'Тапочки', 'Tápaçki', 'Terlik', 'A2', 'Rus evinde misafire ilk verilen şey!'),
      W('exp_a2v_4', 'Хозяин', 'Hazyáin', 'Ev sahibi', 'A2', 'Kadın ev sahibi: хозяйка.'),
      W('exp_a2v_5', 'Угощение', 'Ugaşşéniye', 'İkram', 'A2', 'Щ uzun ve yumuşak ŞŞ gibi okunur.'),
      W('exp_a2v_6', 'Тост', 'Tost', 'Kadeh konuşması', 'A2', 'Sahte dost: kızarmış ekmek değil, kadeh kaldırma konuşması!')
    ],
    sentences: [
      S('Мы идём в гости к бабушке.', 'Babaanneye misafirliğe gidiyoruz.'),
      S('Спасибо за угощение!', 'İkram için teşekkürler!')
    ]
  },
  {
    id: 'exp_a2_holidays', unitNumber: 40.9, levelGroup: 'A2',
    title: 'Bayramlar ve Kutlamalar', description: 'Yılbaşı, doğum günü ve tebrik kalıpları',
    category: 'Gündelik Yaşam', color: '#ef4444', icon: '🎄',
    grammarExplain: `📌 TEBRİK KALIBI:
1. "Поздравляю с + araç hâli": Поздравляю с днём рождения! (Doğum gününü kutlarım!)
2. Kısaca "С праздником!" (Bayramın kutlu olsun!) her bayramda işler.
3. Rusya'da yılbaşı (Новый год) Noel'den daha büyük kutlanır; hediyeleri Дед Мороз getirir.`,
    words: [
      W('exp_a2y_1', 'Праздник', 'Práznik', 'Bayram / Kutlama', 'A2', 'Д okunmaz: práznik.'),
      W('exp_a2y_2', 'Новый год', 'Nóvıy got', 'Yılbaşı', 'A2', 'Rusya\'nın en büyük bayramı; 31 Aralık gecesi kutlanır.'),
      W('exp_a2y_3', 'День рождения', 'Dyen rajdyéniya', 'Doğum günü', 'A2', 'Kelimesi kelimesine "doğuş günü".'),
      W('exp_a2y_4', 'Поздравлять', 'Pazdravlyát', 'Kutlamak / Tebrik etmek', 'A2', 'здоровье (sağlık) köküyle akrabadır.'),
      W('exp_a2y_5', 'Ёлка', 'Yólka', 'Yılbaşı ağacı / Ladin', 'A2', 'Yılbaşının simgesi; Ё vurguludur.'),
      W('exp_a2y_6', 'Желать', 'Jılát', 'Dilemek', 'A2', 'Желаю счастья! = Mutluluklar dilerim!')
    ],
    sentences: [
      S('Поздравляю с днём рождения!', 'Doğum gününü kutlarım!'),
      S('Желаю тебе счастья и здоровья.', 'Sana mutluluk ve sağlık dilerim.')
    ]
  },
  {
    id: 'exp_a2_picnic', unitNumber: 40.95, levelGroup: 'A2',
    title: 'Piknik ve Doğa', description: 'Daça, orman, mangal — Rus hafta sonu klasiği',
    category: 'Gündelik Yaşam', color: '#65a30d', icon: '🧺',
    grammarExplain: `📌 DOĞADA HAREKET:
1. "ехать на дачу" = daçaya gitmek; "на природе" = doğada.
2. собирать грибы (mantar toplamak) Rusya'da millî hobidir!
3. Hava durumu: "Какая сегодня погода?" (Bugün hava nasıl?)`,
    words: [
      W('exp_a2n_1', 'Дача', 'Dáça', 'Yazlık / Daça', 'A2', 'Şehir dışı bahçeli ev; Rus kültürünün simgesi.'),
      W('exp_a2n_2', 'Лес', 'Lyes', 'Orman', 'A2', 'в лесу = ormanda (kural dışı -у eki).'),
      W('exp_a2n_3', 'Гриб', 'Grip', 'Mantar', 'A2', 'Sondaki Б P okunur; mantar toplamak millî hobidir.'),
      W('exp_a2n_4', 'Шашлык', 'Şaşlık', 'Şaşlık / Mangal eti', 'A2', 'Türkçe "şişlik"ten geçmiştir!'),
      W('exp_a2n_5', 'Погода', 'Pagóda', 'Hava durumu', 'A2', 'Akanje: pagóda.'),
      W('exp_a2n_6', 'Река', 'Riká', 'Nehir', 'A2', 'Vurgu sondadır; на реке = nehir kenarında.')
    ],
    sentences: [
      S('В субботу мы едем на дачу.', 'Cumartesi daçaya gidiyoruz.'),
      S('Мы собираем грибы в лесу.', 'Ormanda mantar topluyoruz.')
    ]
  }
];
