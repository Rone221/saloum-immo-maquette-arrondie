// Diaspora (revue 2) : trois sections, puis le pied de contact.
// 1. Ouverture : le titre, le bouton, et le reel de la collaboratrice en carte vidéo
//    (capture de 897 px, cadre de 640 px au plus à toutes les largeurs, recadrée à
//    droite : le logo incrusté en haut à gauche sort du cadre). Personne n'est nommé.
// 2. Les quatre étapes, en cartes numérotées reliées par un trait au bureau.
// 3. Une plaque brume : six vidéos à regarder avant d'appeler, en carrousel ; puis le
//    statut de chaque programme, en petites cartes à icône, et le renvoi au foncier.
//
// Couvertures : 2580, 2413-droite, 2616 (photos de programme), 2499 (l'équipe, aussi sur
// À propos), et deux couvertures écrites. 2352-haut ne sert pas ici (accueil et Contact).
// Chaque photo une fois : les petites cartes des statuts ont une icône, pas de photo.

import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { BoutonWhatsApp } from "@/components/bouton";
import { CarteMini } from "@/components/carte-mini";
import { IconeStatut } from "@/components/carte-programme";
import { CarteVideo, type Couverture } from "@/components/carte-video";
import { Carrousel } from "@/components/carrousel";
import { NumeroEtape } from "@/components/etape";
import { LienSuite, LienTexte } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Plaque, Section, TitreSection } from "@/components/section";
import { PROGRAMMES } from "@/content/programmes";
import { APPEL_DIASPORA, PARCOURS_DIASPORA } from "@/content/services";
import { MOBILE, RESEAUX } from "@/content/site";
import { A_REGARDER, type CleVideo } from "@/content/videos";
import { typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";
import { waHref } from "@/lib/whatsapp";

export const metadata: Metadata = metaPage(
  "Diaspora",
  "Acheter un terrain au Sénégal depuis l’étranger : tout commence sur WhatsApp, avec des vidéos et des documents. Un notaire agréé accompagne chaque étape de l’achat.",
);

/**
 * {whatsapp} devient un lien vers le numéro, avec le message de la diaspora ; {appel}
 * reste du texte. Un seul lien dans le bloc des étapes.
 */
function texteEtape(texte: string, message: string): ReactNode {
  return texte.split(/(\{whatsapp\}|\{appel\})/).map((m, i) => {
    if (m === "{whatsapp}")
      return (
        <LienTexte key={i} href={waHref(typo(message))}>
          {`WhatsApp au ${MOBILE.long}`}
        </LienTexte>
      );
    if (m === "{appel}") return <Fragment key={i}>appelez ce numéro</Fragment>;
    return <Fragment key={i}>{typo(m)}</Fragment>;
  });
}

/**
 * Couvertures des vidéos « À regarder avant d'appeler » : photos de programme, l'équipe
 * (2499, aussi sur À propos), ou couverture écrite. Deux couvertures n’ont jamais la même photo.
 */
const COUVERTURES: Partial<Record<CleVideo, Couverture>> = {
  presentation: { ton: "bleu" },
  lancementLacTown: { photo: "2580" },
  visiteLacTown: { ton: "encre" },
  visiteSakina: { photo: "2413-droite" },
  lotsSKM: { photo: "2616" },
  realisations2026: { photo: "2499", position: "50% 15%" },
};

const PISTE =
  "-mx-gouttiere mt-6 gap-4 px-gouttiere pt-2 pb-10 scroll-px-gouttiere tab:-mx-12 tab:mt-8 tab:gap-5 tab:px-12 tab:scroll-px-12 desk:-mx-14 desk:px-14 desk:scroll-px-14";

export default function Diaspora() {
  const youtube = RESEAUX.find((r) => r.nom === "YouTube")!;
  const a = APPEL_DIASPORA;
  return (
    <>
      <PageTete
        titre={a.titre}
        chapeau={a.chapeau}
        aside={
          <CarteVideo
            cle="reelLotsSKM"
            couverture={{ photo: a.photo, position: "right top" }}
            ratio="aspect-[4/3]"
            // Capture 16:9 dans le cadre 4:3 : dessinée 4/3 plus large que lui (page-tete.tsx
            // pour les colonnes).
            sizes="(min-width: 1392px) 853px, (min-width: 1240px) 61vw, (min-width: 960px) 51vw, (min-width: 680px) 853px, 120vw"
            className="max-w-[40rem] tab:max-[60rem]:mx-auto desk:ml-auto"
          />
        }
      >
        <BoutonWhatsApp message={a.message} pleineLargeur className="mt-8 tab:mt-10">
          {a.bouton}
        </BoutonWhatsApp>
      </PageTete>

      {/* 2. Quatre étapes : des cartes numérotées ; au bureau, un trait les relie. */}
      <Section serre titreId="t-etapes">
        <TitreSection id="t-etapes" titre="Quatre étapes" chapeau="De votre premier message à la visite sur place." />
        <ol className="relative mt-10 grid gap-4 tab:mt-12 tab:grid-cols-2 tab:gap-5 desk:grid-cols-4">
          <span aria-hidden className="absolute top-10 right-[12%] left-[12%] hidden h-0.5 bg-brume-2 desk:block">
            <span className="trace-frise block h-full w-full bg-orange" />
          </span>
          {PARCOURS_DIASPORA.map((s, i) => (
            <li key={s.titre} className="apparition relative rounded-plaque bg-white p-6 shadow-carte">
              <NumeroEtape n={i + 1} />
              <h3 className="mt-5 titre-3">{typo(s.titre)}</h3>
              <p className="mt-2 text-encre-2">{texteEtape(s.texte, a.message)}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3. Les vidéos, puis le statut de chaque programme. */}
      <section aria-labelledby="t-videos" className="page pb-18 tab:pb-24 desk:pb-32">
        <Plaque className="-mx-gouttiere max-tab:rounded-none px-gouttiere py-12 tab:mx-0 tab:rounded-plaque tab:px-12 tab:py-14 desk:px-14 desk:py-16">
          <Carrousel
            etiquette="À regarder avant d’appeler"
            ton="blanc"
            entete={
              <TitreSection
                id="t-videos"
                titre="À regarder avant d’appeler"
                chapeau="Les terrains filmés au drone et en visite commentée. Chaque vidéo s’ouvre sur sa plateforme."
              />
            }
            piste={PISTE}
            diapo="w-[80%] max-w-[20rem] tab:w-[19rem] desk:w-[20.5rem]"
          >
            {A_REGARDER.map((cle) => (
              <CarteVideo key={cle} cle={cle} couverture={COUVERTURES[cle] ?? { ton: "bleu" }} surBrume sizes="20.5rem" />
            ))}
          </Carrousel>
          <LienSuite href={youtube.href} className="-mt-4">
            Toutes nos vidéos sur YouTube
          </LienSuite>

          <div className="mt-12 border-t border-encre/10 pt-10 tab:mt-14">
            <h3 className="titre-3">Le statut de chaque programme</h3>
            <ul className="mt-5 grid gap-3 tab:grid-cols-3 tab:gap-4">
              {PROGRAMMES.map((p) => (
                <li key={p.slug}>
                  {/* Vignette à icône, sur le modèle de l'offre AIBD : les photos des
                      programmes servent déjà aux couvertures des vidéos. */}
                  <CarteMini
                    href={p.href}
                    nom={p.nom}
                    ligne={`${p.statut.texte}.`}
                    surBrume
                    vignette={
                      <span className="grid size-full place-items-center bg-brume">
                        <IconeStatut programme={p} />
                      </span>
                    }
                  />
                </li>
              ))}
            </ul>
            <LienSuite href="/foncier/" className="mt-4">
              Avant d’acheter, vérifiez avec nous
            </LienSuite>
          </div>
        </Plaque>
      </section>
    </>
  );
}
