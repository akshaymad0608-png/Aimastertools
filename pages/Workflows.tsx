import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Layers, Star } from 'lucide-react';
import { WORKFLOWS } from '../data/workflows';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { breadcrumbSchema } from '../utils/seo';

const DIFFICULTY_STYLE: Record<string, string> = {
  Beginner: 'badge badge-primary',
  Intermediate: 'badge badge-accent',
  Advanced: 'badge',
};

const Workflows: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  /**
   * The filter row used to be a hardcoded list of eleven categories while the
   * data held five workflows across three. Eight of those buttons led to an
   * empty page. Categories now come from the workflows themselves.
   */
  const categories = useMemo(
    () => ['All', ...new Set(WORKFLOWS.map((w) => w.category).filter(Boolean))],
    [],
  );

  const filtered = useMemo(
    () => (activeCategory === 'All' ? WORKFLOWS : WORKFLOWS.filter((w) => w.category === activeCategory)),
    [activeCategory],
  );

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={`${WORKFLOWS.length} AI Workflows — Connect Tools into Automations (2026)`}
        description="Step-by-step guides for chaining AI tools into working automations. Each workflow lists the tools involved, the difficulty, and roughly how long setup takes."
        url="/workflows"
        keywords={[
          'AI workflows',
          'AI automation guides',
          'connect AI tools',
          'Zapier AI workflow',
          'Make.com AI automation',
        ]}
        schema={[breadcrumbSchema([{ label: 'Workflows', path: '/workflows' }])]}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Workflows' }]} />

        <PageHeader
          eyebrow="Automation library"
          title={
            <>
              Tools are the parts. <em>Workflows are the machine.</em>
            </>
          }
          lede="Each guide chains several tools into one pipeline, with the steps written out in order so you can follow them rather than reverse-engineer a screenshot."
          meta={<span className="label-mono tabular-nums">{WORKFLOWS.length} workflows</span>}
        />

        {categories.length > 2 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`link-chip ${
                  activeCategory === cat ? '!border-[var(--color-primary)] !text-[var(--color-primary)]' : ''
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="link-chip__count">
                    {WORKFLOWS.filter((w) => w.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((wf) => (
            <li key={wf.id} className="flex">
              <Link
                to={`/workflows/${wf.id}`}
                className="card group flex w-full flex-col p-6 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={DIFFICULTY_STYLE[wf.difficulty] || 'badge'}>{wf.difficulty}</span>
                  <span className="flex items-center gap-1 text-[12px] font-semibold text-[var(--color-text-secondary)]">
                    <Star size={11} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                    <span className="tabular-nums">{wf.rating.toFixed(1)}</span>
                  </span>
                </div>

                <h2 className="title-sm mt-4 text-[17px] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
                  {wf.title}
                </h2>

                <p className="mt-2.5 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {wf.description}
                </p>

                {/* The tool chain is the useful bit — show it, don't hide it */}
                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  {wf.tools.slice(0, 4).map((tool, i) => (
                    <React.Fragment key={tool}>
                      {i > 0 && (
                        <span aria-hidden="true" className="text-[var(--color-text-muted)]">
                          →
                        </span>
                      )}
                      <span className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-[11.5px] text-[var(--color-text-secondary)]">
                        {tool}
                      </span>
                    </React.Fragment>
                  ))}
                </div>

                <div className="pt-4 mt-5 flex items-center justify-between border-t border-[var(--color-border)]">
                  <span className="label-mono flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} aria-hidden="true" /> {wf.timeToImplement}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Layers size={11} aria-hidden="true" /> {wf.steps.length} steps
                    </span>
                  </span>
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mt-12 text-[15px] text-[var(--color-text-secondary)]">
            No workflows filed under {activeCategory} yet.
          </p>
        )}
      </div>
    </main>
  );
};

export default Workflows;
