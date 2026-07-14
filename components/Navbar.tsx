import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUpRight, Code, Compass, Star, Grid, FileText, User, Sparkles, GitCompare, GitMerge, Share2, Check } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';


const Navbar: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);
  
  const handleShare = async () => {
    const shareData = {
      title: 'AI Master Tools',
      text: 'Find, compare, and review the best AI tools and software.',
      url: window.location.origin,
    };
    
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setIsSharing(true);
        
        setTimeout(() => setIsSharing(false), 2000);
      } catch (err) {
        console.error('Failed to copy!', err);
      }
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Directory', to: '/', icon: Compass },
    { name: 'Categories', to: '/categories', icon: Grid },
    { name: 'Prompts', to: '/prompts', icon: Code },
    { name: 'Workflows', to: '/workflows', icon: GitMerge },
    { name: 'Find Tool', to: '/find', icon: Sparkles },
    { name: 'Blog', to: '/blog', icon: FileText },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[var(--color-background)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/50 shadow-sm py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex flex-col relative">
          <div className="flex justify-between items-center w-full">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-3 transition-transform duration-200 active:scale-95" 
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <Logo size="sm" />
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-1 glass-nav px-1.5 py-1.5 rounded-2xl border border-[var(--color-border)] shadow-sm">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to;
              return (
                <Link 
                  key={i} 
                  to={link.to} 
                  className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                    isActive 
                      ? 'text-[var(--color-primary)] bg-[var(--color-cardBg)] shadow-sm border border-[var(--color-border)]' 
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-cardBg)]/60'
                  }`}
                >
                  <link.icon size={15} className={isActive ? 'text-[var(--color-primary)]' : 'opacity-70'} />
                  {link.name}
                </Link>
              );
            })}
          </div>
          
          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
                        {/* Share Site Button */}
            <button
              onClick={handleShare}
              className="p-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)]/50 backdrop-blur-sm hover:bg-[var(--color-border)] rounded-full border border-[var(--color-border)] cursor-pointer transition-all active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="Share Site"
              title="Share AI Master Tools"
            >
              {isSharing ? <Check size={17} className="text-green-500" /> : <Share2 size={17} />}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)]/50 backdrop-blur-sm hover:bg-[var(--color-border)] rounded-full border border-[var(--color-border)] cursor-pointer transition-all active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-400" />}
            </button>


          </div>

          {/* Mobile Actions Overlay */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] cursor-pointer"
              aria-label="Share Site Mobile"
            >
              {isSharing ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-400" />}
            </button>
            <button 
              className="text-[var(--color-text-primary)] p-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] cursor-pointer" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Improved Premium Dropdown Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-[calc(100%+1.5rem)] left-0 right-0 bg-[var(--color-cardBg)]/95 border border-[var(--color-border)] shadow-2xl rounded-2xl overflow-hidden backdrop-blur-2xl origin-top"
            >
              <div className="p-3 flex flex-col gap-1.5">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link 
                      key={i} 
                      to={link.to} 
                      className={`flex items-center gap-3 p-3.5 rounded-xl font-bold text-sm transition-all ${
                        isActive 
                          ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20' 
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] border border-transparent'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <link.icon size={16} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      </div>
    </header>
  );
};

// Add missing icon
export default Navbar;
