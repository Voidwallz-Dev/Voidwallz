const FinalCTA = () => {
  return (
    <section className="w-full bg-void-red py-24 relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="px-6 relative z-10">
        <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-black mb-6">
          START NOW —
        </div>

        <h2 className="font-[Syne] font-extrabold uppercase text-[clamp(48px,10vw,80px)] text-[#F6EFD2] leading-[0.95] max-w-[700px] mb-8">
          EXPLORE THE VOID
        </h2>

        <hr className="border-black/25 mb-10" />

        <div className="flex flex-wrap gap-6">
          <button className="font-[Space_Mono] text-[10px] uppercase bg-black text-[#F6EFD2] px-8 py-4">
            BROWSE WALLPAPERS
          </button>
          <button className="font-[Space_Mono] text-[10px] uppercase border border-[#F6EFD2] text-[#F6EFD2] px-8 py-4 hover:bg-[#F6EFD2] hover:text-black transition-colors">
            VIEW CATEGORIES →
          </button>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA