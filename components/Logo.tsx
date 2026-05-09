import React from 'react';

interface LogoProps {
  size?: "sm" | "md" | string;
  showText?: boolean; // kept for backwards compatibility but ignored
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  const isSmall = size === "sm";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
      
      {/* Icon Box */}
      <div style={{
        width: isSmall ? "30px" : "38px",
        height: isSmall ? "30px" : "38px",
        background: "#534AB7",
        borderRadius: isSmall ? "8px" : "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0
      }}>
        <svg width={isSmall ? "17" : "22"} height={isSmall ? "17" : "22"} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="4" fill="white" fillOpacity="0.95"/>
          <path d="M11 2v3.5M11 16.5V20M2 11h3.5M16.5 11H20"
            stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5.4 5.4l2.5 2.5M14.1 14.1l2.5 2.5M16.6 5.4l-2.5 2.5M7.9 14.1l-2.5 2.5"
            stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"/>
        </svg>
      </div>

      {/* Text */}
      <div style={{ lineHeight: "1.1" }}>
        <div style={{
          fontSize: isSmall ? "13px" : "15px",
          fontWeight: "600",
          color: "#1a1a2e"
        }}>AI Master Tools</div>
        <div style={{
          fontSize: "9px",
          color: "#888",
          letterSpacing: "0.7px",
          textTransform: "uppercase"
        }}>Discover · Compare · Find</div>
      </div>

    </div>
  );
};

export default Logo;
