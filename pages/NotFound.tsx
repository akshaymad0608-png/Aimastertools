import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24">
      <SEO 
        title="404 - Page Not Found | AI Master Tools" 
        description="The page you are looking for does not exist." 
      />
      
      <div className="text-center max-w-lg mx-auto">
        <div className="relative mb-8 inline-block">
          <div className="text-9xl font-extrabold text-[var(--color-text-primary)] opacity-10">404</div>
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-[var(--color-primary)]">
            Page Not Found
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          Oops! We couldn't find that page.
        </h1>
        
        <p className="text-[var(--color-text-secondary)] mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <button 
            onClick={() => {
              const searchEvent = new KeyboardEvent('keydown', {
                key: 'k',
                metaKey: true,
              });
              window.dispatchEvent(searchEvent);
            }}
            className="px-6 py-3 rounded-lg font-semibold bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Search size={18} />
            Search Tools
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
