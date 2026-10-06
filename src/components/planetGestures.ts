/**
 * 🪐 Gezegen ajanının jest motoru.
 *
 * Maskot yalnızca ağzını oynatmıyor; seslendirilen cümlenin *içeğine* göre
 * kollarını da hareket ettiriyor. Bu modül React'tan bağımsız, saf mantığı içerir:
 *  - metni cümlelere böler,
 *  - her cümle için bir jest (pose) seçer: soru mu, coşku mu, vurgu mu, sayma mı?
 *  - ses maskesini (viseme) enerjiye çevirir; kol salınımının genliği bu enerjiyle artar.
 *
 * Buradan çıkan sayılar doğrudan CSS değişkenlerine yazılır:
 *  --vp-amp  → kol salınımının genliği
 *  --vp-dur  → bir salınımın süresi (küçük = hızlı, heceler gibi)
 */

/** Ajanın ağzının o anki biçimi (konuşma sırasındaki kare). */
export type PlanetViseme = 'rest' | 'closed' | 'open' | 'wide' | 'round' | 'teeth' | 'smile';

/** Kolların + kaşların yaptığı şey. */
export type PlanetGesture =
  | 'idle'
  | 'calm'
  | 'explain'
  | 'question'
  | 'cheer'
  | 'point'
  | 'count'
  | 'greet'
  | 'shrug'
  | 'listen'
  | 'think'
  /** Yumruk havada, 'işte bunu buldum' aydınlanması. */
  | 'eureka'
  /** Tek yumruk yukarı, başparmak dışarı: onay/övüş işareti. */
  | 'thumbup'
  /** İki yumruk belde, net ve kendinden emin duruş. */
  | 'hips';

export interface PlanetPose {
  gesture: PlanetGesture;
  /** 0.2 – 1.8: kol salınımının taban genliği. */
  amplitude: number;
  /** 0.28 – 3.4 sn: tek salınım süresi. */
  duration: number;
  /** Kaşların duruşu — jestin yüzü. */
  brows: 'neutral' | 'up' | 'down';
  /** Altyazıda görünen kısa Türkçe etiket. */
  label: string;
}

/** Her ses biçiminin taşıdığı enerji; kollar bu enerjiyle sallanır. */
export const VISEME_ENERGY: Record<PlanetViseme, number> = {
  rest: 0.12,
  closed: 0.34,
  open: 1,
  wide: 0.62,
  round: 0.72,
  teeth: 0.46,
  smile: 0.52,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/* ── Cümle içinden jest çıkarım kuralları (TR + RU + EN) ───────────────── */

const RX_GREET = /^\s*(?:merhaba|selam|salam|hey|hi|hello|günaydın|iyi günler|iyi akşamlar|привет|здравств|добрый|доброе|good\s+(?:morning|afternoon|evening|day))\b/iu;
const RX_QUESTION = /\?|^\s*(?:ne|kim|hangi|kaç|nerede|nereye|nasıl|niçin|neden|var\s+mı|м[ıи]\b|что|как|почему|зачем|кто|где|сколько|when|why|how|what|where|who)\b/iu;
const RX_CHEER = /!|harika|süper|mükemmel|aferin|bravo|çok\s+iyi|süpersin|отлично|молодец|супер|великолепно|замечательно|great|amazing|awesome|perfect|well\s+done|🎉|👏|💪/iu;
const RX_EMPHASIS = /dikkat|önemli|unutma|sakın|asla|kesinlikle|yanlış|hata|tuzak|kural|vurgu|belirt|ama\b|fakat|oysa|çünkü|sebep|важно|ошибк|правильно|нельзя|запомни|обрати|careful|important|mistake|because|never/iu;
const RX_LIST = /(?:^|\s)(?:[-•*]|\d+\s*[).])|\d+\s*%|→|➜|✔️|✅/u;
const RX_COUNT = /(?:^|\s)\d+\s*(?:gün|kez|kere|satır|kelime|soru|puan|%|yüzde|dakika|saat|hafta|ay|yıl)\b|birinc|ikinc|üçünc|список|раз|два/iu;
const RX_EXPLAIN = /örnek|mesela|örn|yani|açıkla|anlat|böyle|şöyle|böylece|например|допустим|напр|for\s+example|for\s+instance|example/iu;
const RX_THUMBUP = /aferin|harikas[ıın]|harika|m[üu]kemmel|s[üu]per|bravo|çok\s+iyi|g[üu]zel\b|do[ğg]ru\b|iyi\s+gidiyorsun|ene\s+iyi|tebrik|отлично|молодец|браво|well\s+done|great\s+job|nice|excellent|👍|💪|🙌/iu;
const RX_EUREKA = /\bi[şs]te\b|buldum|p[üu]f\b|ak[ıı]lda\s+tut|form[üu]l|kural[ıi]?\s+şu|yan[ıi]t\s+şu|c[eé]vap\s+şu|unutma|dikkat\s+et|ş[öo]yle\s+yap|adımla|öneri(?:rim|m)?|tavsiye|запомни|обрати\s+внимание|here\s+(?:you\s+go|it\s+is)|pro\s+tip|remember\s+this|💡|✨/iu;
const RX_HIPS = /\basl[ıi]nda\b|\boysa\b|\bama\b|\bfakat\b|\bger[çc]i\b|do[ğg]rusu|k[ıi]sacas[ıi]|\bhay[ıi]r\b|\bо\s?й\b|кстати|actually|however|on\s+the\s+contrary|to\s+be\s+precise/iu;
const RX_SHRUG = /bilmiyorum|emin\s+değil|sanırım|belki|muhtemelen|olsa\s+gerek|kusura|pardon|üzgünüm|не\s+знаю|наверное|возможно|извини|i\s+think|probably|not\s+sure|maybe|sorry/iu;

