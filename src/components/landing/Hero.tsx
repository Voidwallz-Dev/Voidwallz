const Hero = () => {
  return (
    <section className="min-h-screen bg-black pt-20 relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: 'linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="px-6 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            {/* Section Marker */}
            <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-8">
              01 —
            </div>

            {/* Main Heading */}
            <h1 className="font-[Syne] font-extrabold uppercase leading-[0.95] text-[clamp(52px,10vw,88px)] mb-10">
              <div className="text-[#F6EFD2]">WALLS FROM</div>
              <div className="text-[#F6EFD2]">THE</div>
              <div className="text-[#B03030]">VOID</div>
            </h1>

            <hr className="border-zinc-800 mb-8" />

            {/* Subtext */}
            <p className="font-[Space_Mono] text-[14px] text-[#E2DDB4] max-w-[460px] mb-10">
              Premium hand-crafted wallpapers built for dark mode. No watermarks, no paywalls, no bullshit. Just pure void energy for your screens.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-8 flex-wrap">
              <button className="font-[Space_Mono] text-[11px] uppercase bg-[#B03030] text-[#F6EFD2] px-6 py-3">
                EXPLORE →
              </button>
              <a href="#" className="font-[Space_Mono] text-[11px] uppercase text-zinc-600 hover:text-[#B03030] transition-colors">
                VIEW ALL ↓
              </a>
            </div>

            {/* Bottom Stats Line */}
            <div className="font-[Space_Mono] text-[9px] uppercase text-zinc-700 mt-20">
              4K · FREE · DAILY DROPS
            </div>
          </div>

          <div className="md:col-span-4 relative">
            {/* Stacked Placeholder Images */}
            <div className="relative h-[480px] mt-12">
              <div className="absolute top-0 right-0 w-[85%] aspect-video bg-gradient-to-br from-zinc-900 to-black border border-zinc-800" />
              <div className="absolute top-24 right-12 w-[85%] aspect-video bg-gradient-to-br from-zinc-900 to-black border border-zinc-800" />
              <div className="absolute top-48 right-24 w-[85%] aspect-video bg-gradient-to-br from-zinc-900 to-black border border-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero