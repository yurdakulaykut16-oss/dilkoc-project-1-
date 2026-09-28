// ============================================================================
// 🎬 KOÇ AKIŞI — kişiye özel, AI ÜRETİMİ 15-30 saniyelik DİKEY video/animasyon dersleri
// Kullanıcının hata yaptığı gramer (zaman/edat) ve kelime konularından otomatik
// ders senaryoları üretilir; her ders 9:16 dikey bir "short" olarak animasyonlu
// sahneler + Edge TTS seslendirmesiyle (RU: Svetlana/Dmitry, TR: Emel/Ahmet)
// oynatılır. Reels/Shorts gibi kaydırarak (▲▼) ders ders ilerlenir.
// ============================================================================

import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_WORDS, ALL_SENTENCES } from '../curriculumData';
import { skillSummary } from '../learnerModel';
import { edgeSpeak, getVoicePrefs, stopEdgeSpeech } from '../tts/edgeTts';

interface Narr { lang: 'ru' | 'tr'; text: string }
interface Scene {
  kicker?: string;      // üstteki küçük etiket
  big: string;          // ekrandaki büyük metin
  sub?: string;         // alt açıklama
  accent?: string;      // vurgu rengi
  narr: Narr[];         // seslendirme sırası
  minMs: number;        // sahnenin minimum süresi
}
interface ShortLesson {
  id: string;
  tag: string;          // '🩹 KELİME' | '⏳ ZAMAN' | '📍 EDAT'
  title: string;
  color: string;
  scenes: Scene[];
}

function trunc(s: string, n: number) { return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s; }

