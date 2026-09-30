import { useEffect, useState } from 'react';
import { BOT_VOICE_PROFILES, getBotVoiceProfile, setBotVoiceProfile, speakWithBotVoice } from '../tts/voiceStudio';
import type { BotVoiceProfile } from '../tts/voiceStudio';
import { listLocalVoiceStudioVoices, previewLocalVoiceStudioAudio, voiceStudioIsAvailable } from '../tts/voiceStudioLocal';
import type { LocalVoiceStudioVoice } from '../tts/voiceStudioLocal';

const BUNDLED_VOICESTUDIO_VOICES: LocalVoiceStudioVoice[] = [
  { voice_id: 'demo0001', name: 'VoiceStudio Demo Voice', type: 'profile', language: 'English', description: 'VoiceStudio ile birlikte gelen yerel demo sesi', preview_url: '/dilkoc-voices/demo_voice.wav' },
  { voice_id: 'audiobook_uk_narrator', name: 'The Librarian', type: 'voice_design', language: 'English', description: 'Sıcak İngiliz aksanlı kitap anlatıcısı', instruct: 'female, middle-aged, low pitch, british accent', preview_url: '/dilkoc-voices/demo_voice_design_audiobook_uk_narrator.wav' },
  { voice_id: 'us_news_anchor', name: 'The Anchor', type: 'voice_design', language: 'English', description: 'Net Amerikan haber spikeri', instruct: 'male, middle-aged, moderate pitch, american accent', preview_url: '/dilkoc-voices/demo_voice_design_us_news_anchor.wav' },
  { voice_id: 'indian_support_agent', name: 'The Helpdesk', type: 'voice_design', language: 'English', description: 'Sabırlı müşteri destek sesi', instruct: 'female, young adult, moderate pitch, indian accent', preview_url: '/dilkoc-voices/demo_voice_design_indian_support_agent.wav' },
  { voice_id: 'gravelly_villain', name: 'Captain Crusty', type: 'voice_design', language: 'English', description: 'Kalın, çizgi film karakteri sesi', instruct: 'male, elderly, very low pitch', preview_url: '/dilkoc-voices/demo_voice_design_gravelly_villain.wav' },
  { voice_id: 'aussie_podcaster', name: 'The Podcaster', type: 'voice_design', language: 'English', description: 'Enerjik Avustralya aksanlı podcast sesi', instruct: 'female, young adult, high pitch, australian accent', preview_url: '/dilkoc-voices/demo_voice_design_aussie_podcaster.wav' },
  { voice_id: 'bedtime_storyteller', name: 'Junior Quacks', type: 'voice_design', language: 'English', description: 'Çizgi film tarzı hikâye sesi', instruct: 'young adult, high pitch', preview_url: '/dilkoc-voices/demo_voice_design_bedtime_storyteller.wav' },
  { voice_id: 'mandarin_sichuan', name: 'The Sichuan Friend', type: 'voice_design', language: 'Chinese', description: 'VoiceStudio Sichuan Çincesi demo sesi', instruct: 'female, young adult, moderate pitch, 四川话', preview_url: '/dilkoc-voices/demo_voice_design_mandarin_sichuan.wav' },
];

function localProfile(voice: LocalVoiceStudioVoice): BotVoiceProfile {
  return {
    id: `voicestudio:${voice.voice_id}`,
    provider: 'voicestudio',
    voice: voice.voice_id,
    model: 'omnivoice',
    label: `VoiceStudio • ${voice.name}`,
    description: voice.description || (voice.type === 'profile' ? 'Bilgisayarındaki clone/design profili' : 'Yerel VoiceStudio sesi'),
    emoji: voice.type === 'voice_design' ? '🎭' : '🎛️',
    previewUrl: voice.preview_url,
    instruct: voice.instruct,
  };
}

