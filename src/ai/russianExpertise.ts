import { UNITS_DATA } from '../curriculumData';
import { isEnglish } from '../content/activeLanguage';
import { RU_CORE_KNOWLEDGE, type CoreKnowledgeEntry } from './knowledge/ruCore';
import { EN_CORE_KNOWLEDGE } from './knowledge/enCore';

export type RussianKnowledgeEntry = CoreKnowledgeEntry;

/**
 * Bilgi bankası hedefi 230 → 460 bölüme çıkarıldı (2 kat).
 * Çekirdek uzmanlık kayıtları da 23 → 58 (Rusça) ve 12 → 32 (İngilizce) oldu.
 */
const KNOWLEDGE_TARGET = 460;
const CORE_KNOWLEDGE = isEnglish() ? EN_CORE_KNOWLEDGE : RU_CORE_KNOWLEDGE;
const expansionCount = Math.max(0, KNOWLEDGE_TARGET - CORE_KNOWLEDGE.length);

/**
 * Müfredattan türetilen uzmanlık kayıtları.
 * Önceki sürüme göre her kayıt yaklaşık İKİ KAT daha fazla bilgi taşır:
 * 12 → 24 kelime, 5 → 10 örnek cümle, 4 → 8 diyalog satırı, 1000 → 2000 karakter gramer,
 * ayrıca okunuş, seviye ve kullanım notları ayrı ayrı indekslenir.
 */
const CURRICULUM_KNOWLEDGE: RussianKnowledgeEntry[] = Array.from(
  { length: expansionCount },
  (_, index) => {
    const unitIndex = Math.min(
      UNITS_DATA.length - 1,
      Math.floor((index * UNITS_DATA.length) / Math.max(1, expansionCount)),
    );
    const unit = UNITS_DATA[unitIndex];

    const wordKeywords = unit.words.slice(0, 28).flatMap(word => [word.ru, word.tr]);
    const words = unit.words.slice(0, 24).map(word => {
      const details = [word.reading, word.level, word.usageNote].filter(Boolean).join('; ');
      return `${word.ru} = ${word.tr}${details ? ` (${details})` : ''}`;
    }).join(', ');

    const examples = unit.sentences.slice(0, 10)
      .map(sentence => `«${sentence.ru}» — ${sentence.tr}`)
      .join(' | ');

    const dialogue = (unit.dialogue || []).slice(0, 8)
      .map(line => `${line.speaker}: «${line.ru}» — ${line.tr}`)
      .join(' | ');

    const scene = unit.sceneTitle
      ? ` Sahne bağlamı: ${unit.sceneTitle}${unit.sceneContext ? ` — ${unit.sceneContext}` : ''}.`
      : '';

    const grammar = (unit.grammarExplain || 'Bu ünitede yapı, sözcük ve doğal kullanım örnekler üzerinden öğretilir.').slice(0, 2000);

    const levelNote = `Seviye: ${unit.levelGroup}. Kategori: ${unit.category}. Ünite no: ${unit.unitNumber}.`;

    return {
      id: `curriculum-expert-${unit.id}`,
      title: `${unit.levelGroup} · ${unit.title}`,
      keywords: [
        unit.title,
        unit.category,
        unit.levelGroup,
        ...wordKeywords,
      ],
      content: `${levelNote} Konu: ${unit.description}. Dilbilgisi ve kullanım: ${grammar} Temel söz varlığı: ${words || 'Bu kayıtta ayrı sözcük listesi yok.'}. Doğal örnekler: ${examples || 'Bu kayıtta ayrı örnek cümle yok.'}.${dialogue ? ` Diyalog bağlamı: ${dialogue}.` : ''}${scene}`,
    };
  },
);

export const RUSSIAN_KNOWLEDGE_BASE: RussianKnowledgeEntry[] = [
  ...CORE_KNOWLEDGE,
  ...CURRICULUM_KNOWLEDGE,
];

/**
 * Atomik bilgi noktası sayacı. Önceki sürümde kelime başına 2-5, cümle başına 2 sayılırdı;
 * artık okunuş, seviye, kullanım notu, diyalog okunuşu, sahne bağlamı ve çekirdek kayıtların
 * anahtar kelimeleri de ayrı birer erişilebilir bilgi noktası olarak sayılıyor.
 */
