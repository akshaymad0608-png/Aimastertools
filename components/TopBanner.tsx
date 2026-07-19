import React, { useState, useLayoutEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DISMISS_KEY = 'topbanner-dismissed-v2';

/**
 * A slim announcement rail pinned above the header. It publishes its own
 * height as --banner-h so the fixed header can sit directly under it.
 */
export const TopBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(DISMISS_KEY) !== '1';
  });
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!isVisible) {
      root.style.setProperty('--banner-h', '0px');
      return;
    }
    const setHeight = () => {
      root.style.setProperty('--banner-h', `${ref.current?.offsetHeight ?? 0}px`);
    };
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => {
      window.removeEventListener('resize', setHeight);
      root.style.setProperty('--banner-h', '0px');
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setIsVisible(false);
  };

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[60] border-b border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="container-custom relative flex items-center justify-center gap-3 py-2 pr-8">
        <span className="badge badge-primary hidden sm:inline-flex">New</span>
        <p className="text-center text-[13px] text-[var(--color-text-secondary)]">
          The directory is re-checked every week.{' '}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
          >
            See what changed <ArrowRight size={12} />
          </Link>
        </p>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-2 grid h-6 w-6 place-items-center rounded-[var(--radius-xs)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)]"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
};

export default TopBanner;
