// Fichier sans import d'images : il est aussi lu par scripts/fetch-covers.mjs (Node).

export const C = {
  forest: '#064C37',
  orange: '#FF6A00',
  sky: '#43A1D7',
  cream: '#F7F4EE',
  ink: '#161015',
  plum: '#292229',
  yellow: '#F6C445',
  pink: '#F28DB2',
  teal: '#1E9E8F',
}

// `id` = nom du fichier de couverture dans src/assets/covers/<id>.webp
export const BOOKS = [
  { id: 'aya-de-yopougon', t: 'Aya de Yopougon', a: 'Marguerite Abouet', y: 2005, c: 'Jeunesse', p: 'Espace Enfant', bg: C.orange },
  { id: 'allah-n-est-pas-oblige', t: 'Allah n’est pas obligé', a: 'Ahmadou Kourouma', y: 2000, c: 'Roman', p: 'Espace Adulte', bg: C.forest },
  { id: 'le-pagne-noir', t: 'Le Pagne noir', a: 'Bernard B. Dadié', y: 1955, c: 'Jeunesse', p: 'Espace Enfant', bg: C.yellow },
  { id: 'reine-pokou', t: 'Reine Pokou', a: 'Véronique Tadjo', y: 2004, c: 'Histoire', p: 'Espace Adulte', bg: C.pink },
  { id: 'les-soleils-des-independances', t: 'Les Soleils des indépendances', a: 'Ahmadou Kourouma', y: 1968, c: "Côte d'Ivoire", p: 'Espace Adulte', bg: C.cream },
  // noCover : la seule image d'Open Library est un scan flou de la page de titre
  { id: 'climbie', t: 'Climbié', a: 'Bernard B. Dadié', y: 1956, c: "Côte d'Ivoire", p: 'Espace Adulte', bg: C.plum, noCover: true },
  { id: 'l-aventure-ambigue', t: 'L’Aventure ambiguë', a: 'Cheikh Hamidou Kane', y: 1961, c: 'Roman', p: 'Espace Adulte', bg: C.teal },
  { id: 'une-si-longue-lettre', t: 'Une si longue lettre', a: 'Mariama Bâ', y: 1979, c: 'Roman', p: 'Espace Adulte', bg: C.orange },
  { id: 'petit-pays', t: 'Petit Pays', a: 'Gaël Faye', y: 2016, c: 'Roman', p: 'Espace Adulte', bg: C.cream },
]
