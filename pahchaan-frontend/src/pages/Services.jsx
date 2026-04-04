import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    desc: 'Try it with zero risk',
    features: ['1 Brand Identity', 'Basic Color Palette', 'Brand Archetype', 'PDF Export', 'Community Support'],
    route: '/get-started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹99',
    period: '/month',
    desc: 'For serious founders',
    popular: true,
    features: ['5 Brand Identities', 'Full Color System', 'Brand Voice Guide', 'Logo Concepts', 'Social Media Kit', 'Priority Support', 'Anti-Generic Score'],
    route: '/checkout/pro',
  },
  {
    id: 'agency',
    name: 'Agency',
    price: '₹499',
    period: '/month',
    desc: 'For teams and agencies',
    features: ['Unlimited Brands', 'White-label Export', 'Team Collaboration', 'API Access', 'Custom Templates', 'Dedicated Account Manager'],
    route: '/checkout/agency',
  },
]

const Services = () => {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', padding: '120px 48px 80px' }}>
      <div style={{ maxWidth: 1050, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#c9a84c', marginBottom: 12, fontWeight: 600 }}>— plans & pricing —</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, color: '#1a1410', letterSpacing: '-2px', marginBottom: 20 }}>
            Simple, <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Transparent</span> Pricing
          </h1>
          <p style={{ color: '#8a7560', fontSize: 17, maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>No hidden fees. No surprises. Simply choose the plan that works best for you.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{ position: 'relative', padding: '36px 32px', borderRadius: 28, background: plan.popular ? '#1a1410' : 'white', border: plan.popular ? 'none' : '1px solid rgba(201,168,76,0.15)', transition: 'all 0.3s', boxShadow: plan.popular ? '0 24px 60px rgba(26,20,16,0.2)' : 'none' }}>
              {plan.popular && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', padding: '5px 18px', borderRadius: 100, background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', fontSize: 11, fontWeight: 700, color: '#1a1410', whiteSpace: 'nowrap', letterSpacing: '1px' }}>MOST POPULAR</div>}
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: 22, color: plan.popular ? '#fdf8f0' : '#1a1410', marginBottom: 4 }}>{plan.name}</div>
              <div style={{ fontSize: 12, color: plan.popular ? 'rgba(253,248,240,0.45)' : '#8a7560', marginBottom: 24 }}>{plan.desc}</div>
              <div style={{ marginBottom: 28 }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 900, color: plan.popular ? '#c9a84c' : '#1a1410' }}>{plan.price}</span>
                {plan.period && <span style={{ color: plan.popular ? 'rgba(253,248,240,0.4)' : '#8a7560', fontSize: 14 }}>{plan.period}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', flexShrink: 0 }} />
                    <span style={{ color: plan.popular ? 'rgba(253,248,240,0.65)' : '#5c4d3c', fontSize: 14 }}>{f}</span>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate(plan.route)}
                style={{ width: '100%', padding: '14px', borderRadius: 100, border: plan.popular ? 'none' : '1.5px solid rgba(201,168,76,0.4)', cursor: 'pointer', background: plan.popular ? 'linear-gradient(135deg, #c9a84c, #e8c97a)' : 'transparent', color: plan.popular ? '#1a1410' : '#3d3028', fontWeight: 700, fontSize: 15, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services