// ---------------------------------------------------------------------------
// DERS ÜRETİCİ — hatalardan senaryo yazar (deterministik "AI senarist")
// ---------------------------------------------------------------------------
function buildLessons(errorStats: Record<string, { count: number; tr: string; last: number }>): ShortLesson[] {
  const lessons: ShortLesson[] = [];

  // 1) KELİME DERSLERİ — kronik hatalı kelimeler
  const weakWords = Object.entries(errorStats)
    .map(([ru, v]) => ({ ru, tr: v.tr, count: v.count }))
    .filter(w => w.count >= 1 && /[а-яё]/i.test(w.ru))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  for (const w of weakWords) {
    const detail = ALL_WORDS.find(x => x.ru === w.ru);
    const sent = ALL_SENTENCES.find(s => s.ru.toLowerCase().includes(w.ru.toLowerCase()));
    const scenes: Scene[] = [
      {
        kicker: 'SANA ÖZEL MİKRO DERS', big: `Bu kelime senden\nkaçıyor: ${w.count}× hata`, sub: 'Şimdi 20 saniyede geri yakalıyoruz.',
        narr: [{ lang: 'tr', text: `Bu kelimeyi ${w.count} kez karıştırdın. Yirmi saniyede beynine kazıyalım.` }], minMs: 2600,
      },
      {
        kicker: 'KELİME', big: w.ru, sub: `${detail?.reading ? detail.reading + ' • ' : ''}${w.tr}`,
        narr: [{ lang: 'ru', text: w.ru }, { lang: 'ru', text: w.ru }, { lang: 'tr', text: `Yani: ${w.tr}.` }], minMs: 3600,
      },
    ];
    if (sent) {
      scenes.push({
        kicker: 'CÜMLE İÇİNDE', big: sent.ru, sub: sent.tr,
        narr: [{ lang: 'ru', text: sent.ru }, { lang: 'tr', text: sent.tr }], minMs: 4200,
      });
    }
    if (detail?.usageNote) {
      scenes.push({
        kicker: 'HAFIZA KANCASI', big: '💡', sub: trunc(detail.usageNote, 160),
        narr: [{ lang: 'tr', text: trunc(detail.usageNote, 220) }], minMs: 3800,
      });
    }
    scenes.push({
      kicker: 'MÜHÜRLE', big: w.ru, sub: `${w.tr} — bir daha unutma!`,
      narr: [{ lang: 'ru', text: w.ru }, { lang: 'tr', text: `${w.tr}. Tamamdır, mühürlendi!` }], minMs: 3000,
    });
    lessons.push({ id: `word_${w.ru}`, tag: '🩹 KELİME', title: `«${w.ru}» kurtarma dersi`, color: '#f97316', scenes });
  }

  // 2) GRAMER DERSLERİ — zayıf zaman/edat becerileri
  const weakSkills = skillSummary().filter(r => r.total > 0 && r.status !== 'strong').slice(0, 5);
  for (const r of weakSkills) {
    if (r.group === 'zaman') {
      const key = r.key;
      const spec = key === 'tense:past'
        ? { name: 'Geçmiş Zaman', rule: 'Fiil köküne -л eklenir: erkekse -л, kadınsa -ла, çoğulsa -ли.', ex: [{ ru: 'Я читал книгу.', tr: 'Ben kitap okudum. (erkek)' }, { ru: 'Она была дома.', tr: 'O evdeydi. (kadın)' }] }
        : key === 'tense:future'
          ? { name: 'Gelecek Zaman', rule: 'буду / будешь / будет + fiilin mastarı: gelecek planı böyle kurulur.', ex: [{ ru: 'Я буду работать завтра.', tr: 'Yarın çalışacağım.' }, { ru: 'Мы будем говорить по-русски.', tr: 'Rusça konuşacağız.' }] }
          : { name: 'Şimdiki Zaman', rule: 'Fiil kişiye göre çekilir: я читаю, ты читаешь, он читает…', ex: [{ ru: 'Я живу в Москве.', tr: 'Moskova’da yaşıyorum.' }, { ru: 'Она говорит по-русски.', tr: 'O Rusça konuşuyor.' }] };
      lessons.push({
        id: `sk_${key}`, tag: '⏳ ZAMAN', title: `${spec.name}: %${r.accuracy} → yukarı çekelim`, color: '#eab308',
        scenes: [
          { kicker: 'ZAYIF NOKTA TESPİT EDİLDİ', big: spec.name, sub: `Çözdüğün sorularda isabet: %${r.accuracy} (${r.wrong} hata)`, narr: [{ lang: 'tr', text: `Çözdüğün sorulara göre ${spec.name} konusunda isabetin yüzde ${r.accuracy}. Kuralı otuz saniyede netleştirelim.` }], minMs: 3200 },
          { kicker: 'KURAL', big: '📐', sub: spec.rule, narr: [{ lang: 'tr', text: spec.rule }], minMs: 3600 },
          { kicker: 'ÖRNEK 1', big: spec.ex[0].ru, sub: spec.ex[0].tr, narr: [{ lang: 'ru', text: spec.ex[0].ru }, { lang: 'tr', text: spec.ex[0].tr }], minMs: 4000 },
          { kicker: 'ÖRNEK 2', big: spec.ex[1].ru, sub: spec.ex[1].tr, narr: [{ lang: 'ru', text: spec.ex[1].ru }, { lang: 'tr', text: spec.ex[1].tr }], minMs: 4000 },
          { kicker: 'ÖZET', big: spec.name, sub: 'Şimdi ağ grafiğinden 1 dakikalık hızlı testle mühürle!', narr: [{ lang: 'tr', text: 'Kural bu kadar. Şimdi kelime ağından bir dakikalık hızlı kurtarma testiyle mühürle!' }], minMs: 3000 },
        ],
      });
    } else {
      const prep = r.key.slice(5);
      const exs = ALL_SENTENCES.filter(s => new RegExp(`(^|\\s)${prep}\\s`, 'i').test(s.ru)).slice(0, 2);
      const hint = r.label.split('—')[1]?.trim() || 'ilişki kurar';
      lessons.push({
        id: `sk_${r.key}`, tag: '📍 EDAT', title: `«${prep}» edatı: %${r.accuracy} → yukarı çekelim`, color: '#f472b6',
        scenes: [
          { kicker: 'ZAYIF EDAT', big: `«${prep}»`, sub: `Anlamı: ${hint} • isabetin %${r.accuracy}`, narr: [{ lang: 'ru', text: prep }, { lang: 'tr', text: `Bu edat ${hint} anlamı kurar. Sorularda isabetin yüzde ${r.accuracy}, örneklerle oturtalım.` }], minMs: 3400 },
          ...exs.map((s, i): Scene => ({ kicker: `ÖRNEK ${i + 1}`, big: s.ru, sub: s.tr, narr: [{ lang: 'ru', text: s.ru }, { lang: 'tr', text: s.tr }], minMs: 4200 })),
          { kicker: 'ÖZET', big: `«${prep}»`, sub: hint, narr: [{ lang: 'tr', text: `Unutma: ${prep}, ${hint}.` }], minMs: 2600 },
        ],
      });
    }
  }

  if (lessons.length === 0) {
    lessons.push({
      id: 'empty', tag: '🎬 KOÇ AKIŞI', title: 'Henüz sana özel ders yok', color: '#38bdf8',
      scenes: [
        { kicker: 'KOÇ AKIŞI', big: 'Henüz hata verin yok 🎉', sub: 'Ünitelerde soru çözdükçe, hata yaptığın her konu için buraya 15-30 saniyelik mikro dersler otomatik üretilecek.', narr: [{ lang: 'tr', text: 'Henüz hata verin yok. Soru çözdükçe hata yaptığın her konu için buraya on beş ile otuz saniyelik mikro dersler otomatik üretilecek.' }], minMs: 5000 },
      ],
    });
  }
  return lessons.slice(0, 12);
}

