import React, { useEffect, useMemo, useState } from 'react';
import { edgeSpeak } from '../tts/edgeTts';
import {
  buildDailyDrills, loadSpeechDay, markDrillDone,
} from '../speech/dailyDrills';
import type { SpeechDrill } from '../speech/dailyDrills';
import {
  isSpeechCoachAvailable, listenOnceRu, speechSimilarity, speedCharsPerSec, rateSpeed, SPEED_LABEL,
} from '../speech/speechCheck';
import { xpGain, isUltraMode } from '../ultra/ultraMode';

// ==========================================
// 🗣️ AĞIZ JİMNASTİĞİ — günlük konuşma ödevi
// Kelime EZBERİ ölçülmez: ölçülen şey AKICILIK (benzerlik) + TEMPO (harf/sn).
// Her gün 7 görev: kelime zincirleri ×3, tekerlemeler, cümle zincirleri ×2.
// Konuşma tanıma yoksa kendi kendini değerlendirme modu açılır.
// ==========================================

interface Props {
  completedUnits: string[];
  onXp: (n: number) => void;
  onRecordResult?: (ru: string, tr: string, ok: boolean) => void;
}

interface AttemptResult {
  transcript: string;
  similarity: number;   // 0-1
  cps: number;          // harf/sn
  passed: boolean;
  engine: 'voice' | 'self';
}

