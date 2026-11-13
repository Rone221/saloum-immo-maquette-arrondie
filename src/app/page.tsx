// Accueil (allegement 3, Accueil) : cinq sections, puis le pied de contact.
// Ouverture, terrains disponibles, aménager la terre, le bon papier, Babacar Ndiaye.
// Photos : 2542, 2534, 2616, 2580, 2493, capture de l'interview. Une seule du groupe
// 2538 / 2553 / 2580 / 2421 (même lotissement) : 2580, sur la carte Lac Town.
// Aucun lien sortant hors WhatsApp et téléphone.
//
// Composition propre à cette direction : une grande plaque photo en ouverture avec
// le texte sur un panneau blanc posé dessus, la mosaïque des terrains, la plaque
// Aménager avec la photo à droite, le foncier en deux colonnes (titre à gauche,
// tableau à droite), puis le fondateur, texte à gauche et portrait à droite.

import { Bouton, BoutonWhatsApp } from "@/components/bouton";
import { CarteProgramme } from "@/components/carte-programme";
import { TravauxDates } from "@/components/faits";
import { LienSuite, LienTexte } from "@/components/lien";
import { Cadre } from "@/components/photo";
import { Note, Panneau, Plaque, Section, TitreSection } from "@/components/section";
import { TexteFait } from "@/components/texte";
import { DOCUMENTS } from "@/content/foncier";
import { MESSAGES } from "@/content/messages";
import { LAC_TOWN, PROGRAMMES, RECASEMENT_AIBD, SAKINA_CITY, SICAP_KEUR_MASSAR } from "@/content/programmes";
import { TRAVAUX_DATES } from "@/content/registre";
import { enLettres, typo } from "@/lib/format";

