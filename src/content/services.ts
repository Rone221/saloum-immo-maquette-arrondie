// Services publiés, étapes de l'aménagement et parcours de la diaspora.
//
// Les huit services sont verbatim (liste du site 2026, contenu-maquette §4).
// Étapes : cinq avec photo, la sixième (titre foncier) en texte (allegement 3,
// Aménager). Aucun fait daté sous une photo d'étape : la photo n'est pas
// forcément du chantier cité, et un fait posé dessous se lirait comme sa légende.
// « Un notaire agréé accompagne chaque étape » (TikTok du 15.10.2025) : un
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
};

/** Cinq étapes avec photo (allegement 3, Aménager section 2). */
export const ETAPES: Etape[] = [
  {
    id: "etape-terrassement",
    titre: "Débroussaillage et terrassement",
    texte: "Le terrain est dégagé, puis terrassé aux engins.",
    photo: "2493",
  },
  {
    id: "etape-bornage",
    titre: "Tracé et bornage",
    texte: "Les parcelles sont relevées au GPS, tracées, puis bornées.",
    photo: "2502",
  },
  {
    id: "etape-voies",
    titre: "Voies en latérite et bordures",
    texte: "Les voies sont ouvertes en latérite et tenues par des bordures béton.",
    photo: "2529",
  },
  {
    id: "etape-eau",
    titre: "Adduction d’eau",
    texte: "Les tuyaux sont posés en tranchée, en lien avec SEN’EAU.",
    photo: "2355",
  },
  {
    id: "etape-electricite",
    titre: "Électricité",
    texte: "Les poteaux sont levés, puis le câble est tiré.",
    photo: "2516",
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
    texte: "Sur {whatsapp}, depuis n’importe quel pays. Ou {appel}.",
  },
  {
    titre: "Regardez le terrain en vidéo",
    texte: "Les terrains en vente sont filmés au drone et en visite commentée.",
  },
  {
    titre: "Faites vérifier les documents",
    texte: "Titre, propriétaire, situation juridique : vérifiez-les avec nous. Un notaire agréé suit chaque étape.",
    fait: f("Un notaire agréé suit chaque étape.", "TikTok, 15.10.2025 ; contenu-maquette §6", { date: "2025-10-15" }),
  },
  {
    titre: "Visitez sur place",
    texte: "Quand vous êtes au Sénégal, la visite se fait avec notre équipe, sur rendez-vous.",
    fait: f("Visites de terrain accompagnées.", "contenu-maquette §6"),
  },
];

/** Les trois vidéos de la page Diaspora (allegement 3). */
export const VIDEOS_DIASPORA: CleVideo[] = ["presentation", "interviewDG", "lotsSKM"];
