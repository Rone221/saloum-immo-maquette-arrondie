// Fiche d'un programme (revue 2).
// 1. En-tête : fil, nom, chapeau, puis le statut foncier et les repères en puces.
// 2. Galerie : les photos du terrain et ses vidéos, en tuiles de même hauteur ; elle
//    défile au doigt quand elle déborde (carrousel). Les largeurs tiennent les plafonds :
//    2413-droite à 600 px au plus, 2534 à 440, la capture du reel à 899.
// 3. Ce qu'il faut savoir : les faits en cartes, à gauche ; à droite au bureau, la carte
//    d'action collante (statut, prix sur demande, WhatsApp, appel, renvoi au foncier).
//    Sur mobile, la carte d'action passe avant les faits.
// 4. Autres terrains : petites cartes.

import {
  Bulldozer,
  CalendarBlank,
  Drop,
  House,
  Info,
  Lightning,
  Ruler,
  SquaresFour,
  Tag,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { BoutonAppel, BoutonWhatsApp } from "@/components/bouton";
import { BadgeStatut } from "@/components/carte-programme";
import { CarteMini } from "@/components/carte-mini";
import { CarteVideo, type Couverture } from "@/components/carte-video";
import { Carrousel } from "@/components/carrousel";
import { LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Photo } from "@/components/photo";
import { Note } from "@/components/section";
import { Puce } from "@/components/puce";
import { Texte, TexteFait } from "@/components/texte";
import type { PhotoId } from "@/content/photos";
import {
  BOUTON_PROGRAMME,
  PRIX_A_DEMANDER,
  PROGRAMMES,
  RECASEMENT_AIBD,
  type Programme,
  type ProgrammeSlug,
} from "@/content/programmes";
import type { CleVideo } from "@/content/videos";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";
import { FIL_FICHE } from "./fil";

type Tuile =
  | { sorte: "photo"; id: PhotoId; ratio: string }
  | {
      sorte: "video";
      cle: CleVideo;
      couverture: Couverture;
      /** Titre court, quand le titre de la vidéo couvrirait la tuile sur mobile. */
      titre?: string;
      /** Largeur dessinée de la couverture photo, recadrée dans la tuile. */
      sizes?: string;
    };

/** sizes d'une tuile vidéo à couverture écrite (pas d'image) : la valeur par défaut. */
const SIZES_TUILE = "(min-width: 768px) 340px, 50vw";

/**
 * Galeries. Hauteur des tuiles par largeur d'écran, et proportions de chaque photo.
 * Sur mobile, les photos passent en 4:3 (une tuile tient dans l'écran).
 * - Sakina City : 2413-droite à 20,25 rem de haut fait 599 px de large au bureau (600
 *   au plus) ; 2534 en 4:3 fait 432 px (440 au plus).
 * - Sicap Keur Massar : la capture du reel en couverture (897 px de large, dessinée à
 *   737 px au plus, 567 en tablette, 425 sur mobile) ; son logo incrusté, en haut à
 *   gauche, sort du cadre. Titre court : le titre entier tenait sur cinq lignes et
 *   cachait le visage sur mobile.
 * Les tuiles tiennent sur une ligne de 1 312 px ; en dessous, la galerie défile.
 */
const GALERIES: Record<ProgrammeSlug, { hauteur: string; tuiles: Tuile[] }> = {
  "sakina-city": {
    hauteur: "h-[14rem] tab:h-[17.5rem] desk:h-[20.25rem]",
    tuiles: [
      { sorte: "photo", id: "2413-droite", ratio: "aspect-[4/3] tab:aspect-[846/458]" },
      { sorte: "photo", id: "2534", ratio: "aspect-[4/3]" },
      { sorte: "video", cle: "visiteSakina", couverture: { ton: "bleu" } },
    ],
  },
  "sicap-keur-massar": {
    hauteur: "h-[15rem] tab:h-[20rem] desk:h-[26rem]",
    tuiles: [
      { sorte: "photo", id: "2616", ratio: "aspect-[4/3] tab:aspect-[2000/1264]" },
      {
        sorte: "video",
        cle: "reelLotsSKM",
        couverture: { photo: "ig-DfAoxMkAbKR" },
        titre: "Un lot présenté sur place",
        sizes: "(min-width: 1240px) 760px, (min-width: 768px) 580px, 430px",
      },
      { sorte: "video", cle: "lotsSKM", couverture: { ton: "encre" } },
    ],
  },
  "lac-town": {
    hauteur: "h-[15rem] tab:h-[20rem] desk:h-[24rem]",
    tuiles: [
      { sorte: "photo", id: "2580", ratio: "aspect-[4/3] tab:aspect-[2000/1117]" },
      { sorte: "video", cle: "visiteLacTown", couverture: { ton: "encre" } },
      { sorte: "video", cle: "lancementLacTown", couverture: { ton: "bleu" } },
    ],
  },
};

const ICONES: Record<string, Icon> = {
  Parcelles: SquaresFour,
  Surfaces: Ruler,
  "Déjà fait": Bulldozer,
  Réseaux: Drop,
  Quartier: House,
  Calendrier: CalendarBlank,
  Équipements: Lightning,
  Prix: Tag,
};

/**
 * Galerie d'une fiche : un carrousel sans en-tête. Sa rangée de boutons est rendue dès
 * le serveur (les tuiles ne sautent pas à l'hydratation), au-dessus de la piste, et
 * masquée à partir de 1 392 px, où aucune galerie ne déborde.
 */
function Galerie({ p }: { p: Programme }) {
  const g = GALERIES[p.slug];
  return (
    <Carrousel
      etiquette={`${p.nom}, photos et vidéos`}
      piste="-mx-gouttiere mt-4 gap-3 px-gouttiere pt-1 pb-6 scroll-px-gouttiere tab:gap-4"
      diapo={g.hauteur}
      rangee="min-[87rem]:hidden"
    >
      {g.tuiles.map((t, i) =>
        t.sorte === "photo" ? (
          <div key={t.id} className={cx("relative h-full overflow-hidden rounded-photo bg-brume", t.ratio)}>
            <Photo
              id={t.id}
              fill
              preload={i === 0}
              sizes="(min-width: 1240px) 700px, (min-width: 768px) 560px, 80vw"
              className="object-cover"
            />
          </div>
        ) : (
          <CarteVideo
            key={t.cle}
            cle={t.cle}
            couverture={t.couverture}
            titre={t.titre}
            format="tuile"
            sizes={t.sizes ?? SIZES_TUILE}
            className="aspect-[4/5] desk:aspect-[3/4]"
          />
        ),
      )}
    </Carrousel>
  );
}

/** Les lots publiés de Sicap Keur Massar : une ligne par surface, la surface en gras. */
function Lots({ lots }: { lots: NonNullable<Programme["lots"]> }) {
  const lignes = lots.phrase.texte.split(/(?<=\.)\s+/);
  return (
    <section aria-labelledby="t-lots" className="mt-6 rounded-photo border-2 border-dashed border-encre/20 p-5 tab:p-7">
      <h3 id="t-lots" className="titre-3">
        Lots publiés en 2026
      </h3>
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
      <p className="mt-4 font-medium">{typo(lots.avertissement)}</p>
    </section>
  );
}

export function FicheProgramme({ programme: p }: { programme: Programme }) {
  const autres = PROGRAMMES.filter((x) => x.slug !== p.slug);
  // Le statut est dans l'en-tête, le prix dans la carte d'action : les autres lignes
  // deviennent des cartes de faits.
  const lignes = p.fiche.filter((l) => l.cle !== "Statut foncier" && l.cle !== "Prix");
  const ligneStatut = p.fiche.find((l) => l.cle === "Statut foncier");
  return (
    <>
      <PageTete fil={FIL_FICHE} serre titre={p.nom} chapeau={<TexteFait fait={p.chapeau} />}>
        <ul aria-label="Statut et repères" className="mt-6 flex flex-wrap gap-2 tab:mt-8">
          <li>
            <BadgeStatut programme={p} surPhoto={false} />
          </li>
          {p.reperes.map((r) => (
            <li key={r.texte}>
              <Puce>{r.texte}</Puce>
            </li>
          ))}
        </ul>
      </PageTete>

      <section aria-label="Photos et vidéos" className="page pb-8 tab:pb-10">
        <Galerie p={p} />
      </section>

      <section aria-labelledby="t-savoir" className="page pb-18 tab:pb-24 desk:pb-28">
        <div className="grid gap-12 desk:grid-cols-12 desk:items-start desk:gap-8">
          {/* Carte d'action : collante au bureau, avant les faits sur mobile. */}
          <aside
            aria-label="Prix et contact"
            className="order-first desk:sticky desk:top-[calc(var(--spacing-entete)+1.5rem)] desk:order-none desk:col-span-5 desk:col-start-8 desk:row-start-1"
          >
            <div className="rounded-plaque bg-white p-6 shadow-carte tab:p-8">
              <p className="text-note font-medium text-encre-2">Statut foncier</p>
              <p className="mt-0.5 font-semibold">
                {ligneStatut ? <TexteFait fait={ligneStatut.valeur} /> : typo(`${p.statut.texte}.`)}
              </p>
              <p className="mt-5 border-t border-filet pt-5 text-note font-medium text-encre-2">Prix</p>
              <p className="titre-2">Sur demande</p>
              <p className="mt-2 text-encre-2">
                <TexteFait fait={PRIX_A_DEMANDER} />
              </p>
              <div className="mt-6 grid gap-3">
                <BoutonWhatsApp message={p.message} className="w-full">
                  {BOUTON_PROGRAMME}
                </BoutonWhatsApp>
                <BoutonAppel ton="second" className="w-full" />
              </div>
              <p className="mt-6 border-t border-filet pt-4">
                <LienSuite href="/foncier/">Avant d’acheter, vérifiez les documents avec nous</LienSuite>
              </p>
            </div>
          </aside>

          <div className="desk:col-span-7 desk:row-start-1">
            <h2 id="t-savoir" className="titre-2">
              {typo("Ce qu’il faut savoir")}
            </h2>
            <ul className="mt-6 grid gap-3 tab:mt-8 tab:grid-cols-2 tab:gap-4">
              {lignes.map((l) => {
                const Icone = ICONES[l.cle] ?? Info;
                return (
                  <li key={l.cle} className="apparition flex items-start gap-4 rounded-photo bg-brume p-5">
                    <span aria-hidden className="grid size-11 flex-none place-items-center rounded-bouton bg-white text-bleu">
                      <Icone size={22} weight="duotone" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-note font-medium text-encre-2">{typo(l.cle)}</span>
                      <span className="mt-0.5 block font-medium">
                        <TexteFait fait={l.valeur} />
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
            {p.noteFiche ? <Note className="mt-4">{p.noteFiche.texte}</Note> : null}
            {p.lots ? <Lots lots={p.lots} /> : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="t-autres" className="page pb-18 tab:pb-24 desk:pb-28">
        <h2 id="t-autres" className="titre-3">
          Autres terrains
        </h2>
        <ul className="mt-5 grid gap-3 tab:grid-cols-2 desk:grid-cols-3 desk:gap-4">
          {autres.map((x) => (
            <li key={x.slug}>
              <CarteMini
                href={x.href}
                nom={x.nom}
                ligne={`${x.statut.texte}.`}
                vignette={<Photo id={x.photo} fill decorative sizes="96px" className="object-cover" />}
              />
            </li>
          ))}
          <li>
            <CarteMini
              href={RECASEMENT_AIBD.href!}
              nom={RECASEMENT_AIBD.nom}
              ligne={RECASEMENT_AIBD.ticket.date}
              vignette={
                <span className="grid size-full place-items-center bg-brume text-bleu">
                  <CalendarBlank aria-hidden size={28} weight="duotone" />
                </span>
              }
            />
          </li>
        </ul>
      </section>
    </>
  );
}
