import { detectTenses, detectPreps, PREPOSITIONS } from './learnerModel';
import { isEnglish } from './content/activeLanguage';
import { CASE_LABELS, CASE_ORDER, aspectPartner, conjugateVerb, declineNoun, type CaseKey } from './ai/morphology';

export interface DiffPoint {
  type: 'ok' | 'warn' | 'err';
  icon: string;
  text: string;
}

export interface SentenceAnalysis {
  verdictTr: string;
  points: DiffPoint[];
  closeness: number;
}

const TENSE_TR: Record<string, string> = {
  'tense:present': 'şimdiki zaman',
  'tense:past': 'geçmiş zaman',
  'tense:future': 'gelecek zaman',
};

function norm(w: string): string {
  return w.toLowerCase().replace(/[«»""„.,!?;:()\-–—]/g, '').replace(/ё/g, 'е').trim();
}

function stemLike(a: string, b: string): boolean {
  const x = norm(a), y = norm(b);
  if (x === y || x.length < 4 || y.length < 4) return false;
  const n = Math.min(x.length, y.length) - 1;
  const shared = Math.max(4, Math.min(n, Math.max(x.length, y.length) - 3));
  return x.slice(0, shared) === y.slice(0, shared);
}

/** İki kelimenin ortak ön ek uzunluğu — çekim farkını işaretlemek için. */
function sharedPrefixLength(a: string, b: string): number {
  let index = 0;
  while (index < a.length && index < b.length && a[index] === b[index]) index += 1;
  return index;
}

/* ─────────────────────── HÂL TEŞHİSİ ─────────────────────── */

/**
 * Yalnızca İSİM OLAMAYACAK fiil ekleri. «школа», «масло», «рубли» gibi -ла/-ло/-ли
 * ile biten isimler burada kasıtlı olarak dışarıda bırakıldı; onlar ayrı bir
 * çift kontrolüyle (isPastPair) ayıklanır.
 */
const UNAMBIGUOUS_VERB_SHAPE = /(ться|ть|ешь|ёшь|ишь|ете|ёте|ите|ются|утся|ятся|атся|ится|ется|ёмся|имся|емся|ют|ут|ят|ат|ся|сь)$/;

/** İki biçim yalnızca geçmiş zaman eki bakımından farklıysa bu bir FİİL çiftidir. */
function isPastPair(a: string, b: string): boolean {
  const pastEnding = /(л|ла|ло|ли)$/;
  if (!pastEnding.test(a) || !pastEnding.test(b) || a === b) return false;
  const stemA = a.replace(pastEnding, '');
  const stemB = b.replace(pastEnding, '');
  return stemA.length >= 3 && stemA === stemB;
}

/** İki biçim yalnızca şahıs eki bakımından farklıysa bu da bir FİİL çiftidir. */
function isPresentPair(a: string, b: string): boolean {
  const personEnding = /(ю|у|ешь|ёшь|ет|ёт|ем|ём|ете|ёте|ют|ут|ишь|ит|им|ите|ят|ат)$/;
  if (!personEnding.test(a) || !personEnding.test(b) || a === b) return false;
  const stemA = a.replace(personEnding, '');
  const stemB = b.replace(personEnding, '');
  return stemA.length >= 3 && stemA === stemB;
}

/** Geçmiş zaman biçiminden mastarı tahmin eder: читал → читать. */
function pastToInfinitive(word: string): string | null {
  const match = /^([а-яё]{3,})(л|ла|ло|ли)(сь|ся)?$/.exec(norm(word));
  if (!match) return null;
  return `${match[1]}ть${match[3] ? 'ся' : ''}`;
}

/** Çekim teşhisine sokulmayacak zamir biçimleri (isim çekim tablosuna uymazlar). */
const PRONOUN_FORMS = new Set([
  'я', 'ты', 'он', 'она', 'оно', 'мы', 'вы', 'они',
  'меня', 'тебя', 'его', 'её', 'нас', 'вас', 'их', 'него', 'неё', 'них',
  'мне', 'тебе', 'ему', 'ей', 'нам', 'вам', 'им', 'нему', 'ней', 'ним',
  'мной', 'мною', 'тобой', 'тобою', 'нами', 'вами', 'ими', 'ним', 'нею',
  'себя', 'себе', 'собой', 'кто', 'что', 'кого', 'чего', 'кому', 'чему', 'кем', 'чем', 'ком',
  'этот', 'эта', 'это', 'эти', 'этого', 'этой', 'этом', 'этих', 'тот', 'та', 'то', 'те',
  'мой', 'моя', 'моё', 'мои', 'моего', 'моей', 'твой', 'твоя', 'твоё', 'твои', 'наш', 'ваш', 'свой', 'свою', 'своего',
]);

