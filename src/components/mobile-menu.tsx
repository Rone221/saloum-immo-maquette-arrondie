"use client";

import { List, Phone, WhatsappLogo, X } from "@phosphor-icons/react/ssr";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
// coordonnees.ts et pas site.ts : ce composant part au navigateur, les sources et
// les statuts des faits restent côté serveur.
import { NAVIGATION, NUMERO_MOBILE as MOBILE } from "@/content/coordonnees";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";
import { waHref } from "@/lib/whatsapp";
import { ariaCourant, etatRubrique, useChemin } from "./nav-links";

const BUREAU = "(min-width: 1240px)";
const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Menu sous 1 240 px : panneau blanc sous l'en-tête, les six rubriques en grand,
 * puis WhatsApp et Appeler. Le panneau glisse de 12 px et s'éclaire (motion) ;
 * rien ne bouge si l'utilisateur a demandé moins d'animations.
 * Ouvert : la page derrière ne défile plus, `main` et le pied sont inertes, le focus
 * reste entre le bouton et le panneau. Fermeture sur un lien, sur Échap, au passage
 * au-delà de 1 240 px, au changement de page.
 */
export function MobileMenu() {
  const [ouvert, setOuvert] = useState(false);
  const bouton = useRef<HTMLButtonElement>(null);
  const panneau = useRef<HTMLElement>(null);
  const chemin = useChemin();
  const calme = useReducedMotion();

  const fermer = useCallback((rendreFocus: boolean) => {
    setOuvert(false);
    if (rendreFocus) bouton.current?.focus();
  }, []);

  // Défilement bloqué, page derrière inerte, focus dans le panneau.
  useEffect(() => {
    const html = document.documentElement;
    const derriere = [document.getElementById("contenu"), document.getElementById("pied")].filter(
      (el): el is HTMLElement => el !== null,
    );
    html.classList.toggle("menu-ouvert", ouvert);
    derriere.forEach((el) => (el.inert = ouvert));
    // Focus sur le premier lien, une fois le panneau monté.
    const image = ouvert
      ? requestAnimationFrame(() => panneau.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }))
      : 0;
    return () => {
      cancelAnimationFrame(image);
      html.classList.remove("menu-ouvert");
      derriere.forEach((el) => (el.inert = false));
    };
  }, [ouvert]);

  // Échap, et fermeture au passage en navigation de bureau.
  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") fermer(true);
    };
    const mq = window.matchMedia(BUREAU);
    const largeur = (e: MediaQueryListEvent) => {
      if (e.matches) fermer(false);
    };
    document.addEventListener("keydown", touche);
    mq.addEventListener("change", largeur);
    return () => {
      document.removeEventListener("keydown", touche);
      mq.removeEventListener("change", largeur);
    };
  }, [ouvert, fermer]);

  // Changement de page : on referme (le lien cliqué ferme déjà, ceci couvre le retour arrière).
  const cheminOuvert = useRef(chemin);
  useEffect(() => {
    if (cheminOuvert.current !== chemin) {
      cheminOuvert.current = chemin;
      setOuvert(false);
    }
  }, [chemin]);

  // Focus piégé : Tab tourne entre le bouton et les liens du panneau.
  const pieger = (e: KeyboardEvent) => {
    if (!ouvert || e.key !== "Tab" || !panneau.current || !bouton.current) return;
    const liens = Array.from(panneau.current.querySelectorAll<HTMLElement>("a[href]"));
    const cycle = [bouton.current, ...liens];
    const i = cycle.indexOf(document.activeElement as HTMLElement);
    const suivant = e.shiftKey ? (i <= 0 ? cycle.length - 1 : i - 1) : i === cycle.length - 1 ? 0 : i + 1;
    e.preventDefault();
    cycle[suivant].focus();
  };

  return (
    <div className="desk:hidden" onKeyDown={pieger}>
      <button
        ref={bouton}
        type="button"
        aria-expanded={ouvert}
        aria-controls="menu"
        aria-label={ouvert ? "Fermer le menu" : "Menu"}
        onClick={() => setOuvert((o) => !o)}
        className={cx(
          "inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-bouton px-2.5 font-semibold transition-surface tab:h-12 tab:px-4",
          ouvert ? "bg-encre text-white" : "bg-brume text-encre hover:bg-brume-2",
        )}
      >
        {ouvert ? <X aria-hidden size={22} weight="bold" /> : <List aria-hidden size={22} weight="bold" />}
        <span className="hidden tab:inline">{ouvert ? "Fermer" : "Menu"}</span>
      </button>

      <AnimatePresence>
        {ouvert ? (
          <motion.nav
            key="menu"
            id="menu"
            ref={panneau}
            aria-label="Menu"
            initial={calme ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={calme ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed inset-x-0 top-entete bottom-0 z-40 flex flex-col overflow-y-auto bg-white px-gouttiere pt-4 pb-8"
          >
            <ul className="flex flex-col">
              {NAVIGATION.map((r, i) => {
                const etat = etatRubrique(chemin, r);
                return (
                  <motion.li
                    key={r.href}
                    initial={calme ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: calme ? 0 : 0.04 * i + 0.06, ease: EASE }}
                  >
                    <Link
                      href={r.href}
                      onClick={() => fermer(false)}
                      aria-current={ariaCourant(etat)}
                      className={cx(
                        "flex min-h-15 items-center titre-2 decoration-[3px] underline-offset-[10px]",
                        etat && "underline decoration-orange",
                      )}
                    >
                      {r.libelle}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-auto grid gap-3 pt-8">
              <a
                href={waHref()}
                onClick={() => fermer(false)}
                className="flex min-h-16 items-center gap-3 rounded-bouton bg-bleu px-5 py-3 text-white transition-surface hover:bg-bleu-fonce"
              >
                <WhatsappLogo aria-hidden size={26} />
                <span className="flex flex-col">
                  <span className="font-semibold leading-serre">Écrire sur WhatsApp</span>
                  <span className="mt-0.5 text-note text-white/88">{typo(MOBILE.long)}</span>
                </span>
              </a>
              <a
                href={MOBILE.href}
                className="flex min-h-13 items-center gap-3 rounded-bouton bg-brume px-5 font-semibold text-bleu transition-surface hover:bg-brume-2"
              >
                <Phone aria-hidden size={22} />
                Appeler
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
