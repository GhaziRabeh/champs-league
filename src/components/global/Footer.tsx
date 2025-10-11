import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#0A1428] to-[#091122] border-t border-[#eb0029]/30 py-6 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#eb0029]/5 to-transparent animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand Section */}
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="relative w-10 h-10 bg-gradient-to-br from-[#eb0029] to-[#ff6b6b] rounded-lg flex items-center justify-center shadow-lg shadow-[#eb0029]/30 group-hover:shadow-[#eb0029]/50 transition-all duration-300 group-hover:scale-110 overflow-hidden">
                <Image
                  src="/ghazi.jpg"
                  alt="Ghazi Rabeh"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#eb0029] to-[#ff6b6b] rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            </div>
            <div>
              <p className=" font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Ghazi Rabeh
              </p>
              <p className="text-gray-400 text-xs">LoL Data Explorer</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              Powered by
            </div>
            <div className="flex gap-2">
              <div className="px-2 py-1 bg-gray-800/80 rounded text-xs text-gray-300 border border-gray-700">
                <Link
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Next.js
                </Link>
              </div>
              <div className="px-2 py-1 bg-gray-800/80 rounded text-xs text-gray-300 border border-gray-700">
                <Link
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Tailwind
                </Link>
              </div>
              <div className="px-2 py-1 bg-gray-800/80 rounded text-xs text-gray-300 border border-gray-700">
                <Link
                  href="https://ui.shadcn.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Shadecn/UI
                </Link>
              </div>
              <div className="px-2 py-1 bg-gray-800/80 rounded text-xs text-gray-300 border border-gray-700">
                <Link
                  href="https://www.communitydragon.org/documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Riot API
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-gray-500">|</span>
            <span>All rights reserved</span>
          </div>
        </div>

        {/* Bottom notice */}
        <div className="mt-4 pt-4 border-t border-gray-800/30 text-center">
          <p className="text-gray-500 text-xs">
            This app isn't endorsed by Riot Games and doesn't reflect the views
            or opinions of Riot Games or anyone officially involved in producing
            or managing League of Legends.
          </p>
        </div>
      </div>
    </footer>
  );
}
