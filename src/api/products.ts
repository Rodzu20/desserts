import { api } from '../shared/services/api'
import type { Product } from '../types/product'

type ProductFilters = {
  search?: string
  category?: string
}

export async function getProducts(
  filters: ProductFilters = {},
  signal?: AbortSignal,
): Promise<Product[]> {
  const search = filters.search?.trim()

  const where = {
    ...(search
      ? { name: { contains: search } }
      : {}),
    ...(filters.category
      ? { categoryId: { eq: filters.category } }
      : {}),
  }

  const response = await api.get<Product[]>('/products', {
    signal,
    params: {
      _where: JSON.stringify(where),
    },
  })

  return response.data
}

export async function getProductById(
  id: string,
  signal?: AbortSignal,
): Promise<Product> {
  const response = await api.get<Product>(
    `/products/${encodeURIComponent(id)}`,
    { signal },
  )

  return response.data
}