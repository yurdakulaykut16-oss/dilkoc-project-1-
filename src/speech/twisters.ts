export interface Twister {
  ru: string;
  reading: string;
  tr: string;
  tip: string;
}

import { isEnglish } from '../content/activeLanguage';

const RU_TWISTERS: Twister[] = [
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
]
const EN_TWISTERS: Twister[] = [
  { ru: 'She sells seashells by the seashore', reading: 'Şİ SELS SİİşELZ bay di SİIşor', tr: 'Kız sahilde deniz kabuğu satıyor', tip: 'S-Ş: İngilizcenin en klasik tekerlemesi' },
  { ru: 'Peter Piper picked a peck of pickled peppers', reading: 'PIİtır PAYpır PİKT e PEK ıv PİKıld PEPırz', tr: 'Peter Piper bir kap turşu biber aldı', tip: 'P patlamaları: dudak Jimnastiği' },
  { ru: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?', reading: 'hau MADŞ UUD uud e UUDçak ÇAK if e UUDçak kud ÇAK UUD?', tr: 'Bir dağ sincabı odun atabilseydi ne kadar odun atardı?', tip: 'W sesi: dudak yuvarlama antrenmanı' },
  { ru: 'Red lorry, yellow lorry, red lorry, yellow lorry', reading: 'RED LORi, YELOU LORi, RED LORi, YELOU LORi', tr: 'Kırmızı kamyon, sarı kamyon...', tip: 'R-L dönüşümü: Türk öğrencinin klasiği' },
  { ru: 'Three free throws', reading: 'θRII FRII θROUZ', tr: 'Üç serbest atış', tip: 'TH sesi (θ) üst üste üç kez' },
  { ru: 'The thirty-three thieves thought that they thrilled the throne throughout Thursday', reading: 'di TERti TRII TIIVZ θOT det DEY θRILD di θROUN θruAUT TÖRZdey', tr: 'Otuz üç hırsız perşembe boyunca tahtı heyecanlandırdıklarını düşündü', tip: 'TH + R: efsanevi kombinasyon' },
  { ru: 'A proper copper coffee pot', reading: 'e PROPır KOPır KOFi POT', tr: 'Düzgün bir bakır kahve fincanı', tip: 'P-K sesleri: kısa patlama serisi' },
  { ru: 'Betty bought a bit of better butter', reading: 'BETi BOT e BİT ıv BEDır BATır', tr: 'Betty biraz daha iyi tereyağı aldı', tip: 'B-T ritmi: kısa ve hızlı' },
  { ru: 'Six slippery snails slid slowly seaward', reading: 'SİKS SLİPıri SNEYLZ SLİD SLOUli SİIUırd', tr: 'Altı kaygan salyangoz yavaşça denize kaydı', tip: 'S-SL ses dizileri' },
  { ru: 'I scream, you scream, we all scream for ice cream', reading: 'ay SKRIIM, yu SKRIIM, ui OL SKRIIM for AYS KRİIM', tr: 'Ben bağırırım, sen bağırırsın, hepimiz dondurma için bağırırız', tip: 'SKR kümesi + uzun ii sesi' },
  { ru: 'Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair', reading: 'FAZi UAZi UOZ e BER, FAZi UAZı HED NOU HER', tr: 'Fuzzy Wuzzy bir ayıydı, Fuzzy Wuzzy\'nin saçı yoktu', tip: 'W-Z ikilisi' },
  { ru: 'Black background, brown background', reading: 'BLEK BEKgraund, BRAUN BEKgraund', tr: 'Siyah arka plan, kahverengi arka plan', tip: 'B-L kümeleri' },
  { ru: 'The big bug bit the little beetle', reading: 'di BIG BAG BİT di LITıl BIİtııl', tr: 'Büyük böcek küçük böceği ısırdı', tip: 'B sesinin kısa patlamaları' },
  { ru: 'Nine nice night nurses nursing nicely', reading: 'NAYN NAYS NAYT NÖRsız NÖRsing NAYSLi', tr: 'Dokuz güzel gece hemşiresi güzelce bakıyor', tip: 'N sesi + uzun ay' },
  { ru: 'Very well, very well, very well', reading: 'VERi UEL, VERi UEL, VERi UEL', tr: 'Çok iyi, çok iyi, çok iyi', tip: 'V-W ayrımı: Türk öğrenciye özel' },
  { ru: 'Think twice before you speak once', reading: 'θINGK TUAIS bifOR yu SPIIK UANS', tr: 'Bir kez konuşmadan önce iki kez düşün', tip: 'TH + S: hem ders hem tekerleme' },
];

export const TWISTERS: Twister[] = isEnglish() ? EN_TWISTERS : RU_TWISTERS;
