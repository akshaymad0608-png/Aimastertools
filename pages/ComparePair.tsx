import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Star, ArrowRight, Check, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import ToolLogo from '../components/ToolLogo';
import { findPair, COMPARISON_PAIRS } from '../utils/pairs';
import { slugify } from '../utils/slug';
import { breadcrumbSchema, faqSchema, absoluteUrl } from '../utils/seo';
import { Tool } from '../types';

/** Rows are declared once so both columns are guaranteed to line up. */
const ROWS: { label: string; get: (t: Tool) => React.ReactNode; raw: (t: Tool) => string }[] = [
  { label: 'Category', get: (t) => t.category, raw: (t) => t.category },
  { label: 'Pricing', get: (t) => <span className="badge">{t.pricing}</span>, raw: (t) => t.pricing },
  {
    label: 'Rating',
    get: (t) => (
      <span className="flex items-center gap-1.5 font-semibold">
        <Star size={12} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
        <span className="tabular-nums">{t.rating.toFixed(1)}</span>
      </span>
    ),
    raw: (t) => `${t.rating.toFixed(1)} out of 5`,
  },
  {
    label: 'Free to start',
    get: (t) =>
      t.pricing === 'Free' || t.pricing === 'Freemium' || t.pricing === 'Open Source' ? (
        <Check size={16} className="text-[var(--color-success)]" aria-label="Yes" />
      ) : (
        <Minus size={16} className="text-[var(--color-text-muted)]" aria-label="No" />
      ),
    raw: (t) =>
      t.pricing === 'Free' || t.pricing === 'Freemium' || t.pricing === 'Open Source' ? 'yes' : 'no',
  },
  {
    label: 'Tags',
    get: (t) => (t.tags?.length ? t.tags.slice(0, 4).join(', ') : '—'),
    raw: (t) => (t.tags?.length ? t.tags.slice(0, 4).join(', ') : 'none recorded'),
  },
  { label: 'Website', get: (t) => t.domain, raw: (t) => t.domain },
];

