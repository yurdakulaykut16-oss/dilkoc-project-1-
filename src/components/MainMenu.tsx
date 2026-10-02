import { useEffect, useState } from 'react';
import { getSavedTargetLang, setTargetLang, type TargetLang } from '../content/activeLanguage';

interface LanguageCardDef {
  code: TargetLang;
  flag: string;
  name: string;
  nativeName: string;
  tagline: string;
  bullets: string[];
  color: string;
  gradient: string;
}

const CARDS: LanguageCardDef[] = [
  {
    code: 'ru',
    flag: '🇷🇺',
    name: 'Rusça',
    nativeName: 'Русский',
    tagline: 'Sıfırdan C2 ustalık seviyesine',
    bullets: [
      '🔤 33 harflik Kiril alfabesi + 76 fonetik/okuma dersi',
      '📚 822 ünite: gündelik yaşam, iş, vize-vatandaşlık, mülakat...',
      '🎧 100+ dinleme konusu · 📖 13 hikaye modülü',
      '🐰 Смешарики & «Кухня» sahneleriyle anlaşılır girdi',
    ],
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, rgba(56,189,248,0.18), rgba(59,130,246,0.08))',
  },
  {
    code: 'en',
    flag: '🇬🇧',
    name: 'İngilizce',
    nativeName: 'English',
    tagline: 'Fonetikten C2 ustalık seviyesine',
    bullets: [
      '🔤 26 harf + TH, schwa, sessiz harfler: 30 fonetik dersi',
      '📚 822 ünite: Rusça paketiyle aynı hacim — gündelik yaşamdan vize-vatandaşlığa',
      '🎧 Harf + telaffuz kuralı + müfredat ön-hazırlık dinleme konuları',
      '📖 9 hikaye modülü: kontrol noktaları + bölüm finalleri',
    ],
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(139,92,246,0.08))',
  },
];

export default function MainMenu({
  onChoose,
  onContinue,
}: {
  onChoose?: (lang: TargetLang) => void;
  onContinue?: (lang: TargetLang) => void;
}) {
  const saved = getSavedTargetLang();
  const [picked, setPicked] = useState<TargetLang | null>(null);

  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, []);

  function choose(code: TargetLang) {
    if (picked) return;
    setPicked(code);
    setTargetLang(code);
    setTimeout(() => {
      if (onChoose) onChoose(code);
      window.location.reload();
    }, 250);
  }

  function continueSaved() {
    if (!saved || picked) return;
    if (onContinue) {
      onContinue(saved);
    } else {
      window.location.reload();
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(1200px 600px at 15% -10%, rgba(56,189,248,0.10), transparent 60%), radial-gradient(1000px 500px at 95% 110%, rgba(167,139,250,0.12), transparent 55%), #0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 18px 30px',
      boxSizing: 'border-box',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '34px' }}>
        <div style={{
          width: '86px', height: '86px', margin: '0 auto 16px', borderRadius: '24px',
          background: 'radial-gradient(circle at 30% 25%, #e0f2fe, #38bdf8 55%, #1d4ed8)',
          display: 'grid', placeItems: 'center', fontSize: '44px',
          boxShadow: '0 18px 40px rgba(56,189,248,0.35)',
        }}>🎓</div>
        <h1 style={{ fontSize: '40px', fontWeight: 950, margin: 0, letterSpacing: '-0.5px' }}>
          Dil<span style={{ color: '#38bdf8' }}>Koç</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: '8px 0 0', fontWeight: 600 }}>
          Kişisel dil koçun — alfabeden ustalık seviyesine tek yol
        </p>
      </div>

      {saved && (
        <button
          onClick={continueSaved}
          style={{
            marginBottom: '22px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(15,23,42,0.72)',
            border: '1.5px solid #334155',
            borderRadius: '999px',
            padding: '12px 22px',
            color: '#f8fafc',
            fontFamily: 'inherit',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'border-color 0.2s, transform 0.15s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = saved === 'ru' ? '#38bdf8' : '#a78bfa';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#334155';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={{ fontSize: '17px' }}>↩️</span>
          Geri Dön — {saved === 'ru' ? '🇷🇺 Rusça' : '🇬🇧 İngilizce'} çalışmaya devam et
        </button>
      )}

      <div style={{ textAlign: 'center', marginBottom: '22px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 900, margin: 0 }}>Hangi dili öğrenmek istersin?</h2>
        <p style={{ color: '#64748b', fontSize: '13px', margin: '6px 0 0' }}>
          Her dilin müfredatı, ilerlemesi ve tekrar havuzu ayrı saklanır.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 380px))',
        gap: '18px', justifyContent: 'center', width: '100%', maxWidth: '820px',
      }}>
        {CARDS.map((c, i) => {
          const isSaved = saved === c.code;
          const isPicked = picked === c.code;
          return (
            <button
              key={c.code}
              onClick={() => choose(c.code)}
              style={{
                position: 'relative',
                textAlign: 'left',
                background: c.gradient,
                border: `1.5px solid ${picked && !isPicked ? '#334155' : `${c.color}${isSaved ? '' : '88'}`}`,
                borderRadius: '22px',
                padding: '24px',
                cursor: 'pointer',
                color: '#f8fafc',
                fontFamily: 'inherit',
                opacity: shown ? (picked && !isPicked ? 0.45 : 1) : 0,
                transform: shown ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity 0.45s ${i * 0.08}s, transform 0.45s ${i * 0.08}s, border-color 0.2s, box-shadow 0.2s`,
                boxShadow: isSaved && !picked ? `0 0 0 1px ${c.color}55, 0 14px 34px rgba(2,6,23,0.45)` : '0 10px 26px rgba(2,6,23,0.35)',
              }}
            >
              {isSaved && (
                <span style={{
                  position: 'absolute', top: '14px', right: '14px',
                  fontSize: '10px', fontWeight: 900, letterSpacing: '0.4px',
                  color: '#0f172a', background: c.color, padding: '4px 10px', borderRadius: '999px',
                }}>SON ÇALIŞILAN</span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <span style={{ fontSize: '44px', lineHeight: 1 }}>{c.flag}</span>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 950 }}>{c.name}</div>
                  <div style={{ fontSize: '13px', color: c.color, fontWeight: 800 }}>{c.nativeName} · {c.tagline}</div>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {c.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>{b}</li>
                ))}
              </ul>
              <div style={{
                textAlign: 'center', fontWeight: 900, fontSize: '15px',
                background: isPicked ? c.color : 'rgba(15,23,42,0.55)',
                border: `1px solid ${isPicked ? c.color : '#334155'}`,
                color: isPicked ? '#0f172a' : '#e2e8f0',
                padding: '13px', borderRadius: '14px',
              }}>
                {isPicked ? '⏳ Hazırlanıyor...' : `${c.flag} ${c.name} Öğrenmeye Başla →`}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '34px', textAlign: 'center', maxWidth: '640px' }}>
        <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.7, margin: 0 }}>
          🧠 Aralıklı tekrar (SRS) · kalıcı tekrar enjeksiyonu · karma maraton · deneme sınavları · kart evi ·
          ağız jimnastiği · hikaye &amp; özet analizi · AI ajanı — <b style={{ color: '#94a3b8' }}>her iki dilde de aynı motorlar çalışır.</b>
        </p>
        <p style={{ color: '#475569', fontSize: '11px', marginTop: '14px', marginBottom: 0 }}>
          Dil seçimine daha sonra üst bardaki 🌐 düğmesinden dönebilirsin.
        </p>
      </div>
    </div>
  );
}
