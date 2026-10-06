import React, { useEffect, useRef, useState } from 'react';
import { VISEME_ENERGY, type PlanetPose, type PlanetViseme } from './planetGestures';

/**
 * 🪐 Konuşan gezegen maskotu — vintage (Loki'deki Miss Minutes tarzı) çizgi film kurulumu.
 *
 * Neden bu tarz: eski 1930-40 çizgi filmları (Felix the Cat / Betty Boop / Miss Minutes)
 * üç şeyle tanınır ve buradaki tüm kurulum o üçü üzerine kuruldu:
 *
 * 1) RUBBER-HOSE KOLLAR: dirsek-kol-kolça diye bölünmüş "zırhlı" görünüm yerine
 *    gövdenin kenarından çıkan tek parça, yuvarlak uçlu İNCE BORU kollar; ucunda
 *    mürekkep konturlu BEYAZ ELDİVEN (3 parmak + başparmak = klasik çizgi film standardı: 4 parmak).
 *    Kollar boşta sağa-sola açık süzülür.
 * 2) MÜREKKEP KONTRASTI: her parça düz dolgu + koyu kontur (çizgi film çizgisi). Gözler
 *    beyaz akl + koyu bebek + ÜSTTE ÜÇER KİRPİK; kaş, yanak, ağız hepsi konturlu.
 * 3) "STEPPY" ZAMANLAMA: hareketler yağ gibi akmaz; adım adım (steps()) ve ani
 *    oturmalı (overshoot) çalışır — 12 fps'lik el çizimi hissi. Jest değişince
 *    gözler "pop" yapar, bilek flick atar, vücut ağırlık kaydırır, kaş kıpırdar.
 *
 * Kol salınımının GENLİĞİ --vp-amp (hecelerin ağız enerjisinden, rAF ile yumuşatılır),
 * SÜRESİ --vp-dur (cümlenin jest motorundan) gelir. Gezegen ayrıca arada takla atar.
 */

