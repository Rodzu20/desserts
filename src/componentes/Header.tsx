import { Link } from 'react-router'
import {
  selectCartCount,
  useCartStore,
} from '../features/cart/stores/userCartStore'

type HeaderProps = {
  onOpenCart: () => void
}

export default function Header({ onOpenCart }: HeaderProps) {
  const count = useCartStore(selectCartCount)

  return (
    <header className="border-b border-stone-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="text-2xl font-bold text-brand"
        >
          Desserts
        </Link>

        <button
          type="button"
          onClick={onOpenCart}
          aria-haspopup="dialog"
          className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-soft"
        >
          <span aria-hidden="true">🛒</span>{' '}
          Carrito ({count})
        </button>
      </div>
    </header>
  )
}