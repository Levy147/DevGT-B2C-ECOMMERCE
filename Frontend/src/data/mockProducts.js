const PRODUCT_TEMPLATES = [
  // Granos (5)
  { name: 'Arroz Blanco Premium 1 lb', category: 'Granos', price: 8.5, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },
  { name: 'Frijol Negro Guatemalteco 2 lb', category: 'Granos', price: 12, image: 'https://images.unsplash.com/photo-1517427294546-5aa121f68d80?w=400&h=400&fit=crop' },
  { name: 'Maíz Blanco Molido 1 lb', category: 'Granos', price: 6.75, image: 'https://images.unsplash.com/photo-1550257766-0d3846739941?w=400&h=400&fit=crop' },
  { name: 'Avena Integral 500g', category: 'Granos', price: 14.5, image: 'https://images.unsplash.com/photo-1517673400265-9c2a2a2a2a2a?w=400&h=400&fit=crop' },
  { name: 'Quinoa Orgánica 400g', category: 'Granos', price: 32, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', isNew: true },

  // Despensa (5)
  { name: 'Aceite Vegetal 900ml', category: 'Despensa', price: 18.75, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop', onSale: true, salePrice: 15.99 },
  { name: 'Azúcar Morena 2 lb', category: 'Despensa', price: 9.25, image: 'https://images.unsplash.com/photo-1581441363687-2c7b203f1871?w=400&h=400&fit=crop' },
  { name: 'Sal de Mesa 1 lb', category: 'Despensa', price: 3.5, image: 'https://images.unsplash.com/photo-1609501678107-f976cff877a2?w=400&h=400&fit=crop' },
  { name: 'Harina de Trigo 2 lb', category: 'Despensa', price: 7.8, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop' },
  { name: 'Pasta Spaghetti 500g', category: 'Despensa', price: 5.75, image: 'https://images.unsplash.com/photo-1551462147-8585736b14b0?w=400&h=400&fit=crop', wholesale: true },

  // Bebidas (5)
  { name: 'Café Antigua Tostado 340g', category: 'Bebidas', price: 35, image: 'https://images.unsplash.com/photo-1559056197-641a0ac8b55c?w=400&h=400&fit=crop', onSale: true, salePrice: 29.99 },
  { name: 'Jugo de Naranja 1L', category: 'Bebidas', price: 12.5, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop' },
  { name: 'Refresco Cola 2L', category: 'Bebidas', price: 14, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop' },
  { name: 'Agua Purificada 1 Galón', category: 'Bebidas', price: 8, image: 'https://images.unsplash.com/photo-1548839140-29a749299164?w=400&h=400&fit=crop', wholesale: true },
  { name: 'Té Verde 25 bolsitas', category: 'Bebidas', price: 18, image: 'https://images.unsplash.com/photo-1556678133-1a12e2d4ea7?w=400&h=400&fit=crop', isNew: true },

  // Lácteos (5)
  { name: 'Leche Entera 1 Litro', category: 'Lácteos', price: 11.5, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop' },
  { name: 'Huevos Frescos (30 uds)', category: 'Lácteos', price: 28, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop', onSale: true, salePrice: 24.5 },
  { name: 'Queso Fresco 400g', category: 'Lácteos', price: 22, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop' },
  { name: 'Yogurt Natural 1L', category: 'Lácteos', price: 16.5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291770?w=400&h=400&fit=crop', isNew: true },
  { name: 'Mantequilla 200g', category: 'Lácteos', price: 19, image: 'https://images.unsplash.com/photo-1589985270554-286bfa16df4d?w=400&h=400&fit=crop' },

  // Panadería (5)
  { name: 'Pan Dulce Artesanal (6 pzas)', category: 'Panadería', price: 15, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop' },
  { name: 'Pan de Caja Integral', category: 'Panadería', price: 18, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop', onSale: true, salePrice: 14.99 },
  { name: 'Tortillas de Maíz (20 pzas)', category: 'Panadería', price: 8, image: 'https://images.unsplash.com/photo-1599974579688-8dbddbccc765?w=400&h=400&fit=crop' },
  { name: 'Galletas María 400g', category: 'Panadería', price: 9.5, image: 'https://images.unsplash.com/photo-1558961363-fa8a64d0a701?w=400&h=400&fit=crop' },
  { name: 'Cupcakes Vainilla (4 pzas)', category: 'Panadería', price: 20, image: 'https://images.unsplash.com/photo-1576618148406-3f9d3e7e1a2b?w=400&h=400&fit=crop', isNew: true },

  // Limpieza (5)
  { name: 'Jabón de Lavandería 400g', category: 'Limpieza', price: 6.5, image: 'https://images.unsplash.com/photo-1583947215250-46b672c5cd0b?w=400&h=400&fit=crop' },
  { name: 'Detergente Líquido 1L', category: 'Limpieza', price: 24, image: 'https://images.unsplash.com/photo-1583947215250-46b672c5cd0b?w=400&h=400&fit=crop', onSale: true, salePrice: 19.99 },
  { name: 'Cloro Desinfectante 1L', category: 'Limpieza', price: 8.5, image: 'https://images.unsplash.com/photo-1563453392212-326f5e8541ca?w=400&h=400&fit=crop' },
  { name: 'Escoba Premium', category: 'Limpieza', price: 35, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop' },
  { name: 'Papel Higiénico (12 rollos)', category: 'Limpieza', price: 42, image: 'https://images.unsplash.com/photo-1584438784890-1cf116470?w=400&h=400&fit=crop', wholesale: true },

  // Enlatados (5)
  { name: 'Atún en Agua 170g', category: 'Enlatados', price: 7.25, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop' },
  { name: 'Sardinas en Tomate 155g', category: 'Enlatados', price: 6, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop', onSale: true, salePrice: 4.99 },
  { name: 'Chícharos 400g', category: 'Enlatados', price: 5.5, image: 'https://images.unsplash.com/photo-1459411621453-7bb033378266?w=400&h=400&fit=crop' },
  { name: 'Duraznos en Almíbar 820g', category: 'Enlatados', price: 14, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=400&fit=crop' },
  { name: 'Frijoles Enlatados 400g', category: 'Enlatados', price: 8, image: 'https://images.unsplash.com/photo-1517427294546-5aa121f68d80?w=400&h=400&fit=crop', wholesale: true },

  // Snacks (5)
  { name: 'Chips de Plátano 150g', category: 'Snacks', price: 10.5, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop' },
  { name: 'Papas Fritas Clásicas 200g', category: 'Snacks', price: 9, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop', onSale: true, salePrice: 7.5 },
  { name: 'Mix de Frutos Secos 250g', category: 'Snacks', price: 28, image: 'https://images.unsplash.com/photo-1599599810769-2f577153a32?w=400&h=400&fit=crop', isNew: true },
  { name: 'Chocolate con Almendras 100g', category: 'Snacks', price: 15, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=400&fit=crop' },
  { name: 'Gomitas Surtidas 200g', category: 'Snacks', price: 12, image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=400&fit=crop' },

  // Cuidado Personal (5)
  { name: 'Shampoo Familiar 750ml', category: 'Cuidado Personal', price: 32, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', onSale: true, salePrice: 26.99 },
  { name: 'Pasta Dental 150g', category: 'Cuidado Personal', price: 14, image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=400&h=400&fit=crop' },
  { name: 'Jabón de Baño (3 pzas)', category: 'Cuidado Personal', price: 18, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop' },
  { name: 'Desodorante Roll-on', category: 'Cuidado Personal', price: 22, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', isNew: true },
  { name: 'Crema Hidratante 200ml', category: 'Cuidado Personal', price: 38, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop' },

  // Hogar (5)
  { name: 'Foco LED 9W', category: 'Hogar', price: 12, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' },
  { name: 'Extension Eléctrica 3m', category: 'Hogar', price: 45, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', wholesale: true },
  { name: 'Velas Aromáticas (6 pzas)', category: 'Hogar', price: 25, image: 'https://images.unsplash.com/photo-1602603159052-0a2c2a2a2a2a?w=400&h=400&fit=crop', isNew: true },
  { name: 'Platos Desechables (50 pzas)', category: 'Hogar', price: 18, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', onSale: true, salePrice: 14.99 },
  { name: 'Maceta Decorativa Mediana', category: 'Hogar', price: 55, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop' },
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
