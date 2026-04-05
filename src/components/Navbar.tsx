import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] transition-colors relative pb-1
        ${isActive ? 'text-[#F6EFD2]' : 'text-[#E2DDB4] hover:text-[#F6EFD2]'}`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B03030]" />
      )}
    </Link>
  )
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAdmin, signOut } = useAuth()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown when route changes
  useEffect(() => {
    setDropdownOpen(false)
    setIsMenuOpen(false)
  }, [location])

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'VW'

  const handleSignOut = async () => {
    await signOut()
    setDropdownOpen(false)
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-zinc-800">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Left: Wordmark */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src="/logo1.png"
            alt="voidwallz logo"
            style={{ width: '36px', height: '36px' }}
          />
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.25rem' }}>
            <span style={{ color: '#F6EFD2' }}>void</span>
            <span style={{ color: '#B03030' }}>wallz</span>
          </span>
        </Link>

        {/* Center: Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/browse">BROWSE</NavLink>
          <span className="text-zinc-700">·</span>
          <NavLink to="/categories">CATEGORIES</NavLink>
          <span className="text-zinc-700">·</span>
          <NavLink to="/new">NEW</NavLink>
        </div>

        {/* Right: Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="font-[Space_Mono] text-[9px] uppercase tracking-wider text-[#E2DDB4] border border-[#222] px-4 py-2 hover:border-[#B03030] hover:text-[#F6EFD2] transition-colors"
              >
                SIGN IN
              </Link>
              <Link
                to="/signup"
                className="font-[Space_Mono] text-[9px] uppercase tracking-wider bg-[#B03030] text-[#F6EFD2] px-4 py-2"
              >
                SIGN UP
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: '36px',
                  height: '36px',
                  background: '#111',
                  border: `1px solid ${isAdmin ? '#B03030' : '#222'}`,
                  borderRadius: 0,
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: '#F6EFD2',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {initials}
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '56px',
                  right: 0,
                  background: '#111',
                  border: '1px solid #222',
                  minWidth: '200px',
                  zIndex: 100
                }}>
                  <div style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '9px',
                    color: '#555',
                    padding: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {user.email}
                  </div>

                  <div style={{ height: '1px', background: '#222' }} />

                  <Link
                    to="/profile"
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#E2DDB4',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#1a1a1a'
                      e.currentTarget.style.color = '#F6EFD2'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#E2DDB4'
                    }}
                  >
                    MY VAULT
                    <span>→</span>
                  </Link>

                  {isAdmin && (
                    <>
                      <div style={{ height: '1px', background: '#222' }} />
                      <Link
                        to="/admin"
                        style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: '#E2DDB4',
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = '#1a1a1a'
                          e.currentTarget.style.color = '#F6EFD2'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = '#E2DDB4'
                        }}
                      >
                        ADMIN PANEL
                        <span>→</span>
                      </Link>
                    </>
                  )}

                  <div style={{ height: '1px', background: '#222' }} />

                  <button
                    onClick={handleSignOut}
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#E2DDB4',
                      padding: '0.75rem 1rem',
                      width: '100%',
                      textAlign: 'left',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#1a1a1a'
                      e.currentTarget.style.color = '#B03030'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#E2DDB4'
                    }}
                  >
                    SIGN OUT
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile: Hamburger */}
        <button
          className="md:hidden text-[#F6EFD2] text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          =
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-zinc-800">
          <div className="flex flex-col px-6 py-4 gap-4">
            <NavLink to="/browse">BROWSE</NavLink>
            <NavLink to="/categories">CATEGORIES</NavLink>
            <NavLink to="/new">NEW</NavLink>
            <NavLink to="/terms">TERMS</NavLink>
            <NavLink to="/privacy">PRIVACY</NavLink>
            {!user ? (
              <>
                <Link to="/login" className="font-[Space_Mono] text-[9px] uppercase tracking-wider text-[#E2DDB4] mt-2">
                  SIGN IN
                </Link>
                <Link to="/signup" className="font-[Space_Mono] text-[9px] uppercase tracking-wider text-[#B03030]">
                  SIGN UP
                </Link>
              </>
            ) : (
              <>
                <div className="font-[Space_Mono] text-[9px] text-[#555] mt-2">
                  {user.email && user.email.length > 16 ? user.email.slice(0, 16) + '...' : user.email}
                </div>
                <Link to="/profile" className="font-[Space_Mono] text-[9px] uppercase tracking-wider text-[#E2DDB4]">
                  MY VAULT
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="font-[Space_Mono] text-[9px] uppercase tracking-wider text-[#B03030]">
                    ADMIN
                  </Link>
                )}
                <button
                  onClick={async () => {
                    await signOut()
                    navigate('/')
                    setIsMenuOpen(false)
                  }}
                  className="font-[Space_Mono] text-[9px] uppercase tracking-wider text-[#555] text-left"
                >
                  SIGN OUT
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar