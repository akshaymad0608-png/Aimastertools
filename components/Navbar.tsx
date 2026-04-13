import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Menu, X, Plus, ChevronRight, Users, Star, Heart, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePro } from '../context/ProContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import Logo from './Logo';
import { MOCK_TOOLS } from '../constants';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [liveVisitors, setLiveVisitors] = useState(1243);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { isPro } = usePro();
  const { theme, toggleTheme } = useTheme();
  const { currentUser, login, logout } = useAuth();

  const trendingItems = useMemo(() => {
    return MOCK_TOOLS
      .filter(t => t.featured)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6)
      .map(t => `${t.name}: ${t.category} AI`);
  }, []);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Simulate live visitor count fluctuating
    const interval = setInterval(() => {
      setLiveVisitors(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(1000, prev + change);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = isHome ? [
    { name: 'AI Categories', onClick: () => scrollToSection('categories') },
    { name: 'Compare AI Tools', to: '/compare' },
    { name: 'Discover More', to: '/discover' },
    { name: 'AI Blog', onClick: () => scrollToSection('blog') },
    ...(isPro ? [] : [{ name: 'Pricing', to: '/pricing' }]),
  ] : [
    { name: 'AI Categories', to: '/#categories' },
    { name: 'Compare AI Tools', to: '/compare' },
    { name: 'Discover More', to: '/discover' },
    { name: 'AI Blog', to: '/#blog' },
    ...(isPro ? [] : [{ name: 'Pricing', to: '/pricing' }]),
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Trending Ticker */}
      <div className="bg-[var(--color-primary)]/10 backdrop-blur-md border-b border-[var(--color-primary)]/20 py-1 sm:py-1.5 overflow-hidden">
        <div className="container-custom flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 py-0.5 rounded bg-[var(--color-primary)] text-white text-[8px] sm:text-[10px] font-bold uppercase tracking-widest animate-pulse whitespace-nowrap">
            Trending Now
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="animate-marquee whitespace-nowrap flex gap-6 sm:gap-12 items-center will-change-transform transform-gpu">
              {trendingItems.map((text, i) => (
                <span key={i} className="text-[11px] font-bold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]"></span>
                  {text}
                </span>
              ))}
              {/* Duplicate for seamless loop */}
              {trendingItems.map((text, i) => (
                <span key={i + 10} className="text-[11px] font-bold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]"></span>
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className={`transition-all duration-300 border-b ${scrolled ? 'bg-[var(--color-background)]/95 backdrop-blur-lg border-[var(--color-border)] py-3 shadow-sm' : 'bg-[var(--color-background)]/90 backdrop-blur-md border-[var(--color-border)]/50 py-4'}`}>
      <div className="container-custom flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group" 
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              setIsMobileMenuOpen(false);
            }}
          >
            {!imageError ? (
              <img 
                src="/logo.png" 
                alt="AIMasterTools Logo" 
                width="200"
                height="48"
                fetchPriority="high"
                decoding="async"
                className="h-8 sm:h-10 md:h-12 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col justify-center items-center ml-1 sm:ml-2">
                <span className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-none flex items-center">
                  <span className="text-[#0ea5e9]">AI</span>
                  <span className="text-[var(--color-text-primary)]">MasterTools</span>
                </span>
                <div className="flex items-center gap-1 w-full mt-0.5">
                  <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#f97316] rounded-full"></div>
                  <span className="text-[0.55rem] sm:text-[0.65rem] font-bold text-[#f97316] tracking-wider leading-none">
                    .Space
                  </span>
                  <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#f97316] rounded-full"></div>
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${isHome ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
          >
            Home
          </Link>
          {navLinks.map((link, i) => (
            link.to ? (
              <Link 
                key={i} 
                to={link.to} 
                className={`text-sm font-medium transition-colors ${location.pathname === link.to ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              >
                {link.name}
              </Link>
            ) : (
              <button 
                key={i} 
                onClick={link.onClick} 
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {link.name}
              </button>
            )
          ))}
          {isPro && (
            <div className="flex items-center gap-3">
              <button className="text-red-500 hover:text-red-600 transition-transform hover:scale-110" title="Favorites">
                <Heart size={18} className="fill-red-500" />
              </button>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-500/30 rounded-full text-yellow-500 text-xs font-bold tracking-wide uppercase">
                <Star size={12} className="fill-yellow-500" /> Pro Member
              </div>
            </div>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden xl:flex items-center gap-5">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <Users size={14} className="text-[var(--color-text-muted)]" />
            <span className="text-xs font-bold text-[var(--color-text-secondary)]">{liveVisitors.toLocaleString()} Online</span>
          </div>
          
          <Link 
            to="/submit"
            className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5 shadow-none hover:shadow-lg"
          >
            <Plus size={16} />
            <span>Submit AI Tool</span>
          </Link>

          {currentUser ? (
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-colors"
            >
              <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || 'User'}`} alt="User" width="20" height="20" decoding="async" loading="lazy" className="w-5 h-5 rounded-full" />
              <span>Logout</span>
            </button>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-colors"
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
          </button>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-[var(--color-text-secondary)]">{liveVisitors}</span>
          </div>
          <button 
            className="text-[var(--color-text-primary)] p-1.5 sm:p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} className="sm:w-[24px] sm:h-[24px]" /> : <Menu size={20} className="sm:w-[24px] sm:h-[24px]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden absolute top-full left-0 w-full bg-[var(--color-background)]/95 backdrop-blur-xl border-b border-[var(--color-border)] shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
              <Link 
                to="/" 
                className={`flex items-center justify-between p-3 rounded-xl font-medium transition-colors ${isHome ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
                <ChevronRight size={16} className={isHome ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'} />
              </Link>
              
              {navLinks.map((link, i) => (
                link.to ? (
                  <Link 
                    key={i} 
                    to={link.to} 
                    className={`flex items-center justify-between p-3 rounded-xl font-medium transition-colors ${location.pathname === link.to ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                    <ChevronRight size={16} className={location.pathname === link.to ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'} />
                  </Link>
                ) : (
                  <button 
                    key={i} 
                    onClick={link.onClick} 
                    className="flex items-center justify-between p-3 rounded-xl font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors text-left w-full"
                  >
                    {link.name}
                    <ChevronRight size={16} className="text-[var(--color-text-muted)]" />
                  </button>
                )
              ))}

              {isPro && (
                <div className="flex items-center justify-between p-3 rounded-xl font-medium bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-500/20 text-yellow-500">
                  <span className="flex items-center gap-2"><Star size={16} className="fill-yellow-500" /> Pro Member</span>
                  <button className="text-red-500 hover:text-red-600 transition-transform hover:scale-110" title="Favorites">
                    <Heart size={20} className="fill-red-500" />
                  </button>
                </div>
              )}
              
              <div className="pt-4 mt-2 border-t border-[var(--color-border)] flex flex-col gap-3">
                <Link 
                  to="/submit" 
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus size={18} />
                  Submit AI Tool
                </Link>

                {currentUser ? (
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
                  >
                    <img src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || 'User'}`} alt="User" width="20" height="20" decoding="async" loading="lazy" className="w-5 h-5 rounded-full" />
                    Logout
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
                  >
                    <LogIn size={18} />
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Navbar;
