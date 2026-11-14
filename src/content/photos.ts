// Photos du client publiées sur le site (spécification 4.3). Les fichiers sont
// dans public/photos/ (variantes WebP produites par scripts/photos.mjs) ; leurs
// dimensions sont dans public/photos/photos.json.
//
// Règles : la légende décrit ce qu'on voit, sans lieu ni programme non publié,
// sans date de prise de vue. Le texte alternatif décrit la scène. Personne n'est
// nommé, sauf Babacar Ndiaye. Jamais deux photos du même lieu ou du même instant
// sur une page (2493 et 2500 sont du même instant : une seule des deux ; 2502 et
// 2505 aussi, mêmes personnes et même récepteur). 2538, 2553, 2580 et 2421 montrent
// le même lotissement : jamais deux sur une page. Dans cette maquette, seule 2580 sert
// (carte et fiche Lac Town) ; 2538 et 2421 ne servent plus (allegement 3).

import type { Statut } from "./types";

export type FichePhoto = {
  /** Phrase qui décrit la scène. Vide pour une vignette décorative. */
  alt: string;
  /** Légende type, sous la photo. */
  legende?: string;
  /** Cadrage par défaut (object-position). */
  position?: string;
  /**
   * Largeur dessinée maximale, en px CSS (revue 2) : 2534 au-delà de 440 px laisse lire
   * le panneau ; 2413-droite et les captures ig-* sont des fichiers étroits, jamais
   * agrandis. Vérifié à l'écran par la capture de contrôle, pas au build.
   */
  largeurMax?: number;
  statut: Statut;
  /** Usage prévu et réserves. */
  note: string;
};

