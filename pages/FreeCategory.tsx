import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Sparkles } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { freeCategories, findFreeCategory } from '../utils/freeTools';
import { itemListSchema } from '../utils/seo';

/**
 * One category's free tools, with the free ones and the freemium ones in
 * separate blocks rather than one undifferentiated list. That split is the
 * whole reason this page exists next to /category/:slug — same catalogue,
 * a question the category page does not answer.
 */
/**
 * What to append after a category name. Some already end in "Tools" ("AI
 * Ecommerce Tools"), some already carry "AI" ("AI Chatbots & Assistants"), some
 * carry neither ("3D & Animation") — a fixed suffix stutters on the first two.
 */
const suffixFor = (name: string, lower = false) => {
  const t = lower ? 'tools' : 'Tools';
  if (/tools?$/i.test(name)) return '';
  return /\bAI\b/.test(name) ? t : `AI ${t}`;
};

const FreeCategory: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = useMemo(() => findFreeCategory(slug), [slug]);
  const others = useMemo(
    () => freeCategories().filter((c) => c.slug !== slug).slice(0, 8),
    [slug],
  );

  if (!category) return <Navigate to="/free" replace />;

  const year = new Date().getFullYear();
  const { name, tools, fullyFree, freemium } = category;

  const schema = [
    itemListSchema(tools, `Best Free ${name} ${suffixFor(name)}`),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Which ${name.toLowerCase()} AI tools are completely free?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: fullyFree.length
              ? `${fullyFree.length} of them: ${fullyFree.slice(0, 6).map((t) => t.name).join(', ')}${
                  fullyFree.length > 6 ? ' and others' : ''
                }. These cost nothing to use rather than offering a limited tier.`
              : `None in this category are free outright — every option here is freemium, with a free tier and paid plans above it.`,
          },
        },
        {
          '@type': 'Question',
          name: `What is the best free ${name.toLowerCase()} AI tool?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: tools.length
              ? `${tools[0].name} is the highest rated of the ${tools.length} free and freemium options here, at ${tools[0].rating}/5. The right one depends on the job — the list is ordered by rating so you can work down it.`
              : '',
          },
        },
      ],
    },
  ];

  const Section = ({
    icon,
    heading,
    blurb,
    items,
  }: {
    icon: React.ReactNode;
    heading: string;
    blurb: string;
    items: typeof tools;
  }) =>
    items.length ? (
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-bold text-text">
          {icon}
          {heading} <span className="text-muted">({items.length})</span>
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{blurb}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} rank={i + 1} />
          ))}
        </div>
      </section>
    ) : null;

  return (
    <div className="mx-auto max-w-shell px-4 py-8 sm:px-6">
      <SEO
        title={`${tools.length} Best Free ${name} ${suffixFor(name)} (${year})`}
        description={`${tools.length} free ${name.toLowerCase()} AI tools — ${fullyFree.length} completely free and ${freemium.length} with a real free tier, rated and kept apart so you know which is which.`}
        keywords={[
          `free ${name.toLowerCase()} AI tools`,
          `best free ${name.toLowerCase()} tools`,
          `${name.toLowerCase()} AI free`,
        ]}
        url={`/free/${category.slug}`}
        schema={schema}
      />

      <Breadcrumbs items={[{ label: 'Free AI tools', path: '/free' }, { label: name }]} />

      <PageHeader
        eyebrow="Free"
        title={`${tools.length} free ${name} ${suffixFor(name, true)}`.trim()}
        lede={
          <>
            {fullyFree.length ? (
              <>
                <strong>{fullyFree.length}</strong> cost nothing at all
                {freemium.length ? <>, and {freemium.length} give you a genuine free tier.</> : '.'}
              </>
            ) : (
              <>Every option here is freemium — a usable free tier with paid plans above it.</>
            )}{' '}
            Ordered by rating, and split so a free tool is never passed off as a free trial.
          </>
        }
      />

      <Section
        icon={<BadgeCheck size={18} className="text-signal" />}
        heading="Free to use"
        blurb="No paid plan behind them — free or open source, usable as they are."
        items={fullyFree}
      />

      <Section
        icon={<Sparkles size={18} className="text-signal" />}
        heading="Free tier available"
        blurb="Freemium: a real free tier with limits, and paid plans once you outgrow it. Check the limits before you build a workflow on one."
        items={freemium}
      />

      <nav aria-label="Other free categories" className="mt-14">
        <h2 className="text-lg font-bold text-text">Free tools in other categories</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {others.map((c) => (
            <Link
              key={c.slug}
              to={`/free/${c.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-frame bg-panel px-3.5 py-2 text-sm text-muted transition-colors hover:border-signal/40 hover:text-signal"
            >
              Free {c.name} <ArrowRight size={13} />
            </Link>
          ))}
        </div>
        <Link
          to={`/category/${category.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal"
        >
          See every {name} tool, free or paid <ArrowRight size={14} />
        </Link>
      </nav>
    </div>
  );
};

export default FreeCategory;
