import Header from './componentes/Header'
import ProductCard from './componentes/ProductCard'
import { products } from './data/products'

export default function App() {
  return (
    <div className="min-h-screen bg-orange-50 text-stone-900">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">
          Nuestros postres
        </h1>

        <p className="mt-2 text-stone-600">
          Elige tu próximo antojo.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </main>
    </div>
  )
}