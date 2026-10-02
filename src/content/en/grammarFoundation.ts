// ============================================================================
// 🇬🇧 İNGİLİZCE CÜMLE TEMELİ + ZAMANLAR PAKETİ — 17 ÜNİTE
// ----------------------------------------------------------------------------
// Rusça grammarFoundationData.ts ile BİREBİR aynı akış: özne/yüklem temeli,
// sayılar, 10 zaman ünitesi, edatlar ve cümle laboratuvarı.
// ÖNEMLİ: id'ler Rusça paketlerle aynı şemayı izler (num_*, gram_*,
// tense_*) — RescueTest, skillKeyForGrammarUnit ve FOUNDATION_ORDER
// eşlemeleri böylece İngilizce modunda da aynen çalışır.
// ============================================================================

import type { GrammarFoundationUnit } from '../../grammarFoundationData';

export const EN_GRAMMAR_FOUNDATION_UNITS: GrammarFoundationUnit[] = [
  {
    id: 'gram_sentence_core',
    levelGroup: 'A1',
    title: 'Cümlenin İskeleti: Özne + Yüklem + Nesne',
    description: 'İngilizce cümlenin ilk kuralı: SVO sırası sapmaz.',
    icon: '🧩',
    color: '#22c55e',
    coreConcept: 'İngilizce cümle katı bir sıra izler: Özne (Subject) + Yüklem (Verb) + Nesne (Object). "I drink coffee" → Ben kahve içerim. Sırayı bozarsan cümle ya anlamsızlaşır ya da soruya dönüşür!',
    keyPoints: [
      'İngilizce SVO dilidir: Subject + Verb + Object. Türkçenin SOV sırasından farklı!',
      '"Anna reads a book." → Anna (kim?) + reads (ne yapıyor?) + a book (neyi?).',
      'Sıra değişirse anlam değişir: "The dog bites the man." ≠ "The man bites the dog."',
      'Zaman ve kişi yüklemde gizlidir: "She works." — özne belli, zaman belli.',
      'Soru yapmak için sıra TERS döner: "Do you work?" (yardımcı fiil başa gider).'
    ],
    examples: [
      { ru: 'I drink tea every morning.', reading: 'ay DRINGK TII EVri MORning', tr: 'Her sabah çay içerim.', note: 'I + drink + tea: model SVO cümlesi.' },
      { ru: 'Anna reads a book.', reading: 'ENA riDZ e BUK', tr: 'Anna bir kitap okur.', note: 'Özne + yüklem + nesne — bu sıra İngilizcede ASLA değişmez.' },
      { ru: 'The dog bites the man.', reading: 'de DOG BAYTS de MEN', tr: 'Köpek adamı ısırır.', note: 'Kim ısırıyor? Köpek. Sıra kimin ne yaptığını belirler!' }
    ],
    miniChecklist: [
      'SVO sırasını Türkçenin SOV sırasından ayırabiliyor musun?',
      'Bir cümlede özne, yüklem ve nesneyi işaretleyebiliyor musun?',
      'Sırayı bozunca anlamın nasıl değiştiğini görüyor musun?'
    ],
    quiz: [
      { prompt: 'İngilizce cümlenin temel sırası hangisidir?', correct: 'Özne + Yüklem + Nesne', options: ['Özne + Yüklem + Nesne', 'Yüklem + Özne + Nesne', 'Nesne + Yüklem + Özne', 'Özne + Nesne + Yüklem'] },
      { prompt: '"Anna reads a book." cümlesinde yüklem hangisidir?', correct: 'reads', options: ['reads', 'Anna', 'a book', 'the'] },
      { prompt: 'Hangi cümle "Köpek adamı ısırır" anlamına gelir?', correct: 'The dog bites the man.', options: ['The dog bites the man.', 'The man bites the dog.', 'Bites the dog the man.', 'The man the dog bites.'] },
      { prompt: 'Türkçenin sözcük sırası hangisidir?', correct: 'Özne + Nesne + Yüklem (SOV)', options: ['Özne + Nesne + Yüklem (SOV)', 'Özne + Yüklem + Nesne (SVO)', 'Yüklem + Özne + Nesne', 'Serbest sıra'] }
    ]
  },
  {
    id: 'gram_subject',
    levelGroup: 'A1',
    title: 'Özne: Kişiler ve Zamirler',
    description: 'I, you, he, she, it, we, they — İngilizcenin 7 adres etiketi.',
    icon: '👤',
    color: '#f59e0b',
    coreConcept: 'Özne, cümlenin "kim / ne" parçasıdır. İsimler yerine zamirler kullanılır: I (ben), you (sen/siz), he (o-erkek), she (o-kadın), it (o-cansız/hayvan), we (biz), they (onlar). Türkçedeki gibi zamirleri ATLAYAMAZSIN: İngilizce her cümlede özne görünmek zorundadır!',
    keyPoints: [
      'Zamirler: I, you, he, she, it, we, they.',
      'Türkçeden fark: özne ASLA gizlenmez! "Works" değil, "She works." denir.',
      '"it" cansız varlıklar ve hayvanlar içindir: "It is raining." (Yağmur yağıyor.)',
      '"you" hem tekil (sen) hem çoğuldur (siz) — İngilizcede ayrım yok.',
      'Özne her zaman yüklemin KİŞİSİNİ belirler: he/she/it → fiile -s eklenir.'
    ],
    examples: [
      { ru: 'She works in a hospital.', reading: 'ŞI UORKS in e HOSpital', tr: 'O (kadın) bir hastanede çalışır.', note: 'she + works: 3. tekil şahısta fiil -s alır.' },
      { ru: 'They are students.', reading: 'DEY AR STYUdınts', tr: 'Onlar öğrenci.', note: 'they + are: çoğul öznelere are gelir.' },
      { ru: 'It is cold today.', reading: 'İT İZ KOULD tuDEY', tr: 'Bugün hava soğuk.', note: 'Hava gibi "cansız" durumlar da it ile öznelenir.' }
    ],
    miniChecklist: [
      '7 zamiri sırasıyla sayabiliyor musun?',
      'İngilizcede öznenin neden her zaman görünmesi gerektiğini biliyor musun?',
      'he/she/it ile fiile gelen -s ekini hatırlıyor musun?'
    ],
    quiz: [
      { prompt: '"O (kadın) bir gazete okur." hangisi?', correct: 'She reads a newspaper.', options: ['She reads a newspaper.', 'Her reads a newspaper.', 'She read a newspaper.', 'It reads a newspaper.'] },
      { prompt: 'Cansız varlıklar için hangi zamir kullanılır?', correct: 'it', options: ['it', 'he', 'she', 'they'] },
      { prompt: 'İngilizcede özne hangi durumda gizlenebilir?', correct: 'Hiçbir zaman (emir hariç)', options: ['Hiçbir zaman (emir hariç)', 'Her zaman', 'Sadece sorularda', 'Sadece geçmiş zamanda'] },
      { prompt: '"We ___ from Turkey." boşluğa ne gelir?', correct: 'are', options: ['are', 'is', 'am', 'be'] }
    ]
  },
  {
    id: 'gram_predicate',
    levelGroup: 'A1',
    title: 'Yüklem: Fiiller ve "to be"',
    description: 'İngilizce fiillerin iki büyük ailesi: normal fiiller ve to be.',
    icon: '⚡',
    color: '#8b5cf6',
    coreConcept: 'İngilizcede iki tür yüklem var: 1) "to be" (am/is/are — var olmak): "I am a student." 2) Normal fiiller (work, read, go...): "I work." En büyük kural: to be ile normal fiil ASLA birlikte kullanılmaz — "I am work" YANLIŞ!',
    keyPoints: [
      'to be: I am, you are, he/she/it is, we are, they are.',
      'Normal fiillerde 3. tekil şahıs (he/she/it) -s alır: he works, she reads.',
      'Olumsuz: to be → "is not / aren\'t"; normal fiil → "doesn\'t work / don\'t work".',
      'Soru: to be → "Are you...?"; normal fiil → "Do you work?"',
      '"There is / There are" = "var": There is a cat. There are two cats.'
    ],
    examples: [
      { ru: 'I am a teacher.', reading: 'ay EM e TIİçır', tr: 'Ben öğretmenim.', note: 'Meslek söylemede to be kullanılır: I am + meslek.' },
      { ru: 'He works every day.', reading: 'hi UORKS EVri DEY', tr: 'O her gün çalışır.', note: 'Normal fiil: he/she/it → fiil + s.' },
      { ru: 'There is a big park near my house.', reading: 'der İZ e BIG PARK NIIR may HAUS', tr: 'Evimin yakınında büyük bir park var.', note: '"var" anlamı: there is (tekil) / there are (çoğul).' }
    ],
    miniChecklist: [
      'am/is/are dağılımını ezberledin mi?',
      'Normal fiillerde -s kuralını uygulayabiliyor musun?',
      '"I am work" gibi bir cümlenin neden yanlış olduğunu açıklayabiliyor musun?'
    ],
    quiz: [
      { prompt: '"Ben bir doktorum." hangisi?', correct: 'I am a doctor.', options: ['I am a doctor.', 'I is a doctor.', 'I are a doctor.', 'I be a doctor.'] },
      { prompt: '"She ___ to music." boşluğa ne gelir?', correct: 'listens', options: ['listens', 'listen', 'listening', 'is listen'] },
      { prompt: 'Hangisi YANLIŞ?', correct: 'I am work here.', options: ['I am work here.', 'I work here.', 'I am here.', 'I am working here.'] },
      { prompt: '"Sınıfta 20 öğrenci ___" boşluk?', correct: 'There are', options: ['There are', 'There is', 'It is', 'They is'] }
    ]
  },
  {
    id: 'num_0_20',
    levelGroup: 'A1',
    title: 'Sayılar 0-20: Say, Sor, Cevapla',
    description: 'Alfabeden hemen sonra ilk pratik araç: sayıları tanı ve kullan.',
    icon: '🔢',
    color: '#06b6d4',
    coreConcept: 'Sayılar günlük hayatın anahtarıdır: fiyat, saat, yaş, telefon numarası. İngilizcede 13-19 arası "-teen" ile kurulur (thirteen = 13), 11-12 ise kural dışıdır (eleven, twelve) — bunlar ezberlenir!',
    keyPoints: [
      '0-10: zero, one, two, three, four, five, six, seven, eight, nine, ten.',
      '11-12 kural dışı: eleven (11), twelve (12).',
      '13-19 "-teen" ile biter: thirteen (13), fifteen (15 — five→fif!), eighteen (18 — sadece t bir kez!), nineteen (19).',
      '"How many?" = "Kaç tane?" sorusudur: How many books do you have?',
      'Yaş sorma: "How old are you?" — cevap: "I am twenty (years old)."'
    ],
    examples: [
      { ru: 'One, two, three, four, five.', reading: 'UAN, TUU, θRII, FOR, FAYV', tr: 'Bir, iki, üç, dört, beş.', note: 'İlk beş sayı — yüksek sesle say, parmaklarınla göster.' },
      { ru: 'I am nineteen years old.', reading: 'ay EM naynTIIN YIRZ OLD', tr: 'Ben on dokuz yaşındayım.', note: 'Yaş kalıbı: I am + sayı + years old.' },
      { ru: 'How much is this? — It is ten dollars.', reading: 'hau MADŞ İZ Dis? — İT İZ TEN DOLırz', tr: 'Bu ne kadar? — On dolar.', note: 'Fiyat sorma-cevaplama: sayılar olmadan alışveriş yapılamaz.' },
      { ru: 'I have two brothers and one sister.', reading: 'ay HEV TUU BRA-dırz end UAN SIS-tır', tr: 'İki erkek kardeşim ve bir kız kardeşim var.', note: 'have + sayı: sahiplik bildirir.' }
    ],
    miniChecklist: [
      '0-10\'u ezberden, sırayla ve geriye doğru sayabiliyor musun?',
      'eleven ve twelve\'in kural dışı olduğunu hatırlıyor musun?',
      '"How many?" sorusuna sayıyla cevap verebiliyor musun?'
    ],
    quiz: [
      { prompt: '"Beş" İngilizce nasıl söylenir?', correct: 'five', options: ['five', 'nine', 'two', 'seven'] },
      { prompt: '"twelve" kaçtır?', correct: '12', options: ['12', '20', '2', '11'] },
      { prompt: '"Ben yirmi yaşındayım" hangisi?', correct: 'I am twenty years old.', options: ['I am twenty years old.', 'I have twenty years.', 'I twenty years am.', 'My age is twenty year.'] },
      { prompt: '"Bu ne kadar?" diye nasıl sorulur?', correct: 'How much is this?', options: ['How much is this?', 'How many is this?', 'What much is this?', 'Where is this?'] },
      { prompt: '"13" hangisidir?', correct: 'thirteen', options: ['thirteen', 'thirty', 'threety', 'threeteen'] }
    ]
  },
  {
    id: 'num_big',
    levelGroup: 'A1',
    title: 'Sayılar 20-1000: -teen mi -ty mi?',
    description: 'Onluklar, yüzler ve binler — 13/30 tuzağını çöz.',
    icon: '💯',
    color: '#0ea5e9',
    coreConcept: 'Onluklar "-ty" ile biter: twenty (20), thirty (30), forty (40 — u yok!), fifty (50). 13 (thirteen) ile 30 (thirty) arasındaki fark hayat kurtarır: -teen UZUN ve vurgu sondadır, -ty KISA ve vurgu baştadır!',
    keyPoints: [
      'Onluklar: twenty (20), thirty (30), forty (40 — "fourty" YANLIŞ!), fifty (50), sixty (60), seventy (70), eighty (80), ninety (90).',
      'hundred (100), thousand (1000): "a hundred" / "one hundred" ikisi de olur.',
      'Birleştirme: 42 = forty-two (ara çizgiyle!); 135 = a hundred and thirty-five.',
      '13-19 (-teen) ile 20-90 (-ty) ayrımı: thirteen/θörTIIN vs thirty/θörTI.',
      'Fiyat: $9.99 → "nine ninety-nine" veya "nine dollars ninety-nine cents".'
    ],
    changeRules: [
      {
        label: '-teen / -ty ayrımı (yaş ve fiyat tuzağı)',
        explanation: 'Vurgu yeri her şeyi çözer: thirTEEN (13) vurgu sonda, THIRty (30) vurgu başta. Sayı yazıyla değil kulakla ayrışır.',
        examples: ['She is thirteen. (13 yaşında)', 'She is thirty. (30 yaşında)', 'fifteen dollars (15$) ≠ fifty dollars (50$)']
      }
    ],
    examples: [
      { ru: 'This costs three hundred dollars.', reading: 'Dis KOSTS TRII HANdırıd DOLırz', tr: 'Bu üç yüz dolar.', note: 'hundred/thousand sonra hep tekil kalır: three hundred (hundreds YANLIŞ).' },
      { ru: 'My number is five five five, two three nine...', reading: 'may NAMbır İZ FAYV FAYV FAYV, TUU TRII NAYN', tr: 'Numaram beş beş beş, iki üç dokuz...', note: 'Telefon numaraları tek tek okunur.' },
      { ru: 'There are forty-two students in the class.', reading: 'der AR FOR-ti TUU STYUdınts in di KLES', tr: 'Sınıfta kırk iki öğrenci var.', note: '42 = forty-two: onluk + çizgi + birlik.' },
      { ru: 'The meeting is at ten fifteen.', reading: 'di MİIting İZ ET ten fifTIIN', tr: 'Toplantı on on beşte.', note: 'Saatlerde 10:15 → "ten fifteen".' }
    ],
    miniChecklist: [
      'forty\'nin "fourty" olmadığını hatırlıyor musun?',
      '13 ile 30\'u telaffuzda ayırt edebiliyor musun?',
      '347 gibi bir sayıyı üç parçada kurabiliyor musun?'
    ],
    quiz: [
      { prompt: '"40" İngilizce hangisi?', correct: 'forty', options: ['forty', 'fourty', 'forteen', 'fourtyy'] },
      { prompt: '"fifty-six" kaçtır?', correct: '56', options: ['56', '65', '506', '16'] },
      { prompt: '"200" hangisi?', correct: 'two hundred', options: ['two hundred', 'two hundreds', 'hundred two', 'twenty hundred'] },
      { prompt: 'Sekiz yüz kırk beş nasıl söylenir?', correct: 'eight hundred and forty-five', options: ['eight hundred and forty-five', 'eight hundreds forty five', 'eighty hundred forty-five', 'eight-four-five hundred'] },
      { prompt: '"1000" İngilizce nedir?', correct: 'thousand', options: ['thousand', 'million', 'hundred', 'ten hundred'] }
    ]
  },
  // ZAMANLAR (TENSES) PAKETİ — İngilizce fiil zamanları: 12 zaman sisteminin
  // temeli burada atılır: present/past/future × simple/continuous/perfect.
  {
    id: 'tense_overview',
    levelGroup: 'A1',
    title: 'Zaman Haritası: İngilizcenin 12 Zamanı',
    description: 'Bütün resmi önce gör: 3 zaman × 4 görünüş = 12 kapı.',
    icon: '🗺️',
    color: '#6366f1',
    coreConcept: 'İngilizcede zamanlar bir TABLO gibidir: present / past / future satırları, simple / continuous / perfect / perfect-continuous sütunları. Her hücrenin kendine ait bir kalıbı vardır. Bu ünitede tabloyu GEZİYORUZ — her kapıyı sonra tek tek açacağız.',
    keyPoints: [
      'Simple: genel gerçekler ve alışkanlıklar — "I work."',
      'Continuous (-ing): tam o anda oluyor — "I am working."',
      'Perfect (have + V3): tamamlanmış, şimdiye etkisi var — "I have worked."',
      'Perfect Continuous: süregelen eylem — "I have been working."',
      'Bu 4 görünüş 3 zamana yayılır: present, past, future → 12 zaman.'
    ],
    examples: [
      { ru: 'I work every day. (Present Simple)', reading: 'ay UORK EVri DEY', tr: 'Her gün çalışırım.', note: 'Alışkanlık → simple.' },
      { ru: 'I am working now. (Present Continuous)', reading: 'ay EM UORking NAU', tr: 'Şu anda çalışıyorum.', note: 'Şu an → am + -ing.' },
      { ru: 'I have worked here for two years. (Present Perfect)', reading: 'ay HEV UORKT HIR for TUU YIRZ', tr: 'İki yıldır burada çalışıyorum.', note: 'Süreç devam ediyor → have + V3.' }
    ],
    miniChecklist: [
      'Simple ile continuous\'un farkını tek cümleyle anlatabiliyor musun?',
      'Perfect\'in "etkisi şimdiye sızan geçmiş" olduğunu biliyor musun?',
      '12 hücrenin isimlerini sayabiliyor musun?'
    ],
    quiz: [
      { prompt: '"Şu anda oluyor" anlamı hangi görünüşle verilir?', correct: 'Continuous (-ing)', options: ['Continuous (-ing)', 'Simple', 'Perfect', 'Perfect Continuous'] },
      { prompt: 'Present Perfect kalıbı hangisidir?', correct: 'have/has + V3', options: ['have/has + V3', 'am/is/are + V-ing', 'will + V1', 'did + V1'] },
      { prompt: '"I work every day" hangi zamandır?', correct: 'Present Simple', options: ['Present Simple', 'Present Continuous', 'Present Perfect', 'Past Simple'] },
      { prompt: 'İngilizcede toplam kaç temel zaman yapısı vardır?', correct: '12', options: ['12', '3', '6', '24'] }
    ]
  },
  {
    id: 'tense_present_e',
    levelGroup: 'A1',
    title: 'Present Simple: Alışkanlıklar',
    description: 'Her gün yaptığın her şey bu zamanda konuşulur.',
    icon: '🔁',
    color: '#10b981',
    coreConcept: 'Present Simple, tekrar eden gerçekleri anlatır: alışkanlıklar (I drink coffee), genel doğrular (The sun rises in the east), programlar (The train leaves at nine). Kalıp basittir: özne + fiil(1. hâl). Tek zorluk: he/she/it için fiile -s gelir!',
    keyPoints: [
      'Olumlu: I/you/we/they + fiil; he/she/it + fiil + s (he works, she reads, it rains).',
      '-s kuralları: watch → watches, study → studies, go → goes, play → plays.',
      'Olumsuz: don\'t / doesn\'t + fiil (s harfi YOK!): "He doesn\'t work." (doesn\'t works YANLIŞ)',
      'Soru: Do/Does + özne + fiil: "Do you work?" / "Does she work?"',
      'Zaman zarfları: always, usually, often, sometimes, never, every day.'
    ],
    examples: [
      { ru: 'She works in a bank.', reading: 'ŞI UORKS in e BENK', tr: 'O bir bankada çalışır.', note: 'she → works: 3. tekil -s.' },
      { ru: 'I don\'t drink coffee at night.', reading: 'ay DOUNT DRINGK KOFi et NAYT', tr: 'Geceleri kahve içmem.', note: 'don\'t + fiil: olumsuz.' },
      { ru: 'Does he speak English? — Yes, he does.', reading: 'DAS hi SPIIK INGliş? — YES, hi DAS', tr: 'O İngilizce konuşur mu? — Evet, konuşur.', note: 'Does ile soru, kısa cevapta does.' },
      { ru: 'Water boils at 100 degrees.', reading: 'UO-tır BOYLZ et e HANdırıd diGRIIZ', tr: 'Su 100 derecede kaynar.', note: 'Genel doğrular da Present Simple.' }
    ],
    miniChecklist: [
      'he/she/it fiilinde -s eklemeyi otomatikleştirdin mi?',
      'doesn\'t sonrası fiili s\'siz bırakmayı hatırlıyor musun?',
      'always/usually/sometimes/never zarflarını kullanabiliyor musun?'
    ],
    quiz: [
      { prompt: '"O (erkek) futbol oynar." hangisi?', correct: 'He plays football.', options: ['He plays football.', 'He play football.', 'He playing football.', 'He is play football.'] },
      { prompt: 'Olumsuz: "Biz kahve içmeyiz."', correct: 'We don\'t drink coffee.', options: ['We don\'t drink coffee.', 'We doesn\'t drink coffee.', 'We don\'t drinks coffee.', 'We not drink coffee.'] },
      { prompt: 'Hangi cümle YANLIŞ?', correct: 'She don\'t like tea.', options: ['She don\'t like tea.', 'She doesn\'t like tea.', 'She likes tea.', 'Does she like tea?'] },
      { prompt: '"watch" fiili he öznesiyle ne olur?', correct: 'watches', options: ['watches', 'watchs', 'watch', 'watchies'] }
    ]
  },
  {
    id: 'tense_present_i',
    levelGroup: 'A1',
    title: 'Present Continuous: Şu Anda',
    description: 'Tam şimdi, bu saniye olan her şey: am/is/are + -ing.',
    icon: '⏱️',
    color: '#3b82f6',
    coreConcept: 'Present Continuous, tam olarak ŞU ANDA olan işleri anlatır: "I am studying." (Şu anda ders çalışıyorum.) Ayrıca yakında planlanmış gelecek için de kullanılır: "I am meeting Anna tomorrow." Kalıp: am/is/are + fiil-ing.',
    keyPoints: [
      'Kalıp: I am + V-ing / he-she-it is + V-ing / you-we-they are + V-ing.',
      '-ing kuralları: write → writing (e düşer), run → running (ünsüz ikileşir), study → studying (y kalır).',
      'Olumsuz: am/is/are + not: "She isn\'t sleeping."',
      'Soru: Are you working? / Is he coming?',
      'Zaman zarfları: now, right now, at the moment, today, Look!, Listen!'
    ],
    examples: [
      { ru: 'I am studying English now.', reading: 'ay EM STADiing INGliş NAU', tr: 'Şu anda İngilizce çalışıyorum.', note: 'am + studying: şu an.' },
      { ru: 'Look! It is raining.', reading: 'LUK! İT İZ REYning', tr: 'Bak! Yağmur yağıyor.', note: 'Look!/Listen! sinyal kelimeleri continuous ister.' },
      { ru: 'They aren\'t watching TV.', reading: 'DEY ARNT UOÇing TIIVII', tr: 'Onlar TV izlemiyorlar.', note: 'aren\'t + watching: olumsuz.' },
      { ru: 'What are you doing? — I am cooking.', reading: 'UOT AR yu DUing? — ay EM KUKing', tr: 'Ne yapıyorsun? — Yemek yapıyorum.', note: 'En sık kullanılan continuous diyaloğu.' }
    ],
    miniChecklist: [
      'am/is/are dağılımını -ing ile birlikte kurabiliyor musun?',
      'write→writing, run→running gibi yazım kurallarını biliyor musun?',
      'Present Simple (alışkanlık) ile Present Continuous (şu an) ayrımını yapıyor musun?'
    ],
    quiz: [
      { prompt: '"O (kadın) şu anda kitap okuyor." hangisi?', correct: 'She is reading a book.', options: ['She is reading a book.', 'She reads a book.', 'She reading a book.', 'She is read a book.'] },
      { prompt: '"write" fiilinin -ing biçimi?', correct: 'writing', options: ['writing', 'writeing', 'writting', 'writting'] },
      { prompt: 'Hangi cümle YANLIŞ?', correct: 'I am work now.', options: ['I am work now.', 'I am working now.', 'I work every day.', 'Are you working?'] },
      { prompt: '"___ you listening to me?" boşluk?', correct: 'Are', options: ['Are', 'Is', 'Do', 'Does'] }
    ]
  },
  {
    id: 'tense_present_special',
    levelGroup: 'A2',
    title: 'Present Perfect: Geçmişin Şimdiki Etkisi',
    description: 'have/has + V3 — İngilizcenin en sevilen/tartışılan zamanı.',
    icon: '✅',
    color: '#8b5cf6',
    coreConcept: 'Present Perfect, geçmişte olup ŞU ANA bağı olan işleri anlatır: "I have lost my keys." (Anahtarlarımı kaybettim → hâlâ bulamadım, şimdi kapıda mahsurum!). Türkçedeki "-dı" ile birebir çevrilemez; zaman değil ETKİ vurgulanır. Kalıp: have/has + fiilin 3. hâli (V3).',
    keyPoints: [
      'Kalıp: I/you/we/they have + V3; he/she/it has + V3.',
      'Düzensiz V3 listesi: go → gone, see → seen, eat → eaten, write → written, do → done.',
      'Tecrübe: "Have you ever been to London?" (Hiç Londra\'da bulundun mu?)',
      'Sonuç şimdi: "I have finished." (Bitirdim → iş tamam, rahatım.)',
      'Zaman zarfları: just, already, yet, ever, never, since, for.'
    ],
    examples: [
      { ru: 'I have finished my homework.', reading: 'ay HEV FİNİŞT may HOMUORK', tr: 'Ödevimi bitirdim.', note: 'Etki şimdi: ödev bitti, artık serbestim.' },
      { ru: 'She has never been to Paris.', reading: 'Şİ HES NEvır BIN tu PEYris', tr: 'O hiç Paris\'e gitmedi.', note: 'Tecrübe anlatımı: have been to.' },
      { ru: 'Have you ever eaten sushi?', reading: 'HEV yu EVır IItın SUUşi', tr: 'Hiç suşi yedin mi?', note: 'ever + V3: hayat boyu tecrübe sorusu.' },
      { ru: 'We have lived here for ten years.', reading: 'ui HEV LİVD HIR for TEN YIRZ', tr: 'On yıldır burada yaşıyoruz.', note: 'for + süre, since + başlangıç noktası.' }
    ],
    miniChecklist: [
      'have/has + V3 kalıbını kurabiliyor musun?',
      'just/already/yet/ever/never zarflarını doğru yerde kullanabiliyor musun?',
      'Present Perfect ile Past Simple ayrımını (etki vs bitmiş zaman) yapıyor musun?'
    ],
    quiz: [
      { prompt: '"O (erkek) evini kaybetti." hangisi?', correct: 'He has lost his keys.', options: ['He has lost his keys.', 'He has lose his keys.', 'He have lost his keys.', 'He is lost his keys.'] },
      { prompt: '"go" fiilinin 3. hâli (V3)?', correct: 'gone', options: ['gone', 'went', 'goed', 'going'] },
      { prompt: 'Hangisi tecrübe sorusudur?', correct: 'Have you ever seen this film?', options: ['Have you ever seen this film?', 'Did you ever see this film now?', 'Are you ever seeing this film?', 'Have you ever see this film?'] },
      { prompt: 'for/since: "___ 2019" boşluğa hangisi?', correct: 'since', options: ['since', 'for', 'from', 'at'] }
    ]
  },
  {
    id: 'tense_past',
    levelGroup: 'A1',
    title: 'Past Simple: Bitmiş Geçmiş',
    description: 'Dün, geçen hafta, 1998 — tarihi yazılmış her şey.',
    icon: '📜',
    color: '#f59e0b',
    coreConcept: 'Past Simple, ZAMANI BELLİ ve BİTMİŞ olayları anlatır: "I watched a film yesterday." Türkçedeki "-dı/li" geçmiş zamanın karşılığıdır. Düzenli fiiller -ed alır (work → worked); düzensiz fiiller değişir (go → went, see → saw) — düzensiz liste ezberle başlar!',
    keyPoints: [
      'Düzenli: fiil + ed: work → worked, play → played, study → studied.',
      'Düzensiz en sık kullanılanlar: go→went, have→had, see→saw, do→did, make→made, take→took, come→came.',
      'Olumsuz/Soru: didn\'t + fiil(1. hâl) / Did + özne + fiil: "I didn\'t go." / "Did you go?"',
      'to be istisna: was (I/he/she/it), were (you/we/they).',
      'Zaman zarfları: yesterday, last week, in 2010, two days ago.'
    ],
    examples: [
      { ru: 'I watched a movie yesterday.', reading: 'ay UOÇT e MUUvi YES-tırdey', tr: 'Dün bir film izledim.', note: 'yesterday → Past Simple.' },
      { ru: 'We went to the beach last summer.', reading: 'ui UENT tu di BIIÇ LAST SAMır', tr: 'Geçen yaz sahile gittik.', note: 'go → went: düzensiz.' },
      { ru: 'She didn\'t call me.', reading: 'Şİ DİNT KOL Mİ', tr: 'O beni aramadı.', note: 'didn\'t + call (fiil 1. hâlde kalır).' },
      { ru: 'Did you enjoy the party?', reading: 'DID yuu enCOY di PARti?', tr: 'Partinin keyfini çıkardın mı?', note: 'Did ile soru.' }
    ],
    miniChecklist: [
      'Düzenli fiillere -ed ekleyebiliyor musun?',
      'İlk 20 düzensiz fiili ezbere biliyor musun?',
      'didn\'t ve Did sonrasında fiilin 1. hâlde kaldığını hatırlıyor musun?'
    ],
    quiz: [
      { prompt: '"Dün okula gittim." hangisi?', correct: 'I went to school yesterday.', options: ['I went to school yesterday.', 'I go to school yesterday.', 'I goed to school yesterday.', 'I was go to school yesterday.'] },
      { prompt: '"see" fiilinin Past Simple biçimi?', correct: 'saw', options: ['saw', 'seed', 'seen', 'sawed'] },
      { prompt: 'Olumsuz: "O (kadın) gelmedi."', correct: 'She didn\'t come.', options: ['She didn\'t come.', 'She didn\'t came.', 'She not come.', 'She doesn\'t came.'] },
      { prompt: 'Hangi zarf Present Perfect ile DEĞİL Past Simple ile kullanılır?', correct: 'yesterday', options: ['yesterday', 'ever', 'just', 'since'] }
    ]
  },
  {
    id: 'tense_past_negation',
    levelGroup: 'A1',
    title: 'Olumsuz ve Soru Fabrikası: do/does/did',
    description: 'İngilizce olumsuzlama ve soru sormanın tek merkezi.',
    icon: '❓',
    color: '#ef4444',
    coreConcept: 'Normal fiillerin olumsuzu ve sorusu, do ailesiyle kurulur: Present\'ta do/does, Past\'ta did. KURAL: do/does/did fiilin ZAMANINI üstlenir — sonra gelen fiil hep 1. hâlde çıplak kalır! "She doesn\'t worked" YANLIŞ, "She doesn\'t work" doğru.',
    keyPoints: [
      'Olumsuz: don\'t/doesn\'t/didn\'t + fiil (1. hâl).',
      'Soru: Do/Does/Did + özne + fiil (1. hâl)?',
      'Kısa cevaplar: "Yes, I do / No, she doesn\'t / Yes, we did."',
      'to be kendi başına olumsuzlar/sorar: isn\'t, aren\'t, wasn\'t, were → "Are you...?"',
      'have (sahiplik) de do ailesini izler (İngiliz İngilizcesinde "Have you got?" da olur).'
    ],
    examples: [
      { ru: 'I don\'t like winter.', reading: 'ay DOUNT LAYK UİNtır', tr: 'Kışı sevmem.', note: 'don\'t + like: fiil çıplak.' },
      { ru: 'Does she know the answer?', reading: 'DAS ŞI NOU di ANsır?', tr: 'O cevabı biliyor mu?', note: 'Does + know (knows DEĞİL).' },
      { ru: 'They didn\'t buy anything.', reading: 'DEY DİNT BAY ENiting', tr: 'Onlar hiçbir şey almadılar.', note: 'didn\'t + buy.' },
      { ru: 'Wasn\'t the concert great?', reading: 'UOZNT di KONsert GREYT?', tr: 'Konser harika değil miydi?', note: 'to be sorusu do\'suz kurulur.' }
    ],
    miniChecklist: [
      'do/does/did sonrası fiilin neden 1. hâlde kaldığını açıklayabiliyor musun?',
      'to be\'nin do olmadan soru/olumsuz kurduğunu biliyor musun?',
      'Kısa cevapları (Yes, I do / No, she didn\'t) otomatik verebiliyor musun?'
    ],
    quiz: [
      { prompt: 'Hangisi DOĞRU?', correct: 'He didn\'t call me.', options: ['He didn\'t call me.', 'He didn\'t called me.', 'He not called me.', 'He doesn\'t called me.'] },
      { prompt: '"___ you like chocolate?" boşluk?', correct: 'Do', options: ['Do', 'Does', 'Did', 'Are'] },
      { prompt: 'to be ile soru hangisidir?', correct: 'Were you at home?', options: ['Were you at home?', 'Did you be at home?', 'Do you were at home?', 'You were at home?'] },
      { prompt: '"No, she ___" (doesn\'t sorusuna kısa cevap)', correct: 'doesn\'t', options: ['doesn\'t', 'don\'t', 'isn\'t', 'didn\'t'] }
    ]
  },
  {
    id: 'tense_future_budu',
    levelGroup: 'A2',
    title: 'Gelecek: will ve going to',
    description: 'İki gelecek kapısı: anlık karar mı, önceden plan mı?',
    icon: '🚀',
    color: '#06b6d4',
    coreConcept: 'İngilizcede gelecek iki ana kapıdan geçer: 1) will — o an karar verilen, tahmin edilen, söz verilen işler: "I will help you." 2) be going to — önceden planlanmış, niyet edilmiş, bellisi olan işler: "I am going to study tonight." Present Continuous da plan için kullanılır: "I am meeting him tomorrow."',
    keyPoints: [
      'will + fiil (1. hâl): "It will rain." (tahmin), "I will call you." (söz).',
      'am/is/are going to + fiil: "We are going to move." (plan, niyet).',
      'Kanıt varsa going to: "Look at those clouds — it is going to rain!"',
      'Olumsuz: won\'t / isn\'t going to.',
      'Zaman zarfları: tomorrow, next week, soon, in 2030.'
    ],
    examples: [
      { ru: 'I will help you with your bags.', reading: 'ay UİL HELP yu vid yor BEGZ', tr: 'Çantalarında sana yardım edeceğim.', note: 'Anlık karar → will.' },
      { ru: 'We are going to visit Rome in June.', reading: 'ui AR GOING tu VİZIT ROUM in CUUN', tr: 'Haziranda Roma\'yı ziyaret edeceğiz.', note: 'Önceden plan → going to.' },
      { ru: 'It won\'t be easy.', reading: 'İT UOUNT Bİ IIZI', tr: 'Kolay olmayacak.', note: 'won\'t = will not.' },
      { ru: 'She is meeting the boss tomorrow.', reading: 'Şİ İZ MİIting di BOS tuMOrow', tr: 'Yarın patronla görüşecek.', note: 'Present Continuous ile planlanmış gelecek.' }
    ],
    miniChecklist: [
      'will ile going to arasındaki niyet farkını anlatabiliyor musun?',
      'won\'t kısaltmasını kullanabiliyor musun?',
      'Present Continuous\'un da gelecek plan verebildiğini biliyor musun?'
    ],
    quiz: [
      { prompt: 'Telefonda anlık karar: "Tamam, gelirim!" hangisi?', correct: 'I will come.', options: ['I will come.', 'I am going to come (önceden planlanmışsa değil)', 'I come.', 'I will coming.'] },
      { prompt: 'Geçen aydan beri planladığın tatil için?', correct: 'I am going to travel.', options: ['I am going to travel.', 'I will travel (anlık değil)', 'I travel.', 'I am will travel.'] },
      { prompt: 'won\'t neyin kısaltmasıdır?', correct: 'will not', options: ['will not', 'want not', 'does not', 'went not'] },
      { prompt: 'Bulutlara bakıp "yağmur yağacak" derken?', correct: 'It is going to rain.', options: ['It is going to rain.', 'It will rains.', 'It rains.', 'It is raining tomorrow.'] }
    ]
  },
  {
    id: 'tense_aspect',
    levelGroup: 'B1',
    title: 'Past Continuous: Arka Plan Hikayesi',
    description: 'was/were + -ing — geçmişin perdesi, arka plan müziği.',
    icon: '🎬',
    color: '#8b5cf6',
    coreConcept: 'Past Continuous, geçmişte belli bir anda SÜREN işleri anlatır — hikayelerin arka planını çizer: "I was sleeping when you called." (Sen aradığında uyuyordum.) Uzun arka plan (continuous) + kısa müdahale (Past Simple) ikilisi İngilizce anlatımının kalbidir.',
    keyPoints: [
      'Kalıp: was/were + V-ing: I was, you were, he was, they were.',
      'Klasik ikili: "While I was cooking, the phone rang."',
      'while + Continuous (uzun), when + Simple (kısa patlama).',
      'Aynı anda iki uzun iş: "I was studying while he was watching TV."',
      'Zaman zarfları: while, when, at 8 pm yesterday, all day.'
    ],
    examples: [
      { ru: 'I was sleeping when you called.', reading: 'ay UOS SLİiping UEN yu KOLD', tr: 'Sen aradığında uyuyordum.', note: 'Uzun arka plan + kısa olay.' },
      { ru: 'What were you doing at 9 pm?', reading: 'UOT UER yu DUing et NAYN PİEM', tr: 'Saat 9\'da ne yapıyordun?', note: 'Geçmişte belli bir an.' },
      { ru: 'While she was reading, it started to rain.', reading: 'UAYL Şİ UOS RİIding, it STARtı d tu REYN', tr: 'O okurken yağmur başladı.', note: 'while + Continuous, ana olay Simple.' },
      { ru: 'They were waiting for the bus.', reading: 'DEY UER UEYting for di BAS', tr: 'Otobüsü bekliyorlardı.', note: 'Süren bekleme durumu.' }
    ],
    miniChecklist: [
      'was/were dağılımını -ing ile kurabiliyor musun?',
      'while ve when bağlaçlarını doğru zamanda kullanabiliyor musun?',
      'Arka plan (uzun) + olay (kısa) ikilisini kurabiliyor musun?'
    ],
    quiz: [
      { prompt: '"Sen aradığında yemek yapıyordum." hangisi?', correct: 'I was cooking when you called.', options: ['I was cooking when you called.', 'I cooked when you was calling.', 'I was cook when you called.', 'I am cooking when you called.'] },
      { prompt: 'Hangisi DOĞRU?', correct: 'They were playing football.', options: ['They were playing football.', 'They was playing football.', 'They were play football.', 'They playing football.'] },
      { prompt: 'while hangi zamanla eşleşir?', correct: 'Past Continuous', options: ['Past Continuous', 'Past Simple', 'Present Simple', 'Future Simple'] },
      { prompt: '"at 8 o\'clock yesterday" hangi zamanın sinyalidir?', correct: 'Past Continuous', options: ['Past Continuous', 'Present Perfect', 'Present Simple', 'Future'] }
    ]
  },
  {
    id: 'tense_future_perfective',
    levelGroup: 'B2',
    title: 'Future Continuous & Future Perfect',
    description: 'will be -ing / will have V3 — geleceğin derin zamanları.',
    icon: '⏳',
    color: '#f43f5e',
    coreConcept: 'B2 seviyesinin iki geleceği: 1) Future Continuous (will be + -ing): gelecekte belli bir anda sürüyor olacak iş: "At 8 pm I will be flying to London." 2) Future Perfect (will have + V3): gelecekte bir noktaya kadar TAMAMLANMIŞ olacak iş: "By 2030 I will have graduated."',
    keyPoints: [
      'Future Continuous: will be + V-ing: "This time tomorrow I will be lying on the beach."',
      'Future Perfect: will have + V3: "By Friday we will have finished the project."',
      'by + zaman noktası → Future Perfect sinyalidir (by 2030, by then).',
      'Future Perfect Continuous: will have been + -ing (süreç): "By June I will have been working here for 5 years."',
      'Nazik soru da Continuous ile: "Will you be using the car tonight?"'
    ],
    examples: [
      { ru: 'At 10 tomorrow, I will be taking my exam.', reading: 'ET TEN tuMOrow, ay UİL Bİ TEYking may igZEM', tr: 'Yarın onda sınavımda oluyor olacağım.', note: 'Gelecekte belli bir anda sürüyor olan iş.' },
      { ru: 'By next month, she will have finished her thesis.', reading: 'BAY NEKS MANθ, Şİ UİL HEV FİNİŞT hö TIIsıs', tr: 'Gelecek aya kadar tezini bitirmiş olacak.', note: 'by + tamamlanmışlık → Future Perfect.' },
      { ru: 'Will you be using the car tonight?', reading: 'UİL yu Bİ YUzing di KAR tuNAYT', tr: 'Bu akşam arabayı kullanıyor olacak mısın?', note: 'Kibar nazik soru kalıbı.' },
      { ru: 'By June, I will have been learning English for two years.', reading: 'BAY CUUN, ay UİL HEV BIN LÖRning INGliş for TUU YIRZ', tr: 'Hazirana kadar iki yıldır İngilizce öğreniyor olacağım.', note: 'Süre vurgusu → Perfect Continuous.' }
    ],
    miniChecklist: [
      'will be + -ing ile will have + V3 ayrımını yapıyor musun?',
      'by zarfını Future Perfect ile eşleştirebiliyor musun?',
      'Nazik "Will you be using...?" kalıbını tanıyor musun?'
    ],
    quiz: [
      { prompt: '"Yarın bu saatte uçuyor olacağım." hangisi?', correct: 'This time tomorrow I will be flying.', options: ['This time tomorrow I will be flying.', 'This time tomorrow I will fly.', 'This time tomorrow I will have flown.', 'Tomorrow I am fly.'] },
      { prompt: 'Future Perfect kalıbı hangisidir?', correct: 'will have + V3', options: ['will have + V3', 'will be + V-ing', 'will + V1', 'was + V-ing'] },
      { prompt: '"By 2030, I ___ (graduate)." boşluk?', correct: 'will have graduated', options: ['will have graduated', 'will be graduating', 'will graduated', 'am graduating'] },
      { prompt: 'Hangisi nazik/rikayetkar sorudur?', correct: 'Will you be joining us?', options: ['Will you be joining us?', 'Will you join us?', 'Do you join us?', 'You will join?'] }
    ]
  },
  {
    id: 'tense_review',
    levelGroup: 'B1',
    title: 'Zamanlar Büyük Tekrar',
    description: '12 zamanın hepsi bir arada: karışık tatbikat ünitesi.',
    icon: '🏆',
    color: '#eab308',
    coreConcept: 'Bu ünite, öğrenilen tüm zamanları tek tabloda toplar. Kural değil TEKRAR kası: her örnek bilinen kalıpların hatırlatmasıdır. Zaman zarflarına bak → zamanı tahmin et → cümleyi kur. Bu refleks oturmadan sınavda/B2\'de ilerlemek zordur.',
    keyPoints: [
      'every day → Present Simple | now → Present Continuous',
      'yesterday / last week → Past Simple | at 8 yesterday → Past Continuous',
      'just / ever / since / for → Present Perfect | ago → Past Simple',
      'tomorrow → will / going to | at 8 tomorrow → will be -ing | by tomorrow → will have V3',
      'Zaman zarfı = zamanın parmak izi: önce zarfı oku!'
    ],
    examples: [
      { ru: 'I drink tea every morning. / I am drinking tea now.', reading: 'ay DRINGK TII EVri MORning / ay EM DRINGking TII NAU', tr: 'Her sabah çay içerim. / Şu an çay içiyorum.', note: 'Alışkanlık vs şu an.' },
      { ru: 'I have just finished. / I finished an hour ago.', reading: 'ay HEV CAST FİNİŞT / ay FİNİŞT en AUır eGOU', tr: 'Az önce bitirdim. / Bir saat önce bitirdim.', note: 'just → Perfect, ago → Past Simple.' },
      { ru: 'I will call you tomorrow. / I am going to call you tomorrow.', reading: 'ay UİL KOL yu tuMOrow / ay EM GOING tu KOL yu tuMOrow', tr: 'Yarın arayacağım. / Yarın arayacağım (planlı).', note: 'Anlık karar vs plan.' }
    ],
    miniChecklist: [
      'Zaman zarfından zamanı tahmin edebiliyor musun?',
      '12 kalıbı sırasıyla kurabiliyor musun?',
      'Perfect ile Past Simple\'ı zarflarla ayırt edebiliyor musun?'
    ],
    quiz: [
      { prompt: '"just" hangi zamanın sinyalidir?', correct: 'Present Perfect', options: ['Present Perfect', 'Past Simple', 'Present Continuous', 'Future Simple'] },
      { prompt: '"every summer" hangi zamanı çağırır?', correct: 'Present Simple', options: ['Present Simple', 'Present Continuous', 'Past Continuous', 'Future Perfect'] },
      { prompt: 'Hangisi yanlış eşleşir?', correct: 'ago → Present Perfect', options: ['ago → Present Perfect', 'yesterday → Past Simple', 'now → Present Continuous', 'by 2030 → Future Perfect'] },
      { prompt: '"While I ___ TV, she called." boşluk?', correct: 'was watching', options: ['was watching', 'watched', 'am watching', 'have watched'] }
    ]
  },
  {
    id: 'gram_prepositions',
    levelGroup: 'A2',
    title: 'Edatlar: in, on, at ve Ekibi',
    description: 'Yer, zaman ve yönün küçük ama kritik harfleri.',
    icon: '📍',
    color: '#0ea5e9',
    coreConcept: 'İngilizce edatlar Türkçeye çevrilemez — her birinin kendi haritası vardır. Zaman için büyükten küçüğe kural: in (ay/yıl/senede) → on (gün/tarih) → at (saat). Yer için de benzer: in (içinde) → on (üstünde) → at (noktada). Bu üçlüyü çözünce edatların yarısı çözülür.',
    keyPoints: [
      'Zaman: in 2024 / in July; on Monday / on 5 May; at 7 o\'clock / at night.',
      'Yer: in the room (içinde), on the table (üstünde), at the bus stop (noktada).',
      'Yön/hareket: to (doğru), from (-den), into (içine), out of (dışına).',
      'Diğer kritikler: with (ile), without (sız), for (için), about (hakkında), by (tarafından/yanında).',
      '"at night" istisna: gece at ile, ama "in the morning/afternoon/evening"!'
    ],
    changeRules: [
      {
        label: 'Zaman edatı merdiveni (in → on → at)',
        explanation: 'Zaman genişliğine bak: geniş dilim (ay, yıl, mevsim) → in; gün/tarih → on; saat ve an → at.',
        examples: ['in the morning / in July / in 2025', 'on Monday / on my birthday / on 3 June', 'at 6 pm / at noon / at night']
      }
    ],
    examples: [
      { ru: 'The meeting is on Monday at 9 am.', reading: 'di MİIting İZ on MANdey et NAYN EYEM', tr: 'Toplantı pazartesi saat 9\'da.', note: 'Gün → on, saat → at.' },
      { ru: 'I live in Istanbul.', reading: 'ay LİV in istanBUL', tr: 'İstanbul\'da yaşıyorum.', note: 'Şehir → in.' },
      { ru: 'She is waiting at the bus stop.', reading: 'Şİ İZ UEYting et di BAS STOP', tr: 'O durakta bekliyor.', note: 'Belirli nokta → at.' },
      { ru: 'This book is about history.', reading: 'dis BUK İZ eBAUT HİStıri', tr: 'Bu kitap tarih hakkındadır.', note: 'hakkında → about.' }
    ],
    miniChecklist: [
      'in/on/at zaman merdivenini kurabiliyor musun?',
      'Yer edatlarında "nokta-yüzey-boşluk" ayrımını yapıyor musun?',
      '"at night" istisnasını hatırlıyor musun?'
    ],
    quiz: [
      { prompt: '"___ 2025" boşluğa hangi edat gelir?', correct: 'in', options: ['in', 'on', 'at', 'to'] },
      { prompt: '"The book is ___ the table." boşluk?', correct: 'on', options: ['on', 'in', 'at', 'to'] },
      { prompt: 'Hangisi DOĞRU?', correct: 'at night', options: ['at night', 'on night', 'in night', 'to night'] },
      { prompt: '"Hakkında" anlamlı edat?', correct: 'about', options: ['about', 'for', 'with', 'from'] }
    ]
  },
  {
    id: 'gram_sentence_lab',
    levelGroup: 'B1',
    title: 'Cümle Laboratuvarı: Soru, Olumsuz, Sıralama',
    description: 'Öğrendiğin her şeyi gerçek cümlelere dökme atölyesi.',
    icon: '🧪',
    color: '#a78bfa',
    coreConcept: 'Bu ünite bir atölyedir: verilen kelimeleri doğru sıraya diz (SVO!), doğru zamanı seç (zarfa bak!), olumsuzu ve soruyu kur (do ailesi!). B1 seviyesine giden yol bu üç refleksin otomatikleşmesinden geçer.',
    keyPoints: [
      'Sıralama: SVO — zarflar çoğunlukla cümle sonunda (place before time).',
      'Soru: (Wh-) + do/does/did/be/will + özne + fiil?',
      'Olumsuz: not, doğru yardımcıya eklenir: don\'t, isn\'t, won\'t, hasn\'t.',
      'Sıfatlar hep isimden ÖNCE gelir: "a red car" ("a car red" YANLIŞ).',
      'Wh-soruları: What/Where/When/Who/Why/How + soru düzeni.'
    ],
    examples: [
      { ru: 'Where do you live?', reading: 'UER du yu LİV', tr: 'Nerede yaşıyorsun?', note: 'Wh + do + özne + fiil.' },
      { ru: 'She never drinks coffee at night.', reading: 'Şİ NEvır DRINGKS KOFi et NAYT', tr: 'O asla geceleri kahve içmez.', note: 'never fiilden önce, yer-zaman sonda.' },
      { ru: 'I bought a beautiful old house.', reading: 'ay BOT e BYUUtıful OLD HAUS', tr: 'Güzel eski bir ev satın aldım.', note: 'Sıra: görüş-sıfat-boyut-yaş-renk → isim.' },
      { ru: 'Why didn\'t you come to the party?', reading: 'UAY DİNT yu KAM tu di PARti', tr: 'Partiye neden gelmedin?', note: 'Wh + didn\'t + özne + fiil(1. hâl).' }
    ],
    miniChecklist: [
      'Karışık kelimelerden doğru SVO cümlesi kurabiliyor musun?',
      'Her tür cümleyi soruya ve olumsuza çevirebiliyor musun?',
      'Sıfat diziliş kuralını uygulayabiliyor musun?'
    ],
    quiz: [
      { prompt: 'Doğru sıralama: "coffee / I / every morning / drink"', correct: 'I drink coffee every morning.', options: ['I drink coffee every morning.', 'I coffee drink every morning.', 'Every morning I coffee drink.', 'Drink I coffee every morning.'] },
      { prompt: '"___ she like music?" soru nasıl kurulur?', correct: 'Does', options: ['Does', 'Do', 'Is', 'Did'] },
      { prompt: 'Hangisi DOĞRU sıralıdır?', correct: 'a small black bag', options: ['a small black bag', 'a black small bag', 'a bag small black', 'small a black bag'] },
      { prompt: '"Why ___ you call me?" (dün)', correct: 'didn\'t', options: ['didn\'t', 'don\'t', 'aren\'t', 'haven\'t'] }
    ]
  },
];
