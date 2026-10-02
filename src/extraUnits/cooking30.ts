import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const COOKING30_A2: UnitModule[] = [
  {
    id: 'ck30_a2_kitchen', unitNumber: 40.9701, levelGroup: 'A2',
    title: 'Mutfak Eşyaları', description: 'Tencere, tava, kepçe: mutfağın envanteri',
    category: 'Aşçılık', color: '#ea580c', icon: '🍳',
    grammarExplain: `📌 ARAÇ HÂLİ İLE "İLE":
1. "Bıçakla kesmek" = резать ножом — araç hâli edatsız kullanılır.
2. "…-in içinde pişirmek" = варить в кастрюле (bulunma hâli).
3. "Ocağın üstünde" = на плите — на edatı yüzeyi anlatır.`,
    words: [
      W('ck30a2k_1', 'Кастрюля', 'Kastryúlya', 'Tencere', 'A2', 'Kaynatma ve haşlama için; сковорода ile karıştırılmamalı.'),
      W('ck30a2k_2', 'Сковорода', 'Skavaradá', 'Tava', 'A2', 'Küçültmesi сковородка günlük dilde daha sıktır.'),
      W('ck30a2k_3', 'Нож', 'Noj', 'Bıçak', 'A2', 'Araç hâli ножом; şef bıçağı шеф-нож.'),
      W('ck30a2k_4', 'Половник', 'Palóvnik', 'Kepçe', 'A2', 'Çorba servisinin aleti; черпак da denir.'),
      W('ck30a2k_5', 'Доска', 'Daská', 'Kesme tahtası', 'A2', 'Разделочная доска tam adıdır.'),
      W('ck30a2k_6', 'Крышка', 'Krışka', 'Kapak', 'A2', 'Под крышкой = kapağı kapalı (pişirme talimatı).')
    ],
    sentences: [
      S('Суп варится в большой кастрюле.', 'Çorba büyük bir tencerede pişiyor.'),
      S('Режьте овощи на доске.', 'Sebzeleri tahtada kesin.'),
      S('Закройте сковороду крышкой.', 'Tavanın kapağını kapatın.')
    ]
  },
  {
    id: 'ck30_a2_spices1', unitNumber: 40.9702, levelGroup: 'A2',
    title: 'Temel Baharatlar', description: 'Tuz, karabiber, defne: ilk baharat rafı',
    category: 'Aşçılık', color: '#b45309', icon: '🧂',
    grammarExplain: `📌 MİKTAR VE TAMLAYAN HÂL:
1. Baharat miktarı tamlayan hâl ister: щепотка соли (bir tutam tuz), ложка перца.
2. "Tatlandırmak" = посолить (tuzlamak), поперчить (biberlemek).
3. "Tadına bakmak" = попробовать на вкус.`,
    words: [
      W('ck30a2s_1', 'Соль', 'Sol', 'Tuz', 'A2', 'Dişildir; Хлеб-соль misafir karşılama geleneğidir.'),
      W('ck30a2s_2', 'Перец', 'Pyérits', 'Biber', 'A2', 'Чёрный перец (karabiber), красный перец (pul biber).'),
      W('ck30a2s_3', 'Лавровый лист', 'Lavróvıy list', 'Defne yaprağı', 'A2', 'Çorbaların vazgeçilmezi; servis öncesi çıkarılır.'),
      W('ck30a2s_4', 'Укроп', 'Ukróp', 'Dereotu', 'A2', 'Rus mutfağının en sevilen yeşilliğidir.'),
      W('ck30a2s_5', 'Щепотка', 'Şşipótka', 'Tutam', 'A2', 'Щепотка соли = bir tutam tuz.'),
      W('ck30a2s_6', 'Приправа', 'Prípráva', 'Baharat / Çeşni', 'A2', 'Genel ad; специя daha teknik sözcüktür.')
    ],
    sentences: [
      S('Добавьте щепотку соли.', 'Bir tutam tuz ekleyin.'),
      S('Я люблю суп с укропом.', 'Dereotlu çorbayı severim.'),
      S('Не забудьте лавровый лист.', 'Defne yaprağını unutmayın.')
    ]
  },
  {
    id: 'ck30_a2_grains', unitNumber: 40.9703, levelGroup: 'A2',
    title: 'Tahıllar ve Bakliyat', description: 'Karabuğday, pirinç, mercimek',
    category: 'Aşçılık', color: '#a16207', icon: '🌾',
    grammarExplain: `📌 ORAN VE ÖLÇÜ:
1. Oran anlatımı: один к двум (bire iki) — pilav suyu ölçüsünde kullanılır.
2. "Yıkamak" = промыть, "ıslatmak" = замочить.
3. Pişirme süresi: варить двадцать минут (yirmi dakika kaynatmak) — belirtme hâli süresi.`,
    words: [
      W('ck30a2g_1', 'Гречка', 'Gryéçka', 'Karabuğday', 'A2', 'Rus mutfağının ulusal tahılı.'),
      W('ck30a2g_2', 'Рис', 'Ris', 'Pirinç', 'A2', 'Плов için длиннозёрный (uzun taneli) tercih edilir.'),
      W('ck30a2g_3', 'Чечевица', 'Çiçivítsa', 'Mercimek', 'A2', 'Türkçedeki gibi kırmızı/yeşil ayrımı vardır.'),
      W('ck30a2g_4', 'Крупа', 'Krupá', 'Bulgur/İrmik türü tane', 'A2', 'Tahıl tanelerinin genel adı.'),
      W('ck30a2g_5', 'Промыть', 'Pramıt', 'Yıkamak (durulamak)', 'A2', 'Промыть рис до прозрачной воды.'),
      W('ck30a2g_6', 'Замочить', 'Zamaçít', 'Islatmak', 'A2', 'Bakliyat için gece boyu уходит на ночь.')
    ],
    sentences: [
      S('Сначала промойте рис холодной водой.', 'Önce pirinci soğuk suyla yıkayın.'),
      S('Гречку варят двадцать минут.', 'Karabuğday yirmi dakika pişirilir.'),
      S('Чечевицу лучше замочить заранее.', 'Mercimeği önceden ıslatmak daha iyi.')
    ]
  },
  {
    id: 'ck30_a2_fats', unitNumber: 40.9704, levelGroup: 'A2',
    title: 'Yağlar ve Sıvılar', description: 'Tereyağı, zeytinyağı, sirke',
    category: 'Aşçılık', color: '#ca8a04', icon: '🫒',
    grammarExplain: `📌 "МАСЛО" ÇOK ANLAMLILIĞI:
1. Сливочное масло = tereyağı, растительное масло = sıvı yağ, оливковое масло = zeytinyağı.
2. Sıfat olmadan масло bağlama göre anlaşılır — yanlış anlama kaynağıdır.
3. "Yağda kızartmak" = жарить на масле (на + bulunma hâli).`,
    words: [
      W('ck30a2f_1', 'Сливочное масло', 'Slívaçnaye másla', 'Tereyağı', 'A2', 'сливки (krema) kelimesinden.'),
      W('ck30a2f_2', 'Растительное масло', 'Rastítilnaye másla', 'Sıvı yağ', 'A2', 'Ayçiçek yağı подсолнечное масло.'),
      W('ck30a2f_3', 'Уксус', 'Úksus', 'Sirke', 'A2', 'Vurgu ilk hecede; turşunun temelidir.'),
      W('ck30a2f_4', 'Сметана', 'Smitána', 'Ekşi krema', 'A2', 'Rus mutfağının imza ürünü; çorbaya kaşıklanır.'),
      W('ck30a2f_5', 'Бульон', 'Bulyón', 'Et suyu', 'A2', 'Fransızcadan; çorbaların temeli.'),
      W('ck30a2f_6', 'Разогреть', 'Razagryét', 'Isıtmak', 'A2', 'Разогреть масло на сковороде.')
    ],
    sentences: [
      S('Разогрейте масло на сковороде.', 'Yağı tavada ısıtın.'),
      S('Добавьте ложку сметаны в суп.', 'Çorbaya bir kaşık ekşi krema ekleyin.'),
      S('Этот салат заправляют уксусом.', 'Bu salata sirkeyle terbiyelenir.')
    ]
  },
  {
    id: 'ck30_a2_dairy', unitNumber: 40.9705, levelGroup: 'A2',
    title: 'Süt Ürünleri', description: 'Tvorog, kefir, peynir',
    category: 'Aşçılık', color: '#f1f5f9', icon: '🥛',
    grammarExplain: `📌 KISMİ TAMLAYAN HÂL:
1. "Biraz süt ver" = Дай молока (tamlayan) ≠ Дай молоко (tamamını).
2. Bu ayrım sıvı ve dökme ürünlerde çok yaygındır.
3. Yüzde anlatımı: творог пять процентов жирности.`,
    words: [
      W('ck30a2d_1', 'Творог', 'Tvórak', 'Lor peyniri', 'A2', 'Vurgu iki türlü de kabul edilir: твóрог / творóг.'),
      W('ck30a2d_2', 'Кефир', 'Kifír', 'Kefir', 'A2', 'Kafkas kökenli fermente süt içeceği.'),
      W('ck30a2d_3', 'Сыр', 'Sır', 'Peynir', 'A2', 'Твёрдый сыр = sert peynir.'),
      W('ck30a2d_4', 'Сливки', 'Slífki', 'Krema', 'A2', 'Daima çoğuldur.'),
      W('ck30a2d_5', 'Жирность', 'Jírnast', 'Yağ oranı', 'A2', 'Ambalajlarda yüzdeyle verilir.'),
      W('ck30a2d_6', 'Взбить', 'Vzbít', 'Çırpmak', 'A2', 'Взбить сливки = krema çırpmak.')
    ],
    sentences: [
      S('Купи, пожалуйста, творог и кефир.', 'Lütfen lor ve kefir al.'),
      S('Взбейте сливки до густоты.', 'Kremayı koyulaşana kadar çırpın.'),
      S('Я предпочитаю сыр с низкой жирностью.', 'Az yağlı peyniri tercih ederim.')
    ]
  },
  {
    id: 'ck30_a2_dough', unitNumber: 40.9706, levelGroup: 'A2',
    title: 'Hamur Malzemeleri', description: 'Un, maya, yumurta',
    category: 'Aşçılık', color: '#fde68a', icon: '🥟',
    grammarExplain: `📌 EMİR KİPİYLE TARİF:
1. Tarifler çoğul emirle yazılır: Смешайте, добавьте, замесите.
2. Kişisiz tarif dili de kullanılır: Муку просеивают, тесто замешивают.
3. "…-e kadar" = до + tamlayan: до однородности (pürüzsüz olana kadar).`,
    words: [
      W('ck30a2dg_1', 'Мука', 'Muká', 'Un', 'A2', 'Vurgu sonda; başta olursa "ıstırap" olur!'),
      W('ck30a2dg_2', 'Дрожжи', 'Dróji', 'Maya', 'A2', 'Daima çoğuldur.'),
      W('ck30a2dg_3', 'Тесто', 'Tyésta', 'Hamur', 'A2', 'Дрожжевое тесто = mayalı hamur.'),
      W('ck30a2dg_4', 'Замесить', 'Zamisít', 'Yoğurmak', 'A2', 'Замесить тесто sabit eşdizimdir.'),
      W('ck30a2dg_5', 'Просеять', 'Prasyéyat', 'Elemek', 'A2', 'Просеять муку через сито.'),
      W('ck30a2dg_6', 'Раскатать', 'Raskatát', 'Açmak (merdaneyle)', 'A2', 'Скалка = oklava.')
    ],
    sentences: [
      S('Просейте муку и добавьте дрожжи.', 'Unu eleyin ve maya ekleyin.'),
      S('Замесите тесто до однородности.', 'Hamuru pürüzsüz olana kadar yoğurun.'),
      S('Раскатайте тесто тонко.', 'Hamuru ince açın.')
    ]
  },
  {
    id: 'ck30_a2_cutting', unitNumber: 40.9707, levelGroup: 'A2',
    title: 'Doğrama Teknikleri', description: 'Küp küp, ince ince, rendele',
    category: 'Aşçılık', color: '#16a34a', icon: '🔪',
    grammarExplain: `📌 BİÇİM ZARFLARI:
1. Doğrama biçimi araç hâliyle: нарезать кубиками (küp küp), соломкой (jülyen), кольцами (halka).
2. Fiil önekleri işi değiştirir: резать (kesmek) → нарезать (doğramak) → порезать (biraz kesmek).
3. "Rendelemek" = натереть на тёрке.`,
    words: [
      W('ck30a2ct_1', 'Нарезать', 'Narizát', 'Doğramak', 'A2', 'Tariflerin en sık fiili.'),
      W('ck30a2ct_2', 'Кубиками', 'Kúbikami', 'Küp küp', 'A2', 'Araç hâli çoğul biçimi.'),
      W('ck30a2ct_3', 'Соломкой', 'Salómkay', 'Jülyen / Çöp şeklinde', 'A2', '"Saman gibi" anlamından gelir.'),
      W('ck30a2ct_4', 'Натереть', 'Natirét', 'Rendelemek', 'A2', 'Тёрка = rende.'),
      W('ck30a2ct_5', 'Очистить', 'Açístit', 'Soymak / Temizlemek', 'A2', 'Очистить картошку = patates soymak.'),
      W('ck30a2ct_6', 'Мелко', 'Myélka', 'İnce ince', 'A2', 'Karşıtı крупно (iri iri).')
    ],
    sentences: [
      S('Нарежьте лук мелко.', 'Soğanı ince ince doğrayın.'),
      S('Морковь натрите на тёрке.', 'Havucu rendeleyin.'),
      S('Картофель очистите и нарежьте кубиками.', 'Patatesi soyup küp küp doğrayın.')
    ]
  },
  {
    id: 'ck30_a2_cookverbs', unitNumber: 40.9708, levelGroup: 'A2',
    title: 'Pişirme Fiilleri', description: 'Kaynat, kızart, fırınla',
    category: 'Aşçılık', color: '#dc2626', icon: '🔥',
    grammarExplain: `📌 PİŞİRME FİİLİ SEÇİMİ:
1. варить = suda kaynatmak, жарить = yağda kızartmak, тушить = ağır ateşte sulu pişirmek, запекать = fırında pişirmek.
2. готовить genel "yemek yapmak"tır; печь ise fırın hamur işi içindir.
3. "…-i pişirmek" belirtme hâli ister: варить картошку.`,
    words: [
      W('ck30a2cv_1', 'Варить', 'Varít', 'Kaynatmak / Haşlamak', 'A2', 'Суп варят, kahve тоже варят.'),
      W('ck30a2cv_2', 'Жарить', 'Járit', 'Kızartmak', 'A2', 'На сильном огне = yüksek ateşte.'),
      W('ck30a2cv_3', 'Тушить', 'Tuşít', 'Ağır ateşte pişirmek', 'A2', 'Aynı kelime "söndürmek" demektir!'),
      W('ck30a2cv_4', 'Запекать', 'Zapikát', 'Fırınlamak', 'A2', 'Запечь в духовке.'),
      W('ck30a2cv_5', 'Кипеть', 'Kipyét', 'Kaynamak', 'A2', 'Довести до кипения = kaynama noktasına getirmek.'),
      W('ck30a2cv_6', 'Помешивать', 'Pamyéşivat', 'Ara ara karıştırmak', 'A2', 'Постоянно помешивая = sürekli karıştırarak.')
    ],
    sentences: [
      S('Доведите воду до кипения.', 'Suyu kaynama noktasına getirin.'),
      S('Жарьте мясо пять минут с каждой стороны.', 'Eti her iki tarafta beşer dakika kızartın.'),
      S('Тушите овощи под крышкой.', 'Sebzeleri kapağı kapalı ağır ateşte pişirin.')
    ]
  },
  {
    id: 'ck30_a2_stove', unitNumber: 40.9709, levelGroup: 'A2',
    title: 'Ocak, Fırın ve Ateş', description: 'Isı ayarı ve pişirme süresi',
    category: 'Aşçılık', color: '#f97316', icon: '🔆',
    grammarExplain: `📌 ISI VE SÜRE:
1. Ateş derecesi: на слабом / среднем / сильном огне.
2. Fırın: разогреть духовку до 180 градусов (180 dereceye ısıtmak) — до + tamlayan.
3. Süre: на пятнадцать минут (on beş dakikalığına) ≠ пятнадцать минут (on beş dakika boyunca).`,
    words: [
      W('ck30a2st_1', 'Плита', 'Plitá', 'Ocak', 'A2', 'Газовая плита = gazlı ocak.'),
      W('ck30a2st_2', 'Духовка', 'Duhófka', 'Fırın', 'A2', 'Sanayi tipi fırın печь\'tir.'),
      W('ck30a2st_3', 'Огонь', 'Agón', 'Ateş / Isı', 'A2', 'На медленном огне = kısık ateşte.'),
      W('ck30a2st_4', 'Градус', 'Grádus', 'Derece', 'A2', '180 градусов = 180 derece.'),
      W('ck30a2st_5', 'Противень', 'Prótivin', 'Fırın tepsisi', 'A2', 'Kural dışı çekimli eril isim.'),
      W('ck30a2st_6', 'Подгореть', 'Padgarét', 'Dibi tutmak / Yanmak', 'A2', 'Суп подгорел = çorbanın dibi tuttu.')
    ],
    sentences: [
      S('Разогрейте духовку до ста восьмидесяти градусов.', 'Fırını yüz seksen dereceye ısıtın.'),
      S('Готовьте на медленном огне.', 'Kısık ateşte pişirin.'),
      S('Осторожно, мясо может подгореть.', 'Dikkat, et yanabilir.')
    ]
  },
  {
    id: 'ck30_a2_table', unitNumber: 40.971, levelGroup: 'A2',
    title: 'Sofra Takımı ve Servis', description: 'Tabak, çatal, servis kalıpları',
    category: 'Aşçılık', color: '#0ea5e9', icon: '🍽️',
    grammarExplain: `📌 SERVİS DİLİ:
1. "Sofra kurmak" = накрыть на стол.
2. "…-le birlikte servis etmek" = подавать с + araç hâli: подавать с зеленью.
3. Sıcak/soğuk servis: подавать горячим / холодным — araç hâli sıfatı kullanılır.`,
    words: [
      W('ck30a2tb_1', 'Тарелка', 'Taryélka', 'Tabak', 'A2', 'Глубокая тарелка = çorba tabağı.'),
      W('ck30a2tb_2', 'Вилка', 'Vílka', 'Çatal', 'A2', 'Aynı kelime elektrik fişi demektir.'),
      W('ck30a2tb_3', 'Ложка', 'Lóşka', 'Kaşık', 'A2', 'Столовая ложка = yemek kaşığı (ölçü birimi).'),
      W('ck30a2tb_4', 'Салфетка', 'Salfyétka', 'Peçete', 'A2', 'Sofra düzeninin parçası.'),
      W('ck30a2tb_5', 'Накрыть на стол', 'Nakrıt na stol', 'Sofra kurmak', 'A2', 'Sabit deyimsel kalıp.'),
      W('ck30a2tb_6', 'Подавать', 'Padavát', 'Servis etmek', 'A2', 'Подаётся горячим = sıcak servis edilir.')
    ],
    sentences: [
      S('Помоги мне накрыть на стол.', 'Sofra kurmama yardım et.'),
      S('Это блюдо подают горячим.', 'Bu yemek sıcak servis edilir.'),
      S('Положи вилки слева от тарелки.', 'Çatalları tabağın soluna koy.')
    ]
  }
];

