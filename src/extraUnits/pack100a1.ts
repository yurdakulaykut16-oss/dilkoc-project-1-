// ==========================================================
// 100 ÜNİTELİK BÜYÜK PAKET — BÖLÜM 1 / A1 (20 ünite)
// unitNumber: 10.9701 – 10.9720 (A1 bölgesinin sonu, 11'den önce)
// İçerik: temel dil + CÜMLEDE ANLAM + KÜLTÜR + DİN üniteleri
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const PACK100_A1: UnitModule[] = [
  {
    id: 'p100_a1_numbers', unitNumber: 10.9701, levelGroup: 'A1',
    title: 'Sayılar 1–20', description: 'Rakamları say, yaşını ve telefonunu söyle',
    category: 'Temel Kelimeler', color: '#0ea5e9', icon: '🔢',
    grammarExplain: `📌 SAYI + İSİM UYUMU:
1. 1 → tekil yalın: один дом. 2-4 → tekil tamlayan: два дома. 5-20 → çoğul tamlayan: пять домов.
2. один sayısı ismin cinsine uyar: один стол, одна книга, одно окно.
3. Yaş söylerken: Мне двадцать лет. (Ben yirmi yaşındayım.) — "Мне" (bana) ile kurulur.`,
    words: [
      W('p100a1n_1', 'Один', 'Adín', 'Bir', 'A1', 'Dişilde одна, nötrde одно olur.'),
      W('p100a1n_2', 'Два', 'Dva', 'İki', 'A1', 'Dişil isimlerle две biçimini alır: две книги.'),
      W('p100a1n_3', 'Пять', 'Pyat', 'Beş', 'A1', 'Beşten sonra isim çoğul tamlayan hâle geçer: пять книг.'),
      W('p100a1n_4', 'Десять', 'Dyésit', 'On', 'A1', 'Vurgu ilk hecede; sondaki -ть yumuşak okunur.'),
      W('p100a1n_5', 'Одиннадцать', 'Adínnatsat', 'On bir', 'A1', 'Çift Н yazılır ama tek Н okunur; -дц- "ts" sesidir.'),
      W('p100a1n_6', 'Двадцать', 'Dvátsat', 'Yirmi', 'A1', '"два" (iki) kökünden; -дцать = "on" eki.')
    ],
    sentences: [
      S('Мне двадцать лет.', 'Yirmi yaşındayım.'),
      S('У меня два брата.', 'İki erkek kardeşim var.'),
      S('В комнате пять столов.', 'Odada beş masa var.')
    ]
  },
  {
    id: 'p100_a1_pronouns', unitNumber: 10.9702, levelGroup: 'A1',
    title: 'Zamirler ve "var / yok"', description: 'Ben-sen-o zincirini kur, sahiplik anlat',
    category: 'Temel Dilbilgisi', color: '#6366f1', icon: '🙋',
    grammarExplain: `📌 "У МЕНЯ ЕСТЬ" KALIBI:
1. Rusçada "sahip olmak" fiili yoktur: У меня есть книга = Bende kitap var.
2. Olumsuzu нет + tamlayan hâl: У меня нет книги. (Kitabım yok.)
3. Şimdiki zamanda "olmak" fiili düşer: Я студент. (Ben öğrenciyim.) — "-im" eki yoktur.`,
    words: [
      W('p100a1p_1', 'Я', 'Ya', 'Ben', 'A1', 'Cümle ortasında da büyük harfle yazılmaz (İngilizcedeki I gibi değil).'),
      W('p100a1p_2', 'Ты', 'Tı', 'Sen', 'A1', 'Samimi hitap; resmîde вы kullanılır.'),
      W('p100a1p_3', 'Мы', 'Mı', 'Biz', 'A1', 'Ы sesi Türkçe "ı" gibidir ama daha derinden gelir.'),
      W('p100a1p_4', 'Есть', 'Yest', 'Var', 'A1', 'Aynı kelime "yemek" fiilinin şimdiki hâli de olabilir — bağlama bakılır.'),
      W('p100a1p_5', 'Нет', 'Nyet', 'Yok / Hayır', 'A1', 'Hem "hayır" hem "yok" anlamındadır.'),
      W('p100a1p_6', 'Мой', 'Moy', 'Benim', 'A1', 'İsmin cinsine uyar: мой дом, моя книга, моё окно.')
    ],
    sentences: [
      S('У меня есть собака.', 'Benim bir köpeğim var.'),
      S('У него нет машины.', 'Onun arabası yok.'),
      S('Это мой друг.', 'Bu benim arkadaşım.')
    ]
  },
  {
    id: 'p100_a1_questions', unitNumber: 10.9703, levelGroup: 'A1',
    title: 'Soru Kelimeleri', description: 'Kim, ne, nerede, ne zaman, neden',
    category: 'Temel Dilbilgisi', color: '#14b8a6', icon: '❓',
    grammarExplain: `📌 SORU KURMANIN 2 YOLU:
1. Soru kelimesiyle: Где ты? (Neredesin?) — kelime sırası değişmez, sadece başa soru sözcüğü gelir.
2. Soru kelimesiz: Ты дома? (Evde misin?) — yalnızca TONLAMA yükselir; Türkçedeki "-mi" eki yoktur.
3. почему = neden (sebep sorar), зачем = niçin (amaç sorar). Bu ikisini karıştırmak yaygın hatadır.`,
    words: [
      W('p100a1q_1', 'Кто', 'Kto', 'Kim', 'A1', 'Canlı varlıklar için; nesneler için что kullanılır.'),
      W('p100a1q_2', 'Что', 'Şto', 'Ne', 'A1', 'Yazılışı "çto" ama okunuşu "ŞTO" — klasik tuzak.'),
      W('p100a1q_3', 'Где', 'Gdye', 'Nerede', 'A1', 'Yer sorar; yön için куда (nereye) kullanılır.'),
      W('p100a1q_4', 'Когда', 'Kagdá', 'Ne zaman', 'A1', 'Ortadaki Г burada G okunur, "v" olmaz.'),
      W('p100a1q_5', 'Почему', 'Paçimú', 'Neden', 'A1', 'Cevabı потому что (çünkü) ile başlar.'),
      W('p100a1q_6', 'Сколько', 'Skólka', 'Kaç / Ne kadar', 'A1', 'Ardından çoğul tamlayan gelir: сколько лет?')
    ],
    sentences: [
      S('Кто это?', 'Bu kim?'),
      S('Где твой дом?', 'Senin evin nerede?'),
      S('Почему ты дома?', 'Neden evdesin?')
    ]
  },
  {
    id: 'p100_a1_adjopp', unitNumber: 10.9704, levelGroup: 'A1',
    title: 'Zıt Anlamlı Sıfatlar', description: 'Büyük-küçük, iyi-kötü ikilileriyle tarif et',
    category: 'Temel Kelimeler', color: '#f97316', icon: '↔️',
    grammarExplain: `📌 SIFATIN CİNS UYUMU:
1. Eril -ый/-ой, dişil -ая, nötr -ое, çoğul -ые: большой дом, большая книга, большое окно, большие дома.
2. Sıfat isimden ÖNCE gelir, tıpkı Türkçedeki gibi.
3. "çok" = очень: очень хороший (çok iyi).`,
    words: [
      W('p100a1a_1', 'Большой', 'Balşóy', 'Büyük', 'A1', 'Bolşoy Tiyatrosu = "Büyük Tiyatro".'),
      W('p100a1a_2', 'Маленький', 'Málinkiy', 'Küçük', 'A1', 'Sevgi ifadelerinde sık geçer: маленький мой.'),
      W('p100a1a_3', 'Хороший', 'Haróşiy', 'İyi', 'A1', 'Zarfı хорошо (iyi bir şekilde) çok kullanılır.'),
      W('p100a1a_4', 'Плохой', 'Plahóy', 'Kötü', 'A1', 'Zarfı плохо: Мне плохо = Kendimi kötü hissediyorum.'),
      W('p100a1a_5', 'Новый', 'Nóvıy', 'Yeni', 'A1', 'Новгород = "Yeni Şehir".'),
      W('p100a1a_6', 'Старый', 'Stárıy', 'Eski / Yaşlı', 'A1', 'Hem eşya hem insan için kullanılır.')
    ],
    sentences: [
      S('Это большой город.', 'Bu büyük bir şehir.'),
      S('У меня новая машина.', 'Benim yeni bir arabam var.'),
      S('Сегодня плохая погода.', 'Bugün hava kötü.')
    ]
  },
  {
    id: 'p100_a1_place', unitNumber: 10.9705, levelGroup: 'A1',
    title: 'Konum Edatları', description: 'Üstünde, altında, yanında: eşyayı yerleştir',
    category: 'Temel Dilbilgisi', color: '#84cc16', icon: '📍',
    grammarExplain: `📌 KONUM EDATLARI + HÂL:
1. на (üstünde) ve в (içinde) konum anlatırken bulunma hâli (-е) alır: на столе, в столе.
2. под (altında) araç hâli alır: под столом.
3. около / рядом с (yanında) — около tamlayan hâl, рядом с araç hâli ister: около стола, рядом со столом.`,
    words: [
      W('p100a1pl_1', 'На', 'Na', 'Üstünde / -de', 'A1', 'Yüzey ve açık alanlarda: на столе, на работе.'),
      W('p100a1pl_2', 'В', 'V', 'İçinde / -de', 'A1', 'Kapalı mekânlarda: в комнате, в городе.'),
      W('p100a1pl_3', 'Под', 'Pat', 'Altında', 'A1', 'Sondaki Д sedasızlaşır: "pat" okunur.'),
      W('p100a1pl_4', 'Над', 'Nat', 'Üzerinde (havada)', 'A1', 'Değmeden üstte durmayı anlatır; на ile karıştırılmamalı.'),
      W('p100a1pl_5', 'Рядом', 'Ryádam', 'Yanında', 'A1', 'Tek başına "yakında" da demektir: Он рядом.'),
      W('p100a1pl_6', 'Здесь', 'Zdyes', 'Burada', 'A1', 'Karşıtı там (orada).')
    ],
    sentences: [
      S('Книга на столе.', 'Kitap masanın üstünde.'),
      S('Кот под столом.', 'Kedi masanın altında.'),
      S('Магазин рядом с домом.', 'Mağaza evin yanında.')
    ]
  },
  {
    id: 'p100_a1_seasons', unitNumber: 10.9706, levelGroup: 'A1',
    title: 'Mevsimler ve Hava', description: 'Rus kışını ve dört mevsimi anlat',
    category: 'Günlük Hayat', color: '#38bdf8', icon: '🌦️',
    grammarExplain: `📌 MEVSİM ZARFLARI:
1. Mevsim adları araç hâline girince zarf olur: зима → зимой (kışın), лето → летом (yazın).
2. Hava için kişisiz kalıp: Сегодня холодно. (Bugün soğuk.) — özne yoktur.
3. "Kaç derece?" = Сколько градусов? Eksi için минус: минус десять.`,
    words: [
      W('p100a1s_1', 'Зима', 'Zimá', 'Kış', 'A1', 'Rus kültürünün simgesi; зимой = kışın.'),
      W('p100a1s_2', 'Весна', 'Visná', 'İlkbahar', 'A1', 'весной = ilkbaharda.'),
      W('p100a1s_3', 'Лето', 'Lyéta', 'Yaz', 'A1', 'лет (yıl) kelimesiyle akrabadır: yıllar yazlarla sayılırdı.'),
      W('p100a1s_4', 'Осень', 'Ósin', 'Sonbahar', 'A1', 'Dişildir; осенью = sonbaharda.'),
      W('p100a1s_5', 'Снег', 'Snyek', 'Kar', 'A1', 'Sondaki Г, K okunur; Идёт снег = Kar yağıyor.'),
      W('p100a1s_6', 'Дождь', 'Dojd', 'Yağmur', 'A1', 'Идёт дождь = Yağmur yağıyor — "gidiyor" fiiliyle kurulur.')
    ],
    sentences: [
      S('Зимой в Москве очень холодно.', 'Kışın Moskova\'da çok soğuk olur.'),
      S('Сегодня идёт снег.', 'Bugün kar yağıyor.'),
      S('Летом я отдыхаю.', 'Yazın dinlenirim.')
    ]
  },
  {
    id: 'p100_a1_clothes', unitNumber: 10.9707, levelGroup: 'A1',
    title: 'Kıyafetler', description: 'Giyin, beden sor, mağazada konuş',
    category: 'Günlük Hayat', color: '#ec4899', icon: '👕',
    grammarExplain: `📌 GİYİNME FİİLLERİ:
1. надеть = (bir şeyi) giymek: надеть пальто. одеться = (kendisi) giyinmek.
2. "Üstümde" demek için: на мне куртка.
3. Beden sorusu: Какой у вас размер? (Bedeniniz kaç?)`,
    words: [
      W('p100a1c_1', 'Рубашка', 'Rubáşka', 'Gömlek', 'A1', 'Küçültme eki -ка halk giysisi adlarında çok yaygındır.'),
      W('p100a1c_2', 'Брюки', 'Bryúki', 'Pantolon', 'A1', 'Daima çoğuldur, tekili kullanılmaz.'),
      W('p100a1c_3', 'Куртка', 'Kúrtka', 'Mont / Ceket', 'A1', 'Kışlık kalın olanı пуховик denir.'),
      W('p100a1c_4', 'Платье', 'Plátye', 'Elbise', 'A1', 'Nötr cinstir; çoğulu платья.'),
      W('p100a1c_5', 'Обувь', 'Óbuv', 'Ayakkabı (genel)', 'A1', 'Toplu isimdir, dişildir; tekil kullanılır.'),
      W('p100a1c_6', 'Шапка', 'Şápka', 'Bere / Şapka', 'A1', 'Rus kışında şart; Türkçeye "şapka" olarak geçmiştir.')
    ],
    sentences: [
      S('Я надел тёплую куртку.', 'Kalın bir mont giydim.'),
      S('Эта рубашка очень красивая.', 'Bu gömlek çok güzel.'),
      S('Зимой нужна шапка.', 'Kışın bere gerekli.')
    ]
  },
  {
    id: 'p100_a1_school', unitNumber: 10.9708, levelGroup: 'A1',
    title: 'Okul ve Kırtasiye', description: 'Sınıf eşyaları ve ders dili',
    category: 'Günlük Hayat', color: '#a855f7', icon: '📚',
    grammarExplain: `📌 SINIF KOMUTLARI (emir kipi):
1. Читайте! (Okuyun!), Пишите! (Yazın!), Слушайте! (Dinleyin!) — resmî/çoğul emir -йте ile biter.
2. Samimi tekil: Читай! Пиши!
3. "Anlamıyorum" = Я не понимаю. "Tekrar eder misiniz?" = Повторите, пожалуйста.`,
    words: [
      W('p100a1sc_1', 'Учитель', 'Uçítil', 'Öğretmen', 'A1', 'Kadın öğretmen учительница olur.'),
      W('p100a1sc_2', 'Ученик', 'Uçiník', 'Öğrenci (okul)', 'A1', 'Üniversite öğrencisi студент\'tir.'),
      W('p100a1sc_3', 'Тетрадь', 'Titrát', 'Defter', 'A1', 'Dişildir; sondaki Д, T okunur.'),
      W('p100a1sc_4', 'Ручка', 'Rúçka', 'Kalem (tükenmez)', 'A1', 'Aynı kelime "küçük el" ve "kulp" demektir.'),
      W('p100a1sc_5', 'Урок', 'Urók', 'Ders', 'A1', '"Ders çalışmak" değil "ders saati" anlamındadır.'),
      W('p100a1sc_6', 'Вопрос', 'Vaprós', 'Soru', 'A1', 'Задать вопрос = soru sormak (спросить de olur).')
    ],
    sentences: [
      S('У меня есть вопрос.', 'Bir sorum var.'),
      S('Учитель читает текст.', 'Öğretmen metni okuyor.'),
      S('Урок начинается в девять.', 'Ders dokuzda başlıyor.')
    ]
  },
  {
    id: 'p100_a1_family2', unitNumber: 10.9709, levelGroup: 'A1',
    title: 'Geniş Aile', description: 'Akrabalık adları ve aile tanıtımı',
    category: 'Günlük Hayat', color: '#f59e0b', icon: '👨‍👩‍👧',
    grammarExplain: `📌 AİLEYİ TANITMAK:
1. У меня большая семья. (Büyük bir ailem var.)
2. "Evli misin?" erkeğe: Ты женат? kadına: Ты замужем? — cinsiyete göre DEĞİŞİR.
3. Akrabalar tamlayan hâlle bağlanır: брат моей мамы (annemin erkek kardeşi).`,
    words: [
      W('p100a1f_1', 'Семья', 'Simyá', 'Aile', 'A1', 'Vurgu sondadır; çoğulu семьи.'),
      W('p100a1f_2', 'Бабушка', 'Bábuşka', 'Babaanne / Anneanne', 'A1', 'Rus kültürünün simge figürü; tek kelimeyle iki nineyi karşılar.'),
      W('p100a1f_3', 'Дедушка', 'Dyéduşka', 'Dede', 'A1', 'Eril anlamlıdır ama dişil gibi çekimlenir.'),
      W('p100a1f_4', 'Дядя', 'Dyádya', 'Amca / Dayı', 'A1', 'Tek kelime iki akrabalığı karşılar.'),
      W('p100a1f_5', 'Тётя', 'Tyótya', 'Hala / Teyze', 'A1', 'Yabancı yetişkin kadınlara da halk dilinde böyle seslenilir.'),
      W('p100a1f_6', 'Внук', 'Vnuk', 'Torun (erkek)', 'A1', 'Kız torun внучка olur.')
    ],
    sentences: [
      S('Моя бабушка живёт в деревне.', 'Babaannem köyde yaşıyor.'),
      S('У меня большая семья.', 'Benim büyük bir ailem var.'),
      S('Это мой дядя.', 'Bu benim amcam.')
    ]
  },
  {
    id: 'p100_a1_meaning_neg', unitNumber: 10.971, levelGroup: 'A1',
    title: 'Cümlede Anlam: Olumlu / Olumsuz', description: 'Не ve ни ile anlamı tersine çevir',
    category: 'Cümlede Anlam', color: '#ef4444', icon: '🚫',
    grammarExplain: `📌 OLUMSUZLUĞUN ANLAMI DEĞİŞTİRMESİ:
1. не hangi kelimenin ÖNÜNDEYSE onu olumsuzlar: Я не читаю книгу (okumuyorum) ≠ Я читаю не книгу (kitap değil başka şey okuyorum).
2. Rusçada ÇİFT OLUMSUZLUK doğrudur: Я ничего не знаю = Hiçbir şey bilmiyorum (iki olumsuz birden gerekir).
3. никто, ничего, никогда kelimeleri yanlarında mutlaka не ister.`,
    words: [
      W('p100a1mn_1', 'Не', 'Ni', 'Değil / -ma', 'A1', 'Vurgusuzdur, kendinden sonraki kelimeye yapışır gibi okunur.'),
      W('p100a1mn_2', 'Ничего', 'Niçivó', 'Hiçbir şey', 'A1', 'Г burada V okunur; ayrıca "önemli değil" anlamında da kullanılır.'),
      W('p100a1mn_3', 'Никто', 'Niktó', 'Hiç kimse', 'A1', 'Cümlede mutlaka не ile gelir: Никто не знает.'),
      W('p100a1mn_4', 'Никогда', 'Nikagdá', 'Asla / Hiçbir zaman', 'A1', 'Я никогда не был здесь = Buraya hiç gelmedim.'),
      W('p100a1mn_5', 'Тоже', 'Tóje', 'De / Da (olumlu)', 'A1', 'Olumsuz cümlede тоже yerine также/тоже не kullanımına dikkat.'),
      W('p100a1mn_6', 'Конечно', 'Kanyéşna', 'Elbette', 'A1', 'ЧН burada "şn" okunur — istisna telaffuz.')
    ],
    sentences: [
      S('Я ничего не понимаю.', 'Hiçbir şey anlamıyorum.'),
      S('Никто не знает ответ.', 'Cevabı hiç kimse bilmiyor.'),
      S('Я читаю не книгу, а журнал.', 'Kitap değil dergi okuyorum.')
    ]
  },
  {
    id: 'p100_a1_meaning_tone', unitNumber: 10.9711, levelGroup: 'A1',
    title: 'Cümlede Anlam: Vurgu ve Tonlama', description: 'Aynı cümle, farklı anlam',
    category: 'Cümlede Anlam', color: '#d946ef', icon: '🎵',
    grammarExplain: `📌 TONLAMA ANLAMI BELİRLER:
1. Ты дома. (düz ton) = Evdesin. / Ты дома? (yükselen ton) = Evde misin? Yazı aynı, ANLAM farklı.
2. Vurgulanan kelime cümlenin sonuna kaydırılır: Книгу читает Иван = Kitabı (asıl) İvan okuyor.
3. Kelime içindeki hece vurgusu da anlam değiştirir: зáмок (şato) ≠ замóк (kilit).`,
    words: [
      W('p100a1mt_1', 'Замок', 'Zámak / Zamók', 'Şato / Kilit', 'A1', 'Vurgu başta = şato, sonda = kilit. Klasik vurgu örneği.'),
      W('p100a1mt_2', 'Мука', 'Múka / Muká', 'Işkence / Un', 'A1', 'Vurgu başta = ıstırap, sonda = un. Mutfakta dikkat!'),
      W('p100a1mt_3', 'Ударение', 'Udaryéniye', 'Vurgu', 'A1', 'Rusçada vurgu gezicidir, kelimeyle birlikte ezberlenmelidir.'),
      W('p100a1mt_4', 'Вопрос', 'Vaprós', 'Soru', 'A1', 'Soru tonlaması İT-3 denilen keskin yükselişle yapılır.'),
      W('p100a1mt_5', 'Правда', 'Právda', 'Doğru / Gerçek', 'A1', 'Cümle sonunda "правда?" = "değil mi?" anlamı katar.'),
      W('p100a1mt_6', 'Разве', 'Rázvi', 'Yoksa / Sahi mi', 'A1', 'Şaşkınlık katar: Разве ты не знал? (Sahi bilmiyor muydun?)')
    ],
    sentences: [
      S('Ты дома?', 'Evde misin?'),
      S('Это правда?', 'Bu doğru mu?'),
      S('Разве он здесь?', 'Yoksa o burada mı?')
    ]
  },
  {
    id: 'p100_a1_culture_greet', unitNumber: 10.9712, levelGroup: 'A1',
    title: 'Kültür: Selamlaşma Adabı', description: 'Ruslarla ilk teması doğru kur',
    category: 'Kültür', color: '#0891b2', icon: '🤝',
    grammarExplain: `📌 RUS GÖRGÜ KURALLARI:
1. Resmî hitapta AD + BABA ADI kullanılır: Иван Петрович. Soyadıyla hitap nadirdir.
2. Eşikte (kapı aralığında) tokalaşmak uğursuz sayılır — önce içeri girilir.
3. Здравствуйте resmî, Привет samimidir. Yabancıya daima Здравствуйте ve вы ile başlanır.`,
    words: [
      W('p100a1cg_1', 'Здравствуйте', 'Zdrástvuyti', 'Merhaba (resmî)', 'A1', 'İlk В okunmaz; "zdrastvuyti" der gibi söylenir.'),
      W('p100a1cg_2', 'Привет', 'Privyét', 'Selam', 'A1', 'Sadece tanıdıklara ve gençler arasında.'),
      W('p100a1cg_3', 'Отчество', 'Ótçistva', 'Baba adı', 'A1', 'Rus isim sisteminin ortadaki parçası: İvan İvanoviç.'),
      W('p100a1cg_4', 'Вы', 'Vı', 'Siz (resmî)', 'A1', 'Tek kişiye saygı için de kullanılır, büyük harfle yazılabilir.'),
      W('p100a1cg_5', 'Извините', 'İzviníti', 'Affedersiniz', 'A1', 'Dikkat çekmek için de kullanılır.'),
      W('p100a1cg_6', 'Пожалуйста', 'Pajálsta', 'Lütfen / Rica ederim', 'A1', 'Hızlı konuşmada heceler yutulur: "pajalsta".')
    ],
    sentences: [
      S('Здравствуйте, меня зовут Айкут.', 'Merhaba, benim adım Aykut.'),
      S('Извините, вы говорите по-английски?', 'Affedersiniz, İngilizce konuşuyor musunuz?'),
      S('Спасибо, до свидания.', 'Teşekkürler, hoşça kalın.')
    ]
  },
  {
    id: 'p100_a1_culture_tea', unitNumber: 10.9713, levelGroup: 'A1',
    title: 'Kültür: Çay ve Samovar', description: 'Rus çay sofrasının dili',
    category: 'Kültür', color: '#b45309', icon: '🍵',
    grammarExplain: `📌 İKRAM DİLİ:
1. Teklif: Хотите чай? (Çay ister misiniz?) — resmî çoğul.
2. Kabul: Да, с удовольствием. (Evet, memnuniyetle.) Ret: Нет, спасибо.
3. Rus misafirliğinde ikramı ilk seferde reddetmek kibarlık değildir; sofraya oturmak beklenir.`,
    words: [
      W('p100a1ct_1', 'Чай', 'Çay', 'Çay', 'A1', 'Türkçeyle aynı kökten; Rusya\'ya Çin üzerinden gelmiştir.'),
      W('p100a1ct_2', 'Самовар', 'Samavár', 'Semaver', 'A1', '"Kendi kendine kaynatan" demektir: сам + варить.'),
      W('p100a1ct_3', 'Варенье', 'Varyénye', 'Reçel', 'A1', 'Rus çayının klasik eşlikçisi; kaşıkla yenir.'),
      W('p100a1ct_4', 'Сахар', 'Sáhar', 'Şeker', 'A1', 'Kesme şekeri ısırarak çay içme geleneği vardır (вприкуску).'),
      W('p100a1ct_5', 'Гость', 'Gost', 'Misafir', 'A1', 'В гостях = misafirlikte; В гости = misafirliğe.'),
      W('p100a1ct_6', 'Угощение', 'Ugaşşéniye', 'İkram', 'A1', 'Угощайтесь! = Buyurun, alın!')
    ],
    sentences: [
      S('Хотите чай с вареньем?', 'Reçelli çay ister misiniz?'),
      S('Мы пьём чай из самовара.', 'Semaverden çay içiyoruz.'),
      S('Спасибо за угощение.', 'İkram için teşekkürler.')
    ]
  },
  {
    id: 'p100_a1_rel_ortho', unitNumber: 10.9714, levelGroup: 'A1',
    title: 'Din: Ortodoks Kilisesi', description: 'Kilise ziyaretinin temel kelimeleri',
    category: 'Din ve Maneviyat', color: '#facc15', icon: '⛪',
    grammarExplain: `📌 SAYGILI DİL:
1. Dinî mekânlarda в церкви (kilisede), в храме (mabette) kalıpları kullanılır.
2. Kadınlar kiliseye başörtüsüyle (платок) girer, erkekler şapkasını çıkarır.
3. "İnanıyorum" = Я верю. "İnançlıyım" = Я верующий (erkek) / верующая (kadın).`,
    words: [
      W('p100a1ro_1', 'Церковь', 'Tsérkav', 'Kilise', 'A1', 'Dişildir; büyük katedrale собор denir.'),
      W('p100a1ro_2', 'Икона', 'İkóna', 'İkona', 'A1', 'Rus Ortodoksluğunun merkez sembolü; evlerde köşede durur.'),
      W('p100a1ro_3', 'Свеча', 'Sviçá', 'Mum', 'A1', 'Kilisede mum yakmak: поставить свечу.'),
      W('p100a1ro_4', 'Молитва', 'Malítva', 'Dua', 'A1', 'Fiili молиться (dua etmek).'),
      W('p100a1ro_5', 'Бог', 'Boh', 'Tanrı', 'A1', 'Sondaki Г istisna olarak "h" okunur.'),
      W('p100a1ro_6', 'Крест', 'Kryest', 'Haç', 'A1', 'Haç çıkarmak: креститься.')
    ],
    sentences: [
      S('Это очень старая церковь.', 'Bu çok eski bir kilise.'),
      S('Бабушка ставит свечу.', 'Babaanne mum yakıyor.'),
      S('Он читает молитву.', 'O dua okuyor.')
    ]
  },
  {
    id: 'p100_a1_rel_islam', unitNumber: 10.9715, levelGroup: 'A1',
    title: 'Din: Rusya\'da İslam', description: 'Cami, oruç, bayram: temel İslamî sözcükler',
    category: 'Din ve Maneviyat', color: '#16a34a', icon: '🕌',
    grammarExplain: `📌 KÜLTÜRLERARASI BİLGİ:
1. Rusya'nın ikinci büyük dini İslam'dır: Tataristan, Başkurdistan ve Kuzey Kafkasya'da yaygındır.
2. Rusçada İslamî terimler Arapçadan geçmiştir: мечеть, намаз, халяль.
3. "Ben Müslümanım" = Я мусульманин (erkek) / Я мусульманка (kadın).`,
    words: [
      W('p100a1ri_1', 'Мечеть', 'Miçyét', 'Cami', 'A1', 'Dişildir: красивая мечеть.'),
      W('p100a1ri_2', 'Мусульманин', 'Musulmánin', 'Müslüman (erkek)', 'A1', 'Çoğulu мусульмане (kural dışı).'),
      W('p100a1ri_3', 'Намаз', 'Namás', 'Namaz', 'A1', 'Rusçaya Farsça-Türkçe yoluyla girmiştir.'),
      W('p100a1ri_4', 'Пост', 'Post', 'Oruç / Perhiz', 'A1', 'Hem Ortodoks perhizi hem Ramazan orucu için kullanılır.'),
      W('p100a1ri_5', 'Халяль', 'Halyál', 'Helal', 'A1', 'Marketlerde халяль etiketiyle görülür.'),
      W('p100a1ri_6', 'Праздник', 'Prázdnik', 'Bayram', 'A1', 'Д okunmaz: "praznik".')
    ],
    sentences: [
      S('В Казани есть большая мечеть.', 'Kazan\'da büyük bir cami var.'),
      S('Он мусульманин.', 'O Müslüman.'),
      S('Сегодня праздник.', 'Bugün bayram.')
    ]
  },
  {
    id: 'p100_a1_newyear', unitNumber: 10.9716, levelGroup: 'A1',
    title: 'Kültür: Yeni Yıl', description: 'Rusların en büyük bayramı',
    category: 'Kültür', color: '#22c55e', icon: '🎄',
    grammarExplain: `📌 KUTLAMA KALIPLARI:
1. С Новым годом! (Yeni yılın kutlu olsun!) — "с + araç hâli" kutlama kalıbıdır.
2. Aynı kalıp her bayramda: С днём рождения! (Doğum günün kutlu olsun!)
3. Dilek: Желаю счастья! (Mutluluk dilerim!) — желать tamlayan hâl ister.`,
    words: [
      W('p100a1ny_1', 'Новый год', 'Nóvıy got', 'Yeni Yıl', 'A1', 'Rusya\'nın 1 numaralı bayramı; Noel\'den daha büyük kutlanır.'),
      W('p100a1ny_2', 'Ёлка', 'Yólka', 'Yılbaşı ağacı', 'A1', 'Aslında "köknar" demektir.'),
      W('p100a1ny_3', 'Дед Мороз', 'Dyed Marós', 'Ayaz Dede', 'A1', 'Rus Noel Baba\'sı; yanında torunu Снегурочка bulunur.'),
      W('p100a1ny_4', 'Подарок', 'Padárak', 'Hediye', 'A1', 'дарить (hediye etmek) fiilinden.'),
      W('p100a1ny_5', 'Поздравляю', 'Pazdravlyáyu', 'Kutlarım', 'A1', 'Ardından с + araç hâli gelir.'),
      W('p100a1ny_6', 'Счастье', 'Şşástye', 'Mutluluk', 'A1', 'СЧ birleşimi tek uzun "ş" sesi verir.')
    ],
    sentences: [
      S('С Новым годом!', 'Yeni yılın kutlu olsun!'),
      S('Дед Мороз принёс подарки.', 'Ayaz Dede hediyeler getirdi.'),
      S('Желаю вам счастья.', 'Size mutluluk diliyorum.')
    ]
  },
  {
    id: 'p100_a1_city2', unitNumber: 10.9717, levelGroup: 'A1',
    title: 'Şehirde Yön Sorma', description: 'Kaybolma: sağ, sol, düz',
    category: 'Günlük Hayat', color: '#3b82f6', icon: '🧭',
    grammarExplain: `📌 YÖN TARİFİ:
1. Soru: Где находится метро? (Metro nerede?) / Как пройти к метро? (Metroya nasıl gidilir?)
2. Cevap: Идите прямо, потом направо. (Düz gidin, sonra sağa.)
3. налево/направо (yöne doğru) ≠ слева/справа (solda/sağda) — hareket mi konum mu ayırt edilmeli.`,
    words: [
      W('p100a1ci_1', 'Прямо', 'Pryáma', 'Düz / Dosdoğru', 'A1', 'Mecazi olarak "açıkça" da demektir.'),
      W('p100a1ci_2', 'Направо', 'Naprává', 'Sağa', 'A1', 'Konum için справа (sağda) kullanılır.'),
      W('p100a1ci_3', 'Налево', 'Nalyéva', 'Sola', 'A1', 'Halk dilinde "gizlice" anlamı da vardır.'),
      W('p100a1ci_4', 'Улица', 'Úlitsa', 'Sokak / Cadde', 'A1', 'Adres yazımında kısaltması ул.'),
      W('p100a1ci_5', 'Площадь', 'Plóşşat', 'Meydan', 'A1', 'Красная площадь = Kızıl Meydan.'),
      W('p100a1ci_6', 'Остановка', 'Astanóvka', 'Durak', 'A1', 'останавливаться (durmak) fiilinden.')
    ],
    sentences: [
      S('Идите прямо, потом направо.', 'Düz gidin, sonra sağa dönün.'),
      S('Где остановка автобуса?', 'Otobüs durağı nerede?'),
      S('Наш дом на этой улице.', 'Bizim evimiz bu sokakta.')
    ]
  },
  {
    id: 'p100_a1_animals2', unitNumber: 10.9718, levelGroup: 'A1',
    title: 'Hayvanlar 2', description: 'Orman ve çiftlik hayvanları',
    category: 'Temel Kelimeler', color: '#65a30d', icon: '🐻',
    grammarExplain: `📌 CANLI VARLIK HÂLİ:
1. Canlı erillerde belirtme hâli tamlayan hâle eşittir: Я вижу медведя. (Ayıyı görüyorum.)
2. Cansızda değişmez: Я вижу дом.
3. "Kim?" sorusu canlılar için: Кого ты видишь? (Kimi görüyorsun?)`,
    words: [
      W('p100a1an_1', 'Медведь', 'Midvyét', 'Ayı', 'A1', 'Rusya\'nın sembolü; "bal bilen" anlamındaki eski kökten gelir.'),
      W('p100a1an_2', 'Волк', 'Volk', 'Kurt', 'A1', 'Masalların değişmez karakteri.'),
      W('p100a1an_3', 'Лиса', 'Lisá', 'Tilki', 'A1', 'Halk masallarında kurnazlık simgesi: Лиса Патрикеевна.'),
      W('p100a1an_4', 'Корова', 'Karóva', 'İnek', 'A1', 'Akanje: "karova".'),
      W('p100a1an_5', 'Лошадь', 'Lóşat', 'At', 'A1', 'Dişildir; Türkçe kökenli olduğu düşünülür (alaşa).'),
      W('p100a1an_6', 'Птица', 'Ptítsa', 'Kuş', 'A1', 'Синяя птица = mutluluk kuşu (edebi imge).')
    ],
    sentences: [
      S('В лесу живёт медведь.', 'Ormanda bir ayı yaşıyor.'),
      S('Я вижу большую птицу.', 'Büyük bir kuş görüyorum.'),
      S('Лиса очень хитрая.', 'Tilki çok kurnazdır.')
    ]
  },
  {
    id: 'p100_a1_routine', unitNumber: 10.9719, levelGroup: 'A1',
    title: 'Günlük Rutin Fiilleri', description: 'Sabahtan akşama gününü anlat',
    category: 'Günlük Hayat', color: '#0d9488', icon: '⏰',
    grammarExplain: `📌 DÖNÜŞLÜ FİİLLER (-СЯ):
1. Bazı rutin fiilleri -ся ile biter ve eylem kişinin kendisine döner: просыпаться (uyanmak), одеваться (giyinmek).
2. Çekim: я просыпаюсь, ты просыпаешься.
3. Saat: в семь часов (yedide), в половине восьмого (yedi buçukta).`,
    words: [
      W('p100a1r_1', 'Просыпаться', 'Prasıpátsa', 'Uyanmak', 'A1', '-ться sonu "tsa" okunur.'),
      W('p100a1r_2', 'Завтракать', 'Závtrakat', 'Kahvaltı etmek', 'A1', 'завтрак (kahvaltı) isminden türer.'),
      W('p100a1r_3', 'Работать', 'Rabótat', 'Çalışmak', 'A1', 'работа (iş) isminden; "robot" kelimesi de aynı kökten.'),
      W('p100a1r_4', 'Отдыхать', 'Addıhát', 'Dinlenmek', 'A1', 'Tatil yapmak anlamında da kullanılır.'),
      W('p100a1r_5', 'Ложиться', 'Lajítsa', 'Yatmak', 'A1', 'Ложиться спать = uyumaya yatmak.'),
      W('p100a1r_6', 'Успевать', 'Uspivát', 'Yetişmek', 'A1', 'Я не успеваю = Yetiştiremiyorum.')
    ],
    sentences: [
      S('Я просыпаюсь в семь часов.', 'Saat yedide uyanıyorum.'),
      S('Потом я завтракаю и иду на работу.', 'Sonra kahvaltı edip işe gidiyorum.'),
      S('Вечером я отдыхаю дома.', 'Akşamları evde dinleniyorum.')
    ]
  },
  {
    id: 'p100_a1_feelings', unitNumber: 10.972, levelGroup: 'A1',
    title: 'Duygular ve Nezaket', description: 'Nasıl hissettiğini söyle, özür dile',
    category: 'Günlük Hayat', color: '#e11d48', icon: '💬',
    grammarExplain: `📌 KİŞİSİZ DUYGU KALIPLARI:
1. Duygular çoğu zaman yönelme hâliyle kurulur: Мне грустно. (Üzgünüm.) Мне весело. (Neşeliyim.)
2. Я рад (erkek) / Я рада (kadın) = Memnunum — cinsiyete göre değişir.
3. Özür: Извини (samimi) / Простите (resmî, daha ağır).`,
    words: [
      W('p100a1fe_1', 'Радость', 'Rádast', 'Sevinç', 'A1', 'Sıfatı радостный.'),
      W('p100a1fe_2', 'Грустно', 'Grúsna', 'Üzgün (hissetmek)', 'A1', 'Kişisiz kalıp: Мне грустно.'),
      W('p100a1fe_3', 'Устал', 'Ustál', 'Yoruldum', 'A1', 'Kadın устала der — geçmiş zaman cinsiyete uyar.'),
      W('p100a1fe_4', 'Скучать', 'Skuçát', 'Özlemek', 'A1', 'Я скучаю по тебе = Seni özlüyorum (по + yönelme).'),
      W('p100a1fe_5', 'Простите', 'Prastíti', 'Özür dilerim', 'A1', 'Извините\'den daha içten ve ağır bir özürdür.'),
      W('p100a1fe_6', 'Спасибо', 'Spasíba', 'Teşekkürler', 'A1', '"Спаси Бог" (Tanrı korusun) ifadesinden kısalmıştır.')
    ],
    sentences: [
      S('Мне очень грустно сегодня.', 'Bugün çok üzgünüm.'),
      S('Я очень устал.', 'Çok yoruldum.'),
      S('Я скучаю по дому.', 'Evimi özlüyorum.')
    ]
  }
];
