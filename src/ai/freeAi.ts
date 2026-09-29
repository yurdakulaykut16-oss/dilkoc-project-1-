// Ücretsiz, anahtarsız çevrim içi AI katmanı.
// Puter.js kullanıcı adına çalışır; uygulama içine API anahtarı gömülmez.
// İstenirse aynı arayüz VITE_AI_CHAT_ENDPOINT ile güvenli bir proxy'ye bağlanabilir.

export type AgentRole = 'system' | 'user' | 'assistant';

export interface AgentMessage {
  role: AgentRole;
  content: string;
}

export interface AgentReply {
  text: string;
  provider: 'puter' | 'proxy' | 'offline';
  model: string;
}

type PuterChatResponse = {
  message?: { content?: string | Array<{ type?: string; text?: string }> };
  content?: string;
};

type PuterChatApi = {
  ai?: {
    chat?: (
      messages: string | AgentMessage[],
      options?: Record<string, unknown>,
    ) => Promise<PuterChatResponse | AsyncIterable<{ text?: string; reasoning?: string }> | unknown>;
  };
};

const ENV = ((import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env || {});
const PUTER_SCRIPT = 'https://js.puter.com/v2/';
const PREFERRED_MODELS = [
  ENV.VITE_AI_MODEL || 'gpt-5-nano',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash-lite',
].filter((model, index, all) => Boolean(model) && all.indexOf(model) === index);

let puterScriptPromise: Promise<void> | null = null;

function puterApi(): PuterChatApi | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { puter?: PuterChatApi }).puter;
}

async function loadPuter(): Promise<PuterChatApi | undefined> {
  const existing = puterApi();
  if (existing?.ai?.chat) return existing;
  if (typeof document === 'undefined') return undefined;

  if (!puterScriptPromise) {
    puterScriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.querySelector<HTMLScriptElement>('script[data-dilkoc-puter="true"]');
      if (script) {
        script.addEventListener('load', () => resolve(), { once: true });
        script.addEventListener('error', () => reject(new Error('Puter yüklenemedi')), { once: true });
        return;
      }
      const tag = document.createElement('script');
      tag.src = PUTER_SCRIPT;
      tag.async = true;
      tag.dataset.dilkocPuter = 'true';
      tag.onload = () => resolve();
      tag.onerror = () => reject(new Error('Puter yüklenemedi'));
      document.head.appendChild(tag);
    });
  }

  try {
    await puterScriptPromise;
  } catch {
    return undefined;
  }
  return puterApi();
}

function extractText(value: PuterChatResponse | unknown): string {
  if (!value || typeof value !== 'object') return '';
  const response = value as PuterChatResponse;
  const content = response.message?.content ?? response.content;
  if (typeof content === 'string') return content.trim();
  if (Array.isArray(content)) return content.map(part => part.text || '').join('').trim();
  return '';
}

async function readStream(value: unknown, onDelta?: (text: string) => void): Promise<string> {
  if (!value || typeof value !== 'object' || !(Symbol.asyncIterator in (value as object))) {
    return extractText(value);
  }
  let full = '';
  for await (const part of value as AsyncIterable<{ text?: string; reasoning?: string }>) {
    const delta = part?.text || '';
    if (!delta) continue;
    full += delta;
    onDelta?.(delta);
  }
  return full.trim();
}

async function proxyChat(messages: AgentMessage[], onDelta?: (text: string) => void): Promise<AgentReply | null> {
  const endpoint = ENV.VITE_AI_CHAT_ENDPOINT;
  if (!endpoint || typeof fetch === 'undefined') return null;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, stream: false }),
  });
  if (!response.ok) throw new Error(`AI proxy ${response.status}`);
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }>; text?: string };
  const text = data.choices?.[0]?.message?.content || data.text || '';
  if (text) onDelta?.(text);
  return text ? { text: text.trim(), provider: 'proxy', model: 'proxy' } : null;
}

/**
 * Hızlı modelden başlayıp bir yedek model deneyen chat çağrısı.
 * Puter başarısız olursa opsiyonel proxy denenir; anahtar istemciye konmaz.
 */
export async function askFreeAgent(
  messages: AgentMessage[],
  options: { onDelta?: (text: string) => void; signal?: AbortSignal } = {},
): Promise<AgentReply> {
  if (options.signal?.aborted) throw new DOMException('İstek iptal edildi', 'AbortError');
  const puter = await loadPuter();
  if (puter?.ai?.chat) {
    let lastError: unknown;
    for (const model of [...PREFERRED_MODELS, undefined]) {
      try {
        const chatOptions: Record<string, unknown> = {
          stream: false,
          temperature: 0.35,
          max_tokens: 700,
        };
        // Son denemede model seçimini Puter'a bırak; böylece model kataloğu
        // değişse bile ücretsiz varsayılan model çalışmaya devam eder.
        if (model) chatOptions.model = model;
        const result = await puter.ai.chat(messages, chatOptions);
        const text = await readStream(result, options.onDelta);
        if (text) return { text, provider: 'puter', model: model || 'default' };
      } catch (error) {
        lastError = error;
      }
    }
    if (lastError) console.warn('Ücretsiz AI modelleri yanıt vermedi:', lastError);
  }

  try {
    const proxied = await proxyChat(messages, options.onDelta);
    if (proxied) return proxied;
  } catch (error) {
    console.warn('AI proxy yanıt vermedi:', error);
  }

  throw new Error('Çevrim içi AI şu anda yanıt vermiyor');
}

export function activeFreeAiLabel(): string {
  return 'Puter • anahtarsız hızlı AI';
}
