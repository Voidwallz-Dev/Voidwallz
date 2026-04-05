import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase, Wallpaper } from '../lib/supabase'
import { cloudinary } from '../lib/cloudinary'
import SEO from '../components/ui/SEO'
import FavouriteButton from '../components/ui/FavouriteButton'

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'ALL')
  const [activeDevice, setActiveDevice] = useState(searchParams.get('device') || 'ALL')

  const categories = ['ALL', 'DARK', 'MINIMAL', 'ABSTRACT', 'NATURE', 'SPACE', 'NEON', 'RETRO', 'ARCHITECTURE']
  const devices = ['ALL', 'PC', 'MOBILE', 'TABLET']

  useEffect(() => {
    fetchWallpapers()
  }, [activeCategory, activeDevice, searchQuery])

  const fetchWallpapers = async () => {
    setLoading(true)
    let query = supabase
      .from('wallpapers')
      .select('*')
      .order('created_at', { ascending: false })

    if (activeCategory !== 'ALL') {
      query = query.eq('category', activeCategory)
    }
    if (activeDevice !== 'ALL') {
      query = query.or(`device.eq.${activeDevice.toLowerCase()},device.eq.all`)
    }
    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`)
    }

    const { data, error } = await query
    if (data) setWallpapers(data)
    setLoading(false)
  }

  const handleDownload = async (wallpaper: Wallpaper) => {
    await supabase.rpc('increment_downloads', { wallpaper_id: wallpaper.id })
    const url = wallpaper.cloudinary_id
      ? cloudinary.download(wallpaper.cloudinary_id)
      : wallpaper.file_url
    window.open(url, '_blank')
  }

  const updateFilter = (type: 'category' | 'device', value: string) => {
    if (type === 'category') {
      setActiveCategory(value)
      if (value === 'ALL') {
        searchParams.delete('category')
      } else {
        searchParams.set('category', value)
      }
    } else {
      setActiveDevice(value)
      if (value === 'ALL') {
        searchParams.delete('device')
      } else {
        searchParams.set('device', value)
      }
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="min-h-screen bg-black pt-[120px] pb-20">
      <SEO
        title="Browse Wallpapers"
        description="Browse 10,000+ curated 4K and 8K dark wallpapers. Filter by category, resolution and style."
        url="https://voidwallz.vercel.app/browse"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="font-[Syne] font-extrabold text-[56px] text-[#F6EFD2] mb-4">BROWSE WALLPAPERS</h1>
          <p className="font-[Space_Mono] text-[11px] text-[#555]">
            {loading ? 'Loading...' : `${wallpapers.length} WALLPAPERS FOUND`}
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="SEARCH WALLPAPERS..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full border border-[#222] bg-[#0a0a0a] text-[#F6EFD2] font-[Space_Mono] text-[12px] p-4 outline-none"
          />
        </div>

        {/* Device Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {devices.map(device => (
            <button
              key={device}
              onClick={() => updateFilter('device', device)}
              className={`px-5 py-2 rounded-full font-[Space_Mono] text-[10px] uppercase transition-all ${
                activeDevice === device
                  ? 'bg-[#B03030] text-[#F6EFD2]'
                  : 'border border-[#222] text-[#555] hover:border-[#B03030]'
              }`}
            >
              {device === 'ALL' ? 'ALL DEVICES' : device}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => updateFilter('category', category)}
              className={`px-5 py-2 rounded-full font-[Space_Mono] text-[10px] uppercase transition-all ${
                activeCategory === category
                  ? 'bg-[#B03030] text-[#F6EFD2]'
                  : 'border border-[#222] text-[#555] hover:border-[#B03030]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Wallpapers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-[#111] aspect-[16/9] animate-pulse" />
            ))}
          </div>
        ) : wallpapers.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="font-[Syne] font-bold text-[24px] text-[#555]">NO WALLPAPERS FOUND</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wallpapers.map(wallpaper => (
              <div key={wallpaper.id} className="group relative">
                <Link to={`/wallpaper/${wallpaper.id}`} className="block aspect-[16/9] overflow-hidden border border-[#222]">
                  <img
                    src={wallpaper.cloudinary_id
                      ? cloudinary.thumbnail(wallpaper.cloudinary_id)
                      : wallpaper.thumbnail_url}
                    alt={wallpaper.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="mt-3">
                  <p className="font-[Syne] font-bold text-[14px] text-[#F6EFD2]">{wallpaper.title}</p>
                   <div className="flex justify-between items-center mt-1">
                     <p className="font-[Space_Mono] text-[9px] text-[#555]">{wallpaper.category} · {wallpaper.resolution}</p>
                     <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                       <button
                         onClick={() => handleDownload(wallpaper)}
                         className="font-[Space_Mono] text-[9px] text-[#B03030] uppercase hover:underline"
                       >
                         DOWNLOAD ({wallpaper.downloads})
                       </button>
                       <FavouriteButton wallpaperId={wallpaper.id} size="sm" />
                     </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Browse