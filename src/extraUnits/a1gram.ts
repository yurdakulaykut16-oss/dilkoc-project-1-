// ==========================================================
// EK MÜFREDAT — A1 BAŞLANGIÇ GRAMER PAKETİ (Ünite 2-6: sayılardan hemen sonra)
// "Ben, benim, benimki, bende, bana, benimle..." — cümlelerde
// hangi form NEDEN kullanılıyor? A2'ye geçmeden önce cümle
// çözme anahtarı: zamirler, iyelik, у меня есть ve hâl mantığı.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_A1_GRAM: UnitModule[] = [
  {
    id: 'mod_a1_g1',
    unitNumber: 2,
    levelGroup: 'A1',
    title: 'Ben, Sen, O — Şahıs Zamirleri',
    description: 'я, ты, он, она... — Rusça cümlenin öznesini tanı',
    category: 'Cümle Anahtarı',
    color: '#38bdf8',
    icon: '🙋',
    grammarExplain: `📌 ŞAHIS ZAMİRLERİ — CÜMLENİN ÖZNESİ:
1. Rusçada şimdiki zamanda "olmak" fiili YOKTUR: "Я студент" = kelime kelime "Ben öğrenci" -> "Ben öğrenciyim". "am/is/dir" eklenmez!
2. "Вы" hem "siz" (çoğul) hem de kibar "siz"dir. Yeni tanıştığınız herkese "вы" deyin; "ты"ya geçiş teklifle olur.
3. "Он" eril, "она" dişil, "оно" nötr kelimelerin yerini tutar: стол (masa) -> он; книга (kitap) -> она; окно (pencere) -> оно.
4. Karşılaştırma sorusu "а": "Я дома. А ты?" (Ben evdeyim. Ya sen?)`,
    words: [
      { id: 'wg7_1', ru: 'Я', reading: 'Ya', tr: 'Ben', level: 'A1', usageNote: 'Cümle ortasında bile küçük yazılır (İngilizce "I" gibi değildir).' },
      { id: 'wg7_2', ru: 'Ты', reading: 'Ty', tr: 'Sen', level: 'A1', usageNote: 'Sadece arkadaşlara ve yakınlara; büyüklere "вы" denir.' },
      { id: 'wg7_3', ru: 'Он', reading: 'On', tr: 'O (eril)', level: 'A1', usageNote: 'Erkekler VE eril cins kelimeler için: "Где стол? — Он там."' },
      { id: 'wg7_4', ru: 'Она', reading: 'Aná', tr: 'O (dişil)', level: 'A1', usageNote: 'Kadınlar VE dişil kelimeler için kullanılır.' },
      { id: 'wg7_5', ru: 'Оно', reading: 'Anó', tr: 'O (nötr)', level: 'A1', usageNote: '-о/-е ile biten nötr kelimelerin yerini tutar: окно, море.' },
      { id: 'wg7_6', ru: 'Мы', reading: 'My', tr: 'Biz', level: 'A1', usageNote: '"Мы дома" (Biz evdeyiz) — yine "olmak" fiili yok!' },
      { id: 'wg7_7', ru: 'Вы', reading: 'Vy', tr: 'Siz', level: 'A1', usageNote: 'Hem çoğul hem kibar tekil. Resmî yazıda büyük harfle: "Вы".' },
      { id: 'wg7_8', ru: 'Они', reading: 'Aní', tr: 'Onlar', level: 'A1', usageNote: 'Cinsiyet ayrımı yoktur; herkes ve her şey için "они".' },
      { id: 'wg7_9', ru: 'Кто это?', reading: 'Kto éta?', tr: 'Bu kim?', level: 'A1', usageNote: 'İnsanlar için "кто", nesneler için "что" sorulur.' },
      { id: 'wg7_10', ru: 'Это я', reading: 'Éta ya', tr: 'Benim (bu benim!)', level: 'A1', usageNote: 'Kapıda "Кто там? — Это я!" (Kim o? — Benim!) diye cevap verilir.' },
      { id: 'wg7_11', ru: 'Тоже', reading: 'Tóje', tr: 'De / Da (ben de)', level: 'A1', usageNote: '"Я тоже!" (Ben de!) — sohbetin en pratik cevabı.' },
      { id: 'wg7_12', ru: 'А ты?', reading: 'A ty?', tr: 'Ya sen?', level: 'A1', usageNote: 'Soruyu geri çevirme kalıbı: "Я из Турции. А ты?"' }
    ],
    sentences: [
      { ru: 'Я студент, а ты?', tr: 'Ben öğrenciyim, ya sen?', scrambled: ['а ты?', 'Я', 'студент,'], correct: ['Я', 'студент,', 'а ты?'] },
      { ru: 'Мы дома, а они в кафе.', tr: 'Biz evdeyiz, onlarsa kafede.', scrambled: ['а они', 'Мы', 'в кафе.', 'дома,'], correct: ['Мы', 'дома,', 'а они', 'в кафе.'] }
    ],
    sceneTitle: 'Kapı Zili ve "Это я!"',
    sceneContext: 'İki arkadaş telefonda birbirinin nerede olduğunu sorar; kapı çalınca meşhur "Кто там? — Это я!" sahnesi yaşanır.',
    dialogue: [
      { speaker: 'Katya', ru: 'Привет! Ты дома?', reading: 'Privét! Ty dóma?', tr: 'Selam! Evde misin?' },
      { speaker: 'Aslı', ru: 'Да, я дома. А ты где?', reading: 'Da, ya dóma. A ty gde?', tr: 'Evet, evdeyim. Sen neredesin?' },
      { speaker: 'Katya', ru: 'Я уже здесь! Открой дверь!', reading: 'Ya ujé zdyes\'! Atkróy dvyer\'!', tr: 'Ben çoktan buradayım! Kapıyı aç!' },
      { speaker: 'Aslı', ru: 'Кто там? — Это я, Катя!', reading: 'Kto tam? — Éta ya, Kátya!', tr: 'Kim o? — Benim, Katya!' }
    ]
  },
  {
    id: 'mod_a1_g2',
    unitNumber: 3,
    levelGroup: 'A1',
    title: 'Benim, Senin, Benimki — İyelik Sırları',
    description: 'мой/моя/моё/мои — "benim" neden dört şekilde söyleniyor?',
    category: 'Cümle Anahtarı',
    color: '#f59e0b',
    icon: '🤲',
    grammarExplain: `📌 İYELİK ZAMİRLERİ — "BENİM"İN DÖRT YÜZÜ:
1. "Benim" kelimesi sahip olunan şeyin cinsine uyar: мой телефон (eril), моя мама (dişil), моё окно (nötr), мои друзья (çoğul). Sahibin değil, EŞYANIN cinsi belirler!
2. "Твой" (senin) aynı kurala uyar: твой дом, твоя книга, твоё имя, твои деньги.
3. KOLAYLIK: "его" (onun-eril), "её" (onun-dişil), "их" (onların) HİÇ değişmez: его дом, его книга, его окно — hep aynı!
4. "BENİMKİ" = yine "мой"! Rusçada ayrı bir "benimki" kelimesi yoktur: "Чей это телефон? — Мой!" (Bu telefon kimin? — Benimki!)`,
    words: [
      { id: 'wg8_1', ru: 'Мой', reading: 'Moy', tr: 'Benim (eril)', level: 'A1', usageNote: 'Eril kelimelerle: мой брат, мой дом, мой кофе.' },
      { id: 'wg8_2', ru: 'Моя', reading: 'Mayá', tr: 'Benim (dişil)', level: 'A1', usageNote: 'Dişil kelimelerle: моя мама, моя работа.' },
      { id: 'wg8_3', ru: 'Моё', reading: 'Mayó', tr: 'Benim (nötr)', level: 'A1', usageNote: 'Nötr kelimelerle: моё имя (benim adım), моё место.' },
      { id: 'wg8_4', ru: 'Мои', reading: 'Maí', tr: 'Benim (çoğul)', level: 'A1', usageNote: 'Çoğullarla: мои родители (ebeveynlerim), мои деньги.' },
      { id: 'wg8_5', ru: 'Твой / Твоя', reading: 'Tvoy / Tvayá', tr: 'Senin', level: 'A1', usageNote: 'Aynı dörtlü kural: твой, твоя, твоё, твои.' },
      { id: 'wg8_6', ru: 'Наш / Наша', reading: 'Naş / Náşa', tr: 'Bizim', level: 'A1', usageNote: '"Наша семья" (bizim aile), "наш дом" (bizim ev).' },
      { id: 'wg8_7', ru: 'Ваш / Ваша', reading: 'Vaş / Váşa', tr: 'Sizin', level: 'A1', usageNote: 'Kibar konuşmanın iyeliği: "Ваш паспорт, пожалуйста".' },
      { id: 'wg8_8', ru: 'Его', reading: 'Yevó', tr: 'Onun (eril sahibin)', level: 'A1', usageNote: 'HİÇ değişmez! Г harfi burada V okunur: "yevó".' },
      { id: 'wg8_9', ru: 'Её', reading: 'Yiyó', tr: 'Onun (dişil sahibin)', level: 'A1', usageNote: 'HİÇ değişmez: её дом, её мама, её деньги.' },
      { id: 'wg8_10', ru: 'Их', reading: 'İh', tr: 'Onların', level: 'A1', usageNote: 'HİÇ değişmez: их квартира (onların dairesi).' },
      { id: 'wg8_11', ru: 'Чей? / Чья?', reading: 'Çey? / Ç\'ya?', tr: 'Kimin?', level: 'A1', usageNote: 'O da uyum yapar: чей телефон? чья сумка? чьё место?' },
      { id: 'wg8_12', ru: 'Это мой!', reading: 'Éta moy!', tr: 'Bu benimki!', level: 'A1', usageNote: '"Benimki" için ayrı kelime yok — "мой" tek başına yeter.' }
    ],
    sentences: [
      { ru: 'Чей это телефон? — Мой!', tr: 'Bu telefon kimin? — Benimki!', scrambled: ['— Мой!', 'Чей', 'телефон?', 'это'], correct: ['Чей', 'это', 'телефон?', '— Мой!'] },
      { ru: 'Это наша квартира и наши вещи.', tr: 'Bu bizim dairemiz ve bizim eşyalarımız.', scrambled: ['и наши', 'Это наша', 'вещи.', 'квартира'], correct: ['Это наша', 'квартира', 'и наши', 'вещи.'] }
    ],
    sceneTitle: 'Kayıp Telefon Operasyonu',
    sceneContext: 'Kafede masada unutulan bir telefon bulunur; "kimin bu?" sorusu iyelik zamirlerinin geçit törenine dönüşür.',
    dialogue: [
      { speaker: 'Garson', ru: 'Извините, чей это телефон?', reading: 'İzviníte, çey éta tilifón?', tr: 'Affedersiniz, bu telefon kimin?' },
      { speaker: 'Dima', ru: 'Не мой. Мой телефон здесь.', reading: 'Ni moy. Moy tilifón zdyes\'.', tr: 'Benim değil. Benim telefonum burada.' },
      { speaker: 'Katya', ru: 'Ой, это мой! Спасибо большое!', reading: 'Oy, éta moy! Spasíba bal\'şóye!', tr: 'Ay, o benimki! Çok teşekkürler!' },
      { speaker: 'Garson', ru: 'А чья это сумка? Тоже ваша?', reading: 'A ç\'ya éta súmka? Tóje váşa?', tr: 'Peki bu çanta kimin? O da sizin mi?' }
    ]
  },
  {
    id: 'mod_a1_g3',
    unitNumber: 4,
    levelGroup: 'A1',
    title: 'Bende Var! — У меня есть Kalıbı',
    description: '"Benim ... var/yok" — Rusça sahiplik cümlesinin şifresi',
    category: 'Cümle Anahtarı',
    color: '#10b981',
    icon: '💼',
    grammarExplain: `📌 У МЕНЯ ЕСТЬ — RUSÇANIN "SAHİP OLMA" ŞİFRESİ:
1. Rusçada "sahip olmak" fiili günlük dilde kullanılmaz! "Arabam var" = "У меня есть машина" — kelime kelime "Bende var araba".
2. Şablon: У + kişi + есть + şey. У меня (bende), у тебя (sende), у него (onda-eril), у неё (onda-dişil), у нас (bizde), у вас (sizde), у них (onlarda).
3. YOKLUK: "есть" yerine "нет" gelir VE şey tamlayan hâline girer: "У меня нет машины" (Arabam yok). Нет'ten sonra kelime değişir!
4. Soru çok kolay: "У тебя есть время?" (Vaktin var mı?) — sadece ton yükselir.`,
    words: [
      { id: 'wg9_1', ru: 'У меня', reading: 'U minyá', tr: 'Bende / Benim ...im', level: 'A1', usageNote: 'Türkçedeki "bende/benimde" anlamının tam karşılığıdır.' },
      { id: 'wg9_2', ru: 'У тебя', reading: 'U tibyá', tr: 'Sende', level: 'A1', usageNote: '"У тебя есть...?" (Sende ... var mı?) diye sorulur.' },
      { id: 'wg9_3', ru: 'У него', reading: 'U nivó', tr: 'Onda (eril)', level: 'A1', usageNote: 'У\'dan sonra "него" olur (н eklenir).' },
      { id: 'wg9_4', ru: 'У неё', reading: 'U niyó', tr: 'Onda (dişil)', level: 'A1', usageNote: '"У неё есть кошка" (Onun kedisi var).' },
      { id: 'wg9_5', ru: 'У нас', reading: 'U nas', tr: 'Bizde', level: 'A1', usageNote: '"У нас есть план!" (Bir planımız var!).' },
      { id: 'wg9_6', ru: 'У вас', reading: 'U vas', tr: 'Sizde', level: 'A1', usageNote: 'Mağazada: "У вас есть...?" (Sizde ... var mı?).' },
      { id: 'wg9_7', ru: 'У них', reading: 'U nih', tr: 'Onlarda', level: 'A1', usageNote: '"У них большая семья" (Onların ailesi kalabalık).' },
      { id: 'wg9_8', ru: 'Есть', reading: 'Yest\'', tr: 'Var', level: 'A1', usageNote: 'Sahiplik cümlesinin "var"ıdır.' },
      { id: 'wg9_9', ru: 'Нет', reading: 'Nyet', tr: 'Yok / Hayır', level: 'A1', usageNote: 'Hem "hayır" hem "yok" demektir; "yok"tan sonra kelime değişir.' },
      { id: 'wg9_10', ru: 'У меня есть время', reading: 'U minyá yest\' vryémya', tr: 'Vaktim var', level: 'A1', usageNote: 'Kalıbın en sık kullanılan hâllerinden biridir.' },
      { id: 'wg9_11', ru: 'У меня нет денег', reading: 'U minyá nyet dyénik', tr: 'Param yok', level: 'A1', usageNote: 'Dikkat: нет\'ten sonra "деньги" -> "денег" olur.' },
      { id: 'wg9_12', ru: 'Конечно, есть!', reading: 'Kanyéşna, yest\'!', tr: 'Tabii ki var!', level: 'A1', usageNote: 'Sorulara coşkulu cevap kalıbıdır.' }
    ],
    sentences: [
      { ru: 'У меня есть машина.', tr: 'Arabam var.', scrambled: ['машина.', 'У меня', 'есть'], correct: ['У меня', 'есть', 'машина.'] },
      { ru: 'У нас нет времени.', tr: 'Vaktimiz yok.', scrambled: ['времени.', 'У нас', 'нет'], correct: ['У нас', 'нет', 'времени.'] }
    ],
    sceneTitle: 'Piknik Planı ve Eksik Malzemeler',
    sceneContext: 'İki arkadaş piknik planlarken kimde ne olduğunu tek tek sayar; "var/yok" kalıbı sahnenin yıldızıdır.',
    dialogue: [
      { speaker: 'Dima', ru: 'У тебя есть машина? Едем на пикник!', reading: 'U tibyá yest\' mashýna? Yédim na pikník!', tr: 'Araban var mı? Pikniğe gidiyoruz!' },
      { speaker: 'Lyosha', ru: 'Машина есть, но у меня нет бензина.', reading: 'Mashýna yest\', no u minyá nyet binzína.', tr: 'Araba var ama benzinim yok.' },
      { speaker: 'Dima', ru: 'У меня есть деньги. А у Кати есть гитара!', reading: 'U minyá yest\' dyén\'gi. A u Káti yest\' gitára!', tr: 'Bende para var. Katya\'da da gitar var!' },
      { speaker: 'Lyosha', ru: 'Отлично! Тогда у нас есть всё!', reading: 'Atlíçna! Tagdá u nas yest\' fsyo!', tr: 'Harika! O zaman bizde her şey var!' }
    ]
  },
  {
    id: 'mod_a1_g4',
    unitNumber: 5,
    levelGroup: 'A1',
    title: 'Beni, Bana, Benimle — Zamirin Halleri',
    description: 'меня, мне, со мной — aynı "ben" cümlede neden değişiyor?',
    category: 'Cümle Anahtarı',
    color: '#a855f7',
    icon: '🧭',
    grammarExplain: `📌 AYNI "BEN", FARKLI GÖREVLER:
1. Rusçada kelimenin CÜMLEDEKİ GÖREVİ sonunu değiştirir. "Ben" de değişir: я (ben) -> меня (beni) -> мне (bana) -> со мной (benimle).
2. "Меня зовут Али" kelime kelime "BENİ çağırıyorlar Ali" demektir — bu yüzden "я zovut" DEĞİL "меня зовут"!
3. "Bana" görevi = мне: "Позвони мне" (Beni ara / kelime kelime: bana telefon et), "Мне 25 лет" (25 yaşındayım / kelime kelime: bana 25 yıl).
4. "Мне нравится кофе" = "Kahve hoşuma gidiyor" — kelime kelime "BANA hoş geliyor kahve". Seven kişi "мне" ile söylenir!
5. "Benimle" = со мной, "seninle" = с тобой: "Пойдём со мной!" (Benimle gel!).`,
    words: [
      { id: 'wg10_1', ru: 'Меня', reading: 'Minyá', tr: 'Beni', level: 'A1', usageNote: '"Меня зовут..." (Benim adım... / kelime kelime: beni çağırıyorlar).' },
      { id: 'wg10_2', ru: 'Тебя', reading: 'Tibyá', tr: 'Seni', level: 'A1', usageNote: '"Я люблю тебя" (Seni seviyorum) — en meşhur örneği!' },
      { id: 'wg10_3', ru: 'Мне', reading: 'Mnye', tr: 'Bana', level: 'A1', usageNote: '"Позвони мне" (Bana telefon et), "Мне нравится" (Hoşuma gidiyor).' },
      { id: 'wg10_4', ru: 'Тебе', reading: 'Tibyé', tr: 'Sana', level: 'A1', usageNote: '"Как тебе?" (Sence nasıl? / kelime kelime: sana nasıl?).' },
      { id: 'wg10_5', ru: 'Со мной', reading: 'Sa mnoy', tr: 'Benimle', level: 'A1', usageNote: '"Пойдём со мной" (Benimle gel).' },
      { id: 'wg10_6', ru: 'С тобой', reading: 'S tabóy', tr: 'Seninle', level: 'A1', usageNote: '"Я с тобой!" (Seninleyim! / Yanındayım!).' },
      { id: 'wg10_7', ru: 'Мне нравится', reading: 'Mnye nrávitsa', tr: 'Hoşuma gidiyor', level: 'A1', usageNote: 'Kelime kelime "bana hoş geliyor" — özne sevilen şeydir!' },
      { id: 'wg10_8', ru: 'Мне 25 лет', reading: 'Mnye dvátsat\' pyat\' lyet', tr: '25 yaşındayım', level: 'A1', usageNote: 'Yaş HEP "bana" ile söylenir: "Сколько тебе лет?"' },
      { id: 'wg10_9', ru: 'Нам', reading: 'Nam', tr: 'Bize', level: 'A1', usageNote: '"Нам нравится этот город" (Bu şehir hoşumuza gidiyor).' },
      { id: 'wg10_10', ru: 'Вам', reading: 'Vam', tr: 'Size', level: 'A1', usageNote: 'Kibar soru: "Вам помочь?" (Yardım edeyim mi? / size yardım?).' },
      { id: 'wg10_11', ru: 'Обо мне', reading: 'Aba mnye', tr: 'Benim hakkımda', level: 'A1', usageNote: '"Не думай обо мне" (Beni düşünme) şarkı klasiğidir.' },
      { id: 'wg10_12', ru: 'Подожди меня!', reading: 'Padajdí minyá!', tr: 'Beni bekle!', level: 'A1', usageNote: 'Beklenen kişi "меня" (beni) hâlindedir.' }
    ],
    sentences: [
      { ru: 'Позвони мне вечером.', tr: 'Beni akşam ara.', scrambled: ['вечером.', 'Позвони', 'мне'], correct: ['Позвони', 'мне', 'вечером.'] },
      { ru: 'Пойдём со мной в кино!', tr: 'Benimle sinemaya gel!', scrambled: ['в кино!', 'Пойдём', 'со мной'], correct: ['Пойдём', 'со мной', 'в кино!'] }
    ],
    sceneTitle: '"Bana mı Beni mi?" Telefonu',
    sceneContext: 'İki arkadaş sinema planı yapar; tek diyalogda меня, мне ve со мной formlarının hepsi doğal akışta geçer.',
    dialogue: [
      { speaker: 'Katya', ru: 'Алло! Ты меня слышишь?', reading: 'Aló! Ty minyá slýşış?', tr: 'Alo! Beni duyuyor musun?' },
      { speaker: 'Aslı', ru: 'Да! Позвони мне через час, я на уроке.', reading: 'Da! Pazvaní mnye çyéris ças, ya na uróke.', tr: 'Evet! Beni bir saat sonra ara, dersteyim.' },
      { speaker: 'Katya', ru: 'Хорошо. Вечером пойдёшь со мной в кино?', reading: 'Haraşó. Vyéçiram paydyóş sa mnoy f kinó?', tr: 'Tamam. Akşam benimle sinemaya gelir misin?' },
      { speaker: 'Aslı', ru: 'Конечно! Мне нравится эта идея!', reading: 'Kanyéşna! Mnye nrávitsa éta idyéya!', tr: 'Tabii! Bu fikir hoşuma gitti!' }
    ]
  },
  {
    id: 'mod_a1_g5',
    unitNumber: 6,
    levelGroup: 'A1',
    title: 'Cümle Çözme Anahtarı: Kim, Kimi, Kime?',
    description: 'Soru kelimeleriyle cümleyi röntgenle: her form neden orada?',
    category: 'Cümle Anahtarı',
    color: '#ef4444',
    icon: '🔍',
    grammarExplain: `📌 CÜMLE RÖNTGENİ — SORU KELİMESİ YÖNTEMİ:
1. Rusça cümleyi çözmek için soru sorun: КТО? (kim - özne), КОГО? (kimi), КОМУ? (kime), С КЕМ? (kiminle). Cevabın formu soruya uyar!
   Örnek: "Мама любит сына" -> Kim seviyor? мама. Kimi seviyor? сына.
2. ГДЕ? (nerede - duruyor) ile КУДА? (nereye - gidiyor) farklıdır: "Где ты? — Дома." / "Куда ты? — Домой." Aynı "ev", iki form!
3. Kelime sırası ESNEKTİR çünkü görevleri sonlar gösterir: "Я тебя люблю" = "Тебя я люблю" = "Люблю я тебя" — hepsi "Seni seviyorum".
4. "Почему? — Потому что..." (Neden? — Çünkü...) ikilisi her seviyede hayat kurtarır.`,
    words: [
      { id: 'wg11_1', ru: 'Кто?', reading: 'Kto?', tr: 'Kim? (özne)', level: 'A1', usageNote: 'Cümlenin yapan kişisini bulur: "Кто говорит?"' },
      { id: 'wg11_2', ru: 'Кого?', reading: 'Kavó?', tr: 'Kimi?', level: 'A1', usageNote: '"Кого ты любишь?" (Kimi seviyorsun?) — nesneyi bulur.' },
      { id: 'wg11_3', ru: 'Кому?', reading: 'Kamú?', tr: 'Kime?', level: 'A1', usageNote: '"Кому ты звонишь?" (Kime telefon ediyorsun?).' },
      { id: 'wg11_4', ru: 'С кем?', reading: 'S kyem?', tr: 'Kiminle?', level: 'A1', usageNote: '"С кем ты идёшь?" (Kiminle gidiyorsun?).' },
      { id: 'wg11_5', ru: 'Что?', reading: 'Şto?', tr: 'Ne?', level: 'A1', usageNote: 'ЧТО burada "şto" okunur — istisna!' },
      { id: 'wg11_6', ru: 'Где?', reading: 'Gdye?', tr: 'Nerede?', level: 'A1', usageNote: 'Duran şeyi sorar: "Где ты? — Дома."' },
      { id: 'wg11_7', ru: 'Куда?', reading: 'Kudá?', tr: 'Nereye?', level: 'A1', usageNote: 'Hareketi sorar: "Куда ты? — Домой." Fark önemli!' },
      { id: 'wg11_8', ru: 'Когда?', reading: 'Kagdá?', tr: 'Ne zaman?', level: 'A1', usageNote: '"Когда встретимся?" (Ne zaman buluşuyoruz?).' },
      { id: 'wg11_9', ru: 'Почему?', reading: 'Paçimú?', tr: 'Neden?', level: 'A1', usageNote: 'Cevabı hep "потому что" ile başlar.' },
      { id: 'wg11_10', ru: 'Потому что', reading: 'Patamúşta', tr: 'Çünkü', level: 'A1', usageNote: 'Tek kelime gibi hızlı söylenir: "patamúşta".' },
      { id: 'wg11_11', ru: 'Как?', reading: 'Kak?', tr: 'Nasıl?', level: 'A1', usageNote: '"Как дела?", "Как это по-русски?" (Bu Rusça nasıl denir?).' },
      { id: 'wg11_12', ru: 'Домой / Дома', reading: 'Damóy / Dóma', tr: 'Eve / Evde', level: 'A1', usageNote: 'Куда? -> домой (eve). Где? -> дома (evde). İkiz ama farklı!' }
    ],
    sentences: [
      { ru: 'Кому ты звонишь? — Маме.', tr: 'Kime telefon ediyorsun? — Anneme.', scrambled: ['— Маме.', 'Кому', 'звонишь?', 'ты'], correct: ['Кому', 'ты', 'звонишь?', '— Маме.'] },
      { ru: 'Куда вы идёте? — Домой.', tr: 'Nereye gidiyorsunuz? — Eve.', scrambled: ['идёте?', 'Куда', '— Домой.', 'вы'], correct: ['Куда', 'вы', 'идёте?', '— Домой.'] }
    ],
    sceneTitle: 'Dedektif Oyunu: Cümleyi Çöz',
    sceneContext: 'Rusça öğrenen Aslı, öğretmeniyle "soru kelimesi" oyunu oynar: her cümle soru sorularak parçalarına ayrılır.',
    dialogue: [
      { speaker: 'Öğretmen', ru: '"Мама любит сына". Кто любит?', reading: '"Máma lyúbit sýna". Kto lyúbit?', tr: '"Anne oğlunu seviyor". Kim seviyor?' },
      { speaker: 'Aslı', ru: 'Мама! А кого любит? Сына!', reading: 'Máma! A kavó lyúbit? Sýna!', tr: 'Anne! Peki kimi seviyor? Oğlunu!' },
      { speaker: 'Öğretmen', ru: 'Отлично! А почему "сынА", а не "сын"?', reading: 'Atlíçna! A paçimú "sýna", a ni "syn"?', tr: 'Harika! Peki neden "sına", "sın" değil?' },
      { speaker: 'Aslı', ru: 'Потому что он — не кто, а кого!', reading: 'Patamúşta on — ni kto, a kavó!', tr: 'Çünkü o "kim" değil, "kimi"!' }
    ]
  }
];