export default function Accueil() {
  return (
    <>
      {/* 1. Ouverture : la latérite livrée sur une voie tracée, en grande plaque (2542 fait
          2 000 px de large). Le texte tient sur un panneau blanc posé sur le bas de la
          photo. Mobile : la photo bord à bord, le panneau remonte dessus comme une feuille. */}
      <section aria-labelledby="t-accueil" className="page pb-18 tab:pt-4 tab:pb-24 desk:pt-6 desk:pb-32">
        <Cadre
          id="2542"
          preload
          rayon="aucun"
          position="50% 28%"
          sizes="(min-width: 1392px) 1312px, (min-width: 768px) calc(100vw - 4rem), 100vw"
          className="-mx-gouttiere aspect-[4/3] tab:mx-0 tab:aspect-[16/9] tab:rounded-plaque desk:aspect-auto desk:h-[30rem]"
        />
        <div className="relative -mx-gouttiere -mt-6 rounded-t-plaque bg-white px-gouttiere pt-7 tab:mx-0 tab:-mt-28 tab:w-[88%] tab:rounded-plaque tab:px-10 tab:pt-10 desk:-mt-44 desk:ml-10 desk:w-[60rem] desk:px-14 desk:pt-12">
          <h1 id="t-accueil" className="titre-1">
            {typo("Nous vendons des terrains. Et nous les aménageons nous-mêmes.")}
          </h1>
          <p className="mt-5 max-w-[46rem] text-h3 leading-[1.45] text-encre-2 tab:mt-6">
            {typo(
              "Terrassement, voies en latérite, eau avec SEN’EAU, électricité, bornage. Sur les terrains que nous vendons autour de Dakar, et sur ceux des propriétaires.",
            )}
          </p>
          <div className="mt-8 grid gap-3 tab:flex tab:flex-wrap">
            <Bouton href="#terrains" pleineLargeur>
              Acheter un terrain
            </Bouton>
            <Bouton href="#amenager" ton="second" pleineLargeur>
              Faire aménager mon terrain
            </Bouton>
          </div>
          <p className="mt-6 text-encre-2">
            {typo("Vous vivez à l’étranger : ")}
            <LienTexte href="/diaspora/">achetez à distance, pas à pas</LienTexte>
          </p>
        </div>
      </section>

      {/* 2. Terrains disponibles : trois cartes de formes différentes (une grande, deux larges). */}
      <Section id="terrains" titreId="t-terrains" serre>
        <TitreSection
          id="t-terrains"
          titre="Terrains disponibles"
          chapeau={`${enLettres(PROGRAMMES.length)} programmes en vente autour de Dakar. Prix sur demande, par WhatsApp.`}
        />
        {/* Bureau : Sakina City en grand à gauche (5:4, cadrée sur le panneau), l'offre AIBD
            juste dessous ; les deux autres programmes empilés à droite. Mobile et tablette : les
            cartes, puis l'offre. */}
        <div className="mt-10 grid gap-14 tab:mt-14 tab:grid-cols-2 tab:gap-x-8 desk:grid-cols-12 desk:grid-rows-[auto_1fr] desk:gap-y-10">
          <CarteProgramme
            programme={SAKINA_CITY}
            className="tab:col-span-2 desk:col-span-7 desk:row-start-1"
            cadre="aspect-[4/3] tab:aspect-[16/9] desk:aspect-[5/4]"
            sizes="(min-width: 1392px) 752px, (min-width: 1240px) 58vw, 100vw"
          />
          <div className="grid gap-14 tab:col-span-2 tab:grid-cols-2 tab:gap-8 desk:col-span-5 desk:col-start-8 desk:row-span-2 desk:row-start-1 desk:grid-cols-1 desk:gap-12">
            <CarteProgramme
              programme={SICAP_KEUR_MASSAR}
              cadre="aspect-[4/3] desk:aspect-[3/2]"
              sizes="(min-width: 1392px) 528px, (min-width: 1240px) 40vw, (min-width: 768px) 50vw, 100vw"
            />
            <CarteProgramme
              programme={LAC_TOWN}
              cadre="aspect-[4/3] desk:aspect-[3/2]"
              sizes="(min-width: 1392px) 528px, (min-width: 1240px) 40vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          {/* L'offre datée : une ligne sur une surface brume, pas une quatrième carte. */}
          <Panneau className="tab:col-span-2 desk:col-span-7 desk:row-start-2 desk:self-start">
            <p>
              <TexteFait fait={RECASEMENT_AIBD.ligneAccueil} />
            </p>
            <LienSuite href={RECASEMENT_AIBD.href!} className="mt-2">
              Voir l’offre
            </LienSuite>
          </Panneau>
        </div>
      </Section>

      {/* 3. Aménager la terre : une plaque brume, le texte et les travaux datés à gauche, la
          chargeuse à droite, bord à bord (2493 est en portrait). Mobile : la photo en haut. */}
      <section id="amenager" aria-labelledby="t-amenager" className="page">
        <Plaque className="grid desk:grid-cols-12">
          <Cadre
            id="2493"
            rayon="aucun"
            position="50% 45%"
            sizes="(min-width: 1392px) 600px, (min-width: 1240px) 44vw, 100vw"
            className="aspect-[4/3] tab:aspect-[3/2] desk:col-span-5 desk:col-start-8 desk:row-start-1 desk:aspect-auto desk:h-full"
          />
          <div className="px-6 py-10 tab:px-12 tab:py-14 desk:col-span-7 desk:col-start-1 desk:row-start-1 desk:px-14 desk:py-16">
            <TitreSection
              id="t-amenager"
              titre="Aménager la terre"
              chapeau="Sur nos terrains, le travail commence bien avant la vente."
            />
            <TravauxDates lignes={TRAVAUX_DATES} className="mt-8 tab:mt-10" />
            <h3 className="mt-10 titre-3 tab:mt-12">{typo("Vous avez un terrain ou des hectares ?")}</h3>
            <div className="mt-4 grid gap-2 tab:flex tab:flex-wrap tab:items-center tab:gap-x-8">
              <BoutonWhatsApp message={MESSAGES.proprietaire.texte} pleineLargeur>
                Décrire mon terrain sur WhatsApp
              </BoutonWhatsApp>
              <LienSuite href="/amenager/">Tout sur l’aménagement</LienSuite>
            </div>
          </div>
        </Plaque>
      </section>

      {/* 4. Le bon papier avant le bon prix. Bureau : le titre en haut à gauche, le notaire en
          bas à gauche, le tableau à droite. Puis la ligne de la diaspora, sur un panneau. */}
      <Section id="foncier" titreId="t-foncier">
        <div className="grid gap-8 desk:grid-cols-12 desk:grid-rows-[auto_1fr] desk:gap-x-8 desk:gap-y-0">
          <TitreSection
            id="t-foncier"
            titre="Le bon papier avant le bon prix"
            className="desk:col-span-4 desk:row-start-1"
          />
          <div className="desk:col-span-7 desk:col-start-6 desk:row-span-2 desk:row-start-1 desk:pt-2">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-note text-encre-2">
                  <th scope="col" className="pb-3 font-medium">
                    Document
                  </th>
                  <th scope="col" className="pb-3 text-right font-medium">
                    Niveau de sécurité
                  </th>
                </tr>
              </thead>
              <tbody>
                {DOCUMENTS.map((d) => (
                  <tr key={d.statut} className="border-t border-filet">
                    <th scope="row" className="py-4 titre-3 tab:py-5">
                      {d.nom}
                    </th>
                    <td className="py-4 text-right tab:py-5">{typo(d.niveau.texte)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Note className="mt-3">Niveaux publiés par Saloum Immo le 8 juillet 2026.</Note>
          </div>
          <div className="desk:col-span-4 desk:row-start-2 desk:self-end">
            <p>{typo("Un notaire agréé accompagne chaque étape.")}</p>
            <LienSuite href="/foncier/" className="mt-2">
              Comprendre le foncier
            </LienSuite>
          </div>
        </div>
        {/* La diaspora : une ligne à part, pas un sous-titre du foncier. */}
        <Panneau className="mt-14 tab:mt-16 desk:flex desk:items-center desk:gap-8">
          <p className="titre-3">{typo("Vous vivez à l’étranger ?")}</p>
          <p className="mt-2 text-encre-2 desk:mt-0 desk:flex-1">
            {typo("Tout commence sur WhatsApp, avec des vidéos et des documents.")}
          </p>
          <LienSuite href="/diaspora/" className="mt-2 desk:mt-0 desk:flex-none">
            Acheter depuis l’étranger
          </LienSuite>
        </Panneau>
      </Section>

      {/* 5. Babacar Ndiaye : le texte à gauche, le portrait à droite, alignés en haut.
          Pas de numéro ici : il est dans le pied de contact, qui donne aussi l'agence. */}
      <Section id="fondateur" titreId="t-fondateur" serre>
        <div className="grid gap-8 tab:grid-cols-12 tab:items-start tab:gap-8">
          <div className="tab:col-span-6">
            <h2 id="t-fondateur" className="titre-2">
              Babacar Ndiaye
            </h2>
            <p className="mt-3 text-h3 leading-[1.45] text-encre-2">Fondateur et directeur général.</p>
            <p className="mt-4">
              {typo("Il explique lui-même en vidéo la délibération, le bail et le titre foncier.")}
            </p>
            <LienSuite href="/a-propos/" className="mt-2">
              Son parcours
            </LienSuite>
          </div>
          {/* Capture de l'interview recadrée en 4:3 (74 % 40 %) : le logo incrusté sort du
              cadre. 528 px au bureau : la capture fait 899 px de large. */}
          <Cadre
            id="ig-DZUeyGKPdj_"
            sizes="(min-width: 1392px) 528px, (min-width: 1240px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="aspect-[4/3] tab:col-span-6 tab:col-start-7 desk:col-span-5 desk:col-start-8"
          />
        </div>
      </Section>
    </>
  );
}
