const DevicePreview = () => {
  return (
    <section className="bg-zinc-950 py-20">
      <div className="px-6">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left Column */}
          <div className="md:w-[45%]">
            {/* Section Marker */}
            <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-6">
              05 —
            </div>

            <h2 className="font-[Syne] font-extrabold uppercase text-[clamp(32px,6vw,48px)] text-[#F6EFD2] mb-8">
              PERFECT ON EVERY SCREEN
            </h2>

            <p className="font-[Space_Mono] text-[13px] text-[#E2DDB4] mb-10 max-w-[420px]">
              Every wallpaper is properly cropped and optimized for desktop, mobile, and tablet displays. No awkward crops, no stretched edges. Perfect on every device.
            </p>

            {/* Device Tags */}
            <div className="flex flex-wrap gap-2">
              <div className="font-[Space_Mono] text-[9px] uppercase text-[#B03030] border border-[#B03030] px-3 py-1">
                DESKTOP
              </div>
              <div className="font-[Space_Mono] text-[9px] uppercase text-[#B03030] border border-[#B03030] px-3 py-1">
                MOBILE
              </div>
              <div className="font-[Space_Mono] text-[9px] uppercase text-[#B03030] border border-[#B03030] px-3 py-1">
                TABLET
              </div>
            </div>
          </div>

          {/* Right Column - Device Frames */}
          <div className="md:w-[55%]">
            <div className="bg-zinc-900 p-10 relative" style={{
              backgroundImage: 'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}>
              <div className="flex items-end justify-center gap-10">
                {/* Desktop Frame */}
                <div>
                  <div className="w-[320px] aspect-video border-2 border-zinc-700 bg-gradient-to-br from-zinc-900 to-black" />
                  <div className="h-2 bg-zinc-800 w-[380px] -ml-[30px]" />
                </div>

                {/* Phone Frame */}
                <div className="w-[120px] aspect-[9/16] border-2 border-zinc-700 bg-gradient-to-br from-zinc-900 to-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DevicePreview