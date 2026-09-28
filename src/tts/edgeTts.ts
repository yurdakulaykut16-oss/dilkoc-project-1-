// ============================================================================
// MICROSOFT EDGE TTS MOTORU (anahtar gerektirmez)
// Rusça sesler : ru-RU-SvetlanaNeural (varsayılan) / ru-RU-DmitryNeural
// Türkçe sesler: tr-TR-EmelNeural (varsayılan)    / tr-TR-AhmetNeural
//
// - Edge'in "Sesli Oku" websocket servisini kullanır (TrustedClientToken +
//   Sec-MS-GEC imzası tarayıcıda WebCrypto ile üretilir).
// - Sentezlenen MP3 bloblari önbelleğe alınır: aynı metin ikinci kez ANINDA çalar.
// - HIZ KONTROLÜ: HTMLAudioElement.playbackRate + preservesPitch=true kullanılır,
//   yani ses YAVAŞLATILIRKEN/HIZLANDIRILIRKEN perde (pitch) BOZULMAZ —
//   kelime "incelmeden/kalınlaşmadan" yavaşlar ya da hızlanır.
// - Servis erişilemezse çağıran taraf false alır ve kendi yedeğine düşer.
// ============================================================================

export const RU_VOICES = [
  { id: 'ru-RU-SvetlanaNeural', label: 'Svetlana (kadın)' },
  { id: 'ru-RU-DmitryNeural', label: 'Dmitry (erkek)' },
] as const;

export const TR_VOICES = [
  { id: 'tr-TR-EmelNeural', label: 'Emel (kadın)' },
  { id: 'tr-TR-AhmetNeural', label: 'Ahmet (erkek)' },
] as const;

const VOICE_PREF_KEY = 'dilkoc_edge_tts_voices_v1';

export interface VoicePrefs { ru: string; tr: string }

export function getVoicePrefs(): VoicePrefs {
  try {
    const raw = localStorage.getItem(VOICE_PREF_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return {
        ru: RU_VOICES.some(v => v.id === p.ru) ? p.ru : RU_VOICES[0].id,
        tr: TR_VOICES.some(v => v.id === p.tr) ? p.tr : TR_VOICES[0].id,
      };
    }
  } catch { /* yok say */ }
  return { ru: RU_VOICES[0].id, tr: TR_VOICES[0].id };
}

export function setVoicePrefs(p: Partial<VoicePrefs>) {
  const cur = getVoicePrefs();
  const next = { ...cur, ...p };
  try { localStorage.setItem(VOICE_PREF_KEY, JSON.stringify(next)); } catch { /* yok say */ }
}

// ---------------------------------------------------------------------------
// Sec-MS-GEC imzası (Edge DRM): 5 dakikalık pencereye yuvarlanmış Windows "tick"
// değeri + TrustedClientToken'ın SHA-256 özeti.
// ---------------------------------------------------------------------------
const TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAB1C57D9F5A2B9F42D69BF3';
const CHROMIUM_FULL_VERSION = '130.0.2849.68';
const WSS_URL = 'wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1';

