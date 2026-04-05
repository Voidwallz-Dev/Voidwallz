import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Footer from '../components/landing/Footer'

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (activeTab === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      }
      navigate('/admin')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-[80px]">
      <div className="max-w-[480px] mx-auto border border-[#222] bg-[#111] p-12">
        <div className="text-center mb-8">
          <h1 className="font-[Syne] font-extrabold text-3xl">
            <span className="text-[#F6EFD2]">void</span>
            <span className="text-[#B03030]">wallz</span>
          </h1>
          <p className="font-[Space_Mono] text-[9px] text-[#B03030] uppercase tracking-wider mt-2">
            ADMIN ACCESS
          </p>
          <hr className="border-[#222] mt-6" />
        </div>

        <div className="flex mb-8">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-3 font-[Space_Mono] text-[9px] uppercase tracking-wider transition-colors ${
              activeTab === 'signin'
                ? 'border-b-2 border-[#B03030] text-[#F6EFD2]'
                : 'text-[#555]'
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 font-[Space_Mono] text-[9px] uppercase tracking-wider transition-colors ${
              activeTab === 'signup'
                ? 'border-b-2 border-[#B03030] text-[#F6EFD2]'
                : 'text-[#555]'
            }`}
          >
            SIGN UP
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-[Space_Mono] text-[9px] text-[#555] uppercase mb-2">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-3 outline-none"
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
            className="w-full bg-[#B03030] text-[#F6EFD2] font-[Syne] font-bold uppercase py-4 disabled:opacity-50"
          >
            {loading ? 'LOADING...' : activeTab === 'signin' ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Auth