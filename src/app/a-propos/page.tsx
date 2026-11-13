// À propos (allegement 3, À propos) : Babacar Ndiaye, l'entreprise, les réalisations.
// Trois sections, trois formes : l'ouverture des pages intérieures (texte à gauche,
// portrait à droite), la plaque brume (l'équipe bord à bord à gauche), puis les
// réalisations : le titre et la phrase d'abord, la photo à côté, jamais en bandeau.
// Photos : capture de l'interview, 2499, 2537. Personne n'est nommé sauf Babacar Ndiaye.
//
// Millennium City : réseau de canalisation conçu et posé par Saloum Immo, jamais l'aire
// de jeux, jamais « notre programme » (lotissement commercialisé par Senegindia). La
// photo illustre la phrase, elle ne lui sert pas de titre : elle vient après le texte,
// sur une demi-largeur. La vidéo « Nos réalisations 2026 » montre tout le projet comme
// une réalisation de Saloum Immo : elle est liée depuis L'entreprise, pas d'ici.

import type { Metadata } from "next";
import { TableFaits } from "@/components/faits";
import { LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Cadre } from "@/components/photo";
import { Plaque, Section, TitreSection } from "@/components/section";
import { TexteFait } from "@/components/texte";
import { FICHE_ENTREPRISE } from "@/content/pages/a-propos";
import { MILLENNIUM_CITY } from "@/content/registre";
import { FONDATEUR } from "@/content/site";
import { VIDEOS } from "@/content/videos";
import { metaPage } from "@/lib/meta";

export const metadata: Metadata = metaPage(
  "À propos",
  "Babacar Ndiaye, fondateur et directeur général de Saloum Immo. L’entreprise, son équipe et ses réalisations.",
);

export default function APropos() {
  const interview = VIDEOS.interviewDG;
  const realisations = VIDEOS.realisations2026;
  return (
    <>
      {/* 1. Babacar Ndiaye. La capture de l'interview, recadrée en 4:3 (le logo incrusté
          sort du cadre), jamais plus large que 640 px : le fichier en fait 899. */}
      <PageTete
        titre={FONDATEUR.nom.texte}
        chapeau={`${FONDATEUR.role.texte}.`}
        aside={
          <Cadre
            id={FONDATEUR.interview.photo}
            preload
            sizes="(min-width: 1360px) 640px, (min-width: 1240px) 50vw, (min-width: 768px) 640px, 100vw"
            className="aspect-[4/3] max-w-[40rem] desk:ml-auto"
          />
        }
      >
        <p className="mt-6 tab:mt-8">
          <TexteFait fait={FONDATEUR.biographie} />
        </p>
        <LienSuite href={interview.href} className="mt-3">
          {`L’écouter expliquer le foncier, en vidéo (${interview.duree})`}
        </LienSuite>
      </PageTete>

      {/* 2. L'entreprise : la plaque brume, l'équipe sur le terrain (sans nom) bord à bord. */}
      <Section serre titreId="t-entreprise">
        <Plaque className="grid desk:grid-cols-12">
          <Cadre
            id="2499"
            rayon="aucun"
            sizes="(min-width: 1360px) 547px, (min-width: 1240px) 42vw, 100vw"
            className="aspect-[4/3] tab:aspect-[16/9] desk:col-span-5 desk:aspect-auto desk:h-full desk:min-h-[30rem]"
          />
          <div className="px-6 py-10 tab:px-12 tab:py-14 desk:col-span-7 desk:self-center desk:px-14 desk:py-16">
            <TitreSection id="t-entreprise" titre="L’entreprise" />
            <TableFaits
              className="mt-8 tab:mt-10"
              lignes={FICHE_ENTREPRISE.map((l) => ({ cle: l.libelle, valeur: <TexteFait fait={l.valeur} /> }))}
            />
            <LienSuite href={realisations.href} className="mt-6 tab:mt-8">
              {`${realisations.titre} (${realisations.duree})`}
            </LienSuite>
          </div>
        </Plaque>
      </Section>

      {/* 3. Réalisations : le titre et la phrase entière d'abord, la photo à côté (656 px au
          plus). Mobile : le texte, puis la photo. */}
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
          <Cadre
            id={MILLENNIUM_CITY.photo}
            sizes="(min-width: 1392px) 656px, (min-width: 1240px) 50vw, 100vw"
            className="aspect-[3/2] desk:col-span-6 desk:col-start-7"
          />
        </div>
      </Section>
    </>
  );
}
