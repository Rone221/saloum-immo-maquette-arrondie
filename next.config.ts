import type { NextConfig } from "next";

// Sous-chemin du site sur GitHub Pages (ex. "/saloum-immo-maquette").
// Vide en local : le site reste servi à la racine.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  // Dossier de travail réglable : plusieurs serveurs de développement peuvent tourner
  // côte à côte sur ce projet (NEXT_DIST_DIR=.next-accueil npm run dev, par exemple).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // next dev ne réécrit plus AGENTS.md (son bloc géré contient des tirets cadratins).
  agentRules: false,
  // Pas de cacheComponents ni de PPR : incompatibles avec l'export statique.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Les largeurs des variantes WebP produites par scripts/photos.mjs.
    deviceSizes: [480, 800, 1200, 1600, 2000],
    imageSizes: [320],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
