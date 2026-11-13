import type { ReactNode } from "react";
import { VIDEOS, type CleVideo } from "@/content/videos";
import { dateLongue, typo } from "@/lib/format";
import { TexteFleche } from "./lien";

type Repere = "duree" | "date";

/**
 * Une seule sorte de repère par liste : la durée si toutes les vidéos l'ont, sinon la
 * date si toutes l'ont. Sinon chaque ligne prend ce qu'elle a. La plateforme n'est
 * pas répétée.
 */
function sorteDeRepere(cles: CleVideo[]): Repere | null {
  const a = (cle: CleVideo, champ: Repere) => {
    const v = VIDEOS[cle] as { duree?: string; date?: string };
    return Boolean(v[champ]);
  };
  if (cles.every((c) => a(c, "duree"))) return "duree";
  if (cles.every((c) => a(c, "date"))) return "date";
  return null;
}

/** « 7 min 26 », ou « 21 mai 2026 », ou rien. */
function repere(cle: CleVideo, sorte: Repere | null): string | null {
  const v = VIDEOS[cle] as { duree?: string; date?: string };
  if (sorte === "duree") return typo(v.duree!);
  if (sorte === "date") return typo(dateLongue(v.date!));
  if (v.duree) return typo(v.duree);
  if (v.date) return typo(dateLongue(v.date));
  return null;
}

/**
 * Bloc « Vidéos » : trois entrées au plus, une seule fois par page (allegement 2.9).
 * Titre en lien, repère en 14 px dessous. La vidéo s'ouvre sur sa plateforme.
 * Le titre du bloc est toujours à la taille d'un h3 (un petit bloc) ; `niveau` ne
 * règle que la balise (h2 quand le bloc est une section de la page).
 * `className` habille le bloc (une surface brume, par exemple) ; `children` vient
 * sous la liste (le lien vers la chaîne).
 */
export function ListeVideos({
  cles,
  titre = "Vidéos",
  niveau = 3,
  id,
  className,
  children,
}: {
  cles: CleVideo[];
  titre?: string;
  niveau?: 2 | 3;
  /** id du titre : le bloc devient une section qu'il nomme. */
  id?: string;
  className?: string;
  children?: ReactNode;
}) {
  const Balise = niveau === 2 ? "h2" : "h3";
  const Bloc = id ? "section" : "div";
  const liste = cles.slice(0, 3);
  const sorte = sorteDeRepere(liste);
  return (
    <Bloc aria-labelledby={id} className={className}>
      <Balise id={id} className="titre-3">
        {typo(titre)}
      </Balise>
      <ul className="mt-4 grid gap-3 tab:mt-5">
        {liste.map((cle) => {
          const v = VIDEOS[cle];
          const r = repere(cle, sorte);
          return (
            <li key={cle}>
              <a href={v.href} className="group flex min-h-11 flex-col justify-center py-1">
                <span className="font-semibold text-bleu underline decoration-[1.5px] underline-offset-[6px] group-hover:decoration-2">
                  <TexteFleche externe>{v.titre}</TexteFleche>
                </span>
                {r ? <span className="mt-1 block text-note text-encre-2">{r}</span> : null}
              </a>
            </li>
          );
        })}
      </ul>
      {children}
    </Bloc>
  );
}
