"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChampionFull } from "@/types/ChampionBasic";
import { Button } from "@/components/ui/button";

interface ChampionDetailsProps {
  champion: ChampionFull;
  version: string;
  onBack: () => void;
  isLoading?: boolean;
}

export function ChampionDetails({ champion, version, onBack, isLoading = false }: ChampionDetailsProps) {
  if (isLoading) {
    return <div className="text-white p-8 text-center">Loading champion details...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="flex flex-row justify-between items-center pb-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            {champion.image?.full && (
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
                alt={champion.name}
                width={80}
                height={80}
                className="rounded-lg border-2 border-gold-500"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-white">{champion.name}</h1>
              <h2 className="text-xl text-gray-300 italic">{champion.title}</h2>
            </div>
          </div>
          <Button
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-white font-semibold transition-colors cursor-pointer"
            onClick={onBack}
          >
            Back to Champions
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-400 font-semibold">Roles:</span>
            {champion.tags?.map((tag: string, index: number) => (
              <motion.div
                key={tag}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Badge className="bg-blue-600 text-white px-3 py-1 text-sm">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Blurb */}
          {champion.blurb && (
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="font-bold text-lg text-white mb-2">Overview</h3>
              <p className="text-gray-300 leading-relaxed">{champion.blurb}</p>
            </div>
          )}

          {/* Lore */}
          {champion.lore && (
            <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="font-bold text-lg text-white mb-2">Lore</h3>
              <p className="text-gray-300 leading-relaxed">{champion.lore}</p>
            </div>
          )}

          {/* Passive */}
          <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-500">
            <h3 className="font-bold text-lg text-white mb-3">Passive Ability</h3>
            {champion.passive ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4"
              >
                {champion.passive.image?.full && (
                  <div className="flex-shrink-0">
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champion.passive.image.full}`}
                      alt={champion.passive.name}
                      width={64}
                      height={64}
                      className="rounded border border-yellow-500"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-white text-lg mb-2">
                    {champion.passive.name}
                  </p>
                  <div 
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: champion.passive.description 
                    }}
                  />
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400">No passive data available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}