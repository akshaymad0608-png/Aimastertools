/**
 * Generates one original illustrated cover per blog post as an SVG in
 * public/blog-covers/. Run: node scripts/gen-blog-covers.mjs
 *
 * No stock photos and nothing fetched: every shape is drawn here, so there is
 * no licence to track and nothing to 404. Each cover carries its own
 * background, so it reads the same in the light and dark themes. Keep the
 * subject inside the centre of the 1200x675 frame: cards crop to 16:10 and
 * the component overlays a label at the bottom-left and a tile at the top-left.
 */
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = 'public/blog-covers';
mkdirSync(OUT, { recursive: true });

const P = '#b02a63'; // brand crimson
const PD = '#7d1c46';
const PL = '#f6dce8';
const PM = '#dd8fb0';
const INK = '#1c1b22';
const G1 = '#ffffff';
const G2 = '#eceaf1';
const G3 = '#c9c6d4';
const G4 = '#8e8a9c';

const r = (x, y, w, h, rx, fill, stroke = 'none', sw = 0, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
const c = (x, y, rad, fill, stroke = 'none', sw = 0, extra = '') =>
  `<circle cx="${x}" cy="${y}" r="${rad}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
const l = (x1, y1, x2, y2, stroke, sw, extra = '') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" ${extra}/>`;
const p = (d, fill, stroke = 'none', sw = 0, extra = '') =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const t = (x, y, s, size, fill, weight = 700, anchor = 'middle', family = 'Inter,Arial,Helvetica,sans-serif') =>
  `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${s}</text>`;
const mono = (x, y, s, size, fill, anchor = 'middle') => t(x, y, s, size, fill, 700, anchor, 'Menlo,Consolas,monospace');

// A white card with a soft offset shadow.
const card = (x, y, w, h, rx = 22) =>
  r(x + 6, y + 10, w, h, rx, INK, 'none', 0, 'opacity="0.08"') + r(x, y, w, h, rx, G1, G3, 3);

const lines = (x, y, n, w, gap = 22, color = G2, sw = 9) =>
  Array.from({ length: n }, (_, i) => l(x, y + i * gap, x + (i % 3 === 2 ? w * 0.6 : w), y + i * gap, color, sw)).join('');

const check = (x, y, col = P, s = 1) =>
  p(`M${x - 9 * s} ${y} L${x - 2 * s} ${y + 8 * s} L${x + 10 * s} ${y - 9 * s}`, 'none', col, 5 * s);

const sparkle = (x, y, s, col = P) =>
  p(`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z`, col);

const arrow = (x1, y1, x2, y2, col = P, sw = 6) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 16;
  const ax = (k) => x2 - h * Math.cos(a + k);
  const ay = (k) => y2 - h * Math.sin(a + k);
  return l(x1, y1, x2, y2, col, sw) + p(`M${ax(0.5)} ${ay(0.5)} L${x2} ${y2} L${ax(-0.5)} ${ay(-0.5)}`, 'none', col, sw);
};

const shieldPath = 'M600 118 L790 188 V332 C790 450 708 530 600 580 C492 530 410 450 410 332 V188 Z';

