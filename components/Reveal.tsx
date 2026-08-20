import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** Delay in ms, for staggering siblings. Keep small — this is a nudge. */
  delay?: number;
  /** Slide distance in px. */
  distance?: number;
  as?: 'div' | 'section' | 'li';
  className?: string;
}

/**
 * Scroll reveal that cannot strand content.
 *
 * The pattern this replaces sets `initial={{ opacity: 0 }}` and waits for an
 * IntersectionObserver callback to animate it back. That is fine right up until
 * the callback does not arrive — a bundle that fails, an observer that never
 * fires, a browser that is not painting — and then a 642px block of text is
 * sitting in the DOM at opacity 0 with nothing left to reveal it. The blog
 * section on the homepage does exactly this today.
 *
 * Three guards here, in order of how likely each is to matter:
 *
 *  1. prefers-reduced-motion skips the animation entirely and renders visible.
 *  2. A browser without IntersectionObserver renders visible.
 *  3. A failsafe timer reveals anything whose observer never reported back.
 *
 * That third guard has to be careful what it measures. Revealing everything on
 * a timer defeats the effect — every section below the fold fades in at once,
 * a second after load, whether or not the reader has scrolled anywhere near it.
 *
 * So the timer does not ask "has this been revealed yet", it asks "has the
 * observer answered at all". IntersectionObserver delivers an initial callback
 * for every element it observes, intersecting or not, so one callback of any
 * kind proves the observer works and the failsafe stands down. Only silence —
 * a genuinely broken observer — forces the content visible.
 *
 * The hidden state is applied during render rather than after mount, because
 * adding it afterwards makes the content flash in and back out.
 */
const REVEAL_FAILSAFE_MS = 1200;

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  distance = 14,
  as: Tag = 'div',
  className = '',
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) { setShown(true); return; }

    let answered = false;
    const failsafe = window.setTimeout(() => {
      if (!answered) setShown(true);
    }, REVEAL_FAILSAFE_MS);

    const observer = new IntersectionObserver(
      (entries) => {
        answered = true;
        window.clearTimeout(failsafe);
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [shown]);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal${shown ? ' is-shown' : ''}${className ? ` ${className}` : ''}`}
      style={
        shown
          ? { transitionDelay: `${delay}ms` }
          : { transform: `translateY(${distance}px)`, transitionDelay: `${delay}ms` }
      }
    >
      {children}
    </Tag>
  );
};

export default Reveal;
