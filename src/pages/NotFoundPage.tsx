import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-page px-6 text-center text-ink">
      <p className="text-6xl font-bold text-brand">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold">
        Página no encontrada
      </h1>

      <Link
        to="/"
        className="mt-6 rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-[#952c0b]"
      >
        Volver al catálogo
      </Link>
    </main>
  )
}