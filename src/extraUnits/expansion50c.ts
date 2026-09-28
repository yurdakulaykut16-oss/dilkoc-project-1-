// ==========================================================
// GENİŞLEME PAKETİ 50 — BÖLÜM 3: C1 (10 ünite)
// Kesirli unitNumber'lar (180.x) C1 bölgesine sıralanır.
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const EXPANSION_C1: UnitModule[] = [
  {
    id: 'exp_c1_diplomacy', unitNumber: 180.1, levelGroup: 'C1/C2',
    title: 'Diplomasi Dili', description: 'Müzakere, anlaşma, resmî görüşme retoriği',
    category: 'İleri Düzey', color: '#1e40af', icon: '🕊️',
    grammarExplain: `📌 DİPLOMATİK RETORİK:
1. Yumuşatılmış dil: "Мы выражаем обеспокоенность..." (Endişemizi ifade ediyoruz...) — asla doğrudan suçlama yok.
2. "достичь соглашения" = anlaşmaya varmak; "вести переговоры" = müzakere yürütmek.
3. Resmî söylemde isim yığınları: "укрепление двустороннего сотрудничества" (ikili iş birliğinin güçlendirilmesi).`,
    words: [
      W('exp_c1d_1', 'Переговоры', 'Pirigavórı', 'Müzakereler', 'C1/C2', 'Hep çoğul; вести переговоры kalıbıyla.'),
      W('exp_c1d_2', 'Соглашение', 'Saglaşéniye', 'Anlaşma / Mutabakat', 'C1/C2', 'согласие (rıza) kökünden.'),
      W('exp_c1d_3', 'Посол', 'Pasól', 'Büyükelçi', 'C1/C2', 'посольство = büyükelçilik.'),
      W('exp_c1d_4', 'Сотрудничество', 'Satrúdniçistva', 'İş birliği', 'C1/C2', 'труд (emek) kökünden: birlikte emek.'),
      W('exp_c1d_5', 'Уступка', 'Ustúpka', 'Taviz / Ödün', 'C1/C2', 'пойти на уступки = taviz vermek.'),
      W('exp_c1d_6', 'Заявление', 'Zayavlyéniye', 'Bildiri / Açıklama', 'C1/C2', 'официальное заявление = resmî açıklama.')
    ],
    sentences: [
      S('Стороны ведут переговоры о сотрудничестве.', 'Taraflar iş birliği müzakereleri yürütüyor.'),
      S('Посол сделал официальное заявление.', 'Büyükelçi resmî bir açıklama yaptı.')
    ]
  },
  {
    id: 'exp_c1_stocks', unitNumber: 180.2, levelGroup: 'C1/C2',
    title: 'Borsa ve Finans', description: 'Hisse, döviz, portföy — finans haberlerini çözme',
    category: 'İleri Düzey', color: '#047857', icon: '📈',
    grammarExplain: `📌 FİNANS DİLİ:
1. "акции выросли/упали на X процентов" = hisseler %X yükseldi/düştü.
2. "вкладывать деньги в + belirtme" = ...'e para yatırmak.
3. Finans metinlerinde sayı + tamlayan hâli hâkimdir: рост на пять процентов.`,
    words: [
      W('exp_c1f_1', 'Акция', 'Áktsiya', 'Hisse senedi', 'C1/C2', 'Dikkat: mağazada "kampanya" da demektir!'),
      W('exp_c1f_2', 'Биржа', 'Bírja', 'Borsa', 'C1/C2', 'фондовая биржа = menkul kıymetler borsası.'),
      W('exp_c1f_3', 'Валюта', 'Valyúta', 'Döviz / Para birimi', 'C1/C2', 'курс валют = döviz kuru.'),
      W('exp_c1f_4', 'Вложение', 'Vlajéniye', 'Yatırım', 'C1/C2', 'вложить (içine koymak) kökünden; инвестиция eş anlamlı.'),
      W('exp_c1f_5', 'Доходность', 'Dahódnast', 'Getiri', 'C1/C2', 'доход (gelir) + -ность (soyutluk eki).'),
      W('exp_c1f_6', 'Риск', 'Risk', 'Risk', 'C1/C2', 'диверсифицировать риски = riskleri dağıtmak.')
    ],
    sentences: [
      S('Акции компании выросли на десять процентов.', 'Şirketin hisseleri yüzde on yükseldi.'),
      S('Он вкладывает деньги в валюту.', 'O, parasını dövize yatırıyor.')
    ]
  },
  {
    id: 'exp_c1_science', unitNumber: 180.3, levelGroup: 'C1/C2',
    title: 'Bilim ve Araştırma', description: 'Hipotez, deney, makale — akademik Rusça',
    category: 'İleri Düzey', color: '#0369a1', icon: '🔬',
    grammarExplain: `📌 AKADEMİK ÜSLUP:
1. Edilgen yapılar: "Было проведено исследование..." (Bir araştırma yürütüldü...)
2. "выдвинуть гипотезу" = hipotez öne sürmek; "подтвердить" = doğrulamak; "опровергнуть" = çürütmek.
3. Akademik bağlaçlar: следовательно (dolayısıyla), таким образом (böylece).`,
    words: [
      W('exp_c1s_1', 'Исследование', 'İsslyédavaniye', 'Araştırma', 'C1/C2', 'след (iz) kökünden: izini sürmek.'),
      W('exp_c1s_2', 'Гипотеза', 'Gipótiza', 'Hipotez', 'C1/C2', 'выдвинуть гипотезу = hipotez öne sürmek.'),
      W('exp_c1s_3', 'Эксперимент', 'Ekspirimyént', 'Deney', 'C1/C2', 'провести эксперимент = deney yapmak.'),
      W('exp_c1s_4', 'Данные', 'Dánnıye', 'Veriler', 'C1/C2', 'Hep çoğul; по данным = verilere göre.'),
      W('exp_c1s_5', 'Доказательство', 'Dakazátilstva', 'Kanıt', 'C1/C2', 'доказать (kanıtlamak) kökünden.'),
      W('exp_c1s_6', 'Учёный', 'Uçónıy', 'Bilim insanı', 'C1/C2', 'Sıfat kökenli isim; учить (öğretmek) ailesinden.')
    ],
    sentences: [
      S('Учёные провели важный эксперимент.', 'Bilim insanları önemli bir deney yaptı.'),
      S('Данные подтверждают нашу гипотезу.', 'Veriler hipotezimizi doğruluyor.')
    ]
  },
  {
    id: 'exp_c1_literature', unitNumber: 180.4, levelGroup: 'C1/C2',
    title: 'Edebiyat Sohbeti', description: 'Üslup, kahraman, metafor — klasikleri tartışma',
    category: 'İleri Düzey', color: '#92400e', icon: '📖',
    grammarExplain: `📌 EDEBİYAT ELEŞTİRİSİ DİLİ:
1. "В произведении автор раскрывает тему..." (Eserde yazar ... temasını işliyor.)
2. образ (imge/karakter portresi) Rus edebiyat eleştirisinin anahtar terimidir.
3. Karşılaştırma: "в отличие от Толстого..." (Tolstoy'dan farklı olarak...).`,
    words: [
      W('exp_c1l_1', 'Произведение', 'Praizvidyéniye', 'Eser', 'C1/C2', 'Edebî/sanatsal eser; произвести (üretmek) kökünden.'),
      W('exp_c1l_2', 'Сюжет', 'Syujét', 'Olay örgüsü', 'C1/C2', 'Fransızca sujet\'den; kurgu akışı demektir.'),
      W('exp_c1l_3', 'Образ', 'Óbras', 'İmge / Karakter portresi', 'C1/C2', 'образ Онегина = Onegin\'in imgesi/portresi.'),
      W('exp_c1l_4', 'Метафора', 'Mitáfara', 'Metafor / Eğretileme', 'C1/C2', 'Yunanca "taşıma" demektir.'),
      W('exp_c1l_5', 'Смысл', 'Smısl', 'Anlam', 'C1/C2', 'скрытый смысл = gizli anlam.'),
      W('exp_c1l_6', 'Стиль', 'Stil', 'Üslup / Stil', 'C1/C2', 'авторский стиль = yazarın üslubu.')
    ],
    sentences: [
      S('Автор раскрывает смысл через метафоры.', 'Yazar anlamı metaforlarla açıyor.'),
      S('Сюжет этого романа очень сложный.', 'Bu romanın olay örgüsü çok karmaşık.')
    ]
  },
  {
    id: 'exp_c1_philosophy', unitNumber: 180.5, levelGroup: 'C1/C2',
    title: 'Felsefe Tartışması', description: 'Varlık, bilinç, özgürlük — soyut düşünce dili',
    category: 'İleri Düzey', color: '#4c1d95', icon: '🤔',
    grammarExplain: `📌 SOYUT DÜŞÜNCE DİLİ:
1. Soyut isimler -ие/-ость ekleriyle üretilir: сознание (bilinç), свобода → свободность değil своболность yok — свобода zaten soyuttur.
2. "С одной стороны... с другой стороны..." (Bir yandan... öte yandan...) — tartışma iskeleti.
3. "Что есть истина?" gibi sorularda есть (olmak) felsefi vurguyla açık yazılır.`,
    words: [
      W('exp_c1p_1', 'Сознание', 'Saznániye', 'Bilinç', 'C1/C2', 'знать (bilmek) kökünden: birlikte-bilme.'),
      W('exp_c1p_2', 'Бытие', 'Bıtiyé', 'Varlık / Varoluş', 'C1/C2', 'быть (olmak) fiilinin isim hâli; felsefenin ana terimi.'),
      W('exp_c1p_3', 'Истина', 'Ístina', 'Hakikat', 'C1/C2', 'правда günlük doğru, истина felsefi hakikattir.'),
      W('exp_c1p_4', 'Свобода', 'Svabóda', 'Özgürlük', 'C1/C2', 'свобода воли = irade özgürlüğü.'),
      W('exp_c1p_5', 'Разум', 'Rázum', 'Akıl', 'C1/C2', 'ум günlük zekâ, разум felsefi akıldır.'),
      W('exp_c1p_6', 'Сомнение', 'Samnyéniye', 'Şüphe', 'C1/C2', 'без сомнения = şüphesiz.')
    ],
    sentences: [
      S('Что такое истина и свобода?', 'Hakikat ve özgürlük nedir?'),
      S('Разум ставит вопросы о бытии.', 'Akıl, varlık hakkında sorular soruyor.')
    ]
  },
  {
    id: 'exp_c1_medicine', unitNumber: 180.6, levelGroup: 'C1/C2',
    title: 'İleri Tıp Dili', description: 'Ameliyat, bağışıklık, klinik araştırma terimleri',
    category: 'İleri Düzey', color: '#be123c', icon: '🩺',
    grammarExplain: `📌 KLİNİK DİL:
1. "перенести операцию" = ameliyat geçirmek; "провести операцию" = ameliyat yapmak.
2. Tıp metinlerinde tamlayan zincirleri: "лечение заболеваний сердца" (kalp hastalıklarının tedavisi).
3. Latince kökler Rusçada da yaşar: иммунитет, терапия, диагностика.`,
    words: [
      W('exp_c1m_1', 'Операция', 'Apirátsiya', 'Ameliyat', 'C1/C2', 'Hem tıbbi hem askeri hem bankacılık terimi.'),
      W('exp_c1m_2', 'Иммунитет', 'İmmunityét', 'Bağışıklık', 'C1/C2', 'укрепить иммунитет = bağışıklığı güçlendirmek.'),
      W('exp_c1m_3', 'Заболевание', 'Zabalivániye', 'Hastalık (tıbbi)', 'C1/C2', 'болезнь günlük, заболевание klinik terimdir.'),
      W('exp_c1m_4', 'Хирург', 'Hirúrk', 'Cerrah', 'C1/C2', 'Sondaki Г sedasızlaşıp K okunur.'),
      W('exp_c1m_5', 'Восстановление', 'Vasstanavlyéniye', 'İyileşme / Rehabilitasyon', 'C1/C2', 'снова (yeniden) + становить: yeniden ayağa kalkma.'),
      W('exp_c1m_6', 'Побочный эффект', 'Pabóçnıy effyékt', 'Yan etki', 'C1/C2', 'бок (yan) kökünden побочный.')
    ],
    sentences: [
      S('Пациент хорошо перенёс операцию.', 'Hasta ameliyatı iyi atlattı.'),
      S('У лекарства есть побочные эффекты.', 'İlacın yan etkileri var.')
    ]
  },
  {
    id: 'exp_c1_court', unitNumber: 180.7, levelGroup: 'C1/C2',
    title: 'Mahkemede', description: 'Dava, tanık, karar — yargı dili',
    category: 'İleri Düzey', color: '#334155', icon: '🏛️',
    grammarExplain: `📌 YARGI DİLİ:
1. "подать в суд на + belirtme" = ...'e dava açmak.
2. "признать виновным" = suçlu bulmak; "оправдать" = beraat ettirmek.
3. Mahkeme kararları edilgen ve resmîdir: "Суд постановил..." (Mahkeme hükmetti...).`,
    words: [
      W('exp_c1ct_1', 'Суд', 'Sut', 'Mahkeme', 'C1/C2', 'подать в суд = dava açmak; sondaki Д T okunur.'),
      W('exp_c1ct_2', 'Судья', 'Sudyá', 'Hâkim / Yargıç', 'C1/C2', 'Futbol hakemi de судья\'dır!'),
      W('exp_c1ct_3', 'Свидетель', 'Svidyétyel', 'Tanık', 'C1/C2', 'видеть (görmek) köküyle akraba: gören kişi.'),
      W('exp_c1ct_4', 'Приговор', 'Prigavór', 'Hüküm / Karar', 'C1/C2', 'вынести приговор = hüküm vermek.'),
      W('exp_c1ct_5', 'Иск', 'İsk', 'Dava / Talep', 'C1/C2', 'подать иск = dava dilekçesi vermek.'),
      W('exp_c1ct_6', 'Виновный', 'Vinóvnıy', 'Suçlu', 'C1/C2', 'вина (suç/kabahat) kökünden.')
    ],
    sentences: [
      S('Суд вынес справедливый приговор.', 'Mahkeme adil bir hüküm verdi.'),
      S('Свидетель рассказал всю правду.', 'Tanık bütün gerçeği anlattı.')
    ]
  },
  {
    id: 'exp_c1_artcrit', unitNumber: 180.8, levelGroup: 'C1/C2',
    title: 'Sanat Eleştirisi', description: 'Sergi, kompozisyon, akım — galeri sohbeti',
    category: 'İleri Düzey', color: '#b45309', icon: '🖼️',
    grammarExplain: `📌 SANAT DİLİ:
1. "На картине изображено..." (Tabloda ... betimlenmiş) — edilgen betimleme kalıbı.
2. Akımlar: импрессионизм, авангард, реализм — hepsi eril isimlerdir.
3. İzlenim bildirme: "Картина производит сильное впечатление." (Tablo güçlü bir izlenim bırakıyor.)`,
    words: [
      W('exp_c1a_1', 'Выставка', 'Vıstafka', 'Sergi', 'C1/C2', 'выставить (sergilemek) kökünden.'),
      W('exp_c1a_2', 'Картина', 'Kartína', 'Tablo / Resim', 'C1/C2', 'на картине = tabloda.'),
      W('exp_c1a_3', 'Художник', 'Hudójnik', 'Ressam / Sanatçı', 'C1/C2', 'художество (sanat, eski) kökünden.'),
      W('exp_c1a_4', 'Впечатление', 'Fpiçitlyéniye', 'İzlenim', 'C1/C2', 'печать (mühür) kökünden: içe basılan iz.'),
      W('exp_c1a_5', 'Шедевр', 'Şıdévr', 'Şaheser / Başyapıt', 'C1/C2', 'Fransızca chef-d\'oeuvre\'den.'),
      W('exp_c1a_6', 'Течение', 'Tiçéniye', 'Akım', 'C1/C2', 'течь (akmak) kökünden; sanat/düşünce akımı.')
    ],
    sentences: [
      S('Эта картина — настоящий шедевр.', 'Bu tablo gerçek bir şaheser.'),
      S('Выставка произвела сильное впечатление.', 'Sergi güçlü bir izlenim bıraktı.')
    ]
  },
  {
    id: 'exp_c1_ai', unitNumber: 180.9, levelGroup: 'C1/C2',
    title: 'Yapay Zekâ ve Gelecek', description: 'Algoritma, veri, etik — teknoloji tartışması',
    category: 'İleri Düzey', color: '#6d28d9', icon: '🤖',
    grammarExplain: `📌 TEKNOLOJİ TARTIŞMASI:
1. искусственный интеллект (yapay zekâ) kısaca ИИ yazılır.
2. "обучать модель" = model eğitmek; "обрабатывать данные" = veri işlemek.
3. Gelecek tartışmalarında koşul kipi: "Если ИИ заменит людей, то..." (YZ insanların yerini alırsa...).`,
    words: [
      W('exp_c1ai_1', 'Искусственный интеллект', 'İskústvinnıy intilyékt', 'Yapay zekâ', 'C1/C2', 'Kısaltması ИИ; искусство (sanat) köküyle akraba.'),
      W('exp_c1ai_2', 'Алгоритм', 'Algarítm', 'Algoritma', 'C1/C2', 'Harezmî\'nin adından gelir — Türkçeyle ortak kök!'),
      W('exp_c1ai_3', 'Нейросеть', 'Niyrasyét', 'Yapay sinir ağı', 'C1/C2', 'нейронная сеть kısaltması; günlük dile girdi.'),
      W('exp_c1ai_4', 'Обучение', 'Abuçéniye', 'Eğitim / Öğrenme', 'C1/C2', 'машинное обучение = makine öğrenmesi.'),
      W('exp_c1ai_5', 'Развитие', 'Razvítiye', 'Gelişme / Gelişim', 'C1/C2', 'развитие технологий = teknolojilerin gelişimi.'),
      W('exp_c1ai_6', 'Этика', 'Étika', 'Etik', 'C1/C2', 'этика ИИ = yapay zekâ etiği.')
    ],
    sentences: [
      S('Нейросети меняют нашу жизнь.', 'Yapay sinir ağları hayatımızı değiştiriyor.'),
      S('Развитие ИИ ставит этические вопросы.', 'YZ\'nin gelişimi etik sorular doğuruyor.')
    ]
  },
  {
    id: 'exp_c1_crisis', unitNumber: 180.95, levelGroup: 'C1/C2',
    title: 'Kriz Yönetimi', description: 'Zor durumlarda liderlik ve karar dili',
    category: 'İleri Düzey', color: '#7f1d1d', icon: '🧯',
    grammarExplain: `📌 KRİZ DİLİ:
1. "принять меры" = önlem almak — kriz yönetiminin bir numaralı kalıbı.
2. "нести ответственность за + belirtme" = ...'in sorumluluğunu taşımak.
3. Aciliyet zarfları: немедленно (derhal), срочно (acilen), незамедлительно (gecikmeksizin).`,
    words: [
      W('exp_c1cr_1', 'Кризис', 'Krízis', 'Kriz', 'C1/C2', 'выйти из кризиса = krizden çıkmak.'),
      W('exp_c1cr_2', 'Меры', 'Myérı', 'Önlemler', 'C1/C2', 'принять меры = önlem almak; genelde çoğul.'),
      W('exp_c1cr_3', 'Ответственность', 'Atvyétstvinnast', 'Sorumluluk', 'C1/C2', 'ответ (cevap) kökünden: cevap verebilirlik.'),
      W('exp_c1cr_4', 'Решение', 'Rişéniye', 'Karar / Çözüm', 'C1/C2', 'принять решение = karar almak.'),
      W('exp_c1cr_5', 'Угроза', 'Ugróza', 'Tehdit', 'C1/C2', 'под угрозой = tehdit altında.'),
      W('exp_c1cr_6', 'Срочно', 'Sróçna', 'Acilen', 'C1/C2', 'срок (süre) kökünden: süresi dar.'),
    ],
    sentences: [
      S('Руководство приняло срочные меры.', 'Yönetim acil önlemler aldı.'),
      S('Лидер несёт ответственность за решения.', 'Lider, kararların sorumluluğunu taşır.')
    ]
  }
];
