// ============================================================================
// ⚡ HIZLI KURTARMA TESTİ (1 dakika)
// 3D kelime ağında kırmızılaşan (unutulmak üzere olan) veya zayıf bağlanan bir
// kelime/gramer düğümüne tıklanınca açılır: 60 saniyelik geri sayım içinde
// DOĞRUDAN o noktayı hedefleyen hızlı sorular sorulur. Amaç, unutulma anındaki
// bilgiyi tam zamanında geri çağırıp hafıza izini tazelemek.
// ============================================================================

import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_WORDS, ALL_SENTENCES } from '../curriculumData';
import { GRAMMAR_FOUNDATION_UNITS } from '../grammarFoundationData';
import { detectTenses, recordSkill, recordWordResult } from '../learnerModel';
import type { RescueTarget } from './WordGraph3D';

interface RescueQ {
  prompt: string;
  audio?: string;       // varsa: soru ses ile sorulur
  correct: string;
  options: string[];
}

export interface RescueResult { correct: number; total: number; passed: boolean }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TENSE_LABEL: Record<string, string> = {
  'tense:present': 'Şimdiki zaman', 'tense:past': 'Geçmiş zaman', 'tense:future': 'Gelecek zaman',
};

function buildQuestions(target: RescueTarget): RescueQ[] {
  const qs: RescueQ[] = [];

  if (target.kind === 'word' && target.ru) {
    const ru = target.ru;
    const tr = target.tr || ALL_WORDS.find(w => w.ru === ru)?.tr || '';
    const trDistract = () => shuffle(ALL_WORDS.filter(x => x.tr !== tr)).slice(0, 3).map(x => x.tr);
    const ruDistract = () => shuffle(ALL_WORDS.filter(x => x.ru !== ru)).slice(0, 3).map(x => x.ru);
    // 6 hızlı soru: tanıma → üretim → dinleme döngüsü (aynı hedef, farklı kaslar)
    qs.push({ prompt: `«${ru}» ne demek?`, correct: tr, options: shuffle([tr, ...trDistract()]) });
    qs.push({ prompt: `"${tr}" kelimesinin Rusçası hangisi?`, correct: ru, options: shuffle([ru, ...ruDistract()]) });
    qs.push({ prompt: '🔊 Dinle — hangi kelimeyi duydun?', audio: ru, correct: ru, options: shuffle([ru, ...ruDistract()]) });
    qs.push({ prompt: '🔊 Dinle — duyduğun kelimenin TÜRKÇESİ ne?', audio: ru, correct: tr, options: shuffle([tr, ...trDistract()]) });
    // Bağlam sorusu: kelimenin geçtiği gerçek bir cümle varsa
    const sent = ALL_SENTENCES.find(s => s.ru.toLowerCase().includes(ru.toLowerCase()));
    if (sent) {
      qs.push({ prompt: `«${sent.ru}» cümlesi ne anlatıyor?`, correct: sent.tr, options: shuffle([sent.tr, ...shuffle(ALL_SENTENCES.filter(s2 => s2.tr !== sent.tr)).slice(0, 3).map(s2 => s2.tr)]) });
    }
    qs.push({ prompt: `Son kontrol — «${ru}» ne demekti?`, correct: tr, options: shuffle([tr, ...trDistract()]) });
    return qs;
  }

  // GRAMER DÜĞÜMÜ (zaman / edat)
  const key = target.skillKey || '';
  if (key.startsWith('tense:')) {
    // 1) Zaman tespiti soruları: gerçek müfredat cümleleri "hangi zamanda?"
    const opts = ['Şimdiki zaman', 'Geçmiş zaman', 'Gelecek zaman'];
    const pool = shuffle(ALL_SENTENCES).map(s => ({ s, t: detectTenses(s.ru) })).filter(x => x.t.length === 1).slice(0, 24);
    for (const { s, t } of shuffle(pool).slice(0, 4)) {
      qs.push({ prompt: `«${s.ru}» cümlesi hangi zamanda?`, correct: TENSE_LABEL[t[0]], options: shuffle([...opts]) });
    }
    // 2) İlgili gramer ünitesinin kendi quiz soruları
    const unitId = key === 'tense:past' ? 'tense_past' : key === 'tense:future' ? 'tense_future_budu' : key === 'tense:aspect' ? 'tense_aspect' : 'tense_present_e';
    const gUnit = GRAMMAR_FOUNDATION_UNITS.find(u => u.id === unitId) || GRAMMAR_FOUNDATION_UNITS.find(u => u.id.startsWith('tense'));
    if (gUnit) for (const q of shuffle(gUnit.quiz).slice(0, 3)) qs.push({ prompt: q.prompt, correct: q.correct, options: shuffle([...q.options]) });
    return shuffle(qs);
  }

  // EDAT DÜĞÜMÜ: boşluk doldurma — cümleden edat çıkarılır
  const prep = key.startsWith('prep:') ? key.slice(5) : 'в';
  const prepOptions = ['в', 'на', 'с', 'из', 'у', 'к', 'о', 'по', 'за', 'до', 'от', 'без'];
  const withPrep = shuffle(ALL_SENTENCES.filter(s => new RegExp(`(^|\\s)${prep}\\s`, 'i').test(s.ru))).slice(0, 5);
  for (const s of withPrep) {
    const blanked = s.ru.replace(new RegExp(`(^|\\s)${prep}\\s`, 'i'), '$1 ___ ');
    qs.push({
      prompt: `Boşluğa hangi edat gelir?\n«${blanked.replace(/\s+/g, ' ')}»  (${s.tr})`,
      correct: prep,
      options: shuffle([prep, ...shuffle(prepOptions.filter(p => p !== prep)).slice(0, 3)]),
    });
  }
  const gPrep = GRAMMAR_FOUNDATION_UNITS.find(u => u.id === 'gram_prepositions');
  if (gPrep) for (const q of shuffle(gPrep.quiz).slice(0, 3)) qs.push({ prompt: q.prompt, correct: q.correct, options: shuffle([...q.options]) });
  return shuffle(qs).slice(0, 7);
}

