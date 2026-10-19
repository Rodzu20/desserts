import { useCategoriesQuery } from '../hooks/useCategoriesQuery'

type CategoryBadgeProps = {
  categoryId: string
}

export default function CategoryBadge({
  categoryId,
}: CategoryBadgeProps) {
  const categoriesQuery = useCategoriesQuery()

  const category = categoriesQuery.data?.find(
    (item) => item.id === categoryId,
  )

  const label = categoriesQuery.isPending
    ? 'Cargando categoría…'
    : categoriesQuery.isError
      ? 'Categoría no disponible'
      : category?.name ?? 'Sin categoría'

  return (
    <span className="inline-block rounded-full bg-soft px-3 py-1 text-xs font-semibold text-muted">
      {label}
    </span>
  )
}