// Messages WhatsApp pré-rédigés (spécification 6.3 et 7). Ce sont des textes
// de microcopie, pas des faits. Le texte affiché sous le bouton et le
// paramètre « text= » du lien viennent de la même chaîne : ne jamais les dupliquer.

export type Message = {
  texte: string;
  /** true : message à compléter ; les trous s'écrivent « … », jamais entre crochets. */
  gabarit?: boolean;
};

export const MESSAGES = {
  lacTown: { texte: "Bonjour, je voudrais les prix et les lots disponibles à Lac Town." },
  sakinaCity: { texte: "Bonjour, je voudrais le prix d’une parcelle à Sakina City." },
  sicapKeurMassar: { texte: "Bonjour, quels lots restent disponibles à Sicap Keur Massar, et à quel prix ?" },
  recasementAibd: { texte: "Bonjour, l’offre Recasement AIBD est-elle encore disponible ?" },
  proprietaire: {
    texte: "Bonjour, j’ai un terrain à …, d’environ … m². Je voudrais le faire aménager.",
    gabarit: true,
  },
  diaspora: { texte: "Bonjour, je vis à l’étranger. Je voudrais voir en vidéo les terrains disponibles." },
  question: { texte: "Bonjour, j’ai une question sur vos terrains." },
  // Proposés par la spécification (6.3).
  foncier: { texte: "Bonjour, je voudrais faire vérifier les documents d’un terrain." },
  bayakh: { texte: "Bonjour, je voudrais des informations sur le site de Bayakh." },
  niague: { texte: "Bonjour, je voudrais des informations sur le projet de Niague." },
} satisfies Record<string, Message>;

export type CleMessage = keyof typeof MESSAGES;
