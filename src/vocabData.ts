export type LevelCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface WordDetail {
  ru: string;
  tr: string;
  reading: string;
  note: string;
  imageSeed: string;
}

export interface SentenceExercise {
  ru: string;
  tr: string;
  scrambled: string[];
  correct: string[];
}

export interface VocabModule {
  id: string;
  levelCode: LevelCode;
  title: string;
  category: string;
  styleBadge: string;
  icon: string;
  color: string;
  isExam?: boolean;
  comingSoon?: boolean;
  introTitle: string;
  introText: string;
  grammarTip?: string;
  words: WordDetail[];
  sentences: SentenceExercise[];
}

// ==========================================
// A1 SEVİYESİ — 6 KONU + 1 BİTİRME SINAVI
// ==========================================
export const MODULES: VocabModule[] = [
  {
    id: 'a1_greetings',
    levelCode: 'A1',
    title: 'A1.1 — Selamlaşma & Tanışma',
    category: 'Günlük Hayat',
    styleBadge: '👋 A1.1 İLK KELİMELER',
    icon: '👋',
    color: '#58cc02',
    introTitle: 'Rusçada Selamlaşma Mantığı',
    introText: 'Rusçada güne göre farklı selamlar kullanılır ve resmiyet dereceleri çok önemlidir. "Привет" sadece arkadaşlarına, "Здравствуйте" ise büyüklerine ve tanımadığın kişilere söylenir. Bu ayrımı karıştırmak Rusçada büyük bir kabalık sayılır.',
    grammarTip: '📌 Resmiyet Kuralı:\n• Здравствуйте → HERKESE söylenebilir (en güvenlisi)\n• Привет → SADECE yaşıtın/arkadaşın olan kişilere\n• Vakit selamları (утро/день/вечер) günün saatine göre değişir, birbirinin yerine kullanılmaz.',
    words: [
      { ru: 'Привет', tr: 'Selam', reading: 'Privet', note: 'Samimi, arkadaşlar arası', imageSeed: 'privet-friends-wave' },
      { ru: 'Здравствуйте', tr: 'Merhaba (resmi)', reading: 'Zdrastvuyte', note: 'Tanımadığın/büyük kişilere', imageSeed: 'zdravstvuyte-formal-greet' },
      { ru: 'Доброе утро', tr: 'Günaydın', reading: 'Dobraye utra', note: 'Sabah selamı', imageSeed: 'dobroe-utro-sunrise' },
      { ru: 'Добрый день', tr: 'İyi günler', reading: 'Dobrıy dyen', note: 'Gündüz selamı', imageSeed: 'dobriy-den-noon' },
      { ru: 'Добрый вечер', tr: 'İyi akşamlar', reading: 'Dobrıy veçer', note: 'Akşam selamı', imageSeed: 'dobriy-vecher-evening' },
      { ru: 'Спокойной ночи', tr: 'İyi geceler', reading: 'Spakoynoy noçi', note: 'Yatmadan önce', imageSeed: 'spokoynoy-nochi-night' },
      { ru: 'Пока', tr: 'Görüşürüz', reading: 'Paka', note: 'Samimi vedalaşma', imageSeed: 'poka-bye-casual' },
      { ru: 'До свидания', tr: 'Hoşça kalın', reading: 'Da svidaniya', note: 'Resmi vedalaşma', imageSeed: 'do-svidaniya-formal-bye' },
      { ru: 'Как дела?', tr: 'Nasılsın?', reading: 'Kak dela?', note: 'Hâl hatır sorma', imageSeed: 'kak-dela-howareyou' },
      { ru: 'Хорошо', tr: 'İyi', reading: 'Haraşo', note: 'Cevap kalıbı', imageSeed: 'horosho-good' },
      { ru: 'Плохо', tr: 'Kötü', reading: 'Ploha', note: 'Cevap kalıbı', imageSeed: 'ploho-bad' },
      { ru: 'Спасибо', tr: 'Teşekkürler', reading: 'Spasiba', note: 'En sık kullanılan kelimelerden', imageSeed: 'spasibo-thanks' },
      { ru: 'Пожалуйста', tr: 'Rica ederim / Lütfen', reading: 'Pajalusta', note: 'Hem "rica ederim" hem "lütfen"', imageSeed: 'pojaluysta-please' },
      { ru: 'Извините', tr: 'Özür dilerim / Affedersiniz', reading: 'İzvinite', note: 'Kibar özür/dikkat çekme', imageSeed: 'izvinite-sorry' },
      { ru: 'Да', tr: 'Evet', reading: 'Da', note: '', imageSeed: 'da-yes' },
      { ru: 'Нет', tr: 'Hayır', reading: 'Nyet', note: '', imageSeed: 'nyet-no' },
    ],
    sentences: [
      { ru: 'Здравствуйте, как дела?', tr: 'Merhaba, nasılsınız?', scrambled: ['дела?', 'Здравствуйте,', 'как'], correct: ['Здравствуйте,', 'как', 'дела?'] },
      { ru: 'Привет, спасибо, хорошо', tr: 'Selam, teşekkürler, iyiyim', scrambled: ['хорошо', 'спасибо,', 'Привет,'], correct: ['Привет,', 'спасибо,', 'хорошо'] },
      { ru: 'Извините, пожалуйста', tr: 'Affedersiniz, lütfen', scrambled: ['пожалуйста', 'Извините,'], correct: ['Извините,', 'пожалуйста'] },
    ],
  },
  {
    id: 'a1_numbers',
    levelCode: 'A1',
    title: 'A1.2 — Sayılar',
    category: 'Sayılar & Miktar',
    styleBadge: '🔢 A1.2 SAYILAR',
    icon: '🔢',
    color: '#58cc02',
    introTitle: 'Rusçada Sayı Sistemi',
    introText: 'Rusçada 0–10 arası sayıları ezberlemek her şeyin temelidir; fiyat sorma, saat söyleme ve yaş belirtme hep bu sayılara dayanır. 11-19 arası sayılar "-надцать" ekiyle, 20-90 arası onluklar ise kendine has köklerle türetilir.',
    grammarTip: '📌 Dikkat: "Один" (1) cinsiyete göre değişir: один (eril), одна (dişil), одно (nötr). Bu A2\'de detaylandırılacak, şimdilik "один" formunu öğren.',
    words: [
      { ru: 'Ноль', tr: 'Sıfır', reading: 'Nol', note: '0', imageSeed: 'nol-zero' },
      { ru: 'Один', tr: 'Bir', reading: 'Adin', note: '1', imageSeed: 'odin-one' },
      { ru: 'Два', tr: 'İki', reading: 'Dva', note: '2', imageSeed: 'dva-two' },
      { ru: 'Три', tr: 'Üç', reading: 'Tri', note: '3', imageSeed: 'tri-three' },
      { ru: 'Четыре', tr: 'Dört', reading: 'Çetıre', note: '4', imageSeed: 'chetire-four' },
      { ru: 'Пять', tr: 'Beş', reading: 'Pyat', note: '5', imageSeed: 'pyat-five' },
      { ru: 'Шесть', tr: 'Altı', reading: 'Şest', note: '6', imageSeed: 'shest-six' },
      { ru: 'Семь', tr: 'Yedi', reading: 'Syem', note: '7', imageSeed: 'sem-seven' },
      { ru: 'Восемь', tr: 'Sekiz', reading: 'Vosyem', note: '8', imageSeed: 'vosem-eight' },
      { ru: 'Девять', tr: 'Dokuz', reading: 'Devyat', note: '9', imageSeed: 'devyat-nine' },
      { ru: 'Десять', tr: 'On', reading: 'Desyat', note: '10', imageSeed: 'desyat-ten' },
      { ru: 'Двадцать', tr: 'Yirmi', reading: 'Dvatsat', note: '20', imageSeed: 'dvadtsat-twenty' },
      { ru: 'Сто', tr: 'Yüz', reading: 'Sto', note: '100', imageSeed: 'sto-hundred' },
    ],
    sentences: [
      { ru: 'У меня один брат', tr: 'Benim bir erkek kardeşim var', scrambled: ['брат', 'меня', 'один', 'У'], correct: ['У', 'меня', 'один', 'брат'] },
      { ru: 'Мне десять лет', tr: 'Ben on yaşındayım', scrambled: ['лет', 'десять', 'Мне'], correct: ['Мне', 'десять', 'лет'] },
      { ru: 'Это стоит сто рублей', tr: 'Bu yüz ruble tutuyor', scrambled: ['рублей', 'стоит', 'Это', 'сто'], correct: ['Это', 'стоит', 'сто', 'рублей'] },
    ],
  },
  {
    id: 'a1_pronouns',
    levelCode: 'A1',
    title: 'A1.3 — Zamirler & "Olmak"',
    category: 'Temel Gramer',
    styleBadge: '🧩 A1.3 ZAMİRLER',
    icon: '🧩',
    color: '#58cc02',
    introTitle: 'Kişi Zamirleri ve "Быть" (Olmak) Fiili',
    introText: 'Rusçada şimdiki zamanda "olmak" fiili genelde SÖYLENMEZ! "Я студент" demek "Ben öğrenciyim" demektir, aradaki "-yim" ekini ayrı bir kelime olarak eklemene gerek yoktur. Bu, Türkçeden çok farklı ama öğrenince işini kolaylaştıran bir kural.',
    grammarTip: '📌 "Я студент" = Ben öğrenciyim (araya "быть" gelmez)\n📌 "Есть" kelimesi ise "var" anlamında kullanılır: "У меня есть книга" = Bende bir kitap var.',
    words: [
      { ru: 'Я', tr: 'Ben', reading: 'Ya', note: 'Zamir', imageSeed: 'ya-i-pronoun' },
      { ru: 'Ты', tr: 'Sen', reading: 'Tı', note: 'Zamir, samimi', imageSeed: 'ti-you-informal' },
      { ru: 'Он', tr: 'O (erkek)', reading: 'On', note: 'Zamir', imageSeed: 'on-he' },
      { ru: 'Она', tr: 'O (kadın)', reading: 'Ana', note: 'Zamir', imageSeed: 'ona-she' },
      { ru: 'Оно', tr: 'O (nötr/eşya)', reading: 'Ano', note: 'Zamir', imageSeed: 'ono-it' },
      { ru: 'Мы', tr: 'Biz', reading: 'Mı', note: 'Zamir', imageSeed: 'mi-we' },
      { ru: 'Вы', tr: 'Siz', reading: 'Vı', note: 'Zamir, resmi/çoğul', imageSeed: 'vi-you-formal' },
      { ru: 'Они', tr: 'Onlar', reading: 'Ani', note: 'Zamir', imageSeed: 'oni-they' },
      { ru: 'Есть', tr: 'Var', reading: 'Yest', note: 'Varlık bildirme', imageSeed: 'yest-there-is' },
      { ru: 'Меня зовут', tr: 'Benim adım', reading: 'Menya zavut', note: 'Tanışma kalıbı', imageSeed: 'menya-zovut-myname' },
    ],
    sentences: [
      { ru: 'Я студент', tr: 'Ben öğrenciyim', scrambled: ['студент', 'Я'], correct: ['Я', 'студент'] },
      { ru: 'У меня есть кот', tr: 'Bende bir kedi var', scrambled: ['кот', 'есть', 'У', 'меня'], correct: ['У', 'меня', 'есть', 'кот'] },
      { ru: 'Она моя сестра', tr: 'O benim kız kardeşim', scrambled: ['сестра', 'моя', 'Она'], correct: ['Она', 'моя', 'сестра'] },
    ],
  },
  {
    id: 'a1_family',
    levelCode: 'A1',
    title: 'A1.4 — Aile',
    category: 'Aile & İnsanlar',
    styleBadge: '👨‍👩‍👧 A1.4 AİLE',
    icon: '👨‍👩‍👧',
    color: '#58cc02',
    introTitle: 'Aile Üyelerini Tanıtma',
    introText: 'Rusçada aile kelimeleri günlük konuşmanın temelidir. "Моя семья" (ailem) derken "моя" (dişil "benim") kullanılır çünkü "семья" dişil bir kelimedir — Rusçada her isim bir cinsiyete sahiptir ve bu, önündeki "benim/senin" gibi sözcükleri de değiştirir.',
    grammarTip: '📌 İyelik kısayolu: Eril isimler için "мой" (мой папа), dişil isimler için "моя" (моя мама) kullanılır.',
    words: [
      { ru: 'Семья', tr: 'Aile', reading: 'Semya', note: 'Dişil kelime', imageSeed: 'semya-family' },
      { ru: 'Мама', tr: 'Anne', reading: 'Mama', note: 'Dişil', imageSeed: 'mama-mom' },
      { ru: 'Папа', tr: 'Baba', reading: 'Papa', note: 'Eril', imageSeed: 'papa-dad' },
      { ru: 'Брат', tr: 'Erkek kardeş', reading: 'Brat', note: 'Eril', imageSeed: 'brat-brother' },
      { ru: 'Сестра', tr: 'Kız kardeş', reading: 'Sestra', note: 'Dişil', imageSeed: 'sestra-sister' },
      { ru: 'Бабушка', tr: 'Büyükanne', reading: 'Babuşka', note: 'Dişil', imageSeed: 'babushka-grandma' },
      { ru: 'Дедушка', tr: 'Büyükbaba', reading: 'Deduşka', note: 'Eril (ama -a ile biter, istisna!)', imageSeed: 'dedushka-grandpa' },
      { ru: 'Сын', tr: 'Oğul', reading: 'Sın', note: 'Eril', imageSeed: 'sin-son' },
      { ru: 'Дочь', tr: 'Kız evlat', reading: 'Doç', note: 'Dişil', imageSeed: 'doch-daughter' },
      { ru: 'Муж', tr: 'Koca', reading: 'Muj', note: 'Eril', imageSeed: 'muzh-husband' },
      { ru: 'Жена', tr: 'Eş (kadın)', reading: 'Jena', note: 'Dişil', imageSeed: 'zhena-wife' },
      { ru: 'Ребёнок', tr: 'Çocuk', reading: 'Rebyonak', note: 'Eril, tekil', imageSeed: 'rebenok-child' },
    ],
    sentences: [
      { ru: 'Моя мама и мой папа', tr: 'Annem ve babam', scrambled: ['папа', 'мама', 'и', 'мой', 'Моя'], correct: ['Моя', 'мама', 'и', 'мой', 'папа'] },
      { ru: 'У меня есть брат и сестра', tr: 'Benim bir erkek ve bir kız kardeşim var', scrambled: ['сестра', 'брат', 'У', 'меня', 'есть', 'и'], correct: ['У', 'меня', 'есть', 'брат', 'и', 'сестра'] },
      { ru: 'Это моя семья', tr: 'Bu benim ailem', scrambled: ['семья', 'моя', 'Это'], correct: ['Это', 'моя', 'семья'] },
    ],
  },
  {
    id: 'a1_colors',
    levelCode: 'A1',
    title: 'A1.5 — Renkler & Temel Sıfatlar',
    category: 'Sıfatlar',
    styleBadge: '🎨 A1.5 RENKLER',
    icon: '🎨',
    color: '#58cc02',
    introTitle: 'Sıfatların İsimle Uyumu',
    introText: 'Rusçada sıfatlar da isim gibi cinsiyete göre değişir! "Kırmızı" kelimesi eril isimle "красный", dişil isimle "красная", nötr isimle "красное" olur. A1 seviyesinde sadece eril (sözlük) formunu öğreneceğiz, uyum kuralı A2\'de derinleşecek.',
    grammarTip: '📌 Örnek uyum: красный дом (kırmızı ev - eril) / красная машина (kırmızı araba - dişil) / красное яблоко (kırmızı elma - nötr).',
    words: [
      { ru: 'Красный', tr: 'Kırmızı', reading: 'Krasnıy', note: 'Eril form', imageSeed: 'krasniy-red' },
      { ru: 'Синий', tr: 'Mavi', reading: 'Siniy', note: 'Eril form', imageSeed: 'siniy-blue' },
      { ru: 'Зелёный', tr: 'Yeşil', reading: 'Zelyonıy', note: 'Eril form', imageSeed: 'zeleniy-green' },
      { ru: 'Жёлтый', tr: 'Sarı', reading: 'Jyoltıy', note: 'Eril form', imageSeed: 'zholtiy-yellow' },
      { ru: 'Чёрный', tr: 'Siyah', reading: 'Çyornıy', note: 'Eril form', imageSeed: 'cherniy-black' },
      { ru: 'Белый', tr: 'Beyaz', reading: 'Belıy', note: 'Eril form', imageSeed: 'beliy-white' },
      { ru: 'Большой', tr: 'Büyük', reading: 'Balşoy', note: 'Sıfat', imageSeed: 'bolshoy-big' },
      { ru: 'Маленький', tr: 'Küçük', reading: 'Malenkiy', note: 'Sıfat', imageSeed: 'malenkiy-small' },
      { ru: 'Хороший', tr: 'İyi / Güzel', reading: 'Haroşiy', note: 'Sıfat', imageSeed: 'horoshiy-good' },
      { ru: 'Плохой', tr: 'Kötü', reading: 'Plahoy', note: 'Sıfat', imageSeed: 'plohoy-bad' },
    ],
    sentences: [
      { ru: 'Это красный дом', tr: 'Bu kırmızı bir ev', scrambled: ['дом', 'красный', 'Это'], correct: ['Это', 'красный', 'дом'] },
      { ru: 'У меня большая семья', tr: 'Benim büyük bir ailem var', scrambled: ['семья', 'большая', 'У', 'меня'], correct: ['У', 'меня', 'большая', 'семья'] },
      { ru: 'Мой кот чёрный', tr: 'Benim kedim siyah', scrambled: ['чёрный', 'кот', 'Мой'], correct: ['Мой', 'кот', 'чёрный'] },
    ],
  },
  {
    id: 'a1_food',
    levelCode: 'A1',
    title: 'A1.6 — Yiyecek & İçecek',
    category: 'Günlük Yaşam',
    styleBadge: '🍞 A1.6 YİYECEK-İÇECEK',
    icon: '🍞',
    color: '#58cc02',
    introTitle: 'Restoran ve Markette Hayatta Kalma Kelimeleri',
    introText: 'Bu modül A1\'in son kelime dağarcığı bloğu — burada öğrendiklerin, birazdan gireceğin BİTİRME SINAVI\'nda da karşına çıkacak. Yiyecek isimleri genelde tek başına, ekstra gramer kuralı olmadan kullanılabildiği için ezberlemesi nispeten kolaydır.',
    grammarTip: '📌 "Хочу" (istiyorum) + isim kalıbı çok kullanışlıdır: "Я хочу чай" (Çay istiyorum).',
    words: [
      { ru: 'Хлеб', tr: 'Ekmek', reading: 'Hlep', note: '', imageSeed: 'hleb-bread2' },
      { ru: 'Вода', tr: 'Su', reading: 'Vada', note: '', imageSeed: 'voda-water2' },
      { ru: 'Чай', tr: 'Çay', reading: 'Çay', note: '', imageSeed: 'chay-tea2' },
      { ru: 'Кофе', tr: 'Kahve', reading: 'Kofe', note: '', imageSeed: 'kofe-coffee' },
      { ru: 'Молоко', tr: 'Süt', reading: 'Malako', note: '', imageSeed: 'moloko-milk' },
      { ru: 'Суп', tr: 'Çorba', reading: 'Sup', note: '', imageSeed: 'sup-soup' },
      { ru: 'Мясо', tr: 'Et', reading: 'Myasa', note: '', imageSeed: 'myaso-meat' },
      { ru: 'Рыба', tr: 'Balık', reading: 'Rıba', note: '', imageSeed: 'riba-fish2' },
      { ru: 'Яблоко', tr: 'Elma', reading: 'Yablaka', note: '', imageSeed: 'yabloko-apple2' },
      { ru: 'Сыр', tr: 'Peynir', reading: 'Sır', note: '', imageSeed: 'sir-cheese' },
      { ru: 'Хочу', tr: 'İstiyorum', reading: 'Haçu', note: 'Fiil', imageSeed: 'hochu-iwant' },
    ],
    sentences: [
      { ru: 'Я хочу чай', tr: 'Çay istiyorum', scrambled: ['чай', 'хочу', 'Я'], correct: ['Я', 'хочу', 'чай'] },
      { ru: 'У меня есть хлеб и сыр', tr: 'Bende ekmek ve peynir var', scrambled: ['сыр', 'хлеб', 'У', 'меня', 'есть', 'и'], correct: ['У', 'меня', 'есть', 'хлеб', 'и', 'сыр'] },
      { ru: 'Это вкусная рыба', tr: 'Bu lezzetli bir balık', scrambled: ['рыба', 'вкусная', 'Это'], correct: ['Это', 'вкусная', 'рыба'] },
    ],
  },
  {
    id: 'a1_exam',
    levelCode: 'A1',
    title: 'A1 — BİTİRME SINAVI',
    category: 'Seviye Sınavı',
    styleBadge: '🏆 A1 FİNAL SINAVI',
    icon: '🏆',
    color: '#ffb800',
    isExam: true,
    introTitle: 'A2\'ye Geçiş Sınavı',
    introText: 'Bu sınav, öğrendiğin TÜM A1 kelimelerini ve cümle kalıplarını rastgele sırayla test eder. Sınav ZORDUR: tek bir yanlış cevap sınavı SIFIRLAR ve baştan, YENİDEN KARIŞTIRILMIŞ sırayla başlarsın. A2\'ye geçebilmek için bu sınavı hatasız tamamlaman gerekiyor.',
    words: [],
    sentences: [],
  },

  // ==========================================
  // A2 SEVİYESİ — 2 KONU + 1 BİTİRME SINAVI
  // ==========================================
  {
    id: 'a2_venting',
    levelCode: 'A2',
    title: "A2.1 — Dert Anlatma & Duygular",
    category: 'Duygular',
    styleBadge: '💬 A2.1 DERT ANLATMA',
    icon: '😭',
    color: '#1cb0f6',
    introTitle: "Устать (Yorulmak) ve Cinsiyete Göre Geçmiş Zaman",
    introText: "Rusçada geçmiş zaman fiilleri KONUŞAN KİŞİNİN CİNSİYETİNE göre değişir! Bu, A1'den A2'ye geçerken karşına çıkan ilk büyük gramer sıçramasıdır. Erkek 'Я устал' derken, kadın 'Я устала' der — sondaki '-а' dişil ekidir.",
    grammarTip: "📌 Geçmiş zaman eril/dişil eki:\n• (Erkek) Я устал — Yoruldum\n• (Kadın) Я устала — Yoruldum\n• Çoğulda cinsiyet farkı kalkar: Мы устали (Yorulduk)",
    words: [
      { ru: 'Я устал', tr: 'Yoruldum (erkek)', reading: 'Ya ustal', note: 'Geçmiş zaman eril', imageSeed: 'ya-ustal-tired-m' },
      { ru: 'Я устала', tr: 'Yoruldum (kadın)', reading: 'Ya ustala', note: 'Geçmiş zaman dişil', imageSeed: 'ya-ustala-tired-f' },
      { ru: 'Меня всё бесит', tr: 'Her şey sinirimi bozuyor', reading: 'Menya fsyo besit', note: 'Sokak jargonu', imageSeed: 'vsyo-besit-angry' },
      { ru: 'Мне грустно', tr: 'Üzgünüm', reading: 'Mne grusna', note: '', imageSeed: 'mne-grustno-sad' },
      { ru: 'Я счастлив', tr: 'Mutluyum (erkek)', reading: 'Ya şastliv', note: 'Eril form', imageSeed: 'schastliv-happy-m' },
      { ru: 'Я счастлива', tr: 'Mutluyum (kadın)', reading: 'Ya şastliva', note: 'Dişil form', imageSeed: 'schastliva-happy-f' },
      { ru: 'Ты меня не понимаешь', tr: 'Beni anlamıyorsun', reading: 'Tı menya ne panimayeş', note: '', imageSeed: 'ne-ponimaesh-notunderstand' },
      { ru: 'Не переживай', tr: 'Üzülme / Merak etme', reading: 'Ne pereживай', note: 'Teselli kalıbı', imageSeed: 'ne-perezhivay-donotworry' },
    ],
    sentences: [
      { ru: 'Я так устал, меня всё бесит', tr: 'Çok yoruldum, her şey sinirimi bozuyor', scrambled: ['всё', 'Я', 'бесит', 'устал', 'меня', 'так'], correct: ['Я', 'так', 'устал', 'меня', 'всё', 'бесит'] },
      { ru: 'Не переживай, всё будет хорошо', tr: 'Üzülme, her şey iyi olacak', scrambled: ['хорошо', 'будет', 'Не', 'переживай,', 'всё'], correct: ['Не', 'переживай,', 'всё', 'будет', 'хорошо'] },
    ],
  },
  {
    id: 'a2_renting',
    levelCode: 'A2',
    title: "A2.2 — Ev Kiralama & Pazarlık",
    category: 'Ev & Emlak',
    styleBadge: '🏠 A2.2 EV KİRALAMA',
    icon: '🏠',
    color: '#1cb0f6',
    introTitle: "Emlakçıyla Konuşurken Gereken Kalıplar",
    introText: "Rusça konuşulan ülkelerde ev kiralarken 'Снять квартиру' (daire kiralamak) kalıbı kullanılır. Pazarlık kültürü güçlüdür, bu yüzden fiyat itirazı cümleleri günlük hayatta çok işine yarayacak.",
    grammarTip: "📌 'Слишком' (çok/fazla, olumsuz anlamda) kelimesi her sıfatın önüne gelebilir: слишком дорого (çok pahalı), слишком далеко (çok uzak).",
    words: [
      { ru: 'Снять квартиру', tr: 'Daire kiralamak', reading: 'Snyat kvartiru', note: 'Emlak kalıbı', imageSeed: 'snyat-kvartiru-rent' },
      { ru: 'Аренда', tr: 'Kira', reading: 'Arenda', note: '', imageSeed: 'arenda-rent-sign' },
      { ru: 'Это слишком дорого', tr: 'Bu çok pahalı', reading: 'Eto slişkam daraga', note: 'Pazarlık kalıbı', imageSeed: 'slishkom-dorogo-expensive' },
      { ru: 'Дёшево', tr: 'Ucuz', reading: 'Dyoşeva', note: '', imageSeed: 'deshevo-cheap' },
      { ru: 'Комната', tr: 'Oda', reading: 'Komnata', note: '', imageSeed: 'komnata-room' },
      { ru: 'Соседи', tr: 'Komşular', reading: 'Sasedi', note: '', imageSeed: 'sosedi-neighbors' },
      { ru: 'Можно посмотреть?', tr: 'Görebilir miyim?', reading: 'Mojna pasmatret?', note: 'Emlakçıya soru', imageSeed: 'mozhno-posmotret-canisee' },
    ],
    sentences: [
      { ru: 'Я хочу снять квартиру, это дорого', tr: 'Daire kiralamak istiyorum, bu pahalı', scrambled: ['квартиру', 'дорого', 'Я', 'хочу', 'это', 'снять'], correct: ['Я', 'хочу', 'снять', 'квартиру', 'это', 'дорого'] },
      { ru: 'Можно посмотреть комнату?', tr: 'Odayı görebilir miyim?', scrambled: ['комнату?', 'посмотреть', 'Можно'], correct: ['Можно', 'посмотреть', 'комнату?'] },
    ],
  },
  {
    id: 'a2_exam',
    levelCode: 'A2',
    title: 'A2 — BİTİRME SINAVI',
    category: 'Seviye Sınavı',
    styleBadge: '🏆 A2 FİNAL SINAVI',
    icon: '🏆',
    color: '#ffb800',
    isExam: true,
    introTitle: "B1'e Geçiş Sınavı",
    introText: 'A1 ve A2\'de öğrendiğin her şeyi karıştırarak test eden zorlu bir sınav. Hatasız tamamlaman gerekiyor.',
    words: [],
    sentences: [],
  },

  // ==========================================
  // B1 → C2: YAKINDA (İSKELET)
  // ==========================================
  {
    id: 'b1_m1', levelCode: 'B1', title: "B1.1 — Flört & İlişkiler", category: 'Flört & İlişki',
    styleBadge: '❤️ B1.1 YAKINDA', icon: '❤️', color: '#ff4b4b', comingSoon: true,
    introTitle: 'Yakında', introText: 'Bu bölüm A1 ve A2 tamamlandıktan sonra açılacak şekilde genişletilecek.', words: [], sentences: [],
  },
  {
    id: 'b2_m1', levelCode: 'B2', title: "B2.1 — İş Hayatı", category: 'İş Hayatı',
    styleBadge: '💼 B2.1 YAKINDA', icon: '💼', color: '#ffb800', comingSoon: true,
    introTitle: 'Yakında', introText: 'İleri seviye iş jargonu modülü yakında eklenecek.', words: [], sentences: [],
  },
  {
    id: 'c1_m1', levelCode: 'C1', title: "C1.1 — Edebiyat & Felsefe", category: 'İleri Seviye',
    styleBadge: '🎭 C1.1 YAKINDA', icon: '🎭', color: '#ce82ff', comingSoon: true,
    introTitle: 'Yakında', introText: 'Derin kültürel bağlam modülü yakında eklenecek.', words: [], sentences: [],
  },
  {
    id: 'c2_m1', levelCode: 'C2', title: "C2.1 — Anadili Hakimiyeti", category: 'Üstatlık',
    styleBadge: '👑 C2.1 YAKINDA', icon: '👑', color: '#e5e5e5', comingSoon: true,
    introTitle: 'Yakında', introText: 'Native seviye ironi ve mizah modülü yakında eklenecek.', words: [], sentences: [],
  },
];

export const ALL_A1_WORDS: WordDetail[] = MODULES.filter(m => m.levelCode === 'A1' && !m.isExam).flatMap(m => m.words);
export const ALL_A2_WORDS: WordDetail[] = MODULES.filter(m => m.levelCode === 'A2' && !m.isExam).flatMap(m => m.words);
export const ALL_WORDS: WordDetail[] = [...ALL_A1_WORDS, ...ALL_A2_WORDS];