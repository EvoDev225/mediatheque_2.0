import { useEffect, useRef } from 'react'
import { CATALOG, formatNumber, NAME } from '../data/content'
import { useMotion } from '../hooks/useMediaQuery'
import Logo from './Logo'

const TURN_MS = 18000

// Livre de 46 × 68 × 11 cqw : chaque face est placée en 3D autour du centre.
const face = 'absolute backface-hidden'
const cover = `${face} -left-[23cqw] -top-[34cqw] flex h-[68cqw] w-[46cqw] flex-col justify-between overflow-hidden`
const pages = 'bg-[repeating-linear-gradient(var(--dir),var(--color-cream)_0_0.35cqw,var(--color-sand-dark)_0.35cqw_0.5cqw)]'

/** Livre en 3D qui tourne seul ; on peut le faire pivoter en le glissant. */
export default function Book3D({ book }) {
  const bookRef = useRef(null)
  const anim = useRef(null)
  const drag = useRef(null)
  const motion = useMotion()

  useEffect(() => {
    const a = bookRef.current.animate([{ transform: 'rotateY(-28deg)' }, { transform: 'rotateY(332deg)' }], {
      duration: TURN_MS,
      iterations: Infinity,
      easing: 'linear',
    })
    if (!motion) a.pause()
    anim.current = a
    return () => a.cancel()
  }, [motion])

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, t: anim.current.currentTime || 0 }
    anim.current.pause()
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const t = drag.current.t + ((e.clientX - drag.current.x) / 360) * TURN_MS * 0.9
    anim.current.currentTime = ((t % TURN_MS) + TURN_MS) % TURN_MS
  }
  const onPointerUp = () => {
    if (!drag.current) return
    drag.current = null
    if (motion) anim.current.play()
  }

  return (
    <>
      <div className="absolute inset-[10%] rounded-full bg-orange" aria-hidden="true" />
      <div className="absolute bottom-[5%] left-[24%] h-[6%] w-[52%] rounded-full bg-char/35 blur-[10px]" aria-hidden="true" />
      <div
        className="@container absolute inset-0 cursor-grab touch-pan-y select-none perspective-[1400px] active:cursor-grabbing"
        role="img"
        aria-label={`Livre en 3D : ${book.t}, ${book.a}. Faites glisser pour le tourner.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="absolute top-[47%] left-1/2 size-0 transform-3d [transform:rotateX(-10deg)_rotateZ(-4deg)]">
          <div ref={bookRef} className="absolute size-0 transform-3d [transform:rotateY(-28deg)]">
            {/* Face avant */}
            <div
              className={`${cover} rounded-[0.6cqw_1.6cqw_1.6cqw_0.6cqw] pt-[5cqw] pr-[4cqw] pb-[4cqw] pl-[6cqw] [transform:translateZ(5.5cqw)]`}
              style={{ background: book.bg, color: book.fg }}
            >
              <div className="absolute inset-y-0 left-0 w-[2cqw] bg-black/15" />
              <div className="text-[2.4cqw] leading-[1.2] font-medium tracking-[0.08em] uppercase">{book.a}</div>
              <div className="font-display text-[7cqw] leading-[0.95]">{book.t}</div>
              <div className="flex items-center justify-between text-[2.4cqw] leading-none font-medium">
                <span className="size-[4cqw] rounded-full" style={{ background: book.mark }} />
                {book.y}
              </div>
              {book.img && (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${book.img}")` }} />
              )}
              <div className="absolute inset-y-0 left-[1.6cqw] w-[0.5cqw] bg-white/20" />
            </div>

            {/* Quatrième de couverture */}
            <div
              className={`${cover} rounded-[1.6cqw_0.6cqw_0.6cqw_1.6cqw] bg-plum px-[5cqw] py-[6cqw] text-cream [transform:rotateY(180deg)_translateZ(5.5cqw)]`}
            >
              <div className="flex flex-col gap-[2.4cqw] text-[2.6cqw] leading-normal text-cream/80">
                <span className="font-display text-[5cqw] leading-none text-orange italic">Lire, apprendre, partager.</span>
                <span>{formatNumber(CATALOG)} ouvrages à consulter sur place, du lundi au samedi.</span>
              </div>
              <div className="flex items-center gap-[2cqw] font-display text-[3.4cqw] leading-none">
                <Logo page="h-[3.6cqw] w-[2.4cqw]" />
                <span>{NAME}</span>
              </div>
            </div>

            {/* Dos */}
            <div
              className={`${face} -top-[34cqw] -left-[5.5cqw] flex h-[68cqw] w-[11cqw] items-center justify-center [transform:rotateY(-90deg)_translateZ(23cqw)]`}
              style={{ background: book.spine, color: book.fg }}
            >
              <span className="rotate-180 font-display text-[3.6cqw] leading-none whitespace-nowrap [writing-mode:vertical-rl]">
                {book.t}
              </span>
            </div>

            {/* Tranches de pages */}
            <div
              className={`${face} ${pages} -top-[33.4cqw] -left-[5.5cqw] h-[66.8cqw] w-[11cqw] [--dir:90deg] [transform:rotateY(90deg)_translateZ(22.4cqw)]`}
            />
            <div
              className={`${face} ${pages} -top-[5.5cqw] -left-[23cqw] h-[11cqw] w-[45.4cqw] [--dir:0deg] [transform:rotateX(90deg)_translateZ(33.4cqw)]`}
            />
            <div
              className={`${face} ${pages} -top-[5.5cqw] -left-[23cqw] h-[11cqw] w-[45.4cqw] [--dir:0deg] [transform:rotateX(-90deg)_translateZ(33.4cqw)]`}
            />
          </div>
        </div>
      </div>
    </>
  )
}
