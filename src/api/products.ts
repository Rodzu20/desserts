import axios from 'axios'
import type { Product } from '../types/product'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
})

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>('/products')

  return response.data
}