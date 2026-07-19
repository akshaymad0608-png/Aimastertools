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

        <PageHeader
          eyebrow="Category"
          title={
            <>
              Best <em>{category.name}</em> AI tools
            </>
          }
          lede={`${tools.length} tools filed under ${category.name}, ranked by rating. Every entry lists real pricing and what it is actually good at.`}
          action={
            <span
              aria-hidden="true"
              className="grid h-16 w-16 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <CategoryIcon name={category.name} color={category.color} size={28} />
            </span>
          }
          meta={
            <>
              <span className="label-mono tabular-nums">{tools.length} tools</span>
              <span className="label-mono tabular-nums">{free} free or open source</span>
              <span className="label-mono tabular-nums">avg rating {avg}</span>
            </>
          }
        />

        {tools.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool, i) => (
              <li key={tool.id}>
                <ToolCard tool={tool} rank={i + 1} layout="vertical" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border-strong)] px-6 py-16 text-center">
            <LayoutGrid size={26} className="mx-auto mb-4 text-[var(--color-text-muted)]" />
            <p className="title-sm text-[17px] text-[var(--color-text-primary)]">
              Nothing filed here yet
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[14px] text-[var(--color-text-secondary)]">
              This category is empty, so it is excluded from search engines until it has entries.
            </p>
          </div>
        )}

        <section className="mt-20" aria-labelledby="related-cats">
          <h2 id="related-cats" className="rule-label mb-5">
            Related categories
          </h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((c) => (
              <li key={c.id}>
                <Link to={`/category/${c.slug}`} className="link-chip">
                  <CategoryIcon name={c.name} color={c.color} size={14} />
                  {c.name}
                  <span className="link-chip__count">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;