interface GestureRule {
  gesture: PlanetGesture;
  pattern: RegExp;
  amplitude: number;
  duration: number;
  brows: PlanetPose['brows'];
  label: string;
}

/** Sıra önemli: ilk eşleşen kural kazanır (özel jestler genelden önce). */
const GESTURE_RULES: GestureRule[] = [
  { gesture: 'greet', pattern: RX_GREET, amplitude: 1.15, duration: 0.5, brows: 'up', label: 'selamlıyor 👋' },
  { gesture: 'thumbup', pattern: RX_THUMBUP, amplitude: 1.18, duration: 0.62, brows: 'up', label: 'onaylayıp başparmağını kaldırıyor 👍' },
  { gesture: 'eureka', pattern: RX_EUREKA, amplitude: 1.42, duration: 0.44, brows: 'up', label: 'yumruğunu havaya kaldırıyor 💡' },
  { gesture: 'cheer', pattern: RX_CHEER, amplitude: 1.6, duration: 0.36, brows: 'up', label: 'coşkuyla anlatıyor 🙌' },
  { gesture: 'question', pattern: RX_QUESTION, amplitude: 1.05, duration: 0.72, brows: 'up', label: 'soruyor, avuçlarını açıyor 🤔' },
  { gesture: 'shrug', pattern: RX_SHRUG, amplitude: 0.66, duration: 0.95, brows: 'up', label: 'omuzlarını silkiyor 🤷' },
  { gesture: 'hips', pattern: RX_HIPS, amplitude: 0.54, duration: 1.15, brows: 'neutral', label: 'eller belde, net konuşuyor 🧍' },
  { gesture: 'point', pattern: RX_EMPHASIS, amplitude: 0.82, duration: 0.46, brows: 'down', label: 'parmağıyla vurguluyor ☝️' },
  { gesture: 'count', pattern: RX_COUNT, amplitude: 0.78, duration: 0.42, brows: 'neutral', label: 'sayıyor 🔢' },
  { gesture: 'explain', pattern: RX_EXPLAIN, amplitude: 1.02, duration: 0.6, brows: 'neutral', label: 'örnekle anlatıyor 🗒️' },
  { gesture: 'explain', pattern: RX_LIST, amplitude: 0.95, duration: 0.54, brows: 'neutral', label: 'madde madde anlatıyor 📑' },
];

const POSE_CALM: PlanetPose = { gesture: 'calm', amplitude: 0.62, duration: 1.05, brows: 'neutral', label: 'anlatıyor 🪐' };

/** Boşta, yani konuşmuyorken: kollar gevşek, uzun ve nefes alır gibi sallanır. */
export const PLANET_POSE_IDLE: PlanetPose = { gesture: 'idle', amplitude: 0.72, duration: 2.9, brows: 'neutral', label: 'hazırda bekliyor 🪐' };
/** Dinlerken sağ el kulağa (antene) gider, sol kol yavaşça salınır. */
export const PLANET_POSE_LISTEN: PlanetPose = { gesture: 'listen', amplitude: 0.4, duration: 1.9, brows: 'up', label: 'seni dinliyor 🎙️' };
/** Yanıt aranırken: tek yumruk havada, gözler onun peşinde, kafa eğik. */
export const PLANET_POSE_THINK: PlanetPose = { gesture: 'think', amplitude: 0.58, duration: 1.85, brows: 'down', label: 'yumruğu havada düşünüyor 🤔' };
/** Kullanıcı soru sorduysa yanıt aranırken avuçlar yukarı — "birlikte düşünüyoruz" pozu. */
export const PLANET_POSE_ASKING: PlanetPose = { gesture: 'question', amplitude: 0.72, duration: 1.4, brows: 'up', label: 'sorunu tartıyor 🤔' };

