/**
 * Reads data/editorial/alternatives.json for the twelve /alternatives/* pages
 * that are allowed into the index. Shared by prerender.mjs (static HTML),
 * pages/AlternativesPage.tsx (hydrated page) and scripts/generate-sitemap.mjs,
 * so the three cannot disagree about which pages are indexable or what they say.
 *
 * Everything else under /alternatives/ stays noindex: those pages are built
 * from the tool records alone and have nothing to say that the tool page does
 * not. These twelve have a curated list, sourced facts and a comparison table.
 */

export const ALT_TITLE_MIN = 50;
export const ALT_TITLE_MAX = 60;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-10-05" -> "Oct 2026" */
export const checkedLabel = (iso) => {
  const m = /^(\d{4})-(\d{2})-\d{2}$/.exec(iso || '');
  return m ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : '';
};

export const altWhitelist = (data) => new Set((data?.pages || []).map((p) => p.subject));

export const isExternalRef = (ref) => ref.startsWith('ext:');

/**
 * A phrasing that lands in the 50-60 character window the rest of the site
 * aims for; failing that, the longest one that still fits under 60.
 */
export const altTitle = (name, count, year) => {
  const ladder = [
    `${count} Best ${name} Alternatives and Competitors, Compared (${year})`,
    `${count} Best ${name} Alternatives, Compared (${year}) | AI Master Tools`,
    `${count} Best ${name} Alternatives, Compared (${year})`,
    `${count} Best ${name} Alternatives (${year}) | AI Master Tools`,
    `${count} Best ${name} Alternatives (${year})`,
    `Best ${name} Alternatives (${year})`,
    `${name} Alternatives`,
  ];
  const inWindow = ladder.find((t) => t.length >= ALT_TITLE_MIN && t.length <= ALT_TITLE_MAX);
  if (inWindow) return inWindow;
  return ladder.filter((t) => t.length <= ALT_TITLE_MAX).sort((x, y) => y.length - x.length)[0] || ladder[ladder.length - 1];
};

export const altDescription = (name, count, checked) => {
  const full = `${count} alternatives to ${name}, compared by what each is best for and how its free access works. Sourced details checked ${checked}.`;
  return full.length <= 160 ? full : `${count} alternatives to ${name}, compared by what each is best for and how its free access works.`;
};

/**
 * Resolve one page of the editorial file against the tool records.
 * Returns null when `subjectId` is not on the whitelist or its tool is gone.
 *
 * @param {{data:any, tools:any[], subjectId:string, slugify:(s:string)=>string, siteUrl:string, year:number|string}} a
 */
export function buildAltPage({ data, tools, subjectId, slugify, siteUrl, year }) {
  const page = data?.pages?.find((p) => p.subject === subjectId);
  const subject = tools.find((t) => t.id === subjectId);
  if (!page || !subject) return null;

  const byId = new Map(tools.map((t) => [t.id, t]));
  const checked = checkedLabel(data.checkedAt);
  const fact = (ref) => data.facts?.[ref] || { what: '', access: '', sources: [] };

  const rows = page.alternatives.map((a) => {
    const f = fact(a.ref);
    if (isExternalRef(a.ref)) {
      const ext = data.externals[a.ref];
      return {
        ref: a.ref, external: true, name: ext.name, href: ext.url, category: null,
        what: f.what, access: f.access, sources: f.sources || [], bestFor: a.bestFor, differs: a.differs,
      };
    }
    const t = byId.get(a.ref);
    return {
      ref: a.ref, external: false, name: t.name, href: `/tool/${t.id}`, category: t.category,
      what: f.what, access: f.access, sources: f.sources || [], bestFor: a.bestFor, differs: a.differs,
    };
  });

  const subjectFact = fact(subjectId);
  const path = `/alternatives/${slugify(subject.id)}-alternatives`;
  const abs = (p) => `${siteUrl}${p}`;

  const sources = [];
  const seen = new Set();
  for (const s of [...(subjectFact.sources || []), ...rows.flatMap((r) => r.sources)]) {
    if (!seen.has(s.url)) { seen.add(s.url); sources.push(s); }
  }

  const related = [
    { label: `${subject.name} review`, path: `/tool/${subject.id}` },
    { label: `All ${subject.category} tools`, path: `/category/${slugify(subject.category)}` },
    ...(page.flagship ? [{ label: 'Best free AI tools', path: '/best-free-ai-tools.html' }] : []),
    ...(page.clients || [])
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map((t) => ({ label: `${t.name} (MCP client)`, path: `/tool/${t.id}` })),
  ];

  const heading = `Alternatives to ${subject.name}`;
  const faqs = page.faqs.map((f) => ({ question: f.q, answer: f.a }));

  return {
    subject, path, heading, rows, subjectFact, sources, related, faqs,
    intro: page.intro,
    pickIf: page.pickIf,
    checked,
    checkedAt: data.checkedAt,
    title: altTitle(subject.name, rows.length, year),
    description: altDescription(subject.name, rows.length, checked),
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: subject.name, item: abs(`/tool/${subject.id}`) },
          { '@type': 'ListItem', position: 3, name: 'Alternatives', item: abs(path) },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: heading,
        numberOfItems: rows.length,
        itemListElement: rows.map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: r.name,
          url: r.external ? r.href : abs(r.href),
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };
}
