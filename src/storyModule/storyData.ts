// ============================================================================
// HİKAYE MODÜLÜ — KONTROL NOKTASI HİKAYELERİ (storyData)
// ----------------------------------------------------------------------------
// Her 10 müfredat ünitesi tamamlandığında bir kontrol noktası hikayesi açılır.
// Hikayeler:
//   • O 10 ünitede öğrenilen kelimelerle kurulur (tek tek kontrol edilmiştir),
//   • en fazla 5-6 YENİ kelime içerir (sözlük kartı olarak gösterilir),
//   • How I Met Your Mother tarzı sit-com mizahıyla yazılır: 2035'te Dima
//     çocuklarına hikayeyi anlatır; tekrarlayan karakter kadrosu absürt
//     durum komedileri üretir.
//
// Ana kadro (Dima, Marina, Tyoma, Zhenya, Lena) tüm bölümlerde aynıdır; böylece
// "eğlenceli karakter dinamikleri" tıpkı bir sitcom gibi bölüm bölüm kurulur.
// ============================================================================

import type { CheckpointStory } from './types';

/** Kaç ünite tamamlandığında bir hikaye kontrol noktası açılır. */
export const STORY_UNITS_PER_CHECKPOINT = 10;

/** Hikayelerin tekrarlayan kadrosu — ekranda "Kadro" kartı olarak gösterilir. */
export const STORY_CAST: { name: string; emoji: string; desc: string }[] = [
  { name: 'Dima', emoji: '📐', desc: 'Romantik mimar. 2035\'te çocuklarına bu hikayeleri anlatıyor.' },
  { name: 'Marina', emoji: '📰', desc: 'Zeki ve alaycı gazeteci. Hiçbir şaka onu es geçemez (genelde).' },
  { name: 'Tyoma', emoji: '🤵', desc: 'Takım elbiseli efsanevi manitacı. Sözü: «Это будет легендарно!» (Efsanevi olacak!)' },
  { name: 'Zhenya', emoji: '⚖️', desc: 'İyi kalpli, yemek düşkünü avukat. Lena\'nın eşi.' },
  { name: 'Lena', emoji: '🎨', desc: 'Ana sınıfı öğretmeni; grubun annesi. Sürprizleri ve planları sever.' },
  { name: 'Vera', emoji: '🎤', desc: 'İroni seven, oyun sevmeyen kadın; Tyoma\'nın kaderi.' },
  { name: 'Vova Amca', emoji: '🎣', desc: 'Elli yaşında, boşanmış, ikinci baharını yaşayan amca.' },
  // --- «Ван Гог» restoranı ekibi (Кухня dizisinden esinlenme) ---
  { name: 'Şef Pyotr', emoji: '🍳', desc: '«Ван Гог» restoranının efsanevi aşçısı. Bağırır ama kalbi altın (ve sosları mükemmel).' },
  { name: 'Lyosha', emoji: '🍽️', desc: '«Ван Гог»un şanssız ama iyi kalpli garsonu. Tepsi düşürme dünya rekoru sahibi (kendi beyanı).' },
  { name: 'Nina', emoji: '📋', desc: 'Başgarson. Kuralcı, zeki ve Pyotr\'nun 12 yıllık sağ kolu (ve kalbi).' },
  { name: 'Semyon', emoji: '🎩', desc: 'Metrdotel. Kibar, ölçülü ve her şeyi kontrol listesiyle yapan bir adam.' },
];

