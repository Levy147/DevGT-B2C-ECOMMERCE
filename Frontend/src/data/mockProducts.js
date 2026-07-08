const PRODUCT_TEMPLATES = [
  // Granos (4)
  { name: 'Arroz Blanco Premium 1 lb', category: 'Granos', price: 8.5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },
  { name: 'Frijol Negro Guatemalteco 2 lb', category: 'Granos', price: 12, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },
  { name: 'Maiz Blanco Molido 1 lb', category: 'Granos', price: 6.75, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },
  { name: 'Avena Integral 500g', category: 'Granos', price: 14.5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },

  // Frutas y Verduras (5)
  { name: 'Tomate Fresco 1 lb', category: 'Frutas y Verduras', price: 5, image: '/images/frutas-verduras/tomate.webp' },
  { name: 'Zanahoria Premium 1 lb', category: 'Frutas y Verduras', price: 4.5, image: '/images/frutas-verduras/zanahoria.jpg' },
  { name: 'Lechuga Hidroponica 1 unidad', category: 'Frutas y Verduras', price: 6, image: '/images/frutas-verduras/lechuga.jpeg' },
  { name: 'Papa Guatemalteca 1 lb', category: 'Frutas y Verduras', price: 5.5, image: 'https://images.unsplash.com/photo-1590165482129-1b8bb8fb2e5c?w=400&h=400&fit=crop' },
  { name: 'Cebolla Blanca 1 lb', category: 'Frutas y Verduras', price: 6, image: 'https://images.unsplash.com/photo-1508747703721-3ba8498c1b3a?w=400&h=400&fit=crop' },

  // Carnes (2)
  { name: 'Carne de Res Primera 1 lb', category: 'Carnes', price: 28, image: '/images/carnes/carne.webp' },
  { name: 'Chorizos Artesanales 1 lb', category: 'Carnes', price: 22, image: '/images/carnes/chorizos.webp' },

  // Despensa (5)
  { name: 'Aceite Vegetal 900ml', category: 'Despensa', price: 18.75, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop', onSale: true, salePrice: 15.99 },
  { name: 'Azucar Morena 2 lb', category: 'Despensa', price: 9.25, image: 'https://images.unsplash.com/photo-1581441363687-2c7b203f1871?w=400&h=400&fit=crop' },
  { name: 'Sal de Mesa 1 lb', category: 'Despensa', price: 3.5, image: 'https://images.unsplash.com/photo-1609501678107-f976cff877a2?w=400&h=400&fit=crop' },
  { name: 'Harina de Trigo 2 lb', category: 'Despensa', price: 7.8, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop' },
  { name: 'Pasta Spaghetti 500g', category: 'Despensa', price: 5.75, image: 'https://images.unsplash.com/photo-1551462147-8585736b14b0?w=400&h=400&fit=crop' },

  // Bebidas (3)
  { name: 'Cafe Antigua Tostado 340g', category: 'Bebidas', price: 35, image: 'https://images.unsplash.com/photo-1559056197-641a0ac8b55c?w=400&h=400&fit=crop', onSale: true, salePrice: 29.99 },
  { name: 'Agua Purificada 1 Galon', category: 'Bebidas', price: 8, image: 'https://images.unsplash.com/photo-1548839140-29a749299164?w=400&h=400&fit=crop' },
  { name: 'Jugo de Naranja Natural 1L', category: 'Bebidas', price: 12.5, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop' },

  // Lacteos (4)
  { name: 'Leche Entera 1 Litro', category: 'Lacteos', price: 11.5, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop' },
  { name: 'Huevos Frescos (30 uds)', category: 'Lacteos', price: 28, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop', onSale: true, salePrice: 24.5 },
  { name: 'Queso Fresco 400g', category: 'Lacteos', price: 22, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop' },
  { name: 'Crema de Leche 500ml', category: 'Lacteos', price: 18, image: '/images/lacteos/crema-leche.webp' },

  // Panaderia (2)
  { name: 'Tortillas de Maiz (20 pzas)', category: 'Panaderia', price: 8, image: 'https://images.unsplash.com/photo-1599974579688-8dbddbccc765?w=400&h=400&fit=crop' },
  { name: 'Pan Dulce Artesanal (6 pzas)', category: 'Panaderia', price: 15, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop' },

  // Limpieza (2)
  { name: 'Cloro Desinfectante 1L', category: 'Limpieza', price: 8.5, image: 'https://images.unsplash.com/photo-1563453392212-326f5e8541ca?w=400&h=400&fit=crop' },
  { name: 'Jabon de Lavanderia 400g', category: 'Limpieza', price: 6.5, image: 'https://images.unsplash.com/photo-1583947215250-46b672c5cd0b?w=400&h=400&fit=crop' },

  // Cuidado Personal (4)
  { name: 'Shampoo 3 en 1 750ml', category: 'Cuidado Personal', price: 32, image: '/images/cuidado-personal/shampoo.jpeg', onSale: true, salePrice: 26.99 },
  { name: 'Crema Corporal Hidratante 200ml', category: 'Cuidado Personal', price: 38, image: '/images/cuidado-personal/crema-corporal.jpeg', onSale: true, salePrice: 32.99 },
  { name: 'Pasta Dental 150g', category: 'Cuidado Personal', price: 14, image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=400&h=400&fit=crop' },
  { name: 'Jabon de Bano (3 pzas)', category: 'Cuidado Personal', price: 18, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop' },

  // Enlatados (2)
  { name: 'Atun en Agua 170g', category: 'Enlatados', price: 7.25, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop' },
  { name: 'Frijoles Enlatados 400g', category: 'Enlatados', price: 8, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop' },

  // Snacks (2)
  { name: 'Papas Fritas Clasicas 200g', category: 'Snacks', price: 9, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop' },
  { name: 'Galletas Maria 400g', category: 'Snacks', price: 9.5, image: 'https://images.unsplash.com/photo-1558961363-fa8a64d0a701?w=400&h=400&fit=crop' },
]

function slugify(category) {
  return category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '-')
}

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
  image: tpl.image,
}))
