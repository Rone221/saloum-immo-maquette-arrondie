import type { Fait } from "@/content/types";
import { typo } from "@/lib/format";

/**
 * Texte de données, avec la typographie française (espaces insécables).
 * Pas de police mono dans cette direction : un passage entre accents graves
 * (`TF 15026/R`) sort dans la police du texte, sans coupure de ligne.
 */
export function Texte({ children }: { children: string }) {
  const morceaux = typo(children).split(/`([^`]+)`/);
  return (
    <>
      {morceaux.map((m, i) =>
        i % 2 === 1 ? (
          <span key={i} className="whitespace-nowrap">
            {m}
          </span>
        ) : (
          m
        ),
      )}
    </>
  );
}

/** Le texte d'un fait. */
export function TexteFait({ fait }: { fait: Fait }) {
  return <Texte>{fait.texte}</Texte>;
}