/** Çekim teşhisi için uygun bir isim mi? */
function isDeclinableNoun(form: string): boolean {
  const word = norm(form);
  if (word.length < 3) return false;
  if (PRONOUN_FORMS.has(word)) return false;
  if (UNAMBIGUOUS_VERB_SHAPE.test(word)) return false;
  return /^[а-яё]+$/.test(word);
}

/** Sözlük biçimi olabilecek sonlar — «книги», «школу» gibi çekimli biçimler aday olmamalı. */
function isCanonicalLemmaShape(word: string): boolean {
  return /[аяоеёьй]$/.test(word) || /[бвгджзклмнпрстфхцчшщ]$/.test(word);
}

/** Bir çekimli biçim için olası sözlük biçimlerini üretir (kaba ama etkili). */
function lemmaGuesses(form: string): string[] {
  const base = norm(form);
  // Sözlük biçiminin kendisi daima ilk adaydır — en olası yorum odur.
  const guesses: string[] = isCanonicalLemmaShape(base) ? [base] : [];
  const push = (value: string) => {
    if (value.length >= 3 && isCanonicalLemmaShape(value) && !guesses.includes(value)) guesses.push(value);
  };
  const endings = ['ами', 'ями', 'ах', 'ях', 'ам', 'ям', 'ов', 'ев', 'ой', 'ей', 'ом', 'ем', 'ую', 'ью', 'ю', 'у', 'ы', 'и', 'е', 'а', 'я'];
  for (const ending of endings) {
    if (!base.endsWith(ending) || base.length - ending.length < 3) continue;
    const stem = base.slice(0, -ending.length);
    push(`${stem}а`);
    push(`${stem}я`);
    push(stem);
    push(`${stem}о`);
    push(`${stem}е`);
    push(`${stem}ь`);
  }
  return guesses;
}

/**
 * İki biçimi AYNI çekim tablosunda arar. Her ikisi de aynı sözlük biçiminin
 * tablosunda bulunursa teşhis güvenilirdir: "araç hâli kullanmışsın, belirtme olmalıydı".
 * Tek biçim üzerinden tahmin yürütmek yanlış sonuç verdiği için kullanılmaz.
 */
function diagnoseCasePair(used: string, ideal: string): { usedCase: CaseKey; idealCase: CaseKey; lemma: string } | null {
  const usedForm = norm(used);
  const idealForm = norm(ideal);
  if (!isDeclinableNoun(usedForm) || !isDeclinableNoun(idealForm)) return null;

  for (const lemma of [...lemmaGuesses(idealForm), ...lemmaGuesses(usedForm)]) {
    const table = declineNoun(lemma);
    if (!table) continue;
    // ÖNEMLİ: «книги» hem tekil ilgi hem çoğul yalın olabilir. Belirsizliği çözmek için
    // önce tekil tablo taranır; ancak tekilde bulunamazsa çoğula bakılır.
    const locate = (form: string): CaseKey | null => {
      for (const caseKey of CASE_ORDER) if (norm(table.singular[caseKey]) === form) return caseKey;
      for (const caseKey of CASE_ORDER) if (norm(table.plural[caseKey]) === form) return caseKey;
      return null;
    };
    const usedCase = locate(usedForm);
    const idealCase = locate(idealForm);
    if (usedCase && idealCase && usedCase !== idealCase) return { usedCase, idealCase, lemma };
  }
  return null;
}

/** Tek bir biçimin hâlini, yalnızca kendi sözlük biçimi üzerinden güvenli şekilde belirler. */
function identifySingleCase(form: string): CaseKey | null {
  const word = norm(form);
  if (!isDeclinableNoun(word)) return null;
  for (const lemma of lemmaGuesses(word)) {
    const table = declineNoun(lemma);
    if (!table) continue;
    for (const caseKey of CASE_ORDER) if (norm(table.singular[caseKey]) === word) return caseKey;
    for (const caseKey of CASE_ORDER) if (norm(table.plural[caseKey]) === word) return caseKey;
  }
  return null;
}

/* ───────────────── EDAT-HÂL YÖNETİMİ ───────────────── */

