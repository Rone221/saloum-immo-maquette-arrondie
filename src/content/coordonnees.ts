// Coordonnées et navigation, sans source ni statut : ce module est importé par les
// composants client (menu mobile, liens de navigation, lien WhatsApp). Tout ce
// qu'il exporte part dans le JavaScript envoyé au navigateur : il ne contient
// que les chaînes affichées, jamais un `Fait`. Les faits, avec leur source et leur
// statut, sont dans site.ts, qui reprend ces valeurs.

export type Rubrique = { libelle: string; href: string };

/** Ordre et libellés fixes, sans numéro (allegement 2.5). */
export const NAVIGATION: Rubrique[] = [
  { libelle: "Terrains", href: "/terrains/" },
  { libelle: "Aménager mon terrain", href: "/amenager/" },
  { libelle: "Comprendre le foncier", href: "/foncier/" },
  { libelle: "Diaspora", href: "/diaspora/" },
  { libelle: "À propos", href: "/a-propos/" },
  { libelle: "Contact", href: "/contact/" },
];

export type Numero = {
  /** « 77 400 75 75 » */
  court: string;
  /** « +221 77 400 75 75 » */
  long: string;
  href: string;
};

export const NUMERO_MOBILE: Numero = {
  court: "77 400 75 75",
  long: "+221 77 400 75 75",
  href: "tel:+221774007575",
};

export const NUMERO_FIXE: Numero = {
  court: "33 805 87 18",
  long: "+221 33 805 87 18",
  href: "tel:+221338058718",
};

export const ADRESSE_EMAIL = {
  adresse: "info@saloumimmo.com",
  href: "mailto:info@saloumimmo.com",
};

/** Numéro WhatsApp au format international, sans « + » (pour wa.me). */
export const WHATSAPP = "221774007575";
