import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Share2, ArrowLeft, Clock, Calendar, Bookmark, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import { BLOG_POSTS as blogPosts } from '../data/blogs';
import ReactMarkdown from 'react-markdown';
import { BlogCoverImage } from '../components/BlogCoverImage';

// Helper to render responsive category badges
const CategoryBadge = ({ label }: { label: string }) => (
  <span className="inline-flex text-[11px] font-extrabold px-3 py-1.5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/20 uppercase tracking-widest shadow-sm">
    {label}
  </span>
);

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the post by slug first, then by id string matching just in case
  const post = blogPosts.find(p => p.slug === id || p.id.toString() === id);

  useEffect(() => {
    if (!post) {
      navigate('/#blog');
    }
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) return null;

  // Curated premium mock authors for maximum design consistency
  const getAuthorByPostId = (idStr: string) => {
    const id = parseInt(idStr) || 1;
    const list = [
      { name: "Akshay Mahajan", initials: "AM", role: "Founder & Lead", bg: "bg-blue-500/10 text-blue-500 ring-blue-500/20" },
      { name: "Sarah Collins", initials: "SC", role: "AI Strategist", bg: "bg-rose-500/10 text-rose-500 ring-rose-500/20" },
      { name: "Arjun Mehta", initials: "AM", role: "NLP Engineer", bg: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" },
      { name: "Lina Vance", initials: "LV", role: "UX Designer", bg: "bg-violet-500/10 text-violet-500 ring-violet-500/20" },
      { name: "Marcus Thorne", initials: "MT", role: "Cloud Architect", bg: "bg-amber-500/10 text-amber-500 ring-amber-500/20" },
    ];
    return list[id % list.length];
  };

  const author = getAuthorByPostId(post.id);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed', err);
        }
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO 
        title={`${post.title} - AIMasterTools Blog`}
        description={post.excerpt}
        keywords={['AI', 'Blog', 'Technology', 'Trends', post.category]}
        type="article"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": new Date(post.date).toISOString(),
            "author": {
              "@type": "Person",
              "name": author.name,
              "url": "https://aimastertools.space"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AI Master Tools",
              "logo": {
                "@type": "ImageObject",
                "url": "https://aimastertools.space/favicon.svg"
              }
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://aimastertools.space/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://aimastertools.space/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": "https://aimastertools.space/blog/" + (post.slug || post.id)
              }
            ]
          })}
        </script>
      </SEO>
      
      <div className="pt-32 pb-20 md:pt-40 lg:pt-44 md:pb-28 min-h-screen bg-[var(--color-background)]">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6">
          
          {/* Back link */}
          <div className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] font-bold transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Insights Feed</span>
            </Link>
          </div>

          {/* Heading Metadata */}
          <div className="mb-6 flex items-center gap-2">
            <CategoryBadge label={post.category} />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Author Meta Details Card */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-10">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full ring-2 ring-current/10 ${author.bg} flex items-center justify-center font-bold text-sm`}>
                {author.initials}
              </div>
              <div>
                <div className="text-sm font-black text-[var(--color-text-primary)]">{author.name}</div>
                <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{author.role}</div>
              </div>
            </div>

            {/* Timings row */}
            <div className="flex items-center gap-4 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider font-mono">
              <div className="flex items-center gap-1">
                <Calendar size={13} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={13} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Hero cover illustration - replacing plain emoji */}
          <div className="w-full h-[220px] sm:h-[300px] lg:h-[360px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/10 mb-12 relative group">
            <BlogCoverImage 
              category={post.category} 
              title={post.title} 
              imageUrl={(post as any).imageUrl}
              variant="featured"
              alt={post.title}
            />
          </div>

          {/* Content rendering */}
          <article className="blog-content prose dark:prose-invert max-w-none text-[var(--color-text-primary)] leading-relaxed text-base sm:text-lg">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>

          {/* Action Footer share clusters */}
          <div className="mt-14 pt-8 border-t border-[var(--color-border)]/60 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider font-mono">
              ⚡ Verified engineering resources by Akshay Mahajan
            </div>
            
            <div className="flex gap-2.5">
              <button 
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-xs text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
              >
                <Share2 size={15} /> 
                <span>Share Insight</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BlogPost;