/** Rusçada her edat belirli bir hâl ister; en sık kullanılanların haritası. */
const PREPOSITION_GOVERNMENT: Record<string, { cases: CaseKey[]; note: string }> = {
  'в': { cases: ['acc', 'pre'], note: 'Hareket varsa (куда?) belirtme, yer bildiriyorsa (где?) bulunma hâli ister.' },
  'на': { cases: ['acc', 'pre'], note: 'Hareket varsa (куда?) belirtme, yer bildiriyorsa (где?) bulunma hâli ister.' },
  'о': { cases: ['pre'], note: '«о / об» daima bulunma hâli ister: о книге, об этом.' },
  'об': { cases: ['pre'], note: '«о / об» daima bulunma hâli ister: о книге, об этом.' },
  'у': { cases: ['gen'], note: '«у» daima ilgi hâli ister: у меня, у брата.' },
  'из': { cases: ['gen'], note: '«из» daima ilgi hâli ister: из дома, из России.' },
  'от': { cases: ['gen'], note: '«от» daima ilgi hâli ister: от друга.' },
  'до': { cases: ['gen'], note: '«до» daima ilgi hâli ister: до вечера.' },
  'для': { cases: ['gen'], note: '«для» daima ilgi hâli ister: для тебя.' },
  'без': { cases: ['gen'], note: '«без» daima ilgi hâli ister: без сахара.' },
  'около': { cases: ['gen'], note: '«около» daima ilgi hâli ister: около дома.' },
  'после': { cases: ['gen'], note: '«после» daima ilgi hâli ister: после урока.' },
  'к': { cases: ['dat'], note: '«к» daima yönelme hâli ister: к врачу, к другу.' },
  'по': { cases: ['dat'], note: '«по» çoğunlukla yönelme hâli ister: по улице, по телефону.' },
  'с': { cases: ['ins', 'gen'], note: '«с» birliktelik anlatırsa araç hâli (с другом), «-den» anlatırsa ilgi hâli ister (с работы).' },
  'над': { cases: ['ins'], note: '«над» daima araç hâli ister: над столом.' },
  'под': { cases: ['ins', 'acc'], note: '«под» yer bildirirse araç (под столом), hareket bildirirse belirtme hâli ister.' },
  'перед': { cases: ['ins'], note: '«перед» daima araç hâli ister: перед домом.' },
  'между': { cases: ['ins'], note: '«между» daima araç hâli ister: между домами.' },
  'за': { cases: ['ins', 'acc'], note: '«за» yer bildirirse araç (за домом), amaç/hareket bildirirse belirtme hâli ister.' },
  'про': { cases: ['acc'], note: '«про» daima belirtme hâli ister: про книгу.' },
  'через': { cases: ['acc'], note: '«через» daima belirtme hâli ister: через час.' },
};

/* ──────────────── CİNSİYET / SAYI UYUMU ──────────────── */

const PAST_MASCULINE = /[а-я]+л$/;
const PAST_FEMININE = /[а-я]+ла$/;
const PAST_NEUTER = /[а-я]+ло$/;
const PAST_PLURAL = /[а-я]+ли$/;

const FEMININE_SUBJECTS = new Set(['она', 'мама', 'сестра', 'девушка', 'женщина', 'подруга', 'бабушка', 'дочь', 'жена', 'учительница', 'анна', 'мария', 'ольга', 'катя', 'маша']);
const MASCULINE_SUBJECTS = new Set(['он', 'папа', 'брат', 'мужчина', 'друг', 'дедушка', 'сын', 'муж', 'учитель', 'иван', 'антон', 'сергей', 'дима', 'саша']);
const PLURAL_SUBJECTS = new Set(['мы', 'вы', 'они', 'люди', 'дети', 'друзья', 'студенты', 'родители']);

/** Geçmiş zaman fiilinin cinsiyet/sayı eki özneyle uyuşuyor mu? */
function checkPastAgreement(words: string[]): DiffPoint | null {
  const past = words.find(word => PAST_FEMININE.test(word) || PAST_NEUTER.test(word) || PAST_PLURAL.test(word) || PAST_MASCULINE.test(word));
  if (!past) return null;

  const subject = words.find(word => FEMININE_SUBJECTS.has(word) || MASCULINE_SUBJECTS.has(word) || PLURAL_SUBJECTS.has(word));
  if (!subject) return null;

  const isPlural = PAST_PLURAL.test(past);
  const isFeminine = !isPlural && PAST_FEMININE.test(past);
  const isMasculine = !isPlural && !isFeminine && PAST_MASCULINE.test(past);

  if (PLURAL_SUBJECTS.has(subject) && !isPlural) {
    return { type: 'err', icon: '👥', text: `UYUM HATASI: Özne «${subject}» çoğul ama fiil «${past}» tekil görünüyor. Rusçada geçmiş zaman fiili özneye göre **sayı ve cinsiyet** alır → «${past.replace(/(л|ла|ло)$/, 'ли')}» olmalı.` };
  }
  if (FEMININE_SUBJECTS.has(subject) && isMasculine) {
    return { type: 'err', icon: '♀️', text: `CİNSİYET UYUMU: Özne «${subject}» dişil olduğu için geçmiş zaman fiili **-ла** ekini alır → «${past}а». Türkçede fiil cinsiyete göre değişmediği için bu ek kolayca unutulur.` };
  }
  if (MASCULINE_SUBJECTS.has(subject) && isFeminine) {
    return { type: 'err', icon: '♂️', text: `CİNSİYET UYUMU: Özne «${subject}» eril olduğu için geçmiş zaman fiili **-л** ile biter → «${past.slice(0, -1)}». Dişil «-ла» eki burada yanlış.` };
  }
  return null;
}

