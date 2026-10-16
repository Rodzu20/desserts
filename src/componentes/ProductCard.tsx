type ProductCardProps = {
  name: string
  category: string
  price: number
  image: string
}

export default function ProductCard({
  name,
  category,
  price,
  image,
}: ProductCardProps) {
  return (
    <article>
      <img
        src={image}
        alt={name}
        className="aspect-square w-full rounded-lg object-cover"
      />

      <button
        type="button"
        className="relative mx-auto -mt-5 block rounded-full border border-stone-400 bg-white px-5 py-2 text-sm font-semibold hover:border-orange-800 hover:text-orange-800"
      >
        🛒 Añadir al carrito
      </button>

      <div className="mt-4">
        <p className="text-sm text-stone-500">{category}</p>
        <h2 className="mt-1 font-semibold">{name}</h2>
        <p className="mt-1 font-semibold text-orange-800">
          ${price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}