import React, { useEffect, useMemo, useRef, useState } from 'react';
import { edgeSpeak } from '../tts/edgeTts';
import CyrillicPad from './CyrillicPad';
import { UNITS_DATA, ALL_WORDS } from '../curriculumData';
import type { WordDetail } from '../curriculumData';
import { normalizeRu, typingMatches } from '../ultra/mockExam';
import { xpGain } from '../ultra/ultraMode';

// ==========================================
// 🃏 KART EVİ — 4 modlu kelime kartı arenası
//   📇 KLASİK: çevir-çalış kartları (bilince kutu yükselir, bilmezsen 1'e düşer)
//   ⚡ YILDIRIM: 60 saniye içinde olabildiğince doğru + seri (streak)
//   ✍️ ÜRETİM (ZOR): Türkçesi verilir, Rusçası KİRİLLE YAZILIR — kalıcılığın zirvesi
//   🔗 EŞLEŞTİRME: 6 çifti kronometreye karşı eşleştir
// Deste önceliği: vadesi gelen SRS kelimeleri → tamamlanan üniteler → tüm müfredat.
// ==========================================

interface Props {
  completedUnits: string[];
  dueSrs: { ru: string; tr: string }[];
  onXp: (n: number) => void;
  onMistake: (ru: string, tr: string, reason: string) => void;
  onSrsGrade: (ru: string, tr: string, good: boolean) => void;
  onRecordResult?: (ru: string, tr: string, ok: boolean) => void;
}

