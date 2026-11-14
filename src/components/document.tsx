import { ArrowRight, Certificate, FileText, Scroll } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { Document } from "@/content/foncier";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";
import { TexteFait } from "./texte";

const ICONES = { delib: FileText, bail: Scroll, tf: Certificate };

/** « Moyen à élevé » devient « moyen à élevé », après « Niveau de sécurité : ». */
function minuscule(texte: string) {
  return texte.charAt(0).toLowerCase() + texte.slice(1);
}

/**
 * Échelle des trois documents : de gauche à droite, du moins au plus protégé. C'est
 * l'ordre publié par Saloum Immo, pas une note : le niveau reste écrit en mots sur
 * chaque carte. Dès 960 px, quand les trois cartes sont côte à côte (elles s'empilent
 * dessous) ; la phrase est lue par les lecteurs d'écran partout.
 */
export function EchelleDocuments({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="sr-only">{typo("Les trois documents, du moins protégé au plus protégé.")}</p>
      <div aria-hidden className="hidden items-center gap-4 text-note font-medium text-encre-2 min-[60rem]:flex">
        <span>Moins protégé</span>
        <span className="relative h-0.5 flex-1 rounded-bouton bg-filet">
          <ArrowRight size={18} weight="bold" className="absolute -top-[8px] -right-1.5 text-encre-2" />
        </span>
        <span>Plus protégé</span>
      </div>
      <p aria-hidden className="text-note font-medium text-encre-2 min-[60rem]:hidden">
        {typo("Du moins protégé au plus protégé.")}
      </p>
    </div>
  );
}

/**
 * Carte d'un document foncier (revue 2). Le titre foncier, le plus protégé, en bleu ;
 * les deux autres sur la brume. Le niveau de sécurité en mots, en gras, sous le nom.
 * - `href` : la carte mène à la page Foncier (accueil) et se soulève au survol ;
 * - `complet` : « à savoir » et « chez Saloum Immo » en plus (page Foncier).
 */
export function CarteDocument({
  doc,
  href,
  complet = false,
  avecChezNous = true,
  niveauTitre = 3,
  className,
}: {
  doc: Document;
  href?: string;
  complet?: boolean;
  /** « Chez Saloum Immo » sous la définition complète (pas sur la fiche de l'offre AIBD, qui en est l'exemple). */
  avecChezNous?: boolean;
  niveauTitre?: 2 | 3;
  className?: string;
}) {
  const Titre = niveauTitre === 2 ? "h2" : "h3";
  const tf = doc.statut === "tf";
  const Icone = ICONES[doc.statut];
  const titreId = `t-doc-${doc.statut}`;
  return (
    <article
      id={complet ? `doc-${doc.statut}` : undefined}
      aria-labelledby={titreId}
      className={cx(
        "group relative flex flex-col rounded-plaque p-6 tab:p-8",
        tf ? "bg-bleu text-white [&_:focus-visible]:outline-white" : "bg-brume text-encre",
        href && "transition-carte hover:-translate-y-1 hover:shadow-survol",
        className,
      )}
    >
      <span
        aria-hidden
        className={cx(
          "grid size-12 place-items-center rounded-bouton transition-transform duration-300 group-hover:-rotate-6",
          tf ? "bg-white text-bleu" : "bg-white text-encre",
        )}
      >
        <Icone size={26} weight={tf ? "fill" : "regular"} />
      </span>
      <Titre id={titreId} className="mt-6 titre-3 tab:mt-8">
        {href ? (
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-plaque focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-bleu-vif"
          >
            {doc.nom}
          </Link>
        ) : (
          doc.nom
        )}
      </Titre>
      <p className={cx("mt-1 font-semibold", tf ? "text-white" : "text-encre")}>
        <span className={tf ? "text-white/85" : "text-encre-2"}>{typo("Niveau de sécurité : ")}</span>
        {typo(`${minuscule(doc.niveau.texte)}.`)}
      </p>
      <p className={cx("mt-4", tf ? "text-white/92" : "text-encre-2")}>
        <TexteFait fait={doc.definition} />
      </p>
      {complet ? (
        <>
          <p className={cx("mt-3", tf ? "text-white/92" : "text-encre-2")}>
            <TexteFait fait={doc.aSavoir} />
          </p>
          {avecChezNous ? (
            <p className={cx("mt-6 border-t pt-5", tf ? "border-white/25" : "border-filet")}>
              <span className={cx("block text-note font-medium", tf ? "text-white/85" : "text-encre-2")}>Chez Saloum Immo</span>
              <span className="mt-0.5 block font-medium">
                <TexteFait fait={doc.chezNous} />
              </span>
            </p>
          ) : null}
        </>
      ) : null}
      {href ? (
        <span aria-hidden className={cx("mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold", tf ? "text-white" : "text-bleu")}>
          En savoir plus
          <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      ) : null}
    </article>
  );
}
