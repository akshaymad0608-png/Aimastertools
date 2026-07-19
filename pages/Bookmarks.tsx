import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Search, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';
import PageHeader from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import CategoryIcon from '../components/CategoryIcon';
import { useBookmarks } from '../context/BookmarkContext';
import { MOCK_TOOLS } from '../data/tools';

type SortKey = 'rating' | 'name' | 'pricing';

const Bookmarks: React.FC = () => {
  const { bookmarks } = useBookmarks();
  const [sort, setSort] = useState<SortKey>('rating');
  const [activeCategory, setActiveCategory] = useState('All');

  const saved = useMemo(
    () => MOCK_TOOLS.filter((tool) => bookmarks.includes(tool.id)),
    [bookmarks],
  );

  /** Categories present in the saved set — no point offering empty filters. */
  const categories = useMemo(
    () => ['All', ...new Set(saved.map((t) => t.category).filter(Boolean))],
    [saved],
  );

  const visible = useMemo(() => {
    const list = activeCategory === 'All' ? saved : saved.filter((t) => t.category === activeCategory);
    return [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'pricing') return a.pricing.localeCompare(b.pricing);
      return b.rating - a.rating;
    });
  }, [saved, activeCategory, sort]);

  const free = saved.filter((t) => t.pricing === 'Free' || t.pricing === 'Open Source').length;

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title="My saved AI tools — AI Master Tools"
        description="Your saved shortlist of AI tools, kept on this device."
        url="/bookmarks"
        noindex
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Saved' }]} />

        <PageHeader
          eyebrow="Your shortlist"
          title={
            <>
              Tools you <em>kept</em>
            </>
          }
          lede={
            saved.length
              ? 'Saved on this device only — no account, and nothing leaves your browser.'
              : 'Nothing saved yet. The bookmark icon on any tool card adds it here.'
          }
          meta={
            saved.length ? (
              <>
                <span className="label-mono tabular-nums">{saved.length} saved</span>
                <span className="label-mono tabular-nums">{free} free or open source</span>
                <span className="label-mono tabular-nums">{categories.length - 1} categories</span>
              </>
            ) : undefined
          }
          action={
            saved.length ? (
              <Link to="/compare" className="btn-secondary h-11 whitespace-nowrap px-5">
                Compare two of them <ArrowRight size={15} />
              </Link>
            ) : undefined
          }
        />

        {saved.length === 0 ? (
          <div className="mt-12 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] px-6 py-20 text-center">
            <Bookmark size={30} className="mx-auto mb-5 text-[var(--color-text-muted)]" />
            <p className="title-sm text-[18px] text-[var(--color-text-primary)]">
              Your shortlist is empty
            </p>
            <p className="mx-auto mt-2.5 max-w-md text-[14.5px] leading-relaxed text-[var(--color-text-secondary)]">
              As you browse, hit the bookmark icon on anything worth a second look. The list
              lives in this browser, so it will not follow you to another device.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/" className="btn-primary h-11 px-5">
                <Search size={15} /> Browse the directory
              </Link>
              <Link to="/find" className="btn-secondary h-11 px-5">
                Answer three questions
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {categories.length > 2 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      aria-pressed={activeCategory === c}
                      className={`link-chip ${
                        activeCategory === c
                          ? '!border-[var(--color-primary)] !text-[var(--color-primary)]'
                          : ''
                      }`}
                    >
                      {c !== 'All' && <CategoryIcon name={c} size={13} />}
                      {c}
                    </button>
                  ))}
                </div>
              )}

              <div className="ml-auto flex items-center gap-2">
                <label htmlFor="saved-sort" className="label-mono">
                  Sort
                </label>
                <select
                  id="saved-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-9 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] px-3 text-[13px] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="rating">Highest rated</option>
                  <option value="name">Name A–Z</option>
                  <option value="pricing">Pricing</option>
                </select>
              </div>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((tool, i) => (
                <li key={tool.id}>
                  <ToolCard tool={tool} rank={i + 1} layout="vertical" />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
};

export default Bookmarks;
