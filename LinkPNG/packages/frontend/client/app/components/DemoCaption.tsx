// LinkPNG/packages/frontend/client/app/components/DemoCaption.tsx
"use client";

import React from 'react';

interface DemoCaptionProps {
  text: string | null;
}

export const DemoCaption: React.FC<DemoCaptionProps> = ({ text }) => {
  if (!text) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-6xl px-4 pointer-events-none">
      <div className="bg-black/90 text-white px-6 py-4 rounded-lg shadow-2xl border border-white/20">
        <p className="text-center text-base md:text-lg font-medium leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};
