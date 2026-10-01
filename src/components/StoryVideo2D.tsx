import React, { useEffect, useRef, useState } from 'react';
import type { CheckpointStory } from '../storyModule';

type StoryScene = 'umbrella' | 'kitchen' | 'restaurant' | 'proposal' | 'digitalFinal';

export const STORY_VIDEO_DURATION_SECONDS = 38;

interface StoryVideo2DProps {
  story: CheckpointStory;
  frameIndex?: number;
  playing?: boolean;
  compact?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onToggle?: () => void;
  onSpeakFrame?: () => void;
}

const sceneForStory = (story: CheckpointStory): StoryScene => {
  if (story.id.includes('a1')) return 'umbrella';
  if (story.id.includes('a2')) return 'kitchen';
  if (story.id.includes('b1')) return 'restaurant';
  if (story.id.includes('b2')) return 'proposal';
  return 'digitalFinal';
};

const sceneName: Record<StoryScene, string> = {
  umbrella: 'Yağmurlu kafe · sarı şemsiye',
  kitchen: 'Mutfak kaosu · yeni garson',
  restaurant: 'Restoran akşamı · tatlı kazası',
  proposal: 'Romantik teklif · şefin gecesi',
  digitalFinal: 'Dijital final · gerçek hikaye',
};

const higgsfieldVideoAssetForStory = (storyId: string): { src: string; track: string } => {
  if (storyId.includes('a1')) return { src: '/story-videos/higgsfield-a1-yellow-umbrella.mp4', track: '/story-videos/higgsfield-a1-yellow-umbrella.vtt' };
  if (storyId.includes('a2')) return { src: '/story-videos/higgsfield-a2-new-waiter.mp4', track: '/story-videos/higgsfield-a2-new-waiter.vtt' };
  if (storyId.includes('b1')) return { src: '/story-videos/higgsfield-b1-van-gogh-dinner.mp4', track: '/story-videos/higgsfield-b1-van-gogh-dinner.vtt' };
  if (storyId.includes('b2')) return { src: '/story-videos/higgsfield-b2-chef-evening.mp4', track: '/story-videos/higgsfield-b2-chef-evening.vtt' };
  return { src: '/story-videos/higgsfield-c-final-real-story.mp4', track: '/story-videos/higgsfield-c-final-real-story.vtt' };
};

type ActorKind = 'dima' | 'marina' | 'chef' | 'waiter' | 'nina';
type ActorSpec = { kind: ActorKind; label: string };

const castForScene = (scene: StoryScene): { left: ActorSpec; right: ActorSpec } => {
  switch (scene) {
    case 'kitchen': return { left: { kind: 'chef', label: 'Şef Pyotr' }, right: { kind: 'waiter', label: 'Lyosha' } };
    case 'restaurant': return { left: { kind: 'dima', label: 'Dima' }, right: { kind: 'marina', label: 'Marina' } };
    case 'proposal': return { left: { kind: 'chef', label: 'Pyotr' }, right: { kind: 'nina', label: 'Nina' } };
    case 'digitalFinal': return { left: { kind: 'dima', label: 'Dima' }, right: { kind: 'marina', label: 'Marina' } };
    default: return { left: { kind: 'dima', label: 'Dima' }, right: { kind: 'marina', label: 'Marina' } };
  }
};

const speakerSide = (speaker: string, scene: StoryScene): 'left' | 'right' | 'narrator' => {
  const s = speaker.toLocaleLowerCase('tr-TR');
  if (s.includes('anlatıcı')) return 'narrator';
  if (s.includes('nina') || s.includes('нина') || s.includes('marina') || s.includes('марина') || s.includes('дети') || s.includes('çocuk')) return 'right';
  if (s.includes('lyosha') || s.includes('лёша') || s.includes('lesha') || s.includes('леша')) return scene === 'kitchen' ? 'right' : 'left';
  if (s.includes('semyon') || s.includes('семён') || s.includes('семен')) return 'right';
  if (s.includes('шеф') || s.includes('пётр') || s.includes('петр') || s.includes('pyotr') || s.includes('dima') || s.includes('дима') || s.includes('папа')) return 'left';
  return 'left';
};

