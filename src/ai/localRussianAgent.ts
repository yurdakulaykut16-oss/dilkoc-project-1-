import { UNITS_DATA } from '../curriculumData';
import { detectRussianQuestionIntent, searchRussianKnowledge } from './russianExpertise';

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

const allWords = UNITS_DATA.flatMap(unit => unit.words.map(word => ({ word, unit })));
const allSentences = UNITS_DATA.flatMap(unit => unit.sentences.map(sentence => ({ sentence, unit })));

function matchingWords(query: string) {
  const q = normalize(query);
  return allWords
    .map(({ word, unit }) => {
      const ru = normalize(word.ru);
      const tr = normalize(word.tr);
      let score = 0;
      if (ru.length > 1 && q.includes(ru)) score += 30 + ru.length;
      if (tr.length > 2 && q.includes(tr)) score += 24 + tr.length;
      if (q === ru || q === tr) score += 30;
      return { word, unit, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .filter((item, index, list) => list.findIndex(other => other.word.ru === item.word.ru && other.word.tr === item.word.tr) === index)
    .slice(0, 5);
}

function matchingSentences(query: string) {
  const q = normalize(query);
  return allSentences
    .map(({ sentence, unit }) => {
      const ru = normalize(sentence.ru);
      const tr = normalize(sentence.tr);
      let score = 0;
      if (ru.length > 5 && (q.includes(ru) || ru.includes(q))) score += 30;
      if (tr.length > 5 && (q.includes(tr) || tr.includes(q))) score += 25;
      return { sentence, unit, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function wordAnswer(query: string) {
  const matches = matchingWords(query);
  if (matches.length === 0) return null;
  const wantsAlternatives = /fark|karsilastir|alternatif|benzer|hangileri/.test(normalize(query));
  const lines = matches.slice(0, wantsAlternatives ? 3 : 1).map(({ word }, index) => {
    const example = allSentences.find(({ sentence }) =>
      normalize(sentence.ru).includes(normalize(word.ru)) || normalize(sentence.tr).includes(normalize(word.tr)),
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
    sources: matches.slice(0, wantsAlternatives ? 3 : 1).map(item => `${item.unit.levelGroup} · ${item.unit.title}`),
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

function deterministicCorrection(query: string) {
  const cyrillic = query.match(/[А-Яа-яЁё][А-Яа-яЁё\s.,!?-]*/)?.[0]?.trim();
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
export function answerWithLocalRussianAgent(query: string, context: LocalRussianAgentContext): LocalRussianAnswer {
  const q = normalize(query);
  const intent = detectRussianQuestionIntent(query);
  const isFollowUp = q.split(/\s+/).length <= 5 && /^(peki|neden|bunun|bu|o zaman|ya|farki|farkı)/.test(q);
  const previousQuery = context.recentUserQueries?.at(-1) || '';
  const searchQuery = isFollowUp && previousQuery ? `${previousQuery} ${query}` : query;

  if (/nerede kald|seviyem|ilerlemem|hangi ünite|hangi unite|konumum/.test(q)) {
    return { text: progressAnswer(context), confidence: 'yüksek', sources: ['Yerel öğrenen kaydı'] };
  }

  if (/^(merhaba|selam|hey)\b/.test(q)) {
    return {
      text: 'Привет! Rusça hakkında kelime, çeviri, gramer, telaffuz veya cümle düzeltme sorabilirsin. Bütün cevapları cihazdaki yerel bilgi bankasından vereceğim.',
      confidence: 'yüksek',
      sources: ['Yerel konuşma motoru'],
    };
  }

  // Çok sorulan temel gerçekler doğrudan kural motorunda tutulur; arama
  // sonucunu yorumlamaya gerek kalmadan kesin cevap döner.
  if (/kac\s+(temel\s+)?hal|hal\s+sayisi/.test(q)) {
    return {
      text: 'Rusçada **6 temel isim hâli** vardır:\n1. Именительный — yalın\n2. Родительный — ilgi\n3. Дательный — yönelme\n4. Винительный — belirtme\n5. Творительный — araç\n6. Предложный — bulunma/edat hâli',
      confidence: 'yüksek',
      sources: ['Yerel hâl sistemi'],
    };
  }
  if (/kac\s+harf|alfabe.*kac/.test(q)) {
    return { text: 'Rus Kiril alfabesinde **33 harf** vardır: 10 ünlü, 21 ünsüz ve ses vermeyen iki işaret (**ь, ъ**).', confidence: 'yüksek', sources: ['Yerel alfabe bilgisi'] };
  }
  if (/kac\s+zaman|zaman.*kac/.test(q)) {
    return { text: 'Rusçada üç temel zaman vardır: **geçmiş, şimdiki ve gelecek**. Ancak doğru fiil seçimi için zamanla birlikte **görünüş** (bitmiş/bitmemiş) de değerlendirilir.', confidence: 'yüksek', sources: ['Yerel zaman ve görünüş sistemi'] };
  }

  if (intent === 'correction') {
    const correction = deterministicCorrection(query);
    if (correction) return { text: correction, confidence: 'yüksek', sources: ['Yerel gramer kuralları'] };
  }

  if (intent === 'translation' || intent === 'vocabulary' || intent === 'pronunciation') {
    const words = wordAnswer(searchQuery);
    if (words) return { ...words, confidence: 'yüksek' };
    const sentences = sentenceAnswer(searchQuery);
    if (sentences) return { ...sentences, confidence: 'yüksek' };
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
    text: 'Bu soru için yerel bilgi bankasında yeterince kesin bir eşleşme bulamadım. Soruyu bir Rusça kelime, cümle veya konu adıyla biraz daha açık yazarsan 230 uzmanlık bölümü ve müfredat içinde yeniden arayabilirim.',
    confidence: 'düşük',
    sources: ['Yerel arama motoru'],
  };
}
