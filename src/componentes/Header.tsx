export default function Header() {
  return (
    <header className="border-b border-orange-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="text-2xl font-bold text-orange-800">
          Desserts
        </a>

        <button
          type="button"
          className="rounded-full border border-orange-800 px-4 py-2 text-sm text-orange-800 hover:bg-orange-100"
        >
          Carrito (0)
        </button>
      </div>
    </header>
  )
}