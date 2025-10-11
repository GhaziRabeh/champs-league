import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { LoadingProvider } from "@/contexts/loading-context";
import { GlobalLoading } from "@/components/global/global-loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "League of Legends Data Hub",
  description: "Explore champions, items, maps, and runes from League of Legends. Built by Ghazi Rabeh.",
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
  openGraph: {
    title: "League of Legends Data Hub",
    description: "Explore champions, items, maps, and runes from League of Legends",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          <LoadingProvider>
            <Header />
            {children}
            <GlobalLoading />
          </LoadingProvider>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}