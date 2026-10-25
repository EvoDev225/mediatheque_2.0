/**
 * Couverture typographique (aplat + titre en Fraunces), recouverte par l'image du livre si elle existe.
 * Les textes sont en cqw (relatifs à la largeur de la couverture) ; le padding est en % pour la même raison.
 */
export default function BookCover({ book }) {
  return (
    <div
      className="@container relative flex aspect-[2/3] w-full flex-col justify-between overflow-hidden rounded-[4px_8px_8px_4px] pt-[10%] pr-[9%] pb-[9%] pl-[13%] shadow-cover"
      style={{ background: book.bg, color: book.fg }}
    >
      <div className="absolute inset-y-0 left-0 w-[4cqw] bg-black/15" />
      {book.img && (
        <img
          className="absolute inset-0 z-1 size-full object-cover"
          src={book.img}
          alt={`Couverture : ${book.t}, ${book.a}`}
          loading="lazy"
        />
      )}
      <div className="text-[6.8cqw] leading-[1.2] font-medium tracking-[0.06em] uppercase">{book.a}</div>
      <div className="font-display text-[14cqw] leading-[0.98] tracking-[-0.01em] break-words">{book.t}</div>
      <div className="flex items-center justify-between text-[6.8cqw] leading-none font-medium">
        <span className="size-[9cqw] rounded-full" style={{ background: book.mark }} />
        <span>{book.y}</span>
      </div>
    </div>
  )
}
