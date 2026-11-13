// Diaspora (allegement 3, Diaspora) : deux sections, puis le pied de contact.
// Ouverture avec la collaboratrice en grand ; puis les quatre étapes, avec à côté les
// trois vidéos et la ligne sur les statuts.
// Photo : capture du reel du 27 octobre 2026 (899 px de large : jamais agrandie au-delà).
// Personne n'est nommé.

import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { BoutonWhatsApp } from "@/components/bouton";
import { NumeroEtape } from "@/components/etape";
import { LienSuite, LienTexte } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Cadre } from "@/components/photo";
import { CLASSES_PANNEAU, Section } from "@/components/section";
import { ListeVideos } from "@/components/videos";
import { PROGRAMMES } from "@/content/programmes";
import { APPEL_DIASPORA, PARCOURS_DIASPORA, VIDEOS_DIASPORA } from "@/content/services";
import { MOBILE, RESEAUX } from "@/content/site";
import { typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";
import { waHref } from "@/lib/whatsapp";

export const metadata: Metadata = metaPage(
  "Diaspora",
  "Acheter un terrain au Sénégal depuis l’étranger : tout commence sur WhatsApp, avec des vidéos et des documents. Un notaire agréé accompagne chaque étape.",
);

/**
 * {whatsapp} devient un lien vers le numéro, avec le message de la diaspora ; {appel}
 * reste du texte. Un seul lien dans le bloc des étapes (allegement 2.9).
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

export default function Diaspora() {
  const youtube = RESEAUX.find((r) => r.nom === "YouTube")!;
  const a = APPEL_DIASPORA;
  return (
    <>
      <PageTete
        titre={a.titre}
        chapeau={a.chapeau}
        aside={
          // Recadrage 4:3 calé à droite : le logo incrusté en haut à gauche sort du cadre.
          // 640 px de large au plus au bureau, sous les 675 px de la zone gardée.
          <Cadre
            id={a.photo}
            preload
            position="right top"
            sizes="(min-width: 1360px) 640px, (min-width: 1240px) 50vw, 92vw"
            className="aspect-[4/3] desk:max-w-[40rem]"
          />
        }
      >
        {/* Le notaire n'est dit qu'une fois, à l'étape 3. */}
        <BoutonWhatsApp message={a.message} pleineLargeur className="mt-8 tab:mt-10">
          {a.bouton}
        </BoutonWhatsApp>
      </PageTete>

      {/* Quatre étapes à gauche. À droite, les trois vidéos sur une surface brume, puis le
          statut de chaque programme et le renvoi vers Foncier. Les deux titres commencent
          à la même hauteur. */}
      <Section serre titreId="t-etapes">
        <div className="grid gap-14 desk:grid-cols-12 desk:gap-8">
          <div className="desk:col-span-6">
            <h2 id="t-etapes" className="titre-2">
              Quatre étapes
            </h2>
            <ol className="mt-8 grid gap-7 tab:mt-10 tab:gap-8">
              {PARCOURS_DIASPORA.map((s, i) => (
                <li key={s.titre} className="flex gap-4">
                  <NumeroEtape n={i + 1} />
                  <div>
                    <h3 className="titre-3">{typo(s.titre)}</h3>
                    <p className="mt-1.5 text-encre-2">{texteEtape(s.texte, a.message)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-12 self-start desk:col-span-5 desk:col-start-8 desk:gap-10">
            <ListeVideos
              cles={VIDEOS_DIASPORA}
              titre="À regarder avant d’appeler"
              niveau={2}
              id="t-videos"
              className={CLASSES_PANNEAU}
            >
              <LienSuite href={youtube.href} className="mt-3">
                Toutes nos vidéos sur YouTube
              </LienSuite>
            </ListeVideos>

            {/* Une ligne : le statut de chaque programme, puis le renvoi vers Foncier. */}
            <div>
              <p>
                {PROGRAMMES.map((p, i) => (
                  <Fragment key={p.slug}>
                    {i > 0 ? " " : null}
                    <LienTexte href={p.href} className="whitespace-nowrap font-semibold">
                      {p.nom}
                    </LienTexte>
                    {typo(`, ${p.statut.texte.charAt(0).toLowerCase()}${p.statut.texte.slice(1)}.`)}
                  </Fragment>
                ))}
              </p>
              <LienSuite href="/foncier/" className="mt-2">
                Avant d’acheter, vérifiez avec nous
              </LienSuite>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
