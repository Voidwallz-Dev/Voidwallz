import Hero from '../components/landing/Hero'
import StatsBar from '../components/landing/StatsBar'
import FeaturedWallpapers from '../components/landing/FeaturedWallpapers'
import Categories from '../components/landing/Categories'
import Features from '../components/landing/Features'
import DevicePreview from '../components/landing/DevicePreview'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'
import SEO from '../components/ui/SEO'

export default function Home() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <SEO
        title="Walls from the Void"
        description="Curated 4K & 8K wallpapers for those who dwell in the dark. Free, no sign-up, new drops weekly."
        url="https://voidwallz.vercel.app"
      />
      <Hero />
      <StatsBar />
      <FeaturedWallpapers />
      <Categories />
      <Features />
      <DevicePreview />
      <FinalCTA />
      <Footer />
    </div>
  )
}