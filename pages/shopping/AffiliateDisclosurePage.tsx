import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SITE, absoluteUrl } from '../../utils/seo';
import { DEFAULT_ASSOCIATE_ID } from '../../lib/shopping/affiliate';

/**
 * The full affiliate disclosure.
 *
 * Amazon requires the short version wherever Special Links appear; this is the
 * page it points at. Written plainly, because a disclosure that needs a second
 * reading is not a disclosure.
 *
 * It states the store id, which nothing obliges — but a reader who wants to
 * check which account a link pays should be able to, and it costs nothing to
 * say.
 */
const AffiliateDisclosurePage: React.FC = () => (
  <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
    <SEO
      title="Affiliate Disclosure — How AI Master Tools Makes Money"
      description="AI Master Tools earns commission on some outbound links, including as an Amazon Associate. What that means, what it does not change, and how to tell."
      url="/affiliate-disclosure"
      keywords={['affiliate disclosure', 'Amazon Associate disclosure', 'how AI Master Tools makes money']}
      schema={[
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${absoluteUrl('/affiliate-disclosure')}#page`,
          name: 'Affiliate Disclosure',
          url: absoluteUrl('/affiliate-disclosure'),
          publisher: { '@type': 'Organization', name: SITE.name, url: absoluteUrl('/') },
        },
      ]}
    />

    <div className="container-custom">
      <Breadcrumbs items={[{ label: 'Affiliate disclosure', path: '/affiliate-disclosure' }]} />

      <PageHeader
        eyebrow="Disclosure"
        title="How this site makes money"
        lede="Short version: some links earn a commission, it costs you nothing, and it does not decide what gets listed or how it is ranked."
      />

      <div className="mt-14 max-w-2xl space-y-10">
        <section aria-labelledby="amazon-heading">
          <h2 id="amazon-heading" className="display-md text-[var(--color-text-primary)]">
            Amazon Associates
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              As an Amazon Associate, AI Master Tools earns from qualifying purchases. If you
              follow a link from this site to Amazon and buy something, Amazon pays a small
              percentage of that sale. The price you pay is exactly the same either way.
            </p>
            <p>
              Links that pay are marked with <code className="font-mono text-[13px]">rel=&quot;sponsored&quot;</code>{' '}
              in the page source, which is how search engines are told they are commercial. The
              store id these links report under is{' '}
              <code className="font-mono text-[13px]">{DEFAULT_ASSOCIATE_ID}</code>.
            </p>
          </div>
        </section>

        <section aria-labelledby="rank-heading">
          <h2 id="rank-heading" className="display-md text-[var(--color-text-primary)]">
            What commission does not change
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              No product is listed because it pays, ranked higher because it pays, or described
              more kindly because it pays. Nothing on this site is a paid placement, and there is
              no arrangement under which a brand can buy a position.
            </p>
            <p>
              Where a product has a real drawback, the entry says so. A recommendation that only
              ever points at the highest commission is not a recommendation.
            </p>
          </div>
        </section>

        <section aria-labelledby="prices-heading">
          <h2 id="prices-heading" className="display-md text-[var(--color-text-primary)]">
            About prices and specifications
          </h2>
          <div className="mt-5 space-y-4 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              Any price shown here is a snapshot from the day it was recorded, and that date is
              printed beside it. Prices move constantly, so the price on Amazon at the moment you
              click is the one that counts — that is why every product links out rather than
              quoting a number as current.
            </p>
            <p>
              Specifications are read from the listing or the manufacturer&rsquo;s own page. Where
              something is not known, the field is left out rather than guessed at.
            </p>
          </div>
        </section>

        <section aria-labelledby="questions-heading">
          <h2 id="questions-heading" className="display-md text-[var(--color-text-primary)]">
            Questions
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
            If something here looks wrong — an out-of-date price, a specification that does not
            match, a link that goes somewhere unexpected — that is worth reporting, and it gets
            fixed.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Link to="/about" className="link-chip">How the index works</Link>
            <Link to="/privacy" className="link-chip">Privacy policy</Link>
            <Link to="/terms" className="link-chip">Terms of service</Link>
          </div>
        </section>
      </div>
    </div>
  </main>
);

export default AffiliateDisclosurePage;