async function generateSecMsGec(): Promise<string> {
  let ticks = BigInt(Math.floor(Date.now() / 1000) + 11644473600);
  ticks -= ticks % 300n;          // 5 dakikalık pencere
  ticks *= 10000000n;             // saniye → 100ns tick
  const data = new TextEncoder().encode(`${ticks}${TRUSTED_CLIENT_TOKEN}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function uuid(): string {
  return (crypto as any).randomUUID ? (crypto as any).randomUUID().replace(/-/g, '') :
    Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join('');
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

// ---------------------------------------------------------------------------
// Sentez: websocket üzerinden tek parça metni MP3 blob'a çevirir
// ---------------------------------------------------------------------------
function synthesizeOnce(text: string, voice: string, prosodyRate: string): Promise<Blob> {
  return new Promise(async (resolve, reject) => {
    let settled = false;
    const fail = (e: unknown) => { if (!settled) { settled = true; reject(e); } };
    try {
      const gec = await generateSecMsGec();
      const url = `${WSS_URL}?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}&Sec-MS-GEC=${gec}&Sec-MS-GEC-Version=1-${CHROMIUM_FULL_VERSION}&ConnectionId=${uuid()}`;
      const ws = new WebSocket(url);
      ws.binaryType = 'arraybuffer';
      const audioChunks: ArrayBuffer[] = [];
      const timeout = window.setTimeout(() => { try { ws.close(); } catch { /* */ } fail(new Error('edge-tts-timeout')); }, 15000);

      ws.onopen = () => {
        const ts = new Date().toString();
        ws.send(
          `X-Timestamp:${ts}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n` +
          JSON.stringify({ context: { synthesis: { audio: { metadataoptions: { sentenceBoundaryEnabled: 'false', wordBoundaryEnabled: 'false' }, outputFormat: 'audio-24khz-48kbitrate-mono-mp3' } } } })
        );
        const lang = voice.split('-').slice(0, 2).join('-');
        const ssml =
          `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${lang}'>` +
          `<voice name='${voice}'><prosody pitch='+0Hz' rate='${prosodyRate}' volume='+0%'>${xmlEscape(text)}</prosody></voice></speak>`;
        ws.send(`X-RequestId:${uuid()}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${ts}\r\nPath:ssml\r\n\r\n${ssml}`);
      };

      ws.onmessage = (ev) => {
        if (typeof ev.data === 'string') {
          if (ev.data.includes('Path:turn.end')) {
            window.clearTimeout(timeout);
            try { ws.close(); } catch { /* */ }
            if (!settled) {
              settled = true;
              if (audioChunks.length === 0) reject(new Error('edge-tts-empty'));
              else resolve(new Blob(audioChunks, { type: 'audio/mpeg' }));
            }
          }
          return;
        }
        const buf = ev.data as ArrayBuffer;
        if (buf.byteLength < 2) return;
        const view = new DataView(buf);
        const headerLen = view.getUint16(0); // big-endian
        const header = new TextDecoder().decode(buf.slice(2, 2 + headerLen));
        if (header.includes('Path:audio')) audioChunks.push(buf.slice(2 + headerLen));
      };

      ws.onerror = () => { window.clearTimeout(timeout); fail(new Error('edge-tts-ws-error')); };
      ws.onclose = () => {
        window.clearTimeout(timeout);
        if (!settled) {
          if (audioChunks.length > 0) { settled = true; resolve(new Blob(audioChunks, { type: 'audio/mpeg' })); }
          else fail(new Error('edge-tts-closed'));
        }
      };
    } catch (e) { fail(e); }
  });
}

// ---------------------------------------------------------------------------
// Önbellek: aynı (ses, tempo, metin) ikinci kez websocket'e gitmez
// ---------------------------------------------------------------------------
const blobCache = new Map<string, Blob>();
const CACHE_MAX = 300;

async function getAudioBlob(text: string, voice: string, prosodyRate: string): Promise<Blob> {
  const key = `${voice}|${prosodyRate}|${text}`;
  const hit = blobCache.get(key);
  if (hit) return hit;
  const blob = await synthesizeOnce(text, voice, prosodyRate);
  if (blobCache.size >= CACHE_MAX) {
    const first = blobCache.keys().next().value;
    if (first !== undefined) blobCache.delete(first);
  }
  blobCache.set(key, blob);
  return blob;
}

// Servis sağlığı: art arda hata olursa kısa süre denemeyi bırak (hızlı fallback)
let failCount = 0;
let disabledUntil = 0;
export function edgeTtsLooksHealthy(): boolean { return Date.now() >= disabledUntil; }
function noteFailure() { failCount += 1; if (failCount >= 2) { disabledUntil = Date.now() + 60_000; failCount = 0; } }
function noteSuccess() { failCount = 0; disabledUntil = 0; }

// ---------------------------------------------------------------------------
// Oynatma: tek paylaşılan kuyruk + perde korumalı hız (preservesPitch)
// ---------------------------------------------------------------------------
let currentAudio: HTMLAudioElement | null = null;
let playToken = 0;

export function stopEdgeSpeech() {
  playToken += 1;
  if (currentAudio) {
    try { currentAudio.pause(); currentAudio.src = ''; } catch { /* */ }
    currentAudio = null;
  }
}

