import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import Header from '../componentes/Header'
import ProductCard from '../componentes/ProductCard'
import ProductCardSkeleton from '../componentes/ProductCardSkeleton'
import CartSummary from '../features/cart/components/CartSummary'
import CartDrawer from '../componentes/CartDrawer'
import ConfirmOrderModal from '../componentes/ConfirmOrderModal'
import { getProducts } from '../api/products'
import type { OrderSummary } from '../features/cart/interfaces/cart'
import {
    selectCartTotal,
    useCartStore,
} from '../features/cart/stores/userCartStore'
import { useCategoriesQuery } from '../features/categories/hooks/useCategoriesQuery'

export default function CatalogPage() {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const [confirmedOrder, setConfirmedOrder] =
        useState<OrderSummary | null>(null)

    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    const categoriesQuery = useCategoriesQuery()
    const categories = categoriesQuery.data ?? []

    const productsQuery = useQuery({
        queryKey: ['products', { search, category }],
        queryFn: ({ signal }) =>
            getProducts({ search, category }, signal),
        retry: 1,
    })

    const {
        data: products = [],
        isPending,
        isError,
    } = productsQuery

    const hasFilters = Boolean(search || category)

    function retryProducts() {
        void productsQuery.refetch()
        void categoriesQuery.refetch()
    }
    function handleConfirmOrder() {
        const cart = useCartStore.getState()

        if (cart.items.length === 0) return

        setConfirmedOrder({
            items: cart.items.map((item) => ({ ...item })),
            total: selectCartTotal(cart),
        })

        cart.clearCart()
        setIsCartOpen(false)
    }
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

                    <div>
                        <label
                            htmlFor="product-category"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Categoría
                        </label>

                        <select
                            id="product-category"
                            value={category}
                            onChange={(event) => {
                                setCategory(event.target.value)
                            }}
                            disabled={
                                categoriesQuery.isPending || categoriesQuery.isError
                            }
                            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-50"
                        >
                            <option value="">
                                Todas las categorías
                            </option>
                            {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {categoriesQuery.isError && (
                            <p role="alert" className="mt-2 text-sm text-brand">
                                No pudimos cargar las categorías.{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        void categoriesQuery.refetch()
                                    }}
                                    className="font-semibold underline"
                                >
                                    Reintentar
                                </button>
                            </p>
                        )}
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
                            setCategory('')
                        }}
                        className="rounded-lg border border-stone-300 px-6 py-3 font-semibold hover:bg-soft"
                    >
                        Limpiar
                    </button>
                </form>


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
                                    onClick={retryProducts}
                                    className="mt-4 rounded-full bg-brand px-5 py-2 text-white hover:bg-[#952c0b]"
                                >
                                    Reintentar
                                </button>
                            </div>
                        ) : products.length === 0 ? (
                            <p role="status" className="text-muted">
                                {hasFilters
                                    ? 'No encontramos postres con los filtros seleccionados.'
                                    : 'No hay productos disponibles.'}
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products.map((product) => (
                                    <div key={product.id}>
                                        <ProductCard
                                            id={product.id}
                                            name={product.name}
                                            categoryId={product.categoryId}
                                            price={product.price}
                                            image={product.image}
                                        />

                                        <Link
                                            to={`/producto/${product.id}`}
                                            aria-label={`Ver detalle de ${product.name}`}
                                            className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
                                        >
                                            Ver detalle →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                    <aside aria-label="Resumen del carrito">
                        <CartSummary onConfirm={handleConfirmOrder} />
                    </aside>
                </div>
            </main>

            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onConfirm={handleConfirmOrder}
            />

            <ConfirmOrderModal
                isOpen={confirmedOrder !== null}
                onClose={() => setConfirmedOrder(null)}
                order={confirmedOrder}
            />
        </div>
    )
}