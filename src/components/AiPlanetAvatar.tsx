import type { CSSProperties } from 'react';

type MouthViseme = 'rest' | 'closed' | 'open' | 'wide' | 'round' | 'teeth' | 'flat';

export type AvatarGesture = 'idle' | 'present-left' | 'present-right' | 'present-both' | 'emphasis' | 'question' | 'compare' | 'encourage' | 'caution';
export type AvatarExpression = 'neutral' | 'warm' | 'curious' | 'focused' | 'surprised' | 'concerned';
export type AvatarGaze = 'center' | 'left' | 'right' | 'up';
export type AvatarCue = { gesture: AvatarGesture; expression: AvatarExpression; gaze: AvatarGaze };

type AiPlanetAvatarProps = {
  isSpeaking: boolean;
  isListening: boolean;
  isThinking?: boolean;
  mouthViseme: MouthViseme;
  mouthStyle: CSSProperties;
  gesture: AvatarGesture;
  expression: AvatarExpression;
  gaze: AvatarGaze;
};

const planetTicks = Array.from({ length: 60 }, (_, index) => {
  const angle = ((index * 6 - 90) * Math.PI) / 180;
  const isHourMark = index % 5 === 0;
  const innerRadius = isHourMark ? 72 : 78;
  const outerRadius = 82;
  return {
    isHourMark,
    x1: 87 + Math.cos(angle) * innerRadius,
    y1: 87 + Math.sin(angle) * innerRadius,
    x2: 87 + Math.cos(angle) * outerRadius,
    y2: 87 + Math.sin(angle) * outerRadius,
  };
});

type HandPose = 'fist' | 'open' | 'point';

function handPoseFor(gesture: AvatarGesture, side: 'left' | 'right'): HandPose {
  if (gesture === 'idle') return 'fist';
  if (gesture === 'present-left') return side === 'left' ? 'open' : 'fist';
  if (gesture === 'present-right') return side === 'right' ? 'open' : 'fist';
  if (gesture === 'compare') return side === 'left' ? 'point' : 'open';
  if (gesture === 'caution') return side === 'left' ? 'open' : 'fist';
  if (gesture === 'emphasis') return 'point';
  return 'open';
}

