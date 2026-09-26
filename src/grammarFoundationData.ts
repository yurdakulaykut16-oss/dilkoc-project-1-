import type { CefrTag } from './topics100';

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

export const GRAMMAR_FOUNDATION_UNITS: GrammarFoundationUnit[] = [
  {
    id: 'gram_sentence_core',
    levelGroup: 'A1',
    title: 'Cümlenin İskeleti: Özne + Yüklem + Tamamlayıcı',
    description: 'Alfabeden sonra ilk hedef: Rusça cümlenin temel parçalarını tanımak.',
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

export const ALL_GRAMMAR_FOUNDATION_QUESTIONS = GRAMMAR_FOUNDATION_UNITS.flatMap((u) => u.quiz);