function splitText(text: string, maxLen = 400): string[] {
  const out: string[] = [];
  let rest = text.trim();
  while (rest.length > maxLen) {
    const marks = [rest.lastIndexOf('. ', maxLen), rest.lastIndexOf('! ', maxLen), rest.lastIndexOf('? ', maxLen), rest.lastIndexOf(', ', maxLen), rest.lastIndexOf(' ', maxLen)];
    const cut = Math.max(...marks);
    const idx = cut > 40 ? cut + 1 : maxLen;
    out.push(rest.slice(0, idx).trim());
    rest = rest.slice(idx).trim();
  }
  if (rest) out.push(rest);
  return out.filter(Boolean);
}

function playBlob(blob: Blob, playbackRate: number, token: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (token !== playToken) { resolve(); return; }
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    // PERDE KORUMALI hız: kelime bozulmadan yavaşlar/hızlanır
    (audio as any).preservesPitch = true;
    (audio as any).mozPreservesPitch = true;
    (audio as any).webkitPreservesPitch = true;
    audio.playbackRate = Math.min(2, Math.max(0.5, playbackRate));
    currentAudio = audio;
    const cleanup = () => { URL.revokeObjectURL(url); if (currentAudio === audio) currentAudio = null; };
    audio.onended = () => { cleanup(); resolve(); };
    audio.onerror = () => { cleanup(); reject(new Error('edge-tts-playback')); };
    audio.play().catch(err => { cleanup(); reject(err); });
  });
}

export interface EdgeSpeakOptions {
  /** Ses adı; verilmezse metin dilinden (Kiril → RU) otomatik seçilir */
  voice?: string;
  /** Sentez temposu SSML yüzdesi, örn '-35%' (yavaş anlatım) */
  prosodyRate?: string;
  /** Perde korumalı oynatma hızı (dinleme hız düğmesi): 0.5 – 2.0 */
  playbackRate?: number;
}

export function detectVoiceForText(text: string): string {
  const prefs = getVoicePrefs();
  return /[а-яё]/i.test(text) ? prefs.ru : prefs.tr;
}

/**
 * Metni Edge TTS ile seslendirir. Başarılıysa true, servis kullanılamıyorsa
 * false döner (çağıran taraf kendi yedeğine düşmeli).
 */
export async function edgeSpeak(text: string, opts: EdgeSpeakOptions = {}): Promise<boolean> {
  const clean = (text || '').trim();
  if (!clean) return true;
  if (!edgeTtsLooksHealthy() || typeof WebSocket === 'undefined' || !crypto?.subtle) return false;

  const voice = opts.voice || detectVoiceForText(clean);
  const prosodyRate = opts.prosodyRate || '+0%';
  const playbackRate = opts.playbackRate ?? 1;

  stopEdgeSpeech();
  const token = playToken;
  const chunks = splitText(clean);
  try {
    // İlk parçayı sentezle, çalarken sonrakini önceden getir (akıcı zincir)
    let next: Promise<Blob> | null = getAudioBlob(chunks[0], voice, prosodyRate);
    for (let i = 0; i < chunks.length; i++) {
      const blob = await next;
      next = i + 1 < chunks.length ? getAudioBlob(chunks[i + 1], voice, prosodyRate) : null;
      if (token !== playToken) return true; // kullanıcı durdurdu / yeni ses başladı
      await playBlob(blob!, playbackRate, token);
    }
    noteSuccess();
    return true;
  } catch (e) {
    console.warn('Edge TTS başarısız, yedeğe düşülüyor:', e);
    noteFailure();
    return false;
  }
}

/** Rusça metni seçili Rus sesiyle okur (Svetlana/Dmitry). */
export function speakRussian(text: string, opts: Omit<EdgeSpeakOptions, 'voice'> = {}) {
  return edgeSpeak(text, { ...opts, voice: getVoicePrefs().ru });
}

/** Türkçe metni seçili Türk sesiyle okur (Emel/Ahmet) — botun konuşması. */
export function speakTurkish(text: string, opts: Omit<EdgeSpeakOptions, 'voice'> = {}) {
  return edgeSpeak(text, { ...opts, voice: getVoicePrefs().tr });
}
