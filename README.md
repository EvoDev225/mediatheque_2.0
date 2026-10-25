# Médiathèque Evo — landing page (projet fictif)

Landing page en React + Vite d'une médiathèque **fictive**, réalisée à titre de démonstration (portfolio).
Nom, adresse, contacts, histoire et chiffres sont inventés (voir `src/data/content.js`).

## Commandes

```bash
npm install       # installe les dépendances
npm run dev       # serveur de dev : http://localhost:5173
npm run build     # version de production dans dist/
npm run preview   # sert dist/ en local
npm run lint      # vérifie le code (oxlint)
npm run images -- <dossier>   # convertit les photos d'un dossier en WebP (src/assets/img)
npm run covers    # télécharge les couvertures manquantes depuis Open Library (src/assets/covers)
```

## Pages

- `index.html` → accueil (`src/main.jsx` → `App.jsx`)
- `mentions-legales.html` → mentions légales & confidentialité (`src/legal.jsx` → `components/Legal.jsx`)

Sur Vercel, `vercel.json` (`cleanUrls`) sert aussi la page à l'adresse `/mentions-legales`.

## Structure

```
src/
  App.jsx              ordre des sections
  data/legal.js        éditeur, hébergeur, date de mise à jour des mentions légales
  data/content.js      tous les textes, chiffres, contacts, FAQ → à modifier ici
  data/books.js        livres affichés (+ couleurs) ; `id` = nom du fichier de couverture
  data/cover.js        couleurs des couvertures + association livre → image
  hooks/               media queries, parallax, défilement vers les ancres
  components/          une section = un composant + son CSS
  styles/global.css    tokens (couleurs, typo, rayons) et boutons
  assets/img/          photos Unsplash optimisées (WebP), crédits dans data/legal.js
  assets/covers/       couvertures de livres (WebP), servies avec le site
```

## À savoir

- Les couvertures sont dans le projet (aucun appel à Open Library quand on visite le site).
  Pour ajouter un livre : l'ajouter dans `data/books.js`, lancer `npm run covers`, vérifier l'image.
  Sans fichier `<id>.webp`, le livre garde une couverture typographique. Pour l'imposer
  (image trouvée mais moche), ajouter `noCover: true` au livre : le script l'ignorera (cas de « Climbié »).
- Le formulaire de contact est une démonstration : il n'envoie rien.
- Les liens Facebook / WhatsApp / LinkedIn pointent vers `#` : à renseigner.
- Si tu ajoutes un jour des statistiques de visite, des cookies ou un vrai envoi de formulaire,
  mets à jour les sections « Données personnelles » et « Cookies » de `components/Legal.jsx`.
- Toutes les animations se coupent si le visiteur a activé « réduire les animations ».
# mediatheque_2.0
