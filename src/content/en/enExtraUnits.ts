// ============================================================================
// 🇬🇧 İNGİLİZCE EK ÜNİTE MOTORU — Rusça ek paketlerinin İngilizce aynası
// ----------------------------------------------------------------------------
// Rusça müfredattaki 499 ek ünite (src/extraUnits/*) ile AYNI kimlik
// (id / unitNumber / seviye / başlık / açıklama / kategori / ikon / sıra)
// bu motora beslenir; yalnızca HEDEF DİL İÇERİĞİ İngilizcedir:
//   • kelimeler: İngilizce karşılık + otomatik okunuş (Türkçe harflerle,
//     vurgulu hece BÜYÜK — el yazımı 48 çekirdek üniteyle aynı kural),
//   • cümleler: kelimeyi bağlama yerleştiren İngilizce kalıp cümleler,
//   • diyaloglar: yalnızca Rusça aynasında da diyalogu olan ünitelerde.
// Ayrıca 175 İngilizce'ye özel "pekiştirme" ünitesi de aynı motorla üretilir
// (bkz. enNewSpecs.ts) → EN toplamı 722 = RU toplamı.
// ============================================================================

import type { DialogueLine, UnitModule, WordDetail } from '../../curriculumData';
import { EN_EXTRA_SPECS_A } from './enExtraSpecsA';
import { EN_EXTRA_SPECS_B } from './enExtraSpecsB';
import { EN_EXTRA_SPECS_C } from './enExtraSpecsC';
import { EN_NEW_SPECS } from './enNewSpecs';

export type EnExtraLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
/** [enKelime, trAnlam] */
export type EnExtraWord = readonly [string, string];
export type EnExtraSpec = readonly [
  id: string,
  n: number,
  lv: EnExtraLevel,
  icon: string,
  title: string,
  desc: string,
  cat: string,
  color: string,
  sceneTitle: string,
  sceneContext: string,
  /** Diyalogsuz ünitelerde null (Rusça aynayla birebir aynı yapı). */
  speakers: readonly [string, string] | null,
  words: readonly EnExtraWord[],
];

// ============================================================================
// OKUNUŞ — İngilizce → Türkçe harf çevirisi (kaba fonetik kural seti)
// Kural: vurgulu hece BÜYÜK yazılır (heLOU, TEYbıl, MORning).
// Sık yanlış okunan kelimeler el listesinde önceliklidir.
// ============================================================================

