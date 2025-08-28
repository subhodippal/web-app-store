'use client';

import { ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface FloatingRestoreButtonProps {
  onClick: () => void;
}

export function FloatingRestoreButton({ onClick }: FloatingRestoreButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ 
        scale: 1.1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
      onClick={onClick}
      className="fixed top-1 right-4 z-[100] p-2 rounded-lg 
                 bg-black/50 backdrop-blur-sm
                 hover:bg-black/70 transition-colors
                 group"
      aria-label="Restore window size"
    >
      <motion.div
        whileHover={{ rotate: -180 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowsPointingInIcon className="h-5 w-5 text-white opacity-75 group-hover:opacity-100" />
      </motion.div>
    </motion.button>
  );
}
