import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const DAILY60_A2: UnitModule[] = [
  {
    id: 'd60_a2_rent', unitNumber: 40.9801, levelGroup: 'A2',
    title: 'Ev Arama ve Kira', description: 'İlan oku, ev gez, pazarlık et',
    category: 'Günlük Hayat', color: '#7c3aed', icon: '🔑',
    grammarExplain: `📌 İLAN DİLİ:
1. İlanlar kısaltmalıdır: 2-комн. кв., 45 м², 5/9 эт. (2 odalı daire, 45 m², 9 katlının 5. katı).
2. "Kirala(mak)" iki yönlüdür: снимать = kiracı olarak tutmak, сдавать = kiraya vermek. Karıştırmak ciddi hatadır.
3. Fiyat sorusu: Сколько в месяц? (Aylık ne kadar?)`,
    words: [
      W('d60a2re_1', 'Снимать квартиру', 'Snimát kvartíru', 'Daire kiralamak (tutmak)', 'A2', 'Kiracının fiili.'),
      W('d60a2re_2', 'Сдавать', 'Sdavát', 'Kiraya vermek', 'A2', 'Ev sahibinin fiili; ilanlarda "Сдаётся".'),
      W('d60a2re_3', 'Арендная плата', 'Aryéndnaya pláta', 'Kira bedeli', 'A2', 'Günlük dilde kısaca аренда.'),
      W('d60a2re_4', 'Залог', 'Zalók', 'Depozito', 'A2', 'Genelde bir aylık kira tutarındadır.'),
      W('d60a2re_5', 'Ремонт', 'Rimónt', 'Tadilat / Bakım durumu', 'A2', 'İlanlarda "после ремонта" = yeni yapılmış.'),
      W('d60a2re_6', 'Посмотреть квартиру', 'Pasmatryét kvartíru', 'Daireyi görmek', 'A2', 'Randevu isterken kullanılır.')
    ],
    sentences: [
      S('Я хочу снять квартиру рядом с метро.', 'Metroya yakın bir daire kiralamak istiyorum.'),
      S('Сколько стоит аренда в месяц?', 'Aylık kira ne kadar?'),
      S('Можно посмотреть квартиру завтра?', 'Daireyi yarın görebilir miyim?')
    ]
  },
  {
    id: 'd60_a2_bills', unitNumber: 40.9802, levelGroup: 'A2',
    title: 'Faturalar ve Abonelikler', description: 'Elektrik, su, internet ödemesi',
    category: 'Günlük Hayat', color: '#0284c7', icon: '🧾',
    grammarExplain: `📌 ÖDEME FİİLLERİ:
1. платить за + belirtme hâli: платить за свет (elektriğe ödeme yapmak).
2. Tamamlanmış biçim: заплатить / оплатить счёт.
3. Son tarih: до пятого числа (ayın beşine kadar).`,
    words: [
      W('d60a2bi_1', 'Счёт', 'Şşot', 'Fatura / Hesap', 'A2', 'Bankada "hesap" anlamına da gelir.'),
      W('d60a2bi_2', 'Квитанция', 'Kvitántsiya', 'Makbuz / Ödeme belgesi', 'A2', 'Posta kutusuna gelen kâğıt.'),
      W('d60a2bi_3', 'Коммунальные услуги', 'Kammunálnıye uslúgi', 'Aidat ve altyapı giderleri', 'A2', 'Kısaltması коммуналка.'),
      W('d60a2bi_4', 'Счётчик', 'Şşótçik', 'Sayaç', 'A2', 'Передать показания счётчика = sayaç endeksi bildirmek.'),
      W('d60a2bi_5', 'Задолженность', 'Zadóljinnast', 'Borç / Gecikme', 'A2', 'Resmî bildirimlerde geçer.'),
      W('d60a2bi_6', 'Подписка', 'Patpíska', 'Abonelik', 'A2', 'Отменить подписку = aboneliği iptal etmek.')
    ],
    sentences: [
      S('Я должен заплатить за свет до пятого числа.', 'Elektriği ayın beşine kadar ödemem gerekiyor.'),
      S('Пришла квитанция за коммунальные услуги.', 'Aidat faturası geldi.'),
      S('Я хочу отменить подписку.', 'Aboneliği iptal etmek istiyorum.')
    ]
  },
  {
    id: 'd60_a2_atm', unitNumber: 40.9803, levelGroup: 'A2',
    title: 'Banka ve ATM', description: 'Para çek, havale yap, kart sorunu',
    category: 'Günlük Hayat', color: '#059669', icon: '🏧',
    grammarExplain: `📌 BANKA İŞLEM DİLİ:
1. Ekran komutları mastarla: Вставьте карту, введите ПИН-код, выберите сумму.
2. "Havale göndermek" = перевести деньги кому (yönelme hâli).
3. Sorun bildirme: Банкомат забрал мою карту. (ATM kartımı yuttu.)`,
    words: [
      W('d60a2at_1', 'Банкомат', 'Bankamát', 'ATM', 'A2', 'Snять деньги в банкомате.'),
      W('d60a2at_2', 'Снять деньги', 'Snyat dyéngi', 'Para çekmek', 'A2', 'Yatırmak ise внести/положить.'),
      W('d60a2at_3', 'Перевод', 'Pirivót', 'Havale', 'A2', 'Aynı kelime "çeviri" demektir.'),
      W('d60a2at_4', 'Комиссия', 'Kamíssiya', 'İşlem ücreti', 'A2', 'Без комиссии = masrafsız.'),
      W('d60a2at_5', 'Пин-код', 'Pin-kot', 'PIN kodu', 'A2', 'Введите пин-код.'),
      W('d60a2at_6', 'Заблокировать', 'Zablakíravat', 'Bloke etmek', 'A2', 'Kart kaybında ilk yapılacak iş.')
    ],
    sentences: [
      S('Где здесь ближайший банкомат?', 'Buralarda en yakın ATM nerede?'),
      S('Я хочу перевести деньги на другую карту.', 'Başka bir karta para göndermek istiyorum.'),
      S('Пожалуйста, заблокируйте мою карту.', 'Lütfen kartımı bloke edin.')
    ]
  },
  {
    id: 'd60_a2_tailor', unitNumber: 40.9804, levelGroup: 'A2',
    title: 'Terzi ve Tamir İşleri', description: 'Kısalt, dik, onar',
    category: 'Günlük Hayat', color: '#be185d', icon: '🧵',
    grammarExplain: `📌 HİZMET İSTEME:
1. Mümkün mü? Можно укоротить эти брюки? (Bu pantolonu kısaltabilir misiniz?)
2. Süre sorusu: Когда будет готово? (Ne zaman hazır olur?)
3. Edilgen sonuç: Будет готово завтра.`,
    words: [
      W('d60a2ta_1', 'Укоротить', 'Ukaratít', 'Kısaltmak', 'A2', 'короткий (kısa) kökünden.'),
      W('d60a2ta_2', 'Зашить', 'Zaşít', 'Dikmek (yırtığı)', 'A2', 'шить (dikmek) fiilinden.'),
      W('d60a2ta_3', 'Молния', 'Mólniya', 'Fermuar', 'A2', 'Aynı kelime "şimşek" demektir.'),
      W('d60a2ta_4', 'Пуговица', 'Púgavitsa', 'Düğme', 'A2', 'Пришить пуговицу = düğme dikmek.'),
      W('d60a2ta_5', 'Починить', 'Paçinít', 'Tamir etmek', 'A2', 'Genel onarım fiili.'),
      W('d60a2ta_6', 'Готово', 'Gatóva', 'Hazır', 'A2', 'Когда будет готово?')
    ],
    sentences: [
      S('Можно укоротить эти брюки?', 'Bu pantolonu kısaltabilir misiniz?'),
      S('У меня сломалась молния.', 'Fermuarım bozuldu.'),
      S('Когда будет готово?', 'Ne zaman hazır olur?')
    ]
  },
  {
    id: 'd60_a2_laundry', unitNumber: 40.9805, levelGroup: 'A2',
    title: 'Çamaşır ve Kuru Temizleme', description: 'Yıka, kurut, ütüle',
    category: 'Günlük Hayat', color: '#0891b2', icon: '🧺',
    grammarExplain: `📌 TALİMAT OKUMA:
1. Etiketlerde kişisiz yapı: стирать при 30°, не отбеливать, гладить при низкой температуре.
2. "…-de yıkamak" = стирать при тридцати градусах.
3. Uyarı: Не кладите шерсть в машинку. (Yünlüyü makineye atmayın.)`,
    words: [
      W('d60a2la_1', 'Стиральная машина', 'Stirálnaya maşína', 'Çamaşır makinesi', 'A2', 'Günlük dilde машинка.'),
      W('d60a2la_2', 'Порошок', 'Paraşók', 'Deterjan', 'A2', 'Toz deterjan; sıvı olanı гель.'),
      W('d60a2la_3', 'Гладить', 'Gládit', 'Ütülemek', 'A2', 'Aynı fiil "okşamak" demektir.'),
      W('d60a2la_4', 'Сушить', 'Suşít', 'Kurutmak', 'A2', 'Сушилка = kurutmalık/kurutucu.'),
      W('d60a2la_5', 'Химчистка', 'Himçístka', 'Kuru temizleme', 'A2', '"Kimyasal temizlik" bileşiği.'),
      W('d60a2la_6', 'Пятно', 'Pitnó', 'Leke', 'A2', 'Вывести пятно = leke çıkarmak.')
    ],
    sentences: [
      S('Эту рубашку нужно стирать при тридцати градусах.', 'Bu gömlek otuz derecede yıkanmalı.'),
      S('Я отнесу пальто в химчистку.', 'Paltoyu kuru temizlemeye götüreceğim.'),
      S('На куртке пятно, его можно вывести?', 'Montta leke var, çıkarılabilir mi?')
    ]
  },
  {
    id: 'd60_a2_checkout', unitNumber: 40.9806, levelGroup: 'A2',
    title: 'Kasada', description: 'Poşet, kart, fiş',
    category: 'Günlük Hayat', color: '#16a34a', icon: '💳',
    grammarExplain: `📌 KASİYERİN SORULARI:
1. Пакет нужен? (Poşet ister misiniz?) Карта есть? (Kartınız var mı? — sadakat kartı)
2. Наличными или картой? (Nakit mi kart mı?)
3. Cevaplar tek kelime olabilir: Картой. Нет, спасибо.`,
    words: [
      W('d60a2ck_1', 'Кассир', 'Kassír', 'Kasiyer', 'A2', 'Dişili кассирша (gündelik).'),
      W('d60a2ck_2', 'Чек', 'Çek', 'Fiş', 'A2', 'Чек нужен? = Fiş ister misiniz?'),
      W('d60a2ck_3', 'Скидочная карта', 'Skídaçnaya kárta', 'İndirim kartı', 'A2', 'Marketlerin sadakat kartı.'),
      W('d60a2ck_4', 'Наличными', 'Nalíçnımi', 'Nakit olarak', 'A2', 'Araç hâlinde kullanılır.'),
      W('d60a2ck_5', 'Приложить карту', 'Prilajít kártu', 'Kartı okutmak', 'A2', 'Temassız ödeme kalıbı.'),
      W('d60a2ck_6', 'Сдача', 'Sdáça', 'Para üstü', 'A2', 'Сдачи не надо = üstü kalsın.')
    ],
    sentences: [
      S('Наличными или картой? — Картой.', 'Nakit mi kart mı? — Kartla.'),
      S('Пакет не нужен, чек тоже.', 'Poşet gerekmiyor, fiş de.'),
      S('Приложите карту к терминалу.', 'Kartı cihaza okutun.')
    ]
  },
  {
    id: 'd60_a2_noise', unitNumber: 40.9807, levelGroup: 'A2',
    title: 'Komşuyla Rica ve Şikâyet', description: 'Gürültü, sessizlik saati',
    category: 'Günlük Hayat', color: '#ea580c', icon: '🔇',
    grammarExplain: `📌 KİBAR ŞİKÂYET:
1. Suçlamadan başla: Извините за беспокойство, но…
2. Rica: Не могли бы вы сделать музыку потише?
3. Rusya'da "закон о тишине" gereği genelde 23:00–07:00 arası gürültü yasaktır.`,
    words: [
      W('d60a2no_1', 'Шум', 'Şum', 'Gürültü', 'A2', 'Sıfatı шумный.'),
      W('d60a2no_2', 'Потише', 'Patíşe', 'Biraz daha sessiz', 'A2', 'тихо kelimesinin karşılaştırmalı biçimi.'),
      W('d60a2no_3', 'Беспокойство', 'Bispakóystva', 'Rahatsızlık', 'A2', 'Извините за беспокойство.'),
      W('d60a2no_4', 'Ремонт', 'Rimónt', 'Tadilat', 'A2', 'Komşu gürültüsünün 1 numaralı sebebi.'),
      W('d60a2no_5', 'Мешать', 'Mişát', 'Rahatsız etmek', 'A2', 'Yönelme hâli ister: мешать соседям.'),
      W('d60a2no_6', 'Договориться', 'Dagavarítsa', 'Anlaşmak', 'A2', 'Давайте договоримся.')
    ],
    sentences: [
      S('Извините за беспокойство, но музыка очень громкая.', 'Rahatsız ettiğim için üzgünüm ama müzik çok yüksek.'),
      S('Не могли бы вы сделать потише после одиннадцати?', 'On birden sonra biraz kısabilir misiniz?'),
      S('Давайте договоримся по-хорошему.', 'Hadi iyilikle anlaşalım.')
    ]
  },
  {
    id: 'd60_a2_internet', unitNumber: 40.9808, levelGroup: 'A2',
    title: 'İnternet ve Arıza Kaydı', description: 'Bağlantı yok, teknisyen çağır',
    category: 'Günlük Hayat', color: '#1d4ed8', icon: '📶',
    grammarExplain: `📌 ARIZA BİLDİRİMİ:
1. Sorun: У меня не работает интернет. (İnternetim çalışmıyor.)
2. Süre: Уже два дня. (İki gündür.)
3. Talep: Можно вызвать мастера? (Teknisyen çağırabilir miyiz?)`,
    words: [
      W('d60a2in_1', 'Провайдер', 'Praváydir', 'Servis sağlayıcı', 'A2', 'İnternet şirketi.'),
      W('d60a2in_2', 'Роутер', 'Róutir', 'Modem / Router', 'A2', 'Перезагрузить роутер = modemi yeniden başlatmak.'),
      W('d60a2in_3', 'Не работает', 'Ni rabótayit', 'Çalışmıyor', 'A2', 'Her arıza cümlesinin çekirdeği.'),
      W('d60a2in_4', 'Вызвать мастера', 'Vízvat mástira', 'Teknisyen çağırmak', 'A2', 'мастер = usta/teknisyen.'),
      W('d60a2in_5', 'Заявка', 'Zayáfka', 'Talep kaydı', 'A2', 'Оставить заявку = kayıt açtırmak.'),
      W('d60a2in_6', 'Скорость', 'Skórast', 'Hız', 'A2', 'Скорость очень низкая.')
    ],
    sentences: [
      S('У меня уже два дня не работает интернет.', 'İki gündür internetim çalışmıyor.'),
      S('Я перезагрузил роутер, но не помогло.', 'Modemi yeniden başlattım ama işe yaramadı.'),
      S('Можно оставить заявку на мастера?', 'Teknisyen için kayıt açtırabilir miyim?')
    ]
  },
  {
    id: 'd60_a2_appointment', unitNumber: 40.9809, levelGroup: 'A2',
    title: 'Randevu Alma ve İptal', description: 'Saat ayarla, değiştir, iptal et',
    category: 'Günlük Hayat', color: '#9333ea', icon: '📞',
    grammarExplain: `📌 RANDEVU KALIPLARI:
1. Almak: Я хочу записаться на приём. (Randevu almak istiyorum.)
2. Zaman önerisi: Вам удобно в среду в десять? (Çarşamba onda uygun mu?)
3. İptal: Мне нужно отменить запись. Erteleme: перенести на другой день.`,
    words: [
      W('d60a2ap_1', 'Записаться', 'Zapisátsa', 'Randevu almak', 'A2', 'Kelime kelime "kaydolmak".'),
      W('d60a2ap_2', 'Приём', 'Priyóm', 'Randevu / Kabul saati', 'A2', 'Doktor ve kurumlarda kullanılır.'),
      W('d60a2ap_3', 'Свободное время', 'Svabódnaye vryémya', 'Boş saat', 'A2', 'Есть свободное время завтра?'),
      W('d60a2ap_4', 'Перенести', 'Pirinistí', 'Ertelemek', 'A2', 'Перенести на пятницу.'),
      W('d60a2ap_5', 'Отменить', 'Atminít', 'İptal etmek', 'A2', 'Отменить запись.'),
      W('d60a2ap_6', 'Удобно', 'Udóbna', 'Uygun / Rahat', 'A2', 'Вам удобно? = Size uygun mu?')
    ],
    sentences: [
      S('Я хочу записаться на приём в четверг.', 'Perşembeye randevu almak istiyorum.'),
      S('Можно перенести запись на пятницу?', 'Randevuyu cumaya erteleyebilir miyiz?'),
      S('К сожалению, мне нужно отменить.', 'Maalesef iptal etmem gerekiyor.')
    ]
  },
  {
    id: 'd60_a2_return', unitNumber: 40.981, levelGroup: 'A2',
    title: 'İade ve Değişim', description: 'Bozuk çıktı, geri vermek istiyorum',
    category: 'Günlük Hayat', color: '#b91c1c', icon: '↩️',
    grammarExplain: `📌 İADE TALEBİ:
1. Gerekçe: Товар бракованный. (Ürün kusurlu.) Не подошёл размер. (Beden uymadı.)
2. Talep: Я хочу вернуть / обменять этот товар.
3. Rusya'da satın alınan çoğu ürün 14 gün içinde iade edilebilir: в течение четырнадцати дней.`,
    words: [
      W('d60a2rt_1', 'Вернуть', 'Virnút', 'İade etmek', 'A2', 'Возврат = iade işlemi.'),
      W('d60a2rt_2', 'Обменять', 'Abminyát', 'Değiştirmek', 'A2', 'Обмен = değişim.'),
      W('d60a2rt_3', 'Бракованный', 'Brakóvannıy', 'Kusurlu', 'A2', 'брак = üretim hatası.'),
      W('d60a2rt_4', 'Гарантия', 'Garántiya', 'Garanti', 'A2', 'Гарантия год = bir yıl garanti.'),
      W('d60a2rt_5', 'Не подошёл', 'Ni padaşól', 'Uymadı', 'A2', 'Beden/renk için standart gerekçe.'),
      W('d60a2rt_6', 'Деньги обратно', 'Dyéngi abrátna', 'Para iadesi', 'A2', 'Вернуть деньги обратно.')
    ],
    sentences: [
      S('Я хочу вернуть этот товар, он бракованный.', 'Bu ürünü iade etmek istiyorum, kusurlu.'),
      S('Размер не подошёл, можно обменять?', 'Beden uymadı, değiştirebilir miyim?'),
      S('У меня есть чек и гарантия.', 'Fişim ve garanti belgem var.')
    ]
  },
  {
    id: 'd60_a2_transitcard', unitNumber: 40.9811, levelGroup: 'A2',
    title: 'Ulaşım Kartı ve Abonman', description: 'Yükle, bas, kontrol et',
    category: 'Günlük Hayat', color: '#0d9488', icon: '🎫',
    grammarExplain: `📌 KART İŞLEMLERİ:
1. Yükleme: пополнить карту на пятьсот рублей (karta 500 ruble yüklemek) — на + belirtme hâli.
2. Kalan: Сколько осталось на карте? (Kartta ne kadar kaldı?)
3. Turnikede: Приложите карту. (Kartı okutun.)`,
    words: [
      W('d60a2tc_1', 'Проездной', 'Prayizdnóy', 'Abonman kart', 'A2', 'Sıfattan isimleşmiştir.'),
      W('d60a2tc_2', 'Пополнить', 'Papólnit', 'Yüklemek', 'A2', 'Telefon kontörü için de kullanılır.'),
      W('d60a2tc_3', 'Турникет', 'Turnikyét', 'Turnike', 'A2', 'Metro girişinde.'),
      W('d60a2tc_4', 'Баланс', 'Baláns', 'Bakiye', 'A2', 'Проверить баланс.'),
      W('d60a2tc_5', 'Штраф', 'Ştraf', 'Ceza', 'A2', 'Kaçak binişte kesilir.'),
      W('d60a2tc_6', 'Контролёр', 'Kantralyór', 'Kontrolör', 'A2', 'Bilet denetimi yapan görevli.')
    ],
    sentences: [
      S('Я хочу пополнить карту на пятьсот рублей.', 'Karta beş yüz ruble yüklemek istiyorum.'),
      S('Сколько осталось на балансе?', 'Bakiyede ne kadar kaldı?'),
      S('Без билета можно получить штраф.', 'Biletsiz ceza yiyebilirsin.')
    ]
  },
  {
    id: 'd60_a2_driving', unitNumber: 40.9812, levelGroup: 'A2',
    title: 'Araba ve Trafik', description: 'Benzin, park, trafik cezası',
    category: 'Günlük Hayat', color: '#334155', icon: '🚗',
    grammarExplain: `📌 SÜRÜŞ DİLİ:
1. Yön: поверните направо, поезжайте прямо.
2. "Benzin almak" = заправиться / заправить машину.
3. Park: Здесь можно припарковаться? (Buraya park edilebilir mi?)`,
    words: [
      W('d60a2dr_1', 'Заправка', 'Zapráfka', 'Benzin istasyonu', 'A2', 'Заправиться = depoyu doldurmak.'),
      W('d60a2dr_2', 'Бензин', 'Binzín', 'Benzin', 'A2', 'Дизель = motorin.'),
      W('d60a2dr_3', 'Пробка', 'Própka', 'Trafik sıkışıklığı', 'A2', 'Aynı kelime "tıpa" demektir.'),
      W('d60a2dr_4', 'Парковка', 'Parkófka', 'Otopark', 'A2', 'Платная парковка = ücretli otopark.'),
      W('d60a2dr_5', 'Права', 'Prává', 'Ehliyet', 'A2', 'Çoğul; "haklar" anlamı da vardır.'),
      W('d60a2dr_6', 'Штраф', 'Ştraf', 'Trafik cezası', 'A2', 'Оплатить штраф.')
    ],
    sentences: [
      S('Нам нужно заправиться, бензин кончается.', 'Benzin almalıyız, yakıt bitiyor.'),
      S('На дороге большая пробка.', 'Yolda büyük bir trafik var.'),
      S('Здесь можно припарковаться?', 'Buraya park edebilir miyim?')
    ]
  },
  {
    id: 'd60_a2_schoolparent', unitNumber: 40.9813, levelGroup: 'A2',
    title: 'Okul ve Veli İletişimi', description: 'Ödev, not, devamsızlık',
    category: 'Günlük Hayat', color: '#4338ca', icon: '🎒',
    grammarExplain: `📌 VELİ DİLİ:
1. Rus not sistemi 5 üzerindendir: пятёрка (5) en iyi, двойка (2) başarısız.
2. "…-inci sınıfta" = в третьем классе.
3. Mazeret: Он заболел, поэтому не был в школе.`,
    words: [
      W('d60a2sp_1', 'Классный руководитель', 'Klássnıy rukavadítil', 'Sınıf öğretmeni', 'A2', 'Velinin ilk muhatabı.'),
      W('d60a2sp_2', 'Домашнее задание', 'Damáşniye zadániye', 'Ev ödevi', 'A2', 'Kısaltması домашка (gündelik).'),
      W('d60a2sp_3', 'Оценка', 'Atsénka', 'Not', 'A2', 'Хорошая оценка = iyi not.'),
      W('d60a2sp_4', 'Родительское собрание', 'Radítilskaye sabrániye', 'Veli toplantısı', 'A2', 'Genelde akşam yapılır.'),
      W('d60a2sp_5', 'Пропустить', 'Prapustít', 'Kaçırmak / Devamsızlık yapmak', 'A2', 'Пропустить уроки.'),
      W('d60a2sp_6', 'Дневник', 'Dnivník', 'Öğrenci karnesi/ajandası', 'A2', 'Notların yazıldığı defter.')
    ],
    sentences: [
      S('Завтра родительское собрание в шесть.', 'Yarın altıda veli toplantısı var.'),
      S('Сын заболел и пропустил два дня.', 'Oğlum hastalandı ve iki gün devamsızlık yaptı.'),
      S('Он получил хорошую оценку по русскому.', 'Rusçadan iyi bir not aldı.')
    ]
  },
  {
    id: 'd60_a2_dentist', unitNumber: 40.9814, levelGroup: 'A2',
    title: 'Diş Hekiminde', description: 'Diş ağrısı, dolgu, kontrol',
    category: 'Günlük Hayat', color: '#0ea5e9', icon: '🦷',
    grammarExplain: `📌 AĞRIYI TARİF ETMEK:
1. Yer: У меня болит верхний зуб слева. (Sol üstteki dişim ağrıyor.)
2. Süre: Уже неделю. (Bir haftadır.)
3. Tür: Болит, когда пью холодное. (Soğuk içince ağrıyor.)`,
    words: [
      W('d60a2de_1', 'Стоматолог', 'Stamatólak', 'Diş hekimi', 'A2', 'Günlük dilde зубной врач.'),
      W('d60a2de_2', 'Пломба', 'Plómba', 'Dolgu', 'A2', 'Поставить пломбу = dolgu yaptırmak.'),
      W('d60a2de_3', 'Удалить зуб', 'Udalít zup', 'Diş çekmek', 'A2', 'удаление = çekim işlemi.'),
      W('d60a2de_4', 'Кариес', 'Káriyis', 'Çürük', 'A2', 'Latinceden gelen tıbbi terim.'),
      W('d60a2de_5', 'Обезболивающее', 'Abizbólivayuşşiye', 'Ağrı kesici', 'A2', 'Sıfattan isimleşmiş uzun kelime.'),
      W('d60a2de_6', 'Осмотр', 'Asmótr', 'Muayene / Kontrol', 'A2', 'Профилактический осмотр = rutin kontrol.')
    ],
    sentences: [
      S('У меня уже неделю болит зуб.', 'Bir haftadır dişim ağrıyor.'),
      S('Нужно поставить пломбу.', 'Dolgu yapılması gerekiyor.'),
      S('Сделайте, пожалуйста, обезболивающее.', 'Lütfen ağrı kesici (uyuşturma) yapın.')
    ]
  },
  {
    id: 'd60_a2_fitness', unitNumber: 40.9815, levelGroup: 'A2',
    title: 'Hareket ve Sağlıklı Alışkanlık', description: 'Yürüyüş, koşu, su içmek',
    category: 'Günlük Hayat', color: '#22c55e', icon: '🏃',
    grammarExplain: `📌 SIKLIK ANLATIMI:
1. Kaç kez: три раза в неделю (haftada üç kez), каждый день (her gün).
2. Alışkanlık başlatma: Я начал бегать. (Koşmaya başladım.)
3. Miktar: Я стараюсь пить больше воды. (Daha çok su içmeye çalışıyorum.)`,
    words: [
      W('d60a2fi_1', 'Бегать', 'Byégat', 'Koşmak (düzenli)', 'A2', 'Tek seferlik koşu бежать.'),
      W('d60a2fi_2', 'Зарядка', 'Zaryátka', 'Sabah sporu', 'A2', 'Aynı kelime "şarj" demektir.'),
      W('d60a2fi_3', 'Привычка', 'Privíçka', 'Alışkanlık', 'A2', 'Полезная привычка = faydalı alışkanlık.'),
      W('d60a2fi_4', 'Стараться', 'Starátsa', 'Çabalamak', 'A2', 'Я стараюсь + mastar.'),
      W('d60a2fi_5', 'Шаги', 'Şagí', 'Adımlar', 'A2', 'Telefon sayaçlarında десять тысяч шагов.'),
      W('d60a2fi_6', 'Здоровье', 'Zdaróvye', 'Sağlık', 'A2', 'Для здоровья = sağlık için.')
    ],
    sentences: [
      S('Я бегаю три раза в неделю.', 'Haftada üç kez koşuyorum.'),
      S('Стараюсь проходить десять тысяч шагов.', 'On bin adım atmaya çalışıyorum.'),
      S('Это полезная привычка для здоровья.', 'Bu sağlık için faydalı bir alışkanlık.')
    ]
  },
  {
    id: 'd60_a2_locksmith', unitNumber: 40.9816, levelGroup: 'A2',
    title: 'Anahtar, Çilingir, Güvenlik', description: 'Kapıda kaldım!',
    category: 'Günlük Hayat', color: '#7c2d12', icon: '🔐',
    grammarExplain: `📌 ACİL DURUM ANLATIMI:
1. Kişisiz kalıp: Меня закрыло. / Я захлопнул дверь. (Kapıyı üstüme kapattım.)
2. Kayıp: Я потерял ключи. (Anahtarları kaybettim.)
3. Aciliyet: Это срочно. (Bu acil.) Как быстро вы приедете?`,
    words: [
      W('d60a2lo_1', 'Ключи', 'Klyuçí', 'Anahtarlar', 'A2', 'Çoğul kullanımı daha yaygındır.'),
      W('d60a2lo_2', 'Захлопнуть', 'Zahlópnut', 'Çarparak kapatmak', 'A2', 'Anahtar içeride kalma senaryosu.'),
      W('d60a2lo_3', 'Замок', 'Zamók', 'Kilit', 'A2', 'Поменять замок = kilidi değiştirmek.'),
      W('d60a2lo_4', 'Слесарь', 'Slyésar', 'Çilingir / Tesisatçı usta', 'A2', 'Вызвать слесаря.'),
      W('d60a2lo_5', 'Срочно', 'Sróçna', 'Acil', 'A2', 'Это срочно!'),
      W('d60a2lo_6', 'Открыть дверь', 'Atkrít dvyer', 'Kapıyı açmak', 'A2', 'Hizmet talebinin özü.')
    ],
    sentences: [
      S('Я захлопнул дверь, ключи внутри.', 'Kapıyı çarptım, anahtarlar içeride kaldı.'),
      S('Можно срочно вызвать слесаря?', 'Acilen çilingir çağırabilir miyiz?'),
      S('Сколько будет стоить открыть дверь?', 'Kapıyı açmak ne kadar tutar?')
    ]
  },
  {
    id: 'd60_a2_restaurant', unitNumber: 40.9817, levelGroup: 'A2',
    title: 'Restoran: Rezervasyon ve Hesap', description: 'Masa ayırt, sipariş ver, böl',
    category: 'Günlük Hayat', color: '#c2410c', icon: '🍽️',
    grammarExplain: `📌 RESTORAN KALIPLARI:
1. Rezervasyon: Я хочу забронировать столик на двоих на восемь вечера.
2. Sipariş: Я буду… (Ben … alacağım.)
3. Hesap: Счёт, пожалуйста. Можно разделить счёт? (Hesabı bölebilir miyiz?)`,
    words: [
      W('d60a2rs_1', 'Столик', 'Stólik', 'Masa (restoranda)', 'A2', 'Küçültme biçimi yerleşmiştir.'),
      W('d60a2rs_2', 'Забронировать', 'Zabraníravat', 'Rezerve etmek', 'A2', 'Бронь = rezervasyon.'),
      W('d60a2rs_3', 'Официант', 'Afitsiánt', 'Garson', 'A2', 'Seslenme: Извините! (isimle değil).'),
      W('d60a2rs_4', 'Заказ', 'Zakás', 'Sipariş', 'A2', 'Сделать заказ = sipariş vermek.'),
      W('d60a2rs_5', 'Чаевые', 'Çayivíye', 'Bahşiş', 'A2', 'чай (çay) kelimesinden; daima çoğul.'),
      W('d60a2rs_6', 'Разделить счёт', 'Razdilít şşot', 'Hesabı bölmek', 'A2', 'Arkadaş sofralarında sık.')
    ],
    sentences: [
      S('Я хочу забронировать столик на двоих.', 'İki kişilik masa ayırtmak istiyorum.'),
      S('Мы готовы сделать заказ.', 'Sipariş vermeye hazırız.'),
      S('Можно разделить счёт?', 'Hesabı bölebilir miyiz?')
    ]
  },
  {
    id: 'd60_a2_invite', unitNumber: 40.9818, levelGroup: 'A2',
    title: 'Davet Etme ve Reddetme', description: 'Çağır, kabul et, kibarca reddet',
    category: 'Günlük Hayat', color: '#db2777', icon: '💌',
    grammarExplain: `📌 KİBAR RET:
1. Doğrudan "нет" sert durur. Önce teşekkür: Спасибо за приглашение, но…
2. Gerekçe: К сожалению, я не смогу. У меня уже есть планы.
3. Alternatif öner: Может, в другой раз? (Belki başka zaman?)`,
    words: [
      W('d60a2iv_1', 'Приглашение', 'Priglaşéniye', 'Davet', 'A2', 'приглашать fiilinden.'),
      W('d60a2iv_2', 'В гости', 'V gósti', 'Misafirliğe', 'A2', 'Прийти в гости = misafirliğe gelmek.'),
      W('d60a2iv_3', 'К сожалению', 'K sajilyéniyu', 'Maalesef', 'A2', 'Kibar reddin açılışı.'),
      W('d60a2iv_4', 'Не смогу', 'Ni smagú', 'Gelemeyeceğim', 'A2', 'мочь fiilinin olumsuz geleceği.'),
      W('d60a2iv_5', 'В другой раз', 'V drugóy ras', 'Başka bir zaman', 'A2', 'Reddi yumuşatır.'),
      W('d60a2iv_6', 'С удовольствием', 'S udavólstviyem', 'Memnuniyetle', 'A2', 'Kabulün en sıcak biçimi.')
    ],
    sentences: [
      S('Приходи к нам в гости в субботу!', 'Cumartesi bize misafirliğe gel!'),
      S('С удовольствием, спасибо за приглашение.', 'Memnuniyetle, davet için teşekkürler.'),
      S('К сожалению, не смогу. Может, в другой раз?', 'Maalesef gelemeyeceğim. Belki başka zaman?')
    ]
  },
  {
    id: 'd60_a2_repairman', unitNumber: 40.9819, levelGroup: 'A2',
    title: 'Tesisatçı ve Elektrikçi', description: 'Su akıyor, ışık yanmıyor',
    category: 'Günlük Hayat', color: '#0369a1', icon: '🔧',
    grammarExplain: `📌 ARIZA FİİLLERİ:
1. Kendiliğinden olan bozulmalar -ся alır: кран течёт, лампочка перегорела, труба протекает.
2. "Bozuldu" = сломался / сломалась (cinse uyar).
3. Fiyat sorusu: Сколько будет стоить ремонт?`,
    words: [
      W('d60a2rp_1', 'Кран', 'Kran', 'Musluk', 'A2', 'Кран течёт = musluk akıtıyor.'),
      W('d60a2rp_2', 'Протекать', 'Pratikát', 'Su sızdırmak', 'A2', 'Труба протекает.'),
      W('d60a2rp_3', 'Розетка', 'Razyétka', 'Priz', 'A2', 'Aynı kelime "küçük gül" demektir.'),
      W('d60a2rp_4', 'Лампочка', 'Lámpaçka', 'Ampul', 'A2', 'Перегорела лампочка = ampul patladı.'),
      W('d60a2rp_5', 'Сломаться', 'Slamátsa', 'Bozulmak', 'A2', 'Стиральная машина сломалась.'),
      W('d60a2rp_6', 'Электрик', 'Elyéktrik', 'Elektrikçi', 'A2', 'Tesisatçı ise сантехник.')
    ],
    sentences: [
      S('На кухне течёт кран.', 'Mutfakta musluk akıtıyor.'),
      S('В ванной не работает розетка.', 'Banyoda priz çalışmıyor.'),
      S('Сколько будет стоить ремонт?', 'Tamir ne kadar tutar?')
    ]
  },
  {
    id: 'd60_a2_smalltalk', unitNumber: 40.982, levelGroup: 'A2',
    title: 'Havadan Sudan Sohbet', description: 'Asansörde, kuyrukta, işte muhabbet',
    category: 'Günlük Hayat', color: '#64748b', icon: '🗨️',
    grammarExplain: `📌 SOHBETİ BAŞLATMAK VE SÜRDÜRMEK:
1. Güvenli konular: hava, trafik, tatil, çocuklar. (Siyaset ve maaş genelde açılmaz.)
2. Devam ettirici sorular: А вы? / Правда? / И как?
3. Kapatma: Ладно, мне пора. (Tamam, benim gitmem lazım.)`,
    words: [
      W('d60a2st_1', 'Кстати', 'Kstáti', 'Bu arada', 'A2', 'Konu değiştirmenin en doğal yolu.'),
      W('d60a2st_2', 'Как обычно', 'Kak abıçna', 'Her zamanki gibi', 'A2', '"Nasılsın" sorusuna rahat cevap.'),
      W('d60a2st_3', 'Представляешь', 'Pritstavlyáyiş', 'Düşünsene', 'A2', 'Hikâyeye giriş kalıbı.'),
      W('d60a2st_4', 'Мне пора', 'Mnye pará', 'Gitmem lazım', 'A2', 'Kibar kapanış.'),
      W('d60a2st_5', 'Слушай', 'Slúşay', 'Baksana', 'A2', 'Samimi dikkat çekme.'),
      W('d60a2st_6', 'Как дела на работе', 'Kak dilá na rabóti', 'İşler nasıl gidiyor', 'A2', 'Güvenli sohbet sorusu.')
    ],
    sentences: [
      S('Кстати, как дела на работе?', 'Bu arada, işler nasıl gidiyor?'),
      S('Как обычно, ничего нового.', 'Her zamanki gibi, yeni bir şey yok.'),
      S('Ладно, мне пора. Увидимся!', 'Tamam, benim gitmem lazım. Görüşürüz!')
    ]
  }
];
