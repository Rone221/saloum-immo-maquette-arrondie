# Consignes pour les agents

Cette version de Next.js (16.4) a des changements cassants : API, conventions et arborescence peuvent différer de ce que vous connaissez. Avant d'écrire du code, lisez le guide concerné dans `node_modules/next/dist/docs/`, et tenez compte des avis de dépréciation.

`next dev` ne réécrit plus ce fichier : `agentRules: false` dans `next.config.ts` (voir `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/agentRules.md`).
