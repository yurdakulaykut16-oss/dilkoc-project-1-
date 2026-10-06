import { SpeechRecognition as NativeSpeechRecognition } from '@capacitor-community/speech-recognition';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { answerWithLocalRussianAgent } from '../ai/localRussianAgent';
import { getLocalAnswerCache, LOCAL_INTELLIGENCE_MAX_LABEL, putLocalAnswerCache } from '../ai/localIntelligenceStore';
import { LOCAL_RUSSIAN_FACT_COUNT, RUSSIAN_KNOWLEDGE_BASE } from '../ai/russianExpertise';
import { speakWithBotVoice, stopBotVoice } from '../tts/voiceStudio';
import VoiceStudioPanel from './VoiceStudioPanel';
import VoicePlanet from './VoicePlanet';
import {
  PLANET_POSE_ASKING,
  PLANET_POSE_IDLE,
  PLANET_POSE_LISTEN,
  PLANET_POSE_THINK,
  planetPoseTrack,
  type PlanetPose,
  type PlanetViseme,
} from './planetGestures';
import { isEnglish, langMeta } from '../content/activeLanguage';

type LearningWord = { ru: string; tr: string; reading?: string };
type LearningSentence = { ru: string; tr: string };

type LearningFocus = {
  pathPosition: number;
  pathTotal: number;
  title: string;
  icon: string;
  description?: string;
  words: LearningWord[];
  sentences: LearningSentence[];
};

type CoachMistake = { ru: string; tr: string; reason: string };
type SrsItem = { ru: string; tr: string; box: number; nextReview: number; type: 'word' | 'letter' };

type MouthViseme = PlanetViseme;
type RecognitionAlternative = { transcript: string; confidence?: number };
type RecognitionResult = { readonly length: number; readonly isFinal?: boolean; [index: number]: RecognitionAlternative };
type RecognitionResultList = { readonly length: number; [index: number]: RecognitionResult };
type RecognitionEventLike = Event & { results: RecognitionResultList };
type RecognitionErrorEventLike = Event & { error?: string; message?: string };
type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: RecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
};
type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type ChatEntry = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  provider?: string;
  /** Ajanın kullandığı bilgi kaynakları — cevabın nereden geldiğini gösterir. */
  sources?: string[];
  /** Tek dokunuşla sorulabilen akıllı takip soruları. */
  followUps?: string[];
  /** Cevabı üretirken birleştirilen bilgi noktası sayısı. */
  depth?: number;
  confidence?: 'yüksek' | 'orta' | 'düşük';
};

export interface AiChatProps {
  completedUnits: string[];
  completedTopics: string[];
  completedAlpha: string[];
  completedGrammar: string[];
  learningFocus: LearningFocus;
  mistakes: CoachMistake[];
  srsBank: SrsItem[];
  /** Koçun hata defterine kayıt ekler (AiTutor üzerinden App'e bağlanır). */
  addMistake?: (ru: string, tr: string, reason: string) => void;
  /** Aralıklı tekrar kutusuna kart ekler. */
  addToSRS?: (ru: string, tr: string, type: 'word' | 'letter') => void;
  /** Soru sorma davranışını ödüllendirir. */
  onEarnXp?: (amount: number) => void;
}

const CHAT_KEY = 'dilkoc_ai_agent_chat_v1';
const AUTO_SPEAK_KEY = 'dilkoc_ai_agent_autospeak_v1';
const SPEAK_SCOPE_KEY = 'dilkoc_ai_agent_speakscope_v1';

function restoreChat(): ChatEntry[] {
  try {
    const raw = localStorage.getItem(CHAT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ChatEntry[];
      if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(entry => entry && typeof entry.text === 'string')) {
        return parsed.slice(-24);
      }
    }
  } catch { /* bozuk kayıt varsa sessizce yeni sohbet aç */ }
  return initialChat();
}

function initialChat(): ChatEntry[] {
  return [{
    id: 'welcome',
    role: 'assistant',
    text: isEnglish()
      ? 'Merhaba! İngilizce hakkında istediğini sorabilirsin. Çeviri, cümle düzeltme, zamanlar, phrasal verb\'ler, telaffuz ve doğal konuşma farklarını soruna göre düşünüp Türkçe açıklayabilirim.\n\nSesli okuma varsayılan olarak yalnızca ⚡ KISA CEVAP bölümünü okur. Daha fazlasını duymak istersen «neden böyle kısmını da oku», «tabloyu oku» ya da «hepsini oku» diyebilir, veya her bölümün sağındaki 🔊 simgesine dokunabilirsin.'
      : 'Merhaba! Rusça hakkında istediğini sorabilirsin. Çeviri, cümle düzeltme, hâller, fiil görünüşleri, telaffuz ve doğal konuşma farklarını soruna göre düşünüp Türkçe açıklayabilirim.\n\nSesli okuma varsayılan olarak yalnızca ⚡ KISA CEVAP bölümünü okur. Daha fazlasını duymak istersen «neden böyle kısmını da oku», «tabloyu oku» ya da «hepsini oku» diyebilir, veya her bölümün sağındaki 🔊 simgesine dokunabilirsin.',
    provider: 'yerel hafıza',
  }];
}

function getSpeechRecognitionConstructor() {
  if (typeof window === 'undefined') return undefined;
  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
}