export const LOCAL_RUSSIAN_FACT_COUNT = UNITS_DATA.reduce((total, unit) => {
  const wordFacts = unit.words.reduce(
    (sum, word) => sum + 3 + (word.reading ? 2 : 0) + (word.usageNote ? 2 : 0) + (word.level ? 1 : 0),
    0,
  );
  const sentenceFacts = unit.sentences.length * 3;
  const dialogueFacts = (unit.dialogue?.length || 0) * 4;
  const grammarFacts = unit.grammarExplain ? 2 : 0;
  const sceneFacts = (unit.sceneTitle ? 1 : 0) + (unit.sceneContext ? 1 : 0);
  const smeshFacts = unit.smeshariki ? 3 + (unit.smeshariki.miniDialogue?.length || 0) * 2 + (unit.smeshariki.questions?.length || 0) * 2 : 0;
  return total + wordFacts + sentenceFacts + dialogueFacts + grammarFacts + sceneFacts + smeshFacts;
}, CORE_KNOWLEDGE.reduce((sum, entry) => sum + 1 + entry.keywords.length, 0));

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
  'su', 'mi', 'mu', 'mı', 'mü', 'ne', 've', 'veya', 'olarak', 'bana', 'bende',
  'ingilizce', 'ingilizcede', 'ingilizcesi', 'kac', 'vardir', 'anlamda', 'lutfen',
  'soyle', 'soyler', 'misin', 'musun', 'yapar', 'olur', 'gibi', 'daha', 'cok', 'biraz',
  'what', 'does', 'mean', 'the', 'is', 'are', 'how', 'do', 'you', 'say', 'can', 'please',
]);

/** Türkçe çekim eklerini kabaca atarak gövdeye iner (bilgi araması için yeterlidir). */
function trStem(token: string): string {
  if (token.length <= 4) return token;
  return token
    .replace(/(lerinin|larinin|lerini|larini|lerin|larin|leri|lari|ler|lar)$/u, '')
    .replace(/(sinin|sının|nin|nın|nun|nün|in|ın|un|ün)$/u, '')
    .replace(/(ndan|nden|dan|den|tan|ten)$/u, '')
    .replace(/(sina|sine|ya|ye|a|e)$/u, '')
    .replace(/(da|de|ta|te)$/u, '')
    .replace(/(si|sı|su|sü|i|ı|u|ü)$/u, '')
    || token;
}

/** Rusça çekim eklerini kabaca atar (книги → книг). */
function ruStem(token: string): string {
  if (token.length <= 4) return token;
  return token.replace(/(ами|ями|ах|ях|ов|ев|ей|ом|ем|ой|ую|юю|ые|ие|ый|ий|ого|его|ому|ему|ых|их|ам|ям|ть|ся|сь|а|я|о|е|у|ю|ы|и|ь|й)$/u, '') || token;
}

function stemToken(token: string): string {
  return /[а-я]/.test(token) ? ruStem(token) : trStem(token);
}

const KNOWLEDGE_INDEX = RUSSIAN_KNOWLEDGE_BASE.map((entry, order) => {
  const title = normalizeKnowledgeText(entry.title);
  const keys = entry.keywords.map(normalizeKnowledgeText).filter(Boolean);
  const body = normalizeKnowledgeText(entry.content);
  return {
    entry,
    order,
    isCore: !entry.id.startsWith('curriculum-expert-'),
    title,
    titleStems: new Set(title.split(' ').filter(Boolean).map(stemToken)),
    keys,
    keyStems: new Set(keys.flatMap(key => key.split(' ')).filter(Boolean).map(stemToken)),
    body,
    bodyLength: Math.max(1, body.length),
  };
});

