// Forme commune des données du site (spécification, annexe A).
//
// Un fait affiché vient toujours d'ici, avec sa source et son statut.
// Dans `texte`, un passage entre accents graves (`TF 15026/R`) est une
// référence : il s'affiche en mono, à la taille du texte qui l'entoure.

export type Statut = "ok" | "a-valider";

export type Fait = {
  /** Ce qui s'affiche. */
  texte: string;
  /** D'où vient le fait : « YouTube Wq8pwLDb4L0 », « contenu-maquette §5 ». */
  source: string;
  /** AAAA-MM-JJ, ou AAAA-MM quand le jour n'est pas connu. */
  date?: string;
  /** Dit à l'oral dans une vidéo : afficher « Annoncé en vidéo, JJ.MM.AAAA ». */
  oral?: boolean;
  statut: Statut;
  /** Adresse publique et stable de la source, quand elle existe. */
  lien?: string;
};

/** Code des hachures (2.8). « non-publie » : contour en tirets, sans remplissage. */
export type StatutFoncier = "delib" | "bail" | "tf" | "non-publie";

export const STATUT_FONCIER_MOT: Record<StatutFoncier, string> = {
  delib: "Délibération",
  bail: "Bail",
  tf: "Titre foncier",
  "non-publie": "Statut non publié",
};

/** Raccourci d'écriture pour les fichiers de données. */
export function f(texte: string, source: string, autres: Partial<Omit<Fait, "texte" | "source">> = {}): Fait {
  return { texte, source, statut: "ok", ...autres };
}

/** Même chose, pour un fait à faire valider par le client. */
export function fv(texte: string, source: string, autres: Partial<Omit<Fait, "texte" | "source" | "statut">> = {}): Fait {
  return { texte, source, ...autres, statut: "a-valider" };
}
