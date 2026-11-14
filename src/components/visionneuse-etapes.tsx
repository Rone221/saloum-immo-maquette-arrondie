"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "@/lib/base";
import { NumeroEtape } from "./etape";

export type VuePhoto = {
  /** La photo en grand, rendue côté serveur (Photo en `fill`). */
  grande: ReactNode;
  /** La même, en vignette de 80 px. */
  vignette: ReactNode;
  legende: string;
};

export type VueEtape = {
  id: string;
  titre: string;
  texte: string;
  photos: VuePhoto[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Visionneuse des étapes (page Aménager, revue 2). À gauche au bureau, la liste des
 * étapes en onglets : l'étape choisie s'éclaire (un fond brume glisse d'une étape à
 * l'autre, motion) et montre son texte. À droite, ses photos en grand, avec des
 * vignettes quand elle en a plusieurs, et la légende. Les deux colonnes sont égales dès
 * 960 px (et pas au bureau seulement), et le panneau fait 640 px au plus en dessous : la
 * photo n'est jamais dessinée bien plus large que ses fichiers en hauteur (623 à 810 px). En dessous de 960 px, les
 * onglets passent en une rangée qui défile au doigt, au-dessus de la photo, et le texte
 * de l'étape vient sous la photo.
 *
 * `fin` : la dernière étape, sans photo (le titre foncier), rendue côté serveur. Tant
 * qu'une autre étape est choisie, son panneau est inerte : son lien ne prend pas le focus.
 * Clavier : flèches, Début et Fin entre les onglets (focus itinérant).
 *
 * Photos : seules celles de l'étape choisie sont montées, et celles d'un onglet survolé
 * ou qui prend le focus (préchargement). Une étape montée le reste.
 */
export function VisionneuseEtapes({
  etapes,
  fin,
}: {
  etapes: VueEtape[];
  fin: { titre: string; texte: string; panneau: ReactNode };
}) {
  const total = etapes.length + 1;
  const [i, setI] = useState(0);
  const [p, setP] = useState(0);
  // Étapes dont les photos sont dans la page : la première, puis celles qu'on a choisies,
  // survolées ou atteintes au clavier.
  const [montees, setMontees] = useState<ReadonlySet<number>>(() => new Set([0]));
  const calme = useReducedMotion();
  const onglets = useRef<Array<HTMLButtonElement | null>>([]);

  const monter = (k: number) => {
    if (k >= etapes.length) return;
    setMontees((m) => (m.has(k) ? m : new Set([...m, k])));
  };

  const choisir = (k: number, focus = false) => {
    const cible = (k + total) % total;
    setI(cible);
    setP(0);
    monter(cible);
    if (focus) {
      onglets.current[cible]?.focus();
      onglets.current[cible]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: calme ? "auto" : "smooth" });
    }
  };

  const clavier = (ev: KeyboardEvent<HTMLButtonElement>, k: number) => {
    const touches: Record<string, number> = {
      ArrowDown: k + 1,
      ArrowRight: k + 1,
      ArrowUp: k - 1,
      ArrowLeft: k - 1,
      Home: 0,
      End: total - 1,
    };
    if (!(ev.key in touches)) return;
    ev.preventDefault();
    choisir(touches[ev.key], true);
  };

  const titres = [...etapes.map((e) => ({ titre: e.titre, texte: e.texte })), { titre: fin.titre, texte: fin.texte }];
  const courante = i < etapes.length ? etapes[i] : null;

  return (
    <div className="grid gap-6 tab:gap-8 min-[60rem]:grid-cols-12 min-[60rem]:items-start min-[60rem]:gap-10">
      <LayoutGroup id="etapes">
        <div
          role="tablist"
          aria-label="Les étapes"
          className="sans-barre -mx-gouttiere flex snap-x gap-2 overflow-x-auto px-gouttiere scroll-px-gouttiere min-[60rem]:col-span-6 min-[60rem]:mx-0 min-[60rem]:flex-col min-[60rem]:gap-1 min-[60rem]:overflow-visible min-[60rem]:px-0"
        >
          {titres.map((t, k) => {
            const actif = k === i;
            return (
              <button
                key={t.titre}
                ref={(el) => {
                  onglets.current[k] = el;
                }}
                type="button"
                role="tab"
                id={`onglet-etape-${k}`}
                aria-selected={actif}
                aria-controls="panneau-etape"
                tabIndex={actif ? 0 : -1}
                onClick={() => choisir(k)}
                onKeyDown={(ev) => clavier(ev, k)}
                onPointerEnter={() => monter(k)}
                onFocus={() => monter(k)}
                className={cx(
                  "relative isolate flex flex-none cursor-pointer snap-start items-start gap-3 rounded-photo py-3 pr-5 pl-3 text-left transition-colors min-[60rem]:py-4 min-[60rem]:pl-4",
                  actif ? "text-encre" : "text-encre-2 hover:bg-brume/60 hover:text-encre",
                )}
              >
                {actif ? (
                  <motion.span
                    layoutId="etape-active"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-photo bg-brume"
                    transition={calme ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  />
                ) : null}
                <NumeroEtape n={k + 1} />
                <span className="min-w-0">
                  <span className="block font-semibold whitespace-nowrap min-[60rem]:text-h3 min-[60rem]:leading-[1.3] min-[60rem]:whitespace-normal">
                    {t.titre}
                  </span>
                  {/* Le texte de l'étape choisie, au bureau, sous son titre. Caché aux lecteurs
                      d'écran : il est lu dans le panneau, et le nom de l'onglet reste son titre. */}
                  <AnimatePresence initial={false}>
                    {actif ? (
                      <motion.span
                        key="texte"
                        aria-hidden
                        initial={calme ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={calme ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="hidden overflow-hidden min-[60rem]:block"
                      >
                        <span className="block pt-1.5 text-encre-2">{t.texte}</span>
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <div id="panneau-etape" role="tabpanel" tabIndex={0} aria-labelledby={`onglet-etape-${i}`} className="max-w-[40rem] min-[60rem]:col-span-6 min-[60rem]:max-w-none">
        <div className="relative isolate aspect-[4/3] overflow-hidden rounded-plaque bg-brume">
          {/* Les photos des étapes montées sont empilées : le changement d'étape est un
              fondu, sans attendre un chargement quand l'onglet a été survolé. */}
          {etapes.map((e, k) =>
            montees.has(k)
              ? e.photos.map((ph, q) => (
                  <div
                    key={`${e.id}-${q}`}
                    aria-hidden={!(k === i && q === p)}
                    className={cx(
                      "absolute inset-0 transition-opacity duration-500",
                      k === i && q === p ? "z-[1] opacity-100" : "z-0 opacity-0",
                    )}
                  >
                    {ph.grande}
                  </div>
                ))
              : null,
          )}
          {/* Dernière étape : pas de photo, le panneau du titre foncier. Inerte quand une
              autre étape est choisie : son lien sort de l'ordre de tabulation. */}
          <div
            aria-hidden={courante !== null}
            inert={courante !== null}
            className={cx(
              "absolute inset-0 z-[2] transition-opacity duration-500",
              courante === null ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {fin.panneau}
          </div>

          {courante && courante.photos.length > 1 ? (
            <div className="absolute right-3 bottom-3 z-10 flex gap-2 tab:right-4 tab:bottom-4">
              <button
                type="button"
                onClick={() => setP((x) => (x - 1 + courante.photos.length) % courante.photos.length)}
                aria-label="Photo précédente"
                className="grid size-11 cursor-pointer place-items-center rounded-bouton bg-white text-encre shadow-carte transition-surface hover:bg-brume-2"
              >
                <ArrowLeft aria-hidden size={20} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => setP((x) => (x + 1) % courante.photos.length)}
                aria-label="Photo suivante"
                className="grid size-11 cursor-pointer place-items-center rounded-bouton bg-white text-encre shadow-carte transition-surface hover:bg-brume-2"
              >
                <ArrowRight aria-hidden size={20} weight="bold" />
              </button>
            </div>
          ) : null}
        </div>

        {courante ? (
          <div className="mt-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
            <p className="text-note text-encre-2" aria-live="polite">
              {courante.photos[p].legende}
              {courante.photos.length > 1 ? ` (${p + 1} sur ${courante.photos.length})` : null}
            </p>
            {courante.photos.length > 1 ? (
              <ul className="flex gap-2" aria-label="Photos de l’étape">
                {courante.photos.map((ph, q) => (
                  <li key={q}>
                    <button
                      type="button"
                      onClick={() => setP(q)}
                      aria-label={`Photo ${q + 1} sur ${courante.photos.length}`}
                      aria-pressed={q === p}
                      className={cx(
                        "relative block h-12 w-16 cursor-pointer overflow-hidden rounded-bouton bg-brume transition-[opacity,outline-color] tab:h-14 tab:w-[4.5rem]",
                        // Au clavier, le focus se voit aussi sur la vignette choisie.
                        "focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-bleu-vif",
                        q === p ? "outline-2 outline-offset-2 outline-bleu" : "opacity-70 hover:opacity-100",
                      )}
                    >
                      {ph.vignette}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        {/* Mobile et tablette : le texte de l'étape sous la photo. Au bureau, il est lu ici
            sans s'afficher (le texte visible est sous le titre de l'onglet). */}
        <p className="mt-3 text-encre-2 min-[60rem]:sr-only">{titres[i].texte}</p>
      </div>
    </div>
  );
}
