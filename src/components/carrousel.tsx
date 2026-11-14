"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/base";

/**
 * Carrousel (revue 2) : une piste à défilement horizontal natif, aimantée sur le début
 * de chaque diapositive. Elle marche sans JavaScript, au doigt, au pavé tactile et au
 * clavier (le focus d'un lien fait défiler la piste jusqu'à lui). Avec un en-tête, les
 * boutons précédent et suivant n'apparaissent que si la piste déborde ; après un clic,
 * une zone lue par les lecteurs d'écran dit quelles diapositives sont à l'écran
 * (« 2 à 4 sur 5 »). Aucune lecture automatique.
 *
 * `piste` règle l'espacement (marge sous l'en-tête, écart entre diapositives, place
 * pour l'ombre des cartes survolées) et peut faire de la piste une grille à partir
 * d'une largeur (« desk:grid desk:grid-cols-3 ») : sans débordement, les boutons
 * s'effacent.
 * `diapo` règle la largeur de chaque diapositive.
 * `rangee` : sans en-tête (galerie d'une fiche), la rangée des boutons est rendue dès
 * le serveur, pour que les photos ne sautent pas à l'hydratation. Ces classes la
 * masquent là où la piste ne déborde jamais (« min-[87rem]:hidden ») ; ailleurs, le
 * script ne fait qu'activer ou griser les boutons.
 */
export function Carrousel({
  etiquette,
  children,
  entete,
  piste,
  diapo,
  rangee,
  ton = "brume",
  className,
}: {
  /** Nom du carrousel, lu par les lecteurs d'écran (« Terrains disponibles »). */
  etiquette: string;
  children: ReactNode;
  /** Ce qui se pose à gauche des boutons : le titre du bloc, en général. */
  entete?: ReactNode;
  piste?: string;
  diapo?: string;
  /** Sans en-tête : classes de la rangée des boutons, toujours rendue. */
  rangee?: string;
  /** Fond des boutons : brume sur le blanc, blanc sur une plaque brume. */
  ton?: "brume" | "blanc";
  className?: string;
}) {
  const diapos = Children.toArray(children);
  const n = diapos.length;
  const pisteRef = useRef<HTMLDivElement>(null);
  const annoncer = useRef(false);
  const minuterie = useRef<number | undefined>(undefined);
  const [etat, setEtat] = useState({ deborde: false, debut: true, fin: false });
  const [annonce, setAnnonce] = useState("");

  /** Diapositives entièrement visibles, de la première à la dernière (1 à n). */
  const visibles = useCallback(() => {
    const el = pisteRef.current;
    if (!el) return [1, 1];
    const gauche = el.scrollLeft;
    const droite = gauche + el.clientWidth;
    const items = Array.from(el.children) as HTMLElement[];
    const vus = items
      .map((d, i) => (d.offsetLeft >= gauche - 2 && d.offsetLeft + d.offsetWidth <= droite + 2 ? i + 1 : 0))
      .filter(Boolean);
    return vus.length ? [vus[0], vus[vus.length - 1]] : [1, 1];
  }, []);

  const mesurer = useCallback(() => {
    const el = pisteRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEtat({ deborde: max > 2, debut: el.scrollLeft <= 2, fin: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    const el = pisteRef.current;
    if (!el) return;
    mesurer();
    const ro = new ResizeObserver(mesurer);
    ro.observe(el);
    const surDefilement = () => {
      mesurer();
      // Fin du défilement (scrollend n'est pas partout) : 160 ms sans mouvement.
      window.clearTimeout(minuterie.current);
      minuterie.current = window.setTimeout(() => {
        if (!annoncer.current) return;
        annoncer.current = false;
        const [a, b] = visibles();
        setAnnonce(a === b ? `${a} sur ${n}` : `${a} à ${b} sur ${n}`);
      }, 160);
    };
    el.addEventListener("scroll", surDefilement, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", surDefilement);
      window.clearTimeout(minuterie.current);
    };
  }, [mesurer, visibles, n]);

  const aller = (sens: 1 | -1) => {
    const el = pisteRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    // Pas : d'un début de diapositive au suivant (largeur plus espacement).
    const pas = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : el.clientWidth;
    const calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    annoncer.current = true;
    el.scrollBy({ left: sens * pas, behavior: calme ? "auto" : "smooth" });
  };

  const bouton = cx(
    "inline-flex size-11 cursor-pointer items-center justify-center rounded-bouton text-encre transition-surface",
    "disabled:cursor-default disabled:opacity-35 active:translate-y-px tab:size-12",
    ton === "brume" ? "bg-brume enabled:hover:bg-brume-2" : "bg-white shadow-carte enabled:hover:bg-brume-2",
  );

  return (
    <section aria-roledescription="carrousel" aria-label={etiquette} className={className}>
      {/* Avec un en-tête, les boutons se montrent quand la piste déborde. Sans en-tête, la
          rangée ne dépend pas de la mesure : elle est là dès le serveur (masquée en CSS
          par `rangee` où rien ne déborde), et les boutons sont seulement activés ou grisés. */}
      <div className={cx("flex flex-wrap items-end justify-between gap-x-6 gap-y-4", !entete && rangee)}>
        {entete ? <div className="min-w-0 flex-[1_1_18rem]">{entete}</div> : null}
        <div className={cx("ml-auto flex flex-none gap-2", Boolean(entete) && !etat.deborde && "hidden")}>
          <button type="button" className={bouton} onClick={() => aller(-1)} disabled={etat.debut} aria-label="Précédent">
            <ArrowLeft aria-hidden size={20} weight="bold" />
          </button>
          <button type="button" className={bouton} onClick={() => aller(1)} disabled={etat.fin} aria-label="Suivant">
            <ArrowRight aria-hidden size={20} weight="bold" />
          </button>
        </div>
      </div>
      <div
        ref={pisteRef}
        className={cx("sans-barre relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain", piste)}
      >
        {diapos.map((d, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${i + 1} sur ${n}`}
            className={cx("flex flex-none snap-start", diapo)}
          >
            {d}
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {annonce}
      </p>
    </section>
  );
}
