"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { LOLLoading } from "@/components/global/lol-loading";
import { Pagination } from "./pagination";
import Image from "next/image";

interface ItemsGridProps {
  items: Record<string, any>;
  version: string;
  isLoading?: boolean;
  itemsPerPage?: number;
}

const ITEM_CATEGORIES = [
  "All",
  "Boots",
  "Consumable",
  "Jungle",
  "Lane",
  "HealthRegen",
  "ManaRegen",
  "Damage",
  "SpellDamage",
  "Armor",
  "MagicResist"
];

export function ItemsGrid({ items, version, isLoading, itemsPerPage = 12 }: ItemsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered items based on search & category
  const filteredItems = useMemo(() => {
    if (!items) return [];

    return Object.entries(items).map(([itemId, itemData]) => ({
      id: itemId,
      ...itemData
    })).filter((item) => {
      const matchesSearch = !searchQuery.trim() || 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.plaintext?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || 
        item.tags?.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, currentPage, itemsPerPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LOLLoading message="Loading Items..." size="md" />
      </div>
    );
  }

  if (!items || Object.keys(items).length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No items available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="pl-10 bg-[#1a1a1a] border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {ITEM_CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="text-sm text-gray-400">
          Showing {paginatedItems.length} of {filteredItems.length} filtered items
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 hover:border-yellow-500 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image?.full}`}
                alt={item.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm mb-1 truncate">
                  {item.name || `Item ${item.id}`}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500 text-sm font-medium">
                    {item.gold?.total || 0}g
                  </span>
                  {item.gold?.total !== item.gold?.base && (
                    <span className="text-gray-400 text-xs line-through">
                      {item.gold?.base}g
                    </span>
                  )}
                </div>
                {item.plaintext && (
                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                    {item.plaintext}
                  </p>
                )}
                {item.tags && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag : any) => (
                      <span
                        key={`${item.id}-${tag}`}
                        className="px-1.5 py-0.5 bg-gray-700 text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
