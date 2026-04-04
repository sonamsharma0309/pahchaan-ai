import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

const FloatCard = ({ style, children, delay = 0, rotate = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: 'absolute',
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(26,20,16,0.15)',
      ...style,
    }}
  >
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [rotate, rotate + 1, rotate] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  </motion.div>
)

const CraftCard = ({ bg, label, w = 160, h = 200 }) => (
  <div style={{
    width: w, height: h, borderRadius: 18, background: bg,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: 8, border: '2px solid rgba(255,255,255,0.6)',
  }}>
    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 13, color: '#3d3028', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</div>
  </div>
)

const words = ['Pahchaan AI', '✦', 'Know Your Brand', '✦', 'Built for Founders', '✦', 'Be Original', '✦', 'Stand Out', '✦', 'Pahchaan AI', '✦', 'Know Your Brand', '✦', 'Built for Founders', '✦', 'Be Original', '✦', 'Stand Out', '✦']

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 48px 60px', maxWidth: 1280, margin: '0 auto' }}>

        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.4,
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(201,168,76,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(212,132,122,0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(122,158,126,0.07) 0%, transparent 60%)` }} />

        {/* LEFT: Text */}
        <div style={{ position: 'relative', zIndex: 10, flex: 1, maxWidth: 580 }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 100, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', marginBottom: 28 }}>
            <Sparkles size={13} color="#c9a84c" />
            <span style={{ fontSize: 12, color: '#8a7560', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>AI-Powered Brand Identity</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', color: '#1a1410', marginBottom: 12 }}
          >
            Build Your
            <br />
            <motion.span
              animate={{ color: ['#c9a84c', '#d4847a', '#7a9e7e', '#c9a84c'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontStyle: 'italic' }}
            >
              Pahchaan
            </motion.span>
            <br />
            Today
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: 'Caveat, cursive', fontSize: 22, color: '#8a7560', marginBottom: 16, fontWeight: 600 }}
          >
            "Know Your Brand. Own Your Story."
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            style={{ fontSize: 16, color: '#5c4d3c', lineHeight: 1.8, maxWidth: 460, marginBottom: 40, fontWeight: 400 }}
          >
            
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <Link to="/get-started" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(201,168,76,0.55)' }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '15px 32px', borderRadius: 100, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #c9a84c, #a8823a)', color: '#fdf8f0', fontWeight: 700, fontSize: 16, boxShadow: '0 6px 24px rgba(201,168,76,0.4)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                <Zap size={18} /> Discover Your Pahchaan <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '15px 28px', borderRadius: 100, cursor: 'pointer', background: 'transparent', border: '1.5px solid rgba(26,20,16,0.15)', color: '#3d3028', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                Learn About Us <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: 32, marginTop: 48 }}
          >
            {[
              { value: '60s', label: 'Brand Ready' },
              { value: '10K+', label: 'Brands Created' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, color: '#c9a84c' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: '#8a7560', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Floating cards */}
        <div className="hidden lg:block" style={{ position: 'relative', flex: 1, height: 600 }}>
          <FloatCard delay={0.2} rotate={-6} style={{ top: 20, left: 60 }}>
            <CraftCard bg="linear-gradient(135deg, #f5e6d0, #eed5b5)" label="Brand Colors" w={155} h={190} />
          </FloatCard>
          <FloatCard delay={0.4} rotate={5} style={{ top: 0, left: 240 }}>
            <CraftCard bg="linear-gradient(135deg, #e8d5e8, #d4b8d4)" label="Archetype" w={145} h={175} />
          </FloatCard>
          <FloatCard delay={0.6} rotate={-3} style={{ top: 210, left: 20 }}>
            <CraftCard bg="linear-gradient(135deg, #d5e8d8, #b8d4bc)" label="Brand Voice" w={165} h={185} />
          </FloatCard>
          <FloatCard delay={0.8} rotate={7} style={{ top: 200, left: 220 }}>
            <CraftCard bg="linear-gradient(135deg, #f5d5d0, #e8b8b4)" label="Typography" w={155} h={195} />
          </FloatCard>
          <FloatCard delay={1.0} rotate={-4} style={{ top: 400, left: 100 }}>
            <CraftCard bg="linear-gradient(135deg, #fdebd0, #f5d5a0)" label="Logo Style" w={170} h={160} />
          </FloatCard>

          <motion.div
            animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: 80, right: 20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1.5px dashed rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ fontFamily: 'Caveat, cursive', fontSize: 11, color: '#c9a84c', textAlign: 'center', fontWeight: 700 }}>✦ AI ✦</span>
          </motion.div>

          <motion.div
            animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: 60, right: 30, padding: '10px 18px', borderRadius: 100, background: '#1a1410', color: '#fdf8f0', fontSize: 13, fontWeight: 600, fontFamily: 'Caveat, cursive', boxShadow: '0 8px 24px rgba(26,20,16,0.25)' }}
          >
            Ready in 60 seconds
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ overflow: 'hidden', background: '#1a1410', padding: '16px 0', margin: '0' }}>
        <div className="marquee-track" style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', width: 'max-content' }}>
          {words.map((w, i) => (
            <span key={i} style={{ fontFamily: w === '✦' ? 'serif' : 'Playfair Display, serif', fontSize: w === '✦' ? 18 : 15, color: w === '✦' ? '#c9a84c' : 'rgba(253,248,240,0.7)', fontWeight: 600, letterSpacing: '1px', fontStyle: w !== '✦' ? 'italic' : 'normal' }}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section style={{ padding: '100px 48px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: '#c9a84c', marginBottom: 12, fontWeight: 600 }}>— how it works —</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#1a1410', letterSpacing: '-1.5px', marginBottom: 16 }}>
            Your
            <span style={{ fontStyle: 'italic', color: '#c9a84c' }}> Pahchaan</span>, in Three Steps
          </h2>
          <p style={{ color: '#8a7560', fontSize: 17, maxWidth: 460, margin: '0 auto', lineHeight: 1.6, fontWeight: 400 }}>
            No design skills required. No agency fees. Just your story — told beautifully.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            { num: '01', title: 'Share Your Story', desc: 'Tell us about your business, your vision, and your ideal customers. In your own words — as much or as little as you like.' },
            { num: '02', title: 'Let the AI Work', desc: 'Our AI analyzes your inputs against thousands of successful brands and crafts a unique identity tailored specifically to you, in seconds.' },
            { num: '03', title: 'Own Your Pahchaan', desc: 'Download your complete brand kit — colors, fonts, voice, archetype, and logo direction. Everything you need to launch with confidence.' },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(201,168,76,0.15)' }}
              style={{ padding: '36px 32px', borderRadius: 24, background: 'white', border: '1px solid rgba(201,168,76,0.15)', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 20, right: 24, fontFamily: 'Playfair Display, serif', fontSize: 56, fontWeight: 900, color: 'rgba(201,168,76,0.08)', lineHeight: 1 }}>{step.num}</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#1a1410', marginBottom: 12, letterSpacing: '-0.3px' }}>{step.title}</h3>
              <p style={{ color: '#8a7560', fontSize: 14, lineHeight: 1.7, fontWeight: 400 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ padding: '80px 48px', background: '#f5ede0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 900, color: '#1a1410', letterSpacing: '-1.5px' }}>
              What You <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Receive</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { title: 'Color Palette', desc: 'Your unique brand colors with hex codes and a complete usage guide.' },
              { title: 'Brand Voice', desc: 'How your brand communicates — tone, vocabulary, and personality.' },
              { title: 'Brand Archetype', desc: 'Your brand persona mapped to proven consumer psychology.' },
              { title: 'Typography', desc: 'Perfect font pairings crafted for your brand aesthetic.' },
              { title: 'Logo Direction', desc: 'Concepts and clear direction for your visual identity.' },
              { title: 'Social Media Kit', desc: 'Ready-to-use templates for Instagram, LinkedIn, and more.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, background: 'white' }}
                style={{ padding: '28px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(201,168,76,0.12)', transition: 'all 0.25s', textAlign: 'center' }}
              >
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#1a1410', marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: '#8a7560', lineHeight: 1.6 }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 48px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ padding: '72px 48px', borderRadius: 32, background: '#1a1410', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 300, background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#c9a84c', marginBottom: 16, fontWeight: 600 }}>— your brand awaits —</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#fdf8f0', letterSpacing: '-1.5px', marginBottom: 20 }}>
              Your Pahchaan
              <br />
              <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Is Yours to Claim</span>
            </h2>
            <p style={{ color: 'rgba(253,248,240,0.5)', fontSize: 17, marginBottom: 40, maxWidth: 440, margin: '0 auto 40px', lineHeight: 1.6, fontWeight: 300 }}>
              Join thousands of founders who have already built a brand identity they are proud of.
            </p>
            <Link to="/get-started" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 16px 50px rgba(201,168,76,0.6)' }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '17px 44px', borderRadius: 100, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#1a1410', fontWeight: 800, fontSize: 17, fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 8px 30px rgba(201,168,76,0.4)', letterSpacing: '0.2px' }}
              >
                Get Started — It's Free
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}

export default Home
