import { Onest } from "next/font/google";

// Une seule famille, variable (graisses 100 à 900). Trois graisses servent :
// 400 texte, 500 navigation et clés de tableau, 600 titres et boutons.
export const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});
