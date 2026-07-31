import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md';
  showWordmark?: boolean;
}

/**
 * AIMasterTools brand mark — a blue hexagon cradling a glossy green orb,
 * recreated as crisp SVG so it stays sharp at every size and in both themes.
 * Wordmark: "AI" and "Tools" in brand green, "Master" in brand blue.
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
        <defs>
          <linearGradient id="amt-hex" x1="6" y1="6" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4aa3ff" />
            <stop offset="1" stopColor="#1f6fe6" />
          </linearGradient>
          <radialGradient id="amt-orb" cx="0.36" cy="0.30" r="0.85">
            <stop stopColor="#a7f3b6" />
            <stop offset="0.45" stopColor="#3ccf5c" />
            <stop offset="1" stopColor="#12a63f" />
          </radialGradient>
        </defs>

        {/* Blue rounded hexagon (polygon + matching rounded stroke) */}
        <polygon
          points="42,24 33,8.4 15,8.4 6,24 15,39.6 33,39.6"
          fill="url(#amt-hex)"
          stroke="url(#amt-hex)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* Glossy green orb */}
        <circle cx="24" cy="24" r="9.4" fill="url(#amt-orb)" />
        <ellipse cx="21" cy="20.4" rx="3.4" ry="2.2" fill="#ffffff" opacity="0.55" />
      </svg>

      {showWordmark && (
        <span className="flex min-w-0 flex-col justify-center leading-none">
          <span
            className="whitespace-nowrap italic"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: isSmall ? 18 : 22,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: '#2fbf4e' }}>AI</span>
            <span style={{ color: '#1f6fe6' }}>Master</span>
            <span style={{ color: '#2fbf4e' }}>Tools</span>
          </span>
          <span
            className="mt-1 hidden whitespace-nowrap sm:block"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: isSmall ? 8.5 : 10,
              letterSpacing: '0.14em',
              color: '#5aa9e6',
            }}
          >
            The AI tools directory
          </span>
        </span>
      )}
    </span>
  );
};

export default Logo;
