// Fiche d'un programme (allegement 3, fiches).
// 1. En-tête : fil, nom, chapeau, statut foncier en mots. Le statut est dit là, une
//    fois : la ligne « Statut foncier » du tableau monte en tête et quitte le tableau.
// 2. Le terrain : la grande photo sur toute la largeur, puis le tableau de faits et le
//    bouton WhatsApp à gauche.
// 3. Bas de fiche : vidéos, la ligne vers le foncier et les autres terrains, en colonne
//    courte à droite du tableau au bureau, dessous sur mobile (même ordre de lecture).

import Link from "next/link";
import { BoutonWhatsApp } from "@/components/bouton";
import { TableFaits } from "@/components/faits";
import { LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Cadre } from "@/components/photo";
import { Note, Panneau } from "@/components/section";
import { Texte, TexteFait } from "@/components/texte";
import { ListeVideos } from "@/components/videos";
import { BOUTON_PROGRAMME, PROGRAMMES, RECASEMENT_AIBD, type Programme } from "@/content/programmes";
import { typo } from "@/lib/format";
import { FIL_FICHE } from "./fil";

/**
 * Les photos du terrain. Une seule, sur toute la largeur, en général.
 * Sakina City : 2534 fait 960 px de large et 2413-droite 846 × 458. Elles partagent le
 * rang (sept et cinq colonnes), à la même hauteur : 458 px au bureau, la hauteur du
 * fichier 2413-droite, pour ne jamais l'agrandir.
 */
function PhotosTerrain({ p }: { p: Programme }) {
  if (p.photoSeconde) {
    return (
      <div className="grid gap-3 tab:grid-cols-12 tab:gap-6 desk:gap-8">
        <Cadre
          id={p.photo}
          preload
          sizes="(min-width: 1360px) 752px, (min-width: 768px) 58vw, 100vw"
          className="aspect-[4/3] tab:col-span-7 tab:aspect-[752/458]"
        />
        <Cadre
          id={p.photoSeconde}
          sizes="(min-width: 1360px) 528px, (min-width: 768px) 42vw, 100vw"
          className="aspect-[846/458] tab:col-span-5 tab:aspect-auto tab:h-full"
        />
      </div>
    );
  }
  return (
    <Cadre
      id={p.photo}
      preload
      sizes="(min-width: 1360px) 1312px, 100vw"
      className="aspect-[4/3] tab:aspect-[2/1] desk:aspect-[12/5]"
    />
  );
}

/** Les lots publiés de Sicap Keur Massar, une ligne par surface : le numéro en gras. */
function Lots({ lots }: { lots: NonNullable<Programme["lots"]> }) {
  const lignes = lots.phrase.texte.split(/(?<=\.)\s+/);
  return (
    <Panneau className="mt-8">
      <h3 className="titre-3">Lots publiés en 2026</h3>
      <ul className="mt-4 grid gap-2">
        {lignes.map((l) => {
          const [numeros, reste] = l.split(" : ");
          return (
            <li key={numeros}>
              <span className="font-semibold">{typo(numeros)}</span>
              <Texte>{` : ${reste}`}</Texte>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-encre-2">{typo(lots.avertissement)}</p>
    </Panneau>
  );
}

export function FicheProgramme({ programme: p }: { programme: Programme }) {
  const autres = [...PROGRAMMES.filter((x) => x.slug !== p.slug), RECASEMENT_AIBD];
  // « Titres fonciers individuels. Titre mère TF 15026/R. » devient « titres fonciers… »
  const ligneStatut = p.fiche.find((l) => l.cle === "Statut foncier");
  const statut = ligneStatut?.valeur.texte ?? `${p.statut.texte.replace(/^Statut foncier /, "")}.`;
  const lignes = p.fiche.filter((l) => l !== ligneStatut);
  return (
    <>
      <PageTete
        fil={FIL_FICHE}
        serre
        titre={p.nom}
        chapeau={
          <>
            <p>
              <TexteFait fait={p.chapeau} />
            </p>
            <p className="mt-3 font-semibold text-encre">
              <Texte>{`Statut foncier : ${statut.charAt(0).toLowerCase()}${statut.slice(1)}`}</Texte>
            </p>
          </>
        }
      />

      <section aria-labelledby="t-terrain" className="page pb-18 tab:pb-24 desk:pb-32">
        <h2 id="t-terrain" className="sr-only">
          Le terrain
        </h2>
        <PhotosTerrain p={p} />

        <div className="mt-10 grid gap-16 tab:mt-12 desk:mt-14 desk:grid-cols-12 desk:gap-8">
          <div className="desk:col-span-7">
            <TableFaits lignes={lignes.map((l) => ({ cle: l.cle, valeur: <TexteFait fait={l.valeur} /> }))} />
            {p.noteFiche ? <Note className="mt-5">{p.noteFiche.texte}</Note> : null}
            {p.lots ? <Lots lots={p.lots} /> : null}
            <BoutonWhatsApp message={p.message} ton="second" pleineLargeur className="mt-8 tab:mt-10">
              {BOUTON_PROGRAMME}
            </BoutonWhatsApp>
          </div>

          <div className="grid content-start gap-10 desk:col-span-4 desk:col-start-9">
            {/* h2 à la taille d'un h3 : la colonne suit le h2 caché « Le terrain ». */}
            <ListeVideos cles={p.videos} niveau={2} id="t-videos" />
            <p>
              <LienSuite href="/foncier/" className="-my-2.5">
                Avant d’acheter, vérifiez les documents avec nous
              </LienSuite>
            </p>
            <section aria-labelledby="t-autres">
              <h2 id="t-autres" className="titre-3">
                Autres terrains
              </h2>
              <ul className="mt-2 grid tab:mt-3">
                {autres.map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={x.href!}
                      className="inline-flex min-h-11 items-center font-semibold text-bleu underline decoration-[1.5px] underline-offset-[6px] hover:decoration-2"
                    >
                      {x.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
