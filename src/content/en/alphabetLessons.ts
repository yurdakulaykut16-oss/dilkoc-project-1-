// ============================================================================
// 🇬🇧 İNGİLİZCE ALFABE & FONETİK DERSLERİ (30 ders)
// ----------------------------------------------------------------------------
// Rusça paketle BİREBİR aynı format: HARF/SES → SES İPUCU → NET KURAL →
// 1-2 ÖRNEK KELİME + OKUMA TESTİ (readingDrills).
//   • Ders 1-16  : ÇEKİRDEK FONETİK — 26 harf + TH/SH/CH/NG sesleri, Türk
//                  öğrencinin en çok zorlandığı noktalar (TH, W/V, sessiz
//                  harfler, magic E, schwa...) burada çözülür.
//   • Ders 17-30 : TEMATİK OKUMA PRATİĞİ — sayılar, günler, tabelalar,
//                  menüler, yalancı dostlar...
// Okunuşlar Türkçe harflerle, vurgulu hece BÜYÜK yazılır.
// ============================================================================

import type { AlphabetLetter, ReadingDrill } from '../../App';

export interface EnAlphabetLesson {
  id: string;
  title: string;
  subtitle: string;
  letters: AlphabetLetter[];
  readingDrills: ReadingDrill[];
}

const L = (
  id: string, upper: string, lower: string, translit: string,
  soundHint: string, phoneticRule: string,
  examples: [string, string, string][],
): AlphabetLetter => ({
  id, upper, lower, translit, soundHint, phoneticRule,
  examples: examples.map(([ru, reading, tr]) => ({ ru, reading, tr })),
});

