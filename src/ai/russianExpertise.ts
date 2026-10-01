/**
 * Token bütçesini şişirmeden çalışan yerel Rusça uzmanlık kütüphanesi.
 * Bilgi uygulamaya gömülüdür; her soruda yalnızca ilgili bölümler seçilir.
 */

import { UNITS_DATA } from '../curriculumData';

export interface RussianKnowledgeEntry {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

/**
 * Uygulamanın içine gömülü yerel Rusça bilgi bankası. Bu kayıtların tamamı
 * modele her soruda gönderilmez. Soruya en yakın kayıtlar seçilerek küçük bir
 * bağlam paketi oluşturulur; böylece bilgi kapasitesi büyürken token tüketimi
 * sabit bir üst sınırda kalır.
 */
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

const RUSSIAN_KNOWLEDGE_TARGET = 230;
const expansionCount = Math.max(0, RUSSIAN_KNOWLEDGE_TARGET - RUSSIAN_CORE_KNOWLEDGE.length);

/**
 * Müfredatın tamamına eşit aralıklarla yayılan 207 ek uzmanlık kaydı üretir.
 * Bunlar boş başlık veya tekrar değildir: her kayıt gerçek bir ünitenin gramer
 * açıklamasını, sözcüklerini, örnek cümlelerini ve varsa diyaloğunu taşır.
 * Eşit aralıklı seçim A1'den C1/C2'ye kadar tek bir seviyenin baskın olmasını
 * önler. Çekirdek 23 kayıtla birlikte bilgi bankası tam 230 bölümdür.
 */
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

export const RUSSIAN_KNOWLEDGE_BASE: RussianKnowledgeEntry[] = [
  ...RUSSIAN_CORE_KNOWLEDGE,
  ...RUSSIAN_CURRICULUM_KNOWLEDGE,
];

/**
 * Yerel motorun arayabildiği atomik bilgi sayısı. Bir kelimenin iki yönlü
 * anlamı, okunuşu, kullanım notu ve seviyesi; her cümlenin iki yönlü karşılığı;
 * diyaloglar ve gramer açıklamaları ayrı bilgi noktalarıdır.
 */
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

/** Soruya en yakın bilgi kayıtlarını tamamen cihazda sıralar. */
const SEARCH_STOP_WORDS = new Set([
  'rusca', 'ruscada', 'turkce', 'nedir', 'demek', 'nasil', 'neden', 'hangi', 'icin',
  'kullanilir', 'kullanimi', 'acikla', 'anlat', 'ornek', 'ver', 'ile', 'bir', 'bu',
  'su', 'mi', 'mu', 'mı', 'mü', 'ne', 've', 'veya', 'olarak',
]);

export function searchRussianKnowledge(query: string, limit = 7): RussianKnowledgeMatch[] {
  const normalized = normalizeKnowledgeText(query);
  const rawTokens = normalized.split(/\s+/).filter(token => token.length > 1);
  const meaningful = rawTokens.filter(token => !SEARCH_STOP_WORDS.has(token));
  const tokens = meaningful.length > 0 ? meaningful : rawTokens;
  return RUSSIAN_KNOWLEDGE_BASE
    .map((entry, order) => {
      const title = normalizeKnowledgeText(entry.title);
      const keys = entry.keywords.map(normalizeKnowledgeText);
      const body = normalizeKnowledgeText(entry.content);
      let score = 0;
      for (const token of tokens) {
        if (title.includes(token)) score += 8;
        if (keys.some(key => key.includes(token) || token.includes(key))) score += 10;
        if (body.includes(token)) score += 2;
      }
      const phrase = normalized.trim();
      if (phrase.length > 3 && (title.includes(phrase) || keys.some(key => key.includes(phrase)))) score += 20;
      return { entry, order, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map(({ entry, score }) => ({ entry, score }));
}

/** Soruya en yakın yerel uzmanlık parçalarını, sabit karakter bütçesiyle getirir. */
export function buildRussianExpertContext(query: string, maxChars = 6200): string {
  let selected = searchRussianKnowledge(query, 7);
  // Genel/belirsiz soruda da temel bir çekirdek sağla; bütün bankayı gönderme.
  if (selected.length === 0) {
    selected = ['translation-method', 'register-naturalness', 'aspect', 'genitive']
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
  const q = query.toLocaleLowerCase('tr-TR');
  if (/yanlış|doğru mu|düzelt|hata|kontrol et|исправ/.test(q)) return 'correction';
  if (/çevir|çeviri|rusçası|rusça nasıl|ne demek|anlamı|перев/.test(q)) return 'translation';
  if (/okunuş|telaffuz|vurgu|nasıl okun|произнош|ударен/.test(q)) return 'pronunciation';
  if (/gramer|hâl|hal |çekim|ek |neden|farkı|aspect|görünüş|zaman|edat|падеж|вид /.test(q)) return 'grammar';
  if (/kelime|eş anlam|zıt anlam|fiil|isim|sıfat|sözlük/.test(q)) return 'vocabulary';
  if (/konuş|diyalog|sohbet|rol yap|pratik|cevap vereyim/.test(q)) return 'conversation';
  if (/ünite|ders|müfredat|nerede kald|seviyem|ilerleme/.test(q)) return 'course';
  return 'general';
}

export function responsePlanForIntent(intent: RussianQuestionIntent): string {
  const plans: Record<RussianQuestionIntent, string> = {
    translation: 'Önce en doğal Rusça/Türkçe karşılığı ver. Ardından bağlama bağlı alternatifleri; cinsiyet, resmiyet, hâl ve görünüş farklarını yalnız gerekiyorsa açıkla. Rusça örneklerin Türkçesini ekle.',
    correction: 'Önce düzeltilmiş cümleyi ver. Sonra hatayı parça parça teşhis et, ilgili kuralı açıkla ve aynı kurala ait bir doğru örnek daha ver. Doğal ama farklı alternatif varsa ayır.',
    grammar: 'Kuralı önce tek cümlede özetle; sonra biçim/ek tablosu veya karşılaştırmalı örneklerle açıkla. İstisnayı ana kuraldan ayır ve öğrencinin seviyesine göre ilerle.',
    vocabulary: 'Vurgulu biçim, anlam, söz türü; isimse cinsiyet/çoğul, fiilse görünüş çifti ve yönetim bilgisi ver. Doğal eşdizim ve örnek cümle ekle.',
    pronunciation: 'Kiril biçimi ve vurgu yerini göster; Türkçe yaklaşık okunuşu bunun yalnız yaklaşım olduğunu belirterek ver. Ses indirgenmesi/yumuşama varsa açıkla.',
    conversation: 'Diyaloğu doğal ve seviyeye uygun Rusça yürüt. Her turda tek veya iki kısa soru sor; kullanıcı istemedikçe uzun ders anlatma. Belirgin hatayı nazikçe, konuşmayı kesmeden düzelt.',
    course: 'Öğrenenin gerçek ilerleme ve yerel müfredat bağlamını kullan. Var olmayan ünite uydurma; en ilgili kartı ve kısa çalışma önerisini söyle.',
    general: 'Sorunun asıl amacını belirleyip doğrudan yanıtla. Gereksiz konu listesi çıkarma; açıklamayı doğal Rusça örneklerle kanıtla.',
  };
  return plans[intent];
}
