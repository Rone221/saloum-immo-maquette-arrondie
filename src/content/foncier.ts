// Comprendre le foncier : ce que nous faisons, ce que l'acheteur peut vérifier
// avec nous, et le tableau délibération, bail, titre foncier.
//
// Sources : carrousel publié par Saloum Immo sur Instagram le 08.07.2026 (signé
// « Saloum Immo Consulting », nom absent de contenu-maquette.md : il ne s'affiche pas)
// pour les définitions et les niveaux ; légende de l'interview du DG (08.06.2026) pour la
// liste « Avant d'acheter » ; TikTok du 15.10.2025 pour le notaire.
// C'est une vérification proposée, pas une garantie : ne jamais écrire
// « nous garantissons ». Ne rien citer de l'interview au-delà de ce fichier
// (pas de transcription fiable).

import { f, type Fait, type StatutFoncier } from "./types";

export const CE_QUE_NOUS_FAISONS = {
  titre: "Ce que nous faisons",
  lignes: [
    f("Les documents fonciers sont vérifiés.", "TikTok, 15.10.2025 ; contenu-maquette §6", { date: "2025-10-15" }),
    f("Un notaire agréé accompagne chaque étape de l’achat.", "TikTok, 15.10.2025 ; contenu-maquette §6", { date: "2025-10-15" }),
    f("Vous visitez le terrain avec notre équipe, sur rendez-vous.", "contenu-maquette §6 (visites accompagnées)"),
    f("Le conseil est gratuit, pour acheter, vendre ou louer.", "Site 2025 ; contenu-maquette §6"),
  ],
};

export const AVANT_D_ACHETER = {
  titre: "Avant d’acheter, vérifiez avec nous.",
  lignes: [
    f("L’authenticité des documents fonciers.", "Légende de l’interview du DG, Instagram, 08.06.2026"),
    f("Le véritable propriétaire du terrain.", "Légende de l’interview du DG, Instagram, 08.06.2026"),
    f("La situation juridique de la parcelle.", "Légende de l’interview du DG, Instagram, 08.06.2026"),
    f("Qu’il n’y a pas de vente multiple.", "Légende de l’interview du DG, Instagram, 08.06.2026"),
    f("Le NICAD, numéro d’identification cadastral de la parcelle.", "YouTube Rrfi4zPWsbY ; contenu-maquette §6"),
  ],
};

export type Document = {
  statut: Exclude<StatutFoncier, "non-publie">;
  nom: string;
  definition: Fait;
  aSavoir: Fait;
  /** Niveau de sécurité publié, en mots. Jamais d'étoiles ni de note sur 5. */
  niveau: Fait;
  chezNous: Fait;
};

const SOURCE_CARROUSEL = "Carrousel Instagram DaiftQ_iBJd, 08.07.2026 (signé Saloum Immo Consulting)";

export const DOCUMENTS: Document[] = [
  {
    statut: "delib",
    nom: "Délibération",
    definition: f("Une décision d’une collectivité territoriale qui attribue un terrain.", SOURCE_CARROUSEL, {
      date: "2026-07-08",
    }),
    aSavoir: f(
      "Elle permet d’occuper le terrain sous conditions. C’est une première étape, pas un titre foncier.",
      SOURCE_CARROUSEL,
      { date: "2026-07-08" },
    ),
    niveau: f("Protection limitée", SOURCE_CARROUSEL, { date: "2026-07-08" }),
    chezNous: f("Obtention de titres fonciers et régularisation administrative.", "contenu-maquette §4, service 01, verbatim"),
  },
  {
    statut: "bail",
    nom: "Bail",
    definition: f(
      "Un droit accordé par l’État pour occuper et exploiter un terrain, pendant une durée déterminée.",
      SOURCE_CARROUSEL,
      { date: "2026-07-08" },
    ),
    aSavoir: f(
      "Il peut être renouvelé selon les conditions en vigueur. Le terrain reste dans le domaine de l’État.",
      SOURCE_CARROUSEL,
      { date: "2026-07-08" },
    ),
    niveau: f("Moyen à élevé", SOURCE_CARROUSEL, { date: "2026-07-08" }),
    chezNous: f("Recasement AIBD, offre d’avril 2025.", "contenu-maquette §5", { date: "2025-04" }),
  },
  {
    statut: "tf",
    nom: "Titre foncier",
    definition: f("Le terrain est immatriculé. Vous êtes reconnu propriétaire.", SOURCE_CARROUSEL, {
      date: "2026-07-08",
    }),
    aSavoir: f(
      "Les risques de litige sont fortement réduits. Il facilite la vente, la donation et le prêt bancaire.",
      SOURCE_CARROUSEL,
      { date: "2026-07-08" },
    ),
    niveau: f("Très élevé", SOURCE_CARROUSEL, { date: "2026-07-08" }),
    chezNous: f("Sakina City et Sicap Keur Massar, titres individuels.", "contenu-maquette §5"),
  },
];

/** Phrase d'honnêteté (Warn), une par page au plus. */
export const AVERTISSEMENT_STATUT =
  "Pour tout autre terrain, chez nous ou ailleurs, demandez le statut exact avant de verser quoi que ce soit : délibération, bail ou titre foncier.";

/** Ligne de sources sous le tableau, et sous la rangée des niveaux de l'accueil. */
export const SOURCE_DEFINITIONS = f(
  "Définitions et niveaux publiés par Saloum Immo sur Instagram le 8 juillet 2026.",
  SOURCE_CARROUSEL,
  { date: "2026-07-08" },
);
