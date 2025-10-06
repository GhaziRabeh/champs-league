"use client";

import { ChampionBasic } from "@/types/ChampionBasic";
import { ChampionCard } from "./champion-card";
import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChampionGridProps {
  champions: ChampionBasic[];
  version: string;
  onChampionClick: (championId: string) => void;
}

export function ChampionGrid({ champions, version, onChampionClick }: ChampionGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      {/* View Toggle Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end mb-6 gap-2"
      >
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("grid")}
          className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border-gray-700 cursor-pointer"
        >
          <Grid3X3 className="h-4 w-4" />
          Grid
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
          className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border-gray-700 cursor-pointer"
        >
          <List className="h-4 w-4" />
          List
        </Button>
      </motion.div>

      {/* Champions Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`
            ${viewMode === "grid" 
              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5 md:gap-6" 
              : "flex flex-col gap-4"
            }
            mb-6
          `}
        >
          {champions.map((champion, index) => (
            <ChampionCard
              key={champion.id}
              champion={champion}
              version={version}
              onClick={onChampionClick}
              viewMode={viewMode}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}