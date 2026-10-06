import React, { useMemo } from 'react';
import { resolveToolLink } from '../lib/affiliate/outbound';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MOCK_TOOLS } from '../data/tools';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import ToolLogo from '../components/ToolLogo';
import { slugify } from '../utils/slug';
import { pairsForTool } from '../utils/pairs';
import { breadcrumbSchema, itemListSchema, faqSchema, SITE } from '../utils/seo';
import { buildAltPage } from '../utils/altEditorial.mjs';
import editorial from '../data/editorial/alternatives.json';
import { Tool } from '../types';
import { YEAR } from '../utils/year';

/**
 * This page was a stub. It title-cased the URL to guess a tool name — breaking
 * on acronyms and ampersands exactly as the old category page did — and then
 * returned `MOCK_TOOLS.slice(0, 8)` for every tool, with a comment admitting it
 * was for demo purposes. All 639 alternatives pages showed an identical list.
 * Publishing that to a sitemap would have handed Google 639 duplicate pages,
 * which is worse than not having the pages at all.
 *
 * Alternatives are real now: same category first, then ranked by how many tags
 * they share with the subject, then by rating.
 */
const AlternativesPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const tool = useMemo(() => {
    if (!slug) return undefined;
    const base = slugify(slug.replace(/-alternatives$/, ''));
    return (
      MOCK_TOOLS.find((t) => slugify(t.id) === base) ||
      MOCK_TOOLS.find((t) => slugify(t.name) === base)
    );
  }, [slug]);

  const alternatives = useMemo<Tool[]>(() => {
    if (!tool) return [];
    const subjectTags = new Set((tool.tags || []).map((t) => String(t).toLowerCase()));

    const score = (candidate: Tool) => {
      let s = 0;
      if (candidate.category === tool.category) s += 100;
      for (const tag of candidate.tags || []) {
        if (subjectTags.has(String(tag).toLowerCase())) s += 10;
      }
      return s + candidate.rating;
    };

    return MOCK_TOOLS.filter((t) => t.id !== tool.id)
      .map((t) => ({ tool: t, s: score(t) }))
      .filter((x) => x.s >= 10)
      .sort((x, y) => y.s - x.s)
      .slice(0, 12)
      .map((x) => x.tool);
  }, [tool]);

  // The twelve pages with a curated list (data/editorial/alternatives.json).
  // Every other alternatives page stays noindex.
  const curated = useMemo(
    () =>
      tool
        ? buildAltPage({ data: editorial, tools: MOCK_TOOLS, subjectId: tool.id, slugify, siteUrl: SITE.url, year: YEAR })
        : null,
    [tool],
  );

  if (!tool) {
    return (
      <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
        <SEO
          title="Tool not found — AI Master Tools"
          description="No alternatives page exists for that tool."
          url={`/alternatives/${slug ?? ''}`}
          noindex
        />
        <div className="container-custom max-w-2xl text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="display-lg mt-5 text-[var(--color-text-primary)]">
            No tool called <em>&ldquo;{slug?.replace(/-alternatives$/, '')}&rdquo;</em>
          </h1>
          <Link to="/" className="btn-primary mt-8 h-11 px-6">
            Search the directory <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  if (curated) {
    return <CuratedAlternatives ed={curated} />;
  }

  const free = alternatives.filter(
    (t) => t.pricing === 'Free' || t.pricing === 'Open Source' || t.pricing === 'Freemium',
  );
  const comparisons = pairsForTool(tool.id, 4);

  const faqs = [
    {
      question: `What is the best alternative to ${tool.name}?`,
      answer: alternatives.length
        ? `${alternatives[0].name} is the closest match in our index — same category (${tool.category}), priced as ${alternatives[0].pricing.toLowerCase()}. Whether it suits you depends on which of ${tool.name}'s features you actually use.`
        : `We do not currently list a close alternative to ${tool.name} in ${tool.category}.`,
    },
    {
      question: `Is there a free alternative to ${tool.name}?`,
      answer: free.length
        ? `Yes — ${free.slice(0, 3).map((t) => t.name).join(', ')} ${free.length === 1 ? 'is' : 'are'} free or freemium. Free tiers usually carry limits on volume or output quality, so check what the tier includes before switching.`
        : `Not in this category at present. Every alternative we list for ${tool.name} is paid.`,
    },
    {
      question: `Why would I switch from ${tool.name}?`,
      answer: `${tool.name} is listed as ${tool.pricing.toLowerCase()}. The usual reasons to look elsewhere are price, a missing feature, or wanting something narrower that does one job well rather than a whole suite.`,
    },
  ];

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={`${alternatives.length} Best ${tool.name} Alternatives (${YEAR}) — Free & Paid`}
        description={`Real alternatives to ${tool.name}, drawn from ${tool.category}. Compare pricing and what each one does differently${free.length ? `, including ${free.length} free or freemium options` : ''}.`}
        url={`/alternatives/${slugify(tool.id)}-alternatives`}
        keywords={[
          `${tool.name} alternatives`,
          `alternative to ${tool.name}`,
          `tools like ${tool.name}`,
          `${tool.name} competitors`,
          `free ${tool.name} alternative`,
          `best ${tool.category} AI tools`,
        ]}
        // Every alternatives page is templated from the tool records, so none
        // is indexed; see scripts/generate-sitemap.mjs.
        noindex
        schema={[
          breadcrumbSchema([
            { label: tool.name, path: `/tool/${tool.id}` },
            { label: 'Alternatives' },
          ]),
          itemListSchema(alternatives, `Alternatives to ${tool.name}`),
          faqSchema(faqs),
        ]}
      />

      <div className="container-custom">
        <Breadcrumbs
          items={[{ label: tool.name, path: `/tool/${tool.id}` }, { label: 'Alternatives' }]}
        />

        <PageHeader
          eyebrow={tool.category}
          title={
            <>
              Alternatives to <em>{tool.name}</em>
            </>
          }
          lede={`${alternatives.length} tools that do a similar job, ranked by how closely they overlap with ${tool.name} rather than by who paid to be here.`}
          action={
            <Link
              to={`/tool/${tool.id}`}
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-3 transition-colors hover:border-[var(--color-primary)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
                <ToolLogo domain={tool.domain} brandColor={tool.brandColor} name={tool.name} className="h-full w-full" />
              </span>
              <span className="min-w-0 text-left">
                <span className="label-mono block">Comparing against</span>
                <span className="title-sm block truncate text-[15px] text-[var(--color-text-primary)]">
                  {tool.name}
                </span>
              </span>
            </Link>
          }
          meta={
            <>
              <span className="label-mono tabular-nums">{alternatives.length} alternatives</span>
              <span className="label-mono tabular-nums">{free.length} free or freemium</span>
              <span className="label-mono">{tool.category}</span>
            </>
          }
        />

        {alternatives.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {alternatives.map((alt, i) => (
              <li key={alt.id}>
                <ToolCard tool={alt} rank={i + 1} layout="vertical" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 text-[15px] text-[var(--color-text-secondary)]">
            Nothing in the index overlaps closely enough with {tool.name} to call it an
            alternative. This page is excluded from search engines until that changes.
          </p>
        )}

        {comparisons.length > 0 && (
          <section className="mt-14" aria-labelledby="head-to-head">
            <h2 id="head-to-head" className="rule-label mb-5">
              Head to head
            </h2>
            <ul className="flex flex-wrap gap-2">
              {comparisons.map((p) => (
                <li key={p.slug}>
                  <Link to={`/compare/${p.slug}`} className="link-chip">
                    {p.a.name} vs {p.b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-14" aria-labelledby="alt-faq">
          <h2 id="alt-faq" className="rule-label mb-5">
            Common questions
          </h2>
          <dl className="max-w-3xl">
            {faqs.map((f) => (
              <div key={f.question} className="accordion-item py-5">
                <dt className="title-sm text-[16px] text-[var(--color-text-primary)]">{f.question}</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 flex flex-wrap gap-3">
          <a
            href={resolveToolLink(tool).href}
            target="_blank"
            rel={resolveToolLink(tool).rel}
            className="btn-secondary h-10 px-4 text-[13px]"
          >
            Visit {tool.name} <ExternalLink size={12} />
          </a>
          <Link to={`/category/${slugify(tool.category)}`} className="btn-secondary h-10 px-4 text-[13px]">
            All {tool.category} tools
          </Link>
        </section>
      </div>
    </main>
  );
};

type Curated = NonNullable<ReturnType<typeof buildAltPage>>;

/**
 * Same copy and order as altEditorialHtml() in prerender.mjs, so the static
 * page and this one say the same thing. Facts in the table come from the
 * vendors' own pages (linked under Sources); "Best for" and "How it differs"
 * are editorial and labelled as such.
 */
const CuratedAlternatives: React.FC<{ ed: Curated }> = ({ ed }) => {
  const { subject } = ed;
  const comparisons = pairsForTool(subject.id, 4);
  const nameLink = (r: Curated['rows'][number]) =>
    r.external ? (
      <a href={r.href} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--color-border)] underline-offset-2 hover:text-[var(--color-primary)]">
        {r.name}
      </a>
    ) : (
      <Link to={r.href} className="underline decoration-[var(--color-border)] underline-offset-2 hover:text-[var(--color-primary)]">
        {r.name}
      </Link>
    );
  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={ed.title}
        description={ed.description}
        url={ed.path}
        keywords={[`${subject.name} alternatives`, `alternative to ${subject.name}`, `tools like ${subject.name}`]}
        // Breadcrumbs below emits the BreadcrumbList; the static page carries all three.
        schema={ed.schemas.filter((x) => x['@type'] !== 'BreadcrumbList')}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: subject.name, path: `/tool/${subject.id}` }, { label: 'Alternatives', path: ed.path }]} />

        <PageHeader
          eyebrow={subject.category}
          title={
            <>
              Alternatives to <em>{subject.name}</em>
            </>
          }
          lede={ed.intro}
          meta={
            <>
              <span className="label-mono tabular-nums">{ed.rows.length} alternatives</span>
              <span className="label-mono">Sources checked {ed.checked}</span>
            </>
          }
        />

        <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
          <strong className="text-[var(--color-text-primary)]">{subject.name}:</strong> {ed.subjectFact.what}
          {ed.subjectFact.access ? ` ${ed.subjectFact.access}` : ''}
        </p>

        <section className="mt-10" aria-labelledby="alt-compare">
          <h2 id="alt-compare" className="rule-label mb-5">
            Quick comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px] leading-snug">
              <thead>
                <tr>
                  {['Alternative', 'Best for (our view)', 'What the official pages say'].map((c) => (
                    <th key={c} className="border-b border-[var(--color-border)] px-3 py-2 font-semibold text-[var(--color-text-primary)]">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ed.rows.map((r) => (
                  <tr key={r.ref}>
                    <td className="border-b border-[var(--color-border)] px-3 py-3 align-top font-semibold text-[var(--color-text-primary)]">
                      {nameLink(r)}
                    </td>
                    <td className="border-b border-[var(--color-border)] px-3 py-3 align-top text-[var(--color-text-secondary)]">{r.bestFor}</td>
                    <td className="border-b border-[var(--color-border)] px-3 py-3 align-top text-[var(--color-text-secondary)]">
                      {r.access || 'Check the vendor’s site for current plans and limits.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="alt-differs">
          <h2 id="alt-differs" className="rule-label mb-5">
            How each alternative differs from {subject.name}
          </h2>
          <div className="max-w-3xl space-y-6">
            {ed.rows.map((r) => (
              <div key={r.ref}>
                <h3 className="title-sm text-[16px] text-[var(--color-text-primary)]">{nameLink(r)}</h3>
                <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">{r.what}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  <strong>How it differs:</strong> {r.differs}
                </p>
                {!r.external && r.category && (
                  <p className="mt-1 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                    <Link to={r.href} className="underline underline-offset-2">Read our {r.name} page</Link>
                    {' · '}
                    <Link to={`/category/${slugify(r.category)}`} className="underline underline-offset-2">More {r.category} tools</Link>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="alt-choose">
          <h2 id="alt-choose" className="rule-label mb-5">
            How to choose
          </h2>
          <ul className="max-w-3xl list-disc space-y-2 pl-5 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
            {ed.pickIf.map((x) => (
              <li key={x.if}>
                If {x.if}, {x.then}
              </li>
            ))}
          </ul>
        </section>

        {comparisons.length > 0 && (
          <section className="mt-12" aria-labelledby="head-to-head">
            <h2 id="head-to-head" className="rule-label mb-5">
              Head to head
            </h2>
            <ul className="flex flex-wrap gap-2">
              {comparisons.map((p) => (
                <li key={p.slug}>
                  <Link to={`/compare/${p.slug}`} className="link-chip">
                    {p.a.name} vs {p.b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12" aria-labelledby="alt-faq">
          <h2 id="alt-faq" className="rule-label mb-5">
            Common questions
          </h2>
          <dl className="max-w-3xl">
            {ed.faqs.map((f) => (
              <div key={f.question} className="accordion-item py-5">
                <dt className="title-sm text-[16px] text-[var(--color-text-primary)]">{f.question}</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 max-w-3xl" aria-labelledby="alt-sources">
          <h2 id="alt-sources" className="rule-label mb-5">
            Sources and how we checked
          </h2>
          <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
            Statements under “What the official pages say” come from the vendors’ own pages, linked below, as they read in {ed.checked}. They were read through search extracts of those pages, so check the linked page for current terms. “Best for” and “How it differs” are our own editorial judgement.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-[var(--color-text-secondary)]">
            {ed.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] text-[var(--color-text-secondary)]">
            {ed.related.map((l, i) => (
              <React.Fragment key={l.path}>
                {i > 0 && ' · '}
                {l.path.endsWith('.html') ? (
                  <a href={l.path} className="underline underline-offset-2">{l.label}</a>
                ) : (
                  <Link to={l.path} className="underline underline-offset-2">{l.label}</Link>
                )}
              </React.Fragment>
            ))}
          </p>
        </section>
      </div>
    </main>
  );
};

export default AlternativesPage;
