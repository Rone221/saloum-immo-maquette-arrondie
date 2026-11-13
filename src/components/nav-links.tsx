"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION, type Rubrique } from "@/content/coordonnees";
import { cx } from "@/lib/base";

/** Chemin courant, toujours terminé par « / » (trailingSlash). */
export function useChemin(): string {
  const p = usePathname() || "/";
  return p.endsWith("/") ? p : `${p}/`;
}

/**
 * État d'un lien de rubrique : « page » si c'est la page même, « rubrique » si la
 * page est dedans (une fiche dans Terrains), sinon rien.
 */
export function etatRubrique(chemin: string, r: Rubrique): "page" | "rubrique" | null {
  if (chemin === r.href) return "page";
  if (chemin.startsWith(r.href)) return "rubrique";
  return null;
}

/** aria-current d'un lien de rubrique : « page » sur la page même, « true » dans la rubrique. */
export function ariaCourant(etat: ReturnType<typeof etatRubrique>) {
  return etat === "page" ? "page" : etat === "rubrique" ? "true" : undefined;
}

/**
 * Navigation en ligne de l'en-tête (dès 1 240 px). Six liens, ordre fixe, sans numéro.
 * Rubrique courante : soulignée d'orange (la seule touche d'orange de l'en-tête).
 */
export function NavLinks() {
  const chemin = useChemin();
  return (
    <ul className="flex items-center gap-6">
      {NAVIGATION.map((r) => {
        const etat = etatRubrique(chemin, r);
        return (
          <li key={r.href}>
            <Link
              href={r.href}
              aria-current={ariaCourant(etat)}
              className={cx(
                "inline-flex min-h-11 items-center font-medium whitespace-nowrap decoration-[3px] underline-offset-[10px] transition-colors hover:text-bleu",
                etat && "underline decoration-orange",
              )}
            >
              {r.libelle}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Les six rubriques du pied de page, rubrique courante en bleu. */
export function LiensPied({ className }: { className?: string }) {
  const chemin = useChemin();
  return (
    <ul className={className}>
      {NAVIGATION.map((r) => {
        const etat = etatRubrique(chemin, r);
        return (
          <li key={r.href}>
            <Link
              href={r.href}
              aria-current={ariaCourant(etat)}
              className={cx("inline-flex min-h-11 items-center text-note font-medium hover:text-bleu tab:text-corps", etat && "text-bleu")}
            >
              {r.libelle}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
