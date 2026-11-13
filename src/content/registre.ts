// Travaux datés (allegement 3, accueil section 3 et Aménager #travaux). Ils
// remplacent les compteurs de l'ancien site : une ligne par chantier, une date,
// une source. L'accueil les montre sans source, Aménager avec.
//
// Règles : pas de compteur cumulé, pas de ligne sans source, lieu écrit seulement
// s'il est publié (Kounoune). Kounoune : un lancement, pas un chantier fini.
// SEN'EAU : « visite de contrôle », jamais « validé ».
// Millennium City : seul le réseau de canalisation est attribué à Saloum Immo,
// jamais l'aire de jeux, jamais « notre programme ». Il vit sur À propos.

import { f, type Fait } from "./types";
import { TIKTOK, VIDEOS } from "./videos";

export type SourceTravaux = {
  /** « Vidéo YouTube du 7 septembre 2024 » */
  libelle: string;
  /** Absent : source sans adresse stable, affichée sans lien. */
  href?: string;
};

export type LigneTravaux = {
  id: string;
  /** « Septembre 2024 » : le mois, en toutes lettres. */
  mois: string;
  texte: Fait;
  sources: SourceTravaux[];
};

export const TRAVAUX_DATES: LigneTravaux[] = [
  {
    id: "kounoune-terrassement",
    mois: "Septembre 2024",
    texte: f("Terrassement lancé sur 3 hectares à Kounoune.", "YouTube Hi1DiDoX_zA ; contenu-maquette §5 et §7", {
      date: "2024-09-07",
    }),
    sources: [{ libelle: "Vidéo YouTube du 7 septembre 2024", href: VIDEOS.terrassementKounoune.href }],
  },
  {
    id: "trace-9-hectares",
    mois: "Octobre 2024",
    texte: f("342 parcelles tracées sur un terrain de 9 hectares.", "Article du site, 19.10.2024 ; contenu-maquette §5 et §7", {
      date: "2024-10-19",
    }),
    sources: [{ libelle: "Article du site du 19 octobre 2024" }],
  },
  {
    id: "electrification-53",
    mois: "Octobre 2025",
    texte: f("Électrification d’un projet de 53 parcelles, 17 poteaux.", "TikTok, 02.10.2025 ; contenu-maquette §5 et §7", {
      date: "2025-10-02",
      lien: TIKTOK.electrification,
    }),
    sources: [{ libelle: "TikTok du 2 octobre 2025", href: TIKTOK.electrification }],
  },
  {
    id: "adduction-58",
    mois: "Novembre 2025",
    texte: f(
      "Adduction d’eau pour 58 parcelles. Visite de contrôle de SEN’EAU le 20 novembre 2025.",
      "TikTok, 18.11.2025 et 20.11.2025 ; contenu-maquette §5 et §7",
      { date: "2025-11-18" },
    ),
    sources: [
      { libelle: "TikTok du 18 novembre 2025", href: TIKTOK.adductionEau },
      { libelle: "TikTok du 20 novembre 2025", href: TIKTOK.controleSenEau },
    ],
  },
];

/** Réalisations de la page À propos (allegement 3, À propos section 3). */
export const MILLENNIUM_CITY = {
  texte: f(
    "Millennium City : réseau de canalisation conçu et posé par Saloum Immo, sur un projet mené de mars 2022 à décembre 2023. Le lotissement est commercialisé par Senegindia.",
    "contenu-maquette §5 (réalisations)",
    { date: "2022-03" },
  ),
  photo: "2537" as const,
};
