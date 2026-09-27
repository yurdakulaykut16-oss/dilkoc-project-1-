// ==========================================================
// ZAMANLAR (TENSES) PAKETİ — 10 ÜNİTE
// Rusçada fiil zamanları: şimdiki zaman (1. ve 2. çekim),
// geçmiş zaman, gelecek zaman (bileşik + basit), görünüş
// (вид) sistemi ve zaman zarflarıyla büyük tekrar.
// GRAMMAR_FOUNDATION_UNITS'e eklenir; aynı ekran ve quiz
// akışını kullanır.
// ==========================================================
import type { GrammarFoundationUnit } from './grammarFoundationData';

export const TENSE_UNITS: GrammarFoundationUnit[] = [
  {
    id: 'tense_overview',
    levelGroup: 'A1',
    title: 'Zamanlar 1/10 — Rusçada Zaman Haritası',
    description: 'İyi haber: Rusçada sadece 3 zaman var! Geçmiş, şimdiki ve gelecek.',
    icon: '🕰️',
    color: '#f59e0b',
    coreConcept: 'Türkçede "geldim, gelmişim, geliyordum, gelirdim" gibi onlarca zaman-kip birleşimi vardır. Rusçada ise sadece ÜÇ zaman vardır: geçmiş (прошедшее), şimdiki (настоящее) ve gelecek (будущее). Bu sadeliğin bedeli ise "görünüş" (вид) sistemidir: her fiilin "süreç" ve "sonuç" olmak üzere iki hâli vardır — onu ilerleyen ünitelerde çözeceğiz.',
    keyPoints: [
      'Rusçada 3 zaman vardır: geçmiş, şimdiki, gelecek. Hepsi bu!',
      'Türkçedeki "-di" ve "-miş" ayrımı Rusçada YOKTUR: "я читал" hem "okudum" hem "okumuşum" olabilir.',
      'Şimdiki zaman fiil çekimiyle yapılır: я читаю = okuyorum.',
      'Geçmiş zaman -Л takısıyla yapılır: я читал = okudum.',
      'Gelecek zaman iki türlü yapılır: буду читать (okuyacağım/okuyor olacağım) veya прочитаю (okuyup bitireceğim).'
    ],
    changeRules: [
      {
        label: 'Üç zamanın kuş bakışı görünümü (читать = okumak)',
        explanation: 'Aynı fiilin üç zamandaki hâli. Şimdilik sadece tanı, ezberleme — her biri için ayrı ünitemiz var.',
        examples: [
          'GEÇMİŞ: Я читал. → Ya çitál. → Okudum / Okuyordum.',
          'ŞİMDİKİ: Я читаю. → Ya çitáyu. → Okuyorum.',
          'GELECEK: Я буду читать. → Ya búdu çitát\'. → Okuyacağım.'
        ]
      },
      {
        label: 'Türkçe ile en büyük fark',
        explanation: 'Rusça zaman sayısında cimri, ama her fiili İKİ görünüşte (bitmemiş/bitmiş) tutar. Türkçedeki zaman zenginliğinin işini Rusçada bu ikili üstlenir.',
        examples: [
          'делать (yapmak, süreç) ↔ сделать (yapıp bitirmek, sonuç)',
          'читать (okumak, süreç) ↔ прочитать (okuyup bitirmek, sonuç)'
        ]
      }
    ],
    examples: [
      { ru: 'Вчера я читал книгу.', reading: 'Fçirá ya çitál knígu.', tr: 'Dün kitap okudum.', predicate: 'читал = geçmiş zaman', note: '"вчера" (dün) kelimesi geçmiş zamanın en sadık arkadaşıdır.' },
      { ru: 'Сейчас я читаю книгу.', reading: 'Siyçás ya çitáyu knígu.', tr: 'Şimdi kitap okuyorum.', predicate: 'читаю = şimdiki zaman', note: '"сейчас" (şimdi) şimdiki zamanla gider.' },
      { ru: 'Завтра я буду читать книгу.', reading: 'Záftra ya búdu çitát\' knígu.', tr: 'Yarın kitap okuyacağım.', predicate: 'буду читать = gelecek zaman', note: '"завтра" (yarın) gelecek zamanın habercisidir.' }
    ],
    miniChecklist: [
      'Cümlede zaman zarfını bul: вчера (dün) / сейчас (şimdi) / завтра (yarın).',
      'Fiilin sonuna bak: -л varsa geçmiş, -ю/-ешь/-ет varsa şimdiki zaman.',
      'буду/будешь + mastar görüyorsan gelecek zamandasın.'
    ],
    quiz: [
      { prompt: 'Rusçada kaç zaman vardır?', correct: '3', options: ['3', '5', '12', '1'] },
      { prompt: '«Я читал» hangi zamandadır?', correct: 'Geçmiş', options: ['Geçmiş', 'Şimdiki', 'Gelecek', 'Emir kipi'] },
      { prompt: '«Завтра я буду читать.» cümlesinde geleceği gösteren parça hangisi?', correct: 'буду читать', options: ['буду читать', 'завтра я', 'я', 'читал'] },
      { prompt: 'Türkçedeki "-di / -miş" ayrımı Rusçada nasıl karşılanır?', correct: 'Ayrım yoktur, ikisi de aynı geçmiş zamandır', options: ['Ayrım yoktur, ikisi de aynı geçmiş zamandır', 'İki ayrı ek vardır', 'Sadece -miş vardır', 'Fiil hiç çekilmez'] }
    ]
  },
  {
    id: 'tense_present_e',
    levelGroup: 'A1',
    title: 'Zamanlar 2/10 — Şimdiki Zaman I: 1. Çekim (-ать fiilleri)',
    description: 'читать, работать, знать: fiillerin çoğu bu şablonla çekilir.',
    icon: '▶️',
    color: '#22c55e',
    coreConcept: 'Şimdiki zaman, fiilin sonundaki mastar ekini (-ть) atıp yerine kişi eklerini getirerek yapılır. Fiillerin büyük çoğunluğu "1. çekim" (Е-grubu) şablonunu izler: читать → чита- gövdesine -ю, -ешь, -ет, -ем, -ете, -ют eklenir. Bu tek tabloyu öğrenen, yüzlerce fiili çekebilir.',
    keyPoints: [
      'Mastar (sözlük hâli) çoğu zaman -ть ile biter: читать (okumak), знать (bilmek), работать (çalışmak).',
      '1. çekim ekleri: -ю, -ешь, -ет, -ем, -ете, -ют.',
      'Türkçedeki gibi kişi ekleri bellidir; bu yüzden zamir bazen düşebilir: Читаю. = Okuyorum.',
      'Rusçada şimdiki zamanda "olmak" (быть) söylenmez: Я студент. = Ben öğrenciyim ("im" yok!).'
    ],
    changeRules: [
      {
        label: 'ЧИТАТЬ (okumak) — 1. çekim tablosu',
        explanation: 'Gövde: чита-. Eklerin melodisini yakala: -yu, -yeş, -yet, -yem, -yetye, -yut.',
        examples: [
          'я читаю (ya çitáyu) = okuyorum',
          'ты читаешь (tı çitáyiş) = okuyorsun',
          'он/она читает (on çitáyit) = okuyor',
          'мы читаем (mı çitáyim) = okuyoruz',
          'вы читаете (vı çitáyitye) = okuyorsunuz',
          'они читают (aní çitáyut) = okuyorlar'
        ]
      },
      {
        label: 'Aynı şablonla çalışan fiiller',
        explanation: 'Gövdeyi değiştir, ekler aynı kalsın:',
        examples: [
          'работать → я работаю (çalışıyorum)',
          'знать → я знаю (biliyorum)',
          'играть → я играю (oynuyorum)',
          'думать → я думаю (düşünüyorum)',
          'слушать → я слушаю (dinliyorum)'
        ]
      }
    ],
    examples: [
      { ru: 'Я работаю в офисе.', reading: 'Ya rabótayu v ófisye.', tr: 'Ofiste çalışıyorum.', subject: 'Я = özne', predicate: 'работаю = 1. tekil şahıs', note: '-ю eki "ben" formunun imzasıdır.' },
      { ru: 'Ты знаешь Москву?', reading: 'Tı znáyiş Maskvú?', tr: 'Moskova\'yı biliyor musun?', subject: 'Ты = özne', predicate: 'знаешь = 2. tekil şahıs', note: 'Soru için ek gerekmez, sadece tonlama yükselir.' },
      { ru: 'Мы играем в футбол.', reading: 'Mı igráyim f fudból.', tr: 'Futbol oynuyoruz.', subject: 'Мы = özne', predicate: 'играем = 1. çoğul şahıs', note: '"играть в + spor" kalıbını not et.' }
    ],
    miniChecklist: [
      'Mastardaki -ть\'yi at: читать → чита-.',
      'Kişiye göre eki tak: я → -ю, ты → -ешь, он → -ет.',
      'Çoğulda: мы → -ем, вы → -ете, они → -ют.'
    ],
    quiz: [
      { prompt: '«Я ___ книгу.» (okumak) — doğru form hangisi?', correct: 'читаю', options: ['читаю', 'читаешь', 'читает', 'читают'] },
      { prompt: '«Они ___ в футбол.» (oynamak) — doğru form?', correct: 'играют', options: ['играют', 'играю', 'играешь', 'играем'] },
      { prompt: '«Ты ___ русский язык?» (bilmek) — doğru form?', correct: 'знаешь', options: ['знаешь', 'знаю', 'знает', 'знаете'] },
      { prompt: '1. çekimde «мы» (biz) hangi eki alır?', correct: '-ем', options: ['-ем', '-ют', '-ешь', '-ю'] }
    ]
  },
  {
    id: 'tense_present_i',
    levelGroup: 'A1',
    title: 'Zamanlar 3/10 — Şimdiki Zaman II: 2. Çekim (-ить fiilleri)',
    description: 'говорить, любить, смотреть: İ-grubunun melodisi farklı.',
    icon: '🗣️',
    color: '#38bdf8',
    coreConcept: 'İkinci büyük fiil ailesi "2. çekim" (И-grubu)dur. Çoğu -ить ile biter: говорить (konuşmak), любить (sevmek). Ekleri 1. çekime benzer ama E yerine İ harfi taşır: -ю, -ишь, -ит, -им, -ите, -ят. Kulağına "İ" melodisi gelen çekim, bu gruptur.',
    keyPoints: [
      '2. çekim ekleri: -ю/-у, -ишь, -ит, -им, -ите, -ят.',
      '1. çekim E ile (читаЕшь), 2. çekim İ ile (говорИшь) gider — fark tek harf ama gruptur.',
      'любить fiilinde sürpriz: "ben" formunda araya Л girer → я люблЮ (seviyorum).',
      'смотреть (bakmak/izlemek) -еть ile bitse de 2. çekimdendir: я смотрю, ты смотришь.'
    ],
    changeRules: [
      {
        label: 'ГОВОРИТЬ (konuşmak) — 2. çekim tablosu',
        explanation: 'Gövde: говор-. Melodiyi karşılaştır: -yu, -İş, -İt, -İm, -İtye, -yat.',
        examples: [
          'я говорю (ya gavaryú) = konuşuyorum',
          'ты говоришь (tı gavaríş) = konuşuyorsun',
          'он/она говорит (on gavarít) = konuşuyor',
          'мы говорим (mı gavarím) = konuşuyoruz',
          'вы говорите (vı gavarítye) = konuşuyorsunuz',
          'они говорят (aní gavaryát) = konuşuyorlar'
        ]
      },
      {
        label: 'ЛЮБИТЬ (sevmek) — Л sürprizi',
        explanation: 'Б, П, В, М, Ф ile biten gövdelerde "ben" formuna Л eklenir. Sadece я formunda!',
        examples: [
          'я люблю (ya lyublyú) = seviyorum ← Л geldi!',
          'ты любишь (tı lyúbiş) = seviyorsun ← Л yok',
          'он любит (on lyúbit) = seviyor',
          'они любят (aní lyúbyat) = seviyorlar'
        ]
      }
    ],
    examples: [
      { ru: 'Я говорю по-русски.', reading: 'Ya gavaryú pa-rúski.', tr: 'Rusça konuşuyorum.', subject: 'Я = özne', predicate: 'говорю = 1. tekil şahıs', note: '"по-русски" = Rusça (dil olarak) kalıbı hep böyle kurulur.' },
      { ru: 'Я люблю чай.', reading: 'Ya lyublyú çay.', tr: 'Çayı seviyorum.', subject: 'Я = özne', predicate: 'люблю = Л sürprizli form', note: 'любить\'in я formundaki fazladan Л\'ye dikkat!' },
      { ru: 'Она смотрит фильм.', reading: 'Aná smótrit fil\'m.', tr: 'O, film izliyor.', subject: 'Она = özne', predicate: 'смотрит = 3. tekil şahıs', note: '-еть ile bitmesine rağmen 2. çekim: смотрИт.' }
    ],
    miniChecklist: [
      'Fiil -ить ile mi bitiyor? Büyük ihtimalle 2. çekim.',
      'Eklerde E değil İ ara: говорИшь, говорИт, говорИм.',
      'любить, готовить gibi fiillerde я formuna Л ekle: люблю, готовлю.'
    ],
    quiz: [
      { prompt: '«Я ___ по-турецки.» (konuşmak) — doğru form?', correct: 'говорю', options: ['говорю', 'говоришь', 'говорит', 'говорят'] },
      { prompt: '«Я ___ кофе.» (sevmek) — doğru form?', correct: 'люблю', options: ['люблю', 'любю', 'любишь', 'любит'] },
      { prompt: '«Вы ___ телевизор?» (izlemek) — doğru form?', correct: 'смотрите', options: ['смотрите', 'смотрю', 'смотрит', 'смотрят'] },
      { prompt: '2. çekimi 1. çekimden ayıran harf hangisidir?', correct: 'И (говорИшь)', options: ['И (говорИшь)', 'Е (читаЕшь)', 'Я (читаЯшь)', 'У (говорУшь)'] }
    ]
  },
  {
    id: 'tense_present_special',
    levelGroup: 'A1',
    title: 'Zamanlar 4/10 — Şimdiki Zamanın Yıldızları: жить, идти, хотеть',
    description: 'En sık kullanılan fiillerin bazıları kural tanımaz — ama azlar.',
    icon: '⭐',
    color: '#a78bfa',
    coreConcept: 'Her dilde olduğu gibi Rusçada da en sık kullanılan fiillerden bazıları düzensizdir: жить (yaşamak), идти (gitmek/yürümek), хотеть (istemek), есть (yemek). İyi haber: sayıları azdır ve o kadar sık duyulurlar ki kendiliğinden ezberlenirler. Bir de altın kural: şimdiki zamanda "olmak" fiili (быть) hiç söylenmez.',
    keyPoints: [
      'жить (yaşamak): я живу, ты живёшь, он живёт — gövdeye В girer.',
      'идти (yürüyerek gitmek): я иду, ты идёшь, он идёт.',
      'хотеть (istemek): tekilde 1. çekim gibi (хочу, хочешь, хочет), çoğulda 2. çekim gibi (хотим, хотите, хотят) — tam bir asi!',
      'Şimdiki zamanda "быть" (olmak) söylenmez: Я дома. = Evdeyim. Он врач. = O doktordur.'
    ],
    changeRules: [
      {
        label: 'ЖИТЬ (yaşamak) ve ИДТИ (gitmek)',
        explanation: 'İkisi de vurgulu Ё/У ekleriyle çekilir:',
        examples: [
          'я живу (jıvú) / ты живёшь (jıvyóş) / он живёт (jıvyót)',
          'мы живём / вы живёте / они живут',
          'я иду (idú) / ты идёшь (idyóş) / он идёт (idyót)',
          'мы идём / вы идёте / они идут'
        ]
      },
      {
        label: 'ХОТЕТЬ (istemek) — iki yüzlü fiil',
        explanation: 'Tekilde Е melodisi, çoğulda İ melodisi. Rusçanın en ünlü düzensiz fiili:',
        examples: [
          'я хочу (haçú) / ты хочешь (hóçiş) / он хочет (hóçit)',
          'мы хотим (hatím) / вы хотите (hatítye) / они хотят (hatyát)'
        ]
      },
      {
        label: 'Görünmez "olmak" fiili',
        explanation: 'Şimdiki zamanda быть kullanılmaz; Türkçedeki "-dır/-im" ekleri gibi düşün, ama hiç yazılmaz:',
        examples: [
          'Я студент. = Ben öğrenciyim.',
          'Она дома. = O evde(dir).',
          'Это вкусно. = Bu lezzetli(dir).'
        ]
      }
    ],
    examples: [
      { ru: 'Я живу в Стамбуле.', reading: 'Ya jıvú f Stambúlye.', tr: 'İstanbul\'da yaşıyorum.', subject: 'Я = özne', predicate: 'живу = düzensiz şimdiki zaman', note: 'жить\'in gövdesine giren В\'yi duy: jı-VU.' },
      { ru: 'Куда ты идёшь?', reading: 'Kudá tı idyóş?', tr: 'Nereye gidiyorsun?', subject: 'ты = özne', predicate: 'идёшь = düzensiz şimdiki zaman', note: 'куда = nereye; идти her zaman yürüyerek gitmektir.' },
      { ru: 'Я хочу чай.', reading: 'Ya haçú çay.', tr: 'Çay istiyorum.', subject: 'Я = özne', predicate: 'хочу = düzensiz şimdiki zaman', note: 'Kafede hayat kurtaran cümle. "Я хочу..." = İstiyorum...' }
    ],
    miniChecklist: [
      'жить, идти, хотеть, есть fiillerini tablo hâlinde değil, cümle içinde ezberle.',
      'хотеть\'te tekil-çoğul melodi değişimini hatırla: хочу/хочешь ama хотим/хотят.',
      'Şimdiki zamanda "olmak" arama: Я врач = Ben doktorum.'
    ],
    quiz: [
      { prompt: '«Я ___ в Анкаре.» (yaşamak) — doğru form?', correct: 'живу', options: ['живу', 'живёшь', 'жить', 'живёт'] },
      { prompt: '«Мы ___ пиццу.» (istemek) — doğru form?', correct: 'хотим', options: ['хотим', 'хочем', 'хочу', 'хотите'] },
      { prompt: '«Ben öğrenciyim» Rusça nasıl söylenir?', correct: 'Я студент.', options: ['Я студент.', 'Я есть студент.', 'Я быть студент.', 'Я студентую.'] },
      { prompt: '«Он ___ в школу.» (yürüyerek gitmek) — doğru form?', correct: 'идёт', options: ['идёт', 'иду', 'идёшь', 'идти'] }
    ]
  },
  {
    id: 'tense_past',
    levelGroup: 'A1',
    title: 'Zamanlar 5/10 — Geçmiş Zaman: -Л Takısının Büyüsü',
    description: 'Rusçanın en kolay zamanı: -ть\'yi at, -л\'yi tak, bitti!',
    icon: '⏪',
    color: '#ef4444',
    coreConcept: 'Geçmiş zaman Rusçanın en kolay zamanıdır: mastardaki -ть atılır, yerine -л gelir. Ama bir sürprizi vardır: geçmiş zaman fiili KİŞİYE göre değil, öznenin CİNSİYETİNE göre değişir! Erkek özne → -л, kadın özne → -ла, nötr → -ло, çoğul → -ли. Yani "ben okudum" bile erkekse "я читал", kadınsa "я читала" olur.',
    keyPoints: [
      'Formül: mastar - ть + л = geçmiş zaman. читать → читал.',
      'Cinsiyet uyumu: он читал / она читала / оно читало / они читали.',
      '"Ben" ve "sen" için de cinsiyet geçerli: kadın konuşuyorsa "я читала" der!',
      'Kişi ekleri YOK: я читал, ты читал, он читал — hepsi aynı form (erkekse).',
      'Hem "-di" hem "-miş" hem "-yordu" anlamlarını tek form taşır: я читал = okudum / okumuşum / okuyordum.'
    ],
    changeRules: [
      {
        label: 'ЧИТАТЬ → geçmiş zaman dört formu',
        explanation: 'Kişiyi unut, cinsiyete ve sayıya bak:',
        examples: [
          'он читал (çitál) = o (erkek) okudu',
          'она читала (çitála) = o (kadın) okudu',
          'оно читало (çitála) = o (nötr) okudu',
          'они читали (çitáli) = onlar okudu'
        ]
      },
      {
        label: 'БЫТЬ (olmak) geçmişte ortaya çıkar!',
        explanation: 'Şimdiki zamanda gizlenen быть, geçmişte sahneye döner: был/была/было/были = idi, vardı.',
        examples: [
          'Я был дома. = Evdeydim. (erkek)',
          'Я была дома. = Evdeydim. (kadın)',
          'Было холодно. = (Hava) soğuktu.',
          'Мы были в Москве. = Moskova\'daydık.'
        ]
      },
      {
        label: 'Küçük istisnalar',
        explanation: 'Birkaç fiil -л almadan önce şekil değiştirir:',
        examples: [
          'идти → он шёл, она шла, они шли (gitti)',
          'мочь → он мог, она могла (yapabildi)',
          'есть → он ел, она ела (yedi)'
        ]
      }
    ],
    examples: [
      { ru: 'Вчера я работал весь день.', reading: 'Fçirá ya rabótal vyes\' dyen\'.', tr: 'Dün bütün gün çalıştım. (erkek)', subject: 'я = özne (erkek)', predicate: 'работал = geçmiş, eril', note: 'Aynı cümleyi bir kadın "я работала" diye kurar.' },
      { ru: 'Она жила в Казани.', reading: 'Aná jılá f Kazáni.', tr: 'O (kadın), Kazan\'da yaşadı/yaşıyordu.', subject: 'Она = özne (kadın)', predicate: 'жила = geçmiş, dişil', note: 'Tek form hem "yaşadı" hem "yaşıyordu" anlamı taşır.' },
      { ru: 'Мы были в кино.', reading: 'Mı bı́li f kinó.', tr: 'Sinemadaydık.', subject: 'Мы = özne', predicate: 'были = быть\'in çoğul geçmişi', note: 'Geçmişte "olmak" artık görünür: были.' }
    ],
    miniChecklist: [
      '-ть\'yi at, -л\'yi tak: знать → знал.',
      'Özne kadınsa -ла, nötrse -ло, çoğulsa -ли ekle.',
      'Kendi cinsiyetine göre konuş: (erkek) я понял / (kadın) я поняла = anladım.'
    ],
    quiz: [
      { prompt: '«Она ___ книгу.» (окумак, geçmiş) — doğru form?', correct: 'читала', options: ['читала', 'читал', 'читали', 'читает'] },
      { prompt: 'Geçmiş zaman fiili neye göre değişir?', correct: 'Öznenin cinsiyetine ve sayısına', options: ['Öznenin cinsiyetine ve sayısına', 'Kişiye (ben/sen/o)', 'Saate', 'Nesneye'] },
      { prompt: 'Bir KADIN "evdeydim" derken hangisini kullanır?', correct: 'Я была дома.', options: ['Я была дома.', 'Я был дома.', 'Я было дома.', 'Я были дома.'] },
      { prompt: '«Они ___ в парке.» (olmak, geçmiş) — doğru form?', correct: 'были', options: ['были', 'был', 'была', 'было'] }
    ]
  },
  {
    id: 'tense_past_negation',
    levelGroup: 'A2',
    title: 'Zamanlar 6/10 — Geçmişte Yokluk ve "У меня был..."',
    description: '"Vardı / yoktu" demeyi öğren: sahiplik cümleleri geçmişe taşınıyor.',
    icon: '📦',
    color: '#ec4899',
    coreConcept: 'Rusçada "benim ... var" cümlesi "У меня есть..." kalıbıyla kurulur. Geçmişe taşındığında есть yerine был/была/было gelir ve sahip olunan ŞEYİN cinsiyetine uyar: У меня был брат (erkek kardeşim vardı), У меня была машина (arabam vardı). Yokluk ise her zaman tek formdur: не было + isim.',
    keyPoints: [
      '"У меня есть дом" (evim var) → geçmişte "У меня был дом" (evim vardı).',
      'был/была/было sahip olunan şeyin cinsiyetine uyar: был брат, была сестра, было время.',
      'YOKLUK hep aynı: не было (okunuşu "NYÉ bıla") — cinsiyet fark etmez!',
      'не было\'dan sonra isim -а/-я hâline girer (ilgi hâli): не было времени = zaman yoktu.'
    ],
    changeRules: [
      {
        label: 'VARDI: был / была / было',
        explanation: 'Sahip olunan şeyin cinsine bak:',
        examples: [
          'У меня был телефон. = Telefonum vardı. (телефон = eril)',
          'У меня была книга. = Kitabım vardı. (книга = dişil)',
          'У меня было время. = Zamanım vardı. (время = nötr)',
          'У меня были деньги. = Param vardı. (деньги = çoğul)'
        ]
      },
      {
        label: 'YOKTU: не было + ilgi hâli',
        explanation: 'Yoklukta tek kalıp vardır ve isim şekil değiştirir:',
        examples: [
          'У меня не было телефона. = Telefonum yoktu.',
          'У меня не было времени. = Zamanım yoktu.',
          'Вчера не было дождя. = Dün yağmur yoktu/yağmadı.'
        ]
      }
    ],
    examples: [
      { ru: 'У меня была собака.', reading: 'U minyá bılá sabáka.', tr: 'Bir köpeğim vardı.', predicate: 'была = собака dişil olduğu için', note: 'была, sahibin değil KÖPEĞİN cinsiyetine uyar.' },
      { ru: 'У нас не было интернета.', reading: 'U nas nyé bıla internéta.', tr: 'İnternetimiz yoktu.', predicate: 'не было = yokluk kalıbı', note: 'интернет → интернета: yoklukta isim ilgi hâline girer.' },
      { ru: 'Вчера был дождь, а сегодня дождя нет.', reading: 'Fçirá bıl doşt\', a sivódnya dajdyá nyet.', tr: 'Dün yağmur vardı, bugünse yağmur yok.', predicate: 'был / нет = geçmiş ve şimdiki yokluk', note: 'Şimdiki zamanda yokluk "нет + ilgi hâli" ile yapılır.' }
    ],
    miniChecklist: [
      'Vardı derken şeyin cinsine bak: был/была/было/были.',
      'Yoktu derken düşünme: her zaman "не было".',
      'не было ve нет\'ten sonra ismi ilgi hâline çevir.'
    ],
    quiz: [
      { prompt: '«У меня ___ машина.» (arabam vardı) — doğru form?', correct: 'была', options: ['была', 'был', 'было', 'были'] },
      { prompt: '«Zamanım yoktu» nasıl denir?', correct: 'У меня не было времени.', options: ['У меня не было времени.', 'У меня не был время.', 'У меня нет была время.', 'Я не было время.'] },
      { prompt: '«У них ___ деньги.» (paraları vardı) — doğru form?', correct: 'были', options: ['были', 'был', 'была', 'было'] },
      { prompt: 'не было kalıbında isim hangi hâle girer?', correct: 'İlgi hâli (родительный)', options: ['İlgi hâli (родительный)', 'Yalın hâl', 'Yönelme hâli', 'Araç hâli'] }
    ]
  },
  {
    id: 'tense_future_budu',
    levelGroup: 'A2',
    title: 'Zamanlar 7/10 — Bileşik Gelecek: буду + Mastar',
    description: 'Tek tabloyla SINIRSIZ gelecek zaman: буду, будешь, будет...',
    icon: '⏩',
    color: '#14b8a6',
    coreConcept: 'Geleceğin en kolay yolu: быть fiilinin gelecek çekimi (буду, будешь, будет...) + fiilin mastarı. "Я буду читать" = okuyacağım (okuyor olacağım). Tek tabloyu ezberle, arkasına istediğin mastarı tak — sınırsız gelecek zaman cümlesi! Bu form, sürece ve tekrara vurgu yapar: "yarın akşam kitap okuyor olacağım" gibi.',
    keyPoints: [
      'Formül: буду/будешь/будет/будем/будете/будут + mastar.',
      'Sadece буду çekilir, ana fiil hep mastar kalır: буду работать, будешь работать...',
      'Bu form süreci anlatır: Я буду учить русский. = Rusça çalışacağım (süreç olarak).',
      'быть\'in kendisi de gelecekte kullanılır: Завтра я буду дома. = Yarın evde olacağım.'
    ],
    changeRules: [
      {
        label: 'БЫТЬ gelecek tablosu — geleceğin anahtarı',
        explanation: 'Bu altı formu ezberle, gelecek zaman cebinde:',
        examples: [
          'я буду (búdu) = olacağım',
          'ты будешь (búdiş) = olacaksın',
          'он/она будет (búdit) = olacak',
          'мы будем (búdim) = olacağız',
          'вы будете (búditye) = olacaksınız',
          'они будут (búdut) = olacaklar'
        ]
      },
      {
        label: 'буду + mastar örnekleri',
        explanation: 'Ana fiil hiç değişmez, hep mastar:',
        examples: [
          'Я буду смотреть фильм. = Film izleyeceğim.',
          'Ты будешь работать завтра? = Yarın çalışacak mısın?',
          'Мы будем жить в Москве. = Moskova\'da yaşayacağız.',
          'Они будут играть в футбол. = Futbol oynayacaklar.'
        ]
      }
    ],
    examples: [
      { ru: 'Завтра я буду читать весь день.', reading: 'Záftra ya búdu çitát\' vyes\' dyen\'.', tr: 'Yarın bütün gün okuyacağım.', predicate: 'буду читать = bileşik gelecek', note: 'Sürece vurgu: gün boyu sürecek bir okuma.' },
      { ru: 'Что ты будешь делать вечером?', reading: 'Şto tı búdiş dyélat\' vyéçiram?', tr: 'Akşam ne yapacaksın?', predicate: 'будешь делать = bileşik gelecek', note: 'Günlük hayatın en sık sorularından biri.' },
      { ru: 'В субботу мы будем дома.', reading: 'F subótu mı búdim dóma.', tr: 'Cumartesi evde olacağız.', predicate: 'будем = быть\'in gelecek hâli', note: 'быть tek başına da gelecek kurar: "olacağız".' }
    ],
    miniChecklist: [
      'буду tablosunu şarkı gibi ezberle: буду, будешь, будет, будем, будете, будут.',
      'Arkasına mastarı tak: буду + читать/работать/жить...',
      'Ana fiili sakın çekme: "буду читаю" YANLIŞ, "буду читать" doğru.'
    ],
    quiz: [
      { prompt: '«Я ___ учить русский язык.» (gelecek) — doğru form?', correct: 'буду', options: ['буду', 'будешь', 'будет', 'быть'] },
      { prompt: '«Мы будем ___ фильм.» — boşluğa ne gelir?', correct: 'смотреть (mastar)', options: ['смотреть (mastar)', 'смотрим', 'смотрели', 'смотрит'] },
      { prompt: '«Они ___ работать в понедельник.» — doğru form?', correct: 'будут', options: ['будут', 'будет', 'будем', 'буду'] },
      { prompt: 'Hangisi YANLIŞ kurulmuş?', correct: 'Я буду читаю.', options: ['Я буду читаю.', 'Я буду читать.', 'Ты будешь читать.', 'Мы будем читать.'] }
    ]
  },
  {
    id: 'tense_aspect',
    levelGroup: 'A2',
    title: 'Zamanlar 8/10 — Görünüş (Вид): делать vs сделать',
    description: 'Rusçanın kalbi: her fiil bir İKİZ ile doğar — süreç ve sonuç.',
    icon: '🎭',
    color: '#f97316',
    coreConcept: 'Rusçada her fiil ikiz kardeşiyle yaşar: bitmemiş görünüş (несовершенный вид, НСВ) süreci, tekrarı, alışkanlığı anlatır; bitmiş görünüş (совершенный вид, СВ) tek seferlik, tamamlanmış, sonuca ulaşmış eylemi anlatır. делать = yapmak (süreç), сделать = yapıp BİTİRMEK (sonuç). Türkçedeki "yapıyordum / yaptım-bitirdim" farkını Rusça bu ikizlerle çözer.',
    keyPoints: [
      'НСВ (bitmemiş): süreç, tekrar, alışkanlık → читать, делать, писать.',
      'СВ (bitmiş): tek seferlik ve TAMAMLANMIŞ eylem → прочитать, сделать, написать.',
      'СВ çoğu zaman önekle yapılır: с-делать, про-читать, на-писать. Bazen kök değişir: говорить/сказать.',
      'Geçmişte fark netleşir: Я читал книгу (okuyordum, belki bitmedi) / Я прочитал книгу (okudum ve BİTİRDİM).',
      'СВ fiillerin şimdiki zamanı YOKTUR — bitmiş bir şey "şu anda" olamaz!'
    ],
    changeRules: [
      {
        label: 'En önemli ikiz çiftleri',
        explanation: 'Bunları çift olarak ezberle, tek tek değil:',
        examples: [
          'делать / сделать = yapmak / yapıp bitirmek',
          'читать / прочитать = okumak / okuyup bitirmek',
          'писать / написать = yazmak / yazıp bitirmek',
          'говорить / сказать = konuşmak / söylemek (tek seferlik)',
          'покупать / купить = satın almak (süreç/tekrar) / satın alıvermek',
          'учить / выучить = çalışmak-öğrenmek / öğrenip bitirmek'
        ]
      },
      {
        label: 'Geçmişte görünüş farkı',
        explanation: 'Aynı Türkçe cümle, iki farklı Rusça anlam:',
        examples: [
          'Вчера я читал книгу. = Dün kitap okuyordum. (süreç — bitti mi belli değil)',
          'Вчера я прочитал книгу. = Dün kitabı okuyup BİTİRDİM. (sonuç)',
          'Я писал письмо. = Mektup yazıyordum.',
          'Я написал письмо. = Mektubu yazdım, hazır!'
        ]
      }
    ],
    examples: [
      { ru: 'Каждый день я читаю газету.', reading: 'Kájdıy dyen\' ya çitáyu gazyétu.', tr: 'Her gün gazete okurum.', predicate: 'читаю = НСВ (alışkanlık)', note: '"her gün" gibi tekrar bildiren ifadeler HEP bitmemiş görünüşle gider.' },
      { ru: 'Я прочитал эту книгу за два дня.', reading: 'Ya praçitál étu knígu za dva dnya.', tr: 'Bu kitabı iki günde okuyup bitirdim.', predicate: 'прочитал = СВ (sonuç)', note: '"за два дня" (iki günde) sonuç vurgusudur → bitmiş görünüş.' },
      { ru: 'Что ты сказал?', reading: 'Şto tı skazál?', tr: 'Ne dedin?', predicate: 'сказал = СВ', note: 'говорить/сказать çifti kök değiştiren en ünlü ikizdir.' }
    ],
    miniChecklist: [
      'Süreç mi, sonuç mu? Önce bunu sor.',
      '"Her gün, sık sık, uzun uzun" → bitmemiş (НСВ).',
      '"Bir kere, sonunda, tamamen bitti" → bitmiş (СВ).',
      'Fiilleri çift olarak öğren: делать/сделать tek kart!'
    ],
    quiz: [
      { prompt: '«Kitabı sonuna kadar okudum, bitti!» — hangi fiil?', correct: 'прочитал', options: ['прочитал', 'читал', 'читаю', 'буду читать'] },
      { prompt: '«Каждый день я ___ кофе.» (her gün içerim) — hangisi doğru?', correct: 'пью (НСВ)', options: ['пью (НСВ)', 'выпью (СВ)', 'выпил (СВ)', 'выпить'] },
      { prompt: 'делать fiilinin bitmiş (СВ) ikizi hangisi?', correct: 'сделать', options: ['сделать', 'делаться', 'наделать', 'доделывать'] },
      { prompt: 'Bitmiş görünüş (СВ) fiillerin hangi zamanı YOKTUR?', correct: 'Şimdiki zaman', options: ['Şimdiki zaman', 'Geçmiş zaman', 'Gelecek zaman', 'Hepsi vardır'] }
    ]
  },
  {
    id: 'tense_future_perfective',
    levelGroup: 'A2',
    title: 'Zamanlar 9/10 — Basit Gelecek: Tek Kelimede "Yapıp Bitireceğim"',
    description: 'Прочитаю, куплю, скажу: bitmiş fiili çek, gelecek hazır!',
    icon: '🚀',
    color: '#8b5cf6',
    coreConcept: 'İşte görünüş sisteminin en şık numarası: bitmiş görünüş (СВ) fiilini ŞİMDİKİ ZAMAN gibi çekersen GELECEK anlamı çıkar! Çünkü bitmiş bir eylem "şu anda" olamaz — çekim otomatik olarak geleceğe kayar. Я прочитаю = okuyup bitireceğim. Я скажу = söyleyeceğim. Tek kelime, net söz: iş TAMAMLANACAK.',
    keyPoints: [
      'СВ fiil + şimdiki zaman ekleri = BASİT GELECEK: прочитаю (okuyup bitireceğim).',
      'İki gelecek arasındaki fark: буду читать = okuyacağım (süreç) / прочитаю = okuyup BİTİRECEĞİM (sonuç).',
      'Söz verirken, net plan yaparken basit gelecek kullanılır: Я позвоню! = Arayacağım (kesin)!',
      'СВ fiille "буду" ASLA birleşmez: "буду прочитать" diye bir şey YOKTUR.'
    ],
    changeRules: [
      {
        label: 'ПРОЧИТАТЬ → basit gelecek çekimi',
        explanation: 'Ekler şimdiki zamanla birebir aynı, ama anlam gelecek:',
        examples: [
          'я прочитаю = okuyup bitireceğim',
          'ты прочитаешь = okuyup bitireceksin',
          'он прочитает = okuyup bitirecek',
          'мы прочитаем / вы прочитаете / они прочитают'
        ]
      },
      {
        label: 'Günlük hayatın basit gelecekleri',
        explanation: 'Bu formlar Rus günlük konuşmasının bel kemiğidir:',
        examples: [
          'Я скажу. = Söyleyeceğim. (сказать)',
          'Я куплю хлеб. = Ekmek alacağım. (купить)',
          'Я позвоню вечером. = Akşam arayacağım. (позвонить)',
          'Мы сделаем это завтра. = Bunu yarın yapacağız/halledeceğiz. (сделать)'
        ]
      },
      {
        label: 'İki geleceği yan yana gör',
        explanation: 'Aynı fiil ailesi, iki farklı gelecek:',
        examples: [
          'Вечером я буду писать письмо. = Akşam mektup yazacağım (yazmakla meşgul olacağım).',
          'Вечером я напишу письмо. = Akşam mektubu yazıp BİTİRECEĞİM.'
        ]
      }
    ],
    examples: [
      { ru: 'Я куплю билеты завтра.', reading: 'Ya kuplyú bilyétı záftra.', tr: 'Biletleri yarın alacağım.', predicate: 'куплю = basit gelecek (СВ)', note: 'купить\'in я formunda любить gibi Л sürprizi var: kupLYÚ.' },
      { ru: 'Ты мне позвонишь?', reading: 'Tı mnye pazvaníş?', tr: 'Beni arayacak mısın?', predicate: 'позвонишь = basit gelecek', note: 'Netlik ve söz isteyen soru: arayacak mısın (kesin olarak)?' },
      { ru: 'Мы всё сделаем.', reading: 'Mı fsyo sdyélaim.', tr: 'Her şeyi halledeceğiz.', predicate: 'сделаем = basit gelecek', note: 'сделать = yapıp bitirmek; söz veriyoruz: iş TAMAMLANACAK.' }
    ],
    miniChecklist: [
      'СВ fiili şimdiki zaman gibi çek → gelecek anlamı otomatik gelir.',
      'Süreç anlatacaksan буду + НСВ mastar; sonuç söz veriyorsan СВ çekimi.',
      '"буду + СВ mastar" kombinasyonunu asla kurma: буду сделать ❌.'
    ],
    quiz: [
      { prompt: '«Я ___ эту книгу за неделю.» (bir haftada okuyup bitireceğim)', correct: 'прочитаю', options: ['прочитаю', 'буду прочитать', 'читаю', 'читал'] },
      { prompt: 'Hangisi kesin söz verir: "Arayacağım!"?', correct: 'Я позвоню!', options: ['Я позвоню!', 'Я звонил!', 'Я буду звонить иногда.', 'Я звоню.'] },
      { prompt: 'Hangisi YANLIŞTIR?', correct: 'Я буду купить хлеб.', options: ['Я буду купить хлеб.', 'Я куплю хлеб.', 'Я буду покупать хлеб.', 'Я купил хлеб.'] },
      { prompt: '«прочитаю» neden gelecek anlamı taşır?', correct: 'Bitmiş fiilin şimdiki zamanı olamayacağı için', options: ['Bitmiş fiilin şimdiki zamanı olamayacağı için', 'Özel gelecek eki aldığı için', 'буду gizli olduğu için', 'Vurgu sonda olduğu için'] }
    ]
  },
  {
    id: 'tense_review',
    levelGroup: 'A2',
    title: 'Zamanlar 10/10 — Zaman Zarfları ve Büyük Final',
    description: 'Вчера, сегодня, завтра... Tüm zamanları tek turnuvada birleştir!',
    icon: '🏆',
    color: '#eab308',
    coreConcept: 'Zamanların pusulası zarflardır: вчера (dün) geçmişi, сейчас (şimdi) şimdiyi, завтра (yarın) geleceği çağırır. Bir de gizli silah: Ruslar yakın ve kesin planları ŞİMDİKİ zamanla anlatır! "Завтра я иду в кино" = Yarın sinemaya gidiyorum (Türkçedeki gibi!). Bu son ünitede tüm zamanları tek tabloda birleştiriyoruz.',
    keyPoints: [
      'Geçmiş zarfları: вчера (dün), позавчера (evvelsi gün), раньше (eskiden), давно (uzun zaman önce).',
      'Şimdi zarfları: сейчас (şimdi), сегодня (bugün), теперь (artık).',
      'Gelecek zarfları: завтра (yarın), послезавтра (öbür gün), скоро (yakında), потом (sonra).',
      'Tekrar zarfları: всегда (hep), часто (sık sık), иногда (bazen), никогда (asla) → bunlar НСВ ile gider.',
      'Kesin plan + şimdiki zaman = gelecek: Завтра я иду в кино. = Yarın sinemaya gidiyorum.'
    ],
    changeRules: [
      {
        label: 'BÜYÜK ZAMAN TABLOSU — читать fiili tüm cephelerde',
        explanation: 'Bu tabloyu okuyabiliyorsan zamanları çözdün demektir:',
        examples: [
          'GEÇMİŞ (süreç): Я читал. = Okuyordum/okudum.',
          'GEÇMİŞ (sonuç): Я прочитал. = Okuyup bitirdim.',
          'ŞİMDİ: Я читаю. = Okuyorum.',
          'GELECEK (süreç): Я буду читать. = Okuyacağım/okuyor olacağım.',
          'GELECEK (sonuç): Я прочитаю. = Okuyup bitireceğim.'
        ]
      },
      {
        label: 'Zarf → zaman eşleşmesi',
        explanation: 'Zarfı duyduğun an doğru zamanı seç:',
        examples: [
          'вчера, раньше, давно → geçmiş: Вчера я работал.',
          'сейчас, сегодня → şimdiki: Сейчас я работаю.',
          'завтра, скоро → gelecek: Завтра я буду работать.',
          'всегда, часто, иногда → bitmemiş görünüş (hangi zamanda olursa olsun)'
        ]
      },
      {
        label: 'Şimdiki zamanla gelecek anlatma',
        explanation: 'Takvime yazılmış kesin planlar için Ruslar da şimdiki zamanı kullanır:',
        examples: [
          'Завтра я иду к врачу. = Yarın doktora gidiyorum.',
          'В субботу мы едем на дачу. = Cumartesi yazlığa gidiyoruz.',
          'Поезд отправляется в 8. = Tren 8\'de kalkıyor.'
        ]
      }
    ],
    examples: [
      { ru: 'Раньше я жил в Измире, сейчас живу в Стамбуле, а скоро буду жить в Москве.', reading: 'Rán\'şe ya jıl v İzmírye, siyçás jıvú f Stambúlye, a skóra búdu jıt\' v Maskvyé.', tr: 'Eskiden İzmir\'de yaşıyordum, şimdi İstanbul\'da yaşıyorum, yakında Moskova\'da yaşayacağım.', predicate: 'жил → живу → буду жить', note: 'Tek cümlede üç zaman! Zarflar yolu gösteriyor: раньше → сейчас → скоро.' },
      { ru: 'Я часто читал, но эту книгу так и не прочитал.', reading: 'Ya çásta çitál, no étu knígu tak i nye praçitál.', tr: 'Sık sık okurdum ama bu kitabı bir türlü bitiremedim.', predicate: 'читал (НСВ) / прочитал (СВ)', note: 'часто → süreç fiili; "bitirmek" → sonuç fiili. Görünüş farkı sahnede.' },
      { ru: 'Завтра я иду на урок русского.', reading: 'Záftra ya idú na urók rúskava.', tr: 'Yarın Rusça dersine gidiyorum.', predicate: 'иду = şimdiki form, gelecek anlam', note: 'Kesin plan: şimdiki zaman gelecek işi görüyor — Türkçeyle birebir aynı mantık!' }
    ],
    miniChecklist: [
      'Önce zarfı yakala: вчера/сейчас/завтра sana zamanı fısıldar.',
      'Sonra görünüşü seç: süreç mi (НСВ), sonuç mu (СВ)?',
      'Beş formluk tabloyu tekrar et: читал, прочитал, читаю, буду читать, прочитаю.',
      'Kesin planları şimdiki zamanla söylemeyi dene: Завтра я иду...'
    ],
    quiz: [
      { prompt: '«___ я был в кино.» — boşluğa hangi zarf uyar?', correct: 'Вчера', options: ['Вчера', 'Завтра', 'Сейчас', 'Скоро'] },
      { prompt: '«Завтра я ___ работать.» — doğru form?', correct: 'буду', options: ['буду', 'был', 'есть', 'быть'] },
      { prompt: '«Я часто ___ в парке.» (sık sık yürürüm) — hangi görünüş?', correct: 'гуляю (НСВ)', options: ['гуляю (НСВ)', 'погуляю (СВ)', 'погулял (СВ)', 'погулять'] },
      { prompt: '«Завтра я иду в кино.» cümlesi neden şimdiki zamanla kurulmuş?', correct: 'Kesin planlar şimdiki zamanla anlatılabilir', options: ['Kesin planlar şimdiki zamanla anlatılabilir', 'Yanlış kurulmuş bir cümledir', 'иду gelecek zaman ekidir', 'завтра "bugün" demektir'] }
    ]
  },
];
