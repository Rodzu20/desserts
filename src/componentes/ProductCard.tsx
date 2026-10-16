import QuantityStepper from './QuantityStepper'

type ProductCardProps = {
  name: string
  category: string
  price: number
  image: string
  quantity?: number
}

export default function ProductCard({
  name,
  category,
  price,
  image,
  quantity,
}: ProductCardProps) {
  return (
    <article>
      <img
        src={image}
        alt={name}
        className="aspect-square w-full rounded-lg object-cover"
      />

      {quantity === undefined ? (
        <button
          type="button"
          className="relative mx-auto -mt-5 flex h-10 w-44 items-center justify-center gap-2 rounded-full border border-stone-400 bg-white text-sm font-semibold hover:border-orange-800 hover:text-orange-800"
        >
          <img
            src="/assets/images/icon-add-to-cart.svg"
            alt=""
            className="h-5 w-5"
          />
          Añadir al carrito
        </button>
      ) : (
        <QuantityStepper quantity={quantity} />
      )}

      <div className="mt-4">
        <p className="text-sm text-stone-500">
          {category}
        </p>

        <h2 className="mt-1 font-semibold">
          {name}
        </h2>

        <p className="mt-1 font-semibold text-orange-800">
          ${price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}