interface Props {
  target: RescueTarget;
  speak: (text: string, rate?: number) => void;
  onFinish: (r: RescueResult) => void;
  onExit: () => void;
}

export default function RescueTest({ target, speak, onFinish, onExit }: Props) {
  const questions = useMemo(() => buildQuestions(target), [target]);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [flash, setFlash] = useState<'ok' | 'no' | null>(null);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);
  const statsRef = useRef({ correct: 0, answered: 0 });

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setDone(true);
  };

  // 60 saniyelik geri sayım
  useEffect(() => {
    const t = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { window.clearInterval(t); finish(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  // Sesli soruları otomatik çal
  useEffect(() => {
    const q = questions[idx];
    if (q?.audio && !done) {
      const t = window.setTimeout(() => speak(q.audio!, 0.8), 300);
      return () => window.clearTimeout(t);
    }
  }, [idx, done]);

  const q = questions[idx];

  const answer = (opt: string) => {
    if (done || !q) return;
    const ok = opt === q.correct;
    statsRef.current.answered += 1;
    if (ok) statsRef.current.correct += 1;
    setAnswered(a => a + 1);
    if (ok) setCorrect(c => c + 1);
    setFlash(ok ? 'ok' : 'no');
    window.setTimeout(() => setFlash(null), 450);
    // Öğrenen modeline işle
    if (target.kind === 'word' && target.ru) recordWordResult(target.ru, target.tr || '', ok);
    else if (target.skillKey) recordSkill(target.skillKey, ok);

    if (idx + 1 < questions.length) setIdx(idx + 1);
    else finish();
  };

  // ⌨️ KLAVYE KISAYOLU: 1-4 tuşları şıkları seçer (hızlı kurtarma testinde hız kritik!)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done || e.key < '1' || e.key > '4') return;
      const opt = questions[idx]?.options[Number(e.key) - 1];
      if (opt !== undefined) answer(opt);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (done) {
    const total = statsRef.current.answered;
    const okCount = statsRef.current.correct;
    const passed = total > 0 && okCount / total >= 0.7;
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '52px', margin: '10px 0' }}>{passed ? '💚' : '🩹'}</div>
        <h2 style={{ margin: '0 0 6px' }}>{passed ? 'Kurtarıldı!' : 'Hâlâ kanıyor…'}</h2>
        <div style={{ fontSize: '40px', fontWeight: 900, color: passed ? '#10b981' : '#f59e0b' }}>{okCount}/{total}</div>
        <p style={{ color: '#cbd5e1', fontSize: '14px', maxWidth: '440px', margin: '10px auto' }}>
          {passed
            ? `«${target.label}» tam unutulma anında geri çağrıldı — hafıza izi tazelendi, ağdaki düğüm yeşile dönüyor.`
            : `«${target.label}» hâlâ zayıf. Şimdi bir kez daha dene: unutma eğrisinin dibindeyken yapılan ikinci deneme en kalıcı olandır.`}
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '14px' }}>
          {!passed && (
            <button onClick={() => { doneRef.current = false; statsRef.current = { correct: 0, answered: 0 }; setDone(false); setIdx(0); setCorrect(0); setAnswered(0); setTimeLeft(60); }}
              style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '14px 22px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', fontSize: '15px' }}>
              🔁 Tekrar Dene (60 sn)
            </button>
          )}
          <button onClick={() => onFinish({ correct: okCount, total, passed })}
            style={{ background: passed ? '#10b981' : '#334155', border: 'none', color: passed ? '#052e1c' : '#cbd5e1', padding: '14px 22px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', fontSize: '15px' }}>
            {passed ? '✅ Ağa Dön (düğümü yeşillendir)' : 'Ağa Dön'}
          </button>
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div style={{ textAlign: 'center', color: '#94a3b8' }}>
        Bu düğüm için soru üretilemedi.
        <div><button onClick={onExit} style={{ marginTop: '12px', background: '#334155', border: 'none', color: '#cbd5e1', padding: '12px 18px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>← Geri</button></div>
      </div>
    );
  }

  const urgent = timeLeft <= 10;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#f87171' }}>⚡ HIZLI KURTARMA TESTİ — HEDEF NOKTA</div>
          <div style={{ fontSize: '18px', fontWeight: 900 }}>{target.label}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '30px', fontWeight: 900, color: urgent ? '#ef4444' : '#f59e0b', fontVariantNumeric: 'tabular-nums' }}>
            ⏱ {String(Math.floor(timeLeft / 60))}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{correct}/{answered} doğru • Soru {idx + 1}/{questions.length}</div>
        </div>
      </div>

      {/* Zaman çubuğu */}
      <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', margin: '10px 0 16px', overflow: 'hidden' }}>
        <div style={{ width: `${(timeLeft / 60) * 100}%`, height: '100%', background: urgent ? '#ef4444' : 'linear-gradient(90deg,#f59e0b,#ef4444)', transition: 'width 1s linear' }} />
      </div>

      <div style={{
        background: flash === 'ok' ? 'rgba(16,185,129,0.15)' : flash === 'no' ? 'rgba(239,68,68,0.15)' : '#0f172a',
        border: `1px solid ${flash === 'ok' ? '#10b981' : flash === 'no' ? '#ef4444' : '#334155'}`,
        borderRadius: '14px', padding: '22px', textAlign: 'center', marginBottom: '14px', transition: 'all 0.2s', whiteSpace: 'pre-line',
      }}>
        <div style={{ fontWeight: 800, fontSize: '16px' }}>{q.prompt}</div>
        {q.audio && (
          <button onClick={() => speak(q.audio!, 0.8)} style={{ marginTop: '12px', padding: '14px 20px', borderRadius: '50%', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '22px' }}>🔊</button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {q.options.map((opt, i) => (
          <button key={`${idx}_${i}`} onClick={() => answer(opt)}
            style={{ padding: '16px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '15px' }}>
            {opt}
          </button>
        ))}
      </div>
      <button onClick={onExit} style={{ marginTop: '14px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}>✕ Testi bırak</button>
    </div>
  );
}
