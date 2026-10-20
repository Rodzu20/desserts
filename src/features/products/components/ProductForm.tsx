import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCategoriesQuery } from '../../categories/hooks/useCategoriesQuery'
import {
  productSchema,
  type ProductFormValues,
} from '../schemas/productSchema'

type ProductFormProps = {
  defaultValues?: Partial<ProductFormValues>
  onSubmit: (values: ProductFormValues) => void
  isPending: boolean
  errorMessage?: string
  submitLabel?: string
}

const inputClassName =
  'mt-2 w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20'

export default function ProductForm({
  defaultValues,
  onSubmit,
  isPending,
  errorMessage,
  submitLabel = 'Guardar producto',
}: ProductFormProps) {
  const categoriesQuery = useCategoriesQuery()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      image: '',
      ...defaultValues,
    },
  })

  if (categoriesQuery.isPending) {
    return <p role="status">Cargando categorías…</p>
  }

  if (categoriesQuery.isError) {
    return (
      <div role="alert">
        <p>No pudimos cargar las categorías.</p>

        <button
          type="button"
          onClick={() => {
            void categoriesQuery.refetch()
          }}
          className="mt-3 font-semibold text-brand underline"
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (categoriesQuery.data.length === 0) {
    return (
      <p role="status">
        No hay categorías disponibles para crear el producto.
      </p>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        disabled={isPending}
        className="space-y-5 disabled:opacity-60"
      >
        <legend className="sr-only">
          Datos del producto
        </legend>

        <div>
          <label htmlFor="product-name" className="font-semibold">
            Nombre
          </label>

          <input
            id="product-name"
            {...register('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClassName}
          />

          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-sm text-red-700">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="product-category" className="font-semibold">
            Categoría
          </label>

          <select
            id="product-category"
            {...register('categoryId')}
            aria-invalid={Boolean(errors.categoryId)}
            aria-describedby={
              errors.categoryId ? 'category-error' : undefined
            }
            className={inputClassName}
          >
            <option value="">Selecciona una categoría</option>

            {categoriesQuery.data.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p id="category-error" role="alert" className="mt-1 text-sm text-red-700">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="product-price" className="font-semibold">
            Precio
          </label>

          <input
            id="product-price"
            type="number"
            min="0.01"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            aria-invalid={Boolean(errors.price)}
            aria-describedby={errors.price ? 'price-error' : undefined}
            className={inputClassName}
          />

          {errors.price && (
            <p id="price-error" role="alert" className="mt-1 text-sm text-red-700">
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="product-image" className="font-semibold">
            Ruta de la imagen
          </label>

          <input
            id="product-image"
            {...register('image')}
            placeholder="/assets/images/image-waffle-desktop.jpg"
            aria-invalid={Boolean(errors.image)}
            aria-describedby={
              errors.image ? 'image-help image-error' : 'image-help'
            }
            className={inputClassName}
          />

          <p id="image-help" className="mt-1 text-sm text-muted">
            Utiliza la ruta de una imagen local de tus postres.
          </p>

          {errors.image && (
            <p id="image-error" role="alert" className="mt-1 text-sm text-red-700">
              {errors.image.message}
            </p>
          )}
        </div>

        {errorMessage && (
          <p role="alert" className="text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-[#952c0b] disabled:cursor-wait"
        >
          {isPending ? 'Guardando…' : submitLabel}
        </button>
      </fieldset>
    </form>
  )
}