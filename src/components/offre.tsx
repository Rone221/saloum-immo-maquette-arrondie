import { CalendarBlank } from "@phosphor-icons/react/ssr";
import { RECASEMENT_AIBD } from "@/content/programmes";
import { cx } from "@/lib/base";
import { BoutonWhatsApp } from "./bouton";
import { LienSuite } from "./lien";
import { Puce } from "./puce";
import { TexteFait } from "./texte";

/**
 * Carte « offre datée » du Recasement AIBD (revue 2) : pas une quatrième carte de
 * programme. Pas de photo (aucune n'est publiée), un contour en tirets et pas de fond,
 * la date en puce avant tout le reste, le prix toujours à côté de « avril 2025 ».
 * Le bouton prend le ton « inverse » sur une plaque brume (`surBrume`), « second » sur le blanc.
 */
export function TicketOffre({
  className,
  niveau = 3,
  surBrume = false,
}: {
  className?: string;
  niveau?: 2 | 3;
  surBrume?: boolean;
}) {
  const o = RECASEMENT_AIBD;
  const Titre = niveau === 2 ? "h2" : "h3";
  return (
    <article
      aria-labelledby="t-offre-aibd"
      className={cx("@container rounded-photo border-2 border-dashed border-encre/20 p-5 tab:p-7 desk:p-8", className)}
    >
      {/* Côte à côte seulement quand la carte a la place (48 rem) : pleine largeur à
          l'accueil, empilée dans la colonne de la page Terrains. */}
      <div className="grid gap-6 @3xl:grid-cols-[minmax(0,1fr)_auto] @3xl:items-center @3xl:gap-12">
        <div>
          <Puce
            ton={surBrume ? "blanc" : "brume"}
            icone={<CalendarBlank aria-hidden size={16} weight="bold" className="text-orange" />}
          >
            {o.ticket.date}
          </Puce>
          <Titre id="t-offre-aibd" className="mt-3 titre-3">
            {o.nom}
            <span className="font-normal text-encre-2">
              {", "}
              <TexteFait fait={o.ticket.lieu} />
            </span>
          </Titre>
          <p className="mt-2 max-w-[42rem]">
            <TexteFait fait={o.ticket.texte} />
          </p>
        </div>
        <div className="grid gap-2 tab:flex tab:flex-wrap tab:items-center tab:gap-x-8 @3xl:flex-col @3xl:items-start @3xl:gap-y-1">
          <BoutonWhatsApp ton={surBrume ? "inverse" : "second"} message={o.message} pleineLargeur>
            {o.bouton}
          </BoutonWhatsApp>
          <LienSuite href={o.href!}>Voir l’offre</LienSuite>
        </div>
      </div>
    </article>
  );
}
