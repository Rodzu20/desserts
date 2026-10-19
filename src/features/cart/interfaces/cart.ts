import type { Product } from '../../../types/product'

export type CartItem = Pick<
  Product,
  'id' | 'name' | 'price' | 'image'
> & {
  quantity: number
}

export interface CartStore {
  items: CartItem[]
  addProduct: (product: Product) => void
  removeProduct: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
}
export interface OrderSummary {
  items: CartItem[]
  total: number
}