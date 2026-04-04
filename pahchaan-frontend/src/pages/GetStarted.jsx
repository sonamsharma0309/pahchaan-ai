import { useState } from 'react'
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle, Download } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { generateBrandKit, downloadPDF } from '../api'

const steps = [
  {
    id: 1,
    label: 'About Your Business',
    title: 'Tell us about your business',
    subtitle: 'Help us understand what you do and who you serve.',
    fields: [
      { key: 'businessName', label: 'Business Name', placeholder: 'e.g. Bloom Studio', type: 'text' },
      { key: 'industry', label: 'Industry / Category', placeholder: 'e.g. Fashion, Tech, Food, Wellness', type: 'text' },
      { key: 'description', label: 'What does your business do?', placeholder: 'Describe your product or service in a few sentences...', type: 'textarea' },
    ]
  },
  {
    id: 2,
    label: 'Your Audience',
    title: 'Who are your ideal customers?',
    subtitle: 'Understanding your audience helps us craft the right identity.',
    fields: [
      { key: 'targetAudience', label: 'Target Audience', placeholder: 'e.g. Young professionals aged 22–35 who value sustainability', type: 'textarea' },
      { key: 'location', label: 'Primary Market / Location', placeholder: 'e.g. India, Global, Mumbai', type: 'text' },
    ]
  },
  {
    id: 3,
    label: 'Brand Personality',
    title: 'What should your brand feel like?',
    subtitle: 'Choose words that best describe the personality you want.',
    vibes: ['Bold & Confident', 'Warm & Friendly', 'Minimal & Clean', 'Playful & Fun', 'Luxurious & Premium', 'Trustworthy & Reliable', 'Creative & Expressive', 'Professional & Formal'],
  },
  {
    id: 4,
    label: 'Final Details',
    title: 'Almost there — a few last things',
    subtitle: 'This helps us personalise your brand kit even further.',
    fields: [
      { key: 'competitors', label: 'Who are your competitors? (optional)', placeholder: 'e.g. Zomato, Swiggy — or leave blank if unsure', type: 'text', optional: true },
      { key: 'inspiration', label: 'Brands you admire (optional)', placeholder: 'e.g. Apple for simplicity, Mamaearth for warmth', type: 'text', optional: true },
      { key: 'email', label: 'Your Email Address', placeholder: 'we will send your brand kit here', type: 'email' },
    ]
  }
]

const inputStyle = {
  width: '100%', padding: '13px 18px', borderRadius: 12,
  border: '1.5px solid rgba(201,168,76,0.22)', background: 'rgba(253,248,240,0.7)',
  color: '#1a1410', fontSize: 14, outline: 'none',
  fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'border 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box', display: 'block',
}

