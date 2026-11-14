// Comprendre le foncier (revue 2) : quatre sections, puis le pied de contact.
// 1. Ouverture, et l'interview du DG en carte vidéo (couverture écrite : la capture de
//    l'interview sert déjà sur l'accueil et À propos, deux pages au plus).
// 2. Les trois documents en cartes, du moins au plus protégé, sous leur échelle.
// 3. « Avant d'acheter, vérifiez avec nous. » : la liste, la vidéo du NICAD, et ce que
//    nous faisons, en trois lignes à icône.
// 4. L'avertissement, seule occurrence du site.
// C'est une vérification proposée, pas une garantie : jamais « nous garantissons ».

import { Handshake, MapPinArea, Stamp, WarningCircle } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import { CarteVideo } from "@/components/carte-video";
import { CarteDocument, EchelleDocuments } from "@/components/document";
import { PageTete } from "@/components/page-tete";
import { Note, Plaque, Section, TitreSection } from "@/components/section";
import { TexteFait } from "@/components/texte";
import { AVANT_D_ACHETER, AVERTISSEMENT_STATUT, CE_QUE_NOUS_FAISONS, DOCUMENTS, SOURCE_DEFINITIONS } from "@/content/foncier";
import { typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";

export const metadata: Metadata = metaPage(
  "Comprendre le foncier",
  "Délibération, bail, titre foncier : ce que chaque document vous donne, et ce que vous pouvez vérifier avec Saloum Immo avant d’acheter. Un notaire agréé accompagne chaque étape de l’achat.",
);

/** Une icône par phrase de « Ce que nous faisons », sans la première (les documents vérifiés). */
const ICONES_FAIRE = [Stamp, MapPinArea, Handshake];

export default function Foncier() {
  // Trois phrases : le notaire, la visite, le conseil (CE_QUE_NOUS_FAISONS sans sa première ligne).
  const phrases = CE_QUE_NOUS_FAISONS.lignes.slice(1);
  return (
    <>
      <PageTete
        titre="Le bon papier avant le bon prix"
        chapeau="Avant de payer, sachez quel document vous achetez. Voici ce que nous faisons, et ce que vous pouvez vérifier avec nous."
        aside={
          <CarteVideo
            cle="interviewDG"
            couverture={{ ton: "bleu" }}
            ratio="aspect-[16/9]"
            sizes="(min-width: 1240px) 600px, 92vw"
            className="tab:max-w-[36rem] tab:max-[60rem]:mx-auto desk:ml-auto"
          />
        }
      />

      {/* 2. Les trois documents. */}
      <section aria-labelledby="t-documents" className="page pb-16 tab:pb-20 desk:pb-24">
        <h2 id="t-documents" className="sr-only">
          Les trois documents
        </h2>
        <EchelleDocuments />
        {/* Trois colonnes dès 960 px, comme à l'accueil. */}
        <div className="mt-5 grid gap-4 tab:gap-5 min-[60rem]:grid-cols-3 desk:gap-6">
          {DOCUMENTS.map((d) => (
            <CarteDocument key={d.statut} doc={d} complet className="apparition" />
          ))}
        </div>
        <Note className="mt-5">{SOURCE_DEFINITIONS.texte}</Note>
      </section>

      {/* 3. Vérifier avec nous : la liste à gauche, ce que nous faisons à droite. */}
      <Section serre titreId="t-verifier">
        <Plaque className="-mx-gouttiere max-tab:rounded-none px-gouttiere py-12 tab:mx-0 tab:rounded-plaque tab:px-12 tab:py-14 desk:grid desk:grid-cols-12 desk:gap-x-10 desk:px-14 desk:py-16">
          <div className="desk:col-span-7">
            <TitreSection id="t-verifier" titre={AVANT_D_ACHETER.titre} />
            <ul className="mt-8 grid gap-3">
              {AVANT_D_ACHETER.lignes.map((l) => (
                <li key={l.texte} className="apparition flex items-start gap-3 rounded-photo bg-white p-4 tab:p-5">
                  {/* Une puce orange, pas une coche : ce sont des points à vérifier, pas des
                      points vérifiés (allegement, partie 1, point 5). */}
                  <span aria-hidden className="mt-[0.45em] size-3 flex-none rounded-bouton bg-orange ring-4 ring-orange/20" />
                  <span className="font-medium">
                    <TexteFait fait={l} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 desk:col-span-5 desk:mt-0 desk:pt-2">
            <h3 className="titre-3">{typo(CE_QUE_NOUS_FAISONS.titre)}</h3>
            <ul className="mt-5 grid gap-5">
              {phrases.map((l, i) => {
                const Icone = ICONES_FAIRE[i];
                return (
                  <li key={l.texte} className="flex items-start gap-4">
                    <span aria-hidden className="grid size-11 flex-none place-items-center rounded-bouton bg-white text-bleu">
                      <Icone size={22} weight="duotone" />
                    </span>
                    <span className="pt-2">
                      <TexteFait fait={l} />
                    </span>
                  </li>
                );
              })}
            </ul>
            <CarteVideo cle="nicad" couverture={{ ton: "encre" }} surBrume sizes="(min-width: 1240px) 480px, 92vw" className="mt-8 tab:max-w-[30rem]" />
          </div>
        </Plaque>
      </Section>

      {/* 4. L'avertissement, sur une carte à part. Seule occurrence du site. */}
      <Section serre titreId="t-avertissement">
        <h2 id="t-avertissement" className="sr-only">
          Avant de verser quoi que ce soit
        </h2>
        <div className="apparition flex max-w-[60rem] flex-col gap-5 rounded-plaque bg-white p-6 shadow-carte tab:flex-row tab:items-start tab:p-8">
          <span aria-hidden className="grid size-12 flex-none place-items-center rounded-bouton bg-orange text-encre">
            <WarningCircle size={28} weight="bold" />
          </span>
          <p className="text-h3 leading-[1.45] font-semibold">{typo(AVERTISSEMENT_STATUT)}</p>
        </div>
      </Section>
    </>
  );
}
