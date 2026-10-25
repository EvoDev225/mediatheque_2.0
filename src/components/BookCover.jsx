import './BookCover.css'

/** Couverture typographique (aplat + titre en Fraunces), recouverte par l'image du livre si elle existe. */
export default function BookCover({ book }) {
  return (
    <div className="cover" style={{ background: book.bg, color: book.fg }}>
      <div className="cover__spine" />
      {book.img && <img className="cover__img" src={book.img} alt={`Couverture : ${book.t}, ${book.a}`} loading="lazy" />}
      <div className="cover__author">{book.a}</div>
      <div className="cover__title">{book.t}</div>
      <div className="cover__foot">
        <span className="cover__mark" style={{ background: book.mark }} />
        <span>{book.y}</span>
      </div>
    </div>
  )
}
