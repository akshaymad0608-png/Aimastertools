import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import { MOCK_TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import ToolCard from '../components/ToolCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import CategoryIcon from '../components/CategoryIcon';
import { findBySlug } from '../utils/slug';
import {
  breadcrumbSchema,
  itemListSchema,
  categoryTitle,
  categoryDescription,
  categoryKeywords,
} from '../utils/seo';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = useMemo(() => findBySlug(CATEGORIES, slug), [slug]);

  const tools = useMemo(() => {
    if (!category) return [];
    return MOCK_TOOLS.filter((t) => t.category === category.id).sort((a, b) => b.rating - a.rating);
  }, [category]);

  const related = useMemo(
    () => CATEGORIES.filter((c) => c.id !== category?.id).slice(0, 8),
    [category],
  );

  if (!category) {
    return (
      <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
        <SEO
          title="Category not found — AI Master Tools"
          description="That category does not exist. Browse all AI tool categories instead."
          url={`/category/${slug ?? ''}`}
          noindex
        />
        <div className="container-custom max-w-2xl text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="display-lg mt-5 text-[var(--color-text-primary)]">
            No category called <em>“{slug}”</em>
          </h1>
          <p className="prose-lede mx-auto mt-5">
            It may have been renamed, or merged into another drawer of the index.
          </p>
          <Link to="/categories" className="btn-primary mt-8 h-11 px-6">
            Browse all categories <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  const free = tools.filter((t) => t.pricing === 'Free' || t.pricing === 'Open Source').length;
  const avg = tools.length
    ? (tools.reduce((s, t) => s + t.rating, 0) / tools.length).toFixed(2)
    : '—';

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title={categoryTitle(category.name, tools.length)}
        description={categoryDescription(category.name, tools.length)}
        url={`/category/${category.slug}`}
        keywords={categoryKeywords(category.name)}
        noindex={tools.length === 0}
        schema={[
          breadcrumbSchema([
            { label: 'Categories', path: '/categories' },
            { label: category.name, path: `/category/${category.slug}` },
          ]),
          itemListSchema(tools.slice(0, 25), `Best ${category.name} AI tools`),
        ]}
      />

      <div className="container-custom">
        <Breadcrumbs
          items={[{ label: 'Categories', path: '/categories' }, { label: category.name }]}
        />

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[236px_minmax(0,1fr)]">
          {/* Category sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="label-mono mb-2.5">Categories</p>
            <nav className="flex gap-1.5 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
              <Link
                to="/"
                className="flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-[13.5px] font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
              >
                All tools <ArrowRight size={13} aria-hidden="true" />
              </Link>
              {CATEGORIES.map((c) => {
                const active = c.id === category.id;
                return (
                  <Link
                    key={c.id}
                    to={`/category/${c.slug}`}
                    aria-current={active ? 'page' : undefined}
                    className={`flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-[13.5px] font-medium transition-colors ${active ? 'bg-[var(--color-primary-fill)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'}`}
                  >
                    <span className="truncate">{c.name}</span>
                    <span className={`text-[11px] tabular-nums ${active ? 'text-white' : 'text-[var(--color-text-muted)]'}`}>{c.count}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main column */}
          <div>
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="grid h-14 w-14 shrink-0 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <CategoryIcon name={category.name} color={category.color} size={26} />
              </span>
              <div>
                <p className="eyebrow">Category</p>
                <h1 className="display-md mt-1.5 text-[var(--color-text-primary)]">
                  Best <em>{category.name}</em> AI tools
                </h1>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
              {tools.length} tools filed under {category.name}, ranked by rating. Every entry lists real
              pricing and what it is actually good at.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <span className="label-mono tabular-nums">{tools.length} tools</span>
              <span className="label-mono tabular-nums">{free} free or open source</span>
              <span className="label-mono tabular-nums">avg rating {avg}</span>
            </div>

            {tools.length > 0 ? (
              <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool, i) => (
                  <li key={tool.id}>
                    <ToolCard tool={tool} rank={i + 1} layout="vertical" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] px-6 py-16 text-center">
                <LayoutGrid size={26} className="mx-auto mb-4 text-[var(--color-text-muted)]" />
                <p className="title-sm text-[17px] text-[var(--color-text-primary)]">
                  Nothing filed here yet
                </p>
                <p className="mx-auto mt-2 max-w-sm text-[14px] text-[var(--color-text-secondary)]">
                  This category is empty, so it is excluded from search engines until it has entries.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
