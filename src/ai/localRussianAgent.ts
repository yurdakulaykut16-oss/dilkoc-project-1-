// DilKoç © 2026 — Bu kaynak kod telif hakkıyla korunur. İzinsiz kopyalama,
// dağıtma ve türev çalışma üretme yasaktır (bkz. LICENSE).
import { UNITS_DATA } from '../curriculumData';
import { detectRussianQuestionIntent, searchRussianKnowledge } from './russianExpertise';
import { isEnglish, isTargetScript } from '../content/activeLanguage';

export interface LocalRussianAgentContext {
  pathPosition: number;
  pathTotal: number;
  focusTitle: string;
  completedUnits: number;
  completedTopics: number;
  completedAlpha: number;
  completedGrammar: number;
  recentUserQueries?: string[];
}

export interface LocalRussianAnswer {
  text: string;
  confidence: 'yüksek' | 'orta' | 'düşük';
  sources: string[];
}

function normalize(text: string) {
  return text.toLocaleLowerCase('tr-TR')
    .replace(/ё/g, 'е')
    .replace(/[âä]/g, 'a').replace(/[î]/g, 'i').replace(/[ûü]/g, 'u')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o')
    .replace(/[.,!?;:()[\]{}«»"'`´’‘“”\-—/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Hedef ifade, sorguda TAM kelime/öbek olarak geçiyor mu?
 *  Alt-dizi eşleşmesi YASAKTIR: "kitap" içindeki "tap" veya "nasılsın"
 *  içindeki "sin" gibi yanlış eşleşmeleri engeller.
 *  normalize edilmiş metinde ayraç yalnız boşluk olduğu için RegExp
 *  derlemeye gerek yok — indexOf + sınır kontrolü çok daha hızlıdır. */
function containsWhole(haystack: string, needle: string): boolean {
  const n = needle.trim();
  if (!n) return false;
  let idx = haystack.indexOf(n);
  while (idx !== -1) {
    const before = idx === 0 ? ' ' : haystack[idx - 1];
    const end = idx + n.length;
    const after = end >= haystack.length ? ' ' : haystack[end];
    if (before === ' ' && after === ' ') return true;
    idx = haystack.indexOf(n, idx + 1);
  }
  return false;
}

const allWords = UNITS_DATA.flatMap(unit => unit.words.map(word => ({ word, unit })));
const allSentences = UNITS_DATA.flatMap(unit => unit.sentences.map(sentence => ({ sentence, unit })));

// ============================================================================
// HIZ İNDEKSİ — normalize işi modül yüklenirken BİR KEZ yapılır; her soruda
// yalnızca hazır dizgiler karşılaştırılır (önceden ~4700 kelime + 230 bilgi
// kaydı sorgu başına yeniden normalize ediliyordu; artık sorgu < 2 ms).
// ============================================================================
const WORD_INDEX = allWords.map(({ word, unit }) => ({
  ru: normalize(word.ru),
  tr: normalize(word.tr),
  word,
  unit,
}));

const SENTENCE_INDEX = allSentences.map(({ sentence, unit }) => ({
  ru: normalize(sentence.ru),
  tr: normalize(sentence.tr),
  sentence,
  unit,
}));

/** normalize edilmiş tam eşleşme → eşleşen kelime listesi (kalem → pen/pencil). */
const RU_EXACT = new Map<string, typeof WORD_INDEX>();
const TR_EXACT = new Map<string, typeof WORD_INDEX>();
for (const item of WORD_INDEX) {
  if (item.ru) {
    const list = RU_EXACT.get(item.ru);
    if (list) list.push(item); else RU_EXACT.set(item.ru, [item]);
  }
  if (item.tr.length >= 2) {
    const list = TR_EXACT.get(item.tr);
    if (list) list.push(item); else TR_EXACT.set(item.tr, [item]);
  }
}

/** Türkçe soru-kelimeleri: yazım hatası (fuzzy) aramasında içerik sayılmaz
 *  ("nedir" → "Nehir" gibi sahte eşleşmeleri engeller). */
const TR_META_WORDS = new Set([
  'nedir', 'demek', 'anlami', 'ingilizcesi', 'ingilizce', 'rusca', 'ruscasini', 'turkce',
  'nasil', 'neden', 'nerede', 'hangi', 'yazdim', 'dogru', 'yanlis', 'cumle', 'cumlesi',
  'kelime', 'kelimesi', 'kelimesini', 'kullandim', 'soyle', 'soyler', 'cevir', 'ceviri',
  'goster', 'ogren', 'bilgi', 'fark', 'farki', 'benzer', 'ornek', 'ornegi', 'yardim', 'lutfen',
]);

/** Çok kelimeli formların iç kelimeleri → form ("kalem" → "Kurşun kalem").
 *  Tek kelimeli formlar zaten EXACT haritalarında; burada yalnız öbekler. */
const WORD_TOKEN_INDEX = new Map<string, typeof WORD_INDEX>();
for (const item of WORD_INDEX) {
  for (const form of [item.ru, item.tr]) {
    if (!form.includes(' ')) continue;
    const seen = new Set<string>();
    for (const token of form.split(' ')) {
      if (token.length < 3 || seen.has(token)) continue;
      seen.add(token);
      const list = WORD_TOKEN_INDEX.get(token);
      if (list) { if (!list.some(other => other === item)) list.push(item); }
      else WORD_TOKEN_INDEX.set(token, [item]);
    }
  }
}

/** Sınırlı Levenshtein: eşik aşılırsa erken çıkar, maks. 2 farka izin verir. */
function editDistanceWithin(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  if (a === b) return true;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (cur[j] < rowMin) rowMin = cur[j];
    }
    if (rowMin > max) return false;
    prev = cur;
  }
  return prev[b.length] <= max;
}

/** Yazım hatası toleransı: "kitab"→kitap, "waater"→water, "tcik"→tck.
 *  Yalnız aynı harfle başlayan ve uzunluğu ±2 olan adaylarla karşılaştırır. */
function fuzzyTokenMatches(token: string): typeof WORD_INDEX {
  if (token.length < 4) return [];
  const max = token.length <= 5 ? 1 : 2;
  const out: typeof WORD_INDEX = [];
  for (const item of WORD_INDEX) {
    for (const form of [item.ru, item.tr]) {
      if (!form || Math.abs(form.length - token.length) > max) continue;
      if (form[0] !== token[0] && form[1] !== token[1]) continue;
      if (form !== token && editDistanceWithin(token, form, max)) {
        out.push(item);
        break;
      }
    }
  }
  return out;
}

function matchingWords(query: string) {
  const q = normalize(query);
  // 1) HIZLI YOL — sorgunun tamamı bir kelimeye eşitse anında dön (en yaygın
  //    kullanım: kullanıcı doğrudan "water" / "su" yazar).
  const exact = RU_EXACT.get(q) ?? TR_EXACT.get(q);
  if (exact) {
    return exact.slice(0, 5).map(item => ({ word: item.word, unit: item.unit, score: 100 + q.length }));
  }

  const qTokenList = q.split(' ').filter(Boolean);

  // 2) TOKEN YOLU — sorgu kelimeleri hazır indekslerden bakılır; 4700 kelimelik
  //    tarama YOK. ("kalem" hem tek başına hem "Kurşun kalem" içinde bulunur.)
  const scores = new Map<typeof WORD_INDEX[number], number>();
  const addScore = (item: typeof WORD_INDEX[number], score: number) => {
    const cur = scores.get(item);
    if (cur === undefined || score > cur) scores.set(item, score);
  };
  qTokenList.forEach((token, index) => {
    if (token.length < 2) return;
    const bonus = Math.max(0, 20 - index * 4);
    for (const item of RU_EXACT.get(token) ?? []) addScore(item, 40 + token.length + bonus);
    for (const item of TR_EXACT.get(token) ?? []) addScore(item, 34 + token.length + bonus);
    for (const item of WORD_TOKEN_INDEX.get(token) ?? []) {
      const formHit = (item.ru.includes(' ') && containsWhole(q, item.ru))
        || (item.tr.includes(' ') && containsWhole(q, item.tr));
      addScore(item, (formHit ? 46 : 30) + token.length + bonus);
    }
  });

  const rank = () => [...scores.entries()]
    .map(([item, score]) => ({ word: item.word, unit: item.unit, score }))
    .sort((a, b) => b.score - a.score)
    .filter((item, index, list) => list.findIndex(other => other.word.ru === item.word.ru && other.word.tr === item.word.tr) === index);

  let list = rank();

  // 3) FUZZY YOL — eşleşme yoksa ya da en iyi eşleşme zayıfsa (kısa/yardımcı
  //    kelime çakışması: "waater ne demek" → 'ne'→what 52 puan) yazım hatası
  //    toleransı devreye girer: "kitab"→kitap, "waater"→water.
  if (list.length === 0 || list[0].score < 60) {
    for (const token of qTokenList) {
      if (token.length < 4 || TR_META_WORDS.has(token)) continue;
      for (const item of fuzzyTokenMatches(token)) addScore(item, 50 + token.length);
    }
    list = rank();
  }
  return list.slice(0, 5);
}

function matchingSentences(query: string) {
  const q = normalize(query);
  return SENTENCE_INDEX
    .map((item) => {
      let score = 0;
      if (item.ru.length > 5 && (containsWhole(q, item.ru) || (q.length >= 4 && item.ru.includes(q)))) score += 30;
      if (item.tr.length > 5 && (containsWhole(q, item.tr) || (q.length >= 4 && item.tr.includes(q)))) score += 25;
      return { sentence: item.sentence, unit: item.unit, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function wordAnswer(query: string, minScore = 0) {
  const matches = matchingWords(query).filter(m => m.score >= minScore);
  if (matches.length === 0) return null;
  const q = normalize(query);
  const wantsAlternatives = /fark|karsilastir|alternatif|benzer|hangileri|hangi biri/.test(q);
  // Eş anlamlılar: en iyi adayın puanına %78+ yakın tüm adaylar gösterilir
  // ("kalem" → hem pen hem pencil; "hasta" → hem sick hem patient).
  const topScore = matches[0].score;
  const closeCount = Math.min(3, matches.filter(m => m.score >= topScore * 0.78).length);
  const shown = Math.max(1, wantsAlternatives ? 3 : closeCount);
  const lines = matches.slice(0, shown).map(({ word }, index) => {
    // Önce HEDEF DİL tarafında örnek ara (kelimenin kendisi geçen cümle);
    // yoksa Türkçe anlamı bütün kelime olarak geçen cümleyi kullan.
    // SENTENCE_INDEX zaten normalize edilmiştir — sorgu anında normalize YOK.
    const ruForm = normalize(word.ru);
    const trForm = normalize(word.tr);
    const example = SENTENCE_INDEX.find(item =>
      containsWhole(item.ru, ruForm) || item.ru === ruForm,
    )?.sentence
      ?? SENTENCE_INDEX.find(item =>
        containsWhole(item.tr, trForm) || item.tr === trForm,
      )?.sentence;
    const details = [
      word.reading ? `okunuş: ${word.reading}` : '',
      word.level ? `seviye: ${word.level}` : '',
      word.usageNote || '',
    ].filter(Boolean).join(' • ');
    return `${index + 1}. **${word.ru}** — ${word.tr}${details ? `\n   ${details}` : ''}${example ? `\n   Örnek: «${example.ru}» — ${example.tr}` : ''}`;
  });
  return {
    text: lines.join('\n\n'),
    sources: matches.slice(0, shown).map(item => `${item.unit.levelGroup} · ${item.unit.title}`),
  };
}

function sentenceAnswer(query: string) {
  const matches = matchingSentences(query);
  if (matches.length === 0) return null;
  const wantsAlternatives = /alternatif|baska|farkli|ornekler/.test(normalize(query));
  const selected = matches.slice(0, wantsAlternatives ? 3 : 1);
  return {
    text: selected.map(({ sentence }, index) => `${index + 1}. «${sentence.ru}»\n   ${sentence.tr}`).join('\n\n'),
    sources: selected.map(item => `${item.unit.levelGroup} · ${item.unit.title}`),
  };
}

/** İngilizce klasik hata kalıpları — deterministik düzeltmeler. */
function deterministicCorrectionEn(query: string) {
  const latin = query.match(/[A-Za-z][A-Za-z\d\s.,!?'-]*/)?.[0]?.trim();
  if (!latin) return null;
  const normalized = normalize(latin);
  if (/^i am agree\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **I agree.**\n\n"agree" bir fiildir; "be" ile birlikte kullanılmaz. "I am agree" ✗ → "I agree" ✓.';
  }
  if (/^i have \d+ years/.test(normalized)) {
    const number = normalized.match(/\d+/)?.[0] || '';
    return `Doğru biçim: **I am ${number} years old.**\n\nİngilizcede yaş "be" ile söylenir: "I am ... years old". "I have 20 years" ✗ (Türkçeden birebir çeviri olmaz).`;
  }
  if (/\b(he|she|it) don ?t\b/i.test(normalized)) {
    return 'Düzeltilmiş biçim: **doesn\'t** kullan.\n\nhe/she/it ile "don\'t" gelmez: "He doesn\'t work." — ayrıca fiil -s almaz (doesn\'t works ✗).';
  }
  if (/^i am work\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **I work.** veya **I am working.**\n\n"be + fiil" birlikte kullanılmaz: ya Present Simple ("I work") ya Present Continuous ("I am working") denir.';
  }
  if (/\bpeoples\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **people**\n\n"people" zaten çoğuldur; "peoples" yalnızca "halklar" (etnik gruplar) anlamında kullanılır.';
  }
  // Sayılamayan isimler çoğul -s ALMAZ:
  const uncountable = normalized.match(/\b(informations|advices|furnitures|luggages|equipments|softwares|homeworks|knowledges)\b/);
  if (uncountable) {
    const wrong = uncountable[1];
    const right = wrong.replace(/s$/, '');
    return `Düzeltilmiş biçim: **${right}**\n\n"${right}" sayılamayan (uncountable) bir isimdir; çoğul -s eki almaz. Miktar için "a piece of ${right}" / "some ${right}" / "a lot of ${right}" denir.`;
  }
  // did + V1 (düzensiz fiilin 2. hâli gelmez):
  const didV2 = normalized.match(/\bdidn ?t (went|saw|took|made|got|ate|bought|came|did|said|found|gave|knew|thought|wrote|read)\b/);
  if (didV2) {
    const v1: Record<string, string> = { went: 'go', saw: 'see', took: 'take', made: 'make', got: 'get', ate: 'eat', bought: 'buy', came: 'come', did: 'do', said: 'say', found: 'find', gave: 'give', knew: 'know', thought: 'think', wrote: 'write', read: 'read' };
    return `Düzeltilmiş biçim: **didn't ${v1[didV2[1]]}**\n\n"did/didn't" geçmişi zaten taşır; yanındaki fiil YALIN hâlde kalır: "I didn't ${v1[didV2[1]]}".`;
  }
  // Çifte karşılaştırma:
  const doubleComp = normalized.match(/\b(more|most) (better|worse|easier|bigger|smaller|larger|faster|slower|best|worst)\b/);
  if (doubleComp) {
    return `Düzeltilmiş biçim: **${doubleComp[2]}** (tek başına)\n\n"${doubleComp[2]}" zaten karşılaştırma biçimidir; "more/most" ile birlikte kullanılmaz (more better ✗ → better ✓).`;
  }
  if (/\b(explain|explain ed) (me|us|him|her|them)\b/.test(normalized) || /^explain (me|us)\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **explain to me**\n\n"explain" dolaylı nesne alır: "Explain it to me" ✓ ("Explain me" ✗). Benzer: describe to, say to, suggest to.';
  }
  if (/\bdepends of\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **depends on**\n\n"depend" edatı "on"dur: "It depends on the weather." ✓ ("depends of" ✗ — Fransızca/İtalyanca kalıntısı).';
  }
  if (/\bmarried with\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **married to**\n\n"marry/be married" edatı "to"dur: "She is married to a doctor." ✓';
  }
  if (/\bmake ((a|some) )?photos?\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **take a photo**\n\nFotoğraf çekmek: "take a photo/picture". "make" burada kullanılmaz. (Almanca/Rusça kalıntısı.)';
  }
  if (/\b(do|did) (a|some) mistakes?\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **make a mistake**\n\nHata yapmak: "make a mistake" (do ✗). Eşdizim: make progress, make friends, make noise.';
  }
  if (/\bthanks god\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **Thank God**\n\n"Thank God" (tanrıya şükür) fiil + nesnedir; "thanks" ile "God" yan yana gelmez.';
  }
  const dayIn = normalized.match(/\bin (monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/);
  if (dayIn) {
    return `Düzeltilmiş biçim: **on ${dayIn[1]}**\n\nGün adlarıyla "on" kullanılır: "on Monday". "in" yalnız ay/yıl/uzun sürelerde: in July, in 2025, in the morning.`;
  }
  if (/\bat the (morning|evening|night)\b/.test(normalized)) {
    return 'Düzeltilmiş biçim: **in the morning / in the evening / at night**\n\nSabah-akşam: "in the morning/evening"; yalnız "at night" edatsız-yalın kalıbıyla sabittir.';
  }
  return null;
}

function deterministicCorrection(query: string) {
  if (isEnglish()) return deterministicCorrectionEn(query);
  const cyrillic = query.match(/[А-Яа-яЁё][А-Яа-яЁё\d\s.,!?-]*/)?.[0]?.trim();
  if (!cyrillic) return null;
  const normalized = normalize(cyrillic);

  if (/^я есть\s+/.test(normalized)) {
    const corrected = cyrillic.replace(/^я есть\s+/i, 'Я ');
    return `Düzeltilmiş biçim: **${corrected}**\n\nŞimdiki zamanda ad cümlelerinde **быть** genellikle kullanılmaz. Bu nedenle «Я есть студент» yerine «Я студент» denir.`;
  }
  if (/^мне\s+\d+\s+год$/.test(normalized)) {
    const number = Number(normalized.match(/\d+/)?.[0]);
    const lastTwo = number % 100;
    const last = number % 10;
    const form = lastTwo >= 11 && lastTwo <= 14 ? 'лет' : last === 1 ? 'год' : last >= 2 && last <= 4 ? 'года' : 'лет';
    return `Doğru biçim: **Мне ${number} ${form}.**\n\nYaş söylerken kişi yönelme hâlindedir; yıl kelimesi sayıya göre **год / года / лет** olur.`;
  }
  if (/буду\s+[а-яё]+(ю|у|ешь|ет|ем|ете|ют|ут|ишь|ит|им|ите|ят|ат)\b/i.test(normalized)) {
    return '«буду» sonrasında çekimli fiil değil, **bitmemiş görünüşlü mastar** gerekir: «Я буду читать». Tamamlanmış sonuç için basit gelecek kullanılır: «Я прочитаю».';
  }
  const ruAge = normalized.match(/^я имею (\d+)/);
  if (ruAge) {
    const number = Number(ruAge[1]);
    const lastTwo = number % 100;
    const last = number % 10;
    const form = lastTwo >= 11 && lastTwo <= 14 ? 'лет' : last === 1 ? 'год' : last >= 2 && last <= 4 ? 'года' : 'лет';
    return `Doğru biçim: **Мне ${number} ${form}.**\n\nRusçada yaş sahiplik («иметь») ile değil, yönelme hâliyle söylenir: «Мне 20 лет». «Я имею 20 лет» Türkçeden birebir çeviridir, doğal değildir.`;
  }
  return null;
}

function progressAnswer(context: LocalRussianAgentContext) {
  return `Öğrenme yolunda **${context.pathPosition}/${context.pathTotal}** konumundasın: **${context.focusTitle}**. Tamamlananlar: ${context.completedUnits} müfredat ünitesi, ${context.completedTopics} dinleme konusu, ${context.completedAlpha} alfabe/okuma dersi ve ${context.completedGrammar} gramer temeli.`;
}

function conciseKnowledge(content: string, maxLength = 620) {
  if (content.length <= maxLength) return content;
  const cut = content.slice(0, maxLength);
  const boundary = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(' | '));
  return `${cut.slice(0, boundary > 260 ? boundary + 1 : maxLength).trim()}…`;
}

/**
 * Ağ, API, LLM veya token kullanmadan çalışan sembolik Rusça ajanı.
 * Yerel sözlük + cümle havuzu + 230 bölümlük bilgi bankasını arar ve sorunun
 * türüne göre deterministik cevap şablonu seçer.
 */
function computeLocalAnswer(query: string, context: LocalRussianAgentContext): LocalRussianAnswer {
  const q = normalize(query);
  const intent = detectRussianQuestionIntent(query);
  const isFollowUp = q.split(/\s+/).length <= 5 && /^(peki|neden|bunun|bu|o zaman|ya|farki|farkı)/.test(q);
  const previousQuery = context.recentUserQueries?.at(-1) || '';
  const searchQuery = isFollowUp && previousQuery ? `${previousQuery} ${query}` : query;

  if (/nerede kald|seviyem|ilerlemem|hangi ünite|hangi unite|konumum/.test(q)) {
    return { text: progressAnswer(context), confidence: 'yüksek', sources: ['Yerel öğrenen kaydı'] };
  }

  // NOT: \b Kiril harfleriyle çalışmaz (JS \w yalnız Latince); harf olmayan
  // lookahead kullanıyoruz.
  if (/^(merhaba|selamlar|selam|hey|привет|hello|hi)(?![a-zçğıöşüа-яё])/.test(q)) {
    return {
      text: isEnglish()
        ? 'Hello! İngilizce hakkında kelime, çeviri, gramer, telaffuz veya cümle düzeltme sorabilirsin. Bütün cevapları cihazdaki yerel bilgi bankasından vereceğim.'
        : 'Привет! Rusça hakkında kelime, çeviri, gramer, telaffuz veya cümle düzeltme sorabilirsin. Bütün cevapları cihazdaki yerel bilgi bankasından vereceğim.',
      confidence: 'yüksek',
      sources: ['Yerel konuşma motoru'],
    };
  }

  // Çok sorulan temel gerçekler doğrudan kural motorunda tutulur; arama
  // sonucunu yorumlamaya gerek kalmadan kesin cevap döner.
  if (/kac\s+(temel\s+)?hal|hal\s+sayisi/.test(q)) {
    return {
      text: isEnglish()
        ? 'İngilizcede isim **hâl çekimi YOKTUR** (Rusçadaki 6 hâl sisteminin karşılığı yoktur). İlişkiler **edatlarla** (in, on, at, of, to...) ve **söz dizisiyle** (SVO) kurulur: "the teacher\'s book" (aitlik), "give it to me" (yönelme).'
        : 'Rusçada **6 temel isim hâli** vardır:\n1. Именительный — yalın\n2. Родительный — ilgi\n3. Дательный — yönelme\n4. Винительный — belirtme\n5. Творительный — araç\n6. Предложный — bulunma/edat hâli',
      confidence: 'yüksek',
      sources: ['Yerel hâl sistemi'],
    };
  }
  if (/kac\s+harf|alfabe.*kac/.test(q)) {
    return {
      text: isEnglish()
        ? 'İngilizce alfabesi **26 harflidir** (5 ünlü, 21 ünsüz) ama **44 ses**i vardır: harf ≠ ses! Bu yüzden "cat" → KET, "hot" → HAT okunur; TH, magic E ve sessiz harfler (kn-, wr-, gh) fonetik derslerinin konusudur.'
        : 'Rus Kiril alfabesinde **33 harf** vardır: 10 ünlü, 21 ünsüz ve ses vermeyen iki işaret (**ь, ъ**).',
      confidence: 'yüksek',
      sources: ['Yerel alfabe bilgisi'],
    };
  }
  if (/kac\s+(kelime|benzersiz)|kelime\s+sayisi|ne kadar kelime/.test(q)) {
    const uniqueWords = new Set(WORD_INDEX.map(item => `${item.word.ru}|${item.word.tr}`)).size;
    return {
      text: isEnglish()
        ? `Yerel İngilizce zekası şu an **${UNITS_DATA.length} üniteden** **${uniqueWords} benzersiz kelime**, ${SENTENCE_INDEX.length} örnek cümle ve yerel bilgi bankasındaki uzmanlık kayıtlarıyla çalışıyor. Sorabileceğin her kelime cihazında hazır — internet gerekmez.`
        : `Yerel Rusça zekası şu an **${UNITS_DATA.length} üniteden** **${uniqueWords} benzersiz kelime**, ${SENTENCE_INDEX.length} örnek cümle ve yerel bilgi bankasındaki uzmanlık kayıtlarıyla çalışıyor. Sorabileceğin her kelime cihazında hazır — internet gerekmez.`,
      confidence: 'yüksek',
      sources: ['Yerel müfredat indeksi'],
    };
  }
  if (/kac\s+zaman|zaman.*kac/.test(q)) {
    return {
      text: isEnglish()
        ? 'İngilizcede **12 zaman** vardır: 3 zaman (present/past/future) × 4 görünüş (simple/continuous/perfect/perfect continuous). En kritik ikili: Present Perfect ("I have done" — etkisi şimdi) ile Past Simple ("I did" — zamanı bitti).'
        : 'Rusçada üç temel zaman vardır: **geçmiş, şimdiki ve gelecek**. Ancak doğru fiil seçimi için zamanla birlikte **görünüş** (bitmiş/bitmemiş) de değerlendirilir.',
      confidence: 'yüksek',
      sources: ['Yerel zaman ve görünüş sistemi'],
    };
  }

  // Hata kalıbı sorgunun içinde GEÇİYORSA niyet ne olursa olsun düzeltme öncelik
  // alır ("informations kelimesini kullandım" → düzeltme). Yalnız çeviri/okunuş
  // soruları ("... ne demek?") önce sözlüğe gider.
  if (intent !== 'translation' && intent !== 'pronunciation') {
    const patternCorrection = deterministicCorrection(query);
    if (patternCorrection) {
      return { text: patternCorrection, confidence: 'yüksek', sources: ['Yerel gramer kuralları'] };
    }
  }

  if (intent === 'translation' || intent === 'vocabulary' || intent === 'pronunciation') {
    const words = wordAnswer(searchQuery);
    if (words) return { ...words, confidence: 'yüksek' };
    const sentences = sentenceAnswer(searchQuery);
    if (sentences) return { ...sentences, confidence: 'yüksek' };
  }

  // Niyet belirsiz ama sorgu HEDEF DİLİN YAZISIYLA yazılmışsa ("как дела",
  // "how are you", "спасибо") önce sözlük/örnek cümle cevap verir; bilgi
  // bankası yalnız sözlük boş kalırsa devreye girer.
  if (intent === 'general') {
    const contentTokens = q.split(' ').filter(token => token.length >= 2 && !TR_META_WORDS.has(token));
    const targetTokens = contentTokens.filter(isTargetScript);
    if (contentTokens.length > 0 && targetTokens.length === contentTokens.length) {
      const direct = wordAnswer(searchQuery, 60);
      if (direct) return { ...direct, confidence: 'yüksek' };
      const directSentence = sentenceAnswer(searchQuery);
      if (directSentence) return { ...directSentence, confidence: 'orta' };
    }
  }

  const knowledge = searchRussianKnowledge(searchQuery, 4);
  if (knowledge.length > 0) {
    const topScore = knowledge[0].score;
    const wantsComparison = /fark|karsilastir|hangisi|ikisinin/.test(q);
    const selected = knowledge.slice(0, wantsComparison ? 2 : 1);
    const body = selected.map(({ entry }, index) => {
      const heading = index === 0 ? `**${entry.title}**` : `**${entry.title}**`;
      return `${heading}\n${conciseKnowledge(entry.content)}`;
    }).join('\n\n');
    return {
      text: body,
      confidence: topScore >= 25 ? 'yüksek' : 'orta',
      sources: selected.map(match => match.entry.title),
    };
  }

  const words = wordAnswer(searchQuery);
  if (words) return { ...words, confidence: 'orta' };
  const sentences = sentenceAnswer(searchQuery);
  if (sentences) return { ...sentences, confidence: 'orta' };

  return {
    text: isEnglish()
      ? 'Bu soru için yerel bilgi bankasında yeterince kesin bir eşleşme bulamadım. Soruyu bir İngilizce kelime, cümle veya konu adıyla biraz daha açık yazarsan bilgi bankası ve müfredat içinde yeniden arayabilirim.'
      : 'Bu soru için yerel bilgi bankasında yeterince kesin bir eşleşme bulamadım. Soruyu bir Rusça kelime, cümle veya konu adıyla biraz daha açık yazarsan 230 uzmanlık bölümü ve müfredat içinde yeniden arayabilirim.',
    confidence: 'düşük',
    sources: ['Yerel arama motoru'],
  };
}

// ============================================================================
// LRU CEVAP ÖNBELLEĞİ — aynı soru saniyede binlerce kez sorulsa bile cevap
// anında döner; hesaplama yalnızca ilk kez yapılır (IndexedDB önbelleğinin
// hemen altında RAM seviyesinde çalışır).
// ============================================================================
const AGENT_CACHE_LIMIT = 128;
const agentCache = new Map<string, LocalRussianAnswer>();

function agentCacheKey(query: string, context: LocalRussianAgentContext): string {
  return [
    query.toLocaleLowerCase('tr-TR').trim().replace(/\s+/g, ' '),
    context.pathPosition, context.pathTotal, context.focusTitle,
    context.completedUnits, context.completedTopics, context.completedAlpha, context.completedGrammar,
  ].join('|');
}

export function answerWithLocalRussianAgent(query: string, context: LocalRussianAgentContext): LocalRussianAnswer {
  const key = agentCacheKey(query, context);
  const hit = agentCache.get(key);
  if (hit) {
    // LRU: en son kullanılanı sona taşı
    agentCache.delete(key);
    agentCache.set(key, hit);
    return hit;
  }
  const answer = computeLocalAnswer(query, context);
  agentCache.set(key, answer);
  if (agentCache.size > AGENT_CACHE_LIMIT) {
    agentCache.delete(agentCache.keys().next().value as string);
  }
  return answer;
}
