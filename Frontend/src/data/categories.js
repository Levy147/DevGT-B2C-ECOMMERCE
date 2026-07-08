import {
  Wheat,
  ShoppingBasket,
  Coffee,
  Milk,
  Croissant,
  Sparkles,
  Package,
  Cookie,
  Heart,
  Home,
  Tag,
  Star,
  Boxes,
  Apple,
  Beef,
  Droplets,
} from 'lucide-react'

export const CATEGORIES = [
  { slug: 'granos', name: 'Granos', icon: Wheat, color: 'from-amber-600 to-amber-800', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop' },
  { slug: 'frutas-y-verduras', name: 'Frutas y Verduras', icon: Apple, color: 'from-green-500 to-green-700', image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&h=400&fit=crop' },
  { slug: 'carnes', name: 'Carnes', icon: Beef, color: 'from-red-600 to-red-800', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop' },
  { slug: 'despensa', name: 'Despensa', icon: ShoppingBasket, color: 'from-orange-500 to-orange-700', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop' },
  { slug: 'bebidas', name: 'Bebidas', icon: Coffee, color: 'from-amber-700 to-amber-900', image: 'https://images.unsplash.com/photo-1559056197-641a0ac8b55c?w=600&h=400&fit=crop' },
  { slug: 'lacteos', name: 'Lacteos', icon: Milk, color: 'from-blue-400 to-blue-600', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=400&fit=crop' },
  { slug: 'panaderia', name: 'Panaderia', icon: Croissant, color: 'from-yellow-500 to-orange-600', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop' },
  { slug: 'limpieza', name: 'Limpieza', icon: Droplets, color: 'from-cyan-500 to-teal-600', image: 'https://images.unsplash.com/photo-1583947215250-46b672c5cd0b?w=600&h=400&fit=crop' },
  { slug: 'enlatados', name: 'Enlatados', icon: Package, color: 'from-slate-500 to-slate-700', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop' },
  { slug: 'cuidado-personal', name: 'Cuidado Personal', icon: Heart, color: 'from-purple-400 to-purple-600', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop' },
  { slug: 'snacks', name: 'Snacks', icon: Cookie, color: 'from-pink-500 to-rose-600', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop' },
  { slug: 'hogar', name: 'Hogar', icon: Home, color: 'from-emerald-500 to-emerald-700', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop' },
]

export const SPECIAL_CATEGORIES = [
  { slug: 'ofertas', name: 'Ofertas', icon: Tag, color: 'from-red-500 to-red-700', description: 'Descuentos imperdibles' },
  { slug: 'lo-nuevo', name: 'Lo Nuevo', icon: Star, color: 'from-violet-500 to-violet-700', description: 'Recien llegados a la tienda' },
  { slug: 'mayoreo', name: 'Mayoreo', icon: Boxes, color: 'from-teal-600 to-teal-800', description: 'Precios especiales por volumen' },
]

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || SPECIAL_CATEGORIES.find((c) => c.slug === slug)
}

export const ORDER_STATUS = {
  pending_confirm: { label: 'Pendiente de confirmar', color: 'bg-amber-100 text-amber-700' },
  preparing: { label: 'Alistando producto', color: 'bg-blue-100 text-blue-700' },
  in_transit: { label: 'En camino', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Finalizado', color: 'bg-mint/50 text-forest' },
  archived: { label: 'Archivado', color: 'bg-sage/30 text-teal' },
}

export const STATUS_FLOW = ['pending_confirm', 'preparing', 'in_transit', 'delivered']