const ComparePair: React.FC = () => {
  const { pair: pairSlugParam } = useParams<{ pair: string }>();
  const pair = useMemo(() => findPair(pairSlugParam), [pairSlugParam]);

  if (!pair) {
    return (
      <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
        <SEO
          title="Comparison not found — AI Master Tools"
          description="That comparison does not exist. Pick two tools to compare instead."
          url={`/compare/${pairSlugParam ?? ''}`}
          noindex
        />
        <div className="container-custom max-w-2xl text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="display-lg mt-5 text-[var(--color-text-primary)]">
            No comparison at <em>that address</em>
          </h1>
          <Link to="/compare" className="btn-primary mt-8 h-11 px-6">
            Build your own comparison <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const { a, b, category } = pair;
  const better = a.rating === b.rating ? null : a.rating > b.rating ? a : b;

  /**
   * The FAQ is what earns the rich result on a "X vs Y" query. Answers are
   * generated from the two records, so they can never contradict the table
   * directly above them.
   */
  const faqs = [
    {
      question: `Is ${a.name} better than ${b.name}?`,
      answer: better
        ? `On our recorded ratings, ${better.name} scores higher — ${better.rating.toFixed(1)} against ${(better.id === a.id ? b : a).rating.toFixed(1)}. Ratings summarise general reception, not fit for your specific job, so read both entries before deciding.`
        : `Both are rated ${a.rating.toFixed(1)}, so neither leads on score. The decision comes down to pricing: ${a.name} is ${a.pricing.toLowerCase()}, ${b.name} is ${b.pricing.toLowerCase()}.`,
    },
    {
      question: `What is the difference between ${a.name} and ${b.name}?`,
      answer: `Both sit in ${category}. ${a.name}: ${a.description} ${b.name}: ${b.description}`,
    },
    {
      question: `Is ${a.name} or ${b.name} free?`,
      answer: `${a.name} is listed as ${a.pricing.toLowerCase()} and ${b.name} as ${b.pricing.toLowerCase()}. Check each vendor's pricing page before committing — plans change more often than directories update.`,
    },
  ];

  const related = COMPARISON_PAIRS.filter(
    (p) => p.category === category && p.slug !== pair.slug,
  ).slice(0, 6);

  const Column: React.FC<{ tool: Tool }> = ({ tool }) => (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
        <ToolLogo domain={tool.domain} brandColor={tool.brandColor} name={tool.name} className="h-full w-full" />
      </span>
      <span className="min-w-0">
        <Link
          to={`/tool/${tool.id}`}
          className="title-sm block truncate text-[16px] text-[var(--color-text-primary)] hover:text-[var(--color-primary)]"
        >
          {tool.name}
        </Link>
        <span className="label-mono">{tool.pricing}</span>
      </span>
    </div>
  );

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={`${a.name} vs ${b.name} (2026) — Pricing, Ratings & Which to Pick`}
        description={`${a.name} vs ${b.name} compared side by side: pricing, ratings, what each is good at, and which one suits your job. Both are ${category} tools.`}
        url={`/compare/${pair.slug}`}
        keywords={[
          `${a.name} vs ${b.name}`,
          `${b.name} vs ${a.name}`,
          `${a.name} or ${b.name}`,
          `${a.name} ${b.name} comparison`,
          `${a.name} alternative`,
          `${b.name} alternative`,
          `best ${category} AI tools`,
        ]}
        schema={[
          breadcrumbSchema([
            { label: 'Compare', path: '/compare' },
            { label: `${a.name} vs ${b.name}`, path: `/compare/${pair.slug}` },
          ]),
          faqSchema(faqs),
        ]}
      />

      <div className="container-custom">
        <Breadcrumbs
          items={[{ label: 'Compare', path: '/compare' }, { label: `${a.name} vs ${b.name}` }]}
        />

        <PageHeader
          eyebrow={category}
          title={
            <>
              {a.name} <em>vs</em> {b.name}
            </>
          }
          lede={`Both are ${category.toLowerCase()} tools. Here is what separates them on price, rating and what each one is actually for.`}
        />

        {/* The table */}
        <div className="mt-10 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cardBg)]">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              {a.name} compared with {b.name}
            </caption>
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <th scope="col" className="label-mono w-[22%] p-4 font-normal">
                  Attribute
                </th>
                <th scope="col" className="p-4">
                  <Column tool={a} />
                </th>
                <th scope="col" className="p-4">
                  <Column tool={b} />
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-[var(--color-border)] last:border-0">
                  <th scope="row" className="label-mono p-4 align-top font-normal">
                    {row.label}
                  </th>
                  <td className="p-4 align-top text-[14px] text-[var(--color-text-secondary)]">
                    {row.get(a)}
                  </td>
                  <td className="p-4 align-top text-[14px] text-[var(--color-text-secondary)]">
                    {row.get(b)}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="label-mono p-4 align-top font-normal">
                  Summary
                </th>
                {[a, b].map((t) => (
                  <td key={t.id} className="p-4 align-top">
                    <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
                      {t.description}
                    </p>
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="btn-secondary mt-4 h-9 px-4 text-[12.5px]"
                    >
                      Visit {t.name} <ExternalLink size={12} />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verdict, stated only as far as the data allows */}
        <section className="mt-12" aria-labelledby="verdict">
          <h2 id="verdict" className="rule-label mb-5">
            Which one
          </h2>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <p className="prose-lede">
              {better ? (
                <>
                  <strong className="text-[var(--color-text-primary)]">{better.name}</strong> carries
                  the higher rating of the two ({better.rating.toFixed(1)} against{' '}
                  {(better.id === a.id ? b : a).rating.toFixed(1)}). That reflects general reception
                  rather than fit for your particular job — if{' '}
                  {(better.id === a.id ? b : a).name} is the cheaper of the two and covers what you
                  need, the rating gap is not a reason to overrule it.
                </>
              ) : (
                <>
                  Both are rated {a.rating.toFixed(1)}, so score does not separate them. Decide on
                  price: {a.name} is {a.pricing.toLowerCase()}, {b.name} is {b.pricing.toLowerCase()}.
                </>
              )}
            </p>
          </div>
        </section>

        {/* FAQ — visible copy matching the schema */}
        <section className="mt-14" aria-labelledby="pair-faq">
          <h2 id="pair-faq" className="rule-label mb-5">
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

        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-compare">
            <h2 id="related-compare" className="rule-label mb-5">
              Other {category} comparisons
            </h2>
            <ul className="flex flex-wrap gap-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link to={`/compare/${p.slug}`} className="link-chip">
                    {p.a.name} vs {p.b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-14">
          <h2 className="rule-label mb-5">Looking for something else</h2>
          <div className="flex flex-wrap gap-3">
            <Link to={`/alternatives/${slugify(a.id)}-alternatives`} className="btn-secondary h-10 px-4 text-[13px]">
              {a.name} alternatives
            </Link>
            <Link to={`/alternatives/${slugify(b.id)}-alternatives`} className="btn-secondary h-10 px-4 text-[13px]">
              {b.name} alternatives
            </Link>
            <Link to="/compare" className="btn-secondary h-10 px-4 text-[13px]">
              Compare two others
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ComparePair;
