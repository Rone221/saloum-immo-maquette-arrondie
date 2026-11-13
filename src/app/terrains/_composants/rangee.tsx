// Rangée d'un programme (page Terrains, allegement 3) : la photo sur sept colonnes au
// bureau, le texte sur le blanc à côté. Les rangées alternent : photo à gauche, puis à
// droite (`inverse`). Sur mobile, la photo d'abord. Pas de tableau ni de filet ici :
// quatre lignes courtes suffisent pour comparer, le tableau complet vit sur la fiche.
// Statut foncier en tête, en gras ; « Déjà fait » garde son mot-clé, les autres lignes
// se lisent seules (allegement 2.5).

import Link from "next/link";
import { BoutonWhatsApp } from "@/components/bouton";
import { Cadre } from "@/components/photo";
import { cx } from "@/lib/base";
import { Texte, TexteFait } from "@/components/texte";
import { BOUTON_PROGRAMME, type Programme } from "@/content/programmes";

/** « Terrains viabilisés » devient « terrains viabilisés », après « Déjà fait : ». */
function minuscule(texte: string) {
  return texte.charAt(0).toLowerCase() + texte.slice(1);
}

export function Rangee({
  programme: p,
  preload = false,
  inverse = false,
}: {
  programme: Programme;
  preload?: boolean;
  /** Photo à droite au bureau. */
  inverse?: boolean;
}) {
  return (
    <article aria-labelledby={`t-${p.slug}`} className="grid gap-6 tab:gap-8 desk:grid-cols-12 desk:items-center">
      {/* La photo mène aussi à la fiche ; hors de l'ordre de tabulation (le nom suffit). */}
      <Link
        href={p.href}
        tabIndex={-1}
        aria-hidden
        className={cx("block desk:col-span-7 desk:row-start-1", inverse && "desk:col-start-6")}
      >
        <Cadre
          id={p.photo}
          decorative
          zoom
          preload={preload}
          sizes="(min-width: 1360px) 752px, (min-width: 1240px) 58vw, 100vw"
          className="aspect-[3/2] tab:aspect-[16/9]"
        />
      </Link>
      <div className={cx("desk:col-span-5 desk:row-start-1", inverse ? "desk:col-start-1 desk:pr-6" : "desk:pl-6")}>
        <h2 id={`t-${p.slug}`} className="titre-2">
          <Link href={p.href} className="-my-1.5 inline-block py-1.5 underline-offset-8 hover:text-bleu hover:underline">
            {p.nom}
          </Link>
        </h2>
        <p className="mt-2 text-encre-2 tab:mt-3">
          <TexteFait fait={p.lieu} />
        </p>
        <ul className="mt-5 grid gap-2 tab:mt-6 tab:gap-2.5">
          <li className="font-semibold">
            <Texte>{`${p.statut.texte}.`}</Texte>
          </li>
          <li>
            <Texte>{`${p.surfaces.texte}.`}</Texte>
          </li>
          <li>
            <span className="text-encre-2">
              <Texte>{"Déjà fait : "}</Texte>
            </span>
            <Texte>{`${minuscule(p.dejaFait.texte)}.`}</Texte>
          </li>
          <li>Prix sur demande.</li>
        </ul>
        <BoutonWhatsApp
          ton="second"
          message={p.message}
          ariaLabel={`${BOUTON_PROGRAMME}, ${p.nom}`}
          pleineLargeur
          className="mt-5 tab:mt-8"
        >
          {BOUTON_PROGRAMME}
        </BoutonWhatsApp>
      </div>
    </article>
  );
}
