import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { EMAIL, type Telephone } from "@/content/site";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";

type LienProps = {
  href: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-current"?: "page" | "true";
};

/** Lien interne par next/link (sous-chemin géré), sinon <a>. Même onglet partout. */
export function Lien({ href, children, ...reste }: LienProps) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...reste}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...reste}>
      {children}
    </a>
  );
}

/**
 * Texte suivi d'une flèche (oblique si `externe`). Le dernier mot et la flèche ne se
 * séparent pas : sur deux lignes, la flèche ne passe jamais seule à la ligne.
 * Pour LienSuite et la liste des vidéos.
 */
export function TexteFleche({ children, externe = false }: { children: ReactNode; externe?: boolean }) {
  const Fleche = externe ? ArrowUpRight : ArrowRight;
  const fleche = (
    <Fleche
      aria-hidden
      size={18}
      weight="bold"
      className="ml-1.5 inline-block align-[-0.2em] transition-transform duration-200 group-hover:translate-x-0.5"
    />
  );
  if (typeof children !== "string") {
    return (
      <>
        {children}
        {fleche}
      </>
    );
  }
  const texte = typo(children);
  const coupe = texte.lastIndexOf(" ");
  return (
    <>
      {texte.slice(0, coupe + 1)}
      <span className="whitespace-nowrap">
        {texte.slice(coupe + 1)}
        {fleche}
      </span>
    </>
  );
}

/**
 * Lien de suite : « Tout sur l'aménagement », « Son parcours ». Bleu, 600, souligné,
 * flèche après le texte (flèche oblique pour une vidéo ou un site externe).
 * Sur deux lignes, les lignes s'équilibrent et la flèche reste avec le dernier mot.
 * 44 px de haut au moins. Un par bloc au plus (allegement 2.9).
 */
export function LienSuite({
  href,
  children,
  className,
  ton = "bleu",
  ...reste
}: LienProps & { ton?: "bleu" | "blanc" }) {
  return (
    <Lien
      href={href}
      className={cx(
        "group inline-block py-2.5 font-semibold text-balance underline decoration-[1.5px] underline-offset-[6px] hover:decoration-2",
        ton === "bleu" ? "text-bleu" : "text-white",
        className,
      )}
      {...reste}
    >
      <TexteFleche externe={/^https?:/.test(href)}>{children}</TexteFleche>
    </Lien>
  );
}

/** Lien dans le fil d'un paragraphe : bleu, souligné. */
export function LienTexte({ href, children, className, ...reste }: LienProps) {
  return (
    <Lien
      href={href}
      className={cx("text-bleu underline decoration-1 underline-offset-4 hover:decoration-2", className)}
      {...reste}
    >
      {typeof children === "string" ? typo(children) : children}
    </Lien>
  );
}

/** Numéro de téléphone en clair, toujours lien tel:. */
export function Tel({
  numero,
  format = "court",
  className,
  children,
}: {
  numero: Telephone;
  format?: "court" | "long";
  className?: string;
  /** Texte du lien, à la place du numéro (« appelez ce numéro »). */
  children?: ReactNode;
}) {
  return (
    <a href={numero.href} className={className}>
      {children ?? typo(format === "court" ? numero.court : numero.long)}
    </a>
  );
}

/** Adresse e-mail en clair, lien mailto:. */
export function Mail({ className }: { className?: string }) {
  return (
    <a href={EMAIL.href} className={className}>
      {EMAIL.adresse}
    </a>
  );
}
