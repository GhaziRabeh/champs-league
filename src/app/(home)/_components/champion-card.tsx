"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ChampionBasic } from "@/types/ChampionBasic";

interface ChampionCardProps {
  champion: ChampionBasic;
  version: string;
  onClick: (championId: string) => void;
}

export function ChampionCard({ champion, version, onClick }: ChampionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer group w-full"
      onClick={() => onClick(champion.id)}
    >
      <Card className="bg-[#1a1a1a] border-gray-800 hover:border-blue-500 transition-all duration-200 h-full group-hover:shadow-lg group-hover:shadow-blue-500/20 w-full">
        <CardContent className="p-2 sm:p-3 text-center w-full">
          {/* Champion Image */}
          {champion.image?.full ? (
            <div className="relative mb-2 sm:mb-3 w-full">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                  alt={champion.name || "Champion"}
                  fill
                  sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
                  className="rounded-lg group-hover:scale-110 transition-transform duration-200 object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-700 mx-auto rounded-lg mb-2 sm:mb-3 flex items-center justify-center group-hover:bg-gray-600 transition-colors">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
          
          {/* Champion Name and Title */}
          <h3 className="font-bold text-white text-xs sm:text-sm mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors px-1">
            {champion.name || "Unknown"}
          </h3>
          <p className="text-gray-300 text-xs line-clamp-2 group-hover:text-gray-200 transition-colors px-1">
            {champion.title || ""}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}