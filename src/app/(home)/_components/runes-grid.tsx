"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOLLoading } from "@/components/global/lol-loading";
import Image from "next/image";

interface RunesGridProps {
  runes: any[];
  version: string;
  isLoading?: boolean;
}

export function RunesGrid({ runes, version, isLoading }: RunesGridProps) {
  const [expandedPathId, setExpandedPathId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LOLLoading message="Loading Runes..." size="md" />
      </div>
    );
  }

  if (!runes || runes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No runes available</p>
      </div>
    );
  }

  const togglePath = (id: number) => {
    setExpandedPathId(expandedPathId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {runes.map((path, pathIndex) => (
        <motion.div
          key={path.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: pathIndex * 0.1 }}
          className="bg-[#1a1a1a] rounded-lg border border-gray-700"
        >
          {/* Path Header (clickable) */}
          <div
            className="flex items-center gap-4 p-6 cursor-pointer"
            onClick={() => togglePath(path.id)}
          >
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/img/${path.icon}`}
              alt={path.name}
              width={48}
                height={48}
              className="rounded"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">{path.name}</h2>
              <p className="text-gray-400">{path.key}</p>
            </div>
          </div>

          {/* Accordion Content */}
          <AnimatePresence>
            {expandedPathId === path.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-6 pt-0 space-y-4"
              >
                {path.slots.map((slot: any, slotIndex: number) => (
                  <div key={slotIndex} className="space-y-3">
                    <h3 className="text-lg font-semibold text-white">
                      {slotIndex === 0 ? "Keystone" : `Slot ${slotIndex + 1}`}
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {slot.runes.map((rune: any) => (
                        <motion.div
                          key={rune.id}
                          whileHover={{ scale: 1.05 }}
                          className="bg-gray-800 rounded-lg p-3 border border-gray-600 hover:border-yellow-500 transition-all duration-200 cursor-pointer flex items-center gap-3"
                        >
                          <div className="relative w-8 h-8">
                            <Image
                              src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                              alt={rune.name}
                              width={32}
                                height={32}
                              className="rounded absolute top-0 left-0"
                            />
                            {rune.icon2 && (
                              <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon2}`}
                                alt={rune.name + " next"}
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-sm truncate">
                              {rune.name}
                            </h4>
                            <p className="text-gray-400 text-xs line-clamp-2">
                              {rune.shortDesc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
