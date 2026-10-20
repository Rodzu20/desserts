import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productsService'

import { useCartStore } from '../../cart/stores/userCartStore'

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

export function useUpdateProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProduct,

    onSuccess: async (product) => {
      queryClient.setQueryData(
        ['products', 'detail', product.id],
        product,
      )

      useCartStore.setState((state) => ({
        items: state.items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                name: product.name,
                price: product.price,
                image: product.image,
              }
            : item,
        ),
      }))

      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })

      toast.success('Producto actualizado correctamente.')
    },

    onError: () => {
      toast.error(
        'No pudimos actualizar el producto. Comprueba la conexión con la API.',
      )
    },
  })
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: async (_, id) => {
      useCartStore.getState().removeProduct(id)

      queryClient.removeQueries({
        queryKey: ['products', 'detail', id],
        exact: true,
      })

      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })

      toast.success('Producto eliminado correctamente.')
    },

    onError: () => {
      toast.error(
        'No pudimos eliminar el producto. Comprueba la conexión con la API.',
      )
    },
  })
}