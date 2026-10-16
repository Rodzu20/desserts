import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from './componentes/Header'
import ProductCard from './componentes/ProductCard'
import EmptyCart from './componentes/EmptyCart'
import CartDrawer from './componentes/CartDrawer'
import ConfirmOrderModal from './componentes/ConfirmOrderModal'
import { getProducts } from './api/products'
import ProductCardSkeleton from './componentes/ProductCardSkeleton'

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] =
    useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const {
    data: products = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: search
      ? ['products', { search }]
      : ['products'],
    queryFn: ({ signal }) =>
      getProducts({ search }, signal),
    retry: 1,
  })

  return (
    <div className="min-h-screen bg-page text-ink">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">
          Nuestros postres
        </h1>

        <p className="mt-2 text-muted">
          Elige tu próximo antojo.
        </p>
        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            setSearch(searchInput.trim())
          }}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-semibold"
            >
              Buscar por nombre
            </label>

            <input
              id="product-search"
              type="search"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value)
              }}
              placeholder="Ej. waffle"
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:bg-[#952c0b]"
          >
            Buscar
          </button>

          <button
            type="button"
            onClick={() => {
              setSearchInput('')
              setSearch('')
            }}
            className="rounded-lg border border-stone-300 px-6 py-3 font-semibold hover:bg-soft"
          >
            Limpiar
          </button>
        </form>
        <button
          type="button"
          onClick={() => setIsConfirmationOpen(true)}
          disabled={
            isPending || isError || products.length === 0
          }
          aria-haspopup="dialog"
          className="mt-4 text-sm font-semibold text-brand underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Ver confirmación de ejemplo
        </button>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section
            aria-label="Catálogo de postres"
            aria-busy={isPending}
          >
            {isPending ? (
              <div
                role="status"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                <span className="sr-only">
                  Cargando postres…
                </span>

                {Array.from({ length: 9 }, (_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : isError ? (
              <div
                role="alert"
                className="rounded-xl bg-white p-6"
              >
                <h2 className="font-semibold">
                  No pudimos cargar los postres.
                </h2>

                <p className="mt-2 text-sm text-muted">
                  Comprueba que la API esté funcionando.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    void refetch()
                  }}
                  className="mt-4 rounded-full bg-brand px-5 py-2 text-white hover:bg-[#952c0b]"
                >
                  Reintentar
                </button>
              </div>
            ) : products.length === 0 ? (
              <p role="status" className="text-muted">
                {search
                  ? `No encontramos postres con el nombre "${search}".`
                  : 'No hay productos disponibles.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    image={product.image}
                  />
                ))}
              </div>
            )}
          </section>

          <aside aria-label="Resumen del carrito">
            <EmptyCart />
          </aside>
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <ConfirmOrderModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        products={products}
      />
    </div>
  )
}