function isInsideIframe() {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function visemeForChar(char: string): MouthViseme {
  const c = char.toLocaleLowerCase('tr-TR');
  if (!c.trim() || /[.,!?;:]/.test(c)) return 'rest';
  if ('bmpбпм'.includes(c)) return 'closed';
  if ('aıаая'.includes(c)) return 'open';
  if ('eiиеэы'.includes(c)) return 'wide';
  if ('ouöüоуюё'.includes(c)) return 'round';
  if ('fvszşjчцсзжшщх'.includes(c)) return 'teeth';
  if ('rlйyğ'.includes(c)) return 'smile';
  return 'wide';
}

function visemeDelayForChar(char: string, lang: 'tr-TR' | 'ru-RU' | 'en-US') {
  if (/[.!?]/.test(char)) return 170;
  if (/[,;:]/.test(char)) return 120;
  if (!char.trim()) return 54;
  return lang === 'tr-TR' ? 70 : 76;
}

type SpeechSegment = { text: string; lang: 'tr-TR' | 'ru-RU' | 'en-US' };
const TURKISH_TEXT_RE = /[çğıöşüâîûÇĞİÖŞÜ]/;

function splitSpeechSegments(text: string): SpeechSegment[] {
  const targetTag: SpeechSegment['lang'] = isEnglish() ? 'en-US' : 'ru-RU';
  const labelLatin = (chunk: string): SpeechSegment['lang'] =>
    TURKISH_TEXT_RE.test(chunk) ? 'tr-TR' : targetTag;
  const segments: SpeechSegment[] = [];
  const russianPattern = /[\u0400-\u04FF]+(?:[\s,.!?;:()[\]{}«»"'`´’‘“”\-—–]*[\u0400-\u04FF]+)*[\s!?.,;:]*/g;
  let cursor = 0;
  for (const match of text.matchAll(russianPattern)) {
    const start = match.index ?? cursor;
    const turkish = text.slice(cursor, start).trim();
    if (turkish) segments.push({ text: turkish, lang: labelLatin(turkish) });
    const russian = match[0].trim();
    if (russian) segments.push({ text: russian, lang: 'ru-RU' });
    cursor = start + match[0].length;
  }
  const remainder = text.slice(cursor).trim();
  if (remainder) segments.push({ text: remainder, lang: labelLatin(remainder) });
  return segments.length > 0 ? segments : [{ text, lang: labelLatin(text) }];
}

/* ─────────────────── ZENGİN CEVAP RENDER'I ───────────────────
 * Ajan cevapları "**kalın**", bölüm başlıkları ve hizalı tablo satırları içerir.
 * Düz metin olarak basmak bu yapıyı görünmez kılıyordu; aşağıdaki hafif
 * biçimlendirici bölümleri, vurguları ve tabloları gerçek görsel bloklara çevirir.
 */

const SECTION_STYLES: { match: RegExp; color: string; background: string }[] = [
  { match: /^⚡/, color: '#fde68a', background: 'rgba(245,158,11,.12)' },
  { match: /^📘/, color: '#bae6fd', background: 'rgba(56,189,248,.10)' },
  { match: /^📊/, color: '#c7d2fe', background: 'rgba(99,102,241,.12)' },
  { match: /^🧩/, color: '#bbf7d0', background: 'rgba(34,197,94,.10)' },
  { match: /^🔍/, color: '#e9d5ff', background: 'rgba(168,85,247,.10)' },
  { match: /^⚠️/, color: '#fecaca', background: 'rgba(239,68,68,.10)' },
  { match: /^🎯/, color: '#99f6e4', background: 'rgba(20,184,166,.10)' },
  { match: /^🔗/, color: '#cbd5e1', background: 'rgba(148,163,184,.10)' },
];

function inlineBold(text: string, keyPrefix: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((chunk, index) => {
    if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length > 4) {
      return <strong key={`${keyPrefix}-b${index}`} style={{ color: '#f8fafc', fontWeight: 900 }}>{chunk.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={`${keyPrefix}-t${index}`}>{chunk}</React.Fragment>;
  });
}

function isSectionHeading(line: string) {
  return SECTION_STYLES.some(style => style.match.test(line)) && line === line.toLocaleUpperCase('tr-TR');
}

function AnswerBody({ text, onSpeakSection }: { text: string; onSpeakSection?: (scope: SpeechScope, label: string) => void }) {
  const blocks = text.split('\n\n');
  return (
    <div style={{ display: 'grid', gap: '9px' }}>
      {blocks.map((block, blockIndex) => {
        const lines = block.split('\n');
        const heading = lines[0] ?? '';
        const style = SECTION_STYLES.find(entry => entry.match.test(heading));

        if (style && isSectionHeading(heading)) {
          const body = lines.slice(1);
          // Girintili satırlar hizalı tablodur; tek boşluklu font ile göster.
          const monospace = body.some(line => /^\s{2,}/.test(line) || /\s{2,}\S/.test(line));
          return (
            <div key={`blk-${blockIndex}`} style={{ borderRadius: '11px', background: style.background, border: `1px solid ${style.color}22`, padding: '8px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: body.length ? '5px' : 0 }}>
                <div style={{ color: style.color, fontSize: '10.5px', fontWeight: 950, letterSpacing: '.7px' }}>{heading}</div>
                {onSpeakSection && (
                  <button
                    type="button"
                    title={`Bu bölümü seslendir: ${heading}`}
                    aria-label={`Bu bölümü seslendir: ${heading}`}
                    onClick={() => onSpeakSection(heading.replace(/^[^\p{L}]+/u, '').trim().toLocaleLowerCase('tr-TR'), heading)}
                    style={{ border: 'none', background: 'transparent', color: style.color, cursor: 'pointer', fontSize: '12px', lineHeight: 1, opacity: .75, padding: '0 2px' }}
                  >
                    🔊
                  </button>
                )}
              </div>
              {body.length > 0 && (
                <div style={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: monospace ? 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' : 'inherit',
                  fontSize: monospace ? '11.5px' : '12.5px',
                  lineHeight: monospace ? 1.6 : 1.55,
                  color: '#e2e8f0',
                  overflowX: 'auto',
                }}>
                  {body.map((line, lineIndex) => (
                    <React.Fragment key={`blk-${blockIndex}-l${lineIndex}`}>
                      {inlineBold(line, `blk-${blockIndex}-l${lineIndex}`)}
                      {lineIndex < body.length - 1 ? '\n' : ''}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <div key={`blk-${blockIndex}`} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#e2e8f0' }}>
            {lines.map((line, lineIndex) => (
              <React.Fragment key={`blk-${blockIndex}-p${lineIndex}`}>
                {inlineBold(line, `blk-${blockIndex}-p${lineIndex}`)}
                {lineIndex < lines.length - 1 ? '\n' : ''}
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/** Sohbet boşken gösterilen, motorun en güçlü yeteneklerini sergileyen başlangıç soruları. */
const STARTER_PROMPTS = isEnglish()
  ? ['Present Perfect ile Past Simple farkı', '«get up» ne demek?', 'in / on / at nasıl seçilir?', 'Bana günlük çalışma planı çıkar', 'Zayıf konularım neler?']
  : ['«книга» kelimesinin hâllerini göster', '«читать» fiilini çekimle', 'в ve на farkı nedir?', '«хорошо» nasıl okunur?', 'Zayıf konularım neler?'];

/* ─────────────── SESLENDİRME KAPSAMI ───────────────
 * Cevaplar bölümlü üretildiği için tamamını okutmak uzun sürüyordu.
 * Varsayılan olarak yalnızca "⚡ KISA CEVAP" seslendirilir; kullanıcı
 * ister düğmeyle ister "neden böyle kısmını da oku" gibi bir komutla
 * istediği bölümü ayrıca dinleyebilir.
 */

export type SpeechScope = 'short' | 'full' | string;

interface AnswerSection {
  key: string;
  heading: string;
  body: string;
}

/** Cevap metnini "⚡ KISA CEVAP", "📘 NEDEN BÖYLE" gibi bölümlere ayırır. */
export function parseSections(text: string): AnswerSection[] {
  const sections: AnswerSection[] = [];
  for (const block of text.split('\n\n')) {
    const lines = block.split('\n');
    const heading = (lines[0] ?? '').trim();
    if (!SECTION_STYLES.some(style => style.match.test(heading)) || heading !== heading.toLocaleUpperCase('tr-TR')) continue;
    const key = heading.replace(/^[^\p{L}]+/u, '').trim().toLocaleLowerCase('tr-TR');
    sections.push({ key, heading, body: lines.slice(1).join('\n').trim() });
  }
  return sections;
}

/** Seslendirmeden önce metni sadeleştirir: yıldızlar, madde imleri, tablo girintileri. */
function speechFriendly(text: string): string {
  return text
    .replace(/\*\*/g, '')
    // Emoji ve simgeler sesli okunduğunda anlamsız ses çıkarır veya atlanır.
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{2190}-\u{21FF}]/gu, ' ')
    .replace(/^[•▸]\s*/gm, '')
    .replace(/^\s{2,}/gm, '')
    .replace(/[↳→]/g, ',')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, '. ')
    .replace(/\.\s*\./g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Verilen kapsama göre seslendirilecek metni çıkarır. */
export function textForScope(answer: string, scope: SpeechScope): string {
  const sections = parseSections(answer);
  if (sections.length === 0) return speechFriendly(answer);
  if (scope === 'full') return speechFriendly(sections.map(section => `${section.heading}. ${section.body}`).join('\n\n'));
  if (scope === 'short') {
    const short = sections.find(section => section.key.startsWith('kisa') || section.key.startsWith('kısa')) ?? sections[0];
    return speechFriendly(short.body || short.heading);
  }
  const wanted = sections.find(section => section.key === scope);
  return wanted ? speechFriendly(wanted.body || wanted.heading) : speechFriendly(answer);
}

/**
 * Kullanıcının mesajı bir SESLENDİRME KOMUTU mu?
 * Örn. "neden böyle kısmını da oku", "tabloyu oku", "hepsini seslendir".
 * Böyle bir komut ajana soru olarak gönderilmez; son cevabın ilgili bölümü okunur.
 */
const SPEECH_SECTION_TRIGGERS: { scope: SpeechScope; label: string; patterns: RegExp }[] = [
  { scope: 'full', label: 'tamamı', patterns: /(hepsini|hepsi|tamamini|tamamını|tumunu|tümünü|butun|bütün|komple|basindan sonuna)/ },
  { scope: 'kisa cevap', label: 'kısa cevap', patterns: /(kisa cevab|kısa cevab|kisa cevap|kısa cevap|ozeti|özeti|ozet|özet)/ },
  { scope: 'neden boyle', label: 'neden böyle', patterns: /(neden boyle|neden böyle|aciklama|açıklama|nedenini|gerekce|gerekçe)/ },
  { scope: 'tablo', label: 'tablo', patterns: /(tabloyu|tablo)/ },
  { scope: 'ornekler', label: 'örnekler', patterns: /(ornekler|örnekler|ornegi|örneği|ornek cumle|örnek cümle)/ },
  { scope: 'ince ayar', label: 'ince ayar', patterns: /(ince ayar|detay|ayrinti|ayrıntı)/ },
  { scope: 'turk ogrenci tuzagi', label: 'tuzak', patterns: /(tuzag|tuzağ|tuzak|sik yapilan hata|sık yapılan hata)/ },
  { scope: 'mini alistirma', label: 'alıştırma', patterns: /(alistirma|alıştırma|pratigi|pratiği|pratik)/ },
  { scope: 'siradaki adim', label: 'sıradaki adım', patterns: /(siradaki adim|sıradaki adım|sonraki adim|sonraki adım)/ },
];

const SPEECH_VERB = /(oku|okur musun|okusana|seslendir|sesli soyle|sesli söyle|soyle|söyle|dinletir misin|dinlemek istiyorum|sesli oku)/;

export function detectSpeechCommand(raw: string): { scope: SpeechScope; label: string } | null {
  const query = raw
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!query || query.split(' ').length > 9) return null;
  if (!SPEECH_VERB.test(query)) return null;
  // Kiril harf veya tırnak içeren mesaj bir seslendirme komutu değil, içerik sorusudur
  // (ör. «хорошо» nasıl okunur?).
  if (/[\u0400-\u04FF]/.test(raw) || /[«»""'']/.test(raw)) return null;
  for (const trigger of SPEECH_SECTION_TRIGGERS) {
    if (trigger.patterns.test(query)) return { scope: trigger.scope, label: trigger.label };
  }
  // Sadece "oku" / "devamını oku" denmişse tamamını oku.
  if (/(devam|gerisini|kalanini|kalanını)/.test(query)) return { scope: 'full', label: 'tamamı' };
  return null;
}

const CONFIDENCE_STYLE: Record<'yüksek' | 'orta' | 'düşük', { label: string; color: string; background: string }> = {
  'yüksek': { label: 'yüksek güven', color: '#86efac', background: 'rgba(34,197,94,.16)' },
  'orta': { label: 'orta güven', color: '#fde68a', background: 'rgba(245,158,11,.16)' },
  'düşük': { label: 'düşük güven', color: '#fca5a5', background: 'rgba(239,68,68,.16)' },
};

/**
 * Ajan bir cümle düzeltmesi yaptıysa, düzeltilen biçimi ve gerekçesini çıkarır;
 * böylece kullanıcı tek dokunuşla bunu koçun hata defterine kaydedebilir.
 */
function extractCorrection(text: string, sources: string[] | undefined): { corrected: string; reason: string } | null {
  if (!sources?.some(source => source.includes('gramer kural motoru'))) return null;
  const corrected = text.match(/✅ Doğru biçim: \*\*(.+?)\*\*/);
  if (!corrected) return null;
  const reason = text.match(/\*\*Kural:\*\*\s*(.+)/);
  return { corrected: corrected[1].trim(), reason: (reason?.[1] || 'Yerel gramer kural motoru düzeltmesi').trim() };
}

/** Ajan cevabından SRS'e eklenebilecek ilk hedef-dil kelimesini çıkarır. */
function extractTargetTerm(text: string): string | null {
  const pattern = isEnglish() ? /\*\*([A-Za-z][A-Za-z' -]{2,28})\*\*/ : /\*\*([\u0400-\u04FF][\u0400-\u04FF' -]{1,28})\*\*/;
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

export default function AiChat(props: AiChatProps) {
  const [messages, setMessages] = useState<ChatEntry[]>(restoreChat);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(() => localStorage.getItem(AUTO_SPEAK_KEY) !== '0');
  // Varsayılan seslendirme kapsamı: yalnızca kısa cevap mı, cevabın tamamı mı?
  const [speakScope, setSpeakScope] = useState<'short' | 'full'>(() => (localStorage.getItem(SPEAK_SCOPE_KEY) === 'full' ? 'full' : 'short'));
  const [showVoiceStudio, setShowVoiceStudio] = useState(false);
  const [status, setStatus] = useState(langMeta().code === 'en' ? '🧠 Yerel İngilizce zekası hazır • 0 token' : '🧠 Yerel Rusça zekası hazır • 0 token');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mouthViseme, setMouthViseme] = useState<MouthViseme>('rest');
  /** Seslendirilen cümlenin jesti: kolların ne yapacağını bunu belirler. */
  const [speakPose, setSpeakPose] = useState<PlanetPose>(PLANET_POSE_IDLE);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const mouthTimerRef = useRef<number | null>(null);
  const speechRunRef = useRef(0);
  const [embedded] = useState(() => isInsideIframe());

  const contextPreview = useMemo(() => `${props.learningFocus.icon} ${props.learningFocus.title} • ${props.learningFocus.pathPosition}/${props.learningFocus.pathTotal}`, [props.learningFocus]);

  /**
   * Gezegenin şu anki jesti. Öncelik sırası bilerek böyle:
   * mikrofon açıkken el kulağa gider, ajan yanıt ararken el çeneye iner,
   * seslendirme sırasında ise jest *okunan cümleden* gelir (animateMouth günceller).
   */
  const planetPose = useMemo<PlanetPose>(() => {
    if (isListening) return PLANET_POSE_LISTEN;
    if (busy && !isSpeaking) {
      // Son kullanıcı mesajı bir soruysa gezegen avuçlarını açar, düz bir
      // talimat/tekrarsa çenesine gider.
      const lastQuestion = [...messages].reverse().find(message => message.role === 'user')?.text ?? '';
      return /\?|ne demek|nedir|nasıl|neden|hangi/.test(lastQuestion) ? PLANET_POSE_ASKING : PLANET_POSE_THINK;
    }
    if (isSpeaking) return speakPose;
    return PLANET_POSE_IDLE;
  }, [isListening, busy, isSpeaking, speakPose, messages]);

  const stopMouthAnimation = () => {
    if (mouthTimerRef.current !== null) {
      window.clearTimeout(mouthTimerRef.current);
      mouthTimerRef.current = null;
    }
    setMouthViseme('rest');
    setSpeakPose(PLANET_POSE_IDLE);
  };

  const animateMouth = (text: string, lang: 'tr-TR' | 'ru-RU' | 'en-US') => {
    stopMouthAnimation();
    const chars = Array.from(text || ' ');
    // Her karakterin okunduğu anda hangi cümlede olunduğu önceden hesaplanır;
    // kol jesti metni okurken cümle cümle kendini günceller.
    const poseTrack = planetPoseTrack(chars);
    let index = 0;
    let lastGesture = '';
    const tick = () => {
      const char = chars[index % chars.length];
      setMouthViseme(visemeForChar(char));
      const pose = poseTrack[index % poseTrack.length];
      if (pose && pose.gesture !== lastGesture) {
        lastGesture = pose.gesture;
        setSpeakPose(pose);
      }
      index += 1;
      mouthTimerRef.current = window.setTimeout(tick, visemeDelayForChar(char, lang));
    };
    tick();
  };

  const stopSpeech = () => {
    speechRunRef.current += 1;
    stopMouthAnimation();
    setIsSpeaking(false);
    stopBotVoice();
  };

  const appendTranscript = (transcript: string) => {
    const clean = transcript.trim();
    if (!clean) return;
    setIsListening(false);
    setInput(clean);
    setStatus('Mikrofonun duyuldu. AI yanıt hazırlıyor…');
    window.setTimeout(() => { void send(undefined, clean); }, 0);
  };

  const openChatInNewTab = () => {
    if (typeof window === 'undefined') return;
    const opened = window.open(window.location.href, '_blank', 'noopener,noreferrer');
    if (!opened) setStatus('Yeni sekme açılamadı. Tarayıcı adresini yeni sekmede açıp mikrofon izni ver.');
  };

  const startListening = async () => {
    if (isSpeaking || isListening || busy) return;
    setIsListening(true);
    setStatus('Dinliyorum… Türkçe konuşabilirsin.');

    try {
      const availability = await NativeSpeechRecognition.available();
      if (availability.available) {
        const permission = await NativeSpeechRecognition.checkPermissions().catch(() => ({ speechRecognition: 'prompt' as const }));
        if (permission.speechRecognition !== 'granted') {
          const requested = await NativeSpeechRecognition.requestPermissions();
          if (requested.speechRecognition !== 'granted') throw new Error('permission-denied');
        }
        const result = await NativeSpeechRecognition.start({ language: 'tr-TR', maxResults: 3, popup: false, partialResults: false, prompt: 'Sorunu Türkçe söyle' });
        setIsListening(false);
        const transcript = result.matches?.[0] || '';
        if (transcript) appendTranscript(transcript);
        else setStatus('Ses duyulmadı. Tekrar mikrofon düğmesine basabilirsin.');
        return;
      }
    } catch (error) {
      if ((error as { message?: string }).message === 'permission-denied') {
        setIsListening(false);
        setStatus('Mikrofon izni verilmedi. Tarayıcı/site ayarlarından mikrofonu aç.');
        return;
      }
      await NativeSpeechRecognition.stop().catch(() => undefined);
    }

    const Recognition = getSpeechRecognitionConstructor();
    if (!Recognition) {
      setIsListening(false);
      setStatus('Bu tarayıcı konuşma tanımayı desteklemiyor. Sorunu yazabilirsin.');
      return;
    }
    try {
      const recognition = new Recognition();
      recognitionRef.current = recognition;
      recognition.lang = 'tr-TR';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;
      recognition.onresult = (event) => appendTranscript(event.results[0]?.[0]?.transcript || '');
      recognition.onerror = (event) => {
        setIsListening(false);
        const code = event.error || event.message || 'bilinmeyen hata';
        setStatus(code === 'not-allowed' || code === 'service-not-allowed'
          ? 'Mikrofon izni verilmedi. Önizleme içindeysen sayfayı yeni sekmede açıp mikrofon izni ver.'
          : code === 'no-speech' ? 'Ses duyulmadı. Tekrar deneyebilir veya sorunu yazabilirsin.' : `Mikrofon durdu: ${code}.`);
      };
      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };
      recognition.start();
    } catch {
      setIsListening(false);
      setStatus('Mikrofon başlatılamadı. İzni kontrol et veya sorunu yaz.');
    }
  };

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      recognitionRef.current?.abort();
      void NativeSpeechRecognition.stop().catch(() => undefined);
      stopSpeech();
    };
  }, []);

  const persist = (next: ChatEntry[]) => {
    const trimmed = next.slice(-24);
    setMessages(trimmed);
    // Sohbet geçmişi cihazda kalır; sayfa yenilenince konuşma kaybolmaz.
    try { localStorage.setItem(CHAT_KEY, JSON.stringify(trimmed)); } catch {}
  };

  const copyAnswer = async (text: string) => {
    // Markdown vurgularını temizleyip düz metin olarak panoya kopyala.
    const plain = text.replace(/\*\*/g, '');
    try {
      await navigator.clipboard.writeText(plain);
      setStatus('Cevap panoya kopyalandı.');
    } catch {
      setStatus('Panoya kopyalanamadı; metni elle seçebilirsin.');
    }
  };

  const speakAnswer = async (text: string, scope: SpeechScope = 'short') => {
    const spoken = textForScope(text, scope);
    if (!spoken) return;
    const runId = speechRunRef.current + 1;
    speechRunRef.current = runId;
    stopBotVoice();
    setIsSpeaking(true);
    // Ses motoru (VoiceStudio/cloud) o an hazır değilse maskot "taklit" moduna geçer:
    // ağız ve kollar tahmini okuma süresi boyunca hareket etmeye devam eder. Böylece
    // ses yokken ajanın konuşması bir anda kesilmiş görünmez, jestler cümleyi izler.
    const startedAt = Date.now();
    const mimicMs = Math.min(8200, 600 + spoken.length * 46);
    let realVoice = false;
    try {
      for (const segment of splitSpeechSegments(spoken)) {
        if (speechRunRef.current !== runId) return;
        animateMouth(segment.text, segment.lang);
        const usedAiVoice = await speakWithBotVoice(segment.text, 1);
        if (usedAiVoice) realVoice = true;
      }
      if (!realVoice) {
        setStatus('🔇 Ses motoru hazır değil — gezegen sessiz taklit ediyor; kollar yine cümleye göre sallanıyor.');
      }
    } finally {
      if (speechRunRef.current === runId) {
        if (!realVoice) {
          const left = mimicMs - (Date.now() - startedAt);
          if (left > 0) await new Promise<void>(resolve => { window.setTimeout(resolve, left); });
        }
        if (speechRunRef.current === runId) {
          stopMouthAnimation();
          setIsSpeaking(false);
        }
      }
    }
  };

  const send = async (event?: React.FormEvent, forcedQuery?: string) => {
    event?.preventDefault();
    const query = (forcedQuery || input).trim();
    if (!query || busy) return;

    // "neden böyle kısmını da oku", "tabloyu oku", "hepsini seslendir" gibi mesajlar
    // ajana soru olarak gitmez; son cevabın istenen bölümü seslendirilir.
    const speechCommand = detectSpeechCommand(query);
    const lastAnswer = [...messages].reverse().find(message => message.role === 'assistant');
    if (speechCommand && lastAnswer) {
      setInput('');
      const spoken = textForScope(lastAnswer.text, speechCommand.scope);
      if (!spoken) {
        setStatus(`Son cevapta "${speechCommand.label}" bölümü yok.`);
        return;
      }
      setStatus(`🔊 Okunuyor: ${speechCommand.label}`);
      void speakAnswer(lastAnswer.text, speechCommand.scope);
      return;
    }

    abortRef.current?.abort();
    stopSpeech();
    const controller = new AbortController();
    abortRef.current = controller;
    const userEntry: ChatEntry = { id: `user-${Date.now()}`, role: 'user', text: query };
    const next = [...messages, userEntry].slice(-24);
    persist(next);
    setInput('');
    setBusy(true);
    setStatus(langMeta().code === 'en' ? 'Yerel İngilizce motoru bilgi bankasını tarıyor…' : 'Yerel Rusça motoru bilgi bankasını tarıyor…');

    const cacheable = !/nerede kald|seviyem|ilerlemem|hangi ünite|hangi unite|konumum/i.test(query);
    const cached = cacheable ? await getLocalAnswerCache(query, props.learningFocus.title) : null;
    if (controller.signal.aborted) return;
    const answer = cached || answerWithLocalRussianAgent(query, {
      pathPosition: props.learningFocus.pathPosition,
      pathTotal: props.learningFocus.pathTotal,
      focusTitle: props.learningFocus.title,
      completedUnits: props.completedUnits.length,
      completedTopics: props.completedTopics.length,
      completedAlpha: props.completedAlpha.length,
      completedGrammar: props.completedGrammar.length,
      recentUserQueries: messages.filter(message => message.role === 'user').slice(-3).map(message => message.text),
      mistakes: props.mistakes,
      srsBank: props.srsBank,
    });
    if (!cached && cacheable) void putLocalAnswerCache(query, props.learningFocus.title, answer);
    const assistantEntry: ChatEntry = {
      id: `local-${Date.now()}`,
      role: 'assistant',
      text: answer.text,
      provider: cached ? 'yerel zeka · önbellek' : 'yerel zeka',
      sources: answer.sources,
      followUps: answer.followUps,
      depth: answer.depth,
      confidence: answer.confidence,
    };
    persist([...next, assistantEntry]);
    // Soru sormak öğrenme davranışıdır; küçük ama düzenli ödüllendirilir.
    if (!cached && answer.confidence !== 'düşük') props.onEarnXp?.(2);
    setStatus(`🧠 ${cached ? 'Önbellekten anında' : 'Yerel zeka'} yanıtladı • ${answer.confidence} güven${answer.depth ? ` • ${answer.depth} bilgi noktası` : ''} • 0 token`);
    if (autoSpeak) void speakAnswer(answer.text, speakScope);
    if (abortRef.current === controller) abortRef.current = null;
    setBusy(false);
  };

  const clearChat = () => {
    abortRef.current?.abort();
    stopSpeech();
    try { localStorage.removeItem(CHAT_KEY); } catch {}
    setMessages(initialChat());
    setStatus(langMeta().code === 'en' ? '🧠 Yerel İngilizce zekası hazır • 0 token' : '🧠 Yerel Rusça zekası hazır • 0 token');
  };

  const toggleSpeakScope = () => {
    setSpeakScope(current => {
      const next = current === 'short' ? 'full' : 'short';
      localStorage.setItem(SPEAK_SCOPE_KEY, next);
      setStatus(next === 'short'
        ? 'Otomatik seslendirme artık yalnızca ⚡ KISA CEVAP bölümünü okuyacak.'
        : 'Otomatik seslendirme artık cevabın tamamını okuyacak.');
      return next;
    });
  };

  const toggleAutoSpeak = () => {
    setAutoSpeak(current => {
      const next = !current;
      localStorage.setItem(AUTO_SPEAK_KEY, next ? '1' : '0');
      return next;
    });
  };

  return (
    <section style={{ marginBottom: '16px', borderRadius: '20px', padding: '16px', background: 'linear-gradient(135deg, rgba(34,197,94,.12), rgba(56,189,248,.12), #0f172a)', border: '1px solid rgba(56,189,248,.52)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: '#86efac', fontSize: '11px', fontWeight: 950, letterSpacing: '.6px' }}>🧠 {isEnglish() ? 'YEREL İNGİLİZCE ZEKASI' : 'YEREL RUSÇA ZEKASI'} • API YOK • TOKEN YOK</div>
          <h2 style={{ margin: '5px 0 4px', color: '#f8fafc', fontSize: '21px' }}>Sorunu yaz, {isEnglish() ? 'İngilizceyi' : 'Rusçayı'} birlikte konuşalım</h2>
          <div style={{ display: 'flex', gap: '7px', alignItems: 'center', flexWrap: 'wrap', color: '#cbd5e1', fontSize: '12px' }}>
            <span style={{ padding: '4px 8px', borderRadius: '999px', background: 'rgba(56,189,248,.14)', color: '#bae6fd', fontWeight: 800 }}>{contextPreview}</span>
            <span style={{ padding: '4px 8px', borderRadius: '999px', background: 'rgba(34,197,94,.14)', color: '#86efac', fontWeight: 800 }}>📚 {RUSSIAN_KNOWLEDGE_BASE.length} bölüm • {LOCAL_RUSSIAN_FACT_COUNT.toLocaleString('tr-TR')} bilgi • ≤ {LOCAL_INTELLIGENCE_MAX_LABEL}</span>
            <span>{status}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
          <button onClick={toggleAutoSpeak} style={{ border: '1px solid #334155', background: 'rgba(15,23,42,.75)', color: '#cbd5e1', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '11px' }}>{autoSpeak ? '🔊 Ses açık' : '🔇 Ses kapalı'}</button>
          <button
            onClick={toggleSpeakScope}
            title="Otomatik seslendirme kapsamı: yalnızca kısa cevap mı, cevabın tamamı mı?"
            style={{ border: '1px solid #38bdf8', background: 'rgba(56,189,248,.12)', color: '#bae6fd', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '11px' }}
          >
            {speakScope === 'short' ? '⚡ Sadece kısa cevap' : '📖 Cevabın tamamı'}
          </button>
          <button onClick={() => setShowVoiceStudio(value => !value)} style={{ border: '1px solid #a855f7', background: 'rgba(168,85,247,.12)', color: '#e9d5ff', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '11px' }}>🎚️ Ses Stüdyosu</button>
          <button onClick={clearChat} style={{ border: '1px solid #475569', background: 'transparent', color: '#94a3b8', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '11px' }}>Temizle</button>
        </div>
      </div>

      {showVoiceStudio && <VoiceStudioPanel />}

      <VoicePlanet
        viseme={mouthViseme}
        pose={planetPose}
        speaking={isSpeaking}
        listening={isListening}
        thinking={busy}
      />

      <div style={{ marginTop: '14px', minHeight: '130px', maxHeight: '420px', overflowY: 'auto', display: 'grid', gap: '10px', padding: '4px' }}>
        {messages.map(message => {
          const badge = message.confidence ? CONFIDENCE_STYLE[message.confidence] : null;
          const term = message.role === 'assistant' ? extractTargetTerm(message.text) : null;
          const correction = message.role === 'assistant' ? extractCorrection(message.text, message.sources) : null;
          return (
            <div
              key={message.id}
              style={{
                justifySelf: message.role === 'user' ? 'end' : 'start',
                width: message.role === 'user' ? 'min(88%, 560px)' : 'min(96%, 720px)',
                padding: message.role === 'user' ? '10px 12px' : '11px 13px',
                borderRadius: message.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                color: '#f8fafc',
                background: message.role === 'user' ? '#1d4ed8' : 'rgba(15,23,42,.92)',
                border: `1px solid ${message.role === 'user' ? '#3b82f6' : '#334155'}`,
                lineHeight: 1.55,
                fontSize: '13px',
              }}
            >
              {message.role === 'assistant'
                ? (
                  <AnswerBody
                    text={message.text}
                    onSpeakSection={(scope, label) => {
                      setStatus(`🔊 Okunuyor: ${label}`);
                      void speakAnswer(message.text, scope);
                    }}
                  />
                )
                : <div style={{ whiteSpace: 'pre-wrap' }}>{message.text}</div>}

              {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '9px' }}>
                  {message.sources.slice(0, 4).map((source, index) => (
                    <span key={`${message.id}-src-${index}`} style={{ fontSize: '9.5px', fontWeight: 800, color: '#94a3b8', background: 'rgba(148,163,184,.12)', border: '1px solid rgba(148,163,184,.2)', borderRadius: '999px', padding: '3px 7px' }}>
                      📎 {source}
                    </span>
                  ))}
                </div>
              )}

              {message.role === 'assistant' && message.followUps && message.followUps.length > 0 && (
                <div style={{ marginTop: '10px', borderTop: '1px dashed #334155', paddingTop: '9px' }}>
                  <div style={{ color: '#7dd3fc', fontSize: '9.5px', fontWeight: 950, letterSpacing: '.6px', marginBottom: '6px' }}>↪️ DEVAMINDA ŞUNU SORABİLİRSİN</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {message.followUps.slice(0, 4).map((followUp, index) => (
                      <button
                        key={`${message.id}-fu-${index}`}
                        type="button"
                        disabled={busy || isSpeaking || isListening}
                        onClick={() => void send(undefined, followUp)}
                        style={{ border: '1px solid rgba(56,189,248,.45)', background: 'rgba(56,189,248,.10)', color: '#bae6fd', borderRadius: '999px', padding: '5px 10px', fontSize: '11px', fontWeight: 800, cursor: busy ? 'wait' : 'pointer', textAlign: 'left' }}
                      >
                        {followUp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center', marginTop: '9px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ color: '#64748b', fontSize: '10px' }}>{message.provider || (message.role === 'user' ? 'sen' : 'ajan')}</span>
                  {badge && (
                    <span style={{ fontSize: '9.5px', fontWeight: 900, color: badge.color, background: badge.background, borderRadius: '999px', padding: '2px 7px' }}>{badge.label}</span>
                  )}
                  {typeof message.depth === 'number' && message.depth > 0 && (
                    <span style={{ fontSize: '9.5px', fontWeight: 900, color: '#c7d2fe', background: 'rgba(99,102,241,.16)', borderRadius: '999px', padding: '2px 7px' }}>🧠 {message.depth} bilgi noktası</span>
                  )}
                </div>
                {message.role === 'assistant' && (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {correction && props.addMistake && (
                      <button
                        type="button"
                        onClick={() => { props.addMistake?.(correction.corrected, correction.reason, correction.reason); setStatus('Bu düzeltme hata defterine kaydedildi.'); }}
                        title="Bu düzeltmeyi koçun hata defterine kaydet"
                        style={{ border: 'none', background: 'transparent', color: '#fca5a5', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}
                      >
                        📓 Hata defterime ekle
                      </button>
                    )}
                    {!correction && term && props.addToSRS && (
                      <button
                        type="button"
                        onClick={() => { props.addToSRS?.(term, '', 'word'); setStatus(`«${term}» tekrar kutusuna eklendi.`); }}
                        title="Bu kelimeyi aralıklı tekrar kutusuna ekle"
                        style={{ border: 'none', background: 'transparent', color: '#86efac', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}
                      >
                        ＋ Tekrara ekle
                      </button>
                    )}
                    <button onClick={() => void copyAnswer(message.text)} style={{ border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>⧉ Kopyala</button>
                    <button onClick={() => { setStatus('🔊 Okunuyor: kısa cevap'); void speakAnswer(message.text, 'short'); }} title="Yalnızca kısa cevabı seslendir" style={{ border: 'none', background: 'transparent', color: '#7dd3fc', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>🔊 Kısa cevap</button>
                    <button onClick={() => { setStatus('🔊 Okunuyor: cevabın tamamı'); void speakAnswer(message.text, 'full'); }} title="Cevabın tamamını seslendir" style={{ border: 'none', background: 'transparent', color: '#a5b4fc', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>🔊 Tamamı</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {busy && <div style={{ justifySelf: 'start', color: '#bae6fd', fontSize: '12px', padding: '8px 12px' }}>🧠 Bağlamını okuyorum, bilgi bankasını tarıyorum…</div>}
      </div>

      {messages.filter(message => message.role === 'user').length === 0 && (
        <div style={{ margin: '4px 0 10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {STARTER_PROMPTS.map(prompt => (
            <button
              key={prompt}
              type="button"
              disabled={busy || isSpeaking || isListening}
              onClick={() => void send(undefined, prompt)}
              style={{ border: '1px solid rgba(34,197,94,.42)', background: 'rgba(34,197,94,.10)', color: '#bbf7d0', borderRadius: '999px', padding: '6px 11px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={send} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px' }}>
        <textarea value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void send(); } }} disabled={busy || isSpeaking || isListening} rows={2} placeholder={isEnglish() ? 'Sorunu yaz… Örn. “get up” ne demek?' : 'Sorunu yaz… Örn. ‘Как тебя зовут?’ ne demek?'} style={{ resize: 'vertical', minWidth: 0, background: '#020617', border: '1px solid #334155', color: '#f8fafc', borderRadius: '13px', padding: '11px 12px', fontFamily: 'inherit', outline: 'none' }} />
        <button type="button" onClick={() => void startListening()} disabled={busy || isSpeaking || isListening} aria-label="Mikrofondan soru söyle" title="Mikrofondan soru söyle" style={{ alignSelf: 'stretch', minWidth: '52px', border: `1px solid ${isListening ? '#22c55e' : '#38bdf8'}`, borderRadius: '13px', background: isListening ? 'rgba(34,197,94,.18)' : 'rgba(56,189,248,.12)', color: isListening ? '#86efac' : '#bae6fd', fontSize: '20px', cursor: busy || isSpeaking || isListening ? 'wait' : 'pointer' }}>{isListening ? '●' : '🎙️'}</button>
        <button disabled={busy || isSpeaking || isListening || !input.trim()} style={{ alignSelf: 'stretch', minWidth: '92px', border: 'none', borderRadius: '13px', background: busy || isSpeaking ? '#475569' : 'linear-gradient(135deg, #22c55e, #38bdf8)', color: '#07111f', fontWeight: 950, cursor: busy || isSpeaking ? 'wait' : 'pointer' }}>{busy ? '…' : 'Sor →'}</button>
      </form>
      {embedded && (
        <div style={{ marginTop: '8px', padding: '9px 10px', borderRadius: '11px', background: 'rgba(245,158,11,.10)', border: '1px solid rgba(245,158,11,.38)', color: '#fde68a', fontSize: '11px', lineHeight: 1.45 }}>
          Önizleme çerçevesinde mikrofon izni engellenebilir. Çalışmazsa <button type="button" onClick={openChatInNewTab} style={{ border: '1px solid rgba(245,158,11,.7)', background: 'transparent', color: '#fde68a', borderRadius: '7px', padding: '4px 7px', fontWeight: 900, cursor: 'pointer' }}>yeni sekmede aç</button> ve mikrofon için İzin Ver.
        </div>
      )}
      <div style={{ color: '#64748b', fontSize: '10px', marginTop: '8px', lineHeight: 1.45 }}>
        Yalnızca yazdığın soruya göre konuşur. Türkçe açıklamayı, istediğin hedef dil kelime/cümle ve soru kalıplarıyla birlikte ele alır. Üniteler ve ilerlemen ajanın bağlamında tutulur; API anahtarı uygulamaya gömülmez.
        <br />
        🔊 <b>Seslendirme:</b> Varsayılan olarak yalnızca <b>⚡ KISA CEVAP</b> okunur. «neden böyle kısmını da oku», «tabloyu oku», «örnekleri seslendir» ya da «hepsini oku» yazabilir/söyleyebilirsin; her bölümün sağındaki 🔊 simgesi de o bölümü tek başına okur. Üstteki düğmeden varsayılanı «cevabın tamamı» yapabilirsin.
      </div>
    </section>
  );
}
