import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";

export type EtapeFil = { href: string; libelle: string };

/**
 * Fil d'Ariane, du haut vers la page parente (la page courante n'y est pas). Une
 * barre entre deux éléments, jamais après le dernier. Liens de 44 px de haut.
 */
export function FilAriane({ fil, className }: { fil: EtapeFil[]; className?: string }) {
  return (
    <nav aria-label="Fil d’Ariane" className={cx("text-note text-encre-2", className)}>
      <ol className="flex flex-wrap items-center gap-x-2">
        {fil.map((f, i) => (
          <li key={f.href} className="flex items-center gap-x-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            <Link href={f.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-bleu hover:underline">
              {f.libelle}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Ouverture d'une page intérieure : fil d'Ariane (fiches), h1, chapeau, puis les
 * actions (`children`). Avec `aside` (une carte, en général), deux colonnes dès 960 px :
 * le texte à gauche, l'aside à droite, 7 et 5 colonnes jusqu'à 1 239 px, 6 et 6 au
 * bureau. En dessous, l'aside passe dessous ; de 768 à 959 px, il se centre
 * (« tab:max-[60rem]:mx-auto » sur la carte, qui a sa largeur maximale).
 * Sans aside, le texte seul, 48 rem au plus.
 * Avec un fil, la marge haute raccourcit : les liens du fil ont déjà 44 px de haut.
 * `serre` : marge basse courte, quand une grande photo suit tout de suite (fiches,
 * rangées de Terrains).
 */
export function PageTete({
  titre,
  chapeau,
  fil,
  aside,
  serre = false,
  children,
  className,
}: {
  titre: string;
  chapeau?: ReactNode;
  fil?: EtapeFil[];
  aside?: ReactNode;
  serre?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const avecFil = Boolean(fil?.length);
  const texte = (
    <div className={cx(aside ? "min-[60rem]:col-span-7 desk:col-span-6 desk:pr-6" : "max-w-[48rem]")}>
      {fil && avecFil ? <FilAriane fil={fil} /> : null}
      <h1 id="t-page" className={cx("titre-1", avecFil && "mt-2 tab:mt-3")}>
        {typo(titre)}
      </h1>
      {chapeau ? (
        <div className="mt-5 text-h3 leading-[1.45] text-encre-2 tab:mt-7">
          {typeof chapeau === "string" ? <p>{typo(chapeau)}</p> : chapeau}
        </div>
      ) : null}
      {children}
    </div>
  );
  return (
    <section
      aria-labelledby="t-page"
      className={cx(
        "page",
        avecFil ? "pt-6 tab:pt-10 desk:pt-12" : "pt-10 tab:pt-14 desk:pt-16",
        serre ? "pb-10 tab:pb-12 desk:pb-14" : "pb-18 tab:pb-24 desk:pb-28",
        className,
      )}
    >
      {aside ? (
        <div className="grid gap-10 min-[60rem]:grid-cols-12 min-[60rem]:items-center min-[60rem]:gap-8">
          {texte}
          <div className="min-[60rem]:col-span-5 desk:col-span-6">{aside}</div>
        </div>
      ) : (
        texte
      )}
    </section>
  );
}
