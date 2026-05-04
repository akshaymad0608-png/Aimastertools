import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, Heart, Grid } from 'lucide-react';
import SEO from '../components/SEO';
import ToolCard from '../components/ToolCard';
import { useBookmarks } from '../context/BookmarkContext';
import { usePro } from '../context/ProContext';
import { MOCK_TOOLS } from '../constants';

const Bookmarks: React.FC = () => {
  const { bookmarks } = useBookmarks();
  const { isPro } = usePro();

  const bookmarkedTools = useMemo(() => {
    return MOCK_TOOLS.filter(tool => bookmarks.includes(tool.id));
  }, [bookmarks]);

  return (
    <>
      <SEO 
        title="My Bookmarked Tools | AI Master Tools" 
        description="View your saved and bookmarked AI tools to access them quickly later."
      />
      
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 container-custom mx-auto px-6 relative min-h-screen">
        {/* Background Glow */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-10 rounded-full -z-10 pointer-events-none"></div>

        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-6 font-medium">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--color-text-primary)] tracking-tight flex items-center gap-4">
              <div className="p-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-2xl border border-[var(--color-primary)]/20 shadow-inner">
                <Heart size={32} className="fill-[var(--color-primary)]" />
              </div>
              My Favorites
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              Your personally curated collection of AI tools. {!isPro && (
                <span className="block mt-1 text-sm text-amber-500 font-medium bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20 inline-block">
                  Free Plan: {bookmarks.length} / 5 bookmarks used. <Link to="/pricing" className="underline hover:text-amber-400">Upgrade</Link> for unlimited.
                </span>
              )}
            </p>
          </div>
        </div>

        {bookmarkedTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {bookmarkedTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="mt-12 glass-panel border border-[var(--color-border)] rounded-3xl p-12 text-center flex flex-col items-center max-w-3xl mx-auto shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-24 h-24 bg-[var(--color-surface)] rounded-full flex items-center justify-center border border-[var(--color-border)] mb-6 shadow-inner">
              <Bookmark size={40} className="text-[var(--color-text-muted)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3 tracking-tight">No tools saved yet</h3>
            <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-8 text-lg leading-relaxed">
              When you find an AI tool you want to remember, click the bookmark icon on its card to save it here for quick access later.
            </p>
            <Link 
              to="/discover" 
              className="btn-primary"
            >
              <Grid size={18} className="mr-2 inline" /> Discover AI Tools
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
