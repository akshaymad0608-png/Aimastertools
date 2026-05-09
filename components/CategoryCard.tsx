import React from 'react';

interface CategoryCardProps {
  name: string;
  icon: string;
  bg: string;
  color: string;
  count?: number;
  onClick?: () => void;
  isSelected?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon, bg, color, count, onClick, isSelected }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      padding: "20px 10px",
      minHeight: "115px",
      border: isSelected ? "2px solid #534AB7" : "1px solid #e5e5e5",
      borderRadius: "14px",
      background: "#fff",
      cursor: "pointer",
      transition: "all 0.15s",
      minWidth: "110px"
    }}
    onMouseEnter={e => {
      if (!isSelected) {
        e.currentTarget.style.borderColor = "#534AB7";
      }
    }}
    onMouseLeave={e => {
      if (!isSelected) {
        e.currentTarget.style.borderColor = "#e5e5e5";
      }
    }}
  >
    <div style={{
      width: "52px", height: "52px", borderRadius: "12px",
      background: bg, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <i className={`ti ${icon}`} style={{ fontSize: "24px", color: color }} />
    </div>
    <div style={{ fontSize: "13px", fontWeight: "600", textAlign: "center",
      color: "#1a1a2e", lineHeight: "1.35" }}>{name}</div>
    <div style={{ fontSize: "12px", color: "#888" }}>{count} tools</div>
  </div>
);
