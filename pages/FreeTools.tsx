import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Gift, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { CategoryIcon } from '../components/CategoryIcon';
import { freeCategories, freeTotals } from '../utils/freeTools';
import { YEAR } from '../utils/year';
import hub from '../data/editorial/free-hub.json';
import best from '../data/editorial/best-free.json';

/**
 * The hub for everything free in the catalogue.
 *
 * Its job is to be the entry point that gets crawled and to hand authority to
 * the per-category pages beneath it — so every one of them is linked from here,
 * with the count that tells a reader whether it is worth opening.
 */
const FreeTools: React.FC = () => {
  const cats = useMemo(() => freeCategories(), []);
  const { categories } = useMemo(() => freeTotals(), []);

  // One text for the visible FAQ, the FAQPage JSON-LD and the static HTML
  // (prerender.mjs reads the same file).
  const faqs = useMemo(
    () => hub.faqs.map((f) => ({ q: f.q, a: f.a.replaceAll('{{BEST_FREE_COUNT}}', String(best.tools.length)) })),
    [],
  );

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <div className="mx-auto max-w-shell px-4 py-8 sm:px-6">
      <SEO
        title={`Free AI Tools by Category (${YEAR})`}
        description={`Browse free AI tools by category, with fully free tools listed apart from freemium ones across ${categories} areas. Want top picks? See the best free AI tools.`}
        keywords={['free AI tools by category', 'free AI tools list', 'freemium AI tools']}
        url="/free"
        schema={schema}
      />

      <Breadcrumbs items={[{ label: 'Free AI tools' }]} />

      <PageHeader
        eyebrow="Free"
        title="Free AI tools by category"
        lede={
          <>
            Some cost nothing at all. The rest are freemium: a free tier with paid plans above it. Most
            directories blur the two; every page here keeps them apart, so you know what you are signing up
            for. Looking for a short list instead? See the{' '}
            <a href="/best-free-ai-tools.html" className="text-signal underline underline-offset-4">
              best free AI tools
            </a>
            .
          </>
        }
      />

      <a
        href="/best-free-ai-tools.html"
        className="group mt-10 flex items-start gap-3 rounded-2xl border border-frame bg-panel p-5 transition-colors hover:border-signal/40"
      >
        <Gift size={18} className="mt-0.5 shrink-0 text-signal" />
        <span className="min-w-0">
          <span className="block font-semibold text-text group-hover:text-signal">
            Best free AI tools: our {best.tools.length} picks
          </span>
          <span className="mt-1 block text-sm text-muted">
            A short list with what each free plan includes, where it stops and where each detail came from.
          </span>
        </span>
        <ArrowRight size={16} className="ml-auto mt-1 shrink-0 text-muted group-hover:text-signal" />
      </a>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => (
          <Link
            key={c.slug}
            to={`/free/${c.slug}`}
            className="group flex items-start gap-3 rounded-2xl border border-frame bg-panel p-5 transition-colors hover:border-signal/40"
          >
            <CategoryIcon name={c.id} className="mt-0.5 shrink-0" />
            <span className="min-w-0">
              <span className="block font-semibold text-text group-hover:text-signal">
                Free {c.name} tools
              </span>
              <span className="mt-1 block text-sm text-muted">
                {c.tools.length} tools · {c.fullyFree.length} fully free
              </span>
            </span>
            <ArrowRight
              size={16}
              className="ml-auto mt-1 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-signal"
            />
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-2xl border border-frame bg-panel p-5">
        <Gift size={18} className="mt-0.5 shrink-0 text-signal" />
        <p className="text-sm leading-relaxed text-muted">
          Pricing changes often, and a free tier today can be a trial tomorrow. Every tool page links
          straight to the source so you can check the current terms before you commit.
        </p>
      </div>

      <section aria-labelledby="free-faq" className="mt-14">
        <h2 id="free-faq" className="text-lg font-bold text-text">
          Frequently asked questions
        </h2>
        <div className="mt-4 max-w-3xl divide-y divide-frame">
          {faqs.map((f) => (
            <div key={f.q} className="py-4">
              <h3 className="font-semibold text-text">{f.q}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FreeTools;
