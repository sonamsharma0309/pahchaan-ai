import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

/* ── Inline SVG Logo ── */
const PahchaanLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(50,22)">
      {[0,45,90,135,180,225,270,315].map((angle, i) => (
        <ellipse key={i} cx={Math.cos(angle * Math.PI/180) * 9} cy={Math.sin(angle * Math.PI/180) * 9}
          rx="5.5" ry="5.5" fill="#c9a84c" transform={`rotate(${angle})`} />
      ))}
      <circle cx="0" cy="0" r="6" fill="#c9a84c" />
    </g>
    <path d="M38 38 Q50 50 62 38 L62 65 Q50 55 38 65 Z" fill="#c9a84c" />
    <rect x="34" y="65" width="32" height="10" rx="4" fill="#c9a84c" />
    <rect x="35" y="36" width="5" height="30" rx="2.5" fill="#c9a84c" />
  </svg>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', s)
    return () => window.removeEventListener('scroll', s)
  }, [])

  useEffect(() => setIsOpen(false), [location])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features', path: '/features' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Help', path: '/help' },
  ]

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(253,248,240,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <PahchaanLogo size={42} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span style={{ fontFamily: 'serif', fontWeight: 900, fontSize: 21, color: '#1a1410' }}>प</span>
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: 19, color: '#c9a84c' }}>ahchaan</span>
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 15, color: '#1a1410', marginLeft: 5 }}>AI</span>
            </div>
            <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 9.5, color: '#8a7560', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>Know Your Brand</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 4 }}>
          {links.map((link) => {
            const active = location.pathname === link.path
            return (
              <Link key={link.name} to={link.path} style={{
                padding: '8px 16px', borderRadius: 100, fontSize: 14, fontWeight: 500,
                textDecoration: 'none', transition: 'all 0.2s',
                color: active ? '#1a1410' : '#8a7560',
                background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
                border: active ? '1px solid rgba(201,168,76,0.35)' : '1px solid transparent',
              }}>
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTA — Login/Logout */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 10 }}>
          {user ? (
            <>
              <span style={{ fontSize: 13, color: '#8a7560', fontWeight: 600 }}>
                Hi, {user.name?.split(' ')[0]} ✦
              </span>
              <Link to="/get-started" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(201,168,76,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '11px 22px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #c9a84c, #a8823a)',
                    color: '#fdf8f0', fontWeight: 700, fontSize: 13,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    boxShadow: '0 4px 20px rgba(201,168,76,0.35)',
                  }}
                >
                  My Pahchaan
                </motion.button>
              </Link>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '10px 20px', borderRadius: 100, cursor: 'pointer',
                  border: '1.5px solid rgba(201,168,76,0.4)', background: 'transparent',
                  color: '#c9a84c', fontWeight: 700, fontSize: 13,
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '10px 22px', borderRadius: 100, cursor: 'pointer',
                    border: '1.5px solid rgba(201,168,76,0.4)', background: 'transparent',
                    color: '#c9a84c', fontWeight: 700, fontSize: 13,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(201,168,76,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '11px 26px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #c9a84c, #a8823a)',
                    color: '#fdf8f0', fontWeight: 700, fontSize: 14,
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    boxShadow: '0 4px 20px rgba(201,168,76,0.35)',
                    letterSpacing: '0.2px'
                  }}
                >
                  Make Your Own Pahchaan
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1410' }}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(253,248,240,0.98)', borderTop: '1px solid rgba(201,168,76,0.15)', padding: '16px 24px 24px' }}
          >
            {links.map(link => (
              <Link key={link.name} to={link.path} style={{
                display: 'block', padding: '12px 16px', borderRadius: 10, marginBottom: 4,
                textDecoration: 'none', fontWeight: 500, fontSize: 15,
                color: location.pathname === link.path ? '#c9a84c' : '#3d3028',
                background: location.pathname === link.path ? 'rgba(201,168,76,0.08)' : 'transparent',
              }}>{link.name}</Link>
            ))}

            {user ? (
              <>
                <p style={{ padding: '10px 16px', fontSize: 14, color: '#8a7560', fontWeight: 600 }}>
                  Hi, {user.name?.split(' ')[0]} ✦
                </p>
                <Link to="/get-started" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%', marginTop: 8, padding: '13px', borderRadius: 100,
                    background: 'linear-gradient(135deg, #c9a84c, #a8823a)',
                    color: '#fdf8f0', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer'
                  }}>My Pahchaan</button>
                </Link>
                <button onClick={handleLogout} style={{
                  width: '100%', marginTop: 8, padding: '13px', borderRadius: 100,
                  background: 'transparent', border: '1.5px solid rgba(201,168,76,0.4)',
                  color: '#c9a84c', fontWeight: 700, fontSize: 15, cursor: 'pointer'
                }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%', marginTop: 12, padding: '13px', borderRadius: 100,
                    background: 'transparent', border: '1.5px solid rgba(201,168,76,0.4)',
                    color: '#c9a84c', fontWeight: 700, fontSize: 15, cursor: 'pointer'
                  }}>Login</button>
                </Link>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%', marginTop: 8, padding: '13px', borderRadius: 100,
                    background: 'linear-gradient(135deg, #c9a84c, #a8823a)',
                    color: '#fdf8f0', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer'
                  }}>Make Your Own Pahchaan</button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar