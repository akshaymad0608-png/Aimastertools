import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md';
  showWordmark?: boolean;
}

/**
 * The mark is an index card, seen edge-on: a spine down the left, three ruled
 * lines, one of them scored.
 *
 * It is not a new idea — it is the one the stylesheet already had. Every tool
 * record on this site carries `.spine`, a coloured bar on its left edge, and
 * the whole type system was built around an almanac: a mono face so that
 * "numbers read as data, not prose", a serif for display. The logo was a
 * hexagon holding a glossy orb, which belonged to none of that and had been
 * recoloured three times without ever meaning anything.
 *
 * Two things this fixes beyond the drawing:
 *
 *   The wordmark was set at font-weight 700 on --font-display. That is
 *   Instrument Serif now, which ships a single weight, so the browser was
 *   smearing a synthetic bold across the brand name. Weight 400 is the face as
 *   drawn.
 *
 *   It was also tricoloured — "AI" and "Tools" in the accent, "Master" in the
 *   text colour — which fights the one-accent rule the rest of the system
 *   follows. The mark carries the colour; the name is just the name.
 *
 * Colours come through `style` rather than presentation attributes, because
 * var() does not resolve in SVG paint attributes — it silently falls back to
 * black. Passing them through the CSS cascade also means the mark follows the
 * theme without a second copy.
 */
export const Logo: React.FC<LogoProps> = ({ size = 'md', showWordmark = true }) => {
  const isSmall = size === 'sm';
  const box = isSmall ? 32 : 40;

  return (
    <span className="flex items-center gap-2.5">
      <svg
        aria-hidden="true"
        width={box}
        height={box}
        viewBox="0 0 48 48"
        fill="none"
        className="shrink-0"
      >
        {/* The card */}
        <rect
          x="6"
          y="7"
          width="36"
          height="34"
          rx="5"
          style={{ fill: 'var(--color-cardBg)', stroke: 'var(--color-text-primary)', strokeWidth: 2.5 }}
        />

        {/* The spine — the one place the brightest red earns its keep, since it
            carries no text and is read at a glance. */}
        <path
          d="M6 12a5 5 0 0 1 5-5h2v34h-2a5 5 0 0 1-5-5z"
          style={{ fill: 'var(--color-primary)' }}
        />

        {/* Ruled lines: two entries and one scored, the way a checked record
            looks in the index. */}
        <rect x="19" y="16" width="17" height="2.6" rx="1.3" style={{ fill: 'var(--color-text-primary)', opacity: 0.9 }} />
        <rect x="19" y="22.7" width="17" height="2.6" rx="1.3" style={{ fill: 'var(--color-text-primary)', opacity: 0.45 }} />
        <rect x="19" y="29.4" width="10" height="2.6" rx="1.3" style={{ fill: 'var(--color-primary)' }} />
      </svg>

      {showWordmark && (
        <span className="flex min-w-0 flex-col justify-center leading-none">
          <span
            className="whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: isSmall ? 19 : 22.5,
              letterSpacing: '-0.01em',
              color: 'var(--color-text-primary)',
            }}
          >
            AI Master Tools
          </span>
          <span
            className="mt-1 hidden whitespace-nowrap sm:block"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: isSmall ? 8.5 : 9.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}
          >
            The AI tools index
          </span>
        </span>
      )}
    </span>
  );
};

export default Logo;
