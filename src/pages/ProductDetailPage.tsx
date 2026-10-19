import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import { getProductById } from '../api/products'
import CategoryBadge from '../features/categories/components/CategoryBadge'
export default function ProductDetailPage() {
  const { id = '' } = useParams()

  const productQuery = useQuery({
    queryKey: ['product', id],
    queryFn: ({ signal }) =>
      getProductById(id, signal),
    enabled: Boolean(id),
    retry: (failureCount, error) => {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 404
      ) {
        return false
      }

      return failureCount < 1
    },
  })

  const product = productQuery.data

  const isNotFound =
    !id ||
    (
      axios.isAxiosError(productQuery.error) &&
      productQuery.error.response?.status === 404
    )

  return (
    <main className="min-h-screen bg-page px-6 py-10 text-ink">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="font-semibold text-brand hover:underline"
        >
          ← Volver al catálogo
        </Link>

        {isNotFound ? (
          <section
            role="alert"
            className="mt-10 rounded-xl bg-white p-8 text-center"
          >
            <p className="text-6xl font-bold text-brand">
              404
            </p>

            <h1 className="mt-4 text-2xl font-bold">
              Producto no encontrado
            </h1>

            <p className="mt-3 text-muted">
              Este postre no existe o ya no está disponible.
            </p>
          </section>
        ) : productQuery.isPending ? (
          <div role="status" className="mt-8">
            <span className="sr-only">
              Cargando detalle del producto…
            </span>

            <div
              aria-hidden="true"
              className="grid gap-8 motion-safe:animate-pulse md:grid-cols-2"
            >
              <div className="aspect-square rounded-xl bg-stone-200" />

              <div className="space-y-4 py-6">
                <div className="h-4 w-24 rounded bg-stone-200" />
                <div className="h-10 w-4/5 rounded bg-stone-200" />
                <div className="h-8 w-28 rounded bg-stone-200" />
              </div>
            </div>
          </div>
        ) : productQuery.isError ? (
          <section
            role="alert"
            className="mt-10 rounded-xl bg-white p-8"
          >
            <h1 className="text-2xl font-bold">
              No pudimos cargar el producto
            </h1>

            <p className="mt-3 text-muted">
              Comprueba que la API esté funcionando e inténtalo
              nuevamente.
            </p>

            <button
              type="button"
              onClick={() => {
                void productQuery.refetch()
              }}
              className="mt-6 rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-[#952c0b]"
            >
              Reintentar
            </button>
          </section>
        ) : product ? (
          <article className="mt-8 grid items-center gap-8 md:grid-cols-2">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full rounded-xl object-cover"
            />

            <div className="rounded-xl bg-white p-6 sm:p-8">
              <p className="text-sm font-semibold text-muted">
                <CategoryBadge categoryId={product.categoryId} />
              </p>

              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                {product.name}
              </h1>

              <p className="mt-6 text-3xl font-bold text-brand">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </article>
        ) : null}
      </div>
    </main>
  )
}