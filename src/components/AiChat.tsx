import { SpeechRecognition as NativeSpeechRecognition } from '@capacitor-community/speech-recognition';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { askFreeAgent, activeFreeAiLabel } from '../ai/freeAi';
import type { AgentMessage } from '../ai/freeAi';
import { speakWithBotVoice, stopBotVoice } from '../tts/voiceStudio';
import VoiceStudioPanel from './VoiceStudioPanel';
import { UNITS_DATA } from '../curriculumData';

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

type MouthViseme = 'rest' | 'closed' | 'open' | 'wide' | 'round' | 'teeth' | 'smile';
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
};

export interface AiChatProps {
  completedUnits: string[];
  completedTopics: string[];
  completedAlpha: string[];
  completedGrammar: string[];
  learningFocus: LearningFocus;
  mistakes: CoachMistake[];
  srsBank: SrsItem[];
}

const CHAT_KEY = 'dilkoc_ai_agent_chat_v1';
const AUTO_SPEAK_KEY = 'dilkoc_ai_agent_autospeak_v1';

function normalize(text: string) {
  return text.toLocaleLowerCase('tr-TR').replace(/[.,!?;:()[\]{}"'`´’‘“”\-—]/g, ' ');
}

function scoreUnit(unit: typeof UNITS_DATA[number], query: string, focusTitle: string) {
  const haystack = normalize(`${unit.unitNumber} ${unit.levelGroup} ${unit.title} ${unit.description} ${unit.category} ${unit.grammarExplain} ${unit.words.map(word => `${word.ru} ${word.tr}`).join(' ')}`);
  const tokens = normalize(query).split(/\s+/).filter(token => token.length > 2);
  let score = unit.title === focusTitle ? 12 : 0;
  for (const token of tokens) {
    if (haystack.includes(token)) score += unit.title.toLocaleLowerCase('tr-TR').includes(token) ? 5 : 1;
  }
  return score;
}

function unitPathNumber(unit: typeof UNITS_DATA[number]) {
  const idx = UNITS_DATA.findIndex(item => item.id === unit.id);
  return idx >= 0 ? idx + 1 : unit.unitNumber;
}

function compactUnit(unit: typeof UNITS_DATA[number]) {
  const words = unit.words.slice(0, 10).map(word => `${word.ru}=${word.tr}`).join(', ');
  const sentences = unit.sentences.slice(0, 3).map(sentence => `${sentence.ru} → ${sentence.tr}`).join(' | ');
  return `Ünite ${unitPathNumber(unit)} [${unit.levelGroup}] ${unit.title} (${unit.category}). Gramer: ${unit.grammarExplain.slice(0, 320)}. Kelimeler: ${words}. Örnekler: ${sentences}`;
}

function buildKnowledgeContext(query: string, props: AiChatProps) {
  const ranked = [...UNITS_DATA]
    .map((unit, order) => ({ unit, order, score: scoreUnit(unit, query, props.learningFocus.title) }))
    .sort((a, b) => b.score - a.score || a.order - b.order);
  const relevant = ranked.filter(item => item.score > 0).slice(0, 4).map(item => item.unit);
  const current = UNITS_DATA.find(unit => unit.title === props.learningFocus.title);
  if (current && !relevant.some(unit => unit.id === current.id)) relevant.unshift(current);

  const currentWords = props.learningFocus.words.slice(0, 14).map(word => `${word.ru}=${word.tr}`).join(', ');
  const currentSentences = props.learningFocus.sentences.slice(0, 5).map(sentence => `${sentence.ru} → ${sentence.tr}`).join(' | ');
  const mistakes = props.mistakes.slice(0, 8).map(item => `${item.ru}=${item.tr} (${item.reason})`).join(', ') || 'yok';
  const due = props.srsBank.filter(item => item.nextReview <= Date.now()).slice(0, 8).map(item => `${item.ru}=${item.tr}`).join(', ') || 'yok';
  const catalog = UNITS_DATA.map((unit, idx) => `${idx + 1}:${unit.title}`).join(' • ');

  return [
    `ÖĞRENENİN KONUMU: öğrenme yolu ${props.learningFocus.pathPosition}/${props.learningFocus.pathTotal}; ${props.learningFocus.icon} ${props.learningFocus.title}. Açıklama: ${props.learningFocus.description || 'yok'}.`,
    `İLERLEME: ${props.completedUnits.length} müfredat ünitesi, ${props.completedTopics.length} dinleme konusu, ${props.completedAlpha.length} alfabe/okuma dersi, ${props.completedGrammar.length} gramer temeli tamamlandı.`,
    `ŞU ANKİ KARTIN KELİMELERİ: ${currentWords || 'yok'}. ÖRNEKLER: ${currentSentences || 'yok'}.`,
    `ZAYIF NOKTALAR: ${mistakes}. BUGÜN VADESİ GELENLER: ${due}.`,
    `SORUYA EN YAKIN MÜFREDAT KARTLARI:\n${relevant.map(compactUnit).join('\n') || 'Eşleşen kart bulunamadı.'}`,
    `KURS KATALOĞU İNDEKSİ (kısa görünüm; tüm üniteler uygulamanın yerel veri tabanında mevcut): ${catalog}`,
  ].join('\n');
}

function offlineAnswer(query: string, props: AiChatProps) {
  const normalized = normalize(query);
  if (/rusça|rusca/.test(normalized) && /merhaba|selam/.test(normalized)) {
    return 'Rusçada “Привет!” samimi merhaba, “Здравствуйте!” ise resmî merhaba demektir. İstersen soru kalıbı olarak “Как дела?” yani “Nasılsın?” da kullanabilirsin.';
  }
  if (/nasılsın|nasilsin|naber/.test(normalized)) {
    return 'Rusçada “Как дела?” denir. Türkçesi “Nasılsın?”dır. Daha resmî bir konuşmada da aynı kalıbı kullanabilirsin.';
  }
  if (/teşekkür|tesekkur/.test(normalized)) {
    return 'Rusçada “Спасибо” teşekkür ederim demektir. Daha güçlü bir ifade için “Большое спасибо” yani “Çok teşekkür ederim” diyebilirsin.';
  }
  if (/adın|adin|ismin/.test(normalized)) {
    return 'Rusçada “Как тебя зовут?” samimi, “Как вас зовут?” resmî olarak “Adın ne?” demektir. Cevap: “Меня зовут …” yani “Benim adım …”.';
  }
  const whereQuestion = /nerede|hangi ünite|hangi unite|konum|kaldım|kaldim/.test(normalized);
  if (whereQuestion) {
    return `Şu an öğrenme yolunda ${props.learningFocus.pathPosition}/${props.learningFocus.pathTotal} konumundasın: ${props.learningFocus.title}.`;
  }
  return 'Çevrim içi AI bağlantısı şu an yanıt vermedi. Sorunu tekrar gönder; Türkçe açıklama ve istediğin Rusça soru kalıbıyla devam edelim.';
}

function initialChat(): ChatEntry[] {
  return [{
    id: 'welcome',
    role: 'assistant',
    text: 'Merhaba! Sorunu yazabilirsin. Türkçe anlatayım; istediğin yerde Rusça kelime, cümle ve soru kalıplarıyla birlikte çalışalım.',
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

function visemeDelayForChar(char: string, lang: 'tr-TR' | 'ru-RU') {
  if (/[.!?]/.test(char)) return 170;
  if (/[,;:]/.test(char)) return 120;
  if (!char.trim()) return 54;
  return lang === 'tr-TR' ? 70 : 76;
}

type SpeechSegment = { text: string; lang: 'tr-TR' | 'ru-RU' };

/** Türkçe açıklamayı ve içindeki Rusça örnekleri aynı seçili profille ayrı dil
 * segmentleri olarak okur. Böylece tek bir Rusça örnek, bütün cevabı Rusça
 * aksanıyla okutmaz. */
function splitSpeechSegments(text: string): SpeechSegment[] {
  const segments: SpeechSegment[] = [];
  const russianPattern = /[\u0400-\u04FF]+(?:[\s,.!?;:()[\]{}«»"'`´’‘“”\-—–]*[\u0400-\u04FF]+)*[\s!?.,;:]*/g;
  let cursor = 0;
  for (const match of text.matchAll(russianPattern)) {
    const start = match.index ?? cursor;
    const turkish = text.slice(cursor, start).trim();
    if (turkish) segments.push({ text: turkish, lang: 'tr-TR' });
    const russian = match[0].trim();
    if (russian) segments.push({ text: russian, lang: 'ru-RU' });
    cursor = start + match[0].length;
  }
  const remainder = text.slice(cursor).trim();
  if (remainder) segments.push({ text: remainder, lang: 'tr-TR' });
  return segments.length > 0 ? segments : [{ text, lang: 'tr-TR' }];
}

export default function AiChat(props: AiChatProps) {
  // Sohbet geçmişi artık localStorage'a yazılmaz. Böylece her yeni localhost
  // oturumunda kullanıcı eski/bozuk offline cevapları görmez.
  const [messages, setMessages] = useState<ChatEntry[]>(initialChat);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(() => localStorage.getItem(AUTO_SPEAK_KEY) !== '0');
  const [showVoiceStudio, setShowVoiceStudio] = useState(false);
  const [status, setStatus] = useState(`${activeFreeAiLabel()} hazır`);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mouthViseme, setMouthViseme] = useState<MouthViseme>('rest');
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const mouthTimerRef = useRef<number | null>(null);
  const speechRunRef = useRef(0);
  const [embedded] = useState(() => isInsideIframe());

  const contextPreview = useMemo(() => `${props.learningFocus.icon} ${props.learningFocus.title} • ${props.learningFocus.pathPosition}/${props.learningFocus.pathTotal}`, [props.learningFocus]);

  const mouthShapes: Record<MouthViseme, React.CSSProperties> = {
    rest: { width: '34px', height: '7px', borderRadius: '999px', top: '95px', background: '#061226' },
    closed: { width: '36px', height: '5px', borderRadius: '999px', top: '97px', background: '#061226' },
    open: { width: '30px', height: '30px', borderRadius: '50%', top: '84px', background: '#061226' },
    wide: { width: '50px', height: '14px', borderRadius: '999px', top: '92px', background: '#061226' },
    round: { width: '27px', height: '27px', borderRadius: '50%', top: '86px', background: '#061226' },
    teeth: { width: '44px', height: '12px', borderRadius: '9px', top: '93px', background: 'linear-gradient(180deg, #f8fafc 0 42%, #061226 43% 100%)' },
    smile: { width: '44px', height: '13px', borderRadius: '0 0 999px 999px', top: '93px', background: '#061226' },
  };

  const stopMouthAnimation = () => {
    if (mouthTimerRef.current !== null) {
      window.clearTimeout(mouthTimerRef.current);
      mouthTimerRef.current = null;
    }
    setMouthViseme('rest');
  };

  const animateMouth = (text: string, lang: 'tr-TR' | 'ru-RU') => {
    stopMouthAnimation();
    const chars = Array.from(text || ' ');
    let index = 0;
    const tick = () => {
      const char = chars[index % chars.length];
      setMouthViseme(visemeForChar(char));
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
    // Eski sürümlerde kaydedilmiş sohbeti de temizle; yeni oturumlar yalnızca
    // o sayfada yazılan konuşmayı taşır.
    try { localStorage.removeItem(CHAT_KEY); } catch { /* depolama isteğe bağlı */ }
  };

  const speakAnswer = async (text: string) => {
    const runId = speechRunRef.current + 1;
    speechRunRef.current = runId;
    stopBotVoice();
    setIsSpeaking(true);
    try {
      for (const segment of splitSpeechSegments(text)) {
        if (speechRunRef.current !== runId) return;
        animateMouth(segment.text, segment.lang);
        const usedAiVoice = await speakWithBotVoice(segment.text, 1);
        if (!usedAiVoice) {
          // Tarayıcı/Edge sesine düşme: gerçek VoiceStudio veya ücretsiz cloud
          // sesi yoksa bunu açıkça bildir; yanlış ses tonuyla sessizce okumayız.
          setStatus('VoiceStudio sesi hazır değil; tarayıcı sesi kullanılmadı.');
        }
      }
    } finally {
      if (speechRunRef.current === runId) {
        stopMouthAnimation();
        setIsSpeaking(false);
      }
    }
  };

  const send = async (event?: React.FormEvent, forcedQuery?: string) => {
    event?.preventDefault();
    const query = (forcedQuery || input).trim();
    if (!query || busy) return;
    abortRef.current?.abort();
    stopSpeech();
    const controller = new AbortController();
    abortRef.current = controller;
    const userEntry: ChatEntry = { id: `user-${Date.now()}`, role: 'user', text: query };
    const next = [...messages, userEntry].slice(-24);
    persist(next);
    setInput('');
    setBusy(true);
    setStatus('Hızlı AI düşünüyor…');

    const system: AgentMessage = {
      role: 'system',
      content: `Senin ana dilin Türkçe olan, DilKoç içindeki kişisel Rusça öğrenme ajanısın. Temel anlatım dilin doğal ve anlaşılır Türkçe olsun. Kullanıcı Rusça bir kelime, cümle veya soru kalıbı sorduğunda Rusça özgün yazımı ver; gerektiğinde Latin okunuşunu ve Türkçe anlamını ekle. Kullanıcı konuşma pratiği istediğinde Türkçe açıklamanın içinde doğal Rusça soru kalıpları kullan; örneğin «Как тебя зовут?» gibi kalıpları bağlama göre öğret. Kullanıcının yazdığı soruya doğrudan cevap ver, kısa ama öğretici ol. Kullanıcı bu uygulamadaki ünitelerin tamamını öğreniyor: yerel müfredat bilgisini kaynak kabul et, ünite/kelime uydurma. Bilgi bağlamında yoksa bunu açıkça söyle ve genel dil bilgisini ayrı belirt. Kullanıcının her mesajda nerede olduğunu dikkate al; bulunduğu seviyenin üzerinde uzun ve gereksiz gramer yükleme. Yanlışlarını yargılamadan düzelt. Kullanıcı istemedikçe günlük soru listesi, otomatik görev, telaffuz tekrarı, mikrofon alıştırması veya quiz başlatma; yalnızca kullanıcının sorusuna ve istediği Rusça kalıba göre konuş.\n\n${buildKnowledgeContext(query, props)}`,
    };
    const history: AgentMessage[] = next.slice(-12).map(item => ({ role: item.role, content: item.text }));

    try {
      const reply = await askFreeAgent([system, ...history], { signal: controller.signal });
      const assistantEntry: ChatEntry = { id: `assistant-${Date.now()}`, role: 'assistant', text: reply.text, provider: `${reply.provider} • ${reply.model}` };
      persist([...next, assistantEntry]);
      setStatus(`${reply.provider === 'puter' ? '☁️ Puter AI' : '🌐 Proxy'} yanıtladı • ${reply.model}`);
      if (autoSpeak) void speakAnswer(reply.text);
    } catch (error) {
      if ((error as { name?: string }).name === 'AbortError') return;
      const fallback = offlineAnswer(query, props);
      const assistantEntry: ChatEntry = { id: `offline-${Date.now()}`, role: 'assistant', text: fallback, provider: 'yerel hafıza' };
      persist([...next, assistantEntry]);
      setStatus('Çevrim içi AI bekleniyor; yerel öğrenme hafızası açık');
      if (autoSpeak) void speakAnswer(fallback);
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setBusy(false);
    }
  };

  const clearChat = () => {
    abortRef.current?.abort();
    stopSpeech();
    persist(initialChat());
    setStatus(`${activeFreeAiLabel()} hazır`);
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
      <style>{`
        @keyframes voicePlanetFloat { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-12px) rotate(1deg); } }
        @keyframes voicePlanetOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes voicePlanetRing { 0%, 100% { transform: translate(-50%, -50%) rotate(-15deg) scaleX(1); } 50% { transform: translate(-50%, -50%) rotate(-10deg) scaleX(1.05); } }
        @keyframes voicePlanetListen { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,.48), 0 0 42px rgba(56,189,248,.25); } 50% { box-shadow: 0 0 0 18px rgba(34,197,94,0), 0 0 58px rgba(34,197,94,.34); } }
        @keyframes voicePlanetTalk { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.025); } }
        .voice-planet-stage { position: relative; min-height: 264px; overflow: hidden; border-radius: 22px; margin-bottom: 14px; display: grid; place-items: center; background: radial-gradient(circle at 50% 12%, rgba(56,189,248,.25), transparent 31%), radial-gradient(circle at 18% 85%, rgba(245,158,11,.13), transparent 28%), linear-gradient(180deg, #050816 0%, #0f172a 58%, #111827 100%); border: 1px solid rgba(125,211,252,.24); box-shadow: inset 0 0 60px rgba(14,165,233,.08); }
        .voice-planet-stage::before, .voice-planet-stage::after { content: '✦'; position: absolute; color: #dbeafe; opacity: .72; font-size: 17px; animation: voicePlanetOrbit 5s ease-in-out infinite alternate; }
        .voice-planet-stage::before { left: 15%; top: 18%; }
        .voice-planet-stage::after { right: 14%; top: 34%; animation-delay: 1.2s; }
        .voice-planet-avatar { position: relative; width: 210px; height: 210px; display: grid; place-items: center; filter: drop-shadow(0 25px 44px rgba(14,165,233,.24)); animation: voicePlanetFloat 4.2s ease-in-out infinite; }
        .voice-planet-avatar.speaking { animation: voicePlanetTalk .42s ease-in-out infinite, voicePlanetFloat 4.2s ease-in-out infinite; }
        .voice-planet-avatar.listening { animation: voicePlanetListen 1.2s ease-in-out infinite, voicePlanetFloat 4.2s ease-in-out infinite; border-radius: 50%; }
        .voice-planet-orbit { position: absolute; inset: -29px; border: 1px dashed rgba(125,211,252,.25); border-radius: 50%; animation: voicePlanetOrbit 18s linear infinite; }
        .voice-planet-ring { position: absolute; left: 50%; top: 51%; width: 288px; height: 68px; transform: translate(-50%, -50%) rotate(-15deg); border-radius: 50%; background: linear-gradient(90deg, transparent 0%, rgba(250,204,21,.16) 15%, #facc15 36%, #fde68a 50%, #f59e0b 65%, rgba(250,204,21,.14) 84%, transparent 100%); box-shadow: 0 0 22px rgba(245,158,11,.26); animation: voicePlanetRing 3.6s ease-in-out infinite; }
        .voice-planet-ring::after { content: ''; position: absolute; inset: 17px 31px; border-radius: 50%; background: #071122; }
        .voice-planet-core { position: relative; width: 142px; height: 142px; border-radius: 50%; background: radial-gradient(circle at 30% 20%, #eff6ff 0 10%, #7dd3fc 25%, #2563eb 60%, #1e3a8a 100%); border: 3px solid rgba(191,219,254,.55); overflow: hidden; animation: voicePlanetFloat 4.2s ease-in-out infinite; box-shadow: inset -22px -28px 42px rgba(15,23,42,.38), inset 12px 12px 24px rgba(255,255,255,.24); }
        .voice-planet-core::before { content: ''; position: absolute; left: -18px; top: 38px; width: 182px; height: 38px; background: rgba(255,255,255,.16); transform: rotate(-18deg); border-radius: 999px; }
        .voice-planet-face { position: absolute; inset: 0; z-index: 2; }
        .voice-planet-eye { position: absolute; top: 50px; width: 15px; height: 20px; border-radius: 999px; background: #061226; box-shadow: inset 3px 5px 0 rgba(255,255,255,.18); }
        .voice-planet-eye.left { left: 42px; }
        .voice-planet-eye.right { right: 42px; }
        .voice-planet-mouth { position: absolute; left: 50%; transform: translateX(-50%); transition: width .075s linear, height .075s linear, top .075s linear, border-radius .075s linear, background .075s linear; box-shadow: inset 0 -4px 0 rgba(255,255,255,.08), 0 1px 0 rgba(255,255,255,.1); }
        .voice-planet-caption { position: absolute; bottom: 10px; z-index: 3; padding: 5px 10px; border-radius: 999px; background: rgba(2,6,23,.64); color: #bae6fd; font-size: 11px; font-weight: 900; }
        @media (max-width: 560px) { .voice-planet-stage { min-height: 238px; } .voice-planet-avatar { transform: scale(.88); } }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: '#86efac', fontSize: '11px', fontWeight: 950, letterSpacing: '.6px' }}>💬 KİŞİSEL AI AJANI • TÜRKÇE ANLATIM + RUSÇA SORU KALIPLARI</div>
          <h2 style={{ margin: '5px 0 4px', color: '#f8fafc', fontSize: '21px' }}>Sorunu yaz, Rusçayı birlikte konuşalım</h2>
          <div style={{ display: 'flex', gap: '7px', alignItems: 'center', flexWrap: 'wrap', color: '#cbd5e1', fontSize: '12px' }}>
            <span style={{ padding: '4px 8px', borderRadius: '999px', background: 'rgba(56,189,248,.14)', color: '#bae6fd', fontWeight: 800 }}>{contextPreview}</span>
            <span>{status}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
          <button onClick={toggleAutoSpeak} style={{ border: '1px solid #334155', background: 'rgba(15,23,42,.75)', color: '#cbd5e1', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '11px' }}>{autoSpeak ? '🔊 Ses açık' : '🔇 Ses kapalı'}</button>
          <button onClick={() => setShowVoiceStudio(value => !value)} style={{ border: '1px solid #a855f7', background: 'rgba(168,85,247,.12)', color: '#e9d5ff', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '11px' }}>🎚️ Ses Stüdyosu</button>
          <button onClick={clearChat} style={{ border: '1px solid #475569', background: 'transparent', color: '#94a3b8', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', fontWeight: 800, fontSize: '11px' }}>Temizle</button>
        </div>
      </div>

      {showVoiceStudio && <VoiceStudioPanel />}

      <div className="voice-planet-stage" aria-live="polite">
        <div className={`voice-planet-avatar ${isSpeaking ? 'speaking' : ''} ${isListening ? 'listening' : ''}`}>
          <div className="voice-planet-orbit" />
          <div className="voice-planet-ring" />
          <div className="voice-planet-core">
            <div className="voice-planet-face">
              <span className="voice-planet-eye left" />
              <span className="voice-planet-eye right" />
              <span className="voice-planet-mouth" style={mouthShapes[mouthViseme]} />
            </div>
          </div>
        </div>
        <div className="voice-planet-caption">
          {isSpeaking ? '🗣️ Konuşuyor…' : isListening ? '🎙️ Seni dinliyorum…' : '🪐 Hazır — sorunu yaz veya mikrofona konuş'}
        </div>
      </div>

      <div style={{ marginTop: '14px', minHeight: '130px', maxHeight: '340px', overflowY: 'auto', display: 'grid', gap: '8px', padding: '4px' }}>
        {messages.map(message => (
          <div key={message.id} style={{ justifySelf: message.role === 'user' ? 'end' : 'start', width: 'min(92%, 680px)', padding: '10px 12px', borderRadius: message.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', color: '#f8fafc', background: message.role === 'user' ? '#1d4ed8' : '#1e293b', border: `1px solid ${message.role === 'user' ? '#3b82f6' : '#334155'}`, lineHeight: 1.55, fontSize: '13px', whiteSpace: 'pre-wrap' }}>
            <div>{message.text}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center', marginTop: '7px' }}>
              <span style={{ color: '#64748b', fontSize: '10px' }}>{message.provider || (message.role === 'user' ? 'sen' : 'ajan')}</span>
              {message.role === 'assistant' && <button onClick={() => void speakAnswer(message.text)} style={{ border: 'none', background: 'transparent', color: '#7dd3fc', cursor: 'pointer', fontSize: '11px', fontWeight: 800 }}>🔊 Dinle</button>}
            </div>
          </div>
        ))}
        {busy && <div style={{ justifySelf: 'start', color: '#bae6fd', fontSize: '12px', padding: '8px 12px' }}>🧠 Bağlamını okuyorum, hızlı cevap hazırlıyorum…</div>}
      </div>

      <form onSubmit={send} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px' }}>
        <textarea value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void send(); } }} disabled={busy || isSpeaking || isListening} rows={2} placeholder="Sorunu yaz… Örn. ‘Как тебя зовут?’ ne demek?" style={{ resize: 'vertical', minWidth: 0, background: '#020617', border: '1px solid #334155', color: '#f8fafc', borderRadius: '13px', padding: '11px 12px', fontFamily: 'inherit', outline: 'none' }} />
        <button type="button" onClick={() => void startListening()} disabled={busy || isSpeaking || isListening} aria-label="Mikrofondan soru söyle" title="Mikrofondan soru söyle" style={{ alignSelf: 'stretch', minWidth: '52px', border: `1px solid ${isListening ? '#22c55e' : '#38bdf8'}`, borderRadius: '13px', background: isListening ? 'rgba(34,197,94,.18)' : 'rgba(56,189,248,.12)', color: isListening ? '#86efac' : '#bae6fd', fontSize: '20px', cursor: busy || isSpeaking || isListening ? 'wait' : 'pointer' }}>{isListening ? '●' : '🎙️'}</button>
        <button disabled={busy || isSpeaking || isListening || !input.trim()} style={{ alignSelf: 'stretch', minWidth: '92px', border: 'none', borderRadius: '13px', background: busy || isSpeaking ? '#475569' : 'linear-gradient(135deg, #22c55e, #38bdf8)', color: '#07111f', fontWeight: 950, cursor: busy || isSpeaking ? 'wait' : 'pointer' }}>{busy ? '…' : 'Sor →'}</button>
      </form>
      {embedded && (
        <div style={{ marginTop: '8px', padding: '9px 10px', borderRadius: '11px', background: 'rgba(245,158,11,.10)', border: '1px solid rgba(245,158,11,.38)', color: '#fde68a', fontSize: '11px', lineHeight: 1.45 }}>
          Önizleme çerçevesinde mikrofon izni engellenebilir. Çalışmazsa <button type="button" onClick={openChatInNewTab} style={{ border: '1px solid rgba(245,158,11,.7)', background: 'transparent', color: '#fde68a', borderRadius: '7px', padding: '4px 7px', fontWeight: 900, cursor: 'pointer' }}>yeni sekmede aç</button> ve mikrofon için İzin Ver.
        </div>
      )}
      <div style={{ color: '#64748b', fontSize: '10px', marginTop: '8px', lineHeight: 1.45 }}>
        Yalnızca yazdığın soruya göre konuşur. Türkçe açıklamayı, istediğin Rusça kelime/cümle ve soru kalıplarıyla birlikte ele alır. Üniteler ve ilerlemen ajanın bağlamında tutulur; API anahtarı uygulamaya gömülmez.
      </div>
    </section>
  );
}
