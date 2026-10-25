// Classes Tailwind partagées entre les sections (titres, boutons, liens, mise en page).

export const section = 'scroll-mt-10 px-4 py-20 sm:px-6 lg:py-[120px]'
export const inner = 'mx-auto w-full max-w-site'

export const display =
  'm-0 font-display text-[clamp(2.25rem,5.2vw,4.25rem)] leading-[0.94] font-normal tracking-[-0.01em] text-balance text-ink'
export const eyebrow = 'font-body text-[13px] leading-none font-medium tracking-[0.1em] text-orange-deep uppercase'
export const lead = 'm-0 text-lg leading-normal text-pretty'

const btn =
  'inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-base leading-none font-medium transition-all duration-200 hover:-translate-y-0.5 hover:gap-3.5 hover:shadow-pill'
export const btnWhite = `${btn} bg-white text-ink`
export const btnPlum = `${btn} bg-plum text-cream`
export const btnOrange = `${btn} cursor-pointer border-none bg-orange text-ink hover:bg-orange-deep`
export const btnOutline =
  'inline-flex items-center rounded-full border-2 border-white px-[26px] py-3.5 text-base leading-none font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10'

export const linkArrow =
  'inline-flex min-h-11 items-center gap-2 text-base leading-none font-medium transition-[gap] duration-200 hover:gap-3'

export const photo = 'block size-full rounded-[clamp(24px,5vw,48px)] object-cover'
