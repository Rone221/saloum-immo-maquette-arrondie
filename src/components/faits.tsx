import type { ReactNode } from "react";
import type { LigneTravaux } from "@/content/registre";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";
import { TexteFait } from "./texte";

/**
 * Tableau de faits : clé à gauche (500, gris), valeur à droite. Un filet de 1 px
 * entre les lignes, et nulle part ailleurs (allegement 2.6). Six lignes au plus.
 * Sur mobile, la clé passe au-dessus de la valeur.
 */
export function TableFaits({
  lignes,
  className,
}: {
  lignes: Array<{ cle: string; valeur: ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={cx("divide-y divide-filet", className)}>
      {lignes.map((l) => (
        <div key={l.cle} className="grid gap-1 py-4 first:pt-0 last:pb-0 tab:grid-cols-[11rem_minmax(0,1fr)] tab:gap-6">
          <dt className="font-medium text-encre-2">{typo(l.cle)}</dt>
          <dd>{l.valeur}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Frise des travaux datés (revue 2) : un jalon par chantier, le mois en toutes lettres,
 * puis le fait. Bureau : quatre jalons sur une ligne, le trait orange se dessine quand
 * la frise entre à l'écran. Tablette : deux par deux. Mobile : une colonne, le trait à
 * gauche. Avec `sources`, la source sous chaque jalon, en lien quand elle a une adresse
 * (page Aménager). Pas de photo à côté : un fait daté ne légende jamais une photo.
 */
export function Frise({
  lignes,
  sources = false,
  className,
}: {
  lignes: LigneTravaux[];
  sources?: boolean;
  className?: string;
}) {
  return (
    <div className={cx("relative", className)}>
      {/* Trait du bureau, à la hauteur des points ; il se dessine (trace-frise). */}
      <span aria-hidden className="absolute top-[11px] right-0 left-0 hidden h-0.5 overflow-hidden rounded-bouton bg-brume-2 desk:block">
        <span className="trace-frise block h-full w-full bg-orange" />
      </span>
      {/* Trait du mobile, à gauche. */}
      <span aria-hidden className="absolute top-3 bottom-3 left-[11px] w-0.5 rounded-bouton bg-brume-2 tab:hidden" />
      <ol className="relative grid gap-8 tab:grid-cols-2 tab:gap-x-8 tab:gap-y-10 desk:grid-cols-4 desk:gap-x-6">
        {lignes.map((l) => (
          <li key={l.id} className="apparition relative pl-10 tab:pl-0 desk:pt-11">
            <span
              aria-hidden
              className="absolute top-0 left-0 grid size-6 place-items-center rounded-bouton bg-white tab:relative tab:mb-3 desk:absolute desk:mb-0"
            >
              <span className="size-3 rounded-bouton bg-orange ring-4 ring-orange/20" />
            </span>
            <p className="font-semibold">{l.mois}</p>
            <p className="mt-1.5 text-encre-2">
              <TexteFait fait={l.texte} />
            </p>
            {sources ? (
              <p className="mt-1 text-note text-encre-2">
                {l.sources.map((s, i) => (
                  <span key={s.libelle}>
                    {i > 0 ? ", " : null}
                    {s.href ? (
                      <a
                        href={s.href}
                        className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:text-bleu hover:decoration-2"
                      >
                        {typo(s.libelle)}
                      </a>
                    ) : (
                      typo(s.libelle)
                    )}
                  </span>
                ))}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
