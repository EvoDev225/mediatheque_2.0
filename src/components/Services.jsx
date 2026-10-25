import { SERVICES } from '../data/content'
import Reveal from './Reveal'
import './Services.css'

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="inner">
        <Reveal className="services__head">
          <h2 className="display">
            Nos services à votre <em>disposition</em>
          </h2>
          <p className="lead services__lead">
            Des services numériques, culturels et administratifs pour simplifier votre quotidien.
          </p>
        </Reveal>
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 80}>
              <article className="service">
                <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="service__body">
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
