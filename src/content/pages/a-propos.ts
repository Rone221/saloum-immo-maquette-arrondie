// Faits propres à la page À propos (allegement.md, partie 3), tirés de
// contenu-maquette.md. Ce fichier ne crée aucun fait nouveau : il met en forme
// ceux de site.ts pour les quatre lignes de l'entreprise.

import { CREATION, RAISON_SOCIALE, SIEGE, VALEURS } from "@/content/site";
import type { Fait } from "@/content/types";

export type LigneEntreprise = { libelle: string; valeur: Fait };

/** Une valeur de fiche commence par une capitale et finit par un point. */
const enValeur = (fait: Fait, texte: string): Fait => ({ ...fait, texte });

export const FICHE_ENTREPRISE: LigneEntreprise[] = [
  { libelle: "Raison sociale", valeur: RAISON_SOCIALE },
  { libelle: "Création", valeur: enValeur(CREATION, "Depuis 2022.") },
  { libelle: "Siège", valeur: enValeur(SIEGE, "Sicap Keur Massar, Sangalkam, Dakar.") },
  { libelle: "Valeurs", valeur: enValeur(VALEURS, "La transparence, la qualité et l’engagement.") },
];
