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
import { breadcrumbSchema, itemListSchema, faqSchema } from '../utils/seo';
import { Tool } from '../types';
import curatedAlternatives from '../data/curatedAlternatives.json';

/**
 * Hand-written entries (data/curatedAlternatives.json), keyed by tool id.
 * prerender.mjs and scripts/generate-sitemap.mjs read the same file. A tool with
 * an entry gets a curated list and written guidance and is indexed; every other
 * alternatives page stays the templated, noindex version below.
 */
interface CuratedEntry {
  title: string;
  description: string;
  quickAnswer: string;
  alternatives: { id: string; bestFor: string; note: string }[];
  stayWith: string;
  faqs: { q: string; a: string }[];
}
const CURATED = curatedAlternatives as Record<string, CuratedEntry>;

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

  const curated = tool ? CURATED[tool.id] : undefined;

  const alternatives = useMemo<Tool[]>(() => {
    if (!tool) return [];
    if (curated) {
      return curated.alternatives
        .map((a) => MOCK_TOOLS.find((t) => t.id === a.id))
        .filter((t): t is Tool => Boolean(t));
    }
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
  }, [tool, curated]);

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

  const free = alternatives.filter(
    (t) => t.pricing === 'Free' || t.pricing === 'Open Source' || t.pricing === 'Freemium',
  );
  const comparisons = pairsForTool(tool.id, 4);

  const faqs = curated
    ? curated.faqs.map((f) => ({ question: f.q, answer: f.a }))
    : [
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
        title={curated ? curated.title : `${alternatives.length} Best ${tool.name} Alternatives (2026) — Free & Paid`}
        description={
          curated
            ? curated.description
            : `Real alternatives to ${tool.name}, drawn from ${tool.category}. Compare pricing and what each one does differently${free.length ? `, including ${free.length} free or freemium options` : ''}.`
        }
        url={`/alternatives/${slugify(tool.id)}-alternatives`}
        keywords={[
          `${tool.name} alternatives`,
          `alternative to ${tool.name}`,
          `tools like ${tool.name}`,
          `${tool.name} competitors`,
          `free ${tool.name} alternative`,
          `best ${tool.category} AI tools`,
        ]}
        // A templated page is built from the tool records alone and is not
        // indexed; one with a curated entry is (see scripts/generate-sitemap.mjs).
        noindex={!curated}
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
          lede={
            curated
              ? `${alternatives.length} alternatives to ${tool.name}, chosen by hand for what each one does differently.`
              : `${alternatives.length} tools that do a similar job, ranked by how closely they overlap with ${tool.name} rather than by who paid to be here.`
          }
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

        {curated && (
          <section className="mt-10 max-w-3xl" aria-labelledby="quick-answer">
            <h2 id="quick-answer" className="rule-label mb-4">
              Quick answer
            </h2>
            <p className="text-[16px] leading-relaxed text-[var(--color-text-primary)]">
              {curated.quickAnswer}
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="py-2 pr-4 font-semibold text-[var(--color-text-primary)]">Tool</th>
                    <th className="py-2 pr-4 font-semibold text-[var(--color-text-primary)]">Pricing</th>
                    <th className="py-2 font-semibold text-[var(--color-text-primary)]">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {curated.alternatives.map((a) => {
                    const alt = alternatives.find((t) => t.id === a.id);
                    if (!alt) return null;
                    return (
                      <tr key={a.id} className="border-b border-[var(--color-border)]">
                        <td className="py-2 pr-4">
                          <Link to={`/tool/${alt.id}`} className="font-medium text-[var(--color-primary)]">
                            {alt.name}
                          </Link>
                        </td>
                        <td className="py-2 pr-4 text-[var(--color-text-secondary)]">{alt.pricing}</td>
                        <td className="py-2 text-[var(--color-text-secondary)]">{a.bestFor}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-10 space-y-8">
              {curated.alternatives.map((a) => {
                const alt = alternatives.find((t) => t.id === a.id);
                if (!alt) return null;
                return (
                  <article key={a.id}>
                    <h3 className="title-sm text-[18px] text-[var(--color-text-primary)]">
                      <Link to={`/tool/${alt.id}`}>{alt.name}</Link>
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                      {a.note}
                    </p>
                  </article>
                );
              })}
            </div>
            <h2 className="rule-label mb-4 mt-12">When to stay with {tool.name}</h2>
            <p className="text-[15px] leading-relaxed text-[var(--color-text-secondary)]">{curated.stayWith}</p>
            <p className="mt-6 text-[13px] text-[var(--color-text-secondary)]">
              Plans, limits and prices change. Check each vendor&apos;s own site before you commit.
            </p>
          </section>
        )}

        {curated ? null : alternatives.length > 0 ? (
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

export default AlternativesPage;
