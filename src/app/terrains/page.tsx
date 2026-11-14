// Terrains (revue 2) : l'ouverture, les trois programmes en cartes, l'offre AIBD datée
// et les deux autres sites publiés, puis une ligne vers le foncier (allegement, Terrains
// point 4). Pas de tableau comparatif : les cartes disent déjà le lieu et les repères.
// Photos : 2534, 2616, 2580 (photos de programme). Ni 2421 ni 2538 (même lotissement
// que 2580).
//
// Cartes : 420 px au plus sous 1 240 px (2534 reste sous 440 px). Une colonne centrée
// sur mobile, deux en tablette dans 54 rem (la troisième, seule sur sa ligne, passe en
// largeur : photo à gauche), trois au bureau (421 px au plus). 2534 ne grossit pas au
// survol (carte-programme.tsx).

import { ArrowRight, MapPinArea, WhatsappLogo } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import { CarteProgramme } from "@/components/carte-programme";
import { LienSuite } from "@/components/lien";
import { TicketOffre } from "@/components/offre";
import { PageTete } from "@/components/page-tete";
import { TexteFait } from "@/components/texte";
import { AUTRES_SITES, PROGRAMMES } from "@/content/programmes";
import { cx } from "@/lib/base";
import { enLettres, typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";
import { waHref } from "@/lib/whatsapp";

export const metadata: Metadata = metaPage(
  "Terrains",
  "Sakina City, Sicap Keur Massar et Lac Town : trois programmes en vente autour de Dakar, et l’offre Recasement AIBD d’avril 2025. Prix sur demande, par WhatsApp.",
);

export default function Terrains() {
  return (
    <>
      <PageTete
        titre="Terrains disponibles"
        chapeau={`${enLettres(PROGRAMMES.length)} programmes en vente autour de Dakar, et une offre datée. Prix sur demande, par WhatsApp.`}
        serre
      />

      {/* Les programmes, dans l'ordre du site : titres fonciers d'abord. */}
      <section aria-label="Les programmes" className="page pb-14 tab:pb-18 desk:pb-20">
        {/* Sous 1 240 px, la grille tient dans 26,25 rem (une colonne) puis 54 rem (deux) :
            la carte de Sakina City (2534) fait 420 px au plus. */}
        <ul className="mx-auto grid max-w-[26.25rem] gap-6 tab:max-w-[54rem] tab:grid-cols-2 desk:mx-0 desk:max-w-none desk:grid-cols-3">
          {PROGRAMMES.map((p, i) => (
            <li key={p.slug} className={cx("flex", i === 2 && "tab:col-span-2 desk:col-span-1")}>
              <CarteProgramme
                programme={p}
                niveau={2}
                preload={i === 0}
                largeTab={i === 2}
                sizes="(min-width: 1392px) 421px, (min-width: 1240px) 31vw, 420px"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* L'offre datée à gauche, les deux autres sites publiés à droite. */}
      <section aria-label="Offre datée et autres sites" className="page pb-18 tab:pb-24 desk:pb-28">
        <div className="grid gap-6 desk:grid-cols-12 desk:gap-8">
          <TicketOffre niveau={2} className="apparition desk:col-span-7 desk:self-start" />
          <section aria-labelledby="t-autres" className="apparition desk:col-span-5">
            <h2 id="t-autres" className="titre-3">
              Autres sites publiés
            </h2>
            <ul className="mt-4 grid gap-3">
              {AUTRES_SITES.map((s) => (
                <li key={s.slug}>
                  <a
                    href={waHref(typo(s.message))}
                    aria-label={`${s.nom} : demander sur WhatsApp`}
                    className="group flex items-start gap-4 rounded-photo bg-brume p-4 pr-5 transition-carte hover:-translate-y-0.5 hover:bg-brume-2 tab:p-5"
                  >
                    <span aria-hidden className="grid size-11 flex-none place-items-center rounded-bouton bg-white text-bleu">
                      <MapPinArea size={22} weight="duotone" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{typo(s.nom)}</span>
                      <span className="mt-0.5 block text-encre-2">
                        <TexteFait fait={s.texte} />
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1.5 font-semibold text-bleu">
                        <WhatsappLogo aria-hidden size={18} />
                        Demander
                        <ArrowRight aria-hidden size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-10 tab:mt-14 desk:mt-12">
          <LienSuite href="/foncier/">Avant de verser quoi que ce soit, voyez quels documents vérifier</LienSuite>
        </p>
      </section>
    </>
  );
}
