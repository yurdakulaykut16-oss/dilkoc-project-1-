import { UNITS_DATA } from '../curriculumData';
import { detectRussianQuestionIntent, searchRussianKnowledge, type RussianKnowledgeMatch, type RussianQuestionIntent } from './russianExpertise';
import { isEnglish, isTargetScript } from '../content/activeLanguage';
import { compose, buildFollowUps, caseTable, compareTable } from './answerComposer';
import {
  CASE_LABELS, CASE_ORDER, aspectPartner, conjugateVerb, cyrillicWords,
  declineAdjective, declineNoun, explainNumberAgreement, guessLemmaCandidates,
  readRussian, stressIndexFromReading, yearForm,
} from './morphology';

export interface LocalRussianAgentContext {
  pathPosition: number;
  pathTotal: number;
  focusTitle: string;
  completedUnits: number;
  completedTopics: number;
  completedAlpha: number;
  completedGrammar: number;
  recentUserQueries?: string[];
  /** Koçun hata defteri — "zayıf konularım neler?" sorusunu gerçek veriyle yanıtlamak için. */
  mistakes?: { ru: string; tr: string; reason: string }[];
  /** Aralıklı tekrar kutusu — vadesi gelen kart sayısı ve zorlanılan kelimeler. */
  srsBank?: { ru: string; tr: string; box: number; nextReview: number; type: 'word' | 'letter' }[];
}

export interface LocalRussianAnswer {
  text: string;
  confidence: 'yüksek' | 'orta' | 'düşük';
  sources: string[];
  /** Kullanıcının tek dokunuşla sorabileceği akıllı takip soruları. */
  followUps?: string[];
  /** Cevabı üretirken taranan/kullanılan bilgi noktası sayısı (şeffaflık için). */
  depth?: number;
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

type WordItem = typeof WORD_INDEX[number];

const RU_EXACT = new Map<string, WordItem[]>();
const TR_EXACT = new Map<string, WordItem[]>();
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

const TR_META_WORDS = new Set([
  'nedir', 'demek', 'anlami', 'ingilizcesi', 'ingilizce', 'rusca', 'ruscasini', 'turkce',
  'nasil', 'neden', 'nerede', 'hangi', 'yazdim', 'dogru', 'yanlis', 'cumle', 'cumlesi',
  'kelime', 'kelimesi', 'kelimesini', 'kullandim', 'soyle', 'soyler', 'cevir', 'ceviri',
  'goster', 'ogren', 'bilgi', 'fark', 'farki', 'benzer', 'ornek', 'ornegi', 'yardim', 'lutfen',
  'tablo', 'halleri', 'hallerini', 'cekimle', 'cekimi', 'anlat', 'acikla', 'bana', 'birkac',
]);

const WORD_TOKEN_INDEX = new Map<string, WordItem[]>();
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

/** Çekimli Rusça biçimleri sözlük biçimine bağlayan ters indeks (книги → книга). */
const RU_LEMMA_INDEX = new Map<string, WordItem[]>();
for (const item of WORD_INDEX) {
  if (!item.ru || item.ru.includes(' ') || !/^[а-я]+$/.test(item.ru)) continue;
  for (const variant of guessLemmaCandidates(item.ru)) {
    const list = RU_LEMMA_INDEX.get(variant);
    if (list) { if (!list.includes(item)) list.push(item); }
    else RU_LEMMA_INDEX.set(variant, [item]);
  }
}

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

function fuzzyTokenMatches(token: string): WordItem[] {
  if (token.length < 4) return [];
  const max = token.length <= 5 ? 1 : 2;
  const out: WordItem[] = [];
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
  const exact = RU_EXACT.get(q) ?? TR_EXACT.get(q);
  if (exact) {
    return exact.slice(0, 6).map(item => ({ word: item.word, unit: item.unit, score: 100 + q.length }));
  }

  const qTokenList = q.split(' ').filter(Boolean);

  const scores = new Map<WordItem, number>();
  const addScore = (item: WordItem, score: number) => {
    const cur = scores.get(item);
    if (cur === undefined || score > cur) scores.set(item, score);
  };
  qTokenList.forEach((token, index) => {
    if (token.length < 2) return;
    const bonus = Math.max(0, 20 - index * 4);
    for (const item of RU_EXACT.get(token) ?? []) addScore(item, 40 + token.length + bonus);
    for (const item of TR_EXACT.get(token) ?? []) addScore(item, 34 + token.length + bonus);
    // Çekimli biçimden sözlük biçimine çözümleme — "книги nedir?" artık "книга"yı bulur.
    if (!TR_META_WORDS.has(token)) {
      for (const item of RU_LEMMA_INDEX.get(token) ?? []) addScore(item, 44 + token.length + bonus);
    }
    for (const item of WORD_TOKEN_INDEX.get(token) ?? []) {
      const formHit = (item.ru.includes(' ') && containsWhole(q, item.ru))
        || (item.tr.includes(' ') && containsWhole(q, item.tr));
      addScore(item, (formHit ? 46 : 30) + token.length + bonus);
    }
  });

  const rank = () => [...scores.entries()]
    .map(([item, score]) => ({ word: item.word, unit: item.unit, score }))
    .sort((a, b) => b.score - a.score)
    // Aynı Rusça biçimin farklı Türkçe etiketlerle tekrar listelenmesini engelle.
    .filter((item, index, list) => list.findIndex(other => normalize(other.word.ru) === normalize(item.word.ru)) === index);

  let list = rank();

  if (list.length === 0 || list[0].score < 60) {
    for (const token of qTokenList) {
      if (token.length < 4 || TR_META_WORDS.has(token)) continue;
      for (const item of fuzzyTokenMatches(token)) addScore(item, 50 + token.length);
    }
    list = rank();
  }
  return list.slice(0, 6);
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
    .slice(0, 4);
}

/** Bir kelimeyi içeren müfredat cümlelerini bulur (en fazla `take` tane). */
function examplesForWord(ruForm: string, trForm: string, take = 3) {
  const out: Array<{ target: string; tr: string; note?: string }> = [];
  const seen = new Set<string>();
  const ruStemmed = ruForm.length > 4 ? ruForm.slice(0, Math.max(4, ruForm.length - 2)) : ruForm;
  for (const item of SENTENCE_INDEX) {
    if (out.length >= take) break;
    const hit = containsWhole(item.ru, ruForm)
      || item.ru === ruForm
      || (ruStemmed.length >= 4 && item.ru.includes(ruStemmed))
      || containsWhole(item.tr, trForm);
    if (!hit) continue;
    const key = item.sentence.ru;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ target: item.sentence.ru, tr: item.sentence.tr, note: `${item.unit.levelGroup} · ${item.unit.title}` });
  }
  return out;
}

/** Aynı üniteden gelen komşu kelimeler — "ilgili kelimeler" bölümü için. */
function relatedWords(unitId: string, excludeRu: string, take = 6) {
  const unit = UNITS_DATA.find(candidate => candidate.id === unitId);
  if (!unit) return [];
  return unit.words
    .filter(word => word.ru !== excludeRu)
    .slice(0, take)
    .map(word => `${word.ru} = ${word.tr}`);
}

/* ────────────────────── CEVAP ÜRETİCİLER ────────────────────── */

function wordAnswer(query: string, minScore = 0): { text: string; sources: string[]; followUps: string[]; depth: number } | null {
  const matches = matchingWords(query).filter(m => m.score >= minScore);
  if (matches.length === 0) return null;

  const q = normalize(query);
  const wantsAlternatives = /fark|karsilastir|alternatif|benzer|hangileri|hangi biri|secenek/.test(q);
  const topScore = matches[0].score;
  const closeCount = Math.min(3, matches.filter(m => m.score >= topScore * 0.78).length);
  const shown = Math.max(1, wantsAlternatives ? 3 : closeCount);
  const selected = matches.slice(0, shown);
  const primary = selected[0];
  const english = isEnglish();

  const ruForm = normalize(primary.word.ru);
  const trForm = normalize(primary.word.tr);
  const examples = examplesForWord(ruForm, trForm, 3);

  const headline = selected.length === 1
    ? `**${primary.word.ru}** = **${primary.word.tr}**${primary.word.reading ? `  ·  okunuş: *${primary.word.reading}*` : ''}`
    : selected.map((item, index) => `${index + 1}. **${item.word.ru}** = ${item.word.tr}${item.word.reading ? ` (${item.word.reading})` : ''}`).join('\n');

  const explanation: string[] = [];
  if (primary.word.usageNote) explanation.push(`**Kullanım:** ${primary.word.usageNote}`);
  explanation.push(`**Nerede geçiyor:** ${primary.unit.levelGroup} seviyesi · «${primary.unit.title}» ünitesi (${primary.unit.category}).`);
  if (primary.word.level) explanation.push(`**Seviye etiketi:** ${primary.word.level} — bu kelime ${primary.word.level} düzeyinde aktif kullanılması beklenen söz varlığındandır.`);

  const table: string[] = [];
  const notes: string[] = [];
  let isNoun = false;
  let isVerb = false;

  if (!english && /^[а-яё]+$/i.test(primary.word.ru)) {
    const lemma = primary.word.ru.toLocaleLowerCase('ru-RU');
    const verb = conjugateVerb(lemma);
    if (verb) {
      isVerb = true;
      table.push(`🔤 ${verb.presentLabel} (${verb.conjugationClass}, ${verb.aspect})`);
      table.push(`   я ${verb.present.ya}   ·   ты ${verb.present.ty}   ·   он/она ${verb.present.on}`);
      table.push(`   мы ${verb.present.my}   ·   вы ${verb.present.vy}   ·   они ${verb.present.oni}`);
      table.push(`⏮️ GEÇMİŞ: ${verb.past.m} (eril) / ${verb.past.f} (dişil) / ${verb.past.n} (nötr) / ${verb.past.pl} (çoğul)`);
      table.push(`⏭️ GELECEK: ${verb.future}`);
      table.push(`❗ EMİR: ${verb.imperative.ty} (sen) / ${verb.imperative.vy} (siz)`);
      notes.push(...verb.notes);
      const pair = aspectPartner(lemma);
      if (pair) notes.push(`**Görünüş çifti:** ${pair.imperfective} (bitmemiş, süreç) ↔ ${pair.perfective} (bitmiş, sonuç).`);
    } else {
      const adjective = declineAdjective(lemma);
      if (adjective) {
        table.push(`🎨 SIFAT BİÇİMLERİ (${adjective.type} gövde)`);
        table.push(`   eril ${adjective.m} · dişil ${adjective.f} · nötr ${adjective.n} · çoğul ${adjective.pl}`);
        table.push(`📈 Karşılaştırma: ${adjective.comparative} · Üstünlük: ${adjective.superlative}`);
        notes.push(...adjective.notes);
      } else {
        const noun = declineNoun(lemma);
        if (noun) {
          isNoun = true;
          table.push(`📦 CİNSİYET: ${noun.genderTr} · gövde tipi: ${noun.stemType}`);
          table.push(`   yalın: ${noun.singular.nom} → çoğul: ${noun.plural.nom}`);
          table.push(`   ilgi: ${noun.singular.gen} → ${noun.plural.gen}  (нет ${noun.singular.gen})`);
          table.push(`   belirtme: ${noun.singular.acc} → ${noun.plural.acc}  (вижу ${noun.singular.acc})`);
          table.push(`   bulunma: о ${noun.singular.pre} → о ${noun.plural.pre}`);
          notes.push(noun.notes[0]);
          notes.push('Tam 6 hâllik tablo için «hâllerini göster» diye sorabilirsin.');
        }
      }
    }
    const phonetics = readRussian(lemma, stressIndexFromReading(primary.word.reading));
    if (phonetics && !primary.word.reading) {
      explanation.push(`**Yaklaşık okunuş:** [${phonetics.reading}]`);
    }
  }

  const related = relatedWords(primary.unit.id, primary.word.ru, 5);
  const nextStep = related.length > 0
    ? `Aynı üniteden birlikte öğrenilecek kelimeler: ${related.join(' · ')}`
    : `«${primary.unit.title}» ünitesini açarak bu kelimeyi bağlam içinde çalışabilirsin.`;

  const composed = compose({
    headline,
    explanation,
    table: table.length > 0 ? table : undefined,
    examples: examples.length > 0 ? examples : undefined,
    notes: notes.length > 0 ? notes.slice(0, 4) : undefined,
    practice: english
      ? `«${primary.word.tr}» anlamını kullanarak kendi cümleni kur ve bana yaz — kontrol edeyim.`
      : `«${primary.word.ru}» kelimesiyle kendi cümleni kur ve bana yaz; hâl eklerini ve görünüşü kontrol edeyim.`,
    nextStep,
  });

  return {
    text: composed.text,
    sources: selected.map(item => `${item.unit.levelGroup} · ${item.unit.title}`),
    followUps: buildFollowUps({ word: primary.word.ru, isNoun, isVerb, isEnglishMode: english }),
    depth: selected.length + examples.length + table.length + notes.length,
  };
}

function sentenceAnswer(query: string) {
  const matches = matchingSentences(query);
  if (matches.length === 0) return null;
  const wantsAlternatives = /alternatif|baska|farkli|ornekler/.test(normalize(query));
  const selected = matches.slice(0, wantsAlternatives ? 3 : 2);
  const composed = compose({
    headline: `**«${selected[0].sentence.ru}»**\n→ ${selected[0].sentence.tr}`,
    explanation: `Bu cümle müfredatında **${selected[0].unit.levelGroup} · ${selected[0].unit.title}** ünitesinde geçiyor.`,
    examples: selected.slice(1).map(item => ({
      target: item.sentence.ru,
      tr: item.sentence.tr,
      note: `${item.unit.levelGroup} · ${item.unit.title}`,
    })),
    practice: 'Bu cümlenin kelimelerini karıştırıp yeniden kurmayı dene; sıralamayı doğru yaparsan yapı oturmuş demektir.',
  });
  return {
    text: composed.text,
    sources: selected.map(item => `${item.unit.levelGroup} · ${item.unit.title}`),
    followUps: buildFollowUps({ topic: selected[0].unit.title, isEnglishMode: isEnglish() }),
    depth: selected.length * 2,
  };
}

