const PRODUCT_TEMPLATES = [
  // Granos (5)
  { name: 'Arroz Blanco Premium 1 lb', category: 'Granos', price: 8.5, image: '/images/productos/arroz.avif' },
  { name: 'Frijol Negro Guatemalteco 2 lb', category: 'Granos', price: 12, image: '/images/productos/FrijolNegro.jpg' },
  { name: 'Avena Integral 500g', category: 'Granos', price: 14.5, image: '/images/productos/avena.jpeg' },

  // Frutas y Verduras (4)
  { name: 'Tomate Fresco 1 lb', category: 'Frutas y Verduras', price: 5, image: '/images/productos/Tomate.webp' },
  { name: 'Zanahoria Premium 1 lb', category: 'Frutas y Verduras', price: 4.5, image: '/images/productos/Zanahoria.jpg' },
  { name: 'Lechuga Hidroponica 1 unidad', category: 'Frutas y Verduras', price: 6, image: '/images/productos/Lechuga.jpeg' },
  { name: 'Papa Guatemalteca 1 lb', category: 'Frutas y Verduras', price: 5.5, image: '/images/productos/Papa.webp' },

  // Carnes (2)
  { name: 'Carne de Res Primera 1 lb', category: 'Carnes', price: 28, image: '/images/productos/Carne.webp' },
  { name: 'Chorizos Artesanales 1 lb', category: 'Carnes', price: 22, image: '/images/productos/Chorizos.webp' },

  // Despensa (2)
  { name: 'Aceite Vegetal 900ml', category: 'Despensa', price: 18.75, image: '/images/productos/Aceite.png', onSale: true, salePrice: 15.99 },
  { name: 'Azucar Morena 2 lb', category: 'Despensa', price: 9.25, image: '/images/productos/Azucar.jpeg' },

  // Bebidas (1)
  { name: 'Agua Purificada 1 Galon', category: 'Bebidas', price: 8, image: '/images/productos/AguaPUra.jpeg' },

  // Lacteos (4)
  { name: 'Huevos Frescos (30 uds)', category: 'Lacteos', price: 28, image: '/images/productos/Huevos.jpeg', onSale: true, salePrice: 24.5 },
  { name: 'Crema de Leche 500ml', category: 'Lacteos', price: 18, image: '/images/productos/CremaComida.webp' },

  // Cuidado Personal (2)
  { name: 'Shampoo 3 en 1 750ml', category: 'Cuidado Personal', price: 32, image: '/images/productos/Shampoo3en1.jpeg', onSale: true, salePrice: 26.99 },
  { name: 'Crema Corporal Hidratante 200ml', category: 'Cuidado Personal', price: 38, image: '/images/productos/CremaCorporal.jpeg', onSale: true, salePrice: 32.99 },

  // Nuevos productos
  { name: 'Elotes Enlatados 1 lata', category: 'Enlatados', price: 12, image: '/images/productos/elotesenlatados.jpeg' },
  { name: 'Pepinos Frescos 1 lb', category: 'Frutas y Verduras', price: 4, image: '/images/productos/Pepinos.jpeg' },
  { name: 'Queso Duro 1 lb', category: 'Lacteos', price: 18, image: '/images/productos/QuesoDuro.jpeg' },
  { name: 'Queso Fresco 1 lb', category: 'Lacteos', price: 14, image: '/images/productos/QuesoFresco.jpeg' },
  { name: 'Queso Oreado 1 lb', category: 'Lacteos', price: 16, image: '/images/productos/QuesoOreado.jpeg' },
  { name: 'Remolacha Fresca 1 lb', category: 'Frutas y Verduras', price: 5, image: '/images/productos/remolacha.jpeg' },
  { name: 'Zucchini Fresco 1 lb', category: 'Frutas y Verduras', price: 6, image: '/images/productos/Zuchini.jpeg' },
]

function slugify(category) {
  return category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '-')
}

const base = import.meta.env.BASE_URL

export const mockProducts = PRODUCT_TEMPLATES.map((tpl, i) => ({
  id: i + 1,
  name: tpl.name,
  category: tpl.category,
  categorySlug: slugify(tpl.category),
  price: tpl.price,
  salePrice: tpl.salePrice ?? null,
  onSale: tpl.onSale ?? false,
  isNew: tpl.isNew ?? false,
  wholesale: tpl.wholesale ?? false,
  stock: 5 + ((i * 7) % 95),
  image: base + tpl.image.slice(1),
}))