// Basit yedek: Edge TTS çalışmazsa tarayıcı sesi
function fallbackSpeak(text: string, lang: 'ru' | 'tr'): Promise<void> {
  return new Promise(resolve => {
    if (!('speechSynthesis' in window)) { resolve(); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'ru' ? 'ru-RU' : 'tr-TR';
    u.rate = 0.9;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

interface Props {
  errorStats: Record<string, { count: number; tr: string; last: number }>;
}

export default function CoachShorts({ errorStats }: Props) {
  const lessons = useMemo(() => buildLessons(errorStats), [errorStats]);
  const [li, setLi] = useState(0);
  const [si, setSi] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const tokenRef = useRef(0);
  const mutedRef = useRef(false);
  mutedRef.current = muted;

  const lesson = lessons[li];
  const totalSec = Math.round(lesson.scenes.reduce((a, s) => a + s.minMs, 0) / 1000);

  const stopAll = () => {
    tokenRef.current += 1;
    stopEdgeSpeech();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setPlaying(false);
  };

  const playLesson = async (lessonIdx: number, fromScene = 0) => {
    stopAll();
    const token = ++tokenRef.current;
    setLi(lessonIdx); setSi(fromScene); setPlaying(true);
    const L = lessons[lessonIdx];
    const prefs = getVoicePrefs();
    for (let i = fromScene; i < L.scenes.length; i++) {
      if (token !== tokenRef.current) return;
      setSi(i);
      const sc = L.scenes[i];
      const started = Date.now();
      if (!mutedRef.current) {
        for (const n of sc.narr) {
          if (token !== tokenRef.current) return;
          const ok = await edgeSpeak(n.text, { voice: n.lang === 'ru' ? prefs.ru : prefs.tr, prosodyRate: n.lang === 'ru' ? '-10%' : '+0%' });
          if (!ok && token === tokenRef.current) await fallbackSpeak(n.text, n.lang);
        }
      }
      const elapsed = Date.now() - started;
      if (elapsed < sc.minMs) await new Promise(r => setTimeout(r, sc.minMs - elapsed));
    }
    if (token !== tokenRef.current) return;
    // otomatik sıradaki derse geç
    if (lessonIdx + 1 < lessons.length) void playLesson(lessonIdx + 1);
    else { setPlaying(false); setSi(0); }
  };

  useEffect(() => () => { stopAll(); }, []);

  const goto = (d: number) => {
    const next = Math.max(0, Math.min(lessons.length - 1, li + d));
    if (next !== li) void playLesson(next);
  };

  const sc = lesson.scenes[Math.min(si, lesson.scenes.length - 1)];

  return (
    <div>
      <style>{`
        @keyframes shortsFadeUp { from { opacity: 0; transform: translateY(26px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes shortsGlow { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes shortsKicker { from { opacity: 0; letter-spacing: 6px; } to { opacity: 1; letter-spacing: 2px; } }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        <div>
          <h2 style={{ margin: 0 }}>🎬 Koç Akışı</h2>
          <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '12px' }}>
            Hatalarından AI ile üretilen 15-30 saniyelik dikey mikro dersler — {lessons.length} ders hazır. Seslendirme: Edge TTS (RU: Svetlana/Dmitry • TR: Emel/Ahmet).
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', alignItems: 'stretch' }}>
        {/* DİKEY VİDEO KARTI (9:16) */}
        <div style={{
          width: 'min(360px, 78vw)', aspectRatio: '9 / 16', borderRadius: '22px', overflow: 'hidden', position: 'relative',
          border: `1px solid ${lesson.color}66`, boxShadow: `0 22px 55px ${lesson.color}33`,
          background: `linear-gradient(160deg, ${lesson.color}38, #0b1226 45%, #060a18 80%, ${lesson.color}22)`,
          backgroundSize: '220% 220%', animation: playing ? 'shortsGlow 7s ease infinite' : 'none',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* sahne ilerleme çubukları (story tarzı) */}
          <div style={{ display: 'flex', gap: '4px', padding: '10px 12px 0' }}>
            {lesson.scenes.map((_, i) => (
              <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i < si ? '#fff' : i === si && playing ? `${lesson.color}` : 'rgba(255,255,255,0.22)', transition: 'background 0.3s' }} />
            ))}
          </div>
          <div style={{ padding: '10px 14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: `${lesson.color}cc`, padding: '3px 9px', borderRadius: '999px' }}>{lesson.tag}</span>
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.75)' }}>~{Math.min(30, Math.max(15, totalSec))} sn</span>
          </div>

          {/* SAHNE */}
          <div key={`${li}_${si}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '18px', gap: '12px' }}>
            {sc.kicker && <div style={{ fontSize: '11px', fontWeight: 900, color: lesson.color, animation: 'shortsKicker 0.5s ease both' }}>{sc.kicker}</div>}
            <div style={{ fontSize: sc.big.length > 40 ? '20px' : sc.big.length > 14 ? '26px' : '44px', fontWeight: 950, color: '#fff', lineHeight: 1.25, whiteSpace: 'pre-line', animation: 'shortsFadeUp 0.55s ease both', textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
              {sc.big}
            </div>
            {sc.sub && <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, animation: 'shortsFadeUp 0.55s 0.12s ease both', maxWidth: '92%' }}>{sc.sub}</div>}
          </div>

          {/* alt bilgi + oynat */}
          <div style={{ padding: '0 14px 14px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{lesson.title}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {!playing ? (
                <button onClick={() => void playLesson(li, 0)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#fff', color: '#0f172a', fontWeight: 900, cursor: 'pointer', fontSize: '14px' }}>▶ Dersi Oynat</button>
              ) : (
                <button onClick={stopAll} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.9)', color: '#0f172a', fontWeight: 900, cursor: 'pointer', fontSize: '14px' }}>⏸ Durdur</button>
              )}
              <button onClick={() => setMuted(m => !m)} title={muted ? 'Sesi aç' : 'Sesi kapat'}
                style={{ padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.35)', background: 'transparent', color: '#fff', fontWeight: 900, cursor: 'pointer' }}>
                {muted ? '🔇' : '🔊'}
              </button>
            </div>
          </div>
        </div>

        {/* SAĞ KENAR: reels tarzı gezinme */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
          <button onClick={() => goto(-1)} disabled={li === 0} style={{ width: '46px', height: '46px', borderRadius: '50%', border: '1px solid #334155', background: '#0f172a', color: li === 0 ? '#475569' : '#fff', fontSize: '18px', cursor: li === 0 ? 'not-allowed' : 'pointer' }}>▲</button>
          <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 900, color: '#94a3b8' }}>{li + 1}/{lessons.length}</div>
          <button onClick={() => goto(1)} disabled={li === lessons.length - 1} style={{ width: '46px', height: '46px', borderRadius: '50%', border: '1px solid #334155', background: '#0f172a', color: li === lessons.length - 1 ? '#475569' : '#fff', fontSize: '18px', cursor: li === lessons.length - 1 ? 'not-allowed' : 'pointer' }}>▼</button>
        </div>
      </div>

      {/* DERS LİSTESİ */}
      <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '8px' }}>
        {lessons.map((L, i) => (
          <button key={L.id} onClick={() => void playLesson(i)} style={{
            textAlign: 'left', padding: '10px 12px', borderRadius: '12px', cursor: 'pointer',
            background: i === li ? `${L.color}22` : '#0f172a', border: `1px solid ${i === li ? L.color : '#334155'}`, color: '#fff',
          }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: L.color }}>{L.tag} • {L.scenes.length} sahne</div>
            <div style={{ fontSize: '12px', fontWeight: 800, marginTop: '3px' }}>{L.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
