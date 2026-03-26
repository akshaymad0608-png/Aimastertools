import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="100%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="30%" stopColor="#3b82f6" />
          <stop offset="60%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Colorful Arc */}
      <path d="M 20 90 A 40 40 0 0 1 100 90" fill="none" stroke="url(#arcGrad)" strokeWidth="12" strokeLinecap="round" />
      
      {/* Floating Icons & Connecting Lines */}
      {/* Left Blue */}
      <path d="M 35 55 L 20 35" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="35" r="7" fill="#0ea5e9" />
      <circle cx="20" cy="35" r="2" fill="#ffffff" />
      
      {/* Top Purple */}
      <path d="M 55 45 L 50 20" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="20" r="6" fill="#d946ef" />
      <circle cx="50" cy="20" r="2" fill="#ffffff" />
      
      {/* Right Orange */}
      <path d="M 75 50 L 90 30" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
      <circle cx="90" cy="30" r="7" fill="#f97316" />
      <circle cx="90" cy="30" r="2" fill="#ffffff" />

      {/* Right Pink */}
      <path d="M 85 65 L 105 55" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
      <circle cx="105" cy="55" r="6" fill="#ec4899" />
      <circle cx="105" cy="55" r="2" fill="#ffffff" />
      
      {/* Robot Shoulders */}
      <path d="M 35 100 C 35 85, 85 85, 85 100" fill="#f1f5f9" stroke="#0f172a" strokeWidth="2" />
      
      {/* Robot Head Base */}
      <rect x="30" y="45" width="60" height="45" rx="22.5" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />
      
      {/* Ears */}
      <rect x="24" y="58" width="6" height="18" rx="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
      <rect x="90" y="58" width="6" height="18" rx="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
      
      {/* Visor */}
      <rect x="38" y="55" width="44" height="20" rx="10" fill="#1e1b4b" stroke="#0f172a" strokeWidth="2" />
      
      {/* Glowing Eyes */}
      <circle cx="50" cy="65" r="4" fill="#22d3ee" filter="url(#glow)" />
      <circle cx="70" cy="65" r="4" fill="#22d3ee" filter="url(#glow)" />
      
      {/* Mouth/Reflection on visor */}
      <path d="M 55 70 Q 60 72 65 70" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
};

export default Logo;
