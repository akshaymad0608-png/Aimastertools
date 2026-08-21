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

  const faqs = [
    {
      question: `What is the best alternative to ${tool.name}?`,
      answer: alternatives.length
        ? `${alternatives[0].name} is the closest match in our index — same category (${tool.category}), rated ${alternatives[0].rating.toFixed(1)}, priced as ${alternatives[0].pricing.toLowerCase()}. Whether it suits you depends on which of ${tool.name}'s features you actually use.`
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
      answer: `${tool.name} is listed as ${tool.pricing.toLowerCase()} and rated ${tool.rating.toFixed(1)}. The usual reasons to look elsewhere are price, a missing feature, or wanting something narrower that does one job well rather than a whole suite.`,
    },
  ];

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={`${alternatives.length} Best ${tool.name} Alternatives (2026) — Free & Paid`}
        description={`Real alternatives to ${tool.name}, drawn from ${tool.category}. Compare pricing, ratings and what each one does differently${free.length ? `, including ${free.length} free or freemium options` : ''}.`}
        url={`/alternatives/${slugify(tool.id)}-alternatives`}
        keywords={[
          `${tool.name} alternatives`,
          `alternative to ${tool.name}`,
          `tools like ${tool.name}`,
          `${tool.name} competitors`,
          `free ${tool.name} alternative`,
          `best ${tool.category} AI tools`,
        ]}
        noindex={alternatives.length === 0}
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

export default AlternativesPage;
