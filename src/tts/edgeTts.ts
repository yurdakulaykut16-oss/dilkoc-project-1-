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
// - Servis erişilemezse (ör. Microsoft tarafı Sec-MS-GEC imzasını reddederse,
//   konsolda "HTTP Authentication failed; no valid credentials available")
//   otomatik olarak TARAYICI YERLEŞİK SESİNE (Web Speech API) düşülür ve
//   servis bir süre devre dışı bırakılır; her cümlede boşuna websocket açılmaz.
// ============================================================================
import { webSpeak, webSpeechSupported, stopWebSpeech } from './webSpeech';
import { detectSpeechTag } from '../content/activeLanguage';

export const RU_VOICES = [
  { id: 'ru-RU-SvetlanaNeural', label: 'Svetlana (kadın)' },
  { id: 'ru-RU-DmitryNeural', label: 'Dmitry (erkek)' },
] as const;

export const TR_VOICES = [
  { id: 'tr-TR-EmelNeural', label: 'Emel (kadın)' },
  { id: 'tr-TR-AhmetNeural', label: 'Ahmet (erkek)' },
] as const;

export const EN_VOICES = [
  // İngilizce TTS profilleri (VoiceStudio seçimleri; tarayıcı sesine düşerken
  // yalnızca etiket olarak kullanılır: en-US).
  { id: 'en-us-female-1', label: '🇺🇸 Aria (ABD, Kadın)' },
  { id: 'en-us-male-1', label: '🇺🇸 Guy (ABD, Erkek)' },
  { id: 'en-gb-female-1', label: '🇬🇧 Sonia (İngiltere, Kadın)' },
  { id: 'en-gb-male-1', label: '🇬🇧 Ryan (İngiltere, Erkek)' },
];

const VOICE_PREF_KEY = 'dilkoc_edge_tts_voices_v1';

export interface VoicePrefs { ru: string; tr: string; en?: string }

