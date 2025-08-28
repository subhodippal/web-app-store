'use client';

import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMinimizedApps } from '../providers/MinimizedAppsProvider';

interface AppCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  developer: string;
  rating: number;
  category?: string;
  url: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function AppCard({
  id,
  title,
  description,
  imageUrl,
  developer,
  rating,
  category,
  url,
  isFavorite = false,
  onToggleFavorite,
}: AppCardProps) {
  const router = useRouter();
  const stars = Array(5).fill(0);

  const { minimizeApp } = useMinimizedApps();

  const handleClick = () => {
    router.push(`/app/${id}?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
    
    // Add to minimized apps after a 1-second delay
    setTimeout(() => {
      minimizeApp({
        id: id.toString(),
        title,
        icon: '/window.svg',
        url
      });
    }, 1000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700
                 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-1">{title}</h3>
          <button
            onClick={onToggleFavorite}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <HeartSolidIcon className="h-4 w-4 text-red-500" />
            ) : (
              <HeartIcon className="h-4 w-4 text-gray-400 hover:text-red-500" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center space-x-1 mb-2">
          {stars.map((_, index) => (
            index < rating ? (
              <StarSolidIcon key={index} className="h-4 w-4 text-yellow-400" />
            ) : (
              <StarIcon key={index} className="h-4 w-4 text-gray-300 dark:text-gray-600" />
            )
          ))}
        </div>
        <div className="flex items-center justify-between text-xs">
          <p className="text-gray-500 dark:text-gray-400">
            by <span className="font-medium">{developer}</span>
          </p>
          {category && (
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
              {category}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
