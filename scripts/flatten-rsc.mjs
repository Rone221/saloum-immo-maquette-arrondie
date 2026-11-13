// Post-build pour GitHub Pages.
// L'export range les fichiers de préchargement en sous-dossiers
// (terrains/kounoune-2/__next.terrains/$d$slug/__PAGE__.txt), mais le navigateur
// les demande à plat (terrains/kounoune-2/__next.terrains.$d$slug.__PAGE__.txt).
// Sans hébergeur qui réécrit les URLs, on crée les copies à plat.
import { copyFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copies = 0;

function filesIn(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? filesIn(p) : [p];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of filesIn(p)) {
        const flat = `${name}.${relative(p, file).split(sep).join(".")}`;
        copyFileSync(file, join(dir, flat));
        copies++;
      }
    } else {
      walk(p);
    }
  }
}

walk(OUT);
// GitHub Pages ne doit pas passer le site dans Jekyll (dossiers en « _ »).
writeFileSync(join(OUT, ".nojekyll"), "");
console.log(`flatten-rsc : ${copies} fichiers de préchargement copiés à plat.`);
