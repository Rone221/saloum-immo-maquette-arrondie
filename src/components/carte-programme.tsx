import { ArrowRight, Certificate, MapPin, Question, WhatsappLogo } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { PHOTOS } from "@/content/photos";
import { BOUTON_PROGRAMME, type Programme } from "@/content/programmes";
import { cx } from "@/lib/base";
import { typo } from "@/lib/format";
import { waHref } from "@/lib/whatsapp";
import { Photo } from "./photo";
import { Puce } from "./puce";
import { TexteFait } from "./texte";

/**
 * Icône du statut foncier, seule : la vignette d'une petite carte (page Diaspora), là où
 * une photo de programme ferait doublon avec une couverture de vidéo.
 */
export function IconeStatut({ programme: p, size = 28 }: { programme: Programme; size?: number }) {
  const tf = p.statutCle === "tf";
  const Icone = tf ? Certificate : Question;
  return <Icone aria-hidden size={size} weight="duotone" className={tf ? "text-bleu" : "text-encre-2"} />;
}

/**
 * Statut foncier d'un programme, en badge posé sur sa photo : le certificat en bleu
 * pour un titre foncier publié, le point d'interrogation en gris quand le statut est
 * à demander. Toujours les mêmes mots que le reste du site.
 */
export function BadgeStatut({
  programme: p,
  surPhoto = true,
  className,
}: {
  programme: Programme;
  /** Sur une photo : blanc, avec l'ombre de repos. Sinon : sur la brume, sans ombre. */
  surPhoto?: boolean;
  className?: string;
}) {
  const tf = p.statutCle === "tf";
  const Icone = tf ? Certificate : Question;
  return (
    <span
      className={cx(
        "inline-flex min-h-8 items-center gap-1.5 rounded-bouton px-2.5 py-1 text-note leading-serre font-semibold text-encre",
        surPhoto ? "bg-white shadow-carte" : "bg-brume",
        className,
      )}
    >
      <Icone aria-hidden size={18} weight={tf ? "fill" : "bold"} className={cx("flex-none", tf ? "text-bleu" : "text-encre-2")} />
      {typo(p.statut.texte)}
    </span>
  );
}

/**
 * Carte de programme (revue 2) : une vraie carte blanche, la photo en haut avec le
 * badge du statut foncier, le nom, le lieu, trois repères en puces, puis deux actions.
 * Toute la carte mène à la fiche (le lien du nom s'étend sur la carte) ; le bouton
 * WhatsApp passe au-dessus et ouvre la conversation avec le message du programme.
 * Survol : la carte se soulève, son ombre s'allonge, la photo grossit, la flèche avance.
 * Une photo plafonnée (largeurMax de content/photos.ts, 2534) ne grossit pas : le zoom
 * la ferait passer au-dessus de son plafond.
 *
 * La largeur de la carte reste sous 440 px partout où sert 2534 (Sakina City) :
 * au-delà, le texte du panneau se lit. Les grilles et carrousels qui l'appellent
 * s'en chargent ; `sizes` doit le dire.
 *
 * `surBrume` : sur une plaque brume, la carte n'a pas d'ombre au repos (le blanc suffit).
 * `largeTab` : de 768 à 1 239 px, photo à gauche et texte à droite (carte seule sur
 * sa ligne en tablette).
 */
export function CarteProgramme({
  programme: p,
  sizes,
  preload = false,
  niveau = 3,
  surBrume = false,
  largeTab = false,
  className,
}: {
  programme: Programme;
  /** Largeur dessinée de la photo, pour le choix de la variante. */
  sizes: string;
  preload?: boolean;
  niveau?: 2 | 3;
  surBrume?: boolean;
  largeTab?: boolean;
  className?: string;
}) {
  const Titre = niveau === 2 ? "h2" : "h3";
  const titreId = `t-carte-${p.slug}`;
  return (
    <article
      aria-labelledby={titreId}
      className={cx(
        "group relative flex w-full flex-col overflow-hidden rounded-plaque bg-white transition-carte hover:-translate-y-1 hover:shadow-survol",
        !surBrume && "shadow-carte",
        largeTab && "tab:grid tab:grid-cols-2 desk:flex",
        className,
      )}
    >
      <div className={cx("relative aspect-[4/3] overflow-hidden bg-brume", largeTab && "tab:aspect-auto tab:min-h-full desk:aspect-[4/3] desk:min-h-0")}>
        <Photo
          id={p.photo}
          fill
          decorative
          preload={preload}
          sizes={sizes}
          className={cx("object-cover", !PHOTOS[p.photo].largeurMax && "zoom-carte")}
        />
        <BadgeStatut programme={p} className="absolute top-3 left-3 tab:top-4 tab:left-4" />
      </div>

      <div className="flex flex-1 flex-col p-5 tab:p-6">
        <Titre id={titreId} className="titre-3">
          {/* Le lien couvre toute la carte (::after) ; l'anneau de focus suit la carte, tracé
              en dedans : l'article coupe ce qui dépasse (overflow-hidden). */}
          <Link
            href={p.href}
            className="transition-colors after:absolute after:inset-0 after:z-[1] after:rounded-plaque group-hover:text-bleu focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:-outline-offset-3 focus-visible:after:outline-bleu-vif"
          >
            {p.nom}
          </Link>
        </Titre>
        <p className="mt-1.5 flex items-start gap-1.5 text-encre-2">
          <MapPin aria-hidden size={18} className="mt-[0.2em] flex-none text-orange" weight="fill" />
          <span>
            <TexteFait fait={p.lieu} />
          </span>
        </p>
        <ul aria-label="Repères" className="mt-4 flex flex-wrap gap-2">
          {p.reperes.map((r) => (
            <li key={r.texte}>
              <Puce>{r.texte}</Puce>
            </li>
          ))}
        </ul>

        {/* La rangée se replie quand la carte est trop étroite (320 px) ; 8 px d'écart au
            moins, pour qu'elle tienne encore sur une ligne dans le carrousel de l'accueil à
            390 px. */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-6">
          <span aria-hidden className="inline-flex items-center gap-1.5 font-semibold whitespace-nowrap text-bleu">
            Voir la fiche
            <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <a
            href={waHref(typo(p.message))}
            aria-label={`${BOUTON_PROGRAMME}, ${p.nom}`}
            className="relative z-[2] inline-flex min-h-11 items-center gap-2 rounded-bouton bg-brume px-3.5 font-semibold text-bleu transition-surface hover:bg-bleu hover:text-white active:translate-y-px"
          >
            <WhatsappLogo aria-hidden size={20} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
