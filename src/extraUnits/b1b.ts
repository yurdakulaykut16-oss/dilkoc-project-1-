// ==========================================================
// EK MÜFREDAT — B1 GENİŞLEME PAKETİ 2/2 (Ünite 60-67)
// Elektronik & iade, flört mesajlaşması, buluşma, tatil,
// araba kiralama ve resmî daire işlemleri.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_B1B: UnitModule[] = [
  {
    id: 'mod_b1_x9',
    unitNumber: 75,
    levelGroup: 'B1',
    title: 'Elektronik Mağazası & Garanti',
    description: 'Cihaz özellikleri sorma, garanti ve "bozuldu" şikâyeti',
    category: 'Gündelik Yaşam',
    color: '#06b6d4',
    icon: '📱',
    grammarExplain: `📌 TEKNOLOJİ ALIŞVERİŞİ DİLİ:
1. "Сломаться" (bozulmak) dönüşlü fiildir: "Телефон сломался" (Telefon bozuldu) — kendi kendine olmuş gibi anlatılır!
2. "Гарантия" (garanti) süreyle verilir: "гарантия на год" (bir yıl garanti).
3. "Сохраните чек!" (Fişi saklayın!) — iade ve garanti işlemlerinin altın kuralıdır.`,
    words: [
      { id: 'wx60_1', ru: 'Гарантия', reading: 'Garántiya', tr: 'Garanti', level: 'B1', usageNote: '"По гарантии" (garanti kapsamında) tamir edilir.' },
      { id: 'wx60_2', ru: 'Чек', reading: 'Çek', tr: 'Fiş / Fatura', level: 'B1', usageNote: 'İade için mutlaka saklanmalıdır.' },
      { id: 'wx60_3', ru: 'Коробка', reading: 'Karópka', tr: 'Kutu', level: 'B1', usageNote: 'İadede kutu da istenir.' },
      { id: 'wx60_4', ru: 'Зарядка', reading: 'Zaryátka', tr: 'Şarj / Şarj aleti', level: 'B1', usageNote: '"Телефон на зарядке" (Telefon şarjda).' },
      { id: 'wx60_5', ru: 'Экран', reading: 'Ekrán', tr: 'Ekran', level: 'B1', usageNote: '"Разбитый экран" (kırık ekran) en yaygın arızadır.' },
      { id: 'wx60_6', ru: 'Сломаться', reading: 'Slamátsa', tr: 'Bozulmak', level: 'B1', usageNote: 'Geçmişte: "сломался/сломалась/сломалось".' },
      { id: 'wx60_7', ru: 'Модель', reading: "Madél'", tr: 'Model', level: 'B1', usageNote: '"Новая модель" (yeni model) her yıl çıkar.' },
      { id: 'wx60_8', ru: 'Характеристики', reading: 'Haraktirístiki', tr: 'Özellikler (teknik)', level: 'B1', usageNote: 'Cihazın teknik özellikleri anlamındadır.' },
      { id: 'wx60_9', ru: 'Обмен', reading: 'Abmyén', tr: 'Değişim', level: 'B1', usageNote: '"Обмен и возврат" (değişim ve iade) reyonu vardır.' },
      { id: 'wx60_10', ru: 'Скидка на витринный образец', reading: 'Skítka na vitrínnıy abrazyéts', tr: 'Teşhir ürünü indirimi', level: 'B1', usageNote: 'Teşhirdeki ürün daha ucuza satılır.' },
      { id: 'wx60_11', ru: 'Наушники', reading: 'Naúşniki', tr: 'Kulaklık', level: 'B1', usageNote: 'Hep çoğul kullanılır.' },
      { id: 'wx60_12', ru: 'Ноутбук', reading: 'Noutbúk', tr: 'Dizüstü bilgisayar', level: 'B1', usageNote: 'İngilizceden geçmiştir; eril kelimedir.' }
    ],
    sentences: [
      { ru: 'Телефон сломался через неделю.', tr: 'Telefon bir hafta sonra bozuldu.', scrambled: ['через', 'Телефон', 'неделю.', 'сломался'], correct: ['Телефон', 'сломался', 'через', 'неделю.'] },
      { ru: 'У вас есть чек и гарантия?', tr: 'Fişiniz ve garantiniz var mı?', scrambled: ['чек', 'У вас есть', 'и гарантия?'], correct: ['У вас есть', 'чек', 'и гарантия?'] }
    ],
    sceneTitle: 'Garanti Masasında Hesaplaşma',
    sceneContext: 'Yeni aldığı kulaklığı bozulan müşteri, garanti masasında fiş-kutu-garanti üçgeninde hakkını arar.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Эти наушники сломались через неделю!', reading: 'Éti naúşniki slamális\' çyéris nidyélyu!', tr: 'Bu kulaklık bir haftada bozuldu!' },
      { speaker: 'Görevli', ru: 'Понимаю. Чек и коробка у вас с собой?', reading: 'Panimáyu. Çek i karópka u vas s sabóy?', tr: 'Anlıyorum. Fiş ve kutu yanınızda mı?' },
      { speaker: 'Müşteri', ru: 'Да, вот всё. Гарантия — один год.', reading: 'Da, vot fsyo. Garántiya — adín got.', tr: 'Evet, hepsi burada. Garanti bir yıl.' },
      { speaker: 'Görevli', ru: 'Отлично, оформим обмен на новую модель.', reading: 'Atlíçna, afórmim abmyén na nóvuyu madél\'.', tr: 'Harika, yeni modelle değişim yapalım.' }
    ]
  },
  {
    id: 'mod_b1_x10',
    unitNumber: 76,
    levelGroup: 'B1',
    title: 'İade & Değişim Hakkı',
    description: '"Uymadı, iade etmek istiyorum" — 14 gün kuralı ve para iadesi',
    category: 'Gündelik Yaşam',
    color: '#f97316',
    icon: '🔄',
    grammarExplain: `📌 İADE DİLİ:
1. "Вернуть" (iade etmek) iki yönlü çalışır: müşteri malı "возвращает", mağaza parayı "возвращает".
2. "Не подошло" (uymadı/olmadı) — iade sebebi olarak en kibar ve en yaygın ifadedir.
3. Rusya'da yasal iade süresi kalıbı: "в течение четырнадцати дней" (14 gün içinde).`,
    words: [
      { id: 'wx61_1', ru: 'Вернуть', reading: "Virnút'", tr: 'İade etmek / Geri vermek', level: 'B1', usageNote: '"Я хочу вернуть товар" (Ürünü iade etmek istiyorum).' },
      { id: 'wx61_2', ru: 'Возврат', reading: 'Vazvrát', tr: 'İade', level: 'B1', usageNote: '"Возврат денег" para iadesi demektir.' },
      { id: 'wx61_3', ru: 'Обменять', reading: "Abminyát'", tr: 'Değiştirmek', level: 'B1', usageNote: '"Обменять на другой размер" (başka bedenle değiştirmek).' },
      { id: 'wx61_4', ru: 'Не подошло', reading: 'Ni padaşló', tr: 'Uymadı / Olmadı', level: 'B1', usageNote: 'En yaygın iade gerekçesidir.' },
      { id: 'wx61_5', ru: 'Бракованный', reading: 'Brakóvannıy', tr: 'Defolu / Kusurlu', level: 'B1', usageNote: '"Брак" üretim hatası demektir.' },
      { id: 'wx61_6', ru: 'Заявление', reading: 'Zayavlyéniye', tr: 'Dilekçe / Başvuru', level: 'B1', usageNote: 'İade için kısa bir dilekçe doldurulur.' },
      { id: 'wx61_7', ru: 'Правила возврата', reading: 'Právila vazvráta', tr: 'İade koşulları', level: 'B1', usageNote: 'Kasanın yanında asılıdır.' },
      { id: 'wx61_8', ru: 'В течение 14 дней', reading: 'F tiçyéniye çitýrnadtsati dnyey', tr: '14 gün içinde', level: 'B1', usageNote: 'Yasal iade süresi kalıbıdır.' },
      { id: 'wx61_9', ru: 'Покупка', reading: 'Pakúpka', tr: 'Satın alma / Alışveriş', level: 'B1', usageNote: '"Удачная покупка" (iyi alışveriş) denir.' },
      { id: 'wx61_10', ru: 'Этикетка', reading: 'Etikyétka', tr: 'Etiket', level: 'B1', usageNote: 'İade için etiket koparılmamış olmalıdır.' },
      { id: 'wx61_11', ru: 'Деньги вернут', reading: "Dyén'gi virnút", tr: 'Para iade edilecek', level: 'B1', usageNote: '"Деньги вернут на карту" (Para karta iade edilir).' },
      { id: 'wx61_12', ru: 'Кассир', reading: 'Kassír', tr: 'Kasiyer', level: 'B1', usageNote: 'İade işlemini başlatan kişidir.' }
    ],
    sentences: [
      { ru: 'Я хочу вернуть эту покупку.', tr: 'Bu ürünü iade etmek istiyorum.', scrambled: ['эту', 'Я хочу', 'покупку.', 'вернуть'], correct: ['Я хочу', 'вернуть', 'эту', 'покупку.'] },
      { ru: 'Деньги вернут на карту через три дня.', tr: 'Para üç gün içinde karta iade edilecek.', scrambled: ['на карту', 'Деньги вернут', 'через три дня.'], correct: ['Деньги вернут', 'на карту', 'через три дня.'] }
    ],
    sceneTitle: 'İade Masası Müzakeresi',
    sceneContext: 'Hediye aldığı kazak küçük gelen müşteri, etiket ve fişle iade masasında; görevli önce değişim önerir.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Здравствуйте, я хочу вернуть этот свитер. Не подошёл.', reading: 'Zdrástvuyte, ya haçú virnút\' état svíter. Ni padaşól.', tr: 'Merhaba, bu kazağı iade etmek istiyorum. Olmadı.' },
      { speaker: 'Görevli', ru: 'Может, обменяем на другой размер?', reading: 'Mójıt, abminyáim na drugóy razmyér?', tr: 'Belki başka bedenle değiştirelim?' },
      { speaker: 'Müşteri', ru: 'Нет, спасибо. Хочу возврат денег.', reading: 'Nyet, spasíba. Haçú vazvrát dyénik.', tr: 'Hayır, teşekkürler. Para iadesi istiyorum.' },
      { speaker: 'Görevli', ru: 'Хорошо. Заполните заявление, деньги вернут на карту.', reading: 'Haraşó. Zapólnite zayavlyéniye, dyén\'gi virnút na kártu.', tr: 'Tamam. Dilekçeyi doldurun, para karta iade edilecek.' }
    ]
  },
  {
    id: 'mod_b1_x11',
    unitNumber: 77,
    levelGroup: 'B1',
    title: 'Sosyal Medyada Flört & İlk Mesaj',
    description: 'DM atma, profil beğenme ve buluşmaya davet — dijital manitacılık',
    category: 'İlişkiler & Flört',
    color: '#ec4899',
    icon: '💬',
    grammarExplain: `📌 DİJİTAL FLÖRT DİLİ:
1. "Написать первым/первой" (ilk mesajı atmak): "Он написал мне первым" (İlk o yazdı) — flört anlatılarının klasik cümlesi.
2. "Давай + gelecek zaman" teklif kalıbıdır: "Давай встретимся?" (Buluşalım mı?).
3. "Общаться" (mesajlaşmak/görüşmek) süreç bildirir: "Мы общаемся уже месяц" (Bir aydır konuşuyoruz).`,
    words: [
      { id: 'wx62_1', ru: 'Написать первым', reading: "Napisát' pyérvım", tr: 'İlk mesajı atmak', level: 'B1', usageNote: 'Kadın için "написать первой" denir.' },
      { id: 'wx62_2', ru: 'Сообщение', reading: 'Saabşşéniye', tr: 'Mesaj', level: 'B1', usageNote: 'Günlük dilde kısaca "сообщение" ya da "смс".' },
      { id: 'wx62_3', ru: 'Лайк', reading: 'Layk', tr: 'Beğeni / Like', level: 'B1', usageNote: '"Поставить лайк" (beğeni bırakmak) denir.' },
      { id: 'wx62_4', ru: 'Профиль', reading: "Prófil'", tr: 'Profil', level: 'B1', usageNote: 'Sosyal medya profili anlamındadır.' },
      { id: 'wx62_5', ru: 'Ответить', reading: "Atvyétit'", tr: 'Cevap vermek', level: 'B1', usageNote: '"Она не ответила" (Cevap vermedi) — dram başlangıcı.' },
      { id: 'wx62_6', ru: 'Смайлик', reading: 'Smáylik', tr: 'Emoji / Gülücük', level: 'B1', usageNote: 'Mesajın tonunu yumuşatır.' },
      { id: 'wx62_7', ru: 'Встретиться', reading: "Vstryétitsa", tr: 'Buluşmak', level: 'B1', usageNote: '"Давай встретимся?" dijital flörtün hedef cümlesidir.' },
      { id: 'wx62_8', ru: 'Общаться', reading: 'Abşşátsa', tr: 'Mesajlaşmak / Görüşmek', level: 'B1', usageNote: 'Sürekli iletişimi anlatır.' },
      { id: 'wx62_9', ru: 'Стесняться', reading: 'Stisnyátsa', tr: 'Utanmak / Çekinmek', level: 'B1', usageNote: '"Не стесняйся!" (Çekinme!) diye cesaret verilir.' },
      { id: 'wx62_10', ru: 'В сети', reading: 'F sití', tr: 'Çevrimiçi', level: 'B1', usageNote: '"Она в сети" (O çevrimiçi) — ama cevap yok!' },
      { id: 'wx62_11', ru: 'Прочитал и молчит', reading: 'Praçitál i malçít', tr: 'Okudu ve susuyor', level: 'B1', usageNote: 'Türkçedeki "görüldü attı" durumunun Rusçasıdır.' },
      { id: 'wx62_12', ru: 'Общие интересы', reading: 'Óbşşiye intirésy', tr: 'Ortak ilgi alanları', level: 'B1', usageNote: 'Sohbet başlatmanın en doğal yoludur.' }
    ],
    sentences: [
      { ru: 'Он написал мне первым.', tr: 'İlk mesajı o attı.', scrambled: ['мне', 'Он написал', 'первым.'], correct: ['Он написал', 'мне', 'первым.'] },
      { ru: 'Давай встретимся в субботу?', tr: 'Cumartesi buluşalım mı?', scrambled: ['в субботу?', 'Давай', 'встретимся'], correct: ['Давай', 'встретимся', 'в субботу?'] }
    ],
    sceneTitle: 'Üç Saat "Yazıyor..." Ekranı',
    sceneContext: 'Dima, beğendiği kıza atacağı ilk mesajı üç saattir yazıp siliyor; Lyosha "gönder gitsin" ekolünü temsil ediyor.',
    dialogue: [
      { speaker: 'Dima', ru: 'Я три часа пишу ей сообщение. Как начать?', reading: 'Ya tri çisá pişú yey saabşşéniye. Kak naçát\'?', tr: 'Üç saattir ona mesaj yazıyorum. Nasıl başlasam?' },
      { speaker: 'Lyosha', ru: 'Просто напиши: "Привет! У нас общие интересы".', reading: 'Prósta napişí: "Privét! U nas óbşşiye intirésy".', tr: 'Basitçe yaz: "Selam! Ortak ilgi alanlarımız var".' },
      { speaker: 'Dima', ru: 'Отправил... Она в сети! Прочитала и молчит!', reading: 'Atprávil... Aná f sití! Praçitála i malçít!', tr: 'Gönderdim... Çevrimiçi! Okudu ve susuyor!' },
      { speaker: 'Lyosha', ru: 'Спокойно! Смотри — отвечает: "Давай встретимся!"', reading: 'Spakóyna! Smatrí — atviçáit: "Daváy vstryétimsa!"', tr: 'Sakin! Bak — cevap yazıyor: "Buluşalım!"' }
    ]
  },
  {
    id: 'mod_b1_x12',
    unitNumber: 78,
    levelGroup: 'B1',
    title: 'Buluşma Hazırlığı & Heyecan Yönetimi',
    description: 'Kıyafet seçimi, arkadaş tavsiyeleri ve "harika görünüyorsun" kalıpları',
    category: 'İlişkiler & Flört',
    color: '#d946ef',
    icon: '💇',
    grammarExplain: `📌 BULUŞMA ÖNCESİ DİL:
1. "Волноваться" (heyecanlanmak/endişelenmek): "Не волнуйся!" (Heyecan yapma!) en çok söylenen tesellidir.
2. "Выглядеть" (görünmek) + zarf: "Ты отлично выглядишь!" (Harika görünüyorsun!) — buluşmanın açılış kompliманыdır.
3. "Опаздывать на свидание" (buluşmaya geç kalmak) — asla önerilmez ama sık yaşanır!`,
    words: [
      { id: 'wx63_1', ru: 'Свидание', reading: 'Svidániye', tr: 'Buluşma / Randevu (romantik)', level: 'B1', usageNote: '"Первое свидание" (ilk buluşma) unutulmaz sayılır.' },
      { id: 'wx63_2', ru: 'Волноваться', reading: 'Valnavátsa', tr: 'Heyecanlanmak', level: 'B1', usageNote: '"Не волнуйся!" (Heyecanlanma!) diye sakinleştirilir.' },
      { id: 'wx63_3', ru: 'Наряд', reading: 'Naryát', tr: 'Kıyafet / Kombin', level: 'B1', usageNote: 'Özel gün kıyafeti anlamındadır.' },
      { id: 'wx63_4', ru: 'Духи', reading: 'Duhí', tr: 'Parfüm', level: 'B1', usageNote: 'Hep çoğul kullanılır; vurgu sondadır.' },
      { id: 'wx63_5', ru: 'Причёска', reading: 'Priçyóska', tr: 'Saç modeli', level: 'B1', usageNote: '"Сделать причёску" (saç yaptırmak).' },
      { id: 'wx63_6', ru: 'Комплимент', reading: 'Kamplimyént', tr: 'Kompliman / İltifat', level: 'B1', usageNote: '"Сделать комплимент" (iltifat etmek) denir.' },
      { id: 'wx63_7', ru: 'Цветы', reading: 'Tsvitý', tr: 'Çiçekler', level: 'B1', usageNote: 'Rusya\'da TEK sayıda çiçek hediye edilir; çift sayı cenazeler içindir!' },
      { id: 'wx63_8', ru: 'Советовать', reading: "Savyétavat'", tr: 'Tavsiye etmek', level: 'B1', usageNote: '"Что советуешь?" (Ne önerirsin?) diye sorulur.' },
      { id: 'wx63_9', ru: 'Выглядеть', reading: "Výglidit'", tr: 'Görünmek', level: 'B1', usageNote: '"Ты прекрасно выглядишь!" kalıbında geçer.' },
      { id: 'wx63_10', ru: 'Опаздывать', reading: "Apázdıvat'", tr: 'Geç kalmak', level: 'B1', usageNote: 'Buluşmaya 5 dakika bile geç kalmak konuşulur.' },
      { id: 'wx63_11', ru: 'Уверенность', reading: "Uvyérinnast'", tr: 'Özgüven', level: 'B1', usageNote: '"Главное — уверенность!" (Önemli olan özgüven!).' },
      { id: 'wx63_12', ru: 'Произвести впечатление', reading: 'Praizvistí fpiçitlyéniye', tr: 'İyi izlenim bırakmak', level: 'B1', usageNote: 'İlk buluşmanın gizli hedefi budur.' }
    ],
    sentences: [
      { ru: 'Ты прекрасно выглядишь сегодня!', tr: 'Bugün harika görünüyorsun!', scrambled: ['выглядишь', 'Ты', 'сегодня!', 'прекрасно'], correct: ['Ты', 'прекрасно', 'выглядишь', 'сегодня!'] },
      { ru: 'Не волнуйся, всё будет хорошо.', tr: 'Heyecanlanma, her şey iyi olacak.', scrambled: ['всё будет', 'Не волнуйся,', 'хорошо.'], correct: ['Не волнуйся,', 'всё будет', 'хорошо.'] }
    ],
    sceneTitle: 'Buluşmadan Bir Saat Önce',
    sceneContext: 'Katya ilk buluşma öncesi üç kombin denemiştir; en yakın arkadaşı telefonda moral koçluğu yapar.',
    dialogue: [
      { speaker: 'Katya', ru: 'Я так волнуюсь! Какой наряд лучше — синий или чёрный?', reading: 'Ya tak valnúyus\'! Kakóy naryát lútşe — síniy íli çyórnıy?', tr: 'Çok heyecanlıyım! Hangi kombin daha iyi — mavi mi siyah mı?' },
      { speaker: 'Vera', ru: 'Синий! И сделай причёску, как в прошлый раз.', reading: 'Síniy! I sdyélay priçyósku, kak f próşlıy ras.', tr: 'Mavi! Ve geçen seferki gibi saçını yap.' },
      { speaker: 'Katya', ru: 'А если я скажу что-то глупое?', reading: 'A yésli ya skajú şto-ta glúpaye?', tr: 'Ya aptalca bir şey söylersem?' },
      { speaker: 'Vera', ru: 'Не волнуйся! Главное — уверенность. Ты прекрасно выглядишь!', reading: 'Ni valnúysya! Glávnaye — uvyérinnast\'. Ty prikrásna výglidiş\'!', tr: 'Heyecanlanma! Önemli olan özgüven. Harika görünüyorsun!' }
    ]
  },
  {
    id: 'mod_b1_x13',
    unitNumber: 79,
    levelGroup: 'B1',
    title: 'Sevgili Olma & "Biz Neyiz?" Konuşması',
    description: 'İlişkiyi tanımlama, duyguları itiraf etme ve resmen çift olma',
    category: 'İlişkiler & Flört',
    color: '#f43f5e',
    icon: '❤️',
    grammarExplain: `📌 İLİŞKİ TANIMLAMA DİLİ:
1. "Встречаться" (çıkmak/görüşmek): "Мы встречаемся" (Biz çıkıyoruz) — resmen sevgili olmanın ilanıdır.
2. "Признаться в чувствах" (duygularını itiraf etmek): "Я должен признаться..." (İtiraf etmeliyim ki...).
3. "Нравиться" (hoşlanmak) yönelme hâli ister: "Ты мне нравишься" (Senden hoşlanıyorum) — kelime kelime "Sen bana hoş geliyorsun".`,
    words: [
      { id: 'wx64_1', ru: 'Отношения', reading: 'Atnaşéniya', tr: 'İlişki', level: 'B1', usageNote: 'Hep çoğul kullanılır: "серьёзные отношения".' },
      { id: 'wx64_2', ru: 'Встречаться', reading: 'Vstriçátsa', tr: 'Çıkmak / Sevgili olmak', level: 'B1', usageNote: '"Мы встречаемся" resmî ilan cümlesidir.' },
      { id: 'wx64_3', ru: 'Серьёзно', reading: "Sir'yózna", tr: 'Ciddi / Ciddi olarak', level: 'B1', usageNote: '"Это серьёзно?" (Bu ciddi mi?) diye sorulur.' },
      { id: 'wx64_4', ru: 'Нравиться', reading: 'Nrávitsa', tr: 'Hoşlanmak', level: 'B1', usageNote: '"Ты мне нравишься" (Senden hoşlanıyorum).' },
      { id: 'wx64_5', ru: 'Чувства', reading: 'Çústva', tr: 'Duygular', level: 'B1', usageNote: 'В harfi okunmaz: "çústva".' },
      { id: 'wx64_6', ru: 'Признаться', reading: 'Priznátsa', tr: 'İtiraf etmek', level: 'B1', usageNote: '"Признаться в любви" (aşkını ilan etmek).' },
      { id: 'wx64_7', ru: 'Пара', reading: 'Pára', tr: 'Çift', level: 'B1', usageNote: '"Мы теперь пара" (Artık çiftiz) denir.' },
      { id: 'wx64_8', ru: 'Вместе', reading: 'Vmyéste', tr: 'Birlikte', level: 'B1', usageNote: '"Мы вместе" (Birlikteyiz) kısa ve nettir.' },
      { id: 'wx64_9', ru: 'Доверять', reading: "Daviryát'", tr: 'Güvenmek', level: 'B1', usageNote: 'Yönelme hâli ister: "Я тебе доверяю".' },
      { id: 'wx64_10', ru: 'Обнимать', reading: "Abnimát'", tr: 'Sarılmak', level: 'B1', usageNote: '"Обними меня" (Sarıl bana) denir.' },
      { id: 'wx64_11', ru: 'Скучать', reading: "Skuçát'", tr: 'Özlemek', level: 'B1', usageNote: '"Я скучаю по тебе" (Seni özlüyorum).' },
      { id: 'wx64_12', ru: 'Половинка', reading: 'Palavínka', tr: 'Diğer yarısı / Ruh eşi', level: 'B1', usageNote: 'Romantik dilde "вторая половинка" denir.' }
    ],
    sentences: [
      { ru: 'Мы теперь встречаемся?', tr: 'Artık çıkıyor muyuz?', scrambled: ['теперь', 'Мы', 'встречаемся?'], correct: ['Мы', 'теперь', 'встречаемся?'] },
      { ru: 'Я хочу серьёзные отношения.', tr: 'Ciddi bir ilişki istiyorum.', scrambled: ['серьёзные', 'Я хочу', 'отношения.'], correct: ['Я хочу', 'серьёзные', 'отношения.'] }
    ],
    sceneTitle: 'Park Bankında Büyük Soru',
    sceneContext: 'Üçüncü buluşmanın sonunda Dima cesaretini toplar ve meşhur "biz neyiz?" konuşmasını başlatır.',
    dialogue: [
      { speaker: 'Dima', ru: 'Настя, я должен признаться... Ты мне очень нравишься.', reading: 'Nástya, ya dóljın priznátsa... Ty mne óçin\' nráviş\'sya.', tr: 'Nastya, itiraf etmeliyim... Senden çok hoşlanıyorum.' },
      { speaker: 'Nastya', ru: 'Дима... ты мне тоже нравишься.', reading: 'Díma... ty mne tóje nráviş\'sya.', tr: 'Dima... ben de senden hoşlanıyorum.' },
      { speaker: 'Dima', ru: 'Значит... мы теперь встречаемся? Официально?', reading: 'Znáçit... my tipyér\' vstriçáimsa? Afitsiál\'na?', tr: 'Yani... artık çıkıyor muyuz? Resmen?' },
      { speaker: 'Nastya', ru: 'Да! Мы теперь пара. Обними меня!', reading: 'Da! My tipyér\' pára. Abnimí minyá!', tr: 'Evet! Artık çiftiz. Sarıl bana!' }
    ]
  },
  {
    id: 'mod_b1_x14',
    unitNumber: 80,
    levelGroup: 'B1',
    title: 'Sevgiliyle İlk Tatil Planı',
    description: 'Otel rezervasyonu, plaj programı ve romantik gün batımı',
    category: 'İlişkiler & Flört',
    color: '#14b8a6',
    icon: '🏖️',
    grammarExplain: `📌 TATİL PLANI DİLİ:
1. "Забронировать" (rezervasyon yapmak): "Мы забронировали отель" (Otel rezerve ettik).
2. "У моря" (deniz kenarında) — yer bildirir; "на море" (denize/deniz kenarına) — yön bildirir: "Поедем на море!"
3. "Какой красивый закат!" (Ne güzel bir gün batımı!) — "какой + sıfat" hayranlık kalıbıdır.`,
    words: [
      { id: 'wx65_1', ru: 'Отпуск', reading: 'Ótpusk', tr: 'İzin / Tatil (işten)', level: 'B1', usageNote: '"Взять отпуск" (izin almak) denir.' },
      { id: 'wx65_2', ru: 'Море', reading: 'Móre', tr: 'Deniz', level: 'B1', usageNote: '"Поехать на море" (denize gitmek) hayalidir.' },
      { id: 'wx65_3', ru: 'Забронировать', reading: "Zabraníravat'", tr: 'Rezervasyon yapmak', level: 'B1', usageNote: 'Otel, masa, bilet — hepsi için kullanılır.' },
      { id: 'wx65_4', ru: 'Отель', reading: "Atél'", tr: 'Otel', level: 'B1', usageNote: '"Гостиница" da aynı anlamda kullanılır.' },
      { id: 'wx65_5', ru: 'Пляж', reading: 'Plyaj', tr: 'Plaj', level: 'B1', usageNote: '"На пляже" (plajda) şeklinde çekimlenir.' },
      { id: 'wx65_6', ru: 'Загорать', reading: "Zagarát'", tr: 'Güneşlenmek', level: 'B1', usageNote: '"Загореть" bronzlaşmak demektir.' },
      { id: 'wx65_7', ru: 'Экскурсия', reading: 'Ekskúrsiya', tr: 'Tur / Gezi', level: 'B1', usageNote: '"Записаться на экскурсию" (tura yazılmak).' },
      { id: 'wx65_8', ru: 'Романтика', reading: 'Ramántika', tr: 'Romantizm', level: 'B1', usageNote: '"Как романтично!" (Ne romantik!) denir.' },
      { id: 'wx65_9', ru: 'Закат', reading: 'Zakát', tr: 'Gün batımı', level: 'B1', usageNote: 'Çiftlerin fotoğraf çektiği andır.' },
      { id: 'wx65_10', ru: 'Фотографироваться', reading: 'Fatagrafíravatsa', tr: 'Fotoğraf çektirmek', level: 'B1', usageNote: 'Dönüşlü hali "kendini çektirmek" demektir.' },
      { id: 'wx65_11', ru: 'Чемоданное настроение', reading: 'Çimadánnaye nastrayéniye', tr: 'Tatil havasına girmek', level: 'B1', usageNote: 'Kelime kelime "valiz ruh hali" — gitmeye hazır olma hissi.' },
      { id: 'wx65_12', ru: 'Вид на море', reading: 'Vit na móre', tr: 'Deniz manzarası', level: 'B1', usageNote: '"Номер с видом на море" (deniz manzaralı oda).' }
    ],
    sentences: [
      { ru: 'Мы забронировали отель у моря.', tr: 'Deniz kenarında otel rezerve ettik.', scrambled: ['отель', 'Мы забронировали', 'у моря.'], correct: ['Мы забронировали', 'отель', 'у моря.'] },
      { ru: 'Какой красивый закат сегодня!', tr: 'Bugün ne güzel bir gün batımı!', scrambled: ['закат', 'Какой', 'сегодня!', 'красивый'], correct: ['Какой', 'красивый', 'закат', 'сегодня!'] }
    ],
    sceneTitle: 'Sahilde Gün Batımı Pazarlığı',
    sceneContext: 'Çiftin ilk ortak tatili: Nastya tur programı yapmıştır, Dima ise plajdan kalkmak istemez.',
    dialogue: [
      { speaker: 'Nastya', ru: 'Дима, завтра экскурсия в старый город!', reading: 'Díma, záftra ekskúrsiya f stárıy górat!', tr: 'Dima, yarın eski şehre tur var!' },
      { speaker: 'Dima', ru: 'А может, просто загорать на пляже?', reading: 'A mójıt, prósta zagarát\' na plyáje?', tr: 'Belki de sadece plajda güneşleniriz?' },
      { speaker: 'Nastya', ru: 'Ладно. Но вечером — ужин с видом на море!', reading: 'Ládna. No vyéçiram — újın s vídam na móre!', tr: 'Tamam. Ama akşam deniz manzaralı yemek var!' },
      { speaker: 'Dima', ru: 'Смотри, какой закат! Давай сфотографируемся!', reading: 'Smatrí, kakóy zakát! Daváy sfatagrafíruyemsa!', tr: 'Bak, ne gün batımı! Hadi fotoğraf çektirelim!' }
    ]
  },
  {
    id: 'mod_b1_x15',
    unitNumber: 81,
    levelGroup: 'B1',
    title: 'Araba Kiralama & Trafik',
    description: 'Ehliyet, sigorta, benzin istasyonu ve trafik sıkışıklığı',
    category: 'Ulaşım & Seyahat',
    color: '#84cc16',
    icon: '🚗',
    grammarExplain: `📌 ARABA & TRAFİK DİLİ:
1. "Взять машину в аренду" (araba kiralamak) — kiralama ofisinde "права" (ehliyet) ve "страховка" (sigorta) sorulur.
2. "Стоять в пробке" (trafikte beklemek) — kelime kelime "tıkaçta durmak". Moskova'nın millî sporu!
3. "Заправить машину" (arabaya benzin almak): "Полный бак, пожалуйста" (Depoyu fulleyin lütfen).`,
    words: [
      { id: 'wx66_1', ru: 'Аренда машины', reading: 'Aryénda mashýny', tr: 'Araba kiralama', level: 'B1', usageNote: '"Каршеринг" dakikalık kiralama demektir.' },
      { id: 'wx66_2', ru: 'Права', reading: 'Pravá', tr: 'Ehliyet', level: 'B1', usageNote: 'Kelime kelime "haklar"; sürücü belgesi anlamındadır.' },
      { id: 'wx66_3', ru: 'Страховка', reading: 'Strahófka', tr: 'Sigorta', level: 'B1', usageNote: 'Trafik sigortası "ОСАГО" olarak bilinir.' },
      { id: 'wx66_4', ru: 'Бензин', reading: 'Binzín', tr: 'Benzin', level: 'B1', usageNote: '"Кончился бензин" (Benzin bitti) — kâbus senaryosu.' },
      { id: 'wx66_5', ru: 'Заправка', reading: 'Zapráfka', tr: 'Benzin istasyonu', level: 'B1', usageNote: 'Tam adı "автозаправочная станция" (АЗС)dir.' },
      { id: 'wx66_6', ru: 'Пробка', reading: 'Própka', tr: 'Trafik sıkışıklığı', level: 'B1', usageNote: 'Aynı kelime "şişe mantarı" demektir!' },
      { id: 'wx66_7', ru: 'Парковка', reading: 'Parkófka', tr: 'Otopark / Park yeri', level: 'B1', usageNote: '"Платная парковка" (ücretli otopark) yaygındır.' },
      { id: 'wx66_8', ru: 'Штраф', reading: 'Ştraf', tr: 'Ceza (para)', level: 'B1', usageNote: '"Штраф за парковку" (park cezası) sık gelir.' },
      { id: 'wx66_9', ru: 'Навигатор', reading: 'Navigátar', tr: 'Navigasyon', level: 'B1', usageNote: '"Навигатор показывает пробки" (Navigasyon trafiği gösteriyor).' },
      { id: 'wx66_10', ru: 'Правила движения', reading: 'Právila dvijéniya', tr: 'Trafik kuralları', level: 'B1', usageNote: 'Kısaltması "ПДД"dir.' },
      { id: 'wx66_11', ru: 'Полный бак', reading: 'Pólnıy bak', tr: 'Full depo', level: 'B1', usageNote: '"Полный бак, пожалуйста!" istasyonda söylenir.' },
      { id: 'wx66_12', ru: 'Объезд', reading: 'Ab\'yést', tr: 'Alternatif yol / Servis yolu', level: 'B1', usageNote: 'Navigasyonun trafik çözümüdür.' }
    ],
    sentences: [
      { ru: 'Мы стоим в пробке уже час.', tr: 'Bir saattir trafikte bekliyoruz.', scrambled: ['в пробке', 'Мы стоим', 'уже час.'], correct: ['Мы стоим', 'в пробке', 'уже час.'] },
      { ru: 'Где здесь ближайшая заправка?', tr: 'Buradaki en yakın benzinlik nerede?', scrambled: ['ближайшая', 'Где здесь', 'заправка?'], correct: ['Где здесь', 'ближайшая', 'заправка?'] }
    ],
    sceneTitle: 'Kiralık Arabayla İlk Yolculuk',
    sceneContext: 'Tatilde araba kiralayan çift, benzin, navigasyon ve Moskova trafiğiyle imtihan olur.',
    dialogue: [
      { speaker: 'Görevli', ru: 'Ваши права и страховка, пожалуйста.', reading: 'Váşi pravá i strahófka, pazhálusta.', tr: 'Ehliyetiniz ve sigortanız lütfen.' },
      { speaker: 'Dima', ru: 'Вот. А бензин полный?', reading: 'Vot. A binzín pólnıy?', tr: 'Buyurun. Peki depo dolu mu?' },
      { speaker: 'Görevli', ru: 'Полный бак. Верните машину тоже с полным.', reading: 'Pólnıy bak. Virníte mashýnu tóje s pólnım.', tr: 'Depo full. Arabayı da full depoyla iade edin.' },
      { speaker: 'Dima', ru: 'Понял. Навигатор говорит — впереди пробка...', reading: 'Pónyal. Navigátar gavarít — fpiridí própka...', tr: 'Anladım. Navigasyon diyor ki — ileride trafik var...' }
    ]
  },
  {
    id: 'mod_b1_x16',
    unitNumber: 82,
    levelGroup: 'B1',
    title: 'Vergi Dairesi & Resmî İşlemler',
    description: 'Belge alma, sıra numarası, damga ve devlet dairesi sabrı',
    category: 'Orada Yaşamak',
    color: '#64748b',
    icon: '🧾',
    grammarExplain: `📌 DEVLET DAİRESİ DİLİ:
1. "Мне нужна справка" (Bana belge lazım) — "справка" Rus bürokrasisinin en meşhur kelimesidir.
2. "Возьмите талон" (Sıra numarası alın) — elektronik sıra sisteminin standart cümlesi.
3. "Госуслуги" — devletin e-Devlet portalıdır; "оформить через Госуслуги" (e-Devletten halletmek) hayat kurtarır.`,
    words: [
      { id: 'wx67_1', ru: 'Налог', reading: 'Nalók', tr: 'Vergi', level: 'B1', usageNote: '"Платить налоги" (vergi ödemek) vatandaşlık görevidir.' },
      { id: 'wx67_2', ru: 'Справка', reading: 'Spráfka', tr: 'Belge / Yazı', level: 'B1', usageNote: 'Rus bürokrasisinin simge kelimesidir.' },
      { id: 'wx67_3', ru: 'Заявление', reading: 'Zayavlyéniye', tr: 'Dilekçe', level: 'B1', usageNote: '"Подать заявление" (dilekçe vermek).' },
      { id: 'wx67_4', ru: 'Талон', reading: 'Talón', tr: 'Sıra numarası / Fiş', level: 'B1', usageNote: 'Elektronik kuyruk sisteminin bileti.' },
      { id: 'wx67_5', ru: 'Окно', reading: 'Aknó', tr: 'Gişe (pencere)', level: 'B1', usageNote: '"Подойдите к окну номер пять" (5 no\'lu gişeye gelin).' },
      { id: 'wx67_6', ru: 'Печать', reading: "Piçát'", tr: 'Damga / Mühür', level: 'B1', usageNote: 'Belge damgasız geçersiz sayılır!' },
      { id: 'wx67_7', ru: 'Копия', reading: 'Kópiya', tr: 'Kopya / Fotokopi', level: 'B1', usageNote: '"Сделайте копию паспорта" istenir.' },
      { id: 'wx67_8', ru: 'Подпись', reading: 'Pótpis\'', tr: 'İmza', level: 'B1', usageNote: '"Поставьте подпись здесь" (Buraya imza atın).' },
      { id: 'wx67_9', ru: 'Оформить', reading: "Afórmit'", tr: 'İşlemi yapmak / Düzenlemek', level: 'B1', usageNote: 'Bürokrasinin joker fiilidir.' },
      { id: 'wx67_10', ru: 'Госуслуги', reading: 'Gosuslúgi', tr: 'e-Devlet (portalı)', level: 'B1', usageNote: 'Rusya\'nın e-Devlet sistemidir.' },
      { id: 'wx67_11', ru: 'Приёмные часы', reading: 'Priyómnıye çisý', tr: 'Mesai / Kabul saatleri', level: 'B1', usageNote: 'Öğle arasına denk gelmek klasik şanssızlıktır.' },
      { id: 'wx67_12', ru: 'Срок готовности', reading: 'Srok gatóvnasti', tr: 'Hazır olma süresi', level: 'B1', usageNote: '"Будет готово через неделю" (Bir haftada hazır olur).' }
    ],
    sentences: [
      { ru: 'Мне нужна справка о доходах.', tr: 'Gelir belgesine ihtiyacım var.', scrambled: ['справка', 'Мне нужна', 'о доходах.'], correct: ['Мне нужна', 'справка', 'о доходах.'] },
      { ru: 'Поставьте печать, пожалуйста.', tr: 'Damga vurun, lütfen.', scrambled: ['печать,', 'Поставьте', 'пожалуйста.'], correct: ['Поставьте', 'печать,', 'пожалуйста.'] }
    ],
    sceneTitle: 'Gişe 5\'in Gizemi',
    sceneContext: 'Belge almaya gelen vatandaş, sıra numarası-fotokopi-damga üçgeninde devlet dairesi macerası yaşar.',
    dialogue: [
      { speaker: 'Vatandaş', ru: 'Здравствуйте! Мне нужна справка о доходах.', reading: 'Zdrástvuyte! Mne nujná spráfka a dahódah.', tr: 'Merhaba! Gelir belgesine ihtiyacım var.' },
      { speaker: 'Görevli', ru: 'Возьмите талон и ждите у окна номер пять.', reading: 'Vaz\'míte talón i jdíte u akná nómir pyat\'.', tr: 'Sıra numarası alın ve 5 numaralı gişede bekleyin.' },
      { speaker: 'Vatandaş', ru: 'Вот мои документы и копия паспорта.', reading: 'Vot maí dakumyénty i kópiya pásparta.', tr: 'İşte belgelerim ve pasaport fotokopim.' },
      { speaker: 'Görevli', ru: 'Отлично. Справка будет готова через неделю, с печатью.', reading: 'Atlíçna. Spráfka búdit gatóva çyéris nidyélyu, s piçát\'yu.', tr: 'Harika. Belge bir hafta içinde damgalı olarak hazır olur.' }
    ]
  }
];