export const COOKING30_B1: UnitModule[] = [
  {
    id: 'ck30_b1_spices2', unitNumber: 95.9701, levelGroup: 'B1',
    title: 'Dünya Baharatları', description: 'Kimyon, zerdeçal, safran',
    category: 'Aşçılık', color: '#d97706', icon: '🌶️',
    grammarExplain: `📌 TAT TARİFİ:
1. Tat sıfatları: острый (acı/keskin), пряный (baharatlı), терпкий (buruk), пикантный (hafif acımsı).
2. "…-e tat katmak" = придавать вкус + yönelme hâli.
3. Karşılaştırma: острее, чем… (…-den daha acı).`,
    words: [
      W('ck30b1s2_1', 'Зира', 'Zirá', 'Kimyon (kimyon tohumu)', 'B1', 'Orta Asya pilavının imza baharatı; тмин ile karıştırılmamalı.'),
      W('ck30b1s2_2', 'Куркума', 'Kurkumá', 'Zerdeçal', 'B1', 'Renk verici olarak da kullanılır.'),
      W('ck30b1s2_3', 'Шафран', 'Şafrán', 'Safran', 'B1', 'Dünyanın en pahalı baharatı.'),
      W('ck30b1s2_4', 'Корица', 'Karítsa', 'Tarçın', 'B1', 'Tatlı ve hamur işlerinde yaygın.'),
      W('ck30b1s2_5', 'Пряный', 'Pryánıy', 'Baharatlı', 'B1', 'острый (acı) ile aynı şey değildir.'),
      W('ck30b1s2_6', 'Придавать вкус', 'Pridavát fkus', 'Tat katmak', 'B1', 'Yönelme hâli ister: придаёт вкус блюду.')
    ],
    sentences: [
      S('Зира придаёт плову особый вкус.', 'Kimyon pilava özel bir tat katar.'),
      S('Это блюдо получилось слишком острым.', 'Bu yemek fazla acı oldu.'),
      S('Шафран нужно добавлять совсем чуть-чуть.', 'Safranı çok az eklemek gerekir.')
    ]
  },
  {
    id: 'ck30_b1_soups', unitNumber: 95.9702, levelGroup: 'B1',
    title: 'Çorba Ustalığı', description: 'Borş, şçi, solyanka',
    category: 'Aşçılık', color: '#b91c1c', icon: '🥣',
    grammarExplain: `📌 TARİF SIRALAMASI:
1. Sıra bağlaçları: сначала, затем, после этого, в конце.
2. Süreç edilgenle anlatılır: бульон варится два часа.
3. Sonuç: чтобы бульон был прозрачным (suyun berrak olması için) — чтобы + geçmiş/mastar.`,
    words: [
      W('ck30b1sp_1', 'Борщ', 'Borşş', 'Borş', 'B1', 'Pancarla yapılan kırmızı çorba; ekşi kremayla servis edilir.'),
      W('ck30b1sp_2', 'Щи', 'Şşi', 'Lahana çorbası', 'B1', 'Rusya\'nın en eski çorbası; daima çoğuldur.'),
      W('ck30b1sp_3', 'Солянка', 'Salyánka', 'Solyanka', 'B1', 'Ekşi, tuzlu, zeytinli karışık çorba.'),
      W('ck30b1sp_4', 'Зажарка', 'Zajárka', 'Kavurma sosu (soğan-havuç)', 'B1', 'Çorbanın lezzet temeli.'),
      W('ck30b1sp_5', 'Прозрачный', 'Prazráçnıy', 'Berrak', 'B1', 'İyi et suyunun ölçütü.'),
      W('ck30b1sp_6', 'Снять пену', 'Snyat pyénu', 'Köpüğünü almak', 'B1', 'Et suyunda ilk işlem.')
    ],
    sentences: [
      S('Сначала сварите бульон и снимите пену.', 'Önce et suyunu kaynatın ve köpüğünü alın.'),
      S('Затем добавьте зажарку из лука и моркови.', 'Sonra soğan ve havuç kavurmasını ekleyin.'),
      S('Борщ подают со сметаной.', 'Borş ekşi kremayla servis edilir.')
    ]
  },
  {
    id: 'ck30_b1_marinade', unitNumber: 95.9703, levelGroup: 'B1',
    title: 'Marinasyon', description: 'Eti terbiye et, yumuşat',
    category: 'Aşçılık', color: '#7c2d12', icon: '🥩',
    grammarExplain: `📌 SÜRE VE AMAÇ:
1. Bekletme süresi: на два часа / на ночь (iki saatliğine / bütün gece).
2. Amaç: чтобы мясо стало мягким (etin yumuşaması için).
3. Koşul: если мариновать дольше, вкус будет насыщеннее.`,
    words: [
      W('ck30b1mr_1', 'Маринад', 'Marinát', 'Marinat / Terbiye', 'B1', 'Asit + yağ + baharat üçlüsüdür.'),
      W('ck30b1mr_2', 'Мариновать', 'Marinavát', 'Terbiye etmek', 'B1', 'Замариновать = tamamlanmış biçimi.'),
      W('ck30b1mr_3', 'Размягчить', 'Razmihçít', 'Yumuşatmak', 'B1', 'Et liflerini gevşetmek.'),
      W('ck30b1mr_4', 'Кислота', 'Kislatá', 'Asit / Ekşilik', 'B1', 'Limon ve sirke kaynaklıdır.'),
      W('ck30b1mr_5', 'Насыщенный', 'Nasışşinnıy', 'Yoğun (tat)', 'B1', 'Насыщенный вкус = dolgun lezzet.'),
      W('ck30b1mr_6', 'Выдержать', 'Vídirjat', 'Dinlendirmek', 'B1', 'Выдержать в холодильнике.')
    ],
    sentences: [
      S('Замаринуйте мясо на ночь.', 'Eti bütün gece terbiye edin.'),
      S('Кислота помогает размягчить волокна.', 'Asit lifleri yumuşatmaya yardım eder.'),
      S('Чем дольше маринуется, тем насыщеннее вкус.', 'Ne kadar uzun terbiye olursa tat o kadar yoğun olur.')
    ]
  },
  {
    id: 'ck30_b1_sauces', unitNumber: 95.9704, levelGroup: 'B1',
    title: 'Sos Yapımı', description: 'Beşamel, meyve sosu, kıvam',
    category: 'Aşçılık', color: '#f59e0b', icon: '🥄',
    grammarExplain: `📌 KIVAM DİLİ:
1. Kıvam sıfatları: густой (koyu), жидкий (sulu), однородный (pürüzsüz).
2. "…-e kadar pişirmek" = варить до загустения.
3. Uyarı kalıbı: чтобы не образовались комочки (topaklanmaması için).`,
    words: [
      W('ck30b1sa_1', 'Соус', 'Sóus', 'Sos', 'B1', 'Подлива günlük dildeki karşılığıdır.'),
      W('ck30b1sa_2', 'Загустеть', 'Zagustyét', 'Koyulaşmak', 'B1', 'Загуститель = kıvam artırıcı.'),
      W('ck30b1sa_3', 'Комочки', 'Kamóçki', 'Topaklar', 'B1', 'Sos yapımının baş düşmanı.'),
      W('ck30b1sa_4', 'Однородный', 'Adnaródnıy', 'Homojen / Pürüzsüz', 'B1', 'До однородной массы = pürüzsüz kıvama gelene dek.'),
      W('ck30b1sa_5', 'Процедить', 'Pratsidít', 'Süzmek', 'B1', 'Сито (süzgeç) ile yapılır.'),
      W('ck30b1sa_6', 'Уварить', 'Uvarít', 'Kaynatarak azaltmak', 'B1', 'Уварить вдвое = yarıya indirmek.')
    ],
    sentences: [
      S('Мешайте постоянно, чтобы не было комочков.', 'Topak olmasın diye sürekli karıştırın.'),
      S('Уварите соус вдвое.', 'Sosu yarıya kadar kaynatın.'),
      S('Процедите соус через сито.', 'Sosu süzgeçten geçirin.')
    ]
  },
  {
    id: 'ck30_b1_baking', unitNumber: 95.9705, levelGroup: 'B1',
    title: 'Ekmek ve Fırıncılık', description: 'Mayalanma, yoğurma, pişirme',
    category: 'Aşçılık', color: '#a16207', icon: '🍞',
    grammarExplain: `📌 SÜREÇ FİİLLERİ:
1. Dönüşlü süreç: тесто поднимается (hamur kabarıyor), тесто подошло (hamur mayalandı).
2. Zaman koşulu: пока тесто подходит… (hamur mayalanırken…).
3. Sonuç kontrolü: проверить на готовность зубочисткой (kürdanla pişme testi).`,
    words: [
      W('ck30b1bk_1', 'Подойти (о тесте)', 'Padaytí', 'Mayalanıp kabarmak', 'B1', 'Тесто подошло = hamur hazır.'),
      W('ck30b1bk_2', 'Опара', 'Apára', 'Ön maya / Poolish', 'B1', 'Geleneksel Rus ekmeğinin ilk aşaması.'),
      W('ck30b1bk_3', 'Корочка', 'Kóraçka', 'Kabuk', 'B1', 'Хрустящая корочка = çıtır kabuk.'),
      W('ck30b1bk_4', 'Расстойка', 'Rasstóyka', 'Son fermantasyon', 'B1', 'Profesyonel fırıncılık terimi.'),
      W('ck30b1bk_5', 'Смазать', 'Smázat', 'Yağlamak / Sürmek', 'B1', 'Смазать яйцом = yumurta sürmek.'),
      W('ck30b1bk_6', 'Остудить', 'Astudít', 'Soğutmak', 'B1', 'Ekmek soğumadan kesilmez.')
    ],
    sentences: [
      S('Пока тесто подходит, разогрейте духовку.', 'Hamur mayalanırken fırını ısıtın.'),
      S('Смажьте верх яйцом для золотистой корочки.', 'Altın rengi kabuk için üstüne yumurta sürün.'),
      S('Готовый хлеб нужно остудить на решётке.', 'Pişen ekmek tel ızgarada soğutulmalı.')
    ]
  },
  {
    id: 'ck30_b1_frying', unitNumber: 95.9706, levelGroup: 'B1',
    title: 'Kızartma Teknikleri', description: 'Derin yağ, sote, mühürleme',
    category: 'Aşçılık', color: '#ea580c', icon: '🍟',
    grammarExplain: `📌 TEKNİK ANLATIMI:
1. Araçsız araç hâli: обжарить на сильном огне.
2. Sonuç sıfatı: до золотистого цвета (altın rengi olana kadar).
3. Uyarı: не перегружайте сковороду (tavayı doldurmayın) — olumsuz emir bitmemiş fiille.`,
    words: [
      W('ck30b1fr_1', 'Обжарить', 'Abjárit', 'Mühürlemek / Kızartmak', 'B1', 'Kısa süreli yüksek ısı.'),
      W('ck30b1fr_2', 'Во фритюре', 'Va frityúre', 'Derin yağda', 'B1', 'Fransızcadan gelen teknik terim.'),
      W('ck30b1fr_3', 'Панировка', 'Panirófka', 'Panelemek / Galeta', 'B1', 'Сухари (galeta unu) kullanılır.'),
      W('ck30b1fr_4', 'Золотистый', 'Zalatístıy', 'Altın renkli', 'B1', 'Kızartmanın standart hedef rengi.'),
      W('ck30b1fr_5', 'Излишки жира', 'İzlíşki jíra', 'Fazla yağ', 'B1', 'Убрать излишки жира бумажным полотенцем.'),
      W('ck30b1fr_6', 'Перегружать', 'Pirigruját', 'Fazla doldurmak', 'B1', 'Tava kalabalıklaşırsa buğulama olur.')
    ],
    sentences: [
      S('Обжарьте мясо до золотистого цвета.', 'Eti altın rengi olana kadar kızartın.'),
      S('Не перегружайте сковороду.', 'Tavayı fazla doldurmayın.'),
      S('Уберите излишки жира бумажным полотенцем.', 'Fazla yağı kâğıt havluyla alın.')
    ]
  },
  {
    id: 'ck30_b1_meatcuts', unitNumber: 95.9707, levelGroup: 'B1',
    title: 'Et Parçaları', description: 'Bonfile, kaburga, kıyma',
    category: 'Aşçılık', color: '#9f1239', icon: '🥓',
    grammarExplain: `📌 MALZEME SEÇİMİ:
1. Amaç bildirme: для супа лучше взять… (çorba için … almak daha iyi).
2. Karşılaştırma: жёстче / мягче, жирнее / постнее.
3. Tavsiye kalıbı: стоит выбрать (seçmekte fayda var).`,
    words: [
      W('ck30b1mc_1', 'Вырезка', 'Vírizka', 'Bonfile', 'B1', 'En yumuşak parça; hızlı pişer.'),
      W('ck30b1mc_2', 'Рёбрышки', 'Ryóbrışki', 'Kaburga', 'B1', 'Küçültme biçimi yemek adı olmuştur.'),
      W('ck30b1mc_3', 'Фарш', 'Farş', 'Kıyma', 'B1', 'Котлеты ve пельмени için temel malzeme.'),
      W('ck30b1mc_4', 'Голень', 'Gólin', 'İncik / But', 'B1', 'Uzun pişirme gerektirir.'),
      W('ck30b1mc_5', 'Постный', 'Pósnıy', 'Yağsız / Yağsız perhize uygun', 'B1', 'Dinî perhiz anlamı da vardır.'),
      W('ck30b1mc_6', 'Жёсткий', 'Jóstkiy', 'Sert / Sıkı', 'B1', 'Karşıtı мягкий; et kalitesinin ölçütü.')
    ],
    sentences: [
      S('Для супа лучше взять мясо на кости.', 'Çorba için kemikli et almak daha iyi.'),
      S('Вырезка мягче, но дороже.', 'Bonfile daha yumuşak ama daha pahalı.'),
      S('Из фарша мы сделаем котлеты.', 'Kıymadan köfte yapacağız.')
    ]
  },
  {
    id: 'ck30_b1_fish', unitNumber: 95.9708, levelGroup: 'B1',
    title: 'Balık Hazırlığı', description: 'Temizleme, fileto, tuzlama',
    category: 'Aşçılık', color: '#0891b2', icon: '🐟',
    grammarExplain: `📌 SIRALI İŞLEMLER:
1. Ulaçla bağlama: почистив рыбу, промойте её (balığı temizleyip yıkayın).
2. Malzeme + araç: натереть солью (tuzla ovmak).
3. Zaman: за час до подачи (servisten bir saat önce).`,
    words: [
      W('ck30b1fi_1', 'Чешуя', 'Çişuyá', 'Pul', 'B1', 'Почистить от чешуи = pullarını temizlemek.'),
      W('ck30b1fi_2', 'Филе', 'Filé', 'Fileto', 'B1', 'Çekimsizdir, nötr cinstir.'),
      W('ck30b1fi_3', 'Потрошить', 'Patraşít', 'İç organlarını çıkarmak', 'B1', 'Tamamlanmışı выпотрошить.'),
      W('ck30b1fi_4', 'Засолка', 'Zasólka', 'Tuzlama', 'B1', 'Kırmızı balık için klasik yöntem.'),
      W('ck30b1fi_5', 'Костлявый', 'Kastlyávıy', 'Kılçıklı', 'B1', 'Судак az kılçıklı sayılır.'),
      W('ck30b1fi_6', 'Свежесть', 'Svyéjist', 'Tazelik', 'B1', 'Проверить свежесть по глазам и жабрам.')
    ],
    sentences: [
      S('Почистив рыбу, тщательно промойте её.', 'Balığı temizledikten sonra iyice yıkayın.'),
      S('Натрите филе солью и оставьте на час.', 'Filetoyu tuzla ovun ve bir saat bekletin.'),
      S('Свежесть рыбы видна по глазам.', 'Balığın tazeliği gözlerinden anlaşılır.')
    ]
  },
  {
    id: 'ck30_b1_preserve', unitNumber: 95.9709, levelGroup: 'B1',
    title: 'Turşu ve Konserve', description: 'Kışlık hazırlıklar (заготовки)',
    category: 'Aşçılık', color: '#4d7c0f', icon: '🫙',
    grammarExplain: `📌 KORUMA YÖNTEMLERİ DİLİ:
1. Yöntem adları araç hâliyle: консервировать способом стерилизации.
2. Süreç: банки стерилизуют, крышки закатывают.
3. Saklama koşulu: хранить в прохладном тёмном месте.`,
    words: [
      W('ck30b1pv_1', 'Заготовки', 'Zagatófki', 'Kışlık hazırlıklar', 'B1', 'Rus ev kültürünün önemli parçası.'),
      W('ck30b1pv_2', 'Банка', 'Bánka', 'Kavanoz', 'B1', 'Aynı kelime "banka" da demektir — bağlama dikkat.'),
      W('ck30b1pv_3', 'Стерилизовать', 'Stirilizavát', 'Sterilize etmek', 'B1', 'Kavanozlar buharla sterilize edilir.'),
      W('ck30b1pv_4', 'Закатать', 'Zakatát', 'Kapağını kapatmak (konserve)', 'B1', 'Закаточная машинка ile yapılır.'),
      W('ck30b1pv_5', 'Рассол', 'Rassól', 'Salamura suyu', 'B1', 'Ünlü bir akşamdan kalma ilacı sayılır.'),
      W('ck30b1pv_6', 'Квашеная капуста', 'Kváşinaya kapústa', 'Lahana turşusu', 'B1', 'Fermantasyonla yapılır, sirkesizdir.')
    ],
    sentences: [
      S('Банки нужно стерилизовать перед закаткой.', 'Kavanozlar kapatmadan önce sterilize edilmeli.'),
      S('Квашеную капусту готовят без уксуса.', 'Lahana turşusu sirkesiz yapılır.'),
      S('Храните заготовки в прохладном месте.', 'Kışlıkları serin bir yerde saklayın.')
    ]
  },
  {
    id: 'ck30_b1_hygiene', unitNumber: 95.971, levelGroup: 'B1',
    title: 'Mutfak Hijyeni ve Güvenlik', description: 'Çapraz bulaşma, saklama sıcaklığı',
    category: 'Aşçılık', color: '#0d9488', icon: '🧼',
    grammarExplain: `📌 KURAL VE YASAK DİLİ:
1. Zorunluluk: необходимо + mastar (… gerekir), запрещается + mastar (yasaktır).
2. Uyarı: во избежание + tamlayan (…-i önlemek için).
3. Talimat metinleri kişisiz kurulur: продукты хранятся при температуре +4°C.`,
    words: [
      W('ck30b1hy_1', 'Гигиена', 'Gigiyéna', 'Hijyen', 'B1', 'Личная гигиена персонала.'),
      W('ck30b1hy_2', 'Срок годности', 'Srok gódnasti', 'Son kullanma tarihi', 'B1', 'Ambalajın zorunlu bilgisi.'),
      W('ck30b1hy_3', 'Заражение', 'Zarajéniye', 'Bulaşma', 'B1', 'Перекрёстное заражение = çapraz bulaşma.'),
      W('ck30b1hy_4', 'Разделочная доска', 'Razdyélaçnaya daská', 'Kesme tahtası', 'B1', 'Et ve sebze için ayrı olmalı.'),
      W('ck30b1hy_5', 'Размораживать', 'Razmarájivat', 'Buzunu çözmek', 'B1', 'Oda sıcaklığında çözdürmek risklidir.'),
      W('ck30b1hy_6', 'Соблюдать', 'Sablyudát', 'Uymak (kurala)', 'B1', 'Соблюдать правила гигиены.')
    ],
    sentences: [
      S('Необходимо соблюдать правила гигиены.', 'Hijyen kurallarına uymak gerekir.'),
      S('Используйте разные доски для мяса и овощей.', 'Et ve sebze için farklı tahtalar kullanın.'),
      S('Проверяйте срок годности продуктов.', 'Ürünlerin son kullanma tarihini kontrol edin.')
    ]
  }
];

