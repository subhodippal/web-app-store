'use client';

import { AppCard } from '@/components/common/AppCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { useState } from 'react';

// Mock data - replace with real data in production
export const mockApps = [
  {
    id: 1,
    title: 'Photo Editor Pro',
    description: 'Professional photo editing tools with advanced filters, layers, and effects.',
    imageUrl: 'https://picsum.photos/seed/photo1/400/300',
    developer: 'Creative Labs Inc.',
    rating: 4,
    type: 'app',
    category: 'Productivity',
    url: 'https://photopea.com',
  },
  {
    id: 2,
    title: 'Task Manager Plus',
    description: 'Organize your tasks, set priorities, and boost productivity with smart reminders.',
    imageUrl: 'https://picsum.photos/seed/task2/400/300',
    developer: 'Productivity Tools',
    rating: 5,
    type: 'app',
    category: 'Productivity',
    url: 'https://todoist.com/app',
  },
  {
    id: 3,
    title: 'Puzzle Quest',
    description: 'Challenge your mind with beautiful puzzle games and brain teasers.',
    imageUrl: 'https://picsum.photos/seed/puzzle3/400/300',
    developer: 'Game Studio X',
    rating: 4,
    type: 'game',
    category: 'Puzzle',
    url: 'https://www.puzzlescript.net/play.html',
  },
  {
    id: 4,
    title: 'Music Studio',
    description: 'Create, mix, and produce music directly in your browser.',
    imageUrl: 'https://picsum.photos/seed/music4/400/300',
    developer: 'Audio Labs',
    rating: 3,
    type: 'app',
    category: 'Creative',
    url: 'https://www.soundtrap.com/studio',
  },
  {
    id: 5,
    title: 'Adventure Quest',
    description: 'Embark on an epic journey through mystical lands and dungeons.',
    imageUrl: 'https://picsum.photos/seed/adventure5/400/300',
    developer: 'Epic Games Co',
    rating: 5,
    type: 'game',
    category: 'Adventure',
    url: 'https://play.google.com/store/apps/details?id=com.ae.adventure&hl=en&gl=US',
  },
  {
    id: 6,
    title: 'Weather Forecast',
    description: 'Accurate weather predictions with radar maps and alerts.',
    imageUrl: 'https://picsum.photos/seed/weather6/400/300',
    developer: 'Weather Systems',
    rating: 4,
    type: 'app',
    category: 'Utilities',
    url: 'https://www.accuweather.com/',
  },
  {
    id: 7,
    title: 'Space Shooter',
    description: 'Fast-paced arcade space shooting game with multiplayer support.',
    imageUrl: 'https://picsum.photos/seed/space7/400/300',
    developer: 'Arcade Masters',
    rating: 5,
    type: 'game',
    category: 'Action',
    url: 'https://js13kgames.com/games/space-shooter/index.html',
  },
  {
    id: 8,
    title: 'Recipe Book',
    description: 'Thousands of recipes and meal planning tools.',
    imageUrl: 'https://picsum.photos/seed/recipe8/400/300',
    developer: 'Cooking Apps Inc.',
    rating: 4,
    type: 'app',
    category: 'Lifestyle',
    url: 'https://www.allrecipes.com/',
  },
  {
    id: 9,
    title: 'Racing Champions',
    description: 'Experience high-speed racing with realistic physics and graphics.',
    imageUrl: 'https://picsum.photos/seed/racing9/400/300',
    developer: 'Speed Games Ltd.',
    rating: 4,
    type: 'game',
    category: 'Racing',
    url: 'https://play.google.com/store/apps/details?id=com.ea.game.nfs14_row',
  },
  {
    id: 10,
    title: 'Language Learning',
    description: 'Learn new languages with interactive lessons and quizzes.',
    imageUrl: 'https://picsum.photos/seed/lang10/400/300',
    developer: 'Education Apps',
    rating: 5,
    type: 'app',
    category: 'Education',
    url: 'https://www.duolingo.com/',
  },
  {
    id: 11,
    title: 'Strategy Empire',
    description: 'Build and manage your empire in this strategic simulation game.',
    imageUrl: 'https://picsum.photos/seed/empire11/400/300',
    developer: 'Strategy Games Inc.',
    rating: 5,
    type: 'game',
    category: 'Strategy',
    url: 'https://play.google.com/store/apps/details?id=com.empire.strategy',
  },
  {
    id: 12,
    title: 'Meditation Guide',
    description: 'Guided meditation sessions and relaxation techniques.',
    imageUrl: 'https://picsum.photos/seed/meditation12/400/300',
    developer: 'Mindfulness Apps',
    rating: 4,
    type: 'app',
    category: 'Health',
    url: 'https://www.headspace.com/',
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeType, setActiveType] = useState<'all' | 'app' | 'game'>('all');

  const filteredApps = mockApps.filter(app => {
    const matchesSearch = 
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = activeType === 'all' || app.type === activeType;
    
    return matchesSearch && matchesType;
  });

  const toggleFavorite = (appId: number) => {
    setFavorites(prev =>
      prev.includes(appId)
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const appCount = mockApps.filter(app => app.type === 'app').length;
  const gameCount = mockApps.filter(app => app.type === 'game').length;

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="flex justify-center space-x-4 pb-2">
        <button
          onClick={() => setActiveType('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeType === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All ({mockApps.length})
        </button>
        <button
          onClick={() => setActiveType('app')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeType === 'app'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Apps ({appCount})
        </button>
        <button
          onClick={() => setActiveType('game')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeType === 'game'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Games ({gameCount})
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredApps.map(app => (
          <AppCard
            key={app.id}
            id={app.id}
            title={app.title}
            description={app.description}
            imageUrl={app.imageUrl}
            developer={app.developer}
            rating={app.rating}
            category={app.category}
            url={app.url}
            isFavorite={favorites.includes(app.id)}
            onToggleFavorite={() => toggleFavorite(app.id)}
          />
        ))}
        {filteredApps.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
            No items found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}
