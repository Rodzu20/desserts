import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createProduct } from '../services/productsService'

export function useCreateProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })

      toast.success('Producto creado correctamente.')
    },

    onError: () => {
      toast.error(
        'No pudimos crear el producto. Comprueba la conexión con la API.',
      )
    },
  })
}