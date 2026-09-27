// ==========================================================
// EK MÜFREDAT — TANIŞMA & İLK ADIM PAKETİ
// B1: Ünite 73-75 (sokak, kafe/kitapçı, spor salonu/park)
// B2: Ünite 111-113 (bar, kulüp/parti, uçak/tren)
// Gerçek hayatta birine yaklaşıp sohbet başlatmanın Rusçası:
// doğal açılış cümleleri, kibar ısrar/geri çekilme ve numara isteme.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_FLIRT_B1: UnitModule[] = [
  {
    id: 'mod_b1_p1',
    unitNumber: 73,
    levelGroup: 'B1',
    title: 'Sokakta Tanışma & İlk Adım',
    description: '"Девушка!" diye seslenmekten numara almaya: sokak tanışması',
    category: 'İlişkiler & Flört',
    color: '#ec4899',
    icon: '🚶',
    grammarExplain: `📌 SOKAKTA YAKLAŞMA DİLİ:
1. Rusçada yabancı birine seslenme kalıpları: "Девушка!" (genç kadına), "Молодой человек!" (genç erkeğe) — isim bilmeden hitap etmenin kibar yoludur.
2. Altın açılış: "Извините за беспокойство..." (Rahatsız ettiğim için özür dilerim...) + "Можно с вами познакомиться?" (Sizinle tanışabilir miyim?).
3. "Подойти к + yönelme hâli" (birine yaklaşmak): "Я решил подойти к вам" (Size yaklaşmaya karar verdim) — cesaretin fiilidir.`,
    words: [
      { id: 'wp73_1', ru: 'Подойти', reading: 'Padaytí', tr: 'Yaklaşmak / Yanına gitmek', level: 'B1', usageNote: '"Подойти первым" (ilk adımı atmak) cesaret ister.' },
      { id: 'wp73_2', ru: 'Девушка!', reading: 'Dyévuşka!', tr: 'Hanımefendi! (genç)', level: 'B1', usageNote: 'Genç kadına isimsiz hitabın standart yoludur, kaba değildir.' },
      { id: 'wp73_3', ru: 'Молодой человек!', reading: 'Maladóy çilavyék!', tr: 'Beyefendi! (genç)', level: 'B1', usageNote: 'Genç erkeğe seslenme kalıbıdır.' },
      { id: 'wp73_4', ru: 'Можно с вами познакомиться?', reading: 'Mójna s vámi paznakómitsa?', tr: 'Sizinle tanışabilir miyim?', level: 'B1', usageNote: 'Sokak tanışmasının klasik açılışıdır.' },
      { id: 'wp73_5', ru: 'Извините за беспокойство', reading: 'İzviníte za bispakóystva', tr: 'Rahatsızlık için özür dilerim', level: 'B1', usageNote: 'Yaklaşmayı yumuşatan sihirli giriştir.' },
      { id: 'wp73_6', ru: 'Смелость', reading: 'Smyélast\'', tr: 'Cesaret', level: 'B1', usageNote: '"Взять смелость" (cesaretini toplamak) denir.' },
      { id: 'wp73_7', ru: 'Улыбка', reading: 'Ulýpka', tr: 'Gülümseme', level: 'B1', usageNote: '"У вас красивая улыбка" (Gülüşünüz çok güzel) — nazik kompliman.' },
      { id: 'wp73_8', ru: 'Обменяться номерами', reading: 'Abminyátsa namirámi', tr: 'Numara alışverişi yapmak', level: 'B1', usageNote: 'Tanışmanın hedef cümlesidir.' },
      { id: 'wp73_9', ru: 'Я спешу', reading: 'Ya spişú', tr: 'Acelem var', level: 'B1', usageNote: 'Kibar geri çevirme: "Извините, я спешу".' },
      { id: 'wp73_10', ru: 'Куда вы идёте?', reading: 'Kudá vy idyóte?', tr: 'Nereye gidiyorsunuz?', level: 'B1', usageNote: 'Sohbeti yürüyüşe çevirme sorusudur: "Можно вас проводить?"' },
      { id: 'wp73_11', ru: 'Проводить', reading: 'Pravadít\'', tr: 'Eşlik etmek / Yolcu etmek', level: 'B1', usageNote: '"Можно вас проводить?" (Size eşlik edebilir miyim?).' },
      { id: 'wp73_12', ru: 'Судьба', reading: 'Sud\'bá', tr: 'Kader / Kısmet', level: 'B1', usageNote: '"Это судьба!" (Bu kader!) — romantik abartının klasiği.' }
    ],
    sentences: [
      { ru: 'Извините, можно с вами познакомиться?', tr: 'Affedersiniz, sizinle tanışabilir miyim?', scrambled: ['можно', 'Извините,', 'познакомиться?', 'с вами'], correct: ['Извините,', 'можно', 'с вами', 'познакомиться?'] },
      { ru: 'У вас очень красивая улыбка.', tr: 'Çok güzel bir gülüşünüz var.', scrambled: ['красивая', 'У вас', 'улыбка.', 'очень'], correct: ['У вас', 'очень', 'красивая', 'улыбка.'] }
    ],
    sceneTitle: 'Arbat Caddesinde Üç Saniyelik Karar',
    sceneContext: 'Dima\'nın arkadaşı Marat, kitapçıdan çıkan bir kızı görür; "üç saniye kuralı"yla yaklaşıp tanışmayı dener.',
    dialogue: [
      { speaker: 'Marat', ru: 'Девушка! Извините за беспокойство...', reading: 'Dyévuşka! İzviníte za bispakóystva...', tr: 'Pardon hanımefendi! Rahatsız ettiğim için özür dilerim...' },
      { speaker: 'Alina', ru: 'Да? Я вас слушаю.', reading: 'Da? Ya vas slúşayu.', tr: 'Evet? Sizi dinliyorum.' },
      { speaker: 'Marat', ru: 'Я просто не мог пройти мимо. Можно с вами познакомиться? Я Марат.', reading: 'Ya prósta ni mok praytí míma. Mójna s vámi paznakómitsa? Ya Marát.', tr: 'Öylece geçip gidemedim. Sizinle tanışabilir miyim? Ben Marat.' },
      { speaker: 'Alina', ru: 'Смело! Я Алина. Я спешу, но... давайте обменяемся номерами.', reading: 'Smyéla! Ya Alína. Ya spişú, no... daváyte abminyáimsa namirámi.', tr: 'Cesurca! Ben Alina. Acelem var ama... numara alışverişi yapalım.' }
    ]
  },
  {
    id: 'mod_b1_p2',
    unitNumber: 74,
    levelGroup: 'B1',
    title: 'Kafede & Kitapçıda Sohbet Açma',
    description: '"Burası boş mu?" bahanesiyle başlayan sohbetin incelikleri',
    category: 'İlişkiler & Flört',
    color: '#d946ef',
    icon: '📚',
    grammarExplain: `📌 MEKANDA SOHBET AÇMA DİLİ:
1. Efsanevi açılış: "Здесь свободно?" (Burası boş mu?) — masa/koltuk sorusu gibi görünür, sohbet kapısı açar.
2. Ortam üzerinden soru sorma: "Что вы читаете, если не секрет?" (Sır değilse ne okuyorsunuz?) — "если не секрет" nezaket sosudur.
3. "Разговориться" (sohbete dalmak, koyulaşmak): "Мы разговорились и не заметили время" (Sohbete daldık, zamanı fark etmedik).`,
    words: [
      { id: 'wp74_1', ru: 'Здесь свободно?', reading: 'Zdyes\' svabódna?', tr: 'Burası boş mu?', level: 'B1', usageNote: 'Kafe tanışmasının bir numaralı açılışıdır.' },
      { id: 'wp74_2', ru: 'Что вы читаете?', reading: 'Şto vy çitáite?', tr: 'Ne okuyorsunuz?', level: 'B1', usageNote: 'Kitapçı ve kafede doğal sohbet başlatıcıdır.' },
      { id: 'wp74_3', ru: 'Если не секрет', reading: 'Yésli ni sikryét', tr: 'Sır değilse', level: 'B1', usageNote: 'Soruyu kibarlaştıran ekdir.' },
      { id: 'wp74_4', ru: 'Любимый автор', reading: 'Lyubímıy áftar', tr: 'En sevdiği yazar', level: 'B1', usageNote: '"Кто ваш любимый автор?" edebi flörtün sorusudur.' },
      { id: 'wp74_5', ru: 'Случайно', reading: 'Sluçáyna', tr: 'Tesadüfen', level: 'B1', usageNote: '"Мы случайно встретились" (Tesadüfen karşılaştık).' },
      { id: 'wp74_6', ru: 'Посоветовать', reading: 'Pasavyétavat\'', tr: 'Tavsiye etmek', level: 'B1', usageNote: '"Что посоветуете?" (Ne önerirsiniz?) sohbeti uzatır.' },
      { id: 'wp74_7', ru: 'Столик у окна', reading: 'Stólik u akná', tr: 'Cam kenarı masa', level: 'B1', usageNote: 'Kafe romantizminin klasik mekânıdır.' },
      { id: 'wp74_8', ru: 'Угостить кофе', reading: 'Ugastít\' kófe', tr: 'Kahve ısmarlamak', level: 'B1', usageNote: '"Можно угостить вас кофе?" (Size kahve ısmarlayabilir miyim?).' },
      { id: 'wp74_9', ru: 'Разговориться', reading: 'Razgavarítsa', tr: 'Sohbete dalmak', level: 'B1', usageNote: 'Sohbetin kendiliğinden koyulaşmasıdır.' },
      { id: 'wp74_10', ru: 'Совпадение', reading: 'Safpadyéniye', tr: 'Tesadüf / Denk gelme', level: 'B1', usageNote: '"Какое совпадение!" (Ne tesadüf!) — ortak zevk keşfedilince.' },
      { id: 'wp74_11', ru: 'Обожать', reading: 'Abajáit\'', tr: 'Bayılmak / Çok sevmek', level: 'B1', usageNote: '"Я обожаю эту книгу!" (Bu kitaba bayılıyorum!).' },
      { id: 'wp74_12', ru: 'Продолжить разговор', reading: 'Pradóljit\' razgavór', tr: 'Sohbete devam etmek', level: 'B1', usageNote: '"Продолжим за кофе?" (Kahve eşliğinde devam edelim mi?).' }
    ],
    sentences: [
      { ru: 'Здесь свободно? — Да, садитесь.', tr: 'Burası boş mu? — Evet, oturun.', scrambled: ['— Да,', 'Здесь', 'садитесь.', 'свободно?'], correct: ['Здесь', 'свободно?', '— Да,', 'садитесь.'] },
      { ru: 'Что вы читаете, если не секрет?', tr: 'Sır değilse, ne okuyorsunuz?', scrambled: ['если', 'Что вы', 'не секрет?', 'читаете,'], correct: ['Что вы', 'читаете,', 'если', 'не секрет?'] }
    ],
    sceneTitle: 'Kitapçı Kafesinde Aynı Kitap',
    sceneContext: 'Kitapçının kafesinde tek boş sandalye kalmıştır; aynı romanı okuyan iki kişi arasında "ne tesadüf!" sohbeti başlar.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Извините, здесь свободно?', reading: 'İzviníte, zdyes\' svabódna?', tr: 'Affedersiniz, burası boş mu?' },
      { speaker: 'Vera', ru: 'Да, садитесь, пожалуйста.', reading: 'Da, sadítes\', pazhálusta.', tr: 'Evet, oturun lütfen.' },
      { speaker: 'Lyosha', ru: 'О! Вы читаете Булгакова? Я обожаю эту книгу!', reading: 'O! Vy çitáite Bulgákava? Ya abajáyu étu knígu!', tr: 'Oo! Bulgakov mu okuyorsunuz? Bu kitaba bayılırım!' },
      { speaker: 'Vera', ru: 'Какое совпадение! Тогда... можно угостить вас кофе и продолжить разговор?', reading: 'Kakóye safpadyéniye! Tagdá... mójna ugastít\' vas kófe i pradóljit\' razgavór?', tr: 'Ne tesadüf! O zaman... size kahve ısmarlayıp sohbete devam edebilir miyim?' }
    ]
  },
  {
    id: 'mod_b1_p3',
    unitNumber: 75,
    levelGroup: 'B1',
    title: 'Spor Salonunda & Parkta Tanışma',
    description: 'Yardım teklifi, ortak antrenman ve sabah koşusu daveti',
    category: 'İlişkiler & Flört',
    color: '#84cc16',
    icon: '🏃',
    grammarExplain: `📌 SPORTİF TANIŞMA DİLİ:
1. Yardım üzerinden yaklaşma: "Вам подсказать?" (Göstereyim mi? / İpucu vereyim mi?) — spor salonunun doğal açılışıdır.
2. "Вы часто здесь бываете?" (Buraya sık gelir misiniz?) — klasik ama işleyen soru; "бывать" (ara ara bulunmak) fiiline dikkat.
3. Ortak plan teklifi "давай(те) + gelecek": "Давайте побегаем вместе!" (Birlikte koşalım!) — spor arkadaşlığından fazlasının kapısı.`,
    words: [
      { id: 'wp75_1', ru: 'Тренажёр', reading: 'Trinajór', tr: 'Spor aleti', level: 'B1', usageNote: '"Этот тренажёр свободен?" (Bu alet boş mu?) ile sohbet açılır.' },
      { id: 'wp75_2', ru: 'Подсказать', reading: 'Patskazát\'', tr: 'Göstermek / Yol göstermek', level: 'B1', usageNote: '"Вам подсказать технику?" nazik yardım teklifidir.' },
      { id: 'wp75_3', ru: 'Техника', reading: 'Tyéhnika', tr: 'Teknik (hareket)', level: 'B1', usageNote: '"У вас отличная техника!" sportif komplimandır.' },
      { id: 'wp75_4', ru: 'Пробежка', reading: 'Prabyéjka', tr: 'Koşu (hafif)', level: 'B1', usageNote: '"Утренняя пробежка" (sabah koşusu) buluşma bahanesidir.' },
      { id: 'wp75_5', ru: 'Вы часто здесь бываете?', reading: 'Vy çásta zdyes\' bıváite?', tr: 'Buraya sık gelir misiniz?', level: 'B1', usageNote: 'Klasik tanışma sorusu — gülümseyerek sorulur!' },
      { id: 'wp75_6', ru: 'Тренироваться вместе', reading: 'Triniravátsa vmyéste', tr: 'Birlikte antrenman yapmak', level: 'B1', usageNote: 'Devamlı görüşmenin sportif kılıfıdır.' },
      { id: 'wp75_7', ru: 'Скамейка', reading: 'Skamyéyka', tr: 'Bank', level: 'B1', usageNote: 'Park tanışmasının sahnesidir.' },
      { id: 'wp75_8', ru: 'Выгуливать собаку', reading: 'Vıgúlivat\' sabáku', tr: 'Köpek gezdirmek', level: 'B1', usageNote: 'Köpekler park tanışmalarının bir numaralı aracısıdır!' },
      { id: 'wp75_9', ru: 'Разминка', reading: 'Razmínka', tr: 'Isınma', level: 'B1', usageNote: '"Сделаем разминку вместе?" (Birlikte ısınalım mı?).' },
      { id: 'wp75_10', ru: 'Форма', reading: 'Fórma', tr: 'Form / Kondisyon', level: 'B1', usageNote: '"Вы в отличной форме!" (Formunuz harika!) — dikkatli kullanın!' },
      { id: 'wp75_11', ru: 'Бутылка воды', reading: 'Butýlka vadý', tr: 'Su şişesi', level: 'B1', usageNote: 'Su uzatmak eski ama etkili bir jesttir.' },
      { id: 'wp75_12', ru: 'Заниматься спортом', reading: 'Zanimátsa spórtam', tr: 'Spor yapmak', level: 'B1', usageNote: '"Давно занимаетесь?" (Ne zamandır spor yapıyorsunuz?).' }
    ],
    sentences: [
      { ru: 'Вы часто здесь тренируетесь?', tr: 'Burada sık antrenman yapıyor musunuz?', scrambled: ['здесь', 'Вы часто', 'тренируетесь?'], correct: ['Вы часто', 'здесь', 'тренируетесь?'] },
      { ru: 'Может, побегаем вместе завтра?', tr: 'Belki yarın birlikte koşarız?', scrambled: ['вместе', 'Может,', 'завтра?', 'побегаем'], correct: ['Может,', 'побегаем', 'вместе', 'завтра?'] }
    ],
    sceneTitle: 'Parkta Köpeğin Ayarladığı Tanışma',
    sceneContext: 'Marat sabah koşusundayken bir golden retriever topunu ona getirir; köpeğin sahibiyle sohbet kaçınılmazdır.',
    dialogue: [
      { speaker: 'Marat', ru: 'Ой! Кажется, ваша собака хочет побегать со мной.', reading: 'Oy! Kájetsa, váşa sabáka hóçit pabyégat\' sa mnoy.', tr: 'Ay! Galiba köpeğiniz benimle koşmak istiyor.' },
      { speaker: 'Alina', ru: 'Рекс! Извините! Он выбирает только хороших людей.', reading: 'Reks! İzviníte! On vıbiráit tól\'ka haróşıh lyudyéy.', tr: 'Reks! Kusura bakmayın! O sadece iyi insanları seçer.' },
      { speaker: 'Marat', ru: 'Значит, мне повезло. Вы часто здесь бываете по утрам?', reading: 'Znáçit, mnye pavizló. Vy çásta zdyes\' bıváite pa utrám?', tr: 'Demek şanslıyım. Sabahları buraya sık gelir misiniz?' },
      { speaker: 'Alina', ru: 'Каждый день. Может, завтра побегаем вместе — втроём?', reading: 'Kájdıy dyen\'. Mójıt, záftra pabyégaim vmyéste — ftrayóm?', tr: 'Her gün. Belki yarın birlikte koşarız — üçümüz?' }
    ]
  }
];

