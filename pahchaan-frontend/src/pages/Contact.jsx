import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { submitContact } from '../api'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inputStyle = {
    width: '100%', padding: '14px 18px', borderRadius: 12,
    border: '1.5px solid rgba(201,168,76,0.2)', background: 'white',
    color: '#1a1410', fontSize: 15, outline: 'none',
    fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'border 0.2s',
    boxSizing: 'border-box',
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill all fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      await submitContact(form)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', padding: '120px 48px 80px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontFamily: 'Caveat, cursive', fontSize: 20, color: '#c9a84c', marginBottom: 12, fontWeight: 600 }}>— get in touch —</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 900, color: '#1a1410', letterSpacing: '-2px', marginBottom: 16 }}>
            We Are <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Listening</span>
          </h1>
          <p style={{ color: '#8a7560', fontSize: 17, lineHeight: 1.6 }}>Have a question or need assistance? We would love to hear from you.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ padding: '48px', borderRadius: 28, background: 'white', border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 8px 40px rgba(201,168,76,0.08)' }}>

          {/* Success */}
          {sent && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '32px', background: 'rgba(201,168,76,0.06)', borderRadius: 16, border: '1px solid rgba(201,168,76,0.2)', marginBottom: 28 }}>
              <CheckCircle size={40} color="#c9a84c" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 800, color: '#1a1410', marginBottom: 6 }}>Message Sent!</h3>
              <p style={{ color: '#8a7560', fontSize: 14 }}>We will get back to you within 24 hours.</p>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.2)', color: '#c0392b', fontSize: 13, marginBottom: 20 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[['Your Name', 'name', 'e.g. Arjun Sharma', 'text'], ['Email Address', 'email', 'arjun@example.com', 'email']].map(([label, key, ph, type]) => (
              <div key={key}>
                <label style={{ display: 'block', fontSize: 13, color: '#8a7560', marginBottom: 8, fontWeight: 600 }}>{label}</label>
                <input
                  type={type}
                  style={inputStyle}
                  placeholder={ph}
                  value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8a7560', marginBottom: 8, fontWeight: 600 }}>Your Message</label>
            <textarea
              rows={5}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              placeholder="Tell us how we can help..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
            />
          </div>

          <motion.button
            onClick={handleSubmit}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            style={{
              width: '100%', padding: '15px', borderRadius: 100, border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? 'rgba(201,168,76,0.4)' : 'linear-gradient(135deg, #c9a84c, #a8823a)',
              color: '#fdf8f0', fontWeight: 700, fontSize: 15,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(201,168,76,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Send size={16} />
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact