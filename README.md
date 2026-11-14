# Saloum Immo : maquette arrondie

Seconde proposition de site, direction « Parcelle » : des surfaces aux coins arrondis posées sur du blanc, les photos du client en grand, un contenu allégé. Même contenu que la maquette « Relevé », autre forme.

Depuis la revue 2 : vraies cartes pour les programmes, les documents fonciers et les vidéos, carrousels accessibles (défilement natif, boutons, sans lecture automatique), diaporama des étapes du chantier en ouverture, apparitions au défilement en CSS. Les vidéos s'ouvrent sur leur plateforme, avec une de nos photos ou une couverture écrite, jamais une vignette tirée de YouTube.

## Lancer en local

```bash
npm ci
npm run dev
```

Puis ouvrir http://localhost:3000. Pour faire tourner plusieurs serveurs de développement côte à côte, chacun prend son dossier de travail : `NEXT_DIST_DIR=.next-accueil npx next dev -p 3001`.

## Construire

```bash
npm run build
```

Le build enchaîne trois étapes : `next build` (export statique dans `out/`), `scripts/flatten-rsc.mjs` (copie à plat des fichiers de préchargement), puis `scripts/garde-fous.mjs`, qui échoue sur une couleur, un rayon, une icône, une police, un mot ou une photo interdits.

Après un build, `npm run liens` vérifie que chaque lien, image, script, feuille de style et police des pages d'`out/` mène à un fichier existant.

## Mettre en ligne

Deux variables, lues au build :

- `NEXT_PUBLIC_BASE_PATH` : le sous-chemin du site, par exemple `/saloum-immo-arrondie` sur GitHub Pages. Vide en local.
- `NEXT_PUBLIC_SITE_ORIGIN` : l'origine du site publié, par exemple `https://<compte>.github.io`. Elle sert aux adresses absolues des cartes de partage (`og:image`, `twitter:image`). Sans elle, ces adresses pointent vers `http://localhost:3000` et l'aperçu d'un lien partagé sur WhatsApp sort sans image.

```bash
NEXT_PUBLIC_BASE_PATH=/saloum-immo-arrondie NEXT_PUBLIC_SITE_ORIGIN=https://<compte>.github.io npm run build
```

Sous Git Bash (Windows), préfixer par `MSYS_NO_PATHCONV=1`, sinon le sous-chemin est converti en chemin Windows et le build s'arrête. Pour GitHub Pages, le workflow de la maquette « Relevé » (`.github/workflows/deploy.yml`) se reprend tel quel : il passe ces deux variables.

## Où modifier quoi

- `src/content/` : tous les faits affichés, chacun avec sa source et son statut (`ok` ou `a-valider`). Rien n'est écrit en dur dans les composants.
- `src/components/` : les composants partagés (liste et props en tête de `recherche/direction-arrondie.md`).
- `src/app/globals.css` : les jetons (couleurs, tailles, rayons, points de rupture).
- `public/photos/` : variantes WebP des photos du client, produites par `npm run photos`.
