import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else navigate('/')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      paddingTop: '80px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '80px 1rem 4rem',
    }}>
      <div className="max-w-[440px] w-full mx-auto border border-[#222] bg-[#111] p-12">
        <div className="text-center mb-8">
          <h1 className="font-[Syne] font-extrabold text-[24px]">
            <span className="text-[#F6EFD2]">void</span>
            <span className="text-[#B03030]">wallz</span>
          </h1>
          <p className="font-[Space_Mono] text-[9px] text-[#555] uppercase tracking-[0.2em] mt-2">
            WELCOME BACK
          </p>
          <hr className="border-[#222] mt-6" />
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 outline-none focus:border-[#B03030] transition-colors"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 pr-12 outline-none focus:border-[#B03030] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: showPassword ? '#B03030' : '#555',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  padding: 0,
                }}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          <div className="text-right mb-6">
            <Link to="/forgot-password" className="font-[Space_Mono] text-[9px] text-[#555] hover:text-[#B03030] transition-colors">
              FORGOT PASSWORD?
            </Link>
          </div>

          {error && (
            <p className="font-[Space_Mono] text-[11px] text-[#B03030] mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B03030] text-[#F6EFD2] font-[Syne] font-bold text-[14px] uppercase py-4 disabled:opacity-50 hover:bg-[#8a2020] transition-colors"
          >
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <hr className="border-[#222] my-8" />

        <div className="text-center">
          <span className="font-[Space_Mono] text-[9px] text-[#555]">DON'T HAVE AN ACCOUNT? </span>
          <Link to="/signup" className="font-[Space_Mono] text-[9px] text-[#B03030] hover:text-[#F6EFD2] transition-colors">
            SIGN UP →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
