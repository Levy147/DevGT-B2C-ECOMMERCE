import { Link } from 'react-router-dom'
import { Grid3X3, Sparkles, Tag, Boxes } from 'lucide-react'
import StoreLayout from '../components/StoreLayout'
import { CATEGORIES, SPECIAL_CATEGORIES } from '../data/categories'

export default function CategoriesPage() {
  return (
    <StoreLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <h1 className="text-3xl font-bold text-deep mb-2">Categorías</h1>
        <p className="text-teal mb-8">Explora nuestro catálogo por sección</p>

        {/* Especiales creativos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {SPECIAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/categorias/${cat.slug}`}
              className={`group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${cat.color} text-white hover:scale-[1.02] hover:shadow-xl transition-all`}
            >
              <span className="text-3xl mb-2 block">{cat.badge}</span>
              <h2 className="text-xl font-bold">{cat.name}</h2>
              <p className="text-white/80 text-sm mt-1">{cat.description}</p>
              <cat.icon className="absolute -bottom-2 -right-2 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Grid3X3 className="w-5 h-5 text-forest" />
          <h2 className="text-xl font-bold text-deep">Todas las categorías</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/categorias/${cat.slug}`}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-sage/30 overflow-hidden hover:shadow-lg hover:scale-[1.03] transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={cat.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-3 flex items-center gap-2">
                <cat.icon className="w-4 h-4 text-forest shrink-0" />
                <span className="font-semibold text-deep text-sm">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/categorias/ofertas" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors">
            <Tag className="w-4 h-4" /> Ofertas del día
          </Link>
          <Link to="/categorias/lo-nuevo" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500 text-white font-semibold text-sm hover:bg-violet-600 transition-colors">
            <Sparkles className="w-4 h-4" /> Lo Nuevo
          </Link>
          <Link to="/categorias/mayoreo" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest text-mint font-semibold text-sm hover:bg-teal transition-colors">
            <Boxes className="w-4 h-4" /> Mayoreo
          </Link>
        </div>
      </div>
    </StoreLayout>
  )
}
