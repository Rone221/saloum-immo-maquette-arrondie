// Variantes WebP des photos du client.
//
// Lit les originaux dans ../recherche/web/ (ou dans PHOTOS_SOURCE), écrit dans
// public/photos/ les variantes WebP et photos.json, et dans public/ les logos PNG.
// Les originaux ne sont pas dans le dépôt : ce script se lance à la main quand la
// liste change (npm run photos), et son résultat est versionné.
//
// Seules les photos que la spécification attribue à une page sont traitées
// (table 4.3). Aucune photo interdite (4.4) ne figure dans la liste.
// Les photos de visites avec clients (visages) n'y figurent pas.

import sharp from "sharp";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(process.env.PHOTOS_SOURCE ?? join(RACINE, "../recherche/web"));
const SORTIE = join(RACINE, "public/photos");
const LARGEURS = [320, 480, 800, 1200, 1600, 2000];
const QUALITE = 80;

// id publié, fichier source, recadrage éventuel en pixels de l'original.
const PHOTOS = [
  // Ouverture : zone x 360 à 1 740, y 90 à 1 330 (spécification 3.20).
  { id: "2538-plan", fichier: "2538.jpg", recadrage: { left: 360, top: 90, width: 1380, height: 1240 } },
  { id: "2580", fichier: "2580.jpg" },
  { id: "2421", fichier: "2421.jpg" },
  { id: "2534", fichier: "2534.jpg" },
  // Planche Sakina City : la photo de droite seule, sans logo ni titre incrusté.
  { id: "2413-droite", fichier: "2413.jpg", recadrage: { left: 962, top: 278, width: 846, height: 458 } },
  { id: "2616", fichier: "2616.jpg" },
  { id: "ig-DfnIRfvPSRi", fichier: "ig/2026-11-11_DfnIRfvPSRi.jpg" },
  // Les deux dernières colonnes de la capture sont un filet sombre : coupées.
  { id: "ig-DfAoxMkAbKR", fichier: "ig/2026-10-27_DfAoxMkAbKR.jpg", recadrage: { left: 0, top: 0, width: 897, height: 506 } },
  { id: "ig-DZUeyGKPdj_", fichier: "ig/2026-06-08_DZUeyGKPdj_.jpg" },
  // Étape 1
  { id: "2493", fichier: "2493.jpg" },
  { id: "2500", fichier: "2500.jpg" },
  { id: "2495", fichier: "2495.jpg" },
  { id: "2494", fichier: "2494.jpg" },
  // Étape 2. 2528 n'y est plus : en 4:3, aucun cadrage ne garde à la fois la tête
  // et la borne numérotée (il faudrait 670 px de haut sur les 607 du cadre).
  { id: "2505", fichier: "2505.jpg" },
  { id: "2502", fichier: "2502.jpg" },
  // Étape 3
  // 2501 n'y est plus : calée sur les bordures, elle coupait les deux ouvriers au cou.
  { id: "2542", fichier: "2542.jpg" },
  { id: "2529", fichier: "2529.jpg" },
  // Étape 4 : 2327 coupée au-dessus du bandeau incrusté (qui commence à y 705).
  { id: "2355", fichier: "2355.jpg" },
  { id: "2327-haut", fichier: "2327.jpg", recadrage: { left: 0, top: 0, width: 1280, height: 700 } },
  // Étape 5
  { id: "2516", fichier: "2516.jpg" },
  { id: "2517", fichier: "2517.jpg" },
  { id: "2519", fichier: "2519.jpg" },
  // À propos
  { id: "2499", fichier: "2499.jpg" },
  { id: "2537", fichier: "2537.jpg" },
  // Diaspora (optionnelle)
  { id: "2364", fichier: "2364.jpg" },
  // Contact : 2352 coupée au-dessus de l'affiche de la vitrine (y 670).
  { id: "2352-haut", fichier: "2352.jpg", recadrage: { left: 0, top: 0, width: 1080, height: 650 } },
];

