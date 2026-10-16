import Header from './componentes/Header'
import ProductCard from './componentes/ProductCard'
import EmptyCart from './componentes/EmptyCart'
import { products } from './data/products'
import {useState} from "react";
import CartDrawer from './componentes/CartDrawer'
export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  return (
    <div className="min-h-screen bg-orange-50 text-stone-900">
      <Header onOpenCart={() => setIsCartOpen(true)} />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">
          Nuestros postres
        </h1>

        <p className="mt-2 text-stone-600">
          Elige tu próximo antojo.
        </p>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section aria-label="Catálogo de postres">
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
    </div>
  )
}