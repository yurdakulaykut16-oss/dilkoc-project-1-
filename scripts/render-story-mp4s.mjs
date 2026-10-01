import fs from 'node:fs';
import path from 'node:path';
import HME from 'h264-mp4-encoder';

const OUT_DIR = path.resolve('public/story-videos');
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 960;
const H = 540;
const FPS = 8;
const DURATION = 38;
const FRAMES = FPS * DURATION;

const stories = [
  { slug: 'higgsfield-a1-yellow-umbrella', scene: 'umbrella', accent: [250, 204, 21], title: 'A1 Sarı Şemsiye' },
  { slug: 'higgsfield-a2-new-waiter', scene: 'kitchen', accent: [239, 68, 68], title: 'A2 Yeni Garson' },
  { slug: 'higgsfield-b1-van-gogh-dinner', scene: 'restaurant', accent: [232, 121, 249], title: 'B1 Van Gogh Akşam Yemeği' },
  { slug: 'higgsfield-b2-chef-evening', scene: 'proposal', accent: [244, 114, 182], title: 'B2 Şefin Akşamı' },
  { slug: 'higgsfield-c-final-real-story', scene: 'finale', accent: [234, 179, 8], title: 'C1/C2 Gerçek Hikaye' },
];

const clamp = (v, a = 0, b = 255) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);

function put(buf, x, y, r, g, b, a = 255) {
  x |= 0; y |= 0;
  if (x < 0 || y < 0 || x >= W || y >= H || a <= 0) return;
  const i = (y * W + x) * 4;
  if (a >= 255) { buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255; return; }
  const inv = 255 - a;
  buf[i] = (r * a + buf[i] * inv) >> 8;
  buf[i + 1] = (g * a + buf[i + 1] * inv) >> 8;
  buf[i + 2] = (b * a + buf[i + 2] * inv) >> 8;
  buf[i + 3] = 255;
}

function rect(buf, x, y, w, h, color, a = 255) {
  const x0 = Math.max(0, x | 0), y0 = Math.max(0, y | 0), x1 = Math.min(W, (x + w) | 0), y1 = Math.min(H, (y + h) | 0);
  for (let yy = y0; yy < y1; yy++) for (let xx = x0; xx < x1; xx++) put(buf, xx, yy, color[0], color[1], color[2], a);
}

function ellipse(buf, cx, cy, rx, ry, color, a = 255) {
  const x0 = Math.max(0, Math.floor(cx - rx)), x1 = Math.min(W - 1, Math.ceil(cx + rx));
  const y0 = Math.max(0, Math.floor(cy - ry)), y1 = Math.min(H - 1, Math.ceil(cy + ry));
  const rr = rx * rx, ss = ry * ry;
  for (let y = y0; y <= y1; y++) {
    const dy = y - cy;
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx;
      if ((dx * dx) / rr + (dy * dy) / ss <= 1) put(buf, x, y, color[0], color[1], color[2], a);
    }
  }
}

function line(buf, x0, y0, x1, y1, color, a = 255, thick = 1) {
  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy, x = x0 | 0, y = y0 | 0;
  while (true) {
    for (let yy = -thick; yy <= thick; yy++) for (let xx = -thick; xx <= thick; xx++) put(buf, x + xx, y + yy, color[0], color[1], color[2], a);
    if (x === (x1 | 0) && y === (y1 | 0)) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx) { err += dx; y += sy; }
  }
}

function poly(buf, pts, color, a = 255) {
  let minY = H, maxY = 0;
  for (const [, y] of pts) { minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
  minY = Math.max(0, Math.floor(minY)); maxY = Math.min(H - 1, Math.ceil(maxY));
  for (let y = minY; y <= maxY; y++) {
    const xs = [];
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > y) !== (yj > y)) xs.push(xi + (y - yi) * (xj - xi) / (yj - yi));
    }
    xs.sort((a, b) => a - b);
    for (let k = 0; k < xs.length; k += 2) {
      const x0 = Math.max(0, Math.floor(xs[k]));
      const x1 = Math.min(W - 1, Math.ceil(xs[k + 1]));
      for (let x = x0; x <= x1; x++) put(buf, x, y, color[0], color[1], color[2], a);
    }
  }
}

