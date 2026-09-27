// ==========================================================
// EK MÜFREDAT — B2 GENİŞLEME PAKETİ 2/2 (Ünite 96-102)
// Tadilat, yatırım, sigorta ve olgun ilişki konuşmaları.
// ==========================================================
import type { UnitModule } from '../curriculumData';

export const EXTRA_B2B: UnitModule[] = [
  {
    id: 'mod_b2_x8',
    unitNumber: 125,
    levelGroup: 'B2',
    title: 'Tadilat & Ustayla Pazarlık',
    description: 'Keşif/fiyat teklifi, malzeme seçimi ve uzayan tadilat dramı',
    category: 'Emlak & Ev',
    color: '#f97316',
    icon: '🔨',
    grammarExplain: `📌 TADİLAT DİLİ:
1. "Смета" (keşif/maliyet dökümü): "Сколько по смете?" (Keşfe göre ne kadar?) — pazarlığın başlangıç noktası.
2. "Затянуться" (uzamak/sarkmak): "Ремонт затянулся" (Tadilat uzadı) — Rus folklorunda tadilat asla bitmez!
3. "Качественно и недорого" (kaliteli ve ucuza) — her ustanın vaadi; ikisi bir arada nadir bulunur.`,
    words: [
      { id: 'wx96_1', ru: 'Ремонт', reading: 'Rimónt', tr: 'Tadilat', level: 'B2', usageNote: '"Ремонт нельзя закончить, его можно только остановить" diye şaka yapılır.' },
      { id: 'wx96_2', ru: 'Мастер', reading: 'Mástir', tr: 'Usta', level: 'B2', usageNote: '"Вызвать мастера" (usta çağırmak).' },
      { id: 'wx96_3', ru: 'Смета', reading: 'Smyéta', tr: 'Keşif / Maliyet dökümü', level: 'B2', usageNote: 'İş öncesi yazılı istenmelidir!' },
      { id: 'wx96_4', ru: 'Материалы', reading: 'Matiriály', tr: 'Malzemeler', level: 'B2', usageNote: '"Материалы за ваш счёт" (malzeme sizden) denebilir.' },
      { id: 'wx96_5', ru: 'Плитка', reading: 'Plítka', tr: 'Fayans / Karo', level: 'B2', usageNote: 'Banyo tadilatının baş aktörüdür.' },
      { id: 'wx96_6', ru: 'Красить', reading: "Krásit'", tr: 'Boyamak', level: 'B2', usageNote: '"Покрасить стены" (duvarları boyamak).' },
      { id: 'wx96_7', ru: 'Стена', reading: 'Stiná', tr: 'Duvar', level: 'B2', usageNote: '"Ровные стены" (düz duvarlar) lüks sayılır!' },
      { id: 'wx96_8', ru: 'Розетка', reading: 'Razyétka', tr: 'Priz', level: 'B2', usageNote: 'Tadilat sonrası hep yanlış yerdedir.' },
      { id: 'wx96_9', ru: 'Затянуться', reading: 'Zatinútsa', tr: 'Uzamak / Sarkma', level: 'B2', usageNote: '"Ремонт затянулся на месяц" (Tadilat bir ay sarktı).' },
      { id: 'wx96_10', ru: 'Качественно', reading: 'Káçistvinna', tr: 'Kaliteli şekilde', level: 'B2', usageNote: 'Ustanın vaadi, müşterinin duası.' },
      { id: 'wx96_11', ru: 'Аванс', reading: 'Aváns', tr: 'Avans / Kapora', level: 'B2', usageNote: 'Ustaya iş başında verilen ön ödemedir.' },
      { id: 'wx96_12', ru: 'Переделать', reading: "Piridyélat'", tr: 'Yeniden yapmak', level: 'B2', usageNote: '"Придётся переделать" (Yeniden yapmak gerekecek) — korkulu rüya.' }
    ],
    sentences: [
      { ru: 'Ремонт затянулся на целый месяц.', tr: 'Tadilat koca bir ay uzadı.', scrambled: ['на целый', 'Ремонт', 'месяц.', 'затянулся'], correct: ['Ремонт', 'затянулся', 'на целый', 'месяц.'] },
      { ru: 'Сколько это стоит по смете?', tr: 'Bu, keşfe göre ne kadar tutuyor?', scrambled: ['по смете?', 'Сколько', 'стоит', 'это'], correct: ['Сколько', 'это', 'стоит', 'по смете?'] }
    ],
    sceneTitle: '"Bir Haftalık İş" Efsanesi',
    sceneContext: 'Usta "bir haftada biter" demiştir; üçüncü haftada ev sahibi smeta ve prizlerin yerini sorgulamaktadır.',
    dialogue: [
      { speaker: 'Ev sahibi', ru: 'Вы говорили — неделя! Прошёл месяц!', reading: 'Vy gavaríli — nidyélya! Praşól myésits!', tr: 'Bir hafta demiştiniz! Bir ay geçti!' },
      { speaker: 'Usta', ru: 'Материалы задержались. Зато будет качественно!', reading: 'Matiriály zadirjális\'. Zató búdit káçistvinna!', tr: 'Malzemeler gecikti. Ama kaliteli olacak!' },
      { speaker: 'Ev sahibi', ru: 'А почему розетка за шкафом?!', reading: 'A paçimú razyétka za şkáfam?!', tr: 'Peki priz neden dolabın arkasında?!' },
      { speaker: 'Usta', ru: 'Это... дизайнерское решение. Переделаю бесплатно!', reading: 'Éta... dizáynirskaye rişéniye. Piridyélayu bispplátna!', tr: 'Bu... tasarım tercihi. Ücretsiz yeniden yaparım!' }
    ]
  },
  {
    id: 'mod_b2_x9',
    unitNumber: 126,
    levelGroup: 'B2',
    title: 'Yatırım, Borsa & Birikim Sohbeti',
    description: 'Hisse, döviz kuru, portföy ve "her şeyi tek sepete koyma" bilgeliği',
    category: 'Para & Banka',
    color: '#84cc16',
    icon: '📈',
    grammarExplain: `📌 YATIRIM DİLİ:
1. "Акции выросли / упали" (hisseler yükseldi / düştü) — piyasa sohbetinin nabzı; yüzdeyle verilir: "на десять процентов".
2. "Вложиться в + ismin -i hâli" (bir şeye yatırım yapmak): "вложиться в акции" (hisselere girmek).
3. Atasözü mantığı: "Не клади все яйца в одну корзину" (Bütün yumurtaları tek sepete koyma) — çeşitlendirme dersi!`,
    words: [
      { id: 'wx97_1', ru: 'Инвестиции', reading: 'Invistítsii', tr: 'Yatırımlar', level: 'B2', usageNote: 'Hep çoğul kullanılır.' },
      { id: 'wx97_2', ru: 'Акции', reading: 'Áktsii', tr: 'Hisseler', level: 'B2', usageNote: '"Купить акции" (hisse almak) denir.' },
      { id: 'wx97_3', ru: 'Биржа', reading: 'Bírja', tr: 'Borsa', level: 'B2', usageNote: '"Играть на бирже" (borsada oynamak).' },
      { id: 'wx97_4', ru: 'Доход', reading: 'Dahót', tr: 'Gelir / Getiri', level: 'B2', usageNote: '"Пассивный доход" (pasif gelir) modern hayaldir.' },
      { id: 'wx97_5', ru: 'Вклад', reading: 'Fklat', tr: 'Mevduat', level: 'B2', usageNote: 'Bankadaki vadeli hesaptır.' },
      { id: 'wx97_6', ru: 'Риск', reading: 'Risk', tr: 'Risk', level: 'B2', usageNote: '"Высокий доход — высокий риск" kuralı geçerlidir.' },
      { id: 'wx97_7', ru: 'Портфель', reading: "Partfyél'", tr: 'Portföy', level: 'B2', usageNote: 'Hem evrak çantası hem yatırım portföyüdür.' },
      { id: 'wx97_8', ru: 'Валюта', reading: 'Valyúta', tr: 'Döviz', level: 'B2', usageNote: '"Обмен валюты" (döviz bozdurma).' },
      { id: 'wx97_9', ru: 'Курс', reading: 'Kurs', tr: 'Kur', level: 'B2', usageNote: '"Курс доллара" her Rus\'un takip ettiği rakamdır.' },
      { id: 'wx97_10', ru: 'Вырасти', reading: 'Vırasti', tr: 'Yükselmek / Büyümek', level: 'B2', usageNote: 'Zıttı "упасть" (düşmek)tir.' },
      { id: 'wx97_11', ru: 'Диверсификация', reading: 'Divirsifikátsiya', tr: 'Çeşitlendirme', level: 'B2', usageNote: '"Yumurtaları tek sepete koymamak" demektir.' },
      { id: 'wx97_12', ru: 'Брокер', reading: 'Brókir', tr: 'Aracı kurum / Broker', level: 'B2', usageNote: 'Borsa işlemleri aracı kurumdan yapılır.' }
    ],
    sentences: [
      { ru: 'Акции выросли на десять процентов.', tr: 'Hisseler yüzde on yükseldi.', scrambled: ['на десять', 'Акции', 'процентов.', 'выросли'], correct: ['Акции', 'выросли', 'на десять', 'процентов.'] },
      { ru: 'Не вкладывай все деньги в одно.', tr: 'Bütün parayı tek şeye yatırma.', scrambled: ['все деньги', 'Не вкладывай', 'в одно.'], correct: ['Не вкладывай', 'все деньги', 'в одно.'] }
    ],
    sceneTitle: 'Kahve Molasında Borsa Dersi',
    sceneContext: 'Semyon hisse kârıyla övünürken temkinli Nina portföy çeşitlendirme dersi verir.',
    dialogue: [
      { speaker: 'Semyon', ru: 'Мои акции выросли на двадцать процентов!', reading: 'Maí áktsii výrasli na dvátsat\' pratséntaf!', tr: 'Hisselerim yüzde yirmi yükseldi!' },
      { speaker: 'Nina', ru: 'Поздравляю! А если завтра упадут?', reading: 'Pazdravlyáyu! A yésli záftra upadút?', tr: 'Tebrikler! Peki yarın düşerse?' },
      { speaker: 'Semyon', ru: 'Не упадут! Я вложил туда все сбережения.', reading: 'Ni upadút! Ya vlajíl tudá fsye zbirijéniya.', tr: 'Düşmez! Bütün birikimimi oraya yatırdım.' },
      { speaker: 'Nina', ru: 'Семён! Не клади все яйца в одну корзину!', reading: 'Simyón! Ni kladí fsye yáytsa v adnú karzínu!', tr: 'Semyon! Bütün yumurtaları tek sepete koyma!' }
    ]
  },
  {
    id: 'mod_b2_x10',
    unitNumber: 127,
    levelGroup: 'B2',
    title: 'Sigorta Poliçesi & Hasar Talebi',
    description: 'Poliçe kapsamı, hasar bildirimi, eksper ve tazminat süreci',
    category: 'Para & Banka',
    color: '#64748b',
    icon: '🛡️',
    grammarExplain: `📌 SİGORTA DİLİ:
1. "Страховой случай" (sigorta kapsamındaki olay/hasar) — tazminatın ilk şartı olayın "страховой" sayılmasıdır.
2. "Возмещение ущерба" (zararın tazmini): "ущерб" (zarar) + "возместить" (tazmin etmek) resmi ikilidir.
3. "Подать заявку" (başvuru yapmak): hasar bildirimi belgeler ve fotoğraflarla desteklenir.`,
    words: [
      { id: 'wx98_1', ru: 'Страховка', reading: 'Strahófka', tr: 'Sigorta', level: 'B2', usageNote: 'Resmî adı "страхование"dir.' },
      { id: 'wx98_2', ru: 'Полис', reading: 'Pólis', tr: 'Poliçe', level: 'B2', usageNote: '"Страховой полис" tam halidir.' },
      { id: 'wx98_3', ru: 'Страховой случай', reading: 'Strahavóy slúçay', tr: 'Hasar (sigorta olayı)', level: 'B2', usageNote: 'Tazminat bu tanıma bağlıdır.' },
      { id: 'wx98_4', ru: 'Ущерб', reading: 'Uşşérp', tr: 'Zarar / Hasar', level: 'B2', usageNote: '"Оценить ущерб" (zararı belirlemek).' },
      { id: 'wx98_5', ru: 'Возмещение', reading: 'Vazmişşéniye', tr: 'Tazminat', level: 'B2', usageNote: '"Возмещение ущерба" (zarar tazmini).' },
      { id: 'wx98_6', ru: 'Подать заявку', reading: "Padát' zayáfku", tr: 'Başvuru yapmak', level: 'B2', usageNote: 'Online veya şubeden yapılır.' },
      { id: 'wx98_7', ru: 'Эксперт', reading: 'Ekspyért', tr: 'Eksper', level: 'B2', usageNote: 'Hasarı yerinde inceleyen uzmandır.' },
      { id: 'wx98_8', ru: 'Осмотр', reading: 'Asmótr', tr: 'İnceleme / Ekspertiz', level: 'B2', usageNote: '"Назначить осмотр" (inceleme randevusu vermek).' },
      { id: 'wx98_9', ru: 'Выплата', reading: 'Výplata', tr: 'Ödeme (tazminat)', level: 'B2', usageNote: '"Страховая выплата" (sigorta ödemesi).' },
      { id: 'wx98_10', ru: 'Отказ', reading: 'Atkás', tr: 'Ret', level: 'B2', usageNote: '"Получить отказ" (ret almak) — itiraz edilebilir.' },
      { id: 'wx98_11', ru: 'Застраховать', reading: "Zastrahavát'", tr: 'Sigortalamak', level: 'B2', usageNote: '"Застраховать квартиру" (evi sigortalamak).' },
      { id: 'wx98_12', ru: 'Франшиза', reading: 'Franşíza', tr: 'Muafiyet', level: 'B2', usageNote: 'Hasarın sigortalıya kalan kısmıdır.' }
    ],
    sentences: [
      { ru: 'Это страховой случай.', tr: 'Bu, sigorta kapsamında bir hasar.', scrambled: ['страховой', 'Это', 'случай.'], correct: ['Это', 'страховой', 'случай.'] },
      { ru: 'Выплату переведут через неделю.', tr: 'Tazminatı bir hafta içinde yatıracaklar.', scrambled: ['переведут', 'Выплату', 'через неделю.'], correct: ['Выплату', 'переведут', 'через неделю.'] }
    ],
    sceneTitle: 'Üst Komşunun Su Baskını',
    sceneContext: 'Üst kat komşusu daireyi su basmıştır; ev sahibi sigorta hattını arar, eksper randevusu ve tazminat konuşulur.',
    dialogue: [
      { speaker: 'Sigortalı', ru: 'Соседи сверху затопили квартиру! Это страховой случай?', reading: 'Sasyédi svyérhu zatapíli kvartíru! Éta strahavóy slúçay?', tr: 'Üst komşular daireyi su bastı! Bu sigorta kapsamında mı?' },
      { speaker: 'Sigortacı', ru: 'Да. Подайте заявку и сфотографируйте ущерб.', reading: 'Da. Padáyte zayáfku i sfatagrafíruyte uşşérp.', tr: 'Evet. Başvuru yapın ve hasarı fotoğraflayın.' },
      { speaker: 'Sigortalı', ru: 'Когда приедет эксперт на осмотр?', reading: 'Kagdá priyédit ekspyért na asmótr?', tr: 'Eksper incelemeye ne zaman gelecek?' },
      { speaker: 'Sigortacı', ru: 'Завтра. Выплата будет через пять дней после осмотра.', reading: 'Záftra. Výplata búdit çyéris pyat\' dnyey pósle asmótra.', tr: 'Yarın. Ödeme, incelemeden beş gün sonra yapılır.' }
    ]
  },
  {
    id: 'mod_b2_x11',
    unitNumber: 128,
    levelGroup: 'B2',
    title: 'Kıskançlık Konuşması & Güven İnşası',
    description: 'Kıskançlığı sakin dile getirme, açıklama ve barışma sanatı',
    category: 'İlişkiler & Flört',
    color: '#ec4899',
    icon: '💚',
    grammarExplain: `📌 GÜVEN KONUŞMASI DİLİ:
1. "Ревновать кого-то к кому-то" (birini birinden kıskanmak): "Ты ревнуешь меня к коллеге?" (Beni iş arkadaşımdan mı kıskanıyorsun?).
2. "Давай поговорим спокойно" (Sakin sakin konuşalım) — tartışmayı yumuşatan sihirli açılış.
3. "Мне важно, чтобы..." (Benim için önemli ki...) + geçmiş zaman: duyguyu suçlamadan ifade etme kalıbı.`,
    words: [
      { id: 'wx99_1', ru: 'Ревновать', reading: "Rivnavát'", tr: 'Kıskanmak', level: 'B2', usageNote: 'Romantik kıskançlıktır; imrenmek "завидовать"tır.' },
      { id: 'wx99_2', ru: 'Доверие', reading: 'Davyériye', tr: 'Güven', level: 'B2', usageNote: '"Доверие — основа отношений" (Güven ilişkinin temelidir).' },
      { id: 'wx99_3', ru: 'Сомневаться', reading: 'Samnivátsa', tr: 'Şüphe etmek', level: 'B2', usageNote: '"Не сомневайся во мне" (Benden şüphe etme).' },
      { id: 'wx99_4', ru: 'Честно', reading: 'Çyésna', tr: 'Dürüstçe', level: 'B2', usageNote: '"Честно говоря..." (Dürüst olmak gerekirse...).' },
      { id: 'wx99_5', ru: 'Скрывать', reading: "Skrıvát'", tr: 'Saklamak / Gizlemek', level: 'B2', usageNote: '"Мне нечего скрывать" (Saklayacak bir şeyim yok).' },
      { id: 'wx99_6', ru: 'Объяснить', reading: "Ab'yisnít'", tr: 'Açıklamak', level: 'B2', usageNote: '"Дай мне объяснить!" (Açıklamama izin ver!).' },
      { id: 'wx99_7', ru: 'Спокойно', reading: 'Spakóyna', tr: 'Sakince', level: 'B2', usageNote: '"Давай спокойно" (Sakin olalım) gerilimi düşürür.' },
      { id: 'wx99_8', ru: 'Обещать', reading: "Abişşát'", tr: 'Söz vermek', level: 'B2', usageNote: '"Обещаю!" (Söz veriyorum!) denir.' },
      { id: 'wx99_9', ru: 'Поссориться', reading: 'Passóritsa', tr: 'Kavga etmek / Bozuşmak', level: 'B2', usageNote: 'Geçici küslük anlamı taşır.' },
      { id: 'wx99_10', ru: 'Помириться', reading: 'Pamirítsa', tr: 'Barışmak', level: 'B2', usageNote: '"Давай помиримся" (Hadi barışalım).' },
      { id: 'wx99_11', ru: 'Обида', reading: 'Abída', tr: 'Kırgınlık', level: 'B2', usageNote: '"Держать обиду" (kırgınlık beslemek) tavsiye edilmez.' },
      { id: 'wx99_12', ru: 'Искренне', reading: 'Ískrinne', tr: 'İçtenlikle', level: 'B2', usageNote: '"Я искренне сожалею" (İçtenlikle üzgünüm).' }
    ],
    sentences: [
      { ru: 'Я тебе полностью доверяю.', tr: 'Sana tamamen güveniyorum.', scrambled: ['полностью', 'Я тебе', 'доверяю.'], correct: ['Я тебе', 'полностью', 'доверяю.'] },
      { ru: 'Давай поговорим спокойно.', tr: 'Sakin sakin konuşalım.', scrambled: ['спокойно.', 'Давай', 'поговорим'], correct: ['Давай', 'поговорим', 'спокойно.'] }
    ],
    sceneTitle: 'Beğeni Yüzünden Çıkan Fırtına',
    sceneContext: 'Nastya, Dima\'nın eski sınıf arkadaşının fotoğraflarını beğendiğini görmüştür; sakin konuşma sınavı başlar.',
    dialogue: [
      { speaker: 'Nastya', ru: 'Дима, честно скажи — кто эта Марина?', reading: 'Díma, çyésna skají — kto éta Marína?', tr: 'Dima, dürüstçe söyle — bu Marina kim?' },
      { speaker: 'Dima', ru: 'Одноклассница! Мне нечего скрывать, обещаю.', reading: 'Adnaklássnitsa! Mne nyéçiva skrıvát\', abişşáyu.', tr: 'Sınıf arkadaşım! Saklayacak bir şeyim yok, söz.' },
      { speaker: 'Nastya', ru: 'Хорошо... Давай поговорим спокойно. Мне важно доверие.', reading: 'Haraşó... Daváy pagavarím spakóyna. Mne vájna davyériye.', tr: 'Peki... Sakin konuşalım. Benim için güven önemli.' },
      { speaker: 'Dima', ru: 'Я тебя люблю. И только тебя. Помирились?', reading: 'Ya tibyá lyublyú. I tól\'ka tibyá. Pamirílis\'?', tr: 'Seni seviyorum. Ve sadece seni. Barıştık mı?' }
    ]
  },
  {
    id: 'mod_b2_x12',
    unitNumber: 129,
    levelGroup: 'B2',
    title: 'Çift Olarak Bütçe & Para Konuşması',
    description: 'Ortak bütçe, birikim hedefi ve harcama alışkanlığı müzakeresi',
    category: 'İlişkiler & Flört',
    color: '#eab308',
    icon: '💰',
    grammarExplain: `📌 ÇİFT BÜTÇESİ DİLİ:
1. "Копить на + ismin -i hâli" (bir şey için biriktirmek): "Мы копим на квартиру" (Ev için para biriktiriyoruz).
2. "Тратить / потратить" (harcamak): "Ты потратил СКОЛЬКО на кроссовки?!" — çift bütçesinin gerilim cümlesi.
3. "Откладывать каждый месяц" (her ay kenara koymak) — birikimin sürerlilik fiili.`,
    words: [
      { id: 'wx100_1', ru: 'Бюджет', reading: 'Byudjét', tr: 'Bütçe', level: 'B2', usageNote: '"Семейный бюджет" (aile bütçesi) denir.' },
      { id: 'wx100_2', ru: 'Общие деньги', reading: "Óbşşiye dyén'gi", tr: 'Ortak para', level: 'B2', usageNote: 'Ortak hesap "общий счёт"tur.' },
      { id: 'wx100_3', ru: 'Тратить', reading: "Trátit'", tr: 'Harcamak', level: 'B2', usageNote: '"Тратить деньги на ерунду" (saçmalığa para harcamak).' },
      { id: 'wx100_4', ru: 'Копить', reading: "Kapít'", tr: 'Biriktirmek', level: 'B2', usageNote: '"Копить на мечту" (hayal için biriktirmek).' },
      { id: 'wx100_5', ru: 'Экономить', reading: "Ekanómit'", tr: 'Tasarruf etmek', level: 'B2', usageNote: '"Экономить на кофе" (kahveden kısmak).' },
      { id: 'wx100_6', ru: 'Расходы', reading: 'Rashódy', tr: 'Harcamalar', level: 'B2', usageNote: '"Записывать расходы" (harcamaları not etmek).' },
      { id: 'wx100_7', ru: 'Мечта', reading: 'Miçtá', tr: 'Hayal', level: 'B2', usageNote: '"Наша общая мечта" (ortak hayalimiz).' },
      { id: 'wx100_8', ru: 'Откладывать', reading: "Atkládıvat'", tr: 'Kenara koymak', level: 'B2', usageNote: 'Her ay düzenli birikim fiilidir.' },
      { id: 'wx100_9', ru: 'Крупная покупка', reading: 'Krúpnaya pakúpka', tr: 'Büyük alışveriş', level: 'B2', usageNote: 'Ev, araba gibi büyük harcamalar.' },
      { id: 'wx100_10', ru: 'Планировать', reading: "Planíravat'", tr: 'Planlamak', level: 'B2', usageNote: '"Планировать бюджет вместе" önerilir.' },
      { id: 'wx100_11', ru: 'Зарабатывать', reading: "Zarabátıvat'", tr: 'Para kazanmak', level: 'B2', usageNote: '"Хорошо зарабатывать" (iyi kazanmak).' },
      { id: 'wx100_12', ru: 'Импульсивная покупка', reading: 'Impul\'sívnaya pakúpka', tr: 'Anlık alışveriş', level: 'B2', usageNote: 'Bütçe planının baş düşmanıdır.' }
    ],
    sentences: [
      { ru: 'Мы копим на свою квартиру.', tr: 'Kendi evimiz için biriktiriyoruz.', scrambled: ['на свою', 'Мы копим', 'квартиру.'], correct: ['Мы копим', 'на свою', 'квартиру.'] },
      { ru: 'Давай планировать бюджет вместе.', tr: 'Bütçeyi birlikte planlayalım.', scrambled: ['бюджет', 'Давай', 'вместе.', 'планировать'], correct: ['Давай', 'планировать', 'бюджет', 'вместе.'] }
    ],
    sceneTitle: 'Sneaker Kutusu vs. Ev Hayali',
    sceneContext: 'Ev için biriktiren çiftin bütçe toplantısı; masada bir sneaker kutusu ve bir hesap tablosu vardır.',
    dialogue: [
      { speaker: 'Nastya', ru: 'Дима... что это за коробка? Новые кроссовки?!', reading: 'Díma... şto éta za karópka? Nóvıye krassófki?!', tr: 'Dima... bu kutu ne? Yeni spor ayakkabı mı?!' },
      { speaker: 'Dima', ru: 'Это была импульсивная покупка... со скидкой!', reading: 'Éta bılá impul\'sívnaya pakúpka... sa skítkay!', tr: 'Anlık bir alışverişti... indirimliydi!' },
      { speaker: 'Nastya', ru: 'Мы же копим на квартиру! Давай планировать вместе.', reading: 'My je kópim na kvartíru! Daváy planíravat\' vmyéste.', tr: 'Ev için biriktiriyoruz ya! Hadi birlikte planlayalım.' },
      { speaker: 'Dima', ru: 'Ты права. С этого месяца откладываем больше.', reading: 'Ty pravá. S étava myésitsa atkládıvayem ból\'şe.', tr: 'Haklısın. Bu aydan itibaren daha çok kenara koyuyoruz.' }
    ]
  },
  {
    id: 'mod_b2_x13',
    unitNumber: 130,
    levelGroup: 'B2',
    title: 'Ailelerle Tanışma Yemeği',
    description: 'Anne-babayla tanışma, hediye seçimi ve sofra diplomasisi',
    category: 'İlişkiler & Flört',
    color: '#f43f5e',
    icon: '🍽️',
    grammarExplain: `📌 AİLE TANIŞMASI DİLİ:
1. "Познакомиться с родителями" (ebeveynlerle tanışmak) — ilişkinin resmî "seviye atlama" anıdır.
2. Akrabalık hazinesi: "тёща" (erkeğin kayınvalidesi), "свекровь" (kadının kayınvalidesi) — Rusçada ayrı kelimelerdir!
3. "Произвести хорошее впечатление" (iyi izlenim bırakmak) — akşamın gizli sınav sorusudur.`,
    words: [
      { id: 'wx101_1', ru: 'Познакомиться с родителями', reading: 'Paznakómitsa s radítilyami', tr: 'Ailesiyle tanışmak', level: 'B2', usageNote: 'İlişkide ciddi bir adımdır.' },
      { id: 'wx101_2', ru: 'Тёща', reading: 'Tyóşşa', tr: 'Kayınvalide (erkek için)', level: 'B2', usageNote: 'Rus fıkralarının baş kahramanıdır!' },
      { id: 'wx101_3', ru: 'Свекровь', reading: "Svikróf'", tr: 'Kayınvalide (kadın için)', level: 'B2', usageNote: 'Kocanın annesidir.' },
      { id: 'wx101_4', ru: 'Произвести впечатление', reading: 'Praizvistí fpiçitlyéniye', tr: 'İzlenim bırakmak', level: 'B2', usageNote: '"Хорошее впечатление" hedeftir.' },
      { id: 'wx101_5', ru: 'Вежливый', reading: 'Vyéjlivıy', tr: 'Kibar', level: 'B2', usageNote: 'İlk tanışmanın anahtar sıfatıdır.' },
      { id: 'wx101_6', ru: 'Подарок', reading: 'Padárak', tr: 'Hediye', level: 'B2', usageNote: 'Eve eli boş gidilmez; çiçek + pasta klasiktir.' },
      { id: 'wx101_7', ru: 'Тост', reading: 'Tost', tr: 'Kadeh konuşması', level: 'B2', usageNote: 'Rus sofrasında tost söylemek sanattır.' },
      { id: 'wx101_8', ru: 'Неловко', reading: 'Nilófka', tr: 'Tuhaf / Utandırıcı', level: 'B2', usageNote: '"Было неловко" (Utandırıcıydı) denir.' },
      { id: 'wx101_9', ru: 'Одобрить', reading: "Adóbrit'", tr: 'Onaylamak', level: 'B2', usageNote: '"Родители одобрили выбор" (Aile seçimi onayladı).' },
      { id: 'wx101_10', ru: 'Семейный ужин', reading: 'Simyéynıy újın', tr: 'Aile yemeği', level: 'B2', usageNote: 'Tanışmanın klasik sahnesidir.' },
      { id: 'wx101_11', ru: 'Угощение', reading: 'Ugaşşéniye', tr: 'İkram', level: 'B2', usageNote: 'Tabak boşaldıkça dolar — hazır olun!' },
      { id: 'wx101_12', ru: 'Добро пожаловать в семью', reading: "Dabró pajálavat' f sim'yú", tr: 'Aileye hoş geldin', level: 'B2', usageNote: 'Akşamın en mutlu final cümlesidir.' }
    ],
    sentences: [
      { ru: 'Мама, это мой парень Дима.', tr: 'Anne, bu erkek arkadaşım Dima.', scrambled: ['мой парень', 'Мама, это', 'Дима.'], correct: ['Мама, это', 'мой парень', 'Дима.'] },
      { ru: 'Он произвёл хорошее впечатление.', tr: 'O iyi bir izlenim bıraktı.', scrambled: ['хорошее', 'Он произвёл', 'впечатление.'], correct: ['Он произвёл', 'хорошее', 'впечатление.'] }
    ],
    sceneTitle: 'Kayınvalide Böreği Sınavı',
    sceneContext: 'Dima, Nastya\'nın ailesiyle ilk kez yemekte: elinde çiçek, aklında ezberlenmiş tost, karşısında sınav yapan anne.',
    dialogue: [
      { speaker: 'Nastya', ru: 'Мама, папа — это Дима. Дима, не волнуйся.', reading: 'Máma, pápa — éta Díma. Díma, ni valnúysya.', tr: 'Anne, baba — bu Dima. Dima, heyecanlanma.' },
      { speaker: 'Dima', ru: 'Здравствуйте! Это вам цветы и торт.', reading: 'Zdrástvuyte! Éta vam tsvitý i tort.', tr: 'Merhaba! Bunlar size — çiçek ve pasta.' },
      { speaker: 'Anne', ru: 'Какой вежливый! Садись, попробуй мои пирожки.', reading: 'Kakóy vyéjlivıy! Sadís\', papróbuy maí pirajkí.', tr: 'Ne kadar kibar! Otur, böreklerimi tat.' },
      { speaker: 'Baba', ru: 'Ну, Дима... добро пожаловать в семью!', reading: 'Nu, Díma... dabró pajálavat\' f sim\'yú!', tr: 'Ee Dima... aileye hoş geldin!' }
    ]
  },
  {
    id: 'mod_b2_x14',
    unitNumber: 131,
    levelGroup: 'B2',
    title: 'İş & İlişki Dengesi Tartışması',
    description: '"Hep çalışıyorsun!" sitemi, zaman ayırma ve uzlaşma konuşması',
    category: 'İlişkiler & Flört',
    color: '#8b5cf6',
    icon: '⚖️',
    grammarExplain: `📌 DENGE KONUŞMASI DİLİ:
1. "Уделять время кому-то" (birine zaman ayırmak) yönelme hâli ister: "уделять время семье" (aileye zaman ayırmak).
2. "Ты всё время + fiil" (Sen sürekli ...yorsun) — sitem kalıbı; cevabında "Я стараюсь..." (Çabalıyorum...) gelir.
3. "Найти компромисс" (orta yol bulmak) — tartışmanın olgun finali: "Давай найдём компромисс".`,
    words: [
      { id: 'wx102_1', ru: 'Баланс', reading: 'Baláns', tr: 'Denge', level: 'B2', usageNote: '"Баланс между работой и жизнью" (iş-yaşam dengesi).' },
      { id: 'wx102_2', ru: 'Уделять время', reading: "Udilyát' vryémya", tr: 'Zaman ayırmak', level: 'B2', usageNote: 'Yönelme hâliyle kullanılır.' },
      { id: 'wx102_3', ru: 'Уставать', reading: "Ustavát'", tr: 'Yorulmak', level: 'B2', usageNote: '"Я очень устаю на работе" (İşte çok yoruluyorum).' },
      { id: 'wx102_4', ru: 'Жаловаться', reading: "Jálavatsa", tr: 'Şikâyet etmek', level: 'B2', usageNote: '"Я не жалуюсь, но..." diye başlar cümleler.' },
      { id: 'wx102_5', ru: 'Договориться', reading: 'Dagavarítsa', tr: 'Anlaşmak', level: 'B2', usageNote: 'Tartışmanın hedefidir.' },
      { id: 'wx102_6', ru: 'Выходной', reading: 'Vıhadnóy', tr: 'Tatil günü / İzin günü', level: 'B2', usageNote: '"Проведём выходной вместе" (İzin gününü birlikte geçirelim).' },
      { id: 'wx102_7', ru: 'Внимание', reading: 'Vnimániye', tr: 'İlgi / Dikkat', level: 'B2', usageNote: '"Мне не хватает внимания" (İlgi eksikliği çekiyorum).' },
      { id: 'wx102_8', ru: 'Важно', reading: 'Vájna', tr: 'Önemli', level: 'B2', usageNote: '"Для меня это важно" (Bu benim için önemli).' },
      { id: 'wx102_9', ru: 'Поддерживать', reading: "Paddyérjıvat'", tr: 'Desteklemek', level: 'B2', usageNote: '"Я тебя поддерживаю" (Seni destekliyorum).' },
      { id: 'wx102_10', ru: 'Компромисс', reading: 'Kampramíss', tr: 'Uzlaşma / Orta yol', level: 'B2', usageNote: '"Найти компромисс" olgun ilişki hedefi.' },
      { id: 'wx102_11', ru: 'Обсудить проблему', reading: "Absudít' prablyému", tr: 'Sorunu konuşmak', level: 'B2', usageNote: 'Susmak yerine önerilen yoldur.' },
      { id: 'wx102_12', ru: 'Проводить время вместе', reading: "Pravadít' vryémya vmyéste", tr: 'Birlikte vakit geçirmek', level: 'B2', usageNote: 'İlişkinin yakıtıdır.' }
    ],
    sentences: [
      { ru: 'Ты всё время на работе!', tr: 'Sen sürekli iştesin!', scrambled: ['на работе!', 'Ты', 'всё время'], correct: ['Ты', 'всё время', 'на работе!'] },
      { ru: 'Давай найдём компромисс.', tr: 'Hadi bir orta yol bulalım.', scrambled: ['компромисс.', 'Давай', 'найдём'], correct: ['Давай', 'найдём', 'компромисс.'] }
    ],
    sceneTitle: 'Saat 22:00, Laptop Hâlâ Açık',
    sceneContext: 'Dima üçüncü akşam üst üste fazla mesai yapmaktadır; Nastya konuşmayı başlatır, çift takvimde "bize" günü açar.',
    dialogue: [
      { speaker: 'Nastya', ru: 'Дима, ты всё время работаешь. Мне не хватает внимания.', reading: 'Díma, ty fsyo vryémya rabótaiş\'. Mne ni hvatáit vnimániya.', tr: 'Dima, sürekli çalışıyorsun. İlgini özlüyorum.' },
      { speaker: 'Dima', ru: 'Прости... Большой проект. Но ты права.', reading: 'Prastí... Bal\'şóy prayékt. No ty pravá.', tr: 'Affet... Büyük proje var. Ama haklısın.' },
      { speaker: 'Nastya', ru: 'Давай договоримся: суббота — наш день. Без работы!', reading: 'Daváy dagavarímsa: subbóta — naş dyen\'. Bis rabóty!', tr: 'Anlaşalım: cumartesi bizim günümüz. İş yok!' },
      { speaker: 'Dima', ru: 'Компромисс принят. Телефон выключаю!', reading: 'Kampramíss prínyat. Tilifón vıklyucháyu!', tr: 'Uzlaşma kabul edildi. Telefonu kapatıyorum!' }
    ]
  }
];
