// Garde-fous automatiques de la direction « Parcelle » (recherche/direction-arrondie.md).
// Parcourt src/, scripts/, public/ (noms des photos) et out/ après le build.
// Échoue s'il trouve une occurrence interdite.
//
// Ce qui change par rapport au « Relevé » : les rayons de l'échelle (bouton, photo,
// plaque), les icônes Phosphor et la bibliothèque motion sont permis. Les règles de
// faits, de mots et de photos ne bougent pas, et s'ajoutent celles de l'allègement :
// le groupe 2538 / 2553 / 2580 / 2421, les étiquettes supprimées, les dates en lettres.
//
// Le tiret cadratin est construit par String.fromCharCode : le caractère
// lui-même n'est écrit nulle part, ce fichier compris.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CADRATIN = String.fromCharCode(0x2014);

// Couleurs des jetons (globals.css), les seules autorisées en hexadécimal.
const COULEURS = new Set([
  "#FFFFFF", // blanc
  "#EEF2F7", // brume
  "#E1E8F1", // brume-2
  "#0E1A2B", // encre
  "#4B5A70", // encre-2
  "#D3DBE6", // filet
  "#004EBF", // bleu du logo
  "#003A91", // survol du bleu
  "#0084EF", // bleu vif du logo (focus)
  "#EB8624", // orange du logo
]);

const PHOTOS_INTERDITES =
  "2321|2322|2323|2335|2336|2337|2338|2339|2353|2354|2366|2392|2412|2420|2422|2510|2518|2531|2533|2543|2544|2548|2549";

