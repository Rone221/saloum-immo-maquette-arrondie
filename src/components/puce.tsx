import type { ReactNode } from "react";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";

/**
 * Puce : un repère court posé sur une carte ou une photo (« 78 parcelles de 150 m² »,
 * « Offre d'avril 2025 »). 14 px, rayon de bouton, un fond et pas de bordure.
 * - brume : sur le blanc ;
 * - blanc : sur une photo ou sur la brume ;
 * - bleu : le statut d'un programme, quand il faut le distinguer ;
 * - sombre : sur une photo, texte blanc (durée d'une vidéo).
 */
export type TonPuce = "brume" | "blanc" | "bleu" | "sombre";

const TONS: Record<TonPuce, string> = {
  brume: "bg-brume text-encre",
  blanc: "bg-white text-encre",
  bleu: "bg-bleu/10 text-bleu",
  sombre: "bg-encre/70 text-white",
};

export function Puce({
  children,
  ton = "brume",
  icone,
  className,
}: {
  children: ReactNode;
  ton?: TonPuce;
  /** Icône Phosphor, 16 px, devant le texte. */
  icone?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex min-h-7 items-center gap-1.5 rounded-bouton px-2.5 py-1 text-note leading-serre font-medium",
        TONS[ton],
        className,
      )}
    >
      {icone}
      {typeof children === "string" ? typo(children) : children}
    </span>
  );
}
