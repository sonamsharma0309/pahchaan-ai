import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Zap, Palette, Users, FileText, BarChart2 } from 'lucide-react'

const trustedBy = [
  { name: 'Notion', color: '#000' },
  { name: 'Figma', color: '#a259ff' },
  { name: 'Linear', color: '#5e6ad2' },
  { name: 'Vercel', color: '#000' },
  { name: 'Framer', color: '#0055ff' },
  { name: 'Stripe', color: '#635bff' },
]

const guides = [
  {
    icon: <Zap size={20} color="#c9a84c" />,
    title: 'Quick Start Guide',
    desc: 'Get your first brand identity generated in under 60 seconds. Learn how to input your business details for the best results.',
    time: '3 min read',
    tag: 'Beginner',
  },
  {
    icon: <Palette size={20} color="#c9a84c" />,
    title: 'Understanding Your Color Palette',
    desc: 'Learn how Pahchaan AI selects colors based on brand psychology, industry context, and your target audience.',
    time: '5 min read',
    tag: 'Design',
  },
  {
    icon: <Users size={20} color="#c9a84c" />,
    title: 'Brand Archetypes Explained',
    desc: 'A deep dive into the 12 brand archetypes — from The Hero to The Sage — and how each shapes your brand personality.',
    time: '7 min read',
    tag: 'Strategy',
  },
  {
    icon: <FileText size={20} color="#c9a84c" />,
    title: 'Exporting Your Brand Kit',
    desc: 'Step-by-step guide on exporting your brand guidelines as PDF, SVG, and PNG across Free and Pro plans.',
    time: '4 min read',
    tag: 'How-to',
  },
  {
    icon: <BarChart2 size={20} color="#c9a84c" />,
    title: 'The Anti-Generic Score',
    desc: 'Understand how Pahchaan AI measures uniqueness and what steps you can take to improve your brand\'s differentiation score.',
    time: '6 min read',
    tag: 'Pro Feature',
  },
  {
    icon: <BookOpen size={20} color="#c9a84c" />,
    title: 'Brand Voice & Tone Guide',
    desc: 'How to use your generated brand voice consistently across social media, email, and marketing content.',
    time: '5 min read',
    tag: 'Content',
  },
]

const tagColors = {
  Beginner: { bg: 'rgba(122,158,126,0.12)', color: '#5a8a5e' },
  Design: { bg: 'rgba(201,168,76,0.12)', color: '#a8823a' },
  Strategy: { bg: 'rgba(212,132,122,0.12)', color: '#b0604e' },
  'How-to': { bg: 'rgba(201,168,76,0.10)', color: '#c9a84c' },
  'Pro Feature': { bg: 'rgba(26,20,16,0.07)', color: '#3d3028' },
  Content: { bg: 'rgba(122,158,126,0.10)', color: '#4a7a5e' },
}

export default function Documentation() {
  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', padding: '110px 48px 80px' }}>
      <div style={{ maxWidth: 940, margin: '0 auto' }}>

        {/* Back */}
        <Link to="/help" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, color: '#8a7560', fontSize: 13, fontWeight: 600, marginBottom: 40, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          <ArrowLeft size={14} /> Back to Help
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: '#c9a84c', marginBottom: 12, fontWeight: 600 }}>— guides & tutorials —</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(34px, 5vw, 58px)', fontWeight: 900, color: '#1a1410', letterSpacing: '-2px', marginBottom: 16 }}>
            Everything You Need to <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Know</span>
          </h1>
          <p style={{ color: '#8a7560', fontSize: 16, lineHeight: 1.7, maxWidth: 540 }}>
            From your very first brand generation to mastering advanced features — our documentation covers it all, clearly and concisely.
          </p>
        </motion.div>

        {/* Trusted by strip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ marginBottom: 60, padding: '24px 32px', borderRadius: 20, background: 'white', border: '1px solid rgba(201,168,76,0.13)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#b0a090', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20, fontFamily: 'Plus Jakarta Sans, sans-serif', textAlign: 'center' }}>
            Built with the best tools — trusted by founders using
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
            {trustedBy.map(({ name, color }) => (
              <motion.div key={name} whileHover={{ scale: 1.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Minimal geometric logo mark per brand */}
                <div style={{ width: 28, height: 28, borderRadius: 7, background: color, opacity: 0.85, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: 12, fontWeight: 900, fontFamily: 'sans-serif' }}>{name[0]}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#3d3028', fontFamily: 'Plus Jakarta Sans, sans-serif', opacity: 0.75 }}>{name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Guides grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {guides.map((guide, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -5, boxShadow: '0 20px 50px rgba(201,168,76,0.13)' }}
              style={{ padding: '28px', borderRadius: 22, background: 'white', border: '1px solid rgba(201,168,76,0.14)', cursor: 'pointer', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
              {/* Subtle number watermark */}
              <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'Playfair Display, serif', fontSize: 52, fontWeight: 900, color: 'rgba(201,168,76,0.06)', lineHeight: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                {guide.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', fontFamily: 'Plus Jakarta Sans, sans-serif', background: tagColors[guide.tag].bg, color: tagColors[guide.tag].color }}>
                  {guide.tag}
                </span>
                <span style={{ fontSize: 11, color: '#b0a090', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{guide.time}</span>
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 800, color: '#1a1410', marginBottom: 10, letterSpacing: '-0.3px' }}>{guide.title}</h3>
              <p style={{ color: '#8a7560', fontSize: 13, lineHeight: 1.7, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{guide.desc}</p>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#c9a84c', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Read Guide →
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ marginTop: 56, padding: '48px', borderRadius: 28, background: '#1a1410', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: '#c9a84c', marginBottom: 12, fontWeight: 600 }}>— still have questions? —</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 900, color: '#fdf8f0', letterSpacing: '-1px', marginBottom: 16 }}>
            Our team is always <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>here for you</span>
          </h2>
          <p style={{ color: 'rgba(253,248,240,0.45)', fontSize: 15, marginBottom: 28, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Can't find what you're looking for? Reach out directly.
          </p>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '14px 32px', borderRadius: 100, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#1a1410', fontWeight: 700, fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Contact Our Team
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
