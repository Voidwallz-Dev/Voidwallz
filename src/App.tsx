import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Categories from './pages/Categories'
import WallpaperDetail from './pages/WallpaperDetail'
import NewDrops from './pages/NewDrops'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import Brand from './pages/Brand'
import ProtectedRoute from './components/ui/ProtectedRoute'
import NoiseOverlay from './components/ui/NoiseOverlay'
import AmbientBackground from './components/ui/AmbientBackground'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import { useLenis } from './hooks/useLenis'

function AppContent() {
  useLenis()

  return (
    <>
      <AmbientBackground />
      <NoiseOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/wallpaper/:id" element={<WallpaperDetail />} />
        <Route path="/new" element={<NewDrops />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/brand" element={<Brand />} />
      </Routes>
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 2000)
    const doneTimer = setTimeout(() => setLoaded(true), 2600)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <BrowserRouter>
      {/* Loader */}
      {!loaded && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
            <img src="/logo1.png" alt="voidwallz" style={{ width: '48px', height: '48px' }} />
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem' }}>
              <span style={{ color: '#F6EFD2' }}>void</span>
              <span style={{ color: '#B03030' }}>wallz</span>
            </div>
          </div>
          <div style={{ width: '200px', height: '1px', background: '#222' }}>
            <div style={{
              height: '100%',
              background: '#B03030',
              animation: 'fillbar 1.8s ease forwards',
            }} />
          </div>
          <style>{`
            @keyframes fillbar {
              from { width: 0% }
              to { width: 100% }
            }
          `}</style>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px',
            color: '#333',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '1rem',
          }}>
            Loading void...
          </div>
        </div>
      )}

      {/* App — always mounted, fades in after loader */}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <AppContent />
      </div>
    </BrowserRouter>
  )
}