/**
 * RUSÇA BİÇİMBİLİM (MORFOLOJİ) MOTORU — yerel, deterministik, kütüphanesiz.
 *
 * Bu modül ajanın "ezberlenmiş metin" yerine GERÇEKTEN hesap yapmasını sağlar:
 *  • İsim çekimi (6 hâl × tekil/çoğul) — cinsiyet, sert/yumuşak gövde, canlılık ve
 *    Rusçanın yazım kuralları (к/г/х + ж/ч/ш/щ/ц) uygulanarak üretilir.
 *  • Fiil çekimi (1./2. çekim, geçmiş, emir, gelecek) — 2. çekimdeki ünsüz
 *    değişmeleri (д→ж, т→ч, с→ш, б→бл…) dâhil.
 *  • Sıfat çekimi (sert/yumuşak/karışık gövde).
 *  • Sayı uyumu (год / года / лет mantığı her isim için).
 *  • Gövde tahmini (lemma guessing): "книги", "книгу", "книге" → "книга".
 *  • Fonetik okunuş üretimi + hangi ses kuralının neden uygulandığının açıklaması.
 *
 * Hiçbir ağ çağrısı, model indirmesi veya token kullanımı yoktur.
 */

export type Gender = 'm' | 'f' | 'n' | 'pl' | '?';
export type CaseKey = 'nom' | 'gen' | 'dat' | 'acc' | 'ins' | 'pre';

export const CASE_LABELS: Record<CaseKey, { ru: string; tr: string; question: string; use: string }> = {
  nom: { ru: 'Именительный', tr: 'Yalın hâl', question: 'кто? что?', use: 'Özne ve sözlük biçimi' },
  gen: { ru: 'Родительный', tr: 'İlgi hâli', question: 'кого? чего?', use: 'Aitlik, yokluk (нет…), miktar, нет/без/для/из/от/у' },
  dat: { ru: 'Дательный', tr: 'Yönelme hâli', question: 'кому? чему?', use: 'Alıcı, "bana/sana", к ve по edatları, kişisiz yapılar' },
  acc: { ru: 'Винительный', tr: 'Belirtme hâli', question: 'кого? что?', use: 'Doğrudan nesne, в/на + hedef (куда?)' },
  ins: { ru: 'Творительный', tr: 'Araç hâli', question: 'кем? чем?', use: 'Araç, eşlik (с), meslek (работаю врачом)' },
  pre: { ru: 'Предложный', tr: 'Bulunma/Edat hâli', question: 'о ком? о чём? где?', use: 'Daima edatla: в/на (где?), о/об (hakkında)' },
};

export const CASE_ORDER: CaseKey[] = ['nom', 'gen', 'dat', 'acc', 'ins', 'pre'];

const VOWELS = 'аеёиоуыэюя';
const VELARS = 'кгх';
const HUSHERS = 'жчшщ';
const SIBILANT_C = 'ц';

const SOFT_SIGN = 'ь';

/** Yaygın -ь ile biten DİŞİL isimler (geri kalan -ь isimleri çoğunlukla erildir). */
const FEMININE_SOFT_SIGN = new Set([
  'дверь', 'ночь', 'дочь', 'мать', 'жизнь', 'любовь', 'часть', 'власть', 'речь', 'вещь',
  'помощь', 'площадь', 'тетрадь', 'кровать', 'мышь', 'соль', 'боль', 'роль', 'цель', 'модель',
  'осень', 'постель', 'степень', 'очередь', 'радость', 'новость', 'скорость', 'молодость',
  'возможность', 'ответственность', 'запись', 'связь', 'мысль', 'печь', 'ложь', 'рожь',
  'кость', 'грудь', 'тень', 'лень', 'сеть', 'смерть', 'честь', 'весть', 'страсть', 'масть',
  'опасность', 'национальность', 'специальность', 'деятельность', 'личность', 'область',
  'память', 'тысяча', 'мебель', 'медаль', 'деталь', 'сталь', 'даль', 'щель', 'ель', 'метель',
]);

/** Biçimce dişil ama anlamca ERİL olan isimler (папа, дядя…). */
const MASCULINE_A_NOUNS = new Set([
  'папа', 'дядя', 'дедушка', 'мужчина', 'юноша', 'коллега', 'судья', 'староста', 'слуга',
  'воевода', 'тамада', 'сирота', 'владыка', 'вельможа',
]);

/** Çoğulu düzensiz olan sık isimler. */
const IRREGULAR_PLURALS: Record<string, { nom: string; gen: string; dat: string; ins: string; pre: string }> = {
  человек: { nom: 'люди', gen: 'людей', dat: 'людям', ins: 'людьми', pre: 'людях' },
  ребёнок: { nom: 'дети', gen: 'детей', dat: 'детям', ins: 'детьми', pre: 'детях' },
  ребенок: { nom: 'дети', gen: 'детей', dat: 'детям', ins: 'детьми', pre: 'детях' },
  друг: { nom: 'друзья', gen: 'друзей', dat: 'друзьям', ins: 'друзьями', pre: 'друзьях' },
  брат: { nom: 'братья', gen: 'братьев', dat: 'братьям', ins: 'братьями', pre: 'братьях' },
  сын: { nom: 'сыновья', gen: 'сыновей', dat: 'сыновьям', ins: 'сыновьями', pre: 'сыновьях' },
  муж: { nom: 'мужья', gen: 'мужей', dat: 'мужьям', ins: 'мужьями', pre: 'мужьях' },
  стул: { nom: 'стулья', gen: 'стульев', dat: 'стульям', ins: 'стульями', pre: 'стульях' },
  дерево: { nom: 'деревья', gen: 'деревьев', dat: 'деревьям', ins: 'деревьями', pre: 'деревьях' },
  лист: { nom: 'листья', gen: 'листьев', dat: 'листьям', ins: 'листьями', pre: 'листьях' },
  город: { nom: 'города', gen: 'городов', dat: 'городам', ins: 'городами', pre: 'городах' },
  дом: { nom: 'дома', gen: 'домов', dat: 'домам', ins: 'домами', pre: 'домах' },
  глаз: { nom: 'глаза', gen: 'глаз', dat: 'глазам', ins: 'глазами', pre: 'глазах' },
  год: { nom: 'годы', gen: 'лет', dat: 'годам', ins: 'годами', pre: 'годах' },
  учитель: { nom: 'учителя', gen: 'учителей', dat: 'учителям', ins: 'учителями', pre: 'учителях' },
  доктор: { nom: 'доктора', gen: 'докторов', dat: 'докторам', ins: 'докторами', pre: 'докторах' },
  паспорт: { nom: 'паспорта', gen: 'паспортов', dat: 'паспортам', ins: 'паспортами', pre: 'паспортах' },
  поезд: { nom: 'поезда', gen: 'поездов', dat: 'поездам', ins: 'поездами', pre: 'поездах' },
  адрес: { nom: 'адреса', gen: 'адресов', dat: 'адресам', ins: 'адресами', pre: 'адресах' },
  номер: { nom: 'номера', gen: 'номеров', dat: 'номерам', ins: 'номерами', pre: 'номерах' },
  имя: { nom: 'имена', gen: 'имён', dat: 'именам', ins: 'именами', pre: 'именах' },
  время: { nom: 'времена', gen: 'времён', dat: 'временам', ins: 'временами', pre: 'временах' },
  мать: { nom: 'матери', gen: 'матерей', dat: 'матерям', ins: 'матерями', pre: 'матерях' },
  дочь: { nom: 'дочери', gen: 'дочерей', dat: 'дочерям', ins: 'дочерьми', pre: 'дочерях' },
  сосед: { nom: 'соседи', gen: 'соседей', dat: 'соседям', ins: 'соседями', pre: 'соседях' },
  яблоко: { nom: 'яблоки', gen: 'яблок', dat: 'яблокам', ins: 'яблоками', pre: 'яблоках' },
  ухо: { nom: 'уши', gen: 'ушей', dat: 'ушам', ins: 'ушами', pre: 'ушах' },
};

