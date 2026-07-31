import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md';
  showWordmark?: boolean;
}

/**
 * Vibrant Modern mark — a gradient tile carrying a clean spark.
 *
 * The indigo→violet gradient is the brand's whole identity now, so the mark
 * leads with it. The spark reads instantly as "AI" and stays crisp at 16px
 * because it is two solid shapes and no fine detail. The wordmark sets
 * "AI Master" in ink and "Tools" in the same gradient, so the logotype and the
 * icon share one colour story.
 */
export const Logo: React.FC<LogoProps> = ({ size = 'md', showWordmark = true }) => {
  const isSmall = size === 'sm';
  const box = isSmall ? 30 : 38;

  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid shrink-0 place-items-center rounded-[11px]"
        style={{
          width: box,
          height: box,
          backgroundImage: 'var(--gradient-primary)',
          boxShadow: '0 6px 16px -6px rgba(109, 139, 255, .55)',
        }}
      >
        <svg viewBox="0 0 24 24" width={box * 0.62} height={box * 0.62} fill="none">
          {/* main 4-point spark */}
          <path
            d="M12 2.2c.5 3.9 1.9 5.3 5.8 5.8-3.9.5-5.3 1.9-5.8 5.8-.5-3.9-1.9-5.3-5.8-5.8C10.1 7.5 11.5 6.1 12 2.2Z"
            fill="#ffffff"
          />
          {/* small secondary spark */}
          <path
            d="M17.6 13.4c.28 2.1 1 2.9 3.1 3.2-2.1.3-2.82 1.05-3.1 3.15-.28-2.1-1-2.85-3.1-3.15 2.1-.3 2.82-1.1 3.1-3.2Z"
            fill="#ffffff"
            opacity="0.9"
          />
        </svg>
      </span>

      {showWordmark && (
        <span className="flex min-w-0 flex-col justify-center leading-none">
          <span
            className="whitespace-nowrap font-bold text-[var(--color-text-primary)]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isSmall ? 17 : 21,
              letterSpacing: '-0.02em',
            }}
          >
            AI Master<span className="text-gradient"> Tools</span>
          </span>
          <span className="label-mono mt-1 hidden whitespace-nowrap text-[9px] tracking-[0.16em] text-[var(--color-text-muted)] xl:block">
            The AI tools directory
          </span>
        </span>
      )}
    </span>
  );
};

export default Logo;
