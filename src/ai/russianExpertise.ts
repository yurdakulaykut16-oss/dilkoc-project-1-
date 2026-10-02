import { UNITS_DATA } from '../curriculumData';
import { isEnglish } from '../content/activeLanguage';

export interface RussianKnowledgeEntry {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

const RUSSIAN_CORE_KNOWLEDGE: RussianKnowledgeEntry[] = [
  {
    id: 'alphabet-pronunciation', title: 'Alfabe, vurgu ve telaffuz',
    keywords: ['alfabe', 'harf', 'okunuş', 'telaffuz', 'vurgu', 'ь', 'ъ', 'ё', 'о', 'akanje'],
    content: 'Rusça 33 harflidir. Vurgu sözlük anlamını ve sesleri etkileyebilir. ё daima vurguludur; basılı metinde çoğu kez е yazılır. Vurgusuz о [a]/[ə] yönünde indirgenir. ь ses üretmez, önceki ünsüzü yumuşatır; ъ ünsüz ile jotlaşmış ünlüyü ayırır. Türkçe okunuş yalnız yaklaşık destektir. Öğretim yazımında vurgu akut işaretle gösterilebilir: хорошо́, мо́ре.',
  },
  {
    id: 'gender-number', title: 'İsimlerde cinsiyet ve çoğul',
    keywords: ['cinsiyet', 'eril', 'dişil', 'nötr', 'çoğul', 'isim'],
    content: 'Genel olarak sessiz/й ile biten isimler eril, -а/-я dişil, -о/-е nötrdür; -ь ile bitenlerin cinsiyeti sözlükten öğrenilir. Sıfat, zamir ve geçmiş zaman yüklemi isimle uyum gösterir. Çoğul çoğunlukla -ы/-и alır; kitap, insan, çocuk gibi birçok düzensiz biçim vardır: книга→книги, человек→люди, ребёнок→дети.',
  },
  {
    id: 'nominative', title: 'Yalın hâl — именительный',
    keywords: ['yalın', 'именительный', 'özne', 'kim', 'ne'],
    content: 'Yalın hâl sözlük biçimi, cümlenin öznesi ve ad yüklemidir: Маша читает. Это мой брат. Şimdiki zamanda быть çoğunlukla kullanılmaz: Я студент; *Я есть студент standart nötr anlatımda yanlıştır.',
  },
  {
    id: 'genitive', title: 'İlgi hâli — родительный',
    keywords: ['ilgi hâli', 'ilgi hali', 'родительный', 'yokluk', 'aitlik', 'нет', 'miktar', 'у меня'],
    content: 'Родительный aitlik, kaynak, yokluk ve miktarda kullanılır. Başlıca edatlar: без, для, до, из, от, с, у, около, после. У меня есть книга = kitabım var; У меня нет книги = kitabım yok. 2–4 sonrası tekil ilgi, 5 ve üzeri sonrası çoğul ilgi görülür. Olumsuz varlıkta нет/не было + ilgi hâli temel kalıptır.',
  },
  {
    id: 'dative', title: 'Yönelme hâli — дательный',
    keywords: ['yönelme', 'дательный', 'kime', 'мне', 'нужно', 'надо', 'yaş'],
    content: 'Дательный alıcıyı, deneyimleyeni ve yönelinen kişiyi gösterir: Я дал книгу Анне. Мне холодно. Мне двадцать лет. Мне нужно работать. Başlıca edatlar к ve по’dur. Kişisiz durum/modal yapılarda kişi yönelme hâlindedir.',
  },
  {
    id: 'accusative', title: 'Belirtme hâli — винительный',
    keywords: ['belirtme', 'винительный', 'nesne', 'kimi', 'neyi', 'куда'],
    content: 'Винительный doğrudan nesneyi ve в/на ile hedefi bildirir: Я читаю книгу. Я иду в школу. Canlı eril tekil ve canlı çoğul biçim ilgi hâline; cansızlar çoğunlukla yalın hâle benzer: вижу брата ama вижу стол.',
  },
  {
    id: 'instrumental', title: 'Araç hâli — творительный',
    keywords: ['araç hâli', 'araç hali', 'творительный', 'ile', 'с кем', 'чем'],
    content: 'Творительный araç, eşlik, meslek/rol ve bazı yüklemlerde kullanılır: пишу ручкой, говорю с другом, работаю врачом, интересуюсь музыкой. Başlıca edatlar с, над, под, перед, между, за’dır; her edatın yer/hareket anlamı ayrıca kontrol edilmelidir.',
  },
  {
    id: 'prepositional', title: 'Bulunma hâli — предложный',
    keywords: ['bulunma', 'предложный', 'nerede', 'где', 'hakkında', 'о ком', 'о чём'],
    content: 'Предложный yalnız edatlarla kullanılır. в/на + предложный yer, о/об + предложный konu bildirir: живу в Москве, книга на столе, говорим о фильме. Bazı yer adlarında eski -у/-ю biçimi vardır: в лесу, на мосту.',
  },
  {
    id: 'adjective-agreement', title: 'Sıfat ve zamir uyumu',
    keywords: ['sıfat', 'uyum', 'zamir', 'какой', 'benim', 'мой'],
    content: 'Sıfatlar, iyelik ve işaret zamirleri bağlı ismin cinsiyet, sayı ve hâline uyar: новый дом, новая книга, новое окно, новые дома. Çekimde sıfat sonu hâli gösterir: с новым другом, о новой книге. Kısa sıfat çoğunlukla yüklem/durumdur: Он готов; tam sıfat niteliktir: готовый ужин.',
  },
  {
    id: 'present-conjugation', title: 'Şimdiki zaman ve fiil çekimi',
    keywords: ['şimdiki', 'çekim', '1. çekim', '2. çekim', 'настоящее', 'читать', 'говорить'],
    content: 'Bitmemiş fiiller şimdiki zamanda kişi-sayıya göre çekilir. 1. çekim tipik sonları -ю/-у, -ешь, -ет, -ем, -ете, -ют/-ут; 2. çekim -ю/-у, -ишь, -ит, -им, -ите, -ят/-ат. İstisna ve kök değişimleri nedeniyle mastardan mekanik tahmin her zaman güvenli değildir: писать→пишу, хотеть→хочу/хочешь/хотят.',
  },
  {
    id: 'past-future', title: 'Geçmiş ve gelecek zaman',
    keywords: ['geçmiş', 'gelecek', 'был', 'буду', 'прошедшее', 'будущее'],
    content: 'Geçmiş zaman -л/-ла/-ло/-ли ile öznenin cinsiyet-sayısına uyar: он читал, она читала, они читали. Süreç/alışkanlık geleceği буду + bitmemiş mastardır: буду читать. Tamamlanmış sonuç geleceği bitmiş fiilin kişi çekimidir: прочитаю. *буду прочитать standart değildir.',
  },
  {
    id: 'aspect', title: 'Fiil görünüşü — вид',
    keywords: ['görünüş', 'aspect', 'вид', 'bitmiş', 'bitmemiş', 'совершенный', 'несовершенный', 'yapmak'],
    content: 'Несовершенный вид süreç, süre, tekrar, alışkanlık ve eylem olgusunu; совершенный вид sınırlandırılmış tek sonucu/tamamlanmayı öne çıkarır. делать→сделать, читать→прочитать örnek çiftlerdir. Seçim yalnız “bitti/bitmedi” değildir; tekrar, inkâr, deneme, sonuç ve söylem odağı değerlendirilir. Bitmiş görünüşün gerçek şimdiki zamanı yoktur.',
  },
  {
    id: 'motion-verbs', title: 'Hareket fiilleri',
    keywords: ['hareket', 'gitmek', 'gelmek', 'идти', 'ходить', 'ехать', 'ездить', 'нести', 'носить'],
    content: 'идти/ходить yürüyerek, ехать/ездить araçla gitmektir. идти/ехать tek yön, şu anki ya da belirli sefer; ходить/ездить alışkanlık, çok yön veya tamamlanmış gidiş-dönüş anlatır. Önekler yön ve çoğu kez görünüş katar: при- varış, у- ayrılış, в-/вы- giriş/çıkış, под- yaklaşma, пере- geçiş, до- hedefe ulaşma.',
  },
  {
    id: 'reflexive-passive', title: '-ся dönüşlü fiiller',
    keywords: ['-ся', 'ся', 'dönüşlü', 'edilgen', 'возвратный'],
    content: '-ся/-сь gerçek dönüşlülük (мыться), karşılıklılık (встречаться), edilgen/orta yapı (дом строится), kişisiz eğilim (мне не спится) veya sözlüksel anlam (бояться) kurabilir. Her -ся Türkçeye “kendi” diye çevrilmez. -сь ünlüden sonra, -ся çoğunlukla ünsüzden sonra gelir.',
  },
  {
    id: 'negation', title: 'Olumsuzluk',
    keywords: ['olumsuzluk', 'не', 'ни', 'нет', 'никто', 'hiç'],
    content: 'не fiili/sözcüğü olumsuzlar. Rusça olumsuz uyum kullanır: Я никого не вижу = kimseyi görmüyorum; никто не пришёл = kimse gelmedi. ни olumsuzluğu güçlendirir veya kalıplarda kullanılır. нет/не было sonrası ad çoğunlukla ilgi hâlindedir.',
  },
  {
    id: 'questions-word-order', title: 'Sorular ve kelime sırası',
    keywords: ['soru', 'kelime sırası', 'кто', 'что', 'где', 'куда', 'ли', 'почему'],
    content: 'Evet-hayır sorusu çoğu kez tonlamayla kurulur: Ты дома? Soru sözcükleri кто, что, где, куда, откуда, когда, почему, зачем, как, какой, который, сколько’dur. ли “olup olmadığı” anlamında ikinci konuma eğilimlidir: Знаешь ли ты...? Kelime sırası esnektir; nötr sıra özne-fiil-nesne, sona taşınan öğe çoğu kez yeni odaktır.',
  },
  {
    id: 'numbers-time', title: 'Sayılar, yaş, saat ve tarih',
    keywords: ['sayı', 'yaş', 'saat', 'tarih', 'kaç', 'сколько', 'год', 'лет'],
    content: '1 sıfat gibi uyum gösterir; 2–4 sonrası ad tekil ilgi, 5–20 sonrası çoğul ilgi alır. 11–14 istisna grubudur; son rakam kuralı bunlarda uygulanmaz. Yaş: Мне 21 год, 22 года, 25 лет. Saatte в + belirtme kullanılır: в два часа. Tarih söyleme ve yazma farklı hâl kalıpları gerektirir.',
  },
  {
    id: 'imperative-modals', title: 'Emir, gereklilik ve yeterlilik',
    keywords: ['emir', 'gereklilik', 'можно', 'нельзя', 'нужно', 'надо', 'должен', 'мочь'],
    content: 'Emir tekil/çoğul-nezaket ayrımı taşır: читай/читайте, скажи/скажите. пожалуйста tonu yumuşatır. можно izin/imkân, нельзя yasak/imkânsızlık, надо/нужно gereklilik bildirir; deneyimleyen kişi yönelmededir: Мне можно войти? должен kısa sıfat gibi cinsiyet-sayıya uyar: должен, должна, должно, должны.',
  },
  {
    id: 'participles-gerunds', title: 'Ortaç ve ulaçlar',
    keywords: ['ortaç', 'ulaç', 'причастие', 'деепричастие', 'который'],
    content: 'Причастие fiil niteliğini sıfat gibi taşır ve isimle uyum gösterir: читающий студент, написанная книга. Kısa edilgen ortaç yüklem olabilir: книга написана. Деепричастие ek eylem verir: Читая книгу, он делал заметки. Ulaç eyleminin öznesi ana cümlenin öznesiyle aynı olmalıdır; aksi yapı hatalıdır.',
  },
  {
    id: 'conditionals-subjunctive', title: 'Koşul ve бы yapısı',
    keywords: ['koşul', 'şart', 'бы', 'если', 'keşke', 'условное'],
    content: 'Gerçek koşul если ile normal zaman çekimleriyle kurulur. Varsayımsal yapı geçmiş biçim + бы kullanır: Я бы пошёл, если бы было время. бы genellikle vurgulanan öğeden sonra gelir ve cinsiyet geçmiş biçimde görünür. Türkçedeki şart eklerinin tümü tek bir Rusça yapıya birebir karşılık gelmez.',
  },
  {
    id: 'prefixes-word-formation', title: 'Önekler ve sözcük yapımı',
    keywords: ['önek', 'sonek', 'kelime yapımı', 'приставка', 'суффикс'],
    content: 'Fiil önekleri hem yön/sonuç anlamı hem görünüş oluşturabilir; fakat aynı önek her fiilde aynı Türkçe karşılığa sahip değildir. İsim ve sıfat sonekleri anlam/cinsiyet ipucu verebilir: -тель kişi/araç, -ость soyut dişil isim, -ник kişi/nesne, -ск- ilişkisel sıfat. Sözcük ailesini kök ve yönetimle birlikte öğrenmek daha güvenlidir.',
  },
  {
    id: 'register-naturalness', title: 'Doğallık, resmiyet ve konuşma dili',
    keywords: ['doğal', 'resmî', 'resmi', 'samimi', 'argo', 'konuşma dili', 'ты', 'вы'],
    content: 'ты samimi tekil; вы resmî tekil veya çoğuldur. Здравствуйте nötr/resmî, Привет samimidir. Sözcük sözcük doğru çeviri doğal olmayabilir; eşdizim, bilgi yapısı ve bağlam kontrol edilir. Argo kuşak, bölge ve tona bağlıdır; nötr alternatif ayrıca verilmelidir. Rusçada özne bağlamdan belli olsa da Türkçe kadar sık düşürülmez.',
  },
  {
    id: 'translation-method', title: 'Türkçe-Rusça çeviri yöntemi',
    keywords: ['çeviri', 'çevir', 'rusçası', 'türkçesi', 'nasıl denir'],
    content: 'Çeviride önce iletişim amacı belirlenir; sonra özne cinsiyeti, ты/вы seçimi, eylemin görünüşü, hareket yönü, isim hâli ve doğal eşdizim kontrol edilir. Bağlam eksikse en olası nötr seçenek önce verilir, anlamı değiştiren alternatifler kısa notla ayrılır. Türkçe ekleri Rusçaya tek tek taşımak güvenilir değildir.',
  },
];

const ENGLISH_CORE_KNOWLEDGE: RussianKnowledgeEntry[] = [
  {
    id: 'alphabet-phonetics', title: 'İngilizce ses sistemi ve okuma kuralları',
    keywords: ['alfabe', 'harf', 'okunuş', 'telaffuz', 'ses', 'th', 'magic e', 'sessiz harf', 'schwa'],
    content: 'İngilizce 26 harflidir ama 44 sesi vardır: harf ≠ ses. TH iki sestir: sessiz θ (think) ve sesli ð (this). Kapalı hecede a→"e", o→"a", u→"a" gibi okunur (cat→KET, hot→HAT). Magic E kuralı: hat→hate (heyt). KN/WR/GH/MB sessiz harf taşır: know→NOU, light→LAYT. Türkçe okunuşlar yalnızca yaklaşıktır.',
  },
  {
    id: 'tense-system', title: 'Zaman sistemi: 3 zaman × 4 görünüş',
    keywords: ['zaman', 'zamanlar', 'tense', 'present', 'past', 'future', 'perfect', 'continuous'],
    content: 'İngilizce 12 zaman = 3 zaman (present/past/future) × 4 görünüş (simple/continuous/perfect/perfect continuous). Simple genel gerçek, continuous şu an sürme, perfect bitmiş-etkisi süren, perfect continuous süreç vurgusudur. Kalıplar: V1 / be+V-ing / have+V3 / have been+V-ing.',
  },
  {
    id: 'present-simple', title: 'Present Simple ve 3. tekil -s',
    keywords: ['present simple', 'şimdiki zaman', 'alışkanlık', 'third person', 's eki'],
    content: 'Present Simple alışkanlık ve genel doğrular içindir: I work every day. he/she/it öznesinde fiile -s gelir: he works (watch→watches, study→studies, go→goes). Olumsuz/soru do/does ile: She doesn\'t work. / Does she work? — fiil her zaman 1. hâlde kalır.',
  },
  {
    id: 'present-continuous', title: 'Present Continuous ve Present Perfect',
    keywords: ['continuous', 'ing', 'şu an', 'present perfect', 'have has', 'v3'],
    content: 'Present Continuous şu anı anlatır: I am studying now. Present Perfect (have/has + V3) geçmişin şimdiki etkisini verir: I have lost my keys (=hâlâ bulamadım). just/already/yet/ever/never/since/for bu zamanın sinyalidir. ago/yesterday ise Past Simple ister.',
  },
  {
    id: 'past-tenses', title: 'Past Simple ve Past Continuous',
    keywords: ['geçmiş zaman', 'past simple', 'ed', 'düzensiz fiil', 'was were', 'past continuous'],
    content: 'Past Simple bitmiş geçmiş: worked (düzgün), went/saw/had (düzensiz). didn\'t + fiil, Did + özne + fiil. Past Continuous arka plan: was/were + V-ing — "I was sleeping when you called." while + continuous, when + simple klasik ikilisidir.',
  },
  {
    id: 'future-forms', title: 'Gelecek: will, going to, Present Continuous',
    keywords: ['gelecek', 'will', 'going to', 'future', 'plan', 'tahmin'],
    content: 'will: anlık karar, tahmin, söz (I will help you). be going to: önceden plan ve kanıta dayalı tahmin (We are going to move). Present Continuous: kesinleşmiş randevu/plan (I am meeting him tomorrow). won\'t = will not.',
  },
  {
    id: 'modals', title: 'Kip fiilleri: can, must, should, might',
    keywords: ['modal', 'kip', 'can', 'must', 'should', 'might', 'izin', 'zorunluluk'],
    content: 'Kip fiilleri mastarla kullanılır ve 3. tekil -s ALMAZ: She can swim (✗ cans). can yetenek/izin, must güçlü zorunluluk, should tavsiye, might olasılık, have to dış zorunluluk. Olumsuzları anlamı değiştirebilir: mustn\'t (yasak) ≠ don\'t have to (gerek yok).',
  },
  {
    id: 'prepositions', title: 'Edatlar: in, on, at',
    keywords: ['edat', 'preposition', 'in', 'on', 'at', 'zaman', 'yer'],
    content: 'Zaman merdiveni: in (ayı/yılı: in July, in 2025), on (gün/tarih: on Monday), at (saat/an: at 7, at night). Yer: in (boşluk: in the room), on (yüzey: on the table), at (nokta: at the bus stop). Sabit eşdizimler ezberlenir: listen to, depend on, interested in, good at, afraid of.',
  },
  {
    id: 'phrasal-verbs', title: 'Phrasal verbs ve eşdizimler',
    keywords: ['phrasal verb', 'deyim', 'equivalan', 'eşdizim', 'collocation'],
    content: 'Phrasal verb = fiil + zarf/edat: put up with (katlanmak), figure out (çözmek), run into (tesadüfen karşılaşmak). Ayrılabilirlerde zamir ortada: figure it out. Eşdizimler kelimelerin resmi evliliğidir: make progress (✗ do progress), heavy rain (✗ strong rain), pay attention, meet a deadline.',
  },
  {
    id: 'word-order', title: 'Söz dizimi: SVO, soru ve sıfat sırası',
    keywords: ['söz dizimi', 'word order', 'svo', 'soru', 'sıfat', 'düzen'],
    content: 'İngilizce SVO\'dur: The dog bites the man ≠ The man bites the dog. Soru: (Wh-) + yardımcı + özne + fiil: Where do you live? Sıfatlar isimden önce gelir ve belirli bir sıra izler: görüş→boyut→yaş→renk (a beautiful big old red car). Zaman zarfı genelde sondadır.',
  },
  {
    id: 'false-friends', title: 'Türkçe öğrenci tuzakları (yalancı dostlar)',
    keywords: ['yalancı dost', 'false friend', 'sympathetic', 'actually', 'pretend', 'gym'],
    content: 'Yalancı dostlar: actually = aslında (aktüel değil), sympathetic = anlayışlı (sempatik değil), sensible = mantıklı (hassas değil), pretend = -mış gibi yapmak (iddia etmek değil), gym = spor salonu (jimnastik değil). Anlam kayması yaşamış bu kelimeleri tek tek ezberle.',
  },
  {
    id: 'translation-method-en', title: 'Türkçe-İngilizce çeviri yöntemi',
    keywords: ['çeviri', 'çevir', 'ingilizcesi', 'türkçesi', 'nasıl denir'],
    content: 'Çeviride önce zaman ve görünüş seçilir; sonra özne (İngilizcede asla gizlenmez!), edat, artikel (a/an/the) ve doğal eşdizim kontrol edilir. Türkçenin SOV dizilimi İngilizce SVO\'ya dönüştürülmelidir. Bağlam eksikse en olası nötr seçenek önce verilir.',
  },
];

const RUSSIAN_KNOWLEDGE_TARGET = 230;
const expansionCount = Math.max(0, RUSSIAN_KNOWLEDGE_TARGET - RUSSIAN_CORE_KNOWLEDGE.length);

const RUSSIAN_CURRICULUM_KNOWLEDGE: RussianKnowledgeEntry[] = Array.from(
  { length: expansionCount },
  (_, index) => {
    const unitIndex = Math.min(
      UNITS_DATA.length - 1,
      Math.floor((index * UNITS_DATA.length) / Math.max(1, expansionCount)),
    );
    const unit = UNITS_DATA[unitIndex];
    const wordKeywords = unit.words.slice(0, 14).flatMap(word => [word.ru, word.tr]);
    const words = unit.words.slice(0, 12).map(word => {
      const details = [word.reading, word.usageNote].filter(Boolean).join('; ');
      return `${word.ru} = ${word.tr}${details ? ` (${details})` : ''}`;
    }).join(', ');
    const examples = unit.sentences.slice(0, 5)
      .map(sentence => `«${sentence.ru}» — ${sentence.tr}`)
      .join(' | ');
    const dialogue = (unit.dialogue || []).slice(0, 4)
      .map(line => `${line.speaker}: «${line.ru}» — ${line.tr}`)
      .join(' | ');
    const grammar = (unit.grammarExplain || 'Bu ünitede yapı, sözcük ve doğal kullanım örnekler üzerinden öğretilir.').slice(0, 1000);

    return {
      id: `curriculum-expert-${unit.id}`,
      title: `${unit.levelGroup} · ${unit.title}`,
      keywords: [
        unit.title,
        unit.category,
        unit.levelGroup,
        ...wordKeywords,
      ],
      content: `Konu: ${unit.description}. Dilbilgisi ve kullanım: ${grammar} Temel söz varlığı: ${words || 'Bu kayıtta ayrı sözcük listesi yok.'}. Doğal örnekler: ${examples || 'Bu kayıtta ayrı örnek cümle yok.'}.${dialogue ? ` Diyalog bağlamı: ${dialogue}.` : ''}`,
    };
  },
);

export const RUSSIAN_KNOWLEDGE_BASE: RussianKnowledgeEntry[] = isEnglish()
  ? [...ENGLISH_CORE_KNOWLEDGE, ...RUSSIAN_CURRICULUM_KNOWLEDGE]
  : [...RUSSIAN_CORE_KNOWLEDGE, ...RUSSIAN_CURRICULUM_KNOWLEDGE];

export const LOCAL_RUSSIAN_FACT_COUNT = UNITS_DATA.reduce((total, unit) => {
  const wordFacts = unit.words.reduce((sum, word) => sum + 2 + (word.reading ? 1 : 0) + (word.usageNote ? 1 : 0) + (word.level ? 1 : 0), 0);
  const sentenceFacts = unit.sentences.length * 2;
  const dialogueFacts = (unit.dialogue?.length || 0) * 3;
  const grammarFacts = unit.grammarExplain ? 1 : 0;
  return total + wordFacts + sentenceFacts + dialogueFacts + grammarFacts;
}, RUSSIAN_KNOWLEDGE_BASE.length);

function normalizeKnowledgeText(text: string) {
  return text.toLocaleLowerCase('tr-TR')
    .replace(/ё/g, 'е')
    .replace(/[âä]/g, 'a').replace(/[î]/g, 'i').replace(/[ûü]/g, 'u')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o')
    .replace(/[.,!?;:()[\]{}"'`´’‘“”\-—/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface RussianKnowledgeMatch {
  entry: RussianKnowledgeEntry;
  score: number;
}

const SEARCH_STOP_WORDS = new Set([
  'rusca', 'ruscada', 'turkce', 'nedir', 'demek', 'nasil', 'neden', 'hangi', 'icin',
  'kullanilir', 'kullanimi', 'acikla', 'anlat', 'ornek', 'ver', 'ile', 'bir', 'bu',
  'su', 'mi', 'mu', 'mı', 'mü', 'ne', 've', 'veya', 'olarak',
  'ingilizce', 'ingilizcede', 'ingilizcesi', 'kac', 'vardir', 'anlamda',
  'what', 'does', 'mean', 'the', 'is', 'are', 'how', 'do', 'you', 'say',
]);

const KNOWLEDGE_INDEX = RUSSIAN_KNOWLEDGE_BASE.map((entry, order) => ({
  entry,
  order,
  isCore: !entry.id.startsWith('curriculum-expert-'),
  title: normalizeKnowledgeText(entry.title),
  keys: entry.keywords.map(normalizeKnowledgeText),
  body: normalizeKnowledgeText(entry.content),
}));

export function searchRussianKnowledge(query: string, limit = 7): RussianKnowledgeMatch[] {
  const normalized = normalizeKnowledgeText(query);
  const rawTokens = normalized.split(/\s+/).filter(token => token.length > 1);
  const meaningful = rawTokens.filter(token => !SEARCH_STOP_WORDS.has(token));
  const tokens = meaningful.length > 0 ? meaningful : rawTokens;
  return KNOWLEDGE_INDEX
    .map((item) => {
      let score = 0;
      for (const token of tokens) {
        if (item.title.includes(token)) score += 8;
        if (item.keys.some(key => key.includes(token) || token.includes(key))) score += 10;
        if (token.length >= 4 && item.body.includes(token)) score += 2;
      }
      const phrase = normalized.trim();
      if (phrase.length > 3 && (item.title.includes(phrase) || item.keys.some(key => key.includes(phrase)))) score += 20;
      if (item.isCore) score += 12;
      return { entry: item.entry, order: item.order, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map(({ entry, score }) => ({ entry, score }));
}

export function buildRussianExpertContext(query: string, maxChars = 6200): string {
  let selected = searchRussianKnowledge(query, 7);
  if (selected.length === 0) {
    const fallbackIds = isEnglish()
      ? ['translation-method-en', 'tense-system', 'present-simple', 'word-order']
      : ['translation-method', 'register-naturalness', 'aspect', 'genitive'];
    selected = fallbackIds
      .map(id => RUSSIAN_KNOWLEDGE_BASE.find(entry => entry.id === id))
      .filter((entry): entry is RussianKnowledgeEntry => Boolean(entry))
      .map(entry => ({ entry, score: 0 }));
  }

  let result = 'SORUYA GÖRE YEREL BİLGİ BANKASINDAN GETİRİLEN KAYITLAR:\n';
  for (const { entry } of selected) {
    const chunk = `\n[${entry.title}] ${entry.content}`;
    if (result.length + chunk.length > maxChars) break;
    result += chunk;
  }
  return result;
}

export type RussianQuestionIntent =
  | 'translation'
  | 'correction'
  | 'grammar'
  | 'vocabulary'
  | 'pronunciation'
  | 'conversation'
  | 'course'
  | 'general';

export function detectRussianQuestionIntent(query: string): RussianQuestionIntent {
  const q = query.toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[âä]/g, 'a').replace(/[î]/g, 'i').replace(/[û]/g, 'u');
  if (/yanlis|dogru mu|duzelt|hata|kontrol et|isprav|what.*wrong|is.*correct/.test(q)) return 'correction';
  if (/cevir|ceviri|ruscasi|\brusca\b|\bruscaya\b|ingilizcesi|\bingilizce\b|\bingilizceye\b|ne demek|nedir|ne anlama|anlami|nasil denir|перев|what does .* mean|what is .* mean|how do (you|i) say|translate/.test(q)) return 'translation';
  if (/okunus|telaffuz|vurgu|nasil okun|произнош|ударен|how.*pronounce|pronunciation|read out/.test(q)) return 'pronunciation';
  if (/gramer|hal\b|hal |cekim|ek |neden|farki|fark |aspect|gorunus|zaman|edat|падеж|вид |tense|modal|passive|relative/.test(q)) return 'grammar';
  if (/kelime|es anlam|zit anlam|fiil|isim|sifat|sozluk|vocabulary|phrasal|collocation|irregular/.test(q)) return 'vocabulary';
  if (/konus|diyalog|sohbet|rol yap|pratik|cevap vereyim|dialog|conversation practice/.test(q)) return 'conversation';
  if (/unite|ders|mufredat|nerede kald|seviyem|ilerleme|curriculum|lesson/.test(q)) return 'course';
  return 'general';
}

export function responsePlanForIntent(intent: RussianQuestionIntent): string {
  const tgt = isEnglish() ? 'İngilizce' : 'Rusça';
  const plans: Record<RussianQuestionIntent, string> = {
    translation: `Önce en doğal ${tgt}/Türkçe karşılığı ver. Ardından bağlama bağlı alternatifleri; cinsiyet, resmiyet, hâl ve görünüş farklarını yalnız gerekiyorsa açıkla. ${tgt} örneklerin Türkçesini ekle.`,
    correction: 'Önce düzeltilmiş cümleyi ver. Sonra hatayı parça parça teşhis et, ilgili kuralı açıkla ve aynı kurala ait bir doğru örnek daha ver. Doğal ama farklı alternatif varsa ayır.',
    grammar: 'Kuralı önce tek cümlede özetle; sonra biçim/ek tablosu veya karşılaştırmalı örneklerle açıkla. İstisnayı ana kuraldan ayır ve öğrencinin seviyesine göre ilerle.',
    vocabulary: 'Vurgulu biçim, anlam, söz türü; isimse cinsiyet/çoğul, fiilse görünüş çifti ve yönetim bilgisi ver. Doğal eşdizim ve örnek cümle ekle.',
    pronunciation: 'Kiril biçimi ve vurgu yerini göster; Türkçe yaklaşık okunuşu bunun yalnız yaklaşım olduğunu belirterek ver. Ses indirgenmesi/yumuşama varsa açıkla.',
    conversation: `Diyaloğu doğal ve seviyeye uygun ${tgt} yürüt. Her turda tek veya iki kısa soru sor; kullanıcı istemedikçe uzun ders anlatma. Belirgin hatayı nazikçe, konuşmayı kesmeden düzelt.`,
    course: 'Öğrenenin gerçek ilerleme ve yerel müfredat bağlamını kullan. Var olmayan ünite uydurma; en ilgili kartı ve kısa çalışma önerisini söyle.',
    general: `Sorunun asıl amacını belirleyip doğrudan yanıtla. Gereksiz konu listesi çıkarma; açıklamayı doğal ${tgt} örneklerle kanıtla.`,
  };
  return plans[intent];
}
