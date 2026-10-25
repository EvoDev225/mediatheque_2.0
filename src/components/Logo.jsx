/** Pictogramme « livre ouvert » : deux pages orange inclinées. `page` règle la taille d'une page. */
export default function Logo({ page = 'h-5 w-[13px]', className = '' }) {
  return (
    <span className={`flex items-end gap-0.5 ${className}`} aria-hidden="true">
      <span className={`${page} skew-y-[14deg] rounded-[3px_1px_1px_6px] bg-orange`} />
      <span className={`${page} -skew-y-[14deg] rounded-[1px_3px_6px_1px] bg-orange`} />
    </span>
  )
}
