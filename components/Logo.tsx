import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md';
  showWordmark?: boolean;
}

/**
 * "Foundry" mark — a shelf of five spines, one of them pulled forward.
 *
 * Bars of uneven height read as a collection and as a ranking at the same
 * time, which is exactly what the site is. The copper spine is the pick: the
 * one you were looking for, standing proud of the row. It survives at 16px
 * because it is five solid shapes and no fine detail, which is where the
 * previous ruled-card mark went soft in a browser tab.
 */
export const Logo: React.FC<LogoProps> = ({ size = 'md', showWordmark = true }) => {
  const isSmall = size === 'sm';
  const box = isSmall ? 28 : 38;

  // x, y, height — the fourth bar is the pulled one
  const SPINES: Array<[number, number, number]> = [
    [9, 16, 15],
    [14, 12, 19],
    [19, 19, 12],
    [24, 8, 23],
    [29, 15, 16],
  ];

  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid shrink-0 place-items-center"
        style={{ width: box, height: box }}
      >
        <svg viewBox="0 0 40 40" width={box} height={box} fill="none">
          <rect x="1" y="1" width="38" height="38" rx="5" fill="var(--color-text-primary)" />
          {SPINES.map(([x, y, h], i) => (
            <rect
              key={x}
              x={x}
              y={y}
              width="3.2"
              height={h}
              rx="1.2"
              fill={i === 3 ? 'var(--color-accent)' : 'var(--color-background)'}
              opacity={i === 3 ? 1 : 0.35 + i * 0.14}
            />
          ))}
          <rect x="8" y="32" width="24" height="1.6" rx="0.8" fill="var(--color-background)" opacity="0.5" />
        </svg>
      </span>

      {showWordmark && (
        <span className="flex min-w-0 flex-col justify-center leading-none">
          <span
            className="whitespace-nowrap text-[var(--color-text-primary)]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isSmall ? 18 : 25,
              letterSpacing: '-0.01em',
            }}
          >
            AI Master
            <span style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}> Tools</span>
          </span>
          <span className="label-mono mt-1 hidden whitespace-nowrap text-[9px] tracking-[0.18em] xl:block">
            An index of what works
          </span>
        </span>
      )}
    </span>
  );
};

export default Logo;
