// Aménager (allegement 3, Aménager) : quatre sections, puis le pied de contact.
// Ouverture et offre aux propriétaires, cinq étapes en photos (la sixième, le titre
// foncier, en texte), les travaux datés avec leur source, les huit services.
//
// Photos : 2493, 2502, 2529, 2355, 2516. Pas de photo d'ouverture : les étapes
// arrivent dans le premier écran.
// Aucun fait daté sous une photo d'étape (2355 jamais à côté des 58 parcelles).

import type { Metadata } from "next";
import { BoutonWhatsApp } from "@/components/bouton";
import { NumeroEtape } from "@/components/etape";
import { TravauxDates } from "@/components/faits";
import { LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Cadre } from "@/components/photo";
import { Panneau, Section, TitreSection } from "@/components/section";
import { MESSAGES } from "@/content/messages";
import { TRAVAUX_DATES } from "@/content/registre";
import { ETAPES, ETAPE_TITRE, SERVICES } from "@/content/services";
import { typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";

export const metadata: Metadata = metaPage(
  "Aménager mon terrain",
  "Saloum Immo aménage ses programmes et les terrains des propriétaires : terrassement, bornage, voies en latérite, eau avec SEN’EAU, électricité. Les étapes en photos, les travaux datés.",
);

export default function Amenager() {
  return (
    <>
      {/* 1. Ouverture : le titre, puis la question aux propriétaires sur un panneau brume. */}
      <PageTete
        titre="Aménager la terre"
        chapeau="Terrassement, voies en latérite, eau avec SEN’EAU, électricité, bornage. Sur les terrains que nous vendons, et sur ceux des propriétaires."
        aside={
          <Panneau className="tab:max-w-[30rem] desk:ml-auto">
            <h2 className="titre-3">{typo("Vous avez un terrain ou des hectares ?")}</h2>
            <BoutonWhatsApp message={MESSAGES.proprietaire.texte} pleineLargeur className="mt-5 tab:mt-6">
              Décrire mon terrain sur WhatsApp
            </BoutonWhatsApp>
          </Panneau>
        }
      />

      {/* 2. Les étapes. Le titre au-dessus de la grille. Bureau : la première étape en grand
          (deux colonnes, 4:3), la deuxième à côté en portrait (3:4, le format de 2502), puis
          les trois suivantes en 4:3 ; le titre foncier ferme la grille en une ligne.
          Mobile : une pile, toutes en 4:3. */}
      <section aria-labelledby="t-etapes" className="page pb-18 tab:pb-24 desk:pb-32">
        <h2 id="t-etapes" className="titre-2">
          {typo("Du débroussaillage au titre foncier")}
        </h2>
        <ol className="mt-8 grid gap-y-12 tab:mt-10 tab:grid-cols-2 tab:gap-x-8 tab:gap-y-14 desk:grid-cols-3">
          {ETAPES.map((e, i) => (
            <li key={e.id} id={e.id} className={i === 0 ? "tab:col-span-2" : undefined}>
              <Cadre
                id={e.photo}
                preload={i === 0}
                sizes={
                  i === 0
                    ? "(min-width: 1392px) 864px, (min-width: 1240px) 64vw, (min-width: 768px) 92vw, 100vw"
                    : "(min-width: 1392px) 416px, (min-width: 1240px) 31vw, (min-width: 768px) 46vw, 92vw"
                }
                className={
                  i === 0
                    ? "aspect-[4/3] tab:aspect-[3/2] desk:aspect-[4/3]"
                    : i === 1
                      ? "aspect-[4/3] desk:aspect-[3/4]"
                      : "aspect-[4/3]"
                }
              />
              <div className="mt-5 flex items-start gap-3">
                <NumeroEtape n={i + 1} />
                <div>
                  <h3 className="titre-3">{typo(e.titre)}</h3>
                  <p className="mt-1.5 text-encre-2">{typo(e.texte)}</p>
                </div>
              </div>
            </li>
          ))}
          {/* Sixième étape, en texte : aucune photo de titre foncier n'est publiée. */}
          <Panneau as="li" id="etape-titre" className="flex items-start gap-3 tab:col-span-full desk:items-center">
            <NumeroEtape n={ETAPES.length + 1} />
            <div className="desk:flex desk:flex-1 desk:items-center desk:gap-8">
              <h3 className="titre-3 desk:flex-none">{ETAPE_TITRE.titre}</h3>
              <p className="mt-1.5 text-encre-2 desk:mt-0 desk:flex-1">{typo(ETAPE_TITRE.texte)}</p>
              <LienSuite href="/foncier/" className="mt-2 desk:mt-0 desk:flex-none">
                Comprendre le foncier
              </LienSuite>
            </div>
          </Panneau>
        </ol>
      </section>

      {/* 3. Travaux datés : le titre dans le premier tiers, la liste aligne son début sur
          la deuxième colonne des étapes. Sources en lien, une par ligne. */}
      <Section serre id="travaux" titreId="t-travaux">
        <div className="grid gap-8 desk:grid-cols-12 desk:gap-8">
          <TitreSection id="t-travaux" titre="Travaux datés" className="desk:col-span-4" />
          <TravauxDates lignes={TRAVAUX_DATES} sources className="desk:col-span-8" />
        </div>
      </Section>

      {/* 4. Les huit services, verbatim : deux colonnes, sans numéro, sans filet, sans lien. */}
      <Section serre titreId="t-services">
        <div className="grid gap-8 desk:grid-cols-12 desk:gap-8">
          <TitreSection id="t-services" titre="Nos huit services" className="desk:col-span-4" />
          <ul className="grid gap-x-8 gap-y-4 tab:grid-cols-2 tab:gap-y-5 desk:col-span-8">
            {SERVICES.map((s) => (
              <li key={s} className="font-medium">
                {typo(s)}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
