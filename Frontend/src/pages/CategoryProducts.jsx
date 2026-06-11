import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import StoreLayout from '../components/StoreLayout'
import PaginatedProductList from '../components/PaginatedProductList'
import { useProducts } from '../context/ProductsContext'
import { getCategoryBySlug } from '../data/categories'

export default function CategoryProducts() {
  const { slug } = useParams()
  const { products } = useProducts()
  const category = getCategoryBySlug(slug)

  const title = category?.name ?? slug
  const subtitle =
    slug === 'ofertas'
      ? 'Productos con descuento activo'
      : slug === 'lo-nuevo'
        ? 'Recién llegados a nuestra tienda'
        : slug === 'mayoreo'
          ? 'Precios especiales por volumen'
          : `Productos de ${title}`

  return (
    <StoreLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <Link to="/categorias" className="inline-flex items-center gap-2 text-teal hover:text-forest text-sm font-medium mb-4">
          <ArrowLeft className="w-4 h-4" /> Todas las categorías
        </Link>
      </div>
      <PaginatedProductList
        products={products}
        title={title}
        subtitle={subtitle}
        categoryFilter={slug}
        defaultPerPage={15}
      />
    </StoreLayout>
  )
}
