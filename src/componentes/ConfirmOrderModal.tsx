import { useEffect, useRef } from 'react'
import type { Product } from '../types/product'

type ConfirmOrderModalProps = {
  isOpen: boolean
  onClose: () => void
  products: Product[]
}

export default function ConfirmOrderModal({
  isOpen,
  onClose,
  products,
}: ConfirmOrderModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const previewProducts = products.slice(0, 3)

  const previewTotal = previewProducts.reduce(
    (total, product) => total + product.price,
    0,
  )

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

        <p className="mt-3 text-muted">
          Esperamos que disfrutes tus postres.
        </p>

        <div className="mt-6 rounded-lg bg-soft px-4">
          {previewProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 border-b border-stone-200 py-4"
            >
              <img
                src={product.image.replace(
                  '-desktop.jpg',
                  '-thumbnail.jpg',
                )}
                alt=""
                className="h-12 w-12 rounded object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {product.name}
                </p>

                <p className="mt-1 text-sm">
                  <span className="mr-3 font-semibold text-brand">
                    1×
                  </span>

                  <span className="text-muted">
                    @ ${product.price.toFixed(2)}
                  </span>
                </p>
              </div>

              <span className="shrink-0 text-sm font-semibold">
                ${product.price.toFixed(2)}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between gap-4 py-5">
            <p className="text-sm">
              Total de ejemplo
            </p>

            <strong className="text-2xl">
              ${previewTotal.toFixed(2)}
            </strong>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted">
          Esta es una vista de ejemplo. No se ha realizado
          ningún pedido.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-[#952c0b]"
        >
          Volver al catálogo
        </button>
      </div>
    </dialog>
  )
}