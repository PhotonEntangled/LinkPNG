// LinkPNG/packages/frontend/client/app/context/DemoPlaybackContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface DemoPlaybackContextType {
  isPlaybackActive: boolean;
  setPlaybackActive: (active: boolean) => void;
}

const DemoPlaybackContext = createContext<DemoPlaybackContextType | undefined>(undefined);

export const DemoPlaybackProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaybackActive, setIsPlaybackActive] = useState(false);
  
  return (
    <DemoPlaybackContext.Provider value={{ 
      isPlaybackActive, 
      setPlaybackActive: setIsPlaybackActive 
    }}>
      {children}
    </DemoPlaybackContext.Provider>
  );
};

export const useDemoPlayback = () => {
  const context = useContext(DemoPlaybackContext);
  if (!context) {
    throw new Error('useDemoPlayback must be used within DemoPlaybackProvider');
  }
  return context;
};