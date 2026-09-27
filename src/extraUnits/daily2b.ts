// ==========================================================
// EK MÜFREDAT — GÜNDELİK YAŞAM 2 KAT PAKETİ, PARTİ 2/3 (B1, Ünite 62-71)
// Kira/ev sahibi, otel resepsiyonu, banka şubesi, belge fotoğrafı,
// ayakkabı tamircisi, gözlükçü, araba servisi, çilingir, belediye/MFC
// ve sinema gişesi. Format, UNITS_DATA ile BİREBİR aynıdır.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_DAILY2B: UnitModule[] = [
  {
    id: 'mod_b1_e1',
    unitNumber: 62,
    levelGroup: 'B1',
    title: 'Kiralık Daire & Ev Sahibi',
    description: 'Daire kiralama: ilan, depozito, ev sahibiyle ilk görüşme ve kurallar',
    category: 'Gündelik Yaşam',
    color: '#f59e0b',
    icon: '🏠',
    grammarExplain: `📌 KİRALAMA DİLİ:
1. "Снимать квартиру" (daire kiralamak — kiracı olarak) ≠ "сдавать квартиру" (kiraya vermek — ev sahibi olarak). Bu iki fiili karıştıran, ilanda kendini ev sahibi sanır!
2. "За + Accusative" bedel bildirir: "за месяц" (aylığına), "за пятьдесят тысяч" (elli bine).
3. Ev sahibi kadınsa "хозяйка", erkekse "хозяин" — kapıyı çalmadan önce hangisi olduğunu öğren.`,
    words: [
      { id: 'wd62_1', ru: 'Снимать', reading: "Snimát'", tr: 'Kiralamak (kiracı)', level: 'B1', usageNote: 'Aynı fiil "fotoğraf çekmek" de demektir — bağlam her şeydir.' },
      { id: 'wd62_2', ru: 'Сдавать', reading: "Zdavát'", tr: 'Kiraya vermek', level: 'B1', usageNote: 'İlanlarda "сдаётся квартира" (kiralık daire) yazar.' },
      { id: 'wd62_3', ru: 'Аренда', reading: 'Aryénda', tr: 'Kira (sözleşme)', level: 'B1', usageNote: '"Договор аренды" = kira sözleşmesi.' },
      { id: 'wd62_4', ru: 'Хозяйка', reading: 'Hazyáyka', tr: 'Ev sahibesi', level: 'B1', usageNote: 'Rus kiracı folklorunun baş karakteri: kurallar ondan sorulur.' },
      { id: 'wd62_5', ru: 'Залог', reading: 'Zalók', tr: 'Depozito', level: 'B1', usageNote: 'Genelde bir aylık kira kadardır; sonda Г→К okunur.' },
      { id: 'wd62_6', ru: 'Коммуналка', reading: 'Kamunálka', tr: 'Aidat/faturalar', level: 'B1', usageNote: '"Коммунальные услуги"nin halk dilindeki kısaltması.' },
      { id: 'wd62_7', ru: 'Ремонт', reading: 'Rimónt', tr: 'Tadilat', level: 'B1', usageNote: 'İlan klasiği: "евроремонт" = sıfır tadilatlı.' },
      { id: 'wd62_8', ru: 'Мебель', reading: "Myébil'", tr: 'Mobilya', level: 'B1', usageNote: 'Tekil kullanılır: "с мебелью" (mobilyalı).' },
      { id: 'wd62_9', ru: 'Соседи', reading: 'Sasyédi', tr: 'Komşular', level: 'B1', usageNote: 'Ev sahibinin ikinci sorusu: "С соседями дружите?"' },
      { id: 'wd62_10', ru: 'Договор', reading: 'Dagavór', tr: 'Sözleşme', level: 'B1', usageNote: '"Подписать договор" = sözleşme imzalamak.' }
    ],
    sentences: [
      { ru: 'Я хочу снять квартиру на год.', tr: 'Bir yıllığına daire kiralamak istiyorum.', scrambled: ['на год.', 'снять', 'Я хочу', 'квартиру'], correct: ['Я хочу', 'снять', 'квартиру', 'на год.'] },
      { ru: 'Залог мы вернём в конце аренды.', tr: 'Depozitoyu kiranın sonunda iade edeceğiz.', scrambled: ['в конце', 'Залог', 'аренды.', 'мы вернём'], correct: ['Залог', 'мы вернём', 'в конце', 'аренды.'] }
    ],
    sceneTitle: 'Ev Sahibesiyle İlk Görüşme',
    sceneContext: 'Dima kiralık daireye bakmaya geliyor; ev sahibesi Galina Petrovna hem çay ikram ediyor hem sorguya çekiyor — klasik Rus kiralama ritüeli.',
    dialogue: [
      { speaker: 'Galina Petrovna', ru: 'Квартира с мебелью, ремонт свежий. Вы курите?', reading: 'Kvartíra s myébil\'yu, rimónt svyéjiy. Vı kúritye?', tr: 'Daire mobilyalı, tadilat yeni. Sigara içiyor musunuz?' },
      { speaker: 'Dima', ru: 'Нет, не курю. А коммуналка входит в цену?', reading: 'Nyet, ni kuryú. A kamunálka fhódit f tsénu?', tr: 'Hayır, içmiyorum. Peki aidat fiyata dahil mi?' },
      { speaker: 'Galina Petrovna', ru: 'Нет, коммуналка отдельно. Залог — за один месяц.', reading: 'Nyet, kamunálka addyél\'na. Zalók — za adín myésits.', tr: 'Hayır, aidat ayrı. Depozito — bir aylık.' },
      { speaker: 'Dima', ru: 'Хорошо. Когда можно подписать договор?', reading: 'Haraşó. Kagdá mójna patpisát\' dagavór?', tr: 'Tamam. Sözleşmeyi ne zaman imzalayabiliriz?' }
    ]
  },
  {
    id: 'mod_b1_e2',
    unitNumber: 63,
    levelGroup: 'B1',
    title: 'Otel Resepsiyonu',
    description: 'Rezervasyon, giriş-çıkış saati, oda tercihi ve kahvaltı sorusu',
    category: 'Gündelik Yaşam',
    color: '#8b5cf6',
    icon: '🛎️',
    grammarExplain: `📌 OTEL DİLİ:
1. "У меня бронь на имя..." (... adına rezervasyonum var) — resepsiyondaki ilk cümlen.
2. "Номер" otelde ODA demektir (sayı değil!): "одноместный номер" (tek kişilik oda).
3. "Включён/включена" (dahil): "Завтрак включён?" (Kahvaltı dahil mi?) — cinsiyete göre çekilir: бронь включенА, завтрак включЁН.`,
    words: [
      { id: 'wd63_1', ru: 'Гостиница', reading: 'Gastínitsa', tr: 'Otel', level: 'B1', usageNote: '"Отель" de kullanılır; гостиница daha yerlidir.' },
      { id: 'wd63_2', ru: 'Бронь', reading: "Bron'", tr: 'Rezervasyon', level: 'B1', usageNote: 'Resmî hali "бронирование"; konuşmada hep "бронь".' },
      { id: 'wd63_3', ru: 'Номер', reading: 'Nómir', tr: 'Oda (otelde)', level: 'B1', usageNote: 'Yalancı dost: otelde "numara" değil "oda" demektir!' },
      { id: 'wd63_4', ru: 'Заселение', reading: 'Zasilyéniye', tr: 'Giriş (check-in)', level: 'B1', usageNote: 'Genelde saat 14:00; erken giriş "раннее заселение".' },
      { id: 'wd63_5', ru: 'Выезд', reading: 'Vı́yist', tr: 'Çıkış (check-out)', level: 'B1', usageNote: 'Kapıdaki yazı: "выезд до 12:00".' },
      { id: 'wd63_6', ru: 'Ключ-карта', reading: 'Klyuç-kárta', tr: 'Kart anahtar', level: 'B1', usageNote: 'Kaybedersen ceza öder, asansör de çalışmaz.' },
      { id: 'wd63_7', ru: 'Завтрак', reading: 'Záftrak', tr: 'Kahvaltı', level: 'B1', usageNote: 'В sedasızlaşır: "záftrak". En kritik soru: dahil mi?' },
      { id: 'wd63_8', ru: 'Горничная', reading: 'Górniçnaya', tr: 'Kat görevlisi', level: 'B1', usageNote: 'Kapıya "не беспокоить" (rahatsız etmeyin) asarsan gelmez.' },
      { id: 'wd63_9', ru: 'Этаж', reading: 'Etáş', tr: 'Kat', level: 'B1', usageNote: 'Sonda Ж→Ş; "на каком этаже?" (kaçıncı katta?).' },
      { id: 'wd63_10', ru: 'Вид на море', reading: 'Vit na móre', tr: 'Deniz manzarası', level: 'B1', usageNote: 'Moskova otelinde sorarsan resepsiyonist gülümser: deniz yok.' }
    ],
    sentences: [
      { ru: 'У меня бронь на имя Дмитрий.', tr: 'Dmitriy adına rezervasyonum var.', scrambled: ['на имя', 'У меня', 'Дмитрий.', 'бронь'], correct: ['У меня', 'бронь', 'на имя', 'Дмитрий.'] },
      { ru: 'Завтрак включён в стоимость номера?', tr: 'Kahvaltı oda fiyatına dahil mi?', scrambled: ['в стоимость', 'Завтрак', 'номера?', 'включён'], correct: ['Завтрак', 'включён', 'в стоимость', 'номера?'] }
    ],
    sceneTitle: 'Gece Yarısı Check-in',
    sceneContext: 'Dima geç saatte otele varıyor; resepsiyonist rezervasyonu bulamıyor gibi yapıp sonra "şaka" diyor — otel mizahı da bir hizmettir.',
    dialogue: [
      { speaker: 'Resepsiyonist', ru: 'Добрый вечер! Ваша фамилия?', reading: 'Dóbrıy vyéçir! Váşa famíliya?', tr: 'İyi akşamlar! Soyadınız?' },
      { speaker: 'Dima', ru: 'Соколов. У меня бронь на две ночи.', reading: 'Sakalóf. U minyá bron\' na dvye nóçi.', tr: 'Sokolov. İki gecelik rezervasyonum var.' },
      { speaker: 'Resepsiyonist', ru: 'Так... брони нет. Шучу! Номер на пятом этаже, завтрак включён.', reading: 'Tak... bróni nyet. Şuçú! Nómir na pyátam etajé, záftrak fklyuçón.', tr: 'Bakalım... rezervasyon yok. Şaka! Oda beşinci katta, kahvaltı dahil.' },
      { speaker: 'Dima', ru: 'Вы почти разбили мне сердце. Ключ-карту, пожалуйста.', reading: 'Vı paçtí razbíli mnye syértse. Klyuç-kártu, pajálusta.', tr: 'Az kalsın kalbimi kırıyordunuz. Kart anahtarı lütfen.' }
    ]
  },
  {
    id: 'mod_b1_e3',
    unitNumber: 64,
    levelGroup: 'B1',
    title: 'Banka Şubesinde',
    description: 'Sıra fişi, hesap açma, havale, komisyon ve kart teslimi',
    category: 'Gündelik Yaşam',
    color: '#10b981',
    icon: '🏦',
    grammarExplain: `📌 BANKA ŞUBESİ DİLİ:
1. Şubeye girince önce "талон" (sıra fişi) alınır: "Возьмите талон" — makine söyler, sen basarsın.
2. "Открыть счёт" (hesap açmak), "закрыть счёт" (kapatmak): счёт hem "hesap" hem restoranda "adisyon"dur.
3. "Перевести деньги" (para havale etmek) — "перевод" hem havale hem çeviri demektir; bankada kimse Puşkin çevirmeni aramaz.`,
    words: [
      { id: 'wd64_1', ru: 'Отделение', reading: 'Atdilyéniye', tr: 'Şube', level: 'B1', usageNote: '"Отделение банка" = banka şubesi.' },
      { id: 'wd64_2', ru: 'Талон', reading: 'Talón', tr: 'Sıra fişi', level: 'B1', usageNote: 'Ekranda numaran çıkana kadar bekleme salonu sosyolojisi izlenir.' },
      { id: 'wd64_3', ru: 'Счёт', reading: 'Şşot', tr: 'Hesap', level: 'B1', usageNote: 'СЧ = Щ okunur: "şşot".' },
      { id: 'wd64_4', ru: 'Перевод', reading: 'Pirivót', tr: 'Havale', level: 'B1', usageNote: 'Aynı kelime "çeviri" de demek — bağlama bak.' },
      { id: 'wd64_5', ru: 'Комиссия', reading: 'Kamíssiya', tr: 'Komisyon', level: 'B1', usageNote: 'En sevilen cümle: "без комиссии" (komisyonsuz).' },
      { id: 'wd64_6', ru: 'Наличные', reading: 'Nalíçnıye', tr: 'Nakit', level: 'B1', usageNote: '"Снять наличные" = nakit çekmek.' },
      { id: 'wd64_7', ru: 'Вклад', reading: 'Fklat', tr: 'Mevduat', level: 'B1', usageNote: 'В+К sedasızlaşır: "fklat"; faizli hesap demektir.' },
      { id: 'wd64_8', ru: 'Процент', reading: 'Pratsént', tr: 'Faiz / Yüzde', level: 'B1', usageNote: '"Под какой процент?" (Yüzde kaç faizle?)' },
      { id: 'wd64_9', ru: 'Оформить', reading: "Afórmit'", tr: 'Düzenlemek/başvurmak', level: 'B1', usageNote: 'Rus bürokrasisinin ana fiili: kart, kredi, evrak — hepsi "оформить".' },
      { id: 'wd64_10', ru: 'Очередь', reading: "Óçirit'", tr: 'Sıra/kuyruk', level: 'B1', usageNote: '"Кто последний?" (Son kim?) — kuyruk kültürünün açılış sorusu.' }
    ],
    sentences: [
      { ru: 'Я хочу открыть счёт в вашем банке.', tr: 'Bankanızda hesap açmak istiyorum.', scrambled: ['счёт', 'Я хочу', 'в вашем банке.', 'открыть'], correct: ['Я хочу', 'открыть', 'счёт', 'в вашем банке.'] },
      { ru: 'Какая комиссия за перевод за границу?', tr: 'Yurt dışına havale komisyonu ne kadar?', scrambled: ['за перевод', 'Какая', 'за границу?', 'комиссия'], correct: ['Какая', 'комиссия', 'за перевод', 'за границу?'] }
    ],
    sceneTitle: 'Sıra Numarası Macerası',
    sceneContext: 'Dima bankada hesap açtırıyor; sıra fişi makinesi, gişe memuru ve "bir imza daha" ritüeliyle tam bir şube deneyimi.',
    dialogue: [
      { speaker: 'Memur', ru: 'Талон А двадцать три! Проходите. Чем могу помочь?', reading: 'Talón A dvátsat\' tri! Prahadítye. Çem magú pamóç?', tr: 'A yirmi üç numara! Buyurun. Nasıl yardımcı olabilirim?' },
      { speaker: 'Dima', ru: 'Хочу оформить карту и открыть вклад.', reading: 'Haçú afórmit\' kártu i atkrı́t\' fklat.', tr: 'Kart başvurusu yapmak ve mevduat hesabı açmak istiyorum.' },
      { speaker: 'Memur', ru: 'Отлично. Паспорт, пожалуйста. И подпишите здесь... и здесь... и ещё здесь.', reading: 'Atlíçna. Páspart, pajálusta. I patpişítye zdyes\'... i zdyes\'... i işşó zdyes\'.', tr: 'Harika. Pasaport lütfen. Ve şurayı imzalayın... şurayı... bir de şurayı.' },
      { speaker: 'Dima', ru: 'После стольких подписей я уже почти сотрудник банка.', reading: 'Póslye stól\'kih pótpisyey ya ujé paçtí satrúdnik bánka.', tr: 'Bu kadar imzadan sonra neredeyse banka çalışanı sayılırım.' }
    ]
  },
  {
    id: 'mod_b1_e4',
    unitNumber: 65,
    levelGroup: 'B1',
    title: 'Fotoğrafçıda: Belge Fotoğrafı',
    description: 'Vesikalık çektirme: boyut, fon, acele baskı ve dijital kopya',
    category: 'Gündelik Yaşam',
    color: '#ef4444',
    icon: '📸',
    grammarExplain: `📌 FOTOĞRAFÇI DİLİ:
1. "Фото на документы" (belge fotoğrafı) — vesikalığın resmi adı; "на паспорт", "на визу" diye türü belirtilir.
2. "Срочно" (acele) sihirli kelimedir: "Можно срочно?" (Acele olur mu?) — 10 dakikada hazır ama biraz pahalı.
3. Ölçüler "на + Accusative": "три на четыре" (3x4) — rakamları okuyabilmen burada işe yarar!`,
    words: [
      { id: 'wd65_1', ru: 'Фотография', reading: 'Fatagráfiya', tr: 'Fotoğraf', level: 'B1', usageNote: 'Konuşmada kısaca "фото" denir.' },
      { id: 'wd65_2', ru: 'Документы', reading: 'Dakumyéntı', tr: 'Belgeler', level: 'B1', usageNote: '"Фото на документы" = vesikalık.' },
      { id: 'wd65_3', ru: 'Срочно', reading: 'Sróçna', tr: 'Acele / Acil', level: 'B1', usageNote: 'Her hizmetin turbo modu: "срочное фото".' },
      { id: 'wd65_4', ru: 'Фон', reading: 'Fon', tr: 'Fon/arka plan', level: 'B1', usageNote: 'Vize için genelde "белый фон" (beyaz fon) istenir.' },
      { id: 'wd65_5', ru: 'Размер', reading: 'Razmyér', tr: 'Boyut', level: 'B1', usageNote: '"Какой размер нужен?" (Hangi boyut lazım?)' },
      { id: 'wd65_6', ru: 'Печать', reading: "Piçát'", tr: 'Baskı', level: 'B1', usageNote: 'Aynı kelime "mühür" de demektir — bürokrasinin iki silahı tek kelimede.' },
      { id: 'wd65_7', ru: 'Улыбаться', reading: "Ulıbátsa", tr: 'Gülümsemek', level: 'B1', usageNote: 'Belge fotoğrafında yasak: "не улыбайтесь!"' },
      { id: 'wd65_8', ru: 'Флешка', reading: 'Flyéşka', tr: 'USB bellek', level: 'B1', usageNote: '"Скинуть на флешку" = belleğe atmak.' },
      { id: 'wd65_9', ru: 'Готово', reading: 'Gatóva', tr: 'Hazır', level: 'B1', usageNote: 'Beklenen müjde: "Ваши фото готовы!"' },
      { id: 'wd65_10', ru: 'Копия', reading: 'Kópiya', tr: 'Kopya', level: 'B1', usageNote: '"Электронная копия" = dijital kopya; hep iste, hep lazım olur.' }
    ],
    sentences: [
      { ru: 'Мне нужно фото на документы, три на четыре.', tr: 'Bana vesikalık lazım, üçe dört.', scrambled: ['три на четыре.', 'Мне нужно', 'на документы,', 'фото'], correct: ['Мне нужно', 'фото', 'на документы,', 'три на четыре.'] },
      { ru: 'Можно сделать срочно, за десять минут?', tr: 'Acele, on dakikada yapılabilir mi?', scrambled: ['за десять минут?', 'сделать', 'Можно', 'срочно,'], correct: ['Можно', 'сделать', 'срочно,', 'за десять минут?'] }
    ],
    sceneTitle: 'Gülümsemek Yasak',
    sceneContext: 'Dima vize fotoğrafı çektiriyor; fotoğrafçı "gülümsemeyin" dedikçe Dima\'nın gülmesi tutuyor — vesikalık evrensel bir komedidir.',
    dialogue: [
      { speaker: 'Fotoğrafçı', ru: 'Фото на визу? Белый фон, смотрим прямо, не улыбаемся.', reading: 'Fóta na vízu? Byélıy fon, smótrim pryáma, ni ulıbáyimsya.', tr: 'Vize fotoğrafı mı? Beyaz fon, dümdüz bakıyoruz, gülümsemiyoruz.' },
      { speaker: 'Dima', ru: 'Понял. Серьёзное лицо. Максимально серьёзное.', reading: 'Pónyal. Siryóznaye litsó. Maksimál\'na siryóznaye.', tr: 'Anladım. Ciddi yüz. Maksimum ciddi.' },
      { speaker: 'Fotoğrafçı', ru: 'Вы улыбаетесь. Подумайте о коммуналке.', reading: 'Vı ulıbáyityes\'. Padúmaytye a kamunálke.', tr: 'Gülümsüyorsunuz. Aidatları düşünün.' },
      { speaker: 'Dima', ru: 'Сработало. Теперь я идеально серьёзен.', reading: 'Srabótala. Tipyér\' ya idiál\'na siryózin.', tr: 'İşe yaradı. Şimdi kusursuz ciddiyim.' }
    ]
  },
  {
    id: 'mod_b1_e5',
    unitNumber: 66,
    levelGroup: 'B1',
    title: 'Ayakkabı Tamircisinde',
    description: 'Topuk, pençe, fermuar: ayakkabıyı çöpten kurtaran usta dili',
    category: 'Gündelik Yaşam',
    color: '#a16207',
    icon: '👞',
    grammarExplain: `📌 TAMİRCİ DİLİ:
1. "Починить" (tamir etmek) günlük fiildir: "Можно починить?" (Tamir edilir mi?) — ustanın cevabı genelde "можно" (olur).
2. "Сломался/сломалась" (kırıldı/bozuldu) cinsiyete göre çekilir: каблук сломался (topuk kırıldı), молния сломалась (fermuar bozuldu).
3. "К + tarih" hazır olma zamanı: "к пятнице" (cumaya) — usta takvimi her zaman iyimserdir.`,
    words: [
      { id: 'wd66_1', ru: 'Мастерская', reading: 'Mastirskáya', tr: 'Tamirhane/atölye', level: 'B1', usageNote: '"Ремонт обуви" tabelasını gör, içeri gir.' },
      { id: 'wd66_2', ru: 'Каблук', reading: 'Kablúk', tr: 'Topuk', level: 'B1', usageNote: '"Сломался каблук" — dramın başladığı yer.' },
      { id: 'wd66_3', ru: 'Подошва', reading: 'Padóşva', tr: 'Taban', level: 'B1', usageNote: '"Подошва отклеилась" (taban açıldı) — kış klasiği.' },
      { id: 'wd66_4', ru: 'Молния', reading: 'Mólniya', tr: 'Fermuar', level: 'B1', usageNote: 'Aynı kelime "şimşek" demektir — fermuar da onun kadar hızlı bozulur.' },
      { id: 'wd66_5', ru: 'Набойка', reading: 'Nabóyka', tr: 'Topuk lastiği', level: 'B1', usageNote: 'En ucuz ve en sık işlem: "поменять набойки".' },
      { id: 'wd66_6', ru: 'Починить', reading: "Paçinít'", tr: 'Tamir etmek', level: 'B1', usageNote: 'Umudun fiili: "Это можно починить?"' },
      { id: 'wd66_7', ru: 'Клей', reading: 'Kley', tr: 'Yapıştırıcı', level: 'B1', usageNote: '"Заклеить" = yapıştırmak; usta çözümlerinin yüzde doksanı.' },
      { id: 'wd66_8', ru: 'Растянуть', reading: "Rastinút'", tr: 'Genişletmek (ayakkabı)', level: 'B1', usageNote: 'Dar ayakkabının kurtuluşu: "растянуть на размер".' },
      { id: 'wd66_9', ru: 'Шнурки', reading: 'Şnurkí', tr: 'Bağcıklar', level: 'B1', usageNote: 'Tamirciden çıkarken hep bir çift yenisini al.' },
      { id: 'wd66_10', ru: 'Квитанция', reading: 'Kvitántsiya', tr: 'Fiş/makbuz', level: 'B1', usageNote: 'Ayakkabını geri almanın tek yolu — kaybetme!' }
    ],
    sentences: [
      { ru: 'У меня сломался каблук, можно починить?', tr: 'Topuğum kırıldı, tamir edilebilir mi?', scrambled: ['можно', 'У меня', 'починить?', 'сломался каблук,'], correct: ['У меня', 'сломался каблук,', 'можно', 'починить?'] },
      { ru: 'Когда будет готово? К пятнице?', tr: 'Ne zaman hazır olur? Cumaya mı?', scrambled: ['готово?', 'Когда', 'К пятнице?', 'будет'], correct: ['Когда', 'будет', 'готово?', 'К пятнице?'] }
    ],
    sceneTitle: 'Topuk Krizi',
    sceneContext: 'Lena\'nın topuğu metro merdiveninde kırılıyor; Dima kahramanca en yakın tamirciyi buluyor — usta Aşot her şeyi gördüm bakışıyla karşılıyor.',
    dialogue: [
      { speaker: 'Usta', ru: 'Так... каблук сломался. Классика. Через час будет готово.', reading: 'Tak... kablúk slamálsya. Klássika. Çyéris çyas búdit gatóva.', tr: 'Bakalım... topuk kırılmış. Klasik. Bir saate hazır olur.' },
      { speaker: 'Lena', ru: 'Правда? Вы спасаете мой вечер!', reading: 'Právda? Vı spasáyitye moy vyéçir!', tr: 'Gerçekten mi? Akşamımı kurtarıyorsunuz!' },
      { speaker: 'Usta', ru: 'И набойки поменяю. Бесплатно. Сегодня я добрый.', reading: 'I nabóyki paminyáyu. Bisplátna. Sivódnya ya dóbrıy.', tr: 'Topuk lastiklerini de değiştiririm. Ücretsiz. Bugün iyi günümdeyim.' },
      { speaker: 'Dima', ru: 'Вот квитанция, вот кофе. Мы подождём здесь.', reading: 'Vot kvitántsiya, vot kófe. Mı padajdyóm zdyes\'.', tr: 'İşte fiş, işte kahve. Burada bekleriz.' }
    ]
  },
  {
    id: 'mod_b1_e6',
    unitNumber: 67,
    levelGroup: 'B1',
    title: 'Gözlükçüde',
    description: 'Göz muayenesi, çerçeve seçimi, cam ve lens siparişi',
    category: 'Gündelik Yaşam',
    color: '#0ea5e9',
    icon: '👓',
    grammarExplain: `📌 GÖZLÜKÇÜ DİLİ:
1. "Проверить зрение" (görme kontrolü yaptırmak) — оптика mağazalarında çoğu zaman ücretsizdir.
2. "Плохо вижу вдаль / вблизи" (uzağı/yakını kötü görüyorum) — derdini iki kelimeyle anlat.
3. "Подобрать" (uygun olanı seçmek) fiili mağaza dilinin yıldızıdır: "подобрать оправу" (çerçeve seçmek) — sana yakışanı bulmak demektir.`,
    words: [
      { id: 'wd67_1', ru: 'Оптика', reading: 'Óptika', tr: 'Gözlükçü (mağaza)', level: 'B1', usageNote: 'Tabelada "Оптика" yazar; hem mağaza hem muayene yeri.' },
      { id: 'wd67_2', ru: 'Зрение', reading: 'Zryéniye', tr: 'Görme (yetisi)', level: 'B1', usageNote: '"Проверить зрение" = göz kontrolü yaptırmak.' },
      { id: 'wd67_3', ru: 'Очки', reading: 'Açkí', tr: 'Gözlük', level: 'B1', usageNote: 'Hep çoğuldur: "мои очки" (gözlüğüm).' },
      { id: 'wd67_4', ru: 'Оправа', reading: 'Apráva', tr: 'Çerçeve', level: 'B1', usageNote: '"Подобрать оправу" — yüz tipine göre seçilir.' },
      { id: 'wd67_5', ru: 'Линзы', reading: 'Línzı', tr: 'Lensler', level: 'B1', usageNote: 'Hem gözlük camı hem kontakt lens için kullanılır.' },
      { id: 'wd67_6', ru: 'Вдаль', reading: "Vdal'", tr: 'Uzağa/uzağı', level: 'B1', usageNote: '"Плохо вижу вдаль" = miyopluğun cümlesi.' },
      { id: 'wd67_7', ru: 'Вблизи', reading: 'Vblizí', tr: 'Yakında/yakını', level: 'B1', usageNote: '"Плохо вижу вблизи" = hipermetropun cümlesi.' },
      { id: 'wd67_8', ru: 'Рецепт', reading: 'Ritsépt', tr: 'Reçete', level: 'B1', usageNote: 'Göz doktorunun yazdığı numaralar; yemek tarifi de aynı kelime!' },
      { id: 'wd67_9', ru: 'Диоптрия', reading: 'Dióptriya', tr: 'Diyoptri (numara)', level: 'B1', usageNote: '"Минус два" (eksi iki) diye söylenir.' },
      { id: 'wd67_10', ru: 'Футляр', reading: 'Futlyár', tr: 'Gözlük kılıfı', level: 'B1', usageNote: 'Hediye gibi görünür ama fiyata dahildir.' }
    ],
    sentences: [
      { ru: 'Я плохо вижу вдаль, нужны очки.', tr: 'Uzağı kötü görüyorum, gözlük lazım.', scrambled: ['вдаль,', 'Я плохо', 'нужны очки.', 'вижу'], correct: ['Я плохо', 'вижу', 'вдаль,', 'нужны очки.'] },
      { ru: 'Помогите мне подобрать оправу, пожалуйста.', tr: 'Çerçeve seçmeme yardım edin lütfen.', scrambled: ['подобрать', 'Помогите мне', 'пожалуйста.', 'оправу,'], correct: ['Помогите мне', 'подобрать', 'оправу,', 'пожалуйста.'] }
    ],
    sceneTitle: 'Tahtadaki Harfler',
    sceneContext: 'Dima nihayet göz kontrolüne gidiyor; alt satırı okuyamayınca gözlükçü kadın zafer edasıyla çerçeve reyonunu işaret ediyor.',
    dialogue: [
      { speaker: 'Optisyen', ru: 'Читайте нижнюю строку, пожалуйста.', reading: 'Çitáytyeníjnyuyu strakú, pajálusta.', tr: 'Alt satırı okuyun lütfen.' },
      { speaker: 'Dima', ru: 'Там есть строка? Я вижу только туман.', reading: 'Tam yest\' straká? Ya víju tól\'ka tumán.', tr: 'Orada satır mı var? Ben sadece sis görüyorum.' },
      { speaker: 'Optisyen', ru: 'Минус два. Пойдёмте подбирать оправу — вам пойдёт классика.', reading: 'Mínus dva. Paydyómtye padbirát\' aprávu — vam paydyót klássika.', tr: 'Eksi iki. Gelin çerçeve seçelim — size klasik yakışır.' },
      { speaker: 'Dima', ru: 'Теперь я буду видеть мир... и цены в меню.', reading: 'Tipyér\' ya búdu vídit\' mir... i tsénı v minyú.', tr: 'Artık dünyayı göreceğim... menüdeki fiyatları da.' }
    ]
  },
  {
    id: 'mod_b1_e7',
    unitNumber: 68,
    levelGroup: 'B1',
    title: 'Araba Servisinde',
    description: 'Arıza anlatma, yağ değişimi, fren kontrolü ve fiyat pazarlığı',
    category: 'Gündelik Yaşam',
    color: '#64748b',
    icon: '🔧',
    grammarExplain: `📌 SERVİS DİLİ:
1. Araba dertlerini "что-то с + Instrumental" kalıbıyla anlat: "что-то с тормозами" (frenlerde bir şey var) — teşhisi usta koysun.
2. "Поменять масло" (yağ değiştirmek) — en rutin işlem; "замена масла" tabelası her serviste vardır.
3. Ses taklidi çalışır: "машина делает тук-тук" (araba tık-tık yapıyor) — ustalar bu dili çok iyi bilir!`,
    words: [
      { id: 'wd68_1', ru: 'Автосервис', reading: 'Aftasyérvis', tr: 'Araba servisi', level: 'B1', usageNote: 'Halk dilinde ustaya "мастер", servise "сервис" denir.' },
      { id: 'wd68_2', ru: 'Тормоза', reading: 'Tarmazá', tr: 'Frenler', level: 'B1', usageNote: '"Проверить тормоза" — pazarlık edilmeyecek tek kalem.' },
      { id: 'wd68_3', ru: 'Масло', reading: 'Másla', tr: 'Yağ', level: 'B1', usageNote: '"Замена масла" = yağ değişimi.' },
      { id: 'wd68_4', ru: 'Двигатель', reading: "Dvígatil'", tr: 'Motor', level: 'B1', usageNote: 'Konuşma dilinde "мотор" da denir.' },
      { id: 'wd68_5', ru: 'Диагностика', reading: 'Diagnóstika', tr: 'Arıza taraması', level: 'B1', usageNote: 'Bilgisayarlı kontrol; her şey bununla başlar.' },
      { id: 'wd68_6', ru: 'Запчасти', reading: 'Zapçásti', tr: 'Yedek parçalar', level: 'B1', usageNote: '"Запасные части"nin kısaltması; fiyatın büyüdüğü yer.' },
      { id: 'wd68_7', ru: 'Колесо', reading: 'Kalisó', tr: 'Tekerlek', level: 'B1', usageNote: '"Поменять колесо" = teker değiştirmek.' },
      { id: 'wd68_8', ru: 'Стук', reading: 'Stuk', tr: 'Tıkırtı (ses)', level: 'B1', usageNote: '"Какой-то стук" (bir tıkırtı var) — servis dilinin şiiri.' },
      { id: 'wd68_9', ru: 'Гарантия', reading: 'Garántiya', tr: 'Garanti', level: 'B1', usageNote: '"С гарантией?" — işi sağlama alma sorusu.' },
      { id: 'wd68_10', ru: 'Смета', reading: 'Smyéta', tr: 'Masraf dökümü', level: 'B1', usageNote: 'Ustanın kalem kalem yazdığı acı gerçekler listesi.' }
    ],
    sentences: [
      { ru: 'Что-то стучит в двигателе, посмотрите, пожалуйста.', tr: 'Motorda bir şey tıklıyor, bakın lütfen.', scrambled: ['в двигателе,', 'Что-то', 'пожалуйста.', 'стучит', 'посмотрите,'], correct: ['Что-то', 'стучит', 'в двигателе,', 'посмотрите,', 'пожалуйста.'] },
      { ru: 'Сколько будет стоить замена масла?', tr: 'Yağ değişimi ne kadar tutar?', scrambled: ['стоить', 'Сколько', 'замена масла?', 'будет'], correct: ['Сколько', 'будет', 'стоить', 'замена масла?'] }
    ],
    sceneTitle: 'Tık-Tık Teşhisi',
    sceneContext: 'Dima arabadaki gizemli sesi ustaya taklit ederek anlatıyor; usta tek dinleyişte teşhis koyuyor — servis ustaları kulakla çalışır.',
    dialogue: [
      { speaker: 'Dima', ru: 'Машина делает так: тук-тук-тук. Особенно на поворотах.', reading: 'Maşína dyélayit tak: tuk-tuk-tuk. Asóbinna na pavarótah.', tr: 'Araba şöyle yapıyor: tık-tık-tık. Özellikle virajlarda.' },
      { speaker: 'Usta', ru: 'Понял. Это не двигатель, это подвеска. Сделаем диагностику.', reading: 'Pónyal. Éta ni dvígatil\', éta padvyéska. Zdyélayim diagnóstiku.', tr: 'Anladım. Motor değil, süspansiyon. Tarama yapalım.' },
      { speaker: 'Dima', ru: 'А запчасти дорогие? Скажите честно, я сидя.', reading: 'A zapçásti daragíye? Skajítye çyéstna, ya sídya.', tr: 'Peki parçalar pahalı mı? Dürüst söyleyin, oturuyorum.' },
      { speaker: 'Usta', ru: 'Терпимо. И на работу — гарантия три месяца.', reading: 'Tirpíma. I na rabótu — garántiya tri myésitsa.', tr: 'İdare eder. İşçiliğe de üç ay garanti.' }
    ]
  },
  {
    id: 'mod_b1_e8',
    unitNumber: 69,
    levelGroup: 'B1',
    title: 'Çilingir & Kapıda Kalmak',
    description: 'Kapıyı üstüne kilitleme, çilingir çağırma ve yedek anahtar dersi',
    category: 'Gündelik Yaşam',
    color: '#f97316',
    icon: '🗝️',
    grammarExplain: `📌 KAPIDA KALMA DİLİ:
1. "Захлопнул дверь" (kapıyı üstüme çektim) — anahtarlar içeride kaldıysa bu fiil tam senin: захлопнуть = çarpıp kapatmak.
2. "Вскрыть замок" (kilidi açmak/kırmadan açmak) — çilingirin işi; "взломать" ise hırsızın işi. Aynı kapı, farklı fiil, farklı niyet!
3. "Сделать дубликат" (kopya çıkarmak): bu üniteden alınacak hayat dersi — her anahtarın bir kopyası olsun.`,
    words: [
      { id: 'wd69_1', ru: 'Ключ', reading: 'Klyuç', tr: 'Anahtar', level: 'B1', usageNote: 'İçeride unutulan şeylerin kralı.' },
      { id: 'wd69_2', ru: 'Замок', reading: 'Zamók', tr: 'Kilit', level: 'B1', usageNote: 'Vurgu sonda! Başta olursa "kale" olur (vurgu ünitesini hatırla).' },
      { id: 'wd69_3', ru: 'Захлопнуть', reading: "Zahlópnut'", tr: 'Çarpıp kapatmak', level: 'B1', usageNote: '"Я захлопнул дверь" — dramın resmi açılış cümlesi.' },
      { id: 'wd69_4', ru: 'Слесарь', reading: "Slyésar'", tr: 'Çilingir/tesisatçı', level: 'B1', usageNote: 'Kapı açan usta; "вызвать слесаря" = çilingir çağırmak.' },
      { id: 'wd69_5', ru: 'Вскрыть', reading: "Fskrı́t'", tr: 'Açmak (kilidi)', level: 'B1', usageNote: 'Profesyonel açılım; В sedasızlaşır: "fskrıt\'".' },
      { id: 'wd69_6', ru: 'Дубликат', reading: 'Dublikát', tr: 'Kopya (anahtar)', level: 'B1', usageNote: '"Сделать дубликат ключа" — beş dakikalık iş, beş saatlik dert önler.' },
      { id: 'wd69_7', ru: 'Домофон', reading: 'Damafón', tr: 'Kapı zili/interkom', level: 'B1', usageNote: 'Rus apartman hayatının ses kapısı.' },
      { id: 'wd69_8', ru: 'Подъезд', reading: 'Padyést', tr: 'Apartman girişi', level: 'B1', usageNote: '"Жду в подъезде" (girişte bekliyorum) — buluşma klasiği.' },
      { id: 'wd69_9', ru: 'Внутри', reading: 'Vnutrí', tr: 'İçeride', level: 'B1', usageNote: '"Ключи внутри!" (Anahtarlar içeride!) — panik cümlesi.' },
      { id: 'wd69_10', ru: 'Срочный вызов', reading: 'Sróçnıy vı́zaf', tr: 'Acil çağrı', level: 'B1', usageNote: 'Gece tarifesi gündüzden pahalıdır — anahtar dersini gündüz al.' }
    ],
    sentences: [
      { ru: 'Я захлопнул дверь, а ключи внутри.', tr: 'Kapıyı üstüme çektim, anahtarlar içeride.', scrambled: ['а ключи', 'Я захлопнул', 'внутри.', 'дверь,'], correct: ['Я захлопнул', 'дверь,', 'а ключи', 'внутри.'] },
      { ru: 'Можно вскрыть замок без повреждений?', tr: 'Kilit hasarsız açılabilir mi?', scrambled: ['замок', 'Можно', 'без повреждений?', 'вскрыть'], correct: ['Можно', 'вскрыть', 'замок', 'без повреждений?'] }
    ],
    sceneTitle: 'Paspasın Üstünde Bir Saat',
    sceneContext: 'Dima çöpü çıkarırken kapı arkasından kapanıyor; terlikle merdivende çilingir beklerken komşu Galina Petrovna çay ve hayat dersi getiriyor.',
    dialogue: [
      { speaker: 'Dima', ru: 'Алло, слесарь? Я захлопнул дверь. Стою в тапочках.', reading: 'Aló, slyésar\'? Ya zahlópnul dvyer\'. Stayú f tápaçkah.', tr: 'Alo, çilingir mi? Kapıyı üstüme çektim. Terlikle duruyorum.' },
      { speaker: 'Çilingir', ru: 'Классика жанра. Буду через двадцать минут.', reading: 'Klássika jánra. Búdu çyéris dvátsat\' minút.', tr: 'Türün klasiği. Yirmi dakikaya oradayım.' },
      { speaker: 'Komşu', ru: 'Димочка, чай будешь? И сделай уже дубликат ключа!', reading: 'Dímaçka, çyay búdiş? I zdyélay ujé dublikát klyuçá!', tr: 'Dimacığım, çay içer misin? Ve artık şu anahtarın kopyasını yaptır!' },
      { speaker: 'Dima', ru: 'Завтра сделаю три дубликата. Клянусь этим ковриком.', reading: 'Záftra zdyélayu tri dublikáta. Klinús\' étim kóvrikam.', tr: 'Yarın üç kopya yaptıracağım. Şu paspas üzerine yemin ederim.' }
    ]
  },
  {
    id: 'mod_b1_e9',
    unitNumber: 70,
    levelGroup: 'B1',
    title: 'Belediye & Evrak İşleri (MFC)',
    description: 'Tek durak ofiste belge alma: başvuru, mühür ve meşhur "bir eksik evrak"',
    category: 'Gündelik Yaşam',
    color: '#6366f1',
    icon: '🏛️',
    grammarExplain: `📌 BÜROKRASİ DİLİ:
1. "Справка" Rus hayatının merkez belgesi: her şey için bir справка gerekir, справка almak için de başka bir справка.
2. "Подать заявление" (dilekçe vermek) resmi kalıptır; MFC'de (ГосУслуги merkezinde) her işlem bununla başlar.
3. "Не хватает + Genitive" (eksik): "не хватает одной справки" (bir belge eksik) — bu cümleyi duymadan bürokrasi tamamlanmış sayılmaz.`,
    words: [
      { id: 'wd70_1', ru: 'Справка', reading: 'Správka', tr: 'Belge/yazı', level: 'B1', usageNote: 'Rus bürokrasisinin atomu; her kapı bununla açılır.' },
      { id: 'wd70_2', ru: 'Заявление', reading: 'Zayivlyéniye', tr: 'Dilekçe', level: 'B1', usageNote: '"Подать заявление" = dilekçe vermek.' },
      { id: 'wd70_3', ru: 'Печать', reading: "Piçát'", tr: 'Mühür', level: 'B1', usageNote: 'Mühürsüz belge, belge değildir — bu bir doğa yasasıdır.' },
      { id: 'wd70_4', ru: 'Подпись', reading: 'Pótpis', tr: 'İmza', level: 'B1', usageNote: '"Поставить подпись" = imza atmak.' },
      { id: 'wd70_5', ru: 'Госуслуги', reading: 'Gosuslúgi', tr: 'E-devlet', level: 'B1', usageNote: 'Rusya\'nın e-devleti; yarı işler artık telefondan.' },
      { id: 'wd70_6', ru: 'Окно', reading: 'Aknó', tr: 'Gişe (pencere)', level: 'B1', usageNote: '"Подойдите к окну номер пять" (beş numaralı gişeye gelin).' },
      { id: 'wd70_7', ru: 'Регистрация', reading: 'Rigistrátsiya', tr: 'Kayıt/ikamet kaydı', level: 'B1', usageNote: 'Yabancının ilk bürokrasi macerası.' },
      { id: 'wd70_8', ru: 'Бланк', reading: 'Blank', tr: 'Form', level: 'B1', usageNote: '"Заполнить бланк" = form doldurmak; büyük harfle, taşırmadan!' },
      { id: 'wd70_9', ru: 'Не хватает', reading: 'Ni hvatáyit', tr: 'Eksik / yetmiyor', level: 'B1', usageNote: 'Bürokrasinin kader cümlesi: "не хватает одной справки".' },
      { id: 'wd70_10', ru: 'Приёмные часы', reading: 'Priyómnıye çisı́', tr: 'Kabul saatleri', level: 'B1', usageNote: 'Gitmeden kontrol et; öğle molası kutsaldır.' }
    ],
    sentences: [
      { ru: 'Мне нужна справка о регистрации.', tr: 'İkamet kaydı belgesine ihtiyacım var.', scrambled: ['справка', 'Мне нужна', 'о регистрации.'], correct: ['Мне нужна', 'справка', 'о регистрации.'] },
      { ru: 'Вам не хватает одной подписи и печати.', tr: 'Bir imzanız ve mührünüz eksik.', scrambled: ['одной подписи', 'Вам', 'и печати.', 'не хватает'], correct: ['Вам', 'не хватает', 'одной подписи', 'и печати.'] }
    ],
    sceneTitle: 'Beş Numaralı Gişe',
    sceneContext: 'Dima ikamet kaydı için MFC\'de; tam her şey tamam derken memure "bir eksik" buluyor — ama bu sefer mutlu son var.',
    dialogue: [
      { speaker: 'Memure', ru: 'Так, заявление есть, паспорт есть... а справки с работы нет.', reading: 'Tak, zayivlyéniye yest\', páspart yest\'... a správki s rabótı nyet.', tr: 'Evet, dilekçe var, pasaport var... ama iş yerinden belge yok.' },
      { speaker: 'Dima', ru: 'Есть! Я принёс три копии. И даже с печатью.', reading: 'Yest\'! Ya prinyós tri kópii. I dáje s piçát\'yu.', tr: 'Var! Üç kopya getirdim. Hem de mühürlü.' },
      { speaker: 'Memure', ru: 'С печатью?.. Вы мой лучший посетитель за год.', reading: 'S piçát\'yu?.. Vı moy lúçşiy pasitítil\' za got.', tr: 'Mühürlü mü?.. Bu yılki en iyi ziyaretçimsiniz.' },
      { speaker: 'Dima', ru: 'Меня хорошо обучили. Русская бюрократия — мой новый уровень языка.', reading: 'Minyá haraşó abuçíli. Rúskaya byurakrátiya — moy nóvıy úravin\' yiziká.', tr: 'İyi eğitildim. Rus bürokrasisi — dilde yeni seviyem.' }
    ]
  },
  {
    id: 'mod_b1_e10',
    unitNumber: 71,
    levelGroup: 'B1',
    title: 'Sinema Gişesinde',
    description: 'Seans seçme, koltuk beğenme, bilet ve büyük boy patlamış mısır',
    category: 'Gündelik Yaşam',
    color: '#ec4899',
    icon: '🎬',
    grammarExplain: `📌 SİNEMA DİLİ:
1. "Сеанс" (seans): "на какой сеанс?" (hangi seansa?) — "на + Accusative" ile.
2. Koltuk tarifi: "ряд" (sıra) + "место" (koltuk): "седьмой ряд, места десять и одиннадцать" — sayılar yine sahnede!
3. "Мест нет" (yer yok) — gişenin en acı iki kelimesi; erken gel ya da "онлайн" al.`,
    words: [
      { id: 'wd71_1', ru: 'Кинотеатр', reading: 'Kinatiátr', tr: 'Sinema (bina)', level: 'B1', usageNote: 'Film "кино", bina "кинотеатр".' },
      { id: 'wd71_2', ru: 'Сеанс', reading: 'Siáns', tr: 'Seans', level: 'B1', usageNote: '"Вечерний сеанс" = akşam seansı.' },
      { id: 'wd71_3', ru: 'Касса', reading: 'Kássa', tr: 'Gişe', level: 'B1', usageNote: 'Her yerde karşına çıkar: sinema, tiyatro, market.' },
      { id: 'wd71_4', ru: 'Ряд', reading: 'Ryat', tr: 'Sıra', level: 'B1', usageNote: 'Sonda Д→Т; orta sıralar "средние ряды" en çok istenendir.' },
      { id: 'wd71_5', ru: 'Место', reading: 'Myésta', tr: 'Koltuk/yer', level: 'B1', usageNote: '"Хорошие места остались?" (İyi yerler kaldı mı?)' },
      { id: 'wd71_6', ru: 'Билет', reading: 'Bilyét', tr: 'Bilet', level: 'B1', usageNote: '"Два билета, пожалуйста" — randevunun resmi cümlesi.' },
      { id: 'wd71_7', ru: 'Попкорн', reading: 'Papkórn', tr: 'Patlamış mısır', level: 'B1', usageNote: '"Большой попкорн" stratejik bir yatırımdır.' },
      { id: 'wd71_8', ru: 'Премьера', reading: 'Primyéra', tr: 'Gala/vizyon', level: 'B1', usageNote: '"Сегодня премьера" = bugün vizyona girdi.' },
      { id: 'wd71_9', ru: 'Субтитры', reading: 'Subtítrı', tr: 'Altyazı', level: 'B1', usageNote: '"С субтитрами" (altyazılı) — dil öğrencisinin dostu.' },
      { id: 'wd71_10', ru: 'Зал', reading: 'Zal', tr: 'Salon', level: 'B1', usageNote: '"Третий зал направо" (üçüncü salon sağda).' }
    ],
    sentences: [
      { ru: 'Два билета на вечерний сеанс, пожалуйста.', tr: 'Akşam seansına iki bilet lütfen.', scrambled: ['на вечерний', 'Два билета', 'пожалуйста.', 'сеанс,'], correct: ['Два билета', 'на вечерний', 'сеанс,', 'пожалуйста.'] },
      { ru: 'Седьмой ряд, места в середине, если можно.', tr: 'Yedinci sıra, ortadan koltuklar, mümkünse.', scrambled: ['места в середине,', 'Седьмой ряд,', 'если можно.'], correct: ['Седьмой ряд,', 'места в середине,', 'если можно.'] }
    ],
    sceneTitle: 'Randevu Operasyonu',
    sceneContext: 'Dima Lena\'yı galaya götürüyor; gişede kalan son iki koltuk için diplomatik zafer ve büyük boy mısır kararı.',
    dialogue: [
      { speaker: 'Gişeci', ru: 'На премьеру почти всё продано. Остались места в седьмом ряду.', reading: 'Na primyéru paçtí fsyo pródana. Astális\' mistá f sid\'móm ridú.', tr: 'Galaya neredeyse her şey satıldı. Yedinci sırada yerler kaldı.' },
      { speaker: 'Dima', ru: 'Седьмой ряд — это судьба. Два билета, пожалуйста!', reading: 'Sid\'móy ryat — éta sud\'bá. Dva bilyéta, pajálusta!', tr: 'Yedinci sıra — bu kader. İki bilet lütfen!' },
      { speaker: 'Lena', ru: 'И большой попкорн. Это не обсуждается.', reading: 'I bal\'şóy papkórn. Éta ni absujdáyitsa.', tr: 'Ve büyük boy mısır. Bu tartışılmaz.' },
      { speaker: 'Dima', ru: 'С субтитрами фильм — я же учу русский даже на свидании.', reading: 'S subtítrami fil\'m — ya je uçú rúskiy dáje na svidánii.', tr: 'Film altyazılı — randevuda bile Rusça çalışıyorum ben.' }
    ]
  }
];
