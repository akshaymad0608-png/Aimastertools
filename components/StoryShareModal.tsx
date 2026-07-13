import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Sparkles, Check, Instagram } from 'lucide-react';
import html2canvas from 'html2canvas';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  rating?: number;
}

interface StoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: Tool;
}

export function StoryShareModal({ isOpen, onClose, tool }: StoryShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High quality
        useCORS: true, // For external images
        backgroundColor: '#0a0a0a', // Dark background
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${tool.name.toLowerCase().replace(/\s+/g, '-')}-story.png`;
      link.click();
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 3000);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center space-x-2 text-white">
              <Instagram className="w-5 h-5 text-pink-500" />
              <h3 className="font-medium">Share to Instagram Story</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center">
            <p className="text-gray-400 text-sm mb-6 text-center">
              Download this card to share it on your Instagram Story.
            </p>

            {/* Preview Container - Scaled down */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800 w-[270px] h-[480px]">
              {/* Actual Card - Original 1080x1920 size, scaled with CSS transform for preview */}
              <div
                ref={cardRef}
                className="absolute top-0 left-0 w-[1080px] h-[1920px] bg-[#0a0a0a] flex flex-col items-center justify-between p-24"
                style={{
                  transform: 'scale(0.25)',
                  transformOrigin: 'top left',
                }}
              >
                {/* Background effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-[100px] rounded-full" />
                </div>

                {/* Top: Branding */}
                <div className="w-full flex justify-center items-center space-x-4 mt-12">
                  <Sparkles className="w-16 h-16 text-indigo-400" />
                  <span className="text-white text-5xl font-bold tracking-tight">AIMasterTools</span>
                </div>

                {/* Center: Tool Card */}
                <div className="w-full bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-[3rem] p-16 shadow-2xl flex flex-col items-center text-center">
                  <div className="w-64 h-64 rounded-3xl overflow-hidden mb-12 border-4 border-gray-800 shadow-xl">
                    <img src={tool.imageUrl} alt={tool.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                  </div>
                  
                  <span className="px-8 py-3 bg-indigo-500/10 text-indigo-400 rounded-full text-3xl font-medium mb-8 border border-indigo-500/20">
                    {tool.category}
                  </span>
                  
                  <h1 className="text-white text-7xl font-bold mb-8 leading-tight">
                    {tool.name}
                  </h1>
                  
                  <p className="text-gray-300 text-4xl leading-relaxed max-w-[80%]">
                    {tool.description}
                  </p>
                  
                  {tool.rating && (
                    <div className="mt-12 flex items-center space-x-4 bg-gray-800/50 px-8 py-4 rounded-full border border-gray-700/50">
                      <div className="flex text-yellow-400 text-4xl">
                        {'★'.repeat(Math.floor(tool.rating))}
                        {'☆'.repeat(5 - Math.floor(tool.rating))}
                      </div>
                      <span className="text-white text-4xl font-bold">{tool.rating}</span>
                    </div>
                  )}
                </div>

                {/* Bottom: Call to Action */}
                <div className="w-full flex flex-col items-center mb-12">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-[4px] rounded-3xl w-[80%]">
                    <div className="bg-gray-900 rounded-[1.3rem] py-8 px-12 flex items-center justify-between">
                       <span className="text-gray-300 text-4xl font-medium">Discover more at</span>
                       <span className="text-white text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          aimastertools.com
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-800 bg-gray-900/50">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all ${
                isDownloaded
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 shadow-lg hover:shadow-indigo-500/25'
              } disabled:opacity-50`}
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isDownloaded ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Download Image
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
