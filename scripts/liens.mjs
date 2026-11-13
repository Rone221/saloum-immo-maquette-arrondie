// Contrôle des liens de l'export statique (out/), après `npm run build`.
//
// - Chaque href, src, srcset et imagesrcset interne des pages HTML pointe vers un
//   fichier d'out/ (trailingSlash : « /terrains/ » vaut « /terrains/index.html »).
// - Chaque ancre (#…) existe dans la page visée.
// - Avec NEXT_PUBLIC_BASE_PATH (GitHub Pages), chaque chemin absolu porte le préfixe.
// - Les url() des feuilles de style (polices) mènent à un fichier existant.
// - Les liens externes distincts sont listés et leur forme vérifiée.
//
// Usage : node scripts/liens.mjs (même NEXT_PUBLIC_BASE_PATH qu'au build).

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(RACINE, "out");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

if (!existsSync(OUT)) {
  console.error("liens : pas de dossier out/, lancer npm run build d'abord.");
  process.exit(1);
}

function lister(dossier, filtre) {
  return readdirSync(dossier).flatMap((nom) => {
    const p = join(dossier, nom);
    if (statSync(p).isDirectory()) return lister(p, filtre);
    return filtre(nom) ? [p] : [];
  });
}

const rel = (f) => relative(OUT, f).split(sep).join("/");
const decoder = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");

/** Fichier d'out/ servi pour un chemin d'URL (sans préfixe), ou null. */
function fichierPour(chemin) {
  let c;
  try {
    c = decodeURIComponent(chemin);
  } catch {
    c = chemin;
  }
  const p = join(OUT, c);
  if (c.endsWith("/")) return existsSync(join(p, "index.html")) ? join(p, "index.html") : null;
  if (existsSync(p) && statSync(p).isFile()) return p;
  return null;
}

const pages = lister(OUT, (n) => n.endsWith(".html"));
const ids = new Map();
function idsDe(fichier) {
  if (!ids.has(fichier)) {
    const html = readFileSync(fichier, "utf8");
    ids.set(fichier, new Set([...html.matchAll(/\s(?:id|name)="([^"]+)"/g)].map((m) => m[1])));
  }
  return ids.get(fichier);
}

const fautes = [];
const externes = new Map(); // url -> pages
let internes = 0;

/** Contrôle d'une URL trouvée dans `source` (page HTML), relative à `dossierUrl`. */
function verifier(url, source, dossierUrl, attribut) {
  if (!url || url.startsWith("data:") || url.startsWith("blob:")) return;
  if (/^(https?:|mailto:|tel:)/.test(url)) {
    if (!externes.has(url)) externes.set(url, new Set());
    externes.get(url).add(rel(source));
    return;
  }
  if (/^[a-z]+:/i.test(url)) {
    fautes.push(`${rel(source)} : schéma inconnu ${url}`);
    return;
  }
  internes++;
  const [avantAncre, ancre] = url.split("#");
  const chemin = avantAncre.split("?")[0];
  let cible;
  if (chemin === "") {
    cible = source; // « #videos » : la page même
  } else {
    let absolu;
    if (chemin.startsWith("/")) {
      if (BASE && chemin !== BASE && !chemin.startsWith(`${BASE}/`)) {
        fautes.push(`${rel(source)} : ${attribut} sans le préfixe ${BASE} : ${url}`);
        return;
      }
      absolu = chemin.slice(BASE.length) || "/";
    } else {
      absolu = new URL(chemin, `http://x${dossierUrl}`).pathname;
    }
    cible = fichierPour(absolu);
    if (!cible) {
      const dossier = join(OUT, decodeURIComponent(absolu), "index.html");
      fautes.push(
        existsSync(dossier)
          ? `${rel(source)} : ${url} mène à une page sans barre finale (trailingSlash)`
          : `${rel(source)} : ${attribut} vers un fichier absent d'out/ : ${url}`,
      );
      return;
    }
  }
  if (ancre !== undefined && ancre !== "" && cible.endsWith(".html") && !idsDe(cible).has(decodeURIComponent(ancre))) {
    fautes.push(`${rel(source)} : ancre #${ancre} absente de ${rel(cible)}`);
  }
}

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  // Adresse de la page, pour résoudre les chemins relatifs.
  const r = rel(page);
  const dossierUrl = `/${r.endsWith("index.html") ? r.slice(0, -"index.html".length) : r}`;
  for (const m of html.matchAll(/<[a-z]+\b[^>]*>/gi)) {
    const balise = m[0];
    // Les noms d'attributs HTML ignorent la casse : React écrit « imageSrcSet ».
    for (const a of balise.matchAll(/\s(href|src|srcset|imagesrcset)="([^"]*)"/gi)) {
      const attribut = a[1].toLowerCase();
      const valeur = decoder(a[2]);
      if (attribut === "srcset" || attribut === "imagesrcset") {
        for (const morceau of valeur.split(",")) verifier(morceau.trim().split(/\s+/)[0], page, dossierUrl, attribut);
      } else {
        verifier(valeur, page, dossierUrl, attribut);
      }
    }
  }
}

