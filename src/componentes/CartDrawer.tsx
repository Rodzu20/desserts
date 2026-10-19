import { useEffect, useRef } from 'react'
import CartSummary from '../features/cart/components/CartSummary'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function CartDrawer({
  isOpen,
  onClose,
  onConfirm,
}: CartDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }

    const previousOverflow = document.body.style.overflow

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cart-drawer-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-dvh w-full max-w-md overflow-y-auto border-0 bg-page p-0 text-ink backdrop:bg-black/40"
    >
      <div className="min-h-full p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="cart-drawer-title"
            className="text-xl font-bold"
          >
            Tu selección
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            autoFocus
            className="rounded-full px-3 py-2 hover:bg-soft focus-visible:outline-2 focus-visible:outline-brand"
          >
            ✕
          </button>
        </div>

        <CartSummary onConfirm={onConfirm} />
      </div>
    </dialog>
  )
}