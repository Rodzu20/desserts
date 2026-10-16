export default function EmptyCart() {
  return (
    <div className="rounded-xl bg-white p-6">
      <h2 className="text-2xl font-bold text-orange-800">
        Tu carrito (0)
      </h2>

      <div className="flex flex-col items-center py-8">
        <img
          src="/assets/images/illustration-empty-cart.svg"
          alt=""
          className="h-36 w-36"
        />

        <p className="mt-4 text-center text-sm font-semibold text-stone-500">
          Tus postres aparecerán aquí
        </p>
      </div>
    </div>
  )
}