type Mode = 'MENU' | 'CLASSIC' | 'LIGHTNING' | 'TYPING' | 'MATCH';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const cardBox: React.CSSProperties = { background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' };

const FlashcardArena: React.FC<Props> = ({ completedUnits, dueSrs, onXp, onMistake, onSrsGrade, onRecordResult }) => {
  const [mode, setMode] = useState<Mode>('MENU');

  // ---------- DESTELER ----------
  const knownWords = useMemo(() => {
    const ws = UNITS_DATA.filter(u => completedUnits.includes(u.id)).flatMap(u => u.words);
    return [...new Map(ws.map(w => [w.ru, w])).values()];
  }, [completedUnits]);

  const dueWords = useMemo<WordDetail[]>(() => {
    const byRu = new Map(ALL_WORDS.map(w => [w.ru, w]));
    return dueSrs.map(d => byRu.get(d.ru) || ({ id: d.ru, ru: d.ru, tr: d.tr, reading: '', level: 'A1' as const, usageNote: '' }));
  }, [dueSrs]);

  const allPool = useMemo(() => shuffle(ALL_WORDS).slice(0, 40), []);

  const decks: { id: string; label: string; count: number; words: WordDetail[] }[] = [
    { id: 'due', label: '📅 Vadesi gelen SRS kelimeleri', count: dueWords.length, words: dueWords },
    { id: 'known', label: '🎓 Öğrendiğim kelimeler', count: knownWords.length, words: knownWords },
    { id: 'all', label: '🌍 Tüm müfredattan rastgele 40', count: allPool.length, words: allPool },
  ];

  const [deckWords, setDeckWords] = useState<WordDetail[]>([]);
  const pickDeck = (d: (typeof decks)[0], m: Mode) => {
    if (d.words.length === 0) return;
    setDeckWords(shuffle(d.words));
    setMode(m);
  };

  const goMenu = () => { setMode('MENU'); };

  // ================= KLASİK MOD =================
  if (mode === 'CLASSIC') return <ClassicMode words={deckWords} onXp={onXp} onMistake={onMistake} onSrsGrade={onSrsGrade} onRecordResult={onRecordResult} onExit={goMenu} />;
  if (mode === 'LIGHTNING') return <LightningMode words={deckWords} onXp={onXp} onMistake={onMistake} onRecordResult={onRecordResult} onExit={goMenu} />;
  if (mode === 'TYPING') return <TypingMode words={deckWords} onXp={onXp} onMistake={onMistake} onSrsGrade={onSrsGrade} onRecordResult={onRecordResult} onExit={goMenu} />;
  if (mode === 'MATCH') return <MatchMode words={deckWords} onXp={onXp} onMistake={onMistake} onRecordResult={onRecordResult} onExit={goMenu} />;

  // ================= MENÜ =================
  const menuCard = (m: Mode, icon: string, title: string, desc: string, color: string) => (
    <div style={{ ...cardBox, border: `1px solid ${color}55`, background: `linear-gradient(135deg, ${color}14, #1e293b)` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <div style={{ fontSize: '30px' }}>{icon}</div>
        <div>
          <div style={{ fontWeight: 900, fontSize: '16px', color }}>{title}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }}>{desc}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gap: '6px' }}>
        {decks.map(d => (
          <button key={d.id} disabled={d.words.length === 0} onClick={() => pickDeck(d, m)}
            style={{ padding: '10px 12px', borderRadius: '10px', border: '1px solid #334155', background: d.words.length > 0 ? '#0f172a' : '#151f33', color: d.words.length > 0 ? '#e2e8f0' : '#475569', fontWeight: 800, fontSize: '12px', cursor: d.words.length > 0 ? 'pointer' : 'default', textAlign: 'left', opacity: d.words.length > 0 ? 1 : 0.6 }}>
            {d.label} <span style={{ color: '#64748b' }}>({d.count} kart)</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(236,72,153,0.1), #1e293b)', border: '1px solid #f59e0b55', borderRadius: '16px', padding: '18px', marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#f59e0b', letterSpacing: '0.5px' }}>🃏 KART EVİ — KALICI ÖĞRENME ARENASI</div>
        <div style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.6 }}>
          Kelime kartı = beynin en sevdiği tekrar biçimi: kısa, aktif geri çağırma. 4 moddan birini seç; <b style={{ color: '#f59e0b' }}>✍️ Üretim modu</b> kelimeyi kafanda YAZDIRDIĞI için en kalıcısıdır.
        </div>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        {menuCard('CLASSIC', '📇', 'Klasik Kartlar', 'Kartı çevir, kendini dürüstçe değerlendir: bilirsen Leitner kutun yükselir, bilmezsen kutu 1’e düşersin (yarın tekrar).', '#38bdf8')}
        {menuCard('LIGHTNING', '⚡', 'Yıldırım Kartlar (60 sn)', 'Kronometreye karşı: arka arkaya doğru cevaplar SERİni büyütür; yanlışta seri sıfırlanır. Refleks kadar hızlı tanıma!', '#f59e0b')}
        {menuCard('TYPING', '✍️', 'Üretim Kartları (ZOR)', 'Türkçesi verilir, Rusçasını Kiril ekran klavyesiyle YAZARSIN. Şık yok, ipucu yok — kalıcı öğrenmenin en sert antrenmanı.', '#ef4444')}
        {menuCard('MATCH', '🔗', 'Eşleştirme Sprinti', '6 Rusça–Türkçe çifti kronometreye karşı eşleştir. Hata +3 sn ceza gibi işler: hız ile dikkat dengesi.', '#10b981')}
      </div>
    </div>
  );
};

