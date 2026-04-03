import { useState, useEffect } from 'react'

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-[#B03030] z-[9997] pointer-events-none"
      style={{
        width: `${progress}%`,
        transition: 'width 0.1s linear'
      }}
    />
  )
}

export default ScrollProgress