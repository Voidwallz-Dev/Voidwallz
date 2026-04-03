import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
}

const MagneticButton = ({ children }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) / rect.width * 8
    const deltaY = (e.clientY - centerY) / rect.height * 8

    x.set(deltaX)
    y.set(deltaY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  )
}

export default MagneticButton