// Motifs décoratifs du hero (fond vert) : purement visuels, ignorés par les lecteurs d'écran.

/** Fond de la section : grille de points qui s'estompe, lignes ondulées et traits de « pages ». */
export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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

      {/* Lignes ondulées (clin d'œil à la lagune), en bas à gauche derrière le texte */}
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

      {/* Traits obliques façon tranches de livres, en haut à droite */}
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

/** Anneaux concentriques autour du globe orange ; le pointillé orange tourne lentement. */
export function HeroRings() {
  const ring = 'fill-none stroke-cream'
  return (
    <svg className="pointer-events-none absolute -inset-[42%] size-[184%] overflow-visible" viewBox="-100 -100 200 200" aria-hidden="true">
      <circle r="48" className={`${ring} stroke-[0.35] opacity-25`} />
      <circle r="62" className={`${ring} stroke-[0.3] opacity-15`} />
      <circle r="78" className={`${ring} stroke-[0.25] opacity-10`} />
      <circle r="96" className={`${ring} stroke-[0.25] opacity-[0.07]`} />
      <circle
        r="55"
        className="origin-center fill-none stroke-orange stroke-[0.6] opacity-70 [stroke-dasharray:1_4] [stroke-linecap:round] [transform-box:fill-box] motion-safe:animate-[spin_80s_linear_infinite]"
      />
      <circle
        r="70"
        className="origin-center fill-none stroke-yellow stroke-[0.5] opacity-50 [stroke-dasharray:18_10_2_10] [transform-box:fill-box] motion-safe:animate-[spin_120s_linear_infinite_reverse]"
      />
    </svg>
  )
}
