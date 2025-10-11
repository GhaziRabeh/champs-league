"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Sword,
  Shield,
  Zap,
  Crosshair,
  Heart,
  Star,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ChampionFull } from "@/types/ChampionBasic";

interface ChampionDetailsProps {
  champion: ChampionFull;
  version: string;
  onBack: () => void;
  isLoading?: boolean;
}

const roleIcons: { [key: string]: any } = {
  Fighter: Sword,
  Tank: Shield,
  Mage: Zap,
  Assassin: Crosshair,
  Marksman: Crosshair,
  Support: Heart,
};

interface SkinModalProps {
  skin: any;
  champion: ChampionFull;
  version: string;
  isOpen: boolean;
  onClose: () => void;
}

function SkinModal({
  skin,
  champion,
  version,
  isOpen,
  onClose,
}: SkinModalProps) {
  const [selectedChroma, setSelectedChroma] = useState(0);

  const getSkinImageUrl = (skinNum: number) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skinNum}.jpg`;
  };

  const getChromaImageUrl = (skinNum: number, chromaId: string) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skinNum}.jpg`;
  };

  const formatSkinName = (skinName: string) => {
    if (skinName === "default" || skinName === "classic") return "Classic";
    return skinName.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl max-w-6xl w-full max-h-[90vh] sm:max-h-[95vh] overflow-hidden border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-start sm:items-center p-3 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex-1 pr-2">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white line-clamp-1">
                  {formatSkinName(skin.name)}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg">
                  {champion.name}
                </p>
              </div>
              <Button
                onClick={onClose}
                className="p-2 sm:p-3 bg-black/50 hover:bg-black/70 text-white rounded-lg sm:rounded-xl cursor-pointer backdrop-blur-sm border border-gray-600 flex-shrink-0"
              >
                <X className="h-4 w-4 sm:h-6 sm:w-6" />
              </Button>
            </div>

            {/* Full Screen Image */}
            <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[95vh]">
              <Image
                src={getSkinImageUrl(skin.num) || "/placeholder.svg"}
                alt={skin.name}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`;
                }}
              />

              {/* Chromas Section Overlay */}
              {skin.chromas && skin.chromas.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-6">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-white text-sm sm:text-lg md:text-xl font-semibold mb-2 sm:mb-4 text-center">
                      Chromas ({skin.chromas.length})
                    </h3>
                    <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                      {skin.chromas.map((chroma: any, index: number) => (
                        <motion.button
                          key={chroma.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedChroma(index)}
                          className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                            selectedChroma === index
                              ? "border-purple-500 ring-2 ring-purple-500/50"
                              : "border-gray-500 hover:border-gray-300"
                          }`}
                        >
                          <Image
                            src={
                              getChromaImageUrl(skin.num, chroma.id) ||
                              "/placeholder.svg"
                            }
                            alt={`Chroma ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                            {index + 1}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Skin Info Overlay */}
              <div className="hidden md:block absolute top-1/2 right-3 lg:right-6 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-xl p-3 lg:p-4 max-w-xs">
                <h4 className="text-white font-semibold text-base lg:text-lg mb-2">
                  Skin Details
                </h4>
                <p className="text-gray-300 text-xs lg:text-sm mb-1">
                  {skin.num === 0 ? "Classic Skin" : "Alternate Skin"}
                </p>
                <p className="text-gray-400 text-xs lg:text-sm">
                  Skin ID: {skin.num}
                </p>
                {skin.chromas && (
                  <p className="text-purple-300 text-xs lg:text-sm mt-2">
                    {skin.chromas.length} chroma(s) available
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ChampionDetails({
  champion,
  version,
  onBack,
  isLoading = false,
}: ChampionDetailsProps) {
  const [currentSkinIndex, setCurrentSkinIndex] = useState(0);
  const [selectedSkin, setSelectedSkin] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Get skins data
  const skins = champion.skins || [];
  const visibleSkins = skins.slice(0, 15); // Show first 15 skins

  // Responsive skins per view
  const getSkinsPerView = () => {
    if (typeof window === "undefined") return 2;
    const width = window.innerWidth;
    if (width < 640) return 2;
    if (width < 768) return 3;
    if (width < 1024) return 3;
    return 5; // Desktop: 5 skins
  };

  const [skinsPerView, setSkinsPerView] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setSkinsPerView(getSkinsPerView());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(
    0,
    Math.ceil(visibleSkins.length / skinsPerView) - 1
  );

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentSkinIndex(newIndex);

    if (scrollContainerRef.current) {
      const skinWidth = 128; // Mobile skin width
      const gap = 8; // Mobile gap
      const scrollPosition = newIndex * skinsPerView * (skinWidth + gap);
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    scrollToIndex(currentSkinIndex - 1);
  };

  const scrollRight = () => {
    scrollToIndex(currentSkinIndex + 1);
  };

  const getSkinImageUrl = (skinNum: number) => {
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_${skinNum}.jpg`;
  };

  const formatSkinName = (skinName: string) => {
    if (skinName === "default" || skinName === "classic") return "Classic";
    return skinName.replace(/([A-Z])/g, " $1").trim();
  };

  const openSkinModal = (skin: any) => {
    setSelectedSkin(skin);
    setIsModalOpen(true);
  };

  const closeSkinModal = () => {
    setIsModalOpen(false);
    setSelectedSkin(null);
  };

  // Get current visible skins based on viewport
  const startIndex = currentSkinIndex * skinsPerView;
  const currentSkins = visibleSkins.slice(
    startIndex,
    startIndex + skinsPerView
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.5,
        }}
        className="mb-4 sm:mb-6"
      >
        <Card
          className="
          bg-gradient-to-br from-[#0A1428] via-[#1a1a1a] to-[#2a2a2a]
          border border-gray-700/50
          shadow-2xl
          backdrop-blur-sm
          overflow-hidden
          relative
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 before:via-purple-500/5 before:to-red-500/10
        "
        >
          {/* Animated background elements */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
            }}
            className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              rotate: {
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              scale: { duration: 5, repeat: Number.POSITIVE_INFINITY },
            }}
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"
          />

          <CardHeader
            className="
            flex flex-col sm:flex-row justify-between items-start gap-4
            p-4 sm:p-6 pb-4 sm:pb-6 border-b border-gray-700/50
            bg-gradient-to-r from-black/30 to-transparent
            relative z-10
          "
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto"
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
                    width={80}
                    height={80}
                    className="
                      w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                      rounded-xl sm:rounded-2xl 
                      border-2 sm:border-4 border-gradient-to-r from-yellow-500 via-orange-500 to-red-500
                      shadow-2xl
                    "
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-yellow-400/50"
                  />
                </motion.div>
              )}

              <div className="space-y-1 sm:space-y-2">
                <motion.h1
                  variants={itemVariants}
                  className="
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white 
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
                    text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 italic
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
              className="flex gap-2 w-full sm:w-auto"
            >
              <Button
                onClick={onBack}
                className="
                  w-full sm:w-auto
                  px-4 sm:px-6 py-2 sm:py-3 
                  bg-gradient-to-r from-red-600 to-orange-600
                  hover:from-red-700 hover:to-orange-700
                  text-white text-sm sm:text-base font-semibold 
                  rounded-lg sm:rounded-xl
                  transition-all duration-300
                  shadow-lg hover:shadow-red-500/25
                  flex items-center justify-center gap-2
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

          <CardContent className="space-y-6 sm:space-y-8 pt-4 sm:pt-6 md:pt-8 p-4 sm:p-6 relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 sm:space-y-8"
            >
              {/* Skins Carousel */}
              {visibleSkins.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Skins
                      </h3>
                      <Badge className="bg-purple-600 text-white text-xs sm:text-sm">
                        {visibleSkins.length} skins
                      </Badge>
                    </div>

                    {/* Navigation Arrows - Show only when there are more skins than current view */}
                    {visibleSkins.length > skinsPerView && (
                      <div className="flex gap-1 sm:gap-2">
                        <Button
                          onClick={scrollLeft}
                          disabled={currentSkinIndex === 0}
                          className="
                            p-2 sm:p-3 
                            bg-gray-700 hover:bg-gray-600 
                            disabled:bg-gray-800 disabled:text-gray-500
                            text-white 
                            rounded-lg
                            transition-all duration-200
                            cursor-pointer
                          "
                        >
                          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                        <Button
                          onClick={scrollRight}
                          disabled={currentSkinIndex >= maxIndex}
                          className="
                            p-2 sm:p-3 
                            bg-gray-700 hover:bg-gray-600 
                            disabled:bg-gray-800 disabled:text-gray-500
                            text-white 
                            rounded-lg
                            transition-all duration-200
                            cursor-pointer
                          "
                        >
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Skins Container */}
                  <div className="relative">
                    <div
                      ref={scrollContainerRef}
                      className="
                        flex gap-2 sm:gap-3 md:gap-4 
                        overflow-x-auto
                        pb-2 sm:pb-4
                        snap-x snap-mandatory
                        scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent
                      "
                    >
                      {currentSkins.map((skin, index) => (
                        <motion.div
                          key={skin.id}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="
                            flex-shrink-0 
                            w-32 sm:w-36 md:w-40 lg:w-44
                            cursor-pointer
                            snap-start
                          "
                          onClick={() => openSkinModal(skin)}
                        >
                          <div
                            className="
                            bg-gradient-to-br from-gray-800 to-gray-900
                            rounded-lg sm:rounded-xl 
                            overflow-hidden
                            border-2 border-gray-600
                            hover:border-purple-500
                            transition-all duration-300
                            shadow-lg
                            group
                            w-full
                          "
                          >
                            {/* Skin Image */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                              <Image
                                src={
                                  getSkinImageUrl(skin.num) ||
                                  "/placeholder.svg"
                                }
                                alt={skin.name}
                                fill
                                className="
                                  object-cover 
                                  group-hover:scale-110 
                                  transition-transform duration-500
                                "
                                onError={(e) => {
                                  e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`;
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                              {/* Chroma Badge */}
                              {skin.chromas && (
                                <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                                  <Badge className="bg-purple-600 text-white text-[10px] sm:text-xs px-1 sm:px-2">
                                    Chromas
                                  </Badge>
                                </div>
                              )}

                              {/* Skin Number */}
                              <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                                <Badge className="bg-blue-600 text-white text-[10px] sm:text-xs px-1 sm:px-2">
                                  #{skin.num}
                                </Badge>
                              </div>
                            </div>

                            {/* Skin Info */}
                            <div className="p-2 sm:p-3">
                              <h4
                                className="
                                text-white 
                                font-semibold 
                                text-xs sm:text-sm 
                                truncate
                                group-hover:text-purple-300
                                transition-colors
                              "
                              >
                                {formatSkinName(skin.name)}
                              </h4>
                              <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
                                {skin.num === 0
                                  ? "Classic Skin"
                                  : "Alternate Skin"}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Scroll Indicator */}
                    {visibleSkins.length > skinsPerView && (
                      <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
                        {Array.from({ length: maxIndex + 1 }).map(
                          (_, index) => (
                            <button
                              key={index}
                              onClick={() => scrollToIndex(index)}
                              className={`h-2 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                                currentSkinIndex === index
                                  ? "bg-purple-500 w-4 sm:w-6"
                                  : "w-2 sm:w-3 bg-gray-600 hover:bg-gray-400"
                              }`}
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Rest of the content remains the same */}
              {/* Roles */}
              <motion.div
                variants={itemVariants}
                className="space-y-2 sm:space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Sword className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Champion Roles
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
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
                          delay: index * 0.1,
                        }}
                        whileHover={{
                          scale: 1.1,
                          y: -5,
                          transition: { type: "spring", stiffness: 400 },
                        }}
                      >
                        <Badge
                          className="
                          bg-gradient-to-r from-blue-600/90 to-purple-600/90
                          text-white 
                          px-3 py-1.5 sm:px-4 sm:py-2 
                          text-xs sm:text-sm font-semibold
                          rounded-lg sm:rounded-xl
                          border border-blue-400/30
                          shadow-lg
                          flex items-center gap-1.5 sm:gap-2
                          backdrop-blur-sm
                        "
                        >
                          <IconComponent className="h-3 w-3 sm:h-4 sm:w-4" />
                          {tag}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Stats */}
              {champion.info && (
                <motion.div
                  variants={itemVariants}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Champion Stats
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      {
                        label: "Attack",
                        value: champion.info.attack,
                        icon: Sword,
                        color: "text-red-400",
                      },
                      {
                        label: "Defense",
                        value: champion.info.defense,
                        icon: Shield,
                        color: "text-blue-400",
                      },
                      {
                        label: "Magic",
                        value: champion.info.magic,
                        icon: Zap,
                        color: "text-purple-400",
                      },
                      {
                        label: "Difficulty",
                        value: champion.info.difficulty,
                        icon: Star,
                        color: "text-yellow-400",
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="
                          bg-gray-800/50 
                          rounded-lg sm:rounded-xl 
                          p-3 sm:p-4 
                          text-center
                          border border-gray-700/50
                          backdrop-blur-sm
                          hover:border-blue-500/50
                          transition-all duration-300
                        "
                      >
                        <stat.icon
                          className={`h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 ${stat.color}`}
                        />
                        <p className="text-gray-400 text-xs sm:text-sm font-medium">
                          {stat.label}
                        </p>
                        <p className="text-white text-xl sm:text-2xl font-bold">
                          {stat.value}/10
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Blurb */}
              {champion.blurb && (
                <motion.div variants={itemVariants}>
                  <div
                    className="
                    bg-gradient-to-r from-blue-500/10 to-purple-500/10
                    rounded-xl sm:rounded-2xl p-4 sm:p-6 
                    border-l-4 border-blue-500
                    backdrop-blur-sm
                    relative overflow-hidden
                  "
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Overview
                      </h3>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg"
                    >
                      {champion.blurb}
                    </motion.p>
                  </div>
                </motion.div>
              )}

              {/* Lore */}
              {champion.lore && (
                <motion.div variants={itemVariants}>
                  <div
                    className="
                    bg-gradient-to-r from-purple-500/10 to-pink-500/10
                    rounded-xl sm:rounded-2xl p-4 sm:p-6 
                    border-l-4 border-purple-500
                    backdrop-blur-sm
                    relative overflow-hidden
                  "
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Lore
                      </h3>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg"
                    >
                      {champion.lore}
                    </motion.p>
                  </div>
                </motion.div>
              )}

              {/* Passive */}
              <motion.div variants={itemVariants}>
                <div
                  className="
                  bg-gradient-to-r from-yellow-500/10 to-orange-500/10
                  rounded-xl sm:rounded-2xl p-4 sm:p-6 
                  border-l-4 border-yellow-500
                  backdrop-blur-sm
                  relative overflow-hidden
                "
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-orange-500" />
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Passive Ability
                    </h3>
                  </div>

                  {champion.passive ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
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
                            width={64}
                            height={64}
                            className="
                              w-16 h-16 sm:w-20 sm:h-20
                              rounded-lg sm:rounded-xl 
                              border-2 border-yellow-500
                              shadow-lg
                              bg-gradient-to-br from-yellow-500/20 to-orange-500/20
                            "
                          />
                        </motion.div>
                      )}
                      <div className="flex-1 space-y-2 sm:space-y-4">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="font-semibold text-white text-lg sm:text-xl md:text-2xl mb-2"
                        >
                          {champion.passive.name}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.1 }}
                          className="text-gray-200 leading-relaxed text-sm sm:text-base md:text-lg"
                          dangerouslySetInnerHTML={{
                            __html: champion.passive.description,
                          }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-6 sm:py-8"
                    >
                      <p className="text-gray-400 text-base sm:text-lg">
                        No passive data available
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skin Modal */}
      {selectedSkin && (
        <SkinModal
          skin={selectedSkin}
          champion={champion}
          version={version}
          isOpen={isModalOpen}
          onClose={closeSkinModal}
        />
      )}
    </>
  );
}
