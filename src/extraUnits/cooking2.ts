// ==========================================================
// AŞÇILIK MÜFREDATI GENİŞLEMESİ — +20 ÜNİTE (toplam 40 aşçılık ünitesi)
// cooking.ts'in devamı: daha fazla malzeme, alet, klasik yemek ve
// profesyonel mutfak dünyası. Diyaloglar yine «Ван Гог» kadrosuyla.
//   A2 : Ünite 37-41  (küçük aletler, süt ürünleri, meyveler, içecekler, saklama)
//   B1 : Ünite 92-96  (kaşalar/garnitürler, pelmeni, balık, şaşlık/mangal, baharatlar)
//   B2 : Ünite 140-144 (bayram kuşları, dünya mutfağı, peynir tabağı, eşleştirme, stok yönetimi)
//   C1 : Ünite 179-183 (moleküler gastronomi, tarladan sofraya, Michelin, mentorluk, yemek medyası)
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_COOKING2: UnitModule[] = [
  // ============================ A2 ============================
  {
    id: 'mod_a2_k6',
    unitNumber: 37,
    levelGroup: 'A2',
    title: 'Aşçılık 21: Küçük Mutfak Aletleri',
    description: 'Rende, süzgeç, çırpma teli, kepçe — şefin küçük ordusu',
    category: 'Aşçılık',
    color: '#14b8a6',
    icon: '🥄',
    grammarExplain: `📌 "NEYLE?" SORUSU — ARAÇ HÂLİ (Творительный, giriş):
1. Bir işi NEYLE yaptığınızı araç hâli söyler: "мешать венчиком" (çırpma teliyle karıştırmak), "наливать половником" (kepçeyle koymak).
2. Eril kelimeler -ом/-ем alır (ножом, венчиком), dişiller -ой/-ей (ложкой, тёркой).
3. Soru kalıbı: "Чем ты это делаешь?" (Bunu neyle yapıyorsun?) — cevap hep araç hâlindedir.`,
    words: [
      { id: 'wck21_1', ru: 'Тёрка', reading: 'Tyórka', tr: 'Rende', level: 'A2', usageNote: '"Натереть на тёрке" (rendelemek) — havuç ve peynirin kaderi.' },
      { id: 'wck21_2', ru: 'Дуршлаг', reading: 'Durşlák', tr: 'Süzgeç', level: 'A2', usageNote: 'Almancadan gelir; makarnanın en yakın arkadaşı.' },
      { id: 'wck21_3', ru: 'Венчик', reading: 'Vyénçik', tr: 'Çırpma teli', level: 'A2', usageNote: '"Взбить венчиком" (telle çırpmak) — omletin sırrı.' },
      { id: 'wck21_4', ru: 'Доска', reading: 'Daská', tr: 'Kesme tahtası', level: 'A2', usageNote: 'Tam adı "разделочная доска"; et ve sebze için ayrı olmalı.' },
      { id: 'wck21_5', ru: 'Половник', reading: 'Palóvnik', tr: 'Kepçe', level: 'A2', usageNote: 'Çorbayı tabağa taşıyan köprü.' },
      { id: 'wck21_6', ru: 'Миска', reading: 'Míska', tr: 'Kase / Karıştırma kabı', level: 'A2', usageNote: 'Hamur ve salataların doğduğu yer.' },
      { id: 'wck21_7', ru: 'Открывалка', reading: 'Atkr\u0131válka', tr: 'Açacak', level: 'A2', usageNote: 'Konserve ve şişelerin anahtarı; "открыть" (açmak) fiilinden.' },
      { id: 'wck21_8', ru: 'Блендер', reading: 'Bléndir', tr: 'Blender', level: 'A2', usageNote: 'İngilizceden geçmiştir; kapağını kapatmayı UNUTMAYIN.' }
    ],
    sentences: [
      { ru: 'Я взбиваю яйца венчиком в миске.', tr: 'Yumurtaları kasede çırpma teliyle çırpıyorum.', scrambled: ['яйца', 'Я взбиваю', 'в миске.', 'венчиком'], correct: ['Я взбиваю', 'яйца', 'венчиком', 'в миске.'] },
      { ru: 'Суп наливают в тарелку половником.', tr: 'Çorba tabağa kepçeyle konur.', scrambled: ['в тарелку', 'Суп наливают', 'половником.'], correct: ['Суп наливают', 'в тарелку', 'половником.'] }
    ],
    sceneTitle: 'Blender Faciası (Kapaksız Bölüm)',
    sceneContext: 'Lyosha çorbayı blenderdan geçirecek. Tek küçük detay: kapak tezgâhta duruyor. Tavan artık pancar rengi.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Лёша, натри морковь на тёрке и взбей яйца венчиком.', reading: 'Lyóşa, natrí markóf\' na tyórke i vzbyey yáytsa vyénçikam.', tr: 'Lyosha, havucu rendele ve yumurtaları çırpma teliyle çırp.' },
      { speaker: 'Lyosha', ru: 'Готово! А суп я сделаю блендером. Секунда — и всё!', reading: 'Gatóva! A sup ya sdyélayu bléndiram. Sikúnda — i fsyo!', tr: 'Tamam! Çorbayı da blenderla yapacağım. Bir saniye — bitti!' },
      { speaker: 'Nina', ru: 'Лёша... А ГДЕ КРЫШКА БЛЕНДЕРА?!', reading: 'Lyóşa... A GDYE KR\u0631Şka BLÉNDIRA?!', tr: 'Lyosha... BLENDERIN KAPAĞI NEREDE?!' },
      { speaker: 'Lyosha', ru: 'Ой. Потолок теперь... цвета борща. Красиво же?', reading: 'Oy. Patalók tipyér\'... tsvyéta barşşá. Krasíva je?', tr: 'Ay. Tavan artık... borşç renginde. Güzel olmuş ama, değil mi?' }
    ]
  },
  {
    id: 'mod_a2_k7',
    unitNumber: 38,
    levelGroup: 'A2',
    title: 'Aşçılık 22: Süt Ürünleri & Kahvaltılıklar',
    description: 'Lor, peynir, kefir, sirniki — Rus buzdolabının beyaz rafı',
    category: 'Aşçılık',
    color: '#60a5fa',
    icon: '🥛',
    grammarExplain: `📌 "İLE/‑Lİ" KALIBI — С + ARAÇ HÂLİ:
1. "Сырники со сметаной" (smetanalı sirniki), "хлеб с сыром" (peynirli ekmek) — С edatı araç hâliyle "‑li/‑la" anlamı verir.
2. С, с/з sesiyle başlayan kelimeden önce СО olur: "со сметаной", "со сливками".
3. Market listesi kalıbı: "Купи хлеб, сыр и кефир" — nesneler yalın kalır (cansız eril/nötr).`,
    words: [
      { id: 'wck22_1', ru: 'Творог', reading: 'Tvórak', tr: 'Lor peyniri', level: 'A2', usageNote: 'Rus kahvaltısının protein deposu; sirnikinin ana malzemesi.' },
      { id: 'wck22_2', ru: 'Сыр', reading: 'S\u0131r', tr: 'Peynir', level: 'A2', usageNote: '"Бутерброд с сыром" (peynirli sandviç) klasik kahvaltı.' },
      { id: 'wck22_3', ru: 'Кефир', reading: 'Kifír', tr: 'Kefir', level: 'A2', usageNote: 'Ayranın Rus kuzeni; gece içilir, sabah övülür.' },
      { id: 'wck22_4', ru: 'Сливки', reading: 'Slífki', tr: 'Krema', level: 'A2', usageNote: 'Hep çoğuldur; "кофе со сливками" (kremalı kahve).' },
      { id: 'wck22_5', ru: 'Йогурт', reading: 'Yógurt', tr: 'Yoğurt', level: 'A2', usageNote: 'Rusçada genelde meyveli tatlı yoğurt kastedilir.' },
      { id: 'wck22_6', ru: 'Хлеб', reading: 'Hlyep', tr: 'Ekmek', level: 'A2', usageNote: '"Хлеб — всему голова" (ekmek her şeyin başıdır) atasözü meşhurdur.' },
      { id: 'wck22_7', ru: 'Колбаса', reading: 'Kalbasá', tr: 'Sosis / Salam', level: 'A2', usageNote: 'Üstü açık sandviçin (бутерброд) klasik dolgusu.' },
      { id: 'wck22_8', ru: 'Сырники', reading: 'S\u0131́rniki', tr: 'Sirniki (lor köftesi)', level: 'A2', usageNote: 'Adında "сыр" var ama peynirden değil, lordan (творог) yapılır!' }
    ],
    sentences: [
      { ru: 'На завтрак у нас сырники со сметаной.', tr: 'Kahvaltıda smetanalı sirniki var.', scrambled: ['у нас', 'На завтрак', 'со сметаной.', 'сырники'], correct: ['На завтрак', 'у нас', 'сырники', 'со сметаной.'] },
      { ru: 'Купи хлеб, сыр и кефир, пожалуйста.', tr: 'Ekmek, peynir ve kefir al lütfen.', scrambled: ['сыр и кефир,', 'Купи хлеб,', 'пожалуйста.'], correct: ['Купи хлеб,', 'сыр и кефир,', 'пожалуйста.'] }
    ],
    sceneTitle: 'Sirniki Paradoksu',
    sceneContext: 'Lyosha, "сырники"nin peynirden (сыр) yapıldığına emin. Nina lor (творог) paketiyle gerçeği açıklıyor. Lyosha\'nın dünyası sarsılıyor.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Сырники — это из сыра. Логика! Сыр — сырники!', reading: 'S\u0131́rniki — éta is s\u0131́ra. Lógika! S\u0131r — s\u0131́rniki!', tr: 'Sirniki — peynirden yapılır. Mantık! Peynir — sirniki!' },
      { speaker: 'Nina', ru: 'Нет, Лёша. Сырники делают из творога. Всегда.', reading: 'Nyet, Lyóşa. S\u0131́rniki dyélayut is tvóraga. Fsigdá.', tr: 'Hayır, Lyosha. Sirniki lordan yapılır. Her zaman.' },
      { speaker: 'Lyosha', ru: 'Что?! Вся моя жизнь — обман! А кефир из чего?', reading: 'Şto?! Fsya mayá jizn\' — abmán! A kifír is çivó?', tr: 'Ne?! Bütün hayatım yalanmış! Peki kefir neyden?' },
      { speaker: 'Nina', ru: 'Из молока. Лёша, просто жарь сырники. Со сметаной — объедение.', reading: 'İz malaká. Lyóşa, prósta jar\' s\u0131́rniki. Sa smitánay — abyidyéniye.', tr: 'Sütten. Lyosha, sen sadece sirnikileri pişir. Smetanayla — parmak yedirtir.' }
    ]
  },
  {
    id: 'mod_a2_k8',
    unitNumber: 39,
    levelGroup: 'A2',
    title: 'Aşçılık 23: Meyveler & Tatlı Hazırlığı',
    description: 'Elma, vişne, bal, ceviz — şarlotka güzellemesi',
    category: 'Aşçılık',
    color: '#f43f5e',
    icon: '🍎',
    grammarExplain: `📌 "NEYDEN YAPILDI?" — ИЗ + TAMLAYAN HÂLİ:
1. "Пирог из яблок" (elmalı turta), "компот из вишни" (vişne kompostosu) — ИЗ kaynağı gösterir.
2. Çoğul tamlayan tariflerde sık geçer: яблоко → яблок, ягода → ягод, орех → орехов.
3. "Класть/положить в..." (içine koymak): "В пирог кладут яблоки и изюм."`,
    words: [
      { id: 'wck23_1', ru: 'Яблоко', reading: 'Yáblaka', tr: 'Elma', level: 'A2', usageNote: 'Шарлотка (elmalı kek) Rus mutfağının en kolay tatlısıdır.' },
      { id: 'wck23_2', ru: 'Груша', reading: 'Grúşa', tr: 'Armut', level: 'A2', usageNote: 'Tatlılarda elmanın zarif kuzeni.' },
      { id: 'wck23_3', ru: 'Вишня', reading: 'Víşnya', tr: 'Vişne', level: 'A2', usageNote: 'Vareniki dolgusunun ve kompostonun yıldızı.' },
      { id: 'wck23_4', ru: 'Ягоды', reading: 'Yágad\u0131', tr: 'Orman meyveleri', level: 'A2', usageNote: 'Çilek, ahududu, yaban mersini — hepsinin ortak adı.' },
      { id: 'wck23_5', ru: 'Орехи', reading: 'Aryéhi', tr: 'Kuruyemiş / Ceviz', level: 'A2', usageNote: '"Грецкие орехи" (ceviz) kelime kelime "Yunan fındığı" demektir.' },
      { id: 'wck23_6', ru: 'Изюм', reading: 'İzyúm', tr: 'Kuru üzüm', level: 'A2', usageNote: 'Türkçe "üzüm"le akrabadır — ikisi de aynı kökten!' },
      { id: 'wck23_7', ru: 'Мёд', reading: 'Myot', tr: 'Bal', level: 'A2', usageNote: 'Medovik pastasına adını veren malzeme.' },
      { id: 'wck23_8', ru: 'Лимон', reading: 'Limón', tr: 'Limon', level: 'A2', usageNote: '"Чай с лимоном" — Rus çay kültürünün imzası.' }
    ],
    sentences: [
      { ru: 'В пирог кладут яблоки, орехи и изюм.', tr: 'Turtaya elma, ceviz ve kuru üzüm konur.', scrambled: ['яблоки,', 'В пирог кладут', 'и изюм.', 'орехи'], correct: ['В пирог кладут', 'яблоки,', 'орехи', 'и изюм.'] },
      { ru: 'Чай с мёдом и лимоном — это классика.', tr: 'Ballı ve limonlu çay — bu bir klasik.', scrambled: ['и лимоном —', 'Чай с мёдом', 'классика.', 'это'], correct: ['Чай с мёдом', 'и лимоном —', 'это', 'классика.'] }
    ],
    sceneTitle: 'Şarlotka Seferberliği',
    sceneContext: 'Komşu pazardan bir kasa elma gelmiş. Şef Pyotr kararını verdi: bugün herkes şarlotka öğreniyor. Lyosha elmaları "test ederek" azaltıyor.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Сегодня — шарлотка. Нарежьте яблоки, добавьте изюм и орехи.', reading: 'Sivódnya — şarlótka. Naryéj\'te yáblaki, dabáf\'te izyúm i aryéhi.', tr: 'Bugün — şarlotka. Elmaları doğrayın, kuru üzüm ve ceviz ekleyin.' },
      { speaker: 'Lyosha', ru: 'Шеф, тут было двадцать яблок... а теперь шестнадцать.', reading: 'Şef, tut b\u0131́la dvátsat\' yáblak... a tipyér\' ş\u0131snátsat\'.', tr: 'Şef, burada yirmi elma vardı... şimdi on altı.' },
      { speaker: 'Nina', ru: 'Лёша! Ты опять "проверял качество"?!', reading: 'Lyóşa! T\u0131 apyát\' "pravyirál káçistva"?!', tr: 'Lyosha! Yine mi "kalite kontrolü" yaptın?!' },
      { speaker: 'Lyosha', ru: 'Да! И у меня хорошая новость: яблоки отличные!', reading: 'Da! İ u minyá haróşaya nóvast\': yáblaki atlíçn\u0131ye!', tr: 'Evet! Ve iyi bir haberim var: elmalar mükemmel!' }
    ]
  },
  {
    id: 'mod_a2_k9',
    unitNumber: 40,
    levelGroup: 'A2',
    title: 'Aşçılık 24: İçecekler & Çay Kültürü',
    description: 'Çay, kompot, mors, semaver — sofranın sıvı tarafı',
    category: 'Aşçılık',
    color: '#d97706',
    icon: '🫖',
    grammarExplain: `📌 İÇECEK KALIPLARI:
1. "Поставить чайник" (çaydanlığı koymak/ısıtmaya başlamak) — Rus evinin en sık kullanılan emri.
2. Заварка (dem) + кипяток (kaynar su): Rus çayı ikisinin karışımıdır; "покрепче" (demli) veya "послабее" (açık) istenir.
3. "Варить компот из + tamlayan": "компот из вишни" (vişneden komposto) — meyve hep ИЗ ile gelir.`,
    words: [
      { id: 'wck24_1', ru: 'Чай', reading: 'Çay', tr: 'Çay', level: 'A2', usageNote: 'Türkçeyle aynı kökten; Rusya\'da da günün her saati içilir.' },
      { id: 'wck24_2', ru: 'Кофе', reading: 'Kófe', tr: 'Kahve', level: 'A2', usageNote: 'Çekimsizdir ve erildir: "вкусный кофе".' },
      { id: 'wck24_3', ru: 'Сок', reading: 'Sok', tr: 'Meyve suyu', level: 'A2', usageNote: '"Яблочный сок" (elma suyu), "томатный сок" (uçakların klasiği).' },
      { id: 'wck24_4', ru: 'Компот', reading: 'Kampót', tr: 'Komposto', level: 'A2', usageNote: 'Rus yemekhanesinin üçüncü kadehi: суп + второе + компот.' },
      { id: 'wck24_5', ru: 'Морс', reading: 'Mors', tr: 'Mors (meyveli içecek)', level: 'A2', usageNote: 'Kızılcık (клюква) morsu restoranların gözdesidir.' },
      { id: 'wck24_6', ru: 'Кипяток', reading: 'Kipitók', tr: 'Kaynar su', level: 'A2', usageNote: '"Кипеть" (kaynamak) fiilinden; çayın ikinci yarısı.' },
      { id: 'wck24_7', ru: 'Заварка', reading: 'Zavárka', tr: 'Dem', level: 'A2', usageNote: 'Küçük demlikteki koyu çay; bardağa önce bu konur.' },
      { id: 'wck24_8', ru: 'Самовар', reading: 'Samavár', tr: 'Semaver', level: 'A2', usageNote: '"Сам варит" (kendi kaynatır) kelimelerinden doğmuştur!' }
    ],
    sentences: [
      { ru: 'Поставь чайник — будем пить чай с вареньем.', tr: 'Çaydanlığı koy — reçelle çay içeceğiz.', scrambled: ['— будем пить', 'Поставь чайник', 'с вареньем.', 'чай'], correct: ['Поставь чайник', '— будем пить', 'чай', 'с вареньем.'] },
      { ru: 'Бабушка варит компот из вишни и яблок.', tr: 'Büyükanne vişne ve elmadan komposto yapıyor.', scrambled: ['компот', 'Бабушка варит', 'и яблок.', 'из вишни'], correct: ['Бабушка варит', 'компот', 'из вишни', 'и яблок.'] }
    ],
    sceneTitle: 'Semaver Töreni',
    sceneContext: 'Restorana antika bir semaver gelmiş. Şef Pyotr\'a göre bu "sadece dekor" değil — bugün herkes gerçek Rus çayı demlemeyi öğrenecek.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Это самовар моего деда. Сначала — заварка, потом — кипяток.', reading: 'Éta samavár mayivó dyéda. Snaçála — zavárka, patóm — kipitók.', tr: 'Bu dedemin semaveri. Önce — dem, sonra — kaynar su.' },
      { speaker: 'Lyosha', ru: 'А почему не просто пакетик чая? Быстро и легко!', reading: 'A paçimú ni prósta pakyétik çáya? B\u0131́stra i lihkó!', tr: 'Neden direkt poşet çay değil? Hızlı ve kolay!' },
      { speaker: 'Şef Pyotr', ru: 'Пакетик?! В моём ресторане?! Лёша, чай — это церемония!', reading: 'Pakyétik?! V mayóm ristaráne?! Lyóşa, çay — éta tsirimóniya!', tr: 'Poşet mi?! Benim restoranımda mı?! Lyosha, çay — bir törendir!' },
      { speaker: 'Nina', ru: 'С мёдом, с лимоном, с вареньем... Гости будут в восторге.', reading: 'S myódam, s limónam, s varyén\'yem... Gósti búdut v vastórge.', tr: 'Ballı, limonlu, reçelli... Misafirler bayılacak.' }
    ]
  },
  {
    id: 'mod_a2_k10',
    unitNumber: 41,
    levelGroup: 'A2',
    title: 'Aşçılık 25: Saklama & Tazelik',
    description: 'Taze mi, bozuk mu? SKT, dondurucu ve buzdolabı disiplini',
    category: 'Aşçılık',
    color: '#06b6d4',
    icon: '🧊',
    grammarExplain: `📌 TAZELİK DİLİ:
1. Свежий (taze) sıfatı isme uyum sağlar: свежий хлеб, свежая рыба, свежее молоко, свежие овощи.
2. За-/раз- önekleri zıt yön verir: заморозить (dondurmak) ↔ разморозить (buzunu çözmek).
3. "Срок годности" (son kullanma tarihi): "Проверь срок годности!" (SKT\'yi kontrol et!) mutfak güvenliğinin ilk kuralı.`,
    words: [
      { id: 'wck25_1', ru: 'Свежий', reading: 'Svyéjiy', tr: 'Taze', level: 'A2', usageNote: 'Şefin en sevdiği sıfat; zıttı "несвежий" naziktir, "тухлый" acımasız.' },
      { id: 'wck25_2', ru: 'Хранить', reading: 'Hranít\'', tr: 'Saklamak / Muhafaza etmek', level: 'A2', usageNote: '"Хранить в холодильнике" (buzdolabında saklayın) etiket klasiği.' },
      { id: 'wck25_3', ru: 'Морозилка', reading: 'Marazílka', tr: 'Dondurucu', level: 'A2', usageNote: 'Resmî adı "морозильная камера" ama kimse öyle demez.' },
      { id: 'wck25_4', ru: 'Срок годности', reading: 'Srok gódnasti', tr: 'Son kullanma tarihi', level: 'A2', usageNote: 'Marketin ve mutfağın anayasal metni.' },
      { id: 'wck25_5', ru: 'Испортиться', reading: 'İspórtitsa', tr: 'Bozulmak', level: 'A2', usageNote: '"Молоко испортилось" (süt bozuldu) — sabah dramı.' },
      { id: 'wck25_6', ru: 'Заморозить', reading: 'Zamarózit\'', tr: 'Dondurmak', level: 'A2', usageNote: 'Pelmeni kültürünün temel fiili.' },
      { id: 'wck25_7', ru: 'Разморозить', reading: 'Razmarózit\'', tr: 'Buzunu çözmek', level: 'A2', usageNote: '"Разморозь мясо на ужин" (akşam için eti çöz).' },
      { id: 'wck25_8', ru: 'Пакет', reading: 'Pakyét', tr: 'Poşet / Paket', level: 'A2', usageNote: 'Rus evinde "пакет с пакетами" (poşet dolu poşet) efsanesi yaşar.' }
    ],
    sentences: [
      { ru: 'Молоко хранят в холодильнике, а мясо — в морозилке.', tr: 'Süt buzdolabında, et ise dondurucuda saklanır.', scrambled: ['в холодильнике,', 'Молоко хранят', 'в морозилке.', 'а мясо —'], correct: ['Молоко хранят', 'в холодильнике,', 'а мясо —', 'в морозилке.'] },
      { ru: 'Проверь срок годности на пакете кефира.', tr: 'Kefir paketindeki son kullanma tarihini kontrol et.', scrambled: ['срок годности', 'Проверь', 'кефира.', 'на пакете'], correct: ['Проверь', 'срок годности', 'на пакете', 'кефира.'] }
    ],
    sceneTitle: 'Buzdolabı Teftişi',
    sceneContext: 'Ayın son cuması: Şef Pyotr\'un korkulan buzdolabı teftişi. Kural basit: tarihi geçen her şey çöpe — istisnasız, pazarlıksız.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Инспекция! Всё несвежее — в мусор. Читаем сроки годности!', reading: 'İnspyéktsiya! Fsyo nisvyéjiye — v músar. Çitáyem sróki gódnasti!', tr: 'Teftiş! Taze olmayan her şey — çöpe. Son kullanma tarihlerini okuyoruz!' },
      { speaker: 'Lyosha', ru: 'Шеф, этот йогурт просрочен только на один день...', reading: 'Şef, état yógurt prasróçin tól\'ka na adín dyen\'...', tr: 'Şef, bu yoğurdun tarihi sadece bir gün geçmiş...' },
      { speaker: 'Şef Pyotr', ru: 'Один день?! В мусор! На кухне нет слова "только".', reading: 'Adín dyen\'?! V músar! Na kúhne nyet slóva "tól\'ka".', tr: 'Bir gün mü?! Çöpe! Mutfakta "sadece" kelimesi yoktur.' },
      { speaker: 'Nina', ru: 'Зато рыба — свежая, утренняя. Понюхайте — море!', reading: 'Zató r\u0131́ba — svyéjaya, útrinnyaya. Panyúhayte — móre!', tr: 'Ama balık — taptaze, sabah geldi. Koklayın — deniz kokuyor!' }
    ]
  },

  // ============================ B1 ============================
  {
    id: 'mod_b1_k7',
    unitNumber: 92,
    levelGroup: 'B1',
    title: 'Aşçılık 26: Kaşalar & Garnitürler',
    description: 'Karabuğday, yulaf, püre — "tane tane mi, lapa mı?" meselesi',
    category: 'Aşçılık',
    color: '#a16207',
    icon: '🍚',
    grammarExplain: `📌 GARNİTÜR DİLİ:
1. "На гарнир — гречка" (garnitür olarak karabuğday) — НА + yalın kalıbı menülerin standardıdır.
2. Промыть (yıkayıp durulamak): "Промойте гречку холодной водой" — tane tane pişmenin ilk sırrı.
3. Слипнуться (birbirine yapışmak) sadece geçmişte kullanılır gibi görünür: "Макароны слиплись!" — çünkü fark edildiğinde iş işten geçmiştir.`,
    words: [
      { id: 'wck26_1', ru: 'Гречка', reading: 'Gryéçka', tr: 'Karabuğday', level: 'B1', usageNote: 'Rusya\'nın millî garnitürü; krizde ilk stoklanan üründür.' },
      { id: 'wck26_2', ru: 'Овсянка', reading: 'Afsyánka', tr: 'Yulaf lapası', level: 'B1', usageNote: '"Овсянка, сэр!" repliği kültleşmiştir.' },
      { id: 'wck26_3', ru: 'Манка', reading: 'Mánka', tr: 'İrmik lapası', level: 'B1', usageNote: 'Anaokulunun sevilen/nefret edilen klasiği — topaksız olmalı!' },
      { id: 'wck26_4', ru: 'Пюре', reading: 'Pyuré', tr: 'Püre', level: 'B1', usageNote: 'Çekimsizdir; "картофельное пюре" kotletin can yoldaşı.' },
      { id: 'wck26_5', ru: 'Макароны', reading: 'Makarón\u0131', tr: 'Makarna', level: 'B1', usageNote: 'Hep çoğuldur; "макароны по-флотски" (kıymalı) efsanedir.' },
      { id: 'wck26_6', ru: 'Рассыпчатый', reading: 'Rass\u0131́pçat\u0131y', tr: 'Tane tane', level: 'B1', usageNote: 'İyi pilavın ve karabuğdayın övgü sıfatı.' },
      { id: 'wck26_7', ru: 'Слипнуться', reading: 'Slípnutsa', tr: 'Birbirine yapışmak', level: 'B1', usageNote: 'Makarnanın kaderi, aşçının kabusu.' },
      { id: 'wck26_8', ru: 'Промыть', reading: 'Pram\u0131́t\'', tr: 'Yıkayıp durulamak', level: 'B1', usageNote: '"Промыть рис до прозрачной воды" (su berraklaşana dek).' }
    ],
    sentences: [
      { ru: 'Промойте гречку и варите её двадцать минут.', tr: 'Karabuğdayı durulayın ve yirmi dakika pişirin.', scrambled: ['гречку', 'Промойте', 'двадцать минут.', 'и варите её'], correct: ['Промойте', 'гречку', 'и варите её', 'двадцать минут.'] },
      { ru: 'Макароны слиплись, потому что Лёша забыл их помешать.', tr: 'Makarnalar yapıştı çünkü Lyosha karıştırmayı unuttu.', scrambled: ['потому что Лёша', 'Макароны слиплись,', 'их помешать.', 'забыл'], correct: ['Макароны слиплись,', 'потому что Лёша', 'забыл', 'их помешать.'] }
    ],
    sceneTitle: 'Garnitür İstasyonunun Kanunu',
    sceneContext: 'Lyosha garnitür istasyonuna terfi etti. İlk dersi: karabuğday tane tane olacak, makarna yapışmayacak, manka topaksız olacak. Üçte sıfır yaptı.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Гречка должна быть рассыпчатой. Это закон кухни!', reading: 'Gryéçka daljná b\u0131t\' rass\u0131́pçatay. Éta zakón kúhni!', tr: 'Karabuğday tane tane olmalı. Bu mutfağın kanunudur!' },
      { speaker: 'Lyosha', ru: 'Шеф, у меня проблема. Макароны... они теперь один большой макарон.', reading: 'Şef, u minyá prablyéma. Makarón\u0131... aní tipyér\' adín bal\'şóy makarón.', tr: 'Şef, bir sorunum var. Makarnalar... artık tek bir dev makarna oldular.' },
      { speaker: 'Nina', ru: 'Ты промыл гречку? Помешал макароны? Хоть что-то?', reading: 'T\u0131 pram\u0131́l gryéçku? Pamişál makarón\u0131? Hot\' şto-ta?', tr: 'Karabuğdayı duruladın mı? Makarnayı karıştırdın mı? Herhangi bir şey?' },
      { speaker: 'Lyosha', ru: 'Я... наблюдал. Ладно, заново! Промываю, мешаю, слежу!', reading: 'Ya... nablyudál. Ládna, zánava! Pram\u0131váyu, mişáyu, slijú!', tr: 'Ben... gözlemledim. Tamam, baştan! Duruluyorum, karıştırıyorum, takip ediyorum!' }
    ]
  },
  {
    id: 'mod_b1_k8',
    unitNumber: 93,
    levelGroup: 'B1',
    title: 'Aşçılık 27: Pelmeni & Vareniki',
    description: 'Kıyma, kenar kapatma, "yüzeye çıktı mı hazır" kuralı',
    category: 'Aşçılık',
    color: '#0284c7',
    icon: '🥟',
    grammarExplain: `📌 PELMENİ GRAMERİ:
1. Всплыть (yüzeye çıkmak): "Пельмени всплыли — готовы!" Rus mutfağının en bilinen pişme testi.
2. Karşılaştırma -ее ile: вкусный → вкуснее (daha lezzetli): "Домашние пельмени вкуснее магазинных."
3. Защипнуть (kenarını kapatmak) — hamuru parmaklarla "kıstırma" fiili; aile pelmeni gecelerinin ana hareketi.`,
    words: [
      { id: 'wck27_1', ru: 'Пельмени', reading: 'Pil\'myéni', tr: 'Pelmeni (Rus mantısı)', level: 'B1', usageNote: 'Sibirya\'nın dünyaya hediyesi; dondurucuda bekleyen dost.' },
      { id: 'wck27_2', ru: 'Вареники', reading: 'Varyéniki', tr: 'Vareniki', level: 'B1', usageNote: 'Pelmeninin tatlı/sebzeli kuzeni: vişneli, patatesli, lorlu.' },
      { id: 'wck27_3', ru: 'Фарш', reading: 'Farş', tr: 'Kıyma', level: 'B1', usageNote: 'Klasik pelmeni harcı: dana + domuz + soğan + karabiber.' },
      { id: 'wck27_4', ru: 'Защипнуть', reading: 'Zaşşipnút\'', tr: 'Kenarını kapatmak', level: 'B1', usageNote: 'Güzel "kıstırılmış" kenar, usta elin imzasıdır.' },
      { id: 'wck27_5', ru: 'Всплыть', reading: 'Fspl\u0131t\'', tr: 'Yüzeye çıkmak', level: 'B1', usageNote: 'Pişme sinyali: yüzdüyse 2-3 dakika daha, sonra kepçe!' },
      { id: 'wck27_6', ru: 'Домашний', reading: 'Damáşniy', tr: 'Ev yapımı', level: 'B1', usageNote: '"Домашняя еда" (ev yemeği) — restoranların en iddialı vaadi.' },
      { id: 'wck27_7', ru: 'Целый', reading: 'Tsél\u0131y', tr: 'Bütün / Sağlam', level: 'B1', usageNote: '"Пельмень остался целым" (dağılmadı) — kalite kanıtı.' },
      { id: 'wck27_8', ru: 'Вкуснее', reading: 'Fkusnyéye', tr: 'Daha lezzetli', level: 'B1', usageNote: 'Karşılaştırmanın mutfak hâli; sonuna "всех" ekle, şampiyon ol.' }
    ],
    sentences: [
      { ru: 'Пельмени готовы, когда они всплыли.', tr: 'Pelmeni yüzeye çıktığında hazırdır.', scrambled: ['готовы,', 'Пельмени', 'всплыли.', 'когда они'], correct: ['Пельмени', 'готовы,', 'когда они', 'всплыли.'] },
      { ru: 'Домашние пельмени вкуснее магазинных.', tr: 'Ev yapımı pelmeni marketinkinden daha lezzetlidir.', scrambled: ['вкуснее', 'Домашние пельмени', 'магазинных.'], correct: ['Домашние пельмени', 'вкуснее', 'магазинных.'] }
    ],
    sceneTitle: 'Pelmeni Şampiyonası',
    sceneContext: 'Kış menüsü için 500 pelmeni gerekiyor. Şef bir yarışma ilan etti: en çok ve en güzel kapatan kazanır. Nina hız, Lyosha "yaratıcılık" modunda.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Соревнование! Фарш готов, тесто раскатано. Лепим и защипываем!', reading: 'Sarivnavániye! Farş gatóf, tyésta raskátana. Lyépim i zaşşíp\u0131vayem!', tr: 'Yarışma! Kıyma hazır, hamur açıldı. Sarıyoruz ve kapatıyoruz!' },
      { speaker: 'Nina', ru: 'Сто двадцать штук! Все целые, все красивые.', reading: 'Sto dvátsat\' ştuk! Fsye tsél\u0131ye, fsye krasív\u0131ye.', tr: 'Yüz yirmi tane! Hepsi sağlam, hepsi güzel.' },
      { speaker: 'Lyosha', ru: 'А у меня — восемьдесят. Но один в форме сердца! Для меню свиданий!', reading: 'A u minyá — vósim\'disyat. No adín f fórme syértsa! Dlya minyú svidániy!', tr: 'Bende — seksen. Ama bir tanesi kalp şeklinde! Randevu menüsü için!' },
      { speaker: 'Şef Pyotr', ru: 'Хм. Нина выиграла. Но сердце... сердце оставим. Это хорошая идея, Лёша.', reading: 'Hm. Nína v\u0131́igrala. No syértse... syértse astávim. Éta haróşaya idyéya, Lyóşa.', tr: 'Hım. Nina kazandı. Ama kalp... kalbi tutuyoruz. Bu iyi bir fikir, Lyosha.' }
    ]
  },
  {
    id: 'mod_b1_k9',
    unitNumber: 94,
    levelGroup: 'B1',
    title: 'Aşçılık 28: Balık Yemekleri',
    description: 'Somon, ringa, uha — kılçık ayıklama sanatı',
    category: 'Aşçılık',
    color: '#059669',
    icon: '🐟',
    grammarExplain: `📌 BALIK MUTFAĞI DİLİ:
1. Разделать рыбу (balığı temizleyip parçalamak) — pullardan (чешуя) kılçığa (косточка) tüm operasyonun fiili.
2. У madde kalıbı: "У лосося мало костей" (Somonun kılçığı azdır) — У + tamlayan sahiplik bildirir.
3. Уха sadece "balık çorbası" değildir: ateş başında, dumanlı, votka damlatılan bir ritüeldir (turistlere böyle anlatılır).`,
    words: [
      { id: 'wck28_1', ru: 'Рыба', reading: 'R\u0131́ba', tr: 'Balık', level: 'B1', usageNote: '"Рыба гниёт с головы" atasözü mutfak dışında da işler.' },
      { id: 'wck28_2', ru: 'Селёдка', reading: 'Silyótka', tr: 'Ringa', level: 'B1', usageNote: '"Селёдка под шубой" (kürk mantolu ringa) yılbaşı klasiğidir.' },
      { id: 'wck28_3', ru: 'Лосось', reading: 'Lasós\'', tr: 'Somon', level: 'B1', usageNote: 'Menülerin prensi; azı pişmiş (медиум) sevilir.' },
      { id: 'wck28_4', ru: 'Уха', reading: 'Uhá', tr: 'Uha (balık çorbası)', level: 'B1', usageNote: 'Vurgu sondadır; balıkçı ateşinin çorbası.' },
      { id: 'wck28_5', ru: 'Косточка', reading: 'Kóstaçka', tr: 'Kılçık', level: 'B1', usageNote: '"Осторожно, косточки!" (Dikkat, kılçık var!) — servis uyarısı.' },
      { id: 'wck28_6', ru: 'Чешуя', reading: 'Çişuyá', tr: 'Balık pulu', level: 'B1', usageNote: 'Temizlenirken mutfağın her yerine sıçramasıyla ünlüdür.' },
      { id: 'wck28_7', ru: 'Разделать', reading: 'Razdyélat\'', tr: 'Temizleyip parçalamak', level: 'B1', usageNote: '"Разделать рыбу на филе" (fileto çıkarmak).' },
      { id: 'wck28_8', ru: 'Прожарить', reading: 'Prajárit\'', tr: 'İyice pişirmek', level: 'B1', usageNote: '"Хорошо прожарь рыбу" — iç kısmı çiğ kalmasın.' }
    ],
    sentences: [
      { ru: 'Разделайте рыбу и уберите все косточки.', tr: 'Balığı temizleyin ve bütün kılçıkları ayıklayın.', scrambled: ['рыбу', 'Разделайте', 'все косточки.', 'и уберите'], correct: ['Разделайте', 'рыбу', 'и уберите', 'все косточки.'] },
      { ru: 'Уха варится на медленном огне с луком и укропом.', tr: 'Uha kısık ateşte soğan ve dereotuyla pişer.', scrambled: ['на медленном огне', 'Уха варится', 'и укропом.', 'с луком'], correct: ['Уха варится', 'на медленном огне', 'с луком', 'и укропом.'] }
    ],
    sceneTitle: 'Sabah Balık Teslimatı',
    sceneContext: 'Sabah altıda taze balık kasaları geldi. Lyosha\'nın görevi: pulları temizlemek. Mutfak şimdi bir "pul kar küresi" gibi.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Свежий лосось! Лёша — чистишь чешую. Нина — разделываешь на филе.', reading: 'Svyéjiy lasós\'! Lyóşa — çístiş çişuyú. Nína — razdyél\u0131vayeş na filé.', tr: 'Taze somon! Lyosha — pulları temizliyorsun. Nina — fileto çıkarıyorsun.' },
      { speaker: 'Lyosha', ru: 'Шеф, чешуя ВЕЗДЕ. У меня в волосах. В кармане. В душе.', reading: 'Şef, çişuyá VIZDYÉ. U minyá v valasáh. F karmáne. V duşé.', tr: 'Şef, pul HER YERDE. Saçımda. Cebimde. Ruhumda.' },
      { speaker: 'Nina', ru: 'Зато посмотри на это филе — ни одной косточки!', reading: 'Zató pasmatrí na éta filé — ni adnóy kóstaçki!', tr: 'Ama şu filetoya bak — tek bir kılçık yok!' },
      { speaker: 'Şef Pyotr', ru: 'Из головы и хвоста сварим уху. На кухне ничего не пропадает!', reading: 'İz galav\u0131́ i hvastá svárim uhú. Na kúhne niçivó ni prapadáyit!', tr: 'Kafadan ve kuyruktan uha yapacağız. Mutfakta hiçbir şey ziyan olmaz!' }
    ]
  },
  {
    id: 'mod_b1_k10',
    unitNumber: 95,
    levelGroup: 'B1',
    title: 'Aşçılık 29: Şaşlık & Mangal',
    description: 'Köz, şiş, marinat — ve "her Rus erkeği şaşlık uzmanıdır" teoremi',
    category: 'Aşçılık',
    color: '#ea580c',
    icon: '🍢',
    grammarExplain: `📌 MANGAL (МАНГАЛ) DİLİ:
1. "Жарить на углях" (közde pişirmek), "на мангале" (mangalda) — НА + yer bildirimi.
2. Переворачивать (çevirmek, süreç): "Переворачивай шампуры каждые две минуты" — mangal başındaki tek görev ve en büyük tartışma konusu.
3. Каждые + süre (her ... de bir): "каждые пять минут" (her beş dakikada) — çoğul biçim kullanılır.`,
    words: [
      { id: 'wck29_1', ru: 'Шашлык', reading: 'Şaşl\u0131́k', tr: 'Şaşlık', level: 'B1', usageNote: 'Türkçe "şiş"le akrabadır; Rus yazlık kültürünün kalbi.' },
      { id: 'wck29_2', ru: 'Мангал', reading: 'Mangál', tr: 'Mangal', level: 'B1', usageNote: 'Bir kelime daha ortak! Dача bahçesinin tahtı.' },
      { id: 'wck29_3', ru: 'Угли', reading: 'Úgli', tr: 'Közler', level: 'B1', usageNote: '"Жарить на углях" — alev değil, köz ister; alev = felaket.' },
      { id: 'wck29_4', ru: 'Шампур', reading: 'Şampúr', tr: 'Şiş', level: 'B1', usageNote: 'Metal şiş; sayısı hep misafir sayısından az çıkar.' },
      { id: 'wck29_5', ru: 'Маринад', reading: 'Marinát', tr: 'Marinat / Salamura sos', level: 'B1', usageNote: 'Her ailenin "tek doğru" tarifi vardır ve hepsi farklıdır.' },
      { id: 'wck29_6', ru: 'Дым', reading: 'D\u0131m', tr: 'Duman', level: 'B1', usageNote: '"С дымком" (dumanlı/is kokulu) — şaşlığın imza tadı.' },
      { id: 'wck29_7', ru: 'Переворачивать', reading: 'Pirivaráçivat\'', tr: 'Çevirmek', level: 'B1', usageNote: 'Mangalda herkesin karışmak istediği kutsal görev.' },
      { id: 'wck29_8', ru: 'Пикник', reading: 'Pikník', tr: 'Piknik', level: 'B1', usageNote: '"Поехать на пикник" (pikniğe gitmek) — bahar klasiği.' }
    ],
    sentences: [
      { ru: 'Мясо для шашлыка маринуют с луком всю ночь.', tr: 'Şaşlık eti soğanla bütün gece marine edilir.', scrambled: ['для шашлыка', 'Мясо', 'всю ночь.', 'маринуют с луком'], correct: ['Мясо', 'для шашлыка', 'маринуют с луком', 'всю ночь.'] },
      { ru: 'Переворачивай шампуры каждые две минуты.', tr: 'Şişleri her iki dakikada bir çevir.', scrambled: ['шампуры', 'Переворачивай', 'две минуты.', 'каждые'], correct: ['Переворачивай', 'шампуры', 'каждые', 'две минуты.'] }
    ],
    sceneTitle: 'Restoran Pikniği: Sekiz Şaşlık Uzmanı',
    sceneContext: 'Ekip pikniğe çıktı. Mangalın başında bir anda sekiz "uzman" belirdi — herkesin marinat teorisi farklı, közün ideal rengi tartışmalı.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Мой маринад — с кефиром! Это секрет моего дяди!', reading: 'Moy marinát — s kifíram! Éta sikryét mayivó dyádi!', tr: 'Benim marinatım — kefirli! Bu amcamın sırrı!' },
      { speaker: 'Semyon', ru: 'Кефир?! Только лук и соль! Всё остальное — от лукавого!', reading: 'Kifír?! Tól\'ka luk i sol\'! Fsyo astal\'nóye — at lukávava!', tr: 'Kefir mi?! Sadece soğan ve tuz! Gerisi şeytan işi!' },
      { speaker: 'Şef Pyotr', ru: 'Тихо! Угли готовы. Я переворачиваю. ТОЛЬКО я переворачиваю.', reading: 'Tíha! Úgli gatóv\u0131. Ya pirivaráçivayu. TÓL\'KA ya pirivaráçivayu.', tr: 'Sessizlik! Közler hazır. Ben çeviriyorum. SADECE ben çeviriyorum.' },
      { speaker: 'Nina', ru: 'Восемь поваров, один мангал... Это будет длинный пикник.', reading: 'Vósim\' pavaróf, adín mangál... Éta búdit dlínn\u0131y pikník.', tr: 'Sekiz aşçı, bir mangal... Bu uzun bir piknik olacak.' }
    ]
  },
  {
    id: 'mod_b1_k11',
    unitNumber: 96,
    levelGroup: 'B1',
    title: 'Aşçılık 30: Baharat Dünyası',
    description: 'Sarımsak, hardal, hren, defne — Rus mutfağının vurucu ekibi',
    category: 'Aşçılık',
    color: '#c2410c',
    icon: '🌶️',
    grammarExplain: `📌 TAT SIFATLARI:
1. Острый (acı) ≠ пряный (baharatlı-aromalı): biri yakar, öteki koklatır. "Слишком острый!" (fazla acı!) şikayet kalıbıdır.
2. Добавить + tamlayan (biraz ...): "добавь чеснока" (biraz sarımsak ekle) — kısmî nesne tamlayanla verilir.
3. "В конце варки" (pişirmenin sonunda): defne yaprağı hep sonda atılır, sonra ÇIKARILIR — unutan, tabakta bulur.`,
    words: [
      { id: 'wck30_1', ru: 'Чеснок', reading: 'Çisnók', tr: 'Sarımsak', level: 'B1', usageNote: 'Borşçun gizli ortağı; "гренки с чесноком" (sarımsaklı kızarmış ekmek).' },
      { id: 'wck30_2', ru: 'Горчица', reading: 'Garçítsa', tr: 'Hardal', level: 'B1', usageNote: 'Rus hardalı (русская горчица) gözlerden yaş getirir — övgüdür.' },
      { id: 'wck30_3', ru: 'Хрен', reading: 'Hryen', tr: 'Bayır turpu (hren)', level: 'B1', usageNote: 'Etin ve balığın yanına; wasabi\'nin Slav dedesi.' },
      { id: 'wck30_4', ru: 'Зелень', reading: 'Zyélin\'', tr: 'Yeşillik', level: 'B1', usageNote: 'Dereotu+maydanoz+yeşil soğan üçlüsünün ortak adı.' },
      { id: 'wck30_5', ru: 'Лавровый лист', reading: 'Lavróv\u0131y list', tr: 'Defne yaprağı', level: 'B1', usageNote: 'Günlük dilde kısaca "лаврушка" denir.' },
      { id: 'wck30_6', ru: 'Корица', reading: 'Karítsa', tr: 'Tarçın', level: 'B1', usageNote: 'Şarlotkanın ve sıcak şarabın (глинтвейн) kokusu.' },
      { id: 'wck30_7', ru: 'Острый', reading: 'Óstr\u0131y', tr: 'Acı / Keskin', level: 'B1', usageNote: 'Hem biber hem bıçak için kullanılır — ikisi de "keskin".' },
      { id: 'wck30_8', ru: 'Пряный', reading: 'Pryán\u0131y', tr: 'Baharatlı / Aromalı', level: 'B1', usageNote: '"Пряный аромат" (baharat aroması) — kış içeceklerinin ruhu.' }
    ],
    sentences: [
      { ru: 'Добавьте лавровый лист в конце варки.', tr: 'Defne yaprağını pişirmenin sonunda ekleyin.', scrambled: ['лавровый лист', 'Добавьте', 'варки.', 'в конце'], correct: ['Добавьте', 'лавровый лист', 'в конце', 'варки.'] },
      { ru: 'Хрен — очень острая русская приправа.', tr: 'Hren — çok acı bir Rus baharatıdır.', scrambled: ['очень острая', 'Хрен —', 'приправа.', 'русская'], correct: ['Хрен —', 'очень острая', 'русская', 'приправа.'] }
    ],
    sceneTitle: 'Hren Vaftizi',
    sceneContext: 'Lyosha hayatında hiç hren tatmamış. Semyon "yumuşaktır, krem gibi" diyerek koca bir kaşık uzatıyor. Mutfak nefesini tuttu, kameralar hazır.',
    dialogue: [
      { speaker: 'Semyon', ru: 'Лёша, попробуй хрен. Он мягкий... как крем. Честно.', reading: 'Lyóşa, papróbuy hryen. On myáhkiy... kak krem. Çyésna.', tr: 'Lyosha, hren dene. Yumuşaktır... krem gibi. Yemin ederim.' },
      { speaker: 'Lyosha', ru: 'Ложку целиком? Легко! Я ел острое... А-А-А! ВОДЫ! ОГОНЬ!', reading: 'Lóşku tsélikam? Lihkó! Ya yel óstraye... A-A-A! VAD\u0130! AGÓN\'!', tr: 'Koca kaşık mı? Kolay! Ben acı yerim... A-A-A! SU! ATEŞ!' },
      { speaker: 'Nina', ru: 'Семён! Кефир ему, быстро! И хлеб!', reading: 'Simyón! Kifír yimú, b\u0131́stra! İ hlyep!', tr: 'Semyon! Kefir getir ona, çabuk! Ve ekmek!' },
      { speaker: 'Şef Pyotr', ru: 'Поздравляю, Лёша. Теперь ты настоящий русский повар.', reading: 'Pazdravlyáyu, Lyóşa. Tipyér\' t\u0131 nastayáşşiy rúskiy póvar.', tr: 'Tebrikler, Lyosha. Artık gerçek bir Rus aşçısısın.' }
    ]
  },

  // ============================ B2 ============================
  {
    id: 'mod_b2_k6',
    unitNumber: 140,
    levelGroup: 'B2',
    title: 'Aşçılık 31: Bayram Kuşları — Ördek & Kaz',
    description: 'Doldurma, tepsi, çıtır kabuk — yılbaşı sofrasının baş rolü',
    category: 'Aşçılık',
    color: '#92400e',
    icon: '🦆',
    grammarExplain: `📌 FIRIN KUŞLARI DİLİ:
1. Фаршировать (içini doldurmak): "утка, фаршированная яблоками" (elma dolgulu ördek) — sıfat-fiil menü klasiğidir.
2. Поливать соком (suyuyla gezdirmek): her yarım saatte tekrarlanır; чтобы + geçmiş kalıbıyla amaç verilir: "чтобы корочка была румяной".
3. Румяный (kızarmış/altın rengi) hem ekmek hem yanak için kullanılır — mutfakta iltifattır.`,
    words: [
      { id: 'wck31_1', ru: 'Утка', reading: 'Útka', tr: 'Ördek', level: 'B2', usageNote: '"Утка с яблоками" Rus bayram sofrasının klasiği.' },
      { id: 'wck31_2', ru: 'Гусь', reading: 'Gus\'', tr: 'Kaz', level: 'B2', usageNote: 'Yılbaşının ağır topu; "как гусь" (kaz gibi) yürüyüş de ondan.' },
      { id: 'wck31_3', ru: 'Индейка', reading: 'İndyéyka', tr: 'Hindi', level: 'B2', usageNote: 'Diyet menülerin gözdesi; "индейка" ülke "Turkey" ile karışmaz, o "Турция".' },
      { id: 'wck31_4', ru: 'Фаршировать', reading: 'Farşiravát\'', tr: 'İçini doldurmak', level: 'B2', usageNote: 'Elma, karabuğday, mantar — dolgunun sınırı hayal gücüdür.' },
      { id: 'wck31_5', ru: 'Корочка', reading: 'Kóraçka', tr: 'Çıtır kabuk', level: 'B2', usageNote: '"Хрустящая корочка" (çıtır kabuk) — fırının altın madalyası.' },
      { id: 'wck31_6', ru: 'Противень', reading: 'Prótivin\'', tr: 'Fırın tepsisi', level: 'B2', usageNote: 'Fırının sahnesi; yanık tepsi kazımak stajyerin kaderi.' },
      { id: 'wck31_7', ru: 'Поливать', reading: 'Palivát\'', tr: 'Üzerine gezdirmek', level: 'B2', usageNote: '"Поливать соком каждые полчаса" — sulu etin sırrı.' },
      { id: 'wck31_8', ru: 'Румяный', reading: 'Rumyán\u0131y', tr: 'Kızarmış / Altın rengi', level: 'B2', usageNote: 'Fırından çıkan her şeyin hedef rengi.' }
    ],
    sentences: [
      { ru: 'Утку фаршируют яблоками и запекают два часа.', tr: 'Ördeğin içi elmayla doldurulur ve iki saat fırınlanır.', scrambled: ['яблоками', 'Утку фаршируют', 'два часа.', 'и запекают'], correct: ['Утку фаршируют', 'яблоками', 'и запекают', 'два часа.'] },
      { ru: 'Поливайте гуся соком, чтобы корочка была румяной.', tr: 'Kabuğu kızarsın diye kazın üzerine suyunu gezdirin.', scrambled: ['соком,', 'Поливайте гуся', 'была румяной.', 'чтобы корочка'], correct: ['Поливайте гуся', 'соком,', 'чтобы корочка', 'была румяной.'] }
    ],
    sceneTitle: 'Yılbaşı Ördeği Nöbeti',
    sceneContext: 'Yılbaşı menüsünün yıldızı: elma dolgulu ördek. Fırının başında nöbet çizelgesi asıldı — her yarım saatte suyuyla gezdirme görevi kutsaldır.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Утка в духовке. График полива на стене. Каждые тридцать минут!', reading: 'Útka v duhófke. Gráfik palíva na stinyé. Kájd\u0131ye trítsat\' minút!', tr: 'Ördek fırında. Gezdirme çizelgesi duvarda. Her otuz dakikada!' },
      { speaker: 'Lyosha', ru: 'Моя смена! Поливаю... Шеф, корочка уже румяная. Можно кусочек?', reading: 'Mayá smyéna! Paliváyu... Şef, kóraçka ujé rumyánaya. Mójna kusóçik?', tr: 'Benim nöbetim! Gezdiriyorum... Şef, kabuk çoktan kızardı. Bir parçacık alabilir miyim?' },
      { speaker: 'Şef Pyotr', ru: 'Тронешь корочку — будешь фаршировать гуся. ОДИН.', reading: 'Tróniş kóraçku — búdiş farşiravát\' gúsya. ADÍN.', tr: 'Kabuğa dokunursan — kazı sen doldurursun. TEK BAŞINA.' },
      { speaker: 'Nina', ru: 'Запах на весь квартал... Гости уже спрашивают, что это.', reading: 'Zápah na vyes\' kvartál... Gósti ujé spráşivayut, şto éta.', tr: 'Koku bütün mahalleyi sardı... Misafirler şimdiden ne olduğunu soruyor.' }
    ]
  },
  {
    id: 'mod_b2_k7',
    unitNumber: 141,
    levelGroup: 'B2',
    title: 'Aşçılık 32: Dünya Mutfağı Rus Usulü',
    description: 'Plov, hinkali, suşi — «Ван Гог» menüsü dünya turuna çıkıyor',
    category: 'Aşçılık',
    color: '#4f46e5',
    icon: '🌍',
    grammarExplain: `📌 MUTFAKLAR ARASI DİL:
1. Yemek adları çoğu zaman çekimsiz kalır: суши, хинкали — ama плов çekimlenir (плова, пловом).
2. По-...ски kalıbı "usulünce" demektir: "по-русски" (Rus usulü), "по-грузински" (Gürcü usulü).
3. Адаптировать под + belirtme: "адаптировать рецепт под местные продукты" (tarifi yerel ürünlere uyarlamak).`,
    words: [
      { id: 'wck32_1', ru: 'Плов', reading: 'Plof', tr: 'Plov (Özbek pilavı)', level: 'B2', usageNote: 'Sovyet mirasının ortak yemeği; et, havuç, pirinç, kimyon.' },
      { id: 'wck32_2', ru: 'Хинкали', reading: 'Hinkáli', tr: 'Hinkali', level: 'B2', usageNote: 'Gürcü mantısı; kuyruğundan tutulur, suyu içilir, kuyruk yenmez!' },
      { id: 'wck32_3', ru: 'Шаурма', reading: 'Şaurmá', tr: 'Şaurma (döner dürüm)', level: 'B2', usageNote: 'Moskova\'da шаурма, Petersburg\'da шаверма — savaş sürüyor.' },
      { id: 'wck32_4', ru: 'Суши', reading: 'Súşi', tr: 'Suşi', level: 'B2', usageNote: 'Rusya\'da mayonezli "rus usulü" hâlleri de vardır; puristler ağlar.' },
      { id: 'wck32_5', ru: 'Казан', reading: 'Kazán', tr: 'Kazan', level: 'B2', usageNote: 'Bir ortak kelime daha! Plovun tek doğru kabı.' },
      { id: 'wck32_6', ru: 'Адаптировать', reading: 'Adaptíravat\'', tr: 'Uyarlamak', level: 'B2', usageNote: 'Menü geliştirmenin diplomatik fiili.' },
      { id: 'wck32_7', ru: 'Аутентичный', reading: 'Autintíçn\u0131y', tr: 'Otantik', level: 'B2', usageNote: 'Eleştirmenlerin tartısı: "аутентичный вкус" büyük övgü.' },
      { id: 'wck32_8', ru: 'Фьюжн', reading: 'F\'yújn', tr: 'Füzyon', level: 'B2', usageNote: 'İki mutfağın evliliği; Şef Pyotr\'a göre "çoğu zaman boşanma".' }
    ],
    sentences: [
      { ru: 'Плов готовят в казане на открытом огне.', tr: 'Plov kazanda açık ateşte pişirilir.', scrambled: ['в казане', 'Плов готовят', 'огне.', 'на открытом'], correct: ['Плов готовят', 'в казане', 'на открытом', 'огне.'] },
      { ru: 'Шеф не любит фьюжн, но обожает хинкали.', tr: 'Şef füzyonu sevmez ama hinkaliye bayılır.', scrambled: ['фьюжн,', 'Шеф не любит', 'хинкали.', 'но обожает'], correct: ['Шеф не любит', 'фьюжн,', 'но обожает', 'хинкали.'] }
    ],
    sceneTitle: 'Menü Dünya Turu Krizi',
    sceneContext: 'Yönetim "gençler için" menüye dünya mutfağı köşesi istiyor. Lyosha suşi-borşç füzyonu öneriyor. Şef Pyotr\'un kaşları rekor yükseklikte.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Идея века: суши со свёклой! Борщ-ролл! Мы станем знаменитыми!', reading: 'İdyéya vyéka: súşi sa svyóklay! Borşç-roll! M\u0131 stánim znaminít\u0131mi!', tr: 'Asrın fikri: pancarlı suşi! Borşç-roll! Ünlü olacağız!' },
      { speaker: 'Şef Pyotr', ru: 'Борщ-ролл... Лёша, это не фьюжн. Это преступление против ДВУХ стран.', reading: 'Borşç-roll... Lyóşa, éta ni f\'yújn. Éta pristupléniye prótif DVUH stran.', tr: 'Borşç-roll... Lyosha, bu füzyon değil. Bu İKİ ülkeye karşı işlenmiş bir suç.' },
      { speaker: 'Nina', ru: 'А если честно: плов в казане, хинкали по-грузински. Аутентично.', reading: 'A yésli çyésna: plof f kazáne, hinkáli pa-gruzínski. Autintíçna.', tr: 'Ama dürüst olalım: kazanda plov, Gürcü usulü hinkali. Otantik.' },
      { speaker: 'Şef Pyotr', ru: 'Вот это — меню! Едем на рынок за бараниной и кинзой.', reading: 'Vot éta — minyú! Yédim na r\u0131́nak za baráninay i kinzóy.', tr: 'İşte bu — menü! Kuzu eti ve kişniş için pazara gidiyoruz.' }
    ]
  },
  {
    id: 'mod_b2_k8',
    unitNumber: 142,
    levelGroup: 'B2',
    title: 'Aşçılık 33: Peynir & Şarküteri Tabağı',
    description: 'Füme, kurutulmuş, ince dilim — degüstasyon tabağı kurma sanatı',
    category: 'Aşçılık',
    color: '#ca8a04',
    icon: '🧀',
    grammarExplain: `📌 ŞARKÜTERİ SÖZLÜĞÜ:
1. Sıfat-fiiller ürün adı olur: копчёный (füme), вяленый (kurutulmuş), солёный (salamura) — hepsi işlemin adını taşır.
2. Тонкими ломтиками (ince dilimler hâlinde) — araç hâli "nasıl kesileceğini" anlatır.
3. Подавать с + araç: "подавать с мёдом и виноградом" (bal ve üzümle servis etmek).`,
    words: [
      { id: 'wck33_1', ru: 'Ассорти', reading: 'Assartí', tr: 'Karışık tabak', level: 'B2', usageNote: 'Çekimsizdir: "сырное ассорти" (peynir tabağı).' },
      { id: 'wck33_2', ru: 'Копчёный', reading: 'Kapçyón\u0131y', tr: 'Füme', level: 'B2', usageNote: '"Копчёная колбаса" — dumanın imzasını taşıyan her şey.' },
      { id: 'wck33_3', ru: 'Вяленый', reading: 'Vyálin\u0131y', tr: 'Kurutulmuş', level: 'B2', usageNote: '"Вяленые томаты" (kurutulmuş domates) modern menü demirbaşı.' },
      { id: 'wck33_4', ru: 'Нарезка', reading: 'Naryéska', tr: 'Şarküteri tabağı / Dilimleme', level: 'B2', usageNote: 'Rus bayram masasının açılış hamlesi: "мясная нарезка".' },
      { id: 'wck33_5', ru: 'Ломтик', reading: 'Lómtik', tr: 'İnce dilim', level: 'B2', usageNote: '"Тонкий ломтик" ne kadar inceyse usta o kadar büyüktür.' },
      { id: 'wck33_6', ru: 'Виноград', reading: 'Vinagrát', tr: 'Üzüm', level: 'B2', usageNote: 'Peynir tabağının vazgeçilmez süsü ve tatlı dengesi.' },
      { id: 'wck33_7', ru: 'Оливки', reading: 'Alífki', tr: 'Zeytin', level: 'B2', usageNote: 'Yeşili оливки, siyahı маслины — Rusça ikisini ayırır!' },
      { id: 'wck33_8', ru: 'Подать', reading: 'Padát\'', tr: 'Servis etmek', level: 'B2', usageNote: '"Как подать?" (nasıl servis edelim?) — sunumun ilk sorusu.' }
    ],
    sentences: [
      { ru: 'Сырное ассорти подают с мёдом, орехами и виноградом.', tr: 'Peynir tabağı bal, ceviz ve üzümle servis edilir.', scrambled: ['подают', 'Сырное ассорти', 'и виноградом.', 'с мёдом, орехами'], correct: ['Сырное ассорти', 'подают', 'с мёдом, орехами', 'и виноградом.'] },
      { ru: 'Нарежьте копчёную колбасу тонкими ломтиками.', tr: 'Füme sosisi ince dilimler hâlinde kesin.', scrambled: ['копчёную колбасу', 'Нарежьте', 'ломтиками.', 'тонкими'], correct: ['Нарежьте', 'копчёную колбасу', 'тонкими', 'ломтиками.'] }
    ],
    sceneTitle: 'Degüstasyon Tabağı Atölyesi',
    sceneContext: 'Yeni şarap menüsü için peynir-şarküteri tabakları tasarlanıyor. Nina simetri istiyor, Lyosha "bolluk estetiği" savunuyor, Semyon üzüm tanelerini sayıyor.',
    dialogue: [
      { speaker: 'Nina', ru: 'Схема: сыр — слева, копчёности — справа, мёд и орехи — в центре.', reading: 'Shyéma: s\u0131r — slyéva, kapçyónasti — správa, myot i aryéhi — f tséntre.', tr: 'Şema: peynir — solda, fümeler — sağda, bal ve cevizler — ortada.' },
      { speaker: 'Lyosha', ru: 'А я кладу всё горой! Гость видит гору — гость счастлив!', reading: 'A ya kladú fsyo garóy! Gost\' vídit góru — gost\' şşáslif!', tr: 'Bense hepsini dağ gibi yığıyorum! Misafir dağı görür — misafir mutlu olur!' },
      { speaker: 'Semyon', ru: 'По протоколу: девять виноградин на тарелку. Ни больше, ни меньше.', reading: 'Pa pratakólu: dyévit\' vinagrádin na taryélku. Ni ból\'şe, ni myén\'şe.', tr: 'Protokole göre: tabak başına dokuz üzüm tanesi. Ne fazla, ne eksik.' },
      { speaker: 'Şef Pyotr', ru: 'Решение: схема Нины, щедрость Лёши, точность Семёна. Идеальная нарезка!', reading: 'Rişéniye: shyéma Nín\u0131, şşyédrast\' Lyóşi, tóçnast\' Simyóna. İdiál\'naya naryéska!', tr: 'Karar: Nina\'nın şeması, Lyosha\'nın cömertliği, Semyon\'un hassasiyeti. Kusursuz tabak!' }
    ]
  },
  {
    id: 'mod_b2_k9',
    unitNumber: 143,
    levelGroup: 'B2',
    title: 'Aşçılık 34: Yemek & İçecek Eşleşmesi',
    description: 'Aroma, buruk, köpüklü — "ete kırmızı, balığa beyaz" ve ötesi',
    category: 'Aşçılık',
    color: '#be185d',
    icon: '🥂',
    grammarExplain: `📌 EŞLEŞTİRME (СОЧЕТАНИЕ) DİLİ:
1. К + yönelme hâli eşleşmeyi kurar: "к мясу — красное, к рыбе — белое" (ete kırmızı, balığa beyaz).
2. Подчеркнуть (vurgulamak): "вино подчёркивает вкус блюда" (şarap yemeğin tadını öne çıkarır) — sommelier fiili.
3. Küçültme ekleri tat nüansı yapar: кислинка (hafif ekşilik), горчинка (hafif buruk acılık) — profesyonel incelik.`,
    words: [
      { id: 'wck34_1', ru: 'Напиток', reading: 'Napítak', tr: 'İçecek', level: 'B2', usageNote: '"Прохладительные напитки" (serinletici içecekler) menü başlığıdır.' },
      { id: 'wck34_2', ru: 'Бокал', reading: 'Bakál', tr: 'Kadeh', level: 'B2', usageNote: 'Her içeceğin kendi kadehi vardır; karıştıran, Semyon\'la tanışır.' },
      { id: 'wck34_3', ru: 'Аромат', reading: 'Aramát', tr: 'Aroma', level: 'B2', usageNote: '"Раскрыть аромат" (aromayı açmak) — degüstasyonun ilk adımı.' },
      { id: 'wck34_4', ru: 'Терпкий', reading: 'Tyérpkiy', tr: 'Buruk', level: 'B2', usageNote: 'Nar ve güçlü çayın ortak sıfatı.' },
      { id: 'wck34_5', ru: 'Кислинка', reading: 'Kislínka', tr: 'Hafif ekşilik', level: 'B2', usageNote: 'Kusur değil, karakter: "приятная кислинка" (hoş bir ekşilik).' },
      { id: 'wck34_6', ru: 'Сладость', reading: 'Sládast\'', tr: 'Tatlılık', level: 'B2', usageNote: 'Tatlı-ekşi dengesinin bir kefesi.' },
      { id: 'wck34_7', ru: 'Подчеркнуть', reading: 'Patçirknút\'', tr: 'Vurgulamak / Öne çıkarmak', level: 'B2', usageNote: 'İyi eşleşme bastırmaz, "подчёркивает".' },
      { id: 'wck34_8', ru: 'Игристое', reading: 'İgrístaye', tr: 'Köpüklü (içecek)', level: 'B2', usageNote: '"Играть" (oynamak) kökünden: kabarcıklar kadehte "oynar".' }
    ],
    sentences: [
      { ru: 'Красное вино подчёркивает вкус мяса.', tr: 'Kırmızı şarap etin tadını öne çıkarır.', scrambled: ['подчёркивает', 'Красное вино', 'мяса.', 'вкус'], correct: ['Красное вино', 'подчёркивает', 'вкус', 'мяса.'] },
      { ru: 'К рыбе подают белое, а к десерту — игристое.', tr: 'Balığın yanında beyaz, tatlının yanında köpüklü servis edilir.', scrambled: ['белое,', 'К рыбе подают', '— игристое.', 'а к десерту'], correct: ['К рыбе подают', 'белое,', 'а к десерту', '— игристое.'] }
    ],
    sceneTitle: 'Semyon\'un Eşleştirme Akademisi',
    sceneContext: 'Metrdotel Semyon, gençlere içecek eşleştirme semineri veriyor. Kurallar kesin, istisnalar daha da kesin. Lyosha "kompotla her şey gider" tezini savunuyor.',
    dialogue: [
      { speaker: 'Semyon', ru: 'Правило первое: к мясу — терпкое красное. Оно подчёркивает вкус.', reading: 'Právila pyérvaye: k myásu — tyérpkaye krásnaye. Anó patçyórkivayit fkus.', tr: 'Birinci kural: ete — buruk kırmızı. Tadı öne çıkarır.' },
      { speaker: 'Lyosha', ru: 'А моё правило: компот подходит ко всему. Проверено детством!', reading: 'A mayó právila: kampót pathódit ka fsimú. Pravyérina dyétstvam!', tr: 'Benim kuralım: komposto her şeyle gider. Çocuklukta test edildi!' },
      { speaker: 'Semyon', ru: 'Компот... к устрицам, Лёша? К УСТРИЦАМ?!', reading: 'Kampót... k ústritsam, Lyóşa? K ÚSTRİTSAM?!', tr: 'Komposto... istiridyeyle mi, Lyosha? İSTİRİDYEYLE Mİ?!' },
      { speaker: 'Nina', ru: 'Записываю: к десерту — игристое, к Лёше — терпение.', reading: 'Zapís\u0131vayu: k disyértu — igrístaye, k Lyóşe — tirpyéniye.', tr: 'Not alıyorum: tatlıya — köpüklü, Lyosha\'ya — sabır.' }
    ]
  },
  {
    id: 'mod_b2_k10',
    unitNumber: 144,
    levelGroup: 'B2',
    title: 'Aşçılık 35: Mutfak Yönetimi — Stok & Sipariş',
    description: 'Sayım, irsaliye, ön hazırlık — mutfağın görünmeyen matematiği',
    category: 'Aşçılık',
    color: '#475569',
    icon: '📦',
    grammarExplain: `📌 MUTFAK OFİSİ DİLİ:
1. Списать (zayi yazmak) muhasebe fiilidir: "списать просроченный йогурт" — üzücü ama zorunlu.
2. Заготовка çift anlamlıdır: hem kışlık hazırlık hem restoranın "mise en place"ı (ön hazırlık).
3. Сэкономить на + yer hâli: "сэкономить на времени" (zamandan kazanmak) — ama asla "на качестве" (kaliteden) değil!`,
    words: [
      { id: 'wck35_1', ru: 'Инвентаризация', reading: 'İnvintarizátsiya', tr: 'Sayım / Envanter', level: 'B2', usageNote: 'Ay sonunun uzun gecesi; kavanozlar bile sayılır.' },
      { id: 'wck35_2', ru: 'Накладная', reading: 'Nakladnáya', tr: 'İrsaliye', level: 'B2', usageNote: 'Teslimatın kimliği; "проверить по накладной" (irsaliyeden kontrol etmek).' },
      { id: 'wck35_3', ru: 'Заготовка', reading: 'Zagatófka', tr: 'Ön hazırlık (mise en place)', level: 'B2', usageNote: 'Servis öncesi doğranmış, porsiyonlanmış her şey.' },
      { id: 'wck35_4', ru: 'Полуфабрикат', reading: 'Polufabrikát', tr: 'Yarı mamul', level: 'B2', usageNote: 'Kısaca "полуфабрикаты"; iyi mutfak kendininkini kendi yapar.' },
      { id: 'wck35_5', ru: 'Списать', reading: 'Spisát\'', tr: 'Zayi yazmak', level: 'B2', usageNote: 'Stok defterinin en sevilmeyen fiili.' },
      { id: 'wck35_6', ru: 'Экономить', reading: 'Ekanómit\'', tr: 'Tasarruf etmek', level: 'B2', usageNote: 'Zamandan evet, kaliteden asla — şef anayasası.' },
      { id: 'wck35_7', ru: 'Излишки', reading: 'İzlíşki', tr: 'Fazlalık / Artan stok', level: 'B2', usageNote: 'İyi şef fazlalığı çöpe değil, "günün çorbasına" çevirir.' },
      { id: 'wck35_8', ru: 'Поставка', reading: 'Pastáfka', tr: 'Teslimat / Sevkiyat', level: 'B2', usageNote: '"Утренняя поставка" (sabah teslimatı) mutfağın çalar saati.' }
    ],
    sentences: [
      { ru: 'Утром — инвентаризация, вечером — заказ поставщику.', tr: 'Sabah — sayım, akşam — tedarikçiye sipariş.', scrambled: ['— инвентаризация,', 'Утром', 'поставщику.', 'вечером — заказ'], correct: ['Утром', '— инвентаризация,', 'вечером — заказ', 'поставщику.'] },
      { ru: 'Хорошие заготовки экономят время в аврал.', tr: 'İyi ön hazırlık, yoğunlukta zaman kazandırır.', scrambled: ['заготовки', 'Хорошие', 'в аврал.', 'экономят время'], correct: ['Хорошие', 'заготовки', 'экономят время', 'в аврал.'] }
    ],
    sceneTitle: 'Kayıp Reçel Kavanozları Dosyası',
    sceneContext: 'Aylık sayım gecesi. Defterde 47 kavanoz görünüyor, rafta 39 var. Nina dedektif modunda; şüpheli listesinde tek bir isim var ve o isim çay bardağını saklıyor.',
    dialogue: [
      { speaker: 'Nina', ru: 'Инвентаризация не сходится. По накладной — сорок семь банок варенья. На складе — тридцать девять.', reading: 'İnvintarizátsiya ni shóditsa. Pa nakladnóy — sórak syem\' bának varyén\'ya. Na skládye — trítsat\' dyévit\'.', tr: 'Sayım tutmuyor. İrsaliyeye göre — kırk yedi kavanoz reçel. Depoda — otuz dokuz.' },
      { speaker: 'Lyosha', ru: '(медленно прячет чашку) Может... банки испарились? Наука знает случаи!', reading: '(myédlinna pryáçit çáşku) Mójit... bánki isparílis\'? Naúka znáyit slúçai!', tr: '(çay bardağını yavaşça saklar) Belki... kavanozlar buharlaşmıştır? Bilim böyle vakalar biliyor!' },
      { speaker: 'Şef Pyotr', ru: 'Лёша. Восемь банок. ВОСЕМЬ. Ты пил чай с вареньем каждый вечер?!', reading: 'Lyóşa. Vósim\' bának. VÓSİM\'. T\u0131 pil çay s varyén\'yem kájd\u0131y vyéçir?!', tr: 'Lyosha. Sekiz kavanoz. SEKİZ. Her akşam reçelli çay mı içtin?!' },
      { speaker: 'Lyosha', ru: 'Это была... дегустация качества! Спишите на обучение персонала!', reading: 'Éta b\u0131lá... digustátsiya káçistva! Spişíte na abuçyéniye pirsanála!', tr: 'Bu bir... kalite degüstasyonuydu! Personel eğitimi olarak zayi yazın!' }
    ]
  },

  // ============================ C1 ============================
  {
    id: 'mod_c1_k5',
    unitNumber: 179,
    levelGroup: 'C1/C2',
    title: 'Aşçılık 36: Moleküler Gastronomi',
    description: 'Köpük, küre, sıvı azot — mutfakta bilim kurgu gecesi',
    category: 'Aşçılık',
    color: '#0891b2',
    icon: '🧪',
    grammarExplain: `📌 BİLİMSEL MUTFAK DİLİ:
1. Превращать/превратить в + belirtme (dönüştürmek): "азот превращает соус в мороженое" (azot sosu dondurmaya çevirir).
2. Не еда, а впечатление (yemek değil, deneyim) — не..., а... zıtlık kalıbı sunum cümlelerinin yıldızıdır.
3. Bilim sözlüğü mutfağa taşınır: сфера, пена, эксперимент — hepsi tabakta yaşar artık.`,
    words: [
      { id: 'wck36_1', ru: 'Молекулярный', reading: 'Malikulyárn\u0131y', tr: 'Moleküler', level: 'C1/C2', usageNote: '"Молекулярная кухня" — gastronominin laboratuvar kanadı.' },
      { id: 'wck36_2', ru: 'Сфера', reading: 'Sfyéra', tr: 'Küre', level: 'C1/C2', usageNote: 'Сферификация: sıvıyı incecik zarlı toplara çevirme tekniği.' },
      { id: 'wck36_3', ru: 'Пена', reading: 'Pyéna', tr: 'Köpük (espuma)', level: 'C1/C2', usageNote: 'Menüde "эспума" olarak da geçer; tadın en hafif hâli.' },
      { id: 'wck36_4', ru: 'Азот', reading: 'Azót', tr: 'Azot (nitrojen)', level: 'C1/C2', usageNote: '"Жидкий азот" (-196°C) — masada sis şovunun kaynağı.' },
      { id: 'wck36_5', ru: 'Желе', reading: 'Jelé', tr: 'Jöle', level: 'C1/C2', usageNote: 'Çekimsizdir; moleküler mutfakta her sıvı jöle olabilir.' },
      { id: 'wck36_6', ru: 'Эксперимент', reading: 'Ekspirimyént', tr: 'Deney', level: 'C1/C2', usageNote: '"Проводить эксперимент" (deney yapmak) artık mutfak cümlesi.' },
      { id: 'wck36_7', ru: 'Неожиданный', reading: 'Niajídann\u0131y', tr: 'Beklenmedik', level: 'C1/C2', usageNote: '"Неожиданная текстура" — moleküler menünün vaadi.' },
      { id: 'wck36_8', ru: 'Впечатление', reading: 'Fpiçitlyéniye', tr: 'İzlenim / Deneyim', level: 'C1/C2', usageNote: '"Произвести впечатление" (etki bırakmak) — fine dining hedefi.' }
    ],
    sentences: [
      { ru: 'Жидкий азот превращает соус в мороженое за секунду.', tr: 'Sıvı azot, sosu bir saniyede dondurmaya çevirir.', scrambled: ['превращает соус', 'Жидкий азот', 'за секунду.', 'в мороженое'], correct: ['Жидкий азот', 'превращает соус', 'в мороженое', 'за секунду.'] },
      { ru: 'Гость ждёт не просто еду, а впечатление.', tr: 'Misafir sadece yemek değil, deneyim bekler.', scrambled: ['не просто еду,', 'Гость ждёт', 'впечатление.', 'а'], correct: ['Гость ждёт', 'не просто еду,', 'а', 'впечатление.'] }
    ],
    sceneTitle: 'Bilim Kurgu Gecesi: Lyosha\'nın Laboratuvarı',
    sceneContext: 'Kafe sahibi Lyosha, eski ustasını ziyarete sıvı azot tüpüyle gelmiş. Bir gecelik "moleküler menü" deneyi: borşç köpüğü, smetana küreleri. Pyotr önce homurdanıyor, sonra... etkileniyor.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Шеф, смотрите: борщ... но это пена! А это сфера из сметаны!', reading: 'Şef, smatríte: borşç... no éta pyéna! A éta sfyéra is smitán\u0131!', tr: 'Şef, bakın: borşç... ama köpük hâlinde! Bu da smetana küresi!' },
      { speaker: 'Şef Pyotr', ru: 'Ты превратил суп моей бабушки в... мыльные пузыри?!', reading: 'T\u0131 privratíl sup mayéy bábuşki v... m\u0131́l\'n\u0131ye puz\u0131rí?!', tr: 'Büyükannemin çorbasını... sabun köpüğüne mi çevirdin?!' },
      { speaker: 'Lyosha', ru: 'Попробуйте сначала! Вкус тот же — текстура неожиданная!', reading: 'Papróbuyte snaçála! Fkus tot je — tikstúra niajídannaya!', tr: 'Önce tadın! Tat aynı — doku beklenmedik!' },
      { speaker: 'Şef Pyotr', ru: '...Хм. Вкус бабушкин. Наука, а душа осталась. Ладно, эксперимент принят!', reading: '...Hm. Fkus bábuşkin. Naúka, a duşá astálas\'. Ládna, ekspirimyént prínyat!', tr: '...Hım. Tat büyükannemin tadı. Bilim var ama ruh kalmış. Tamam, deney kabul edildi!' }
    ]
  },
  {
    id: 'mod_c1_k6',
    unitNumber: 180,
    levelGroup: 'C1/C2',
    title: 'Aşçılık 37: Tarladan Sofraya',
    description: 'Mevsimsellik, yerel üretici, menşe — yeni menü felsefesi',
    category: 'Aşçılık',
    color: '#16a34a',
    icon: '🌱',
    grammarExplain: `📌 SÜRDÜRÜLEBİLİR MUTFAK DİLİ:
1. По сезону (mevsimine göre): "меню меняется по сезону" — ПО dağılım bildirir.
2. Происхождение (menşe): "знать происхождение каждого продукта" (her ürünün menşeini bilmek) — modern şefin kartviziti.
3. От фермера / с грядки (çiftçiden / tarhtan) — tazeliğin edatlı kanıtları; menülerde pazarlama diline dönüşmüştür.`,
    words: [
      { id: 'wck37_1', ru: 'Сезонность', reading: 'Sizónnast\'', tr: 'Mevsimsellik', level: 'C1/C2', usageNote: 'Menünün takvimle dansı: ilkbahar kuzukulağı, sonbahar balkabağı.' },
      { id: 'wck37_2', ru: 'Фермер', reading: 'Fyérmir', tr: 'Çiftçi', level: 'C1/C2', usageNote: '"Фермерские продукты" etiketi fiyatı ikiye katlar.' },
      { id: 'wck37_3', ru: 'Локальный', reading: 'Lakál\'n\u0131y', tr: 'Yerel', level: 'C1/C2', usageNote: '"Локальные продукты" — az yol, çok tat felsefesi.' },
      { id: 'wck37_4', ru: 'Экологичный', reading: 'Ekalagíçn\u0131y', tr: 'Çevre dostu', level: 'C1/C2', usageNote: 'Kısaca "эко-"; ambalajdan menü diline sızdı.' },
      { id: 'wck37_5', ru: 'Происхождение', reading: 'Praishajdyéniye', tr: 'Menşe / Köken', level: 'C1/C2', usageNote: 'Peynirin köyü, balığın gölü — hikaye satar.' },
      { id: 'wck37_6', ru: 'Грядка', reading: 'Gryátka', tr: 'Sebze tarhı', level: 'C1/C2', usageNote: '"С грядки на стол" (tarhtan sofraya) sloganın Rusçası.' },
      { id: 'wck37_7', ru: 'Устойчивый', reading: 'Ustóyçiv\u0131y', tr: 'Sürdürülebilir', level: 'C1/C2', usageNote: '"Устойчивое развитие" mutfağa da geldi: sıfır israf.' },
      { id: 'wck37_8', ru: 'Философия', reading: 'Filasófiya', tr: 'Felsefe', level: 'C1/C2', usageNote: '"Философия кухни" — menünün önsözü, şefin manifestosu.' }
    ],
    sentences: [
      { ru: 'Меню меняется по сезону: весной — зелень, осенью — тыква.', tr: 'Menü mevsime göre değişir: ilkbaharda yeşillik, sonbaharda balkabağı.', scrambled: ['по сезону:', 'Меню меняется', 'осенью — тыква.', 'весной — зелень,'], correct: ['Меню меняется', 'по сезону:', 'весной — зелень,', 'осенью — тыква.'] },
      { ru: 'Шеф знает происхождение каждого продукта на кухне.', tr: 'Şef mutfaktaki her ürünün menşeini bilir.', scrambled: ['происхождение', 'Шеф знает', 'на кухне.', 'каждого продукта'], correct: ['Шеф знает', 'происхождение', 'каждого продукта', 'на кухне.'] }
    ],
    sceneTitle: 'Şafakta Çiftçi Pazarı',
    sceneContext: 'Sabah beş: Şef Pyotr ve ekip çiftçi pazarında. Her tezgâhta eski dostları var; domatesin kokusuna göre alınıyor, fatura değil el sıkışma geçiyor.',
    dialogue: [
      { speaker: 'Şef Pyotr', ru: 'Утро начинается не с кофе, а с рынка. Нюхайте помидоры!', reading: 'Útra naçináyitsa ni s kófe, a s r\u0131́nka. Nyúhayte pamidór\u0131!', tr: 'Sabah kahveyle değil, pazarla başlar. Domatesleri koklayın!' },
      { speaker: 'Nina', ru: 'Этот фермер привозит зелень прямо с грядки. Срезана час назад.', reading: 'État fyérmir privózit zyélin\' pryáma s gryátki. Sryézana ças nazát.', tr: 'Bu çiftçi yeşilliği doğrudan tarhtan getiriyor. Bir saat önce kesilmiş.' },
      { speaker: 'Lyosha', ru: 'В моём кафе теперь тоже сезонное меню! Осенью — блины с тыквой!', reading: 'V mayóm kafé tipyér\' tóje sizónnaye minyú! Ósin\'yu — bliný s t\u0131́kvay!', tr: 'Benim kafede de artık mevsimlik menü var! Sonbaharda — balkabaklı krep!' },
      { speaker: 'Şef Pyotr', ru: 'Локальные продукты, ноль отходов. Это не мода, Лёша. Это уважение.', reading: 'Lakál\'n\u0131ye pradúkt\u0131, nol\' athódaf. Éta ni móda, Lyóşa. Éta uvajéniye.', tr: 'Yerel ürünler, sıfır israf. Bu moda değil, Lyosha. Bu saygı.' }
    ]
  },
  {
    id: 'mod_c1_k7',
    unitNumber: 181,
    levelGroup: 'C1/C2',
    title: 'Aşçılık 38: Michelin Yıldızı Peşinde',
    description: 'Jüri, standart, kusursuzluk — «Ван Гог» büyük sınava hazırlanıyor',
    category: 'Aşçılık',
    color: '#facc15',
    icon: '⭐',
    grammarExplain: `📌 YÜKSEK STANDART DİLİ:
1. Претендовать на + belirtme (aday olmak): "ресторан претендует на звезду" (restoran yıldıza aday).
2. От... до... (–den –e kadar): "от подачи до салфетки" (sunumdan peçeteye kadar) — kapsam kalıbı.
3. Безупречный (kusursuz) > идеальный: eleştirmen sözlüğünde en yüksek not; "безупречный сервис" hedefin adıdır.`,
    words: [
      { id: 'wck38_1', ru: 'Звезда', reading: 'Zvizdá', tr: 'Yıldız', level: 'C1/C2', usageNote: '"Звезда Мишлен" — mutfak dünyasının Oscar\'ı.' },
      { id: 'wck38_2', ru: 'Конкурс', reading: 'Kónkurs', tr: 'Yarışma', level: 'C1/C2', usageNote: '"Кулинарный конкурс" kariyer asansörüdür.' },
      { id: 'wck38_3', ru: 'Жюри', reading: 'Jürí', tr: 'Jüri', level: 'C1/C2', usageNote: 'Çekimsizdir ve nötrdür: "жюри решило" (jüri karar verdi).' },
      { id: 'wck38_4', ru: 'Репутация', reading: 'Riputátsiya', tr: 'İtibar', level: 'C1/C2', usageNote: 'Yıllarca pişer, bir soğuk çorbayla dökülür.' },
      { id: 'wck38_5', ru: 'Стандарт', reading: 'Standárt', tr: 'Standart', level: 'C1/C2', usageNote: '"Держать стандарт" (standardı korumak) her gün yeniden başlar.' },
      { id: 'wck38_6', ru: 'Безупречный', reading: 'Bizupryéçn\u0131y', tr: 'Kusursuz', level: 'C1/C2', usageNote: '"Упрёк" (sitem) kökünden: sitem edilecek hiçbir şey yok.' },
      { id: 'wck38_7', ru: 'Оценка', reading: 'Atsénka', tr: 'Değerlendirme / Puan', level: 'C1/C2', usageNote: 'Okuldan restorana aynı heyecan: "Какая оценка?"' },
      { id: 'wck38_8', ru: 'Претендовать', reading: 'Pritindavát\'', tr: 'Aday olmak', level: 'C1/C2', usageNote: 'İddialı fiil; arkasında kanıt ister.' }
    ],
    sentences: [
      { ru: 'Наш ресторан претендует на первую звезду.', tr: 'Restoranımız ilk yıldıza aday.', scrambled: ['претендует', 'Наш ресторан', 'звезду.', 'на первую'], correct: ['Наш ресторан', 'претендует', 'на первую', 'звезду.'] },
      { ru: 'Жюри оценивает всё — от подачи до салфетки.', tr: 'Jüri her şeyi değerlendirir — sunumdan peçeteye kadar.', scrambled: ['всё —', 'Жюри оценивает', 'до салфетки.', 'от подачи'], correct: ['Жюри оценивает', 'всё —', 'от подачи', 'до салфетки.'] }
    ],
    sceneTitle: 'Gizli Müfettiş Alarmı',
    sceneContext: 'Söylenti kesin kaynaktan: bu hafta Moskova\'da Michelin müfettişleri geziyor. Artık her misafir potansiyel jüri — masa 4\'teki adam neden peçeteyi iki kez katladı?!',
    dialogue: [
      { speaker: 'Nina', ru: 'Столик четыре: один гость, блокнот, заказал ПОЛОВИНУ меню. Это ОН.', reading: 'Stólik çit\u0131́ri: adín gost\', blaknót, zakazál PALAVÍNU minyú. Éta ON.', tr: 'Dört numaralı masa: tek misafir, not defteri, menünün YARISINI sipariş etti. Bu O.' },
      { speaker: 'Şef Pyotr', ru: 'Спокойно. Мы не готовим для звезды. Мы готовим безупречно — для КАЖДОГО.', reading: 'Spakóyna. M\u0131 ni gatóvim dlya zvizd\u0131́. M\u0131 gatóvim bizupryéçna — dlya KÁJDAVA.', tr: 'Sakin. Biz yıldız için pişirmiyoruz. Biz kusursuz pişiriyoruz — HERKES için.' },
      { speaker: 'Semyon', ru: 'Салфетки выровнены по линейке. Бокалы сияют. Я готов к инспекции.', reading: 'Salfyétki v\u0131́ravnin\u0131 pa linyéyke. Bakál\u0131 siyáyut. Ya gatóf k inspyéktsii.', tr: 'Peçeteler cetvelle hizalandı. Kadehler parlıyor. Teftişe hazırım.' },
      { speaker: 'Nina', ru: '(через час) Он доел, улыбнулся и... оставил чаевые. Хороший знак или плохой?!', reading: '(çyéris ças) On dayél, ul\u0131bnúlsya i... astávil çiyiv\u0131́ye. Haróşiy znak íli plahóy?!', tr: '(bir saat sonra) Yemeğini bitirdi, gülümsedi ve... bahşiş bıraktı. İyiye işaret mi, kötüye mi?!' }
    ]
  },
  {
    id: 'mod_c1_k8',
    unitNumber: 182,
    levelGroup: 'C1/C2',
    title: 'Aşçılık 39: Ekip Yönetimi & Mentorluk',
    description: 'Usta, stajyer, güven — Lyosha\'nın kendi çırağı var artık',
    category: 'Aşçılık',
    color: '#2563eb',
    icon: '🤝',
    grammarExplain: `📌 LİDERLİK DİLİ:
1. Не..., а... zıtlığı yönetim felsefesini kurar: "Наставник не кричит, а вдохновляет" (Mentor bağırmaz, ilham verir).
2. Делегировать + yönelme: "делегировать задачи стажёру" (görevleri stajyere devretmek).
3. Soyut isimler -ость ile: ответственность (sorumluluk), уверенность (özgüven) — C1 seviyesinin imza ekleri.`,
    words: [
      { id: 'wck39_1', ru: 'Наставник', reading: 'Nastávnik', tr: 'Mentor / Usta', level: 'C1/C2', usageNote: 'Kelimenin içinde "наставить" (yol göstermek) fiili yaşar.' },
      { id: 'wck39_2', ru: 'Стажёр', reading: 'Stajór', tr: 'Stajyer', level: 'C1/C2', usageNote: 'Her şefin başlangıç noktası; soğan istasyonunun sahibi.' },
      { id: 'wck39_3', ru: 'Дисциплина', reading: 'Distsiplína', tr: 'Disiplin', level: 'C1/C2', usageNote: '"Кухня держится на дисциплине" — Pyotr okulunun ilk maddesi.' },
      { id: 'wck39_4', ru: 'Иерархия', reading: 'İyirárhiya', tr: 'Hiyerarşi', level: 'C1/C2', usageNote: 'Şef → su-şef → istasyon şefi → stajyer: mutfağın ordusu.' },
      { id: 'wck39_5', ru: 'Делегировать', reading: 'Diligíravat\'', tr: 'Devretmek', level: 'C1/C2', usageNote: 'Yöneticiliğin en zor dersi: bırakabilmek.' },
      { id: 'wck39_6', ru: 'Вдохновлять', reading: 'Vdahnavlyát\'', tr: 'İlham vermek', level: 'C1/C2', usageNote: '"Вдох" (nefes alma) kökünden: birine ruh üflemek.' },
      { id: 'wck39_7', ru: 'Ответственность', reading: 'Atvyétstvinnast\'', tr: 'Sorumluluk', level: 'C1/C2', usageNote: '"Взять на себя ответственность" (sorumluluğu üstlenmek).' },
      { id: 'wck39_8', ru: 'Доверие', reading: 'Davyériye', tr: 'Güven', level: 'C1/C2', usageNote: 'Mutfakta en pahalı malzeme; geç kazanılır, çabuk yanar.' }
    ],
    sentences: [
      { ru: 'Хороший наставник не кричит, а вдохновляет.', tr: 'İyi bir mentor bağırmaz, ilham verir.', scrambled: ['не кричит,', 'Хороший наставник', 'вдохновляет.', 'а'], correct: ['Хороший наставник', 'не кричит,', 'а', 'вдохновляет.'] },
      { ru: 'Лёша теперь сам учит стажёра чистить лук.', tr: 'Lyosha artık stajyere soğan soymayı kendisi öğretiyor.', scrambled: ['сам учит', 'Лёша теперь', 'чистить лук.', 'стажёра'], correct: ['Лёша теперь', 'сам учит', 'стажёра', 'чистить лук.'] }
    ],
    sceneTitle: 'Tam Döngü: Lyosha\'nın Stajyeri Ağlıyor',
    sceneContext: '«Блин!» kafeye ilk stajyer geldi: 19 yaşında, hevesli, sakar. İlk görevi soğan doğramak. Lyosha bir anda yıllar öncesini — kendi gözyaşlarını ve Pyotr\'un soğuk su tavsiyesini hatırlıyor.',
    dialogue: [
      { speaker: 'Stajyer', ru: 'Шеф Лёша... я плачу. Это лук виноват! Честное слово!', reading: 'Şef Lyóşa... ya pláçu. Éta luk vinavát! Çyésnaye slóva!', tr: 'Şef Lyosha... ağlıyorum. Suçlu olan soğan! Yemin ederim!' },
      { speaker: 'Lyosha', ru: '(улыбается) Знакомые слова... Мой лук холодной водой. Старый секрет старого мастера.', reading: '(ul\u0131báyitsa) Znakóm\u0131ye slavá... Moy luk halódnay vadóy. Stár\u0131y sikryét stárava mástira.', tr: '(gülümser) Tanıdık sözler... Soğanı soğuk suyla yıka. Eski bir ustanın eski sırrı.' },
      { speaker: 'Stajyer', ru: 'Работает! А вы тоже когда-то плакали от лука, шеф?', reading: 'Rabótayit! A v\u0131 tóje kagdá-ta plákali at lúka, şef?', tr: 'İşe yarıyor! Siz de bir zamanlar soğandan ağladınız mı, şef?' },
      { speaker: 'Lyosha', ru: 'Я? Никогда. Это были... эмоции. Ладно, теперь учу тебя лепить пельмени!', reading: 'Ya? Nikagdá. Éta b\u0131́li... emótsii. Ládna, tipyér\' uçú tibyá lipít\' pil\'myéni!', tr: 'Ben mi? Asla. Onlar... duygulardı. Neyse, şimdi sana pelmeni sarmayı öğretiyorum!' }
    ]
  },
  {
    id: 'mod_c1_k9',
    unitNumber: 183,
    levelGroup: 'C1/C2',
    title: 'Aşçılık 40: Yemek Medyası — Şov & Blog',
    description: 'Kamera, kurgu, izlenme — «Ван Гог» ekranlara çıkıyor',
    category: 'Aşçılık',
    color: '#db2777',
    icon: '📺',
    grammarExplain: `📌 MEDYA MUTFAĞI DİLİ:
1. Снимать шоу (şov çekmek), выйти в эфир (yayına girmek) — televizyonun kalıp fiilleri.
2. Sayılar + tamlayan çoğul: "миллион просмотров" (bir milyon izlenme), "сто тысяч подписчиков" (yüz bin abone).
3. Важнее + tamlayan (–den daha önemli): "борщ важнее славы" (borşç şöhretten önemlidir) — Pyotr\'un final repliği.`,
    words: [
      { id: 'wck40_1', ru: 'Шоу', reading: 'Şóu', tr: 'Şov / Program', level: 'C1/C2', usageNote: 'Çekimsizdir: "кулинарное шоу" (yemek programı).' },
      { id: 'wck40_2', ru: 'Ведущий', reading: 'Vidúşşiy', tr: 'Sunucu', level: 'C1/C2', usageNote: 'Sıfat-fiilden isimleşmiştir: "yürüten" kişi.' },
      { id: 'wck40_3', ru: 'Эфир', reading: 'Efír', tr: 'Yayın', level: 'C1/C2', usageNote: '"Прямой эфир" (canlı yayın) — hata affetmeyen mutfak gibi.' },
      { id: 'wck40_4', ru: 'Подписчики', reading: 'Patpísçiki', tr: 'Aboneler / Takipçiler', level: 'C1/C2', usageNote: 'Yeni dönemin misafir defteri.' },
      { id: 'wck40_5', ru: 'Снимать', reading: 'Snimát\'', tr: 'Çekim yapmak', level: 'C1/C2', usageNote: 'Hem "kiralamak" hem "çekmek" — bağlam karar verir.' },
      { id: 'wck40_6', ru: 'Монтаж', reading: 'Mantáş', tr: 'Kurgu', level: 'C1/C2', usageNote: '"Это уберём на монтаже" (bunu kurguda keseriz) — set klasiği.' },
      { id: 'wck40_7', ru: 'Просмотры', reading: 'Prasmótr\u0131', tr: 'İzlenmeler', level: 'C1/C2', usageNote: 'İnternet çağının alkışı; sayılır ama doyurmaz.' },
      { id: 'wck40_8', ru: 'Слава', reading: 'Sláva', tr: 'Şöhret', level: 'C1/C2', usageNote: '"Слава — гарнир, а не главное блюдо" — Şef Pyotr, canlı yayında.' }
    ],
    sentences: [
      { ru: 'Кулинарное шоу снимают прямо на нашей кухне.', tr: 'Yemek programı doğrudan bizim mutfakta çekiliyor.', scrambled: ['снимают', 'Кулинарное шоу', 'кухне.', 'прямо на нашей'], correct: ['Кулинарное шоу', 'снимают', 'прямо на нашей', 'кухне.'] },
      { ru: 'Миллион просмотров — приятно, но борщ важнее славы.', tr: 'Bir milyon izlenme — hoş, ama borşç şöhretten önemlidir.', scrambled: ['— приятно,', 'Миллион просмотров', 'важнее славы.', 'но борщ'], correct: ['Миллион просмотров', '— приятно,', 'но борщ', 'важнее славы.'] }
    ],
    sceneTitle: 'Kameralar Mutfakta: Son Bölüm',
    sceneContext: 'Bir TV kanalı «Ван Гог»un hikayesini çekiyor: huysuz usta, eski çırak ve onun kafesi. Yönetmen drama istiyor; Pyotr sadece borşçun doğru kaynamasını istiyor. Final repliği tarihe geçiyor.',
    dialogue: [
      { speaker: 'Yönetmen', ru: 'Шеф, посмотрите в камеру и скажите что-нибудь... драматичное!', reading: 'Şef, pasmatríte f kámiru i skajíte şto-nibút\'... dramatíçnaye!', tr: 'Şef, kameraya bakın ve dramatik... bir şeyler söyleyin!' },
      { speaker: 'Şef Pyotr', ru: 'Драматичное? Борщ выкипает. ЭТО — драма. Камеру левее, у меня тут кухня!', reading: 'Dramatíçnaye? Borşç v\u0131kipáyit. ÉTA — dráma. Kámiru livyéye, u minyá tut kúhnya!', tr: 'Dramatik mi? Borşç taşıyor. İşte DRAM bu. Kamerayı sola alın, benim burada mutfağım var!' },
      { speaker: 'Lyosha', ru: 'А у нас уже миллион просмотров! Шеф, вы звезда интернета!', reading: 'A u nas ujé milión prasmótraf! Şef, v\u0131 zvizdá intirnéta!', tr: 'Bir milyon izlenmeye ulaştık bile! Şef, siz internet yıldızısınız!' },
      { speaker: 'Şef Pyotr', ru: 'Слава — гарнир, Лёша. Главное блюдо — вот оно, в кастрюле. Всем работать!', reading: 'Sláva — garnír, Lyóşa. Glávnaye blyúda — vot anó, f kastryúle. Fsyem rabótat\'!', tr: 'Şöhret — garnitürdür, Lyosha. Ana yemek — işte orada, tencerede. Herkes işinin başına!' }
    ]
  }
];