// =====================================================
// 📇 KLASİK MOD — çevir-çalış + Leitner kutusu
// =====================================================
const ClassicMode: React.FC<{
  words: WordDetail[];
  onXp: (n: number) => void;
  onMistake: (ru: string, tr: string, r: string) => void;
  onSrsGrade: (ru: string, tr: string, good: boolean) => void;
  onRecordResult?: (ru: string, tr: string, ok: boolean) => void;
  onExit: () => void;
}> = ({ words, onXp, onMistake, onSrsGrade, onRecordResult, onExit }) => {
  const [deck, setDeck] = useState<WordDetail[]>(() => shuffle(words).slice(0, 24));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [requeued, setRequeued] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<{ ok: number; bad: number }>({ ok: 0, bad: 0 });
  const done = idx >= deck.length;
  const w = deck[idx];

  useEffect(() => {
    setFlipped(false);
    if (w) { const t = window.setTimeout(() => { void edgeSpeak(w.ru); }, 250); return () => window.clearTimeout(t); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const grade = (good: boolean) => {
    onSrsGrade(w.ru, w.tr, good);
    onRecordResult?.(w.ru, w.tr, good);
    setResults(r => ({ ok: r.ok + (good ? 1 : 0), bad: r.bad + (good ? 0 : 1) }));
    if (!good) {
      onMistake(w.ru, w.tr, '📇 Kart Evinde Bilinmedi');
      // Kalıcı öğrenme kuralı: bilinmeyen kart deste sonuna 1 kez geri döner
      if (!requeued.has(w.ru)) {
        setRequeued(s => new Set(s).add(w.ru));
        setDeck(d => [...d, w]);
      }
    } else {
      onXp(xpGain(3));
    }
    setIdx(i => i + 1);
  };

  if (done) {
    const total = results.ok + results.bad;
    const pct = total ? Math.round((results.ok / total) * 100) : 0;
    return (
      <div style={{ ...cardBox, textAlign: 'center' }}>
        <div style={{ fontSize: '40px' }}>{pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '📚'}</div>
        <div style={{ fontSize: '24px', fontWeight: 900, margin: '10px 0 4px' }}>Deste bitti!</div>
        <div style={{ fontSize: '14px', color: '#94a3b8' }}>{results.ok} bildin · {results.bad} bilemedin{badDose(results.bad) ? ' — bilemediklerin deste içinde tekrar soruldu ve SRS kutusuna işlendi' : ''}</div>
        <div style={{ fontSize: '36px', fontWeight: 900, color: pct >= 80 ? '#10b981' : '#f59e0b', margin: '12px 0' }}>%{pct}</div>
        <button onClick={onExit} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#38bdf8', color: '#06283d', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>Kart Evine Dön</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#94a3b8', marginBottom: '10px' }}>
        <span>📇 KLASİK — kart {Math.min(idx + 1, deck.length)}/{deck.length}</span>
        <span>✅ {results.ok} · ❌ {results.bad}</span>
      </div>
      <div onClick={() => setFlipped(f => !f)} style={{ ...cardBox, minHeight: '190px', display: 'grid', placeItems: 'center', textAlign: 'center', cursor: 'pointer', border: `1px solid ${flipped ? '#38bdf8' : '#334155'}`, background: flipped ? 'linear-gradient(135deg, rgba(56,189,248,0.15), #1e293b)' : '#1e293b', transition: 'all 0.2s' }}>
        {!flipped ? (
          <div>
            <div style={{ fontSize: '34px', fontWeight: 900 }}>{w.ru}</div>
            {w.reading && <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '6px' }}>[{w.reading}]</div>}
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '14px', fontWeight: 800 }}>çevirmek için karta dokun 🔄</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: '#38bdf8' }}>{w.tr}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>{w.ru} {w.reading ? `· [${w.reading}]` : ''}</div>
            {w.usageNote && <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '10px', lineHeight: 1.5 }}>💡 {w.usageNote}</div>}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
        <button onClick={() => { void edgeSpeak(w.ru); }} style={{ padding: '14px 18px', borderRadius: '12px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>🔊</button>
        <button onClick={() => grade(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #ef444466', background: 'rgba(239,68,68,0.12)', color: '#fca5a5', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>😕 Bilmiyorum</button>
        <button onClick={() => grade(true)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#10b981', color: '#06281c', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>✅ Biliyorum</button>
      </div>
      <button onClick={onExit} style={{ marginTop: '12px', width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #334155', background: 'transparent', color: '#64748b', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}>Desteden Çık</button>
    </div>
  );
};

const badDose = (b: number) => b > 0;

// =====================================================
// ⚡ YILDIRIM MOD — 60 saniye, seri (streak) yakalama
// =====================================================
const LightningMode: React.FC<{
  words: WordDetail[];
  onXp: (n: number) => void;
  onMistake: (ru: string, tr: string, r: string) => void;
  onRecordResult?: (ru: string, tr: string, ok: boolean) => void;
  onExit: () => void;
}> = ({ words, onXp, onMistake, onRecordResult, onExit }) => {
  const DURATION = 60;
  const [left, setLeft] = useState(DURATION);
  const [cur, setCur] = useState<{ w: WordDetail; options: string[] } | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [flash, setFlash] = useState<'ok' | 'bad' | null>(null);
  const [done, setDone] = useState(false);
  const poolRef = useRef<{ pool: WordDetail[]; i: number }>({ pool: [], i: 0 });

  const nextQ = () => {
    const p = poolRef.current;
    if (p.pool.length === 0) p.pool = shuffle(words);
    if (p.i >= p.pool.length) { p.pool = shuffle(words); p.i = 0; }
    const w = p.pool[p.i++];
    const ds = shuffle(ALL_WORDS.filter(x => x.tr !== w.tr)).slice(0, 3).map(x => x.tr);
    setCur({ w, options: shuffle([w.tr, ...ds]) });
  };

  useEffect(() => {
    nextQ();
    const t = window.setInterval(() => {
      setLeft(l => {
        if (l <= 1) { window.clearInterval(t); setDone(true); return 0; }
        return l - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const answer = (opt: string) => {
    if (!cur || done) return;
    const ok = opt === cur.w.tr;
    onRecordResult?.(cur.w.ru, cur.w.tr, ok);
    if (ok) {
      setFlash('ok');
      setStreak(s => { const ns = s + 1; setBestStreak(b => Math.max(b, ns)); return ns; });
      setCorrect(c => c + 1);
    } else {
      setFlash('bad');
      setStreak(0);
      onMistake(cur.w.ru, cur.w.tr, '⚡ Yıldırım Kartlarda Kaçırdı');
    }
    window.setTimeout(() => { setFlash(null); if (!done) nextQ(); }, 320);
  };

  useEffect(() => {
    if (done) onXp(xpGain(correct * 3 + bestStreak * 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) {
    return (
      <div style={{ ...cardBox, textAlign: 'center' }}>
        <div style={{ fontSize: '40px' }}>⚡</div>
        <div style={{ fontSize: '24px', fontWeight: 900, margin: '8px 0' }}>Süre doldu!</div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '14px 0' }}>
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '12px 18px' }}><div style={{ fontSize: '22px', fontWeight: 900, color: '#10b981' }}>{correct}</div><div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>DOĞRU</div></div>
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '12px 18px' }}><div style={{ fontSize: '22px', fontWeight: 900, color: '#f59e0b' }}>🔥{bestStreak}</div><div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>EN İYİ SERİ</div></div>
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '12px 18px' }}><div style={{ fontSize: '22px', fontWeight: 900, color: '#38bdf8' }}>+{xpGain(correct * 3 + bestStreak * 2)}</div><div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>XP</div></div>
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '14px' }}>Kaçırdıkların hata kütüğüne işlendi — Zayıf Nokta antrenmanında karşına çıkacak.</div>
        <button onClick={onExit} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#f59e0b', color: '#3b2a05', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>Kart Evine Dön</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 900, color: left <= 10 ? '#ef4444' : '#f59e0b' }}>⏱️ {left}sn</span>
        <span style={{ fontSize: '12px', fontWeight: 900, color: streak >= 5 ? '#f97316' : '#94a3b8' }}>{streak >= 2 ? `🔥 SERİ ×${streak}` : `doğru: ${correct}`}</span>
      </div>
      <div style={{ height: '6px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
        <div style={{ width: `${(left / DURATION) * 100}%`, height: '100%', background: left <= 10 ? '#ef4444' : 'linear-gradient(90deg,#f59e0b,#ef4444)', transition: 'width 1s linear' }} />
      </div>
      {cur && (
        <div style={{ ...cardBox, border: `1px solid ${flash === 'ok' ? '#10b981' : flash === 'bad' ? '#ef4444' : '#334155'}`, transition: 'border-color 0.15s' }}>
          <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
            <div style={{ fontSize: '32px', fontWeight: 900 }}>{cur.w.ru}</div>
            <button onClick={() => { void edgeSpeak(cur.w.ru); }} style={{ marginTop: '8px', padding: '8px 14px', borderRadius: '10px', border: 'none', background: '#3b82f6', color: '#fff', cursor: 'pointer', fontWeight: 800, fontSize: '13px' }}>🔊 dinle</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {cur.options.map((o, i) => (
              <button key={i} onClick={() => answer(o)} style={{ padding: '14px 10px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>{o}</button>
            ))}
          </div>
        </div>
      )}
      <button onClick={onExit} style={{ marginTop: '12px', width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #334155', background: 'transparent', color: '#64748b', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}>Erken Bitir</button>
    </div>
  );
};

// =====================================================
// ✍️ ÜRETİM MOD (ZOR) — TR verilir, RU yazılır
// =====================================================
const TypingMode: React.FC<{
  words: WordDetail[];
  onXp: (n: number) => void;
  onMistake: (ru: string, tr: string, r: string) => void;
  onSrsGrade: (ru: string, tr: string, good: boolean) => void;
  onRecordResult?: (ru: string, tr: string, ok: boolean) => void;
  onExit: () => void;
}> = ({ words, onXp, onMistake, onSrsGrade, onRecordResult, onExit }) => {
  const [deck] = useState<WordDetail[]>(() => shuffle(words).slice(0, 10));
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [reveal, setReveal] = useState<{ ok: boolean; answer: string } | null>(null);
  const [score, setScore] = useState({ ok: 0, bad: 0 });
  const done = idx >= deck.length;
  const w = deck[idx];

  useEffect(() => {
    if (done) onXp(xpGain(score.ok * 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const submit = () => {
    if (reveal) return;
    const ok = typingMatches(typed, w.ru, [normalizeRu(w.ru)]);
    setReveal({ ok, answer: w.ru });
    onRecordResult?.(w.ru, w.tr, ok);
    onSrsGrade(w.ru, w.tr, ok);
    setScore(s => ({ ok: s.ok + (ok ? 1 : 0), bad: s.bad + (ok ? 0 : 1) }));
    if (!ok) onMistake(w.ru, w.tr, '✍️ Üretim Kartında Yazılamadı');
    window.setTimeout(() => { setReveal(null); setTyped(''); setIdx(i => i + 1); }, 1200);
  };

  if (done) {
    const total = score.ok + score.bad;
    const pct = total ? Math.round((score.ok / total) * 100) : 0;
    return (
      <div style={{ ...cardBox, textAlign: 'center' }}>
        <div style={{ fontSize: '40px' }}>{pct >= 80 ? '👑' : '✍️'}</div>
        <div style={{ fontSize: '24px', fontWeight: 900, margin: '10px 0 4px' }}>Üretim destesi bitti!</div>
        <div style={{ fontSize: '36px', fontWeight: 900, color: pct >= 80 ? '#10b981' : '#ef4444', margin: '12px 0' }}>%{pct}</div>
        <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '14px' }}>{score.ok} kelimeyi YAZABİLDİN (üretim) · {score.bad} kelime kutu 1’e düştü, yarın geri döner. +{xpGain(score.ok * 10)} XP</div>
        <button onClick={onExit} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>Kart Evine Dön</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#94a3b8', marginBottom: '10px' }}>
        <span>✍️ ÜRETİM (ZOR) — {Math.min(idx + 1, deck.length)}/{deck.length}</span>
        <span>✅ {score.ok} · ❌ {score.bad}</span>
      </div>
      <div style={cardBox}>
        <div style={{ textAlign: 'center', padding: '10px 0 16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#ef4444', letterSpacing: '0.5px', marginBottom: '8px' }}>BU KELİMEYİ RUSÇA YAZ:</div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#f59e0b' }}>{w.tr}</div>
          {w.usageNote && <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>💡 {w.usageNote}</div>}
        </div>
        <input
          value={typed}
          onChange={e => setTyped(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
          disabled={!!reveal}
          placeholder="Kiril harfleriyle yaz..."
          autoFocus
          style={{ width: '100%', boxSizing: 'border-box', padding: '14px', borderRadius: '12px', border: `1px solid ${reveal ? (reveal.ok ? '#10b981' : '#ef4444') : '#38bdf8'}`, background: '#0f172a', color: '#f8fafc', fontSize: '18px', fontWeight: 800, outline: 'none' }}
        />
        {reveal && (
          <div style={{ marginTop: '10px', padding: '12px', borderRadius: '10px', background: reveal.ok ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)', border: `1px solid ${reveal.ok ? '#10b98166' : '#ef444466'}`, fontSize: '14px', fontWeight: 800, color: reveal.ok ? '#10b981' : '#fca5a5' }}>
            {reveal.ok ? '✅ Tam isabet!' : <>❌ Doğrusu: <b style={{ color: '#10b981' }}>{reveal.answer}</b> {w.reading ? <span style={{ color: '#94a3b8', fontWeight: 700 }}>[{w.reading}]</span> : null}</>}
          </div>
        )}
        <CyrillicPad
          onType={ch => !reveal && setTyped(t => t + ch)}
          onBackspace={() => !reveal && setTyped(t => t.slice(0, -1))}
          onSpace={() => !reveal && setTyped(t => t + ' ')}
          onEnter={submit}
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
          <button onClick={() => { void edgeSpeak(w.ru); }} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #334155', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontWeight: 800, fontSize: '12px' }}>🔊 pes et & dinle</button>
          <button onClick={submit} disabled={!!reveal} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#10b981', color: '#06281c', fontWeight: 900, fontSize: '15px', cursor: reveal ? 'default' : 'pointer' }}>✓ Kontrol Et</button>
        </div>
      </div>
      <button onClick={onExit} style={{ marginTop: '12px', width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #334155', background: 'transparent', color: '#64748b', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}>Desteden Çık</button>
    </div>
  );
};

// =====================================================
// 🔗 EŞLEŞTİRME MOD — kronometreli 6 çift
// =====================================================
const MatchMode: React.FC<{
  words: WordDetail[];
  onXp: (n: number) => void;
  onMistake: (ru: string, tr: string, r: string) => void;
  onRecordResult?: (ru: string, tr: string, ok: boolean) => void;
  onExit: () => void;
}> = ({ words, onXp, onMistake, onRecordResult, onExit }) => {
  const [pairs] = useState<WordDetail[]>(() => shuffle(words).slice(0, 6));
  const [left] = useState<string[]>(() => shuffle(pairs.map(p => p.ru)));
  const [right] = useState<string[]>(() => shuffle(pairs.map(p => p.tr)));
  const [selRu, setSelRu] = useState<string | null>(null);
  const [selTr, setSelTr] = useState<string | null>(null);
  const [donePairs, setDonePairs] = useState<string[]>([]);
  const [errs, setErrs] = useState(0);
  const [secs, setSecs] = useState(0);
  const [flashBad, setFlashBad] = useState<string | null>(null);
  const finished = donePairs.length === pairs.length;

  useEffect(() => {
    if (finished) return;
    const t = window.setInterval(() => setSecs(s => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [finished]);

  useEffect(() => {
    if (finished) onXp(xpGain(Math.max(8, 36 - errs * 3 - Math.floor(secs / 10))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const tryPick = (side: 'ru' | 'tr', val: string) => {
    if (finished) return;
    const nRu = side === 'ru' ? val : selRu;
    const nTr = side === 'tr' ? val : selTr;
    if (side === 'ru') setSelRu(val); else setSelTr(val);
    if (nRu && nTr) {
      const pair = pairs.find(p => p.ru === nRu && p.tr === nTr);
      if (pair) {
        setDonePairs(d => [...d, nRu]);
        onRecordResult?.(pair.ru, pair.tr, true);
        setSelRu(null); setSelTr(null);
      } else {
        setErrs(e => e + 1);
        const ruW = pairs.find(p => p.ru === nRu);
        if (ruW) { onMistake(ruW.ru, ruW.tr, '🔗 Eşleştirme Sprintinde Yanlış'); onRecordResult?.(ruW.ru, ruW.tr, false); }
        setFlashBad(nRu);
        window.setTimeout(() => { setFlashBad(null); setSelRu(null); setSelTr(null); }, 420);
      }
    }
  };

  if (finished) {
    const gain = xpGain(Math.max(8, 36 - errs * 3 - Math.floor(secs / 10)));
    return (
      <div style={{ ...cardBox, textAlign: 'center' }}>
        <div style={{ fontSize: '40px' }}>🔗</div>
        <div style={{ fontSize: '24px', fontWeight: 900, margin: '8px 0' }}>Tüm çiftler eşleşti!</div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '14px 0' }}>
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '12px 18px' }}><div style={{ fontSize: '22px', fontWeight: 900, color: '#38bdf8' }}>{secs}sn</div><div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>SÜRE</div></div>
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '12px 18px' }}><div style={{ fontSize: '22px', fontWeight: 900, color: errs === 0 ? '#10b981' : '#ef4444' }}>{errs}</div><div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>HATA</div></div>
          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '12px 18px' }}><div style={{ fontSize: '22px', fontWeight: 900, color: '#f59e0b' }}>+{gain}</div><div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>XP</div></div>
        </div>
        <button onClick={onExit} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#10b981', color: '#06281c', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>Kart Evine Dön</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#94a3b8', marginBottom: '10px' }}>
        <span>🔗 EŞLEŞTİRME — {donePairs.length}/{pairs.length} çift</span>
        <span>⏱️ {secs}sn · hata: {errs}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ display: 'grid', gap: '8px' }}>
          {left.map(ru => {
            const isDone = donePairs.includes(ru);
            return (
              <button key={ru} disabled={isDone} onClick={() => tryPick('ru', ru)}
                style={{ padding: '13px 8px', borderRadius: '10px', border: `1px solid ${isDone ? '#10b98166' : selRu === ru ? '#38bdf8' : flashBad === ru ? '#ef4444' : '#334155'}`, background: isDone ? 'rgba(16,185,129,0.12)' : selRu === ru ? 'rgba(56,189,248,0.18)' : '#0f172a', color: isDone ? '#10b981' : '#e2e8f0', fontWeight: 900, fontSize: '14px', cursor: isDone ? 'default' : 'pointer', opacity: isDone ? 0.6 : 1 }}>
                {ru}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'grid', gap: '8px' }}>
          {right.map(tr => {
            const isDone = donePairs.some(ru => pairs.find(p => p.ru === ru)?.tr === tr);
            return (
              <button key={tr} disabled={isDone} onClick={() => tryPick('tr', tr)}
                style={{ padding: '13px 8px', borderRadius: '10px', border: `1px solid ${isDone ? '#10b98166' : selTr === tr ? '#f59e0b' : '#334155'}`, background: isDone ? 'rgba(16,185,129,0.12)' : selTr === tr ? 'rgba(245,158,11,0.15)' : '#0f172a', color: isDone ? '#10b981' : '#e2e8f0', fontWeight: 800, fontSize: '13px', cursor: isDone ? 'default' : 'pointer', opacity: isDone ? 0.6 : 1 }}>
                {tr}
              </button>
            );
          })}
        </div>
      </div>
      <button onClick={onExit} style={{ marginTop: '12px', width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #334155', background: 'transparent', color: '#64748b', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}>Oyundan Çık</button>
    </div>
  );
};

export default FlashcardArena;
