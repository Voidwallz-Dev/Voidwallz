import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        if (/invalid api key/i.test(error.message)) {
          setError('Supabase auth is misconfigured. Update VITE_SUPABASE_ANON_KEY in your .env with your project anon/public key and restart the Vite server.')
        } else {
          setError(error.message)
        }
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account')
    } finally {
      setLoading(false)
    }
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
            CREATE ACCOUNT
          </p>
          <hr className="border-[#222] mt-6" />
        </div>

        {success ? (
          <div className="text-center py-8">
            <h3 className="font-[Syne] font-bold text-[20px] text-[#F6EFD2] mb-4">✓ CHECK YOUR EMAIL</h3>
            <p className="font-[Space_Mono] text-[12px] text-[#555]">We sent a confirmation link to your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSignup}>
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

          <div className="mb-6">
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

            {password.length > 0 && (() => {
              const getPasswordStrength = (pwd: string) => {
                let score = 0
                if (pwd.length >= 8) score++
                if (pwd.length >= 12) score++
                if (/[A-Z]/.test(pwd)) score++
                if (/[0-9]/.test(pwd)) score++
                if (/[^A-Za-z0-9]/.test(pwd)) score++
                return score
              }

              const strength = getPasswordStrength(password)
              const strengthLabel = ['', 'WEAK', 'WEAK', 'FAIR', 'STRONG', 'VOID LEVEL'][strength]
              const strengthColor = ['', '#B03030', '#B03030', '#8a6a00', '#2d6a2d', '#B03030'][strength]
              const strengthWidth = `${(strength / 5) * 100}%`

              return (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{
                    height: '2px',
                    background: '#222',
                    width: '100%',
                  }}>
                    <div style={{
                      height: '100%',
                      width: strengthWidth,
                      background: strengthColor,
                      transition: 'width 0.3s ease, background 0.3s ease',
                    }} />
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.4rem',
                  }}>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '9px',
                      color: '#333',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}>
                      PASSWORD STRENGTH
                    </span>
                    <span style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '9px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: strengthColor,
                    }}>
                      {strengthLabel}
                    </span>
                  </div>
                  <div style={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                  }}>
                    {[
                      { label: '8+ characters', met: password.length >= 8 },
                      { label: '12+ characters', met: password.length >= 12 },
                      { label: 'uppercase letter', met: /[A-Z]/.test(password) },
                      { label: 'number', met: /[0-9]/.test(password) },
                      { label: 'special character', met: /[^A-Za-z0-9]/.test(password) },
                    ].map(({ label, met }) => (
                      <div key={label} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '9px',
                        color: met ? '#2d6a2d' : '#333',
                        letterSpacing: '0.1em',
                        transition: 'color 0.2s',
                      }}>
                        <span style={{ color: met ? '#4caf50' : '#333' }}>{met ? '✓' : '×'}</span>
                        {label.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>

          <div className="mb-6">
            <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">
              CONFIRM PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 pr-12 outline-none focus:border-[#B03030] transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: showConfirmPassword ? '#B03030' : '#555',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  padding: 0,
                }}
              >
                {showConfirmPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
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
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>
        )}

        <hr className="border-[#222] my-8" />

        <div className="text-center">
          <span className="font-[Space_Mono] text-[9px] text-[#555]">ALREADY HAVE AN ACCOUNT? </span>
          <Link to="/login" className="font-[Space_Mono] text-[9px] text-[#B03030] hover:text-[#F6EFD2] transition-colors">
            SIGN IN →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
