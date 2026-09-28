// ==========================================================
// A SEVİYESİ BÜYÜK GENİŞLEME — BÖLÜM 2/3 (18 ünite, A1 iletişim & şehir)
// unitNumber 10.9619-10.9636 — A1 finali (HIMYM hikâyesi) öncesi.
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const A_BOOST_2: UnitModule[] = [
  {
    id: 'xa1_weather2', unitNumber: 10.9619, levelGroup: 'A1',
    title: 'Hava Durumu 2', description: 'Rüzgâr, fırtına, şemsiye: zorlu hava',
    category: 'Gündelik Yaşam', color: '#38bdf8', icon: '🌬️',
    grammarExplain: `📌 HAVA DEVAM:
1. На улице ветер. = Dışarıda rüzgâr var. (на улице = dışarıda!)
2. жарко = çok sıcak (bunaltıcı), мороз = dondurucu ayaz.
3. Возьми зонт! = Şemsiye al! (hikâyedeki sarı şemsiyeyi hatırla ☂️)`,
    words: [
      W('xa1_w2_1', 'Ветер', 'Vyétir', 'Rüzgâr', 'A1', 'сильный ветер = güçlü rüzgâr.'),
      W('xa1_w2_2', 'Жарко', 'Járka', 'Çok sıcak', 'A1', 'Yaz bunaltısı; тепло\'dan bir derece üstün.'),
      W('xa1_w2_3', 'Мороз', 'Marós', 'Ayaz / Dondurucu soğuk', 'A1', 'Дед Мороз (Ayaz Dede) buradan!'),
      W('xa1_w2_4', 'Гроза', 'Grazá', 'Fırtına / Gök gürültülü sağanak', 'A1', 'гром = gök gürültüsü.'),
      W('xa1_w2_5', 'Зонт', 'Zont', 'Şemsiye', 'A1', 'Hikâyedeki sarı şemsiye: жёлтый зонт!'),
      W('xa1_w2_6', 'Туман', 'Tumán', 'Sis', 'A1', 'Türkçe "duman"la akraba!')
    ],
    sentences: [
      S('На улице сильный ветер.', 'Dışarıda güçlü bir rüzgâr var.'),
      S('Возьми зонт, будет дождь!', 'Şemsiye al, yağmur yağacak!')
    ]
  },
  {
    id: 'xa1_seasons', unitNumber: 10.962, levelGroup: 'A1',
    title: 'Dört Mevsim', description: 'Kış, ilkbahar, yaz, sonbahar',
    category: 'Temel Kelimeler', color: '#84cc16', icon: '🍂',
    grammarExplain: `📌 MEVSİM ZARFLARI:
1. Mevsimler araç hâliyle zarf olur: зимой (kışın), летом (yazın), весной (ilkbaharda), осенью (sonbaharda).
2. Год = yıl: в этом году (bu yıl).
3. Rus edebiyatının favori mevsimi: золотая осень (altın sonbahar).`,
    words: [
      W('xa1_se_1', 'Зима', 'Zimá', 'Kış', 'A1', 'зимой = kışın.'),
      W('xa1_se_2', 'Весна', 'Visná', 'İlkbahar', 'A1', 'весной = ilkbaharda.'),
      W('xa1_se_3', 'Лето', 'Lyéta', 'Yaz', 'A1', 'летом = yazın.'),
      W('xa1_se_4', 'Осень', 'Ósin', 'Sonbahar', 'A1', 'золотая осень = altın sonbahar.'),
      W('xa1_se_5', 'Год', 'Got', 'Yıl', 'A1', 'Новый год = yılbaşı.'),
      W('xa1_se_6', 'Месяц', 'Myésits', 'Ay (takvim)', 'A1', 'Aynı zamanda "hilal" demektir.')
    ],
    sentences: [
      S('Зимой в России холодно.', 'Kışın Rusya\'da soğuk olur.'),
      S('Лето — моё любимое время года.', 'Yaz, yılın en sevdiğim zamanı.')
    ]
  },
  {
    id: 'xa1_months', unitNumber: 10.9621, levelGroup: 'A1',
    title: 'Aylar Pratiği', description: 'Ocak\'tan Aralık\'a takvim turu',
    category: 'Temel Kelimeler', color: '#f59e0b', icon: '📆',
    grammarExplain: `📌 AY KALIPLARI:
1. "... ayında" = в + ay (-е eki): в январе (ocakta), в мае (mayısta).
2. Ay adları küçük harfle yazılır ve çoğu ERİLDİR.
3. Doğum günü sorusu: Когда у тебя день рождения? — В июле!`,
    words: [
      W('xa1_mt_1', 'Январь', 'Yinvár', 'Ocak', 'A1', 'в январе = ocak ayında.'),
      W('xa1_mt_2', 'Март', 'Mart', 'Mart', 'A1', 'Türkçeyle aynı — 8 Mart kadınlar günü Rusya\'da büyük bayramdır.'),
      W('xa1_mt_3', 'Май', 'May', 'Mayıs', 'A1', 'Bahar tatillerinin ayı.'),
      W('xa1_mt_4', 'Июль', 'İyúl', 'Temmuz', 'A1', 'июнь (haziran) ile karıştırma: июЛь = temmuz.'),
      W('xa1_mt_5', 'Сентябрь', 'Sintyábr', 'Eylül', 'A1', 'Okulun başladığı ay: 1 сентября.'),
      W('xa1_mt_6', 'Декабрь', 'Dikábr', 'Aralık', 'A1', 'Yılbaşı hazırlıklarının ayı.')
    ],
    sentences: [
      S('Мой день рождения в мае.', 'Doğum günüm mayısta.'),
      S('В декабре идёт снег.', 'Aralıkta kar yağar.')
    ]
  },
  {
    id: 'xa1_directions', unitNumber: 10.9622, levelGroup: 'A1',
    title: 'Sağa mı Sola mı?', description: 'Yön kelimeleri: kaybolmadan sor',
    category: 'Gündelik Yaşam', color: '#10b981', icon: '🧭',
    grammarExplain: `📌 YÖN SORMA:
1. Где...? (nerede) → yanıt: рядом (yakında), далеко (uzakta).
2. Как пройти к...? = ...e nasıl gidilir?
3. направо (sağa) / налево (sola) / прямо (düz) — üç sihirli yön.`,
    words: [
      W('xa1_di_1', 'Направо', 'Napráva', 'Sağa', 'A1', 'правый = sağ (aynı zamanda "haklı").'),
      W('xa1_di_2', 'Налево', 'Nalyéva', 'Sola', 'A1', 'левый = sol.'),
      W('xa1_di_3', 'Прямо', 'Pryáma', 'Düz / Dosdoğru', 'A1', 'Идите прямо! = Düz gidin!'),
      W('xa1_di_4', 'Рядом', 'Ryádam', 'Yakında / Yanında', 'A1', 'рядом с домом = evin yanında.'),
      W('xa1_di_5', 'Далеко', 'Daliká', 'Uzak', 'A1', 'Это далеко? = Uzak mı?'),
      W('xa1_di_6', 'Здесь', 'Zdyes', 'Burada', 'A1', 'Hikâyede: Можно сесть здесь? (Buraya oturabilir miyim?)')
    ],
    sentences: [
      S('Кафе рядом, идите прямо.', 'Kafe yakında, düz gidin.'),
      S('Потом поверните направо.', 'Sonra sağa dönün.')
    ]
  },
  {
    id: 'xa1_bus', unitNumber: 10.9623, levelGroup: 'A1',
    title: 'Otobüs Durağı', description: 'Otobüs, tramvay, bilet: toplu taşıma 1',
    category: 'Gündelik Yaşam', color: '#f97316', icon: '🚌',
    grammarExplain: `📌 TOPLU TAŞIMA:
1. ехать на автобусе = otobüsle gitmek (на + araç).
2. Вы выходите? = İniyor musunuz? (kalabalık otobüsün klasik sorusu!)
3. остановка = durak: на остановке = durakta.`,
    words: [
      W('xa1_bu_1', 'Автобус', 'Aftóbus', 'Otobüs', 'A1', 'В sedasızlaşır: aftóbus.'),
      W('xa1_bu_2', 'Трамвай', 'Tramváy', 'Tramvay', 'A1', 'Rus şehirlerinin nostaljik simgesi.'),
      W('xa1_bu_3', 'Остановка', 'Astanófka', 'Durak', 'A1', 'остановить (durdurmak) kökünden.'),
      W('xa1_bu_4', 'Билет', 'Bilyét', 'Bilet', 'A1', 'Türkçeyle aynı Fransızca kökten.'),
      W('xa1_bu_5', 'Ехать', 'Yéhat', 'Gitmek (araçla)', 'A1', 'идти = yürüyerek, ехать = araçla!'),
      W('xa1_bu_6', 'Выходить', 'Vıhadít', 'İnmek / Çıkmak', 'A1', 'Вы выходите? = İniyor musunuz?')
    ],
    sentences: [
      S('Я еду на автобусе домой.', 'Otobüsle eve gidiyorum.'),
      S('Вы выходите на остановке?', 'Durakta iniyor musunuz?')
    ]
  },
  {
    id: 'xa1_metro', unitNumber: 10.9624, levelGroup: 'A1',
    title: 'Metro Macerası', description: 'İstasyon, giriş, çıkış: yeraltı dünyası',
    category: 'Gündelik Yaşam', color: '#ef4444', icon: '🚇',
    grammarExplain: `📌 METRO DİLİ:
1. Moskova metrosu dünyanın en güzellerindendir — istasyonlar müze gibi!
2. вход (giriş) ↔ выход (çıkış): tabelaların iki yıldızı.
3. Осторожно, двери закрываются! = Dikkat, kapılar kapanıyor! (her seferde duyacaksın)`,
    words: [
      W('xa1_me_1', 'Метро', 'Mitró', 'Metro', 'A1', 'Değişmez nötr kelime.'),
      W('xa1_me_2', 'Станция', 'Stántsiya', 'İstasyon', 'A1', 'на станции = istasyonda.'),
      W('xa1_me_3', 'Вход', 'Fhot', 'Giriş', 'A1', 'В sedasızlaşır: fhot.'),
      W('xa1_me_4', 'Выход', 'Vıhat', 'Çıkış', 'A1', 'нет выхода = çıkış yok.'),
      W('xa1_me_5', 'Переход', 'Pirihót', 'Geçiş / Aktarma', 'A1', 'Hat değiştirme geçidi.'),
      W('xa1_me_6', 'Двери', 'Dvyéri', 'Kapılar', 'A1', 'Anonsun yıldızı: двери закрываются.')
    ],
    sentences: [
      S('Где вход в метро?', 'Metro girişi nerede?'),
      S('Двери закрываются, осторожно!', 'Kapılar kapanıyor, dikkat!')
    ]
  },
  {
    id: 'xa1_city2', unitNumber: 10.9625, levelGroup: 'A1',
    title: 'Şehir Turu 2', description: 'Banka, pazar, müze, köprü: yeni duraklar',
    category: 'Gündelik Yaşam', color: '#6366f1', icon: '🌉',
    grammarExplain: `📌 ŞEHİRDE YERLER 2:
1. в банке (bankada), на рынке (pazarda — на!), в музее (müzede).
2. Kızıl Meydan = Красная площадь: площадь (meydan) dişildir.
3. идти в музей = müzeye gitmek (yön); быть в музее = müzede olmak (yer).`,
    words: [
      W('xa1_c2_1', 'Банк', 'Bank', 'Banka', 'A1', 'Uluslararası kelime; в банке = bankada.'),
      W('xa1_c2_2', 'Рынок', 'Rınak', 'Pazar / Çarşı', 'A1', 'на рынке = pazarda (в değil!).'),
      W('xa1_c2_3', 'Музей', 'Muzyéy', 'Müze', 'A1', 'Эрмитаж dünyanın en büyük müzelerinden.'),
      W('xa1_c2_4', 'Театр', 'Tiátr', 'Tiyatro', 'A1', 'Большой театр = Bolşoy Tiyatrosu.'),
      W('xa1_c2_5', 'Мост', 'Most', 'Köprü', 'A1', 'Piter\'in açılır köprüleri ünlüdür.'),
      W('xa1_c2_6', 'Площадь', 'Plóşşit', 'Meydan', 'A1', 'Красная площадь = Kızıl Meydan.')
    ],
    sentences: [
      S('Музей находится на площади.', 'Müze meydanda bulunuyor.'),
      S('Мы идём на рынок.', 'Pazara gidiyoruz.')
    ]
  },
  {
    id: 'xa1_cafe1', unitNumber: 10.9626, levelGroup: 'A1',
    title: 'Kafede 1: Sipariş', description: 'Masa, garson, sipariş: kafe dilinin temeli',
    category: 'Gündelik Yaşam', color: '#a16207', icon: '☕',
    grammarExplain: `📌 KAFE KALIPLARI (hikâyeye doğrudan hazırlık!):
1. Можно меню? = Menü alabilir miyim?
2. Я буду кофе. = Ben kahve alayım. (kelimesi kelimesine "kahve olacağım"!)
3. заказывать = sipariş etmek: Вы уже заказали? (Sipariş verdiniz mi?)`,
    words: [
      W('xa1_k1_1', 'Кафе', 'Kafé', 'Kafe', 'A1', 'Değişmez nötr; hikâyemizin sahnesi!'),
      W('xa1_k1_2', 'Столик', 'Stólik', 'Masa (kafede)', 'A1', 'стол + küçültme: kafede hep столик denir.'),
      W('xa1_k1_3', 'Официант', 'Afitsiánt', 'Garson', 'A1', 'Kadın garson: официантка.'),
      W('xa1_k1_4', 'Заказ', 'Zakás', 'Sipariş', 'A1', 'заказывать = sipariş etmek.'),
      W('xa1_k1_5', 'Я буду...', 'Ya búdu...', 'Ben ... alayım', 'A1', 'Sipariş kalıbı: Я буду чай.'),
      W('xa1_k1_6', 'Принести', 'Prinistí', 'Getirmek', 'A1', 'Принесите, пожалуйста... = Lütfen getirin...')
    ],
    sentences: [
      S('Можно меню, пожалуйста?', 'Menü alabilir miyim lütfen?'),
      S('Я буду кофе и торт.', 'Ben kahve ve pasta alayım.')
    ]
  },
  {
    id: 'xa1_cafe2', unitNumber: 10.9627, levelGroup: 'A1',
    title: 'Kafede 2: Tatlı ve Hesap', description: 'Pasta, hesap, bahşiş: tatlı final',
    category: 'Gündelik Yaşam', color: '#d946ef', icon: '🍰',
    grammarExplain: `📌 HESAP ZAMANI:
1. Счёт, пожалуйста! = Hesap lütfen!
2. вкусно = lezzetli: Очень вкусно! (Çok lezzetli!)
3. сладкий = tatlı (şekerli); десерт = tatlı (yemek sonu).`,
    words: [
      W('xa1_k2_1', 'Торт', 'Tort', 'Pasta', 'A1', 'Doğum günü pastası da торт.'),
      W('xa1_k2_2', 'Десерт', 'Disyért', 'Tatlı (yemek)', 'A1', 'на десерт = tatlı olarak.'),
      W('xa1_k2_3', 'Счёт', 'Şşot', 'Hesap', 'A1', 'СЧ = Щ okunur: şşot.'),
      W('xa1_k2_4', 'Вкусно', 'Fkúsna', 'Lezzetli', 'A1', 'В sedasızlaşır: fkúsna.'),
      W('xa1_k2_5', 'Сладкий', 'Slátkiy', 'Tatlı (şekerli)', 'A1', 'Д sedasızlaşıp T okunur.'),
      W('xa1_k2_6', 'Чаевые', 'Çiyivıye', 'Bahşiş', 'A1', 'чай kökünden: "çay parası"!')
    ],
    sentences: [
      S('Этот торт очень вкусный!', 'Bu pasta çok lezzetli!'),
      S('Счёт, пожалуйста!', 'Hesap lütfen!')
    ]
  },
  {
    id: 'xa1_restaurant', unitNumber: 10.9628, levelGroup: 'A1',
    title: 'Restoranda', description: 'Yemek, porsiyon, servis: akşam yemeği dışarıda',
    category: 'Gündelik Yaşam', color: '#b91c1c', icon: '🍲',
    grammarExplain: `📌 RESTORAN DİLİ:
1. блюдо = yemek (tabaktaki): первое блюдо (çorba), второе блюдо (ana yemek).
2. Что вы посоветуете? = Ne önerirsiniz?
3. Приятного аппетита! = Afiyet olsun!`,
    words: [
      W('xa1_re_1', 'Ресторан', 'Ristarán', 'Restoran', 'A1', 'Fransız kökenli ortak kelime.'),
      W('xa1_re_2', 'Блюдо', 'Blyúda', 'Yemek / Tabak', 'A1', 'фирменное блюдо = spesiyal.'),
      W('xa1_re_3', 'Порция', 'Pórtsiya', 'Porsiyon', 'A1', 'большая порция = büyük porsiyon.'),
      W('xa1_re_4', 'Вкус', 'Fkus', 'Tat / Lezzet', 'A1', 'вкусный (lezzetli) buradan türedi.'),
      W('xa1_re_5', 'Советовать', 'Savyétavat', 'Önermek / Tavsiye etmek', 'A1', 'совет = tavsiye (Sovyet de aynı kelime!).'),
      W('xa1_re_6', 'Аппетит', 'Appitít', 'İştah', 'A1', 'Приятного аппетита! = Afiyet olsun!')
    ],
    sentences: [
      S('Что вы посоветуете?', 'Ne önerirsiniz?'),
      S('Приятного аппетита!', 'Afiyet olsun!')
    ]
  },
  {
    id: 'xa1_market', unitNumber: 10.9629, levelGroup: 'A1',
    title: 'Market Sepeti', description: 'Sepet, kasa, poşet: hızlı alışveriş',
    category: 'Gündelik Yaşam', color: '#16a34a', icon: '🛒',
    grammarExplain: `📌 MARKET PRATİĞİ:
1. купить = satın almak (bitmiş): Я купил хлеб. (Ekmek aldım.)
2. Пакет нужен? = Poşet ister misiniz? (kasada hep sorulur.)
3. свежий = taze: свежий хлеб (taze ekmek).`,
    words: [
      W('xa1_ma_1', 'Корзина', 'Karzína', 'Sepet', 'A1', 'İnternette "sepete ekle" de корзина!'),
      W('xa1_ma_2', 'Касса', 'Kássa', 'Kasa', 'A1', 'на кассе = kasada.'),
      W('xa1_ma_3', 'Пакет', 'Pakyét', 'Poşet', 'A1', 'Kasiyerin klasik sorusu: Пакет нужен?'),
      W('xa1_ma_4', 'Купить', 'Kupít', 'Satın almak', 'A1', 'покупать (süreç) / купить (sonuç).'),
      W('xa1_ma_5', 'Продукты', 'Pradúktı', 'Gıda / Erzak', 'A1', 'магазин продуктов = bakkal/market.'),
      W('xa1_ma_6', 'Свежий', 'Svyéjıy', 'Taze', 'A1', 'свежий воздух = temiz hava (mecaz).')
    ],
    sentences: [
      S('Я купил свежий хлеб.', 'Taze ekmek aldım.'),
      S('Пакет нужен? — Да, пожалуйста.', 'Poşet lazım mı? — Evet, lütfen.')
    ]
  },
  {
    id: 'xa1_phone1', unitNumber: 10.963, levelGroup: 'A1',
    title: 'Telefonda 1: Alo!', description: 'Aramak, duymak, konuşmak: telefon fiilleri',
    category: 'Gündelik Yaşam', color: '#7c3aed', icon: '📞',
    grammarExplain: `📌 TELEFON DİLİ (hikâyenin kalbi!):
1. звонить + kime (-у/-е): звонить маме (anneyi aramak).
2. Алло! = Alo! Я вас слушаю. = Sizi dinliyorum.
3. слышать (duymak) ≠ слушать (dinlemek): Вас плохо слышно! (Sesiniz kötü geliyor!)`,
    words: [
      W('xa1_p1_1', 'Алло', 'Alló', 'Alo', 'A1', 'Telefonda ilk kelime.'),
      W('xa1_p1_2', 'Звонить', 'Zvanít', 'Aramak (telefonla)', 'A1', 'звонок = zil/arama. Hikâyede Marina İLK arayan!'),
      W('xa1_p1_3', 'Слушать', 'Slúşat', 'Dinlemek', 'A1', 'Я вас слушаю = buyurun, dinliyorum.'),
      W('xa1_p1_4', 'Слышать', 'Slışat', 'Duymak', 'A1', 'Плохо слышно = kötü duyuluyor.'),
      W('xa1_p1_5', 'Говорить', 'Gavarít', 'Konuşmak', 'A1', 'Кто говорит? = Kim arıyor/konuşuyor?'),
      W('xa1_p1_6', 'Номер', 'Nómir', 'Numara', 'A1', 'номер телефона = telefon numarası.')
    ],
    sentences: [
      S('Алло, кто говорит?', 'Alo, kim arıyor?'),
      S('Я звоню маме каждый день.', 'Anneme her gün telefon ederim.')
    ]
  },
  {
    id: 'xa1_message', unitNumber: 10.9631, levelGroup: 'A1',
    title: 'Mesajlaşma', description: 'Yaz, gönder, cevapla: parmak sohbeti',
    category: 'Gündelik Yaşam', color: '#db2777', icon: '💬',
    grammarExplain: `📌 MESAJ FİİLLERİ:
1. писать/написать = yazmak: Напиши мне! (Bana yaz!)
2. отправить = göndermek; ответить = cevaplamak.
3. Kısa mesaj kültürü: ок, спс (спасибо), пжл (пожалуйста).`,
    words: [
      W('xa1_ms_1', 'Писать', 'Pisát', 'Yazmak', 'A1', 'Я пишу = yazıyorum.'),
      W('xa1_ms_2', 'Сообщение', 'Saabşşéniye', 'Mesaj', 'A1', 'голосовое сообщение = sesli mesaj.'),
      W('xa1_ms_3', 'Отправить', 'Atprávit', 'Göndermek', 'A1', 'Mesaj, koli, e-posta — hepsi отправить.'),
      W('xa1_ms_4', 'Ответить', 'Atvyétit', 'Cevaplamak', 'A1', 'ответ = cevap.'),
      W('xa1_ms_5', 'Читать', 'Çitát', 'Okumak', 'A1', 'Mesaj "okundu" = прочитано.'),
      W('xa1_ms_6', 'Получить', 'Paluçít', 'Almak (teslim)', 'A1', 'Я получил сообщение = mesajı aldım.')
    ],
    sentences: [
      S('Напиши мне сообщение вечером.', 'Akşam bana mesaj yaz.'),
      S('Я получил твой ответ.', 'Cevabını aldım.')
    ]
  },
  {
    id: 'xa1_questions', unitNumber: 10.9632, levelGroup: 'A1',
    title: 'Soru Kelimeleri', description: 'Kim, ne, nerede, ne zaman, neden, nasıl',
    category: 'Temel Kelimeler', color: '#0891b2', icon: '❓',
    grammarExplain: `📌 6 ALTIN SORU:
1. кто (kim), что (ne — ŞTO okunur!), где (nerede), когда (ne zaman), почему (neden), как (nasıl).
2. Rusçada soru için ek gerekmez: sadece soru kelimesi + normal cümle.
3. Soru kelimesi olmayan sorularda TONLAMA yeter: Ты дома? ↗`,
    words: [
      W('xa1_qu_1', 'Кто', 'Kto', 'Kim', 'A1', 'Кто это? = Bu kim?'),
      W('xa1_qu_2', 'Что', 'Şto', 'Ne', 'A1', 'En ünlü istisna: ЧТО → ŞTO okunur!'),
      W('xa1_qu_3', 'Где', 'Gdye', 'Nerede', 'A1', 'Где ты? = Neredesin?'),
      W('xa1_qu_4', 'Когда', 'Kagdá', 'Ne zaman', 'A1', 'Когда встреча? = Buluşma ne zaman?'),
      W('xa1_qu_5', 'Почему', 'Paçimú', 'Neden', 'A1', 'Cevabı: потому что (çünkü).'),
      W('xa1_qu_6', 'Как', 'Kak', 'Nasıl', 'A1', 'Как дела? Как тебя зовут?')
    ],
    sentences: [
      S('Кто это и что он делает?', 'Bu kim ve ne yapıyor?'),
      S('Когда и где встреча?', 'Buluşma ne zaman ve nerede?')
    ]
  },
  {
    id: 'xa1_timewords', unitNumber: 10.9633, levelGroup: 'A1',
    title: 'Zaman Zarfları', description: 'Şimdi, sonra, dün, bugün, yarın',
    category: 'Temel Kelimeler', color: '#4f46e5', icon: '⏰',
    grammarExplain: `📌 ZAMAN ÇİZGİSİ:
1. вчера (dün) ← сегодня (bugün) → завтра (yarın).
2. сейчас = şimdi; потом = sonra; уже = artık/çoktan.
3. Hikâyedeki kritik replik: "Звоните завтра — сегодня я занята!"`,
    words: [
      W('xa1_tw_1', 'Сейчас', 'Siçás', 'Şimdi', 'A1', 'Kelimesi kelimesine "bu saat".'),
      W('xa1_tw_2', 'Потом', 'Patóm', 'Sonra', 'A1', 'Сначала..., потом... = önce..., sonra...'),
      W('xa1_tw_3', 'Сегодня', 'Sivódnya', 'Bugün', 'A1', 'Г burada V okunur — meşhur istisna.'),
      W('xa1_tw_4', 'Завтра', 'Záftra', 'Yarın', 'A1', 'завтрак (kahvaltı) ile karıştırma!'),
      W('xa1_tw_5', 'Вчера', 'Fçirá', 'Dün', 'A1', 'В sedasızlaşır: fçirá.'),
      W('xa1_tw_6', 'Уже', 'Ujé', 'Artık / Çoktan', 'A1', 'Уже поздно = artık geç.')
    ],
    sentences: [
      S('Сегодня я занят, звони завтра.', 'Bugün meşgulüm, yarın ara.'),
      S('Вчера был дождь, сейчас солнце.', 'Dün yağmur vardı, şimdi güneş var.')
    ]
  },
  {
    id: 'xa1_frequency', unitNumber: 10.9634, levelGroup: 'A1',
    title: 'Ne Sıklıkla?', description: 'Her zaman, bazen, asla: sıklık zarfları',
    category: 'Temel Kelimeler', color: '#059669', icon: '🔁',
    grammarExplain: `📌 SIKLIK MERDİVENİ:
1. всегда (her zaman) > обычно (genellikle) > часто (sık sık) > иногда (bazen) > редко (nadiren) > никогда (asla).
2. никогда çift olumsuzla kullanılır: Я никогда НЕ опаздываю. (Asla geç kalmam.)
3. Sıklık zarfı fiilden önce gelir: Я часто читаю.`,
    words: [
      W('xa1_fr_1', 'Всегда', 'Fsigdá', 'Her zaman', 'A1', 'В sedasızlaşır: fsigdá.'),
      W('xa1_fr_2', 'Обычно', 'Abıçna', 'Genellikle', 'A1', 'обычный = sıradan.'),
      W('xa1_fr_3', 'Часто', 'Çásta', 'Sık sık', 'A1', 'час (saat) ile aynı kök.'),
      W('xa1_fr_4', 'Иногда', 'İnagdá', 'Bazen', 'A1', 'иной (başka) kökünden: "başka zamanlarda".'),
      W('xa1_fr_5', 'Редко', 'Ryétka', 'Nadiren', 'A1', 'Д sedasızlaşıp T okunur.'),
      W('xa1_fr_6', 'Никогда', 'Nikagdá', 'Asla', 'A1', 'Mutlaka НЕ ile birlikte kullanılır!')
    ],
    sentences: [
      S('Я всегда пью чай утром.', 'Sabah her zaman çay içerim.'),
      S('Он никогда не опаздывает.', 'O asla geç kalmaz.')
    ]
  },
  {
    id: 'xa1_hobby1', unitNumber: 10.9635, levelGroup: 'A1',
    title: 'Hobiler 1: Sakin Keyifler', description: 'Müzik, kitap, film, yürüyüş',
    category: 'Gündelik Yaşam', color: '#c026d3', icon: '🎵',
    grammarExplain: `📌 HOBİ KALIPLARI:
1. Я люблю + fiil: Я люблю читать. (Okumayı severim.)
2. слушать музыку = müzik dinlemek; смотреть фильмы = film izlemek.
3. гулять = (amaçsız keyifle) dolaşmak — Rusçanın en sevimli fiillerinden!`,
    words: [
      W('xa1_h1_1', 'Музыка', 'Múzıka', 'Müzik', 'A1', 'Vurgu BAŞTA: MÚzıka!'),
      W('xa1_h1_2', 'Фильм', 'Film', 'Film', 'A1', 'смотреть фильм = film izlemek.'),
      W('xa1_h1_3', 'Гулять', 'Gulyát', 'Dolaşmak / Gezinmek', 'A1', 'идти гулять = gezmeye çıkmak.'),
      W('xa1_h1_4', 'Любить', 'Lyubít', 'Sevmek', 'A1', 'Я люблю = severim/seviyorum.'),
      W('xa1_h1_5', 'Хобби', 'Hóbbi', 'Hobi', 'A1', 'Değişmez nötr kelime.'),
      W('xa1_h1_6', 'Интересный', 'İntiryésnıy', 'İlginç', 'A1', 'Это интересно! = Bu ilginç!')
    ],
    sentences: [
      S('Я люблю слушать музыку.', 'Müzik dinlemeyi severim.'),
      S('Вечером мы гуляем в парке.', 'Akşam parkta dolaşırız.')
    ]
  },
  {
    id: 'xa1_hobby2', unitNumber: 10.9636, levelGroup: 'A1',
    title: 'Hobiler 2: Hareketli Keyifler', description: 'Spor, yüzme, dans, resim',
    category: 'Gündelik Yaşam', color: '#ea580c', icon: '🏊',
    grammarExplain: `📌 HAREKETLİ HOBİLER:
1. заниматься спортом = spor yapmak (araç hâli).
2. играть в футбол = futbol oynamak (в + oyun); играть на гитаре (на + çalgı).
3. уметь = (beceri olarak) yapabilmek: Я умею плавать. (Yüzme bilirim.)`,
    words: [
      W('xa1_h2_1', 'Спорт', 'Sport', 'Spor', 'A1', 'заниматься спортом kalıbıyla.'),
      W('xa1_h2_2', 'Плавать', 'Plávat', 'Yüzmek', 'A1', 'Я умею плавать = yüzme bilirim.'),
      W('xa1_h2_3', 'Танцевать', 'Tantsıvát', 'Dans etmek', 'A1', 'танец = dans.'),
      W('xa1_h2_4', 'Играть', 'İgrát', 'Oynamak / Çalmak', 'A1', 'в футбол (oyun) / на гитаре (çalgı).'),
      W('xa1_h2_5', 'Рисовать', 'Risavát', 'Resim çizmek', 'A1', 'рисунок = çizim.'),
      W('xa1_h2_6', 'Уметь', 'Umyét', 'Yapabilmek (beceri)', 'A1', 'знать (bilgi) ≠ уметь (beceri).')
    ],
    sentences: [
      S('Я умею плавать и танцевать.', 'Yüzebilir ve dans edebilirim.'),
      S('Мы играем в футбол в парке.', 'Parkta futbol oynuyoruz.')
    ]
  }
];
