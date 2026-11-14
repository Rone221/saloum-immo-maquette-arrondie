// Accueil (revue 2, recherche/revue-2/plan.md) : six sections, puis le pied de contact.
// 1. Ouverture : le titre, deux boutons, et le diaporama des cinq étapes du chantier ;
//    dessous, trois preuves contre la peur de l'arnaque foncière.
// 2. Terrains disponibles : une plaque brume, trois cartes (carrousel au doigt sous
//    1 240 px), puis l'offre AIBD en carte « offre datée », visiblement à part.
// 3. Aménager la terre : la frise des travaux datés, puis le bandeau propriétaire sur 2542.
// 4. Le bon papier avant le bon prix : trois cartes, du moins au plus protégé.
// 5. Vous vivez à l'étranger : une plaque brume, quatre étapes, un carrousel de vidéos.
// 6. Babacar Ndiaye : l'interview en carte vidéo, son rôle, le lien vers son parcours.
//
// Photos : 2493, 2502, 2529, 2355, 2516 (diaporama), 2534, 2616, 2580 (cartes), 2542
// (bandeau), 2352-haut et 2413-droite (couvertures de vidéos), capture de l'interview.
// Chaque photo une fois : les autres vidéos ont une couverture écrite. Une seule du groupe
// 2538 / 2553 / 2580 / 2421 : 2580. La capture du reel de Sicap Keur Massar n'est pas ici
// (Diaspora et la fiche l'ont déjà : deux pages au plus).

import { Certificate, MapPinArea, Stamp } from "@phosphor-icons/react/ssr";
import { Bouton, BoutonWhatsApp } from "@/components/bouton";
import { CarteProgramme } from "@/components/carte-programme";
import { CarteVideo } from "@/components/carte-video";
import { Carrousel } from "@/components/carrousel";
import { DiaporamaEtapes } from "@/components/diaporama-etapes";
import { CarteDocument, EchelleDocuments } from "@/components/document";
import { NumeroEtape } from "@/components/etape";
import { Frise } from "@/components/faits";
import { LienSuite, LienTexte } from "@/components/lien";
import { TicketOffre } from "@/components/offre";
import { enPaysage, Photo } from "@/components/photo";
import { Note, Plaque, Section, TitreSection } from "@/components/section";
import { TexteFait } from "@/components/texte";
import { DOCUMENTS, SOURCE_DEFINITIONS } from "@/content/foncier";
import { MESSAGES } from "@/content/messages";
import { PROGRAMMES } from "@/content/programmes";
import { TRAVAUX_DATES } from "@/content/registre";
import { APPEL_DIASPORA, ETAPES, PARCOURS_DIASPORA, PREUVES } from "@/content/services";
import { FONDATEUR } from "@/content/site";
import { enLettres, typo } from "@/lib/format";

/**
 * Plaque d'une section : bord à bord sur mobile, arrondie dès 768 px. Le rayon ne tombe
 * que sous 768 px (max-tab:) : un rounded-none sans variante perdrait contre le
 * rounded-plaque de Plaque.
 */
const PLAQUE_SECTION =
  "-mx-gouttiere max-tab:rounded-none px-gouttiere py-14 tab:mx-0 tab:rounded-plaque tab:px-10 tab:py-16 desk:px-12 desk:py-18";

/**
 * sizes du diaporama : la largeur dessinée de la photo recadrée (object-cover). Une photo
 * en hauteur remplit la largeur du cadre. Une photo en paysage (2529) est dessinée bien
 * plus large que le cadre 4:5 du mobile et que le cadre haut du bureau.
 */
const SIZES_DIAPORAMA = {
  hauteur: "(min-width: 1392px) 640px, (min-width: 960px) 48vw, 92vw",
  paysage: "(min-width: 960px) 880px, (min-width: 768px) 92vw, 150vw",
};

/**
 * sizes de la capture de l'interview (16:9) dans son cadre 4:3 : dessinée 4/3 plus large
 * que le cadre. Cadre : 640 px au plus, 5 colonnes de 960 à 1 239 px, 6 au bureau.
 */
const SIZES_INTERVIEW = "(min-width: 1392px) 853px, (min-width: 1240px) 61vw, (min-width: 960px) 51vw, (min-width: 680px) 853px, 120vw";

