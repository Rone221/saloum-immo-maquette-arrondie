import { InstagramLogo, Play, TiktokLogo, YoutubeLogo } from "@phosphor-icons/react/ssr";
import type { PhotoId } from "@/content/photos";
import { VIDEOS, type CleVideo, type Plateforme } from "@/content/videos";
import { cx } from "@/lib/base";
import { dateLongue, typo } from "@/lib/format";
import { Photo } from "./photo";
import { Puce } from "./puce";

const LOGOS: Record<Plateforme, typeof YoutubeLogo> = {
  YouTube: YoutubeLogo,
  Instagram: InstagramLogo,
  TikTok: TiktokLogo,
};

/**
 * Couverture d'une carte vidéo. Jamais une vignette tirée de la plateforme : une de nos
 * photos, ou une couverture écrite, le sujet en grand sur un aplat. Une photo qui sert
 * déjà sur la page ne revient pas en couverture, même recadrée : elle passerait pour
 * une autre vue du site. On prend alors une couverture écrite.
 */
export type Couverture =
  | { photo: PhotoId; position?: string }
  | { ton: "bleu" | "encre" | "brume" };

const APLATS = {
  bleu: "bg-bleu text-white",
  encre: "bg-encre text-white",
  brume: "bg-brume-2 text-encre",
};

/** « 1 min 58 », ou « 21 mai 2026 », ou rien. */
function repere(cle: CleVideo): string | null {
  const v = VIDEOS[cle] as { duree?: string; date?: string };
  if (v.duree) return v.duree;
  if (v.date) return dateLongue(v.date);
  return null;
}

/**
 * Fond de la carte. Couverture écrite : le mot-clé en grand, ou `titre` (tuile), le titre
 * de la vidéo écrit en bas de l'aplat à la place du panneau blanc. Interligne serré : sur
 * trois lignes, dans une tuile de 240 px de haut, le titre reste sous le bouton lecture.
 */
function Fond({ cle, couverture, sizes, titre }: { cle: CleVideo; couverture: Couverture; sizes: string; titre?: string }) {
  const v = VIDEOS[cle];
  if ("photo" in couverture) {
    return (
      <span className="absolute inset-0 block">
        <Photo id={couverture.photo} fill decorative sizes={sizes} position={couverture.position} className="zoom-carte object-cover" />
      </span>
    );
  }
  return (
    <span className={cx("absolute inset-0 flex flex-col justify-end overflow-hidden p-5", APLATS[couverture.ton])}>
      <span aria-hidden className={cx("relative", titre ? "titre-3 leading-serre" : "text-h3 leading-serre font-semibold tracking-titre")}>
        {titre ?? typo(v.motCle)}
      </span>
    </span>
  );
}

/**
 * Carte vidéo (revue 2) : la couverture, le bouton lecture au centre, la plateforme et
 * la durée (ou la date) en puce, le titre dessous. Toute la carte est le lien, vers la
 * plateforme, dans le même onglet. Survol : la carte se soulève, le bouton lecture
 * grossit.
 *
 * `format="tuile"` : la couverture remplit la carte (hauteur donnée par le parent). Pour
 * les galeries des fiches. Sur une photo, le titre est sur un panneau blanc en bas ; sur
 * une couverture écrite, il s'écrit sur l'aplat lui-même, sous le bouton lecture.
 */
export function CarteVideo({
  cle,
  couverture,
  sizes,
  titre,
  format = "carte",
  ratio = "aspect-[16/10]",
  surBrume = false,
  className,
}: {
  cle: CleVideo;
  couverture: Couverture;
  /** Largeur dessinée de la couverture. */
  sizes: string;
  /** Remplace le titre de la vidéo (titre court d'une liste). */
  titre?: string;
  format?: "carte" | "tuile";
  /** Proportions de la couverture (format carte). 4:3 pour les captures à logo incrusté. */
  ratio?: string;
  surBrume?: boolean;
  className?: string;
}) {
  const v = VIDEOS[cle];
  const Logo = LOGOS[v.plateforme];
  const r = repere(cle);
  const puce = (
    <Puce ton="sombre" icone={<Logo aria-hidden size={16} weight="fill" />} className="absolute top-3 left-3">
      {r ? `${v.plateforme} · ${typo(r)}` : v.plateforme}
    </Puce>
  );
  const lecture = (
    <span aria-hidden className="absolute inset-0 grid place-items-center">
      <span className="grid size-14 place-items-center rounded-bouton bg-white text-bleu shadow-carte transition-transform duration-300 group-hover:scale-110 tab:size-16">
        <Play size={26} weight="fill" />
      </span>
    </span>
  );
  const texteTitre = typo(titre ?? v.titre);
  // Nom du lien : le titre visible d'abord, puis la plateforme et le repère.
  const nom = `${texteTitre} (${v.plateforme}${r ? `, ${typo(r)}` : ""})`;

  if (format === "tuile") {
    const ecrite = !("photo" in couverture);
    return (
      <a
        href={v.href}
        aria-label={nom}
        className={cx(
          "group relative block h-full w-full overflow-hidden rounded-photo bg-brume transition-carte hover:-translate-y-1 hover:shadow-survol",
          className,
        )}
      >
        <Fond cle={cle} couverture={couverture} sizes={sizes} titre={ecrite ? texteTitre : undefined} />
        {puce}
        {lecture}
        {ecrite ? null : (
          <span className="absolute inset-x-3 bottom-3 block rounded-bouton bg-white px-4 py-3 font-semibold leading-serre text-encre shadow-carte">
            {texteTitre}
          </span>
        )}
      </a>
    );
  }

  return (
    <a
      href={v.href}
      aria-label={nom}
      className={cx(
        "group relative flex w-full flex-col overflow-hidden rounded-photo bg-white transition-carte hover:-translate-y-1 hover:shadow-survol",
        !surBrume && "shadow-carte",
        className,
      )}
    >
      <span className={cx("relative block overflow-hidden bg-brume", ratio)}>
        <Fond cle={cle} couverture={couverture} sizes={sizes} />
        {puce}
        {lecture}
      </span>
      <span className="flex flex-1 items-start justify-between gap-3 p-4 tab:p-5">
        <span className="font-semibold leading-serre transition-colors group-hover:text-bleu">{texteTitre}</span>
      </span>
    </a>
  );
}
