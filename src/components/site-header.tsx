import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { MOBILE } from "@/content/site";
import { asset } from "@/lib/base";
import { typo } from "@/lib/format";
import { waHref } from "@/lib/whatsapp";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

/**
 * En-tête : collant, blanc, sans filet. Une ombre discrète apparaît dès qu'on défile
 * (entete-ombre, sans JavaScript). Logo horizontal, six rubriques en ligne dès
 * 1 240 px, bouton WhatsApp fixe (le numéro apparaît dès 1 360 px, le mot disparaît
 * sous 352 px), bouton Menu dessous. Le bouton WhatsApp n'a pas d'aria-label : son nom
 * est son texte visible (« WhatsApp », puis « WhatsApp 77 400 75 75 » dès 1 360 px).
 */
export function SiteHeader() {
  return (
    <header className="entete-ombre sticky top-0 z-50 bg-white">
      <div className="page flex h-entete items-center gap-2 tab:gap-3 desk:gap-8">
        <Link href="/" aria-label="Saloum Immo, accueil" className="mr-auto flex min-h-11 flex-none items-center">
          {/* Logo horizontal fait à partir du logo officiel : jamais recoloré ni étiré. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/2269-logo-horizontal-420.png")}
            width={420}
            height={160}
            alt=""
            className="h-10 w-auto tab:h-11"
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden desk:block">
          <NavLinks />
        </nav>

        <a
          href={waHref()}
          className="group inline-flex h-11 flex-none items-center gap-2 rounded-bouton bg-bleu px-3.5 font-semibold text-white transition-surface hover:bg-bleu-fonce active:translate-y-px tab:h-12 tab:px-4.5"
        >
          <WhatsappLogo aria-hidden size={22} className="flex-none transition-transform duration-300 group-hover:-rotate-12" />
          {/* Sous 352 px, l'icône seule à l'écran ; le mot reste lu (sr-only). */}
          <span className="max-[22rem]:sr-only">WhatsApp</span>
          <span className="ml-1 hidden border-l border-white/40 pl-3 font-medium wide:inline">{typo(MOBILE.court)}</span>
        </a>

        <MobileMenu />
      </div>
    </header>
  );
}
