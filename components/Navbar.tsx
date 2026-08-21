import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Sun, Moon, Compass, Grid, Code, GitMerge, Sparkles, FileText, Layers,
  Search, Bookmark, Wallet, Gift, Columns2, ChevronDown,
  ShoppingBag, Smartphone, Laptop,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

/**
 * The rail is grouped rather than flat.
 *
 * Eight top-level links did not fit the 1240px container, and the fix at the
 * time was to hide the whole nav below xl and drop Directory from the rail.
 * That traded one problem for a worse one: between 768px and 1279px — most
 * laptops, every tablet — the site had no navigation at all beyond a hamburger,
 * and Directory existed only inside the drawer.
 *
 * Four groups fit from lg with room to spare, and each item gets a line saying
 * what is behind it. Nothing was removed; /compare was added, because it is a
 * hub the site had no header route to at all.
 */
const NAV_GROUPS = [
  {
    name: 'Browse',
    items: [
      { name: 'Directory', to: '/', icon: Compass, desc: 'The full index of AI tools.' },
      { name: 'Categories', to: '/categories', icon: Grid, desc: 'Browse by the job each tool does.' },
      { name: 'Collections', to: '/collections', icon: Layers, desc: 'Curated sets of tools.' },
    ],
  },
  {
    name: 'Decide',
    items: [
      { name: 'Compare', to: '/compare', icon: Columns2, desc: 'Put two tools side by side.' },
      { name: 'Find a tool', to: '/find', icon: Sparkles, desc: 'Get a shortlist for your use case.' },
      { name: 'Free tools', to: '/free', icon: Gift, desc: 'Tools with a free tier.' },
    ],
  },
  {
    name: 'Build',
    items: [
      { name: 'Prompts', to: '/prompts', icon: Code, desc: 'Ready-made prompts to copy.' },
      { name: 'Workflows', to: '/workflows', icon: GitMerge, desc: 'Multi-tool workflows, step by step.' },
      { name: 'Earn online', to: '/earn', icon: Wallet, desc: 'Ways to earn using AI tools.' },
    ],
  },
  {
    /**
     * A group rather than a flat link, because AI Shopping has the same shape
     * as the other three — a landing page with destinations under it — and
     * making it the one odd item in the rail would advertise it as bolted on
     * rather than part of the site.
     */
    name: 'AI Shopping',
    items: [
      { name: 'Shopping home', to: '/ai-shopping', icon: ShoppingBag, desc: 'Find a product by budget and use.' },
      { name: 'Smartphones', to: '/ai-shopping/smartphones', icon: Smartphone, desc: 'Chip, camera, battery, updates.' },
      { name: 'Laptops', to: '/ai-shopping/laptops', icon: Laptop, desc: 'What the spec sheet means in practice.' },
    ],
  },
];