export interface VoicePlanetProps {
  /** O anki ağız biçimi; kol enerjisi bundan beslenir. */
  viseme: PlanetViseme;
  /** Jest motorunun bu cümle için seçtiği duruş. */
  pose: PlanetPose;
  speaking: boolean;
  listening: boolean;
  thinking: boolean;
  /** Altyazıya eklenecek kısa durum notu. */
  note?: string;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Boru kol + beyaz eldiven: tek tekrar, taraf sadece aynalar. */
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

/**
 * Ağız biçimi + jestin yüz yorumu. Çizgi film ağzı "malleable" olmalı:
 * coşkuda geniş gülümseme, vurguda dişli ince çizgi, soruda yamuk sırıtış,
 * tereddütte küçük "o", düşünmede düz çizgi.
 */
function mouthStyle(viseme: PlanetViseme, pose: PlanetPose): React.CSSProperties {
  const base: Record<PlanetViseme, React.CSSProperties> = {
    rest: { width: '34px', height: '8px', borderRadius: '999px', top: '94px', background: '#081428' },
    closed: { width: '36px', height: '6px', borderRadius: '999px', top: '96px', background: '#081428' },
    open: { width: '30px', height: '30px', borderRadius: '50%', top: '82px', background: '#081428' },
    wide: { width: '50px', height: '15px', borderRadius: '999px', top: '90px', background: '#081428' },
    round: { width: '26px', height: '26px', borderRadius: '50%', top: '84px', background: '#081428' },
    teeth: { width: '44px', height: '13px', borderRadius: '10px', top: '91px', background: 'linear-gradient(180deg, #f8fafc 0 44%, #081428 45% 100%)' },
    smile: { width: '44px', height: '14px', borderRadius: '0 0 999px 999px', top: '92px', background: '#081428' },
  };
  const shape = { ...base[viseme] };
  if (pose.gesture === 'cheer' || pose.gesture === 'greet') {
    return { ...shape, width: '52px', height: '22px', borderRadius: '8px 8px 999px 999px', top: '86px', background: 'linear-gradient(180deg, #f8fafc 0 22%, #081428 23% 62%, #fb7185 63% 100%)' };
  }
  if (pose.gesture === 'question' || pose.gesture === 'shrug') {
    return { ...shape, borderRadius: '999px 999px 999px 38%' };
  }
  if (pose.gesture === 'point') {
    return { ...shape, width: `${Math.round(Number.parseInt(String(shape.width), 10) * 0.82)}px`, borderRadius: '4px 4px 999px 999px' };
  }
  if (pose.gesture === 'think') {
    return { ...shape, height: '6px', width: '26px', borderRadius: '999px', top: '97px' };
  }
  return shape;
}

export default function VoicePlanet(props: VoicePlanetProps) {
  const { viseme, pose, speaking, listening, thinking, note } = props;
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const ampRef = useRef(pose.amplitude);
  const targetRef = useRef(pose.amplitude);
  const activeRef = useRef(false);
  const wasSpeakingRef = useRef(false);
  /** Cümle bittiğinde kısa alkış + halka + konfeti + kutlama taklası. */
  const [celebrate, setCelebrate] = useState(false);
  /** Jest değiştiği anda gözler "pop" yapar (Miss Minutes'ın karakteristik anı). */
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const energy = speaking || thinking ? VISEME_ENERGY[viseme] ?? 0.2 : 0.1;
    targetRef.current = pose.amplitude * (0.5 + energy * 0.95);
    activeRef.current = speaking || listening || thinking;
  }, [viseme, pose, speaking, listening, thinking]);

  useEffect(() => {
    const justFinished = wasSpeakingRef.current && !speaking;
    wasSpeakingRef.current = speaking;
    if (!justFinished) return undefined;
    setCelebrate(true);
    const timer = window.setTimeout(() => setCelebrate(false), 1250);
    return () => window.clearTimeout(timer);
  }, [speaking]);

  useEffect(() => {
    setPop(true);
    const timer = window.setTimeout(() => setPop(false), 380);
    return () => window.clearTimeout(timer);
  }, [pose.gesture]);

  // Genliği kare kare yumuşatır; konuşma bitince kendini bırakır.
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
      // Çizgi film hissi için genliği 12 fps'lik adımlara indirge.
      if (active || frame % 3 === 0) {
        const beat = active ? 1 + Math.sin(frame / 7.5) * 0.08 : 1;
        const target = targetRef.current * beat;
        const next = ampRef.current + (target - ampRef.current) * (active ? 0.26 : 0.07);
        if (Math.abs(next - ampRef.current) > 0.0009 || active) {
          ampRef.current = next;
          el.style.setProperty('--vp-amp', (Math.round(next * 24) / 24).toFixed(3));
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
    pop ? 'pop' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="voice-planet-stage" aria-live="polite">
      <style>{`
        /* ======================= anahtar kareler ======================= */
        /* süzülme: eski çizgi filmler gibi hafif yalpalı, adımlı */
        @keyframes voicePlanetFloat { 0% { transform: translate(0, 0) rotate(-2.4deg); } 26% { transform: translate(7px, -13px) rotate(1.2deg); } 52% { transform: translate(-2px, -5px) rotate(-1.6deg); } 76% { transform: translate(-8px, -11px) rotate(2.4deg); } 100% { transform: translate(0, 0) rotate(-2.4deg); } }
        @keyframes voicePlanetOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes voicePlanetRing { 0%, 100% { transform: translate(-50%, -50%) rotate(-15deg) scaleX(1); } 50% { transform: translate(-50%, -50%) rotate(-10deg) scaleX(1.06); } }
        @keyframes voicePlanetRingGlint { 0% { left: -42%; opacity: 0; } 20% { opacity: .95; } 58% { left: 110%; opacity: 0; } 100% { left: 110%; opacity: 0; } }
        @keyframes voicePlanetListen { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,.5), 0 0 42px rgba(56,189,248,.25); } 50% { box-shadow: 0 0 0 20px rgba(34,197,94,0), 0 0 60px rgba(34,197,94,.34); } }
        @keyframes voicePlanetTalk { 0%, 100% { transform: translateY(0) scale(1) rotate(-1.6deg); } 50% { transform: translateY(-7px) scale(1.04) rotate(1.6deg); } }
        @keyframes voicePlanetCheer { 0%, 100% { transform: translateY(0) scale(1); } 38% { transform: translateY(-15px) scale(1.06); } 62% { transform: translateY(-3px) scale(.99); } 78% { transform: translateY(-8px) scale(1.02); } }
        @keyframes voicePlanetSpinSurface { from { background-position: 0 0; } to { background-position: 224px 0; } }
        @keyframes voicePlanetTwinkle { 0%, 100% { opacity: .18; transform: scale(.65); } 50% { opacity: 1; transform: scale(1.3); } }
        /* kırpma + kirpik çırpması (iki aşamalı: çizgi film "flutter") */
        @keyframes voicePlanetBlink { 0%, 76%, 100% { transform: scaleY(1); } 80% { transform: scaleY(.42); } 83% { transform: scaleY(1); } 88% { transform: scaleY(.08); } 92% { transform: scaleY(1); } }
        @keyframes voicePlanetGaze { 0%, 100% { transform: translate(0, 0); } 22% { transform: translate(3px, -1px); } 46% { transform: translate(-3px, 1px); } 64% { transform: translate(1px, 3px); } 82% { transform: translate(-1px, -2px); } }
        @keyframes voicePlanetPop { 0% { scale: 1 1; } 42% { scale: 1.3 .8; } 100% { scale: 1 1; } }
        @keyframes voicePlanetSquash { 0% { scale: 1 1; translate: 0 0; } 36% { scale: 1.08 .92; translate: 0 2px; } 70% { scale: .95 1.06; translate: 0 -4px; } 100% { scale: 1 1; translate: 0 0; } }
        @keyframes voicePlanetAntenna { 0%, 100% { transform: rotate(-7deg); } 50% { transform: rotate(8deg); } }
        @keyframes voicePlanetAntennaPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(250,204,21,.65); transform: scale(1); } 50% { box-shadow: 0 0 0 calc(var(--vp-amp, .5) * 9px) rgba(250,204,21,0); transform: scale(calc(1 + var(--vp-amp, .5) * .26)); } }
        @keyframes voicePlanetThinkDot { 0%, 78%, 100% { transform: translateY(0); opacity: .3; } 38% { transform: translateY(-8px); opacity: 1; } }
        @keyframes voicePlanetBreath { 0%, 100% { transform: scale(1); } 50% { transform: scale(calc(1 + var(--vp-amp, .5) * .035)); } }
        /* ağız kenarları: çizgi filmi gibi "malleable" dudak kıpırtısı */
        @keyframes voicePlanetLipWiggle { 0%, 100% { transform: translateX(-50%) scaleX(1); } 50% { transform: translateX(-50%) scaleX(1.06); } }

        /* ===================== boru kol salınımları ==================== */
        @keyframes vpSwayIdle { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -3deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 4deg)); } }
        @keyframes vpFloatFlap { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -8deg)) scaleY(1); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 11deg)) scaleY(calc(1 + var(--vp-amp, .5) * .09)); } }
        @keyframes vpSwayA { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -10deg)) scaleY(1); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 11deg)) scaleY(calc(1 + var(--vp-amp, .5) * .07)); } }
        @keyframes vpSwayB { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * 8deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * -9deg)); } }
        @keyframes vpChop { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -17deg)) scaleY(1.05); } 44% { transform: rotate(calc(var(--vp-amp, .5) * 8deg)) scaleY(.96); } }
        @keyframes vpChopFore { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -19deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 14deg)); } }
        @keyframes vpShrug { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * 6deg)) scaleY(.98); } 50% { transform: rotate(calc(var(--vp-amp, .5) * -16deg)) scaleY(1.1); } }
        @keyframes vpPalmsUp { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -11deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 12deg)); } }
        @keyframes vpPump { 0%, 100% { transform: translateY(0) rotate(calc(var(--vp-amp, .5) * -7deg)) scaleY(1.08); } 50% { transform: translateY(-11px) rotate(calc(var(--vp-amp, .5) * 8deg)) scaleY(1.16); } }
        @keyframes vpWaveHand { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -26deg)) scaleX(1); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 26deg)) scaleX(1.06); } }
        /* çizgi film bilek "flick": hızlı atış, sonra anlık bekleme */
        @keyframes vpWristFlick { 0% { transform: rotate(calc(var(--vp-amp, .5) * -20deg)); } 16% { transform: rotate(calc(var(--vp-amp, .5) * 24deg)); } 34% { transform: rotate(calc(var(--vp-amp, .5) * -12deg)); } 52%, 100% { transform: rotate(calc(var(--vp-amp, .5) * 4deg)); } }
        @keyframes vpPoke { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -3deg)); } 38% { transform: rotate(calc(var(--vp-amp, .5) * 15deg)); } 56% { transform: rotate(calc(var(--vp-amp, .5) * 5deg)); } }
        @keyframes vpFingerCurl { 0%, 100% { transform: rotate(0deg); height: 10px; } 50% { transform: rotate(-36deg); height: 7px; } }
        @keyframes vpFingerWiggle { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(9deg); } }
        @keyframes vpClap { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -12deg)); } 50% { transform: rotate(calc(118deg + var(--vp-amp, .5) * 22deg)); } }
        /* vücut ağırlık kaydırma + eski film titremesi */
        @keyframes vpWeightShift { 0%, 100% { transform: translateX(0) rotate(0deg); } 18% { transform: translateX(-4px) rotate(-1.6deg); } 42% { transform: translateX(3px) rotate(1.2deg); } 66% { transform: translateX(-2px) rotate(-.8deg); } 84% { transform: translateX(4px) rotate(1.6deg); } }
        @keyframes vpFilmJitter { 0% { translate: .5px -.4px; } 20% { translate: -.6px .3px; } 40% { translate: .4px .5px; } 60% { translate: -.4px -.5px; } 80% { translate: .6px .2px; } 100% { translate: 0 0; } }
        @keyframes vpCartwheel {
          0% { transform: rotate(-3deg) translateY(0) scale(1); }
          9% { transform: rotate(2.5deg) translateY(-6px) scale(1.005); }
          20% { transform: rotate(-3.5deg) translateY(3px) scale(.998); }
          33% { transform: rotate(3deg) translateY(-8px) scale(1.006); }
          45% { transform: rotate(-2deg) translateY(2px) scale(1); }
          56% { transform: rotate(0deg) translateY(0) scale(1); }
          61% { transform: rotate(16deg) translateY(8px) scale(.98,.96); }
          74% { transform: rotate(296deg) translateY(-17px) scale(.9); }
          82% { transform: rotate(360deg) translateY(-3px) scale(.98,1.04); }
          87% { transform: rotate(356deg) translateY(3px) scale(1.01,.99); }
          93%, 100% { transform: rotate(360deg) translateY(0) scale(1); }
        }
        @keyframes vpFrontFlip { 0%, 70% { transform: rotateX(0deg) scale(1); } 81% { transform: rotateX(360deg) scale(.93); } 88% { transform: rotateX(374deg) scale(1.03); } 95%, 100% { transform: rotateX(360deg) scale(1); } }
        @keyframes vpHoorayFlip { 0% { transform: rotate(0deg) scale(1); } 42% { transform: rotate(-190deg) scale(1.02); } 72% { transform: rotate(-360deg) scale(.96); } 100% { transform: rotate(-360deg) scale(1); } }
        @keyframes vpBurstRing { from { transform: scale(.45); opacity: .95; } to { transform: scale(1.7); opacity: 0; } }
        @keyframes vpConfetti { 0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; } 100% { transform: translate(var(--vp-cx, 0px), var(--vp-cy, -60px)) scale(.35) rotate(220deg); opacity: 0; } }
        @keyframes vpShootingStar { 0% { transform: translate(-140%, 30%) rotate(18deg); opacity: 0; } 8% { opacity: .95; } 46% { transform: translate(150%, -34%) rotate(18deg); opacity: 0; } 100% { transform: translate(150%, -34%) rotate(18deg); opacity: 0; } }
        @keyframes vpLashFlutter { 0%, 100% { rotate: 0deg; } 50% { rotate: -7deg; } }
        @keyframes vpNod { 0%, 100% { transform: rotate(calc(var(--vp-tilt, 0deg) - 2.2deg)); } 50% { transform: rotate(calc(var(--vp-tilt, 0deg) + 3deg)); } }

        /* ========================== sahne ============================== */
        .voice-planet-stage { --vp-amp: .5; position: relative; perspective: 950px; min-height: 356px; overflow: hidden; border-radius: 22px; margin-bottom: 14px; display: grid; place-items: center; background: radial-gradient(circle at 50% 12%, rgba(56,189,248,.25), transparent 31%), radial-gradient(circle at 18% 85%, rgba(245,158,11,.13), transparent 28%), linear-gradient(180deg, #050816 0%, #0f172a 58%, #111827 100%); border: 1px solid rgba(125,211,252,.24); box-shadow: inset 0 0 60px rgba(14,165,233,.08); }
        .voice-planet-stage * { box-sizing: border-box; }
        .voice-planet-stage::before, .voice-planet-stage::after { content: '✦'; position: absolute; color: #dbeafe; opacity: .72; font-size: 17px; animation: voicePlanetOrbit 5s ease-in-out infinite alternate; }
        .voice-planet-stage::before { left: 15%; top: 18%; }
        .voice-planet-stage::after { right: 14%; top: 34%; animation-delay: 1.2s; }

        .vp-shooting-star { position: absolute; left: 0; top: 0; width: 130px; height: 2px; border-radius: 999px; background: linear-gradient(90deg, transparent, rgba(224,242,254,.2) 28%, #f8fafc 94%); box-shadow: 0 0 12px rgba(125,211,252,.85); animation: vpShootingStar 9.5s ease-in infinite; pointer-events: none; z-index: 0; }
        .voice-planet-sparks { position: absolute; inset: 0; pointer-events: none; }
        .voice-planet-sparks i { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #e0f2fe; box-shadow: 0 0 9px rgba(125,211,252,.9); animation: voicePlanetTwinkle 3.1s steps(6, end) infinite; }
        .voice-planet-sparks i:nth-child(1) { left: 26%; top: 26%; }
        .voice-planet-sparks i:nth-child(2) { left: 72%; top: 62%; animation-delay: .8s; }
        .voice-planet-sparks i:nth-child(3) { left: 40%; top: 78%; animation-delay: 1.6s; }
        .voice-planet-sparks i:nth-child(4) { left: 84%; top: 20%; animation-delay: 2.2s; }
        .voice-planet-sparks i:nth-child(5) { left: 8%; top: 52%; animation-delay: 1.1s; }
        .voice-planet-sparks i:nth-child(6) { left: 60%; top: 12%; animation-delay: 2.6s; }
        .voice-planet-sparks i:nth-child(7) { left: 20%; top: 88%; animation-delay: 3.3s; }

        .vp-moon-track { position: absolute; left: 50%; top: 50%; width: 300px; height: 200px; margin: -100px 0 0 -150px; border-radius: 50%; z-index: 1; animation: voicePlanetOrbit 13s steps(12, end) infinite; pointer-events: none; }
        .vp-moon-track.slow { width: 372px; height: 250px; margin: -125px 0 0 -186px; animation-duration: 23s; animation-direction: reverse; }
        .vp-moon { position: absolute; left: 50%; top: -6px; width: 12px; height: 12px; margin-left: -6px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, #f8fafc, #94a3b8 62%, #475569); border: 1.5px solid #081428; box-shadow: 0 0 12px rgba(148,163,184,.55); animation: voicePlanetBreath 2.6s ease-in-out infinite; }
        .vp-moon-track.slow .vp-moon { width: 9px; height: 9px; margin-left: -4.5px; background: radial-gradient(circle at 30% 30%, #fde68a, #f59e0b 62%, #92400e); box-shadow: 0 0 14px rgba(245,158,11,.7); }

        /* takla katmanları: avatar'ın kendi transform'unu bozmamak için dışında.
           vpFilmJitter ayrı "translate" özelliğini oynatır → çakışmaz. */
        .vp-acrobat { display: grid; place-items: center; transform-style: preserve-3d; animation: vpCartwheel 12s steps(6, end) infinite, vpFilmJitter 1.05s steps(1, end) infinite; }
        .vp-acrobat-3d { display: grid; place-items: center; transform-style: preserve-3d; animation: vpFrontFlip 29s steps(6, end) infinite; animation-delay: 8s; }
        .vp-acrobat-3d.celebrate { animation: vpHoorayFlip 1.1s cubic-bezier(.3,1.5,.5,1) 1; }

        .voice-planet-avatar { --vp-sh: -100deg; --vp-el: -8deg; --vp-wr: -6deg; --vp-ease: cubic-bezier(.2,1.55,.4,1); position: relative; width: 210px; height: 210px; display: grid; place-items: center; filter: drop-shadow(0 22px 34px rgba(2,8,23,.55)); animation: voicePlanetFloat 4.6s steps(7, end) infinite; }
        .voice-planet-avatar.speaking { animation: voicePlanetTalk .4s steps(2, end) infinite, voicePlanetFloat 4.6s steps(7, end) infinite; }
        .voice-planet-avatar.listening { animation: voicePlanetListen 1.2s ease-in-out infinite, voicePlanetFloat 4.6s steps(7, end) infinite; border-radius: 50%; }
        .voice-planet-avatar.thinking { animation: voicePlanetFloat 6.2s steps(8, end) infinite; }
        .voice-planet-avatar.g-cheer { animation: voicePlanetCheer .72s steps(4, end) infinite, voicePlanetFloat 4.6s steps(7, end) infinite; }
        .voice-planet-avatar.g-greet { animation: voicePlanetCheer 1s steps(5, end) infinite, voicePlanetFloat 4.6s steps(7, end) infinite; }

        /* gövde grubu: kollar + küre birlikte ağırlık kaydırır (eski çizgi filmde "shift in position") */
        .vp-body { position: absolute; inset: 0; display: grid; place-items: center; animation: vpWeightShift 7.4s steps(7, end) infinite; }
        .g-idle .vp-body { animation-duration: 9.2s; }
        .vp-head { position: relative; width: 142px; height: 142px; z-index: 3; }
        .voice-planet-avatar.pop .vp-head { animation: voicePlanetSquash .34s steps(4, end) 1; }

        .voice-planet-orbit { position: absolute; inset: -29px; border: 1px dashed rgba(125,211,252,.25); border-radius: 50%; animation: voicePlanetOrbit 18s linear infinite; }
        .voice-planet-ring { position: absolute; left: 50%; top: 52%; width: 288px; height: 68px; transform: translate(-50%, -50%) rotate(-15deg); border-radius: 50%; overflow: hidden; background: linear-gradient(90deg, transparent 0%, rgba(250,204,21,.16) 15%, #facc15 36%, #fde68a 50%, #f59e0b 65%, rgba(250,204,21,.14) 84%, transparent 100%); box-shadow: 0 0 22px rgba(245,158,11,.26); animation: voicePlanetRing 3.6s ease-in-out infinite; z-index: 2; }
        .voice-planet-ring::after { content: ''; position: absolute; inset: 17px 31px; border-radius: 50%; background: #071122; }
        .voice-planet-ring i { position: absolute; top: 0; left: -42%; width: 32%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent); filter: blur(1px); animation: voicePlanetRingGlint 4.4s steps(12, end) infinite; }

        .voice-planet-core { position: relative; width: 142px; height: 142px; border-radius: 50%; background: radial-gradient(circle at 31% 22%, #eaf6ff 0 12%, #7dd3fc 30%, #2f6fd0 64%, #16307a 100%); border: 3px solid #081428; overflow: hidden; animation: voicePlanetBreath calc(var(--vp-dur, 1s) * 3.4) steps(5, end) infinite; box-shadow: inset -18px -22px 34px rgba(4,17,45,.42), inset 10px 10px 20px rgba(255,255,255,.22); z-index: 3; }
        .voice-planet-core::before { content: ''; position: absolute; left: -18px; top: 38px; width: 182px; height: 34px; background: rgba(255,255,255,.18); transform: rotate(-18deg); border-radius: 999px; }
        .vp-surface { position: absolute; inset: 0; border-radius: 50%; opacity: .85; background: repeating-linear-gradient(104deg, transparent 0 15px, rgba(134,239,172,.28) 15px 27px, transparent 27px 46px, rgba(45,212,191,.2) 46px 60px); animation: voicePlanetSpinSurface 8.5s steps(10, end) infinite; }

        /* ========================== yüz =============================== */
        .voice-planet-face { position: absolute; inset: 0; z-index: 4; transform: rotate(var(--vp-tilt, 0deg)); transition: transform .26s var(--vp-ease); }
        .speaking .voice-planet-face { animation: vpNod calc(var(--vp-dur, 1s) * 1.7) steps(6, end) infinite; }

        /* klasik çizgi filmi gözleri: beyaz akl + kontur + koyu bebek + yakalama ışığı */
        .voice-planet-eye { position: absolute; top: 49px; width: 21px; height: 25px; border-radius: 50% 50% 48% 48%; background: radial-gradient(circle at 42% 30%, #ffffff, #e6f2ff 72%, #bfdbfe); border: 2.4px solid #081428; animation: voicePlanetBlink 5.2s steps(3, end) infinite; }
        .voice-planet-eye.left { left: 39px; }
        .voice-planet-eye.right { right: 39px; animation-delay: .12s; }
        .voice-planet-avatar.pop .voice-planet-eye { animation: voicePlanetPop .34s steps(3, end) 1, voicePlanetBlink 5.2s steps(3, end) infinite; }
        .vp-pupil { position: absolute; left: 5px; top: 5px; width: 9px; height: 11px; border-radius: 50%; background: #081428; animation: voicePlanetGaze 6.4s steps(3, end) infinite; }
        .vp-pupil::after { content: ''; position: absolute; right: 1px; top: 1px; width: 3px; height: 3px; border-radius: 50%; background: #f8fafc; }
        .voice-planet-eye.right .vp-pupil { animation-delay: .5s; }

        /* KİRPİKLER: her gözün üst-dış kenarından üçer mürekkep teli */
        .vp-lash { position: absolute; top: -6px; width: 2.2px; height: 9px; border-radius: 2px; background: #081428; transform-origin: 50% 100%; }
        .vp-lash-1 { left: 2px; transform: rotate(-38deg); }
        .vp-lash-2 { left: 8px; transform: rotate(-10deg); height: 10px; }
        .vp-lash-3 { left: 14px; transform: rotate(16deg); }
        .voice-planet-eye.right .vp-lash-1 { left: auto; right: 14px; transform: rotate(-16deg); }
        .voice-planet-eye.right .vp-lash-2 { left: auto; right: 8px; transform: rotate(10deg); height: 10px; }
        .voice-planet-eye.right .vp-lash-3 { left: auto; right: 2px; transform: rotate(38deg); }
        .speaking .vp-lash { animation: vpLashFlutter calc(var(--vp-dur, 1s) * 1.1) steps(3, end) infinite; }
        .g-idle .vp-lash { animation: vpLashFlutter 3.1s steps(3, end) infinite; }

        .voice-planet-brow { position: absolute; top: 29px; width: 23px; height: 5px; border-radius: 999px; background: #081428; transform: translateY(0) rotate(0deg); transition: transform .24s var(--vp-ease); }
        .voice-planet-brow.left { left: 36px; }
        .voice-planet-brow.right { right: 36px; }
        .brows-up .voice-planet-brow { transform: translateY(-7px) rotate(-10deg); }
        .brows-down .voice-planet-brow { transform: translateY(4px) rotate(12deg); }
        .brows-down .voice-planet-brow.right { transform: translateY(2px) rotate(-15deg); }
        @keyframes vpBrowTwitch { 0%, 100% { translate: 0 0; } 50% { translate: 0 -1.6px; } }
        .speaking .voice-planet-brow { animation: vpBrowTwitch calc(var(--vp-dur, 1s) * 1.9) steps(3, end) infinite; }

        .voice-planet-mouth { position: absolute; left: 50%; transform: translateX(-50%); border: 2.2px solid #081428; transition: width .07s steps(2, end), height .07s steps(2, end), top .07s steps(2, end), border-radius .12s steps(3, end), background .12s steps(3, end); box-shadow: inset 0 -3px 0 rgba(255,255,255,.12); }
        .speaking .voice-planet-mouth { animation: voicePlanetLipWiggle calc(var(--vp-dur, 1s) * .8) steps(3, end) infinite; }
        .vp-cheek { position: absolute; top: 78px; width: 21px; height: 12px; border-radius: 50%; background: radial-gradient(circle, rgba(251,113,133,.9), rgba(251,113,133,0) 72%); opacity: calc(.14 + var(--vp-amp, .5) * .34); filter: blur(.6px); }
        .vp-cheek.left { left: 19px; }
        .vp-cheek.right { right: 19px; }

        .vp-antenna { position: absolute; left: 50%; top: -30px; width: 4px; height: 32px; margin-left: -2px; border-radius: 4px; background: #0f2c5c; border: 1.5px solid #081428; transform-origin: 50% 100%; animation: voicePlanetAntenna 2.7s steps(6, end) infinite; z-index: 5; }
        .vp-antenna i { position: absolute; left: 50%; top: -10px; width: 13px; height: 13px; margin-left: -6.5px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, #fef9c3, #facc15 58%, #b45309); border: 2px solid #081428; animation: voicePlanetAntennaPulse calc(var(--vp-dur, 1s) * 1.4) steps(5, end) infinite; }
        .vp-think-dots { position: absolute; left: 50%; top: -54px; display: flex; gap: 5px; transform: translateX(-50%); opacity: 0; transition: opacity .22s ease; z-index: 5; }
        .thinking .vp-think-dots { opacity: 1; }
        .vp-think-dots i { width: 6px; height: 6px; border-radius: 50%; background: #a5b4fc; border: 1.5px solid #081428; animation: voicePlanetThinkDot 1.05s steps(5, end) infinite; }
        .vp-think-dots i:nth-child(2) { animation-delay: .16s; }
        .vp-think-dots i:nth-child(3) { animation-delay: .32s; }

        /* ===================== BORU KOLLAR + ELDİVEN ==================== */
        /* omuz pimleri kürenin ÇEVRESİNDE: kol gövdeden biter (Miss Minutes gibi) */
        .vp-arm { position: absolute; top: 108px; width: 0; height: 0; z-index: 5; transform: scaleX(var(--vp-side, 1)); }
        .vp-arm-left { left: 38px; --vp-side: -1; --vp-delay: 0s; }
        .vp-arm-right { left: 172px; --vp-side: 1; --vp-delay: calc(var(--vp-dur, 1s) / -2); }
        .vp-shoulder-pose { position: absolute; left: 0; top: 0; width: 0; height: 0; transform: rotate(var(--vp-sh, -100deg)); transition: transform .24s var(--vp-ease); }
        .vp-elbow-pose { position: absolute; left: 0; top: 38px; width: 0; height: 0; transform: rotate(var(--vp-el, -8deg)); transition: transform .24s var(--vp-ease); }
        .vp-wrist-pose { position: absolute; left: 0; top: 30px; width: 0; height: 0; transform: rotate(var(--vp-wr, -6deg)); transition: transform .2s var(--vp-ease); }

        /* tek parça görünen yuvarlak boru: silindirik gölge + koyu kontur */
        .vp-upper { position: absolute; left: -8px; top: 0; width: 16px; height: 44px; border-radius: 999px; transform-origin: 50% 0; background: linear-gradient(90deg, #0b2350 0 16%, #2f6fd0 46%, #7dd3fc 60%, #12305c); border: 2px solid #081428; animation: vpSwayA var(--vp-dur, 1s) steps(4, end) infinite; animation-delay: var(--vp-delay, 0s); }
        .vp-fore { position: absolute; left: -7px; top: 0; width: 14px; height: 34px; border-radius: 999px; transform-origin: 50% 0; background: linear-gradient(90deg, #0b2350 0 18%, #3b82f6 50%, #93c5fd 62%, #12305c); border: 2px solid #081428; animation: vpSwayB var(--vp-dur, 1s) steps(4, end) infinite; animation-delay: calc(var(--vp-delay, 0s) - var(--vp-dur, 1s) / 6); }
        .vp-hand { position: absolute; left: -14px; top: 0; width: 28px; height: 26px; border-radius: 13px 13px 12px 12px; transform-origin: 50% 0; background: linear-gradient(180deg, #ffffff 0 42%, #e8f2ff 74%, #b9d6f5); border: 2.2px solid #081428; box-shadow: inset 0 -4px 0 rgba(8,20,40,.12), 0 0 calc(6px + var(--vp-amp, .5) * 18px) rgba(147,197,253,.55); animation: vpWristFlick calc(var(--vp-dur, 1s) * 1.5) steps(6, end) infinite; }
        /* eldivenin üstündeki iki dikiş çizgisi */
        .vp-hand::before { content: ''; position: absolute; left: 7px; top: 8px; width: 2px; height: 9px; border-radius: 2px; background: rgba(8,20,40,.55); box-shadow: 5px 1px 0 rgba(8,20,40,.4); }
        /* başparmak: çizgi film standardı, avucun dışına çıkan kısa lob */
        .vp-hand::after { content: ''; position: absolute; left: -7px; top: 7px; width: 10px; height: 13px; border-radius: 6px 3px 6px 6px; background: linear-gradient(180deg, #ffffff, #cfe3fb); border: 2px solid #081428; transform: rotate(-24deg); }
        .vp-finger { position: absolute; bottom: -7px; width: 7px; height: 10px; border-radius: 4px 4px 5px 5px; border: 2px solid #081428; border-top: none; background: linear-gradient(180deg, #ffffff, #dcebfc); animation: vpFingerCurl var(--vp-dur, 1s) steps(4, end) infinite; }
        .vp-finger-1 { left: 1px; }
        .vp-finger-2 { left: 10px; animation-delay: .09s; }
        .vp-finger-3 { left: 19px; animation-delay: .18s; }

        /* ---- duruşlar. Sözleşme: NEGATİF = kol dışarı, POZİTİF = içeri ---- */
        /* boşta: kollar sağa-sola açık, ağırlıksız süzülme + parmak kıpırtısı */
        .g-idle { --vp-sh: -102deg; --vp-el: -10deg; --vp-wr: -8deg; }
        .g-idle .vp-upper { animation: vpFloatFlap 4.4s steps(4, end) infinite; }
        .g-idle .vp-fore { animation: vpFloatFlap 5.6s steps(4, end) infinite; animation-delay: -1.1s; }
        .g-idle .vp-hand { animation: vpPalmsUp 6.4s steps(5, end) infinite; }
        .g-idle .vp-finger { animation: vpFingerWiggle 2.6s steps(4, end) infinite; }
        .g-idle .vp-finger-2 { animation-delay: .3s; }
        .g-idle .vp-finger-3 { animation-delay: .6s; }
        .g-idle .vp-arm-right, .g-question .vp-arm-right, .g-shrug .vp-arm-right, .g-cheer .vp-arm-right, .g-listen .vp-arm-right, .g-think .vp-arm-right, .g-calm .vp-arm-right { --vp-delay: 0s; }

        /* sakin anlatım */
        .g-calm { --vp-sh: -78deg; --vp-el: -18deg; }

        /* örnekli / madde madde anlatım: kollar sırayla keser */
        .g-explain { --vp-sh: -72deg; --vp-el: -32deg; }
        .g-explain .vp-upper { animation-name: vpChop; }
        .g-explain .vp-fore { animation-name: vpChopFore; }
        .g-explain .voice-planet-face { --vp-tilt: -3.5deg; }

        /* soru: kollar yana-yukarı, avuçlar tavana dönük, omuz kalkar */
        .g-question { --vp-sh: -118deg; --vp-el: -46deg; --vp-wr: -22deg; }
        .g-question .vp-upper { animation-name: vpShrug; }
        .g-question .vp-fore { animation-name: vpPalmsUp; }
        .g-question .voice-planet-face { --vp-tilt: 4.5deg; }

        /* coşku: kollar "V", pompalama, vücut zıplar */
        .g-cheer { --vp-sh: -152deg; --vp-el: -14deg; --vp-wr: 8deg; }
        .g-cheer .vp-upper { animation-name: vpPump; }
        .g-cheer .vp-fore { animation-name: vpWaveHand; }
        .g-cheer .vp-hand { animation-name: vpWaveHand; animation-duration: calc(var(--vp-dur, 1s) * .7); }
        .g-cheer .vp-finger { animation: none; }

        /* vurgu: sağ kol uzanır, tek parmak açık (diğerleri kıvrık) */
        .g-point { --vp-sh: -88deg; --vp-el: -10deg; }
        .g-point .vp-arm-right { --vp-sh: -95deg; --vp-el: -4deg; --vp-wr: 4deg; }
        .g-point .vp-arm-right .vp-fore { animation-name: vpPoke; }
        .g-point .vp-arm-right .vp-finger-1 { animation: none; height: 18px; width: 8px; }
        .g-point .vp-arm-right .vp-finger-2, .g-point .vp-arm-right .vp-finger-3 { animation: none; height: 4px; transform: rotate(-30deg); }

        /* sayma: sağ eldiven baş hizasında, parmaklar vuruşla kıvrılır */
        .g-count { --vp-sh: -88deg; --vp-el: -10deg; }
        .g-count .vp-arm-right { --vp-sh: -140deg; --vp-el: 30deg; }
        .g-count .vp-arm-right .vp-finger { animation-duration: calc(var(--vp-dur, 1s) * .85); }

        /* selam: sağ kol kalkar, eldiven bilekten hızlı sallar */
        .g-greet { --vp-sh: -88deg; --vp-el: -10deg; }
        .g-greet .vp-arm-right { --vp-sh: -132deg; --vp-el: -26deg; }
        .g-greet .vp-arm-right .vp-upper { animation-name: vpPalmsUp; }
        .g-greet .vp-arm-right .vp-fore { animation-name: vpWaveHand; }
        .g-greet .vp-arm-right .vp-hand { animation-name: vpWaveHand; animation-duration: calc(var(--vp-dur, 1s) * .5); }
        .g-greet .vp-arm-right .vp-finger { animation: none; }

        /* omuz silkiyor: kollar yana, avuçlar yukarı, yavaş */
        .g-shrug { --vp-sh: -96deg; --vp-el: -54deg; --vp-wr: -26deg; }
        .g-shrug .vp-upper { animation-name: vpShrug; }
        .g-shrug .vp-fore { animation-name: vpPalmsUp; animation-duration: calc(var(--vp-dur, 1s) * 1.4); }

        /* dinliyor: sağ eldiven kulağın/antenin yanına kıvrılır, sol kol açık süzülür */
        .g-listen { --vp-sh: -100deg; --vp-el: -10deg; }
        .g-listen .vp-arm-left { --vp-sh: -106deg; --vp-el: -6deg; }
        .g-listen .vp-arm-right { --vp-sh: -112deg; --vp-el: -118deg; --vp-wr: -26deg; }
        .g-listen .vp-upper { animation: vpSwayIdle 3.4s steps(4, end) infinite; }
        .g-listen .vp-fore { animation: vpSwayIdle 4.2s steps(4, end) infinite; }
        .g-listen .vp-hand, .g-listen .vp-finger { animation: none; }

        /* düşünüyor: sol eldiven çenenin altında, sağ kol açık */
        .g-think { --vp-sh: -100deg; --vp-el: -10deg; }
        .g-think .vp-arm-left { --vp-sh: -10deg; --vp-el: 96deg; --vp-wr: -34deg; }
        .g-think .vp-arm-right { --vp-sh: -106deg; --vp-el: -6deg; }
        .g-think .vp-upper { animation: vpSwayIdle 4s steps(4, end) infinite; }
        .g-think .vp-hand, .g-think .vp-finger { animation: none; }

        /* ================== cümle sonu kutlaması ======================= */
        .vp-burst { position: absolute; left: 50%; top: 50%; width: 196px; height: 196px; margin: -98px 0 0 -98px; border-radius: 50%; border: 2.5px solid rgba(134,239,172,.75); opacity: 0; pointer-events: none; z-index: 1; }
        .vp-confetti { position: absolute; inset: 0; pointer-events: none; z-index: 6; opacity: 0; }
        .vp-confetti i { position: absolute; left: 50%; top: 46%; width: 7px; height: 7px; border-radius: 2px; border: 1.5px solid #081428; background: #facc15; }
        .vp-confetti i:nth-child(1) { --vp-cx: 84px; --vp-cy: -76px; }
        .vp-confetti i:nth-child(2) { background: #4ade80; --vp-cx: -86px; --vp-cy: -70px; }
        .vp-confetti i:nth-child(3) { background: #38bdf8; --vp-cx: -114px; --vp-cy: -14px; }
        .vp-confetti i:nth-child(4) { background: #f472b6; --vp-cx: 110px; --vp-cy: -22px; }
        .vp-confetti i:nth-child(5) { background: #a5b4fc; --vp-cx: -48px; --vp-cy: 78px; }
        .vp-confetti i:nth-child(6) { background: #fbbf24; --vp-cx: 56px; --vp-cy: 84px; }
        .celebrate .vp-burst { animation: vpBurstRing 1.15s ease-out 1; box-shadow: 0 0 34px rgba(34,197,94,.45); }
        .celebrate .vp-confetti { opacity: 1; }
        .celebrate .vp-confetti i { animation: vpConfetti 1.1s cubic-bezier(.2,.8,.4,1) 1; }
        .celebrate .vp-upper { animation: vpClap .32s steps(3, end) infinite; }
        .celebrate .vp-arm-right { --vp-delay: 0s; }
        .celebrate .vp-fore { animation: vpPalmsUp .32s steps(2, end) infinite; }
        .celebrate .vp-hand, .celebrate .vp-finger { animation: none; }

        .voice-planet-caption { position: absolute; bottom: 10px; z-index: 6; padding: 5px 10px; border-radius: 999px; background: rgba(2,6,23,.68); border: 1px solid rgba(125,211,252,.22); color: #bae6fd; font-size: 11px; font-weight: 900; }

        @media (max-width: 560px) {
          .voice-planet-stage { min-height: 304px; }
          /* scale ayrı bir özelliktir: transform'u animate eden keyframe'leri bozmaz */
          .voice-planet-avatar { scale: .82; }
          .vp-moon-track { width: 250px; height: 170px; margin: -85px 0 0 -125px; }
          .vp-moon-track.slow { width: 300px; height: 205px; margin: -102px 0 0 -150px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .voice-planet-stage, .voice-planet-stage * { animation: none !important; transition-duration: .001s !important; }
        }
      `}</style>

      <div className="vp-shooting-star" aria-hidden="true" />
      <div className="voice-planet-sparks" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
      <div className="vp-confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <div className="vp-moon-track" aria-hidden="true"><span className="vp-moon" /></div>
      <div className="vp-moon-track slow" aria-hidden="true"><span className="vp-moon" /></div>

      <div className="vp-acrobat">
        <div className={`vp-acrobat-3d${celebrate ? ' celebrate' : ''}`}>
          <div
            className={avatarClass}
            ref={avatarRef}
            style={{ '--vp-dur': `${pose.duration.toFixed(2)}s` } as React.CSSProperties}
          >
            <div className="vp-burst" aria-hidden="true" />
            <div className="voice-planet-orbit" />
            <div className="voice-planet-ring"><i /></div>

            <div className="vp-body">
              <Arm side="left" />
              <Arm side="right" />

              <div className="vp-head">
                <div className="vp-antenna"><i /></div>
                <div className="vp-think-dots" aria-hidden="true"><i /><i /><i /></div>

                <div className="voice-planet-core">
                  <div className="vp-surface" />
                  <div className="voice-planet-face">
                    <span className="voice-planet-brow left" />
                    <span className="voice-planet-brow right" />
                    <span className="voice-planet-eye left">
                      <span className="vp-pupil" />
                      <span className="vp-lash vp-lash-1" />
                      <span className="vp-lash vp-lash-2" />
                      <span className="vp-lash vp-lash-3" />
                    </span>
                    <span className="voice-planet-eye right">
                      <span className="vp-pupil" />
                      <span className="vp-lash vp-lash-1" />
                      <span className="vp-lash vp-lash-2" />
                      <span className="vp-lash vp-lash-3" />
                    </span>
                    <span className="vp-cheek left" />
                    <span className="vp-cheek right" />
                    <span className="voice-planet-mouth" style={mouthStyle(viseme, pose)} />
                  </div>
                </div>
              </div>
            </div>
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
