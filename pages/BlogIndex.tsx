import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BlogCoverImage } from '../components/BlogCoverImage';
import { breadcrumbSchema } from '../utils/seo';

/**
 * The previous version of this page rendered the same featured post three
 * times — the entire hero block was pasted in triplicate, all of it reading
 * blogPosts[0]. It also assigned authors by `parseInt(id) % 5` from a list of
 * five invented people ("Sarah Collins, AI Strategist"), attributing real
 * articles to staff who do not exist. Both are gone.
 */
const BlogIndex: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(BLOG_POSTS.map((p) => p.category).filter(Boolean))],
    [],
  );

  const posts = useMemo(
    () => (activeTag === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === activeTag)),
    [activeTag],
  );

  const [lead, ...rest] = posts;

  return (
    <main className="page-top min-h-screen bg-[var(--color-background)] pb-24">
      <SEO
        title="AI Tools Blog — Guides, Comparisons & Prompt Engineering (2026)"
        description={`${BLOG_POSTS.length} in-depth articles on choosing AI tools, comparing models, and writing prompts that hold up. Written and edited by hand.`}
        url="/blog"
        keywords={[
          'AI blog',
          'AI tool guides',
          'prompt engineering tutorial',
          'AI tool comparisons 2026',
          'how to choose AI tools',
        ]}
        schema={[breadcrumbSchema([{ label: 'Blog', path: '/blog' }])]}
      />

      <div className="container-custom">
        <Breadcrumbs items={[{ label: 'Blog' }]} />

        <PageHeader
          eyebrow="Writing"
          title={
            <>
              Notes from <em>inside the index</em>
            </>
          }
          lede="Longer pieces on picking between tools that all claim the same thing, and on getting more out of the ones you already pay for."
          meta={<span className="label-mono tabular-nums">{BLOG_POSTS.length} articles</span>}
        />

        {categories.length > 2 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveTag(c)}
                aria-pressed={activeTag === c}
                className={`link-chip ${
                  activeTag === c ? '!border-[var(--color-primary)] !text-[var(--color-primary)]' : ''
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Lead article */}
        {lead && (
          <article className="mt-10">
            <Link
              to={`/blog/${lead.slug || lead.id}`}
              className="card group grid gap-0 overflow-hidden lg:grid-cols-[1.15fr_1fr]"
            >
              <div className="border-b border-[var(--color-border)] lg:border-b-0 lg:border-r">
                <BlogCoverImage
                  category={lead.category}
                  title={lead.title}
                  imageUrl={lead.imageUrl}
                  variant="featured"
                  alt={lead.title}
                />
              </div>
              <div className="flex flex-col justify-center p-7 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="badge badge-primary">Latest</span>
                  <span className="label-mono">{lead.category}</span>
                  <span className="label-mono flex items-center gap-1.5">
                    <Clock size={11} aria-hidden="true" />
                    {lead.readTime || '5 min read'}
                  </span>
                </div>

                <h2 className="display-md mt-5 text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
                  {lead.title}
                </h2>

                <p className="mt-4 line-clamp-3 text-[15.5px] leading-relaxed text-[var(--color-text-secondary)]">
                  {lead.excerpt}
                </p>

                <span className="mt-7 flex items-center gap-2 border-t pt-5 border-[var(--color-border)] text-[13px] font-semibold text-[var(--color-primary)]">
                  Read the article
                  <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </article>
        )}

        {/* The rest */}
        {rest.length > 0 && (
          <section className="mt-16" aria-labelledby="more-articles">
            <h2 id="more-articles" className="rule-label mb-6">
              More articles
            </h2>
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.id} className="flex">
                  <Link
                    to={`/blog/${post.slug || post.id}`}
                    className="card group flex w-full flex-col overflow-hidden transition-transform hover:-translate-y-0.5"
                  >
                    <BlogCoverImage
                      category={post.category}
                      title={post.title}
                      imageUrl={post.imageUrl}
                      variant="card"
                      alt={post.title}
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <span className="label-mono flex items-center gap-1.5">
                        <Clock size={11} aria-hidden="true" />
                        {post.readTime || '5 min read'}
                        <span aria-hidden="true">·</span>
                        {post.date}
                      </span>

                      <h3 className="title-sm mt-3 line-clamp-2 text-[17px] text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)]">
                        {post.title}
                      </h3>

                      <p className="mt-2.5 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-[var(--color-text-secondary)]">
                        {post.excerpt}
                      </p>

                      <span className="mt-5 flex items-center gap-1.5 border-t pt-4 border-[var(--color-border)] text-[12.5px] font-semibold text-[var(--color-primary)]">
                        Read
                        <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {posts.length === 0 && (
          <p className="mt-12 text-[15px] text-[var(--color-text-secondary)]">
            Nothing filed under {activeTag} yet.
          </p>
        )}
      </div>
    </main>
  );
};

export default BlogIndex;
