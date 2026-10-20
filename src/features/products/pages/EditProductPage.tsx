import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router'
import ProductForm from '../components/ProductForm'
import { useProductQuery } from '../hooks/useProductsQueries'
import { useUpdateProductMutation } from '../hooks/useProductsMutations'

export default function EditProductPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()

  const productQuery = useProductQuery(id)
  const updateMutation = useUpdateProductMutation()

  const product = productQuery.data

  const isNotFound =
    !id ||
    (
      axios.isAxiosError(productQuery.error) &&
      productQuery.error.response?.status === 404
    )

  return (
    <main className="min-h-screen bg-page px-6 py-10 text-ink">
      <div className="mx-auto max-w-xl">
        <Link
          to="/"
          className="font-semibold text-brand hover:underline"
        >
          ← Volver al catálogo
        </Link>

        <h1 className="mt-8 text-3xl font-bold">
          Editar producto
        </h1>

        <div className="mt-6 rounded-xl bg-white p-6">
          {isNotFound ? (
            <div role="alert">
              <p className="text-4xl font-bold text-brand">
                404
              </p>

              <h2 className="mt-3 text-xl font-semibold">
                Producto no encontrado
              </h2>

              <p className="mt-2 text-muted">
                El producto no existe o ya fue eliminado.
              </p>
            </div>
          ) : productQuery.isPending ? (
            <div role="status">
              <span className="sr-only">
                Cargando producto…
              </span>

              <div
                aria-hidden="true"
                className="space-y-5 motion-safe:animate-pulse"
              >
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index}>
                    <div className="h-4 w-24 rounded bg-stone-200" />
                    <div className="mt-3 h-12 rounded bg-stone-200" />
                  </div>
                ))}
              </div>
            </div>
          ) : productQuery.isError ? (
            <div role="alert">
              <p>No pudimos cargar el producto.</p>

              <button
                type="button"
                onClick={() => {
                  void productQuery.refetch()
                }}
                className="mt-3 font-semibold text-brand underline"
              >
                Reintentar
              </button>
            </div>
          ) : product ? (
            <ProductForm
              key={product.id}
              defaultValues={{
                name: product.name,
                categoryId: product.categoryId,
                price: product.price,
                image: product.image,
              }}
              isPending={updateMutation.isPending}
              submitLabel="Guardar cambios"
              errorMessage={
                updateMutation.isError
                  ? 'No se pudieron guardar los cambios. Revisa la conexión e inténtalo nuevamente.'
                  : undefined
              }
              onSubmit={(values) => {
                updateMutation.mutate(
                  {
                    id: product.id,
                    data: values,
                  },
                  {
                    onSuccess: (updatedProduct) => {
                      void navigate(
                        `/producto/${updatedProduct.id}`,
                      )
                    },
                  },
                )
              }}
            />
          ) : null}
        </div>
      </div>
    </main>
  )
}