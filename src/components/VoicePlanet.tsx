import React, { useEffect, useRef, useState } from 'react';
import { VISEME_ENERGY, type PlanetPose, type PlanetViseme } from './planetGestures';

/**
 * 🪐 Konuşan gezegen maskotu — Miss Minutes'in YÜZÜ + zamanı, gezegenin kendi bedeni.
 *
 * Bu rig'in dört kuralı var (kullanıcı geri bildirimiyle sabitlendi):
 *
 * 1) TEK PARÇA KOLLAR: dirsek/bilek diye bölünmüş, iki parçaya ayrılan kol YOK.
 *    Kol = omuzdan çıkan DÜMDÜZ tek bir boru + ucunda gezegen rengi bir el topu.
 *    Eldiven, insan derisi, mürekkep konturu, kelepçe yok; ayrışma ışıkla veriliyor.
 *    Yön vermek için tek bir açı yeter (omuz pimi): kolun ucu omuz çevresinde döner.
 * 2) YÜZ: Miss Minutes'tan alınan kısım. İki göz de KARŞIYA bakar (şaşı olmaz:
 *    bebekler simetrik, iki göz aynı fazda kıpırdar). Bebekler BÜYÜK ve KOYU.
 *    Kırpma insanlardaki gibi: üst GÖZ KAPAĞI yukarıdan inip gözü kapatır, kirpiklar
 *    kapakla birlikte iner. Kaş, yanak allığı, küçük burun ve sonsuz esneyen ağız var.
 * 3) SAAT: topun ZEMİNİ bir saat kadranı — 12 çentik + dört uzun çentik + kadrans
 *    çizgisi. AKREP VE YELKOVAN YOK, hareket de yok (dönen şeritler kaldırıldı);
 *    çentikler 87-98% yarıçap bandında, yani kaş/göz/burun/ağız kutularına girmez.
 * 4) ELLER: Mr Minutes gibi YUMRUK — boğum çizgili, asimetrik kütle, yatık
 *    başparmak. Yumruk kolun ritmiyle sarkar gibi sallanır; düşünme/aydınlanmada
 *    havaya kalkar, onayda başparmak dikilir, göstermede boğum şeridi tek parmağa
 *    dönüşür, "eller belde"de iki yumruk topun alt yanlarına oturur.
 * 5) AKICILIK: steps()/kare kare zamanlama YOK, film titremesi YOK. Konuşurken TAKLA
 *    YOK — takla boşta olan tek atımlık bir hareket; cümle başlarsa yenisi başlamaz.
 *
 * Kanal disiplini (bir elementi iki animasyonun bozmaması için her davranış ayrı
 * özelliğe yazılır): omuz pimi transform = duruş açısı, rotate = gerinme; kol
 * transform = salınım, scale = esneme, translate = vuruş; el rotate = bilek açısı,
 * transform = bilek kıvrımı, scale = avuç çevirme.
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

/** Dümdüz tek parça kol: omuz pimi → boru → uçta el topu. Taraf sadece aynalar. */
function Arm({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`vp-arm vp-arm-${side}`}>
      <div className="vp-shoulder-pose">
        <div className="vp-limb">
          <div className="vp-hand" />
        </div>
      </div>
    </div>
  );
}

/** Bir göz: beyazı, büyük koyu bebeği, inen kapağı ve kapakla inen kirpikleri. */
function Eye({ side }: { side: 'left' | 'right' }) {
  return (
    <span className={`voice-planet-eye ${side}`}>
      <span className="vp-eye-white">
        <span className="vp-pupil" />
        <span className="vp-lid" />
      </span>
      <span className="vp-squint" />
      <span className="vp-lash-row">
        <i className="vp-lash vp-lash-1" />
        <i className="vp-lash vp-lash-2" />
        <i className="vp-lash vp-lash-3" />
      </span>
    </span>
  );
}

/**
 * Ağız biçimi + jestin yüz yorumu. Çizgi film ağzı "malleable": coşkuda geniş
 * gülümseme + dil, vurguda dişli ince çizgi, soruda yamuk sırıtış, tereddütte
 * küçük "o", düşünmede düz çizgi. Geçişler akıcı (kademe yok).
 */
function mouthStyle(viseme: PlanetViseme, pose: PlanetPose): React.CSSProperties {
  const base: Record<PlanetViseme, React.CSSProperties> = {
    rest: { width: '34px', height: '8px', borderRadius: '999px', top: '84px', background: '#0a1730' },
    closed: { width: '36px', height: '6px', borderRadius: '999px', top: '85px', background: '#0a1730' },
    open: { width: '30px', height: '26px', borderRadius: '50%', top: '74px', background: '#0a1730' },
    wide: { width: '50px', height: '15px', borderRadius: '999px', top: '80px', background: '#0a1730' },
    round: { width: '26px', height: '24px', borderRadius: '50%', top: '76px', background: '#0a1730' },
    teeth: { width: '44px', height: '13px', borderRadius: '10px', top: '81px', background: 'linear-gradient(180deg, #f8fafc 0 44%, #0a1730 45% 100%)' },
    smile: { width: '44px', height: '14px', borderRadius: '0 0 999px 999px', top: '82px', background: '#0a1730' },
  };
  const shape = { ...base[viseme] };
  if (pose.gesture === 'cheer' || pose.gesture === 'greet') {
    return { ...shape, width: '52px', height: '22px', borderRadius: '8px 8px 999px 999px', top: '76px', background: 'linear-gradient(180deg, #f8fafc 0 20%, #0a1730 21% 58%, #fb7185 59% 100%)' };
  }
  if (pose.gesture === 'question' || pose.gesture === 'shrug') {
    return { ...shape, borderRadius: '999px 999px 999px 38%' };
  }
  if (pose.gesture === 'point') {
    return { ...shape, width: `${Math.round(Number.parseInt(String(shape.width), 10) * 0.82)}px`, borderRadius: '4px 4px 999px 999px' };
  }
  if (pose.gesture === 'think') {
    return { ...shape, height: '6px', width: '26px', borderRadius: '999px', top: '88px' };
  }
  return shape;
}

/**
 * Takla zamanlayıcısı: takla YALNIZCA boşta/dinlerken ve tek atımlık oynar.
 * Konuşma veya düşünme başladıysa yeni takla başlamaz; uçan takla kısa sürdüğü
 * için (1.9s) kendiliğinden tam turda biter — 360° = 0° olduğundan sınıf
 * kalktığında ani sıçrama da olmaz.
 */
