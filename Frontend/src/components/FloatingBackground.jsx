export default function FloatingBackground() {
  const shapes = [
    { className: 'top-16 right-[20%] w-3 h-3 border-2 border-teal/40 rotate-45', anim: 'animate-float' },
    { className: 'top-[35%] left-[5%] w-5 h-5 rounded-full bg-mint/25', anim: 'animate-float-delayed' },
    { className: 'bottom-[25%] right-[8%] w-4 h-4 bg-forest/15 rounded-sm rotate-12', anim: 'animate-float-slow' },
    { className: 'top-[55%] left-[18%] w-6 h-6 border border-sage/50 rounded-full', anim: 'animate-pulse-soft' },
    { className: 'top-[12%] left-[30%] w-2 h-8 bg-mint/20 rounded-full rotate-12', anim: 'animate-float' },
    { className: 'bottom-[40%] left-[40%] w-8 h-8 border-2 border-mint/30 rounded-full', anim: 'animate-float-delayed' },
    { className: 'top-[70%] right-[25%] w-3 h-3 bg-teal/20 rotate-45', anim: 'animate-float-slow' },
    { className: 'top-[25%] right-[5%] w-5 h-5 border border-forest/20 rounded-lg rotate-45', anim: 'animate-float' },
    { className: 'bottom-[15%] left-[10%] w-4 h-4 rounded-full bg-sage/30', anim: 'animate-pulse-soft' },
    { className: 'top-[45%] right-[35%] w-2 h-2 bg-mint/40 rounded-full', anim: 'animate-float-delayed' },
    { className: 'bottom-[50%] right-[45%] w-7 h-7 border border-teal/25 rounded-full', anim: 'animate-float-slow' },
    { className: 'top-[8%] right-[50%] w-3 h-3 bg-forest/10 rounded-sm', anim: 'animate-float' },
  ]

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-40 blur-3xl animate-float" style={{ background: 'radial-gradient(circle, #B9FFED 0%, transparent 70%)' }} />
      <div className="absolute top-1/4 -right-20 w-72 h-72 rounded-full opacity-35 blur-3xl animate-float-delayed" style={{ background: 'radial-gradient(circle, #67998C 0%, transparent 70%)' }} />
      <div className="absolute top-2/3 -left-16 w-64 h-64 rounded-full opacity-30 blur-3xl animate-float-slow" style={{ background: 'radial-gradient(circle, #B1CCC5 0%, transparent 70%)' }} />
      <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full opacity-25 blur-3xl animate-float" style={{ background: 'radial-gradient(circle, #306658 0%, transparent 70%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-8 blur-3xl animate-spin-slow" style={{ background: 'conic-gradient(from 0deg, #B9FFED, #67998C, #306658, #B1CCC5, #B9FFED)' }} />
      <div className="absolute top-10 left-[60%] w-48 h-48 rounded-full opacity-20 blur-2xl animate-float-delayed" style={{ background: 'radial-gradient(circle, #B9FFED 0%, transparent 70%)' }} />

      {shapes.map((s, i) => (
        <div key={i} className={`absolute ${s.className} ${s.anim}`} />
      ))}
    </div>
  )
}
