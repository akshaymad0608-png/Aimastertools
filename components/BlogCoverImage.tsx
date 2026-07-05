import React, { useState } from 'react';
import { 
  Bot, Palette, Code, Video, Zap, GraduationCap, Brain, PenTool, Layout, Sparkles, Check
} from 'lucide-react';

interface BlogCoverImageProps {
  category: string;
  title: string;
  imageUrl?: string;
  variant: 'featured' | 'thumbnail' | 'card';
  alt?: string;
}

export const BlogCoverImage: React.FC<BlogCoverImageProps> = ({
  category,
  title,
  imageUrl,
  variant,
  alt
}) => {
  const [imgError, setImgError] = useState(false);

  // Fallback system mapping categories to simple colors
  const getCategoryConfig = (catName: string) => {
    const normalized = catName?.toLowerCase().trim() || '';
    
    if (normalized.includes('chatbot') || normalized.includes('assistant') || normalized.includes('bot')) {
      return { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", icon: Bot };
    }
    if (normalized.includes('design') || normalized.includes('art') || normalized.includes('image')) {
      return { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-400", icon: Palette };
    }
    if (normalized.includes('code') || normalized.includes('coding') || normalized.includes('dev')) {
      return { bg: "bg-slate-200 dark:bg-slate-800", text: "text-slate-700 dark:text-slate-300", icon: Code };
    }
    if (normalized.includes('video') || normalized.includes('generation')) {
      return { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400", icon: Video };
    }
    if (normalized.includes('productivity') || normalized.includes('automate')) {
      return { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", icon: Zap };
    }
    if (normalized.includes('writing') || normalized.includes('copy')) {
      return { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-400", icon: PenTool };
    }
    return { bg: "bg-[var(--color-surface)]", text: "text-[var(--color-text-secondary)]", icon: Layout };
  };

  if (imageUrl && !imgError) {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[var(--color-background)]">
        <img 
          src={imageUrl} 
          alt={alt || title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  const config = getCategoryConfig(category);
  const Icon = config.icon;

  if (variant === 'thumbnail' || variant === 'card') {
    return (
      <div className={`w-full h-full relative overflow-hidden flex items-center justify-center border border-[var(--color-border)] ${config.bg}`}>
        <Icon size={variant === 'thumbnail' ? 32 : 48} className={`opacity-50 ${config.text}`} />
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative overflow-hidden flex items-center justify-center border border-[var(--color-border)] rounded-xl ${config.bg}`}>
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(var(--color-text-primary)_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center max-w-lg">
        <div className={`w-20 h-20 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-6 shadow-sm ${config.text}`}>
          <Icon size={40} />
        </div>
        <h3 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${config.text}`}>
          {title}
        </h3>
        <div className={`mt-4 px-4 py-1.5 rounded-full bg-[var(--color-surface)] text-sm font-bold uppercase tracking-wider border border-[var(--color-border)] ${config.text}`}>
          {category}
        </div>
      </div>
    </div>
  );
};