function fillBackground(buf, story, t) {
  const palettes = {
    umbrella: [[11, 31, 58], [9, 16, 31], [42, 56, 75]],
    kitchen: [[42, 32, 25], [8, 13, 26], [120, 72, 38]],
    restaurant: [[45, 12, 78], [10, 14, 26], [112, 55, 22]],
    proposal: [[30, 28, 75], [7, 11, 23], [125, 42, 80]],
    finale: [[12, 22, 47], [7, 10, 20], [70, 54, 28]],
  }[story.scene];
  const pan = Math.sin(t * Math.PI * 2) * 0.03;
  for (let y = 0; y < H; y++) {
    const v = y / H;
    for (let x = 0; x < W; x++) {
      const u = x / W + pan;
      const glow = Math.max(0, 1 - Math.hypot(u - 0.62, v - 0.28) * 2.2);
      const r = lerp(palettes[0][0], palettes[1][0], v) + glow * palettes[2][0] * 0.7;
      const g = lerp(palettes[0][1], palettes[1][1], v) + glow * palettes[2][1] * 0.7;
      const b = lerp(palettes[0][2], palettes[1][2], v) + glow * palettes[2][2] * 0.7;
      const i = (y * W + x) * 4;
      buf[i] = clamp(r); buf[i + 1] = clamp(g); buf[i + 2] = clamp(b); buf[i + 3] = 255;
    }
  }
}

function bokeh(buf, t, accent) {
  for (let i = 0; i < 18; i++) {
    const x = ((i * 139 + t * 180 * (i % 3 + 1)) % W);
    const y = 40 + ((i * 71 + Math.sin(t * 8 + i) * 35) % (H * 0.56));
    const r = 4 + (i % 5) * 3;
    ellipse(buf, x, y, r, r, accent, 28 + (i % 3) * 18);
  }
}

function drawPerson(buf, cx, cy, s, kind, talking, phase) {
  const skin = kind === 'chef' ? [224, 181, 148] : [236, 190, 154];
  const hair = kind === 'marina' || kind === 'nina' ? [44, 29, 23] : [25, 20, 18];
  const suit = {
    dima: [29, 78, 216], marina: [14, 116, 144], chef: [235, 240, 245], waiter: [18, 24, 35], nina: [54, 65, 84], child: [80, 90, 120],
  }[kind] || [45, 55, 75];
  const bob = Math.sin(phase * 2 * Math.PI) * 4 * s;
  cy += bob;
  ellipse(buf, cx, cy + 126 * s, 44 * s, 14 * s, [0, 0, 0], 80);
  // body
  poly(buf, [[cx - 42*s, cy + 62*s], [cx + 42*s, cy + 62*s], [cx + 58*s, cy + 145*s], [cx - 58*s, cy + 145*s]], suit, 250);
  rect(buf, cx - 8*s, cy + 62*s, 16*s, 66*s, kind === 'chef' ? [40, 48, 60] : [240, 245, 248], 230);
  // arms
  const wave = talking ? Math.sin(phase * 20) * 16 : Math.sin(phase * 5) * 5;
  line(buf, cx - 43*s, cy + 78*s, cx - 78*s, cy + (102 + wave)*s, skin, 240, Math.max(2, Math.floor(5*s)));
  line(buf, cx + 43*s, cy + 78*s, cx + 82*s, cy + (100 - wave)*s, skin, 240, Math.max(2, Math.floor(5*s)));
  // neck and head
  rect(buf, cx - 11*s, cy + 47*s, 22*s, 22*s, skin, 255);
  ellipse(buf, cx, cy + 28*s, 30*s, 36*s, skin, 255);
  ellipse(buf, cx - 21*s, cy + 30*s, 6*s, 11*s, skin, 220); ellipse(buf, cx + 21*s, cy + 30*s, 6*s, 11*s, skin, 220);
  if (kind === 'chef') {
    ellipse(buf, cx, cy - 8*s, 44*s, 18*s, [250, 250, 250], 255);
    rect(buf, cx - 34*s, cy + 2*s, 68*s, 15*s, [245, 245, 245], 255);
  } else {
    ellipse(buf, cx, cy + 2*s, 34*s, 17*s, hair, 255);
    if (kind === 'marina' || kind === 'nina') ellipse(buf, cx, cy + 25*s, 38*s, 45*s, hair, 130);
  }
  // eyes and mouth
  ellipse(buf, cx - 10*s, cy + 27*s, 3*s, 3*s, [5, 10, 18], 255);
  ellipse(buf, cx + 10*s, cy + 27*s, 3*s, 3*s, [5, 10, 18], 255);
  const mh = talking ? (4 + Math.abs(Math.sin(phase * 42)) * 10) : 3;
  ellipse(buf, cx, cy + 45*s, 10*s, mh*s, [95, 22, 24], 240);
}