export const COOKING30_B2: UnitModule[] = [
  {
    id: 'ck30_b2_brigade', unitNumber: 143.9701, levelGroup: 'B2',
    title: 'Profesyonel Mutfak Ekibi', description: 'Brigade sistemi ve servis akışı',
    category: 'Aşçılık', color: '#334155', icon: '👨‍🍳',
    grammarExplain: `📌 MUTFAK KOMUTA DİLİ:
1. Kısa emir kipi hâkimdir: Отдаём! (Servise!) Принял! (Anlaşıldı!)
2. Sorumluluk: отвечать за + belirtme hâli (…-den sorumlu olmak).
3. Zaman baskısı dili: в темпе, без задержек, на подаче.`,
    words: [
      W('ck30b2br_1', 'Шеф-повар', 'Şef-póvar', 'Şef', 'B2', 'Sous-chef = су-шеф.'),
      W('ck30b2br_2', 'Заготовка', 'Zagatófka', 'Ön hazırlık (mise en place)', 'B2', 'Profesyonel mutfağın belkemiği.'),
      W('ck30b2br_3', 'Подача', 'Padáça', 'Servis / Tabaklama', 'B2', 'На подаче = servis noktasında.'),
      W('ck30b2br_4', 'Смена', 'Smyéna', 'Vardiya', 'B2', 'Ночная смена = gece vardiyası.'),
      W('ck30b2br_5', 'Списание', 'Spisániye', 'Zayi kaydı', 'B2', 'Maliyet kontrolünün parçası.'),
      W('ck30b2br_6', 'Отвечать за', 'Atviçát za', '…-den sorumlu olmak', 'B2', 'Belirtme hâli ister.')
    ],
    sentences: [
      S('Су-шеф отвечает за заготовки.', 'Sous-chef ön hazırlıklardan sorumludur.'),
      S('Блюдо должно быть готово к подаче через пять минут.', 'Yemek beş dakika içinde servise hazır olmalı.'),
      S('Все списания фиксируются в журнале.', 'Bütün zayiler deftere kaydedilir.')
    ]
  },
  {
    id: 'ck30_b2_menu', unitNumber: 143.9702, levelGroup: 'B2',
    title: 'Menü Tasarımı ve Maliyet', description: 'Porsiyon, foodcost, fiyatlama',
    category: 'Aşçılık', color: '#047857', icon: '📋',
    grammarExplain: `📌 SAYISAL ANALİZ DİLİ:
1. Yüzde: себестоимость составляет 30% от цены.
2. Artış/azalış: снизить себестоимость на 5 процентов.
3. Amaç cümlesi: чтобы сохранить маржу (marjı korumak için).`,
    words: [
      W('ck30b2mn_1', 'Себестоимость', 'Sibistóimast', 'Maliyet', 'B2', 'Foodcost hesabının temeli.'),
      W('ck30b2mn_2', 'Наценка', 'Natsénka', 'Kâr marjı / Fiyat farkı', 'B2', 'Restoranlarda 3-4 kat olabilir.'),
      W('ck30b2mn_3', 'Порционирование', 'Partsianíravaniye', 'Porsiyonlama', 'B2', 'Standartlaşmanın anahtarı.'),
      W('ck30b2mn_4', 'Технологическая карта', 'Tihnalagíçiskaya kárta', 'Reçete kartı', 'B2', 'Rusya\'da resmî olarak zorunludur.'),
      W('ck30b2mn_5', 'Выход блюда', 'Vıhat blyúda', 'Porsiyon gramajı', 'B2', 'Menülerde gram olarak yazılır.'),
      W('ck30b2mn_6', 'Рентабельность', 'Rintábilnast', 'Kârlılık', 'B2', 'İşletme analizinin ölçütü.')
    ],
    sentences: [
      S('Себестоимость блюда составляет тридцать процентов от цены.', 'Yemeğin maliyeti fiyatın yüzde otuzudur.'),
      S('Выход блюда указан в технологической карте.', 'Porsiyon gramajı reçete kartında belirtilmiştir.'),
      S('Нам нужно повысить рентабельность меню.', 'Menünün kârlılığını artırmamız gerekiyor.')
    ]
  },
  {
    id: 'ck30_b2_pastry', unitNumber: 143.9703, levelGroup: 'B2',
    title: 'İleri Pastacılık', description: 'Temperleme, krema, dekor',
    category: 'Aşçılık', color: '#be185d', icon: '🍰',
    grammarExplain: `📌 HASSAS TEKNİK DİLİ:
1. Sıcaklık aralığı: при температуре от 31 до 32 градусов.
2. Koşullu uyarı: если перегреть шоколад, он свернётся.
3. Edilgen talimat: масса взбивается до устойчивых пиков.`,
    words: [
      W('ck30b2ps_1', 'Темперирование', 'Tempiríravaniye', 'Temperleme', 'B2', 'Çikolatanın kristal yapısını ayarlama.'),
      W('ck30b2ps_2', 'Меренга', 'Miryénga', 'Beze', 'B2', 'İtalyan, İsviçre ve Fransız tipleri vardır.'),
      W('ck30b2ps_3', 'Устойчивые пики', 'Ustóyçivıye píki', 'Sert tepe (çırpma kıvamı)', 'B2', 'Beze kıvamının standardı.'),
      W('ck30b2ps_4', 'Ганаш', 'Ganáş', 'Ganaj', 'B2', 'Krema ve çikolatanın emülsiyonu.'),
      W('ck30b2ps_5', 'Свернуться', 'Svirnútsa', 'Kesilmek (krema)', 'B2', 'Aşırı ısı ya da asitten olur.'),
      W('ck30b2ps_6', 'Глазурь', 'Glazúr', 'Glazür / Sır', 'B2', 'Зеркальная глазурь = ayna glazür.')
    ],
    sentences: [
      S('Если перегреть шоколад, он свернётся.', 'Çikolata aşırı ısınırsa kesilir.'),
      S('Взбивайте массу до устойчивых пиков.', 'Karışımı sert tepe kıvamına gelene dek çırpın.'),
      S('Темперирование проводят при 31–32 градусах.', 'Temperleme 31-32 derecede yapılır.')
    ]
  },
  {
    id: 'ck30_b2_ferment', unitNumber: 143.9704, levelGroup: 'B2',
    title: 'Fermantasyon', description: 'Ekşi maya, koji, kombucha',
    category: 'Aşçılık', color: '#65a30d', icon: '🦠',
    grammarExplain: `📌 SÜREÇ VE KOŞUL:
1. Koşul zinciri: при температуре 25 градусов процесс идёт быстрее.
2. Süreç fiilleri -ся ile: бродить, окисляться, развиваться.
3. Zaman aralığı: от трёх до пяти суток (üç ila beş gün).`,
    words: [
      W('ck30b2fm_1', 'Брожение', 'Brajéniye', 'Fermantasyon', 'B2', 'Ферментация terimi de kullanılır.'),
      W('ck30b2fm_2', 'Закваска', 'Zakváska', 'Ekşi maya', 'B2', 'Un ve suyla beslenerek yaşatılır.'),
      W('ck30b2fm_3', 'Кислотность', 'Kislátnast', 'Asitlik (pH)', 'B2', 'Fermantasyon kontrolünün ölçütü.'),
      W('ck30b2fm_4', 'Бактерии', 'Baktyérii', 'Bakteriler', 'B2', 'Полезные бактерии = faydalı bakteriler.'),
      W('ck30b2fm_5', 'Сутки', 'Sútki', '24 saat / Gün', 'B2', 'Daima çoğuldur; tarifin standart birimi.'),
      W('ck30b2fm_6', 'Плесень', 'Plyésin', 'Küf', 'B2', 'Благородная плесень = asil küf (peynirde).')
    ],
    sentences: [
      S('Закваску нужно кормить каждые сутки.', 'Ekşi mayayı her gün beslemek gerekir.'),
      S('При высокой температуре брожение идёт быстрее.', 'Yüksek sıcaklıkta fermantasyon daha hızlı ilerler.'),
      S('Следите за кислотностью продукта.', 'Ürünün asitliğini takip edin.')
    ]
  },
  {
    id: 'ck30_b2_equipment', unitNumber: 143.9705, levelGroup: 'B2',
    title: 'Profesyonel Ekipman', description: 'Sous-vide, blast chiller, konveksiyon',
    category: 'Aşçılık', color: '#1e40af', icon: '⚙️',
    grammarExplain: `📌 TEKNİK KILAVUZ DİLİ:
1. Kullanım talimatı mastarla: установить температуру, выставить таймер.
2. Amaç: для равномерного прогрева (eşit ısınma için).
3. Şart: при условии соблюдения инструкции.`,
    words: [
      W('ck30b2eq_1', 'Пароконвектомат', 'Parakanviktamát', 'Kombi fırın', 'B2', 'Profesyonel mutfağın merkez cihazı.'),
      W('ck30b2eq_2', 'Су-вид', 'Su-vít', 'Sous-vide', 'B2', 'Vakumlu düşük sıcaklık pişirme.'),
      W('ck30b2eq_3', 'Шокер', 'Şókir', 'Şok soğutucu', 'B2', 'Шоковая заморозка = şok dondurma.'),
      W('ck30b2eq_4', 'Равномерный', 'Ravnamyérnıy', 'Eşit / Düzgün', 'B2', 'Равномерный прогрев.'),
      W('ck30b2eq_5', 'Вакууматор', 'Vakuumátar', 'Vakum makinesi', 'B2', 'Sous-vide\'in ön koşulu.'),
      W('ck30b2eq_6', 'Настроить', 'Nastróit', 'Ayarlamak', 'B2', 'Настроить температуру и время.')
    ],
    sentences: [
      S('Настройте су-вид на пятьдесят восемь градусов.', 'Sous-vide\'i elli sekiz dereceye ayarlayın.'),
      S('Пароконвектомат обеспечивает равномерный прогрев.', 'Kombi fırın eşit ısınma sağlar.'),
      S('После приготовления используйте шоковую заморозку.', 'Pişirmeden sonra şok dondurma uygulayın.')
    ]
  }
];

