import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  onComplete: () => void
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0)
  const [loadingTextIndex, setLoadingTextIndex] = useState(0)
  const [exitAnimation, setExitAnimation] = useState(false)
  const loadingTexts = ["LOADING VOID...", "FETCHING DARKNESS...", "ALMOST THERE..."]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + (100 / 1.8 / 60), 100))
    }, 1000 / 60)

    const textInterval = setInterval(() => {
      setLoadingTextIndex(prev => (prev + 1) % loadingTexts.length)
    }, 600)

    const completeTimeout = setTimeout(() => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
      setProgress(100)
      setTimeout(() => setExitAnimation(true), 200)
    }, 2200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
      clearTimeout(completeTimeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {!exitAnimation && (
        <motion.div
          initial={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], originY: 0 }}
          onAnimationComplete={onComplete}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* Corner Crosshairs */}
          <div className="absolute top-6 left-6 font-[Space_Mono] text-[#B03030] opacity-10">+</div>
          <div className="absolute top-6 right-6 font-[Space_Mono] text-[#B03030] opacity-10">+</div>
          <div className="absolute bottom-6 left-6 font-[Space_Mono] text-[#B03030] opacity-10">+</div>
          <div className="absolute bottom-6 right-6 font-[Space_Mono] text-[#B03030] opacity-10">+</div>

          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-[Syne] font-extrabold text-4xl mb-8"
          >
            <span className="text-[#F6EFD2]">void</span>
            <span className="text-[#B03030]">wallz</span>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-[200px] h-[1px] bg-zinc-800 mb-4">
            <motion.div
              className="h-full bg-[#B03030]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Loading Text */}
          <div className="font-[Space_Mono] text-[9px] uppercase text-zinc-600">
            {loadingTexts[loadingTextIndex]}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader