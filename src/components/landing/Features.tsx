const Features = () => {
  const features = [
    {
      title: 'CURATED QUALITY',
      description: 'Every wallpaper is hand-reviewed, tested for dark mode, and optimized for perfect contrast.'
    },
    {
      title: 'ALWAYS FREE',
      description: 'No paywalls, no sign-ups, no forced accounts. Just download and go.'
    },
    {
      title: '4K & 8K READY',
      description: 'Maximum resolution for every screen. Retina, ultrawide, and mobile formats included.'
    },
    {
      title: 'NEW DROPS WEEKLY',
      description: 'Fresh content every single week. No dead archives. Constant void energy.'
    }
  ]

  return (
    <section className="bg-black py-20">
      <div className="px-6">
        {/* Section Marker */}
        <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-4">
          04 —
        </div>

        <h2 className="font-[Syne] font-extrabold uppercase text-[clamp(36px,8vw,64px)] text-[#F6EFD2] mb-16">
          BUILT FOR THE DARK SIDE
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-12
                ${index % 2 === 0 ? 'border-r border-zinc-800' : ''}
                ${index < 2 ? 'border-b border-zinc-800' : ''}`}
            >
              <div className="font-[Space_Mono] text-[20px] text-[#B03030] mb-6">+</div>
              <h3 className="font-[Syne] font-bold uppercase text-[24px] text-[#F6EFD2] mb-4">
                {feature.title}
              </h3>
              <p className="font-[Space_Mono] text-[13px] text-[#E2DDB4] max-w-[320px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features