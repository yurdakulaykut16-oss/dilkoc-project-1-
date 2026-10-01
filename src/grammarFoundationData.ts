import type { CefrTag } from './topics100';
import { TENSE_UNITS } from './tensesData';

export interface GrammarFoundationExample {
  ru: string;
  reading: string;
  tr: string;
  subject?: string;
  predicate?: string;
  preposition?: string;
  note: string;
}

export interface GrammarChangeRule {
  label: string;
  explanation: string;
  examples: string[];
}

export interface GrammarFoundationQuizQuestion {
  prompt: string;
  correct: string;
  options: string[];
}

export interface GrammarFoundationUnit {
  id: string;
  levelGroup: CefrTag;
  title: string;
  description: string;
  icon: string;
  color: string;
  coreConcept: string;
  keyPoints: string[];
  changeRules?: GrammarChangeRule[];
  examples: GrammarFoundationExample[];
  miniChecklist: string[];
  quiz: GrammarFoundationQuizQuestion[];
}

const GRAMMAR_FOUNDATION_UNITS_RAW: GrammarFoundationUnit[] = [
  // SAYILAR PAKETİ — A1 başlangıcında özne/yüklem temelinden hemen sonra: 0-20, onluklar/yüzler + yaş/fiyat kullanımı
  {
    id: 'num_0_20',
    levelGroup: 'A1',
    title: 'Sayılar 0-20: Say, Sor, Cevapla',
    description: 'Alfabeden hemen sonra ilk pratik araç: sayıları tanı ve kullan.',
    icon: '🔢',
    color: '#06b6d4',
    coreConcept: 'Sayılar günlük hayatın anahtarıdır: fiyat, saat, yaş, telefon numarası. 0-20 arasını otomatikleştirmeden ileri gitme — Rusçada 11-19 arası “-надцать” ekiyle kurulur (одиннадцать = 1 + üzeri → 11).',
    keyPoints: [
      '0-10: ноль, один, два, три, четыре, пять, шесть, семь, восемь, девять, десять.',
      '11-19 “-надцать” ile biter: одиннадцать (11), двенадцать (12), пятнадцать (15), девятнадцать (19).',
      '20 = двадцать. 11-19’un “-надцать”ı ile 20’nin “-дцать”ını karıştırma.',
      '“Сколько?” = “Kaç / ne kadar?” sorusudur: Сколько это стоит? (Bu ne kadar?)',
      'один/одна/одно cinsiyete göre değişir: один брат, одна сестра. два/две de öyle: два дома, две книги.'
    ],
    examples: [
      { ru: 'Один, два, три, четыре, пять.', reading: 'Adín, dva, tri, çitíri, pyat.', tr: 'Bir, iki, üç, dört, beş.', note: 'İlk beş sayı — yüksek sesle say, parmaklarınla göster.' },
      { ru: 'Мне двадцать лет.', reading: 'Mnye dvátsat lyet.', tr: 'Ben yirmi yaşındayım.', note: 'Yaş söyleme kalıbı: Мне + sayı + лет.' },
      { ru: 'Сколько это стоит? — Десять рублей.', reading: 'Skólka éta stóit? — Dyésit rublyéy.', tr: 'Bu ne kadar? — On ruble.', note: 'Fiyat sorma-cevaplama: sayılar olmadan alışveriş yapılamaz.' },
      { ru: 'У меня два брата и одна сестра.', reading: 'U minyá dva bráta i adná sistrá.', tr: 'İki erkek kardeşim ve bir kız kardeşim var.', note: 'два (eril) / одна (dişil) — sayının cinsiyet uyumu.' }
    ],
    miniChecklist: [
      '0-10’u ezberden, sırayla ve geriye doğru sayabiliyor musun?',
      '11-19’daki “-надцать” kalıbını duyduğunda tanıyor musun?',
      '“Сколько?” sorusuna sayıyla cevap verebiliyor musun?'
    ],
    quiz: [
      { prompt: '“Beş” Rusça nasıl söylenir?', correct: 'пять', options: ['пять', 'девять', 'два', 'семь'] },
      { prompt: '«двенадцать» kaçtır?', correct: '12', options: ['12', '20', '2', '19'] },
      { prompt: '“Ben yirmi yaşındayım” hangisi?', correct: 'Мне двадцать лет.', options: ['Мне двадцать лет.', 'Я двадцать год.', 'Мне два лет.', 'У меня двадцать.'] },
      { prompt: '“Bu ne kadar?” diye nasıl sorulur?', correct: 'Сколько это стоит?', options: ['Сколько это стоит?', 'Где это стоит?', 'Когда это стоит?', 'Кто это стоит?'] },
      { prompt: '“Bir kız kardeş” için doğru biçim hangisi?', correct: 'одна сестра', options: ['одна сестра', 'один сестра', 'одно сестра', 'два сестра'] }
    ]
  },
  {
    id: 'num_big',
    levelGroup: 'A1',
    title: 'Sayılar 20-1000: Fiyat, Saat, Telefon',
    description: 'Onluklar, yüzler ve binler — gerçek hayatta sayıları birleştirme.',
    icon: '💯',
    color: '#0ea5e9',
    coreConcept: 'Büyük sayılar LEGO gibi birleşir: тридцать пять = 30 + 5 = 35, сто двадцать = 100 + 20 = 120. Onlukları ve yüzü öğrenince aradaki her sayıyı kurabilirsin.',
    keyPoints: [
      'Onluklar: двадцать (20), тридцать (30), сорок (40 — kural dışı!), пятьдесят (50), шестьдесят (60), семьдесят (70), восемьдесят (80), девяносто (90 — kural dışı!).',
      'сто (100), двести (200), пятьсот (500), тысяча (1000).',
      'Birleştirme: kırk iki = сорок два; yüz on beş = сто пятнадцать. Ekstra bağlaç YOK.',
      'Fiyatlarda рубль değişir: 1 рубль, 2-4 рубля, 5+ рублей.',
      'Saat sorma: Сколько времени? / Который час? — cevapta yine sayılar.'
    ],
    changeRules: [
      {
        label: 'Sayı + isim uyumu (рубль örneği)',
        explanation: 'Sayının son rakamı ismin biçimini belirler: 1 → рубль, 2-4 → рубля, 5-20 → рублей.',
        examples: ['двадцать один рубль (21)', 'тридцать два рубля (32)', 'сто пять рублей (105)']
      }
    ],
    examples: [
      { ru: 'Это стоит триста рублей.', reading: 'Éta stóit trísta rublyéy.', tr: 'Bu üç yüz ruble.', note: 'сто → двести → триста: yüzler de kalıpla büyür.' },
      { ru: 'Мой номер: девятьсот шестьдесят пять...', reading: 'Moy nómir: divitsót şizdisyát pyat...', tr: 'Numaram: dokuz yüz altmış beş...', note: 'Telefon numaraları üçlü-ikili gruplarla okunur.' },
      { ru: 'Сейчас сорок минут пятого.', reading: 'Siçás sórak minút pyátava.', tr: 'Şu an beşe yirmi var (4:40).', note: 'Saat ifadelerinde de aynı sayılar iş başında.' },
      { ru: 'В классе тридцать два студента.', reading: 'F klási trítsat dva studyénta.', tr: 'Sınıfta otuz iki öğrenci var.', note: 'два’dan sonra isim tekil-родительный biçim alır: студента.' }
    ],
    miniChecklist: [
      'сорок ve девяносто’nun kural dışı olduğunu hatırlıyor musun?',
      '347 gibi bir sayıyı üç parçada (триста сорок семь) kurabiliyor musun?',
      '1-2-5 kuralıyla рубль/рубля/рублей ayrımını yapabiliyor musun?'
    ],
    quiz: [
      { prompt: '“40” Rusça hangisi?', correct: 'сорок', options: ['сорок', 'четыредцать', 'сорокть', 'четырсто'] },
      { prompt: '«пятьдесят шесть» kaçtır?', correct: '56', options: ['56', '65', '506', '15'] },
      { prompt: '“200” hangisi?', correct: 'двести', options: ['двести', 'два сто', 'двадцать', 'двесто'] },
      { prompt: '32 ruble nasıl söylenir?', correct: 'тридцать два рубля', options: ['тридцать два рубля', 'тридцать два рубль', 'тридцать два рублей', 'тридцать две рубля'] },
      { prompt: '“1000” Rusça nedir?', correct: 'тысяча', options: ['тысяча', 'миллион', 'сто', 'десять'] }
    ]
  },
  // ZAMANLAR (TENSES) PAKETİ — sayılardan sonra: şimdiki, geçmiş, gelecek zaman + görünüş (вид)
  ...TENSE_UNITS,
  // CÜMLE TEMELLERİ — sıralamada en başa alınır: özne, yüklem, edat vb.
  {
    id: 'gram_sentence_core',
    levelGroup: 'A1',
    title: 'Cümlenin İskeleti: Özne + Yüklem + Tamamlayıcı',
    description: 'Zamanlardan sonra sıradaki hedef: Rusça cümlenin temel parçalarını tanımak.',
    icon: '🧩',
    color: '#22c55e',
    coreConcept: 'Cümlede genellikle bir “kim/ne?” parçası (özne) ve onun hakkında söylenen bir “ne yapıyor/ne durumda?” parçası (yüklem) bulunur. Edatlar ise kelimeler arasındaki yer, yön, araç, kaynak gibi ilişkileri kurar.',
    keyPoints: [
      'Özne: işi yapan veya hakkında konuşulan kişi/şeydir. “Кто?” (kim?) veya “Что?” (ne?) sorusuyla bulunur.',
      'Yüklem: öznenin ne yaptığını, ne olduğunu veya ne durumda olduğunu bildirir. Rusçada yüklem çoğu zaman fiildir ama “Это дом.” gibi isim de olabilir.',
      'Tamamlayıcılar: yer, zaman, nesne, araç gibi ek bilgileri verir. Edatlar bu tamamlayıcıların önemli bir parçasıdır.',
      'Rusçada kelime sırası Türkçeden daha esnektir; ama A1 için güvenli sıra: Özne + Yüklem + Tamamlayıcı.'
    ],
    examples: [
      { ru: 'Я читаю книгу.', reading: 'Ya chitáyu knígu.', tr: 'Ben kitap okuyorum.', subject: 'Я = özne', predicate: 'читаю = yüklem', note: 'Yüklem, özne olan “я”ya göre 1. tekil kişi biçimindedir.' },
      { ru: 'Мама дома.', reading: 'Máma dóma.', tr: 'Anne evde.', subject: 'Мама = özne', predicate: 'дома = durum/yer yüklemi', note: 'Rusçada şimdiki zamanda “dır/dir” çoğu kez söylenmez; “Anne evde(dir)” anlamı çıkar.' },
      { ru: 'Кот спит на диване.', reading: 'Kot spit na diváne.', tr: 'Kedi koltukta uyuyor.', subject: 'Кот = özne', predicate: 'спит = yüklem', preposition: 'на диване = edatlı yer', note: '“на” edatı burada nerede? sorusuna cevap verir.' }
    ],
    miniChecklist: [
      'Cümlede önce “Kim/ne?” diye sor: özneyi bul.',
      'Sonra “Ne yapıyor/ne durumda?” diye sor: yüklemi bul.',
      'Sonra “Nerede/nereye/kiminle/kimden?” gibi sorularla edatlı tamamlayıcıları ayır.'
    ],
    quiz: [
      { prompt: '«Я читаю книгу.» cümlesinde yüklem hangisi?', correct: 'читаю', options: ['Я', 'читаю', 'книгу', '—'] },
      { prompt: 'Özne hangi soruyla bulunur?', correct: 'Kim/ne?', options: ['Kim/ne?', 'Nerede?', 'Nasıl?', 'Ne zaman?'] },
      { prompt: '«Кот спит на диване.» cümlesinde edatlı bölüm hangisi?', correct: 'на диване', options: ['Кот', 'спит', 'на диване', 'диване'] },
      { prompt: 'Rusçada “Это дом.” cümlesinin doğru yorumu nedir?', correct: 'Bu bir ev(dir).', options: ['Bu bir ev(dir).', 'Ev gidiyor.', 'Ben evdeyim.', 'Evden geliyorum.'] }
    ]
  },
  {
    id: 'gram_subject',
    levelGroup: 'A1',
    title: 'Özne: Kim / Ne Hakkında Konuşuyoruz?',
    description: 'Şahıs zamirleri, isimler ve öznenin yükleme etkisi.',
    icon: '👤',
    color: '#38bdf8',
    coreConcept: 'Özne, cümlenin merkezindeki kişi/şeydir. Rusçada özne çoğunlukla yalın haldedir ve yüklemin kişi-sayı uyumunu belirler.',
    keyPoints: [
      'Şahıs zamirleri: я (ben), ты (sen), он/она/оно (o), мы (biz), вы (siz), они (onlar).',
      'İsimler de özne olabilir: Анна читает. / Книга лежит. / Студенты говорят.',
      'Özne tekilse yüklem tekil, çoğulsa yüklem çoğul biçime gider.',
      'Rusçada bazen özne düşebilir; ama A1’de özneyi açık yazmak öğrenmeyi kolaylaştırır.'
    ],
    changeRules: [
      { label: 'Kişi', explanation: 'Fiil öznenin kişisine göre farklı son alır.', examples: ['я читаю = ben okuyorum', 'ты читаешь = sen okuyorsun', 'он читает = o okuyor'] },
      { label: 'Sayı', explanation: 'Tekil ve çoğul özneler farklı fiil biçimleri ister.', examples: ['она работает = o çalışıyor', 'они работают = onlar çalışıyor'] },
      { label: 'Geçmiş zamanda cinsiyet', explanation: 'Geçmiş zamanda tekil fiil öznenin cinsiyetine göre değişir.', examples: ['он был = o vardı/idi (eril)', 'она была = o vardı/idi (dişil)', 'оно было = o vardı/idi (nötr)'] }
    ],
    examples: [
      { ru: 'Я говорю по-русски.', reading: 'Ya gavarýu pa-rússki.', tr: 'Ben Rusça konuşuyorum.', subject: 'Я = özne', predicate: 'говорю = 1. tekil yüklem', note: '“Я” öznesi geldiği için fiil “-ю” biçimindedir.' },
      { ru: 'Они говорят по-русски.', reading: 'Aní gavaryát pa-rússki.', tr: 'Onlar Rusça konuşuyor.', subject: 'Они = özne', predicate: 'говорят = 3. çoğul yüklem', note: 'Özne çoğul olduğu için fiil de çoğul biçimdedir.' },
      { ru: 'Анна была дома.', reading: 'Ánna bylá dóma.', tr: 'Anna evdeydi.', subject: 'Анна = dişil özne', predicate: 'была = dişil geçmiş yüklem', note: 'Geçmiş zamanda “был/была/было/были” özneye göre değişir.' }
    ],
    miniChecklist: [
      'Özne zamir mi, isim mi?',
      'Tekil mi, çoğul mu?',
      'Geçmiş zamandaysa öznenin cinsiyeti ne?'
    ],
    quiz: [
      { prompt: '«Они говорят.» cümlesinde özne hangisi?', correct: 'Они', options: ['Они', 'говорят', '—', 'говорю'] },
      { prompt: '“Ben okuyorum” için doğru özne + yüklem hangisi?', correct: 'Я читаю', options: ['Я читаю', 'Ты читаю', 'Он читаю', 'Они читаю'] },
      { prompt: 'Geçmiş zamanda dişil tekil özneyle “olmak/bulunmak” hangi biçime gider?', correct: 'была', options: ['был', 'была', 'было', 'были'] },
      { prompt: 'Özne çoğul olduğunda genel kural nedir?', correct: 'Yüklem çoğul biçime yaklaşır.', options: ['Yüklem çoğul biçime yaklaşır.', 'Edat silinir.', 'Her zaman mastar kullanılır.', 'Cümle öznesiz olur.'] }
    ]
  },
  {
    id: 'gram_predicate',
    levelGroup: 'A1',
    title: 'Yüklem: Ne Yapıyor, Ne Oluyor, Ne Durumda?',
    description: 'Yüklemin türleri ve neye göre değiştiği: kişi, sayı, zaman, görünüş, kip, cinsiyet.',
    icon: '⚙️',
    color: '#f59e0b',
    coreConcept: 'Yüklem, cümlenin “haber veren” bölümüdür. Rusçada yüklem fiil olabilir (иду), isim/sıfat olabilir (он врач, она дома) veya var-yok/durum yapısı olabilir (есть, нет, холодно).',
    keyPoints: [
      'Fiil yüklemi: Я иду. “Gidiyorum.” — hareket/eylem bildirir.',
      'İsim yüklemi: Он врач. “O doktor.” — şimdiki zamanda “есть/olmak” çoğu kez yazılmaz.',
      'Durum yüklemi: Мне холодно. “Üşüyorum.” — Rusçada bazı duygular/durumlar öznesiz veya datif yapıyla kurulur.',
      'Var-yok yüklemi: У меня есть брат. / У меня нет времени. “Var/yok” anlamı verir.'
    ],
    changeRules: [
      { label: 'Kişi ve sayı', explanation: 'Şimdiki/geniş zamanda fiil özneye göre çekimlenir.', examples: ['я иду = gidiyorum', 'ты идёшь = gidiyorsun', 'они идут = gidiyorlar'] },
      { label: 'Zaman', explanation: 'Eylemin ne zaman olduğunu gösterir: şimdi, geçmiş, gelecek.', examples: ['я читаю = okuyorum', 'я читал/читала = okudum', 'я буду читать = okuyacağım'] },
      { label: 'Görünüş (aspect)', explanation: 'Rusçada fiiller “süreç/alışkanlık” veya “tamamlanmış sonuç” bakışına göre değişir.', examples: ['читать = okumak (süreç)', 'прочитать = okuyup bitirmek (sonuç)'] },
      { label: 'Geçmişte cinsiyet', explanation: 'Tekil geçmiş fiil öznenin cinsiyetine uyar.', examples: ['он читал = o okudu (eril)', 'она читала = o okudu (dişil)', 'они читали = onlar okudu'] },
      { label: 'Kip / niyet', explanation: 'Emir, istek, şart gibi anlamlarda yüklem biçimi değişebilir.', examples: ['читай! = oku!', 'я хотел бы = isterdim'] }
    ],
    examples: [
      { ru: 'Я иду в школу.', reading: 'Ya idú v shkólu.', tr: 'Okula gidiyorum.', subject: 'Я = özne', predicate: 'иду = yüklem', preposition: 'в школу = yön', note: 'Yüklem 1. tekil kişi; edatlı bölüm nereye? sorusunu yanıtlar.' },
      { ru: 'Она читала книгу.', reading: 'Aná chitála knígu.', tr: 'O kitap okuyordu/okudu.', subject: 'Она = dişil özne', predicate: 'читала = dişil geçmiş yüklem', note: 'Geçmiş zamanda tekil fiil öznenin cinsiyetine göre “-ла” aldı.' },
      { ru: 'У меня есть брат.', reading: 'U minyá yest brat.', tr: 'Benim erkek kardeşim var.', predicate: 'есть = var yüklemi', preposition: 'у меня = bende/benim yanımda', note: 'Sahiplik Rusçada “bende var” mantığıyla kurulur.' }
    ],
    miniChecklist: [
      'Yüklem fiil mi, isim/sıfat mı, durum mu, var-yok yapısı mı?',
      'Fiilse öznesi kim: я/ты/он/мы/вы/они?',
      'Zamanı ne: şimdi, geçmiş, gelecek?',
      'Geçmiş tekilse öznenin cinsiyeti ne?',
      'Eylem süreç mi, tamamlanmış sonuç mu?'
    ],
    quiz: [
      { prompt: 'Yüklem hangi soruya cevap verir?', correct: 'Ne yapıyor/ne durumda?', options: ['Ne yapıyor/ne durumda?', 'Sadece nerede?', 'Sadece kaç tane?', 'Hangi harf?'] },
      { prompt: '«Она читала.» cümlesinde “читала” neden -ла ile biter?', correct: 'Geçmiş zamanda dişil özneye uyduğu için.', options: ['Geçmiş zamanda dişil özneye uyduğu için.', 'Çoğul olduğu için.', 'Edat aldığı için.', 'Mastar olduğu için.'] },
      { prompt: '«Он врач.» cümlesinde yüklem türü nedir?', correct: 'İsim yüklemi', options: ['İsim yüklemi', 'Edat', 'Nesne', 'Harf adı'] },
      { prompt: 'Rusçada fiil görünüşü (aspect) neyi anlatır?', correct: 'Süreç mi tamamlanmış sonuç mu?', options: ['Süreç mi tamamlanmış sonuç mu?', 'Özne eril mi?', 'Kelime büyük mü?', 'Edat nerede?'] }
    ]
  },
  {
    id: 'gram_prepositions',
    levelGroup: 'A1',
    title: 'Edatlar: в, на, к, у, с, из ve Hâl Mantığı',
    description: 'Edatların anlamı ve kendilerinden sonra gelen kelimeyi nasıl değiştirdiği.',
    icon: '🧭',
    color: '#a78bfa',
    coreConcept: 'Edatlar tek başına ezberlenecek küçük kelimeler değildir; çoğu zaman kendilerinden sonra gelen ismin hâlini belirler. Bu yüzden “в + nerede?” ile “в + nereye?” farklı biçimler doğurabilir.',
    keyPoints: [
      'в / на: içinde-üstünde veya içine-üstüne/yöne anlamı verir. Nerede? sorusunda yer hâli, nereye? sorusunda yönelme/nesne hâli kullanılır.',
      'к: “-e doğru / birine doğru” anlamındadır ve datif hâl ister: к другу (arkadaşa).',
      'у: “yanında, -de var” veya sahiplik anlamı verir: у меня есть... (benim ... var).',
      'с: bağlama göre “ile” veya “-den itibaren/-den” anlamı verebilir. “ile” anlamında araç hâli ister.',
      'из / от: “içinden/-den” ve “birinden/-den” ayrımı yapar: из дома, от друга.'
    ],
    changeRules: [
      { label: 'Yer mi yön mü?', explanation: 'Aynı edat, soru türüne göre farklı hâl isteyebilir.', examples: ['в школе = okulda (nerede?)', 'в школу = okula (nereye?)'] },
      { label: 'Edat + hâl paketi', explanation: 'Edatı tek başına değil, istediği hâlle birlikte öğren.', examples: ['к + datif: к маме', 'с + araç hâli: с другом', 'из + genitif: из дома'] },
      { label: 'Anlam farkı', explanation: 'Türkçede aynı “-de/-den” gibi görünen yapılar Rusçada farklı edatlarla ayrılır.', examples: ['у Анны = Anna’da/Anna’nın yanında', 'в Москве = Moskova’da', 'из Москвы = Moskova’dan'] }
    ],
    examples: [
      { ru: 'Я живу в Москве.', reading: 'Ya zhivú v Maskvé.', tr: 'Moskova’da yaşıyorum.', subject: 'Я = özne', predicate: 'живу = yüklem', preposition: 'в Москве = nerede?', note: '“в” burada yer bildirir; Москва → Москве biçimine geçer.' },
      { ru: 'Я иду в школу.', reading: 'Ya idú v shkólu.', tr: 'Okula gidiyorum.', subject: 'Я = özne', predicate: 'иду = yüklem', preposition: 'в школу = nereye?', note: 'Aynı “в” bu kez yön bildirir; soru “куда?” yani nereye?' },
      { ru: 'Я говорю с другом.', reading: 'Ya gavaryú s drúgam.', tr: 'Arkadaşımla konuşuyorum.', subject: 'Я = özne', predicate: 'говорю = yüklem', preposition: 'с другом = kiminle?', note: '“с” burada “ile” demektir ve “друг” kelimesi “другом” olur.' }
    ],
    miniChecklist: [
      'Edat hangi anlamı veriyor: yer, yön, sahiplik, araç, kaynak?',
      'Hangi soruya cevap veriyor: где, куда, к кому, с кем, откуда?',
      'Edatın istediği hâli küçük kalıp olarak ezberle: в школе / в школу gibi.'
    ],
    quiz: [
      { prompt: '«в школе» hangi soruya cevap verir?', correct: 'Nerede?', options: ['Nerede?', 'Nereye?', 'Kimden?', 'Kiminle?'] },
      { prompt: '«в школу» hangi soruya cevap verir?', correct: 'Nereye?', options: ['Nereye?', 'Nerede?', 'Niçin?', 'Kim?'] },
      { prompt: '«с другом» ifadesindeki “с” burada ne demek?', correct: 'ile', options: ['ile', 'içinden', 'üzerinde', 'ama'] },
      { prompt: 'Sahiplik için A1’de en temel kalıp hangisi?', correct: 'У меня есть...', options: ['У меня есть...', 'Я есть...', 'В меня...', 'К меня...'] }
    ]
  },
  {
    id: 'gram_sentence_lab',
    levelGroup: 'A1',
    title: 'Cümle Laboratuvarı: Parçala, Anla, Kur',
    description: 'Özne-yüklem-edatı aynı cümlede görme ve sonraki ünitelere hazırlık.',
    icon: '🔬',
    color: '#ec4899',
    coreConcept: 'Bu mini laboratuvarda artık bir Rusça cümleyi üç hamlede okuyorsun: önce özneyi bul, sonra yüklemi yorumla, en son edatlı parçanın hangi soruya cevap verdiğini çöz.',
    keyPoints: [
      'Cümle okurken her kelimeyi tek tek çevirmek yerine görevlerini ayır.',
      'Yüklem cümlenin motorudur; özne motorun kime bağlı olduğunu gösterir.',
      'Edatlı bölüm çoğu zaman “sahne bilgisini” verir: nerede, nereye, kimle, kimden?',
      'Bu temel alışkanlık sonraki tüm selamlaşma, aile, kafe, ulaşım ve dizi sahnesi ünitelerinde kullanılacak.'
    ],
    changeRules: [
      { label: '3 Adımlı analiz', explanation: 'Özne → yüklem → edatlı/tamamlayıcı bölüm şeklinde ilerle.', examples: ['Анна живёт в Москве. = Anna / yaşıyor / Moskova’da'] },
      { label: 'Yüklem kontrolü', explanation: 'Yüklemin neye göre değiştiğini hızlıca sor.', examples: ['Kişi? Sayı? Zaman? Geçmişse cinsiyet? Görünüş?'] },
      { label: 'Edat kontrolü', explanation: 'Edat gördüğünde hemen soru sor.', examples: ['в доме = nerede?', 'в дом = nereye?', 'с мамой = kiminle?'] }
    ],
    examples: [
      { ru: 'Анна работает в кафе.', reading: 'Ánna rabótayet v kafé.', tr: 'Anna kafede çalışıyor.', subject: 'Анна = özne', predicate: 'работает = yüklem', preposition: 'в кафе = nerede?', note: 'Kafe kelimesi çekimlenmeyen kelimelerdendir; biçimi aynı kalır.' },
      { ru: 'Мы идём к врачу.', reading: 'My idyóm k vrachú.', tr: 'Doktora gidiyoruz.', subject: 'Мы = özne', predicate: 'идём = 1. çoğul yüklem', preposition: 'к врачу = kime/nereye doğru?', note: '“к” bir kişiye/yer hedefine doğru yaklaşma bildirir.' },
      { ru: 'У него нет времени.', reading: 'U nivó nyet vrémyeni.', tr: 'Onun zamanı yok.', preposition: 'у него = onda/onun', predicate: 'нет = yok yüklemi', note: 'Yokluk yapısında “нет” kullanılır; sahiplik mantığının tersidir.' }
    ],
    miniChecklist: [
      'Özne: kim/ne?',
      'Yüklem: ne yapıyor/ne durumda/var mı yok mu?',
      'Edatlı bölüm: hangi ilişkiyi kuruyor?',
      'Yüklem neye göre değişmiş: kişi, sayı, zaman, cinsiyet, görünüş?'
    ],
    quiz: [
      { prompt: '«Анна работает в кафе.» cümlesinde özne hangisi?', correct: 'Анна', options: ['Анна', 'работает', 'в', 'кафе'] },
      { prompt: '«Мы идём к врачу.» cümlesinde yüklem hangisi?', correct: 'идём', options: ['Мы', 'идём', 'к', 'врачу'] },
      { prompt: '«У него нет времени.» cümlesindeki temel anlam nedir?', correct: 'Onun zamanı yok.', options: ['Onun zamanı yok.', 'O kafede.', 'Doktora gidiyoruz.', 'Ben okuyorum.'] },
      { prompt: 'Bir cümlede edat gördüğünde ilk yapman gereken ne?', correct: 'Hangi soruya cevap verdiğini sormak.', options: ['Hangi soruya cevap verdiğini sormak.', 'Her zaman silmek.', 'Yüklem sanmak.', 'Özneyle yer değiştirmek.'] }
    ]
  }
];

// A1'in en başı kullanıcı isteğine göre kesin sıra: önce cümleyi okuma
// iskeleti (özne + yüklem), sonra sayılar, zamanlar/fiiller ve en son
// edatlarla cümle laboratuvarı. Ham veri yukarıda içerik yakınlığına göre
// durabilir; uygulamaya çıkan sıra burada tek merkezden sabitlenir.
const FOUNDATION_ORDER = new Map<string, number>([
  ['gram_sentence_core', 0],
  ['gram_subject', 1],
  ['gram_predicate', 2],
  ['num_0_20', 3],
  ['num_big', 4],
  ...TENSE_UNITS.map((u, i) => [u.id, 10 + i] as const),
  ['gram_prepositions', 30],
  ['gram_sentence_lab', 31],
]);

export const GRAMMAR_FOUNDATION_UNITS: GrammarFoundationUnit[] = [...GRAMMAR_FOUNDATION_UNITS_RAW].sort((a, b) =>
  (FOUNDATION_ORDER.get(a.id) ?? 999) - (FOUNDATION_ORDER.get(b.id) ?? 999),
);

export const ALL_GRAMMAR_FOUNDATION_QUESTIONS = GRAMMAR_FOUNDATION_UNITS.flatMap((u) => u.quiz);
