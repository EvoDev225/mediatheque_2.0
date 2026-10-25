// Médiathèque Evo : établissement fictif, toutes les informations ci-dessous sont inventées.
import espaceJeunesse from '../assets/img/espace-jeunesse.webp'
import espaceAdulte from '../assets/img/espace-adulte.webp'
import sallePolyvalente from '../assets/img/salle-polyvalente.webp'
import { C } from './books'

export { BOOKS, C } from './books'

export const NAME = 'Médiathèque Evo'

// Coordonnées volontairement fictives (le domaine .example est réservé et n'existe pas).
export const CONTACT = {
  phones: ['07 00 00 00 01', '07 00 00 00 02'],
  email: 'contact@mediatheque-evo.example',
  address: '12 allée des Savoirs, Abidjan',
  hours: 'Lun – Sam : 09h – 17h',
}

export const CATALOG = 3480
export const formatNumber = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

// Liens vers la page d'accueil : ils marchent aussi depuis la page des mentions légales.
const BASE = import.meta.env.BASE_URL
export const home = (anchor) => `${BASE}#${anchor}`
export const LEGAL_URL = `${BASE}mentions-legales.html`

export const NAV = [
  { label: 'Espaces', href: home('espaces') },
  { label: 'Services', href: home('services') },
  { label: 'À propos', href: home('histoire') },
  { label: 'Livres', href: home('collection') },
  { label: 'Contact', href: home('contact') },
]

export const FOOTER_LINKS = [
  { label: 'Accueil', href: home('top') },
  ...NAV,
  { label: 'Mentions légales & Politique de confidentialité', href: LEGAL_URL },
]

export const SOCIALS = [
  { label: 'Facebook', short: 'Fb', href: '#' },
  { label: 'WhatsApp', short: 'Wa', href: '#' },
  { label: 'LinkedIn', short: 'In', href: '#' },
]

export const MARQUEE_BG = [C.orange, C.cream, C.sky, C.yellow, C.pink, C.teal, C.cream, C.plum, C.orange]

export const CATEGORIES = ['Tous', 'Jeunesse', 'Roman', 'Histoire', "Côte d'Ivoire", 'Développement personnel', 'Sport', 'Guide pratique']

export const STATS = [
  { v: CATALOG, from: 0, sep: true, suf: '', label: 'ouvrages au catalogue' },
  { v: 2016, from: 1990, suf: '', label: 'année d’ouverture' },
  { v: 3, from: 0, suf: '', label: 'niveaux, du rez-de-chaussée au R+2' },
  { v: 150, from: 0, suf: '', label: 'places en salle polyvalente' },
  { v: 6, from: 0, suf: ' j/7', label: 'ouverture, du lundi au samedi' },
]

export const SERVICES = [
  { t: 'Wi-Fi & Ordinateurs', d: 'Ordinateurs connectés et accès Wi-Fi gratuit.' },
  { t: 'Consultation de livres', d: 'Consultez gratuitement nos ouvrages sur place, dans des salles calmes et confortables.' },
  { t: 'Impression & photocopie', d: 'Imprimez ou photocopiez vos documents sur place.' },
  { t: 'Formations numériques', d: 'Initiation à l’informatique, la bureautique et la recherche en ligne.' },
  { t: 'Aide aux démarches', d: 'Accompagnement pour vos formulaires et démarches en ligne.' },
  { t: 'Ateliers culturels', d: 'Ateliers créatifs et animations tous publics.' },
]

export const FLOORS = [
  {
    level: 'Rez-de-chaussée',
    code: 'RDC',
    name: 'Espace Jeunesse',
    sub: 'La bibliothèque des petits lecteurs',
    text: 'De la maternelle au collège, trois salles colorées pour lire, écouter des histoires et créer.',
    points: ['Albums et romans jeunesse', 'Heures du conte', 'Ateliers créatifs'],
    img: espaceJeunesse,
    alt: 'Espace jeunesse : étagères de livres et dessins d’enfants exposés',
  },
  {
    level: '1er étage',
    code: 'R+1',
    name: 'Espace Adulte',
    sub: 'Bibliothèque & espace numérique',
    text: 'Des salles de lecture calmes et un espace numérique équipé d’ordinateurs connectés.',
    points: ['Salles de lecture', 'Espace numérique', 'Postes de travail'],
    img: espaceAdulte,
    alt: 'Espace adulte : rayonnages de livres et tables de lecture',
  },
  {
    level: '2ème étage',
    code: 'R+2',
    name: 'Salle polyvalente',
    sub: 'Un espace modulable jusqu’à 150 personnes',
    text: 'Conférences, projections, rencontres d’auteurs et cérémonies.',
    points: ['Conférences', 'Projections', 'Rencontres d’auteurs'],
    img: sallePolyvalente,
    alt: 'Salle polyvalente aux rangées de sièges orange',
  },
]

export const TIMELINE = [
  { date: 'Mars 2016', title: 'Ouverture', text: 'La Médiathèque Evo ouvre ses portes avec une bibliothèque jeunesse et une bibliothèque adulte.' },
  { date: 'Oct. 2018', title: 'Espace numérique', text: 'Une salle d’ordinateurs connectés rejoint le premier étage.' },
  { date: 'Juin 2022', title: 'Salle polyvalente', text: 'Le deuxième étage accueille conférences, projections et événements.' },
  { date: 'Janv. 2025', title: 'Espaces rénovés', text: 'Nouveau mobilier et nouvel éclairage pour des salles plus confortables.' },
]

export const MISSIONS = [
  { label: 'Accès à l’information', dot: C.orange },
  { label: 'Lecture & littérature', dot: C.sky },
  { label: 'Éducation & apprentissage', dot: C.teal },
  { label: 'Culture & arts', dot: C.pink },
]

export const FAQS = [
  { q: 'Quels sont les horaires d’ouverture ?', a: 'Du lundi au samedi, de 09h à 17h.' },
  { q: 'Comment obtenir une carte de lecteur ?', a: 'Présentez-vous à l’accueil avec une pièce d’identité : notre équipe vous accompagne pour l’inscription.' },
  { q: 'Puis-je emprunter des livres à domicile ?', a: 'Non, les ouvrages se consultent sur place uniquement, dans des salles calmes et confortables.' },
  { q: 'Quels types de documents puis-je consulter ?', a: 'Albums et romans jeunesse, romans, ouvrages d’histoire, guides pratiques et ressources numériques depuis l’espace numérique.' },
  { q: 'Proposez-vous une aide à la recherche ?', a: 'Oui, nos bibliothécaires vous orientent dans vos recherches documentaires, sur place comme en ligne.' },
]
