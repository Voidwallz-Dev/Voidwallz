const StatsBar = () => {
  const stats = [
    { value: '10,000+', label: 'WALLPAPERS' },
    { value: '4K / 8K', label: 'RESOLUTION' },
    { value: '100% FREE', label: 'ALWAYS' },
    { value: 'WEEKLY', label: 'NEW DROPS' }
  ]

  return (
    <section className="w-full bg-zinc-900 border-t border-zinc-800 border-b border-zinc-800">
      <div className="flex flex-col md:flex-row">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex-1 py-8 px-6 ${index !== stats.length - 1 ? 'border-r border-zinc-800' : ''}`}
          >
            <div className="font-[Syne] font-bold text-3xl text-[#F6EFD2] mb-1">
              {stat.value}
            </div>
            <div className="font-[Space_Mono] text-[9px] uppercase tracking-[0.2em] text-[#B03030]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatsBar