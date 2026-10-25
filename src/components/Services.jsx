import { SERVICES } from '../data/content'
import { display, inner, lead, section } from '../ui'
import Reveal from './Reveal'

export default function Services() {
  return (
    <section id="services" className={`${section} bg-orange text-ink`}>
      <div className={inner}>
        <Reveal className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2 className={`${display} max-w-[640px]`}>
            Nos services à votre <em>disposition</em>
          </h2>
          <p className={`${lead} max-w-[400px]`}>
            Des services numériques, culturels et administratifs pour simplifier votre quotidien.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 80} className="h-full">
              <article className="group flex h-full flex-col gap-5 rounded-xl bg-cream p-6 transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-card sm:p-7">
                <span className="flex size-12 items-center justify-center rounded-full bg-sand text-sm leading-none font-semibold text-ink tabular-nums transition-colors duration-250 group-hover:bg-orange">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-2.5">
                  <h3 className="m-0 font-display text-2xl leading-[1.1] font-normal text-ink">{s.t}</h3>
                  <p className="m-0 text-base leading-normal text-pretty text-graphite">{s.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
