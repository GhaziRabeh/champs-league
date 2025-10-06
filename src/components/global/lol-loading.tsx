"use client";

import { motion } from "framer-motion";

interface LOLLoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LOLLoading({ message = "Loading...", size = "md" }: LOLLoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Sword spinning animation (inspired by League weapons) */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`${sizeClasses[size]} border-4 border-yellow-500 border-t-transparent border-r-transparent rounded-full`}
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-2 h-6 bg-red-600 rounded-full transform -rotate-45" />
        </motion.div>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white font-semibold text-center"
      >
        {message}
      </motion.p>
      
      {/* Progress dots */}
      <motion.div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            className="w-2 h-2 bg-blue-500 rounded-full"
          />
        ))}
      </motion.div>
    </div>
  );
}