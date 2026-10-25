import { home, NAME } from '../data/content'
import { EDITOR, HOST, PHOTO_CREDITS, UPDATED } from '../data/legal'
import { useHashScroll } from '../hooks/useHashScroll'
import './Legal.css'

const SECTIONS = [
  { id: 'fictif', label: 'Projet fictif' },
  { id: 'editeur', label: 'Éditeur du site' },
  { id: 'hebergeur', label: 'Hébergeur' },
  { id: 'propriete', label: 'Propriété intellectuelle' },
  { id: 'responsabilite', label: 'Responsabilité' },
  { id: 'donnees', label: 'Données personnelles' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'droits', label: 'Vos droits' },
  { id: 'droit', label: 'Droit applicable' },
]

const Mail = ({ to }) => <a href={`mailto:${to}`}>{to}</a>

export default function Legal() {
  useHashScroll()

  return (
    <main className="legal">
      <header className="legal__hero">
        <div className="legal__hero-inner">
          <span className="legal__badge">Informations légales</span>
          <h1>
            Mentions légales <em>&</em> confidentialité
          </h1>
          <p>Dernière mise à jour : {UPDATED}</p>
        </div>
      </header>

      <div className="legal__body">
        <nav className="legal__toc" aria-label="Sommaire">
          <span className="eyebrow">Sommaire</span>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal__content">
          <section id="fictif">
            <h2>Projet fictif</h2>
            <p>
              La {NAME} n’existe pas. Ce site est un projet de démonstration (portfolio) réalisé par {EDITOR.name} :
              le nom, l’adresse, les numéros de téléphone, l’adresse email, l’histoire, les chiffres et les
              informations pratiques sont inventés.
            </p>
            <p>
              Le projet s’inspire librement de l’univers des médiathèques publiques ivoiriennes, sans lien ni
              affiliation avec aucun établissement, aucune collectivité ni aucune marque existants. Le formulaire de
              contact est une démonstration : il n’envoie et n’enregistre aucune donnée.
            </p>
          </section>

          <section id="editeur">
            <h2>Éditeur du site</h2>
            <p>Ce site est conçu, développé et édité par :</p>
            <dl>
              <dt>Éditeur</dt>
              <dd>
                {EDITOR.name} — {EDITOR.status}
              </dd>
              <dt>Localisation</dt>
              <dd>{EDITOR.location}</dd>
              <dt>Contact</dt>
              <dd>
                <Mail to={EDITOR.email} />
              </dd>
              <dt>Directeur de la publication</dt>
              <dd>{EDITOR.name}</dd>
            </dl>
          </section>

          <section id="hebergeur">
            <h2>Hébergeur</h2>
            <dl>
              <dt>Société</dt>
              <dd>{HOST.name}</dd>
              <dt>Adresse</dt>
              <dd>{HOST.address}</dd>
              <dt>Site</dt>
              <dd>
                <a href={HOST.url} target="_blank" rel="noreferrer">
                  {HOST.url.replace('https://', '')}
                </a>
              </dd>
            </dl>
          </section>

          <section id="propriete">
            <h2>Propriété intellectuelle</h2>
            <p>
              La conception graphique, la mise en page, les textes et le code de ce site sont la propriété de{' '}
              {EDITOR.name}, sauf mention contraire. Toute reproduction ou réutilisation, totale ou partielle, sans
              autorisation écrite préalable est interdite.
            </p>
            <p>
              Les photographies proviennent d’Unsplash et sont utilisées selon la licence Unsplash ; elles ne
              représentent aucun lieu réel de la {NAME} :
            </p>
            <ul className="legal__credits">
              {PHOTO_CREDITS.map((c) => (
                <li key={c.url}>
                  {c.what} — photo de{' '}
                  <a href={c.url} target="_blank" rel="noreferrer">
                    {c.author}
                  </a>
                </li>
              ))}
            </ul>
            <p>
              Les couvertures de livres proviennent d’Open Library et restent la propriété de leurs éditeurs et
              illustrateurs ; elles sont reproduites à seule fin d’illustrer un fonds documentaire.
            </p>
          </section>

          <section id="responsabilite">
            <h2>Responsabilité</h2>
            <p>
              Les informations publiées (horaires, services, adresse, fonds documentaire) sont fictives et ne
              doivent pas être utilisées pour se rendre quelque part ou contacter qui que ce soit.
            </p>
            <p>
              Le site peut contenir des liens vers des sites tiers. L’éditeur n’a aucun contrôle sur leur contenu et
              décline toute responsabilité à leur sujet.
            </p>
          </section>

          <section id="donnees">
            <h2>Données personnelles</h2>
            <p>
              Ce site respecte la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données à
              caractère personnel. Le responsable du traitement est {EDITOR.name} (<Mail to={EDITOR.email} />).
            </p>
            <h3>Ce que nous collectons</h3>
            <p>
              Rien. Le site ne crée pas de compte et n’enregistre aucune donnée. Le formulaire de contact est une
              démonstration : ce que vous y tapez reste dans votre navigateur et est effacé à l’envoi, sans être
              transmis à personne.
            </p>
            <h3>Si vous écrivez à l’éditeur</h3>
            <p>
              Les emails envoyés à <Mail to={EDITOR.email} /> servent uniquement à vous répondre. Ils ne sont ni
              vendus, ni cédés, ni utilisés à des fins publicitaires, et sont conservés le temps nécessaire au
              traitement de votre demande.
            </p>
            <h3>Données techniques</h3>
            <p>
              Comme tout hébergeur, {HOST.name} peut enregistrer des journaux techniques (adresse IP, navigateur,
              pages demandées) pour assurer la sécurité et le bon fonctionnement du service. Ces données sont traitées
              par l’hébergeur, aux États-Unis, selon sa propre politique de confidentialité.
            </p>
          </section>

          <section id="cookies">
            <h2>Cookies</h2>
            <p>
              Ce site n’utilise aucun cookie, aucun outil de mesure d’audience et aucun traceur publicitaire. Les
              polices de caractères et les images sont hébergées avec le site : aucune requête n’est envoyée à des
              services tiers lors de votre visite.
            </p>
          </section>

          <section id="droits">
            <h2>Vos droits</h2>
            <p>
              Vous disposez d’un droit d’accès, de rectification, d’opposition et de suppression des données vous
              concernant. Pour l’exercer, écrivez à <Mail to={EDITOR.email} /> en précisant votre demande ; une
              réponse vous sera apportée dans un délai d’un mois.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l’Autorité de Régulation des
              Télécommunications/TIC de Côte d’Ivoire (ARTCI), autorité de protection des données personnelles :{' '}
              <a href="https://www.artci.ci" target="_blank" rel="noreferrer">
                www.artci.ci
              </a>
              .
            </p>
          </section>

          <section id="droit">
            <h2>Droit applicable</h2>
            <p>
              Les présentes mentions sont régies par le droit ivoirien. En cas de litige, et à défaut de solution
              amiable, les tribunaux d’Abidjan sont seuls compétents.
            </p>
          </section>

          <a href={home('top')} className="btn btn--plum legal__back">
            <span aria-hidden="true">←</span>Retour à l’accueil
          </a>
        </div>
      </div>
    </main>
  )
}
