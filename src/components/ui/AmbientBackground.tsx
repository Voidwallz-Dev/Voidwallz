import { useEffect, useRef } from 'react'

const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const startTime = Date.now()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Orb 1 - Red
      const orb1X = canvas.width / 2 + Math.sin(elapsed * 0.05) * canvas.width * 0.3
      const orb1Y = canvas.height / 2 + Math.cos(elapsed * 0.05) * canvas.height * 0.3

      const gradient1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 400)
      gradient1.addColorStop(0, 'rgba(176, 48, 48, 0.04)')
      gradient1.addColorStop(1, 'transparent')

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Orb 2 - Cream
      const orb2X = canvas.width / 2 + Math.cos(elapsed * 0.04) * canvas.width * 0.35
      const orb2Y = canvas.height / 2 + Math.sin(elapsed * 0.04) * canvas.height * 0.35

      const gradient2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 400)
      gradient2.addColorStop(0, 'rgba(246, 239, 210, 0.02)')
      gradient2.addColorStop(1, 'transparent')

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}

export default AmbientBackground