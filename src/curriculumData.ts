// ==========================================================
// ORTAK MÜFREDAT KAYNAĞI — Tek veri kaynağı (single source of truth).
// Hem ana uygulama (App.tsx) hem "100 Konu" modülü (src/topics100)
// bu dosyadaki UNITS_DATA üzerindeki aynı formatı kullanır:
//   kelime (WordDetail) + cümle (sentences) + diyalog (dialogue)
// + dinleme metni + gramer açıklaması + Smeshariki sahnesi.
// Seviyeler (A1 -> C1/C2) arasında FORMAT farkı yoktur; yalnızca
// zorluk (kelime düzeyi, cümle karmaşıklığı, gramer derinliği) artar.
// ==========================================================

export interface WordDetail {
  id: string;
  ru: string;
  reading: string;
  tr: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2';
  usageNote: string;
}

export interface DialogueLine {
  speaker: string;
  ru: string;
  reading: string;
  tr: string;
}

// "Смешарики" (Smeshariki) çizgi dizisinden esinlenilmiş, A1/A2 seviyesine uygun BASİT ve
// yavaş tempolu örnek sahneler. Buradaki diyaloglar gerçek dizi senaryosunun birebir kopyası
// DEĞİL, karakterlerin tipik konuşma tarzına uygun, öğretici amaçla yazılmış ORİJİNAL örnek
// cümlelerdir. Amaç: "Anlaşılır Girdi" (Comprehensible Input) yöntemiyle kulağı gerçek çizgi
// dizi temposuna alıştırmak. Video butonu, kelime/repliklerle ilgili GERÇEK bölümü YouTube'da
// aratır (uydurma video ID kullanılmaz).
export interface SmesharikiQuestion {
  prompt: string;       // Rusça soru (sahneyle ilgili anlama sorusu)
  correct: string;
  options: string[];
}

export interface SmesharikiScene {
  episodeRu: string;         // Örnek bölüm/temanın Rusça başlığı
  episodeTr: string;         // Türkçe karşılığı
  characters: string[];      // Sahnede geçen karakterler (Крош, Ёжик, Нюша, Копатыч, Бараш, Совунья, Кар-Карыч, Лосяш, Пин, Смешарик...)
  searchQuery: string;       // Gerçek bölümü YouTube'da aramak için kullanılacak sorgu (uydurma video ID yok, gerçek arama linki)
  contextTr: string;         // Sahnenin Türkçe bağlam açıklaması
  miniDialogue: DialogueLine[]; // Basit, yavaş tempolu pekiştirme diyaloğu
  questions: SmesharikiQuestion[]; // Sahne/diyalog anlama soruları (RU soruluyor, RU/TR seçenekli)
}

export interface UnitModule {
  id: string;
  unitNumber: number;
  levelGroup: 'A1' | 'A2' | 'B1' | 'B2' | 'C1/C2';
  title: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  grammarExplain: string;
  words: WordDetail[];
  sentences: { ru: string; tr: string; scrambled: string[]; correct: string[] }[];
  sceneTitle?: string;
  sceneContext?: string;
  dialogue?: DialogueLine[];
  smeshariki?: SmesharikiScene;
}

// ==========================================
// 3. KONU BAŞLIKLI DERS MÜFREDATI (Günlük Hayat + Dizi Sahneleri)
// ==========================================