const IRREGULAR: Record<string, string> = {
  a: 'EY', the: 'DI', of: 'OV', to: 'TU', i: 'AY', be: 'Bİ', am: 'EM', an: 'EN',
  and: 'END', are: 'AR', as: 'EZ', at: 'ET', by: 'BAY', do: 'DU', does: 'DAZ',
  for: 'FOR', from: 'FROM', go: 'GOU', so: 'SOU', no: 'NOU', on: 'ON', in: 'İN',
  is: 'İZ', it: 'İT', its: 'İTS', me: 'Mİ', my: 'MAY', we: 'Vİİ', he: 'Hİ',
  she: 'Şİİ', you: 'YU', your: 'YOR', not: 'NOT', or: 'OR', if: 'İF', up: 'AP',
  out: 'AUT', off: 'OF', one: 'UAN', once: 'UANS', two: 'TU', who: 'HU',
  whose: 'HUZ', whom: 'HUM', what: 'UOT', was: 'VOZ', were: 'VER', have: 'HEV',
  has: 'HEZ', had: 'HED', this: 'DİS', that: 'DET', these: 'DIİZ', those: 'DOUZ',
  then: 'DEN', than: 'DEN', they: 'DEY', them: 'DEM', there: 'DER', their: 'DER',
  says: 'SEZ', said: 'SED', come: 'KAM', came: 'KEYM', some: 'SAM', any: 'ENi',
  many: 'ME-ni', done: 'DAN', gone: 'GON', love: 'LAV', live: 'LİV', give: 'GİV',
  take: 'TEYK', took: 'TUK', put: 'PUT', get: 'GET', got: 'GOT', make: 'MEYK',
  made: 'MEYD', day: 'DEY', today: 'tuDEY', tomorrow: 'tuMOrow', time: 'TAYM',
  water: 'UOtır', write: 'RAYT', wrote: 'ROUT', written: 'RİTın', right: 'RAYT',
  night: 'NAYT', light: 'LAYT', eight: 'EYT', eye: 'AY', eyes: 'AYZ',
  could: 'KUD', would: 'VUD', should: 'ŞUD', about: 'eBAUT', above: 'eBAV',
  again: 'eGEYN', against: 'eGEYNST', because: 'bikOZ', become: 'bikAM',
  before: 'biFOR', begin: 'biGİN', behind: 'biHAYND', believe: 'biLİİV',
  between: 'biTİİN', beyond: 'biYOND', enough: 'inAF', though: 'DHOU',
  although: 'olDHOU', through: 'TRU', thought: 'DOT', laugh: 'LEF', learn: 'LERN',
  people: 'PIıpıl', work: 'VERK', word: 'VERD', world: 'VERLD', walk: 'VOK',
  wash: 'VOŞ', watch: 'VOÇ', warm: 'VORM', wear: 'VER', week: 'VİİK',
  which: 'VİÇ', while: 'UAYL', white: 'UAYT', why: 'UAY', wide: 'UAYD',
  whole: 'HOUL', woman: 'VUmun', women: 'Vİmin', wonderful: 'VANDırfıl',
  worth: 'VERT', year: 'YIR', yellow: 'YELOU', yes: 'YES', young: 'YANG',
  yesterday: 'YEStırdey', very: 'VERi', use: 'YUS', used: 'YUZD', usual: 'YUJuıl',
  usually: 'YUJueli', busy: 'BİZi', business: 'BİZnis', buy: 'BAY', build: 'BİLD',
  built: 'BİLT', colour: 'KALır', color: 'KALır', door: 'DOR', floor: 'FLOR',
  eat: 'İİT', each: 'İİÇ', idea: 'ayDİı', friend: 'FREND', most: 'MOUST',
  both: 'BOUD', nothing: 'NAting', something: 'SAMting', anything: 'ENithing',
  everything: 'EVrithing', answer: 'ENsır', only: 'OUNli', other: 'ADır',
  another: 'enADır', over: 'OUvır', own: 'OUN', pull: 'PUL', push: 'PUŞ',
  real: 'RIıl', really: 'RIıli', receive: 'riSİİV', school: 'SKUL', sea: 'Sİİ',
  shoe: 'ŞU', since: 'SİNS', son: 'SAN', sure: 'ŞOR', talk: 'TOK', town: 'TAUN',
  now: 'NAU', how: 'HAU', down: 'DAUN', tough: 'TAF', toward: 'tuVORD',
  truth: 'TRUT', tongue: 'TANG', ton: 'TAN', month: 'MANT', mother: 'MAdır',
  father: 'FAdır', brother: 'BRAdır', weather: 'VEdır', together: 'tuGEDHır',
  move: 'MUUV', movie: 'MUvi', new: 'NYU', knew: 'NYU', know: 'NOU',
  known: 'NOUn', hour: 'AUır', hear: 'HİR', here: 'HİR', heart: 'HART',
  head: 'HED', healthy: 'HELdi', high: 'HAY', great: 'GREYT', break: 'BREYK',
  steak: 'STEYK', rain: 'REYN', air: 'EİR', hair: 'HEİR', lose: 'LUZ', soup: 'SUP',
  group: 'GRUP', youth: 'YUD', straight: 'STREYT', weight: 'VEYT', wait: 'VEYT',
  either: 'İİDHır', neither: 'NİİDHır', guest: 'GEST', guide: 'GAYD',
  guitar: 'giTAR', hotel: 'hoTEL', machine: 'meŞİİN', modern: 'MODırn',
  minute: 'MİNıt', money: 'MAni', onion: 'Aniyın', oven: 'AVın', paper: 'PEYpır',
  phone: 'FOUN', photo: 'FOUto', police: 'piliS', pretty: 'PRİTi',
  question: 'KUESçın', queue: 'KYU', quiet: 'KVAYıt', recipe: 'RESıpi',
  salad: 'SE-lıd', sandwich: 'SENviç', sugar: 'ŞUGır', theatre: 'TIıtıR',
  theater: 'TIıtıR', tourist: 'TUrist', village: 'VILıc', voice: 'VOYS',
  want: 'UONT', wants: 'UONTS', wanted: 'UONtıd', where: 'VEır', with: 'VİD',
  without: 'viDAUT', yeah: 'YE', yoga: 'YOgı', zero: 'Zİrou', zone: 'ZOUn',
  student: 'STYUdınt', music: 'MYUzik', unit: 'YUnıt', human: 'HYUmın',
  future: 'FYUçır', nature: 'NEYçıR', actually: 'EKçuıli', eventually: 'ivENçuıli',
  apartment: 'ePARTmınt', "one's": 'UANs', menu: 'MENyu',
  huge: 'HYUC', cute: 'KYUT', daily: 'DEYli', nutrition: 'nutrİŞıın',
  delicious: 'dilİŞıs', knowledge: 'NOLıc', beautiful: 'BYUUtıfıl',
  finally: 'FAYnıli', seriously: 'SİRiyısli', 'avant-garde': 'avangGARD',
  borrow: 'BORou', already: 'olREDi',
  red: 'RED', bed: 'BED', feed: 'FİİD', seed: 'SİİD', need: 'NİİD',
  speed: 'SPİİD', sled: 'SLED', weed: 'VİİD', hundred: 'HANdırıd',
  thread: 'TRED', indeed: 'inDİİD', three: 'TRİİ',
  tired: 'TAYıd', agreed: 'eGRIID', repeat: 'riPIIT',
  hello: 'heLOU', opportunity: 'opırTYUnıti', furniture: 'FERnıçır',
  vegetable: 'VECtıbıl',
  ratio: 'REYşiou', media: 'Mİıdiı',
};

