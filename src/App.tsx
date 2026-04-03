import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import NoiseOverlay from './components/ui/NoiseOverlay'
import Loader from './components/ui/Loader'
import PageTransition from './components/ui/PageTransition'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import AmbientBackground from './components/ui/AmbientBackground'
import { useLenis } from './hooks/useLenis'

// Pages
import Home from './pages/Home'
import Browse from './pages/Browse'
import Categories from './pages/Categories'
import WallpaperDetail from './pages/WallpaperDetail'
import NewDrops from './pages/NewDrops'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/browse" element={<PageTransition><Browse /></PageTransition>} />
        <Route path="/categories" element={<PageTransition><Categories /></PageTransition>} />
        <Route path="/wallpaper/:id" element={<PageTransition><WallpaperDetail /></PageTransition>} />
        <Route path="/new" element={<PageTransition><NewDrops /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  useLenis()

  return (
    <BrowserRouter>
      <AmbientBackground />
      <ScrollProgress />
      <CustomCursor />
      <NoiseOverlay />
      <Navbar />

      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <main className="relative z-10">
          <AnimatedRoutes />
        </main>
      )}
    </BrowserRouter>
  )
}

export default App