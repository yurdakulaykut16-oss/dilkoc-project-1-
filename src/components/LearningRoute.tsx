import { useEffect, useState } from 'react';
import { LEARNER_EVENT, buildLearningRoute, skillSummary } from '../learnerModel';
import type { RouteStep } from '../learnerModel';
import { RU_VOICES, TR_VOICES, getVoicePrefs, setVoicePrefs, speakRussian, speakTurkish } from '../tts/edgeTts';
import type { RescueTarget } from './WordGraph3D';

interface Props {
  errorStats: Record<string, { count: number; tr: string; last: number }>;
  onOpenGrammar: (grammarUnitId: string) => void;
  onStartRescue: (t: RescueTarget) => void;
  onOpenShorts: () => void;
}

const statusColor = { strong: '#10b981', mid: '#f59e0b', weak: '#ef4444', unknown: '#475569' } as const;
const statusLabel = { strong: 'sağlam', mid: 'orta', weak: 'ZAYIF', unknown: 'veri yok' } as const;

export default function LearningRoute({ errorStats, onOpenGrammar, onStartRescue, onOpenShorts }: Props) {
  const [, force] = useState(0);
  const [voices, setVoices] = useState(getVoicePrefs());

  useEffect(() => {
    const h = () => force(x => x + 1);
    window.addEventListener(LEARNER_EVENT, h);
    return () => window.removeEventListener(LEARNER_EVENT, h);
  }, []);

  const rows = skillSummary();
  const tenses = rows.filter(r => r.group === 'zaman');
  const preps = rows.filter(r => r.group === 'edat' && r.total > 0);
  const route = buildLearningRoute(errorStats);
  const solved = rows.reduce((a, r) => a + r.total, 0);

  const runStep = (s: RouteStep) => {
    if (s.action.type === 'grammar') onOpenGrammar(s.action.grammarUnitId);
    else if (s.action.type === 'rescue') onStartRescue({ kind: 'skill', skillKey: s.action.skillKey, label: s.title.split('—')[0].trim() });
    else if (s.action.type === 'rescueWord') onStartRescue({ kind: 'word', ru: s.action.ru, tr: s.action.tr, label: `«${s.action.ru}»` });
    else onOpenShorts();
  };

  const bar = (r: { accuracy: number; total: number; status: keyof typeof statusColor }) => (
    <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', marginTop: '5px', overflow: 'hidden' }}>
      <div style={{ width: `${r.total === 0 ? 0 : Math.max(4, r.accuracy)}%`, height: '100%', background: statusColor[r.status], borderRadius: '4px', transition: 'width 0.4s' }} />
    </div>
  );

  return (
    <div>
      <h2 style={{ margin: '0 0 4px' }}>🧭 Kişisel Öğrenim Rotan</h2>
      <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: 0 }}>
        Bugüne kadar zaman/edat ölçen <b style={{ color: '#38bdf8' }}>{solved} soru</b> çözdün. Aşağıdaki harita bu cevaplardan
        <b> otomatik</b> çıkarıldı: hangi zamanda ve hangi edatta zayıfsan rota oradan başlıyor.
      </p>

      <div style={{ background: '#0f172a', border: '1px solid #eab30855', borderRadius: '14px', padding: '16px', marginBottom: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#eab308', marginBottom: '10px' }}>⏳ ZAMANLAR (TENSES) HARİTASI</div>
        {tenses.map(r => (
          <div key={r.key} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', gap: '8px' }}>
              <span style={{ fontWeight: 800 }}>{r.label}</span>
              <span style={{ color: statusColor[r.status], fontWeight: 900 }}>
                {r.total === 0 ? 'henüz soru çözülmedi' : `%${r.accuracy} • ${r.correct}✓ ${r.wrong}✗ • ${statusLabel[r.status]}`}
              </span>
            </div>
            {bar(r)}
          </div>
        ))}
      </div>

      <div style={{ background: '#0f172a', border: '1px solid #f472b655', borderRadius: '14px', padding: '16px', marginBottom: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#f472b6', marginBottom: '10px' }}>📍 EDATLAR (PREPOSITIONS) HARİTASI</div>
        {preps.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>Henüz edat içeren soru çözmedin — cümle kurma alıştırmaları ve gramer üniteleri çözdükçe her edat burada ayrı ayrı puanlanacak.</p>
        ) : preps.map(r => (
          <div key={r.key} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', gap: '8px' }}>
              <span style={{ fontWeight: 800 }}>{r.label}</span>
              <span style={{ color: statusColor[r.status], fontWeight: 900 }}>%{r.accuracy} • {r.correct}✓ {r.wrong}✗ • {statusLabel[r.status]}</span>
            </div>
            {bar(r)}
          </div>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.12), #0f172a)', border: '1px solid #38bdf8', borderRadius: '14px', padding: '16px', marginBottom: '14px' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#38bdf8', marginBottom: '10px' }}>🗺️ SANA ÖZEL ROTA — sırayla ilerle</div>
        {route.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            Rota oluşturmak için henüz yeterli veri yok. Üniteleri, cümle kurma alıştırmalarını ve gramer testlerini çözdükçe rota kendini burada yazacak. 💪
          </p>
        ) : route.map((s, i) => (
          <div key={s.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#0b1226', border: `1px solid ${s.severity === 'high' ? '#ef444488' : s.severity === 'mid' ? '#f59e0b66' : '#334155'}`, borderRadius: '12px', padding: '12px', marginBottom: '8px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0, display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: '13px', background: s.severity === 'high' ? '#ef4444' : s.severity === 'mid' ? '#f59e0b' : '#334155', color: '#0f172a' }}>{i + 1}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: '14px' }}>{s.icon} {s.title}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{s.why}</div>
            </div>
            <button onClick={() => runStep(s)} style={{ flexShrink: 0, background: '#38bdf8', border: 'none', color: '#07111f', padding: '10px 14px', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', fontSize: '12px' }}>
              {s.action.type === 'grammar' ? '📖 Çalış' : s.action.type === 'shorts' ? '🎬 İzle' : '⚡ Test'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '14px', padding: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: 900, color: '#a78bfa', marginBottom: '4px' }}>🎙️ SES AYARLARI — Microsoft Edge TTS</div>
        <p style={{ color: '#64748b', fontSize: '12px', marginTop: 0 }}>Rusça içerikler Rus nöral sesle, botun Türkçe konuşmaları Türk nöral sesle okunur.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#cbd5e1', marginBottom: '6px' }}>🇷🇺 Rusça ses</div>
            {RU_VOICES.map(v => (
              <label key={v.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '6px', cursor: 'pointer' }}>
                <input type="radio" name="ruVoice" checked={voices.ru === v.id} onChange={() => { setVoicePrefs({ ru: v.id }); setVoices(getVoicePrefs()); void speakRussian('Привет! Я твой голос для русского языка.', {}); }} />
                <span><b>{v.label}</b> <span style={{ color: '#64748b' }}>({v.id})</span></span>
              </label>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#cbd5e1', marginBottom: '6px' }}>🇹🇷 Türkçe ses (bot/koç)</div>
            {TR_VOICES.map(v => (
              <label key={v.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', marginBottom: '6px', cursor: 'pointer' }}>
                <input type="radio" name="trVoice" checked={voices.tr === v.id} onChange={() => { setVoicePrefs({ tr: v.id }); setVoices(getVoicePrefs()); void speakTurkish('Merhaba! Türkçe açıklamaları artık ben okuyacağım.', {}); }} />
                <span><b>{v.label}</b> <span style={{ color: '#64748b' }}>({v.id})</span></span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
