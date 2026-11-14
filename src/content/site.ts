// Identité, coordonnées, réseaux, navigation et fondateur.

import { ADRESSE_EMAIL, NUMERO_FIXE, NUMERO_MOBILE } from "./coordonnees";
import type { PhotoId } from "./photos";
import { f, fv, type Fait } from "./types";

// Navigation, noms de page et numéro WhatsApp : dans coordonnees.ts, sans `Fait`,
// parce que les composants client les importent (rien de ce fichier ne part au navigateur).
export { NAVIGATION, WHATSAPP, type Rubrique } from "./coordonnees";

export const NOM = "Saloum Immo";

export const RAISON_SOCIALE = f("SALOUM IMMO ELITE SUARL", "contenu-maquette §1");

export const SLOGAN = f("Transformer la terre, construire l’avenir.", "contenu-maquette §1 ; enseigne de l’agence, photo 2352");

/** Une phrase de marque au plus par page. */
export const PHRASE_MARQUE = f(
  "Votre partenaire de confiance pour tous vos projets immobiliers au Sénégal.",
  "contenu-maquette §1 ; YouTube CSF130Y_hRc",
);

export const VALEURS = f("la transparence, la qualité et l’engagement", "contenu-maquette §1 ; YouTube CSF130Y_hRc");

export const CREATION = fv("depuis 2022", "contenu-maquette §2", { date: "2022" });

export const SIEGE = fv("Sicap Keur Massar, Sangalkam, Dakar", "contenu-maquette §2 et §3");

export const AGENCE = fv("Sicap Keur Massar, Sangalkam, Dakar. Sur rendez-vous.", "contenu-maquette §3");

/** Année affichée dans le cartouche. */
export const ANNEE = "2026";

// ------------------------------------------------------------------ Contact

export type Telephone = {
  /** « 77 400 75 75 » */
  court: string;
  /** « +221 77 400 75 75 » */
  long: string;
  href: string;
  fait: Fait;
};

export const MOBILE: Telephone = { ...NUMERO_MOBILE, fait: f("+221 77 400 75 75", "contenu-maquette §3") };

export const FIXE: Telephone = {
  ...NUMERO_FIXE,
  fait: fv("33 805 87 18", "contenu-maquette §3"),
};

export const EMAIL = { ...ADRESSE_EMAIL, fait: f("info@saloumimmo.com", "contenu-maquette §3") };

// ------------------------------------------------------------------ Réseaux

/** Date du relevé des chiffres des réseaux (abonnés, vidéos) : à afficher avec eux, ou les retirer. */
export const RELEVE_RESEAUX = "2026-11-13";

export type Reseau = {
  nom: string;
  href: string;
  /** Repère affiché à droite : chiffre daté ou identifiant. */
  repere: Fait;
};

export const RESEAUX: Reseau[] = [
  {
    nom: "Facebook",
    href: "https://www.facebook.com/61562304385126/",
    repere: f("46 000 abonnés", "contenu-maquette §3", { date: RELEVE_RESEAUX }),
  },
  {
    nom: "TikTok",
    href: "https://www.tiktok.com/@saloum_immo",
    repere: f("9 100 abonnés", "contenu-maquette §3", { date: RELEVE_RESEAUX }),
  },
  {
    nom: "YouTube",
    href: "https://www.youtube.com/@saloumimobat",
    // Pas de nombre de vidéos (revue 2) : le plan de Contact donne YouTube sans chiffre,
    // comme la maquette Relevé. Les « 47 vidéos » du 13.11.2026 sont dans contenu-maquette §3.
    repere: f("@saloumimobat", "contenu-maquette §3"),
  },
  {
    nom: "Instagram",
    href: "https://www.instagram.com/saloum_immo/",
    repere: f("@saloum_immo", "contenu-maquette §3"),
  },
  {
    nom: "LinkedIn",
    href: "https://www.linkedin.com/company/saloum-immo/",
    repere: f("Saloum Immo", "contenu-maquette §3"),
  },
];

/** Nom de la page Facebook, pour la page À propos. */
export const FACEBOOK_NOM = f("Saloum immo", "contenu-maquette §3");
/** Nombre de vidéos TikTok, relevé le 13.11.2026. */
export const TIKTOK_VIDEOS = f("270 vidéos", "contenu-maquette §3", { date: RELEVE_RESEAUX });

