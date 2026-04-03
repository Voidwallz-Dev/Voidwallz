const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-[#B03030]">
      <div className="px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 - Brand */}
          <div>
            <div className="font-[Syne] font-extrabold text-2xl mb-4">
              <span className="text-[#F6EFD2]">void</span>
              <span className="text-[#B03030]">wallz</span>
            </div>
            <div className="font-[Space_Mono] text-[9px] uppercase text-zinc-600">
              WALLS FROM THE VOID
            </div>
          </div>

          {/* Column 2 - Explore */}
          <div>
            <div className="font-[Space_Mono] text-[9px] uppercase tracking-[0.2em] text-[#B03030] mb-4">
              EXPLORE
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-[Space_Mono] text-[13px] text-[#E2DDB4] hover:text-[#F6EFD2] transition-colors">
                BROWSE
              </a>
              <a href="#" className="font-[Space_Mono] text-[13px] text-[#E2DDB4] hover:text-[#F6EFD2] transition-colors">
                CATEGORIES
              </a>
              <a href="#" className="font-[Space_Mono] text-[13px] text-[#E2DDB4] hover:text-[#F6EFD2] transition-colors">
                NEW DROPS
              </a>
              <a href="#" className="font-[Space_Mono] text-[13px] text-[#E2DDB4] hover:text-[#F6EFD2] transition-colors">
                ABOUT
              </a>
            </div>
          </div>

          {/* Column 3 - Connect */}
          <div>
            <div className="font-[Space_Mono] text-[9px] uppercase tracking-[0.2em] text-[#B03030] mb-4">
              CONNECT
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-[Space_Mono] text-[13px] text-[#E2DDB4] hover:text-[#F6EFD2] transition-colors">
                GITHUB
              </a>
              <a href="#" className="font-[Space_Mono] text-[13px] text-[#E2DDB4] hover:text-[#F6EFD2] transition-colors">
                TWITTER · X
              </a>
              <a href="#" className="font-[Space_Mono] text-[13px] text-[#E2DDB4] hover:text-[#F6EFD2] transition-colors">
                DISCORD
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="font-[Space_Mono] text-[9px] text-zinc-700">
            © 2026 VOIDWALLZ
          </div>
          <div className="font-[Space_Mono] text-[9px] text-zinc-700 mt-2 md:mt-0">
            MADE WITH VOID ENERGY.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer