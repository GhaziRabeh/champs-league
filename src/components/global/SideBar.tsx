"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getVersions } from "@/lib/service";
import Image from "next/image";

interface SidebarProps {
  selectedVersion: string;
  setSelectedVersion: (v: string) => void;
}

const VERSIONS_PER_PAGE = 14;

export default function Sidebar({ selectedVersion, setSelectedVersion }: SidebarProps) {
  const [versions, setVersions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        setLoading(true);
        const data = await getVersions();
        setVersions(data); 
      } catch (error) {
        console.error("Failed to fetch versions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  // Calculate paginated versions
  const startIndex = page * VERSIONS_PER_PAGE;
  const endIndex = startIndex + VERSIONS_PER_PAGE;
  const paginatedVersions = versions.slice(startIndex, endIndex);

  const canPrev = page > 0;
  const canNext = endIndex < versions.length;

  return (
    <div className="w-64 min-h-screen bg-[#0A1428] border-r border-white/10 flex flex-col p-4">
      <h1 className="text-xl font-extrabold text-[#eb0029] mb-4 text-center">Game Versions</h1>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2">
          {loading && <div className="text-white text-center">Loading...</div>}

          {!loading && paginatedVersions.map((version) => (
            <Button
              key={version}
              variant="default"
              className={`w-full text-white font-semibold text-center transition-colors cursor-pointer
                ${selectedVersion === version
                  ? "bg-[#ee4360] text-white"
                  : "bg-[#0A1428] hover:bg-white/10"
                }`}
              onClick={() => setSelectedVersion(version)}
            >
              {version}
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Pagination Controls */}
      {!loading && (
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => canPrev && setPage(page - 1)}
            disabled={!canPrev}
            className="bg-[#0A1428] hover:bg-white/10 text-white w-1/2 cursor-pointer"
          >
            ◀ Prev
          </Button>
          <Button
            onClick={() => canNext && setPage(page + 1)}
            disabled={!canNext}
            className="bg-[#0A1428] hover:bg-white/10 text-white w-1/2 cursor-pointer"
          >
            Next ▶
          </Button>
        </div>
      )}

      
      <div className="flex justify-center mt-6">
        <Image src="/logo/lol.png" alt="league of legends" width={100} height={100} />
      </div>

      <div className="mt-2 text-white/50 text-sm text-center">
        Selected: {selectedVersion || "None"}
      </div>
    </div>
  );
}
