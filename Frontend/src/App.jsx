import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProductsProvider } from './context/ProductsContext'
import { OrdersProvider } from './context/OrdersContext'
import { CartProvider } from './context/CartContext'
import { SubscribersProvider } from './context/SubscribersContext'
import { UsersProvider } from './context/UsersContext'
import { PromoProvider } from './context/PromoContext'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import CategoriesPage from './pages/CategoriesPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
      <ScrollToTop />
      <AuthProvider>
        <ProductsProvider>
          <OrdersProvider>
            <PromoProvider>
              <SubscribersProvider>
                <UsersProvider>
                  <CartProvider>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/producto/:id" element={<ProductDetail />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/categorias" element={<CategoriesPage />} />
                      <Route path="/categorias/:slug" element={<CategoryProducts />} />
                      <Route path="/admin/login" element={<Login />} />
                      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                    </Routes>
                  </CartProvider>
                </UsersProvider>
              </SubscribersProvider>
            </PromoProvider>
          </OrdersProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
