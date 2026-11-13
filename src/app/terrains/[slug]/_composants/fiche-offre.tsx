// Fiche Recasement AIBD (allegement 3) : page courte, typographique, sans photo
// (aucune photo publiée de ce site). Le prix apparaît une fois, avec sa date.
// 1. En-tête : l'offre en clair et le bouton, en ton second : sur une page aussi courte,
//    le bleu plein de la plaque de contact suffit.
// 2. Ce qu'est un bail : une plaque brume, à droite de l'en-tête au bureau, dessous sur mobile.
// 3. Une ligne : les programmes en vente.

import Link from "next/link";
import { BoutonWhatsApp } from "@/components/bouton";
import { LienSuite } from "@/components/lien";
import { FilAriane } from "@/components/page-tete";
import { Plaque } from "@/components/section";
import { TexteFait } from "@/components/texte";
import { DOCUMENTS } from "@/content/foncier";
import { PROGRAMMES, RECASEMENT_AIBD } from "@/content/programmes";
import { typo } from "@/lib/format";
import { FIL_FICHE } from "./fil";

export function FicheOffre() {
  const o = RECASEMENT_AIBD;
  const bail = DOCUMENTS.find((d) => d.statut === "bail")!;
  return (
    <>
      <div className="page pt-6 pb-16 tab:pt-10 tab:pb-20 desk:pt-12 desk:pb-24">
        <div className="grid gap-12 desk:grid-cols-12 desk:items-end desk:gap-8">
          <section aria-labelledby="t-page" className="desk:col-span-7 desk:pr-8">
            <FilAriane fil={FIL_FICHE} />
            <h1 id="t-page" className="mt-2 titre-1 tab:mt-3">
              {o.nom}
            </h1>
            <p className="mt-4 text-h3 leading-[1.45] text-encre-2 tab:mt-6">
              <TexteFait fait={o.chapeau} />
            </p>
            <BoutonWhatsApp message={o.message} ton="second" pleineLargeur className="mt-8 tab:mt-10">
              {o.bouton}
            </BoutonWhatsApp>
          </section>

          <section aria-labelledby="t-bail" className="desk:col-span-5">
            <Plaque className="p-6 tab:p-10">
              <h2 id="t-bail" className="titre-3">
                {typo("Ce qu’est un bail")}
              </h2>
              <p className="mt-4">
                <TexteFait fait={bail.definition} />
              </p>
              <p className="mt-3">
                <TexteFait fait={bail.aSavoir} />
              </p>
              <p className="mt-5 font-semibold">{typo(`Niveau de sécurité : ${bail.niveau.texte.toLowerCase()}.`)}</p>
              <LienSuite href="/foncier/" className="mt-2">
                Comprendre le foncier
              </LienSuite>
            </Plaque>
          </section>
        </div>
      </div>

      <section aria-label="Les programmes en vente" className="page pb-18 tab:pb-24 desk:pb-32">
        <p className="text-h3 leading-[1.45]">
          {typo("Les programmes en vente : ")}
          {PROGRAMMES.map((p, i) => (
            <span key={p.slug}>
              {i > 0 ? ", " : null}
              <Link
                href={p.href}
                className="-my-2.5 inline-block py-2.5 font-semibold text-bleu underline decoration-[1.5px] underline-offset-[6px] hover:decoration-2"
              >
                {p.nom}
              </Link>
            </span>
          ))}
          .
        </p>
      </section>
    </>
  );
}
