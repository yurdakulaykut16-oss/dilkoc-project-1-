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
];

// ---------------------------------------------------------------------------
// BÖLÜM 1 — Ünite 1-10 (Tanışma, Aile, Kafe, Ulaşım, Sayılar, Hava,
//                   Alışveriş, Telefon, Ev, Randevu/Zaman)
// ---------------------------------------------------------------------------
const STORY_1: CheckpointStory = {
  id: 'story_cp1',
  checkpoint: 1,
  unitFrom: 1,
  unitTo: 10,
  titleRu: 'Как я встретил вашу маму',
  titleTr: 'Annenizle Nasıl Tanıştım',
  framingTr:
    'Yıl 2035. Dima, çocuklarına anneleriyle nasıl tanıştığını anlatmaya devam ediyor — tıpkı eski bir sitcom gibi. Bu bölümde: yağmur, bir kafe ve bir telefon numarası.',
  icon: '🌧️',
  color: '#38bdf8',
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
  checkpoint: 2,
  unitFrom: 11,
  unitTo: 20,
  titleRu: 'Ужин, который почти сгорел',
  titleTr: 'Neredeyse Yanan Akşam Yemeği',
  framingTr:
    'Yıl 2035. Dima anlatmaya devam ediyor: "Annenizle tanıştıktan sonraki ilk grup yemeği... ve neredeyse yanan bir tavuk." Jenya ile Lena\'nın evinde bir akşam yemeği.',
  icon: '🔥',
  color: '#f97316',
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
  checkpoint: 3,
  unitFrom: 21,
  unitTo: 30,
  titleRu: 'Наушник',
  titleTr: 'Kulaklık',
  framingTr:
    'Yıl 2035. Dima: "Yeni işim, ilk gerçek randevum... ve kulağımda bir Tyoma." Bu bölümde: bir iş görüşmesi, bir restoran ve tarihin en kötü kulaklık operasyonu.',
  icon: '🎧',
  color: '#a78bfa',
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
  checkpoint: 4,
  unitFrom: 31,
  unitTo: 40,
  titleRu: 'Обычный вторник',
  titleTr: 'Sıradan Bir Salı',
  framingTr:
    'Yıl 2035. Dima: "Aşk, çocuklar, sadece bayramlarda değil — sıradan bir salıdadır." İşte Dima ve Marina\'nın bir günü: alarm, sinema, sızan bir musluk ve gece yarısı komşusu.',
  icon: '☕',
  color: '#10b981',
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
  checkpoint: 5,
  unitFrom: 41,
  unitTo: 50,
  titleRu: 'Красный конверт',
  titleTr: 'Kırmızı Zarf',
  framingTr:
    'Yıl 2035. Dima: "Her büyük aşkın bir kıskançlık bölümü vardır. Bizimki kırmızı bir zarfla başladı." Bu bölümde: bir Sevgililer Günü kartı, gözyaşları ve bir içini dökme gecesi.',
  icon: '💌',
  color: '#f43f5e',
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
  checkpoint: 6,
  unitFrom: 51,
  unitTo: 60,
  titleRu: 'Вечер с миллионом проблем',
  titleTr: 'Bir Milyon Sorunlu Akşam',
  framingTr:
    'Yıl 2035. Dima: "Evet çocuklar, o akşam... bir terfi, çizik bir araba ve çorabın içinde bir yüzük. Nasıl evlendiğimin tam hikayesi."',
  icon: '💍',
  color: '#d946ef',
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
  checkpoint: 7,
  unitFrom: 61,
  unitTo: 70,
  titleRu: 'Последний холостяк',
  titleTr: 'Son Bekâr',
  framingTr:
    'Yıl 2035. Dima: "Ve şimdi... Tyoma\'nın bölümü. Evet çocuklar: Tyoma\'nın da bir kalbi vardı." Bir tanışma uygulaması, ironi seven bir kadın ve son bekârın teslimiyeti.',
  icon: '💙',
  color: '#3b82f6',
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
  checkpoint: 8,
  unitFrom: 71,
  unitTo: 80,
  titleRu: 'Свадьба',
  titleTr: 'Düğün',
  framingTr:
    'Yıl 2035. Dima: "Ve son bölüm çocuklar: düğün. Pastayı buzdolabında saklayan bir gelin, ağlayan bir fotoğrafçı, müzik kavgası ve masanın altından çıkan bir sağdıç."',
  icon: '🥂',
  color: '#f59e0b',
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
// DERLEME
// ---------------------------------------------------------------------------
export const STORIES: CheckpointStory[] = [
  STORY_1,
  STORY_2,
  STORY_3,
  STORY_4,
  STORY_5,
  STORY_6,
  STORY_7,
  STORY_8,
];

/** Toplam kontrol noktası sayısı (82 ünite → 8 tam nokta + artan üniteler). */
export const STORY_CHECKPOINT_COUNT = STORIES.length;
