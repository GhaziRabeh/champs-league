"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getVersions } from "@/lib/service";
import Image from "next/image";
import { Menu, X } from "lucide-react"; 

interface SidebarProps {
  selectedVersion: string;
  setSelectedVersion: (v: string) => void;
}

const VERSIONS_PER_PAGE = 14;

export default function Sidebar({ selectedVersion, setSelectedVersion }: SidebarProps) {
  const [versions, setVersions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false); 

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

  const startIndex = page * VERSIONS_PER_PAGE;
  const endIndex = startIndex + VERSIONS_PER_PAGE;
  const paginatedVersions = versions.slice(startIndex, endIndex);
  const canPrev = page > 0;
  const canNext = endIndex < versions.length;

  return (
    <>
      {/*  Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0A1428] text-white hover:bg-[#eb0029] cursor-pointer"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/*  Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/35 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/*  Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-[#0A1428] border-r border-white/10 flex flex-col p-4 z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h1 className="text-xl font-extrabold text-[#eb0029] mb-4 text-center">Game Versions</h1>

        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2">
            {loading && <div className="text-white text-center">Loading...</div>}

            {!loading &&
              paginatedVersions.map((version) => (
                <Button
                  key={version}
                  variant="default"
                  className={`w-full text-white font-semibold text-center transition-colors cursor-pointer
                    ${selectedVersion === version
                      ? "bg-[#ee4360] text-white"
                      : "bg-[#0A1428] hover:bg-white/10"
                    }`}
                  onClick={() => {
                    setSelectedVersion(version);
                    setIsOpen(false); // close sidebar after selection on mobile
                  }}
                >
                  {version}
                </Button>
              ))}
          </div>
        </ScrollArea>

        {/* Pagination */}
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
    </>
  );
}