/** Canlı (animate) sayılması gereken sık isimler — belirtme hâli ilgi hâline eşitlenir. */
const ANIMATE_HINTS = [
  'человек', 'друг', 'брат', 'сестра', 'мама', 'папа', 'отец', 'мать', 'сын', 'дочь', 'ребён',
  'ребен', 'студент', 'учител', 'врач', 'доктор', 'сосед', 'коллег', 'кот', 'кошк', 'собак',
  'птиц', 'мальчик', 'девочк', 'девушк', 'женщин', 'мужчин', 'муж', 'жена', 'дедушк', 'бабушк',
  'директор', 'начальник', 'продавец', 'водитель', 'официант', 'инженер', 'актёр', 'актер',
];

export interface NounDeclension {
  lemma: string;
  gender: Gender;
  genderTr: string;
  animate: boolean;
  stemType: 'sert' | 'yumuşak' | 'karışık (ж/ч/ш/щ)' | 'velar (к/г/х)' | '-ия/-ие' | '-ь (dişil)';
  singular: Record<CaseKey, string>;
  plural: Record<CaseKey, string>;
  notes: string[];
}

function endsWithAny(word: string, list: string[]) {
  return list.some(suffix => word.endsWith(suffix));
}

function lastChar(word: string) {
  return word.slice(-1);
}

/** к/г/х veya ж/ч/ш/щ sonrası "ы" yazılamaz → "и" olur. */
function spellPlural(stem: string, soft: boolean): string {
  const final = lastChar(stem);
  if (soft) return `${stem}и`;
  if (VELARS.includes(final) || HUSHERS.includes(final)) return `${stem}и`;
  return `${stem}ы`;
}

/** ж/ч/ш/щ/ц sonrası vurgusuz "о" yazılamaz → "е" olur (мужем, сердцем). */
function spellO(stem: string, stressedO: boolean): string {
  const final = lastChar(stem);
  if (!stressedO && (HUSHERS.includes(final) || final === SIBILANT_C)) return 'е';
  return 'о';
}

/** ж/ч/ш/щ sonrası "я/ю" yazılamaz → "а/у" olur. */
function spellSoftVowel(stem: string, softVowel: 'я' | 'ю'): string {
  const final = lastChar(stem);
  if (HUSHERS.includes(final)) return softVowel === 'я' ? 'а' : 'у';
  return softVowel;
}

export function detectGender(word: string): Gender {
  const w = word.trim().toLocaleLowerCase('ru-RU');
  if (!w) return '?';
  if (MASCULINE_A_NOUNS.has(w)) return 'm';
  if (endsWithAny(w, ['мя'])) return 'n';
  if (endsWithAny(w, ['а', 'я'])) return 'f';
  if (endsWithAny(w, ['о', 'е', 'ё'])) return 'n';
  if (w.endsWith(SOFT_SIGN)) return FEMININE_SOFT_SIGN.has(w) ? 'f' : 'm';
  if (w.endsWith('й')) return 'm';
  return 'm';
}

export const GENDER_TR: Record<Gender, string> = {
  m: 'eril (мужской род)',
  f: 'dişil (женский род)',
  n: 'nötr (средний род)',
  pl: 'yalnız çoğul (pluralia tantum)',
  '?': 'belirsiz',
};

function isAnimate(word: string): boolean {
  const w = word.toLocaleLowerCase('ru-RU');
  return ANIMATE_HINTS.some(hint => w.startsWith(hint) || w.includes(hint));
}

/** Akıcı ünlü (беглая гласная): отец→отца, день→дня, окно→окон. */
function dropFleetingVowel(stem: string): string {
  const m = stem.match(/^(.*?)([ео])([бвгджзклмнпрстфхцчшщ])$/);
  if (!m) return stem;
  // Yalnız iyi bilinen kalıplarda uygula (aşırı genelleme yapma).
  const known = ['отец', 'конец', 'день', 'отец', 'кусок', 'подарок', 'ребёнок', 'замок', 'уголок', 'платок', 'песок', 'звонок', 'порядок', 'рынок', 'потолок'];
  if (known.some(k => `${stem}` === k.slice(0, -1) || k.startsWith(stem))) return `${m[1]}${m[3]}`;
  return stem;
}

/** Çoğul ilgi hâli (-ов / -ев / -ей / Ø) seçimi. */
function genitivePlural(lemma: string, gender: Gender, stem: string): string {
  if (IRREGULAR_PLURALS[lemma]) return IRREGULAR_PLURALS[lemma].gen;
  const final = lastChar(stem);
  if (gender === 'm') {
    if (lemma.endsWith('й')) return `${stem}ев`;
    if (lemma.endsWith(SOFT_SIGN)) return `${stem}ей`;
    if (HUSHERS.includes(final) || final === SIBILANT_C) return `${stem}ей`;
    return `${stem}ов`;
  }
  if (gender === 'f') {
    if (lemma.endsWith('ия')) return `${stem}й`;
    if (lemma.endsWith('я')) return `${stem}ь`;
    if (lemma.endsWith(SOFT_SIGN)) return `${stem}ей`;
    // -а: ek düşer, gerekirse araya ünlü girer (окно→окон, девушка→девушек)
    if (/[бвгджзклмнпрстфхцчшщ]{2}$/.test(stem)) {
      const insert = HUSHERS.includes(stem.slice(-1)) || HUSHERS.includes(stem.slice(-2, -1)) ? 'е' : 'о';
      return `${stem.slice(0, -1)}${insert}${stem.slice(-1)}`;
    }
    return stem;
  }
  // nötr
  if (lemma.endsWith('ие')) return `${stem}й`;
  if (lemma.endsWith('е')) return `${stem}ей`;
  if (/[бвгджзклмнпрстфхцчшщ]{2}$/.test(stem)) {
    const insert = HUSHERS.includes(stem.slice(-1)) ? 'е' : 'о';
    return `${stem.slice(0, -1)}${insert}${stem.slice(-1)}`;
  }
  return stem;
}

/**
 * Bir Rusça ismin 6 hâl × 2 sayı tablosunu üretir.
 * Kurallar yaklaşık değil, Rusçanın gerçek çekim sınıflarına göre uygulanır;
 * yine de düzensiz isimlerde tablo "beklenen biçim" olarak okunmalıdır.
 */
