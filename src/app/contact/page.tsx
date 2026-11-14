// Contact (revue 2) : l'ouverture en plaque bleue (le pied de contact n'y a donc que sa
// ligne blanche), trois messages prêts en cartes cliquables, les réseaux en cartes.
// Seule page où le texte des messages WhatsApp s'affiche, une fois chacun.
// Pas de formulaire (export statique), pas de carte, pas d'horaires (inconnus).

import {
  AirplaneTilt,
  ArrowRight,
  ArrowUpRight,
  Bulldozer,
  FacebookLogo,
  House,
  InstagramLogo,
  LinkedinLogo,
  TiktokLogo,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { Metadata } from "next";
import { BoutonAppel, BoutonWhatsApp } from "@/components/bouton";
import { Mail, Tel } from "@/components/lien";
import { Cadre } from "@/components/photo";
import { Note, Plaque, Section, TitreSection } from "@/components/section";
import { MESSAGES } from "@/content/messages";
import { AGENCE, FIXE, MOBILE, RELEVE_RESEAUX, RESEAUX } from "@/content/site";
import { dateLongue, typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";
import { waHref } from "@/lib/whatsapp";

export const metadata: Metadata = metaPage(
  "Contact",
  "Saloum Immo : WhatsApp et mobile +221 77 400 75 75, fixe 33 805 87 18, info@saloumimmo.com. Agence à Sicap Keur Massar, Sangalkam, Dakar, sur rendez-vous.",
);

/**
 * Trois situations, trois messages prêts, le message affiché une fois. Un libellé par
 * intention, le même partout (« Décrire mon terrain sur WhatsApp » à l'accueil et sur
 * Aménager).
 */
const SITUATIONS: Array<{ titre: string; bouton: string; message: string; icone: Icon }> = [
  { titre: "J’achète un terrain", bouton: "Écrire sur WhatsApp", message: MESSAGES.question.texte, icone: House },
  {
    titre: "Je veux faire aménager",
    bouton: "Décrire mon terrain sur WhatsApp",
    message: MESSAGES.proprietaire.texte,
    icone: Bulldozer,
  },
  { titre: "J’habite à l’étranger", bouton: "Commencer sur WhatsApp", message: MESSAGES.diaspora.texte, icone: AirplaneTilt },
];

const LOGOS: Record<string, Icon> = {
  Facebook: FacebookLogo,
  TikTok: TiktokLogo,
  YouTube: YoutubeLogo,
  Instagram: InstagramLogo,
  LinkedIn: LinkedinLogo,
};

/** Espace insécable : « Sur rendez-vous » ne se coupe pas. */
const NBSP = String.fromCharCode(0xa0);

/** Lien blanc souligné dans le bloc bleu, 44 px de haut au moins. */
const LIEN_BLANC =
  "inline-flex min-h-11 items-center font-medium underline decoration-white/50 decoration-1 underline-offset-4 hover:decoration-white";

export default function Contact() {
  return (
    <>
      {/* 1. Ouverture : le bloc bleu, la photo de l'agence à droite, bord à bord. */}
      <section aria-labelledby="t-page" className="page pt-6 pb-18 tab:pt-10 tab:pb-24 desk:pt-12 desk:pb-28">
        <Plaque ton="bleu" className="group grid desk:grid-cols-12">
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
          <div className="relative overflow-hidden desk:col-span-5">
            <Cadre
              id="2352-haut"
              preload
              rayon="aucun"
              sizes="(min-width: 1240px) 1000px, 100vw"
              className="aspect-[5/3] transition-transform duration-700 group-hover:scale-[1.03] desk:aspect-auto desk:h-full"
            />
          </div>
        </Plaque>
      </section>

      {/* 2. Trois messages prêts : chaque carte ouvre WhatsApp avec son message. */}
      <Section serre titreId="t-messages">
        <TitreSection
          id="t-messages"
          titre="Trois messages prêts"
          chapeau="Chaque carte ouvre WhatsApp avec ce message déjà écrit. Vous le relisez avant d’envoyer."
        />
        <ul className="mt-10 grid gap-4 tab:mt-12 tab:gap-5 desk:grid-cols-3 desk:gap-6">
          {SITUATIONS.map((s) => {
            const Icone = s.icone;
            return (
              <li key={s.titre} className="apparition flex">
                <a
                  href={waHref(typo(s.message))}
                  aria-label={`${typo(s.titre)} : ${s.bouton}, avec le message « ${typo(s.message)} »`}
                  className="group flex w-full flex-col rounded-plaque bg-white p-6 shadow-carte transition-carte hover:-translate-y-1 hover:shadow-survol tab:p-7"
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden className="grid size-11 flex-none place-items-center rounded-bouton bg-brume text-bleu">
                      <Icone size={22} weight="duotone" />
                    </span>
                    <span className="titre-3">{typo(s.titre)}</span>
                  </span>
                  {/* Le message, en bulle de discussion. */}
                  <span className="mt-5 block rounded-photo rounded-tl-none bg-brume px-4 py-3.5 text-encre transition-colors group-hover:bg-brume-2">
                    {typo(`« ${s.message} »`)}
                  </span>
                  <span className="mt-auto flex items-center gap-2 pt-6 font-semibold text-bleu">
                    <WhatsappLogo aria-hidden size={20} />
                    {s.bouton}
                    <ArrowRight aria-hidden size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 3. Réseaux : une carte par réseau, le chiffre daté quand il existe. */}
      <Section serre titreId="t-reseaux">
        <TitreSection id="t-reseaux" titre="Réseaux" />
        <ul className="mt-8 grid grid-cols-2 gap-3 tab:grid-cols-3 tab:gap-4 desk:grid-cols-5">
          {RESEAUX.map((r) => {
            const Logo = LOGOS[r.nom];
            const chiffre = /abonnés|vidéos/.test(r.repere.texte) ? r.repere.texte : null;
            return (
              <li key={r.nom} className="flex">
                <a
                  href={r.href}
                  className="group flex w-full flex-col gap-4 rounded-photo bg-brume p-5 transition-carte hover:-translate-y-1 hover:bg-brume-2"
                >
                  <span className="flex items-center justify-between">
                    <span aria-hidden className="grid size-11 place-items-center rounded-bouton bg-white text-bleu">
                      {Logo ? <Logo size={24} weight="fill" /> : null}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      size={18}
                      weight="bold"
                      className="text-encre-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                  <span>
                    <span className="block font-semibold">{r.nom}</span>
                    {chiffre ? <span className="mt-0.5 block text-note text-encre-2">{typo(chiffre)}</span> : null}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <Note className="mt-4">{`Chiffres au ${dateLongue(RELEVE_RESEAUX)}.`}</Note>
      </Section>
    </>
  );
}
