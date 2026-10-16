import { Route, Routes } from 'react-router'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<CatalogPage />}
      />

      <Route
        path="/producto/:id"
        element={<ProductDetailPage />}
      />

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  )
}