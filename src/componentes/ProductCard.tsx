import QuantityStepper from './QuantityStepper'
import { useCartStore } from '../features/cart/stores/userCartStore'
import CategoryBadge from '../features/categories/components/CategoryBadge'
type ProductCardProps = {
  id: string
  name: string
  categoryId: string
  price: number
  image: string
}

export default function ProductCard({
  id,
  name,
  categoryId,
  price,
  image,
}: ProductCardProps) {
  const quantity = useCartStore(
    (state) =>
      state.items.find((item) => item.id === id)?.quantity ?? 0,
  )

  const addProduct = useCartStore((state) => state.addProduct)
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  )
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  )

  return (
    <article>
      <picture>
        <source media="(min-width: 1024px)" srcSet={image} />

        <source
          media="(min-width: 640px)"
          srcSet={image.replace('-desktop.jpg', '-tablet.jpg')}
        />

        <img
          src={image.replace('-desktop.jpg', '-mobile.jpg')}
          alt={name}
          loading="lazy"
          className={`aspect-[1.5] w-full rounded-lg object-cover sm:aspect-square lg:aspect-[1.05] ${
            quantity > 0 ? 'ring-2 ring-brand' : ''
          }`}
        />
      </picture>

      {quantity === 0 ? (
        <button
          type="button"
          onClick={() =>
            addProduct({ id, name, categoryId, price, image })
          }
          className="relative mx-auto -mt-5 flex h-10 w-44 items-center justify-center gap-2 rounded-full border border-stone-400 bg-white text-sm font-semibold hover:border-brand hover:text-brand"
        >
          <img
            src="/assets/images/icon-add-to-cart.svg"
            alt=""
            className="h-5 w-5"
          />
          Añadir al carrito
        </button>
      ) : (
        <QuantityStepper
          quantity={quantity}
          onIncrease={() => increaseQuantity(id)}
          onDecrease={() => decreaseQuantity(id)}
        />
      )}

      <div className="mt-4">
        <CategoryBadge categoryId={categoryId} />

        <h2 className="mt-1 font-semibold">{name}</h2>

        <p className="mt-1 font-semibold text-brand">
          ${price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}