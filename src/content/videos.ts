// Vidéos publiées par Saloum Immo (contenu-maquette §9 ; dates et durées
// retrouvées dans l'inventaire). Toute vidéo s'ouvre sur sa plateforme, dans
// le même onglet : pas de lecteur intégré, pas de vignette tirée de YouTube.

export type Plateforme = "YouTube" | "Instagram" | "TikTok";

export type Video = {
  id: string;
  plateforme: Plateforme;
  /** Titre de lien par défaut. */
  titre: string;
  /** Libellé court dans la liste « À regarder avant d'appeler ». */
  titreListe?: string;
  /** AAAA-MM-JJ, date de publication. */
  date?: string;
  /** « 7 min 26 » */
  duree?: string;
  href: string;
  source: string;
};

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const VIDEOS = {
  presentation: {
    id: "CSF130Y_hRc",
    plateforme: "YouTube",
    titre: "Saloum Immo en deux minutes",
    titreListe: "Saloum Immo en deux minutes",
    date: "2026-07-24",
    duree: "1 min 58",
    href: yt("CSF130Y_hRc"),
    source: "contenu-maquette §9",
  },
  interviewDG: {
    id: "rpbEvdrm5AA",
    plateforme: "YouTube",
    titre: "Babacar Ndiaye explique les trois documents",
    duree: "7 min 26",
    href: yt("rpbEvdrm5AA"),
    source: "contenu-maquette §2 et §9",
  },
  lancementLacTown: {
    id: "qtAHrgDQd4U",
    plateforme: "YouTube",
    titre: "Lancement de Lac Town",
    titreListe: "Lancement de Lac Town",
    date: "2026-03-30",
    href: yt("qtAHrgDQd4U"),
    source: "contenu-maquette §5 et §9",
  },
  visiteLacTown: {
    id: "Wq8pwLDb4L0",
    plateforme: "YouTube",
    titre: "Visite commentée de Lac Town",
    titreListe: "Lac Town, visite commentée",
    date: "2026-05-21",
    href: yt("Wq8pwLDb4L0"),
    source: "contenu-maquette §9",
  },
  visiteSakina: {
    id: "HFnSMeaCXNI",
    plateforme: "YouTube",
    titre: "Visite virtuelle de Sakina City",
    titreListe: "Sakina City, visite virtuelle",
    href: yt("HFnSMeaCXNI"),
    source: "contenu-maquette §9",
  },
  lotsSKM: {
    id: "SG020Z9tq3o",
    plateforme: "YouTube",
    titre: "Les lots de Sicap Keur Massar",
    titreListe: "Sicap Keur Massar, les lots",
    date: "2026-06-10",
    // reseaux.md, chaîne YouTube relevée le 13.11.2026 : 2:02.
    duree: "2 min 02",
    href: yt("SG020Z9tq3o"),
    source: "contenu-maquette §9 (titrée « Paradise City » par le client)",
  },
  realisations2026: {
    id: "oj5Z_z2O1_k",
    plateforme: "YouTube",
    titre: "Nos réalisations 2026",
    titreListe: "Nos réalisations 2026",
    date: "2026-06-24",
    duree: "2 min 37",
    href: yt("oj5Z_z2O1_k"),
    source: "contenu-maquette §9",
  },
  nicad: {
    id: "Rrfi4zPWsbY",
    plateforme: "YouTube",
    titre: "Le NICAD expliqué en vidéo",
    duree: "1 min 12",
    href: yt("Rrfi4zPWsbY"),
    source: "contenu-maquette §6 ; inventaire",
  },
  terrassementKounoune: {
    id: "Hi1DiDoX_zA",
    plateforme: "YouTube",
    // « Lancement » : le 07.09.2024, le terrassement est lancé sur 3 hectares, pas fini.
    titre: "Lancement du terrassement sur 3 hectares à Kounoune",
    date: "2024-09-07",
    href: yt("Hi1DiDoX_zA"),
    source: "contenu-maquette §5",
  },
  reelLotsSKM: {
    id: "DfAoxMkAbKR",
    plateforme: "Instagram",
    titre: "Une collaboratrice présente un lot de Sicap Keur Massar",
    date: "2026-10-27",
    href: "https://www.instagram.com/saloum_immo/reel/DfAoxMkAbKR/",
    source: "contenu-maquette §5 ; Instagram",
  },
  reelDroneSKM: {
    id: "DfnIRfvPSRi",
    plateforme: "Instagram",
    titre: "Vue drone du quartier de Sicap Keur Massar",
    date: "2026-11-11",
    href: "https://www.instagram.com/saloum_immo/reel/DfnIRfvPSRi/",
    source: "contenu-maquette §5 ; Instagram",
  },
} satisfies Record<string, Video>;

export type CleVideo = keyof typeof VIDEOS;

/** « À regarder avant d'appeler » (page Diaspora, #videos), dans cet ordre. */
export const A_REGARDER: CleVideo[] = [
  "presentation",
  "lancementLacTown",
  "visiteLacTown",
  "visiteSakina",
  "lotsSKM",
  "realisations2026",
];

/** Publications TikTok citées comme sources (registre, offre aux propriétaires). */
export const TIKTOK = {
  offreProprietaires: "https://www.tiktok.com/@saloum_immo/video/7641206920111475975",
  electrification: "https://www.tiktok.com/@saloum_immo/video/7556624709337566475",
  adductionEau: "https://www.tiktok.com/@saloum_immo/video/7574024112855731467",
  controleSenEau: "https://www.tiktok.com/@saloum_immo/video/7574833892834708748",
};
