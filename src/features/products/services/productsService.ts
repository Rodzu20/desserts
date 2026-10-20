import { api } from '../../../shared/services/api'
import type {
  PaginatedProducts,
  Product,
  ProductFilters,
} from '../interfaces/product'

export async function getProducts(
  filters: ProductFilters = {},
  signal?: AbortSignal,
): Promise<PaginatedProducts> {
  const search = filters.search?.trim()

  const where = {
    ...(search
      ? { name: { contains: search } }
      : {}),
    ...(filters.category
      ? { categoryId: { eq: filters.category } }
      : {}),
  }

  const response = await api.get<PaginatedProducts>(
    '/products',
    {
      signal,
      params: {
        _where: JSON.stringify(where),
        _page: filters.page ?? 1,
        _per_page: 8,
      },
    },
  )

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

export async function createProduct(
  data: Omit<Product, 'id'>,
): Promise<Product> {
  const response = await api.post<Product>('/products', data)

  return response.data
}
export async function updateProduct({
  id,
  data,
}: {
  id: string
  data: Omit<Product, 'id'>
}): Promise<Product> {
  const response = await api.put<Product>(
    `/products/${encodeURIComponent(id)}`,
    data,
  )

  return response.data
}