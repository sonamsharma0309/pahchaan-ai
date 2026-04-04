import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const inputStyle = {
    width: '100%', padding: '13px 18px', borderRadius: 12,
    border: '1.5px solid rgba(201,168,76,0.22)', background: 'rgba(253,248,240,0.7)',
    color: '#1a1410', fontSize: 14, outline: 'none',
    fontFamily: 'Plus Jakarta Sans, sans-serif', boxSizing: 'border-box',
  }

  const handleSubmit = async () => {
    if (!form.email || !form.password) return setError('All fields required')
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'serif', fontWeight: 900, fontSize: 20, color: '#1a1410' }}>प</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: 18, color: '#c9a84c' }}>ahchaan</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16, color: '#1a1410', marginLeft: 4 }}>AI</span>
          </Link>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, color: '#1a1410', marginTop: 20, marginBottom: 8 }}>Welcome Back</h2>
          <p style={{ color: '#8a7560', fontSize: 14 }}>Login to access your brand kits</p>
        </div>

        {/* Card */}
        <div style={{ padding: '40px', borderRadius: 28, background: 'white', border: '1px solid rgba(201,168,76,0.18)', boxShadow: '0 16px 60px rgba(201,168,76,0.10)' }}>

          {error && (
            <div style={{ background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, color: '#c0392b', fontSize: 13 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#5c4d3c', marginBottom: 7 }}>Email Address</label>
              <input
                type="email"
                style={inputStyle}
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#5c4d3c', marginBottom: 7 }}>Password</label>
              <input
                type="password"
                style={inputStyle}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', marginTop: 24, padding: '14px', borderRadius: 100, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #c9a84c, #a8823a)', color: '#fdf8f0', fontWeight: 700, fontSize: 15, fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: '0 4px 18px rgba(201,168,76,0.30)' }}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#8a7560' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#c9a84c', fontWeight: 700, textDecoration: 'none' }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}