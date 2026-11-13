import { WHATSAPP } from "@/content/coordonnees";

/**
 * Lien WhatsApp vers le numéro de Saloum Immo, avec un message pré-rempli.
 * Le message passé ici doit être exactement celui qui s'affiche sous le bouton.
 */
export function waHref(message?: string): string {
  const base = `https://wa.me/${WHATSAPP}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