/* ──────────────── GÖRÜNÜŞ (ВИД) KONTROLÜ ──────────────── */

/** Bir biçimden görünüş karşılaştırması için mastar üretir. */
function toInfinitive(word: string): string | null {
  const base = norm(word);
  if (/ться$|ть$/.test(base)) return base;
  return pastToInfinitive(base);
}

/**
 * Kullanılan fiilin görünüşü ideal cümledekinden farklı mı?
 * Geçmiş zaman biçimleri mastara indirgenip bilinen görünüş çiftleriyle eşleştirilir,
 * böylece «прочитал» ↔ «читал» gibi önekli çiftler de yakalanır.
 */
function checkAspect(builtWords: string[], idealWords: string[]): { point: DiffPoint; used: string; ideal: string } | null {
  for (const used of builtWords) {
    if (idealWords.includes(used)) continue;
    const usedInfinitive = toInfinitive(used);
    if (!usedInfinitive) continue;
    for (const ideal of idealWords) {
      if (builtWords.includes(ideal)) continue;
      const idealInfinitive = toInfinitive(ideal);
      if (!idealInfinitive || usedInfinitive === idealInfinitive) continue;
      const pair: { imperfective: string; perfective: string } | null = aspectPartner(usedInfinitive) ?? aspectPartner(idealInfinitive);
      if (!pair) continue;
      const matchesPair = [pair.imperfective, pair.perfective].includes(usedInfinitive)
        && [pair.imperfective, pair.perfective].includes(idealInfinitive);
      if (!matchesPair) continue;
      const idealIsPerfective = idealInfinitive === pair.perfective;
      return {
        used, ideal,
        point: {
          type: 'err', icon: '🎬',
          text: idealIsPerfective
            ? `GÖRÜNÜŞ HATASI: «${used}» (${pair.imperfective}) **bitmemiş** görünüştedir ve süreci anlatır; burada eylemin TAMAMLANDIĞI söylenmeli → «${ideal}» (${pair.perfective}). Bitmiş görünüş sonuca odaklanır.`
            : `GÖRÜNÜŞ HATASI: «${used}» (${pair.perfective}) **bitmiş** görünüştedir ve sonucu anlatır; burada süreç/tekrar anlatılmalı → «${ideal}» (${pair.imperfective}). «iki saat boyunca», «her gün» gibi süre/tekrar ifadeleri daima bitmemiş görünüş ister.`,
        },
      };
    }
  }
  return null;
}

/* ──────────────── OLUMSUZLUK + İLGİ HÂLİ ──────────────── */

function checkNegationGenitive(words: string[]): DiffPoint | null {
  const netIndex = words.indexOf('нет');
  if (netIndex === -1 || netIndex === words.length - 1) return null;
  const after = words[netIndex + 1];
  if (!after || PREPOSITIONS.includes(after)) return null;
  const identified = identifySingleCase(after);
  if (identified && identified !== 'gen') {
    return {
      type: 'err', icon: '🚫',
      text: `OLUMSUZLUK KURALI: «нет» daima **ilgi hâli** ister. «нет ${after}» yerine ilgi hâli biçimi gelmeli (örn. «нет книги», «нет времени»). Burada ${CASE_LABELS[identified].tr} kullanılmış.`,
    };
  }
  return null;
}

/* ──────────────── ŞİMDİKİ ZAMANDA «БЫТЬ» ──────────────── */

function checkPresentBe(words: string[]): DiffPoint | null {
  const hasEst = words.includes('есть');
  const hasPossession = words.includes('у') || words.some(word => /^у$/.test(word));
  if (hasEst && !hasPossession) {
    return {
      type: 'err', icon: '🔗',
      text: 'KOPULA HATASI: Rusçada şimdiki zamanda «быть» (есть) **kullanılmaz**: «Я студент» ✓, «Я есть студент» ✗. «есть» yalnızca VARLIK bildirirken kalır: «У меня есть брат».',
    };
  }
  return null;
}

/* ──────────────── DÖNÜŞLÜ FİİL (-ся) ──────────────── */

