/**
 * The AI half of the product finder.
 *
 * It runs here, in a serverless function, for one reason: the key. Anything the
 * client bundle touches is public — vite.config.ts used to compile
 * GEMINI_API_KEY straight into it — so the model is called from the server and
 * the browser never sees a credential.
 *
 * What it is allowed to do is narrow. The candidate products are supplied by
 * the caller from the catalogue and the model may only rank and explain those.
 * It never invents a product, a price or a specification, and the prompt says so
 * in the only terms a model reliably respects: the data it may cite is the data
 * it was handed.
 *
 * When there is no key, or the call fails, or the catalogue returned nothing,
 * this responds with a plain "not enough information" rather than a guess. That
 * is the required behaviour, not a degraded one.
 */

interface Candidate {
  id: string;
  name: string;
  brand?: string;
  price?: number;
  currency?: string;
  keyFeatures?: string[];
  specifications?: { label: string; value: string }[];
  pros?: string[];
  cons?: string[];
}

const NOT_ENOUGH =
  "I don't have enough verified information to make a reliable recommendation yet.";

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Use POST.' });
    return;
  }

  let body: { query?: string; candidates?: Candidate[] } = {};
  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {};
  } catch {
    response.status(400).json({ error: 'Body must be JSON.' });
    return;
  }

  const query = (body.query || '').toString().slice(0, 400).trim();
  const candidates = Array.isArray(body.candidates) ? body.candidates.slice(0, 12) : [];

  if (!query) {
    response.status(400).json({ error: 'A query is required.' });
    return;
  }

  // Nothing to rank. Say so plainly rather than asking a model to fill the gap —
  // this is the exact situation that produces invented products.
  if (candidates.length === 0) {
    response.status(200).json({
      ok: true,
      aiUsed: false,
      reason: 'no-candidates',
      message: NOT_ENOUGH,
      picks: [],
    });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

  // No key is a normal state here, not an error. The page still works: it shows
  // the matching products, just without the written rationale.
  if (!apiKey) {
    response.status(200).json({
      ok: true,
      aiUsed: false,
      reason: 'no-key',
      message: 'Showing everything that matches. Written recommendations need an AI key, which is not configured.',
      picks: candidates.map((c) => ({ id: c.id })),
    });
    return;
  }

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const prompt = [
      'You are helping someone choose a product. You are given a shortlist of REAL products from a catalogue.',
      '',
      'Hard rules:',
      '- Recommend ONLY from the products given. Never name a product that is not in the list.',
      '- Cite only specifications, prices and features present in the data. If a field is absent, do not guess it and do not mention it.',
      '- If the products genuinely do not suit the request, say so. Do not force a recommendation.',
      '- No superlatives you cannot support. "Strong for 4K based on the listed panel" — not "the best picture quality".',
      '',
      `The person asked: ${JSON.stringify(query)}`,
      '',
      'Products:',
      JSON.stringify(candidates, null, 1),
      '',
      'Return JSON only, no prose around it, matching:',
      '{"picks":[{"id":"<product id>","label":"Best overall|Best value|Best performance|Best alternative","why":"<one or two sentences, citing only given data>","suitsWho":"<who should buy it>","avoidIf":"<who should not>"}],"note":"<optional caveat>"}',
      'Use at most 4 picks. Use only ids from the list.',
    ].join('\n');

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const text = (result as any)?.text ?? '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('no json in response');

    const parsed = JSON.parse(match[0]) as {
      picks?: { id: string; label?: string; why?: string; suitsWho?: string; avoidIf?: string }[];
      note?: string;
    };

    // The model is not trusted to stay inside the list. Anything it returns that
    // is not a real candidate id is dropped rather than rendered.
    const allowed = new Set(candidates.map((c) => c.id));
    const picks = (parsed.picks || []).filter((p) => p && allowed.has(p.id)).slice(0, 4);

    response.status(200).json({
      ok: true,
      aiUsed: true,
      picks,
      note: typeof parsed.note === 'string' ? parsed.note.slice(0, 400) : undefined,
      dropped: (parsed.picks || []).length - picks.length,
    });
  } catch (err) {
    // A model failure must not take the page down or invent a fallback answer.
    console.error('product-finder: model call failed', (err as Error)?.message);
    response.status(200).json({
      ok: true,
      aiUsed: false,
      reason: 'ai-error',
      message: 'The recommendation service did not respond. These are the products that match your filters.',
      picks: candidates.map((c) => ({ id: c.id })),
    });
  }
}
