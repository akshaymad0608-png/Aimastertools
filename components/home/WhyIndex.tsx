import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TOOL_COUNT } from '../../utils/stats';
import { COMPARISON_PAIRS } from '../../utils/pairs';

/**
 * The "service benefits" band from the Mayeen layout, which on a directory has
 * to answer a narrower question: why read this index rather than the first
 * listicle in the results.
 *
 * Each claim points at something on the site that backs it up, so none of it
 * is a promise with nowhere to go — the reason a benefits row usually reads as
 * filler is that it asserts three virtues and links to none of them.
 */
const REASONS = [
  {
    n: '01',
    title: 'Nobody paid to be here',
    body:
      'No placement is for sale and no entry was written from a press release. Some outbound links earn a commission; the ranking is set before anyone checks which ones.',
    to: '/about',
    cta: 'How the index works',
  },
  {
    n: '02',
    title: 'Pricing as it is actually charged',
    body:
      'Free, freemium, paid, usage-based or open source — recorded from the pricing page rather than the marketing one, and re-checked when it moves.',
    to: '/free',
    cta: 'Tools with a free tier',
  },
  {
    n: '03',
    title: 'Built to be compared, not browsed',
    body: `${COMPARISON_PAIRS.length} head-to-head pages and an alternatives page for every tool, because the useful question is rarely "is this good" but "is this better than the one I have".`,
    to: '/compare',
    cta: 'Compare two tools',
  },
];

export const WhyIndex: React.FC = () => (
  <section className="section section-alt" aria-labelledby="why-heading">
    <div className="container-custom">
      <div className="max-w-2xl">
        <p className="eyebrow">Why this one</p>
        <h2 id="why-heading" className="display-md mt-4 text-[var(--color-text-primary)]">
          {TOOL_COUNT} tools is not the point. Knowing which ones are wrong for you is.
        </h2>
      </div>

      <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {REASONS.map((r) => (
          <li
            key={r.n}
            className="flex flex-col border-t border-[var(--color-border-strong)] pt-5"
          >
            <p className="label-mono tabular-nums">{r.n}</p>
            <h3 className="title-sm mt-3 text-[17px] text-[var(--color-text-primary)]">
              {r.title}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
              {r.body}
            </p>
            <Link
              to={r.to}
              className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              {r.cta} <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default WhyIndex;
