"use client";

import type React from "react";

import { useState, useMemo, useEffect } from "react";
import {
  useChampions,
  useChampionFullData,
  useMaps,
  useItems,
  useRunes,
} from "@/lib/service";
import { motion, AnimatePresence } from "framer-motion";
import { ChampionGrid } from "./champion-grid";
import { Pagination } from "./pagination";
import { ChampionDetails } from "./champion-details";
import type { ChampionBasic } from "@/types/ChampionBasic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter, Map, Zap, Sword } from "lucide-react";
import { useLoading } from "@/contexts/loading-context";
import { LOLLoading } from "@/components/global/lol-loading";
import { RunesGrid } from "./runes-grid";
import { ItemsGrid } from "./items-grid";
import { MapsGrid } from "./maps-grid";

interface MainPanelProps {
  version?: string;
}

const ALL_ROLES = [
  "Fighter",
  "Tank",
  "Mage",
  "Assassin",
  "Support",
  "Marksman",
];

export default function MainPanel({ version }: MainPanelProps) {
  const { data: champions = {}, isLoading: isLoadingChampions } =
    useChampions(version);
  const { data: maps = {}, isLoading: isLoadingMaps } = useMaps(version);
  const { data: items = {}, isLoading: isLoadingItems } = useItems(version);
  const { data: runes = [], isLoading: isLoadingRunes } = useRunes(version);
  const { setLoading } = useLoading();
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<
    "champions" | "maps" | "runes" | "items" | "monsters"
  >("champions");
  const champsPerPage = 21;

  const {
    data: selectedChampionFull,
    isLoading: isLoadingFull,
    isFetching: isFetchingFull,
  } = useChampionFullData(version, selectedChampion || undefined);

  const getCurrentSectionLoading = () => {
    switch (activeSection) {
      case "champions":
        return isLoadingChampions;
      case "maps":
        return isLoadingMaps;
      case "items":
        return isLoadingItems;
      case "runes":
        return isLoadingRunes;

      default:
        return false;
    }
  };

  const currentSectionLoading = getCurrentSectionLoading();

  useEffect(() => {
    if (isInitialLoading && currentSectionLoading) {
      setLoading(true);
      return;
    }

    if (selectedChampion && (isLoadingFull || isFetchingFull)) {
      setLoading(true);
      return;
    }

    if (currentSectionLoading) {
      setLoading(true);
      return;
    }

    setLoading(false);
  }, [
    isInitialLoading,
    currentSectionLoading,
    selectedChampion,
    isLoadingFull,
    isFetchingFull,
    setLoading,
  ]);

  useEffect(() => {
    if (!currentSectionLoading && isInitialLoading) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentSectionLoading, isInitialLoading]);

  useEffect(() => {
    setIsInitialLoading(true);
  }, [version]);

  const handleChampionClick = async (championId: string) => {
    setSelectedChampion(championId);
  };

  const handleBackClick = () => {
    setSelectedChampion(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedRoles([]);
    setCurrentPage(1);
  };

  const handleSectionChange = (
    section: "champions" | "maps" | "runes" | "items"
  ) => {
    setActiveSection(section);
    setSelectedChampion(null);
    setSearchQuery("");
    setSelectedRoles([]);
    setCurrentPage(1);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const filteredChampions = useMemo(() => {
    const championList = Object.values(champions) as ChampionBasic[];

    return championList.filter((champion) => {
      const matchesSearch =
        !searchQuery.trim() ||
        champion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        champion.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRoles =
        selectedRoles.length === 0 ||
        selectedRoles.some((role) => champion.tags.includes(role));

      return matchesSearch && matchesRoles;
    });
  }, [champions, searchQuery, selectedRoles]);

  const sortedAndFilteredChampions = useMemo(() => {
    return filteredChampions.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredChampions]);

  const paginatedChampions = useMemo(() => {
    return sortedAndFilteredChampions.slice(
      (currentPage - 1) * champsPerPage,
      currentPage * champsPerPage
    );
  }, [sortedAndFilteredChampions, currentPage, champsPerPage]);

  const totalPages = Math.ceil(
    sortedAndFilteredChampions.length / champsPerPage
  );
  const hasActiveFilters = searchQuery || selectedRoles.length > 0;

  if (!version) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center max-w-md mx-auto"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#eb0029] to-[#ff6b6b] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#eb0029]/30"
          >
            <Sword className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl sm:text-3xl font-boldtext-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Select a Game Version
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-400 text-lg mb-8 leading-relaxed"
          >
            Choose a version from the sidebar to explore champions, items, maps,
            and runes from that patch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 backdrop-blur-sm"
          >
            <p className="text-gray-300 text-sm">
              <span className="text-[#eb0029] font-semibold">Tip:</span> Use the
              sidebar to select a League of Legends patch version and start
              exploring!
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (isInitialLoading || currentSectionLoading) {
    return (
      <LOLLoading
        message={`Loading ${
          activeSection.charAt(0).toUpperCase() + activeSection.slice(1)
        }...`}
        size="lg"
      />
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 text-white">
      <AnimatePresence>
        {selectedChampion ? (
          isLoadingFull || isFetchingFull ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <LOLLoading message="Loading Champion Details..." size="md" />
            </div>
          ) : (
            <ChampionDetails
              champion={selectedChampionFull}
              version={version}
              onBack={handleBackClick}
              isLoading={false}
            />
          )
        ) : (
          <div>
            {/* Main Navigation Header */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {activeSection.charAt(0).toUpperCase() +
                    activeSection.slice(1)}{" "}
                  ({version})
                  {activeSection === "champions" && hasActiveFilters && (
                    <span className="text-sm sm:text-base md:text-lg text-gray-400 ml-2 block sm:inline mt-1 sm:mt-0">
                      - {sortedAndFilteredChampions.length} results
                    </span>
                  )}
                </h2>

                {/* Section Navigation - Fixed for mobile */}
                <div className="w-full sm:w-auto">
                  <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide max-w-full">
                    <Button
                      variant={
                        activeSection === "champions" ? "default" : "outline"
                      }
                      onClick={() => handleSectionChange("champions")}
                      className="bg-[#1a1a1a] border-gray-700 text-white cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4 text-xs sm:text-sm flex-shrink-0 min-w-[80px] sm:min-w-[100px]"
                    >
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Champs</span>
                    </Button>

                    <Button
                      variant={activeSection === "maps" ? "default" : "outline"}
                      onClick={() => handleSectionChange("maps")}
                      className="bg-[#1a1a1a] border-gray-700 text-white cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4 text-xs sm:text-sm flex-shrink-0 min-w-[60px] sm:min-w-[80px]"
                    >
                      <Map className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Maps</span>
                    </Button>

                    <Button
                      variant={
                        activeSection === "runes" ? "default" : "outline"
                      }
                      onClick={() => handleSectionChange("runes")}
                      className="bg-[#1a1a1a] border-gray-700 text-white cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4 text-xs sm:text-sm flex-shrink-0 min-w-[60px] sm:min-w-[80px]"
                    >
                      <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Runes</span>
                    </Button>

                    <Button
                      variant={
                        activeSection === "items" ? "default" : "outline"
                      }
                      onClick={() => handleSectionChange("items")}
                      className="bg-[#1a1a1a] border-gray-700 text-white cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-4 text-xs sm:text-sm flex-shrink-0 min-w-[60px] sm:min-w-[80px]"
                    >
                      <Sword className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Items</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Rest of your existing code remains the same... */}
              {/* Section-specific content */}
              {activeSection === "champions" && (
                <div className="space-y-3 sm:space-y-4">
                  {/* Search and Filters for Champions */}
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                      {/* Search Input */}
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Search champions..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="pl-10 pr-10 bg-[#1a1a1a] border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                        />
                        {searchQuery && (
                          <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Filter Toggle Button */}
                      <Button
                        variant={showFilters ? "default" : "outline"}
                        onClick={() => setShowFilters(!showFilters)}
                        className="bg-[#1a1a1a] border-gray-700 text-white cursor-pointer w-full sm:w-auto text-sm sm:text-base"
                      >
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                        {selectedRoles.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="ml-2 bg-blue-600"
                          >
                            {selectedRoles.length}
                          </Badge>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Active Filters Display */}
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <span className="text-xs sm:text-sm text-gray-400">
                        Active filters:
                      </span>

                      {searchQuery && (
                        <Badge className="bg-blue-600 text-white flex items-center gap-1 text-xs sm:text-sm">
                          <span className="truncate max-w-[150px] sm:max-w-none">
                            Search: "{searchQuery}"
                          </span>
                          <button
                            onClick={clearSearch}
                            className="ml-1 hover:text-gray-300 flex-shrink-0"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}

                      {selectedRoles.map((role) => (
                        <Badge
                          key={role}
                          className="bg-purple-600 text-white flex items-center gap-1 text-xs sm:text-sm"
                        >
                          {role}
                          <button
                            onClick={() => toggleRole(role)}
                            className="ml-1 hover:text-gray-300"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-gray-400 hover:text-white text-xs"
                      >
                        Clear all
                      </Button>
                    </motion.div>
                  )}

                  {/* Role Filters */}
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-[#1a1a1a] rounded-lg p-3 sm:p-4 border border-gray-700"
                    >
                      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
                        Filter by Role
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {ALL_ROLES.map((role) => (
                          <Badge
                            key={role}
                            variant={
                              selectedRoles.includes(role)
                                ? "default"
                                : "outline"
                            }
                            className={`cursor-pointer transition-all duration-200 text-xs sm:text-sm ${
                              selectedRoles.includes(role)
                                ? "bg-blue-600 hover:bg-blue-700 text-white scale-105"
                                : "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                            }`}
                            onClick={() => toggleRole(role)}
                          >
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Other Sections Content */}
              {activeSection !== "champions" && (
                <div className="space-y-6">
                  {activeSection === "maps" && (
                    <MapsGrid
                      maps={maps}
                      version={version}
                      isLoading={isLoadingMaps}
                    />
                  )}

                  {activeSection === "items" && (
                    <ItemsGrid
                      items={items}
                      version={version}
                      isLoading={isLoadingItems}
                    />
                  )}

                  {activeSection === "runes" && (
                    <RunesGrid
                      runes={runes}
                      version={version}
                      isLoading={isLoadingRunes}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Champion Grid Content */}
            {activeSection === "champions" && (
              <>
                {/* No Results Message */}
                {sortedAndFilteredChampions.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12 text-gray-400"
                  >
                    {hasActiveFilters ? (
                      <>
                        <p className="text-lg mb-2">No champions found</p>
                        <p className="text-sm mb-4">
                          Try adjusting your search or filters
                        </p>
                        <button
                          onClick={clearAllFilters}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          Clear All Filters
                        </button>
                      </>
                    ) : (
                      <p className="text-lg">No champions available</p>
                    )}
                  </motion.div>
                )}

                {/* Champion Grid */}
                {sortedAndFilteredChampions.length > 0 && (
                  <>
                    <ChampionGrid
                      champions={paginatedChampions}
                      version={version}
                      onChampionClick={handleChampionClick}
                    />

                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
