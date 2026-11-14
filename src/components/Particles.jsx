import { useMemo } from 'react'
export default function Particles() {
  const items = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    size: 2 + Math.random() * 4, duration: 10 + Math.random() * 20,
    delay: Math.random() * -20, type: Math.random() > 0.5 ? 'heart' : 'star'
  })), [])
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map(p => (
        <div key={p.id} className="absolute animate-pulse" style={{ left: `${p.left}%`, top: `${p.top}%`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`, opacity: 0.3 }}>
          {p.type === 'heart' ? '❤' : '✦'}
        </div>
      ))}
    </div>
  )
}
