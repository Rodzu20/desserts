import axios from 'axios'
import type { Product } from '../types/product'

type ProductFilters = {
  search?: string
  category?: string
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
})

export async function getProducts(
  filters: ProductFilters = {},
  signal?: AbortSignal,
): Promise<Product[]> {
  const search = filters.search?.trim()

  const response = await api.get<Product[]>('/products', {
    signal,
    params: {
      name_like: search
        ? search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        : undefined,
      category: filters.category || undefined,
    },
  })

  return response.data
}