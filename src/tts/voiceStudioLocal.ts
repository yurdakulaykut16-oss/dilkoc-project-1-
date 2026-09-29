// Gerçek debpalash/VoiceStudio backend bağlantısı.
// Tarayıcı her zaman göreli /voicestudio URL'sini çağırır; Vite bunu geliştirmede
// localhost:3900'a proxy'ler. Böylece browser kodunda localhost hard-code edilmez.

export interface LocalVoiceStudioVoice {
  voice_id: string;
  name: string;
  type?: string;
  language?: string;
  description?: string;
}

type VoiceListResponse = { voices?: LocalVoiceStudioVoice[] };

const ENV = ((import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env || {});
export const VOICESTUDIO_API_BASE = (ENV.VITE_VOICESTUDIO_API_BASE || '/voicestudio').replace(/\/$/, '');
const VOICESTUDIO_MODEL = ENV.VITE_VOICESTUDIO_MODEL || 'omnivoice';

let currentAudio: HTMLAudioElement | null = null;

function endpoint(path: string) {
  return `${VOICESTUDIO_API_BASE}${path}`;
}

export async function listLocalVoiceStudioVoices(signal?: AbortSignal): Promise<LocalVoiceStudioVoice[]> {
  const response = await fetch(endpoint('/v1/audio/voices'), { signal });
  if (!response.ok) throw new Error(`VoiceStudio voices ${response.status}`);
  const data = await response.json() as VoiceListResponse;
  return (data.voices || []).filter(voice => voice.type === 'profile');
}

export async function voiceStudioIsAvailable(signal?: AbortSignal): Promise<boolean> {
  try {
    const response = await fetch(endpoint('/health'), { signal, cache: 'no-store' });
    return response.ok;
  } catch {
    return false;
  }
}

export function stopLocalVoiceStudio() {
  if (!currentAudio) return;
  try {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  } catch {
    // Oynatılmamış ses durdurulmaya çalışılmış olabilir.
  }
  currentAudio = null;
}

/** VoiceStudio'nun gerçek yerel /v1/audio/speech endpoint'inden ses üretir. */
export async function speakWithLocalVoiceStudio(
  text: string,
  voice = 'default',
  rate = 1,
  onStart?: () => void,
): Promise<boolean> {
  const clean = text.trim();
  if (!clean) return true;
  try {
    const isRussian = /[а-яё]/i.test(clean);
    const response = await fetch(endpoint('/v1/audio/speech'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: VOICESTUDIO_MODEL,
        voice,
        input: clean,
        response_format: 'mp3',
        speed: Math.min(4, Math.max(0.25, rate)),
        language: isRussian ? 'ru' : 'tr',
      }),
    });
    if (!response.ok) throw new Error(`VoiceStudio speech ${response.status}`);
    const blob = await response.blob();
    if (!blob.size) throw new Error('VoiceStudio boş ses döndürdü');
    stopLocalVoiceStudio();
    const audio = new Audio(URL.createObjectURL(blob));
    currentAudio = audio;
    (audio as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true;
    audio.playbackRate = Math.min(1.35, Math.max(0.75, rate));
    audio.onended = () => {
      URL.revokeObjectURL(audio.src);
      if (currentAudio === audio) currentAudio = null;
    };
    audio.onerror = () => {
      URL.revokeObjectURL(audio.src);
      if (currentAudio === audio) currentAudio = null;
    };
    onStart?.();
    await audio.play();
    return true;
  } catch (error) {
    stopLocalVoiceStudio();
    console.warn('VoiceStudio yerel backend kullanılamadı:', error);
    return false;
  }
}
