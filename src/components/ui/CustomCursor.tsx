import { useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'card'>('default')

  const springX = useSpring(mousePos.x, { stiffness: 150, damping: 20 })
  const springY = useSpring(mousePos.y, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.closest('a, button')) {
        setCursorState('hover')
      } else if (target.closest('[data-wallpaper-card]')) {
        setCursorState('card')
      } else {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      {/* Dot Cursor */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-[#F6EFD2] pointer-events-none z-[9998]"
        style={{
          left: mousePos.x - 4,
          top: mousePos.y - 4,
          scale: cursorState === 'hover' ? 0 : 1,
          transition: 'scale 0.15s ease'
        }}
      />

      {/* Ring Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorState === 'hover' ? 48 : 32,
          height: cursorState === 'hover' ? 48 : 32,
          border: '1px solid #B03030',
          borderRadius: cursorState === 'card' ? 0 : '50%',
          backgroundColor: cursorState === 'hover' ? 'rgba(176,48,48,0.15)' : 'transparent',
          transition: 'width 0.2s ease, height 0.2s ease, border-radius 0.2s ease, background-color 0.2s ease'
        }}
      >
        {cursorState === 'card' && (
          <span className="font-[Space_Mono] text-[12px] text-[#B03030]">↓</span>
        )}
      </motion.div>
    </>
  )
}

export default CustomCursor