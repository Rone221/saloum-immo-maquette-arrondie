// Aménager (revue 2) : quatre sections, puis le pied de contact.
// 1. Ouverture et offre aux propriétaires (carte à droite au bureau).
// 2. La visionneuse des six étapes : onglets à gauche, photos à droite (vignettes quand
//    l'étape en a plusieurs) ; le titre foncier, sans photo, ferme la liste.
// 3. La frise des travaux datés, avec leurs sources.
// 4. Les huit services publiés, en cartes à icône.
//
// Photos de la visionneuse (content/services.ts) : 2493, 2495, 2494 ; 2502 ; 2529,
// 2542 ; 2355, 2327-haut ; 2516, 2517, 2519. Ni 2500 (même instant que 2493) ni 2505
// (même instant que 2502). Aucun fait daté à côté d'une photo d'étape.

import {
  Bulldozer,
  Certificate,
  Check,
  Compass,
  Drop,
  Handshake,
  HardHat,
  House,
  Signpost,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { Metadata } from "next";
import { BoutonWhatsApp } from "@/components/bouton";
import { Frise } from "@/components/faits";
import { LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Photo, enPaysage } from "@/components/photo";
import { Section, TitreSection } from "@/components/section";
import { VisionneuseEtapes } from "@/components/visionneuse-etapes";
import { MESSAGES } from "@/content/messages";
import { PHOTOS } from "@/content/photos";
import { TRAVAUX_DATES } from "@/content/registre";
import { ETAPES, ETAPE_TITRE, SERVICES } from "@/content/services";
import { typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";

export const metadata: Metadata = metaPage(
  "Aménager mon terrain",
  "Saloum Immo aménage les terrains qu’il vend et ceux des propriétaires : terrassement, bornage, voies en latérite, eau avec SEN’EAU, électricité. Les étapes en photos, les travaux datés.",
);

/** Une icône par service, dans l'ordre de la liste publiée (content/services.ts). */
const ICONES_SERVICES: Icon[] = [Certificate, Signpost, Bulldozer, Drop, Compass, House, HardHat, Handshake];

/** Ce que comprend l'aménagement, dans la carte des propriétaires. */
const TRAVAUX_PROPRIETAIRE = ["Terrassement", "Voies en latérite", "Eau avec SEN’EAU", "Électricité", "Bornage"];

export default function Amenager() {
  return (
    <>
      {/* 1. Ouverture : le titre, puis la carte des propriétaires. */}
      <PageTete
        titre="Aménager la terre"
        chapeau="Terrassement, voies en latérite, eau avec SEN’EAU, électricité, bornage. Sur les terrains que nous vendons, et sur ceux des propriétaires."
        aside={
          <div className="rounded-plaque bg-white p-6 shadow-carte tab:max-w-[32rem] tab:p-8 tab:max-[60rem]:mx-auto desk:ml-auto">
            <span aria-hidden className="grid size-12 place-items-center rounded-bouton bg-brume text-bleu">
              <Bulldozer size={26} weight="duotone" />
            </span>
            <h2 className="mt-5 titre-3">{typo("Vous avez un terrain ou des hectares ?")}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {TRAVAUX_PROPRIETAIRE.map((t) => (
                <li key={t} className="flex items-center gap-2 text-encre-2">
                  <Check aria-hidden size={18} weight="bold" className="flex-none text-bleu" />
                  {typo(t)}
                </li>
              ))}
            </ul>
            <BoutonWhatsApp message={MESSAGES.proprietaire.texte} className="mt-6 w-full">
              Décrire mon terrain sur WhatsApp
            </BoutonWhatsApp>
          </div>
        }
      />

      {/* 2. Les étapes, de la première pelletée au titre foncier. */}
      <section aria-labelledby="t-etapes" className="page pb-18 tab:pb-24 desk:pb-32">
        <TitreSection
          id="t-etapes"
          titre="Du débroussaillage au titre foncier"
          chapeau="Six étapes, dans l’ordre du chantier."
        />
        <div className="mt-8 tab:mt-10">
          <VisionneuseEtapes
            etapes={ETAPES.map((e) => ({
              id: e.id,
              titre: typo(e.titre),
              texte: typo(e.texte),
              photos: e.photos.map((id, q) => ({
                grande: (
                  <Photo
                    id={id}
                    fill
                    preload={e.id === ETAPES[0].id && q === 0}
                    sizes={enPaysage(id) ? "(min-width: 1392px) 850px, (min-width: 960px) 62vw, 125vw" : "(min-width: 1392px) 640px, (min-width: 960px) 46vw, 92vw"}
                    className="object-cover"
                  />
                ),
                vignette: <Photo id={id} fill decorative sizes="80px" className="object-cover" />,
                legende: typo(PHOTOS[id].legende ?? ""),
              })),
            }))}
            fin={{
              titre: ETAPE_TITRE.titre,
              texte: typo(ETAPE_TITRE.texte),
              panneau: (
                <div className="flex h-full flex-col justify-end bg-bleu p-6 text-white tab:p-10">
                  <Certificate aria-hidden size={64} weight="duotone" className="text-white/90" />
                  <p className="mt-6 titre-2">{ETAPE_TITRE.titre}</p>
                  <p className="mt-3 max-w-[30rem] text-h3 leading-[1.45] text-white/92">{typo(ETAPE_TITRE.texte)}</p>
                  <LienSuite href="/foncier/" ton="blanc" className="mt-4">
                    Comprendre le foncier
                  </LienSuite>
                </div>
              ),
            }}
          />
        </div>
      </section>

      {/* 3. Travaux datés : la frise, chaque jalon avec sa source. */}
      <Section serre id="travaux" titreId="t-travaux">
        <TitreSection id="t-travaux" titre="Travaux datés" chapeau="Quatre chantiers publiés, avec leur source." />
        <Frise lignes={TRAVAUX_DATES} sources className="mt-10 tab:mt-12 desk:mt-14" />
      </Section>

      {/* 4. Les huit services, verbatim, en cartes : une icône, le libellé. */}
      <Section serre titreId="t-services">
        <TitreSection id="t-services" titre="Nos huit services" />
        <ul className="mt-8 grid gap-3 tab:mt-10 tab:grid-cols-2 tab:gap-4 desk:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icone = ICONES_SERVICES[i];
            return (
              <li key={s} className="apparition flex flex-col gap-4 rounded-photo bg-brume p-5 tab:p-6">
                <span aria-hidden className="grid size-11 place-items-center rounded-bouton bg-white text-bleu">
                  <Icone size={22} weight="duotone" />
                </span>
                <span className="font-medium">{typo(s)}</span>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
