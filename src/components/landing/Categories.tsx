import { useState } from 'react'

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  const categories = [
    { name: 'DARK', count: '2,400', gradient: 'from-zinc-950 to-zinc-900' },
    { name: 'MINIMAL', count: '1,800', gradient: 'from-zinc-900 to-zinc-950' },
    { name: 'ABSTRACT', count: '3,100', gradient: 'from-zinc-950 to-black' },
    { name: 'NATURE', count: '980', gradient: 'from-black to-zinc-900' },
    { name: 'SPACE', count: '1,200', gradient: 'from-zinc-900 to-black' },
    { name: 'NEON', count: '650', gradient: 'from-black to-zinc-950' },
    { name: 'RETRO', count: '870', gradient: 'from-zinc-950 to-zinc-900' },
    { name: 'ARCHITECTURE', count: '1,050', gradient: 'from-zinc-900 to-zinc-950' }
  ]

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

        <hr className="border-zinc-800 mb-16" />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`min-h-[180px] bg-gradient-to-br ${category.gradient} p-6 relative cursor-pointer transition-all
                ${index % 4 !== 3 ? 'border-r border-zinc-800' : ''}
                ${index < 4 ? 'border-b border-zinc-800' : ''}
                ${hoveredCategory === index ? 'border-[#B03030]' : ''}`}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Hover Arrow */}
              {hoveredCategory === index && (
                <div className="absolute top-6 right-6 font-[Space_Mono] text-[#B03030] text-lg">
                  →
                </div>
              )}

              {/* Category Content */}
              <div className="absolute bottom-6 left-6">
                <div className={`font-[Syne] font-bold uppercase text-[20px] mb-1 transition-colors ${hoveredCategory === index ? 'text-[#B03030]' : 'text-[#F6EFD2]'}`}>
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