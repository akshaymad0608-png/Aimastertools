import React, { useEffect } from 'react';
import AIToolFinder from '../components/AIToolFinder';

export default function FindMyTool() {
  useEffect(() => {
    document.title = "Find My AI Tool | AI Master Tools";
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <AIToolFinder />
      </div>
    </div>
  );
}
