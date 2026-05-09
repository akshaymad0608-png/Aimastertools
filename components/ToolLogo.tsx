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
    domain ? `https://logo.clearbit.com/${domain}?size=80` : null
  );
  const [failed, setFailed] = useState(false);
  const initials = name?.slice(0, 2).toUpperCase() || "AI";

  const handleError = () => {
    if (src?.includes("clearbit") && domain) {
      // Try Google favicon as second option
      setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`);
    } else {
      // Give up, show initials
      setFailed(true);
    }
  };

  const defaultBoxStyle: React.CSSProperties = {
    width: "46px", height: "46px",
    borderRadius: "12px",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    ...style
  };

  // Fallback: colored box with initials
  if (failed || !src) {
    return (
      <div 
        className={className}
        style={{
          ...defaultBoxStyle,
          background: brandColor || "#534AB7",
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
      className={className}
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
        style={{
          width: "74%", height: "74%",
          objectFit: "contain"
        }}
      />
    </div>
  );
};

export default ToolLogo;