/** Top-level links with nothing to group under them. */
const FLAT_LINKS = [{ name: 'Blog', to: '/blog', icon: FileText }];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [headerQuery, setHeaderQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const isActive = useCallback(
    (path: string) => {
      if (path === '/') return location.pathname === '/';
      return location.pathname.startsWith(path);
    },
    [location.pathname],
  );

  const groupIsActive = (group: (typeof NAV_GROUPS)[number]) =>
    group.items.some((i) => isActive(i.to));

  /**
   * The header search replaces the old share button. On a directory the one
   * thing a returning visitor always wants is the search box, and it used to
   * exist only inside the hero — meaning it vanished the moment you scrolled
   * or opened any interior page. Sharing the homepage, by contrast, is a rare
   * action that was occupying permanent header space.
   *
   * It was then given an xl-only breakpoint and left out of the drawer, so on
   * a phone the header offered Share and no way to search at all. The drawer
   * now opens with the search field.
   */
  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = headerQuery.trim();
    if (!q) return;
    navigate(`/?search=${encodeURIComponent(q)}`);
    setHeaderQuery('');
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything whenever the route changes.
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenGroup(null);
  }, [location.pathname]);

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

    if (document.fonts?.ready) document.fonts.ready.then(publish).catch(() => {});

    return () => observer.disconnect();
  }, []);

  // Lock scroll behind the open sheet.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  /**
   * Escape closes whichever layer is on top, and a click outside closes the
   * dropdown. Neither existed before: the sheet could only be dismissed by
   * hitting its own toggle or the scrim, which leaves a keyboard user stuck
   * inside it.
   */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (openGroup) { setOpenGroup(null); return; }
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!openGroup) return;
      if (navRef.current?.contains(e.target as Node)) return;
      setOpenGroup(null);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openGroup, isMobileMenuOpen]);

  /**
   * Hold focus inside the open sheet. Without this, tabbing past the last link
   * walks into the page behind it — which is still there, still scrollable in
   * the accessibility tree, and now invisible behind a scrim.
   */
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const root = sheetRef.current;
    if (!root) return;

    const focusables = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    root.addEventListener('keydown', onKeyDown);
    return () => root.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  // Pointer leaves the rail: close after a beat, so crossing a gap does not
  // snap the panel shut mid-reach.
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 140);
  };
  const cancelClose = () => window.clearTimeout(closeTimer.current);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const iconButton =
    'flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]';

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
            <span className="md:hidden"><Logo size="sm" /></span>
            <span className="hidden md:inline-flex"><Logo size="md" /></span>
          </Link>

          <nav
            ref={navRef}
            aria-label="Primary"
            className="hidden min-w-0 lg:block"
            onMouseLeave={scheduleClose}
            onMouseEnter={cancelClose}
          >
            <ul className="flex items-center gap-0.5 whitespace-nowrap">
              {NAV_GROUPS.map((group) => {
                const open = openGroup === group.name;
                const active = groupIsActive(group);
                return (
                  <li key={group.name} className="relative">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => setOpenGroup(open ? null : group.name)}
                      onMouseEnter={() => { cancelClose(); setOpenGroup(group.name); }}
                      onFocus={() => setOpenGroup(group.name)}
                      className={`relative flex items-center gap-1 rounded-[var(--radius-sm)] px-2.5 py-2 text-[13.5px] transition-colors ${
                        active || open
                          ? 'text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {group.name}
                      <ChevronDown
                        size={13}
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                      />
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-2.5 -bottom-[3px] h-[1.5px] bg-[var(--color-primary)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.16, ease: [0.2, 0.7, 0.3, 1] }}
                          className="absolute left-0 top-[calc(100%+10px)] w-[310px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-1.5 shadow-[var(--shadow-lift)]"
                        >
                          {group.items.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              aria-current={isActive(item.to) ? 'page' : undefined}
                              className="flex items-start gap-3 rounded-[var(--radius-sm)] px-2.5 py-2.5 transition-colors hover:bg-[var(--color-surface)]"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-px grid h-8 w-8 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)]"
                              >
                                <item.icon size={15} />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[13.5px] font-semibold text-[var(--color-text-primary)]">
                                  {item.name}
                                </span>
                                <span className="mt-0.5 block whitespace-normal text-[12.5px] leading-snug text-[var(--color-text-secondary)]">
                                  {item.desc}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}

              {FLAT_LINKS.map((link) => {
                const active = isActive(link.to);
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      aria-current={active ? 'page' : undefined}
                      className={`relative block rounded-[var(--radius-sm)] px-2.5 py-2 text-[13.5px] transition-colors ${
                        active
                          ? 'text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {link.name}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-2.5 -bottom-[3px] h-[1.5px] bg-[var(--color-primary)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            <Link to="/bookmarks" aria-label="Saved tools" className={`hidden md:flex ${iconButton}`}>
              <Bookmark size={16} />
            </Link>

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
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className={iconButton}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link to="/find" className="btn-primary ml-1 hidden h-9 whitespace-nowrap px-4 text-[13px] md:inline-flex">
              <Sparkles size={14} /> Find a tool
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className={`${iconButton} text-[var(--color-text-primary)] lg:hidden`}
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
            <motion.div
              ref={sheetRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.2, 0.7, 0.3, 1] }}
              className="fixed inset-x-3 top-[calc(var(--banner-h,0px)+var(--header-h,64px)+8px)] z-50 max-h-[calc(100dvh-var(--header-h,64px)-28px)] overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cardBg)] shadow-[var(--shadow-lift)] lg:hidden"
            >
              {/* The drawer opens with search — on a phone this is the only
                  place it exists. */}
              <form onSubmit={submitSearch} role="search" className="border-b border-[var(--color-border)] p-3">
                <label htmlFor="drawer-search" className="sr-only">Search AI tools</label>
                <div className="relative">
                  <Search
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                  <input
                    id="drawer-search"
                    type="search"
                    value={headerQuery}
                    onChange={(e) => setHeaderQuery(e.target.value)}
                    placeholder="Search tools…"
                    className="h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-background)] pl-9 pr-3 text-[15px] text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)]"
                  />
                </div>
              </form>

              <nav aria-label="Mobile">
                {NAV_GROUPS.map((group) => (
                  <div key={group.name} className="border-b border-[var(--color-border)] p-2 last:border-b-0">
                    <p className="rule-label px-2 pb-1 pt-1.5">{group.name}</p>
                    <ul>
                      {group.items.map((item) => {
                        const active = isActive(item.to);
                        return (
                          <li key={item.to}>
                            <Link
                              to={item.to}
                              aria-current={active ? 'page' : undefined}
                              className={`flex items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-3 text-[15px] font-medium transition-colors ${
                                active
                                  ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                              }`}
                            >
                              <item.icon size={17} aria-hidden="true" />
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

                <div className="p-2">
                  {[...FLAT_LINKS, { name: 'Saved tools', to: '/bookmarks', icon: Bookmark }].map((link) => {
                    const active = isActive(link.to);
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-3 text-[15px] font-medium transition-colors ${
                          active
                            ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                        }`}
                      >
                        <link.icon size={17} aria-hidden="true" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
