import React, { useState } from "react";

interface ToolLogoProps {
  domain?: string;
  name?: string;
  brandColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ToolLogo: React.FC<ToolLogoProps> = ({ domain, name, brandColor, className, style }) => {
  const [src, setSrc] = useState<string | null>(
    domain ? `https://img.logo.dev/${domain}?token=pk_Yy124-7wSK-z-Hym446V9A` : null
  );
  const [failed, setFailed] = useState(false);
  const initials = name?.slice(0, 2).toUpperCase() || "AI";

  const handleError = () => {
    if (src?.includes("logo.dev") && domain) {
      // Fallback to Google favicon
      setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
    } else {
      // Give up and use fallback styled initials
      setFailed(true);
    }
  };

  const defaultBoxStyle: React.CSSProperties = {
    borderRadius: "12px",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    ...style
  };

  const defaultClasses = className || "w-[46px] h-[46px]";

  // Fallback: colored box with initials
  if (failed || !src) {
    return (
      <div 
        className={defaultClasses}
        style={{
          ...defaultBoxStyle,
          background: brandColor || "var(--color-primary)",
          fontSize: "15px", fontWeight: "600", color: "#fff",
          border: "0.5px solid rgba(0,0,0,0.08)",
        }}>
        {initials}
      </div>
    );
  }

  // Primary: real logo
  return (
    <div 
      className={defaultClasses}
      style={{
        ...defaultBoxStyle,
        border: "0.5px solid #efefef",
        background: "#fff",
        overflow: "hidden"
      }}>
      <img
        src={src}
        alt={name}
        onError={handleError}
        loading="lazy"
        decoding="async"
        style={{
          width: "74%", height: "74%",
          objectFit: "contain"
        }}
      />
    </div>
  );
};

export default ToolLogo;
