/**
 * Numéro d'étape : petit carré orange (la touche d'orange de la page), chiffre à
 * l'encre. Aménager et Diaspora.
 */
export function NumeroEtape({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="inline-flex size-8 flex-none items-center justify-center rounded-bouton bg-orange text-note font-semibold text-encre"
    >
      {n}
    </span>
  );
}
