import { useState } from 'react'

const FeaturedWallpapers = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const wallpapers = [
    { id: 1, title: 'VOID MATRIX', resolution: '4K' },
    { id: 2, title: 'DEEP ABYSS', resolution: '8K' },
    { id: 3, title: 'DARK NEBULA', resolution: '4K' },
    { id: 4, title: 'GRAVITY WELL', resolution: '8K' },
    { id: 5, title: 'BLACK HOLE', resolution: '4K' },
    { id: 6, title: 'SILENCE', resolution: '8K' }
  ]

  return (
    <section className="bg-black py-20">
      <div className="px-6">
        {/* Section Marker */}
        <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-4">
          02 —
        </div>

        <h2 className="font-[Syne] font-extrabold uppercase text-[clamp(36px,8vw,64px)] text-[#F6EFD2] mb-6">
          HAND-PICKED DROPS
        </h2>

        <hr className="border-zinc-800 mb-16" />

        {/* Wallpaper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-zinc-800">
          {wallpapers.map((wallpaper, index) => (
            <div
              key={wallpaper.id}
              className="bg-black relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden">
                {/* Hover Overlay */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-4 z-10">
                    <div className="font-[Syne] font-bold text-[#F6EFD2] text-lg">{wallpaper.title}</div>
                    <div className="font-[Space_Mono] text-[#B03030] text-[9px]">{wallpaper.resolution}</div>
                    <button className="font-[Space_Mono] text-[9px] uppercase border border-[#B03030] text-[#B03030] px-4 py-2 mt-2 hover:bg-[#B03030] hover:text-[#F6EFD2]">
                      ↓ DOWNLOAD
                    </button>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between">
                <div className="font-[Syne] font-bold text-[14px] text-[#F6EFD2]">
                  {wallpaper.title}
                </div>
                <div className="font-[Space_Mono] text-[9px] text-zinc-600">
                  {wallpaper.resolution}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <button className="font-[Space_Mono] text-[10px] uppercase text-[#F6EFD2] border border-[#F6EFD2] px-8 py-3 hover:bg-[#F6EFD2] hover:text-black transition-colors">
            VIEW ALL WALLPAPERS →
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWallpapers