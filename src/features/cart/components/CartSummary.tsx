import EmptyCart from '../../../componentes/EmptyCart'
import {
  selectCartCount,
  selectCartTotal,
  useCartStore,
} from '../stores/userCartStore'

export default function CartSummary() {
  const items = useCartStore((state) => state.items)
  const count = useCartStore(selectCartCount)
  const total = useCartStore(selectCartTotal)

  const removeProduct = useCartStore(
    (state) => state.removeProduct,
  )
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  )
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  )

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="rounded-xl bg-white p-6">
      <h2 className="text-2xl font-bold text-brand">
        Tu carrito ({count})
      </h2>

      <ul className="mt-4 divide-y divide-stone-200">
        {items.map((item) => (
          <li key={item.id} className="py-4">
            <div className="flex items-start gap-3">
              <img
                src={item.image.replace(
                  '-desktop.jpg',
                  '-thumbnail.jpg',
                )}
                alt=""
                className="h-12 w-12 rounded object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  {item.name}
                </p>

                <p className="mt-1 text-sm text-muted">
                  ${item.price.toFixed(2)} por unidad
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeProduct(item.id)}
                aria-label={`Quitar ${item.name} del carrito`}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-muted text-muted hover:border-brand hover:text-brand"
              >
                ×
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div
                role="group"
                aria-label={`Cantidad de ${item.name}`}
                className="flex items-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => decreaseQuantity(item.id)}
                  aria-label={`Disminuir cantidad de ${item.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 hover:border-brand hover:text-brand"
                >
                  −
                </button>

                <span className="text-sm font-semibold">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => increaseQuantity(item.id)}
                  aria-label={`Aumentar cantidad de ${item.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 hover:border-brand hover:text-brand"
                >
                  +
                </button>
              </div>

              <span className="text-sm font-semibold">
                $
                {(
                  Math.round(item.price * 100) *
                  item.quantity /
                  100
                ).toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-5">
        <span>Total del pedido</span>

        <strong className="text-2xl">
          ${total.toFixed(2)}
        </strong>
      </div>
    </div>
  )
}