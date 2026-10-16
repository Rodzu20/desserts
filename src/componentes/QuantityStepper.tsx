type QuantityStepperProps = {
  quantity: number
}

export default function QuantityStepper({
  quantity,
}: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label="Selector de cantidad de ejemplo"
      className="relative mx-auto -mt-5 flex h-10 w-44 items-center justify-between rounded-full bg-orange-800 px-3 text-white"
    >
      <button
        type="button"
        disabled
        aria-label="Disminuir cantidad"
        className="flex h-5 w-5 items-center justify-center rounded-full border border-white"
      >
        <img
          src="/assets/images/icon-decrement-quantity.svg"
          alt=""
          className="h-2.5 w-2.5"
        />
      </button>

      <span className="text-sm font-semibold">
        {quantity}
      </span>

      <button
        type="button"
        disabled
        aria-label="Aumentar cantidad"
        className="flex h-5 w-5 items-center justify-center rounded-full border border-white"
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