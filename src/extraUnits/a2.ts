// ==========================================================
// EK MÜFREDAT — A2 GENİŞLEME PAKETİ (Ünite 19-26)
// Gündelik hayatın temel senaryoları: market, kıyafet, kargo,
// taksi, ev işleri, mutfak, operatör ve havalimanı.
// Format, curriculumData.ts'teki UNITS_DATA ile BİREBİR aynıdır.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_A2: UnitModule[] = [
  {
    id: 'mod_a2_x1',
    unitNumber: 24,
    levelGroup: 'A2',
    title: 'Market Alışverişi Temelleri',
    description: 'Süpermarkette ürün bulma, fiyat sorma ve kasada ödeme',
    category: 'Gündelik Yaşam',
    color: '#22c55e',
    icon: '🛒',
    grammarExplain: `📌 MARKETTE FİYAT SORMA:
1. "Сколько стоит...?" (Skólka stóit) -> "... ne kadar?" tekil ürünler için; "Сколько стоят...?" çoğul ürünler için kullanılır.
2. "Где...?" sorusuna markette "в отделе..." (reyonda) diye cevap verilir: "Молоко в молочном отделе." (Süt, süt reyonunda.)
3. Miktar belirtirken tamlayan hâli (Родительный падеж) kullanılır: "литр молока" (bir litre süt), "килограмм мяса" (bir kilo et).`,
    words: [
      { id: 'wx19_1', ru: 'Молоко', reading: 'Malakó', tr: 'Süt', level: 'A2', usageNote: 'Akanje kuralıyla "malakó" okunur; nötr cinstir.' },
      { id: 'wx19_2', ru: 'Хлеб', reading: 'Hlyep', tr: 'Ekmek', level: 'A2', usageNote: 'Kelime sonundaki Б sedasızlaşıp P okunur.' },
      { id: 'wx19_3', ru: 'Сыр', reading: 'Syr', tr: 'Peynir', level: 'A2', usageNote: 'Rus marketlerinde yüzlerce çeşidi vardır.' },
      { id: 'wx19_4', ru: 'Мясо', reading: 'Myása', tr: 'Et', level: 'A2', usageNote: 'Nötr cinstir; et reyonu "мясной отдел"dir.' },
      { id: 'wx19_5', ru: 'Овощи', reading: 'Óvashşi', tr: 'Sebzeler', level: 'A2', usageNote: 'Hep çoğul kullanılır.' },
      { id: 'wx19_6', ru: 'Фрукты', reading: 'Frúkty', tr: 'Meyveler', level: 'A2', usageNote: 'Tekili "фрукт"tur ama günlük dilde çoğul yaygındır.' },
      { id: 'wx19_7', ru: 'Сколько стоит?', reading: 'Skólka stóit?', tr: 'Ne kadar? / Kaç para?', level: 'A2', usageNote: 'Alışverişin en temel sorusudur.' },
      { id: 'wx19_8', ru: 'Дорого', reading: 'Dóraga', tr: 'Pahalı', level: 'A2', usageNote: '"Это очень дорого!" (Bu çok pahalı!) kalıbında sık geçer.' },
      { id: 'wx19_9', ru: 'Дёшево', reading: 'Dyóşıva', tr: 'Ucuz', level: 'A2', usageNote: 'Ё her zaman vurguludur.' },
      { id: 'wx19_10', ru: 'Скидка', reading: 'Skítka', tr: 'İndirim', level: 'A2', usageNote: 'Market broşürlerinde en sık görülen kelimedir.' },
      { id: 'wx19_11', ru: 'Касса', reading: 'Kássa', tr: 'Kasa', level: 'A2', usageNote: 'Ödeme yapılan yer; "на кассе" (kasada) denir.' },
      { id: 'wx19_12', ru: 'Очередь', reading: "Óçirit'", tr: 'Kuyruk / Sıra', level: 'A2', usageNote: '"Стоять в очереди" (kuyrukta beklemek) kalıbıyla kullanılır.' }
    ],
    sentences: [
      { ru: 'Сколько стоит это молоко?', tr: 'Bu süt ne kadar?', scrambled: ['молоко?', 'Сколько', 'это', 'стоит'], correct: ['Сколько', 'стоит', 'это', 'молоко?'] },
      { ru: 'Сегодня скидка на сыр.', tr: 'Bugün peynirde indirim var.', scrambled: ['на сыр.', 'скидка', 'Сегодня'], correct: ['Сегодня', 'скидка', 'на сыр.'] }
    ],
    sceneTitle: 'Süpermarkette Akşam Alışverişi',
    sceneContext: 'İş çıkışı kalabalık bir süpermarkette geçen tipik bir alışveriş sahnesi: reyon sorma, indirim yakalama ve kasa kuyruğu.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Извините, где у вас хлеб?', reading: 'Izviníte, gde u vas hlyep?', tr: 'Affedersiniz, ekmek nerede?' },
      { speaker: 'Görevli', ru: 'Хлеб там, рядом с молочным отделом.', reading: 'Hlyep tam, ryádam s malóçnım atdyélam.', tr: 'Ekmek orada, süt reyonunun yanında.' },
      { speaker: 'Müşteri', ru: 'Спасибо! А на фрукты есть скидка?', reading: 'Spasíba! A na frúkty yest\' skítka?', tr: 'Teşekkürler! Peki meyvelerde indirim var mı?' },
      { speaker: 'Görevli', ru: 'Да, сегодня яблоки очень дёшево.', reading: 'Da, sivódnya yáblaki óçin\' dyóşıva.', tr: 'Evet, bugün elmalar çok ucuz.' }
    ]
  },
  {
    id: 'mod_a2_x2',
    unitNumber: 25,
    levelGroup: 'A2',
    title: 'Kıyafet Alışverişi & Beden Sorma',
    description: 'Mağazada beden sorma, deneme kabini ve "üzerime oldu/olmadı" kalıpları',
    category: 'Gündelik Yaşam',
    color: '#f472b6',
    icon: '👕',
    grammarExplain: `📌 KIYAFET MAĞAZASI KALIPLARI:
1. "Можно примерить?" (Mójna primyérit'?) -> "Deneyebilir miyim?" — kabin sorusu budur.
2. "Подходит / Не подходит" -> "Oluyor / Olmuyor". Beden uyunca "Мне подходит" denir.
3. Renk + kıyafet sıfat uyumu: "красная куртка" (kırmızı mont — dişil), "красное платье" (kırmızı elbise — nötr).`,
    words: [
      { id: 'wx20_1', ru: 'Одежда', reading: 'Adyéjda', tr: 'Kıyafet / Giysi', level: 'A2', usageNote: 'Tekil kullanılan toplu bir isimdir.' },
      { id: 'wx20_2', ru: 'Размер', reading: 'Razmyér', tr: 'Beden / Numara', level: 'A2', usageNote: '"Какой у вас размер?" (Bedeniniz kaç?) diye sorulur.' },
      { id: 'wx20_3', ru: 'Примерить', reading: "Primyérit'", tr: 'Denemek (kıyafet)', level: 'A2', usageNote: 'Kabin "примерочная" olarak adlandırılır.' },
      { id: 'wx20_4', ru: 'Футболка', reading: 'Futbólka', tr: 'Tişört', level: 'A2', usageNote: 'Futbol ile ilgisi yoktur, tişört demektir!' },
      { id: 'wx20_5', ru: 'Брюки', reading: 'Bryúki', tr: 'Pantolon', level: 'A2', usageNote: 'Hep çoğul kullanılır.' },
      { id: 'wx20_6', ru: 'Куртка', reading: 'Kúrtka', tr: 'Mont / Ceket', level: 'A2', usageNote: 'Rusya kışında en hayati kelimelerden biridir.' },
      { id: 'wx20_7', ru: 'Обувь', reading: "Óbuf'", tr: 'Ayakkabı (genel)', level: 'A2', usageNote: 'Toplu isimdir; tek ayakkabı "ботинок"tur.' },
      { id: 'wx20_8', ru: 'Маленький', reading: "Málin'kiy", tr: 'Küçük', level: 'A2', usageNote: '"Это мало" (bu küçük geldi) şeklinde de duyulur.' },
      { id: 'wx20_9', ru: 'Большой', reading: "Bal'shóy", tr: 'Büyük', level: 'A2', usageNote: 'Beden büyük gelince "велико" da denir.' },
      { id: 'wx20_10', ru: 'Подходит', reading: 'Padhódit', tr: 'Uyuyor / Oluyor', level: 'A2', usageNote: '"Мне подходит" -> "Bana oluyor".' },
      { id: 'wx20_11', ru: 'Цвет', reading: 'Tsvyet', tr: 'Renk', level: 'A2', usageNote: '"Другой цвет есть?" (Başka rengi var mı?) diye sorulur.' },
      { id: 'wx20_12', ru: 'Примерочная', reading: 'Primyéraçnaya', tr: 'Deneme kabini', level: 'A2', usageNote: 'Mağazada kabini bulmak için sorulur.' }
    ],
    sentences: [
      { ru: 'Можно примерить эту куртку?', tr: 'Bu montu deneyebilir miyim?', scrambled: ['эту', 'Можно', 'куртку?', 'примерить'], correct: ['Можно', 'примерить', 'эту', 'куртку?'] },
      { ru: 'Этот размер мне подходит.', tr: 'Bu beden bana oluyor.', scrambled: ['мне', 'размер', 'подходит.', 'Этот'], correct: ['Этот', 'размер', 'мне', 'подходит.'] }
    ],
    sceneTitle: 'AVM\'de Mont Avı',
    sceneContext: 'Kış gelmeden mont almaya çalışan bir müşteri ile satış danışmanı arasında geçen klasik beden-renk pazarlığı sahnesi.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Здравствуйте! У вас есть эта куртка в размере М?', reading: 'Zdrástvuyte! U vas yest\' éta kúrtka v razmyére em?', tr: 'Merhaba! Bu montun M bedeni var mı?' },
      { speaker: 'Danışman', ru: 'Сейчас посмотрю... Да, есть. Хотите примерить?', reading: 'Siyçás pasmatryú... Da, yest\'. Hatíte primyérit\'?', tr: 'Hemen bakayım... Evet, var. Denemek ister misiniz?' },
      { speaker: 'Müşteri', ru: 'Да. А где примерочная?', reading: 'Da. A gde primyéraçnaya?', tr: 'Evet. Deneme kabini nerede?' },
      { speaker: 'Danışman', ru: 'Направо, за обувью. Этот цвет вам очень подходит!', reading: 'Napráva, za óbuf\'yu. État tsvyet vam óçin\' padhódit!', tr: 'Sağda, ayakkabıların arkasında. Bu renk size çok yakışıyor!' }
    ]
  },
  {
    id: 'mod_a2_x3',
    unitNumber: 26,
    levelGroup: 'A2',
    title: 'Kargo, Posta & Paket Takibi',
    description: 'Postanede paket gönderme, teslim alma ve kargo takip diyalogları',
    category: 'Gündelik Yaşam',
    color: '#f59e0b',
    icon: '📦',
    grammarExplain: `📌 POSTANE KALIPLARI:
1. "Я хочу отправить..." (Ya haçú atprávit') -> "... göndermek istiyorum" — postanenin ana kalıbıdır.
2. "Получить" (almak/teslim almak) fiili pasaportla birlikte kullanılır: paket alırken kimlik istenir.
3. Rusya'da kargo bildirimi SMS ile gelir; gişede "по извещению" (bildirim ile) denir.`,
    words: [
      { id: 'wx21_1', ru: 'Почта', reading: 'Póçta', tr: 'Postane / Posta', level: 'A2', usageNote: 'Rusya\'nın ulusal kargo ağı "Почта России"dir.' },
      { id: 'wx21_2', ru: 'Посылка', reading: 'Pasýlka', tr: 'Koli / Paket', level: 'A2', usageNote: 'Kargo paketi anlamında kullanılır.' },
      { id: 'wx21_3', ru: 'Письмо', reading: "Pis'mó", tr: 'Mektup', level: 'A2', usageNote: 'Nötr cinstir; çoğulu "письма"dır.' },
      { id: 'wx21_4', ru: 'Адрес', reading: 'Ádris', tr: 'Adres', level: 'A2', usageNote: 'Rusça adres sırası: şehir -> sokak -> bina -> daire.' },
      { id: 'wx21_5', ru: 'Отправить', reading: "Atprávit'", tr: 'Göndermek', level: 'A2', usageNote: 'Hem kargo hem mesaj göndermek için kullanılır.' },
      { id: 'wx21_6', ru: 'Получить', reading: "Paluçít'", tr: 'Almak / Teslim almak', level: 'A2', usageNote: 'Paket teslim alırken pasaport gerekir.' },
      { id: 'wx21_7', ru: 'Доставка', reading: 'Dastáfka', tr: 'Teslimat / Kargo', level: 'A2', usageNote: '"Бесплатная доставка" (ücretsiz kargo) çok sevilen bir ifadedir.' },
      { id: 'wx21_8', ru: 'Конверт', reading: 'Kanvyért', tr: 'Zarf', level: 'A2', usageNote: 'Gişeden satın alınabilir.' },
      { id: 'wx21_9', ru: 'Марка', reading: 'Márka', tr: 'Pul', level: 'A2', usageNote: 'Mektuba yapıştırılır; koleksiyonu da popülerdir.' },
      { id: 'wx21_10', ru: 'Трек-номер', reading: 'Trek-nómir', tr: 'Takip numarası', level: 'A2', usageNote: 'Kargoyu internetten takip etmek için kullanılır.' },
      { id: 'wx21_11', ru: 'Курьер', reading: "Kur'yér", tr: 'Kurye', level: 'A2', usageNote: 'Kapıya teslimat yapan kişidir.' },
      { id: 'wx21_12', ru: 'Заполнить бланк', reading: 'Zapólnit\' blank', tr: 'Form doldurmak', level: 'A2', usageNote: 'Postanede gönderi formu doldurulur.' }
    ],
    sentences: [
      { ru: 'Я хочу отправить посылку в Турцию.', tr: 'Türkiye\'ye bir koli göndermek istiyorum.', scrambled: ['посылку', 'Я хочу', 'в Турцию.', 'отправить'], correct: ['Я хочу', 'отправить', 'посылку', 'в Турцию.'] },
      { ru: 'Когда придёт моя доставка?', tr: 'Kargom ne zaman gelecek?', scrambled: ['моя', 'Когда', 'доставка?', 'придёт'], correct: ['Когда', 'придёт', 'моя', 'доставка?'] }
    ],
    sceneTitle: 'Postanede Paket Macerası',
    sceneContext: 'Ailesine hediye göndermek isteyen bir öğrencinin postane gişesinde form doldurma ve fiyat öğrenme sahnesi.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Здравствуйте! Я хочу отправить посылку.', reading: 'Zdrástvuyte! Ya haçú atprávit\' pasýlku.', tr: 'Merhaba! Bir koli göndermek istiyorum.' },
      { speaker: 'Görevli', ru: 'Куда отправляете? Заполните бланк, пожалуйста.', reading: 'Kudá atpravlyáite? Zapólnite blank, pazhálusta.', tr: 'Nereye gönderiyorsunuz? Formu doldurun lütfen.' },
      { speaker: 'Müşteri', ru: 'В Стамбул. Сколько стоит доставка?', reading: 'V Stambúl. Skólka stóit dastáfka?', tr: 'İstanbul\'a. Kargo ne kadar tutar?' },
      { speaker: 'Görevli', ru: 'Тысяча рублей. Вот ваш трек-номер.', reading: 'Týsyaça rublyéy. Vot vaş trek-nómir.', tr: 'Bin ruble. İşte takip numaranız.' }
    ]
  },
  {
    id: 'mod_a2_x4',
    unitNumber: 27,
    levelGroup: 'A2',
    title: 'Taksi Çağırma & Uygulama Kullanma',
    description: 'Uygulamadan taksi çağırma, şoförle konuşma ve "burada durun" kalıpları',
    category: 'Ulaşım & Seyahat',
    color: '#06b6d4',
    icon: '🚕',
    grammarExplain: `📌 TAKSİ KALIPLARI:
1. "Вызвать такси" (výzvat' taksí) -> "taksi çağırmak". Uygulamadan çağırınca "Я вызвал(а) такси" denir.
2. Emir kipi şoförle konuşmanın anahtarıdır: "Остановите здесь" (Burada durun), "Поверните направо" (Sağa dönün).
3. "Наличными или картой?" (Nakit mi kartla mı?) sorusu yolculuk sonunda gelir.`,
    words: [
      { id: 'wx22_1', ru: 'Приложение', reading: 'Prilajéniye', tr: 'Uygulama (mobil)', level: 'A2', usageNote: 'Yandex Go gibi taksi uygulamaları için kullanılır.' },
      { id: 'wx22_2', ru: 'Вызвать', reading: "Výzvat'", tr: 'Çağırmak', level: 'A2', usageNote: '"Вызвать такси" (taksi çağırmak) kalıbında geçer.' },
      { id: 'wx22_3', ru: 'Водитель', reading: "Vadítil'", tr: 'Şoför / Sürücü', level: 'A2', usageNote: 'Uygulamada şoför bilgisi görünür.' },
      { id: 'wx22_4', ru: 'Машина', reading: 'Mashýna', tr: 'Araba', level: 'A2', usageNote: '"Машина уже едет" (Araç yolda) bildirimi gelir.' },
      { id: 'wx22_5', ru: 'Ехать', reading: "Yéhat'", tr: 'Gitmek (araçla)', level: 'A2', usageNote: 'Yürüyerek gitmek "идти", araçla gitmek "ехать"tır.' },
      { id: 'wx22_6', ru: 'Быстро', reading: 'Býstra', tr: 'Hızlı', level: 'A2', usageNote: '"Не так быстро!" (O kadar hızlı değil!) diye rica edilir.' },
      { id: 'wx22_7', ru: 'Остановите здесь', reading: 'Astanavíte zdyes\'', tr: 'Burada durun', level: 'A2', usageNote: 'Şoföre söylenen en önemli cümledir.' },
      { id: 'wx22_8', ru: 'Наличные', reading: 'Nalíçnıye', tr: 'Nakit', level: 'A2', usageNote: '"Оплата наличными" (nakit ödeme) demektir.' },
      { id: 'wx22_9', ru: 'Маршрут', reading: 'Marşrút', tr: 'Güzergâh / Rota', level: 'A2', usageNote: 'Uygulama rotayı haritada gösterir.' },
      { id: 'wx22_10', ru: 'Подождите', reading: 'Padajdíte', tr: 'Bekleyin', level: 'A2', usageNote: '"Подождите минуту" (Bir dakika bekleyin) kalıbında geçer.' },
      { id: 'wx22_11', ru: 'Пристегнуться', reading: "Pristignútsa", tr: 'Kemer takmak', level: 'A2', usageNote: 'Şoför "Пристегнитесь, пожалуйста" diyebilir.' },
      { id: 'wx22_12', ru: 'Заказ принят', reading: 'Zakás prínyat', tr: 'Sipariş alındı', level: 'A2', usageNote: 'Uygulamanın onay bildirimidir.' }
    ],
    sentences: [
      { ru: 'Я вызвал такси через приложение.', tr: 'Uygulamadan taksi çağırdım.', scrambled: ['через', 'такси', 'Я вызвал', 'приложение.'], correct: ['Я вызвал', 'такси', 'через', 'приложение.'] },
      { ru: 'Остановите здесь, пожалуйста.', tr: 'Burada durun, lütfen.', scrambled: ['пожалуйста.', 'здесь,', 'Остановите'], correct: ['Остановите', 'здесь,', 'пожалуйста.'] }
    ],
    sceneTitle: 'Yağmurda Taksi Yolculuğu',
    sceneContext: 'Yağmurlu bir akşam uygulamadan çağrılan takside geçen kısa sohbet ve varış sahnesi.',
    dialogue: [
      { speaker: 'Şoför', ru: 'Добрый вечер! Вы заказывали такси?', reading: 'Dóbry vyéçir! Vy zakázyvali taksí?', tr: 'İyi akşamlar! Taksi siz mi çağırdınız?' },
      { speaker: 'Yolcu', ru: 'Да, это я. Едем на улицу Пушкина.', reading: 'Da, éta ya. Yédim na úlitsu Púşkina.', tr: 'Evet, benim. Puşkin Sokağı\'na gidiyoruz.' },
      { speaker: 'Şoför', ru: 'Хорошо. Пристегнитесь, пожалуйста.', reading: 'Haraşó. Pristigníties\', pazhálusta.', tr: 'Tamam. Kemerinizi takın lütfen.' },
      { speaker: 'Yolcu', ru: 'Остановите здесь, у магазина. Спасибо!', reading: 'Astanavíte zdyes\', u magazína. Spasíba!', tr: 'Burada durun, mağazanın önünde. Teşekkürler!' }
    ]
  },
  {
    id: 'mod_a2_x5',
    unitNumber: 28,
    levelGroup: 'A2',
    title: 'Ev İşleri & Temizlik Paylaşımı',
    description: 'Bulaşık, çamaşır, çöp — ev işi paylaşma ve rica etme kalıpları',
    category: 'Gündelik Yaşam',
    color: '#8b5cf6',
    icon: '🧹',
    grammarExplain: `📌 EV İŞLERİ KALIPLARI:
1. "Надо + fiil" (Náda) -> "... gerekiyor": "Надо вынести мусор" (Çöpü çıkarmak gerek).
2. "Кто + fiil?" görev paylaşımı sorusudur: "Кто моет посуду?" (Bulaşığı kim yıkıyor?).
3. "Помочь" (yardım etmek) fiili yönelme hâli ister: "Помоги мне!" (Bana yardım et!).`,
    words: [
      { id: 'wx23_1', ru: 'Убирать', reading: "Ubirát'", tr: 'Toplamak / Temizlemek', level: 'A2', usageNote: '"Убирать квартиру" (evi temizlemek) kalıbında geçer.' },
      { id: 'wx23_2', ru: 'Мыть посуду', reading: "Myt' pasúdu", tr: 'Bulaşık yıkamak', level: 'A2', usageNote: 'Ev arkadaşlarının ezeli tartışma konusudur.' },
      { id: 'wx23_3', ru: 'Стирать', reading: "Stirát'", tr: 'Çamaşır yıkamak', level: 'A2', usageNote: 'Çamaşır makinesi "стиральная машина"dır.' },
      { id: 'wx23_4', ru: 'Пылесос', reading: 'Pılisós', tr: 'Elektrik süpürgesi', level: 'A2', usageNote: 'Kelime kelime "toz emici" demektir.' },
      { id: 'wx23_5', ru: 'Мусор', reading: 'Músar', tr: 'Çöp', level: 'A2', usageNote: '"Вынести мусор" (çöpü dışarı çıkarmak) kalıbıyla kullanılır.' },
      { id: 'wx23_6', ru: 'Чисто', reading: 'Çísta', tr: 'Temiz', level: 'A2', usageNote: '"Как чисто!" (Ne kadar temiz!) övgüsünde geçer.' },
      { id: 'wx23_7', ru: 'Грязно', reading: 'Gryázna', tr: 'Kirli / Pis', level: 'A2', usageNote: 'Zarftır; "грязная посуда" (kirli bulaşık) sıfat halidir.' },
      { id: 'wx23_8', ru: 'Помогать', reading: "Pamagát'", tr: 'Yardım etmek', level: 'A2', usageNote: 'Yönelme hâli ister: "помогать маме".' },
      { id: 'wx23_9', ru: 'Кухня', reading: 'Kúhnya', tr: 'Mutfak', level: 'A2', usageNote: 'Rus evlerinde sohbetin merkezi mutfaktır.' },
      { id: 'wx23_10', ru: 'Ванная', reading: 'Vánnaya', tr: 'Banyo', level: 'A2', usageNote: 'Tuvalet çoğu Rus evinde ayrı odadır.' },
      { id: 'wx23_11', ru: 'Порядок', reading: 'Paryádak', tr: 'Düzen', level: 'A2', usageNote: '"Навести порядок" (ortalığı düzene sokmak) kalıbında geçer.' },
      { id: 'wx23_12', ru: 'Гладить', reading: "Gládit'", tr: 'Ütü yapmak', level: 'A2', usageNote: 'Aynı fiil "okşamak" anlamına da gelir — bağlama dikkat!' }
    ],
    sentences: [
      { ru: 'Кто сегодня моет посуду?', tr: 'Bugün bulaşığı kim yıkıyor?', scrambled: ['моет', 'Кто', 'посуду?', 'сегодня'], correct: ['Кто', 'сегодня', 'моет', 'посуду?'] },
      { ru: 'Надо вынести мусор.', tr: 'Çöpü çıkarmak gerek.', scrambled: ['мусор.', 'Надо', 'вынести'], correct: ['Надо', 'вынести', 'мусор.'] }
    ],
    sceneTitle: 'Ev Arkadaşları ve Bulaşık Krizi',
    sceneContext: 'İki ev arkadaşının mutfakta biriken bulaşık ve ev işi paylaşımı üzerine geçen (tanıdık!) tartışma sahnesi.',
    dialogue: [
      { speaker: 'Dima', ru: 'Опять грязная посуда! Кто моет сегодня?', reading: 'Apyát\' gryáznaya pasúda! Kto móit sivódnya?', tr: 'Yine kirli bulaşık! Bugün kim yıkıyor?' },
      { speaker: 'Lyosha', ru: 'Я вчера мыл. Сегодня твоя очередь.', reading: 'Ya fçirá myl. Sivódnya tvayá óçirit\'.', tr: 'Ben dün yıkadım. Bugün senin sıran.' },
      { speaker: 'Dima', ru: 'Ладно. А ты тогда вынеси мусор.', reading: 'Ládna. A ty tagdá výnesi músar.', tr: 'Tamam. Sen de o zaman çöpü çıkar.' },
      { speaker: 'Lyosha', ru: 'Договорились! Вместе наведём порядок.', reading: 'Dagavarílis\'! Vmyéste navidyóm paryádak.', tr: 'Anlaştık! Birlikte ortalığı toplarız.' }
    ]
  },
  {
    id: 'mod_a2_x6',
    unitNumber: 29,
    levelGroup: 'A2',
    title: 'Yemek Tarifi & Mutfakta Pişirme',
    description: 'Tarif takip etme, malzemeler ve "kes, kavur, ekle" emir kipleri',
    category: 'Gündelik Yaşam',
    color: '#ef4444',
    icon: '🍳',
    grammarExplain: `📌 TARİF DİLİ:
1. Tarifler emir kipiyle yazılır: "Нарежь лук" (Soğanı doğra), "Добавь соль" (Tuz ekle).
2. "Готовить" genel pişirmek; "варить" haşlamak; "жарить" kızartmak/kavurmak demektir.
3. "Немного + tamlayan hâli" -> "biraz ...": "немного соли" (biraz tuz), "немного сахара" (biraz şeker).`,
    words: [
      { id: 'wx24_1', ru: 'Рецепт', reading: 'Ritsépt', tr: 'Tarif / Reçete', level: 'A2', usageNote: 'Hem yemek tarifi hem doktor reçetesi anlamındadır.' },
      { id: 'wx24_2', ru: 'Готовить', reading: "Gatóvit'", tr: 'Pişirmek / Hazırlamak', level: 'A2', usageNote: '"Я люблю готовить" (Yemek yapmayı severim).' },
      { id: 'wx24_3', ru: 'Резать', reading: "Ryézat'", tr: 'Kesmek / Doğramak', level: 'A2', usageNote: 'Tarifte emir hali "нарежь"tir.' },
      { id: 'wx24_4', ru: 'Жарить', reading: "Járit'", tr: 'Kızartmak / Kavurmak', level: 'A2', usageNote: 'Tavada pişirme için kullanılır.' },
      { id: 'wx24_5', ru: 'Варить', reading: "Varít'", tr: 'Haşlamak / Kaynatmak', level: 'A2', usageNote: 'Çorba ve makarna bu fiille pişer: "варить суп".' },
      { id: 'wx24_6', ru: 'Соль', reading: "Sol'", tr: 'Tuz', level: 'A2', usageNote: 'Dişildir; "добавь соли" (biraz tuz ekle) denir.' },
      { id: 'wx24_7', ru: 'Сахар', reading: 'Sáhar', tr: 'Şeker', level: 'A2', usageNote: 'Çaya atılan küp şeker kültürün parçasıdır.' },
      { id: 'wx24_8', ru: 'Масло', reading: 'Másla', tr: 'Yağ / Tereyağı', level: 'A2', usageNote: '"Сливочное масло" tereyağı, "растительное" sıvı yağdır.' },
      { id: 'wx24_9', ru: 'Лук', reading: 'Luk', tr: 'Soğan', level: 'A2', usageNote: 'Neredeyse her Rus yemeğinin başlangıcıdır.' },
      { id: 'wx24_10', ru: 'Вкусно', reading: 'Fkúsna', tr: 'Lezzetli', level: 'A2', usageNote: 'Sofrada "Очень вкусно!" demek ev sahibini mutlu eder.' },
      { id: 'wx24_11', ru: 'Сковорода', reading: 'Skavaradá', tr: 'Tava', level: 'A2', usageNote: 'Kızartma işleri tavada yapılır.' },
      { id: 'wx24_12', ru: 'Добавить', reading: "Dabávit'", tr: 'Eklemek', level: 'A2', usageNote: 'Tarifin en sık fiili: "добавьте соль и перец".' }
    ],
    sentences: [
      { ru: 'Я готовлю суп по рецепту.', tr: 'Tarife göre çorba pişiriyorum.', scrambled: ['по рецепту.', 'суп', 'Я готовлю'], correct: ['Я готовлю', 'суп', 'по рецепту.'] },
      { ru: 'Добавь немного соли и масла.', tr: 'Biraz tuz ve yağ ekle.', scrambled: ['соли', 'немного', 'Добавь', 'и масла.'], correct: ['Добавь', 'немного', 'соли', 'и масла.'] }
    ],
    sceneTitle: 'İlk Borş Denemesi',
    sceneContext: 'Rus arkadaşından telefonla tarif alarak ilk kez borş çorbası yapmaya çalışan birinin mutfak sahnesi.',
    dialogue: [
      { speaker: 'Aslı', ru: 'Я готовлю борщ! Что делать сначала?', reading: 'Ya gatóvlyu borş! Şto dyélat\' snaçála?', tr: 'Borş yapıyorum! Önce ne yapmalıyım?' },
      { speaker: 'Katya', ru: 'Сначала нарежь лук и жарь его на сковороде.', reading: 'Snaçála naryéj luk i jar\' yevó na skavaradyé.', tr: 'Önce soğanı doğra ve tavada kavur.' },
      { speaker: 'Aslı', ru: 'Готово! Теперь добавить соль?', reading: 'Gatóva! Tipyér\' dabávit\' sol\'?', tr: 'Hazır! Şimdi tuz mu ekleyeyim?' },
      { speaker: 'Katya', ru: 'Да, немного. Будет очень вкусно!', reading: 'Da, nimnóga. Búdit óçin\' fkúsna!', tr: 'Evet, biraz. Çok lezzetli olacak!' }
    ]
  },
  {
    id: 'mod_a2_x7',
    unitNumber: 30,
    levelGroup: 'A2',
    title: 'İnternet, Operatör & Fatura',
    description: 'Hat/paket işlemleri, bakiye yükleme ve "internet çalışmıyor" şikâyeti',
    category: 'Gündelik Yaşam',
    color: '#3b82f6',
    icon: '📶',
    grammarExplain: `📌 OPERATÖR KALIPLARI:
1. "Не работает" (Ni rabótait) -> "çalışmıyor" — teknik şikâyetin ana kalıbıdır: "Интернет не работает".
2. "Пополнить баланс" (bakiye yüklemek) Rusya'da günlük bir işlemdir; telefon hatları çoğunlukla ön ödemelidir.
3. "Какой у вас тариф?" (Tarifeniz ne?) sorusu paket kıyaslarken kullanılır.`,
    words: [
      { id: 'wx25_1', ru: 'Интернет', reading: 'Internét', tr: 'İnternet', level: 'A2', usageNote: 'Eril bir kelimedir; "мобильный интернет" de denir.' },
      { id: 'wx25_2', ru: 'Тариф', reading: 'Taríf', tr: 'Tarife / Paket', level: 'A2', usageNote: 'Operatör paketi anlamında kullanılır.' },
      { id: 'wx25_3', ru: 'Баланс', reading: 'Baláns', tr: 'Bakiye', level: 'A2', usageNote: '"Проверить баланс" (bakiye sorgulamak) kalıbında geçer.' },
      { id: 'wx25_4', ru: 'Пополнить', reading: "Papólnit'", tr: 'Yüklemek (bakiye)', level: 'A2', usageNote: '"Пополнить баланс" -> kontör/bakiye yüklemek.' },
      { id: 'wx25_5', ru: 'Связь', reading: "Svyaz'", tr: 'Bağlantı / Şebeke', level: 'A2', usageNote: '"Нет связи" (Şebeke yok) sık duyulan bir şikâyettir.' },
      { id: 'wx25_6', ru: 'Сигнал', reading: 'Signál', tr: 'Sinyal', level: 'A2', usageNote: '"Слабый сигнал" (zayıf sinyal) denir.' },
      { id: 'wx25_7', ru: 'Роутер', reading: 'Róutir', tr: 'Modem / Router', level: 'A2', usageNote: 'Teknik destek hep önce "modemi kapatıp açın" der.' },
      { id: 'wx25_8', ru: 'Пароль', reading: "Paról'", tr: 'Şifre', level: 'A2', usageNote: '"Какой пароль от вайфая?" misafirlerin ilk sorusudur.' },
      { id: 'wx25_9', ru: 'Не работает', reading: 'Ni rabótait', tr: 'Çalışmıyor', level: 'A2', usageNote: 'Her tür arıza bildiriminin temel kalıbıdır.' },
      { id: 'wx25_10', ru: 'Оператор', reading: 'Apirátar', tr: 'Operatör', level: 'A2', usageNote: 'Hem şirket hem çağrı merkezi görevlisi anlamındadır.' },
      { id: 'wx25_11', ru: 'Счёт за телефон', reading: 'Şşyot za tilifón', tr: 'Telefon faturası', level: 'A2', usageNote: '"Счёт" hem hesap hem fatura demektir.' },
      { id: 'wx25_12', ru: 'Подключить', reading: "Padklyuçít'", tr: 'Bağlamak / Aktive etmek', level: 'A2', usageNote: '"Подключить интернет" (internet bağlatmak) kalıbında geçer.' }
    ],
    sentences: [
      { ru: 'Дома не работает интернет.', tr: 'Evde internet çalışmıyor.', scrambled: ['интернет.', 'не работает', 'Дома'], correct: ['Дома', 'не работает', 'интернет.'] },
      { ru: 'Я хочу пополнить баланс.', tr: 'Bakiye yüklemek istiyorum.', scrambled: ['баланс.', 'Я хочу', 'пополнить'], correct: ['Я хочу', 'пополнить', 'баланс.'] }
    ],
    sceneTitle: 'Çağrı Merkezi Sabır Testi',
    sceneContext: 'İnterneti kesilen bir abonenin operatör çağrı merkeziyle yaptığı klasik "modemi yeniden başlatın" görüşmesi.',
    dialogue: [
      { speaker: 'Operatör', ru: 'Здравствуйте! Чем могу помочь?', reading: 'Zdrástvuyte! Çem magú pamóç\'?', tr: 'Merhaba! Nasıl yardımcı olabilirim?' },
      { speaker: 'Abone', ru: 'У меня дома не работает интернет.', reading: 'U minyá dóma ni rabótait internét.', tr: 'Evimde internet çalışmıyor.' },
      { speaker: 'Operatör', ru: 'Перезагрузите роутер, пожалуйста.', reading: 'Pirizagruzíte róutir, pazhálusta.', tr: 'Modemi yeniden başlatın lütfen.' },
      { speaker: 'Abone', ru: 'О, заработало! Спасибо большое!', reading: 'O, zarabótala! Spasíba bal\'şóye!', tr: 'Oo, çalıştı! Çok teşekkürler!' }
    ]
  },
  {
    id: 'mod_a2_x8',
    unitNumber: 31,
    levelGroup: 'A2',
    title: 'Havalimanı & Seyahat Hazırlığı',
    description: 'Check-in, bagaj, pasaport kontrolü ve uçuş kalıpları',
    category: 'Ulaşım & Seyahat',
    color: '#14b8a6',
    icon: '✈️',
    grammarExplain: `📌 HAVALİMANI KALIPLARI:
1. "Регистрация на рейс" (Rigistrátsiya na reys) -> "uçuşa check-in". "Где регистрация?" diye sorulur.
2. "Опаздывать" (geç kalmak) sürerlilik bildirir: "Я опаздываю на рейс!" (Uçağıma geç kalıyorum!).
3. Anonslarda "выход" (çıkış/kapı) kelimesi geçer: "Выход номер пять" (5 numaralı kapı).`,
    words: [
      { id: 'wx26_1', ru: 'Аэропорт', reading: 'Aerapórt', tr: 'Havalimanı', level: 'A2', usageNote: '"В аэропорту" (havalimanında) özel bir çekimdir.' },
      { id: 'wx26_2', ru: 'Рейс', reading: 'Reys', tr: 'Uçuş / Sefer', level: 'A2', usageNote: '"Рейс задержан" (Uçuş rötarlı) panosunda görülür.' },
      { id: 'wx26_3', ru: 'Багаж', reading: 'Bagáj', tr: 'Bagaj', level: 'A2', usageNote: 'El bagajı "ручная кладь"dir.' },
      { id: 'wx26_4', ru: 'Паспорт', reading: 'Páspart', tr: 'Pasaport', level: 'A2', usageNote: 'Kontrolde "Ваш паспорт, пожалуйста" denir.' },
      { id: 'wx26_5', ru: 'Регистрация', reading: 'Rigistrátsiya', tr: 'Check-in / Kayıt', level: 'A2', usageNote: 'Uçuşa kayıt bankosudur.' },
      { id: 'wx26_6', ru: 'Выход', reading: 'Výhat', tr: 'Çıkış / Kapı (gate)', level: 'A2', usageNote: 'Havalimanında biniş kapısı anlamına gelir.' },
      { id: 'wx26_7', ru: 'Опаздывать', reading: "Apázdıvat'", tr: 'Geç kalmak', level: 'A2', usageNote: '"Я опаздываю!" (Geç kalıyorum!) panik kalıbıdır.' },
      { id: 'wx26_8', ru: 'Чемодан', reading: 'Çimadán', tr: 'Valiz / Bavul', level: 'A2', usageNote: '"Тяжёлый чемодан" (ağır valiz) sık duyulur.' },
      { id: 'wx26_9', ru: 'Билет туда-обратно', reading: 'Bilyét tudá-abrátna', tr: 'Gidiş-dönüş bileti', level: 'A2', usageNote: 'Kelime kelime "oraya-geriye bilet" demektir.' },
      { id: 'wx26_10', ru: 'Таможня', reading: 'Tamójnya', tr: 'Gümrük', level: 'A2', usageNote: 'Yeşil koridor "beyan edecek bir şeyi olmayanlar" içindir.' },
      { id: 'wx26_11', ru: 'Посадка', reading: 'Pasátka', tr: 'Biniş / İniş', level: 'A2', usageNote: '"Идёт посадка" (biniş başladı) anonsu yapılır.' },
      { id: 'wx26_12', ru: 'Задержка', reading: 'Zadyérjka', tr: 'Rötar / Gecikme', level: 'A2', usageNote: '"Задержка рейса" (uçuş rötarı) panoda görülür.' }
    ],
    sentences: [
      { ru: 'Где регистрация на рейс в Москву?', tr: 'Moskova uçuşunun check-in\'i nerede?', scrambled: ['на рейс', 'Где', 'в Москву?', 'регистрация'], correct: ['Где', 'регистрация', 'на рейс', 'в Москву?'] },
      { ru: 'Мой чемодан очень тяжёлый.', tr: 'Valizim çok ağır.', scrambled: ['тяжёлый.', 'Мой', 'очень', 'чемодан'], correct: ['Мой', 'чемодан', 'очень', 'тяжёлый.'] }
    ],
    sceneTitle: 'Check-in Bankosunda Son Dakika',
    sceneContext: 'Uçağına geç kalan bir yolcunun check-in bankosunda bagaj ve kapı numarası telaşı.',
    dialogue: [
      { speaker: 'Yolcu', ru: 'Здравствуйте! Я опаздываю на рейс в Стамбул!', reading: 'Zdrástvuyte! Ya apázdıvayu na reys v Stambúl!', tr: 'Merhaba! İstanbul uçağıma geç kalıyorum!' },
      { speaker: 'Görevli', ru: 'Спокойно! Ваш паспорт, пожалуйста.', reading: 'Spakóyna! Vaş páspart, pazhálusta.', tr: 'Sakin olun! Pasaportunuz lütfen.' },
      { speaker: 'Yolcu', ru: 'Вот. У меня один чемодан в багаж.', reading: 'Vot. U minyá adín çimadán v bagáj.', tr: 'Buyurun. Bagaja verilecek bir valizim var.' },
      { speaker: 'Görevli', ru: 'Готово. Ваш выход — номер семь. Удачного полёта!', reading: 'Gatóva. Vaş výhat — nómir syem\'. Udáçnava palyóta!', tr: 'Tamamdır. Kapınız 7 numara. İyi uçuşlar!' }
    ]
  }
];
