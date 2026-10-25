import { useEffect, useRef } from 'react'
import { CATALOG, formatNumber, NAME } from '../data/content'
import { useMotion } from '../hooks/useMediaQuery'
import Logo from './Logo'
import './Book3D.css'

const TURN_MS = 18000

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
      <div className="book3d__disc" aria-hidden="true" />
      <div className="book3d__shadow" aria-hidden="true" />
      <div
        className="book3d"
        role="img"
        aria-label={`Livre en 3D : ${book.t}, ${book.a}. Faites glisser pour le tourner.`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="book3d__tilt">
          <div className="book3d__body" ref={bookRef}>
            <div className="book3d__front" style={{ background: book.bg, color: book.fg }}>
              <div className="book3d__front-spine" />
              <div className="book3d__author">{book.a}</div>
              <div className="book3d__title">{book.t}</div>
              <div className="book3d__foot">
                <span style={{ background: book.mark }} />
                {book.y}
              </div>
              {book.img && <div className="book3d__art" style={{ backgroundImage: `url("${book.img}")` }} />}
              <div className="book3d__hinge" />
            </div>
            <div className="book3d__back">
              <div className="book3d__back-text">
                <span className="book3d__quote">Lire, apprendre, partager.</span>
                <span>{formatNumber(CATALOG)} ouvrages à consulter sur place, du lundi au samedi.</span>
              </div>
              <div className="book3d__back-brand">
                <Logo />
                <span>{NAME}</span>
              </div>
            </div>
            <div className="book3d__spine" style={{ background: book.spine, color: book.fg }}>
              <span>{book.t}</span>
            </div>
            <div className="book3d__pages book3d__pages--side" />
            <div className="book3d__pages book3d__pages--top" />
            <div className="book3d__pages book3d__pages--bottom" />
          </div>
        </div>
      </div>
    </>
  )
}
