// À propos (revue 2) : Babacar Ndiaye, l'entreprise, les réalisations.
// 1. Ouverture : le nom, le rôle, le parcours résumé ; l'interview en carte vidéo
//    (capture recadrée en 4:3, le logo incrusté sort du cadre ; 640 px au plus à toutes
//    les largeurs, sinon la capture serait agrandie au-delà de son fichier).
// 2. L'entreprise : la plaque brume, l'équipe bord à bord, la fiche, la vidéo des
//    réalisations 2026 en carte (couverture écrite : 2499 est déjà dans la plaque).
// 3. Réalisations : la phrase entière d'abord, la photo en carte à côté.
// Photos : capture de l'interview, 2499, 2537. Personne n'est nommé sauf Babacar Ndiaye.
//
// Millennium City : réseau de canalisation conçu et posé par Saloum Immo, jamais l'aire
// de jeux, jamais « notre programme » (lotissement commercialisé par Senegindia). La
// vidéo « Nos réalisations 2026 » est liée depuis L'entreprise, pas depuis Réalisations.

import type { Metadata } from "next";
import { CarteVideo } from "@/components/carte-video";
import { TableFaits } from "@/components/faits";
import { LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Cadre, Legende } from "@/components/photo";
import { Plaque, Section, TitreSection } from "@/components/section";
import { TexteFait } from "@/components/texte";
import { FICHE_ENTREPRISE } from "@/content/pages/a-propos";
import { PHOTOS } from "@/content/photos";
import { MILLENNIUM_CITY } from "@/content/registre";
import { FONDATEUR } from "@/content/site";
import { metaPage } from "@/lib/meta";

export const metadata: Metadata = metaPage(
  "À propos",
  "Babacar Ndiaye, fondateur et directeur général de Saloum Immo. L’entreprise, son équipe et ses réalisations.",
);

export default function APropos() {
  return (
    <>
      <PageTete
        titre={FONDATEUR.nom.texte}
        chapeau={`${FONDATEUR.role.texte}.`}
        aside={
          <CarteVideo
            cle="interviewDG"
            couverture={{ photo: FONDATEUR.interview.photo, position: "74% 40%" }}
            ratio="aspect-[4/3]"
            titre="L’écouter expliquer le foncier"
            // Capture 16:9 dans le cadre 4:3 : dessinée 4/3 plus large que lui (page-tete.tsx
            // pour les colonnes).
            sizes="(min-width: 1392px) 853px, (min-width: 1240px) 61vw, (min-width: 960px) 51vw, (min-width: 680px) 853px, 120vw"
            className="max-w-[40rem] tab:max-[60rem]:mx-auto desk:ml-auto"
          />
        }
      >
        <p className="mt-6 tab:mt-8">
          <TexteFait fait={FONDATEUR.biographie} />
        </p>
      </PageTete>

      {/* 2. L'entreprise. */}
      <Section serre titreId="t-entreprise">
        <Plaque className="grid min-[60rem]:grid-cols-12">
          <Cadre
            id="2499"
            rayon="aucun"
            sizes="(min-width: 1360px) 547px, (min-width: 960px) 42vw, 100vw"
            className="aspect-[4/3] tab:aspect-[16/9] min-[60rem]:col-span-5 min-[60rem]:aspect-auto min-[60rem]:h-full min-[60rem]:min-h-[34rem]"
          />
          <div className="px-6 py-10 tab:px-12 tab:py-14 min-[60rem]:col-span-7 min-[60rem]:self-center desk:px-14 desk:py-16">
            <TitreSection id="t-entreprise" titre="L’entreprise" />
            <TableFaits
              className="mt-8 tab:mt-10"
              lignes={FICHE_ENTREPRISE.map((l) => ({ cle: l.libelle, valeur: <TexteFait fait={l.valeur} /> }))}
            />
            <CarteVideo
              cle="realisations2026"
              couverture={{ ton: "bleu" }}
              surBrume
              ratio="aspect-[21/9]"
              sizes="(min-width: 1240px) 560px, 92vw"
              className="mt-8 tab:mt-10 tab:max-w-[34rem]"
            />
          </div>
        </Plaque>
      </Section>

      {/* 3. Réalisations : le titre et la phrase entière d'abord, la photo à côté. */}
      <Section serre titreId="t-realisations">
        <div className="grid gap-8 desk:grid-cols-12 desk:items-center desk:gap-8">
          <div className="desk:col-span-5">
            <TitreSection id="t-realisations" titre="Réalisations" />
            <p className="mt-5 tab:mt-6">
              <TexteFait fait={MILLENNIUM_CITY.texte} />
            </p>
            <LienSuite href="/amenager/#travaux" className="mt-2">
              Nos travaux datés
            </LienSuite>
          </div>
          <figure className="apparition desk:col-span-6 desk:col-start-7">
            <Cadre
              id={MILLENNIUM_CITY.photo}
              sizes="(min-width: 1392px) 656px, (min-width: 1240px) 50vw, 100vw"
              className="aspect-[3/2] shadow-carte"
            />
            {/* La scène, sans lieu : la phrase à côté nomme déjà Millennium City. */}
            <Legende>{PHOTOS[MILLENNIUM_CITY.photo].legende ?? ""}</Legende>
          </figure>
        </div>
      </Section>
    </>
  );
}