const FICHES = {
  "2538-plan": {
    alt: "Vue zénithale d’un lotissement : îlots terrassés séparés par des voies en latérite.",
    legende: "Vue zénithale prise au drone par Saloum Immo.",
    statut: "a-valider",
    note: "Ouverture. Recadrage x 360 à 1 740, y 90 à 1 330 de 2538. Lieu non publié : jamais de nom de programme. Même lotissement que 2580 et 2421 d'après l'image : jamais sur la même page que 2580.",
  },
  "2580": {
    alt: "Vue drone d’un îlot aménagé : voies en latérite bordées, parcelles terrassées, au bord d’un quartier construit.",
    legende: "Vue drone du site. Voies ouvertes et bordées, parcelles terrassées.",
    position: "44% 100%",
    statut: "a-valider",
    note: "Lac Town, photo principale (accueil, page Terrains, fiche). La légende ne nomme pas le lieu. Même lotissement que 2538, 2553 et 2421 : jamais sur la même page qu'elles.",
  },
  "2421": {
    alt: "",
    statut: "ok",
    note: "Vignette de la visite commentée de Lac Town, placée par le client. Logo incrusté : petite taille seulement (152 px).",
  },
  "2534": {
    alt: "Panneau Sakina City planté au bord d’une voie en latérite, derrière une bordure béton.",
    legende: "Le panneau du programme, au bord d’une voie en latérite bordée de béton.",
    position: "50% 10%",
    largeurMax: 440,
    statut: "ok",
    note: "Sakina City : cartes et fiche. Cadrée sur le panneau, 440 px de large au plus.",
  },
  "2413-droite": {
    alt: "Voie en latérite neuve entre deux bordures béton, maisons au loin.",
    legende: "Voie en latérite et bordures béton.",
    largeurMax: 600,
    statut: "ok",
    note: "Fiche Sakina City et couverture de sa visite virtuelle. Photo de droite de la planche 2413, sans logo ni titre incrusté. 600 px de large au plus.",
  },
  "2616": {
    alt: "Vue drone d’un quartier qui se construit : maisons neuves et pistes en latérite sous un ciel turquoise.",
    legende: "Vue drone du secteur.",
    position: "50% 62%",
    statut: "a-valider",
    note: "Sicap Keur Massar, bande 21:8 (16:10 sur mobile). Probablement ce site : pas de date, pas de nom de lotissement.",
  },
  "ig-DfnIRfvPSRi": {
    alt: "Vue drone d’un quartier en construction, traversé de pistes en latérite.",
    legende: "Vue drone du quartier.",
    largeurMax: 899,
    statut: "ok",
    note: "Réserve. Capture Instagram basse définition, du même survol que 2616 : pas sur la fiche Sicap Keur Massar, qui a déjà 2616 (4.4). La vidéo y est en lien texte.",
  },
  "ig-DfAoxMkAbKR": {
    alt: "Une collaboratrice en casque et gilet Saloum Immo parle face caméra, sur un lot de Sicap Keur Massar.",
    legende: "Une collaboratrice présente un lot de Sicap Keur Massar, sur place.",
    largeurMax: 899,
    statut: "a-valider",
    note: "Vignette du reel du 27.10.2026 (Diaspora). Personne n'est nommé. 899 px de large au plus.",
  },
  "ig-DZUeyGKPdj_": {
    alt: "Babacar Ndiaye, assis derrière un bureau, face caméra.",
    legende: "Babacar Ndiaye, pendant l’interview publiée le 8 juin 2026.",
    position: "74% 40%",
    largeurMax: 899,
    statut: "a-valider",
    note: "Fondateur. Le logo incrusté en haut à gauche doit sortir du cadre. 899 px de large : jamais agrandie au-delà.",
  },
  // Étape 1 : débroussaillage et terrassement
  "2493": {
    alt: "Chargeuse sur un terrain en préparation, un homme en gilet Saloum Immo devant.",
    legende: "Chargeuse sur un terrain en préparation.",
    position: "50% 62%",
    statut: "ok",
    note: "Étape 1. Même instant que 2500 : une seule des deux sur une page.",
  },
  "2500": {
    alt: "Un ouvrier en gilet porte une planche devant une chargeuse.",
    legende: "Ouvrier et chargeuse sur le chantier.",
    position: "50% 50%",
    statut: "ok",
    note: "Page Aménager, étape 1. Même instant que 2493.",
  },
  "2495": {
    alt: "Une chargeuse pousse la terre sur un terrain dégagé.",
    legende: "Chargeuse sur un terrain dégagé.",
    position: "50% 50%",
    statut: "ok",
    note: "Page Aménager, étape 1.",
  },
  "2494": {
    alt: "Une pelleteuse et un tas de terre au bord d’un terrain.",
    legende: "Pelleteuse sur un terrain en préparation.",
    position: "50% 55%",
    statut: "ok",
    note: "Page Aménager, étape 1.",
  },
  // Étape 2 : tracé et bornage. 2528 (borne peinte) n'est pas dans la planche : en
  // 4:3, aucun cadrage ne garde à la fois la tête du membre de l'équipe et la borne
  // numérotée (4.1, pas de tête coupée).
  "2505": {
    alt: "Trois hommes autour d’un récepteur GPS sur canne, au bord d’une voie.",
    legende: "Relevé au GPS sur le chantier.",
    position: "50% 35%",
    statut: "ok",
    note: "Réserve. Même instant que 2502 : une seule des deux sur une page.",
  },
  "2502": {
    alt: "Deux hommes font un relevé au GPS le long de bordures béton.",
    legende: "Relevé topographique le long des bordures.",
    position: "50% 35%",
    statut: "ok",
    note: "Étape 2 (accueil et page Aménager). Même instant que 2505.",
  },
  // Étape 3 : voie en latérite
  "2542": {
    alt: "Terrain défriché. Un camion benne chargé de latérite sur une voie tracée, piquets plantés.",
    legende: "Latérite livrée sur une voie tracée, piquets plantés.",
    position: "50% 30%",
    statut: "a-valider",
    note: "Étape 3. Lieu inconnu.",
  },
  // 2501 (bordures béton) n'est pas dans la planche : calée sur les bordures, elle
  // coupait les deux ouvriers au cou ; calée sur eux, elle perdait les bordures.
  "2529": {
    alt: "Deux ouvriers travaillent au bord d’une voie en latérite, près d’un poteau.",
    legende: "Travaux le long d’une voie en latérite.",
    position: "50% 50%",
    statut: "ok",
    note: "Page Aménager, étape 3.",
  },
  // Étape 4 : adduction d'eau
  "2355": {
    alt: "Tranchée le long d’une rangée d’eucalyptus : un agent SEN’EAU, un membre de l’équipe en gilet, un ouvrier qui creuse.",
    legende: "Tranchée d’adduction avec un agent SEN’EAU.",
    position: "50% 62%",
    statut: "a-valider",
    note: "Étape 4. Lieu inconnu. Jamais accolée au chiffre de 58 parcelles.",
  },
  "2327-haut": {
    alt: "Deux hommes, dont un agent en gilet SEN’EAU, montrent l’emplacement des tuyaux posés au sol.",
    legende: "Pose de tuyaux d’adduction.",
    position: "50% 50%",
    statut: "ok",
    note: "Page Aménager, étape 4. Coupée au-dessus du bandeau incrusté.",
  },
  // Étape 5 : électricité
  "2516": {
    alt: "Pose d’un poteau électrique en béton. Un homme en gilet et casquette Saloum Immo guide le levage.",
    legende: "Pose d’un poteau béton.",
    position: "50% 30%",
    statut: "a-valider",
    note: "Étape 5. Lieu inconnu.",
  },
  "2517": {
    alt: "Trois hommes redressent un poteau béton.",
    legende: "Levage d’un poteau.",
    position: "50% 40%",
    statut: "ok",
    note: "Page Aménager, étape 5. Probablement le même chantier que 2516.",
  },
  "2519": {
    alt: "Un ouvrier déroule un câble électrique au pied d’un poteau.",
    legende: "Déroulage du câble.",
    position: "50% 60%",
    statut: "ok",
    note: "Page Aménager, étape 5.",
  },
  // À propos
  // Cadrage vérifié à l'écran à 390 et 1 440 px : à 50 % 55 % (valeur de 4.3), les
  // têtes des deux hommes debout sortent du cadre 4:3 ; à 50 % 15 %, personne n'est coupé (4.1).
  "2499": {
    alt: "Trois membres de l’équipe en gilet sur un chantier, l’un d’eux gâche du mortier.",
    legende: "L’équipe sur un chantier.",
    position: "50% 15%",
    statut: "a-valider",
    note: "À propos. Visages : pas de nom.",
  },
  "2537": {
    alt: "Rond-point à l’entrée de Millennium City, trois personnes posent devant.",
    // La légende décrit la scène, sans lieu : sous « Réalisations », « Entrée de Millennium
    // City » se lirait comme une entrée faite par Saloum Immo (seule la canalisation l'est).
    legende: "Trois personnes posent devant un rond-point.",
    statut: "a-valider",
    note: "À propos, réalisations. Personne n'est nommé. Toujours « travaux réalisés », jamais « notre programme ».",
  },
  // Diaspora (optionnelle)
  "2364": {
    alt: "Un drone replié et sa radiocommande posés sur une table.",
    legende: "Drone et radiocommande.",
    statut: "ok",
    note: "Diaspora, station 2 (optionnelle). 16:9, petite.",
  },
  // Les photos de visites avec clients (visages) ne sont pas publiées.
  // Contact. Le bas de 2352 (y 650 à 810), avec l'affiche de la vitrine, n'est pas publié.
  "2352-haut": {
    alt: "Façade de l’agence Saloum Immo, enseigne bleue au-dessus de la porte vitrée.",
    legende: "L’agence et son enseigne.",
    position: "53% 50%",
    statut: "ok",
    note: "Contact. Photo 2352 coupée au-dessus de l'affiche de la vitrine.",
  },
} satisfies Record<string, FichePhoto>;

export type PhotoId = keyof typeof FICHES;

export const PHOTOS: Record<PhotoId, FichePhoto> = FICHES;
