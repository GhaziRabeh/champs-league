"use client";
import Sidebar from "@/components/global/SideBar";
import { useState } from "react";
import MainPanel from "./_components/MainPanel";

const gameVersions = [""];

export default function Layout() {
  const [selectedVersion, setSelectedVersion] = useState(gameVersions[0]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        selectedVersion={selectedVersion} setSelectedVersion={setSelectedVersion}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#0A1428]">
       

        {/* Page Content */}
      <div className="flex-1 overflow-auto">
        <MainPanel version={selectedVersion} />
      </div>
      </div>
    </div>
  );
}
