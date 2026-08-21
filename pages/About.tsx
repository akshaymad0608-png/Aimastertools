import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SITE, absoluteUrl } from '../utils/seo';
import {
  TOOL_COUNT,
  CATEGORY_COUNT,
  FREE_TOOL_COUNT,
  LAST_UPDATED_LABEL,
} from '../utils/stats';
import { EARN_SITE_COUNT } from '../data/earn';
import { COMPARISON_PAIRS } from '../utils/pairs';
import { BLOG_POSTS } from '../data/blogs';

/**
 * About, as its own page.
 *
 * It existed only as `#about` on /discover — a section inside a longer page,
 * with no route of its own and no way for a search result or a citation to
 * point at it. For a directory that asks people to trust its rankings, the
 * page explaining who compiled them and how is not a footnote.
 *
 * Every number here reads from the data. Nothing is written as a literal,
 * because a hand-typed count is wrong the first time a tool is added, and a
 * page about trustworthiness cannot afford a stale figure.
 */

const METHOD = [
  {
    step: 'Found',
    body:
      'Tools arrive from launches, from what people are actually asking for, and from gaps in a category that has none. A tool that only exists as a waitlist does not get an entry.',
  },
  {
    step: 'Opened',
    body:
      'Every tool is opened and used before it is written up — enough to know what it does well, where it stops, and whether the free tier is genuinely usable or a demo with a paywall.',
  },
  {
    step: 'Filed',
    body: `Each tool is filed by the job it does rather than the technology behind it, which is why there are ${CATEGORY_COUNT} categories and not five. Pricing is recorded as the tool actually charges: free, freemium, paid, usage-based, or open source.`,
  },
  {
    step: 'Re-checked',
    body:
      'Pricing moves, free tiers get cut, and tools shut down. Entries are revisited rather than left to rot, and anything that dies is removed instead of being left to collect clicks.',
  },
];

const About: React.FC = () => {
  const stats = [
    { label: 'Tools indexed', value: TOOL_COUNT },
    { label: 'Categories', value: CATEGORY_COUNT },
    { label: 'Free or open source', value: FREE_TOOL_COUNT },
    { label: 'Head-to-head comparisons', value: COMPARISON_PAIRS.length },
    { label: 'Ways to earn listed', value: EARN_SITE_COUNT },
    { label: 'Guides written', value: BLOG_POSTS.length },
  ];

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={`About AI Master Tools — Who Compiles This Index, and How`}
        description={`AI Master Tools is an independent index of ${TOOL_COUNT} AI tools, compiled and re-checked by hand. How tools get listed, how they are rated, and how the site makes money.`}
        url="/about"
        keywords={[
          'about AI Master Tools',
          'AI tools directory methodology',
          'how AI tools are reviewed',
          'independent AI tool index',
        ]}
        /*
          No breadcrumbSchema here. <Breadcrumbs> emits its own BreadcrumbList
          from the items it is given, so a page that passes one to SEO as well
          ships the same type twice. The path goes to the component instead, so
          the single block it emits carries the URL.
        */
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            '@id': `${absoluteUrl('/about')}#about`,
            name: `About ${SITE.name}`,
            url: absoluteUrl('/about'),
            mainEntity: {
              '@type': 'Organization',
              name: SITE.name,
              url: absoluteUrl('/'),
              founder: { '@type': 'Person', name: SITE.author },
            },
          },
        ]}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'About', path: '/about' }]} />

        <PageHeader
          eyebrow="About"
          title="An index someone actually keeps"
          lede={`${TOOL_COUNT} AI tools, opened and filed by hand rather than scraped. This page explains who compiles it, how a tool gets in, and how the site pays for itself.`}
        />

        <section className="mt-14 max-w-2xl" aria-labelledby="what-heading">
          <h2 id="what-heading" className="display-md text-[var(--color-text-primary)]">
            What this is
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              AI Master Tools is an independent directory of AI tools. It exists because the
              honest answer to &ldquo;which AI tool should I use&rdquo; is almost never the one
              with the biggest launch, and finding that out usually costs a few hours and a
              couple of free trials.
            </p>
            <p>
              So every entry is opened and used before it is written up. You are reading notes
              from someone who tried the thing, not a rewritten press release.
            </p>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="numbers-heading">
          <h2 id="numbers-heading" className="display-md text-[var(--color-text-primary)]">
            What is in it
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-[var(--color-cardBg)] p-5">
                <dt className="label-mono">{s.label}</dt>
                <dd className="mt-2 font-mono text-[26px] font-medium tabular-nums leading-none text-[var(--color-text-primary)]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          {LAST_UPDATED_LABEL && (
            <p className="mt-4 text-[13px] text-[var(--color-text-muted)]">
              Catalogue last added to {LAST_UPDATED_LABEL}.
            </p>
          )}
        </section>

        <section className="mt-16" aria-labelledby="method-heading">
          <h2 id="method-heading" className="display-md text-[var(--color-text-primary)]">
            How a tool gets listed
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {METHOD.map((m, i) => (
              <li
                key={m.step}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-5"
              >
                <p className="label-mono tabular-nums">
                  {String(i + 1).padStart(2, '0')} &middot; {m.step}
                </p>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 max-w-2xl" aria-labelledby="ratings-heading">
          <h2 id="ratings-heading" className="display-md text-[var(--color-text-primary)]">
            About the ratings
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              Ratings are editorial. They are one person&rsquo;s read of how well a tool does the
              job it claims, not an aggregate of user reviews, and they are not sold. No tool has
              ever paid to be listed, ranked higher, or described differently.
            </p>
            <p>
              Where a tool is strong at one thing and weak at another, the entry says so. A
              directory where everything scores well is a directory that is not telling you
              anything.
            </p>
          </div>
        </section>

        <section className="mt-16 max-w-2xl" aria-labelledby="money-heading">
          <h2 id="money-heading" className="display-md text-[var(--color-text-primary)]">
            How the site makes money
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              Some outbound links earn a commission when you sign up for a tool. It costs you
              nothing, and it does not change how a tool is rated or where it is ranked — the
              ranking is set before anyone checks whether a link pays.
            </p>
            <p>
              That is the whole business model. There is no paid placement, no sponsored entry
              dressed up as a review, and no &ldquo;featured&rdquo; slot for sale.
            </p>
          </div>
        </section>

        <section className="mt-16 max-w-2xl" aria-labelledby="who-heading">
          <h2 id="who-heading" className="display-md text-[var(--color-text-primary)]">
            Who runs it
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              {SITE.author} — an AI/ML engineer working in prompt engineering, who kept a private
              list of tools that were worth the time and eventually published it.
            </p>
            <p>
              Found a tool that should be here, or an entry that has gone out of date? That is
              the most useful thing you can send.
            </p>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/" className="btn-primary h-11 px-5 text-[13px]">
              Browse the directory <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link to="/blog" className="btn-secondary h-11 px-5 text-[13px]">
              Read the guides
            </Link>
          </div>
        </section>

        <section className="mt-16 max-w-2xl" aria-labelledby="policies-heading">
          <h2 id="policies-heading" className="display-md text-[var(--color-text-primary)]">
            Policies
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            <li>
              <Link to="/privacy" className="link-chip">Privacy policy</Link>
            </li>
            <li>
              <Link to="/terms" className="link-chip">Terms of service</Link>
            </li>
            <li>
              <Link to="/careers" className="link-chip">Careers</Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default About;
