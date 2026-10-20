import { Route, Routes } from 'react-router'
import CatalogPage from '../pages/CatalogPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import NotFoundPage from '../pages/NotFoundPage'
import CreateProductPage from '../features/products/pages/CreateProductPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />

      <Route
        path="/productos/nuevo"
        element={<CreateProductPage />}
      />

      <Route
        path="/producto/:id"
        element={<ProductDetailPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}