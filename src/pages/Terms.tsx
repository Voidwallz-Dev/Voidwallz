import SEO from '../components/ui/SEO'

const sections = [
  {
    number: '01',
    title: 'ACCEPTANCE OF TERMS',
    content: 'By accessing voidwallz you agree to these terms. If you disagree, do not use the site.'
  },
  {
    number: '02',
    title: 'USE OF CONTENT',
    content: 'All wallpapers are free for personal use. Commercial use requires written permission. Do not redistribute or resell wallpapers.'
  },
  {
    number: '03',
    title: 'INTELLECTUAL PROPERTY',
    content: 'All wallpapers remain property of their respective creators. voidwallz acts as a curation platform.'
  },
  {
    number: '04',
    title: 'USER CONDUCT',
    content: 'No scraping, automated downloading, or abuse of the platform. Respect the creators.'
  },
  {
    number: '05',
    title: 'DISCLAIMER',
    content: 'Content is provided as-is. voidwallz makes no warranties about uptime or content accuracy.'
  },
  {
    number: '06',
    title: 'CHANGES TO TERMS',
    content: 'We reserve the right to update these terms. Continued use = acceptance.'
  },
  {
    number: '07',
    title: 'CONTACT',
    content: 'Questions? Reach us at @voidwallz on X or Instagram.'
  }
]

export default function Terms() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#F6EFD2', paddingTop: '80px' }}>
      <SEO
        title="Terms of Service"
        description="voidwallz terms of service — free wallpapers for personal use."
        url="https://voidwallz.vercel.app/terms"
      />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#B03030', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>LEGAL —</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '64px', margin: 0, marginBottom: '1rem' }}>TERMS OF SERVICE</h1>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem' }}>APRIL 2026</div>
          <div style={{ width: '100%', height: '1px', background: '#222' }} />
        </div>

        {sections.map((section) => (
          <div key={section.number} style={{ borderBottom: '1px solid #222', padding: '2rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{section.number}</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', margin: 0 }}>{section.title}</h2>
            </div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4', lineHeight: 1.8, margin: 0, paddingLeft: '0' }}>{section.content}</p>
          </div>
        ))}
      </div>

    </div>
  )
}