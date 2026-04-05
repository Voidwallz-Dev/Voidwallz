import { useState } from 'react'

const Categories = () => {
  const [activeTab, setActiveTab] = useState<'pc' | 'mobile' | 'tablet'>('pc')
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const pcCategories = [
    { name: 'DARK', count: '2,400', gradient: 'from-zinc-950 to-zinc-900', aspect: 'aspect-[16/9]' },
    { name: 'MINIMAL', count: '1,800', gradient: 'from-zinc-900 to-zinc-950', aspect: 'aspect-[16/9]' },
    { name: 'ABSTRACT', count: '3,100', gradient: 'from-zinc-950 to-black', aspect: 'aspect-[16/9]' },
    { name: 'NATURE', count: '980', gradient: 'from-black to-zinc-900', aspect: 'aspect-[16/9]' },
    { name: 'SPACE', count: '1,200', gradient: 'from-zinc-900 to-black', aspect: 'aspect-[16/9]' },
    { name: 'NEON', count: '650', gradient: 'from-black to-zinc-950', aspect: 'aspect-[16/9]' },
    { name: 'RETRO', count: '870', gradient: 'from-zinc-950 to-zinc-900', aspect: 'aspect-[16/9]' },
    { name: 'ARCHITECTURE', count: '1,050', gradient: 'from-zinc-900 to-zinc-950', aspect: 'aspect-[16/9]' }
  ]

  const mobileCategories = [
    { name: 'DARK', count: '1,200', gradient: 'from-zinc-950 to-zinc-900', aspect: 'aspect-[9/16]' },
    { name: 'MINIMAL', count: '900', gradient: 'from-zinc-900 to-zinc-950', aspect: 'aspect-[9/16]' },
    { name: 'ABSTRACT', count: '1,600', gradient: 'from-zinc-950 to-black', aspect: 'aspect-[9/16]' },
    { name: 'NATURE', count: '520', gradient: 'from-black to-zinc-900', aspect: 'aspect-[9/16]' },
    { name: 'NEON', count: '380', gradient: 'from-black to-zinc-950', aspect: 'aspect-[9/16]' },
    { name: 'RETRO', count: '470', gradient: 'from-zinc-950 to-zinc-900', aspect: 'aspect-[9/16]' }
  ]

  const tabletCategories = [
    { name: 'DARK', count: '1,800', gradient: 'from-zinc-950 to-zinc-900', aspect: 'aspect-[4/3]' },
    { name: 'MINIMAL', count: '1,300', gradient: 'from-zinc-900 to-zinc-950', aspect: 'aspect-[4/3]' },
    { name: 'ABSTRACT', count: '2,200', gradient: 'from-zinc-950 to-black', aspect: 'aspect-[4/3]' },
    { name: 'NATURE', count: '760', gradient: 'from-black to-zinc-900', aspect: 'aspect-[4/3]' },
    { name: 'SPACE', count: '900', gradient: 'from-zinc-900 to-black', aspect: 'aspect-[4/3]' },
    { name: 'ARCHITECTURE', count: '820', gradient: 'from-zinc-900 to-zinc-950', aspect: 'aspect-[4/3]' }
  ]

  const getActiveCategories = () => {
    switch (activeTab) {
      case 'pc': return pcCategories
      case 'mobile': return mobileCategories
      case 'tablet': return tabletCategories
    }
  }

  const categories = getActiveCategories()

  return (
    <section className="bg-zinc-950 py-20">
      <div className="px-6">
        {/* Section Marker */}
        <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-4">
          03 —
        </div>

        <h2 className="font-[Syne] font-extrabold uppercase text-[clamp(36px,8vw,64px)] text-[#F6EFD2] mb-6">
          BROWSE BY CATEGORY
        </h2>

        {/* Device Tabs */}
        <div className="flex gap-0 mb-16">
          <button
            onClick={() => setActiveTab('pc')}
            className={`px-6 py-3 font-[Space_Mono] text-[9px] uppercase transition-all ${
              activeTab === 'pc'
                ? 'bg-[#B03030] text-[#F6EFD2]'
                : 'border border-[#222] text-[#555]'
            }`}
          >
            PC / DESKTOP
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-6 py-3 font-[Space_Mono] text-[9px] uppercase transition-all ${
              activeTab === 'mobile'
                ? 'bg-[#B03030] text-[#F6EFD2]'
                : 'border border-[#222] text-[#555]'
            }`}
          >
            MOBILE
          </button>
          <button
            onClick={() => setActiveTab('tablet')}
            className={`px-6 py-3 font-[Space_Mono] text-[9px] uppercase transition-all ${
              activeTab === 'tablet'
                ? 'bg-[#B03030] text-[#F6EFD2]'
                : 'border border-[#222] text-[#555]'
            }`}
          >
            TABLET
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`bg-gradient-to-br ${category.gradient} ${category.aspect} p-6 relative cursor-pointer transition-all border border-[#222] ${hoveredCategory === category.name ? 'border-[#B03030]' : ''}`}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Hover Arrow */}
              {hoveredCategory === category.name && (
                <div className="absolute top-6 right-6 font-[Space_Mono] text-[#B03030] text-lg">
                  →
                </div>
              )}

              {/* Category Content */}
              <div className="absolute bottom-6 left-6">
                <div className={`font-[Syne] font-bold uppercase text-[20px] mb-1 transition-colors ${hoveredCategory === category.name ? 'text-[#B03030]' : 'text-[#F6EFD2]'}`}>
                  {category.name}
                </div>
                <div className="font-[Space_Mono] text-[9px] text-zinc-600">
                  {category.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