function checkReflexive(builtWords: string[], idealWords: string[]): DiffPoint | null {
  const usedReflexive = builtWords.find(word => /(ся|сь)$/.test(word) && word.length > 4);
  const idealReflexive = idealWords.find(word => /(ся|сь)$/.test(word) && word.length > 4);
  if (idealReflexive && !usedReflexive) {
    return { type: 'err', icon: '🔄', text: `DÖNÜŞLÜLÜK EKSİK: İdeal cümlede «${idealReflexive}» dönüşlü (-ся/-сь) biçimdedir. Bu ek düşünce eylemin özneye döndüğünü söyler (учить = öğretmek, учиться = öğrenmek) — anlam tamamen değişir.` };
  }
  if (usedReflexive && !idealReflexive && builtWords.length > 1) {
    return { type: 'warn', icon: '🔄', text: `FAZLADAN DÖNÜŞLÜLÜK: «${usedReflexive}» dönüşlü biçimde; ideal cümlede dönüşsüz biçim var. -ся eki fiili geçişsiz yapar, nesne alamaz hâle getirir.` };
  }
  return null;
}

/* ──────────────── EDAT-HÂL UYUMU ──────────────── */

function checkPrepositionGovernment(words: string[]): DiffPoint[] {
  const found: DiffPoint[] = [];
  for (let index = 0; index < words.length - 1; index += 1) {
    const prep = words[index];
    const rule = PREPOSITION_GOVERNMENT[prep];
    if (!rule) continue;
    const noun = words[index + 1];
    if (!noun || PREPOSITIONS.includes(noun) || PRONOUN_FORMS.has(noun)) continue;
    const identified = identifySingleCase(noun);
    if (!identified) continue;
    if (rule.cases.includes(identified)) continue;
    found.push({
      type: 'err', icon: '🧭',
      text: `EDAT-HÂL UYUMSUZLUĞU: «${prep}» edatından sonra «${noun}» ${CASE_LABELS[identified].tr} biçiminde. ${rule.note} Doğru hâl: ${rule.cases.map(key => CASE_LABELS[key].tr).join(' veya ')}.`,
    });
    if (found.length >= 2) break;
  }
  return found;
}

/* ──────────────── FİİL ÇEKİMİ (ŞAHIS) ──────────────── */

type PersonSlot = 'ya' | 'ty' | 'on' | 'my' | 'vy' | 'oni';

const PERSON_ENDING: Record<string, PersonSlot> = {
  'я': 'ya', 'ты': 'ty', 'он': 'on', 'она': 'on', 'оно': 'on', 'мы': 'my', 'вы': 'vy', 'они': 'oni',
};

/** Özne zamiri ile fiil çekiminin şahıs eki uyuşuyor mu? */
function checkPersonAgreement(words: string[], idealWords: string[]): DiffPoint | null {
  const pronoun = words.find(word => PERSON_ENDING[word]);
  if (!pronoun) return null;
  const slot = PERSON_ENDING[pronoun];

  // Fiili ideal cümleden tanıyıp mastarını bulmaya çalış.
  for (const idealWord of idealWords) {
    const used = words.find(word => stemLike(word, idealWord) && word !== idealWord);
    if (!used) continue;
    for (const infinitive of [`${idealWord.replace(/(ю|ешь|ет|ем|ете|ют|у|ишь|ит|им|ите|ят|ат|ут)$/, '')}ть`]) {
      const table = conjugateVerb(infinitive);
      if (!table) continue;
      const expected = norm(table.present[slot]);
      if (!expected || expected === used) continue;
      if (Object.values(table.present).map(norm).includes(used)) {
        return {
          type: 'err', icon: '👤',
          text: `ŞAHIS UYUMU: Özne «${pronoun}» olduğu için fiil «${expected}» biçiminde olmalı; sen «${used}» yazmışsın. Rusçada fiilin sonu özneyi taşır, bu yüzden yanlış ek özneyi değiştirir.`,
        };
      }
    }
  }
  return null;
}

/* ──────────────── YAZIM / NOKTALAMA ──────────────── */

function checkOrthography(builtRaw: string[], idealRu: string): DiffPoint[] {
  const points: DiffPoint[] = [];
  const builtText = builtRaw.join(' ');

  // Latin harf karışması — Kiril yazarken en sık görülen teknik hata.
  if (!isEnglish() && /[a-zA-Z]/.test(builtText) && /[а-яА-Я]/.test(builtText)) {
    const latin = builtRaw.filter(word => /[a-zA-Z]/.test(word) && /[а-яА-Я]/.test(word));
    if (latin.length > 0) {
      points.push({
        type: 'err', icon: '⌨️',
        text: `ALFABE KARIŞMASI: «${latin.join('», «')}» içinde Latin harf var. а/о/е/с/р/х gibi harfler Kiril ve Latin alfabesinde aynı görünür ama farklı karakterdir — klavyeni kontrol et.`,
      });
    }
  }

  // ё / е farkı sadece bilgilendirme düzeyinde.
  if (idealRu.includes('ё') && !builtText.includes('ё')) {
    points.push({
      type: 'ok', icon: '📝',
      text: 'Not: İdeal cümlede «ё» harfi var. Basılı metinlerde çoğunlukla «е» yazıldığı için bu bir hata sayılmaz, ama «ё» daima vurguludur — telaffuzda [yo] olarak oku.',
    });
  }

  return points;
}

