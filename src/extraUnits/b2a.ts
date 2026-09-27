// ==========================================================
// EK MÜFREDAT — B2 GENİŞLEME PAKETİ 1/2 (Ünite 89-95)
// İleri iş hayatı, ticaret ve büyük para kararları.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_B2A: UnitModule[] = [
  {
    id: 'mod_b2_x1',
    unitNumber: 118,
    levelGroup: 'B2',
    title: 'İş Toplantısı & Sunum Dili',
    description: 'Sunum yapma, grafik yorumlama ve toplantı yönetme kalıpları',
    category: 'İş Hayatı',
    color: '#6366f1',
    icon: '📊',
    grammarExplain: `📌 TOPLANTI & SUNUM DİLİ:
1. "Давайте обсудим..." (Şunu görüşelim...) — toplantıyı yönlendiren kişinin ana kalıbıdır.
2. "Обратите внимание на..." (Dikkatinizi ...ya çekmek isterim) + tamlayan hâl: sunumun sihirli geçiş cümlesi.
3. "Подводя итог..." (Özetlersek...) — zarf-fiil yapısı; sunum kapanışının profesyonel işaretidir.`,
    words: [
      { id: 'wx89_1', ru: 'Совещание', reading: 'Savişşániye', tr: 'Toplantı', level: 'B2', usageNote: 'Resmî iş toplantısıdır; "летучка" kısa ayak üstü toplantıdır.' },
      { id: 'wx89_2', ru: 'Презентация', reading: 'Prizintátsiya', tr: 'Sunum', level: 'B2', usageNote: '"Провести презентацию" (sunum yapmak).' },
      { id: 'wx89_3', ru: 'Отчёт', reading: 'Atçyót', tr: 'Rapor', level: 'B2', usageNote: '"Квартальный отчёт" (çeyrek raporu) klasiktir.' },
      { id: 'wx89_4', ru: 'Показатели', reading: 'Pakazátili', tr: 'Göstergeler / Metrikler', level: 'B2', usageNote: '"Показатели растут" (metrikler yükseliyor) — iyi haber!' },
      { id: 'wx89_5', ru: 'Предлагать', reading: "Pridlagát'", tr: 'Önermek', level: 'B2', usageNote: '"Я предлагаю начать с..." (İlk şununla başlamayı öneriyorum).' },
      { id: 'wx89_6', ru: 'Обсудить', reading: "Absudít'", tr: 'Görüşmek / Tartışmak', level: 'B2', usageNote: '"Давайте обсудим" toplantı açılış kalıbıdır.' },
      { id: 'wx89_7', ru: 'Итог', reading: 'Itók', tr: 'Sonuç / Özet', level: 'B2', usageNote: '"Подводить итоги" (sonuçları toparlamak).' },
      { id: 'wx89_8', ru: 'График', reading: 'Gráfik', tr: 'Grafik / Çizelge', level: 'B2', usageNote: 'Hem grafik hem çalışma takvimi anlamındadır.' },
      { id: 'wx89_9', ru: 'Выступать', reading: "Vıstupát'", tr: 'Konuşma yapmak / Sunmak', level: 'B2', usageNote: '"Выступать перед коллегами" (ekip önünde konuşmak).' },
      { id: 'wx89_10', ru: 'Обратите внимание', reading: 'Abratíte vnimániye', tr: 'Dikkat edin / Dikkatinizi çekerim', level: 'B2', usageNote: 'Sunumun geçiş cümlesidir.' },
      { id: 'wx89_11', ru: 'Повестка дня', reading: 'Pavyéstka dnya', tr: 'Gündem', level: 'B2', usageNote: '"Что у нас на повестке дня?" (Gündemde ne var?).' },
      { id: 'wx89_12', ru: 'Протокол', reading: 'Pratakól', tr: 'Tutanak', level: 'B2', usageNote: 'Toplantı kararlarının yazılı kaydıdır.' }
    ],
    sentences: [
      { ru: 'Давайте обсудим итоги квартала.', tr: 'Çeyreğin sonuçlarını görüşelim.', scrambled: ['итоги', 'Давайте', 'квартала.', 'обсудим'], correct: ['Давайте', 'обсудим', 'итоги', 'квартала.'] },
      { ru: 'Обратите внимание на этот график.', tr: 'Bu grafiğe dikkat edin.', scrambled: ['на этот', 'Обратите', 'график.', 'внимание'], correct: ['Обратите', 'внимание', 'на этот', 'график.'] }
    ],
    sceneTitle: 'Pazartesi Sabahı Sunumu',
    sceneContext: 'Timur ilk büyük sunumunu yapar; şef zor sorular sorar, ama grafikler Timur\'un yanındadır.',
    dialogue: [
      { speaker: 'Timur', ru: 'Коллеги, обратите внимание на график продаж.', reading: 'Kalyégi, abratíte vnimániye na gráfik pradáj.', tr: 'Arkadaşlar, satış grafiğine dikkatinizi çekerim.' },
      { speaker: 'Şef', ru: 'Почему показатели упали в марте?', reading: 'Paçimú pakazátili upáli v márte?', tr: 'Mart\'ta göstergeler neden düştü?' },
      { speaker: 'Timur', ru: 'Хороший вопрос. Я предлагаю новую стратегию.', reading: 'Haróşıy vaprós. Ya pridlagáyu nóvuyu stratyégiyu.', tr: 'Güzel soru. Yeni bir strateji öneriyorum.' },
      { speaker: 'Şef', ru: 'Интересно. Подводя итог — план принят!', reading: 'Intiryésna. Padvadyá itók — plan prínyat!', tr: 'İlginç. Özetlersek — plan kabul edildi!' }
    ]
  },
  {
    id: 'mod_b2_x2',
    unitNumber: 119,
    levelGroup: 'B2',
    title: 'Deadline Krizi & Önceliklendirme',
    description: '"Yetişmiyoruz!" paniği, mesai ve görev önceliği konuşmaları',
    category: 'İş Hayatı',
    color: '#ef4444',
    icon: '⏰',
    grammarExplain: `📌 DEADLINE DİLİ:
1. "Успеть" (yetişmek) — mükemmel görünüşlü fiildir: "Мы не успеваем к сроку" (Termine yetişemiyoruz).
2. "Отложить" (ertelemek) vs "перенести" (başka tarihe almak): toplantı "переносится", görev "откладывается".
3. "В первую очередь" (öncelikle / ilk sırada) — önceliklendirme konuşmasının anahtar zarfıdır.`,
    words: [
      { id: 'wx90_1', ru: 'Срок', reading: 'Srok', tr: 'Termin / Vade', level: 'B2', usageNote: '"Уложиться в срок" (termine sığmak) hedeftir.' },
      { id: 'wx90_2', ru: 'Дедлайн', reading: 'Dedláyn', tr: 'Deadline / Son tarih', level: 'B2', usageNote: 'İngilizceden geçmiştir; ofis dilinde çok yaygındır.' },
      { id: 'wx90_3', ru: 'Успеть', reading: "Uspyét'", tr: 'Yetişmek', level: 'B2', usageNote: '"Мы не успеем!" (Yetişemeyeceğiz!) panik cümlesidir.' },
      { id: 'wx90_4', ru: 'Задержка', reading: 'Zadyérjka', tr: 'Gecikme', level: 'B2', usageNote: '"Задержка по проекту" (projede gecikme).' },
      { id: 'wx90_5', ru: 'Переработка', reading: 'Pirirabótka', tr: 'Fazla mesai', level: 'B2', usageNote: '"Работать сверхурочно" da aynı anlamda kullanılır.' },
      { id: 'wx90_6', ru: 'Приоритет', reading: 'Priaritét', tr: 'Öncelik', level: 'B2', usageNote: '"Расставить приоритеты" (öncelikleri belirlemek).' },
      { id: 'wx90_7', ru: 'Срочный', reading: 'Sróçnıy', tr: 'Acil', level: 'B2', usageNote: '"Срочная задача" (acil görev) her şeyi değiştirir.' },
      { id: 'wx90_8', ru: 'Отложить', reading: "Atlajít'", tr: 'Ertelemek', level: 'B2', usageNote: '"Отложим на завтра" (Yarına erteleyelim).' },
      { id: 'wx90_9', ru: 'Ответственность', reading: "Atvyétstvinnast'", tr: 'Sorumluluk', level: 'B2', usageNote: '"Взять на себя ответственность" (sorumluluğu üstlenmek).' },
      { id: 'wx90_10', ru: 'Распределить', reading: "Raspridilít'", tr: 'Dağıtmak / Paylaştırmak', level: 'B2', usageNote: '"Распределить задачи" (görevleri dağıtmak).' },
      { id: 'wx90_11', ru: 'Горит', reading: 'Garít', tr: 'Yanıyor (iş acil!)', level: 'B2', usageNote: 'Ofis argosu: "Задача горит!" (İş yanıyor = çok acil!).' },
      { id: 'wx90_12', ru: 'Продлить срок', reading: "Pradlít' srok", tr: 'Süreyi uzatmak', level: 'B2', usageNote: 'Müşteriden ek süre istemenin resmî yoludur.' }
    ],
    sentences: [
      { ru: 'Мы не успеваем к сроку.', tr: 'Termine yetişemiyoruz.', scrambled: ['к сроку.', 'Мы', 'не успеваем'], correct: ['Мы', 'не успеваем', 'к сроку.'] },
      { ru: 'Это сейчас главный приоритет.', tr: 'Şu anda ana öncelik bu.', scrambled: ['главный', 'Это сейчас', 'приоритет.'], correct: ['Это сейчас', 'главный', 'приоритет.'] }
    ],
    sceneTitle: 'Cuma 17:45 — Görev "Yanıyor"',
    sceneContext: 'Cuma akşamı gelen acil görev karşısında ekip; kim kalacak, ne ertelenecek, müşteriden süre istenecek mi?',
    dialogue: [
      { speaker: 'Şef', ru: 'Коллеги, задача горит! Клиент ждёт отчёт к понедельнику.', reading: 'Kalyégi, zadáça garít! Kliyént jdyot atçyót k panidyél\'niku.', tr: 'Arkadaşlar, iş yanıyor! Müşteri raporu pazartesiye bekliyor.' },
      { speaker: 'Nina', ru: 'Мы не успеем! Может, продлить срок?', reading: 'My ni uspyéyem! Mójıt, pradlít\' srok?', tr: 'Yetişemeyiz! Belki süreyi uzatalım?' },
      { speaker: 'Şef', ru: 'Нет. Распределим задачи: это — главный приоритет.', reading: 'Nyet. Raspridilím zadáçi: éta — glávnıy priaritét.', tr: 'Hayır. Görevleri dağıtalım: bu, ana öncelik.' },
      { speaker: 'Timur', ru: 'Ладно, я возьму на себя ответственность за график.', reading: 'Ládna, ya vaz\'mú na sibyá atvyétstvinnast\' za gráfik.', tr: 'Tamam, grafiklerin sorumluluğunu ben üstleniyorum.' }
    ]
  },
  {
    id: 'mod_b2_x3',
    unitNumber: 120,
    levelGroup: 'B2',
    title: 'Freelance & Müşteri Pazarlığı',
    description: 'Ücret belirleme, avans, revizyonlar ve iş teslimi',
    category: 'İş Hayatı',
    color: '#0ea5e9',
    icon: '💼',
    grammarExplain: `📌 FREELANCE DİLİ:
1. "Работать на фрилансе" (freelance çalışmak) — kalıp "на"lıdır, "в фрилансе" denmez.
2. "Предоплата — пятьдесят процентов" (Avans yüzde elli) — serbest çalışanın altın kuralı, cümle yapısı "isim — sayı"dır.
3. "Правки" (revizyonlar) hep çoğuldur: "бесконечные правки" (bitmeyen revizyonlar) — freelancer'ın kâbusu!`,
    words: [
      { id: 'wx91_1', ru: 'Фрилансер', reading: 'Frilánsir', tr: 'Serbest çalışan', level: 'B2', usageNote: '"Работать на фрилансе" kalıbıyla kullanılır.' },
      { id: 'wx91_2', ru: 'Заказчик', reading: 'Zakázçik', tr: 'Müşteri / İşveren (proje)', level: 'B2', usageNote: 'Sipariş veren taraf; "клиент"ten daha resmîdir.' },
      { id: 'wx91_3', ru: 'Проект', reading: 'Prayékt', tr: 'Proje', level: 'B2', usageNote: '"Взять проект" (proje almak) denir.' },
      { id: 'wx91_4', ru: 'Ставка', reading: 'Stáfka', tr: 'Ücret / Saatlik ücret', level: 'B2', usageNote: '"Почасовая ставка" (saatlik ücret).' },
      { id: 'wx91_5', ru: 'Предоплата', reading: 'Pridapláta', tr: 'Avans / Ön ödeme', level: 'B2', usageNote: 'Freelancer\'ın sigortasıdır.' },
      { id: 'wx91_6', ru: 'Техническое задание', reading: 'Tihníçiskaye zadániye', tr: 'İş tanımı / Brief', level: 'B2', usageNote: 'Kısaltması "ТЗ" (te-ze) olarak söylenir.' },
      { id: 'wx91_7', ru: 'Правки', reading: 'Práfki', tr: 'Revizyonlar / Düzeltmeler', level: 'B2', usageNote: '"Две правки бесплатно" (iki revizyon ücretsiz).' },
      { id: 'wx91_8', ru: 'Портфолио', reading: 'Partfólio', tr: 'Portfolyo', level: 'B2', usageNote: 'Hiç çekimlenmez.' },
      { id: 'wx91_9', ru: 'Сдать работу', reading: "Zdat' rabótu", tr: 'İşi teslim etmek', level: 'B2', usageNote: '"Сдать в срок" (zamanında teslim etmek).' },
      { id: 'wx91_10', ru: 'Сотрудничество', reading: 'Satrúdniçistva', tr: 'İş birliği', level: 'B2', usageNote: '"Надеюсь на сотрудничество" (İş birliği umarım).' },
      { id: 'wx91_11', ru: 'Гонорар', reading: 'Ganarár', tr: 'Telif / Serbest iş ücreti', level: 'B2', usageNote: 'Proje bazlı ödemenin şık adıdır.' },
      { id: 'wx91_12', ru: 'Обсудить бюджет', reading: "Absudít' byudjét", tr: 'Bütçeyi görüşmek', level: 'B2', usageNote: 'Pazarlığın kibar açılışıdır.' }
    ],
    sentences: [
      { ru: 'Я работаю на фрилансе два года.', tr: 'İki yıldır freelance çalışıyorum.', scrambled: ['на фрилансе', 'Я работаю', 'два года.'], correct: ['Я работаю', 'на фрилансе', 'два года.'] },
      { ru: 'Предоплата — пятьдесят процентов.', tr: 'Avans yüzde elli.', scrambled: ['пятьдесят', 'Предоплата —', 'процентов.'], correct: ['Предоплата —', 'пятьдесят', 'процентов.'] }
    ],
    sceneTitle: '"Küçük Bir Revizyon Daha..."',
    sceneContext: 'Tasarımcı Vera, projeyi üçüncü kez revize etmek isteyen müşteriyle ücret ve sınır pazarlığı yapar.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Вера, можно ещё одну маленькую правку?', reading: 'Vyéra, mójna işşyó adnú málin\'kuyu práfku?', tr: 'Vera, küçük bir revizyon daha olur mu?' },
      { speaker: 'Vera', ru: 'По ТЗ было две правки. Это уже пятая!', reading: 'Pa te-zé býla dvye práfki. Éta ujé pyátaya!', tr: 'Brief\'te iki revizyon vardı. Bu beşincisi!' },
      { speaker: 'Müşteri', ru: 'Хорошо, сколько стоит дополнительная работа?', reading: 'Haraşó, skólka stóit dapalnítil\'naya rabóta?', tr: 'Peki, ek çalışma ne kadar tutar?' },
      { speaker: 'Vera', ru: 'Почасовая ставка плюс предоплата. Тогда продолжим сотрудничество!', reading: 'Paçisaváya stáfka plyus pridapláta. Tagdá pradóljim satrúdniçistva!', tr: 'Saatlik ücret artı avans. O zaman iş birliğine devam!' }
    ]
  },
  {
    id: 'mod_b2_x4',
    unitNumber: 121,
    levelGroup: 'B2',
    title: 'Kendi İşini Kurmak & Girişimcilik',
    description: 'İş fikri, sermaye, kâr-zarar ve rakip analizi sohbetleri',
    category: 'Ticaret & Girişim',
    color: '#f59e0b',
    icon: '🚀',
    grammarExplain: `📌 GİRİŞİMCİLİK DİLİ:
1. "Открыть своё дело" (kendi işini kurmak) — "дело" burada "iş/işletme" anlamındadır.
2. "Вложить деньги во что-то" (bir şeye para yatırmak): "вложить все сбережения" (tüm birikimi yatırmak).
3. "Прибыль растёт / падает" (kâr artıyor / düşüyor) — işletme sohbetinin nabız cümleleridir.`,
    words: [
      { id: 'wx92_1', ru: 'Бизнес', reading: 'Bíznis', tr: 'İş / Ticaret', level: 'B2', usageNote: '"Малый бизнес" (küçük işletme) denir.' },
      { id: 'wx92_2', ru: 'Открыть своё дело', reading: "Atkrýt' svayó dyéla", tr: 'Kendi işini kurmak', level: 'B2', usageNote: 'Girişimciliğin klasik ifadesidir.' },
      { id: 'wx92_3', ru: 'Стартап', reading: 'Startáp', tr: 'Startup / Girişim', level: 'B2', usageNote: 'Teknoloji girişimleri için kullanılır.' },
      { id: 'wx92_4', ru: 'Клиент', reading: 'Kliyént', tr: 'Müşteri', level: 'B2', usageNote: '"Постоянный клиент" (sadık müşteri) altın değerindedir.' },
      { id: 'wx92_5', ru: 'Прибыль', reading: "Príbıl'", tr: 'Kâr', level: 'B2', usageNote: 'Zıttı "убыток" (zarar)dır.' },
      { id: 'wx92_6', ru: 'Расходы', reading: 'Rashódy', tr: 'Giderler / Masraflar', level: 'B2', usageNote: '"Сократить расходы" (giderleri kısmak).' },
      { id: 'wx92_7', ru: 'Риск', reading: 'Risk', tr: 'Risk', level: 'B2', usageNote: '"Кто не рискует, тот не пьёт шампанского" (Risk almayan şampanya içmez) — meşhur atasözü!' },
      { id: 'wx92_8', ru: 'Бизнес-план', reading: 'Bíznis-plan', tr: 'İş planı', level: 'B2', usageNote: 'Yatırımcıya sunulan ilk belgedir.' },
      { id: 'wx92_9', ru: 'Вложить деньги', reading: "Vlajít' dyén'gi", tr: 'Para yatırmak (yatırım)', level: 'B2', usageNote: '"Вложиться" kısa hali de kullanılır.' },
      { id: 'wx92_10', ru: 'Конкуренты', reading: 'Kankuryénty', tr: 'Rakipler', level: 'B2', usageNote: '"Изучить конкурентов" (rakipleri incelemek).' },
      { id: 'wx92_11', ru: 'Окупиться', reading: 'Akupítsa', tr: 'Kendini amorti etmek', level: 'B2', usageNote: '"Бизнес окупился за год" (İş bir yılda kendini çıkardı).' },
      { id: 'wx92_12', ru: 'Сбережения', reading: 'Zbirijéniya', tr: 'Birikimler', level: 'B2', usageNote: 'Hep çoğul kullanılır.' }
    ],
    sentences: [
      { ru: 'Я хочу открыть своё дело.', tr: 'Kendi işimi kurmak istiyorum.', scrambled: ['своё', 'Я хочу', 'дело.', 'открыть'], correct: ['Я хочу', 'открыть', 'своё', 'дело.'] },
      { ru: 'Прибыль растёт каждый месяц.', tr: 'Kâr her ay artıyor.', scrambled: ['каждый', 'Прибыль', 'месяц.', 'растёт'], correct: ['Прибыль', 'растёт', 'каждый', 'месяц.'] }
    ],
    sceneTitle: 'Mutfak Masasında İş Planı',
    sceneContext: 'Lyosha kendi kahve dükkânını açmak ister; temkinli arkadaşı Semyon risk ve masraf hesabı yapar.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Всё, решил! Открываю свою кофейню!', reading: 'Fsyo, rişíl! Atkrıváyu svayú kafyéynyu!', tr: 'Tamam, karar verdim! Kendi kahve dükkânımı açıyorum!' },
      { speaker: 'Semyon', ru: 'А бизнес-план есть? Расходы посчитал?', reading: 'A bíznis-plan yest\'? Rashódy pasşitál?', tr: 'Peki iş planı var mı? Masrafları hesapladın mı?' },
      { speaker: 'Lyosha', ru: 'Вложу сбережения. Рядом нет конкурентов!', reading: 'Vlajú zbirijéniya. Ryádam nyet kankuryéntaf!', tr: 'Birikimlerimi yatıracağım. Yakında rakip yok!' },
      { speaker: 'Semyon', ru: 'Ладно. Кто не рискует, тот не пьёт шампанского!', reading: 'Ládna. Kto ni riskúit, tot ni pyot şampánskava!', tr: 'Tamam. Risk almayan şampanya içmez!' }
    ]
  },
  {
    id: 'mod_b2_x5',
    unitNumber: 122,
    levelGroup: 'B2',
    title: 'Toptan & Perakende Ticaret',
    description: 'Toptan fiyat, stok, kâr marjı ve talep konuşmaları',
    category: 'Ticaret & Girişim',
    color: '#a855f7',
    icon: '📦',
    grammarExplain: `📌 TİCARET DİLİ:
1. "Оптом" (toptan) / "в розницу" (perakende) — zarf olarak kullanılır: "покупать оптом, продавать в розницу".
2. "Наценка" (kâr marjı/fiyat farkı): "наценка тридцать процентов" (yüzde otuz marj).
3. "Спрос на + ismin -i hâli" (bir şeye talep): "Спрос на кофе высокий" (Kahveye talep yüksek).`,
    words: [
      { id: 'wx93_1', ru: 'Опт', reading: 'Opt', tr: 'Toptan', level: 'B2', usageNote: '"Оптом дешевле" (Toptan daha ucuz) — ticaretin ilk kuralı.' },
      { id: 'wx93_2', ru: 'Розница', reading: 'Róznitsa', tr: 'Perakende', level: 'B2', usageNote: '"В розницу" (perakende olarak) satılır.' },
      { id: 'wx93_3', ru: 'Товар', reading: 'Tavár', tr: 'Mal / Ürün', level: 'B2', usageNote: '"Ходовой товар" (çok satan ürün) denir.' },
      { id: 'wx93_4', ru: 'Склад', reading: 'Sklat', tr: 'Depo', level: 'B2', usageNote: '"На складе" (depoda) stok tutulur.' },
      { id: 'wx93_5', ru: 'Поставка', reading: 'Pastáfka', tr: 'Sevkiyat / Tedarik', level: 'B2', usageNote: '"Задержка поставки" (sevkiyat gecikmesi) kriz çıkarır.' },
      { id: 'wx93_6', ru: 'Закупочная цена', reading: 'Zakúpaçnaya tsiná', tr: 'Alış fiyatı', level: 'B2', usageNote: 'Ticaretin gizli tutulan rakamıdır.' },
      { id: 'wx93_7', ru: 'Наценка', reading: 'Natsénka', tr: 'Kâr marjı / Fiyat farkı', level: 'B2', usageNote: 'Alış ile satış arasındaki farktır.' },
      { id: 'wx93_8', ru: 'Партия', reading: 'Pártiya', tr: 'Parti (mal)', level: 'B2', usageNote: '"Первая партия товара" (ilk mal partisi).' },
      { id: 'wx93_9', ru: 'Спрос', reading: 'Spros', tr: 'Talep', level: 'B2', usageNote: 'Zıttı "предложение" (arz)dır.' },
      { id: 'wx93_10', ru: 'Продажи', reading: 'Pradáji', tr: 'Satışlar', level: 'B2', usageNote: '"Продажи выросли" (satışlar arttı) hedeftir.' },
      { id: 'wx93_11', ru: 'Ассортимент', reading: 'Assartimyént', tr: 'Ürün çeşitliliği', level: 'B2', usageNote: '"Широкий ассортимент" (geniş ürün yelpazesi).' },
      { id: 'wx93_12', ru: 'Остаток на складе', reading: 'Astátak na skládye', tr: 'Stok / Depodaki kalan', level: 'B2', usageNote: 'Envanter kontrolünün ana terimidir.' }
    ],
    sentences: [
      { ru: 'Мы покупаем товар оптом.', tr: 'Malı toptan alıyoruz.', scrambled: ['товар', 'Мы покупаем', 'оптом.'], correct: ['Мы покупаем', 'товар', 'оптом.'] },
      { ru: 'Спрос на этот товар очень высокий.', tr: 'Bu ürüne talep çok yüksek.', scrambled: ['на этот товар', 'Спрос', 'высокий.', 'очень'], correct: ['Спрос', 'на этот товар', 'очень', 'высокий.'] }
    ],
    sceneTitle: 'Depoda Stok Sayımı',
    sceneContext: 'Küçük dükkân sahibi ile tedarik sorumlusu, çok satan ürünün bittiğini fark eder ve yeni parti planlar.',
    dialogue: [
      { speaker: 'Patron', ru: 'Какой остаток на складе по кофе?', reading: 'Kakóy astátak na skládye pa kófe?', tr: 'Depoda kahveden ne kadar kaldı?' },
      { speaker: 'Sorumlu', ru: 'Почти ноль! Спрос очень высокий.', reading: 'Paçtí nol\'! Spros óçin\' vısókiy.', tr: 'Neredeyse sıfır! Talep çok yüksek.' },
      { speaker: 'Patron', ru: 'Заказывай новую партию оптом, срочно.', reading: 'Zakázıvay nóvuyu pártiyu óptam, sróçna.', tr: 'Yeni partiyi toptan sipariş et, acilen.' },
      { speaker: 'Sorumlu', ru: 'Хорошо. С наценкой тридцать процентов продадим за неделю!', reading: 'Haraşó. S natsénkay trítsat\' pratséntaf pradadím za nidyélyu!', tr: 'Tamam. Yüzde otuz marjla bir haftada satarız!' }
    ]
  },
  {
    id: 'mod_b2_x6',
    unitNumber: 123,
    levelGroup: 'B2',
    title: 'Tedarikçi Görüşmesi & Sipariş',
    description: 'Numune isteme, hacim indirimi ve teslim süresi pazarlığı',
    category: 'Ticaret & Girişim',
    color: '#22c55e',
    icon: '🤝',
    grammarExplain: `📌 TEDARİK PAZARLIĞI DİLİ:
1. "Договориться о + предложный hâl" (bir konuda anlaşmak): "Мы договорились о скидке" (İndirimde anlaştık).
2. "При заказе от + tamlayan hâl" (şu miktardan itibaren siparişte): "скидка при заказе от ста штук" (100 adetten itibaren indirim).
3. "Оплата по счёту" (fatura karşılığı ödeme) — şirketler arası standart ödeme şeklidir.`,
    words: [
      { id: 'wx94_1', ru: 'Поставщик', reading: 'Pastafşşík', tr: 'Tedarikçi', level: 'B2', usageNote: '"Надёжный поставщик" (güvenilir tedarikçi) aranır.' },
      { id: 'wx94_2', ru: 'Условия', reading: 'Uslóviya', tr: 'Şartlar / Koşullar', level: 'B2', usageNote: '"Выгодные условия" (avantajlı koşullar).' },
      { id: 'wx94_3', ru: 'Скидка при объёме', reading: 'Skítka pri ab\'yóme', tr: 'Hacim indirimi', level: 'B2', usageNote: 'Büyük siparişlere uygulanan indirimdir.' },
      { id: 'wx94_4', ru: 'Контракт', reading: 'Kantrákt', tr: 'Kontrat / Sözleşme', level: 'B2', usageNote: '"Заключить контракт" (kontrat imzalamak).' },
      { id: 'wx94_5', ru: 'Образец', reading: 'Abrazyéts', tr: 'Numune', level: 'B2', usageNote: '"Пришлите образцы" (Numune gönderin) ilk adımdır.' },
      { id: 'wx94_6', ru: 'Качество', reading: 'Káçistva', tr: 'Kalite', level: 'B2', usageNote: '"Проверить качество" (kaliteyi kontrol etmek).' },
      { id: 'wx94_7', ru: 'Срок поставки', reading: 'Srok pastáfki', tr: 'Teslim süresi', level: 'B2', usageNote: 'Kontratın en kritik maddesidir.' },
      { id: 'wx94_8', ru: 'Оплата по счёту', reading: 'Apláta pa şşyótu', tr: 'Fatura ile ödeme', level: 'B2', usageNote: 'B2B ticaretin standart yöntemidir.' },
      { id: 'wx94_9', ru: 'Переговоры', reading: 'Pirigavóry', tr: 'Müzakereler', level: 'B2', usageNote: 'Hep çoğuldur: "вести переговоры" (müzakere yürütmek).' },
      { id: 'wx94_10', ru: 'Договориться', reading: "Dagavarítsa", tr: 'Anlaşmak', level: 'B2', usageNote: '"Договорились!" (Anlaştık!) el sıkışma cümlesidir.' },
      { id: 'wx94_11', ru: 'Счёт-фактура', reading: 'Şşyot-faktúra', tr: 'Fatura (resmî)', level: 'B2', usageNote: 'Muhasebenin istediği belgedir.' },
      { id: 'wx94_12', ru: 'Минимальный заказ', reading: "Minimál'nıy zakás", tr: 'Minimum sipariş', level: 'B2', usageNote: 'Toptancının alt sınırıdır.' }
    ],
    sentences: [
      { ru: 'Пришлите образцы, пожалуйста.', tr: 'Numuneleri gönderin, lütfen.', scrambled: ['образцы,', 'Пришлите', 'пожалуйста.'], correct: ['Пришлите', 'образцы,', 'пожалуйста.'] },
      { ru: 'Мы договорились о скидке при объёме.', tr: 'Hacim indiriminde anlaştık.', scrambled: ['о скидке', 'Мы договорились', 'при объёме.'], correct: ['Мы договорились', 'о скидке', 'при объёме.'] }
    ],
    sceneTitle: 'Kahve Çekirdeği Müzakeresi',
    sceneContext: 'Kafe sahibi Lyosha ilk kez büyük bir tedarikçiyle masaya oturur: numune, fiyat ve teslim süresi sırayla konuşulur.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Мне понравились ваши образцы. Какие условия?', reading: 'Mne panrávilis\' váşi abraztsý. Kakíye uslóviya?', tr: 'Numuneleriniz hoşuma gitti. Koşullar neler?' },
      { speaker: 'Tedarikçi', ru: 'При заказе от ста килограммов — скидка десять процентов.', reading: 'Pri zakáze at sta kilagrámaf — skítka dyésit\' pratséntaf.', tr: 'Yüz kilodan itibaren siparişte yüzde on indirim.' },
      { speaker: 'Lyosha', ru: 'А срок поставки? Мне нужно быстро.', reading: 'A srok pastáfki? Mne nújna býstra.', tr: 'Peki teslim süresi? Hızlı olması lazım.' },
      { speaker: 'Tedarikçi', ru: 'Три дня, оплата по счёту. Договорились?', reading: 'Tri dnya, apláta pa şşyótu. Dagavarílis\'?', tr: 'Üç gün, fatura ile ödeme. Anlaştık mı?' }
    ]
  },
  {
    id: 'mod_b2_x7',
    unitNumber: 124,
    levelGroup: 'B2',
    title: 'Ev Satın Alma & İpotek (Mortgage)',
    description: 'İpotek başvurusu, peşinat, noter ve tapu işlemleri',
    category: 'Emlak & Ev',
    color: '#10b981',
    icon: '🏡',
    grammarExplain: `📌 EV ALIM DİLİ:
1. "Взять ипотеку" (ipotek/konut kredisi çekmek): "ипотека на двадцать лет" (20 yıllık ipotek).
2. "Первоначальный взнос" (peşinat) — genelde %15-20 istenir; kısaca "первый взнос" da denir.
3. "Оформить сделку у нотариуса" (işlemi noterde yapmak) — alım satımın resmî adımıdır.`,
    words: [
      { id: 'wx95_1', ru: 'Ипотека', reading: 'Ipatyéka', tr: 'Konut kredisi / İpotek', level: 'B2', usageNote: '"Взять ипотеку" (ipotek çekmek) denir.' },
      { id: 'wx95_2', ru: 'Первоначальный взнос', reading: "Pirvanaçál'nıy vznos", tr: 'Peşinat', level: 'B2', usageNote: 'Ev fiyatının %15-20\'si istenir.' },
      { id: 'wx95_3', ru: 'Недвижимость', reading: "Nidvíjımast'", tr: 'Gayrimenkul', level: 'B2', usageNote: '"Рынок недвижимости" (emlak piyasası).' },
      { id: 'wx95_4', ru: 'Собственность', reading: "Sópstvinnast'", tr: 'Mülkiyet', level: 'B2', usageNote: '"В собственности" (mülkiyetinde) olmak önemlidir.' },
      { id: 'wx95_5', ru: 'Сделка', reading: 'Zdyélka', tr: 'İşlem / Alım-satım', level: 'B2', usageNote: '"Заключить сделку" (işlemi tamamlamak).' },
      { id: 'wx95_6', ru: 'Нотариус', reading: 'Natárius', tr: 'Noter', level: 'B2', usageNote: 'Alım satımın resmî tanığıdır.' },
      { id: 'wx95_7', ru: 'Оценка квартиры', reading: 'Atsénka kvartíry', tr: 'Ekspertiz / Değerleme', level: 'B2', usageNote: 'Banka krediden önce değerleme ister.' },
      { id: 'wx95_8', ru: 'Ставка по кредиту', reading: 'Stáfka pa kridítu', tr: 'Kredi faiz oranı', level: 'B2', usageNote: 'Yıllık yüzde olarak konuşulur.' },
      { id: 'wx95_9', ru: 'Документы на квартиру', reading: 'Dakumyénty na kvartíru', tr: 'Tapu belgeleri', level: 'B2', usageNote: 'Alım öncesi mutlaka kontrol edilir.' },
      { id: 'wx95_10', ru: 'Зарегистрировать', reading: "Zarigistríravat'", tr: 'Tescil etmek', level: 'B2', usageNote: 'Mülkiyet devri devlette tescil edilir.' },
      { id: 'wx95_11', ru: 'Продавец квартиры', reading: 'Pradavyéts kvartíry', tr: 'Satıcı (ev)', level: 'B2', usageNote: 'Alıcı ise "покупатель"dir.' },
      { id: 'wx95_12', ru: 'Ежемесячный платёж', reading: 'Yıjımyésiçnıy platyój', tr: 'Aylık taksit', level: 'B2', usageNote: 'Bütçenin ana kalemi olur.' }
    ],
    sentences: [
      { ru: 'Мы взяли ипотеку на двадцать лет.', tr: 'Yirmi yıllık ipotek çektik.', scrambled: ['ипотеку', 'Мы взяли', 'на двадцать лет.'], correct: ['Мы взяли', 'ипотеку', 'на двадцать лет.'] },
      { ru: 'Сделку оформит нотариус.', tr: 'İşlemi noter yapacak.', scrambled: ['оформит', 'Сделку', 'нотариус.'], correct: ['Сделку', 'оформит', 'нотариус.'] }
    ],
    sceneTitle: 'Hayat Kararı: İmza Günü',
    sceneContext: 'Dima ve Nastya ilk evlerini alıyor: bankada faiz, peşinat ve aylık taksit hesabı yapılır.',
    dialogue: [
      { speaker: 'Bankacı', ru: 'Ваша ипотека одобрена! Ставка — восемь процентов.', reading: 'Váşa ipatyéka adóbrina! Stáfka — vósim\' pratséntaf.', tr: 'İpoteğiniz onaylandı! Faiz yüzde sekiz.' },
      { speaker: 'Dima', ru: 'А какой ежемесячный платёж?', reading: 'A kakóy yıjımyésiçnıy platyój?', tr: 'Peki aylık taksit ne kadar?' },
      { speaker: 'Bankacı', ru: 'Сорок тысяч. Первоначальный взнос — двадцать процентов.', reading: 'Sórak týsyaç. Pirvanaçál\'nıy vznos — dvátsat\' pratséntaf.', tr: 'Kırk bin. Peşinat yüzde yirmi.' },
      { speaker: 'Nastya', ru: 'Подписываем! Завтра оформим сделку у нотариуса.', reading: 'Padpísıvayem! Záftra afórmim zdyélku u natáriusa.', tr: 'İmzalıyoruz! Yarın noterde işlemi tamamlarız.' }
    ]
  }
];