/** Soru metninden incelenecek Rusça kelimeyi çıkarır. */
function extractTargetWord(query: string): string | null {
  const quoted = query.match(/[«"'“]([А-Яа-яЁё\s-]{2,40})[»"'”]/);
  if (quoted) return quoted[1].trim().split(/\s+/)[0];
  const words = cyrillicWords(query);
  if (words.length > 0) return words[0];
  // Türkçe yazılmış kelime aranıyorsa müfredattan karşılığını bul.
  const matches = matchingWords(query);
  if (matches.length > 0 && /^[А-Яа-яЁё]+$/.test(matches[0].word.ru)) {
    return matches[0].word.ru.toLocaleLowerCase('ru-RU');
  }
  return null;
}

function declensionAnswer(query: string): LocalRussianAnswer | null {
  if (isEnglish()) return null;
  const target = extractTargetWord(query);
  if (!target) return null;
  const noun = declineNoun(target);
  if (!noun) return null;

  const rows = CASE_ORDER.map(key => ({
    label: `${CASE_LABELS[key].tr} / ${CASE_LABELS[key].ru}`,
    question: CASE_LABELS[key].question,
    singular: noun.singular[key],
    plural: noun.plural[key],
  }));

  const dictionary = WORD_INDEX.find(item => item.ru === normalize(target));
  const meaning = dictionary ? ` (**${dictionary.word.tr}**)` : '';

  const composed = compose({
    headline: `**${noun.lemma}**${meaning} → ${noun.genderTr}, ${noun.animate ? 'canlı' : 'cansız'}, ${noun.stemType} gövde. Altı hâlin tamamı aşağıda.`,
    explanation: [
      'Rusçada hâl eki kelimenin **sonunu yeniden yazar**; bu yüzden tablo ezberlenmez, **kalıp** olarak tanınır.',
      `Bu isim **${noun.stemType}** sınıfına girdiği için ekler bu sınıfın dizisini izler.`,
    ],
    table: caseTable(rows),
    examples: [
      { target: `Это ${noun.singular.nom}.`, tr: 'Bu …-dir.', note: 'yalın — özne' },
      { target: `У меня нет ${noun.singular.gen}.`, tr: '…-im yok.', note: 'ilgi — yokluk' },
      { target: `Я вижу ${noun.singular.acc}.`, tr: '…-i görüyorum.', note: 'belirtme — nesne' },
      { target: `Я думаю о ${noun.singular.pre}.`, tr: '… hakkında düşünüyorum.', note: 'bulunma — konu' },
    ],
    notes: noun.notes,
    pitfall: 'Türkçede ek hep aynı kalır, Rusçada **cinsiyet + sayı + canlılık** üç ayrı değişken olarak eki değiştirir. Ek seçerken önce fiilin/edatın hangi hâli istediğini sor, sonra bu tabloya bak.',
    practice: `«${noun.lemma}» kelimesini **araç hâlinde** kullanarak bir cümle kur (ipucu: ${noun.singular.ins}). Yazarsan kontrol ederim.`,
    nextStep: 'Hâlleri karıştırıyorsan «hangi edat hangi hâli ister?» diye sor — edat-hâl eşleşme listesini çıkarayım.',
  });

  return {
    text: composed.text,
    confidence: 'yüksek',
    sources: ['Yerel biçimbilim motoru · isim çekimi', dictionary ? `${dictionary.unit.levelGroup} · ${dictionary.unit.title}` : 'Rusça hâl sistemi'],
    followUps: [
      `«${noun.lemma}» ile 3 örnek cümle kur`,
      `«${noun.lemma}» nasıl okunur?`,
      'Hangi edat hangi hâli ister?',
      'Canlılık kuralı nedir?',
    ],
    depth: 12 + noun.notes.length,
  };
}

function conjugationAnswer(query: string): LocalRussianAnswer | null {
  if (isEnglish()) return null;
  const target = extractTargetWord(query);
  if (!target) return null;
  const verb = conjugateVerb(target);
  if (!verb) return null;

  const dictionary = WORD_INDEX.find(item => item.ru === normalize(target));
  const meaning = dictionary ? ` (**${dictionary.word.tr}**)` : '';
  const pair = aspectPartner(verb.infinitive);

  const table = [
    `🔤 ${verb.presentLabel}`,
    `   я        ${verb.present.ya}`,
    `   ты       ${verb.present.ty}`,
    `   он/она   ${verb.present.on}`,
    `   мы       ${verb.present.my}`,
    `   вы       ${verb.present.vy}`,
    `   они      ${verb.present.oni}`,
    '',
    '⏮️ GEÇMİŞ ZAMAN (şahsa değil, cinsiyete göre!)',
    `   он ${verb.past.m}  ·  она ${verb.past.f}  ·  оно ${verb.past.n}  ·  они ${verb.past.pl}`,
    '',
    `⏭️ GELECEK: ${verb.future}`,
    `❗ EMİR: ${verb.imperative.ty} (sen) · ${verb.imperative.vy} (siz / nezaket)`,
  ];

  const composed = compose({
    headline: `**${verb.infinitive}**${meaning} → ${verb.conjugationClass}, ${verb.aspect}${verb.reflexive ? ', dönüşlü (-ся)' : ''}.`,
    explanation: [
      verb.conjugationClass === '2. çekim (-и-)'
        ? '**2. çekim** fiilleri şimdiki zamanda **-и-** ünlüsünü taşır: -ишь, -ит, -им, -ите, -ят/-ат.'
        : verb.conjugationClass === '1. çekim (-е-)'
          ? '**1. çekim** fiilleri şimdiki zamanda **-е-** ünlüsünü taşır: -ешь, -ет, -ем, -ете, -ют/-ут.'
          : 'Bu fiil **düzensizdir**; biçimleri kuraldan türetilemez, doğrudan ezberlenir.',
      'Geçmiş zamanda Rusça **şahsa göre değil cinsiyete göre** çekilir — bu Türkçeden en farklı noktadır.',
    ],
    table,
    examples: [
      { target: `Я ${verb.present.ya} каждый день.`, tr: 'Her gün … yaparım.', note: 'alışkanlık' },
      { target: `Вчера я ${verb.past.m} / ${verb.past.f}.`, tr: 'Dün … yaptım.', note: 'cinsiyete dikkat' },
      { target: `${capitalizeFirst(verb.imperative.vy)}, пожалуйста.`, tr: 'Lütfen … yapın.', note: 'kibar emir' },
    ],
    notes: [
      ...verb.notes,
      pair ? `**Görünüş çifti:** ${pair.imperfective} (süreç/tekrar) ↔ ${pair.perfective} (tek seferlik sonuç).` : 'Bu fiilin görünüş çiftini de öğrenmek, zaman seçimini kolaylaştırır.',
    ],
    pitfall: [
      '«буду» yanına **çekimli fiil** veya **bitmiş mastar** gelmez: «буду читать» ✓, «буду читаю» ✗, «буду прочитать» ✗.',
      '2. çekimde ünsüz değişmesi **yalnız «я» biçiminde** olur; diğer beş şahısta gövde normale döner.',
    ],
    practice: `«${verb.infinitive}» fiilini **geçmiş zamanda, kendi cinsiyetinle** kullanarak bir cümle kur ve yaz.`,
    nextStep: 'Görünüş seçiminde zorlanıyorsan «bitmiş ve bitmemiş fiil farkı nedir?» diye sor.',
  });

  return {
    text: composed.text,
    confidence: 'yüksek',
    sources: ['Yerel biçimbilim motoru · fiil çekimi', dictionary ? `${dictionary.unit.levelGroup} · ${dictionary.unit.title}` : 'Rusça fiil sistemi'],
    followUps: [
      `«${verb.infinitive}» ile 3 örnek cümle kur`,
      'Bitmiş ve bitmemiş fiil farkı nedir?',
      `«${verb.infinitive}» nasıl okunur?`,
      'Emir kipi nasıl kurulur?',
    ],
    depth: 14 + verb.notes.length,
  };
}

function pronunciationAnswer(query: string): LocalRussianAnswer | null {
  if (isEnglish()) return null;
  const target = extractTargetWord(query);
  if (!target) return null;
  const dictionary = WORD_INDEX.find(item => item.ru === normalize(target));
  const official = dictionary?.word.reading;
  // Müfredattaki okunuş yazımındaki vurgu işareti, ses indirgemesini kesinleştirir.
  const phonetics = readRussian(target, stressIndexFromReading(official));
  if (!phonetics) return null;

  const composed = compose({
    headline: `**${phonetics.word}** → yaklaşık okunuş: **[${official || phonetics.reading}]**${dictionary ? `  ·  anlamı: ${dictionary.word.tr}` : ''}`,
    explanation: !official
      ? ['Okunuş, aşağıdaki ses kuralları sırayla uygulanarak üretildi.']
      : sameReading(official, phonetics.reading)
        ? [`Müfredattaki resmî okunuş **${official}** ile ses motorunun kural tabanlı üretimi **birebir örtüşüyor** — yani bu okunuş kuralla da doğrulandı.`]
        : [`Müfredattaki resmî okunuş **${official}**; ses motorunun kural tabanlı üretimi ise **[${phonetics.reading}]**. Fark varsa **müfredat okunuşu esastır** (vurgu yeri orada işaretlidir).`],
    table: phonetics.rules.map(rule => `• ${rule}`),
    examples: dictionary ? examplesForWord(normalize(dictionary.word.ru), normalize(dictionary.word.tr), 2) : undefined,
    pitfall: [
      'Rusçada okunuşu belirleyen şey **vurgudur**, harf değil. Vurgu yeri değişince aynı harf başka ses verir.',
      'Türkçe okunuş yazımı yalnız **yaklaşıktır**: ы, щ, ь sesleri Türkçede birebir yoktur.',
    ],
    practice: `«${phonetics.word}» kelimesini önce yavaş, sonra normal hızda üç kez yüksek sesle söyle. Ağız kası hafızası tekrarla oluşur.`,
    nextStep: 'Genel ses kurallarını toplu görmek için «akanye ve ikanye nedir?» diye sorabilirsin.',
  });

  return {
    text: composed.text,
    confidence: official ? 'yüksek' : 'orta',
    sources: ['Yerel fonetik motoru', dictionary ? `${dictionary.unit.levelGroup} · ${dictionary.unit.title}` : 'Rusça ses kuralları'],
    followUps: [
      'Akanye ve ikanye nedir?',
      'Kelime sonu sedasızlaşma nasıl olur?',
      `«${phonetics.word}» ne demek?`,
      'Vurgu yeri nasıl bulunur?',
    ],
    depth: 4 + phonetics.rules.length,
  };
}

function numberAnswer(query: string): LocalRussianAnswer | null {
  if (isEnglish()) return null;
  const q = normalize(query);
  if (!/yas|yasinda|год|лет|kac yas/.test(q)) return null;
  const number = Number(query.match(/\d{1,3}/)?.[0]);
  if (!Number.isFinite(number) || number <= 0) return null;

  const form = yearForm(number);
  const composed = compose({
    headline: `**Мне ${number} ${form}.** — "${number} yaşındayım."`,
    explanation: [
      explainNumberAgreement(number),
      'Rusçada yaş **sahiplik** değil, **yönelme hâli** ile kurulur: kişi «мне / тебе / ему» biçimine girer.',
    ],
    table: [
      'SAYI UYUMU KURALI',
      '   1, 21, 31…      → год        (tekil yalın)',
      '   2-3-4, 22-24…   → года       (tekil ilgi)',
      '   5-20, 25-30…    → лет        (çoğul ilgi)',
      '   11, 12, 13, 14  → лет        (İSTİSNA — son rakama bakılmaz)',
    ],
    examples: [
      { target: `Мне ${number} ${form}.`, tr: `${number} yaşındayım.` },
      { target: 'Сколько тебе лет?', tr: 'Kaç yaşındasın?', note: 'soru kalıbı — daima «лет»' },
      { target: 'Моему брату 21 год.', tr: 'Kardeşim 21 yaşında.', note: 'kişi yönelme hâlinde' },
    ],
    pitfall: '«Я имею 20 лет» ✗ — bu Fransızca/Türkçe mantığıdır. Doğrusu «Мне 20 лет» ✓.',
    practice: 'Ailenden üç kişinin yaşını Rusça yaz; her birinde год/года/лет seçimini kontrol et.',
  });

  return {
    text: composed.text,
    confidence: 'yüksek',
    sources: ['Yerel sayı uyumu motoru'],
    followUps: ['Sayı-isim uyumu nasıl çalışır?', 'Saat nasıl söylenir?', 'Tarih nasıl yazılır?'],
    depth: 8,
  };
}

/* ────────────────────── DÜZELTME KURALLARI ────────────────────── */

type CorrectionHit = { corrected: string; rule: string; why: string; extra?: string };

function correctionRussian(text: string): CorrectionHit | null {
  const n = normalize(text);

  if (/^я есть\s+/.test(n)) {
    return {
      corrected: text.replace(/^я есть\s+/i, 'Я '),
      rule: 'Şimdiki zamanda **быть** kullanılmaz.',
      why: 'Rusçada ad cümlelerinde "olmak" fiili düşer: «Я студент» ✓. «есть» yalnız VARLIK vurgulanınca kalır: «У меня есть брат».',
      extra: 'Geçmiş/gelecekte geri gelir ve meslek araç hâline girer: «Он был врачом».',
    };
  }
  const ageDative = n.match(/^мне\s+(\d+)\s+(год|года|лет)$/);
  if (ageDative) {
    const number = Number(ageDative[1]);
    const right = yearForm(number);
    if (ageDative[2] !== right) {
      return {
        corrected: `Мне ${number} ${right}.`,
        rule: `Sayı-isim uyumu: ${number} → **${right}**`,
        why: explainNumberAgreement(number),
      };
    }
  }
  const haveAge = n.match(/^я имею (\d+)/);
  if (haveAge) {
    const number = Number(haveAge[1]);
    return {
      corrected: `Мне ${number} ${yearForm(number)}.`,
      rule: 'Yaş **иметь** ile söylenmez.',
      why: 'Rusçada yaş yönelme hâliyle kurulur: «Мне 20 лет». «Я имею 20 лет» Türkçeden birebir çeviridir ve doğal değildir.',
    };
  }
  if (/буду\s+[а-яё]+(ю|у|ешь|ет|ем|ете|ют|ут|ишь|ит|им|ите|ят|ат)\b/.test(n)) {
    return {
      corrected: '… буду + bitmemiş MASTAR (örn. «буду читать»)',
      rule: '«буду» yanına **çekimli fiil gelmez**.',
      why: 'Bileşik gelecek = буду + bitmemiş mastar. «Я буду читаю» ✗ → «Я буду читать» ✓.',
      extra: 'Sonucu vurgulamak istiyorsan basit gelecek kullan: «Я прочитаю».',
    };
  }
  if (/буду\s+(про|с|на|по|вы|при|за)[а-яё]+ть\b/.test(n)) {
    return {
      corrected: 'Ya «буду + bitmemiş mastar» ya da doğrudan bitmiş fiil çekimi',
      rule: '«буду» yanına **bitmiş mastar gelmez**.',
      why: '«буду прочитать» ✗. Süreç için «буду читать» ✓, sonuç için «прочитаю» ✓.',
    };
  }
  if (/\bнравлюсь\b.*\b(книгу|фильм|музыку|еду)\b/.test(n) || /^я нравлюсь /.test(n)) {
    return {
      corrected: 'Мне нравится + YALIN hâlde özne',
      rule: '**нравиться** yapısı ters kurulur.',
      why: 'Beğenen kişi **yönelme**, beğenilen şey **yalın** hâldedir ve fiil ona uyar: «Мне нравится книга», «Мне нравятся книги».',
    };
  }
  const noNominative = n.match(/\bнет\s+([а-яё]+[аояе])\b/);
  if (noNominative && /\bнет\s+(книга|время|брат|деньги|работа|машина)\b/.test(n)) {
    return {
      corrected: '… нет + İLGİ hâli (нет книги, нет времени, нет брата)',
      rule: '**нет / не было / не будет** daima ilgi hâli ister.',
      why: 'Yokluk bildiren yapıda isim yalın kalamaz: «У меня нет книга» ✗ → «У меня нет книги» ✓.',
    };
  }
  if (/\bиду в школе\b|\bеду в москве\b|\bиду в магазине\b/.test(n)) {
    return {
      corrected: '… в + BELİRTME hâli (в школу, в Москву, в магазин)',
      rule: 'Hedef (**куда?**) belirtme hâli ister.',
      why: '«Я иду в школе» "okulda yürüyorum" anlamına gelir. Hedef için «Я иду в школу» ✓; konum için «Я в школе» ✓.',
    };
  }
  if (/\bпишу с ручкой\b|\bрежу с ножом\b|\bем с ложкой\b/.test(n)) {
    return {
      corrected: '… ARAÇ hâli, edatsız (ручкой, ножом, ложкой)',
      rule: 'Araç bildiren araç hâli **edat almaz**.',
      why: '«с» eşlik bildirir (с другом = arkadaşla). Araç için edat kullanılmaz: «Я пишу ручкой» ✓.',
    };
  }
  if (/\bу его\b|\bу ее\b|\bк ему\b|\bс им\b/.test(n)) {
    return {
      corrected: 'у него / у неё / к нему / с ним',
      rule: 'Edattan sonra 3. şahıs zamirleri **н-** alır.',
      why: '«у его» ✗ → «у него» ✓. Edatsız kullanımda н- gelmez: «его книга» ✓.',
    };
  }
  if (/\bникого вижу\b|\bникто пришел\b|\bничего сказал\b/.test(n)) {
    return {
      corrected: '… ни- zamiri + **не** + fiil (никого не вижу, никто не пришёл)',
      rule: 'Rusçada **çifte olumsuzluk zorunludur**.',
      why: 'Olumsuz zamir varsa fiilin önünde «не» mutlaka bulunur: «Я никого не вижу» ✓.',
    };
  }
  if (/\bучусь русский\b|\bучусь английский\b/.test(n)) {
    return {
      corrected: 'Я учу русский (ezberliyorum) veya Я изучаю русский (sistemli öğreniyorum)',
      rule: '**-ся** fiilleri doğrudan nesne almaz.',
      why: '«учиться» öğrenci olmak demektir ve nesne alamaz: «Я учусь в университете» ✓.',
    };
  }
  if (/\bспасибо тебя\b|\bспасибо вас\b/.test(n)) {
    return {
      corrected: 'Спасибо тебе / Спасибо вам',
      rule: '**спасибо** yönelme hâli ister.',
      why: 'Teşekkür edilen kişi yönelme hâlindedir. «Спасибо за помощь» yapısında ise за + belirtme gelir.',
    };
  }
  if (/\bзвоню тебя\b|\bзвоню маму\b|\bпомогаю его\b/.test(n)) {
    return {
      corrected: 'звоню тебе / звоню маме / помогаю ему',
      rule: 'звонить ve помогать **yönelme hâli** ister.',
      why: 'Fiil yönetimi Türkçeden tahmin edilemez; bu iki fiil nesneyi belirtme değil yönelme hâlinde alır.',
    };
  }
  if (/\bхочу что ты\b/.test(n)) {
    return {
      corrected: 'Я хочу, чтобы ты пришёл.',
      rule: 'İki özne farklıysa **чтобы + geçmiş biçim** kullanılır.',
      why: '«Я хочу, что ты придёшь» ✗. Tek özne varsa mastar yeter: «Я хочу прийти» ✓.',
    };
  }
  if (/\bболее лучше\b|\bболее больше\b/.test(n)) {
    return {
      corrected: 'лучше / больше (tek başına)',
      rule: 'Çifte karşılaştırma olmaz.',
      why: '«лучше» zaten karşılaştırma biçimidir; başına «более» gelmez.',
    };
  }
  if (/\bдва книги\b|\bдва машины\b/.test(n)) {
    return {
      corrected: 'две книги / две машины',
      rule: 'Dişil isimle **две**, eril/nötr isimle **два** kullanılır.',
      why: 'Sayılar içinde yalnız «один» ve «два» cinsiyete uyar: два стола (eril) ↔ две книги (dişil).',
    };
  }
  if (/\bиз работы\b/.test(n)) {
    return {
      corrected: 'с работы',
      rule: 'Edat eşleşmesi: **на → с**, **в → из**.',
      why: '«на работе» dediğin için çıkış edatı «с» olur: «Я иду с работы» ✓.',
    };
  }
  if (/\bв этой неделе\b/.test(n)) {
    return {
      corrected: 'на этой неделе',
      rule: 'Hafta ifadeleri **на + bulunma** alır.',
      why: 'Ay/yıl «в» ile (в январе), hafta «на» ile kullanılır: «на прошлой неделе» ✓.',
    };
  }
  if (/\bработаю врач\b|\bработаю учитель\b|\bработаю инженер\b/.test(n)) {
    return {
      corrected: 'работаю врачом / учителем / инженером',
      rule: 'Meslek **araç hâli** ister.',
      why: '«работать кем?» sorusu araç hâlini çağırır: «Он работает врачом» ✓.',
    };
  }
  if (/\bна третьем этаже\b/.test(n) === false && /\bв \w+ этаже\b/.test(n)) {
    return {
      corrected: 'на … этаже',
      rule: 'Kat ifadesi **на** ile kurulur.',
      why: '«в третьем этаже» ✗ → «на третьем этаже» ✓.',
    };
  }
  if (/\bдождь падает\b/.test(n)) {
    return {
      corrected: 'Идёт дождь.',
      rule: 'Rusçada yağmur "yürür".',
      why: 'Eşdizim kuralı: «Идёт дождь» / «Идёт снег» ✓. «Дождь падает» ✗ — birebir çeviridir.',
    };
  }
  if (/\bя женат\b/.test(n) && /\b(она|жена|девушка)\b/.test(n)) {
    return {
      corrected: 'Я замужем (kadın için)',
      rule: 'Medeni durum cinsiyete göre değişir.',
      why: 'Erkek «Я женат», kadın «Я замужем» der.',
    };
  }
  if (/\bмоя фамилия большая\b/.test(n)) {
    return {
      corrected: 'Моя семья большая.',
      rule: '**фамилия** = SOYADI, **семья** = aile.',
      why: 'Bu en sık karışan yalancı dosttur. «Моя фамилия большая» = "soyadım uzun" olur.',
    };
  }
  return null;
}

function correctionEnglish(text: string): CorrectionHit | null {
  const n = normalize(text);

  const rules: Array<[RegExp, (m: RegExpMatchArray) => CorrectionHit]> = [
    [/^i am agree\b/, () => ({ corrected: 'I agree.', rule: '«agree» bir FİİLDİR.', why: '"be" ile birlikte kullanılmaz: "I am agree" ✗ → "I agree" ✓.', extra: 'Olumsuzu: "I don\'t agree" veya "I disagree".' })],
    [/^i have (\d+) years/, m => ({ corrected: `I am ${m[1]} years old.`, rule: 'Yaş «be» ile söylenir.', why: 'İngilizcede yaş sahiplikle değil durumla ifade edilir: "I am 20 years old" ✓.' })],
    [/\b(he|she|it) don ?t\b/, () => ({ corrected: "He/She/It doesn't …", rule: '3. tekilde **doesn\'t** kullanılır.', why: 'he/she/it ile "don\'t" gelmez. Ayrıca ana fiil -s almaz: "doesn\'t works" ✗ → "doesn\'t work" ✓.' })],
    [/^i am work\b/, () => ({ corrected: 'I work. / I am working.', rule: '«be + yalın fiil» birlikte kullanılmaz.', why: 'Alışkanlık için Present Simple ("I work"), şu an için Present Continuous ("I am working").' })],
    [/\bpeoples\b/, () => ({ corrected: 'people', rule: '«people» zaten çoğuldur.', why: '"peoples" yalnız "halklar" (etnik gruplar) anlamında kullanılır.' })],
    [/\b(informations|advices|furnitures|luggages|equipments|softwares|homeworks|knowledges|newses)\b/, m => {
      const right = m[1].replace(/es$/, '').replace(/s$/, '');
      return { corrected: right, rule: `«${right}» sayılamayan bir isimdir.`, why: 'Sayılamayan isimler çoğul -s eki almaz.', extra: `Miktar için: "a piece of ${right}" / "some ${right}" / "a lot of ${right}".` };
    }],
    [/\bdidn ?t (went|saw|took|made|got|ate|bought|came|said|found|gave|knew|thought|wrote)\b/, (m) => {
      const v1: Record<string, string> = { went: 'go', saw: 'see', took: 'take', made: 'make', got: 'get', ate: 'eat', bought: 'buy', came: 'come', said: 'say', found: 'find', gave: 'give', knew: 'know', thought: 'think', wrote: 'write' };
      return { corrected: `didn't ${v1[m[1]]}`, rule: '«did/didn\'t» geçmişi zaten taşır.', why: 'Yanındaki fiil YALIN hâlde kalır: "I didn\'t go" ✓.' };
    }],
    [/\b(more|most) (better|worse|easier|bigger|smaller|larger|faster|slower|best|worst)\b/, m => ({ corrected: m[2], rule: 'Çifte karşılaştırma olmaz.', why: `"${m[2]}" zaten karşılaştırma biçimidir; "more/most" ile birlikte kullanılmaz.` })],
    [/\bexplain (me|us|him|her|them)\b/, () => ({ corrected: 'explain to me / to us', rule: '«explain» dolaylı nesne alır.', why: '"Explain it to me" ✓. Benzer fiiller: describe to, say to, suggest to, mention to.' })],
    [/\bdepends of\b/, () => ({ corrected: 'depends on', rule: '«depend» edatı **on**\'dur.', why: '"It depends on the weather" ✓. "depends of" Fransızca/İtalyanca kalıntısıdır.' })],
    [/\bmarried with\b/, () => ({ corrected: 'married to', rule: '«marry» edatı **to**\'dur.', why: '"She is married to a doctor" ✓.' })],
    [/\bmake ((a|some) )?photos?\b/, () => ({ corrected: 'take a photo', rule: 'Eşdizim: fotoğraf **take** edilir.', why: '"make a photo" ✗ — Almanca/Rusça kalıntısıdır.' })],
    [/\b(do|did) (a|some) mistakes?\b/, () => ({ corrected: 'make a mistake', rule: 'Hata **make** ile yapılır.', why: 'Eşdizim grubu: make progress, make friends, make noise, make a decision.' })],
    [/\bthanks god\b/, () => ({ corrected: 'Thank God', rule: 'Kalıp sabittir.', why: '"Thank God" fiil + nesnedir; "thanks" ile "God" yan yana gelmez.' })],
    [/\bin (monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/, m => ({ corrected: `on ${m[1]}`, rule: 'Gün adlarıyla **on** kullanılır.', why: '"in" yalnız ay/yıl/uzun sürelerde: in July, in 2025, in the morning.' })],
    [/\bat the (morning|evening|afternoon)\b/, m => ({ corrected: `in the ${m[1]}`, rule: 'Günün bölümleriyle **in** kullanılır.', why: 'Yalnız "at night" kalıbı istisnadır.' })],
    [/\bi am boring\b/, () => ({ corrected: 'I am bored.', rule: '-ing yapan, -ed hisseden.', why: '"boring" sıkıcı olan şeyi, "bored" sıkılan kişiyi anlatır: "The film is boring, I am bored" ✓.' })],
    [/\bi am interesting\b/, () => ({ corrected: 'I am interested (in …).', rule: '-ing yapan, -ed hisseden.', why: '"I am interesting" = "ben ilginç biriyim" olur. İlgi duymak için "interested in" ✓.' })],
    [/\bif .* will\b/, () => ({ corrected: 'If + Present Simple, … will …', rule: '«if» sonrası **will kullanılmaz**.', why: '"If I will have time" ✗ → "If I have time, I will come" ✓. Aynı kural when/as soon as/until/before için de geçerlidir.' })],
    [/\bi have (seen|been|done|gone) .*(yesterday|last (week|year|month)|ago)\b/, () => ({ corrected: 'Past Simple kullan (I saw / I went …)', rule: 'Belirli geçmiş zaman ifadesi **Present Perfect** ile kullanılmaz.', why: 'yesterday, last week, in 2010, …ago varsa MUTLAKA Past Simple gelir.' })],
    [/\balthough .* but\b/, () => ({ corrected: 'Although …, … (but olmadan)', rule: '«although» ve «but» birlikte kullanılmaz.', why: 'İkisi de karşıtlık bağlacıdır; biri yeterlidir: "Although it was late, I went" ✓.' })],
    [/\bmust to\b/, () => ({ corrected: 'must + yalın fiil', rule: 'Kip fiillerinden sonra **to** gelmez.', why: '"I must to go" ✗ → "I must go" ✓. Aynı kural can, should, may, might için de geçerlidir.' })],
    [/\bcans\b|\bmusts\b|\bshoulds\b/, () => ({ corrected: 'can / must / should (s eki yok)', rule: 'Kip fiilleri 3. tekilde **-s almaz**.', why: '"He cans swim" ✗ → "He can swim" ✓.' })],
    [/\blook forward to (see|meet|hear|work)\b/, m => ({ corrected: `look forward to ${m[1]}ing`, rule: 'Buradaki «to» EDATTIR, mastar değil.', why: 'Edattan sonra daima V-ing gelir: "I look forward to seeing you" ✓.' })],
    [/\bi will control\b/, () => ({ corrected: 'I will check …', rule: '«control» = yönetmek/denetim altında tutmak.', why: 'Türkçedeki "kontrol etmek" (gözden geçirmek) karşılığı **check**\'tir.' })],
    [/\bmy english is not enough good\b|\bnot enough good\b/, () => ({ corrected: 'not good enough', rule: '«enough» sıfattan SONRA gelir.', why: '"good enough" ✓, "enough good" ✗. İsimden önce ise "enough time" ✓.' })],
    [/\bevery days\b|\bevery weeks\b/, () => ({ corrected: 'every day / every week', rule: '«every» tekil isim ister.', why: '"every day" ✓, "every days" ✗.' })],
    [/\bmore .* than me is\b|\bthan from\b|\bbigger from\b|\bbetter from\b/, () => ({ corrected: '… -er than …', rule: 'Karşılaştırmada **than** kullanılır.', why: '"bigger from" ✗ → "bigger than" ✓.' })],
    [/\bsince (two|three|five|\d+) (years|months|days)\b/, m => ({ corrected: `for ${m[1]} ${m[2]}`, rule: 'Süre için **for**, başlangıç noktası için **since**.', why: '"for three years" (süre) ✓ / "since 2020" (başlangıç) ✓.' })],
    [/\bhow it is called\b|\bhow do you call\b/, () => ({ corrected: 'What is it called? / What do you call this?', rule: 'İsim sorarken **what** kullanılır.', why: 'İngilizcede "how" biçim/yöntem sorar; ad sorulurken "what" gelir.' })],
  ];

  for (const [pattern, build] of rules) {
    const match = n.match(pattern);
    if (match) return build(match);
  }
  return null;
}

function correctionAnswer(query: string): LocalRussianAnswer | null {
  const english = isEnglish();
  const source = english
    ? query.match(/[A-Za-z][A-Za-z\d\s.,!?'-]*/)?.[0]?.trim()
    : query.match(/[А-Яа-яЁё][А-Яа-яЁё\d\s.,!?-]*/)?.[0]?.trim();
  if (!source) return null;
  const hit = english ? correctionEnglish(source) : correctionRussian(source);
  if (!hit) return null;

  const composed = compose({
    headline: `✅ Doğru biçim: **${hit.corrected}**`,
    explanation: [`**Kural:** ${hit.rule}`, hit.why, hit.extra || ''].filter(Boolean),
    examples: english
      ? [{ target: hit.corrected, tr: 'düzeltilmiş biçim' }]
      : [{ target: hit.corrected, tr: 'düzeltilmiş biçim' }],
    pitfall: 'Bu hata Türkçeden birebir çeviri yapıldığında ortaya çıkar. Kalıbı **bütün hâlinde** ezberlemek, kuralı tek tek uygulamaktan daha hızlı sonuç verir.',
    practice: 'Aynı kuralı kullanan kendi cümleni yaz; doğru kurduysan kural oturmuş demektir.',
    nextStep: english ? '«En sık yapılan İngilizce hatalar nelerdir?» diye sorarsan 15 maddelik listeyi çıkarırım.' : '«En sık yapılan Rusça hatalar nelerdir?» diye sorarsan 15 maddelik listeyi çıkarırım.',
  });

  return {
    text: composed.text,
    confidence: 'yüksek',
    sources: ['Yerel gramer kural motoru'],
    followUps: [
      english ? 'En sık yapılan İngilizce hatalar nelerdir?' : 'En sık yapılan Rusça hatalar nelerdir?',
      'Bu kuralı örneklerle anlat',
      'Başka bir cümlemi kontrol et',
    ],
    depth: 6,
  };
}

/* ────────────────────── BAĞLAM VE PLAN CEVAPLARI ────────────────────── */

/** Hata defterinden en sık tekrar eden gerekçeleri çıkarır. */
function weakSpotsFrom(mistakes: { reason: string }[]): string[] {
  const counts = new Map<string, number>();
  for (const mistake of mistakes) {
    const reason = (mistake.reason || '').trim();
    if (!reason) continue;
    counts.set(reason, (counts.get(reason) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([reason, count]) => (count > 1 ? `${reason} (${count}×)` : reason));
}

/** SRS kutusundan toplam/vadesi gelen kart sayısını ve en zayıf kartları özetler. */
function srsSummary(bank: { ru: string; tr: string; box: number; nextReview: number }[]) {
  const now = Date.now();
  const due = bank.filter(card => card.nextReview <= now);
  const hardest = [...bank].sort((a, b) => a.box - b.box).slice(0, 5);
  return { total: bank.length, due: due.length, hardest };
}

function progressAnswer(context: LocalRussianAgentContext): LocalRussianAnswer {
  const mistakes = context.mistakes ?? [];
  const srs = srsSummary(context.srsBank ?? []);
  const weakSpots = weakSpotsFrom(mistakes);
  const total = context.completedUnits + context.completedTopics + context.completedAlpha + context.completedGrammar;
  const percent = context.pathTotal > 0 ? Math.round((context.pathPosition / context.pathTotal) * 100) : 0;
  const bars = Math.max(0, Math.min(20, Math.round(percent / 5)));
  const bar = `${'█'.repeat(bars)}${'░'.repeat(20 - bars)}`;

  const composed = compose({
    headline: `Şu an **${context.pathPosition}/${context.pathTotal}** konumundasın (**%${percent}**) ve sıradaki durağın **${context.focusTitle}**.`,
    explanation: [
      `${bar}  %${percent}`,
      `Toplam **${total}** öğrenme birimi tamamladın.`,
    ],
    table: [
      'TAMAMLANANLAR',
      `   📚 Müfredat ünitesi     ${context.completedUnits}`,
      `   🎧 Dinleme konusu       ${context.completedTopics}`,
      `   🔤 Alfabe/okuma dersi   ${context.completedAlpha}`,
      `   🧱 Gramer temeli        ${context.completedGrammar}`,
      ...(srs.total > 0 || mistakes.length > 0 ? [
        '',
        'TEKRAR DURUMU',
        `   🔁 SRS kartı            ${srs.total} (${srs.due} tanesinin vadesi geldi)`,
        `   ⚠️ Hata defteri         ${mistakes.length} kayıt`,
      ] : []),
    ],
    notes: weakSpots.length > 0
      ? [`**En çok zorlandığın noktalar:** ${weakSpots.join(' · ')}`]
      : undefined,
    practice: srs.due > 0
      ? `Bugün için önerim: önce vadesi gelen **${srs.due} SRS kartını** bitir, sonra «${context.focusTitle}» ünitesine gir ve bitiminde 1 dakikalık hedefli testi çöz.`
      : `Bugün için önerim: «${context.focusTitle}» ünitesine gir, 10 kelimesini SRS'e ekle ve bitiminde 1 dakikalık hedefli testi çöz.`,
    nextStep: 'Daha ayrıntılı bir program istersen «bana günlük çalışma planı çıkar» diye sorabilirsin.',
  });

  return {
    text: composed.text,
    confidence: 'yüksek',
    sources: ['Yerel öğrenen kaydı'],
    followUps: ['Bana günlük çalışma planı çıkar', 'Zayıf olduğum konular neler?', `«${context.focusTitle}» konusunu anlat`],
    depth: 6 + weakSpots.length,
  };
}

/**
 * "Zayıf konularım neler?" — koçun hata defteri ve SRS kutusu üzerinden
 * kişiselleştirilmiş bir zayıflık raporu üretir. Veri yoksa dürüstçe söyler.
 */
function weaknessAnswer(context: LocalRussianAgentContext): LocalRussianAnswer {
  const mistakes = context.mistakes ?? [];
  const srs = srsSummary(context.srsBank ?? []);
  const weakSpots = weakSpotsFrom(mistakes);

  if (mistakes.length === 0 && srs.total === 0) {
    const composed = compose({
      headline: 'Henüz **hata defterinde kayıt yok** — yani sana özel bir zayıflık raporu çıkaracak veri birikmemiş.',
      explanation: [
        'Zayıf nokta analizi tahminle değil **senin gerçek hatalarınla** yapılır. Ünite testlerini ve cümle alıştırmalarını çözdükçe bu defter dolar.',
        'O zamana kadar en hızlı yol: bana kendi kurduğun cümleleri yaz. Her cümleyi kural kural kontrol edip hatanı buraya eklerim.',
      ],
      table: [
        'DEFTER DOLANA KADAR ŞUNLARI DENE',
        '   • Kendi cümleni yaz → anında kural kontrolü',
        '   • «Bana günlük çalışma planı çıkar»',
        '   • «Bitmiş ve bitmemiş fiil farkı nedir?»',
        '   • «Hangi edat hangi hâli ister?»',
      ],
      practice: 'Şimdi aklına gelen bir Rusça cümleyi yaz — ilk hata kaydını birlikte oluşturalım.',
    });
    return {
      text: composed.text,
      confidence: 'yüksek',
      sources: ['Yerel öğrenen kaydı'],
      followUps: ['Bana günlük çalışma planı çıkar', 'Nerede kaldım?', 'En sık yapılan hatalar nelerdir?'],
      depth: 4,
    };
  }

  const table: string[] = ['ZAYIFLIK RAPORU'];
  table.push(`   ⚠️ Hata kaydı            ${mistakes.length}`);
  table.push(`   🔁 SRS kartı             ${srs.total} (vadesi gelen: ${srs.due})`);
  if (weakSpots.length > 0) {
    table.push('');
    table.push('EN SIK TEKRAR EDEN HATA GEREKÇELERİ');
    weakSpots.forEach((spot, index) => table.push(`   ${index + 1}. ${spot}`));
  }
  if (srs.hardest.length > 0) {
    table.push('');
    table.push('EN ZAYIF KARTLAR (kutu seviyesi düşük)');
    srs.hardest.forEach(card => table.push(`   • ${card.ru} = ${card.tr}  ·  kutu ${card.box}`));
  }

  const recent = mistakes.slice(-3).reverse();

  const composed = compose({
    headline: `Hata defterinde **${mistakes.length} kayıt** var; aşağıda tekrar eden kalıpları çıkardım.`,
    explanation: [
      'Zayıflık, tek tek kelimelerde değil **tekrar eden gerekçelerde** saklıdır. Aynı gerekçe üç kez görünüyorsa orada bir kural eksiği vardır, dikkatsizlik değil.',
      srs.due > 0
        ? `Şu anda **${srs.due} kartın vadesi gelmiş**. Vadesi gelen kart biriktikçe tekrar etkisi hızla düşer; önce onları kapat.`
        : 'SRS kutunda vadesi gelen kart yok — tekrar disiplinin iyi durumda.',
    ],
    table,
    examples: recent.map(mistake => ({
      target: mistake.ru,
      tr: mistake.tr,
      note: mistake.reason,
    })),
    pitfall: 'Aynı hatayı üçüncü kez yapmak öğrenmeyi en çok yavaşlatan şeydir. Bir gerekçe listede tekrar ediyorsa o konuyu baştan okuman, yüz tekrar yapmaktan hızlıdır.',
    practice: weakSpots[0]
      ? `Şimdi şunu dene: «${weakSpots[0].replace(/\s*\(\d+×\)$/, '')}» konusuyla ilgili bir cümle kur ve bana yaz. Doğru kurarsan o gerekçeyi defterden silebiliriz.`
      : 'Son hatandaki cümleyi doğru biçimiyle tekrar yaz ve bana gönder.',
    nextStep: 'Bu konuların kuralını tek tek anlatmamı istersen gerekçenin adını yazman yeterli.',
  });

  return {
    text: composed.text,
    confidence: 'yüksek',
    sources: ['Yerel öğrenen kaydı · hata defteri', 'Yerel öğrenen kaydı · SRS kutusu'],
    followUps: [
      ...weakSpots.slice(0, 2).map(spot => `${spot.replace(/\s*\(\d+×\)$/, '')} konusunu anlat`),
      'Bana günlük çalışma planı çıkar',
      'Nerede kaldım?',
    ],
    depth: 6 + weakSpots.length + srs.hardest.length,
  };
}

function studyPlanAnswer(context: LocalRussianAgentContext): LocalRussianAnswer {
  const dueCards = srsSummary(context.srsBank ?? []).due;
  const weakSpots = weakSpotsFrom(context.mistakes ?? []);
  const total = context.completedUnits + context.completedTopics + context.completedAlpha + context.completedGrammar;
  const stage = total < 15 ? 'başlangıç' : total < 60 ? 'temel' : total < 150 ? 'orta' : 'ileri';
  const english = isEnglish();
  const lang = english ? 'İngilizce' : 'Rusça';

  const focusByStage: Record<string, string> = {
    başlangıç: english
      ? 'Ses sistemi ve okuma kuralları + Present Simple + temel 300 kelime. Günlük hedef: 8 yeni kelime.'
      : 'Kiril alfabesi otomatikleşsin + akanye/ikanye + yalın-belirtme hâlleri + temel 300 kelime. Günlük hedef: 8 yeni kelime.',
    temel: english
      ? 'Past Simple ve Future, countable/uncountable, in/on/at edatları. Günlük hedef: 10 yeni kelime + 1 ünite.'
      : 'Altı hâlin tamamına giriş, geçmiş/gelecek zaman, görünüş sezgisi. Günlük hedef: 10 yeni kelime + 1 ünite.',
    orta: english
      ? 'Present Perfect ↔ Past Simple ayrımı, koşul cümleleri, phrasal verb\'ler. Üretim kanalını (yazma) artır.'
      : 'Görünüş seçimi bilinçli hâle gelsin, hareket fiili önekleri, который yan cümlesi. Üretim kanalını artır.',
    ileri: english
      ? 'Reported speech, passive, eşdizim duyarlılığı ve üslup farkları. Haftada 1 uzun yazma şart.'
      : 'Ortaç/ulaç, edilgen yapı, deyimler ve üslup farkları. Haftada 1 uzun yazma şart.',
  };

  const composed = compose({
    headline: `Şu an **${stage}** aşamadasın (${total} birim tamamlandı, konum ${context.pathPosition}/${context.pathTotal}). Aşağıdaki 45 dakikalık rutin senin için ölçeklendi.`,
    explanation: [
      `**Bu aşamanın odağı:** ${focusByStage[stage]}`,
      'Rutin dört kanalı dengeler: **tekrar · yeni içerik · dinleme · üretim**. Tek kanala yüklenmek plato yaratır.',
      ...(dueCards > 0
        ? [`⚠️ Şu anda **${dueCards} SRS kartının vadesi gelmiş**. Bugünün ilk 10 dakikası pazarlıksız olarak bunlara ayrılmalı.`]
        : []),
      ...(weakSpots.length > 0
        ? [`🎯 Hata defterine göre bu hafta özellikle şuna odaklan: **${weakSpots[0].replace(/\s*\(\d+×\)$/, '')}**.`]
        : []),
    ],
    table: [
      'GÜNLÜK 45 DAKİKA',
      '   10 dk  🔁 SRS tekrarı (vadesi gelen kartlar — pazarlıksız)',
      `   15 dk  📘 Yeni içerik («${context.focusTitle}» ile başla)`,
      '   10 dk  🎧 Dinleme (ilk tur altyazısız, kesintisiz)',
      '   10 dk  ✍️ Üretim (yazma veya yüksek sesle konuşma)',
      '',
      'HAFTALIK EKLER',
      '    1 ×  📝 Deneme sınavı (yalnız öğrendiklerinden)',
      '    1 ×  🎬 Uzun dinleme (15+ dakika)',
      `    1 ×  📄 Yazma (${english ? '100-150' : '80-120'} kelime)`,
    ],
    pitfall: [
      '**Süreklilik > yoğunluk:** Her gün 30 dakika, haftada bir 4 saatten kesinlikle daha etkilidir.',
      '**Üretim olmadan girdi akıcılık üretmez.** "Anlıyorum ama konuşamıyorum" şikâyetinin tek sebebi budur.',
      'Aynı hatayı üçüncü kez yapmak öğrenmeyi en çok yavaşlatan şeydir — hata günlüğü tut.',
    ],
    practice: `Bugün şununla başla: «${context.focusTitle}» ünitesini aç, 10 kelimesini SRS'e ekle ve bir cümlesini kendi kelimelerinle yeniden kur.`,
    nextStep: `${lang} seviyeni netleştirmek istersen «hangi seviyedeyim?» diye sorabilirsin.`,
  });

  return {
    text: composed.text,
    confidence: 'yüksek',
    sources: ['Yerel öğrenen kaydı', 'Çalışma planı uzmanlık kaydı'],
    followUps: ['Nerede kaldım?', 'Hangi seviyedeyim?', 'Zayıf konularımı nasıl kapatırım?', 'Sınav taktiği ver'],
    depth: 10,
  };
}

/** Küçük yardımcılar — büyük harf ve okunuş karşılaştırması. */
function capitalizeFirst(value: string): string {
  return value ? value.charAt(0).toLocaleUpperCase('ru-RU') + value.slice(1) : value;
}

function sameReading(a: string, b: string): boolean {
  const strip = (value: string) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('tr-TR')
    .replace(/[^a-zçğıöşü']/g, '');
  return strip(a) === strip(b);
}

/* ────────────────────── KARŞILAŞTIRMA MOTORU ────────────────────── */

interface ContrastPair {
  /** Sorguda aranacak tetikleyiciler (normalize edilmiş). */
  triggers: string[][];
  left: string;
  right: string;
  rule: string;
  leftPoints: string[];
  rightPoints: string[];
  examples: { target: string; tr: string; note?: string }[];
  pitfall: string;
  practice: string;
}

/**
 * Türk öğrencilerin EN ÇOK sorduğu ikilikler. Bilgi bankasından iki ayrı bölüm
 * çekip yan yana koymak yerine, bu ikilikler için ayırıcı ölçütü doğrudan veriyoruz.
 */
const RU_CONTRASTS: ContrastPair[] = [
  {
    triggers: [['в', 'на']],
    left: 'в (içinde)', right: 'на (üstünde / açık alanda)',
    rule: 'Ayırıcı ölçüt mantık değil **gelenektir**: в kapalı hacim, на yüzey ve etkinlik alanı — ama liste ezberlenir.',
    leftPoints: [
      'Kapalı/sınırlı hacim: **в доме, в комнате, в школе, в магазине, в театре, в музее, в городе, в машине**.',
      'Ülke ve şehirler daima в: **в России, в Турции, в Москве, в Стамбуле**.',
      'Yön sorusunda (куда?) belirtme hâli: **Я иду в школу**. Yer sorusunda (где?) bulunma hâli: **Я в школе**.',
    ],
    rightPoints: [
      'Yüzey ve açık alan: **на столе, на улице, на этаже, на острове**.',
      'Etkinlik ve kurum istisnaları (ezberlenir): **на работе, на почте, на вокзале, на уроке, на концерте, на стадионе, на заводе, на рынке**.',
      'Ulaşım aracı ile: **на автобусе, на машине, на поезде** (içinde olmak vurgulanırsa в автобусе).',
    ],
    examples: [
      { target: 'Я работаю в офисе, но сегодня я на работе дома.', tr: 'Ofiste çalışıyorum ama bugün evden çalışıyorum.', note: 'офис = в, работа = на' },
      { target: 'Книга на столе, а тетрадь в сумке.', tr: 'Kitap masanın üstünde, defter çantanın içinde.', note: 'yüzey ↔ hacim' },
      { target: 'Я иду в университет. Я уже в университете.', tr: 'Üniversiteye gidiyorum. Üniversitedeyim.', note: 'куда? belirtme → где? bulunma' },
    ],
    pitfall: '**«на работу / на работе»** en sık hata kaynağıdır — Türkçe "işe/işte" mantığı в dedirtir ama Rusça на ister. Aynı şekilde **на почте, на вокзале, на уроке**.',
    practice: 'Şu beş yeri в mi на mı ile yaz: вокзал, театр, урок, магазин, улица. Cevabını gönder, kontrol edeyim.',
  },
  {
    triggers: [['идти', 'ходить'], ['ити', 'ходит'], ['идти', 'ходит']],
    left: 'идти (tek yön, şu an)', right: 'ходить (alışkanlık, gidip gelme)',
    rule: 'Ayırıcı ölçüt **yön ve tekrardır**: идти tek seferlik ve tek yönlü, ходить tekrarlı veya gidip-gelmeli.',
    leftPoints: [
      'Şu anda, belirli bir seferde, tek yönde: **Я иду в школу** = şu an okula gidiyorum.',
      'Geçmişte süreç: **Я шёл домой и встретил друга** = eve gidiyordum ve bir arkadaşa rastladım.',
      'Yakın gelecek planı için de kullanılır: **Завтра я иду в театр**.',
    ],
    rightPoints: [
      'Alışkanlık / tekrar: **Я хожу в школу** = okula giderim (öğrenciyim).',
      'Gidip geri dönme: **Вчера я ходил в кино** = sinemaya gittim ve döndüm.',
      'Yetenek: **Ребёнок уже ходит** = çocuk artık yürüyebiliyor.',
    ],
    examples: [
      { target: 'Сейчас я иду на работу, обычно я хожу пешком.', tr: 'Şu an işe gidiyorum, genelde yürüyerek giderim.', note: 'tek sefer ↔ alışkanlık' },
      { target: 'В субботу мы ходили в музей.', tr: 'Cumartesi müzeye gittik (ve döndük).', note: 'gidip gelme' },
      { target: 'Куда ты идёшь?', tr: 'Nereye gidiyorsun?', note: 'şu an, tek yön' },
    ],
    pitfall: 'Araçla gidiliyorsa fiil değişir: yürüyerek **идти/ходить**, araçla **ехать/ездить**. «Я иду в Москву» ✗ → «Я еду в Москву» ✓.',
    practice: 'Şu üç cümleyi Rusça yaz: (1) Şu an eve gidiyorum. (2) Her gün spora giderim. (3) Dün doktora gittim.',
  },
  {
    triggers: [['ехать', 'ездить']],
    left: 'ехать (araçla, tek yön)', right: 'ездить (araçla, tekrar)',
    rule: 'идти/ходить ikiliğinin **araçlı** karşılığı. Mantık birebir aynıdır.',
    leftPoints: ['Şu an, tek yön: **Я еду в Москву**.', 'Belirli bir seyahat: **Завтра я еду к бабушке**.'],
    rightPoints: ['Alışkanlık: **Я езжу на работу на метро**.', 'Gidip gelme: **Летом я ездил в Сочи**.'],
    examples: [
      { target: 'Я еду в аэропорт на такси.', tr: 'Havaalanına taksiyle gidiyorum.', note: 'tek sefer' },
      { target: 'Каждое лето мы ездим в деревню.', tr: 'Her yaz köye gideriz.', note: 'tekrar' },
    ],
    pitfall: 'Şehir içi kısa mesafede bile araç varsa **ехать** kullanılır; yürüyorsan **идти**. Türkçede ikisi de "gitmek" olduğu için karışır.',
    practice: '«Yarın İzmir\'e gidiyorum» ve «Her yıl Rusya\'ya giderim» cümlelerini Rusça yaz.',
  },
  {
    triggers: [['знать', 'уметь'], ['знать', 'мочь'], ['уметь', 'мочь']],
    left: 'знать / уметь', right: 'мочь',
    rule: '**знать** = bilgiye sahip olmak, **уметь** = öğrenilmiş beceri, **мочь** = o an imkân/izin olması.',
    leftPoints: [
      '**знать** + nesne: Я знаю русский язык. Я знаю, где он.',
      '**уметь** + bitmemiş mastar (beceri): Я умею плавать = yüzme biliyorum.',
    ],
    rightPoints: [
      '**мочь** + mastar (fiziksel imkân/izin): Я не могу прийти = gelemem (şartlar uygun değil).',
      'Rica: **Вы можете помочь?** = Yardım edebilir misiniz?',
    ],
    examples: [
      { target: 'Я умею водить машину, но сегодня не могу — я устал.', tr: 'Araba kullanmayı biliyorum ama bugün kullanamam — yorgunum.', note: 'beceri ↔ imkân' },
      { target: 'Он знает ответ, но не может сказать.', tr: 'Cevabı biliyor ama söyleyemiyor.', note: 'bilgi ↔ imkân' },
    ],
    pitfall: 'Türkçe "biliyorum" her üçünü de karşıladığı için en çok burada hata yapılır: «Я знаю плавать» ✗ → «Я умею плавать» ✓.',
    practice: '«Rusça konuşabiliyorum», «Yarın gelemem», «Adresini biliyorum» cümlelerini Rusça yaz.',
  },
  {
    triggers: [['говорить', 'сказать'], ['говорить', 'рассказать']],
    left: 'говорить (bitmemiş)', right: 'сказать (bitmiş)',
    rule: 'Aynı anlamın **görünüş çiftidir**: говорить süreç/tekrar, сказать tek seferlik söz.',
    leftPoints: ['Konuşma süreci: **Мы говорили два часа**.', 'Dil bilmek: **Я говорю по-русски**.'],
    rightPoints: ['Tek bir söz: **Он сказал «да»**.', 'Emir: **Скажите, пожалуйста…** = Söyler misiniz…'],
    examples: [
      { target: 'Она говорила долго, но ничего не сказала.', tr: 'Uzun konuştu ama hiçbir şey söylemedi.', note: 'süreç ↔ sonuç' },
      { target: 'Скажите, где метро?', tr: 'Söyler misiniz, metro nerede?', note: 'bitmiş emir — kibar' },
    ],
    pitfall: '«Я говорю по-русски» ✓ ama «Я скажу по-русски» ✗ — dil bilmek süreklilik olduğu için daima bitmemiştir.',
    practice: 'говорить/сказать ile biri süreç biri sonuç anlatan iki cümle yaz.',
  },
  {
    triggers: [['тоже', 'также']],
    left: 'тоже', right: 'также',
    rule: '**тоже** = "ben de" (aynı özellik başkasında da var), **также** = "ayrıca/bir de" (ek bilgi ekler).',
    leftPoints: ['Benzerlik: **Я тоже студент** = Ben de öğrenciyim.', 'Konuşma dilinde çok daha sık.'],
    rightPoints: ['Ekleme: **Я также изучаю английский** = Ayrıca İngilizce de öğreniyorum.', 'Yazı dilinde ve resmî üslupta tercih edilir.'],
    examples: [
      { target: 'Он врач. Я тоже врач.', tr: 'O doktor. Ben de doktorum.', note: 'aynı özellik' },
      { target: 'Я изучаю русский, а также историю.', tr: 'Rusça öğreniyorum, ayrıca tarih de.', note: 'ek bilgi' },
    ],
    pitfall: 'Olumsuzda **тоже** değil **тоже не** ya da **не… тоже** değil, doğrusu «Я тоже не знаю» ✓ = Ben de bilmiyorum.',
    practice: 'тоже ve также ile birer cümle yaz; farkı açıklayabiliyor musun?',
  },
  {
    triggers: [['этот', 'тот'], ['это', 'этот']],
    left: 'это (bu … -dir)', right: 'этот / эта / эти (bu …)',
    rule: '**это** yüklem kuran bir tanıtma sözüdür ve değişmez; **этот** ise ismi niteleyen işaret sıfatıdır, cinsiyet ve hâle uyar.',
    leftPoints: ['**Это книга** = Bu bir kitaptır. (tanıtma)', '**Это мой друг** = Bu benim arkadaşım.'],
    rightPoints: ['**Этот дом большой** = Bu ev büyük. (niteleme)', 'Uyum: этот дом / эта книга / это окно / эти люди.'],
    examples: [
      { target: 'Это книга. Эта книга интересная.', tr: 'Bu bir kitap. Bu kitap ilginç.', note: 'tanıtma ↔ niteleme' },
      { target: 'Я читаю эту книгу.', tr: 'Bu kitabı okuyorum.', note: 'belirtme hâlinde uyum' },
    ],
    pitfall: '«Это книга интересная» ✗ karışık bir yapıdır. Ya «Это интересная книга» ✓ ya da «Эта книга интересная» ✓.',
    practice: 'Aynı isimle biri это biri этот kullanan iki cümle yaz.',
  },
  {
    triggers: [['мой', 'свой']],
    left: 'мой / твой / его…', right: 'свой',
    rule: '**свой** = "öznenin kendi"si. Özne ile iyelik aynı kişiyse свой kullanılır.',
    leftPoints: ['Sahibi özneden farklıysa: **Я читаю его книгу** = Onun kitabını okuyorum.'],
    rightPoints: ['Sahibi özne ise: **Я читаю свою книгу** = Kendi kitabımı okuyorum.', '1. ve 2. şahısta seçimlik, **3. şahısta zorunludur**.'],
    examples: [
      { target: 'Он любит свою жену.', tr: 'Karısını (kendi karısını) seviyor.', note: 'свой — özne = sahip' },
      { target: 'Он любит его жену.', tr: 'Onun (başkasının) karısını seviyor.', note: 'его — farklı kişi' },
    ],
    pitfall: 'Bu iki cümle Türkçede aynı görünür ama Rusçada **anlamı tamamen değiştirir**. 3. şahısta свой atlamak ciddi anlam kaymasıdır.',
    practice: '«Kardeşim kendi arabasını sattı» cümlesini свой ile Rusça yaz.',
  },
  {
    triggers: [['нет', 'не']],
    left: 'не (fiil/sözcük olumsuzlar)', right: 'нет (yokluk / "hayır")',
    rule: '**не** olumsuzlanacak sözcüğün önüne gelir; **нет** ise varlığı reddeder ve ardından **ilgi hâli** gelir.',
    leftPoints: ['**Я не читаю** = Okumuyorum.', '**Не я, а он** = Ben değil, o.'],
    rightPoints: ['**У меня нет книги** = Kitabım yok. (книг**и** — ilgi hâli)', '**Нет, спасибо** = Hayır, teşekkürler.'],
    examples: [
      { target: 'У меня нет времени, поэтому я не могу прийти.', tr: 'Vaktim yok, bu yüzden gelemem.', note: 'нет + ilgi ↔ не + fiil' },
      { target: 'Здесь нет магазина.', tr: 'Burada mağaza yok.', note: 'нет → ilgi hâli' },
    ],
    pitfall: '«У меня нет книга» ✗ — нет **daima** ilgi hâli ister: «У меня нет книги» ✓.',
    practice: 'нет ile üç yokluk cümlesi yaz (para, zaman, kardeş) ve ilgi hâli eklerini kontrol et.',
  },
  {
    triggers: [['делать', 'сделать'], ['писать', 'написать'], ['читать', 'прочитать'], ['смотреть', 'посмотреть']],
    left: 'bitmemiş (несов.)', right: 'bitmiş (сов.)',
    rule: 'Ayırıcı ölçüt **sonuç**tur: bitmemiş süreci/tekrarı, bitmiş tamamlanmayı anlatır.',
    leftPoints: [
      'Süreç, süre, tekrar, alışkanlık: **Я читал книгу** = kitap okuyordum (bitirdim mi belli değil).',
      'Şimdiki zaman **yalnız** bitmemişte vardır: читаю ✓.',
      'Gelecek: **буду читать** (uzayan/tekrarlı).',
    ],
    rightPoints: [
      'Tek seferlik, sonuçlanmış eylem: **Я прочитал книгу** = kitabı okudum ve bitirdim.',
      'Bitmiş fiilin **şimdiki zamanı yoktur**; çekimli biçimi **gelecek** anlatır: прочитаю = okuyacağım.',
      'Olumsuz emir daima bitmemiş: **Не читай!** ✓, Не прочитай ✗.',
    ],
    examples: [
      { target: 'Вчера я читал книгу два часа, но не прочитал её.', tr: 'Dün iki saat kitap okudum ama bitiremedim.', note: 'süreç ↔ sonuç aynı cümlede' },
      { target: 'Я напишу письмо и отправлю его.', tr: 'Mektubu yazacağım ve göndereceğim.', note: 'bitmiş = gelecek' },
    ],
    pitfall: '«Я буду прочитать» ✗ — буду yanına **asla** bitmiş mastar gelmez. Doğrusu ya «буду читать» ya da «прочитаю».',
    practice: 'Aynı fiili önce bitmemiş sonra bitmiş görünüşle kullanarak iki cümle yaz.',
  },
];

const EN_CONTRASTS: ContrastPair[] = [
  {
    triggers: [['present', 'perfect', 'past'], ['present perfect', 'past simple'], ['have', 'did']],
    left: 'Present Perfect (have/has + V3)', right: 'Past Simple (V2)',
    rule: 'Ayırıcı ölçüt **zamanın bitip bitmediğidir**: belirli bitmiş zaman ifadesi varsa Past Simple, yoksa Present Perfect.',
    leftPoints: [
      'Zamanı belirtilmemiş, sonucu bugüne bağlanan olay: **I have lost my keys** (hâlâ kayıp).',
      'Deneyim: **Have you ever been to Russia?**',
      'Birlikte kullanılanlar: just, already, yet, ever, never, since, for, recently.',
    ],
    rightPoints: [
      'Bitmiş zaman ifadesi var: **I lost my keys yesterday.**',
      'Birlikte kullanılanlar: yesterday, last week, in 2019, two days ago, when I was a child.',
      'Hikâye anlatımı daima Past Simple ile yürür.',
    ],
    examples: [
      { target: 'I have finished my homework. / I finished it an hour ago.', tr: 'Ödevimi bitirdim. / Bir saat önce bitirdim.', note: 'zaman belirtilince Past Simple' },
      { target: 'She has lived here for ten years.', tr: 'On yıldır burada yaşıyor.', note: 'hâlâ devam ediyor' },
    ],
    pitfall: '«I have seen him yesterday» ✗ — **yesterday** bitmiş bir zamandır, Present Perfect ile kullanılmaz: «I saw him yesterday» ✓.',
    practice: 'Aynı olayı önce Present Perfect sonra Past Simple ile yaz; ikinci cümleye zaman ifadesi ekle.',
  },
  {
    triggers: [['in', 'on', 'at'], ['in', 'at'], ['on', 'at']],
    left: 'in / on', right: 'at',
    rule: 'Kapsam daraldıkça edat değişir: **in** (geniş: ay, yıl, şehir) → **on** (yüzey, gün) → **at** (nokta: saat, adres).',
    leftPoints: [
      '**in**: in 2024, in May, in the morning, in Istanbul, in the box.',
      '**on**: on Monday, on 5 May, on the table, on the wall, on the bus.',
    ],
    rightPoints: [
      '**at**: at 7 o\'clock, at night, at home, at work, at the station, at the door.',
      'Nokta/kurum vurgusu: at school (öğrenci olarak), in the school (bina içinde).',
    ],
    examples: [
      { target: 'I was born in 1998, on 3 March, at 6 a.m.', tr: '1998\'de, 3 Mart\'ta, sabah 6\'da doğdum.', note: 'geniş → dar sıralaması' },
      { target: 'She is at work now, but the file is in her bag on the desk.', tr: 'Şu an işte ama dosya masadaki çantasında.', note: 'üçü bir arada' },
    ],
    pitfall: '«in Monday» ✗ → «on Monday» ✓. «in night» ✗ → «at night» ✓ ama «in the morning» ✓ — bu üçü ezberlenir.',
    practice: 'Doğum tarihini yıl, gün ve saat olarak üç ayrı cümlede yaz; her birinde doğru edatı seç.',
  },
  {
    triggers: [['make', 'do']],
    left: 'make (üretmek, ortaya çıkarmak)', right: 'do (yapmak, eylemi yürütmek)',
    rule: '**make** sonunda bir şey ORTAYA ÇIKAR; **do** bir işi/eylemi YÜRÜTÜR. Çoğu kullanım kalıptır.',
    leftPoints: ['make a cake, make a mistake, make a decision, make money, make noise, make friends, make a plan.'],
    rightPoints: ['do homework, do the dishes, do business, do a favour, do research, do exercise, do your best.'],
    examples: [
      { target: 'I made a mistake while doing my homework.', tr: 'Ödevimi yaparken bir hata yaptım.', note: 'ikisi aynı cümlede' },
      { target: 'Let\'s make a decision and do the work.', tr: 'Bir karar verelim ve işi yapalım.' },
    ],
    pitfall: 'Türkçede ikisi de "yapmak" olduğu için en sık karıştırılan ikilidir: «do a mistake» ✗ → «make a mistake» ✓.',
    practice: 'make ve do ile beşer kalıp yaz; sonra cümle içinde kullan.',
  },
  {
    triggers: [['will', 'going to'], ['going to', 'will']],
    left: 'will', right: 'be going to',
    rule: 'Ayırıcı ölçüt **kararın ne zaman alındığıdır**: will o anda, going to önceden.',
    leftPoints: ['Anlık karar: **The phone is ringing — I\'ll get it.**', 'Tahmin/söz/teklif: I think it will rain. I\'ll help you.'],
    rightPoints: ['Önceden yapılmış plan: **I\'m going to study medicine.**', 'Gözle görülür kanıta dayalı tahmin: **Look at those clouds — it\'s going to rain.**'],
    examples: [
      { target: 'I\'m going to visit my aunt tomorrow. — Really? I\'ll come with you!', tr: 'Yarın teyzemi ziyaret edeceğim. — Gerçekten mi? Ben de geleceğim!', note: 'plan ↔ anlık karar' },
    ],
    pitfall: 'Planlanmış şeyler için will kullanmak kulağa doğal gelmez: «I will study medicine next year» yerine «I\'m going to…» ✓.',
    practice: 'Bir planını going to ile, bir anlık kararını will ile yaz.',
  },
  {
    triggers: [['gerund', 'infinitive'], ['ing', 'to']],
    left: 'V-ing (gerund)', right: 'to + V (infinitive)',
    rule: 'Hangisinin geleceğini **önceki fiil** belirler; liste olarak öğrenilir.',
    leftPoints: ['enjoy, avoid, finish, mind, suggest, practise, keep, miss + **V-ing**.', 'Edattan sonra daima V-ing: good at swimm**ing**, interested in learn**ing**.'],
    rightPoints: ['want, decide, hope, plan, promise, agree, learn, afford + **to V**.', 'Amaç bildirir: I came here **to learn** Russian.'],
    examples: [
      { target: 'I enjoy reading, so I decided to buy more books.', tr: 'Okumayı seviyorum, bu yüzden daha fazla kitap almaya karar verdim.', note: 'enjoy + ing / decide + to' },
      { target: 'I stopped smoking. / I stopped to smoke.', tr: 'Sigarayı bıraktım. / Sigara içmek için durdum.', note: 'anlamı değiştiren fiiller' },
    ],
    pitfall: '«I enjoy to read» ✗ → «I enjoy reading» ✓. stop / remember / forget / try ikisini de alır ama **anlam değişir**.',
    practice: 'enjoy, decide, avoid, want, practise fiillerinin her biriyle bir cümle yaz.',
  },
];

/** Sorguda hangi hazır karşıtlığın geçtiğini bulur. */
function findContrast(query: string): ContrastPair | null {
  const haystack = ` ${normalize(query)} `;
  const pool = isEnglish() ? EN_CONTRASTS : RU_CONTRASTS;
  let best: { pair: ContrastPair; hits: number } | null = null;
  for (const pair of pool) {
    for (const triggerSet of pair.triggers) {
      const hits = triggerSet.filter(token => haystack.includes(` ${token} `) || haystack.includes(`${token} `)).length;
      if (hits === triggerSet.length && (!best || hits > best.hits)) best = { pair, hits };
    }
  }
  return best?.pair ?? null;
}

function comparisonAnswer(query: string, intent: RussianQuestionIntent): LocalRussianAnswer | null {
  // 1) Önce elle hazırlanmış ayırıcı ölçüt tablosunu dene — en net cevap burada.
  const contrast = findContrast(query);
  if (contrast) {
    const composed = compose({
      headline: `**${contrast.left}** ↔ **${contrast.right}** — ${contrast.rule}`,
      explanation: 'Aşağıdaki tablo iki tarafı yan yana koyuyor; önce ölçütü oku, sonra örneklere bak.',
      table: compareTable(
        { title: contrast.left, points: contrast.leftPoints },
        { title: contrast.right, points: contrast.rightPoints },
      ),
      examples: contrast.examples,
      pitfall: contrast.pitfall,
      practice: contrast.practice,
      nextStep: 'Kendi cümlelerini yazıp gönderirsen hangi tarafı seçmen gerektiğini tek tek işaretlerim.',
    });
    return {
      text: composed.text,
      confidence: 'yüksek',
      sources: [`Yerel karşılaştırma motoru · ${contrast.left} ↔ ${contrast.right}`],
      followUps: [
        `${contrast.left} nasıl kullanılır?`,
        `${contrast.right} nasıl kullanılır?`,
        'Bu konuda beni test et',
        'Benzer başka ikilikler var mı?',
      ],
      depth: 12,
    };
  }

  if (intent !== 'comparison') return null;

  // 2) İki sözlük kelimesi karşılaştırılıyorsa anlam farkını sözlükten ver.
  const targetTokens = [...new Set(normalize(query).split(/\s+/).filter(token => token.length >= 3 && isTargetScript(token)))];
  if (targetTokens.length >= 2) {
    const found = targetTokens
      .map(token => WORD_INDEX.find(item => item.ru === token) ?? RU_LEMMA_INDEX.get(token)?.[0])
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .slice(0, 2);
    if (found.length === 2) {
      const composed = compose({
        headline: `**${found[0].word.ru}** = ${found[0].word.tr}  ↔  **${found[1].word.ru}** = ${found[1].word.tr}`,
        explanation: 'İki kelimeyi müfredat sözlüğünden karşılaştırdım; altta her birinin kendi bağlamından örnek cümleleri var.',
        table: compareTable(
          { title: `${found[0].word.ru} — ${found[0].word.tr}`, points: [found[0].word.usageNote || `${found[0].unit.levelGroup} · ${found[0].unit.title} ünitesinde geçer.`] },
          { title: `${found[1].word.ru} — ${found[1].word.tr}`, points: [found[1].word.usageNote || `${found[1].unit.levelGroup} · ${found[1].unit.title} ünitesinde geçer.`] },
        ),
        examples: [...examplesForWord(found[0].ru, normalize(found[0].word.tr), 1), ...examplesForWord(found[1].ru, normalize(found[1].word.tr), 1)],
        pitfall: 'İki kelime Türkçeye aynı çevrilse bile kullanım bağlamı farklı olabilir; örnek cümlelerdeki eşdizimlere dikkat et.',
        practice: 'Her iki kelimeyle birer cümle yaz; hangisinin nereye oturduğunu birlikte kontrol edelim.',
      });
      return {
        text: composed.text,
        confidence: 'yüksek',
        sources: [`${found[0].unit.levelGroup} · ${found[0].unit.title}`, `${found[1].unit.levelGroup} · ${found[1].unit.title}`],
        followUps: [`«${found[0].word.ru}» ne demek?`, `«${found[1].word.ru}» ne demek?`, 'İkisini bir cümlede nasıl kullanırım?'],
        depth: 9,
      };
    }
  }

  // 3) Son çare: bilgi bankasından iki yakın bölümü yan yana koy.
  const knowledge = searchRussianKnowledge(query, 4, intent);
  const [first, second] = knowledge;
  // İkinci kayıt birinciye yeterince yakın değilse karşılaştırma zorlama — tek konu anlat.
  if (!first || !second || first.score < 14 || second.score < first.score * 0.55) return null;

  const splitPoints = (content: string) => content
    .split(/(?<=\.)\s+/)
    .filter(sentence => sentence.trim().length > 25)
    .slice(0, 4)
    .map(sentence => sentence.trim());

  const composed = compose({
    headline: `**${first.entry.title}** ↔ **${second.entry.title}** — bu iki konuyu ayıran şey **kullanım bağlamıdır**; aşağıda yan yana koydum.`,
    table: compareTable(
      { title: first.entry.title, points: splitPoints(first.entry.content) },
      { title: second.entry.title, points: splitPoints(second.entry.content) },
    ),
    pitfall: 'Karşılaştırmalı konularda hata, iki yapıyı "aynı şeyin iki yolu" sanmaktan çıkar. Ayırıcı ölçütü (anlam, hâl, görünüş, resmiyet) bir kez netleştirirsen seçim otomatikleşir.',
    practice: 'Her iki yapı için birer cümle yaz ve bana gönder; hangisini nerede kullandığını birlikte kontrol edelim.',
  });

  return {
    text: composed.text,
    confidence: 'yüksek',
    sources: [first.entry.title, second.entry.title],
    followUps: [`${first.entry.title} konusunu örneklerle anlat`, `${second.entry.title} konusunu örneklerle anlat`, 'Hangi durumda hangisini seçerim?'],
    depth: 8,
  };
}

/* ────────────────────── BİLGİ BANKASI CEVABI ────────────────────── */

function splitIntoParagraphs(content: string, maxParts: number): string[] {
  const sentences = content.split(/(?<=\.)\s+/).map(part => part.trim()).filter(Boolean);
  if (sentences.length <= 1) return [content];
  const perPart = Math.ceil(sentences.length / maxParts);
  const parts: string[] = [];
  for (let i = 0; i < sentences.length; i += perPart) {
    parts.push(sentences.slice(i, i + perPart).join(' '));
  }
  return parts.slice(0, maxParts);
}

/** Müfredat kaydı id'sinden (curriculum-expert-<unitId>) üniteyi bulur. */
const UNIT_BY_ID = new Map(UNITS_DATA.map(unit => [unit.id, unit]));

/** Gramer açıklamasını numaralı maddelere ayırır: "1. … 2. … 3. …" */
function splitNumberedSteps(text: string): string[] {
  // "📌 ÜNİTE ODAĞI — Kültür: Banya (Rus Hamamı):" başlığının tamamını at;
  // içinde iki nokta geçtiği için satırın yarısı artık olarak kalıyordu.
  const cleaned = text.replace(/^\s*📌[\s\S]*?(?=\d{1,2}\.\s)/, '').trim();
  const parts = cleaned.split(/\s*(?=\d{1,2}\.\s)/).map(part => part.trim()).filter(Boolean);
  const steps = parts.length < 2
    ? (cleaned ? [cleaned] : [])
    : parts.map(part => part.replace(/^\d{1,2}\.\s*/, ''));
  // Her ünitede aynen tekrar eden dolgu cümlesi bilgi taşımıyor.
  return steps.filter(step => !/kategorisinden se[cç]ilmi[sş] kelimeleri ba[gğ]lam i[cç]inde [cç]al[ıi][sş]t[ıi]r[ıi]r/i.test(step));
}

/** "… kelimeleri nelerdir", "… ile ilgili kelimeler" gibi liste istekleri. */
function wantsWordList(query: string): boolean {
  const q = normalize(query);
  return /(kelime|kelimeler|kelimeleri|sozcuk|sozcukler|sozluk|vocabulary|words|terimler|ifadeler)/.test(q)
    && /(nelerdir|neler|ver|listele|soyle|yaz|ogret|ogrenmek|hangileri|var|mi|misin|ile ilgili|hakkinda|temasindan|konusunda)/.test(q);
}

/**
 * Müfredat ünitelerini HAM VERİ DÖKÜMÜ olarak değil, gerçek bir ders gibi anlatır.
 * Daha önce ünite numarası, kategori etiketi ve okunuş parantezleri tek bir paragrafa
 * sıkıştırılıyordu; burada kelime listesi tabloya, cümleler örneklere ayrılır.
 */
function unitAnswer(match: RussianKnowledgeMatch, support: RussianKnowledgeMatch[], listMode = false): LocalRussianAnswer | null {
  const unitId = match.entry.id.replace(/^curriculum-expert-/, '');
  const unit = UNIT_BY_ID.get(unitId);
  if (!unit) return null;

  // Kullanıcı "bu temada hangi kelimeler var?" diye sorduysa tek üniteyle yetinme;
  // aynı temadaki diğer üniteleri de aynı tabloda topla.
  const relatedUnits = listMode
    ? [unit, ...support
      .map(other => UNIT_BY_ID.get(other.entry.id.replace(/^curriculum-expert-/, '')))
      .filter((other): other is typeof unit => Boolean(other))]
    : [unit];

  const seen = new Set<string>();
  const collected: { word: typeof unit.words[number]; from: typeof unit }[] = [];
  for (const source of relatedUnits) {
    for (const word of source.words) {
      const key = normalize(word.ru);
      if (seen.has(key)) continue;
      seen.add(key);
      collected.push({ word, from: source });
    }
  }
  const limit = listMode ? 20 : 12;
  const picked = collected.slice(0, limit);
  const words = picked.map(item => item.word);

  const table: string[] = [];
  if (words.length > 0) {
    table.push(listMode
      ? `${unit.icon || '📚'} ${unit.category.toLocaleUpperCase('tr-TR')} — ${collected.length} KELİMELİK SÖZ VARLIĞI`
      : `${unit.icon || '📚'} ${unit.title.toLocaleUpperCase('tr-TR')} — TEMEL SÖZ VARLIĞI`);
    const width = Math.min(26, Math.max(...words.map(word => word.ru.length)) + 2);
    let currentUnit = '';
    for (const item of picked) {
      if (listMode && item.from.title !== currentUnit) {
        currentUnit = item.from.title;
        table.push('');
        table.push(`   ▸ ${item.from.levelGroup} · ${currentUnit}`);
      }
      const reading = item.word.reading ? `  [${item.word.reading}]` : '';
      table.push(`   ${item.word.ru.padEnd(width)}${item.word.tr}${reading}`);
    }
    if (collected.length > picked.length) {
      table.push('');
      table.push(`   … ve ${collected.length - picked.length} kelime daha. "devamını ver" diyebilirsin.`);
    }
  }

  const steps = splitNumberedSteps(unit.grammarExplain || '');
  const explanation: string[] = [];
  if (unit.description) explanation.push(`**Konu:** ${unit.description}`);
  explanation.push(`**Seviye:** ${unit.levelGroup} · **Kategori:** ${unit.category}`);
  for (const step of steps.slice(0, 3)) explanation.push(step);

  const examples = unit.sentences.slice(0, 4).map(sentence => ({
    target: sentence.ru,
    tr: sentence.tr,
  }));

  const dialogueLines = (unit.dialogue || []).slice(0, 4);
  const notes: string[] = [];
  if (dialogueLines.length > 0) {
    notes.push(`**Diyalogdan:** ${dialogueLines.map(line => `${line.speaker}: «${line.ru}» (${line.tr})`).join('  ·  ')}`);
  }
  if (!listMode) {
    for (const other of support.slice(0, 2)) {
      notes.push(`**İlgili ünite — ${other.entry.title}**`);
    }
  }

  // Kelime odaklı bir soruysa en çok işe yarayan şey listenin kendisidir.
  const headline = words.length === 0
    ? `**${unit.title}** — ${unit.description || unit.category}`
    : listMode
      ? `**${unit.category}** temasında ${collected.length} kelime var; en işlek ${words.length} tanesi aşağıdaki tabloda — ${relatedUnits.length} üniteden derlendi.`
      : `**${unit.title}** ünitesinde bu konunun ${unit.words.length} temel kelimesi var; en sık kullanılan ${words.length} tanesi aşağıda.`;

  const composed = compose({
    headline,
    explanation,
    table: table.length > 0 ? table : undefined,
    examples: examples.length > 0 ? examples : undefined,
    notes: notes.length > 0 ? notes : undefined,
    practice: words[0]
      ? `«${words[0].ru}» ve «${words[1]?.ru ?? words[0].ru}» kelimelerini kullanarak bir cümle kur ve bana yaz — kontrol edeyim.`
      : 'Bu konudan bir cümle kur ve bana yaz — kontrol edeyim.',
    nextStep: support.length > 0
      ? `Aynı temadan devam etmek istersen: ${support.slice(0, 2).map(other => other.entry.title).join(' · ')}`
      : undefined,
  });

  return {
    text: composed.text,
    confidence: match.score >= 30 ? 'yüksek' : 'orta',
    sources: [match.entry.title, ...support.slice(0, 2).map(other => other.entry.title)],
    followUps: [
      words[0] ? `«${words[0].ru}» ne demek?` : `${unit.title} konusunu anlat`,
      words[0] ? `«${words[0].ru}» nasıl okunur?` : 'Bu konuda beni test et',
      `${unit.category} temasından başka kelimeler ver`,
      'Bu kelimelerle bana alıştırma yap',
    ],
    depth: words.length + examples.length + steps.length,
  };
}

function knowledgeAnswer(query: string, intent: RussianQuestionIntent): LocalRussianAnswer | null {
  const knowledge = searchRussianKnowledge(query, 5, intent);
  if (knowledge.length === 0) return null;

  const top = knowledge[0];
  // Puan çok düşükse bu bir eşleşme değil gürültüdür. Alakasız bir ders anlatmaktansa
  // kullanıcıya nasıl soracağını göstermek daha dürüst ve daha faydalıdır.
  if (top.score < 10) return null;

  // Müfredat üniteleri ham metin bloğu olarak değil, yapılandırılmış ders olarak anlatılır.
  if (top.entry.id.startsWith('curriculum-expert-')) {
    const unitBased = unitAnswer(top, knowledge.slice(1, 4), wantsWordList(query));
    if (unitBased) return unitBased;
  }
  const parts = splitIntoParagraphs(top.entry.content, 3);
  const support = knowledge.slice(1, 3);

  // Konuyla ilgili müfredat örneklerini de getir — cevap soyut kalmasın.
  const curriculumExamples = matchingSentences(query).slice(0, 2).map(item => ({
    target: item.sentence.ru,
    tr: item.sentence.tr,
    note: `${item.unit.levelGroup} · ${item.unit.title}`,
  }));

  const composed = compose({
    headline: `**${top.entry.title}** — ${parts[0]}`,
    explanation: parts.slice(1),
    notes: support.length > 0
      ? support.map(match => `**${match.entry.title}:** ${splitIntoParagraphs(match.entry.content, 1)[0].slice(0, 420)}`)
      : undefined,
    examples: curriculumExamples.length > 0 ? curriculumExamples : undefined,
    practice: 'Bu kuralı kullanarak kendi cümleni yaz ve bana gönder — anında kontrol edip eksik noktayı söylerim.',
    nextStep: support.length > 0 ? `İlgili konular: ${support.map(match => match.entry.title).join(' · ')}` : undefined,
  });

  return {
    text: composed.text,
    confidence: top.score >= 30 ? 'yüksek' : top.score >= 16 ? 'orta' : 'düşük',
    sources: [top.entry.title, ...support.map(match => match.entry.title)],
    followUps: buildFollowUps({ topic: top.entry.title, isEnglishMode: isEnglish() }),
    depth: parts.length + support.length * 2 + curriculumExamples.length,
  };
}

/* ────────────────────── SABİT HIZLI CEVAPLAR ────────────────────── */

function quickFactAnswer(q: string): LocalRussianAnswer | null {
  const english = isEnglish();

  if (/^(merhaba|selamlar|selam|hey|привет|hello|hi|gunaydin|iyi aksamlar)(?![a-zçğıöşüа-яё])/.test(q)) {
    const composed = compose({
      headline: english
        ? 'Merhaba! 👋 İngilizce hakkında aklına gelen her şeyi sorabilirsin.'
        : 'Привет! 👋 Rusça hakkında aklına gelen her şeyi sorabilirsin.',
      explanation: [
        'Cevapların tamamı **cihazında** üretilir: API yok, token yok, internet gerekmez.',
        english
          ? 'Kelime, çeviri, zamanlar, phrasal verb\'ler, telaffuz, cümle düzeltme ve çalışma planı — hepsini soruna göre düşünüp Türkçe açıklarım.'
          : 'Kelime, çeviri, hâl çekimi, fiil çekimi, görünüş, telaffuz, cümle düzeltme ve çalışma planı — hepsini soruna göre düşünüp Türkçe açıklarım.',
      ],
      table: [
        'ŞUNLARI DENEYEBİLİRSİN',
        english
          ? '   • "get up" ne demek?\n   • "I am agree" doğru mu?\n   • Present Perfect ile Past Simple farkı nedir?\n   • Bana günlük çalışma planı çıkar'
          : '   • «книга» kelimesinin hâllerini göster\n   • «читать» fiilini çekimle\n   • «хорошо» nasıl okunur?\n   • Bana günlük çalışma planı çıkar',
      ],
      nextStep: 'Nerede kaldığını merak ediyorsan «nerede kaldım?» diye sor.',
    });
    return {
      text: composed.text,
      confidence: 'yüksek',
      sources: ['Yerel konuşma motoru'],
      followUps: english
        ? ['Present Perfect ile Past Simple farkı nedir?', 'En sık yapılan İngilizce hatalar nelerdir?', 'Nerede kaldım?']
        : ['«книга» kelimesinin hâllerini göster', 'Bitmiş ve bitmemiş fiil farkı nedir?', 'Nerede kaldım?'],
      depth: 4,
    };
  }

  if (/kac\s+(temel\s+)?hal|hal\s+sayisi|kac tane hal/.test(q)) {
    if (english) {
      const composed = compose({
        headline: 'İngilizcede isim **hâl çekimi YOKTUR** — Rusçadaki 6 hâl sisteminin karşılığı bulunmaz.',
        explanation: [
          'İlişkiler iki şeyle kurulur: **edatlar** (in, on, at, of, to…) ve **söz dizisi** (katı SVO).',
          'Tek kalıntı: **aitlik için \'s** (the teacher\'s book) ve zamirlerin nesne biçimi (I→me, he→him, we→us).',
        ],
        examples: [
          { target: "the teacher's book", tr: 'öğretmenin kitabı', note: 'aitlik — Rusçada ilgi hâli' },
          { target: 'give it to me', tr: 'onu bana ver', note: 'yönelme — edatla' },
          { target: 'I write with a pen', tr: 'kalemle yazıyorum', note: 'araç — edatla' },
        ],
        pitfall: 'Türk öğrenci hâl eki aramak yerine **doğru edatı** aramalıdır; İngilizcede anlamı taşıyan şey edat + sıradır.',
      });
      return { text: composed.text, confidence: 'yüksek', sources: ['Yerel hâl sistemi'], followUps: ['in, on, at farkı nedir?', 'Söz dizimi kuralları neler?'], depth: 6 };
    }
    const composed = compose({
      headline: 'Rusçada **6 temel isim hâli** vardır ve her biri cümlede ayrı bir görev dağıtır.',
      table: CASE_ORDER.map((key, index) => `${index + 1}. ${CASE_LABELS[key].ru} — ${CASE_LABELS[key].tr}\n   soru: ${CASE_LABELS[key].question}\n   iş: ${CASE_LABELS[key].use}`),
      explanation: [
        'Türkçede ek kelimenin sonuna eklenir ve değişmez; Rusçada ek kelimenin sonunu **yeniden yazar** ve cinsiyete göre farklıdır.',
        'Doğru hâli bulmanın en hızlı yolu: önce **fiilin veya edatın** hangi hâli istediğini sor, sonra ismin cinsiyetine göre eki seç.',
      ],
      practice: 'Bir isim seç ve «hâllerini göster» diye yaz — altı hâllik tam tabloyu çıkarayım.',
    });
    return {
      text: composed.text, confidence: 'yüksek', sources: ['Yerel hâl sistemi'],
      followUps: ['«книга» kelimesinin hâllerini göster', 'Hangi edat hangi hâli ister?', 'İlgi hâli ne zaman kullanılır?'], depth: 8,
    };
  }

  if (/kac\s+harf|alfabe.*kac|alfabede kac/.test(q)) {
    const composed = english
      ? compose({
        headline: 'İngilizce alfabesi **26 harflidir** (5 ünlü, 21 ünsüz) ama yaklaşık **44 sesi** vardır: harf ≠ ses.',
        explanation: ['Bu uyumsuzluk Türkçeden gelen öğrenciyi en çok zorlayan şeydir, çünkü Türkçe neredeyse birebir okunur.'],
        table: ['BAŞLICA OKUMA KURALLARI', '   • Kapalı hece: cat → KET, hot → HAT', '   • Magic E: hat → hate (heyt)', '   • TH iki sestir: think (θ) / this (ð)', '   • Sessiz harf: know → NOU, light → LAYT', '   • Schwa [ə]: en sık ses, vurgusuz her hecede'],
        pitfall: 'Her harfi okumaya çalışmak: "comfortable" → [ˈkʌmftəbl] (üç hece, dört değil).',
      })
      : compose({
        headline: 'Rus Kiril alfabesinde **33 harf** vardır: **10 ünlü**, **21 ünsüz** ve ses vermeyen **2 işaret** (ь, ъ).',
        table: [
          'HARF GRUPLARI',
          '   Ünlüler (10): а э ы о у  |  я е и ё ю',
          '      sert sıra          yumuşak sıra',
          '   İşaretler (2): ь (yumuşatır)  ·  ъ (ayırır)',
          '   Ünsüzler (21): б в г д ж з й к л м н п р с т ф х ц ч ш щ',
        ],
        explanation: [
          'Yumuşak sıradaki ünlü, **önündeki ünsüzü inceltir** — bu Rusçanın temel ses mantığıdır.',
          'Latin harflerine benzeyen tuzaklar: **В**=[v], **Н**=[n], **Р**=[r], **С**=[s], **У**=[u], **Х**=[h].',
        ],
        pitfall: '«Ресторан» kelimesini [pestopan] diye okumak — Р ve С, Latin P ve C değildir.',
      });
    return { text: composed.text, confidence: 'yüksek', sources: ['Yerel alfabe bilgisi'], followUps: english ? ['Magic E kuralı nedir?', 'TH sesi nasıl çıkar?'] : ['Akanye ve ikanye nedir?', 'ь ve ъ farkı nedir?'], depth: 6 };
  }

  if (/kac\s+(kelime|benzersiz)|kelime\s+sayisi|ne kadar kelime|kac bilgi/.test(q)) {
    const uniqueWords = new Set(WORD_INDEX.map(item => `${item.word.ru}|${item.word.tr}`)).size;
    const composed = compose({
      headline: `Yerel ${english ? 'İngilizce' : 'Rusça'} zekası şu an **${UNITS_DATA.length} ünite**, **${uniqueWords.toLocaleString('tr-TR')} benzersiz kelime** ve **${SENTENCE_INDEX.length.toLocaleString('tr-TR')} örnek cümle** üzerinde çalışıyor.`,
      explanation: [
        'Bunların üstüne **460 bölümlük uzmanlık bankası** ve kural tabanlı **biçimbilim motoru** (isim/fiil/sıfat çekimi, fonetik) eklenir.',
        'Hepsi cihazında çalışır: **model indirmez, API çağırmaz, token harcamaz** ve internet olmadan da aynı şekilde yanıt verir.',
      ],
      table: [
        'MOTORUN KATMANLARI',
        '   1️⃣ Niyet çözümleyici (16 soru türü)',
        '   2️⃣ Biçimbilim motoru (çekim + fonetik üretimi)',
        '   3️⃣ Kural motoru (gramer düzeltme)',
        '   4️⃣ Uzmanlık bankası (460 bölüm)',
        '   5️⃣ Müfredat indeksi (kelime + cümle + diyalog)',
        '   6️⃣ Cevap yazım motoru (katmanlı anlatım)',
      ],
      nextStep: 'Sorabileceğin her kelime cihazında hazır — doğrudan yazman yeterli.',
    });
    return { text: composed.text, confidence: 'yüksek', sources: ['Yerel müfredat indeksi'], followUps: ['Nerede kaldım?', 'Bana günlük çalışma planı çıkar'], depth: 8 };
  }

  if (/kac\s+zaman|zaman.*kac|kac tane zaman/.test(q)) {
    const composed = english
      ? compose({
        headline: 'İngilizcede **12 zaman** vardır: 3 zaman (present/past/future) × 4 görünüş (simple/continuous/perfect/perfect continuous).',
        table: [
          'ÇARPIM TABLOSU',
          '              simple        continuous       perfect           perfect cont.',
          '   present    I work        I am working     I have worked     I have been working',
          '   past       I worked      I was working    I had worked      I had been working',
          '   future     I will work   will be working  will have worked  will have been working',
        ],
        explanation: ['En kritik ikili: **Present Perfect** ("I have done" — etkisi şimdi) ile **Past Simple** ("I did" — zamanı bitti).'],
        pitfall: 'Belirli geçmiş zaman ifadesi (yesterday, ago, last week) varsa **mutlaka Past Simple** gelir.',
      })
      : compose({
        headline: 'Rusçada **üç zaman** vardır (geçmiş, şimdiki, gelecek) ama doğru fiil seçimi için zamanla birlikte **görünüş** de karar verir.',
        table: [
          'ZAMAN × GÖRÜNÜŞ',
          '                 bitmemiş (süreç)      bitmiş (sonuç)',
          '   geçmiş        я читал               я прочитал',
          '   şimdiki       я читаю               — (yoktur!)',
          '   gelecek       я буду читать         я прочитаю',
        ],
        explanation: [
          '**Bitmiş fiilin şimdiki zamanı yoktur** — bu, tablodaki en önemli boşluktur.',
          'Geçmiş zaman şahsa değil **cinsiyete** göre çekilir: он читал / она читала.',
        ],
        pitfall: '«буду прочитать» ✗ — буду yanına yalnız **bitmemiş mastar** gelir.',
      });
    return {
      text: composed.text, confidence: 'yüksek', sources: ['Yerel zaman ve görünüş sistemi'],
      followUps: english ? ['Present Perfect ne zaman kullanılır?', 'will ile going to farkı nedir?'] : ['Bitmiş ve bitmemiş fiil farkı nedir?', '«читать» fiilini çekimle'], depth: 8,
    };
  }

  return null;
}

/* ────────────────────── ANA KARAR AKIŞI ────────────────────── */

function computeLocalAnswer(query: string, context: LocalRussianAgentContext): LocalRussianAnswer {
  const q = normalize(query);
  const intent = detectRussianQuestionIntent(query);
  const isFollowUp = q.split(/\s+/).length <= 5 && /^(peki|neden|bunun|bu|o zaman|ya|farki|farkı|nasil|baska)/.test(q);
  const previousQuery = context.recentUserQueries?.at(-1) || '';
  const searchQuery = isFollowUp && previousQuery ? `${previousQuery} ${query}` : query;

  // 1) İlerleme ve plan — kullanıcı bağlamı gerektiren sorular
  if (/nerede kald|seviyem nedir|ilerlemem|hangi ünite|hangi unite|konumum|ne kadar ilerledim/.test(q)) {
    return progressAnswer(context);
  }
  if (/zayif|zayıf|eksig|eksiğ|hatalarim|hatalarım|hata defteri|nerede hata|neyi bilmiyorum|zorlandig|zorlandığ/.test(q)) {
    return weaknessAnswer(context);
  }
  if (intent === 'studyPlan') return studyPlanAnswer(context);

  // 2) Selamlama ve sabit bilgi soruları
  const quick = quickFactAnswer(q);
  if (quick) return quick;

  // 3) Biçimbilim motoru — çekim tabloları ve okunuş
  if (intent === 'declension') {
    const answer = declensionAnswer(query);
    if (answer) return answer;
  }
  if (intent === 'conjugation') {
    const answer = conjugationAnswer(query);
    if (answer) return answer;
  }
  if (intent === 'pronunciation') {
    const answer = pronunciationAnswer(query);
    if (answer) return answer;
  }

  // 4) Yaş / sayı uyumu
  const numeric = numberAnswer(query);
  if (numeric) return numeric;

  // 5) Cümle düzeltme — kural motoru
  if (intent !== 'translation' && intent !== 'pronunciation') {
    const correction = correctionAnswer(query);
    if (correction) return correction;
  }

  // 6) Karşılaştırma soruları
  const comparison = comparisonAnswer(searchQuery, intent);
  if (comparison) return comparison;

  // 7) Çeviri / kelime / telaffuz — müfredat sözlüğü
  if (intent === 'translation' || intent === 'vocabulary' || intent === 'pronunciation') {
    const words = wordAnswer(searchQuery);
    if (words) return { ...words, confidence: 'yüksek' };
    const sentences = sentenceAnswer(searchQuery);
    if (sentences) return { ...sentences, confidence: 'yüksek' };
  }

  // 8) Tamamen hedef dilde yazılmış kısa sorgu → doğrudan sözlük
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

  // 9) Uzmanlık bankası
  const knowledge = knowledgeAnswer(searchQuery, intent);
  if (knowledge) return knowledge;

  // 10) Son çare: sözlük ve cümle eşleşmeleri
  const words = wordAnswer(searchQuery);
  if (words) return { ...words, confidence: 'orta' };
  const sentences = sentenceAnswer(searchQuery);
  if (sentences) return { ...sentences, confidence: 'orta' };

  // 11) Yardımcı başarısızlık — ne sorabileceğini göster
  const english = isEnglish();
  const composed = compose({
    headline: 'Bu soru için yerel bilgi bankasında yeterince kesin bir eşleşme bulamadım — ama boş dönmeyeyim, sana nasıl soracağını göstereyim.',
    explanation: [
      `Elimde **460 uzmanlık bölümü**, **${UNITS_DATA.length} ünite** ve kural tabanlı bir **biçimbilim motoru** var; soruyu biraz daha somut yazarsan hepsini tarayabilirim.`,
    ],
    table: english
      ? [
        'BÖYLE SORARSAN KESİN CEVAP VERİRİM',
        '   • "get up" ne demek?',
        '   • "I am agree" doğru mu?',
        '   • Present Perfect ile Past Simple farkı nedir?',
        '   • in / on / at nasıl seçilir?',
        '   • Bana günlük çalışma planı çıkar',
      ]
      : [
        'BÖYLE SORARSAN KESİN CEVAP VERİRİM',
        '   • «книга» kelimesinin hâllerini göster',
        '   • «читать» fiilini çekimle',
        '   • «хорошо» nasıl okunur?',
        '   • Bitmiş ve bitmemiş fiil farkı nedir?',
        '   • Bana günlük çalışma planı çıkar',
      ],
    nextStep: `Şu an **${context.focusTitle}** ünitesindesin; o konuyla ilgili bir soru sorarsan müfredat örnekleriyle birlikte yanıtlarım.`,
  });

  return {
    text: composed.text,
    confidence: 'düşük',
    sources: ['Yerel arama motoru'],
    followUps: english
      ? ['Present Perfect ile Past Simple farkı nedir?', 'En sık yapılan İngilizce hatalar nelerdir?', 'Nerede kaldım?']
      : ['Bitmiş ve bitmemiş fiil farkı nedir?', 'En sık yapılan Rusça hatalar nelerdir?', 'Nerede kaldım?'],
    depth: 0,
  };
}

const AGENT_CACHE_LIMIT = 192;
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
