'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-pulse" />
    );
  }
  
  return <ThemeToggleClient />;
}

function ThemeToggleClient() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2 rounded-full bg-gray-800/50 dark:bg-gray-200/10 border border-gray-700/50 dark:border-gray-600/50 backdrop-blur-sm hover:bg-gray-700/50 dark:hover:bg-gray-200/20 transition-all duration-300"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            rotate: theme === 'dark' ? 0 : 180,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={20} className="text-blue-400" />
        </motion.div>
        
        <motion.div
          initial={false}
          animate={{
            rotate: theme === 'light' ? 0 : -180,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={20} className="text-yellow-500" />
        </motion.div>
      </div>
    </motion.button>
  );
}