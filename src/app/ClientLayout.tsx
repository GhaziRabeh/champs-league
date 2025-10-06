"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Providers from "@/components/providers";



export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPWA, setIsPWA] = useState(pathname.startsWith('/PWA'));

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isWebKit = 'standalone' in window.navigator && (window.navigator as any).standalone;
    const isPWAPage = pathname.startsWith('/PWA');
    setIsPWA(isStandalone || isWebKit || isPWAPage);
  }, [pathname]);

  return (
    <Suspense fallback={null}>
      <Providers>
              {children}
      </Providers>
    </Suspense>
  );
}