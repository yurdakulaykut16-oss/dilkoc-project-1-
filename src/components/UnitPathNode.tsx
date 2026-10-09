import { useEffect, useRef, type CSSProperties } from 'react';
import './UnitPathNode.css';

interface Props {
  id: string;
  number: number;
  level: string;
  levelColor: string;
  kindTag: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  completed: boolean;
  unlocked: boolean;
  expanded: boolean;
  offset: number;
  nextOffset?: number;
  lockedReason: string;
  onToggle: () => void;
  onClose: () => void;
  onEnter: () => void;
}

export default function UnitPathNode({
  id, number, level, levelColor, kindTag, title, description, icon, color,
  completed, unlocked, expanded, offset, nextOffset, lockedReason,
  onToggle, onClose, onEnter,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = completed ? 'completed' : unlocked ? 'available' : 'locked';
  const statusLabel = completed ? 'Tamamlandı' : unlocked ? 'Başlanabilir' : 'Kilitli';
  const nodeColor = completed ? '#10b981' : unlocked ? color : '#334155';
  const styles = {
    '--path-offset': `${offset}%`,
    '--path-color': nodeColor,
    '--path-accent': completed ? '#10b981' : color,
    '--path-level-color': levelColor,
  } as CSSProperties;

  useEffect(() => {
    if (!expanded) return;

    const onOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      onClose();
      triggerRef.current?.focus({ preventScroll: true });
    };

    // Capture the completed click, not pointerdown: closing an inline preview
    // must not move the next circle before its click has been dispatched.
    document.addEventListener('click', onOutsideClick, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onOutsideClick, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [expanded, onClose]);

  const closeDetails = () => {
    onClose();
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <div ref={rootRef} className="unit-path-node" data-state={state} style={styles}>
      {nextOffset !== undefined && (
        <svg className="unit-path-connector" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            d={`M ${50 + offset} 0 C ${50 + offset} 50, ${50 + nextOffset} 50, ${50 + nextOffset} 100`}
            fill="none"
            stroke={completed ? '#10b98166' : '#334155'}
            strokeWidth="6"
            strokeDasharray="1 13"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      <div className="unit-path-marker">
        <button
          ref={triggerRef}
          id={`${id}-trigger`}
          type="button"
          className={`unit-path-circle${expanded ? ' is-expanded' : ''}`}
          aria-label={`Ünite ${number}: ${title}. ${statusLabel}. İçeriği ${expanded ? 'gizle' : 'göster'}`}
          aria-expanded={expanded}
          aria-controls={`${id}-details`}
          onClick={onToggle}
        >
          <span className="unit-path-icon" aria-hidden="true">{icon}</span>
          <span className="unit-path-status" aria-hidden="true">{completed ? '✓' : unlocked ? '▶' : '🔒'}</span>
        </button>
        <span className="unit-path-number">{level} · Ünite {number}</span>
      </div>

      {expanded && (
        <section id={`${id}-details`} className="unit-path-details" aria-labelledby={`${id}-title`}>
          <button type="button" className="unit-path-close" aria-label="Ünite bilgisini kapat" onClick={closeDetails}>×</button>
          <div className="unit-path-tags">
            <span className="unit-path-level">{level} · ÜNİTE {number}</span>
            <span className="unit-path-kind">{kindTag}</span>
            <span className="unit-path-state">{statusLabel}</span>
          </div>
          <h3 id={`${id}-title`} className="unit-path-title">{title}</h3>
          <div className="unit-path-description-label">Ünitenin içindekiler</div>
          <p id={`${id}-description`} className="unit-path-description">{description}</p>
          <button
            type="button"
            className="unit-path-enter"
            disabled={!unlocked}
            aria-describedby={unlocked ? `${id}-description` : `${id}-locked-reason`}
            onClick={() => { if (unlocked) onEnter(); }}
          >
            <span aria-hidden="true">{unlocked ? '▶' : '🔒'}</span> Üniteye gir
          </button>
          {!unlocked && <p id={`${id}-locked-reason`} className="unit-path-locked-reason">{lockedReason}</p>}
        </section>
      )}
    </div>
  );
}
