import React from 'react';

interface LogoProps {
  size?: "sm" | "md" | string;
  showText?: boolean; // kept for backwards compatibility but ignored
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  const isSmall = size === "sm";
  return (
    <div className="flex items-center gap-2.5 select-none text-decoration-none">
      
      {/* Premium Dynamic Gradient Icon Box */}
      <div 
        className={`${
          isSmall ? "w-8 h-8 rounded-lg" : "w-10 h-10 rounded-xl"
        } bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(99,102,241,0.25)]`}
      >
        <svg 
          width={isSmall ? "16" : "20"} 
          height={isSmall ? "16" : "20"} 
          viewBox="0 0 22 22" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="4" fill="white" fillOpacity="0.95"/>
          <path d="M11 2v3.5M11 16.5V20M2 11h3.5M16.5 11H20"
            stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5.4 5.4l2.5 2.5M14.1 14.1l2.5 2.5M16.6 5.4l-2.5 2.5M7.9 14.1l-2.5 2.5"
            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
        </svg>
      </div>

      {/* Styled Responsive Branding Text */}
      <div className="leading-tight">
        <div 
          className={`${
            isSmall ? "text-[14px]" : "text-[17px]"
          } font-black tracking-tight text-[var(--color-text-primary)]`}
        >
          AI Master Tools
        </div>
        <div 
          className="text-[9px] font-bold text-[var(--color-text-muted)] tracking-widest uppercase font-mono mt-0.5"
        >
          Discover · Compare · Find
        </div>
      </div>

    </div>
  );
};

export default Logo;
