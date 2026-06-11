import { ArrowUpDown } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'default', label: 'Relevancia' },
  { value: 'price-asc', label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
  { value: 'offers', label: 'Ofertas' },
  { value: 'newest', label: 'Lo más nuevo' },
]

export default function ProductSortBar({ sort, onSortChange }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <ArrowUpDown className="w-4 h-4 text-teal shrink-0" />
      <label htmlFor="sort" className="text-sm text-teal font-medium shrink-0">Ordenar:</label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-sage/40 text-sm text-deep bg-white focus:outline-none focus:ring-2 focus:ring-teal/50"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
