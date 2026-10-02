export type EnWord = [word: string, reading: string, tr: string, note: string];
export type EnSentence = [en: string, tr: string];
export type EnLine = [speaker: string, en: string, reading: string, tr: string];

export interface EnRawUnit {
  id: string;
  unitNumber: number;
  levelGroup: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C1/C2';
  title: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  grammarExplain: string;
  words: EnWord[];
  sentences: EnSentence[];
  sceneTitle?: string;
  sceneContext?: string;
  dialogue: EnLine[];
}

export const EN_UNITS_A: EnRawUnit[] = [
  {
    id: 'en_mod_a1_1',
    unitNumber: 1,
    levelGroup: 'A1',
    title: 'Selamlaşma & Tanışma',
    description: 'İlk tanışma, hal hatır sorma ve vedalaşma kalıpları',
    category: 'Gündelik Yaşam',
    color: '#8b5cf6',
    icon: '👋',
    grammarExplain: `📌 SELAMLAMA KALIPLARI:
1. "Hello" her ortamda güvenlidir; "Hi" daha samimidir (arkadaşlar arasında).
2. "Good morning" (sabah), "Good afternoon" (öğleden sonra), "Good evening" (akşam) selamlaşma; "Good night" ise VEDALAŞIRKEN kullanılır!
3. "How are you?" → cevabı: "I am fine, thank you. And you?" — klasik kalıp, eksiksiz ezberle.`,
    words: [
      ['hello', 'heLOU', 'merhaba', 'Her ortamda güvenli selam; telefonla da böyle açılır.'],
      ['hi', 'HAY', 'selam', 'Samimi ve kısa; resmi ortamda "Hello" tercih edilir.'],
      ['good morning', 'gud MORning', 'günaydın', 'Sabah ~12:00\'ye kadar; "morning" hecesi vurgulanır.'],
      ['good night', 'gud NAYT', 'iyi geceler', 'SADECE vedalaşırken; selam vermek için değil!'],
      ['please', 'PLIIZ', 'lütfen', 'Rica cümlesinin sonuna konur: "Tea, please."'],
      ['thank you', 'SENK yu', 'teşekkürler', 'Günlük dilde "thanks" de denir.'],
      ['sorry', 'SORi', 'özür dilerim', 'Üzgünüm + bir şey için özür: "Sorry, I am late."'],
      ['welcome', 'UELkım', 'hoş geldiniz', 'Karşılamada; "You are welcome" = "rica ederim".'],
      ['goodbye', 'gudBAY', 'hoşça kal', 'Kısa hâli "bye"; samimi vedalaşma.'],
      ['how are you', 'hau AR yu', 'nasılsın', 'Gerçek bir soru gibi de, selamlaşma kalıbı gibi de kullanılır.'],
    ],
    sentences: [
      ['Hello! How are you?', 'Merhaba! Nasılsın?'],
      ['Good morning, Anna!', 'Günaydın, Anna!'],
      ['Thank you very much.', 'Çok teşekkür ederim.'],
      ['I am fine, thank you.', 'İyiyim, teşekkürler.'],
    ],
    sceneTitle: 'First Meeting at the Café',
    sceneContext: 'Anna, Londra\'daki bir kafede Mark ile ilk kez tanışıyor.',
    dialogue: [
      ['Anna', 'Hi! I am Anna.', 'HAY! ay EM Ae-ne.', 'Selam! Ben Anna.'],
      ['Mark', 'Hello, Anna. I am Mark. Nice to meet you.', 'heLOU, Ae-ne. ay EM MARK. NAYS tu MIt yu.', 'Merhaba, Anna. Ben Mark. Tanıştığımıza memnun oldum.'],
      ['Anna', 'Nice to meet you, too. How are you?', 'NAYS tu MIt yu, TU. hau AR yu?', 'Ben de memnun oldum. Nasılsın?'],
      ['Mark', 'I am fine, thank you. And you?', 'ay EM FAYN, SENK yu. End yu?', 'İyiyim, teşekkürler. Ya sen?'],
      ['Anna', 'I am very well. Welcome to London!', 'ay EM VERi UEL. UELkım tu LANdın!', 'Çok iyiyim. Londra\'ya hoş geldin!'],
    ],
  },
  {
    id: 'en_mod_a1_2',
    unitNumber: 2,
    levelGroup: 'A1',
    title: 'Kendini Tanıtma',
    description: 'İsim, yaş, ülke ve "to be" (am/is/are) ile kendini anlatma',
    category: 'Gündelik Yaşam',
    color: '#38bdf8',
    icon: '🙋',
    grammarExplain: `📌 "TO BE" FİİLİ (am / is / are):
1. Türkçede "öğrenciyim" derken ek kullanırız; İngilizcede AYRI KELİME gelir: I am a student.
2. Kişilere göre: I am / you are / he-she-it is / we are / they are.
3. Olumsuzu: I am not, he is not (isn\'t), they are not (aren\'t).
4. "My name is..." = "Benim adım..." — kendini tanıtmanın standart kalıbı.`,
    words: [
      ['name', 'NEYM', 'isim', '"What is your name?" = "Adın ne?"'],
      ['first name', 'FERST neym', 'ad (ilk isim)', 'Batı düzeninde ad önce, soyadı sonra gelir.'],
      ['surname', 'SERneym', 'soyadı', '"last name" ve "family name" de denir.'],
      ['I am', 'ay EM', 'ben ...-im', 'Yaş, isim, şehir: "I am Ali. I am 25."'],
      ['you are', 'yu AR', 'sen ...-sin', 'Soru: "You are...?" değil, "Are you...?"'],
      ['he is', 'hi IZ', 'o ...-dır (eril)', 'Kısaltma: he\'s. "He is a doctor."'],
      ['she is', 'Şi IZ', 'o ...-dır (dişil)', 'Kısaltma: she\'s.'],
      ['from', 'FROM', '-den, -dan (memleket)', '"Where are you from?" = "Nerelisin?"'],
      ['live', 'LIV', 'yaşamak', '"I live in Istanbul." — şehir önünde "in".'],
      ['student', 'STYUdınt', 'öğrenci', 'Meslek öncesi "a" gelir: "I am a student."'],
    ],
    sentences: [
      ['My name is Anna.', 'Benim adım Anna.'],
      ['I am from Turkey.', 'Türkiyeliyim.'],
      ['She is my friend.', 'O benim arkadaşım.'],
      ['I live in London.', 'Londra\'da yaşıyorum.'],
    ],
    sceneTitle: 'Introductions at a Party',
    sceneContext: 'Bir ev partisinde Mark, Anna\'ya kendini ve arkadaşını tanıtıyor.',
    dialogue: [
      ['Mark', 'Hello! My name is Mark. What is your name?', 'heLOU! may NEYM IZ MARK. Vat İZ yor NEYM?', 'Merhaba! Benim adım Mark. Senin adın ne?'],
      ['Anna', 'Hi, Mark. I am Anna. I am from Italy.', 'HAY, MARK. ay EM Ae-ne. ay EM FROM iTA-li.', 'Selam, Mark. Ben Anna. İtalyalıyım.'],
      ['Mark', 'Nice! This is my friend Tom. He is a student.', 'NAYS! Dis İZ may FREND TOM. hi İZ e STYUdınt.', 'Güzel! Bu benim arkadaşım Tom. O bir öğrenci.'],
      ['Tom', 'Hi, Anna! Are you a student, too?', 'HAY, Ae-ne! AR yu e STYUdınt, TU?', 'Selam, Anna! Sen de öğrenci misin?'],
      ['Anna', 'No, I am not. I am a teacher. I live near the park.', 'NOU, ay EM NOT. ay EM e TIçır. ay LIV NIR de PARK.', 'Hayır, değilim. Öğretmenim. Parkın yakınında yaşıyorum.'],
    ],
  },
  {
    id: 'en_mod_a1_3',
    unitNumber: 3,
    levelGroup: 'A1',
    title: 'Aile',
    description: 'Aile üyeleri, sahiplik (my/your) ve "have got" yapısı',
    category: 'Gündelik Yaşam',
    color: '#f472b6',
    icon: '👨‍👩‍👧',
    grammarExplain: `📌 SAHİPLİK ve HAVE/HAS:
1. Sahiplik sıfatları: my (benim), your (senin), his (onun-eril), her (onun-dişil), our (bizim), their (onların).
2. "Have" çoğul şahıslarla, "has" he/she/it ile: I have a sister. / She has two brothers.
3. Meslekler her zaman "a/an" alır: "My father is an engineer." (sesli harfle başlayınca "an").`,
    words: [
      ['mother', 'MA-dır', 'anne', '"mom" (Amerikan) ve "mum" (İngiliz) samimi hâlleri.'],
      ['father', 'FA-dır', 'baba', 'Samimi: "dad".'],
      ['sister', 'SIS-tır', 'kız kardeş', 'Küçük/abla ayrımı yok; "older sister" denir.'],
      ['brother', 'BRA-dır', 'erkek kardeş', 'Konuşma dilinde kısalır: "bro".'],
      ['grandmother', 'GREND-ma-dır', 'babaanne / anneanne', 'Samimi: "grandma".'],
      ['grandfather', 'GREND-fa-dır', 'dede', 'Samimi: "grandpa".'],
      ['wife', 'UAYF', 'eş (kadın)', 'Çoğulu "wives" — f sesi v\'ye döner.'],
      ['husband', 'HAS-bınd', 'eş (erkek)', '"husband and wife" kalıp ikili.'],
      ['child', 'ÇAYLD', 'çocuk', 'Tekil "child", çoğul "children" — kural dışı!'],
      ['family', 'FEMI-li', 'aile', '"How many people are in your family?"'],
    ],
    sentences: [
      ['This is my mother.', 'Bu benim annem.'],
      ['I have one sister and two brothers.', 'Bir kız kardeşim ve iki erkek kardeşim var.'],
      ['My father is a teacher.', 'Babam öğretmen.'],
      ['We are a big family.', 'Biz kalabalık bir aileyiz.'],
    ],
    sceneTitle: 'Family Photo',
    sceneContext: 'Anna, Mark\'a telefonundaki aile fotoğrafını gösteriyor.',
    dialogue: [
      ['Anna', 'Look! This is my family.', 'LUK! Dis İZ may FEMI-li.', 'Bak! Bu benim ailem.'],
      ['Mark', 'Wow! Is this your mother? She is very young!', 'UAU! İZ Dis yor MA-dır? Şi İZ VERi YANG!', 'Vay! Bu senin annen mi? Çok genç!'],
      ['Anna', 'Yes, and this is my father. He is an engineer.', 'YES, end Dis İZ may FA-dır. Hi İZ en ENcinIR.', 'Evet, bu da babam. O bir mühendis.'],
      ['Mark', 'Do you have any brothers or sisters?', 'Du yu HEV ENi BRA-dırz OR SIS-tırz?', 'Erkek ya da kız kardeşin var mı?'],
      ['Anna', 'I have one sister. She is five years old.', 'ay HEV UAN SIS-tır. Şi İZ FAYF YIRZ OLD.', 'Bir kız kardeşim var. Beş yaşında.'],
    ],
  },
  {
    id: 'en_mod_a1_4',
    unitNumber: 4,
    levelGroup: 'A1',
    title: 'Sayılar, Yaş & Saat',
    description: 'Yaş söyleme, saat sorma ve zaman zarfları (today, tomorrow)',
    category: 'Gündelik Yaşam',
    color: '#06b6d4',
    icon: '🔢',
    grammarExplain: `📌 YAŞ ve SAAT KALIPLARI:
1. Yaş: "I am twenty-five years old." — Türkçedeki gibi "have" KULLANILMAZ: "I have 25" YANLIŞ!
2. Saat: "What time is it?" → "It is five o\'clock." / "It is half past six." (6:30) / "It is quarter to nine." (8:45).
3. Tarih/zaman ifadeleri: at + saat (at seven), on + gün (on Monday), in + ay/yıl (in May, in 2025).`,
    words: [
      ['number', 'NAMbır', 'sayı, numara', '"phone number" = telefon numarası.'],
      ['age', 'EYC', 'yaş', '"What is your age?" resmi; günlükte "How old are you?"'],
      ['year', 'YIR', 'yıl', '"years old" kalıbının parçası.'],
      ['today', 'tuDEY', 'bugün', '"Today is Monday."'],
      ['tomorrow', 'tuMOrow', 'yarın', '"See you tomorrow!" = "Yarın görüşürüz!"'],
      ['yesterday', 'YES-tırdey', 'dün', 'Zaman zarfı; cümle sonunda durur.'],
      ['when', 'UEN', 'ne zaman', '"When is the meeting?"'],
      ['time', 'TAYM', 'zaman, saat', '"What time...?" kalıbıyla saat sorulur.'],
      ['now', 'NAU', 'şimdi', 'Şu anda olan things için.'],
      ["o'clock", "ıkLOK", 'tam saat', '"It is seven o\'clock." = "Saat tam yedi."'],
    ],
    sentences: [
      ['I am twenty-five years old.', 'Yirmi beş yaşındayım.'],
      ['What time is it? It is five o\'clock.', 'Saat kaç? Saat beş.'],
      ['Today is Monday.', 'Bugün pazartesi.'],
      ['See you tomorrow!', 'Yarın görüşürüz!'],
    ],
    sceneTitle: 'Coffee Time',
    sceneContext: 'Mark ve Anna kahve içerken saat ve plan konuşuyor.',
    dialogue: [
      ['Mark', 'What time is it now?', 'Vat TAYM İZ İT NAU?', 'Şu an saat kaç?'],
      ['Anna', 'It is half past three. Coffee time!', 'İT İZ HAF PAST TRII. KOFi TAYM!', 'Üç buçuk. Kahve zamanı!'],
      ['Mark', 'Great! When is your English class tomorrow?', 'GREYT! Uen İZ yor ING-liş KLAS tuMOrow?', 'Harika! Yarın İngilizce dersin saat kaçta?'],
      ['Anna', 'It starts at nine o\'clock, so I get up early.', 'İT STARTS et NAYN ıkLOK, sou ay GET AP ER-li.', 'Dokuzda başlıyor, o yüzden erken kalkıyorum.'],
      ['Mark', 'Good luck! See you tomorrow.', 'GUD LAK! SI yu tuMOrow.', 'İyi şanslar! Yarın görüşürüz.'],
    ],
  },
  {
    id: 'en_mod_a1_5',
    unitNumber: 5,
    levelGroup: 'A1',
    title: 'Renkler & Görünüm',
    description: 'Renkler, boyut sıfatları ve sıfat dizilişi',
    category: 'Gündelik Yaşam',
    color: '#f59e0b',
    icon: '🎨',
    grammarExplain: `📌 SIFATLAR NEREDE DURUR?
1. İngilizcede sıfat İSİMDEN ÖNCE gelir: "a red apple" (kırmızı bir elma). Türkçede tam tersi: "kırmızı bir elma".
2. Sıfat hiçbir zaman çoğul eki ALMAZ: "red apples" ✓ / "reds apples" ✗.
3. Birden fazla sıfat varsa genel sıra: görüş-güzellik → boyut → renk: "a beautiful big blue house".`,
    words: [
      ['red', 'RED', 'kırmızı', '"The apple is red." — sıfat, isimden önce de gelebilir.'],
      ['blue', 'BLU', 'mavi', '"The sky is blue."'],
      ['green', 'GRIIN', 'yeşil', '"green tea" = yeşil çay.'],
      ['yellow', 'YELOU', 'sarı', '"yellow cab" = New York taksileri.'],
      ['black', 'BLEK', 'siyah', '"black coffee" = süt süzsüz kahve.'],
      ['white', 'UAYT', 'beyaz', '"W" sessiz harf: UAYT okunur, "vayt" değil!'],
      ['big', 'BIG', 'büyük', 'Zıt anlamlısı: "small".'],
      ['small', 'SMOL', 'küçük', '"little" daha sevimli-duygusal bir küçüklük.'],
      ['beautiful', 'BYUUtıfıl', 'güzel', 'İnsan ve eşya için; "handsome" erkekler için.'],
      ['color', 'KAH-lır', 'renk', '"What is your favorite color?"'],
    ],
    sentences: [
      ['The sky is blue.', 'Gökyüzü mavi.'],
      ['I have a small black cat.', 'Küçük siyah bir kedim var.'],
      ['This flower is beautiful.', 'Bu çiçek güzel.'],
      ['What is your favorite color?', 'En sevdiğin renk ne?'],
    ],
    sceneTitle: 'Shopping for a Jacket',
    sceneContext: 'Anna bir mağazada ceket beğeniyor.',
    dialogue: [
      ['Anna', 'Look at this jacket! I love the color.', 'LUK et Dis CEKıt! ay LAV de KAH-lır.', 'Şu cevete bak! Rengini çok sevdim.'],
      ['Mark', 'The blue one? It is beautiful.', 'De BLU UAN? İT İZ BYUUtıfıl.', 'Mavi olan mı? Çok güzel.'],
      ['Anna', 'But it is too big for me. I need a small size.', 'BAT İT İZ TU BIG for Mİ. ay NID e SMOL SAYZ.', 'Ama bana çok büyük. Küçük bedene ihtiyacım var.'],
      ['Mark', 'What about this one? It is small and black.', 'Vat eBAUT Dis UAN? İT İZ SMOL end BLEK.', 'Şuna ne dersin? Küçük ve siyah.'],
      ['Anna', 'Perfect! Black is my favorite color.', 'PERfikt! BLEK İZ may FEYvırit KAH-lır.', 'Mükemmel! Siyah en sevdiğim renk.'],
    ],
  },
  {
    id: 'en_mod_a1_6',
    unitNumber: 6,
    levelGroup: 'A1',
    title: 'Yiyecek & İçecek',
    description: 'Temel yiyecekler, "some" ve açlık/tokluk ifadeleri',
    category: 'Gündelik Yaşam',
    color: '#10b981',
    icon: '🍎',
    grammarExplain: `📌 SOME ve AÇLIK/TOKLUK:
1. Sayılamayan şeylerden bahsederken "some" kullanılır: some water, some bread, some tea.
2. Açlık "to be" ile verilir: "I am hungry." — "I have hungry" KESİNLİKLE YANLIŞ!
3. Soruda/olumsuzda "some" → "any" olur: "Do you want any tea?" / "I don\'t have any milk."`,
    words: [
      ['water', 'UO-tır', 'su', '"a glass of water" = bir bardak su.'],
      ['bread', 'BRED', 'ekmek', '"a loaf of bread" = bir somun ekmek.'],
      ['milk', 'MILK', 'süt', '"with milk" = sütlü (kahve için).'],
      ['apple', 'EPıl', 'elma', '"An apple a day..." ünlü deyiş.'],
      ['cheese', 'ÇIIZ', 'peynir', '"ch" burada Ç sesi verir.'],
      ['coffee', 'KOFi', 'kahve', 'Türkçe "kahve" kelimesi buradan gelir!'],
      ['tea', 'TII', 'çay', 'Okunuşu "ti:" — "te-a" değil.'],
      ['hungry', 'HANGri', 'aç', '"I am hungry" = karnım aç.'],
      ['delicious', 'dilİŞıs', 'lezzetli', 'Yemek övgüsünün 1 numarası.'],
      ['eat', 'IIT', 'yemek (fiil)', '"Let\'s eat!" = "Hadi yiyelim!"'],
    ],
    sentences: [
      ["I am hungry. Let's eat.", 'Açım. Hadi yiyelim.'],
      ['I drink coffee every morning.', 'Her sabah kahve içerim.'],
      ['This soup is delicious!', 'Bu çorba çok lezzetli!'],
      ['Do you want some tea?', 'Biraz çay ister misin?'],
    ],
    sceneTitle: 'Breakfast Together',
    sceneContext: 'Kahvaltı masasında Anna ve Mark.',
    dialogue: [
      ['Anna', 'I am so hungry! What do we have?', 'ay EM SOU HANGri! Vat du ui HEV?', 'Çok açım! Ne var yiyecek?'],
      ['Mark', 'Bread, cheese and eggs. And some apple juice.', 'BRED, ÇIIZ end EGZ. End sam EPıl CUUS.', 'Ekmek, peynir ve yumurta. Ve biraz elma suyu.'],
      ['Anna', 'Perfect. Do you want coffee or tea?', 'PERfikt. Du yu UANT KOFi OR TII?', 'Mükemmel. Kahve mi çay mı istersin?'],
      ['Mark', 'Coffee with milk, please. This cheese is delicious!', 'KOFi vid MILK, PLIIZ. Dis ÇIIZ İZ dilİŞıs!', 'Sütlü kahve, lütfen. Bu peynir çok lezzetli!'],
      ['Anna', 'My mother makes it. I will bring more bread.', 'may MA-dır MEYKS İT. ay UİL BRING MOR BRED.', 'Annem yapıyor. Daha fazla ekmek getireceğim.'],
    ],
  },
  {
    id: 'en_mod_a1_7',
    unitNumber: 7,
    levelGroup: 'A1',
    title: 'Ev & Eşyalar',
    description: 'Ev bölümleri ve "there is / there are" (var-yok) yapısı',
    category: 'Gündelik Yaşam',
    color: '#a78bfa',
    icon: '🏠',
    grammarExplain: `📌 THERE IS / THERE ARE — VAR-YOK:
1. Tekil için "there is", çoğul için "there are": There is a key on the table. / There are two windows.
2. Olumsuz: There isn\'t a lamp. / There aren\'t any chairs.
3. Soru: Is there a bathroom? / Are there any beds?
4. Türkçedeki "odaDA iki pencere VAR" kalıbının İngilizcesi tamamen bu yapıdır — sahiplik (have) ile karıştırma!`,
    words: [
      ['house', 'HAUS', 'ev', '"home" daha duygusal: "ev (sıcak yuva)".'],
      ['room', 'RUUM', 'oda', '"bedroom" = yatak odası.'],
      ['kitchen', 'KIÇın', 'mutfak', '"ch" = Ç sesi.'],
      ['door', 'DOR', 'kapı', '"the door is open" = kapı açık.'],
      ['window', 'UINDOU', 'pencere', '"wind" (rüzgar) + "ow".'],
      ['table', 'TEYbıl', 'masa', '"at the table" = masada.'],
      ['chair', 'ÇEIR', 'sandalye', '"sit on a chair" = sandalyeye otur.'],
      ['bed', 'BED', 'yatak', '"go to bed" = yatağa git (uyumak).'],
      ['key', 'KII', 'anahtar', '"the key to the door".'],
      ['bathroom', 'BASrum', 'banyo', '"Where is the bathroom?" hayat kurtaran soru.'],
    ],
    sentences: [
      ['My house is small but beautiful.', 'Evim küçük ama güzel.'],
      ['The key is on the table.', 'Anahtar masanın üstünde.'],
      ['There are two windows in the kitchen.', 'Mutfakta iki pencere var.'],
      ['I read books in my room.', 'Odamda kitap okurum.'],
    ],
    sceneTitle: 'A New Flat',
    sceneContext: 'Mark yeni taşındığı dairesini Anna\'ya gösteriyor.',
    dialogue: [
      ['Anna', 'Your house is beautiful! How many rooms are there?', 'yor HAUS İZ BYUUtıfıl! HAU MENi RUUMZ AR DER?', 'Evin çok güzel! Kaç oda var?'],
      ['Mark', 'There are three rooms, a kitchen and a bathroom.', 'DER AR TRII RUUMZ, e KIÇın end e BASrum.', 'Üç oda, bir mutfak ve bir banyo var.'],
      ['Anna', 'Is there a big window in the kitchen?', 'İZ DER e BIG UINDOU in de KIÇın?', 'Mutfakta büyük bir pencere var mı?'],
      ['Mark', 'Yes, and there is a small table near the window.', 'YES, end DER İZ e SMOL TEYbıl NIR de UINDOU.', 'Evet, pencerenin yanında küçük bir masa da var.'],
      ['Anna', 'I love it! Where is the bathroom?', 'ay LAV İT! UER İZ de BASrum?', 'Bayıldım! Banyo nerede?'],
    ],
  },
  {
    id: 'en_mod_a1_8',
    unitNumber: 8,
    levelGroup: 'A1',
    title: 'Günlük Rutin & Günler',
    description: 'Haftanın günleri, frekans zarfları ve 3. tekil -s kuralı',
    category: 'Gündelik Yaşam',
    color: '#22d3ee',
    icon: '📅',
    grammarExplain: `📌 PRESENT SIMPLE — 3. TEKİL -S:
1. He / She / It ile fiile -s eklenir: he works, she gets up.
2. Soru/olumsuzda "does" gelir ve fiil YALIN kalır: "Does he work?" / "She doesn\'t work." (works ✗).
3. Frekans zarfları (always, usually, often, never) fiilden ÖNCE gelir: "I always get up at seven." — Türkçedeki "her zaman kalkarım" yerini alır.`,
    words: [
      ['get up', 'GET AP', '(yataktan) kalkmak', '"I get up at seven."'],
      ['always', 'OLueyz', 'her zaman', 'Fiilden önce: "I always drink tea."'],
      ['usually', 'YUJueli', 'genellikle', '"usually" okunuşuna dikkat: YUJueli.'],
      ['morning', 'MORning', 'sabah', '"in the morning" = sabahleyin.'],
      ['evening', 'IIVning', 'akşam', '"in the evening" = akşamleyin.'],
      ['weekend', 'UIKend', 'hafta sonu', '"at the weekend" (İngiliz) / "on the weekend" (Amerikan).'],
      ['early', 'ER-li', 'erken', 'Hem sıfat hem zarf: "an early bus".'],
      ['late', 'LEYT', 'geç', '"Sorry, I am late!"'],
      ['busy', 'BIzi', 'meşgul', '"I am busy" = meşgulüm.'],
      ['watch', 'UAÇ', 'izlemek', '"watch a film" ama "see a film at the cinema".'],
    ],
    sentences: [
      ['I always get up at seven.', 'Her zaman yedide kalkarım.'],
      ['She is busy in the morning.', 'O, sabahları meşgul.'],
      ['We watch films at the weekend.', 'Hafta sonu film izleriz.'],
      ['He comes home late.', 'O, eve geç gelir.'],
    ],
    sceneTitle: 'A Day in London',
    sceneContext: 'Anna ve Mark bir haftanın nasıl geçtiğini anlatıyor.',
    dialogue: [
      ['Mark', 'You are always so busy! When do you get up?', 'yu AR OLueyz SOU BIzi! Uen du yu GET AP?', 'Sen her zaman çok meşgulsün! Ne zaman kalkıyorsun?'],
      ['Anna', 'I get up at six and go running in the morning.', 'ay GET AP et SIKS end GOU RANing in de MORning.', 'Altıda kalkıyorum ve sabah koşuya gidiyorum.'],
      ['Mark', 'Wow! I usually get up late at the weekend.', 'UAU! ay YUJueli GET AP LEYT et de UIKend.', 'Vay! Ben hafta sonu genelde geç kalkıyorum.'],
      ['Anna', 'And what do you do in the evening?', 'End VAT du yu DU in de IIVning?', 'Peki akşamları ne yaparsın?'],
      ['Mark', 'I watch films or read books. I am never bored!', 'ay UAÇ FILMS or RIID BUKS. ay EM NEver BORD!', 'Film izlerim ya da kitap okurum. Asla sıkılmam!'],
    ],
  },
  {
    id: 'en_mod_a2_9',
    unitNumber: 9,
    levelGroup: 'A2',
    title: 'Şehirde Yol Sorma',
    description: 'Yön tarifleri ve yer edatları (next to, near, between)',
    category: 'Şehir & Seyahat',
    color: '#3b82f6',
    icon: '🗺️',
    grammarExplain: `📌 YER EDATLARI:
1. in (içinde), on (üstünde), at (noktada): in the city / on the street / at the station.
2. next to (yanında), near (yakınında), between (arasında), opposite (karşısında), behind (arkasında).
3. Kibar yol sorma kalıbı: "Excuse me, how do I get to the station?" — "Where is..." dan daha kibar ve doğal.`,
    words: [
      ['street', 'STRIIT', 'sokak', '"on Baker Street" — sokak adları önünde "on".'],
      ['left', 'LEFT', 'sol', '"turn left" = sola dön.'],
      ['right', 'RAYT', 'sağ', '"turn right" = sağa dön; "right" aynı zamanda "haklı".'],
      ['straight on', 'STREYT ON', 'dosdoğru ileri', '"Go straight on." = "Doğru devam et."'],
      ['near', 'NIR', 'yakın, yakınında', '"near the park" = parkın yakınında.'],
      ['far', 'FAR', 'uzak', '"Is it far?" = "Uzak mı?"'],
      ['corner', 'KORnır', 'köşe', '"at the corner" = köşede.'],
      ['map', 'MEP', 'harita', '"on the map" = haritada.'],
      ['station', 'STEYşın', 'istasyon', '"train station" = tren garı.'],
      ['next to', 'NEKS tu', 'yanında', '"The bank is next to the shop."'],
    ],
    sentences: [
      ['Excuse me, where is the station?', 'Affedersiniz, istasyon nerede?'],
      ['Turn left at the corner.', 'Köşeden sola dönün.'],
      ['The bank is next to the shop.', 'Banka dükkânın yanında.'],
      ['Go straight on for two minutes.', 'İki dakika doğruca ilerleyin.'],
    ],
    sceneTitle: 'Lost in the City',
    sceneContext: 'Anna şehirde kaybolmuş, bir yayadan yol soruyor.',
    dialogue: [
      ['Anna', 'Excuse me, how do I get to the train station?', 'EkSKYUZ Mİ, hau du ay GET tu de TREYN STEYşın?', 'Affedersiniz, tren garına nasıl gidebilirim?'],
      ['Man', 'Go straight on and turn left at the corner.', 'GOU STREYT ON end TERn LEFT et de KORnır.', 'Doğru devam edin ve köşeden sola dönün.'],
      ['Anna', 'Is it far from here?', 'İZ İT FAR from HIR?', 'Buradan uzak mı?'],
      ['Man', 'Not really. It is next to the big library, near the park.', 'NOT RII-li. İT İZ NEKS tu de BIG LAYbreri, NIR de PARK.', 'Pek değil. Büyük kütüphanenin yanında, parkın yakınında.'],
      ['Anna', 'Thank you so much!', 'SENK yu SOU MAÇ!', 'Çok teşekkür ederim!'],
    ],
  },
  {
    id: 'en_mod_a2_10',
    unitNumber: 10,
    levelGroup: 'A2',
    title: 'Alışveriş & Para',
    description: 'Fiyat sorma, pazarlık ve "can I...?" kibar istekleri',
    category: 'Gündelik Yaşam',
    color: '#f97316',
    icon: '🛍️',
    grammarExplain: `📌 MİKTAR SORMA ve KİBAR İSTEK:
1. Sayılamayanlar "How much", sayılabilenler "How many": How much is this? / How many do you want?
2. Kibar istek: "Can I pay by card?" / "Could I try it on?" — "Could" daha resmi ve kibar.
3. "too" (fazla — negatif) ile "very" (çok) ayrımı: "too expensive" = istemeyeceğim kadar pahalı.`,
    words: [
      ['price', 'PRAYS', 'fiyat', '"What is the price?" resmi; günlükte "How much is it?"'],
      ['cheap', 'ÇIIP', 'ucuz', '"cheaper than..." karşılaştırma: -er alır.'],
      ['expensive', 'ikSPENsiv', 'pahalı', '"more expensive than..." — uzun sıfat "more" alır.'],
      ['buy', 'BAY', 'satın almak', 'Düzensiz geçmiş: buy → bought.'],
      ['pay', 'PEY', 'ödemek', '"pay by card" = kartla ödemek.'],
      ['money', 'MANi', 'para', '"How much money do you have?"'],
      ['shop', 'ŞOP', 'dükkân; alışveriş yapmak', '"go shopping" = alışverişe çıkmak.'],
      ['size', 'SAYZ', 'beden, boyut', '"Do you have a bigger size?"'],
      ['discount', 'DISkaunt', 'indirim', '"Is there a discount?" — pazarlığın kelimesi.'],
      ['receipt', 'riSIIT', 'fiş, makbuz', 'Okunuşu dikkat: "p" SES VERMEZ!'],
    ],
    sentences: [
      ['How much is this jacket?', 'Bu ceket ne kadar?'],
      ['It is too expensive. Do you have a discount?', 'Bu çok pahalı. İndirim var mı?'],
      ['Can I pay by card?', 'Kartla ödeyebilir miyim?'],
      ['I need a bigger size.', 'Daha büyük bir bedene ihtiyacım var.'],
    ],
    sceneTitle: 'At the Market',
    sceneContext: 'Mark bir pazarda hediyelik bakıyor.',
    dialogue: [
      ['Mark', 'Excuse me, how much is this scarf?', 'EkSKYUZ Mİ, hau MAÇ İZ Dis SKARF?', 'Affedersiniz, bu atkı ne kadar?'],
      ['Seller', 'It is twenty pounds, my friend.', 'İT İZ TUEnti PAUNDZ, may FREND.', 'Yirmi sterlin, dostum.'],
      ['Mark', 'Hmm, that is a bit expensive. Is there a discount?', 'MM, det İZ e BIT ikSPENsiv. İZ DER e DISkaunt?', 'Hmm, biraz pahalı. İndirim var mı?'],
      ['Seller', 'For you, eighteen pounds. It is handmade!', 'For YU, EYTİN PAUNDZ. İT İZ HENDmeyd!', 'Sana on sekiz sterlin. El yapımı bu!'],
      ['Mark', 'Perfect, I will take it. Can I pay by card?', 'PERfikt, ay UİL TEYK İT. Ken ay PEY bay KARD?', 'Mükemmel, alıyorum. Kartla ödeyebilir miyim?'],
    ],
  },
  {
    id: 'en_mod_a2_11',
    unitNumber: 11,
    levelGroup: 'A2',
    title: 'Seyahat & Havalimanı',
    description: 'Uçuş, bilet ve varış ifadeleri; at/on/in zaman edatları',
    category: 'Şehir & Seyahat',
    color: '#0ea5e9',
    icon: '✈️',
    grammarExplain: `📌 ZAMAN EDATLARI (at / on / in):
1. at + saat: at six o\'clock, at half past two.
2. on + gün/tarih: on Monday, on 5th May.
3. in + ay/yıl/uzun dönem: in June, in 2025, in the morning.
4. "on time" = zamanında (planlandığı gibi); "in time" = tam vaktinde (geç kalmadan).`,
    words: [
      ['ticket', 'TIKıt', 'bilet', '"a ticket to London" — yön için "to".'],
      ['flight', 'FLAYT', 'uçuş', '"The flight is delayed." = Uçuş ertelendi.'],
      ['luggage', 'LAGıc', 'bagaj', 'Sayılamaz: "much luggage" ✓, "luggages" ✗.'],
      ['passport', 'PASport', 'pasaport', '"show your passport" = pasaportunu göster.'],
      ['gate', 'GEYT', 'kapı (uçuş kapısı)', '"Gate 12" = 12 numaralı kapı.'],
      ['delay', 'dilEY', 'gecikme, rötar', '"a two-hour delay" = iki saatlik rötar.'],
      ['arrive', 'erAYV', 'varmak', '"arrive in London" (şehir) / "at the airport" (yer).'],
      ['journey', 'CIRni', 'yolculuk', '"Have a safe journey!" = İyi yolculuklar!'],
      ['on time', 'on TAYM', 'zamanında', '"The bus is on time."'],
      ['board', 'BORD', 'uçağa binmek', '"We are boarding now." = Biniyoruz.'],
    ],
    sentences: [
      ['My flight is at half past six.', 'Uçuşum altı buçukta.'],
      ['The train arrives at nine o\'clock.', 'Tren dokuzda varıyor.'],
      ['Where is gate twelve?', 'On iki numaralı kapı nerede?'],
      ['The flight is delayed, unfortunately.', 'Ne yazık ki uçuş rötarlı.'],
    ],
    sceneTitle: 'At the Airport',
    sceneContext: 'Anna havalimanında check-in yapıyor.',
    dialogue: [
      ['Staff', 'Good morning! Your passport, please.', 'gud MORning! yor PASport, PLIIZ.', 'Günaydın! Pasaportunuz lütfen.'],
      ['Anna', 'Here you are. Is the flight on time?', 'HİR yu AR. İz de FLAYT on TAYM?', 'Buyurun. Uçuş zamanında mı?'],
      ['Staff', 'There is a small delay. Boarding starts at ten past seven.', 'DER İZ e SMOL dilEY. BORDing STARTS et ten PAST SEVın.', 'Küçük bir rötar var. Biniş yediyi on geçe başlıyor.'],
      ['Anna', 'I see. Where is my gate?', 'ay SII. UER İZ may GEYT?', 'Anladım. Kapım nerede?'],
      ['Staff', 'Gate twelve, near the café. Have a safe journey!', 'GEYT TUELv, NIR de KAFE. HEV e SEYF CIRni!', 'On iki numaralı kapı, kafenin yanında. İyi yolculuklar!'],
    ],
  },
  {
    id: 'en_mod_a2_12',
    unitNumber: 12,
    levelGroup: 'A2',
    title: 'Restoran & Sipariş',
    description: 'Menü, sipariş verme ve "I would like" kibarlığı',
    category: 'Gündelik Yaşam',
    color: '#ef4444',
    icon: '🍽️',
    grammarExplain: `📌 "I WOULD LIKE..." — KİBAR SİPARİŞ:
1. "I want..." doğrudan ve kaba durabilir; restoranda "I would like..." (kısaltma: I\'d like...) kullanılır.
2. Soru teklifi: "Would you like some dessert?" → "Yes, please." / "No, thank you."
3. "Could we have the bill, please?" — hesap isterken standart kalıp.`,
    words: [
      ['menu', 'MENyu', 'menü', '"Could we see the menu, please?"'],
      ['order', 'ORdır', 'sipariş vermek', '"Are you ready to order?"'],
      ['waiter', 'UEYtır', 'garson', 'Dişili: "waitress".'],
      ['bill', 'BIL', 'hesap', 'Amerika\'da "check" denir.'],
      ['tip', 'TIP', 'bahşiş', 'ABD\'de neredeyse zorunlu (%15-20).'],
      ['starter', 'STARTır', 'başlangıç yemeği', 'İngiliz menü düzeni: starter → main course → dessert.'],
      ['main course', 'meyn KORS', 'ana yemek', 'Menünün kalbi.'],
      ['dessert', 'dizERT', 'tatlı', 'Okunuşu: "dezert"; "desert" (çöl) ile karıştırma!'],
      ['reserve', 'rizERV', 'rezerve etmek', '"a table for two" = iki kişilik masa.'],
      ['taste', 'TEYST', 'tat, lezzet; tatmak', '"It tastes great!" = Harika tadı var!'],
    ],
    sentences: [
      ['Could we see the menu, please?', 'Menüyü görebilir miyiz lütfen?'],
      ['I would like the tomato soup.', 'Domates çorbası istiyorum.'],
      ['The bill, please.', 'Hesap, lütfen.'],
      ['This steak tastes amazing.', 'Bu bifteğin tadı inanılmaz.'],
    ],
    sceneTitle: 'Dinner for Two',
    sceneContext: 'Anna ve Mark akşam yemeği için masaya oturuyor.',
    dialogue: [
      ['Waiter', 'Good evening! A table for two?', 'gud IIVning! e TEYbıl for TUU?', 'İyi akşamlar! İki kişilik masa mı?'],
      ['Mark', 'Yes, we have a reservation. The name is Mark.', 'YES, ui HEV e rezırVEYşın. de NEYM İZ MARK.', 'Evet, rezervasyonumuz var. İsim Mark.'],
      ['Waiter', 'Perfect. Here are the menus. Are you ready to order?', 'PERfikt. HİR AR de MENyuz. AR yu REDi tu ORdır?', 'Mükemmel. Menüler burada. Sipariş vermeye hazır mısınız?'],
      ['Anna', 'I would like the tomato soup and the fish, please.', 'ay UUD LAYK de tomAYto SUUP end de FIŞ, PLIIZ.', 'Domates çorbası ve balık istiyorum, lütfen.'],
      ['Mark', 'And for me, the steak. Could we have some water, too?', 'End for Mİ, de STEYK. KUD ui HEV sam UO-tır, TU?', 'Ben de biftek. Biraz su da alabilir miyiz?'],
    ],
  },
  {
    id: 'en_mod_a2_13',
    unitNumber: 13,
    levelGroup: 'A2',
    title: 'Sağlık & Vücut',
    description: 'Hastalık belirtileri anlatma ve "should" ile tavsiye',
    category: 'Sağlık',
    color: '#14b8a6',
    icon: '🩺',
    grammarExplain: `📌 HASTALIK ve TAVSİYE:
1. Rahatsızlık "have" ile: "I have a headache / a fever / a cold." ("I am headache" ✗).
2. Tavsiye "should" ile: "You should see a doctor." / "You shouldn\'t work today."
3. "ache" eki: headache, toothache, stomachache — sürekli ağrı türleri.`,
    words: [
      ['doctor', 'DOKtır', 'doktor', '"see a doctor" = doktora görünmek.'],
      ['pain', 'PEYN', 'ağrı, sızı', '"a pain in my back" = sırtımda ağrı.'],
      ['medicine', 'MEDsın', 'ilaç', '"Take this medicine twice a day."'],
      ['headache', 'HEDeyk', 'baş ağrısı', '"head" + "ache" birleşik kelime.'],
      ['fever', 'FIIvır', 'ateş', '"I have a high fever."'],
      ['pharmacy', 'FARmısı', 'eczane', 'ABD\'de "drugstore" denir.'],
      ['appointment', 'epOYNtment', 'randevu', '"make an appointment" = randevu almak.'],
      ['healthy', 'HELdi', 'sağlıklı', '"stay healthy" = sağlıklı kal.'],
      ['exercise', 'EKsırsayz', 'egzersiz', 'Hem isim hem fiil.'],
      ['rest', 'REST', 'dinlenmek; dinlenme', '"You need a good rest."'],
    ],
    sentences: [
      ['I have a headache and a fever.', 'Baş ağrım ve ateşim var.'],
      ['You should see a doctor.', 'Bir doktora görünmelisin.'],
      ['Take this medicine twice a day.', 'Bu ilacı günde iki kez al.'],
      ['Exercise is good for your health.', 'Egzersiz sağlığa iyidir.'],
    ],
    sceneTitle: 'At the Doctor',
    sceneContext: 'Anna kendini iyi hissetmiyor ve doktora gidiyor.',
    dialogue: [
      ['Doctor', 'Hello, what seems to be the problem?', 'heLOU, VAT SIIMZ tu Bİ de PROBlim?', 'Merhaba, sorun nedir?'],
      ['Anna', 'I have a headache and a fever since yesterday.', 'ay HEV e HEDeyk end e FIIvır SINS YES-tırdey.', 'Dünden beri baş ağrım ve ateşim var.'],
      ['Doctor', 'You should rest and drink lots of water.', 'yu ŞUD REST end DRINK LOTS ıv UO-tır.', 'Dinlenmeli ve bol su içmelisin.'],
      ['Anna', 'Should I take any medicine?', 'ŞUD ay TEYK ENi MEDsın?', 'İlaç almalı mıyım?'],
      ['Doctor', 'Yes, take this twice a day. If the fever continues, make another appointment.', 'YES, TEYK Dis TUAIS e DEY. İF de FIIvır konTİNyuz, MEYK enADır epOYNtment.', 'Evet, bunu günde iki kez al. Ateş devam ederse tekrar randevu al.'],
    ],
  },
  {
    id: 'en_mod_a2_14',
    unitNumber: 14,
    levelGroup: 'A2',
    title: 'Hava Durumu & Mevsimler',
    description: 'Hava durumu anlatma ("it" kullanımı) ve mevsimler',
    category: 'Gündelik Yaşam',
    color: '#93c5fd',
    icon: '🌤️',
    grammarExplain: `📌 HAVA DURUMUNDA "IT":
1. İngilizcede hava her zaman "it" ile anlatılır: "It is sunny." / "It is raining." — Türkçedeki "hava güzel" öznesiz yapıya benzemez!
2. "rain/snow" fiil olarak: "It often rains in April." (genel) / "It is raining now." (şu an).
3. "in spring/summer..." — mevsimlerden önce edat YOK denecek kadar yaygın: "in the summer" da olur.`,
    words: [
      ['sunny', 'SANi', 'güneşli', '"It is sunny today."'],
      ['rainy', 'REYni', 'yağmurlu', '"a rainy day" = yağmurlu bir gün.'],
      ['cloudy', 'KLAUdi', 'bulutlu', '"The sky is cloudy."'],
      ['snow', 'SNOU', 'kar; kar yağmak', '"It snows in winter."'],
      ['wind', 'UIND', 'rüzgar', 'Sıfatı: "windy" (rüzgarlı).'],
      ['warm', 'UORM', 'ılık', '"warm" rahat; "hot" (sıcak) daha aşırı.'],
      ['cold', 'KOULD', 'soğuk', '"I am cold" = üşüyorum.'],
      ['spring', 'SPRING', 'ilkbahar', 'Mevsimler büyük harfle yazılmaz.'],
      ['summer', 'SAMır', 'yaz', '"in the summer holidays" = yaz tatilinde.'],
      ['temperature', 'TEMprıçır', 'sıcaklık', '"The temperature is 30 degrees."'],
    ],
    sentences: [
      ['It is cold and windy today.', 'Bugün soğuk ve rüzgarlı.'],
      ['In summer, we swim every day.', 'Yazın her gün yüzeriz.'],
      ['What is the temperature?', 'Sıcaklık kaç derece?'],
      ['It often rains in spring.', 'İlkbaharda sık yağmur yağar.'],
    ],
    sceneTitle: 'Small Talk About Weather',
    sceneContext: 'İngilizlerin en sevdiği sohbet konusu: hava!',
    dialogue: [
      ['Mark', 'Beautiful day, isn\'t it?', 'BYUUtıfıl DEY, IZnt İT?', 'Güzel bir gün, değil mi?'],
      ['Anna', 'Yes, it is sunny and warm for the first time this week!', 'YES, İT İZ SANi end UORM for de FERST TAYM Dis UIK!', 'Evet, bu hafta ilk kez güneşli ve ılık!'],
      ['Mark', 'They say it will rain tomorrow again.', 'DEY SEY İT UİL REYN tuMOrow eGEYN.', 'Yarın yine yağmur yağacakmış.'],
      ['Anna', 'Typical! In spring the weather changes every hour.', 'TIpikıl! in SPRING de UEDır CEYNCiz EVri AUır.', 'Tipik! İlkbaharda hava her saat değişiyor.'],
      ['Mark', 'That is why we always talk about it!', 'det İZ UAY ui OLueyz TOK eBAUT İT!', 'Bu yüzden hep onu konuşuyoruz!'],
    ],
  },
  {
    id: 'en_mod_a2_15',
    unitNumber: 15,
    levelGroup: 'A2',
    title: 'İş & Meslekler',
    description: 'Meslek anlatma, "work for/in" ve şu anki durum (present continuous)',
    category: 'İş Dünyası',
    color: '#6366f1',
    icon: '💼',
    grammarExplain: `📌 İŞ KONUŞMASI:
1. "What do you do?" = mesleğin ne? (Ne yapıyorsun? DEĞİL!) Cevap: "I am a nurse."
2. "work for + şirket" / "work in + sektör/şehir" / "work at + yer": I work for Google. / I work in finance.
3. Present continuous (am/is/are + fiil-ing): şu an olan ya da bu dönemdeki durum: "I am looking for a new job." (iş arıyorum).`,
    words: [
      ['job', 'CAB', 'iş', '"job" sayılabilir (a job), "work" sayılamaz.'],
      ['meeting', 'MIITing', 'toplantı', '"I have a meeting at ten."'],
      ['colleague', 'KOLIIG', 'iş arkadaşı', '"coworker" da yaygın.'],
      ['boss', 'BOS', 'patron', '"my boss" — hiyerarşideki üstün.'],
      ['salary', 'SELıri', 'maaş', 'Soru sormak kabalık olabilir!'],
      ['company', 'KAMpıni', 'şirket', '"work for a company".'],
      ['interview', 'INtırvyu', 'iş görüşmesi; röportaj', '"a job interview".'],
      ['experience', 'ikSPIRiyıns', 'deneyim', '"two years of experience".'],
      ['busy', 'BIzi', 'meşgul', '"I am busy at work this week."'],
      ['apply', 'ePLAY', 'başvurmak', '"apply for a job" — başvuru.'],
    ],
    sentences: [
      ['I have a meeting at ten.', 'Saat onda toplantım var.'],
      ['She works for a big company.', 'O, büyük bir şirkette çalışıyor.'],
      ['He is looking for a new job.', 'Yeni bir iş arıyor.'],
      ['What do you do?', 'Ne iş yapıyorsun?'],
    ],
    sceneTitle: 'A Coffee with a Colleague',
    sceneContext: 'Mark, eski bir iş arkadaşıyla kahve içiyor.',
    dialogue: [
      ['Sara', 'Mark! Long time no see. What do you do now?', 'MARK! LONG TAYM NOU SII. VAT du yu DU NAU?', 'Mark! Uzun zaman oldu. Şimdi ne iş yapıyorsun?'],
      ['Mark', 'I work for a design company in Manchester.', 'ay UORK for e diZAYN KAMpıni in MENçistır.', 'Manchester\'da bir tasarım şirketinde çalışıyorum.'],
      ['Sara', 'Nice! Are you busy these days?', 'NAYS! AR yu BIJI DIZ DEYZ?', 'Güzel! Bu aralar meşgul müsün?'],
      ['Mark', 'Very. I am preparing a big presentation for my boss.', 'VERi. ay EM priPEring e BIG prezintEYşın for may BOS.', 'Çok. Patronum için büyük bir sunum hazırlıyorum.'],
      ['Sara', 'Good luck! And are you still applying for that manager job?', 'GUD LAK! End AR yu STIL ePLAYing for det MENıcır CAB?', 'İyi şanslar! O müdür pozisyonuna hâlâ başvuruyor musun?'],
    ],
  },
  {
    id: 'en_mod_a2_16',
    unitNumber: 16,
    levelGroup: 'A2',
    title: 'Hobiler & Boş Zaman',
    description: 'Hobi anlatma: play the guitar / play football ve enjoy + -ing',
    category: 'Gündelik Yaşam',
    color: '#ec4899',
    icon: '🎸',
    grammarExplain: `📌 PLAY, GO, DO + AKTİVİTE:
1. Enstrüman → "play THE guitar/piano"; spor → "play football/tennis" (the YOK!).
2. -ing aktiviteleri → "go swimming / go shopping / go running".
3. "enjoy", "like", "love" sonrası fiil -ing alır: "She enjoys drawing." (to draw ✗).`,
    words: [
      ['hobby', 'HOBi', 'hobi', '"What are your hobbies?" klasik tanışma sorusu.'],
      ['play', 'PLEY', 'oynamak; çalmak', 'Kural: play the guitar ama play football.'],
      ['read', 'RIID', 'okumak', 'Düzensiz geçmiş: read → read (okunuşu "red").'],
      ['draw', 'DRO', 'resim yapmak', '"draw a picture" = resim çiz.'],
      ['cinema', 'SINımâ', 'sinema', '"go to the cinema" = sinemaya gitmek.'],
      ['concert', 'KONsırt', 'konser', '"a rock concert".'],
      ['football', 'FUTbol', 'futbol', 'Amerika\'da "soccer" denir.'],
      ['guitar', 'giTAR', 'gitar', '"play the guitar" — "the" şart!'],
      ['free time', 'FRII TAYM', 'boş zaman', '"in my free time" = boş zamanımda.'],
      ['enjoy', 'enCOY', 'hoşlanmak, keyif almak', 'Sonrası -ing: "I enjoy reading."'],
    ],
    sentences: [
      ['I play the guitar and read comics.', 'Gitar çalar ve çizgi roman okurum.'],
      ['We go to the cinema at weekends.', 'Hafta sonları sinemaya gideriz.'],
      ['She enjoys drawing pictures.', 'Resim çizmekten hoşlanır.'],
      ['What do you do in your free time?', 'Boş zamanında ne yaparsın?'],
    ],
    sceneTitle: 'A New Hobby',
    sceneContext: 'Anna, Mark\'a yeni bir hobi denediğini anlatıyor.',
    dialogue: [
      ['Mark', 'What do you do in your free time, Anna?', 'VAT du yu DU in yor FRII TAYM, Ae-ne?', 'Boş zamanında ne yapıyorsun, Anna?'],
      ['Anna', 'I play the piano and I go swimming twice a week.', 'ay PLEY de piYEnou end ay GOU SUIMing TUAIS e UIK.', 'Piyano çalıyorum ve haftada iki kez yüzmeye gidiyorum.'],
      ['Mark', 'Impressive! I enjoy swimming too, but I am lazy.', 'imPREsiv! ay enCOY SUIMing TU, bat ay EM LEYzi.', 'Etkileyici! Ben de yüzmeden hoşlanırım ama tembelim.'],
      ['Anna', 'What about a new hobby? Do you like drawing?', 'Vat eBAUT e NYU HOBi? Du yu LAYK DROing?', 'Yeni bir hobi ne dersin? Resim yapmayı sever misin?'],
      ['Mark', 'I love it! Let us start a drawing class together!', 'ay LAV İT! LET as START e DROing KLAS tuGEDır!', 'Çok severim! Beraber resim kursuna başlayalım!'],
    ],
  },
];