export function declineNoun(input: string): NounDeclension | null {
  const lemma = input.trim().toLocaleLowerCase('ru-RU').replace(/ё/g, 'ё');
  if (!lemma || !/^[а-яё-]+$/.test(lemma) || lemma.length < 2) return null;

  const gender = detectGender(lemma);
  const animate = isAnimate(lemma);
  const notes: string[] = [];
  let stemType: NounDeclension['stemType'] = 'sert';

  let stem = lemma;
  let soft = false;

  if (gender === 'm') {
    if (lemma.endsWith('й')) { stem = lemma.slice(0, -1); soft = true; stemType = 'yumuşak'; }
    else if (lemma.endsWith(SOFT_SIGN)) { stem = lemma.slice(0, -1); soft = true; stemType = 'yumuşak'; }
    else { stem = lemma; soft = false; stemType = VELARS.includes(lastChar(lemma)) ? 'velar (к/г/х)' : HUSHERS.includes(lastChar(lemma)) ? 'karışık (ж/ч/ш/щ)' : 'sert'; }
    stem = dropFleetingVowel(stem);
  } else if (gender === 'f') {
    if (lemma.endsWith('ия')) { stem = lemma.slice(0, -1); soft = true; stemType = '-ия/-ие'; }
    else if (lemma.endsWith('я')) { stem = lemma.slice(0, -1); soft = true; stemType = 'yumuşak'; }
    else if (lemma.endsWith('а')) { stem = lemma.slice(0, -1); soft = false; stemType = VELARS.includes(lastChar(lemma.slice(0, -1))) ? 'velar (к/г/х)' : HUSHERS.includes(lastChar(lemma.slice(0, -1))) ? 'karışık (ж/ч/ш/щ)' : 'sert'; }
    else if (lemma.endsWith(SOFT_SIGN)) { stem = lemma.slice(0, -1); soft = true; stemType = '-ь (dişil)'; }
    else { stem = lemma; }
  } else if (gender === 'n') {
    if (lemma.endsWith('ие')) { stem = lemma.slice(0, -1); soft = true; stemType = '-ия/-ие'; }
    else if (lemma.endsWith('е') || lemma.endsWith('ё')) { stem = lemma.slice(0, -1); soft = true; stemType = 'yumuşak'; }
    else if (lemma.endsWith('мя')) { stem = `${lemma.slice(0, -1)}ен`; soft = true; stemType = 'yumuşak'; notes.push('«-мя» ile biten 10 isim (имя, время, племя…) çekimde gövdeye **-ен-** ekler: имя → имени, временем.'); }
    else if (lemma.endsWith('о')) { stem = lemma.slice(0, -1); soft = false; stemType = 'sert'; }
    else { stem = lemma; }
  }

  const sg = {} as Record<CaseKey, string>;
  const pl = {} as Record<CaseKey, string>;

  if (gender === 'm') {
    sg.nom = lemma;
    sg.gen = soft ? `${stem}я` : `${stem}а`;
    sg.dat = soft ? `${stem}ю` : `${stem}у`;
    sg.acc = animate ? sg.gen : lemma;
    sg.ins = soft ? `${stem}ем` : `${stem}${spellO(stem, false)}м`;
    sg.pre = `${stem}е`;
    const irregular = IRREGULAR_PLURALS[lemma];
    pl.nom = irregular ? irregular.nom : soft ? `${stem}и` : spellPlural(stem, false);
    pl.gen = genitivePlural(lemma, gender, stem);
    pl.dat = irregular ? irregular.dat : soft ? `${stem}ям` : `${stem}ам`;
    pl.acc = animate ? pl.gen : pl.nom;
    pl.ins = irregular ? irregular.ins : soft ? `${stem}ями` : `${stem}ами`;
    pl.pre = irregular ? irregular.pre : soft ? `${stem}ях` : `${stem}ах`;
  } else if (gender === 'f') {
    const isIya = lemma.endsWith('ия');
    const isSoftSign = lemma.endsWith(SOFT_SIGN);
    sg.nom = lemma;
    if (isSoftSign) {
      sg.gen = `${stem}и`; sg.dat = `${stem}и`; sg.acc = lemma;
      sg.ins = `${stem}ью`; sg.pre = `${stem}и`;
    } else {
      sg.gen = soft ? `${stem}и` : spellPlural(stem, false) === `${stem}и` ? `${stem}и` : `${stem}ы`;
      if (!soft && (VELARS.includes(lastChar(stem)) || HUSHERS.includes(lastChar(stem)))) sg.gen = `${stem}и`;
      sg.dat = isIya ? `${stem}и` : `${stem}е`;
      sg.acc = soft ? `${stem}${spellSoftVowel(stem, 'ю')}` : `${stem}у`;
      sg.ins = soft
        ? `${stem}ей`
        : `${stem}${HUSHERS.includes(lastChar(stem)) || lastChar(stem) === SIBILANT_C ? 'е' : 'о'}й`;
      sg.pre = isIya ? `${stem}и` : `${stem}е`;
    }
    const irregularF = IRREGULAR_PLURALS[lemma];
    pl.nom = irregularF ? irregularF.nom : isSoftSign || soft ? `${stem}и` : spellPlural(stem, false);
    pl.gen = genitivePlural(lemma, gender, stem);
    pl.dat = irregularF ? irregularF.dat : soft || isSoftSign ? `${stem}ям` : `${stem}ам`;
    pl.acc = animate ? pl.gen : pl.nom;
    pl.ins = irregularF ? irregularF.ins : soft || isSoftSign ? `${stem}ями` : `${stem}ами`;
    pl.pre = irregularF ? irregularF.pre : soft || isSoftSign ? `${stem}ях` : `${stem}ах`;
  } else {
    const isIe = lemma.endsWith('ие');
    sg.nom = lemma;
    sg.gen = soft ? `${stem}я` : `${stem}а`;
    sg.dat = soft ? `${stem}ю` : `${stem}у`;
    sg.acc = lemma;
    sg.ins = soft ? `${stem}ем` : `${stem}${spellO(stem, false)}м`;
    sg.pre = isIe ? `${stem}и` : `${stem}е`;
    const irregularN = IRREGULAR_PLURALS[lemma];
    pl.nom = irregularN ? irregularN.nom : soft ? `${stem}я` : `${stem}а`;
    pl.gen = genitivePlural(lemma, gender, stem);
    pl.dat = irregularN ? irregularN.dat : soft ? `${stem}ям` : `${stem}ам`;
    pl.acc = pl.nom;
    pl.ins = irregularN ? irregularN.ins : soft ? `${stem}ями` : `${stem}ами`;
    pl.pre = irregularN ? irregularN.pre : soft ? `${stem}ях` : `${stem}ах`;
  }

  if (VELARS.includes(lastChar(stem))) {
    notes.push('**Yazım kuralı 1:** к/г/х sonrasında «ы» yazılmaz → «и» gelir (книга → кни**ги**, не книгы).');
  }
  if (HUSHERS.includes(lastChar(stem))) {
    notes.push('**Yazım kuralı 2:** ж/ч/ш/щ sonrasında «ы, я, ю» yazılmaz → «и, а, у» gelir; vurgusuz «о» yerine «е» yazılır (товарищ → товарищ**ем**).');
  }
  if (animate) {
    notes.push('**Canlılık:** Bu isim canlı sayıldığı için **belirtme hâli = ilgi hâli** olur (вижу бра**та**, не вижу брат).');
  } else if (gender === 'm') {
    notes.push('**Canlılık:** Cansız eril isimlerde **belirtme hâli = yalın hâl** (вижу стол).');
  }
  if (IRREGULAR_PLURALS[lemma]) {
    notes.push(`**Düzensiz çoğul:** ${lemma} → **${IRREGULAR_PLURALS[lemma].nom}** (ilgi çoğul: ${IRREGULAR_PLURALS[lemma].gen}). Bu biçim kural dışıdır, ezberlenir.`);
  }
  notes.push('**Vurgu uyarısı:** Çekim sırasında vurgu kayabilir (окно́ → о́кна). Tablo harf dizilimini verir; vurgu için sözlük biçimine bak.');

  return {
    lemma,
    gender,
    genderTr: GENDER_TR[gender],
    animate,
    stemType,
    singular: sg,
    plural: pl,
    notes,
  };
}

