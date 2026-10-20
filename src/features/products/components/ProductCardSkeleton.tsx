export default function ProductCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="motion-safe:animate-pulse"
    >
      <div className="aspect-[1.5] w-full rounded-lg bg-stone-200 sm:aspect-square lg:aspect-[1.05]" />

      <div className="relative mx-auto -mt-5 flex h-10 w-44 items-center justify-center rounded-full border border-stone-200 bg-white">
        <div className="h-3 w-24 rounded bg-stone-200" />
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-20 rounded bg-stone-200" />
        <div className="h-4 w-4/5 rounded bg-stone-200" />
        <div className="h-4 w-14 rounded bg-stone-200" />
      </div>
    </article>
  )
}