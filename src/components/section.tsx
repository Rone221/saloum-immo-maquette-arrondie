import type { ReactNode } from "react";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";

/**
 * Section de page : fond blanc, 72 px en haut et en bas sur mobile, 96 en tablette,
 * 128 au bureau (allegement 2.7). `serre` : pas de marge haute, pour la section qui
 * suit directement une autre section blanche sans changement de sujet.
 */
export function Section({
  id,
  titreId,
  serre,
  className,
  children,
}: {
  id?: string;
  /** id du titre de la section (aria-labelledby). */
  titreId?: string;
  serre?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={titreId}
      className={cx("page", serre ? "pb-18 tab:pb-24 desk:pb-32" : "py-18 tab:py-24 desk:py-32", className)}
    >
      {children}
    </section>
  );
}

/**
 * Plaque : grande surface arrondie (24 px), fond brume ou bleu, jamais de bordure.
 * C'est la « parcelle » de la direction : un bloc posé sur le blanc, comme un lot
 * borné. Deux plaques ne se suivent jamais. Sur le bleu, l'anneau de focus passe au
 * blanc (le bleu vif ne s'y voit pas).
 * overflow-clip et pas overflow-hidden : la plaque coupe ses coins sans devenir un
 * conteneur de défilement, sinon les apparitions au défilement (view()) qu'elle
 * contient resteraient figées.
 */
export function Plaque({
  ton = "brume",
  className,
  children,
}: {
  ton?: "brume" | "bleu";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "isolate overflow-clip rounded-plaque",
        ton === "brume" ? "bg-brume text-encre" : "bg-bleu text-white [&_:focus-visible]:outline-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Titre de section, puis chapeau dessous (jamais à côté). h2 par défaut ; h1 en
 * ouverture de page. Chapeau : 30 mots au plus, 22 px au bureau.
 */
export function TitreSection({
  id,
  titre,
  chapeau,
  niveau = 2,
  ton = "encre",
  className,
  children,
}: {
  id?: string;
  titre: string;
  chapeau?: string;
  niveau?: 1 | 2;
  ton?: "encre" | "blanc";
  className?: string;
  /** Sous le chapeau : boutons, lien. */
  children?: ReactNode;
}) {
  const Balise = niveau === 1 ? "h1" : "h2";
  return (
    <header className={cx("max-w-[44rem]", className)}>
      <Balise id={id} className={niveau === 1 ? "titre-1" : "titre-2"}>
        {typo(titre)}
      </Balise>
      {chapeau ? (
        <p
          className={cx(
            "mt-4 text-h3 leading-[1.45] font-normal tab:mt-6",
            ton === "encre" ? "text-encre-2" : "text-white/90",
          )}
        >
          {typo(chapeau)}
        </p>
      ) : null}
      {children}
    </header>
  );
}

/** Note : 14 px, gris. Dates d'un relevé, origine d'un chiffre. */
export function Note({ children, className }: { children: string; className?: string }) {
  return <p className={cx("text-note text-encre-2", className)}>{typo(children)}</p>;
}
