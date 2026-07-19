import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { breadcrumbSchema, itemListSchema } from '../utils/seo';
import { MOCK_TOOLS } from '../data/tools';
import { TOOL_COUNT, CATEGORY_COUNT } from '../utils/stats';

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const sorted = useMemo(() => [...CATEGORIES].sort((a, b) => b.count - a.count), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter((c) => c.name.toLowerCase().includes(q));
  }, [sorted, query]);

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={`All ${CATEGORY_COUNT} AI Tool Categories (2026) — Browse by Use Case`}
        description={`Every category in the index, from writing and image generation to workflow automation. ${TOOL_COUNT} AI tools sorted by what they actually do, with real counts and ratings.`}
        url="/categories"
        keywords={[
          'AI tool categories',
          'AI tools by use case',
          'types of AI tools',
          'AI software categories 2026',
          ...sorted.slice(0, 10).map((c) => `${c.name} AI tools`),
        ]}
        schema={[
          breadcrumbSchema([{ label: 'Categories', path: '/categories' }]),
          itemListSchema(MOCK_TOOLS.slice(0, 20), 'AI tool categories'),
        ]}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Categories' }]} />

        <PageHeader
          eyebrow="The drawers"
          title="Every category in the index"
          lede={`${TOOL_COUNT} tools, filed into ${CATEGORY_COUNT} categories by the job they do rather than the technology behind them. Counts are live — a category disappears when it empties.`}
          action={
            <div className="relative">
              <Search
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <label htmlFor="cat-filter" className="sr-only">
                Filter categories
              </label>
              <input
                id="cat-filter"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter categories…"
                className="h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-cardBg)] pl-10 pr-4 text-[14px] text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] md:w-72"
              />
            </div>
          }
        />

        {visible.length > 0 ? (
          <>
            <p className="label-mono mt-8 tabular-nums">
              {visible.length} {visible.length === 1 ? 'category' : 'categories'}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {!query && (
                <CategoryCard
                  name="All AI tools"
                  count={TOOL_COUNT}
                  color="var(--color-primary)"
                  description="The complete index, unfiltered and sorted by rating."
                  onClick={() => navigate('/')}
                />
              )}
              {visible.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  name={cat.name}
                  color={cat.color}
                  count={cat.count}
                  description={`Compare ${cat.count} ${cat.name.toLowerCase()} tools on price and rating.`}
                  onClick={() => navigate(`/category/${cat.slug}`)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] px-6 py-16 text-center">
            <p className="text-[17px] font-semibold text-[var(--color-text-primary)]">
              No category matches “{query}”
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[14px] text-[var(--color-text-secondary)]">
              Try searching the tools themselves instead — the name you want may be a tag.
            </p>
            <Link to="/" className="btn-secondary mt-6 h-10 px-5 text-[13px]">
              Search all tools
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Categories;
