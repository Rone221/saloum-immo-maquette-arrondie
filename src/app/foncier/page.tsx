// Comprendre le foncier (allegement 3, Foncier) : quatre sections, puis le pied de contact.
// Ouverture avec la vidéo du DG en lien, les trois documents, la liste « Avant d'acheter,
// vérifiez avec nous », l'avertissement (seule occurrence du site).
// Page typographique, sans photo de terrain. C'est une vérification proposée, pas une
// garantie : jamais « nous garantissons ».

import type { Metadata } from "next";
import { LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Note, Plaque, Section, TitreSection } from "@/components/section";
import { TexteFait } from "@/components/texte";
import { AVANT_D_ACHETER, AVERTISSEMENT_STATUT, CE_QUE_NOUS_FAISONS, DOCUMENTS, SOURCE_DEFINITIONS } from "@/content/foncier";
import { VIDEOS } from "@/content/videos";
import { typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";

export const metadata: Metadata = metaPage(
  "Comprendre le foncier",
  "Délibération, bail, titre foncier : ce que chaque document vous donne, et ce que vous pouvez vérifier avec Saloum Immo avant d’acheter. Un notaire agréé accompagne chaque étape.",
);

/** « Moyen à élevé » devient « moyen à élevé », dans « Niveau de sécurité : moyen à élevé. » */
function enMinuscule(texte: string) {
  return texte.charAt(0).toLowerCase() + texte.slice(1);
}

export default function Foncier() {
  const dg = VIDEOS.interviewDG;
  const nicad = VIDEOS.nicad;
  // Trois phrases : le notaire, la visite, le conseil (CE_QUE_NOUS_FAISONS sans sa première ligne).
  const phrases = CE_QUE_NOUS_FAISONS.lignes.slice(1);
  return (
    <>
      <PageTete
        titre="Le bon papier avant le bon prix"
        chapeau="Avant de payer, sachez quel document vous achetez. Voici ce que nous faisons, et ce que vous pouvez vérifier avec nous."
      >
        <LienSuite href={dg.href} className="mt-5 tab:mt-6">
          {`Babacar Ndiaye explique les trois documents, en vidéo (${dg.duree})`}
        </LienSuite>
      </PageTete>

      {/* Les trois documents, du moins sûr au plus sûr. Bureau : trois colonnes dont les
          lignes s'alignent (sous-grille) ; mobile : trois blocs empilés. Pas de cadre.
          Les noms en h3 (22 px) : le niveau de sécurité, à la même taille, reste le repère. */}
      <section aria-labelledby="t-documents" className="page pb-16 tab:pb-20 desk:pb-24">
        <h2 id="t-documents" className="sr-only">
          Les trois documents
        </h2>
        <div className="grid gap-y-10 tab:gap-y-14 desk:grid-cols-3 desk:gap-x-10 desk:gap-y-0">
          {DOCUMENTS.map((d) => (
            <article key={d.statut} aria-labelledby={`t-${d.statut}`} className="desk:row-span-5 desk:grid desk:grid-rows-subgrid">
              <h3 id={`t-${d.statut}`} className="titre-3">
                {d.nom}
              </h3>
              <p className="mt-1 text-h3 leading-[1.35]">
                <span className="text-encre-2">{typo("Niveau de sécurité : ")}</span>
                <span className="font-semibold">{typo(`${enMinuscule(d.niveau.texte)}.`)}</span>
              </p>
              <p className="mt-4 tab:mt-6">
                <TexteFait fait={d.definition} />
              </p>
              <p className="mt-2 text-encre-2">
                <TexteFait fait={d.aSavoir} />
              </p>
              <p className="mt-4 tab:mt-6">
                <span className="block text-note font-medium text-encre-2">Chez Saloum Immo</span>
                <span className="mt-0.5 block font-medium">
                  <TexteFait fait={d.chezNous} />
                </span>
              </p>
            </article>
          ))}
        </div>
        <Note className="mt-8 tab:mt-12">{SOURCE_DEFINITIONS.texte}</Note>
      </section>

      {/* La seule plaque de la page. Bureau : le titre en haut à gauche, les trois phrases
          en bas à gauche, la liste à droite. Mobile : titre, liste, vidéo, phrases. */}
      <Section serre titreId="t-verifier">
        <Plaque className="px-6 py-10 tab:px-12 tab:py-14 desk:grid desk:grid-cols-12 desk:grid-rows-[auto_1fr] desk:gap-x-8 desk:px-14 desk:py-16">
          <TitreSection id="t-verifier" titre={AVANT_D_ACHETER.titre} className="desk:col-span-5 desk:row-start-1" />
          <div className="mt-6 tab:mt-8 desk:col-[7/span_6] desk:row-[1/span_2] desk:mt-1">
            <ul className="grid list-disc gap-2.5 pl-5 marker:text-encre-2">
              {AVANT_D_ACHETER.lignes.map((l) => (
                <li key={l.texte} className="pl-1">
                  <TexteFait fait={l} />
                </li>
              ))}
            </ul>
            <LienSuite href={nicad.href} className="mt-3 tab:mt-4">
              {`${nicad.titre} (${nicad.duree})`}
            </LienSuite>
          </div>
          <p className="mt-6 font-medium tab:mt-8 desk:col-span-5 desk:col-start-1 desk:row-start-2 desk:mt-8 desk:self-end">
            {phrases.map((l, i) => (
              <span key={l.texte}>
                {i > 0 ? " " : null}
                <TexteFait fait={l} />
              </span>
            ))}
          </p>
        </Plaque>

        {/* L'avertissement, en gras, sans barre ni cadre. Seule occurrence du site. */}
        <p className="mt-12 max-w-[52rem] text-h3 leading-[1.45] font-semibold tab:mt-16">{typo(AVERTISSEMENT_STATUT)}</p>
      </Section>

    </>
  );
}
