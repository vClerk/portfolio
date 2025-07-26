'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ size = 'md', text = 'Loading 3D Scene...' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/30 backdrop-blur-sm">
      <div className="space-y-4 text-center">
        <motion.div
          className={`${sizeClasses[size]} border-blue-500/30 border-t-blue-500 rounded-full mx-auto`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <div className="space-y-2">
          <p className="text-foreground/70 text-sm font-medium">{text}</p>
          <div className="flex space-x-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}