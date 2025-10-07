"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, X, ChevronLeft, ChevronRight } from "lucide-react";
import { LOLLoading } from "@/components/global/lol-loading";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface MapsGridProps {
  maps: Record<string, any>;
  version: string;
  isLoading?: boolean;
}

export function MapsGrid({ maps, version, isLoading }: MapsGridProps) {
  const [selectedMap, setSelectedMap] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LOLLoading message="Loading Maps..." size="md" />
      </div>
    );
  }

  if (!maps || Object.keys(maps).length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No maps available</p>
      </div>
    );
  }

  const allMaps = Object.values(maps);

  const getGameMode = (mapId: number) => {
    switch (mapId) {
      case 8:
        return "The Crystal Scar (Dominion)";
      case 10:
        return "Twisted Treeline (3v3)";
      case 11:
        return "Summoner's Rift (5v5)";
      case 12:
        return "Howling Abyss (ARAM)";
      case 21:
        return "Nexus Blitz";
      case 22:
        return "Convergence (Arena)";
      default:
        return "Unknown Game Mode";
    }
  };

  const getMapDescription = (mapId: number) => {
    switch (mapId) {
      case 8:
        return "Fast-paced capture point game mode (Dominion)";
      case 10:
        return "3v3 map with altars and Vilemaw boss";
      case 11:
        return "The primary competitive map for League of Legends";
      case 12:
        return "Single-lane ARAM map with random champion selection";
      case 21:
        return "Fast-paced, chaotic game mode with random events";
      case 22:
        return "2v2v2v2 experimental game mode with augments";
      default:
        return "League of Legends game map";
    }
  };

  const getMapImages = (map: any) => {
    const mapId = map.MapId;
    const images = [
      {
        type: "Icon",
        url: `https://ddragon.leagueoflegends.com/cdn/${version}/img/map/map${mapId}.png`,
        description: "Map Icon",
      },
      {
        type: "Loading Screen",
        url: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
          mapId === 11 ? "SummonersRift" : mapId === 12 ? "HowlingAbyss" : "Map"
        }_0.jpg`,
        description: "Loading Screen Art",
      },
      {
        type: "Minimap",
        url: `https://ddragon.leagueoflegends.com/cdn/${version}/img/map/map${mapId}.png`,
        description: "Minimap View",
      },
    ];
    return images;
  };

  const handleMapClick = (map: any) => {
    setSelectedMap(map);
    setCurrentImageIndex(0);
  };

  const handleCloseDetail = () => {
    setSelectedMap(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    const images = getMapImages(selectedMap);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getMapImages(selectedMap);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allMaps.map((map: any, index: number) => (
          <motion.div
            key={map.MapId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer"
            onClick={() => handleMapClick(map)}
          >
            <div
              className="relative h-48 bg-cover bg-center flex items-end justify-start p-4"
              style={{
                backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/${version}/img/map/map${map.MapId}.png)`,
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <span className="relative bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                {map.MapName}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
                {map.MapName}
              </h3>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Game Mode</span>
                <span className="text-white font-medium">
                  {getGameMode(parseInt(map.MapId))}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/map/map${map.MapId}.png`}
                  alt={map.MapName}
                  className="w-12 h-12 rounded border border-gray-600"
                  width={48}
                  height={48}
                  onError={(e) => {
                    e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/map/map11.png`;
                  }}
                />
                <div className="flex-1">
                  <p className="text-xs text-gray-400">
                    {getMapDescription(parseInt(map.MapId))}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map Detail Modal */}
      <AnimatePresence>
        {selectedMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseDetail}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a1a] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedMap.MapName}
                  </h2>
                  <p className="text-gray-400">
                    {getGameMode(parseInt(selectedMap.MapId))}
                  </p>
                </div>
                <Button
                  onClick={handleCloseDetail}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                      <img
                        src={getMapImages(selectedMap)[currentImageIndex].url}
                        alt={selectedMap.MapName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/map/map11.png`;
                        }}
                      />

                      {/* Navigation Arrows */}
                      {getMapImages(selectedMap).length > 1 && (
                        <>
                          <Button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                          >
                            <ChevronLeft className="h-6 w-6 text-white" />
                          </Button>
                          <Button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                          >
                            <ChevronRight className="h-6 w-6 text-white" />
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Image Thumbnails */}
                    {getMapImages(selectedMap).length > 1 && (
                      <div className="flex gap-2 justify-center">
                        {getMapImages(selectedMap).map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-16 h-16 rounded border-2 transition-all ${
                              currentImageIndex === index
                                ? "border-blue-500 scale-110"
                                : "border-gray-600 hover:border-gray-400"
                            }`}
                          >
                            <Image
                              src={image.url}
                              alt={image.description}
                              className="w-full h-full object-cover rounded"
                              width={64}
                              height={64}
                              onError={(e) => {
                                e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/map/map11.png`;
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Current Image Info */}
                    <div className="text-center">
                      <p className="text-white font-medium">
                        {getMapImages(selectedMap)[currentImageIndex].type}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {
                          getMapImages(selectedMap)[currentImageIndex]
                            .description
                        }
                      </p>
                    </div>
                  </div>

                  {/* Map Details */}
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Map Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Map ID:</span>
                          <span className="text-white">
                            {selectedMap.MapId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Game Mode:</span>
                          <span className="text-white">
                            {getGameMode(parseInt(selectedMap.MapId))}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Description
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {getMapDescription(parseInt(selectedMap.MapId))}
                      </p>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Features
                      </h3>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {parseInt(selectedMap.MapId) === 11 && (
                          <>
                            <li>• Three lanes with jungle areas</li>
                            <li>• Baron Nashor and Dragon objectives</li>
                            <li>• Turrets and Inhibitors</li>
                          </>
                        )}
                        {parseInt(selectedMap.MapId) === 12 && (
                          <>
                            <li>• Single lane with no recall</li>
                            <li>• Healing relics for sustain</li>
                            <li>• Random champion selection</li>
                          </>
                        )}
                        {parseInt(selectedMap.MapId) === 10 && (
                          <>
                            <li>• Two lanes with jungle</li>
                            <li>• Altars for team buffs</li>
                            <li>• Vilemaw as epic monster</li>
                          </>
                        )}
                        {parseInt(selectedMap.MapId) === 21 && (
                          <>
                            <li>• Fast-paced matches</li>
                            <li>• Random events and rewards</li>
                            <li>• Unique map mechanics</li>
                          </>
                        )}
                        {parseInt(selectedMap.MapId) === 22 && (
                          <>
                            <li>• 2v2v2v2 team format</li>
                            <li>• Augment system</li>
                            <li>• Round-based combat</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
