import { api } from '../../../shared/services/api'
import type { Category } from '../interfaces/category'

export async function getCategories(
  signal?: AbortSignal,
): Promise<Category[]> {
  const response = await api.get<Category[]>('/categories', {
    signal,
    params: { _sort: 'name' },
  })

  return response.data
}