const REVIEW_AUTHORS = [
  'Maria Gonzalez',
  'Carlos Mendez',
  'Ana Lucia Herrera',
  'Roberto Paz',
  'Sandra Morales',
]

const REVIEW_TEXTS = [
  'Excelente calidad, justo lo que necesitaba para la casa. Lo recomiendo totalmente.',
  'Muy buen precio y llego en perfectas condiciones. Volvere a comprar.',
  'Producto fresco y de buena presentacion. La Tia Fatima nunca falla.',
  'Buena relacion calidad-precio. Ideal para el dia a dia en Guatemala.',
  'Me encanto, supero mis expectativas. Entrega rapida y atencion amable.',
]

const QUALITY_DESCRIPTIONS = {
  'Shampoo 3 en 1 750ml': 'Shampoo profesional de triple accion con formula enriquecida con keratin activa y aceites esenciales. Limpia profundamente, acondiciona naturalmente y aporta un brillo espectacular. Su pH balanceado respeta el cuero cabelludo mientras elimina impurezas. Disenado para uso familiar diario con la maxima calidad que tu cabello merece.',
  'Crema Corporal Hidratante 200ml': 'Crema corporal de textura sedosa con vitamina E pura, aloe vera organico y manteca de karite. Absorcion inmediata sin sensacion grasosa. Hidratacion profunda por 24 horas que restaura la barrera natural de la piel. Piel visiblemente mas suave, tersa y luminosa desde la primera aplicacion. Dermatologicamente probada.',
  'Carne de Res Primera 1 lb': 'Carne de res seleccionada de los mejores cortes guatemaltecos, criada en fincas de altura con alimentacion natural. Textura tierna y sabor incomparable. Empacada al vacio para preservar su frescura y jugosidad. Ideal para asados, guisos y toda la cocina tradicional.',
  'Chorizos Artesanales 1 lb': 'Chorizos artesanales elaborados con receta tradicional guatemalteca, carne de cerdo de primera calidad y especias naturales seleccionadas. Ahumados lentamente con leña de pino para un sabor autentico e inigualable. Sin conservantes artificiales ni colorantes.',
  'Tomate Fresco 1 lb': 'Tomates cultivados en las fertiles tierras guatemaltecas, cosechados en su punto optimo de maduracion. Rojos, firmes y jugosos con el sabor autentico del campo. Ricos en licopeno y antioxidantes naturales. Seleccionados uno a uno para garantizar la mejor calidad.',
  'Zanahoria Premium 1 lb': 'Zanahorias de origen agricola local, cultivadas con practicas sostenibles. Dulces naturalmente, crujientes y llenas de color. Altas en betacaroteno y vitamina A. Lavadas y seleccionadas a mano para ofrecerte solo lo mejor.',
  'Lechuga Hidroponica 1 unidad': 'Lechuga hidroponica de cultivo controlado, libre de pesticidas y contaminantes. Hojas frescas, crujientes y de un verde vibrante. Cosechada en el momento justo para maximizar su valor nutritional y frescura.',
  'Papa Guatemalteca 1 lb': 'Papas nativas de las tierras altas de Guatemala, reconocidas por su textura firme y sabor autentico. Cosecha fresca directa del agricultor a tu mesa. Versatiles para cualquier preparacion culinaria.',
  'Cebolla Blanca 1 lb': 'Cebollas blancas de cultivo local con el sabor clasico de la cocina guatemalteca. Bulbos firmes, de cascara crujiente y sabor intenso pero equilibrado. Fuente natural de quercetina y antioxidantes.',
  'Agua Purificada 1 Galon': 'Agua purificada mediante proceso de osmosis inversa de 5 etapas, libre de cloro, sedimentos y contaminantes. Pureza certificada con minerales esenciales para una hidratacion saludable.',
  'Huevos Frescos (30 uds)': 'Huevos de gallinas criadas en libertad, alimentadas con granos naturales y libres de hormonas. Cascara firme y yema de color anaranjado intenso que refleja su alto contenido nutritional.',
  'Queso Fresco 400g': 'Queso fresco artesanal elaborado con leche 100% natural de vacas guatemaltecas. Textura suave y cremosa con el sabor tradicional que solo la receta de la abuela puede ofrecer.',
  'Crema de Leche 500ml': 'Crema de leche espesa y cremosa con alto contenido de grasa butirica. Ideal para cocinar, reposteria y acompanar tus platillos favoritos. Elaborada con leche fresca de la mas alta calidad.',
  'Cafe Antigua Tostado 340g': 'Cafe de altura de la region de Antigua Guatemala, tostado artesanalmente en lotes pequenos para preservar su perfil de sabor unico. Notas de chocolate oscuro y caramelo con un final suave y limpio.',
  'Jugo de Naranja Natural 1L': 'Jugo de naranja natural recien exprimido de naranjas cultivadas en el oriente de Guatemala. Sin concentrados, sin azucares anadidos, sin preservativos. Solo el sabor puro de la fruta.',
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
    description: customDescription || `${product.name} de la mas alta calidad, seleccionado cuidadosamente para las familias guatemaltecas. Producto fresco, empacado con los mas altos estandares de higiene y disponible en Variedades Fatima con entrega a domicilio en tu zona.`,
    features: [
      'Producto 100% original y verificado',
      'Empaque sellado y en perfectas condiciones',
      `Categoria: ${product.category}`,
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
