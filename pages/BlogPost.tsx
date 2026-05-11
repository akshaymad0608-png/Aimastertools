import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogs';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Try to find the post by slug first, then by id string matching just in case
  const post = blogPosts.find(p => p.slug === id || p.id.toString() === id);

  useEffect(() => {
    if (!post) {
      navigate('/#blog');
    }
    window.scrollTo(0, 0);
  }, [post, navigate]);

  if (!post) return null;

  return (
    <>
      <SEO 
        title={`${post.title} - AIMasterTools Blog`}
        description={post.excerpt}
        keywords={['AI', 'Blog', 'Technology', 'Trends']}
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
              "name": "AI Master Tools",
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
                "item": "https://aimastertools.space/#blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": "https://aimastertools.space/blog/" + post.id
              }
            ]
          })}
        </script>
      </SEO>
      
      <div className="pt-32 pb-24 min-h-screen bg-white">
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
          
          {/* Back link */}
          <Link to="/#blog" style={{ fontSize: "13px", color: "#534AB7", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
            ← Back to Blog
          </Link>

          {/* Category badge */}
          <div>
            <span style={{
              display: "inline-block", fontSize: "11px", fontWeight: "600",
              padding: "4px 12px", borderRadius: "20px", marginBottom: "14px",
              background: post.catBg, color: post.catColor,
              textTransform: "uppercase", letterSpacing: "0.4px"
            }}>
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#1a1a2e", lineHeight: "1.3", marginBottom: "12px" }}>
            {post.title}
          </h1>

          {/* Meta */}
          <div style={{ fontSize: "13px", color: "#888", marginBottom: "28px" }}>
            {post.date} &nbsp;·&nbsp; {post.readTime}
          </div>

          {/* Hero image */}
          <div style={{
            width: "100%", height: "260px", borderRadius: "16px",
            background: post.imgBg, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "80px", marginBottom: "36px"
          }}>
            {post.imgEmoji}
          </div>

          {/* Content */}
          <div className="blog-content" style={{ fontSize: "15px", lineHeight: "1.8", color: "#333" }}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex justify-between items-center">
            <div className="text-[var(--color-text-muted)]">
              Thanks for reading!
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-primary)]/10 text-[var(--color-text-primary)] transition-colors border border-[var(--color-border)]">
              <Share2 size={18} /> Share Article
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
