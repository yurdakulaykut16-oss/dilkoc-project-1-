// ============================================================================
// 📊 İSTATİSTİK MERKEZİ — lig kartı, günlük hedef halkası, 14 günlük XP
// grafiği, 12 başarı rozeti ve ilerleme yedekleme (dışa/içe aktarma).
// Üst bardaki 📊 butonuyla açılır.
// ============================================================================

import { useMemo, useRef, useState } from 'react';
import {
  DAILY_GOAL_XP, computeBadges, effectiveStreak, exportProgress, importProgress,
  last14Days, leagueForXp, loadStats, xpToday, type BadgeInput,
} from '../statsStore';

interface Props {
  xp: number;
  gems: number;
  completedAlpha: number;
  completedUnits: number;
  completedTopics: number;
  completedGrammar: number;
  completedStories: number;
  srsCount: number;
  mistakesCount: number;
  onBack: () => void;
}

const box: React.CSSProperties = {
  background: '#1e293b', borderRadius: '16px', padding: '20px',
  border: '1px solid #334155', marginBottom: '16px',
};

export default function ProfileStats(p: Props) {
  const stats = useMemo(() => loadStats(), []);
  const streak = effectiveStreak(stats);
  const today = xpToday(stats);
  const goalPct = Math.min(1, today / DAILY_GOAL_XP);
  const { league, next, progress } = leagueForXp(p.xp);
  const days = last14Days(stats);
  const maxDay = Math.max(DAILY_GOAL_XP, ...days.map(d => d.xp));
  const fileRef = useRef<HTMLInputElement>(null);
  const [importMsg, setImportMsg] = useState<string | null>(null);

  const badgeInput: BadgeInput = {
    xp: p.xp, stats,
    completedAlpha: p.completedAlpha, completedUnits: p.completedUnits,
    completedTopics: p.completedTopics, completedGrammar: p.completedGrammar,
    completedStories: p.completedStories, srsCount: p.srsCount,
    fixedMistakes: p.mistakesCount === 0 && p.completedUnits >= 1,
  };
  const badges = computeBadges(badgeInput);
  const earned = badges.filter(b => b.earned).length;

  const doExport = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rusca-akademisi-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const doImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const ok = importProgress(String(reader.result || ''));
      if (ok) {
        setImportMsg('✅ Yedek yüklendi! Uygulama yeniden başlatılıyor...');
        setTimeout(() => window.location.reload(), 900);
      } else {
        setImportMsg('❌ Bu dosya geçerli bir Rusça Akademisi yedeği değil.');
      }
    };
    reader.readAsText(file);
  };

  // Günlük hedef halkası (SVG)
  const R = 34, C = 2 * Math.PI * R;

  return (
    <div>
      <button onClick={p.onBack} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontWeight: 800, cursor: 'pointer', marginBottom: '12px' }}>← Haritaya dön</button>

      {/* LİG + GÜNLÜK HEDEF */}
      <div style={{ ...box, display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', border: `1px solid ${league.color}66`, background: `linear-gradient(135deg, ${league.color}1f, #1e293b)` }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '44px' }}>{league.icon}</div>
          <div style={{ fontWeight: 900, color: league.color, fontSize: '18px' }}>{league.name} Ligi</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
            {next ? `${next.name} için ${next.min - p.xp} XP kaldı` : 'Zirvedesin! 👑'}
          </div>
          {next && (
            <div style={{ background: '#0f172a', height: '8px', borderRadius: '4px', marginTop: '6px', width: '160px' }}>
              <div style={{ background: league.color, height: '100%', borderRadius: '4px', width: `${Math.round(progress * 100)}%` }} />
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginLeft: 'auto' }}>
          <svg width="84" height="84" viewBox="0 0 84 84">
            <circle cx="42" cy="42" r={R} fill="none" stroke="#0f172a" strokeWidth="9" />
            <circle cx="42" cy="42" r={R} fill="none" stroke={goalPct >= 1 ? '#22c55e' : '#f59e0b'} strokeWidth="9"
              strokeDasharray={`${C * goalPct} ${C}`} strokeLinecap="round" transform="rotate(-90 42 42)" />
            <text x="42" y="39" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="900">{today}</text>
            <text x="42" y="54" textAnchor="middle" fill="#94a3b8" fontSize="10">/ {DAILY_GOAL_XP} XP</text>
          </svg>
          <div style={{ fontSize: '12px', fontWeight: 800, color: goalPct >= 1 ? '#22c55e' : '#f59e0b' }}>
            {goalPct >= 1 ? '🎯 Günlük hedef tamam!' : 'Günlük hedef'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', width: '100%', flexWrap: 'wrap' }}>
          {[
            { icon: '🔥', label: 'Seri', val: `${streak} gün` },
            { icon: '🏆', label: 'En iyi seri', val: `${stats.bestStreak} gün` },
            { icon: '⚡', label: 'Toplam XP', val: `${p.xp}` },
            { icon: '💎', label: 'Elmas', val: `${p.gems}` },
            { icon: '📅', label: 'SRS kelime', val: `${p.srsCount}` },
            { icon: '⚡', label: 'Kurtarma', val: `${stats.rescuePassed} geçiş` },
          ].map((s, i) => (
            <div key={i} style={{ background: '#0f172a', borderRadius: '10px', padding: '8px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '16px' }}>{s.icon}</div>
              <div style={{ fontWeight: 900, fontSize: '14px' }}>{s.val}</div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 14 GÜNLÜK XP GRAFİĞİ */}
      <div style={box}>
        <div style={{ fontWeight: 900, marginBottom: '12px' }}>📈 Son 14 Gün — Günlük XP</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '110px' }}>
          {days.map((d, i) => {
            const h = Math.max(3, Math.round((d.xp / maxDay) * 100));
            const isToday = i === days.length - 1;
            return (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }} title={`${d.day}: ${d.xp} XP`}>
                <div style={{ fontSize: '9px', color: '#94a3b8' }}>{d.xp > 0 ? d.xp : ''}</div>
                <div style={{
                  width: '100%', height: `${h}px`, borderRadius: '4px 4px 0 0',
                  background: d.xp >= DAILY_GOAL_XP ? '#22c55e' : isToday ? '#f59e0b' : '#3b82f6',
                  opacity: d.xp === 0 ? 0.25 : 1,
                }} />
                <div style={{ fontSize: '9px', color: isToday ? '#f59e0b' : '#64748b', fontWeight: isToday ? 900 : 400 }}>{d.label}</div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>🟩 hedef dolu gün • 🟦 çalışılan gün • bugün turuncu</div>
      </div>

      {/* ROZETLER */}
      <div style={box}>
        <div style={{ fontWeight: 900, marginBottom: '12px' }}>🏅 Rozetler — {earned}/{badges.length}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
          {badges.map(b => (
            <div key={b.id} style={{
              background: b.earned ? 'linear-gradient(135deg, rgba(245,158,11,0.16), #0f172a)' : '#0f172a',
              border: `1px solid ${b.earned ? '#f59e0b88' : '#1e293b'}`,
              borderRadius: '12px', padding: '12px', textAlign: 'center',
              opacity: b.earned ? 1 : 0.45,
            }}>
              <div style={{ fontSize: '26px', filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.icon}</div>
              <div style={{ fontWeight: 900, fontSize: '13px', marginTop: '4px' }}>{b.title}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* YEDEKLEME */}
      <div style={box}>
        <div style={{ fontWeight: 900, marginBottom: '6px' }}>💾 İlerleme Yedeği</div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
          Tüm ilerlemeni (XP, üniteler, SRS bankası, hata kütüğü, seri ve ses tercihleri) tek bir JSON dosyasına
          kaydet; başka bir cihazda ya da tarayıcı verisi silindiğinde geri yükle.
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={doExport} style={{ padding: '12px 18px', borderRadius: '10px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>
            ⬇️ Yedeği indir
          </button>
          <button onClick={() => fileRef.current?.click()} style={{ padding: '12px 18px', borderRadius: '10px', border: '1px solid #334155', background: '#0f172a', color: '#e2e8f0', fontWeight: 800, cursor: 'pointer' }}>
            ⬆️ Yedekten geri yükle
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) doImport(f); e.target.value = ''; }} />
        </div>
        {importMsg && <div style={{ marginTop: '10px', fontWeight: 800, fontSize: '13px', color: importMsg.startsWith('✅') ? '#22c55e' : '#ef4444' }}>{importMsg}</div>}
      </div>
    </div>
  );
}