/* ────────────────────────── FİİL ÇEKİMİ ────────────────────────── */

export interface VerbConjugation {
  infinitive: string;
  conjugationClass: '1. çekim (-е-)' | '2. çekim (-и-)' | 'düzensiz';
  aspect: 'bitmemiş (несов.)' | 'bitmiş (сов.)' | 'belirsiz';
  present: Record<'ya' | 'ty' | 'on' | 'my' | 'vy' | 'oni', string>;
  presentLabel: string;
  past: { m: string; f: string; n: string; pl: string };
  future: string;
  imperative: { ty: string; vy: string };
  reflexive: boolean;
  notes: string[];
}

/** Sık kullanılan düzensiz fiiller — tam biçimleriyle. */
const IRREGULAR_VERBS: Record<string, { cls: VerbConjugation['conjugationClass']; forms: string[]; past?: string[]; imp?: [string, string]; note?: string }> = {
  быть: { cls: 'düzensiz', forms: ['есть', 'есть', 'есть', 'есть', 'есть', 'суть'], past: ['был', 'была', 'было', 'были'], imp: ['будь', 'будьте'], note: 'Şimdiki zamanda быть **kullanılmaz**: «Я студент» (есть yalnız vurgulu/varlık bildiren yapıda).' },
  идти: { cls: 'düzensiz', forms: ['иду', 'идёшь', 'идёт', 'идём', 'идёте', 'идут'], past: ['шёл', 'шла', 'шло', 'шли'], imp: ['иди', 'идите'], note: 'Geçmiş zamanı gövde değiştirir: **шёл / шла / шли**.' },
  ехать: { cls: 'düzensiz', forms: ['еду', 'едешь', 'едет', 'едем', 'едете', 'едут'], past: ['ехал', 'ехала', 'ехало', 'ехали'], imp: ['поезжай', 'поезжайте'], note: 'Emir biçimi gövdeden türemez: **поезжай(те)**.' },
  хотеть: { cls: 'düzensiz', forms: ['хочу', 'хочешь', 'хочет', 'хотим', 'хотите', 'хотят'], past: ['хотел', 'хотела', 'хотело', 'хотели'], note: 'Tekilde 1., çoğulda 2. çekim gibi davranan **karışık** fiildir.' },
  мочь: { cls: 'düzensiz', forms: ['могу', 'можешь', 'может', 'можем', 'можете', 'могут'], past: ['мог', 'могла', 'могло', 'могли'], note: 'г/ж değişmesi: мо**г**у / мо**ж**ешь.' },
  есть: { cls: 'düzensiz', forms: ['ем', 'ешь', 'ест', 'едим', 'едите', 'едят'], past: ['ел', 'ела', 'ело', 'ели'], imp: ['ешь', 'ешьте'] },
  дать: { cls: 'düzensiz', forms: ['дам', 'дашь', 'даст', 'дадим', 'дадите', 'дадут'], past: ['дал', 'дала', 'дало', 'дали'], imp: ['дай', 'дайте'] },
  пить: { cls: 'düzensiz', forms: ['пью', 'пьёшь', 'пьёт', 'пьём', 'пьёте', 'пьют'], past: ['пил', 'пила', 'пило', 'пили'], imp: ['пей', 'пейте'] },
  жить: { cls: 'düzensiz', forms: ['живу', 'живёшь', 'живёт', 'живём', 'живёте', 'живут'], past: ['жил', 'жила', 'жило', 'жили'], imp: ['живи', 'живите'] },
  писать: { cls: 'düzensiz', forms: ['пишу', 'пишешь', 'пишет', 'пишем', 'пишете', 'пишут'], past: ['писал', 'писала', 'писало', 'писали'], imp: ['пиши', 'пишите'], note: 'с→ш değişmesi bütün şimdiki zamanda görülür.' },
  ждать: { cls: 'düzensiz', forms: ['жду', 'ждёшь', 'ждёт', 'ждём', 'ждёте', 'ждут'], past: ['ждал', 'ждала', 'ждало', 'ждали'] },
  брать: { cls: 'düzensiz', forms: ['беру', 'берёшь', 'берёт', 'берём', 'берёте', 'берут'], past: ['брал', 'брала', 'брало', 'брали'] },
  звать: { cls: 'düzensiz', forms: ['зову', 'зовёшь', 'зовёт', 'зовём', 'зовёте', 'зовут'], past: ['звал', 'звала', 'звало', 'звали'] },
  спать: { cls: 'düzensiz', forms: ['сплю', 'спишь', 'спит', 'спим', 'спите', 'спят'], past: ['спал', 'спала', 'спало', 'спали'], note: 'п→пл değişmesi yalnız **1. tekil**de: с**пл**ю.' },
  бежать: { cls: 'düzensiz', forms: ['бегу', 'бежишь', 'бежит', 'бежим', 'бежите', 'бегут'], past: ['бежал', 'бежала', 'бежало', 'бежали'] },
  взять: { cls: 'düzensiz', forms: ['возьму', 'возьмёшь', 'возьмёт', 'возьмём', 'возьмёте', 'возьмут'], past: ['взял', 'взяла', 'взяло', 'взяли'], imp: ['возьми', 'возьмите'] },
  сказать: { cls: 'düzensiz', forms: ['скажу', 'скажешь', 'скажет', 'скажем', 'скажете', 'скажут'], past: ['сказал', 'сказала', 'сказало', 'сказали'], imp: ['скажи', 'скажите'], note: 'з→ж değişmesi bütün biçimlerde.' },
  ходить: { cls: '2. çekim (-и-)', forms: ['хожу', 'ходишь', 'ходит', 'ходим', 'ходите', 'ходят'], past: ['ходил', 'ходила', 'ходило', 'ходили'], note: 'д→ж değişmesi yalnız **1. tekil**de: хо**ж**у.' },
  любить: { cls: '2. çekim (-и-)', forms: ['люблю', 'любишь', 'любит', 'любим', 'любите', 'любят'], past: ['любил', 'любила', 'любило', 'любили'], note: 'б→бл değişmesi yalnız **1. tekil**de: лю**бл**ю.' },
  купить: { cls: '2. çekim (-и-)', forms: ['куплю', 'купишь', 'купит', 'купим', 'купите', 'купят'], past: ['купил', 'купила', 'купило', 'купили'], note: 'п→пл değişmesi yalnız 1. tekilde.' },
  готовить: { cls: '2. çekim (-и-)', forms: ['готовлю', 'готовишь', 'готовит', 'готовим', 'готовите', 'готовят'], past: ['готовил', 'готовила', 'готовило', 'готовили'], note: 'в→вл değişmesi yalnız 1. tekilde.' },
  просить: { cls: '2. çekim (-и-)', forms: ['прошу', 'просишь', 'просит', 'просим', 'просите', 'просят'], past: ['просил', 'просила', 'просило', 'просили'], note: 'с→ш değişmesi yalnız 1. tekilde.' },
  платить: { cls: '2. çekim (-и-)', forms: ['плачу', 'платишь', 'платит', 'платим', 'платите', 'платят'], past: ['платил', 'платила', 'платило', 'платили'], note: 'т→ч değişmesi yalnız 1. tekilde.' },
  видеть: { cls: '2. çekim (-и-)', forms: ['вижу', 'видишь', 'видит', 'видим', 'видите', 'видят'], past: ['видел', 'видела', 'видело', 'видели'], note: '-еть ile bitse de **2. çekim** istisnasıdır; д→ж değişir.' },
  слышать: { cls: '2. çekim (-и-)', forms: ['слышу', 'слышишь', 'слышит', 'слышим', 'слышите', 'слышат'], past: ['слышал', 'слышала', 'слышало', 'слышали'], note: '-ать ile bitse de 2. çekim istisnasıdır.' },
  смотреть: { cls: '2. çekim (-и-)', forms: ['смотрю', 'смотришь', 'смотрит', 'смотрим', 'смотрите', 'смотрят'], past: ['смотрел', 'смотрела', 'смотрело', 'смотрели'], note: '-еть istisna grubundandır → 2. çekim.' },
  стоять: { cls: '2. çekim (-и-)', forms: ['стою', 'стоишь', 'стоит', 'стоим', 'стоите', 'стоят'], past: ['стоял', 'стояла', 'стояло', 'стояли'] },
  держать: { cls: '2. çekim (-и-)', forms: ['держу', 'держишь', 'держит', 'держим', 'держите', 'держат'], past: ['держал', 'держала', 'держало', 'держали'] },
};

