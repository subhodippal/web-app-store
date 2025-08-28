'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export function SearchBar({ onSearch, className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search to avoid too many updates
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <motion.div
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        className="relative"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search apps by name or description..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 
                   dark:border-gray-700 bg-white dark:bg-gray-800 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   dark:focus:ring-blue-400 transition-all duration-200
                   placeholder-gray-400 dark:placeholder-gray-500"
        />
        <MagnifyingGlassIcon 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 
                     text-gray-400 dark:text-gray-500 pointer-events-none" 
        />
      </motion.div>
    </div>
  );
}
