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
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-4xl px-4">
      <p className="text-center text-lg md:text-xl font-semibold text-white bg-black/50 rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm">
        {text}
      </p>
    </div>
  );
};
