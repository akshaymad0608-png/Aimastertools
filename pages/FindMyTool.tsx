import React, { useEffect } from 'react';
import AIToolFinder from '../components/AIToolFinder';
import SEO from '../components/SEO';

export default function FindMyTool() {
  return (
    <>
      <SEO 
        title="Find My AI Tool | AI Master Tools" 
        description="Answer a few simple questions and let our AI match you with the perfect free AI tools, best AI tools, and software for your specific needs."
        keywords={["find AI tool", "AI tool recommender", "best ai tools", "free ai tools", "ai tools free", "free ai tools list", "best free ai tools"]}
      />
      <div className="pt-32 pb-16 md:pt-40 lg:pt-44 md:pb-24 min-h-screen bg-[var(--color-background)]">
        <div className="container-custom mx-auto">
          <AIToolFinder />
        </div>
      </div>
    </>
  );
}
