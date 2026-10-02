import { useEffect, useMemo, useRef, useState } from 'react';
import { UNITS_DATA } from '../curriculumData';
import { PREPOSITIONS } from '../learnerModel';
import type { SRSItem } from '../App';
import { isEnglish } from '../content/activeLanguage';

const EN_COMMON_VERBS = new Set(['be', 'have', 'do', 'go', 'say', 'get', 'make', 'know', 'think', 'take', 'see', 'come', 'want', 'use', 'find', 'give', 'tell', 'work', 'call', 'try', 'ask', 'need', 'feel', 'become', 'leave', 'put', 'mean', 'keep', 'let', 'begin', 'seem', 'help', 'show', 'hear', 'play', 'run', 'move', 'live', 'believe', 'bring', 'happen', 'write', 'provide', 'sit', 'stand', 'lose', 'pay', 'meet', 'learn', 'lead', 'understand', 'speak', 'read', 'spend', 'grow', 'open', 'walk', 'win', 'teach', 'offer', 'remember', 'consider', 'appear', 'buy', 'serve', 'die', 'send', 'build', 'stay', 'fall', 'cut', 'reach', 'kill', 'raise', 'pass', 'decide', 'return', 'explain', 'hope', 'develop', 'carry', 'break', 'receive', 'agree', 'support', 'hit', 'produce', 'eat', 'cover', 'catch', 'draw', 'choose', 'work', 'travel', 'cook', 'clean', 'watch', 'study', 'start', 'finish', 'love', 'like', 'enjoy', 'visit', 'talk', 'listen', 'buy', 'sell', 'drive', 'drink', 'sleep', 'wake', 'wear', 'wash']);

const DAY_MS = 24 * 60 * 60 * 1000;

export interface RescueTarget {
  kind: 'word' | 'skill';
  ru?: string;
  tr?: string;
  skillKey?: string;
  label: string;
}

interface GNode {
  id: string;
  kind: 'hub' | 'level' | 'unit' | 'tech' | 'skill' | 'word';
  label: string;
  sub?: string;
  color: string;
  size: number;
  strength: number;
  weak: boolean;
  meta?: { ru?: string; tr?: string; skillKey?: string };
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
}

interface GEdge { a: number; b: number; weak: boolean }

const LEVEL_COLORS: Record<string, string> = {
  A1: '#10b981', A2: '#38bdf8', B1: '#f59e0b', B2: '#f43f5e', C1: '#a78bfa', C2: '#c084fc', 'C1/C2': '#a78bfa',
};

function strengthColor(s: number): string {
  const hue = Math.round(s * 125);
  return `hsl(${hue}, 85%, ${52 - s * 6}%)`;
}

export function computeWordStrength(item: SRSItem, errCount: number, now = Date.now()): number {
  let s = 0.22 + item.box * 0.155;
  if (now > item.nextReview) {
    const overdueDays = (now - item.nextReview) / DAY_MS;
    s -= Math.min(0.62, 0.18 + overdueDays * 0.08);
  }
  s -= Math.min(0.5, errCount * 0.16);
  return Math.max(0.03, Math.min(1, s));
}

interface Props {
  srsBank: SRSItem[];
  errorStats: Record<string, { count: number; tr: string; last: number }>;
  completedUnits: string[];
  onStartRescue: (t: RescueTarget) => void;
}