function PlanetLashes({ side }: { side: 'left' | 'right' }) {
  return (
    <svg className={`voice-planet-lashes ${side}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path className="voice-planet-upper-lid" d="M 4 31 C 19 11 34 4 50 4 C 67 4 83 11 96 31" />
      <g transform={side === 'right' ? 'translate(100 0) scale(-1 1)' : undefined}>
        <path className="voice-planet-lash-tufts" d="M 16 27 Q 9 25 4 18 Q 12 21 18 22 Z M 23 17 Q 17 13 15 6 Q 22 10 26 15 Z M 32 10 Q 27 6 27 0 Q 34 5 35 10 Z" />
      </g>
    </svg>
  );
}

function PlanetArm({ side, gesture }: { side: 'left' | 'right'; gesture: AvatarGesture }) {
  // Resting tubes curl together; active tubes open outward. The right side mirrors both paths.
  const idlePipePath = 'M 100 63 C 91 66, 86 73, 78 77 C 72 80, 64 80, 58 78';
  const gesturePipePath = 'M 100 63 C 87 62, 78 69, 64 76 C 54 81, 43 79, 30 74';
  const pose = handPoseFor(gesture, side);
  const handPaths: Record<HandPose, string> = {
    // Four curled knuckles and a tucked thumb keep active emphasis poses readable.
    fist: 'M 25 38 C 18 38 13 34 12 28 L 10 22 C 9 18 12 15 15 15 C 18 15 20 18 21 21 L 22 13 C 22 9 25 6 28 7 C 31 7 33 10 32 14 L 32 11 C 32 8 35 6 38 7 C 41 7 42 10 41 14 L 41 12 C 42 9 45 8 48 10 C 51 12 50 15 49 18 L 48 25 C 47 33 41 38 34 39 Z',
    // Open glove for presentation and question gestures.
    open: 'M 29 37 C 24 36 20 33 18 29 L 11 22 C 8 19 9 15 12 13 C 15 11 18 13 21 16 L 20 12 C 19 8 22 5 25 5 C 29 5 31 8 31 12 L 31 9 C 31 5 34 3 37 4 C 41 5 42 8 41 12 L 41 10 C 42 6 46 6 48 9 C 50 11 49 15 47 18 C 52 17 55 20 54 24 C 53 29 48 34 43 36 C 39 39 34 39 29 37 Z',
    // A single straight index finger gives definitions and key points a clear cue.
    point: 'M 27 38 C 21 37 17 33 14 28 L 10 22 C 8 19 10 16 13 15 C 16 14 19 16 21 19 L 25 8 C 26 4 29 2 32 4 C 35 5 36 8 35 12 L 32 22 C 37 20 42 21 45 25 L 51 32 C 45 38 36 41 27 38 Z',
  };
  const creasePaths: Record<HandPose, string> = {
    fist: 'M 22 19 Q 27 17 32 19 M 33 17 Q 38 15 43 17 M 21 27 Q 33 31 47 27 M 27 34 Q 34 36 41 33',
    open: 'M 23 15 Q 26 18 26 23 M 34 12 Q 36 17 35 23 M 44 14 Q 45 19 42 24 M 22 28 Q 29 30 35 27',
    point: 'M 25 27 Q 33 29 42 27 M 25 33 Q 33 35 40 32',
  };

  return (
    <div className={`voice-planet-arm-anchor voice-planet-arm-anchor--${side}`} aria-hidden="true">
      <svg className="voice-planet-arm-svg" viewBox="0 0 100 100" focusable="false">
        <defs>
          <linearGradient id={`voicePlanetTube-${side}`} x1="0" y1="0" x2=".82" y2="1">
            <stop offset="0" stopColor="#9ce8ff" />
            <stop offset=".48" stopColor="#5bb3df" />
            <stop offset="1" stopColor="#2b79aa" />
          </linearGradient>
          <linearGradient id={`voicePlanetGlove-${side}`} x1="0" y1="0" x2=".75" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".62" stopColor="#f3f9ff" />
            <stop offset="1" stopColor="#bfd8e9" />
          </linearGradient>
        </defs>
        <g className="voice-planet-limb voice-planet-limb--rest">
          <path className="voice-planet-arm-pipe-outline" d={idlePipePath} />
          <path className="voice-planet-arm-pipe" style={{ stroke: `url(#voicePlanetTube-${side})` }} d={idlePipePath} />
          <path className="voice-planet-arm-pipe-highlight" d={idlePipePath} />
          <g transform="translate(40 74.4)">
            <g transform="scale(.6)">
              <g transform="translate(0 45) scale(1 -1)">
                <g className="voice-planet-glove-motion">
                  <path className="voice-planet-glove pose-fist" style={{ fill: `url(#voicePlanetGlove-${side})` }} d={handPaths.fist} />
                  <path className="voice-planet-glove-crease" d={creasePaths.fist} />
                </g>
              </g>
            </g>
          </g>
        </g>
        <g className="voice-planet-limb voice-planet-limb--gesture">
          <path className="voice-planet-arm-pipe-outline" d={gesturePipePath} />
          <path className="voice-planet-arm-pipe" style={{ stroke: `url(#voicePlanetTube-${side})` }} d={gesturePipePath} />
          <path className="voice-planet-arm-pipe-highlight" d={gesturePipePath} />
          <g transform="translate(0 35)">
            <g className="voice-planet-glove-motion">
              <path className={`voice-planet-glove pose-${pose}`} style={{ fill: `url(#voicePlanetGlove-${side})` }} d={handPaths[pose]} />
              <path className="voice-planet-glove-crease" d={creasePaths[pose]} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function AiPlanetAvatar({ isSpeaking, isListening, isThinking = false, mouthViseme, mouthStyle, gesture, expression, gaze }: AiPlanetAvatarProps) {
  const stateClass = isSpeaking ? 'speaking' : isListening ? 'listening' : isThinking ? 'thinking' : 'idle';
  const activeGesture = isSpeaking ? gesture : 'idle';
  const activeExpression = isSpeaking ? expression : isListening ? 'curious' : isThinking ? 'focused' : 'neutral';
  const activeGaze = isSpeaking ? gaze : 'center';
  const caption = isSpeaking
    ? '🗣️ Konuşuyor…'
    : isListening
      ? '🎙️ Seni dinliyorum…'
      : isThinking
        ? '🧠 Yanıtını hazırlıyor…'
        : '🪐 Hazır — sorunu yaz veya mikrofona konuş';

  return (
    <div className="voice-planet-stage" aria-live="polite">
      <style>{`
        .voice-planet-stage,
        .voice-planet-stage * { box-sizing: border-box; }

        /* Maskotun 10 hareketi: yörünge, süzülme, gövde salınımı, boru kol salınımı,
           kol esnemesi, el hareketi, göz takibi, perde göz kırpma,
           konuşma zıplaması ve dinleme nabzı. */
        @keyframes voicePlanetOrbit { from { transform: rotate(-14deg); } to { transform: rotate(346deg); } }
        @keyframes voicePlanetFloat { 0%, 100% { transform: translateY(1px); } 50% { transform: translateY(-8px); } }
        @keyframes voicePlanetSway { 0%, 100% { transform: rotate(-1.4deg); } 50% { transform: rotate(1.4deg); } }
        @keyframes voicePlanetArmSway {
          0%, 100% { transform: rotate(var(--arm-sway-rest, -9deg)); }
          50% { transform: rotate(var(--arm-sway-gesture, 8deg)); }
        }
        @keyframes voicePlanetArmFlex { 0%, 100% { stroke-width: 5.6; } 50% { stroke-width: 6; } }
        @keyframes voicePlanetHandWave { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(5deg); } }
        @keyframes voicePlanetPupilGlance {
          0%, 18%, 72%, 100% { transform: translate(calc(-50% + var(--gaze-x, 0px)), calc(-50% + var(--gaze-y, 0px))); }
          28%, 37% { transform: translate(calc(-46% + var(--gaze-x, 0px)), calc(-52% + var(--gaze-y, 0px))); }
          48%, 58% { transform: translate(calc(-54% + var(--gaze-x, 0px)), calc(-49% + var(--gaze-y, 0px))); }
        }
        @keyframes voicePlanetBlinkCurtain {
          0%, 84%, 100% { transform: scaleY(0); }
          86% { transform: scaleY(1.08); }
          88% { transform: scaleY(.96); }
          90% { transform: scaleY(0); }
        }
        @keyframes voicePlanetTalkBounce { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-3px) scale(1.018); } }
        @keyframes voicePlanetListenPulse {
          0%, 100% { opacity: .44; box-shadow: 0 0 0 0 rgba(56,189,248,.32); }
          50% { opacity: .92; box-shadow: 0 0 0 20px rgba(56,189,248,0); }
        }

        .voice-planet-stage {
          position: relative;
          min-height: 320px;
          overflow: hidden;
          border-radius: 22px;
          margin: 15px 0 14px;
          display: grid;
          place-items: center;
          background:
            radial-gradient(ellipse at 50% 16%, rgba(56,189,248,.25), transparent 34%),
            radial-gradient(circle at 14% 82%, rgba(37,99,235,.13), transparent 30%),
            linear-gradient(180deg, #050816 0%, #0c1730 58%, #111827 100%);
          border: 1px solid rgba(125,211,252,.27);
          box-shadow: inset 0 0 62px rgba(14,165,233,.09);
        }
        .voice-planet-stage::before,
        .voice-planet-stage::after {
          content: '✦';
          position: absolute;
          color: #dbeafe;
          opacity: .76;
          font-size: 16px;
          text-shadow: 0 0 14px rgba(125,211,252,.8);
          animation: voicePlanetOrbit 7s ease-in-out infinite alternate;
        }
        .voice-planet-stage::before { left: 13%; top: 19%; }
        .voice-planet-stage::after { right: 13%; top: 37%; animation-delay: -2.3s; font-size: 12px; }

        .voice-planet-mascot {
          --planet-size: clamp(176px, 52vw, 206px);
          --arm-reach: clamp(92px, 29vw, 116px);
          --gaze-x: 0px;
          --gaze-y: 0px;
          position: relative;
          isolation: isolate;
          width: min(100%, 390px);
          height: 248px;
          margin: -4px auto 0;
          filter: drop-shadow(0 20px 32px rgba(14,165,233,.2));
          animation: voicePlanetFloat 4.2s ease-in-out infinite;
        }
        .voice-planet-mascot::after {
          content: '';
          position: absolute;
          z-index: 0;
          left: 50%;
          bottom: 20px;
          width: 44%;
          height: 13px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(2,6,23,.55), rgba(14,165,233,.1) 58%, transparent 76%);
          filter: blur(4px);
        }
        .voice-planet-orbit {
          position: absolute;
          inset: 25px 8px;
          border: 1px dashed rgba(125,211,252,.3);
          border-radius: 50%;
          transform: rotate(-14deg);
          animation: voicePlanetOrbit 28s linear infinite;
          z-index: 0;
        }
        .voice-planet-aura {
          position: absolute;
          left: 50%;
          top: 50%;
          width: calc(var(--planet-size) + 20px);
          height: calc(var(--planet-size) + 20px);
          transform: translate(-50%, -50%);
          border: 1px solid rgba(125,211,252,.16);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56,189,248,.16), rgba(37,99,235,.03) 62%, transparent 72%);
          z-index: 1;
        }
        .voice-planet-mascot.listening .voice-planet-aura { animation: voicePlanetListenPulse 1.45s ease-in-out infinite; }
        .voice-planet-arms {
          position: absolute;
          inset: 0;
          z-index: 2;
          overflow: visible;
          pointer-events: none;
        }
        .voice-planet-mascot[data-gesture='idle'] .voice-planet-arms {
          z-index: 2;
          animation: voicePlanetSway 6.2s ease-in-out infinite;
        }

        .voice-planet-arm-anchor {
          position: absolute;
          top: 64%;
          width: 0;
          height: 0;
          z-index: 2;
          pointer-events: none;
        }
        .voice-planet-arm-anchor--left { left: calc(50% - var(--planet-size) / 2 + 12px); }
        .voice-planet-arm-anchor--right {
          left: calc(50% + var(--planet-size) / 2 - 12px);
          transform: scaleX(-1);
        }
        .voice-planet-arm-svg {
          position: absolute;
          top: -53px;
          right: 0;
          width: var(--arm-reach);
          height: var(--arm-reach);
          overflow: visible;
          transform-origin: 100% 63%;
          animation: voicePlanetArmSway 4.2s ease-in-out infinite;
        }
        .voice-planet-arm-anchor--left .voice-planet-arm-svg {
          --arm-sway-rest: -3deg;
          --arm-sway-gesture: 3deg;
        }
        .voice-planet-arm-anchor--right .voice-planet-arm-svg {
          --arm-sway-rest: -1deg;
          --arm-sway-gesture: 5deg;
          animation-delay: -1.4s;
        }
        .voice-planet-limb {
          transform-box: view-box;
          transform-origin: 100% 63%;
          transition: transform .48s cubic-bezier(.2,.75,.25,1), opacity .28s ease;
        }
        .voice-planet-limb--rest { opacity: 0; }
        .voice-planet-limb--gesture { opacity: 1; }
        .voice-planet-mascot[data-gesture='idle'] .voice-planet-limb--rest { opacity: 1; }
        .voice-planet-mascot[data-gesture='idle'] .voice-planet-limb--gesture { opacity: 0; }
        .voice-planet-mascot[data-gesture='idle'] .voice-planet-arm-svg,
        .voice-planet-mascot[data-gesture='idle'] .voice-planet-glove-motion { animation: none; }
        .voice-planet-mascot.speaking .voice-planet-arm-svg { animation-duration: 2.9s; }
        .voice-planet-mascot.speaking .voice-planet-glove-motion { animation-duration: 1.45s; }
        .voice-planet-mascot[data-gesture='present-left'] .voice-planet-arm-anchor--left .voice-planet-limb--gesture { transform: rotate(-19deg); }
        .voice-planet-mascot[data-gesture='present-left'] .voice-planet-arm-anchor--right .voice-planet-limb--gesture { transform: rotate(5deg); }
        .voice-planet-mascot[data-gesture='present-right'] .voice-planet-arm-anchor--left .voice-planet-limb--gesture { transform: rotate(-5deg); }
        .voice-planet-mascot[data-gesture='present-right'] .voice-planet-arm-anchor--right .voice-planet-limb--gesture { transform: rotate(19deg); }
        .voice-planet-mascot[data-gesture='present-both'] .voice-planet-arm-anchor--left .voice-planet-limb--gesture { transform: rotate(-15deg); }
        .voice-planet-mascot[data-gesture='present-both'] .voice-planet-arm-anchor--right .voice-planet-limb--gesture { transform: rotate(16deg); }
        .voice-planet-mascot[data-gesture='emphasis'] .voice-planet-arm-anchor--left .voice-planet-limb--gesture { transform: rotate(-22deg); }
        .voice-planet-mascot[data-gesture='emphasis'] .voice-planet-arm-anchor--right .voice-planet-limb--gesture { transform: rotate(23deg); }
        .voice-planet-mascot[data-gesture='question'] .voice-planet-arm-anchor--left .voice-planet-limb--gesture { transform: rotate(-25deg); }
        .voice-planet-mascot[data-gesture='question'] .voice-planet-arm-anchor--right .voice-planet-limb--gesture { transform: rotate(25deg); }
        .voice-planet-mascot[data-gesture='compare'] .voice-planet-arm-anchor--left .voice-planet-limb--gesture { transform: rotate(-23deg); }
        .voice-planet-mascot[data-gesture='compare'] .voice-planet-arm-anchor--right .voice-planet-limb--gesture { transform: rotate(9deg); }
        .voice-planet-mascot[data-gesture='encourage'] .voice-planet-arm-anchor--left .voice-planet-limb--gesture { transform: rotate(-18deg); }
        .voice-planet-mascot[data-gesture='encourage'] .voice-planet-arm-anchor--right .voice-planet-limb--gesture { transform: rotate(21deg); }
        .voice-planet-mascot[data-gesture='caution'] .voice-planet-arm-anchor--left .voice-planet-limb--gesture { transform: rotate(-17deg); }
        .voice-planet-mascot[data-gesture='caution'] .voice-planet-arm-anchor--right .voice-planet-limb--gesture { transform: rotate(4deg); }
        .voice-planet-arm-pipe-outline,
        .voice-planet-arm-pipe,
        .voice-planet-arm-pipe-highlight {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .voice-planet-arm-pipe-outline { stroke: rgba(22,74,123,.52); stroke-width: 8.2; }
        .voice-planet-arm-pipe {
          stroke: #68bce5;
          stroke-width: 5.8;
          opacity: .96;
          filter: drop-shadow(0 1px 1px rgba(4,24,43,.3));
          animation: voicePlanetArmFlex 2.8s ease-in-out infinite;
        }
        .voice-planet-arm-pipe-highlight { stroke: rgba(223,249,255,.82); stroke-width: 1.2; opacity: .58; }
        .voice-planet-arm-anchor--right .voice-planet-arm-pipe { animation-delay: -1.3s; }
        .voice-planet-glove-motion {
          transform-box: fill-box;
          transform-origin: 76% 60%;
          animation: voicePlanetHandWave 2.2s ease-in-out infinite;
        }
        .voice-planet-arm-anchor--right .voice-planet-glove-motion { animation-delay: -.9s; animation-direction: reverse; }
        .voice-planet-glove {
          fill: #fbfdff;
          stroke: #285780;
          stroke-width: 2.1;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 1px 1px rgba(2,6,23,.22));
        }
        .voice-planet-glove-crease {
          fill: none;
          stroke: #9dbed5;
          stroke-width: 1.15;
          stroke-linecap: round;
          pointer-events: none;
        }

        .voice-planet-core-anchor {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--planet-size);
          height: var(--planet-size);
          transform: translate(-50%, -50%);
          z-index: 3;
        }
        .voice-planet-core {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 3px solid #164a7b;
          border-radius: 50%;
          background:
            radial-gradient(ellipse at 27% 17%, rgba(228,250,255,.92) 0 2%, rgba(151,227,250,.48) 13%, transparent 34%),
            linear-gradient(145deg, #70d8f7 0%, #3292d0 56%, #1d568f 100%);
          box-shadow: inset 3px 4px 9px rgba(231,250,255,.38), inset -10px -14px 22px rgba(3,38,84,.31), 0 0 0 3px rgba(198,242,255,.28), 0 12px 25px rgba(2,6,23,.38);
          animation: voicePlanetSway 6.2s ease-in-out infinite;
        }
        .voice-planet-core::before {
          content: '';
          position: absolute;
          inset: 2px;
          z-index: 4;
          border: 1px solid rgba(239,251,255,.55);
          border-radius: 50%;
          box-shadow: inset 0 2px 3px rgba(255,255,255,.42), inset 0 -3px 5px rgba(4,35,78,.13);
          pointer-events: none;
        }
        .voice-planet-inner {
          position: absolute;
          inset: 5px;
          overflow: hidden;
          border: 2px solid rgba(239,251,255,.76);
          border-radius: 50%;
          background:
            radial-gradient(circle at 29% 17%, #ffffff 0 1.5%, rgba(226,250,255,.94) 5%, rgba(198,241,253,.54) 13%, transparent 27%),
            radial-gradient(ellipse at 48% 42%, #b8ecfb 0%, #a0e2f5 30%, #72cbed 65%, #409bd0 100%);
          box-shadow: inset 0 -15px 24px rgba(18,75,126,.23), inset 0 4px 9px rgba(255,255,255,.58), inset 5px 0 8px rgba(255,255,255,.14);
        }
        .voice-planet-inner::before {
          content: '';
          position: absolute;
          left: -14%;
          top: 31%;
          width: 130%;
          height: 18%;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(224,247,255,.2), rgba(255,255,255,.28), rgba(224,247,255,.12), transparent);
          transform: rotate(-18deg);
          pointer-events: none;
        }
        .voice-planet-inner::after {
          content: '';
          position: absolute;
          z-index: 3;
          left: 12%;
          top: 8%;
          width: 42%;
          height: 12%;
          border-radius: 50%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.48), transparent);
          filter: blur(1px);
          transform: rotate(-22deg);
          pointer-events: none;
        }
        .voice-planet-mascot.speaking .voice-planet-inner { animation: voicePlanetTalkBounce .48s ease-in-out infinite; }

        .voice-planet-dial {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: .94;
          pointer-events: none;
          z-index: 1;
        }
        .voice-planet-dial-ring { fill: none; stroke: rgba(20,71,116,.38); stroke-width: 1.3; }
        .voice-planet-dial-tick { stroke: #2b6592; stroke-width: 1; stroke-linecap: round; opacity: .52; }
        .voice-planet-dial-tick.hour { stroke: #164a7b; stroke-width: 2.3; opacity: .92; }
        .voice-planet-dial-cardinal {
          fill: #123653;
          stroke: #071e32;
          stroke-width: 1.4;
          filter: drop-shadow(0 1px 1px rgba(2,19,36,.42));
        }
        .voice-planet-dial-cardinal-highlight {
          fill: none;
          stroke: rgba(177,225,247,.54);
          stroke-width: 1.15;
          stroke-linecap: round;
        }

        .voice-planet-face { position: absolute; inset: 0; z-index: 2; }
        .voice-planet-dial-hub {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 7px;
          height: 7px;
          transform: translate(-50%, -50%);
          border: 1.2px solid #061b2e;
          border-radius: 50%;
          background: radial-gradient(circle at 34% 28%, #7ecde9 0 12%, #174361 36%, #061b2e 100%);
          box-shadow: 0 0 0 1px rgba(211,243,255,.56), 0 1px 2px rgba(2,6,23,.4);
          z-index: 4;
          pointer-events: none;
        }
        .voice-planet-face::before,
        .voice-planet-face::after {
          content: '';
          position: absolute;
          top: 70%;
          width: 14%;
          height: 7%;
          border-radius: 50%;
          background: radial-gradient(ellipse at 36% 30%, rgba(255,238,247,.72) 0 9%, rgba(255,132,184,.62) 40%, rgba(255,132,184,.04) 100%);
          filter: blur(2.5px);
          z-index: 1;
        }
        .voice-planet-face::before { left: 6%; }
        .voice-planet-face::after { right: 6%; }
        .voice-planet-brow {
          position: absolute;
          top: 25%;
          width: 16%;
          height: 5%;
          border-top: 4.5px solid #173f63;
          border-radius: 50%;
          filter: drop-shadow(0 1px 0 rgba(2,21,40,.28));
          z-index: 3;
          transition: transform .24s cubic-bezier(.2,.75,.25,1), top .24s ease;
        }
        .voice-planet-brow.left { left: 24%; transform: rotate(-10deg); }
        .voice-planet-brow.right { right: 24%; transform: rotate(10deg); }
        .voice-planet-mascot[data-expression='curious'] .voice-planet-brow.left { transform: translateY(-3px) rotate(-10deg); }
        .voice-planet-mascot[data-expression='curious'] .voice-planet-brow.right { transform: translateY(-2px) rotate(8deg); }
        .voice-planet-mascot[data-expression='focused'] .voice-planet-brow.left { transform: translateY(4px) rotate(-2deg); }
        .voice-planet-mascot[data-expression='focused'] .voice-planet-brow.right { transform: translateY(4px) rotate(2deg); }
        .voice-planet-mascot[data-expression='surprised'] .voice-planet-brow.left { transform: translateY(-6px) rotate(-13deg); }
        .voice-planet-mascot[data-expression='surprised'] .voice-planet-brow.right { transform: translateY(-6px) rotate(13deg); }
        .voice-planet-mascot[data-expression='concerned'] .voice-planet-brow.left { transform: translateY(1px) rotate(1deg); }
        .voice-planet-mascot[data-expression='concerned'] .voice-planet-brow.right { transform: translateY(-4px) rotate(14deg); }
        /* Smaller, raised eye shells stay centered between all four bold cardinal marks. */
        .voice-planet-eye {
          position: absolute;
          top: 32.5%;
          width: 23%;
          height: 28%;
          overflow: hidden;
          border: 2px solid rgba(15,61,111,.58);
          border-radius: 50%;
          background: radial-gradient(ellipse at 37% 26%, #fff 0%, #f4fbff 58%, #bfdef3 100%);
          box-shadow: inset 0 -4px 7px rgba(30,64,110,.15), inset 0 2px 3px rgba(255,255,255,.8), 0 2px 6px rgba(2,6,23,.15);
          transform-origin: center;
          transition: transform .24s cubic-bezier(.2,.75,.25,1), border-radius .24s ease;
        }
        .voice-planet-eye::before {
          content: '';
          position: absolute;
          inset: 2px;
          z-index: 0;
          border-radius: inherit;
          box-shadow: inset 0 2px 4px rgba(255,255,255,.8), inset 0 -3px 5px rgba(29,76,117,.16);
          pointer-events: none;
        }
        .voice-planet-eye.left { left: 20.5%; }
        .voice-planet-eye.right { right: 20.5%; }
        .voice-planet-lashes {
          position: absolute;
          top: 32.5%;
          left: 20.5%;
          width: 23%;
          height: 28%;
          overflow: visible;
          z-index: 5;
          pointer-events: none;
        }
        .voice-planet-lashes.right { left: auto; right: 20.5%; transform: scaleX(-1); }
        .voice-planet-upper-lid {
          fill: none;
          stroke: #153f65;
          stroke-width: 4.4;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 1px 0 rgba(2,21,40,.32));
        }
        /* Compact, angular outer-corner tufts—bold cartoon lashes, not a long mascara fan. */
        .voice-planet-lash-tufts {
          fill: #153f65;
          stroke: #123b5d;
          stroke-width: .65;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 1px 0 rgba(2,21,40,.28));
        }
        .voice-planet-mascot[data-expression='warm'] .voice-planet-eye { transform: scaleY(.96); }
        .voice-planet-mascot[data-expression='curious'] .voice-planet-eye { transform: scaleY(1.08); }
        .voice-planet-mascot[data-expression='focused'] .voice-planet-eye { transform: scaleY(.78); }
        .voice-planet-mascot[data-expression='surprised'] .voice-planet-eye { transform: scale(1.04, 1.14); }
        .voice-planet-mascot[data-expression='concerned'] .voice-planet-eye { transform: scaleY(.9); }
        .voice-planet-mascot[data-gaze='left'] { --gaze-x: -1.7px; }
        .voice-planet-mascot[data-gaze='right'] { --gaze-x: 1.7px; }
        .voice-planet-mascot[data-gaze='up'] { --gaze-y: -1.7px; }
        .voice-planet-mascot.speaking .voice-planet-eyelid { animation-duration: 3.8s; }
        /* Half-size pupils, centered for the same forward, parallel gaze. */
        .voice-planet-pupil {
          position: absolute;
          left: 50%;
          top: 53%;
          width: 45%;
          height: 46%;
          border: 1px solid rgba(5,18,35,.88);
          border-radius: 50%;
          background: radial-gradient(ellipse at 36% 21%, #4a6282 0 8%, #1a2f4c 24%, #07152b 58%, #020711 100%);
          box-shadow: inset 1px 2px 4px rgba(0,0,0,.62), 0 1px 2px rgba(2,6,23,.28);
          transform: translate(-50%, -50%);
          animation: voicePlanetPupilGlance 7.5s ease-in-out infinite;
        }
        .voice-planet-glint {
          position: absolute;
          left: 7px;
          top: 7px;
          width: 9px;
          height: 11px;
          border-radius: 50%;
          background: rgba(255,255,255,.95);
          box-shadow: 5px 13px 0 -3px rgba(255,255,255,.68);
        }
        .voice-planet-eyelid {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(180deg, #b5ecff 0%, #53b2e8 62%, #328bd0 100%);
          box-shadow: inset 0 -4px 0 rgba(14,76,131,.34), inset 0 2px 3px rgba(255,255,255,.32);
          transform: scaleY(0);
          transform-origin: top center;
          animation: voicePlanetBlinkCurtain 5.2s ease-in-out infinite;
          z-index: 4;
        }
        .voice-planet-eye.right .voice-planet-eyelid { animation-delay: -.13s; }
        .voice-planet-mouth {
          position: absolute;
          left: 50%;
          overflow: hidden;
          border: 1.4px solid #123b62;
          transform: translateX(-50%);
          transition: width .075s linear, height .075s linear, top .075s linear, border-radius .075s linear, background .075s linear;
          box-shadow: inset 0 2px 3px rgba(255,255,255,.15), inset 0 -4px 4px rgba(0,0,0,.4), 0 1px 2px rgba(4,24,43,.32);
          z-index: 2;
        }
        .voice-planet-mouth-tongue,
        .voice-planet-mouth-teeth { display: none; position: absolute; }
        .voice-planet-mouth-tongue {
          left: 31%;
          right: 31%;
          bottom: 17%;
          height: 29%;
          border-radius: 50% 50% 42% 42%;
          background: linear-gradient(180deg, #dc8298 0%, #a83e64 72%, #712744 100%);
          box-shadow: inset 0 1px 2px rgba(255,255,255,.36), 0 -1px 2px rgba(0,0,0,.24);
          z-index: 1;
        }
        .voice-planet-mouth-teeth {
          left: 10%;
          right: 10%;
          height: 31%;
          background: repeating-linear-gradient(90deg, #ffffff 0 5px, #c5d5df 5px 6px);
          box-shadow: inset 0 -1px 0 rgba(63,91,109,.42), 0 1px 2px rgba(0,0,0,.22);
          z-index: 2;
        }
        .voice-planet-mouth-teeth.upper {
          top: 1px;
          border-radius: 1px 1px 4px 4px;
          background: repeating-linear-gradient(90deg, #ffffff 0 5px, #c5d5df 5px 6px);
        }
        .voice-planet-mouth-teeth.lower {
          bottom: 1px;
          border-radius: 4px 4px 1px 1px;
          background: repeating-linear-gradient(90deg, #eef7fb 0 5px, #afc3cf 5px 6px);
          box-shadow: inset 0 1px 1px rgba(255,255,255,.9), 0 -1px 2px rgba(0,0,0,.2);
        }
        .voice-planet-mouth[data-viseme='open'] .voice-planet-mouth-tongue,
        .voice-planet-mouth[data-viseme='wide'] .voice-planet-mouth-tongue { display: block; }
        .voice-planet-mouth[data-viseme='open'] .voice-planet-mouth-teeth,
        .voice-planet-mouth[data-viseme='wide'] .voice-planet-mouth-teeth,
        .voice-planet-mouth[data-viseme='round'] .voice-planet-mouth-teeth,
        .voice-planet-mouth[data-viseme='teeth'] .voice-planet-mouth-teeth { display: block; }
        .voice-planet-caption {
          position: absolute;
          bottom: 10px;
          z-index: 5;
          max-width: calc(100% - 24px);
          padding: 5px 10px;
          border: 1px solid rgba(125,211,252,.16);
          border-radius: 999px;
          background: rgba(2,6,23,.72);
          color: #bae6fd;
          font-size: 11px;
          font-weight: 900;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        @media (max-width: 420px) {
          .voice-planet-stage { min-height: 316px; }
          .voice-planet-mascot { height: 252px; }
          .voice-planet-caption { font-size: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .voice-planet-stage *,
          .voice-planet-stage::before,
          .voice-planet-stage::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div
        className={`voice-planet-mascot ${stateClass}`}
        data-gesture={activeGesture}
        data-expression={activeExpression}
        data-gaze={activeGaze}
        role="img"
        aria-label="Tüm dairesi ibresiz saat kadranı olan, iri gözlü mavi gezegen yapay zekâ ajanı"
      >
        <div className="voice-planet-orbit" aria-hidden="true" />
        <div className="voice-planet-aura" aria-hidden="true" />
        <div className="voice-planet-arms" aria-hidden="true">
          <PlanetArm side="left" gesture={activeGesture} />
          <PlanetArm side="right" gesture={activeGesture} />
        </div>

        <div className="voice-planet-core-anchor" aria-hidden="true">
          <div className="voice-planet-core">
            <div className="voice-planet-inner">
              <svg className="voice-planet-dial" viewBox="0 0 174 174" aria-hidden="true" focusable="false">
                <circle className="voice-planet-dial-ring" cx="87" cy="87" r="83" />
                {planetTicks.filter((_, index) => index % 15 !== 0).map((tick, index) => (
                  <line
                    key={index}
                    className={`voice-planet-dial-tick ${tick.isHourMark ? 'hour' : 'minute'}`}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                  />
                ))}
                <g className="voice-planet-dial-cardinals">
                  <rect className="voice-planet-dial-cardinal" x="83" y="8" width="8" height="21" rx="4" />
                  <rect className="voice-planet-dial-cardinal" x="83" y="145" width="8" height="21" rx="4" />
                  <rect className="voice-planet-dial-cardinal" x="8" y="83" width="21" height="8" rx="4" />
                  <rect className="voice-planet-dial-cardinal" x="145" y="83" width="21" height="8" rx="4" />
                  <path className="voice-planet-dial-cardinal-highlight" d="M 87 11 V 26 M 87 148 V 163 M 11 87 H 26 M 148 87 H 163" />
                </g>
              </svg>

              <div className="voice-planet-face">
                <span className="voice-planet-brow left" />
                <span className="voice-planet-brow right" />
                <span className="voice-planet-eye left">
                  <span className="voice-planet-pupil"><i className="voice-planet-glint" /></span>
                  <span className="voice-planet-eyelid" />
                </span>
                <PlanetLashes side="left" />
                <span className="voice-planet-eye right">
                  <span className="voice-planet-pupil"><i className="voice-planet-glint" /></span>
                  <span className="voice-planet-eyelid" />
                </span>
                <PlanetLashes side="right" />
                <span className="voice-planet-dial-hub" aria-hidden="true" />
                <span className="voice-planet-mouth" data-viseme={mouthViseme} style={mouthStyle}>
                  <span className="voice-planet-mouth-tongue" />
                  <span className="voice-planet-mouth-teeth upper" />
                  <span className="voice-planet-mouth-teeth lower" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="voice-planet-caption">{caption}</div>
    </div>
  );
}
