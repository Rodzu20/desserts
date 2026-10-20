type QuantityStepperProps = {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export default function QuantityStepper({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label="Cantidad del producto"
      className="relative mx-auto -mt-5 flex h-10 w-44 items-center justify-between rounded-full bg-brand px-3 text-white"
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Disminuir cantidad"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <img
          src="/assets/images/icon-decrement-quantity.svg"
          alt=""
          className="h-2.5 w-2.5"
        />
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className="text-sm font-semibold"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        aria-label="Aumentar cantidad"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <img
          src="/assets/images/icon-increment-quantity.svg"
          alt=""
          className="h-2.5 w-2.5"
        />
      </button>
    </div>
  )
}