// ---------------------------------------------------------------------------
// BÖLÜM 1 — Ünite 1-10 (Tanışma, Aile, Kafe, Ulaşım, Sayılar, Hava,
//                   Alışveriş, Telefon, Ev, Randevu/Zaman)
// ---------------------------------------------------------------------------
const STORY_1: CheckpointStory = {
  id: 'story_cp1',
  kind: 'checkpoint',
  checkpoint: 1,
  unitFrom: 1,
  unitTo: 10,
  titleRu: 'Как я встретил вашу маму',
  titleTr: 'Annenizle Nasıl Tanıştım',
  framingTr:
    'Yıl 2035. Dima, çocuklarına anneleriyle nasıl tanıştığını anlatmaya devam ediyor — tıpkı eski bir sitcom gibi. Bu bölümde: yağmur, bir kafe ve bir telefon numarası.',
  icon: '🌧️',
  color: '#38bdf8',
  searchQuery: 'How I Met Your Mother yellow umbrella scene',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Дети, сегодня я расскажу вам одну историю. Она называется: «Как я встретил вашу маму».', reading: 'Dyéti, sivódnya ya rasskazhú vam adnú istóriyu. Aná nazývayetsya: «Kak ya vstrétil váshu mámu».', tr: 'Çocuklar, bugün size bir hikaye anlatacağım. Adı: "Annenizle nasıl tanıştım".' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Двенадцать лет назад. Кофейня. На улице дождь. Я пил кофе и в пятый раз читал меню.', reading: 'Dvyénadtsat\' lyet nazád. Kafyéynya. Na úlitse dózhd\'. Ya pil kófe i f pyátyy ras chitál menyú.', tr: 'On iki yıl önce. Bir kafe. Dışarıda yağmur var. Kahve içiyordum ve menüyü beşinci kez okuyordum.' },
    { speaker: 'Dima', ru: 'Добрый вечер! Меня зовут Дима. Можно сесть здесь?', reading: 'Dóbry vécher! Minyá zavút Díma. Mózhna sest\' zdes\'?', tr: 'İyi akşamlar! Benim adım Dima. Buraya oturabilir miyim?' },
    { speaker: 'Marina', ru: 'Привет. Я Марина. Только, пожалуйста, не говорите про погоду.', reading: 'Privét. Ya Marína. Tól\'ka, pazhálusta, ne gavarítye pra pagódu.', tr: 'Merhaba. Ben Marina. Ama lütfen hava durumundan bahsetmeyin.' },
    { speaker: 'Dima', ru: 'Сегодня солнце, завтра дождь. Погода — как жизнь!', reading: 'Sivódnya sóntse, závtra dózhd\'. Pagóda — kak zhýzn\'!', tr: 'Bugün güneş, yarın yağmur. Hava tıpkı hayat gibi!' },
    { speaker: 'Marina', ru: 'Это очень странно. Но мне нравится.', reading: 'Éta óchen\' stránna. No mné nrávitstya.', tr: 'Bu çok garip. Ama hoşuma gitti.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Мы говорили два часа: о семье, о погоде, даже о ценах на чай.', reading: 'My gavaríli dva chasá: a sim\'yé, a pagóde, dázhe a tsénakh na chay.', tr: 'İki saat konuştuk: aileden, havadan, hatta çay fiyatlarından.' },
    { speaker: 'Marina', ru: 'Мой номер? Хорошо. Но звоните завтра — сегодня я занята.', reading: 'Moy nómer? Haraşó. No zvanítye závtra — sivódnya ya zanyáta.', tr: 'Numaram mı? Tamam. Ama yarın arayın — bugün meşgulüm.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Я ждал завтра целый день. Самый длинный день в моей жизни.', reading: 'Ya zhdál závtra tsélyy dyen\'. Sámyy dlínnıy dyen\' v mayó zhýzni.', tr: 'Yarını bütün gün bekledim. Hayatımdaki en uzun gün.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Вдруг зазвонил телефон. «Дима? Это Марина. Вы, вероятно, думаете, что девушки не звонят первыми. Сегодня — исключение: вы свободны вечером?»', reading: 'Vdrug zazvaníl tilifón. «Díma? Éta Marína. Vy, veróyatna, dúmayete, shto dévushki ne zvónyat pérvymi. Sivódnya — isklyuchéniye: vy svabódny vécherom?»', tr: 'Birden telefon çaldı. "Dima? Ben Marina. Herhalde kızların ilk aramadığını düşünüyorsun. Bugün istisna: bu akşam müsait misin?"' },
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Вот так, дети: дождь, кофе и один звонок. Наконец-то я встретил вашу маму.', reading: 'Vot tak, dyéti: dózhd\', kófe i adín zvának. Kanéts-ta ya vstrétil váshu mámu.', tr: 'İşte böyle çocuklar: yağmur, kahve ve bir telefon. Sonunda annenizle tanıştım.' },
  ],
  newWords: [
    { ru: 'История', reading: 'Istóriya', tr: 'Hikaye', note: 'Dima\'nın çocuklarına anlattığı her şeyin adı: "история".' },
    { ru: 'Только', reading: 'Tól\'ka', tr: 'Sadece; ama', note: 'Cümle başında nazik bir uyarı getirir: "Только не говорите про погоду".' },
    { ru: 'Самый', reading: 'Sámyy', tr: 'En (üstünlük eki)', note: '"самый длинный день" — en uzun gün.' },
    { ru: 'Вдруг', reading: 'Vdrug', tr: 'Birden, birdenbire', note: 'Anlatıda sürpriz anlarını işaret eder.' },
    { ru: 'Вероятно', reading: 'Veróyatna', tr: 'Herhalde, muhtemelen', note: 'Kibar tahmin zarfı; "наверное" ile eş anlamlıdır.' },
    { ru: 'Наконец-то', reading: 'Kanéts-ta', tr: 'Sonunda', note: 'Uzun bir bekleyişin sonunda duyulan rahatlama.' },
  ],
  keyPoints: [
    { id: 'cp1_k1', textTr: 'Hikaye, Dima\'nın (2035\'te) çocuklarına anneleriyle nasıl tanıştığını anlatmasıyla başlar.', hintTr: 'Hikayeyi kim, kime anlatıyor?', keywordGroups: [['çocuk'], ['anlat']] },
    { id: 'cp1_k2', textTr: 'Tanışma, yağmurlu bir akşam bir kafede gerçekleşir.', hintTr: 'Buluşma nerede oldu ve havada ne vardı?', keywordGroups: [['kafe', 'kahve'], ['yağmur', 'yağmurlu']] },
    { id: 'cp1_k3', textTr: 'Dima kendini tanıtır ve Marina\'nın yanına oturmak ister.', hintTr: 'Dima Marina\'ya ilk olarak ne yaptı?', keywordGroups: [['dima'], ['tanıt', 'adım', 'isim', 'otur']] },
    { id: 'cp1_k4', textTr: 'Hava durumu sohbetin konusudur (Marina istememesine rağmen).', hintTr: 'Marina hangi konudan bahsetmemesini istedi? Peki Dima ne yaptı?', keywordGroups: [['hava']] },
    { id: 'cp1_k5', textTr: 'İki saat boyunca aile, hava ve çay fiyatları gibi konulardan konuşurlar.', hintTr: 'Ne kadar konuştular ve nelerden?', keywordGroups: [['iki', '2'], ['konuş', 'sohbet']] },
    { id: 'cp1_k6', textTr: 'Marina numarasını verir ama bugün meşgul olduğunu, yarın aranmasını ister.', hintTr: 'Telefon numarası konusunda Marina ne şart koştu?', keywordGroups: [['numara', 'telefon'], ['yarın']] },
    { id: 'cp1_k7', textTr: 'Sonunda Marina Dima\'yı arar ve akşam için müsait olup olmadığını sorar.', hintTr: 'Ertesi günü kim, kimi aradı?', keywordGroups: [['marina'], ['müsait', 'akşam', 'boş', 'buluş', 'randevu']] },
    { id: 'cp1_k8', textTr: 'Dima bunu hayatının en güzel hikayesinin başlangıcı olarak görür.', hintTr: 'Dima bu tanışmayı nasıl nitelendirdi?', keywordGroups: [['hikaye'], ['başlangıç', 'güzel', 'en güzel', 'en iyi']] },
  ],
  misleading: [
    { tokens: ['güneşli bir gün', 'hava güneşli', 'güneşliydi', 'güneşliydi.'], noteTr: 'O akşam dışarıda YAĞMUR vardı; hava güneşli değildi (güneş yalnızca Dima\'nın esprisinde geçiyor).' },
    { tokens: ['dima aradı', 'dima arıyor', 'dima onu aradı', 'dima ilk aradı'], noteTr: 'İlk arayan Marina\'ydı — Dima sadece (çok sabırla) bekledi.' },
    { tokens: ['restoranda'], noteTr: 'İlk tanışma bir KAFEDE oldu, restoranda değil.' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM 2 — Ünite 11-20 (Mutfak Kaosu, Duygular, Doktor, Hobiler, Komşuluk,
//                   Nezaket, Bağlaçlar, Davet/Misafirlik, Duygusal Tartışma,
//                   Doktor & Hastane)
// ---------------------------------------------------------------------------
const STORY_2: CheckpointStory = {
  id: 'story_cp2',
  kind: 'checkpoint',
  checkpoint: 2,
  unitFrom: 11,
  unitTo: 20,
  titleRu: 'Ужин, который почти сгорел',
  titleTr: 'Neredeyse Yanan Akşam Yemeği',
  framingTr:
    'Yıl 2035. Dima anlatmaya devam ediyor: "Annenizle tanıştıktan sonraki ilk grup yemeği... ve neredeyse yanan bir tavuk." Jenya ile Lena\'nın evinde bir akşam yemeği.',
  icon: '🔥',
  color: '#f97316',
  searchQuery: 'How I Met Your Mother funny dinner scene',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Дети, после первого свидания была вторая проблема: ужин у Жени и Лены.', reading: 'Dyéti, pósle pérvava svidániya býla vtaráya prabléma: úzhin u Zhéni i Lyény.', tr: 'Çocuklar, ilk buluşmadan sonra ikinci bir sorun geldi: Jenya ve Lena\'da akşam yemeği.' },
    { speaker: 'Zhenya', ru: 'Лена, гости приходят в семь! Соус готов? Курица готова?', reading: 'Lyéna, gósti prikhódyat f syém! Sus gótav? Kurítsa gótava?', tr: 'Lena, konuklar yedide geliyor! Sos hazır? Tavuk hazır?' },
    { speaker: 'Lena', ru: 'Почти! Помогите — кухня, быстро!', reading: 'Pachtí! Pamagítye — kúkhnya, býstra!', tr: 'Neredeyse! İmdat — mutfak, çabuk!' },
    { speaker: 'Tyoma', ru: 'Спокойно, я профессионал. Ну... почти.', reading: 'Spakóyna, ya prafisyAnál. Nu... pachti.', tr: 'Sakin olun, ben profesyonelim. Şey... neredeyse.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Курица горела. Дым был везде — даже сосед постучал в дверь.', reading: 'Kurítsa garéla. Dym býl vsyedá — dázhe sósed pastuchál f dvér.', tr: 'Tavuk yanıyordu. Duman her yerdeydi — kapıyı komşu bile çaldı.' },
    { speaker: 'Komşu', ru: 'Тихо, пожалуйста! И... что горит?', reading: 'Tíkha, pazhálusta! I... shto garít?', tr: 'Sessiz olun lütfen! Ve... ne yanıyor?' },
    { speaker: 'Zhenya', ru: 'Извините! Праздник, гости, кухня... К сожалению, курица теперь чёрная.', reading: 'Izvinítye! Práznik, gósti, kúkhnya... K sazhályéniyu, kurítsa tipér\' chórnaya.', tr: 'Özür dileriz! Bayram, konuklar, mutfak... Ne yazık ki tavuk artık simsiyah.' },
    { speaker: 'Lena', ru: 'К счастью, у меня есть пицца в холодильнике!', reading: 'K schást\'yu, u minyá yest\' pítsa f chaladíl\'nike!', tr: 'İyi ki buzdolabında pizzam var!' },
    { speaker: 'Marina', ru: 'Самый лучший ужин в моей жизни. Вкусно, весело и немного дыма.', reading: 'Sámyy lúchshiy úzhin v mayó zhýzni. Vkúsna, vyésyela i nimnóga dýma.', tr: 'Hayatımdaki en iyi akşam yemeği. Lezzetli, eğlenceli ve biraz duman.' },
    { speaker: 'Tyoma', ru: 'Дима, запомни: если девушка смеётся над горелой курицей — это любовь.', reading: 'Díma, zapámní: yésli dévushka smeyótsya nad garélai kurítsay — éta lyubóf\'.', tr: 'Dima, hatırla: bir kız yanık tavuğa gülüyorsa — bu aşktır.' },
  ],
  newWords: [
    { ru: 'Ужин', reading: 'Úzhin', tr: 'Akşam yemeği', note: 'Обед öğle yemeği, ужин akşam yemeğidir.' },
    { ru: 'Почти', reading: 'Pachti', tr: 'Neredeyse, az kalsın', note: '"Готов? — Почти!" — "Hazır mı? — Neredeyse!"' },
    { ru: 'Гореть', reading: 'Garét\'', tr: 'Yanmak', note: '"Курица горела" — tavuk yanıyordu.' },
    { ru: 'К сожалению', reading: 'K sazhályéniyu', tr: 'Ne yazık ki', note: 'Kötü haber verirken kullanılan kalıp.' },
    { ru: 'К счастью', reading: 'K schást\'yu', tr: 'İyi ki, neyse ki', note: 'İyi haber verirken kullanılan kalıp.' },
    { ru: 'Любовь', reading: 'Lyubóf\'', tr: 'Aşk', note: 'Dişil; Rusçanın en meşhur kelimesi.' },
  ],
  keyPoints: [
    { id: 'cp2_k1', textTr: 'Akşam yemeği, grup olarak Jenya ve Lena\'nın evinde yenir.', hintTr: 'Akşam yemeği nerede ve kimlerle yeniyordu?', keywordGroups: [['jenya', 'zhenya'], ['lena'], ['akşam yemeği', 'yemek']] },
    { id: 'cp2_k2', textTr: 'Konuklar saat yedide gelecektir; mutfakta sos ve tavuk henüz hazır değildir.', hintTr: 'Konuklar kaçta geliyordu ve mutfakta ne henüz hazır değildi?', keywordGroups: [['yedi'], ['sos', 'tavuk', 'hazır']] },
    { id: 'cp2_k3', textTr: 'Tyoma kendini "profesyonel" diye tanıtır (neredeyse).', hintTr: 'Tyoma kendisi hakkında ne iddia etti?', keywordGroups: [['töma', 'tyoma'], ['profesyonel']] },
    { id: 'cp2_k4', textTr: 'Tavuk yanar ve duman her yere yayılır.', hintTr: 'Tavuğa ne oldu? Evde ne her yerdeydi?', keywordGroups: [['tavuk'], ['yan', 'duman']] },
    { id: 'cp2_k5', textTr: 'Komşu kapıyı çalar ve sessiz olmalarını rica eder.', hintTr: 'Kapıya kim geldi ve ne istedi?', keywordGroups: [['komşu'], ['sessiz', 'gürültü', 'ses']] },
    { id: 'cp2_k6', textTr: 'Lena buzdolabında pizza olduğunu söyleyince akşam kurtulur.', hintTr: 'Yemeği hangi "kurtarıcı" kurtardı?', keywordGroups: [['pizza'], ['buzdolab', 'lena']] },
    { id: 'cp2_k7', textTr: 'Marina bunu hayatının en iyi/eğlenceli akşam yemeği diye tanımlar.', hintTr: 'Marina akşamı nasıl değerlendirdi?', keywordGroups: [['marina'], ['eğlenceli', 'en iyi', 'lezzetli', 'güzel']] },
    { id: 'cp2_k8', textTr: 'Tyoma\'ya göre yanık tavuğa gülen kız = aşk.', hintTr: 'Tyoma\'nın "tavuk teorisi" neydi?', keywordGroups: [['aşk'], ['gül']] },
  ],
  misleading: [
    { tokens: ['restoranda'], noteTr: 'Akşam yemeği restoranda değil, Jenya ile Lena\'nın EVİNDEYDİ.' },
    { tokens: ['töma pişirdi', 'tyoma pişirdi'], noteTr: 'Yemeği Tyoma değil, Jenya ve Lena hazırlıyordu; Tyoma sadece "teori" verdi.' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM 3 — Ünite 21-30 (İş Görüşmesi, Dedikodu, Resmi İletişim, Market,
//                   Ev Kiralama, Banka, Eczane, Flört/Manitacılık, Randevu,
//                   İlk Buluşma)
// ---------------------------------------------------------------------------
const STORY_3: CheckpointStory = {
  id: 'story_cp3',
  kind: 'checkpoint',
  checkpoint: 3,
  unitFrom: 21,
  unitTo: 30,
  titleRu: 'Наушник',
  titleTr: 'Kulaklık',
  framingTr:
    'Yıl 2035. Dima: "Yeni işim, ilk gerçek randevum... ve kulağımda bir Tyoma." Bu bölümde: bir iş görüşmesi, bir restoran ve tarihin en kötü kulaklık operasyonu.',
  icon: '🎧',
  color: '#a78bfa',
  searchQuery: 'How I Met Your Mother best funny moments',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Сначала — работа. У Димы было собеседование в большой компании.', reading: 'Snachála — rabóta. U Dímy býla sabesyédavaniye v bal\'shóy kampaníi.', tr: 'Önce iş. Dima büyük bir şirkette iş görüşmesine girdi.' },
    { speaker: 'Patron', ru: 'Ваше резюме отличное. Зарплата — вот такая. Когда можете начать?', reading: 'Váshe razyumyé atlíchwaye. Zarpláta — vot takáya. Kagdá mózhete nachát\'?', tr: 'Özgeçmişiniz harika. Maaş şu kadar. Ne zaman başlayabilirsiniz?' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Работа есть. Теперь — свидание с Мариной. И, конечно, план Тёмы.', reading: 'Rabóta yest\'. Tipér\' — svidániye s Maríinay. I, kanyéchna, plan Tyómy.', tr: 'İş tamam. Sıra Marina ile randevuda. Ve elbette Tyoma\'nın planı.' },
    { speaker: 'Tyoma', ru: 'Надень наушник. Я буду говорить тебе правильные слова. Это будет... легендарно.', reading: 'Nadén\' naúshnik. Ya búdu gavarít\' tibyé pravíl\'nyye slóva. Éta búdit... lyendárna.', tr: 'Kulaklığı tak. Sana doğru kelimeleri söyleyeceğim. Bu... efsanevi olacak.' },
    { speaker: 'Dima', ru: 'Марина, вот наш столик. Я... э... уже заказал... э...', reading: 'Marína, vot nash stólik. Ya... e... uzhe zakazál... e...', tr: 'Marina, işte masamız. Ben... şey... siparişimi verdim... şey...' },
    { speaker: 'Tyoma', ru: 'Скажи: «Ты сегодня прекрасна»!', reading: 'Skazhí: «Ty sivódnya prekrásna»!', tr: 'De ki: "Bugün harikasın!"' },
    { speaker: 'Dima', ru: 'Ты сегодня... пельмени? Нет! В смысле... прекрасна!', reading: 'Ty sivódnya... pel\'méni? Nyet! F smýsle... prekrásna!', tr: 'Bugün... mantı? Hayır! Yani... harikasın!' },
    { speaker: 'Marina', ru: 'Дима, кто говорит в твоём ухе? Я почти вижу наушник.', reading: 'Díma, kta gavarít f tvayóm úkhe? Ya pachti vízhu naúshnik.', tr: 'Dima, kulağında kim konuşuyor? Kulaklığı neredeyse görebiliyorum.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Дима покраснел. Паника! Но потом он шёпотом сказал правду — про Тёму и его советы.', reading: 'Díma pakrasnyél. Paníka! No patóm on shópatam skazál právdu — pra Tyómu i yevó svéty.', tr: 'Dima kızardı. Panik! Ama sonra fısıltıyla doğruyu söyledi — Tyoma ve onun tavsiyeleri hakkında.' },
    { speaker: 'Marina', ru: 'Мой совет: убери наушник и просто будь собой.', reading: 'Moy svét: uberí naúshnik i prósta bud\' sabóy.', tr: 'Benim tavsiyem: kulaklığı çıkar ve sadece kendin ol.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Он убрал. Это был лучший совет в его жизни. А Тёма сказал: «Легендарно».', reading: 'On ubrál. Éta býl lúchshiy svét v yevó zhýzni. A Tyóma skazál: «Lyendárna».', tr: 'O çıkardı. Bu onun hayatındaki en iyi tavsiyeydi. Tyoma ise dedi ki: "Efsanevi."' },
  ],
  newWords: [
    { ru: 'Наушник', reading: 'Naúshnik', tr: 'Kulaklık (tek kulak)', note: 'Eril; ajan filmlerinin ve kötü planların vazgeçilmezi.' },
    { ru: 'Заказать', reading: 'Zakazát\'', tr: 'Sipariş etmek', note: 'Restoranda sipariş fiili: "Я заказал столик" — masa ayırttım/sipariş verdim.' },
    { ru: 'Паника', reading: 'Paníka', tr: 'Panik', note: 'Dişil; ani korku ve kafa karışıklığı.' },
    { ru: 'Совет', reading: 'Svét', tr: 'Tavsiye, öğüt', note: '"Мой совет" — benim tavsiyem. (Dikkat: "весь" ile karıştırma!)' },
    { ru: 'Шёпотом', reading: 'Shópatam', tr: 'Fısıltıyla', note: 'Utanınca ya da sır paylaşırken konuşma biçimi.' },
    { ru: 'Легендарно', reading: 'Lyendárna', tr: 'Efsanevi (biçimde)', note: 'Tyoma\'nın efsane repliği: «Это будет легендарно!»' },
  ],
  keyPoints: [
    { id: 'cp3_k1', textTr: 'Dima büyük bir şirkette iş görüşmesine girer ve işi alır.', hintTr: 'Randevudan önce Dima\'nın hangi büyük gelişmesi oldu?', keywordGroups: [['iş görüşmesi', 'görüşme', 'mülakat'], ['iş', 'başlar', 'alar', 'kazan']] },
    { id: 'cp3_k2', textTr: 'İlk randevuda Tyoma, Dima\'ya kulaklıktan ne söyleyeceğini söyletir.', hintTr: 'Tyoma randevuda Dima\'ya nasıl "yardım etti"?', keywordGroups: [['kulaklık'], ['töma', 'tyoma']] },
    { id: 'cp3_k3', textTr: 'Dima karışıklıkla "Bugün... mantı?" gibi komik bir hata yapar.', hintTr: 'Dima komik bir şekilde ne dedi?', keywordGroups: [['mantı'], ['hata', 'karış', 'komik', 'yanlış']] },
    { id: 'cp3_k4', textTr: 'Marina kulağında biri olduğunu fark eder.', hintTr: 'Marina neyi fark etti?', keywordGroups: [['marina'], ['kulaklık', 'kulağın', 'fark']] },
    { id: 'cp3_k5', textTr: 'Panik olan Dima sonunda doğruyu itiraf eder (Tyoma ve tavsiyeleri).', hintTr: 'Dima yakalanınca ne yaptı?', keywordGroups: [['panik', 'doğru', 'gerçek', 'itiraf'], ['töma', 'tyoma', 'tavsiye']] },
    { id: 'cp3_k6', textTr: 'Marina\'nın tavsiyesi: kulaklığı çıkar ve kendin ol.', hintTr: 'Marina Dima\'ya ne tavsiye etti?', keywordGroups: [['kendin'], ['çıkar', 'çıkart', 'kulaklık']] },
    { id: 'cp3_k7', textTr: 'Dima kulaklığı çıkarır; Tyoma duruma "efsanevi" der.', hintTr: 'Dima tavsiyeye uydurdu mu? Tyoma\'nın yorumu neydi?', keywordGroups: [['efsanevi', 'efsane'], ['töma', 'tyoma']] },
  ],
  misleading: [
    { tokens: ['işten atıldı', 'işi kaybetti', 'işsiz kaldı'], noteTr: 'Dima işini KAYBETMEDİ — tam tersine o görüşmede işe alındı.' },
    { tokens: ['marina tavsiye etti kulaklık taktı', 'marina kulaklık taktı'], noteTr: 'Kulaklığı takan Marina değil, Dima idi (Marina sadece onu fark etti).' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM 4 — Ünite 31-40 (Sevgi Sözcükleri, Tanıştırma, Film & Dizi, Sinema,
//                   İş Sohbeti, Toplantı/İzin, Tesisatçı, Kuaför, Belgeler,
//                   Komşuyla Gürültü)
// ---------------------------------------------------------------------------
const STORY_4: CheckpointStory = {
  id: 'story_cp4',
  kind: 'checkpoint',
  checkpoint: 4,
  unitFrom: 31,
  unitTo: 40,
  titleRu: 'Обычный вторник',
  titleTr: 'Sıradan Bir Salı',
  framingTr:
    'Yıl 2035. Dima: "Aşk, çocuklar, sadece bayramlarda değil — sıradan bir salıdadır." İşte Dima ve Marina\'nın bir günü: alarm, sinema, sızan bir musluk ve gece yarısı komşusu.',
  icon: '☕',
  color: '#10b981',
  searchQuery: 'How I Met Your Mother ordinary day moments',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Дети, любовь — это не только праздники. Любовь — это обычный вторник.', reading: 'Dyéti, lyubóf\' — éta ne tól\'ka prázniki. Lyubóf\' — éta obýchnyy ftórnik.', tr: 'Çocuklar, aşk sadece bayramlar değildir. Aşk, sıradan bir salıdır.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Семь утра. Будильник. Дима обычно встаёт первым и готовит кофе.', reading: 'Syém útra. Budíl\'nik. Díma obýchna vstayót pérvym i gatóvit kófe.', tr: 'Sabahın yedisi. Alarm. Dima genellikle ilk kalkar ve kahve yapar.' },
    { speaker: 'Marina', ru: 'Доброе утро, солнце моё... то есть, зайка.', reading: 'Dóbraye útra, sólntse mayó... to yest\', záyka.', tr: 'Günaydın, güneşim... yani tavşanım.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Днём — работа: дедлайны, кофемашина, коллеги. Вечером — кино.', reading: 'Dnyóm — rabóta: dyedláyny, kafemashína, kaliégi. Vécheram — kinó.', tr: 'Gündüz iş: teslim tarihleri, kahve makinesi, iş arkadaşları. Akşam sinema.' },
    { speaker: 'Dima', ru: 'Два билета, пожалуйста. И попкорн.', reading: 'Dva biléta, pazhálusta. I papkórn.', tr: 'İki bilet lütfen. Ve mısır.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'После кино — домой. Но дома их ждал сюрприз: вода на полу. Кран протекал!', reading: 'Pósle kinó — damóy. No dóma ikh zh dal syurpríz: vadá na palú. Kran pratíkal!', tr: 'Sinemadan sonra — eve. Ama evde bir sürpriz onları bekliyordu: yerde su. Musluk sızıyordu!' },
    { speaker: 'Marina', ru: 'Звони мастеру! Причина ясна: кран старый.', reading: 'Zvaní másteru! Prichína yasná: kran stáryy.', tr: 'Ustayı ara! Sebep belli: musluk eski.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'В полночь — новый сюрприз: сосед. «Потише, пожалуйста!»', reading: 'F pólnach — nóvıy syurpríz: sósed. «Patíshye, pazhálusta!»', tr: 'Gece yarısı — yeni sürpriz: komşu. "Biraz sessiz olun lütfen!"' },
    { speaker: 'Dima', ru: 'Извини! Мастер придёт только утром. Пока — тазик и терпение.', reading: 'Izviní! Máster pridyót tól\'ka útram. Paká — tázik i tyrpéniye.', tr: 'Affet! Usta ancak sabah gelebilir. Şimdilik — leğen ve sabır.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Дима случайно уронил свой кофе — опять.', reading: 'Díma slucháyna uroníl svóy kófe — apyát\'.', tr: 'Dima yanlışlıkla kahvesini düşürdü — yine.' },
    { speaker: 'Marina', ru: 'Обычный вторник: кино, вода на полу, сосед... Зато мы вместе.', reading: 'Obýchnyy ftórnik: kinó, vadá na palú, sósed... Záto my vméstye.', tr: 'Sıradan bir salı: sinema, yerdeki su, komşu... Ama birlikteyiz.' },
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'И вдруг Дима понял: он хочет видеть этот вторник каждый день. Всю жизнь.', reading: 'I vdrug Díma pónyal: on khóchit vidét\' état ftórnik kázhdy dyen\'. Fsyu zhýzn\'.', tr: 'Ve birden Dima anladı: bu salıyı her gün görmek istiyor. Ömür boyu.' },
  ],
  newWords: [
    { ru: 'Будильник', reading: 'Budíl\'nik', tr: 'Alarm (saat)', note: 'Eril; sabahların kâbusu, sıradan salıların başlangıcı.' },
    { ru: 'Обычный / обычно', reading: 'Obýchnyy / obýchna', tr: 'Sıradan / genellikle', note: 'Sıfat-zarf çifti: обычный вторник (sıradan salı), он обычно встаёт (o genellikle kalkar).' },
    { ru: 'Причина', reading: 'Prichína', tr: 'Sebep, neden', note: 'Dişil; "Причина ясна" — sebep belli.' },
    { ru: 'Терпение', reading: 'Tyrpéniye', tr: 'Sabır', note: 'Orta cinsiyet; sızan muslukların kelimesi.' },
    { ru: 'Случайно', reading: 'Slucháyna', tr: 'Yanlışlıkla, tesadüfen', note: '"Специально" (kasten) kelimesinin tam zıddı.' },
    { ru: 'Зато', reading: 'Záto', tr: 'Ama buna karşılık', note: 'Olumsuzluk sonrası avuntu getiren bağlaç.' },
  ],
  keyPoints: [
    { id: 'cp4_k1', textTr: 'Ana fikir: gerçek aşk, sıradan bir günde (sıradan bir salıda) gizlidir.', hintTr: 'Hikayenin açılış fikri neydi?', keywordGroups: [['sıradan', 'normal', 'basit'], ['aşk', 'salı']] },
    { id: 'cp4_k2', textTr: 'Dima genellikle sabah erken kalkar ve kahveyi hazırlar.', hintTr: 'Sabah rutini nasıldı?', keywordGroups: [['dima'], ['kahve', 'kalk', 'sabah', 'genellikle']] },
    { id: 'cp4_k3', textTr: 'Akşam sinemaya giderler (iki bilet ve mısır alır).', hintTr: 'Akşam hangi eğlenceye gittiler?', keywordGroups: [['sinema', 'sinemaya', 'bilet']] },
    { id: 'cp4_k4', textTr: 'Evde beklenmedik sürpriz: musluk sızar ve yerde su birikir.', hintTr: 'Eve dönünce neyle karşılaştılar?', keywordGroups: [['musluk', 'su', 'sız']] },
    { id: 'cp4_k5', textTr: 'Marina ustayı arar; sebep eski musluktur, usta ancak sabah gelir.', hintTr: 'Soruna ne sebep oldu ve çözüm neydi?', keywordGroups: [['usta', 'tamirci'], ['sabah', 'sebep', 'eski']] },
    { id: 'cp4_k6', textTr: 'Gece yarısı komşu gelir ve sessiz olmalarını rica eder.', hintTr: 'Gece yarısı kapıyı kim çaldı?', keywordGroups: [['komşu'], ['gece', 'sessiz']] },
    { id: 'cp4_k7', textTr: 'Marina\'ya göre sıradan bir salı bile birlikteysen güzeldir ("Ama birlikteyiz").', hintTr: 'Marina günü nasıl özetledi?', keywordGroups: [['birlikte'], ['sıradan', 'güzel', 'salı']] },
  ],
  misleading: [
    { tokens: ['restoranda'], noteTr: 'Akşam restorana değil, SİNEMAYA gittiler.' },
    { tokens: ['evlendi', 'evlenme teklifi'], noteTr: 'Bu bölümde evlilik teklifi yok — teklif sonraki bölümlerde geliyor. (Sızan musluklar romantik değildir!)' },
    { tokens: ['komşu tamir etti', 'komşu tamir'], noteTr: 'Musluğu komşu değil, ancak sabah gelecek olan USTA tamir edecek.' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM 5 — Ünite 41-50 (Kıskançlık/İhanet, Polis, Düğün, Miras, İleri Flört,
//                   Tartışma/Barışma, ..., Sevgililer Günü)
// ---------------------------------------------------------------------------
const STORY_5: CheckpointStory = {
  id: 'story_cp5',
  kind: 'checkpoint',
  checkpoint: 5,
  unitFrom: 41,
  unitTo: 50,
  titleRu: 'Красный конверт',
  titleTr: 'Kırmızı Zarf',
  framingTr:
    'Yıl 2035. Dima: "Her büyük aşkın bir kıskançlık bölümü vardır. Bizimki kırmızı bir zarfla başladı." Bu bölümde: bir Sevgililer Günü kartı, gözyaşları ve bir içini dökme gecesi.',
  icon: '💌',
  color: '#f43f5e',
  searchQuery: 'How I Met Your Mother romantic moments',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Дети, эта глава — про ревность. И про конверт.', reading: 'Dyéti, éta glavá — pra rivnast\'. I pra kanvért.', tr: 'Çocuklar, bu bölüm kıskançlık hakkındadır. Ve bir zarf hakkında.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Дима нашёл валентинку. Не свою — чужую. В куртке Марины.', reading: 'Díma nashól valentínku. Ne svayú — chuzhúyu. F kúrtkye Maríny.', tr: 'Dima bir Sevgililer Günü kartı buldu. Kendisi değil — bir başkasının. Marina\'nın ceketinde.' },
    { speaker: 'Dima', ru: 'Марина! Что это? Красный конверт, чужой почерк... Ты мне врёшь?', reading: 'Marína! Shto éta? Krásnıy kanvért, chuzhóy póchirk... Ty mne vryóş\'?', tr: 'Marina! Bu ne? Kırmızı zarf, yabancı el yazısı... Bana yalan mı söylüyorsun?' },
    { speaker: 'Marina', ru: 'Я? Вру? Это шутка, да? Сначала думай, потом спрашивай!', reading: 'Ya? Vryú? Éta shutka, da? Snachála dúmay, patóm spráshivay!', tr: 'Ben mi? Yalan söyleyen ben miyim? Bu bir şaka, değil mi? Önce düşün, sonra sor!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Вечером было трудно: обиды, слёзы, молчание.', reading: 'Vécheram býla trúdna: abídy, slyózy, malchániye.', tr: 'Akşam zor geçti: kırgınlıklar, gözyaşları, sessizlik.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Но у каждой тайны есть ключ. Ключ нашла Лена — настоящий детектив.', reading: 'No u kázhday táyny yest\' klyuch. Klyuch nashlá Lyéna — nastayáshchiy dytyektív.', tr: 'Ama her sırrın bir anahtarı vardır. Anahtarı Lena buldu — gerçek bir dedektif.' },
    { speaker: 'Lena', ru: 'Женя! Где твоя валентинка для меня? Ты прятал её у Димы!', reading: 'Zhénya! Gde tvayá valentínka dlya minyá? Ty prátal yeyó u Dímy!', tr: 'Jenya! Benim Sevgililer Günü kartım nerede? Onu Dima\'da saklıyordun!' },
    { speaker: 'Zhenya', ru: 'Ой... Дима держал её, потому что я всё забываю. Извини, друг!', reading: 'Oy... Díma dyérzhal yeyó, patamú shto ya fsyo zabývayu. Izviní, druk!', tr: 'Ah... Dima onu tutuyordu, çünkü ben her şeyi unuturum. Affet dostum!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Марина прочитала записку: «Лене. Люблю. Твой Женя».', reading: 'Marína prachitála zapísku: «Lyénye. Lyublyú. Tvóy Zhénya».', tr: 'Marina notu okudu: "Lena\'ya. Seviyorum. Senin Jenya\'n."' },
    { speaker: 'Marina', ru: 'Дима... прости меня. Моя ревность — моя проблема, не твоя.', reading: 'Díma... prastí minyá. Mayá rivnast\' — mayá prabléma, ne tvayá.', tr: 'Dima... beni affet. Kıskançlığım benim sorunum, senin değil.' },
    { speaker: 'Dima', ru: 'Я тоже не прав. Давай обнимемся?', reading: 'Ya tózhe ne prav. Daváy abnímyemsya?', tr: 'Ben de haksızım. Hadi sarılalım mı?' },
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Мораль, дети: не стройте теорию без фактов. И проверяйте конверты.', reading: 'Marál\', dyéti: ne stróytye teóriyu byez fáktav. I pravyáryaytye kanvéry.', tr: 'Ahlak dersi, çocuklar: olgusuz teori kurmayın. Ve zarfları kontrol edin.' },
  ],
  newWords: [
    { ru: 'Конверт', reading: 'Kanvért', tr: 'Zarf', note: 'Eril; bu hikayenin asıl suçlusu.' },
    { ru: 'Шутка', reading: 'Shutka', tr: 'Şaka', note: 'Dişil; "Это шутка?" — Şaka mı bu?' },
    { ru: 'Слёзы', reading: 'Slyózy', tr: 'Gözyaşları', note: 'Çoğul; tekili "слеза".' },
    { ru: 'Настоящий', reading: 'Nastayáshchiy', tr: 'Gerçek, hakiki', note: 'Eril; "настоящий друг" — gerçek dost, "настоящий детектив" — gerçek dedektif.' },
    { ru: 'Спрятать', reading: 'Spryátat\'', tr: 'Saklamak', note: 'Tamamlanmış (perfective) mastar.' },
    { ru: 'Записка', reading: 'Zapíska', tr: 'Not', note: 'Dişil; kısa el yazısı mesaj.' },
  ],
  keyPoints: [
    { id: 'cp5_k1', textTr: 'Dima, Marina\'nın ceketinde yabancı bir Sevgililer Günü kartı (kırmızı zarf) bulur.', hintTr: 'Dima ne buldu ve nerede?', keywordGroups: [['valentine', 'sevgililer', 'kart', 'zarf'], ['marina', 'ceket', 'mont']] },
    { id: 'cp5_k2', textTr: 'Dima, Marina\'nın yalan söyleyip söylemediğini sorar; kıskançlık krizi başlar.', hintTr: 'Dima Marina\'yı neyle suçladı?', keywordGroups: [['kıskanç'], ['yalan']] },
    { id: 'cp5_k3', textTr: 'Akşam kırgınlık, gözyaşı ve sessizlikle geçer.', hintTr: 'Akşam evde nasıl geçti?', keywordGroups: [['gözyaşı', 'ağla', 'kırgınlık']] },
    { id: 'cp5_k4', textTr: 'Sırrı çözen (anahtarı bulan) Lena\'dır — gerçek bir dedektif.', hintTr: 'Gizemi kim çözdü?', keywordGroups: [['lena'], ['anahtar', 'bul', 'çöz', 'dedektif']] },
    { id: 'cp5_k5', textTr: 'Kart aslında Jenya\'nın Lena\'ya yazdığı karttır; unutkanlığı yüzünden Dima\'da saklanıyordur.', hintTr: 'Kartı gerçekten kim, kime yazmıştı?', keywordGroups: [['jenya', 'zhenya'], ['lena']] },
    { id: 'cp5_k6', textTr: 'Notta "Lena\'ya. Seviyorum. Senin Jenya\'n" yazar.', hintTr: 'Notun içeriği neydi?', keywordGroups: [['seviyor'], ['not']] },
    { id: 'cp5_k7', textTr: 'Marina özür diler ve kıskançlığın kendi sorunu olduğunu kabul eder.', hintTr: 'Gerçek ortaya çıkınca Marina ne yaptı?', keywordGroups: [['marina'], ['özür', 'kıskanç', 'sorun']] },
    { id: 'cp5_k8', textTr: 'Barışırlar ("Hadi sarılalım") ve hikaye "olgusuz teori kurma" dersiyle biter.', hintTr: 'Bölüm nasıl bitti ve ders (moral) neydi?', keywordGroups: [['sarıl'], ['teori', 'ders', 'olgu', 'moral']] },
  ],
  misleading: [
    { tokens: ['kartı marina yazdı', 'marina yazdı'], noteTr: 'Kartı Marina yazMADI — kart, Jenya\'nın Lena\'ya yazdığı karttı.' },
    { tokens: ['ayrıldılar', 'boşandı', 'barışmadılar'], noteTr: 'Ayrılmadılar; bölüm sonunda barışıp sarıldılar.' },
    { tokens: ['evlilik teklifi', 'evlenme teklifi'], noteTr: 'Bu bölümde evlenme teklifi yoktu — sadece yanlış anlaşılan bir Sevgililer Günü kartı vardı.' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM 6 — Ünite 51-60 (Birlikte Yaşamak, Evlilik Teklifi, Uzun Mesafe,
//                   Maaş Pazarlığı, Patron, Film Eleştirisi, Dizi Teori,
//                   Otel, Kaza/Sigorta, Dedikodu)
// ---------------------------------------------------------------------------
const STORY_6: CheckpointStory = {
  id: 'story_cp6',
  kind: 'checkpoint',
  checkpoint: 6,
  unitFrom: 51,
  unitTo: 60,
  titleRu: 'Вечер с миллионом проблем',
  titleTr: 'Bir Milyon Sorunlu Akşam',
  framingTr:
    'Yıl 2035. Dima: "Evet çocuklar, o akşam... bir terfi, çizik bir araba ve çorabın içinde bir yüzük. Nasıl evlendiğimin tam hikayesi."',
  icon: '💍',
  color: '#d946ef',
  searchQuery: 'How I Met Your Mother proposal scene',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Дети, сегодня — глава про кольцо. Сначала — работа.', reading: 'Dyéti, sivódnya — glavá pra kal\'tsó. Snachála — rabóta.', tr: 'Çocuklar, bugünkü bölüm yüzük hakkında. Önce — iş.' },
    { speaker: 'Patron', ru: 'Дима! Повышение, премия, новый кабинет. Поздравляю!', reading: 'Díma! Pavyshéniye, prémiya, nóvıy kabinét. Pazdravlyáyú!', tr: 'Dima! Terfi, ikramiye, yeni ofis. Tebrikler!' },
    { speaker: 'Dima', ru: 'Спасибо! Это успех! Нужно отпраздновать!', reading: 'Spasíba! Éta uspyekh! Núzhna atprazdnavát\'!', tr: 'Teşekkürler! Bu bir başarı! Kutlamak gerek!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Но сначала — мини-катастрофа: ДТП, царапина, страховка.', reading: 'No snachála — míni-katastrófa: dýe-týe-pé, tsarápina, strakhófka.', tr: 'Ama önce — mini bir felaket: kaza, çizik, sigorta.' },
    { speaker: 'Dima', ru: 'Моя машина, моя вина... Европротокол — и вперёд!', reading: 'Mayá mashína, mayá viná... Yevrapratakól — i fpyorót!', tr: 'Benim arabam, benim hatam... Euro protokolü — ve devam!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Вечером — ресторан. Бронь есть. Кольцо... где кольцо?!', reading: 'Vécheram — ristarán. Bron\' yest\'. Kal\'tsó... gde kal\'tsó?!', tr: 'Akşam — restoran. Rezervasyon var. Yüzük... yüzük nerede?!' },
    { speaker: 'Dima', ru: 'Я достал его из носка! Спрятал — и забыл, где.', reading: 'Ya dastál yevó iz naská! Spryátal — i zabýl, gde.', tr: 'Onu çoraptan çıkardım! Sakladım — ve nerede unuttum.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Он встал на колени. Руки дрожали. Миллион мыслей.', reading: 'On vstal na kályeni. Rúki drazháli. Millión mýsley.', tr: 'Diz çöktü. Elleri titriyordu. Bir milyon düşünce.' },
    { speaker: 'Dima', ru: 'Марина, ты — моя мечта. Ты выйдешь за меня замуж?', reading: 'Marína, ty — mayá mechtá. Ty výydeş\' za minyá zámuzh?', tr: 'Marina, sen benim hayalimsin. Benimle evlenir misin?' },
    { speaker: 'Marina', ru: 'Мой ответ: да! Тысячу раз да!', reading: 'Moy atvét: da! Týsyachu ras da!', tr: 'Benim cevabım: evet! Bin kez evet!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Тёма был под столом. Он всё видел. «Легендарно», — сказал он.', reading: 'Tyóma býl pad stalam. On fsyó vídal. «Lyendárna», — skazál on.', tr: 'Tyoma masanın altındaydı. Her şeyi gördü. "Efsanevi," dedi.' },
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Помолвка! Но в ту ночь Марина получила звонок: работа мечты — в другом городе...', reading: 'Pamólvka! No f tu nóch\' Marína paluchíla zvának: rabóta mechtý — v drugóme górade...', tr: 'Nişan! Ama o gece Marina bir telefon aldı: hayallerindeki iş — başka bir şehirde...' },
  ],
  newWords: [
    { ru: 'Успех', reading: 'Uspyekh', tr: 'Başarı', note: 'Eril; terfi gününün kelimesi.' },
    { ru: 'Отпраздновать', reading: 'Atprazdnavát\'', tr: 'Kutlamak (bir olayı)', note: '"Праздник" (bayram) kelimesinden türemiştir.' },
    { ru: 'Ответить', reading: 'Atvétit\'', tr: 'Cevaplamak', note: '"Мой ответ" — benim cevabım; fiil hali: ответить.' },
    { ru: 'Миллион', reading: 'Millión', tr: 'Milyon', note: 'Mecazi abartı için de kullanılır: "миллион мыслей" — bir milyon düşünce.' },
    { ru: 'Достать', reading: 'Dastát\'', tr: 'Çıkarmak, elde etmek', note: 'Saklı bir şeyi ortaya çıkarmak.' },
    { ru: 'Мечта', reading: 'Mechtá', tr: 'Hayal, rüya', note: 'Dişil; "работа мечты" — hayalindeki iş.' },
  ],
  keyPoints: [
    { id: 'cp6_k1', textTr: 'Dima işte terfi ve ikramiye alır (yeni ofis).', hintTr: 'O gün Dima\'nın iş hayatında ne oldu?', keywordGroups: [['terfi', 'ikramiye', 'prim', 'yükselme']] },
    { id: 'cp6_k2', textTr: 'Arabası kaza yapar/çizilir; sigorta ve euro protokolle sorun çözülür.', hintTr: 'Dima\'nın arabasına ne oldu?', keywordGroups: [['araba', 'kaza', 'çizik'], ['sigorta', 'protokol', 'çöz']] },
    { id: 'cp6_k3', textTr: 'Dima yüzüğü çorabına saklayıp yerini unutur; sonunda çoraptan çıkarır.', hintTr: 'Yüzük neredeydi ve neden kriz anı yaşandı?', keywordGroups: [['yüzük'], ['çorap']] },
    { id: 'cp6_k4', textTr: 'Restoranda diz çöker, elleri titrer ve Marina\'ya evlenme teklifi eder ("Sen benim hayalimsin").', hintTr: 'Restoranda Dima ne yaptı ve ne dedi?', keywordGroups: [['diz', 'evlenme', 'teklif'], ['titri', 'hayal', 'çök', 'heyecan']] },
    { id: 'cp6_k5', textTr: 'Marina "bin kez evet" diyerek teklifi kabul eder.', hintTr: 'Marina\'nın cevabı neydi?', keywordGroups: [['evet', 'kabul', 'bin']] },
    { id: 'cp6_k6', textTr: 'Tyoma masanın altından her şeyi izlemiş ve "efsanevi" demıştır.', hintTr: 'Tyoma o sırada neredeydi?', keywordGroups: [['masa', 'masanın'], ['efsanevi', 'izle', 'gör']] },
    { id: 'cp6_k7', textTr: 'Nişanlanırlar (помолвка).', hintTr: 'Evet cevabından sonra ne oldu?', keywordGroups: [['nişan']] },
    { id: 'cp6_k8', textTr: 'Aynı gece Marina\'ya başka şehirdeki hayalindeki işten telefon gelir.', hintTr: 'Gece gelen telefon neydi?', keywordGroups: [['şehir', 'başka'], ['iş', 'telefon']] },
  ],
  misleading: [
    { tokens: ['marina teklif etti', 'marina evlenme teklifi'], noteTr: 'Teklifi Marina değil, DIMA etti — Marina sadece cevap verdi: "Bin kez evet."' },
    { tokens: ['reddetti', 'red etti', 'hayır dedi'], noteTr: 'Marina teklifi reddetmedi — tam tersine "bin kez evet" dedi!' },
    { tokens: ['evlendiler', 'düğün oldu'], noteTr: 'O gece düğün değil NİŞAN vardı; düğün sonraki bölümlerde.' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM 7 — Ünite 61-70 (Çocuk/Okul, Tanışma Uygulaması, Haber, Konser,
//                   Deyimler/Argo, Ayrılık, Mahkeme, İroni, Sunum, Ultimatom)
// ---------------------------------------------------------------------------
const STORY_7: CheckpointStory = {
  id: 'story_cp7',
  kind: 'checkpoint',
  checkpoint: 7,
  unitFrom: 61,
  unitTo: 70,
  titleRu: 'Последний холостяк',
  titleTr: 'Son Bekâr',
  framingTr:
    'Yıl 2035. Dima: "Ve şimdi... Tyoma\'nın bölümü. Evet çocuklar: Tyoma\'nın da bir kalbi vardı." Bir tanışma uygulaması, ironi seven bir kadın ve son bekârın teslimiyeti.',
  icon: '💙',
  color: '#3b82f6',
  searchQuery: 'How I Met Your Mother Barney legendary moments',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'А теперь — глава про Тёму. Да, дети: даже у Тёмы было сердце.', reading: 'A tipér\' — glavá pra Tyómu. Da, dyéti: dázhe u Tyómy býla sértse.', tr: 'Ve şimdi — Tyoma\'nın bölümü. Evet çocuklar: Tyoma\'nın bile bir kalbi vardı.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Приложение. Её анкета: «Люблю иронию, сарказм и честность. Без игр».', reading: 'Prialazhéniye. Yeyó ankéta: «Lyublyú ironíyu, sarkázm i chésnast\'. Byez igr».', tr: 'Uygulama. Onun profili: "İroni, iğneleme ve dürüstlük severim. Oyunlar yok."' },
    { speaker: 'Tyoma', ru: 'Флирт — это моя работа. Но её лайк... её лайк меня напугал.', reading: 'Flirt — éta mayá rabóta. No yeyó layk... yeyó layk minyá napugál.', tr: 'Flört benim işim. Ama onun like\'ı... onun like\'ı beni korkuttu.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Переписка неделями. Созвоны до утра. Потом — живая встреча: концерт.', reading: 'Piryepíska nidyélyami. Sazvóny da útra. Patóm — zhiváya vstryécha: kansért.', tr: 'Haftalarca mesajlaşma. Sabaha kadar aramalar. Sonra — yüz yüze buluşma: konser.' },
    { speaker: 'Vera', ru: 'Тёма, твоя «легендарная» рубашка светится в темноте. Это фиаско.', reading: 'Tyóma, tvayá «lyendárnaa» rubáshka svyétitsya f tyemnaté. Éta fiasko.', tr: 'Tyoma, "efsanevi" gömleğin karanlıkta parlıyor. Bu bir fiyasko.' },
    { speaker: 'Tyoma', ru: 'Это стиль!... Ладно. Я сдаюсь. Ты видишь меня насквозь.', reading: 'Éta stíl\'!... Ládna. Ya sdayús\'. Ty vídish\' minyá naskvóz\'.', tr: 'Bu stil!... Tamam. Teslim oluyorum. Beni içten dışa görüyorsun.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Ирония, сарказм, намёки. Впервые Тёма не играл — он был настоящим.', reading: 'Ironíya, sarkázm, namyóki. Vpérvıye Tyóma ne igrál — on býl nastayáshchim.', tr: 'İroni, iğneleme, imalar. İlk kez Tyoma oyun oynamıyordu — gerçekti.' },
    { speaker: 'Vera', ru: 'Ультиматум: или серьёзно, или ничего. Выбор за тобой.', reading: 'Ultimatúm: íli sir\'yózna, íli nivchyevó. Výbar za tabóy.', tr: 'Ultimatom: ya ciddi ya hiç. Seçim senin.' },
    { speaker: 'Tyoma', ru: 'Раньше я бы сказал «забей». Сейчас скажу иначе: да. Только да.', reading: 'Rán\'she ya by skazál «zabéy». Seychás skazhú ináchye: da. Tól\'ka da.', tr: 'Eskiden "boş ver" derdim. Şimdi başka söylüyorum: evet. Sadece evet.' },
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Так последний холостяк сдался. Дети, запомните: иногда победа — это смелость сказать «да». А вечность начинается с одного лайка.', reading: 'Tak paslyédniy khalastyák sdálsa. Dyéti, zapámnitye: ingdá pabyéda — éta smélast\' skazát\' «da». A vyéchnast\' nachináyetsya s adnóvó layka.', tr: 'Böylece son bekâr teslim oldu. Çocuklar, unutmayın: bazen zafer, "evet" deme cesaretidir. Ve sonsuzluk tek bir like ile başlar.' },
  ],
  newWords: [
    { ru: 'Флирт', reading: 'Flirt', tr: 'Flört', note: 'Eril; fiili "флиртовать" — flörtleşmek.' },
    { ru: 'Холостяк', reading: 'Khalastyák', tr: 'Bekâr (erkek)', note: 'Eril; "последний холостяк" — son bekâr.' },
    { ru: 'Победа', reading: 'Pabyéda', tr: 'Zafer, galibiyet', note: 'Dişil; mecazi kullanımı çok yaygındır.' },
    { ru: 'Сдаться', reading: 'Sdát\'sya', tr: 'Teslim olmak', note: 'Dönüşlü fiil; "Я сдаюсь!" — Teslim oluyorum!' },
    { ru: 'Смелость', reading: 'Smélast\'', tr: 'Cesaret', note: 'Dişil; "evet" demek için gereken şey.' },
    { ru: 'Вечность', reading: 'Vyéchnast\'', tr: 'Sonsuzluk, ebediyet', note: 'Dişil; son satırın kelimesi.' },
  ],
  keyPoints: [
    { id: 'cp7_k1', textTr: 'Bu bölüm Tyoma\'nın aşk hikayesini anlatır (Tyoma\'nın da bir kalbi vardır).', hintTr: 'Bu bölüm kimin hikayesi?', keywordGroups: [['töma', 'tyoma'], ['aşk', 'sevgi', 'kalp']] },
    { id: 'cp7_k2', textTr: 'Tyoma, tanışma uygulamasında "ironi, sarkazm, dürüstlük; oyunlar yok" yazan bir profille eşleşir (like onu korkutur).', hintTr: 'Tyoma kiminle eşleşti ve profilinde ne yazıyordu?', keywordGroups: [['uygulama', 'profil', 'anket'], ['ironi', 'sarkazm', 'dürüst', 'like']] },
    { id: 'cp7_k3', textTr: 'Haftalarca mesajlaşma ve uzun aramalardan sonra konserde yüz yüze buluşurlar.', hintTr: 'İlk yüz yüze buluşma nerede oldu?', keywordGroups: [['konser'], ['buluş', 'yüz yüze']] },
    { id: 'cp7_k4', textTr: 'Kadın (Vera), Tyoma\'nın "efsanevi" gömleğiyle dalga geçer (karanlıkta parlar).', hintTr: 'Vera ilk buluşmada Tyoma\'nın neyle dalga geçti?', keywordGroups: [['gömlek', 'efsanevi'], ['vera', 'dalga', 'şaka']] },
    { id: 'cp7_k5', textTr: 'İlk kez Tyoma oyun oynamaz; gerçek halidir.', hintTr: 'Tyoma bu kez farklı olarak ne yaptı?', keywordGroups: [['gerçek', 'kendisi'], ['oyun', 'oynam']] },
    { id: 'cp7_k6', textTr: 'Vera "ya ciddi ya hiç" ultimatomu verir; Tyoma "evet" der.', hintTr: 'Vera hangi seçenekleri sundu ve Tyoma ne dedi?', keywordGroups: [['ultimatom', 'ciddi'], ['evet']] },
    { id: 'cp7_k7', textTr: 'Mesaj: zafer "evet" deme cesaretidir; sonsuzluk tek bir like ile başlar.', hintTr: 'Bölümün final dersi (moral) neydi?', keywordGroups: [['cesaret', 'evet'], ['sonsuz', 'like']] },
  ],
  misleading: [
    { tokens: ['töma evlendi', 'tyoma evlendi'], noteTr: 'Tyoma bu bölümde evlenmedi — sadece "evet" dedi; düğün sonraki bölümde.' },
    { tokens: ['dima evlendi'], noteTr: 'Bu bölüm Dima\'nın değil, TYOMA\'NIN hikayesidir.' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM 8 — Ünite 71-80 (Evlilik Krizi, Boşanma/Yeni Sayfa, Düğün Konuşması,
//                   İstifa, Dilekçe, Parti/Networking, Yabancı Olmak,
//                   Şarkı/Replik, Terapi, Pazarlık)
// ---------------------------------------------------------------------------
const STORY_8: CheckpointStory = {
  id: 'story_cp8',
  kind: 'checkpoint',
  checkpoint: 8,
  unitFrom: 71,
  unitTo: 80,
  titleRu: 'Свадьба',
  titleTr: 'Düğün',
  framingTr:
    'Yıl 2035. Dima: "Ve son bölüm çocuklar: düğün. Pastayı buzdolabında saklayan bir gelin, ağlayan bir fotoğrafçı, müzik kavgası ve masanın altından çıkan bir sağdıç."',
  icon: '🥂',
  color: '#f59e0b',
  searchQuery: 'How I Met Your Mother wedding scene',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'И вот — свадьба. Но сначала, конечно, кризис. Куда без него.', reading: 'I vot — svádb\'a. No snachála, kanyéchna, krízis. Kudá byez nyevó.', tr: 'Ve işte — düğün. Ama önce, elbette, kriz. Krizsiz olur mu.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Тёща Марины приехала за неделю до свадьбы. И осталась... на месяц.', reading: 'Tyóshcha Maríny priyékhala za nidyélyu da svádb\'i. I astálas\'... na mésyats.', tr: 'Marina\'nın kayınvalidesi düğünden bir hafta önce geldi. Ve kaldı... bir ay.' },
    { speaker: 'Marina', ru: 'Мама, торт — в холодильнике! Дима, тамада хочет ещё один тост. Спасай!', reading: 'Máma, tort — f chaladíl\'nike! Díma, tamadá khóchit yeshchó adín tost. Spasáy!', tr: 'Anne, pasta buzdolabında! Dima, sunucu bir kadeh daha istiyor. Kurtar!' },
    { speaker: 'Vova Amca', ru: 'Не волнуйтесь! Я пережил развод. Свадьба — это легко.', reading: 'Ne valnúytes\'! Ya piryzhýl razvót. Svádb\'a — éta líkhka.', tr: 'Endişelenmeyin! Ben boşanmayı atlattım. Düğün — çocuk oyuncağı.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Цветы: Женя торговался на рынке целый час. «По рукам!» — и роза в подарок.', reading: 'Tsvetý: Zhénya targaválsa na rýnke tsélyy chas. «Pa rukám!» — i róza v padárak.', tr: 'Çiçekler: Jenya pazarda bir saat pazarlık etti. "Anlaştık!" — ve hediye bir gül.' },
    { speaker: 'Zhenya', ru: 'Речь готова. Я плакал три раза, пока писал.', reading: 'Rech\' gótava. Ya plákal tri ráza, paka pisál.', tr: 'Konuşmam hazır. Yazarken üç kez ağladım.' },
    { speaker: 'Tyoma', ru: 'Я — шафер. План простой: поднимем бокалы, скажем тост, все плачут. Легендарно.', reading: 'Ya — shafér. Plan prastóy: padnímim bákaly, skázhyem tost, fsye pláchut. Lyendárna.', tr: 'Ben sağdıcım. Plan basit: kadehleri kaldırırız, kadeh konuşması yaparız, herkes ağlar. Efsanevi.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Была и маленькая ссора — из-за музыки. Но они выговорились и пошли на уступки. Семья.', reading: 'Býla i mé\'n\'kaya ssóra — iz-za múzyki. No oni vıgavarílis\' i pashlí na ustúpki. Sim\'yá.', tr: 'Küçük bir kavga da oldu — müzik yüzünden. Ama içlerini döktüler ve ödün verdiler. Aile.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Потом — клятва. Тихая, честная. Фотограф плакал. Тамада плакал. Подружки невесты плакали громче всех.', reading: 'Patóm — klyátva. Tíkhaya, chésnaya. Fatágraf plákal. Tamadá plákal. Padródzhki nyevrésty plákali grómche fsyekh.', tr: 'Sonra — yemin. Sessiz, dürüst. Fotoğrafçı ağladı. Sunucu ağladı. Gelinin nedimeleri herkesten yüksek sesle ağladı.' },
    { speaker: 'Tyoma', ru: 'Объявляю вас мужем и женой! Горько!', reading: 'Ab\'yavlyáyú vas múzhem i zhenóy! Gór\'ka!', tr: 'Sizi karı koca ilan ediyorum! Acı!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Вальс. Шампанское. Торт — к счастью, целый. Забавно: конкурс на лучший тост выиграла тёща.', reading: 'Val\'s. Shampánskaye. Tort — k schást\'yu, tsélyy. Zabáwna: kansúrs na lúchshiy tost vvýigrala tyóshcha.', tr: 'Vals. Şampanya. Pasta — iyi ki bütün. Komik: en iyi kadeh konuşması yarışmasını kayınvalide kazandı.' },
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Дети, вот так я встретил вашу маму: дождь, наушник, носки, конверт, кольцо... и вечность. Но это уже другая история.', reading: 'Dyéti, vot tak ya vstrétil váshu mámu: dózhd\', naúshnik, nóski, kanvért, kal\'tsó... i vyéchnast\'. No éta uzhe drugáya istóriya.', tr: 'Çocuklar, annenizle böyle tanıştım: yağmur, kulaklık, çorap, zarf, yüzük... ve sonsuzluk. Ama o artık başka bir hikaye.' },
  ],
  newWords: [
    { ru: 'Торт', reading: 'Tort', tr: '(Düğün) pastası', note: 'Eril; buzdolabının en değerli misafiri.' },
    { ru: 'Фотограф', reading: 'Fatágraf', tr: 'Fotoğrafçı', note: 'Eril; düğünlerde en çok ağlayan kişi (bu hikayede).' },
    { ru: 'Вальс', reading: 'Val\'s', tr: 'Vals', note: 'Eril; ilk dans klasiği.' },
    { ru: 'Счастливый', reading: 'Schastlívy', tr: 'Mutlu', note: 'Eril; dişil: счастливая. "Счастье" — mutluluk.' },
    { ru: 'Подружка невесты', reading: 'Padródzhka nyevrésty', tr: 'Gelinin nedimesi', note: 'Düğün töreninin klasik rolü.' },
    { ru: 'Забавно', reading: 'Zabáwna', tr: 'Komik / eğlenceli (bulmak)', note: 'Zarf; "bu çok komik" hissi verir.' },
  ],
  keyPoints: [
    { id: 'cp8_k1', textTr: 'Düğünden önce Marina\'nın kayınvalidesi gelir ve uzun süre (bir ay) kalır; bir kriz yaşanır.', hintTr: 'Düğünden önce eve kim geldi ve ne kadar kaldı?', keywordGroups: [['kayınvalide'], ['kriz', 'ay', 'kaldı']] },
    { id: 'cp8_k2', textTr: 'Düğün pastası buzdolabında saklanır.', hintTr: 'Pasta nerede duruyordu?', keywordGroups: [['pasta'], ['buzdolab']] },
    { id: 'cp8_k3', textTr: 'Jenya çiçekler için pazarda bir saat pazarlık eder ("Anlaştık!").', hintTr: 'Çiçekleri kim, nereden aldı?', keywordGroups: [['pazar', 'pazarlık'], ['çiçek', 'gül']] },
    { id: 'cp8_k4', textTr: 'Tyoma düğünün sağdıcıdır: planı kadeh + konuşma + herkesin ağlamasıdır ("efsanevi").', hintTr: 'Tyoma\'nın düğündeki rolü ve planı neydi?', keywordGroups: [['sağdıç'], ['kadeh', 'ağla', 'efsanevi']] },
    { id: 'cp8_k5', textTr: 'Müzik yüzünden küçük bir kavga çıkar; içlerini döküp ödün vererek çözerler.', hintTr: 'Düğünde hangi konuda kavga çıktı ve nasıl çözüldü?', keywordGroups: [['müzik', 'kavga'], ['ödün', 'içini', 'çöz']] },
    { id: 'cp8_k6', textTr: 'Yemin sessiz ve dürüsttür; fotoğrafçı, sunucu ve nedimeler (herkes) ağlar.', hintTr: 'Yemin nasıldı ve kimler ağladı?', keywordGroups: [['yemin', 'and'], ['ağla']] },
    { id: 'cp8_k7', textTr: 'Tyoma çifti karı koca ilan eder ("Горько!").', hintTr: 'Karı koca ilan eden kimdi?', keywordGroups: [['karı koca', 'ilan', 'gorko'], ['töma', 'tyoma']] },
    { id: 'cp8_k8', textTr: 'Dima hikayeyi yağmur, kulaklık, çorap, zarf, yüzük ve sonsuzluğu sayarak kapatır.', hintTr: 'Finalde Dima hangi kelimeleri saydı?', keywordGroups: [['sonsuz'], ['yağmur', 'kulaklık', 'çorap', 'zarf', 'yüzük']] },
  ],
  misleading: [
    { tokens: ['ayrıldılar', 'boşandı', 'boşandılar'], noteTr: 'Düğün bölümünde kimse ayrılmadı — tam tersine evlendiler!' },
    { tokens: ['töma evlendi', 'tyoma evlendi'], noteTr: 'Bu bölümde evlenen Tyoma değil, Dima ve Marina idi.' },
    { tokens: ['pasta yandı'], noteTr: 'Pasta yanmadı — iyi ki bütün kaldı! (Yanan tavuk Bölüm 2\'deydi.)' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM FİNALİ 1 — Ünite 1-6 (A1 SONU) — HIMYM pilotu: sarı şemsiyenin doğuşu
// Kapılı final: özet %100 + Seviye Tekrar Sınavı geçilmeden A2 açılmaz.
// ---------------------------------------------------------------------------
const STORY_LF_A1: CheckpointStory = {
  id: 'story_lf_a1',
  kind: 'levelFinal',
  checkpoint: null,
  unitFrom: 1,
  unitTo: 6,
  levelId: 'A1',
  nextLevelId: 'A2',
  titleRu: 'Жёлтый зонт',
  titleTr: 'Sarı Şemsiye',
  framingTr:
    'Yıl 2035. Dima çocuklarına EN İLK hikayeyi anlatıyor: sarı bir şemsiye, berbat bir hava ve dünyanın en sıkıcı akşamı. How I Met Your Mother tarzı bir "pilot bölüm" — sondaki cliffhanger ise tam 76 ünite sonra çözülecek.',
  icon: '☂️',
  color: '#facc15',
  banner: 'scene/yellow-umbrella.jpg',
  searchQuery: 'How I Met Your Mother yellow umbrella scene',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Дети, сегодня — первая история. Самая первая. Про... зонт. Жёлтый зонт.', reading: 'Dyéti, sivódnya — pyérvaya istóriya. Samáya pyérvaya. Pra... zont. Zhólty zont.', tr: 'Çocuklar, bugün — ilk hikaye. En ilk hikaye. Konusu... bir şemsiye. Sarı bir şemsiye.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Утро. На улице — дождь, ветер и туман. Погода? Хм.', reading: 'Útra. Na úlitse — dózhd\', vyéter i tumán. Pagóda? Hm.', tr: 'Sabah. Dışarıda — yağmur, rüzgar ve sis. Hava? Hımm.' },
    { speaker: 'Dima', ru: 'Меня зовут Дима. Это — мой зонт. Жёлтый, как солнце. Подарок от бабушки!', reading: 'Minyá zavút Díma. Éta — moy zont. Zhólty, kak sóntse. Padárak at bábuschki!', tr: 'Benim adım Dima. Bu — benim şemsiyem. Güneş gibi sarı. Anneannemden hediye!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Сначала — автобус. Потом — метро. Который час? Шесть! Билет? Вот он! Быстро!', reading: 'Snachála — aftóbus. Patóm — mitró. Katóryy chas? Shest\'! Vot on! Býstra!', tr: 'Önce — otobüs. Sonra — metro. Saat kaç? Altı! Bilet? İşte! Çabuk!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Кафе «Восток». На улице — дождь. Дима — не дома. Дима — в кафе.', reading: 'Kafé «Vastók». Na úlitse — dózhd\'. Díma — ne dóma. Díma — f kafé.', tr: '"Vostok" kafesi. Dışarıda — yağmur. Dima — evde değil. Dima — kafede.' },
    { speaker: 'Официант', ru: 'Добрый вечер! Меню?', reading: 'Dóbry vécher! Menyú?', tr: 'İyi akşamlar! Menü?' },
    { speaker: 'Dima', ru: 'Здравствуйте! Кофе... один кофе! Большой кофе. Кофе.', reading: 'Zdrástvuytye! Kófe... adín kófe! Bal\'shóy kófe. Kófe.', tr: 'Merhaba! Kahve... bir kahve! Büyük kahve. Kahve.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Один час. Два часа. Дима читает меню: кофе, чай, вода, сок. Меню маленькое. Дима читает меню шесть раз.', reading: 'Adín chas. Dva chasá. Díma chitáyet menyú: kófe, chay, vadá, sok. Menyú málinkaye. Díma chitáyet menyú shest\' ras.', tr: 'Bir saat. İki saat. Dima menüyü okuyor: kahve, çay, su, meyve suyu. Menü küçük. Dima menüyü altı kez okuyor.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Дима думает: мама — дома, папа — дома, брат — дома. Вся семья — дома. А Дима? В кафе. С меню.', reading: 'Díma dúmayet: máma — dóma, pápa — dóma, brat — dóma. Vsya sim\'yá — dóma. A Díma? F kafé. S menyú.', tr: 'Dima düşünüyor: anne — evde, baba — evde, kardeş — evde. Bütün aile — evde. Dima? Kafede. Menüyle.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Скучный вечер. Наверное, это — очень скучный вечер.', reading: 'Skúchny vyéchar. Navérnaye, éta — óchen\' skúchny vyéchar.', tr: 'Sıkıcı bir akşam. Herhalde, bu — çok sıkıcı bir akşam.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Потом — «До свидания!». Дима идёт домой пешком. На улице — дождь. Дима — мокрый. Весь мокрый!', reading: 'Patóm — «Da svidániya!». Díma idyót damój pishkóm. Na úlitse — dózhd\'. Díma — mókry. Ves\' mókry!', tr: 'Sonra — "Hoşça kalın!". Dima eve yürüyor. Dışarıda — yağmur. Dima — ıslak. Hem de sırılsıklam!' },
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'А зонт?.. А ЗОНТ?! Дети, зонт был под столом. В кафе. Весь вечер... Но это — другая история. Пока!', reading: 'A zont?.. A ZONT?! Dyéti, zont byl pad stalóm. F kafé. Ves\' vyéchar... No éta — drugáya istóriya. Paká!', tr: 'Peki şemsiye?.. PEKİ ŞEMSİYE?! Çocuklar, şemsiye masanın altındaydı. Kafede. Bütün akşam... Ama o — başka bir hikaye. Görüşürüz!' },
  ],
  newWords: [
    { ru: 'Жёлтый', reading: 'Zhólty', tr: 'Sarı', note: 'Eril; bu hikayenin (ve tüm maceranın) resmi rengi.' },
    { ru: 'Зонт', reading: 'Zont', tr: 'Şemsiye', note: 'Eril; жёлтый зонт = sarı şemsiye. HIMYM\'in en ikonik objesi.' },
    { ru: 'Мокрый', reading: 'Mókry', tr: 'Islak', note: 'Eril; весь мокрый = sırılsıklam.' },
    { ru: 'Весь', reading: 'Ves\'', tr: 'Bütün, tüm', note: 'Eril (весь/вся/всё); "hepsi, tamamı" anlamında.' },
    { ru: 'Наверное', reading: 'Navérnaye', tr: 'Herhalde, galiba', note: 'Zarf; "sanırım"dan daha yumuşak bir tahmin.' },
    { ru: 'Скучный', reading: 'Skúchny', tr: 'Sıkıcı', note: 'Eril; bu akşamın resmi tanımı.' },
  ],
  keyPoints: [
    { id: 'lf_a1_k1', textTr: 'Hikaye, Dima\'nın çocuklarına anlattığı İLK hikayedir ve konusu sarı bir şemsiyedir.', hintTr: 'Bu, çocuklara anlatılan kaçıncı hikayeydi ve konusu neydi?', keywordGroups: [['ilk', 'birinci', 'en başta', 'pilot'], ['şemsiye']] },
    { id: 'lf_a1_k2', textTr: 'Sabah dışarıda yağmur, rüzgar ve sis vardır; hava berbattır.', hintTr: 'Sabah dışarıda hava nasıldı? Üç hava olayı say bakalım.', keywordGroups: [['yağmur'], ['rüzgar', 'sis', 'kötü', 'berbat']] },
    { id: 'lf_a1_k3', textTr: 'Sarı şemsiye güneş gibidir ve anneannesinden hediyedir.', hintTr: 'Şemsiye kime benzetilmişti ve kimden gelmişti?', keywordGroups: [['güneş', 'sarı'], ['anneanne', 'büyükanne', 'hediye']] },
    { id: 'lf_a1_k4', textTr: 'Dima önce otobüsle, sonra metroyla gider; saate bakar (altı) ve biletini gösterir.', hintTr: 'Dima hangi iki ulaşım aracını kullandı?', keywordGroups: [['otobüs'], ['metro', 'bilet']] },
    { id: 'lf_a1_k5', textTr: '"Vostok" kafesinde garson onu selamlar; Dima gergin gergin sadece kahve söyler (üç kez söyler!).', hintTr: 'Kafede kim karşıladı ve Dima ne söyledi?', keywordGroups: [['kafe', 'kafede', 'garson'], ['kahve']] },
    { id: 'lf_a1_k6', textTr: 'Menü çok küçüktür (kahve, çay, su, meyve suyu) ve Dima onu altı kez okuyarak zaman geçirir.', hintTr: 'Menüde neler vardı ve Dima menüyü kaç kez okudu?', keywordGroups: [['menü'], ['altı', '6', 'kez']] },
    { id: 'lf_a1_k7', textTr: 'Dima ailesini düşünür: annesi, babası, kardeşi hep evdedir; o ise yine kafededir.', hintTr: 'Dima kimleri düşündü ve herkes neredeydi?', keywordGroups: [['anne', 'baba', 'aile', 'kardeş'], ['evde']] },
    { id: 'lf_a1_k8', textTr: 'Dima eve YÜRÜYEREK, sırılsıklam olur; şemsiyesini masanın altında unutur — hikaye "başka hikaye" cliffhanger\'ıyla biter.', hintTr: 'Dima eve nasıl döndü ve şemsiye nerede kaldı?', keywordGroups: [['yürüyerek', 'yürüdü', 'yaya', 'ıslak', 'sırılsıklam'], ['unuttu', 'masa', 'altında']] },
  ],
  misleading: [
    { tokens: ['güneşli', 'güneş vardı', 'hava güzeldi'], noteTr: 'Hava güneşli değildi — yağmur, rüzgar ve sis vardı. (Güneş sadece şemsiyenin rengiydi!)' },
    { tokens: ['şemsiyeyi geri aldı', 'şemsiyesini aldı', 'şemsiyesiyle döndü', 'şemsiyeyi eve götürdü', 'şemsiyesini eve götürdü', 'şemsiyesini geri aldı'], noteTr: 'Dima şemsiyeyi masanın altında unuttu — eve şemsiyesiz ve sırılsıklam döndü!' },
    { tokens: ['yemek yedi', 'akşam yemeği yedi', 'salata', 'çorba içti'], noteTr: 'Dima yemek yemedi — sadece kahve içti (ve menüyü altı kez okudu).' },
  ],
  recycleWords: [],
};

// ---------------------------------------------------------------------------
// BÖLÜM FİNALİ 2 — Ünite 7-18 (A2 SONU) — Кухня tarzı: yeni garsonun ilk günü
// Kapılı final: özet %100 + Seviye Tekrar Sınavı geçilmeden B1 açılmaz.
// ---------------------------------------------------------------------------
const STORY_LF_A2: CheckpointStory = {
  id: 'story_lf_a2',
  kind: 'levelFinal',
  checkpoint: null,
  unitFrom: 7,
  unitTo: 18,
  levelId: 'A2',
  nextLevelId: 'B1',
  titleRu: 'Новый официант',
  titleTr: 'Yeni Garson',
  framingTr:
    'Sahne değişiyor: Moskova, «Ван Гог» restoranı. Bağırarak seven bir şef, kuralcı bir başgarson ve ilk iş gününde kıyameti yaşayan bir garson — tıpkı «Кухня» dizisi gibi, sadece daha fazla kırık tabakla.',
  icon: '🍳',
  color: '#ef4444',
  banner: 'scene/kuhnya-kitchen.jpg',
  searchQuery: 'Кухня сериал смешные сцены на кухне',
  paragraphs: [
    { speaker: 'Anlatıcı', narrator: true, ru: 'Москва. Ресторан «Ван Гог». Утро. Шеф Пётр на кухне: «Быстро! Заказ! Соус — где?!»', reading: 'Maskvá. Ristarán «Van Gók». Útra. Shef Pyótr na kúkhnye: «Býstra! Zakáz! Saús — gdye?!»', tr: 'Moskova. "Van Gogh" restoranı. Sabah. Şef Pyotr mutfakta: "Çabuk! Sipariş! Sos nerede?!"' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Сегодня — новый официант. Лёша. Первый день. Он очень нервный.', reading: 'Sivódnya — nówyy  afitsiánt. Lyósha. Pyérwy den\'. On óchen\' nyérwny.', tr: 'Bugün — yeni garson. Lyosha. İlk gün. Çok gergin.' },
    { speaker: 'Лёша', ru: 'Здравствуйте! Я — Лёша. Я — новый официант. Где... моя работа?', reading: 'Zdrástvuytye! Ya — Lyósha. Ya — nówyy  afitsiánt. Gdye... mayá rabóta?', tr: 'Merhaba! Ben — Lyosha. Ben — yeni garsonum. Nerede... benim işim?' },
    { speaker: 'Нина', ru: 'Я — Нина. Фартук — вот так. Поднос — вот так. Ошибка — вот так НЕ НАДО. Понял?', reading: 'Ya — Nína. Fartúk — vot tak. Padnós — vot tak. Ashýbka — vot tak NYE NÁDA. Panyál?', tr: 'Ben — Nina. Önlük — böyle. Tepsi — böyle. Hata — böyle OLMASIN. Anladın mı?' },
    { speaker: 'Лёша', ru: 'Да, Нина! Извините! Спасибо большое!', reading: 'Da, Nína! Izvinítye! Spasíba bal\'shóye!', tr: 'Evet, Nina! Özür dilerim! Çok teşekkürler!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Вечер. Гости — день рождения! Праздник! Лёша несёт поднос. На подносе — блюдо номер один.', reading: 'Vyéchar. Gósti — den\' razhdéniya! Prázdnyk! Lyósha nisyót padnós. Na padnóse — blyúdo nómer adín.', tr: 'Akşam. Konuklar — doğum günü! Şölen! Lyosha tepsi taşıyor. Tepsinin üstünde — bir numaralı yemek.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'И... ошибка. Блюдо — на полу. Соус — тоже на полу. Лёша — тоже на полу.', reading: 'I... ashýbka. Blyúdo — na palú. Saús — tózhe na palú. Lyósha — tózhe na palú.', tr: 'Ve... hata. Yemek — yerde. Sos — o da yerde. Lyosha — o da yerde.' },
    { speaker: 'Шеф Пётр', ru: 'Лёша! Это кухня или цирк?! Быстро! Вставай!', reading: 'Lyósha! Éta kúkhnya íli tsírk?! Býstra! Fstaváy!', tr: 'Lyosha! Burası mutfak mı sirk mi?! Çabuk! Kalk!' },
    { speaker: 'Лёша', ru: 'Извините! Простите! Я умею работать! Честно!', reading: 'Izvinítye! Prastítye! Ya uméyu rabótat\'! Chésna!', tr: 'Özür dilerim! Affedersiniz! Ben çalışmayı biliyorum! Gerçekten!' },
    { speaker: 'Нина', ru: 'Ничего страшного. У каждого официанта был первый день. Вставай. Гости ждут.', reading: 'Nichivó stráshnava. U kázhdata  afitsiánta býl pyérwy den\'. Fstaváy. Gósti zhduk.', tr: 'Önemli değil. Her garsonun bir ilk günü olmuştur. Kalk. Konuklar bekliyor.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Лёша встал. Новый поднос, новое блюдо. Гости едят и говорят: «Вкусно! Вкусно!»', reading: 'Lyósha fstál. Nówyy padnós, nówaye blyúdo. Gósti yedyat i gavarýt: «Fkúsna! Fkúsna!»', tr: 'Lyosha kalktı. Yeni tepsi, yeni yemek. Konuklar yiyor ve diyorlar: "Lezzetli! Lezzetli!"' },
    { speaker: 'Гость', ru: 'Молодой человек, спасибо большое! Угощение — отлично! А это... для вас.', reading: 'Maladóy chilavyék, spasíba bal\'shóye! Ugashchéniye — atlíchna! A éta... dlya vas.', tr: 'Genç adam, çok teşekkürler! İkram — harika! Ve bu... sizin için.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Пётр смотрит. Пётр говорит: «Завтра. В семь. Не опоздай.» Это — «да». Первый день окончен: одна ошибка, ноль блюд, сто процентов нервов. Классика!', reading: 'Pyótr smótrit. Pyótr gavarít: «Závtra. F syém\. Ni apazdáy.» Éta — «da». Pyérwy den\' akónchen: adná ashýbka, nol\' blyúd, stó pratsyéntyf nyérfaf. Klásika!', tr: 'Pyotr bakıyor. Pyotr diyor ki: "Yarın. Yedide. Geç kalma." Bu bir "evet"tir. İlk gün bitti: bir hata, sıfır yemek, yüzde yüz sinir. Klasik!' },
  ],
  newWords: [
    { ru: 'Повар', reading: 'Pavár', tr: 'Aşçı', note: 'Eril; шеф = şef, повар = aşçı. Mutfak hiyerarşisinin temeli.' },
    { ru: 'Блюдо', reading: 'Blyúda', tr: 'Yemek (tabak)', note: 'Orta cins; hem yemeği hem tabağı ifade eder.' },
    { ru: 'Ошибка', reading: 'Ashýbka', tr: 'Hata', note: 'Dişil; Lyosha\'nın uzmanlık alanı.' },
    { ru: 'Поднос', reading: 'Padnós', tr: 'Tepsi', note: 'Eril; garsonun en yakın dostu ve en büyük düşmanı.' },
    { ru: 'Нервный', reading: 'Nyérwny', tr: 'Gergin, sinirli', note: 'Eril; dişil: нервная. Первый день = нервный день.' },
    { ru: 'Фартук', reading: 'Fartúk', tr: 'Önlük', note: 'Eril; mutfak üniformasının yarısı.' },
  ],
  keyPoints: [
    { id: 'lf_a2_k1', textTr: 'Hikaye Moskova\'daki «Ван Гог» restoranında geçer; şef Pyotr mutfakta "çabuk, sipariş, sos" diye bağırarak günü açar.', hintTr: 'Hikaye hangi şehirdeki hangi restoranda geçiyor ve mutfakta kim bağırıyordu?', keywordGroups: [['restoran', 'van gogh', 'moskova'], ['şef', 'pyotr']] },
    { id: 'lf_a2_k2', textTr: 'Lyosha yeni garson olarak ilk iş gününe başlar ve çok gergindir.', hintTr: 'Yeni gelen kişinin adı, işi ve ilk günü nasıldı?', keywordGroups: [['yeni', 'ilk gün', 'garson'], ['lyosha', 'lyoşa', 'gergin']] },
    { id: 'lf_a2_k3', textTr: 'Nina, Lyosha\'ya önlüğü, tepsiyi ve hatanın nasıl yapılmayacağını öğretir.', hintTr: 'Nina yeni garsona neleri gösterdi?', keywordGroups: [['nina'], ['önlük', 'tepsi', 'hata']] },
    { id: 'lf_a2_k4', textTr: 'Akşam konuklar bir doğum günü kutlamaktadır; Lyosha bir numaralı yemeği tepsiyle taşır.', hintTr: 'Konuklar o akşam neyi kutluyordu ve Lyosha tepside ne taşıyordu?', keywordGroups: [['doğum günü', 'kutlama', 'şölen', 'konuk'], ['tepsi', 'yemek']] },
    { id: 'lf_a2_k5', textTr: 'Kaza: yemek, sos ve Lyosha yere düşer — günün en büyük hatası.', hintTr: 'Tepsiyle ne oldu?', keywordGroups: [['yere', 'düştü', 'devrildi'], ['yemek', 'sos']] },
    { id: 'lf_a2_k6', textTr: 'Şef Pyotr öfkelenir: "Burası mutfak mı sirk mi?!" der.', hintTr: 'Şef ne diye bağırdı?', keywordGroups: [['şef', 'pyotr', 'kızdı', 'öfke', 'bağırdı'], ['sirk']] },
    { id: 'lf_a2_k7', textTr: 'Lyosha özür diler; Nina "önemli değil, her garsonun bir ilk günü olur" diyerek onu yüreklendirir.', hintTr: 'Lyosha ne yaptı ve Nina ona ne dedi?', keywordGroups: [['özür', 'özür diledi'], ['nina', 'önemli değil', 'ilk gün', 'yüreklendir', 'kalk']] },
    { id: 'lf_a2_k8', textTr: 'Yeni tepsiyle getirilen yemek lezzetli olur; konuklar memnun kalır ve teşekkür eder.', hintTr: 'İkinci deneme nasıl gitti?', keywordGroups: [['lezzetli'], ['konuk', 'teşekkür', 'memnun', 'harika']] },
    { id: 'lf_a2_k9', textTr: 'Şef Pyotr sonunda "Yarın, yedide, geç kalma" der — yani Lyosha işte kalır.', hintTr: 'Şef gün sonunda ne dedi ve bu ne anlama geliyordu?', keywordGroups: [['yarın', 'yedi'], ['işte kaldı', 'kaldı', 'evet dedi']] },
  ],
  misleading: [
    { tokens: ['kovuldu', 'kovdu', 'işten çıkarıldı', 'işten atıldı'], noteTr: 'Lyosha kovulmadı — tam tersine şef ona "yarın yedide" dedi; yani işi kaldı.' },
    { tokens: ['şef övdü', 'şef tebrik etti', 'şef memnun kaldı'], noteTr: 'Şef Pyotr onu övmedi — sadece "yarın yedide" dedi. Pyotr\'dan bu bile aşırı duygusal bir jest sayılır.' },
    { tokens: ['yıldız oldu', 'efsanevi garson', 'en iyi garson'], noteTr: 'Lyosha yıldız olmadı — sadece hayatta kaldı (bu bile ilk gün için büyük bir başarı).' },
  ],
  recycleWords: [
    { ru: 'Шеф', tr: 'Şef', from: 'A2 · Ünite 11' },
    { ru: 'Кухня', tr: 'Mutfak', from: 'A2 · Ünite 9/11' },
    { ru: 'Соус', tr: 'Sos', from: 'A2 · Ünite 11' },
    { ru: 'Вкусно', tr: 'Lezzetli', from: 'A2 · Ünite 11' },
    { ru: 'Извините', tr: 'Özür dilerim', from: 'A2 · Ünite 16' },
    { ru: 'Ничего страшного', tr: 'Önemli değil', from: 'A2 · Ünite 16' },
    { ru: 'День рождения', tr: 'Doğum günü', from: 'A2 · Ünite 18' },
    { ru: 'Праздник', tr: 'Şölen / kutlama', from: 'A2 · Ünite 18' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM FİNALİ 3 — Ünite 19-43 (B1 SONU) — Crossover: HIMYM kadrosu «Ван Гог»ta
// Kapılı final: özet %100 + Seviye Tekrar Sınavı geçilmeden B2 açılmaz.
// ---------------------------------------------------------------------------
const STORY_LF_B1: CheckpointStory = {
  id: 'story_lf_b1',
  kind: 'levelFinal',
  checkpoint: null,
  unitFrom: 19,
  unitTo: 43,
  levelId: 'B1',
  nextLevelId: 'B2',
  titleRu: 'Ужин в «Ван Гоге»',
  titleTr: '«Ван Гог»ta Akşam Yemeği',
  framingTr:
    'Ve şimdi çocuklar, bir CROSSOVER bölümü: Dima ve Marina «Ван Гог» restoranında... ve tabii ki Tyoma da orada. Aynı restoran, aynı akşam — tıpkı bir sitcom\'da olduğu gibi. Mutfakta ise gerçek bir yıldız var: şef Pyotr.',
  icon: '🍽️',
  color: '#e879f9',
  banner: 'scene/vangog.jpg',
  searchQuery: 'Кухня сериал ресторан смешные моменты',
  paragraphs: [
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Дети, это — история про ресторан «Ван Гог». Да, тот самый. Всё началось со столика...', reading: 'Dyéti, éta — istóriya pra ristarán «Van Gók». Da, tot sámыy. Fsyó nachalós\' sa stólika...', tr: 'Çocuklar, bu — "Van Gogh" restoranının hikayesi. Evet, o meşhur restoran. Her şey bir masayla başladı...' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Дима и Марина. Вечер. Романтика: букет, свечи, столик у окна.', reading: 'Díma i Marína. Vyéchar. Ramántika: bakyét, svyéchi, stólik u akná.', tr: 'Dima ve Marina. Akşam. Romantizm: buket, mumlar, pencere kenarında bir masa.' },
    { speaker: 'Dima', ru: 'Я заказал столик неделю назад. Специально. Для тебя.', reading: 'Ya zakazál stólik nidyélyu nazád. Spetsiyál\'na. Dlya tibyá.', tr: 'Masayı bir hafta önce ayırttım. Özellikle. Senin için.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'А за другим столиком... Тёма. И Вера. И Женя с Леной. Все здесь! Совпадение? Нет. План Тёмы.', reading: 'A za drugím stólikam... Tyóma. I Véra. I Zhénya s Lénay. Fsyé zdyés\'! Sapadyéniye? Nyet. Plan Tyómy.', tr: 'Ve diğer masada... Tyoma. Ve Vera. Ve Jenya ile Lena. Herkes burada! Tesadüf mü? Hayır. Tyoma\'nın planı.' },
    { speaker: 'Тёма', ru: 'Дима! Марина! Какая встреча! Мы тоже здесь. Ужин — на шестерых. Договорились?', reading: 'Díma! Marína! Kakáya vstryécha! Mы tózhe zdyés\'. Úzhyn — na shestirykh. Dagarílis\'?', tr: 'Dima! Marina! Ne tesadüf! Biz de buradayız. Yemek — altı kişilik. Anlaştık mı?' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Лёша — официант. Теперь почти лучший официант Москвы. И вот — момент: Лёша несёт десерт.', reading: 'Lyósha —  afitsiánt. Tipyér\' póchti lúchshiy  afitsiánt Maskvý. I vot — mamént: Lyósha nisyót dyesért.', tr: 'Lyosha — garson. Artık Moskova\'nın neredeyse en iyi garsonu. Ve işte — an: Lyosha tatlıyı getiriyor.' },
    { speaker: 'Лёша', ru: 'Добрый вечер! Вот меню. Соус шефа — как всегда: идеально.', reading: 'Dóbry vécher! Vot menyú. Saús shéfa — kak fsigdá: idiyál\'na.', tr: 'İyi akşamlar! İşte menü. Şefin sosu — her zamanki gibi: mükemmel.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Вилка... ложка... скатерть... Всё идёт хорошо! Слишком хорошо.', reading: 'Vílka... lózhka... skatyért\'... Fsyó idyót kharashó! Slíshkam kharashó.', tr: 'Çatal... kaşık... masa örtüsü... Her şey iyi gidiyor! ÇOK iyi gidiyor.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'И тут — ОЙ. Ложка. Вилка. Пол. Десерт. Классика «Ван Гога».', reading: 'I tut — OY. Lózhka. Vílka. Pol. Dyesért. Klásika «Van Góga».', tr: 'Ve o an — OY. Kaşık. Çatal. Yer. Tatlı. "Van Gogh" klasiği.' },
    { speaker: 'Марина', ru: 'Спокойно! Ничего страшного. Бывает.', reading: 'Spakóyna! Nichivó stráshnava. Byváyit.', tr: 'Sakin! Önemli değil. Olur böyle şeyler.' },
    { speaker: 'Нина', ru: 'Замена готова! Официантка номер один — это я.', reading: 'Zamyéna gótava!  Afitsiántka nómer adín — éta ya.', tr: 'Yenisi hazır! Bir numaralı garson — benim.' },
    { speaker: 'Шеф Пётр', ru: '(выходит из кухни) Простите! Десерт — за счёт ресторана! И... постойте. Вы — архитектор Дима?! Ты делал план нашей кухни! Лучшая кухня в Москве! Десерт — два раза!', reading: '(vikhódit iz kúkhni) Prastítye! Dyesért — za schót ristarana! I... pastóytye. Vy — arkityéktar Díma?! Ty délal plan nashay kúkhni! Lúchshaya kúkhnya f Maskvyé! Dyesért — dva raza!', tr: '(mutfaktan çıkar) Affedersiniz! Tatlı — restoranın ikramı! Ve... durun. Siz — mimar Dima mı?! Sen bizim mutfağın planını çizdin! Moskova\'nın en iyi mutfağı! Tatlı — iki kat!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Счёт. Женя считает чаевые — как юрист: «Так... десять процентов... нет, пятнадцать...»', reading: 'Schót. Zhénya schitáyet chayvýye — kak yuríst: «Tak... dyésyat\' pratsyéntaf... nyet, pitnátsat\'...»', tr: 'Hesap. Jenya bahşişi hesaplıyor — bir avukat gibi: "Şöyle... yüzde on... hayır, on beş..."' },
    { speaker: 'Тёма', ru: 'Вечер был... легендарно! Ван Гог, шеф, ложки — всё, как я люблю.', reading: 'Vyéchar býl... lyegándarna! Van Gók, shef, lózhki — fsyó, kak ya lyublyú.', tr: 'Akşam... efsaneydi! Van Gogh, şef, kaşıklar — her şey, sevdiğim gibi.' },
    { speaker: 'Anlatıcı (2035)', narrator: true, ru: 'Дети, в тот вечер Марина сказала: «Вот поэтому я с тобой». Не из-за десерта. Из-за спокойствия. Ну... и немного из-за десерта.', reading: 'Dyéti, f tot vyéchar Marína skazála: «Vot patómu ya s tabóy». Ne iz-za dyesérta. Iz-za spakóystviya. Nu... i nimnóga iz-za dyesérta.', tr: 'Çocuklar, o akşam Marina dedi ki: "İşte bu yüzden seninleyim." Tatlı yüzünden değil. Sakinliği yüzünden. Yani... ve biraz da tatlı yüzünden.' },
  ],
  newWords: [
    { ru: 'Десерт', reading: 'Dyesért', tr: 'Tatlı (restoran tabağı)', note: 'Eril; yemekten sonra gelen mutluluk.' },
    { ru: 'Скатерть', reading: 'Skatyért\'', tr: 'Masa örtüsü', note: 'Dişil; çatal kaşığın iniş pisti.' },
    { ru: 'Столик', reading: 'Stólik', tr: '(Ayırtılmış) masa', note: 'Eril; стол\'un küçüğü. Заказать столик = masa ayırtmak.' },
    { ru: 'Ложка', reading: 'Lózhka', tr: 'Kaşık', note: 'Dişil; bu hikayede yerle buluşan kahraman.' },
    { ru: 'Вилка', reading: 'Vílka', tr: 'Çatal', note: 'Dişil; ложка\'nın uçuş ortağı.' },
    { ru: 'Официантка', reading: 'Afitsiántka', tr: 'Garson (kadın)', note: 'Dişil; официант (eril) kelimesinin dişil hali. Nina bu rolün efsanesi.' },
  ],
  keyPoints: [
    { id: 'lf_b1_k1', textTr: 'Dima ve Marina «Ван Гог»ta romantik bir akşam yemeği yer; Dima masayı bir hafta önce, Marina için özel ayırtmıştır.', hintTr: 'Çift nerede yemek yiyordu ve masa ne zaman, kimin için ayırtılmıştı?', keywordGroups: [['masa', 'ayırt', 'restoran', 'van gogh'], ['marina', 'romantik', 'özel', 'hafta']] },
    { id: 'lf_b1_k2', textTr: 'Sürpriz: Tyoma, Vera, Jenya ve Lena da aynı restorandadır — bu Tyoma\'nın planıdır ve yemek altı kişilik olur.', hintTr: 'Başka hangi arkadaşlar oradaydı ve bu kimin planıydı?', keywordGroups: [['tyoma', 'vera', 'jenya', 'lena', 'arkadaş'], ['plan', 'altı', 'aynı restoran']] },
    { id: 'lf_b1_k3', textTr: 'Lyosha artık restoranın (neredeyse en iyi) garsonudur ve tatlıyı getirir; her şey ilk başta çok iyi gider.', hintTr: 'Garson kimdi ve masaya ne getiriyordu?', keywordGroups: [['lyosha', 'lyoşa', 'garson'], ['tatlı', 'getiriyordu', 'getirdi']] },
    { id: 'lf_b1_k4', textTr: 'Facia: kaşık, çatal ve tatlı yere düşer — «Ван Гог»un klasik kazası.', hintTr: 'Tatlıyla birlikte neler yere düştü?', keywordGroups: [['kaşık', 'çatal', 'tatlı'], ['yere', 'düştü']] },
    { id: 'lf_b1_k5', textTr: 'Marina sakin kalır ("Önemli değil, olur") ve Nina hemen yenisini getirir.', hintTr: 'Kaza karşısında Marina nasıl davrandı ve yenisi kim getirdi?', keywordGroups: [['marina', 'sakin'], ['nina', 'yeni', 'önemli değil']] },
    { id: 'lf_b1_k6', textTr: 'Şef Pyotr mutfaktan çıkar, özür diler ve tatlıyı restoranın ikramı yapar.', hintTr: 'Şef mutfaktan çıkınca ne yaptı?', keywordGroups: [['şef', 'pyotr', 'mutfak'], ['özür', 'ikram', 'bedava']] },
    { id: 'lf_b1_k7', textTr: 'Şef, Dima\'yı tanır: Dima mutfağın planını çizen mimardır ("Moskova\'nın en iyi mutfağı") ve tatlı iki kat olur.', hintTr: 'Şef Dima\'yı neden tanıdı ve buna tepkisi ne oldu?', keywordGroups: [['şef', 'pyotr'], ['mimar', 'plan', 'mutfak', 'tanıdı']] },
    { id: 'lf_b1_k8', textTr: 'Hesap gelirken Jenya bahşişi bir avukat gibi hesaplar (yüzde on mu, on beş mi).', hintTr: 'Hesap ödenirken hangi arkadaş neyi nasıl hesapladı?', keywordGroups: [['jenya'], ['bahşiş', 'avukat', 'yüzde']] },
    { id: 'lf_b1_k9', textTr: 'Marina, Dima\'nın sakinliği yüzünden (biraz da tatlı yüzünden) onunla olduğunu söyler.', hintTr: 'Marina akşam sonunda neden Dima\'yla olduğunu söyledi?', keywordGroups: [['marina'], ['sakin', 'bu yüzden', 'tatlı']] },
  ],
  misleading: [
    { tokens: ['evlilik teklifi', 'diz çöktü', 'yüzük', 'nişanlandı'], noteTr: 'Dima bu akşam evlilik teklifi etmedi — o bölüm için B2\'yi beklemek gerekecek!' },
    { tokens: ['tatlı yandı', 'yemek yandı', 'mutfakta yangın'], noteTr: 'Tatlı yanmadı — yere düştü! (Yanan tavuk zaten eski bir hikayeydi.)' },
    { tokens: ['lyosha kovuldu', 'garson kovuldu', 'şef kızdı', 'şef bağırdı'], noteTr: 'Kimse kovulmadı ve şef kızmadı — Marina sakin kaldı, şef tatlıyı ikram etti; Tyoma akşama "efsanevi" dedi.' },
  ],
  recycleWords: [
    { ru: 'Меню', tr: 'Menü', from: 'A1 · Ünite 3' },
    { ru: 'Счёт', tr: 'Hesap', from: 'B1 · Ünite 42' },
    { ru: 'Чаевые', tr: 'Bahşiş', from: 'B1 · Ünite 42' },
    { ru: 'Извините', tr: 'Özür dilerim', from: 'A2 · Ünite 16' },
    { ru: 'Встреча', tr: 'Karşılaşma / tesadüf', from: 'A2 · Ünite 10' },
    { ru: 'Кухня', tr: 'Mutfak', from: 'A2 · Ünite 9/11' },
    { ru: 'Соус', tr: 'Sos', from: 'A2 · Ünite 11' },
    { ru: 'Свеча', tr: 'Mum', from: 'B1 · Ünite 30' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM FİNALİ 4 — Ünite 44-64 (B2 SONU) — Кухня tarzı: şefin teklifi
// Kapılı final: özet %100 + Seviye Tekrar Sınavı geçilmeden C1 açılmaz.
// ---------------------------------------------------------------------------
const STORY_LF_B2: CheckpointStory = {
  id: 'story_lf_b2',
  kind: 'levelFinal',
  checkpoint: null,
  unitFrom: 44,
  unitTo: 64,
  levelId: 'B2',
  nextLevelId: 'C1/C2',
  titleRu: 'Вечер шефа',
  titleTr: 'Şefin Akşamı',
  framingTr:
    'Sahne yine «Ван Гог» — ama bu kez romantizmi masaya koyan şef Pyotr: 12 yıllık sağ kolu Nina\'ya evlilik teklifi edecek. Plan: mükemmel. Ekip: Lyosha ve Semyon. Müzik: tek bir şarkı. Sonuç: izleyelim.',
  icon: '🌹',
  color: '#f472b6',
  banner: 'scene/kuhnya-kitchen.jpg',
  searchQuery: 'Кухня сериал лучшие романтические моменты',
  paragraphs: [
    { speaker: 'Anlatıcı', narrator: true, ru: 'Ресторан «Ван Гог». Ночь. Ресторан закрыт... но кухня — нет.', reading: 'Ristarán «Van Gók». Noch\'. Ristarán zakrýt... no kúkhnya — nyet.', tr: '"Van Gogh" restoranı. Gece. Restoran kapalı... ama mutfak — değil.' },
    { speaker: 'Шеф Пётр', ru: 'Лёша! Семён! План! Сегодня вечером я предлагаю Нине руку и сердце.', reading: 'Lyósha! Semyón! Plan! Sivódnya vyécharam ya pridlagáyu Nínye rúku i sérdtse.', tr: 'Lyosha! Semyon! Plan! Bu akşam Nina\'ya evlilik teklifi ediyorum.' },
    { speaker: 'Лёша', ru: '(роняет поднос) Что?! Вы?.. женитесь?! Ой. То есть — поздравляю!', reading: '(ránayet padnós) Shto?! Vy?.. zhenítyes\'?! Oy. Ta yest\' — pazdravlyáyu!', tr: '(tepsiyi düşürür) Ne?! Siz mi?.. evleniyorsunuz?! Ay. Yani — tebrikler!' },
    { speaker: 'Семён', ru: 'Спокойно. У нас — чек-лист. Свечи: есть. Розы: есть. Гитара... Лёша, гитара!', reading: 'Spakóyna. U nas — chek-líst. Svyéchi: yest\'. Rózy: yest\'. Gitára... Lyósha, gitára!', tr: 'Sakin olun. Elimizde — kontrol listesi. Mumlar: var. Güller: var. Gitar... Lyosha, gitar!' },
    { speaker: 'Лёша', ru: 'Я умею играть... одну песню. «Катюша».', reading: 'Ya uméyu igrát\'... adnú pyésnyu. «Katyúsha».', tr: 'Ben çalabiliyorum... tek bir şarkı. "Katyuşa".' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'План: Нина приходит в восемь. Тёмно, свечи, гитара. Пётр встаёт на колени. Кольцо. Волнение. Красиво.', reading: 'Plan: Nína prikhódit f vósyem\'. Tyómna, svyéchi, gitára. Pyótr vstayót na kólni. Kal\'tsó. Valnyéniye. Krasíva.', tr: 'Plan: Nina sekizde gelir. Karanlık, mumlar, gitar. Pyotr diz çöker. Yüzük. Heyecan. Güzel.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Реальность: Нина приходит в СЕМЬ. На час раньше. С блокнотом. Конечно.', reading: 'Riyál\'nast\': Nína prikhódit f SYÉM\'. Na chas rán\'she. S blaknótam. Kanyéchna.', tr: 'Gerçek: Nina YEDİde gelir. Bir saat erken. Elinde defteriyle. Tabii ki.' },
    { speaker: 'Нина', ru: 'Пётр? Почему темно? И почему Лёша стоит за шторой... с гитарой?', reading: 'Pyótr? Pachimú tyómna? I pachimú Lyósha stóit za shtaróy... s gitáray?', tr: 'Pyotr? Neden karanlık? Ve neden Lyosha perdenin arkasında duruyor... gitarla?' },
    { speaker: 'Шеф Пётр', ru: 'Это... сюрприз! То есть — нет! То есть — да! В общем — да!', reading: 'Éta... syurpríz! Ta yest\' — nyet! Ta yest\' — da! F apshchém — da!', tr: 'Bu... sürpriz! Yani — hayır! Yani — evet! Her hâlükârda — evet!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Лёша играет «Катюшу». Медленно. Романтично. Ну, почти.', reading: 'Lyósha igráyit «Katyúshu». Myédlyenna. Ramántichna. Nu, póchti.', tr: 'Lyosha "Katyuşa"yı çalıyor. Yavaşça. Romantik. Yani, neredeyse.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Пётр — на коленях. Кольцо дрожит. Руки — тоже. Весь ресторан ждёт. Тишина.', reading: 'Pyótr — na kólnyakh. Kal\'tsó drazhýt. Rúki — tózhe. Ves\' ristarán zhdyót. Tishýna.', tr: 'Pyotr — dizlerinde. Yüzük titriyor. Eller — onlar da. Bütün restoran bekliyor. Sessizlik.' },
    { speaker: 'Шеф Пётр', ru: 'Нина! Ты — лучший человек моей кухни... и моей жизни. Ты выйдешь за меня?', reading: 'Nína! Ty — lúchshiy chilavyék mayéy kúkhni... i mayéy zhýzni. Ty výydyesh za minyá?', tr: 'Nina! Sen mutfağımın... ve hayatımın en iyi insanısın. Benimle evlenir misin?' },
    { speaker: 'Нина', ru: '(спокойно, как всегда) Я согласна. Уже двенадцать лет. Ты долго думал.', reading: '(spakóyna, kak fsigdá) Ya saglásna. Uzhé dvyénadtsat\' lyet. Ty dólgа dumál.', tr: '(her zamanki gibi sakin) Evet, kabul ediyorum. On iki yıldır. Çok düşündün sen.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'И — музыка! Лёша играл «Катюшу» весь вечер. Три раза. Семён плакал. Дважды. Помолвка — состоялась. И да: в тот вечер десерт не падал. Ни разу. Чудеса!', reading: 'I — múzyka! Lyósha igrál «Katyúshu» ves\' vyéchar. Tri raza. Semyón plákal. Dvázhdы. Pamólvka — sastayálás\'. I da: f tot vyéchar dyesért ni padál. Ni razú. Chudyésá!', tr: 'Ve — müzik! Lyosha bütün akşam "Katyuşa"yı çaldı. Üç kez. Semyon ağladı. İki kez. Nişan — tutuldu. Ve evet: o akşam tatlı yere düşmedi. Bir kez bile. Mucize!' },
  ],
  newWords: [
    { ru: 'Ночь', reading: 'Noch\'', tr: 'Gece', note: 'Dişil; bu teklifin resmi saati.' },
    { ru: 'Тёмно', reading: 'Tyómna', tr: 'Karanlık', note: 'Zarf; " burada karanlık" hissi verir (durum bildirir, şekil değiştirmez).' },
    { ru: 'Музыка', reading: 'Múzyka', tr: 'Müzik', note: 'Dişil; bu hikayede tek şarkılık bir müzik.' },
    { ru: 'Гитара', reading: 'Gitára', tr: 'Gitar', note: 'Dişil; Lyosha\'nın repertuvarının tamamı.' },
    { ru: 'Роза', reading: 'Róza', tr: 'Gül', note: 'Dişil; розы (çoğul) = güller. Teklif klasiklerinden.' },
    { ru: 'Тишина', reading: 'Tishýna', tr: 'Sessizlik', note: 'Dişil; "evet" kelimesinden önceki en sessiz an.' },
  ],
  keyPoints: [
    { id: 'lf_b2_k1', textTr: 'Hikaye gece, kapanmış «Ван Гог» restoranının mutfağında geçer; şef Pyotr ekibi (Lyosha ve Semyon) toplayıp planını açıklar: o akşam Nina\'ya evlilik teklifi edecektir.', hintTr: 'Hikaye nerede, ne zaman geçiyor ve şefin planı ne?', keywordGroups: [['gece', 'restoran', 'van gogh'], ['şef', 'pyotr', 'teklif', 'nina']] },
    { id: 'lf_b2_k2', textTr: 'Semyon\'un kontrol listesi vardır: mumlar ve güller hazırdır; müzik için gitar gerekir.', hintTr: 'Semyon hangi şeylerin hazır olduğunu kontrol etti?', keywordGroups: [['semyon', 'liste'], ['mum', 'gül', 'gitar']] },
    { id: 'lf_b2_k3', textTr: 'Lyosha tek bir şarkı çalabilir: «Катюша».', hintTr: 'Lyosha hangi şarkıyı çalabiliyordu?', keywordGroups: [['lyosha', 'lyoşa', 'şarkı', 'katyuşa'], ['çal']] },
    { id: 'lf_b2_k4', textTr: 'Plana göre Nina sekizte gelecek; karanlıkta mumlar yanacak, Pyotr diz çökecek ve yüzüğü takacaktır.', hintTr: 'Plana göre Nina saat kaça gelecekti ve Pyotr ne yapacaktı?', keywordGroups: [['sekiz', 'plan'], ['diz', 'yüzük']] },
    { id: 'lf_b2_k5', textTr: 'Gerçek: Nina bir saat erken (yedide) elinde defteriyle gelir ve karanlıkta perdenin arkasında gitarla bekleyen Lyosha\'yı fark eder.', hintTr: 'Nina planlanandan ne zaman geldi ve neyi fark etti?', keywordGroups: [['erken', 'yedi', 'bir saat'], ['lyosha', 'lyoşa', 'perde', 'gitar', 'fark']] },
    { id: 'lf_b2_k6', textTr: 'Pyotr diz çöker; yüzük ve elleri titrer, bütün restoran sessizce bekler.', hintTr: 'Teklif anında Pyotr ve restorandaki herkes ne yapıyordu?', keywordGroups: [['diz', 'yüzük', 'titri'], ['sessiz', 'bekli']] },
    { id: 'lf_b2_k7', textTr: 'Pyotr, Nina\'ya "mutfağımın ve hayatımın en iyi insanı" diyerek evlenme teklif eder.', hintTr: 'Pyotr teklif ederken Nina\'ya ne dedi?', keywordGroups: [['en iyi', 'mutfağım', 'hayatımın'], ['teklif', 'evlen']] },
    { id: 'lf_b2_k8', textTr: 'Nina sakin bir şekilde hemen "evet" der ve "on iki yıldır bekliyordum, çok düşündün" diye ekler.', hintTr: 'Nina ne cevap verdi ve ne ekledi?', keywordGroups: [['evet', 'kabul', 'sana varım'], ['on iki', '12', 'bekl', 'sakin']] },
    { id: 'lf_b2_k9', textTr: 'Nişan gerçekleşir: Lyosha «Катюша»yı üç kez çalar, Semyon iki kez ağlar ve o akşam (mucize eseri) hiçbir tatlı yere düşmez.', hintTr: 'Akşam sonunda müzik, Semyon ve tatlılar ne oldu?', keywordGroups: [['nişan'], ['katyuşa', 'üç', 'çald'], ['semyon', 'ağlad']] },
  ],
  misleading: [
    { tokens: ['reddetti', 'hayır dedi', 'red cevabı'], noteTr: 'Nina reddetmedi — tam tersine on iki yıldır "evet"i bekliyordu!' },
    { tokens: ['dima evlendi', 'marina teklif', 'marina evlendi'], noteTr: 'Bu bölümde evlilik teklif eden Dima değildi — bu, şef Pyotr ile Nina\'nın hikayesiydi.' },
    { tokens: ['yüzük kayboldu', 'yüzük düştü', 'yüzüğü kaybetti'], noteTr: 'Yüzük kaybolmadı — sadece biraz titredi (Pyotr\'nun elleri yüzünden).' },
  ],
  recycleWords: [
    { ru: 'Кухня', tr: 'Mutfak', from: 'A2 · Ünite 9/11' },
    { ru: 'Свеча', tr: 'Mum', from: 'B1 · Ünite 30' },
    { ru: 'Сюрприз', tr: 'Sürpriz', from: 'B2 · Ünite 50' },
    { ru: 'Кольцо', tr: 'Yüzük', from: 'B2 · Ünite 52' },
    { ru: 'Встать на колени', tr: 'Diz çökmek', from: 'B2 · Ünite 52' },
    { ru: 'Я согласна', tr: 'Evet, kabul ediyorum (kadın)', from: 'B2 · Ünite 52' },
    { ru: 'Помолвка', tr: 'Nişan', from: 'B2 · Ünite 52' },
    { ru: 'Праздник', tr: 'Şölen / kutlama', from: 'A2 · Ünite 18' },
  ],
};

// ---------------------------------------------------------------------------
// BÖLÜM FİNALİ 5 — Ünite 65-82 (C1/C2 SONU) — DİZİ FİNALİ: gerçek hikaye
// Kapılı final: özet %100 + Seviye Tekrar Sınavı geçilmeden "mezuniyet" yok.
// ---------------------------------------------------------------------------
const STORY_LF_C1: CheckpointStory = {
  id: 'story_lf_c1',
  kind: 'levelFinal',
  checkpoint: null,
  unitFrom: 65,
  unitTo: 82,
  levelId: 'C1/C2',
  nextLevelId: 'C1/C2',
  titleRu: 'Настоящая история',
  titleTr: 'Gerçek Hikaye',
  framingTr:
    'VE DİZİ FİNALİ çocuklar: 2035\'te çocukların sabrı tükendi — "Baba, yeter, GERÇEK hikayeyi anlat!" Dima anlatıyor: sarı şemsiyenin asla anlatılmamış devamı; internette viral olan bir gazete yazısı, bir yorum, bir "boşver" ve kafedeki o masanın gizli bağlamı dahil.',
  icon: '☂️',
  color: '#eab308',
  banner: 'scene/yellow-umbrella.jpg',
  searchQuery: 'How I Met Your Mother the yellow umbrella final scene',
  paragraphs: [
    { speaker: 'Дети (2035)', ru: 'Папа! Хватит! Скажи правду: где вы с мамой ВПЕРВЫЕ встретились? Контекст, нюансы — всё!', reading: 'Papá! Khvatít! Skazhí právdu: gdye vy s mámay fpyérvыe vstryétilis\'? Kantékst, nyyánsы — fsyó!', tr: 'Baba! Yeter! Gerçeği söyle: annemle İLK KEZ nerede tanıştınız? Bağlam, nüanslar — hepsi!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Дети стали скептиками. Ну, какими они и должны быть в 2035 году.', reading: 'Dyéti stáli skeptíkami. Nu, kakími oni i dólzhny byt\' f dvé tyísyachi trídtsat pyátom gadú.', tr: 'Çocuklar şüpheci olmuşlar. Eh, 2035\'te olmaları gereken de buydu zaten.' },
    { speaker: 'Dima', ru: 'Хорошо. Правда. Только правда. Слушайте...', reading: 'Kharashó. Právda. Tól\'ka právda. Slúshaytye...', tr: 'Peki. Gerçek. Sadece gerçek. Dinleyin...' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Двенадцать лет назад. Дима потерял жёлтый зонт в кафе «Восток». Это вы знаете.', reading: 'Dvyénadtsat\' lyet nazád. Díma paterYál zhólty zont f kafé «Vastók». Éta vy znáyitye.', tr: 'On iki yıl önce. Dima sarı şemsiyesini "Vostok" kafesinde kaybetti. Bunu biliyorsunuz.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Но вы не знаете, что было ДАЛЬШЕ. Через неделю — статья в интернете. Молодой журналист. Заголовок: «Мужчина и жёлтый зонт: кто он?»', reading: 'No vy nye znáyitye, shto býla DÁL\'she. Chiryés nidyélyu — stat\'yá f intyérnyete. Maladóy zhurnalíst. Zagalóvak: «Muzhchiná i zhólty zont: kto on?»', tr: 'Ama bilmediğiniz şey sonrasında olan. Bir hafta sonra — internette bir yazı. Genç bir gazeteci. Başlık: "Bir adam ve sarı şemsiye: kim bu?"' },
    { speaker: 'Dima (o zaman)', ru: 'Это... это про меня?! Какой кринж!', reading: 'Éta... eta pra minyá?! Kakóy krindzh!', tr: 'Bu... bu benimle ilgili mi?! Ne kadar cringe!' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Статья стала хайпом. Тысячи комментариев: «Рофл! Мужчина потерял зонт — и стал звездой интернета!»', reading: 'Stat\'yá stála kháypam. Tyísyachi kaméntariyev: «Rofl! Muzhchiná paterYál zont — i stal zvyеzdóy intyérnyeta!»', tr: 'Yazı hype oldu. Binlerce yorum: "Rofl! Adam şemsiyesini kaybetti — ve internetin yıldızı oldu!"' },
    { speaker: 'Dima (o zaman)', ru: 'Я написал комментарий: «Это мой зонт. Серьёзно.» Ответ: сорок тысяч лайков и «понял, принял».', reading: 'Ya napisál kaméntariy: «Éta moy zont. Siryózna.» Atvyét: sórak tyésyach láykaf i «panyál, prínyal».', tr: 'Ben bir yorum yazdım: "Bu benim şemsiyem. Ciddiyim." Cevap: kırk bin beğeni ve "anladım, kabul ettim".' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'А потом — один комментарий. От автора статьи: «Спокойствие. Зонт в безопасности. Приходите в субботу, кафе «Восток», в семь. Я его сохраню... для вас.»', reading: 'A patóm — adín kaméntariy. At avtóra stat\'yí: «Spakóystviye. Zont f bezapásnasti. Prikhadítye f subbótu, kafé «Vastók», f syém\. Ya yivó sahranyú... dlya vas.»', tr: 'Ve sonra — tek bir yorum. Yazının yazarından: "Sakin olun. Şemsiye güvende. Cumartesi gelin, \'Vostok\' kafesi, yedide. Onu sizin için... saklayacağım."' },
    { speaker: 'Dima (o zaman)', ru: 'И я подумал: «Забей». Я не пошёл. Я... стеснялся.', reading: 'I ya padúmal: «Zabyéy». Ya nye pashól. Ya... stisnyálsya.', tr: 'Ve ben düşündüm: "Boşver." Gitmedim. Ben... utanıyordum.' },
    { speaker: 'Дети (2035)', ru: 'ПАПА! Ты НЕ ПОШЁЛ?! Это... это зашквар!', reading: 'Papá! Ty NYE PASHÓL?! Éta... eta zashkVAR!', tr: 'BABA! GİTMEDİN Mİ?! Bu... bu rezalet!' },
    { speaker: 'Dima', ru: 'Подождите. Помните кафе? Дождь? «Меня зовут Дима»? Я сел за столик... А теперь — контекст. Тот столик был НЕ СВОБОДЕН. Она ждала. Меня. С зонтом. Под столом.', reading: 'Padazhdítye. Pómnitye kafé? Dózhd\'? «Minyá zavút Díma»? Ya sel za stólik... A tyéper\' — kantékst. Tot stólik býl NYE SVABÓDYEN. Aná zhдалá. Minyá. S zóntam. Pad stalóm.', tr: 'Bekleyin. Kafeyi hatırlıyor musunuz? Yağmur? "Benim adım Dima"? Bir masaya oturdum... Ve şimdi — bağlam. O masa BOŞ DEĞİLDİ. O, bekliyordu. Beni. Şemsiyeyle. Masanın altında.' },
    { speaker: 'Anlatıcı', narrator: true, ru: 'Марина — тот журналист. Она написала статью. Она сохранила зонт. Она сидела за тем столиком и ждала мужчину с жёлтым зонтом.', reading: 'Marína — tot zhurnalíst. Aná napisála stat\'yú. Aná sahranyíla zont. Aná sidyéla za tim stólikam i zhдалá muzhchinú s zhóltym zóntam.', tr: 'Marina — o gazeteci. Yazıyı o yazdı. Şemsiyeyi o sakladı. O masada o oturuyordu ve sarı şemsiyeli adamı bekliyordu.' },
    { speaker: 'Dima', ru: 'Дети, суть проста: я потерял зонт — и нашёл вашу маму. Вот и вся легенда. Верить или нет — решайте сами. Но зонт, кстати, до сих пор у нас дома.', reading: 'Dyéti, sut\' prastá: ya paterYál zont — i nashól váshu mámu. Vot i fsyá lyégenda. Vyerítl ili nyet — risháytye sami. No zont, kstáti, da síkh par u nas dóma.', tr: 'Çocuklar, özü basit: şemsiyeyi kaybettim — ve annenizi buldum. Bütün efsane bu. İnanın ya da inanmayın — karar sizin. Ama şemsiye, bu arada, hâlâ bizim evde.' },
    { speaker: 'Дети (2035)', ru: '...Это имба, пап.', reading: '...Éta ímba, pap.', tr: '...Bu imba baba.' },
  ],
  newWords: [
    { ru: 'Легенда', reading: 'Lyégenda', tr: 'Efsane', note: 'Dişil; Tyoma\'nın hayat felsefesi: легендарно = efsanevi.' },
    { ru: 'Скептик', reading: 'Skeptík', tr: 'Şüpheci', note: 'Eril; her hikayeye "gerçekten mi?" diyen kişi.' },
    { ru: 'Поверить', reading: 'Pavyérit\'', tr: 'İnanmak', note: 'Fiil; верить = inanmak, поверить = (sonunda/tam olarak) inanmak.' },
    { ru: 'Правда', reading: 'Právda', tr: 'Gerçek, hakikat', note: 'Dişil; "сказать правду" = gerçeği söylemek.' },
    { ru: 'Статья', reading: 'Stat\'yá', tr: 'Makale / yazı', note: 'Dişil; internette ve gazetede yayımlanan metin.' },
    { ru: 'Суть', reading: 'Sut\'', tr: 'Öz, asıl mesele', note: 'Dişil; "суть проста" = özü basit. Bir hikayenin kalbi.' },
  ],
  keyPoints: [
    { id: 'lf_c1_k1', textTr: '2035\'te çocuklar gerçek ilk tanışma hikayesini ister (bağlam ve nüanslar dahil); Dima sonunda gerçeği anlatmayı kabul eder.', hintTr: 'Çocuklar babadan ne istedi ve Dima nasıl cevap verdi?', keywordGroups: [['çocuklar', 'gerçek', 'ilk'], ['nüans', 'bağlam', 'sordu', 'istedi']] },
    { id: 'lf_c1_k2', textTr: 'On iki yıl önce Dima sarı şemsiyesini "Vostok" kafesinde kaybetmiştir — çocukların zaten bildiği kısım.', hintTr: 'Dima neyi, nerede kaybetmişti?', keywordGroups: [['şemsiye', 'kaybetti', 'kaybetmiş'], ['kafe', 'vostok', 'on iki']] },
    { id: 'lf_c1_k3', textTr: 'Bir hafta sonra genç bir gazeteci internette "Bir adam ve sarı şemsiye: kim bu?" başlıklı bir yazı yayımlar.', hintTr: 'Yazıyı kim yazdı ve başlığı neydi?', keywordGroups: [['gazeteci', 'yazı', 'makale'], ['başlık', 'sarı', 'şemsiye', 'kim']] },
    { id: 'lf_c1_k4', textTr: 'Yazı viral olur (hype); Dima için çok cringe\'dir ve binlerce "rofl" yorumu gelir.', hintTr: 'Yazı internette ne oldu ve Dima kendini nasıl hissetti?', keywordGroups: [['hype', 'viral', 'yayıldı', 'gündem'], ['cringe', 'rofl', 'alay', 'gülündü']] },
    { id: 'lf_c1_k5', textTr: 'Dima "Bu benim şemsiyem, ciddiyim" yorumunu yazar ve kırk bin beğeni alır.', hintTr: 'Dima yorum olarak ne yazdı ve cevap ne oldu?', keywordGroups: [['yorum', 'şemsiyem', 'benim', 'ciddi'], ['beğeni', 'kırk bin', '40000']] },
    { id: 'lf_c1_k6', textTr: 'Yazının yazarı cevap yazar: şemsiye güvendedir; cumartesi saat yedide kafeye gelip almasını söyler.', hintTr: 'Gazeteci Dima\'ya ne cevap verdi (gün, saat, yer)?', keywordGroups: [['yazar', 'gazeteci', 'cevap'], ['cumartesi', 'yedi', 'kafe', 'gel']] },
    { id: 'lf_c1_k7', textTr: 'Dima utanıp "boşver" der ve gitmez — çocukları buna "rezalet" (зашквар) der.', hintTr: 'Dima neden gitmedi ve çocukları buna ne dedi?', keywordGroups: [['gitmedi', 'utan'], ['boşver', 'rezalet', 'zashkvar']] },
    { id: 'lf_c1_k8', textTr: 'Gizli bağlam açığa çıkar: kafedeki masa boş değildi — Marina (yazının yazarı) şemsiyeyle orada Dima\'yı bekliyordu.', hintTr: 'Kafedeki masanın gizlenen gerçeği neydi?', keywordGroups: [['masa', 'boş değildi'], ['marina', 'gazeteci', 'şemsiye', 'bekliyordu']] },
    { id: 'lf_c1_k9', textTr: 'Dima gerçeği özetler: şemsiyeyi kaybetti ama çocuklarının annesini buldu; şemsiye hâlâ evlerindedir.', hintTr: 'Dima hikayeyi nasıl bağladı ve şemsiye şimdi nerede?', keywordGroups: [['kaybettim', 'şemsiye', 'kaybetti'], ['anne', 'buldum', 'buldu', 'evde', 'hâlä', 'hala']] },
    { id: 'lf_c1_k10', textTr: 'Çocuklar finalde hayranlıklarını "imba" diyerek gösterir.', hintTr: 'Çocuklar sonda ne dedi?', keywordGroups: [['imba', 'baba']] },
  ],
  misleading: [
    { tokens: ['tesadüftü', 'tamamen tesadüf', 'rastgele oturdu'], noteTr: 'Kafedeki karşılaşma tam bir tesadüf değildi — Marina orada Dima\'yı (şemsiyeyi iade etmek için) bilerek bekliyordu.' },
    { tokens: ['şemsiyeyi geri aldı', 'şemsiyeyi iade etti', 'şemsiyesini aldı o gün'], noteTr: 'Dima o gün gitmedi; şemsiye yıllarca Marina\'da kaldı — ve hâlâ Dima ile Marina\'nın evinde.' },
    { tokens: ['yazı gizli kaldı', 'kimse görmedi', 'yazı silindi'], noteTr: 'Yazı gizli kalmadı — tam tersine viral oldu: binlerce yorum ve kırk bin beğeni.' },
  ],
  recycleWords: [
    { ru: 'Зонт', tr: 'Şemsiye', from: 'A1 Finali «Жёлтый зонт»' },
    { ru: 'Кринж', tr: 'Cringe (utanç verici komiklik)', from: 'C1/C2 · Ünite 81' },
    { ru: 'Хайп', tr: 'Hype (gündem/yayılma)', from: 'C1/C2 · Ünite 81' },
    { ru: 'Рофл', tr: 'Rofl (kahkaha)', from: 'C1/C2 · Ünite 81' },
    { ru: 'Зашквар', tr: 'Rezalet, ayıp', from: 'C1/C2 · Ünite 81' },
    { ru: 'Имба', tr: 'İmba (eşsiz şey)', from: 'C1/C2 · Ünite 81' },
    { ru: 'Понял принял', tr: 'Anladım, kabul ettim', from: 'C1/C2 · Ünite 81' },
    { ru: 'Забей', tr: 'Boşver', from: 'C1/C2 · Ünite 65' },
    { ru: 'Контекст', tr: 'Bağlam', from: 'C1/C2 · Ünite 82' },
  ],
};

// ---------------------------------------------------------------------------
// DERLEME — ünite sırasına göre (hem 10'luk kontrol noktaları hem bölüm finalleri)
// ---------------------------------------------------------------------------
export const STORIES: CheckpointStory[] = [
  STORY_LF_A1,   // ünite 6  — A1 BÖLÜM FİNALİ (kapılı) — pilot: sarı şemsiye
  STORY_1,       // ünite 10 — kontrol noktası 1 (HIMYM: kafede tanışma)
  STORY_LF_A2,   // ünite 18 — A2 BÖLÜM FİNALİ (kapılı, Кухня) — yeni garson
  STORY_2,       // ünite 20 — kontrol noktası 2
  STORY_3,       // ünite 30 — kontrol noktası 3
  STORY_4,       // ünite 40 — kontrol noktası 4
  STORY_LF_B1,   // ünite 43 — B1 BÖLÜM FİNALİ (kapılı, crossover)
  STORY_5,       // ünite 50 — kontrol noktası 5
  STORY_6,       // ünite 60 — kontrol noktası 6
  STORY_LF_B2,   // ünite 64 — B2 BÖLÜM FİNALİ (kapılı, Кухня) — şefin teklifi
  STORY_7,       // ünite 70 — kontrol noktası 7
  STORY_8,       // ünite 80 — kontrol noktası 8 (düğün)
  STORY_LF_C1,   // ünite 82 — C1/C2 BÖLÜM FİNALİ (kapılı) — DİZİ FİNALİ
];

/** Toplam hikaye sayısı: 8 kontrol noktası + 5 bölüm finali. */
export const STORY_CHECKPOINT_COUNT = STORIES.length;
