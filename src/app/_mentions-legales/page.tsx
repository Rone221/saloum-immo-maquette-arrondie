// Mentions légales (spécification 7.9). Ouverture classique, sans numéro.
// Seuls la raison sociale, le téléphone et l'e-mail sont connus (content/site.ts).
// Le siège exact, le NINEA, le RCCM, le directeur de la publication et l'hébergeur
// doivent venir de Saloum Immo : ils sont en pointillés, rien n'est inventé.
//
// PAS PUBLIÉE : « La page n'est pas publiée tant qu'elle contient un champ vide »
// (7.9). Le dossier s'appelle _mentions-legales : un dossier préfixé par « _ » est
// privé, Next n'en fait pas de route. Le pied de page n'a pas le lien tant que
// MENTIONS_PUBLIEES est faux (content/pages/mentions-legales.ts). Pour publier :
// remplir les lignes `manque`, puis renommer le dossier en mentions-legales.
// La page reste hors index (robots), comme le reste de la maquette.

import type { Metadata } from "next";
import { TableFaits } from "@/components/faits";
import { PageTete } from "@/components/page-tete";
import { Note, Section } from "@/components/section";
import { TexteFait } from "@/components/texte";
import { EDITEUR, HEBERGEMENT, MANQUES, type LigneMention } from "@/content/pages/mentions-legales";
import { EMAIL, MOBILE, RAISON_SOCIALE } from "@/content/site";
import { typo } from "@/lib/format";
import { metaPage } from "@/lib/meta";

const TITRE = "Mentions légales";
const DESCRIPTION = `Éditeur du site : ${RAISON_SOCIALE.texte}. Téléphone ${MOBILE.long}, e-mail ${EMAIL.adresse}.`;

// robots écrit ici et pas seulement dans le layout : la page ne s'indexe pas tant
// qu'une mention manque.
export const metadata: Metadata = metaPage(TITRE, DESCRIPTION, { robots: { index: false, follow: false } });

/** « le siège exact, le NINEA et l'hébergeur » */
function enListe(elements: string[]): string {
  if (elements.length < 2) return elements.join("");
  return `${elements.slice(0, -1).join(", ")} et ${elements[elements.length - 1]}`;
}

function intro(): string {
  const editeur = `Le site est édité par ${RAISON_SOCIALE.texte}.`;
  if (MANQUES.length === 0) return editeur;
  const liste = enListe(MANQUES);
  const verbe = MANQUES.length === 1 ? "sera ajouté" : "seront ajoutés";
  return `${editeur} ${liste.charAt(0).toUpperCase()}${liste.slice(1)} ${verbe} avant la mise en ligne.`;
}

/** Une ligne connue s'affiche ; une ligne à fournir dit « À compléter ». */
function lignes(l: LigneMention[]) {
  return l.map((x) => ({
    cle: x.libelle,
    valeur:
      "valeur" in x ? (
        x.lien ? (
          <a href={x.lien} className="text-bleu underline underline-offset-4">
            <TexteFait fait={x.valeur} />
          </a>
        ) : (
          <TexteFait fait={x.valeur} />
        )
      ) : (
        <span className="text-encre-2">À compléter</span>
      ),
  }));
}

export default function MentionsLegales() {
  return (
    <>
      <PageTete titre={TITRE} chapeau={intro()} />
      <Section serre>
        <div className="grid gap-12 desk:grid-cols-2 desk:gap-8">
          <section aria-labelledby="t-editeur">
            <h2 id="t-editeur" className="mb-5 titre-3">
              Éditeur du site
            </h2>
            <TableFaits lignes={lignes(EDITEUR)} />
          </section>
          <section aria-labelledby="t-hebergement">
            <h2 id="t-hebergement" className="mb-5 titre-3">
              Hébergement
            </h2>
            <TableFaits lignes={lignes(HEBERGEMENT)} />
            {MANQUES.length > 0 ? <Note className="mt-5">{typo("Les lignes « À compléter » viendront de Saloum Immo.")}</Note> : null}
          </section>
        </div>
      </Section>
    </>
  );
}