export default function VoiceStudioPanel() {
  const [selectedId, setSelectedId] = useState(() => getBotVoiceProfile().id);
  const [playing, setPlaying] = useState(false);
  const [localVoices, setLocalVoices] = useState<LocalVoiceStudioVoice[]>([]);
  const [localStatus, setLocalStatus] = useState<'checking' | 'available' | 'offline'>('checking');

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const retry = () => {
      if (!disposed) retryTimer = setTimeout(() => void check(), 1500);
    };
    const check = async () => {
      if (disposed) return;
      const available = await voiceStudioIsAvailable(controller.signal);
      if (!available) {
        if (!disposed) setLocalStatus('offline');
        retry();
        return;
      }
      try {
        const voices = await listLocalVoiceStudioVoices(controller.signal);
        if (disposed) return;
        setLocalVoices(voices);
        setLocalStatus('available');
      } catch {
        if (!disposed) setLocalStatus('offline');
        retry();
      }
    };

    void check();
    return () => {
      disposed = true;
      controller.abort();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  const preview = async (profile: BotVoiceProfile) => {
    setBotVoiceProfile(profile);
    setSelectedId(profile.id);
    setPlaying(true);
    try {
      if (profile.provider === 'voicestudio') {
        // VoiceStudio repo'sundan projeye gömülen gerçek demo/design WAV'ını
        // çal. Böylece model indirme/TLS beklenirken Edge'e yönlenmez.
        const previewUrl = profile.previewUrl
          || `/voicestudio/profiles/${encodeURIComponent(profile.voice)}/audio`;
        const played = await previewLocalVoiceStudioAudio(previewUrl);
        if (!played) console.warn('VoiceStudio yerel önizleme dosyası oynatılamadı');
        return;
      }
      // Cloud kartları da yalnızca seçilen Puter provider'ını dener; başarısız
      // olursa sessiz kalır, Edge/browser sesine gizlice geçmez.
      await speakWithBotVoice('Merhaba! Ben senin Rusça öğrenme ajanınım.', 1);
    } finally {
      setPlaying(false);
    }
  };

  const bundledIds = new Set(BUNDLED_VOICESTUDIO_VOICES.map(voice => voice.voice_id));
  const localProfiles = [
    ...BUNDLED_VOICESTUDIO_VOICES.map(localProfile),
    ...localVoices.filter(voice => !bundledIds.has(voice.voice_id)).map(localProfile),
  ];
  const cloudProfiles = BOT_VOICE_PROFILES.slice(1);

  const card = (profile: BotVoiceProfile) => {
    const active = selectedId === profile.id;
    return (
      <button
        key={profile.id}
        onClick={() => void preview(profile)}
        disabled={playing}
        style={{ textAlign: 'left', padding: '11px', borderRadius: '13px', cursor: playing ? 'wait' : 'pointer', color: '#f8fafc', background: active ? 'rgba(56,189,248,.18)' : 'rgba(15,23,42,.8)', border: `1px solid ${active ? '#38bdf8' : '#334155'}`, opacity: playing && !active ? .65 : 1 }}
      >
        <div style={{ fontWeight: 950, fontSize: '13px' }}>{profile.emoji} {profile.label} {active ? '✓' : ''}</div>
        <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px', lineHeight: 1.35 }}>{profile.description}</div>
        <div style={{ color: '#64748b', fontSize: '10px', marginTop: '6px' }}>{playing && active ? '▶️ Önizleme çalıyor…' : 'Seç ve önizle'}</div>
      </button>
    );
  };

  return (
    <section style={{ marginTop: '14px', padding: '16px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(168,85,247,.14), rgba(56,189,248,.08), #0f172a)', border: '1px solid rgba(168,85,247,.48)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: '#d8b4fe', fontSize: '11px', fontWeight: 950, letterSpacing: '.5px' }}>🎚️ VOICESTUDIO SES PALETİ</div>
          <h3 style={{ margin: '5px 0 4px', color: '#f8fafc' }}>Gerçek yerel VoiceStudio motorunu kullan</h3>
          <p style={{ margin: 0, color: '#cbd5e1', fontSize: '12px', lineHeight: 1.55, maxWidth: '650px' }}>
            VoiceStudio açıkken ses doğrudan bilgisayarındaki <b>/v1/audio/speech</b> API'sinden, seçtiğin clone/design profil ile üretilir. Yerel servis kapalıysa anahtarsız Puter ses profilleri yedek olarak kullanılabilir.
          </p>
        </div>
        <span style={{ color: localStatus === 'available' ? '#86efac' : '#fbbf24', fontSize: '11px', fontWeight: 900, padding: '6px 9px', borderRadius: '999px', background: localStatus === 'available' ? 'rgba(34,197,94,.12)' : 'rgba(245,158,11,.12)', border: `1px solid ${localStatus === 'available' ? 'rgba(34,197,94,.35)' : 'rgba(245,158,11,.35)'}` }}>
          {localStatus === 'checking' ? '⏳ VoiceStudio aranıyor…' : localStatus === 'available' ? `✅ Yerel bağlı • ${BUNDLED_VOICESTUDIO_VOICES.length + localVoices.filter(voice => !BUNDLED_VOICESTUDIO_VOICES.some(item => item.voice_id === voice.voice_id)).length} gömülü/yerel ses` : '⚠️ Yerel servis kapalı'}
        </span>
      </div>

      <div style={{ marginTop: '14px', color: '#7dd3fc', fontSize: '11px', fontWeight: 950 }}>🧠 YEREL VOICESTUDIO PROFİLLERİ</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginTop: '7px' }}>
        {localProfiles.map(card)}
      </div>
      {localStatus === 'offline' && <div style={{ marginTop: '8px', color: '#fbbf24', fontSize: '11px' }}>VoiceStudio’yu 3900 portunda başlatınca bu kart otomatik olarak gerçek clone/design profillerini gösterecek.</div>}

      <div style={{ marginTop: '15px', color: '#d8b4fe', fontSize: '11px', fontWeight: 950 }}>☁️ ANAHTARSIZ ÇEVRİM İÇİ YEDEKLER</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginTop: '7px' }}>
        {cloudProfiles.map(card)}
      </div>
      <div style={{ marginTop: '10px', color: '#64748b', fontSize: '11px', lineHeight: 1.45 }}>
        Yerel VoiceStudio, ses klonlama için açık rıza ve kendi kayıtlarını gerektirir. Bu uygulama artık GitHub’daki VoiceStudio’nun OpenAI uyumlu yerel API’sine bağlanır; Puter profilleri yalnızca yerel servis bulunamadığında yedektir.
      </div>
    </section>
  );
}
