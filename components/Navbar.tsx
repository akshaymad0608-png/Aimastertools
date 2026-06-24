import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUpRight, Code, Compass, Star, Grid, FileText, User, Sparkles, GitCompare } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
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
    { name: 'AI Prompts', to: '/prompts', icon: Code },
    { name: 'Compare', to: '/compare', icon: GitCompare },
    { name: 'Categories', to: '/categories', icon: Grid },
    { name: 'Blog', to: '/blog', icon: FileText },
    { name: 'Bookmarks', to: '/bookmarks', icon: Star },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[var(--color-background)]/75 backdrop-blur-xl border-b border-[var(--color-border)] shadow-sm' 
        : 'bg-transparent'
    }`}>
      <nav className={`transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className="container-custom max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6">
          
          {/* Logo & Subtitle */}
          <div className="flex flex-col">
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
              <Logo size="md" />
            </Link>
            <span className="hidden md:block text-[10px] font-medium text-[var(--color-text-muted)] tracking-wider uppercase mt-0.5 ml-[38px]">
              Discover • Compare • Find
            </span>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-[var(--color-surface)]/50 backdrop-blur-md px-1.5 py-1.5 rounded-2xl border border-[var(--color-border)] shadow-sm">
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
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)]/50 backdrop-blur-sm hover:bg-[var(--color-border)] rounded-full border border-[var(--color-border)] cursor-pointer transition-all active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-400" />}
            </button>

            {/* Profile Button */}
            <button
              className="p-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)]/50 backdrop-blur-sm hover:bg-[var(--color-border)] rounded-full border border-[var(--color-border)] cursor-pointer transition-all active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="User Profile"
            >
               <User size={17} />
            </button>

            {/* Premium CTA Button */}
            <Link 
              to="/submit"
              className="relative px-5 py-2.5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-background)] hover:opacity-90 font-bold text-sm shadow-md active:scale-95 flex items-center gap-1.5 transition-all"
            >
              <Sparkles size={14} className="text-yellow-400" />
              Submit Tool
            </Link>
          </div>

          {/* Mobile Actions Overlay */}
          <div className="md:hidden flex items-center gap-2">
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden absolute top-full left-0 w-full bg-[var(--color-background)]/95 border-b border-[var(--color-border)] shadow-xl overflow-hidden backdrop-blur-xl"
            >
              <div className="p-4 flex flex-col gap-2.5">
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
                
                <div className="pt-3 mt-1.5 border-t border-[var(--color-border)]">
                  <Link 
                    to="/submit" 
                    className="flex items-center justify-center w-full py-3.5 rounded-xl font-extrabold text-sm bg-[var(--color-text-primary)] text-[var(--color-background)] shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Sparkles size={16} className="text-yellow-400 mr-2" /> Submit Tool
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

// Add missing icon
const GitCompareIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></svg>
)

export default Navbar;
