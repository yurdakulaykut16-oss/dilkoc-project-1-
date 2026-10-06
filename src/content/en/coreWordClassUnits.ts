import type { UnitModule, WordDetail } from '../../curriculumData';

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
      const scrambled = correct.length < 2 ? [...correct] : [...correct.slice(1), correct[0]];
      return { ru, tr, correct, scrambled };
    }),
  };
}

const SPECS: readonly Spec[] = [
  {
    id: 'en_core_verbs_a1', unitNumber: 10.981, level: 'A1',
    title: 'Temel Fiiller I', description: 'En sık kullanılan fiillerle ilk günlük cümlelerini kur',
    category: 'Fiiller', color: '#10b981', icon: '🏃',
    explanation: `📌 İNGİLİZCEDE TEMEL FİİL:
1. Sözlük biçimi yalındır: work, live, speak. “to” mastar işaretidir: to work.
2. Present Simple’da he/she/it fiile -s alır: I work, she works.
3. Soru ve olumsuzda do/does kullanılır; ana fiil yalın kalır: Does she work?`,
    words: [
      ['be', 'Bİİ', 'olmak', 'Şimdiki biçimleri am/is/are; düzensizdir.'],
      ['have', 'HEV', 'sahip olmak', 'He/she/it ile has olur.'],
      ['do', 'DUU', 'yapmak', 'Hem ana fiil hem soru/olumsuz yardımcısıdır.'],
      ['go', 'GOU', 'gitmek', 'He goes; geçmişi went.'],
      ['come', 'KAM', 'gelmek', 'come home ifadesinde “to” kullanılmaz.'],
      ['live', 'LİV', 'yaşamak / ikamet etmek', 'live in a city; live with someone.'],
      ['work', 'VÖRK', 'çalışmak', 'work at a company / work as a teacher.'],
      ['speak', 'SPİİK', 'konuşmak', 'speak English; speak to someone.'],
      ['know', 'NOU', 'bilmek / tanımak', 'Durum fiilidir; normalde continuous kullanılmaz.'],
      ['want', 'VONT', 'istemek', 'want + isim veya want to + fiil.'],
    ],
    sentences: [
      ['I live in Ankara.', 'Ankara’da yaşıyorum.'],
      ['She works at a hospital.', 'O bir hastanede çalışıyor.'],
      ['We speak English at work.', 'İşte İngilizce konuşuyoruz.'],
      ['Do you want some tea?', 'Biraz çay ister misin?'],
    ],
  },
  {
    id: 'en_core_prepositions_a1', unitNumber: 10.982, level: 'A1',
    title: 'Temel Edatlar', description: 'Yer, zaman, yön ve birliktelik bildiren temel edatlar',
    category: 'Edatlar', color: '#0ea5e9', icon: '🧭',
    explanation: `📌 EDATLARI KALIPLA ÖĞREN:
1. Yer: in a room, on the table, at school. Zaman: in May, on Monday, at five.
2. Hareket hedefi için to, kaynak için from kullanılır.
3. Türkçedeki tek bir ek İngilizcede farklı edatlara ayrılabilir; örnekle ezberle.`,
    words: [
      ['in', 'İN', 'içinde / -de', 'in a box; in London; in 2026.'],
      ['on', 'ON', 'üstünde / -de', 'on the table; on Monday.'],
      ['at', 'ET', '-de / noktasında', 'at home; at six o’clock.'],
      ['to', 'TU', '-e / -a', 'go to school; hareket hedefi.'],
      ['from', 'FROM', '-den / -dan', 'from Turkey; başlangıç/kaynak.'],
      ['with', 'VİD', 'ile', 'with my friend; birlikte/araç.'],
      ['for', 'FOR', 'için', 'for you; for two hours.'],
      ['of', 'OV', '-ın / -in', 'the end of the day; aitlik/ilişki.'],
      ['under', 'ANDIR', 'altında', 'under the chair.'],
      ['between', 'BİTVİİN', 'arasında', 'between two objects or people.'],
    ],
    sentences: [
      ['The keys are on the table.', 'Anahtarlar masanın üstünde.'],
      ['We meet at six.', 'Saat altıda buluşuyoruz.'],
      ['This gift is for you.', 'Bu hediye senin için.'],
      ['She is from Turkey.', 'O Türkiye’den.'],
    ],
  },
  {
    id: 'en_core_adjectives_a1', unitNumber: 10.983, level: 'A1',
    title: 'Temel Sıfatlar', description: 'İnsanları, nesneleri ve günlük durumları basitçe tarif et',
    category: 'Sıfatlar', color: '#f97316', icon: '🎨',
    explanation: `📌 İNGİLİZCEDE SIFAT:
1. Sıfat isimden önce gelir: a new phone. “Be”den sonra da kullanılabilir: The phone is new.
2. Sıfat kişi ve sayıya göre değişmez: a big house / two big houses.
3. Derece için very, really, quite gibi zarflar kullanılır: very important.`,
    words: [
      ['good', 'GUD', 'iyi', 'Karşılaştırması düzensizdir: better, best.'],
      ['bad', 'BED', 'kötü', 'Karşılaştırması worse, worst.'],
      ['big', 'BİG', 'büyük', 'Karşılaştırmada ünsüz ikilenir: bigger.'],
      ['small', 'SMOL', 'küçük', 'small room = küçük oda.'],
      ['new', 'NYU', 'yeni', 'new idea = yeni fikir.'],
      ['old', 'OULD', 'eski / yaşlı', 'Nesne ve kişi için kullanılır.'],
      ['beautiful', 'BYUUTİFIL', 'güzel', 'İnsan, yer ve nesne için kullanılabilir.'],
      ['important', 'İMPORTINT', 'önemli', 'an important question; “an” gelir.'],
      ['hot', 'HOT', 'sıcak', 'Hava, yiyecek ve nesne için.'],
      ['cold', 'KOULD', 'soğuk', 'cold water / cold weather.'],
    ],
    sentences: [
      ['This is a new phone.', 'Bu yeni bir telefon.'],
      ['We have a small apartment.', 'Küçük bir dairemiz var.'],
      ['Today is an important day.', 'Bugün önemli bir gün.'],
      ['The coffee is very hot.', 'Kahve çok sıcak.'],
    ],
  },
  {
    id: 'en_core_verbs_a2', unitNumber: 20.981, level: 'A2',
    title: 'Temel Fiiller II', description: 'Günlük işleri, hareketi ve iletişimi daha ayrıntılı anlat',
    category: 'Fiiller', color: '#14b8a6', icon: '⚙️',
    explanation: `📌 FİİLİN ÜÇ TEMEL BİÇİMİ:
1. Yalın, geçmiş ve üçüncü biçimi birlikte öğren: take–took–taken.
2. Present Continuous şu anı; Past Simple bitmiş geçmişi anlatır.
3. Bazı fiiller doğrudan nesne alır: listen to music ama watch a film.`,
    words: [
      ['understand', 'ANDIRSTEND', 'anlamak', 'Durum fiilidir; genellikle continuous olmaz.'],
      ['watch', 'VOÇ', 'izlemek', 'watch a film; “to” almaz.'],
      ['listen to', 'LİSIN TU', 'dinlemek', 'Nesneden önce “to” zorunludur.'],
      ['take', 'TEYK', 'almak / götürmek', 'Geçmişi took, üçüncü biçimi taken.'],
      ['give', 'GİV', 'vermek', 'give someone something.'],
      ['buy', 'BAY', 'satın almak', 'Geçmişi ve üçüncü biçimi bought.'],
      ['wait for', 'VEYT FOR', 'beklemek', 'Nesneden önce “for” gerekir.'],
      ['help', 'HELP', 'yardım etmek', 'help someone (to) do something.'],
      ['start', 'START', 'başlamak', 'start to do / start doing.'],
      ['finish', 'FİNİŞ', 'bitirmek', 'Ardından -ing gelir: finish working.'],
    ],
    sentences: [
      ['I understand the question.', 'Soruyu anlıyorum.'],
      ['She is waiting for the bus.', 'Otobüsü bekliyor.'],
      ['Can you help me?', 'Bana yardım edebilir misin?'],
      ['We finished cleaning the room.', 'Odayı temizlemeyi bitirdik.'],
    ],
  },
  {
    id: 'en_core_verb_patterns_b1', unitNumber: 110.981, level: 'B1',
    title: 'Fiil Kalıpları', description: 'Fiil + mastar, fiil + -ing ve yaygın phrasal verb kalıpları',
    category: 'Fiiller', color: '#f59e0b', icon: '🔗',
    explanation: `📌 FİİLİ TAM KALIBIYLA ÖĞREN:
1. decide to do fakat avoid doing; yanlış tamamlayıcı doğal olmayan cümle üretir.
2. Phrasal verb’de parçacık anlamı değiştirebilir: give up = bırakmak.
3. Bazı nesneli phrasal verb’ler ayrılır: turn the light off / turn it off.`,
    words: [
      ['decide to', 'DİSAYD TU', '...-meye karar vermek', 'Ardından yalın fiil gelir.'],
      ['manage to', 'MENİC TU', 'başarmak', 'Zor bir işi başarmayı vurgular.'],
      ['avoid doing', 'IVOYD DUİNG', 'yapmaktan kaçınmak', 'Ardından -ing gelir, to-infinitive gelmez.'],
      ['suggest doing', 'SICEST DUİNG', 'yapmayı önermek', 'suggest to do yanlıştır.'],
      ['look for', 'LUK FOR', 'aramak', 'Bir şeyi bulmaya çalışmak.'],
      ['find out', 'FAYND AUT', 'öğrenmek / keşfetmek', 'Araştırarak bilgi edinmek.'],
      ['give up', 'GİV AP', 'vazgeçmek / bırakmak', 'give up smoking.'],
      ['carry on', 'KERİ ON', 'devam etmek', 'carry on working.'],
      ['deal with', 'DİİL VİD', 'ilgilenmek / başa çıkmak', 'Sorun veya kişiyle ilgilenmek.'],
      ['rely on', 'RİLAY ON', 'güvenmek / bel bağlamak', 'rely on someone.'],
    ],
    sentences: [
      ['I decided to change my job.', 'İşimi değiştirmeye karar verdim.'],
      ['She suggested taking a taxi.', 'Taksiye binmeyi önerdi.'],
      ['We need to deal with this problem.', 'Bu sorunla ilgilenmemiz gerekiyor.'],
      ['He gave up smoking last year.', 'Geçen yıl sigarayı bıraktı.'],
    ],
  },
  {
    id: 'en_core_prepositional_phrases_b1', unitNumber: 110.982, level: 'B1',
    title: 'Temel Edat Öbekleri', description: 'Tek bir bütün gibi kullanılan yaygın İngilizce edat öbekleri',
    category: 'Edat Öbekleri', color: '#3b82f6', icon: '🧩',
    explanation: `📌 “PREPOSITIONAL PHRASES” = EDAT ÖBEKLERİ:
1. Türkçe başlık “Edat Öbekleri”dir: edat ve tamamlayıcısı cümlede tek görev üstlenir.
2. Öbeği parçalara ayırmadan öğren: because of, instead of, in front of.
3. Edattan sonra isim, zamirin nesne biçimi veya -ing gelir: because of him / being late.`,
    words: [
      ['because of', 'BİKOZ OV', 'nedeniyle / yüzünden', 'Ardından isim veya -ing gelir.'],
      ['instead of', 'İNSTED OV', 'yerine', 'instead of driving.'],
      ['in front of', 'İN FRONT OV', 'önünde', 'Nesne veya mekân konumu.'],
      ['next to', 'NEKST TU', 'yanında', 'Fiziksel yakınlık.'],
      ['according to', 'IKORDİNG TU', '...-e göre', 'Kaynak/kurala atıf; “bence” anlamında kullanılmaz.'],
      ['in spite of', 'İN SPAYT OV', '...-e rağmen', 'despite ile eş anlamlı; “of” unutulmaz.'],
      ['as a result of', 'EZ I RİZALT OV', 'sonucunda', 'Sebep-sonuç bağı kurar.'],
      ['by means of', 'BAY MİİNZ OV', 'aracılığıyla', 'Daha resmî araç/yöntem ifadesi.'],
      ['in addition to', 'İN IDİŞIN TU', '...-e ek olarak', 'to burada edattır; ardından -ing gelebilir.'],
      ['on behalf of', 'ON BİHAF OV', 'adına', 'Bir kişi/kurumu temsil ederken.'],
    ],
    sentences: [
      ['The match was cancelled because of the rain.', 'Maç yağmur nedeniyle iptal edildi.'],
      ['She sat next to me.', 'Yanıma oturdu.'],
      ['In spite of the delay, we arrived on time.', 'Gecikmeye rağmen zamanında vardık.'],
      ['I am writing on behalf of my team.', 'Ekibim adına yazıyorum.'],
    ],
  },
  {
    id: 'en_core_useful_adjectives_b2', unitNumber: 140.981, level: 'B2',
    title: 'Kullanışlı Sıfatlar', description: 'Görüş, değerlendirme ve gündelik ayrıntılar için güçlü sıfatlar',
    category: 'Sıfatlar', color: '#f43f5e', icon: '🛠️',
    explanation: `📌 SIFATI EŞDİZİMİYLE ÖĞREN:
1. reliable source, reasonable decision gibi doğal ikilileri blok hâlinde öğren.
2. Bazı sıfatlar sabit edat alır: satisfied with, suitable for, aware of.
3. -ed insanın hissini, -ing sebebi anlatır: interested / interesting.`,
    words: [
      ['reliable', 'RİLAYIBIL', 'güvenilir', 'a reliable source / colleague.'],
      ['convenient', 'KINVİİNİINT', 'uygun / elverişli', 'convenient time/place; kişi için kullanılmaz.'],
      ['reasonable', 'RİİZINIBIL', 'makul', 'reasonable price / explanation.'],
      ['affordable', 'IFORDIBIL', 'bütçeye uygun', 'Ucuzdan daha olumlu ve nazik.'],
      ['suitable for', 'SUUTIBIL FOR', '... için uygun', 'suitable for children.'],
      ['effective', 'İFEKTİV', 'etkili', 'İstenen sonucu üreten şey.'],
      ['efficient', 'İFİŞINT', 'verimli', 'Az zaman/kaynakla iyi sonuç; effective ile aynı değildir.'],
      ['aware of', 'IVEIR OV', 'farkında', 'aware of the risks.'],
      ['satisfied with', 'SETİSFAYD VİD', 'memnun', 'satisfied with the result.'],
      ['likely to', 'LAYKLİ TU', 'olası / muhtemel', 'be likely to happen.'],
    ],
    sentences: [
      ['This is a reliable source of information.', 'Bu güvenilir bir bilgi kaynağı.'],
      ['We need a more efficient system.', 'Daha verimli bir sisteme ihtiyacımız var.'],
      ['Are you satisfied with the result?', 'Sonuçtan memnun musunuz?'],
      ['Prices are likely to rise.', 'Fiyatların yükselmesi muhtemel.'],
    ],
  },
  {
    id: 'en_core_nuanced_verbs_c1', unitNumber: 170.981, level: 'C1',
    title: 'İnce Anlamlı Fiiller', description: 'Akademik, profesyonel ve tartışma dilinde kesin fiil seçimi',
    category: 'Fiiller', color: '#8b5cf6', icon: '🎯',
    explanation: `📌 C1’DE FİİL SEÇİMİ:
1. Genel “say/do” yerine iletişim amacını gösteren fiili seç: assert, imply, substantiate.
2. Fiilin tamamlayıcısını koru: contribute to doing, distinguish A from B.
3. Akademik eşdizimleri birlikte öğren: refute a claim, substantiate an argument.`,
    words: [
      ['assert', 'ISÖRT', 'ileri sürmek / kesin biçimde iddia etmek', 'assert that...; güçlü ve doğrudan.'],
      ['assume', 'ISUUM', 'varsaymak', 'Kanıtlamadan doğru kabul etmek.'],
      ['substantiate', 'SIBSTENŞİEYT', 'kanıtla desteklemek', 'substantiate a claim with evidence.'],
      ['refute', 'RİFYUUT', 'çürütmek', 'refute an argument / allegation.'],
      ['acknowledge', 'IKNOLİC', 'kabul etmek / teslim etmek', 'Bir gerçeği veya katkıyı tanımak.'],
      ['imply', 'İMPLAY', 'ima etmek', 'Konuşan/yazan imply eder; dinleyen infer eder.'],
      ['contribute to', 'KINTRİBYUUT TU', 'katkıda bulunmak', 'to edattır; ardından isim/-ing gelir.'],
      ['hinder', 'HİNDIR', 'engellemek / güçleştirmek', 'hinder progress/development.'],
      ['refer to', 'RİFÖR TU', 'atıfta bulunmak / değinmek', 'reference ile karıştırma.'],
      ['distinguish', 'DİSTİNGVİŞ', 'ayırt etmek', 'distinguish A from/between B.'],
    ],
    sentences: [
      ['The author refers to recent evidence.', 'Yazar yakın tarihli kanıtlara atıfta bulunuyor.'],
      ['The findings refute the original claim.', 'Bulgular ilk iddiayı çürütüyor.'],
      ['Several factors contributed to the decline.', 'Birkaç etken düşüşe katkıda bulundu.'],
      ['We must distinguish facts from assumptions.', 'Gerçekleri varsayımlardan ayırmalıyız.'],
    ],
  },
  {
    id: 'en_core_prepositional_phrases_c1', unitNumber: 170.982, level: 'C1',
    title: 'İleri Edat Öbekleri', description: 'Resmî, akademik ve soyut ilişkileri kuran ileri öbekler',
    category: 'Edat Öbekleri', color: '#7c3aed', icon: '🏛️',
    explanation: `📌 İLERİ BAĞLANTI KURMA:
1. Bu öbekler kapsam, ölçüt, istisna ve taviz ilişkilerini açıkça işaretler.
2. Resmî metinde yararlıdır; gündelik konuşmada gereksiz kullanmak dili ağırlaştırabilir.
3. Öbeğin tamamını sabit blok olarak öğren: in accordance with, with regard to.`,
    words: [
      ['in accordance with', 'İN IKORDINS VİD', '...-e uygun olarak', 'Kural, yasa veya plana uygunluk.'],
      ['with regard to', 'VİD RİGARD TU', '... ile ilgili olarak', 'Resmî konu değiştirme/başlatma.'],
      ['in terms of', 'İN TÖRMZ OV', '... açısından', 'Belirli bir ölçüt veya boyut getirir.'],
      ['on the basis of', 'ON DI BEYSIS OV', '... temelinde', 'Karar ve çıkarımın dayanağı.'],
      ['in the light of', 'İN DI LAYT OV', '... ışığında', 'Yeni bilgiyle yeniden değerlendirme.'],
      ['regardless of', 'RİGARDLIS OV', '...-e bakılmaksızın', 'Ardından isim/-ing gelir.'],
      ['for the sake of', 'FOR DI SEYK OV', '... uğruna / hatırına', 'Amaç ya da fedakârlık bildirir.'],
      ['by virtue of', 'BAY VÖRÇU OV', 'sayesinde / gereğince', 'Statü, nitelik veya kural kaynaklı.'],
      ['subject to', 'SABCİKT TU', '...-e bağlı / tabi', 'Koşul veya onay gerektirir.'],
      ['with the exception of', 'VİD DI İKSEPŞIN OV', 'hariç / dışında', 'Resmî istisna bildirir.'],
    ],
    sentences: [
      ['The policy was revised in the light of new evidence.', 'Politika yeni kanıtlar ışığında gözden geçirildi.'],
      ['Access is granted subject to approval.', 'Erişim onaya bağlı olarak verilir.'],
      ['Results vary in terms of accuracy.', 'Sonuçlar doğruluk açısından değişiyor.'],
      ['Everyone attended with the exception of Ali.', 'Ali dışında herkes katıldı.'],
    ],
  },
  {
    id: 'en_core_precise_adjectives_c2', unitNumber: 190.981, level: 'C2',
    title: 'Hassas ve Etkili Sıfatlar', description: 'Nüanslı değerlendirme ve ileri anlatım için kesin sıfatlar',
    category: 'Sıfatlar', color: '#a855f7', icon: '💎',
    explanation: `📌 C2’DE NÜANS:
1. Yakın anlamlı sıfatların ölçütü farklıdır: credible “inanılır”, compelling “çok ikna edici”, valid “mantıken/geçerlilik bakımından doğru”.
2. Çağrışımı bağlam belirler: ambiguous nötr ya da eleştirel olabilir.
3. Akademik eşdizimleri blok hâlinde öğren: compelling evidence, inherent limitation.`,
    words: [
      ['compelling', 'KIMPELİNG', 'son derece ikna edici', 'compelling evidence / argument.'],
      ['well-founded', 'VEL FAUNDID', 'sağlam temelli', 'well-founded concern / conclusion.'],
      ['credible', 'KREDIBIL', 'inanılır / güvenilir', 'credible witness / explanation.'],
      ['ambiguous', 'EMBİGYUIS', 'belirsiz / çok anlamlı', 'ambiguous wording.'],
      ['comprehensive', 'KOMPRİHENSİV', 'kapsamlı', 'comprehensive review / solution.'],
      ['substantial', 'SIBSTENŞIL', 'önemli miktarda / esaslı', 'substantial evidence / difference.'],
      ['coherent', 'KOHİIRINT', 'tutarlı ve bütünlüklü', 'coherent argument / account.'],
      ['biased', 'BAYIST', 'taraflı / önyargılı', 'biased reporting / sample.'],
      ['inherent', 'İNHİİRINT', 'doğasında bulunan', 'inherent risk / limitation.'],
      ['counterproductive', 'KAUNTIRPRIDAKTİV', 'ters etki yaratan', 'Amaca zarar veren önlem.'],
    ],
    sentences: [
      ['The report presents compelling evidence.', 'Rapor son derece ikna edici kanıtlar sunuyor.'],
      ['Her concerns are entirely well-founded.', 'Kaygıları tamamen sağlam temellere dayanıyor.'],
      ['The wording is deliberately ambiguous.', 'İfade kasıtlı olarak belirsiz.'],
      ['This measure may prove counterproductive.', 'Bu önlem ters etki yaratabilir.'],
    ],
  },
];

export const CORE_WORD_CLASS_UNITS_EN: UnitModule[] = SPECS.map(makeUnit);