export default function WordGraph3D({ srsBank, errorStats, completedUnits, onStartRescue }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<GNode | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const graph = useMemo(() => {
    const nodes: GNode[] = [];
    const edges: GEdge[] = [];
    const idx = new Map<string, number>();
    const now = Date.now();

    const add = (n: Omit<GNode, 'x' | 'y' | 'z' | 'vx' | 'vy' | 'vz'>): number => {
      if (idx.has(n.id)) return idx.get(n.id)!;
      const i = nodes.length;
      const phi = Math.acos(1 - 2 * ((i + 0.5) / 260));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 150 + (i % 5) * 18;
      nodes.push({
        ...n,
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        vx: 0, vy: 0, vz: 0,
      });
      idx.set(n.id, i);
      return i;
    };
    const link = (a: number, b: number, weak = false) => { edges.push({ a, b, weak }); };

    const hub = add({ id: 'hub', kind: 'hub', label: '🧠 Benim Rusçam', color: '#38bdf8', size: 15, strength: 1, weak: false });

    const levelIdx = new Map<string, number>();
    (['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).forEach(lv => {
      const i = add({ id: `lv_${lv}`, kind: 'level', label: lv, sub: 'Seviye', color: LEVEL_COLORS[lv], size: 11, strength: 1, weak: false });
      levelIdx.set(lv, i);
      link(hub, i);
    });

    const techDefs: [string, string, string][] = [
      ['tech_srs', '📅 Aralıklı Tekrar', '#f59e0b'],
      ['tech_listen', '🎧 Dinleme', '#14b8a6'],
      ['tech_alpha', '🔤 Alfabe', '#64748b'],
      ['tech_tense', '⏳ Zamanlar', '#eab308'],
      ['tech_prep', '📍 Edatlar', '#f472b6'],
    ];
    const techIdx = new Map<string, number>();
    techDefs.forEach(([id, label, color]) => {
      const i = add({
        id, kind: id === 'tech_tense' || id === 'tech_prep' ? 'skill' : 'tech',
        label, sub: id === 'tech_tense' || id === 'tech_prep' ? 'Gramer kası' : 'Teknik',
        color, size: 10, strength: 1, weak: false,
        meta: id === 'tech_tense' ? { skillKey: 'tense:past' } : id === 'tech_prep' ? { skillKey: 'prep:в' } : undefined,
      });
      techIdx.set(id, i);
      link(hub, i);
    });

    const wordHome = new Map<string, { unitId: string; title: string; icon: string; color: string; level: string }>();
    for (const u of UNITS_DATA) for (const w of u.words) {
      if (!wordHome.has(w.ru)) wordHome.set(w.ru, { unitId: u.id, title: u.title, icon: u.icon, color: u.color, level: u.levelGroup });
    }

    const scored = srsBank.map(item => ({ item, s: computeWordStrength(item, errorStats[item.ru]?.count || 0, now) }));
    scored.sort((a, b) => a.s - b.s);
    const chosen = scored.slice(0, 150);

    const unitIdx = new Map<string, number>();
    for (const { item, s } of chosen) {
      const err = errorStats[item.ru]?.count || 0;
      const weak = s < 0.38;
      const wi = add({
        id: `w_${item.ru}`, kind: 'word', label: item.ru, sub: item.tr,
        color: strengthColor(s), size: 4.5 + s * 2 + Math.min(2, err * 0.6),
        strength: s, weak,
        meta: { ru: item.ru, tr: item.tr },
      });

      if (item.type === 'letter') {
        link(techIdx.get('tech_alpha')!, wi, weak);
      } else {
        const home = wordHome.get(item.ru);
        if (home) {
          let ui = unitIdx.get(home.unitId);
          if (ui === undefined) {
            ui = add({
              id: `u_${home.unitId}`, kind: 'unit', label: `${home.icon} ${home.title}`,
              sub: completedUnits.includes(home.unitId) ? 'Bölüm • tamamlandı' : 'Bölüm',
              color: home.color, size: 8, strength: 1, weak: false,
            });
            unitIdx.set(home.unitId, ui);
            const li = levelIdx.get(home.level);
            if (li !== undefined) link(li, ui);
          }
          link(ui, wi, weak);
        } else {
          link(techIdx.get('tech_listen')!, wi, weak);
        }
      }
      const low = item.ru.trim().toLowerCase();
      if (PREPOSITIONS.includes(low)) link(techIdx.get('tech_prep')!, wi, weak);
      const isVerbLike = isEnglish()
        ? (/ing$/.test(low) || /(ize|ise|ate|ify)$/.test(low) || EN_COMMON_VERBS.has(low))
        : (/[а-яё]+(ть|л|ла|ли|ю|ет|ит|ют|ят)(ся|сь)?$/i.test(low) && (low.endsWith('ть') || low.endsWith('ться')));
      if (isVerbLike && !low.includes(' ')) {
        link(techIdx.get('tech_tense')!, wi, weak);
      }
      if (weak) link(techIdx.get('tech_srs')!, wi, true);
    }

    return { nodes, edges };
  }, [srsBank, errorStats, completedUnits]);

  const weakCount = graph.nodes.filter(n => n.kind === 'word' && n.weak).length;
  const wordCount = graph.nodes.filter(n => n.kind === 'word').length;

  const viewRef = useRef({ yaw: 0.4, pitch: 0.18, zoom: 1, auto: true });
  const hoverRef = useRef<string | null>(null);
  const selectedRef = useRef<GNode | null>(null);
  selectedRef.current = selected;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { nodes, edges } = graph;
    let raf = 0;
    let cooling = 1;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const step = () => {
      const k = 0.02 * cooling;
      if (cooling > 0.02) {
        for (const e of edges) {
          const A = nodes[e.a], B = nodes[e.b];
          const dx = B.x - A.x, dy = B.y - A.y, dz = B.z - A.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
          const rest = (A.kind === 'hub' || B.kind === 'hub') ? 120 : A.kind === 'word' || B.kind === 'word' ? 55 : 95;
          const f = (d - rest) * 0.012;
          const fx = (dx / d) * f, fy = (dy / d) * f, fz = (dz / d) * f;
          A.vx += fx; A.vy += fy; A.vz += fz;
          B.vx -= fx; B.vy -= fy; B.vz -= fz;
        }
        for (let i = 0; i < nodes.length; i++) {
          const A = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const B = nodes[j];
            const dx = B.x - A.x, dy = B.y - A.y, dz = B.z - A.z;
            const d2 = dx * dx + dy * dy + dz * dz + 0.01;
            if (d2 > 16000) continue;
            const f = 340 / d2;
            const d = Math.sqrt(d2);
            const fx = (dx / d) * f, fy = (dy / d) * f, fz = (dz / d) * f;
            A.vx -= fx; A.vy -= fy; A.vz -= fz;
            B.vx += fx; B.vy += fy; B.vz += fz;
          }
        }
        for (const n of nodes) {
          n.vx -= n.x * 0.0012; n.vy -= n.y * 0.0012; n.vz -= n.z * 0.0012;
          n.x += n.vx * k * 22; n.y += n.vy * k * 22; n.z += n.vz * k * 22;
          n.vx *= 0.86; n.vy *= 0.86; n.vz *= 0.86;
        }
        cooling *= 0.996;
      }

      const v = viewRef.current;
      if (v.auto) v.yaw += 0.0028;
      const rect = canvas.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      const cy = Math.cos(v.yaw), sy = Math.sin(v.yaw);
      const cp = Math.cos(v.pitch), sp = Math.sin(v.pitch);
      const f = 620;

      const proj = nodes.map(n => {
        const x1 = n.x * cy + n.z * sy;
        const z1 = -n.x * sy + n.z * cy;
        const y2 = n.y * cp - z1 * sp;
        const z2 = n.y * sp + z1 * cp;
        const s = (f / (f + z2 + 320)) * v.zoom;
        return { sx: W / 2 + x1 * s, sy: H / 2 + y2 * s, s, depth: z2 };
      });
      (canvas as any).__proj = proj;

      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, Math.max(W, H) / 1.2);
      grad.addColorStop(0, '#0b1226');
      grad.addColorStop(1, '#060a18');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      for (const e of edges) {
        const A = proj[e.a], B = proj[e.b];
        const alpha = Math.max(0.06, Math.min(0.4, (A.s + B.s) * 0.22));
        ctx.strokeStyle = e.weak ? `rgba(248,64,64,${alpha + 0.12})` : `rgba(120,150,210,${alpha})`;
        ctx.lineWidth = e.weak ? 1.3 : 0.7;
        ctx.beginPath();
        ctx.moveTo(A.sx, A.sy);
        ctx.lineTo(B.sx, B.sy);
        ctx.stroke();
      }

      const order = nodes.map((_, i) => i).sort((a, b) => proj[b].depth - proj[a].depth);
      const t = performance.now() / 1000;
      for (const i of order) {
        const n = nodes[i], p = proj[i];
        let r = n.size * p.s;
        if (n.kind === 'word' && n.weak) r *= 1 + 0.15 * Math.sin(t * 4 + i);
        const isSel = selectedRef.current?.id === n.id;
        const isHover = hoverRef.current === n.id;

        if (n.kind === 'word' && n.weak) {
          ctx.shadowColor = 'rgba(248,60,60,0.9)';
          ctx.shadowBlur = 16 * p.s;
        } else if (isSel || isHover) {
          ctx.shadowColor = 'rgba(255,255,255,0.7)';
          ctx.shadowBlur = 14;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = n.color;
        ctx.globalAlpha = Math.max(0.35, Math.min(1, p.s + 0.25));
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(1.5, r), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        if (isSel) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, Math.max(3, r + 4), 0, Math.PI * 2);
          ctx.stroke();
        }

        const showLabel = n.kind !== 'word' ? p.s > 0.55 : (n.weak && p.s > 0.5) || isSel || isHover || p.s > 1.05;
        if (showLabel) {
          ctx.font = `${n.kind === 'word' ? 700 : 900} ${Math.max(9, Math.min(15, (n.kind === 'word' ? 11 : 12) * p.s))}px system-ui`;
          ctx.fillStyle = n.kind === 'word' && n.weak ? '#fda4a4' : '#dbe6ff';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, p.sx, p.sy - r - 5);
        }
      }
      if (running) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    let dragging = false, lastX = 0, lastY = 0, moved = 0;
    const pick = (mx: number, my: number): GNode | null => {
      const proj = (canvas as any).__proj as { sx: number; sy: number; s: number }[] | undefined;
      if (!proj) return null;
      let best: GNode | null = null, bestD = 22;
      graph.nodes.forEach((n, i) => {
        const p = proj[i];
        const d = Math.hypot(p.sx - mx, p.sy - my);
        const hitR = Math.max(10, n.size * p.s + 6);
        if (d < hitR && d < bestD) { best = n; bestD = d; }
      });
      return best;
    };
    const onDown = (e: PointerEvent) => {
      dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
      viewRef.current.auto = false;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (dragging) {
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        moved += Math.abs(dx) + Math.abs(dy);
        viewRef.current.yaw += dx * 0.006;
        viewRef.current.pitch = Math.max(-1.2, Math.min(1.2, viewRef.current.pitch + dy * 0.005));
        lastX = e.clientX; lastY = e.clientY;
      } else {
        const n = pick(e.clientX - rect.left, e.clientY - rect.top);
        hoverRef.current = n?.id || null;
        setHoverId(n?.id || null);
        canvas.style.cursor = n ? 'pointer' : 'grab';
      }
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      if (moved < 6) {
        const rect = canvas.getBoundingClientRect();
        const n = pick(e.clientX - rect.left, e.clientY - rect.top);
        setSelected(n);
      }
      window.setTimeout(() => { viewRef.current.auto = true; }, 2500);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      viewRef.current.zoom = Math.max(0.45, Math.min(2.6, viewRef.current.zoom * (e.deltaY > 0 ? 0.92 : 1.08)));
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [graph]);

  const sel = selected;
  const selErr = sel?.meta?.ru ? (errorStats[sel.meta.ru]?.count || 0) : 0;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
        <div>
          <h2 style={{ margin: 0 }}>🕸️ 3D Kelime Ağı</h2>
          <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '12px' }}>
            {wordCount} kelime/harf takipte • <span style={{ color: '#f87171', fontWeight: 800 }}>{weakCount} tanesi kırmızı bölgede (unutulmak üzere)</span>.
            Sürükle: döndür • Tekerlek: yakınlaştır • Düğüme tıkla: detay + kurtarma testi.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', fontSize: '11px', fontWeight: 800, alignItems: 'center' }}>
          <span style={{ color: '#22c55e' }}>● sağlam</span>
          <span style={{ color: '#eab308' }}>● zayıflıyor</span>
          <span style={{ color: '#ef4444' }}>● unutulmak üzere</span>
        </div>
      </div>

      {wordCount === 0 ? (
        <div style={{ background: '#0f172a', border: '1px dashed #334155', borderRadius: '14px', padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
          Ağ henüz boş: üniteleri ve dinleme konularını bitirdikçe öğrendiğin her kelime buraya düğüm olarak eklenir ve unutulma riski renkle izlenir.
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '440px', borderRadius: '16px', border: '1px solid #334155', touchAction: 'none', display: 'block', cursor: 'grab' }}
        />
      )}

      {sel && (
        <div style={{ marginTop: '12px', background: '#0f172a', border: `1px solid ${sel.kind === 'word' && sel.weak ? '#ef4444' : '#334155'}`, borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900 }}>
                <span style={{ color: sel.color }}>●</span> {sel.label}
                {sel.sub && <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: '13px' }}> — {sel.sub}</span>}
              </div>
              {sel.kind === 'word' && (
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
                  Hafıza gücü: <b style={{ color: strengthColor(sel.strength) }}>%{Math.round(sel.strength * 100)}</b>
                  {selErr > 0 && <> • kronik hata: <b style={{ color: '#f97316' }}>{selErr}×</b></>}
                  {sel.weak && <span style={{ color: '#f87171', fontWeight: 800 }}> • 🔴 unutulma sınırında!</span>}
                </div>
              )}
            </div>
            {(sel.kind === 'word' || sel.kind === 'skill') && (
              <button
                onClick={() => onStartRescue(
                  sel.kind === 'word'
                    ? { kind: 'word', ru: sel.meta!.ru!, tr: sel.meta!.tr || '', label: sel.label }
                    : { kind: 'skill', skillKey: sel.meta!.skillKey!, label: sel.label }
                )}
                style={{ background: sel.weak || sel.kind === 'skill' ? '#ef4444' : '#f97316', border: 'none', color: '#fff', padding: '12px 18px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', fontSize: '14px', boxShadow: '0 6px 18px rgba(239,68,68,0.35)' }}
              >
                ⚡ 1 Dakikalık Hızlı Kurtarma Testi
              </button>
            )}
          </div>
        </div>
      )}
      {!sel && hoverId && <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>Tıkla: düğüm detayını aç.</div>}
    </div>
  );
}
