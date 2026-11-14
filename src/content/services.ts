// Services publiés, étapes de l'aménagement et parcours de la diaspora.
//
// Les huit services sont verbatim (liste du site 2026, contenu-maquette §4).
// Étapes : cinq avec photo, la sixième (titre foncier) en texte (allegement 3,
// Aménager). Aucun fait daté sous une photo d'étape : la photo n'est pas
// forcément du chantier cité, et un fait posé dessous se lirait comme sa légende.
// « Un notaire agréé accompagne chaque étape » (TikTok du 15.10.2025), affiché « chaque
// étape de l’achat » pour ne pas le lire avec les étapes du chantier : un
// accompagnement, jamais une garantie.

import { f, type Fait } from "./types";
import type { PhotoId } from "./photos";
import { MESSAGES } from "./messages";
import type { CleVideo } from "./videos";

/** Les huit services publiés, verbatim, sans numéro. */
export const SERVICES: string[] = [
  "Obtention de titres fonciers et régularisation administrative",
  "Vente et acquisition de terrains",
  "Terrassement et viabilisation de terrains",
  "Adduction d’eau et raccordements",
  "Conception de plans architecturaux et modélisation 3D",
  "Construction de maisons clés en main",
  "Suivi et gestion de chantiers",
  "Conseil et accompagnement personnalisé en immobilier",
];

export const SOURCE_SERVICES = "contenu-maquette §4, liste du site 2026, verbatim";

// ------------------------------------------------------------- Les étapes

export type Etape = {
  id: string;
  titre: string;
  /** Une ou deux phrases, sans date ni lieu. */
  texte: string;
  photo: PhotoId;
  /**
   * Photos de la visionneuse de la page Aménager, la principale d'abord (notes de
   * content/photos.ts). Jamais deux photos du même instant : 2500 et 2505 n'y sont pas.
   */
  photos: PhotoId[];
};

/** Cinq étapes avec photo (allegement 3, Aménager section 2). */
export const ETAPES: Etape[] = [
  {
    id: "etape-terrassement",
    titre: "Débroussaillage et terrassement",
    texte: "Le terrain est dégagé, puis terrassé aux engins.",
    photo: "2493",
    photos: ["2493", "2495", "2494"],
  },
  {
    id: "etape-bornage",
    titre: "Tracé et bornage",
    texte: "Les parcelles sont relevées au GPS, tracées, puis bornées.",
    photo: "2502",
    photos: ["2502"],
  },
  {
    id: "etape-voies",
    titre: "Voies en latérite et bordures",
    texte: "Les voies sont ouvertes en latérite et tenues par des bordures béton.",
    photo: "2529",
    photos: ["2529", "2542"],
  },
  {
    id: "etape-eau",
    titre: "Adduction d’eau",
    texte: "Les tuyaux sont posés en tranchée, en lien avec SEN’EAU.",
    photo: "2355",
    photos: ["2355", "2327-haut"],
  },
  {
    id: "etape-electricite",
    titre: "Électricité",
    texte: "Les poteaux sont levés, puis le câble est tiré.",
    photo: "2516",
    photos: ["2516", "2517", "2519"],
  },
];

/** Sixième étape, en texte, avec un lien vers /foncier/. */
export const ETAPE_TITRE = {
  titre: "Titre foncier",
  texte: "Obtention de titres fonciers et régularisation administrative.",
};

// ---------------------------------------------------- Parcours diaspora

export type Station = {
  titre: string;
  /** Version courte, sans lien, pour l'accueil. */
  court: string;
  /**
   * Texte de l'étape. {whatsapp} et {appel} sont remplacés par les liens
   * vers le numéro : « WhatsApp au +221 77 400 75 75 », puis « appelez ce numéro ».
   */
  texte: string;
  fait?: Fait;
};

/** Ouverture de la page Diaspora. */
export const APPEL_DIASPORA = {
  titre: "Acheter depuis l’étranger",
  chapeau:
    "Vous vivez loin et vous ne voulez pas acheter à l’aveugle. Tout commence à distance, sur WhatsApp, avec des vidéos et des documents.",
  bouton: "Commencer sur WhatsApp",
  message: MESSAGES.diaspora.texte,
  photo: "ig-DfAoxMkAbKR" as PhotoId,
  video: "reelLotsSKM" as CleVideo,
};

export const PARCOURS_DIASPORA: Station[] = [
  {
    titre: "Écrivez-nous",
    court: "Sur WhatsApp, depuis n’importe quel pays.",
    texte: "Sur {whatsapp}, depuis n’importe quel pays. Ou {appel}.",
  },
  {
    titre: "Regardez le terrain en vidéo",
    court: "Filmé au drone et en visite commentée.",
    texte: "Les terrains en vente sont filmés au drone et en visite commentée.",
  },
  {
    titre: "Faites vérifier les documents",
    court: "Titre, propriétaire, situation juridique : vérifiez-les avec nous.",
    texte: "Titre, propriétaire, situation juridique : vérifiez-les avec nous. Un notaire agréé accompagne chaque étape de l’achat.",
    fait: f("Un notaire agréé accompagne chaque étape de l’achat.", "TikTok, 15.10.2025 ; contenu-maquette §6", { date: "2025-10-15" }),
  },
  {
    titre: "Visitez sur place",
    court: "Avec notre équipe, sur rendez-vous, quand vous êtes au Sénégal.",
    texte: "Quand vous êtes au Sénégal, la visite se fait avec notre équipe, sur rendez-vous.",
    fait: f("Visites de terrain accompagnées.", "contenu-maquette §6"),
  },
];


// ---------------------------------------------------- Trois preuves (accueil)

export type Preuve = { cle: "titre" | "notaire" | "visite"; titre: string; fait: Fait };

/**
 * Sous l'ouverture de l'accueil (revue 2, 14.11.2026) : ce qui répond à la peur de
 * l'arnaque foncière, en trois faits déjà publiés. Rien de plus fort que la source :
 * « accompagne », jamais « garantit ».
 */
export const PREUVES: Preuve[] = [
  {
    cle: "titre",
    titre: "Titres fonciers individuels",
    fait: f("À Sakina City et à Sicap Keur Massar.", "contenu-maquette §5 (statuts des programmes)"),
  },
  {
    cle: "notaire",
    titre: "Un notaire agréé",
    fait: f("Il accompagne chaque étape de l’achat.", "TikTok, 15.10.2025 ; contenu-maquette §6", { date: "2025-10-15" }),
  },
  {
    cle: "visite",
    titre: "Visite sur place",
    fait: f("Avec notre équipe, sur rendez-vous.", "contenu-maquette §6 (visites accompagnées)"),
  },
];
