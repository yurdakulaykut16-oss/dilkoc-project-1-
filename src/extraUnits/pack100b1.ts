// ==========================================================
// 100 ÜNİTELİK BÜYÜK PAKET — BÖLÜM 3 / B1 (20 ünite)
// unitNumber: 95.9601 – 95.9620 (B1 bölgesinin sonu)
// İleri gramer + CÜMLEDE ANLAM (mecaz/deyim/atasözü) + KÜLTÜR + DİN
// ==========================================================
import type { UnitModule } from '../curriculumData';
import { S, W } from './expansion50a';

export const PACK100_B1: UnitModule[] = [
  {
    id: 'p100_b1_prep_deep', unitNumber: 95.9601, levelGroup: 'B1',
    title: 'Bulunma Hâli Derinlemesine', description: 'о, в, на, при edatlarıyla ustalaş',
    category: 'İleri Dilbilgisi', color: '#6d28d9', icon: '📘',
    grammarExplain: `📌 ПРЕДЛОЖНЫЙ ПАДЕЖ:
1. Yalnızca edatla kullanılır: в, на, о/об, при.
2. "Hakkında" = о + bulunma hâli: Я думаю о работе.
3. Ünlüyle başlayan kelimeden önce об, bazı kalıplarda обо: обо мне (benim hakkımda).
4. при = "yanında/…-iken": при университете (üniversite bünyesinde), при мне (ben oradayken).`,
    words: [
      W('p100b1pd_1', 'Думать о', 'Dúmat a', '… hakkında düşünmek', 'B1', 'о edatı bulunma hâli ister.'),
      W('p100b1pd_2', 'Обо мне', 'Abá mnye', 'Benim hakkımda', 'B1', 'Telaffuz kolaylığı için обо biçimi kullanılır.'),
      W('p100b1pd_3', 'Мечтать', 'Miçtát', 'Hayal kurmak', 'B1', 'Мечтать о чём-то kalıbıyla gelir.'),
      W('p100b1pd_4', 'Рассказывать', 'Rasskázıvat', 'Anlatmak', 'B1', 'Рассказать о поездке = gezi hakkında anlatmak.'),
      W('p100b1pd_5', 'При', 'Pri', '…-iken / yanında', 'B1', 'При Петре Первом = I. Petro döneminde.'),
      W('p100b1pd_6', 'Заботиться', 'Zabótitsa', 'İlgilenmek / Bakmak', 'B1', 'Заботиться о ком-то (birine bakmak).')
    ],
    sentences: [
      S('Я часто думаю о своём будущем.', 'Sık sık geleceğimi düşünüyorum.'),
      S('Он рассказал нам о своей поездке.', 'Bize gezisini anlattı.'),
      S('Она заботится о родителях.', 'Ailesiyle ilgileniyor.')
    ]
  },
  {
    id: 'p100_b1_dative_verbs', unitNumber: 95.9602, levelGroup: 'B1',
    title: 'Yönelme Hâli İsteyen Fiiller', description: 'помогать, звонить, нравиться',
    category: 'İleri Dilbilgisi', color: '#0369a1', icon: '🎯',
    grammarExplain: `📌 ДАТЕЛЬНЫЙ ПАДЕЖ FİİLLERİ:
1. Bazı fiiller Türkçedeki "-e hâli" gibi yönelme ister: помогать другу, звонить маме, верить людям.
2. нравиться TERSİNE çalışır: Мне нравится книга = Kitap bana hoş geliyor → "Kitabı seviyorum".
3. Kişisiz kalıplar: Мне нужно, Мне можно, Мне трудно.`,
    words: [
      W('p100b1dv_1', 'Помогать', 'Pamagát', 'Yardım etmek', 'B1', 'Помогать кому (yönelme), чему değil.'),
      W('p100b1dv_2', 'Нравиться', 'Nrávitsa', 'Hoşuna gitmek', 'B1', 'Özne beğenilen şeydir, kişi değil.'),
      W('p100b1dv_3', 'Верить', 'Vyérit', 'İnanmak / Güvenmek', 'B1', 'Верить кому (birine) ≠ верить в кого (bir şeye iman).'),
      W('p100b1dv_4', 'Советовать', 'Savyétavat', 'Tavsiye etmek', 'B1', 'Советовать кому что делать.'),
      W('p100b1dv_5', 'Мешать', 'Mişát', 'Engel olmak / Rahatsız etmek', 'B1', 'Aynı kelime "karıştırmak" da demektir.'),
      W('p100b1dv_6', 'Удаваться', 'Udavátsa', 'Başarmak (kişisiz)', 'B1', 'Мне удалось = Başarabildim.')
    ],
    sentences: [
      S('Мне нравится этот фильм.', 'Bu film hoşuma gidiyor.'),
      S('Я помогаю брату с работой.', 'Kardeşime işinde yardım ediyorum.'),
      S('Мне удалось решить проблему.', 'Sorunu çözmeyi başardım.')
    ]
  },
  {
    id: 'p100_b1_reflexive', unitNumber: 95.9603, levelGroup: 'B1',
    title: 'Dönüşlü ve Edilgen -ся', description: 'Bir ekin beş anlamı',
    category: 'İleri Dilbilgisi', color: '#be185d', icon: '🔄',
    grammarExplain: `📌 -СЯ EKİNİN İŞLEVLERİ:
1. Dönüşlü: мыться (yıkanmak).
2. Karşılıklı: встречаться (buluşmak), обниматься (sarılmak).
3. Edilgen: Дом строится рабочими. (Ev işçilerce inşa ediliyor.)
4. Kişisiz: Мне не спится. (Uykum gelmiyor.)
5. Bazı fiiller -ся olmadan HİÇ kullanılmaz: смеяться, бояться.`,
    words: [
      W('p100b1rf_1', 'Встречаться', 'Fstriçátsa', 'Buluşmak / Görüşmek', 'B1', 'Aynı zamanda "flört etmek" anlamındadır.'),
      W('p100b1rf_2', 'Смеяться', 'Smiyátsa', 'Gülmek', 'B1', '-ся olmadan kullanılmaz.'),
      W('p100b1rf_3', 'Бояться', 'Bayátsa', 'Korkmak', 'B1', 'Ardından tamlayan hâl gelir: бояться темноты.'),
      W('p100b1rf_4', 'Строиться', 'Stróitsa', 'İnşa edilmek', 'B1', 'Edilgen kullanımın klasik örneği.'),
      W('p100b1rf_5', 'Получаться', 'Paluçátsa', 'Olmak / Sonuç vermek', 'B1', 'У меня не получается = Beceremiyorum.'),
      W('p100b1rf_6', 'Заниматься', 'Zanimátsa', 'Uğraşmak / Çalışmak', 'B1', 'Araç hâli ister: заниматься спортом.')
    ],
    sentences: [
      S('Мы встречаемся каждую пятницу.', 'Her cuma buluşuyoruz.'),
      S('У меня не получается решить задачу.', 'Soruyu çözmeyi beceremiyorum.'),
      S('Она занимается спортом три раза в неделю.', 'Haftada üç kez spor yapıyor.')
    ]
  },
  {
    id: 'p100_b1_participle', unitNumber: 95.9604, levelGroup: 'B1',
    title: 'Ortaçlar (Причастие)', description: 'Sıfat-fiillerle cümle sıkıştır',
    category: 'İleri Dilbilgisi', color: '#7c2d12', icon: '🧷',
    grammarExplain: `📌 ORTAÇ = SIFATLAŞMIŞ FİİL:
1. Etken şimdiki: читающий студент (okuyan öğrenci) = студент, который читает.
2. Etken geçmiş: прочитавший (okumuş olan).
3. Edilgen geçmiş: прочитанная книга (okunmuş kitap) — en sık kullanılanıdır.
4. Ortaç isimle cins, sayı ve hâl bakımından uyuşur.`,
    words: [
      W('p100b1pt_1', 'Читающий', 'Çitáyuşşiy', 'Okuyan', 'B1', 'Şimdiki zaman 3. çoğul gövdesinden türer.'),
      W('p100b1pt_2', 'Работающий', 'Rabótayuşşiy', 'Çalışan', 'B1', 'Resmî metinlerde çok yaygındır.'),
      W('p100b1pt_3', 'Написанный', 'Napísannıy', 'Yazılmış', 'B1', 'Edilgen geçmiş ortaç; çift Н alır.'),
      W('p100b1pt_4', 'Сделанный', 'Zdyélannıy', 'Yapılmış', 'B1', 'Сделанный в России = Rusya\'da yapılmış.'),
      W('p100b1pt_5', 'Который', 'Katórıy', 'Ki / Olan', 'B1', 'Ortacın konuşma dilindeki eşdeğeri.'),
      W('p100b1pt_6', 'Известный', 'İzvyésnıy', 'Ünlü / Bilinen', 'B1', 'Ortaçtan sıfatlaşmış kelime; Т okunmaz.')
    ],
    sentences: [
      S('Студент, читающий книгу, мой друг.', 'Kitap okuyan öğrenci benim arkadaşım.'),
      S('Это письмо, написанное вчера.', 'Bu dün yazılmış bir mektup.'),
      S('Он известный писатель.', 'O ünlü bir yazar.')
    ]
  },
  {
    id: 'p100_b1_gerund', unitNumber: 95.9605, levelGroup: 'B1',
    title: 'Ulaçlar (Деепричастие)', description: '-ıp, -arak: iki eylemi birleştir',
    category: 'İleri Dilbilgisi', color: '#166534', icon: '🪢',
    grammarExplain: `📌 ULAÇ = ZARFLAŞMIŞ FİİL:
1. Eşzamanlı (-я): Читая книгу, он пил чай. (Kitap okurken çay içiyordu.)
2. Önce biten (-в): Прочитав книгу, он лёг спать. (Kitabı okuyup yattı.)
3. KURAL: ulacın öznesi ana cümlenin öznesiyle AYNI olmalıdır; yoksa cümle bozuk sayılır.`,
    words: [
      W('p100b1gr_1', 'Читая', 'Çitáya', 'Okurken / Okuyarak', 'B1', 'Bitmemiş fiilden -я ekiyle.'),
      W('p100b1gr_2', 'Прочитав', 'Praçitáf', 'Okuyup', 'B1', 'Bitmiş fiilden -в ekiyle.'),
      W('p100b1gr_3', 'Говоря', 'Gavaryá', 'Konuşurken', 'B1', 'Честно говоря = doğrusunu söylemek gerekirse.'),
      W('p100b1gr_4', 'Уходя', 'Uhadyá', 'Giderken', 'B1', 'Уходя, выключите свет = Çıkarken ışığı söndürün.'),
      W('p100b1gr_5', 'Не зная', 'Ni znáya', 'Bilmeden', 'B1', 'Olumsuz ulaç не ile ayrı yazılır.'),
      W('p100b1gr_6', 'Благодаря', 'Blagadaryá', 'Sayesinde', 'B1', 'Ulaçtan edata dönmüştür; yönelme hâli ister.')
    ],
    sentences: [
      S('Читая книгу, он пил чай.', 'Kitap okurken çay içiyordu.'),
      S('Прочитав письмо, она заплакала.', 'Mektubu okuyunca ağlamaya başladı.'),
      S('Благодаря тебе я всё понял.', 'Senin sayende her şeyi anladım.')
    ]
  },
  {
    id: 'p100_b1_meaning_metaphor', unitNumber: 95.9606, levelGroup: 'B1',
    title: 'Cümlede Anlam: Mecaz', description: 'Gerçek anlam mı, yan anlam mı?',
    category: 'Cümlede Anlam', color: '#c026d3', icon: '🎭',
    grammarExplain: `📌 DÜZ ANLAM / MECAZ ANLAM:
1. золотые часы (altın saat, düz) ↔ золотые руки (altın eller = hünerli, mecaz).
2. Bağlam anlamı belirler: холодный чай (soğuk çay) ↔ холодный человек (soğuk insan).
3. Sözlükler mecazı "перен." (переносное значение) kısaltmasıyla gösterir.`,
    words: [
      W('p100b1mm_1', 'Золотые руки', 'Zalatıye rúki', 'Hünerli eller', 'B1', 'Usta işçi için en yaygın övgüdür.'),
      W('p100b1mm_2', 'Горячий', 'Garyáçiy', 'Sıcak / Ateşli', 'B1', 'Mecazda "tutkulu": горячий спор.'),
      W('p100b1mm_3', 'Тёплый приём', 'Tyóplıy priyóm', 'Sıcak karşılama', 'B1', 'Sıcaklık mecazı Türkçeyle örtüşür.'),
      W('p100b1mm_4', 'Тяжёлый характер', 'Tijólıy haráktir', 'Zor kişilik', 'B1', 'Kelime kelime "ağır karakter".'),
      W('p100b1mm_5', 'Светлая голова', 'Svyétlaya galavá', 'Zeki kişi', 'B1', '"Aydınlık kafa" mecazı.'),
      W('p100b1mm_6', 'Переносный', 'Pirinósnıy', 'Mecazi', 'B1', 'в переносном смысле = mecazi anlamda.')
    ],
    sentences: [
      S('У него золотые руки.', 'Onun elinden her iş gelir.'),
      S('Нас ждал очень тёплый приём.', 'Bizi çok sıcak bir karşılama bekliyordu.'),
      S('Это сказано в переносном смысле.', 'Bu mecazi anlamda söylendi.')
    ]
  },
  {
    id: 'p100_b1_idioms2', unitNumber: 95.9607, levelGroup: 'B1',
    title: 'Cümlede Anlam: Deyimler', description: 'Rusçanın en sık deyimleri',
    category: 'Cümlede Anlam', color: '#b45309', icon: '🗣️',
    grammarExplain: `📌 DEYİM ÇÖZÜMLEME:
1. Deyimler tek bir anlam birimi oluşturur; içindeki kelimeler değiştirilemez.
2. Rus deyimlerinin çoğu bedene ve hayvanlara dayanır.
3. Türkçeye çevirirken EŞDEĞER deyim aranır, düz çeviri yapılmaz.`,
    words: [
      W('p100b1i2_1', 'Ни пуха ни пера', 'Ni púha ni pirá', 'Bol şans', 'B1', 'Cevabı mutlaka "К чёрту!" olur — gelenek böyledir.'),
      W('p100b1i2_2', 'Бить баклуши', 'Bit baklúşi', 'Boş gezmek', 'B1', 'Eskiden kaşık yapımı için odun yarmak kolay iş sayılırdı.'),
      W('p100b1i2_3', 'Как рыба в воде', 'Kak rıba v vadyé', 'Suda balık gibi', 'B1', 'Kendini çok rahat hissetmek.'),
      W('p100b1i2_4', 'Зарубить на носу', 'Zarubít na nasú', 'Kulağına küpe etmek', 'B1', 'Burada нос "burun" değil, eski "kayıt çubuğu"dur.'),
      W('p100b1i2_5', 'Тянуть кота за хвост', 'Tinút katá za hvost', 'Ağırdan almak', 'B1', 'Kelime kelime "kediyi kuyruğundan çekmek".'),
      W('p100b1i2_6', 'Спустя рукава', 'Spustyá rukavá', 'Baştan savma', 'B1', 'Eski uzun kollu giysilerle çalışmanın zorluğundan gelir.')
    ],
    sentences: [
      S('Ни пуха ни пера на экзамене!', 'Sınavda bol şans!'),
      S('Он работает спустя рукава.', 'Baştan savma çalışıyor.'),
      S('Запомни это, заруби на носу.', 'Bunu iyi belle, kulağına küpe et.')
    ]
  },
  {
    id: 'p100_b1_proverbs', unitNumber: 95.9608, levelGroup: 'B1',
    title: 'Cümlede Anlam: Atasözleri', description: 'Halk bilgeliğiyle konuş',
    category: 'Cümlede Anlam', color: '#78350f', icon: '📜',
    grammarExplain: `📌 ATASÖZÜ KULLANIMI:
1. Atasözleri (пословицы) çoğunlukla fiilsiz ya da eksiltili kurulur: Без труда — не выловишь и рыбку из пруда.
2. Konuşmada genelde YARISI söylenir, gerisi anlaşılır: "Тише едешь…"
3. Türkçedeki eşdeğeriyle eşleştirmek, ezberden daha kalıcıdır.`,
    words: [
      W('p100b1pr_1', 'Тише едешь — дальше будешь', 'Tíşe yédiş dálşe búdiş', 'Acele işe şeytan karışır', 'B1', 'Kelime kelime: "Yavaş gidersen daha uzağa varırsın".'),
      W('p100b1pr_2', 'Не всё то золото, что блестит', 'Ni fsyo to zólata şto blistít', 'Parlayan her şey altın değildir', 'B1', 'Türkçeyle birebir örtüşür.'),
      W('p100b1pr_3', 'Семь раз отмерь', 'Syem ras atmyér', 'Yedi kez ölç', 'B1', 'Devamı: один раз отрежь (bir kez kes).'),
      W('p100b1pr_4', 'Век живи — век учись', 'Vyek jiví vyek uçís', 'Beşikten mezara öğren', 'B1', 'Eğitim vurgusuyla çok sevilen bir sözdür.'),
      W('p100b1pr_5', 'Пословица', 'Paslóvitsa', 'Atasözü', 'B1', 'Поговорка (deyiş) daha kısadır ve hüküm bildirmez.'),
      W('p100b1pr_6', 'Мудрость', 'Múdrast', 'Bilgelik', 'B1', 'Sıfatı мудрый.')
    ],
    sentences: [
      S('Как говорится, тише едешь — дальше будешь.', 'Dedikleri gibi, acele işe şeytan karışır.'),
      S('Семь раз отмерь, один раз отрежь.', 'Yedi kez ölç, bir kez kes.'),
      S('В этой пословице большая мудрость.', 'Bu atasözünde büyük bir bilgelik var.')
    ]
  },
  {
    id: 'p100_b1_homonyms', unitNumber: 95.9609, levelGroup: 'B1',
    title: 'Cümlede Anlam: Eş Sesliler', description: 'Aynı yazılış, farklı dünya',
    category: 'Cümlede Anlam', color: '#0f766e', icon: '🪞',
    grammarExplain: `📌 ОМОНИМЫ:
1. Aynı yazılan ama anlamı farklı kelimeler bağlamla çözülür: ключ = anahtar / pınar.
2. Vurgu farkıyla ayrılanlar омографы sayılır: мУка / мукА.
3. Çeviride en sık tuzak budur; önce cümlenin konusunu belirle, sonra anlamı seç.`,
    words: [
      W('p100b1ho_1', 'Ключ', 'Klyuç', 'Anahtar / Pınar', 'B1', 'Гаечный ключ ise "somun anahtarı"dır.'),
      W('p100b1ho_2', 'Лук', 'Luk', 'Soğan / Yay', 'B1', 'Mutfakta soğan, okçulukta yay.'),
      W('p100b1ho_3', 'Мир', 'Mir', 'Barış / Dünya', 'B1', 'Tolstoy\'un romanı "Война и мир" bu çift anlamla oynar.'),
      W('p100b1ho_4', 'Коса', 'Kasá', 'Örgü / Tırpan / Kumsal dili', 'B1', 'Üç ayrı anlamı bağlam belirler.'),
      W('p100b1ho_5', 'Язык', 'Yizık', 'Dil (organ) / Dil (lisan)', 'B1', 'Türkçeyle aynı çift anlamlılığı taşır.'),
      W('p100b1ho_6', 'Контекст', 'Kantyékst', 'Bağlam', 'B1', 'Anlam ayırmada tek güvenilir araç.')
    ],
    sentences: [
      S('Я потерял ключ от квартиры.', 'Daire anahtarımı kaybettim.'),
      S('В лесу есть холодный ключ.', 'Ormanda soğuk bir pınar var.'),
      S('Значение слова зависит от контекста.', 'Kelimenin anlamı bağlama bağlıdır.')
    ]
  },
  {
    id: 'p100_b1_literature', unitNumber: 95.961, levelGroup: 'B1',
    title: 'Kültür: Rus Edebiyatı', description: 'Puşkin\'den Dostoyevski\'ye',
    category: 'Kültür', color: '#1e3a8a', icon: '📖',
    grammarExplain: `📌 EDEBİYAT ÜZERİNE KONUŞMAK:
1. "… yazarın eseri" tamlayan hâlle: роман Достоевского.
2. "… hakkında bir kitap" = книга о + bulunma hâli.
3. Beğeni: Мне нравится Чехов. / Я в восторге от Пушкина. (Puşkin\'e hayranım.)`,
    words: [
      W('p100b1li_1', 'Писатель', 'Pisátil', 'Yazar', 'B1', 'Şair ise поэт.'),
      W('p100b1li_2', 'Роман', 'Ramán', 'Roman', 'B1', 'Aynı kelime "aşk ilişkisi" anlamına da gelir.'),
      W('p100b1li_3', 'Произведение', 'Praizvidyéniye', 'Eser', 'B1', 'Resmî ve akademik kullanım.'),
      W('p100b1li_4', 'Герой', 'Giróy', 'Kahraman / Karakter', 'B1', 'Главный герой = başkahraman.'),
      W('p100b1li_5', 'Стихотворение', 'Stihatvaryéniye', 'Şiir', 'B1', 'Kısa biçimi стихи (şiirler).'),
      W('p100b1li_6', 'Смысл', 'Smısl', 'Anlam / Mana', 'B1', 'В чём смысл? = Anlamı ne?')
    ],
    sentences: [
      S('Я читаю роман Достоевского.', 'Dostoyevski\'nin bir romanını okuyorum.'),
      S('Главный герой очень сложный человек.', 'Başkahraman çok karmaşık bir insan.'),
      S('В чём смысл этого произведения?', 'Bu eserin anlamı nedir?')
    ]
  },
  {
    id: 'p100_b1_theatre', unitNumber: 95.9611, levelGroup: 'B1',
    title: 'Kültür: Tiyatro ve Bale', description: 'Bolşoy\'da bir akşam',
    category: 'Kültür', color: '#9f1239', icon: '🩰',
    grammarExplain: `📌 SANAT ETKİNLİĞİ DİLİ:
1. "…-e gitmek": идти в театр / на балет / на концерт (kuruma в, etkinliğe на).
2. Bilet: билет на балет (на + belirtme).
3. Beğeni geçmişte: Мне понравилось. (Hoşuma gitti.)`,
    words: [
      W('p100b1th_1', 'Театр', 'Tiátr', 'Tiyatro', 'B1', 'Большой театр dünyaca ünlüdür.'),
      W('p100b1th_2', 'Балет', 'Balyét', 'Bale', 'B1', 'Rus balesi ulusal gurur kaynağıdır.'),
      W('p100b1th_3', 'Спектакль', 'Spiktákl', 'Oyun / Gösteri', 'B1', 'Sinema filmi için kullanılmaz.'),
      W('p100b1th_4', 'Антракт', 'Antrákt', 'Ara', 'B1', 'Ara sırasında büfede шампанское içmek gelenektir.'),
      W('p100b1th_5', 'Аплодисменты', 'Apladismyéntı', 'Alkış', 'B1', 'Daima çoğuldur.'),
      W('p100b1th_6', 'Впечатление', 'Fpiçitlyéniye', 'İzlenim', 'B1', 'Произвести впечатление = etki bırakmak.')
    ],
    sentences: [
      S('Вчера мы ходили на балет.', 'Dün baleye gittik.'),
      S('Спектакль произвёл на меня сильное впечатление.', 'Oyun üzerimde güçlü bir etki bıraktı.'),
      S('В антракте мы пили кофе.', 'Arada kahve içtik.')
    ]
  },
  {
    id: 'p100_b1_music', unitNumber: 95.9612, levelGroup: 'B1',
    title: 'Kültür: Halk Müziği ve Dans', description: 'Balalayka, koro, horovod',
    category: 'Kültür', color: '#ea580c', icon: '🪗',
    grammarExplain: `📌 ÇALGI VE MÜZİK:
1. "Çalgı çalmak" = играть на + bulunma hâli: играть на гитаре.
2. "Oyun oynamak" ise играть в + belirtme: играть в футбол. İki kalıp karıştırılmamalı.
3. "Müzik dinlemek" = слушать музыку (belirtme hâli).`,
    words: [
      W('p100b1mu_1', 'Балалайка', 'Balaláyka', 'Balalayka', 'B1', 'Üç telli, üçgen gövdeli halk çalgısı.'),
      W('p100b1mu_2', 'Гармонь', 'Garmón', 'Akordeon (halk tipi)', 'B1', 'Köy düğünlerinin baş çalgısı.'),
      W('p100b1mu_3', 'Хор', 'Hor', 'Koro', 'B1', 'Rus koro geleneği kilise müziğinden doğmuştur.'),
      W('p100b1mu_4', 'Хоровод', 'Haravót', 'Halka dansı', 'B1', 'Slav halk dansı; el ele halka olunur.'),
      W('p100b1mu_5', 'Народный', 'Naródnıy', 'Halka ait', 'B1', 'Народная песня = halk türküsü.'),
      W('p100b1mu_6', 'Мелодия', 'Milódiya', 'Ezgi', 'B1', 'Aynı kelime telefon zil sesi için de kullanılır.')
    ],
    sentences: [
      S('Он играет на балалайке.', 'Balalayka çalıyor.'),
      S('Мы слушали народные песни.', 'Halk türküleri dinledik.'),
      S('Эта мелодия очень грустная.', 'Bu ezgi çok hüzünlü.')
    ]
  },
  {
    id: 'p100_b1_wedding', unitNumber: 95.9613, levelGroup: 'B1',
    title: 'Kültür: Düğün Gelenekleri', description: 'Gorko! ve Rus düğünü',
    category: 'Kültür', color: '#e11d48', icon: '💍',
    grammarExplain: `📌 DÜĞÜN DİLİ:
1. Evlenmek erkek için жениться (на + bulunma), kadın için выйти замуж (за + belirtme).
2. Misafirler «Горько!» (Acı!) diye bağırır; çift öpüşerek "tatlandırır".
3. Tebrik: Совет да любовь! (Uyum ve sevgi dileriz!)`,
    words: [
      W('p100b1we_1', 'Свадьба', 'Svádba', 'Düğün', 'B1', 'Д sedasızlaşmadan "d" okunur.'),
      W('p100b1we_2', 'Жених', 'Jiníh', 'Damat / Nişanlı (erkek)', 'B1', 'Kadını невеста.'),
      W('p100b1we_3', 'Кольцо', 'Kaltsó', 'Yüzük', 'B1', 'Ortodokslarda sağ ele takılır.'),
      W('p100b1we_4', 'Загс', 'Zaks', 'Nikâh dairesi', 'B1', 'Kısaltmadır ama tek kelime gibi çekimlenir.'),
      W('p100b1we_5', 'Тамада', 'Tamadá', 'Düğün sunucusu', 'B1', 'Gürcüceden gelir; sofrayı yöneten kişidir.'),
      W('p100b1we_6', 'Горько', 'Górka', '"Acı!" (düğün nidası)', 'B1', 'Bu bağırış olmadan Rus düğünü düşünülmez.')
    ],
    sentences: [
      S('В субботу у них свадьба.', 'Cumartesi onların düğünü var.'),
      S('Гости кричали «Горько!».', 'Misafirler "Gorko!" diye bağırdı.'),
      S('Он женился на своей однокласснице.', 'Sınıf arkadaşıyla evlendi.')
    ]
  },
  {
    id: 'p100_b1_rel_liturgy', unitNumber: 95.9614, levelGroup: 'B1',
    title: 'Din: Ayin ve İkonalar', description: 'Ortodoks ibadetinin yapısı',
    category: 'Din ve Maneviyat', color: '#a16207', icon: '🛐',
    grammarExplain: `📌 DİNÎ METİN ÜSLUBU:
1. Dinî metinlerde Kilise Slavcası kalıntıları görülür: Господи (Ya Rabbi), помилуй (merhamet et).
2. Bu biçimler günlük Rusçada YALNIZCA kalıp olarak yaşar.
3. Saygı ifadesi: Батюшка (peder) — rahibe hitap biçimidir.`,
    words: [
      W('p100b1rl_1', 'Служба', 'Slújba', 'Ayin', 'B1', 'Aynı kelime "hizmet/görev" anlamına da gelir.'),
      W('p100b1rl_2', 'Иконостас', 'İkanastás', 'İkonostasis', 'B1', 'Sunağı ayıran ikonalarla kaplı duvar.'),
      W('p100b1rl_3', 'Колокол', 'Kólakal', 'Çan', 'B1', 'Rus çan sanatı ayrı bir müzik dalıdır.'),
      W('p100b1rl_4', 'Господи', 'Góspadi', 'Ya Rabbi', 'B1', 'Eski seslenme hâli (звательный падеж) kalıntısıdır.'),
      W('p100b1rl_5', 'Благословение', 'Blagaslavyéniye', 'Takdis / Hayır dua', 'B1', 'Rahipten благословение istenir.'),
      W('p100b1rl_6', 'Паломник', 'Palómnik', 'Hacı / Ziyaretçi', 'B1', 'Kutsal yerleri ziyaret eden kişi.')
    ],
    sentences: [
      S('Служба начинается рано утром.', 'Ayin sabah erken başlar.'),
      S('Паломники приехали в монастырь.', 'Hacılar manastıra geldi.'),
      S('Он попросил благословения.', 'Hayır dua istedi.')
    ]
  },
  {
    id: 'p100_b1_rel_dialogue', unitNumber: 95.9615, levelGroup: 'B1',
    title: 'Din: Dinler Arası Saygı', description: 'Farklı inançlardan söz etme dili',
    category: 'Din ve Maneviyat', color: '#0d9488', icon: '🤲',
    grammarExplain: `📌 NEZAKETLİ DİNÎ SÖYLEM:
1. Nötr ifade: Я не религиозный человек. (Dindar biri değilim.) — saldırgan bulunmaz.
2. Saygılı merak: Можно спросить о вашей вере? (İnancınızı sorabilir miyim?)
3. Rusya çokdinli bir ülkedir; anayasal ifade: свобода вероисповедания (inanç özgürlüğü).`,
    words: [
      W('p100b1rd_1', 'Религия', 'Rilígiya', 'Din', 'B1', 'Sıfatı религиозный.'),
      W('p100b1rd_2', 'Атеист', 'Atiíst', 'Ateist', 'B1', 'Sovyet döneminde resmî dünya görüşüydü.'),
      W('p100b1rd_3', 'Терпимость', 'Tirpímast', 'Hoşgörü', 'B1', 'толерантность ile eş anlamlıdır.'),
      W('p100b1rd_4', 'Синагога', 'Sinagóga', 'Sinagog', 'B1', 'Rusya\'da köklü Yahudi cemaati vardır.'),
      W('p100b1rd_5', 'Буддизм', 'Buddízm', 'Budizm', 'B1', 'Kalmıkya, Buryatya ve Tıva\'da yaygındır.'),
      W('p100b1rd_6', 'Убеждение', 'Ubijdyéniye', 'İnanç / Kanaat', 'B1', 'Dinî olmayan kanaatler için de kullanılır.')
    ],
    sentences: [
      S('В России живут люди разных религий.', 'Rusya\'da farklı dinlerden insanlar yaşıyor.'),
      S('Я уважаю ваши убеждения.', 'Kanaatlerinize saygı duyuyorum.'),
      S('Терпимость очень важна.', 'Hoşgörü çok önemlidir.')
    ]
  },
  {
    id: 'p100_b1_interview', unitNumber: 95.9616, levelGroup: 'B1',
    title: 'İş Görüşmesi', description: 'Kendini tanıt, deneyimini anlat',
    category: 'İş Hayatı', color: '#1e40af', icon: '💼',
    grammarExplain: `📌 GÖRÜŞME KALIPLARI:
1. Deneyim: У меня пятилетний опыт работы в … (… alanında beş yıllık deneyimim var.)
2. Beceri: Я умею работать в команде. (Takımda çalışabilirim.)
3. Soru: Какие у вас требования? (Talepleriniz neler?)`,
    words: [
      W('p100b1in_1', 'Собеседование', 'Sabisyédavaniye', 'İş görüşmesi', 'B1', 'беседа (sohbet) kökünden.'),
      W('p100b1in_2', 'Опыт', 'Ópıt', 'Deneyim', 'B1', 'Aynı kelime "deney" anlamına da gelir.'),
      W('p100b1in_3', 'Резюме', 'Rizyumé', 'Özgeçmiş', 'B1', 'Çekimsizdir, nötr cinstir.'),
      W('p100b1in_4', 'Навык', 'Návık', 'Beceri', 'B1', 'Çoğulu навыки; CV\'lerde zorunlu başlıktır.'),
      W('p100b1in_5', 'Зарплата', 'Zarpláta', 'Maaş', 'B1', 'заработная плата kısaltmasıdır.'),
      W('p100b1in_6', 'Должность', 'Dóljnast', 'Pozisyon / Görev', 'B1', 'Занимать должность = görevde bulunmak.')
    ],
    sentences: [
      S('У меня пятилетний опыт работы.', 'Beş yıllık iş deneyimim var.'),
      S('Я отправил резюме вчера.', 'Özgeçmişimi dün gönderdim.'),
      S('Какая зарплата на этой должности?', 'Bu pozisyonda maaş ne kadar?')
    ]
  },
  {
    id: 'p100_b1_university', unitNumber: 95.9617, levelGroup: 'B1',
    title: 'Üniversite ve Eğitim', description: 'Bölüm, sınav, diploma',
    category: 'Eğitim', color: '#4338ca', icon: '🎓',
    grammarExplain: `📌 EĞİTİM KALIPLARI:
1. "…-de okumak" = учиться в университете / на факультете.
2. "…-i öğrenmek" = изучать + belirtme hâli: изучать русский язык.
3. учить, учиться, изучать ayrımı: ezberlemek / öğrenim görmek / (bir dersi) incelemek.`,
    words: [
      W('p100b1un_1', 'Университет', 'Univirsityét', 'Üniversite', 'B1', 'вуз (yükseköğretim kurumu) kısaltması da yaygındır.'),
      W('p100b1un_2', 'Факультет', 'Fakultyét', 'Fakülte', 'B1', 'на факультете (в değil!).'),
      W('p100b1un_3', 'Экзамен', 'Ekzámin', 'Sınav', 'B1', 'Сдать экзамен = sınavı geçmek; сдавать = sınava girmek.'),
      W('p100b1un_4', 'Зачёт', 'Zaçót', 'Geçme notu / Kredi sınavı', 'B1', 'Rus sisteminde nota dönüşmeyen değerlendirme.'),
      W('p100b1un_5', 'Диплом', 'Diplóm', 'Diploma / Bitirme tezi', 'B1', 'Hem belge hem tez anlamındadır.'),
      W('p100b1un_6', 'Стипендия', 'Stipyéndiya', 'Burs', 'B1', 'Başarıya göre verilir.')
    ],
    sentences: [
      S('Я учусь на историческом факультете.', 'Tarih fakültesinde okuyorum.'),
      S('Завтра я сдаю экзамен.', 'Yarın sınava giriyorum.'),
      S('Он получает стипендию.', 'O burs alıyor.')
    ]
  },
  {
    id: 'p100_b1_travelplan', unitNumber: 95.9618, levelGroup: 'B1',
    title: 'Seyahat Planlama', description: 'Vize, rezervasyon, güzergâh',
    category: 'Günlük Hayat', color: '#0891b2', icon: '✈️',
    grammarExplain: `📌 SEYAHAT KALIPLARI:
1. "…-e gitmek" (ülke): поехать в Россию; ada/dağ için на: на Кипр, на Кавказ.
2. Rezervasyon: забронировать номер (oda ayırtmak).
3. Süre: на неделю (bir haftalığına) ≠ неделю (bir hafta boyunca).`,
    words: [
      W('p100b1tp_1', 'Поездка', 'Payéstka', 'Yolculuk / Gezi', 'B1', 'путешествие daha uzun ve romantik bir yolculuktur.'),
      W('p100b1tp_2', 'Виза', 'Víza', 'Vize', 'B1', 'Оформить визу = vize işlemlerini yapmak.'),
      W('p100b1tp_3', 'Забронировать', 'Zabraníravat', 'Rezervasyon yapmak', 'B1', 'Otel ve restoran için kullanılır.'),
      W('p100b1tp_4', 'Маршрут', 'Marşrút', 'Güzergâh', 'B1', 'маршрутка (dolmuş) bu kelimeden gelir.'),
      W('p100b1tp_5', 'Страховка', 'Strahófka', 'Sigorta', 'B1', 'Seyahat için zorunludur.'),
      W('p100b1tp_6', 'Багаж', 'Bagáj', 'Bagaj', 'B1', 'Ручная кладь = el bagajı.')
    ],
    sentences: [
      S('Я забронировал номер на три ночи.', 'Üç gecelik oda ayırttım.'),
      S('Нужно оформить визу заранее.', 'Vizeyi önceden almak gerekiyor.'),
      S('Наш маршрут проходит через Казань.', 'Güzergâhımız Kazan üzerinden geçiyor.')
    ]
  },
  {
    id: 'p100_b1_nature', unitNumber: 95.9619, levelGroup: 'B1',
    title: 'Doğa ve Çevre', description: 'Tayga, nehirler, ekolojik sorunlar',
    category: 'Toplum', color: '#15803d', icon: '🌲',
    grammarExplain: `📌 SORUN ANLATMA KALIPLARI:
1. Проблема состоит в том, что … (Sorun şu ki …) — resmî yazıda çok kullanılır.
2. влиять на + belirtme = …-i etkilemek.
3. Sonuç: Это приводит к + yönelme (Bu … sonucuna yol açar).`,
    words: [
      W('p100b1na_1', 'Природа', 'Priróda', 'Doğa', 'B1', 'Aynı zamanda "bir şeyin mahiyeti" anlamındadır.'),
      W('p100b1na_2', 'Тайга', 'Taygá', 'Tayga', 'B1', 'Sibirya\'nın iğne yapraklı devasa ormanı.'),
      W('p100b1na_3', 'Окружающая среда', 'Akrujáyuşşaya sridá', 'Çevre', 'B1', 'Resmî çevre terimi.'),
      W('p100b1na_4', 'Загрязнение', 'Zagriznyéniye', 'Kirlilik', 'B1', 'Загрязнение воздуха = hava kirliliği.'),
      W('p100b1na_5', 'Сохранить', 'Sahranít', 'Korumak / Saklamak', 'B1', 'Dosya kaydetmek için de kullanılır.'),
      W('p100b1na_6', 'Заповедник', 'Zapavyédnik', 'Doğa koruma alanı', 'B1', 'Rusya\'nın geniş milli koruma ağı.')
    ],
    sentences: [
      S('Загрязнение воздуха влияет на здоровье.', 'Hava kirliliği sağlığı etkiliyor.'),
      S('Мы должны сохранить природу.', 'Doğayı korumalıyız.'),
      S('Байкал — самое глубокое озеро в мире.', 'Baykal dünyanın en derin gölüdür.')
    ]
  },
  {
    id: 'p100_b1_emotions_deep', unitNumber: 95.962, levelGroup: 'B1',
    title: 'Derin Duygular', description: 'Kırgınlık, gurur, umut',
    category: 'Cümlede Anlam', color: '#9333ea', icon: '💭',
    grammarExplain: `📌 DUYGU FİİLLERİNİN HÂLLERİ:
1. обижаться на + belirtme (birine kırılmak), гордиться + araç (…-le gurur duymak).
2. надеяться на + belirtme (…-e umut bağlamak).
3. Duygunun derecesi: немного обижен < очень обижен < страшно обижен.`,
    words: [
      W('p100b1ed_1', 'Обида', 'Abída', 'Kırgınlık', 'B1', 'Rus kültüründe ayrı ve güçlü bir duygu kategorisidir.'),
      W('p100b1ed_2', 'Гордиться', 'Gardítsa', 'Gurur duymak', 'B1', 'Araç hâli ister: горжусь тобой.'),
      W('p100b1ed_3', 'Надежда', 'Nadyéjda', 'Umut', 'B1', 'Aynı zamanda bir kadın adıdır.'),
      W('p100b1ed_4', 'Тоска', 'Taská', 'Derin hüzün / Sıla hasreti', 'B1', 'Tam çevirisi olmayan kültürel duygu sözcüğüdür.'),
      W('p100b1ed_5', 'Волноваться', 'Valnavátsa', 'Heyecanlanmak / Endişelenmek', 'B1', 'Не волнуйтесь! = Merak etmeyin!'),
      W('p100b1ed_6', 'Сочувствие', 'Saçústviye', 'Anlayış / Başsağlığı', 'B1', 'Мои соболезнования daha resmîdir.')
    ],
    sentences: [
      S('Я горжусь своей семьёй.', 'Ailemle gurur duyuyorum.'),
      S('Не волнуйся, всё будет хорошо.', 'Merak etme, her şey iyi olacak.'),
      S('Он обиделся на моё слово.', 'Sözüme alındı.')
    ]
  }
];
