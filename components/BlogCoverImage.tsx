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

  // Fallback system mapping categories to high-quality abstract designs
  const getCategoryConfig = (catName: string) => {
    const normalized = catName?.toLowerCase().trim() || '';
    
    if (normalized.includes('chatbot') || normalized.includes('assistant') || normalized.includes('bot') || normalized.includes('claude') || normalized.includes('chatgpt')) {
      return {
        gradient: "from-blue-600 via-indigo-600 to-purple-800",
        glows: ["rgba(59,130,246,0.3)", "rgba(139,92,246,0.2)"],
        icon: Bot,
        techLabel: "MODEL CONFIG // CHATBOT-AGENT-V4",
        accent: "text-blue-300",
        details: (
          <div className="absolute left-4 bottom-4 right-4 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10 text-[9px] font-mono text-blue-200">
            <span className="text-pink-400">assistant_id</span>: "cl-2026-pro"<br/>
            <span className="text-emerald-400">system_prompt</span>: "act as super-intelligence..."
          </div>
        )
      };
    }
    
    if (normalized.includes('design') || normalized.includes('art') || normalized.includes('image') || normalized.includes('graphic')) {
      return {
        gradient: "from-pink-600 via-rose-500 to-amber-500",
        glows: ["rgba(244,63,94,0.3)", "rgba(245,158,11,0.2)"],
        icon: Palette,
        techLabel: "CANVAS METADATA // VECTOR-SPLAT-T2",
        accent: "text-pink-300",
        details: (
          <div className="absolute left-4 bottom-4 flex gap-1.5">
            <span className="w-5 h-5 rounded-full bg-white/20 border border-white/20 backdrop-blur-sm" />
            <span className="w-5 h-5 rounded-full bg-pink-500/80 border border-white/20" />
            <span className="w-5 h-5 rounded-full bg-rose-500/80 border border-white/20" />
            <span className="w-5 h-5 rounded-full bg-amber-500/80 border border-white/20" />
          </div>
        )
      };
    }
    
    if (normalized.includes('code') || normalized.includes('coding') || normalized.includes('dev') || normalized.includes('programming')) {
      return {
        gradient: "from-slate-900 via-sky-900 to-indigo-950",
        glows: ["rgba(14,165,233,0.3)", "rgba(56,189,248,0.2)"],
        icon: Code,
        techLabel: "REFACTOR STRUCT // AST-PARSER-V2",
        accent: "text-sky-305",
        details: (
          <div className="absolute left-4 bottom-4 right-4 font-mono text-[8px] text-sky-200 bg-slate-950/80 p-2 rounded-lg border border-sky-500/20">
            <span className="text-yellow-400">import</span> React <span className="text-yellow-400">from</span> <span className="text-emerald-400">'react'</span>;
          </div>
        )
      };
    }
    
    if (normalized.includes('video') || normalized.includes('generation') || normalized.includes('animation') || normalized.includes('movie')) {
      return {
        gradient: "from-emerald-600 via-teal-700 to-purple-900",
        glows: ["rgba(16,185,129,0.3)", "rgba(168,85,247,0.2)"],
        icon: Video,
        techLabel: "FPS DETECTED // H266-ENCODER-8K",
        accent: "text-emerald-300",
        details: (
          <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between text-[8px] font-mono text-emerald-200 bg-black/60 backdrop-blur-sm p-1 rounded-lg border border-emerald-500/20">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>00:04:12</span>
            </div>
            <span>60.0 FPS</span>
          </div>
        )
      };
    }
    
    if (normalized.includes('productivity') || normalized.includes('automate') || normalized.includes('automation')) {
      return {
        gradient: "from-orange-600 via-amber-500 to-red-800",
        glows: ["rgba(249,115,22,0.3)", "rgba(239,68,68,0.2)"],
        icon: Zap,
        techLabel: "TRIGGER SYNC // WEBHOOK-QUEUE",
        accent: "text-amber-300",
        details: (
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-1.5 rounded-lg border border-white/10 text-[8px] font-mono text-amber-200 flex items-center gap-1.5">
            <span className="p-0.5 rounded bg-amber-500/20 text-amber-400"><Check size={8} strokeWidth={4} /></span>
            <span>Task absolute automated save: +30m saved</span>
          </div>
        )
      };
    }
    
    if (normalized.includes('education') || normalized.includes('study') || normalized.includes('student') || normalized.includes('learn')) {
      return {
        gradient: "from-amber-500 via-violet-650 to-indigo-900",
        glows: ["rgba(245,158,11,0.3)", "rgba(139,92,246,0.2)"],
        icon: GraduationCap,
        techLabel: "ACADEMIC INDEX // RETRIEVAL-MODEL",
        accent: "text-amber-300",
        details: (
          <div className="absolute left-4 bottom-4 right-4 bg-slate-950/60 backdrop-blur-sm px-2 py-1 rounded border border-white/10 flex items-center justify-between text-[8px] font-mono text-violet-200">
            <span>DocSummarizer // Active</span>
            <span className="text-emerald-400">OK</span>
          </div>
        )
      };
    }
    
    if (normalized.includes('research') || normalized.includes('science') || normalized.includes('academic') || normalized.includes('ethic')) {
      return {
        gradient: "from-teal-600 via-cyan-600 to-slate-900",
        glows: ["rgba(20,184,166,0.3)", "rgba(6,182,212,0.2)"],
        icon: Brain,
        techLabel: "COGNITIVE GRAPH // SYNAPSE-MAP-E6",
        accent: "text-cyan-300",
        details: (
          <div className="absolute left-1/2 bottom-4 -translate-x-1/2 bg-cyan-950/80 border border-cyan-500/30 rounded-full px-2 py-0.5 font-mono text-[7px] text-cyan-200 tracking-wider flex items-center gap-1">
            <Sparkles size={8} className="animate-spin text-cyan-400" />
            <span>NEURAL: 99.8%</span>
          </div>
        )
      };
    }
    
    if (normalized.includes('writing') || normalized.includes('content') || normalized.includes('copy') || normalized.includes('writer')) {
      return {
        gradient: "from-violet-600 via-fuchsia-600 to-indigo-950",
        glows: ["rgba(139,92,246,0.3)", "rgba(217,70,239,0.2)"],
        icon: PenTool,
        techLabel: "SEO RANK PRO // NLP-OPTIMIZER",
        accent: "text-fuchsia-300",
        details: (
          <div className="absolute left-4 bottom-4 right-4 bg-slate-950/70 border border-white/10 p-1.5 rounded text-[8px] font-mono text-fuchsia-200">
            Key: <span className="text-yellow-300">"AI Productivity"</span>
          </div>
        )
      };
    }

    // Default configuration for custom or unmapped categories
    return {
      gradient: "from-indigo-600 via-slate-800 to-slate-950",
      glows: ["rgba(99,102,241,0.25)", "rgba(51,65,85,0.15)"],
      icon: Layout,
      techLabel: "CORE DIRECTORY // MAIN-FEED-2026",
      accent: "text-indigo-300",
      details: null
    };
  };

  const config = getCategoryConfig(category);
  const IconComponent = config.icon;

  // Let's determine dimensions class based on Variant
  let sizeClass = '';
  if (variant === 'featured') {
    sizeClass = 'w-full h-[220px] sm:h-[300px] lg:h-[360px]';
  } else if (variant === 'thumbnail') {
    sizeClass = 'w-24 h-24 aspect-square';
  } else if (variant === 'card') {
    // Blog listing index card size
    sizeClass = 'w-full h-[180px] lg:h-[220px]';
  }

  const renderFallbackCover = () => {
    return (
      <div className={`relative overflow-hidden w-full h-full bg-slate-950 flex flex-col items-center justify-center select-none ${variant === 'thumbnail' ? 'p-2' : 'p-6'}`}>
        
        {/* Dynamic Base Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${config.gradient} opacity-85`} />

        {/* Cyber Technical Grid Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,white,rgba(255,255,255,0.15))]" />
        
        {/* Technical labels only for non-thumbnail cards */}
        {variant !== 'thumbnail' && (
          <>
            <div className="absolute top-3 left-4 text-[7px] font-mono text-white/40 tracking-widest uppercase">
              {config.techLabel}
            </div>
            <div className="absolute top-3 right-4 text-[7px] font-mono text-white/30 tracking-wider">
              REF_0603 // 2026
            </div>
          </>
        )}

        {/* Decorative cyber dotted overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:8px_8px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

        {/* Radial Glow Haloes */}
        <div 
          className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-110"
          style={{ background: `radial-gradient(circle, ${config.glows[0]} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-110"
          style={{ background: `radial-gradient(circle, ${config.glows[1]} 0%, transparent 70%)` }}
        />

        {/* Centered Graphic Icon */}
        <div className="relative flex flex-col items-center justify-center z-10 transition-all duration-300 group-hover:scale-105">
          <div className={`relative ${variant === 'thumbnail' ? 'w-10 h-10 rounded-xl' : 'w-14 h-14 rounded-2xl'} bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(0,0,0,0.5)]`}>
            <div className="absolute inset-0.5 rounded-[10px] bg-gradient-to-tr from-white/5 to-transparent" />
            <IconComponent size={variant === 'thumbnail' ? 18 : 24} className={`${config.accent} drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]`} />
          </div>
          
          {variant !== 'thumbnail' && (
            <div className="mt-3">
              <div className="text-[9px] font-black tracking-widest text-white/90 uppercase font-mono px-2.5 py-0.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                {category}
              </div>
            </div>
          )}
        </div>

        {/* Category-specific extra decorative lines for premium feel */}
        {variant !== 'thumbnail' && config.details}
      </div>
    );
  };

  return (
    <div className={`relative overflow-hidden shrink-0 border border-transparent dark:border-white/5 ${sizeClass}`}>
      {imageUrl && !imgError ? (
        <div className="relative w-full h-full bg-slate-950">
          <img 
            src={imageUrl} 
            alt={alt || title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Ambient gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
          
          {/* Subtly Floating Category Tag in Real Image mode */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[9px] font-black tracking-widest text-white uppercase bg-blue-600/90 backdrop-blur px-2.5 py-1 rounded-md shadow-lg border border-white/10">
              {category}
            </span>
          </div>
        </div>
      ) : (
        renderFallbackCover()
      )}
    </div>
  );
};
