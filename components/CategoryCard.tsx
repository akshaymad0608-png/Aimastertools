import React from 'react';

interface CategoryCardProps {
  name: string;
  icon: string;
  bg: string;
  color: string;
  count?: number;
  onClick?: () => void;
  isSelected?: boolean;
  isTrending?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon, bg, color, count, onClick, isSelected, isTrending }) => (
  <div
    onClick={onClick}
    className="group relative"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      padding: "16px 10px",
      minHeight: "85px",
      border: isSelected ? "2px solid #534AB7" : "1px solid #e5e5e5",
      borderRadius: "14px",
      background: isSelected ? "#f0eeff" : "#fff",
      cursor: "pointer",
      transition: "all 0.15s",
      minWidth: "110px",
      scrollSnapAlign: "start"
    }}
    onMouseEnter={e => {
      if (!isSelected) {
        e.currentTarget.style.borderColor = "#534AB7";
        e.currentTarget.style.background = "#fafaff";
      }
    }}
    onMouseLeave={e => {
      if (!isSelected) {
        e.currentTarget.style.borderColor = "#e5e5e5";
        e.currentTarget.style.background = "#fff";
      }
    }}
  >
    {isTrending && (
      <div className="absolute top-2 right-2 flex items-center justify-center">
        <span className="flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
        </span>
      </div>
    )}
    <div style={{
      width: "40px", height: "40px", borderRadius: "10px",
      background: isSelected ? "#fff" : bg, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <i className={`ti ${icon}`} style={{ fontSize: "20px", color: color }} />
    </div>
    <div style={{ fontSize: "12px", fontWeight: "600", textAlign: "center", color: "#1a1a2e", lineHeight: "1.2" }}>
      {name}
    </div>
     {count !== undefined && (
       <div style={{ fontSize: "11px", color: "#888", display: "none" }} className="md:block">{count} tools</div>
     )}
  </div>
);
