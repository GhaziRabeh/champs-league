"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className = "" }: LoadingSpinnerProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`border-2 border-gray-300 border-t-blue-600 rounded-full ${className}`}
    />
  );
}