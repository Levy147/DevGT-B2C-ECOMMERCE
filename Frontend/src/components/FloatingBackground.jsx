const ANIMATIONS = [
  'animate-float',
  'animate-float-delayed',
  'animate-float-slow',
  'animate-pulse-soft',
]

const COLORS = [
  'rgba(185, 255, 237, 0.35)',
  'rgba(103, 153, 140, 0.3)',
  'rgba(177, 204, 197, 0.4)',
  'rgba(48, 102, 88, 0.2)',
  'rgba(185, 255, 237, 0.25)',
]

const ORB_GRADIENTS = [
  'radial-gradient(circle, #B9FFED 0%, transparent 70%)',
  'radial-gradient(circle, #67998C 0%, transparent 70%)',
  'radial-gradient(circle, #B1CCC5 0%, transparent 70%)',
  'radial-gradient(circle, #306658 0%, transparent 70%)',
  'radial-gradient(circle, #B9FFED 0%, transparent 65%)',
]

function seededRandom(seed) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

function buildShapes(count) {
  const shapes = []
  for (let i = 0; i < count; i++) {
    const r1 = seededRandom(i + 1)
    const r2 = seededRandom(i + 100)
    const r3 = seededRandom(i + 200)
    const r4 = seededRandom(i + 300)
    const r5 = seededRandom(i + 400)

    const top = 2 + r1 * 96
    const left = 1 + r2 * 98
    const size = 3 + Math.floor(r3 * 12)
    const type = Math.floor(r4 * 5)
    const anim = ANIMATIONS[Math.floor(r5 * ANIMATIONS.length)]
    const rotate = Math.floor(r3 * 360)
    const color = COLORS[Math.floor(r4 * COLORS.length)]

    const style = {
      top: `${top}%`,
      left: `${left}%`,
      transform: `rotate(${rotate}deg)`,
    }

    let className = `absolute ${anim}`

    switch (type) {
      case 0:
        className += ' rounded-full'
        style.width = size
        style.height = size
        style.backgroundColor = color
        break
      case 1:
        className += ' rounded-sm'
        style.width = size
        style.height = size
        style.backgroundColor = color
        break
      case 2:
        className += ' rounded-full'
        style.width = size + 4
        style.height = size + 4
        style.border = '1.5px solid rgba(177, 204, 197, 0.45)'
        style.backgroundColor = 'transparent'
        break
      case 3:
        className += ' rounded-full'
        style.width = Math.max(3, size - 1)
        style.height = Math.max(3, size - 1)
        style.backgroundColor = 'rgba(48, 102, 88, 0.22)'
        break
      default:
        className += ' rounded-full'
        style.width = 2
        style.height = size + 8
        style.backgroundColor = 'rgba(185, 255, 237, 0.3)'
        break
    }

    shapes.push({ id: i, className, style })
  }
  return shapes
}

function buildOrbs(count) {
  const orbs = []
  for (let i = 0; i < count; i++) {
    const r1 = seededRandom(i + 500)
    const r2 = seededRandom(i + 600)
    const r3 = seededRandom(i + 700)
    const r4 = seededRandom(i + 800)

    orbs.push({
      id: i,
      top: `${-15 + r1 * 85}%`,
      left: `${-10 + r2 * 95}%`,
      size: 100 + Math.floor(r3 * 260),
      opacity: 0.1 + r4 * 0.3,
      gradient: ORB_GRADIENTS[i % ORB_GRADIENTS.length],
      anim: ANIMATIONS[i % ANIMATIONS.length],
      blur: i % 4 === 0 ? 'blur-3xl' : 'blur-2xl',
    })
  }
  return orbs
}

const SHAPES = buildShapes(180)
const ORBS = buildOrbs(90)

export default function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {ORBS.map((orb) => (
        <div
          key={`orb-${orb.id}`}
          className={`absolute rounded-full ${orb.blur} ${orb.anim}`}
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            opacity: orb.opacity,
            background: orb.gradient,
          }}
        />
      ))}

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-[0.06] blur-3xl animate-spin-slow"
        style={{
          background:
            'conic-gradient(from 0deg, #B9FFED, #67998C, #306658, #B1CCC5, #B9FFED)',
        }}
      />

      {SHAPES.map((s) => (
        <div key={`shape-${s.id}`} className={s.className} style={s.style} />
      ))}
    </div>
  )
}
