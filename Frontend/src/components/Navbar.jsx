import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Store, LayoutDashboard, LogOut, UserPlus, LogIn, Grid3X3, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useUsers } from '../context/UsersContext'
import { formatPrice } from '../utils/productUtils'

export default function Navbar() {
  const { totalItems, totalPrice, openCart, badgePop } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const { isLoggedIn, currentUser, logoutUser } = useUsers()
  const location = useLocation()
  const navigate = useNavigate()
  const isAdmin = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login'
  const isStorefront = !location.pathname.startsWith('/admin')

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-sage/30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-forest to-deep flex items-center justify-center shadow-md">
            <Store className="w-5 h-5 text-mint" />
          </div>
          <span className="font-bold text-deep hidden sm:block">Variedades Fatima</span>
        </Link>

        {isStorefront && (
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/categorias" className="flex items-center gap-1 px-2 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium text-teal hover:bg-mint/30">
              <Grid3X3 className="w-4 h-4" /><span className="hidden md:inline">Categorías</span>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {isAdmin ? (
            <>
              <Link to="/" className="hidden sm:flex px-3 py-2 rounded-xl text-sm text-teal hover:bg-mint/30">Tienda</Link>
              <button type="button" onClick={() => { logout(); navigate('/') }} className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50">
                <LogOut className="w-4 h-4" /><span className="hidden sm:inline">Salir</span>
              </button>
            </>
          ) : isStorefront ? (
            <>
              {isLoggedIn ? (
                <Link to="/perfil" className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-teal hover:bg-mint/30">
                  <User className="w-4 h-4" /> {currentUser?.nombre?.split(' ')[0]}
                </Link>
              ) : (
                <>
                  <Link to="/login" className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-teal hover:bg-mint/30">
                    <LogIn className="w-4 h-4" /> Entrar
                  </Link>
                  <Link to="/registro" className="hidden md:flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-teal hover:bg-mint/30">
                    <UserPlus className="w-4 h-4" /> Registro
                  </Link>
                </>
              )}
              <Link to={isAuthenticated ? '/admin' : '/admin/login'} className="hidden lg:flex items-center gap-1 px-3 py-2 rounded-xl text-sm text-teal hover:bg-mint/30">
                <LayoutDashboard className="w-4 h-4" /> Admin
              </Link>
              <button type="button" onClick={openCart} className="relative flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl bg-gradient-to-br from-forest to-deep text-mint hover:shadow-lg transition-all">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <>
                    <span className="hidden sm:flex flex-col items-start text-left leading-tight">
                      <span className="text-[10px] opacity-80">{totalItems} prod.</span>
                      <span className="text-xs font-bold">{formatPrice(totalPrice)}</span>
                    </span>
                    <span className={`sm:hidden absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full ${badgePop ? 'cart-badge-pop' : ''}`}>{totalItems}</span>
                  </>
                )}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
