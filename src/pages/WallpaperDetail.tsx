import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase, Wallpaper } from '../lib/supabase'
import { cloudinary } from '../lib/cloudinary'
import SEO from '../components/ui/SEO'
import FavouriteButton from '../components/ui/FavouriteButton'
import { useDownloadHistory } from '../hooks/useDownloadHistory'

const WallpaperDetail = () => {
  const { id } = useParams()
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null)
  const [relatedWallpapers, setRelatedWallpapers] = useState<Wallpaper[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWallpaper = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('wallpapers')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        setWallpaper(data)
        // Fetch related wallpapers
        const { data: related } = await supabase
          .from('wallpapers')
          .select('*')
          .eq('category', data.category)
          .neq('id', id)
          .limit(4)
        if (related) setRelatedWallpapers(related)
      }
      setLoading(false)
    }

    fetchWallpaper()
  }, [id])

  const { recordDownload } = useDownloadHistory()

  const handleDownload = async () => {
    if (wallpaper) {
      await recordDownload(wallpaper.id)
      const url = wallpaper.cloudinary_id
        ? cloudinary.download(wallpaper.cloudinary_id)
        : wallpaper.file_url
      window.open(url, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-[120px]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#111] aspect-[16/9] animate-pulse" />
        </div>
      </div>
    )
  }

  if (!wallpaper) {
    return (
      <div className="min-h-screen bg-black pt-[120px] flex items-center justify-center">
        <h2 className="font-[Syne] font-bold text-[32px] text-[#555]">WALLPAPER NOT FOUND</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-[120px] pb-20">
      <SEO
        title={wallpaper.title}
        description={wallpaper.description || `Download ${wallpaper.title} wallpaper in ${wallpaper.resolution} resolution for free on voidwallz.`}
        url={`https://voidwallz.vercel.app/wallpaper/${id}`}
        image={wallpaper.thumbnail_url}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Wallpaper Preview */}
        <div className="mb-12">
          <img
            src={wallpaper.cloudinary_id
              ? cloudinary.url(wallpaper.cloudinary_id, { quality: 'auto', format: 'webp' })
              : wallpaper.file_url}
            alt={wallpaper.title}
            className="w-full rounded border border-[#222]"
          />
        </div>

        {/* Wallpaper Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <h1 className="font-[Syne] font-extrabold text-[48px] text-[#F6EFD2] mb-4">{wallpaper.title}</h1>
            <p className="text-[#777] text-lg mb-6">{wallpaper.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {wallpaper.tags.map((tag, i) => (
                <span key={i} className="font-[Space_Mono] text-[10px] text-[#555] border border-[#222] px-3 py-1">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="border border-[#222] bg-[#111] p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-[Space_Mono] text-[9px] text-[#555] uppercase">CATEGORY</span>
                  <span className="font-[Space_Mono] text-[11px] text-[#F6EFD2]">{wallpaper.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-[Space_Mono] text-[9px] text-[#555] uppercase">RESOLUTION</span>
                  <span className="font-[Space_Mono] text-[11px] text-[#F6EFD2]">{wallpaper.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-[Space_Mono] text-[9px] text-[#555] uppercase">DEVICE</span>
                  <span className="font-[Space_Mono] text-[11px] text-[#F6EFD2]">{wallpaper.device.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-[Space_Mono] text-[9px] text-[#555] uppercase">DOWNLOADS</span>
                  <span className="font-[Space_Mono] text-[11px] text-[#F6EFD2]">{wallpaper.downloads}</span>
                </div>
              </div>

              <FavouriteButton wallpaperId={wallpaper.id} />
              
              <button
                onClick={handleDownload}
                className="w-full bg-[#B03030] text-[#F6EFD2] font-[Syne] font-bold uppercase py-4 mt-3"
              >
                DOWNLOAD WALLPAPER
              </button>
            </div>
          </div>
        </div>

        {/* Related Wallpapers */}
        {relatedWallpapers.length > 0 && (
          <div>
            <h3 className="font-[Syne] font-bold text-[24px] text-[#F6EFD2] mb-8">RELATED WALLPAPERS</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedWallpapers.map(wp => (
                <Link key={wp.id} to={`/wallpaper/${wp.id}`} className="group">
                  <div className="aspect-[16/9] overflow-hidden border border-[#222]">
                    <img
                      src={wp.cloudinary_id
                        ? cloudinary.thumbnail(wp.cloudinary_id)
                        : wp.thumbnail_url}
                      alt={wp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-[Syne] font-bold text-[14px] text-[#F6EFD2] mt-3">{wp.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default WallpaperDetail