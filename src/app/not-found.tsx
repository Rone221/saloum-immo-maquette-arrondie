// Page introuvable : l'ouverture des pages intérieures, le retour à l'accueil en lien
// bleu, et les six rubriques à droite au bureau (dessous sur mobile), en encre comme un
// menu, la flèche seule en bleu. Puis le pied de contact, qui porte déjà WhatsApp : pas
// de bouton de plus ici. Pas de photo : aucune ne dit « introuvable ».
//
// Next envoie ce fichier avec chaque page du site : composants serveur seulement,
// rien d'interactif.

import { ArrowRight } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import { Lien, LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { NAVIGATION } from "@/content/site";
import { metaPage } from "@/lib/meta";

// robots: null : Next pose déjà sa propre balise « noindex » sur la page 404.
export const metadata: Metadata = metaPage(
  "Page introuvable",
  "Cette adresse ne mène à aucune page du site de Saloum Immo.",
  { robots: null },
);

export default function Introuvable() {
  return (
    <PageTete
      titre="Page introuvable"
      chapeau="Cette adresse ne mène à aucune page du site. Choisissez une rubrique, ou écrivez-nous sur WhatsApp."
      aside={
        <nav aria-label="Rubriques du site" className="desk:pl-[calc(100%/6)]">
          <ul className="grid tab:grid-cols-2 tab:gap-x-8 desk:grid-cols-1">
            {NAVIGATION.map((r) => (
              <li key={r.href}>
                <Lien
                  href={r.href}
                  className="group inline-flex min-h-12 items-center gap-2 titre-3 decoration-[1.5px] underline-offset-[6px] transition-surface hover:text-bleu hover:underline"
                >
                  {r.libelle}
                  <ArrowRight
                    aria-hidden
                    size={20}
                    weight="bold"
                    className="flex-none text-bleu transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Lien>
              </li>
            ))}
          </ul>
        </nav>
      }
    >
      <LienSuite href="/" className="mt-6 tab:mt-8">
        Retour à l’accueil
      </LienSuite>
    </PageTete>
  );
}
