import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../services/categoriesService'

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: ({ signal }) => getCategories(signal),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}