import { ArrowRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";

/**
 * Petite carte horizontale (revue 2) : une vignette, un nom, une ligne, une flèche.
 * Toute la carte est le lien. Pour « Autres terrains » sous une fiche, et les statuts
 * des programmes sur la page Diaspora. La vignette vient de l'appelant : une photo de
 * programme (Photo en `fill`), ou une icône sur la brume pour une offre sans photo.
 */
export function CarteMini({
  href,
  nom,
  ligne,
  vignette,
  surBrume = false,
  className,
}: {
  href: string;
  nom: string;
  ligne: ReactNode;
  vignette: ReactNode;
  surBrume?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group flex items-center gap-4 rounded-photo bg-white p-3 pr-4 transition-carte hover:-translate-y-0.5 hover:shadow-survol",
        !surBrume && "shadow-carte",
        className,
      )}
    >
      <span className="relative block h-16 w-20 flex-none overflow-hidden rounded-bouton bg-brume tab:h-[4.5rem] tab:w-24">{vignette}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold leading-serre transition-colors group-hover:text-bleu">{typo(nom)}</span>
        <span className="mt-1 block text-note text-encre-2">{typeof ligne === "string" ? typo(ligne) : ligne}</span>
      </span>
      <ArrowRight aria-hidden size={20} weight="bold" className="flex-none text-bleu transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