export default function GetStarted() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({})
  const [selectedVibes, setSelectedVibes] = useState([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [brandResult, setBrandResult] = useState(null)
  const [downloading, setDownloading] = useState(false)

  const current = steps[step]
  const total = steps.length

  const toggleVibe = (v) => {
    setSelectedVibes(prev =>
      prev.includes(v) ? prev.filter(x => x !== v) : prev.length < 3 ? [...prev, v] : prev
    )
  }

  const handleNext = async () => {
    if (step < total - 1) {
      setStep(s => s + 1)
    } else {
      setLoading(true)
      setError('')
      try {
        const payload = {
          ...form,
          vibes: selectedVibes,
          email: form.email || user?.email,
        }
        const res = await generateBrandKit(payload)
        setBrandResult(res.data.brand)
        setDone(true)
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1)
  }

  const handleDownload = async () => {
    if (!brandResult?._id) return
    setDownloading(true)
    try {
      const res = await downloadPDF(brandResult._id)
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `pahchaan-brandkit-${brandResult.businessName}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      alert('Download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const canProceed = () => {
    if (current.vibes) return selectedVibes.length > 0
    const required = (current.fields || []).filter(f => !f.optional)
    return required.every(f => (form[f.key] || '').trim().length > 0)
  }

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const handleFocus = (e) => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.08)' }
  const handleBlur = (e) => { e.target.style.borderColor = 'rgba(201,168,76,0.22)'; e.target.style.boxShadow = 'none' }

  const kit = brandResult?.generatedKit

  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: `radial-gradient(circle at 15% 25%, rgba(201,168,76,0.10) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(212,132,122,0.08) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(122,158,126,0.06) 0%, transparent 55%)` }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: done && kit ? 720 : 580 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#1a1410' }}>✦</div>
            <div>
              <span style={{ fontFamily: 'serif', fontWeight: 900, fontSize: 16, color: '#1a1410' }}>प</span>
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: 15, color: '#c9a84c' }}>ahchaan</span>
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 13, color: '#1a1410', marginLeft: 4 }}>AI</span>
            </div>
          </Link>
          {!loading && !done && (
            <>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 14px', borderRadius: 100, background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.28)', marginBottom: 10 }}>
                <Sparkles size={12} color="#c9a84c" />
                <span style={{ fontSize: 11, color: '#8a7560', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Free Brand Identity Generator</span>
              </div>
              <p style={{ fontFamily: 'Caveat, cursive', fontSize: 15, color: '#8a7560', fontWeight: 600 }}>Step {step + 1} of {total}</p>
            </>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ padding: '72px 48px', borderRadius: 28, background: 'white', border: '1px solid rgba(201,168,76,0.18)', boxShadow: '0 16px 60px rgba(201,168,76,0.10)', textAlign: 'center' }}>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinRev{to{transform:rotate(-360deg)}}`}</style>
            <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 32px' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid rgba(201,168,76,0.15)', borderTopColor: '#c9a84c', animation: 'spin 1.4s linear infinite' }} />
              <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '2px solid rgba(201,168,76,0.1)', borderBottomColor: '#e8c97a', animation: 'spinRev 2.2s linear infinite' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={22} color="#c9a84c" /></div>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 900, color: '#1a1410', marginBottom: 12 }}>Building Your <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Pahchaan</span></h2>
            <p style={{ color: '#8a7560', fontSize: 14, lineHeight: 1.7 }}>Our AI is analysing your inputs and crafting a brand identity that is uniquely yours. This will be ready shortly.</p>
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.2)', color: '#c0392b', fontSize: 13, marginBottom: 20, textAlign: 'center' }}>
            {error}
            <button onClick={() => setError('')} style={{ display: 'block', margin: '10px auto 0', padding: '8px 20px', borderRadius: 100, border: '1px solid rgba(220,50,50,0.3)', background: 'transparent', color: '#c0392b', cursor: 'pointer', fontSize: 12 }}>Try Again</button>
          </div>
        )}

        {/* DONE — Upgraded Brand Kit Result */}
        {done && kit && (
          <div style={{ width: '100%' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 32 }}>✦</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 900, color: '#1a1410', marginBottom: 8 }}>
                Your <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Pahchaan</span> is Ready! ✨
              </h2>
              <p style={{ color: '#8a7560', fontSize: 15 }}>AI has crafted your complete brand identity</p>
            </div>

            {/* Brand Name & Tagline Hero */}
            <div style={{ borderRadius: 24, background: 'linear-gradient(135deg, #1a1410 0%, #2d2418 100%)', padding: '48px 40px', marginBottom: 20, textAlign: 'center', border: '1px solid rgba(201,168,76,0.3)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(201,168,76,0.6)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 16 }}>Your Brand Identity</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 52, fontWeight: 900, color: '#fdf8f0', marginBottom: 16, letterSpacing: '-1px' }}>{kit.brandName}</h1>
                <p style={{ fontFamily: 'Caveat, cursive', fontSize: 24, color: '#c9a84c', fontWeight: 600, marginBottom: 24 }}>"{kit.tagline}"</p>
                <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)', margin: '0 auto' }} />
              </div>
            </div>

            {/* Colors + Fonts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

              {/* Colors */}
              <div style={{ borderRadius: 20, background: 'white', border: '1px solid rgba(201,168,76,0.15)', padding: '28px 24px', boxShadow: '0 4px 24px rgba(201,168,76,0.06)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#8a7560', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20 }}>Brand Colors</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(kit.colors || []).map((color, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: color, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }} />
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1410', fontFamily: 'monospace' }}>{color}</p>
                        <p style={{ fontSize: 11, color: '#8a7560' }}>{i === 0 ? 'Primary' : i === 1 ? 'Secondary' : 'Accent'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fonts */}
              <div style={{ borderRadius: 20, background: 'white', border: '1px solid rgba(201,168,76,0.15)', padding: '28px 24px', boxShadow: '0 4px 24px rgba(201,168,76,0.06)' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#8a7560', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20 }}>Brand Fonts</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {(kit.fonts || []).map((font, i) => (
                    <div key={i} style={{ padding: '16px', borderRadius: 12, background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
                      <p style={{ fontSize: 11, color: '#8a7560', fontWeight: 600, marginBottom: 6 }}>{i === 0 ? 'PRIMARY' : 'SECONDARY'}</p>
                      <p style={{ fontSize: 20, fontWeight: i === 0 ? 800 : 400, color: '#1a1410', fontFamily: 'Playfair Display, serif' }}>{font}</p>
                      <p style={{ fontSize: 11, color: '#c9a84c', marginTop: 4 }}>{i === 0 ? 'Headings & Display' : 'Body & Content'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Brand Story */}
            <div style={{ borderRadius: 20, background: 'white', border: '1px solid rgba(201,168,76,0.15)', padding: '28px 32px', marginBottom: 16, boxShadow: '0 4px 24px rgba(201,168,76,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📖</div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#8a7560', letterSpacing: '2px', textTransform: 'uppercase' }}>Brand Story</p>
              </div>
              <p style={{ fontSize: 15, color: '#3d3028', lineHeight: 1.8, fontStyle: 'italic' }}>"{kit.brandStory}"</p>
            </div>

            {/* Brand Voice + Social Bio Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ borderRadius: 20, background: 'white', border: '1px solid rgba(201,168,76,0.15)', padding: '28px 24px', boxShadow: '0 4px 24px rgba(201,168,76,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎙️</div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#8a7560', letterSpacing: '2px', textTransform: 'uppercase' }}>Brand Voice</p>
                </div>
                <p style={{ fontSize: 14, color: '#3d3028', lineHeight: 1.7 }}>{kit.brandVoice}</p>
              </div>

              <div style={{ borderRadius: 20, background: 'white', border: '1px solid rgba(201,168,76,0.15)', padding: '28px 24px', boxShadow: '0 4px 24px rgba(201,168,76,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📱</div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#8a7560', letterSpacing: '2px', textTransform: 'uppercase' }}>Social Bio</p>
                </div>
                <p style={{ fontSize: 14, color: '#3d3028', lineHeight: 1.7 }}>{kit.socialBio}</p>
                <div style={{ marginTop: 12, padding: '8px 14px', borderRadius: 8, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', display: 'inline-block' }}>
                  <p style={{ fontSize: 11, color: '#c9a84c', fontWeight: 700 }}>Ready to copy & paste ✓</p>
                </div>
              </div>
            </div>

            {/* Target Persona */}
            <div style={{ borderRadius: 20, background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))', border: '1px solid rgba(201,168,76,0.2)', padding: '28px 32px', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎯</div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#8a7560', letterSpacing: '2px', textTransform: 'uppercase' }}>Target Persona</p>
              </div>
              <p style={{ fontSize: 14, color: '#3d3028', lineHeight: 1.8 }}>{kit.targetPersona}</p>
            </div>

            {/* Logo Prompt */}
            <div style={{ borderRadius: 20, background: 'white', border: '1px solid rgba(201,168,76,0.15)', padding: '28px 32px', marginBottom: 24, boxShadow: '0 4px 24px rgba(201,168,76,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎨</div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#8a7560', letterSpacing: '2px', textTransform: 'uppercase' }}>Logo Design Prompt</p>
              </div>
              <p style={{ fontSize: 13, color: '#3d3028', lineHeight: 1.8, fontFamily: 'monospace', background: 'rgba(201,168,76,0.04)', padding: '16px', borderRadius: 10, border: '1px solid rgba(201,168,76,0.12)' }}>{kit.logoPrompt}</p>
              <p style={{ fontSize: 11, color: '#8a7560', marginTop: 10 }}>💡 Use this prompt in Midjourney, DALL-E, or Adobe Firefly to generate your logo</p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              <button
                onClick={handleDownload}
                disabled={downloading}
                style={{ width: '100%', padding: '16px', borderRadius: 100, border: 'none', cursor: downloading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #c9a84c, #a8823a)', color: '#fdf8f0', fontWeight: 700, fontSize: 16, fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 4px 18px rgba(201,168,76,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Download size={18} />
                {downloading ? 'Downloading...' : 'Download Brand Kit PDF'}
              </button>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <button style={{ width: '100%', padding: '14px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.35)', background: 'transparent', color: '#c9a84c', fontWeight: 700, fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif', cursor: 'pointer' }}>
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* FORM STEPS */}
        {!loading && !done && !error && (
          <div style={{ padding: '44px 44px 36px', borderRadius: 28, background: 'white', border: '1px solid rgba(201,168,76,0.18)', boxShadow: '0 16px 60px rgba(201,168,76,0.10)' }}>

            {/* Progress bar */}
            <div style={{ height: 3, background: 'rgba(201,168,76,0.12)', borderRadius: 100, marginBottom: 36, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${((step + 1) / total) * 100}%`, background: 'linear-gradient(90deg, #c9a84c, #e8c97a)', borderRadius: 100, transition: 'width 0.4s ease' }} />
            </div>

            <p style={{ fontSize: 11, fontWeight: 700, color: '#c9a84c', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 10 }}>{current.label}</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 900, color: '#1a1410', letterSpacing: '-0.8px', marginBottom: 8 }}>{current.title}</h2>
            <p style={{ color: '#8a7560', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>{current.subtitle}</p>

            {/* Fields */}
            {current.fields && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {current.fields.map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#5c4d3c', marginBottom: 7, letterSpacing: '0.3px' }}>{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} placeholder={field.placeholder} value={form[field.key] || ''} onChange={e => updateField(field.key, e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                    ) : (
                      <input type={field.type} style={inputStyle} placeholder={field.placeholder} value={form[field.key] || ''} onChange={e => updateField(field.key, e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Vibes */}
            {current.vibes && (
              <div>
                <p style={{ fontSize: 12, color: '#8a7560', marginBottom: 16 }}>Select up to 3 that resonate most with you.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {current.vibes.map(v => {
                    const selected = selectedVibes.includes(v)
                    return (
                      <button key={v} onClick={() => toggleVibe(v)} style={{ padding: '9px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.2s', background: selected ? 'linear-gradient(135deg, #c9a84c, #e8c97a)' : 'rgba(201,168,76,0.06)', color: selected ? '#1a1410' : '#5c4d3c', border: selected ? 'none' : '1.5px solid rgba(201,168,76,0.22)', boxShadow: selected ? '0 4px 14px rgba(201,168,76,0.30)' : 'none' }}>
                        {selected ? '✓ ' : ''}{v}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 36 }}>
              {step > 0 ? (
                <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 20px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.25)', background: 'transparent', color: '#5c4d3c', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <ArrowLeft size={14} /> Back
                </button>
              ) : <div />}

              <button onClick={handleNext} disabled={!canProceed()} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 100, border: 'none', cursor: canProceed() ? 'pointer' : 'not-allowed', background: canProceed() ? 'linear-gradient(135deg, #c9a84c, #a8823a)' : 'rgba(201,168,76,0.18)', color: canProceed() ? '#fdf8f0' : '#c9a84c', fontWeight: 700, fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: canProceed() ? '0 4px 18px rgba(201,168,76,0.30)' : 'none', transition: 'all 0.25s' }}>
                {step === total - 1 ? 'Generate My Pahchaan' : 'Continue'} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Step dots */}
        {!loading && !done && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
            {steps.map((_, i) => (
              <div key={i} style={{ width: i === step ? 20 : 7, height: 7, borderRadius: 100, background: i === step ? '#c9a84c' : i < step ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.15)', transition: 'all 0.3s' }} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}