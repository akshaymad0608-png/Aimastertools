import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wallet } from 'lucide-react';
import { EARN_CATEGORIES, EARN_SITE_COUNT, EARN_CATEGORY_COUNT } from '../../data/earn';

/**
 * Earn online, on the homepage.
 *
 * /earn and /earn/:slug have existed the whole time, with a real dataset
 * behind them, and the homepage linked to neither — not one anchor anywhere on
 * the page. The section could only be found by opening the header menu or
 * typing the URL, which is another way of saying it could not be found.
 *
 * Counts and categories come from the data rather than being written here, so
 * this cannot drift away from what /earn actually contains.
 */
export const EarnSection: React.FC = () => {
  const featured = EARN_CATEGORIES.slice(0, 6);

  return (
    <section className="section section-alt" aria-labelledby="earn-heading">
      <div className="container-custom">
        <div className="section-head">
          <div>
            <p className="eyebrow flex items-center gap-1.5">
              <Wallet size={13} aria-hidden="true" /> Earn online
            </p>
            <h2 id="earn-heading" className="display-md mt-4 text-[var(--color-text-primary)]">
              Ways to actually get paid for this
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
              {EARN_SITE_COUNT} vetted sites across {EARN_CATEGORY_COUNT} routes — remote job
              boards, freelance marketplaces, and places that pay for the skills these tools
              give you.
            </p>
          </div>
          <Link to="/earn" className="btn-secondary h-11 shrink-0 px-5 text-[13px]">
            Browse all {EARN_CATEGORY_COUNT} <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/earn/${cat.id}`}
                className="group flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-lift)]"
              >
                <h3 className="title-sm text-[15.5px] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
                  {cat.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {cat.blurb}
                </p>
                <span className="label-mono mt-auto flex items-center justify-between gap-2 border-t border-[var(--color-border)] pt-3.5 [margin-top:1rem]">
                  <span className="tabular-nums">
                    {cat.sites.length} {cat.sites.length === 1 ? 'site' : 'sites'}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[13px] transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EarnSection;
