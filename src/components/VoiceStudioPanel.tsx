import { useState } from 'react';
import { BOT_VOICE_PROFILES, getBotVoiceProfile, setBotVoiceProfile, speakWithBotVoice } from '../tts/voiceStudio';

export default function VoiceStudioPanel() {
  const [selectedId, setSelectedId] = useState(() => getBotVoiceProfile().id);
  const [playing, setPlaying] = useState(false);

  const preview = async (id: string) => {
    const profile = setBotVoiceProfile(id);
    setSelectedId(profile.id);
    setPlaying(true);
    try {
      await speakWithBotVoice('Merhaba! Ben senin Rusça öğrenme ajanınım. Nerede kaldığını biliyorum ve sorularını birlikte çözeceğiz.', 1);
    } finally {
      setPlaying(false);
    }
  };

  return (
    <section style={{ marginTop: '14px', padding: '16px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(168,85,247,.14), rgba(56,189,248,.08), #0f172a)', border: '1px solid rgba(168,85,247,.48)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: '#d8b4fe', fontSize: '11px', fontWeight: 950, letterSpacing: '.5px' }}>🎚️ VOICESTUDIO SES PALETİ</div>
          <h3 style={{ margin: '5px 0 4px', color: '#f8fafc' }}>Edge/Google yerine farklı AI bot sesi</h3>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '12px', lineHeight: 1.55, maxWidth: '620px' }}>
            Ses seçimi kalıcıdır. Önce anahtarsız Puter AI Speechify/ElevenLabs profili denenir; servis yanıt vermezse koç sessiz kalmaz ve mevcut güvenli ses yedeğine geçer.
          </p>
        </div>
        <span style={{ color: '#86efac', fontSize: '11px', fontWeight: 900, padding: '6px 9px', borderRadius: '999px', background: 'rgba(34,197,94,.12)', border: '1px solid rgba(34,197,94,.35)' }}>🔐 API anahtarı yok</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginTop: '14px' }}>
        {BOT_VOICE_PROFILES.map(profile => {
          const active = selectedId === profile.id;
          return (
            <button
              key={profile.id}
              onClick={() => void preview(profile.id)}
              disabled={playing}
              style={{ textAlign: 'left', padding: '11px', borderRadius: '13px', cursor: playing ? 'wait' : 'pointer', color: '#f8fafc', background: active ? 'rgba(56,189,248,.18)' : 'rgba(15,23,42,.8)', border: `1px solid ${active ? '#38bdf8' : '#334155'}`, opacity: playing && !active ? .65 : 1 }}
            >
              <div style={{ fontWeight: 950, fontSize: '13px' }}>{profile.emoji} {profile.label} {active ? '✓' : ''}</div>
              <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px', lineHeight: 1.35 }}>{profile.description}</div>
              <div style={{ color: '#64748b', fontSize: '10px', marginTop: '6px' }}>{playing && active ? '▶️ Önizleme çalıyor…' : 'Dinlemek için seç'}</div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: '10px', color: '#64748b', fontSize: '11px', lineHeight: 1.45 }}>
        Not: VoiceStudio’nun tam yerel ses klonlama motoru masaüstü/GPU gerektirir. Bu web uygulamasında hızlı kurulum için aynı fikrin ücretsiz çevrim içi, çok sesli profilleri kullanılıyor; ses klonlama sadece açık rıza ile yapılmalıdır.
      </div>
    </section>
  );
}
