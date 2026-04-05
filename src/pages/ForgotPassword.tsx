import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://voidwallz.vercel.app/reset-password'
    })
    if (error) setError(error.message)
    else setSuccess(true)
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
            RESET PASSWORD
          </p>
          <hr className="border-[#222] mt-6" />
        </div>

        {success ? (
          <div className="text-center py-8">
            <h3 className="font-[Syne] font-bold text-[20px] text-[#F6EFD2] mb-4">✓ CHECK YOUR EMAIL</h3>
            <p className="font-[Space_Mono] text-[12px] text-[#555]">Password reset link sent.</p>
          </div>
        ) : (
          <form onSubmit={handleReset}>
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
              {loading ? 'SENDING...' : 'SEND RESET LINK'}
            </button>
          </form>
        )}

        <hr className="border-[#222] my-8" />

        <div className="text-center">
          <Link to="/login" className="font-[Space_Mono] text-[9px] text-[#B03030] hover:text-[#F6EFD2] transition-colors">
            ← BACK TO SIGN IN
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
