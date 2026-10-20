import { useEffect, useRef } from 'react'

type DeleteProductModalProps = {
  isOpen: boolean
  productName: string
  isPending: boolean
  errorMessage?: string
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteProductModal({
  isOpen,
  productName,
  isPending,
  errorMessage,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
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
      aria-labelledby="delete-product-title"
      aria-describedby="delete-product-description"
      aria-busy={isPending}
      onCancel={(event) => {
        event.preventDefault()

        if (!isPending) onClose()
      }}
      onClick={(event) => {
        if (
          event.target === event.currentTarget &&
          !isPending
        ) {
          onClose()
        }
      }}
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border-0 bg-white p-6 text-ink backdrop:bg-black/40"
    >
      <h2
        id="delete-product-title"
        className="text-2xl font-bold"
      >
        Eliminar producto
      </h2>

      <p
        id="delete-product-description"
        className="mt-4 text-muted"
      >
        ¿Quieres eliminar{' '}
        <strong className="text-ink">{productName}</strong>?
        Esta acción no se puede deshacer.
      </p>

      {errorMessage && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          autoFocus
          disabled={isPending}
          onClick={onClose}
          className="rounded-full border border-stone-300 px-5 py-2 font-semibold hover:bg-soft disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={onConfirm}
          className="rounded-full bg-red-700 px-5 py-2 font-semibold text-white hover:bg-red-800 disabled:cursor-wait disabled:opacity-50"
        >
          {isPending ? 'Eliminando…' : 'Sí, eliminar'}
        </button>
      </div>
    </dialog>
  )
}