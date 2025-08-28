import Link from 'next/link';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useMinimizedApps } from '../providers/MinimizedAppsProvider';

interface MinimizedTileProps {
  id: string;
  title: string;
  icon: string;
  url: string;
}

export function MinimizedTile({ id, title, icon, url }: MinimizedTileProps) {
  const { restoreApp } = useMinimizedApps();
  const pathname = usePathname();
  const isCurrentApp = pathname === `/app/${id}`;

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If this is the current app, we need to close the iframe
    if (isCurrentApp) {
      window.history.back();
    }
    
    // Remove from minimized apps
    restoreApp(id);
  };

  return (
    <div className="group relative flex items-center">
      <Link
        href={{
          pathname: `/app/${id}`,
          query: { 
            url: url,
            title: title 
          }
        }}
        className={`flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors border ${
          isCurrentApp 
            ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700'
        }`}
      >
        <div className="flex items-center gap-2">
          <Image
            src={icon}
            alt={title}
            width={16}
            height={16}
            className="w-4 h-4"
          />
          <Image
            src={`/app/${id}/icon`}
            alt=""
            width={16}
            height={16}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300 max-w-[100px] truncate">
            {title}
          </span>
        </div>
      </Link>
      <button
        onClick={handleClose}
        className="absolute -right-1 -top-1 p-0.5 rounded-full bg-gray-100 dark:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Close ${title}`}
      >
        <XMarkIcon className="h-3 w-3 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
}
