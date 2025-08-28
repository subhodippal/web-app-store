'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function AppViewPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  if (!url) {
    return <div>No URL provided</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-[calc(100vh-4rem)]"
    >
      <iframe
        src={url}
        className="w-full h-full"
        style={{ border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </motion.div>
  );
}