/** Vurguyu ilk heceye koyar; “şın/jın/çır” eklerinde ek önündeki heceyi. */
function markStress(out: string): string {
  if (!out || out === out.toUpperCase()) return out;
  const V = 'aeıioöuü';
  const isV = (c: string) => V.includes(c.toLocaleLowerCase('tr'));
  // hece çekirdekleri: ünlü koşularının konumları
  const runs: [number, number][] = [];
  let i = 0;
  while (i < out.length) {
    if (isV(out[i])) {
      let j = i;
      while (j < out.length && isV(out[j])) j++;
      runs.push([i, j]);
      i = j;
    } else i++;
  }
  if (runs.length === 0) return out;
  if (runs.length === 1) return out.toUpperCase(); // tek heceli kelime
  // -şın/-jın/-çır/-şıl ekleri: ekin ünlüsünden önceki hece vurgulanır
  const tail = out.slice(-3);
  let target = 0;
  if ((tail === 'şın' || tail === 'jın' || tail === 'çır' || tail === 'şıl' || tail === 'çıl') && runs.length >= 2) {
    target = runs.length - 2;
  }
  const ve = runs[target][1];
  // vurgulu hecenin BAŞI: hedef ilk heceyse kelime başı; değilse önceki
  // hecenin ünlüsünden sonraki tek ünsüz
  let start = 0;
  if (target > 0) {
    const pe = runs[target - 1][1];
    start = pe + (pe < out.length && !isV(out[pe]) ? 1 : 0);
  }
  // vurgulu hecenin SONU: ünlü koşusundan sonra en fazla bir ünsüz
  let end = ve;
  if (end < out.length && !isV(out[end]) && end + 1 < out.length) end += 1;
  return out.slice(0, start).toLocaleLowerCase('tr') + out.slice(start, end).toLocaleUpperCase('tr') + out.slice(end).toLocaleLowerCase('tr');
}

