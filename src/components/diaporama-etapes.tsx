"use client";

import { Pause, Play } from "@phosphor-icons/react/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { cx } from "@/lib/base";

/** Rien à écouter : seul compte le passage du rendu serveur au rendu client. */
const sansAbonnement = () => () => {};

export type DiapoEtape = {
  titre: string;
  texte: string;
  /** La photo, rendue côté serveur (Photo en `fill`) : les fiches photo restent sur le serveur. */
  photo: ReactNode;
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Diaporama de l'ouverture de l'accueil (revue 2) : les cinq étapes de l'aménagement,
 * en fondu enchaîné, chacune six secondes, avec un lent rapprochement de la photo.
 *
 * En haut, une barre sombre porte les segments de progression (un par étape, chacun
 * cliquable) et le bouton pause. En bas, un panneau blanc dit l'étape en cours. Le
 * segment actif se remplit en CSS (remplissage) : la fin de son animation fait passer
 * à l'étape suivante. Le défilement s'arrête au survol de la souris, quand le focus est
 * dans le diaporama, quand il sort de l'écran, et pour de bon au bouton pause. Avec
 * prefers-reduced-motion, il ne part jamais seul (les animations CSS sont coupées) :
 * les segments restent pour changer d'étape.
 *
 * Photos : seules l'étape en cours et la suivante sont montées au départ ; une photo
 * déjà vue le reste. Les cinq ne partent donc pas avec l'image principale.
 */
export function DiaporamaEtapes({
  etapes,
  etiquette,
  className,
  cadre,
}: {
  etapes: DiapoEtape[];
  /** Nom du diaporama, lu par les lecteurs d'écran. */
  etiquette: string;
  className?: string;
  /** Classes du cadre : proportions, hauteur. */
  cadre: string;
}) {
  const n = etapes.length;
  const [i, setI] = useState(0);
  // Indices des photos montées : l'étape en cours, la suivante, et celles déjà vues.
  const [montees, setMontees] = useState<ReadonlySet<number>>(() => new Set([0, 1 % n]));
  const [pauseManuelle, setPauseManuelle] = useState(false);
  const [survol, setSurvol] = useState(false);
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(true);
  // useReducedMotion vaut null au serveur, mais true dès le premier rendu client avec
  // prefers-reduced-motion. Tant que le composant n'est pas hydraté, on l'ignore : React ne
  // corrige pas un attribut en désaccord à l'hydratation (aria-live resterait sur off).
  // Il refait le rendu juste après avec la vraie valeur, et met alors l'attribut à jour.
  const monte = useSyncExternalStore(sansAbonnement, () => true, () => false);
  const calme = useReducedMotion();
  const racine = useRef<HTMLDivElement>(null);

  /** Passe à l'étape k : sa photo et la suivante sont montées. */
  const aller = (k: number) => {
    const suivante = (k + 1) % n;
    setI(k);
    setMontees((m) => (m.has(k) && m.has(suivante) ? m : new Set([...m, k, suivante])));
  };

  // Hors de l'écran, le diaporama s'arrête (il reprend où il en était).
  useEffect(() => {
    const el = racine.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const enPause = pauseManuelle || survol || focus || !visible || Boolean(calme && monte);
  const e = etapes[i];

  return (
    <div
      ref={racine}
      role="region"
      aria-roledescription="carrousel"
      aria-label={etiquette}
      className={cx("relative", className)}
      onPointerEnter={(ev) => ev.pointerType === "mouse" && setSurvol(true)}
      onPointerLeave={(ev) => ev.pointerType === "mouse" && setSurvol(false)}
      onFocus={() => setFocus(true)}
      onBlur={(ev) => {
        if (!ev.currentTarget.contains(ev.relatedTarget as Node | null)) setFocus(false);
      }}
    >
      <div className={cx("relative isolate overflow-hidden rounded-plaque bg-brume", cadre)}>
        {etapes.map((etape, k) => (
          <div
            key={etape.titre}
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${k + 1} sur ${n}`}
            aria-hidden={k !== i}
            className={cx(
              "absolute inset-0",
              k === i
                ? "z-[1] scale-106 opacity-100 [transition:opacity_0.9s_ease,scale_7s_cubic-bezier(0.2,0.7,0.2,1)]"
                : "z-0 scale-100 opacity-0 [transition:opacity_0.9s_ease,scale_0s_linear_0.9s]",
            )}
          >
            {montees.has(k) ? etape.photo : null}
          </div>
        ))}

        {/* Segments et pause : une barre sombre, lisible sur le ciel comme sur la latérite. */}
        <div className="absolute inset-x-3 top-3 z-10 flex items-center gap-1 rounded-bouton bg-encre/50 py-1 pr-1 pl-3 tab:inset-x-4 tab:top-4">
          <ol className="flex flex-1 gap-1.5">
            {etapes.map((etape, k) => (
              <li key={etape.titre} className="flex-1">
                <button
                  type="button"
                  onClick={() => aller(k)}
                  aria-label={`Étape ${k + 1} : ${etape.titre}`}
                  aria-current={k === i ? "step" : undefined}
                  className="group/segment flex h-9 w-full cursor-pointer items-center"
                >
                  <span className="relative block h-1 w-full overflow-hidden rounded-bouton bg-white/35 transition-colors group-hover/segment:bg-white/60">
                    <span
                      key={k === i ? `${i}-${pauseManuelle}` : k}
                      onAnimationEnd={k === i ? () => aller((i + 1) % n) : undefined}
                      style={k === i ? { animationPlayState: enPause ? "paused" : "running" } : undefined}
                      className={cx(
                        "absolute inset-0 origin-left bg-white",
                        k < i && "scale-x-100",
                        k > i && "scale-x-0",
                        // Pause demandée : le segment actif reste plein, sans animation.
                        k === i && !pauseManuelle && "remplissage",
                      )}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => setPauseManuelle((p) => !p)}
            aria-label={pauseManuelle ? "Reprendre le diaporama" : "Mettre le diaporama en pause"}
            className="grid size-9 flex-none cursor-pointer place-items-center rounded-bouton text-white transition-colors hover:bg-white/15"
          >
            {pauseManuelle ? <Play aria-hidden size={18} weight="fill" /> : <Pause aria-hidden size={18} weight="fill" />}
          </button>
        </div>

        {/* L'étape en cours. Lue à voix haute seulement quand le diaporama est arrêté. */}
        <div
          aria-live={enPause ? "polite" : "off"}
          className="absolute inset-x-3 bottom-3 z-10 rounded-photo bg-white p-4 shadow-carte tab:right-auto tab:bottom-4 tab:left-4 tab:w-[23rem] tab:p-5"
        >
          <p className="text-note text-encre-2">{`Étape ${i + 1} sur ${n}`}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={calme ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={calme ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <p className="mt-0.5 titre-3">{e.titre}</p>
              <p className="mt-1 hidden text-encre-2 tab:block">{e.texte}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
