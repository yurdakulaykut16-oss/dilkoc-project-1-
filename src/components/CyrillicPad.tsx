import React from 'react';

// ==========================================
// ⌨️ KİRİL EKRAN KLAVYESİ — fiziksel klavyesi olmayanlar için
// tıklanabilir Rusça harf pad'i (ЙЦУКЕН dizilimi + Ё).
// Yazma soruları ve üretim kartlarında kullanılır.
// ==========================================

const ROWS: string[][] = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'ё', 'б', 'ю'],
];

interface Props {
  onType: (ch: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onEnter?: () => void;
  compact?: boolean;
}

const CyrillicPad: React.FC<Props> = ({ onType, onBackspace, onSpace, onEnter }) => {
  const keyStyle: React.CSSProperties = {
    padding: '9px 0', borderRadius: '8px', border: '1px solid #334155',
    background: '#0f172a', color: '#e2e8f0', fontWeight: 800, fontSize: '15px',
    cursor: 'pointer', minWidth: 0, userSelect: 'none',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
      {ROWS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
          {row.map(ch => (
            <button
              key={ch}
              onClick={() => onType(ch)}
              style={{ ...keyStyle, flex: '1 1 0', maxWidth: '44px', background: ch === 'ё' ? 'rgba(245,158,11,0.2)' : '#0f172a' }}
              title={ch === 'ё' ? 'Ё — her zaman "YO" okunur' : ch}
            >{ch}</button>
          ))}
        </div>
      ))}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '2px' }}>
        <button onClick={onSpace} style={{ ...keyStyle, flex: 3, maxWidth: '180px', color: '#94a3b8' }}>boşluk</button>
        <button onClick={onBackspace} style={{ ...keyStyle, flex: 1, maxWidth: '70px', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef444466' }}>⌫</button>
        {onEnter && <button onClick={onEnter} style={{ ...keyStyle, flex: 1, maxWidth: '90px', background: '#10b981', border: '1px solid #10b981', color: '#06281c', fontWeight: 900 }}>✓ KONTROL</button>}
      </div>
    </div>
  );
};

export default CyrillicPad;
