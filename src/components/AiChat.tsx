import React, { useMemo, useRef, useState } from 'react';
import { askFreeAgent, activeFreeAiLabel } from '../ai/freeAi';
import type { AgentMessage } from '../ai/freeAi';
import { webSpeak } from '../tts/webSpeech';
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

function compactUnit(unit: typeof UNITS_DATA[number]) {
  const words = unit.words.slice(0, 10).map(word => `${word.ru}=${word.tr}`).join(', ');
  const sentences = unit.sentences.slice(0, 3).map(sentence => `${sentence.ru} → ${sentence.tr}`).join(' | ');
  return `Ünite ${unit.unitNumber} [${unit.levelGroup}] ${unit.title} (${unit.category}). Gramer: ${unit.grammarExplain.slice(0, 320)}. Kelimeler: ${words}. Örnekler: ${sentences}`;
}

function buildKnowledgeContext(query: string, props: AiChatProps) {
  const ranked = [...UNITS_DATA]
    .map(unit => ({ unit, score: scoreUnit(unit, query, props.learningFocus.title) }))
    .sort((a, b) => b.score - a.score || a.unit.unitNumber - b.unit.unitNumber);
  const relevant = ranked.filter(item => item.score > 0).slice(0, 4).map(item => item.unit);
  const current = UNITS_DATA.find(unit => unit.title === props.learningFocus.title);
  if (current && !relevant.some(unit => unit.id === current.id)) relevant.unshift(current);

  const currentWords = props.learningFocus.words.slice(0, 14).map(word => `${word.ru}=${word.tr}`).join(', ');
  const currentSentences = props.learningFocus.sentences.slice(0, 5).map(sentence => `${sentence.ru} → ${sentence.tr}`).join(' | ');
  const mistakes = props.mistakes.slice(0, 8).map(item => `${item.ru}=${item.tr} (${item.reason})`).join(', ') || 'yok';
  const due = props.srsBank.filter(item => item.nextReview <= Date.now()).slice(0, 8).map(item => `${item.ru}=${item.tr}`).join(', ') || 'yok';
  const catalog = UNITS_DATA.map(unit => `${unit.unitNumber}:${unit.title}`).join(' • ');

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
  const related = [...UNITS_DATA]
    .map(unit => ({ unit, score: scoreUnit(unit, query, props.learningFocus.title) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(item => `${item.unit.title}: ${item.unit.words.slice(0, 4).map(word => `${word.ru} (${word.tr})`).join(', ')}`)
    .join(' | ');
  const whereQuestion = /nerede|hangi ünite|konum|kaldım/i.test(query);
  if (whereQuestion) {
    return `Şu an öğrenme yolunda ${props.learningFocus.pathPosition}/${props.learningFocus.pathTotal} konumundasın: ${props.learningFocus.title}. Çevrim içi AI kısa süreliğine yanıt vermiyor; bu konum bilgisi uygulamanın yerel hafızasından geliyor.`;
  }
  return `Çevrim içi AI şu an yanıt vermedi; yerel öğrenme hafızası yine de açık. Şu an ${props.learningFocus.title} konumundasın.${related ? ` Soruna en yakın kartlar: ${related}.` : ''} Biraz sonra tekrar gönderirsen çevrim içi ajan bu konuyu örneklerle açıklayacak.`;
}

function initialChat(): ChatEntry[] {
  return [{
    id: 'welcome',
    role: 'assistant',
    text: 'Merhaba! Bana istediğin soruyu sorabilirsin. Hangi ünitede olduğunu, öğrendiğin kelimeleri, hatalarını ve tekrar vadesi gelenleri her mesajda dikkate alacağım.',
    provider: 'yerel hafıza',
  }];
}

export default function AiChat(props: AiChatProps) {
  const [messages, setMessages] = useState<ChatEntry[]>(() => {
    try {
      const raw = localStorage.getItem(CHAT_KEY);
      const parsed = raw ? JSON.parse(raw) as ChatEntry[] : [];
      return parsed.length > 0 ? parsed.slice(-24) : initialChat();
    } catch {
      return initialChat();
    }
  });
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(() => localStorage.getItem(AUTO_SPEAK_KEY) !== '0');
  const [showVoiceStudio, setShowVoiceStudio] = useState(false);
  const [status, setStatus] = useState(`${activeFreeAiLabel()} hazır`);
  const abortRef = useRef<AbortController | null>(null);

  const contextPreview = useMemo(() => `${props.learningFocus.icon} ${props.learningFocus.title} • ${props.learningFocus.pathPosition}/${props.learningFocus.pathTotal}`, [props.learningFocus]);

  const persist = (next: ChatEntry[]) => {
    const trimmed = next.slice(-24);
    setMessages(trimmed);
    try { localStorage.setItem(CHAT_KEY, JSON.stringify(trimmed)); } catch { /* depolama isteğe bağlı */ }
  };

  const speakAnswer = async (text: string) => {
    const usedAiVoice = await speakWithBotVoice(text, 1);
    if (!usedAiVoice) {
      // VoiceStudio modeli henüz hazır değilse Edge'e değil, metnin diline
      // uygun cihaz diline düş. Rusça örnekler Rusça, açıklamalar Türkçe okunur.
      await webSpeak(text, { lang: /[а-яё]/i.test(text) ? 'ru-RU' : 'tr-TR', rate: 1 });
    }
  };

  const send = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const query = input.trim();
    if (!query || busy) return;
    abortRef.current?.abort();
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
      content: `Sen DilKoç içindeki kişisel Rusça öğrenme ajanısın. Türkçe cevap ver; gerektiğinde Rusça örnek ve Latin okunuş ekle. Kullanıcının sorusuna doğrudan cevap ver, kısa ama öğretici ol. Kullanıcı bu uygulamadaki ünitelerin tamamını öğreniyor: yerel müfredat bilgisini kaynak kabul et, ünite/kelime uydurma. Bilgi bağlamında yoksa bunu açıkça söyle ve genel dil bilgisini ayrı belirt. Kullanıcının her mesajda nerede olduğunu dikkate al; bulunduğu seviyenin üzerinde uzun ve gereksiz gramer yükleme. Yanlışlarını yargılamadan düzelt, bir sonraki küçük adımı öner.\n\n${buildKnowledgeContext(query, props)}`,
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
    stopBotVoice();
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ color: '#86efac', fontSize: '11px', fontWeight: 950, letterSpacing: '.6px' }}>💬 KİŞİSEL AI AJANI • ÜNİTE HAFIZASI AÇIK</div>
          <h2 style={{ margin: '5px 0 4px', color: '#f8fafc', fontSize: '21px' }}>İstediğini sor, kaldığın yerden devam edelim</h2>
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

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '10px 0' }}>
        {['Şu an hangi konuyu çalışıyorum?', 'Bu kelimeyi cümlede öğret', 'Hatalarımda neye odaklanayım?'].map(prompt => (
          <button key={prompt} onClick={() => setInput(prompt)} disabled={busy} style={{ border: '1px solid #334155', background: '#111827', color: '#cbd5e1', borderRadius: '999px', padding: '7px 10px', cursor: 'pointer', fontSize: '11px' }}>{prompt}</button>
        ))}
      </div>

      <form onSubmit={send} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
        <textarea value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); void send(); } }} disabled={busy} rows={2} placeholder="Örn. ‘в’ ve ‘на’ edatını şu anki üniteme göre anlatır mısın?" style={{ resize: 'vertical', minWidth: 0, background: '#020617', border: '1px solid #334155', color: '#f8fafc', borderRadius: '13px', padding: '11px 12px', fontFamily: 'inherit', outline: 'none' }} />
        <button disabled={busy || !input.trim()} style={{ alignSelf: 'stretch', minWidth: '92px', border: 'none', borderRadius: '13px', background: busy ? '#475569' : 'linear-gradient(135deg, #22c55e, #38bdf8)', color: '#07111f', fontWeight: 950, cursor: busy ? 'wait' : 'pointer' }}>{busy ? '…' : 'Sor →'}</button>
      </form>
      <div style={{ color: '#64748b', fontSize: '10px', marginTop: '8px', lineHeight: 1.45 }}>
        Ücretsiz bağlantı anahtarsız Puter AI ile denenir. Üniteler ve ilerlemen tarayıcıda saklanan hafızadan ilgili parçalar halinde ajana gönderilir; API anahtarı uygulama içine gömülmez.
      </div>
    </section>
  );
}