function drawSet(buf, story, t, frame) {
  const cam = Math.sin(t * Math.PI * 2) * 22;
  const accent = story.accent;
  // letterbox/cinematic shadows
  rect(buf, 0, 0, W, 34, [0, 0, 0], 210); rect(buf, 0, H - 34, W, 34, [0, 0, 0], 210);
  bokeh(buf, t, accent);
  if (story.scene === 'umbrella') {
    // street/cafe
    for (let i = 0; i < 7; i++) rect(buf, 30 + i * 120 + cam * .2, 150 - i * 10, 80, 210, [35, 45, 58], 180);
    rect(buf, 620 + cam*.4, 120, 270, 260, [55, 30, 24], 230);
    for (let i = 0; i < 6; i++) { rect(buf, 645 + (i%3)*75 + cam*.4, 160 + Math.floor(i/3)*72, 46, 44, [255, 190, 89], 190); }
    // rain
    for (let i = 0; i < 120; i++) {
      const x = (i * 71 + frame * 17) % W;
      const y = (i * 47 + frame * 29) % H;
      line(buf, x, y, x - 9, y + 28, [170, 200, 230], 70, 1);
    }
    drawPerson(buf, 430 + cam*.15, 250, 1.25, 'dima', true, t);
    // yellow umbrella
    ellipse(buf, 430 + cam*.15, 228, 94, 30, [250, 204, 21], 255);
    line(buf, 430 + cam*.15, 230, 430 + cam*.15, 310, [240, 240, 240], 210, 2);
  } else if (story.scene === 'kitchen') {
    rect(buf, 0, 330, W, 120, [70, 72, 72], 210);
    for (let i=0;i<10;i++) rect(buf, i*100+cam*.1, 80, 65, 45, [180,180,160], 70);
    ellipse(buf, 480, 318, 70, 22, [230, 230, 225], 220);
    ellipse(buf, 470 + Math.sin(t*12)*20, 300 + Math.sin(t*8)*12, 28, 12, [190, 30, 20], 160);
    ellipse(buf, 460, 250, 24, 56, [250, 120, 25], 150);
    drawPerson(buf, 270 + cam*.15, 215, 1.2, 'chef', true, t);
    drawPerson(buf, 675 - cam*.12, 230, 1.16, 'waiter', Math.sin(t*14)>0, t+.2);
    rect(buf, 625 - cam*.12, 310 + Math.sin(t*16)*12, 120, 12, [210,210,215], 240);
  } else if (story.scene === 'restaurant') {
    for (let i=0;i<4;i++) ellipse(buf, 180+i*190, 90, 32, 22, [255, 200, 95], 140);
    ellipse(buf, 505, 345, 210, 62, [92, 43, 22], 230);
    ellipse(buf, 505, 315, 180, 34, [150, 70, 38], 245);
    rect(buf, 496, 220, 8, 70, [245, 210, 115], 180); ellipse(buf, 500, 214, 16, 25, [255, 210, 70], 120);
    drawPerson(buf, 365 + cam*.08, 228, 1.05, 'dima', Math.sin(t*10)>0, t);
    drawPerson(buf, 620 - cam*.08, 228, 1.05, 'marina', Math.sin(t*10)<0, t+.4);
    // falling dessert
    const fall = Math.abs(Math.sin(t * Math.PI * 2));
    ellipse(buf, 735, 225 + fall*90, 32, 18, [238, 220, 190], 230);
  } else if (story.scene === 'proposal') {
    for (let i=0;i<12;i++) { ellipse(buf, 80+i*72, 380 + Math.sin(t*8+i)*8, 10, 26, [255, 210, 80], 130); }
    for (let i=0;i<8;i++) ellipse(buf, 120+i*100, 180 + Math.sin(t*5+i)*30, 12, 12, [240, 90, 135], 120);
    drawPerson(buf, 390 + cam*.08, 240, 1.05, 'chef', true, t);
    drawPerson(buf, 585 - cam*.08, 220, 1.08, 'nina', Math.sin(t*12)<0, t+.35);
    ellipse(buf, 492, 300 + Math.sin(t*20)*4, 18, 18, [255, 230, 70], 220);
    ellipse(buf, 492, 300 + Math.sin(t*20)*4, 10, 10, [20,20,40], 255);
  } else {
    rect(buf, 145, 170, 280, 165, [20, 25, 36], 240);
    rect(buf, 168, 192, 235, 118, [25, 65, 110], 210);
    for(let i=0;i<5;i++) rect(buf, 185, 208+i*20 + (frame%20), 170, 9, [70, 150, 230], 110);
    drawPerson(buf, 560 + cam*.08, 220, 1.05, 'dima', true, t);
    drawPerson(buf, 700 - cam*.08, 235, .82, 'child', Math.sin(t*9)>0, t+.1);
    drawPerson(buf, 780 - cam*.05, 238, .82, 'child', Math.sin(t*9)<0, t+.4);
    ellipse(buf, 455, 365, 86, 28, [250,204,21], 230); line(buf,455,365,455,445,[230,230,230],220,2);
  }
}

