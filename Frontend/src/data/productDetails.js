const REVIEW_AUTHORS = [
  'María González',
  'Carlos Méndez',
  'Ana Lucía Herrera',
  'Roberto Paz',
  'Sandra Morales',
]

const REVIEW_TEXTS = [
  'Excelente calidad, justo lo que necesitaba para la casa. Lo recomiendo totalmente.',
  'Muy buen precio y llegó en perfectas condiciones. Volveré a comprar.',
  'Producto fresco y de buena presentación. La Tía Fatima nunca falla.',
  'Buena relación calidad-precio. Ideal para el día a día en Guatemala.',
  'Me encantó, superó mis expectativas. Entrega rápida y atención amable.',
]

export function enrichProduct(product) {
  const sku = `VF-${String(product.id).padStart(4, '0')}-${product.category.slice(0, 3).toUpperCase()}`
  const rating = 4.6 + (product.id % 5) * 0.08

  const reviews = [0, 1, 2].map((i) => ({
    id: product.id * 10 + i,
    author: REVIEW_AUTHORS[(product.id + i) % REVIEW_AUTHORS.length],
    rating: 5,
    text: REVIEW_TEXTS[(product.id + i) % REVIEW_TEXTS.length],
    date: new Date(Date.now() - (i + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
  }))

  return {
    ...product,
    sku,
    rating: Math.min(5, Math.round(rating * 10) / 10),
    reviewCount: 18 + product.id * 3,
    description: `${product.name} de la más alta calidad, seleccionado cuidadosamente para las familias guatemaltecas. Producto fresco, empacado con los más altos estándares de higiene y disponible en Variedades Fatima con entrega a domicilio en tu zona.`,
    features: [
      'Producto 100% original y verificado',
      'Empaque sellado y en perfectas condiciones',
      `Categoría: ${product.category}`,
      'Ideal para consumo diario en el hogar',
      'Disponible para entrega a domicilio',
    ],
    reviews,
  }
}

export function getProductById(products, id) {
  const product = products.find((p) => p.id === Number(id))
  return product ? enrichProduct(product) : null
}
