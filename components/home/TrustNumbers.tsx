import React from 'react';
import { TOOL_COUNT, CATEGORY_COUNT, FREE_TOOL_COUNT } from '../../utils/stats';
import { COMPARISON_PAIRS } from '../../utils/pairs';
import { EARN_SITE_COUNT } from '../../data/earn';

/**
 * Trust through numbers — the one section of the Mayeen layout that maps onto
 * a directory without translation.
 *
 * Every figure reads from the data. That matters more here than anywhere else
 * on the page: this block exists to say the index is real and maintained, and
 * a hand-typed number that has drifted says the opposite of what it is for.
 *
 * Set in the mono face for the same reason the rest of the system uses it —
 * numbers should read as data rather than prose.
 */
const FIGURES = [
  { value: TOOL_COUNT, label: 'tools indexed' },
  { value: CATEGORY_COUNT, label: 'categories' },
  { value: FREE_TOOL_COUNT, label: 'free or open source' },
  { value: COMPARISON_PAIRS.length, label: 'head-to-head pages' },
  { value: EARN_SITE_COUNT, label: 'ways to earn' },
];

export const TrustNumbers: React.FC = () => (
  <section className="section-tight border-b border-[var(--color-border)]" aria-labelledby="numbers-heading">
    <div className="container-custom">
      <h2 id="numbers-heading" className="sr-only">
        The index in numbers
      </h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {FIGURES.map((f) => (
          <div key={f.label}>
            <dt className="sr-only">{f.label}</dt>
            <dd>
              <span className="block font-mono text-[34px] font-medium leading-none tabular-nums text-[var(--color-text-primary)]">
                {f.value}
              </span>
              <span className="mt-2.5 block text-[13px] text-[var(--color-text-secondary)]">
                {f.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default TrustNumbers;
