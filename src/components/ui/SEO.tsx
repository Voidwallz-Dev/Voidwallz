import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export default function SEO({
  title = "voidwallz — Walls from the Void",
  description = "Curated 4K & 8K wallpapers for those who dwell in the dark. Free, no sign-up, new drops weekly.",
  image = "https://voidwallz.vercel.app/og-image.jpg",
  url = "https://voidwallz.vercel.app",
  type = "website"
}: SEOProps) {
  const pageTitle = title !== "voidwallz — Walls from the Void" 
    ? `${title} | voidwallz` 
    : title

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="wallpapers, 4K wallpapers, dark wallpapers, free wallpapers, 8K wallpapers, minimal wallpapers, desktop wallpapers" />
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="voidwallz" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@voidwallz" />
      <meta name="twitter:creator" content="@voidwallz" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}