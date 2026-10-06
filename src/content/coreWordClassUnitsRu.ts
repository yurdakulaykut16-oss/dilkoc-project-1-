import type { UnitModule, WordDetail } from '../curriculumData';

type Level = UnitModule['levelGroup'];
type Word = readonly [target: string, reading: string, turkish: string, note: string];
type Sentence = readonly [target: string, turkish: string];

type Spec = {
  id: string;
  unitNumber: number;
  level: Level;
  title: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  explanation: string;
  words: readonly Word[];
  sentences: readonly Sentence[];
};

function scramble(parts: string[]): string[] {
  if (parts.length < 2) return [...parts];
  return [...parts.slice(1), parts[0]];
}

function makeUnit(spec: Spec): UnitModule {
  const words: WordDetail[] = spec.words.map(([ru, reading, tr, usageNote], index) => ({
    id: `${spec.id}_w${index + 1}`,
    ru,
    reading,
    tr,
    level: spec.level,
    usageNote,
  }));
  return {
    id: spec.id,
    unitNumber: spec.unitNumber,
    levelGroup: spec.level,
    title: spec.title,
    description: spec.description,
    category: spec.category,
    color: spec.color,
    icon: spec.icon,
    grammarExplain: spec.explanation,
    words,
    sentences: spec.sentences.map(([ru, tr]) => {
      const correct = ru.split(' ').filter(Boolean);
      return { ru, tr, correct, scrambled: scramble(correct) };
    }),
  };
}

