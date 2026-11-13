// Mentions légales (spécification 7.9). Trois éléments sont connus et viennent
// de site.ts : la raison sociale, le téléphone et l'e-mail (contenu-maquette §1
// et §3). Tout le reste doit venir de Saloum Immo : la page reste hors index
// tant qu'une ligne est vide, et n'est pas publiée (voir MENTIONS_PUBLIEES).
//
// Pour compléter : remplacer une ligne `manque` par une ligne `valeur`, avec sa
// source. La phrase d'introduction de la page se met à jour seule.

import { EMAIL, MOBILE, RAISON_SOCIALE } from "../site";
import type { Fait } from "../types";

export type LigneMention =
  /** Valeur connue. `lien` : tel: ou mailto:. */
  | { libelle: string; valeur: Fait; lien?: string }
  /** Valeur à fournir par Saloum Immo. `manque` se lit dans une phrase : « le NINEA ». */
  | { libelle: string; manque: string };

export const EDITEUR: LigneMention[] = [
  { libelle: "Raison sociale", valeur: RAISON_SOCIALE },
  { libelle: "Siège", manque: "le siège exact" },
  { libelle: "NINEA", manque: "le NINEA" },
  { libelle: "RCCM", manque: "le RCCM" },
  { libelle: "Téléphone", valeur: MOBILE.fait, lien: MOBILE.href },
  { libelle: "E-mail", valeur: EMAIL.fait, lien: EMAIL.href },
  { libelle: "Directeur de la publication", manque: "le directeur de la publication" },
];

export const HEBERGEMENT: LigneMention[] = [{ libelle: "Hébergeur", manque: "l’hébergeur" }];

/** Ce qui reste à fournir, dans l'ordre de la page. */
export const MANQUES: string[] = [...EDITEUR, ...HEBERGEMENT].flatMap((l) => ("manque" in l ? [l.manque] : []));

/**
 * La page n'est publiée que sans champ vide (7.9). Tant que c'est faux, la route est
 * dans src/app/_mentions-legales (dossier privé, pas de page) et le cartouche n'a pas
 * le lien « Mentions légales » (3.0 : un lien qui ne mène nulle part n'est pas affiché).
 * Quand MANQUES est vide, renommer le dossier en src/app/mentions-legales.
 */
export const MENTIONS_PUBLIEES = MANQUES.length === 0;
