import React, { useEffect, useMemo, useRef, useState } from 'react';
import { edgeSpeak } from '../tts/edgeTts';
import CyrillicPad from './CyrillicPad';
import {
  EXAM_LEVELS, buildMockExam, examReadiness, typingMatches, examPassPct,
} from '../ultra/mockExam';
import type { BuiltExam, ExamQuestion, ExamSkillKey, ExamLevelId } from '../ultra/mockExam';
import { EXAM_SKILL_LABEL } from '../ultra/mockExam';
import { isUltraMode, xpGain } from '../ultra/ultraMode';
import { loadExamAttempts, saveExamAttempt, bestAttemptFor, fmtDate } from '../ultra/examStore';
import type { ExamAttempt } from '../ultra/examStore';

// ==========================================
// 📝 DENEME SINAVLARI EKRANI
// Seviyeni seç → süreli 6 bölümlü karma sınavı çöz → detaylı rapor al.
// Yanlışlar hata kütüğüne + öğrenen modeline işlenir; puan geçmişi saklanır.
// ⌨️ YAZMA bölümü ekran Kiril klavyesiyle çözülür — en zor bölüm budur.
// ==========================================

interface Props {
  completedUnits: string[];
  onXp: (n: number) => void;
  onMistake: (ru: string, tr: string, reason: string) => void;
  onRecordResult?: (ru: string, tr: string, ok: boolean) => void;
}

const PASS_BONUS: Record<ExamLevelId, number> = { A1: 40, A2: 55, B1: 75, B2: 100, 'C1/C2': 130, GENEL: 170, GUNLUK: 60 };

