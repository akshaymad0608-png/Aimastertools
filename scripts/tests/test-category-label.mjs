#!/usr/bin/env node
/**
 * Category labels: no "AI Tools AI Tools", no lower-cased "ai".
 *
 * 29 of 49 category pages shipped with titles like "Best AI Chatbots &
 * Assistants AI Tools" and descriptions like "ai agents & automation AI tools".
 *
 *   npm run test:labels
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { categoryLabel, proseLabel, suffixFor } from '../../utils/categoryLabel.mjs';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8');
let failed = 0;
const eq = (got, want, what) => {
  if (got === want) return;
  failed++;
  console.error(`  FAIL ${what}\n       got  "${got}"\n       want "${want}"`);
};

// Known shapes
eq(categoryLabel('AI Chatbots & Assistants'), 'AI Chatbots & Assistants', 'name already ends in a product noun');
eq(categoryLabel('AI Cybersecurity Tools'), 'AI Cybersecurity Tools', 'name already ends in Tools');
eq(categoryLabel('Image & Art Generation'), 'Image & Art Generation AI Tools', 'activity name gets "AI Tools"');
eq(categoryLabel('Business & Finance AI'), 'Business & Finance AI Tools', 'name ending in AI gets "Tools"');
eq(categoryLabel('Google AI Tools'), 'Google AI Tools', 'Google AI Tools unchanged');
eq(categoryLabel('3D & Animation'), '3D & Animation AI Tools', '3D & Animation');
eq(proseLabel('AI Chatbots & Assistants'), 'AI chatbots & assistants', 'prose keeps AI upper-case');
eq(proseLabel('Marketing & SEO'), 'marketing & SEO AI tools', 'prose keeps SEO upper-case');
eq(proseLabel('Business & Finance AI'), 'business & finance AI tools', 'prose, name ending in AI');
eq(suffixFor('Social Media Automation', true), 'AI tools', 'lower-case suffix');

// Every real category
const names = [...read('data/categories.ts').matchAll(/"name":\s*"([^"]+)"/g)].map((m) => m[1]);
const dupe = /\bAI\b.*\bAI [Tt]ools\b|\b[Tt]ools AI [Tt]ools\b|\b[Tt]ools [Tt]ools\b|\bAI AI\b/;
for (const n of names) {
  for (const [what, text] of [['label', categoryLabel(n)], ['prose', proseLabel(n)]]) {
    if (dupe.test(text)) { failed++; console.error(`  FAIL ${what} for "${n}" is duplicated: "${text}"`); }
    if (/\bai\b/.test(text)) { failed++; console.error(`  FAIL ${what} for "${n}" lower-cases AI: "${text}"`); }
  }
}

// One implementation: every consumer must import the shared helper, not keep a copy.
for (const f of ['prerender.mjs', 'utils/seo.ts', 'pages/FreeCategory.tsx', 'pages/CategoryPage.tsx']) {
  const s = read(f);
  if (!/categoryLabel\.mjs/.test(s)) { failed++; console.error(`  FAIL ${f} does not import utils/categoryLabel.mjs`); }
  if (/const suffixFor\s*=/.test(s)) { failed++; console.error(`  FAIL ${f} defines its own suffixFor`); }
}

if (failed) { console.error(`\n${failed} category-label check(s) failed`); process.exit(1); }
console.log(`category labels OK — ${names.length} categories, no duplication or lower-cased acronyms`);
