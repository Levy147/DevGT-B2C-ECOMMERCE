import { useState } from 'react'
import { ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react'
import ProductCard from './ProductCard'
import ProductSortBar from './ProductSortBar'
import { filterProducts, paginate } from '../utils/productUtils'

export default function PaginatedProductList({
  products,
  title,
  subtitle,
  categoryFilter = null,
  defaultPerPage = 15,
  showSort = true,
  showViewToggle = false,
}) {
  const [sort, setSort] = useState('default')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(defaultPerPage)
  const [view, setView] = useState('grid')

  const filtered = filterProducts(products, { category: categoryFilter, sort })
  const { items, totalPages, currentPage, total } = paginate(filtered, page, perPage)

  const handlePerPage = (n) => {
    setPerPage(n)
    setPage(1)
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-deep">{title}</h2>}
          {subtitle && <p className="text-teal text-sm mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {showSort && <ProductSortBar sort={sort} onSortChange={(v) => { setSort(v); setPage(1) }} />}
        <div className="flex items-center gap-3 ml-auto">
          {showViewToggle && (
            <div className="flex rounded-xl border border-sage/40 overflow-hidden">
              <button type="button" onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'bg-mint/40 text-forest' : 'text-teal'}`} aria-label="Vista bloques">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'bg-mint/40 text-forest' : 'text-teal'}`} aria-label="Vista lista">
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
          <select value={perPage} onChange={(e) => handlePerPage(Number(e.target.value))} className="px-3 py-2 rounded-xl border border-sage/40 text-sm text-teal bg-white">
            <option value={15}>15 por página</option>
            <option value={25}>25 por página</option>
            <option value={30}>30 por página</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-sage mb-4">{total} productos encontrados</p>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} listView />
          ))}
        </div>
      )}

      {items.length === 0 && (
        <p className="text-center py-12 text-teal">No hay productos en esta categoría</p>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex items-center gap-1 px-4 py-2 rounded-xl border border-sage/40 text-teal hover:bg-mint/20 disabled:opacity-40">
            <ChevronLeft className="w-4 h-4" /> Anterior
          </button>
          <span className="text-sm text-teal">Página {currentPage} de {totalPages}</span>
          <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex items-center gap-1 px-4 py-2 rounded-xl border border-sage/40 text-teal hover:bg-mint/20 disabled:opacity-40">
            Siguiente <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  )
}
