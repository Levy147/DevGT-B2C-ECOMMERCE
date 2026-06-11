import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const SLIDES = [
  {
    title: '¡Ofertas increíbles todos los días!',
    subtitle: 'Descuentos de hasta 30% en productos seleccionados',
    cta: 'Ver ofertas',
    link: '/categorias/ofertas',
    bg: 'https://images.unsplash.com/photo-1607082348824-0a96fee2d4?w=1200&h=500&fit=crop',
  },
  {
    title: 'Completa tu almacén a precios para toda la familia',
    subtitle: 'Los mejores productos de Guatemala en un solo lugar',
    cta: 'Explorar catálogo',
    link: '/#catalogo',
    bg: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=500&fit=crop',
  },
  {
    title: 'Envío a domicilio en tu zona',
    subtitle: 'Pedidos sobre Q100 — envío gratis',
    cta: 'Comprar ahora',
    link: '/categorias',
    bg: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=500&fit=crop',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  const slide = SLIDES[current]

  return (
    <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 mt-6 mb-10 h-[320px] sm:h-[400px]">
      {SLIDES.map((s, i) => (
        <div
          key={s.title}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.bg})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-forest/75 to-teal/50" />
        </div>
      ))}

      <div className="relative h-full px-6 sm:px-12 flex flex-col justify-center max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint/20 border border-mint/30 text-mint text-sm font-medium mb-4 w-fit">
          <Sparkles className="w-4 h-4" />
          Variedades Fatima
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
          {slide.title}
        </h1>
        <p className="text-sage text-sm sm:text-lg mb-6 max-w-md">{slide.subtitle}</p>
        <Link
          to={slide.link}
          className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-2xl bg-mint text-deep font-semibold shadow-lg hover:scale-105 transition-all"
        >
          {slide.cta}
        </Link>
      </div>

      <button type="button" onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm" aria-label="Anterior">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button type="button" onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm" aria-label="Siguiente">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} type="button" onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-mint w-6' : 'bg-white/40'}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}
