// Chargeur d'images pour l'export statique (GitHub Pages n'a pas d'optimiseur).
// Les variantes WebP sont produites à l'avance par scripts/photos.mjs.
// Pour une photo « /photos/<id> », on sert la plus petite variante dont la
// largeur couvre la largeur demandée, ou la plus grande si aucune ne la couvre.
// Tout autre chemin est seulement préfixé par le sous-chemin du site.

import manifeste from "../../public/photos/photos.json";

type Entree = { largeur: number; hauteur: number; variantes: number[] };

const PHOTOS = manifeste as Record<string, Entree>;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const m = /^\/photos\/([^/]+)$/.exec(src);
  const entree = m ? PHOTOS[m[1]] : undefined;
  if (!m || !entree) return `${BASE}${src}`;
  const { variantes } = entree;
  const choisie = variantes.find((l) => l >= width) ?? variantes[variantes.length - 1];
  return `${BASE}/photos/${m[1]}-${choisie}.webp`;
}
