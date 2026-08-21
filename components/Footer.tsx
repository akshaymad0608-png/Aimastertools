import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, ArrowRight, Check, Loader2, ArrowUp } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Logo from './Logo';
import { CATEGORIES } from '../data/categories';

/**
 * Free tools and Earn online reach the header but never reached here, so two
 * live sections had no footer route on any page.
 */
const COLUMNS = [
  {
    heading: 'Browse',
    links: [
      { label: 'All tools', to: '/' },
      { label: 'Categories', to: '/categories' },
      { label: 'Collections', to: '/collections' },
      { label: 'Workflows', to: '/workflows' },
      { label: 'Prompts', to: '/prompts' },
    ],
  },
  {
    heading: 'Decide',
    links: [
      { label: 'Compare two tools', to: '/compare' },
      { label: 'AI Shopping', to: '/ai-shopping' },
      { label: 'Find a tool', to: '/find' },
      { label: 'Free tools', to: '/free' },
      { label: 'Earn online', to: '/earn' },
      { label: 'Saved tools', to: '/bookmarks' },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    heading: 'Site',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Affiliate disclosure', to: '/affiliate-disclosure' },
      { label: 'Privacy policy', to: '/privacy' },
      { label: 'Terms of service', to: '/terms' },
    ],
  },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'newsletter_emails'), { email, subscribedAt: serverTimestamp() });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      setStatus('error');
    }
  };

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)] pb-24 pt-16 md:pb-10">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link to="/" aria-label="AI Master Tools home" className="inline-block">
              <Logo size="md" />
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
              An independent index of AI tools. Every entry is opened, checked and
              re-checked so you are not reading a press release.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { href: 'https://twitter.com/AIMasterTools', label: 'Twitter', Icon: Twitter },
                { href: 'https://github.com/aimastertools', label: 'GitHub', Icon: Github },
                { href: 'https://www.linkedin.com/company/aimastertools', label: 'LinkedIn', Icon: Linkedin },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-cardBg)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* These labels are not headings. Rendered as h2 they put four extra
              entries into the outline of every page on the site, competing with
              the page's own content headings; the <nav> label already names each
              landmark for anyone navigating by them. */}
          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="label-mono">{column.heading}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[15px] text-[var(--color-text-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-primary)] hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/*
          The busiest categories, linked from every page on the site.

          The footer is the one block that renders on all 1,700 of them, which
          makes it the cheapest place to put a link where crawlers and readers
          will actually find it. Ahrefs counted 700 orphans here, and the
          category pages were most of the chain: nothing linked them, so nothing
          reached the ~624 tool pages behind them either.

          Taken from CATEGORIES, which is already sorted by tool count, so this
          follows the data instead of freezing a list that will go stale.
        */}
        <nav aria-label="Popular categories" className="mt-14 border-t border-[var(--color-border)] pt-8">
          <p className="label-mono">Popular categories</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.slice(0, 12).map((cat) => (
              <li key={cat.id}>
                <Link to={`/category/${cat.slug}`} className="link-chip">
                  {cat.name}
                  <span className="link-chip__count">{cat.count}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/categories" className="link-chip">
                All {CATEGORIES.length} categories
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Newsletter — one job, stated plainly */}
        <div className="mt-14 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cardBg)] p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <h2 className="display-md text-[var(--color-text-primary)]">
                New tools, once a week
              </h2>
              <p className="mt-2 text-[15px] text-[var(--color-text-secondary)]">
                What was added, what changed price, and what is no longer worth paying for.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full md:max-w-sm">
              {status === 'success' ? (
                <p className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-primary)] bg-[var(--color-primary-soft)] px-4 py-3 text-sm font-medium text-[var(--color-primary)]">
                  <Check size={16} /> Subscribed. Check your inbox to confirm.
                </p>
              ) : (
                <>
                  <div className="flex gap-2">
                    <label htmlFor="footer-email" className="sr-only">Email address</label>
                    <input
                      id="footer-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@work.com"
                      required
                      disabled={status === 'submitting'}
                      className="h-11 min-w-0 flex-1 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-background)] px-3.5 text-[15px] text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] disabled:opacity-60"
                    />
                    <button type="submit" disabled={status === 'submitting'} className="btn-primary h-11 px-4 disabled:opacity-60">
                      {status === 'submitting' ? <Loader2 size={16} className="animate-spin" /> : <>Subscribe <ArrowRight size={15} /></>}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p role="alert" className="mt-2 text-[13px] text-[var(--color-error)]">
                      That didn't send. Check your connection and try again.
                    </p>
                  )}
                </>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-[var(--color-border)] pt-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl space-y-2 text-[13px] text-[var(--color-text-secondary)]">
            <p>© {new Date().getFullYear()} AI Master Tools. All rights reserved.</p>
            <p className="text-[var(--color-text-muted)]">
              <strong className="font-semibold text-[var(--color-text-secondary)]">Affiliate disclosure:</strong>{' '}
              some outbound links earn us a commission. It costs you nothing and it does not
              change how a tool is rated or where it is ranked.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-secondary h-10 shrink-0 px-4 text-[13px]"
          >
            <ArrowUp size={15} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
