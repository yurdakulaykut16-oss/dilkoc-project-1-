import React, { useEffect, useRef, useState } from 'react';
import { VISEME_ENERGY, type PlanetPose, type PlanetViseme } from './planetGestures';

/**
 * 🪐 Konuşan gezegen maskotu — kol iskeletiyle birlikte.
 *
 * Kollar gerçek bir insan kolu gibi üç eklemli kurulumdur:
 *   omuz (üst kol) → dirsek (ön kol) → bilek (el + başparmak + 3 parmak)
 * Her eklemin iki katmanı var:
 *   *-pose  → cümleye göre alınan DURUŞ (yumuşak geçişli, jest motorundan gelir)
 *   *-sway  → HECE HECE salınım (CSS keyframe; genliği --vp-amp'e bağlıdır)
 *
 * --vp-amp konuşurken her karede hafifçe yumuşatılarak yazılır (rAF),
 * --vp-dur ve duruş açıları ise cümle değiştikçe pose'tan gelir.
 * Böylece uzun/enerjik cümlelerde kollar sert ve hızlı, sakin cümlelerde
 * yavaş ve küçük sallanır; soru sorarken avuçlar açılır, ünlemde kollar kalkar.
 */

export interface VoicePlanetProps {
  /** O anki ağız biçimi; kol enerjisi bundan beslenir. */
  viseme: PlanetViseme;
  /** Jest motorunun bu cümle için seçtiği duruş. */
  pose: PlanetPose;
  speaking: boolean;
  listening: boolean;
  thinking: boolean;
  /** Altyazının soluna eklenecek kısa durum notu. */
  note?: string;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function Arm({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`vp-arm vp-arm-${side}`}>
      <div className="vp-shoulder-pose">
        <div className="vp-upper">
          <div className="vp-elbow-pose">
            <div className="vp-fore">
              <div className="vp-wrist-pose">
                <div className="vp-hand">
                  <span className="vp-finger vp-finger-1" />
                  <span className="vp-finger vp-finger-2" />
                  <span className="vp-finger vp-finger-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VoicePlanet(props: VoicePlanetProps) {
  const { viseme, pose, speaking, listening, thinking, note } = props;
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const ampRef = useRef(pose.amplitude);
  const targetRef = useRef(pose.amplitude);
  const activeRef = useRef(false);
  const wasSpeakingRef = useRef(false);
  /** Cümle bittiğinde kısa bir alkış + halka patlaması. */
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const justFinished = wasSpeakingRef.current && !speaking;
    wasSpeakingRef.current = speaking;
    if (!justFinished) return undefined;
    setCelebrate(true);
    const timer = window.setTimeout(() => setCelebrate(false), 1250);
    return () => window.clearTimeout(timer);
  }, [speaking]);

  // Cümle/jest değiştikçe hedef enerji yeniden hesaplanır: maskenin açıklığı
  // ne kadar büyükse kollar o kadar yüksek sallanır.
  useEffect(() => {
    const energy = speaking || thinking ? VISEME_ENERGY[viseme] ?? 0.2 : 0.1;
    targetRef.current = pose.amplitude * (0.52 + energy * 0.9);
    activeRef.current = speaking || listening || thinking;
  }, [viseme, pose, speaking, listening, thinking]);

  // Yumuşatma döngüsü: ani sıçramaları engeller, konuşma bittiğinde durur.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.(REDUCED_MOTION_QUERY).matches) return undefined;
    const el = avatarRef.current;
    if (!el) return undefined;
    let raf = 0;
    let frame = 0;
    const step = () => {
      frame += 1;
      const active = activeRef.current;
      // Konuşurken her karede, sessizken her 3. karede güncelle (boşa CPU yakma).
      if (active || frame % 3 === 0) {
        const beat = active ? 1 + Math.sin(frame / 7.5) * 0.07 : 1;
        const target = targetRef.current * beat;
        const next = ampRef.current + (target - ampRef.current) * (active ? 0.22 : 0.08);
        if (Math.abs(next - ampRef.current) > 0.0009 || active) {
          ampRef.current = next;
          el.style.setProperty('--vp-amp', next.toFixed(3));
        }
      }
      raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const avatarClass = [
    'voice-planet-avatar',
    `g-${pose.gesture}`,
    `brows-${pose.brows}`,
    speaking ? 'speaking' : '',
    listening ? 'listening' : '',
    thinking ? 'thinking' : '',
    celebrate ? 'celebrate' : '',
  ].filter(Boolean).join(' ');

  const mouthShapes: Record<PlanetViseme, React.CSSProperties> = {
    rest: { width: '34px', height: '7px', borderRadius: '999px', top: '95px', background: '#061226' },
    closed: { width: '36px', height: '5px', borderRadius: '999px', top: '97px', background: '#061226' },
    open: { width: '30px', height: '30px', borderRadius: '50%', top: '84px', background: '#061226' },
    wide: { width: '50px', height: '14px', borderRadius: '999px', top: '92px', background: '#061226' },
    round: { width: '27px', height: '27px', borderRadius: '50%', top: '86px', background: '#061226' },
    teeth: { width: '44px', height: '12px', borderRadius: '9px', top: '93px', background: 'linear-gradient(180deg, #f8fafc 0 42%, #061226 43% 100%)' },
    smile: { width: '44px', height: '13px', borderRadius: '0 0 999px 999px', top: '93px', background: '#061226' },
  };

  return (
    <div className="voice-planet-stage" aria-live="polite">
      <style>{`
        /* ── temel hareketler ─────────────────────────────────────────── */
        @keyframes voicePlanetFloat { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-12px) rotate(1deg); } }
        @keyframes voicePlanetOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes voicePlanetRing { 0%, 100% { transform: translate(-50%, -50%) rotate(-15deg) scaleX(1); } 50% { transform: translate(-50%, -50%) rotate(-10deg) scaleX(1.05); } }
        @keyframes voicePlanetRingGlint { 0% { left: -40%; opacity: 0; } 22% { opacity: .9; } 60% { left: 108%; opacity: 0; } 100% { left: 108%; opacity: 0; } }
        @keyframes voicePlanetListen { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,.48), 0 0 42px rgba(56,189,248,.25); } 50% { box-shadow: 0 0 0 18px rgba(34,197,94,0), 0 0 58px rgba(34,197,94,.34); } }
        @keyframes voicePlanetTalk { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.025); } }
        @keyframes voicePlanetCheer { 0%, 100% { transform: translateY(0) scale(1); } 40% { transform: translateY(-12px) scale(1.05); } 70% { transform: translateY(-3px) scale(1.015); } }
        @keyframes voicePlanetSpinSurface { from { background-position: 0 0; } to { background-position: 224px 0; } }
        @keyframes voicePlanetTwinkle { 0%, 100% { opacity: .2; transform: scale(.7); } 50% { opacity: 1; transform: scale(1.25); } }
        @keyframes voicePlanetBlink { 0%, 88%, 100% { transform: scaleY(1); } 92% { transform: scaleY(.08); } 95% { transform: scaleY(1); } }
        @keyframes voicePlanetGaze { 0%, 100% { transform: translate(0, 0); } 28% { transform: translate(2px, -1px); } 54% { transform: translate(-2px, 1px); } 76% { transform: translate(1px, 2px); } }
        @keyframes voicePlanetAntenna { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(6deg); } }
        @keyframes voicePlanetAntennaPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(250,204,21,.6); transform: scale(1); } 50% { box-shadow: 0 0 0 calc(var(--vp-amp, .5) * 7px) rgba(250,204,21,0); transform: scale(calc(1 + var(--vp-amp, .5) * .22)); } }
        @keyframes voicePlanetThinkDot { 0%, 80%, 100% { transform: translateY(0); opacity: .35; } 40% { transform: translateY(-7px); opacity: 1; } }
        @keyframes voicePlanetBreath { 0%, 100% { transform: scale(1); } 50% { transform: scale(calc(1 + var(--vp-amp, .5) * .03)); } }

        /* ── kol iskeleti: salınım keyframeleri (--vp-amp genlikle ölçeklenir) ── */
        @keyframes vpSwayIdle { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -2.5deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 2.5deg)); } }
        @keyframes vpSwayA { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -8deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 8deg)); } }
        @keyframes vpSwayB { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * 6deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * -7deg)); } }
        @keyframes vpChop { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -14deg)); } 45% { transform: rotate(calc(var(--vp-amp, .5) * 6deg)); } }
        @keyframes vpChopFore { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -16deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 12deg)); } }
        @keyframes vpShrug { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * 5deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * -13deg)); } }
        @keyframes vpPalmsUp { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -9deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 9deg)); } }
        @keyframes vpPump { 0%, 100% { transform: translateY(0) rotate(calc(var(--vp-amp, .5) * -5deg)); } 50% { transform: translateY(-9px) rotate(calc(var(--vp-amp, .5) * 6deg)); } }
        @keyframes vpWaveHand { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -22deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 22deg)); } }
        @keyframes vpPoke { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -2deg)); } 42% { transform: rotate(calc(var(--vp-amp, .5) * 11deg)); } 62% { transform: rotate(calc(var(--vp-amp, .5) * 4deg)); } }
        @keyframes vpFingerCurl { 0%, 100% { transform: rotate(0deg); height: 11px; } 50% { transform: rotate(-30deg); height: 8px; } }
        @keyframes vpClap { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -12deg)); } 50% { transform: rotate(calc(19deg + var(--vp-amp, .5) * 5deg)); } }
        @keyframes vpBurstRing { from { transform: scale(.5); opacity: .9; } to { transform: scale(1.6); opacity: 0; } }
        @keyframes vpConfetti { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--vp-cx, 0px), var(--vp-cy, -60px)) scale(.4); opacity: 0; } }
        @keyframes vpStretch {
          0%, 58%, 100% { transform: rotate(0deg); }
          66% { transform: rotate(calc(-30deg * (0.6 + var(--vp-amp, .5)))); }
          78% { transform: rotate(calc(-44deg * (0.6 + var(--vp-amp, .5)))); }
          88% { transform: rotate(0deg); }
        }

        /* ── sahne ──────────────────────────────────────────────────────── */
        .voice-planet-stage { --vp-amp: .5; position: relative; min-height: 312px; overflow: hidden; border-radius: 22px; margin-bottom: 14px; display: grid; place-items: center; background: radial-gradient(circle at 50% 12%, rgba(56,189,248,.25), transparent 31%), radial-gradient(circle at 18% 85%, rgba(245,158,11,.13), transparent 28%), linear-gradient(180deg, #050816 0%, #0f172a 58%, #111827 100%); border: 1px solid rgba(125,211,252,.24); box-shadow: inset 0 0 60px rgba(14,165,233,.08); }
        .voice-planet-stage::before, .voice-planet-stage::after { content: '✦'; position: absolute; color: #dbeafe; opacity: .72; font-size: 17px; animation: voicePlanetOrbit 5s ease-in-out infinite alternate; }
        .voice-planet-stage::before { left: 15%; top: 18%; }
        .voice-planet-stage::after { right: 14%; top: 34%; animation-delay: 1.2s; }

        .voice-planet-sparks { position: absolute; inset: 0; pointer-events: none; }
        .voice-planet-sparks i { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #e0f2fe; box-shadow: 0 0 9px rgba(125,211,252,.9); animation: voicePlanetTwinkle 3.1s ease-in-out infinite; }
        .voice-planet-sparks i:nth-child(1) { left: 26%; top: 26%; }
        .voice-planet-sparks i:nth-child(2) { left: 72%; top: 62%; animation-delay: .8s; }
        .voice-planet-sparks i:nth-child(3) { left: 40%; top: 78%; animation-delay: 1.6s; }
        .voice-planet-sparks i:nth-child(4) { left: 84%; top: 20%; animation-delay: 2.2s; }
        .voice-planet-sparks i:nth-child(5) { left: 8%; top: 52%; animation-delay: 1.1s; }

        /* uydular — gezegenin etrafında dönen iki küçük küre */
        .vp-moon-track { position: absolute; left: 50%; top: 50%; width: 300px; height: 200px; margin: -100px 0 0 -150px; border-radius: 50%; z-index: 1; animation: voicePlanetOrbit 13s linear infinite; pointer-events: none; }
        .vp-moon-track.slow { width: 372px; height: 250px; margin: -125px 0 0 -186px; animation-duration: 23s; animation-direction: reverse; }
        .vp-moon { position: absolute; left: 50%; top: -6px; width: 12px; height: 12px; margin-left: -6px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, #f8fafc, #94a3b8 62%, #475569); box-shadow: 0 0 12px rgba(148,163,184,.6); animation: voicePlanetBreath 2.6s ease-in-out infinite; }
        .vp-moon-track.slow .vp-moon { width: 8px; height: 8px; margin-left: -4px; background: radial-gradient(circle at 30% 30%, #fde68a, #f59e0b 60%, #92400e); box-shadow: 0 0 14px rgba(245,158,11,.7); }

        .voice-planet-avatar { --vp-sh: -8deg; --vp-el: 14deg; --vp-wr: 0deg; position: relative; width: 210px; height: 210px; display: grid; place-items: center; filter: drop-shadow(0 25px 44px rgba(14,165,233,.24)); animation: voicePlanetFloat 4.2s ease-in-out infinite; }
        .voice-planet-avatar.speaking { animation: voicePlanetTalk .42s ease-in-out infinite, voicePlanetFloat 4.2s ease-in-out infinite; }
        .voice-planet-avatar.listening { animation: voicePlanetListen 1.2s ease-in-out infinite, voicePlanetFloat 4.2s ease-in-out infinite; border-radius: 50%; }
        .voice-planet-avatar.thinking { animation: voicePlanetFloat 5.6s ease-in-out infinite; }
        .voice-planet-avatar.g-cheer { animation: voicePlanetCheer .78s ease-in-out infinite, voicePlanetFloat 4.2s ease-in-out infinite; }
        .voice-planet-avatar.g-greet { animation: voicePlanetCheer 1.1s ease-in-out infinite, voicePlanetFloat 4.2s ease-in-out infinite; }

        .voice-planet-orbit { position: absolute; inset: -29px; border: 1px dashed rgba(125,211,252,.25); border-radius: 50%; animation: voicePlanetOrbit 18s linear infinite; }
        .voice-planet-ring { position: absolute; left: 50%; top: 51%; width: 288px; height: 68px; transform: translate(-50%, -50%) rotate(-15deg); border-radius: 50%; overflow: hidden; background: linear-gradient(90deg, transparent 0%, rgba(250,204,21,.16) 15%, #facc15 36%, #fde68a 50%, #f59e0b 65%, rgba(250,204,21,.14) 84%, transparent 100%); box-shadow: 0 0 22px rgba(245,158,11,.26); animation: voicePlanetRing 3.6s ease-in-out infinite; z-index: 2; }
        .voice-planet-ring::after { content: ''; position: absolute; inset: 17px 31px; border-radius: 50%; background: #071122; }
        .voice-planet-ring i { position: absolute; top: 0; left: -40%; width: 34%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent); filter: blur(1px); animation: voicePlanetRingGlint 4.4s ease-in-out infinite; }

        .voice-planet-core { position: relative; width: 142px; height: 142px; border-radius: 50%; background: radial-gradient(circle at 30% 20%, #eff6ff 0 10%, #7dd3fc 25%, #2563eb 60%, #1e3a8a 100%); border: 3px solid rgba(191,219,254,.55); overflow: hidden; animation: voicePlanetBreath calc(var(--vp-dur, 1s) * 3.4) ease-in-out infinite; box-shadow: inset -22px -28px 42px rgba(15,23,42,.38), inset 12px 12px 24px rgba(255,255,255,.24); z-index: 3; }
        .voice-planet-core::before { content: ''; position: absolute; left: -18px; top: 38px; width: 182px; height: 38px; background: rgba(255,255,255,.16); transform: rotate(-18deg); border-radius: 999px; }
        .vp-surface { position: absolute; inset: 0; border-radius: 50%; opacity: .8; background: repeating-linear-gradient(104deg, transparent 0 15px, rgba(134,239,172,.26) 15px 27px, transparent 27px 46px, rgba(45,212,191,.18) 46px 60px); animation: voicePlanetSpinSurface 9.5s linear infinite; }

        /* yüz */
        .voice-planet-face { position: absolute; inset: 0; z-index: 2; transform: rotate(var(--vp-tilt, 0deg)); transition: transform .35s ease; }
        .voice-planet-eye { position: absolute; top: 50px; width: 15px; height: 20px; border-radius: 999px; background: #061226; box-shadow: inset 3px 5px 0 rgba(255,255,255,.18); animation: voicePlanetBlink 5.4s ease-in-out infinite; }
        .voice-planet-eye.left { left: 42px; }
        .voice-planet-eye.right { right: 42px; animation-delay: .15s; }
        .vp-pupil { position: absolute; left: 4px; top: 4px; width: 6px; height: 6px; border-radius: 50%; background: #bae6fd; box-shadow: 0 0 6px rgba(186,230,253,.9); animation: voicePlanetGaze 6.8s ease-in-out infinite; }
        .voice-planet-eye.right .vp-pupil { animation-delay: .4s; }
        .voice-planet-brow { position: absolute; top: 40px; width: 21px; height: 5px; border-radius: 999px; background: rgba(8,24,48,.85); transform: translateY(0) rotate(0deg); transition: transform .3s ease; }
        .voice-planet-brow.left { left: 39px; }
        .voice-planet-brow.right { right: 39px; }
        .brows-up .voice-planet-brow { transform: translateY(-6px) rotate(-9deg); }
        .brows-down .voice-planet-brow { transform: translateY(3px) rotate(11deg); }
        .brows-down .voice-planet-brow.right { transform: translateY(2px) rotate(-13deg); }
        .voice-planet-mouth { position: absolute; left: 50%; transform: translateX(-50%); transition: width .075s linear, height .075s linear, top .075s linear, border-radius .075s linear, background .075s linear; box-shadow: inset 0 -4px 0 rgba(255,255,255,.08), 0 1px 0 rgba(255,255,255,.1); }
        .vp-cheek { position: absolute; top: 78px; width: 20px; height: 11px; border-radius: 50%; background: radial-gradient(circle, rgba(244,114,182,.85), rgba(244,114,182,0) 70%); opacity: calc(.16 + var(--vp-amp, .5) * .3); filter: blur(1px); }
        .vp-cheek.left { left: 22px; }
        .vp-cheek.right { right: 22px; }

        .vp-antenna { position: absolute; left: 50%; top: -30px; width: 4px; height: 32px; margin-left: -2px; border-radius: 4px; background: linear-gradient(180deg, #bae6fd, #1d4ed8); transform-origin: 50% 100%; animation: voicePlanetAntenna 3.1s ease-in-out infinite; z-index: 4; }
        .vp-antenna i { position: absolute; left: 50%; top: -9px; width: 12px; height: 12px; margin-left: -6px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, #fef9c3, #facc15 58%, #b45309); animation: voicePlanetAntennaPulse calc(var(--vp-dur, 1s) * 1.4) ease-in-out infinite; }
        .vp-think-dots { position: absolute; left: 50%; top: -52px; display: flex; gap: 5px; transform: translateX(-50%); opacity: 0; transition: opacity .25s ease; }
        .thinking .vp-think-dots { opacity: 1; }
        .vp-think-dots i { width: 6px; height: 6px; border-radius: 50%; background: #a5b4fc; animation: voicePlanetThinkDot 1.1s ease-in-out infinite; }
        .vp-think-dots i:nth-child(2) { animation-delay: .18s; }
        .vp-think-dots i:nth-child(3) { animation-delay: .36s; }

        /* ── kollar ─────────────────────────────────────────────────────── */
        .vp-arm { position: absolute; top: 96px; width: 0; height: 0; z-index: 5; transform: scaleX(var(--vp-side, 1)); }
        .vp-arm-left { left: 46px; --vp-side: -1; --vp-delay: 0s; }
        .vp-arm-right { left: 164px; --vp-side: 1; --vp-delay: calc(var(--vp-dur, 1s) / -2); }
        /* Eklem düğümleri: duruş açısı burada, salınım child'da — ikisi üst üste binmez. */
        .vp-shoulder-pose { position: absolute; left: 0; top: 0; width: 0; height: 0; transform: rotate(var(--vp-sh, 8deg)); transition: transform .42s cubic-bezier(.34,1.35,.5,1); }
        .vp-elbow-pose { position: absolute; left: 0; top: 42px; width: 0; height: 0; transform: rotate(var(--vp-el, -16deg)); transition: transform .42s cubic-bezier(.34,1.35,.5,1); }
        .vp-wrist-pose { position: absolute; left: 0; top: 32px; width: 0; height: 0; transform: rotate(var(--vp-wr, 0deg)); transition: transform .3s cubic-bezier(.34,1.35,.5,1); }

        .vp-upper { position: absolute; left: -12px; top: 0; width: 24px; height: 46px; border-radius: 12px 12px 10px 10px; transform-origin: 50% 0; background: linear-gradient(180deg, #e0f2fe, #60a5fa 46%, #1e40af); box-shadow: inset -4px -7px 9px rgba(2,6,23,.42), inset 3px 3px 0 rgba(255,255,255,.42), 0 4px 11px rgba(2,6,23,.45); animation: vpSwayA var(--vp-dur, 1s) ease-in-out infinite; animation-delay: var(--vp-delay, 0s); }
        .vp-upper::after { content: ''; position: absolute; left: 4px; top: 6px; width: 6px; height: 18px; border-radius: 999px; background: rgba(255,255,255,.4); }
        .vp-fore { position: absolute; left: -9px; top: 0; width: 18px; height: 38px; border-radius: 9px 9px 8px 8px; transform-origin: 50% 0; background: linear-gradient(180deg, #cfe8ff, #38bdf8 52%, #1d4ed8); box-shadow: inset -3px -6px 8px rgba(2,6,23,.4), inset 2px 2px 0 rgba(255,255,255,.36), 0 3px 9px rgba(2,6,23,.4); animation: vpSwayB var(--vp-dur, 1s) ease-in-out infinite; animation-delay: calc(var(--vp-delay, 0s) - var(--vp-dur, 1s) / 5); }
        .vp-hand { position: absolute; left: -11px; top: 0; width: 22px; height: 22px; border-radius: 11px 11px 9px 9px; transform-origin: 50% 0; background: linear-gradient(180deg, #ffe3ca, #f9bd93 58%, #e08d5c); box-shadow: inset -3px -4px 6px rgba(120,53,15,.35), inset 2px 2px 0 rgba(255,255,255,.6), 0 0 calc(5px + var(--vp-amp, .5) * 15px) rgba(125,211,252,.45); animation: vpPalmsUp calc(var(--vp-dur, 1s) * 2) ease-in-out infinite; }
        .vp-hand::before { content: ''; position: absolute; left: -5px; top: 5px; width: 8px; height: 13px; border-radius: 6px; background: linear-gradient(180deg, #ffe9d6, #eda878); transform: rotate(-22deg); }
        .vp-finger { position: absolute; bottom: -8px; width: 5px; height: 11px; border-radius: 4px; transform-origin: 50% 0; background: linear-gradient(180deg, #ffdcc0, #e79c6d); animation: vpFingerCurl var(--vp-dur, 1s) ease-in-out infinite; }
        .vp-finger-1 { left: 1px; }
        .vp-finger-2 { left: 8px; animation-delay: .1s; }
        .vp-finger-3 { left: 15px; animation-delay: .2s; }

        /*
         * Jest duruşları. Açı Sözleşmesi: NEGATİF = kol dışarı/aşağı-sağa,
         * POZİTİF = kol içeriye (vücuda doğru). .vp-arm sol kolda scaleX(-1) ile
         * aynalandığı için aynı değişken iki kolda da simetrik durur.
         */

        /* boşta: gevşek duruş + ara sıra gerinme */
        .g-idle { --vp-sh: -7deg; --vp-el: 12deg; }
        .g-idle .vp-upper { animation-name: vpStretch; animation-duration: 8.6s; }
        .g-idle .vp-fore { animation-name: vpSwayIdle; animation-duration: 5.2s; }
        .g-idle .vp-hand { animation: none; }
        .g-idle .vp-finger { animation: none; }
        .g-idle .vp-arm-right, .g-question .vp-arm-right, .g-shrug .vp-arm-right, .g-cheer .vp-arm-right, .g-listen .vp-arm-right, .g-think .vp-arm-right, .g-calm .vp-arm-right { --vp-delay: 0s; }

        /* sakin anlatım: kollar gevşek, hafif salınım */
        .g-calm { --vp-sh: -14deg; --vp-el: 18deg; }

        /* madde madde / örnekli anlatım: kollar sırayla keser */
        .g-explain { --vp-sh: -24deg; --vp-el: -30deg; }
        .g-explain .vp-upper { animation-name: vpChop; }
        .g-explain .vp-fore { animation-name: vpChopFore; }
        .g-explain .voice-planet-face { --vp-tilt: -3deg; }

        /* soru: avuçlar yukarı dönük, kollar yana açık, omuzla birlikte kalkar */
        .g-question { --vp-sh: -22deg; --vp-el: -52deg; --vp-wr: -12deg; }
        .g-question .vp-upper { animation-name: vpShrug; }
        .g-question .vp-fore { animation-name: vpPalmsUp; }
        .g-question .voice-planet-face { --vp-tilt: 4deg; }

        /* coşku: kollar "V" şeklinde yukarı, tempo en yüksek */
        .g-cheer { --vp-sh: -152deg; --vp-el: -18deg; --vp-wr: 4deg; }
        .g-cheer .vp-upper { animation-name: vpPump; }
        .g-cheer .vp-fore { animation-name: vpWaveHand; }
        .g-cheer .vp-hand { animation-name: vpWaveHand; }
        .g-cheer .vp-finger { animation: none; }

        /* vurgu / uyarı: sağ kol yana uzanır, işaret parmağı batar */
        .g-point { --vp-sh: -10deg; --vp-el: 14deg; }
        .g-point .vp-arm-right { --vp-sh: -80deg; --vp-el: -8deg; }
        .g-point .vp-arm-right .vp-fore { animation-name: vpPoke; }
        .g-point .vp-arm-right .vp-finger-1 { animation: none; height: 17px; }
        .g-point .vp-arm-right .vp-finger-2, .g-point .vp-arm-right .vp-finger-3 { animation: none; height: 6px; transform: rotate(-26deg); }

        /* sayma: sağ el baş hizasında yukarıda, parmaklar vuruşla kıvrılır */
        .g-count { --vp-sh: -10deg; --vp-el: 14deg; }
        .g-count .vp-arm-right { --vp-sh: -150deg; --vp-el: 22deg; }
        .g-count .vp-arm-right .vp-finger { animation-duration: calc(var(--vp-dur, 1s) * .9); }

        /* selam: sağ kol kalkar, el bilekten hızlı hızlı sallar */
        .g-greet { --vp-sh: -10deg; --vp-el: 14deg; }
        .g-greet .vp-arm-right { --vp-sh: -128deg; --vp-el: -26deg; }
        .g-greet .vp-arm-right .vp-upper { animation-name: vpPalmsUp; }
        .g-greet .vp-arm-right .vp-fore { animation-name: vpWaveHand; }
        .g-greet .vp-arm-right .vp-hand { animation-name: vpWaveHand; animation-duration: calc(var(--vp-dur, 1s) * .55); }
        .g-greet .vp-arm-right .vp-finger { animation: none; }

        /* omuz silkiyor: iki kol yana, avuçlar yukarı, hareket yavaş */
        .g-shrug { --vp-sh: -26deg; --vp-el: -58deg; --vp-wr: -18deg; }
        .g-shrug .vp-upper { animation-name: vpShrug; }
        .g-shrug .vp-fore { animation-name: vpPalmsUp; animation-duration: calc(var(--vp-dur, 1s) * 1.4); }

        /* dinliyor: sağ el kulağının/antenin yanına kıvrılır, sol kol yavaş salınır */
        .g-listen { --vp-sh: -7deg; --vp-el: 12deg; }
        .g-listen .vp-arm-right { --vp-sh: -110deg; --vp-el: -120deg; --vp-wr: -24deg; }
        .g-listen .vp-upper { animation-name: vpSwayIdle; animation-duration: 3.4s; }
        .g-listen .vp-fore { animation-name: vpSwayIdle; animation-duration: 4.2s; }
        .g-listen .vp-hand, .g-listen .vp-finger { animation: none; }

        /* düşünüyor: sol el çenenin altında, sağ kol gevşek */
        .g-think { --vp-sh: -7deg; --vp-el: 12deg; }
        .g-think .vp-arm-left { --vp-sh: -17deg; --vp-el: 89deg; --vp-wr: -30deg; }
        .g-think .vp-upper { animation-name: vpSwayIdle; animation-duration: 4s; }
        .g-think .vp-hand, .g-think .vp-finger { animation: none; }

        /* cümle bitti: iki el kısa bir alkış yapar, halka yayılır */
        .vp-burst { position: absolute; left: 50%; top: 50%; width: 196px; height: 196px; margin: -98px 0 0 -98px; border-radius: 50%; border: 2px solid rgba(134,239,172,.7); opacity: 0; pointer-events: none; z-index: 1; }
        .vp-confetti { position: absolute; inset: 0; pointer-events: none; z-index: 6; opacity: 0; }
        .vp-confetti i { position: absolute; left: 50%; top: 46%; width: 6px; height: 6px; border-radius: 2px; background: #facc15; }
        .vp-confetti i:nth-child(2) { background: #4ade80; --vp-cx: -84px; --vp-cy: -70px; }
        .vp-confetti i:nth-child(1) { --vp-cx: 82px; --vp-cy: -74px; }
        .vp-confetti i:nth-child(3) { background: #38bdf8; --vp-cx: -112px; --vp-cy: -14px; }
        .vp-confetti i:nth-child(4) { background: #f472b6; --vp-cx: 108px; --vp-cy: -22px; }
        .vp-confetti i:nth-child(5) { background: #a5b4fc; --vp-cx: -46px; --vp-cy: 76px; }
        .vp-confetti i:nth-child(6) { background: #fbbf24; --vp-cx: 54px; --vp-cy: 82px; }
        .celebrate .vp-burst { animation: vpBurstRing 1.15s ease-out 1; box-shadow: 0 0 34px rgba(34,197,94,.45); }
        .celebrate .vp-confetti { opacity: 1; }
        .celebrate .vp-confetti i { animation: vpConfetti 1.1s ease-out 1; }
        .celebrate .vp-upper { animation-name: vpClap; animation-duration: .34s; animation-timing-function: ease-in-out; }
        .celebrate .vp-arm-right { --vp-delay: 0s; }
        .celebrate .vp-fore, .celebrate .vp-hand, .celebrate .vp-finger { animation: none; }

        .voice-planet-caption { position: absolute; bottom: 10px; z-index: 6; padding: 5px 10px; border-radius: 999px; background: rgba(2,6,23,.64); color: #bae6fd; font-size: 11px; font-weight: 900; }

        @media (max-width: 560px) {
          .voice-planet-stage { min-height: 280px; }
          /* scale ayrı bir özelliktir: transform'u animate eden keyframe'leri bozmaz. */
          .voice-planet-avatar { scale: .82; }
          .vp-moon-track { width: 250px; height: 170px; margin: -85px 0 0 -125px; }
          .vp-moon-track.slow { width: 300px; height: 205px; margin: -102px 0 0 -150px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .voice-planet-stage *, .voice-planet-stage { animation: none !important; transition-duration: .001s !important; }
        }
      `}</style>

      <div className="voice-planet-sparks" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="vp-confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="vp-moon-track" aria-hidden="true"><span className="vp-moon" /></div>
      <div className="vp-moon-track slow" aria-hidden="true"><span className="vp-moon" /></div>

      <div
        className={avatarClass}
        ref={avatarRef}
        style={{ '--vp-dur': `${pose.duration.toFixed(2)}s` } as React.CSSProperties}
      >
        <div className="vp-burst" aria-hidden="true" />
        <div className="voice-planet-orbit" />
        <div className="voice-planet-ring"><i /></div>
        <Arm side="left" />
        <Arm side="right" />
        <div className="voice-planet-core">
          <div className="vp-surface" />
          <div className="vp-antenna"><i /></div>
          <div className="vp-think-dots" aria-hidden="true"><i /><i /><i /></div>
          <div className="voice-planet-face">
            <span className="voice-planet-brow left" />
            <span className="voice-planet-brow right" />
            <span className="voice-planet-eye left"><span className="vp-pupil" /></span>
            <span className="voice-planet-eye right"><span className="vp-pupil" /></span>
            <span className="vp-cheek left" />
            <span className="vp-cheek right" />
            <span className="voice-planet-mouth" style={mouthShapes[viseme]} />
          </div>
        </div>
      </div>

      <div className="voice-planet-caption">
        {speaking
          ? `🗣️ Konuşuyor • ${pose.label}`
          : listening
            ? '🎙️ Seni dinliyorum…'
            : thinking
              ? '🤔 Düşünüyor…'
              : '🪐 Hazır — sorunu yaz veya mikrofona konuş'}
        {note ? ` • ${note}` : ''}
      </div>
    </div>
  );
}
