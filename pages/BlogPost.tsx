import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../constants';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = BLOG_POSTS.find(p => p.id === id);

  useEffect(() => {
    if (!post) {
      navigate('/');
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
        image={post.imageUrl}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.imageUrl,
            "datePublished": post.date, // Assuming date is in a parseable format or just a string for now
            "author": {
              "@type": "Organization",
              "name": "AIMasterTools"
            },
            "publisher": {
              "@type": "Organization",
              "name": "AIMasterTools",
              "logo": {
                "@type": "ImageObject",
                "url": "https://aimastertools.space/logo.png" // Placeholder
              }
            }
          })}
        </script>
      </SEO>
      
      <div className="pt-32 pb-24 min-h-screen">
        <div className="container-custom max-w-4xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-8 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Home
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed border-l-4 border-[var(--color-primary)] pl-6 italic">
                {post.excerpt}
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden mb-12 border border-[var(--color-border)] shadow-2xl">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div 
              className="prose prose-lg prose-invert max-w-none text-[var(--color-text-secondary)] 
                prose-headings:text-[var(--color-text-primary)] prose-headings:font-bold
                prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[var(--color-text-primary)]
                prose-code:text-[var(--color-accent)] prose-code:bg-[var(--color-surface)] prose-code:px-1 prose-code:rounded
                prose-blockquote:border-l-[var(--color-primary)] prose-blockquote:bg-[var(--color-surface)]/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex justify-between items-center">
              <div className="text-[var(--color-text-muted)]">
                Thanks for reading!
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-primary)]/10 text-[var(--color-text-primary)] transition-colors border border-[var(--color-border)]">
                <Share2 size={18} /> Share Article
              </button>
            </div>
          </motion.article>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
