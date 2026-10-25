// Motifs décoratifs du hero (fond vert) : purement visuels, ignorés par les lecteurs d'écran.

// Feuille de base : du pétiole (0,0) à la pointe (420,-320), et sa nervure centrale.
const LEAF = 'M0 0C40-180 200-300 420-320 400-100 240 40 0 0Z'
const VEIN = 'M0 0Q200-120 420-320'

/** Fond de la section : grandes feuilles ton sur ton, grille de points, lignes ondulées et traits de lumière. */
export default function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Grandes formes végétales ton sur ton, à la manière de Fable */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {/* Très grande feuille sombre qui traverse le côté gauche, du bas jusqu'en haut */}
        <g transform="translate(-160 980) scale(2.3)">
          <path d={LEAF} className="fill-forest-dark" />
          <path d={VEIN} className="fill-none stroke-forest" strokeWidth="4" />
        </g>

        {/* Feuille claire en haut à gauche, coupée par le bord */}
        <g transform="translate(-40 -60) scale(0.9) rotate(70)" className="fill-forest-light">
          <path d={LEAF} />
        </g>

        {/* Grande tige courbe derrière le visuel, avec ses feuilles */}
        <path d="M880 980C900 640 1080 320 1500 140" className="fill-none stroke-forest-light" strokeWidth="90" strokeLinecap="round" />
        <g transform="translate(1040 560) rotate(-25) scale(0.8)" className="fill-forest-light">
          <path d={LEAF} />
        </g>
        <g transform="translate(950 800) scale(-0.75 0.75) rotate(5)" className="fill-forest-light">
          <path d={LEAF} />
        </g>
        <g transform="translate(1230 330) rotate(-40) scale(0.6)" className="fill-forest-light">
          <path d={LEAF} />
        </g>

        {/* Feuille sombre en haut à droite, coupée par le bord */}
        <g transform="translate(1560 -80) scale(-1.4 1.4) rotate(165)">
          <path d={LEAF} className="fill-forest-dark" />
          <path d={VEIN} className="fill-none stroke-forest" strokeWidth="4" />
        </g>
      </svg>

      {/* Grille de points, nette en haut à gauche et qui disparaît vers la droite */}
      <svg className="absolute inset-0 size-full">
        <defs>
          <pattern id="hero-dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.3" fill="#F7F4EE" fillOpacity="0.16" />
          </pattern>
          <radialGradient id="hero-dots-fade" cx="0.15" cy="0.2" r="0.75">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="hero-dots-mask">
            <rect width="100%" height="100%" fill="url(#hero-dots-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" mask="url(#hero-dots-mask)" />
      </svg>

      {/* Lignes ondulées (clin d'œil à la lagune), de gauche à droite derrière le texte */}
      <svg
        className="absolute top-[52%] -left-16 w-[140%] max-w-[900px] text-cream/12 sm:w-[90%] lg:top-[34%] lg:w-[58%]"
        viewBox="0 0 600 220"
        fill="none"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M0 ${40 + i * 28} C 75 ${10 + i * 28}, 150 ${70 + i * 28}, 225 ${40 + i * 28} S 375 ${10 + i * 28}, 450 ${40 + i * 28} S 600 ${70 + i * 28}, 600 ${40 + i * 28}`}
            stroke="currentColor"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Traits de lumière orange, en haut à droite */}
      <svg
        className="absolute -top-6 right-0 hidden h-[45%] text-orange/25 lg:block"
        viewBox="0 0 240 300"
        fill="none"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1={60 + i * 22}
            y1="0"
            x2={i * 22}
            y2="300"
            stroke="currentColor"
            strokeWidth={i % 3 === 0 ? 3 : 1.5}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  )
}
