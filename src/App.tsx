import Header from './componentes/Header'
import ProductCard from './componentes/ProductCard'
import EmptyCart from './componentes/EmptyCart'
import { products } from './data/products'
import {useState} from "react";
import CartDrawer from './componentes/CartDrawer'
import ConfirmOrderModal from './componentes/ConfirmOrderModal';



export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmOrderOpen, setIsConfirmOrderOpen] = useState(false)
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
        <button
  type="button"
  onClick={() => setIsConfirmOrderOpen(true)}
  aria-haspopup="dialog"
  className="mt-4 text-sm font-semibold text-orange-800 underline underline-offset-4 hover:text-orange-950"
>
  Ver confirmación de ejemplo
</button>
        <div className="min-h-screen bg-page text-ink">
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
        <ConfirmOrderModal
            isOpen={isConfirmOrderOpen}
            onClose={() => setIsConfirmOrderOpen(false)}
        />
    </div>
  )
}