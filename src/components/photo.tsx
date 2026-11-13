import Image from "next/image";
import type { CSSProperties } from "react";
import manifeste from "../../public/photos/photos.json";
import { PHOTOS, type PhotoId } from "@/content/photos";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";

type Entree = { largeur: number; hauteur: number; variantes: number[] };
const DIMENSIONS = manifeste as Record<string, Entree>;

type Props = {
  id: PhotoId;
  /**
   * Largeur dessinée de l'image, pour le choix de la variante (obligatoire,
   * toujours juste). Avec object-fit: cover, c'est la largeur de l'image recadrée.
   */
  sizes: string;
  className?: string;
  /** Cadrage (object-position). Par défaut, celui de content/photos.ts. */
  position?: string;
  /** Image décorative : alt vide. */
  decorative?: boolean;
  /** Remplace le texte alternatif par défaut. */
  alt?: string;
  /** Remplit son parent (qui doit être positionné). */
  fill?: boolean;
  /** Préchargée dans <head> : l'image du premier écran seulement. */
  preload?: boolean;
  style?: CSSProperties;
};

/**
 * Photo du client, servie en WebP par le chargeur maison (src/lib/image-loader.ts).
 * Chargement différé natif, sauf `preload`.
 */
export function Photo({ id, sizes, className, position, decorative, alt, fill, preload, style }: Props) {
  const fiche = PHOTOS[id];
  const dims = DIMENSIONS[id];
  const cadrage = position ?? fiche.position;
  const texteAlt = decorative ? "" : typo(alt ?? fiche.alt);
  const commun = {
    src: `/photos/${id}`,
    sizes,
    className,
    preload,
    style: cadrage ? { objectPosition: cadrage, ...style } : style,
  };
  if (fill) return <Image {...commun} alt={texteAlt} fill />;
  return <Image {...commun} alt={texteAlt} width={dims.largeur} height={dims.hauteur} />;
}

/**
 * Photo dans un cadre arrondi (rayon « photo », 20 px). Le cadre donne la forme :
 * passer ses proportions par `className` (« aspect-[4/3] tab:aspect-[3/4] »), ou
 * une hauteur. La photo le remplit (object-cover) et s'agrandit à peine au survol
 * d'un lien parent. `rayon="aucun"` : cadre droit, pour une photo posée au bord
 * d'une plaque déjà arrondie (la plaque coupe les coins).
 */
export function Cadre({
  id,
  sizes,
  className,
  position,
  alt,
  decorative,
  preload,
  rayon = "photo",
  zoom = false,
}: {
  id: PhotoId;
  sizes: string;
  className?: string;
  position?: string;
  alt?: string;
  decorative?: boolean;
  preload?: boolean;
  rayon?: "photo" | "aucun";
  /** Agrandissement léger au survol du lien parent (cartes cliquables). */
  zoom?: boolean;
}) {
  return (
    <div className={cx("relative isolate overflow-hidden bg-brume", rayon === "photo" && "rounded-photo", className)}>
      <Photo
        id={id}
        sizes={sizes}
        position={position}
        alt={alt}
        decorative={decorative}
        preload={preload}
        fill
        className={cx("object-cover", zoom && "zoom-survol")}
      />
    </div>
  );
}

/** Légende sous une photo : 14 px, gris, dix mots au plus, la scène sans lieu. */
export function Legende({ children, className }: { children: string; className?: string }) {
  return <p className={cx("mt-3 text-note text-encre-2", className)}>{typo(children)}</p>;
}
