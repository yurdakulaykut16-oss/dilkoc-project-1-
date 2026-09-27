// ==========================================================
// EK MÜFREDAT — C1/C2 GENİŞLEME PAKETİ (Ünite 121-132)
// Üst düzey iş, ticaret, finans ve derin ilişki dili.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_C1: UnitModule[] = [
  {
    id: 'mod_c1_x1',
    unitNumber: 173,
    levelGroup: 'C1/C2',
    title: 'Yönetici Olmak & Ekip Yönetimi',
    description: 'Delege etme, geri bildirim verme, işe alma ve zam kararları',
    category: 'İş Hayatı',
    color: '#6366f1',
    icon: '👔',
    grammarExplain: `📌 YÖNETİCİ DİLİ:
1. "Делегировать полномочия" (yetki devretmek) — mikro yönetimin ilacı; "Учитесь делегировать!" (Delege etmeyi öğrenin!).
2. "Обратная связь" (geri bildirim) verme kalıbı: "Хочу дать вам обратную связь" — eleştiriyi kurumsallaştırır.
3. "Нанимать / увольнять" (işe almak / işten çıkarmak) — yöneticiliğin iki zıt kutup fiili; ikisi de -ать tipi çekimdedir.`,
    words: [
      { id: 'wx121_1', ru: 'Руководитель', reading: "Rukavadítil'", tr: 'Yönetici', level: 'C1/C2', usageNote: '"Руководить" (yönetmek) fiilinden gelir; araç hâli ister.' },
      { id: 'wx121_2', ru: 'Подчинённый', reading: 'Padçinyónnıy', tr: 'Ast / Bağlı çalışan', level: 'C1/C2', usageNote: 'Hiyerarşi dilinin temel kelimesidir.' },
      { id: 'wx121_3', ru: 'Делегировать', reading: "Diligíravat'", tr: 'Delege etmek', level: 'C1/C2', usageNote: 'Modern yönetim dilinin gözde fiilidir.' },
      { id: 'wx121_4', ru: 'Мотивация', reading: 'Mativátsiya', tr: 'Motivasyon', level: 'C1/C2', usageNote: '"Нематериальная мотивация" (maddi olmayan motivasyon) da konuşulur.' },
      { id: 'wx121_5', ru: 'Увольнение', reading: "Uval'nyéniye", tr: 'İşten çıkarma', level: 'C1/C2', usageNote: '"Уволить по собственному желанию" (kendi isteğiyle ayrılma) kalıbı önemlidir.' },
      { id: 'wx121_6', ru: 'Повышение', reading: 'Pavışéniye', tr: 'Terfi / Zam', level: 'C1/C2', usageNote: 'Hem terfi hem artış anlamı taşır.' },
      { id: 'wx121_7', ru: 'Обратная связь', reading: "Abrátnaya svyaz'", tr: 'Geri bildirim', level: 'C1/C2', usageNote: 'Kurumsal dilin vazgeçilmezidir.' },
      { id: 'wx121_8', ru: 'Эффективность', reading: "Effiktívnast'", tr: 'Verimlilik', level: 'C1/C2', usageNote: '"Повысить эффективность" (verimliliği artırmak).' },
      { id: 'wx121_9', ru: 'Нанимать', reading: "Nanimát'", tr: 'İşe almak', level: 'C1/C2', usageNote: '"Нанять лучших" (en iyileri işe almak) hedeftir.' },
      { id: 'wx121_10', ru: 'Коллектив', reading: 'Kalliktíf', tr: 'Ekip / Çalışan topluluğu', level: 'C1/C2', usageNote: '"Влиться в коллектив" (ekibe karışmak) deyimi vardır.' },
      { id: 'wx121_11', ru: 'Ставить цели', reading: "Stávit' tséli", tr: 'Hedef koymak', level: 'C1/C2', usageNote: 'Yıllık değerlendirme dilidir.' },
      { id: 'wx121_12', ru: 'Выгорание', reading: 'Vıgarániye', tr: 'Tükenmişlik', level: 'C1/C2', usageNote: '"Профессиональное выгорание" modern ofis konusudur.' }
    ],
    sentences: [
      { ru: 'Учитесь делегировать задачи команде.', tr: 'Görevleri ekibe delege etmeyi öğrenin.', scrambled: ['задачи', 'Учитесь', 'команде.', 'делегировать'], correct: ['Учитесь', 'делегировать', 'задачи', 'команде.'] },
      { ru: 'Коллективу нужна сильная мотивация.', tr: 'Ekibin güçlü motivasyona ihtiyacı var.', scrambled: ['сильная', 'Коллективу', 'мотивация.', 'нужна'], correct: ['Коллективу', 'нужна', 'сильная', 'мотивация.'] }
    ],
    sceneTitle: 'Yeni Müdürün İlk Haftası',
    sceneContext: 'Timur terfi almıştır; eski masasında hâlâ kendi işini yapmaya çalışırken mentoru delege etme dersi verir.',
    dialogue: [
      { speaker: 'Mentor', ru: 'Тимур, ты руководитель, а до сих пор сам пишешь отчёты!', reading: 'Timúr, ty rukavadítil\', a da sih por sam píşeş\' atçyóty!', tr: 'Timur, yöneticisin ama hâlâ raporları kendin yazıyorsun!' },
      { speaker: 'Timur', ru: 'Мне проще сделать самому, чем объяснять...', reading: 'Mne próşşe sdyélat\' samamú, çem ab\'yisnyát\'...', tr: 'Anlatmaktansa kendim yapmak daha kolay geliyor...' },
      { speaker: 'Mentor', ru: 'Это путь к выгоранию. Учись делегировать!', reading: 'Éta put\' k vıgarániyu. Uçís\' diligíravat\'!', tr: 'Bu, tükenmişliğe giden yol. Delege etmeyi öğren!' },
      { speaker: 'Timur', ru: 'Хорошо. Завтра раздам задачи и дам обратную связь.', reading: 'Haraşó. Záftra razdám zadáçi i dam abrátnuyu svyaz\'.', tr: 'Tamam. Yarın görevleri dağıtıp geri bildirim vereceğim.' }
    ]
  },
  {
    id: 'mod_c1_x2',
    unitNumber: 174,
    levelGroup: 'C1/C2',
    title: 'İş Ortaklığı & Hisse Pazarlığı',
    description: 'Ortaklık sözleşmesi, hisse dağılımı ve ayrılık maddeleri',
    category: 'Ticaret & Girişim',
    color: '#0ea5e9',
    icon: '📜',
    grammarExplain: `📌 ORTAKLIK DİLİ:
1. "Доля в бизнесе" (işletmede hisse/pay): "Моя доля — сорок процентов" (Payım yüzde kırk).
2. "Распределение прибыли" (kâr dağılımı) — sözleşmenin en dikkatli okunan maddesidir.
3. "Выйти из бизнеса" (işten/ortaklıktan çıkmak) — çıkış şartları baştan yazılmalıdır: "условия выхода".`,
    words: [
      { id: 'wx122_1', ru: 'Партнёрство', reading: 'Partnyórstva', tr: 'Ortaklık', level: 'C1/C2', usageNote: '"Деловое партнёрство" (iş ortaklığı) denir.' },
      { id: 'wx122_2', ru: 'Доля', reading: 'Dólya', tr: 'Hisse / Pay', level: 'C1/C2', usageNote: '"Доля в компании" (şirkette pay).' },
      { id: 'wx122_3', ru: 'Учредитель', reading: "Uçridítil'", tr: 'Kurucu (ortak)', level: 'C1/C2', usageNote: 'Şirket kuruluş belgesinde adı geçen kişidir.' },
      { id: 'wx122_4', ru: 'Устав', reading: 'Ustáf', tr: 'Ana sözleşme / Tüzük', level: 'C1/C2', usageNote: 'Şirketin anayasasıdır.' },
      { id: 'wx122_5', ru: 'Вклад', reading: 'Fklat', tr: 'Katkı / Sermaye payı', level: 'C1/C2', usageNote: 'Para, emek veya bağlantı olarak konabilir.' },
      { id: 'wx122_6', ru: 'Распределение прибыли', reading: 'Raspridilyéniye príbıli', tr: 'Kâr dağılımı', level: 'C1/C2', usageNote: 'Ortaklığın en hassas konusudur.' },
      { id: 'wx122_7', ru: 'Выйти из бизнеса', reading: 'Výyti iz bíznisa', tr: 'Ortaklıktan çıkmak', level: 'C1/C2', usageNote: 'Çıkış şartları "условия выхода"dır.' },
      { id: 'wx122_8', ru: 'Юрист', reading: 'Yuríst', tr: 'Avukat / Hukukçu', level: 'C1/C2', usageNote: '"Проконсультироваться с юристом" şarttır.' },
      { id: 'wx122_9', ru: 'Соглашение', reading: 'Saglaşéniye', tr: 'Anlaşma / Mutabakat', level: 'C1/C2', usageNote: '"Партнёрское соглашение" (ortaklık anlaşması).' },
      { id: 'wx122_10', ru: 'Споры', reading: 'Spóry', tr: 'Anlaşmazlıklar', level: 'C1/C2', usageNote: '"Разрешение споров" (uyuşmazlık çözümü) maddesi.' },
      { id: 'wx122_11', ru: 'Ответственность сторон', reading: "Atvyétstvinnast' starón", tr: 'Tarafların sorumluluğu', level: 'C1/C2', usageNote: 'Sözleşmenin klasik başlığıdır.' },
      { id: 'wx122_12', ru: 'На берегу', reading: 'Na birigú', tr: 'Baştan (deyim)', level: 'C1/C2', usageNote: '"Договориться на берегу" — denize açılmadan yani baştan anlaşmak!' }
    ],
    sentences: [
      { ru: 'Моя доля — сорок процентов.', tr: 'Benim payım yüzde kırk.', scrambled: ['сорок', 'Моя доля —', 'процентов.'], correct: ['Моя доля —', 'сорок', 'процентов.'] },
      { ru: 'Юрист подготовит партнёрское соглашение.', tr: 'Avukat ortaklık anlaşmasını hazırlayacak.', scrambled: ['партнёрское', 'Юрист', 'соглашение.', 'подготовит'], correct: ['Юрист', 'подготовит', 'партнёрское', 'соглашение.'] }
    ],
    sceneTitle: '"Kıyıdayken" Anlaşma Masası',
    sceneContext: 'Lyosha ve Semyon kahve zincirine dönüşen işi büyütürken hisse ve çıkış şartlarını avukatla netleştirir.',
    dialogue: [
      { speaker: 'Semyon', ru: 'Я вкладываю деньги, ты — время. Как делим прибыль?', reading: 'Ya fkládıvayu dyén\'gi, ty — vryémya. Kak dyélim príbıl\'?', tr: 'Ben parayı, sen zamanı koyuyorsun. Kârı nasıl bölüşüyoruz?' },
      { speaker: 'Lyosha', ru: 'Шестьдесят на сорок. Моя доля больше — я работаю каждый день!', reading: 'Şız\'disyát na sórak. Mayá dólya ból\'şe — ya rabótayu kájdıy dyen\'!', tr: 'Altmışa kırk. Benim payım büyük — her gün çalışıyorum!' },
      { speaker: 'Avukat', ru: 'Главное — договориться на берегу. Пропишем всё в уставе.', reading: 'Glávnaye — dagavarítsa na birigú. Prapíşem fsyo v ustáve.', tr: 'Önemli olan baştan anlaşmak. Her şeyi ana sözleşmeye yazarız.' },
      { speaker: 'Semyon', ru: 'И условия выхода тоже. Согласен, подписываем!', reading: 'I uslóviya výhada tóje. Saglásin, padpísıvayem!', tr: 'Çıkış şartlarını da. Kabul, imzalıyoruz!' }
    ]
  },
  {
    id: 'mod_c1_x3',
    unitNumber: 175,
    levelGroup: 'C1/C2',
    title: 'İhale, Teklif & Kurumsal Satış',
    description: 'Tender başvurusu, ticari teklif ve kazanma stratejisi',
    category: 'Ticaret & Girişim',
    color: '#64748b',
    icon: '🏛️',
    grammarExplain: `📌 İHALE DİLİ:
1. "Выиграть тендер" (ihaleyi kazanmak) / "проиграть тендер" (kaybetmek) — kurumsal satışın kalp atışı.
2. "Коммерческое предложение" (ticari teklif) — kısaltması "КП" (ka-pe); "отправить КП" günlük ofis dilidir.
3. "Подать заявку до + tamlayan hâl" (şu tarihe kadar başvurmak): "до пятницы" (cumaya kadar) — son tarih kutsaldır.`,
    words: [
      { id: 'wx123_1', ru: 'Тендер', reading: 'Téndir', tr: 'İhale', level: 'C1/C2', usageNote: '"Участвовать в тендере" (ihaleye katılmak).' },
      { id: 'wx123_2', ru: 'Заявка', reading: 'Zayáfka', tr: 'Başvuru', level: 'C1/C2', usageNote: '"Подать заявку" (başvuru yapmak) kalıbıyla geçer.' },
      { id: 'wx123_3', ru: 'Коммерческое предложение', reading: 'Kammyérçiskaye pridlajéniye', tr: 'Ticari teklif', level: 'C1/C2', usageNote: 'Kısaca "КП" denir.' },
      { id: 'wx123_4', ru: 'Заказчик', reading: 'Zakázçik', tr: 'İşveren / İhale sahibi', level: 'C1/C2', usageNote: 'İhaleyi açan taraftır.' },
      { id: 'wx123_5', ru: 'Критерии', reading: 'Krityérii', tr: 'Kriterler', level: 'C1/C2', usageNote: '"Критерии отбора" (seçim kriterleri).' },
      { id: 'wx123_6', ru: 'Конкурс', reading: 'Kónkurs', tr: 'Yarışma / İhale süreci', level: 'C1/C2', usageNote: 'Kamu ihaleleri "конкурс" olarak da anılır.' },
      { id: 'wx123_7', ru: 'Выиграть тендер', reading: "Výigrat' téndir", tr: 'İhaleyi kazanmak', level: 'C1/C2', usageNote: 'Satış ekibinin bayram günüdür.' },
      { id: 'wx123_8', ru: 'Смета', reading: 'Smyéta', tr: 'Maliyet dökümü', level: 'C1/C2', usageNote: 'Teklifin rakamsal kalbidir.' },
      { id: 'wx123_9', ru: 'Гарантии', reading: 'Garántii', tr: 'Teminatlar', level: 'C1/C2', usageNote: '"Банковская гарантия" (banka teminatı) istenebilir.' },
      { id: 'wx123_10', ru: 'Подрядчик', reading: 'Padryátçik', tr: 'Yüklenici', level: 'C1/C2', usageNote: 'İşi üstlenen firmadır.' },
      { id: 'wx123_11', ru: 'Сроки выполнения', reading: 'Sróki vıpalnyéniya', tr: 'Tamamlama süresi', level: 'C1/C2', usageNote: 'Tekliflerin kıyaslandığı ana kriterdir.' },
      { id: 'wx123_12', ru: 'Конкурентоспособный', reading: 'Kankurentaspasóbnıy', tr: 'Rekabetçi', level: 'C1/C2', usageNote: 'Rusçanın en uzun günlük kelimelerinden biridir!' }
    ],
    sentences: [
      { ru: 'Мы выиграли тендер на поставку!', tr: 'Tedarik ihalesini kazandık!', scrambled: ['тендер', 'Мы выиграли', 'на поставку!'], correct: ['Мы выиграли', 'тендер', 'на поставку!'] },
      { ru: 'Подайте заявку до пятницы.', tr: 'Başvuruyu cumaya kadar yapın.', scrambled: ['до пятницы.', 'Подайте', 'заявку'], correct: ['Подайте', 'заявку', 'до пятницы.'] }
    ],
    sceneTitle: 'Son Saat: İhale Dosyası',
    sceneContext: 'Satış ekibi büyük bir kurumsal ihalenin kapanışına saatler kala teklifi ve teminat evrakını yetiştirir.',
    dialogue: [
      { speaker: 'Müdür', ru: 'Заявку нужно подать до шести вечера. Всё готово?', reading: 'Zayáfku nújna padát\' da şıstí vyéçira. Fsyo gatóva?', tr: 'Başvuru akşam altıya kadar yapılmalı. Her şey hazır mı?' },
      { speaker: 'Timur', ru: 'КП готово, смета тоже. Ждём банковскую гарантию.', reading: 'Ka-pé gatóva, smyéta tóje. Jdyom bánkafskuyu garántiyu.', tr: 'Ticari teklif hazır, maliyet dökümü de. Banka teminatını bekliyoruz.' },
      { speaker: 'Müdür', ru: 'Наша цена конкурентоспособная?', reading: 'Náşa tsiná kankurentaspasóbnaya?', tr: 'Fiyatımız rekabetçi mi?' },
      { speaker: 'Timur', ru: 'Да! И сроки выполнения короче, чем у всех. Мы выиграем!', reading: 'Da! I sróki vıpalnyéniya karóçe, çem u fsyeh. My výigrayem!', tr: 'Evet! Tamamlama süremiz de herkesten kısa. Kazanacağız!' }
    ]
  },
  {
    id: 'mod_c1_x4',
    unitNumber: 176,
    levelGroup: 'C1/C2',
    title: 'Kriz Yönetimi & Zor Müşteri',
    description: 'Şikâyet karşılama, itibar koruma ve telafi teklif etme',
    category: 'Ticaret & Girişim',
    color: '#ef4444',
    icon: '☎️',
    grammarExplain: `📌 KRİZ İLETİŞİMİ DİLİ:
1. "Приносим извинения" (Özür dileriz) — kurumsal özrün resmî hâli; kişisel özür "извините"den daha ağırdır.
2. "Уладить конфликт" (anlaşmazlığı çözmek/tatlıya bağlamak) — kriz yönetiminin hedef fiili.
3. "В качестве компенсации" (telafi olarak) — kızgın müşteriyi sadık müşteriye çeviren sihirli giriş.`,
    words: [
      { id: 'wx124_1', ru: 'Претензия', reading: 'Prityénziya', tr: 'Şikâyet (resmî)', level: 'C1/C2', usageNote: 'Yazılı resmî şikâyettir; sözlü olan "жалоба"dır.' },
      { id: 'wx124_2', ru: 'Недовольный', reading: "Nidavól'nıy", tr: 'Memnuniyetsiz', level: 'C1/C2', usageNote: '"Недовольный клиент" (memnun olmayan müşteri).' },
      { id: 'wx124_3', ru: 'Принести извинения', reading: 'Prinistí izvinyéniya', tr: 'Özür sunmak', level: 'C1/C2', usageNote: 'Kurumsal özrün resmî kalıbıdır.' },
      { id: 'wx124_4', ru: 'Решить проблему', reading: "Rişít' prablyému", tr: 'Sorunu çözmek', level: 'C1/C2', usageNote: '"Мы решим вашу проблему" güven cümlesidir.' },
      { id: 'wx124_5', ru: 'Компенсация', reading: 'Kampinsátsiya', tr: 'Telafi / Tazminat', level: 'C1/C2', usageNote: '"В качестве компенсации" (telafi olarak) diye sunulur.' },
      { id: 'wx124_6', ru: 'Репутация', reading: 'Riputátsiya', tr: 'İtibar', level: 'C1/C2', usageNote: '"Репутация дороже денег" (İtibar paradan değerlidir).' },
      { id: 'wx124_7', ru: 'Терпение', reading: 'Tirpyéniye', tr: 'Sabır', level: 'C1/C2', usageNote: '"Спасибо за терпение" (Sabrınız için teşekkürler).' },
      { id: 'wx124_8', ru: 'Конфликт', reading: 'Kanflíkt', tr: 'Anlaşmazlık / Çatışma', level: 'C1/C2', usageNote: '"Конфликтная ситуация" (kriz durumu) denir.' },
      { id: 'wx124_9', ru: 'Уладить', reading: "Uládit'", tr: 'Tatlıya bağlamak / Çözmek', level: 'C1/C2', usageNote: '"Мы всё уладим" (Her şeyi hallederiz).' },
      { id: 'wx124_10', ru: 'Лояльность', reading: "Layál'nast'", tr: 'Sadakat (müşteri)', level: 'C1/C2', usageNote: '"Программа лояльности" (sadakat programı).' },
      { id: 'wx124_11', ru: 'Отзыв', reading: 'Ótzıf', tr: 'Yorum / Değerlendirme', level: 'C1/C2', usageNote: '"Негативный отзыв" (olumsuz yorum) kriz başlatabilir.' },
      { id: 'wx124_12', ru: 'Войти в положение', reading: 'Vaytí f palajéniye', tr: 'Anlayış göstermek (deyim)', level: 'C1/C2', usageNote: 'Kelime kelime "durumuna girmek" — empati deyimidir.' }
    ],
    sentences: [
      { ru: 'Мы уладим этот конфликт сегодня.', tr: 'Bu anlaşmazlığı bugün çözeceğiz.', scrambled: ['этот конфликт', 'Мы уладим', 'сегодня.'], correct: ['Мы уладим', 'этот конфликт', 'сегодня.'] },
      { ru: 'Клиент получит компенсацию.', tr: 'Müşteri telafi alacak.', scrambled: ['получит', 'Клиент', 'компенсацию.'], correct: ['Клиент', 'получит', 'компенсацию.'] }
    ],
    sceneTitle: 'Bir Yıldızlı Yorum Alarmı',
    sceneContext: 'Restoranın en sadık müşterisi soğuk çorba yüzünden ateş püskürmektedir; müdür itibar kurtarma operasyonu başlatır.',
    dialogue: [
      { speaker: 'Müşteri', ru: 'Это возмутительно! Я жду заказ уже час!', reading: 'Éta vazmutítil\'na! Ya jdu zakás ujé ças!', tr: 'Bu kabul edilemez! Bir saattir siparişi bekliyorum!' },
      { speaker: 'Müdür', ru: 'Приносим искренние извинения. Войдите в наше положение — сегодня аврал.', reading: 'Prinósim ískrinniye izvinyéniya. Vaydíte v náşe palajéniye — sivódnya avrál.', tr: 'İçten özürlerimizi sunuyoruz. Anlayış gösterin — bugün yoğunluk had safhada.' },
      { speaker: 'Müşteri', ru: 'Меня не интересуют ваши проблемы!', reading: 'Minyá ni intirisúyut váşi prablyémy!', tr: 'Sizin sorunlarınız beni ilgilendirmiyor!' },
      { speaker: 'Müdür', ru: 'Понимаю. В качестве компенсации — ужин за наш счёт. Мы всё уладим!', reading: 'Panimáyu. F káçistve kampinsátsii — újın za naş şşyot. My fsyo uládim!', tr: 'Anlıyorum. Telafi olarak yemek bizden. Her şeyi tatlıya bağlayacağız!' }
    ]
  },
  {
    id: 'mod_c1_x5',
    unitNumber: 177,
    levelGroup: 'C1/C2',
    title: 'Gayrimenkul Yatırımı & Değerleme',
    description: 'Getiri hesabı, sıfır/ikinci el konut ve amorti süresi analizi',
    category: 'Emlak & Ev',
    color: '#10b981',
    icon: '🏙️',
    grammarExplain: `📌 EMLAK YATIRIMI DİLİ:
1. "Окупаемость" (amorti süresi): "Квартира окупится за десять лет" (Daire on yılda kendini çıkarır).
2. "Новостройка" (sıfır bina) vs "вторичное жильё" (ikinci el konut) — piyasanın iki ana segmenti.
3. "Сдавать посуточно / на длительный срок" (günlük / uzun dönem kiraya vermek) — getiri stratejisinin temel seçimi.`,
    words: [
      { id: 'wx125_1', ru: 'Доходность', reading: "Dahódnast'", tr: 'Getiri (oranı)', level: 'C1/C2', usageNote: 'Yıllık yüzdeyle konuşulur.' },
      { id: 'wx125_2', ru: 'Сдавать посуточно', reading: "Zdavát' pasútaçna", tr: 'Günlük kiraya vermek', level: 'C1/C2', usageNote: 'Airbnb tarzı kiralama modelidir.' },
      { id: 'wx125_3', ru: 'Окупаемость', reading: "Akupáyimast'", tr: 'Amorti süresi', level: 'C1/C2', usageNote: '"Срок окупаемости" tam halidir.' },
      { id: 'wx125_4', ru: 'Застройщик', reading: 'Zastróyşşik', tr: 'Müteahhit / İnşaat firması', level: 'C1/C2', usageNote: '"Надёжный застройщик" (güvenilir müteahhit) araştırılır.' },
      { id: 'wx125_5', ru: 'Новостройка', reading: 'Navastróyka', tr: 'Yeni bina / Sıfır konut', level: 'C1/C2', usageNote: 'İnşaat aşamasında daha ucuzdur.' },
      { id: 'wx125_6', ru: 'Вторичное жильё', reading: "Vtaríçnaye jıl'yó", tr: 'İkinci el konut', level: 'C1/C2', usageNote: 'Kısaca "вторичка" denir.' },
      { id: 'wx125_7', ru: 'Ликвидность', reading: "Likvídnast'", tr: 'Likidite', level: 'C1/C2', usageNote: 'Hızlı satılabilirlik anlamındadır.' },
      { id: 'wx125_8', ru: 'Вложение', reading: 'Vlajéniye', tr: 'Yatırım (tekil)', level: 'C1/C2', usageNote: '"Выгодное вложение" (kârlı yatırım).' },
      { id: 'wx125_9', ru: 'Рынок недвижимости', reading: 'Rýnak nidvíjımasti', tr: 'Emlak piyasası', level: 'C1/C2', usageNote: '"Рынок растёт/падает" diye takip edilir.' },
      { id: 'wx125_10', ru: 'Этап строительства', reading: 'Etáp straítil\'stva', tr: 'İnşaat aşaması', level: 'C1/C2', usageNote: 'Temel aşamasında almak en ucuzudur.' },
      { id: 'wx125_11', ru: 'Арендатор', reading: 'Arindátar', tr: 'Kiracı', level: 'C1/C2', usageNote: 'Kiraya veren "арендодатель"dir.' },
      { id: 'wx125_12', ru: 'Инфраструктура района', reading: 'Infrastruktúra rayóna', tr: 'Semt altyapısı', level: 'C1/C2', usageNote: 'Okul, metro, market — değeri belirler.' }
    ],
    sentences: [
      { ru: 'Квартира окупится за десять лет.', tr: 'Daire on yılda kendini amorti eder.', scrambled: ['за десять', 'Квартира', 'лет.', 'окупится'], correct: ['Квартира', 'окупится', 'за десять', 'лет.'] },
      { ru: 'Новостройка дешевле на этапе строительства.', tr: 'Sıfır konut inşaat aşamasında daha ucuz.', scrambled: ['дешевле', 'Новостройка', 'строительства.', 'на этапе'], correct: ['Новостройка', 'дешевле', 'на этапе', 'строительства.'] }
    ],
    sceneTitle: 'İki Daire, Bir Karar',
    sceneContext: 'Yatırımcı çift, merkezdeki eski daire ile şehir dışındaki sıfır proje arasında getiri hesabı yapar.',
    dialogue: [
      { speaker: 'Danışman', ru: 'Вторичка в центре даёт доходность семь процентов.', reading: 'Vtaríçka f tséntre dayót dahódnast\' syem\' pratséntaf.', tr: 'Merkezdeki ikinci el konut yüzde yedi getiri sağlıyor.' },
      { speaker: 'Dima', ru: 'А новостройка у метро? Какая окупаемость?', reading: 'A navastróyka u mitró? Kakáya akupáyimast\'?', tr: 'Peki metro yanındaki sıfır proje? Amorti süresi ne?' },
      { speaker: 'Danışman', ru: 'Девять лет, если сдавать посуточно — быстрее.', reading: 'Dyévit\' lyet, yésli zdavát\' pasútaçna — bıstryéye.', tr: 'Dokuz yıl; günlük kiraya verirseniz daha hızlı.' },
      { speaker: 'Nastya', ru: 'Берём у метро. Инфраструктура района отличная!', reading: 'Biryóm u mitró. Infrastruktúra rayóna atlíçnaya!', tr: 'Metro yanındakini alıyoruz. Semtin altyapısı harika!' }
    ]
  },
  {
    id: 'mod_c1_x6',
    unitNumber: 178,
    levelGroup: 'C1/C2',
    title: 'Kredi Reddi & Bankayla Müzakere',
    description: 'Ret gerekçesi sorgulama, kredi geçmişi ve yeniden başvuru',
    category: 'Para & Banka',
    color: '#f59e0b',
    icon: '🏦',
    grammarExplain: `📌 KREDİ İTİRAZ DİLİ:
1. "Отказать в кредите" (krediyi reddetmek): "Банк отказал мне в кредите" — "в + предложный" yapısına dikkat.
2. "Кредитная история" (kredi geçmişi/sicili) — reddin bir numaralı sebebi; "испорченная история" (bozuk sicil).
3. "Подать на пересмотр" (yeniden değerlendirme talep etmek) — resmî itirazın kalıbıdır.`,
    words: [
      { id: 'wx126_1', ru: 'Отказ', reading: 'Atkás', tr: 'Ret', level: 'C1/C2', usageNote: '"Получить отказ" (ret almak).' },
      { id: 'wx126_2', ru: 'Кредитная история', reading: 'Kridítnaya istóriya', tr: 'Kredi sicili', level: 'C1/C2', usageNote: 'Tüm kredi geçmişinin kaydıdır.' },
      { id: 'wx126_3', ru: 'Обжаловать', reading: "Abjálavat'", tr: 'İtiraz etmek (resmî)', level: 'C1/C2', usageNote: 'Hukuki itirazın fiilidir.' },
      { id: 'wx126_4', ru: 'Причина отказа', reading: 'Priçína atkáza', tr: 'Ret gerekçesi', level: 'C1/C2', usageNote: 'Banka açıklamak zorunda değildir — ama sormak serbest!' },
      { id: 'wx126_5', ru: 'Справка о доходах', reading: 'Spráfka a dahódah', tr: 'Gelir belgesi', level: 'C1/C2', usageNote: 'Kredi dosyasının ana belgesidir.' },
      { id: 'wx126_6', ru: 'Поручитель', reading: "Paruçítil'", tr: 'Kefil', level: 'C1/C2', usageNote: 'Krediye ortak sorumlu olan kişidir.' },
      { id: 'wx126_7', ru: 'Пересмотреть', reading: "Pirismátryet'", tr: 'Yeniden değerlendirmek', level: 'C1/C2', usageNote: '"Подать на пересмотр" (yeniden inceleme istemek).' },
      { id: 'wx126_8', ru: 'Условия кредита', reading: 'Uslóviya kridíta', tr: 'Kredi koşulları', level: 'C1/C2', usageNote: 'Faiz, vade ve teminat şartlarıdır.' },
      { id: 'wx126_9', ru: 'Задолженность', reading: "Zadóljınnast'", tr: 'Bakiye borç / Gecikmiş borç', level: 'C1/C2', usageNote: '"Погасить задолженность" (borcu kapatmak).' },
      { id: 'wx126_10', ru: 'Одобрение', reading: 'Adabryéniye', tr: 'Onay', level: 'C1/C2', usageNote: '"Предварительное одобрение" (ön onay) da vardır.' },
      { id: 'wx126_11', ru: 'Платёжеспособность', reading: "Platyójespasóbnast'", tr: 'Ödeme gücü', level: 'C1/C2', usageNote: 'Bankanın asıl merak ettiği şeydir.' },
      { id: 'wx126_12', ru: 'Рефинансирование', reading: 'Rifinansíravaniye', tr: 'Yeniden yapılandırma', level: 'C1/C2', usageNote: 'Eski krediyi daha iyi şartlarla değiştirmektir.' }
    ],
    sentences: [
      { ru: 'Банк отказал мне в кредите.', tr: 'Banka kredimi reddetti.', scrambled: ['мне', 'Банк отказал', 'в кредите.'], correct: ['Банк отказал', 'мне', 'в кредите.'] },
      { ru: 'Мы подадим документы на пересмотр.', tr: 'Belgeleri yeniden değerlendirmeye sunacağız.', scrambled: ['документы', 'Мы подадим', 'на пересмотр.'], correct: ['Мы подадим', 'документы', 'на пересмотр.'] }
    ],
    sceneTitle: 'Ret Mektubuyla Gelen Sabah',
    sceneContext: 'Kredisi reddedilen girişimci, şube müdürüyle gerekçeyi ve yeniden başvuru yolunu konuşur.',
    dialogue: [
      { speaker: 'Lyosha', ru: 'Почему мне отказали? У меня стабильный доход!', reading: 'Paçimú mne atkazáli? U minyá stabíl\'nıy dahót!', tr: 'Neden reddedildim? Düzenli gelirim var!' },
      { speaker: 'Müdür', ru: 'Причина — старая задолженность в кредитной истории.', reading: 'Priçína — stáraya zadóljınnast\' f kridítnay istórii.', tr: 'Sebep, kredi sicilinizdeki eski bir borç.' },
      { speaker: 'Lyosha', ru: 'Я её давно погасил! Можно пересмотреть решение?', reading: 'Ya yiyó davnó pagasíl! Mójna pirismátryet\' rişéniye?', tr: 'Onu çoktan kapattım! Karar yeniden değerlendirilebilir mi?' },
      { speaker: 'Müdür', ru: 'Да. Принесите справку о доходах и найдите поручителя.', reading: 'Da. Prinisíte spráfku a dahódah i naydíte paruçítilya.', tr: 'Evet. Gelir belgesi getirin ve bir kefil bulun.' }
    ]
  },
  {
    id: 'mod_c1_x7',
    unitNumber: 179,
    levelGroup: 'C1/C2',
    title: 'Gümrük, İthalat & İhracat',
    description: 'Gümrük beyanı, vergi oranları, lojistik ve takılan yük dramı',
    category: 'Ticaret & Girişim',
    color: '#06b6d4',
    icon: '🚢',
    grammarExplain: `📌 DIŞ TİCARET DİLİ:
1. "Растаможить груз" (yükü gümrükten çekmek) — günlük ticaret dilinin meşhur fiili; resmî hâli "провести таможенное оформление".
2. "Пошлина" (gümrük vergisi) yüzdeyle konuşulur: "пошлина пять процентов".
3. "Груз застрял на таможне" (Yük gümrükte takıldı) — ithalatçının kâbus cümlesi; "застрять" (takılıp kalmak) fiiline dikkat.`,
    words: [
      { id: 'wx127_1', ru: 'Таможня', reading: 'Tamójnya', tr: 'Gümrük', level: 'C1/C2', usageNote: '"На таможне" (gümrükte) şeklinde kullanılır.' },
      { id: 'wx127_2', ru: 'Импорт', reading: 'Ímpart', tr: 'İthalat', level: 'C1/C2', usageNote: 'Zıttı "экспорт"tur.' },
      { id: 'wx127_3', ru: 'Экспорт', reading: 'Éksport', tr: 'İhracat', level: 'C1/C2', usageNote: '"Экспортировать за границу" (yurt dışına ihraç etmek).' },
      { id: 'wx127_4', ru: 'Пошлина', reading: 'Póşlina', tr: 'Gümrük vergisi', level: 'C1/C2', usageNote: '"Таможенная пошлина" tam halidir.' },
      { id: 'wx127_5', ru: 'Декларация', reading: 'Diklarátsiya', tr: 'Beyanname', level: 'C1/C2', usageNote: '"Заполнить декларацию" (beyanname doldurmak).' },
      { id: 'wx127_6', ru: 'Груз', reading: 'Grus', tr: 'Yük / Kargo', level: 'C1/C2', usageNote: '"Груз прибыл" (Yük ulaştı) iyi haberdir.' },
      { id: 'wx127_7', ru: 'Логистика', reading: 'Lagístika', tr: 'Lojistik', level: 'C1/C2', usageNote: 'Tedarik zincirinin bilimidir.' },
      { id: 'wx127_8', ru: 'Сертификат', reading: 'Sirtifikát', tr: 'Sertifika / Belge', level: 'C1/C2', usageNote: '"Сертификат соответствия" (uygunluk belgesi).' },
      { id: 'wx127_9', ru: 'Растаможить', reading: "Rastamójit'", tr: 'Gümrükten çekmek', level: 'C1/C2', usageNote: 'Ticaret jargonunun günlük fiilidir.' },
      { id: 'wx127_10', ru: 'Застрять', reading: "Zastryát'", tr: 'Takılıp kalmak', level: 'C1/C2', usageNote: '"Груз застрял" (Yük takıldı) — panik cümlesi.' },
      { id: 'wx127_11', ru: 'Таможенный брокер', reading: 'Tamójınnıy brókir', tr: 'Gümrük müşaviri', level: 'C1/C2', usageNote: 'Evrak işini hızlandıran profesyoneldir.' },
      { id: 'wx127_12', ru: 'Страна происхождения', reading: 'Straná praishajdyéniya', tr: 'Menşe ülkesi', level: 'C1/C2', usageNote: 'Vergi oranını belirleyen bilgidir.' }
    ],
    sentences: [
      { ru: 'Наш груз застрял на таможне.', tr: 'Yükümüz gümrükte takıldı.', scrambled: ['застрял', 'Наш груз', 'на таможне.'], correct: ['Наш груз', 'застрял', 'на таможне.'] },
      { ru: 'Пошлина — пять процентов от стоимости.', tr: 'Gümrük vergisi, değerin yüzde beşi.', scrambled: ['пять процентов', 'Пошлина —', 'от стоимости.'], correct: ['Пошлина —', 'пять процентов', 'от стоимости.'] }
    ],
    sceneTitle: 'Konteyner Nerede?',
    sceneContext: 'İthalatçı, Türkiye\'den gelen tekstil yükünün gümrükte beklediğini öğrenir; gümrük müşaviri eksik sertifikayı bulur.',
    dialogue: [
      { speaker: 'İthalatçı', ru: 'Где контейнер? Клиенты ждут товар!', reading: 'Gde kantyéynir? Kliyénty jdut tavár!', tr: 'Konteyner nerede? Müşteriler malı bekliyor!' },
      { speaker: 'Müşavir', ru: 'Груз застрял на таможне. Не хватает сертификата.', reading: 'Grus zastryál na tamójne. Ni hvatáit sirtifikáta.', tr: 'Yük gümrükte takıldı. Bir sertifika eksik.' },
      { speaker: 'İthalatçı', ru: 'Отправляю сертификат сейчас! А пошлина оплачена?', reading: 'Atpravlyáyu sirtifikát siyçás! A póşlina apláçina?', tr: 'Sertifikayı hemen gönderiyorum! Peki vergi ödendi mi?' },
      { speaker: 'Müşavir', ru: 'Да. Завтра растаможим и груз поедет на склад.', reading: 'Da. Záftra rastamójim i grus payédit na sklat.', tr: 'Evet. Yarın gümrükten çekeriz, yük depoya gider.' }
    ]
  },
  {
    id: 'mod_c1_x8',
    unitNumber: 180,
    levelGroup: 'C1/C2',
    title: 'Ekonomi Haberleri & Enflasyon Sohbeti',
    description: 'Fiyat artışları, kur, uzman tahminleri ve mutfak ekonomisi',
    category: 'İleri Düzey Dil',
    color: '#a855f7',
    icon: '📉',
    grammarExplain: `📌 EKONOMİ SOHBETİ DİLİ:
1. "Подорожать" (zamlanmak/pahalanmak): "Всё подорожало" (Her şey zamlandı) — mutfak ekonomisinin özet cümlesi.
2. "Курс рубля вырос / упал" (rublenin kuru yükseldi / düştü) — haber bültenlerinin açılış cümlesi.
3. "По прогнозам экспертов..." (Uzman tahminlerine göre...) — sofistike sohbetin giriş kalıbı.`,
    words: [
      { id: 'wx128_1', ru: 'Инфляция', reading: 'Inflyátsiya', tr: 'Enflasyon', level: 'C1/C2', usageNote: '"Уровень инфляции" (enflasyon seviyesi) yüzdeyle verilir.' },
      { id: 'wx128_2', ru: 'Цены растут', reading: 'Tsény rastút', tr: 'Fiyatlar artıyor', level: 'C1/C2', usageNote: 'Günlük sohbetin klasik açılışıdır.' },
      { id: 'wx128_3', ru: 'Курс рубля', reading: 'Kurs rublyá', tr: 'Ruble kuru', level: 'C1/C2', usageNote: 'Haber bültenlerinin baş konusudur.' },
      { id: 'wx128_4', ru: 'Кризис', reading: 'Krízis', tr: 'Kriz', level: 'C1/C2', usageNote: '"Экономический кризис" tam halidir.' },
      { id: 'wx128_5', ru: 'Экономика', reading: 'Ekanómika', tr: 'Ekonomi', level: 'C1/C2', usageNote: '"Мировая экономика" (dünya ekonomisi).' },
      { id: 'wx128_6', ru: 'Подорожать', reading: "Padarajáit'", tr: 'Zamlanmak', level: 'C1/C2', usageNote: 'Zıttı "подешеветь" (ucuzlamak)dir.' },
      { id: 'wx128_7', ru: 'Прогноз', reading: 'Pragnós', tr: 'Tahmin / Öngörü', level: 'C1/C2', usageNote: '"По прогнозам..." diye alıntılanır.' },
      { id: 'wx128_8', ru: 'Эксперты', reading: 'Ekspyérty', tr: 'Uzmanlar', level: 'C1/C2', usageNote: '"Эксперты считают..." (Uzmanlara göre...).' },
      { id: 'wx128_9', ru: 'Уровень жизни', reading: "Úravin' jízni", tr: 'Yaşam standardı', level: 'C1/C2', usageNote: 'Sosyoekonomik tartışmanın ana ölçütüdür.' },
      { id: 'wx128_10', ru: 'Покупательная способность', reading: "Pakupátil'naya spasóbnast'", tr: 'Alım gücü', level: 'C1/C2', usageNote: 'Enflasyonun erittiği şeydir.' },
      { id: 'wx128_11', ru: 'Ставка Центробанка', reading: 'Stáfka Tsentrabánka', tr: 'Merkez bankası faizi', level: 'C1/C2', usageNote: 'Kredi faizlerini belirleyen orandır.' },
      { id: 'wx128_12', ru: 'Затянуть пояса', reading: "Zatinút' payasá", tr: 'Kemer sıkmak (deyim)', level: 'C1/C2', usageNote: 'Türkçedekiyle birebir aynı deyimdir!' }
    ],
    sentences: [
      { ru: 'В этом году всё подорожало.', tr: 'Bu yıl her şey zamlandı.', scrambled: ['всё', 'В этом году', 'подорожало.'], correct: ['В этом году', 'всё', 'подорожало.'] },
      { ru: 'Эксперты прогнозируют рост цен.', tr: 'Uzmanlar fiyat artışı öngörüyor.', scrambled: ['рост', 'Эксперты', 'цен.', 'прогнозируют'], correct: ['Эксперты', 'прогнозируют', 'рост', 'цен.'] }
    ],
    sceneTitle: 'Mutfakta Makroekonomi',
    sceneContext: 'Akşam haberlerinde enflasyon verisi açıklanmıştır; mutfakta çay eşliğinde herkes bir anda ekonomist kesilir.',
    dialogue: [
      { speaker: 'Baba', ru: 'Видели новости? Инфляция снова выросла!', reading: 'Vídili nóvasti? Inflyátsiya snóva výrasla!', tr: 'Haberleri gördünüz mü? Enflasyon yine arttı!' },
      { speaker: 'Anne', ru: 'Я и без новостей вижу — в магазине всё подорожало.', reading: 'Ya i bis nóvastyey víju — v magazíne fsyo padarajála.', tr: 'Habersiz de görüyorum — markette her şey zamlandı.' },
      { speaker: 'Dima', ru: 'По прогнозам экспертов, ставка Центробанка снизится.', reading: 'Pa pragnózam ekspyértaf, stáfka Tsentrabánka snízitsa.', tr: 'Uzman tahminlerine göre merkez bankası faizi düşecek.' },
      { speaker: 'Baba', ru: 'Пока что — затягиваем пояса!', reading: 'Paká şto — zatyágivayem payasá!', tr: 'Şimdilik — kemerleri sıkıyoruz!' }
    ]
  },
  {
    id: 'mod_c1_x9',
    unitNumber: 181,
    levelGroup: 'C1/C2',
    title: 'Romantik Jestler & Sürpriz Organizasyonu',
    description: 'Yıldönümü planı, mum ışığında yemek ve unutulmaz anlar yaratma',
    category: 'İlişkiler & Flört',
    color: '#ec4899',
    icon: '🌹',
    grammarExplain: `📌 ROMANTİK JEST DİLİ:
1. "Устроить сюрприз" (sürpriz yapmak/organize etmek): "Я устрою тебе сюрприз" (Sana sürpriz hazırlayacağım).
2. "Ужин при свечах" (mum ışığında yemek) — "при + предложный" yapısı "eşliğinde" anlamı verir.
3. "Растрогаться" (duygulanmak): "Она растрогалась до слёз" (Gözleri dolana kadar duygulandı).`,
    words: [
      { id: 'wx129_1', ru: 'Сюрприз', reading: 'Syurprís', tr: 'Sürpriz', level: 'C1/C2', usageNote: '"Устроить сюрприз" (sürpriz hazırlamak).' },
      { id: 'wx129_2', ru: 'Годовщина', reading: 'Gadafşşína', tr: 'Yıldönümü', level: 'C1/C2', usageNote: '"Годовщина отношений" (ilişki yıldönümü) unutulmaz!' },
      { id: 'wx129_3', ru: 'Ужин при свечах', reading: 'Újın pri sviçáh', tr: 'Mum ışığında yemek', level: 'C1/C2', usageNote: 'Romantizmin klasik sahnesidir.' },
      { id: 'wx129_4', ru: 'Признание', reading: 'Priznániye', tr: 'İtiraf / Aşk ilanı', level: 'C1/C2', usageNote: '"Признание в любви" (aşk ilanı).' },
      { id: 'wx129_5', ru: 'Букет', reading: 'Bukyét', tr: 'Buket', level: 'C1/C2', usageNote: '"Огромный букет роз" (kocaman gül buketi).' },
      { id: 'wx129_6', ru: 'Кольцо', reading: "Kal'tsó", tr: 'Yüzük', level: 'C1/C2', usageNote: 'Kutunun açıldığı an her şey değişir!' },
      { id: 'wx129_7', ru: 'Растрогаться', reading: 'Rastrógatsa', tr: 'Duygulanmak', level: 'C1/C2', usageNote: '"До слёз" (gözyaşlarına kadar) ile güçlenir.' },
      { id: 'wx129_8', ru: 'Запомнить навсегда', reading: "Zapómnit' nafsigdá", tr: 'Sonsuza dek hatırlamak', level: 'C1/C2', usageNote: 'Sürprizin amacı budur.' },
      { id: 'wx129_9', ru: 'Организовать', reading: "Arganizavát'", tr: 'Organize etmek', level: 'C1/C2', usageNote: 'Gizli plan gerektiren fiildir.' },
      { id: 'wx129_10', ru: 'Романтичный', reading: 'Ramantíçnıy', tr: 'Romantik', level: 'C1/C2', usageNote: '"Самый романтичный вечер" (en romantik akşam).' },
      { id: 'wx129_11', ru: 'Втайне', reading: 'Ftáyne', tr: 'Gizlice', level: 'C1/C2', usageNote: '"Готовить втайне" (gizlice hazırlamak).' },
      { id: 'wx129_12', ru: 'Свидание на крыше', reading: 'Svidániye na krýşe', tr: 'Çatıda buluşma', level: 'C1/C2', usageNote: 'Film sahnesi gibi jestlerin zirvesidir.' }
    ],
    sentences: [
      { ru: 'Он устроил ужин при свечах.', tr: 'Mum ışığında bir yemek hazırladı.', scrambled: ['ужин', 'Он устроил', 'при свечах.'], correct: ['Он устроил', 'ужин', 'при свечах.'] },
      { ru: 'Этот вечер я запомню навсегда.', tr: 'Bu akşamı sonsuza dek hatırlayacağım.', scrambled: ['я запомню', 'Этот вечер', 'навсегда.'], correct: ['Этот вечер', 'я запомню', 'навсегда.'] }
    ],
    sceneTitle: 'Çatı Katında Bir Yıldönümü',
    sceneContext: 'Dima birinci yıldönümü için gizlice çatıda mum ışığında yemek hazırlamıştır; plan neredeyse yağmura kurban gider.',
    dialogue: [
      { speaker: 'Dima', ru: 'Закрой глаза и иди за мной... Сюрприз!', reading: 'Zakróy glazá i idí za mnoy... Syurprís!', tr: 'Gözlerini kapat ve beni takip et... Sürpriz!' },
      { speaker: 'Nastya', ru: 'Ужин при свечах на крыше?! Дима!', reading: 'Újın pri sviçáh na krýşe?! Díma!', tr: 'Çatıda mum ışığında yemek mi?! Dima!' },
      { speaker: 'Dima', ru: 'Год назад ты сказала мне "да". С годовщиной!', reading: 'Got nazát ty skazála mne "da". S gadafşşínay!', tr: 'Bir yıl önce bana "evet" dedin. Yıldönümümüz kutlu olsun!' },
      { speaker: 'Nastya', ru: 'Я растрогалась до слёз... Запомню этот вечер навсегда!', reading: 'Ya rastrógalas\' da slyos... Zapómnyu état vyéçir nafsigdá!', tr: 'Gözlerim doldu... Bu akşamı sonsuza dek hatırlayacağım!' }
    ]
  },
  {
    id: 'mod_c1_x10',
    unitNumber: 182,
    levelGroup: 'C1/C2',
    title: 'Derin İlişki Konuşmaları & Gelecek Planı',
    description: 'Değerler, korkular, taşınma ve "biz nereye gidiyoruz" sohbeti',
    category: 'İlişkiler & Flört',
    color: '#8b5cf6',
    icon: '🔮',
    grammarExplain: `📌 DERİN SOHBET DİLİ:
1. "Поговорить откровенно" (açık yüreklilikle konuşmak) — yüzeysel sohbetin bittiği yerde başlar.
2. "Готов(а) к + yönelme hâl" (bir şeye hazır olmak): "Я готов к переезду" (Taşınmaya hazırım).
3. "Меня пугает, что..." (Beni korkutan şu ki...) — kırılganlığı yetişkin dille ifade etme kalıbı.`,
    words: [
      { id: 'wx130_1', ru: 'Будущее', reading: 'Búduşşiye', tr: 'Gelecek', level: 'C1/C2', usageNote: '"Планы на будущее" (gelecek planları).' },
      { id: 'wx130_2', ru: 'Ценности', reading: 'Tsénnasti', tr: 'Değerler', level: 'C1/C2', usageNote: '"Общие ценности" (ortak değerler) ilişkinin temelidir.' },
      { id: 'wx130_3', ru: 'Откровенно', reading: 'Atkravyénna', tr: 'Açık yüreklilikle', level: 'C1/C2', usageNote: '"Поговорим откровенно" derin sohbet başlatır.' },
      { id: 'wx130_4', ru: 'Мечтать', reading: "Miçtát'", tr: 'Hayal kurmak', level: 'C1/C2', usageNote: '"О чём ты мечтаешь?" (Neyin hayalini kuruyorsun?).' },
      { id: 'wx130_5', ru: 'Переезд', reading: 'Piriyést', tr: 'Taşınma', level: 'C1/C2', usageNote: 'Başka şehre/ülkeye taşınmayı da kapsar.' },
      { id: 'wx130_6', ru: 'Готовность', reading: "Gatóvnast'", tr: 'Hazır olma', level: 'C1/C2', usageNote: '"Готовность к переменам" (değişime hazırlık).' },
      { id: 'wx130_7', ru: 'Поддержка', reading: 'Paddyérjka', tr: 'Destek', level: 'C1/C2', usageNote: '"Взаимная поддержка" (karşılıklı destek).' },
      { id: 'wx130_8', ru: 'Страх', reading: 'Strah', tr: 'Korku', level: 'C1/C2', usageNote: '"Поделиться страхами" (korkuları paylaşmak) cesarettir.' },
      { id: 'wx130_9', ru: 'Честность', reading: "Çyésnast'", tr: 'Dürüstlük', level: 'C1/C2', usageNote: 'Derin ilişkinin para birimidir.' },
      { id: 'wx130_10', ru: 'Навсегда', reading: 'Nafsigdá', tr: 'Sonsuza dek', level: 'C1/C2', usageNote: '"Вместе навсегда" (sonsuza dek birlikte).' },
      { id: 'wx130_11', ru: 'Компромисс', reading: 'Kampramíss', tr: 'Uzlaşma', level: 'C1/C2', usageNote: 'Büyük kararların köprüsüdür.' },
      { id: 'wx130_12', ru: 'Смысл жизни', reading: 'Smysl jízni', tr: 'Hayatın anlamı', level: 'C1/C2', usageNote: 'Gece üçte açılan konudur!' }
    ],
    sentences: [
      { ru: 'Давай поговорим откровенно о будущем.', tr: 'Gelecek hakkında açıkça konuşalım.', scrambled: ['откровенно', 'Давай поговорим', 'о будущем.'], correct: ['Давай поговорим', 'откровенно', 'о будущем.'] },
      { ru: 'Какие у нас планы на будущее?', tr: 'Gelecek planlarımız neler?', scrambled: ['планы', 'Какие у нас', 'на будущее?'], correct: ['Какие у нас', 'планы', 'на будущее?'] }
    ],
    sceneTitle: 'Gece Üçte Mutfak Sohbeti',
    sceneContext: 'Nastya\'ya başka şehirden iş teklifi gelmiştir; çift, mutfak masasında hayatlarının en dürüst konuşmasını yapar.',
    dialogue: [
      { speaker: 'Nastya', ru: 'Мне предложили работу в Петербурге. Поговорим откровенно?', reading: 'Mne pridlajíli rabótu f Pitirbúrge. Pagavarím atkravyénna?', tr: 'Petersburg\'dan iş teklifi aldım. Açıkça konuşalım mı?' },
      { speaker: 'Dima', ru: 'Меня пугает переезд... но твоя мечта важнее страха.', reading: 'Minyá pugáit piriyést... no tvayá miçtá vajnyéye stráha.', tr: 'Taşınma beni korkutuyor... ama senin hayalin korkudan önemli.' },
      { speaker: 'Nastya', ru: 'Ты правда готов поехать со мной?', reading: 'Ty právda gatóf payéhat\' sa mnoy?', tr: 'Gerçekten benimle gelmeye hazır mısın?' },
      { speaker: 'Dima', ru: 'У нас общие ценности и одна мечта. Вместе — навсегда.', reading: 'U nas óbşşiye tsénnasti i adná miçtá. Vmyéste — nafsigdá.', tr: 'Ortak değerlerimiz ve tek hayalimiz var. Birlikte — sonsuza dek.' }
    ]
  },
  {
    id: 'mod_c1_x11',
    unitNumber: 183,
    levelGroup: 'C1/C2',
    title: 'Ofis Politikaları & Diplomasi',
    description: 'Dedikodu yönetimi, tarafsızlık ve zarif imalar sanatı',
    category: 'İş Hayatı',
    color: '#f97316',
    icon: '🎭',
    grammarExplain: `📌 OFİS DİPLOMASİSİ DİLİ:
1. "Держать нейтралитет" (tarafsız kalmak) — ofis savaşlarında hayatta kalma stratejisi.
2. "Намекать" (ima etmek): "На что ты намекаешь?" (Neyi ima ediyorsun?) — alt metin savunması.
3. "Не выносить сор из избы" (kirli çamaşırları dışarı çıkarmamak) — kelime kelime "çöpü kulübeden dışarı taşımamak" deyimi.`,
    words: [
      { id: 'wx131_1', ru: 'Интриги', reading: 'Intrígi', tr: 'Entrikalar', level: 'C1/C2', usageNote: '"Офисные интриги" (ofis entrikaları) her yerde vardır.' },
      { id: 'wx131_2', ru: 'Слухи', reading: 'Slúhi', tr: 'Söylentiler', level: 'C1/C2', usageNote: '"Ходят слухи, что..." (Söylentiye göre...).' },
      { id: 'wx131_3', ru: 'Нейтралитет', reading: 'Niytralityét', tr: 'Tarafsızlık', level: 'C1/C2', usageNote: '"Держать нейтралитет" (tarafsız kalmak).' },
      { id: 'wx131_4', ru: 'Союзник', reading: 'Sayúznik', tr: 'Müttefik', level: 'C1/C2', usageNote: 'Ofiste güvenilir dosttur.' },
      { id: 'wx131_5', ru: 'Репутация', reading: 'Riputátsiya', tr: 'İtibar', level: 'C1/C2', usageNote: 'Yıllarda kazanılır, dakikalarda kaybedilir.' },
      { id: 'wx131_6', ru: 'Осторожно', reading: 'Astarójna', tr: 'Dikkatli / Temkinli', level: 'C1/C2', usageNote: '"Выбирай слова осторожно" (Kelimeleri dikkatli seç).' },
      { id: 'wx131_7', ru: 'Намекать', reading: "Namikát'", tr: 'İma etmek', level: 'C1/C2', usageNote: 'Doğrudan söylemeden anlatma sanatıdır.' },
      { id: 'wx131_8', ru: 'Выгода', reading: 'Výgada', tr: 'Çıkar / Fayda', level: 'C1/C2', usageNote: '"Кому это выгодно?" (Bu kimin çıkarına?) diye sorulur.' },
      { id: 'wx131_9', ru: 'Дипломатично', reading: 'Diplamatíçna', tr: 'Diplomatik biçimde', level: 'C1/C2', usageNote: '"Ответить дипломатично" (diplomatik cevap vermek).' },
      { id: 'wx131_10', ru: 'Подковёрная борьба', reading: "Padkavyórnaya bar'bá", tr: 'Perde arkası mücadele', level: 'C1/C2', usageNote: 'Kelime kelime "halı altı kavgası" — görünmeyen güç savaşı.' },
      { id: 'wx131_11', ru: 'Доверять не всем', reading: "Daviryát' ni fsyem", tr: 'Herkese güvenmemek', level: 'C1/C2', usageNote: 'Ofis bilgeliğinin ilk kuralıdır.' },
      { id: 'wx131_12', ru: 'Сор из избы', reading: 'Sor iz izbý', tr: 'Kirli çamaşır (deyim)', level: 'C1/C2', usageNote: '"Не выносить сор из избы" — iç meseleyi dışarı taşımamak.' }
    ],
    sentences: [
      { ru: 'В офисе опять ходят слухи.', tr: 'Ofiste yine söylentiler dolaşıyor.', scrambled: ['опять', 'В офисе', 'слухи.', 'ходят'], correct: ['В офисе', 'опять', 'ходят', 'слухи.'] },
      { ru: 'Держи нейтралитет — это выгодно.', tr: 'Tarafsız kal — bu senin yararına.', scrambled: ['нейтралитет —', 'Держи', 'выгодно.', 'это'], correct: ['Держи', 'нейтралитет —', 'это', 'выгодно.'] }
    ],
    sceneTitle: 'Kahve Makinesi İstihbaratı',
    sceneContext: 'Yeni müdür atanacağı söylentisi ofisi ikiye bölmüştür; Nina, Timur\'a taraf tutmadan ayakta kalma dersi verir.',
    dialogue: [
      { speaker: 'Timur', ru: 'Все спрашивают, за кого я — за Олега или за Ирину.', reading: 'Fsye spráşıvayut, za kavó ya — za Alyéga íli za Irínu.', tr: 'Herkes kimden yana olduğumu soruyor — Oleg mi İrina mı.' },
      { speaker: 'Nina', ru: 'Держи нейтралитет. В подковёрной борьбе побеждает молчание.', reading: 'Dirjí niytralityét. F padkavyórnay bar\'byé pabijdáit malçániye.', tr: 'Tarafsız kal. Perde arkası mücadelede sessizlik kazanır.' },
      { speaker: 'Timur', ru: 'Но Олег намекает, что я в его команде...', reading: 'No Alyék namikáit, şto ya v yevó kamánde...', tr: 'Ama Oleg, onun ekibinde olduğumu ima ediyor...' },
      { speaker: 'Nina', ru: 'Отвечай дипломатично: "Я в команде компании". И точка!', reading: 'Atviçáy diplamatíçna: "Ya f kamánde kampánii". I tóçka!', tr: 'Diplomatik cevap ver: "Ben şirketin ekibindeyim". Nokta!' }
    ]
  },
  {
    id: 'mod_c1_x12',
    unitNumber: 184,
    levelGroup: 'C1/C2',
    title: 'Müzakere Sanatı & İkna Teknikleri',
    description: 'Pozisyon savunma, taviz takası ve kazan-kazan kapanışı',
    category: 'İleri Düzey Dil',
    color: '#14b8a6',
    icon: '🧠',
    grammarExplain: `📌 MÜZAKERE DİLİ:
1. "Вести переговоры" (müzakere yürütmek) — süreç fiili; sonuç fiili "заключить сделку" (anlaşmayı bağlamak).
2. "Пойти на уступки" (taviz vermek): tavizler tek tek değil, takasla verilir — "уступка за уступку".
3. "Взаимовыгодный" (karşılıklı kazançlı) — kazan-kazan dilinin anahtar sıfatı: "взаимовыгодное сотрудничество".`,
    words: [
      { id: 'wx132_1', ru: 'Переговоры', reading: 'Pirigavóry', tr: 'Müzakereler', level: 'C1/C2', usageNote: 'Hep çoğuldur: "за столом переговоров" (müzakere masasında).' },
      { id: 'wx132_2', ru: 'Аргумент', reading: 'Argumyént', tr: 'Argüman', level: 'C1/C2', usageNote: '"Весомый аргумент" (ağırlığı olan argüman).' },
      { id: 'wx132_3', ru: 'Уступка', reading: 'Ustúpka', tr: 'Taviz', level: 'C1/C2', usageNote: '"Пойти на уступки" (taviz vermek).' },
      { id: 'wx132_4', ru: 'Убедить', reading: "Ubidít'", tr: 'İkna etmek', level: 'C1/C2', usageNote: '"Вы меня убедили" (Beni ikna ettiniz) — zafer cümlesi.' },
      { id: 'wx132_5', ru: 'Позиция', reading: 'Pazítsiya', tr: 'Pozisyon / Duruş', level: 'C1/C2', usageNote: '"Отстаивать позицию" (pozisyonu savunmak).' },
      { id: 'wx132_6', ru: 'Компромисс', reading: 'Kampramíss', tr: 'Uzlaşma', level: 'C1/C2', usageNote: '"Прийти к компромиссу" (uzlaşmaya varmak).' },
      { id: 'wx132_7', ru: 'Давление', reading: 'Davlyéniye', tr: 'Baskı', level: 'C1/C2', usageNote: '"Не поддаваться давлению" (baskıya boyun eğmemek).' },
      { id: 'wx132_8', ru: 'Взаимовыгодный', reading: 'Vzaimavýgadnıy', tr: 'Karşılıklı kazançlı', level: 'C1/C2', usageNote: 'Kazan-kazan anlaşmasının sıfatıdır.' },
      { id: 'wx132_9', ru: 'Настаивать', reading: "Nastáivat'", tr: 'Israr etmek', level: 'C1/C2', usageNote: '"Я настаиваю на своём" (Kendi dediğimde ısrarcıyım).' },
      { id: 'wx132_10', ru: 'Заключить сделку', reading: "Zaklyuçít' zdyélku", tr: 'Anlaşma imzalamak', level: 'C1/C2', usageNote: 'Müzakerenin mutlu sonudur.' },
      { id: 'wx132_11', ru: 'Козырь', reading: "Kózır'", tr: 'Koz', level: 'C1/C2', usageNote: '"Козырь в рукаве" (koldaki koz) sona saklanır.' },
      { id: 'wx132_12', ru: 'Красная линия', reading: 'Krásnaya líniya', tr: 'Kırmızı çizgi', level: 'C1/C2', usageNote: 'Asla taviz verilmeyecek sınırdır.' }
    ],
    sentences: [
      { ru: 'Ваш аргумент звучит убедительно.', tr: 'Argümanınız ikna edici duruyor.', scrambled: ['звучит', 'Ваш аргумент', 'убедительно.'], correct: ['Ваш аргумент', 'звучит', 'убедительно.'] },
      { ru: 'Мы заключили взаимовыгодную сделку.', tr: 'Karşılıklı kazançlı bir anlaşma imzaladık.', scrambled: ['взаимовыгодную', 'Мы заключили', 'сделку.'], correct: ['Мы заключили', 'взаимовыгодную', 'сделку.'] }
    ],
    sceneTitle: 'Son Raunt: İmza ya da Hiç',
    sceneContext: 'İki şirket fiyat ve teslim şartlarında kilitlenmiştir; taraflardan biri kozunu açar ve masa kazan-kazanla kapanır.',
    dialogue: [
      { speaker: 'Alıcı', ru: 'Ваша цена выше рынка. Мы настаиваем на скидке.', reading: 'Váşa tsiná výşe rýnka. My nastáivayem na skítke.', tr: 'Fiyatınız piyasanın üstünde. İndirimde ısrarcıyız.' },
      { speaker: 'Satıcı', ru: 'Цена — наша красная линия. Но есть козырь: бесплатная логистика.', reading: 'Tsiná — náşa krásnaya líniya. No yest\' kózır\': bispplátnaya lagístika.', tr: 'Fiyat bizim kırmızı çizgimiz. Ama bir kozumuz var: ücretsiz lojistik.' },
      { speaker: 'Alıcı', ru: 'Хм... Это меняет дело. Уступка за уступку: подпишем на два года.', reading: 'Hm... Éta minyáit dyéla. Ustúpka za ustúpku: padpíşem na dva góda.', tr: 'Hmm... Bu işi değiştirir. Tavize karşı taviz: iki yıllığına imzalayalım.' },
      { speaker: 'Satıcı', ru: 'Взаимовыгодно! Заключаем сделку. Вы отличный переговорщик!', reading: 'Vzaimavýgadna! Zaklyucháyem zdyélku. Vy atlíçnıy pirigavórşşik!', tr: 'Kazan-kazan! Anlaşmayı bağlıyoruz. Harika bir müzakerecisiniz!' }
    ]
  }
];