const motifs = {
  injection: () =>
    // hostile document -> shield that blocks it
    card(150, 230, 250, 215) +
    lines(180, 275, 5, 190) +
    r(176, 322, 198, 24, 8, PL) +
    l(184, 334, 300, 334, P, 7) +
    c(352, 334, 11, P) + t(352, 340, '!', 17, G1, 800) +
    arrow(415, 340, 470, 340, G4, 6) +
    p(shieldPath, G1, P, 9, 'transform="translate(110 -20)"') +
    `<g transform="translate(110 -20)">` +
    c(600, 340, 52, PL) + p('M600 318 V352', 'none', P, 11) + c(600, 376, 7, P) +
    `</g>` +
    sparkle(1010, 170, 26, PM) + sparkle(930, 560, 16, PM),
  privacy: () =>
    p(shieldPath, G1, P, 9) +
    r(540, 330, 120, 96, 16, P) +
    p('M562 330 V302 A38 38 0 0 1 638 302 V330', 'none', P, 12) +
    c(600, 374, 13, G1) + r(595, 378, 10, 28, 5, G1) +
    sparkle(250, 200, 26, PM) + sparkle(960, 520, 20, PM) + sparkle(900, 170, 14, PL),
  server: () => {
    const rack = (y, on) =>
      r(400, y, 400, 92, 20, G1, G3, 3) +
      c(445, y + 46, 11, on ? P : G3) + c(480, y + 46, 11, G3) +
      l(540, y + 34, 740, y + 34, G2, 9) + l(540, y + 58, 690, y + 58, G2, 9);
    return (
      r(406, 128 + 10, 400, 92, 20, INK, 'none', 0, 'opacity="0.08"') +
      rack(128, true) + rack(238, true) + rack(348, false) +
      r(400, 458, 400, 70, 20, PL, P, 3) + mono(600, 502, 'docker compose up -d', 25, P) +
      sparkle(980, 190, 24, PM) + sparkle(210, 500, 18, PM)
    );
  },
  cloudlost: () => {
    const cloud = (x, y) =>
      `<g transform="translate(${x} ${y})" fill="${G1}" stroke="${G3}" stroke-width="5" stroke-dasharray="14 12">` +
      c(0, 0, 55, G1, G3, 5, 'stroke-dasharray="14 12"') + c(80, -22, 70, G1, G3, 5, 'stroke-dasharray="14 12"') +
      c(165, 4, 52, G1, G3, 5, 'stroke-dasharray="14 12"') + `</g>`;
    return (
      cloud(260, 300) +
      p('M300 330 L380 410', 'none', P, 14) + p('M380 330 L300 410', 'none', P, 14) +
      arrow(520, 340, 640, 340, G4, 7) +
      card(660, 190, 300, 300) +
      p('M700 250 h90 l16 22 h134 v178 h-240z', PL, P, 5) +
      mono(810, 370, 'git', 38, P) + lines(710, 410, 2, 180, 20, G3, 8) +
      t(810, 540, 'workflows live in files', 24, G4, 600)
    );
  },
  varsenv: () =>
    card(180, 190, 340, 300) + mono(350, 250, '$vars', 38, P) +
    r(215, 285, 270, 16, 8, G2) + r(215, 285, 120, 16, 8, PM) + c(335, 293, 15, P) +
    r(215, 335, 270, 16, 8, G2) + r(215, 335, 190, 16, 8, PM) + c(405, 343, 15, P) +
    r(215, 385, 270, 16, 8, G2) + r(215, 385, 70, 16, 8, PM) + c(285, 393, 15, P) +
    t(350, 450, 'resolves on Cloud', 22, G4, 600) +
    card(680, 190, 340, 300) + mono(850, 250, '$env', 38, INK) +
    mono(715, 305, 'SHEET_ID=…', 24, G4, 'start') + mono(715, 345, 'MODEL=…', 24, G4, 'start') + mono(715, 385, 'CHAT_ID=…', 24, G4, 'start') +
    t(850, 450, 'resolves self-hosted', 22, G4, 600) +
    arrow(540, 310, 660, 310, P, 6) + arrow(660, 380, 540, 380, P, 6),
  phone: () =>
    c(250, 340, 62, PL, P, 5) + sparkle(250, 340, 38) + t(250, 440, 'drafts', 24, G4, 600) +
    arrow(330, 340, 450, 340, G4, 7) +
    r(470, 90, 260, 500, 44, INK) + r(488, 130, 224, 420, 22, G1) +
    r(510, 160, 170, 74, 18, G2) + lines(526, 184, 2, 130, 24, G3, 9) +
    r(510, 256, 124, 56, 16, PL) + lines(526, 276, 1, 90, 20, PM, 9) +
    r(506, 456, 90, 58, 29, P) + check(551, 486, G1) +
    r(612, 456, 90, 58, 29, G1, G3, 4) + p('M644 476 L670 496 M670 476 L644 496', 'none', G4, 6) +
    c(850, 340, 62, G1, G3, 5) + p('M820 340 L840 362 L882 316', 'none', P, 11) + t(850, 440, 'you approve', 24, G4, 600) +
    arrow(750, 340, 770, 340, G4, 7),
  coins: () => {
    const stack = (x, n, base) =>
      Array.from({ length: n }, (_, i) => {
        const y = base - i * 34;
        return `<ellipse cx="${x}" cy="${y + 22}" rx="104" ry="32" fill="${PL}" stroke="${P}" stroke-width="5"/>` +
          `<rect x="${x - 104}" y="${y - 8}" width="208" height="30" fill="${PL}" stroke="none"/>` +
          l(x - 104, y - 8, x - 104, y + 22, P, 5) + l(x + 104, y - 8, x + 104, y + 22, P, 5) +
          `<ellipse cx="${x}" cy="${y - 8}" rx="104" ry="32" fill="${G1}" stroke="${P}" stroke-width="5"/>`;
      }).join('');
    return stack(470, 5, 470) + stack(740, 3, 470) +
      t(470, 342, '$', 46, P, 800) +
      p('M890 250 L930 210 L960 235 L1010 175', 'none', G3, 8) + sparkle(205, 220, 24, PM);
  },
  shop: () =>
    // bag + chat + vector store
    p('M190 270 h210 l14 250 h-238z', PL, P, 6) +
    p('M240 270 V240 A55 55 0 0 1 350 240 V270', 'none', P, 9) + c(250, 330, 7, P) + c(340, 330, 7, P) +
    p('M285 380 q20 30 40 0', 'none', P, 7) +
    r(500, 150, 330, 110, 28, G1, G3, 4) + lines(535, 190, 2, 250, 26, G3, 10) +
    r(600, 292, 330, 100, 28, P) + lines(635, 330, 2, 240, 26, G1, 10) +
    `<g transform="translate(880 420)">` +
    `<ellipse cx="90" cy="110" rx="84" ry="24" fill="${PL}" stroke="${P}" stroke-width="5"/>` +
    `<rect x="6" y="40" width="168" height="70" fill="${PL}"/>` + l(6, 40, 6, 110, P, 5) + l(174, 40, 174, 110, P, 5) +
    `<ellipse cx="90" cy="70" rx="84" ry="24" fill="${PL}" stroke="${P}" stroke-width="5"/>` +
    `<ellipse cx="90" cy="40" rx="84" ry="24" fill="${G1}" stroke="${P}" stroke-width="5"/>` +
    `</g>` + sparkle(520, 480, 20, PM),
  bi: () =>
    card(250, 130, 700, 400) +
    r(285, 165, 150, 54, 14, PL) + t(360, 202, '₹ 12.4L', 28, P, 800) + r(455, 165, 150, 54, 14, G2) + t(530, 202, '+8.2%', 28, INK, 800) +
    [0, 1, 2, 3, 4, 5].map((i) => r(300 + i * 62, 470 - [90, 140, 110, 190, 160, 230][i], 40, [90, 140, 110, 190, 160, 230][i], 8, i === 5 ? P : PM)).join('') +
    p('M680 400 L730 350 L780 372 L830 300 L890 250', 'none', INK, 7) +
    c(890, 250, 11, P) + l(300, 470, 680, 470, G3, 5) + sparkle(1020, 170, 22, PM),
  calendar: () =>
    card(230, 130, 540, 410) + r(230, 130, 540, 78, 22, P) +
    Array.from({ length: 15 }, (_, i) => {
      const x = 275 + (i % 5) * 92, y = 245 + Math.floor(i / 5) * 90;
      const miss = i === 8;
      return miss
        ? r(x - 6, y - 6, 66, 66, 16, 'none', P, 5, 'stroke-dasharray="10 8"')
        : r(x, y, 54, 54, 14, i % 4 === 0 ? PL : G2) + (i % 4 === 0 ? check(x + 27, y + 28, P, 0.9) : '');
    }).join('') +
    // bell with a slash
    p('M900 300 a62 62 0 0 1 124 0 v78 l26 38 h-176 l26 -38z', G1, INK, 7) + c(962, 442, 17, INK) +
    l(880, 250, 1046, 470, P, 12) + sparkle(940, 190, 18, PM),
  linkedin: () =>
    card(170, 180, 860, 340) +
    [0, 1, 2].map((i) => {
      const x = 290 + i * 230;
      return c(x, 340, 44, i === 1 ? PL : G2, i === 1 ? P : G3, 4) +
        p(`M${x - 64} 470 a64 64 0 0 1 128 0`, i === 1 ? PL : G2, i === 1 ? P : G3, 4) +
        lines(x - 55, 495, 1, 110, 12, G3, 9);
    }).join('') +
    r(690, 205, 280, 52, 26, G2) + c(742, 231, 19, G1, G3, 3) + t(868, 240, 'auto: OFF', 24, G4, 700) +
    p('M920 300 L980 400 H860Z', P, 'none', 0) + t(920, 383, '!', 46, G1, 800) + sparkle(1000, 160, 18, PM),
  compare: () =>
    [0, 1, 2].map((i) => {
      const x = 215 + i * 270, mid = i === 1;
      return (mid ? r(x + 6, 162, 250, 380, 26, INK, 'none', 0, 'opacity="0.1"') : '') +
        r(x, mid ? 130 : 160, 250, mid ? 380 : 340, 26, mid ? P : G1, mid ? P : G3, 4) +
        r(x + 30, (mid ? 130 : 160) + 28, 120, 22, 11, mid ? 'rgba(255,255,255,.55)' : G2) +
        [0, 1, 2, 3].map((k) =>
          c(x + 46, (mid ? 130 : 160) + 100 + k * 58, 17, mid ? G1 : PL) +
          check(x + 46, (mid ? 130 : 160) + 100 + k * 58, mid ? P : P, 0.62) +
          l(x + 82, (mid ? 130 : 160) + 100 + k * 58, x + 214 - (k % 2) * 40, (mid ? 130 : 160) + 100 + k * 58, mid ? 'rgba(255,255,255,.6)' : G2, 10)).join('');
    }).join('') + sparkle(1060, 150, 22, PM),
  checklist: () =>
    r(436, 100, 328, 470, 28, INK, 'none', 0, 'opacity="0.08"') + card(420, 90, 328, 470) + r(520, 70, 128, 50, 16, P) +
    [0, 1, 2, 3, 4].map((i) =>
      r(458, 160 + i * 74, 46, 46, 12, i < 3 ? P : G1, i < 3 ? P : G3, 4) + (i < 3 ? check(481, 184 + i * 74, G1, 0.85) : '') +
      l(526, 183 + i * 74, 690 - (i % 2) * 50, 183 + i * 74, i < 3 ? G3 : G2, 11)).join('') +
    p('M858 250 A104 104 0 1 0 858 252', 'none', 'none', 0) + sparkle(190, 220, 26, PM) + sparkle(1010, 480, 18, PM),
  choose: () =>
    r(306, 100, 328, 470, 28, INK, 'none', 0, 'opacity="0.08"') + card(290, 90, 328, 470) + r(390, 70, 128, 50, 16, P) +
    [0, 1, 2, 3, 4].map((i) =>
      r(328, 160 + i * 74, 46, 46, 12, i < 3 ? P : G1, i < 3 ? P : G3, 4) + (i < 3 ? check(351, 184 + i * 74, G1, 0.85) : '') +
      l(396, 183 + i * 74, 560 - (i % 2) * 50, 183 + i * 74, i < 3 ? G3 : G2, 11)).join('') +
    c(820, 320, 96, 'rgba(246,220,232,.55)', P, 14) + l(888, 388, 970, 470, P, 20) +
    sparkle(820, 320, 44, P) + sparkle(1010, 170, 20, PM),
  chip: () =>
    [0, 1, 2, 3].map((i) => l(500 + i * 66, 140, 500 + i * 66, 190, G4, 10) + l(500 + i * 66, 480, 500 + i * 66, 530, G4, 10) +
      l(410, 235 + i * 66, 460, 235 + i * 66, G4, 10) + l(740, 235 + i * 66, 790, 235 + i * 66, G4, 10)).join('') +
    r(460, 190, 280, 290, 36, INK) + r(486, 216, 228, 238, 22, '#2b2a35') +
    t(600, 362, 'AI', 96, P, 800) + l(486, 275, 520, 275, PM, 6) + l(680, 400, 714, 400, PM, 6) +
    sparkle(250, 210, 24, PM) + sparkle(960, 500, 18, PM) + sparkle(930, 180, 14, PL),
  frames: () =>
    card(250, 160, 430, 300) + p('M290 400 l100 -120 l70 80 l50 -50 l110 90z', PL, P, 5) + c(560, 235, 26, P) +
    r(520, 250, 430, 300, 26, INK, 'none', 0, 'opacity="0.08"') + card(500, 235, 430, 300) +
    r(530, 262, 370, 200, 16, G2) +
    [0, 1, 2].map((i) => c(560 + i * 130, 330 + (i % 2) * 70, 18, i === 1 ? P : G1, P, 5)).join('') +
    l(578, 330, 672, 400, P, 5) + l(690, 400, 802, 330, P, 5) + lines(540, 495, 1, 200, 20, G3, 10) + sparkle(1010, 180, 22, PM),
  refresh: () =>
    r(210, 220, 270, 82, 41, G1, G3, 4) + t(345, 272, 'retired', 34, G4, 700) +
    r(210, 330, 270, 82, 41, G1, G3, 4) + t(345, 382, 'renamed', 34, G4, 700) +
    r(720, 275, 270, 82, 41, P) + t(855, 327, 'repriced', 34, G1, 700) +
    c(600, 345, 78, PL, P, 6) +
    p('M562 330 A40 40 0 0 1 632 312', 'none', P, 9) + p('M638 296 L632 318 L610 312', 'none', P, 9) +
    p('M638 360 A40 40 0 0 1 568 378', 'none', P, 9) + p('M562 394 L568 372 L590 378', 'none', P, 9) +
    l(250, 261, 440, 261, G3, 4) + sparkle(1030, 200, 22, PM),
  gift: () =>
    r(430, 290, 340, 250, 22, G1, P, 7) + r(410, 230, 380, 76, 20, PL, P, 7) +
    r(572, 230, 56, 310, 0, P) + p('M600 230 C540 150 470 170 500 215 C520 240 580 232 600 230 C620 232 680 240 700 215 C730 170 660 150 600 230Z', 'none', P, 8) +
    r(842, 190, 190, 108, 24, P, 'none', 0, 'transform="rotate(8 937 244)"') + t(937, 266, '$0', 58, G1, 800, 'middle').replace('<text', '<text transform="rotate(8 937 244)"') +
    c(862, 205, 9, G1) + sparkle(250, 230, 26, PM) + sparkle(1010, 500, 18, PM),
};

