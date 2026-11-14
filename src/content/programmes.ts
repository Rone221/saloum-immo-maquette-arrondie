// Programmes en vente, offre datée et autres sites publiés (contenu-maquette §5),
// mis en mots selon recherche/allegement.md (partie 3). Les mêmes données servent
// l'accueil, la page Terrains et les fiches.
//
// Règles : aucun prix sauf celui de l'offre AIBD, toujours avec « avril 2025 ».
// Ailleurs « Sur demande ». Ce qui vient de l'oral reste daté (Lac Town, vidéo du
// 21 mai 2026). Kounoune 2 et son prix de 2024 ne s'affichent jamais.
// Statut foncier en mots, toujours les mêmes (allegement 2.5).

import { f, fv, type Fait } from "./types";
import type { PhotoId } from "./photos";
import type { CleVideo } from "./videos";
import { MESSAGES } from "./messages";

/** Libellé unique des boutons de programme (allegement 2.9). */
export const BOUTON_PROGRAMME = "Prix et lots libres sur WhatsApp";

export type LigneFiche = { cle: string; valeur: Fait };

export type Lot = { numero: string; surface: number; note?: string };

export type ProgrammeSlug = "sakina-city" | "sicap-keur-massar" | "lac-town";

export type Programme = {
  slug: ProgrammeSlug;
  nom: string;
  href: string;
  /** Statut foncier en mots (allegement 2.5). */
  statut: Fait;
  /** Forme du badge posé sur la photo : titre foncier publié, ou statut à demander. */
  statutCle: "tf" | "a-demander";
  /**
   * Repères courts des cartes (revue 2, 14.11.2026) : trois au plus, chacun tiré d'un
   * fait de ce fichier, sans rien ajouter. Ce qui est daté le reste.
   */
  reperes: Fait[];
  /** Où, en une phrase (cartes, rangées). */
  lieu: Fait;
  /** Rangée de la page Terrains. */
  surfaces: Fait;
  dejaFait: Fait;
  /** Chapeau de la fiche, une ou deux phrases. */
  chapeau: Fait;
  /** Tableau de faits de la fiche, six lignes au plus. */
  fiche: LigneFiche[];
  /** Note unique sous le tableau (Lac Town : la date de la vidéo). */
  noteFiche?: Fait;
  /** Sicap Keur Massar : les lots publiés, en liste. */
  lots?: { phrase: Fait; avertissement: string };
  message: string;
  photo: PhotoId;
  videos: CleVideo[];
};

const PRIX_SUR_DEMANDE = f("Sur demande.", "contenu-maquette §5 (prix non publié)");

/**
 * Sous « Sur demande », dans la carte d'action des fiches (revue 2). Une demande à faire,
 * pas un engagement de l'agence. Même phrase que la maquette Relevé.
 */
export const PRIX_A_DEMANDER = f(
  "Demandez le prix et les lots disponibles sur WhatsApp.",
  "contenu-maquette §5 (prix non publié)",
);

export const SAKINA_CITY: Programme = {
  slug: "sakina-city",
  nom: "Sakina City",
  href: "/terrains/sakina-city/",
  statut: f("Titres fonciers individuels", "contenu-maquette §5"),
  statutCle: "tf",
  reperes: [
    f("78 parcelles de 150 m²", "contenu-maquette §5"),
    f("Viabilisé", "contenu-maquette §5 (terrains viabilisés)"),
    f("Voies avec bordures béton", "contenu-maquette §5"),
  ],
  lieu: f("Kounoune, à 3 km de la sortie du péage.", "contenu-maquette §5"),
  surfaces: f("78 parcelles de 150 m²", "contenu-maquette §5"),
  dejaFait: f("Terrains viabilisés, voies en latérite avec bordures béton", "contenu-maquette §5"),
  chapeau: f(
    "À Kounoune, à 3 km de la sortie du péage, près de la Marine française. Commercialisé avec Khadija Fassé Gestion Immobilière.",
    "contenu-maquette §5",
  ),
  fiche: [
    { cle: "Statut foncier", valeur: f("Titres fonciers individuels. Titre mère `TF 15026/R`.", "contenu-maquette §5") },
    { cle: "Parcelles", valeur: f("78 parcelles de 150 m².", "contenu-maquette §5") },
    { cle: "Déjà fait", valeur: f("Terrains viabilisés. Voies en latérite avec bordures béton.", "contenu-maquette §5") },
    { cle: "Réseaux", valeur: f("Accès à l’eau et à l’électricité.", "contenu-maquette §5") },
    { cle: "Quartier", valeur: f("Zone déjà habitée.", "contenu-maquette §5") },
    { cle: "Prix", valeur: PRIX_SUR_DEMANDE },
  ],
  message: MESSAGES.sakinaCity.texte,
  photo: "2534",
  videos: ["visiteSakina"],
};