/** Familles de règles. `ou` : à quels fichiers elles s'appliquent. */
const REGLES = [
  { nom: "tiret cadratin", re: new RegExp(CADRATIN, "g"), ou: "tout" },

  // Rayons : seulement ceux de l'échelle (rounded-bouton, rounded-photo, rounded-plaque,
  // et leurs variantes par côté, rounded-b-plaque…). Pas de pilule, pas de valeur libre.
  {
    nom: "classe : rayon hors échelle",
    re: /(?<![\w-])rounded-[\w[\]./%-]+/g,
    ou: "source",
    filtre: (m) => !/^rounded(-(t|r|b|l|tl|tr|bl|br|s|e|ss|se|es|ee))?-(bouton|photo|plaque|none)$/.test(m),
  },
  { nom: "classe : rayon nu", re: /(?<![\w-])rounded(?=["'\s`])/g, ou: "source" },
  { nom: "classe : ombre", re: /(?<![\w-])(shadow|drop-shadow|inset-shadow)-/g, ou: "code" },
  { nom: "classe : flou ou verre dépoli", re: /(?<![\w-])(blur|backdrop)-|backdrop-filter/g, ou: "source" },
  { nom: "classe : dégradé", re: /(?<![\w-])bg-(linear|radial|conic|gradient)|(?:linear|radial|conic)-gradient\(/g, ou: "source" },
  { nom: "classe : animation Tailwind", re: /(?<![\w-])animate-/g, ou: "source" },
  { nom: "couleur : violet", re: /\b(purple|violet|indigo|fuchsia|lilac)\b/gi, ou: "source" },

  // Icônes : Phosphor seulement. Aucun SVG d'icône dessiné à la main.
  { nom: "icône dessinée à la main", re: /<svg\b|<path\b/g, ou: "source" },

  {
    nom: "police interdite",
    re: /\b(Geist|Schibsted|Inter|Roboto|Poppins|Montserrat|Playfair|Fraunces|Space[ _]Grotesk|Instrument[ _]Serif|Plex)\b/g,
    ou: "code",
  },
  { nom: "police serif ou mono", re: /\bfont-(serif|mono)\b|ui-serif|ui-monospace|Georgia|monospace/g, ou: "source" },

  { nom: "dépendance interdite", re: /lucide|heroicons|framer-motion|react-icons/g, ou: "package" },

  { nom: "image de banque", re: /unsplash|pexels|picsum|i\.ytimg\.com/gi, ou: "code" },
  { nom: "photo interdite", re: new RegExp(`photos/(${PHOTOS_INTERDITES})\\b`, "g"), ou: "code" },

  {
    nom: "mot interdit",
    re: /Découvrez|Bienvenue|N['’]attendez plus|\bexcellence\b|\bleader\b|\bpremium\b|paiement échelonné|\b0 ?%|20 ans d|50K|\+123/gi,
    ou: "texte",
  },

  // Texte rendu (out/*.html) : promesses, étiquettes supprimées, corrections à ne jamais défaire.
  { nom: "promesse", re: /sans risque|\bgaranti(e|es|s)?\b|nous garantissons|délai de (délivrance|titre)/gi, ou: "rendu" },
  {
    nom: "étiquette supprimée",
    re: /Message envoyé|Message à compléter|Non publié|Annoncé en vidéo|\.{6,}|Statut foncier, dans nos dessins/g,
    ou: "rendu",
  },
  { nom: "date en chiffres (à écrire en lettres)", re: /(?<![\d/])\d{2}\.\d{2}\.\d{4}(?!\d)/g, ou: "rendu" },
  { nom: "SEN’EAU « validé »", re: /SEN.EAU[^.<]{0,60}valid|valid[^.<]{0,60}SEN.EAU/gi, ou: "rendu" },
  { nom: "Millennium City : aire de jeux", re: /aire de jeux/gi, ou: "rendu" },
  { nom: "Millennium City : « notre programme »", re: /Millennium City[^<]{0,160}notre programme|notre programme[^<]{0,160}Millennium/gi, ou: "rendu" },
  { nom: "Kounoune : terrassement « fini »", re: /Kounoune[^.<]{0,80}(terrassé|terminé|achevé)/gi, ou: "rendu" },


  // Message à compléter : les trous s'écrivent « … », jamais entre crochets.
  { nom: "gabarit entre crochets", re: /\[(lieu|surface|nom|ville)\]|%5B(lieu|surface)%5D/gi, ou: "code" },

  {
    nom: "couleur hors palette",
    re: /#[0-9A-Fa-f]{6}(?:[0-9A-Fa-f]{2})?(?![0-9A-Za-z_-])/g,
    ou: "style",
    filtre: (m) => !COULEURS.has(m.slice(0, 7).toUpperCase()),
  },
];

// Notes internes : les expressions interdites dans le code vivent hors du dépôt public,
// dans ../recherche/garde-fous-internes.txt (une expression par ligne, # pour un
// commentaire). Sans ce fichier, par exemple sur le serveur de déploiement, la règle
// est sautée : le contrôle se fait sur le poste, avant l'envoi.
const FICHIER_INTERNE = resolve(RACINE, "..", "recherche", "garde-fous-internes.txt");
if (existsSync(FICHIER_INTERNE)) {
  const termes = readFileSync(FICHIER_INTERNE, "utf8")
    .split(/\r?\n/)
    .map((ligne) => ligne.trim())
    .filter((ligne) => ligne && !ligne.startsWith("#"));
  if (termes.length) {
    REGLES.push({ nom: "note interne", re: new RegExp(termes.join("|"), "gi"), ou: "code" });
  }
}


// Fichiers à parcourir, rangés par nature.
const EXT_SOURCE = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".json", ".md"]);
const EXT_OUT = new Set([".html", ".css", ".txt", ".js", ".json"]);

function lister(dossier, extensions) {
  if (!existsSync(dossier)) return [];
  return readdirSync(dossier).flatMap((nom) => {
    const p = join(dossier, nom);
    if (statSync(p).isDirectory()) return lister(p, extensions);
    return extensions.has(extname(nom)) ? [p] : [];
  });
}

/** Ce qui est à nous, et ce que le build a produit. */
function nature(fichier) {
  const rel = relative(RACINE, fichier).split("\\").join("/");
  const ext = extname(fichier);
  const sortie = rel.startsWith("out/");
  // Le code de React, Next, motion et Phosphor dans out/ n'est pas le nôtre : seuls le
  // tiret cadratin et les images y sont cherchés. Nos composants sont vérifiés dans src/.
  const tiers = rel.startsWith("out/_next/static/chunks/") && ext === ".js";
  return { rel, ext, tiers, sortie };
}

function applicable(regle, { rel, ext, tiers, sortie }) {
  if (regle.ou === "tout") return true;
  if (regle.ou === "package") return rel === "package.json";
  if (rel === "package.json" || rel === "package-lock.json") return false;
  if (rel.startsWith("scripts/garde-fous")) return false; // les motifs eux-mêmes
  if (tiers) return regle.nom === "image de banque" || regle.nom === "photo interdite";
  if (regle.ou === "code") return true;
  // Nos sources seulement (src/, scripts/) : classes, icônes, polices.
  if (regle.ou === "source") return !sortie && [".ts", ".tsx", ".css", ".mjs", ".js"].includes(ext);
  // Le texte rendu : les pages HTML produites.
  if (regle.ou === "rendu") return sortie && ext === ".html";
  // Les mots : textes du site (sources et pages produites), pas les feuilles de style.
  if (regle.ou === "texte") return [".ts", ".tsx", ".html", ".txt", ".md"].includes(ext);
  // Les couleurs : feuilles de style, composants, pages.
  if (regle.ou === "style") return [".css", ".tsx", ".ts", ".html"].includes(ext);
  return false;
}

const fichiers = [
  ...lister(join(RACINE, "src"), EXT_SOURCE),
  ...lister(join(RACINE, "scripts"), EXT_SOURCE),
  join(RACINE, "package.json"),
  join(RACINE, "next.config.ts"),
  join(RACINE, "README.md"),
  ...lister(join(RACINE, "out"), EXT_OUT),
].filter((f) => existsSync(f));

const fautes = [];
for (const fichier of fichiers) {
  const n = nature(fichier);
  const texte = readFileSync(fichier, "utf8");
  for (const regle of REGLES) {
    if (!applicable(regle, n)) continue;
    for (const m of texte.matchAll(regle.re)) {
      if (regle.filtre && !regle.filtre(m[0])) continue;
      const ligne = texte.slice(0, m.index).split("\n").length;
      const extrait = texte.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).replace(/\s+/g, " ");
      fautes.push(`${n.rel}:${ligne}  [${regle.nom}]  ${m[0]}  …${extrait}…`);
    }
  }
}

// ------------------------------------------------------------ Règles par page
// Sur chaque page produite (out/**/index.html) :
// - une seule photo du groupe 2538 / 2553 / 2580 / 2421 (même lotissement) ;
// - une seule de 2493 / 2500, une seule de 2502 / 2505 (même instant) ;
// - un prix en FCFA toujours avec « avril 2025 » à côté ;
// - « Paradise City » seulement sur la fiche Sicap Keur Massar.
// Puis, sur l'ensemble : une photo hors programme sert sur deux pages au plus.

const GROUPES = [
  ["2538", "2553", "2580", "2421"],
  ["2493", "2500"],
  ["2502", "2505"],
];
// Photos de programme : elles suivent leur programme (carte, rangée, fiche).
const PHOTOS_PROGRAMME = new Set(["2534", "2616", "2580", "2413-droite"]);

const pages = lister(join(RACINE, "out"), new Set([".html"])).filter((f) => f.endsWith("index.html"));
const pagesParPhoto = new Map();
for (const fichier of pages) {
  const rel = relative(RACINE, fichier).split("\\").join("/");
  const html = readFileSync(fichier, "utf8");
  const ids = new Set([...html.matchAll(/photos\/([\w-]+?)-\d+\.webp/g)].map((m) => m[1]));
  for (const groupe of GROUPES) {
    const presents = groupe.filter((id) => ids.has(id));
    if (presents.length > 1) fautes.push(`${rel}  [même lieu ou même instant sur une page]  ${presents.join(", ")}`);
  }
  for (const id of ids) {
    if (!pagesParPhoto.has(id)) pagesParPhoto.set(id, []);
    pagesParPhoto.get(id).push(rel);
  }
  for (const m of html.matchAll(/FCFA/g)) {
    const autour = html.slice(Math.max(0, m.index - 260), m.index + 260);
    if (!/avril\s2025|avril 2025/.test(autour)) fautes.push(`${rel}  [prix sans sa date d’avril 2025]`);
  }
  if (!rel.includes("sicap-keur-massar") && /Paradise City/.test(html)) {
    fautes.push(`${rel}  [Paradise City hors de la fiche Sicap Keur Massar]`);
  }
}
for (const [id, liste] of pagesParPhoto) {
  if (PHOTOS_PROGRAMME.has(id) || liste.length <= 2) continue;
  fautes.push(`[photo sur plus de deux pages]  ${id} : ${liste.join(", ")}`);
}

// Les fichiers de photos publiés : aucun numéro interdit.
const dossierPhotos = join(RACINE, "public/photos");
if (existsSync(dossierPhotos)) {
  const interdit = new RegExp(`^(${PHOTOS_INTERDITES})\\b`);
  for (const nom of readdirSync(dossierPhotos)) {
    if (interdit.test(nom)) fautes.push(`public/photos/${nom}  [photo interdite]`);
  }
}

if (!existsSync(join(RACINE, "out"))) {
  console.warn("garde-fous : pas de dossier out/, seules les sources ont été vérifiées.");
}

if (fautes.length) {
  console.error(`garde-fous : ${fautes.length} occurrence(s) interdite(s).\n`);
  for (const f of fautes.slice(0, 200)) console.error("  " + f);
  process.exit(1);
}
console.log(`garde-fous : ${fichiers.length} fichiers et ${pages.length} pages vérifiés, rien à signaler.`);
