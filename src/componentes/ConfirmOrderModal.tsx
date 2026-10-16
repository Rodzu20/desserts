import { useEffect, useRef } from 'react'

type ConfirmOrderModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ConfirmOrderModal({
  isOpen,
  onClose,
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
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border-0 bg-white p-0 text-stone-900 backdrop:bg-black/40"
    >
      <div className="p-6 sm:p-8">
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

        <p className="mt-3 text-stone-500">
          Esperamos que disfrutes tus postres.
        </p>

        <p className="mt-6 rounded-lg bg-orange-50 p-4 text-sm text-stone-600">
          Esta es una vista de ejemplo. No se ha realizado
          ningún pedido.
        </p>

        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="mt-6 w-full rounded-full bg-orange-800 px-6 py-3 font-semibold text-white hover:bg-orange-900"
        >
          Volver al catálogo
        </button>
      </div>
    </dialog>
  )
}