const css = `
.story-video-2d {
  --accent: #fbbf24;
  --play: running;
  background: linear-gradient(135deg, #020617, #111827);
  border: 1px solid color-mix(in srgb, var(--accent) 62%, transparent);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 18px 45px color-mix(in srgb, var(--accent) 18%, transparent);
  color: #f8fafc;
}
.story-video-2d.paused { --play: paused; }
.story-video-2d:fullscreen { width: 100vw; height: 100vh; border-radius: 0; border: none; background: #020617; }
.story-video-2d:fullscreen .sv2d-stage { min-height: calc(100vh - 74px); border-radius: 0; }
.story-video-2d:fullscreen .sv2d-controls { min-height: 74px; }
.sv2d-stage {
  min-height: 360px;
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  padding: 18px;
  background: radial-gradient(circle at 16% 15%, color-mix(in srgb, var(--accent) 32%, transparent), transparent 30%), linear-gradient(145deg, #0f172a, #020617 68%);
  isolation: isolate;
  perspective: 1100px;
  transform-style: preserve-3d;
}
.story-video-2d.compact .sv2d-stage { min-height: 210px; padding: 12px; border-radius: 14px; aspect-ratio: 16 / 9; }
.sv2d-set { position: absolute; inset: -4%; z-index: 3; transform-origin: 50% 60%; animation: sv2d-camera-breath 6.5s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-film-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: saturate(1.14) contrast(1.08) brightness(.76); transform: scale(1.05); animation: sv2d-kenburns 38s linear infinite; animation-play-state: var(--play); }
.sv2d-film-depth { position: absolute; inset: 0; background: radial-gradient(circle at 38% 34%, rgba(255,255,255,.12), transparent 28%), linear-gradient(90deg, rgba(2,6,23,.36), transparent 35%, rgba(2,6,23,.42)); mix-blend-mode: screen; opacity: .55; z-index: 5; pointer-events: none; }
.sv2d-film-grain { position: absolute; inset: 0; z-index: 73; pointer-events: none; opacity: .18; background-image: radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px), radial-gradient(rgba(0,0,0,.18) 1px, transparent 1px); background-size: 3px 3px, 5px 5px; animation: sv2d-grain 700ms steps(2) infinite; animation-play-state: var(--play); }
.sv2d-stage.shot-1 .sv2d-set { transform: scale(1.08) translateX(2%); }
.sv2d-stage.shot-2 .sv2d-set { transform: scale(1.12) translateX(-3%); }
.sv2d-stage.shot-3 .sv2d-set { transform: scale(1.06) translateY(1.5%); }
.sv2d-film-focus { position: absolute; top: 86px; z-index: 68; display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 999px; background: rgba(2,6,23,.72); border: 1px solid rgba(226,232,240,.22); color: #e2e8f0; font-size: 11px; font-weight: 950; backdrop-filter: blur(7px); box-shadow: 0 10px 28px rgba(0,0,0,.28); }
.sv2d-film-focus.left { left: 20px; }.sv2d-film-focus.right { right: 20px; }.sv2d-film-focus.narrator { left: 50%; transform: translateX(-50%); }
.sv2d-rec { width: 8px; height: 8px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 12px #ef4444; animation: sv2d-rec 1.1s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-real-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; background: #020617; filter: saturate(1.08) contrast(1.04); z-index: 4; }
.sv2d-video-overlay { position: absolute; inset: 0; z-index: 8; pointer-events: none; background: linear-gradient(180deg, rgba(2,6,23,.22), transparent 24%, rgba(2,6,23,.30)); }
.sv2d-generated-video { position: absolute; inset: 0; z-index: 4; overflow: hidden; background: radial-gradient(circle at 36% 24%, rgba(255,255,255,.14), transparent 25%), linear-gradient(135deg, #0f172a, #020617); animation: sv2d-kenburns 38s linear infinite; animation-play-state: var(--play); }
.sv2d-generated-video::before { content: ''; position: absolute; inset: -10%; background: linear-gradient(110deg, rgba(255,255,255,.08), transparent 28%, rgba(0,0,0,.34)), radial-gradient(circle at 75% 25%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 28%); animation: sv2d-pan-light 9s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-generated-video::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 80px 80px; opacity: .24; transform: perspective(500px) rotateX(58deg) translateY(34%); transform-origin: bottom; }
.sv2d-generated-umbrella { background: linear-gradient(180deg, #172554 0%, #0f172a 54%, #020617); }
.sv2d-generated-kitchen { background: radial-gradient(circle at 55% 38%, rgba(249,115,22,.24), transparent 24%), linear-gradient(115deg, #292524, #0f172a 64%); }
.sv2d-generated-restaurant { background: radial-gradient(circle at 48% 20%, rgba(251,191,36,.28), transparent 25%), linear-gradient(135deg, #3b0764, #111827 70%); }
.sv2d-generated-proposal { background: radial-gradient(circle at 50% 30%, rgba(244,114,182,.32), transparent 26%), linear-gradient(135deg, #111827, #1e1b4b 70%); }
.sv2d-generated-digitalFinal { background: radial-gradient(circle at 30% 30%, rgba(56,189,248,.22), transparent 28%), linear-gradient(135deg, #020617, #172554 70%); }
.sv2d-generated-video .sv2d-dialogue-cast { z-index: 46; bottom: 26px; }
.sv2d-generated-video .sv2d-actor { animation: sv2d-human-idle 2.8s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-generated-video .sv2d-actor.actor-right { animation-delay: .4s; }
.sv2d-generated-video .sv2d-actor.talking { animation: sv2d-human-talk 1s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-generated-bokeh { position: absolute; inset: 0; z-index: 18; pointer-events: none; background: radial-gradient(circle at 18% 22%, rgba(251,191,36,.65) 0 4px, transparent 8px), radial-gradient(circle at 78% 18%, rgba(255,255,255,.38) 0 3px, transparent 9px), radial-gradient(circle at 62% 62%, rgba(56,189,248,.35) 0 3px, transparent 10px); filter: blur(.4px); animation: sv2d-bokeh 6s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-generated-tag { position: absolute; left: 18px; bottom: 92px; z-index: 62; color: #e2e8f0; background: rgba(2,6,23,.72); border: 1px solid rgba(226,232,240,.18); border-radius: 999px; padding: 6px 10px; font-size: 10px; font-weight: 950; backdrop-filter: blur(7px); }
.sv2d-missing-video { position: absolute; inset: 0; z-index: 10; display: flex; align-items: center; justify-content: center; padding: 26px; background: radial-gradient(circle at 50% 35%, rgba(251,191,36,.16), transparent 34%), linear-gradient(135deg, #020617, #111827); }
.sv2d-missing-card { max-width: 520px; text-align: center; background: rgba(15,23,42,.88); border: 1px solid rgba(251,191,36,.45); border-radius: 18px; padding: 22px; box-shadow: 0 18px 45px rgba(0,0,0,.36); }
.sv2d-missing-title { color: #fbbf24; font-size: 15px; font-weight: 950; margin-bottom: 8px; }
.sv2d-missing-path { margin-top: 12px; font-size: 11px; color: #bfdbfe; word-break: break-all; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background: #020617; border: 1px solid #334155; border-radius: 10px; padding: 9px; }
.sv2d-vignette { position: absolute; inset: 0; z-index: 72; pointer-events: none; background: radial-gradient(circle at 50% 42%, transparent 45%, rgba(0,0,0,.40) 100%); }
.sv2d-letterbox { position: absolute; left: 0; right: 0; height: 26px; background: rgba(0,0,0,.86); z-index: 80; pointer-events: none; }
.sv2d-letterbox.top { top: 0; }.sv2d-letterbox.bottom { bottom: 0; }
.sv2d-cut-flash { position: absolute; inset: 0; z-index: 71; pointer-events: none; background: rgba(255,255,255,.12); opacity: 0; animation: sv2d-cut 2.9s steps(1) infinite; animation-play-state: var(--play); }
.sv2d-stage::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent);
  transform: translateX(-120%);
  animation: sv2d-scan 4.5s linear infinite;
  animation-play-state: var(--play);
  z-index: 30;
  pointer-events: none;
}
.sv2d-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: .16;
  animation: sv2d-drift 12s linear infinite;
  animation-play-state: var(--play);
  pointer-events: none;
  z-index: 1;
}
.sv2d-head { position: relative; z-index: 60; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.sv2d-label { font-size: 10px; font-weight: 950; color: var(--accent); letter-spacing: .09em; text-transform: uppercase; }
.sv2d-title { font-size: 22px; line-height: 1.1; margin-top: 4px; font-weight: 950; text-shadow: 0 2px 12px rgba(0,0,0,.45); }
.story-video-2d.compact .sv2d-title { font-size: 15px; }
.sv2d-sub { font-size: 12px; color: #cbd5e1; margin-top: 4px; }
.story-video-2d.compact .sv2d-sub { font-size: 10px; }
.sv2d-badge { width: 56px; height: 56px; border-radius: 18px; background: var(--accent); color: #0f172a; display: flex; align-items: center; justify-content: center; font-size: 27px; box-shadow: 0 12px 30px color-mix(in srgb, var(--accent) 38%, transparent); flex: 0 0 auto; animation: sv2d-pop 1.8s ease-in-out infinite; animation-play-state: var(--play); }
.story-video-2d.compact .sv2d-badge { width: 42px; height: 42px; border-radius: 14px; font-size: 20px; }
.sv2d-floor { position: absolute; left: -5%; right: -5%; bottom: -12px; height: 95px; background: linear-gradient(0deg, rgba(2,6,23,.72), rgba(15,23,42,.12)); border-top: 1px solid rgba(148,163,184,.16); z-index: 6; pointer-events: none; }
.sv2d-caption { display: none; }
.story-video-2d.compact .sv2d-caption { display: none; }
.sv2d-speaker { display: inline-flex; font-size: 10px; font-weight: 950; color: var(--accent); background: #0f172a; border: 1px solid #334155; border-radius: 999px; padding: 4px 10px; margin-bottom: 8px; }
.sv2d-ru { font-size: 19px; font-weight: 900; line-height: 1.4; }
.story-video-2d.compact .sv2d-ru { font-size: 12px; max-height: 36px; overflow: hidden; }
.sv2d-reading { font-size: 11px; color: #94a3b8; margin-top: 7px; }
.story-video-2d.compact .sv2d-reading { display: none; }
.sv2d-controls { position: relative; z-index: 75; display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding: 12px; background: rgba(15,23,42,.88); border-top: 1px solid rgba(148,163,184,.18); }
.story-video-2d.compact .sv2d-controls { display: none; }
.sv2d-btn { background: #1e293b; border: 1px solid #334155; color: #e2e8f0; padding: 9px 12px; border-radius: 10px; font-weight: 900; cursor: pointer; }
.sv2d-btn.primary { background: var(--accent); color: #0f172a; border: none; box-shadow: 0 8px 18px color-mix(in srgb, var(--accent) 24%, transparent); }
.sv2d-time { font-size: 11px; font-weight: 900; color: #cbd5e1; background: #020617; border: 1px solid #334155; border-radius: 999px; padding: 5px 9px; }
.sv2d-progress { flex: 1; min-width: 120px; height: 8px; background: rgba(148,163,184,.2); border-radius: 999px; overflow: hidden; }
.sv2d-progress > div { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--accent), #fbbf24); transition: width .3s; }
.sv2d-watermark { position: absolute; right: 14px; bottom: 10px; z-index: 50; font-size: 10px; color: rgba(226,232,240,.68); background: rgba(2,6,23,.48); border: 1px solid rgba(148,163,184,.15); border-radius: 999px; padding: 4px 9px; }
.story-video-2d.compact .sv2d-watermark { font-size: 9px; }


.sv2d-dialogue-cast { position: absolute; left: 0; right: 0; bottom: 34px; z-index: 45; pointer-events: none; transform-style: preserve-3d; perspective: 980px; }
.sv2d-actor { position: absolute; bottom: 0; width: 132px; height: 188px; opacity: .82; transform: translateZ(0) rotateX(3deg) scale(.92); transform-origin: 50% 100%; transition: transform .28s ease, opacity .28s ease, filter .28s ease; filter: drop-shadow(0 20px 26px rgba(0,0,0,.54)); }
.sv2d-actor.actor-left { left: 9%; }
.sv2d-actor.actor-right { right: 9%; }
.sv2d-actor.talking { opacity: 1; transform: translateZ(32px) rotateX(0deg) scale(1.03) translateY(-6px); filter: drop-shadow(0 22px 34px color-mix(in srgb, var(--accent) 34%, rgba(0,0,0,.56))); }
.sv2d-actor-shadow { position: absolute; left: 12px; right: 12px; bottom: 0; height: 20px; border-radius: 50%; background: radial-gradient(ellipse, rgba(0,0,0,.52), transparent 70%); filter: blur(2px); transform: rotateX(62deg); }
.sv2d-actor-neck { position: absolute; left: 52px; top: 72px; width: 30px; height: 32px; border-radius: 0 0 14px 14px; background: linear-gradient(90deg, #d99c76, #f3c19a 42%, #b87558); z-index: 2; box-shadow: inset -7px 0 rgba(0,0,0,.1); }
.sv2d-actor-body { position: absolute; left: 20px; top: 94px; width: 92px; height: 82px; border-radius: 28px 28px 18px 18px; background: linear-gradient(135deg, #1d4ed8, #0f172a 72%); border: 1px solid rgba(255,255,255,.16); box-shadow: inset -18px -14px rgba(0,0,0,.22), inset 12px 10px rgba(255,255,255,.08); overflow: hidden; z-index: 1; }
.sv2d-actor-body::before { content: ''; position: absolute; left: 37px; top: 0; width: 18px; height: 64px; background: linear-gradient(#f8fafc, #cbd5e1); clip-path: polygon(0 0, 100% 0, 68% 100%, 28% 100%); opacity: .96; }
.sv2d-actor-body::after { content: ''; position: absolute; inset: 0; background: linear-gradient(110deg, rgba(255,255,255,.22), transparent 32%, transparent 68%, rgba(0,0,0,.24)); mix-blend-mode: screen; opacity: .55; }
.sv2d-actor-face { position: absolute; left: 33px; top: 12px; width: 68px; height: 76px; border-radius: 44% 44% 48% 48% / 38% 38% 56% 56%; background: radial-gradient(circle at 34% 30%, #ffd4b1, #e7aa83 66%, #a9674e); border: 1px solid rgba(255,255,255,.42); box-shadow: inset -13px -8px rgba(76,29,16,.18), inset 8px 7px rgba(255,255,255,.20), 0 7px 16px rgba(0,0,0,.32); z-index: 5; }
.sv2d-ear { position: absolute; top: 41px; width: 13px; height: 22px; border-radius: 50%; background: #d99a76; z-index: 3; box-shadow: inset -4px -2px rgba(0,0,0,.15); }
.sv2d-ear.left { left: 27px; }.sv2d-ear.right { right: 27px; }
.sv2d-hair { position: absolute; left: 29px; top: 4px; width: 75px; height: 42px; border-radius: 44px 44px 20px 18px; background: linear-gradient(135deg, #2b160d, #020617); z-index: 7; clip-path: polygon(0 34%, 13% 5%, 45% 0, 83% 7%, 100% 42%, 84% 36%, 76% 57%, 58% 38%, 42% 57%, 24% 40%, 12% 62%); filter: drop-shadow(0 3px 3px rgba(0,0,0,.28)); }
.sv2d-brow { position: absolute; top: 35px; width: 17px; height: 3px; border-radius: 999px; background: #2b160d; z-index: 8; }
.sv2d-brow.l { left: 47px; transform: rotate(-7deg); }.sv2d-brow.r { right: 47px; transform: rotate(7deg); }
.sv2d-eye { position: absolute; top: 43px; width: 8px; height: 8px; border-radius: 50%; background: #0f172a; border: 2px solid #f8fafc; z-index: 8; animation: sv2d-blink 4.2s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-eye.l { left: 49px; }.sv2d-eye.r { right: 49px; }
.sv2d-nose { position: absolute; left: 62px; top: 48px; width: 8px; height: 18px; border-radius: 8px; background: linear-gradient(90deg, transparent, rgba(127,29,29,.28)); transform: rotate(8deg); z-index: 8; }
.sv2d-mouth { position: absolute; left: 58px; top: 67px; width: 18px; height: 5px; border-radius: 0 0 999px 999px; background: #7f1d1d; transform-origin: center; z-index: 9; box-shadow: inset 0 2px rgba(255,255,255,.15); }
.sv2d-actor.talking .sv2d-mouth { animation: sv2d-mouth 260ms ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-arm { position: absolute; top: 108px; width: 15px; height: 62px; border-radius: 999px; background: linear-gradient(#e8ad87, #b87558); transform-origin: top center; z-index: 0; box-shadow: inset -4px -4px rgba(0,0,0,.14); }
.sv2d-arm.left { left: 16px; transform: rotate(15deg); }.sv2d-arm.right { right: 16px; transform: rotate(-15deg); }
.sv2d-actor.talking .sv2d-arm.right { animation: sv2d-wave 820ms ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-actor-label { position: absolute; left: 50%; transform: translateX(-50%); bottom: -1px; white-space: nowrap; font-size: 10px; font-weight: 950; color: #e2e8f0; background: rgba(2,6,23,.86); border: 1px solid rgba(148,163,184,.28); border-radius: 999px; padding: 4px 9px; z-index: 12; }
.sv2d-actor.actor-marina .sv2d-hair, .sv2d-actor.actor-nina .sv2d-hair { left: 23px; top: 0; width: 86px; height: 76px; border-radius: 44px 44px 34px 34px; background: linear-gradient(135deg, #3b2419, #111827); clip-path: polygon(5% 30%, 18% 6%, 50% 0, 82% 6%, 97% 32%, 90% 100%, 72% 62%, 50% 78%, 28% 62%, 10% 100%); }
.sv2d-actor.actor-marina .sv2d-actor-body { background: linear-gradient(135deg, #0ea5e9, #312e81 72%); }
.sv2d-actor.actor-nina .sv2d-actor-body { background: linear-gradient(135deg, #475569, #111827 72%); }
.sv2d-actor.actor-chef .sv2d-actor-body { background: linear-gradient(135deg, #f8fafc, #94a3b8 72%); }
.sv2d-actor.actor-chef .sv2d-actor-body::before { background: linear-gradient(#111827, #334155); width: 12px; left: 42px; }
.sv2d-actor.actor-chef .sv2d-hair { display: none; }
.sv2d-chef-hat { display: none; position: absolute; left: 22px; top: -5px; width: 88px; height: 38px; z-index: 10; background: radial-gradient(circle at 19px 20px, #fff 0 16px, transparent 17px), radial-gradient(circle at 43px 13px, #fff 0 20px, transparent 21px), radial-gradient(circle at 66px 20px, #fff 0 16px, transparent 17px), linear-gradient(#fff, #dbeafe); border-radius: 18px 18px 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,.25), inset 0 -5px #dbeafe; }
.sv2d-actor.actor-chef .sv2d-chef-hat { display: block; }
.sv2d-actor.actor-waiter .sv2d-actor-body { background: linear-gradient(135deg, #111827, #020617 72%); }
.sv2d-actor.actor-waiter .sv2d-actor-body::before { background: linear-gradient(#f8fafc, #e2e8f0); }
.sv2d-bubble { position: absolute; top: 92px; max-width: 270px; z-index: 50; background: rgba(248,250,252,.96); color: #0f172a; border: 2px solid var(--accent); border-radius: 18px; padding: 10px 12px; box-shadow: 0 16px 34px rgba(0,0,0,.34); font-size: 12px; font-weight: 900; line-height: 1.35; animation: sv2d-bubble 1.2s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-bubble.left { left: 22%; }.sv2d-bubble.right { right: 22%; }.sv2d-bubble.narrator { left: 50%; transform: translateX(-50%); border-style: dashed; background: rgba(15,23,42,.94); color: #f8fafc; }
.sv2d-bubble::after { content: ''; position: absolute; bottom: -11px; width: 18px; height: 18px; background: inherit; border-right: 2px solid var(--accent); border-bottom: 2px solid var(--accent); transform: rotate(45deg); }
.sv2d-bubble.left::after { left: 28px; }.sv2d-bubble.right::after { right: 28px; }.sv2d-bubble.narrator::after { left: calc(50% - 9px); }
.sv2d-bubble-speaker { color: var(--accent); font-size: 9px; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 3px; }
.sv2d-subtitles { position: absolute; left: 40px; right: 40px; bottom: 34px; z-index: 78; background: rgba(0,0,0,.62); border: 1px solid rgba(255,255,255,.16); border-radius: 8px; padding: 9px 14px; text-align: center; font-size: 15px; line-height: 1.38; font-weight: 850; color: #f8fafc; text-shadow: 0 2px 4px rgba(0,0,0,.92); backdrop-filter: blur(6px); }
.sv2d-camera-rig { position: absolute; left: 12px; bottom: 66px; z-index: 55; width: 46px; height: 30px; border-radius: 8px; background: linear-gradient(135deg, #111827, #475569); border: 1px solid rgba(226,232,240,.22); box-shadow: 0 8px 18px rgba(0,0,0,.38); animation: sv2d-camera 3.4s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-camera-rig::before { content: ''; position: absolute; left: 12px; top: 7px; width: 16px; height: 16px; border-radius: 50%; background: radial-gradient(circle, #38bdf8 0 3px, #020617 4px 8px, #94a3b8 9px); box-shadow: 23px -4px 0 -5px #e2e8f0; }
.sv2d-camera-rig::after { content: ''; position: absolute; right: -12px; top: 8px; border-left: 14px solid #334155; border-top: 7px solid transparent; border-bottom: 7px solid transparent; }
.story-video-2d.compact .sv2d-dialogue-cast { transform: scale(.64); transform-origin: bottom center; bottom: 18px; opacity: .88; }
.story-video-2d.compact .sv2d-bubble { display: none; }
.story-video-2d.compact .sv2d-subtitles { display: none; }
.story-video-2d.compact .sv2d-camera-rig { display: none; }


.sv2d-character { position: absolute; z-index: 18; width: 46px; height: 82px; animation-play-state: var(--play); }
.sv2d-character .head { position: absolute; left: 10px; top: 0; width: 28px; height: 28px; border-radius: 50%; background: #f6c99b; box-shadow: inset -5px -3px rgba(0,0,0,.12); }
.sv2d-character .body { position: absolute; left: 7px; top: 27px; width: 34px; height: 42px; border-radius: 14px 14px 8px 8px; background: var(--accent); box-shadow: inset -6px -5px rgba(0,0,0,.18); }
.sv2d-character .leg { position: absolute; bottom: 0; width: 10px; height: 22px; background: #334155; border-radius: 8px; transform-origin: top center; }
.sv2d-character .leg.l { left: 12px; animation: sv2d-leg 1s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-character .leg.r { right: 12px; animation: sv2d-leg 1s ease-in-out infinite reverse; animation-play-state: var(--play); }
.sv2d-character.alt .body { background: #38bdf8; }
.sv2d-character.chef .body { background: #f8fafc; }
.sv2d-character.chef .hat { position: absolute; top: -9px; left: 6px; width: 36px; height: 18px; background: #fff; border-radius: 18px 18px 9px 9px; box-shadow: 0 2px 0 #cbd5e1; }

/* A1: sarı şemsiye */
.sv2d-umbrella { background: linear-gradient(#172554, #0f172a 62%, #020617); }
.sv2d-rain { position: absolute; inset: 0; z-index: 5; pointer-events: none; opacity: .82; background-image: repeating-linear-gradient(115deg, rgba(147,197,253,.0) 0 14px, rgba(147,197,253,.5) 15px 17px, transparent 18px 28px); background-size: 170px 170px; animation: sv2d-rain 650ms linear infinite; animation-play-state: var(--play); }
.sv2d-cafe { position: absolute; left: 7%; bottom: 55px; width: 42%; height: 112px; background: #111827; border: 2px solid #334155; border-radius: 16px 16px 4px 4px; z-index: 9; box-shadow: 0 20px 40px rgba(0,0,0,.35); }
.sv2d-cafe::before { content: 'КАФЕ ВОСТОК'; position: absolute; top: 10px; left: 12px; right: 12px; height: 24px; display: flex; align-items: center; justify-content: center; background: #f59e0b; color: #111827; border-radius: 8px; font-size: 10px; font-weight: 950; letter-spacing: .08em; }
.sv2d-cafe::after { content: ''; position: absolute; left: 16px; right: 16px; bottom: 14px; height: 46px; border-radius: 10px; background: linear-gradient(90deg, #38bdf8, #f8fafc, #38bdf8); opacity: .55; animation: sv2d-window 2.4s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-umbrella-sprite { position: absolute; right: 17%; top: 64px; width: 132px; height: 74px; z-index: 22; transform-origin: 50% 100%; animation: sv2d-umbrella-float 2.1s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-umbrella-sprite::before { content: ''; position: absolute; left: 0; top: 0; width: 132px; height: 64px; background: #facc15; border-radius: 132px 132px 8px 8px; clip-path: polygon(0 100%, 12% 38%, 28% 8%, 50% 0, 72% 8%, 88% 38%, 100% 100%); box-shadow: inset -18px -10px rgba(0,0,0,.16); }
.sv2d-umbrella-sprite::after { content: ''; position: absolute; left: 63px; top: 58px; width: 5px; height: 92px; background: #f8fafc; border-radius: 999px; box-shadow: 16px 84px 0 -1px #f8fafc; }
.sv2d-dima-walk { left: 53%; bottom: 28px; animation: sv2d-walk 5.6s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-table { position: absolute; right: 12%; bottom: 62px; width: 110px; height: 52px; border-top: 10px solid #7c2d12; border-left: 12px solid transparent; border-right: 12px solid transparent; z-index: 13; }
.sv2d-table::before { content: '☕'; position: absolute; top: -38px; left: 16px; font-size: 28px; animation: sv2d-steam 1.3s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-table::after { content: '☂'; position: absolute; bottom: -34px; left: 30px; font-size: 32px; color: #facc15; transform: rotate(-22deg); animation: sv2d-glow 1.8s ease-in-out infinite; animation-play-state: var(--play); }

/* A2: mutfak */
.sv2d-kitchen { background: linear-gradient(180deg, #1f2937 0%, #0f172a 72%); }
.sv2d-tiles { position: absolute; inset: 0; opacity: .18; background-image: linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px); background-size: 44px 44px; z-index: 2; }
.sv2d-stove { position: absolute; left: 7%; bottom: 54px; width: 150px; height: 72px; border-radius: 16px 16px 6px 6px; background: #334155; z-index: 12; box-shadow: inset 0 10px #475569; }
.sv2d-stove::before, .sv2d-stove::after { content: ''; position: absolute; top: -18px; width: 44px; height: 36px; border-radius: 50%; background: radial-gradient(circle, #f97316, #ef4444 48%, transparent 62%); animation: sv2d-flame .75s ease-in-out infinite alternate; animation-play-state: var(--play); }
.sv2d-stove::before { left: 24px; }
.sv2d-stove::after { right: 24px; animation-delay: .2s; }
.sv2d-chef { left: 11%; bottom: 62px; animation: sv2d-chef-yell 1.5s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-waiter { right: 26%; bottom: 42px; animation: sv2d-slip 3.2s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-tray { position: absolute; right: 20%; bottom: 140px; width: 96px; height: 12px; border-radius: 999px; background: #94a3b8; z-index: 21; transform-origin: 20% 50%; animation: sv2d-tray 3.2s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-plate { position: absolute; right: 18%; bottom: 162px; width: 46px; height: 18px; border-radius: 50%; background: #f8fafc; z-index: 23; animation: sv2d-plate 3.2s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-sauce { position: absolute; right: 21%; bottom: 66px; width: 58px; height: 18px; border-radius: 50%; background: #b91c1c; opacity: .9; z-index: 14; transform: scale(0); animation: sv2d-splat 3.2s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-ticket { position: absolute; top: 74px; right: 12%; width: 64px; height: 48px; border-radius: 6px; background: #fde68a; color: #111827; font-size: 9px; font-weight: 950; display: grid; place-items: center; z-index: 10; animation: sv2d-ticket .9s ease-in-out infinite; animation-play-state: var(--play); }

/* B1: restoran */
.sv2d-restaurant { background: radial-gradient(circle at 50% 0%, rgba(251,191,36,.28), transparent 34%), linear-gradient(180deg, #3b0764, #0f172a 76%); }
.sv2d-lamp { position: absolute; top: 0; width: 4px; height: 76px; background: #475569; z-index: 8; animation: sv2d-sway 2.4s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-lamp::after { content: ''; position: absolute; left: -22px; bottom: -20px; width: 48px; height: 26px; border-radius: 0 0 28px 28px; background: #fbbf24; box-shadow: 0 16px 42px #fbbf24; }
.sv2d-lamp.one { left: 22%; }.sv2d-lamp.two { right: 22%; animation-delay: .5s; }
.sv2d-date-table { position: absolute; left: 27%; right: 22%; bottom: 58px; height: 76px; background: #7c2d12; border-radius: 50% 50% 12px 12px; z-index: 15; box-shadow: 0 18px 26px rgba(0,0,0,.35); }
.sv2d-date-table::before { content: '🕯️'; position: absolute; left: 44%; top: -38px; font-size: 34px; animation: sv2d-candle 1.1s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-couple-a { left: 24%; bottom: 77px; transform: scale(.86); animation: sv2d-nod 1.7s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-couple-b { right: 21%; bottom: 77px; transform: scale(.86); animation: sv2d-nod 1.7s ease-in-out infinite reverse; animation-play-state: var(--play); }
.sv2d-dessert { position: absolute; left: 59%; bottom: 142px; z-index: 25; font-size: 38px; animation: sv2d-dessert-fall 3.5s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-spoon { position: absolute; left: 53%; bottom: 152px; z-index: 25; font-size: 30px; animation: sv2d-spin-fall 3.5s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-chef-door { position: absolute; left: 7%; bottom: 62px; width: 76px; height: 116px; background: #111827; border: 2px solid #475569; border-radius: 12px 12px 0 0; z-index: 10; }
.sv2d-chef-door::after { content: '👨‍🍳'; position: absolute; left: 18px; bottom: 12px; font-size: 38px; animation: sv2d-peek 3.5s ease-in-out infinite; animation-play-state: var(--play); }

/* B2: teklif */
.sv2d-proposal { background: radial-gradient(circle at 50% 34%, rgba(244,114,182,.34), transparent 30%), linear-gradient(180deg, #111827, #1e1b4b 70%, #020617); }
.sv2d-heart { position: absolute; color: #f472b6; z-index: 12; font-size: 24px; animation: sv2d-heart 3.4s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-heart.h1 { left: 16%; top: 112px; }.sv2d-heart.h2 { right: 17%; top: 96px; animation-delay: .8s; }.sv2d-heart.h3 { left: 50%; top: 62px; animation-delay: 1.3s; }
.sv2d-candle-row { position: absolute; left: 10%; right: 10%; bottom: 58px; display: flex; justify-content: space-between; z-index: 18; }
.sv2d-candle { font-size: 34px; animation: sv2d-candle 1s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-candle:nth-child(2n) { animation-delay: .25s; }
.sv2d-kneel { left: 32%; bottom: 54px; transform: rotate(-7deg); animation: sv2d-kneel 1.9s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-nina { right: 30%; bottom: 70px; animation: sv2d-nod 1.9s ease-in-out infinite reverse; animation-play-state: var(--play); }
.sv2d-ring { position: absolute; left: 48%; bottom: 132px; z-index: 28; font-size: 38px; animation: sv2d-ring 1.4s ease-in-out infinite; animation-play-state: var(--play); filter: drop-shadow(0 0 12px #fbbf24); }
.sv2d-guitar { position: absolute; left: 10%; bottom: 78px; z-index: 21; font-size: 42px; animation: sv2d-guitar 1.2s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-note { position: absolute; left: 17%; bottom: 142px; z-index: 22; font-size: 22px; color: #a78bfa; animation: sv2d-note 2.2s linear infinite; animation-play-state: var(--play); }
.sv2d-note.n2 { left: 22%; animation-delay: .6s; }.sv2d-note.n3 { left: 13%; animation-delay: 1.1s; }

/* C final: dijital */
.sv2d-digitalFinal { background: radial-gradient(circle at 70% 20%, rgba(250,204,21,.22), transparent 28%), linear-gradient(135deg, #020617, #172554 62%, #111827); }
.sv2d-screen { position: absolute; left: 8%; top: 70px; width: 180px; height: 136px; border-radius: 16px; background: #020617; border: 2px solid #38bdf8; z-index: 12; box-shadow: 0 0 30px rgba(56,189,248,.25); overflow: hidden; }
.sv2d-screen::before { content: 'Мужчина и жёлтый зонт: кто он?'; position: absolute; top: 12px; left: 12px; right: 12px; color: #fbbf24; font-size: 10px; font-weight: 950; line-height: 1.35; }
.sv2d-feed { position: absolute; left: 12px; right: 12px; bottom: -8px; display: grid; gap: 6px; animation: sv2d-feed 4s linear infinite; animation-play-state: var(--play); }
.sv2d-feed span { display: block; height: 16px; border-radius: 999px; background: #1e293b; color: #cbd5e1; font-size: 9px; padding: 3px 7px; }
.sv2d-big-umbrella { position: absolute; right: 14%; top: 82px; font-size: 82px; z-index: 16; animation: sv2d-umbrella-float 2.1s ease-in-out infinite; animation-play-state: var(--play); filter: drop-shadow(0 0 18px #facc15); }
.sv2d-cafe-final { position: absolute; right: 8%; bottom: 54px; width: 172px; height: 82px; border-radius: 16px 16px 0 0; background: #111827; border: 2px solid #334155; z-index: 12; }
.sv2d-cafe-final::before { content: 'ВОСТОК'; position: absolute; left: 18px; top: 12px; right: 18px; height: 24px; border-radius: 8px; background: #facc15; color: #111827; display: grid; place-items: center; font-size: 11px; font-weight: 950; }
.sv2d-marina-wait { right: 24%; bottom: 68px; transform: scale(.82); animation: sv2d-wait 2.2s ease-in-out infinite; animation-play-state: var(--play); }
.sv2d-comment { position: absolute; left: 33%; top: 95px; z-index: 18; border-radius: 999px; background: #0f172a; border: 1px solid #38bdf8; color: #dbeafe; padding: 7px 11px; font-size: 11px; font-weight: 900; animation: sv2d-comment 2.6s ease-in-out infinite; animation-play-state: var(--play); }

@keyframes sv2d-pan-light { 0%,100% { transform: translateX(-3%) scale(1.02); } 50% { transform: translateX(3%) scale(1.06); } }
@keyframes sv2d-human-idle { 0%,100% { translate: 0 0; } 50% { translate: 0 -5px; } }
@keyframes sv2d-human-talk { 0%,100% { translate: 0 -4px; transform: translateZ(32px) rotateX(0deg) scale(1.03); } 50% { translate: 0 -10px; transform: translateZ(44px) rotateX(0deg) scale(1.06); } }
@keyframes sv2d-bokeh { 0%,100% { opacity: .48; transform: translateX(0); } 50% { opacity: .85; transform: translateX(12px); } }
@keyframes sv2d-kenburns { 0% { transform: scale(1.05) translate3d(0,0,0); } 50% { transform: scale(1.13) translate3d(-1.6%, -1.1%, 0); } 100% { transform: scale(1.18) translate3d(1.3%, .6%, 0); } }
@keyframes sv2d-grain { 0% { transform: translate(0,0); } 50% { transform: translate(-1px,1px); } 100% { transform: translate(1px,-1px); } }
@keyframes sv2d-rec { 0%,100% { opacity: 1; } 50% { opacity: .28; } }
@keyframes sv2d-camera-breath { 0%,100% { transform: scale(1) translate3d(0,0,0); } 50% { transform: scale(1.025) translate3d(-.6%, -.8%, 20px); } }
@keyframes sv2d-cut { 0%, 88%, 100% { opacity: 0; } 89% { opacity: .18; } }
@keyframes sv2d-scan { to { transform: translateX(120%); } }
@keyframes sv2d-drift { to { background-position: 80px 50px; } }
@keyframes sv2d-pop { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.04); } }
@keyframes sv2d-leg { 0%,100% { transform: rotate(-9deg); } 50% { transform: rotate(12deg); } }
@keyframes sv2d-rain { to { background-position: 0 170px; } }
@keyframes sv2d-window { 0%,100% { opacity:.45; } 50% { opacity:.82; } }
@keyframes sv2d-umbrella-float { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-12px) rotate(4deg); } }
@keyframes sv2d-walk { 0%,100% { transform: translateX(-8px); } 50% { transform: translateX(18px); } }
@keyframes sv2d-steam { 0%,100% { transform: translateY(0); opacity: .95; } 50% { transform: translateY(-7px); opacity: .65; } }
@keyframes sv2d-glow { 0%,100% { filter: drop-shadow(0 0 3px #facc15); } 50% { filter: drop-shadow(0 0 16px #facc15); } }
@keyframes sv2d-flame { from { transform: scale(.86) translateY(0); filter: hue-rotate(0deg); } to { transform: scale(1.12) translateY(-4px); filter: hue-rotate(18deg); } }
@keyframes sv2d-chef-yell { 0%,100% { transform: translateX(0) rotate(0); } 40% { transform: translateX(6px) rotate(-4deg); } 65% { transform: translateX(-4px) rotate(4deg); } }
@keyframes sv2d-slip { 0%,100% { transform: translateX(0) rotate(0deg); } 48% { transform: translateX(-28px) rotate(-16deg); } 70% { transform: translateX(-12px) rotate(8deg); } }
@keyframes sv2d-tray { 0%,35%,100% { transform: rotate(0deg) translate(0,0); } 50% { transform: rotate(-28deg) translate(-12px,-12px); } 72% { transform: rotate(8deg) translate(8px,3px); } }
@keyframes sv2d-plate { 0%,35%,100% { transform: translate(0,0) rotate(0deg); opacity: 1; } 60% { transform: translate(-64px,82px) rotate(270deg); opacity: 1; } 78% { transform: translate(-78px,96px) rotate(350deg); opacity: .15; } }
@keyframes sv2d-splat { 0%,48% { transform: scale(0); opacity: 0; } 58%,84% { transform: scale(1); opacity: .9; } 100% { transform: scale(0); opacity: 0; } }
@keyframes sv2d-ticket { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(5deg); } }
@keyframes sv2d-sway { 0%,100% { transform: rotate(-2deg); } 50% { transform: rotate(3deg); } }
@keyframes sv2d-candle { 0%,100% { transform: scale(1); filter: drop-shadow(0 0 5px #fbbf24); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 15px #fbbf24); } }
@keyframes sv2d-nod { 0%,100% { transform: translateY(0) scale(.86); } 50% { transform: translateY(-6px) scale(.86); } }
@keyframes sv2d-dessert-fall { 0%,42%,100% { transform: translate(0,0) rotate(0deg); } 60% { transform: translate(24px,82px) rotate(35deg); } 74% { transform: translate(30px,90px) rotate(-18deg); } }
@keyframes sv2d-spin-fall { 0%,40%,100% { transform: translate(0,0) rotate(0deg); } 62% { transform: translate(-18px,82px) rotate(420deg); } 76% { transform: translate(-24px,90px) rotate(520deg); } }
@keyframes sv2d-peek { 0%,38%,100% { transform: translateX(-42px); } 58%,80% { transform: translateX(0); } }
@keyframes sv2d-heart { 0% { transform: translateY(28px) scale(.7); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(-68px) scale(1.3); opacity: 0; } }
@keyframes sv2d-kneel { 0%,100% { transform: rotate(-7deg) translateY(0); } 50% { transform: rotate(-12deg) translateY(6px); } }
@keyframes sv2d-ring { 0%,100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.22) rotate(8deg); } }
@keyframes sv2d-guitar { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
@keyframes sv2d-note { 0% { transform: translate(0,0); opacity: 0; } 20% { opacity: 1; } 100% { transform: translate(55px,-82px); opacity: 0; } }
@keyframes sv2d-feed { from { transform: translateY(64px); } to { transform: translateY(-76px); } }
@keyframes sv2d-wait { 0%,100% { transform: scale(.82) translateX(0); } 50% { transform: scale(.82) translateX(-8px); } }
@keyframes sv2d-comment { 0%,100% { transform: translateY(0) scale(1); opacity: .72; } 50% { transform: translateY(-9px) scale(1.04); opacity: 1; } }
@keyframes sv2d-blink { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(.12); } }
@keyframes sv2d-mouth { 0%,100% { height: 4px; transform: scaleX(.82); } 50% { height: 15px; transform: scaleX(1.15); border-radius: 999px; } }
@keyframes sv2d-wave { 0%,100% { transform: rotate(-22deg); } 50% { transform: rotate(-64deg) translateY(-5px); } }
@keyframes sv2d-bubble { 0%,100% { translate: 0 0; } 50% { translate: 0 -5px; } }
@keyframes sv2d-camera { 0%,100% { transform: translateX(0) rotate(-5deg); } 45% { transform: translateX(12px) rotate(5deg); } 70% { transform: translateX(4px) rotate(-2deg); } }
`;