export const SICAP_KEUR_MASSAR: Programme = {
  slug: "sicap-keur-massar",
  nom: "Sicap Keur Massar",
  href: "/terrains/sicap-keur-massar/",
  statut: f("Titre foncier individuel", "contenu-maquette §5"),
  statutCle: "tf",
  reperes: [
    fv("Lots de 150 à 237 m², publiés en 2026", "contenu-maquette §5 (lots de 150, 175 et 237 m²)", { date: "2026" }),
    f("Terrassé et viabilisé", "contenu-maquette §5"),
  ],
  lieu: f("À 10 min de la sortie 10, 7 min du Lac Rose.", "contenu-maquette §5"),
  surfaces: fv("Lots publiés en 2026 : 150, 175 et 237 m²", "contenu-maquette §5", {
    date: "2026",
  }),
  dejaFait: f("Terrains terrassés et viabilisés", "contenu-maquette §5"),
  // Paradise City n'apparaît qu'ici, en second (contenu-maquette §5).
  chapeau: fv(
    "À 10 min de la sortie 10, 7 min du Lac Rose. Les lots présentés en vidéo sous le nom Paradise City.",
    "contenu-maquette §5",
  ),
  fiche: [
    { cle: "Statut foncier", valeur: f("Titre foncier individuel pour chaque lot.", "contenu-maquette §5") },
    { cle: "Déjà fait", valeur: f("Terrains terrassés et viabilisés.", "contenu-maquette §5") },
    { cle: "Réseaux", valeur: f("Eau et électricité disponibles.", "contenu-maquette §5") },
    { cle: "Prix", valeur: PRIX_SUR_DEMANDE },
  ],
  lots: {
    phrase: fv(
      "Lots 10, 15, 18, 258 et 260 : 150 m². Lot 259 : 237 m². Lot 2175 : 175 m², angle, double façade, non inondable.",
      "contenu-maquette §5 (lots publiés en 2026)",
      { date: "2026" },
    ),
    avertissement: "Certains lots ont pu partir depuis. Demandez ceux qui restent.",
  },
  message: MESSAGES.sicapKeurMassar.texte,
  photo: "2616",
  videos: ["lotsSKM", "reelLotsSKM"],
};

export const LAC_TOWN: Programme = {
  slug: "lac-town",
  nom: "Lac Town",
  href: "/terrains/lac-town/",
  statut: f("Statut foncier à demander", "contenu-maquette §5 (statut juridique inconnu)"),
  statutCle: "a-demander",
  reperes: [
    f("Lancé le 30 mars 2026", "YouTube qtAHrgDQd4U ; contenu-maquette §5", { date: "2026-03-30" }),
    f("Voies ouvertes", "contenu-maquette §5"),
    f("Viabilisé", "contenu-maquette §5 (viabilisation)"),
  ],
  lieu: f("Près du Lac Rose, à quelques minutes de la sortie 10.", "contenu-maquette §5"),
  surfaces: fv("150 à 450 m², d’après notre vidéo du 21 mai 2026", "YouTube Wq8pwLDb4L0, à l’oral", {
    date: "2026-05-21",
    oral: true,
  }),
  dejaFait: f("Terrassement, viabilisation, ouverture des voies", "contenu-maquette §5"),
  chapeau: f(
    "Près du Lac Rose, à quelques minutes de la sortie 10 de l’autoroute à péage. Notre programme le plus récent.",
    "contenu-maquette §5",
  ),
  fiche: [
    { cle: "Statut foncier", valeur: f("À demander.", "contenu-maquette §5 (statut juridique inconnu)") },
    { cle: "Déjà fait", valeur: f("Terrassement, viabilisation, ouverture des voies.", "contenu-maquette §5") },
    {
      cle: "Calendrier",
      valeur: f(
        "Lancé le 30 mars 2026, entièrement réalisé par Saloum Immo. En vente depuis mai 2026. Travaux en phase finale en mai 2026.",
        "contenu-maquette §5 ; YouTube qtAHrgDQd4U et Wq8pwLDb4L0",
        { date: "2026-03-30" },
      ),
    },
    {
      cle: "Surfaces",
      valeur: fv("150 à 450 m² pour l’habitation, et des terrains en bordure de route.", "YouTube Wq8pwLDb4L0, à l’oral", {
        date: "2026-05-21",
        oral: true,
      }),
    },
    {
      cle: "Équipements",
      valeur: fv(
        "Adduction d’eau, électricité accessible, lampadaires avec caméras de surveillance.",
        "YouTube Wq8pwLDb4L0, à l’oral",
        { date: "2026-05-21", oral: true },
      ),
    },
    { cle: "Prix", valeur: PRIX_SUR_DEMANDE },
  ],
  noteFiche: f("Surfaces et équipements : d’après notre vidéo du 21 mai 2026.", "YouTube Wq8pwLDb4L0", {
    date: "2026-05-21",
  }),
  message: MESSAGES.lacTown.texte,
  photo: "2580",
  videos: ["lancementLacTown", "visiteLacTown"],
};