/** 2. çekim ünsüz değişmeleri (yalnız 1. tekil şahısta). */
const MUTATIONS: Array<[RegExp, string]> = [
  [/ст$/, 'щ'], [/д$/, 'ж'], [/т$/, 'ч'], [/з$/, 'ж'], [/с$/, 'ш'],
  [/б$/, 'бл'], [/в$/, 'вл'], [/м$/, 'мл'], [/п$/, 'пл'], [/ф$/, 'фл'],
];

/** -ить ile bitmeyip yine de 2. çekim olan istisnalar. */
const SECOND_CONJ_EXCEPTIONS = new Set([
  'смотреть', 'видеть', 'ненавидеть', 'зависеть', 'терпеть', 'обидеть', 'вертеть',
  'слышать', 'дышать', 'держать', 'гнать', 'стоять', 'бояться', 'спать',
]);

/** -ить ile bittiği hâlde 1. çekim olan istisnalar. */
const FIRST_CONJ_EXCEPTIONS = new Set(['брить', 'стелить', 'зиждиться', 'пить', 'бить', 'шить', 'лить', 'вить', 'жить']);

/** Bitmemiş ↔ bitmiş görünüş eşini tahmin eder (yaygın kalıplara göre). */
const ASPECT_PAIRS: Record<string, string> = {
  делать: 'сделать', читать: 'прочитать', писать: 'написать', говорить: 'сказать',
  смотреть: 'посмотреть', слушать: 'послушать', есть: 'съесть', пить: 'выпить',
  идти: 'пойти', ехать: 'поехать', брать: 'взять', давать: 'дать', покупать: 'купить',
  видеть: 'увидеть', спрашивать: 'спросить', отвечать: 'ответить', начинать: 'начать',
  заканчивать: 'закончить', понимать: 'понять', получать: 'получить', встречать: 'встретить',
  забывать: 'забыть', вспоминать: 'вспомнить', объяснять: 'объяснить', решать: 'решить',
  открывать: 'открыть', закрывать: 'закрыть', готовить: 'приготовить', учить: 'выучить',
  помогать: 'помочь', звонить: 'позвонить', показывать: 'показать', рассказывать: 'рассказать',
};

function guessAspect(infinitive: string): VerbConjugation['aspect'] {
  // En güvenilir kaynak bilinen görünüş çiftleridir.
  if (ASPECT_PAIRS[infinitive]) return 'bitmemiş (несов.)';
  if (Object.values(ASPECT_PAIRS).includes(infinitive)) return 'bitmiş (сов.)';
  // Sonek ipuçları
  if (/(ывать|ивать)$/.test(infinitive)) return 'bitmemiş (несов.)';
  if (/нуть$/.test(infinitive) && infinitive.length > 5) return 'bitmiş (сов.)';
  // Önek ipucu — tek harfli önekler (с, у, о, в) güvenilmez olduğu için dışarıda bırakılır.
  const perfectivePrefixes = ['про', 'пере', 'при', 'раз', 'рас', 'под', 'над', 'вы', 'за', 'на', 'по', 'до', 'из', 'от', 'об'];
  const known = new Set([...SECOND_CONJ_EXCEPTIONS, ...FIRST_CONJ_EXCEPTIONS, 'работать', 'понимать', 'начинать', 'получать', 'помогать', 'показывать']);
  if (!known.has(infinitive) && perfectivePrefixes.some(p => infinitive.startsWith(p)) && infinitive.length > 6) {
    return 'bitmiş (сов.)';
  }
  return 'bitmemiş (несов.)';
}

/** Düzensiz fiillerin emir biçimini 3. çoğul gövdesinden türetir (любят → люби). */
function imperativeFromForms(forms: string[]): [string, string] {
  const third = forms[5] || forms[0];
  const stem = third.replace(/(ют|ут|ят|ат)$/, '');
  if (!stem || stem === third) return [third, `${third}те`];
  const base = VOWELS.includes(stem.slice(-1)) ? `${stem}й` : `${stem}и`;
  return [base, `${base}те`];
}

