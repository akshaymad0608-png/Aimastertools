import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { MOCK_TOOLS } from '../../data/tools';
import { Tool } from '../../types';
import ToolLogo from '../ToolLogo';

/**
 * The editors' shelf. Presented as a scrollable rail of index cards rather
 * than an auto-playing marquee: a marquee that never stops is impossible to
 * read, impossible to tab through, and moves the thing you are aiming at.
 */
const ShelfCard: React.FC<{ tool: Tool; rank: number }> = ({ tool, rank }) => (
  <Link
    to={`/tool/${tool.id}`}
    className="spine card group flex w-[280px] flex-col p-5 pl-6 sm:w-[320px]"
    style={{ ['--spine-color' as any]: tool.brandColor || 'var(--color-primary)' }}
  >
    <div className="flex items-start justify-between gap-3">
      <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1">
        <ToolLogo domain={tool.domain} brandColor={tool.brandColor} name={tool.name} className="h-full w-full" />
      </span>
      <span className="label-mono tabular-nums">{String(rank).padStart(2, '0')}</span>
    </div>

    <h3 className="title-sm mt-4 text-[17px] font-semibold leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
      {tool.name}
    </h3>

    <p className="label-mono mt-1.5 truncate">{tool.category}</p>

    <p className="mt-3 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
      {tool.description}
    </p>

    <div className="mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
      <span className="flex items-center gap-3">
        <span className="badge">{tool.pricing}</span>
        <span className="flex items-center gap-1 text-[12px] font-semibold text-[var(--color-text-secondary)]">
          <Star size={11} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
          <span className="tabular-nums">{tool.rating.toFixed(1)}</span>
        </span>
      </span>
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="text-[var(--color-text-muted)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
      />
    </div>
  </Link>
);

export const FeaturedCarousel: React.FC = () => {
  const featured = React.useMemo(() => {
    const picked = MOCK_TOOLS.filter((t) => t?.featured).sort((a, b) => b.rating - a.rating);
    const pool = picked.length >= 6 ? picked : [...MOCK_TOOLS].sort((a, b) => b.rating - a.rating);
    return pool.slice(0, 12);
  }, []);

  return (
    <section className="section section-rule" aria-labelledby="editors-picks">
      <div className="container-custom">
        <div className="section-head">
          <div className="section-head__title">
            <p className="eyebrow">Editors' picks</p>
            <h2 id="editors-picks" className="display-lg mt-4 text-[var(--color-text-primary)]">
              Where to start, if you only have <em>ten minutes</em>.
            </h2>
            <p className="section-head__lede">
              Twelve entries we keep coming back to. Each one has been opened, priced and
              checked against what it actually claims to do.
            </p>
          </div>
          <Link to="/?tab=Featured" className="btn-secondary h-11 shrink-0 whitespace-nowrap px-5">
            All featured tools <ArrowRight size={16} />
          </Link>
        </div>

        <ul className="rail -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {featured.map((tool, i) => (
            <li key={tool.id} className="flex">
              <ShelfCard tool={tool} rank={i + 1} />
            </li>
          ))}
        </ul>
        <p className="label-mono mt-4">Scroll for more &rarr;</p>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