/** Les trois programmes en vente, dans l'ordre du site : titres fonciers d'abord. */
export const PROGRAMMES: Programme[] = [SAKINA_CITY, SICAP_KEUR_MASSAR, LAC_TOWN];

export function programme(slug: ProgrammeSlug): Programme {
  return PROGRAMMES.find((p) => p.slug === slug)!;
}

// ------------------------------------------------------------ Offre datée

export type OffreDatee = {
  slug: string;
  nom: string;
  href?: string;
  statut: Fait;
  /** La phrase de l'offre, avec sa date. */
  texte: Fait;
  bouton: string;
  message: string;
};

export const RECASEMENT_AIBD: OffreDatee & {
  /** Chapeau de la fiche. */
  chapeau: Fait;
  /** Carte « offre datée » de l'accueil et de Terrains : le lieu à part, le prix avec sa date. */
  ticket: { lieu: Fait; texte: Fait; date: string };
} = {
  slug: "recasement-aibd",
  nom: "Recasement AIBD",
  href: "/terrains/recasement-aibd/",
  statut: f("Bail", "contenu-maquette §5"),
  texte: f(
    "Offre d’avril 2025. Parcelles en bail de plus de 200 m², à Diamniadio, près de l’aéroport AIBD. 6 à 10 millions FCFA selon la position, au prix d’avril 2025.",
    "contenu-maquette §5 (offre d’avril 2025)",
    { date: "2025-04" },
  ),
  // La date une fois, collée au prix (revue 2) : ni en tête du chapeau, ni en puce.
  chapeau: f(
    "Parcelles en bail de plus de 200 m², à Diamniadio, près de l’aéroport AIBD. 6 à 10 millions FCFA selon la position, au prix d’avril 2025. Disponibilité à demander.",
    "contenu-maquette §5 (offre d’avril 2025)",
    { date: "2025-04" },
  ),
  ticket: {
    lieu: f("Diamniadio, près de l’aéroport AIBD", "contenu-maquette §5"),
    texte: f(
      "Parcelles en bail de plus de 200 m². 6 à 10 millions FCFA selon la position, au prix d’avril 2025. Disponibilité à demander.",
      "contenu-maquette §5 (offre d’avril 2025)",
      { date: "2025-04" },
    ),
    date: "Offre d’avril 2025",
  },
  bouton: "Demander la disponibilité sur WhatsApp",
  message: MESSAGES.recasementAibd.texte,
};

/** Autres sites publiés (page Terrains seulement, jamais l'accueil). */
export const AUTRES_SITES: Array<{ slug: string; nom: string; texte: Fait; message: string }> = [
  {
    slug: "bayakh",
    nom: "Bayakh",
    texte: f("Site de 29 hectares. Statut foncier à demander.", "contenu-maquette §5 et §7"),
    message: MESSAGES.bayakh.texte,
  },
  {
    slug: "niague",
    nom: "Niague, route du Lac Rose",
    texte: f("Projet en aménagement, présenté en vidéo en juin 2025.", "contenu-maquette §5", { date: "2025-06" }),
    message: MESSAGES.niague.texte,
  },
];
