'use client';

import { usePathname } from 'next/navigation';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAppView = pathname.startsWith('/app/');

  return (
    <main className={`container mx-auto px-4 py-6 h-[calc(100vh-4rem)] ${
      isAppView ? '' : 'overflow-y-auto custom-scrollbar'
    }`}>
      {children}
    </main>
  );
}