// SMESHARIKI sorularının şıkları veri içinde rastgele sıralanır (her açılışta sabit,
// modül seviyesinde çalışır). App.tsx kendi kullanımı için ayrı bir shuffle'ı tutar.
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const UNITS_DATA: UnitModule[] = [
  {
    id: 'mod_a1_1',
    unitNumber: 1,
    levelGroup: 'A1',
    title: 'Tanışma & Selamlaşma',
    description: 'İlk tanışma, hal hatır sorma ve vedalaşma kalıpları',
    category: 'Gündelik Yaşam',
    color: '#8b5cf6',
    icon: '👋',
    grammarExplain: `📌 SELAMLAMA KALIPLARI:
1. "Привет" (Privét) samimi/arkadaşça bir selamdır; "Здравствуйте" (Zdrástvuyte) ise resmi ve saygılı bir selamdır.
2. "Меня зовут..." (Minyá zavút...) -> "Benim adım..." kalıbıdır, kendini tanıtırken kullanılır.`,
    words: [
      { id: 'w_t1', ru: 'Привет', reading: 'Privét', tr: 'Merhaba (samimi)', level: 'A1', usageNote: 'Arkadaşlar arasında kullanılır, büyüklere kaba kaçabilir.' },
      { id: 'w_t2', ru: 'Здравствуйте', reading: 'Zdrástvuyte', tr: 'Merhaba (resmi)', level: 'A1', usageNote: 'Yeni tanıştığınız veya yaşça büyük biriyle konuşurken kullanılır.' },
      { id: 'w_t3', ru: 'Как дела?', reading: 'Kak dilá?', tr: 'Nasılsın?', level: 'A1', usageNote: 'Günlük hal hatır sorma kalıbıdır.' },
      { id: 'w_t4', ru: 'Меня зовут', reading: 'Minyá zavút', tr: 'Benim adım', level: 'A1', usageNote: 'Kendini tanıtırken kullanılan temel kalıptır.' },
      { id: 'w_t5', ru: 'Очень приятно', reading: "Óchen' priyátna", tr: 'Memnun oldum', level: 'A1', usageNote: 'Tanıştıktan hemen sonra söylenen kibarlık cümlesidir.' },
      { id: 'w_t6', ru: 'До свидания', reading: 'Da svidániya', tr: 'Hoşça kal (resmi)', level: 'A1', usageNote: 'Vedalaşırken kullanılır.' },
      { id: 'w_t7', ru: 'Доброе утро', reading: 'Dóbraye útra', tr: 'Günaydın', level: 'A1', usageNote: 'Sabah selamlaşmak için kullanılır.' },
      { id: 'w_t8', ru: 'Добрый вечер', reading: 'Dóbry vécher', tr: 'İyi akşamlar', level: 'A1', usageNote: 'Akşam selamlaşmak için kullanılır.' },
      { id: 'w_t9', ru: 'Спокойной ночи', reading: 'Spakóynoy nóchi', tr: 'İyi geceler', level: 'A1', usageNote: 'Gece vedalaşırken kullanılır.' },
      { id: 'w_t10', ru: 'Пока', reading: 'Paká', tr: 'Görüşürüz', level: 'A1', usageNote: 'Samimi vedalaşırken kullanılır.' },
      { id: 'w_t11', ru: 'Как тебя зовут?', reading: 'Kak tibyá zavút?', tr: 'Adın ne?', level: 'A1', usageNote: 'Samimi bir şekilde isim sorarken kullanılır.' },
      { id: 'w_t12', ru: 'Приятно познакомиться', reading: 'Priyátna paznakómit\'sya', tr: 'Tanıştığıma memnun oldum', level: 'A1', usageNote: 'Tanışma kalıbının tam halidir.' }
    ],
    sentences: [
      { ru: 'Меня зовут Анна.', tr: 'Benim adım Anna.', scrambled: ['Анна.', 'зовут', 'Меня'], correct: ['Меня', 'зовут', 'Анна.'] },
      { ru: 'Как дела, всё хорошо?', tr: 'Nasılsın, her şey iyi mi?', scrambled: ['хорошо?', 'дела,', 'Как', 'всё'], correct: ['Как', 'дела,', 'всё', 'хорошо?'] }
    ],
    sceneTitle: 'Kafede İlk Tanışma',
    sceneContext: 'Bir dizide iki karakterin kafede ilk kez tanıştığı sahne.',
    dialogue: [
      { speaker: 'İvan', ru: 'Здравствуйте! Меня зовут Иван.', reading: 'Zdrástvuyte! Minyá zavút Ivan.', tr: 'Merhaba! Benim adım İvan.' },
      { speaker: 'Anna', ru: 'Очень приятно, Иван. Я Анна.', reading: "Óchen' priyátna, Ivan. Ya Anna.", tr: 'Memnun oldum, İvan. Ben Anna.' },
      { speaker: 'İvan', ru: 'Как у вас дела сегодня?', reading: 'Kak u vas dilá sivódnya?', tr: 'Bugün nasılsınız?' },
      { speaker: 'Anna', ru: 'Спасибо, всё хорошо!', reading: "Spasíba, vsyo haraşó!", tr: 'Teşekkürler, her şey yolunda!' }
    ],
    smeshariki: {
      episodeRu: 'Крош и Ёжик знакомятся',
      episodeTr: 'Kroş ve Yoji tanışıyor',
      characters: ['Крош', 'Ёжик'],
      searchQuery: 'Смешарики первая серия Крош Ёжик',
      contextTr: 'Smeshariki dünyasında meraklı tavşan Kroş, sakin ve kitap seven kirpi Yoji ile ilk kez karşılaşır. Konuşma çok yavaş ve tek tek kelimelerle ilerler — bu yüzden A1 seviyesi için idealdir.',
      miniDialogue: [
        { speaker: 'Крош', ru: 'Привет! Как дела?', reading: 'Privét! Kak dilá?', tr: 'Selam! Nasılsın?' },
        { speaker: 'Ёжик', ru: 'Здравствуй. Меня зовут Ёжик.', reading: "Zdrástvuy. Minyá zavút Yózhik.", tr: 'Merhaba. Benim adım Yoji.' },
        { speaker: 'Крош', ru: 'Очень приятно! Я Крош.', reading: "Óchen' priyátna! Ya Krosh.", tr: 'Memnun oldum! Ben Kroş.' },
        { speaker: 'Крош', ru: 'А это Ёжик?! Смешное имя!', reading: "A éta Yózhik?! Smishnóye ímya!", tr: 'Bu Yoji mi?! Ne komik bir isim!' },
        { speaker: 'Ёжик', ru: 'Не смешное, а простое.', reading: 'Ni smishnóye, a prostóye.', tr: 'Komik değil, sade bir isim.' },
        { speaker: 'Крош', ru: 'Ха-ха, ладно! Будем дружить?', reading: "Kha-kha, ládna! Búdem druzhít'?", tr: 'Haha, tamam! Arkadaş olalım mı?' }
      ],
      questions: [
        { prompt: 'Ёжик Крош\'a nasıl seslenir?', correct: 'Здравствуй', options: shuffle(['Здравствуй', 'До свидания', 'Спокойной ночи', 'Извините']) },
        { prompt: 'Крош kendini tanıtırken hangi kalıbı kullanır?', correct: 'Я Крош', options: shuffle(['Я Крош', 'Это Крош', 'Нет Кроша', 'Крош там']) },
        { prompt: 'Kroş Yoji\'nin ismi hakkında ne düşünür?', correct: 'Смешное имя', options: shuffle(['Смешное имя', 'Красивое имя', 'Длинное имя', 'Странное имя']) },
        { prompt: 'Kroş sahnenin sonunda ne teklif eder?', correct: 'Будем дружить?', options: shuffle(['Будем дружить?', 'Пойдём домой?', 'Хочешь чай?', 'Идём гулять?']) }
      ]
    }
  },
  {
    id: 'mod_a1_2',
    unitNumber: 2,
    levelGroup: 'A1',
    title: 'Aile Tanıtımı',
    description: 'Aile üyelerini tanıtma ve iyelik zamirlerinin temelleri',
    category: 'Gündelik Yaşam',
    color: '#ec4899',
    icon: '👨‍👩‍👧',
    grammarExplain: `📌 AİLE KELİMELERİ VE İYELİK:
1. Rusçada iyelik zamirleri cinsiyete göre değişir: "Мой" (eril) ve "Моя" (dişil). Örn: Мой брат / Моя сестра.
2. "У меня есть..." (U minyá yest'...) -> "Benim ... var" anlamına gelen temel sahiplik kalıbıdır.`,
    words: [
      { id: 'w_f1', ru: 'Семья', reading: "Sim'yá", tr: 'Aile', level: 'A1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_f2', ru: 'Мама', reading: 'Máma', tr: 'Anne', level: 'A1', usageNote: 'Günlük konuşmada en sık kullanılan hitaptır.' },
      { id: 'w_f3', ru: 'Папа', reading: 'Pápa', tr: 'Baba', level: 'A1', usageNote: 'Günlük konuşmada kullanılır.' },
      { id: 'w_f4', ru: 'Брат', reading: 'Brat', tr: 'Erkek kardeş', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_f5', ru: 'Сестра', reading: 'Sistrá', tr: 'Kız kardeş', level: 'A1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_f6', ru: 'Муж', reading: 'Muzh', tr: 'Koca', level: 'A1', usageNote: 'Evli bir kadının eşi için kullanılır.' },
      { id: 'w_f7', ru: 'Дочь', reading: 'Doch\'', tr: 'Kız', level: 'A1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_f8', ru: 'Сын', reading: 'Syn', tr: 'Oğul', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_f9', ru: 'Родители', reading: 'Rodíteli', tr: 'Ebeveynler', level: 'A1', usageNote: 'Çoğul bir kelimedir.' },
      { id: 'w_f10', ru: 'Бабушка', reading: 'Báshka', tr: 'Büyükanne', level: 'A1', usageNote: 'Kadın büyük ebeveyn için kullanılır.' },
      { id: 'w_f11', ru: 'Дедушка', reading: 'Dédushka', tr: 'Büyükbaba', level: 'A1', usageNote: 'Erkek büyük ebeveyn için kullanılır.' },
      { id: 'w_f12', ru: 'Внук', reading: 'Vnuk', tr: 'Torun', level: 'A1', usageNote: 'Eril bir kelimedir.' }
    ],
    sentences: [
      { ru: 'У меня есть брат.', tr: 'Benim bir erkek kardeşim var.', scrambled: ['брат.', 'есть', 'У меня'], correct: ['У меня', 'есть', 'брат.'] },
      { ru: 'Это моя семья.', tr: 'Bu benim ailem.', scrambled: ['семья.', 'моя', 'Это'], correct: ['Это', 'моя', 'семья.'] }
    ],
    sceneTitle: 'Aile Yemeği',
    sceneContext: 'Bir dizide kalabalık bir aile yemeğinde yeni gelen misafirle tanışma sahnesi.',
    dialogue: [
      { speaker: 'Baba', ru: 'Это моя жена и наши дети.', reading: 'Éta mayá zhená i náshi déti.', tr: 'Bu benim eşim ve çocuklarımız.' },
      { speaker: 'Misafir', ru: 'Очень приятно! У вас большая семья.', reading: "Óchen' priyátna! U vas bal'sháya sim'yá.", tr: 'Memnun oldum! Kalabalık bir aileniz varmış.' },
      { speaker: 'Anne', ru: "Да, у нас три сына и одна дочь.", reading: "Da, u nas tri sýna i adná doch'.", tr: 'Evet, üç oğlumuz ve bir kızımız var.' }
    ]
  },
  {
    id: 'mod_a1_3',
    unitNumber: 3,
    levelGroup: 'A1',
    title: 'Kafe & Restoranda Sipariş Verme',
    description: 'Kahve, su sipariş etme ve ödeme yapma diyalogları',
    category: 'Gündelik Yaşam',
    color: '#3b82f6',
    icon: '☕',
    grammarExplain: `📌 KAFE DİNAMİKLERİ VE KULLANIMLAR:
1. "Мне пожалуйста..." (Mne pajáluysta...) -> "Bana lütfen... verin" anlamına gelen en kibar sipariş kalıbıdır.
2. "C собой" (S sabóy) -> Paket servis / Yanıma istiyorum anlamına gelir.`,
    words: [
      { id: 'w1', ru: 'Кофе', reading: 'Kófe', tr: 'Kahve', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w2', ru: 'Пакет', reading: 'Pakét', tr: 'Poşet', level: 'A1', usageNote: 'Kasada "Пакет нужен?" (Poşet lazım mı?) diye sorulur.' },
      { id: 'w3', ru: 'Картой', reading: 'Kártoy', tr: 'Kartla (Ödeme)', level: 'A1', usageNote: 'Ödeme türü bildirirken kullanılır.' },
      { id: 'w3a', ru: 'Стакан', reading: 'Stakán', tr: 'Bardak', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w3b', ru: 'Счёт', reading: 'Shchyot', tr: 'Hesap / Fiş', level: 'A1', usageNote: 'Restoranda ödeme isterken kullanılır.' },
      { id: 'w3c', ru: 'Официант', reading: 'Afitsiánt', tr: 'Garson', level: 'A1', usageNote: 'Erkek garson için kullanılır.' },
      { id: 'w3d', ru: 'Чай', reading: 'Chay', tr: 'Çay', level: 'A1', usageNote: 'Günlük içecek olarak kullanılır.' },
      { id: 'w3e', ru: 'Вода', reading: 'Vadá', tr: 'Su', level: 'A1', usageNote: 'Temel içecek.' },
      { id: 'w3f', ru: 'Сок', reading: 'Sok', tr: 'Meyve suyu', level: 'A1', usageNote: 'Yiyecek içecek olarak kullanılır.' },
      { id: 'w3g', ru: 'Меню', reading: 'Menyú', tr: 'Menü', level: 'A1', usageNote: 'Restoran menüsü için kullanılır.' },
      { id: 'w3h', ru: 'Заказ', reading: 'Zakáz', tr: 'Sipariş', level: 'A1', usageNote: 'Yemek içecek siparişi için kullanılır.' },
      { id: 'w3i', ru: 'Сладкое', reading: 'Sladkóye', tr: 'Tatlı', level: 'A1', usageNote: 'Tatlı yiyecekler için kullanılır.' }
    ],
    sentences: [
      { ru: 'Мне кофе с собой, пожалуйста.', tr: 'Bana paket kahve lütfen.', scrambled: ['пожалуйста.', 'кофе', 'мне', 'с собой,'], correct: ['мне', 'кофе', 'с собой,', 'пожалуйста.'] },
      { ru: 'Дайте мне счёт, пожалуйста.', tr: 'Bana hesabı verin lütfen.', scrambled: ['пожалуйста.', 'мне', 'счёт,', 'Дайте'], correct: ['Дайте', 'мне', 'счёт,', 'пожалуйста.'] }
    ],
    sceneTitle: 'Kafede Sipariş',
    sceneContext: 'Popüler bir gençlik dizisinde geçen tipik bir kafe sipariş sahnesi.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Здравствуйте! Мне кофе с собой, пожалуйста.', reading: 'Zdrástvuyte! Mnye kófe s sabóy, pazhálusta.', tr: 'Merhaba! Bana paket kahve lütfen.' },
      { speaker: 'Barista', ru: 'Конечно! Пакет нужен?', reading: 'Kanéchna! Pakét núzhen?', tr: 'Tabii! Poşet lazım mı?' },
      { speaker: 'Müşteri', ru: 'Нет, спасибо. Я оплачу картой.', reading: 'Nyet, spasíba. Ya apláchu kártay.', tr: 'Hayır, teşekkürler. Kartla ödeyeceğim.' }
    ]
  },
  {
    id: 'mod_a1_4',
    unitNumber: 4,
    levelGroup: 'A1',
    title: 'Şehir Ulaşımı & Yön Sorma',
    description: 'Metro, taksi ve otobüste yol tarifi alma',
    category: 'Ulaşım & Seyahat',
    color: '#10b981',
    icon: '🚇',
    grammarExplain: `📌 ULAŞIM KALIPLARI:
1. "Где находится...?" (Gde nahóditsya) -> "... Nerede bulunuyor?" sorusudur.
2. "Метро" kelimesi Rusçada hiç çekimlenmez, hep aynı kalır.`,
    words: [
      { id: 'w4', ru: 'Метро', reading: 'Mitró', tr: 'Metro', level: 'A1', usageNote: 'Ikanje kuralı sebebiyle Mitró okunur.' },
      { id: 'w5', ru: 'Где', reading: 'Gde', tr: 'Nerede', level: 'A1', usageNote: 'Soru zarfıdır.' },
      { id: 'w5a', ru: 'Автобус', reading: 'Aftóbus', tr: 'Otobüs', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w5b', ru: 'Билет', reading: 'Bilyét', tr: 'Bilet', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w5c', ru: 'Налево', reading: 'Nalyéva', tr: 'Sola', level: 'A1', usageNote: 'Yön zarfıdır.' },
      { id: 'w5d', ru: 'Направо', reading: 'Naprava', tr: 'Sağa', level: 'A1', usageNote: 'Yön zarfıdır.' },
      { id: 'w5e', ru: 'Такси', reading: 'Taksí', tr: 'Taksi', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w5f', ru: 'Трамвай', reading: 'Tramvay', tr: 'Tramvay', level: 'A1', usageNote: 'Şehir içi ulaşım aracıdır.' },
      { id: 'w5g', ru: 'Остановка', reading: 'Ostanóvka', tr: 'Durak', level: 'A1', usageNote: 'Toplu taşıma durakları için kullanılır.' },
      { id: 'w5h', ru: 'Пешком', reading: 'Peshkóm', tr: 'Yürüyerek', level: 'A1', usageNote: 'Yürüyerek gitmek için kullanılır.' },
      { id: 'w5i', ru: 'Прямо', reading: 'Pryáma', tr: 'Düz', level: 'A1', usageNote: 'Yön belirtirken kullanılır.' },
      { id: 'w5j', ru: 'Поворот', reading: 'Povorót', tr: 'Dönüş', level: 'A1', usageNote: 'Yön değişikliği için kullanılır.' }
    ],
    sentences: [
      { ru: 'Где находится метро?', tr: 'Metro nerede bulunuyor?', scrambled: ['метро?', 'находится', 'Где'], correct: ['Где', 'находится', 'метро?'] },
      { ru: 'Автобус едет направо.', tr: 'Otobüs sağa gidiyor.', scrambled: ['направо.', 'едет', 'Автобус'], correct: ['Автобус', 'едет', 'направо.'] }
    ],
    sceneTitle: 'Sokakta Yön Sorma',
    sceneContext: 'Şehirde kaybolan bir karakterin yol sorduğu sahne.',
    dialogue: [
      { speaker: 'Turist', ru: 'Извините, где находится метро?', reading: 'Izviníte, gde nahóditsya mitró?', tr: 'Affedersiniz, metro nerede?' },
      { speaker: 'Yerel', ru: 'Идите прямо, потом налево.', reading: 'Idíte pryáma, patóm nalyéva.', tr: 'Düz gidin, sonra sola dönün.' },
      { speaker: 'Turist', ru: 'Спасибо большое!', reading: "Spasíba bal'shóye!", tr: 'Çok teşekkür ederim!' }
    ]
  },
  {
    id: 'mod_a1_5',
    unitNumber: 5,
    levelGroup: 'A1',
    title: 'Sayılar & Zaman Söyleme',
    description: 'Temel sayılar ve saat sorma-söyleme kalıpları',
    category: 'Gündelik Yaşam',
    color: '#22c55e',
    icon: '🔢',
    grammarExplain: `📌 SAYILAR VE ZAMAN:
1. Rusçada 1'den 4'e kadar sayılardan sonra isim farklı çekimlenir, 5 ve üzeri farklı bir çekim alır; şimdilik sayıları ezberlemek yeterlidir.
2. "Который час?" (Katóriy chas?) -> "Saat kaç?" klasik zaman sorma kalıbıdır.`,
    words: [
      { id: 'w_n1', ru: 'Один', reading: 'Adín', tr: 'Bir', level: 'A1', usageNote: 'Sayının eril halidir.' },
      { id: 'w_n2', ru: 'Два', reading: 'Dva', tr: 'İki', level: 'A1', usageNote: 'Dişil isimlerle "Две" olur.' },
      { id: 'w_n3', ru: 'Три', reading: 'Tri', tr: 'Üç', level: 'A1', usageNote: 'Cinsiyetten bağımsızdır.' },
      { id: 'w_n4', ru: 'Который час?', reading: 'Katóriy chas?', tr: 'Saat kaç?', level: 'A1', usageNote: 'Zaman sorma kalıbıdır.' },
      { id: 'w_n5', ru: 'Час', reading: 'Chas', tr: 'Saat', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_n6', ru: 'Минута', reading: 'Minúta', tr: 'Dakika', level: 'A1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_n7', ru: 'Четыре', reading: 'Chetýre', tr: 'Dört', level: 'A1', usageNote: 'Cinsiyetten bağımsızdır.' },
      { id: 'w_n8', ru: 'Пять', reading: 'Pyat\'', tr: 'Beş', level: 'A1', usageNote: 'Cinsiyetten bağımsızdır.' },
      { id: 'w_n9', ru: 'Шесть', reading: 'Shest\'', tr: 'Altı', level: 'A1', usageNote: 'Cinsiyetten bağımsızdır.' },
      { id: 'w_n10', ru: 'Семь', reading: 'Sem\'', tr: 'Yedi', level: 'A1', usageNote: 'Cinsiyetten bağımsızdır.' },
      { id: 'w_n11', ru: 'Восемь', reading: 'Vósem\'', tr: 'Sekiz', level: 'A1', usageNote: 'Cinsiyetten bağımsızdır.' },
      { id: 'w_n12', ru: 'Девять', reading: 'Dévyat\'', tr: 'Dokuz', level: 'A1', usageNote: 'Cinsiyetten bağımsızdır.' }
    ],
    sentences: [
      { ru: 'Который час сейчас?', tr: 'Şu an saat kaç?', scrambled: ['сейчас?', 'час', 'Который'], correct: ['Который', 'час', 'сейчас?'] },
      { ru: 'У меня два билета.', tr: 'İki biletim var.', scrambled: ['билета.', 'два', 'У меня'], correct: ['У меня', 'два', 'билета.'] }
    ],
    sceneTitle: 'İstasyonda Saat Sorma',
    sceneContext: 'Trene yetişmeye çalışan bir yolcunun sahnesi.',
    dialogue: [
      { speaker: 'Yolcu', ru: 'Извините, который час?', reading: 'Izviníte, katóriy chas?', tr: 'Affedersiniz, saat kaç?' },
      { speaker: 'Yaya', ru: 'Сейчас три часа.', reading: 'Seychás tri chasá.', tr: 'Şu an saat üç.' },
      { speaker: 'Yolcu', ru: 'Спасибо, я опаздываю!', reading: 'Spasíba, ya apázdyvayu!', tr: 'Teşekkürler, geç kalıyorum!' }
    ]
  },
  {
    id: 'mod_a1_6',
    unitNumber: 6,
    levelGroup: 'A1',
    title: 'Hava Durumu & Küçük Sohbet',
    description: 'Hava durumundan bahsetme ve durakta küçük sohbet',
    category: 'Gündelik Yaşam',
    color: '#0ea5e9',
    icon: '🌤️',
    grammarExplain: `📌 HAVA DURUMU KALIPLARI:
1. "На улице..." (Na úlitse...) -> "Dışarısı..." anlamına gelir, hava durumu anlatırken kullanılır.
2. Rusçada hava durumu cümleleri genelde öznesiz kurulur: "Холодно" (Soğuk) tek başına bir cümledir.`,
    words: [
      { id: 'w_w_a', ru: 'Погода', reading: 'Pagóda', tr: 'Hava durumu', level: 'A1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_w_b', ru: 'Холодно', reading: 'Hóladna', tr: 'Soğuk', level: 'A1', usageNote: 'Öznesiz cümle kurar.' },
      { id: 'w_w_c', ru: 'Жарко', reading: 'Zhárka', tr: 'Sıcak', level: 'A1', usageNote: 'Öznesiz cümle kurar.' },
      { id: 'w_w_d', ru: 'Дождь', reading: "Dozhd'", tr: 'Yağmur', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_w_e', ru: 'Солнце', reading: 'Sóntse', tr: 'Güneş', level: 'A1', usageNote: 'Orta cinsiyettedir.' },
      { id: 'w_w_f', ru: 'На улице', reading: 'Na úlitse', tr: 'Dışarıda', level: 'A1', usageNote: 'Yer bildiren kalıptır.' },
      { id: 'w_w_g', ru: 'Ветер', reading: 'Véter', tr: 'Rüzgar', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_w_h', ru: 'Снег', reading: 'Snyeg', tr: 'Kar', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_w_i', ru: 'Туман', reading: 'Tumán', tr: 'Sis', level: 'A1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_w_j', ru: 'Облачно', reading: 'Obláchna', tr: 'Bulutlu', level: 'A1', usageNote: 'Hava durumu için kullanılır.' },
      { id: 'w_w_k', ru: 'Ясно', reading: 'Yásna', tr: 'Açık', level: 'A1', usageNote: 'Hava durumu için kullanılır.' },
      { id: 'w_w_l', ru: 'Пасмурно', reading: 'Pasmúrna', tr: 'Kasvetli', level: 'A1', usageNote: 'Hava durumu için kullanılır.' }
    ],
    sentences: [
      { ru: 'На улице очень холодно.', tr: 'Dışarısı çok soğuk.', scrambled: ['холодно.', 'очень', 'улице', 'На'], correct: ['На', 'улице', 'очень', 'холодно.'] },
      { ru: 'Сегодня будет дождь.', tr: 'Bugün yağmur yağacak.', scrambled: ['дождь.', 'будет', 'Сегодня'], correct: ['Сегодня', 'будет', 'дождь.'] }
    ],
    sceneTitle: 'Durakta Sohbet',
    sceneContext: 'İki komşunun otobüs durağında hava durumu üzerine kısa sohbeti.',
    dialogue: [
      { speaker: 'Komşu 1', ru: 'Какая сегодня погода!', reading: 'Kakáya sivódnya pagóda!', tr: 'Bugün ne biçim hava!' },
      { speaker: 'Komşu 2', ru: "Да, очень холодно и дождь.", reading: "Da, óchen' hóladna i dozhd'.", tr: 'Evet, çok soğuk ve yağmurlu.' }
    ],
    smeshariki: {
      episodeRu: 'Ёжик проверяет погоду',
      episodeTr: 'Yoji hava durumunu kontrol ediyor',
      characters: ['Ёжик', 'Крош', 'Совунья'],
      searchQuery: 'Смешарики погода дождь серия',
      contextTr: 'Hava durumu Smeshariki\'de sıkça işlenen bir temadır: kışın kar, yazın güneş, sonbaharda yağmur karakterlerin planlarını hep değiştirir. Bu basit örnek sahnede Yoji dışarı çıkmadan önce Baykuş Sovunya\'ya hava durumunu sorar.',
      miniDialogue: [
        { speaker: 'Ёжик', ru: 'Совунья, какая сегодня погода?', reading: 'Savún\'ya, kakáya sivódnya pagóda?', tr: 'Sovunya, bugün hava nasıl?' },
        { speaker: 'Совунья', ru: 'На улице холодно и дождь.', reading: "Na úlitse hóladna i dozhd'.", tr: 'Dışarısı soğuk ve yağmurlu.' },
        { speaker: 'Ёжик', ru: 'Тогда я останусь дома.', reading: "Tagdá ya astánus' dóma.", tr: 'O zaman evde kalacağım.' },
        { speaker: 'Крош', ru: 'А может, наоборот, солнце?', reading: "A mózhet, naabarót, sóntse?", tr: 'Ya da tam tersi, güneş olabilir mi?' },
        { speaker: 'Совунья', ru: 'Нет, Крош, я редко ошибаюсь!', reading: "Nyet, Krosh, ya rétka ashibáyus'!", tr: 'Hayır Kroş, ben nadiren yanılırım!' },
        { speaker: 'Ёжик', ru: 'Тогда возьму зонтик на всякий случай.', reading: "Tagdá vaz'mú zóntik na vsyákiy slúchay.", tr: 'O zaman ihtiyaten şemsiye alayım.' }
      ],
      questions: [
        { prompt: 'Sovunya bugünkü havayı nasıl tarif eder?', correct: "Холодно и дождь", options: shuffle(["Холодно и дождь", 'Очень жарко', 'Солнце и тепло', 'Идёт снег']) },
        { prompt: 'Yoji hava durumunu duyunca ne karar verir?', correct: 'Останусь дома', options: shuffle(['Останусь дома', 'Пойду гулять', 'Поеду на автобусе', 'Позвоню другу']) },
        { prompt: 'Kroş alternatif olarak neyi önerir?', correct: 'Солнце', options: shuffle(['Солнце', 'Снег', 'Туман', 'Ветер']) },
        { prompt: 'Yoji sonunda ne yapmaya karar verir?', correct: 'Возьму зонтик', options: shuffle(['Возьму зонтик', 'Позвоню Крошу', 'Пойду гулять', 'Буду петь']) }
      ]
    }
  },
  {
    id: 'mod_a2_1',
    unitNumber: 7,
    levelGroup: 'A2',
    title: 'Alışveriş & Pazarlık',
    description: 'Fiyat sorma, pazarlık etme ve indirim isteme',
    category: 'Gündelik Yaşam',
    color: '#84cc16',
    icon: '🛒',
    grammarExplain: `📌 PAZARLIK KALIPLARI:
1. "Сколько стоит?" (Skól'ka stóit?) -> "Bu ne kadar?" fiyat sorma kalıbıdır.
2. "Это дорого" (Éta dóraga) -> "Bu pahalı" indirim istemek için kullanılan kalıptır.`,
    words: [
      { id: 'w_m1', ru: 'Сколько', reading: "Skól'ka", tr: 'Ne kadar', level: 'A2', usageNote: 'Fiyat veya miktar sorarken kullanılır.' },
      { id: 'w_m2', ru: 'Дорого', reading: 'Dóraga', tr: 'Pahalı', level: 'A2', usageNote: 'Sıfat olarak kullanılır.' },
      { id: 'w_m3', ru: 'Дёшево', reading: 'Dyósheva', tr: 'Ucuz', level: 'A2', usageNote: 'Dóraga kelimesinin zıddıdır.' },
      { id: 'w_m4', ru: 'Скидка', reading: 'Skítka', tr: 'İndirim', level: 'A2', usageNote: 'Mağazalarda sıkça görülen bir kelimedir.' },
      { id: 'w_m5', ru: 'Наличные', reading: 'Nalíchnye', tr: 'Nakit', level: 'A2', usageNote: 'Ödeme şekli belirtirken kullanılır.' },
      { id: 'w_m6', ru: 'Рынок', reading: 'Rýnak', tr: 'Pazar yeri', level: 'A2', usageNote: 'Açık hava pazarları için kullanılır.' },
      { id: 'w_m7', ru: 'Купить', reading: 'Kupít\'', tr: 'Almak', level: 'A2', usageNote: 'Alışveriş fiili olarak kullanılır.' },
      { id: 'w_m8', ru: 'Продать', reading: 'Prodat\'', tr: 'Satmak', level: 'A2', usageNote: 'Satış fiili olarak kullanılır.' },
      { id: 'w_m9', ru: 'Цена', reading: 'Tséná', tr: 'Fiyat', level: 'A2', usageNote: 'Alışverişte fiyat sormak için kullanılır.' },
      { id: 'w_m10', ru: 'Качество', reading: 'Káchestva', tr: 'Kalite', level: 'A2', usageNote: 'Ürün kalitesi için kullanılır.' },
      { id: 'w_m11', ru: 'Размер', reading: 'Razmér', tr: 'Beden', level: 'A2', usageNote: 'Kıyafet bedeni için kullanılır.' },
      { id: 'w_m12', ru: 'Цвет', reading: 'Tsvét', tr: 'Renk', level: 'A2', usageNote: 'Ürün rengi için kullanılır.' }
    ],
    sentences: [
      { ru: 'Сколько это стоит?', tr: 'Bu ne kadar tutuyor?', scrambled: ['стоит?', 'это', 'Сколько'], correct: ['Сколько', 'это', 'стоит?'] },
      { ru: 'Это слишком дорого для меня.', tr: 'Bu benim için çok pahalı.', scrambled: ['меня.', 'дорого', 'слишком', 'Это', 'для'], correct: ['Это', 'слишком', 'дорого', 'для', 'меня.'] }
    ],
    sceneTitle: 'Pazarda Pazarlık',
    sceneContext: 'Yerel bir pazarda geçen tipik bir dizi sahnesi.',
    dialogue: [
      { speaker: 'Satıcı', ru: 'Это очень качественный товар!', reading: "Éta óchen' káchestvinniy tavár!", tr: 'Bu çok kaliteli bir ürün!' },
      { speaker: 'Alıcı', ru: "Может быть, но это дорого.", reading: "Mózhet byt', no éta dóraga.", tr: 'Olabilir, ama bu pahalı.' },
      { speaker: 'Satıcı', ru: 'Хорошо, сделаю скидку для вас.', reading: 'Haraşó, sdélayu skítku dlya vas.', tr: 'Tamam, size indirim yapayım.' }
    ],
    smeshariki: {
      episodeRu: 'Нюша хочет скидку',
      episodeTr: 'Nyuşa indirim istiyor',
      characters: ['Нюша', 'Копатыч'],
      searchQuery: 'Смешарики Нюша магазин покупки серия',
      contextTr: 'Şımarık ve güzelliğine düşkün domuzcuk Nyuşa, alışverişi çok sever ve neredeyse her bölümde yeni bir şey almak ister. Bu sahnede çiftçi Kopatiç\'in tezgahında pazarlık yapar.',
      miniDialogue: [
        { speaker: 'Нюша', ru: 'Копатыч, сколько это стоит?', reading: "Kapátych, skól'ka éta stóit?", tr: 'Kopatiç, bu ne kadar?' },
        { speaker: 'Копатыч', ru: 'Это дорого, Нюша.', reading: 'Éta dóraga, Nyúsha.', tr: 'Bu pahalı, Nyuşa.' },
        { speaker: 'Нюша', ru: 'Сделай скидку, пожалуйста!', reading: 'Sdélay skítku, pazhálusta!', tr: 'Lütfen indirim yap!' },
        { speaker: 'Нюша', ru: 'Ой, я упаду в обморок от цены!', reading: "Oy, ya upadú v ábmarak ad tsiný!", tr: 'Aman, bu fiyattan bayılacağım!' },
        { speaker: 'Копатыч', ru: 'Не преувеличивай, Нюша.', reading: 'Ni priuvilíchivay, Nyúsha.', tr: 'Abartma Nyuşa.' },
        { speaker: 'Нюша', ru: 'Ладно, беру за полцены!', reading: 'Ládna, birú za poltsiný!', tr: 'Tamam, yarı fiyatına alıyorum!' }
      ],
      questions: [
        { prompt: 'Nyuşa Kopatiç\'e ne sorar?', correct: "Сколько это стоит?", options: shuffle(["Сколько это стоит?", 'Где это?', 'Что это?', 'Когда это?']) },
        { prompt: 'Kopatiç ürün hakkında ne söyler?', correct: 'Это дорого', options: shuffle(['Это дорого', 'Это дёшево', 'Это плохо', 'Это ново']) },
        { prompt: 'Nyuşa fiyat karşısında abartarak ne yapacağını söyler?', correct: 'Упаду в обморок', options: shuffle(['Упаду в обморок', 'Пойду домой', 'Куплю два', 'Позвоню маме']) },
        { prompt: 'Nyuşa sonunda ürünü nasıl almayı teklif eder?', correct: 'За полцены', options: shuffle(['За полцены', 'За полную цену', 'Бесплатно', 'В долг']) }
      ]
    }
  },
  {
    id: 'mod_a2_2',
    unitNumber: 8,
    levelGroup: 'A2',
    title: 'Telefon Görüşmesi & Rica',
    description: 'Telefonla konuşma kalıpları ve izin isteme',
    category: 'Gündelik Yaşam',
    color: '#06b6d4',
    icon: '📞',
    grammarExplain: `📌 TELEFON KALIPLARI:
1. "Алло" (Alló) telefon açarken kullanılan evrensel selamdır.
2. "Можно..." (Mózhna) -> "... yapabilir miyim / mümkün mü" izin isteme kalıbıdır.`,
    words: [
      { id: 'w_p1', ru: 'Алло', reading: 'Alló', tr: 'Alo', level: 'A2', usageNote: 'Telefon açarken söylenir.' },
      { id: 'w_p2', ru: 'Телефон', reading: 'Tilifón', tr: 'Telefon', level: 'A2', usageNote: 'Cihazın kendisi için kullanılır.' },
      { id: 'w_p3', ru: 'Можно', reading: 'Mózhna', tr: 'Mümkün mü / -ebilir miyim', level: 'A2', usageNote: 'Kibar izin isteme kalıbıdır.' },
      { id: 'w_p4', ru: 'Перезвонить', reading: "Pirizvanít'", tr: 'Geri aramak', level: 'A2', usageNote: 'Mastar halidir.' },
      { id: 'w_p5', ru: 'Занято', reading: 'Zányata', tr: 'Meşgul (hat)', level: 'A2', usageNote: 'Telefon hattı için kullanılır.' },
      { id: 'w_p6', ru: 'Подожди', reading: 'Padazhdí', tr: 'Bekle', level: 'A2', usageNote: 'Samimi/senli emir kipidir.' },
      { id: 'w_p7', ru: 'Звонить', reading: 'Zvanít\'', tr: 'Aramak', level: 'A2', usageNote: 'Telefon aramak için kullanılır.' },
      { id: 'w_p8', ru: 'Номер', reading: 'Nómer', tr: 'Numara', level: 'A2', usageNote: 'Telefon numarası için kullanılır.' },
      { id: 'w_p9', ru: 'Связь', reading: 'Svyaz\'', tr: 'Bağlantı', level: 'A2', usageNote: 'Telefon bağlantısı için kullanılır.' },
      { id: 'w_p10', ru: 'Сообщение', reading: 'Sabshchéniye', tr: 'Mesaj', level: 'A2', usageNote: 'Kısa mesaj için kullanılır.' },
      { id: 'w_p11', ru: 'Говорить', reading: 'Gavarít\'', tr: 'Konuşmak', level: 'A2', usageNote: 'Telefon konuşması için kullanılır.' },
      { id: 'w_p12', ru: 'Слушать', reading: 'Slúshat\'', tr: 'Dinlemek', level: 'A2', usageNote: 'Telefon konuşmasında kullanılır.' }
    ],
    sentences: [
      { ru: 'Можно перезвонить позже?', tr: 'Daha sonra geri arayabilir miyim?', scrambled: ['позже?', 'перезвонить', 'Можно'], correct: ['Можно', 'перезвонить', 'позже?'] },
      { ru: 'Алло, кто это?', tr: 'Alo, kim bu?', scrambled: ['это?', 'кто', 'Алло,'], correct: ['Алло,', 'кто', 'это?'] }
    ],
    sceneTitle: 'Gece Yarısı Telefonu',
    sceneContext: 'Dizideki gerilim dolu bir gece yarısı telefon sahnesi.',
    dialogue: [
      { speaker: 'Sesli', ru: 'Алло? Кто это говорит?', reading: 'Alló? Kto éta gavarít?', tr: 'Alo? Kim konuşuyor?' },
      { speaker: 'Karakter', ru: 'Это я. Извини, что так поздно.', reading: 'Éta ya. Izviní, shto tak pózdna.', tr: 'Benim. Bu kadar geç aradığım için üzgünüm.' },
      { speaker: 'Sesli', ru: "Что случилось? Ты в порядке?", reading: "Shto sluchílas'? Ty v paryádke?", tr: 'Ne oldu? İyi misin?' }
    ]
  },
  {
    id: 'mod_a2_4',
    unitNumber: 9,
    levelGroup: 'A2',
    title: 'Ev & Eşyalar',
    description: 'Ev, oda ve eşya isimleri, yer bildirme',
    category: 'Gündelik Yaşam',
    color: '#eab308',
    icon: '🏠',
    grammarExplain: `📌 EV EŞYALARI VE YER BELİRTME:
1. "В комнате" (V kómnate) -> "Odada" anlamına gelir, "в" edatı içinde bulunma bildirir.
2. Ev eşyalarının çoğu dişil veya eril isimdir, cinsiyetlerini ezberlemek önemlidir.`,
    words: [
      { id: 'w_ev1', ru: 'Квартира', reading: 'Kvartíra', tr: 'Daire', level: 'A2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_ev2', ru: 'Комната', reading: 'Kómnata', tr: 'Oda', level: 'A2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_ev3', ru: 'Кухня', reading: 'Kúkhnya', tr: 'Mutfak', level: 'A2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_ev4', ru: 'Диван', reading: 'Divan', tr: 'Kanepe', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_ev5', ru: 'Холодильник', reading: "Haladíl'nik", tr: 'Buzdolabı', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_ev6', ru: 'Ключ', reading: 'Klyuch', tr: 'Anahtar', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_ev7', ru: 'Стол', reading: 'Stol', tr: 'Masa', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_ev8', ru: 'Стул', reading: 'Stul', tr: 'Sandalye', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_ev9', ru: 'Кровать', reading: 'Krovát\'', tr: 'Yatak', level: 'A2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_ev10', ru: 'Шкаф', reading: 'Shkaf', tr: 'Dolap', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_ev11', ru: 'Пол', reading: 'Pol', tr: 'Zemin', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_ev12', ru: 'Потолок', reading: 'Patolók', tr: 'Tavan', level: 'A2', usageNote: 'Eril bir kelimedir.' }
    ],
    sentences: [
      { ru: 'Ключ на диване.', tr: 'Anahtar kanepenin üstünde.', scrambled: ['диване.', 'на', 'Ключ'], correct: ['Ключ', 'на', 'диване.'] },
      { ru: 'Моя квартира небольшая.', tr: 'Benim dairem küçük.', scrambled: ['небольшая.', 'квартира', 'Моя'], correct: ['Моя', 'квартира', 'небольшая.'] }
    ],
    sceneTitle: 'Yeni Eve Taşınma',
    sceneContext: 'Bir dizide karakterlerin yeni kiraladıkları daireyi gezme sahnesi.',
    dialogue: [
      { speaker: 'Kiracı', ru: 'Ого, кухня очень маленькая.', reading: "Agó, kúkhnya óchen' málen'kaya.", tr: 'Vay be, mutfak çok küçük.' },
      { speaker: 'Emlakçı', ru: 'Зато комната большая и светлая.', reading: "Zató kómnata bal'sháya i svétlaya.", tr: 'Ama oda büyük ve aydınlık.' }
    ]
  },
  {
    id: 'mod_a2_5',
    unitNumber: 10,
    levelGroup: 'A2',
    title: 'Randevu Alma & Zaman Planlama',
    description: 'Buluşma teklif etme ve zaman planlama kalıpları',
    category: 'Gündelik Yaşam',
    color: '#f97316',
    icon: '📅',
    grammarExplain: `📌 RANDEVU KALIPLARI:
1. "Давайте встретимся..." (Davayte fstrétimsya) -> "Buluşalım..." teklif etme kalıbıdır.
2. Günler ve saatler "в" edatıyla kullanılır: "В пятницу" (Cuma günü), "В три часа" (Saat üçte).`,
    words: [
      { id: 'w_rz1', ru: 'Встреча', reading: 'Fstrécha', tr: 'Buluşma', level: 'A2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_rz2', ru: 'Свободен', reading: 'Svabóden', tr: 'Müsait (erkek)', level: 'A2', usageNote: 'Sıfatın eril halidir.' },
      { id: 'w_rz3', ru: 'Занят', reading: 'Zányat', tr: 'Meşgul (erkek)', level: 'A2', usageNote: 'Sıfatın eril halidir.' },
      { id: 'w_rz4', ru: 'Завтра', reading: 'Záftra', tr: 'Yarın', level: 'A2', usageNote: 'Zaman zarfıdır.' },
      { id: 'w_rz5', ru: 'Договорились', reading: "Dagavarílis'", tr: 'Anlaştık', level: 'A2', usageNote: 'Sözlü anlaşma onayıdır.' },
      { id: 'w_rz6', ru: 'Опоздать', reading: "Apazdát'", tr: 'Geç kalmak', level: 'A2', usageNote: 'Mastar halidir.' },
      { id: 'w_rz7', ru: 'Встретиться', reading: 'Fstrétit\'sya', tr: 'Bulaşmak', level: 'A2', usageNote: 'Dönüşlü mastar halidir.' },
      { id: 'w_rz8', ru: 'Время', reading: 'Vrémya', tr: 'Zaman', level: 'A2', usageNote: 'Orta cinsiyet bir kelimedir.' },
      { id: 'w_rz9', ru: 'День', reading: 'Dyen\'', tr: 'Gün', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_rz10', ru: 'Неделя', reading: 'Nedélya', tr: 'Hafta', level: 'A2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_rz11', ru: 'Месяц', reading: 'Mesyáts', tr: 'Ay', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_rz12', ru: 'Сегодня', reading: 'Sivódnya', tr: 'Bugün', level: 'A2', usageNote: 'Zaman zarfıdır.' }
    ],
    sentences: [
      { ru: 'Давайте встретимся завтра.', tr: 'Yarın buluşalım.', scrambled: ['завтра.', 'встретимся', 'Давайте'], correct: ['Давайте', 'встретимся', 'завтра.'] },
      { ru: 'Я не хочу опоздать.', tr: 'Geç kalmak istemiyorum.', scrambled: ['опоздать.', 'не', 'хочу', 'Я'], correct: ['Я', 'не', 'хочу', 'опоздать.'] }
    ],
    sceneTitle: 'Randevu Ayarlama',
    sceneContext: 'İki karakterin telefonda buluşma saati kararlaştırdığı sahne.',
    dialogue: [
      { speaker: 'Ali', ru: 'Ты свободен завтра вечером?', reading: 'Ty svabóden záftra véchiram?', tr: 'Yarın akşam müsait misin?' },
      { speaker: 'Deniz', ru: "Да, давай встретимся в семь.", reading: "Da, davay fstrétimsya v syem'.", tr: 'Evet, saat yedide buluşalım.' },
      { speaker: 'Ali', ru: "Договорились!", reading: "Dagavarílis'!", tr: 'Anlaştık!' }
    ]
  },
  {
    id: 'mod_a2_3',
    unitNumber: 11,
    levelGroup: 'A2',
    title: 'Mutfak Kaosu & Emir Kipleri',
    description: 'Restoran mutfağı jargonu ve hızlı komutlar',
    category: 'Dizi & Mutfak Jargonu',
    color: '#f59e0b',
    icon: '👨‍🍳',
    grammarExplain: `📌 EMİR KİPLERİ:
1. "Быстро!" (Hızlı / Çabuk) kelimesi vurgulu Ы sesi içerir.
2. "Шеф" kelimesi mutfakta patrona verilen unvandır.`,
    words: [
      { id: 'w6', ru: 'Шеф', reading: 'Shef', tr: 'Şef / Patron', level: 'A2', usageNote: 'İş yerinde amir için kullanılır.' },
      { id: 'w7', ru: 'Быстро', reading: 'Býstra', tr: 'Çabuk / Hızlı', level: 'A2', usageNote: 'Vurgusuz O harfi A okunur.' },
      { id: 'w7a', ru: 'Соус', reading: 'Sóus', tr: 'Sos', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w7b', ru: 'Кухня', reading: 'Kúkhnya', tr: 'Mutfak', level: 'A2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w7c', ru: 'Готово', reading: 'Gatóva', tr: 'Hazır', level: 'A2', usageNote: 'Sıfat olarak kullanılır.' },
      { id: 'w7d', ru: 'Заказ', reading: 'Zakáz', tr: 'Sipariş', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w7e', ru: 'Помогите', reading: 'Pamagíte', tr: 'Yardım edin', level: 'A2', usageNote: 'Kibar rica için kullanılır.' },
      { id: 'w7f', ru: 'Подождите', reading: 'Padazhdíte', tr: 'Bekleyin', level: 'A2', usageNote: 'Kibar rica için kullanılır.' },
      { id: 'w7g', ru: 'Горячо', reading: 'Goryácha', tr: 'Sıcak', level: 'A2', usageNote: 'Mutfakta sıcaklık için kullanılır.' },
      { id: 'w7h', ru: 'Холодно', reading: 'Kholódna', tr: 'Soğuk', level: 'A2', usageNote: 'Mutfakta soğukluk için kullanılır.' },
      { id: 'w7i', ru: 'Вкусно', reading: 'Vkúsna', tr: 'Lezzetli', level: 'A2', usageNote: 'Yemek kalitesi için kullanılır.' },
      { id: 'w7j', ru: 'Солить', reading: 'Solít\'', tr: 'Tuzlamak', level: 'A2', usageNote: 'Yemek pişirme için kullanılır.' },
      { id: 'w7k', ru: 'Жарить', reading: 'Zharít\'', tr: 'Kızartmak', level: 'A2', usageNote: 'Yemek pişirme için kullanılır.' }
    ],
    sentences: [
      { ru: 'Быстро принеси соус!', tr: 'Çabuk sosu getir!', scrambled: ['соус!', 'принеси', 'Быстро'], correct: ['Быстро', 'принеси', 'соус!'] },
      { ru: 'Заказ для стола пять готов.', tr: 'Beşinci masanın siparişi hazır.', scrambled: ['готов.', 'пять', 'для стола', 'Заказ'], correct: ['Заказ', 'для стола', 'пять', 'готов.'] }
    ],
    sceneTitle: 'Restoran Mutfağında Kaos',
    sceneContext: 'Yoğun bir akşam servisinde geçen mutfak dizisi sahnesi.',
    dialogue: [
      { speaker: 'Şef', ru: "Быстро! Где соус для стола пять?", reading: "Býstra! Gde sóus dlya stalá pyat'?", tr: 'Çabuk! Beşinci masanın sosu nerede?' },
      { speaker: 'Aşçı', ru: 'Уже несу, шеф!', reading: 'Uzhé nisú, shef!', tr: 'Getiriyorum şef!' },
      { speaker: 'Şef', ru: 'Быстрее, гости ждут!', reading: 'Bystréye, gósti zhdut!', tr: 'Daha hızlı, misafirler bekliyor!' }
    ]
  },
  {
    id: 'mod_a2_6',
    unitNumber: 12,
    levelGroup: 'A2',
    title: 'Duygular & Ruh Hali',
    description: 'Temel duyguları ifade etme ve birine ne hissettiğini sorma',
    category: 'Gündelik Yaşam',
    color: '#f43f5e',
    icon: '😊',
    grammarExplain: `📌 DUYGU İFADE ETME:
1. "Мне грустно / весело" (Mnye grústna / véselo) -> "Üzgünüm / Neşeliyim" kalıpları Rusçada bana-durumu (dative) ile kurulur, özne kullanılmaz.
2. "Что случилось?" (Shto sluchílas'?) -> "Ne oldu?" birine sorun olup olmadığını sorma kalıbıdır.`,
    words: [
      { id: 'w_d1', ru: 'Грустно', reading: 'Grústna', tr: 'Üzgün / Kederli', level: 'A2', usageNote: 'Öznesiz kullanılır: Мне грустно.' },
      { id: 'w_d2', ru: 'Весело', reading: 'Véselo', tr: 'Neşeli / Eğlenceli', level: 'A2', usageNote: 'Grústna kelimesinin zıddıdır.' },
      { id: 'w_d3', ru: 'Скучно', reading: 'Skúchna', tr: 'Sıkıcı / Canı sıkkın', level: 'A2', usageNote: 'Genelde "Мне скучно" şeklinde kullanılır.' },
      { id: 'w_d4', ru: 'Боюсь', reading: "Bayús'", tr: 'Korkuyorum', level: 'A2', usageNote: "'Бояться' fiilinin ben çekimidir." },
      { id: 'w_d5', ru: 'Обиделся', reading: "Abídelsya", tr: 'Alındı / Gücendi', level: 'A2', usageNote: 'Eril özne için kullanılır.' },
      { id: 'w_d6', ru: 'Что случилось?', reading: "Shto sluchílas'?", tr: 'Ne oldu?', level: 'A2', usageNote: 'Endişe belirten soru kalıbıdır.' }
    ],
    sentences: [
      { ru: 'Мне сегодня грустно.', tr: 'Bugün üzgünüm.', scrambled: ['грустно.', 'сегодня', 'Мне'], correct: ['Мне', 'сегодня', 'грустно.'] },
      { ru: 'Что случилось, ты обиделся?', tr: 'Ne oldu, alındın mı?', scrambled: ['обиделся?', 'случилось,', 'ты', 'Что'], correct: ['Что', 'случилось,', 'ты', 'обиделся?'] }
    ],
    sceneTitle: 'Bank Üzerinde Sohbet',
    sceneContext: 'Bir dizide iki arkadaşın parkta oturup birbirinin ruh halini sorduğu duygusal sahne.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'Что случилось? Тебе грустно?', reading: "Shto sluchílas'? Tibyé grústna?", tr: 'Ne oldu? Üzgün müsün?' },
      { speaker: 'Arkadaş 2', ru: 'Да, немного. А ты?', reading: 'Da, nimnóga. A ty?', tr: 'Evet, biraz. Ya sen?' },
      { speaker: 'Arkadaş 1', ru: 'Мне весело, не переживай!', reading: "Mnye véselo, ni pirizhivháy!", tr: 'Ben neşeliyim, üzülme!' }
    ],
    smeshariki: {
      episodeRu: 'Бараш грустит',
      episodeTr: 'Baraş üzülüyor',
      characters: ['Бараш', 'Крош', 'Нюша'],
      searchQuery: 'Смешарики Бараш грустит стихи серия',
      contextTr: 'Melankolik ve şair ruhlu koç Baraş, dizide sık sık kederlenir ve şiir yazar. Arkadaşları onu neşelendirmeye çalışır — bu, "duygu" kelimelerini öğrenmek için mükemmel bir sahnedir.',
      miniDialogue: [
        { speaker: 'Крош', ru: 'Бараш, что случилось?', reading: "Barásh, shto sluchílas'?", tr: 'Baraş, ne oldu?' },
        { speaker: 'Бараш', ru: 'Мне очень грустно, Крош.', reading: "Mnye óchen' grústna, Krosh.", tr: 'Çok üzgünüm, Kroş.' },
        { speaker: 'Нюша', ru: 'Не грусти! Будет весело!', reading: 'Ni grustí! Búdet véselo!', tr: 'Üzülme! Eğlenceli olacak!' },
        { speaker: 'Бараш', ru: 'Даже облака сегодня грустные...', reading: "Dázhe abluká sivódnya grústnyye...", tr: 'Bugün bulutlar bile üzgün...' },
        { speaker: 'Крош', ru: 'Ха-ха, Бараш, это просто облака!', reading: 'Kha-kha, Barásh, éta prósta abluká!', tr: 'Haha Baraş, onlar sadece bulut!' },
        { speaker: 'Бараш', ru: 'Ладно... Пойдём есть пирог?', reading: "Ládna... Paydyóm yest' pirók?", tr: 'Tamam... Pasta yemeye gidelim mi?' }
      ],
      questions: [
        { prompt: 'Kroş Baraş\'a ne sorar?', correct: "Что случилось?", options: shuffle(["Что случилось?", 'Куда ты идёшь?', 'Сколько тебе лет?', 'Где твой дом?']) },
        { prompt: 'Nyuşa Baraş\'ı neşelendirmek için ne der?', correct: 'Будет весело!', options: shuffle(['Будет весело!', 'Будет скучно!', 'Мне грустно!', 'Я боюсь!']) },
        { prompt: 'Baraş neyi bile üzgün bulur?', correct: 'Облака', options: shuffle(['Облака', 'Деревья', 'Цветы', 'Птицы']) },
        { prompt: 'Baraş sonunda ne teklif eder?', correct: 'Есть пирог', options: shuffle(['Есть пирог', 'Спать', 'Плакать', 'Читать стихи']) }
      ]
    }
  },
  {
    id: 'mod_a2_7',
    unitNumber: 13,
    levelGroup: 'A2',
    title: 'Doktor & Sağlık',
    description: 'Hastalık belirtilerini anlatma ve doktordan randevu alma',
    category: 'Sağlık',
    color: '#0891b2',
    icon: '🩺',
    grammarExplain: `📌 SAĞLIK KALIPLARI:
1. "У меня болит..." (U minyá balít...) -> "Benim ... ağrıyor" kalıbı vücut kısmıyla birlikte kullanılır.
2. "Мне нужен врач" (Mnye núzhen vrach) -> "Doktora ihtiyacım var" temel talep cümlesidir.`,
    words: [
      { id: 'w_h1', ru: 'Болит', reading: 'Balít', tr: 'Ağrıyor', level: 'A2', usageNote: '"У меня болит голова" -> Başım ağrıyor.' },
      { id: 'w_h2', ru: 'Голова', reading: 'Galavá', tr: 'Baş', level: 'A2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_h3', ru: 'Врач', reading: 'Vrach', tr: 'Doktor', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_h4', ru: 'Больница', reading: "Bal'nítsa", tr: 'Hastane', level: 'A2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_h5', ru: 'Лекарство', reading: 'Likárstva', tr: 'İlaç', level: 'A2', usageNote: 'Orta cinsiyettedir.' },
      { id: 'w_h6', ru: 'Температура', reading: 'Timpiratúra', tr: 'Ateş / Sıcaklık', level: 'A2', usageNote: '"У меня температура" -> Ateşim var.' }
    ],
    sentences: [
      { ru: 'У меня болит голова.', tr: 'Başım ağrıyor.', scrambled: ['голова.', 'болит', 'У меня'], correct: ['У меня', 'болит', 'голова.'] },
      { ru: 'Мне нужен врач и лекарство.', tr: 'Doktora ve ilaca ihtiyacım var.', scrambled: ['лекарство.', 'врач', 'и', 'Мне нужен'], correct: ['Мне нужен', 'врач', 'и', 'лекарство.'] }
    ],
    sceneTitle: 'Muayenehanede',
    sceneContext: 'Bir dizide karakterin ateşlenip doktora gittiği sahne.',
    dialogue: [
      { speaker: 'Hasta', ru: 'Доктор, у меня болит голова и температура.', reading: 'Dóktar, u minyá balít galavá i timpiratúra.', tr: 'Doktor, başım ağrıyor ve ateşim var.' },
      { speaker: 'Doktor', ru: 'Хорошо, я дам вам лекарство.', reading: 'Haraşó, ya dam vam likárstva.', tr: 'Tamam, size ilaç vereceğim.' }
    ],
    smeshariki: {
      episodeRu: 'Совунья лечит Кроша',
      episodeTr: 'Sovunya Kroş\'u tedavi ediyor',
      characters: ['Совунья', 'Крош'],
      searchQuery: 'Смешарики Совунья доктор лечит серия',
      contextTr: 'Baykuş Sovunya köyün doktoru gibidir; sağlıklı yaşam ve doğal tedaviler konusunda ısrarcıdır. Bu sahnede başı ağrıyan Kroş\'u muayene eder.',
      miniDialogue: [
        { speaker: 'Крош', ru: 'Совунья, у меня болит голова.', reading: 'Savún\'ya, u minyá balít galavá.', tr: 'Sovunya, başım ağrıyor.' },
        { speaker: 'Совунья', ru: 'У тебя температура?', reading: 'U tibyá timpiratúra?', tr: 'Ateşin var mı?' },
        { speaker: 'Крош', ru: 'Да, кажется, есть.', reading: "Da, kázhetsya, yest'.", tr: 'Evet, sanırım var.' },
        { speaker: 'Совунья', ru: 'Это потому, что ты съел десять пирожков!', reading: "Éta patamú, shto ty s'yel désit' pirazhkóv!", tr: 'Çünkü on tane börek yedin!' },
        { speaker: 'Крош', ru: 'Всего десять? Это же мало!', reading: "Fsivó désit'? Éta zhe málo!", tr: 'Sadece on mu? Bu az sayılır ki!' },
        { speaker: 'Совунья', ru: 'Ох, Крош... Пей чай с травами.', reading: 'Okh, Krosh... Pyey chay s trávami.', tr: 'Oh Kroş... Bitki çayı iç.' }
      ],
      questions: [
        { prompt: 'Kroş\'un neresi ağrıyor?', correct: 'Голова', options: shuffle(['Голова', 'Нога', 'Рука', 'Живот']) },
        { prompt: 'Sovunya Kroş\'a ne sorar?', correct: 'У тебя температура?', options: shuffle(['У тебя температура?', 'Где ты живёшь?', 'Сколько тебе лет?', 'Ты голоден?']) },
        { prompt: 'Sovunya\'ya göre Kroş\'un başı neden ağrıyor?', correct: 'Съел десять пирожков', options: shuffle(['Съел десять пирожков', 'Мало спал', 'Много бегал', 'Простудился']) },
        { prompt: 'Sovunya Kroş\'a ne içmesini önerir?', correct: 'Чай с травами', options: shuffle(['Чай с травами', 'Холодную воду', 'Молоко', 'Сок']) }
      ]
    }
  },
  {
    id: 'mod_a2_8',
    unitNumber: 14,
    levelGroup: 'A2',
    title: 'Hobiler & Boş Zaman',
    description: 'Hobilerden bahsetme ve boş zaman etkinlikleri teklif etme',
    category: 'Gündelik Yaşam',
    color: '#65a30d',
    icon: '🎨',
    grammarExplain: `📌 HOBİ KALIPLARI:
1. "Я люблю..." (Ya lyublyú...) -> "... severim" fiilinin ardından mastar veya isim gelir.
2. "Давай..." (Daváy...) -> "Hadi ..." teklif etme kalıbıdır, arkadaşça bir çağrıdır.`,
    words: [
      { id: 'w_hb1', ru: 'Рисовать', reading: 'Risavát\'', tr: 'Resim çizmek', level: 'A2', usageNote: 'Mastar halidir.' },
      { id: 'w_hb2', ru: 'Петь', reading: "Pyet'", tr: 'Şarkı söylemek', level: 'A2', usageNote: 'Mastar halidir.' },
      { id: 'w_hb3', ru: 'Читать', reading: "Chitát'", tr: 'Okumak', level: 'A2', usageNote: 'Mastar halidir.' },
      { id: 'w_hb4', ru: 'Изобретать', reading: 'Izabritát\'', tr: 'İcat etmek', level: 'A2', usageNote: 'Mastar halidir.' },
      { id: 'w_hb5', ru: 'Свободное время', reading: 'Svabódnaye vrémya', tr: 'Boş zaman', level: 'A2', usageNote: 'Orta cinsiyette bir isim öbeğidir.' },
      { id: 'w_hb6', ru: 'Давай...', reading: 'Daváy...', tr: 'Hadi ...', level: 'A2', usageNote: 'Teklif etme kalıbıdır.' }
    ],
    sentences: [
      { ru: 'Я люблю рисовать и петь.', tr: 'Resim çizmeyi ve şarkı söylemeyi severim.', scrambled: ['петь.', 'и', 'рисовать', 'Я люблю'], correct: ['Я люблю', 'рисовать', 'и', 'петь.'] },
      { ru: 'Давай почитаем в свободное время.', tr: 'Hadi boş zamanda kitap okuyalım.', scrambled: ['время.', 'свободное', 'в', 'почитаем', 'Давай'], correct: ['Давай', 'почитаем', 'в', 'свободное', 'время.'] }
    ],
    sceneTitle: 'Yağmurlu Bir Günde',
    sceneContext: 'Bir dizide arkadaşların yağmurlu bir günde evde ne yapacaklarını konuştuğu sahne.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'На улице дождь. Что будем делать?', reading: "Na úlitse dozhd'. Shto búdim délat'?", tr: 'Dışarıda yağmur var. Ne yapacağız?' },
      { speaker: 'Arkadaş 2', ru: 'Давай рисовать!', reading: 'Daváy risavát\'!', tr: 'Hadi resim çizelim!' }
    ],
    smeshariki: {
      episodeRu: 'Лосяш изобретает, Кар-Карыч поёт',
      episodeTr: 'Losyaş icat yapıyor, Kar-Karıç şarkı söylüyor',
      characters: ['Лосяш', 'Кар-Карыч', 'Пин'],
      searchQuery: 'Смешарики Лосяш изобретение Кар-Карыч поёт серия',
      contextTr: 'Bilim insanı geyik Losyaş sürekli yeni bir şey icat eder, eski aktör karga Kar-Karıç ise şarkı söylemeyi ve hikaye anlatmayı sever. Her karakterin farklı bir hobisi olması, bu kelimeleri karakterlerle ilişkilendirerek ezberlemeyi kolaylaştırır.',
      miniDialogue: [
        { speaker: 'Пин', ru: 'Лосяш, что ты любишь делать?', reading: "Lasyásh, shto ty lyúbish' délat'?", tr: 'Losyaş, ne yapmayı seversin?' },
        { speaker: 'Лосяш', ru: 'Я люблю изобретать.', reading: "Ya lyublyú izabritát'.", tr: 'İcat etmeyi severim.' },
        { speaker: 'Кар-Карыч', ru: 'А я люблю петь!', reading: "A ya lyublyú pyet'!", tr: 'Ben de şarkı söylemeyi severim!' },
        { speaker: 'Пин', ru: 'А я люблю чинить роботов!', reading: "A ya lyublyú chinít' rabótav!", tr: 'Ben de robot tamir etmeyi severim!' },
        { speaker: 'Кар-Карыч', ru: 'О, тогда почини мой голос, он скрипит!', reading: 'O, tagdá pachiní moy gólas, on skripít!', tr: 'O zaman sesimi tamir et, gıcırdıyor!' },
        { speaker: 'Лосяш', ru: 'Ха! Это уже не техника, а искусство.', reading: "Kha! Éta uzhé ni tékhnika, a iskústva.", tr: 'Ha! O artık teknik değil, sanat.' }
      ],
      questions: [
        { prompt: 'Losyaş neyi sevdiğini söyler?', correct: 'Изобретать', options: shuffle(['Изобретать', 'Петь', 'Рисовать', 'Читать']) },
        { prompt: 'Kar-Karıç hangi hobiyi sever?', correct: 'Петь', options: shuffle(['Петь', 'Изобретать', 'Готовить', 'Спать']) },
        { prompt: 'Pin\'in hobisi nedir?', correct: 'Чинить роботов', options: shuffle(['Чинить роботов', 'Петь', 'Рисовать', 'Готовить']) },
        { prompt: 'Kar-Karıç şaka yaparak Pin\'den ne ister?', correct: 'Почини мой голос', options: shuffle(['Почини мой голос', 'Почини робота', 'Почини стул', 'Почини часы']) }
      ]
    }
  },
  {
    id: 'mod_a2_9',
    unitNumber: 15,
    levelGroup: 'A2',
    title: 'Komşuluk İlişkileri',
    description: 'Komşuyla tanışma, gürültü şikayeti, iyilik isteme ve site kuralları',
    category: 'Gündelik Yaşam',
    color: '#a3a3a3',
    icon: '🏘️',
    grammarExplain: `📌 KOMŞULUK KALIPLARI:
1. "Не могли бы вы..." (Ni maglí by vy...) -> "... yapabilir misiniz acaba" son derece kibar bir rica kalıbıdır, tanımadığın komşuya bile rahatça kullanılır.
2. "Простите за беспокойство" (Prastíte za bespakóystva) -> "Rahatsızlık için özür dilerim" komşu kapısını çalarken söylenen klasik giriş cümlesidir.`,
    words: [
      { id: 'w_ns1', ru: 'Сосед', reading: 'Sasyéd', tr: 'Komşu (erkek)', level: 'A2', usageNote: 'Dişili "Соседка" (Sasyétka) şeklindedir.' },
      { id: 'w_ns2', ru: 'Шум', reading: 'Shum', tr: 'Gürültü', level: 'A2', usageNote: 'Eril bir kelimedir; "Шумно" (gürültülü) sıfat/zarf halidir.' },
      { id: 'w_ns3', ru: 'Тихо', reading: 'Tíha', tr: 'Sessizce / Sessiz', level: 'A2', usageNote: 'Rica cümlelerinde çok kullanılır: "Потише, пожалуйста".' },
      { id: 'w_ns4', ru: 'Подъезд', reading: "Pad'yézd", tr: 'Apartman girişi / Bina bloğu', level: 'A2', usageNote: 'Rus apartmanlarında her giriş "подъезд" olarak numaralandırılır.' },
      { id: 'w_ns5', ru: 'Одолжить', reading: "Adalzhít'", tr: 'Ödünç vermek/almak', level: 'A2', usageNote: 'Bağlama göre iki anlama da gelebilir.' },
      { id: 'w_ns6', ru: 'Мусор', reading: 'Músar', tr: 'Çöp', level: 'A2', usageNote: 'Eril bir kelimedir; "Вынести мусор" -> çöpü atmak.' },
      { id: 'w_ns7', ru: 'Ремонт', reading: 'Rimónt', tr: 'Tadilat / Tamirat', level: 'A2', usageNote: 'Komşu şikayetlerinde en sık geçen kelimelerden biridir.' },
      { id: 'w_ns8', ru: 'Не могли бы вы...', reading: 'Ni maglí by vy...', tr: '...yapabilir misiniz acaba', level: 'A2', usageNote: 'En kibar rica kalıbıdır, resmi ortamlarda da kullanılır.' }
    ],
    sentences: [
      { ru: 'Не могли бы вы говорить потише?', tr: 'Biraz daha sessiz konuşabilir misiniz acaba?', scrambled: ['потише?', 'говорить', 'Не могли бы вы'], correct: ['Не могли бы вы', 'говорить', 'потише?'] },
      { ru: 'Простите за шум, у нас ремонт.', tr: 'Gürültü için özür dilerim, tadilatımız var.', scrambled: ['ремонт.', 'шум,', 'у нас', 'Простите за'], correct: ['Простите за', 'шум,', 'у нас', 'ремонт.'] }
    ],
    sceneTitle: 'Kapı Çalan Komşu',
    sceneContext: 'Bir dizide gece geç saatte gürültüden rahatsız olan komşunun kapıyı çaldığı klasik sahne.',
    dialogue: [
      { speaker: 'Komşu', ru: 'Простите за беспокойство. У вас очень шумно.', reading: 'Prastíte za bespakóystva. U vas óchen\' shúmna.', tr: 'Rahatsızlık için özür dilerim. Sizde çok gürültü var.' },
      { speaker: 'Ev sahibi', ru: 'Извините, у нас ремонт. Мы будем тише.', reading: "Izviníte, u nas rimónt. My búdim tíshe.", tr: 'Özür dilerim, tadilatımız var. Daha sessiz olacağız.' },
      { speaker: 'Komşu', ru: 'Спасибо за понимание!', reading: "Spasíba za panimániye!", tr: 'Anlayışınız için teşekkürler!' }
    ]
  },
  {
    id: 'mod_a2_10',
    unitNumber: 16,
    levelGroup: 'A2',
    title: 'Özür, Teşekkür & Nezaket İfadeleri',
    description: 'Günlük hayatta sıkça kullanılan kibarlık ve nezaket kalıpları',
    category: 'Gündelik Yaşam',
    color: '#fbbf24',
    icon: '🙏',
    grammarExplain: `📌 NEZAKET İNCELİKLERİ:
1. "Извините" (Izviníte) daha çok dikkat çekmek/rahatsız etmek için, "Простите" (Prastíte) ise gerçek bir hata için özür dilerken kullanılır — ince ama önemli bir fark.
2. "Ничего страшного" (Nichivó strashnóva) -> "Önemli değil / Sorun yok" cevabı, özrü kabul ederken söylenir.`,
    words: [
      { id: 'w_p1a', ru: 'Извините', reading: 'Izviníte', tr: 'Affedersiniz / Bakar mısınız', level: 'A2', usageNote: 'Dikkat çekmek veya küçük rahatsızlıklar için kullanılır.' },
      { id: 'w_p2a', ru: 'Простите', reading: 'Prastíte', tr: 'Özür dilerim', level: 'A2', usageNote: 'Gerçek bir hatadan sonra kullanılır.' },
      { id: 'w_p3a', ru: 'Ничего страшного', reading: 'Nichivó strashnóva', tr: 'Önemli değil / Sorun yok', level: 'A2', usageNote: 'Bir özrü nazikçe kabul etme cümlesidir.' },
      { id: 'w_p4a', ru: 'Спасибо большое', reading: "Spasíba bal'shóye", tr: 'Çok teşekkürler', level: 'A2', usageNote: 'Basit "Spasibo"dan daha içten bir teşekkürdür.' },
      { id: 'w_p5a', ru: 'Пожалуйста', reading: 'Pazhálusta', tr: 'Rica ederim / Lütfen', level: 'A2', usageNote: 'Bağlama göre hem "lütfen" hem "rica ederim" anlamına gelir.' },
      { id: 'w_p6a', ru: 'Не за что', reading: 'Ni za shto', tr: 'Bir şey değil', level: 'A2', usageNote: 'Teşekküre verilen samimi bir cevaptır.' },
      { id: 'w_p7a', ru: 'Будьте добры', reading: "Búd'te dabrý", tr: 'Nazik olur musunuz / Rica etsem', level: 'A2', usageNote: 'Bir ricanın başında kullanılan kibar bir kalıptır.' },
      { id: 'w_p8a', ru: 'С удовольствием', reading: "S udavól'stviyem", tr: 'Memnuniyetle', level: 'A2', usageNote: 'Bir teklifi kabul ederken kullanılır.' }
    ],
    sentences: [
      { ru: 'Извините, будьте добры, где выход?', tr: 'Affedersiniz, nazik olur musunuz, çıkış nerede?', scrambled: ['выход?', 'где', 'добры,', 'Извините,', 'будьте'], correct: ['Извините,', 'будьте', 'добры,', 'где', 'выход?'] },
      { ru: 'Спасибо большое! — Не за что!', tr: 'Çok teşekkürler! — Bir şey değil!', scrambled: ['что!', 'большое!', '—', 'Спасибо', 'Не за'], correct: ['Спасибо', 'большое!', '—', 'Не за', 'что!'] }
    ],
    sceneTitle: 'Kalabalık Otobüste',
    sceneContext: 'Bir dizide kalabalık bir otobüste birine ayağına bastığı için özür dileyen karakterin sahnesi.',
    dialogue: [
      { speaker: 'Yolcu 1', ru: 'Ой, простите! Я наступил вам на ногу.', reading: 'Oy, prastíte! Ya nastupíl vam na nógu.', tr: 'Ay, özür dilerim! Ayağınıza bastım.' },
      { speaker: 'Yolcu 2', ru: 'Ничего страшного, всё в порядке.', reading: "Nichivó strashnóva, vsyo v paryádke.", tr: 'Önemli değil, her şey yolunda.' }
    ]
  },
  {
    id: 'mod_a2_11',
    unitNumber: 17,
    levelGroup: 'A2',
    title: 'Okuma Anahtarı: Bağlaçlar & Dolgu Kelimeler',
    description: 'Bilmediğin kelimeleri anlamana yardımcı olan en sık kullanılan bağlaç ve dolgu kelimeleri',
    category: 'Okuma & Anlama Becerisi',
    color: '#7c3aed',
    icon: '🔑',
    grammarExplain: `📌 NEDEN BU ÜNİTE ÇOK ÖNEMLİ:
Bir metinde her kelimeyi bilmesen bile, cümleleri birbirine bağlayan kelimeleri (bağlaçlar, dolgu kelimeleri) bilirsen cümlenin GENEL MANTIĞINI çözebilirsin. "Потому что" (çünkü) gördüğünde bir SEBEP geleceğini, "но" (ama) gördüğünde bir ZITLIK geleceğini bilmek, bilmediğin kelimeleri bile tahmin etmeni sağlar. Bu yüzden bu kelimeleri EZBERE bilmek, kelime dağarcığından çok daha hızlı okuma-anlama becerisi kazandırır.`,
    words: [
      { id: 'w_c1', ru: 'Потому что', reading: 'Patamú shta', tr: 'Çünkü', level: 'A2', usageNote: 'Sebep bildiren en temel bağlaçtır.' },
      { id: 'w_c2', ru: 'Поэтому', reading: 'Payétamu', tr: 'Bu yüzden / Bu nedenle', level: 'A2', usageNote: 'Sonuç bildirir, "потому что" ile ters yönde çalışır.' },
      { id: 'w_c3', ru: 'Но', reading: 'No', tr: 'Ama / Fakat', level: 'A2', usageNote: 'Zıtlık bildiren en kısa ve en sık kullanılan bağlaçtır.' },
      { id: 'w_c4', ru: 'Тоже', reading: 'Tózhe', tr: 'Da / De (aynı şekilde)', level: 'A2', usageNote: 'Olumlu cümlelerde ek bilgi verir.' },
      { id: 'w_c5', ru: 'Конечно', reading: 'Kanyéshna', tr: 'Elbette / Tabii ki', level: 'A2', usageNote: 'Onay bildiren dolgu kelimesidir.' },
      { id: 'w_c6', ru: 'Вообще', reading: 'Vaapshché', tr: 'Genel olarak / Zaten', level: 'A2', usageNote: 'Konuşma dilinde çok sık kullanılan bir dolgu kelimesidir.' },
      { id: 'w_c7', ru: 'Кстати', reading: 'Kstáti', tr: 'Bu arada / Aklıma gelmişken', level: 'A2', usageNote: 'Konuyu değiştirirken kullanılır.' },
      { id: 'w_c8', ru: 'Короче', reading: 'Karóche', tr: 'Kısacası / Sözün kısası', level: 'A2', usageNote: 'Konuşma dilinde bir şeyi özetlerken kullanılır.' },
      { id: 'w_c9', ru: 'Если', reading: 'Yésli', tr: 'Eğer', level: 'A2', usageNote: 'Şart cümlelerinin başında yer alır.' },
      { id: 'w_c10', ru: 'Хотя', reading: 'Hatyá', tr: 'Her ne kadar / Gerçi', level: 'A2', usageNote: 'Yumuşak bir zıtlık bildirir, "но"dan daha resmi/yazılı dilde kullanılır.' }
    ],
    sentences: [
      { ru: 'Я не пошёл, потому что было холодно.', tr: 'Gitmedim, çünkü hava soğuktu.', scrambled: ['холодно.', 'было', 'потому что', 'не пошёл,', 'Я'], correct: ['Я', 'не пошёл,', 'потому что', 'было', 'холодно.'] },
      { ru: 'Она устала, но она тоже пришла.', tr: 'O yorulmuştu ama o da geldi.', scrambled: ['пришла.', 'тоже', 'но она', 'устала,', 'Она'], correct: ['Она', 'устала,', 'но она', 'тоже', 'пришла.'] }
    ],
    sceneTitle: 'Arkadaşlar Arası Sohbet',
    sceneContext: 'Bir dizide iki arkadaşın planlarını konuşurken sürekli bağlaç kullandığı, gerçek konuşma diline en yakın sahnelerden biri.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'Я не пришёл, потому что было много работы.', reading: 'Ya ni prishyól, patamú shta býla mnóga rabóty.', tr: 'Gelmedim, çünkü çok işim vardı.' },
      { speaker: 'Arkadaş 2', ru: 'Понятно. Кстати, ты видел новый фильм?', reading: "Panyátna. Kstáti, ty vídel nóvyy fil'm?", tr: 'Anladım. Bu arada, yeni filmi gördün mü?' },
      { speaker: 'Arkadaş 1', ru: 'Нет, но я тоже хочу посмотреть.', reading: 'Nyet, no ya tózhe hachú pasmatryét\'.', tr: 'Hayır, ama ben de izlemek istiyorum.' }
    ]
  },
  {
    id: 'mod_a2_12',
    unitNumber: 18,
    levelGroup: 'A2',
    title: 'Davet, Misafirlik & Kutlama',
    description: 'Birini davet etme, misafir ağırlama ve kutlama tebrikleri',
    category: 'Gündelik Yaşam',
    color: '#e11d48',
    icon: '🎉',
    grammarExplain: `📌 DAVET VE KUTLAMA KALIPLARI:
1. "Приходи в гости" (Prihadí v gósti) -> "Misafirliğe gel" samimi bir davet kalıbıdır.
2. "Поздравляю с..." (Pazdravlyáyu s...) -> "... kutlarım" kalıbından sonra doğum günü, yeni yıl gibi isimler çıkma (-om/-ой) halinde gelir.`,
    words: [
      { id: 'w_g1', ru: 'В гости', reading: 'V gósti', tr: 'Misafirliğe', level: 'A2', usageNote: '"Приходи в гости" -> Misafirliğe gel.' },
      { id: 'w_g2', ru: 'Праздник', reading: 'Prázdnik', tr: 'Bayram / Kutlama', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_g3', ru: 'День рождения', reading: 'Dyen\' razhdyéniya', tr: 'Doğum günü', level: 'A2', usageNote: 'İki kelimeden oluşan sabit bir kalıptır.' },
      { id: 'w_g4', ru: 'Поздравляю', reading: 'Pazdravlyáyu', tr: 'Kutlarım / Tebrik ederim', level: 'A2', usageNote: '"Поздравляю с днём рождения!" -> Doğum günün kutlu olsun!' },
      { id: 'w_g5', ru: 'Подарок', reading: 'Padárak', tr: 'Hediye', level: 'A2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_g6', ru: 'Гость', reading: "Gost'", tr: 'Misafir', level: 'A2', usageNote: 'Eril bir kelimedir; dişili "Гостья".' },
      { id: 'w_g7', ru: 'Угощение', reading: 'Ugashcheniye', tr: 'İkram', level: 'A2', usageNote: 'Orta cinsiyettedir.' },
      { id: 'w_g8', ru: 'Приятного аппетита', reading: 'Priyátnava apitíta', tr: 'Afiyet olsun', level: 'A2', usageNote: 'Yemekten önce söylenen klasik kalıptır.' }
    ],
    sentences: [
      { ru: 'Приходи в гости на день рождения!', tr: 'Doğum günüme misafirliğe gel!', scrambled: ['рождения!', 'на день', 'в гости', 'Приходи'], correct: ['Приходи', 'в гости', 'на день', 'рождения!'] },
      { ru: 'Поздравляю тебя с праздником!', tr: 'Bayramını kutlarım!', scrambled: ['праздником!', 'с', 'тебя', 'Поздравляю'], correct: ['Поздравляю', 'тебя', 'с', 'праздником!'] }
    ],
    sceneTitle: 'Doğum Günü Sürprizi',
    sceneContext: 'Bir dizide arkadaşların birine sürpriz doğum günü partisi hazırladığı klasik kutlama sahnesi.',
    dialogue: [
      { speaker: 'Arkadaşlar', ru: 'Сюрприз! Поздравляем с днём рождения!', reading: "Syurpríz! Pazdravlyáyem s dnyom razhdyéniya!", tr: 'Sürpriz! Doğum günün kutlu olsun!' },
      { speaker: 'Kutlanan', ru: 'Спасибо! Это лучший подарок!', reading: 'Spasíba! Éta lúchshiy padárak!', tr: 'Teşekkürler! Bu en güzel hediye!' },
      { speaker: 'Ev sahibi', ru: 'Проходите к столу! Приятного аппетита!', reading: 'Prahadíte k stalú! Priyátnava apitíta!', tr: 'Masaya buyurun! Afiyet olsun!' }
    ]
  },
  {
    id: 'mod_b1_1',
    unitNumber: 19,
    levelGroup: 'B1',
    title: 'Duygusal Tartışma',
    description: 'Sevgili kavgası ve itham cümleleri — klasik dizi anları',
    category: 'Dizi Sahneleri',
    color: '#ef4444',
    icon: '💔',
    grammarExplain: `📌 DUYGU İFADE ETME:
1. Rusçada olumsuzluk "Не" (Nye) parçacığı ile fiilden önce yapılır: "Я не понимаю" (Anlamıyorum).
2. "Почему ты...?" (Pachimú ty...?) -> "Neden sen...?" sorgulama kalıbı, tartışma sahnelerinde çok kullanılır.`,
    words: [
      { id: 'w_d1', ru: 'Почему', reading: 'Pachimú', tr: 'Neden', level: 'B1', usageNote: 'Soru zarfıdır.' },
      { id: 'w_d2', ru: 'Обманул', reading: 'Abmanúl', tr: 'Kandırdı / Yalan söyledi', level: 'B1', usageNote: 'Eril geçmiş zaman çekimidir.' },
      { id: 'w_d3', ru: 'Доверие', reading: 'Davérie', tr: 'Güven', level: 'B1', usageNote: 'Soyut bir isimdir.' },
      { id: 'w_d4', ru: 'Расстроен', reading: 'Rastróyen', tr: 'Üzgün (erkek)', level: 'B1', usageNote: 'Sıfatın eril halidir.' },
      { id: 'w_d5', ru: 'Прости', reading: 'Prastí', tr: 'Affet', level: 'B1', usageNote: 'Samimi emir kipidir.' },
      { id: 'w_d6', ru: 'Хватит', reading: 'Khvátit', tr: 'Yeter!', level: 'B1', usageNote: 'Kavga sahnelerinde sıkça bağırılan bir kelimedir.' }
    ],
    sentences: [
      { ru: 'Почему ты мне не сказал правду?', tr: 'Neden bana gerçeği söylemedin?', scrambled: ['правду?', 'не', 'сказал', 'ты', 'мне', 'Почему'], correct: ['Почему', 'ты', 'мне', 'не', 'сказал', 'правду?'] },
      { ru: 'Ты разрушил моё доверие!', tr: 'Sen benim güvenimi yıktın!', scrambled: ['доверие!', 'моё', 'разрушил', 'Ты'], correct: ['Ты', 'разрушил', 'моё', 'доверие!'] }
    ],
    sceneTitle: 'Sevgili Kavgası',
    sceneContext: 'Popüler bir dizide klasik bir yüzleşme sahnesi.',
    dialogue: [
      { speaker: 'Kız', ru: 'Почему ты мне не сказал правду?!', reading: 'Pachimú ty mnye nye skazál právdu?!', tr: 'Neden bana gerçeği söylemedin?!' },
      { speaker: 'Erkek', ru: "Прости, я не хотел тебя обидеть.", reading: "Prastí, ya nye khatél tibyá abídet'.", tr: 'Affet, seni incitmek istemedim.' },
      { speaker: 'Kız', ru: 'Хватит! Я больше не верю тебе.', reading: "Khvátit! Ya ból'she nye véryu tibyé.", tr: 'Yeter! Artık sana inanmıyorum.' }
    ]
  },
  {
    id: 'mod_b1_2',
    unitNumber: 20,
    levelGroup: 'B1',
    title: 'Doktor & Hastane',
    description: 'Acil durum ve sağlık şikayeti kalıpları',
    category: 'Sağlık',
    color: '#14b8a6',
    icon: '🏥',
    grammarExplain: `📌 SAĞLIK KALIPLARI:
1. "У меня болит..." (U minyá balít...) -> "Benim ... ağrıyor" kalıbı vücut kısımlarıyla birlikte kullanılır.
2. Acil durumlarda "Вызовите скорую!" (Výzavite skóruyu!) -> "Ambulans çağırın!" hayat kurtaran bir kalıptır.`,
    words: [
      { id: 'w_h1', ru: 'Больница', reading: "Bal'nítsa", tr: 'Hastane', level: 'B1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_h2', ru: 'Врач', reading: 'Vrach', tr: 'Doktor', level: 'B1', usageNote: 'Cinsiyetten bağımsız kullanılabilir.' },
      { id: 'w_h3', ru: 'Болит', reading: 'Balít', tr: 'Ağrıyor', level: 'B1', usageNote: 'Şimdiki zaman üçüncü tekil şahıs çekimidir.' },
      { id: 'w_h4', ru: 'Скорая', reading: 'Skóraya', tr: 'Ambulans', level: 'B1', usageNote: '"Скорая помощь" ifadesinin kısaltılmışıdır.' },
      { id: 'w_h5', ru: 'Лекарство', reading: 'Likárstva', tr: 'İlaç', level: 'B1', usageNote: 'Orta cinsiyettedir.' },
      { id: 'w_h6', ru: 'Помогите', reading: 'Pamagíte', tr: 'Yardım edin', level: 'B1', usageNote: 'Acil durum ünlemidir.' }
    ],
    sentences: [
      { ru: 'У меня болит голова.', tr: 'Başım ağrıyor.', scrambled: ['голова.', 'болит', 'У меня'], correct: ['У меня', 'болит', 'голова.'] },
      { ru: 'Вызовите скорую, пожалуйста!', tr: 'Lütfen ambulans çağırın!', scrambled: ['пожалуйста!', 'скорую,', 'Вызовите'], correct: ['Вызовите', 'скорую,', 'пожалуйста!'] }
    ],
    sceneTitle: 'Acil Serviste',
    sceneContext: 'Hastane dizilerinde sık görülen acil müdahale sahnesi.',
    dialogue: [
      { speaker: 'Hemşire', ru: "Что случилось? Где болит?", reading: "Shto sluchílas'? Gde balít?", tr: 'Ne oldu? Neresi ağrıyor?' },
      { speaker: 'Hasta', ru: "У меня сильно болит грудь.", reading: "U minyá síl'na balít grud'.", tr: 'Göğsüm çok ağrıyor.' },
      { speaker: 'Doktor', ru: 'Спокойно, мы сейчас вам поможем.', reading: 'Spakóyna, my seychás vam pamózhem.', tr: 'Sakin olun, size şimdi yardım edeceğiz.' }
    ]
  },
  {
    id: 'mod_b1_3',
    unitNumber: 21,
    levelGroup: 'B1',
    title: 'İş Görüşmesi',
    description: 'Mülakat soruları ve resmi hitap şekilleri',
    category: 'İş Hayatı',
    color: '#6366f1',
    icon: '💼',
    grammarExplain: `📌 RESMİ KONUŞMA KALIPLARI:
1. İş ortamında "Вы" (Vy - siz) formu kullanılır; "Ты" (sen) kullanmak saygısızlık sayılır.
2. "Расскажите о себе" (Raskazhíte a sibyé) -> "Kendinizden bahsedin" klasik mülakat sorusudur.`,
    words: [
      { id: 'w_j1', ru: 'Работа', reading: 'Rabóta', tr: 'İş', level: 'B1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_j2', ru: 'Опыт', reading: 'Ópyt', tr: 'Deneyim', level: 'B1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_j3', ru: 'Зарплата', reading: 'Zarpláta', tr: 'Maaş', level: 'B1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_j4', ru: 'Резюме', reading: 'Rizyumé', tr: 'Özgeçmiş', level: 'B1', usageNote: 'Fransızcadan geçmiştir, çekimlenmez.' },
      { id: 'w_j5', ru: 'Собеседование', reading: 'Sabesédavanie', tr: 'Mülakat', level: 'B1', usageNote: 'Orta cinsiyette uzun bir kelimedir.' },
      { id: 'w_j6', ru: 'Начальник', reading: "Nachál'nik", tr: 'Patron / Müdür', level: 'B1', usageNote: 'İş yerindeki amir için kullanılır.' }
    ],
    sentences: [
      { ru: 'Расскажите о своём опыте.', tr: 'Deneyiminizden bahsedin.', scrambled: ['опыте.', 'своём', 'о', 'Расскажите'], correct: ['Расскажите', 'о', 'своём', 'опыте.'] },
      { ru: 'Какая у вас зарплата?', tr: 'Maaşınız ne kadar?', scrambled: ['зарплата?', 'у вас', 'Какая'], correct: ['Какая', 'у вас', 'зарплата?'] }
    ],
    sceneTitle: 'Mülakat Odasında',
    sceneContext: 'İş dünyasını konu alan bir dizide geçen mülakat sahnesi.',
    dialogue: [
      { speaker: 'Müdür', ru: 'Расскажите немного о себе.', reading: 'Raskazhíte nemnóga a sibyé.', tr: 'Kendinizden biraz bahsedin.' },
      { speaker: 'Aday', ru: "У меня пять лет опыта в этой сфере.", reading: "U minyá pyat' lyet ópyta v étay sfére.", tr: 'Bu alanda beş yıllık deneyimim var.' },
      { speaker: 'Müdür', ru: 'Отлично, мы вам перезвоним.', reading: 'Atlíchna, my vam pirizvaním.', tr: 'Harika, sizi geri arayacağız.' }
    ]
  },
  {
    id: 'mod_b1_4',
    unitNumber: 22,
    levelGroup: 'B1',
    title: 'Kafede Arkadaşlarla Dedikodu',
    description: 'Fısıldayarak dedikodu yapma ve sır paylaşma kalıpları',
    category: 'Dizi Sahneleri',
    color: '#fb7185',
    icon: '🗯️',
    grammarExplain: `📌 DEDİKODU KALIPLARI:
1. "Ты слышала...?" (Ty slýshala...?) -> "Duydun mu...?" dedikodu başlatma kalıbıdır (dişil muhataba).
2. "Между нами говоря" (Myézhdu námi gavarya) -> "Aramızda kalsın ama" deyimi sohbete sızmadan önce sıkça kullanılır.`,
    words: [
      { id: 'w_gs1', ru: 'Слух', reading: 'Slukh', tr: 'Söylenti', level: 'B1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_gs2', ru: 'Сплетни', reading: 'Splyétni', tr: 'Dedikodu (çoğul)', level: 'B1', usageNote: 'Sadece çoğul halde kullanılır.' },
      { id: 'w_gs3', ru: 'Между нами', reading: 'Myézhdu námi', tr: 'Aramızda', level: 'B1', usageNote: 'Sır paylaşmadan önce söylenir.' },
      { id: 'w_gs4', ru: 'Представляешь?', reading: "Pridstavlyáyesh'?", tr: 'Düşünsene?', level: 'B1', usageNote: 'Şaşkınlık ifade eder.' },
      { id: 'w_gs5', ru: 'Врёт', reading: 'Vryot', tr: 'Yalan söylüyor', level: 'B1', usageNote: 'Şimdiki zaman üçüncü tekil şahıs.' },
      { id: 'w_gs6', ru: 'Секрет', reading: 'Sikryét', tr: 'Sır', level: 'B1', usageNote: 'Eril bir kelimedir.' }
    ],
    sentences: [
      { ru: 'Ты слышала последние сплетни?', tr: 'Son dedikoduları duydun mu?', scrambled: ['сплетни?', 'последние', 'слышала', 'Ты'], correct: ['Ты', 'слышала', 'последние', 'сплетни?'] },
      { ru: 'Это останется между нами.', tr: 'Bu aramızda kalacak.', scrambled: ['между нами.', 'останется', 'Это'], correct: ['Это', 'останется', 'между нами.'] }
    ],
    sceneTitle: 'Kafede Fısıltılar',
    sceneContext: 'Dizide iki arkadaşın kafede fısıldayarak dedikodu yaptığı sahne.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'Ты слышала? Между нами говоря...', reading: 'Ty slýshala? Myézhdu námi gavarya...', tr: 'Duydun mu? Aramızda kalsın ama...' },
      { speaker: 'Arkadaş 2', ru: "Что? Представляешь, я вообще не знала!", reading: "Shto? Pridstavlyáyesh', ya vaapshché nye znála!", tr: 'Ne? Düşünsene, hiç bilmiyordum!' },
      { speaker: 'Arkadaş 1', ru: 'Тише, это секрет!', reading: 'Tíshe, éta sikryét!', tr: 'Sessiz ol, bu bir sır!' }
    ]
  },
  {
    id: 'mod_b1_5',
    unitNumber: 23,
    levelGroup: 'B1',
    title: 'İş Yerinde & Resmi İletişim',
    description: 'Toplantı dili, e-posta kalıpları ve iş yerinde nazik talepler',
    category: 'İş Hayatı',
    color: '#0d9488',
    icon: '💼',
    grammarExplain: `📌 RESMİ İLETİŞİM KALIPLARI:
1. Resmi ortamda her zaman "Вы" (siz) kullanılır, "Ты" (sen) kullanmak saygısızlık sayılır.
2. "Не могли бы вы прислать..." (Ni maglí by vy prislát'...) -> "...gönderebilir misiniz acaba" resmi yazışmalarda en sık kullanılan kalıptır.`,
    words: [
      { id: 'w_wk1', ru: 'Совещание', reading: 'Savishchániye', tr: 'Toplantı', level: 'B1', usageNote: 'Orta cinsiyettedir; "На совещании" -> toplantıda.' },
      { id: 'w_wk2', ru: 'Задача', reading: 'Zadácha', tr: 'Görev', level: 'B1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_wk3', ru: 'Срок', reading: 'Srok', tr: 'Son tarih / Süre', level: 'B1', usageNote: '"Крайний срок" -> deadline.' },
      { id: 'w_wk4', ru: 'Отчёт', reading: "Atchyót", tr: 'Rapor', level: 'B1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_wk5', ru: 'Коллега', reading: 'Kalyéga', tr: 'Meslektaş / İş arkadaşı', level: 'B1', usageNote: 'Hem erkek hem kadın için kullanılır.' },
      { id: 'w_wk6', ru: 'Прислать', reading: "Prislát'", tr: 'Göndermek (bir kereliğine)', level: 'B1', usageNote: 'E-posta/dosya gönderirken kullanılır.' },
      { id: 'w_wk7', ru: 'Уточнить', reading: 'Utachnít\'', tr: 'Netleştirmek / Teyit etmek', level: 'B1', usageNote: 'Bir detayı sormadan önce kullanılır.' },
      { id: 'w_wk8', ru: 'С уважением', reading: 'S uvazhéniyem', tr: 'Saygılarımla', level: 'B1', usageNote: 'Resmi e-postaların sonunda yazılır.' }
    ],
    sentences: [
      { ru: 'Не могли бы вы прислать отчёт сегодня?', tr: 'Raporu bugün gönderebilir misiniz acaba?', scrambled: ['сегодня?', 'отчёт', 'прислать', 'Не могли бы вы'], correct: ['Не могли бы вы', 'прислать', 'отчёт', 'сегодня?'] },
      { ru: 'Хочу уточнить срок задачи.', tr: 'Görevin son tarihini netleştirmek istiyorum.', scrambled: ['задачи.', 'срок', 'уточнить', 'Хочу'], correct: ['Хочу', 'уточнить', 'срок', 'задачи.'] }
    ],
    sceneTitle: 'Ofis Toplantısı',
    sceneContext: 'Bir dizide ofis çalışanlarının toplantı öncesi görev dağılımı yaptığı resmi sahne.',
    dialogue: [
      { speaker: 'Yönetici', ru: 'Коллеги, у нас совещание через час.', reading: 'Kalyégi, u nas savishchániye chyérez chas.', tr: 'Arkadaşlar, bir saat sonra toplantımız var.' },
      { speaker: 'Çalışan', ru: 'Хорошо. Не могли бы вы уточнить срок отчёта?', reading: "Haraşó. Ni maglí by vy utachnít' srok atchyóta?", tr: 'Tamam. Raporun son tarihini netleştirebilir misiniz acaba?' },
      { speaker: 'Yönetici', ru: 'Конечно, пришлю детали по почте.', reading: 'Kanyéshna, prishlyú detáli pa póchte.', tr: 'Tabii, detayları e-postayla göndereceğim.' }
    ]
  },
  {
    id: 'mod_b1_6',
    unitNumber: 24,
    levelGroup: 'B1',
    title: 'Market & Süpermarket Konuşması',
    description: 'Reyon sorma, tartı, kasa kuyruğu ve günlük market diyalogları — orada yaşamak için şart',
    category: 'Gündelik Yaşam',
    color: '#22c55e',
    icon: '🛒',
    grammarExplain: `📌 MARKET KALIPLARI:
1. "Скажите, пожалуйста, где...?" (Skazhíte, pazhálusta, gde...?) -> "Söyleyin lütfen, ... nerede?" market/mağazada yön sormanın en doğal halidir.
2. "Взвесьте, пожалуйста" (Vzvés'te, pazhálusta) -> "Tartın lütfen" sebze-meyve reyonunda kullanılır.`,
    words: [
      { id: 'w_mk1', ru: 'Супермаркет', reading: 'Supermarkét', tr: 'Süpermarket', level: 'B1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_mk2', ru: 'Касса', reading: 'Kássa', tr: 'Kasa', level: 'B1', usageNote: 'Dişil; \'На кассе\' -> kasada.' },
      { id: 'w_mk3', ru: 'Очередь', reading: 'Óchered\'', tr: 'Kuyruk', level: 'B1', usageNote: 'Dişil; \'Стоять в очереди\' -> kuyrukta durmak.' },
      { id: 'w_mk4', ru: 'Взвесить', reading: 'Vzvésit\'', tr: 'Tartmak', level: 'B1', usageNote: 'Mastar; tezgahta sıkça emir kipinde duyulur.' },
      { id: 'w_mk5', ru: 'Пакет', reading: 'Pakét', tr: 'Poşet', level: 'B1', usageNote: 'Kasada \'Пакет нужен?\' diye sorulur.' },
      { id: 'w_mk6', ru: 'Скидка по карте', reading: 'Skítka pa kárte', tr: 'Kartla indirim', level: 'B1', usageNote: 'Sadakat kartı indirimi için sabit kalıp.' },
      { id: 'w_mk7', ru: 'Готово', reading: 'Gatóva', tr: 'Hazır / Tamam', level: 'B1', usageNote: 'Tartı veya sipariş bitince söylenir.' },
      { id: 'w_mk8', ru: 'Сдачу не надо', reading: 'Sdáchu nye náda', tr: 'Para üstü gerekmez', level: 'B1', usageNote: 'Nakit öderken yuvarlamak için.' }
    ],
    sentences: [
      { ru: 'Скажите, где молочный отдел?', tr: 'Söyleyin, süt reyonu nerede?', scrambled: ['отдел?', 'молочный', 'где', 'Скажите,'], correct: ['Скажите,', 'где', 'молочный', 'отдел?'] },
      { ru: 'Взвесьте, пожалуйста, два килограмма яблок.', tr: 'İki kilo elmayı tartın lütfen.', scrambled: ['яблок.', 'килограмма', 'два', 'пожалуйста,', 'Взвесьте,'], correct: ['Взвесьте,', 'пожалуйста,', 'два', 'килограмма', 'яблок.'] }
    ],
    sceneTitle: 'Kasada Kuyruk',
    sceneContext: 'Günlük bir dizide karakterin akşamüstü markette kasa kuyruğunda yaşadığı gerçekçi sahne.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Скажите, пожалуйста, где хлеб?', reading: 'Skazhíte, pazhálusta, gde khlep?', tr: 'Söyleyin lütfen, ekmek nerede?' },
      { speaker: 'Görevli', ru: 'Прямо, потом направо. Там пекарня.', reading: 'Pryáma, patóm napráva. Tam pekárnya.', tr: 'Düz, sonra sağa. Orada fırın reyonu var.' },
      { speaker: 'Kasiyer', ru: 'Пакет нужен? Есть скидка по карте.', reading: 'Pakét núzhen? Yest\' skítka pa kárte.', tr: 'Poşet lazım mı? Kartla indirim var.' },
      { speaker: 'Müşteri', ru: 'Да, пакет. Сдачу не надо, спасибо.', reading: 'Da, pakét. Sdáchu nye náda, spasíba.', tr: 'Evet, poşet. Para üstü gerekmez, teşekkürler.' }
    ]
  },
  {
    id: 'mod_b1_7',
    unitNumber: 25,
    levelGroup: 'B1',
    title: 'Ev Kiralama & Ev Sahibi',
    description: 'İlan bakma, depozito, fatura ve ev sahibiyle konuşma — taşınmak için zorunlu kalıplar',
    category: 'Orada Yaşamak',
    color: '#0ea5e9',
    icon: '🏠',
    grammarExplain: `📌 KİRA KALIPLARI:
1. "Сдаётся квартира" (Sdayótsya kvartíra) -> "Daire kiralanıyor" ilan dilidir.
2. "Залог" (Zalóg) -> depozito; "Коммуналка" (Kamunálka) günlük dilde faturalar demektir.`,
    words: [
      { id: 'w_rent1', ru: 'Квартира', reading: 'Kvartíra', tr: 'Daire', level: 'B1', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_rent2', ru: 'Аренда', reading: 'Arénda', tr: 'Kira', level: 'B1', usageNote: 'Dişil; \'Снять в аренду\' -> kiralamak.' },
      { id: 'w_rent3', ru: 'Залог', reading: 'Zalóg', tr: 'Depozito', level: 'B1', usageNote: 'Eril; genelde 1 aylık kira kadar alınır.' },
      { id: 'w_rent4', ru: 'Коммуналка', reading: 'Kamunálka', tr: 'Faturalar (günlük dil)', level: 'B1', usageNote: 'Su, elektrik, ısınma birlikte kastedilir.' },
      { id: 'w_rent5', ru: 'Собственник', reading: 'Sópstvennik', tr: 'Mal sahibi', level: 'B1', usageNote: 'İlanlarda \'от собственника\' sık geçer.' },
      { id: 'w_rent6', ru: 'Договор', reading: 'Dagavór', tr: 'Sözleşme', level: 'B1', usageNote: 'Eril; imzalamadan taşınılmaz.' },
      { id: 'w_rent7', ru: 'Снять', reading: 'Snyat\'', tr: 'Kiralamak (bir kerelik fiil)', level: 'B1', usageNote: 'Kiralama eyleminin tamamlanmış halidir.' },
      { id: 'w_rent8', ru: 'Мебель', reading: 'Mébel\'', tr: 'Mobilya', level: 'B1', usageNote: 'Dişil; \'С мебелью\' -> eşyalı.' }
    ],
    sentences: [
      { ru: 'Квартира сдаётся с мебелью?', tr: 'Daire eşyalı mı kiralanıyor?', scrambled: ['мебелью?', 'с', 'сдаётся', 'Квартира'], correct: ['Квартира', 'сдаётся', 'с', 'мебелью?'] },
      { ru: 'Залог и коммуналка входят в договор.', tr: 'Depozito ve faturalar sözleşmeye giriyor.', scrambled: ['договор.', 'в', 'входят', 'коммуналка', 'и', 'Залог'], correct: ['Залог', 'и', 'коммуналка', 'входят', 'в', 'договор.'] }
    ],
    sceneTitle: 'İlan Bakma',
    sceneContext: 'Yeni şehre taşınan karakterin ev sahibiyle daireyi gezerken konuştuğu sahne.',
    dialogue: [
      { speaker: 'Kiracı', ru: 'Здравствуйте, я по объявлению. Можно посмотреть квартиру?', reading: 'Zdrástvuyte, ya pa ab\'yavlyéniyu. Mózhna pasmatrét\' kvartíru?', tr: 'Merhaba, ilan için arıyorum. Daireye bakabilir miyim?' },
      { speaker: 'Ev sahibi', ru: 'Конечно. С мебелью, залог — один месяц.', reading: 'Kanyéshna. S mébelyu, zalóg — adín mésyats.', tr: 'Tabii. Eşyalı, depozito bir aylık.' },
      { speaker: 'Kiracı', ru: 'А коммуналка отдельно?', reading: 'A kamunálka atdél\'na?', tr: 'Faturalar ayrı mı?' },
      { speaker: 'Ev sahibi', ru: 'Да. Договор подпишем завтра.', reading: 'Da. Dagavór padpíшем zavtra.', tr: 'Evet. Sözleşmeyi yarın imzalarız.' }
    ]
  },
  {
    id: 'mod_b1_8',
    unitNumber: 26,
    levelGroup: 'B1',
    title: 'Banka, Kart & Para Çekme',
    description: 'Hesap açma, ATM, transfer ve banka şubesinde hayatta kalma dili',
    category: 'Orada Yaşamak',
    color: '#2563eb',
    icon: '🏦',
    grammarExplain: `📌 BANKA KALIPLARI:
1. "Открыть счёт" (Atkrýt' shchyot) -> hesap açmak.
2. "Перевод" (Perevót) havale; "Снять наличные" (Snyat' nalíchnye) nakit çekmek.`,
    words: [
      { id: 'w_bn1', ru: 'Банк', reading: 'Bank', tr: 'Banka', level: 'B1', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_bn2', ru: 'Счёт', reading: 'Shchyot', tr: 'Hesap', level: 'B1', usageNote: 'Eril; \'На счёте\' -> hesapta.' },
      { id: 'w_bn3', ru: 'Карта', reading: 'Kárta', tr: 'Kart', level: 'B1', usageNote: 'Dişil; banka kartı.' },
      { id: 'w_bn4', ru: 'Банкомат', reading: 'Bankamát', tr: 'ATM', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_bn5', ru: 'Перевод', reading: 'Perevót', tr: 'Havale / Transfer', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_bn6', ru: 'Комиссия', reading: 'Kamíssiya', tr: 'Komisyon ücreti', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_bn7', ru: 'Пин-код', reading: 'Pin-kod', tr: 'PIN kodu', level: 'B1', usageNote: 'Eril; çekimlenmez gibi kullanılır.' },
      { id: 'w_bn8', ru: 'Заблокировать', reading: 'Zablakírovat\'', tr: 'Bloke etmek', level: 'B1', usageNote: 'Kart kaybında kullanılır.' }
    ],
    sentences: [
      { ru: 'Хочу открыть счёт и получить карту.', tr: 'Hesap açıp kart almak istiyorum.', scrambled: ['карту.', 'получить', 'и', 'счёт', 'открыть', 'Хочу'], correct: ['Хочу', 'открыть', 'счёт', 'и', 'получить', 'карту.'] },
      { ru: 'Карта заблокирована, помогите, пожалуйста.', tr: 'Kart bloke, yardım edin lütfen.', scrambled: ['пожалуйста.', 'помогите,', 'заблокирована,', 'Карта'], correct: ['Карта', 'заблокирована,', 'помогите,', 'пожалуйста.'] }
    ],
    sceneTitle: 'Banka Şubesi',
    sceneContext: 'Dizide yeni gelen birinin bankada hesap açmaya çalıştığı sahne.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Здравствуйте, хочу открыть счёт.', reading: 'Zdrástvuyte, khachú atkrýt\' shchyot.', tr: 'Merhaba, hesap açmak istiyorum.' },
      { speaker: 'Görevli', ru: 'Паспорт есть? Карта будет готова через неделю.', reading: 'Páspart yest\'? Kárta búdet gatóva chyérez nedélyu.', tr: 'Pasaportunuz var mı? Kart bir haftaya hazır olur.' },
      { speaker: 'Müşteri', ru: 'Можно сразу снять наличные в банкомате?', reading: 'Mózhna srázu snyat\' nalíchnye v bankamáte?', tr: 'Hemen ATM\'den nakit çekebilir miyim?' },
      { speaker: 'Görevli', ru: 'Да, после активации. Не забудьте пин-код.', reading: 'Da, pósle aktivátsii. Ne zabúd\'te pin-kod.', tr: 'Evet, aktivasyondan sonra. PIN\'i unutmayın.' }
    ]
  },
  {
    id: 'mod_b1_9',
    unitNumber: 27,
    levelGroup: 'B1',
    title: 'Eczane & Reçetesiz İlaç',
    description: 'Belirti anlatma, reçete, muadil ilaç — eczanede kaybolmamak',
    category: 'Sağlık',
    color: '#10b981',
    icon: '💊',
    grammarExplain: `📌 ECZANE KALIPLARI:
1. "У меня болит горло" (U minyá balít górlə) belirtileri 'У меня + болит + organ' ile anlatırsın.
2. "Есть аналог дешевле?" (Yest' analóg deshévle?) -> "Daha ucuz muadili var mı?" `,
    words: [
      { id: 'w_ph1', ru: 'Аптека', reading: 'Aptéka', tr: 'Eczane', level: 'B1', usageNote: 'Dişil; vurgu sonda.' },
      { id: 'w_ph2', ru: 'Рецепт', reading: 'Retsépt', tr: 'Reçete', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_ph3', ru: 'Таблетка', reading: 'Tablétka', tr: 'Hap', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_ph4', ru: 'Сироп', reading: 'Siróp', tr: 'Şurup', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_ph5', ru: 'Аллергия', reading: 'Allergíya', tr: 'Alerji', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_ph6', ru: 'Аналог', reading: 'Analóg', tr: 'Muadil / Eşdeğer ilaç', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_ph7', ru: 'Дозировка', reading: 'Dazirófka', tr: 'Doz', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_ph8', ru: 'Без рецепта', reading: 'Bez retsépta', tr: 'Reçetesiz', level: 'B1', usageNote: 'Sabit kalıp.' }
    ],
    sentences: [
      { ru: 'У меня болит горло, есть что-нибудь без рецепта?', tr: 'Boğazım ağrıyor, reçetesiz bir şey var mı?', scrambled: ['рецепта?', 'без', 'что-нибудь', 'есть', 'горло,', 'болит', 'У меня'], correct: ['У меня', 'болит', 'горло,', 'есть', 'что-нибудь', 'без', 'рецепта?'] },
      { ru: 'Есть аналог дешевле?', tr: 'Daha ucuz muadili var mı?', scrambled: ['дешевле?', 'аналог', 'Есть'], correct: ['Есть', 'аналог', 'дешевле?'] }
    ],
    sceneTitle: 'Eczane Tezgâhı',
    sceneContext: 'Karakterin soğuk algınlığı için eczacıya dert anlattığı gündelik sahne.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Здравствуйте, у меня температура и кашель.', reading: 'Zdrástvuyte, u minyá temperátura i káshlel\'.', tr: 'Merhaba, ateşim ve öksürüğüm var.' },
      { speaker: 'Eczacı', ru: 'Аллергии есть? Могу дать сироп без рецепта.', reading: 'Allergíi yest\'? Magú dat\' siróp bez retsépta.', tr: 'Alerjiniz var mı? Reçetesiz şurup verebilirim.' },
      { speaker: 'Müşteri', ru: 'Спасибо. Есть аналог дешевле?', reading: 'Spasíba. Yest\' analóg deshévle?', tr: 'Teşekkürler. Daha ucuz muadili var mı?' },
      { speaker: 'Eczacı', ru: 'Да. Дозировка — три раза в день.', reading: 'Da. Dazirófka — tri ráza v den\'.', tr: 'Evet. Doz: günde üç kez.' }
    ]
  },
  {
    id: 'mod_b1_10',
    unitNumber: 28,
    levelGroup: 'B1',
    title: 'Flört & Tanışma (Manitacılık)',
    description: 'İlgi gösterme, kompliman, numara isteme — samimi ama doğal kalıplar',
    category: 'İlişkiler & Flört',
    color: '#f43f5e',
    icon: '😍',
    grammarExplain: `📌 FLÖRT KALIPLARI:
1. "Можно с тобой познакомиться?" (Mózhna s tabóy paznakómit'sya?) kibar tanışma isteğidir.
2. "Дай номер" samimi; "Можно ваш номер?" daha naziktir. 'Ты/Вы' seçimi flörtün tonunu belirler.`,
    words: [
      { id: 'w_fl1', ru: 'Познакомиться', reading: 'Paznakómit\'sya', tr: 'Tanışmak', level: 'B1', usageNote: 'Dönüşlü mastar.' },
      { id: 'w_fl2', ru: 'Симпатичный', reading: 'Simpatíchnyy', tr: 'Çekici / Sevimli (eril)', level: 'B1', usageNote: 'Dişili: симпатичная.' },
      { id: 'w_fl3', ru: 'Улыбка', reading: 'Ulýbka', tr: 'Gülümseme', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_fl4', ru: 'Номер', reading: 'Nómer', tr: 'Numara', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_fl5', ru: 'Написать', reading: 'Napisát\'', tr: 'Yazmak (mesaj)', level: 'B1', usageNote: 'Mastar; \'Напиши мне\'.' },
      { id: 'w_fl6', ru: 'Занят', reading: 'Zányat', tr: 'Meşgul / İlişkisi var (erkek)', level: 'B1', usageNote: 'Dişil: занята.' },
      { id: 'w_fl7', ru: 'Комплимент', reading: 'Kamplimént', tr: 'Kompliman', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_fl8', ru: 'Стесняюсь', reading: 'Stesnyáyus\'', tr: 'Utanıyorum', level: 'B1', usageNote: 'Birinci tekil, dönüşlü fiil.' }
    ],
    sentences: [
      { ru: 'Можно с тобой познакомиться?', tr: 'Seninle tanışabilir miyim?', scrambled: ['познакомиться?', 'с тобой', 'Можно'], correct: ['Можно', 'с тобой', 'познакомиться?'] },
      { ru: 'Ты очень симпатичная. Можно номер?', tr: 'Çok tatlısın. Numaranı alabilir miyim?', scrambled: ['номер?', 'Можно', 'симпатичная.', 'очень', 'Ты'], correct: ['Ты', 'очень', 'симпатичная.', 'Можно', 'номер?'] }
    ],
    sceneTitle: 'Kafede Göz Göze',
    sceneContext: 'Gençlik dizisinde iki karakterin kafede ilk kez flört ettiği orijinal sahne.',
    dialogue: [
      { speaker: 'Alişa', ru: 'Привет. Можно сесть рядом? Тут свободно?', reading: 'Privét. Mózhna sest\' ryádom? Tut svabódna?', tr: 'Selam. Yanına oturabilir miyim? Burası boş mu?' },
      { speaker: 'Masha', ru: 'Да, садись. Я Маша.', reading: 'Da, sadís\'. Ya Másha.', tr: 'Evet, otur. Ben Maşa.' },
      { speaker: 'Alişa', ru: 'Ты очень симпатичная. Можно номер? Хочу написать.', reading: 'Ty óchen\' simpatíchnaya. Mózhna nómer? Khachú napisát\'.', tr: 'Çok tatlısın. Numaranı alabilir miyim? Yazmak istiyorum.' },
      { speaker: 'Masha', ru: 'Ладно. Только не странные сообщения, хорошо?', reading: 'Ládna. Tól\'ka ne stránnye saabshchéniya, haraşó?', tr: 'Tamam. Sadece garip mesajlar atma, olur mu?' }
    ]
  },
  {
    id: 'mod_b1_11',
    unitNumber: 29,
    levelGroup: 'B1',
    title: 'Randevu Teklifi & Plan Yapma',
    description: 'Kahve, sinema, yürüyüş teklifi ve \'müsait misin\' kalıpları',
    category: 'İlişkiler & Flört',
    color: '#fb7185',
    icon: '☕',
    grammarExplain: `📌 RANDEVU KALIPLARI:
1. "Ты свободна вечером?" (Ty svabódna vécheram?) -> "Akşam müsait misin?" (dişil).
2. "Давай сходим в кино" (Daváy skhódim v kinó) -> "Hadi sinemaya gidelim" samimi tekliftir.`,
    words: [
      { id: 'w_dt1', ru: 'Свидание', reading: 'Svidánie', tr: 'Randevu', level: 'B1', usageNote: 'Orta cinsiyet.' },
      { id: 'w_dt2', ru: 'Свободен', reading: 'Svabóden', tr: 'Müsait (erkek)', level: 'B1', usageNote: 'Dişil: свободна.' },
      { id: 'w_dt3', ru: 'Сходить', reading: 'Skhadít\'', tr: 'Gidip gelmek / bir yere uğramak', level: 'B1', usageNote: 'Tek seferlik plan fiili.' },
      { id: 'w_dt4', ru: 'Кино', reading: 'Kinó', tr: 'Sinema / Film', level: 'B1', usageNote: 'Çekimlenmez.' },
      { id: 'w_dt5', ru: 'Прогулка', reading: 'Pragúlka', tr: 'Yürüyüş', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_dt6', ru: 'Отказаться', reading: 'Atkazát\'sya', tr: 'Reddetmek', level: 'B1', usageNote: 'Dönüşlü mastar.' },
      { id: 'w_dt7', ru: 'Перенести', reading: 'Perenestí', tr: 'Ertelemek', level: 'B1', usageNote: 'Randevu kaydırırken.' },
      { id: 'w_dt8', ru: 'Жду тебя', reading: 'Zhdú tibyá', tr: 'Seni bekliyorum', level: 'B1', usageNote: 'Sabit samimi kalıp.' }
    ],
    sentences: [
      { ru: 'Ты свободна завтра вечером?', tr: 'Yarın akşam müsait misin?', scrambled: ['вечером?', 'завтра', 'свободна', 'Ты'], correct: ['Ты', 'свободна', 'завтра', 'вечером?'] },
      { ru: 'Давай сходим в кино после работы.', tr: 'İşten sonra hadi sinemaya gidelim.', scrambled: ['работы.', 'после', 'в кино', 'сходим', 'Давай'], correct: ['Давай', 'сходим', 'в кино', 'после', 'работы.'] }
    ],
    sceneTitle: 'Mesajlaşılarak Randevu',
    sceneContext: 'Dizide iki karakterin mesajlaşarak ilk randevuyu ayarladığı sahne.',
    dialogue: [
      { speaker: 'Ivan', ru: 'Ты свободна завтра вечером? Давай сходим в кино.', reading: 'Ty svabódna zavtra vécheram? Daváy skhódim v kinó.', tr: 'Yarın akşam müsait misin? Hadi sinemaya gidelim.' },
      { speaker: 'Olga', ru: 'Хочу, но могу только после семи. Нормально?', reading: 'Khachú, no magú tól\'ka pósle semí. Narmál\'na?', tr: 'İsterim ama ancak yediden sonra. Olur mu?' },
      { speaker: 'Ivan', ru: 'Идеально. Жду тебя у метро.', reading: 'Ideál\'na. Zhdú tibyá u mitró.', tr: 'Mükemmel. Seni metroda bekliyorum.' },
      { speaker: 'Olga', ru: 'Если что, я напишу. До завтра!', reading: 'Yesli shto, ya napishú. Da zavtra!', tr: 'Bir şey olursa yazarım. Yarına!' }
    ]
  },
  {
    id: 'mod_b1_12',
    unitNumber: 30,
    levelGroup: 'B1',
    title: 'Film & Dizi Konuşması',
    description: 'Spoiler, bölüm, oyuncu, \'izliyor musun\' — diziler hakkında sohbet',
    category: 'Film & Dizi',
    color: '#8b5cf6',
    icon: '🎬',
    grammarExplain: `📌 İZLEME SOHBETİ:
1. "Ты смотрел...?" (Ty smatrél...?) eril; "Ты смотрела...?" dişil.
2. "Без спойлеров!" (Bez spóylerov!) spoiler istememenin en kısa yoludur.`,
    words: [
      { id: 'w_mv1', ru: 'Сериал', reading: 'Seriál', tr: 'Dizi', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_mv2', ru: 'Серия', reading: 'Sériya', tr: 'Bölüm', level: 'B1', usageNote: 'Dişil; \'Последняя серия\'.' },
      { id: 'w_mv3', ru: 'Спойлер', reading: 'Spóyler', tr: 'Spoiler', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_mv4', ru: 'Сюжет', reading: 'Syuzhét', tr: 'Konu / Öykü', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_mv5', ru: 'Актёр', reading: 'Aktyór', tr: 'Oyuncu (erkek)', level: 'B1', usageNote: 'Dişil: актриса.' },
      { id: 'w_mv6', ru: 'Саундтрек', reading: 'Sáundtrek', tr: 'Müzik / Soundtrack', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_mv7', ru: 'Затягивает', reading: 'Zatyágivayet', tr: 'Sürüklüyor / Bağımlı ediyor', level: 'B1', usageNote: 'Dizi için sık kullanılır.' },
      { id: 'w_mv8', ru: 'Пересмотреть', reading: 'Peresmatrét\'', tr: 'Yeniden izlemek', level: 'B1', usageNote: 'Mastar.' }
    ],
    sentences: [
      { ru: 'Ты смотрела последнюю серию?', tr: 'Son bölümü izledin mi?', scrambled: ['серию?', 'последнюю', 'смотрела', 'Ты'], correct: ['Ты', 'смотрела', 'последнюю', 'серию?'] },
      { ru: 'Без спойлеров, я ещё не видел!', tr: 'Spoiler yok, henüz görmedim!', scrambled: ['видел!', 'не', 'ещё', 'я', 'спойлеров,', 'Без'], correct: ['Без', 'спойлеров,', 'я', 'ещё', 'не', 'видел!'] }
    ],
    sceneTitle: 'Kanepede Dizi Tartışması',
    sceneContext: 'İki arkadaşın yeni bölümü konuşurken spoiler yememek için ugraştığı sahne.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'Ты смотрела последнюю серию? Сюжет просто огонь.', reading: 'Ty smatréla paslédnyuyu sériyu? Syuzhét prósta agón\'.', tr: 'Son bölümü izledin mi? Konu resmen ateş.' },
      { speaker: 'Arkadaş 2', ru: 'Стой! Без спойлеров, я ещё не видела!', reading: 'Stoy! Bez spóylerov, ya yeshchó ne videla!', tr: 'Dur! Spoiler yok, henüz görmedim!' },
      { speaker: 'Arkadaş 1', ru: 'Ладно. Только скажу: саундтрек затягивает.', reading: 'Ládna. Tól\'ka skazhú: sáundtrek zatyágivayet.', tr: 'Tamam. Sadece şunu diyeyim: müzik sürüklüyor.' },
      { speaker: 'Arkadaş 2', ru: 'Сегодня вечером пересмотрю с начала.', reading: 'Sivódnya vécheram peresmatryú s nachála.', tr: 'Bu akşam baştan yeniden izleyeceğim.' }
    ]
  },
  {
    id: 'mod_b1_13',
    unitNumber: 31,
    levelGroup: 'B1',
    title: 'Sinemada Bilet & Patlamış Mısır',
    description: 'Gişe, koltuk, altyazı, 3D — sinema gişesinde konuşma',
    category: 'Film & Dizi',
    color: '#7c3aed',
    icon: '🍿',
    grammarExplain: `📌 SİNEMA GİŞESİ:
1. "Два билета на семичасовой сеанс" (Dva bilyéta na semichasavóy seáns) -> "Yedi gösterimine iki bilet".
2. "С субтитрами или дубляж?" altyazı / dublaj sorusudur.`,
    words: [
      { id: 'w_cin1', ru: 'Билет', reading: 'Bilyét', tr: 'Bilet', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_cin2', ru: 'Сеанс', reading: 'Seáns', tr: 'Gösterim', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_cin3', ru: 'Ряд', reading: 'Ryad', tr: 'Sıra', level: 'B1', usageNote: 'Eril; \'Десятый ряд\'.' },
      { id: 'w_cin4', ru: 'Субтитры', reading: 'Subtítry', tr: 'Altyazı', level: 'B1', usageNote: 'Çoğul.' },
      { id: 'w_cin5', ru: 'Дубляж', reading: 'Dublázh', tr: 'Dublaj', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_cin6', ru: 'Попкорн', reading: 'Popkórn', tr: 'Patlamış mısır', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_cin7', ru: 'Свободные места', reading: 'Svabódnye mestá', tr: 'Boş koltuklar', level: 'B1', usageNote: 'Sabit ifade.' },
      { id: 'w_cin8', ru: 'Зал', reading: 'Zal', tr: 'Salon', level: 'B1', usageNote: 'Eril.' }
    ],
    sentences: [
      { ru: 'Два билета на вечерний сеанс, пожалуйста.', tr: 'Akşam gösterimine iki bilet lütfen.', scrambled: ['пожалуйста.', 'сеанс,', 'вечерний', 'на', 'билета', 'Два'], correct: ['Два', 'билета', 'на', 'вечерний', 'сеанс,', 'пожалуйста.'] },
      { ru: 'Есть места с субтитрами?', tr: 'Altyazılı koltuk/gösterim var mı?', scrambled: ['субтитрами?', 'с', 'места', 'Есть'], correct: ['Есть', 'места', 'с', 'субтитрами?'] }
    ],
    sceneTitle: 'Sinema Gişesi',
    sceneContext: 'Randevu sahnesinin devamı: gişede bilet ve atıştırmalık alma.',
    dialogue: [
      { speaker: 'Gişe', ru: 'На какой сеанс? Есть свободные места в десятом ряду.', reading: 'Na kakóy seáns? Yest\' svabódnye mestá v desyátam ryadú.', tr: 'Hangi gösterim? Onuncu sırada boş yer var.' },
      { speaker: 'Müşteri', ru: 'Два билета на семь. С субтитрами, если можно.', reading: 'Dva bilyéta na sem\'. S subtítrami, yesli mózhna.', tr: 'Yediye iki bilet. Mümkünse altyazılı.' },
      { speaker: 'Gişe', ru: 'Да. Большой попкорн брать будете?', reading: 'Da. Bal\'shóy popkórn brat\' búdete?', tr: 'Evet. Büyük patlamış mısır alacak mısınız?' },
      { speaker: 'Müşteri', ru: 'Да, и две колы. В какой зал?', reading: 'Da, i dve kóly. V kakóy zal?', tr: 'Evet, ve iki kola. Hangi salon?' }
    ]
  },
  {
    id: 'mod_b1_14',
    unitNumber: 32,
    levelGroup: 'B1',
    title: 'İş Yerinde Küçük Sohbet',
    description: 'Kahve makinesi muhabbeti, hafta sonu, \'nasıl gidiyor\' — ofis small talk',
    category: 'İş Hayatı',
    color: '#6366f1',
    icon: '💬',
    grammarExplain: `📌 OFİS SMALL TALK:
1. "Как выходные?" (Kak výkhadnýe?) Pazartesi klasiğidir.
2. Resmi ortamda bile meslektaşlarla 'ты' geçilebilir; müdüre 'вы' kalır.`,
    words: [
      { id: 'w_of1', ru: 'Выходные', reading: 'Výkhadnýe', tr: 'Hafta sonu', level: 'B1', usageNote: 'Çoğul sıfat-isim.' },
      { id: 'w_of2', ru: 'Пробка', reading: 'Próbka', tr: 'Trafik / Tıkanıklık', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_of3', ru: 'Дедлайн', reading: 'Dedláyn', tr: 'Son teslim', level: 'B1', usageNote: 'Eril, ödünç kelime.' },
      { id: 'w_of4', ru: 'Перерыв', reading: 'Pererýv', tr: 'Mola', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_of5', ru: 'Кофемашина', reading: 'Kofemashína', tr: 'Kahve makinesi', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_of6', ru: 'Устал', reading: 'Ustál', tr: 'Yoruldum (erkek)', level: 'B1', usageNote: 'Dişil: устала.' },
      { id: 'w_of7', ru: 'Нормально идёт', reading: 'Narmál\'na idyot', tr: 'İyi gidiyor', level: 'B1', usageNote: 'İş sorusuna doğal cevap.' },
      { id: 'w_of8', ru: 'Давай потом', reading: 'Daváy patóm', tr: 'Sonra konuşuruz', level: 'B1', usageNote: 'Nazik kaçış kalıbı.' }
    ],
    sentences: [
      { ru: 'Как выходные? Отдохнул?', tr: 'Hafta sonu nasıldı? Dinlendin mi?', scrambled: ['Отдохнул?', 'выходные?', 'Как'], correct: ['Как', 'выходные?', 'Отдохнул?'] },
      { ru: 'Я в пробке, немного опоздаю.', tr: 'Trafikteyim, biraz geç kalacağım.', scrambled: ['опоздаю.', 'немного', 'в пробке,', 'Я'], correct: ['Я', 'в пробке,', 'немного', 'опоздаю.'] }
    ],
    sceneTitle: 'Kahve Makinesi Başı',
    sceneContext: 'Ofis dizisinde Pazartesi sabahı kahve makinesi sohbeti.',
    dialogue: [
      { speaker: 'Meslektaş', ru: 'Привет! Как выходные?', reading: 'Privét! Kak výkhadnýe?', tr: 'Selam! Hafta sonu nasıldı?' },
      { speaker: 'Sen', ru: 'Нормально. А у тебя как дедлайн?', reading: 'Narmál\'na. A u tibyá kak dedláyn?', tr: 'İyi. Senin son teslim nasıl?' },
      { speaker: 'Meslektaş', ru: 'Устала уже. Кофе?', reading: 'Ustalá uzhé. Kófe?', tr: 'Şimdiden yoruldum. Kahve?' },
      { speaker: 'Sen', ru: 'Давай. Потом на перерыве поговорим.', reading: 'Daváy. Patóm na pererýve pagavarím.', tr: 'Hadi. Molada konuşuruz.' }
    ]
  },
  {
    id: 'mod_b1_15',
    unitNumber: 33,
    levelGroup: 'B1',
    title: 'Toplantı Erteleme & İzin',
    description: 'Hasta raporu, izin, toplantıyı kaydırma — işte pratik resmi dil',
    category: 'İş Hayatı',
    color: '#4f46e5',
    icon: '📅',
    grammarExplain: `📌 İZİN VE ERTELEME:
1. "Могу ли я взять отгул?" (Magú li ya vzyat' atgúl?) -> "İzin alabilir miyim?"
2. "Давайте перенесём совещание" kibar erteleme kalıbıdır.`,
    words: [
      { id: 'w_lv1', ru: 'Отгул', reading: 'Atgúl', tr: 'Günlük izin', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_lv2', ru: 'Больничный', reading: 'Bal\'níchnyy', tr: 'Rapor / Hastalık izni', level: 'B1', usageNote: 'Eril sıfat-isim.' },
      { id: 'w_lv3', ru: 'Отпуск', reading: 'Ótpusk', tr: 'Yıllık izin', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_lv4', ru: 'Перенести', reading: 'Perenestí', tr: 'Ertelemek / Kaydırmak', level: 'B1', usageNote: 'Toplantı için.' },
      { id: 'w_lv5', ru: 'Согласовать', reading: 'Saglasavát\'', tr: 'Onaylatmak', level: 'B1', usageNote: 'Müdür onayı.' },
      { id: 'w_lv6', ru: 'Заменить', reading: 'Zamenít\'', tr: 'Yerine bakmak / Değiştirmek', level: 'B1', usageNote: 'Mastar.' },
      { id: 'w_lv7', ru: 'Срочно', reading: 'Sróchna', tr: 'Acil', level: 'B1', usageNote: 'Zarf.' },
      { id: 'w_lv8', ru: 'Понял', reading: 'Pónyal', tr: 'Anladım (erkek)', level: 'B1', usageNote: 'Dişil: поняла.' }
    ],
    sentences: [
      { ru: 'Могу ли я взять отгул в пятницу?', tr: 'Cuma günü izin alabilir miyim?', scrambled: ['в пятницу?', 'отгул', 'взять', 'ли я', 'Могу'], correct: ['Могу', 'ли я', 'взять', 'отгул', 'в пятницу?'] },
      { ru: 'Давайте перенесём совещание на понедельник.', tr: 'Toplantıyı Pazartesi\'ye kaydıralım.', scrambled: ['понедельник.', 'на', 'совещание', 'перенесём', 'Давайте'], correct: ['Давайте', 'перенесём', 'совещание', 'на', 'понедельник.'] }
    ],
    sceneTitle: 'Müdüre Mesaj',
    sceneContext: 'Çalışanın toplantıyı kaydırmak için müdürle konuştuğu sahne.',
    dialogue: [
      { speaker: 'Çalışan', ru: 'Иван Петрович, могу ли я взять отгул в пятницу?', reading: 'Ivan Petróvich, magú li ya vzyat\' atgúl v pyátnitsu?', tr: 'Ivan Petroviç, Cuma izin alabilir miyim?' },
      { speaker: 'Müdür', ru: 'По какой причине? Совещание как раз в пятницу.', reading: 'Pa kakóy prichíne? Savishchániye kak raz v pyátnitsu.', tr: 'Ne sebeple? Toplantı tam Cuma.' },
      { speaker: 'Çalışan', ru: 'Срочно к врачу. Можем перенести на понедельник?', reading: 'Sróchna k vrachú. Mózhem perenestí na panedél\'nik?', tr: 'Acil doktora. Pazartesi\'ye alabilir miyiz?' },
      { speaker: 'Müdür', ru: 'Хорошо, согласую. Предупреди коллег.', reading: 'Haraşó, saglasúyu. Predupredí kalyég.', tr: 'Tamam, onaylarım. Meslektaşları uyar.' }
    ]
  },
  {
    id: 'mod_b1_16',
    unitNumber: 34,
    levelGroup: 'B1',
    title: 'Usta Çağırma: Tesisatçı & Tamir',
    description: 'Musluk, elektrik, kapı — ev arızası ve usta randevusu',
    category: 'Orada Yaşamak',
    color: '#f59e0b',
    icon: '🔧',
    grammarExplain: `📌 TAMİR KALIPLARI:
1. "У меня протекает кран" (U minyá pratekâyet kran) -> "Musluğum akıtıyor".
2. "Во сколько мастер приедет?" randevu saati sormaktır.`,
    words: [
      { id: 'w_fx1', ru: 'Мастер', reading: 'Mástər', tr: 'Usta', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_fx2', ru: 'Протекает', reading: 'Pratekâyet', tr: 'Akıtıyor / Sızıntı var', level: 'B1', usageNote: 'Şimdiki zaman.' },
      { id: 'w_fx3', ru: 'Кран', reading: 'Kran', tr: 'Musluk', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_fx4', ru: 'Электричество', reading: 'Elektríchestva', tr: 'Elektrik', level: 'B1', usageNote: 'Orta cinsiyet.' },
      { id: 'w_fx5', ru: 'Сломалось', reading: 'Slamálas\'', tr: 'Bozuldu (orta/dişil)', level: 'B1', usageNote: 'Geçmiş zaman.' },
      { id: 'w_fx6', ru: 'Заявка', reading: 'Zayávka', tr: 'Başvuru / Arıza kaydı', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_fx7', ru: 'Приедет', reading: 'Priyédet', tr: 'Gelecek (o)', level: 'B1', usageNote: 'Gelecek zaman.' },
      { id: 'w_fx8', ru: 'Сколько будет стоить?', reading: 'Skól\'ka búdet stóit\'?', tr: 'Kaça mal olacak?', level: 'B1', usageNote: 'Fiyat sorma.' }
    ],
    sentences: [
      { ru: 'У меня протекает кран на кухне.', tr: 'Mutfaktaki musluk akıtıyor.', scrambled: ['на кухне.', 'кран', 'протекает', 'У меня'], correct: ['У меня', 'протекает', 'кран', 'на кухне.'] },
      { ru: 'Во сколько мастер приедет?', tr: 'Usta saat kaçta gelecek?', scrambled: ['приедет?', 'мастер', 'Во сколько'], correct: ['Во сколько', 'мастер', 'приедет?'] }
    ],
    sceneTitle: 'Acil Tamir',
    sceneContext: 'Dizide gece yarısı musluk patlayınca yöneticiyle telefon sahnesi.',
    dialogue: [
      { speaker: 'Kiracı', ru: 'Алло, у меня протекает кран, уже потоп!', reading: 'Alló, u minyá pratekâyet kran, uzhé patóp!', tr: 'Alo, musluk akıtıyor, sel oldu bile!' },
      { speaker: 'Yönetici', ru: 'Сейчас оставлю заявку. Мастер приедет через час.', reading: 'Seychás astávlyu zayávku. Mástər priyédet chyérez chas.', tr: 'Şimdi kayıt açıyorum. Usta bir saate gelir.' },
      { speaker: 'Kiracı', ru: 'Сколько будет стоить?', reading: 'Skól\'ka búdet stóit\'?', tr: 'Kaça mal olacak?' },
      { speaker: 'Yönetici', ru: 'Сначала посмотрим. Не выключайте воду полностью, если можно.', reading: 'Snachála pasmótrim. Ne vyklyucháyte vódu pólnast\'yu, yesli mózhna.', tr: 'Önce bakalım. Mümkünse suyu tamamen kapatmayın.' }
    ]
  },
  {
    id: 'mod_b1_17',
    unitNumber: 35,
    levelGroup: 'B1',
    title: 'Kuaför & Berber Randevusu',
    description: 'Saç kestirme, randevu, \'çok kısa olmasın\' — salon dili',
    category: 'Gündelik Yaşam',
    color: '#ec4899',
    icon: '💇',
    grammarExplain: `📌 SALON KALIPLARI:
1. "Хочу записаться на стрижку" (Khachú zapisát'sya na strízhku).
2. "Не слишком коротко, пожалуйста" net bir istektir.`,
    words: [
      { id: 'w_hr1', ru: 'Парикмахерская', reading: 'Parikmákherskaya', tr: 'Kuaför / Berber', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_hr2', ru: 'Стрижка', reading: 'Strízhka', tr: 'Saç kesimi', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_hr3', ru: 'Записаться', reading: 'Zapisát\'sya', tr: 'Randevu almak', level: 'B1', usageNote: 'Dönüşlü mastar.' },
      { id: 'w_hr4', ru: 'Чёлка', reading: 'Chyólka', tr: 'Kakül', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_hr5', ru: 'Окрашивание', reading: 'Akráshivanie', tr: 'Boya', level: 'B1', usageNote: 'Orta cinsiyet.' },
      { id: 'w_hr6', ru: 'Коротко', reading: 'Kóratka', tr: 'Kısa', level: 'B1', usageNote: 'Zarf.' },
      { id: 'w_hr7', ru: 'Кончики', reading: 'Kónchiki', tr: 'Uçlar', level: 'B1', usageNote: 'Çoğul.' },
      { id: 'w_hr8', ru: 'Нравится', reading: 'Nrávitsya', tr: 'Beğeniyorum / Hoşuna gidiyor', level: 'B1', usageNote: 'Dönüşlü fiil.' }
    ],
    sentences: [
      { ru: 'Хочу записаться на стрижку на субботу.', tr: 'Cumartesi saç kesimine randevu almak istiyorum.', scrambled: ['на субботу.', 'на стрижку', 'записаться', 'Хочу'], correct: ['Хочу', 'записаться', 'на стрижку', 'на субботу.'] },
      { ru: 'Не слишком коротко, только кончики.', tr: 'Çok kısa olmasın, sadece uçlar.', scrambled: ['кончики.', 'только', 'коротко,', 'слишком', 'Не'], correct: ['Не', 'слишком', 'коротко,', 'только', 'кончики.'] }
    ],
    sceneTitle: 'Kuaför Koltuğu',
    sceneContext: 'Karakterin randevuya geç kalıp yine de kesim tarif ettiği sahne.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Здравствуйте, я записана на четыре. Извините за опоздание.', reading: 'Zdrástvuyte, ya zapisana na chetýre. Izviníte za apazdánie.', tr: 'Merhaba, dörde randevum var. Geciktiğim için özür.' },
      { speaker: 'Kuaför', ru: 'Ничего. Что делаем? Стрижка и чёлка?', reading: 'Nichevó. Shto délayem? Strízhka i chyólka?', tr: 'Sorun değil. Ne yapıyoruz? Kesim ve kakül?' },
      { speaker: 'Müşteri', ru: 'Не слишком коротко, только кончики. Чёлку чуть короче.', reading: 'Ne slíshkam kóratka, tól\'ka kónchiki. Chyólku chut\' karóche.', tr: 'Çok kısa olmasın, sadece uçlar. Kakülü biraz kısalt.' },
      { speaker: 'Kuaför', ru: 'Хорошо. Если не понравится — скажите сразу.', reading: 'Haraşó. Yesli ne panrávitsya — skazhíte srázu.', tr: 'Tamam. Beğenmezsen hemen söyle.' }
    ]
  },
  {
    id: 'mod_b1_18',
    unitNumber: 36,
    levelGroup: 'B1',
    title: 'Belgeler, Pasaport & Göçmenlik Penceresi',
    description: 'Kuyruk, fotokopi, başvuru — resmi dairede kaybolmamak',
    category: 'Orada Yaşamak',
    color: '#64748b',
    icon: '📄',
    grammarExplain: `📌 RESMİ DAİRE:
1. "Какое окно?" (Kakóye aknó?) -> "Hangi gişe?"
2. "Не хватает копии паспорта" eksik evrak klasiğidir.`,
    words: [
      { id: 'w_dc1', ru: 'Документы', reading: 'Dakuménty', tr: 'Belgeler', level: 'B1', usageNote: 'Çoğul.' },
      { id: 'w_dc2', ru: 'Паспорт', reading: 'Páspart', tr: 'Pasaport', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_dc3', ru: 'Копия', reading: 'Kópiya', tr: 'Fotokopi', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_dc4', ru: 'Окно', reading: 'Aknó', tr: 'Gişe / Pencere', level: 'B1', usageNote: 'Orta cinsiyet; akanje.' },
      { id: 'w_dc5', ru: 'Заявление', reading: 'Zayavlyénie', tr: 'Dilekçe / Başvuru formu', level: 'B1', usageNote: 'Orta cinsiyet.' },
      { id: 'w_dc6', ru: 'Очередь', reading: 'Óchered\'', tr: 'Sıra', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_dc7', ru: 'Готово', reading: 'Gatóva', tr: 'Hazır', level: 'B1', usageNote: 'Belge teslimi.' },
      { id: 'w_dc8', ru: 'Не хватает', reading: 'Ne khvatáyet', tr: 'Eksik / Yetmiyor', level: 'B1', usageNote: 'Evrak için.' }
    ],
    sentences: [
      { ru: 'Скажите, какое окно на регистрацию?', tr: 'Söyleyin, kayıt için hangi gişe?', scrambled: ['на регистрацию?', 'окно', 'какое', 'Скажите,'], correct: ['Скажите,', 'какое', 'окно', 'на регистрацию?'] },
      { ru: 'Не хватает копии паспорта.', tr: 'Pasaport fotokopisi eksik.', scrambled: ['паспорта.', 'копии', 'Не хватает'], correct: ['Не хватает', 'копии', 'паспорта.'] }
    ],
    sceneTitle: 'Resmi Daire Kuyruğu',
    sceneContext: 'Yeni gelen birinin gişe gişe dolaştırıldığı gerçekçi bürokrasi sahnesi.',
    dialogue: [
      { speaker: 'Başvuran', ru: 'Здравствуйте, какое окно на регистрацию?', reading: 'Zdrástvuyte, kakóye aknó na registrátsiyu?', tr: 'Merhaba, kayıt hangi gişe?' },
      { speaker: 'Görevli', ru: 'Третье. Документы все с собой?', reading: 'Trét\'ye. Dakuménty vse s sabóy?', tr: 'Üçüncü. Belgelerin hepsi yanınızda mı?' },
      { speaker: 'Başvuran', ru: 'Паспорт и заявление. Копия нужна?', reading: 'Páspart i zayavlyénie. Kópiya nuzhná?', tr: 'Pasaport ve dilekçe. Fotokopi lazım mı?' },
      { speaker: 'Görevli', ru: 'Да. Пока не хватает копии. Сделайте рядом и вернитесь.', reading: 'Da. Paká ne khvatáyet kópii. Sdélaite ryádom i vernítes\'.', tr: 'Evet. Şimdilik kopya eksik. Yandaki yerde çekip dönün.' }
    ]
  },
  {
    id: 'mod_b1_19',
    unitNumber: 37,
    levelGroup: 'B1',
    title: 'Komşuyla Gürültü & Rica',
    description: 'Kapı çalma, gürültü şikâyeti, nazik ama net sınır koyma',
    category: 'Gündelik Yaşam',
    color: '#14b8a6',
    icon: '🚪',
    grammarExplain: `📌 SINIR KOYMA:
1. "Можно потише, пожалуйста?" nazik istek.
2. "Уже полночь" (Uzhé pólnach') saat gerekçesidir.`,
    words: [
      { id: 'w_nb1', ru: 'Сосед', reading: 'Saséd', tr: 'Komşu (erkek)', level: 'B1', usageNote: 'Dişil: соседка.' },
      { id: 'w_nb2', ru: 'Шум', reading: 'Shum', tr: 'Gürültü', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_nb3', ru: 'Потише', reading: 'Patíshe', tr: 'Daha sessiz', level: 'B1', usageNote: 'Karşılaştırmalı zarf.' },
      { id: 'w_nb4', ru: 'Полночь', reading: 'Pólnach\'', tr: 'Gece yarısı', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_nb5', ru: 'Слышно', reading: 'Slýshna', tr: 'Duyuluyor', level: 'B1', usageNote: 'Kişisiz yapı.' },
      { id: 'w_nb6', ru: 'Извини', reading: 'Izviní', tr: 'Kusura bakma (senli)', level: 'B1', usageNote: 'Samimi.' },
      { id: 'w_nb7', ru: 'Жалоба', reading: 'Zháloba', tr: 'Şikâyet', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_nb8', ru: 'Договорились', reading: 'Dagavarílis\'', tr: 'Anlaştık', level: 'B1', usageNote: 'Pazarlık kapanışı.' }
    ],
    sentences: [
      { ru: 'Соседи, можно потише, пожалуйста?', tr: 'Komşular, biraz daha sessiz olabilir misiniz lütfen?', scrambled: ['пожалуйста?', 'потише,', 'можно', 'Соседи,'], correct: ['Соседи,', 'можно', 'потише,', 'пожалуйста?'] },
      { ru: 'Уже полночь, всё очень слышно.', tr: 'Gece yarısı oldu, her şey çok duyuluyor.', scrambled: ['слышно.', 'очень', 'всё', 'полночь,', 'Уже'], correct: ['Уже', 'полночь,', 'всё', 'очень', 'слышно.'] }
    ],
    sceneTitle: 'Kapı Önü',
    sceneContext: 'Dizide üst katın müziği yüzünden kapı çalma sahnesi.',
    dialogue: [
      { speaker: 'Sen', ru: 'Извините за стук. Можно потише? Уже полночь.', reading: 'Izviníte za stuk. Mózhna patíshe? Uzhé pólnach\'.', tr: 'Kapı çaldığım için kusura bakmayın. Biraz kısabilir misiniz? Gece yarısı oldu.' },
      { speaker: 'Komşu', ru: 'Ой, извини. Я не думал, что так слышно.', reading: 'Oy, izviní. Ya ne dúmal, shto tak slýshna.', tr: 'Ay, kusura bakma. Bu kadar duyulacağını düşünmemiştim.' },
      { speaker: 'Sen', ru: 'Спасибо. Завтра можно, конечно, но не сейчас.', reading: 'Spasíba. Zavtra mózhna, kanyéshna, no ne seychás.', tr: 'Teşekkürler. Yarın olur tabii, ama şimdi değil.' },
      { speaker: 'Komşu', ru: 'Договорились. Спокойной ночи.', reading: 'Dagavarílis\'. Spakóynoy nóchi.', tr: 'Anlaştık. İyi geceler.' }
    ]
  },
  {
    id: 'mod_b1_20',
    unitNumber: 38,
    levelGroup: 'B1',
    title: 'Spor Salonu & Antrenör',
    description: 'Üyelik, alet sorma, \'bu koltuk dolu mu\' — spor salonu sohbeti',
    category: 'Gündelik Yaşam',
    color: '#ef4444',
    icon: '🏋️',
    grammarExplain: `📌 SPOR SALONU:
1. "Это занято?" (Éta zányata?) alet/kolluk için.
2. "Можно с вами в пару?" eşli egzersiz teklifidir.`,
    words: [
      { id: 'w_gy1', ru: 'Тренажёрный зал', reading: 'Trenazhórnyy zal', tr: 'Spor salonu', level: 'B1', usageNote: 'Eril tam ifade.' },
      { id: 'w_gy2', ru: 'Абонемент', reading: 'Abanemént', tr: 'Üyelik', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_gy3', ru: 'Тренер', reading: 'Tréner', tr: 'Antrenör', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_gy4', ru: 'Подход', reading: 'Padkhót', tr: 'Set', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_gy5', ru: 'Занято', reading: 'Zányata', tr: 'Dolu / Meşgul', level: 'B1', usageNote: 'Alet için.' },
      { id: 'w_gy6', ru: 'Разминка', reading: 'Razmínka', tr: 'Isınma', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_gy7', ru: 'Тяжело', reading: 'Tizheló', tr: 'Ağır / Zor', level: 'B1', usageNote: 'Zarf.' },
      { id: 'w_gy8', ru: 'Молодец', reading: 'Maladets', tr: 'Aferin', level: 'B1', usageNote: 'Teşvik.' }
    ],
    sentences: [
      { ru: 'Извините, это занято или можно?', tr: 'Affedersiniz, burası dolu mu yoksa kullanabilir miyim?', scrambled: ['можно?', 'или', 'занято', 'это', 'Извините,'], correct: ['Извините,', 'это', 'занято', 'или', 'можно?'] },
      { ru: 'Хочу купить абонемент на месяц.', tr: 'Bir aylık üyelik almak istiyorum.', scrambled: ['на месяц.', 'абонемент', 'купить', 'Хочу'], correct: ['Хочу', 'купить', 'абонемент', 'на месяц.'] }
    ],
    sceneTitle: 'Ağırlık Köşesi',
    sceneContext: 'İki kişinin alet sırası için nazikçe anlaştığı spor salonu sahnesi.',
    dialogue: [
      { speaker: 'Sen', ru: 'Извините, это занято? Можно после вас?', reading: 'Izviníte, éta zányata? Mózhna pósle vas?', tr: 'Affedersiniz, dolu mu? Sizden sonra olabilir miyim?' },
      { speaker: 'Diğer', ru: 'Да, ещё один подход. Минуту.', reading: 'Da, yeshchó adín padkhót. Minútu.', tr: 'Evet, bir set daha. Bir dakika.' },
      { speaker: 'Antrenör', ru: 'Сначала разминка. Не бери сразу тяжело.', reading: 'Snachála razmínka. Ne berí srázu tizheló.', tr: 'Önce ısınma. Hemen ağır alma.' },
      { speaker: 'Sen', ru: 'Понял. Спасибо, тренер.', reading: 'Pónyal. Spasíba, tréner.', tr: 'Anladım. Teşekkürler koç.' }
    ]
  },
  {
    id: 'mod_b1_21',
    unitNumber: 39,
    levelGroup: 'B1',
    title: 'Restoranda Şikâyet & Hesap',
    description: 'Yemek soğuk, sipariş yanlış, hesap ayırma — kibar şikâyet',
    category: 'Gündelik Yaşam',
    color: '#f97316',
    icon: '🍽️',
    grammarExplain: `📌 KİBAR ŞİKÂYET:
1. "Извините, я не заказывал это" yanlış tabak.
2. "Можно счёт, пожалуйста. Можно раздельно?" hesap ve ayırma.`,
    words: [
      { id: 'w_rs1', ru: 'Счёт', reading: 'Shchyot', tr: 'Hesap', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_rs2', ru: 'Чаевые', reading: 'Chayevýe', tr: 'Bahşiş', level: 'B1', usageNote: 'Çoğul.' },
      { id: 'w_rs3', ru: 'Официант', reading: 'Afitsiant', tr: 'Garson (erkek)', level: 'B1', usageNote: 'Dişil: официантка.' },
      { id: 'w_rs4', ru: 'Холодный', reading: 'Khalódnyy', tr: 'Soğuk', level: 'B1', usageNote: 'Yemek için.' },
      { id: 'w_rs5', ru: 'Перепутать', reading: 'Perapútat\'', tr: 'Karıştırmak', level: 'B1', usageNote: 'Sipariş hatası.' },
      { id: 'w_rs6', ru: 'Раздельно', reading: 'Razdél\'na', tr: 'Ayrı ayrı', level: 'B1', usageNote: 'Hesap için.' },
      { id: 'w_rs7', ru: 'Замена', reading: 'Zaména', tr: 'Değişim', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_rs8', ru: 'Вкусно', reading: 'Vkúsna', tr: 'Lezzetli', level: 'B1', usageNote: 'Zarf/sıfat kullanımı.' }
    ],
    sentences: [
      { ru: 'Извините, это не мой заказ.', tr: 'Kusura bakmayın, bu benim siparişim değil.', scrambled: ['заказ.', 'мой', 'не', 'это', 'Извините,'], correct: ['Извините,', 'это', 'не', 'мой', 'заказ.'] },
      { ru: 'Можно счёт, пожалуйста, раздельно.', tr: 'Hesabı ayrı ayrı alabilir miyiz lütfen.', scrambled: ['раздельно.', 'пожалуйста,', 'счёт,', 'Можно'], correct: ['Можно', 'счёт,', 'пожалуйста,', 'раздельно.'] }
    ],
    sceneTitle: 'Yanlış Tabak',
    sceneContext: 'Randevu yemeğinde siparişin karıştığı klasik dizi komedi sahnesi.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Извините, я не заказывал рыбу. Это не мой заказ.', reading: 'Izviníte, ya ne zakázyval rýbu. Éta ne moy zakáz.', tr: 'Kusura bakmayın, balık söylemedim. Bu benim siparişim değil.' },
      { speaker: 'Garson', ru: 'Простите! Сейчас замена. Суп холодный?', reading: 'Prastíte! Seychás zaména. Sup khalódnyy?', tr: 'Özür! Hemen değişim. Çorba soğuk mu?' },
      { speaker: 'Müşteri', ru: 'Немного. И можно счёт раздельно, пожалуйста.', reading: 'Nemnóga. I mózhna shchyot razdél\'na, pazhálusta.', tr: 'Biraz. Ve hesabı ayrı alabilir miyiz lütfen.' },
      { speaker: 'Garson', ru: 'Конечно. Чаевые по желанию.', reading: 'Kanyéshna. Chayevýe pa zhelániyu.', tr: 'Tabii. Bahşiş isteğe bağlı.' }
    ]
  },
  {
    id: 'mod_b1_22',
    unitNumber: 40,
    levelGroup: 'B1',
    title: 'Ulaşım Kartı, Ceza & Kontrol',
    description: 'Troleybüs, kart basma, bilet kontrolü — şehir içi hayatta kalma',
    category: 'Ulaşım & Seyahat',
    color: '#06b6d4',
    icon: '🎫',
    grammarExplain: `📌 TOPLU TAŞIMA:
1. "Приложите карту" (Prilazhíte kártu) okutma komutu.
2. "Штраф" (Shtraf) ceza; kontrolör sorunca sakin kal.`,
    words: [
      { id: 'w_tr1', ru: 'Проездной', reading: 'Prayezdnóy', tr: 'Ulaşım kartı / Abonman', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_tr2', ru: 'Контролёр', reading: 'Kantraljór', tr: 'Bilet kontrolörü', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_tr3', ru: 'Штраф', reading: 'Shtraf', tr: 'Ceza', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_tr4', ru: 'Приложить', reading: 'Prilazhít\'', tr: 'Okutmak / Dayamak', level: 'B1', usageNote: 'Kart için.' },
      { id: 'w_tr5', ru: 'Валидатор', reading: 'Validátor', tr: 'Okuyucu', level: 'B1', usageNote: 'Eril.' },
      { id: 'w_tr6', ru: 'Пересадка', reading: 'Peresádka', tr: 'Aktarma', level: 'B1', usageNote: 'Dişil.' },
      { id: 'w_tr7', ru: 'Конечная', reading: 'Kanéchnaya', tr: 'Son durak', level: 'B1', usageNote: 'Dişil sıfat-isim.' },
      { id: 'w_tr8', ru: 'Выходите?', reading: 'Vykhódite?', tr: 'İnecek misiniz?', level: 'B1', usageNote: 'Kapıdaki klasik soru.' }
    ],
    sentences: [
      { ru: 'Приложите карту к валидатору.', tr: 'Kartı okuyucuya dayayın.', scrambled: ['валидатору.', 'к', 'карту', 'Приложите'], correct: ['Приложите', 'карту', 'к', 'валидатору.'] },
      { ru: 'Это конечная, все выходите.', tr: 'Burası son durak, herkes insin.', scrambled: ['выходите.', 'все', 'конечная,', 'Это'], correct: ['Это', 'конечная,', 'все', 'выходите.'] }
    ],
    sceneTitle: 'Otobüste Kontrol',
    sceneContext: 'Kontrolörün geldiği anda kartı unutan karakterin gerilimli ama komik sahnesi.',
    dialogue: [
      { speaker: 'Şoför', ru: 'Приложите карту. Дальше не едем.', reading: 'Prilazhíte kártu. Dál\'she ne yédem.', tr: 'Kartı okutun. Daha gitmiyoruz.' },
      { speaker: 'Yolcu', ru: 'Секунду... Нашла. Пересадка на метро тут?', reading: 'Sekúndu... Nashlá. Peresádka na mitró tut?', tr: 'Bir saniye... Buldum. Metro aktarması burada mı?' },
      { speaker: 'Kontrolör', ru: 'Карту покажите. Без оплаты будет штраф.', reading: 'Kártu pakazhíte. Bez apláty búdet shtraf.', tr: 'Kartı gösterin. Ödemesiz ceza yazarım.' },
      { speaker: 'Yolcu', ru: 'Вот, всё оплачено. Выходите на следующей?', reading: 'Vot, vsyo apláchena. Vykhódite na sléduyushchey?', tr: 'Buyurun, ödenmiş. Bir sonrakinde iniyor musunuz?' }
    ]
  },
  {
    id: 'mod_b2_1',
    unitNumber: 41,
    levelGroup: 'B2',
    title: 'Kıskançlık ve İhanet Sahnesi',
    description: 'Yüzleşme cümleleri ve geçmiş zaman itham kalıpları',
    category: 'Dizi Sahneleri',
    color: '#dc2626',
    icon: '😠',
    grammarExplain: `📌 GEÇMİŞ ZAMAN VE İTHAM CÜMLELERİ:
1. Rusça geçmiş zaman fiile cinsiyete göre ek alır: eril "-л", dişil "-ла". Örn: Он видел / Она видела.
2. "Как ты мог...?" (Kak ty mog...?) -> "Nasıl yapabildin...?" dizilerin klasik itham cümlesidir.`,
    words: [
      { id: 'w_i1', ru: 'Измена', reading: 'Izména', tr: 'İhanet', level: 'B2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_i2', ru: 'Ревность', reading: "Révnast'", tr: 'Kıskançlık', level: 'B2', usageNote: 'Soyut isimdir.' },
      { id: 'w_i3', ru: 'Врать', reading: "Vrat'", tr: 'Yalan söylemek', level: 'B2', usageNote: 'Mastar halidir.' },
      { id: 'w_i4', ru: 'Заметила', reading: 'Zamétila', tr: 'Fark etti (dişil)', level: 'B2', usageNote: 'Geçmiş zamanın dişil çekimidir.' },
      { id: 'w_i5', ru: 'Обманывать', reading: "Abmányvat'", tr: 'Aldatmak', level: 'B2', usageNote: 'Süreklilik bildiren fiildir.' },
      { id: 'w_i6', ru: 'Ложь', reading: "Lozh'", tr: 'Yalan', level: 'B2', usageNote: 'Dişil bir isimdir.' }
    ],
    sentences: [
      { ru: 'Как ты мог мне врать?', tr: 'Bana nasıl yalan söyleyebildin?', scrambled: ['врать?', 'мог', 'мне', 'ты', 'Как'], correct: ['Как', 'ты', 'мог', 'мне', 'врать?'] },
      { ru: 'Я всё видела своими глазами.', tr: 'Her şeyi kendi gözlerimle gördüm.', scrambled: ['глазами.', 'своими', 'видела', 'всё', 'Я'], correct: ['Я', 'всё', 'видела', 'своими', 'глазами.'] }
    ],
    sceneTitle: 'Yüzleşme Sahnesi',
    sceneContext: 'İhanetin ortaya çıktığı klasik bir dizi finali sahnesi.',
    dialogue: [
      { speaker: 'Kadın', ru: 'Я знаю про твою измену!', reading: 'Ya znáyu pra tvayú izménu!', tr: 'İhanetini biliyorum!' },
      { speaker: 'Erkek', ru: "Это не то, что ты думаешь.", reading: "Éta nye to, shto ty dúmayesh'.", tr: 'Bu düşündüğün gibi değil.' },
      { speaker: 'Kadın', ru: "Не ври мне больше, хватит лжи!", reading: "Nye vrí mnye ból'she, khvátit lzhi!", tr: 'Bana artık yalan söyleme, yeter yalan!' }
    ]
  },
  {
    id: 'mod_b2_2',
    unitNumber: 42,
    levelGroup: 'B2',
    title: 'Polis Sorgusu',
    description: 'Suç dizilerinde geçen sorgu ve ifade kalıpları',
    category: 'Dizi Sahneleri',
    color: '#475569',
    icon: '🚔',
    grammarExplain: `📌 RESMİ SORGU KALIPLARI:
1. "Где вы были...?" (Gde vy býli...?) -> "Neredeydiniz...?" polis dizilerinin standart sorusudur.
2. "У вас есть алиби?" (U vas yest' álibi?) -> "Alibiniz var mı?" doğrudan Latince/İngilizceden geçmiş bir kelimedir.`,
    words: [
      { id: 'w_pol1', ru: 'Полиция', reading: 'Palítsiya', tr: 'Polis', level: 'B2', usageNote: 'Kurum ismi olarak kullanılır.' },
      { id: 'w_pol2', ru: 'Подозреваемый', reading: 'Padazrivayemiy', tr: 'Şüpheli', level: 'B2', usageNote: 'Eril sıfat-isim formudur.' },
      { id: 'w_pol3', ru: 'Алиби', reading: 'Álibi', tr: 'Alibi', level: 'B2', usageNote: 'Çekimlenmeyen bir kelimedir.' },
      { id: 'w_pol4', ru: 'Доказательство', reading: "Dakazátel'stva", tr: 'Kanıt', level: 'B2', usageNote: 'Orta cinsiyettedir.' },
      { id: 'w_pol5', ru: 'Признание', reading: 'Priznánie', tr: 'İtiraf', level: 'B2', usageNote: 'Orta cinsiyette soyut bir isimdir.' },
      { id: 'w_pol6', ru: 'Задержан', reading: 'Zadérzhan', tr: 'Tutuklandı (erkek)', level: 'B2', usageNote: 'Edilgen sıfat-fiil formudur.' }
    ],
    sentences: [
      { ru: 'Где вы были вчера вечером?', tr: 'Dün akşam neredeydiniz?', scrambled: ['вечером?', 'вчера', 'были', 'вы', 'Где'], correct: ['Где', 'вы', 'были', 'вчера', 'вечером?'] },
      { ru: 'У вас есть доказательства?', tr: 'Kanıtlarınız var mı?', scrambled: ['доказательства?', 'есть', 'У вас'], correct: ['У вас', 'есть', 'доказательства?'] }
    ],
    sceneTitle: 'Sorgu Odası',
    sceneContext: 'Suç dizilerinde tipik bir polis sorgu sahnesi.',
    dialogue: [
      { speaker: 'Komiser', ru: 'Где вы были в момент преступления?', reading: 'Gde vy býli v mómint pristupléniya?', tr: 'Suç anında neredeydiniz?' },
      { speaker: 'Şüpheli', ru: 'Я был дома, один.', reading: 'Ya byl dóma, adín.', tr: 'Evdeydim, yalnızdım.' },
      { speaker: 'Komiser', ru: "У вас есть свидетели?", reading: "U vas yest' svidételi?", tr: 'Tanıklarınız var mı?' }
    ]
  },
  {
    id: 'mod_b2_3',
    unitNumber: 43,
    levelGroup: 'B2',
    title: 'Düğün & Kutlama',
    description: 'Kutlama kalıpları ve Rus düğün gelenekleri',
    category: 'Kültür & Gelenekler',
    color: '#f472b6',
    icon: '💍',
    grammarExplain: `📌 KUTLAMA KALIPLARI:
1. "Поздравляю!" (Pazdravlyáyu!) -> "Tebrikler!" her türlü kutlamada kullanılan evrensel bir kelimedir.
2. "Горько!" (Gór'ka!) -> Rus düğünlerinde gelin-damadı öpüşmeye teşvik etmek için hep bir ağızdan bağırılan geleneksel bir ünlemdir.`,
    words: [
      { id: 'w_w1', ru: 'Свадьба', reading: "Svád'ba", tr: 'Düğün', level: 'B2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_w2', ru: 'Жених', reading: 'Zhenikh', tr: 'Damat', level: 'B2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_w3', ru: 'Невеста', reading: 'Nivésta', tr: 'Gelin', level: 'B2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_w4', ru: 'Поздравляю', reading: 'Pazdravlyáyu', tr: 'Tebrik ederim', level: 'B2', usageNote: 'Birinci tekil şahıs çekimidir.' },
      { id: 'w_w5', ru: 'Горько', reading: "Gór'ka", tr: '(Düğün geleneği ünlemi)', level: 'B2', usageNote: 'Kelime anlamı "acı" demektir; düğünde öpüşme çağrısıdır.' },
      { id: 'w_w6', ru: 'Тост', reading: 'Tost', tr: 'Kadeh kaldırma sözü', level: 'B2', usageNote: 'Kutlamalarda söylenen konuşmadır.' }
    ],
    sentences: [
      { ru: 'Поздравляю вас с свадьбой!', tr: 'Düğününüzü kutlarım!', scrambled: ['свадьбой!', 'с', 'вас', 'Поздравляю'], correct: ['Поздравляю', 'вас', 'с', 'свадьбой!'] },
      { ru: 'Невеста сегодня очень красивая.', tr: 'Gelin bugün çok güzel.', scrambled: ['красивая.', 'очень', 'сегодня', 'Невеста'], correct: ['Невеста', 'сегодня', 'очень', 'красивая.'] }
    ],
    sceneTitle: 'Düğün Salonunda',
    sceneContext: 'Bir dizideki mutlu düğün kutlama sahnesi.',
    dialogue: [
      { speaker: 'Misafir', ru: "Поздравляю вас обоих! Горько!", reading: "Pazdravlyáyu vas abóikh! Gór'ka!", tr: 'İkinizi de tebrik ederim! Öpüşün!' },
      { speaker: 'Damat', ru: 'Спасибо всем, что пришли!', reading: 'Spasíba vsem, shto prishlí!', tr: 'Geldiğiniz için herkese teşekkürler!' }
    ]
  },
  {
    id: 'mod_b2_4',
    unitNumber: 44,
    levelGroup: 'B2',
    title: 'Miras Kavgası',
    description: 'Vasiyet okuma ve aile içi anlaşmazlık kalıpları',
    category: 'Dizi Sahneleri',
    color: '#b91c1c',
    icon: '⚖️',
    grammarExplain: `📌 MİRAS VE AİLE ANLAŞMAZLIĞI KALIPLARI:
1. "Это несправедливо!" (Éta nispravidlíva!) -> "Bu adaletsizlik!" aile içi anlaşmazlıklarda sık kullanılan bir cümledir.
2. "По завещанию" (Pa zavishchániyu) -> "Vasiyete göre" resmi belgelerden bahsederken kullanılır.`,
    words: [
      { id: 'w_mi1', ru: 'Наследство', reading: 'Naslyétstva', tr: 'Miras', level: 'B2', usageNote: 'Orta cinsiyettedir.' },
      { id: 'w_mi2', ru: 'Завещание', reading: 'Zavishchánie', tr: 'Vasiyetname', level: 'B2', usageNote: 'Orta cinsiyettedir.' },
      { id: 'w_mi3', ru: 'Несправедливо', reading: 'Nispravidlíva', tr: 'Adaletsizce', level: 'B2', usageNote: 'Zarf olarak kullanılır.' },
      { id: 'w_mi4', ru: 'Доля', reading: 'Dólya', tr: 'Pay / Hisse', level: 'B2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_mi5', ru: 'Юрист', reading: 'Yuríst', tr: 'Avukat / Hukukçu', level: 'B2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_mi6', ru: 'Спор', reading: 'Spor', tr: 'Anlaşmazlık / Tartışma', level: 'B2', usageNote: 'Eril bir kelimedir.' }
    ],
    sentences: [
      { ru: 'Это несправедливо по отношению ко мне!', tr: 'Bu bana karşı adaletsizlik!', scrambled: ['ко мне!', 'по отношению', 'несправедливо', 'Это'], correct: ['Это', 'несправедливо', 'по отношению', 'ко мне!'] },
      { ru: 'Нам нужен юрист для этого спора.', tr: 'Bu anlaşmazlık için bir avukata ihtiyacımız var.', scrambled: ['спора.', 'для этого', 'юрист', 'нужен', 'Нам'], correct: ['Нам', 'нужен', 'юрист', 'для этого', 'спора.'] }
    ],
    sceneTitle: 'Vasiyet Okuma Sahnesi',
    sceneContext: 'Zengin bir aile büyüğünün vasiyetinin okunduğu klasik dizi sahnesi.',
    dialogue: [
      { speaker: 'Kardeş 1', ru: 'По завещанию всё достаётся тебе?!', reading: 'Pa zavishchániyu vsyo dastayótsya tibyé?!', tr: 'Vasiyete göre her şey sana mı kalıyor?!' },
      { speaker: 'Kardeş 2', ru: 'Я тоже удивлена, честно говоря.', reading: 'Ya tózhe udivlená, chyésna gavarya.', tr: 'Açıkçası ben de şaşırdım.' },
      { speaker: 'Kardeş 1', ru: 'Это несправедливо! Нужен юрист!', reading: 'Éta nispravidlíva! Núzhen yuríst!', tr: 'Bu adaletsizlik! Bir avukat lazım!' }
    ]
  },
  {
    id: 'mod_b2_5',
    unitNumber: 45,
    levelGroup: 'B2',
    title: 'İleri Flört, Kompliman & Reddetme',
    description: 'İlgiyi netleştirme, nazik red, \'sadece arkadaş kalalım\' — yetişkin sohbet',
    category: 'İlişkiler & Flört',
    color: '#e11d48',
    icon: '💘',
    grammarExplain: `📌 NETLİK KALIPLARI:
1. "Мне с тобой легко" (Mne s tabóy lekhkó) olumlu sinyal.
2. "Давай останемся друзьями" nazik ama net reddir.`,
    words: [
      { id: 'w_flb1', ru: 'Химия', reading: 'Khímiya', tr: 'Kimya (aradaki çekim)', level: 'B2', usageNote: 'Mecazi.' },
      { id: 'w_flb2', ru: 'Намекать', reading: 'Namekát\'', tr: 'İma etmek', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_flb3', ru: 'Признаться', reading: 'Priznát\'sya', tr: 'İtiraf etmek', level: 'B2', usageNote: 'Dönüşlü.' },
      { id: 'w_flb4', ru: 'Отшить', reading: 'Atshít\'', tr: 'Reddetmek (argo-ish)', level: 'B2', usageNote: 'Günlük dil.' },
      { id: 'w_flb5', ru: 'Друзьями', reading: 'Druz\'yámi', tr: 'Arkadaş olarak', level: 'B2', usageNote: 'Çoğul araç hali.' },
      { id: 'w_flb6', ru: 'Серьёзно', reading: 'Sir\'yózna', tr: 'Ciddi ciddi', level: 'B2', usageNote: 'Zarf.' },
      { id: 'w_flb7', ru: 'Смущать', reading: 'Smushchát\'', tr: 'Utandırmak', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_flb8', ru: 'Взаимно', reading: 'Vzaímna', tr: 'Karşılıklı', level: 'B2', usageNote: 'Zarf.' }
    ],
    sentences: [
      { ru: 'Мне с тобой легко, это взаимно?', tr: 'Seninle konuşmak kolay, bu karşılıklı mı?', scrambled: ['взаимно?', 'это', 'легко,', 'с тобой', 'Мне'], correct: ['Мне', 'с тобой', 'легко,', 'это', 'взаимно?'] },
      { ru: 'Давай лучше останемся друзьями.', tr: 'En iyisi arkadaş kalalım.', scrambled: ['друзьями.', 'останемся', 'лучше', 'Давай'], correct: ['Давай', 'лучше', 'останемся', 'друзьями.'] }
    ],
    sceneTitle: 'Terasta İtiraf',
    sceneContext: 'Dizi terasında bir tarafın duygusunu açtığı, diğerinin nazikçe sınır koyduğu sahne.',
    dialogue: [
      { speaker: 'Kirill', ru: 'Слушай, мне с тобой легко. Хочу признаться: ты мне нравишься.', reading: 'Slúshay, mne s tabóy lekhkó. Khachú priznát\'sya: ty mne nrávish\'sya.', tr: 'Dinle, seninle olmak kolay. İtiraf edeyim: sen hoşuma gidiyorsun.' },
      { speaker: 'Lena', ru: 'Спасибо. Ты меня не смущай... Но давай останемся друзьями.', reading: 'Spasíba. Ty minyá ne smushcháy... No daváy astánemsya druz\'yámi.', tr: 'Teşekkürler. Beni utandırma... Ama arkadaş kalalım.' },
      { speaker: 'Kirill', ru: 'Понял. Без обид. Серьёзно.', reading: 'Pónyal. Bez abíd. Sir\'yózna.', tr: 'Anladım. Alınganlık yok. Cidden.' },
      { speaker: 'Lena', ru: 'Спасибо, что не обиделся.', reading: 'Spasíba, shto ne abídel\'sya.', tr: 'Alınmadığın için teşekkürler.' }
    ]
  },
  {
    id: 'mod_b2_6',
    unitNumber: 46,
    levelGroup: 'B2',
    title: 'Tartışmayı Yönetmek & Barışmak',
    description: 'Suçlamadan konuşma, \'ben dili\', özür ve sınır — ilişki yetişkinliği',
    category: 'İlişkiler & Flört',
    color: '#be123c',
    icon: '🕊️',
    grammarExplain: `📌 YAPICI TARTIŞMA:
1. "Мне было больно, когда..." kişiye değil davranışa gider.
2. "Давай поговорим спокойно" tempo düşürür.`,
    words: [
      { id: 'w_cf1', ru: 'Обидеться', reading: 'Abídet\'sya', tr: 'Alınmak', level: 'B2', usageNote: 'Dönüşlü.' },
      { id: 'w_cf2', ru: 'Упрекать', reading: 'Uprekát\'', tr: 'Sitem etmek', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_cf3', ru: 'Спокойно', reading: 'Spakóyna', tr: 'Sakin sakin', level: 'B2', usageNote: 'Zarf.' },
      { id: 'w_cf4', ru: 'Компромисс', reading: 'Kampramíss', tr: 'Uzlaşma', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_cf5', ru: 'Граница', reading: 'Granítsa', tr: 'Sınır', level: 'B2', usageNote: 'Dişil, mecazi.' },
      { id: 'w_cf6', ru: 'Простить', reading: 'Prastít\'', tr: 'Affetmek', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_cf7', ru: 'Намеренно', reading: 'Namérenna', tr: 'Kasten', level: 'B2', usageNote: 'Zarf.' },
      { id: 'w_cf8', ru: 'Давай обнимемся', reading: 'Daváy abnímemsya', tr: 'Hadi sarılalım', level: 'B2', usageNote: 'Barış jesti.' }
    ],
    sentences: [
      { ru: 'Давай поговорим спокойно, без упрёков.', tr: 'Sitem etmeden sakin konuşalım.', scrambled: ['упрёков.', 'без', 'спокойно,', 'поговорим', 'Давай'], correct: ['Давай', 'поговорим', 'спокойно,', 'без', 'упрёков.'] },
      { ru: 'Мне было больно, давай найдём компромисс.', tr: 'İncindim, bir uzlaşma bulalım.', scrambled: ['компромисс.', 'найдём', 'давай', 'больно,', 'было', 'Мне'], correct: ['Мне', 'было', 'больно,', 'давай', 'найдём', 'компромисс.'] }
    ],
    sceneTitle: 'Mutfakta Barış',
    sceneContext: 'Kavganın ertesi sabahı iki karakterin özür ve sınır konuşması.',
    dialogue: [
      { speaker: 'Anna', ru: 'Давай поговорим спокойно. Мне было больно вчера.', reading: 'Daváy pagavarím spakóyna. Mne býla ból\'na vcherá.', tr: 'Sakin konuşalım. Dün incindim.' },
      { speaker: 'Pavel', ru: 'Я не хотел упрекать тебя. Это было ненамеренно.', reading: 'Ya ne khatél uprekát\' tibyá. Éta býla nenamérenna.', tr: 'Sitem etmek istemedim. Kasten değildi.' },
      { speaker: 'Anna', ru: 'Мне нужны границы. И компромисс, не молчание.', reading: 'Mne nuzhny granítsy. I kampramíss, ne malchániye.', tr: 'Sınırlara ihtiyacım var. Ve uzlaşma, sessizlik değil.' },
      { speaker: 'Pavel', ru: 'Согласен. Прости. Давай обнимемся.', reading: 'Saglásen. Prastí. Daváy abnímemsya.', tr: 'Katılıyorum. Affet. Hadi sarılalım.' }
    ]
  },
  {
    id: 'mod_b2_7',
    unitNumber: 47,
    levelGroup: 'B2',
    title: 'Maaş Pazarlığı & Zam İsteme',
    description: 'Değerini anlatma, rakam konuşma, \'düşünelim\' cevabını okuma',
    category: 'İş Hayatı',
    color: '#4338ca',
    icon: '💰',
    grammarExplain: `📌 MAAŞ KONUŞMASI:
1. "Я бы хотел обсудить зарплату" resmi açılış.
2. "Рынок" burada 'iş piyasası' demektir.`,
    words: [
      { id: 'w_sl1', ru: 'Повышение', reading: 'Pavyshéniye', tr: 'Zam / Terfi', level: 'B2', usageNote: 'Orta cinsiyet; bağlama göre.' },
      { id: 'w_sl2', ru: 'Обязанности', reading: 'Abyázannasti', tr: 'Sorumluluklar', level: 'B2', usageNote: 'Çoğul.' },
      { id: 'w_sl3', ru: 'Рынок', reading: 'Rýnak', tr: 'Piyasa', level: 'B2', usageNote: 'Maaş araştırması.' },
      { id: 'w_sl4', ru: 'Оклад', reading: 'Aklád', tr: 'Maaş (sabit)', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_sl5', ru: 'Премия', reading: 'Prémiya', tr: 'Prim', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_sl6', ru: 'Обосновать', reading: 'Abasnavát\'', tr: 'Gerekçelendirmek', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_sl7', ru: 'Рассмотреть', reading: 'Rassmatrét\'', tr: 'Değerlendirmek', level: 'B2', usageNote: 'Müdür cevabı.' },
      { id: 'w_sl8', ru: 'Конкурент', reading: 'Kankurént', tr: 'Rakip (firma/aday)', level: 'B2', usageNote: 'Eril.' }
    ],
    sentences: [
      { ru: 'Я бы хотел обсудить повышение оклада.', tr: 'Sabit maaşa zam konusunu konuşmak isterdim.', scrambled: ['оклада.', 'повышение', 'обсудить', 'хотел', 'Я бы'], correct: ['Я бы', 'хотел', 'обсудить', 'повышение', 'оклада.'] },
      { ru: 'Мои обязанности выросли за этот год.', tr: 'Sorumluluklarım bu yıl arttı.', scrambled: ['год.', 'за этот', 'выросли', 'обязанности', 'Мои'], correct: ['Мои', 'обязанности', 'выросли', 'за этот', 'год.'] }
    ],
    sceneTitle: 'Müdür Odası',
    sceneContext: 'Çalışanın zam istediği, müdürün \'değerlendirelim\' dediği gerçekçi sahne.',
    dialogue: [
      { speaker: 'Çalışan', ru: 'Я бы хотел обсудить повышение. Обязанности выросли.', reading: 'Ya by khatél absudít\' pavyshéniye. Abyázannasti výrasli.', tr: 'Zam konuşmak isterdim. Sorumluluklar arttı.' },
      { speaker: 'Müdür', ru: 'Понимаю. Есть цифры с рынка? Чем обоснуете?', reading: 'Panimáyu. Yest\' tsífry s rýnka? Chem abasnuyete?', tr: 'Anlıyorum. Piyasadan rakam var mı? Neyle gerekçelendirirsiniz?' },
      { speaker: 'Çalışan', ru: 'Да. Плюс премия не покрывает переработки.', reading: 'Da. Plyus prémiya ne pakryváyet pererabótki.', tr: 'Evet. Üstelik prim fazla mesaiyi karşılamıyor.' },
      { speaker: 'Müdür', ru: 'Хорошо, рассмотрим до конца месяца.', reading: 'Haraşó, rassmótrim da kantsá mésyatsa.', tr: 'Tamam, ay sonuna kadar değerlendiririz.' }
    ]
  },
  {
    id: 'mod_b2_8',
    unitNumber: 48,
    levelGroup: 'B2',
    title: 'Patronla Çatışma & Geri Bildirim',
    description: 'Haksız eleştiri, savunma, \'yazılı teyit\' isteme',
    category: 'İş Hayatı',
    color: '#3730a3',
    icon: '👔',
    grammarExplain: `📌 GERİ BİLDİRİM:
1. "Давайте обсудим факты" duyguyu değil olayı merkeze alır.
2. "Пришлите, пожалуйста, письмом" yazılı iz bırakır.`,
    words: [
      { id: 'w_fb1', ru: 'Обратная связь', reading: 'Abrátnaya svyaz\'', tr: 'Geri bildirim', level: 'B2', usageNote: 'Sabit ifade.' },
      { id: 'w_fb2', ru: 'Факт', reading: 'Fakt', tr: 'Olgu / Gerçek', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_fb3', ru: 'Ошибиться', reading: 'Ashíbit\'sya', tr: 'Hata yapmak', level: 'B2', usageNote: 'Dönüşlü.' },
      { id: 'w_fb4', ru: 'Срок', reading: 'Srok', tr: 'Süre', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_fb5', ru: 'Письменно', reading: 'Pís\'menna', tr: 'Yazılı olarak', level: 'B2', usageNote: 'Zarf.' },
      { id: 'w_fb6', ru: 'Несправедливо', reading: 'Nispravidlíva', tr: 'Haksızca', level: 'B2', usageNote: 'Zarf.' },
      { id: 'w_fb7', ru: 'Исправить', reading: 'Isprávit\'', tr: 'Düzeltmek', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_fb8', ru: 'Дальше', reading: 'Dál\'she', tr: 'Bundan sonra', level: 'B2', usageNote: 'Zarf.' }
    ],
    sentences: [
      { ru: 'Давайте обсудим факты, а не оценки.', tr: 'Değerlendirmeleri değil olguları konuşalım.', scrambled: ['оценки.', 'а не', 'факты,', 'обсудим', 'Давайте'], correct: ['Давайте', 'обсудим', 'факты,', 'а не', 'оценки.'] },
      { ru: 'Пришлите замечания письменно, пожалуйста.', tr: 'Uyarıları yazılı gönderin lütfen.', scrambled: ['пожалуйста.', 'письменно,', 'замечания', 'Пришлите'], correct: ['Пришлите', 'замечания', 'письменно,', 'пожалуйста.'] }
    ],
    sceneTitle: 'Toplantı Sonrası',
    sceneContext: 'Müdürün herkesin önünde eleştirdiği çalışanın sonra odaya girmesi.',
    dialogue: [
      { speaker: 'Çalışan', ru: 'Давайте обсудим факты. Срок я не срывал.', reading: 'Daváyte absúdim fákty. Srok ya ne sryvál.', tr: 'Olguları konuşalım. Süreyi kaçırmadım.' },
      { speaker: 'Müdür', ru: 'Команда ждала правки. Это обратная связь, не атака.', reading: 'Kamánda zhdála právki. Éta abrátnaya svyaz\', ne atáka.', tr: 'Ekip düzeltmeyi bekledi. Bu geri bildirim, saldırı değil.' },
      { speaker: 'Çalışan', ru: 'Хорошо. Пришлите замечания письменно, я исправлю.', reading: 'Haraşó. Prishlíte zamechániya pís\'menna, ya isprávlyu.', tr: 'Tamam. Uyarıları yazılı atın, düzeltirim.' },
      { speaker: 'Müdür', ru: 'Договорились. Дальше без сюрпризов.', reading: 'Dagavarílis\'. Dál\'she bez syurprízov.', tr: 'Anlaştık. Bundan sonra sürpriz olmasın.' }
    ]
  },
  {
    id: 'mod_b2_9',
    unitNumber: 49,
    levelGroup: 'B2',
    title: 'Film Eleştirisi & Spoiler Kavgası',
    description: 'Konu, oyunculuk, final — film hakkında yetişkin tartışma',
    category: 'Film & Dizi',
    color: '#7e22ce',
    icon: '🎥',
    grammarExplain: `📌 FİLM TARTIŞMASI:
1. "На мой взгляд" (Na moy vzglyad) görüş yumuşatır.
2. "Спойлеры будут" uyarmadan anlatmak kabalıktır.`,
    words: [
      { id: 'w_cr1', ru: 'Режиссёр', reading: 'Rezhissjór', tr: 'Yönetmen', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_cr2', ru: 'Игра актёров', reading: 'Igrá aktyórov', tr: 'Oyunculuk', level: 'B2', usageNote: 'Sabit.' },
      { id: 'w_cr3', ru: 'Финал', reading: 'Finál', tr: 'Final', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_cr4', ru: 'Предсказуемый', reading: 'Predskazúemyy', tr: 'Öngörülebilir', level: 'B2', usageNote: 'Sıfat.' },
      { id: 'w_cr5', ru: 'Глубокий', reading: 'Glubókiy', tr: 'Derin', level: 'B2', usageNote: 'Sıfat.' },
      { id: 'w_cr6', ru: 'Переоценён', reading: 'Pereatsenyon', tr: 'Abartılmış (erkek/orta)', level: 'B2', usageNote: 'Kısa sıfat.' },
      { id: 'w_cr7', ru: 'На мой взгляд', reading: 'Na moy vzglyad', tr: 'Bence / Görüşüme göre', level: 'B2', usageNote: 'Kalıp.' },
      { id: 'w_cr8', ru: 'Стоит посмотреть', reading: 'Stóit pasmatrét\'', tr: 'İzlemeye değer', level: 'B2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'На мой взгляд, финал слишком предсказуемый.', tr: 'Bence final fazla öngörülebilir.', scrambled: ['предсказуемый.', 'слишком', 'финал', 'На мой взгляд,'], correct: ['На мой взгляд,', 'финал', 'слишком', 'предсказуемый.'] },
      { ru: 'Игра актёров сильная, фильм стоит посмотреть.', tr: 'Oyunculuk güçlü, film izlemeye değer.', scrambled: ['посмотреть.', 'стоит', 'фильм', 'сильная,', 'актёров', 'Игра'], correct: ['Игра', 'актёров', 'сильная,', 'фильм', 'стоит', 'посмотреть.'] }
    ],
    sceneTitle: 'Film Çıkışı',
    sceneContext: 'Sinema çıkışında iki arkadaşın filmi yerden yere vurduğu / övdüğü sahne.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'На мой взгляд, финал слабый. Режиссёр переоценил идею.', reading: 'Na moy vzglyad, finál slábyy. Rezhissjór pereatseníl ideyu.', tr: 'Bence final zayıf. Yönetmen fikri abartmış.' },
      { speaker: 'Arkadaş 2', ru: 'Спойлеры! Но игра актёров же глубокая.', reading: 'Spóylery! No igrá aktyórov zhe glubókaya.', tr: 'Spoiler! Ama oyunculuk derin ama.' },
      { speaker: 'Arkadaş 1', ru: 'Согласен. В целом стоит посмотреть, без ожиданий.', reading: 'Saglásen. V tsélom stóit pasmatrét\', bez ozhidániy.', tr: 'Katılıyorum. Genel olarak izlenir, beklentisiz.' },
      { speaker: 'Arkadaş 2', ru: 'Тогда не порть друзьям. Предупреждай.', reading: 'Tagdá ne port\' druz\'yám. Preduprezhdáy.', tr: 'O zaman arkadaşların filmini bozma. Uyar.' }
    ]
  },
  {
    id: 'mod_b2_10',
    unitNumber: 50,
    levelGroup: 'B2',
    title: 'Dizi Karakteri & Teori Üretme',
    description: 'Fan teorisi, karakter gelişimi, \'o aslında...\' sohbetleri',
    category: 'Film & Dizi',
    color: '#6d28d9',
    icon: '🧠',
    grammarExplain: `📌 FAN SOHBETİ:
1. "Мне кажется, он врёт" spekülasyon başlatır.
2. "Аргументируй" şakayla kanıt ister.`,
    words: [
      { id: 'w_th1', ru: 'Теория', reading: 'Teóriya', tr: 'Teori', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_th2', ru: 'Персонаж', reading: 'Personázh', tr: 'Karakter', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_th3', ru: 'Развитие', reading: 'Razvítiye', tr: 'Gelişim', level: 'B2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_th4', ru: 'Мотив', reading: 'Matív', tr: 'Güdü / Motif', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_th5', ru: 'Намеренно', reading: 'Namérenna', tr: 'Kasten', level: 'B2', usageNote: 'Zarf.' },
      { id: 'w_th6', ru: 'Кажется', reading: 'Kázhetsya', tr: 'Gibi geliyor', level: 'B2', usageNote: 'Kişisiz.' },
      { id: 'w_th7', ru: 'Доказать', reading: 'Dakazát\'', tr: 'Kanıtlamak', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_th8', ru: 'Сезон', reading: 'Sezón', tr: 'Sezon', level: 'B2', usageNote: 'Eril.' }
    ],
    sentences: [
      { ru: 'Мне кажется, этот персонаж врёт нам весь сезон.', tr: 'Bence bu karakter bütün sezon yalan söylüyor.', scrambled: ['сезон.', 'весь', 'нам', 'врёт', 'персонаж', 'этот', 'Мне кажется,'], correct: ['Мне кажется,', 'этот', 'персонаж', 'врёт', 'нам', 'весь', 'сезон.'] },
      { ru: 'Интересная теория, но давай докажем мотивами.', tr: 'İlginç teori, ama güdüleriyle kanıtlayalım.', scrambled: ['мотивами.', 'докажем', 'давай', 'но', 'теория,', 'Интересная'], correct: ['Интересная', 'теория,', 'но', 'давай', 'докажем', 'мотивами.'] }
    ],
    sceneTitle: 'Gece Yarısı Teori',
    sceneContext: 'İki fanın bölüm bitince sesli mesajla teori ürettiği sahne.',
    dialogue: [
      { speaker: 'Fan 1', ru: 'Мне кажется, он врёт. Мотив слишком чистый.', reading: 'Mne kázhetsya, on vryot. Matív slíshkam chístyy.', tr: 'Bence yalan söylüyor. Güdüsü fazla temiz.' },
      { speaker: 'Fan 2', ru: 'Теория огонь. Но развитие персонажа пока другое.', reading: 'Teóriya agón\'. No razvítiye personázha paká drugóye.', tr: 'Teori ateş. Ama karakter gelişimi şimdilik başka.' },
      { speaker: 'Fan 1', ru: 'Подожди следующий сезон. Намеренно нас водят.', reading: 'Padazhdí sléduyushchiy sezón. Namérenna nas vódyat.', tr: 'Sonraki sezonu bekle. Bizi kasten oyalıyorlar.' },
      { speaker: 'Fan 2', ru: 'Ладно. Без спойлеров в чате, договорились?', reading: 'Ládna. Bez spóylerov v cháte, dagavarílis\'?', tr: 'Tamam. Sohbette spoiler yok, anlaştık mı?' }
    ]
  },
  {
    id: 'mod_b2_11',
    unitNumber: 51,
    levelGroup: 'B2',
    title: 'Otel, Rezervasyon & Şikâyet',
    description: 'Check-in, gürültülü oda, iade — seyahatte hak arama',
    category: 'Ulaşım & Seyahat',
    color: '#0f766e',
    icon: '🏨',
    grammarExplain: `📌 OTEL DİLİ:
1. "У нас бронь на имя..." rezervasyon açılışı.
2. "Можно переселить?" oda değişimi talebidir.`,
    words: [
      { id: 'w_ht1', ru: 'Бронь', reading: 'Bron\'', tr: 'Rezervasyon', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_ht2', ru: 'Заселение', reading: 'Zaseléniye', tr: 'Check-in', level: 'B2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_ht3', ru: 'Выселение', reading: 'Vyseléniye', tr: 'Check-out', level: 'B2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_ht4', ru: 'Переселить', reading: 'Pereselít\'', tr: 'Başka odaya almak', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_ht5', ru: 'Вид на море', reading: 'Vid na móre', tr: 'Deniz manzarası', level: 'B2', usageNote: 'Kalıp.' },
      { id: 'w_ht6', ru: 'Возврат', reading: 'Vazvrát', tr: 'İade', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_ht7', ru: 'Грязный', reading: 'Gryáznyy', tr: 'Kirli', level: 'B2', usageNote: 'Sıfat.' },
      { id: 'w_ht8', ru: 'Администратор', reading: 'Administrátor', tr: 'Resepsiyon görevlisi', level: 'B2', usageNote: 'Eril.' }
    ],
    sentences: [
      { ru: 'У нас бронь на имя Иванова, можно заселиться?', tr: 'Ivanov adına rezervasyonumuz var, yerleşebilir miyiz?', scrambled: ['заселиться?', 'можно', 'Иванова,', 'на имя', 'бронь', 'У нас'], correct: ['У нас', 'бронь', 'на имя', 'Иванова,', 'можно', 'заселиться?'] },
      { ru: 'Номер грязный, можно переселить нас?', tr: 'Oda kirli, bizi başka odaya alabilir misiniz?', scrambled: ['нас?', 'переселить', 'можно', 'грязный,', 'Номер'], correct: ['Номер', 'грязный,', 'можно', 'переселить', 'нас?'] }
    ],
    sceneTitle: 'Resepsiyon',
    sceneContext: 'Tatil dizisinde rezerve odanın kirli çıkması üzerine tartışma.',
    dialogue: [
      { speaker: 'Misafir', ru: 'Здравствуйте, бронь на имя Соколова. Можно заселиться?', reading: 'Zdrástvuyte, bron\' na ímya Sakólova. Mózhna zaselít\'sya?', tr: 'Merhaba, Sokolov adına rezervasyon. Yerleşebilir miyiz?' },
      { speaker: 'Resepsiyon', ru: 'Да. К сожалению, вид на море только завтра.', reading: 'Da. K sazhaléniyu, vid na móre tól\'ka zavtra.', tr: 'Evet. Maalesef deniz manzarası ancak yarın.' },
      { speaker: 'Misafir', ru: 'И номер грязный. Можно переселить или возврат?', reading: 'I nómer gryáznyy. Mózhna pereselít\' ili vazvrát?', tr: 'Oda da kirli. Başka oda veya iade?' },
      { speaker: 'Resepsiyon', ru: 'Сейчас переселим. Извините за неудобство.', reading: 'Seychás pereselím. Izviníte za neudóbstva.', tr: 'Hemen başka odaya alıyoruz. Rahatsızlık için özür.' }
    ]
  },
  {
    id: 'mod_b2_12',
    unitNumber: 52,
    levelGroup: 'B2',
    title: 'Kaza, Sigorta & İfade',
    description: 'Trafik kazası, polis, sigorta şirketi — panik etmeden kalıplar',
    category: 'Orada Yaşamak',
    color: '#b45309',
    icon: '🚗',
    grammarExplain: `📌 KAZA DİLİ:
1. "Вызовите ГИБДД" trafik polisi.
2. "Оставим европротокол" küçük hasarda.`,
    words: [
      { id: 'w_ac1', ru: 'ДТП', reading: 'De-te-pe', tr: 'Trafik kazası', level: 'B2', usageNote: 'Kısaltma, orta cinsiyet gibi.' },
      { id: 'w_ac2', ru: 'Страховка', reading: 'Strakhófka', tr: 'Sigorta', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_ac3', ru: 'Полис', reading: 'Pólis', tr: 'Poliçe', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_ac4', ru: 'Виновник', reading: 'Vinóvnik', tr: 'Kusurlu taraf', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_ac5', ru: 'Царапина', reading: 'Tsarápina', tr: 'Çizik', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_ac6', ru: 'Европротокол', reading: 'Yevraprotakól', tr: 'Kaza tespit tutanağı', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_ac7', ru: 'Свидетель', reading: 'Svidétel\'', tr: 'Tanık', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_ac8', ru: 'Не волнуйтесь', reading: 'Ne valnúytes\'', tr: 'Endişelenmeyin', level: 'B2', usageNote: 'Resmi teselli.' }
    ],
    sentences: [
      { ru: 'Произошло ДТП, нужна страховка и полис.', tr: 'Kaza oldu, sigorta ve poliçe lazım.', scrambled: ['полис.', 'и', 'страховка', 'нужна', 'ДТП,', 'Произошло'], correct: ['Произошло', 'ДТП,', 'нужна', 'страховка', 'и', 'полис.'] },
      { ru: 'Давайте составим европротокол без споров.', tr: 'Tartışmadan kaza tespit tutanağı tutalım.', scrambled: ['споров.', 'без', 'европротокол', 'составим', 'Давайте'], correct: ['Давайте', 'составим', 'европротокол', 'без', 'споров.'] }
    ],
    sceneTitle: 'Kavşak',
    sceneContext: 'Küçük çarpışma sonrası iki sürücünün sakin kalmaya çalıştığı sahne.',
    dialogue: [
      { speaker: 'Sürücü 1', ru: 'Вы в порядке? Это ДТП, царапина, но давайте спокойно.', reading: 'Vy v paryádke? Éta de-te-pe, tsarápina, no daváyte spakóyna.', tr: 'İyi misiniz? Kaza bu, çizik ama sakin olalım.' },
      { speaker: 'Sürücü 2', ru: 'Да. Виновник я, признаю. Есть полис.', reading: 'Da. Vinóvnik ya, priznayú. Yest\' pólis.', tr: 'Evet. Kusur bende, kabul. Poliçem var.' },
      { speaker: 'Sürücü 1', ru: 'Тогда европротокол. Свидетели есть?', reading: 'Tagdá yevraprotakól. Svidételi yest\'?', tr: 'O zaman tutanak. Tanık var mı?' },
      { speaker: 'Sürücü 2', ru: 'Вон камера. Не волнуйтесь, всё оформим.', reading: 'Von kaméra. Ne valnúytes\', vsyo afórmim.', tr: 'Şurada kamera. Endişelenmeyin, hallederiz.' }
    ]
  },
  {
    id: 'mod_b2_13',
    unitNumber: 53,
    levelGroup: 'B2',
    title: 'İş Arkadaşı Dedikodusu & Sınır',
    description: 'Ofiste sır, \'müdüre gitme\', profesyonel mesafe',
    category: 'İş Hayatı',
    color: '#db2777',
    icon: '🤫',
    grammarExplain: `📌 OFİS SİYASETİ:
1. "Это между нами" sır kapısıdır.
2. "Я в это не лезу" sınır cümlesidir.`,
    words: [
      { id: 'w_gg1', ru: 'Сплетничать', reading: 'Spletníchat\'', tr: 'Dedikodu yapmak', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_gg2', ru: 'Подковёрный', reading: 'Padkavyórnyy', tr: 'Perde arkası', level: 'B2', usageNote: 'Sıfat.' },
      { id: 'w_gg3', ru: 'Донос', reading: 'Danós', tr: 'İhbar', level: 'B2', usageNote: 'Eril, olumsuz.' },
      { id: 'w_gg4', ru: 'Нейтралитет', reading: 'Neytralitét', tr: 'Tarafsızlık', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_gg5', ru: 'Не лезу', reading: 'Ne lezu', tr: 'Karışmıyorum', level: 'B2', usageNote: 'Günlük.' },
      { id: 'w_gg6', ru: 'Репутация', reading: 'Reputátsiya', tr: 'İtibar', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_gg7', ru: 'Осторожно', reading: 'Astarózhna', tr: 'Dikkatli ol', level: 'B2', usageNote: 'Zarf/ünlem.' },
      { id: 'w_gg8', ru: 'Хватит об этом', reading: 'Khvátit ab étam', tr: 'Bu konuyu kapatalım', level: 'B2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Я в подковёрные игры не лезу.', tr: 'Perde arkası oyunlara karışmıyorum.', scrambled: ['лезу.', 'не', 'игры', 'подковёрные', 'в', 'Я'], correct: ['Я', 'в', 'подковёрные', 'игры', 'не', 'лезу.'] },
      { ru: 'Осторожно со сплетнями, это бьёт по репутации.', tr: 'Dedikoduda dikkat, itibarı zedeler.', scrambled: ['репутации.', 'по', 'бьёт', 'это', 'со сплетнями,', 'Осторожно'], correct: ['Осторожно', 'со сплетнями,', 'это', 'бьёт', 'по', 'репутации.'] }
    ],
    sceneTitle: 'Mutfak Köşesi',
    sceneContext: 'Birinin sır vermeye çalıştığı, diğerinin mesafeyi koruduğu ofis sahnesi.',
    dialogue: [
      { speaker: 'Meslektaş', ru: 'Между нами: начальник хочет кого-то убрать.', reading: 'Myézhdu námi: nachál\'nik khóchet kavó-ta ubrát\'.', tr: 'Aramızda: müdür birini tasfiye etmek istiyor.' },
      { speaker: 'Sen', ru: 'Осторожно. Я в это не лезу. Репутация дороже.', reading: 'Astarózhna. Ya v éta ne lezu. Reputátsiya dórózhe.', tr: 'Dikkat. Karışmıyorum. İtibar daha paha biçilmez.' },
      { speaker: 'Meslektaş', ru: 'Ты слишком правильный.', reading: 'Ty slíshkam právil\'nyy.', tr: 'Fazla kuralcısın.' },
      { speaker: 'Sen', ru: 'Может быть. Хватит об этом на работе.', reading: 'Mózhet byt\'. Khvátit ab étam na rabóte.', tr: 'Olabilir. İşte bu konuyu kapatalım.' }
    ]
  },
  {
    id: 'mod_b2_14',
    unitNumber: 54,
    levelGroup: 'B2',
    title: 'Çocuk, Okul & Veli Konuşması',
    description: 'Öğretmenle konuşma, ödev, toplantı — aile hayatı dili',
    category: 'Gündelik Yaşam',
    color: '#ca8a04',
    icon: '🎒',
    grammarExplain: `📌 VELİ DİLİ:
1. "Как он себя ведёт на уроках?" davranış sorusu.
2. "Давайте держать связь" işbirliği teklifi.`,
    words: [
      { id: 'w_sc1', ru: 'Учитель', reading: 'Uchítel\'', tr: 'Öğretmen (erkek)', level: 'B2', usageNote: 'Dişil: учительница.' },
      { id: 'w_sc2', ru: 'Домашнее задание', reading: 'Damáshneye zadániye', tr: 'Ödev', level: 'B2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_sc3', ru: 'Поведение', reading: 'Pavedéniye', tr: 'Davranış', level: 'B2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_sc4', ru: 'Родительское собрание', reading: 'Radítel\'skoye sabrániye', tr: 'Veli toplantısı', level: 'B2', usageNote: 'Kalıp.' },
      { id: 'w_sc5', ru: 'Оценка', reading: 'Atsénka', tr: 'Not', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_sc6', ru: 'Прогуливать', reading: 'Pragúlivat\'', tr: 'Kırmak (ders)', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_sc7', ru: 'Старается', reading: 'Staráyetsya', tr: 'Çabalıyor', level: 'B2', usageNote: '3. tekil.' },
      { id: 'w_sc8', ru: 'Держать связь', reading: 'Derzhát\' svyaz\'', tr: 'İletişimde kalmak', level: 'B2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Как он себя ведёт на уроках?', tr: 'Derste nasıl davranıyor?', scrambled: ['на уроках?', 'ведёт', 'себя', 'он', 'Как'], correct: ['Как', 'он', 'себя', 'ведёт', 'на уроках?'] },
      { ru: 'Давайте держать связь по домашним заданиям.', tr: 'Ödevler konusunda iletişimde kalalım.', scrambled: ['заданиям.', 'домашним', 'по', 'связь', 'держать', 'Давайте'], correct: ['Давайте', 'держать', 'связь', 'по', 'домашним', 'заданиям.'] }
    ],
    sceneTitle: 'Öğretmen Görüşmesi',
    sceneContext: 'Velinin öğretmenle çocuğun notları hakkında konuştuğu sahne.',
    dialogue: [
      { speaker: 'Veli', ru: 'Здравствуйте. Как он себя ведёт? Оценки просели.', reading: 'Zdrástvuyte. Kak on sebyá vedyót? Atsénki praséli.', tr: 'Merhaba. Nasıl davranıyor? Notlar düştü.' },
      { speaker: 'Öğretmen', ru: 'Старается, но прогуливал два раза. Домашнее задание неровное.', reading: 'Staráyetsya, no pragúlival dva ráza. Damáshneye zadániye neróvnoye.', tr: 'Çabalıyor ama iki kez kırdı. Ödev dengesiz.' },
      { speaker: 'Veli', ru: 'Поняла. Давайте держать связь. Собрание когда?', reading: 'Panyalá. Daváyte derzhát\' svyaz\'. Sabrániye kagdá?', tr: 'Anladım. İletişimde kalalım. Toplantı ne zaman?' },
      { speaker: 'Öğretmen', ru: 'В четверг в шесть. Спасибо, что пришли.', reading: 'V chitvérk v shest\'. Spasíba, shto prishlí.', tr: 'Perşembe saat altıda. Geldiğiniz için teşekkürler.' }
    ]
  },
  {
    id: 'mod_b2_15',
    unitNumber: 55,
    levelGroup: 'B2',
    title: 'Tanışma Uygulaması Sohbeti',
    description: 'İlk mesaj, espri, buluşma teklifi, ghosting\'e cevap',
    category: 'İlişkiler & Flört',
    color: '#f43f5e',
    icon: '📱',
    grammarExplain: `📌 UYGULAMA DİLİ:
1. "Давай созвонимся" yazışmayı sese taşır.
2. "Если не интересно — так и скажи" netlik ister.`,
    words: [
      { id: 'w_ap1', ru: 'Анкета', reading: 'Ankéta', tr: 'Profil', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_ap2', ru: 'Лайк', reading: 'Layk', tr: 'Beğeni', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_ap3', ru: 'Переписка', reading: 'Perepíska', tr: 'Yazışma', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_ap4', ru: 'Созвониться', reading: 'Sazvanít\'sya', tr: 'Telefonla konuşmak', level: 'B2', usageNote: 'Dönüşlü.' },
      { id: 'w_ap5', ru: 'Пропал', reading: 'Prapál', tr: 'Ortadan kayboldu (erkek)', level: 'B2', usageNote: 'Ghosting.' },
      { id: 'w_ap6', ru: 'Искренне', reading: 'Ískrenne', tr: 'İçtenlikle', level: 'B2', usageNote: 'Zarf.' },
      { id: 'w_ap7', ru: 'Без игр', reading: 'Bez igr', tr: 'Oyun yok', level: 'B2', usageNote: 'Kalıp.' },
      { id: 'w_ap8', ru: 'Живая встреча', reading: 'Zhiváya vstrécha', tr: 'Yüz yüze buluşma', level: 'B2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Давай созвонимся, переписка уже странная.', tr: 'Hadi telefonlaşalım, yazışma artık garip.', scrambled: ['странная.', 'уже', 'переписка', 'созвонимся,', 'Давай'], correct: ['Давай', 'созвонимся,', 'переписка', 'уже', 'странная.'] },
      { ru: 'Если не интересно, так и скажи, без игр.', tr: 'İlgin yoksa öyle söyle, oyun olmasın.', scrambled: ['игр.', 'без', 'скажи,', 'так и', 'не интересно,', 'Если'], correct: ['Если', 'не интересно,', 'так и', 'скажи,', 'без', 'игр.'] }
    ],
    sceneTitle: 'Sohbet Ekranı',
    sceneContext: 'Uygulamada üç gündür cevap gelmeyince atılan net mesaj sahnesi.',
    dialogue: [
      { speaker: 'Misha', ru: 'Привет. Твоя анкета искренняя. Давай лучше живую встречу.', reading: 'Privét. Tvayá ankéta ískrennyaya. Daváy lúchshe zhivúyu vstréchu.', tr: 'Selam. Profilin içten duruyor. Yüz yüze daha iyi.' },
      { speaker: 'Katya', ru: 'Можно. Сначала созвонимся? Не люблю долгую переписку.', reading: 'Mózhna. Snachála sazvanímsya? Ne lyublyú dólguyu perepísku.', tr: 'Olur. Önce telefonlaşalım mı? Uzun yazışma sevmem.' },
      { speaker: 'Misha', ru: 'Ок. Если не интересно — так и скажи, без игр.', reading: 'Ok. Yesli ne interesna — tak i skazhí, bez igr.', tr: 'Tamam. İlgin yoksa öyle söyle, oyun yok.' },
      { speaker: 'Katya', ru: 'Интересно. Завтра вечером напишу слот.', reading: 'Interesna. Zavtra vécheram napishú slot.', tr: 'İlgim var. Yarın akşam saat yazarım.' }
    ]
  },
  {
    id: 'mod_b2_16',
    unitNumber: 56,
    levelGroup: 'B2',
    title: 'Haber, Söylenti & \'Duydun mu\'',
    description: 'Şehirde olan biten, kaynak sorma, abartıyı kesme',
    category: 'Gündelik Sohbet',
    color: '#0284c7',
    icon: '🗞️',
    grammarExplain: `📌 HABER SOHBETİ:
1. "Откуда инфа?" kaynak sorar (günlük).
2. "Не будем раздувать" abartıyı keser.`,
    words: [
      { id: 'w_nw1', ru: 'Новость', reading: 'Nóvost\'', tr: 'Haber', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_nw2', ru: 'Источник', reading: 'Istóchnik', tr: 'Kaynak', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_nw3', ru: 'Слух', reading: 'Slukh', tr: 'Söylenti', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_nw4', ru: 'Подтвердить', reading: 'Padtverdít\'', tr: 'Teyit etmek', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_nw5', ru: 'Раздувать', reading: 'Razduvát\'', tr: 'Abartmak / Şişirmek', level: 'B2', usageNote: 'Mastar.' },
      { id: 'w_nw6', ru: 'Срочно', reading: 'Sróchna', tr: 'Acil / Breaking', level: 'B2', usageNote: 'Zarf.' },
      { id: 'w_nw7', ru: 'По факту', reading: 'Pa faktu', tr: 'Aslında / Fiilen', level: 'B2', usageNote: 'Kalıp.' },
      { id: 'w_nw8', ru: 'Не уверен', reading: 'Ne uvérin', tr: 'Emin değilim (erkek)', level: 'B2', usageNote: 'Dişil: не уверена.' }
    ],
    sentences: [
      { ru: 'Ты слышал новость или это просто слух?', tr: 'Haberi duydun mu yoksa bu sadece söylenti mi?', scrambled: ['слух?', 'просто', 'это', 'или', 'новость', 'слышал', 'Ты'], correct: ['Ты', 'слышал', 'новость', 'или', 'это', 'просто', 'слух?'] },
      { ru: 'Давай не будем раздувать, пока нет источника.', tr: 'Kaynak yokken abartmayalım.', scrambled: ['источника.', 'нет', 'пока', 'раздувать,', 'не будем', 'Давай'], correct: ['Давай', 'не будем', 'раздувать,', 'пока', 'нет', 'источника.'] }
    ],
    sceneTitle: 'Mutfak Tezgâhı',
    sceneContext: 'İki komşunun şehirdeki bir olayı konuşurken teyit aradığı sahne.',
    dialogue: [
      { speaker: 'Komşu 1', ru: 'Ты слышал? Срочная новость по району.', reading: 'Ty slýshal? Sróchnaya nóvost\' pa rayónu.', tr: 'Duydun mu? Semtte acil haber.' },
      { speaker: 'Komşu 2', ru: 'Откуда источник? По факту я не уверен.', reading: 'Atkúda istóchnik? Pa faktu ya ne uvérin.', tr: 'Kaynak nerede? Aslında emin değilim.' },
      { speaker: 'Komşu 1', ru: 'Пока слух. Надо подтвердить.', reading: 'Paká slukh. Náda padtverdít\'.', tr: 'Şimdilik söylenti. Teyit lazım.' },
      { speaker: 'Komşu 2', ru: 'Тогда не раздуваем. Ладно?', reading: 'Tagdá ne razduváyem. Ládna?', tr: 'O zaman şişirmeyelim. Tamam mı?' }
    ]
  },
  {
    id: 'mod_b2_17',
    unitNumber: 57,
    levelGroup: 'B2',
    title: 'Konser, Bilet & Kapı Önü',
    description: 'Bilet satışı, kuyruk, \'içeri alırlar mı\' — eğlence hayatı',
    category: 'Gündelik Yaşam',
    color: '#c026d3',
    icon: '🎤',
    grammarExplain: `📌 KONSER:
1. "Электронный билет на телефоне" kapıda yeter.
2. "Фейс-контроль" bazı mekânlarda vardır.`,
    words: [
      { id: 'w_cn1', ru: 'Концерт', reading: 'Kantsért', tr: 'Konser', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_cn2', ru: 'Очередь', reading: 'Óchered\'', tr: 'Kuyruk', level: 'B2', usageNote: 'Dişil.' },
      { id: 'w_cn3', ru: 'Электронный билет', reading: 'Elektrónnyy bilyét', tr: 'E-bilet', level: 'B2', usageNote: 'Kalıp.' },
      { id: 'w_cn4', ru: 'Фейс-контроль', reading: 'Feys-kantról\'', tr: 'Kapı seçimi', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_cn5', ru: 'Открытие', reading: 'Atkrýtiye', tr: 'Açılış (kapılar)', level: 'B2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_cn6', ru: 'Запрещено', reading: 'Zapreshchenó', tr: 'Yasak', level: 'B2', usageNote: 'Kişisiz.' },
      { id: 'w_cn7', ru: 'Гардероб', reading: 'Garderob', tr: 'Vestiyer', level: 'B2', usageNote: 'Eril.' },
      { id: 'w_cn8', ru: 'Аншлаг', reading: 'Anshlag', tr: 'Tükenmiş / Full house', level: 'B2', usageNote: 'Eril.' }
    ],
    sentences: [
      { ru: 'Электронный билет на телефоне подойдёт?', tr: 'Telefondaki e-bilet yeterli olur mu?', scrambled: ['подойдёт?', 'на телефоне', 'билет', 'Электронный'], correct: ['Электронный', 'билет', 'на телефоне', 'подойдёт?'] },
      { ru: 'Верхнюю одежду сдаём в гардероб.', tr: 'Montu vestiyere bırakıyoruz.', scrambled: ['гардероб.', 'в', 'сдаём', 'одежду', 'Верхнюю'], correct: ['Верхнюю', 'одежду', 'сдаём', 'в', 'гардероб.'] }
    ],
    sceneTitle: 'Kapı Önü Kuyruk',
    sceneContext: 'Konser kapısında biletin QR\'ının okunmadığı gerilimli sahne.',
    dialogue: [
      { speaker: 'Görevli', ru: 'Билет покажите. Электронный на телефоне ок.', reading: 'Bilyét pakazhíte. Elektrónnyy na telefóne ok.', tr: 'Bileti gösterin. Telefondaki e-bilet olur.' },
      { speaker: 'Sen', ru: 'Вот. Аншлаг, да? Очередь огромная.', reading: 'Vot. Anshlag, da? Óchered\' agrómnaya.', tr: 'Buyurun. Tükendi değil mi? Kuyruk kocaman.' },
      { speaker: 'Görevli', ru: 'Да. Верхнюю одежду в гардероб. Сумки проверяем.', reading: 'Da. Věrkhnyuyu adézhdu v garderób. Súmki praveryáyem.', tr: 'Evet. Montu vestiyere. Çantaları kontrol ediyoruz.' },
      { speaker: 'Sen', ru: 'Понял. Во сколько открытие?', reading: 'Pónyal. Vo skól\'ka atkrýtiye?', tr: 'Anladım. Açılış saat kaçta?' }
    ]
  },
  {
    id: 'mod_c1_1',
    unitNumber: 58,
    levelGroup: 'C1/C2',
    title: 'Deyimler ve Argo',
    description: 'Dizilerde ve günlük hayatta duyulan deyimler, argo ifadeler',
    category: 'İleri Düzey Dil',
    color: '#a855f7',
    icon: '🗣️',
    grammarExplain: `📌 GÜNLÜK DEYİMLER:
1. "Вешать лапшу на уши" (Véshat' lapshú na úshi) kelimesi kelimesine "kulağa erişte asmak" demektir; aslında "yalan söylemek / kandırmak" anlamına gelir.
2. Argoda "Блин!" (Blin!) hafif bir küfür yerine kullanılan, "Kahretsin!" anlamına gelen zararsız bir ünlemdir.`,
    words: [
      { id: 'w_arg1', ru: 'Блин!', reading: 'Blin!', tr: 'Kahretsin! (hafif)', level: 'C1/C2', usageNote: 'Argo; kaba bir küfrün yumuşatılmış halidir.' },
      { id: 'w_arg2', ru: 'Круто', reading: 'Krúta', tr: 'Havalı / Süper', level: 'C1/C2', usageNote: 'Gençler arasında sık kullanılan argo bir kelimedir.' },
      { id: 'w_arg3', ru: 'Вешать лапшу', reading: "Véshat' lapshú", tr: 'Kandırmak (deyim)', level: 'C1/C2', usageNote: 'Deyimsel bir ifadedir.' },
      { id: 'w_arg4', ru: 'Отвали', reading: 'Atvalí', tr: 'Siktir git (kaba argo)', level: 'C1/C2', usageNote: 'Çok kaba bir ifadedir, dikkatli kullanılmalıdır.' },
      { id: 'w_arg5', ru: 'Забей', reading: 'Zabéy', tr: 'Boşver', level: 'C1/C2', usageNote: 'Argo; "unut gitsin" anlamındadır.' },
      { id: 'w_arg6', ru: 'Тусовка', reading: 'Tusófka', tr: 'Parti / Buluşma (argo)', level: 'C1/C2', usageNote: 'Gençlik jargonunda sık geçer.' }
    ],
    sentences: [
      { ru: 'Не вешай мне лапшу на уши.', tr: 'Beni kandırmaya çalışma.', scrambled: ['уши.', 'на', 'лапшу', 'мне', 'Не', 'вешай'], correct: ['Не', 'вешай', 'мне', 'лапшу', 'на', 'уши.'] },
      { ru: 'Забей, это не важно.', tr: 'Boşver, önemli değil.', scrambled: ['важно.', 'не', 'это', 'Забей,'], correct: ['Забей,', 'это', 'не', 'важно.'] }
    ],
    sceneTitle: 'Arkadaşlar Arası Muhabbet',
    sceneContext: 'Gençlik dizisinde samimi bir arkadaş sohbeti sahnesi.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'Блин, я опять опоздал!', reading: "Blin, ya apyát' apazdál!", tr: 'Kahretsin, yine geç kaldım!' },
      { speaker: 'Arkadaş 2', ru: 'Забей, никто не заметил.', reading: 'Zabéy, niktó nye zamétil.', tr: 'Boşver, kimse fark etmedi.' },
      { speaker: 'Arkadaş 1', ru: 'Это было очень круто вчера!', reading: "Éta býla óchen' krúta vcherá.", tr: 'Dün gerçekten çok havalıydı!' }
    ]
  },
  {
    id: 'mod_c1_2',
    unitNumber: 59,
    levelGroup: 'C1/C2',
    title: 'Ayrılık Sahnesi',
    description: 'İleri düzey duygu ifadeleri ve şart kipi kullanımı',
    category: 'Dizi Sahneleri',
    color: '#64748b',
    icon: '😢',
    grammarExplain: `📌 İLERİ DÜZEY DUYGU İFADESİ:
1. "Мы должны расстаться" (My dalzhný rasstát'sya) -> "Ayrılmalıyız" cümlesi ayrılık sahnelerinin klasik kalıbıdır.
2. Şart kipi "Если бы..." (Yesli by...) -> "Eğer ... olsaydı" pişmanlık ifade etmek için kullanılır.`,
    words: [
      { id: 'w_br1', ru: "Расстаться", reading: "Rasstát'sya", tr: 'Ayrılmak', level: 'C1/C2', usageNote: 'Dönüşlü mastar formudur.' },
      { id: 'w_br2', ru: 'Пусто', reading: 'Pústa', tr: 'Boş (hissi)', level: 'C1/C2', usageNote: 'Mecazi anlamda kullanılabilir.' },
      { id: 'w_br3', ru: 'Скучать', reading: "Skuchát'", tr: 'Özlemek', level: 'C1/C2', usageNote: '"По тебе" ile birlikte kullanılır: Скучать по тебе.' },
      { id: 'w_br4', ru: 'Забыть', reading: "Zabýt'", tr: 'Unutmak', level: 'C1/C2', usageNote: 'Mastar halidir.' },
      { id: 'w_br5', ru: 'Навсегда', reading: 'Navsigdá', tr: 'Sonsuza dek', level: 'C1/C2', usageNote: 'Zarf olarak kullanılır.' },
      { id: 'w_br6', ru: 'Одиночество', reading: 'Adinóchestva', tr: 'Yalnızlık', level: 'C1/C2', usageNote: 'Soyut, orta cinsiyette bir isimdir.' }
    ],
    sentences: [
      { ru: 'Я думаю, нам нужно расстаться.', tr: 'Sanırım ayrılmamız gerekiyor.', scrambled: ['расстаться.', 'нужно', 'нам', 'думаю,', 'Я'], correct: ['Я', 'думаю,', 'нам', 'нужно', 'расстаться.'] },
      { ru: 'Я никогда тебя не забуду.', tr: 'Seni asla unutmayacağım.', scrambled: ['забуду.', 'не', 'тебя', 'никогда', 'Я'], correct: ['Я', 'никогда', 'тебя', 'не', 'забуду.'] }
    ],
    sceneTitle: 'Son Konuşma',
    sceneContext: 'Dizinin en dramatik sahnelerinden biri — yağmur altında bir sokak.',
    dialogue: [
      { speaker: 'Kadın', ru: 'Я думаю, нам нужно расстаться.', reading: "Ya dúmayu, nam núzhna rasstát'sya.", tr: 'Sanırım ayrılmamız gerekiyor.' },
      { speaker: 'Erkek', ru: 'Пожалуйста, не делай этого.', reading: 'Pazhálusta, nye délay étava.', tr: 'Lütfen, bunu yapma.' },
      { speaker: 'Kadın', ru: "Прощай. Я буду скучать по тебе.", reading: "Prashcháy. Ya búdu skuchát' pa tibyé.", tr: 'Hoşça kal. Seni özleyeceğim.' }
    ]
  },
  {
    id: 'mod_c1_3',
    unitNumber: 60,
    levelGroup: 'C1/C2',
    title: 'Mahkeme Sahnesi',
    description: 'Resmi hukuk dili ve duruşma salonu kalıpları',
    category: 'İleri Düzey Dil',
    color: '#7c3aed',
    icon: '🏛️',
    grammarExplain: `📌 RESMİ HUKUK DİLİ:
1. "Ваша честь" (Vásha chest') -> "Sayın Hakim" hitap şeklidir, İngilizce "Your Honor" ifadesinin birebir çevirisidir.
2. "Прошу отклонить возражение" (Prashú atklanít' vazrazhénie) -> "İtirazın reddini talep ediyorum" ileri düzey hukuk jargonudur.`,
    words: [
      { id: 'w_ct1', ru: 'Суд', reading: 'Sud', tr: 'Mahkeme', level: 'C1/C2', usageNote: 'Eril bir kelimedir.' },
      { id: 'w_ct2', ru: 'Судья', reading: "Sud'yá", tr: 'Hakim', level: 'C1/C2', usageNote: 'Eril veya dişil olabilir.' },
      { id: 'w_ct3', ru: 'Обвинение', reading: 'Abvinyénie', tr: 'İddia / Suçlama', level: 'C1/C2', usageNote: 'Orta cinsiyettedir.' },
      { id: 'w_ct4', ru: 'Защита', reading: 'Zashchíta', tr: 'Savunma', level: 'C1/C2', usageNote: 'Dişil bir kelimedir.' },
      { id: 'w_ct5', ru: 'Возражение', reading: 'Vazrazhénie', tr: 'İtiraz', level: 'C1/C2', usageNote: 'Orta cinsiyettedir.' },
      { id: 'w_ct6', ru: 'Приговор', reading: 'Prigavór', tr: 'Hüküm / Karar', level: 'C1/C2', usageNote: 'Eril bir kelimedir.' }
    ],
    sentences: [
      { ru: 'Ваша честь, у меня есть возражение.', tr: 'Sayın Hakim, bir itirazım var.', scrambled: ['возражение.', 'есть', 'у меня', 'Ваша честь,'], correct: ['Ваша честь,', 'у меня', 'есть', 'возражение.'] },
      { ru: 'Суд удаляется для вынесения приговора.', tr: 'Mahkeme karar vermek için çekiliyor.', scrambled: ['приговора.', 'для вынесения', 'удаляется', 'Суд'], correct: ['Суд', 'удаляется', 'для вынесения', 'приговора.'] }
    ],
    sceneTitle: 'Mahkeme Salonunda',
    sceneContext: 'Hukuk dizilerinde klasik bir duruşma sahnesi.',
    dialogue: [
      { speaker: 'Avukat', ru: 'Ваша честь, прошу отклонить возражение.', reading: "Vásha chest', prashú atklanít' vazrazhénie.", tr: 'Sayın Hakim, itirazın reddini talep ediyorum.' },
      { speaker: 'Hakim', ru: 'Возражение отклонено. Продолжайте.', reading: 'Vazrazhénie atklanyóna. Pradalzháyte.', tr: 'İtiraz reddedildi. Devam edin.' },
      { speaker: 'Avukat', ru: "Спасибо, Ваша честь.", reading: "Spasíba, Vásha chest'.", tr: 'Teşekkür ederim, Sayın Hakim.' }
    ]
  },
  {
    id: 'mod_c1_4',
    unitNumber: 61,
    levelGroup: 'C1/C2',
    title: 'İroni, Kinaye & Alt Metin',
    description: 'Söylenenle kastedileni ayırma — dizilerde ve gerçek hayatta ileri dinleme',
    category: 'İleri Düzey Dil',
    color: '#7c3aed',
    icon: '🎭',
    grammarExplain: `📌 İRONİ:
1. Rusçada alay çoğu zaman tonlamayla gelir; kelimeler kibar, ses iğneleyicidir.
2. "Ну да, конечно" (Nu da, kanyéshna) evet gibi durur, aslında inanmamaktır.`,
    words: [
      { id: 'w_ir1', ru: 'Ирония', reading: 'Iróniya', tr: 'İroni', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_ir2', ru: 'Сарказм', reading: 'Sarkázm', tr: 'Alay / Sarkazm', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_ir3', ru: 'Намёк', reading: 'Namyók', tr: 'İma', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_ir4', ru: 'Буквально', reading: 'Bukvál\'na', tr: 'Kelimesi kelimesine', level: 'C1/C2', usageNote: 'Zarf.' },
      { id: 'w_ir5', ru: 'Между строк', reading: 'Myézhdu strok', tr: 'Satır aralarında', level: 'C1/C2', usageNote: 'Kalıp.' },
      { id: 'w_ir6', ru: 'Ну да, конечно', reading: 'Nu da, kanyéshna', tr: 'Tabii tabii (alaylı)', level: 'C1/C2', usageNote: 'Kalıp.' },
      { id: 'w_ir7', ru: 'Как же', reading: 'Kak zhe', tr: 'Yok artık / Hadi canım', level: 'C1/C2', usageNote: 'Alaylı.' },
      { id: 'w_ir8', ru: 'Тон', reading: 'Ton', tr: 'Ton / Ses tonu', level: 'C1/C2', usageNote: 'Eril.' }
    ],
    sentences: [
      { ru: 'Это была ирония, не бери буквально.', tr: 'Bu ironiydi, kelimesi kelimesine alma.', scrambled: ['буквально.', 'бери', 'не', 'ирония,', 'была', 'Это'], correct: ['Это', 'была', 'ирония,', 'не', 'бери', 'буквально.'] },
      { ru: 'Читай между строк, тон всё выдаёт.', tr: 'Satır aralarını oku, ton her şeyi ele verir.', scrambled: ['выдаёт.', 'всё', 'тон', 'между строк,', 'Читай'], correct: ['Читай', 'между строк,', 'тон', 'всё', 'выдаёт.'] }
    ],
    sceneTitle: 'Alaylı Tebrik',
    sceneContext: 'Dizide bir karakterin \'tebrik\'inin aslında iğne olduğu sahne.',
    dialogue: [
      { speaker: 'Kolya', ru: 'Ну да, конечно, ты опять \'случайно\' опоздал.', reading: 'Nu da, kanyéshna, ty apyát\' \'slucháyna\' apazdál.', tr: 'Tabii tabii, yine \'tesadüfen\' geç kaldın.' },
      { speaker: 'Oleg', ru: 'Это сарказм? Я правда в пробке стоял.', reading: 'Éta sarkázm? Ya právda v próbke stayál.', tr: 'Bu alay mı? Gerçekten trafikteydim.' },
      { speaker: 'Kolya', ru: 'Читай между строк. Намёк был мягкий.', reading: 'Chitáy myézhdu strok. Namyók byl myágkiy.', tr: 'Satır aralarını oku. İma yumuşaktı.' },
      { speaker: 'Oleg', ru: 'Понял. В следующий раз без иронии, ладно?', reading: 'Pónyal. V sléduyushchiy raz bez irónii, ládna?', tr: 'Anladım. Bir dahakine ironisiz, olur mu?' }
    ]
  },
  {
    id: 'mod_c1_5',
    unitNumber: 62,
    levelGroup: 'C1/C2',
    title: 'Sunum, İtiraz & Toplantı Dominansı',
    description: 'Sunum dili, itiraz, \'bu riskli\' — işte ileri resmi konuşma',
    category: 'İş Hayatı',
    color: '#4c1d95',
    icon: '📊',
    grammarExplain: `📌 SUNUM DİLİ:
1. "Позвольте уточнить" söz kesmeden müdahaledir.
2. "С точки зрения рисков" itirazı rasyonelleştirir.`,
    words: [
      { id: 'w_pr1', ru: 'Презентация', reading: 'Prezentátsiya', tr: 'Sunum', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_pr2', ru: 'Тезис', reading: 'Tézis', tr: 'Tez / Ana iddia', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_pr3', ru: 'Риск', reading: 'Risk', tr: 'Risk', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_pr4', ru: 'Позвольте', reading: 'Pazvól\'te', tr: 'İzin verin', level: 'C1/C2', usageNote: 'Kibar söz alma.' },
      { id: 'w_pr5', ru: 'Возразить', reading: 'Vazrazít\'', tr: 'İtiraz etmek', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_pr6', ru: 'Данные', reading: 'Dánnye', tr: 'Veriler', level: 'C1/C2', usageNote: 'Çoğul.' },
      { id: 'w_pr7', ru: 'Вывод', reading: 'Vývad', tr: 'Sonuç (çıkarım)', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_pr8', ru: 'С точки зрения', reading: 'S tóchki zréniya', tr: '... açısından', level: 'C1/C2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Позвольте уточнить тезис по данным.', tr: 'Verilere göre tezi netleştirmeme izin verin.', scrambled: ['данным.', 'по', 'тезис', 'уточнить', 'Позвольте'], correct: ['Позвольте', 'уточнить', 'тезис', 'по', 'данным.'] },
      { ru: 'С точки зрения рисков вывод спорный.', tr: 'Risk açısından sonuç tartışmalı.', scrambled: ['спорный.', 'вывод', 'рисков', 'С точки зрения'], correct: ['С точки зрения', 'рисков', 'вывод', 'спорный.'] }
    ],
    sceneTitle: 'Yönetim Kurulu',
    sceneContext: 'Sunumun ortasında kibar ama sert bir itiraz sahnesi.',
    dialogue: [
      { speaker: 'Sunumcu', ru: 'Итак, вывод: запускаем в следующем квартале.', reading: 'Itak, vývad: zapuskáyem v sléduyushchem kvartále.', tr: 'Öyleyse sonuç: gelecek çeyrekte başlatıyoruz.' },
      { speaker: 'Müdür', ru: 'Позвольте возразить. С точки зрения рисков данных мало.', reading: 'Pazvól\'te vazrazít\'. S tóchki zréniya rískov dánnykh mála.', tr: 'İtiraz etme izni. Risk açısından veri az.' },
      { speaker: 'Sunumcu', ru: 'Тезис опирается на пилот. Могу показать слайд.', reading: 'Tézis apiráyetsya na pilót. Magú pakazát\' slayd.', tr: 'Tez pilot çalışmaya dayanıyor. Slaytı gösterebilirim.' },
      { speaker: 'Müdür', ru: 'Покажите. Без эмоций, только факты.', reading: 'Pakazhíte. Bez emótsiy, tól\'ka fákty.', tr: 'Gösterin. Duygusuz, sadece olgular.' }
    ]
  },
  {
    id: 'mod_c1_6',
    unitNumber: 63,
    levelGroup: 'C1/C2',
    title: 'İlişkide Ultimatom & Şart Kipi',
    description: 'Pişmanlık, şart, \'bundan sonra yok\' — dizi finali kalıpları',
    category: 'Dizi Sahneleri',
    color: '#334155',
    icon: '⚡',
    grammarExplain: `📌 ŞART VE ULTİMATOM:
1. "Если бы ты сказал раньше..." pişmanlık.
2. "Либо..., либо..." net seçim dayatır.`,
    words: [
      { id: 'w_ul1', ru: 'Ультиматум', reading: 'Ul\'timátum', tr: 'Ültimatom', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_ul2', ru: 'Если бы', reading: 'Yesli by', tr: 'Eğer ... olsaydı', level: 'C1/C2', usageNote: 'Şart kipi.' },
      { id: 'w_ul3', ru: 'Либо', reading: 'Líba', tr: 'Ya ... ya da', level: 'C1/C2', usageNote: 'Bağlaç.' },
      { id: 'w_ul4', ru: 'Терпеть', reading: 'Terpét\'', tr: 'Katlanmak', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_ul5', ru: 'Достоинство', reading: 'Dastóinstva', tr: 'Onur / Haysiyet', level: 'C1/C2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_ul6', ru: 'Выбор', reading: 'Výbar', tr: 'Seçim', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_ul7', ru: 'Поздно', reading: 'Pózdna', tr: 'Geç', level: 'C1/C2', usageNote: 'Zarf.' },
      { id: 'w_ul8', ru: 'Клясться', reading: 'Klyast\'sya', tr: 'Yemin etmek', level: 'C1/C2', usageNote: 'Dönüşlü mastar.' }
    ],
    sentences: [
      { ru: 'Если бы ты сказал раньше, всё было бы иначе.', tr: 'Daha önce söyleseydin her şey başka olurdu.', scrambled: ['иначе.', 'было бы', 'всё', 'раньше,', 'сказал', 'ты', 'Если бы'], correct: ['Если бы', 'ты', 'сказал', 'раньше,', 'всё', 'было бы', 'иначе.'] },
      { ru: 'Либо мы меняемся, либо я ухожу.', tr: 'Ya değişiriz ya da ben giderim.', scrambled: ['ухожу.', 'я', 'либо', 'меняемся,', 'мы', 'Либо'], correct: ['Либо', 'мы', 'меняемся,', 'либо', 'я', 'ухожу.'] }
    ],
    sceneTitle: 'Kapı Eşiği',
    sceneContext: 'Karakterin bavulu elinde ültimatom verdiği dizi sahnesi.',
    dialogue: [
      { speaker: 'Irina', ru: 'Если бы ты сказал раньше, я бы не терпела столько.', reading: 'Yesli by ty skazál rán\'she, ya by ne terpéla stól\'ka.', tr: 'Daha önce söyleseydin bu kadar katlanmazdım.' },
      { speaker: 'Denis', ru: 'Я клянусь, это больше не повторится.', reading: 'Ya klyanús\', éta ból\'she ne pavtóritsya.', tr: 'Yemin ederim, bu bir daha olmayacak.' },
      { speaker: 'Irina', ru: 'Либо терапия и честность, либо я ухожу. Выбор за тобой.', reading: 'Líba terapíya i chéstnost\', líba ya ukhazhú. Výbar za tabóy.', tr: 'Ya terapi ve dürüstlük, ya ben giderim. Seçim sende.' },
      { speaker: 'Denis', ru: 'Поздно для пустых слов. Я выбираю нас.', reading: 'Pózdna dlya pústykh slov. Ya vybiráyu nas.', tr: 'Boş söz için geç. Sizi/bizi seçiyorum.' }
    ]
  },
  {
    id: 'mod_c1_7',
    unitNumber: 64,
    levelGroup: 'C1/C2',
    title: 'İstifa, Referans & Çıkış Görüşmesi',
    description: 'İstifa mektubu dili, \'neden gidiyorsun\', köprüleri yakmama',
    category: 'İş Hayatı',
    color: '#1e3a8a',
    icon: '📤',
    grammarExplain: `📌 İSTİFA DİLİ:
1. "Хочу предупредить за две недели" yasal/nezaket payı.
2. "Это не про конфликт, а про рост" yumuşak gerekçe.`,
    words: [
      { id: 'w_rsn1', ru: 'Уволиться', reading: 'Uvólit\'sya', tr: 'İstifa etmek / İşten ayrılmak', level: 'C1/C2', usageNote: 'Dönüşlü.' },
      { id: 'w_rsn2', ru: 'Заявление', reading: 'Zayavlyénie', tr: 'Dilekçe', level: 'C1/C2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_rsn3', ru: 'Отработка', reading: 'Atrabótka', tr: 'İhbar süresi çalışma', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_rsn4', ru: 'Рекомендация', reading: 'Rekomendátsiya', tr: 'Referans', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_rsn5', ru: 'Корпоративная культура', reading: 'Karparatívnaya kul\'túra', tr: 'Şirket kültürü', level: 'C1/C2', usageNote: 'Kalıp.' },
      { id: 'w_rsn6', ru: 'Рост', reading: 'Rost', tr: 'Gelişim / Büyüme', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_rsn7', ru: 'Без обид', reading: 'Bez abíd', tr: 'Alınganlık olmadan', level: 'C1/C2', usageNote: 'Kalıp.' },
      { id: 'w_rsn8', ru: 'Передать дела', reading: 'Peredát\' delá', tr: 'İşi devretmek', level: 'C1/C2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Хочу уволиться и предупредить за две недели.', tr: 'Ayrılmak ve iki hafta önceden haber vermek istiyorum.', scrambled: ['недели.', 'за две', 'предупредить', 'и', 'уволиться', 'Хочу'], correct: ['Хочу', 'уволиться', 'и', 'предупредить', 'за две', 'недели.'] },
      { ru: 'Это не про конфликт, а про профессиональный рост.', tr: 'Bu çatışma değil, mesleki gelişimle ilgili.', scrambled: ['рост.', 'профессиональный', 'а про', 'конфликт,', 'не про', 'Это'], correct: ['Это', 'не про', 'конфликт,', 'а про', 'профессиональный', 'рост.'] }
    ],
    sceneTitle: 'Çıkış Görüşmesi',
    sceneContext: 'Çalışanın müdüre istifa ettiğini söylediği olgun sahne.',
    dialogue: [
      { speaker: 'Çalışan', ru: 'Хочу подать заявление. Отработка — две недели.', reading: 'Khachú padát\' zayavlyénie. Atrabótka — dve nedéli.', tr: 'Dilekçe vermek istiyorum. İhbar süresi iki hafta.' },
      { speaker: 'Müdür', ru: 'Почему? Конфликт?', reading: 'Pachimú? Kanflíkt?', tr: 'Neden? Çatışma mı?' },
      { speaker: 'Çalışan', ru: 'Нет. Это про рост. Без обид. Могу передать дела.', reading: 'Nyet. Éta pra rost. Bez abíd. Magú peredát\' delá.', tr: 'Hayır. Gelişimle ilgili. Alınganlık yok. İşi devredebilirim.' },
      { speaker: 'Müdür', ru: 'Жаль. Рекомендацию напишем. Удачи.', reading: 'Zhal\'. Rekomendátsiyu napíshem. Udáchi.', tr: 'Yazık. Referansı yazarız. Bol şans.' }
    ]
  },
  {
    id: 'mod_c1_8',
    unitNumber: 65,
    levelGroup: 'C1/C2',
    title: 'Şikâyet Dilekçesi & Tüketici Hakları',
    description: 'İade, kusurlu ürün, \'tüketici olarak talep ediyorum\'',
    category: 'Orada Yaşamak',
    color: '#0f766e',
    icon: '📝',
    grammarExplain: `📌 TÜKETİCİ DİLİ:
1. "Требую возврат денежных средств" resmi talep.
2. "На основании закона о защите прав потребителей" güç katar.`,
    words: [
      { id: 'w_cm1', ru: 'Претензия', reading: 'Pretenziya', tr: 'İhtar / Şikâyet yazısı', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_cm2', ru: 'Возврат', reading: 'Vazvrát', tr: 'İade', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_cm3', ru: 'Недостаток', reading: 'Nedastátak', tr: 'Kusur', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_cm4', ru: 'Чек', reading: 'Chek', tr: 'Fiş / Çek', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_cm5', ru: 'Потребитель', reading: 'Patrebítel\'', tr: 'Tüketici', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_cm6', ru: 'Требую', reading: 'Trébuyu', tr: 'Talep ediyorum', level: 'C1/C2', usageNote: '1. tekil.' },
      { id: 'w_cm7', ru: 'На основании', reading: 'Na asnavánii', tr: '... temelinde', level: 'C1/C2', usageNote: 'Kalıp.' },
      { id: 'w_cm8', ru: 'Срок рассмотрения', reading: 'Srok rassmotréniya', tr: 'İnceleme süresi', level: 'C1/C2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Требую возврат на основании чека и претензии.', tr: 'Fiş ve ihtar temelinde iade talep ediyorum.', scrambled: ['претензии.', 'и', 'чека', 'на основании', 'возврат', 'Требую'], correct: ['Требую', 'возврат', 'на основании', 'чека', 'и', 'претензии.'] },
      { ru: 'У товара недостаток, срок рассмотрения — десять дней.', tr: 'Üründe kusur var, inceleme süresi on gün.', scrambled: ['дней.', 'десять', '—', 'рассмотрения', 'срок', 'недостаток,', 'У товара'], correct: ['У товара', 'недостаток,', 'срок', 'рассмотрения', '—', 'десять', 'дней.'] }
    ],
    sceneTitle: 'Mağaza Müdürlüğü',
    sceneContext: 'Kusurlu telefonu iade ettirmeye çalışan karakterin resmi ama gergin sahnesi.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Пишу претензию. У телефона недостаток, вот чек.', reading: 'Pishú pretenziyu. U telefóna nedastátak, vot chek.', tr: 'İhtar yazıyorum. Telefonda kusur var, fiş burada.' },
      { speaker: 'Müdür', ru: 'Срок рассмотрения — десять дней. Можем ремонт.', reading: 'Srok rassmotréniya — désyat\' dney. Mózhem remónt.', tr: 'İnceleme on gün. Tamir yapabiliriz.' },
      { speaker: 'Müşteri', ru: 'Требую возврат как потребитель, не ремонт.', reading: 'Trébuyu vazvrát kak patrebítel\', ne remónt.', tr: 'Tüketici olarak iade istiyorum, tamir değil.' },
      { speaker: 'Müdür', ru: 'Хорошо, зафиксируем. Деньги после проверки.', reading: 'Haraşó, zafiksíruyem. Dén\'gi pósle pravérki.', tr: 'Tamam, kayıt altına alıyoruz. Para kontrolden sonra.' }
    ]
  },
  {
    id: 'mod_c1_9',
    unitNumber: 66,
    levelGroup: 'C1/C2',
    title: 'Parti, Networking & Tanıtım Cümlesi',
    description: 'Kendini 20 saniyede anlatma, kartvizit, \'sonra yazalım\'',
    category: 'İş Hayatı',
    color: '#6d28d9',
    icon: '🥂',
    grammarExplain: `📌 NETWORKİNG:
1. "Чем вы занимаетесь?" açılış sorusu.
2. "Давайте обменяемся контактами" kapanış.`,
    words: [
      { id: 'w_nt1', ru: 'Нетворкинг', reading: 'Netvórking', tr: 'Networking', level: 'C1/C2', usageNote: 'Eril, ödünç.' },
      { id: 'w_nt2', ru: 'Сфера', reading: 'Sféra', tr: 'Alan / Sektör', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_nt3', ru: 'Визитка', reading: 'Vizítka', tr: 'Kartvizit', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_nt4', ru: 'Обменяться', reading: 'Abminyát\'sya', tr: 'Takas etmek', level: 'C1/C2', usageNote: 'Dönüşlü.' },
      { id: 'w_nt5', ru: 'Кратко', reading: 'Krátka', tr: 'Kısaca', level: 'C1/C2', usageNote: 'Zarf.' },
      { id: 'w_nt6', ru: 'Сотрудничество', reading: 'Sotrúdnichestva', tr: 'İşbirliği', level: 'C1/C2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_nt7', ru: 'Наслышан', reading: 'Naslýshan', tr: 'Duymuşluğum var (erkek)', level: 'C1/C2', usageNote: 'Dişil: наслышана.' },
      { id: 'w_nt8', ru: 'Будем на связи', reading: 'Búdem na svyazí', tr: 'İletişimde kalırız', level: 'C1/C2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Чем вы занимаетесь? Давайте кратко.', tr: 'Ne işle uğraşıyorsunuz? Kısaca konuşalım.', scrambled: ['кратко.', 'Давайте', 'занимаетесь?', 'вы', 'Чем'], correct: ['Чем', 'вы', 'занимаетесь?', 'Давайте', 'кратко.'] },
      { ru: 'Давайте обменяемся визитками и будем на связи.', tr: 'Kartvizit değişelim ve iletişimde kalalım.', scrambled: ['на связи.', 'будем', 'и', 'визитками', 'обменяемся', 'Давайте'], correct: ['Давайте', 'обменяемся', 'визитками', 'и', 'будем', 'на связи.'] }
    ],
    sceneTitle: 'Kokteyl',
    sceneContext: 'İş yemeğinde iki yabancının kendini tanıttığı sahne.',
    dialogue: [
      { speaker: 'Misafir 1', ru: 'Наслышан о вашей сфере. Чем занимаетесь сейчас?', reading: 'Naslýshan a váshay sfére. Chem zanimáetes\' seychás?', tr: 'Sizin alandan duymuşluğum var. Şu an ne yapıyorsunuz?' },
      { speaker: 'Misafir 2', ru: 'Кратко: продукт и партнёры. Ищу сотрудничество.', reading: 'Krátka: pradúkt i partnyóry. Ishchú sotrúdnichestva.', tr: 'Kısaca: ürün ve ortaklar. İşbirliği arıyorum.' },
      { speaker: 'Misafir 1', ru: 'Интересно. Давайте обменяемся визитками.', reading: 'Interesna. Daváyte abmenyáyemsya vizítkami.', tr: 'İlginç. Kartvizit değişelim.' },
      { speaker: 'Misafir 2', ru: 'Конечно. Будем на связи на неделе.', reading: 'Kanyéshna. Búdem na svyazí na nedéle.', tr: 'Tabii. Hafta içinde yazışırız.' }
    ]
  },
  {
    id: 'mod_c1_10',
    unitNumber: 67,
    levelGroup: 'C1/C2',
    title: 'Yabancı Olarak Yaşamak & Kimlik',
    description: 'Aksan, \'nerelisin\', aidiyet, \'burada kalıcı mısın\' soruları',
    category: 'Orada Yaşamak',
    color: '#0ea5e9',
    icon: '🌍',
    grammarExplain: `📌 KİMLİK SOHBETİ:
1. "Я живу здесь уже два года" yerleşikliği anlatır.
2. "Иногда чувствую себя чужим" dürüst duygudur.`,
    words: [
      { id: 'w_id1', ru: 'Акцент', reading: 'Atsént', tr: 'Aksan', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_id2', ru: 'Чужой', reading: 'Chuzhóy', tr: 'Yabancı / El', level: 'C1/C2', usageNote: 'Sıfat.' },
      { id: 'w_id3', ru: 'Привыкнуть', reading: 'Privýknut\'', tr: 'Alışmak', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_id4', ru: 'Интеграция', reading: 'Integrátsiya', tr: 'Entegrasyon', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_id5', ru: 'Ностальгия', reading: 'Nastal\'gíya', tr: 'Nostalji', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_id6', ru: 'Постоянно', reading: 'Pastayánna', tr: 'Kalıcı / Sürekli', level: 'C1/C2', usageNote: 'Zarf.' },
      { id: 'w_id7', ru: 'Обжиться', reading: 'Abzhít\'sya', tr: 'Yerleşmek / Yuva kurmak', level: 'C1/C2', usageNote: 'Dönüşlü.' },
      { id: 'w_id8', ru: 'Свой-чужой', reading: 'Svoy-chuzhóy', tr: 'İçeriden-dışarıdan', level: 'C1/C2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Я живу здесь постоянно уже два года.', tr: 'Burada kalıcı olarak iki yıldır yaşıyorum.', scrambled: ['года.', 'два', 'уже', 'постоянно', 'здесь', 'живу', 'Я'], correct: ['Я', 'живу', 'здесь', 'постоянно', 'уже', 'два', 'года.'] },
      { ru: 'Иногда чувствую себя чужим, но уже обжился.', tr: 'Bazen kendimi yabancı hissediyorum ama artık yerleştim.', scrambled: ['обжился.', 'уже', 'но', 'чужим,', 'себя', 'чувствую', 'Иногда'], correct: ['Иногда', 'чувствую', 'себя', 'чужим,', 'но', 'уже', 'обжился.'] }
    ],
    sceneTitle: 'Mutfakta Çay',
    sceneContext: 'Yerel birinin \'ne zaman dönüyorsun\' diye sorması üzerine dürüst cevap.',
    dialogue: [
      { speaker: 'Yerel', ru: 'Ты с акцентом, но уже как свой. Надолго?', reading: 'Ty s atséntam, no uzhé kak svoy. Nadolga?', tr: 'Aksanın var ama artık içeriden gibisin. Uzun süre mi?' },
      { speaker: 'Sen', ru: 'Живу постоянно. Иногда ностальгия, но я обжился.', reading: 'Zhivú pastayánna. Inagdá nastal\'gíya, no ya abzhílsya.', tr: 'Kalıcı yaşıyorum. Bazen nostalji oluyor ama yerleştim.' },
      { speaker: 'Yerel', ru: 'Интеграция — это не только язык, это привычка.', reading: 'Integrátsiya — éta ne tól\'ka yazýk, éta privýchka.', tr: 'Entegrasyon sadece dil değil, alışkanlık.' },
      { speaker: 'Sen', ru: 'Согласен. Чужим себя чувствую реже.', reading: 'Saglásen. Chuzhím sebyá chústvuyu rézhe.', tr: 'Katılıyorum. Kendimi yabancı hissetmem azaldı.' }
    ]
  },
  {
    id: 'mod_c1_11',
    unitNumber: 68,
    levelGroup: 'C1/C2',
    title: 'Şarkı, Replik & \'Bu Sahne Ne Anlatıyor\'',
    description: 'Mecaz, alt metin, \'yönetmen şunu demek istedi\' — kültürel sohbet',
    category: 'Film & Dizi',
    color: '#9333ea',
    icon: '🎼',
    grammarExplain: `📌 KÜLTÜREL YORUM:
1. "Это метафора" yüzey anlamı aşar.
2. "Саундтрек усиливает сцену" analiz cümlesidir.`,
    words: [
      { id: 'w_cl1', ru: 'Метафора', reading: 'Metáfora', tr: 'Mecaz', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_cl2', ru: 'Подтекст', reading: 'Padtékst', tr: 'Alt metin', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_cl3', ru: 'Атмосфера', reading: 'Atmósfera', tr: 'Atmosfer', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_cl4', ru: 'Культовый', reading: 'Kul\'tóvyy', tr: 'Kült', level: 'C1/C2', usageNote: 'Sıfat.' },
      { id: 'w_cl5', ru: 'Цитата', reading: 'Tsitáta', tr: 'Alıntı / Replik', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_cl6', ru: 'Усиливать', reading: 'Usílivat\'', tr: 'Güçlendirmek', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_cl7', ru: 'Трактовать', reading: 'Traktavát\'', tr: 'Yorumlamak', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_cl8', ru: 'Шедевр', reading: 'Shedevr', tr: 'Şaheser', level: 'C1/C2', usageNote: 'Eril.' }
    ],
    sentences: [
      { ru: 'Эта цитата — метафора, не буквальный смысл.', tr: 'Bu replik mecaz, yüzey anlam değil.', scrambled: ['смысл.', 'буквальный', 'не', 'метафора,', '—', 'цитата', 'Эта'], correct: ['Эта', 'цитата', '—', 'метафора,', 'не', 'буквальный', 'смысл.'] },
      { ru: 'Саундтрек усиливает атмосферу всей сцены.', tr: 'Müzik tüm sahnenin atmosferini güçlendiriyor.', scrambled: ['сцены.', 'всей', 'атмосферу', 'усиливает', 'Саундтрек'], correct: ['Саундтрек', 'усиливает', 'атмосферу', 'всей', 'сцены.'] }
    ],
    sceneTitle: 'Film Sonrası Çay',
    sceneContext: 'İki kişinin kült bir sahneyi yorumladığı sohbet.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'Эта сцена — шедевр. Подтекст про одиночество.', reading: 'Éta stséna — shedevr. Padtékst pra adinóchestva.', tr: 'Bu sahne şaheser. Alt metin yalnızlık.' },
      { speaker: 'Arkadaş 2', ru: 'Я трактую иначе: это про выбор, не про боль.', reading: 'Ya traktúyu ináche: éta pra výbar, ne pra bol\'.', tr: 'Ben başka yorumluyorum: acı değil seçim.' },
      { speaker: 'Arkadaş 1', ru: 'Метафора держит оба смысла. Цитата культовая.', reading: 'Metáfora dérzhit óba smýsla. Tsitáta kul\'tóvaya.', tr: 'Mecaz iki anlamı da taşıyor. Replik kült.' },
      { speaker: 'Arkadaş 2', ru: 'И музыка усиливает. Пересмотрим без телефона.', reading: 'I múzyka usílivayet. Peresmótrim bez telefóna.', tr: 'Müzik de güçlendiriyor. Telefonsuz yeniden izleyelim.' }
    ]
  },
  {
    id: 'mod_c1_12',
    unitNumber: 69,
    levelGroup: 'C1/C2',
    title: 'Duygu Sözlüğü: Terapi & Sınır',
    description: 'Kaygı, tükenmişlik, \'hayır diyebilmek\' — yetişkin duygusal dil',
    category: 'İleri Düzey Dil',
    color: '#0369a1',
    icon: '🧠',
    grammarExplain: `📌 DUYGU DİLİ:
1. "Я выгораю" (Ya vygoráyu) tükenmişlik.
2. "Мне нужно пространство" sınır talebidir.`,
    words: [
      { id: 'w_em1', ru: 'Тревога', reading: 'Trevóga', tr: 'Kaygı', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_em2', ru: 'Выгорание', reading: 'Vygarániye', tr: 'Tükenmişlik', level: 'C1/C2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_em3', ru: 'Границы', reading: 'Granítsy', tr: 'Sınırlar', level: 'C1/C2', usageNote: 'Çoğul.' },
      { id: 'w_em4', ru: 'Пространство', reading: 'Prostránstva', tr: 'Alan / Mesafe', level: 'C1/C2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_em5', ru: 'Подавленный', reading: 'Padávlennyy', tr: 'Bastırılmış / Çökkün', level: 'C1/C2', usageNote: 'Sıfat.' },
      { id: 'w_em6', ru: 'Осознавать', reading: 'Asaznavát\'', tr: 'Farkına varmak', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_em7', ru: 'Поддержка', reading: 'Paddérzhka', tr: 'Destek', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_em8', ru: 'Мне тяжело', reading: 'Mne tizheló', tr: 'Bana zor geliyor', level: 'C1/C2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Я осознаю тревогу, мне нужно пространство.', tr: 'Kaygının farkındayım, alana ihtiyacım var.', scrambled: ['пространство.', 'нужно', 'мне', 'тревогу,', 'осознаю', 'Я'], correct: ['Я', 'осознаю', 'тревогу,', 'мне', 'нужно', 'пространство.'] },
      { ru: 'Это не слабость, мне нужна поддержка.', tr: 'Bu zayıflık değil, desteğe ihtiyacım var.', scrambled: ['поддержка.', 'нужна', 'мне', 'слабость,', 'не', 'Это'], correct: ['Это', 'не', 'слабость,', 'мне', 'нужна', 'поддержка.'] }
    ],
    sceneTitle: 'Gece Konuşması',
    sceneContext: 'İki yakın arkadaşın yorgunluk ve sınır hakkında konuştuğu sahne.',
    dialogue: [
      { speaker: 'Sasha', ru: 'Мне тяжело. Выгорание уже не шутка.', reading: 'Mne tizheló. Vygarániye uzhé ne shútka.', tr: 'Bana zor. Tükenmişlik artık şaka değil.' },
      { speaker: 'Nina', ru: 'Я рядом. Какие границы тебе нужны?', reading: 'Ya ryádom. Kakíye granítsy tibé nuzhny?', tr: 'Yanındayım. Hangi sınırlara ihtiyacın var?' },
      { speaker: 'Sasha', ru: 'Пространство и меньше ожиданий. Тревога душит.', reading: 'Prostránstva i mén\'she ozhidániy. Trevóga dushít.', tr: 'Alan ve daha az beklenti. Kaygı boğuyor.' },
      { speaker: 'Nina', ru: 'Ок. Поддержка без давления. Ты не слабый.', reading: 'Ok. Paddérzhka bez davléniya. Ty ne slábyy.', tr: 'Tamam. Baskısız destek. Zayıf değilsin.' }
    ]
  },
  {
    id: 'mod_c1_13',
    unitNumber: 70,
    levelGroup: 'C1/C2',
    title: 'Pazarlık Ustası: Pazar & Hizmet',
    description: 'Fiyat kırma, toptan, \'başka yerde daha ucuz\' — ileri pazarlık',
    category: 'Gündelik Yaşam',
    color: '#15803d',
    icon: '🪙',
    grammarExplain: `📌 İLERİ PAZARLIK:
1. "Сделайте цену" doğrudan indirim isteği.
2. "Если возьму оптом" toptan kozudur.`,
    words: [
      { id: 'w_bg1', ru: 'Торговаться', reading: 'Targavát\'sya', tr: 'Pazarlık etmek', level: 'C1/C2', usageNote: 'Dönüşlü.' },
      { id: 'w_bg2', ru: 'Оптом', reading: 'Óptam', tr: 'Toptan', level: 'C1/C2', usageNote: 'Zarf.' },
      { id: 'w_bg3', ru: 'Последняя цена', reading: 'Paslédnyaya tsená', tr: 'Son fiyat', level: 'C1/C2', usageNote: 'Kalıp.' },
      { id: 'w_bg4', ru: 'Накинуть', reading: 'Nakínut\'', tr: 'Üstüne koymak (fiyat)', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_bg5', ru: 'Уступить', reading: 'Ustupít\'', tr: 'Taviz vermek / İndirmek', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_bg6', ru: 'Качество', reading: 'Káchestva', tr: 'Kalite', level: 'C1/C2', usageNote: 'Orta cinsiyet.' },
      { id: 'w_bg7', ru: 'Конкуренты', reading: 'Kankurénty', tr: 'Rakipler', level: 'C1/C2', usageNote: 'Çoğul.' },
      { id: 'w_bg8', ru: 'По рукам', reading: 'Pa rukám', tr: 'Anlaştık / El sıkıştık', level: 'C1/C2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Если возьму оптом, уступите в цене?', tr: 'Toptan alırsam fiyatta taviz verir misiniz?', scrambled: ['в цене?', 'уступите', 'оптом,', 'возьму', 'Если'], correct: ['Если', 'возьму', 'оптом,', 'уступите', 'в цене?'] },
      { ru: 'Последняя цена — и по рукам.', tr: 'Son fiyat — ve anlaştık.', scrambled: ['по рукам.', 'и', '—', 'цена', 'Последняя'], correct: ['Последняя', 'цена', '—', 'и', 'по рукам.'] }
    ],
    sceneTitle: 'Pazar Tezgâhı',
    sceneContext: 'Deneyimli bir alıcının satıcıyı nazikçe köşeye sıkıştırdığı sahne.',
    dialogue: [
      { speaker: 'Alıcı', ru: 'Качество ок, но конкуренты дешевле. Уступите?', reading: 'Káchestva ok, no kankurénty deshévle. Ustupíte?', tr: 'Kalite tamam ama rakipler daha ucuz. İndirir misiniz?' },
      { speaker: 'Satıcı', ru: 'Могу чуть. Если оптом — ещё скину.', reading: 'Magú chut\'. Yesli óptam — yeshchó skínu.', tr: 'Biraz yapabilirim. Toptansa bir daha inerim.' },
      { speaker: 'Alıcı', ru: 'Беру три. Последняя цена какая?', reading: 'Berú tri. Paslédnyaya tsená kakáya?', tr: 'Üç alıyorum. Son fiyat ne?' },
      { speaker: 'Satıcı', ru: 'Вот так. По рукам.', reading: 'Vot tak. Pa rukám.', tr: 'Böyle. Anlaştık.' }
    ]
  },
  {
    id: 'mod_c1_14',
    unitNumber: 71,
    levelGroup: 'C1/C2',
    title: 'Gençlik Jargonu & İnternet Dili',
    description: 'Chat, meme, \'кринж\', \'имба\' — dizilerde duyulan internet Rusçası',
    category: 'İleri Düzey Dil',
    color: '#a21caf',
    icon: '💻',
    grammarExplain: `📌 İNTERNET JARGONU:
1. Bu kelimeler resmi ortamda kullanılmaz; arkadaş sohbeti ve yorumlardır.
2. "Кринж" utanç verici şey; "Имба" aşırı güçlü/haksız avantaj.`,
    words: [
      { id: 'w_in1', ru: 'Кринж', reading: 'Krinzh', tr: 'Utanç verici durum (jargon)', level: 'C1/C2', usageNote: 'Eril, ödünç.' },
      { id: 'w_in2', ru: 'Имба', reading: 'Ímba', tr: 'Aşırı OP / haksız güçlü', level: 'C1/C2', usageNote: 'Dişil jargon.' },
      { id: 'w_in3', ru: 'Рофл', reading: 'Rofl', tr: 'Kahkaha / dalga', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_in4', ru: 'Зашквар', reading: 'Zashkvár', tr: 'Rezillik / yerin dibine girme', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_in5', ru: 'Чилить', reading: 'Chílit\'', tr: 'Takılmak / rahatlamak', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_in6', ru: 'Стрим', reading: 'Strim', tr: 'Canlı yayın', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_in7', ru: 'Хайп', reading: 'Hayp', tr: 'Hype / gündem', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_in8', ru: 'Понял принял', reading: 'Pónyal prinyál', tr: 'Anladım kabul ettim', level: 'C1/C2', usageNote: 'Kalıp.' }
    ],
    sentences: [
      { ru: 'Это был кринж, давай без зашквара.', tr: 'Bu utançtı, rezillik olmasın.', scrambled: ['зашквара.', 'без', 'давай', 'кринж,', 'был', 'Это'], correct: ['Это', 'был', 'кринж,', 'давай', 'без', 'зашквара.'] },
      { ru: 'Сегодня чилим и смотрим стрим, без хайпа.', tr: 'Bugün takılıp yayın izliyoruz, hypesiz.', scrambled: ['хайпа.', 'без', 'стрим,', 'смотрим', 'и', 'чилим', 'Сегодня'], correct: ['Сегодня', 'чилим', 'и', 'смотрим', 'стрим,', 'без', 'хайпа.'] }
    ],
    sceneTitle: 'Sesli Sohbet',
    sceneContext: 'İki gencin yayın sonrası jargonla konuştuğu sahne — resmi dilde kullanılmaz.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'Блин, тот момент — кринж. Прям зашквар.', reading: 'Blin, tot mamént — krinzh. Pryam zashkvár.', tr: 'Kahretsin, o an utançtı. Resmen rezillik.' },
      { speaker: 'Arkadaş 2', ru: 'Рофл, да. Но бой имба, хайп заслуженный.', reading: 'Rofl, da. No boy ímba, hayp zaslúzhennyy.', tr: 'Kahkaha evet. Ama dövüş OP, hype haklı.' },
      { speaker: 'Arkadaş 1', ru: 'Ладно, чилим. Стрим ещё идёт?', reading: 'Ládna, chílim. Strim yeshchó idyot?', tr: 'Tamam, takılalım. Yayın hâlâ var mı?' },
      { speaker: 'Arkadaş 2', ru: 'Да. Понял принял, кидаю ссылку.', reading: 'Da. Pónyal prinyál, kidáyu ssýlku.', tr: 'Evet. Anladım kabul, link atıyorum.' }
    ]
  },
  {
    id: 'mod_c1_15',
    unitNumber: 72,
    levelGroup: 'C1/C2',
    title: 'Haber Analizi & Görüş Savunma',
    description: 'Kaynak, önyargı, \'bence abartılıyor\' — olgun tartışma',
    category: 'İleri Düzey Dil',
    color: '#1d4ed8',
    icon: '📰',
    grammarExplain: `📌 TARTIŞMA ETIĞİ:
1. "Давай отделим факты от оценок" olgun tartışmanın temelidir.
2. "У меня другая оптика" görüş ayrılığını kişiselleştirmeden söyler.`,
    words: [
      { id: 'w_an1', ru: 'Предвзятость', reading: 'Predvzyátost\'', tr: 'Önyargı', level: 'C1/C2', usageNote: 'Dişil.' },
      { id: 'w_an2', ru: 'Оптика', reading: 'Óptika', tr: 'Bakış açısı', level: 'C1/C2', usageNote: 'Dişil, mecazi.' },
      { id: 'w_an3', ru: 'Контекст', reading: 'Kantékst', tr: 'Bağlam', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_an4', ru: 'Преувеличивать', reading: 'Preuvelíchivat\'', tr: 'Abartmak', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_an5', ru: 'Нюанс', reading: 'Nyuáns', tr: 'Nüans', level: 'C1/C2', usageNote: 'Eril.' },
      { id: 'w_an6', ru: 'Согласиться', reading: 'Saglasít\'sya', tr: 'Katılmak / Razı olmak', level: 'C1/C2', usageNote: 'Dönüşlü.' },
      { id: 'w_an7', ru: 'Поспорить', reading: 'Paspórit\'', tr: 'Tartışmak (nazik)', level: 'C1/C2', usageNote: 'Mastar.' },
      { id: 'w_an8', ru: 'Итог', reading: 'Itóg', tr: 'Neticede / Özet', level: 'C1/C2', usageNote: 'Eril.' }
    ],
    sentences: [
      { ru: 'Давай отделим факты от предвзятости.', tr: 'Olguları önyargıdan ayıralım.', scrambled: ['предвзятости.', 'от', 'факты', 'отделим', 'Давай'], correct: ['Давай', 'отделим', 'факты', 'от', 'предвзятости.'] },
      { ru: 'У меня другая оптика, но нюанс я вижу.', tr: 'Bakış açım başka ama nüansı görüyorum.', scrambled: ['вижу.', 'я', 'нюанс', 'но', 'оптика,', 'другая', 'У меня'], correct: ['У меня', 'другая', 'оптика,', 'но', 'нюанс', 'я', 'вижу.'] }
    ],
    sceneTitle: 'Kafe Tartışması',
    sceneContext: 'İki arkadaşın haberi bağlama oturtmaya çalıştığı sahne.',
    dialogue: [
      { speaker: 'Arkadaş 1', ru: 'СМИ преувеличивают. Контекст другой.', reading: 'S-M-I preuvelíchivayut. Kantékst drugóy.', tr: 'Medya abartıyor. Bağlam başka.' },
      { speaker: 'Arkadaş 2', ru: 'Можно поспорить. Факты есть, оптика разная.', reading: 'Mózhna paspórit\'. Fákty yest\', óptika ráznaya.', tr: 'Tartışılabilir. Olgular var, bakış farklı.' },
      { speaker: 'Arkadaş 1', ru: 'Ладно. Нюанс принимаю. Итог: не делить людей.', reading: 'Ládna. Nyuáns prinimáyu. Itóg: ne delít\' lyudéy.', tr: 'Tamam. Nüansı kabul. Netice: insanları bölmeyelim.' },
      { speaker: 'Arkadaş 2', ru: 'Согласен. Кофе остыл, давай о сериале.', reading: 'Saglásen. Kófe astýl, daváy a seriále.', tr: 'Katılıyorum. Kahve soğudu, diziye geçelim.' }
    ]
  },
];

export const ALL_WORDS = UNITS_DATA.flatMap(m => m.words);

// Hikaye Türkçeleştirme sınavlarında yanlış şık (distractor) üretmek için tüm ünitelerdeki
// cümle ve diyalog satırlarının RU/TR karşılıklarından oluşan havuz.
export const ALL_SENTENCES: { ru: string; tr: string }[] = UNITS_DATA.flatMap(m => [
  ...(m.sentences || []).map(s => ({ ru: s.ru, tr: s.tr })),
  ...(m.dialogue || []).map(d => ({ ru: d.ru, tr: d.tr }))
]);
