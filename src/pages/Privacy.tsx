import SEO from '../components/ui/SEO'

const sections = [
  {
    number: '01',
    title: 'INFORMATION WE COLLECT',
    content: 'We do not collect personal data. No accounts, no sign-ups, no tracking cookies. Download counts are anonymous.'
  },
  {
    number: '02',
    title: 'HOW WE USE INFORMATION',
    content: 'Anonymous usage stats only — page views and download counts to improve the platform. No personal data is stored.'
  },
  {
    number: '03',
    title: 'THIRD PARTY SERVICES',
    content: 'We use Vercel for hosting (see Vercel\'s privacy policy). No ad networks, no data brokers, no analytics that track individuals.'
  },
  {
    number: '04',
    title: 'COOKIES',
    content: 'We use no tracking cookies. Only essential session data if applicable.'
  },
  {
    number: '05',
    title: 'YOUR RIGHTS',
    content: 'Since we collect no personal data, there is nothing to request, modify, or delete.'
  },
  {
    number: '06',
    title: 'CHILDREN\'S PRIVACY',
    content: 'voidwallz is not directed at children under 13. We do not knowingly collect any data from minors.'
  },
  {
    number: '07',
    title: 'CONTACT',
    content: 'Privacy questions? Reach us at @voidwallz on X or Instagram.'
  }
]

export default function Privacy() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#F6EFD2', paddingTop: '80px' }}>
      <SEO
        title="Privacy Policy"
        description="voidwallz privacy policy — we collect no personal data. No tracking, no cookies."
        url="https://voidwallz.vercel.app/privacy"
      />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#B03030', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>LEGAL —</div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '64px', margin: 0, marginBottom: '1rem' }}>PRIVACY POLICY</h1>
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