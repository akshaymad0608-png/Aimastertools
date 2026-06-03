import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowUpRight, Code, Compass, Star } from 'lucide-react';
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
    { name: 'Compare AI', to: '/compare', icon: Code },
    { name: 'Bookmarks', to: '/bookmarks', icon: Star },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[var(--color-background)]/80 backdrop-blur-md border-b border-[var(--color-border)] shadow-lg shadow-black/5' 
        : 'bg-[var(--color-background)] border-b border-[var(--color-border)]/50'
    }`}>
      <nav className={`transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-3.5'}`}>
        <div className="container-custom max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6">
          
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
              <Logo size="md" />
            </Link>
          </div>

          {/* Desktop Navigation Link Cluster */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5 bg-[var(--color-surface)]/60 p-1 rounded-xl border border-[var(--color-border)] mr-2">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link 
                    key={i} 
                    to={link.to} 
                    className={`relative px-4 py-1.5 text-[14px] font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                      isActive 
                        ? 'text-[var(--color-primary)] bg-[var(--color-cardBg)] shadow-sm border border-[var(--color-border)]' 
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-cardBg)]/45'
                    }`}
                  >
                    <link.icon size={14} className="opacity-80" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)] hover:bg-[var(--color-border)] rounded-xl border border-[var(--color-border)] cursor-pointer transition-all active:scale-95 flex items-center justify-center shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-600" />}
            </button>

            {/* Premium CTA Button */}
            <Link 
              to="/submit"
              className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-[14px] shadow-[0_4px_12px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_20px_rgba(99,102,241,0.4)] active:scale-98 flex items-center gap-1.5 transition-all"
            >
              Submit Tool
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile Actions Overlay */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
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
              className="md:hidden absolute top-full left-0 w-full bg-[var(--color-background)] border-b border-[var(--color-border)] shadow-xl overflow-hidden backdrop-blur-md bg-opacity-95"
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
                    className="flex items-center justify-center w-full py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Submit Tool
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

export default Navbar;
