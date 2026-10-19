export interface Product {
  id: string
  name: string
  categoryId: string
  price: number
  image: string
}

export interface ProductFilters {
  search?: string
  category?: string
  page?: number
}

export interface PaginatedProducts {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: Product[]
}