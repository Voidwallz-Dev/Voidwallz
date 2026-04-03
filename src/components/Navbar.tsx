import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-zinc-800">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Left: Wordmark */}
        <Link to="/" className="font-[Syne] font-extrabold text-xl">
          <span className="text-[#F6EFD2]">void</span>
          <span className="text-[#B03030]">wallz</span>
        </Link>

        {/* Center: Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/browse">BROWSE</NavLink>
          <span className="text-zinc-700">·</span>
          <NavLink to="/categories">CATEGORIES</NavLink>
          <span className="text-zinc-700">·</span>
          <NavLink to="/new">NEW</NavLink>
        </div>

        {/* Right: CTA Button */}
        <div className="hidden md:block">
          <button className="font-[Space_Mono] text-[9px] uppercase tracking-wider text-[#B03030] border border-[#B03030] px-4 py-2 hover:bg-[#B03030] hover:text-[#F6EFD2] transition-colors">
            DOWNLOAD
          </button>
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
            <a href="#" className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#E2DDB4]">
              BROWSE
            </a>
            <a href="#" className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#E2DDB4]">
              CATEGORIES
            </a>
            <a href="#" className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#E2DDB4]">
              ABOUT
            </a>
            <button className="font-[Space_Mono] text-[9px] uppercase tracking-wider text-[#B03030] border border-[#B03030] px-4 py-2 mt-2">
              DOWNLOAD
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar