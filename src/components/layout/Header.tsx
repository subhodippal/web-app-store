'use client';

import { MinusIcon, Square2StackIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useMinimizedApps } from '../providers/MinimizedAppsProvider';
import { MinimizedTile } from '../common/MinimizedTile';
import { FloatingRestoreButton } from '../ui/FloatingRestoreButton';

export function Header() {
  const pathname = usePathname();
  const isAppView = pathname.startsWith('/app/');
  const searchParams = useSearchParams();
  const appTitle = searchParams.get('title');
  const [isMaximized, setIsMaximized] = useState(false);

  const { minimizeApp, minimizedApps } = useMinimizedApps();

  const handleMinimize = () => {
    const currentApp = {
      id: pathname.split('/').pop() || '',
      title: appTitle || 'App Preview',
      icon: `/window.svg`,
      url: searchParams.get('url') || ''
    };
    minimizeApp(currentApp);
    window.history.back();
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    const iframe = document.querySelector('iframe');
    if (iframe) {
      if (!isMaximized) {
        iframe.style.position = 'fixed';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100vw';
        iframe.style.height = '100vh';
        iframe.style.zIndex = '90';
      } else {
        iframe.style.position = 'relative';
        iframe.style.top = 'auto';
        iframe.style.left = 'auto';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.zIndex = 'auto';
      }
    }
  };

  return (
    <>
      {isAppView && isMaximized && (
        <FloatingRestoreButton onClick={handleMaximize} />
      )}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 
                      bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur supports-[backdrop-filter]:bg-opacity-60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            {isAppView ? (
              <div className="flex items-center gap-4">
                <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                  WebAppStore
                </Link>
                <span className="text-gray-400 dark:text-gray-500">/</span>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {appTitle || 'App Preview'}
                </h1>
              </div>
            ) : (
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                WebAppStore
              </Link>
            )}
          </div>

          {minimizedApps.length > 0 && (
            <div className="flex-1 mx-4 min-w-0 max-w-[calc(100%-400px)]">
              <div className="overflow-x-auto hover:scrollbar-thin scrollbar-none scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <div className="flex items-center gap-2 py-1">
                  {minimizedApps.map(app => (
                    <MinimizedTile
                      key={app.id}
                      id={app.id}
                      title={app.title}
                      icon={app.icon}
                      url={app.url}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 flex-shrink-0">
            {isAppView && (
              <>
                <button
                  onClick={handleMinimize}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Minimize"
                >
                  <MinusIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={handleMaximize}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Maximize"
                >
                  <Square2StackIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <Link
                  href="/"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