const SPECS: readonly Spec[] = [
  {
    id: 'ru_core_verbs_a1', unitNumber: 10.981, level: 'A1',
    title: 'Temel Fiiller I', description: 'Günlük cümle kurduran en temel Rusça fiiller',
    category: 'Fiiller', color: '#10b981', icon: '🏃',
    explanation: `📌 RUSÇADA TEMEL FİİL:
1. Sözlük biçimi çoğunlukla -ть ile biter: читать (okumak), знать (bilmek).
2. Fiil özneye göre çekilir: я читаю / ты читаешь / он читает.
3. Şimdiki zamanda kişi zamiri atılabilir; fakat başlangıçta özneyle birlikte öğrenmek daha güvenlidir.`,
    words: [
      ['Быть', 'Bıt', 'Olmak', 'Şimdiki zamanda çoğunlukla söylenmez: Я дома.'],
      ['Иметь', 'İmyét', 'Sahip olmak', 'Günlük sahiplikte çoğu kez у меня есть kalıbı daha doğaldır.'],
      ['Делать', 'Dyélat', 'Yapmak', 'Что ты делаешь? = Ne yapıyorsun?'],
      ['Идти', 'İdtí', 'Gitmek / yürüyerek gitmek', 'Şu anda tek yönde yaya hareketi anlatır.'],
      ['Жить', 'Jıt', 'Yaşamak / ikamet etmek', 'Я живу в Анкаре. kalıbında в kullanılır.'],
      ['Работать', 'Rabótat', 'Çalışmak', 'Bir yerde çalışmak: работать в банке.'],
      ['Учиться', 'Uçítsa', 'Öğrenim görmek', 'Okul/üniversite için; genel öğrenmek = учить/изучать.'],
      ['Говорить', 'Gavarít', 'Konuşmak / söylemek', 'Bir dil konuşmak: говорить по-русски.'],
      ['Знать', 'Znat', 'Bilmek / tanımak', 'Bilgi ve kişi için kullanılır.'],
      ['Хотеть', 'Hatyét', 'İstemek', 'Düzensizdir: я хочу, ты хочешь.'],
    ],
    sentences: [
      ['Я живу в Стамбуле.', 'İstanbul’da yaşıyorum.'],
      ['Мы работаем вместе.', 'Birlikte çalışıyoruz.'],
      ['Она говорит по-русски.', 'O Rusça konuşuyor.'],
      ['Я хочу чай.', 'Çay istiyorum.'],
    ],
  },
  {
    id: 'ru_core_prepositions_a1', unitNumber: 10.982, level: 'A1',
    title: 'Temel Edatlar', description: 'Yer, yön, birliktelik ve kaynak bildiren temel edatlar',
    category: 'Edatlar', color: '#0ea5e9', icon: '🧭',
    explanation: `📌 EDATI HÂLİYLE BİRLİKTE ÖĞREN:
1. в / на + bulunma hâli “nerede?”, + belirtme hâli “nereye?” sorusunu yanıtlar.
2. из / с “-den/-dan”, к “-e doğru”, у “yanında/sahibinde” anlamı kurar.
3. Rusçada edat, ardından gelen ismin sonunu değiştirir; yalnız edatı ezberlemek yetmez.`,
    words: [
      ['В', 'V', 'İçinde / -de; içine / -e', 'в школе = okulda; в школу = okula.'],
      ['На', 'Na', 'Üstünde / -de; üzerine / -e', 'на столе = masada; на стол = masaya.'],
      ['Из', 'İz', 'İçinden / -den', 'из дома = evden; tamlayan hâl ister.'],
      ['С', 'S', 'İle; üzerinden / -den', 'с другом = arkadaşla; со стола = masadan.'],
      ['К', 'K', '-e doğru / yanına', 'к врачу = doktora; yönelme hâli ister.'],
      ['У', 'U', 'Yanında; ...-nın', 'у окна = pencerenin yanında; у меня = bende.'],
      ['О', 'A', 'Hakkında', 'о книге = kitap hakkında; bulunma hâli ister.'],
      ['Для', 'Dlya', 'İçin', 'для тебя = senin için; tamlayan hâl ister.'],
      ['Без', 'Byez', '-siz / olmadan', 'без сахара = şekersiz; tamlayan hâl ister.'],
      ['До', 'Da', '-e kadar', 'до вечера = akşama kadar.'],
    ],
    sentences: [
      ['Книга на столе.', 'Kitap masanın üstünde.'],
      ['Я иду к врачу.', 'Doktora gidiyorum.'],
      ['Кофе без сахара, пожалуйста.', 'Kahve şekersiz olsun, lütfen.'],
      ['Мы говорим о работе.', 'İş hakkında konuşuyoruz.'],
    ],
  },
  {
    id: 'ru_core_adjectives_a1', unitNumber: 10.983, level: 'A1',
    title: 'Temel Sıfatlar', description: 'İnsanları, nesneleri ve günlük durumları basitçe tarif et',
    category: 'Sıfatlar', color: '#f97316', icon: '🎨',
    explanation: `📌 SIFAT–İSİM UYUMU:
1. Sıfat ismin cinsine ve sayısına uyar: новый дом, новая книга, новое окно, новые дома.
2. Sözlükte genellikle eril biçim (-ый/-ий/-ой) verilir.
3. Kısa yüklem biçimleri de vardır: Он готов. / Она готова.`,
    words: [
      ['Хороший', 'Haróşiy', 'İyi', 'Dişil хороший değil хорошая olur.'],
      ['Плохой', 'Plahóy', 'Kötü', 'Zarfı плохо: Мне плохо.'],
      ['Большой', 'Balşóy', 'Büyük', 'Vurgu sondadır; dişili большая.'],
      ['Маленький', 'Málinkiy', 'Küçük', 'İnsan ve eşya için kullanılabilir.'],
      ['Новый', 'Nóvıy', 'Yeni', 'Karşıtı старый.'],
      ['Старый', 'Stárıy', 'Eski / yaşlı', 'Eşya için eski, kişi için yaşlı anlamına gelir.'],
      ['Красивый', 'Krasívıy', 'Güzel / yakışıklı', 'Kişi, yer ve nesne için kullanılır.'],
      ['Важный', 'Vájnıy', 'Önemli', 'важная встреча = önemli toplantı.'],
      ['Горячий', 'Garyáçiy', 'Sıcak', 'Yiyecek/içecek için; hava için жаркий.'],
      ['Холодный', 'Halódnıy', 'Soğuk', 'холодная вода = soğuk su.'],
    ],
    sentences: [
      ['Это новый телефон.', 'Bu yeni bir telefon.'],
      ['У нас маленькая квартира.', 'Küçük bir dairemiz var.'],
      ['Сегодня важный день.', 'Bugün önemli bir gün.'],
      ['Чай очень горячий.', 'Çay çok sıcak.'],
    ],
  },
  {
    id: 'ru_core_verbs_a2', unitNumber: 20.981, level: 'A2',
    title: 'Temel Fiiller II', description: 'Günlük işleri, hareketi ve iletişimi daha ayrıntılı anlat',
    category: 'Fiiller', color: '#14b8a6', icon: '⚙️',
    explanation: `📌 FİİL GÖRÜNÜŞÜNE GİRİŞ:
1. Rusçada çoğu fiil süreç/tekrar (несовершенный вид) ve tamamlanmış sonuç (совершенный вид) çiftiyle öğrenilir.
2. читать → прочитать, покупать → купить gibi çiftler aynı eyleme farklı açıdan bakar.
3. Tamamlanmış fiilin gerçek şimdiki zamanı yoktur; çekimli biçimi gelecek anlamı taşır.`,
    words: [
      ['Понимать', 'Panimát', 'Anlamak', 'Sonuç odaklı çifti понять.'],
      ['Смотреть', 'Smotrét', 'Bakmak / izlemek', 'Film izlemek için смотреть фильм.'],
      ['Слушать', 'Slúşat', 'Dinlemek', 'Kişiyi de doğrudan belirtme hâliyle alır.'],
      ['Брать', 'Brat', 'Almak', 'Tamamlanmış çifti взять.'],
      ['Давать', 'Davát', 'Vermek', 'Tamamlanmış çifti дать.'],
      ['Покупать', 'Pakupát', 'Satın almak', 'Tek sonuç için купить.'],
      ['Ждать', 'Jdat', 'Beklemek', 'Birini beklemek belirtme/tamlayan biçimi alabilir.'],
      ['Помогать', 'Pamagát', 'Yardım etmek', 'Kime? yönelme hâli: помогать другу.'],
      ['Начинать', 'Naçinát', 'Başlamak', 'Tamamlanmış çifti начать.'],
      ['Заканчивать', 'Zakánçivat', 'Bitirmek', 'Tamamlanmış çifti закончить.'],
    ],
    sentences: [
      ['Я понимаю этот вопрос.', 'Bu soruyu anlıyorum.'],
      ['Она помогает брату.', 'O, erkek kardeşine yardım ediyor.'],
      ['Мы начинаем урок.', 'Derse başlıyoruz.'],
      ['Подожди меня здесь.', 'Beni burada bekle.'],
    ],
  },
  {
    id: 'ru_core_verb_patterns_b1', unitNumber: 110.981, level: 'B1',
    title: 'Fiil Kalıpları', description: 'Görünüş çiftleri ve fiilden sonra gelen hâllerle doğal cümle kur',
    category: 'Fiiller', color: '#f59e0b', icon: '🔗',
    explanation: `📌 FİİLİ YÖNETTİĞİ YAPIYLA ÖĞREN:
1. интересоваться + araç hâli, зависеть + от + tamlayan, привыкать + к + yönelme.
2. продолжать / начать + mastar ile ikinci eylem kurulur.
3. Süreç ve sonuç ayrımı anlatının zaman çizgisini değiştirir: решать / решить.`,
    words: [
      ['Решать / решить', 'Rişát / rişít', 'Çözmek / karar vermek', 'İlki süreç, ikincisi tamamlanmış sonuçtur.'],
      ['Продолжать', 'Pradalját', 'Devam etmek', 'Ardından mastar gelir: продолжать работать.'],
      ['Стараться', 'Starátşa', 'Çabalamak', 'стараться + mastar: yapmaya çalışmak.'],
      ['Привыкать к', 'Privıkát k', '...-e alışmak', 'к sonrası yönelme hâli gelir.'],
      ['Зависеть от', 'Zavísit at', '...-e bağlı olmak', 'от sonrası tamlayan hâl gelir.'],
      ['Интересоваться', 'İntirisavátşa', 'İlgilenmek', 'Konu araç hâlindedir: музыкой.'],
      ['Избегать', 'İzbigát', 'Kaçınmak', 'Ardından tamlayan hâl gelir.'],
      ['Успевать', 'Uspivát', 'Yetişmek / zaman bulmak', 'успеть sonucu vurgular.'],
      ['Предлагать', 'Pridlágat', 'Önermek / teklif etmek', 'Birine teklif: предлагать кому.'],
      ['Отказываться от', 'Atkázıvatşa at', '...-den vazgeçmek / reddetmek', 'от + tamlayan hâl.'],
    ],
    sentences: [
      ['Я стараюсь говорить медленнее.', 'Daha yavaş konuşmaya çalışıyorum.'],
      ['Результат зависит от опыта.', 'Sonuç deneyime bağlıdır.'],
      ['Она интересуется искусством.', 'O sanatla ilgileniyor.'],
      ['Мы привыкли к новой системе.', 'Yeni sisteme alıştık.'],
    ],
  },
  {
    id: 'ru_core_prepositional_phrases_b1', unitNumber: 110.982, level: 'B1',
    title: 'Temel Edat Öbekleri', description: 'Tek bir bütün gibi kullanılan yaygın Rusça edat öbekleri',
    category: 'Edat Öbekleri', color: '#3b82f6', icon: '🧩',
    explanation: `📌 “PREPOSITIONAL PHRASES” = EDAT ÖBEKLERİ:
1. Başlık Türkçede “Edat Öbekleri”dir: edat + isim/zamir birlikte tek anlam birimi kurar.
2. из-за olumsuz ya da nötr sebep, благодаря olumlu/istenen sebep eğilimindedir.
3. Öbeği istediği hâlle birlikte ezberle: в течение + tamlayan, по сравнению с + araç.`,
    words: [
      ['В течение', 'F tiçyéniye', 'Boyunca / süresince', 'Ardından tamlayan hâl: в течение дня.'],
      ['Вместо', 'Vmyésta', 'Yerine', 'Ardından tamlayan hâl gelir.'],
      ['Из-за', 'İz-zá', 'Yüzünden / arkasından', 'Sebep anlamında tamlayan hâl ister.'],
      ['Благодаря', 'Blagadaryá', 'Sayesinde', 'Ardından yönelme hâli gelir.'],
      ['По поводу', 'Pa póvadu', 'Hakkında / nedeniyle', 'Tamlayan hâl: по поводу встречи.'],
      ['В отличие от', 'V atlíçiye at', '...-den farklı olarak', 'от + tamlayan hâl.'],
      ['В связи с', 'F svyazí s', '... ile bağlantılı olarak', 'с + araç hâli; resmî dilde yaygındır.'],
      ['По сравнению с', 'Pa sravnyéniyu s', '... ile karşılaştırıldığında', 'с + araç hâli.'],
      ['С помощью', 'S pómaşşyu', 'Yardımıyla', 'Tamlayan hâl: с помощью приложения.'],
      ['Несмотря на', 'Nismatryá na', '...-e rağmen', 'на + belirtme hâli.'],
    ],
    sentences: [
      ['В течение недели я работал дома.', 'Hafta boyunca evde çalıştım.'],
      ['Из-за дождя матч отменили.', 'Yağmur yüzünden maç iptal edildi.'],
      ['Благодаря тебе мы успели.', 'Senin sayende yetiştik.'],
      ['Несмотря на усталость, она продолжила.', 'Yorgunluğa rağmen devam etti.'],
    ],
  },
  {
    id: 'ru_core_useful_adjectives_b2', unitNumber: 140.981, level: 'B2',
    title: 'Kullanışlı Sıfatlar', description: 'Görüş, değerlendirme ve gündelik ayrıntılar için güçlü sıfatlar',
    category: 'Sıfatlar', color: '#f43f5e', icon: '🛠️',
    explanation: `📌 SIFATI EŞDİZİMİYLE ÖĞREN:
1. Sıfatı tek başına değil doğal ismiyle öğren: надёжный источник, разумное решение.
2. Bazı sıfatlar sabit edat ister: довольный чем, похожий на кого/что.
3. Kısa biçim yüklem olur: источник надёжен, решение разумно.`,
    words: [
      ['Надёжный', 'Nadyójnıy', 'Güvenilir', 'надёжный источник / партнёр.'],
      ['Удобный', 'Udóbnıy', 'Rahat / kullanışlı', 'удобное приложение / кресло.'],
      ['Разумный', 'Razúmnıy', 'Makul / akıllıca', 'разумное решение = makul karar.'],
      ['Доступный', 'Dastúpnıy', 'Erişilebilir / uygun fiyatlı', 'Bağlama göre iki anlamı vardır.'],
      ['Подходящий', 'Padhadyáşşiy', 'Uygun', 'подходящее время = uygun zaman.'],
      ['Полезный', 'Paléznıy', 'Yararlı', 'полезный совет = yararlı tavsiye.'],
      ['Вредный', 'Vryédnıy', 'Zararlı', 'вредная привычка = zararlı alışkanlık.'],
      ['Похожий на', 'Pahójiy na', '...-e benzeyen', 'на + belirtme hâli ister.'],
      ['Довольный', 'Davólnıy', 'Memnun', 'Araç hâliyle: довольный результатом.'],
      ['Уверенный', 'Uvyérinnıy', 'Emin / özgüvenli', 'уверен в + bulunma hâli.'],
    ],
    sentences: [
      ['Это надёжный источник информации.', 'Bu güvenilir bir bilgi kaynağı.'],
      ['Нам нужно разумное решение.', 'Makul bir karara ihtiyacımız var.'],
      ['Я доволен результатом.', 'Sonuçtan memnunum.'],
      ['Вы уверены в своём выборе?', 'Seçiminizden emin misiniz?'],
    ],
  },
  {
    id: 'ru_core_nuanced_verbs_c1', unitNumber: 170.981, level: 'C1',
    title: 'İnce Anlamlı Fiiller', description: 'Akademik, profesyonel ve tartışma dilinde kesin fiil seçimi',
    category: 'Fiiller', color: '#8b5cf6', icon: '🎯',
    explanation: `📌 C1’DE FİİL SEÇİMİ:
1. “Söylemek/yapmak” gibi genel fiiller yerine amacı net fiil seçilir: утверждать, опровергать, обосновывать.
2. Fiilin görünüşü ile yönetimi birlikte korunur: учитывать/учесть что; ссылаться на что.
3. Resmî metinlerde isim-fiil eşdizimleri önemlidir: обосновать вывод, опровергнуть гипотезу.`,
    words: [
      ['Утверждать', 'Utvirjdát', 'İleri sürmek / iddia etmek', 'Kanıtlanmış gerçek anlamındaki “onaylamak” ile karıştırma.'],
      ['Предполагать', 'Pridpalagát', 'Varsaymak / öngörmek', 'что yan cümlesiyle sık kullanılır.'],
      ['Обосновывать', 'Abasnóvıvat', 'Gerekçelendirmek', 'обосновать решение = kararı gerekçelendirmek.'],
      ['Опровергать', 'Apravirgát', 'Çürütmek / yanlışlamak', 'опровергнуть миф = miti çürütmek.'],
      ['Учитывать', 'Uçítıvat', 'Hesaba katmak', 'учитывать обстоятельства.'],
      ['Подразумевать', 'Padrazumivát', 'İma etmek / kastetmek', 'Söylenmeyen anlamı içerir.'],
      ['Способствовать', 'Spasópstvavat', 'Katkıda bulunmak', 'Yönelme hâli: способствовать развитию.'],
      ['Препятствовать', 'Pripyátstvavat', 'Engel olmak', 'Yönelme hâli: препятствовать работе.'],
      ['Ссылаться на', 'Ssılátşa na', '...-e atıfta bulunmak', 'на + belirtme hâli.'],
      ['Разграничивать', 'Razgraníçivat', 'Birbirinden ayırmak', 'Yakın kavramların sınırını çizer.'],
    ],
    sentences: [
      ['Автор ссылается на новые данные.', 'Yazar yeni verilere atıfta bulunuyor.'],
      ['Следует учитывать все обстоятельства.', 'Tüm koşullar hesaba katılmalıdır.'],
      ['Эксперимент опроверг эту гипотезу.', 'Deney bu hipotezi çürüttü.'],
      ['Эти меры способствуют развитию региона.', 'Bu önlemler bölgenin gelişimine katkı sağlıyor.'],
    ],
  },
  {
    id: 'ru_core_prepositional_phrases_c1', unitNumber: 170.982, level: 'C1',
    title: 'İleri Edat Öbekleri', description: 'Resmî, akademik ve soyut ilişkileri kuran ileri öbekler',
    category: 'Edat Öbekleri', color: '#7c3aed', icon: '🏛️',
    explanation: `📌 İLERİ BAĞLANTI KURMA:
1. Bu öbekler metinde gerekçe, kapsam, ölçüt ve istisna ilişkisi kurar.
2. Resmî dilde basit edatların yerini alabilirler; fakat gereksiz kullanılırsa metni ağırlaştırırlar.
3. Yönetimi koru: исходя из + tamlayan, в соответствии с + araç, независимо от + tamlayan.`,
    words: [
      ['Исходя из', 'İshadyá iz', '...-den hareketle', 'Veri/gerekçeden sonuç çıkarırken kullanılır.'],
      ['В соответствии с', 'F saadvétstvii s', '...-e uygun olarak', 'с + araç hâli; resmî dil.'],
      ['Независимо от', 'Nizavísima at', '...-den bağımsız olarak', 'от + tamlayan hâl.'],
      ['В рамках', 'V rámkah', '... kapsamında', 'Tamlayan hâl: в рамках проекта.'],
      ['С точки зрения', 'S tóçki zréniya', '... açısından', 'Tamlayan hâl: с точки зрения закона.'],
      ['По мере', 'Pa mére', '... ölçüsünde / gittikçe', 'Süreçte paralel değişim anlatır.'],
      ['За счёт', 'Za şçyot', 'Sayesinde / pahasına', 'Kaynak veya bedel bildirir; tamlayan hâl.'],
      ['Ввиду', 'Vvidú', 'Nedeniyle / göz önünde bulundurarak', 'Resmî ve yazılı; tamlayan hâl.'],
      ['При условии', 'Pri uslóvii', 'Koşuluyla', 'Genellikle что yan cümlesi izler.'],
      ['За исключением', 'Za isklyuçéniyem', 'Hariç / dışında', 'Tamlayan hâl: за исключением одного случая.'],
    ],
    sentences: [
      ['Решение принято исходя из новых данных.', 'Karar yeni verilerden hareketle alındı.'],
      ['Проект выполнен в соответствии с планом.', 'Proje plana uygun olarak tamamlandı.'],
      ['С точки зрения закона это допустимо.', 'Yasa açısından buna izin verilebilir.'],
      ['Мы согласны при условии, что сроки изменят.', 'Sürelerin değiştirilmesi koşuluyla kabul ediyoruz.'],
    ],
  },
  {
    id: 'ru_core_precise_adjectives_c2', unitNumber: 190.981, level: 'C2',
    title: 'Hassas ve Etkili Sıfatlar', description: 'Nüanslı değerlendirme ve ileri anlatım için kesin sıfatlar',
    category: 'Sıfatlar', color: '#a855f7', icon: '💎',
    explanation: `📌 C2’DE NÜANS:
1. Yakın anlamlı sıfatlar aynı değildir: убедительный “ikna edici”, обоснованный “gerekçeli”, достоверный “güvenilir/doğrulanabilir”.
2. Olumlu ya da olumsuz çağrışımı bağlam belirler: неоднозначный yalnızca “kötü” demek değildir.
3. Akademik eşdizimleri blok hâlinde öğren: исчерпывающий ответ, существенное различие.`,
    words: [
      ['Убедительный', 'Ubidítelnıy', 'İkna edici', 'убедительный аргумент.'],
      ['Обоснованный', 'Abasnóvannıy', 'Gerekçeli / temellendirilmiş', 'обоснованное решение.'],
      ['Достоверный', 'Dastavyérnıy', 'Güvenilir / doğrulanmış', 'достоверные сведения.'],
      ['Неоднозначный', 'Niadnaznáçnıy', 'Tek anlamlı olmayan / tartışmalı', 'неоднозначная реакция.'],
      ['Исчерпывающий', 'İsçérpıvayuşşiy', 'Eksiksiz / kapsamlı', 'исчерпывающий ответ.'],
      ['Существенный', 'Suşşéstvinnıy', 'Kayda değer / esaslı', 'существенное различие.'],
      ['Последовательный', 'Paslidavátelnıy', 'Tutarlı / ardışık', 'последовательная позиция.'],
      ['Предвзятый', 'Pridvzyátıy', 'Önyargılı / taraflı', 'предвзятая оценка.'],
      ['Целесообразный', 'Tselisabráznıy', 'Amaca uygun / yerinde', 'Resmî değerlendirmelerde sık geçer.'],
      ['Противоречивый', 'Prativaréçivıy', 'Çelişkili', 'противоречивые данные.'],
    ],
    sentences: [
      ['Доклад содержит достоверные сведения.', 'Rapor güvenilir bilgiler içeriyor.'],
      ['Это убедительный, но неоднозначный аргумент.', 'Bu ikna edici fakat tartışmalı bir argüman.'],
      ['Ответ был исчерпывающим.', 'Yanıt eksiksizdi.'],
      ['Данные оказались противоречивыми.', 'Verilerin çelişkili olduğu ortaya çıktı.'],
    ],
  },
];

export const CORE_WORD_CLASS_UNITS_RU: UnitModule[] = SPECS.map(makeUnit);