export const EXTRA_FLIRT_B2: UnitModule[] = [
  {
    id: 'mod_b2_p1',
    unitNumber: 111,
    levelGroup: 'B2',
    title: 'Barda Tanışma & İçki Ismarlama',
    description: '"Sizi bir şeyle ağırlayabilir miyim?" — bar sohbetinin kuralları',
    category: 'İlişkiler & Flört',
    color: '#f59e0b',
    icon: '🍸',
    grammarExplain: `📌 BAR TANIŞMASI DİLİ:
1. Ismarlamanın kibar formülü: "Можно вас угостить?" (Size ısmarlayabilir miyim?) — "угостить" (ikram etmek) fiili zarafet katar.
2. Kadeh kaldırma kalıbı "За + ismin -i hâli": "За знакомство!" (Tanışmamıza!), "За этот вечер!" (Bu akşama!).
3. Kibar ret ve kabulü tanıyın: "Спасибо, я сама" (Teşekkürler, ben kendim alırım) = nazik ret; "Почему бы и нет?" (Neden olmasın?) = yeşil ışık.`,
    words: [
      { id: 'wp111_1', ru: 'Можно вас угостить?', reading: 'Mójna vas ugastít\'?', tr: 'Size ısmarlayabilir miyim?', level: 'B2', usageNote: 'Bar tanışmasının zarif açılışıdır.' },
      { id: 'wp111_2', ru: 'Коктейль', reading: 'Kaktéyl\'', tr: 'Kokteyl', level: 'B2', usageNote: '"Какой коктейль вам нравится?" sohbeti sürdürür.' },
      { id: 'wp111_3', ru: 'За знакомство!', reading: 'Za znakómstva!', tr: 'Tanışmamıza!', level: 'B2', usageNote: 'İlk ortak kadehin klasik tostudur.' },
      { id: 'wp111_4', ru: 'Барная стойка', reading: 'Bárnaya stóyka', tr: 'Bar tezgâhı', level: 'B2', usageNote: '"У барной стойки" (bar tezgâhında) tanışılır.' },
      { id: 'wp111_5', ru: 'Флиртовать', reading: 'Flirtavát\'', tr: 'Flört etmek', level: 'B2', usageNote: '"Ты флиртуешь со мной?" (Benimle flört mü ediyorsun?).' },
      { id: 'wp111_6', ru: 'Вежливо отказать', reading: 'Vyéjliva atkazát\'', tr: 'Kibarca reddetmek', level: 'B2', usageNote: 'Reddedilirse zarifçe geri çekilmek olgunluktur.' },
      { id: 'wp111_7', ru: 'Почему бы и нет?', reading: 'Paçimú by i nyet?', tr: 'Neden olmasın?', level: 'B2', usageNote: 'Flörtöz kabulün altın cümlesidir.' },
      { id: 'wp111_8', ru: 'Атмосфера', reading: 'Atmasfyéra', tr: 'Atmosfer / Hava', level: 'B2', usageNote: '"Здесь приятная атмосфера" sohbet yumuşatıcısıdır.' },
      { id: 'wp111_9', ru: 'Заигрывать', reading: 'Zaígrıvat\'', tr: 'Kur yapmak / Yazmaya çalışmak', level: 'B2', usageNote: 'Hafif alaycı tonu vardır: "Он заигрывает с барменшей".' },
      { id: 'wp111_10', ru: 'Намёк', reading: 'Namyók', tr: 'İma', level: 'B2', usageNote: '"Понять намёк" (imayı anlamak) flörtün yarısıdır.' },
      { id: 'wp111_11', ru: 'Я сама закажу', reading: 'Ya samá zakajú', tr: 'Ben kendim söylerim', level: 'B2', usageNote: 'Nazik ama net bir mesafedir — saygıyla karşılanır.' },
      { id: 'wp111_12', ru: 'Весь вечер здесь?', reading: 'Vyes\' vyéçir zdyes\'?', tr: 'Bütün akşam burada mısınız?', level: 'B2', usageNote: 'Sohbeti uzatma niyetinin kibar sorusudur.' }
    ],
    sentences: [
      { ru: 'Можно угостить вас коктейлем?', tr: 'Size bir kokteyl ısmarlayabilir miyim?', scrambled: ['вас', 'Можно', 'коктейлем?', 'угостить'], correct: ['Можно', 'угостить', 'вас', 'коктейлем?'] },
      { ru: 'За приятное знакомство!', tr: 'Güzel tanışmamıza!', scrambled: ['знакомство!', 'За', 'приятное'], correct: ['За', 'приятное', 'знакомство!'] }
    ],
    sceneTitle: 'Bar Tezgâhında İki Bardaklık Sohbet',
    sceneContext: 'Canlı müzik gecesinde Marat bar tezgâhında yalnız oturan Alina\'yı görür; ısmarlama teklifi zarif bir dansa dönüşür.',
    dialogue: [
      { speaker: 'Marat', ru: 'Здесь отличная атмосфера, правда? Можно вас угостить?', reading: 'Zdyes\' atlíçnaya atmasfyéra, právda? Mójna vas ugastít\'?', tr: 'Buranın havası harika, değil mi? Size bir şey ısmarlayabilir miyim?' },
      { speaker: 'Alina', ru: 'Хм... Почему бы и нет? Один коктейль.', reading: 'Hm... Paçimú by i nyet? Adín kaktéyl\'.', tr: 'Hmm... Neden olmasın? Bir kokteyl.' },
      { speaker: 'Marat', ru: 'Отлично! За знакомство! Вы весь вечер здесь?', reading: 'Atlíçna! Za znakómstva! Vy vyes\' vyéçir zdyes\'?', tr: 'Harika! Tanışmamıza! Bütün akşam burada mısınız?' },
      { speaker: 'Alina', ru: 'Теперь, кажется, да. Вы умеете понимать намёки?', reading: 'Tipyér\', kájetsa, da. Vy umyéite panimát\' namyóki?', tr: 'Artık galiba evet. İmalardan anlar mısınız?' }
    ]
  },
  {
    id: 'mod_b2_p2',
    unitNumber: 112,
    levelGroup: 'B2',
    title: 'Kulüpte & Partide: Dans Pisti Diplomasisi',
    description: '"Dans edelim mi?"den numara istemeye: gürültüde iletişim',
    category: 'İlişkiler & Flört',
    color: '#a855f7',
    icon: '💃',
    grammarExplain: `📌 KULÜP & PARTİ DİLİ:
1. Dans teklifi tek kelimeyle: "Потанцуем?" (Dans edelim mi?) — "мы" formundaki gelecek zaman teklif anlamı taşır.
2. Gürültü stratejisi: "Здесь громко, отойдём поговорить?" (Burası gürültülü, kenara çekilip konuşalım mı?) — sohbeti derinleştirme hamlesidir.
3. Kapanış cümlesi: "Оставишь свой номер?" (Numaranı bırakır mısın?) — samimi "ты" formuna gece boyu doğal geçilir.`,
    words: [
      { id: 'wp112_1', ru: 'Потанцуем?', reading: 'Patantsúyem?', tr: 'Dans edelim mi?', level: 'B2', usageNote: 'Pistin bir kelimelik davetiyesidir.' },
      { id: 'wp112_2', ru: 'Громкая музыка', reading: 'Grómkaya múzıka', tr: 'Yüksek sesli müzik', level: 'B2', usageNote: '"Из-за громкой музыки ничего не слышно!"' },
      { id: 'wp112_3', ru: 'Перекричать', reading: 'Pirikriçát\'', tr: 'Bağırarak duyurmak', level: 'B2', usageNote: '"Перекричать музыку" (müziği bastırmak) imkânsız görevdir.' },
      { id: 'wp112_4', ru: 'Отойдём поговорить?', reading: 'Ataydyóm pagavarít\'?', tr: 'Kenara çekilip konuşalım mı?', level: 'B2', usageNote: 'Gürültüden kaçış + yakınlaşma hamlesidir.' },
      { id: 'wp112_5', ru: 'Танцпол', reading: 'Tantspol', tr: 'Dans pisti', level: 'B2', usageNote: '"На танцполе" (piste) buluşulur.' },
      { id: 'wp112_6', ru: 'Зажигать', reading: 'Zajıgát\'', tr: 'Coşmak / Ortamı yakmak', level: 'B2', usageNote: 'Argo: "Ты сегодня зажигаешь!" (Bu gece coşmuşsun!).' },
      { id: 'wp112_7', ru: 'Стесняться', reading: 'Stisnyátsa', tr: 'Çekinmek', level: 'B2', usageNote: '"Не стесняйся, пойдём!" (Çekinme, hadi!).' },
      { id: 'wp112_8', ru: 'Оставишь свой номер?', reading: 'Astáviş svoy nómir?', tr: 'Numaranı bırakır mısın?', level: 'B2', usageNote: 'Gecenin kapanış sorusudur.' },
      { id: 'wp112_9', ru: 'Проводить домой', reading: 'Pravadít\' damóy', tr: 'Eve bırakmak / Yolcu etmek', level: 'B2', usageNote: '"Можно тебя проводить?" (Seni bırakabilir miyim?).' },
      { id: 'wp112_10', ru: 'Вайб', reading: 'Vayb', tr: 'Vibe / Enerji', level: 'B2', usageNote: 'Gençlik argosu: "У тебя классный вайб!"' },
      { id: 'wp112_11', ru: 'Диджей', reading: 'Didjéy', tr: 'DJ', level: 'B2', usageNote: '"Диджей сегодня огонь!" (DJ bu gece ateş!).' },
      { id: 'wp112_12', ru: 'Свежий воздух', reading: 'Svyéjıy vózduh', tr: 'Temiz hava', level: 'B2', usageNote: '"Выйдем на свежий воздух?" (Temiz havaya çıkalım mı?).' }
    ],
    sentences: [
      { ru: 'Потанцуем? — С удовольствием!', tr: 'Dans edelim mi? — Memnuniyetle!', scrambled: ['— С удовольствием!', 'Потанцуем?'], correct: ['Потанцуем?', '— С удовольствием!'] },
      { ru: 'Здесь громко, отойдём поговорить?', tr: 'Burası gürültülü, kenara çekilip konuşalım mı?', scrambled: ['отойдём', 'Здесь', 'поговорить?', 'громко,'], correct: ['Здесь', 'громко,', 'отойдём', 'поговорить?'] }
    ],
    sceneTitle: 'Bas Sesinin Bastıramadığı Soru',
    sceneContext: 'Doğum günü partisinde Lyosha, dans pistinde enerjisiyle parlayan Vera\'ya dans teklif eder; numara bahçede istenir.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Привет! Классный вайб! Потанцуем?', reading: 'Privét! Klássnıy vayb! Patantsúyem?', tr: 'Selam! Enerjin harika! Dans edelim mi?' },
      { speaker: 'Vera', ru: 'С удовольствием! Только диджей сегодня — огонь!', reading: 'S udavól\'stviyem! Tól\'ka didjéy sivódnya — agón\'!', tr: 'Memnuniyetle! Ama DJ bu gece ateş gibi!' },
      { speaker: 'Lyosha', ru: 'Здесь очень громко! Выйдем на свежий воздух?', reading: 'Zdyes\' óçin\' grómka! Výydim na svyéjıy vózduh?', tr: 'Burası çok gürültülü! Temiz havaya çıkalım mı?' },
      { speaker: 'Vera', ru: 'Пойдём. И да... я оставлю тебе свой номер.', reading: 'Paydyóm. I da... ya astávlyu tibyé svoy nómir.', tr: 'Gidelim. Ve evet... sana numaramı bırakacağım.' }
    ]
  },
  {
    id: 'mod_b2_p3',
    unitNumber: 113,
    levelGroup: 'B2',
    title: 'Uçakta & Trende Yol Sohbeti',
    description: 'Koltuk komşusuyla sohbet: "Nereye uçuyorsunuz?" sanatı',
    category: 'İlişkiler & Flört',
    color: '#06b6d4',
    icon: '✈️',
    grammarExplain: `📌 YOL SOHBETİ DİLİ:
1. Açılış sorusu: "Куда летите, если не секрет?" (Sır değilse nereye uçuyorsunuz?) — yol arkadaşlığının kapısı.
2. "Попутчик/попутчица" (yol arkadaşı) kelimesi sıcaklık taşır: "Приятный попутчик — половина дороги" (İyi yol arkadaşı yolun yarısıdır) sözü meşhurdur.
3. İniş kapanışı: "Давайте продолжим разговор на земле" (Sohbete yerde devam edelim) — havada başlayan tanışmanın zarif finali.`,
    words: [
      { id: 'wp113_1', ru: 'Место у окна', reading: 'Myésta u akná', tr: 'Cam kenarı koltuk', level: 'B2', usageNote: '"Моё место у окна" — tanışmanın ilk cümlesi olabilir.' },
      { id: 'wp113_2', ru: 'Попутчик', reading: 'Papútçik', tr: 'Yol arkadaşı', level: 'B2', usageNote: 'Kadını "попутчица"dır.' },
      { id: 'wp113_3', ru: 'Куда летите?', reading: 'Kudá litíte?', tr: 'Nereye uçuyorsunuz?', level: 'B2', usageNote: 'Uçak sohbetinin standart açılışıdır.' },
      { id: 'wp113_4', ru: 'Командировка', reading: 'Kamandiróvka', tr: 'İş seyahati', level: 'B2', usageNote: '"Я в командировку" (İş seyahatine gidiyorum).' },
      { id: 'wp113_5', ru: 'В отпуск', reading: 'V ótpusk', tr: 'Tatile', level: 'B2', usageNote: '"Лечу в отпуск!" (Tatile uçuyorum!) mutluluğun cümlesidir.' },
      { id: 'wp113_6', ru: 'Бортпроводник', reading: 'Bortpravadník', tr: 'Kabin görevlisi', level: 'B2', usageNote: 'Kadın görevli "стюардесса" olarak da bilinir.' },
      { id: 'wp113_7', ru: 'Турбулентность', reading: 'Turbulyéntnast\'', tr: 'Türbülans', level: 'B2', usageNote: '"Не бойтесь, это просто турбулентность" — kahramanlık anı!' },
      { id: 'wp113_8', ru: 'Обменяться контактами', reading: 'Abminyátsa kantáktami', tr: 'İletişim bilgisi alışverişi', level: 'B2', usageNote: 'İnişten önceki kritik hamledir.' },
      { id: 'wp113_9', ru: 'Приземлиться', reading: 'Prizimlítsa', tr: 'İniş yapmak', level: 'B2', usageNote: '"Мы приземлились" (İndik) — sohbetin deadline\'ı!' },
      { id: 'wp113_10', ru: 'Продолжить на земле', reading: 'Pradóljit\' na zimlyé', tr: 'Yerde devam etmek', level: 'B2', usageNote: 'Uçak flörtünün zarif kapanış teklifi.' },
      { id: 'wp113_11', ru: 'Верхняя полка', reading: 'Vyérhnyaya pólka', tr: 'Üst raf / Üst ranza', level: 'B2', usageNote: 'Valiz kaldırma yardımı tanışma klasiğidir; trende üst ranzadır.' },
      { id: 'wp113_12', ru: 'Какое совпадение!', reading: 'Kakóye safpadyéniye!', tr: 'Ne tesadüf!', level: 'B2', usageNote: 'Aynı şehre gidildiği öğrenilince söylenir.' }
    ],
    sentences: [
      { ru: 'Куда летите, если не секрет?', tr: 'Sır değilse nereye uçuyorsunuz?', scrambled: ['если', 'Куда', 'не секрет?', 'летите,'], correct: ['Куда', 'летите,', 'если', 'не секрет?'] },
      { ru: 'Давайте продолжим разговор на земле.', tr: 'Sohbete yerde devam edelim.', scrambled: ['разговор', 'Давайте', 'на земле.', 'продолжим'], correct: ['Давайте', 'продолжим', 'разговор', 'на земле.'] }
    ],
    sceneTitle: '10 Bin Metrede Başlayan Hikâye',
    sceneContext: 'Moskova-İstanbul uçuşunda Dima\'nın kuzeni Artur, valizini kaldırmakta zorlanan yol arkadaşına yardım eder; üç saatlik uçuş kısa gelir.',
    dialogue: [
      { speaker: 'Artur', ru: 'Давайте помогу с чемоданом! Верхняя полка — моя специальность.', reading: 'Daváyte pamagú s çimadánam! Vyérhnyaya pólka — mayá spitsiál\'nast\'.', tr: 'Valizinize yardım edeyim! Üst raf benim uzmanlığım.' },
      { speaker: 'Lena', ru: 'Спасибо! Кажется, мы соседи — место 14Б?', reading: 'Spasíba! Kájetsa, my sasyédi — myésta çitýrnadtsat\' be?', tr: 'Teşekkürler! Galiba komşuyuz — 14B koltuğu mu?' },
      { speaker: 'Artur', ru: 'Да! Куда летите, если не секрет? Я в командировку.', reading: 'Da! Kudá litíte, yésli ni sikryét? Ya f kamandiróvku.', tr: 'Evet! Sır değilse nereye? Ben iş seyahatine.' },
      { speaker: 'Lena', ru: 'В отпуск, в Стамбул... Какое совпадение! Продолжим разговор на земле?', reading: 'V ótpusk, f Stambúl... Kakóye safpadyéniye! Pradóljim razgavór na zimlyé?', tr: 'Tatile, İstanbul\'a... Ne tesadüf! Sohbete yerde devam edelim mi?' }
    ]
  }
];
