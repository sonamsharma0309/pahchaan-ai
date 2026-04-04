import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const features = [
  { title: 'Instant Brand Generation', desc: 'Receive a complete brand identity in under 60 seconds. Our AI handles the complexity so you can focus on building your business.', points: ['Brand archetype identification', 'Color palette generation', 'Typography recommendations', 'Brand voice & tone guide'] },
  { title: 'Anti-Generic Score', desc: 'We measure exactly how distinctive your brand is, then actively differentiate it from competitors within your industry.', points: ['Competitor landscape analysis', 'Uniqueness scoring system', 'Differentiation recommendations', 'Cross-industry insights'] },
  { title: 'Complete Identity Kit', desc: 'Everything you need to launch in one place — a comprehensive brand kit that is ready the moment you need it.', points: ['Logo concept directions', 'Brand guidelines PDF', 'Social media templates', 'Color and font files'] },
  { title: 'Market Positioning', desc: 'AI-powered analysis that identifies where your brand belongs and how to communicate your value most effectively.', points: ['Audience persona mapping', 'Competitive positioning', 'Value proposition clarity', 'Messaging framework'] },
]

const Features = () => (
  <div style={{ minHeight: '100vh', background: '#fdf8f0', padding: '120px 48px 80px' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 72 }}>
        <p style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#c9a84c', marginBottom: 12, fontWeight: 600 }}>— capabilities —</p>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, color: '#1a1410', letterSpacing: '-2px', marginBottom: 20 }}>
          Your Complete <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Brand Arsenal</span>
        </h1>
        <p style={{ color: '#8a7560', fontSize: 17, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
          Everything you need to build an unforgettable brand — thoughtfully designed and ready to deploy.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 24 }}>
        {features.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(201,168,76,0.12)' }}
            style={{ padding: '36px', borderRadius: 24, background: 'white', border: '1px solid rgba(201,168,76,0.15)', transition: 'all 0.3s' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#1a1410', marginBottom: 12 }}>{f.title}</h3>
            <p style={{ color: '#8a7560', lineHeight: 1.7, fontSize: 14, marginBottom: 24 }}>{f.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {f.points.map((p, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle size={14} color="#c9a84c" />
                  <span style={{ color: '#5c4d3c', fontSize: 13 }}>{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
)

export default Features