export const EN_ALPHABET_LESSONS: EnAlphabetLesson[] = [
  // ==========================================================================
  // ÇEKİRDEK FONETİK — DERS 1-16
  // ==========================================================================
  {
    id: 'alpha_e1',
    title: 'Kısa Ünlüler: A, E, I',
    subtitle: 'İngilizcenin en büyük sürprizi: harf ≠ ses',
    letters: [
      L('e_a', 'A a', 'a', 'E (kısa)', '"A" çoğu zaman "e" okunur!', 'Kapalı hecede A kısa "e" sesi verir: cat → "ket" (kedi), apple → "epıl". "A" harfini "a" gibi okursan hiçbir kelime tanınmaz.', [['CAT', 'KET', 'kedi'], ['APPLE', 'EPıl', 'elma']]),
      L('e_e', 'E e', 'e', 'E (kısa)', 'Kısa, net bir "e"', 'Kapalı hecede E Türkçedeki gibi okunur: bed → "bed", red → "red". En güvenli ünlü!', [['RED', 'RED', 'kırmızı'], ['BED', 'BED', 'yatak']]),
      L('e_i', 'I i', 'i', 'İ (kısa)', 'İNGİLİZCE "I" = "ay" DEĞİL!', 'Kapalı hecede I kısa "i" sesi verir: big → "big", fish → "fiş". "I" tek başına (büyük harf) ise "AY" okunur — kelimeye göre değişir!', [['BIG', 'BIG', 'büyük'], ['FISH', 'FİŞ', 'balık']]),
    ],
    readingDrills: [
      { word: 'cat', correct: 'KET', distractors: ['KAT', 'KAYT', 'KETE'], tr: 'kedi' },
      { word: 'fish', correct: 'FİŞ', distractors: ['FAYŞ', 'FİŞE', 'FASH'], tr: 'balık' },
      { word: 'apple', correct: 'EPıl', distractors: ['APıl', 'EYPEL', 'APpol'], tr: 'elma' },
      { word: 'red', correct: 'RED', distractors: ['RID', 'REYD', 'REDi'], tr: 'kırmızı' },
      { word: 'big', correct: 'BIG', distractors: ['BAYG', 'BİĞ', 'BEG'], tr: 'büyük' },
    ],
  },
  {
    id: 'alpha_e2',
    title: 'Kısa Ünlüler: O, U',
    subtitle: 'O = "o" değil "a" gibi — İngilizcenin şakası',
    letters: [
      L('e_o', 'O o', 'o', 'A (kısa)', '"O" çoğu kez "a" gibi duyulur', 'Kapalı hecede O kısa ve açık "a" sesi verir: hot → "hat", dog → "dag". Kelimeyi "hot" diye okursan seni anlamazlar!', [['HOT', 'HAT', 'sıcak'], ['DOG', 'DAG', 'köpek']]),
      L('e_u', 'U u', 'u', 'A (kısa)', '"U" da sürpriz yumurta: "a" gibi', 'Kapalı hecede U çoğu kez "a" sesi verir: cup → "kap", bus → "bas". "put" ve "push" istisnadır ("put" gibi "u").', [['CUP', 'KAP', 'fincan'], ['BUS', 'BAS', 'otobüs']]),
    ],
    readingDrills: [
      { word: 'hot', correct: 'HAT', distractors: ['HOT', 'HOUT', 'HOTi'], tr: 'sıcak' },
      { word: 'dog', correct: 'DAG', distractors: ['DOG', 'DOĞ', 'DAGı'], tr: 'köpek' },
      { word: 'cup', correct: 'KAP', distractors: ['KUP', 'KYUP', 'KAPı'], tr: 'fincan' },
      { word: 'bus', correct: 'BAS', distractors: ['BUS', 'BUŞ', 'BASi'], tr: 'otobüs' },
      { word: 'sun', correct: 'SAN', distractors: ['SUN', 'SUNI', 'ŞUN'], tr: 'güneş' },
    ],
  },
  {
    id: 'alpha_e3',
    title: 'Güvenli Ünsüzler: B, D, F, K',
    subtitle: 'Türkçedeki gibi okunan nadi harflerle ısınma',
    letters: [
      L('e_b', 'B b', 'b', 'B', 'Tam Türkçe "b"', 'B her yerde b\'dir: book → "buk". Sonda sedasızlaşan sonek yoktur.', [['BOOK', 'BUK', 'kitap'], ['BLUE', 'BLU', 'mavi']]),
      L('e_d', 'D d', 'd', 'D', 'Tam Türkçe "d"', 'D güvenlidir: door → "dor". Kelime sonundaki -ed ise ayrı derste sınıflanacak!', [['DOOR', 'DOR', 'kapı'], ['RED', 'RED', 'kırmızı']]),
      L('e_f', 'F f', 'f', 'F', 'Tam Türkçe "f"', 'F her zaman f\'dir: fish → "fiş", family → "femili".', [['FISH', 'FİŞ', 'balık'], ['FOOD', 'FUUD', 'yiyecek']]),
      L('e_k', 'K k', 'k', 'K', 'Tam Türkçe "k"', 'K güvenlidir: key → "kii". "kn-" başlangıcında sessizdir ama o ayrı ders!', [['KEY', 'KII', 'anahtar'], ['KITCHEN', 'KIÇın', 'mutfak']]),
    ],
    readingDrills: [
      { word: 'book', correct: 'BUK', distractors: ['BOOK', 'BUKE', 'BOK'], tr: 'kitap' },
      { word: 'door', correct: 'DOR', distractors: ['DUUR', 'DOOR', 'DORu'], tr: 'kapı' },
      { word: 'food', correct: 'FUUD', distractors: ['FOD', 'FUD', 'FOdır'], tr: 'yiyecek' },
      { word: 'key', correct: 'KII', distractors: ['KEY', 'KEE', 'KAY'], tr: 'anahtar' },
      { word: 'blue', correct: 'BLU', distractors: ['BLUE', 'BLUe', 'BLİU'], tr: 'mavi' },
    ],
  },
  {
    id: 'alpha_e4',
    title: 'Kopyacı C ve G',
    subtitle: 'C bazen K bazen S; G bazen C bile olur!',
    letters: [
      L('e_c', 'C c', 'c', 'K / S', '"C" kendi sesi OLMAYAN harftir', 'C, E/I/Y önünde "S" olur (city → "siti"), başka yerde "K" (cat → "ket"). Sesli harfe bak, kararı ver!', [['CAT', 'KET', 'kedi'], ['CITY', 'SITI', 'şehir']]),
      L('e_g', 'G g', 'g', 'G / C', '"G" E/I/Y önünde "c" gibi yumuşar', 'G, E/I/Y önünde "c" sesine kayar: page → "peyc", giant → "caynt". Başka yerde sert "g": go → "gou".', [['GO', 'GOU', 'gitmek'], ['PAGE', 'PEYC', 'sayfa']]),
      L('e_q', 'Q q', 'q', 'KU', 'Q hep U ile gezer: "qu" = "ku"', 'Q asla yalnız görülmez: queen → "kuin", quick → "kuik". Q+U ikilisi hep birlikte "ku" okunur.', [['QUEEN', 'KUIN', 'kraliçe'], ['QUICK', 'KUIK', 'hızlı']]),
    ],
    readingDrills: [
      { word: 'city', correct: 'SITI', distractors: ['KITI', 'SİTAY', 'CHITI'], tr: 'şehir' },
      { word: 'cat', correct: 'KET', distractors: ['SET', 'KAT', 'ÇAT'], tr: 'kedi' },
      { word: 'page', correct: 'PEYC', distractors: ['PEG', 'PAJE', 'PEYGE'], tr: 'sayfa' },
      { word: 'queen', correct: 'KUIN', distractors: ['KVEN', 'KUEN', 'KUWEN'], tr: 'kraliçe' },
      { word: 'giant', correct: 'CAYNT', distractors: ['GAYNT', 'GİANT', 'CEYENT'], tr: 'dev' },
    ],
  },
  {
    id: 'alpha_e5',
    title: 'Yeni Sesler: H, J, W',
    subtitle: 'Türkçede olmayan üç sestir',
    letters: [
      L('e_h', 'H h', 'h', 'H (nefesli)', 'İngilizce H Türkçedeki gibi boğazdan değil', 'İngilizce H yumuşak ve NEFESLİDİR: hello → "helou". Türkçedeki sert "h"den daha hafif, "hı" demeden!', [['HELLO', 'heLOU', 'merhaba'], ['HOUSE', 'HAUS', 'ev']]),
      L('e_j', 'J j', 'j', 'C', '"J" her zaman "c" gibi okunur', 'J Türkçedeki "c" sesidir: jump → "camp", job → "cab". Rusçadaki "j" ile karıştırma!', [['JOB', 'CAB', 'iş'], ['JUMP', 'CAMP', 'zıplamak']]),
      L('e_w', 'W w', 'w', 'U (dudak ünlüsü)', '"W" = iki dudağın öpücüğü', 'W Türkçede yoktur: dudakları küçük "u" gibi yuvarla ve hızlıca aç: water → "uotır", we → "ui".', [['WATER', 'UO-tır', 'su'], ['WE', 'UI', 'biz']]),
    ],
    readingDrills: [
      { word: 'hello', correct: 'heLOU', distractors: ['ELOU', 'HELO', 'HELLO'], tr: 'merhaba' },
      { word: 'job', correct: 'CAB', distractors: ['JAB', 'COP', 'JOP'], tr: 'iş' },
      { word: 'water', correct: 'UO-tır', distractors: ['VATER', 'UATER', 'UOTIRI'], tr: 'su' },
      { word: 'jump', correct: 'CAMP', distractors: ['JUMP', 'CUMP', 'YAMP'], tr: 'zıplamak' },
      { word: 'we', correct: 'UI', distractors: ['VE', 'UE', 'Vİ'], tr: 'biz' },
    ],
  },
  {
    id: 'alpha_e6',
    title: 'W vs V — Türk Öğrencinin Klasiği',
    subtitle: 'Venedik\'te vapur, Water\'da w...',
    letters: [
      L('e_w2', 'W w', 'w', 'U', 'W dudaklar yuvarlanarak "u" sesiyle', 'W söylerken DİŞLER dudaklara DEĞMEZ: we → "ui", wine → "uayn". Dudaklar öpücük gibi yuvarlanır.', [['WINE', 'UAYN', 'şarap'], ['WEST', 'UEST', 'batı']]),
      L('e_v', 'V v', 'v', 'V', 'V üst dişler ALT dudağa değer', 'V söylerken dişler dudağa DEĞER: very → "veri", video → "vidiou". W ile V\'yi karıştıran İngilizce konuşulmaz!', [['VERY', 'VERi', 'çok'], ['VIDEO', 'VIdiou', 'video']]),
    ],
    readingDrills: [
      { word: 'west', correct: 'UEST', distractors: ['VEST', 'UESTi', 'VESTT'], tr: 'batı' },
      { word: 'vest', correct: 'VEST', distractors: ['UEST', 'VESTi', 'UAST'], tr: 'yelek' },
      { word: 'wine', correct: 'UAYN', distractors: ['VAYN', 'UİNE', 'VINE'], tr: 'şarap' },
      { word: 'vine', correct: 'VAYN', distractors: ['UAYN', 'VINE', 'VEN'], tr: 'asma' },
      { word: 'world', correct: 'UORLD', distractors: ['VORLD', 'UORLDU', 'VORLDU'], tr: 'dünya' },
    ],
  },
  {
    id: 'alpha_e7',
    title: 'TH — İngilizcenin İmzası',
    subtitle: 'İki farklı TH: sessiz "th" ve sesli "th"',
    letters: [
      L('e_th1', 'TH', 'th', 'θ (sessiz)', 'Dil ucu dişlerin ARASINA çıkar', 'Sessiz TH: dil ucunu üst ve alt dişlerin arasına koy ve üfle: think → "tink" gibi ama t değil, "θ"! Türkçe "t" ile işi çözülmez.', [['THINK', 'θİNGK', 'düşünmek'], ['THREE', 'θRII', 'üç']]),
      L('e_th2', 'TH', 'th', 'ð (sesli)', 'Aynı pozisyon ama SESLİ: titreşir', 'Sesli TH aynı dil pozisyonunda gırtlaktan sesli gelir: this → "ðıs", mother → "madır". Kelimenin türüne göre seçilir!', [['THIS', 'ÐIS', 'bu'], ['MOTHER', 'MADır', 'anne']]),
    ],
    readingDrills: [
      { word: 'think', correct: 'θİNGK', distractors: ['TİNGK', 'SİNGK', 'FİNGK'], tr: 'düşünmek' },
      { word: 'this', correct: 'ÐIS', distractors: ['TİS', 'DİS', 'ZİS'], tr: 'bu' },
      { word: 'three', correct: 'θRII', distractors: ['TRII', 'SRİİ', 'TRİİİ'], tr: 'üç' },
      { word: 'mother', correct: 'MADır', distractors: ['MOTIR', 'MATIR', 'MODIR'], tr: 'anne' },
      { word: 'weather', correct: 'UEDır', distractors: ['VEDIR', 'VETER', 'UEDIRI'], tr: 'hava durumu' },
    ],
  },
  {
    id: 'alpha_e8',
    title: 'R ve L — Amerikan R\'si',
    subtitle: 'İngilizce R Türkçe R gibi titremez',
    letters: [
      L('e_r', 'R r', 'r', 'R (titremesiz)', 'İngilizce R dil ucu AŞAĞI kıvrılır, titremez', 'İngilizce R sesinde dil ucu hiçbir yere dokunmaz, geriye kıvrılır: red → "red", car → "kar". Türkçe titrek "r"den yumuşaktır.', [['RED', 'RED', 'kırmızı'], ['CAR', 'KAR', 'araba']]),
      L('e_l', 'L l', 'l', 'L', 'L dil ucuna dokundurur', 'İngilizce L net bir dildir: live → "liv". Kelime sonunda koyu bir "l" olur: full → "ful" (kalın l).', [['LIVE', 'LİV', 'yaşamak'], ['FULL', 'FUL', 'dolu']]),
    ],
    readingDrills: [
      { word: 'red', correct: 'RED', distractors: ['REDi', 'RET', 'RRED'], tr: 'kırmızı' },
      { word: 'car', correct: 'KAR', distractors: ['KARı', 'KAAR', 'CAR'], tr: 'araba' },
      { word: 'world', correct: 'UORLD', distractors: ['UORLDU', 'UORD', 'UURD'], tr: 'dünya' },
      { word: 'live', correct: 'LİV', distractors: ['LAYV', 'LİIVE', 'LİF'], tr: 'yaşamak' },
      { word: 'full', correct: 'FUL', distractors: ['FULL', 'FULU', 'FOL'], tr: 'dolu' },
    ],
  },
  {
    id: 'alpha_e9',
    title: 'Nazaller: M, N, NG',
    subtitle: 'Burnundan gelen sesler + ünlü NG',
    letters: [
      L('e_m', 'M m', 'm', 'M', 'Dudaklar kapanır, ses burundan', 'M Türkçeyle birebir: mother → "madır".', [['MILK', 'MILK', 'süt'], ['MONEY', 'MANi', 'para']]),
      L('e_n', 'N n', 'n', 'N', 'Dil ucu damaga değer, ses burundan', 'N güvenlidir: name → "neym". "nk" birleşiminde ise "ngk" gibi duyulur: thank → "θengk".', [['NAME', 'NEYM', 'isim'], ['THANK', 'θENGK', 'teşekkür']]),
      L('e_ng', 'NG', 'ng', 'NG', '"NG" tek ses: "n" + "g" değil!', 'NG Türkçedeki "ng" ikilisi gibi ama TEK sestir: sing → "sing" (sıng değil), morning → "morning". G\'yi ayrıca söyleme!', [['SING', 'SING', 'şarkı söylemek'], ['MORNING', 'MORning', 'sabah']]),
    ],
    readingDrills: [
      { word: 'milk', correct: 'MILK', distractors: ['MİLKI', 'MULK', 'MILİK'], tr: 'süt' },
      { word: 'thank', correct: 'θENGK', distractors: ['θANK', 'TANK', 'θENK'], tr: 'teşekkür' },
      { word: 'sing', correct: 'SING', distractors: ['SİNGİ', 'SIN-G', 'SINGH'], tr: 'şarkı söylemek' },
      { word: 'morning', correct: 'MORning', distractors: ['MORNİNG', 'MORNINGI', 'MORNIN'], tr: 'sabah' },
      { word: 'name', correct: 'NEYM', distractors: ['NAM', 'NEYME', 'NEYMİ'], tr: 'isim' },
    ],
  },
  {
    id: 'alpha_e10',
    title: 'Sonda S: /s/ mi /z/ mi?',
    subtitle: 'Çoğul ve 3. tekil -s incecik bir kurala uyar',
    letters: [
      L('e_s', 'S s', 's', 'S / Z', 'Sonda sesli harften sonra S = "z"', 'cats → "kets" (s) ama dogs → "dagz" (z): S, öncesindekiler sesli/sessiz olmasına göre "s" ya da "z" okunur. Kuralı kulağınla çöz!', [['CATS', 'KETS', 'kediler'], ['DOGS', 'DAGZ', 'köpekler']]),
      L('e_x', 'X x', 'x', 'KS', 'X = K+S ikizi', 'X hep "ks" okunur: box → "boks", six → "siks". Başta nadiren "z": xerox.', [['BOX', 'BOKS', 'kutu'], ['SIX', 'SİKS', 'altı']]),
    ],
    readingDrills: [
      { word: 'cats', correct: 'KETS', distractors: ['KETZ', 'KETSI', 'KATZ'], tr: 'kediler' },
      { word: 'dogs', correct: 'DAGZ', distractors: ['DAGS', 'DAGZI', 'DOGS'], tr: 'köpekler' },
      { word: 'box', correct: 'BOKS', distractors: ['BOŞ', 'BOKSİ', 'BOX'], tr: 'kutu' },
      { word: 'six', correct: 'SİKS', distractors: ['SİKZ', 'SİKSİ', 'SIX'], tr: 'altı' },
      { word: 'friends', correct: 'FRENDZ', distractors: ['FRENDS', 'FRENDZI', 'FRIENDS'], tr: 'arkadaşlar' },
    ],
  },
  {
    id: 'alpha_e11',
    title: 'Patlayıcı İkili: T ve P',
    subtitle: 'İngilizce T ve P bol nefesle söylenir',
    letters: [
      L('e_t', 'T t', 't', 'T (nefesli)', 'İngilizce T\'nin üstünde bir nefes rüzgarı var', 'T sert ve nefeslidir: tea → "tii". Amerikan İngilizcesinde iki ünlü arası T çoğu kez "r gibi yumuşar: water → "uorır"!', [['TEA', 'TII', 'çay'], ['TIME', 'TAYM', 'zaman']]),
      L('e_p', 'P p', 'p', 'P (nefesli)', 'P, güçlü bir nefes patlamasıyla', 'P Türkçedeki gibi ama daha nefeslidir: pen → "pen", happy → "hepi".', [['PEN', 'PEN', 'kalem'], ['HAPPY', 'HEPi', 'mutlu']]),
    ],
    readingDrills: [
      { word: 'tea', correct: 'TII', distractors: ['TEA', 'TEY', 'TİYA'], tr: 'çay' },
      { word: 'time', correct: 'TAYM', distractors: ['TİME', 'TAYIM', 'TAIM'], tr: 'zaman' },
      { word: 'pen', correct: 'PEN', distractors: ['PENi', 'PENN', 'PENNE'], tr: 'kalem' },
      { word: 'happy', correct: 'HEPi', distractors: ['HAPİ', 'HEPPY', 'HAPI'], tr: 'mutlu' },
      { word: 'water (ABD)', correct: 'UORır', distractors: ['UATER', 'UO-tır', 'UORIRI'], tr: 'su (Amerikan aksanı)' },
    ],
  },
  {
    id: 'alpha_e12',
    title: 'Diyagraflar: CH ve SH',
    subtitle: 'İki harf, tek ses',
    letters: [
      L('e_ch', 'CH', 'ch', 'Ç', 'CH hep "ç" okunur', 'CH iki harf ama TEK "ç" sesidir: chair → "çer", kitchen → "kiçın". Asla "k+h" deme!', [['CHAIR', 'ÇEIR', 'sandalye'], ['KITCHEN', 'KIÇın', 'mutfak']]),
      L('e_sh', 'SH', 'sh', 'Ş', 'SH hep "ş" okunur', 'SH iki harf ama TEK "ş" sesidir: shop → "şop", fish → "fiş".', [['SHOP', 'ŞOP', 'dükkân'], ['FISH', 'FİŞ', 'balık']]),
    ],
    readingDrills: [
      { word: 'chair', correct: 'ÇEIR', distractors: ['KEIR', 'SAIR', 'ÇAYR'], tr: 'sandalye' },
      { word: 'shop', correct: 'ŞOP', distractors: ['SOP', 'SHOP', 'ŞOPE'], tr: 'dükkân' },
      { word: 'kitchen', correct: 'KIÇın', distractors: ['KİTŞEN', 'KİÇKEN', 'KITSHEN'], tr: 'mutfak' },
      { word: 'english', correct: 'INGliş', distractors: ['ENGLİŞ', 'İNGİLİÇ', 'ENGLICH'], tr: 'İngilizce' },
      { word: 'cheese', correct: 'ÇIIZ', distractors: ['CHIIZ', 'ŞIIZ', 'ÇESE'], tr: 'peynir' },
    ],
  },
  {
    id: 'alpha_e13',
    title: 'Z, V ve Y',
    subtitle: 'Vızıltı z, dişli v ve kaygan y',
    letters: [
      L('e_z', 'Z z', 'z', 'Z', 'Z = vızıltılı "z"', 'Z Türkçedeki "z" gibi: zoo → "zuu", zero → "ziro".', [['ZOO', 'ZUU', 'hayvanat bahçesi'], ['ZERO', 'ZIRO', 'sıfır']]),
      L('e_y2', 'Y y', 'y', 'Y / İ', 'Y ünlü de ünsüz de olabilir', 'Ünsüz Y: yes → "yes". Ünlü Y (sonda): happy → "hepi" (i sesi). Y\'nin kimliği kelimedeki yerine göre değişir!', [['YES', 'YES', 'evet'], ['HAPPY', 'HEPi', 'mutlu']]),
    ],
    readingDrills: [
      { word: 'zoo', correct: 'ZUU', distractors: ['ZOU', 'ZU', 'ZOO'], tr: 'hayvanat bahçesi' },
      { word: 'yes', correct: 'YES', distractors: ['YESI', 'JES', 'YESA'], tr: 'evet' },
      { word: 'yellow', correct: 'YELOU', distractors: ['YELLOU', 'YELOV', 'YELO'], tr: 'sarı' },
      { word: 'very', correct: 'VERi', distractors: ['VERİY', 'VERAY', 'WERİ'], tr: 'çok' },
      { word: 'year', correct: 'YIR', distractors: ['YEAIR', 'YIRI', 'YE-AR'], tr: 'yıl' },
    ],
  },
  {
    id: 'alpha_e14',
    title: 'Magic E — Sihirli E',
    subtitle: 'hat → hate, bit → bite: sondaki E her şeyi değiştirir',
    letters: [
      L('e_mag1', 'A_E', 'a_e', 'EY', 'Sondaki E önceki ünlüyü UZATIR', 'Magic E kuralı: kapalı hece + sondaki sessiz + e → ünlü kendi adıyla okunur: hat → "het" ama hate → "eyt"!', [['HATE', 'HEYT', 'nefret etmek'], ['NAME', 'NEYM', 'isim']]),
      L('e_mag2', 'I_E', 'i_e', 'AY', 'I + magic E = "ay"', 'bit → "bit" ama bite → "bayt". İ önceki derste kısa "i" idi; magic E onu "ay" yapar!', [['LIKE', 'LAYK', 'sevmek'], ['TIME', 'TAYM', 'zaman']]),
      L('e_mag3', 'O_E / U_E', 'o_e / u_e', 'OU / YU', 'O ve U da magic E ile uzar', 'not → "nat" ama note → "nout"; cut → "kat" ama cute → "kyut".', [['NOTE', 'NOUT', 'not'], ['CUTE', 'KYUUT', 'sevimli']]),
    ],
    readingDrills: [
      { word: 'hat', correct: 'KET', distractors: ['HEYT', 'HAT', 'HETE'], tr: 'şapka' },
      { word: 'hate', correct: 'HEYT', distractors: ['KET', 'HATE', 'HEYTI'], tr: 'nefret etmek' },
      { word: 'bit', correct: 'BİT', distractors: ['BAYT', 'BİTE', 'BET'], tr: 'az' },
      { word: 'bite', correct: 'BAYT', distractors: ['BİT', 'BAYTI', 'BAIT'], tr: 'ısırmak' },
      { word: 'note', correct: 'NOUT', distractors: ['NOT', 'NOV', 'NOTU'], tr: 'not' },
      { word: 'cute', correct: 'KYUUT', distractors: ['KAT', 'KUT', 'KUTE'], tr: 'sevimli' },
    ],
  },
  {
    id: 'alpha_e15',
    title: 'Ünlü Takımları: EE, EA, OO',
    subtitle: 'İki ünlü yan yana: birlikte oku',
    letters: [
      L('e_ee', 'EE', 'ee', 'İİ', 'EE hep uzun "ii"', 'EE iki harf ama TEK uzun "ii" sesidir: see → "sii", coffee → "kofi".', [['SEE', 'Sİİ', 'görmek'], ['COFFEE', 'KOFi', 'kahve']]),
      L('e_ea', 'EA', 'ea', 'İİ', 'EA çoğunlukla "ii" okunur', 'EA da genelde "ii": tea → "tii", sea → "sii". (bread → "bred" gibi az sayıda istisna var.)', [['TEA', 'Tİİ', 'çay'], ['SEA', 'Sİİ', 'deniz']]),
      L('e_oo', 'OO', 'oo', 'UU / U', 'OO çoğunlukla uzun "uu"', 'OO genelde "uu": food → "fuud", moon → "muun". Ama "kitap" = book → "buk" (kısa u) — istisna kulakla öğrenilir!', [['FOOD', 'FUUD', 'yiyecek'], ['BOOK', 'BUK', 'kitap']]),
    ],
    readingDrills: [
      { word: 'see', correct: 'Sİİ', distractors: ['SE', 'SEY', 'Sİ'], tr: 'görmek' },
      { word: 'tea', correct: 'Tİİ', distractors: ['TEA', 'TİYA', 'TE'], tr: 'çay' },
      { word: 'food', correct: 'FUUD', distractors: ['FOD', 'FUD', 'FLOOD'], tr: 'yiyecek' },
      { word: 'book', correct: 'BUK', distractors: ['BUUK', 'BUKE', 'BOK'], tr: 'kitap' },
      { word: 'coffee', correct: 'KOFi', distractors: ['KOFİİ', 'KOFEE', 'KOFAY'], tr: 'kahve' },
    ],
  },
  {
    id: 'alpha_e16',
    title: 'Sessiz Harfler & Kapanış',
    subtitle: 'KN, WR, GH, MB: yazılıyor ama duyulmuyor',
    letters: [
      L('e_kn', 'KN', 'kn', 'N', 'Baştaki K sessizdir', 'KN başlangıcında K DUYULMAZ: know → "nou", knife → "nayf". Kelime "n" ile başlar gibi okunur!', [['KNOW', 'NOU', 'bilmek'], ['KNIFE', 'NAYF', 'bıçak']]),
      L('e_wr', 'WR', 'wr', 'R', 'Baştaki W sessizdir', 'WR başlangıcında W DUYULMAZ: write → "rayt", wrong → "rong".', [['WRITE', 'RAYT', 'yazmak'], ['WRONG', 'RONG', 'yanlış']]),
      L('e_gh', 'GH', 'gh', '(sessiz)', 'GH çoğu zaman hiç okunmaz', 'GH kelime içinde genelde SESSİZDİR: light → "layt", night → "nayt". "laight" gibi bir ses YOK!', [['LIGHT', 'LAYT', 'ışık'], ['NIGHT', 'NAYT', 'gece']]),
      L('e_mb', 'MB', 'mb', 'M', 'Sondaki B sessizdir', 'Kelime sonundaki B DUYULMAZ: climb → "klaym", thumb → "θam".', [['CLIMB', 'KLAYM', 'tırmanmak'], ['THUMB', 'θAM', 'başparmak']]),
    ],
    readingDrills: [
      { word: 'know', correct: 'NOU', distractors: ['KNOW', 'KNOU', 'ENU'], tr: 'bilmek' },
      { word: 'write', correct: 'RAYT', distractors: ['VRAYT', 'WRAYT', 'RAYTE'], tr: 'yazmak' },
      { word: 'light', correct: 'LAYT', distractors: ['LİGHT', 'LAYTI', 'LİT'], tr: 'ışık' },
      { word: 'night', correct: 'NAYT', distractors: ['NİGHT', 'NAYTE', 'NİT'], tr: 'gece' },
      { word: 'climb', correct: 'KLAYM', distractors: ['KLİMB', 'KLAYMB', 'KLİM'], tr: 'tırmanmak' },
    ],
  },
  // ==========================================================================
  // TEMATİK OKUMA PRATİĞİ — DERS 17-30
  // ==========================================================================
  {
    id: 'alpha_e17',
    title: 'Sayıları Oku: 0-12',
    subtitle: 'Fiyat, saat, telefon: sayılar olmadan hayat yok',
    letters: [
      L('a17_1', 'ONE / TWO', 'one / two', 'UAN / TUU', 'Bir ve iki: temel taşlar', 'one → "uan" (u ile!), two → "tuu" (w sessiz!). "tu" değil "tuu" — dudak yuvarlanır.', [['ONE', 'UAN', 'bir'], ['TWO', 'TUU', 'iki']]),
      L('a17_2', 'THREE / FOUR', 'three / four', 'θRII / FOR', 'Üç ve dört: TH ve sessiz görünümlü FOUR', 'three → "θrii" (TH diş arasından!), four → "for" — "four" 4 harf yazılır, 3 ses duyulur.', [['THREE', 'θRII', 'üç'], ['FOUR', 'FOR', 'dört']]),
      L('a17_3', 'FIVE / TWELVE', 'five / twelve', 'FAYV / TUELv', 'Beş ve on iki: vızıltı V ve kısa U', 'five → "fayv" (magic e!), twelve → "tuelv" — "tw" = "tu" birleşimi.', [['FIVE', 'FAYV', 'beş'], ['TWELVE', 'TUELv', 'on iki']]),
    ],
    readingDrills: [
      { word: 'three', correct: 'θRII', distractors: ['TRII', 'SRİİ', 'TİRİ'], tr: 'üç' },
      { word: 'five', correct: 'FAYV', distractors: ['FİVE', 'FİV', 'FEYV'], tr: 'beş' },
      { word: 'seven', correct: 'SEvın', distractors: ['SEVEN', 'SEVIN', 'SEVM'], tr: 'yedi' },
      { word: 'eight', correct: 'EYT', distractors: ['EGIHT', 'EIGT', 'AYT'], tr: 'sekiz' },
      { word: 'twelve', correct: 'TUELv', distractors: ['TVELVE', 'TUELVE', 'TUVEL'], tr: 'on iki' },
    ],
  },
  {
    id: 'alpha_e18',
    title: 'Sayıları Oku: 13-100',
    subtitle: '-teen mi -ty mi? Yaş ve fiyat tuzağı',
    letters: [
      L('a18_1', 'THIRTEEN', 'thirteen', 'θERtiin', '-teen: vurgu SONDA, uzun okunur', '13-19 arası "-teen" ile biter ve vurgu sondadır: thirteen → "θörtiin". Yaş söylerken kritik!', [['THIRTEEN', 'θERtiin', 'on üç'], ['FIFTEEN', 'FIFtiin', 'on beş']]),
      L('a18_2', 'THIRTY', 'thirty', 'θERti', '-ty: vurgu BAŞTA, kısa okunur', 'Onluklar "-ty" ile biter: thirty → "θörti". 13 (θörtiin) ile 30 (θörti) arasındaki fark hayat kurtarır!', [['THIRTY', 'θERti', 'otuz'], ['FORTY', 'FORti', 'kırk']]),
      L('a18_3', 'HUNDRED', 'hundred', 'HANdırıd', 'Yüz ve bin: yuvarlak sayılar', 'hundred → "handrıd", thousand → "sauzınd". "thousand"da TH sesli ð ile!', [['HUNDRED', 'HANdırıd', 'yüz'], ['THOUSAND', 'SAUzınd', 'bin']]),
    ],
    readingDrills: [
      { word: 'thirteen', correct: 'θERtiin', distractors: ['θERTI', 'TİRTİN', 'θERTEEN'], tr: 'on üç' },
      { word: 'thirty', correct: 'θERti', distractors: ['θERtiin', 'TIRTI', 'θURTİ'], tr: 'otuz' },
      { word: 'fifty', correct: 'FIFti', distractors: ['FIFTIIN', 'FİFTİ', 'FIFTAY'], tr: 'elli' },
      { word: 'hundred', correct: 'HANdırıd', distractors: ['HANDRED', 'HANDIRIT', 'HUNDRUD'], tr: 'yüz' },
      { word: 'thousand', correct: 'SAUzınd', distractors: ['TAUSAND', 'SAUSAND', 'θAUZAND'], tr: 'bin' },
    ],
  },
  {
    id: 'alpha_e19',
    title: 'Haftanın Günleri',
    subtitle: 'Monday\'den Sunday\'a: hepsi -day ile biter',
    letters: [
      L('a19_1', 'MONDAY', 'monday', 'MANdey', 'Pazartesi: kısa O yine "a" gibi', 'Monday → "mandey". Bütün günler "-day" (dey) ile biter, vurgu başa yakın.', [['MONDAY', 'MANdey', 'pazartesi'], ['TUESDAY', 'TYUZdey', 'salı']]),
      L('a19_2', 'WEDNESDAY', 'wednesday', 'UENZdey', 'Çarşamba: ilk D SESSİZ!', 'Wednesday → "uenz-dey": yazıda 9 harf, seste 6! Ortadaki "d" duyulmaz — İngilizcenin klasik şakası.', [['WEDNESDAY', 'UENZdey', 'çarşamba'], ['THURSDAY', 'TÖRZdey', 'perşembe']]),
      L('a19_3', 'SATURDAY / SUNDAY', 'saturday / sunday', 'SETırdey / SANdey', 'Hafta sonu: iki kardeş gün', 'Saturday → "setırdey", Sunday → "sandey". İkisi de sakin okunur, vurgu başta.', [['SATURDAY', 'SETırdey', 'cumartesi'], ['SUNDAY', 'SANdey', 'pazar']]),
    ],
    readingDrills: [
      { word: 'monday', correct: 'MANdey', distractors: ['MONDEY', 'MUNDey', 'MANDAY'], tr: 'pazartesi' },
      { word: 'wednesday', correct: 'UENZdey', distractors: ['VEDNESDEY', 'UENESDEY', 'VEDNEZDEY'], tr: 'çarşamba' },
      { word: 'thursday', correct: 'TÖRZdey', distractors: ['TURZDEY', 'TÖRSDEY', 'TURSDAY'], tr: 'perşembe' },
      { word: 'friday', correct: 'FRAYdey', distractors: ['FRIDEY', 'FREEDAY', 'FRIDA'], tr: 'cuma' },
      { word: 'saturday', correct: 'SETırdey', distractors: ['SATURDEY', 'SETIRDEY', 'SATURDAY'], tr: 'cumartesi' },
    ],
  },
  {
    id: 'alpha_e20',
    title: 'Aylar & Mevsimler',
    subtitle: 'Ocak\'tan Aralık\'a: hepsi büyük harfle!',
    letters: [
      L('a20_1', 'JANUARY', 'january', 'CANyuweri', 'Ocak: J = "c" sesi!', 'January → "canyueri". İngilizce aylar her zaman BÜYÜK harfle yazılır — küçük harf hatadır!', [['JANUARY', 'CANyuweri', 'ocak'], ['FEBRUARY', 'FEBruweri', 'şubat']]),
      L('a20_2', 'JULY', 'july', 'cuLAY', 'Temmuz: vurgu SONDa', 'July → "culay" — ayların tek son-vurgulusu. June → "cuun" ile karıştırma!', [['JULY', 'cuLAY', 'temmuz'], ['JUNE', 'CUUN', 'haziran']]),
      L('a20_3', 'AUTUMN / FALL', 'autumn / fall', 'O-tım / FOL', 'Sonbahar: İngilizce ve Amerikan iki isimli', 'İngilizcede sonbahar "autumn" (o-tım — sondaki n sessiz!), Amerikancada "fall".', [['AUTUMN', 'O-tım', 'sonbahar'], ['SUMMER', 'SAMır', 'yaz']]),
    ],
    readingDrills: [
      { word: 'january', correct: 'CANyuweri', distractors: ['JANUARI', 'CANUARY', 'JANYUARİ'], tr: 'ocak' },
      { word: 'february', correct: 'FEBruweri', distractors: ['FEBRUARY', 'FEBYUARİ', 'FEBRUAİRİ'], tr: 'şubat' },
      { word: 'july', correct: 'cuLAY', distractors: ['CULI', 'JULAY', 'CULEY'], tr: 'temmuz' },
      { word: 'autumn', correct: 'O-tım', distractors: ['AUTUMN', 'OTUMN', 'AUTTUM'], tr: 'sonbahar' },
      { word: 'summer', correct: 'SAMır', distractors: ['SUMMER', 'SUMIR', 'SAMMER'], tr: 'yaz' },
    ],
  },
  {
    id: 'alpha_e21',
    title: 'Renkleri Oku',
    subtitle: 'White\'ta W yok, green\'de uzun ii var',
    letters: [
      L('a21_1', 'WHITE / BLACK', 'white / black', 'UAYT / BLEK', 'Beyaz: W ve E sessiz kalır', 'white → "uayt" (E duyulmaz!), black → "blek". İngilizce renkler kısa ve nettir.', [['WHITE', 'UAYT', 'beyaz'], ['BLACK', 'BLEK', 'siyah']]),
      L('a21_2', 'GREEN / BLUE', 'green / blue', 'GRIIN / BLU', 'Yeşil ve mavi: uzun ünlüler', 'green → "griin" (uzun ii), blue → "blu" (uzun u).', [['GREEN', 'GRIIN', 'yeşil'], ['BLUE', 'BLU', 'mavi']]),
      L('a21_3', 'YELLOW / PURPLE', 'yellow / purple', 'YELOU / PERpıl', 'Sarı ve mor: sesli L ve R takımı', 'yellow → "yelou", purple → "perpıl" — R kıvrılarak söylenir, titremez.', [['YELLOW', 'YELOU', 'sarı'], ['PURPLE', 'PERpıl', 'mor']]),
    ],
    readingDrills: [
      { word: 'white', correct: 'UAYT', distractors: ['VAYT', 'UAYTE', 'VHITE'], tr: 'beyaz' },
      { word: 'green', correct: 'GRIIN', distractors: ['GREN', 'GRİN', 'GREEN'], tr: 'yeşil' },
      { word: 'yellow', correct: 'YELOU', distractors: ['YELLOV', 'YELOW', 'YELLU'], tr: 'sarı' },
      { word: 'purple', correct: 'PERpıl', distractors: ['PURPLE', 'PURPIL', 'PÜRPIL'], tr: 'mor' },
      { word: 'orange', correct: 'ORınc', distractors: ['ORANGE', 'ORANJE', 'ORINC'], tr: 'turuncu' },
    ],
  },
  {
    id: 'alpha_e22',
    title: 'Aile Kelimeleri',
    subtitle: 'Mother, father: kalın İngilizce ama sevgi dolu',
    letters: [
      L('a22_1', 'MOTHER / FATHER', 'mother / father', 'MADır / FA-dır', 'Anne-baba: sesli TH ile', 'mother → "madır", father → "fa-dır": ikisinde de TH seslidir (ð) ve "ır" kıvrımlı R ile biter.', [['MOTHER', 'MADır', 'anne'], ['FATHER', 'FA-dır', 'baba']]),
      L('a22_2', 'BROTHER / SISTER', 'brother / sister', 'BRA-dır / SIS-tır', 'Kardeşler: aynı aile aynı ritim', 'brother → "bra-dır" (father ile kafiyeli!), sister → "sis-tır".', [['BROTHER', 'BRA-dır', 'erkek kardeş'], ['SISTER', 'SIS-tır', 'kız kardeş']]),
      L('a22_3', 'DAUGHTER', 'daughter', 'DO-tır', 'Kız evlat: GH sessiz!', 'daughter → "do-tır": yazıda "gh" var ama duyulmaz. "doughter" gibi bir ses YOK!', [['DAUGHTER', 'DO-tır', 'kız evlat'], ['SON', 'SAN', 'oğul']]),
    ],
    readingDrills: [
      { word: 'mother', correct: 'MADır', distractors: ['MOTIR', 'MADİR', 'MOUTHER'], tr: 'anne' },
      { word: 'brother', correct: 'BRA-dır', distractors: ['BROTIR', 'BRA-DIR', 'BROZER'], tr: 'erkek kardeş' },
      { word: 'daughter', correct: 'DO-tır', distractors: ['DAUTIR', 'DOĞTER', 'DAUGHTER'], tr: 'kız evlat' },
      { word: 'family', correct: 'FEMıli', distractors: ['FAMİLİ', 'FEMİLİAY', 'FAMILY'], tr: 'aile' },
      { word: 'husband', correct: 'HASbınd', distractors: ['HUZBAND', 'HASBAND', 'HUSBEND'], tr: 'eş (erkek)' },
    ],
  },
  {
    id: 'alpha_e23',
    title: 'Yemek Masası',
    subtitle: 'Ekmeğin okunuşu bile sürpriz: bread = "bred"',
    letters: [
      L('a23_1', 'BREAD / WATER', 'bread / water', 'BRED / UO-tır', 'Ekmek: EA burada "e" olur!', 'bread → "bred" — EA çoğunlukla "ii" ama burada "e"! Su → "uotır": W\'ye dikkat.', [['BREAD', 'BRED', 'ekmek'], ['WATER', 'UO-tır', 'su']]),
      L('a23_2', 'BREAKFAST', 'breakfast', 'BREKfıst', 'Kahvaltı: EA yine "e"', 'breakfast → "brek-fıst". "break" (kırmak) ile "fast" (hızlı) birleşmiş — vurgu BAŞTA.', [['BREAKFAST', 'BREKfıst', 'kahvaltı'], ['DINNER', 'DINnır', 'akşam yemeği']]),
      L('a23_3', 'CHICKEN / CHEESE', 'chicken / cheese', 'ÇIKın / ÇIIZ', 'Tavuk ve peynir: iki güçlü Ç', 'chicken → "çıkın", cheese → "çiiz". CH hep "ç"!', [['CHICKEN', 'ÇIKın', 'tavuk'], ['CHEESE', 'ÇIIZ', 'peynir']]),
    ],
    readingDrills: [
      { word: 'bread', correct: 'BRED', distractors: ['BRİİD', 'BREAD', 'BRIAD'], tr: 'ekmek' },
      { word: 'breakfast', correct: 'BREKfıst', distractors: ['BREADFAST', 'BRIKFAST', 'BREKFEST'], tr: 'kahvaltı' },
      { word: 'chicken', correct: 'ÇIKın', distractors: ['CHIKEN', 'ŞIKIN', 'CHICKIN'], tr: 'tavuk' },
      { word: 'cheese', correct: 'ÇIIZ', distractors: ['CHIIZ', 'ÇESE', 'CHEESE'], tr: 'peynir' },
      { word: 'dinner', correct: 'DINnır', distractors: ['DAYNIR', 'DINER', 'DINNERI'], tr: 'akşam yemeği' },
    ],
  },
  {
    id: 'alpha_e24',
    title: 'Şehir Tabelaları',
    subtitle: 'OPEN mı EXIT mi: tabelalar hayat kurtarır',
    letters: [
      L('a24_1', 'OPEN / CLOSED', 'open / closed', 'OUpın / KLOUZD', 'Açık-kapalı: mağazanın yüzü', 'open → "oupın", closed → "klouzd" (tek sonda -d, "iz" YOK).', [['OPEN', 'OUpın', 'açık'], ['CLOSED', 'KLOUZD', 'kapalı']]),
      L('a24_2', 'EXIT / ENTER', 'exit / enter', 'EGzit / ENtır', 'Çıkış-giriş: X = KS', 'exit → "egzit", enter → "entır". Tabelalarda X hep "ks"!', [['EXIT', 'EGzit', 'çıkış'], ['ENTER', 'ENTır', 'giriş']]),
      L('a24_3', 'NO SMOKING', 'no smoking', 'NOU SMOUking', 'Yasak tabelası: haykırış gibi okunur', 'No smoking → "nou smouking". "PUSH" (it) → "puş", "PULL" (çek) → "pul" — kapı tabelaları!', [['NO SMOKING', 'NOU SMOUking', 'sigara içilmez'], ['PUSH / PULL', 'PUŞ / PUL', 'it / çek']]),
    ],
    readingDrills: [
      { word: 'open', correct: 'OUpın', distractors: ['OPİN', 'OUPINE', 'OPEN'], tr: 'açık' },
      { word: 'exit', correct: 'EGzit', distractors: ['EGZİT', 'EKSİT', 'EXİT'], tr: 'çıkış' },
      { word: 'push', correct: 'PUŞ', distractors: ['PUSH', 'PUCH', 'PUS'], tr: 'it' },
      { word: 'pull', correct: 'PUL', distractors: ['PULL', 'PULU', 'PUUL'], tr: 'çek' },
      { word: 'no parking', correct: 'NOU PARking', distractors: ['NO PARKING', 'NOU PARKIN', 'NOU PARQİNG'], tr: 'park yasak' },
    ],
  },
  {
    id: 'alpha_e25',
    title: 'Havaalanı Tabelaları',
    subtitle: 'DEPARTURES tabelasını okuyamayan uçağı kaçırır',
    letters: [
      L('a25_1', 'DEPARTURES', 'departures', 'diPARçırz', 'Gidişler: vurgu ortada', 'departures → "diparçırz". Gidiş-geliş: departures (gidiş), arrivals (erAYvılz — varış).', [['DEPARTURES', 'diPARçırz', 'gidişler'], ['ARRIVALS', 'erAYvılz', 'varışlar']]),
      L('a25_2', 'GATE / BOARDING', 'gate / boarding', 'GEYT / BORding', 'Kapı ve biniş: uçuşun iki kelimesi', 'gate → "geyt" (magic e!), boarding → "bordin(g)" — son NG duyulmaz gibi hızlı.', [['GATE', 'GEYT', 'kapı'], ['BOARDING', 'BORding', 'biniş']]),
      L('a25_3', 'LUGGAGE / DELAYED', 'luggage / delayed', 'LAGıc / dilEYD', 'Bagaj ve rötar: yolcunun kaderi', 'luggage → "lagıc" (çift g tek g gibi), delayed → "dileyd".', [['LUGGAGE', 'LAGıc', 'bagaj'], ['DELAYED', 'dilEYD', 'rötarlı']]),
    ],
    readingDrills: [
      { word: 'departures', correct: 'diPARçırz', distractors: ['DEPARTURS', 'DIPARÇÜRS', 'DEPARTURES'], tr: 'gidişler' },
      { word: 'arrivals', correct: 'erAYvılz', distractors: ['ARIVALS', 'ARAYVALS', 'ARİVAALS'], tr: 'varışlar' },
      { word: 'gate', correct: 'GEYT', distractors: ['GAT', 'GATI', 'GATE'], tr: 'kapı' },
      { word: 'delayed', correct: 'dilEYD', distractors: ['DELAYED', 'DİLEYED', 'DELAYD'], tr: 'rötarlı' },
      { word: 'boarding pass', correct: 'BORding PAS', distractors: ['BOARDING PAS', 'BORdin PASI', 'BOARDIN PASS'], tr: 'uçuş kartı' },
    ],
  },
  {
    id: 'alpha_e26',
    title: 'Saat & Zaman İfadeleri',
    subtitle: 'o\'clock, half past, quarter to: saatin grameri',
    letters: [
      L('a26_1', "O'CLOCK", "o'clock", 'ıkLOK', 'Tam saat: sessiz gibi görünen apostrof', "o'clock → \"ıklok\": \"of the clock\" kısaltmasıdır. Saat söylemenin en temiz yolu.", [["IT'S FIVE O'CLOCK", 'its FAYV ıkLOK', 'saat beş'], ['HALF PAST', 'HAF PAST', 'buçuk']]),
      L('a26_2', 'QUARTER', 'quarter', 'KUORtır', 'Çeyrek: çift sesli kelime', 'quarter → "kuortır": "qu" = "ku" kuralı burada da! quarter to nine = 9\'a çeyrek var.', [['QUARTER', 'KUORtır', 'çeyrek'], ['MINUTE', 'MİNıt', 'dakika']]),
      L('a26_3', 'TODAY / TOMORROW', 'today / tomorrow', 'tuDEY / tuMOrow', 'Bugün ve yarın: TO- ile başlayan kardeşler', 'today → "tudey", tomorrow → "tumorou". İkisi de "tu" ile başlar, vurgu son/orta hecede.', [['TODAY', 'tuDEY', 'bugün'], ['YESTERDAY', 'YES-tırdey', 'dün']]),
    ],
    readingDrills: [
      { word: "o'clock", correct: 'ıkLOK', distractors: ['OKLOK', 'OCLOCK', 'OKULOK'], tr: 'tam saat' },
      { word: 'quarter', correct: 'KUORtır', distractors: ['KUARTIR', 'KVARTER', 'KUORTEIR'], tr: 'çeyrek' },
      { word: 'minute', correct: 'MİNıt', distractors: ['MAYNUT', 'MİNİT', 'MİNUTE'], tr: 'dakika' },
      { word: 'today', correct: 'tuDEY', distractors: ['TODEY', 'TUDEY', 'TODAY'], tr: 'bugün' },
      { word: 'tomorrow', correct: 'tuMOrow', distractors: ['TOMORROW', 'TUMOROU', 'TOMAROU'], tr: 'yarın' },
    ],
  },
  {
    id: 'alpha_e27',
    title: 'Soru Kelimeleri',
    subtitle: 'WH- ekibi: what, where, when, who, why, how',
    letters: [
      L('a27_1', 'WHAT / WHERE', 'what / where', 'UOT / UER', 'W sessiz gibi ama var!', 'what → "uot", where → "uer". WH çoğunlukla "u" ile okunur (bazı Amerikan aksanında "hu").', [['WHAT', 'UOT', 'ne'], ['WHERE', 'UER', 'nerede']]),
      L('a27_2', 'WHO / WHY', 'who / why', 'HU / UAY', 'WHO: W tamamen sessiz!', 'who → "hu" — burada W duyulMAZ! why → "uay". Kural değil ezber: who özel!', [['WHO', 'HU', 'kim'], ['WHY', 'UAY', 'neden']]),
      L('a27_3', 'WHEN / HOW', 'when / how', 'UEN / HAU', 'Ne zaman ve nasıl', 'when → "uen", how → "hau". Soru cümlesi kurmanın temel taşıları.', [['WHEN', 'UEN', 'ne zaman'], ['HOW', 'HAU', 'nasıl']]),
    ],
    readingDrills: [
      { word: 'what', correct: 'UOT', distractors: ['VAT', 'UAT', 'WHAT'], tr: 'ne' },
      { word: 'where', correct: 'UER', distractors: ['VER', 'UERE', 'VEAR'], tr: 'nerede' },
      { word: 'who', correct: 'HU', distractors: ['UO', 'HUU', 'UHU'], tr: 'kim' },
      { word: 'why', correct: 'UAY', distractors: ['VAY', 'UAYI', 'UAI'], tr: 'neden' },
      { word: 'how', correct: 'HAU', distractors: ['HAU V', 'HOU', 'HAV'], tr: 'nasıl' },
    ],
  },
  {
    id: 'alpha_e28',
    title: 'Hava Durumu Okuma',
    subtitle: 'sunny, rainy, windy: havanın melodisi',
    letters: [
      L('a28_1', 'SUNNY / RAINY', 'sunny / rainy', 'SANi / REYni', 'Güneşli ve yağmurlu: çift N tek N gibi', 'sunny → "sani": çift ünsüz okunuşu UZATMAZ, sadece yazımdır.', [['SUNNY', 'SANi', 'güneşli'], ['RAINY', 'REYni', 'yağmurlu']]),
      L('a28_2', 'CLOUDY / WINDY', 'cloudy / windy', 'KLAUdi / UINdi', 'Bulutlu ve rüzgarlı', 'cloudy → "klaudi", windy → "uindi". Hava durumu bülteninin dörtlüsü tamam.', [['CLOUDY', 'KLAUdi', 'bulutlu'], ['WINDY', 'UINdi', 'rüzgarlı']]),
      L('a28_3', 'SNOW / STORM', 'snow / storm', 'SNOU / STORM', 'Kar ve fırtına: sert kelimeler', 'snow → "snou", storm → "storm". İkisi de sert ve patlamalı!', [['SNOW', 'SNOU', 'kar'], ['STORM', 'STORM', 'fırtına']]),
    ],
    readingDrills: [
      { word: 'sunny', correct: 'SANi', distractors: ['SUNI', 'SUNNY', 'SANİAY'], tr: 'güneşli' },
      { word: 'cloudy', correct: 'KLAUdi', distractors: ['CLUDI', 'KLAUDAY', 'CLOUDY'], tr: 'bulutlu' },
      { word: 'windy', correct: 'UINdi', distractors: ['VINDI', 'UINDAY', 'WINDY'], tr: 'rüzgarlı' },
      { word: 'snow', correct: 'SNOU', distractors: ['SNO', 'SNOVV', 'ŞNOU'], tr: 'kar' },
      { word: 'temperature', correct: 'TEMprıçır', distractors: ['TEMPERATUR', 'TEMPİRATYUR', 'TEMPIRAÇIR'], tr: 'sıcaklık' },
    ],
  },
  {
    id: 'alpha_e29',
    title: 'Yalancı Dostlar',
    subtitle: 'Sympathetic = sempatik DEĞİL!',
    letters: [
      L('a29_1', 'SYMPATHETIC', 'sympathetic', 'simpEθitik', 'Sempatik sanma: anlamı "başsağlığı veren"', 'sympathetic = "anlayışlı/acıyan" — Türkçedeki "sempatik" (charming) İngilizcede "likeable" veya "charming"!', [['SYMPATHETIC', 'simpEθitik', 'anlayışlı (sempatik değil!)'], ['CHARMING', 'ÇARming', 'sevimli (bizdeki sempatik)']]),
      L('a29_2', 'ACTUALLY', 'actually', 'EKçucli', '"Aktüel" sanma: "aslında" demek', 'actually = "aslında"! "Güncel" demek istiyorsan "current" de. Türkçeden gelen en büyük tuzak.', [['ACTUALLY', 'EKçucli', 'aslında'], ['CURRENT', 'KERınt', 'güncel']]),
      L('a29_3', 'PRETEND', 'pretend', 'pritEND', '"Pretendo" sanma: "numara yapmak"', 'pretend = "numara yapmak, -mış gibi yapmak". "İddia etmek" istiyorsan "claim" kullan!', [['PRETEND', 'pritEND', '-mış gibi yapmak'], ['CLAIM', 'KLEYM', 'iddia etmek']]),
    ],
    readingDrills: [
      { word: 'actually', correct: 'EKçucli', distractors: ['AKTUELI', 'AKÇULI', 'AKTUALİ'], tr: 'aslında' },
      { word: 'sympathetic', correct: 'simpEθitik', distractors: ['SIMPATETİK', 'SEMPATİK', 'SIMPATİK'], tr: 'anlayışlı' },
      { word: 'pretend', correct: 'pritEND', distractors: ['PRETEND', 'PRETENT', 'PRiTENT'], tr: '-mış gibi yapmak' },
      { word: 'sensible', correct: 'SENsıbıl', distractors: ['SENSİBİL', 'SENSAYBIL', 'SENSIBLE'], tr: 'akıllıca/mantıklı (hassas değil!)' },
      { word: 'gym', correct: 'CİM', distractors: ['GİM', 'JİM', 'GYM'], tr: 'spor salonu' },
    ],
  },
  {
    id: 'alpha_e30',
    title: 'Hız Okuma Finali',
    subtitle: 'Uzun kelimeler: parçala, vurguyu bul, söyle!',
    letters: [
      L('a30_1', 'INTERNATIONAL', 'international', 'inırNEŞınıl', 'Uluslararası: 5 hece, vurgu 3.\'te', 'in-ır-NE-şı-nıl: uzun kelimeleri VURGUDAN geriye doğru kur. "international" → "inırneşınıl".', [['INTERNATIONAL', 'inırNEŞınıl', 'uluslararası'], ['IMPORTANT', 'imPORtınt', 'önemli']]),
      L('a30_2', 'COMFORTABLE', 'comfortable', 'KAMFtıbıl', 'Rahat: yazılan 11 harf, duyulan 7 ses!', 'comfortable → "kamf-tı-bıl": "for" hecesi ERİR! En çok yanlış okunan kelimelerden.', [['COMFORTABLE', 'KAMFtıbıl', 'rahat'], ['CHOCOLATE', 'ÇOKlı t', 'çikolata']]),
      L('a30_3', 'VEGETABLE', 'vegetable', 'VECtıbıl', 'Sebze: E sessizleşir!', 'vegetable → "vek-tı-bıl" — "ve-ge-ta-ble" değil! Uzun İngilizce kelimelerin sırrı: hece erimeleridir.', [['VEGETABLE', 'VECtıbıl', 'sebze'], ['WEDNESDAY', 'UENZdey', 'çarşamba']]),
    ],
    readingDrills: [
      { word: 'international', correct: 'inırNEŞınıl', distractors: ['İNTERNEŞINAL', 'İNTERNASYONAL', 'İNİRNEŞİNİL'], tr: 'uluslararası' },
      { word: 'comfortable', correct: 'KAMFtıbıl', distractors: ['KOMFORTABLE', 'KAMFORTABIL', 'KOMFIRTABIL'], tr: 'rahat' },
      { word: 'vegetable', correct: 'VECtıbıl', distractors: ['VEJETABLE', 'VECETABIL', 'VEGETABİL'], tr: 'sebze' },
      { word: 'chocolate', correct: 'ÇOKlı t', distractors: ['ÇOKOLATE', 'ÇOKOLEYT', 'ÇOKOLATA'], tr: 'çikolata' },
      { word: 'interesting', correct: 'INtıristing', distractors: ['İNTERESTİNG', 'İNTERESTING', 'INTIRESTING'], tr: 'ilginç' },
      { word: 'restaurant', correct: 'REStıront', distractors: ['RESTORAN', 'RESTAURANT', 'RESTRONG'], tr: 'restoran' },
    ],
  },
];
