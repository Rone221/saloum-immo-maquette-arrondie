import type { Metadata, Viewport } from "next";
import "./globals.css";
import { onest } from "./fonts";
import { PiedContact } from "@/components/pied-contact";
import { SiteHeader } from "@/components/site-header";
import { asset } from "@/lib/base";
import { typo } from "@/lib/format";
import { IMAGE_PARTAGE, ORIGINE } from "@/lib/meta";

const DESCRIPTION = typo(
  "Saloum Immo vend des terrains et les aménage : terrassement, voies en latérite, eau avec SEN’EAU, électricité, bornage. Sakina City, Sicap Keur Massar, Lac Town.",
);

export const metadata: Metadata = {
  // Adresses absolues des cartes de partage (og:image).
  metadataBase: new URL(ORIGINE),
  title: {
    default: "Saloum Immo · Terrains et aménagement, région de Dakar",
    template: "%s · Saloum Immo",
  },
  description: DESCRIPTION,
  // Maquette de présentation : on ne l'indexe pas.
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: asset("/2269-icone-32.png"), sizes: "32x32", type: "image/png" }],
    apple: [{ url: asset("/2269-icone-180.png"), sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Saloum Immo · Terrains et aménagement, région de Dakar",
    description: DESCRIPTION,
    locale: "fr_SN",
    type: "website",
    images: [IMAGE_PARTAGE],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior : Next 16 ne neutralise plus le défilement doux pendant un
    // changement de page sans cet attribut. Le défilement doux reste pour les ancres.
    <html lang="fr" data-scroll-behavior="smooth" className={onest.variable}>
      <body>
        <a href="#contenu" className="evitement">
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <PiedContact />
      </body>
    </html>
  );
}