/** Arama sırasında ilgili konu ailesini öne çıkaran niyet→anahtar eşlemesi. */
const INTENT_BOOST_KEYS: Partial<Record<RussianQuestionIntent, string[]>> = {
  declension: ['hal', 'padez', 'cekim', 'isim'],
  conjugation: ['cekim', 'fiil', 'zaman', 'sahis'],
  pronunciation: ['okunus', 'telaffuz', 'vurgu', 'ses', 'alfabe'],
  grammar: ['gramer', 'kural', 'yapi'],
  vocabulary: ['kelime', 'sozcuk', 'esdizim'],
  translation: ['ceviri', 'cevir'],
  conversation: ['konusma', 'diyalog', 'nezaket'],
  culture: ['kultur', 'adet', 'gorgu'],
  studyPlan: ['plan', 'program', 'rutin', 'calisma'],
  exam: ['sinav', 'deneme', 'test'],
  mistakes: ['hata', 'yanlis', 'tuzak'],
  level: ['seviye', 'cefr', 'a1', 'b1'],
};

export function searchRussianKnowledge(
  query: string,
  limit = 7,
  intent?: RussianQuestionIntent,
): RussianKnowledgeMatch[] {
  const normalized = normalizeKnowledgeText(query);
  if (!normalized) return [];
  const rawTokens = normalized.split(/\s+/).filter(token => token.length > 1);
  const meaningful = rawTokens.filter(token => !SEARCH_STOP_WORDS.has(token));
  const tokens = meaningful.length > 0 ? meaningful : rawTokens;
  const stems = tokens.map(stemToken);
  const boosts = intent ? INTENT_BOOST_KEYS[intent] ?? [] : [];

  // İki kelimelik öbekler (bigram) kavramsal eşleşmeyi güçlendirir: "ilgi hali", "present perfect".
  const bigrams: string[] = [];
  for (let i = 0; i < tokens.length - 1; i++) bigrams.push(`${tokens[i]} ${tokens[i + 1]}`);

  const scored = KNOWLEDGE_INDEX.map((item) => {
    let score = 0;
    let hitTokens = 0;

    tokens.forEach((token, index) => {
      const stem = stems[index];
      let tokenHit = false;

      if (item.title.includes(token)) { score += 10; tokenHit = true; }
      else if (stem.length >= 3 && item.titleStems.has(stem)) { score += 7; tokenHit = true; }

      if (item.keys.some(key => key === token)) { score += 16; tokenHit = true; }
      // Kısmi eşleşmede her iki tarafın da en az 3 harf olması gerekir; aksi hâlde
      // "as", "in" gibi parçalar rastgele kayıtları yukarı taşır.
      else if (token.length >= 3 && item.keys.some(key => key.length >= 3 && (key.includes(token) || token.includes(key)))) { score += 11; tokenHit = true; }
      else if (stem.length >= 3 && item.keyStems.has(stem)) { score += 8; tokenHit = true; }

      if (token.length >= 4 && item.body.includes(token)) { score += 3; tokenHit = true; }
      else if (stem.length >= 4 && item.body.includes(stem)) { score += 2; tokenHit = true; }

      if (tokenHit) hitTokens += 1;
    });

    for (const bigram of bigrams) {
      if (item.title.includes(bigram)) score += 14;
      else if (item.keys.some(key => key.includes(bigram))) score += 12;
      else if (item.body.includes(bigram)) score += 5;
    }

    const phrase = normalized.trim();
    if (phrase.length > 3) {
      if (item.title.includes(phrase)) score += 26;
      else if (item.keys.some(key => key.includes(phrase))) score += 22;
    }

    for (const boost of boosts) {
      if (item.title.includes(boost) || item.keys.some(key => key.includes(boost))) score += 6;
    }

    // Sorunun kelimelerinin KAÇININ karşılandığı, tek kelimenin çok tekrarından önemlidir.
    if (tokens.length > 1 && hitTokens > 1) score += hitTokens * 5;
    if (tokens.length > 1 && hitTokens === tokens.length) score += 12;

    // Çekirdek bonusu YALNIZCA gerçek bir eşleşme varsa verilir; yoksa anlamsız
    // sorgular bile her zaman bir çekirdek kaydı döndürür ve ajan alakasız ders anlatır.
    if (item.isCore && score > 0) score += 12;

    return { entry: item.entry, order: item.order, score, isCore: item.isCore };
  }).filter(item => item.score > 0);

  scored.sort((a, b) => b.score - a.score || a.order - b.order);

  // Çeşitlilik: aynı türden kayıtların listeyi tamamen doldurmasını engelle.
  const picked: typeof scored = [];
  const coreQuota = Math.max(2, Math.ceil(limit * 0.6));
  let coreUsed = 0;
  for (const item of scored) {
    if (picked.length >= limit) break;
    if (item.isCore) {
      if (coreUsed >= coreQuota && scored.some(other => !other.isCore && !picked.includes(other))) continue;
      coreUsed += 1;
    }
    picked.push(item);
  }
  for (const item of scored) {
    if (picked.length >= limit) break;
    if (!picked.includes(item)) picked.push(item);
  }

  return picked.slice(0, limit).map(({ entry, score }) => ({ entry, score }));
}

