import { AGENCE, MOBILE, RAISON_SOCIALE, SLOGAN } from "@/content/site";
import { asset } from "@/lib/base";
import { typo } from "@/lib/format";
import { BoutonAppel, BoutonWhatsApp } from "./bouton";
import { Mail, Tel } from "./lien";
import { HorsContact } from "./hors-contact";
import { LiensPied } from "./nav-links";
import { Plaque } from "./section";

/**
 * Pied de contact (allegement 2.10) : la bande « Parlons de votre terrain » et le
 * pied de page fusionnés. Une plaque bleue, tenue basse, puis une ligne blanche :
 * six rubriques, logo, raison sociale et devise. Sur Contact, la ligne blanche seule
 * (HorsContact).
 *
 * Dans la plaque, le numéro est au corps du titre, sur la même ligne au bureau ;
 * dessous : l'agence et l'e-mail à gauche, les deux boutons à droite. Mobile : le
 * titre, le numéro, les boutons, puis l'agence et l'e-mail.
 * Ligne blanche : le logo et les rubriques (deux colonnes sous 768 px, trois jusqu'à
 * 1 240, une ligne au-delà), la raison sociale dessous, sur toute la largeur.
 */
export function PiedContact() {
  return (
    <footer id="pied" className="page pb-5 tab:pb-10">
      <HorsContact>
        <Plaque ton="bleu" className="px-5 py-7 tab:px-10 tab:py-9 desk:px-12 desk:py-9">
          <div className="grid desk:grid-cols-[minmax(0,1fr)_auto] desk:items-baseline desk:gap-x-10">
            <h2 className="titre-2">Parlons de votre terrain.</h2>
            <Tel
              numero={MOBILE}
              format="long"
              className="mt-1 inline-flex min-h-11 items-center justify-self-start titre-2 whitespace-nowrap text-white hover:underline hover:decoration-2 hover:underline-offset-8 desk:mt-0 desk:justify-self-end"
            />
            <div className="order-last mt-5 text-white/90 desk:order-none desk:col-start-1 desk:row-start-2 desk:mt-4 desk:self-end">
              <p>{typo(`Agence : ${AGENCE.texte}`)}</p>
              <Mail className="inline-flex min-h-11 items-center font-medium text-white underline decoration-white/50 decoration-1 underline-offset-4 hover:decoration-white" />
            </div>
            <div className="mt-5 grid gap-3 tab:flex tab:flex-wrap desk:col-start-2 desk:row-start-2 desk:mt-4 desk:justify-end desk:self-end">
              <BoutonWhatsApp ton="inverse" pleineLargeur>
                Écrire sur WhatsApp
              </BoutonWhatsApp>
              <BoutonAppel ton="voile" pleineLargeur />
            </div>
          </div>
        </Plaque>
      </HorsContact>

      <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-3 tab:mt-10 tab:gap-y-4 desk:gap-x-12 desk:gap-y-5">
        <nav aria-label="Rubriques" className="col-span-2 desk:col-span-1 desk:col-start-2 desk:row-start-1 desk:justify-self-end">
          <LiensPied className="grid grid-cols-2 gap-x-6 tab:grid-cols-3 tab:gap-x-7 desk:flex desk:flex-wrap" />
        </nav>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/2269-logo-horizontal-420.png")}
          width={420}
          height={160}
          alt="Saloum Immo"
          className="h-10 w-auto desk:col-start-1 desk:row-start-1"
        />
        <p className="col-span-2 text-note text-encre-2">{typo(`${RAISON_SOCIALE.texte}. ${SLOGAN.texte}`)}</p>
      </div>
    </footer>
  );
}
