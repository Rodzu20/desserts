import { Link, useParams } from 'react-router'

export default function ProductDetailPage() {
  const { id } = useParams()

  return (
    <main className="min-h-screen bg-page px-6 py-10 text-ink">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="font-semibold text-brand hover:underline"
        >
          ← Volver al catálogo
        </Link>

        <h1 className="mt-8 text-3xl font-bold">
          Detalle del producto {id}
        </h1>

        <p className="mt-3 text-muted">
          Aquí mostraremos los datos del producto.
        </p>
      </div>
    </main>
  )
}