function usePlanetFlip(args: { speaking: boolean; thinking: boolean; listening: boolean; reduced: boolean }) {
  const { speaking, thinking, listening, reduced } = args;
  const [flip, setFlip] = useState<'none' | 'wheel' | 'front'>('none');

  useEffect(() => {
    if (flip === 'none') return undefined;
    const t = window.setTimeout(() => setFlip('none'), 2400);
    return () => window.clearTimeout(t);
  }, [flip]);

  useEffect(() => {
    if (reduced || speaking || thinking || listening) return undefined;
    const wait = 5200 + Math.random() * 7400;
    const t = window.setTimeout(() => {
      setFlip((prev) => (prev === 'none' ? (Math.random() < 0.62 ? 'wheel' : 'front') : prev));
    }, wait);
    return () => window.clearTimeout(t);
  }, [reduced, speaking, thinking, listening, flip]);

  return flip;
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
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  const flip = usePlanetFlip({ speaking, thinking, listening, reduced });

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
    const timer = window.setTimeout(() => setCelebrate(false), 1350);
    return () => window.clearTimeout(timer);
  }, [speaking]);

  useEffect(() => {
    setPop(true);
    const timer = window.setTimeout(() => setPop(false), 420);
    return () => window.clearTimeout(timer);
  }, [pose.gesture]);

  // Genliği kare kare yumuşatır; kareye indirgemeden (akıcı) uygular.
  useEffect(() => {
    if (typeof window === 'undefined' || reduced) return undefined;
    const el = avatarRef.current;
    if (!el) return undefined;
    let raf = 0;
    let frame = 0;
    const step = () => {
      frame += 1;
      const active = activeRef.current;
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
  }, [reduced]);

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
        @keyframes voicePlanetFloat { 0% { transform: translate(0, 0) rotate(-2deg); } 26% { transform: translate(6px, -12px) rotate(1.1deg); } 52% { transform: translate(-2px, -4px) rotate(-1.3deg); } 76% { transform: translate(-7px, -10px) rotate(2deg); } 100% { transform: translate(0, 0) rotate(-2deg); } }
        @keyframes voicePlanetOrbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes voicePlanetRing { 0%, 100% { transform: translate(-50%, -50%) rotate(-15deg) scaleX(1); } 50% { transform: translate(-50%, -50%) rotate(-10deg) scaleX(1.05); } }
        @keyframes voicePlanetRingGlint { 0% { left: -42%; opacity: 0; } 22% { opacity: .9; } 62% { left: 110%; opacity: 0; } 100% { left: 110%; opacity: 0; } }
        @keyframes voicePlanetListen { 0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,.5), 0 0 42px rgba(56,189,248,.25); } 50% { box-shadow: 0 0 0 20px rgba(34,197,94,0), 0 0 60px rgba(34,197,94,.34); } }
        @keyframes voicePlanetTalk { 0%, 100% { transform: translateY(0) scale(1) rotate(-1.4deg); } 50% { transform: translateY(-6px) scale(1.03) rotate(1.4deg); } }
        @keyframes voicePlanetCheer { 0%, 100% { transform: translateY(0) scale(1); } 38% { transform: translateY(-14px) scale(1.05); } 62% { transform: translateY(-3px) scale(.99); } 78% { transform: translateY(-7px) scale(1.02); } }
        @keyframes voicePlanetTwinkle { 0%, 100% { opacity: .18; transform: scale(.65); } 50% { opacity: 1; transform: scale(1.3); } }
        @keyframes voicePlanetGaze { 0%, 34%, 100% { translate: 0 0; } 44% { translate: 1.6px -.6px; } 58% { translate: -1.6px .4px; } 72% { translate: .4px 1.2px; } }
        @keyframes voicePlanetPop { 0% { scale: 1 1; } 40% { scale: 1.22 .82; } 100% { scale: 1 1; } }
        @keyframes voicePlanetSquash { 0% { scale: 1 1; translate: 0 0; } 36% { scale: 1.06 .94; translate: 0 2px; } 70% { scale: .96 1.05; translate: 0 -3px; } 100% { scale: 1 1; translate: 0 0; } }
        @keyframes voicePlanetBreath { 0%, 100% { transform: scale(1); } 50% { transform: scale(calc(1 + var(--vp-amp, .5) * .03)); } }
        @keyframes voicePlanetLipWiggle { 0%, 100% { transform: translateX(-50%) scaleX(1); } 50% { transform: translateX(-50%) scaleX(1.05); } }
        @keyframes vpNod { 0%, 100% { transform: rotate(calc(var(--vp-tilt, 0deg) - 1.8deg)); } 50% { transform: rotate(calc(var(--vp-tilt, 0deg) + 2.4deg)); } }

        /* ---- kapaklı kırpma: insandaki gibi üst kapak iner, kirpikler onunla iner ---- */
        @keyframes vpLidClose { 0%, 89% { transform: translate(0, -104%); } 93%, 95.5% { transform: translate(0, 1%); } 100% { transform: translate(0, -104%); } }
        @keyframes vpLashDrop { 0%, 89% { translate: 0 0; } 93%, 95.5% { translate: 0 26px; } 100% { translate: 0 0; } }
        @keyframes vpLashFlutter { 0%, 100% { rotate: 0deg; } 50% { rotate: -5deg; } }
        @keyframes vpBrowTwitch { 0%, 100% { translate: 0 0; } 50% { translate: 0 -1.5px; } }

        /* ---- tek parça kol salınımları ---- */
        @keyframes vpSwayA { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -9deg)) ; } 50% { transform: rotate(calc(var(--vp-amp, .5) * 10deg)); } }
        @keyframes vpStretch { 0%, 100% { scale: 1 1; } 50% { scale: calc(1 - var(--vp-amp, .5) * .035) calc(1 + var(--vp-amp, .5) * .06); } }
        @keyframes vpHandSway { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -8deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 11deg)); } }
        @keyframes vpChop { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -16deg)); } 46% { transform: rotate(calc(var(--vp-amp, .5) * 9deg)); } }
        @keyframes vpShrug { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * 5deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * -13deg)); } }
        @keyframes vpPalmsUp { 0%, 100% { scale: 1 1; rotate: calc(var(--vp-amp, .5) * -9deg); } 50% { scale: 1.1 .92; rotate: calc(var(--vp-amp, .5) * 12deg); } }
        @keyframes vpPump { 0%, 100% { transform: translateY(0) rotate(calc(var(--vp-amp, .5) * -8deg)); } 50% { transform: translateY(-12px) rotate(calc(var(--vp-amp, .5) * 9deg)); } }
        /* yumruk sallanması: kolun ritmiyle aynı saatte, bilekte sarkar gibi */
        @keyframes vpFistSwing { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -12deg)); } 34% { transform: rotate(calc(var(--vp-amp, .5) * 15deg)); } 68% { transform: rotate(calc(var(--vp-amp, .5) * -5deg)); } }
        /* havaya kalkık yumruk: ağır ağır yukarı doğru itilir (düşünme/aydınlanma) */
        @keyframes vpFistLift { 0%, 100% { translate: 0 0; } 50% { translate: -1px -6px; } }
        @keyframes vpPunchArm { 0%, 100% { transform: rotate(0deg); } 34% { transform: rotate(calc(-13deg - var(--vp-amp, .5) * 6deg)); } 62% { transform: rotate(calc(5deg + var(--vp-amp, .5) * 3deg)); } }
        @keyframes vpHipsBob { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -2.4deg)); } 50% { transform: rotate(calc(var(--vp-amp, .5) * 2.8deg)); } }
        @keyframes vpPoke { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -4deg)); } 38% { transform: rotate(calc(var(--vp-amp, .5) * 14deg)); } 58% { transform: rotate(calc(var(--vp-amp, .5) * 4deg)); } }
        @keyframes vpHandTap { 0%, 100% { translate: 0 0; } 46% { translate: 0 5px; } 70% { translate: 0 -2px; } }

        /* ---- boşta canlılık: kollar hiç durmaz, ama 180 derece açılmaz ---- */
        @keyframes vpIdleFlap { 0%, 100% { transform: rotate(calc(-3deg - var(--vp-amp, .5) * 8deg)); } 38% { transform: rotate(calc(2deg + var(--vp-amp, .5) * 9deg)); } 66% { transform: rotate(calc(-1deg + var(--vp-amp, .5) * 3deg)); } }
        @keyframes vpIdleHand { 0%, 100% { transform: rotate(calc(var(--vp-amp, .5) * -6deg)); scale: 1 1; } 42% { transform: rotate(calc(var(--vp-amp, .5) * 8deg)); scale: 1.05 .96; } 74% { transform: rotate(calc(var(--vp-amp, .5) * 2deg)); scale: .97 1.04; } }
        @keyframes vpIdleShoulder { 0%, 78%, 100% { rotate: 0deg; } 84% { rotate: calc(var(--vp-amp, .5) * 7deg); } 90% { rotate: calc(var(--vp-amp, .5) * -4deg); } }
        @keyframes vpIdleFlourish { 0%, 52%, 100% { transform: rotate(0deg); } 60% { transform: rotate(calc(-16deg - var(--vp-amp, .5) * 11deg)); } 70% { transform: rotate(calc(12deg + var(--vp-amp, .5) * 9deg)); } 80% { transform: rotate(calc(-9deg)); } 88% { transform: rotate(0deg); } }
        @keyframes vpWeightShift { 0%, 100% { transform: translateX(0) rotate(0deg); } 18% { transform: translateX(-4px) rotate(-1.5deg); } 42% { transform: translateX(3px) rotate(1.1deg); } 66% { transform: translateX(-2px) rotate(-.7deg); } 84% { transform: translateX(4px) rotate(1.4deg); } }

        /* ---- tek atımlık taklalar (konuşurken başlamaz) ---- */
        @keyframes vpCartwheel {
          0% { transform: rotate(0deg) translateY(0) scale(1); }
          14% { transform: rotate(15deg) translateY(8px) scale(.97,.95); }
          34% { transform: rotate(184deg) translateY(-16px) scale(.96); }
          56% { transform: rotate(360deg) translateY(-5px) scale(1.02,.98); }
          72% { transform: rotate(371deg) translateY(2px) scale(.99,1.03); }
          86% { transform: rotate(357deg) translateY(-1px) scale(1); }
          100% { transform: rotate(360deg) translateY(0) scale(1); }
        }
        @keyframes vpFrontFlip { 0% { transform: rotateX(0deg) scale(1); } 20% { transform: rotateX(-24deg) translateY(7px) scale(1.02,.97); } 62% { transform: rotateX(360deg) translateY(-15px) scale(.96); } 82% { transform: rotateX(373deg) translateY(-3px) scale(1.03); } 100% { transform: rotateX(360deg) translateY(0) scale(1); } }
        @keyframes vpHoorayFlip { 0% { transform: rotate(0deg) scale(1); } 46% { transform: rotate(-200deg) scale(1.02); } 78% { transform: rotate(-360deg) scale(.98); } 100% { transform: rotate(-360deg) scale(1); } }
        @keyframes vpBurstRing { from { transform: scale(.45); opacity: .95; } to { transform: scale(1.7); opacity: 0; } }
        @keyframes vpConfetti { 0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; } 100% { transform: translate(var(--vp-cx, 0px), var(--vp-cy, -60px)) scale(.35) rotate(220deg); opacity: 0; } }
        @keyframes vpShootingStar { 0% { transform: translate(-140%, 30%) rotate(18deg); opacity: 0; } 8% { opacity: .95; } 46% { transform: translate(150%, -34%) rotate(18deg); opacity: 0; } 100% { transform: translate(150%, -34%) rotate(18deg); opacity: 0; } }
        @keyframes vpAntenna { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(7deg); } }
        @keyframes vpAntennaPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(250,204,21,.65); transform: scale(1); } 50% { box-shadow: 0 0 0 calc(var(--vp-amp, .5) * 9px) rgba(250,204,21,0); transform: scale(calc(1 + var(--vp-amp, .5) * .24)); } }
        @keyframes vpThinkDot { 0%, 78%, 100% { transform: translateY(0); opacity: .3; } 38% { transform: translateY(-8px); opacity: 1; } }
        /* burun: hiç durmayan minik canlılık + jest tepkileri */
        @keyframes vpNoseBoop { 0%, 100% { transform: translateY(0) scale(1); } 42% { transform: translateY(-1.4px) scale(1.05, .95); } 68% { transform: translateY(.6px) scale(.97, 1.03); } }
        @keyframes vpNosePop { 0% { transform: scale(1); } 40% { transform: scale(1.22, .82); } 100% { transform: scale(1); } }
        /* işaret edilen yer: parıltı nabzı + hedef halkası */
        @keyframes vpMarkPulse { 0%, 100% { scale: 1; opacity: .95; rotate: 0deg; } 50% { scale: 1.24; opacity: .7; rotate: 18deg; } }
        @keyframes vpMarkRing { from { transform: scale(.4); opacity: .9; } to { transform: scale(1.5); opacity: 0; } }

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
        .vp-moon-track.slow { width: 372px; height: 250px; margin: -125px 0 0 -186px; animation-duration: 41s; animation-direction: reverse; }
        .vp-moon { position: absolute; left: 50%; top: -6px; width: 12px; height: 12px; margin-left: -6px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, #f8fafc, #94a3b8 62%, #475569); box-shadow: 0 0 12px rgba(148,163,184,.55); animation: voicePlanetBreath 2.6s ease-in-out infinite; }
        .vp-moon-track.slow .vp-moon { width: 9px; height: 9px; margin-left: -4.5px; background: radial-gradient(circle at 30% 30%, #fde68a, #f59e0b 62%, #92400e); box-shadow: 0 0 14px rgba(245,158,11,.7); }

        /* takla katmanları: avatar'ın kendi transform'u bozulmasın diye dışında.
           vpCartwheel 360 derecede biter → sınıf kalkınca sıfırlama sıçraması olmaz. */
        .vp-acrobat { display: grid; place-items: center; transform-style: preserve-3d; }
        .vp-acrobat.flipping { animation: vpCartwheel 1.9s cubic-bezier(.42,.02,.32,1) 1 both; }
        .vp-acrobat-3d { display: grid; place-items: center; transform-style: preserve-3d; }
        .vp-acrobat-3d.flipping { animation: vpFrontFlip 1.75s cubic-bezier(.42,.02,.32,1) 1 both; }
        .vp-acrobat-3d.celebrate { animation: vpHoorayFlip 1.25s cubic-bezier(.36,.05,.28,1.04) 1; }
        /* takla sırasında kollar denge için hafif açılır */
        .flipping .vp-shoulder-pose { --vp-sh: -74deg; }

        .voice-planet-avatar { --vp-sh: -38deg; --vp-wr: 8deg; --vp-ease: cubic-bezier(.34,.86,.4,1); position: relative; width: 210px; height: 210px; display: grid; place-items: center; filter: drop-shadow(0 22px 34px rgba(2,8,23,.55)); animation: voicePlanetFloat 7.2s ease-in-out infinite; }
        .voice-planet-avatar.speaking { animation: voicePlanetTalk .62s ease-in-out infinite, voicePlanetFloat 7.2s ease-in-out infinite; }
        .voice-planet-avatar.listening { animation: voicePlanetListen 1.5s ease-in-out infinite, voicePlanetFloat 7.2s ease-in-out infinite; border-radius: 50%; }
        .voice-planet-avatar.thinking { animation: voicePlanetFloat 8.4s ease-in-out infinite; }
        .voice-planet-avatar.g-cheer { animation: voicePlanetCheer 1s cubic-bezier(.3,.8,.4,1) infinite, voicePlanetFloat 7.2s ease-in-out infinite; }
        .voice-planet-avatar.g-greet { animation: voicePlanetCheer 1.4s ease-in-out infinite, voicePlanetFloat 7.2s ease-in-out infinite; }

        /* gövde grubu: kollar + küre birlikte ağırlık kaydırır */
        .vp-body { position: absolute; inset: 0; z-index: 4; display: grid; place-items: center; animation: vpWeightShift 11s ease-in-out infinite; }
        .g-idle .vp-body { animation-duration: 13.5s; }
        .vp-head { position: relative; width: 142px; height: 142px; z-index: 1; }
        .voice-planet-avatar.pop .vp-head { animation: voicePlanetSquash .5s cubic-bezier(.3,.8,.35,1) 1; }

        .voice-planet-orbit { position: absolute; inset: -26px; border: 1px dashed rgba(125,211,252,.25); border-radius: 50%; animation: voicePlanetOrbit 18s linear infinite; }
        .voice-planet-ring { position: absolute; left: 50%; top: 53%; width: 266px; height: 54px; transform: translate(-50%, -50%) rotate(-15deg); border-radius: 50%; overflow: hidden; background: linear-gradient(90deg, transparent 0%, rgba(250,204,21,.14) 15%, #facc15 36%, #fde68a 50%, #f59e0b 65%, rgba(250,204,21,.12) 84%, transparent 100%); box-shadow: 0 0 18px rgba(245,158,11,.22); animation: voicePlanetRing 3.6s ease-in-out infinite; z-index: 1; }
        .voice-planet-ring::after { content: ''; position: absolute; inset: 13px 26px; border-radius: 50%; background: #071122; }
        .voice-planet-ring i { position: absolute; top: 0; left: -42%; width: 32%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent); filter: blur(1px); animation: voicePlanetRingGlint 5.4s ease-in-out infinite; }

        .voice-planet-core { position: relative; width: 142px; height: 142px; border-radius: 50%; background: radial-gradient(circle at 24% 14%, rgba(255,255,255,.6) 0 7%, rgba(255,255,255,0) 26%), radial-gradient(circle at 50% 56%, #4f93e8 0 38%, #2f6fd0 62%, #16307a 100%); border: 2px solid rgba(8,20,40,.6); overflow: hidden; animation: voicePlanetBreath calc(var(--vp-dur, 1s) * 4.6) ease-in-out infinite; box-shadow: inset -18px -22px 34px rgba(4,17,45,.42), inset 10px 10px 20px rgba(255,255,255,.22); z-index: 3; }
        .voice-planet-core::before { content: ''; position: absolute; left: -18px; top: 96px; width: 182px; height: 26px; background: rgba(255,255,255,.12); transform: rotate(-14deg); border-radius: 999px; }

        /* ========================== yüz =============================== */
        .voice-planet-face { position: absolute; inset: 0; z-index: 4; transform: rotate(var(--vp-tilt, 0deg)); transition: transform .34s var(--vp-ease); }
        .speaking .voice-planet-face { animation: vpNod calc(var(--vp-dur, 1s) * 1.9) ease-in-out infinite; }

        /* gözler: İKİSİ DE KARŞIYA — aynı faz, aynı bebek merkezi; şaşı olmasın diye
           her iki göz de tek bir --vp-gaze ile, simetrik hareket eder. */
        .voice-planet-eye { --vp-blink-dur: 6.4s; --vp-blink-delay: .25s; position: absolute; top: 40px; width: 25px; height: 29px; border-radius: 50% 50% 47% 47%; border: 2px solid #0b1428; }
        .voice-planet-eye.left { left: 34px; }
        .voice-planet-eye.right { right: 34px; }
        .vp-eye-white { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; background: radial-gradient(circle at 42% 30%, #ffffff, #e9f3ff 70%, #c3daf5); box-shadow: inset 0 -2px 4px rgba(8,20,40,.18); }
        .voice-planet-avatar.pop .vp-eye-white { animation: voicePlanetPop .46s cubic-bezier(.3,.8,.35,1) 1; }

        /* büyük, koyu bebek: klasik çizgi film "ink pupil" — siyah baskın, tek parlaklık */
        .vp-pupil { position: absolute; left: 50%; top: 47%; width: 14px; height: 15px; margin: -7.5px 0 0 -7px; border-radius: 50%; background: radial-gradient(circle at 36% 28%, #24344d 0 16%, #0b1428 46%, #04070f 100%); animation: voicePlanetGaze 9s ease-in-out infinite; }
        .vp-pupil::after { content: ''; position: absolute; right: 1.5px; top: 1.5px; width: 4.5px; height: 4.5px; border-radius: 50%; background: #fbfeff; box-shadow: -3.6px 4.4px 0 -1.4px rgba(226,242,255,.7); }

        /* üst göz kapağı: yukarıdan inip gözü kapatır (insandaki gibi), alt kirpik hattı var */
        .vp-lid { position: absolute; left: -1px; right: -1px; top: 0; height: 106%; border-radius: 0 0 46% 46%; background: linear-gradient(180deg, #4b8ede 0 58%, #2f6cc0 82%, #1b3f77); box-shadow: inset 0 -3px 5px rgba(255,255,255,.22), 0 2px 4px rgba(6,20,48,.35); transform: translate(0, -104%); animation: vpLidClose var(--vp-blink-dur) cubic-bezier(.4,0,.3,1) var(--vp-blink-delay) infinite; }
        .speaking .vp-lid { --vp-blink-dur: 4.6s; }
        .thinking .vp-lid { animation: none; transform: translate(0, -54%); }
        .vp-squint { position: absolute; left: 1px; right: 1px; bottom: 0; height: 5px; border-radius: 50% 50% 40% 40%; background: linear-gradient(0deg, #2a5da8, rgba(42,93,168,0)); opacity: .0; transition: translate .34s var(--vp-ease), opacity .34s ease; }
        .thinking .vp-squint, .g-question .vp-squint, .g-shrug .vp-squint { translate: 0 -4px; opacity: .8; }
        .vp-lash-row { position: absolute; left: 0; right: 0; top: -7px; height: 10px; animation: vpLashDrop var(--vp-blink-dur) cubic-bezier(.4,0,.3,1) var(--vp-blink-delay) infinite; transition: translate .34s var(--vp-ease); }
        .thinking .vp-lash-row { animation: none; translate: 0 13px; }
        .vp-lash { position: absolute; top: 0; width: 2.2px; height: 9px; border-radius: 2px; background: #0b1428; transform-origin: 50% 100%; }
        .vp-lash-1 { left: 2px; transform: rotate(-38deg); }
        .vp-lash-2 { left: 8px; transform: rotate(-10deg); height: 10px; }
        .vp-lash-3 { left: 14px; transform: rotate(16deg); }
        .voice-planet-eye.right .vp-lash-1 { left: auto; right: 14px; transform: rotate(-16deg); }
        .voice-planet-eye.right .vp-lash-2 { left: auto; right: 8px; transform: rotate(10deg); height: 10px; }
        .voice-planet-eye.right .vp-lash-3 { left: auto; right: 2px; transform: rotate(38deg); }
        .speaking .vp-lash { animation: vpLashFlutter 1.9s ease-in-out infinite; }

        .voice-planet-brow { position: absolute; top: 26px; width: 25px; height: 6px; border-radius: 999px; background: #0b1428; transform: translateY(0) rotate(0deg); transition: transform .4s var(--vp-ease); }
        .voice-planet-brow.left { left: 33px; }
        .voice-planet-brow.right { right: 33px; }
        .brows-up .voice-planet-brow { transform: translateY(-7px) rotate(-10deg); }
        .brows-down .voice-planet-brow { transform: translateY(4px) rotate(12deg); }
        .brows-down .voice-planet-brow.right { transform: translateY(2px) rotate(-15deg); }
        .speaking .voice-planet-brow { animation: vpBrowTwitch calc(var(--vp-dur, 1s) * 2.6) ease-in-out infinite; }

        /* burun: Miss Minutes'in keskin küçük burnu — gezegen tonunda, minik ve esnek */
        .vp-nose { position: absolute; left: 50%; top: 58px; width: 13px; height: 12px; margin-left: -6.5px; border-radius: 52% 52% 46% 46% / 38% 38% 62% 62%; background: radial-gradient(circle at 36% 26%, #e8f4ff, #57a5ef 58%, #1c4794); box-shadow: 0 2px 5px rgba(6,20,48,.34), inset 0 -2px 3px rgba(6,20,48,.28); transform-origin: 50% 20%; animation: vpNoseBoop 3.4s ease-in-out infinite; z-index: 5; }
        .voice-planet-avatar.pop .vp-nose { animation: vpNosePop .46s cubic-bezier(.3,.8,.35,1) 1; }
        .g-question .vp-nose, .g-shrug .vp-nose { translate: 0 -1.5px; }
        .g-cheer .vp-nose { scale: 1.1 .9; }
        .brows-down .vp-nose { scale: .9 1.16; }

        /* ağız: her hecede akıcı biçim değişimi */
        .voice-planet-mouth { position: absolute; left: 50%; transform: translateX(-50%); border: 2px solid #0b1428; transition: width .12s cubic-bezier(.3,.8,.4,1), height .13s cubic-bezier(.3,.8,.4,1), top .13s cubic-bezier(.3,.8,.4,1), border-radius .2s ease-out, background .2s ease-out; box-shadow: inset 0 -3px 0 rgba(255,255,255,.12); }
        .speaking .voice-planet-mouth { animation: voicePlanetLipWiggle calc(var(--vp-dur, 1s) * 1.15) ease-in-out infinite; }
        .vp-cheek { position: absolute; top: 72px; width: 21px; height: 12px; border-radius: 50%; background: radial-gradient(circle, rgba(251,113,133,.9), rgba(251,113,133,0) 72%); opacity: calc(.14 + var(--vp-amp, .5) * .34); filter: blur(.6px); }
        .vp-cheek.left { left: 15px; }
        .vp-cheek.right { right: 15px; }

        /* ================== SAAT KADRANI (zemin, akrepsiz) ==================
           Eskisi gibi karnında ayrı bir saat + dönen akrep YOK; topun kendini
           çevreleyen durağan çentik halkası var — Miss Minutes kağıt maketindeki
           gibi. Hiçbir şey döndürülmüyor, şerit/şerit hareket yok. */
        .vp-dial { position: absolute; inset: 0; border-radius: 50%; z-index: 1; pointer-events: none; background: repeating-conic-gradient(from -90deg, rgba(8,22,50,.5) 0 2.2deg, rgba(8,22,50,0) 2.2deg 30deg); -webkit-mask: radial-gradient(circle, transparent 0 86%, #000 87% 98%, transparent 99%); mask: radial-gradient(circle, transparent 0 86%, #000 87% 98%, transparent 99%); }
        .vp-dial::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(from -90deg, rgba(8,22,50,.6) 0 3.2deg, rgba(8,22,50,0) 3.2deg 90deg); -webkit-mask: radial-gradient(circle, transparent 0 74%, #000 75% 98%, transparent 99%); mask: radial-gradient(circle, transparent 0 74%, #000 75% 98%, transparent 99%); }
        .vp-dial::after { content: ''; position: absolute; inset: 10.5%; border-radius: 50%; border: 1.4px solid rgba(199,231,255,.26); box-shadow: inset 0 0 12px rgba(8,22,50,.18); }

        /* anten + düşünme noktaları + işaret parıltısı */
        .vp-antenna { position: absolute; left: 50%; top: -30px; width: 4px; height: 32px; margin-left: -2px; border-radius: 4px; background: #123565; transform-origin: 50% 100%; animation: vpAntenna 3.1s ease-in-out infinite; z-index: 5; }
        .vp-antenna i { position: absolute; left: 50%; top: -10px; width: 13px; height: 13px; margin-left: -6.5px; border-radius: 50%; background: radial-gradient(circle at 32% 28%, #fef9c3, #facc15 58%, #b45309); animation: vpAntennaPulse calc(var(--vp-dur, 1s) * 1.6) ease-in-out infinite; }
        .vp-think-dots { position: absolute; left: 50%; top: -54px; display: flex; gap: 5px; transform: translateX(-50%); opacity: 0; transition: opacity .3s ease; z-index: 5; }
        .thinking .vp-think-dots { opacity: 1; }
        .vp-think-dots i { width: 6px; height: 6px; border-radius: 50%; background: #a5b4fc; animation: vpThinkDot 1.4s ease-in-out infinite; }
        .vp-think-dots i:nth-child(2) { animation-delay: .18s; }
        .vp-think-dots i:nth-child(3) { animation-delay: .36s; }

        /* işaret EDİLEN yer: kolun ucu boşluğa işaret etmesin, bir hedefi olsun */
        .vp-think-mark { position: absolute; left: -30px; top: -28px; width: 26px; height: 26px; display: grid; place-items: center; opacity: 0; transform: scale(.5); transition: opacity .34s ease, transform .34s var(--vp-ease), left .42s var(--vp-ease), top .42s var(--vp-ease); pointer-events: none; z-index: 6; }
        .vp-think-mark::after { content: ''; position: absolute; color: #fde68a; font-size: 21px; font-weight: 900; line-height: 1; text-shadow: 0 0 10px rgba(250,204,21,.8); }
        .thinking .vp-think-mark::after, .g-think .vp-think-mark::after { content: '✦'; }
        .g-eureka .vp-think-mark::after { content: '✦'; color: #fef3c7; font-size: 26px; text-shadow: 0 0 14px rgba(250,204,21,.95); }
        .g-thumbup .vp-think-mark::after { content: '✓'; color: #bbf7d0; font-size: 20px; text-shadow: 0 0 12px rgba(74,222,128,.8); }
        .g-thumbup .vp-think-mark { left: 168px; top: 26px; opacity: 1; transform: scale(1); }
        .g-point .vp-think-mark::after { content: '◎'; color: #bbf7d0; text-shadow: 0 0 10px rgba(74,222,128,.8); }
        .g-question .vp-think-mark::after { content: '?'; color: #fed7aa; }
        .g-explain .vp-think-mark::after { content: '•'; color: #bae6fd; font-size: 30px; }
        .vp-think-mark::before { content: ''; position: absolute; inset: -2px; border-radius: 50%; border: 1.6px solid rgba(253,230,138,.7); opacity: 0; }
        .thinking .vp-think-mark, .g-think .vp-think-mark { opacity: 1; transform: scale(1); animation: vpMarkPulse 2.2s ease-in-out infinite; }
        .g-point .vp-think-mark { left: 222px; top: 54px; opacity: 1; transform: scale(1); }
        .g-point .vp-think-mark::before { animation: vpMarkRing 1.2s ease-out infinite; }
        .g-question .vp-think-mark { left: 150px; top: -40px; opacity: 1; transform: scale(1); animation: vpMarkPulse 2.6s ease-in-out infinite; }
        .g-explain .vp-think-mark { left: 196px; top: 96px; opacity: .85; transform: scale(1); }

        /* ==================== TEK PARÇA DÜMDÜZ KOLLAR ================== */
        /* Omuz pimi kürenin çevresinde; boru tek parça, ucunda gezegen rengi el topu.
           Ayrışma konturla değil ışıkla: koyu denizde kaybolmasın diye glow + parlak şerit. */
        .vp-arm { position: absolute; top: 104px; width: 0; height: 0; z-index: 3; transform: scaleX(var(--vp-side, 1)); }
        .vp-arm-left { left: 40px; --vp-side: -1; --vp-delay: 0s; }
        .vp-arm-right { left: 170px; --vp-side: 1; --vp-delay: calc(var(--vp-dur, 1s) / -2); }
        .vp-shoulder-pose { position: absolute; left: 0; top: 0; width: 0; height: 0; transform: rotate(var(--vp-sh, -38deg)); transition: transform .42s var(--vp-ease); animation: vpIdleShoulder 13s ease-in-out infinite; }
        .vp-limb { position: absolute; left: -7.5px; top: 0; width: 15px; height: 54px; border-radius: 999px; transform-origin: 50% 0; background: linear-gradient(100deg, rgba(19,52,110,.95) 0 14%, #4f93e8 44%, #b9dcff 60%, rgba(17,44,94,.95)); box-shadow: 0 0 12px rgba(56,189,248,.22); animation: vpSwayA var(--vp-dur, 1s) ease-in-out infinite, vpStretch calc(var(--vp-dur, 1s) * 2) ease-in-out infinite; animation-delay: var(--vp-delay, 0s); }
        /* YUMRUK: Mr Minutes'ın eli gibi — tek top değil, parmak boğumlu, hafif
           asimetrik yumruk kütlesi. Renk gezegenin kendi paleti (insan derisi yok). */
        .vp-hand { position: absolute; left: -6px; top: 46px; width: 27px; height: 26px; border-radius: 48% 52% 46% 46% / 44% 46% 56% 54%; transform-origin: 50% 0; rotate: var(--vp-wr, 8deg); background: radial-gradient(circle at 32% 24%, #f4faff 0 14%, #7cbbf7 52%, #1c4894 100%); box-shadow: 0 0 calc(7px + var(--vp-amp, .5) * 15px) rgba(125,211,252,calc(.26 + var(--vp-amp, .5) * .32)), inset -2px -3px 7px rgba(6,20,48,.42), inset 2px 3px 5px rgba(255,255,255,.28); animation: vpFistSwing calc(var(--vp-dur, 1s) * 1.5) ease-in-out infinite; transition: rotate .42s var(--vp-ease), width .3s var(--vp-ease), height .3s var(--vp-ease), border-radius .3s var(--vp-ease); }
        /* boğum çizgileri: yumruğun üst kenarında kıvrık parmaklar */
        .vp-hand::before { content: ''; position: absolute; left: 3px; right: 4px; top: 3px; height: 10px; border-radius: 6px; background: repeating-linear-gradient(90deg, rgba(9,24,52,.46) 0 1.7px, rgba(9,24,52,0) 1.7px 6.4px), linear-gradient(180deg, rgba(255,255,255,.34), rgba(255,255,255,0)); box-shadow: inset 0 -1.2px 0 rgba(9,24,52,.22); transition: all .3s var(--vp-ease); }
        /* başparmak yumruğun üstinde yatık durur; sadece 'onay' jestinde dikilir */
        .vp-hand::after { content: ''; position: absolute; left: -2px; top: 8px; width: 11px; height: 9px; border-radius: 5px 3px 5px 5px; background: radial-gradient(circle at 40% 30%, #f4faff, #74b6f5 60%, #1f4f9e); opacity: .8; transform: rotate(-16deg); transition: all .3s var(--vp-ease); }

        /*
         * Duruşlar. Sözleşme: NEGATİF = kol dışarı, POZİTİF = içeri.
         * 0° = kol aşağı sarkık, -90° = tam yan. Boşta -38°: kollar açık ama
         * "T-pozu" değil, gevşek süzülen duruş. Tek parça kol olduğu için tek açı var.
         */
        .g-idle { --vp-sh: -38deg; --vp-wr: 8deg; }
        .g-idle .vp-limb { animation: vpIdleFlap 5.2s ease-in-out infinite; }
        .g-idle .vp-arm-right .vp-limb { animation-delay: -2.1s; }
        .g-idle .vp-hand { animation: vpIdleHand 4.1s ease-in-out infinite; }
        .g-idle .vp-arm-right .vp-hand { animation-delay: -1.4s; }
        .g-idle .vp-arm-right .vp-shoulder-pose { animation: vpIdleShoulder 13s ease-in-out infinite, vpIdleFlourish 12s ease-in-out infinite; }

        .g-calm { --vp-sh: -32deg; --vp-wr: 2deg; }
        .g-calm .vp-arm-right { --vp-sh: -42deg; }

        /* anlatma: kol kesme hareketi yapar, baş hafif eğilir */
        .g-explain { --vp-sh: -34deg; --vp-wr: -4deg; }
        .g-explain .vp-arm-right { --vp-sh: -58deg; --vp-wr: -8deg; }
        .g-explain .vp-arm-right .vp-limb { animation-name: vpChop; }
        .g-explain .voice-planet-face { --vp-tilt: -3deg; }

        /* soru: omuz silkip avuçları kaldırır, baş eğilir */
        .g-question { --vp-sh: -46deg; --vp-wr: -16deg; }
        .g-question .vp-limb { animation-name: vpShrug; }
        .g-question .vp-hand { animation-name: vpPalmsUp; }
        .g-question .voice-planet-face { --vp-tilt: 4deg; }

        .g-shrug { --vp-sh: -26deg; --vp-wr: -22deg; }
        .g-shrug .vp-limb { animation-name: vpShrug; animation-duration: calc(var(--vp-dur, 1s) * 1.5); }
        .g-shrug .vp-hand { animation-name: vpPalmsUp; }

        /* coşku: kollar V olup pompalar */
        .g-cheer { --vp-sh: -152deg; --vp-wr: 12deg; }
        .g-cheer .vp-limb { animation-name: vpPump; }
        .g-cheer .vp-arm-right { --vp-wr: 146deg; }
        .g-cheer .vp-arm-left { --vp-wr: -150deg; }
        .g-cheer .vp-hand { animation: vpFistLift calc(var(--vp-dur, 1s) * .8) cubic-bezier(.3,.8,.4,1) infinite; }

        /* gösterme: kol uzanır, el sivrilir ve ucunda bir HEDEF parlar */
        .g-point { --vp-sh: -40deg; --vp-wr: 0deg; }
        .g-point .vp-arm-right { --vp-sh: -96deg; --vp-wr: -6deg; }
        .g-point .vp-arm-right .vp-limb { animation-name: vpPoke; }
        .g-point .vp-arm-right .vp-hand { animation: none; transform: rotate(-4deg); }
        /* boğum şeridi tek parmağa dönüşür: yumruk + uzayan işaret parmağı */
        .g-point .vp-arm-right .vp-hand::before { left: 9px; right: auto; top: 16px; width: 8px; height: 17px; border-radius: 4px 4px 3px 3px; background: linear-gradient(180deg, #f4faff, #74b6f5 62%, #1f4f9e); box-shadow: inset 0 0 0 1.2px rgba(9,24,52,.3); }
        .g-point .vp-arm-right .vp-hand::after { opacity: .5; transform: rotate(-30deg) scale(.8); }
        .g-think .vp-arm-right .vp-hand::after, .g-eureka .vp-arm-right .vp-hand::after, .g-hips .vp-hand::after { transform: rotate(-6deg) translateY(-1px); }

        /* sayma: el baş hizasında her vuruşta aşağı tapeler */
        .g-count { --vp-sh: -34deg; --vp-wr: 4deg; }
        .g-count .vp-arm-right { --vp-sh: -128deg; --vp-wr: 118deg; }
        .g-count .vp-arm-right .vp-limb { animation: vpHandTap calc(var(--vp-dur, 1s) * .85) ease-in-out infinite; }
        .g-count .vp-arm-right .vp-hand { animation-name: vpHandSway; animation-duration: calc(var(--vp-dur, 1s) * .85); }

        /* selam: kol antenin yanına kalkar, el hızlı sallanır */
        .g-greet { --vp-sh: -30deg; --vp-wr: 6deg; }
        .g-greet .vp-arm-right { --vp-sh: -168deg; --vp-wr: 150deg; }
        .g-greet .vp-arm-right .vp-limb { animation-name: vpPalmsUp; }
        .g-greet .vp-arm-right .vp-hand { animation: vpFistLift calc(var(--vp-dur, 1s) * .5) ease-in-out infinite; }

        /* dinliyor: el kulağın/antenin yanına kıvrılır */
        .g-listen { --vp-sh: -34deg; --vp-wr: 8deg; }
        .g-listen .vp-arm-right { --vp-sh: -152deg; --vp-wr: 138deg; }
        .g-listen .vp-limb { animation: vpIdleFlap 4.4s ease-in-out infinite; }
        .g-listen .vp-hand { animation: vpIdleHand 5.2s ease-in-out infinite; }

        /* düşünüyor: tek YUMRUK havaya kalkar, gözler yumruğun peşine gider,
           baş ona doğru eğilir — "bir şeyi tutup havada eviriyor" gibi. */
        .g-think { --vp-sh: -30deg; --vp-wr: 4deg; }
        .g-think .vp-arm-right { --vp-sh: -168deg; --vp-wr: 156deg; }
        .g-think .vp-arm-right .vp-limb { animation: vpPunchArm calc(var(--vp-dur, 1s) * 1.7) ease-in-out infinite; }
        .g-think .vp-arm-right .vp-hand { animation: vpFistLift 2.6s ease-in-out infinite; }
        .g-think .vp-arm-left { --vp-sh: 14deg; --vp-wr: -18deg; }
        .g-think .vp-arm-left .vp-limb { animation-name: vpHipsBob; }
        .g-think .vp-pupil { animation: none; translate: 2px -2.6px; }
        .g-think .voice-planet-face { --vp-tilt: -5deg; }
        .g-think .vp-think-mark { left: 150px; top: -16px; }
        .thinking { --vp-sh: -30deg; }
        .thinking .vp-arm-right { --vp-sh: -168deg; --vp-wr: 156deg; }
        .thinking .vp-arm-right .vp-hand { animation: vpFistLift 2.6s ease-in-out infinite; }
        .thinking .vp-pupil { animation: none; translate: 2px -2.6px; }
        .thinking .vp-think-mark { left: 150px; top: -16px; }

        /* aydınlanma: yumruk havaya pompalanır, parıltı patlar, baş sarsılır */
        .g-eureka { --vp-sh: -34deg; --vp-wr: 0deg; }
        .g-eureka .vp-arm-right { --vp-sh: -152deg; --vp-wr: 148deg; }
        .g-eureka .vp-arm-right .vp-limb { animation-name: vpPunchArm; animation-duration: calc(var(--vp-dur, 1s) * 1.1); }
        .g-eureka .vp-arm-right .vp-hand { animation: vpFistLift 1.1s cubic-bezier(.3,.8,.4,1) infinite; }
        .g-eureka .vp-arm-left { --vp-sh: 14deg; --vp-wr: -16deg; }
        .g-eureka .voice-planet-face { --vp-tilt: -3.5deg; }
        .g-eureka .vp-think-mark { left: 158px; top: -26px; opacity: 1; transform: scale(1.15); }
        .g-eureka .vp-think-mark::before { animation: vpMarkRing 1.1s ease-out infinite; }
        .g-eureka .vp-cheek { opacity: calc(.3 + var(--vp-amp, .5) * .4); }

        /* onay: göğüs hizasında yumruk, başparmak dik (kol neredeyse sarkık ki
           parmak gerçekten yukarı baksın); öbür el belde */
        .g-thumbup { --vp-sh: -36deg; --vp-wr: 6deg; }
        .g-thumbup .vp-arm-right { --vp-sh: 26deg; --vp-wr: -8deg; }
        .g-thumbup .vp-arm-right .vp-limb { animation-name: vpPunchArm; animation-duration: calc(var(--vp-dur, 1s) * 1.6); }
        .g-thumbup .vp-arm-right .vp-hand { animation: vpHandSway calc(var(--vp-dur, 1s) * 1.6) ease-in-out infinite; width: 25px; height: 24px; }
        /* başparmak dikilir */
        .g-thumbup .vp-arm-right .vp-hand::after { opacity: 1; left: 3px; top: -12px; width: 10px; height: 16px; border-radius: 5px 5px 4px 4px; transform: rotate(5deg); }
        .g-thumbup .vp-arm-right .vp-hand::before { left: 4px; right: 4px; top: 6px; height: 9px; }
        .g-thumbup .vp-arm-left { --vp-sh: 14deg; --vp-wr: -20deg; }

        /* eller belde: kendinden emin, iki yumruk topun alt yanlarında */
        .g-hips { --vp-sh: 14deg; --vp-wr: -22deg; }
        .g-hips .vp-limb { animation: vpHipsBob calc(var(--vp-dur, 1s) * 1.4) ease-in-out infinite; }
        .g-hips .vp-hand { animation: none; transform: rotate(-8deg); }
        .g-hips .voice-planet-face { --vp-tilt: 1.6deg; }
        .g-hips .vp-body { animation-duration: 7.4s; }

        /* ================== cümle sonu kutlaması ======================= */
        .vp-burst { position: absolute; left: 50%; top: 50%; width: 196px; height: 196px; margin: -98px 0 0 -98px; border-radius: 50%; border: 2.5px solid rgba(134,239,172,.75); opacity: 0; pointer-events: none; z-index: 1; }
        .vp-confetti { position: absolute; inset: 0; pointer-events: none; z-index: 6; opacity: 0; }
        .vp-confetti i { position: absolute; left: 50%; top: 46%; width: 7px; height: 7px; border-radius: 2px; background: #facc15; box-shadow: 0 0 6px rgba(0,0,0,.4); }
        .vp-confetti i:nth-child(1) { --vp-cx: 84px; --vp-cy: -76px; }
        .vp-confetti i:nth-child(2) { background: #4ade80; --vp-cx: -86px; --vp-cy: -70px; }
        .vp-confetti i:nth-child(3) { background: #38bdf8; --vp-cx: -114px; --vp-cy: -14px; }
        .vp-confetti i:nth-child(4) { background: #f472b6; --vp-cx: 110px; --vp-cy: -22px; }
        .vp-confetti i:nth-child(5) { background: #a5b4fc; --vp-cx: -48px; --vp-cy: 78px; }
        .vp-confetti i:nth-child(6) { background: #fbbf24; --vp-cx: 56px; --vp-cy: 84px; }
        .celebrate .vp-burst { animation: vpBurstRing 1.15s ease-out 1; box-shadow: 0 0 34px rgba(34,197,94,.45); }
        .celebrate .vp-confetti { opacity: 1; }
        .celebrate .vp-confetti i { animation: vpConfetti 1.1s cubic-bezier(.2,.8,.4,1) 1; }
        /* Kutlama: yumruklar yan yukarı kalkıp pompalar. Düz kol + 130px omuz
           açıklığında alkış için gereken kavuşma noktası ağız satırına (110-132px)
           düşüyor, yani ağız kapanıyordu — o yüzden alkış yerine iki yumruk havada. */
        .celebrate { --vp-sh: -150deg; --vp-wr: 146deg; }
        .celebrate .vp-limb { animation: vpPump .46s cubic-bezier(.3,.8,.4,1) infinite; }
        .celebrate .vp-arm-right { --vp-delay: 0s; }
        .celebrate .vp-hand { animation: vpFistLift .46s cubic-bezier(.3,.8,.4,1) infinite; }
        .celebrate .vp-cheek { opacity: .58; }
        .celebrate .vp-think-mark { left: 158px; top: -30px; opacity: 1; transform: scale(1.2); }
        .celebrate .vp-think-mark::after { content: '✦'; color: #fef3c7; font-size: 26px; }

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

      <div className={`vp-acrobat${flip === 'wheel' ? ' flipping' : ''}`}>
        <div className={`vp-acrobat-3d${celebrate ? ' celebrate' : ''}${flip === 'front' ? ' flipping' : ''}`}>
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
                <span className="vp-think-mark" aria-hidden="true" />

                <div className="voice-planet-core">
                  <div className="vp-dial" aria-hidden="true" />
                  <div className="voice-planet-face">
                    <span className="voice-planet-brow left" />
                    <span className="voice-planet-brow right" />
                    <Eye side="left" />
                    <Eye side="right" />
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
