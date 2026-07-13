import React from 'react';
import { Hexagon, Zap } from 'lucide-react';

interface LogoProps {
  size?: "sm" | "md" | string;
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const isSmall = size === "sm";

  return (
    <div className={`group flex items-center gap-2.5 select-none text-decoration-none transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}>
      
      {/* Icon */}
      <div className={`${isSmall ? 'w-8 h-8' : 'w-10 h-10'} relative flex items-center justify-center text-indigo-500`}>
        <Hexagon size={isSmall ? 32 : 40} className="absolute text-indigo-500 fill-indigo-500/10 stroke-[1.5]" />
        <Zap size={isSmall ? 16 : 20} className="absolute text-purple-500 fill-purple-500/80 drop-shadow-sm" />
      </div>

      {/* Styled Responsive Branding Text */}
      <div className="leading-tight flex flex-col justify-center">
        <div 
          className={`${
            isSmall ? "text-[18px]" : "text-[24px]"
          } font-black tracking-tighter flex items-center drop-shadow-sm`}
        >
          <span className="text-[var(--color-text-primary)]">AIMaster</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Tools</span>
        </div>
        <div 
          className="text-[9px] font-bold text-gray-500 tracking-[0.22em] uppercase mt-0.5 group-hover:text-indigo-400 transition-colors"
        >
          Discover &middot; Compare &middot; Master
        </div>
      </div>
    </div>
  );
};

export default Logo;