export function conjugateVerb(input: string): VerbConjugation | null {
  const raw = input.trim().toLocaleLowerCase('ru-RU');
  if (!raw || !/^[а-яё]+$/.test(raw)) return null;
  const reflexive = /(ся|сь)$/.test(raw) && raw.length > 5;
  const infinitive = reflexive ? raw.replace(/(ся|сь)$/, '') : raw;
  if (!/(ть|ти|чь)$/.test(infinitive)) return null;

  const notes: string[] = [];
  const irregular = IRREGULAR_VERBS[infinitive];
  const aspect = guessAspect(infinitive);

  let cls: VerbConjugation['conjugationClass'];
  let forms: string[];
  let past: string[];
  let imperative: [string, string];

  if (irregular) {
    cls = irregular.cls;
    forms = [...irregular.forms];
    past = irregular.past ? [...irregular.past] : [`${infinitive.slice(0, -2)}л`, `${infinitive.slice(0, -2)}ла`, `${infinitive.slice(0, -2)}ло`, `${infinitive.slice(0, -2)}ли`];
    imperative = irregular.imp ?? imperativeFromForms(forms);
    if (irregular.note) notes.push(`⚠️ **Düzensiz:** ${irregular.note}`);
  } else if (infinitive.endsWith('ить') && !FIRST_CONJ_EXCEPTIONS.has(infinitive)) {
    cls = '2. çekim (-и-)';
    const stem = infinitive.slice(0, -3);
    let firstStem = stem;
    for (const [re, rep] of MUTATIONS) {
      if (re.test(stem)) { firstStem = stem.replace(re, rep); notes.push(`⚙️ **Ünsüz değişmesi:** 1. tekil şahısta gövde «${stem}» → «${firstStem}» olur; diğer şahıslarda **değişmez**.`); break; }
    }
    const yu = HUSHERS.includes(lastChar(firstStem)) ? 'у' : 'ю';
    const ya = HUSHERS.includes(lastChar(stem)) ? 'ат' : 'ят';
    forms = [`${firstStem}${yu}`, `${stem}ишь`, `${stem}ит`, `${stem}им`, `${stem}ите`, `${stem}${ya}`];
    past = [`${stem}ил`, `${stem}ила`, `${stem}ило`, `${stem}или`];
    imperative = [`${stem}и`, `${stem}ите`];
  } else if (SECOND_CONJ_EXCEPTIONS.has(infinitive)) {
    cls = '2. çekim (-и-)';
    const stem = infinitive.slice(0, -3);
    const yu = HUSHERS.includes(lastChar(stem)) ? 'у' : 'ю';
    const ya = HUSHERS.includes(lastChar(stem)) ? 'ат' : 'ят';
    forms = [`${stem}${yu}`, `${stem}ишь`, `${stem}ит`, `${stem}им`, `${stem}ите`, `${stem}${ya}`];
    past = [`${infinitive.slice(0, -2)}л`, `${infinitive.slice(0, -2)}ла`, `${infinitive.slice(0, -2)}ло`, `${infinitive.slice(0, -2)}ли`];
    imperative = [`${stem}и`, `${stem}ите`];
    notes.push('📌 Bu fiil **-ить ile bitmediği hâlde 2. çekimdir** (ünlü "и" alır) — ezberlenmesi gereken istisna listesindendir.');
  } else {
    cls = '1. çekim (-е-)';
    const pastStem = infinitive.slice(0, -2);
    let stem = pastStem;
    // -овать / -евать → gövde -у-/-ю- olur: рисовать → рису-, танцевать → танцу-
    if (/овать$/.test(infinitive)) {
      stem = `${infinitive.slice(0, -5)}у`;
      notes.push('🔁 **-овать kuralı:** Şimdiki zamanda gövde **-у-** olur: рисовать → рису**ю**, рису**ешь**.');
    } else if (/евать$/.test(infinitive)) {
      stem = `${infinitive.slice(0, -5)}${HUSHERS.includes(infinitive.slice(-6, -5)) || infinitive.slice(-6, -5) === 'ц' ? 'у' : 'ю'}`;
      notes.push('🔁 **-евать kuralı:** Şimdiki zamanda gövde **-у-/-ю-** olur: танцевать → танцу**ю**.');
    } else if (/авать$/.test(infinitive)) {
      stem = infinitive.slice(0, -4);
      notes.push('🔁 **-авать kuralı:** Şimdiki zamanda **-ва-** düşer: давать → да**ю**, вставать → вста**ю**.');
    }
    const vowelFinal = VOWELS.includes(lastChar(stem));
    const yu = vowelFinal || !HUSHERS.includes(lastChar(stem)) ? 'ю' : 'у';
    const yut = vowelFinal || !HUSHERS.includes(lastChar(stem)) ? 'ют' : 'ут';
    forms = [`${stem}${yu}`, `${stem}ешь`, `${stem}ет`, `${stem}ем`, `${stem}ете`, `${stem}${yut}`];
    past = [`${pastStem}л`, `${pastStem}ла`, `${pastStem}ло`, `${pastStem}ли`];
    imperative = vowelFinal ? [`${stem}й`, `${stem}йте`] : [`${stem}и`, `${stem}ите`];
  }

  const suffix = reflexive ? 'ся' : '';
  const sufSoft = reflexive ? 'сь' : '';
  const refl = (form: string) => reflexive ? `${form}${VOWELS.includes(lastChar(form)) ? sufSoft : suffix}` : form;

  if (reflexive) {
    notes.push('🔁 **Dönüşlü fiil (-ся/-сь):** Ünlüden sonra **-сь**, ünsüzden sonra **-ся** gelir. Dönüşlü fiiller doğrudan nesne almaz.');
  }
  if (aspect === 'bitmiş (сов.)') {
    notes.push('⏱️ **Görünüş uyarısı:** Bu fiil **bitmiş görünüşlü** sayılıyor. Bitmiş fiillerin **gerçek şimdiki zamanı yoktur**; aşağıdaki "şimdiki" satırı aslında **basit gelecek** anlamı taşır (я прочитаю = okuyacağım/okuyup bitireceğim).');
  }

  const presentIsFuture = aspect === 'bitmiş (сов.)';

  return {
    infinitive: raw,
    conjugationClass: cls,
    aspect,
    present: {
      ya: refl(forms[0]), ty: refl(forms[1]), on: refl(forms[2]),
      my: refl(forms[3]), vy: refl(forms[4]), oni: refl(forms[5]),
    },
    presentLabel: presentIsFuture ? 'BASİT GELECEK (bitmiş görünüş)' : 'ŞİMDİKİ ZAMAN',
    past: { m: refl(past[0]), f: refl(past[1]), n: refl(past[2]), pl: refl(past[3]) },
    future: presentIsFuture ? refl(forms[0]) : `буду ${raw}`,
    imperative: { ty: refl(imperative[0]), vy: refl(imperative[1]) },
    reflexive,
    notes,
  };
}

/* ────────────────────────── SIFAT ÇEKİMİ ────────────────────────── */

export interface AdjectiveForms {
  lemma: string;
  type: 'sert' | 'yumuşak' | 'karışık';
  m: string; f: string; n: string; pl: string;
  cases: Array<{ case: CaseKey; m: string; f: string; n: string; pl: string }>;
  shortForms: string;
  comparative: string;
  superlative: string;
  notes: string[];
}