// Feuilles de style : polices et images en url().
const feuilles = lister(OUT, (n) => n.endsWith(".css"));
let urlsCss = 0;
for (const css of feuilles) {
  const texte = readFileSync(css, "utf8");
  for (const m of texte.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
    const url = m[1];
    if (url.startsWith("data:") || url.startsWith("#")) continue;
    urlsCss++;
    if (url.startsWith("/") && BASE && !url.startsWith(`${BASE}/`)) {
      fautes.push(`${rel(css)} : url() sans le préfixe ${BASE} : ${url}`);
      continue;
    }
    const absolu = url.startsWith("/") ? url.slice(BASE.length) : new URL(url, `http://x/${rel(css)}`).pathname;
    if (!fichierPour(absolu.split("?")[0])) fautes.push(`${rel(css)} : url() vers un fichier absent : ${url}`);
  }
}

// Liens externes : forme attendue par famille.
const FORMES = [
  { famille: "wa.me", re: /^https:\/\/wa\.me\/221774007575(\?text=[^\s]+)?$/ },
  { famille: "tel:", re: /^tel:\+221(77|33)\d{7}$/ },
  { famille: "mailto:", re: /^mailto:info@saloumimmo\.com$/ },
  { famille: "youtube", re: /^https:\/\/www\.youtube\.com\/(watch\?v=[\w-]{11}|@saloumimobat)$/ },
  { famille: "tiktok", re: /^https:\/\/www\.tiktok\.com\/@saloum_immo(\/video\/\d{19})?$/ },
  { famille: "instagram", re: /^https:\/\/www\.instagram\.com\/saloum_immo\/(reel\/[\w-]{11}\/)?$/ },
  { famille: "facebook", re: /^https:\/\/www\.facebook\.com\/\d+\/$/ },
  { famille: "linkedin", re: /^https:\/\/www\.linkedin\.com\/company\/saloum-immo\/$/ },
];
const parFamille = new Map();
for (const url of [...externes.keys()].sort()) {
  const forme = FORMES.find((f) => url.startsWith(f.famille === "wa.me" ? "https://wa.me" : f.famille === "tel:" || f.famille === "mailto:" ? f.famille : `https://www.${f.famille}.com`));
  const famille = forme?.famille ?? "autre";
  if (!parFamille.has(famille)) parFamille.set(famille, []);
  parFamille.get(famille).push(url);
  if (!forme) fautes.push(`lien externe hors des familles attendues : ${url}`);
  else if (!forme.re.test(url)) fautes.push(`lien ${famille} mal formé : ${url}`);
  if (famille === "wa.me" && url.includes("?text=")) {
    try {
      const texte = decodeURIComponent(url.split("?text=")[1]);
      if (/%[0-9A-F]{2}/i.test(texte)) fautes.push(`message WhatsApp encodé deux fois : ${url}`);
    } catch {
      fautes.push(`message WhatsApp illisible : ${url}`);
    }
  }
}

console.log(`liens : ${pages.length} pages, ${internes} liens internes, ${urlsCss} url() de CSS${BASE ? `, préfixe ${BASE}` : ""}.`);
console.log(`liens externes distincts : ${externes.size}`);
for (const [famille, urls] of parFamille) {
  console.log(`  ${famille} (${urls.length})`);
  for (const u of urls) {
    const texte = famille === "wa.me" && u.includes("?text=") ? `  « ${decodeURIComponent(u.split("?text=")[1])} »` : "";
    console.log(`    ${famille === "wa.me" ? u.split("?")[0] + (texte ? " ?text=" : "") : u}${texte}`);
  }
}
if (fautes.length) {
  console.error(`\nliens : ${fautes.length} faute(s).`);
  for (const f of fautes.slice(0, 200)) console.error(`  ${f}`);
  process.exit(1);
}
console.log("liens : rien à signaler.");