export function getVoicePrefs(): VoicePrefs {
  try {
    const raw = localStorage.getItem(VOICE_PREF_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return {
        ru: RU_VOICES.some(v => v.id === p.ru) ? p.ru : RU_VOICES[0].id,
        tr: TR_VOICES.some(v => v.id === p.tr) ? p.tr : TR_VOICES[0].id,
        en: EN_VOICES.some(v => v.id === p.en) ? p.en : EN_VOICES[0].id,
      };
    }
  } catch { /* yok say */ }
  return { ru: RU_VOICES[0].id, tr: TR_VOICES[0].id, en: EN_VOICES[0].id };
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
    let opened = false;          // websocket el sıkışması tamamlandı mı?
    let handshakeFailed = false; // onerror → çoğunlukla 401/403 kimlik reddi
    const fail = (e: unknown) => { if (!settled) { settled = true; reject(e); } };
    try {
      const gec = await generateSecMsGec();
      const url = `${WSS_URL}?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}&Sec-MS-GEC=${gec}&Sec-MS-GEC-Version=1-${CHROMIUM_FULL_VERSION}&ConnectionId=${uuid()}`;
      const ws = new WebSocket(url);
      ws.binaryType = 'arraybuffer';
      const audioChunks: ArrayBuffer[] = [];

      // 15 saniye beklemek, servis zaten reddediyorken konuşmayı çok geciktiriyordu.
      const timeout = window.setTimeout(() => { try { ws.close(); } catch { /* */ } fail(new Error('edge-tts-timeout')); }, 6000);

      ws.onopen = () => {
        opened = true;
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

      // Kimlik doğrulama reddinde tarayıcı HTTP durumunu JS'e vermez; el sıkışma
      // hiç tamamlanmadığı için 1006 ile kapanır. Bunu "auth" olarak işaretleriz.
      ws.onerror = () => { window.clearTimeout(timeout); handshakeFailed = true; fail(new Error('edge-tts-ws-error')); };
      ws.onclose = (ev) => {
        window.clearTimeout(timeout);
        if (!settled) {
          if (audioChunks.length > 0) { settled = true; resolve(new Blob(audioChunks, { type: 'audio/mpeg' })); }
          else if (handshakeFailed || !opened || ev.code === 1006 || ev.code === 1008 || ev.code === 4403) {
            fail(new Error('edge-tts-auth'));
          } else fail(new Error('edge-tts-closed'));
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

// ---------------------------------------------------------------------------
// SERVİS SAĞLIĞI / DEVRE KESİCİ
// Microsoft imzayı reddettiğinde (auth) her cümlede yeniden websocket açmak
// hem konsolu hata yağmuruna tutuyor hem de her seferinde saniyelerce gecikme
// yaratıyordu. Kimlik hatasında servis UZUN süre (24 saat) kapatılır ve bu
// durum localStorage'a yazılır; sayfa yenilense bile boşuna denenmez.
// ---------------------------------------------------------------------------
const EDGE_HEALTH_KEY = 'dilkoc_edge_tts_disabled_until_v1';
const AUTH_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const SOFT_COOLDOWN_MS = 60_000;

let failCount = 0;
let disabledUntil = (() => {
  try {
    const raw = localStorage.getItem(EDGE_HEALTH_KEY);
    const until = raw ? Number(raw) : 0;
    return Number.isFinite(until) ? until : 0;
  } catch {
    return 0;
  }
})();

function setDisabledUntil(ts: number) {
  disabledUntil = ts;
  try {
    if (ts > Date.now()) localStorage.setItem(EDGE_HEALTH_KEY, String(ts));
    else localStorage.removeItem(EDGE_HEALTH_KEY);
  } catch {
    /* yok say */
  }
}

export function edgeTtsLooksHealthy(): boolean { return Date.now() >= disabledUntil; }

/** Edge TTS şu an kullanılabiliyor mu? Arayüzde rozet göstermek için. */
export function edgeTtsStatus(): 'active' | 'disabled' {
  return edgeTtsLooksHealthy() ? 'active' : 'disabled';
}

/** Kullanıcı isterse devre kesiciyi elle sıfırlayabilsin. */
export function resetEdgeTtsHealth() {
  failCount = 0;
  setDisabledUntil(0);
}

function noteFailure(kind: 'auth' | 'other') {
  if (kind === 'auth') {
    // Kimlik reddi geçici bir ağ sorunu değildir; kısa süre sonra tekrar denemek anlamsız.
    failCount = 0;
    setDisabledUntil(Date.now() + AUTH_COOLDOWN_MS);
    console.warn('[TTS] Edge/Bing servisi kimlik doğrulamayı reddetti. Tarayıcının yerleşik sesine geçildi; Edge 24 saat denenmeyecek.');
    return;
  }
  failCount += 1;
  if (failCount >= 2) { setDisabledUntil(Date.now() + SOFT_COOLDOWN_MS); failCount = 0; }
}

function noteSuccess() { failCount = 0; setDisabledUntil(0); }

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
  // Yedek motor devredeyse onu da sustur; yoksa iki ses üst üste biner.
  stopWebSpeech();
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
  /**
   * Edge servisi kullanılamazsa tarayıcının yerleşik sesiyle (Web Speech API)
   * okumayı dener. Varsayılan: true — böylece uygulama asla sessiz kalmaz.
   * Kendi sağlayıcı zinciri olan ekranlar (AI Koçu) bunu false yapar.
   */
  fallbackToBrowser?: boolean;
  /** Yedek motor konuşurken dudak animasyonu için. */
  onChunkStart?: (chunk: string) => void;
  onChunkEnd?: () => void;
}

export function detectVoiceForText(text: string): string {
  const prefs = getVoicePrefs();
  const tag = detectSpeechTag(text);
  if (tag === 'en-US') return prefs.en || prefs.tr;
  return tag === 'ru-RU' ? prefs.ru : prefs.tr;
}

/**
 * Metni Edge TTS ile seslendirir. Başarılıysa true, servis kullanılamıyorsa
 * false döner (çağıran taraf kendi yedeğine düşmeli).
 */
export async function edgeSpeak(text: string, opts: EdgeSpeakOptions = {}): Promise<boolean> {
  const clean = (text || '').trim();
  if (!clean) return true;

  // DilKoç'un ses politikası: Microsoft Edge websocket TTS kullanılmaz.
  // Gerçek yerel VoiceStudio başarısızsa çağıran zincir önce Puter/cloud,
  // burada ise anahtarsız tarayıcı sesine düşer. Böylece Edge kimlik/TLS
  // hataları ses üretimini ve önizlemeyi bloke edemez.
  const browserOnly = true;

  const voice = opts.voice || detectVoiceForText(clean);
  const prosodyRate = opts.prosodyRate || '+0%';
  const playbackRate = opts.playbackRate ?? 1;
  const allowBrowserFallback = opts.fallbackToBrowser !== false;
  const browserLang: 'tr-TR' | 'ru-RU' = voice.startsWith('ru') ? 'ru-RU' : 'tr-TR';

  const speakWithBrowser = async () => {
    if (!allowBrowserFallback || !webSpeechSupported()) return false;
    return webSpeak(clean, {
      lang: browserLang,
      rate: playbackRate,
      onChunkStart: opts.onChunkStart,
      onChunkEnd: opts.onChunkEnd,
    });
  };

  // Servis kapalıysa/desteklenmiyorsa websocket açmaya hiç kalkışma: doğrudan yedeğe geç.
  if (browserOnly || !edgeTtsLooksHealthy() || typeof WebSocket === 'undefined' || !crypto?.subtle) {
    return speakWithBrowser();
  }

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
    const message = e instanceof Error ? e.message : String(e);
    const kind: 'auth' | 'other' = message.includes('auth') ? 'auth' : 'other';
    if (kind !== 'auth') console.warn('Edge TTS başarısız, yedeğe düşülüyor:', e);
    noteFailure(kind);
    return speakWithBrowser();
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
