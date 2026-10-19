import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import {
  getProductById,
  getProducts,
} from '../services/productsService'
import type { ProductFilters } from '../interfaces/product'

export function useProductsQuery(
  filters: ProductFilters = {},
) {
  return useQuery({
    queryKey: ['products', 'list', filters],
    queryFn: ({ signal }) => getProducts(filters, signal),
    retry: 1,
  })
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: ['products', 'detail', id],
    queryFn: ({ signal }) => getProductById(id, signal),
    enabled: Boolean(id),
    retry: (failureCount, error) => {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 404
      ) {
        return false
      }

      return failureCount < 1
    },
  })
}