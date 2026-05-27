import React, { useEffect } from 'react';
import AIToolFinder from '../components/AIToolFinder';

export default function FindMyTool() {
  useEffect(() => {
    document.title = "Find My AI Tool | AI Master Tools";
  }, []);

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[var(--color-background)]">
      <div className="container-custom mx-auto">
        <AIToolFinder />
      </div>
    </div>
  );
}
