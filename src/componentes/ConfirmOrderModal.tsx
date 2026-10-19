import { useEffect, useRef } from 'react'
import type { OrderSummary } from '../features/cart/interfaces/cart'

type ConfirmOrderModalProps = {
  isOpen: boolean
  onClose: () => void
  order: OrderSummary | null
}

export default function ConfirmOrderModal({
  isOpen,
  onClose,
  order,
}: ConfirmOrderModalProps) {
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
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation-description"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border-0 bg-white p-0 text-ink backdrop:bg-black/40"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar confirmación"
          autoFocus
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-soft"
        >
          ✕
        </button>

        <img
          src="/assets/images/icon-order-confirmed.svg"
          alt=""
          className="h-12 w-12"
        />

        <h2
          id="confirmation-title"
          className="mt-6 text-3xl font-bold"
        >
          ¡Pedido confirmado!
        </h2>

        <p
          id="confirmation-description"
          className="mt-3 text-muted"
        >
          Esperamos que disfrutes tus postres.
        </p>

        <div className="mt-6 rounded-lg bg-soft px-4">
          <ul className="divide-y divide-stone-200">
            {order?.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 py-4"
              >
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

                  <p className="mt-1 text-sm">
                    <span className="mr-3 font-semibold text-brand">
                      {item.quantity}×
                    </span>

                    <span className="text-muted">
                      @ ${item.price.toFixed(2)}
                    </span>
                  </p>
                </div>

                <span className="shrink-0 text-sm font-semibold">
                  $
                  {(
                    Math.round(item.price * 100) *
                    item.quantity /
                    100
                  ).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-4 border-t border-stone-200 py-5">
            <p className="text-sm">Total del pedido</p>

            <strong className="text-2xl">
              ${(order?.total ?? 0).toFixed(2)}
            </strong>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-[#952c0b]"
        >
          Empezar nuevo pedido
        </button>
      </div>
    </dialog>
  )
}