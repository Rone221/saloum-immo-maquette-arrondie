import { Phone, WhatsappLogo } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import { MOBILE } from "@/content/site";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";
import { waHref } from "@/lib/whatsapp";
import { Lien } from "./lien";

/**
 * Tons de bouton. Une surface arrondie a un fond OU une bordure, jamais les deux :
 * aucun bouton n'a de bordure.
 * - plein : bleu, texte blanc. Un par section au plus, trois par page.
 * - second : brume, texte bleu. Actions WhatsApp des programmes, sur le blanc.
 * - inverse : blanc, texte bleu. Sur une surface de couleur : le bleu du contact, ou
 *   une surface brume (où le bouton second disparaîtrait). Survol brume-2.
 * - voile : blanc à 14 %, texte blanc, sur le bleu seulement.
 */
export type TonBouton = "plein" | "second" | "inverse" | "voile";

const TONS: Record<TonBouton, string> = {
  plein: "bg-bleu text-white hover:bg-bleu-fonce active:bg-bleu-fonce",
  second: "bg-brume text-bleu hover:bg-brume-2 active:bg-brume-2",
  inverse: "bg-white text-bleu hover:bg-brume-2 active:bg-brume-2",
  voile: "bg-white/14 text-white hover:bg-white/24 active:bg-white/24",
};

export type Icone = "whatsapp" | "appel";

const ICONES = { whatsapp: WhatsappLogo, appel: Phone };

/** Classes d'un bouton, pour un élément qui n'est pas un lien. 16 px de marge sous 768 px, 24 au-delà. */
export function classesBouton(ton: TonBouton, pleineLargeur = false) {
  return cx(
    "inline-flex min-h-12 items-center justify-center rounded-bouton px-4 py-2.5 text-center text-corps leading-serre font-semibold transition-surface active:translate-y-px tab:min-h-13 tab:px-6",
    TONS[ton],
    pleineLargeur && "w-full tab:w-auto",
  );
}

const INSECABLE = String.fromCharCode(0xa0);

type Props = {
  href: string;
  children: ReactNode;
  ton?: TonBouton;
  icone?: Icone;
  /** Pleine largeur sous 768 px. */
  pleineLargeur?: boolean;
  /** Nom accessible, quand deux boutons d'une page ont le même libellé. Commence par le libellé visible. */
  ariaLabel?: string;
  className?: string;
};

/**
 * Libellé d'un bouton : les deux derniers mots ne se séparent pas. Un libellé trop
 * long pour sa largeur passe donc sur deux lignes, jamais un mot seul sur la seconde
 * (« Décrire mon terrain / sur WhatsApp »).
 */
function libelle(texte: string) {
  const t = typo(texte);
  const coupe = t.lastIndexOf(" ");
  return coupe > 0 && t.indexOf(" ") < coupe ? `${t.slice(0, coupe)}${INSECABLE}${t.slice(coupe + 1)}` : t;
}

/**
 * Bouton-lien. Interne par next/link, externe (wa.me, tel:) par <a>. Même onglet.
 * L'icône est dans la ligne du texte, pas à côté : si le libellé passe sur deux
 * lignes, elle reste devant le premier mot, et les deux lignes restent centrées.
 */
export function Bouton({ href, children, ton = "plein", icone, pleineLargeur, ariaLabel, className }: Props) {
  const Glyphe = icone ? ICONES[icone] : null;
  return (
    <Lien href={href} aria-label={ariaLabel} className={cx(classesBouton(ton, pleineLargeur), className)}>
      <span>
        {Glyphe ? (
          <Glyphe aria-hidden size={22} weight="regular" className="mr-2 inline-block align-[-0.3em] tab:mr-2.5" />
        ) : null}
        {typeof children === "string" ? libelle(children) : children}
      </span>
    </Lien>
  );
}

/**
 * Bouton WhatsApp : le message pré-rédigé part dans le lien wa.me, il ne s'affiche
 * pas sous le bouton (allegement 2.9 : seule la page Contact montre les messages).
 */
export function BoutonWhatsApp({
  message,
  children,
  ...reste
}: Omit<Props, "href" | "icone"> & { message?: string }) {
  return (
    <Bouton href={waHref(message ? typo(message) : undefined)} icone="whatsapp" {...reste}>
      {children}
    </Bouton>
  );
}

/** Bouton « Appeler » : lien tel: vers le mobile. */
export function BoutonAppel({ children = "Appeler", ...reste }: Omit<Props, "href" | "icone" | "children"> & { children?: ReactNode }) {
  return (
    <Bouton href={MOBILE.href} icone="appel" {...reste}>
      {children}
    </Bouton>
  );
}
