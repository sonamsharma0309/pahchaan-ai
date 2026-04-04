import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqs = [
  { q: 'How does Pahchaan AI work?', a: 'You describe your business — your vision, your values, and your target audience. Our AI analyzes your inputs against thousands of successful brands and generates a complete brand identity tailored to you, including colors, typography, voice, and archetype — all in under 60 seconds.' },
  { q: 'Will my brand identity be unique?', a: 'Absolutely. Every identity is generated exclusively based on your inputs. Our Anti-Generic Score actively ensures your brand stands out from competitors and avoids generic patterns common in your industry.' },
  { q: 'Can I edit the generated identity after creation?', a: 'Yes, of course. Once your identity is generated, you can adjust colors, refine the tone, or regenerate specific elements until everything feels just right for your brand.' },
  { q: 'What export formats are available?', a: 'Free users can export a PDF brand guidelines document. Pro users receive SVG, PNG, hex color codes, and ready-to-use social media templates across all major platforms.' },
  { q: 'Will I own the rights to my brand?', a: 'On all paid plans, you retain full commercial ownership of everything generated. The Free plan is intended for personal and non-commercial use only.' },
  { q: 'How many brands can I create?', a: 'Free plan: 1 brand. Pro plan: up to 5 brands. Agency plan: unlimited brands with team collaboration features.' },
]

const FAQ = ({ faq }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderRadius: 16, border: '1px solid rgba(201,168,76,0.15)', overflow: 'hidden', marginBottom: 10 }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '20px 24px', background: open ? 'rgba(201,168,76,0.05)' : 'white', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700, color: '#1a1410' }}>{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color="#c9a84c" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <p style={{ padding: '0 24px 20px', color: '#8a7560', lineHeight: 1.7, fontSize: 14, background: 'rgba(201,168,76,0.03)' }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Help = () => {
  const scrollToFAQ = () => {
    document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', padding: '120px 48px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#c9a84c', marginBottom: 12, fontWeight: 600 }}>— support center —</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 900, color: '#1a1410', letterSpacing: '-2px', marginBottom: 16 }}>
            We Are Here to <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Help</span>
          </h1>
          <p style={{ color: '#8a7560', fontSize: 17, lineHeight: 1.6 }}>Find answers to the most commonly asked questions below.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 48 }}>

          {/* Documentation — new page */}
          <Link to="/documentation" style={{ textDecoration: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(201,168,76,0.12)' }}
              style={{ padding: '24px 20px', borderRadius: 18, background: 'white', border: '1px solid rgba(201,168,76,0.15)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ fontSize: 24, color: '#c9a84c', marginBottom: 10, fontWeight: 300 }}>◈</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 15, color: '#1a1410', marginBottom: 4 }}>Documentation</div>
              <div style={{ fontSize: 12, color: '#8a7560' }}>Guides & tutorials</div>
            </motion.div>
          </Link>

          {/* FAQ — smooth scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(201,168,76,0.12)' }}
            onClick={scrollToFAQ}
            style={{ padding: '24px 20px', borderRadius: 18, background: 'white', border: '1px solid rgba(201,168,76,0.15)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
            <div style={{ fontSize: 24, color: '#c9a84c', marginBottom: 10, fontWeight: 300 }}>◉</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 15, color: '#1a1410', marginBottom: 4 }}>FAQ</div>
            <div style={{ fontSize: 12, color: '#8a7560' }}>Common questions</div>
          </motion.div>

          {/* Live Chat — contact page */}
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(201,168,76,0.12)' }}
              style={{ padding: '24px 20px', borderRadius: 18, background: 'white', border: '1px solid rgba(201,168,76,0.15)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
              <div style={{ fontSize: 24, color: '#c9a84c', marginBottom: 10, fontWeight: 300 }}>◎</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 15, color: '#1a1410', marginBottom: 4 }}>Live Chat</div>
              <div style={{ fontSize: 12, color: '#8a7560' }}>Talk to our team</div>
            </motion.div>
          </Link>
        </div>

        <motion.div id="faq-section" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 800, color: '#1a1410', marginBottom: 24 }}>
            Frequently Asked <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Questions</span>
          </h2>
          {faqs.map((faq, i) => <FAQ key={i} faq={faq} />)}
        </motion.div>
      </div>
    </div>
  )
}

export default Help
