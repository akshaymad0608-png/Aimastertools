import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", showText = false }) => {
  return (
    <div className={`flex items-center justify-center overflow-visible ${showText ? 'flex-col gap-4' : ''}`}>
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className={`${className} overflow-visible`}>
        {/* Hexagon Border */}
        <polygon points="60,6 106,32 106,88 60,114 14,88 14,32" stroke="#22d3ee" strokeWidth="4.5" strokeLinejoin="round" fill="none" />
        
        {/* Central Stem */}
        <path d="M 60 22 L 60 98" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Left Hemisphere Outline */}
        <path d="M 60 22 C 38 18, 26 34, 26 48 C 26 53, 30 58, 23 62 C 22 75, 36 88, 48 94 C 52 96, 56 97, 60 98" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        
        {/* Right Hemisphere Outline */}
        <path d="M 60 22 C 82 18, 94 34, 94 48 C 94 53, 90 58, 97 62 C 98 75, 84 88, 72 94 C 68 96, 64 97, 60 98" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Left Circuit Lines */}
        <path d="M 60 38 L 48 38 L 42 28 L 38 28" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="38" cy="28" r="2.5" fill="#f43f5e" />

        <path d="M 60 50 L 46 50 L 46 38 L 38 38" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="38" cy="38" r="2.5" fill="#22d3ee" stroke="#22d3ee" />

        <path d="M 60 62 L 35 62 L 35 52 L 30 52" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="30" cy="52" r="2.5" fill="#22d3ee" stroke="#22d3ee" />
        <path d="M 60 62 L 35 62 L 28 72" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="28" cy="72" r="2.5" fill="#22d3ee" stroke="#22d3ee" />
        
        <path d="M 60 74 L 50 74 L 50 56 L 42 56 L 36 62" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="36" cy="62" r="2.5" fill="#f43f5e" stroke="#f43f5e" />

        <path d="M 60 86 L 52 86 L 48 76 L 40 76" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="40" cy="76" r="2.5" fill="#22d3ee" stroke="#22d3ee" />

        {/* Right Circuit Lines */}
        <path d="M 60 38 L 72 38 L 78 28 L 82 28" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="82" cy="28" r="2.5" fill="#f43f5e" />

        <path d="M 60 50 L 74 50 L 74 38 L 82 38" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="82" cy="38" r="2.5" fill="#22d3ee" stroke="#22d3ee" />

        <path d="M 60 62 L 85 62 L 85 52 L 90 52" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="90" cy="52" r="2.5" fill="#22d3ee" stroke="#22d3ee" />
        <path d="M 60 62 L 85 62 L 92 72" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="92" cy="72" r="2.5" fill="#22d3ee" stroke="#22d3ee" />
        
        <path d="M 60 74 L 70 74 L 70 56 L 78 56 L 84 62" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="84" cy="62" r="2.5" fill="#f43f5e" stroke="#f43f5e" />

        <path d="M 60 86 L 68 86 L 72 76 L 80 76" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="80" cy="76" r="2.5" fill="#22d3ee" stroke="#22d3ee" />
      </svg>
      {showText && (
        <div className="text-[#22d3ee] font-black tracking-[0.1em] text-lg sm:text-2xl font-mono" style={{ fontFamily: 'monospace' }}>
          AIMASTERTOOLS
        </div>
      )}
    </div>
  );
};

export default Logo;
