"use client";

import { ChampionBasic } from "@/types/ChampionBasic";
import { ChampionCard } from "./champion-card";

interface ChampionGridProps {
  champions: ChampionBasic[];
  version: string;
  onChampionClick: (championId: string) => void;
}

export function ChampionGrid({ champions, version, onChampionClick }: ChampionGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
      {champions.map((champion) => (
        <ChampionCard
          key={champion.id}
          champion={champion}
          version={version}
          onClick={onChampionClick}
        />
      ))}
    </div>
  );
}