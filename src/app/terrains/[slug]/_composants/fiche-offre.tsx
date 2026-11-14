// Fiche Recasement AIBD (revue 2) : page courte, sans photo (aucune n'est publiée de
// ce site). Le prix apparaît une fois, avec sa date, et la date une fois, collée au prix.
// 1. En-tête : l'offre en clair, ses repères en puces (le bail, le lieu), le bouton ;
//    à droite au bureau, la carte du bail (ce qu'on achète ici).
// 2. Les programmes en vente, en petites cartes.

import { BoutonWhatsApp } from "@/components/bouton";
import { CarteMini } from "@/components/carte-mini";
import { CarteDocument } from "@/components/document";
import { LienSuite } from "@/components/lien";
import { PageTete } from "@/components/page-tete";
import { Photo } from "@/components/photo";
import { Puce } from "@/components/puce";
import { TexteFait } from "@/components/texte";
import { DOCUMENTS } from "@/content/foncier";
import { PROGRAMMES, RECASEMENT_AIBD } from "@/content/programmes";
import { FIL_FICHE } from "./fil";

export function FicheOffre() {
  const o = RECASEMENT_AIBD;
  const bail = DOCUMENTS.find((d) => d.statut === "bail")!;
  return (
    <>
      <PageTete
        fil={FIL_FICHE}
        titre={o.nom}
        chapeau={<TexteFait fait={o.chapeau} />}
        aside={
          <div className="desk:pl-8">
            <CarteDocument doc={bail} complet avecChezNous={false} niveauTitre={2} />
            <LienSuite href="/foncier/" className="mt-3">
              Les trois documents, expliqués
            </LienSuite>
          </div>
        }
      >
        <ul aria-label="Repères de l’offre" className="mt-6 flex flex-wrap gap-2 tab:mt-8">
          <li>
            <Puce>
              <TexteFait fait={o.statut} />
            </Puce>
          </li>
          <li>
            <Puce>
              <TexteFait fait={o.ticket.lieu} />
            </Puce>
          </li>
        </ul>
        <BoutonWhatsApp message={o.message} pleineLargeur className="mt-8 tab:mt-10">
          {o.bouton}
        </BoutonWhatsApp>
      </PageTete>

      <section aria-labelledby="t-programmes" className="page pb-18 tab:pb-24 desk:pb-32">
        <h2 id="t-programmes" className="titre-3">
          Les programmes en vente
        </h2>
        <ul className="mt-5 grid gap-3 tab:grid-cols-2 desk:grid-cols-3 desk:gap-4">
          {PROGRAMMES.map((p) => (
            <li key={p.slug}>
              <CarteMini
                href={p.href}
                nom={p.nom}
                ligne={`${p.statut.texte}.`}
                vignette={<Photo id={p.photo} fill decorative sizes="96px" className="object-cover" />}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