function shuffleArr<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const MockExamScreen: React.FC<Props> = ({ completedUnits, onXp, onMistake, onRecordResult }) => {
  const [attempts, setAttempts] = useState<ExamAttempt[]>(() => loadExamAttempts());
  const [exam, setExam] = useState<BuiltExam | null>(null);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [reveal, setReveal] = useState<{ picked: string; ok: boolean } | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const startRef = useRef<number>(0);
  const correctRef = useRef(0);
  const skillStats = useRef<Record<ExamSkillKey, [number, number]>>({ vocab: [0, 0], production: [0, 0], listening: [0, 0], context: [0, 0], cloze: [0, 0], typing: [0, 0], match: [0, 0] });
  const wrongRef = useRef<ExamQuestion[]>([]);
  const advanceTimer = useRef<number | null>(null);
  const q = exam?.questions[idx];

  // 🔗 Eşleştirme sorusu yerel durumu (sütunlar soru başına bir kez karılır)
  const [matchState, setMatchState] = useState<{ selRu: string | null; selTr: string | null; done: string[]; errs: number }>({ selRu: null, selTr: null, done: [], errs: 0 });
  const [matchCols, setMatchCols] = useState<{ left: string[]; right: string[] }>({ left: [], right: [] });
  useEffect(() => {
    setMatchState({ selRu: null, selTr: null, done: [], errs: 0 });
    if (q?.kind === 'match' && q.pairs) {
      setMatchCols({ left: shuffleArr(q.pairs.map(p => p.ru)), right: shuffleArr(q.pairs.map(p => p.tr)) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, exam]);

  // ---------- sınav başlat ----------
  const startExam = (level: ExamLevelId) => {
    const built = buildMockExam(level, completedUnits);
    if (!built) return;
    correctRef.current = 0;
    wrongRef.current = [];
    skillStats.current = { vocab: [0, 0], production: [0, 0], listening: [0, 0], context: [0, 0], cloze: [0, 0], typing: [0, 0], match: [0, 0] };
    startRef.current = Date.now();
    setXpEarned(0);
    setExam(built);
    setIdx(0);
    setTyped('');
    setReveal(null);
    setFinished(false);
  };

  // ---------- soru süresi ----------
  useEffect(() => {
    if (!exam || finished || !q) return;
    setTimeLeft(q.seconds);
    const deadline = Date.now() + q.seconds * 1000;
    const t = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setTimeLeft(left);
      if (left <= 0) {
        window.clearInterval(t);
        handleTimeout();
      }
    }, 250);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, idx, finished]);

  // ---------- dinleme sorusu otomatik ses ----------
  useEffect(() => {
    if (!exam || finished || reveal) return;
    if (q?.audioOnly && q.speakText) {
      const t = window.setTimeout(() => { void edgeSpeak(q.speakText!, { prosodyRate: '-15%' }); }, 300);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, idx, finished]);

  // ---------- klavye 1-4 ----------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!exam || finished || reveal || !q) return;
      if (q.kind === 'typing') {
        if (e.key === 'Enter') { e.preventDefault(); submitTyping(); }
        return;
      }
      if (q.kind === 'match') return; // eşleştirme dokunarak oynanır
      if (e.key < '1' || e.key > '4') return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      const i = Number(e.key) - 1;
      if (q.options && q.options[i] !== undefined) answerChoice(q.options[i]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam, idx, finished, reveal, typed]);

  // ---------- cevap kaydetme + sonraki soru ----------
  const recordAnswer = (ok: boolean) => {
    if (!q || !exam) return;
    const st = skillStats.current[q.skill];
    skillStats.current[q.skill] = [st[0] + (ok ? 1 : 0), st[1] + 1];
    onRecordResult?.(q.ru, q.tr, ok);
    if (ok) {
      correctRef.current += 1;
    } else {
      wrongRef.current.push(q);
      onMistake(q.ru, q.tr, `📝 Deneme Sınavı (${exam.level} · ${EXAM_SKILL_LABEL[q.skill]})`);
    }
  };

  const advance = () => {
    if (!exam) return;
    setReveal(null);
    setTyped('');
    if (idx + 1 < exam.questions.length) {
      setIdx(idx + 1);
    } else {
      finishExam();
    }
  };

  const scheduleAdvance = () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(advance, 950);
  };

  const answerChoice = (opt: string) => {
    if (reveal || !q) return;
    const ok = opt === q.correct;
    setReveal({ picked: opt, ok });
    recordAnswer(ok);
    scheduleAdvance();
  };

  const submitTyping = () => {
    if (reveal || !q) return;
    const ok = typingMatches(typed, q.correct, q.accept);
    setReveal({ picked: typed.trim() || '(boş)', ok });
    recordAnswer(ok);
    scheduleAdvance();
  };

  const handleTimeout = () => {
    if (reveal || !q) return;
    setReveal({ picked: '⏱️ Süre doldu', ok: false });
    recordAnswer(false);
    scheduleAdvance();
  };

  // 🔗 Eşleştirme sorusu etkileşimi: RU seç → TR seç; yanlışta +1 hata.
  // 3 çift bittiğinde: 0-1 hata = doğru sayılır (süreli baskı telafisi), 2+ hata = yanlış.
  const tryMatch = (side: 'ru' | 'tr', val: string) => {
    if (!q || q.kind !== 'match' || !q.pairs || reveal) return;
    const nRu = side === 'ru' ? val : matchState.selRu;
    const nTr = side === 'tr' ? val : matchState.selTr;
    if (side === 'ru') setMatchState(s => ({ ...s, selRu: val }));
    else setMatchState(s => ({ ...s, selTr: val }));
    if (!nRu || !nTr) return;
    const hit = q.pairs.some(p => p.ru === nRu && p.tr === nTr);
    const w = q.pairs.find(p => p.ru === nRu);
    onRecordResult?.(nRu, w?.tr || '', hit);
    if (hit) {
      const done = [...matchState.done, nRu];
      setMatchState({ selRu: null, selTr: null, done, errs: matchState.errs });
      if (done.length >= q.pairs.length) {
        const ok = matchState.errs <= 1;
        setReveal({ picked: ok ? `${done.length}/${q.pairs.length} hatasız akış` : `${matchState.errs} hata yaptın`, ok });
        recordAnswer(ok);
        scheduleAdvance();
      }
    } else {
      if (w) onMistake(w.ru, w.tr, `📝 Deneme Sınavı (${exam!.level} · 🔗 Eşleştirme)`);
      setMatchState(s => ({ ...s, selRu: null, selTr: null, errs: s.errs + 1 }));
    }
  };

  // ---------- bitiş + rapor ----------
  const finishExam = () => {
    if (!exam) return;
    const total = exam.questions.length;
    const correct = correctRef.current;
    const percent = Math.round((correct / total) * 100);
    const passed = percent >= exam.passPct;
    const durationSec = Math.max(1, Math.round((Date.now() - startRef.current) / 1000));
    const skills: Record<string, [number, number]> = {};
    (Object.keys(skillStats.current) as ExamSkillKey[]).forEach(k => { skills[k] = skillStats.current[k]; });

    const prevAttempts = loadExamAttempts();
    const prevBest = bestAttemptFor(exam.level, prevAttempts);
    const isNewBest = !prevBest || percent > prevBest.percent;

    saveExamAttempt({ level: exam.level, total, correct, percent, passed, durationSec, skills, ultra: isUltraMode() });
    setAttempts(loadExamAttempts());

    // XP: her doğru + bölüm bonusu + rekor bonusu (ultra modda ×1.5)
    let gain = 0;
    correctRef.current && exam.questions.forEach((qq) => {
      if (!wrongRef.current.includes(qq)) gain += qq.skill === 'typing' ? 12 : 7;
    });
    if (passed) gain += PASS_BONUS[exam.level];
    if (isNewBest && prevBest) gain += 40;
    gain = xpGain(gain);
    setXpEarned(gain);
    onXp(gain);
    setFinished(true);
  };

  const stopExam = () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    setExam(null);
    setFinished(false);
    setReveal(null);
  };

  useEffect(() => () => { if (advanceTimer.current) window.clearTimeout(advanceTimer.current); }, []);

  const ultra = isUltraMode();

  // ================= RAPOR EKRANI =================
  if (exam && finished) {
    const total = exam.questions.length;
    const correct = correctRef.current;
    const percent = Math.round((correct / total) * 100);
    const passed = percent >= exam.passPct;
    const best = bestAttemptFor(exam.level, attempts);
    const ring = 2 * Math.PI * 54;
    return (
      <div>
        <div style={{ background: `linear-gradient(135deg, ${passed ? '#10b981' : '#ef4444'}22, #1e293b)`, border: `1px solid ${passed ? '#10b981' : '#ef4444'}66`, borderRadius: '16px', padding: '22px', textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 900, color: exam.color, letterSpacing: '0.5px' }}>{exam.icon} {exam.title.toUpperCase()} — SONUÇ RAPORU</div>
          <div style={{ position: 'relative', width: '130px', height: '130px', margin: '16px auto 8px' }}>
            <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="65" cy="65" r="54" stroke="#0f172a" strokeWidth="11" fill="none" />
              <circle cx="65" cy="65" r="54" stroke={passed ? '#10b981' : '#ef4444'} strokeWidth="11" fill="none"
                strokeDasharray={ring} strokeDashoffset={ring * (1 - percent / 100)} strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
              <div>
                <div style={{ fontSize: '30px', fontWeight: 900, color: passed ? '#10b981' : '#ef4444' }}>%{percent}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>{correct}/{total} doğru</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: passed ? '#10b981' : '#ef4444' }}>{passed ? '🎉 GEÇTİN!' : '💪 KALDIN — ama her deneme seni güçlendirir'}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
            Baraj %{exam.passPct}{ultra ? ' (⚡ULTRA)' : ''} · +{xpEarned} XP kazandın
            {best && <span> · En iyi puanın: %{best.percent}</span>}
          </div>
        </div>

        {/* Beceri kırılımı */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '18px', marginBottom: '16px' }}>
          <div style={{ fontWeight: 900, marginBottom: '12px', fontSize: '14px' }}>📊 Beceri Karnesi</div>
          {(Object.keys(EXAM_SKILL_LABEL) as ExamSkillKey[]).filter(k => skillStats.current[k][1] > 0).map(k => {
            const [c, t] = skillStats.current[k];
            const pct = t ? Math.round((c / t) * 100) : 0;
            return (
              <div key={k} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: '#cbd5e1' }}>{EXAM_SKILL_LABEL[k]}</span>
                  <span style={{ color: pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444', fontWeight: 900 }}>{c}/{t} · %{pct}</span>
                </div>
                <div style={{ height: '8px', background: '#0f172a', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444', borderRadius: '5px', transition: 'width 0.5s' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Yanlış kartelası */}
        {wrongRef.current.length > 0 && (
          <div style={{ background: '#1e293b', border: '1px solid #ef444455', borderRadius: '16px', padding: '18px', marginBottom: '16px' }}>
            <div style={{ fontWeight: 900, marginBottom: '10px', fontSize: '14px', color: '#fca5a5' }}>🩹 Yanlışların ({wrongRef.current.length}) — hepsi hata kütüğüne ve aralıklı tekrara işlendi</div>
            {wrongRef.current.map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', marginBottom: '6px', background: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#94a3b8', minWidth: '86px' }}>{EXAM_SKILL_LABEL[w.skill]}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.ru}</div>
                  <div style={{ fontSize: '11px', color: '#10b981' }}>Doğrusu: {w.correct}</div>
                </div>
                <button onClick={() => { void edgeSpeak(w.speakText || w.ru); }} style={{ padding: '8px 10px', borderRadius: '8px', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '13px' }}>🔊</button>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={() => startExam(exam.level)} style={{ flex: 1, minWidth: '150px', padding: '14px', borderRadius: '12px', border: 'none', background: exam.color, color: '#0f172a', fontWeight: 900, fontSize: '15px', cursor: 'pointer' }}>🔁 Yeni Deneme (sorular karışır)</button>
          <button onClick={stopExam} style={{ flex: 1, minWidth: '150px', padding: '14px', borderRadius: '12px', border: '1px solid #334155', background: 'transparent', color: '#cbd5e1', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>Seviye Seçimine Dön</button>
        </div>
      </div>
    );
  }

  // ================= SINAV AKIŞI =================
  if (exam && q) {
    const pctQ = Math.round((idx / exam.questions.length) * 100);
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, color: exam.color, background: '#0f172a', border: `1px solid ${exam.color}66`, borderRadius: '8px', padding: '4px 10px' }}>{exam.icon} {exam.title.toUpperCase()}</span>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8' }}>SORU {idx + 1}/{exam.questions.length} · {EXAM_SKILL_LABEL[q.skill]}</span>
          <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 900, color: timeLeft <= 5 ? '#ef4444' : '#10b981' }}>⏱️ {timeLeft}sn</span>
        </div>
        <div style={{ height: '6px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ width: `${pctQ}%`, height: '100%', background: exam.color, transition: 'width 0.4s' }} />
        </div>

        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
          {q.audioOnly ? (
            <div style={{ textAlign: 'center', margin: '10px 0 18px' }}>
              <button onClick={() => { void edgeSpeak(q.speakText!, { prosodyRate: '-15%' }); }} style={{ padding: '20px 28px', borderRadius: '50%', background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '30px' }}>🔊</button>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px', fontWeight: 700 }}>🎧 Sesi dinle ve anlamını seç (tekrar dinleyebilirsin)</div>
            </div>
          ) : (
            <div style={{ whiteSpace: 'pre-line', fontSize: '17px', fontWeight: 800, lineHeight: 1.55, marginBottom: '6px' }}>{q.prompt}</div>
          )}
          {q.hint && <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>💡 {q.hint}</div>}

          {q.kind === 'choice' && q.options && (
            <div style={{ display: 'grid', gap: '10px', marginTop: '14px' }}>
              {q.options.map((opt, i) => {
                const isPicked = reveal?.picked === opt;
                const showCorrect = reveal && opt === q.correct;
                const bg = showCorrect ? '#10b981' : isPicked && !reveal.ok ? '#ef4444' : '#0f172a';
                const border = showCorrect ? '#10b981' : isPicked && !reveal.ok ? '#ef4444' : '#334155';
                return (
                  <button key={i} disabled={!!reveal} onClick={() => answerChoice(opt)}
                    style={{ padding: '14px', borderRadius: '12px', border: `1px solid ${border}`, background: bg, color: reveal && (showCorrect || isPicked) ? '#06281c' : '#e2e8f0', fontWeight: 800, fontSize: '15px', textAlign: 'left', cursor: reveal ? 'default' : 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                    <span style={{ position: 'absolute', top: '4px', right: '8px', fontSize: '10px', opacity: 0.55, fontWeight: 900 }}>{i + 1}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {q.kind === 'match' && q.pairs && (
            <div style={{ marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#94a3b8', marginBottom: '8px' }}>
                <span>{matchState.done.length}/{q.pairs.length} çift</span>
                <span style={{ color: matchState.errs > 0 ? '#ef4444' : '#475569' }}>hata: {matchState.errs} (hata hakkı: 1)</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {matchCols.left.map(ru => {
                    const isDone = matchState.done.includes(ru);
                    return (
                      <button key={ru} disabled={isDone || !!reveal} onClick={() => tryMatch('ru', ru)}
                        style={{ padding: '13px 8px', borderRadius: '10px', border: `1px solid ${isDone ? '#10b98166' : matchState.selRu === ru ? '#38bdf8' : '#334155'}`, background: isDone ? 'rgba(16,185,129,0.12)' : matchState.selRu === ru ? 'rgba(56,189,248,0.18)' : '#0f172a', color: isDone ? '#10b981' : '#e2e8f0', fontWeight: 900, fontSize: '14px', cursor: isDone ? 'default' : 'pointer', opacity: isDone ? 0.6 : 1 }}>
                        {ru}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {matchCols.right.map(tr => {
                    const isDone = matchState.done.some(ru => q.pairs!.find(p => p.ru === ru)?.tr === tr);
                    return (
                      <button key={tr} disabled={isDone || !!reveal} onClick={() => tryMatch('tr', tr)}
                        style={{ padding: '13px 8px', borderRadius: '10px', border: `1px solid ${isDone ? '#10b98166' : matchState.selTr === tr ? '#f59e0b' : '#334155'}`, background: isDone ? 'rgba(16,185,129,0.12)' : matchState.selTr === tr ? 'rgba(245,158,11,0.15)' : '#0f172a', color: isDone ? '#10b981' : '#e2e8f0', fontWeight: 800, fontSize: '13px', cursor: isDone ? 'default' : 'pointer', opacity: isDone ? 0.6 : 1 }}>
                        {tr}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {q.kind === 'typing' && (
            <div style={{ marginTop: '14px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  value={typed}
                  onChange={e => setTyped(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submitTyping(); } }}
                  disabled={!!reveal}
                  placeholder="Rusçasını yaz..."
                  autoFocus
                  style={{ flex: 1, padding: '14px', borderRadius: '12px', border: `1px solid ${reveal ? (reveal.ok ? '#10b981' : '#ef4444') : '#38bdf8'}`, background: '#0f172a', color: '#f8fafc', fontSize: '18px', fontWeight: 800, outline: 'none' }}
                />
              </div>
              {reveal && !reveal.ok && (
                <div style={{ marginTop: '10px', padding: '12px', borderRadius: '10px', background: 'rgba(239,68,68,0.12)', border: '1px solid #ef444466', fontSize: '14px' }}>
                  ❌ Senin cevabın: <b>{reveal.picked}</b> · Doğrusu: <b style={{ color: '#10b981' }}>{q.correct}</b>
                </div>
              )}
              {reveal && reveal.ok && (
                <div style={{ marginTop: '10px', padding: '12px', borderRadius: '10px', background: 'rgba(16,185,129,0.12)', border: '1px solid #10b98166', fontSize: '14px', fontWeight: 800, color: '#10b981' }}>
                  ✅ Tam isabet — üretim kanalı kalıcı öğrenmenin en güçlüsüdür!
                </div>
              )}
              <CyrillicPad
                onType={ch => !reveal && setTyped(t => t + ch)}
                onBackspace={() => !reveal && setTyped(t => t.slice(0, -1))}
                onSpace={() => !reveal && setTyped(t => t + ' ')}
                onEnter={() => submitTyping()}
              />
            </div>
          )}

          {reveal && (
            <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '12px', color: reveal.ok ? '#10b981' : '#ef4444', fontWeight: 900 }}>
              {reveal.ok ? '✅ Doğru!' : `❌ Yanlış — doğrusu: ${q.correct}`} · sonraki soru geliyor…
            </div>
          )}
        </div>

        <button onClick={stopExam} style={{ marginTop: '14px', width: '100%', padding: '11px', borderRadius: '10px', border: '1px solid #334155', background: 'transparent', color: '#64748b', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>Sınavdan Çık (puan kaydedilmez)</button>
      </div>
    );
  }

  // ================= SEVİYE SEÇİMİ =================
  const readiness = useMemo(() => EXAM_LEVELS.map(l => ({ def: l, ...examReadiness(l.id, completedUnits) })), [completedUnits]);
  const recent = attempts.slice(0, 6);
  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.12), #1e293b)', border: '1px solid #22d3ee55', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#22d3ee', letterSpacing: '0.5px' }}>📝 DENEME SINAVLARI — GERÇEK SINAV PROVASI{ultra ? ' · ⚡ULTRA MOD AÇIK (baraj %85)' : ''}</div>
        <div style={{ fontSize: '16px', fontWeight: 900, marginTop: '6px', lineHeight: 1.5 }}>
          Tamamladığın ünitelerden üretilen <b style={{ color: '#22d3ee' }}>7 bölümlü, süreli karma sınav</b>: şıklı tanıma/üretim/dinleme/bağlam/boşluk + 🔗 <b style={{ color: '#ec4899' }}>eşleştirme</b> + <b style={{ color: '#f59e0b' }}>⌨️ yazma</b>.
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', lineHeight: 1.6 }}>
          Her sorunun süresi var; süre dolan soru yanlış sayılır. Yanlışların hata kütüğüne ve zayıf nokta antrenmanına otomatik işlenir — deneme, eksiklerini bulmanın en hızlı yoludur.
        </div>
        <div style={{ marginTop: '10px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(16,185,129,0.08)', border: '1px solid #10b98144', fontSize: '12px', color: '#6ee7b7', lineHeight: 1.6 }}>
          🔓 <b>Yeni kural:</b> Bir seviyenin denemesi, o seviyenin <b>tüm üniteleri</b> bitmeden açılmaz (ör. B1 denemesi için B1'in hepsini bitir). Böylece her soru birebir senin ünitelerinin kelime, cümle ve diyaloglarından üretilir. 🌅 <b>Günlük deneme</b> her zaman açık ve öğrendiğin her şeyden hazırlanır.
        </div>
      </div>

      <div style={{ display: 'grid', gap: '10px', marginBottom: '18px' }}>
        {readiness.map(({ def, ready, units, words, doneUnits, totalUnits }) => {
          const best = bestAttemptFor(def.id, attempts);
          const isDaily = def.id === 'GUNLUK';
          const isGeneral = def.id === 'GENEL';
          const todayDone = isDaily && attempts.some(a => a.level === 'GUNLUK' && new Date(a.date).toDateString() === new Date().toDateString());
          return (
            <button key={def.id} disabled={!ready} onClick={() => startExam(def.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '15px 16px', borderRadius: '14px', border: `1px solid ${ready ? def.color + '77' : '#334155'}`, background: ready ? (isDaily ? 'linear-gradient(135deg, rgba(236,72,153,0.22), rgba(168,85,247,0.14), #1e293b)' : `linear-gradient(135deg, ${def.color}18, #1e293b)`) : '#151f33', cursor: ready ? 'pointer' : 'default', opacity: ready ? 1 : 0.55, textAlign: 'left', boxShadow: isDaily && ready ? '0 0 18px rgba(236,72,153,0.15)' : 'none' }}>
              <div style={{ fontSize: '28px' }}>{def.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 900, color: ready ? def.color : '#64748b', fontSize: '15px' }}>
                  {def.title}
                  {isDaily && todayDone && <span style={{ marginLeft: '8px', fontSize: '10px', color: '#10b981', background: 'rgba(16,185,129,0.12)', padding: '2px 8px', borderRadius: '999px', border: '1px solid #10b98166' }}>✅ bugünkü çözüldü — tekrar çözebilirsin</span>}
                  {isDaily && !todayDone && <span style={{ marginLeft: '8px', fontSize: '10px', color: '#ec4899', background: 'rgba(236,72,153,0.12)', padding: '2px 8px', borderRadius: '999px', border: '1px solid #ec489966' }}>⏰ gece yarısı yenilenir</span>}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                  {ready
                    ? isDaily
                      ? `Bugüne özel ${def.questionCount} soru — bitirdiğin ${units} ünitenin içeriğinden · baraj %${examPassPct(def)}${ultra ? ' ⚡' : ''}`
                      : `📚 SADECE ÜNİTELERİNDEN: ${units} ünitenin tamamı · ${words} kelime havuzu · ${def.questionCount} soru (şıklı + 🔗 eşleştirme + ⌨️ yazma) · baraj %${examPassPct(def)}${ultra ? ' ⚡' : ''}`
                    : isDaily
                      ? `Kilitli: önce en az 1 ünite bitir (${units} ünite / ${words} kelime)`
                      : `🔒 ${isGeneral ? 'TÜM müfredatı bitirmeden' : `${def.id} seviyesinin TÜM ünitelerini bitirmeden`} açılmaz — ${doneUnits}/${totalUnits} ünite · kalan ${Math.max(0, totalUnits - doneUnits)}`}
                </div>
              </div>
              {best && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800 }}>EN İYİ</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: best.percent >= examPassPct(def) ? '#10b981' : '#f59e0b' }}>%{best.percent}</div>
                </div>
              )}
              {ready && <div style={{ fontSize: '18px', color: def.color }}>▶</div>}
            </button>
          );
        })}
      </div>

      {recent.length > 0 && (
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '16px' }}>
          <div style={{ fontWeight: 900, fontSize: '13px', marginBottom: '10px', color: '#cbd5e1' }}>🗂️ Son Denemelerin</div>
          {recent.map(a => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 4px', borderBottom: '1px solid #0f172a', fontSize: '12px' }}>
              <span style={{ fontWeight: 900, color: EXAM_LEVELS.find(l => l.id === a.level)?.color || '#94a3b8', minWidth: '56px' }}>{a.level}</span>
              <span style={{ color: '#64748b' }}>{fmtDate(a.date)}</span>
              <span style={{ marginLeft: 'auto', fontWeight: 900, color: a.passed ? '#10b981' : '#ef4444' }}>%{a.percent} {a.passed ? '✅' : '❌'}{a.ultra ? ' ⚡' : ''}</span>
              <span style={{ color: '#475569' }}>{a.correct}/{a.total} · {Math.round(a.durationSec / 60)}dk</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MockExamScreen;
