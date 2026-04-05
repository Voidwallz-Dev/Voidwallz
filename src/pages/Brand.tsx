import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import Footer from '../components/landing/Footer'

export default function Brand() {
  return (
    <div className="min-h-screen bg-black pt-[80px]">
      <SEO 
        title="Brand Kit" 
        description="voidwallz brand guidelines — colors, typography, logos and usage rules." 
        url="https://voidwallz.vercel.app/brand" 
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-3">
              BRAND —
            </div>
            <h1 className="font-[Syne] font-extrabold text-[80px] text-[#F6EFD2] mb-3">BRAND KIT</h1>
            <p className="font-[Space_Mono] text-[14px] text-[#E2DDB4]">Everything you need to represent voidwallz correctly.</p>
          </div>
          <a href="#" className="font-[Space_Mono] text-[9px] uppercase tracking-wider text-[#B03030] border border-[#B03030] px-4 py-2 mt-6 md:mt-0">
            ↓ DOWNLOAD ASSETS
          </a>
        </div>

        <hr className="border-[#222] mb-16" />

        {/* Section 01 — Logo */}
        <section className="py-16 border-t border-[#222]">
          <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-3">
            01 — LOGO
          </div>
          <h2 className="font-[Syne] font-extrabold text-[48px] text-[#F6EFD2] mb-6">THE MARK</h2>
          <p className="font-[Space_Mono] text-[13px] text-[#E2DDB4] max-w-2xl mb-12">
            The voidwallz wordmark is the primary brand identifier. Always use the approved versions below. Never modify, rotate, stretch or recolor.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-12">
            <div style={{ background: '#000', border: '1px solid #222', padding: '3rem', minHeight: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <img src="/brand/logo-primary.svg" style={{ width: '100px', height: '100px' }} />
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                <span style={{ color: '#F6EFD2' }}>void</span>
                <span style={{ color: '#B03030' }}>wallz</span>
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase' }}>PRIMARY — DARK BG</div>
            </div>
            <div style={{ background: '#F6EFD2', padding: '3rem', minHeight: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <img src="/brand/logo-reversed.svg" style={{ width: '100px', height: '100px' }} />
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                <span style={{ color: '#000' }}>void</span>
                <span style={{ color: '#B03030' }}>wallz</span>
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}>REVERSED — LIGHT BG</div>
            </div>
            <div style={{ background: '#B03030', padding: '3rem', minHeight: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <img src="/brand/logo-accent.svg" style={{ width: '100px', height: '100px' }} />
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>
                <span style={{ color: '#F6EFD2' }}>void</span>
                <span style={{ color: '#F6EFD2' }}>wallz</span>
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: 'rgba(246,239,210,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>ACCENT — RED BG</div>
            </div>
          </div>

          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#B03030', marginBottom: '1.5rem' }}>× DON'T DO THIS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div style={{ border: '1px solid #1a1a1a', padding: '1.5rem', fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555' }}>
              × Don't change the colors
            </div>
            <div style={{ border: '1px solid #1a1a1a', padding: '1.5rem', fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555' }}>
              × Don't add effects or shadows
            </div>
            <div style={{ border: '1px solid #1a1a1a', padding: '1.5rem', fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555' }}>
              × Don't stretch or distort
            </div>
            <div style={{ border: '1px solid #1a1a1a', padding: '1.5rem', fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555' }}>
              × Don't use on busy backgrounds
            </div>
          </div>
        </section>

        {/* Section 02 — Colors */}
        <section className="py-16 border-t border-[#222]">
          <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-3">
            02 — COLORS
          </div>
          <h2 className="font-[Syne] font-extrabold text-[48px] text-[#F6EFD2] mb-12">COLOR SYSTEM</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-8">
            <div style={{ border: '1px solid #222' }}>
              <div style={{ height: '160px', background: '#B03030' }} />
              <div style={{ padding: '1rem' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#F6EFD2' }}>VOID RED</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555', marginTop: '0.5rem' }}>#B03030</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#333', marginTop: '0.25rem' }}>rgb(176, 48, 48)</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', marginTop: '0.5rem', textTransform: 'uppercase' }}>PRIMARY ACCENT</div>
              </div>
            </div>
            <div style={{ border: '1px solid #222' }}>
              <div style={{ height: '160px', background: '#F6EFD2' }} />
              <div style={{ padding: '1rem' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#000' }}>BONE</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555', marginTop: '0.5rem' }}>#F6EFD2</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#333', marginTop: '0.25rem' }}>rgb(246, 239, 210)</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', marginTop: '0.5rem', textTransform: 'uppercase' }}>PRIMARY TEXT</div>
              </div>
            </div>
            <div style={{ border: '1px solid #222' }}>
              <div style={{ height: '160px', background: '#E2DDB4' }} />
              <div style={{ padding: '1rem' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#000' }}>DUST</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555', marginTop: '0.5rem' }}>#E2DDB4</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#333', marginTop: '0.25rem' }}>rgb(226, 221, 180)</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', marginTop: '0.5rem', textTransform: 'uppercase' }}>SECONDARY TEXT</div>
              </div>
            </div>
            <div style={{ border: '1px solid #333' }}>
              <div style={{ height: '160px', background: '#000' }} />
              <div style={{ padding: '1rem' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#F6EFD2' }}>THE VOID</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#555', marginTop: '0.5rem' }}>#000000</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#333', marginTop: '0.25rem' }}>rgb(0, 0, 0)</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', marginTop: '0.5rem', textTransform: 'uppercase' }}>BACKGROUND</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-0 mb-12">
            {['#0a0a0a', '#111111', '#1a1a1a', '#222222', '#333333', '#555555'].map((color) => (
              <div key={color} style={{ border: '1px solid #222', textAlign: 'center' }}>
                <div style={{ height: '40px', background: color }} />
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#333', padding: '0.5rem' }}>{color}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px' }}><span style={{ color: '#E2DDB4' }}>✓</span> Use Void Red sparingly — only for accents and key moments</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px' }}><span style={{ color: '#E2DDB4' }}>✓</span> Black is the dominant color — let it breathe</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px' }}><span style={{ color: '#E2DDB4' }}>✓</span> Bone on black for all primary text</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px' }}><span style={{ color: '#B03030' }}>×</span> Never use pure white — use Bone instead</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px' }}><span style={{ color: '#B03030' }}>×</span> Never use red as a background except for CTA sections</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px' }}><span style={{ color: '#B03030' }}>×</span> Never use more than 2 accent colors together</div>
          </div>
        </section>

        {/* Section 03 — Typography */}
        <section className="py-16 border-t border-[#222]">
          <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-3">
            03 — TYPE
          </div>
          <h2 className="font-[Syne] font-extrabold text-[48px] text-[#F6EFD2] mb-12">TYPOGRAPHY</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#222] mb-12">
            <div style={{ padding: '3rem', borderRight: '1px solid #222' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', marginBottom: '1rem' }}>DISPLAY & HEADINGS</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '48px', color: '#F6EFD2', marginBottom: '1.5rem' }}>Syne</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '24px', color: '#F6EFD2', marginBottom: '0.5rem' }}>800 — EXTRABOLD</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '24px', color: '#F6EFD2', marginBottom: '1.5rem' }}>700 — BOLD</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#555', marginBottom: '1.5rem' }}>
                Used for all headings, display text, wordmark and hero moments.
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '0.1em', color: '#333' }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
              </div>
            </div>
            <div style={{ padding: '3rem' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', marginBottom: '1rem' }}>BODY & LABELS</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: '32px', color: '#F6EFD2', marginBottom: '1.5rem' }}>Space Mono</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: '18px', color: '#F6EFD2', marginBottom: '0.5rem' }}>700 — BOLD</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontWeight: 400, fontSize: '18px', color: '#F6EFD2', marginBottom: '1.5rem' }}>400 — REGULAR</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#555', marginBottom: '1.5rem' }}>
                Used for all body copy, labels, captions, metadata and UI elements.
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontWeight: 400, fontSize: '12px', color: '#333' }}>
                abcdefghijklmnopqrstuvwxyz 0123456789 !@#$%
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid #222' }}>
            {[
              { role: 'Display', font: 'Syne', size: '80–96px', weight: '800', tracking: '-0.02em' },
              { role: 'Heading 1', font: 'Syne', size: '64px', weight: '800', tracking: '-0.01em' },
              { role: 'Heading 2', font: 'Syne', size: '48px', weight: '700', tracking: '0' },
              { role: 'Heading 3', font: 'Syne', size: '24px', weight: '700', tracking: '0' },
              { role: 'Body', font: 'Space Mono', size: '13–14px', weight: '400', tracking: '0' },
              { role: 'Label', font: 'Space Mono', size: '9–10px', weight: '700', tracking: '0.2em' },
              { role: 'Caption', font: 'Space Mono', size: '9px', weight: '400', tracking: '0.12em' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', padding: '1rem', borderBottom: '1px solid #1a1a1a' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', textTransform: 'uppercase' }}>ROLE</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', textTransform: 'uppercase' }}>FONT</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', textTransform: 'uppercase' }}>SIZE</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', textTransform: 'uppercase' }}>WEIGHT</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', textTransform: 'uppercase' }}>TRACKING</div>
              </div>
            ))}
            {[
              { role: 'Display', font: 'Syne', size: '80–96px', weight: '800', tracking: '-0.02em' },
              { role: 'Heading 1', font: 'Syne', size: '64px', weight: '800', tracking: '-0.01em' },
              { role: 'Heading 2', font: 'Syne', size: '48px', weight: '700', tracking: '0' },
              { role: 'Heading 3', font: 'Syne', size: '24px', weight: '700', tracking: '0' },
              { role: 'Body', font: 'Space Mono', size: '13–14px', weight: '400', tracking: '0' },
              { role: 'Label', font: 'Space Mono', size: '9–10px', weight: '700', tracking: '0.2em' },
              { role: 'Caption', font: 'Space Mono', size: '9px', weight: '400', tracking: '0.12em' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', padding: '1rem', borderBottom: i < 6 ? '1px solid #1a1a1a' : 'none' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#E2DDB4' }}>{row.role}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#E2DDB4' }}>{row.font}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#E2DDB4' }}>{row.size}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#E2DDB4' }}>{row.weight}</div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#E2DDB4' }}>{row.tracking}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 04 — Voice & Tone */}
        <section className="py-16 border-t border-[#222]">
          <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-3">
            04 — VOICE
          </div>
          <h2 className="font-[Syne] font-extrabold text-[48px] text-[#F6EFD2] mb-12">BRAND VOICE</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', marginBottom: '2rem', textTransform: 'uppercase' }}>WE ARE</h3>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', color: '#B03030' }}>+</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F6EFD2' }}>DARK</span>
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4', paddingLeft: '1.75rem' }}>
                  Embracing the aesthetic of darkness without apology.
                </div>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', color: '#B03030' }}>+</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F6EFD2' }}>MINIMAL</span>
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4', paddingLeft: '1.75rem' }}>
                  No clutter. No noise. Only what matters.
                </div>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', color: '#B03030' }}>+</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F6EFD2' }}>DIRECT</span>
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4', paddingLeft: '1.75rem' }}>
                  We say what we mean. No corporate speak.
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', color: '#B03030' }}>+</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F6EFD2' }}>FREE</span>
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4', paddingLeft: '1.75rem' }}>
                  Always free. No tricks, no paywalls, no bullshit.
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', marginBottom: '2rem', textTransform: 'uppercase' }}>WE ARE NOT</h3>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', color: '#B03030' }}>×</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F6EFD2' }}>CORPORATE</span>
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4', paddingLeft: '1.75rem' }}>
                  We don't do polished PR language.
                </div>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', color: '#B03030' }}>×</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F6EFD2' }}>LOUD</span>
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4', paddingLeft: '1.75rem' }}>
                  The void is quiet. So are we.
                </div>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', color: '#B03030' }}>×</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F6EFD2' }}>EXCLUSIVE</span>
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4', paddingLeft: '1.75rem' }}>
                  Dark aesthetics are for everyone.
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', color: '#B03030' }}>×</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F6EFD2' }}>COMPLICATED</span>
                </div>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4', paddingLeft: '1.75rem' }}>
                  Download. Set. Done.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05 — Usage Rules */}
        <section className="py-16 border-t border-[#222]">
          <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-3">
            05 — USAGE
          </div>
          <h2 className="font-[Syne] font-extrabold text-[48px] text-[#F6EFD2] mb-6">USAGE RULES</h2>
          <p className="font-[Space_Mono] text-[13px] text-[#E2DDB4] max-w-2xl mb-12">
            When referencing or featuring voidwallz, follow these guidelines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div style={{ border: '1px solid #222', padding: '2rem' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#F6EFD2', marginBottom: '1rem' }}>ATTRIBUTION</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4' }}>
                When sharing our wallpapers, credit @voidwallz on X or Instagram.
              </div>
            </div>
            <div style={{ border: '1px solid #222', padding: '2rem' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#F6EFD2', marginBottom: '1rem' }}>PERSONAL USE</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4' }}>
                All wallpapers are free for personal, non-commercial use. Desktop, mobile, tablet — go wild.
              </div>
            </div>
            <div style={{ border: '1px solid #222', padding: '2rem' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: '#F6EFD2', marginBottom: '1rem' }}>COMMERCIAL USE</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#E2DDB4' }}>
                Commercial use requires written permission. Reach out at @voidwallz before using in any paid project.
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 — Social */}
        <section className="py-16 border-t border-[#222]">
          <div className="font-[Space_Mono] text-[10px] uppercase tracking-[0.25em] text-[#B03030] mb-3">
            06 — SOCIAL
          </div>
          <h2 className="font-[Syne] font-extrabold text-[48px] text-[#F6EFD2] mb-12">FIND US</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <a href="https://x.com/voidwallz" target="_blank" rel="noopener noreferrer" style={{ border: '1px solid #222', padding: '3rem', textDecoration: 'none', transition: 'all 0.2s ease' }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#B03030'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#222'}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '24px', color: '#F6EFD2', marginBottom: '0.5rem' }}>X / TWITTER</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', color: '#B03030', marginBottom: '1rem' }}>@voidwallz</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#555', marginBottom: '1.5rem' }}>
                Follow for new drops, behind the scenes and dark vibes.
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', textTransform: 'uppercase' }}>FOLLOW →</div>
            </a>
            <a href="https://instagram.com/voidwallz" target="_blank" rel="noopener noreferrer" style={{ border: '1px solid #222', padding: '3rem', textDecoration: 'none', transition: 'all 0.2s ease' }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#B03030'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#222'}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '24px', color: '#F6EFD2', marginBottom: '0.5rem' }}>INSTAGRAM</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', color: '#B03030', marginBottom: '1rem' }}>@voidwallz</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#555', marginBottom: '1.5rem' }}>
                Visual previews of new wallpaper drops.
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#B03030', textTransform: 'uppercase' }}>FOLLOW →</div>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}