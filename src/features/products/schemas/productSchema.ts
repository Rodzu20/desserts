import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Escribe al menos 3 caracteres.')
    .max(100, 'El nombre admite hasta 100 caracteres.'),

  categoryId: z
    .string()
    .min(1, 'Selecciona una categoría.'),

  price: z
    .number({ error: 'Ingresa un precio válido.' })
    .positive('El precio debe ser mayor que cero.'),

  image: z
    .string()
    .trim()
    .startsWith(
      '/assets/images/',
      'Usa una ruta que empiece por /assets/images/.',
    ),
})

export type ProductFormValues = z.infer<typeof productSchema>