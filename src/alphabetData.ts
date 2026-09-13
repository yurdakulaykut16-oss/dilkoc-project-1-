// ==========================================
// KİRİL ALFABESİ - TAM 33 HARF, 6 DERSTE
// ==========================================

export interface AlphabetLetter {
  id: string;
  upper: string;
  lower: string;
  translit: string;         // Latin karşılığı
  description: string;      // Türkçe sesletim anlatımı
  rule?: string;            // Ekstra fonetik kural (vurgu, yumuşama, sedasızlaşma vb.)
  example: {
    ru: string;
    tr: string;
    reading: string;
    imageSeed: string;
  };
}

export interface AlphabetLesson {
  id: string;
  title: string;
  subtitle: string;
  letters: AlphabetLetter[];
}

export const ALPHABET_LESSONS: AlphabetLesson[] = [
  {
    id: 'alf_1',
    title: 'Alfabe 1/6 — Tanıdık Yüzler',
    subtitle: 'Latin alfabesine görünüşte benzeyen ama bazen FARKLI okunan harfler',
    letters: [
      { id: 'a', upper: 'А', lower: 'а', translit: 'a', description: 'Türkçedeki düz "a" sesi. Ağız açık, dil düz durur.', example: { ru: 'Арбуз', tr: 'Karpuz', reading: 'Arbuz', imageSeed: 'arbuz-watermelon' } },
      { id: 'k', upper: 'К', lower: 'к', translit: 'k', description: 'Türkçedeki "k" ile birebir aynıdır.', example: { ru: 'Кот', tr: 'Kedi (erkek)', reading: 'Kot', imageSeed: 'kot-cat' } },
      { id: 'm', upper: 'М', lower: 'м', translit: 'm', description: 'Türkçedeki "m" ile birebir aynıdır.', example: { ru: 'Мама', tr: 'Anne', reading: 'Mama', imageSeed: 'mama-mother' } },
      { id: 'o', upper: 'О', lower: 'о', translit: 'o', description: 'VURGULUYSA net "o". VURGUSUZSA neredeyse "a" gibi okunur!', rule: '💡 ALTIN KURAL: Rusçada vurgusuz "О" harfi daralıp "A"ya yaklaşır. "Окно" (pencere) kelimesinde vurgu son hecede olduğu için ilk "О" aslında "A" gibi okunur: "Akno".', example: { ru: 'Окно', tr: 'Pencere', reading: 'Akno', imageSeed: 'okno-window' } },
      { id: 't', upper: 'Т', lower: 'т', translit: 't', description: 'Türkçedeki "t" ile birebir aynıdır, ama Rusçada dil dişlere daha yakın durur.', example: { ru: 'Такси', tr: 'Taksi', reading: 'Taksi', imageSeed: 'taksi-taxi' } },
      { id: 'ye', upper: 'Е', lower: 'е', translit: 'ye/i', description: 'Kelime başında veya ünlüden sonra "YE" gibi okunur. Bir ünsüzden sonra ise o ünsüzü YUMUŞATIR ve "i/e" gibi duyulur.', rule: '💡 "Ем" (yerim) kelimesinde başta olduğu için "Yem" diye okunur.', example: { ru: 'Ем', tr: '(Ben) yerim', reading: 'Yem', imageSeed: 'yem-eating' } },
    ]
  },
  {
    id: 'alf_2',
    title: 'Alfabe 2/6 — Temel Ünsüzler',
    subtitle: 'Görünüşü farklı ama sesi bize kolay gelen ünsüzler',
    letters: [
      { id: 'n', upper: 'Н', lower: 'н', translit: 'n', description: 'Türkçedeki "n" ile birebir aynıdır. Latin "H"ye benzese de "N" sesidir, karıştırma!', example: { ru: 'Нос', tr: 'Burun', reading: 'Nos', imageSeed: 'nos-nose' } },
      { id: 'p', upper: 'П', lower: 'п', translit: 'p', description: 'Türkçedeki "p" ile aynı. Latin "N"ye benzer görünse de "P" sesidir.', example: { ru: 'Папа', tr: 'Baba', reading: 'Papa', imageSeed: 'papa-father' } },
      { id: 'r', upper: 'Р', lower: 'р', translit: 'r', description: 'TİTREK "r"! Dilin ucu üst damağa değip titreşir, İspanyolca çift "rr" gibi.', rule: '💡 Latin "P" harfine benzese de "R" sesidir — çoğu yeni başlayan burada karışıklık yaşar.', example: { ru: 'Рыба', tr: 'Balık', reading: 'Rrıba', imageSeed: 'rıba-fish' } },
      { id: 's', upper: 'С', lower: 'с', translit: 's', description: 'Türkçedeki "s" ile aynı.', example: { ru: 'Сон', tr: 'Uyku / Rüya', reading: 'Son', imageSeed: 'son-sleep' } },
      { id: 'u', upper: 'У', lower: 'у', translit: 'u', description: 'Türkçedeki düz "u" sesi.', example: { ru: 'Утро', tr: 'Sabah', reading: 'Utra', imageSeed: 'utro-morning' } },
      { id: 'h', upper: 'Х', lower: 'х', translit: 'h', description: 'Boğazdan sürtünerek çıkan SERT bir "h", Türkçedeki "h"den çok daha kalın (Almanca "Bach" gibi).', example: { ru: 'Хлеб', tr: 'Ekmek', reading: 'Hlep', imageSeed: 'hleb-bread' } },
    ]
  },
  {
    id: 'alf_3',
    title: 'Alfabe 3/6 — Farklı Görünen Sesler',
    subtitle: 'Şekli bize yabancı ama sesi öğrenmesi kolay harfler',
    letters: [
      { id: 'b', upper: 'Б', lower: 'б', translit: 'b', description: 'Türkçedeki "b" ile aynı.', example: { ru: 'Банан', tr: 'Muz', reading: 'Banan', imageSeed: 'banan-banana' } },
      { id: 'v', upper: 'В', lower: 'в', translit: 'v', description: 'Türkçedeki "v" ile aynı.', example: { ru: 'Вода', tr: 'Su', reading: 'Vada', imageSeed: 'voda-water' } },
      { id: 'g', upper: 'Г', lower: 'г', translit: 'g', description: 'Türkçedeki kalın "g" (araba kelimesindeki gibi değil, "gaz"daki gibi).', example: { ru: 'Голова', tr: 'Kafa', reading: 'Galava', imageSeed: 'golova-head' } },
      { id: 'd', upper: 'Д', lower: 'д', translit: 'd', description: 'Türkçedeki "d" ile aynı.', example: { ru: 'Дом', tr: 'Ev', reading: 'Dom', imageSeed: 'dom-house' } },
      { id: 'z', upper: 'З', lower: 'з', translit: 'z', description: 'Türkçedeki "z" ile aynı. Latin "3" rakamına benzer, karıştırma!', example: { ru: 'Зима', tr: 'Kış', reading: 'Zima', imageSeed: 'zima-winter' } },
      { id: 'l', upper: 'Л', lower: 'л', translit: 'l', description: 'KALIN bir "l" sesi, dilin arkası damağa doğru kalkar (İngilizce "dark L" gibi).', example: { ru: 'Лампа', tr: 'Lamba', reading: 'Lampa', imageSeed: 'lampa-lamp' } },
    ]
  },
  {
    id: 'alf_4',
    title: 'Alfabe 4/6 — Yeni Semboller',
    subtitle: 'Türkçede tam karşılığı olmayan ama alışılınca kolay olan harfler',
    letters: [
      { id: 'zh', upper: 'Ж', lower: 'ж', translit: 'j', description: 'Fransızca "j" gibi (jurnal, jandarma). Kalın ve dolgun bir ses.', example: { ru: 'Жираф', tr: 'Zürafa', reading: 'Jiraf', imageSeed: 'jiraf-giraffe' } },
      { id: 'i', upper: 'И', lower: 'и', translit: 'i', description: 'İnce, net "i" sesi.', example: { ru: 'Игра', tr: 'Oyun', reading: 'Igra', imageSeed: 'igra-game' } },
      { id: 'y', upper: 'Й', lower: 'й', translit: 'y', description: 'Kısa, yarı ünsüz "y" sesi — tek başına hece oluşturmaz, hep bir ünlüye yaslanır ("ay", "oy" gibi).', example: { ru: 'Май', tr: 'Mayıs', reading: 'May', imageSeed: 'may-may' } },
      { id: 'f', upper: 'Ф', lower: 'ф', translit: 'f', description: 'Türkçedeki "f" ile aynı.', example: { ru: 'Фото', tr: 'Fotoğraf', reading: 'Foto', imageSeed: 'foto-photo' } },
      { id: 'ts', upper: 'Ц', lower: 'ц', translit: 'ts', description: 'Türkçede tek harfle karşılığı yok: "pizza"daki "tz" gibi tek hamlede "ts".', example: { ru: 'Цирк', tr: 'Sirk', reading: 'Tsirk', imageSeed: 'tsirk-circus' } },
      { id: 'ch', upper: 'Ч', lower: 'ч', translit: 'ç', description: 'Türkçedeki "ç" ile birebir aynı.', example: { ru: 'Чай', tr: 'Çay', reading: 'Çay', imageSeed: 'chay-tea' } },
    ]
  },
  {
    id: 'alf_5',
    title: 'Alfabe 5/6 — Zorlu Sesler',
    subtitle: 'Bu ders biraz daha zor, dikkatli dinle ve tekrar et',
    letters: [
      { id: 'sh', upper: 'Ш', lower: 'ш', translit: 'ş', description: 'KALIN, sert bir "ş" — dilin arkası hafif geriye kaçar.', example: { ru: 'Школа', tr: 'Okul', reading: 'Şkola', imageSeed: 'shkola-school' } },
      { id: 'shch', upper: 'Щ', lower: 'щ', translit: 'şç', description: 'Yumuşak ve UZUN bir "şç" sesi, Ш\'den daha ince ve daha uzun söylenir.', example: { ru: 'Щенок', tr: 'Yavru köpek', reading: 'Şçenok', imageSeed: 'shchenok-puppy' } },
      { id: 'yeri', upper: 'Ы', lower: 'ы', translit: 'ı', description: 'Türkçedeki "ı"ya en yakın ses ama dilin daha da arkada, boğaza yakın durduğu kalın bir "ı".', example: { ru: 'Мышь', tr: 'Fare', reading: 'Mış', imageSeed: 'mysh-mouse' } },
      { id: 'e2', upper: 'Э', lower: 'э', translit: 'e', description: 'Açık bir "e" sesi (Türkçe "e"den biraz daha açık ağızla).', example: { ru: 'Это', tr: 'Bu / Şu', reading: 'Eta', imageSeed: 'eto-this' } },
      { id: 'yo', upper: 'Ё', lower: 'ё', translit: 'yo', description: 'HER ZAMAN vurguludur! Üzerinde iki nokta gördüğün an vurgu orada demektir.', rule: '💡 Rusçada Ё harfi olan hece asla vurgusuz olamaz — bu yüzden okurken tereddüt etmene gerek yok.', example: { ru: 'Ёлка', tr: 'Yılbaşı ağacı', reading: 'Yolka', imageSeed: 'yolka-christmastree' } },
      { id: 'ya', upper: 'Я', lower: 'я', translit: 'ya', description: '"Ya" sesi — aynı zamanda Rusçada "ben" anlamına gelen kelimenin ta kendisidir!', example: { ru: 'Яблоко', tr: 'Elma', reading: 'Yabloka', imageSeed: 'yabloko-apple' } },
    ]
  },
  {
    id: 'alf_6',
    title: 'Alfabe 6/6 — Sessiz İşaretler',
    subtitle: 'Bu 3 harf/işaret kendi başına SES ÇIKARMAZ, komşu harfi değiştirir',
    letters: [
      { id: 'yu', upper: 'Ю', lower: 'ю', translit: 'yu', description: '"Yu" sesi, Türkçedeki "yu" ile aynı.', rule: '💡 Sedasızlaşma kuralı: "Юбка" (etek) kelimesinde б harfi sert к\'dan önce geldiği için sedasızlaşır ve "p" gibi okunur: "Yupka".', example: { ru: 'Юбка', tr: 'Etek', reading: 'Yupka', imageSeed: 'yubka-skirt' } },
      { id: 'hard', upper: 'Ъ', lower: 'ъ', translit: '(sert işaret)', description: 'SES ÇIKARMAZ! Sadece kendinden önceki ünsüzü SERT tutar ve araya küçük bir "kesinti/durak" koyar.', rule: '💡 "Подъезд" (bina girişi) kelimesinde Ъ, Д ile Е\'nin birleşip yumuşamasını engeller: "Padyezd" değil "Pad-yezd" gibi net bir ayrımla okunur.', example: { ru: 'Подъезд', tr: 'Bina girişi', reading: 'Pad-yezd', imageSeed: 'podyezd-entrance' } },
      { id: 'soft', upper: 'Ь', lower: 'ь', translit: '(yumuşatma işareti)', description: 'SES ÇIKARMAZ! Kendinden önceki ünsüzü YUMUŞATIR (İNCELTİR). Türkçede tam karşılığı yok ama "günyeşilyeşil" değil de ince bir "n-y" gibi düşün.', rule: '💡 "День" (gün) kelimesinde Н harfi Ь sayesinde yumuşar: "Dyen" gibi, sert "Den" değil.', example: { ru: 'День', tr: 'Gün', reading: 'Dyenʲ', imageSeed: 'den-day' } },
    ]
  },
];

export const ALL_LETTERS: AlphabetLetter[] = ALPHABET_LESSONS.flatMap(l => l.letters);