/**
 * Tek bir cümleden jest üretir. Cümlenin uzunluğu ve ünlem sayısı
 * genliği büyütür, tempoyu hızlandırır; kısa cümleler sakin kalır.
 */
export function planetPoseForSentence(sentence: string): PlanetPose {
  const raw = (sentence || '').replace(/\s+/g, ' ').trim();
  if (!raw) return POSE_CALM;
  /**
   * Türkçe eşleştirme düzeltmesi: 'İ' Unicode katlamada 'i̇' (iki birim) olduğu için
   * tek karakterlik kalıplar "İşte"yi yakalayamıyordu. Önce tr küçük harfine çevir,
   * sonra birleşik nokta işaretini at, sonra tekrar birleştir — böylece tüm kalıplar
   * İ/i/I/ı ve Ş/S varyantlarını tek seferde görür.
   */
  const text = raw
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/\u0307/g, '')
    .normalize('NFC');

  const words = text.split(' ').filter(Boolean).length;
  const bangs = (text.match(/!/g) || []).length;
  const questionMarks = (text.match(/\?/g) || []).length;
  const rule = GESTURE_RULES.find(candidate => candidate.pattern.test(text));
  const base = rule ?? POSE_CALM;

  // Uzun cümle = daha fazla kol hareketi; çok kısa cümle = kısacık bir selam gibi.
  const lengthGain = 0.78 + Math.min(words, 30) / 34;
  const punchGain = 1 + Math.min(bangs, 3) * 0.14 + Math.min(questionMarks, 2) * 0.06;
  const amplitude = clamp(base.amplitude * lengthGain * punchGain, 0.28, 1.8);
  // Hızlı heceler daha kısa salınım demektir.
  const duration = clamp(base.duration * (1 - Math.min(words, 34) / 150) / (1 + Math.min(bangs, 3) * 0.1), 0.28, 1.6);

  return {
    gesture: base.gesture,
    amplitude,
    duration,
    brows: base.brows,
    label: base.label,
  };
}

/**
 * Seslendirilen metnin HER KARAKTERİ için o anda durulacak jesti döndürür.
 * Böylece kollar, tam o cümle okunurken doğru hareketi yapar; cümle değişince
 * jest de değişir. Uzunluk her zaman `chars` ile aynıdır, o yüzden sarmalanarak
 * okuma döngüsüne güvenle verilebilir.
 */
export function planetPoseTrack(chars: string[]): PlanetPose[] {
  const total = chars.length;
  if (total === 0) return [];

  const track: PlanetPose[] = new Array(total).fill(POSE_CALM);
  let cursor = 0;
  let index = 0;
  let placed = 0;

  while (index < total) {
    const char = chars[index];
    const isBreak = /[.!?…\n]/.test(char);
    // Kısa ünlem/soru cümleleri kendi jestini hak eder; "1." gibi sayı
    // kırpıntıları ile ondalıklı sayılar cümleyi bölerse jest titrer.
    const minSentenceLength = char === '\n' ? 4 : char === '.' ? 16 : 7;
    const longEnough = index - cursor >= minSentenceLength;
    if (isBreak && longEnough) {
      const sentence = chars.slice(cursor, index + 1).join('');
      const pose = planetPoseForSentence(sentence);
      for (let i = cursor; i <= index; i += 1) track[i] = pose;
      placed += 1;
      index += 1;
      // Noktalamadan sonraki boşluklar bir önceki cümlenin jestinde kalır;
      // yoksa tek bir boşluk karakteri jesti gereksiz yere değiştirir.
      const gapStart = index;
      while (index < total && /\s/.test(chars[index])) index += 1;
      for (let i = gapStart; i < index; i += 1) track[i] = pose;
      cursor = index;
      continue;
    }
    index += 1;
  }

  if (cursor < total) {
    const tail = chars.slice(cursor).join('').trim();
    const pose = tail ? planetPoseForSentence(tail) : track[cursor - 1] ?? POSE_CALM;
    for (let i = cursor; i < total; i += 1) track[i] = pose;
    placed += tail ? 1 : 0;
  }

  if (placed === 0) {
    const pose = planetPoseForSentence(chars.join(''));
    for (let i = 0; i < total; i += 1) track[i] = pose;
  } else {
    // Cümle başındaki boşluklar ilk jesti devralır; ani sıçrama olmasın.
    const first = track.find(pose => pose !== POSE_CALM) ?? POSE_CALM;
    for (let i = 0; i < total && track[i] === POSE_CALM; i += 1) track[i] = first;
  }

  return track;
}
