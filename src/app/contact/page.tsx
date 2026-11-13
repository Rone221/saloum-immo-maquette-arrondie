// Contact (allegement 3, Contact) : ouverture en bloc bleu (le pied de contact n'y a
// donc que sa ligne blanche), trois messages prêts, les réseaux datés.
// Seule page où le texte des messages WhatsApp s'affiche, une fois chacun.
// Pas de formulaire (export statique), pas de carte, pas d'horaires (inconnus).

import type { Metadata } from "next";
import { BoutonAppel, BoutonWhatsApp } from "@/components/bouton";
import { Mail, Tel } from "@/components/lien";
import { Cadre } from "@/components/photo";
import { Note, Plaque, Section, TitreSection } from "@/components/section";
import { MESSAGES } from "@/content/messages";
import { AGENCE, FIXE, MOBILE, RELEVE_RESEAUX, RESEAUX } from "@/content/site";
import { dateLongue, typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";

export const metadata: Metadata = metaPage(
  "Contact",
  "Saloum Immo : WhatsApp et mobile +221 77 400 75 75, fixe 33 805 87 18, info@saloumimmo.com. Agence à Sicap Keur Massar, Sangalkam, Dakar, sur rendez-vous.",
);

/** Trois situations, trois boutons d'intention (allegement 2.9), le message affiché une fois. */
const SITUATIONS = [
  { titre: "J’achète un terrain", bouton: "Écrire sur WhatsApp", message: MESSAGES.question.texte },
  { titre: "Je veux faire aménager", bouton: "Décrire mon terrain sur WhatsApp", message: MESSAGES.proprietaire.texte },
  { titre: "J’habite à l’étranger", bouton: "Commencer sur WhatsApp", message: MESSAGES.diaspora.texte },
];

/** Espace insécable : « Sur rendez-vous » ne se coupe pas. */
const NBSP = String.fromCharCode(0xa0);

/** Lien blanc souligné dans le bloc bleu, 44 px de haut au moins. */
const LIEN_BLANC =
  "inline-flex min-h-11 items-center font-medium underline decoration-white/50 decoration-1 underline-offset-4 hover:decoration-white";

export default function Contact() {
  return (
    <>
      {/* 1. Ouverture : le bloc bleu, la photo de l'agence à droite, bord à bord. */}
      <section aria-labelledby="t-page" className="page pt-6 pb-18 tab:pt-10 tab:pb-24 desk:pt-12 desk:pb-32">
        <Plaque ton="bleu" className="grid desk:grid-cols-12">
          <div className="px-6 pt-10 pb-8 tab:px-12 tab:py-14 desk:col-span-7 desk:px-16 desk:py-16">
            <h1 id="t-page" className="titre-1">
              Parlons de votre terrain.
            </h1>
            <Tel
              numero={MOBILE}
              format="long"
              className="mt-5 inline-flex min-h-11 items-center titre-2 whitespace-nowrap hover:underline hover:decoration-2 hover:underline-offset-8 tab:mt-8"
            />
            <div className="mt-6 grid gap-3 tab:flex">
              <BoutonWhatsApp ton="inverse" message={MESSAGES.question.texte} pleineLargeur>
                Écrire sur WhatsApp
              </BoutonWhatsApp>
              <BoutonAppel ton="voile" pleineLargeur />
            </div>
            {/* Trois libellés en 14 px, la valeur à côté, même sur mobile. « Sur rendez-vous » ne se coupe pas. */}
            <dl className="mt-8 grid grid-cols-[4.25rem_minmax(0,1fr)] items-baseline gap-x-4 tab:mt-10 tab:grid-cols-[5rem_minmax(0,1fr)]">
              <dt className="text-note text-white/85">Fixe</dt>
              <dd>
                <Tel numero={FIXE} className={LIEN_BLANC} />
              </dd>
              <dt className="text-note text-white/85">E-mail</dt>
              <dd>
                <Mail className={LIEN_BLANC} />
              </dd>
              <dt className="text-note text-white/85">Agence</dt>
              <dd className="py-2.5">{typo(AGENCE.texte).replace("Sur rendez-vous", `Sur${NBSP}rendez-vous`)}</dd>
            </dl>
          </div>
          <Cadre
            id="2352-haut"
            preload
            rayon="aucun"
            sizes="(min-width: 1240px) 1000px, 100vw"
            className="aspect-[5/3] desk:col-span-5 desk:aspect-auto desk:h-full"
          />
        </Plaque>
      </section>

      {/* 2. Trois messages prêts : la situation, le message tel qu'il part, son bouton. */}
      <Section serre titreId="t-messages">
        <TitreSection
          id="t-messages"
          titre="Trois messages prêts"
          chapeau="Chaque bouton ouvre WhatsApp avec ce message déjà écrit. Vous le relisez avant d’envoyer."
        />
        <ul className="mt-10 grid gap-10 tab:mt-12 tab:gap-12 desk:grid-cols-3 desk:gap-x-8">
          {SITUATIONS.map((s) => (
            <li key={s.titre} className="flex flex-col">
              <h3 className="titre-3">{typo(s.titre)}</h3>
              <blockquote className="mt-3 flex-1 text-encre-2">
                <p>{typo(`« ${s.message} »`)}</p>
              </blockquote>
              <BoutonWhatsApp ton="second" message={s.message} pleineLargeur className="mt-5 self-start">
                {s.bouton}
              </BoutonWhatsApp>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Réseaux : une ligne au bureau, une liste sur mobile. Chiffres datés. */}
      <Section serre titreId="t-reseaux">
        <TitreSection id="t-reseaux" titre="Réseaux" />
        <ul className="mt-6 grid tab:mt-8 tab:flex tab:flex-wrap tab:gap-x-10">
          {RESEAUX.map((r) => (
            <li key={r.nom}>
              <a
                href={r.href}
                className="inline-flex min-h-11 items-center font-semibold text-bleu underline decoration-[1.5px] underline-offset-[6px] hover:decoration-2"
              >
                {r.nom}
              </a>
              {/abonnés/.test(r.repere.texte) ? <span className="text-encre-2">{typo(`, ${r.repere.texte}`)}</span> : null}
            </li>
          ))}
        </ul>
        <Note className="mt-3">{`Chiffres au ${dateLongue(RELEVE_RESEAUX)}.`}</Note>
      </Section>
    </>
  );
}