// ---------------------------------------------------------------- Fondateur

export type EtapeFrise = {
  /** Repère mono : « 2003 », « Ensuite », « 2004 à 2008 ». */
  annee: Fait;
  intitule: Fait;
  /** Colonnes de la frise, une par année de 2003 (1) à 2026 (24) ; fin exclusive. */
  debut: number;
  fin: number;
  /**
   * point : date ponctuelle ; plein : durée connue ; pointilles : durée imprécise ;
   * ouvert : début connu, fin imprécise ; saloum : la barre de Saloum Immo.
   */
  trace: "point" | "plein" | "pointilles" | "ouvert" | "saloum";
  /** true quand la date n'est pas précise (soulignée en pointillés sur mobile). */
  imprecise?: boolean;
};

/** Parcours publié par Babacar Ndiaye sur son site (contenu-maquette §2). */
const PARCOURS = "contenu-maquette §2, parcours publié sur son site";

export const FRISE: EtapeFrise[] = [
  { annee: f("2003", PARCOURS), intitule: f("Mémorise le Coran", PARCOURS), debut: 1, fin: 2, trace: "point" },
  {
    annee: f("Ensuite", PARCOURS),
    intitule: f("Agent de nettoyage à l’aéroport", PARCOURS),
    debut: 1,
    fin: 3,
    trace: "pointilles",
    imprecise: true,
  },
  { annee: f("2004 à 2008", PARCOURS), intitule: f("Dakar Catering", PARCOURS), debut: 2, fin: 7, trace: "plein" },
  {
    annee: f("Plusieurs années", PARCOURS),
    intitule: f("Cambiste", PARCOURS),
    debut: 6,
    fin: 13,
    trace: "pointilles",
    imprecise: true,
  },
  {
    annee: f("Dès 2015", PARCOURS),
    intitule: f("Vente et location de véhicules", PARCOURS),
    debut: 13,
    fin: 20,
    trace: "ouvert",
    imprecise: true,
  },
  {
    annee: fv("2022", "contenu-maquette §2", { date: "2022" }),
    intitule: f("Saloum Immo", PARCOURS),
    debut: 20,
    fin: 25,
    trace: "saloum",
  },
];

/** Années gravées sous la frise, avec leur colonne (2003 = 1, 2026 = 24). */
export const FRISE_AXE = [
  { annee: "2003", colonne: 1 },
  { annee: "2008", colonne: 6 },
  { annee: "2015", colonne: 13 },
  { annee: "2022", colonne: 20 },
  { annee: "2026", colonne: 24 },
];

export const FONDATEUR = {
  nom: f("Babacar Ndiaye", "contenu-maquette §2"),
  role: f("Fondateur et directeur général de Saloum Immo", "contenu-maquette §2"),
  /** Sous son nom, à l'accueil. */
  roleCourt: f("Fondateur et directeur général.", "contenu-maquette §2"),
  /** L'année de création reste à valider (contenu-maquette §2). */
  creation: fv("En 2022, il crée Saloum Immo.", "contenu-maquette §2, parcours publié sur son site ; année à valider", {
    date: "2022",
  }),
  enVideo: f(
    "Il explique lui-même en vidéo la délibération, le bail et le titre foncier.",
    "contenu-maquette §2 et §9 ; YouTube rpbEvdrm5AA",
  ),
  /** Résumée, jamais recopiée (contenu-maquette §2). */
  biographie: fv(
    "Il a commencé à l’aéroport Léopold Sédar Senghor, comme agent de nettoyage. Il y a appris seul le français et l’anglais. Ensuite Dakar Catering, le change, puis la vente et la location de véhicules. En 2022, il crée Saloum Immo.",
    "contenu-maquette §2, parcours publié sur son site, résumé",
  ),
  /** Image de l'interview (capture du reel Instagram) et vidéo de 7 min 26. */
  interview: {
    photo: "ig-DZUeyGKPdj_" as PhotoId,
    video: "rpbEvdrm5AA",
    legende: f(
      "Babacar Ndiaye, pendant l’interview publiée le 8 juin 2026.",
      "Instagram DZUeyGKPdj_ ; YouTube rpbEvdrm5AA",
      { date: "2026-06-08" },
    ),
  },
};
