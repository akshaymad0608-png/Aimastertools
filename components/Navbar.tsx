import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Sun, Moon, Compass, Grid, Code, GitMerge, Sparkles, FileText, Layers,
  Search, Bookmark, Wallet, Share2, Gift,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';


import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { name: 'Directory', to: '/', icon: Compass },
  { name: 'Categories', to: '/categories', icon: Grid },
  { name: 'Collections', to: '/collections', icon: Layers },
  { name: 'Free Tools', to: '/free', icon: Gift },
  { name: 'Earn Online', to: '/earn', icon: Wallet },
  { name: 'Prompts', to: '/prompts', icon: Code },
  { name: 'Workflows', to: '/workflows', icon: GitMerge },
  { name: 'Blog', to: '/blog', icon: FileText },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [headerQuery, setHeaderQuery] = useState('');

  /**
   * The header search replaces the old share button. On a directory the one
   * thing a returning visitor always wants is the search box, and it used to
   * exist only inside the hero — meaning it vanished the moment you scrolled
   * or opened any interior page. Sharing the homepage, by contrast, is a rare
   * action that was occupying permanent header space.
   */
  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = headerQuery.trim();
    if (!q) return;
    navigate(`/?search=${encodeURIComponent(q)}`);
    setHeaderQuery('');
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const isActive = (path: string) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname.startsWith(path);
  };
  const { theme, toggleTheme } = useTheme();

  const handleShare = async () => {
    const data = { title: document.title, url: window.location.href };
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        toast.success('Link copied to clipboard');
      }
    } catch {
      /* user cancelled the share sheet — nothing to do */
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  /**
   * The header publishes its own measured height as --header-h.
   *
   * Every page used to guess this number with a hardcoded pt-28 / pt-32 /
   * pt-[180px]. A guess can only ever be right at one viewport: the header
   * grows when the nav wraps, when the browser font size is larger, and when
   * the announcement banner is showing. Whichever number you pick is too small
   * somewhere (content slides under the bar) and too large everywhere else
   * (a band of dead space above the first line).
   *
   * Measuring removes the guess. ResizeObserver catches font loading, zoom,
   * rotation and wrapping without a resize listener firing on every frame.
   */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const publish = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    };

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);

    // Web fonts change the header's height when they swap in.
    if (document.fonts?.ready) document.fonts.ready.then(publish).catch(() => {});

    return () => observer.disconnect();
  }, []);

  // Lock scroll behind the open sheet.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

      return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <header
        ref={headerRef}
        style={{ top: 'var(--banner-h, 0px)' }}
        className={`fixed inset-x-0 z-50 border-b bg-[color-mix(in_srgb,var(--color-background)_92%,transparent)] py-3 backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow] duration-300 ${
          scrolled
            ? 'border-[var(--color-border)] shadow-[0_1px_0_0_var(--color-border)]'
            : 'border-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between gap-3">
          <Link
            to="/"
            aria-label="AI Master Tools home"
            className="shrink-0 flex items-center rounded-md transition-transform active:scale-[0.98]"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className="md:hidden">
              <Logo size="sm" />
            </span>
            <span className="hidden md:inline-flex">
              <Logo size="md" />
            </span>
          </Link>

          {/* Desktop navigation — a single rail, no floating pill */}
          <nav aria-label="Primary" className="hidden min-w-0 lg:block">
            <ul className="flex items-center gap-0.5 whitespace-nowrap">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.to);
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      aria-current={active ? 'page' : undefined}
                      className={`relative block px-2.5 py-2 text-[13.5px] transition-colors ${
                        active
                          ? 'text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {link.name}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-[3px] h-[1.5px] bg-[var(--color-primary)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              to="/bookmarks"
              aria-label="Saved tools"
              className="hidden h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] md:flex"
            >
              <Bookmark size={16} />
            </Link>

            {/* Search lives in the header from every page, not just the hero.
                Shown from xl up — at lg the 7-item nav needs the width. */}
            <form onSubmit={submitSearch} role="search" className="hidden xl:block">
              <label htmlFor="header-search" className="sr-only">Search AI tools</label>
              <div className="relative">
                <Search
                  size={14}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />
                <input
                  id="header-search"
                  type="search"
                  value={headerQuery}
                  onChange={(e) => setHeaderQuery(e.target.value)}
                  placeholder="Search tools…"
                  className="h-9 w-36 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] pl-8 pr-3 text-[13px] text-[var(--color-text-primary)] outline-none transition-[width,border-color] duration-200 placeholder:text-[var(--color-text-muted)] focus:w-52 focus:border-[var(--color-primary)]"
                />
              </div>
            </form>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share this page"
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] lg:hidden"
            >
              <Share2 size={16} />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link to="/find" className="btn-primary ml-1 hidden h-9 whitespace-nowrap px-4 text-[13px] md:inline-flex">
              <Sparkles size={14} /> Find a tool
            </Link>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] text-[var(--color-text-primary)] lg:hidden"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
            />
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.7, 0.3, 1] }}
              className="fixed inset-x-3 top-[calc(var(--banner-h,0px)+var(--header-h,64px)+8px)] z-50 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cardBg)] shadow-[var(--shadow-lift)] lg:hidden"
            >
              <ul className="p-2">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.to);
                  return (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={`flex items-center justify-between rounded-[var(--radius-sm)] px-3.5 py-3.5 text-[15px] font-medium transition-colors ${
                          active
                            ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <link.icon size={17} />
                          {link.name}
                        </span>
                        <span className="label-mono">{String(i + 1).padStart(2, '0')}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-[var(--color-border)] p-2">
                <Link to="/bookmarks" className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3.5 py-3.5 text-[15px] font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]">
                  <Bookmark size={17} /> Saved tools
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
