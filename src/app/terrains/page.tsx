// Terrains (allegement 3, Terrains) : l'ouverture, une rangée par programme, puis
// l'offre AIBD datée à côté des deux autres sites publiés, et une ligne vers le foncier.
// Photos : 2534, 2616, 2580. Ni 2421 ni 2538 (même lotissement que 2580).
//
// Forme : une rangée par programme, la photo à gauche puis à droite, pour qu'on lise
// les programmes l'un après l'autre. L'offre AIBD n'a pas de photo publiée : elle tient
// sur un panneau brume, plus petit que les rangées, et son bouton prend le ton
// « inverse » (le bouton secondaire brume disparaîtrait sur la brume).

import type { Metadata } from "next";
import { BoutonWhatsApp } from "@/components/bouton";
import { LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Panneau } from "@/components/section";
import { Texte, TexteFait } from "@/components/texte";
import { AUTRES_SITES, PROGRAMMES, RECASEMENT_AIBD } from "@/content/programmes";
import { enLettres, typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";
import { waHref } from "@/lib/whatsapp";
import { Rangee } from "./_composants/rangee";

export const metadata: Metadata = metaPage(
  "Terrains",
  "Sakina City, Sicap Keur Massar et Lac Town : trois programmes en vente autour de Dakar, et l’offre Recasement AIBD d’avril 2025. Prix sur demande, par WhatsApp.",
);

export default function Terrains() {
  return (
    <>
      {/* 1. Ouverture. Pas d'aside : la première rangée apporte la photo du premier écran. */}
      <PageTete
        titre="Terrains disponibles"
        chapeau={`${enLettres(PROGRAMMES.length)} programmes en vente autour de Dakar, et une offre datée. Prix sur demande, par WhatsApp.`}
        serre
      />

      {/* 2. Les programmes, dans l'ordre du site : titres fonciers d'abord. */}
      <section aria-label="Les programmes" className="page grid gap-14 pb-14 tab:gap-20 tab:pb-20 desk:gap-20 desk:pb-24">
        {PROGRAMMES.map((p, i) => (
          <Rangee key={p.slug} programme={p} preload={i === 0} inverse={i % 2 === 1} />
        ))}
      </section>

      {/* 2 (fin) et 3. L'offre datée, sans photo, à côté des deux autres sites publiés.
          Puis 4, la ligne vers le foncier. */}
      <div className="page pb-18 tab:pb-24 desk:pb-32">
        <div className="grid gap-12 desk:grid-cols-12 desk:items-start desk:gap-8">
          <Panneau as="article" aria-labelledby="t-aibd" className="desk:col-span-7">
            <h2 id="t-aibd" className="titre-3">
              {RECASEMENT_AIBD.nom}
            </h2>
            <p className="mt-3">
              <TexteFait fait={RECASEMENT_AIBD.texte} />
            </p>
            <div className="mt-6 grid gap-2 tab:mt-8 tab:flex tab:flex-wrap tab:items-center tab:gap-x-8">
              <BoutonWhatsApp ton="inverse" message={RECASEMENT_AIBD.message} pleineLargeur>
                {RECASEMENT_AIBD.bouton}
              </BoutonWhatsApp>
              <LienSuite href={RECASEMENT_AIBD.href!}>Voir l’offre</LienSuite>
            </div>
          </Panneau>

          <section aria-labelledby="t-autres" className="desk:col-span-5 desk:pl-6 desk:pt-8">
            <h2 id="t-autres" className="titre-3">
              Autres sites publiés
            </h2>
            <ul className="mt-4 grid gap-5 tab:mt-5">
              {AUTRES_SITES.map((s) => (
                <li key={s.slug}>
                  <p>
                    <span className="font-semibold">{typo(`${s.nom} : `)}</span>
                    <Texte>{s.texte.texte.charAt(0).toLowerCase() + s.texte.texte.slice(1)}</Texte>
                  </p>
                  <a
                    href={waHref(typo(s.message))}
                    aria-label={`Demander sur WhatsApp, ${s.nom}`}
                    className="inline-flex min-h-11 items-center font-semibold text-bleu underline decoration-[1.5px] underline-offset-[6px] hover:decoration-2"
                  >
                    Demander
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-10 tab:mt-14 desk:mt-12">
          <LienSuite href="/foncier/">Avant de verser quoi que ce soit, voyez quels documents vérifier</LienSuite>
        </p>
      </div>
    </>
  );
}
