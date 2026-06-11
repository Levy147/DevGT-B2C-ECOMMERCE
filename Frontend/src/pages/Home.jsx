import HeroCarousel from '../components/HeroCarousel'
import PaginatedProductList from '../components/PaginatedProductList'
import StoreLayout from '../components/StoreLayout'
import { useProducts } from '../context/ProductsContext'

export default function Home() {
  const { products } = useProducts()

  return (
    <StoreLayout>
      <HeroCarousel />
      <PaginatedProductList
        products={products}
        title="Nuestro Catálogo"
        subtitle={`${products.length} productos disponibles`}
        defaultPerPage={15}
        showSort
      />
      <footer className="text-center py-8 text-teal text-sm border-t border-sage/20">
        <p>© 2026 Variedades Fatima · Demo desarrollado por Herbert Galeano</p>
      </footer>
    </StoreLayout>
  )
}
