"use client";

import { useState, useMemo, useEffect } from "react";
import { useChampions } from "@/lib/service";
import { motion, AnimatePresence } from "framer-motion";
import { ChampionGrid } from "./champion-grid";
import { Pagination } from "./pagination";
import { ChampionDetails } from "./champion-details";
import { ChampionBasic, ChampionFull } from "@/types/ChampionBasic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import { useLoading } from "@/contexts/loading-context";
import { LOLLoading } from "@/components/global/lol-loading";

interface MainPanelProps {
  version?: string;
}


const ALL_ROLES = ["Fighter", "Tank", "Mage", "Assassin", "Support", "Marksman"];

export default function MainPanel({ version }: MainPanelProps) {
  const { data: champions = {}, isLoading } = useChampions(version);
  const { setLoading } = useLoading();
  const [selectedChampion, setSelectedChampion] = useState<string | null>(null);
  const [selectedChampionFull, setSelectedChampionFull] = useState<ChampionFull | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingFull, setIsLoadingFull] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const champsPerPage = 21;

  // Simulate 2-second loading delay for initial load
  useEffect(() => {
    if (!isLoading && isInitialLoading) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
        setLoading(false);
      }, 2000); // 2-second delay

      return () => clearTimeout(timer);
    }
  }, [isLoading, isInitialLoading, setLoading]);

  // Set global loading when fetching champions
  useEffect(() => {
    if (isInitialLoading) {
      setLoading(true);
    } else {
      setLoading(isLoading);
    }
  }, [isLoading, isInitialLoading, setLoading]);

  
  const fetchChampionFullData = async (championId: string) => {
    if (!version) return;
    
    setIsLoadingFull(true);
    setLoading(true); 
    
    try {
      // Simulate 2-second loading for champion details
      const [championData] = await Promise.all([
        fetch(
          `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championId}.json`
        ).then(res => res.json()),
        new Promise(resolve => setTimeout(resolve, 2000)) // 2-second delay
      ]);
      
      const championFullData = championData.data[championId];
      setSelectedChampionFull(championFullData);
    } catch (error) {
      console.error('Error fetching champion full data:', error);
    } finally {
      setIsLoadingFull(false);
      setLoading(false); // Clear global loading
    }
  };

  const handleChampionClick = async (championId: string) => {
    setSelectedChampion(championId);
    setSelectedChampionFull(null); // Clear previous data
    await fetchChampionFullData(championId);
  };

  const handleBackClick = () => {
    setSelectedChampion(null);
    setSelectedChampionFull(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
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

  // Filter champions based on search query and selected roles
  const filteredChampions = useMemo(() => {
    const championList = Object.values(champions) as ChampionBasic[];
    
    return championList.filter(champion => {
      const matchesSearch = !searchQuery.trim() || 
        champion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        champion.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRoles = selectedRoles.length === 0 || 
        selectedRoles.some(role => champion.tags.includes(role));

      return matchesSearch && matchesRoles;
    });
  }, [champions, searchQuery, selectedRoles]);

  // Sort champions by name
  const sortedAndFilteredChampions = useMemo(() => {
    return filteredChampions.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredChampions]);

  // Paginate filtered champions
  const paginatedChampions = useMemo(() => {
    return sortedAndFilteredChampions.slice(
      (currentPage - 1) * champsPerPage,
      currentPage * champsPerPage
    );
  }, [sortedAndFilteredChampions, currentPage, champsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredChampions.length / champsPerPage);
  const hasActiveFilters = searchQuery || selectedRoles.length > 0;

  if (!version) return <div className="text-white p-4">Select a version to see champions</div>;
  if (isLoading || isInitialLoading) return <LOLLoading message="Loading Champions..." size="lg" />;

  return (
    <div className="p-4 text-white">
      <AnimatePresence>
        {selectedChampion ? (
          // Show loading when champion is selected but data isn't loaded yet
          isLoadingFull || !selectedChampionFull ? (
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
            {/* Header with Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-white">
                  Champions ({version}) 
                  {hasActiveFilters && (
                    <span className="text-lg text-gray-400 ml-2">
                      - {sortedAndFilteredChampions.length} results
                    </span>
                  )}
                </h2>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  {/* Search Input */}
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search champions..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10 pr-10 bg-[#1a1a1a] border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
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
                    className="bg-[#1a1a1a] border-gray-700  text-white cursor-pointer"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    {selectedRoles.length > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-blue-600">
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
                  <span className="text-sm text-gray-400">Active filters:</span>
                  
                  {searchQuery && (
                    <Badge className="bg-blue-600 text-white flex items-center gap-1">
                      Search: "{searchQuery}"
                      <button
                        onClick={clearSearch}
                        className="ml-1 hover:text-gray-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  
                  {selectedRoles.map(role => (
                    <Badge 
                      key={role} 
                      className="bg-purple-600 text-white flex items-center gap-1"
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
                  className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700"
                >
                  <h3 className="text-lg font-semibold mb-3 text-white">Filter by Role</h3>
                  <div className="flex flex-wrap gap-2">
                    {ALL_ROLES.map(role => (
                      <Badge
                        key={role}
                        variant={selectedRoles.includes(role) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 ${
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
                    <p className="text-sm mb-4">Try adjusting your search or filters</p>
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
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}