// Fiches : /terrains/sakina-city/, /terrains/sicap-keur-massar/, /terrains/lac-town/
// et l'offre datée /terrains/recasement-aibd/. Une route, quatre pages générées à
// l'export (dynamicParams = false).

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROGRAMMES, RECASEMENT_AIBD } from "@/content/programmes";
import { metaPage } from "@/lib/meta";
import { FicheOffre } from "./_composants/fiche-offre";
import { FicheProgramme } from "./_composants/fiche-programme";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...PROGRAMMES.map((p) => ({ slug: p.slug })), { slug: RECASEMENT_AIBD.slug }];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMMES.find((x) => x.slug === slug);
  if (p) return metaPage(p.nom, `${p.nom}. ${p.chapeau.texte} ${p.statut.texte}. Prix sur demande, par WhatsApp.`);
  if (slug === RECASEMENT_AIBD.slug) return metaPage(RECASEMENT_AIBD.nom, RECASEMENT_AIBD.chapeau.texte);
  return {};
}

export default async function FicheTerrain({ params }: Params) {
  const { slug } = await params;
  const p = PROGRAMMES.find((x) => x.slug === slug);
  if (p) return <FicheProgramme programme={p} />;
  if (slug === RECASEMENT_AIBD.slug) return <FicheOffre />;
  notFound();
}
