// ==========================================
// 🗣️ TEKERLEMELER + AĞIZ JİMNASTİĞİ VERİSİ
// Gerçek Rusça tekerlemeler (скороговорки): amaç kelime EZBERİ DEĞİL —
// ağız/dil kaslarının Rusça ses dizilerine ALIŞMASI (motor öğrenme).
// Her tekerleme: Rusça metin + Latin okunuş + kısa Türkçe anlam.
// ==========================================

export interface Twister {
  ru: string;
  reading: string;      // Latin alfabesiyle yaklaşık okunuş
  tr: string;           // Türkçe anlamı (öğrenmek zorunda DEĞİLSİN)
  tip: string;          // hangi sesleri çalıştırdığı (1 satır)
}

export const TWISTERS: Twister[] = [
  { ru: 'Шла Саша по шоссе и сосала сушку', reading: 'Şla Saşa pa şasse i sasala suşku', tr: 'Saşa otoyolda yürüyor ve simit emiyordu', tip: 'Ş-S ayrımı: klasik Rus tekerlemesi' },
  { ru: 'На дворе трава, на траве дрова', reading: 'Na dvare trava, na trye drava', tr: 'Avluda ot var, otun üstünde odunlar', tip: 'V sesini inceltmez: TR-DR kümeleri' },
  { ru: 'Карл у Клары украл кораллы', reading: 'Karl u Kları ukral koralı', tr: 'Karl, Klara’nın mercanlarını çaldı', tip: 'Sert R + K-L kümeleri' },
  { ru: 'Клара у Карла украла кларнет', reading: 'Klara u Karla ukrala klarnyet', tr: 'Klara, Karl’ın klarnetini çaldı', tip: 'R-L arka arkaya — dil çözücü' },
  { ru: 'Кукушка кукушонку купила капюшон', reading: 'Kukuşka kukuşonku kupila kapüşon', tr: 'Guguk kuşu, yavrusuna kapüşon aldı', tip: 'K-Ş üst üste patlamalar' },
  { ru: 'Мама мыла Милу мылом', reading: 'Mama mıla Milu mılam', tr: 'Anne, Milu’yu sabunla yıkadı', tip: 'M-L-I: kalın I sesi' },
  { ru: 'От топота копыт пыль по полю летит', reading: 'At topata kapıt pıl pa pólyu litít', tr: 'Toynak sesinden toz tarlada uçuşuyor', tip: 'P-T patlamalı ünsüzler' },
  { ru: 'Бык тупогуб, тупогубенький бычок', reading: 'Bık tupagup, tupagubynkiy bıçok', tr: 'Öküz kalın dudaklı, kalın dudaklı öküzcük', tip: 'B-P-гп: ünlüler hep kalın' },
  { ru: 'Сорока за строчкой строчка сорочку', reading: 'Saрóka za stróçkay stróçka saróçku', tr: 'Saksağan ard arda gömleği dikiyor', tip: 'STR-ŞÇ kümeleri' },
  { ru: 'Во дворе четыре Сашки играют в шашки', reading: 'Vo dvare çetıre Saşki igrayu f şaşki', tr: 'Avluda dört Saşa dama oynuyor', tip: 'Ç-Ş-Ж ses dizileri' },
  { ru: 'Ехал Грека через реку', reading: 'Yehal Greka çeriz ryeku', tr: 'Yunan (Grek) nehirden geçiyordu', tip: 'R sesi serisi — titreme çalışması' },
  { ru: 'Видит Грека в реке рак', reading: 'Vidit Greka f ryekyek rak', tr: 'Yunan nehirde bir yengeç gördü', tip: 'GR-RK: gırtlağa dikkat' },
  { ru: 'Сунул Грека руку в реку', reading: 'Sunul Greka ruku v ryeku', tr: 'Yunan elini nehre soktu', tip: 'Kısa patlamalar, R-U-K' },
  { ru: 'Рак за руку Греку цап', reading: 'Rak za ruku Greku tsap', tr: 'Yengeç Yunan’ın elini kıstırdı', tip: 'TS sesi — Ц harfi çalışması' },
  { ru: 'Пётр пекарь пёк перепелов', reading: 'Pyótr pyekar’ pyók pyeryepyelof', tr: 'Fırıncı Petya bıldırcınlar pişirdi', tip: 'P-P-P dudak patlamaları serisi' },
  { ru: 'Пришёл Прокоп — кипел укроп', reading: 'Prişól Prakóp — kipyel ukróp', tr: 'Prokop geldi — dereotu kaynıyordu', tip: 'PR-KR kümeleri' },
  { ru: 'Ушёл Прокоп — кипел укроп', reading: 'Uşól Prakóp — kipyel ukróp', tr: 'Prokop gitti — dereotu kaynıyordu', tip: 'Aynı dizinin tekrarı — tempo tut' },
  { ru: 'Шесть мышат в камышах шуршат', reading: 'Şest’ mışat f kamışah şurşat', tr: 'Altı yavru fare sazlıkta hışırdıyor', tip: 'ŞŞŞ — ıslık sesleri antrenmanı' },
  { ru: 'Добыл бобыль бобы', reading: 'Dabıl babıl’ babı', tr: 'Bekâr adam fasulye topladı', tip: 'B sesi + kalın I' },
  { ru: 'Говорил попугай попугаю', reading: 'Gavaril papugay papugayu', tr: 'Papağan papağana dedi ki', tip: 'G-P kafiye dönüşümlü' },
  { ru: 'Корабль каравеллу караулит', reading: 'Karábl karavyellu karaulit', tr: 'Gemi karambolü bekliyor', tip: 'K-R-V-L değişimi' },
  { ru: 'Страшный зверь в сыром бору', reading: 'Straşnıy zvyer f sıram baru', tr: 'Korkunç hayvan ıslak çam ormanında', tip: 'Sert-yumuşak S + BV kümesi' },
  { ru: 'Хриплый хорь хрустит хлебом', reading: 'Hripılıy hór’ hrustít hlyebam', tr: 'Hırıltılı gelincik ekmekle çıtırdıyor', tip: 'H-HR: gırtlak sesleri — Türkçeye en uzak seri' },
  { ru: 'Забыл Панкрат домкрат', reading: 'Zabıl Pankrát damkrát', tr: 'Pankrat krikoyu unuttu', tip: 'N-KR-D kümeleri' },
];
