import type { Metadata } from "next";
import { BASE_PATH } from "./base";
import { typo } from "./format";

/**
 * Origine du site publié, pour les adresses absolues des cartes de partage
 * (og:image). Le déploiement la passe (https://<compte>.github.io) ; en local,
 * le serveur de développement.
 */
export const ORIGINE = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://localhost:3000";

/**
 * Image des cartes de partage (WhatsApp, Facebook) : le logo officiel complet,
 * posé sans retouche au centre d'un fond blanc de 1 200 × 630 (scripts/photos.mjs).
 * Spécification 4.3 : 2269-logo.png sert au partage social.
 */
export const IMAGE_PARTAGE = {
  url: `${BASE_PATH}/2269-partage.png`,
  width: 1200,
  height: 630,
  alt: "Saloum Immo",
};

/**
 * Métadonnées d'une page intérieure : titre (gabarit « %s · Saloum Immo » du
 * layout), description, et carte de partage propre à la page.
 *
 * Next remplace openGraph en entier d'un segment à l'autre : une page qui ne le
 * redéfinit pas hérite de la carte de l'accueil. Un lien partagé sur WhatsApp
 * afficherait alors le titre et la description de l'accueil. L'image est donc
 * reprise ici.
 */
export function metaPage(titre: string, description: string, autres: Metadata = {}): Metadata {
  const texte = typo(description);
  return {
    title: titre,
    description: texte,
    openGraph: {
      title: `${titre} · Saloum Immo`,
      description: texte,
      locale: "fr_SN",
      type: "website",
      images: [IMAGE_PARTAGE],
    },
    ...autres,
  };
}
