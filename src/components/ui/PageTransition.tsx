import { motion } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="relative">
      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {children}
      </motion.div>

      {/* Wipe Overlay */}
      <motion.div
        className="fixed inset-0 bg-black z-[5000] pointer-events-none"
        initial={{ y: '-100%' }}
        animate={{ y: '100%' }}
        exit={{ y: '0%' }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[4px] bg-[#B03030] z-[5001] pointer-events-none"
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  )
}

export default PageTransition