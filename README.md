🏆 League of Legends Champion Viewer

A web application to browse and explore League of Legends champions by game version. Users can view champion names, titles, tags, images, lore, and passive abilities. Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and TanStack Query.

✨ Features

🗂 Browse all champions for a selected game version

🔢 Pagination for large champion lists

🏹 Click on a champion to see detailed information:

🏷 Name & title

🖼 Image

🏷 Tags & passive ability

📖 Lore & blurb

🎨 Smooth animations using Framer Motion

📱 Responsive design using shadcn/ui components

⚡ Data fetching & caching with TanStack Query

🛠 Technologies

Next.js – React framework for SSR & static site generation

TypeScript – Type-safe development

Tailwind CSS – Utility-first styling

shadcn/ui – Prebuilt UI components

Framer Motion – Animations for smooth transitions

TanStack Query (React Query) – Efficient data fetching and caching

Riot Data Dragon API – Fetch champions and version data

🚀 Installation

Clone the repository

git clone https://github.com/yourusername/lol-champion-viewer.git
cd lol-champion-viewer


Install dependencies

npm install       # Using npm
yarn              # Using Yarn
pnpm install      # Using pnpm
bun install       # Using Bun


Run the development server

npm run dev       # Using npm
yarn dev          # Using Yarn
pnpm dev          # Using pnpm
bun dev           # Using Bun


Open in browser

http://localhost:3000

🔑 Environment Variables

Create a .env.local file in the root (if needed):

NEXT_PUBLIC_API_BASE_URL=https://ddragon.leagueoflegends.com