const CinematicActor = ({ actor, side, talking, label }: { actor: ActorSpec; side: 'left' | 'right'; talking: boolean; label: string }) => (
  <div className={`sv2d-actor actor-${side} actor-${actor.kind} ${talking ? 'talking' : ''}`}>
    <div className="sv2d-actor-shadow" />
    <div className="sv2d-chef-hat" />
    <div className="sv2d-ear left" />
    <div className="sv2d-ear right" />
    <div className="sv2d-actor-neck" />
    <div className="sv2d-actor-body" />
    <div className="sv2d-arm left" />
    <div className="sv2d-arm right" />
    <div className="sv2d-hair" />
    <div className="sv2d-actor-face" />
    <div className="sv2d-brow l" />
    <div className="sv2d-brow r" />
    <div className="sv2d-eye l" />
    <div className="sv2d-eye r" />
    <div className="sv2d-nose" />
    <div className="sv2d-mouth" />
    <div className="sv2d-actor-label">{label}</div>
  </div>
);

const SceneArtwork = ({ scene }: { scene: StoryScene }) => {
  if (scene === 'umbrella') {
    return <div className="sv2d-rain" />;
  }
  if (scene === 'kitchen') {
    return <><div className="sv2d-film-depth" /><div className="sv2d-ticket">SERVICE</div></>;
  }
  if (scene === 'restaurant') {
    return <><div className="sv2d-lamp one" /><div className="sv2d-lamp two" /></>;
  }
  if (scene === 'proposal') {
    return <><div className="sv2d-film-depth" /><div className="sv2d-note">♪</div><div className="sv2d-note n2">♫</div></>;
  }
  return <><div className="sv2d-film-depth" /><div className="sv2d-comment">umbrella thread</div></>;
};