export function declineAdjective(input: string): AdjectiveForms | null {
  const lemma = input.trim().toLocaleLowerCase('ru-RU');
  if (!/^[а-яё]+(ый|ий|ой)$/.test(lemma)) return null;
  const stem = lemma.slice(0, -2);
  const final = lastChar(stem);
  const soft = lemma.endsWith('ий') && !VELARS.includes(final) && !HUSHERS.includes(final);
  const mixed = VELARS.includes(final) || HUSHERS.includes(final);
  const type: AdjectiveForms['type'] = soft ? 'yumuşak' : mixed ? 'karışık' : 'sert';

  const i = soft || mixed ? 'и' : 'ы';
  const o = HUSHERS.includes(final) && !lemma.endsWith('ой') ? 'е' : 'о';
  const ya = soft ? 'я' : 'а';
  const yu = soft ? 'ю' : 'у';
  const ye = soft ? 'е' : 'о';

  const m = lemma;
  const f = `${stem}${ya}я`;
  const n = soft ? `${stem}ее` : `${stem}${o}е`;
  const pl = `${stem}${i}е`;

  const cases: AdjectiveForms['cases'] = [
    { case: 'nom', m, f, n, pl },
    { case: 'gen', m: `${stem}${ye}го`, f: `${stem}${soft ? 'е' : o}й`, n: `${stem}${ye}го`, pl: `${stem}${i}х` },
    { case: 'dat', m: `${stem}${ye}му`, f: `${stem}${soft ? 'е' : o}й`, n: `${stem}${ye}му`, pl: `${stem}${i}м` },
    { case: 'acc', m: `${m} / ${stem}${ye}го (canlı)`, f: `${stem}${yu}ю`, n, pl: `${pl} / ${stem}${i}х (canlı)` },
    { case: 'ins', m: `${stem}${i}м`, f: `${stem}${soft ? 'е' : o}й`, n: `${stem}${i}м`, pl: `${stem}${i}ми` },
    { case: 'pre', m: `${stem}${ye}м`, f: `${stem}${soft ? 'е' : o}й`, n: `${stem}${ye}м`, pl: `${stem}${i}х` },
  ];

  const notes = [
    '🔗 **Uyum kuralı:** Sıfat, nitelediği ismin **cinsiyet + sayı + hâline** uyar. İsim değişince sıfat da değişir: о нов**ой** книг**е**.',
    '🗣️ **Okunuş tuzağı:** İlgi/belirtme hâlindeki **-ого / -его** eki [-ava] / [-eva] okunur: нового → [nóvava].',
  ];
  if (mixed) notes.push('✍️ **Karışık gövde:** к/г/х ve ж/ч/ш/щ sonrası «ы» yerine **и** yazılır: русск**ий**, больш**ие**.');
  if (soft) notes.push('🫧 **Yumuşak gövde:** Bütün eklerde yumuşak ünlü dizisi kullanılır: син**ий**, син**яя**, син**ее**, син**ие**.');

  return {
    lemma, type, m, f, n, pl, cases,
    shortForms: `${stem}${HUSHERS.includes(final) ? '' : ''} / ${stem}а / ${stem}о / ${stem}ы (yüklem görevinde kısa biçim — her sıfatta bulunmaz)`,
    comparative: `${stem}ее (veya более ${lemma})`,
    superlative: `самый ${lemma} (veya ${stem}ейший)`,
    notes,
  };
}

/* ─────────────────── SAYI UYUMU VE GÖVDE TAHMİNİ ─────────────────── */

/** 1 год / 2 года / 5 лет mantığını HERHANGİ bir isim için uygular. */
export function numberAgreement(n: number, forms: { one: string; few: string; many: string }): string {
  const lastTwo = Math.abs(n) % 100;
  const last = Math.abs(n) % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return forms.many;
  if (last === 1) return forms.one;
  if (last >= 2 && last <= 4) return forms.few;
  return forms.many;
}

export function yearForm(n: number): string {
  return numberAgreement(n, { one: 'год', few: 'года', many: 'лет' });
}

export function explainNumberAgreement(n: number): string {
  const lastTwo = Math.abs(n) % 100;
  const last = Math.abs(n) % 10;
  if (lastTwo >= 11 && lastTwo <= 14) {
    return `${n} sayısının son iki hanesi **${lastTwo}** ve 11–14 aralığındadır → bu grup **istisnadır**, son rakama bakılmaz, daima **çoğul ilgi hâli** (лет) gelir.`;
  }
  if (last === 1) return `${n} sayısı **1** ile bittiği için (ve 11 değil) ad **tekil yalın** biçimde kalır → год.`;
  if (last >= 2 && last <= 4) return `${n} sayısı **${last}** ile bittiği için (2–4 grubu) ad **tekil ilgi hâli** alır → года.`;
  return `${n} sayısı **${last}** ile bittiği için (5–9 ve 0 grubu) ad **çoğul ilgi hâli** alır → лет.`;
}

const CASE_ENDINGS_FOR_LEMMA: Array<[RegExp, string[]]> = [
  [/ами$/, ['а', 'ы', '']], [/ями$/, ['я', 'ь', 'е']], [/ах$/, ['а', '']], [/ях$/, ['я', 'ь', 'е']],
  [/ов$/, ['']], [/ев$/, ['й', 'ь']], [/ей$/, ['ь', 'я', 'е', '']],
  [/ами$/, ['а']], [/ом$/, ['']], [/ем$/, ['ь', 'й', 'е']], [/ой$/, ['а']], [/ою$/, ['а']],
  [/у$/, ['', 'а']], [/ю$/, ['ь', 'я', 'й']], [/е$/, ['а', '', 'я', 'о']],
  [/и$/, ['а', 'ь', 'я', '']], [/ы$/, ['а', '']], [/а$/, ['', 'о']], [/я$/, ['ь', 'е', 'й']],
  [/ях$/, ['я']], [/ах$/, ['а']],
];

/**
 * «книги / книгу / книге / книгами» gibi çekimli biçimlerden olası sözlük biçimlerini üretir.
 * Sözlük/indeks ile kesiştirilerek kullanılır; tek başına kesin sonuç vermez.
 */
export function guessLemmaCandidates(form: string): string[] {
  const w = form.trim().toLocaleLowerCase('ru-RU').replace(/ё/g, 'е');
  if (!w || w.length < 3 || !/^[а-я]+$/.test(w)) return [];
  const out = new Set<string>([w]);

  for (const [re, replacements] of CASE_ENDINGS_FOR_LEMMA) {
    const m = w.match(re);
    if (!m) continue;
    const stem = w.slice(0, w.length - m[0].length);
    if (stem.length < 2) continue;
    for (const rep of replacements) out.add(`${stem}${rep}`);
  }

  // Fiil biçimleri → mastar denemeleri
  const verbStem = w.replace(/(ю|у|ешь|ёшь|ет|ёт|ем|ём|ете|ёте|ют|ут|ишь|ит|им|ите|ят|ат|л|ла|ло|ли)(сь|ся)?$/, '');
  if (verbStem.length >= 3 && verbStem !== w) {
    out.add(`${verbStem}ать`); out.add(`${verbStem}ить`); out.add(`${verbStem}еть`);
    out.add(`${verbStem}ять`); out.add(`${verbStem}ть`); out.add(`${verbStem}овать`);
  }

  // Sıfat biçimleri → yalın eril
  const adjStem = w.replace(/(ого|его|ому|ему|ым|им|ой|ей|ая|яя|ое|ее|ые|ие|ых|их|ым|им|ую|юю|ом|ем)$/, '');
  if (adjStem.length >= 3 && adjStem !== w) {
    out.add(`${adjStem}ый`); out.add(`${adjStem}ий`); out.add(`${adjStem}ой`);
  }

  out.delete(w);
  return [...out].filter(candidate => candidate.length >= 2).slice(0, 24);
}

/* ─────────────────── FONETİK: OKUNUŞ ÜRETİCİ ─────────────────── */

const VOICED_TO_VOICELESS: Record<string, string> = { 'б': 'p', 'в': 'f', 'г': 'k', 'д': 't', 'ж': 'ş', 'з': 's' };
const BASE_READING: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'ye', ё: 'yo', ж: 'j', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ç', ш: 'ş', щ: 'şç', ъ: '', ы: 'ı', ь: "'",
  э: 'e', ю: 'yu', я: 'ya',
};