export function buildRussianExpertContext(query: string, maxChars = 12400): string {
  let selected = searchRussianKnowledge(query, 10);
  if (selected.length === 0) {
    const fallbackIds = isEnglish()
      ? ['translation-method-en', 'tense-system', 'present-simple', 'word-order', 'common-mistakes-en']
      : ['translation-method', 'register-naturalness', 'aspect', 'genitive', 'common-mistakes'];
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

/**
 * Niyet türleri 8'den 16'ya çıkarıldı; ajan artık "çekim tablosu istiyor",
 * "karşılaştırma istiyor", "çalışma planı istiyor" gibi ayrımları da yapabiliyor.
 */
export type RussianQuestionIntent =
  | 'translation'
  | 'correction'
  | 'grammar'
  | 'declension'
  | 'conjugation'
  | 'comparison'
  | 'vocabulary'
  | 'pronunciation'
  | 'conversation'
  | 'course'
  | 'studyPlan'
  | 'exam'
  | 'mistakes'
  | 'level'
  | 'culture'
  | 'general';

function foldTr(query: string) {
  return query.toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[âä]/g, 'a').replace(/[î]/g, 'i').replace(/[û]/g, 'u');
}

export function detectRussianQuestionIntent(query: string): RussianQuestionIntent {
  const q = foldTr(query);

  // Daha dar kalıplar önce denenir; genel kalıplar sona bırakılır.
  if (/\b(hal|hallerin|halleri|hal tablosu|cekimle|cekimi|cekim tablosu)\b/.test(q) && /(isim|kelime|tablo|goster|nedir|ne)/.test(q)) return 'declension';
  if (/hallerini|hallerine|hal tablosu|padez|склонен/.test(q)) return 'declension';
  if (/cekimle|cekimini goster|fiil cekimi|nasil cekilir|spryaj|спряж|conjugate/.test(q)) return 'conjugation';
  if (/(fark|farki|farklari|karsilastir|hangisi daha|ikisinin|arasindaki)/.test(q)) return 'comparison';
  if (/yanlis|dogru mu|duzelt|hata yaptim|kontrol et|isprav|what.*wrong|is.*correct|hatam/.test(q)) return 'correction';
  if (/en cok yapilan hata|sik hata|tuzak|yaygin hata|common mistake/.test(q)) return 'mistakes';
  if (/calisma plani|nasil calis|ne calis|program oner|rutin|gunde kac|plan yap|study plan/.test(q)) return 'studyPlan';
  if (/sinav|deneme|test taktigi|exam|nasil hazirlan/.test(q)) return 'exam';
  if (/seviye|cefr|\ba1\b|\ba2\b|\bb1\b|\bb2\b|\bc1\b|\bc2\b|hangi seviyedeyim/.test(q)) return 'level';
  if (/kultur|adet|gorgu|davranis|rus(lar)? nasil|ne hediye|misafir/.test(q)) return 'culture';
  if (/cevir|ceviri|ruscasi|\brusca\b|\bruscaya\b|ingilizcesi|\bingilizce\b|\bingilizceye\b|ne demek|nedir|ne anlama|anlami|nasil denir|перев|what does .* mean|how do (you|i) say|translate/.test(q)) return 'translation';
  if (/okunus|telaffuz|vurgu|nasil okun|произнош|ударен|how.*pronounce|pronunciation|read out|nasil soylenir/.test(q)) return 'pronunciation';
  if (/gramer|hal\b|cekim|ek |neden|aspect|gorunus|zaman|edat|падеж|вид |tense|modal|passive|relative|kural/.test(q)) return 'grammar';
  if (/kelime|es anlam|zit anlam|fiil|isim|sifat|sozluk|vocabulary|phrasal|collocation|irregular|esdizim/.test(q)) return 'vocabulary';
  if (/konus|diyalog|sohbet|rol yap|pratik yap|dialog|conversation practice/.test(q)) return 'conversation';
  if (/unite|ders|mufredat|nerede kald|ilerleme|curriculum|lesson|konumum/.test(q)) return 'course';
  return 'general';
}

export function responsePlanForIntent(intent: RussianQuestionIntent): string {
  const tgt = isEnglish() ? 'İngilizce' : 'Rusça';
  const plans: Record<RussianQuestionIntent, string> = {
    translation: `Önce en doğal ${tgt}/Türkçe karşılığı ver. Ardından bağlama bağlı alternatifleri; cinsiyet, resmiyet, hâl ve görünüş farklarını yalnız gerekiyorsa açıkla. ${tgt} örneklerin Türkçesini ekle.`,
    correction: 'Önce düzeltilmiş cümleyi ver. Sonra hatayı parça parça teşhis et, ilgili kuralı açıkla ve aynı kurala ait bir doğru örnek daha ver. Doğal ama farklı alternatif varsa ayır.',
    grammar: 'Kuralı önce tek cümlede özetle; sonra biçim/ek tablosu veya karşılaştırmalı örneklerle açıkla. İstisnayı ana kuraldan ayır ve öğrencinin seviyesine göre ilerle.',
    declension: 'İsmin cinsiyetini ve gövde tipini belirle, altı hâlin tekil-çoğul tablosunu ver, yazım kurallarını ve canlılık etkisini not düş.',
    conjugation: 'Fiilin çekim sınıfını ve görünüşünü belirle; şimdiki/geçmiş/gelecek ve emir biçimlerini tablo hâlinde ver, ünsüz değişmelerini işaretle.',
    comparison: 'İki öğeyi karşılıklı sütunlarda ele al; ortak noktayı kısa geç, AYIRICI ölçütü (anlam, hâl, görünüş, resmiyet) net söyle ve her biri için birer örnek ver.',
    vocabulary: 'Vurgulu biçim, anlam, söz türü; isimse cinsiyet/çoğul, fiilse görünüş çifti ve yönetim bilgisi ver. Doğal eşdizim ve örnek cümle ekle.',
    pronunciation: 'Kiril biçimi ve vurgu yerini göster; Türkçe yaklaşık okunuşu bunun yalnız yaklaşım olduğunu belirterek ver. Ses indirgenmesi/yumuşama varsa açıkla.',
    conversation: `Diyaloğu doğal ve seviyeye uygun ${tgt} yürüt. Her turda tek veya iki kısa soru sor; kullanıcı istemedikçe uzun ders anlatma. Belirgin hatayı nazikçe, konuşmayı kesmeden düzelt.`,
    course: 'Öğrenenin gerçek ilerleme ve yerel müfredat bağlamını kullan. Var olmayan ünite uydurma; en ilgili kartı ve kısa çalışma önerisini söyle.',
    studyPlan: 'Öğrencinin gerçek ilerlemesine bakarak somut, ölçülebilir ve günlük bir plan ver. Dört kanalı (tekrar, yeni içerik, dinleme, üretim) dengele.',
    exam: 'Sınav öncesi, sırası ve sonrası için ayrı ayrı taktik ver. Yanlış analizini merkeze al; boş bırakma ve zaman yönetimini vurgula.',
    mistakes: 'Hataları numaralı liste hâlinde, yanlış→doğru biçiminde ver ve her birinin arkasındaki kuralı tek cümleyle açıkla.',
    level: 'Seviyeyi kelime sayısı, dilbilgisi kapsamı ve yapabileceği işler üzerinden tanımla; öğrencinin mevcut konumuyla ilişkilendir.',
    culture: 'Kültürel kalıbı davranış düzeyinde anlat ve dilsel karşılığını ver; Türkçe âdetlerle farkını işaretle.',
    general: `Sorunun asıl amacını belirleyip doğrudan yanıtla. Gereksiz konu listesi çıkarma; açıklamayı doğal ${tgt} örneklerle kanıtla.`,
  };
  return plans[intent];
}