// Logos : réduits sans recadrage ni recoloriage.
// - 2269-logo.png, le logo officiel complet, copié tel quel (partage social) ;
// - le même, réduit pour le cartouche, où il s'affiche à 176 px au plus (140 sur
//   mobile) : 176, 352 et 528 px de large, en srcset (densités 1 à 3) ;
// - le logo horizontal de l'en-tête, affiché de 40 à 52 px de haut (136 px de large
//   au plus) : 420 px de large suffisent en densité 3 ;
// - l'icône de l'onglet (32 px) et de l'écran d'accueil (180 px) : le logo officiel
//   posé au centre d'un carré blanc ;
// - la carte de partage (og:image, 1 200 × 630) : le logo officiel complet, à 480 px
//   de haut, au centre d'un fond blanc. Un PNG transparent sort sur fond noir dans
//   certaines applications.
const BLANC = { r: 255, g: 255, b: 255, alpha: 1 };
const LOGOS = [
  { sortie: "2269-logo.png", source: "2269-logo.png" },
  { sortie: "2269-logo-176.png", source: "2269-logo.png", largeur: 176 },
  { sortie: "2269-logo-352.png", source: "2269-logo.png", largeur: 352 },
  { sortie: "2269-logo-528.png", source: "2269-logo.png", largeur: 528 },
  { sortie: "2269-logo-horizontal-420.png", source: "2269-logo-horizontal.png", largeur: 420 },
  { sortie: "2269-icone-32.png", source: "2269-logo.png", carre: 32 },
  { sortie: "2269-icone-180.png", source: "2269-logo.png", carre: 180 },
  { sortie: "2269-partage.png", source: "2269-logo.png", carte: { largeur: 1200, hauteur: 630, logo: 480 } },
];

if (!existsSync(SOURCE)) {
  console.error(`photos : dossier source introuvable (${SOURCE}). Passer PHOTOS_SOURCE=chemin.`);
  process.exit(1);
}

mkdirSync(SORTIE, { recursive: true });
for (const nom of readdirSync(SORTIE)) {
  if (nom.endsWith(".webp") || nom === "photos.json") rmSync(join(SORTIE, nom));
}

const manifeste = {};
let fichiers = 0;

for (const photo of PHOTOS) {
  const chemin = join(SOURCE, photo.fichier);
  if (!existsSync(chemin)) {
    console.error(`photos : ${photo.fichier} introuvable dans ${SOURCE}`);
    process.exit(1);
  }
  const base = () => {
    const img = sharp(chemin).rotate();
    return photo.recadrage ? img.extract(photo.recadrage) : img;
  };
  const meta = await base().toBuffer({ resolveWithObject: true });
  const largeur = meta.info.width;
  const hauteur = meta.info.height;

  // Les largeurs standard qui ne dépassent pas l'original, plus la largeur
  // d'origine quand elle tombe entre deux paliers.
  const variantes = LARGEURS.filter((l) => l <= largeur);
  if (largeur < 2000 && !variantes.includes(largeur)) variantes.push(largeur);

  for (const l of variantes) {
    await base()
      .resize({ width: l, withoutEnlargement: true })
      .webp({ quality: QUALITE, effort: 5 })
      .toFile(join(SORTIE, `${photo.id}-${l}.webp`));
    fichiers++;
  }
  manifeste[photo.id] = { largeur, hauteur, variantes };
}

writeFileSync(join(SORTIE, "photos.json"), JSON.stringify(manifeste, null, 2) + "\n");

for (const logo of LOGOS) {
  const source = join(SOURCE, logo.source);
  const sortie = join(RACINE, "public", logo.sortie);
  if (logo.largeur) {
    await sharp(source).resize({ width: logo.largeur }).png({ compressionLevel: 9 }).toFile(sortie);
  } else if (logo.carte) {
    const { largeur, hauteur, logo: haut } = logo.carte;
    const image = await sharp(source).resize({ height: haut }).png().toBuffer();
    await sharp({ create: { width: largeur, height: hauteur, channels: 4, background: BLANC } })
      .composite([{ input: image, gravity: "centre" }])
      .flatten({ background: BLANC })
      .png({ compressionLevel: 9 })
      .toFile(sortie);
  } else if (logo.carre) {
    await sharp(source)
      .resize({ width: logo.carre, height: logo.carre, fit: "contain", background: BLANC })
      .flatten({ background: BLANC })
      .png({ compressionLevel: 9 })
      .toFile(sortie);
  } else {
    copyFileSync(source, sortie);
  }
}

console.log(`photos : ${PHOTOS.length} photos, ${fichiers} variantes WebP, ${LOGOS.length} logos.`);
