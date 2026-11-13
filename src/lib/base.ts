// Préfixe les fichiers de public/ par le sous-chemin du site (GitHub Pages).
// next/link et next/image s'en chargent seuls ; un <img> ou une métadonnée non.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(chemin: string) {
  return `${BASE_PATH}${chemin}`;
}

// Petite aide pour assembler des classes sans dépendance.
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
