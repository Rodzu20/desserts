import { Link, useNavigate } from 'react-router'
import ProductForm from '../components/ProductForm'
import { useCreateProductMutation } from '../hooks/useProductsMutations'

export default function CreateProductPage() {
  const navigate = useNavigate()
  const createMutation = useCreateProductMutation()

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
          Crear producto
        </h1>

        <div className="mt-6 rounded-xl bg-white p-6">
          <ProductForm
            isPending={createMutation.isPending}
            submitLabel="Crear producto"
            errorMessage={
              createMutation.isError
                ? 'No se pudo guardar. Tus datos siguen en el formulario; inténtalo nuevamente.'
                : undefined
            }
            onSubmit={(values) => {
              createMutation.mutate(values, {
                onSuccess: (product) => {
                  void navigate(`/producto/${product.id}`)
                },
              })
            }}
          />
        </div>
      </div>
    </main>
  )
}