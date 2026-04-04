import { motion } from 'framer-motion'

const About = () => (
  <div style={{ minHeight: '100vh', background: '#fdf8f0', padding: '120px 48px 80px' }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: 'center', marginBottom: 72 }}>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#c9a84c', marginBottom: 12, fontWeight: 600 }}>— our story —</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, color: '#1a1410', letterSpacing: '-2px', marginBottom: 24 }}>
          We Are <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Code Pirates</span>
        </h1>
        <p style={{ color: '#5c4d3c', fontSize: 18, lineHeight: 1.8, maxWidth: 600, margin: '0 auto', fontWeight: 400 }}>
          We believe every business carries a story worth telling. Pahchaan AI exists to transform that story into a brand identity that truly represents who you are.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 60 }}>
        {[
          { title: 'Our Mission', desc: 'To make professional brand identity accessible to every founder, freelancer, and small business — regardless of budget or prior design experience.' },
          { title: 'Our Vision', desc: 'A world where every brand has a distinct identity of its own. Markets that are more diverse, more innovative, and authentically representative of the people behind them.' },
          { title: 'Our Values', desc: 'Originality over imitation. Empowerment over gatekeeping. Speed without sacrificing quality. We are committed to building tools that genuinely serve your growth.' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
            whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(201,168,76,0.12)' }}
            style={{ padding: '36px 30px', borderRadius: 24, background: 'white', border: '1px solid rgba(201,168,76,0.15)', transition: 'all 0.3s' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#1a1410', marginBottom: 12 }}>{item.title}</h3>
            <p style={{ color: '#8a7560', lineHeight: 1.7, fontSize: 14 }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        style={{ padding: '52px 48px', borderRadius: 28, background: '#1a1410', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(18px, 3vw, 28px)', color: '#fdf8f0', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 400 }}>
          "We are not just building brands — we are making them{' '}
          <span style={{ color: '#c9a84c', fontWeight: 700 }}>unforgettable</span>."
        </p>
        <p style={{ color: 'rgba(253,248,240,0.35)', marginTop: 20, fontSize: 12, letterSpacing: '2px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>— TEAM PAHCHAAN AI</p>
      </motion.div>
    </div>
  </div>
)

export default About
