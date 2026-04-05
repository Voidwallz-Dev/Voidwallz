import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { useFavourites } from '../hooks/useFavourites'
import { useDownloadHistory } from '../hooks/useDownloadHistory'
import FavouriteButton from '../components/ui/FavouriteButton'
import SEO from '../components/ui/SEO'
import { Link } from 'react-router-dom'

interface FavouriteWallpaper {
  wallpaper_id: string
  created_at: string
  wallpapers: {
    id: string
    title: string
    thumbnail_url: string
    resolution: string
    category: string
  }
}

interface DownloadItem {
  downloaded_at: string
  wallpapers: {
    id: string
    title: string
    thumbnail_url: string
    resolution: string
    category: string
  }
}

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { favourites } = useFavourites()
  const { getHistory } = useDownloadHistory()
  
  const [activeTab, setActiveTab] = useState<'saved' | 'history'>('saved')
  const [savedWallpapers, setSavedWallpapers] = useState<FavouriteWallpaper[]>([])
  const [downloadHistory, setDownloadHistory] = useState<DownloadItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchData()
  }, [user])

  async function fetchData() {
    setLoading(true)
    
    // Fetch saved wallpapers
    const { data: favData } = await supabase
      .from('favourites')
      .select(`
        wallpaper_id,
        created_at,
        wallpapers (
          id, title, thumbnail_url, resolution, category
        )
      `)
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
    
    if (favData) setSavedWallpapers(favData)

    // Fetch download history
    const history = await getHistory()
    setDownloadHistory(history)

    setLoading(false)
  }

  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
  }

  const formatDownloadDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Contact @voidwallz to delete your account.')
      handleSignOut()
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black pt-[80px]">
      <SEO 
        title="My Vault | Voidwallz"
        description="Your saved wallpapers and download history"
        url="https://voidwallz.vercel.app/profile"
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-3">
            PROFILE —
          </div>
          <h1 className="font-[Syne] font-extrabold text-[64px] text-[#F6EFD2] mb-2">MY VAULT</h1>
          <p className="font-[Space_Mono] text-[13px] text-[#555]">{user.email}</p>
        </div>

        <hr className="border-[#222] mb-12" />

        {/* Stats Bar */}
        <div className="grid grid-cols-3 bg-[#111] border border-[#222] mb-12">
          <div className="text-center py-6 border-r border-[#222]">
            <div className="font-[Syne] font-bold text-[32px] text-[#F6EFD2]">{favourites.length}</div>
            <div className="font-[Space_Mono] text-[9px] text-[#B03030] uppercase">SAVED</div>
          </div>
          <div className="text-center py-6 border-r border-[#222]">
            <div className="font-[Syne] font-bold text-[32px] text-[#F6EFD2]">{downloadHistory.length}</div>
            <div className="font-[Space_Mono] text-[9px] text-[#B03030] uppercase">DOWNLOADED</div>
          </div>
          <div className="text-center py-6">
            <div className="font-[Syne] font-bold text-[32px] text-[#F6EFD2]">
              {user.created_at ? formatMemberSince(user.created_at) : '—'}
            </div>
            <div className="font-[Space_Mono] text-[9px] text-[#B03030] uppercase">MEMBER SINCE</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-12">
          <button
            onClick={() => setActiveTab('saved')}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.75rem 0',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'saved' ? '2px solid #B03030' : '2px solid transparent',
              color: activeTab === 'saved' ? '#F6EFD2' : '#555',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            SAVED WALLPAPERS
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0.75rem 0',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'history' ? '2px solid #B03030' : '2px solid transparent',
              color: activeTab === 'history' ? '#F6EFD2' : '#555',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            DOWNLOAD HISTORY
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'saved' && (
          <div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-[#111] aspect-[16/9] animate-pulse" />
                ))}
              </div>
            ) : savedWallpapers.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="font-[Syne] font-bold text-[24px] text-[#333] mb-3">NO SAVED WALLPAPERS YET</h3>
                <p className="font-[Space_Mono] text-[12px] text-[#555]">Browse wallpapers and hit SAVE to add them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {savedWallpapers.map((item) => (
                  <div key={item.wallpaper_id} className="group relative">
                    <Link to={`/wallpaper/${item.wallpapers.id}`} className="block aspect-[16/9] overflow-hidden border border-[#222]">
                      <img
                        src={item.wallpapers.thumbnail_url}
                        alt={item.wallpapers.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="mt-3">
                      <p className="font-[Syne] font-bold text-[14px] text-[#F6EFD2]">{item.wallpapers.title}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="font-[Space_Mono] text-[9px] text-[#555]">{item.wallpapers.category} · {item.wallpapers.resolution}</p>
                        <FavouriteButton wallpaperId={item.wallpapers.id} size="sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            {loading ? (
              <div className="border border-[#222]">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 border-b border-[#1a1a1a]">
                    <div className="bg-[#111] h-12 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : downloadHistory.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="font-[Syne] font-bold text-[24px] text-[#333]">NO DOWNLOADS YET</h3>
              </div>
            ) : (
              <div className="border border-[#222]">
                {downloadHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b border-[#1a1a1a]">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.wallpapers.thumbnail_url} 
                        alt={item.wallpapers.title}
                        style={{ width: '48px', height: '27px', objectFit: 'cover' }}
                      />
                      <div>
                        <p className="font-[Syne] font-bold text-[14px] text-[#F6EFD2]">{item.wallpapers.title}</p>
                        <p className="font-[Space_Mono] text-[9px] text-[#555] uppercase">{item.wallpapers.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-[Space_Mono] text-[9px] text-[#333]">{formatDownloadDate(item.downloaded_at)}</span>
                      <span className="font-[Space_Mono] text-[9px] text-[#B03030] border border-[#B03030] px-2 py-1">
                        {item.wallpapers.resolution}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Danger Zone */}
        <div className="border border-[#1a1a1a] p-8 mt-16">
          <div className="font-[Space_Mono] text-[9px] text-[#333] uppercase mb-6">ACCOUNT</div>
          <div className="flex gap-4">
            <button
              onClick={handleSignOut}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: '1px solid #333',
                color: '#555',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#B03030'}
              onMouseOut={(e) => e.currentTarget.style.color = '#555'}
            >
              SIGN OUT
            </button>
            <button
              onClick={handleDeleteAccount}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: '1px solid #B03030',
                color: '#B03030',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#B03030'
                e.currentTarget.style.color = '#F6EFD2'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#B03030'
              }}
            >
              DELETE ACCOUNT
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}