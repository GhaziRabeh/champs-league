"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion, Variants } from "framer-motion";
import { ChampionBasic } from "@/types/ChampionBasic";
import { Sword, Shield, Zap, Crosshair, Heart, Eye } from "lucide-react";

interface ChampionCardProps {
  champion: ChampionBasic;
  version: string;
  onClick: (championId: string) => void;
  viewMode: "grid" | "list";
  index?: number;
}

const roleIcons: { [key: string]: any } = {
  "Fighter": Sword,
  "Tank": Shield,
  "Mage": Zap,
  "Assassin": Crosshair,
  "Marksman": Crosshair,
  "Support": Heart,
};

export function ChampionCard({ champion, version, onClick, viewMode, index = 0 }: ChampionCardProps) {
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.05
      }
    }
  };

  const listCardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.03
      }
    }
  };

  return (
    <motion.div
      variants={viewMode === "grid" ? cardVariants : listCardVariants}
      whileHover={{ 
        scale: viewMode === "grid" ? 1.05 : 1.02, 
        y: viewMode === "grid" ? -8 : -2,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer group w-full"
      onClick={() => onClick(champion.id)}
    >
      <Card className={`
        bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]
        border border-gray-700/50
        hover:border-blue-500/80
        transition-all duration-300 
        h-full w-full
        group-hover:shadow-2xl group-hover:shadow-blue-500/20
        backdrop-blur-sm
        overflow-hidden
        relative
        ${viewMode === "list" ? "flex items-center p-1" : ""}
        
        /* Glow effect */
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/0 before:via-blue-500/10 before:to-purple-500/0 
        before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100
      `}>
        
        {/* Animated border gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
        
        <CardContent className={`
          relative z-10
          ${viewMode === "list" 
            ? "flex items-center gap-4 p-4 w-full" 
            : "p-4 text-center w-full"
          }
          bg-gradient-to-b from-transparent to-black/20
        `}>
          
          {/* Champion Image */}
          {champion.image?.full ? (
            <motion.div 
              whileHover={{ rotate: viewMode === "grid" ? 2 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`
                relative 
                ${viewMode === "list" 
                  ? "w-20 h-20 flex-shrink-0" 
                  : "w-full aspect-square mb-4 mx-auto"
                }
                rounded-xl
                overflow-hidden
                border-2 border-gray-600/50
                group-hover:border-blue-400
                transition-all duration-300
                shadow-lg
              `}
            >
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                alt={champion.name || "Champion"}
                fill
                sizes={viewMode === "list" 
                  ? "80px" 
                  : "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 15vw"
                }
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ) : (
            <div className={`
              bg-gradient-to-br from-gray-700 to-gray-800
              rounded-xl
              flex items-center justify-center 
              border-2 border-gray-600/50
              group-hover:border-blue-400
              transition-all duration-300
              shadow-lg
              ${viewMode === "list" 
                ? "w-20 h-20 flex-shrink-0" 
                : "w-full aspect-square mb-4 mx-auto"
              }
            `}>
              <Eye className="h-8 w-8 text-gray-400 group-hover:text-blue-300 transition-colors duration-300" />
            </div>
          )}
          
          {/* Text Content */}
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 200 }}
            className={`
              ${viewMode === "list" 
                ? "flex-1 min-w-0 text-left space-y-2" 
                : "text-center space-y-3"
              }
            `}
          >
            {/* Champion Name */}
            <motion.h3 
              whileHover={{ scale: 1.05 }}
              className={`
                font-bold text-white 
                ${viewMode === "list" 
                  ? "text-xl mb-0" 
                  : "text-lg mb-0"
                }
                line-clamp-1 
                group-hover:text-blue-300 
                transition-colors duration-300
                drop-shadow-lg
              `}
            >
              {champion.name || "Unknown"}
            </motion.h3>
            
            {/* Champion Title */}
            <motion.p 
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              className={`
                text-gray-300 
                ${viewMode === "list" 
                  ? "text-base" 
                  : "text-sm"
                }
                line-clamp-2 
                group-hover:text-gray-100 
                transition-colors duration-300
                italic
              `}
            >
              "{champion.title || "No title"}"
            </motion.p>

            {/* Additional info for list view */}
            {viewMode === "list" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2 mt-3"
              >
                {champion.tags?.map((tag, tagIndex) => {
                  const IconComponent = roleIcons[tag] || Sword;
                  return (
                    <motion.span 
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (tagIndex * 0.1) }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="
                        bg-gradient-to-r from-blue-600/80 to-purple-600/80
                        text-white text-xs font-semibold 
                        px-3 py-1.5 rounded-full
                        flex items-center gap-1.5
                        border border-blue-400/30
                        shadow-lg
                        backdrop-blur-sm
                      "
                    >
                      <IconComponent className="h-3 w-3" />
                      {tag}
                    </motion.span>
                  );
                })}
                
                {/* Stats info */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4 text-xs text-gray-400 mt-2"
                >
                  <span className="flex items-center gap-1">
                    <Sword className="h-3 w-3 text-red-400" />
                    ATK: {champion.info?.attack || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-blue-400" />
                    DEF: {champion.info?.defense || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-yellow-400" />
                    MAG: {champion.info?.magic || 0}
                  </span>
                </motion.div>
              </motion.div>
            )}

            {/* Grid view tags */}
            {viewMode === "grid" && champion.tags && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center gap-1 flex-wrap"
              >
                {champion.tags.slice(0, 2).map((tag, tagIndex) => {
                  const IconComponent = roleIcons[tag] || Sword;
                  return (
                    <motion.span 
                      key={tag}
                      whileHover={{ scale: 1.1 }}
                      className="
                        bg-blue-600/80 text-white text-[10px] font-semibold 
                        px-2 py-1 rounded-md
                        flex items-center gap-1
                        border border-blue-400/30
                      "
                    >
                      <IconComponent className="h-2.5 w-2.5" />
                      {tag}
                    </motion.span>
                  );
                })}
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}