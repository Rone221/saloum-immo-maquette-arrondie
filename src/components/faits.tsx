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
 * Travaux datés : le mois en toutes lettres (600), puis le fait. Avec `sources`,
 * la source sous chaque ligne, en lien quand elle a une adresse (page Aménager).
 * Sans, une ligne par chantier (accueil). Filet entre les lignes. Les liens de source
 * ont 44 px de haut.
 */
export function TravauxDates({
  lignes,
  sources = false,
  className,
}: {
  lignes: LigneTravaux[];
  sources?: boolean;
  className?: string;
}) {
  return (
    <ol className={cx("divide-y divide-filet", className)}>
      {lignes.map((l) => (
        <li
          key={l.id}
          className="grid gap-1 py-4 first:pt-0 last:pb-0 tab:grid-cols-[10rem_minmax(0,1fr)] tab:gap-6 tab:py-5"
        >
          <p className="font-semibold">{l.mois}</p>
          <div>
            <p>
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
                        className="inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:text-bleu"
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
          </div>
        </li>
      ))}
    </ol>
  );
}
