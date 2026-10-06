import React, { useEffect, useRef, useState } from 'react';
import { VISEME_ENERGY, type PlanetPose, type PlanetViseme } from './planetGestures';

/**
 * 🪐 Konuşan gezegen maskotu — Miss Minutes **yüzü**, gezegenin kendi **kolları**.
 *
 * Kurallar (kullanıcı geri bildirimiyle sabitlendi):
 *
 * 1) KOLLAR: rubber-hose boru / beyaz eldiven / mürekkep konturu / amber kelepçe YOK.
 *    Kol, gezegenin kendi mavisinden yumuşak uçlu iki parça (üst kol + ön kol) ve
 *    ucunda parlayan bir el topu. İnsan derisi veya beyaz eldiven de yok: avucun
 *    rengi gezegenin paletinden. Bilek/dirsek "pin"leri sadece jest açılarını tutar.
 * 2) YÜZ: Miss Minutes'tan alınan kısım burası — iri beyaz gözler + bebekler,
 *    üçer kirpik teli, kaşlar, yanak allığı, KÜÇÜK BİR BURUN ve sonsuz esneyen ağız.
 *    Ağız her hecede biçim değiştirir (viseme) ve jest onu yeniden yorumlar.
 * 3) ZAMANLAMA: steps() / "kasıntı" kademe YOK — her şey ease-in-out ile yağ gibi
 *    akar, duruş geçişleri uzun ve yaylanır (rahat). Takla da akıcı: tek bir
 *    yumuşak eğri, film titremesi yok (takılmış gibi görünmesinin sebebi oydu).
 *
 * Kol salınımının GENLİĞİ --vp-amp (hecelerin ağız enerjisinden, rAF ile
 * KESİNTİSİZ yumuşatılır), SÜRESİ --vp-dur (cümlenin jest motorundan) gelir.
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

/** İki parçalı yumuşak kol + enerji eli: tek tekrar, taraf sadece aynalar. */
function Arm({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`vp-arm vp-arm-${side}`}>
      <div className="vp-shoulder-pose">
        <div className="vp-upper">
          <div className="vp-elbow-pose">
            <div className="vp-fore">
              <div className="vp-wrist-pose">
<div className="vp-hand" />
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
    rest: { width: '34px', height: '8px', borderRadius: '999px', top: '99px', background: '#081428' },
    closed: { width: '36px', height: '6px', borderRadius: '999px', top: '99px', background: '#081428' },
    open: { width: '30px', height: '30px', borderRadius: '50%', top: '85px', background: '#081428' },
    wide: { width: '50px', height: '15px', borderRadius: '999px', top: '93px', background: '#081428' },
    round: { width: '26px', height: '26px', borderRadius: '50%', top: '87px', background: '#081428' },
    teeth: { width: '44px', height: '13px', borderRadius: '10px', top: '94px', background: 'linear-gradient(180deg, #f8fafc 0 44%, #081428 45% 100%)' },
    smile: { width: '44px', height: '14px', borderRadius: '0 0 999px 999px', top: '95px', background: '#081428' },
  };
  const shape = { ...base[viseme] };
  if (pose.gesture === 'cheer' || pose.gesture === 'greet') {
    return { ...shape, width: '52px', height: '22px', borderRadius: '8px 8px 999px 999px', top: '89px', background: 'linear-gradient(180deg, #f8fafc 0 22%, #081428 23% 62%, #fb7185 63% 100%)' };
  }
  if (pose.gesture === 'question' || pose.gesture === 'shrug') {
    return { ...shape, borderRadius: '999px 999px 999px 38%' };
  }
  if (pose.gesture === 'point') {
    return { ...shape, width: `${Math.round(Number.parseInt(String(shape.width), 10) * 0.82)}px`, borderRadius: '4px 4px 999px 999px' };
  }
  if (pose.gesture === 'think') {
    return { ...shape, height: '6px', width: '26px', borderRadius: '999px', top: '100px' };
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
  /** Cümle bittiğinde alkış + halka + konfeti + kutlama taklası. */
  const [celebrate, setCelebrate] = useState(false);
  /** Jest değiştiği anda gözler "pop" yapar (Miss Minutes'ın karakteristik anı). */
  const [pop, setPop] = useState(false);

  useEffect(() => {
    const energy = speaking || thinking ? VISEME_ENERGY[viseme] ?? 0.2 : 0.34;
    // Boşta salınım "ölmüş" görünmesin: konuşma dışı hallerde bir taban genlik var.
    const floor = speaking || thinking ? 0 : 0.62;
    targetRef.current = Math.max(floor, pose.amplitude * (0.5 + energy * 0.95));
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
      // Akıcılık: genlik kare kare yumuşatılır, kareye/12fps'ye indirgenMEZ —
      // indirgemek hareketi blok bloka kırıp "kasıntı" yapıyordu.
      if (active || frame % 2 === 0) {
        const beat = active ? 1 + Math.sin(frame / 11) * 0.05 : 1;
        const target = targetRef.current * beat;
        const next = ampRef.current + (target - ampRef.current) * (active ? 0.12 : 0.045);
        if (Math.abs(next - ampRef.current) > 0.0004 || active) {
          ampRef.current = next;
          el.style.setProperty('--vp-amp', next.toFixed(4));
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
        /* taban: konuşma sırasında her iki kolun omuz/dirsek salınımı */
        @keyframes vpSwayA { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -10deg)) scaleY(1); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 11deg)) scaleY(calc(1 + var(--vp-amp, .5) * .07)); } }
        @keyframes vpSwayB { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * 8deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * -9deg)); } }
        @keyframes vpChop { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -17deg)) scaleY(1.05); } 44% { transform: rotate(calc(var(--vp-amp, .5) * 8deg)) scaleY(.96); } }
        @keyframes vpChopFore { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -19deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 14deg)); } }
        @keyframes vpShrug { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * 6deg)) scaleY(.98); } 50% { transform: rotate(calc(var(--vp-amp, .5) * -16deg)) scaleY(1.1); } }
        @keyframes vpPalmsUp { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -11deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 12deg)); } }
        @keyframes vpPump { 0%, 100% { transform: translateY(0) rotate(calc(var(--vp-amp, .5) * -7deg)) scaleY(1.08); } 50% { transform: translateY(-11px) rotate(calc(var(--vp-amp, .5) * 8deg)) scaleY(1.16); } }
        @keyframes vpWaveHand { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -26deg)) scaleX(1); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 26deg)) scaleX(1.06); } }
        /* çizgi film bilek "flick": hızlı atış, sonra anlık bekleme */
        @keyframes vpWristFlick { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -9deg)); } 34% { transform: rotate(calc(var(--vp-amp, .5) * 13deg)); } 62% { transform: rotate(calc(var(--vp-amp, .5) * -5deg)); } }
        @keyframes vpPoke { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -3deg)); } 38% { transform: rotate(calc(var(--vp-amp, .5) * 15deg)); } 56% { transform: rotate(calc(var(--vp-amp, .5) * 5deg)); } }
        /* parmaklar artık dışarı taşan püsküller değil, eldivenin alt kenarındaki
           mürekkep ayırma çizgileri; kıvrılma yükseklik+opaklıkla okunur */
        /* boşta canlılık: kol in-kalk + ön kol süzülme + ara omuz gerinmesi (ayrı
           rotate özelliğiyle: duruş açısını (--vp-sh) ezmez, üstüne biner) */
        @keyframes vpIdleFlap { 0%, 100% { transform: rotate(calc(-6deg - var(--vp-amp, .5) * 8deg)) scaleY(.985); } 50% { transform: rotate(calc(5deg + var(--vp-amp, .5) * 9deg)) scaleY(1.05); } }
        @keyframes vpIdleFore { 0%, 100% { transform: rotate(calc(-4deg - var(--vp-amp, .5) * 7deg)); } 50% { transform: rotate(calc(4deg + var(--vp-amp, .5) * 8deg)); } }
        @keyframes vpIdleShoulder { 0%, 64%, 100% { rotate: 0deg; } 74% { rotate: -20deg; } 86% { rotate: 7deg; } 94% { rotate: 0deg; } }
        @keyframes vpIdleFlourish { 0%, 50%, 100% { transform: rotate(0deg) scaleY(1); } 58% { transform: rotate(calc(-19deg - var(--vp-amp, .5) * 13deg)) scaleY(1.09); } 68% { transform: rotate(calc(15deg + var(--vp-amp, .5) * 11deg)) scaleY(1.03); } 78% { transform: rotate(calc(-15deg)) scaleY(1.06); } 88% { transform: rotate(0deg) scaleY(1); } }
        @keyframes vpClap { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -10deg)); } 50% { transform: rotate(calc(74deg + var(--vp-amp, .5) * 16deg)); } }
        /* vücut ağırlık kaydırma (yumuşak, adımsız) */
        @keyframes vpWeightShift { 0%, 100% { transform: translateX(0) rotate(0deg); } 18% { transform: translateX(-4px) rotate(-1.6deg); } 42% { transform: translateX(3px) rotate(1.2deg); } 66% { transform: translateX(-2px) rotate(-.8deg); } 84% { transform: translateX(4px) rotate(1.6deg); } }
        @keyframes vpCartwheel {
          0% { transform: rotate(-3deg) translateY(0) scale(1); }
          9% { transform: rotate(2.5deg) translateY(-6px) scale(1.005); }
          20% { transform: rotate(-3.5deg) translateY(3px) scale(.998); }
          33% { transform: rotate(3deg) translateY(-8px) scale(1.006); }
          45% { transform: rotate(-2deg) translateY(2px) scale(1); }
          56% { transform: rotate(0deg) translateY(0) scale(1); }
          61% { transform: rotate(16deg) translateY(8px) scale(.98,.96); }
          74% { transform: rotate(296deg) translateY(-16px) scale(.94); }
          82% { transform: rotate(360deg) translateY(-3px) scale(.98,1.04); }
          87% { transform: rotate(356deg) translateY(3px) scale(1.01,.99); }
          93%, 100% { transform: rotate(360deg) translateY(0) scale(1); }
        }
        @keyframes vpFrontFlip { 0%, 70% { transform: rotateX(0deg) scale(1); } 81% { transform: rotateX(360deg) scale(.96); } 88% { transform: rotateX(374deg) scale(1.03); } 95%, 100% { transform: rotateX(360deg) scale(1); } }
        @keyframes vpHoorayFlip { 0% { transform: rotate(0deg) scale(1); } 46% { transform: rotate(-200deg) scale(1.02); } 78% { transform: rotate(-360deg) scale(.98); } 100% { transform: rotate(-360deg) scale(1); } }
        @keyframes vpBurstRing { from { transform: scale(.45); opacity: .95; } to { transform: scale(1.7); opacity: 0; } }
        @keyframes vpConfetti { 0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; } 100% { transform: translate(var(--vp-cx, 0px), var(--vp-cy, -60px)) scale(.35) rotate(220deg); opacity: 0; } }
        @keyframes vpShootingStar { 0% { transform: translate(-140%, 30%) rotate(18deg); opacity: 0; } 8% { opacity: .95; } 46% { transform: translate(150%, -34%) rotate(18deg); opacity: 0; } 100% { transform: translate(150%, -34%) rotate(18deg); opacity: 0; } }
        @keyframes vpLashFlutter { 0%, 100% { rotate: 0deg; } 50% { rotate: -7deg; } }
        /* burun: hiç durmayan minik canlılık + jest tepkileri */
        @keyframes vpNoseBoop { 0%, 100% { transform: translateY(0) scale(1); } 42% { transform: translateY(-1.5px) scale(1.05, .95); } 68% { transform: translateY(.6px) scale(.97, 1.04); } }
        @keyframes vpNosePop { 0% { transform: scale(1); } 40% { transform: scale(1.24, .8); } 100% { transform: scale(1); } }
        /* sayma: el tek tek aşağı vurur (parmak kıvrımı yerine bütün el) */
        @keyframes vpHandTap { 0%, 100% { transform: translateY(0) rotate(0deg) scale(1); } 46% { transform: translateY(5px) rotate(-9deg) scale(1.05, .93); } 70% { transform: translateY(-2px) rotate(4deg) scale(.97, 1.05); } }
        @keyframes vpNod { 0%, 100% { transform: rotate(calc(var(--vp-tilt, 0deg) - 2.2deg)); } 50% { transform: rotate(calc(var(--vp-tilt, 0deg) + 3deg)); } }

        /* ========================== sahne ============================== */
        .voice-planet-stage { --vp-amp: .5; position: relative; perspective: 950px; min-height: 356px; overflow: hidden; border-radius: 22px; margin-bottom: 14px; display: grid; place-items: center; background: radial-gradient(circle at 50% 12%, rgba(56,189,248,.25), transparent 31%), radial-gradient(circle at 18% 85%, rgba(245,158,11,.13), transparent 28%), linear-gradient(180deg, #050816 0%, #0f172a 58%, #111827 100%); border: 1px solid rgba(125,211,252,.24); box-shadow: inset 0 0 60px rgba(14,165,233,.08); }
        .voice-planet-stage * { box-sizing: border-box; }
        .voice-planet-stage::before, .voice-planet-stage::after { content: '✦'; position: absolute; color: #dbeafe; opacity: .72; font-size: 17px; animation: voicePlanetOrbit 5s ease-in-out infinite alternate; }
        .voice-planet-stage::before { left: 15%; top: 18%; }
        .voice-planet-stage::after { right: 14%; top: 34%; animation-delay: 1.2s; }

        .vp-shooting-star { position: absolute; left: 0; top: 0; width: 130px; height: 2px; border-radius: 999px; background: linear-gradient(90deg, transparent, rgba(224,242,254,.2) 28%, #f8fafc 94%); box-shadow: 0 0 12px rgba(125,211,252,.85); animation: vpShootingStar 9.5s ease-in infinite; pointer-events: none; z-index: 0; }
        .voice-planet-sparks { position: absolute; inset: 0; pointer-events: none; }
        .voice-planet-sparks i { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #e0f2fe; box-shadow: 0 0 9px rgba(125,211,252,.9); animation: voicePlanetTwinkle 3.1s ease-in-out infinite; }
        .voice-planet-sparks i:nth-child(1) { left: 26%; top: 26%; }
        .voice-planet-sparks i:nth-child(2) { left: 72%; top: 62%; animation-delay: .8s; }
        .voice-planet-sparks i:nth-child(3) { left: 40%; top: 78%; animation-delay: 1.6s; }
        .voice-planet-sparks i:nth-child(4) { left: 84%; top: 20%; animation-delay: 2.2s; }
        .voice-planet-sparks i:nth-child(5) { left: 8%; top: 52%; animation-delay: 1.1s; }
        .voice-planet-sparks i:nth-child(6) { left: 60%; top: 12%; animation-delay: 2.6s; }
        .voice-planet-sparks i:nth-child(7) { left: 20%; top: 88%; animation-delay: 3.3s; }

        .vp-moon-track { position: absolute; left: 50%; top: 50%; width: 300px; height: 200px; margin: -100px 0 0 -150px; border-radius: 50%; z-index: 1; animation: voicePlanetOrbit 26s linear infinite; pointer-events: none; }
        .vp-moon-track.slow { width: 372px; height: 250px; margin: -125px 0 0 -186px; animation-duration: 23s; animation-direction: reverse; }
        .vp-moon { position: absolute; left: 50%; top: -6px; width: 12px; height: 12px; margin-left: -6px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, #f8fafc, #94a3b8 62%, #475569); border: 1.5px solid #081428; box-shadow: 0 0 12px rgba(148,163,184,.55); animation: voicePlanetBreath 2.6s ease-in-out infinite; }
        .vp-moon-track.slow .vp-moon { width: 9px; height: 9px; margin-left: -4.5px; background: radial-gradient(circle at 30% 30%, #fde68a, #f59e0b 62%, #92400e); box-shadow: 0 0 14px rgba(245,158,11,.7); }

        /* Takla katmanları: avatar'ın kendi transform'unu bozmamak için dışında.
           Akıcı eğri kullanılır — kademe (steps) veya µpx titreme YOK, yoksa takla
           "takılıyor" gibi görünüyor. */
        .vp-acrobat { display: grid; place-items: center; transform-style: preserve-3d; animation: vpCartwheel 14s cubic-bezier(.42,.02,.32,1) infinite; }
        .vp-acrobat-3d { display: grid; place-items: center; transform-style: preserve-3d; animation: vpFrontFlip 32s cubic-bezier(.42,.02,.32,1) infinite; animation-delay: 9s; }
        .vp-acrobat-3d.celebrate { animation: vpHoorayFlip 1.25s cubic-bezier(.36,.05,.28,1.04) 1; }

        .voice-planet-avatar { --vp-sh: -58deg; --vp-el: 26deg; --vp-wr: 8deg; --vp-ease: cubic-bezier(.34,.86,.4,1); position: relative; width: 210px; height: 210px; display: grid; place-items: center; filter: drop-shadow(0 22px 34px rgba(2,8,23,.55)); animation: voicePlanetFloat 7.2s ease-in-out infinite; }
        .voice-planet-avatar.speaking { animation: voicePlanetTalk .62s ease-in-out infinite, voicePlanetFloat 7.2s ease-in-out infinite; }
        .voice-planet-avatar.listening { animation: voicePlanetListen 1.2s ease-in-out infinite, voicePlanetFloat 7.2s ease-in-out infinite; border-radius: 50%; }
        .voice-planet-avatar.thinking { animation: voicePlanetFloat 8.4s ease-in-out infinite; }
        .voice-planet-avatar.g-cheer { animation: voicePlanetCheer 1s cubic-bezier(.3,.8,.4,1) infinite, voicePlanetFloat 7.2s ease-in-out infinite; }
        .voice-planet-avatar.g-greet { animation: voicePlanetCheer 1s ease-in-out infinite, voicePlanetFloat 7.2s ease-in-out infinite; }

        /* gövde grubu: kollar + küre birlikte ağırlık kaydırır (eski çizgi filmde "shift in position") */
        .vp-body { position: absolute; inset: 0; z-index: 4; display: grid; place-items: center; animation: vpWeightShift 11s ease-in-out infinite; }
        .g-idle .vp-body { animation-duration: 13.5s; }
        .vp-head { position: relative; width: 142px; height: 142px; z-index: 1; }
        .voice-planet-avatar.pop .vp-nose { animation: vpNosePop .46s cubic-bezier(.3,.8,.35,1) 1; }
        .g-question .vp-nose, .g-shrug .vp-nose { translate: 0 -1.5px; }
        .g-cheer .vp-nose { scale: 1.1 .9; }
        .brows-down .vp-nose { scale: .9 1.16; }
        .voice-planet-avatar.pop .vp-head { animation: voicePlanetSquash .5s cubic-bezier(.3,.8,.35,1) 1; }

        .voice-planet-orbit { position: absolute; inset: -26px; border: 1px dashed rgba(125,211,252,.25); border-radius: 50%; animation: voicePlanetOrbit 18s linear infinite; }
        .voice-planet-ring { position: absolute; left: 50%; top: 53%; width: 266px; height: 54px; transform: translate(-50%, -50%) rotate(-15deg); border-radius: 50%; overflow: hidden; background: linear-gradient(90deg, transparent 0%, rgba(250,204,21,.14) 15%, #facc15 36%, #fde68a 50%, #f59e0b 65%, rgba(250,204,21,.12) 84%, transparent 100%); box-shadow: 0 0 18px rgba(245,158,11,.22); animation: voicePlanetRing 3.6s ease-in-out infinite; z-index: 1; }
        .voice-planet-ring::after { content: ''; position: absolute; inset: 13px 26px; border-radius: 50%; background: #071122; }
        .voice-planet-ring i { position: absolute; top: 0; left: -42%; width: 32%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent); filter: blur(1px); animation: voicePlanetRingGlint 5.4s ease-in-out infinite; }

        .voice-planet-core { position: relative; width: 142px; height: 142px; border-radius: 50%; background: radial-gradient(circle at 24% 14%, rgba(255,255,255,.62) 0 7%, rgba(255,255,255,0) 26%), radial-gradient(circle at 50% 56%, #4f93e8 0 38%, #2f6fd0 62%, #16307a 100%); border: 3px solid #081428; overflow: hidden; animation: voicePlanetBreath calc(var(--vp-dur, 1s) * 4.6) ease-in-out infinite; box-shadow: inset -18px -22px 34px rgba(4,17,45,.42), inset 10px 10px 20px rgba(255,255,255,.22); z-index: 3; }
        .voice-planet-core::before { content: ''; position: absolute; left: -18px; top: 96px; width: 182px; height: 26px; background: rgba(255,255,255,.12); transform: rotate(-14deg); border-radius: 999px; }
        .vp-surface { position: absolute; inset: 0; border-radius: 50%; opacity: .85; background: repeating-linear-gradient(104deg, transparent 0 15px, rgba(134,239,172,.28) 15px 27px, transparent 27px 46px, rgba(45,212,191,.2) 46px 60px); animation: voicePlanetSpinSurface 11s linear infinite; }

        /* ========================== yüz =============================== */
        .voice-planet-face { position: absolute; inset: 0; z-index: 4; transform: rotate(var(--vp-tilt, 0deg)); transition: transform .34s var(--vp-ease); }
        .speaking .voice-planet-face { animation: vpNod calc(var(--vp-dur, 1s) * 1.7) ease-in-out infinite; }

        /* klasik çizgi filmi gözleri: beyaz akl + kontur + koyu bebek + yakalama ışığı */
        .voice-planet-eye { position: absolute; top: 46px; width: 22px; height: 26px; border-radius: 50% 50% 48% 48%; background: radial-gradient(circle at 42% 30%, #ffffff, #e6f2ff 72%, #bfdbfe); border: 2.8px solid #081428; box-shadow: 0 1px 0 rgba(8,20,40,.25); animation: voicePlanetBlink 6.4s ease-in-out infinite; }
        .voice-planet-eye.left { left: 39px; }
        .voice-planet-eye.right { right: 39px; animation-delay: .12s; }
        .voice-planet-avatar.pop .voice-planet-eye { animation: voicePlanetPop .46s cubic-bezier(.3,.8,.35,1) 1, voicePlanetBlink 5.2s ease-in-out infinite; }
        .vp-pupil { position: absolute; left: 5px; top: 5px; width: 9px; height: 11px; border-radius: 50%; background: #081428; animation: voicePlanetGaze 9s ease-in-out infinite; }
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
        .speaking .vp-lash { animation: vpLashFlutter calc(var(--vp-dur, 1s) * 1.1) ease-in-out infinite; }
        .g-idle .vp-lash { animation: vpLashFlutter 3.1s ease-in-out infinite; }

        .voice-planet-brow { position: absolute; top: 29px; width: 24px; height: 5.5px; border-radius: 999px; background: #081428; transform: translateY(0) rotate(0deg); transition: transform .4s var(--vp-ease); }
        .voice-planet-brow.left { left: 36px; }
        .voice-planet-brow.right { right: 36px; }
        .brows-up .voice-planet-brow { transform: translateY(-7px) rotate(-10deg); }
        .brows-down .voice-planet-brow { transform: translateY(4px) rotate(12deg); }
        .brows-down .voice-planet-brow.right { transform: translateY(2px) rotate(-15deg); }
        @keyframes vpBrowTwitch { 0%, 100% { translate: 0 0; } 50% { translate: 0 -1.6px; } }
        .speaking .voice-planet-brow { animation: vpBrowTwitch calc(var(--vp-dur, 1s) * 2.6) ease-in-out infinite; }

        .voice-planet-mouth { position: absolute; left: 50%; transform: translateX(-50%); border: 2.2px solid #081428; transition: width .12s cubic-bezier(.3,.8,.4,1), height .13s cubic-bezier(.3,.8,.4,1), top .13s cubic-bezier(.3,.8,.4,1), border-radius .2s ease-out, background .2s ease-out; box-shadow: inset 0 -3px 0 rgba(255,255,255,.12); }
        .speaking .voice-planet-mouth { animation: voicePlanetLipWiggle calc(var(--vp-dur, 1s) * 1.15) ease-in-out infinite; }
        .vp-cheek { position: absolute; top: 86px; width: 21px; height: 12px; border-radius: 50%; background: radial-gradient(circle, rgba(251,113,133,.9), rgba(251,113,133,0) 72%); opacity: calc(.14 + var(--vp-amp, .5) * .34); filter: blur(.6px); }
        .vp-cheek.left { left: 19px; }
        .vp-cheek.right { right: 19px; }

        .vp-antenna { position: absolute; left: 50%; top: -30px; width: 4px; height: 32px; margin-left: -2px; border-radius: 4px; background: #0f2c5c; border: 1.5px solid #081428; transform-origin: 50% 100%; animation: voicePlanetAntenna 2.7s ease-in-out infinite; z-index: 5; }
        .vp-antenna i { position: absolute; left: 50%; top: -10px; width: 13px; height: 13px; margin-left: -6.5px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, #fef9c3, #facc15 58%, #b45309); border: 2px solid #081428; animation: voicePlanetAntennaPulse calc(var(--vp-dur, 1s) * 1.4) ease-in-out infinite; }
        .vp-think-dots { position: absolute; left: 50%; top: -54px; display: flex; gap: 5px; transform: translateX(-50%); opacity: 0; transition: opacity .22s ease; z-index: 5; }
        .thinking .vp-think-dots { opacity: 1; }
        .vp-think-dots i { width: 6px; height: 6px; border-radius: 50%; background: #a5b4fc; border: 1.5px solid #081428; animation: voicePlanetThinkDot 1.05s ease-in-out infinite; }
        .vp-think-dots i:nth-child(2) { animation-delay: .16s; }
        .vp-think-dots i:nth-child(3) { animation-delay: .32s; }

        /* ==================== YUMUŞAK ENERJİ KOLLARI ================== */
        /* Kontur, kelepçe, eldiven yok: gezegenin kendi mavisinden, yumuşak uçlu
           iki parça + elde parlak top. Ayrışma konturla değil, ışıkla sağlanıyor. */
        .vp-arm { position: absolute; top: 104px; width: 0; height: 0; z-index: 3; transform: scaleX(var(--vp-side, 1)); }
        .vp-arm-left { left: 40px; --vp-side: -1; --vp-delay: 0s; }
        .vp-arm-right { left: 170px; --vp-side: 1; --vp-delay: calc(var(--vp-dur, 1s) / -2); }
        .vp-shoulder-pose { position: absolute; left: 0; top: 0; width: 0; height: 0; transform: rotate(var(--vp-sh, -58deg)); transition: transform .42s var(--vp-ease); }
        .vp-elbow-pose { position: absolute; left: 0; top: 40px; width: 0; height: 0; transform: rotate(var(--vp-el, 26deg)); transition: transform .42s var(--vp-ease); }
        .vp-wrist-pose { position: absolute; left: 0; top: 32px; width: 0; height: 0; transform: rotate(var(--vp-wr, 8deg)); transition: transform .34s var(--vp-ease); }

        .vp-upper { position: absolute; left: -8px; top: 0; width: 16px; height: 46px; border-radius: 999px; transform-origin: 50% 0; background: linear-gradient(102deg, rgba(19,52,110,.95) 0 16%, #4f93e8 46%, #a9d6ff 60%, rgba(17,44,94,.95)); box-shadow: 0 0 11px rgba(56,189,248,.2); animation: vpSwayA var(--vp-dur, 1s) ease-in-out infinite; animation-delay: var(--vp-delay, 0s); }
        .vp-fore { position: absolute; left: -7px; top: 4px; width: 14px; height: 36px; border-radius: 999px; transform-origin: 50% 0; background: linear-gradient(102deg, rgba(19,52,110,.95) 0 18%, #6ab2f5 50%, #c7e5ff 64%, rgba(21,52,104,.95)); box-shadow: 0 0 9px rgba(125,211,252,.18); animation: vpSwayB var(--vp-dur, 1s) ease-in-out infinite; animation-delay: calc(var(--vp-delay, 0s) - var(--vp-dur, 1s) / 6); }
        .vp-hand { position: absolute; left: -12px; top: 2px; width: 25px; height: 24px; border-radius: 50% 50% 47% 47%; transform-origin: 50% 0; background: radial-gradient(circle at 34% 26%, #f0f8ff 0 16%, #74b6f5 56%, #1f4f9e 100%); box-shadow: 0 0 calc(7px + var(--vp-amp, .5) * 15px) rgba(125,211,252,calc(.26 + var(--vp-amp, .5) * .32)), inset -2px -3px 7px rgba(6,20,48,.4); animation: vpWristFlick calc(var(--vp-dur, 1s) * 2.2) ease-in-out infinite; transition: width .3s var(--vp-ease), border-radius .3s var(--vp-ease); }

        /* burun: Miss Minutes'in keskin küçük burnu — gezegen tonunda, minik ve esnek */
        .vp-nose { position: absolute; left: 50%; top: 65px; width: 13px; height: 12px; margin-left: -6.5px; border-radius: 52% 52% 46% 46% / 40% 40% 60% 60%; background: radial-gradient(circle at 36% 26%, #e8f4ff, #57a5ef 58%, #1c4794); box-shadow: 0 2px 5px rgba(6,20,48,.34), inset 0 -2px 3px rgba(6,20,48,.28); transform-origin: 50% 20%; animation: vpNoseBoop 3.4s ease-in-out infinite; z-index: 5; }

        /*
         * Duruşlar. Sözleşme: NEGATİF = kol dışarı, POZİTİF = içeri.
         * 0° = kol aşağı sarkık, -90° = tam yan (180° açıklık). Boşta duruş
         * bilinçli olarak -58°: kollar açık ama "T-pozu" değil, hafif aşağı
         * dönük süzülen kartun duruşu — dirsek kırık, ön kol gevşek.
         */

        /* boşta: kollar açık ve HAREKETLİ (in-kalk kol + süzülen ön kol + ara gerinme) */
        .g-idle { --vp-sh: -58deg; --vp-el: 26deg; --vp-wr: 8deg; }
        .g-idle .vp-upper { animation: vpIdleFlap 4.6s ease-in-out infinite; }
        .g-idle .vp-fore { animation: vpIdleFore 3.8s ease-in-out infinite; animation-delay: -1s; }
        .g-idle .vp-shoulder-pose { animation: vpIdleShoulder 13s ease-in-out infinite; }
        .g-idle .vp-arm-right .vp-fore { animation: vpIdleFlourish 12s ease-in-out infinite; animation-delay: 0s; }
        .g-idle .vp-hand { animation: vpPalmsUp 5.4s ease-in-out infinite; }
        .g-idle .vp-arm-right, .g-question .vp-arm-right, .g-shrug .vp-arm-right, .g-cheer .vp-arm-right, .g-listen .vp-arm-right, .g-think .vp-arm-right, .g-calm .vp-arm-right { --vp-delay: 0s; }

        /* sakin anlatım: kol hafif açık, ön kol gevşek, tempo yumuşak */
        .g-calm { --vp-sh: -50deg; --vp-el: 30deg; --vp-wr: 4deg; }

        /* örnekli / madde madde anlatım: kollar sırayla keser */
        .g-explain { --vp-sh: -44deg; --vp-el: 16deg; }
        .g-explain .vp-upper { animation-name: vpChop; }
        .g-explain .vp-fore { animation-name: vpChopFore; }
        .g-explain .voice-planet-face { --vp-tilt: -3.5deg; }

        /* soru: kollar yana-kalkık, avuçlar tavana, omuzlar yükselir */
        .g-question { --vp-sh: -70deg; --vp-el: -6deg; --vp-wr: -16deg; }
        .g-question .vp-upper { animation-name: vpShrug; }
        .g-question .vp-fore { animation-name: vpPalmsUp; }
        .g-question .voice-planet-face { --vp-tilt: 4.5deg; }

        /* coşku: kollar "V" olup pompalanır, vücut zıplar */
        .g-cheer { --vp-sh: -138deg; --vp-el: 12deg; --vp-wr: 6deg; }
        .g-cheer .vp-upper { animation-name: vpPump; }
        .g-cheer .vp-fore { animation-name: vpWaveHand; }
        .g-cheer .vp-hand { animation-name: vpWaveHand; animation-duration: calc(var(--vp-dur, 1s) * .7); }

        /* vurgu: sağ kol yana uzanıp işaret parmağını çıkarır, diğerleri kıvrılır */
        .g-point { --vp-sh: -52deg; --vp-el: 24deg; }
        .g-point .vp-arm-right { --vp-sh: -78deg; --vp-el: 4deg; --vp-wr: 0deg; }
        .g-point .vp-arm-right .vp-fore { animation-name: vpPoke; }
        /* uçta parmak çıkıntısı yok: elin kendisi sivrilip uzuyor */
        .g-point .vp-arm-right .vp-hand { animation: none; width: 21px; height: 30px; border-radius: 46% 54% 40% 40% / 26% 26% 74% 74%; transform: scaleY(1.12); }
        /* işaret parmağı: çizgi filmin klasik pointing eldiveni — sadece o parmak dışarı çıkar */

        /* sayma: sağ eldiven kulak hizasında, çizgiler vuruşla kısalır (parmak sayar) */
        .g-count { --vp-sh: -52deg; --vp-el: 24deg; }
        .g-count .vp-arm-right .vp-hand { animation: vpHandTap calc(var(--vp-dur, 1s) * .85) ease-in-out infinite; }
        .g-count .vp-arm-right { --vp-sh: -116deg; --vp-el: 4deg; --vp-wr: -10deg; }

        /* selam: sağ kol kalkar, eldiven bilekten hızlı hızlı sallar */
        .g-greet { --vp-sh: -52deg; --vp-el: 24deg; }
        .g-greet .vp-arm-right { --vp-sh: -112deg; --vp-el: 18deg; --vp-wr: -6deg; }
        .g-greet .vp-arm-right .vp-upper { animation-name: vpPalmsUp; }
        .g-greet .vp-arm-right .vp-fore { animation-name: vpWaveHand; }
        .g-greet .vp-arm-right .vp-hand { animation-name: vpWaveHand; animation-duration: calc(var(--vp-dur, 1s) * .5); }

        /* omuz silkiyor: kollar yarım açık, avuçlar yukarı, hareket yavaş */
        .g-shrug { --vp-sh: -62deg; --vp-el: 2deg; --vp-wr: -18deg; }
        .g-shrug .vp-upper { animation-name: vpShrug; }
        .g-shrug .vp-fore { animation-name: vpPalmsUp; animation-duration: calc(var(--vp-dur, 1s) * 1.4); }

        /* dinliyor: sağ eldiven kulağın/antenin yanına kıvrılır, sol kol açık süzülür */
        .g-listen { --vp-sh: -58deg; --vp-el: 26deg; }
        .g-listen .vp-arm-left { --vp-sh: -64deg; --vp-el: 22deg; }
        .g-listen .vp-arm-right { --vp-sh: -96deg; --vp-el: -122deg; --vp-wr: -24deg; }
        .g-listen .vp-upper { animation: vpIdleFore 3.4s ease-in-out infinite; }
        .g-listen .vp-fore { animation: vpIdleFore 4.2s ease-in-out infinite; }

        /* düşünüyor: sol eldiven çenenin altında, sağ kol açık süzülür */
        .g-think { --vp-sh: -58deg; --vp-el: 26deg; }
        .g-think .vp-arm-left { --vp-sh: -18deg; --vp-el: 90deg; --vp-wr: -30deg; }
        .g-think .vp-arm-right { --vp-sh: -64deg; --vp-el: 22deg; }
        .g-think .vp-arm-right .vp-upper { animation: vpIdleFlap 4s ease-in-out infinite; }

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
        .celebrate .vp-upper { animation: vpClap .44s cubic-bezier(.3,.8,.4,1) infinite; }
        .celebrate .vp-arm-right { --vp-delay: 0s; }
        .celebrate .vp-fore { animation: vpPalmsUp .44s ease-in-out infinite; }

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
                    <span className="vp-nose" aria-hidden="true" />
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
