// debpalash/VoiceStudio destekli bot ses paleti.
// Yerel VoiceStudio backend'i açıksa gerçek clone/design profile kullanılır;
// bulunamazsa anahtarsız Puter profilleri fallback olarak kalır.

import { speakWithLocalVoiceStudio, stopLocalVoiceStudio } from './voiceStudioLocal';
import { detectSpeechTag } from '../content/activeLanguage';

export type BotVoiceProvider = 'voicestudio' | 'speechify' | 'elevenlabs' | 'openai';

export interface BotVoiceProfile {
  id: string;
  provider: BotVoiceProvider;
  voice: string;
  model: string;
  label: string;
  description: string;
  emoji: string;
  previewUrl?: string;
  instruct?: string;
}

export const BOT_VOICE_PROFILES: BotVoiceProfile[] = [
  {
    id: 'voicestudio:demo0001',
    provider: 'voicestudio',
    voice: 'demo0001',
    model: 'omnivoice',
    label: 'VoiceStudio • Demo Voice',
    description: 'VoiceStudio deposundan gelen yerel demo profili',
    emoji: '🧠',
    previewUrl: '/dilkoc-voices/demo_voice.wav',
  },
  {
    id: 'studio-geffen',
    provider: 'speechify',
    voice: 'geffen_32',
    model: 'simba-multilingual',
    label: 'Geffen • sıcak',
    description: 'Ders açıklamaları için sıcak ve dengeli',
    emoji: '🌿',
  },
  {
    id: 'studio-dominic',
    provider: 'speechify',
    voice: 'dominic_32',
    model: 'simba-multilingual',
    label: 'Dominic • net',
    description: 'Hızlı, net ve enerjik koç sesi',
    emoji: '⚡',
  },
  {
    id: 'studio-harper',
    provider: 'speechify',
    voice: 'harper_32',
    model: 'simba-multilingual',
    label: 'Harper • yumuşak',
    description: 'Uzun cevaplarda daha yumuşak anlatım',
    emoji: '🌙',
  },
  {
    id: 'studio-hugh',
    provider: 'speechify',
    voice: 'hugh_32',
    model: 'simba-multilingual',
    label: 'Hugh • tok',
    description: 'Daha tok, radyo tarzı bir AI sesi',
    emoji: '🎙️',
  },
  {
    id: 'studio-rachel',
    provider: 'elevenlabs',
    voice: '21m00Tcm4TlvDq8ikWAM',
    model: 'eleven_multilingual_v2',
    label: 'Rachel • doğal',
    description: 'ElevenLabs çok dilli alternatif ses',
    emoji: '✨',
  },
  {
    id: 'studio-alloy',
    provider: 'openai',
    voice: 'alloy',
    model: 'gpt-4o-mini-tts',
    label: 'Alloy • canlı',
    description: 'OpenAI canlı anlatım profili',
    emoji: '🪩',
  },
];

const PREF_KEY = 'dilkoc_voicestudio_bot_profile_v1';

type PuterTtsApi = {
  ai?: {
    txt2speech?: (text: string, options?: Record<string, unknown>) => Promise<HTMLAudioElement>;
  };
};

let scriptPromise: Promise<void> | null = null;
let currentAudio: HTMLAudioElement | null = null;
// OmniVoice modeli ilk açılışta eksikse backend her isteği uzun süre bekletip
// 503 döndürebilir. Aynı oturumda her Rusça/Türkçe parçada bunu yeniden denemek
// yerine kısa süreliğine ücretsiz cloud yedeğine geç; model hazır olduğunda tekrar dene.
let localVoiceRetryAt = 0;

function puter(): PuterTtsApi | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { puter?: PuterTtsApi }).puter;
}

async function loadPuter(): Promise<PuterTtsApi | undefined> {
  const current = puter();
  if (current?.ai?.txt2speech) return current;
  if (typeof document === 'undefined') return undefined;
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[data-dilkoc-puter="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Puter yüklenemedi')), { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      script.dataset.dilkocPuter = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Puter yüklenemedi'));
      document.head.appendChild(script);
    });
  }
  try {
    await scriptPromise;
  } catch {
    return undefined;
  }
  return puter();
}

export function getBotVoiceProfile(): BotVoiceProfile {
  try {
    const stored = localStorage.getItem(PREF_KEY);
    if (stored) {
      // Eski sürüm yalnızca id yazıyordu; yeni sürüm yerel VoiceStudio profilini
      // id + isim ile birlikte saklar.
      try {
        const custom = JSON.parse(stored) as BotVoiceProfile;
        if (custom.id && custom.provider && custom.voice) return custom;
      } catch {
        const found = BOT_VOICE_PROFILES.find(profile => profile.id === stored);
        if (found) return found;
      }
    }
  } catch {
    // Tarayıcı depolaması kapalıysa varsayılan profile düş.
  }
  return BOT_VOICE_PROFILES[0];
}

export function setBotVoiceProfile(profileOrId: string | BotVoiceProfile): BotVoiceProfile {
  const profile = typeof profileOrId === 'string'
    ? BOT_VOICE_PROFILES.find(item => item.id === profileOrId) || BOT_VOICE_PROFILES[0]
    : profileOrId;
  try { localStorage.setItem(PREF_KEY, JSON.stringify(profile)); } catch { /* yok say */ }
  return profile;
}

export function stopBotVoice() {
  stopLocalVoiceStudio();
  if (!currentAudio) return;
  try {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  } catch {
    // Audio oynatılmamış olabilir.
  }
  currentAudio = null;
}

/** Seçili VoiceStudio profilini çalıştırır; yerel backend yoksa Puter profillerine düşer. */
export async function speakWithBotVoice(text: string, rate = 1, onStart?: () => void): Promise<boolean> {
  const clean = text.trim();
  if (!clean) return true;
  let profile = getBotVoiceProfile();
  if (profile.provider === 'voicestudio') {
    if (Date.now() >= localVoiceRetryAt) {
      const localPlayed = await speakWithLocalVoiceStudio(clean, profile.voice, rate, onStart, profile.instruct);
      if (localPlayed) {
        localVoiceRetryAt = 0;
        return true;
      }
      localVoiceRetryAt = Date.now() + 60_000;
    }
    // OmniVoice modeli ilk kez indirilirken uygulama susmasın. Edge/browser
    // sesine değil, anahtarsız Puter içindeki ücretsiz cloud fallback profiline geç.
    profile = BOT_VOICE_PROFILES[1];
  }
  const api = await loadPuter();
  if (!api?.ai?.txt2speech) return false;
  try {
    const options: Record<string, unknown> = {
      provider: profile.provider,
      model: profile.model,
      voice: profile.voice,
      language: detectSpeechTag(clean),
      output_format: profile.provider === 'speechify' ? 'mp3' : 'mp3_44100_128',
    };
    if (profile.provider === 'openai') options.instructions = 'Warm, clear, encouraging language coach. Speak Turkish naturally.';
    const audio = await api.ai.txt2speech(clean, options);
    if (!audio) return false;
    stopBotVoice();
    currentAudio = audio;
    audio.playbackRate = Math.min(1.15, Math.max(0.86, rate));
    audio.volume = 1;
    onStart?.();
    await new Promise<void>((resolve, reject) => {
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error('VoiceStudio ses oynatma hatası'));
      void audio.play().catch(reject);
    });
    if (currentAudio === audio) currentAudio = null;
    return true;
  } catch (error) {
    if (currentAudio) currentAudio = null;
    console.warn('VoiceStudio AI sesi kullanılamadı, yedeğe geçiliyor:', error);
    return false;
  }
}
