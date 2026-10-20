import { Route, Routes } from 'react-router'
import CatalogPage from '../features/products/pages/CatalogPage'
import ProductDetailPage from '../features/products/pages/ProductDetailPage'
import NotFoundPage from '../shared/pages/NotFoundPage'
import CreateProductPage from '../features/products/pages/CreateProductPage'
import EditProductPage from '../features/products/pages/EditProductPage'
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
            <Route
                path="/productos/:id/editar"
                element={<EditProductPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}