const posts = {
  'run-ai-models-locally-ollama-lm-studio-gpt4all-anythingllm': 'chip',
  'ai-tools-free-plans-what-you-really-get-2026': 'gift',
  'ai-tool-changes-retired-renamed-repriced-2026': 'refresh',
  'comfyui-vs-stable-diffusion-webui-forge': 'frames',
  'how-to-choose-an-ai-tool-checklist': 'choose',
  'ai-tool-privacy-data-checklist': 'privacy',
  'n8n-cloud-trial-ended-what-survived': 'cloudlost',
  'self-hosting-n8n-docker-problems-that-bite': 'server',
  'n8n-vars-vs-env-config-silently-breaks': 'varsenv',
  'human-in-the-loop-ai-workflows-telegram-approval': 'phone',
  'what-ai-automation-really-costs-free-vs-paid': 'coins',
  'prompt-injection-plain-guide-for-automators': 'injection',
  'ai-automation-security-checklist-keys-data-webhooks': 'checklist',
  'build-ai-shopping-assistant-rag-what-works': 'shop',
  'daily-bi-report-small-shop-n8n-gemini': 'bi',
  'why-scheduled-automations-fail-silently': 'calendar',
  'is-automating-linkedin-safe-rules-safer-setup': 'linkedin',
  'choosing-automation-platform-n8n-make-zapier': 'compare',
  'how-to-write-better-ai-prompts-structure-and-mistakes': 'choose',
  'ai-resume-cover-letter-tools-what-to-check-before-you-send': 'linkedin',
  'ai-meeting-note-takers-privacy-accuracy-consent': 'phone',
  'how-to-fact-check-ai-output-hallucinations': 'checklist',
};

// Subtle brand-tinted backgrounds, rotated so neighbouring cards differ.
const tints = [
  ['#fff3f8', '#f3eef8'],
  ['#fbf1f5', '#eef1f9'],
  ['#fff6f1', '#f6eef7'],
  ['#f6f1fb', '#fdf0f4'],
];

let n = 0;
for (const [slug, motif] of Object.entries(posts)) {
  const [a, b] = tints[n++ % tints.length];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img">` +
    `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>` +
    `<pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="${P}" opacity="0.10"/></pattern></defs>` +
    `<rect width="1200" height="675" fill="url(#bg)"/><rect width="1200" height="675" fill="url(#dots)"/>` +
    c(1080, 90, 190, PL, 'none', 0, 'opacity="0.45"') + c(110, 600, 150, PL, 'none', 0, 'opacity="0.4"') +
    motifs[motif]() +
    `</svg>`;
  writeFileSync(`${OUT}/${slug}.svg`, svg);
}
console.log(`wrote ${n} covers to ${OUT}/`);
