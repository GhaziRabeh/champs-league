"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChampionFull } from "@/types/ChampionBasic";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sword, Shield, Zap, Crosshair, Heart, Star, BookOpen, Sparkles } from "lucide-react";

interface ChampionDetailsProps {
  champion: ChampionFull;
  version: string;
  onBack: () => void;
  isLoading?: boolean;
}

const roleIcons: { [key: string]: any } = {
  "Fighter": Sword,
  "Tank": Shield,
  "Mage": Zap,
  "Assassin": Crosshair,
  "Marksman": Crosshair,
  "Support": Heart,
};

export function ChampionDetails({ champion, version, onBack, isLoading = false }: ChampionDetailsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white text-lg">Loading champion details...</p>
        </motion.div>
      </div>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.5 
      }}
      className="mb-6"
    >
      <Card className="
        bg-gradient-to-br from-[#0A1428] via-[#1a1a1a] to-[#2a2a2a]
        border border-gray-700/50
        shadow-2xl
        backdrop-blur-sm
        overflow-hidden
        relative
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/5 before:to-red-500/10
      ">
        {/* Animated background elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity }
          }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity }
          }}
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"
        />

        <CardHeader className="
          flex flex-row justify-between items-start sm:items-center 
          pb-6 border-b border-gray-700/50
          bg-gradient-to-r from-black/30 to-transparent
          relative z-10
        ">
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            {/* Champion Image */}
            {champion.image?.full && (
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  width={100}
                  height={100}
                  className="
                    rounded-2xl 
                    border-4 border-gradient-to-r from-yellow-500 via-orange-500 to-red-500
                    shadow-2xl
                   
                  "
                />
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl border-2 border-yellow-400/50"
                />
              </motion.div>
            )}
            
            <div className="space-y-2">
              <motion.h1 
                variants={itemVariants}
                className="
                  text-4xl sm:text-5xl font-black text-white 
                  bg-gradient-to-r from-white via-blue-200 to-purple-200
                  bg-clip-text 
                  drop-shadow-2xl
                "
              >
                {champion.name}
              </motion.h1>
              
              <motion.h2 
                variants={itemVariants}
                className="
                  text-xl sm:text-2xl text-gray-300 italic
                  font-light
                  drop-shadow-lg
                "
              >
                {champion.title}
              </motion.h2>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-2 mt-4 sm:mt-0"
          >
            <Button
              onClick={onBack}
              className="
                px-6 py-3 
                bg-gradient-to-r from-red-600 to-orange-600
                hover:from-red-700 hover:to-orange-700
                text-white font-semibold 
                rounded-xl
                transition-all duration-300
                shadow-lg hover:shadow-red-500/25
                flex items-center gap-2
                group
                border border-red-500/30
                cursor-pointer
              "
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to List
            </Button>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-8 pt-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Roles */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center gap-2">
                <Sword className="h-5 w-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Champion Roles</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {champion.tags?.map((tag: string, index: number) => {
                  const IconComponent = roleIcons[tag] || Star;
                  return (
                    <motion.div
                      key={tag}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200,
                        delay: index * 0.1 
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -5,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                    >
                      <Badge className="
                        bg-gradient-to-r from-blue-600/90 to-purple-600/90
                        text-white 
                        px-4 py-2 
                        text-sm font-semibold
                        rounded-xl
                        border border-blue-400/30
                        shadow-lg
                        flex items-center gap-2
                        backdrop-blur-sm
                      ">
                        <IconComponent className="h-4 w-4" />
                        {tag}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Stats */}
            {champion.info && (
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Champion Stats</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Attack", value: champion.info.attack, icon: Sword, color: "text-red-400" },
                    { label: "Defense", value: champion.info.defense, icon: Shield, color: "text-blue-400" },
                    { label: "Magic", value: champion.info.magic, icon: Zap, color: "text-purple-400" },
                    { label: "Difficulty", value: champion.info.difficulty, icon: Star, color: "text-yellow-400" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="
                        bg-gray-800/50 
                        rounded-xl 
                        p-4 
                        text-center
                        border border-gray-700/50
                        backdrop-blur-sm
                        hover:border-blue-500/50
                        transition-all duration-300
                      "
                    >
                      <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                      <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                      <p className="text-white text-2xl font-bold">{stat.value}/10</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Blurb */}
            {champion.blurb && (
              <motion.div variants={itemVariants}>
                <div className="
                  bg-gradient-to-r from-blue-500/10 to-purple-500/10
                  rounded-2xl p-6 
                  border-l-4 border-blue-500
                  backdrop-blur-sm
                  relative overflow-hidden
                ">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Overview</h3>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-200 leading-relaxed text-lg"
                  >
                    {champion.blurb}
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Lore */}
            {champion.lore && (
              <motion.div variants={itemVariants}>
                <div className="
                  bg-gradient-to-r from-purple-500/10 to-pink-500/10
                  rounded-2xl p-6 
                  border-l-4 border-purple-500
                  backdrop-blur-sm
                  relative overflow-hidden
                ">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Lore</h3>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-gray-200 leading-relaxed text-lg"
                  >
                    {champion.lore}
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* Passive */}
            <motion.div variants={itemVariants}>
              <div className="
                bg-gradient-to-r from-yellow-500/10 to-orange-500/10
                rounded-2xl p-6 
                border-l-4 border-yellow-500
                backdrop-blur-sm
                relative overflow-hidden
              ">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-orange-500" />
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Passive Ability</h3>
                </div>
                
                {champion.passive ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="flex flex-col sm:flex-row items-start gap-6"
                  >
                    {champion.passive.image?.full && (
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex-shrink-0"
                      >
                        <Image
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champion.passive.image.full}`}
                          alt={champion.passive.name}
                          width={80}
                          height={80}
                          className="
                            rounded-xl 
                            border-2 border-yellow-500
                            shadow-lg
                            bg-gradient-to-br from-yellow-500/20 to-orange-500/20
                          "
                        />
                      </motion.div>
                    )}
                    <div className="flex-1 space-y-4">
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="font-semibold text-white text-2xl mb-2"
                      >
                        {champion.passive.name}
                      </motion.p>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="text-gray-200 leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ 
                          __html: champion.passive.description 
                        }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <p className="text-gray-400 text-lg">No passive data available</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}