const cardBox: React.CSSProperties = { background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' };

const SpeechGym: React.FC<Props> = ({ completedUnits, onXp, onRecordResult }) => {
  const drills = useMemo(() => buildDailyDrills(completedUnits), [completedUnits]);
  const [dayState, setDayState] = useState(loadSpeechDay);
  const [idx, setIdx] = useState(() => {
    const first = drills.findIndex(d => !loadSpeechDay().done.includes(d.id));
    return first === -1 ? 0 : first;
  });
  const [listening, setListening] = useState(false);
  const [result, setResult] = useState<AttemptResult | null>(null);
  const [micMsg, setMicMsg] = useState<string | null>(null);
  const srOk = isSpeechCoachAvailable();

  const drill: SpeechDrill | undefined = drills[idx];
  const doneCount = drills.filter(d => dayState.done.includes(d.id)).length;
  const allDone = doneCount >= drills.length;
  const ultra = isUltraMode();

  // 🎁 Tüm ödev bittiğinde tek seferlik gün bonusu
  useEffect(() => {
    if (allDone && dayState.done.length === drills.length) {
      const bonusKey = `speech_bonus_${dayState.day}`;
      if (!localStorage.getItem(bonusKey)) {
        localStorage.setItem(bonusKey, '1');
        onXp(xpGain(40));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDone]);

  const completeDrill = (cps: number) => {
    if (!drill) return;
    setDayState(markDrillDone(drill.id, cps));
    onRecordResult?.(drill.base, drill.tr || '', true);
  };

  const speakModel = (rate: 'slow' | 'normal' | 'fast') => {
    if (!drill) return;
    const text = rate === 'fast' ? drill.target : rate === 'normal' ? drill.target : drill.base;
    void edgeSpeak(text, { prosodyRate: rate === 'slow' ? '-30%' : rate === 'fast' ? '+15%' : '+0%' });
  };

  const runVoiceAttempt = async () => {
    if (!drill || listening) return;
    setListening(true);
    setMicMsg(null);
    setResult(null);
    try {
      const att = await listenOnceRu();
      const sim = att.transcript ? speechSimilarity(att.transcript, drill.target) : 0;
      const cps = speedCharsPerSec(drill.target, att.durationMs);
      const threshold = drill.kind === 'twister' ? 0.55 : 0.6;
      const passed = sim >= threshold && att.transcript.length > 0;
      setResult({ transcript: att.transcript || '(boş)', similarity: sim, cps, passed, engine: 'voice' });
      if (passed) {
        const base = drill.kind === 'twister' ? 12 : 8;
        const rating = rateSpeed(cps);
        onXp(xpGain(base + (rating === 'lightning' ? 8 : rating === 'good' ? 4 : 0)));
        completeDrill(cps);
      }
    } catch (e) {
      const code = (e as Error).message;
      setMicMsg(code === 'no-speech'
        ? 'Ses algılanamadı — mikrofona yakın, net ve hızlı söyle.'
        : code === 'unsupported'
          ? 'Bu tarayıcı konuşma tanımayı desteklemiyor — aşağıdaki kendi kendini değerlendirme butonlarını kullan.'
          : 'Mikrofon açılamadı (izin/bağlantı). Kendi kendini değerlendirme modunu kullanabilirsin.');
    } finally {
      setListening(false);
    }
  };

  const runSelfCheck = (good: boolean) => {
    if (!drill) return;
    setResult({ transcript: '(kendi değerlendirmen)', similarity: good ? 0.8 : 0.3, cps: 0, passed: good, engine: 'self' });
    if (good) {
      onXp(xpGain(4));
      completeDrill(0);
    }
  };

  const goNext = () => {
    setResult(null);
    setMicMsg(null);
    const next = drills.findIndex((d, i) => i > idx && !dayState.done.includes(d.id));
    setIdx(next === -1 ? 0 : next);
  };

  // ================= ÖZET (ödev bitti) =================
  if (allDone && drills.length > 0) {
    return (
      <div style={{ ...cardBox, textAlign: 'center', border: '1px solid #10b98166', background: 'linear-gradient(135deg, rgba(16,185,129,0.14), #1e293b)' }}>
        <div style={{ fontSize: '46px' }}>🏆</div>
        <div style={{ fontSize: '22px', fontWeight: 900, margin: '8px 0' }}>Bugünkü ağız ödevi TAMAM!</div>
        <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
          {drills.length} görevin hepsi bitti — zincirler, tekerlemeler ve cümleler. Dilin yarın biraz daha Rusça olacak. 😄
          {dayState.bestCps > 0 && <> Günün hız rekoru: <b style={{ color: '#f59e0b' }}>{dayState.bestCps.toFixed(1)} harf/sn</b>.</>}
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '12px' }}>⏰ Yeni ödev gece yarısı yenilenir. İstersen serbest tekrar için görevlere tekrar girebilirsin:</div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
          {drills.map((d, i) => (
            <button key={d.id} onClick={() => { setIdx(i); setResult(null); }}
              style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #10b98166', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontWeight: 800, fontSize: '11px', cursor: 'pointer' }}>
              {i + 1}. {d.kind === 'twister' ? '🌀' : d.kind === 'chain' ? '🔗' : '💬'}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!drill) return null;
  const isDone = dayState.done.includes(drill.id);

  return (
    <div>
      {/* Başlık + ilerleme */}
      <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.14), rgba(56,189,248,0.1), #1e293b)', border: '1px solid #10b98155', borderRadius: '16px', padding: '16px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '26px' }}>🗣️</div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#10b981', letterSpacing: '0.5px' }}>
              GÜNLÜK AĞIZ ÖDEVİ {ultra ? '· ⚡ ULTRA XP ×1.5' : ''}
            </div>
            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '3px', lineHeight: 1.5 }}>
              Bu kelimeleri <b>ezberlemek zorunda değilsin</b> — amaç <b style={{ color: '#10b981' }}>hızlı ve akıcı söylemek</b>: ağız kas hafızası!
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#10b981' }}>{doneCount}/{drills.length}</div>
            <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 800 }}>görev{dayState.bestCps > 0 ? ` · rek: ${dayState.bestCps.toFixed(1)} h/sn` : ''}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
          {drills.map((d, i) => (
            <button key={d.id} onClick={() => { setIdx(i); setResult(null); setMicMsg(null); }}
              title={d.title}
              style={{ flex: 1, height: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: dayState.done.includes(d.id) ? '#10b981' : i === idx ? '#38bdf8' : '#0f172a' }} />
          ))}
        </div>
      </div>

      {/* Görev kartı */}
      <div style={cardBox}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, color: drill.kind === 'twister' ? '#f59e0b' : drill.kind === 'chain' ? '#38bdf8' : '#a78bfa', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '4px 10px' }}>
            {drill.title} · GÖREV {idx + 1}/{drills.length}
          </span>
          {isDone && <span style={{ fontSize: '11px', fontWeight: 900, color: '#10b981' }}>✅ TAMAM (tekrar serbest)</span>}
        </div>

        <div style={{ textAlign: 'center', padding: '14px 6px', background: '#0f172a', borderRadius: '14px', border: '1px solid #334155' }}>
          <div style={{ fontSize: drill.target.length > 40 ? '19px' : '24px', fontWeight: 900, lineHeight: 1.5 }}>{drill.target}</div>
          {drill.reading && <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '8px' }}>[{drill.reading}]</div>}
          {drill.tr && <div style={{ fontSize: '12px', color: '#475569', marginTop: '6px' }}>{drill.tr} <span style={{ color: '#334155' }}>(anlamını bilmek şart değil)</span></div>}
        </div>
        {drill.tip && <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px', lineHeight: 1.5 }}>💡 {drill.tip}</div>}

        {/* Model sesler */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => speakModel('slow')} style={{ flex: 1, minWidth: '100px', padding: '12px', borderRadius: '12px', border: '1px solid #334155', background: '#0f172a', color: '#cbd5e1', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>🐢 Model (yavaş)</button>
          <button onClick={() => speakModel('normal')} style={{ flex: 1, minWidth: '100px', padding: '12px', borderRadius: '12px', border: '1px solid #38bdf866', background: 'rgba(56,189,248,0.12)', color: '#7dd3fc', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>🎵 Model (normal)</button>
          <button onClick={() => speakModel('fast')} style={{ flex: 1, minWidth: '100px', padding: '12px', borderRadius: '12px', border: '1px solid #f59e0b66', background: 'rgba(245,158,11,0.1)', color: '#fbbf24', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>⚡ Model (hedef hız)</button>
        </div>

        {/* 🎤 Konuşma denemesi */}
        {srOk && !result && (
          <button onClick={runVoiceAttempt} disabled={listening}
            style={{ width: '100%', marginTop: '12px', padding: '16px', borderRadius: '12px', border: 'none',
              background: listening ? '#334155' : 'linear-gradient(135deg, #10b981, #059669)', color: '#06281c', fontWeight: 900, fontSize: '16px', cursor: listening ? 'default' : 'pointer',
              boxShadow: listening ? 'none' : '0 6px 18px rgba(16,185,129,0.35)' }}>
            {listening ? '🎤 Dinliyorum… ŞİMDİ SÖYLE!' : '🎤 Bas ve hızlıca söyle'}
          </button>
        )}
        {micMsg && (
          <div style={{ marginTop: '10px', padding: '12px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid #ef444466', fontSize: '13px', color: '#fca5a5', fontWeight: 700 }}>{micMsg}</div>
        )}

        {/* Sonuç kartı */}
        {result && (
          <div style={{ marginTop: '12px', padding: '16px', borderRadius: '14px', background: result.passed ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', border: `1px solid ${result.passed ? '#10b98166' : '#ef444466'}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '30px' }}>{result.passed ? (result.cps >= 4.2 ? '🚀' : '✅') : '🔁'}</div>
              <div style={{ flex: 1, minWidth: '180px' }}>
                <div style={{ fontWeight: 900, color: result.passed ? '#10b981' : '#ef4444' }}>
                  {result.passed ? 'Görev tamam!' : 'Bir tur daha — ağız ısınıyor, bu iyi şey!'}
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', lineHeight: 1.6 }}>
                  Anlaşılırlık: <b style={{ color: result.similarity >= 0.6 ? '#10b981' : '#f59e0b' }}>%{Math.round(result.similarity * 100)}</b>
                  {result.engine === 'voice' && <> · Hız: <b style={{ color: '#f59e0b' }}>{result.cps.toFixed(1)} harf/sn</b> — {SPEED_LABEL[rateSpeed(result.cps)]}</>}
                </div>
                {result.engine === 'voice' && result.transcript !== '(boş)' && (
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '6px' }}>🎧 Duyulan: “{result.transcript}”</div>
                )}
              </div>
              <button onClick={goNext} style={{ padding: '12px 16px', borderRadius: '12px', border: 'none', background: result.passed ? '#10b981' : '#334155', color: result.passed ? '#06281c' : '#cbd5e1', fontWeight: 900, cursor: 'pointer', fontSize: '13px' }}>
                {result.passed ? 'Sonraki görev →' : '↺ Tekrar dene'}
              </button>
            </div>
            {!result.passed && result.engine === 'voice' && (
              <button onClick={runVoiceAttempt} style={{ marginTop: '10px', width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #10b98166', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>🎤 Şimdi tekrar söyle</button>
            )}
          </div>
        )}

        {/* Kendi kendini değerlendirme (SR yoksa / izin yoksa) */}
        {(!srOk || micMsg) && !result && (
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', marginBottom: '8px' }}>🎤 Konuşma tanıma kapalı — modeli dinleyip kendini değerlendir:</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => runSelfCheck(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #ef444466', background: 'rgba(239,68,68,0.1)', color: '#fca5a5', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}>😣 Zorlandım</button>
              <button onClick={() => runSelfCheck(true)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#10b981', color: '#06281c', fontWeight: 900, cursor: 'pointer', fontSize: '13px' }}>⚡ Hızlı söyledim!</button>
            </div>
          </div>
        )}

        {/* Navigasyon */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
          <button onClick={() => { setIdx(i => (i - 1 + drills.length) % drills.length); setResult(null); setMicMsg(null); }}
            style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}>← Önceki görev</button>
          <button onClick={goNext}
            style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}>Sonraki görev →</button>
        </div>
      </div>

      {/* Açıklama */}
      <div style={{ marginTop: '12px', padding: '14px', borderRadius: '14px', background: '#0f172a', border: '1px solid #334155', fontSize: '12px', color: '#64748b', lineHeight: 1.7 }}>
        🧠 <b style={{ color: '#94a3b8' }}>Neden hız odaklı?</b> Ağız alışkanlığı (motor öğrenme) kelime ezberinden ayrı bir kastır: dilin Rusça ses kümelerine (стр-, здр-, вств-, щ, ы) alışması için
        aynı diziyi <b>hızlı ve tekrarlı</b> söylemek gerekir. Ödev kelimeleri zaten gördüğün ünitelerden gelir — yeni ezber YOK, sadece tempo var. Her gece yarısı görevler yenilenir.
      </div>
    </div>
  );
};

export default SpeechGym;