/** Piste d'un carrousel posé dans cette plaque : elle déborde jusqu'aux bords de la plaque. */
const PISTE_BORDS = "-mx-gouttiere gap-4 px-gouttiere scroll-px-gouttiere tab:-mx-10 tab:gap-5 tab:px-10 tab:scroll-px-10";
const PISTE_PLAQUE = `${PISTE_BORDS} desk:-mx-12 desk:px-12 desk:scroll-px-12`;

const ICONES_PREUVES = { titre: Certificate, notaire: Stamp, visite: MapPinArea };

export default function Accueil() {
  return (
    <>
      <Ouverture />
      <Terrains />
      <Amenager />
      <Foncier />
      <Etranger />
      <Fondateur />
    </>
  );
}

/* 1. Ouverture. Bureau : le texte à gauche, le diaporama à droite, centrés en hauteur.
   Mobile et tablette : le texte d'abord (le titre et les boutons dans le premier écran),
   le diaporama dessous. */
function Ouverture() {
  return (
    <section aria-labelledby="t-accueil" className="page pt-6 pb-16 tab:pt-10 tab:pb-20 desk:pt-8 desk:pb-24">
      <div className="grid gap-10 tab:gap-12 min-[60rem]:grid-cols-12 min-[60rem]:items-center min-[60rem]:gap-8">
        <div className="min-[60rem]:col-span-6 desk:pr-6">
          <h1 id="t-accueil" className="titre-1">
            {typo("Nous vendons des terrains. Et nous les aménageons nous-mêmes.")}
          </h1>
          <p className="mt-5 max-w-[38rem] text-h3 leading-[1.45] text-encre-2 tab:mt-6">
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

        <DiaporamaEtapes
          etiquette="Nos chantiers, étape par étape"
          className="min-[60rem]:col-span-6"
          cadre="aspect-[4/5] tab:aspect-[16/11] min-[60rem]:aspect-auto min-[60rem]:h-[clamp(34rem,calc(100svh-var(--spacing-entete)-7rem),41rem)]"
          etapes={ETAPES.map((e, k) => ({
            titre: e.titre,
            texte: e.texte,
            photo: (
              <Photo
                id={e.photo}
                fill
                preload={k === 0}
                sizes={enPaysage(e.photo) ? SIZES_DIAPORAMA.paysage : SIZES_DIAPORAMA.hauteur}
                className="object-cover"
              />
            ),
          }))}
        />
      </div>

      {/* Trois preuves : une icône sur la brume, un titre, un fait. */}
      <ul className="mt-12 grid gap-6 border-t border-filet pt-8 tab:mt-16 tab:grid-cols-3 tab:gap-8 tab:pt-10">
        {PREUVES.map((p) => {
          const Icone = ICONES_PREUVES[p.cle];
          return (
            <li key={p.cle} className="flex items-start gap-4">
              <span aria-hidden className="grid size-12 flex-none place-items-center rounded-bouton bg-brume text-bleu">
                <Icone size={26} weight="duotone" />
              </span>
              <span className="pt-0.5">
                <span className="block font-semibold">{typo(p.titre)}</span>
                <span className="mt-0.5 block text-encre-2">
                  <TexteFait fait={p.fait} />
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* 2. Terrains disponibles. Bureau : trois cartes en grille (389 px chacune : 2534 reste
   sous 440 px). Sous 1 240 px : un carrousel au doigt, les cartes à 352 px au plus. */
function Terrains() {
  return (
    <section id="terrains" aria-labelledby="t-terrains" className="page">
      <Plaque className={PLAQUE_SECTION}>
        <Carrousel
          etiquette="Terrains disponibles"
          ton="blanc"
          entete={
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
              <TitreSection
                id="t-terrains"
                titre="Terrains disponibles"
                chapeau={`${enLettres(PROGRAMMES.length)} programmes en vente autour de Dakar. Prix sur demande, par WhatsApp.`}
              />
              <p className="hidden desk:block">
                <LienSuite href="/terrains/">Tous les terrains</LienSuite>
              </p>
            </div>
          }
          piste={`mt-8 pt-2 pb-8 tab:mt-10 desk:mx-0 desk:grid desk:grid-cols-3 desk:gap-6 desk:overflow-visible desk:px-0 desk:pb-2 ${PISTE_BORDS}`}
          diapo="w-[86%] max-w-[22rem] tab:w-[21rem] desk:w-auto desk:max-w-none"
        >
          {PROGRAMMES.map((p) => (
            <CarteProgramme
              key={p.slug}
              programme={p}
              surBrume
              sizes="(min-width: 1392px) 389px, (min-width: 1240px) 30vw, 22rem"
            />
          ))}
        </Carrousel>
        <LienSuite href="/terrains/" className="desk:hidden">
          Tous les terrains
        </LienSuite>
        <TicketOffre surBrume className="mt-6 tab:mt-8 desk:mt-10" />
      </Plaque>
    </section>
  );
}

/* 3. Aménager la terre : la frise datée, puis le bandeau propriétaire. */
function Amenager() {
  return (
    <Section id="amenager" titreId="t-amenager">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <TitreSection
          id="t-amenager"
          titre="Aménager la terre"
          chapeau={`${enLettres(TRAVAUX_DATES.length)} chantiers publiés, chacun avec sa date.`}
        />
        <LienSuite href="/amenager/">Les étapes en photos</LienSuite>
      </div>
      <Frise lignes={TRAVAUX_DATES} className="mt-12 tab:mt-14 desk:mt-16" />

      {/* Le bandeau propriétaire : 2542 en fond (2 000 px), un voile d'encre, le texte en blanc. */}
      <div className="apparition group relative isolate mt-16 overflow-hidden rounded-plaque tab:mt-20 desk:mt-24">
        {/* Sur mobile, le bandeau est plus haut que large : la photo recadrée est dessinée
            vers 160vw. */}
        <Photo
          id="2542"
          fill
          position="50% 45%"
          sizes="(min-width: 1392px) 1312px, (min-width: 768px) 100vw, 160vw"
          className="zoom-carte -z-20 object-cover"
        />
        <span aria-hidden className="absolute inset-0 -z-10 bg-encre/60" />
        <div className="max-w-[46rem] px-6 py-12 text-white tab:px-12 tab:py-16 desk:px-16 desk:py-20">
          <h3 className="titre-2">{typo("Vous avez un terrain ou des hectares ?")}</h3>
          <p className="mt-4 text-h3 leading-[1.45] text-white/92">
            {typo("Nous aménageons aussi les terrains des propriétaires : terrassement, voies en latérite, eau, électricité, bornage.")}
          </p>
          <div className="mt-8 grid gap-3 tab:flex tab:flex-wrap tab:items-center tab:gap-x-8">
            <BoutonWhatsApp ton="inverse" message={MESSAGES.proprietaire.texte} pleineLargeur>
              Décrire mon terrain sur WhatsApp
            </BoutonWhatsApp>
            <LienSuite href="/amenager/" ton="blanc">
              Tout sur l’aménagement
            </LienSuite>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* 4. Le bon papier avant le bon prix : l'échelle, puis les trois cartes, qui mènent
   chacune à sa définition complète sur la page Foncier. */
function Foncier() {
  return (
    <Section id="foncier" titreId="t-foncier" serre>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <TitreSection
          id="t-foncier"
          titre="Le bon papier avant le bon prix"
          chapeau="Avant de payer, sachez quel document vous achetez. Les trois, du moins au plus protégé."
        />
        <LienSuite href="/foncier/">Comprendre le foncier</LienSuite>
      </div>
      <EchelleDocuments className="mt-10 tab:mt-12" />
      {/* Trois colonnes dès 960 px : empilées sur 960 px de large, les cartes n'auraient
          qu'une ou deux lignes chacune. */}
      <div className="mt-5 grid gap-4 tab:gap-5 min-[60rem]:grid-cols-3 desk:gap-6">
        {DOCUMENTS.map((d) => (
          <CarteDocument key={d.statut} doc={d} href={`/foncier/#doc-${d.statut}`} className="apparition" />
        ))}
      </div>
      <Note className="mt-5">{SOURCE_DEFINITIONS.texte}</Note>
    </Section>
  );
}

/* 5. Vous vivez à l'étranger : la plaque brume, les quatre étapes en cartes blanches,
   puis cinq vidéos à regarder avant d'appeler, en carrousel. */
function Etranger() {
  return (
    <section id="etranger" aria-labelledby="t-etranger" className="page">
      <Plaque className={PLAQUE_SECTION}>
        <div className="grid gap-8 desk:grid-cols-12 desk:items-end desk:gap-8">
          <TitreSection
            id="t-etranger"
            titre="Vous vivez à l’étranger ?"
            chapeau="Tout commence sur WhatsApp, avec des vidéos et des documents. Vous achetez à distance, pas à pas."
            className="desk:col-span-7"
          />
          <div className="grid gap-2 tab:flex tab:flex-wrap tab:items-center tab:gap-x-8 desk:col-span-5 desk:justify-end">
            <BoutonWhatsApp message={APPEL_DIASPORA.message} pleineLargeur>
              {APPEL_DIASPORA.bouton}
            </BoutonWhatsApp>
            <LienSuite href="/diaspora/">Le parcours complet</LienSuite>
          </div>
        </div>

        <ol className="mt-10 grid gap-3 tab:mt-12 tab:grid-cols-2 tab:gap-4 desk:grid-cols-4">
          {PARCOURS_DIASPORA.map((s, k) => (
            <li key={s.titre} className="apparition rounded-photo bg-white p-5 tab:p-6">
              <NumeroEtape n={k + 1} />
              <h3 className="mt-4 titre-3">{typo(s.titre)}</h3>
              <p className="mt-1.5 text-encre-2">{typo(s.court)}</p>
            </li>
          ))}
        </ol>

        <Carrousel
          etiquette="À regarder avant d’appeler"
          ton="blanc"
          className="mt-14 tab:mt-16"
          entete={<h3 className="titre-3">{typo("À regarder avant d’appeler")}</h3>}
          piste={`mt-5 pt-2 pb-6 tab:mt-6 ${PISTE_PLAQUE}`}
          diapo="w-[80%] max-w-[20rem] tab:w-[19rem] desk:w-[20.5rem]"
        >
          <CarteVideo cle="presentation" couverture={{ photo: "2352-haut" }} surBrume sizes="20.5rem" />
          <CarteVideo cle="visiteSakina" couverture={{ photo: "2413-droite" }} surBrume sizes="20.5rem" />
          {/* 2616 est déjà sur la carte de Sicap Keur Massar : couverture écrite. */}
          <CarteVideo cle="lotsSKM" couverture={{ ton: "bleu" }} surBrume sizes="20.5rem" />
          <CarteVideo cle="visiteLacTown" couverture={{ ton: "encre" }} surBrume sizes="20.5rem" />
          <CarteVideo cle="nicad" couverture={{ ton: "bleu" }} surBrume sizes="20.5rem" />
        </Carrousel>
      </Plaque>
    </section>
  );
}

/* 6. Babacar Ndiaye : la capture de l'interview en carte vidéo (4:3, le logo incrusté
   sort du cadre ; 640 px au plus à toutes les largeurs, la capture y est dessinée à
   853 px, le fichier en fait 899), le texte à droite dès 960 px. De 768 à 959 px, la
   carte se centre au-dessus du texte. */
function Fondateur() {
  return (
    <Section id="fondateur" titreId="t-fondateur">
      <div className="grid gap-10 min-[60rem]:grid-cols-12 min-[60rem]:items-center min-[60rem]:gap-8">
        <CarteVideo
          cle="interviewDG"
          couverture={{ photo: "ig-DZUeyGKPdj_", position: "74% 40%" }}
          ratio="aspect-[4/3]"
          sizes={SIZES_INTERVIEW}
          className="max-w-[40rem] tab:max-[60rem]:mx-auto min-[60rem]:col-span-5 desk:col-span-6"
        />
        <div className="min-[60rem]:col-span-7 desk:col-span-5 desk:col-start-8">
          <h2 id="t-fondateur" className="titre-2">
            {FONDATEUR.nom.texte}
          </h2>
          <p className="mt-3 text-h3 leading-[1.45] text-encre-2">
            <TexteFait fait={FONDATEUR.roleCourt} />
          </p>
          <p className="mt-5">
            <TexteFait fait={FONDATEUR.creation} /> <TexteFait fait={FONDATEUR.enVideo} />
          </p>
          <LienSuite href="/a-propos/" className="mt-3">
            Son parcours
          </LienSuite>
        </div>
      </div>
    </Section>
  );
}
