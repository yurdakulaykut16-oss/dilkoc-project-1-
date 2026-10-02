// Gerçek debpalash/VoiceStudio backend bağlantısı.
// Tarayıcı her zaman göreli /voicestudio URL'sini çağırır; Vite bunu geliştirmede
// localhost:3900'a proxy'ler. Böylece browser kodunda localhost hard-code edilmez.

import { detectSpeechTag } from '../content/activeLanguage';
export interface LocalVoiceStudioVoice {
  voice_id: string;
  name: string;
  type?: string;
  language?: string;
  description?: string;
  preview_url?: string;
  instruct?: string;
}

type VoiceListResponse = { voices?: LocalVoiceStudioVoice[] };
type ModelCatalogResponse = { models?: Array<{ repo_id?: string; installed?: boolean }> };

const ENV = ((import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env || {});
export const VOICESTUDIO_API_BASE = (ENV.VITE_VOICESTUDIO_API_BASE || '/voicestudio').replace(/\/$/, '');
const VOICESTUDIO_MODEL = ENV.VITE_VOICESTUDIO_MODEL || 'omnivoice';

let currentAudio: HTMLAudioElement | null = null;

function endpoint(path: string) {
  return `${VOICESTUDIO_API_BASE}${path}`;
}

async function localOmniVoiceModelReady(signal: AbortSignal) {
  try {
    const response = await fetch(endpoint('/models'), { signal, cache: 'no-store' });
    if (!response.ok) return true;
    const data = await response.json() as ModelCatalogResponse;
    const model = data.models?.find(item => item.repo_id === 'k2-fsa/OmniVoice');
    // Older VoiceStudio builds may not expose the catalogue entry; in that case
    // let /speech decide instead of blocking a compatible backend.
    return !model || model.installed === true;
  } catch {
    return true;
  }
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

async function playVoiceStudioAudio(
  blob: Blob,
  rate: number,
  onStart?: () => void,
): Promise<boolean> {
  if (!blob.size) return false;
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
  try {
    await audio.play();
    return true;
  } catch {
    stopLocalVoiceStudio();
    return false;
  }
}

/** VoiceStudio repository's bundled voice-design/demo clipini önizler. */
export async function previewLocalVoiceStudioAudio(
  previewUrl: string,
  rate = 1,
): Promise<boolean> {
  try {
    const response = await fetch(previewUrl, { cache: 'force-cache' });
    if (!response.ok) return false;
    return playVoiceStudioAudio(await response.blob(), rate);
  } catch {
    return false;
  }
}

/** VoiceStudio'nun gerçek yerel /v1/audio/speech endpoint'inden ses üretir. */
export async function speakWithLocalVoiceStudio(
  text: string,
  voice = 'default',
  rate = 1,
  onStart?: () => void,
  instruct?: string,
): Promise<boolean> {
  const clean = text.trim();
  if (!clean) return true;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 18_000);
  try {
    if (!(await localOmniVoiceModelReady(controller.signal))) {
      console.warn('VoiceStudio OmniVoice modeli kurulu değil; uzun TTS isteği başlatılmadı.');
      return false;
    }
    const speechTag = detectSpeechTag(clean);
    const response = await fetch(endpoint('/v1/audio/speech'), {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: VOICESTUDIO_MODEL,
        voice,
        input: clean,
        response_format: 'mp3',
        speed: Math.min(4, Math.max(0.25, rate)),
        language: speechTag === 'ru-RU' ? 'ru' : speechTag === 'en-US' ? 'en' : 'tr',
        ...(instruct ? { instruct } : {}),
      }),
    });
    if (!response.ok) throw new Error(`VoiceStudio speech ${response.status}`);
    const played = await playVoiceStudioAudio(await response.blob(), rate, onStart);
    if (!played) throw new Error('VoiceStudio ses oynatılamadı');
    return true;
  } catch (error) {
    stopLocalVoiceStudio();
    console.warn('VoiceStudio yerel backend kullanılamadı:', error);
    return false;
  } finally {
    window.clearTimeout(timeout);
  }
}
