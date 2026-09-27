// ==========================================================
// EK MÜFREDAT — B1 GENİŞLEME PAKETİ 1/2 (Ünite 52-59)
// İş hayatına giriş, emlak, banka ve alışveriş pazarlığı.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_B1A: UnitModule[] = [
  {
    id: 'mod_b1_x1',
    unitNumber: 77,
    levelGroup: 'B1',
    title: 'İş İlanı, CV & Başvuru',
    description: 'İlan okuma, özgeçmiş gönderme ve "deneyimim var" kalıpları',
    category: 'İş Hayatı',
    color: '#6366f1',
    icon: '📄',
    grammarExplain: `📌 İŞ BAŞVURUSU DİLİ:
1. "Устроиться на работу" (Ustróitsa na rabótu) -> "işe girmek". "Я хочу устроиться к вам" (Size başvurmak istiyorum).
2. "Опыт работы" (iş deneyimi) + süre tamlayan hâliyle verilir: "три года опыта" (üç yıl deneyim).
3. "Откликнуться на вакансию" -> ilana başvurmak (kelime kelime: "ilana ses vermek") — iş sitelerinin standart fiilidir.`,
    words: [
      { id: 'wx52_1', ru: 'Работа', reading: 'Rabóta', tr: 'İş', level: 'B1', usageNote: '"Искать работу" (iş aramak) kalıbıyla sık kullanılır.' },
      { id: 'wx52_2', ru: 'Вакансия', reading: 'Vakánsiya', tr: 'İş ilanı / Açık pozisyon', level: 'B1', usageNote: 'İş sitelerinde açık pozisyon anlamındadır.' },
      { id: 'wx52_3', ru: 'Резюме', reading: 'Rizyumé', tr: 'CV / Özgeçmiş', level: 'B1', usageNote: 'Hiç çekimlenmez, hep aynı kalır.' },
      { id: 'wx52_4', ru: 'Опыт', reading: 'Ópıt', tr: 'Deneyim', level: 'B1', usageNote: '"Опыт работы" (iş deneyimi) tamlamasında geçer.' },
      { id: 'wx52_5', ru: 'Зарплата', reading: 'Zarpláta', tr: 'Maaş', level: 'B1', usageNote: '"Заработная плата"nın kısaltmasıdır.' },
      { id: 'wx52_6', ru: 'Собеседование', reading: 'Sabisyédavaniye', tr: 'İş görüşmesi / Mülakat', level: 'B1', usageNote: '"Пригласить на собеседование" (mülakata çağırmak).' },
      { id: 'wx52_7', ru: 'Требования', reading: 'Tryébavaniya', tr: 'Gereksinimler / Şartlar', level: 'B1', usageNote: 'İlanın "aranan şartlar" bölümüdür.' },
      { id: 'wx52_8', ru: 'Навыки', reading: 'Návıki', tr: 'Beceriler', level: 'B1', usageNote: 'CV\'nin "yetenekler" bölümüdür.' },
      { id: 'wx52_9', ru: 'Устроиться на работу', reading: 'Ustróitsa na rabótu', tr: 'İşe girmek', level: 'B1', usageNote: 'Dönüşlü fiildir; "işe yerleşmek" anlamı taşır.' },
      { id: 'wx52_10', ru: 'Откликнуться', reading: 'Atklíknutsa', tr: 'Başvurmak (ilana)', level: 'B1', usageNote: 'İş sitelerindeki "başvur" butonunun fiilidir.' },
      { id: 'wx52_11', ru: 'График работы', reading: 'Gráfik rabóty', tr: 'Çalışma saatleri', level: 'B1', usageNote: '"Гибкий график" (esnek çalışma) çok aranır.' },
      { id: 'wx52_12', ru: 'Удалённо', reading: 'Udalyónna', tr: 'Uzaktan (çalışma)', level: 'B1', usageNote: '"Работать удалённо" (uzaktan çalışmak) modern iş dilidir.' }
    ],
    sentences: [
      { ru: 'Я отправил резюме на вакансию.', tr: 'İlana özgeçmişimi gönderdim.', scrambled: ['резюме', 'Я отправил', 'на вакансию.'], correct: ['Я отправил', 'резюме', 'на вакансию.'] },
      { ru: 'У меня три года опыта работы.', tr: 'Üç yıl iş deneyimim var.', scrambled: ['опыта', 'три года', 'У меня', 'работы.'], correct: ['У меня', 'три года', 'опыта', 'работы.'] }
    ],
    sceneTitle: 'İlanı Görünce Heyecanlanmak',
    sceneContext: 'İki arkadaştan biri hayalindeki iş ilanını bulur; diğeri CV\'sini güncellemesine yardım eder.',
    dialogue: [
      { speaker: 'Marat', ru: 'Смотри, отличная вакансия! Зарплата высокая.', reading: 'Smatrí, atlíçnaya vakánsiya! Zarpláta vısókaya.', tr: 'Bak, harika bir ilan! Maaş yüksek.' },
      { speaker: 'Oksana', ru: 'А какие требования? У тебя есть опыт?', reading: 'A kakíye tryébavaniya? U tibyá yest\' ópıt?', tr: 'Peki şartlar neler? Deneyimin var mı?' },
      { speaker: 'Marat', ru: 'Да, три года. Сейчас обновлю резюме и откликнусь.', reading: 'Da, tri góda. Siyçás abnavlyú rizyumé i atklíknus\'.', tr: 'Evet, üç yıl. Şimdi CV\'yi güncelleyip başvuracağım.' },
      { speaker: 'Oksana', ru: 'Удачи! Уверена, тебя пригласят на собеседование.', reading: 'Udáçi! Uvyérina, tibyá priglasyát na sabisyédavaniye.', tr: 'Bol şans! Eminim seni mülakata çağırırlar.' }
    ]
  },
  {
    id: 'mod_b1_x2',
    unitNumber: 78,
    levelGroup: 'B1',
    title: 'İlk İş Günü & Ofise Uyum',
    description: 'Ekiple tanışma, çalışma alanı ve ilk görevler',
    category: 'İş Hayatı',
    color: '#0ea5e9',
    icon: '🏢',
    grammarExplain: `📌 İLK GÜN KALIPLARI:
1. "Добро пожаловать!" (Dabró pajálavat') -> "Hoş geldiniz!" — yeni çalışana söylenen ilk cümledir.
2. "Познакомить с..." (tanıştırmak) araç hâli ister: "Познакомлю вас с командой" (Sizi ekiple tanıştıracağım).
3. İş yerinde "ты"ya geçiş teklifi: "Давай на ты?" (Sen\'li konuşalım mı?) — Rus ofis kültürünün önemli anıdır.`,
    words: [
      { id: 'wx53_1', ru: 'Коллега', reading: 'Kalyéga', tr: 'İş arkadaşı / Meslektaş', level: 'B1', usageNote: 'Hem erkek hem kadın için aynı kelime kullanılır.' },
      { id: 'wx53_2', ru: 'Начальник', reading: "Naçál'nik", tr: 'Şef / Amir', level: 'B1', usageNote: 'Kadın amir "начальница"dır.' },
      { id: 'wx53_3', ru: 'Отдел', reading: 'Atdyél', tr: 'Departman / Bölüm', level: 'B1', usageNote: '"Отдел продаж" (satış departmanı) gibi kullanılır.' },
      { id: 'wx53_4', ru: 'Задача', reading: 'Zadáça', tr: 'Görev / Task', level: 'B1', usageNote: 'Ofis dilinde "таск" olarak da duyulur.' },
      { id: 'wx53_5', ru: 'Рабочее место', reading: 'Rabóçiye myésta', tr: 'Çalışma alanı / Masa', level: 'B1', usageNote: 'İlk gün gösterilen yerdir.' },
      { id: 'wx53_6', ru: 'Обеденный перерыв', reading: 'Abyédinnıy pirirýf', tr: 'Öğle arası', level: 'B1', usageNote: 'Kısaca "обед" denir: "Пойдём на обед?"' },
      { id: 'wx53_7', ru: 'Добро пожаловать', reading: "Dabró pajálavat'", tr: 'Hoş geldiniz', level: 'B1', usageNote: 'Yeni çalışana ve misafire söylenir.' },
      { id: 'wx53_8', ru: 'Команда', reading: 'Kamánda', tr: 'Ekip / Takım', level: 'B1', usageNote: '"Работать в команде" (ekipte çalışmak) mülakat klasiğidir.' },
      { id: 'wx53_9', ru: 'Пропуск', reading: 'Própusk', tr: 'Giriş kartı', level: 'B1', usageNote: 'Ofis binasına girişte kullanılan karttır.' },
      { id: 'wx53_10', ru: 'Стажировка', reading: 'Stajıróvka', tr: 'Staj / Deneme süresi', level: 'B1', usageNote: '"Испытательный срок" (deneme süresi) ile karıştırılmamalıdır.' },
      { id: 'wx53_11', ru: 'Совещание', reading: 'Savişşániye', tr: 'Toplantı', level: 'B1', usageNote: 'Resmî iş toplantısı anlamındadır.' },
      { id: 'wx53_12', ru: 'Освоиться', reading: 'Asvóitsa', tr: 'Alışmak / Uyum sağlamak', level: 'B1', usageNote: '"Ты быстро освоишься" (Çabuk alışırsın) diye moral verilir.' }
    ],
    sentences: [
      { ru: 'Добро пожаловать в нашу команду!', tr: 'Ekibimize hoş geldiniz!', scrambled: ['в нашу', 'Добро', 'команду!', 'пожаловать'], correct: ['Добро', 'пожаловать', 'в нашу', 'команду!'] },
      { ru: 'Это ваше рабочее место.', tr: 'Burası sizin çalışma alanınız.', scrambled: ['рабочее', 'Это', 'место.', 'ваше'], correct: ['Это', 'ваше', 'рабочее', 'место.'] }
    ],
    sceneTitle: 'İlk Gün Turu',
    sceneContext: 'Yeni işe başlayan Timur\'a ofis turu yaptırılır: masası, ekibi ve ilk görevi tanıtılır.',
    dialogue: [
      { speaker: 'Şef', ru: 'Тимур, добро пожаловать! Это ваш отдел.', reading: 'Timúr, dabró pajálavat\'! Éta vaş atdyél.', tr: 'Timur, hoş geldiniz! Burası sizin departmanınız.' },
      { speaker: 'Timur', ru: 'Спасибо! Очень рад начать работу.', reading: 'Spasíba! Óçin\' rat naçát\' rabótu.', tr: 'Teşekkürler! İşe başladığım için çok mutluyum.' },
      { speaker: 'Şef', ru: 'Вот ваше рабочее место и пропуск. Обед в час.', reading: 'Vot váşe rabóçiye myésta i própusk. Abyét f ças.', tr: 'İşte masanız ve giriş kartınız. Öğle yemeği saat birde.' },
      { speaker: 'Timur', ru: 'Отлично! А когда первое совещание?', reading: 'Atlíçna! A kagdá pyérvaye savişşániye?', tr: 'Harika! Peki ilk toplantı ne zaman?' }
    ]
  },
  {
    id: 'mod_b1_x3',
    unitNumber: 79,
    levelGroup: 'B1',
    title: 'Resmî E-posta & Yazışma Dili',
    description: '"Уважаемый..." hitabı, rica kalıpları ve resmî kapanışlar',
    category: 'İş Hayatı',
    color: '#64748b',
    icon: '✉️',
    grammarExplain: `📌 RESMÎ YAZIŞMA KURALLARI:
1. Hitap: "Уважаемый Иван Петрович!" (Sayın İvan Petroviç!) — isim + baba adı kullanılır, ünlem konur.
2. Rica: "Прошу Вас + mastar" (Sizden ... rica ederim): "Прошу Вас сообщить..." (Bildirmenizi rica ederim).
3. Kapanış: "С уважением, ..." (Saygılarımla, ...) — resmî e-postanın standart imza kalıbıdır. Resmî yazıda "Вы" büyük harfle yazılır.`,
    words: [
      { id: 'wx54_1', ru: 'Уважаемый', reading: 'Uvajáyimıy', tr: 'Sayın', level: 'B1', usageNote: 'Kadın muhataba "Уважаемая" denir.' },
      { id: 'wx54_2', ru: 'С уважением', reading: 'S uvajéniyem', tr: 'Saygılarımla', level: 'B1', usageNote: 'Resmî e-postanın kapanış imzasıdır.' },
      { id: 'wx54_3', ru: 'Прошу', reading: 'Praşú', tr: 'Rica ederim', level: 'B1', usageNote: '"Прошу Вас" + mastar resmî rica kalıbıdır.' },
      { id: 'wx54_4', ru: 'Сообщить', reading: "Saabşşít'", tr: 'Bildirmek', level: 'B1', usageNote: 'Resmî yazışmanın ana fiilidir.' },
      { id: 'wx54_5', ru: 'Вложение', reading: 'Vlajéniye', tr: 'Ek (dosya)', level: 'B1', usageNote: '"Во вложении" (ekte) diye başlanır.' },
      { id: 'wx54_6', ru: 'Срочно', reading: 'Sróçna', tr: 'Acil / Acilen', level: 'B1', usageNote: 'Konu satırında görülünce kalp hızlandırır.' },
      { id: 'wx54_7', ru: 'Ответ', reading: 'Atvyét', tr: 'Cevap / Yanıt', level: 'B1', usageNote: '"Жду Вашего ответа" (Yanıtınızı bekliyorum).' },
      { id: 'wx54_8', ru: 'Тема письма', reading: 'Tyéma pis\'má', tr: 'Konu (e-posta)', level: 'B1', usageNote: 'E-postanın konu satırıdır.' },
      { id: 'wx54_9', ru: 'Заранее спасибо', reading: 'Zaránive spasíba', tr: 'Şimdiden teşekkürler', level: 'B1', usageNote: 'Ricadan sonra eklenen kibar kapanıştır.' },
      { id: 'wx54_10', ru: 'Договор', reading: 'Dagavór', tr: 'Sözleşme', level: 'B1', usageNote: 'İş yazışmalarının en sık konusudur.' },
      { id: 'wx54_11', ru: 'Подтвердить', reading: "Padtvirdít'", tr: 'Onaylamak / Teyit etmek', level: 'B1', usageNote: '"Подтвердите получение" (Alındığını teyit edin).' },
      { id: 'wx54_12', ru: 'В ближайшее время', reading: 'V blijáyşiye vryémya', tr: 'En kısa zamanda', level: 'B1', usageNote: 'Resmî erteleme sanatının temel ifadesidir.' }
    ],
    sentences: [
      { ru: 'Прошу Вас сообщить о решении.', tr: 'Kararı bildirmenizi rica ederim.', scrambled: ['сообщить', 'Прошу Вас', 'о решении.'], correct: ['Прошу Вас', 'сообщить', 'о решении.'] },
      { ru: 'Заранее спасибо за быстрый ответ.', tr: 'Hızlı yanıtınız için şimdiden teşekkürler.', scrambled: ['за быстрый', 'Заранее', 'ответ.', 'спасибо'], correct: ['Заранее', 'спасибо', 'за быстрый', 'ответ.'] }
    ],
    sceneTitle: 'E-posta Taslağı Krizi',
    sceneContext: 'Yeni çalışan, müdüre atacağı ilk resmî e-postayı deneyimli iş arkadaşına kontrol ettirir.',
    dialogue: [
      { speaker: 'Timur', ru: 'Как начать письмо директору? "Привет"?', reading: 'Kak naçát\' pis\'mó diryéktaru? "Privét"?', tr: 'Müdüre e-postaya nasıl başlayayım? "Selam" mı?' },
      { speaker: 'Nina', ru: 'Нет-нет! Пиши: "Уважаемый Сергей Иванович!"', reading: 'Nyet-nyet! Pişí: "Uvajáyimıy Sirgyéy Ivánaviç!"', tr: 'Hayır hayır! Şöyle yaz: "Sayın Sergey İvanoviç!"' },
      { speaker: 'Timur', ru: 'А в конце? "Пока"?', reading: 'A f kantsé? "Paká"?', tr: 'Peki sonunda? "Görüşürüz" mü?' },
      { speaker: 'Nina', ru: 'В конце всегда: "С уважением, Тимур".', reading: 'F kantsé fsigdá: "S uvajéniyem, Timúr".', tr: 'Sonunda her zaman: "Saygılarımla, Timur".' }
    ]
  },
  {
    id: 'mod_b1_x4',
    unitNumber: 80,
    levelGroup: 'B1',
    title: 'Emlakçıyla Daire Gezmek',
    description: 'Daire özellikleri, kat, semt ve "metroya yakın mı" soruları',
    category: 'Emlak & Ev',
    color: '#10b981',
    icon: '🏠',
    grammarExplain: `📌 EMLAK GEZME DİLİ:
1. Kat söyleme: "на пятом этаже" (beşinci katta) — sıra sayısı + предложный hâl kullanılır.
2. "Однокомнатная / двухкомнатная квартира" -> 1+0 / 2+0 daire. Rusya'da oda sayısı salonu da içerir!
3. "Рядом с + araç hâli" -> "...nın yanında": "рядом с метро" (metronun yanında) — ilanların en değerli cümlesi.`,
    words: [
      { id: 'wx55_1', ru: 'Квартира', reading: 'Kvartíra', tr: 'Daire', level: 'B1', usageNote: '"Двухкомнатная квартира" iki odalı daire demektir.' },
      { id: 'wx55_2', ru: 'Недвижимость', reading: "Nidvíjımast'", tr: 'Gayrimenkul / Emlak', level: 'B1', usageNote: '"Агент по недвижимости" emlakçı demektir.' },
      { id: 'wx55_3', ru: 'Комната', reading: 'Kómnata', tr: 'Oda', level: 'B1', usageNote: 'Oda sayısı Rusya\'da salon dahil sayılır.' },
      { id: 'wx55_4', ru: 'Этаж', reading: 'Etáj', tr: 'Kat', level: 'B1', usageNote: '"На каком этаже?" (Kaçıncı katta?) diye sorulur.' },
      { id: 'wx55_5', ru: 'Ремонт', reading: 'Rimónt', tr: 'Tadilat / Dekorasyon', level: 'B1', usageNote: '"Евроремонт" lüks tadilat anlamında kullanılır.' },
      { id: 'wx55_6', ru: 'Мебель', reading: "Myébil'", tr: 'Mobilya', level: 'B1', usageNote: '"С мебелью" (mobilyalı) ilanlarda aranır.' },
      { id: 'wx55_7', ru: 'Светлый', reading: 'Svyétlıy', tr: 'Aydınlık / Işık alan', level: 'B1', usageNote: 'Emlakçının en sevdiği sıfattır.' },
      { id: 'wx55_8', ru: 'Район', reading: 'Rayón', tr: 'Semt / Mahalle', level: 'B1', usageNote: '"Тихий район" (sakin semt) çok aranır.' },
      { id: 'wx55_9', ru: 'Рядом с метро', reading: 'Ryádam s mitró', tr: 'Metroya yakın', level: 'B1', usageNote: 'İlan fiyatını ciddi şekilde artıran ifadedir.' },
      { id: 'wx55_10', ru: 'Осмотр', reading: 'Asmótr', tr: 'Yerinde görme / İnceleme', level: 'B1', usageNote: '"Записаться на осмотр" (görmeye randevu almak).' },
      { id: 'wx55_11', ru: 'Балкон', reading: 'Balkón', tr: 'Balkon', level: 'B1', usageNote: 'Camlı balkon "лоджия" olarak da geçer.' },
      { id: 'wx55_12', ru: 'Соседи', reading: 'Sasyédi', tr: 'Komşular', level: 'B1', usageNote: '"Какие соседи?" sorusu tecrübeli kiracının sorusudur.' }
    ],
    sentences: [
      { ru: 'Квартира на пятом этаже.', tr: 'Daire beşinci katta.', scrambled: ['на пятом', 'Квартира', 'этаже.'], correct: ['Квартира', 'на пятом', 'этаже.'] },
      { ru: 'Район тихий, и метро рядом.', tr: 'Semt sakin ve metro yakın.', scrambled: ['и метро', 'тихий,', 'Район', 'рядом.'], correct: ['Район', 'тихий,', 'и метро', 'рядом.'] }
    ],
    sceneTitle: 'Daire Turu ve Emlakçı Şovu',
    sceneContext: 'Emlakçı, küçük daireyi parlak cümlelerle pazarlamaya çalışır; kiracı adayı gerçekçi sorular sorar.',
    dialogue: [
      { speaker: 'Emlakçı', ru: 'Смотрите, какая светлая квартира! И мебель новая.', reading: 'Smatríte, kakáya svyétlaya kvartíra! I myébil\' nóvaya.', tr: 'Bakın ne kadar aydınlık bir daire! Mobilyalar da yeni.' },
      { speaker: 'Aday', ru: 'А на каком этаже? Есть лифт?', reading: 'A na kakóm etajé? Yest\' lift?', tr: 'Kaçıncı katta? Asansör var mı?' },
      { speaker: 'Emlakçı', ru: 'На девятом, лифт работает отлично. Метро в пяти минутах!', reading: 'Na divyátam, lift rabótait atlíçna. Mitró f pyatí minútah!', tr: 'Dokuzuncu katta, asansör mükemmel çalışıyor. Metro beş dakika mesafede!' },
      { speaker: 'Aday', ru: 'Хорошо. А какие соседи?', reading: 'Haraşó. A kakíye sasyédi?', tr: 'Güzel. Peki komşular nasıl?' }
    ]
  },
  {
    id: 'mod_b1_x5',
    unitNumber: 81,
    levelGroup: 'B1',
    title: 'Kira Sözleşmesi & Depozito',
    description: 'Kontrat imzalama, depozito, faturalar ve taşınma günü',
    category: 'Emlak & Ev',
    color: '#f59e0b',
    icon: '📑',
    grammarExplain: `📌 KİRA SÖZLEŞMESİ DİLİ:
1. "Договор аренды" (kira sözleşmesi) imzalanır: "подписать договор" (sözleşmeyi imzalamak).
2. "Залог" (depozito) genelde bir aylık kiradır; çıkarken iade edilir ("вернуть залог").
3. "Коммунальные услуги" (aidat + faturalar) kiraya dahil mi diye sorulur: "Коммуналка включена?"`,
    words: [
      { id: 'wx56_1', ru: 'Договор аренды', reading: 'Dagavór aryéndy', tr: 'Kira sözleşmesi', level: 'B1', usageNote: 'Kiralama işleminin resmî belgesidir.' },
      { id: 'wx56_2', ru: 'Залог', reading: 'Zalók', tr: 'Depozito', level: 'B1', usageNote: 'Genelde bir aylık kira tutarındadır.' },
      { id: 'wx56_3', ru: 'Аренда', reading: 'Aryénda', tr: 'Kira / Kiralama', level: 'B1', usageNote: '"Сдать в аренду" kiraya vermek, "снять" kiralamaktır.' },
      { id: 'wx56_4', ru: 'Платить', reading: "Platít'", tr: 'Ödemek', level: 'B1', usageNote: '"Платить за квартиру" (kira ödemek).' },
      { id: 'wx56_5', ru: 'Коммунальные услуги', reading: "Kammunál'nıye uslúgi", tr: 'Faturalar / Aidat', level: 'B1', usageNote: 'Günlük dilde "коммуналка" diye kısaltılır.' },
      { id: 'wx56_6', ru: 'Хозяин', reading: 'Hazyáin', tr: 'Ev sahibi', level: 'B1', usageNote: 'Kadın ev sahibi "хозяйка"dır.' },
      { id: 'wx56_7', ru: 'Подписать', reading: "Padpisát'", tr: 'İmzalamak', level: 'B1', usageNote: '"Подпишите здесь" (Burayı imzalayın) denir.' },
      { id: 'wx56_8', ru: 'Срок', reading: 'Srok', tr: 'Süre / Vade', level: 'B1', usageNote: '"Срок аренды — один год" (Kira süresi bir yıl).' },
      { id: 'wx56_9', ru: 'Условия', reading: 'Uslóviya', tr: 'Koşullar / Şartlar', level: 'B1', usageNote: '"На каких условиях?" (Hangi şartlarda?) diye sorulur.' },
      { id: 'wx56_10', ru: 'Въехать', reading: "V'yéhat'", tr: 'Taşınmak (içeri)', level: 'B1', usageNote: 'Eve taşınmak; çıkmak ise "съехать"tır.' },
      { id: 'wx56_11', ru: 'Предоплата', reading: 'Pridapláta', tr: 'Peşin ödeme / Avans', level: 'B1', usageNote: '"Первый и последний месяц" istenmesi yaygındır.' },
      { id: 'wx56_12', ru: 'Вернуть залог', reading: "Virnút' zalók", tr: 'Depozitoyu iade etmek', level: 'B1', usageNote: 'Çıkışta evin durumuna göre iade edilir.' }
    ],
    sentences: [
      { ru: 'Мы подписали договор аренды.', tr: 'Kira sözleşmesini imzaladık.', scrambled: ['договор', 'Мы подписали', 'аренды.'], correct: ['Мы подписали', 'договор', 'аренды.'] },
      { ru: 'Залог — это одна месячная плата.', tr: 'Depozito bir aylık kira tutarıdır.', scrambled: ['одна месячная', 'Залог —', 'плата.', 'это'], correct: ['Залог —', 'это', 'одна месячная', 'плата.'] }
    ],
    sceneTitle: 'İmza Masasında Son Sorular',
    sceneContext: 'Kiracı, sözleşmeyi imzalamadan önce depozito ve faturalarla ilgili kritik soruları ev sahibine sorar.',
    dialogue: [
      { speaker: 'Kiracı', ru: 'Коммунальные услуги включены в аренду?', reading: 'Kammunál\'nıye uslúgi fklyuçiný v aryéndu?', tr: 'Faturalar kiraya dahil mi?' },
      { speaker: 'Ev sahibi', ru: 'Нет, коммуналку вы платите отдельно.', reading: 'Nyet, kammunálku vy platíte atdyél\'na.', tr: 'Hayır, faturaları ayrıca ödüyorsunuz.' },
      { speaker: 'Kiracı', ru: 'А залог вернёте, когда я съеду?', reading: 'A zalók virnyóte, kagdá ya s\'yédu?', tr: 'Peki çıktığımda depozitoyu iade edecek misiniz?' },
      { speaker: 'Ev sahibi', ru: 'Конечно, если всё будет в порядке. Подпишите здесь.', reading: 'Kanyéşna, yésli fsyo búdit f paryátke. Padpişíte zdyes\'.', tr: 'Tabii, her şey yolundaysa. Burayı imzalayın.' }
    ]
  },
  {
    id: 'mod_b1_x6',
    unitNumber: 82,
    levelGroup: 'B1',
    title: 'Bankada Hesap Açma',
    description: 'Hesap açma, gerekli belgeler, kart teslimi ve komisyon soruları',
    category: 'Para & Banka',
    color: '#22c55e',
    icon: '🏦',
    grammarExplain: `📌 BANKA İŞLEMLERİ DİLİ:
1. "Открыть счёт" (Atkrýt' şşyot) -> "hesap açmak". Gişede: "Я хочу открыть счёт".
2. "Снять деньги" (para çekmek) / "положить деньги" (para yatırmak) — zıt işlem çifti olarak ezberlenir.
3. "Комиссия" (komisyon) sorusu her işlemde sorulmalıdır: "Какая комиссия за перевод?" (Havale komisyonu ne kadar?).`,
    words: [
      { id: 'wx57_1', ru: 'Счёт', reading: 'Şşyot', tr: 'Hesap', level: 'B1', usageNote: 'Hem banka hesabı hem restoran hesabı demektir.' },
      { id: 'wx57_2', ru: 'Открыть счёт', reading: "Atkrýt' şşyot", tr: 'Hesap açmak', level: 'B1', usageNote: 'Bankadaki ilk işlemin kalıbıdır.' },
      { id: 'wx57_3', ru: 'Банк', reading: 'Bank', tr: 'Banka', level: 'B1', usageNote: '"В банке" (bankada) şeklinde çekimlenir.' },
      { id: 'wx57_4', ru: 'Документы', reading: 'Dakumyénty', tr: 'Belgeler', level: 'B1', usageNote: 'Pasaport çoğu işlem için yeterlidir.' },
      { id: 'wx57_5', ru: 'Карта', reading: 'Kárta', tr: 'Kart', level: 'B1', usageNote: 'Banka kartı "банковская карта"dır.' },
      { id: 'wx57_6', ru: 'Перевод', reading: 'Pirivót', tr: 'Havale / Transfer', level: 'B1', usageNote: 'Para transferi; aynı kelime "çeviri" de demektir!' },
      { id: 'wx57_7', ru: 'Снять деньги', reading: "Snyat' dyén'gi", tr: 'Para çekmek', level: 'B1', usageNote: 'ATM\'den veya gişeden para çekme fiilidir.' },
      { id: 'wx57_8', ru: 'Положить деньги', reading: "Palajít' dyén'gi", tr: 'Para yatırmak', level: 'B1', usageNote: '"Снять"ın zıttıdır.' },
      { id: 'wx57_9', ru: 'Комиссия', reading: 'Kamíssiya', tr: 'Komisyon / İşlem ücreti', level: 'B1', usageNote: '"Без комиссии" (komisyonsuz) en tatlı ifadedir.' },
      { id: 'wx57_10', ru: 'Наличные', reading: 'Nalíçnıye', tr: 'Nakit', level: 'B1', usageNote: 'Kısaca "нал" da denir (argo).' },
      { id: 'wx57_11', ru: 'Отделение банка', reading: 'Atdilyéniye bánka', tr: 'Banka şubesi', level: 'B1', usageNote: '"Ближайшее отделение" (en yakın şube) diye aranır.' },
      { id: 'wx57_12', ru: 'Оформить', reading: "Afórmit'", tr: 'İşlem yapmak / Düzenlemek', level: 'B1', usageNote: 'Resmî işlerin joker fiilidir: "оформить карту".' }
    ],
    sentences: [
      { ru: 'Я хочу открыть счёт в банке.', tr: 'Bankada hesap açmak istiyorum.', scrambled: ['счёт', 'Я хочу', 'в банке.', 'открыть'], correct: ['Я хочу', 'открыть', 'счёт', 'в банке.'] },
      { ru: 'Какая комиссия за перевод?', tr: 'Havale komisyonu ne kadar?', scrambled: ['за перевод?', 'Какая', 'комиссия'], correct: ['Какая', 'комиссия', 'за перевод?'] }
    ],
    sceneTitle: 'Gişede Hesap Açılışı',
    sceneContext: 'Yabancı bir müşteri bankada hesap açtırır; görevli belgeleri kontrol edip kartın ne zaman hazır olacağını söyler.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Здравствуйте! Я хочу открыть счёт.', reading: 'Zdrástvuyte! Ya haçú atkrýt\' şşyot.', tr: 'Merhaba! Hesap açtırmak istiyorum.' },
      { speaker: 'Görevli', ru: 'Конечно. Ваш паспорт, пожалуйста.', reading: 'Kanyéşna. Vaş páspart, pazhálusta.', tr: 'Tabii. Pasaportunuz lütfen.' },
      { speaker: 'Müşteri', ru: 'Вот. А когда будет готова карта?', reading: 'Vot. A kagdá búdit gatóva kárta?', tr: 'Buyurun. Peki kart ne zaman hazır olur?' },
      { speaker: 'Görevli', ru: 'Через три дня. Переводы внутри банка — без комиссии.', reading: 'Çyéris tri dnya. Pirivódy vnutrí bánka — bis kamíssii.', tr: 'Üç gün içinde. Banka içi havaleler komisyonsuz.' }
    ]
  },
  {
    id: 'mod_b1_x7',
    unitNumber: 83,
    levelGroup: 'B1',
    title: 'Kredi Kartı, Taksit & Borç',
    description: 'Kredi çekme, taksitli alışveriş, faiz ve borç kapama',
    category: 'Para & Banka',
    color: '#a855f7',
    icon: '💳',
    grammarExplain: `📌 KREDİ & TAKSİT DİLİ:
1. "Взять кредит" (kredi çekmek) — kelime kelime "kredi almak". "Я взял кредит на машину" (Araba için kredi çektim).
2. "В рассрочку" (taksitle) — Rusya'da faizsiz taksit kampanyaları "рассрочка 0%" diye reklam edilir.
3. "Погасить долг" (borcu kapatmak) — resmî bankacılık fiilidir; günlük dilde "выплатить" de denir.`,
    words: [
      { id: 'wx58_1', ru: 'Кредит', reading: 'Kridít', tr: 'Kredi', level: 'B1', usageNote: '"Взять кредит" (kredi çekmek) kalıbıyla kullanılır.' },
      { id: 'wx58_2', ru: 'Кредитная карта', reading: 'Kridítnaya kárta', tr: 'Kredi kartı', level: 'B1', usageNote: 'Günlük dilde "кредитка" denir.' },
      { id: 'wx58_3', ru: 'Рассрочка', reading: 'Rassróçka', tr: 'Taksit', level: 'B1', usageNote: '"В рассрочку" (taksitle) satın alınır.' },
      { id: 'wx58_4', ru: 'Процент', reading: 'Pratsént', tr: 'Faiz / Yüzde', level: 'B1', usageNote: '"Под какой процент?" (Hangi faizle?) diye sorulur.' },
      { id: 'wx58_5', ru: 'Долг', reading: 'Dolk', tr: 'Borç', level: 'B1', usageNote: '"Быть в долгах" (borç içinde olmak) deyimi vardır.' },
      { id: 'wx58_6', ru: 'Платёж', reading: 'Platyój', tr: 'Ödeme / Taksit tutarı', level: 'B1', usageNote: '"Ежемесячный платёж" (aylık ödeme) denir.' },
      { id: 'wx58_7', ru: 'Лимит', reading: 'Limít', tr: 'Limit', level: 'B1', usageNote: 'Kart limiti anlamında kullanılır.' },
      { id: 'wx58_8', ru: 'Погасить', reading: "Pagasít'", tr: 'Kapatmak (borç)', level: 'B1', usageNote: 'Aynı fiil "söndürmek" demektir — borç da söndürülür!' },
      { id: 'wx58_9', ru: 'Банкомат', reading: 'Bankamát', tr: 'ATM', level: 'B1', usageNote: '"Снять деньги в банкомате" (ATM\'den para çekmek).' },
      { id: 'wx58_10', ru: 'Выписка', reading: 'Výpiska', tr: 'Hesap özeti / Ekstre', level: 'B1', usageNote: 'Kart ekstresi anlamında kullanılır.' },
      { id: 'wx58_11', ru: 'Ставка', reading: 'Stáfka', tr: 'Oran (faiz)', level: 'B1', usageNote: '"Процентная ставка" (faiz oranı) tam halidir.' },
      { id: 'wx58_12', ru: 'Одобрить', reading: "Adóbrit'", tr: 'Onaylamak', level: 'B1', usageNote: '"Кредит одобрен!" (Kredi onaylandı!) mesajı gelir.' }
    ],
    sentences: [
      { ru: 'Я купил телефон в рассрочку.', tr: 'Telefonu taksitle aldım.', scrambled: ['телефон', 'Я купил', 'в рассрочку.'], correct: ['Я купил', 'телефон', 'в рассрочку.'] },
      { ru: 'Какой процент по этому кредиту?', tr: 'Bu kredinin faizi ne kadar?', scrambled: ['по этому', 'Какой', 'кредиту?', 'процент'], correct: ['Какой', 'процент', 'по этому', 'кредиту?'] }
    ],
    sceneTitle: 'Taksit mi Kredi mi?',
    sceneContext: 'Telefon almak isteyen bir müşteri, mağaza danışmanıyla taksit ve kredi seçeneklerini karşılaştırır.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Можно купить этот телефон в рассрочку?', reading: 'Mójna kupít\' état tilifón v rassróçku?', tr: 'Bu telefonu taksitle alabilir miyim?' },
      { speaker: 'Danışman', ru: 'Да, рассрочка на год без процентов.', reading: 'Da, rassróçka na got bis pratséntaf.', tr: 'Evet, bir yıl faizsiz taksit var.' },
      { speaker: 'Müşteri', ru: 'Отлично! А какой ежемесячный платёж?', reading: 'Atlíçna! A kakóy yıjımyésiçnıy platyój?', tr: 'Harika! Peki aylık ödeme ne kadar?' },
      { speaker: 'Danışman', ru: 'Пять тысяч рублей. Банк уже одобрил!', reading: 'Pyat\' týsyaç rublyéy. Bank ujé adóbril!', tr: 'Beş bin ruble. Banka onayladı bile!' }
    ]
  },
  {
    id: 'mod_b1_x8',
    unitNumber: 84,
    levelGroup: 'B1',
    title: 'Pazar & Manavda Pazarlık',
    description: 'Tartma, tatma, taze ürün seçme ve tatlı-sert pazarlık sanatı',
    category: 'Gündelik Yaşam',
    color: '#ef4444',
    icon: '🍎',
    grammarExplain: `📌 PAZAR PAZARLIĞI DİLİ:
1. "Уступить" (indirim yapmak / fiyattan düşmek): "Уступите немного!" (Biraz inin!) pazarlığın anahtar cümlesidir.
2. "Можно попробовать?" (Tadına bakabilir miyim?) — pazarda tatmak serbesttir, sormak kibarlıktır.
3. "Взвесьте, пожалуйста" (Tartın lütfen) + tamlayan hâl: "килограмм помидоров" (bir kilo domates).`,
    words: [
      { id: 'wx59_1', ru: 'Рынок', reading: 'Rýnak', tr: 'Pazar / Çarşı', level: 'B1', usageNote: '"На рынке" (pazarda) şeklinde kullanılır.' },
      { id: 'wx59_2', ru: 'Свежий', reading: 'Svyéjıy', tr: 'Taze', level: 'B1', usageNote: 'Satıcının en büyük iddiası: "Всё свежее!"' },
      { id: 'wx59_3', ru: 'Килограмм', reading: 'Kilagrám', tr: 'Kilogram', level: 'B1', usageNote: 'Günlük dilde "кило" diye kısaltılır.' },
      { id: 'wx59_4', ru: 'Взвесить', reading: "Vzvyésit'", tr: 'Tartmak', level: 'B1', usageNote: '"Взвесьте, пожалуйста" (Tartın lütfen) denir.' },
      { id: 'wx59_5', ru: 'Продавец', reading: 'Pradavyéts', tr: 'Satıcı', level: 'B1', usageNote: 'Kadın satıcı "продавщица"dır.' },
      { id: 'wx59_6', ru: 'Уступить', reading: "Ustupít'", tr: 'İndirim yapmak / Fiyattan inmek', level: 'B1', usageNote: 'Pazarlığın resmî fiilidir.' },
      { id: 'wx59_7', ru: 'Торговаться', reading: "Targavátsa", tr: 'Pazarlık etmek', level: 'B1', usageNote: 'Pazarda normaldir, mağazada ayıptır.' },
      { id: 'wx59_8', ru: 'Спелый', reading: 'Spyélıy', tr: 'Olgun (meyve)', level: 'B1', usageNote: '"Спелый арбуз" (olgun karpuz) seçmek bir sanattır.' },
      { id: 'wx59_9', ru: 'Попробовать', reading: "Papróbavat'", tr: 'Denemek / Tatmak', level: 'B1', usageNote: '"Можно попробовать?" pazarın sihirli sorusudur.' },
      { id: 'wx59_10', ru: 'Сдача', reading: 'Zdáça', tr: 'Para üstü', level: 'B1', usageNote: '"Ваша сдача" (para üstünüz) denir.' },
      { id: 'wx59_11', ru: 'Дешевле', reading: 'Dişévle', tr: 'Daha ucuz', level: 'B1', usageNote: 'Karşılaştırma hâli: "Сделайте дешевле!" (Ucuzlatın!).' },
      { id: 'wx59_12', ru: 'Полкило', reading: 'Palkiló', tr: 'Yarım kilo', level: 'B1', usageNote: '"Пол-" ön eki "yarım" demektir: полчаса (yarım saat).' }
    ],
    sentences: [
      { ru: 'Можно попробовать этот виноград?', tr: 'Bu üzümün tadına bakabilir miyim?', scrambled: ['этот', 'Можно', 'виноград?', 'попробовать'], correct: ['Можно', 'попробовать', 'этот', 'виноград?'] },
      { ru: 'Уступите немного, я возьму два кило.', tr: 'Biraz indirim yapın, iki kilo alacağım.', scrambled: ['я возьму', 'немного,', 'Уступите', 'два кило.'], correct: ['Уступите', 'немного,', 'я возьму', 'два кило.'] }
    ],
    sceneTitle: 'Pazarda Karpuz Diplomasisi',
    sceneContext: 'Tecrübeli bir müşteri ile espirili pazar satıcısı arasında geçen klasik tat-tart-pazarlık üçlemesi.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Помидоры свежие? Можно попробовать?', reading: 'Pamidóry svyéjıye? Mójna papróbavat\'?', tr: 'Domatesler taze mi? Tadına bakabilir miyim?' },
      { speaker: 'Satıcı', ru: 'Конечно! Сегодня утром с грядки!', reading: 'Kanyéşna! Sivódnya útram s gryátki!', tr: 'Tabii! Bu sabah bahçeden geldi!' },
      { speaker: 'Müşteri', ru: 'Вкусно... Уступите немного? Возьму два килограмма.', reading: 'Fkúsna... Ustupíte nimnóga? Vaz\'mú dva kilagráma.', tr: 'Lezzetliymiş... Biraz iner misiniz? İki kilo alacağım.' },
      { speaker: 'Satıcı', ru: 'Ладно, для вас — дешевле! И вот ваша сдача.', reading: 'Ládna, dlya vas — dişévle! I vot váşa zdáça.', tr: 'Tamam, size özel daha ucuz! İşte para üstünüz.' }
    ]
  }
];
