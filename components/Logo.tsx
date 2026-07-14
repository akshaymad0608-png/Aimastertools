import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: "sm" | "md" | string;
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "sm", className = "" }) => {
  const isSmall = size === "sm";

  return (
    <div className={`group flex items-center gap-2.5 select-none text-decoration-none transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}>
      
      {/* Icon */}
      <div className={`${isSmall ? 'w-9 h-9' : 'w-12 h-12'} relative flex items-center justify-center text-indigo-500`}>
        <Brain size={isSmall ? 34 : 44} className="absolute text-indigo-500 stroke-[1.5]" />
        <Sparkles size={isSmall ? 16 : 22} className="absolute text-purple-500 fill-purple-500/80 drop-shadow-sm -top-1 -right-1" />
      </div>

      {/* Styled Responsive Branding Text */}
      <div className="leading-tight flex flex-col justify-center">
        <div 
          className={`${
            isSmall ? "text-[22px]" : "text-[30px]"
          } font-black tracking-tighter flex items-center drop-shadow-sm`}
        >
          <span className="text-[var(--color-text-primary)]">AIMaster</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Tools</span>
        </div>
        {!isSmall && (
          <div 
            className="text-[9px] font-bold text-gray-500 tracking-[0.22em] uppercase mt-0.5 group-hover:text-indigo-400 transition-colors hidden sm:block"
          >
            Discover &middot; Compare &middot; Master
          </div>
        )}
      </div>
    </div>
  );
};

export default Logo;
