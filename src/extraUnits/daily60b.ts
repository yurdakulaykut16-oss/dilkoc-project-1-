import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const DAILY60_B1: UnitModule[] = [
  {
    id: 'd60_b1_leave', unitNumber: 95.9801, levelGroup: 'B1',
    title: 'İş Yerinde İzin ve Rapor', description: 'İzin iste, rapor bildir',
    category: 'İş Hayatı', color: '#1e40af', icon: '📝',
    grammarExplain: `📌 RESMÎ TALEP:
1. Dilekçe kalıbı: Прошу предоставить отпуск с 5 по 12 августа. (с … по … = …-den …-e kadar.)
2. Sözlü rica: Можно взять отгул в пятницу?
3. Bildirim: Я на больничном. (Raporluyum.)`,
    words: [
      W('d60b1lv_1', 'Отпуск', 'Ótpusk', 'Yıllık izin', 'B1', 'В отпуске = izinde.'),
      W('d60b1lv_2', 'Отгул', 'Atgúl', 'Bir günlük izin', 'B1', 'Fazla mesai karşılığı verilir.'),
      W('d60b1lv_3', 'Больничный', 'Balníçnıy', 'Hastalık raporu', 'B1', 'Sıfattan isimleşmiştir.'),
      W('d60b1lv_4', 'Заявление', 'Zayavlyéniye', 'Dilekçe', 'B1', 'Написать заявление.'),
      W('d60b1lv_5', 'Согласовать', 'Saglasavát', 'Onay almak', 'B1', 'Согласовать с руководителем.'),
      W('d60b1lv_6', 'Замена', 'Zamyéna', 'Yerine bakacak kişi', 'B1', 'Кто будет на замене?')
    ],
    sentences: [
      S('Прошу предоставить отпуск с пятого по двенадцатое августа.', 'Beş ile on iki Ağustos arası izin talep ediyorum.'),
      S('Я на больничном до конца недели.', 'Hafta sonuna kadar raporluyum.'),
      S('Нужно согласовать это с руководителем.', 'Bunu yöneticiyle görüşüp onaylatmak gerekiyor.')
    ]
  },
  {
    id: 'd60_b1_lease', unitNumber: 95.9802, levelGroup: 'B1',
    title: 'Kira Sözleşmesi', description: 'Madde oku, depozito, çıkış',
    category: 'Günlük Hayat', color: '#7c3aed', icon: '📄',
    grammarExplain: `📌 SÖZLEŞME DİLİ:
1. Yükümlülük: Наниматель обязан… / Собственник имеет право…
2. Süre: сроком на один год (bir yıl süreyle).
3. Fesih: расторгнуть договор, предупредив за месяц (bir ay önceden haber vererek).`,
    words: [
      W('d60b1le_1', 'Договор аренды', 'Dagavór aryéndı', 'Kira sözleşmesi', 'B1', 'Vurgu договОр\'da sondadır.'),
      W('d60b1le_2', 'Наниматель', 'Nanimátil', 'Kiracı', 'B1', 'Resmî terim; halk dilinde квартирант.'),
      W('d60b1le_3', 'Собственник', 'Sópstvinnik', 'Mülk sahibi', 'B1', 'Halk dilinde хозяин.'),
      W('d60b1le_4', 'Расторгнуть', 'Rastórgnut', 'Feshetmek', 'B1', 'Расторгнуть договор.'),
      W('d60b1le_5', 'Предупредить', 'Pridupridít', 'Önceden haber vermek', 'B1', 'Предупредить за месяц.'),
      W('d60b1le_6', 'Опись имущества', 'Ópis imúşşistva', 'Demirbaş listesi', 'B1', 'Depozito tartışmasını önler.')
    ],
    sentences: [
      S('Договор заключается сроком на один год.', 'Sözleşme bir yıl süreyle yapılır.'),
      S('Наниматель обязан предупредить за месяц.', 'Kiracı bir ay önceden haber vermekle yükümlüdür.'),
      S('Залог возвращается при выезде.', 'Depozito çıkışta iade edilir.')
    ]
  },
  {
    id: 'd60_b1_insurance', unitNumber: 95.9803, levelGroup: 'B1',
    title: 'Sağlık Sigortası', description: 'Poliçe, kapsam, sevk',
    category: 'Günlük Hayat', color: '#0d9488', icon: '🏥',
    grammarExplain: `📌 KAPSAM ANLATIMI:
1. Kapsıyor: Страховка покрывает приём врача. (Sigorta muayeneyi karşılıyor.)
2. Kapsamıyor: Это не входит в полис. (Bu poliçeye dâhil değil.)
3. Şart: при наличии направления (sevk belgesi varsa).`,
    words: [
      W('d60b1is_1', 'Полис', 'Pólis', 'Poliçe', 'B1', 'ОМС = zorunlu genel sağlık sigortası.'),
      W('d60b1is_2', 'Страховка', 'Strahófka', 'Sigorta', 'B1', 'Günlük karşılığı; resmîsi страхование.'),
      W('d60b1is_3', 'Покрывать', 'Pakrıvát', 'Karşılamak (masrafı)', 'B1', 'Страховка покрывает расходы.'),
      W('d60b1is_4', 'Направление', 'Napravlyéniye', 'Sevk belgesi', 'B1', 'Uzman hekime gitmenin ön şartı.'),
      W('d60b1is_5', 'Поликлиника', 'Paliklínika', 'Aile sağlığı merkezi', 'B1', 'Mahalle sağlık kuruluşu.'),
      W('d60b1is_6', 'Платно', 'Plátna', 'Ücretli', 'B1', 'Karşıtı бесплатно.')
    ],
    sentences: [
      S('Страховка покрывает приём терапевта.', 'Sigorta pratisyen muayenesini karşılıyor.'),
      S('Для специалиста нужно направление.', 'Uzman hekim için sevk gerekiyor.'),
      S('Это исследование только платно.', 'Bu tetkik sadece ücretli.')
    ]
  },
  {
    id: 'd60_b1_bureau', unitNumber: 95.9804, levelGroup: 'B1',
    title: 'Resmî Kurumda İşlem', description: 'Sıra al, belge ver, bekle',
    category: 'Günlük Hayat', color: '#475569', icon: '🏛️',
    grammarExplain: `📌 KURUM DİLİ:
1. Sıra: взять талон (sıra fişi almak), ждать вызова (çağrılmayı beklemek).
2. Belge isteme: Какие документы нужны? (Hangi belgeler gerekli?)
3. Süre: Срок рассмотрения — десять рабочих дней.`,
    words: [
      W('d60b1bu_1', 'Талон', 'Talón', 'Sıra fişi', 'B1', 'Elektronik sıra sisteminde.'),
      W('d60b1bu_2', 'Документы', 'Dakumyéntı', 'Belgeler', 'B1', 'Паспорт en temelidir.'),
      W('d60b1bu_3', 'Окно', 'Aknó', 'Gişe', 'B1', 'Подойдите к окну номер три.'),
      W('d60b1bu_4', 'Справка', 'Správka', 'Resmî yazı/belge', 'B1', 'Rus bürokrasisinin simgesi.'),
      W('d60b1bu_5', 'Рабочие дни', 'Rabóçiye dni', 'İş günleri', 'B1', 'Süreler bununla sayılır.'),
      W('d60b1bu_6', 'Оформить', 'Afórmit', 'İşlemini yapmak', 'B1', 'Оформить документы.')
    ],
    sentences: [
      S('Возьмите талон и ждите вызова.', 'Sıra fişi alın ve çağrılmayı bekleyin.'),
      S('Какие документы нужны для оформления?', 'İşlem için hangi belgeler gerekiyor?'),
      S('Срок рассмотрения — десять рабочих дней.', 'İnceleme süresi on iş günüdür.')
    ]
  },
  {
    id: 'd60_b1_complaint', unitNumber: 95.9805, levelGroup: 'B1',
    title: 'Şikâyet ve Tüketici Hakları', description: 'Hakkını ara, dilekçe yaz',
    category: 'Günlük Hayat', color: '#b91c1c', icon: '⚖️',
    grammarExplain: `📌 HAK TALEBİ:
1. Dayanak: В соответствии с законом о защите прав потребителей…
2. Talep: Я требую вернуть деньги. (Paranın iadesini talep ediyorum.)
3. Kademelendirme: Если вопрос не решится, я буду вынужден обратиться в суд.`,
    words: [
      W('d60b1co_1', 'Жалоба', 'Jálaba', 'Şikâyet', 'B1', 'Подать жалобу = şikâyette bulunmak.'),
      W('d60b1co_2', 'Претензия', 'Priténziya', 'Resmî itiraz/ihtar', 'B1', 'Yazılı olarak verilir.'),
      W('d60b1co_3', 'Права потребителя', 'Prává patribítilya', 'Tüketici hakları', 'B1', 'Kanunun adı bu ifadeyle geçer.'),
      W('d60b1co_4', 'Требовать', 'Tryébavat', 'Talep etmek', 'B1', 'просить\'ten çok daha güçlüdür.'),
      W('d60b1co_5', 'Книга жалоб', 'Kníga jálap', 'Şikâyet defteri', 'B1', 'Rus işletmelerinde bulundurulur.'),
      W('d60b1co_6', 'Обратиться в суд', 'Abratítsa f sut', 'Mahkemeye başvurmak', 'B1', 'Son aşama.')
    ],
    sentences: [
      S('Я хочу подать жалобу на качество услуги.', 'Hizmet kalitesi hakkında şikâyette bulunmak istiyorum.'),
      S('Согласно закону, я имею право на возврат.', 'Kanuna göre iade hakkım var.'),
      S('Если вопрос не решится, я обращусь в суд.', 'Sorun çözülmezse mahkemeye başvuracağım.')
    ]
  },
  {
    id: 'd60_b1_moving', unitNumber: 95.9806, levelGroup: 'B1',
    title: 'Ev Taşınma', description: 'Kolile, nakliye, adres değişikliği',
    category: 'Günlük Hayat', color: '#ca8a04', icon: '📦',
    grammarExplain: `📌 ORGANİZASYON DİLİ:
1. Sıra: сначала упаковать, затем перевезти, наконец разобрать.
2. Kiralama: заказать грузчиков / газель (nakliye aracı).
3. Bildirim: сменить адрес доставки (teslimat adresini değiştirmek).`,
    words: [
      W('d60b1mv_1', 'Переезд', 'Piriyést', 'Taşınma', 'B1', 'переехать fiilinden.'),
      W('d60b1mv_2', 'Упаковать', 'Upakavát', 'Paketlemek', 'B1', 'Упаковать вещи в коробки.'),
      W('d60b1mv_3', 'Коробка', 'Karópka', 'Kutu / Koli', 'B1', 'Taşınmanın birimi.'),
      W('d60b1mv_4', 'Грузчики', 'Grúşşiki', 'Hamallar', 'B1', 'Nakliyat şirketinden çağrılır.'),
      W('d60b1mv_5', 'Хрупкое', 'Hrúpkaye', 'Kırılacak eşya', 'B1', 'Kolinin üstüne yazılır.'),
      W('d60b1mv_6', 'Разобрать вещи', 'Razabrát véşşi', 'Eşyaları yerleştirmek', 'B1', 'Taşınmanın son aşaması.')
    ],
    sentences: [
      S('Мы переезжаем в новую квартиру в субботу.', 'Cumartesi yeni daireye taşınıyoruz.'),
      S('Нужно заказать грузчиков и газель.', 'Hamal ve nakliye aracı ayarlamak gerekiyor.'),
      S('На этой коробке написано «хрупкое».', 'Bu kolinin üstünde "kırılacak eşya" yazıyor.')
    ]
  },
  {
    id: 'd60_b1_carbuy', unitNumber: 95.9807, levelGroup: 'B1',
    title: 'Araba Almak ve Sigortalamak', description: 'İkinci el, ekspertiz, poliçe',
    category: 'Günlük Hayat', color: '#334155', icon: '🚙',
    grammarExplain: `📌 PAZARLIK VE KONTROL:
1. Durum sorusu: Машина была в аварии? (Araç kaza yaptı mı?)
2. Pazarlık: Готовы уступить? (İndirim yapar mısınız?)
3. Şart: при условии проверки в сервисе (serviste kontrol edilmesi şartıyla).`,
    words: [
      W('d60b1cb_1', 'Подержанная машина', 'Padyérjannaya maşína', 'İkinci el araba', 'B1', 'б/у kısaltmasıyla da yazılır.'),
      W('d60b1cb_2', 'Пробег', 'Prabyék', 'Kilometre', 'B1', 'Пробег сто тысяч километров.'),
      W('d60b1cb_3', 'Авария', 'Avária', 'Kaza', 'B1', 'ДТП resmî kısaltmasıdır.'),
      W('d60b1cb_4', 'ОСАГО', 'Asága', 'Zorunlu trafik sigortası', 'B1', 'Rusya\'da yasal zorunluluktur.'),
      W('d60b1cb_5', 'Уступить', 'Ustupít', 'İndirim yapmak', 'B1', 'Pazarlığın anahtar fiili.'),
      W('d60b1cb_6', 'Техосмотр', 'Tihasmótr', 'Muayene', 'B1', 'Teknik kontrol.')
    ],
    sentences: [
      S('Какой пробег у этой машины?', 'Bu arabanın kilometresi ne?'),
      S('Машина была в аварии?', 'Araç kaza geçirdi mi?'),
      S('Без ОСАГО ездить нельзя.', 'Zorunlu sigorta olmadan araç kullanılamaz.')
    ]
  },
  {
    id: 'd60_b1_credit', unitNumber: 95.9808, levelGroup: 'B1',
    title: 'Kredi ve Kart Sorunları', description: 'Faiz, taksit, itiraz',
    category: 'Günlük Hayat', color: '#059669', icon: '🏦',
    grammarExplain: `📌 FİNANS DİLİ:
1. Oran: под двенадцать процентов годовых (yıllık %12 faizle).
2. Süre: на пять лет (beş yıl vadeli).
3. İtiraz: Я не совершал эту операцию. (Bu işlemi ben yapmadım.)`,
    words: [
      W('d60b1cr_1', 'Кредит', 'Kridít', 'Kredi', 'B1', 'Взять кредит = kredi çekmek.'),
      W('d60b1cr_2', 'Процент', 'Pratsént', 'Faiz / Yüzde', 'B1', 'Процентная ставка = faiz oranı.'),
      W('d60b1cr_3', 'Рассрочка', 'Rassróçka', 'Taksit', 'B1', 'Faizsiz taksit anlamında kullanılır.'),
      W('d60b1cr_4', 'Ежемесячный платёж', 'Yijimyésiçnıy platyój', 'Aylık ödeme', 'B1', 'Kredi hesabının merkezi.'),
      W('d60b1cr_5', 'Списание', 'Spisániye', 'Hesaptan çekim', 'B1', 'Незнакомое списание = tanımadığın işlem.'),
      W('d60b1cr_6', 'Оспорить', 'Aspórit', 'İtiraz etmek', 'B1', 'Оспорить операцию.')
    ],
    sentences: [
      S('Кредит выдаётся под двенадцать процентов годовых.', 'Kredi yıllık yüzde on iki faizle veriliyor.'),
      S('Какой будет ежемесячный платёж?', 'Aylık ödeme ne kadar olacak?'),
      S('Я хочу оспорить это списание.', 'Bu işleme itiraz etmek istiyorum.')
    ]
  },
  {
    id: 'd60_b1_conflict', unitNumber: 95.9809, levelGroup: 'B1',
    title: 'Anlaşmazlığı Çözmek', description: 'Sakin kal, uzlaş, sınır koy',
    category: 'Günlük Hayat', color: '#9333ea', icon: '🤝',
    grammarExplain: `📌 YAPICI DİL:
1. "Ben" dili suçlamayı azaltır: Мне неудобно, когда… (… olduğunda rahatsız oluyorum.)
2. Öneri: Давайте найдём решение, которое устроит обоих.
3. Sınır: Я не готов это обсуждать. (Bunu tartışmaya hazır değilim.)`,
    words: [
      W('d60b1cn_1', 'Конфликт', 'Kanflíkt', 'Anlaşmazlık', 'B1', 'Уладить конфликт = çözmek.'),
      W('d60b1cn_2', 'Уступка', 'Ustúpka', 'Taviz', 'B1', 'Пойти на уступки.'),
      W('d60b1cn_3', 'Компромисс', 'Kampramíss', 'Uzlaşma', 'B1', 'Найти компромисс.'),
      W('d60b1cn_4', 'Спокойно', 'Spakóyna', 'Sakin şekilde', 'B1', 'Давай спокойно обсудим.'),
      W('d60b1cn_5', 'Устраивать', 'Ustráivat', 'Uygun gelmek', 'B1', 'Это меня не устраивает.'),
      W('d60b1cn_6', 'Извиниться', 'İzvinítsa', 'Özür dilemek', 'B1', 'Извиниться перед кем-то.')
    ],
    sentences: [
      S('Давай спокойно обсудим эту ситуацию.', 'Hadi bu durumu sakince konuşalım.'),
      S('Такой вариант меня не устраивает.', 'Bu seçenek bana uygun değil.'),
      S('Нам нужно найти компромисс.', 'Bir uzlaşma bulmamız gerekiyor.')
    ]
  },
  {
    id: 'd60_b1_budget', unitNumber: 95.981, levelGroup: 'B1',
    title: 'Aile Bütçesi', description: 'Gelir, gider, birikim',
    category: 'Günlük Hayat', color: '#16a34a', icon: '📊',
    grammarExplain: `📌 PARA PLANLAMA DİLİ:
1. Ayırmak: откладывать десять процентов от зарплаты.
2. Yetmek: Денег хватает / не хватает. — tamlayan hâl ister.
3. Kısmak: сократить расходы на развлечения.`,
    words: [
      W('d60b1bg_1', 'Доход', 'Dahót', 'Gelir', 'B1', 'Karşıtı расход.'),
      W('d60b1bg_2', 'Расходы', 'Rashódı', 'Giderler', 'B1', 'Genelde çoğul.'),
      W('d60b1bg_3', 'Откладывать', 'Atkládıvat', 'Kenara koymak', 'B1', 'Birikim yapmanın fiili.'),
      W('d60b1bg_4', 'Накопления', 'Nakaplyéniya', 'Birikim', 'B1', 'Daima çoğul.'),
      W('d60b1bg_5', 'Хватать', 'Hvatát', 'Yetmek', 'B1', 'Денег не хватает до зарплаты.'),
      W('d60b1bg_6', 'Экономить', 'Ekanómit', 'Tasarruf etmek', 'B1', 'Экономить на чём-то.')
    ],
    sentences: [
      S('Мы стараемся откладывать десять процентов от зарплаты.', 'Maaşın yüzde onunu biriktirmeye çalışıyoruz.'),
      S('В этом месяце расходы больше, чем доходы.', 'Bu ay giderler gelirlerden fazla.'),
      S('Нужно сократить расходы на развлечения.', 'Eğlence harcamalarını kısmak gerekiyor.')
    ]
  },
  {
    id: 'd60_b1_freelance', unitNumber: 95.9811, levelGroup: 'B1',
    title: 'Serbest Çalışma', description: 'Müşteri bul, fiyat ver, fatura kes',
    category: 'İş Hayatı', color: '#0891b2', icon: '💻',
    grammarExplain: `📌 TEKLİF VERME:
1. Fiyatlandırma: Стоимость работы — тридцать тысяч рублей.
2. Süre taahhüdü: Срок выполнения — две недели.
3. Ön ödeme: Работаю по предоплате пятьдесят процентов.`,
    words: [
      W('d60b1fl_1', 'Фриланс', 'Fríláns', 'Serbest çalışma', 'B1', 'Фрилансер = serbest çalışan.'),
      W('d60b1fl_2', 'Заказчик', 'Zakáşşik', 'Müşteri / İş veren', 'B1', 'Yüklenici ise исполнитель.'),
      W('d60b1fl_3', 'Техническое задание', 'Tihníçiskaye zadániye', 'İş tanımı / Brief', 'B1', 'Kısaltması ТЗ.'),
      W('d60b1fl_4', 'Предоплата', 'Pridapláta', 'Ön ödeme', 'B1', 'Serbest çalışmanın güvencesi.'),
      W('d60b1fl_5', 'Самозанятый', 'Samazánitıy', 'Serbest meslek mükellefi', 'B1', 'Rusya\'daki basit vergi statüsü.'),
      W('d60b1fl_6', 'Сроки', 'Sróki', 'Teslim süreleri', 'B1', 'Соблюдать сроки = süreye uymak.')
    ],
    sentences: [
      S('Пришлите, пожалуйста, техническое задание.', 'Lütfen iş tanımını gönderin.'),
      S('Я работаю по предоплате пятьдесят процентов.', 'Yüzde elli ön ödemeyle çalışıyorum.'),
      S('Срок выполнения — две недели.', 'Teslim süresi iki hafta.')
    ]
  },
  {
    id: 'd60_b1_diet', unitNumber: 95.9812, levelGroup: 'B1',
    title: 'Beslenme ve Sağlıklı Yaşam', description: 'Kalori, alerji, denge',
    category: 'Günlük Hayat', color: '#84cc16', icon: '🥗',
    grammarExplain: `📌 KISITLAMA ANLATIMI:
1. Alerji: У меня аллергия на орехи. (на + belirtme hâli.)
2. Kaçınma: Я стараюсь не есть сладкое.
3. Öneri: Врач посоветовал отказаться от соли.`,
    words: [
      W('d60b1di_1', 'Питание', 'Pitániye', 'Beslenme', 'B1', 'Правильное питание = dengeli beslenme.'),
      W('d60b1di_2', 'Аллергия', 'Allirgíya', 'Alerji', 'B1', 'Restoranda hayati bilgi.'),
      W('d60b1di_3', 'Отказаться от', 'Atkazátsa at', '…-den vazgeçmek', 'B1', 'Tamlayan hâl ister.'),
      W('d60b1di_4', 'Калории', 'Kalórii', 'Kalori', 'B1', 'Считать калории.'),
      W('d60b1di_5', 'Вегетарианец', 'Vigitariánits', 'Vejetaryen', 'B1', 'Vegan ise веган.'),
      W('d60b1di_6', 'Состав', 'Sastáf', 'İçindekiler', 'B1', 'Ambalajda okunacak bölüm.')
    ],
    sentences: [
      S('У меня аллергия на орехи.', 'Fındık-ceviz alerjim var.'),
      S('Врач посоветовал отказаться от соли.', 'Doktor tuzdan vazgeçmemi önerdi.'),
      S('Я вегетарианец, мясо не ем.', 'Vejetaryenim, et yemiyorum.')
    ]
  },
  {
    id: 'd60_b1_parenting', unitNumber: 95.9813, levelGroup: 'B1',
    title: 'Çocuk Büyütmek', description: 'Kreş, kurallar, ekran süresi',
    category: 'Günlük Hayat', color: '#f59e0b', icon: '👶',
    grammarExplain: `📌 KURAL KOYMA DİLİ:
1. İzin/yasak kişisizdir: Можно смотреть мультики час в день. Нельзя сидеть в телефоне за столом.
2. Zorunluluk: Ему нужно ложиться в девять.
3. Gelişim anlatımı: Он уже сам одевается. (Artık kendi giyiniyor.)`,
    words: [
      W('d60b1pa_1', 'Детский сад', 'Dyétskiy sat', 'Anaokulu', 'B1', 'Kısaltması садик.'),
      W('d60b1pa_2', 'Воспитатель', 'Vaspitátil', 'Anaokulu öğretmeni', 'B1', 'учитель okul içindir.'),
      W('d60b1pa_3', 'Режим дня', 'Rijím dnya', 'Günlük düzen', 'B1', 'Rus çocuk yetiştirmesinin anahtar kavramı.'),
      W('d60b1pa_4', 'Капризничать', 'Kaprízniçat', 'Huysuzlanmak', 'B1', 'Yorgun çocuk için kullanılır.'),
      W('d60b1pa_5', 'Хвалить', 'Hvalít', 'Övmek', 'B1', 'Karşıtı ругать (azarlamak).'),
      W('d60b1pa_6', 'Самостоятельный', 'Samastayátilnıy', 'Bağımsız / Kendi başına', 'B1', 'Gelişim hedefi olarak anılır.')
    ],
    sentences: [
      S('Мы водим сына в детский сад с трёх лет.', 'Oğlumuzu üç yaşından beri anaokuluna gönderiyoruz.'),
      S('Ему нужно ложиться спать в девять.', 'Dokuzda yatması gerekiyor.'),
      S('Она уже очень самостоятельная.', 'O artık çok bağımsız.')
    ]
  },
  {
    id: 'd60_b1_accident', unitNumber: 95.9814, levelGroup: 'B1',
    title: 'Kaza ve İhbar', description: 'Polis çağır, tutanak, sigorta bildirimi',
    category: 'Günlük Hayat', color: '#dc2626', icon: '🚨',
    grammarExplain: `📌 OLAY ANLATIMI (geçmiş zaman):
1. Sıra: Я ехал прямо, когда он неожиданно повернул.
2. Sonuç: В результате никто не пострадал. (Sonuçta kimse yaralanmadı.)
3. Bildirim: Я хочу сообщить о ДТП.`,
    words: [
      W('d60b1ac_1', 'ДТП', 'De-te-pé', 'Trafik kazası', 'B1', 'дорожно-транспортное происшествие kısaltması.'),
      W('d60b1ac_2', 'Пострадать', 'Pastradát', 'Zarar görmek / Yaralanmak', 'B1', 'Никто не пострадал.'),
      W('d60b1ac_3', 'Протокол', 'Pratakól', 'Tutanak', 'B1', 'Составить протокол.'),
      W('d60b1ac_4', 'Свидетель', 'Svidyétil', 'Tanık', 'B1', 'Есть свидетели?'),
      W('d60b1ac_5', 'Скорая помощь', 'Skóraya pómaşş', 'Ambulans', 'B1', 'Kısaca скорая; numarası 103.'),
      W('d60b1ac_6', 'Виновник', 'Vinóvnik', 'Kusurlu taraf', 'B1', 'Sigorta sürecinin anahtar kelimesi.')
    ],
    sentences: [
      S('Я хочу сообщить о ДТП на перекрёстке.', 'Kavşaktaki trafik kazasını bildirmek istiyorum.'),
      S('К счастью, никто не пострадал.', 'Neyse ki kimse yaralanmadı.'),
      S('Сотрудник составил протокол.', 'Görevli tutanak düzenledi.')
    ]
  },
  {
    id: 'd60_b1_gadget', unitNumber: 95.9815, levelGroup: 'B1',
    title: 'Cihaz Tamiri ve Garanti', description: 'Servise ver, ekran değişimi',
    category: 'Günlük Hayat', color: '#6366f1', icon: '📱',
    grammarExplain: `📌 SERVİS SÜRECİ:
1. Teslim: сдать телефон в ремонт (telefonu tamire vermek).
2. Teşhis: Диагностика бесплатная.
3. Tahmin: Ремонт займёт три дня. (Tamir üç gün sürecek.)`,
    words: [
      W('d60b1ga_1', 'Сервисный центр', 'Sérvisnıy tsentr', 'Yetkili servis', 'B1', 'Garanti işlemleri burada yapılır.'),
      W('d60b1ga_2', 'Диагностика', 'Diagnóstika', 'Arıza tespiti', 'B1', 'Genelde ücretsizdir.'),
      W('d60b1ga_3', 'Замена экрана', 'Zamyéna ekrána', 'Ekran değişimi', 'B1', 'En sık yapılan onarım.'),
      W('d60b1ga_4', 'Гарантийный случай', 'Garantíynıy slúçay', 'Garanti kapsamı', 'B1', 'Kapsam dışıysa не гарантийный случай.'),
      W('d60b1ga_5', 'Занять', 'Zanyát', 'Sürmek (zaman)', 'B1', 'Ремонт займёт три дня.'),
      W('d60b1ga_6', 'Запчасть', 'Zapçást', 'Yedek parça', 'B1', 'Ждать запчасть.')
    ],
    sentences: [
      S('Я хочу сдать телефон в ремонт.', 'Telefonu tamire vermek istiyorum.'),
      S('Это гарантийный случай?', 'Bu garanti kapsamında mı?'),
      S('Ремонт займёт около трёх дней.', 'Tamir yaklaşık üç gün sürecek.')
    ]
  }
];

