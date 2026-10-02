import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const PACK100_A2: UnitModule[] = [
  {
    id: 'p100_a2_past', unitNumber: 40.9601, levelGroup: 'A2',
    title: 'Geçmiş Zaman Temelleri', description: 'Dün ne yaptın? -л ekiyle anlat',
    category: 'Temel Dilbilgisi', color: '#7c3aed', icon: '⏪',
    grammarExplain: `📌 GEÇMİŞ ZAMAN (-Л):
1. Mastardan -ть atılır, -л eklenir: читать → читал.
2. Ek KİŞİYE değil CİNSİYETE ve SAYIYA uyar: он читал, она читала, они читали.
3. Olumsuz: не читал. "Ben" diyen kadın da читала der — Türkçeden farklıdır.`,
    words: [
      W('p100a2pa_1', 'Вчера', 'Fçirá', 'Dün', 'A2', 'В burada F okunur.'),
      W('p100a2pa_2', 'Был', 'Bıl', 'İdi / Vardı', 'A2', 'быть fiilinin geçmişi: была, было, были.'),
      W('p100a2pa_3', 'Сделал', 'Zdyélal', 'Yaptı (tamamlanmış)', 'A2', 'с- öneki eylemin bittiğini gösterir.'),
      W('p100a2pa_4', 'Пошёл', 'Paşól', 'Gitti', 'A2', 'идти fiilinin kural dışı geçmişi; dişili пошла.'),
      W('p100a2pa_5', 'Видел', 'Vídil', 'Gördü', 'A2', 'Tamamlanmışı увидел (fark etti).'),
      W('p100a2pa_6', 'Раньше', 'Ránşi', 'Eskiden / Daha önce', 'A2', 'Geçmiş alışkanlıkları anlatırken anahtar zarftır.')
    ],
    sentences: [
      S('Вчера я был дома.', 'Dün evdeydim.'),
      S('Она читала книгу весь вечер.', 'Bütün akşam kitap okudu.'),
      S('Раньше мы жили в Москве.', 'Eskiden Moskova\'da yaşıyorduk.')
    ]
  },
  {
    id: 'p100_a2_future', unitNumber: 40.9602, levelGroup: 'A2',
    title: 'Gelecek Zaman', description: 'Yarın ne yapacaksın?',
    category: 'Temel Dilbilgisi', color: '#2563eb', icon: '⏩',
    grammarExplain: `📌 İKİ TÜRLÜ GELECEK:
1. BİLEŞİK gelecek (bitmemiş fiil): буду + mastar → Я буду читать. (Okuyacağım/okumakla meşgul olacağım.)
2. BASİT gelecek (bitmiş fiil): şimdiki zaman gibi çekilir ama geleceği anlatır → Я прочитаю. (Okuyup bitireceğim.)
3. буду ile BİTMİŞ fiil ASLA birleşmez — en sık yapılan hatadır.`,
    words: [
      W('p100a2fu_1', 'Завтра', 'Záftra', 'Yarın', 'A2', 'В yine F okunur.'),
      W('p100a2fu_2', 'Буду', 'Búdu', '(ben) olacağım', 'A2', 'быть fiilinin gelecek çekimi: буду, будешь, будет.'),
      W('p100a2fu_3', 'Планировать', 'Planíravat', 'Planlamak', 'A2', 'Yabancı kökenli -ировать fiilleri hep bu kalıpta çekilir.'),
      W('p100a2fu_4', 'Скоро', 'Skóra', 'Yakında', 'A2', 'До скорого! = Yakında görüşürüz!'),
      W('p100a2fu_5', 'Потом', 'Patóm', 'Sonra', 'A2', 'Sıralama anlatırken сначала … потом kalıbı kullanılır.'),
      W('p100a2fu_6', 'Обещать', 'Abişşát', 'Söz vermek', 'A2', 'Я обещаю = Söz veriyorum.')
    ],
    sentences: [
      S('Завтра я буду работать дома.', 'Yarın evden çalışacağım.'),
      S('Мы скоро приедем.', 'Yakında geleceğiz.'),
      S('Я обещаю, что позвоню.', 'Arayacağıma söz veriyorum.')
    ]
  },
  {
    id: 'p100_a2_aspect', unitNumber: 40.9603, levelGroup: 'A2',
    title: 'Fiil Görünüşü (Vid)', description: 'Bitmiş mi, sürüyor mu? Rusçanın kalbi',
    category: 'Temel Dilbilgisi', color: '#db2777', icon: '🔁',
    grammarExplain: `📌 НСВ / СВ AYRIMI:
1. BİTMEMİŞ (несовершенный): süreç, tekrar, alışkanlık → Я читал книгу. (Okuyordum.)
2. BİTMİŞ (совершенный): tek seferlik, SONUÇLU eylem → Я прочитал книгу. (Kitabı bitirdim.)
3. İpucu zarflar: часто/обычно/долго → bitmemiş; вдруг/уже/наконец → bitmiş.`,
    words: [
      W('p100a2as_1', 'Читать / Прочитать', 'Çitát / Praçitát', 'Okumak / Okuyup bitirmek', 'A2', 'про- öneki sonucu vurgular.'),
      W('p100a2as_2', 'Писать / Написать', 'Pisát / Napisát', 'Yazmak / Yazıp bitirmek', 'A2', 'на- en yaygın tamamlama önekidir.'),
      W('p100a2as_3', 'Делать / Сделать', 'Dyélat / Zdyélat', 'Yapmak / Yapıp bitirmek', 'A2', 'Сделано в России = Rusya\'da üretildi.'),
      W('p100a2as_4', 'Уже', 'Ujé', 'Artık / Çoktan', 'A2', 'Bitmiş fiille çok sık: Я уже сделал.'),
      W('p100a2as_5', 'Обычно', 'Abıçna', 'Genellikle', 'A2', 'Alışkanlık anlattığı için bitmemiş fiil ister.'),
      W('p100a2as_6', 'Наконец', 'Nakanyéts', 'Nihayet', 'A2', 'Uzun bekleyişin sonucunu vurgular.')
    ],
    sentences: [
      S('Я обычно читаю вечером.', 'Genellikle akşamları okurum.'),
      S('Я уже прочитал эту книгу.', 'Bu kitabı çoktan bitirdim.'),
      S('Наконец он написал письмо.', 'Nihayet mektubu yazdı.')
    ]
  },
  {
    id: 'p100_a2_motion', unitNumber: 40.9604, levelGroup: 'A2',
    title: 'Hareket Fiilleri: идти / ехать', description: 'Yürümek mi, araçla gitmek mi?',
    category: 'Temel Dilbilgisi', color: '#0891b2', icon: '🚶',
    grammarExplain: `📌 GİTMEK FİİLİNİN 4 YÜZÜ:
1. идти = yaya, tek yön, şu an. ходить = yaya, tekrarlı/gidip gelme.
2. ехать = araçla, tek yön. ездить = araçla, tekrarlı.
3. Yön: в/на + belirtme hâli (в школу). Konum: в/на + bulunma hâli (в школе).`,
    words: [
      W('p100a2mo_1', 'Идти', 'İttí', 'Gitmek (yaya, şimdi)', 'A2', 'Я иду домой = Eve gidiyorum.'),
      W('p100a2mo_2', 'Ходить', 'Hadít', 'Gidip gelmek (yaya)', 'A2', 'Я хожу в школу = Okula giderim (düzenli).'),
      W('p100a2mo_3', 'Ехать', 'Yéhat', 'Gitmek (araçla)', 'A2', 'Uzun mesafede daima bu kullanılır.'),
      W('p100a2mo_4', 'Ездить', 'Yézdit', 'Araçla gidip gelmek', 'A2', 'Я езжу на работу на метро.'),
      W('p100a2mo_5', 'Приехать', 'Priyéhat', 'Varmak / Gelmek (araçla)', 'A2', 'при- öneki "varış"ı anlatır.'),
      W('p100a2mo_6', 'Уйти', 'Uytí', 'Ayrılmak / Çekip gitmek', 'A2', 'у- öneki "uzaklaşma" önekidir.')
    ],
    sentences: [
      S('Я иду в магазин.', 'Mağazaya gidiyorum.'),
      S('Каждый день я езжу на работу.', 'Her gün işe gidiyorum.'),
      S('Он уже уехал в Москву.', 'O çoktan Moskova\'ya gitti.')
    ]
  },
  {
    id: 'p100_a2_meaning_syn', unitNumber: 40.9605, levelGroup: 'A2',
    title: 'Cümlede Anlam: Eş Anlamlılar', description: 'Aynı anlam, farklı ton',
    category: 'Cümlede Anlam', color: '#f43f5e', icon: '🧩',
    grammarExplain: `📌 EŞ ANLAMLI AMA EŞ DEĞİL:
1. большой / огромный: ikisi de "büyük" ama огромный = devasa (abartı).
2. говорить / разговаривать: ilki "söylemek", ikincisi "sohbet etmek".
3. Eş anlamlı seçimi ÜSLUBU belirler; resmî metinde приобрести, günlükte купить kullanılır.`,
    words: [
      W('p100a2sy_1', 'Огромный', 'Agrómnıy', 'Devasa', 'A2', 'большой\'un abartılı hâli.'),
      W('p100a2sy_2', 'Прекрасный', 'Prikrásnıy', 'Harika / Nefis', 'A2', 'красивый\'dan daha güçlü bir övgüdür.'),
      W('p100a2sy_3', 'Разговаривать', 'Razgavárivat', 'Sohbet etmek', 'A2', 'Karşılıklı konuşmayı anlatır.'),
      W('p100a2sy_4', 'Приобрести', 'Priabristí', 'Edinmek / Satın almak', 'A2', 'Resmî üslup; günlükte купить denir.'),
      W('p100a2sy_5', 'Трудный', 'Trúdnıy', 'Zor', 'A2', 'сложный (karmaşık) ile yakın ama aynı değildir.'),
      W('p100a2sy_6', 'Синоним', 'Sinónim', 'Eş anlamlı', 'A2', 'Karşıtı антоним.')
    ],
    sentences: [
      S('Это не просто большой, а огромный дом.', 'Bu sadece büyük değil, devasa bir ev.'),
      S('Мы долго разговаривали о работе.', 'İş hakkında uzun uzun sohbet ettik.'),
      S('Экзамен был очень трудный.', 'Sınav çok zordu.')
    ]
  },
  {
    id: 'p100_a2_meaning_ant', unitNumber: 40.9606, levelGroup: 'A2',
    title: 'Cümlede Anlam: Derece ve Karşıtlık', description: 'Biraz, çok, aşırı: dozu ayarla',
    category: 'Cümlede Anlam', color: '#ea580c', icon: '📊',
    grammarExplain: `📌 DERECE BELİRTEÇLERİ:
1. немного (biraz) < довольно (oldukça) < очень (çok) < слишком (aşırı, OLUMSUZ ima).
2. слишком daima fazlalık şikâyeti taşır: Слишком дорого. (Fazla pahalı.)
3. Karşılaştırma: больше чем (daha fazla), меньше чем (daha az).`,
    words: [
      W('p100a2an_1', 'Немного', 'Nimnóga', 'Biraz', 'A2', 'Ardından tamlayan hâl gelir: немного воды.'),
      W('p100a2an_2', 'Довольно', 'Davólna', 'Oldukça', 'A2', '"Yeter!" anlamında ünlem olarak da kullanılır.'),
      W('p100a2an_3', 'Слишком', 'Slíşkam', 'Aşırı / Fazla', 'A2', 'Her zaman olumsuz değerlendirme taşır.'),
      W('p100a2an_4', 'Больше', 'Bólşe', 'Daha çok', 'A2', 'больше не = artık değil.'),
      W('p100a2an_5', 'Меньше', 'Myénşe', 'Daha az', 'A2', 'маленький ve мало kelimeleriyle aynı kökten.'),
      W('p100a2an_6', 'Наоборот', 'Naabarót', 'Tam tersine', 'A2', 'Cümlenin anlamını 180 derece çevirir.')
    ],
    sentences: [
      S('Это слишком дорого для меня.', 'Bu benim için fazla pahalı.'),
      S('Дай мне немного воды.', 'Bana biraz su ver.'),
      S('Наоборот, мне очень понравилось.', 'Tam tersine, çok hoşuma gitti.')
    ]
  },
  {
    id: 'p100_a2_meaning_conj', unitNumber: 40.9607, levelGroup: 'A2',
    title: 'Cümlede Anlam: Bağlaçlar', description: 'Sebep-sonuç kur, cümleleri birleştir',
    category: 'Cümlede Anlam', color: '#4f46e5', icon: '🔗',
    grammarExplain: `📌 SEBEP–SONUÇ ZİNCİRİ:
1. потому что = çünkü (SEBEP sonra gelir). поэтому = bu yüzden (SONUÇ sonra gelir). Yeri karıştırılırsa anlam ters döner.
2. но = ama, а = ise/oysa (karşılaştırma), и = ve.
3. если = eğer, хотя = -e rağmen. Rusçada bu bağlaçlardan önce VİRGÜL zorunludur.`,
    words: [
      W('p100a2cj_1', 'Потому что', 'Patamú şto', 'Çünkü', 'A2', 'Cümle başında kullanılmaz, ortada bağlar.'),
      W('p100a2cj_2', 'Поэтому', 'Paétamu', 'Bu yüzden', 'A2', 'Sonucu tanıtır.'),
      W('p100a2cj_3', 'Хотя', 'Hatyá', 'Her ne kadar', 'A2', 'Beklentiyle çelişen durumu bağlar.'),
      W('p100a2cj_4', 'Если', 'Yésli', 'Eğer', 'A2', 'Şart cümlesinde то ile eşlenebilir.'),
      W('p100a2cj_5', 'А', 'A', 'İse / Oysa', 'A2', 'но\'dan farklıdır: çelişki değil karşılaştırma yapar.'),
      W('p100a2cj_6', 'Кроме того', 'Króme tavó', 'Üstelik', 'A2', 'Yazılı dilde argüman eklemek için kullanılır.')
    ],
    sentences: [
      S('Я не пошёл, потому что был болен.', 'Gitmedim, çünkü hastaydım.'),
      S('Было поздно, поэтому мы остались дома.', 'Geç olmuştu, bu yüzden evde kaldık.'),
      S('Хотя было холодно, мы гуляли.', 'Soğuk olmasına rağmen yürüyüş yaptık.')
    ]
  },
  {
    id: 'p100_a2_idioms1', unitNumber: 40.9608, levelGroup: 'A2',
    title: 'Cümlede Anlam: Günlük Kalıplar', description: 'Kelimesi kelimesine çevrilmeyen ifadeler',
    category: 'Cümlede Anlam', color: '#ca8a04', icon: '💡',
    grammarExplain: `📌 KALIP İFADELER:
1. Bu ifadeler PARÇA PARÇA çevrilmez, blok hâlinde ezberlenir.
2. Как дела? kelime kelime "işler nasıl" ama işlevi "nasılsın"dır.
3. Всё в порядке = "her şey düzende" → "her şey yolunda".`,
    words: [
      W('p100a2id_1', 'Как дела', 'Kak dilá', 'Nasılsın', 'A2', 'Ruslar bu soruya samimi ve uzun cevap verebilir.'),
      W('p100a2id_2', 'Всё в порядке', 'Fsyo f paryátke', 'Her şey yolunda', 'A2', 'Resmî ve günlük her yerde geçerli.'),
      W('p100a2id_3', 'Ничего страшного', 'Niçivó stráşnava', 'Önemli değil', 'A2', 'Sözlük anlamı "korkunç bir şey yok".'),
      W('p100a2id_4', 'В самом деле', 'F sámam dyéli', 'Gerçekten', 'A2', 'Şaşkınlık ya da onay bildirir.'),
      W('p100a2id_5', 'На самом деле', 'Na sámam dyéli', 'Aslında', 'A2', 'Bir öncekiyle tek harf farklıdır ama anlamı ayrıdır!'),
      W('p100a2id_6', 'Мне всё равно', 'Mnye fsyo ravnó', 'Bana fark etmez', 'A2', 'Tonlamaya göre kayıtsızlık ya da kırgınlık anlatır.')
    ],
    sentences: [
      S('Как дела? Всё в порядке.', 'Nasılsın? Her şey yolunda.'),
      S('На самом деле я не знал об этом.', 'Aslında bundan haberim yoktu.'),
      S('Ничего страшного, бывает.', 'Önemli değil, olur böyle şeyler.')
    ]
  },
  {
    id: 'p100_a2_culture_food', unitNumber: 40.9609, levelGroup: 'A2',
    title: 'Kültür: Rus Sofra Adabı', description: 'Sofrada davranış ve kadeh kaldırma',
    category: 'Kültür', color: '#b91c1c', icon: '🍽️',
    grammarExplain: `📌 SOFRA DİLİ:
1. Kadeh kaldırma: За здоровье! (Sağlığa!) — за + belirtme hâli kalıbıdır.
2. Приятного аппетита! = Afiyet olsun (tamlayan hâlde donmuş kalıp).
3. Misafir ev sahibine hediye getirir; çiçek TEK sayıda olmalıdır (çift sayı cenazeye aittir).`,
    words: [
      W('p100a2cf_1', 'Тост', 'Tost', 'Kadeh konuşması', 'A2', 'Kafkas kültüründen gelme uzun tost geleneği vardır.'),
      W('p100a2cf_2', 'Застолье', 'Zastólye', 'Sofra sohbeti', 'A2', 'Sadece yemek değil, saatler süren muhabbet demektir.'),
      W('p100a2cf_3', 'Хлеб-соль', 'Hlyep-sol', 'Ekmek-tuz', 'A2', 'Misafiri karşılama geleneğinin adı.'),
      W('p100a2cf_4', 'Приятного аппетита', 'Priyátnava apitíta', 'Afiyet olsun', 'A2', 'Sofraya oturur oturmaz söylenir.'),
      W('p100a2cf_5', 'Угощать', 'Ugaşşát', 'İkram etmek', 'A2', 'Ev sahibinin temel görevi sayılır.'),
      W('p100a2cf_6', 'Скромность', 'Skrómnast', 'Alçakgönüllülük', 'A2', 'Sofrada övgüye mütevazı karşılık vermek beklenir.')
    ],
    sentences: [
      S('Хозяйка угощает нас пирогом.', 'Ev sahibi bize börek ikram ediyor.'),
      S('За здоровье! Приятного аппетита!', 'Sağlığa! Afiyet olsun!'),
      S('Русское застолье длится долго.', 'Rus sofrası uzun sürer.')
    ]
  },
  {
    id: 'p100_a2_culture_banya', unitNumber: 40.961, levelGroup: 'A2',
    title: 'Kültür: Banya (Rus Hamamı)', description: 'Buhar, huş dalı ve gelenek',
    category: 'Kültür', color: '#0e7490', icon: '🧖',
    grammarExplain: `📌 GELENEK DİLİ:
1. "Hamama gitmek" = идти в баню (yön → belirtme hâli).
2. Banyadan çıkana С лёгким паром! (Hafif buharla!) denir; karşılığı Спасибо'dur.
3. Rusçada "gelenek" için традиция ve обычай ayrımı vardır: ilki kurumsal, ikincisi halk âdetidir.`,
    words: [
      W('p100a2cb_1', 'Баня', 'Bánya', 'Rus hamamı', 'A2', 'Türkçe hamamdan farkı: kuru-nemli sıcak buhar odasıdır.'),
      W('p100a2cb_2', 'Пар', 'Par', 'Buhar', 'A2', 'Поддать пару = buharı artırmak.'),
      W('p100a2cb_3', 'Веник', 'Vyénik', 'Huş dalı demeti', 'A2', 'Vücuda hafifçe vurularak kan dolaşımı hızlandırılır.'),
      W('p100a2cb_4', 'Полотенце', 'Palatyéntse', 'Havlu', 'A2', 'Nötr cinstir.'),
      W('p100a2cb_5', 'Традиция', 'Tradítsiya', 'Gelenek', 'A2', 'Kurumsal/tarihsel gelenek için.'),
      W('p100a2cb_6', 'Обычай', 'Abıçay', 'Örf / Âdet', 'A2', 'Halkın günlük âdetleri için kullanılır.')
    ],
    sentences: [
      S('В субботу мы идём в баню.', 'Cumartesi hamama gidiyoruz.'),
      S('С лёгким паром!', 'Sıhhatler olsun! (Hafif buharla!)'),
      S('Это старый русский обычай.', 'Bu eski bir Rus âdetidir.')
    ]
  },
  {
    id: 'p100_a2_culture_dacha', unitNumber: 40.9611, levelGroup: 'A2',
    title: 'Kültür: Dacha ve Köy', description: 'Rusların yazlık yaşamı',
    category: 'Kültür', color: '#4d7c0f', icon: '🏡',
    grammarExplain: `📌 "НА ДАЧЕ" İSTİSNASI:
1. дача kelimesi в değil на alır: на даче (yazlıkta), на дачу (yazlığa).
2. Aynı istisna: на работе, на почте, на заводе.
3. "Toprak işlemek" = работать на земле; сажать (dikmek) fiilinin belirtme hâli ister.`,
    words: [
      W('p100a2cd_1', 'Дача', 'Dáça', 'Yazlık / Bağ evi', 'A2', 'Sovyet döneminden kalma yaygın bir yaşam biçimi.'),
      W('p100a2cd_2', 'Огород', 'Agarót', 'Sebze bahçesi', 'A2', 'сад (meyve bahçesi) ile karıştırılmamalı.'),
      W('p100a2cd_3', 'Урожай', 'Urajáy', 'Hasat / Ürün', 'A2', 'Собрать урожай = hasadı toplamak.'),
      W('p100a2cd_4', 'Сажать', 'Saját', 'Dikmek (bitki)', 'A2', 'Tamamlanmışı посадить.'),
      W('p100a2cd_5', 'Деревня', 'Dirévnya', 'Köy', 'A2', 'село (kilisesi olan büyük köy) ile ince farkı vardır.'),
      W('p100a2cd_6', 'Соседи', 'Sasyédi', 'Komşular', 'A2', 'Tekili сосед; dacha kültürünün merkezinde yer alır.')
    ],
    sentences: [
      S('Летом мы живём на даче.', 'Yazın yazlıkta yaşıyoruz.'),
      S('Бабушка сажает картошку в огороде.', 'Babaanne bahçeye patates dikiyor.'),
      S('В этом году хороший урожай.', 'Bu yıl hasat iyi.')
    ]
  },
  {
    id: 'p100_a2_rel_easter', unitNumber: 40.9612, levelGroup: 'A2',
    title: 'Din: Paskalya (Пасха)', description: 'Ortodoks Paskalyası ve perhiz',
    category: 'Din ve Maneviyat', color: '#f59e0b', icon: '🥚',
    grammarExplain: `📌 BAYRAM SELAMLAŞMASI:
1. Paskalya günü: Христос воскрес! (Mesih dirildi!) Cevabı: Воистину воскрес! (Gerçekten dirildi!)
2. Bu iki cümle kalıp hâlinde ezberlenir, değiştirilemez.
3. Kutlama: С Пасхой! (с + araç hâli kalıbı).`,
    words: [
      W('p100a2re_1', 'Пасха', 'Pásha', 'Paskalya', 'A2', 'Aynı kelime bayramda yenen tatlı peynirli tatlıyı da anlatır.'),
      W('p100a2re_2', 'Кулич', 'Kulíç', 'Paskalya çöreği', 'A2', 'Üzeri beyaz glazürlüdür; kilisede kutsanır.'),
      W('p100a2re_3', 'Пост', 'Post', 'Perhiz / Oruç', 'A2', 'Великий пост = Büyük Perhiz (40 gün).'),
      W('p100a2re_4', 'Воскресение', 'Vaskrisyéniye', 'Diriliş', 'A2', 'воскресенье (pazar günü) kelimesiyle aynı kökten.'),
      W('p100a2re_5', 'Освятить', 'Asvitít', 'Kutsamak', 'A2', 'Rahip yiyecekleri освящает.'),
      W('p100a2re_6', 'Верующий', 'Vyéruyuşşiy', 'İnançlı kişi', 'A2', 'Dişili верующая.')
    ],
    sentences: [
      S('Христос воскрес!', 'Mesih dirildi!'),
      S('Мы красим яйца на Пасху.', 'Paskalya için yumurta boyuyoruz.'),
      S('Он соблюдает пост.', 'O perhize (oruca) uyuyor.')
    ]
  },
  {
    id: 'p100_a2_rel_ramadan', unitNumber: 40.9613, levelGroup: 'A2',
    title: 'Din: Ramazan ve Kurban', description: 'İslamî bayramları Rusça anlat',
    category: 'Din ve Maneviyat', color: '#15803d', icon: '🌙',
    grammarExplain: `📌 BAYRAM TEBRİĞİ:
1. С Курбан-байрамом! / С Ураза-байрамом! — yine "с + araç hâli".
2. Tataristan'da bayram adları Türkçeye yakındır: Ураза (oruç), Курбан (kurban).
3. "Oruç tutmak" = держать пост / соблюдать уразу.`,
    words: [
      W('p100a2rr_1', 'Рамадан', 'Ramadán', 'Ramazan', 'A2', 'Рамазан yazımı da kullanılır.'),
      W('p100a2rr_2', 'Ураза', 'Urazá', 'Oruç (Türkî dillerden)', 'A2', 'Tatar-Başkurt Rusçasında yaygındır.'),
      W('p100a2rr_3', 'Курбан-байрам', 'Kurbán-bayrám', 'Kurban Bayramı', 'A2', 'Türkçeden doğrudan geçmiştir.'),
      W('p100a2rr_4', 'Милостыня', 'Mílastınya', 'Sadaka', 'A2', 'Hem Hristiyan hem İslamî bağlamda kullanılır.'),
      W('p100a2rr_5', 'Имам', 'İmám', 'İmam', 'A2', 'Cami görevlisi; мулла da kullanılır.'),
      W('p100a2rr_6', 'Уважение', 'Uvajéniye', 'Saygı', 'A2', 'С уважением = saygılarımla (mektup sonu).')
    ],
    sentences: [
      S('В Рамадан мусульмане держат пост.', 'Ramazan\'da Müslümanlar oruç tutar.'),
      S('С Курбан-байрамом!', 'Kurban Bayramınız kutlu olsun!'),
      S('Мы уважаем все религии.', 'Bütün dinlere saygı duyuyoruz.')
    ]
  },
  {
    id: 'p100_a2_rel_words', unitNumber: 40.9614, levelGroup: 'A2',
    title: 'Din: Dua ve Mabet Sözlüğü', description: 'Ortak dinî kavramlar',
    category: 'Din ve Maneviyat', color: '#a16207', icon: '🕯️',
    grammarExplain: `📌 DİNÎ KÖKENLİ GÜNLÜK SÖZLER:
1. Спасибо = "Спаси Бог" (Tanrı korusun) — günlük teşekkür dinî kökenlidir.
2. Слава Богу! (Çok şükür!) inançsızlar arasında bile kalıp olarak kullanılır.
3. Дай Бог! = İnşallah / Allah versin.`,
    words: [
      W('p100a2rw_1', 'Душа', 'Duşá', 'Ruh / Can', 'A2', 'Rus kültüründe merkezî kavram: русская душа.'),
      W('p100a2rw_2', 'Вера', 'Vyéra', 'İnanç', 'A2', 'Aynı zamanda bir kadın adıdır.'),
      W('p100a2rw_3', 'Грех', 'Gryeh', 'Günah', 'A2', 'Sıfatı грешный.'),
      W('p100a2rw_4', 'Храм', 'Hram', 'Mabet / Tapınak', 'A2', 'Dinden bağımsız genel sözcüktür.'),
      W('p100a2rw_5', 'Священник', 'Svişşénnik', 'Rahip', 'A2', 'Halk dilinde поп da denir (samimi/kaba).'),
      W('p100a2rw_6', 'Слава Богу', 'Sláva Bógu', 'Çok şükür', 'A2', 'Yönelme hâlinde donmuş kalıp.')
    ],
    sentences: [
      S('Слава Богу, всё хорошо.', 'Çok şükür, her şey iyi.'),
      S('Он человек с доброй душой.', 'O iyi kalpli (ruhu iyi) bir insan.'),
      S('Это очень старый храм.', 'Bu çok eski bir mabet.')
    ]
  },
  {
    id: 'p100_a2_health', unitNumber: 40.9615, levelGroup: 'A2',
    title: 'Sağlık ve Doktor', description: 'Şikâyetini anlat, randevu al',
    category: 'Günlük Hayat', color: '#dc2626', icon: '🏥',
    grammarExplain: `📌 HASTALIK KALIPLARI:
1. У меня болит + yalın hâl: У меня болит горло. (Boğazım ağrıyor.)
2. Я заболел (erkek) / заболела (kadın) = Hastalandım.
3. "Reçete yazmak" = выписать рецепт; "iğne" = укол.`,
    words: [
      W('p100a2he_1', 'Врач', 'Vraç', 'Doktor', 'A2', 'доктор da kullanılır ama resmî sözcük врач\'tır.'),
      W('p100a2he_2', 'Температура', 'Timpiratúra', 'Ateş / Sıcaklık', 'A2', 'У меня температура = Ateşim var.'),
      W('p100a2he_3', 'Лекарство', 'Likárstva', 'İlaç', 'A2', 'Ardından от + tamlayan: лекарство от кашля.'),
      W('p100a2he_4', 'Больница', 'Balnítsa', 'Hastane', 'A2', 'больной (hasta) kökünden.'),
      W('p100a2he_5', 'Здоровье', 'Zdaróvye', 'Sağlık', 'A2', 'Здравствуйте selamı bu kökten gelir.'),
      W('p100a2he_6', 'Записаться', 'Zapisátsa', 'Randevu almak', 'A2', 'Записаться к врачу = doktora yazılmak.')
    ],
    sentences: [
      S('У меня болит горло и голова.', 'Boğazım ve başım ağrıyor.'),
      S('Я хочу записаться к врачу.', 'Doktordan randevu almak istiyorum.'),
      S('Врач выписал лекарство.', 'Doktor ilaç yazdı.')
    ]
  },
  {
    id: 'p100_a2_transport', unitNumber: 40.9616, levelGroup: 'A2',
    title: 'Toplu Taşıma', description: 'Metro, otobüs, bilet',
    category: 'Günlük Hayat', color: '#1d4ed8', icon: '🚇',
    grammarExplain: `📌 ARAÇLA GİTMEK:
1. Araç adı на + bulunma hâli alır: на метро, на автобусе, на такси.
2. "İnmek" = выходить: Вы выходите? (İniyor musunuz?) — metroda en sık duyulan cümledir.
3. "Aktarma yapmak" = сделать пересадку.`,
    words: [
      W('p100a2tr_1', 'Метро', 'Mitró', 'Metro', 'A2', 'Çekimsizdir, hiç değişmez.'),
      W('p100a2tr_2', 'Автобус', 'Aftóbus', 'Otobüs', 'A2', 'В harfi F okunur.'),
      W('p100a2tr_3', 'Билет', 'Bilyét', 'Bilet', 'A2', 'Билет туда и обратно = gidiş-dönüş bileti.'),
      W('p100a2tr_4', 'Пересадка', 'Pirisátka', 'Aktarma', 'A2', 'Metro istasyonlarında sık duyulur.'),
      W('p100a2tr_5', 'Расписание', 'Raspisániye', 'Tarife', 'A2', 'Tren ve otobüs saatleri için.'),
      W('p100a2tr_6', 'Опоздать', 'Apazdát', 'Geç kalmak', 'A2', 'Я опоздал на автобус = Otobüsü kaçırdım.')
    ],
    sentences: [
      S('Я еду на работу на метро.', 'İşe metroyla gidiyorum.'),
      S('Вы выходите на следующей?', 'Sonraki durakta iniyor musunuz?'),
      S('Я опоздал на автобус.', 'Otobüsü kaçırdım.')
    ]
  },
  {
    id: 'p100_a2_phone', unitNumber: 40.9617, levelGroup: 'A2',
    title: 'Telefon ve İnternet', description: 'Ara, mesaj at, bağlan',
    category: 'Günlük Hayat', color: '#0284c7', icon: '📱',
    grammarExplain: `📌 TELEFON DİLİ:
1. Telefonu açarken: Алло! / Слушаю. (Dinliyorum.)
2. "Aramak" = звонить + yönelme hâli: Я звоню маме.
3. Meşgulse: Он занят. Yanlış numara: Вы ошиблись номером.`,
    words: [
      W('p100a2ph_1', 'Звонить', 'Zvanít', 'Telefon etmek', 'A2', 'Vurgu SONDADIR: звонИт (звОнит yanlış sayılır).'),
      W('p100a2ph_2', 'Сообщение', 'Saapşşéniye', 'Mesaj', 'A2', 'Отправить сообщение = mesaj göndermek.'),
      W('p100a2ph_3', 'Экран', 'Ekrán', 'Ekran', 'A2', 'Türkçeyle aynı Fransızca kökten.'),
      W('p100a2ph_4', 'Зарядка', 'Zaryátka', 'Şarj', 'A2', 'Aynı kelime "sabah sporu" anlamına da gelir!'),
      W('p100a2ph_5', 'Подключиться', 'Patklyuçítsa', 'Bağlanmak', 'A2', 'Подключиться к вайфаю = wifi\'ye bağlanmak.'),
      W('p100a2ph_6', 'Скачать', 'Skaçát', 'İndirmek', 'A2', 'Karşıtı загрузить (yüklemek).')
    ],
    sentences: [
      S('Я позвоню тебе вечером.', 'Akşam seni arayacağım.'),
      S('Отправь мне сообщение.', 'Bana mesaj gönder.'),
      S('Здесь нет интернета.', 'Burada internet yok.')
    ]
  },
  {
    id: 'p100_a2_money', unitNumber: 40.9618, levelGroup: 'A2',
    title: 'Para ve Alışveriş', description: 'Fiyat sor, pazarlık et, öde',
    category: 'Günlük Hayat', color: '#059669', icon: '💰',
    grammarExplain: `📌 FİYAT SORMA:
1. Сколько стоит? (tekil) / Сколько стоят? (çoğul).
2. Ruble sayımı: 1 рубль, 2-4 рубля, 5+ рублей — sayı kuralı burada da işler.
3. Ödeme: платить картой / наличными (araç hâli).`,
    words: [
      W('p100a2mn_1', 'Стоить', 'Stóit', 'Değerinde olmak', 'A2', 'Сколько это стоит? = Bu kaça?'),
      W('p100a2mn_2', 'Рубль', 'Rubl', 'Ruble', 'A2', '"Kesmek" (рубить) kökünden: gümüş çubuktan kesilirdi.'),
      W('p100a2mn_3', 'Скидка', 'Skítka', 'İndirim', 'A2', 'Со скидкой = indirimli.'),
      W('p100a2mn_4', 'Наличные', 'Nalíçnıye', 'Nakit', 'A2', 'Daima çoğuldur.'),
      W('p100a2mn_5', 'Сдача', 'Sdáça', 'Para üstü', 'A2', 'Сдачи не надо = Üstü kalsın.'),
      W('p100a2mn_6', 'Дешёвый', 'Dişóvıy', 'Ucuz', 'A2', 'Karşıtı дорогой (hem pahalı hem "sevgili").')
    ],
    sentences: [
      S('Сколько это стоит?', 'Bu kaç para?'),
      S('Можно заплатить картой?', 'Kartla ödeyebilir miyim?'),
      S('Сегодня есть скидка.', 'Bugün indirim var.')
    ]
  },
  {
    id: 'p100_a2_dates', unitNumber: 40.9619, levelGroup: 'A2',
    title: 'Tarih ve Takvim', description: 'Ay adları ve tarih söyleme',
    category: 'Temel Dilbilgisi', color: '#7e22ce', icon: '📆',
    grammarExplain: `📌 TARİH SÖYLEMEK:
1. "Bugün hangi tarih?" cevabı sıra sayısı + ay tamlayan hâlde: пятое мая (5 Mayıs).
2. "Ne zaman?" sorusunda tarih tamlayan hâle geçer: пятого мая (5 Mayıs'ta).
3. Yıl: в двухтысячном году, в 2026 году (в … году kalıbı).`,
    words: [
      W('p100a2da_1', 'Январь', 'Yanvár', 'Ocak', 'A2', 'Vurgu sondadır: в январе.'),
      W('p100a2da_2', 'Май', 'May', 'Mayıs', 'A2', '9 Mayıs (Zafer Günü) Rusya\'nın en önemli anma günüdür.'),
      W('p100a2da_3', 'Сентябрь', 'Sintyábr', 'Eylül', 'A2', '1 Eylül "Bilgi Günü": okulların açılışı.'),
      W('p100a2da_4', 'Число', 'Çisló', 'Tarih (gün)', 'A2', 'Какое сегодня число? = Bugün ayın kaçı?'),
      W('p100a2da_5', 'Неделя', 'Nidyélya', 'Hafta', 'A2', 'Eski Rusçada "pazar günü" demekti.'),
      W('p100a2da_6', 'Год', 'Got', 'Yıl', 'A2', 'Çoğul sayımda лет kullanılır: пять лет.')
    ],
    sentences: [
      S('Какое сегодня число?', 'Bugün ayın kaçı?'),
      S('Мой день рождения пятого мая.', 'Doğum günüm 5 Mayıs\'ta.'),
      S('В сентябре начинается учёба.', 'Eylülde okul başlar.')
    ]
  },
  {
    id: 'p100_a2_weather2', unitNumber: 40.962, levelGroup: 'A2',
    title: 'Hava Durumu Detaylı', description: 'Tahmin oku, kıyafet seç',
    category: 'Günlük Hayat', color: '#0ea5e9', icon: '🌡️',
    grammarExplain: `📌 KİŞİSİZ YAPILAR:
1. Hava cümlelerinde özne yoktur: Холодно. Тепло. Пасмурно.
2. Kişiye bağlamak için yönelme hâli: Мне жарко. (Bana sıcak geliyor.)
3. Tahmin dili: Завтра будет дождь. (Yarın yağmur olacak.)`,
    words: [
      W('p100a2we_1', 'Погода', 'Pagóda', 'Hava durumu', 'A2', 'год (yıl) ile aynı kökten değildir.'),
      W('p100a2we_2', 'Ветер', 'Vyétir', 'Rüzgâr', 'A2', 'Сильный ветер = şiddetli rüzgâr.'),
      W('p100a2we_3', 'Облачно', 'Óblaçna', 'Bulutlu', 'A2', 'Tamamen kapalıysa пасмурно denir.'),
      W('p100a2we_4', 'Жарко', 'Járka', 'Sıcak (hava)', 'A2', 'Kişisiz zarftır, sıfat değildir.'),
      W('p100a2we_5', 'Мороз', 'Marós', 'Ayaz / Don', 'A2', 'Дед Мороз bu kelimeden gelir.'),
      W('p100a2we_6', 'Прогноз', 'Pragnós', 'Tahmin', 'A2', 'Прогноз погоды = hava tahmini.')
    ],
    sentences: [
      S('Сегодня очень жарко.', 'Bugün hava çok sıcak.'),
      S('По прогнозу завтра будет дождь.', 'Tahmine göre yarın yağmur olacak.'),
      S('Зимой здесь сильный мороз.', 'Kışın burada şiddetli ayaz olur.')
    ]
  }
];