export default function StoryVideo2D({
  story,
  frameIndex = 0,
  playing = true,
  compact = false,
  onPrev,
  onNext,
  onToggle,
  onSpeakFrame,
}: StoryVideo2DProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);
  const scene = sceneForStory(story);
  const videoAsset = higgsfieldVideoAssetForStory(story.id);
  const safeFrame = Math.min(Math.max(0, frameIndex), Math.max(0, story.paragraphs.length - 1));
  const line = story.paragraphs[safeFrame] || story.paragraphs[0];
  const progress = Math.round(((safeFrame + 1) / Math.max(1, story.paragraphs.length)) * 100);
  const elapsedSeconds = Math.min(STORY_VIDEO_DURATION_SECONDS, Math.round((progress / 100) * STORY_VIDEO_DURATION_SECONDS));
  const shot = safeFrame % 4;
  const cast = castForScene(scene);
  const activeSide = speakerSide(line?.speaker || '', scene);
  const styleVars = {
    '--accent': story.color,
    '--play': playing ? 'running' : 'paused',
  } as React.CSSProperties;

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    setVideoMissing(false);
  }, [story.id]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || videoMissing) return;
    const target = (safeFrame / Math.max(1, story.paragraphs.length)) * STORY_VIDEO_DURATION_SECONDS;
    if (!playing && Math.abs(v.currentTime - target) > 1.25) v.currentTime = target;
    if (playing) {
      v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  }, [playing, safeFrame, story.paragraphs.length, videoMissing]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || videoMissing || playing) return;
    const target = (safeFrame / Math.max(1, story.paragraphs.length)) * STORY_VIDEO_DURATION_SECONDS;
    try { v.currentTime = target; } catch { /* ignore */ }
  }, [safeFrame, story.paragraphs.length, videoMissing, playing]);

  const toggleFullscreen = async () => {
    const el = rootRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> | void });
    const doc = document as Document & { webkitExitFullscreen?: () => Promise<void> | void };
    if (!el) return;
    try {
      if (document.fullscreenElement === el) {
        await (document.exitFullscreen?.() || doc.webkitExitFullscreen?.());
      } else {
        await (el.requestFullscreen?.() || el.webkitRequestFullscreen?.());
      }
    } catch {
      // Fullscreen bazı gömülü önizlemelerde engellenebilir; uygulama yine normal oynatır.
    }
  };

  return (
    <div ref={rootRef} className={`story-video-2d ${compact ? 'compact' : ''} ${playing ? '' : 'paused'}`} style={styleVars}>
      <style>{css}</style>
      <div className={`sv2d-stage sv2d-${scene} shot-${shot}`}>
        {!videoMissing ? (
          <>
            <video
              ref={videoRef}
              className="sv2d-real-video"
              src={videoAsset.src}
              playsInline
              preload="metadata"
              onError={() => setVideoMissing(true)}
              onEnded={() => { if (videoRef.current) videoRef.current.currentTime = STORY_VIDEO_DURATION_SECONDS; }}
            >
              <track kind="subtitles" src={videoAsset.track} srcLang="ru" label="Rusça" default />
            </video>
            <div className="sv2d-video-overlay" />
          </>
        ) : (
          <div className={`sv2d-generated-video sv2d-generated-${scene}`}>
            <div className="sv2d-generated-bokeh" />
            <SceneArtwork scene={scene} />
            <div className="sv2d-dialogue-cast">
              <CinematicActor actor={cast.left} side="left" talking={activeSide === 'left' || activeSide === 'narrator'} label={activeSide === 'left' ? (line?.speaker || cast.left.label) : cast.left.label} />
              <CinematicActor actor={cast.right} side="right" talking={activeSide === 'right'} label={activeSide === 'right' ? (line?.speaker || cast.right.label) : cast.right.label} />
            </div>
            <div className="sv2d-generated-tag">Higgsfield MP4 bulunana kadar hareketli HD sahne önizlemesi</div>
          </div>
        )}
        <div className="sv2d-set"><SceneArtwork scene={scene} /></div>
        <div className="sv2d-floor" />
        <div className="sv2d-vignette" />
        <div className="sv2d-film-grain" />
        <div className="sv2d-cut-flash" />
        <div className="sv2d-letterbox top" />
        <div className="sv2d-letterbox bottom" />
        <div className={`sv2d-film-focus ${activeSide}`}><span className="sv2d-rec" /> {activeSide === 'right' ? cast.right.label : activeSide === 'left' ? cast.left.label : 'Anlatıcı'}</div>
        <div className="sv2d-subtitles"><b>{line?.speaker}:</b> {line?.ru}</div>
        <div className="sv2d-camera-rig" title="Sinematik kamera hareketi" />
        <div className="sv2d-head">
          <div>
            <div className="sv2d-label">SİNEMATİK 2.5D/3D DİZİ SAHNESİ · {sceneName[scene]}</div>
            <div className="sv2d-title">{story.icon} {story.titleTr}</div>
            <div className="sv2d-sub">{story.levelId || 'Hikaye'} final videosu · 30-40 sn · Sahne {safeFrame + 1}/{story.paragraphs.length}</div>
          </div>
          <div className="sv2d-badge">{playing ? '▶️' : '⏸️'}</div>
        </div>

        <div className="sv2d-caption">
          <div className="sv2d-speaker">{line?.speaker}</div>
          <div className="sv2d-ru">{line?.ru}</div>
          <div className="sv2d-reading">/{line?.reading}/</div>
        </div>
        <div className="sv2d-watermark">{videoMissing ? 'hareketli HD sahne önizlemesi' : 'Higgsfield HD video'}</div>
      </div>

      {!compact && (
        <div className="sv2d-controls">
          <button className="sv2d-btn" onClick={onPrev}>← Önceki</button>
          <button className="sv2d-btn primary" onClick={onToggle}>{playing ? '⏸️ Duraklat' : '▶️ Oynat'}</button>
          <button className="sv2d-btn" onClick={onNext}>Sonraki →</button>
          <button className="sv2d-btn" onClick={onSpeakFrame}>🔊 Sahneyi Dinle</button>
          <button className="sv2d-btn" onClick={toggleFullscreen}>{isFullscreen ? '🗗 Tam ekrandan çık' : '⛶ Tam ekran'}</button>
          <span className="sv2d-time">0:{String(elapsedSeconds).padStart(2, '0')} / 0:{STORY_VIDEO_DURATION_SECONDS}</span>
          <div className="sv2d-progress"><div style={{ width: `${progress}%` }} /></div>
        </div>
      )}
    </div>
  );
}
