import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Gift, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { CategoryIcon } from '../components/CategoryIcon';
import { freeCategories, freeTotals } from '../utils/freeTools';

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

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are these AI tools completely free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Some are free to use outright; the rest are freemium — a free tier that is genuinely usable, with paid plans above it. Every category page separates the two and gives the count for each, so you know which is which before you sign up.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between free and freemium AI tools?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A free tool costs nothing to use. A freemium tool gives you a free tier with limits — generations per month, export quality, seats — and charges once you pass them. Both are worth knowing about; being told one is the other is what wastes your time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do free AI tools need a sign-up?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most do, a few do not. Open the tool page for the ones you are considering — each lists the pricing model and links straight to the source so you can check before creating an account.',
          },
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-shell px-4 py-8 sm:px-6">
      <SEO
        title={`Free AI Tools (${new Date().getFullYear()}) — ${categories} Categories, Free & Freemium Split`}
        description={`AI tools you can use without paying, across ${categories} categories — the genuinely free ones listed apart from the ones with a free tier, so you know which is which before signing up.`}
        keywords={['free AI tools', 'best free AI tools', 'freemium AI tools', 'AI tools no cost']}
        url="/free"
        schema={schema}
      />

      <Breadcrumbs items={[{ label: 'Free AI tools' }]} />

      <PageHeader
        eyebrow="Free"
        title="Free AI tools, honestly labelled"
        lede={
          <>
            Some cost nothing at all. The rest are freemium — a real
            free tier with paid plans above it. Most directories blur the two; every page here keeps
            them apart, so you know what you are signing up for.
          </>
        }
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
};

export default FreeTools;
