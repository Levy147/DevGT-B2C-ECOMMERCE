const REVIEW_AUTHORS = [
  'Maria Gonzalez',
  'Carlos Mendez',
  'Ana Lucia Herrera',
  'Roberto Paz',
  'Sandra Morales',
]

const REVIEW_TEXTS = [
  'Increible calidad, mi familia AMO este producto. Repetire sin dudas.',
  'Precio super justo y llega rapidisimo. Ya estoy haciendo mi segunda compra.',
  'Fresh, delicioso y con esa calidad que solo Variedades Fatima ofrece.',
  'Mejor que en el supermercado. La relacion calidad-precio es brutal.',
  'Le encanto a todos en casa. Sabe tan bien que parece hecho en casa.',
]

const QUALITY_DESCRIPTIONS = {
  'Arroz Blanco Premium 1 lb': 'El arroz mas suave y esponjoso que probaras. Grano seleccionado que queda perfecto, ni se pasa ni se pega. Ideal para tus frijoles, guisados o ese arroz con pollo que a todos les encanta. Punto premium para tu mesa.',
  'Frijol Negro Guatemalteco 2 lb': 'Frijol negro criollo del bueno. Cocido queda cremoso, con ese sabor profundo y autentico que solo el campo guatemalteco regala. Perfecto para tus parrilladas, casamientos o para comerlos solitos con crema y queso.',
  'Avena Integral 500g': 'Avena de grano entero, pura y natural. Al desayuno te llena de energia sin esa sensacion pesada. Cremosa, suave y deliciosa con canela y leche. La forma mas rica de empezar el dia.',
  'Tomate Fresco 1 lb': 'Tomates rojitos, firmes y jugosos como los de la abuela. Con ese sabor dulce y acido bien balanceado que solo la tierra fertile da. Perfectos para tu cocido, tus chirmoles o simplemente en rebanadas con sal y limon.',
  'Zanahoria Premium 1 lb': 'Zanahorias dulces y crujientes que enamoran. Con ese color naranja intenso que promete vitamina A pura. Perfectas para tus caldos, ensaladas o para roerlas como snack natural.',
  'Lechuga Hidroponica 1 unidad': 'Lechuga super fresca, cultivada sin tierra ni pesticidas. Cada hoja es crocante, limpia y llena de sabor. La base perfecta para tus ensaladas, tacos o hamburguesas caseras.',
  'Papa Guatemalteca 1 lb': 'Papa de las tierras altas de Guatemala, con esa textura firme que la hace perfecta para todo: fritas, sancochadas, en guisos o al horno. No se deshace, queda siempre en su punto.',
  'Carne de Res Primera 1 lb': 'Carne de primera, jugosa y tierna. Cortes seleccionados de fincas guatemaltecas, con ese marmoleo perfecto que se derrite en la boca. Para tus asados, bistecs o guisos que dejaran a todos pidiendo mas.',
  'Chorizos Artesanales 1 lb': 'Chorizo hecho a la antigua, con receta tradicional y ese ahumado de lena de pino que lo hace unico. Carnoso, jugoso y con el punto justo de especias. En la plancha es una experiencia divina.',
  'Aceite Vegetal 900ml': 'Aceite puro y ligero que no enmascara los sabores. Ideal para freir tus platillos favoritos sin que queden aceitosos. Desde chicharrones hasta buñuelos, todo queda mas rico y mas saludable.',
  'Azucar Morena 2 lb': 'Azucar morena con ese toque a caramelo que endulza la vida. Perfecta para tu cafe de la manana, tus postres horneados o para hacer ese delicioso atol de elote.',
  'Agua Purificada 1 Galon': 'Agua pura, cristalina y refrescante. Purificada con osmosis inversa para que tomes la mejor agua sin sabores raros ni quimicos. Ideal para toda la familia, para cocinar o para llevar al trabajo.',
  'Huevos Frescos (30 uds)': 'Huevos de campo, con yema anaranjada y cascara firme. De gallinas criadas en libertad, alimentadas naturalmente. Fresquisimos, perfectos para tu desayuno, tus tortitas o un buen huevo revuelto.',
  'Crema de Leche 500ml': 'Crema espesa, suave y con ese sabor que transforma cualquier platillo. Ideal para tus pastas, tus salsas o para acompanar esos frijoles volteados. Un toque gourmet a tu cocina.',
  'Shampoo 3 en 1 750ml': 'Shampoo que lo hace todo: limpia profundo, acondiciona y da brillo en un solo paso. Con keratin y aceites naturales que dejan tu cabello suave, manejable y con olor a limpio todo el dia. Ideal para toda la familia.',
  'Crema Corporal Hidratante 200ml': 'Crema que se absorbe al instante sin dejar sensacion pegajosa. Con vitamina E y aloe vera que hidratan en serio. Tu piel queda suave como la seda y con un aroma sutil que dura horas.',
}

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

  const customDescription = QUALITY_DESCRIPTIONS[product.name]

  return {
    ...product,
    sku,
    rating: Math.min(5, Math.round(rating * 10) / 10),
    reviewCount: 18 + product.id * 3,
    description: customDescription || `${product.name} de primera calidad, seleccionado especialmente para ti. Fresco, delicioso y con el sabor que solo Variedades Fatima te ofrece. Perfecto para consentir a tu familia.`,
    features: [
      'Producto 100% original y fresco',
      'Empaque sellado que conserva todo el sabor',
      `Categoria: ${product.category}`,
      'Perfecto para consentir a tu familia',
      'Pide hoy y recibe en tu casa',
    ],
    reviews,
  }
}

export function getProductById(products, id) {
  const product = products.find((p) => p.id === Number(id))
  return product ? enrichProduct(product) : null
}