export const COOKING30_C1: UnitModule[] = [
  {
    id: 'ck30_c1_tasting', unitNumber: 180.9701, levelGroup: 'C1/C2',
    title: 'Degüstasyon Dili', description: 'Tadı profesyonelce tarif et',
    category: 'Aşçılık', color: '#7e22ce', icon: '👅',
    grammarExplain: `📌 ДЕГУСТАЦИОННЫЙ ЯЗЫК:
1. Katmanlı tarif: во вкусе читаются ноты… (tatta … notaları okunuyor).
2. Zaman boyutu: долгое послевкусие (uzun bir bitiş).
3. Derecelendirme: сбалансированный, плоский, перегруженный.`,
    words: [
      W('ck30c1ts_1', 'Послевкусие', 'Paslifkúsiye', 'Bitiş / Ağızda kalan tat', 'C1/C2', 'Degüstasyonun ana ölçütü.'),
      W('ck30c1ts_2', 'Сбалансированный', 'Sbalansíravannıy', 'Dengeli', 'C1/C2', 'En yüksek övgü sıfatlarından.'),
      W('ck30c1ts_3', 'Нота', 'Nóta', 'Nota (aroma)', 'C1/C2', 'Цитрусовые ноты = turunçgil notaları.'),
      W('ck30c1ts_4', 'Текстура', 'Tikstúra', 'Doku', 'C1/C2', 'Ağızdaki his; консистенция ile yakın.'),
      W('ck30c1ts_5', 'Умами', 'Umámi', 'Umami', 'C1/C2', 'Beşinci temel tat.'),
      W('ck30c1ts_6', 'Перегруженный', 'Pirigrújinnıy', 'Fazla yüklü', 'C1/C2', 'Baharat fazlalığı eleştirisi.')
    ],
    sentences: [
      S('Во вкусе читаются лёгкие цитрусовые ноты.', 'Tatta hafif turunçgil notaları okunuyor.'),
      S('Блюдо сбалансировано, но послевкусие короткое.', 'Yemek dengeli ama bitişi kısa.'),
      S('Соус показался мне перегруженным специями.', 'Sos bana baharat açısından fazla yüklü geldi.')
    ]
  },
  {
    id: 'ck30_c1_gastronomy', unitNumber: 180.9702, levelGroup: 'C1/C2',
    title: 'Gastronomi Kuramı', description: 'Terroir, otantiklik, mutfak kimliği',
    category: 'Aşçılık', color: '#0f172a', icon: '🌍',
    grammarExplain: `📌 KURAMSAL TARTIŞMA:
1. Tanım verme: под аутентичностью понимается…
2. Karşıtlık: в отличие от … (…-den farklı olarak), tamlayan hâl ister.
3. Değerlendirme yumuşatma: можно говорить о тенденции к…`,
    words: [
      W('ck30c1gs_1', 'Аутентичность', 'Autintíçnast', 'Otantiklik', 'C1/C2', 'Gastronomi tartışmalarının anahtar kavramı.'),
      W('ck30c1gs_2', 'Терруар', 'Tirruár', 'Terroir', 'C1/C2', 'Toprak-iklim-kültür bileşimi.'),
      W('ck30c1gs_3', 'Локальные продукты', 'Lakálnıye pradúktı', 'Yerel ürünler', 'C1/C2', 'Фермерские продукты ile yakın.'),
      W('ck30c1gs_4', 'Кулинарная традиция', 'Kulinárnaya tradítsiya', 'Mutfak geleneği', 'C1/C2', 'Kültürel miras bağlamında.'),
      W('ck30c1gs_5', 'Переосмысление', 'Piriasmıslyéniye', 'Yeniden yorumlama', 'C1/C2', 'Klasik tariflerin modern okuması.'),
      W('ck30c1gs_6', 'Тенденция', 'Tindyéntsiya', 'Eğilim', 'C1/C2', 'Тенденция к упрощению.')
    ],
    sentences: [
      S('Под аутентичностью понимается верность местной традиции.', 'Otantiklikten kasıt yerel geleneğe bağlılıktır.'),
      S('В отличие от массовой кухни, здесь важен терруар.', 'Kitlesel mutfaktan farklı olarak burada terroir önemlidir.'),
      S('Наблюдается тенденция к переосмыслению классики.', 'Klasiğin yeniden yorumlanmasına dair bir eğilim gözleniyor.')
    ]
  },
  {
    id: 'ck30_c1_recipewriting', unitNumber: 180.9703, levelGroup: 'C1/C2',
    title: 'Tarif Yazarlığı', description: 'Yayımlanabilir tarif metni kurmak',
    category: 'Aşçılık', color: '#b45309', icon: '📝',
    grammarExplain: `📌 РЕЦЕПТУРНЫЙ ТЕКСТ:
1. Standart yapı: ингредиенты → пошаговое приготовление → примечания шефа.
2. Fiil kipi tutarlı olmalı: ya hep emir (нарежьте) ya hep kişisiz (нарезают).
3. Ölçü birimi kısaltmaları: г, мл, ст. л., ч. л.`,
    words: [
      W('ck30c1rw_1', 'Ингредиенты', 'İngridiyéntı', 'Malzemeler', 'C1/C2', 'Tarifin ilk bölümü.'),
      W('ck30c1rw_2', 'Пошаговый', 'Paşágavıy', 'Adım adım', 'C1/C2', 'Пошаговое приготовление.'),
      W('ck30c1rw_3', 'Примечание', 'Primiçániye', 'Not / Dipnot', 'C1/C2', 'Şef ipuçları için kullanılır.'),
      W('ck30c1rw_4', 'Ст. л. / ч. л.', 'Stalóvaya lóşka / çáynaya lóşka', 'Yemek k. / Çay k.', 'C1/C2', 'Tariflerde standart kısaltmalar.'),
      W('ck30c1rw_5', 'По вкусу', 'Pa fkúsu', 'Damak tadına göre', 'C1/C2', 'Соль по вкусу.'),
      W('ck30c1rw_6', 'Вариация', 'Variátsiya', 'Varyasyon', 'C1/C2', 'Tarif sonunda alternatifler verilir.')
    ],
    sentences: [
      S('Соль и перец добавляются по вкусу.', 'Tuz ve biber damak tadına göre eklenir.'),
      S('Ниже приведено пошаговое приготовление.', 'Aşağıda adım adım hazırlanışı verilmiştir.'),
      S('В примечании шеф предлагает две вариации.', 'Notta şef iki varyasyon öneriyor.')
    ]
  },
  {
    id: 'ck30_c1_supply', unitNumber: 180.9704, levelGroup: 'C1/C2',
    title: 'Tedarik ve Stok Yönetimi', description: 'Tedarikçi, sözleşme, israf',
    category: 'Aşçılık', color: '#166534', icon: '📦',
    grammarExplain: `📌 İŞLETME DİLİ:
1. Sözleşme fiilleri: заключить договор, согласовать условия поставки.
2. Oran: доля отходов не должна превышать пяти процентов.
3. Neden-sonuç: вследствие перебоев с поставками…`,
    words: [
      W('ck30c1su_1', 'Поставщик', 'Pastafşşík', 'Tedarikçi', 'C1/C2', 'Поставка = tedarik/sevkiyat.'),
      W('ck30c1su_2', 'Отходы', 'Athódı', 'Atık / Fire', 'C1/C2', 'Доля отходов maliyeti doğrudan etkiler.'),
      W('ck30c1su_3', 'Товарное соседство', 'Tavárnaye sasyétstva', 'Ürün komşuluğu', 'C1/C2', 'Depolamada zorunlu hijyen kuralı.'),
      W('ck30c1su_4', 'Инвентаризация', 'İnvintarizátsiya', 'Sayım', 'C1/C2', 'Aylık stok kontrolü.'),
      W('ck30c1su_5', 'Перебои', 'Piriboí', 'Aksama / Kesinti', 'C1/C2', 'Перебои с поставками.'),
      W('ck30c1su_6', 'Оборачиваемость', 'Abaráçivayimast', 'Devir hızı', 'C1/C2', 'Stok yönetiminin anahtar göstergesi.')
    ],
    sentences: [
      S('С поставщиком заключён долгосрочный договор.', 'Tedarikçiyle uzun vadeli sözleşme yapıldı.'),
      S('Доля отходов не должна превышать пяти процентов.', 'Fire oranı yüzde beşi aşmamalıdır.'),
      S('Инвентаризация проводится в конце каждого месяца.', 'Sayım her ayın sonunda yapılır.')
    ]
  },
  {
    id: 'ck30_c1_worldcuisine', unitNumber: 180.9705, levelGroup: 'C1/C2',
    title: 'Dünya Mutfağı Teknikleri', description: 'Wok\'tan tandıra: karşılaştırmalı mutfak',
    category: 'Aşçılık', color: '#c2410c', icon: '🌏',
    grammarExplain: `📌 KARŞILAŞTIRMALI ANLATIM:
1. Benzerlik: подобно тому как… / по аналогии с…
2. Fark: тогда как… (oysa…), в то время как…
3. Kaynak belirtme: заимствовано из японской кухни.`,
    words: [
      W('ck30c1wc_1', 'Вок', 'Vok', 'Wok', 'C1/C2', 'Yüksek ısıda hızlı sotelemede kullanılır.'),
      W('ck30c1wc_2', 'Тандыр', 'Tandır', 'Tandır', 'C1/C2', 'Orta Asya mutfağından Rusçaya geçmiştir.'),
      W('ck30c1wc_3', 'Конфи', 'Kanfí', 'Konfit', 'C1/C2', 'Düşük ısıda yağda pişirme; çekimsizdir.'),
      W('ck30c1wc_4', 'Заимствовать', 'Zaímstvavat', 'Ödünç almak', 'C1/C2', 'Mutfaklar arası etkileşim için.'),
      W('ck30c1wc_5', 'Адаптировать', 'Adaptíravat', 'Uyarlamak', 'C1/C2', 'Yerel ürünlere uyarlama.'),
      W('ck30c1wc_6', 'Фьюжн', 'Fyújn', 'Füzyon', 'C1/C2', 'Фьюжн-кухня = füzyon mutfak.')
    ],
    sentences: [
      S('Эта техника заимствована из японской кухни.', 'Bu teknik Japon mutfağından alınmıştır.'),
      S('В воке готовят быстро, тогда как в тандыре — долго.', 'Wok\'ta hızlı pişirilir, oysa tandırda uzun sürer.'),
      S('Мы адаптировали рецепт под местные продукты.', 'Tarifi yerel ürünlere uyarladık.')
    ]
  }
];

export const COOKING30: UnitModule[] = [
  ...COOKING30_A2,
  ...COOKING30_B1,
  ...COOKING30_B2,
  ...COOKING30_C1
];