export const DAILY60_B2: UnitModule[] = [
  {
    id: 'd60_b2_tenantlaw', unitNumber: 143.9801, levelGroup: 'B2',
    title: 'Kiracı–Ev Sahibi Hukuku', description: 'Zam, tahliye, depozito anlaşmazlığı',
    category: 'Günlük Hayat', color: '#7c3aed', icon: '📑',
    grammarExplain: `📌 HUKUKİ TARTIŞMA:
1. Dayanak: В соответствии с пунктом пять договора… (Sözleşmenin beşinci maddesine göre…)
2. Koşullu itiraz: Если повышение не согласовано, оно не имеет силы.
3. Edilgen: Залог был удержан без оснований. (Depozito dayanaksız şekilde tutuldu.)`,
    words: [
      W('d60b2tl_1', 'Повышение арендной платы', 'Pavışéniye aryéndnay plátı', 'Kira artışı', 'B2', 'Sözleşmede sınırı yazılır.'),
      W('d60b2tl_2', 'Выселение', 'Vısilyéniye', 'Tahliye', 'B2', 'Mahkeme kararıyla yapılır.'),
      W('d60b2tl_3', 'Удержать', 'Udirját', 'Alıkoymak / Kesmek', 'B2', 'Удержать залог.'),
      W('d60b2tl_4', 'Основание', 'Asnavániye', 'Dayanak / Gerekçe', 'B2', 'Без оснований = dayanaksız.'),
      W('d60b2tl_5', 'Пункт договора', 'Punkt dagavóra', 'Sözleşme maddesi', 'B2', 'Atıf yaparken kullanılır.'),
      W('d60b2tl_6', 'Иметь силу', 'İmyét sílu', 'Geçerli olmak', 'B2', 'Hukuki geçerlilik ifadesi.')
    ],
    sentences: [
      S('В соответствии с пунктом пять договора, повышение должно быть согласовано.', 'Sözleşmenin beşinci maddesine göre artış mutabık kalınmalıdır.'),
      S('Залог был удержан без оснований.', 'Depozito dayanaksız biçimde tutuldu.'),
      S('Устная договорённость здесь не имеет силы.', 'Sözlü mutabakat burada geçerli değildir.')
    ]
  },
  {
    id: 'd60_b2_tax', unitNumber: 143.9802, levelGroup: 'B2',
    title: 'Bireysel Vergi Beyanı', description: 'Beyanname, indirim, iade',
    category: 'Günlük Hayat', color: '#047857', icon: '🧮',
    grammarExplain: `📌 VERGİ DİLİ:
1. Beyan: подать декларацию до тридцатого апреля.
2. İndirim hakkı: иметь право на налоговый вычет.
3. Kişisiz kurallar: Декларация подаётся в электронном виде.`,
    words: [
      W('d60b2tx_1', 'Декларация', 'Diklarátsiya', 'Beyanname', 'B2', '3-НДФЛ en yaygın formdur.'),
      W('d60b2tx_2', 'Налоговый вычет', 'Nalógavıy víçit', 'Vergi indirimi', 'B2', 'Eğitim, sağlık ve konutta uygulanır.'),
      W('d60b2tx_3', 'Ставка', 'Stáfka', 'Oran', 'B2', 'Ставка НДФЛ — тринадцать процентов.'),
      W('d60b2tx_4', 'Резидент', 'Rizidyént', 'Vergi mukimi', 'B2', 'Yılda 183 günle belirlenir.'),
      W('d60b2tx_5', 'Возврат налога', 'Vazvrát nalóga', 'Vergi iadesi', 'B2', 'İndirim sonucunda alınır.'),
      W('d60b2tx_6', 'Личный кабинет', 'Líçnıy kabinyét', 'Online hesap', 'B2', 'nalog.ru üzerindeki portal.')
    ],
    sentences: [
      S('Декларацию нужно подать до тридцатого апреля.', 'Beyanname 30 Nisan\'a kadar verilmelidir.'),
      S('Вы имеете право на налоговый вычет за обучение.', 'Eğitim için vergi indirimi hakkınız var.'),
      S('Возврат налога занимает до четырёх месяцев.', 'Vergi iadesi dört aya kadar sürer.')
    ]
  },
  {
    id: 'd60_b2_hospital', unitNumber: 143.9803, levelGroup: 'B2',
    title: 'Hastane Süreci', description: 'Yatış, ameliyat, taburcu',
    category: 'Günlük Hayat', color: '#0ea5e9', icon: '🩺',
    grammarExplain: `📌 TIBBİ SÜREÇ DİLİ:
1. Edilgen ve kişisiz yapı hâkimdir: Пациент был госпитализирован. Операция назначена на вторник.
2. Rıza: подписать информированное согласие.
3. Sonuç: Выписка планируется через три дня.`,
    words: [
      W('d60b2ho_1', 'Госпитализация', 'Gaspitalizátsiya', 'Hastaneye yatış', 'B2', 'Плановая / экстренная olarak ikiye ayrılır.'),
      W('d60b2ho_2', 'Операция', 'Aperátsiya', 'Ameliyat', 'B2', 'Назначить операцию.'),
      W('d60b2ho_3', 'Наркоз', 'Narkós', 'Anestezi', 'B2', 'Общий наркоз = genel anestezi.'),
      W('d60b2ho_4', 'Согласие', 'Saglásiye', 'Onam / Rıza', 'B2', 'İmzalanan zorunlu belge.'),
      W('d60b2ho_5', 'Выписка', 'Vípiska', 'Taburcu / Epikriz', 'B2', 'Hem çıkış hem çıkış raporu.'),
      W('d60b2ho_6', 'Палата', 'Paláta', 'Hasta odası', 'B2', 'Двухместная палата = iki kişilik oda.')
    ],
    sentences: [
      S('Операция назначена на вторник.', 'Ameliyat salı gününe planlandı.'),
      S('Перед наркозом нужно подписать согласие.', 'Anesteziden önce onam formu imzalanmalı.'),
      S('Выписка планируется через три дня.', 'Taburculuk üç gün sonraya planlanıyor.')
    ]
  },
  {
    id: 'd60_b2_pension', unitNumber: 143.9804, levelGroup: 'B2',
    title: 'Emeklilik ve Sosyal Haklar', description: 'Prim, hizmet yılı, yardımlar',
    category: 'Günlük Hayat', color: '#a16207', icon: '👵',
    grammarExplain: `📌 HAK VE ŞART DİLİ:
1. Şart: при наличии страхового стажа не менее пятнадцати лет.
2. Hak doğurma: право на пенсию возникает в шестьдесят пять лет.
3. Başvuru: обратиться за назначением пенсии.`,
    words: [
      W('d60b2pe_1', 'Пенсия', 'Pyénsiya', 'Emekli aylığı', 'B2', 'Выйти на пенсию = emekli olmak.'),
      W('d60b2pe_2', 'Стаж', 'Staj', 'Hizmet süresi', 'B2', 'Страховой стаж = primli hizmet.'),
      W('d60b2pe_3', 'Пособие', 'Pasóbiye', 'Sosyal yardım', 'B2', 'Пособие по безработице = işsizlik ödeneği.'),
      W('d60b2pe_4', 'Взносы', 'Vznósı', 'Primler', 'B2', 'İşveren tarafından yatırılır.'),
      W('d60b2pe_5', 'Льгота', 'Lgóta', 'Ayrıcalık / Muafiyet', 'B2', 'Ulaşım ve ilaçta uygulanır.'),
      W('d60b2pe_6', 'Индексация', 'İndiksátsiya', 'Enflasyon artışı', 'B2', 'Aylıkların güncellenmesi.')
    ],
    sentences: [
      S('Право на пенсию возникает при стаже не менее пятнадцати лет.', 'Emeklilik hakkı en az on beş yıllık hizmetle doğar.'),
      S('Он обратился за назначением пенсии.', 'Emekli aylığı bağlanması için başvurdu.'),
      S('Пенсионерам предоставляются льготы на транспорт.', 'Emeklilere ulaşımda muafiyet sağlanır.')
    ]
  },
  {
    id: 'd60_b2_registration', unitNumber: 143.9805, levelGroup: 'B2',
    title: 'İkamet ve Kayıt İşlemleri', description: 'Propiska, göçmen kaydı, vize uzatma',
    category: 'Günlük Hayat', color: '#475569', icon: '🪪',
    grammarExplain: `📌 GÖÇMENLİK DİLİ:
1. Zorunluluk: Иностранный гражданин обязан встать на миграционный учёт в течение семи рабочих дней.
2. Süre: в течение + tamlayan hâl.
3. Yaptırım: За нарушение предусмотрен штраф или выдворение.`,
    words: [
      W('d60b2rg_1', 'Регистрация', 'Rigistrátsiya', 'İkamet kaydı', 'B2', 'Halk dilinde прописка denir.'),
      W('d60b2rg_2', 'Миграционный учёт', 'Migratsiónnıy uçót', 'Göçmen kaydı', 'B2', 'Yabancılar için zorunludur.'),
      W('d60b2rg_3', 'Вид на жительство', 'Vit na jítilstva', 'Oturma izni', 'B2', 'Kısaltması ВНЖ.'),
      W('d60b2rg_4', 'Продлить визу', 'Pradlít vízu', 'Vize uzatmak', 'B2', 'Süre bitmeden yapılmalıdır.'),
      W('d60b2rg_5', 'Уведомление', 'Uvidamlyéniye', 'Bildirim', 'B2', 'Yıllık olarak verilir.'),
      W('d60b2rg_6', 'Выдворение', 'Vıdvaryéniye', 'Sınır dışı etme', 'B2', 'Ağır ihlallerin yaptırımı.')
    ],
    sentences: [
      S('Иностранный гражданин обязан встать на миграционный учёт.', 'Yabancı uyruklu kişi göçmen kaydı yaptırmakla yükümlüdür.'),
      S('Визу нужно продлить до окончания срока.', 'Vize, süresi bitmeden uzatılmalıdır.'),
      S('За нарушение предусмотрен штраф.', 'İhlal hâlinde para cezası öngörülmüştür.')
    ]
  }
];
