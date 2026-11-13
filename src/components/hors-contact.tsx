"use client";

import type { ReactNode } from "react";
import { useChemin } from "./nav-links";

/** Rend ses enfants partout sauf sur la page Contact (son ouverture est déjà le bloc bleu). */
export function HorsContact({ children }: { children: ReactNode }) {
  const chemin = useChemin();
  return chemin === "/contact/" ? null : <>{children}</>;
}
