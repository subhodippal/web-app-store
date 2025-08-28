'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface MinimizedApp {
  id: string;
  title: string;
  icon: string;
  url: string;
}

interface MinimizedAppsContextType {
  minimizedApps: MinimizedApp[];
  minimizeApp: (app: MinimizedApp) => void;
  restoreApp: (id: string) => void;
}

const MinimizedAppsContext = createContext<MinimizedAppsContextType | undefined>(undefined);

export function MinimizedAppsProvider({ children }: { children: ReactNode }) {
  const [minimizedApps, setMinimizedApps] = useState<MinimizedApp[]>([]);

  const minimizeApp = (app: MinimizedApp) => {
    setMinimizedApps(prev => {
      if (!prev.find(a => a.id === app.id)) {
        return [...prev, app];
      }
      return prev;
    });
  };

  const restoreApp = (id: string) => {
    setMinimizedApps(prev => prev.filter(app => app.id !== id));
  };

  return (
    <MinimizedAppsContext.Provider value={{ minimizedApps, minimizeApp, restoreApp }}>
      {children}
    </MinimizedAppsContext.Provider>
  );
}

export function useMinimizedApps() {
  const context = useContext(MinimizedAppsContext);
  if (context === undefined) {
    throw new Error('useMinimizedApps must be used within a MinimizedAppsProvider');
  }
  return context;
}