/* ──────────────── SÖZ DİZİMİ ──────────────── */

function checkWordOrder(built: string[], correct: string[]): DiffPoint | null {
  if (built.length !== correct.length) return null;
  const displaced: string[] = [];
  for (let index = 0; index < built.length; index += 1) {
    if (built[index] !== correct[index]) displaced.push(built[index]);
  }
  if (displaced.length === 0) return null;
  const firstDiff = built.findIndex((word, index) => word !== correct[index]);
  return {
    type: 'warn', icon: '🔀',
    text: `DİZİLİM FARKI: İlk sapma ${firstDiff + 1}. sırada — sen «${built[firstDiff]}», nötr sıralamada «${correct[firstDiff]}» bekleniyor. Rusçada kelime sırası esnektir ama **vurguyu** değiştirir: sona koyduğun öğe "asıl yeni bilgi" gibi duyulur. Bu alıştırmada hedef en doğal (nötr) sıralamadır.`,
  };
}

/* ─────────────────────── ANA ANALİZ ─────────────────────── */

export function analyzeSentenceDiff(built: string[], correct: string[], idealRu: string, idealTr: string): SentenceAnalysis {
  const points: DiffPoint[] = [];
  const b = built.map(norm).filter(Boolean);
  const c = correct.map(norm).filter(Boolean);
  const builtRu = built.join(' ');

  const missing = c.filter(w => !b.includes(w));
  const extra = b.filter(w => !c.includes(w));

  const caseSwaps: { used: string; ideal: string }[] = [];
  for (const m of [...missing]) {
    const pair = extra.find(e => stemLike(e, m));
    if (pair) {
      caseSwaps.push({ used: pair, ideal: m });
      missing.splice(missing.indexOf(m), 1);
      extra.splice(extra.indexOf(pair), 1);
    }
  }

  /* 1 — Zaman kayması */
  const userTenses = detectTenses(builtRu);
  const idealTenses = detectTenses(idealRu);
  const tenseMissing = idealTenses.filter(t => !userTenses.includes(t));
  const tenseExtra = userTenses.filter(t => !idealTenses.includes(t));
  let tenseProblem = false;
  if (idealTenses.length > 0 && (tenseMissing.length > 0 || tenseExtra.length > 0) && (missing.length > 0 || extra.length > 0 || caseSwaps.length > 0)) {
    tenseProblem = true;
    const ideal = idealTenses.map(t => TENSE_TR[t]).join(' + ');
    const user = userTenses.length ? userTenses.map(t => TENSE_TR[t]).join(' + ') : 'belirsiz bir zaman';
    points.push({
      type: 'err', icon: '⏳',
      text: `ZAMAN KAYMASI: İdeal cümle ${ideal} anlatıyor; senin cümlen ${user} gibi duruyor. Rusçada zaman, fiilin biçimiyle taşınır — yanlış fiil biçimi cümlenin "ne zaman?" bilgisini değiştirir.`,
    });
  }

  /* 2 — Görünüş (вид) */
  const aspect = isEnglish() ? null : checkAspect(b, c);
  const aspectPoint = aspect?.point ?? null;
  if (aspect) {
    points.push(aspect.point);
    // Görünüş farkı zaten açıklandı; aynı çifti "eksik/fazla kelime" olarak tekrar sayma.
    const missingIndex = missing.indexOf(aspect.ideal);
    if (missingIndex !== -1) missing.splice(missingIndex, 1);
    const extraIndex = extra.indexOf(aspect.used);
    if (extraIndex !== -1) extra.splice(extraIndex, 1);
  }

  /* 3 — Şahıs ve cinsiyet uyumu */
  if (!isEnglish()) {
    const personPoint = checkPersonAgreement(b, c);
    if (personPoint) points.push(personPoint);
    const pastPoint = checkPastAgreement(b);
    if (pastPoint) points.push(pastPoint);
  }

  /* 4 — Kopula, olumsuzluk, dönüşlülük */
  if (!isEnglish()) {
    const bePoint = checkPresentBe(b);
    if (bePoint) points.push(bePoint);
    const negationPoint = checkNegationGenitive(b);
    if (negationPoint) points.push(negationPoint);
    const reflexivePoint = checkReflexive(b, c);
    if (reflexivePoint) points.push(reflexivePoint);
  }

  /* 5 — Edatlar */
  const userPreps = detectPreps(builtRu);
  const idealPreps = detectPreps(idealRu);
  const prepMissing = idealPreps.filter(p => !userPreps.includes(p));
  const prepExtra = userPreps.filter(p => !idealPreps.includes(p));
  let prepProblem = false;
  if (prepMissing.length > 0) {
    prepProblem = true;
    points.push({
      type: 'err', icon: '📍',
      text: `EDAT EKSİK: «${prepMissing.join('», «')}» cümlede yok. Bu edat(lar) olmadan yer/yön/ilişki bilgisi kurulamaz — cümle "nerede/nereye/kiminle?" sorusuna cevap veremez hâle gelir.`,
    });
  }
  if (prepExtra.length > 0) {
    prepProblem = true;
    points.push({
      type: 'warn', icon: '📍',
      text: `FAZLADAN EDAT: «${prepExtra.join('», «')}» ideal cümlede yok. Rusçada gereksiz edat, anlamı başka bir ilişkiye ("içinde" yerine "üstünde" gibi) kaydırır.`,
    });
  }
  if (!isEnglish()) {
    for (const governmentPoint of checkPrepositionGovernment(b)) points.push(governmentPoint);
  }

  /* 6 — Hâl ekleri: hangi hâl kullanılmış, hangisi olmalıydı? */
  const alreadyExplained = new Set(
    points.filter(point => ['♀️', '♂️', '👥', '👤', '🔄', '🎬'].includes(point.icon)).map(point => point.icon),
  );
  for (const swap of caseSwaps) {
    const shared = sharedPrefixLength(swap.used, swap.ideal);
    const marked = `${swap.ideal.slice(0, shared)}**${swap.ideal.slice(shared) || '∅'}**`;
    const looksLikeVerb = !isEnglish() && (
      isPastPair(swap.used, swap.ideal)
      || isPresentPair(swap.used, swap.ideal)
      || UNAMBIGUOUS_VERB_SHAPE.test(swap.ideal)
      || UNAMBIGUOUS_VERB_SHAPE.test(swap.used)
    );

    if (looksLikeVerb) {
      // Cinsiyet/şahıs/görünüş kontrolleri bu farkı zaten açıkladıysa tekrar etme.
      if (alreadyExplained.size > 0) continue;
      points.push({
        type: 'err', icon: '🔧',
        text: `FİİL BİÇİMİ: «${swap.used}» yerine «${swap.ideal}» olmalı (${marked}). Rusçada fiilin sonu kim, ne zaman ve hangi cinsiyette bilgisini taşır — kök doğru olsa bile yanlış ek cümlenin öznesini veya zamanını değiştirir.`,
      });
      continue;
    }

    const diagnosis = isEnglish() ? null : diagnoseCasePair(swap.used, swap.ideal);
    if (diagnosis) {
      points.push({
        type: 'err', icon: '🔤',
        text: `HÂL HATASI: «${swap.used}» = ${CASE_LABELS[diagnosis.usedCase].tr} (${CASE_LABELS[diagnosis.usedCase].question}), oysa burada ${CASE_LABELS[diagnosis.idealCase].tr} gerekiyor → «${swap.ideal}». ${CASE_LABELS[diagnosis.idealCase].use.replace(/[.\s]*$/, '')}. Kök aynı, değişen tek şey son ek: ${marked}.`,
      });
    } else {
      points.push({
        type: 'err', icon: '🔤',
        text: `ÇEKİM FARKI: «${swap.used}» yerine «${swap.ideal}» olmalı (${marked}). Kök aynı ama SONU farklı — Rusçada kelimenin sonu cümledeki görevini belirler; yanlış ek "kim kime ne yapıyor?" ilişkisini bozar.`,
      });
    }
  }

  /* 7 — Eksik / fazla içerik kelimeleri */
  const missContent = missing.filter(w => !PREPOSITIONS.includes(w));
  const extraContent = extra.filter(w => !PREPOSITIONS.includes(w));
  if (missContent.length > 0) {
    points.push({
      type: 'err', icon: '🧩',
      text: `EKSİK KELİME: «${missContent.join('», «')}» kullanılmamış. Bu parça(lar) olmadan cümle, "${idealTr}" anlamının tamamını taşımıyor.`,
    });
  }
  if (extraContent.length > 0) {
    points.push({
      type: 'warn', icon: '➕',
      text: `FAZLA KELİME: «${extraContent.join('», «')}» ideal cümlede yer almıyor — anlamı bulandırıyor veya tekrar yaratıyor.`,
    });
  }

  /* 8 — Söz dizimi */
  const sameSet = missing.length === 0 && extra.length === 0 && caseSwaps.length === 0;
  const sameOrder = b.join(' ') === c.join(' ');
  // Dizilim yorumu yalnızca kelime kümeleri GERÇEKTEN aynıysa anlamlıdır; aksi hâlde
  // başka bir kurala (görünüş, çekim) bağlı fark yanlışlıkla "sıra hatası" sanılır.
  const identicalMultiset = b.length === c.length && [...b].sort().join(' ') === [...c].sort().join(' ');
  if (sameSet && !sameOrder && identicalMultiset) {
    const orderPoint = checkWordOrder(b, c);
    if (orderPoint) points.push(orderPoint);
  }

  /* 9 — Yazım */
  for (const orthographyPoint of checkOrthography(built, idealRu)) points.push(orthographyPoint);

  /* 10 — Doğru yapılanlar */
  const correctUsed = c.filter(w => b.includes(w));
  if (correctUsed.length > 0 && points.some(point => point.type !== 'ok')) {
    points.push({
      type: 'ok', icon: '✅',
      text: `Doğru kullandıkların: «${correctUsed.slice(0, 6).join('», «')}»${correctUsed.length > 6 ? '…' : ''} — cümlenin bu iskeleti sağlam.`,
    });
  }

  /* 11 — Tek cümlelik kapanış tavsiyesi */
  const errorCount = points.filter(point => point.type === 'err').length;
  if (errorCount > 0) {
    const firstError = points.find(point => point.type === 'err');
    points.push({
      type: 'ok', icon: '🎯',
      text: errorCount === 1
        ? 'Tek bir yapısal hata var. Onu düzeltip cümleyi bir kez daha yüksek sesle oku — bu tekrar, kuralı kalıcı hâle getirir.'
        : `${errorCount} ayrı yapısal nokta var. Hepsini birden düzeltmeye çalışma: önce ${firstError?.icon ?? '•'} ile işaretli ilk maddeyi çöz, sonra cümleyi yeniden kur.`,
    });
  }

  /* 12 — Yakınlık puanı */
  let closeness = c.length > 0 ? (correctUsed.length / c.length) * 65 : 0;
  if (sameSet) closeness += 14;
  if (sameOrder) closeness += 16;
  if (tenseProblem) closeness -= 15;
  if (prepProblem) closeness -= 10;
  if (aspectPoint) closeness -= 12;
  closeness -= Math.min(18, caseSwaps.length * 6);
  closeness -= Math.min(12, points.filter(point => point.icon === '🧭').length * 6);
  if (points.some(point => point.icon === '👤' || point.icon === '♀️' || point.icon === '♂️' || point.icon === '👥')) closeness -= 8;
  closeness = Math.max(0, Math.min(100, Math.round(closeness)));

  /* 13 — Tek cümlelik hüküm */
  let verdictTr: string;
  if (sameSet && sameOrder) {
    verdictTr = 'Cümlen ideal cümleyle birebir aynı — anlam tam olarak yerinde. 🎯';
  } else if (aspectPoint) {
    verdictTr = `Kelimeler doğru ama GÖRÜNÜŞ seçimi "${idealTr}" anlamını kaydırıyor — Rus kulağı eylemin bitip bitmediğini yanlış duyar.`;
  } else if (tenseProblem) {
    verdictTr = `Cümlen anlaşılır ama "${idealTr}" cümlesinin ZAMANINI kaydırıyor — dinleyen kişi olayı yanlış zamana yerleştirir.`;
  } else if (points.some(point => point.icon === '🧭')) {
    verdictTr = 'Edatı doğru seçmişsin ama ardından gelen ismin HÂLİ uymuyor. Rusçada edat ve hâl bir bütündür; biri doğru diğeri yanlışsa yapı çöker.';
  } else if (prepProblem) {
    verdictTr = `Cümlen ana fikri veriyor fakat edat hatası yüzünden yer/yön ilişkisi "${idealTr}" anlamından sapıyor.`;
  } else if (points.some(point => point.icon === '👤' || point.icon === '♀️' || point.icon === '♂️' || point.icon === '👥')) {
    verdictTr = 'Yapı doğru kurulmuş ama fiil özneyle UYUŞMUYOR. Rusçada fiilin sonu özneyi taşır — bu ek yanlışsa cümlenin öznesi değişir.';
  } else if (caseSwaps.length > 0) {
    verdictTr = 'Kelimeler doğru seçilmiş ama çekimler (kelime sonları) rolleri karıştırıyor — Rus kulağı "kim, neyi?" sorusunda tökezler.';
  } else if (sameSet && !sameOrder && identicalMultiset) {
    verdictTr = 'Anlam olarak çok yakınsın: aynı kelimeler, farklı vurgu. Nötr sıralamayı kur ve cümleyi mühürle.';
  } else if (missContent.length > 0) {
    verdictTr = `Cümlen "${idealTr}" anlamının bir kısmını taşıyor ama eksik parçalar yüzünden mesaj yarım kalıyor.`;
  } else {
    verdictTr = 'Cümlen hedef anlama yaklaşıyor ama küçük sapmalar var — aşağıdaki maddelere bak.';
  }

  return { verdictTr, points, closeness };
}
