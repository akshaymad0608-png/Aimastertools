import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { blogPosts } from '../data/blogs';
import SEO from '../components/SEO';

const CategoryBadge = ({ label, bg, color }: { label: string, bg: string, color: string }) => (
  <span style={{
    display: "inline-block",
    fontSize: "10px", fontWeight: "600",
    padding: "3px 10px", borderRadius: "20px",
    background: bg, color: color,
    textTransform: "uppercase", letterSpacing: "0.4px",
    marginBottom: "8px"
  }}>{label}</span>
);

const BlogIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[var(--color-background)]">
      <SEO 
        title="AI Master Tools Blog - Insights, Guides & Prompt Engineering" 
        description="Stay updated with the latest in AI, tool reviews, and prompt engineering tutorials by Akshay Mahajan." 
      />
      <div className="container-custom mx-auto px-4 sm:px-6">
        
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] font-medium transition-colors mb-6 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-4 tracking-tight">AI Insights & Guides</h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
            Deep dives, tutorials, and the latest news in AI tools and prompt engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug || post.id}`}
              className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div 
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${post.catBg}, ${post.catColor})` }}
              >
                <div className="text-7xl group-hover:scale-110 transition-transform duration-500 filter drop-shadow-md">
                  {post.imgEmoji}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <CategoryBadge label={post.category} bg={post.catBg} color={post.catColor} />
                </div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--color-title-hover,var(--color-primary))] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Read Article</span>
                     <ArrowRight size={14} className="text-[var(--color-primary)]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-medium">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;