const VOICED_END = new Set(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü', 'b', 'd', 'g', 'c', 'v', 'z', 'l', 'm', 'n', 'r', 'y', 'ng']);

function readToken(w: string): string {
  // son noktalama/işaret kuyruğunu ayır: "who?" → HU + ?
  const m = w.match(/^([a-z]+(?:'[a-z]+)?)([^a-z]*)$/);
  if (!m) return w; // yabancı işaret/sayı → olduğu gibi
  const [, core, tail] = m;
  if (IRREGULAR[core]) return IRREGULAR[core] + tail;
  return readCore(core) + tail;
}

function readCore(w: string): string {
  let out = '';
  let i = 0;
  const n = w.length;
  const rest = (k = 0) => w.slice(i + k);
  const at = (k: number) => w[i + k] ?? '';
  const prevOut = () => out.slice(-1);
  while (i < n) {
    // ---- çok karakterli kurallar (önce en uzunlar) ----
    if (rest().startsWith('eigh')) { out += 'ey'; i += 4; continue; }
    if (rest().startsWith('ough')) { out += 'af'; i += 4; continue; }
    if (rest().startsWith('augh')) { out += 'af'; i += 4; continue; }
    if (rest().startsWith('ation')) { out += 'eyşın'; i += 5; continue; }
    if (rest().startsWith('tion')) { out += 'şın'; i += 4; continue; }
    if (rest().startsWith('sion')) { out += /[aeiou]/.test(at(-1)) ? 'jın' : 'şın'; i += 4; continue; }
    if (rest().startsWith('cian')) { out += 'şın'; i += 4; continue; }
    if (rest().startsWith('cious') || rest().startsWith('tious')) { out += 'şıs'; i += 5; continue; }
    if (rest().startsWith('cial') || rest().startsWith('tial')) { out += 'şıl'; i += 4; continue; }
    if (rest().startsWith('ture')) { out += 'çır'; i += 4; continue; }
    if (rest().startsWith('sure') && i > 0) { out += 'jır'; i += 4; continue; }
    if (rest().startsWith('age') && i > 0 && i + 3 === n) { out += 'ıc'; i += 3; continue; }
    if (rest().startsWith('igh')) { out += 'ay'; i += 3; continue; }
    if (rest().startsWith('tch')) { out += 'ç'; i += 3; continue; }
    if (rest().startsWith('dge')) { out += 'c'; i += 3; continue; }
    if (rest().startsWith('ear')) { out += 'iır'; i += 3; continue; }
    if (rest().startsWith('air') || rest().startsWith('eir')) { out += 'eır'; i += 3; continue; }
    if (rest().startsWith('ous') && i + 3 === n) { out += 'ıs'; i += 3; continue; }
    if (rest().startsWith('ing') && i + 3 === n) { out += 'ing'; i += 3; continue; }
    if (rest().startsWith('ful') && i + 3 === n) { out += 'fıl'; i += 3; continue; }
    if (rest().startsWith('less') && i + 4 === n) { out += 'lıs'; i += 4; continue; }
    if (rest().startsWith('ness') && i + 4 === n) { out += 'nis'; i += 4; continue; }
    if (rest().startsWith('ment') && i + 4 === n) { out += 'mınt'; i += 4; continue; }
    if (rest().startsWith('able') && i + 4 === n) { out += 'eybıl'; i += 4; continue; }
    if (rest().startsWith('ible') && i + 4 === n) { out += 'ibıl'; i += 4; continue; }
    if (rest().startsWith('tive') && i + 4 === n) { out += 'tiv'; i += 4; continue; }
    if (rest().startsWith('ally') && i + 4 === n) { out += 'ıli'; i += 4; continue; }
    // -ed son eki
    if (rest() === 'ed' && i >= 2) {
      const p = prevOut();
      out += (p === 't' || p === 'd') ? 'dı' : (VOICED_END.has(p) ? 'd' : 't');
      i += 2; continue;
    }
    // -es / -s son eki
    if (rest() === 'es' && i > 0) {
      const p = prevOut();
      out += (p === 's' || p === 'ş' || p === 'ç' || p === 'z' || p === 'ks' || p === 'c') ? 'ız' : 's';
      i += 2; continue;
    }
    // ikili ünsüzler
    const dbl: Record<string, string> = { ss: 's', ll: 'l', tt: 't', pp: 'p', rr: 'r', mm: 'm', nn: 'n', dd: 'd', ff: 'f', gg: 'g', bb: 'b', cc: 'k' };
    if (dbl[rest().slice(0, 2)] && !(rest().slice(0, 2) === 'cc' && /[ei]/.test(at(2)))) { out += dbl[rest().slice(0, 2)]; i += 2; continue; }
    if (rest().slice(0, 2) === 'cc') { out += 'ks'; i += 2; continue; }
    if (rest().slice(0, 2) === 'ch') { out += 'ç'; i += 2; continue; }
    if (rest().slice(0, 2) === 'sh') { out += 'ş'; i += 2; continue; }
    if (rest().slice(0, 2) === 'ph') { out += 'f'; i += 2; continue; }
    if (rest().slice(0, 2) === 'th') {
      const medial = i > 0 && /[aeiou]/.test(at(-1)) && /[aeiou]/.test(at(2));
      out += medial ? 'd' : 't'; i += 2; continue;
    }
    if (rest().slice(0, 2) === 'wh') { out += i === 0 ? 'u' : 'v'; i += 2; continue; }
    if (rest().slice(0, 2) === 'ck') { out += 'k'; i += 2; continue; }
    if (rest().slice(0, 2) === 'gh' && i > 0) { i += 2; continue; }
    if (rest().slice(0, 2) === 'ng' && i + 2 === n) { out += 'ng'; i += 2; continue; }
    if (rest().slice(0, 2) === 'qu') { out += 'kv'; i += 2; continue; }
    if (rest().slice(0, 2) === 'kn' && i === 0) { out += 'n'; i += 2; continue; }
    if (rest().slice(0, 2) === 'wr' && i === 0) { out += 'r'; i += 2; continue; }
    if (rest().slice(0, 2) === 'mb' && i + 2 === n) { out += 'm'; i += 2; continue; }
    // ikili ünlüler
    const pairs: Record<string, string> = {
      ee: 'ii', ea: 'ii', oo: 'uu', ou: 'au', oa: 'ou', ai: 'ey', ay: 'ey',
      au: 'o', aw: 'o', ew: 'yu', ue: 'u', ui: 'u', oi: 'oy', oy: 'oy',
      eu: 'yu', ei: 'ii', ie: 'ii', ar: 'ar', or: 'or', er: 'ır', ir: 'ör',
      ur: 'ör', yr: 'ör',
    };
    if (pairs[rest().slice(0, 2)] && !(rest().slice(0, 2) === 'ie' && i + 2 === n)) {
      out += pairs[rest().slice(0, 2)]; i += 2; continue;
    }
    if (rest().slice(0, 2) === 'ie' && i + 2 === n) { out += 'i'; i += 2; continue; }
    if (rest().slice(0, 2) === 'ow') { out += (i + 2 === n) ? 'ou' : 'au'; i += 2; continue; }
    if (rest().slice(0, 2) === 'ey' && i + 2 === n) { out += 'i'; i += 2; continue; }
    if (rest().slice(0, 2) === 'oy' && i + 2 === n) { out += 'oy'; i += 2; continue; }
    // sihirli -e (make, note, cute, dance, large)
    const c = at(0);
    const nextC = at(1);
    const nextNext = at(2);
    const isSingleC = nextC && !/[aeiouy']/.test(nextC);
    if ('aeiou'.includes(c) && isSingleC && nextNext === 'e' && i + 3 === n) {
      out += { a: 'ey', e: 'ii', i: 'ay', o: 'ou', u: 'yu' }[c]!;
      out += { c: 's', g: 'c' }[nextC] ?? nextC;
      i += 3; continue;
    }
    // tek karakterler
    if (c === 'e' && i + 1 === n) { i += 1; continue; } // sessiz son -e
    if (c === 'y') { out += (i === 0 ? 'y' : (i + 1 === n ? 'i' : 'i')); i += 1; continue; }
    if (c === 'o' && i + 1 === n) { out += 'ou'; i += 1; continue; }
    if (c === 'a') { out += 'e'; i += 1; continue; }
    if (c === 'e' || c === 'i' || c === 'o') { out += c; i += 1; continue; }
    if (c === 'u') { out += 'a'; i += 1; continue; }
    if (c === 'c') { out += /[eiy]/.test(at(1)) ? 's' : 'k'; i += 1; continue; }
    if (c === 'g') { out += /[eiy]/.test(at(1)) ? 'c' : 'g'; i += 1; continue; }
    if (c === 'j') { out += 'c'; i += 1; continue; }
    if (c === 'x') { out += 'ks'; i += 1; continue; }
    if (c === 'w') { out += i === 0 ? 'u' : 'v'; i += 1; continue; }
    if (c === 's') { out += 's'; i += 1; continue; }
    if (c === "'") { i += 1; continue; }
    if ('bdfklmnprstvzh'.includes(c)) { out += c; i += 1; continue; }
    out += c; i += 1; // geri kalan her şey (q vb.)
  }
  return markStress(out);
}

/** Kelime/ifade okunuşu: “good morning” → “gud MORning”. */
export function enReading(text: string): string {
  return text
    .split(/(\s+)/)
    .map((tok) => (/\s/.test(tok) ? tok : readToken(tok.toLocaleLowerCase('en'))))
    .join('');
}

// ============================================================================
// YARDIMCILAR — deterministik karıştırma (48 çekirdek ünitedeki derange ile aynı)
// ============================================================================

function derange(words: string[]): string[] {
  if (words.length < 2) return [...words];
  const shift = Math.ceil(words.length / 2);
  return words.map((_, i) => words[(i + shift) % words.length]);
}

function rotate<T>(items: readonly T[], amount: number): T[] {
  if (items.length <= 1) return [...items];
  const k = ((amount % items.length) + items.length) % items.length;
  return [...items.slice(k), ...items.slice(0, k)];
}

// ============================================================================
// CÜMLE ŞABLONLARI — (kelime, başlık) → [İngilizce cümle, Türkçe çeviri]
// Temel banka A1/A2, ileri banka B1+ ünitelerde kullanılır.
// ============================================================================

type SentTpl = (w: EnExtraWord, title: string) => readonly [string, string];

const SENT_BASIC: SentTpl[] = [
  (w) => [`I need “${w[0]}” today.`, `Bugün “${w[1]}” gerekiyor.`],
  (w) => [`Can you repeat “${w[0]}”, please?`, `“${w[1]}” ifadesini tekrar söyler misiniz, lütfen?`],
  (w) => [`Where do we use “${w[0]}”?`, `“${w[1]}” nerede kullanılır?`],
  (w) => [`“${w[0]}” is a useful word.`, `“${w[1]}” faydalı bir kelime.`],
  (w) => [`Let me write “${w[0]}” down.`, `“${w[1]}” ifadesini not edeyim.`],
  (w) => [`I often hear “${w[0]}” in English.`, `İngilizcede “${w[1]}” ifadesini sık duyarım.`],
  (w) => [`Try to use “${w[0]}” in a sentence.`, `“${w[1]}” ifadesini bir cümlede kullanmayı dene.`],
  (w) => [`How do you pronounce “${w[0]}”?`, `“${w[1]}” nasıl telaffuz edilir?`],
  (w, t) => [`My topic today is “${t}”, and the word is “${w[0]}”.`, `Bugünkü konum “${t}”; kelime ise “${w[1]}”.`],
  (w) => [`Is “${w[0]}” new for you?`, `“${w[1]}” sizin için yeni mi?`],
];

const SENT_ADV: SentTpl[] = [
  (w) => [`In everyday conversation, “${w[0]}” comes up more often than you think.`, `Gündelik konuşmada “${w[1]}” sanıldığından sık geçer.`],
  (w) => [`Getting “${w[0]}” right makes your English sound natural.`, `“${w[1]}” ifadesini doğru kullanmak İngilizcenizi doğal kılar.`],
  (w) => [`Notice how “${w[0]}” changes the tone of a sentence.`, `“${w[1]}” ifadesinin cümlenin tonunu nasıl değiştirdiğine dikkat edin.`],
  (w) => [`A quick example with “${w[0]}” is worth ten grammar rules.`, `“${w[1]}” ile kurulan tek örnek, on dilbilgisi kuralından daha iyidir.`],
  (w) => [`Practise “${w[0]}” until it flows without thinking.`, `“${w[1]}” ifadesini düşünmeden akana kadar çalışın.`],
  (w) => [`Native speakers drop “${w[0]}” into small talk naturally.`, `Ana dili İngilizce olanlar “${w[1]}” ifadesini sohbete doğal biçimde ekler.`],
  (w) => [`Link “${w[0]}” to a personal memory — it sticks better.`, `“${w[1]}” ifadesini kişisel bir anıya bağlayın — daha kalıcı olur.`],
  (w) => [`Record yourself using “${w[0]}” and compare.`, `“${w[1]}” ifadesini kullanarak ses kaydı alın ve karşılaştırın.`],
  (w, t) => [`Within “${t}”, “${w[0]}” is the word to master first.`, `“${t}” konusunda önce ustalaşılması gereken kelime “${w[1]}”.`],
  (w) => [`If “${w[0]}” feels hard, break it into sounds.`, `“${w[1]}” zor geliyorsa seslere ayırın.`],
];

// ============================================================================
// DİYALOG ŞABLONLARI — 4-5 satır, 2 konuşmacı, 4-5 kelime gömülü.
// Temel banka A1/A2, ileri banka B1+ ünitelerde kullanılır.
// ============================================================================

type DlgTpl = (sp: readonly [string, string], title: string, ws: EnExtraWord[]) => { speaker: string; ru: string; tr: string }[];

const DIALOG_BASIC: DlgTpl[] = [
  (sp, title, w) => [
    { speaker: sp[0], ru: `My new topic is “${title}”. The first word is “${w[0][0]}”.`, tr: `Yeni konum “${title}”. İlk kelime “${w[0][1]}”.` },
    { speaker: sp[1], ru: `Good! And what about “${w[1][0]}”?`, tr: `Güzel! Peki “${w[1][1]}” ne oluyor?` },
    { speaker: sp[0], ru: `“${w[2][0]}” is also part of it.`, tr: `“${w[2][1]}” da bunun bir parçası.` },
    { speaker: sp[1], ru: `Great. Try to use “${w[3][0]}” today.`, tr: `Harika. Bugün “${w[3][1]}” ifadesini kullanmayı dene.` },
  ],
  (sp, title, w) => [
    { speaker: sp[0], ru: `Let's practise “${title}” together.`, tr: `“${title}” konusunu birlikte çalışalım.` },
    { speaker: sp[1], ru: `Sure. You start with “${w[0][0]}”.`, tr: `Tabii. “${w[0][1]}” ile sen başla.` },
    { speaker: sp[0], ru: `Okay. Then you take “${w[1][0]}”.`, tr: `Tamam. O zaman “${w[1][1]}” sende.` },
    { speaker: sp[1], ru: `Deal. We both repeat “${w[2][0]}”.`, tr: `Anlaştık. İkimiz de “${w[2][1]}” ifadesini tekrar edelim.` },
    { speaker: sp[0], ru: `Perfect — “${title}” is getting easier.`, tr: `Mükemmel — “${title}” gitgide kolaylaşıyor.` },
  ],
  (sp, title, w) => [
    { speaker: sp[0], ru: `Yesterday I learned “${w[0][0]}”.`, tr: `Dün “${w[0][1]}” öğrendim.` },
    { speaker: sp[1], ru: `Nice! Today add “${w[1][0]}” and “${w[2][0]}”.`, tr: `Güzel! Bugün “${w[1][1]}” ve “${w[2][1]}” ekle.` },
    { speaker: sp[0], ru: `Is “${w[3][0]}” difficult?`, tr: `“${w[3][1]}” zor mu?` },
    { speaker: sp[1], ru: `Not at all — just say it twice.`, tr: `Hiç değil — sadece iki kez söyle.` },
    { speaker: sp[0], ru: `Thanks! “${title}” feels closer now.`, tr: `Teşekkürler! “${title}” artık daha yakın görünüyor.` },
  ],
  (sp, title, w) => [
    { speaker: sp[0], ru: `I have a question about “${w[0][0]}”.`, tr: `“${w[0][1]}” hakkında bir sorum var.` },
    { speaker: sp[1], ru: `Ask it. “${title}” is a good topic.`, tr: `Sor. “${title}” iyi bir konu.` },
    { speaker: sp[0], ru: `Does “${w[1][0]}” mean the same thing?`, tr: `“${w[1][1]}” aynı şeyi mi anlamına geliyor?` },
    { speaker: sp[1], ru: `Almost. Compare it with “${w[2][0]}”.`, tr: `Neredeyse. “${w[2][1]}” ile karşılaştır.` },
    { speaker: sp[0], ru: `Now it is clear. I will note “${w[3][0]}” too.`, tr: `Şimdi netleşti. “${w[3][1]}” ifadesini de not alacağım.` },
  ],
];

const DIALOG_ADV: DlgTpl[] = [
  (sp, title, w) => [
    { speaker: sp[0], ru: `I want to sound more natural with “${title}”.`, tr: `“${title}” konusunda daha doğal konuşmak istiyorum.` },
    { speaker: sp[1], ru: `Start with “${w[0][0]}” — it is very common.`, tr: `“${w[0][1]}” ile başla — çok yaygın bir ifade.` },
    { speaker: sp[0], ru: `Does “${w[1][0]}” fit into small talk?`, tr: `“${w[1][1]}” sohbete uyar mı?` },
    { speaker: sp[1], ru: `Definitely. Pair it with “${w[2][0]}” and it flows.`, tr: `Kesinlikle. “${w[2][1]}” ile birlikte kullan, akıcı olur.` },
    { speaker: sp[0], ru: `I will try “${w[3][0]}” and “${w[4]?.[0] ?? w[0][0]}” as well.`, tr: `“${w[3][1]}” ve “${w[4]?.[1] ?? w[0][1]}” ifadelerini de deneyeceğim.` },
  ],
  (sp, title, w) => [
    { speaker: sp[0], ru: `Quick question: how natural is “${w[0][0]}” here?`, tr: `Kısa bir soru: “${w[0][1]}” burada ne kadar doğal?` },
    { speaker: sp[1], ru: `Perfectly natural, especially with “${w[1][0]}”.`, tr: `Gayet doğal, özellikle “${w[1][1]}” ile birlikte.` },
    { speaker: sp[0], ru: `And “${w[2][0]}” — too formal?`, tr: `Peki “${w[2][1]}” — fazla resmî mi?` },
    { speaker: sp[1], ru: `A bit. Save it for “${w[3][0]}” moments.`, tr: `Birazcık. Onu “${w[3][1]}” anları için sakla.` },
    { speaker: sp[0], ru: `Got it. “${title}” is clearer now.`, tr: `Anladım. “${title}” şimdi daha net.` },
  ],
  (sp, title, w) => [
    { speaker: sp[0], ru: `My coach says “${title}” words decide fluency.`, tr: `Koçum “${title}” kelimelerinin akıcılığı belirlediğini söylüyor.` },
    { speaker: sp[1], ru: `True. “${w[0][0]}” alone unlocks many sentences.`, tr: `Doğru. Yalnızca “${w[0][1]}” bile birçok cümlenin kilidini açar.` },
    { speaker: sp[0], ru: `I keep mixing “${w[1][0]}” with other words.`, tr: `Ben “${w[1][1]}” ifadesini başka kelimelerle karıştırıyorum.` },
    { speaker: sp[1], ru: `Then drill it with “${w[2][0]}” for a week.`, tr: `O zaman bir hafta boyunca “${w[2][1]}” ile birlikte çalış.` },
    { speaker: sp[0], ru: `Deal — “${w[3][0]}” joins the list tonight.`, tr: `Anlaştık — bu akşam listeye “${w[3][1]}” de giriyor.` },
  ],
  (sp, title, w) => [
    { speaker: sp[0], ru: `Let's review “${title}” like an exam.`, tr: `“${title}” konusunu sıvar gibi tekrar edelim.` },
    { speaker: sp[1], ru: `Fine. Define “${w[0][0]}” in English.`, tr: `Peki. “${w[0][1]}” ifadesini İngilizce tanımla.` },
    { speaker: sp[0], ru: `It is close to “${w[1][0]}”, right?`, tr: `“${w[1][1]}” ifadesine yakın, değil mi?` },
    { speaker: sp[1], ru: `Right. Now use “${w[2][0]}” in your example.`, tr: `Doğru. Şimdi örneğinde “${w[2][1]}” ifadesini kullan.` },
    { speaker: sp[0], ru: `Done. “${w[3][0]}” was easier than I thought.`, tr: `Tamamdır. “${w[3][1]}” sandığımdan kolaydı.` },
  ],
];

// ============================================================================
// GRAMER/KULLANIM NOTU — seviyeye göre Türkçe çalışma ipucu
// ============================================================================

const LEVEL_TIP: Record<EnExtraLevel, string> = {
  A1: 'Seviye A1: kelimeleri iki-üç kelimelik kısa cümlelerde dene; önce anlamı, sonra telaffuzu oturt.',
  A2: 'Seviye A2: kelimeleri günlük durumları anlatan cümlelere yerleştir; çoğul ve çekim formlarını da söyle.',
  B1: 'Seviye B1: kelimeyi İngilizce tanımlamayı dene; eş/anlım ve zıt anlamlılarıyla karşılaştır.',
  B2: 'Seviye B2: kelimeyi hem resmî hem gayriresmî bağlamda kullan; hangi ortamda doğal olduğunu düşün.',
  C1: 'Seviye C1: kelimenin çağrışım (connotation) farkına dikkat et; deyimlerdeki yerini araştır.',
  C2: 'Seviye C2: kelimeyi idiomatik ifadeler ve doğal akış içinde kullan; ince anlam farklarını not et.',
};

function grammarNote(title: string, level: EnExtraLevel, cat: string): string {
  return `📌 ÜNİTE ODAĞI — ${title}:\n1. Bu ünite "${cat}" kategorisinden seçilmiş kelimeleri bağlam içinde çalıştırır.\n2. ${LEVEL_TIP[level]}\n3. Okunuşta BÜYÜK yazılan hece vurgulu hecedir; kelimeyi sesli tekrar ederken vurguyu koru.`;
}

// ============================================================================
// ÜNİTE ÜRETİMİ
// ============================================================================

function makeExtraUnit(spec: EnExtraSpec, index: number): UnitModule {
  const [id, n, lv, icon, title, desc, cat, color, sceneTitle, sceneContext, speakers, words] = spec;
  const advanced = lv === 'B1' || lv === 'B2' || lv === 'C1' || lv === 'C2';

  const wordDetails: WordDetail[] = words.map(([en, tr], i) => ({
    id: `${id}_w${i + 1}`,
    ru: en, // "ru" alanı hedef dil metnini taşır (İngilizce pakette İngilizce)
    reading: enReading(en),
    tr,
    level: lv,
    usageNote: `${title} ünitesinde çalışılan pratik kelime/kalıp (${cat}).`,
  }));

  const bank = advanced ? SENT_ADV : SENT_BASIC;
  const rotated = rotate(words, index % Math.max(1, words.length));
  const sentences = [0, 1, 2, 3].map((k) => {
    const tpl = bank[(index * 4 + k) % bank.length];
    const [en, tr] = tpl(rotated[k % rotated.length], title);
    const correct = en.split(' ').filter(Boolean);
    return { ru: en, tr, correct, scrambled: derange(correct) };
  });

  const unit: UnitModule = {
    id,
    unitNumber: n,
    levelGroup: lv,
    title,
    description: desc,
    category: cat,
    color,
    icon,
    grammarExplain: grammarNote(title, lv, cat),
    words: wordDetails,
    sentences,
  };

  if (sceneTitle) unit.sceneTitle = sceneTitle;
  if (sceneContext) unit.sceneContext = sceneContext;

  if (speakers) {
    const dlgBank = advanced ? DIALOG_ADV : DIALOG_BASIC;
    const tpl = dlgBank[(index * 3) % dlgBank.length];
    const dw = rotate(words, (index * 2) % Math.max(1, words.length)).slice(0, 5);
    unit.dialogue = tpl(speakers, title, dw).map((line) => ({
      speaker: line.speaker,
      ru: line.ru,
      // Okunuşta Türkçe başlık olduğu gibi korunur (Rusça paketteki
      // transliterate davranışıyla aynı: yalnız hedef dil kelimeleri çevrilir).
      reading: enReading(line.ru.split(title).join('\u0001')).split('\u0001').join(title),
      tr: line.tr,
    })) as DialogueLine[];
  }

  return unit;
}

/** Rusça ek paketlerinin İngilizce aynası: 499 ünite, aynı kimlik ve sırada. */
export const EN_EXTRA_UNITS: UnitModule[] = [
  ...EN_EXTRA_SPECS_A,
  ...EN_EXTRA_SPECS_B,
  ...EN_EXTRA_SPECS_C,
].map(makeExtraUnit);

/** İngilizce'ye özel pekiştirme üniteleri (175) → EN toplamı 722 = RU. */
export const EN_NEW_UNITS: UnitModule[] = EN_NEW_SPECS.map(makeExtraUnit);
