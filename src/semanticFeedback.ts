import { detectTenses, detectPreps, PREPOSITIONS } from './learnerModel';

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
  return w.toLowerCase().replace(/[«»"".,!?;:()\-–—]/g, '').trim();
}

function stemLike(a: string, b: string): boolean {
  const x = norm(a), y = norm(b);
  if (x === y || x.length < 4 || y.length < 4) return false;
  const n = Math.min(x.length, y.length) - 1;
  const shared = Math.max(4, Math.min(n, Math.max(x.length, y.length) - 3));
  return x.slice(0, shared) === y.slice(0, shared);
}

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

  for (const s of caseSwaps) {
    points.push({
      type: 'err', icon: '🔤',
      text: `ÇEKİM FARKI: «${s.used}» yerine «${s.ideal}» olmalı. Kök aynı ama SONU farklı — Rusçada kelimenin sonu (hâl eki) cümledeki görevini belirler; yanlış ek, "kim kime ne yapıyor?" ilişkisini bozar.`,
    });
  }

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

  const sameSet = missing.length === 0 && extra.length === 0 && caseSwaps.length === 0;
  const sameOrder = b.join(' ') === c.join(' ');
  if (sameSet && !sameOrder) {
    points.push({
      type: 'warn', icon: '🔀',
      text: 'DİZİLİM FARKI: Bütün kelimeler doğru, sadece sıra farklı. Rusçada kelime sırası esnektir ama VURGUYU değiştirir: cümle sonuna koyduğun öğe "asıl yeni bilgi" gibi duyulur. Bu alıştırmada hedef, en doğal (nötr) sıralamayı kurmak.',
    });
  }

  const correctUsed = c.filter(w => b.includes(w));
  if (correctUsed.length > 0 && points.length > 0) {
    points.push({
      type: 'ok', icon: '✅',
      text: `Doğru kullandıkların: «${correctUsed.slice(0, 6).join('», «')}»${correctUsed.length > 6 ? '…' : ''} — cümlenin bu iskeleti sağlam.`,
    });
  }

  let closeness = c.length > 0 ? (correctUsed.length / c.length) * 70 : 0;
  if (sameSet) closeness += 15;
  if (sameOrder) closeness += 15;
  if (tenseProblem) closeness -= 15;
  if (prepProblem) closeness -= 10;
  closeness = Math.max(0, Math.min(100, Math.round(closeness)));

  let verdictTr: string;
  if (sameSet && sameOrder) {
    verdictTr = 'Cümlen ideal cümleyle birebir aynı — anlam tam olarak yerinde. 🎯';
  } else if (tenseProblem) {
    verdictTr = `Cümlen anlaşılır ama "${idealTr}" cümlesinin ZAMANINI kaydırıyor — dinleyen kişi olayı yanlış zamana yerleştirir.`;
  } else if (prepProblem) {
    verdictTr = `Cümlen ana fikri veriyor fakat edat hatası yüzünden yer/yön ilişkisi "${idealTr}" anlamından sapıyor.`;
  } else if (caseSwaps.length > 0) {
    verdictTr = 'Kelimeler doğru seçilmiş ama çekimler (kelime sonları) rolleri karıştırıyor — Rus kulağı "kim, neyi?" sorusunda tökezler.';
  } else if (sameSet && !sameOrder) {
    verdictTr = 'Anlam olarak çok yakınsın: aynı kelimeler, farklı vurgu. Nötr sıralamayı kur ve cümleyi mühürle.';
  } else if (missContent.length > 0) {
    verdictTr = `Cümlen "${idealTr}" anlamının bir kısmını taşıyor ama eksik parçalar yüzünden mesaj yarım kalıyor.`;
  } else {
    verdictTr = 'Cümlen hedef anlama yaklaşıyor ama küçük sapmalar var — aşağıdaki maddelere bak.';
  }

  return { verdictTr, points, closeness };
}