async function renderStory(story) {
  const encoder = await HME.createH264MP4Encoder();
  encoder.width = W; encoder.height = H; encoder.frameRate = FPS; encoder.speed = 10; encoder.quantizationParameter = 30; encoder.groupOfPictures = 24;
  encoder.outputFilename = `${story.slug}.mp4`;
  encoder.initialize();
  const buf = new Uint8Array(W * H * 4);
  for (let f = 0; f < FRAMES; f++) {
    const t = f / (FRAMES - 1);
    fillBackground(buf, story, t);
    drawSet(buf, story, t, f);
    // subtle film grain
    for (let i = 0; i < W * H; i += 31) {
      const j = i * 4;
      const n = ((i * 13 + f * 17) % 17) - 8;
      buf[j] = clamp(buf[j] + n); buf[j+1] = clamp(buf[j+1] + n); buf[j+2] = clamp(buf[j+2] + n);
    }
    encoder.addFrameRgba(buf);
    if (f % 80 === 0) process.stdout.write(`${story.slug}: ${Math.round(t*100)}%\n`);
  }
  encoder.finalize();
  const mp4 = encoder.FS.readFile(encoder.outputFilename);
  const out = path.join(OUT_DIR, `${story.slug}.mp4`);
  fs.writeFileSync(out, mp4);
  encoder.delete();
  console.log(`Wrote ${out} (${(mp4.length/1024/1024).toFixed(2)} MB)`);
}

for (const story of stories) await renderStory(story);
