export function getEffectivePrice(product) {
  if (product.onSale && product.salePrice != null) return product.salePrice
  return product.price
}

export function getDiscountPercent(product) {
  if (!product.onSale || !product.salePrice) return 0
  return Math.round((1 - product.salePrice / product.price) * 100)
}

export function formatPrice(price) {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
  }).format(price)
}

export function generateTrackingCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'VF-'
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export function filterProducts(products, { category, sort, search }) {
  let result = [...products]

  if (category === 'ofertas') result = result.filter((p) => p.onSale)
  else if (category === 'lo-nuevo') result = result.filter((p) => p.isNew)
  else if (category === 'mayoreo') result = result.filter((p) => p.wholesale)
  else if (category) {
    result = result.filter((p) => p.categorySlug === category)
  }

  if (search) {
    const q = search.toLowerCase()
    result = result.filter((p) => p.name.toLowerCase().includes(q))
  }

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b))
      break
    case 'price-desc':
      result.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a))
      break
    case 'offers':
      result.sort((a, b) => (b.onSale ? 1 : 0) - (a.onSale ? 1 : 0))
      break
    case 'newest':
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      break
    default:
      break
  }

  return result
}

export function paginate(items, page, perPage) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * perPage
  return {
    items: items.slice(start, start + perPage),
    totalPages,
    currentPage,
    total: items.length,
  }
}
