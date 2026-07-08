/**
 * Fondo animado tipo aurora — ondas de luz suaves que fluyen por la pantalla.
 * Reemplaza el estilo anterior de partículas flotantes.
 */
export default function FloatingBackground() {
  return (
    <div className="aurora-scene pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="aurora-sky" />

      <div className="aurora-wave aurora-wave-1" />
      <div className="aurora-wave aurora-wave-2" />
      <div className="aurora-wave aurora-wave-3" />
      <div className="aurora-wave aurora-wave-4" />

      <div className="aurora-beam aurora-beam-1" />
      <div className="aurora-beam aurora-beam-2" />

      <div className="aurora-shimmer" />
      <div className="aurora-vignette" />
    </div>
  )
}
