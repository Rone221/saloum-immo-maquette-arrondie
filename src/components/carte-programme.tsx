import Link from "next/link";
import { BOUTON_PROGRAMME, type Programme } from "@/content/programmes";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";
import { BoutonWhatsApp } from "./bouton";
import { Cadre } from "./photo";
import { TexteFait } from "./texte";

/**
 * Carte de programme (accueil) : une photo arrondie, puis le texte posé sur le blanc,
 * sans cadre autour (jamais une boîte dans une boîte). Deux actions : la fiche
 * (photo et nom cliquables) et WhatsApp, en bouton secondaire.
 * Les proportions de la photo viennent de l'appelant (`cadre`) : les trois cartes
 * de l'accueil n'ont pas la même forme.
 */
export function CarteProgramme({
  programme: p,
  cadre,
  sizes,
  niveau = 3,
  className,
}: {
  programme: Programme;
  /** Classes du cadre photo : proportions par largeur (« aspect-[4/3] desk:aspect-[7/8] »). */
  cadre: string;
  /** Largeur dessinée de la photo, pour le choix de la variante. */
  sizes: string;
  niveau?: 2 | 3;
  className?: string;
}) {
  const Titre = niveau === 2 ? "h2" : "h3";
  return (
    <article className={cx("flex flex-col", className)}>
      {/* La photo mène aussi à la fiche ; hors de l'ordre de tabulation (le nom suffit). */}
      <Link href={p.href} tabIndex={-1} aria-hidden className="block">
        <Cadre id={p.photo} sizes={sizes} className={cadre} zoom decorative />
      </Link>
      <div className="mt-5 tab:mt-6">
        <Titre className="titre-3">
          {/* Marge de clic : 44 px de haut sans changer la ligne. */}
          <Link href={p.href} className="-my-2.5 inline-block py-2.5 underline-offset-[6px] hover:text-bleu hover:underline">
            {p.nom}
          </Link>
        </Titre>
        <p className="mt-1 text-encre-2">
          <TexteFait fait={p.lieu} />
        </p>
        <p className="mt-3">
          <span className="font-semibold">{typo(`${p.statut.texte}.`)}</span> <TexteFait fait={p.accroche} />
        </p>
        <BoutonWhatsApp
          ton="second"
          message={p.message}
          ariaLabel={`${BOUTON_PROGRAMME}, ${p.nom}`}
          pleineLargeur
          className="mt-5"
        >
          {BOUTON_PROGRAMME}
        </BoutonWhatsApp>
      </div>
    </article>
  );
}