const ACCENTED_VOWELS: Record<string, string> = {
  'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ý': 'y', 'ı́': 'ı',
  'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
};

/**
 * Müfredattaki Türkçe okunuş yazımından (ör. "haraşó", "Privét") vurgulu ünlünün
 * kaçıncı ünlü olduğunu çıkarır. Bu sayede ses indirgemesi kesin uygulanabilir.
 */
export function stressIndexFromReading(reading: string | undefined): number | undefined {
  if (!reading) return undefined;
  const chars = [...reading.normalize('NFC').toLocaleLowerCase('tr-TR')];
  const isVowel = (c: string) => 'aeıioöuüáéíóúâêîôû'.includes(c);
  let vowelIndex = -1;
  for (const char of chars) {
    if (!isVowel(char)) continue;
    vowelIndex += 1;
    if (ACCENTED_VOWELS[char]) return vowelIndex;
  }
  return undefined;
}

export interface PhoneticReading {
  word: string;
  reading: string;
  rules: string[];
  stressKnown: boolean;
}

/**
 * Bir Rusça kelimenin yaklaşık Türkçe okunuşunu üretir ve HANGİ ses kuralının
 * neden uygulandığını açıklar. Vurgu bilinirse indirgeme (akanye/ikanye) uygulanır;
 * bilinmiyorsa harfler korunur ve bu durum açıkça not edilir.
 */
export function readRussian(word: string, stressedVowelIndex?: number): PhoneticReading | null {
  const w = word.trim().toLocaleLowerCase('ru-RU');
  if (!w || !/[а-яё]/.test(w)) return null;
  const chars = [...w];
  const rules: string[] = [];
  let out = '';
  let vowelCounter = -1;

  const vowelPositions = chars.map((c, i) => (VOWELS.includes(c) ? i : -1)).filter(i => i >= 0);
  const yoIndex = chars.indexOf('ё');
  let stressIdx = stressedVowelIndex;
  if (stressIdx === undefined && yoIndex >= 0) stressIdx = vowelPositions.indexOf(yoIndex);
  if (stressIdx === undefined && vowelPositions.length === 1) stressIdx = 0;
  const stressKnown = stressIdx !== undefined && stressIdx >= 0;

  chars.forEach((char, index) => {
    if (!/[а-яё]/.test(char)) { out += char; return; }
    const prev = index > 0 ? chars[index - 1] : '';
    const next = index + 1 < chars.length ? chars[index + 1] : '';
    const isLast = index === chars.length - 1 || !/[а-яё]/.test(next);

    if (VOWELS.includes(char)) {
      vowelCounter += 1;
      const stressed = stressKnown && vowelCounter === stressIdx;

      if (char === 'о' && stressKnown && !stressed) {
        out += 'a';
        rules.push('🔄 **Akanye:** Vurgusuz «о» [a] okunur (хорошо́ → haraşó).');
        return;
      }
      if ((char === 'е' || char === 'я') && stressKnown && !stressed && index > 0) {
        out += 'i';
        rules.push('🔄 **İkanye:** Vurgusuz «е / я» [i] yönünde incelir (сестра́ → sistrá).');
        return;
      }
      if (char === 'е') {
        const jotted = index === 0 || VOWELS.includes(prev) || prev === 'ь' || prev === 'ъ';
        out += jotted ? 'ye' : 'e';
        return;
      }
      if (char === 'я' && !(index === 0 || VOWELS.includes(prev) || prev === 'ь' || prev === 'ъ')) {
        out += 'a';
        return;
      }
      if (char === 'ю' && !(index === 0 || VOWELS.includes(prev) || prev === 'ь' || prev === 'ъ')) {
        out += 'u';
        return;
      }
      out += BASE_READING[char] ?? char;
      return;
    }

    if (char === 'г' && (w.endsWith('ого') || w.endsWith('его')) && index === chars.length - 2) {
      out += 'v';
      rules.push('🧩 **-ого / -его kuralı:** Sıfat ilgi hâli ekindeki «г» harfi [v] okunur (нового → nóvava).');
      return;
    }
    if (char === 'ч' && (w === 'что' || w === 'чтобы' || w === 'конечно')) {
      out += 'ş';
      rules.push('🗝️ **Sözlüksel istisna:** «что» → [şto], «конечно» → [kanéşna]. Bu kelimelerde «ч» [ş] okunur.');
      return;
    }
    if (isLast && VOICED_TO_VOICELESS[char]) {
      out += VOICED_TO_VOICELESS[char];
      rules.push(`🔇 **Kelime sonu sedasızlaşma:** Son ses «${char}» sedasız [${VOICED_TO_VOICELESS[char]}] okunur (хлеб → hlep, город → górat).`);
      return;
    }
    if (VOICED_TO_VOICELESS[char] && next && 'кпстфхцчшщ'.includes(next)) {
      out += VOICED_TO_VOICELESS[char];
      rules.push(`🔁 **Gerileyici benzeşme:** Sedasız ünsüz önündeki «${char}» sedasızlaşır (водка → vótka).`);
      return;
    }
    if (char === 'ь') {
      out += "'";
      rules.push('🫧 **Yumuşatma işareti (ь):** Kendi sesi yoktur; önündeki ünsüzü inceltir (соль ≠ сол).');
      return;
    }
    if (char === 'ъ') {
      out += '-';
      rules.push('✂️ **Ayırma işareti (ъ):** Ünsüz ile jotlu ünlüyü ayırır (объявление → ab-yavléniye).');
      return;
    }
    out += BASE_READING[char] ?? char;
  });

  const unique = [...new Set(rules)];
  if (!stressKnown && vowelPositions.length > 1) {
    unique.push('❓ **Vurgu bilinmiyor:** Bu kelimenin vurgu yeri verilmediği için ses indirgemesi uygulanmadı. Gerçek konuşmada vurgusuz «о» [a]\'ya, vurgusuz «е/я» [i]\'ye kayar.');
  }
  if (unique.length === 0) unique.push('✅ Bu kelimede ses indirgemesi veya sedasızlaşma yoktur; harfler yazıldığı gibi okunur.');
  unique.push('ℹ️ Türkçe okunuş **yaklaşıktır**: Rusçanın ы, щ, ь gibi sesleri Türkçede birebir karşılanmaz.');

  return { word: w, reading: out, rules: unique, stressKnown };
}

export function aspectPartner(verb: string): { imperfective: string; perfective: string } | null {
  const v = verb.trim().toLocaleLowerCase('ru-RU');
  if (ASPECT_PAIRS[v]) return { imperfective: v, perfective: ASPECT_PAIRS[v] };
  const reverse = Object.entries(ASPECT_PAIRS).find(([, perf]) => perf === v);
  if (reverse) return { imperfective: reverse[0], perfective: reverse[1] };
  return null;
}

/** Bir metindeki Kiril kelimeleri döndürür. */
export function cyrillicWords(text: string): string[] {
  return (text.match(/[а-яёА-ЯЁ]{2,}/g) ?? []).map(word => word.toLocaleLowerCase('ru-RU'));
}
