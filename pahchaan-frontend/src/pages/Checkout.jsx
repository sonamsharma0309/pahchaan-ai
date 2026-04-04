import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, Copy, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { submitContact } from '../api'

const planDetails = {
  starter: {
    name: 'Starter Plan',
    price: '₹999',
    amount: 999,
    period: '/month',
    upiId: 'sonamsh9000@upi',
    features: ['5 Brand Identities', 'Full Color System', 'Brand Voice Guide', 'Logo Concepts', 'Social Media Kit', 'Priority Support', 'Anti-Generic Score'],
  },
  pro: {
    name: 'Pro Plan',
    price: '₹999',
    amount: 999,
    period: '/month',
    upiId: 'sonamsh9000@upi',
    features: ['5 Brand Identities', 'Full Color System', 'Brand Voice Guide', 'Logo Concepts', 'Social Media Kit', 'Priority Support', 'Anti-Generic Score'],
  },
  growth: {
    name: 'Growth Plan',
    price: '₹2,499',
    amount: 2499,
    period: '/month',
    upiId: 'sonamsh9000@upi',
    features: ['15 Brand Identities', 'Full Color System', 'Brand Voice Guide', 'Logo Concepts', 'Social Media Kit', 'Priority Support'],
  },
  agency: {
    name: 'Agency Plan',
    price: '₹3,999',
    amount: 3999,
    period: '/month',
    upiId: 'sonamsh9000@upi',
    features: ['Unlimited Brands', 'White-label Export', 'Team Collaboration', 'API Access', 'Custom Templates', 'Dedicated Account Manager'],
  },
}

const inputStyle = {
  width: '100%', padding: '13px 18px', borderRadius: 12,
  border: '1.5px solid rgba(201,168,76,0.22)', background: 'rgba(253,248,240,0.7)',
  color: '#1a1410', fontSize: 14, outline: 'none',
  fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'border 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
}

export default function Checkout() {
  const { plan } = useParams()
  const { user } = useAuth()
  const details = planDetails[plan] || planDetails.pro

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    txnId: ''
  })
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const upiLink = `upi://pay?pa=${details.upiId}&pn=PahchaanAI&am=${details.amount}&cu=INR&tn=Pahchaan${details.name}`

  const copyUPI = () => {
    navigator.clipboard.writeText(details.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const canStep1 = form.name.trim() && form.email.trim() && form.phone.trim()
  const canStep2 = form.txnId.trim().length >= 6

  const handleConfirm = async () => {
    if (!canStep2) return
    setLoading(true)
    setError('')
    try {
      // Save payment info to backend via contact/lead
      await submitContact({
        name: form.name,
        email: form.email,
        message: `PAYMENT SUBMISSION\nPlan: ${details.name}\nAmount: ${details.price}\nPhone: ${form.phone}\nTransaction ID: ${form.txnId}\nUser ID: ${user?._id || 'Guest'}`,
      })
      setSubmitted(true)
    } catch (err) {
      setError('Submission failed. Please try again or contact support.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `radial-gradient(circle at 15% 25%, rgba(201,168,76,0.10) 0%, transparent 45%),
          radial-gradient(circle at 85% 75%, rgba(212,132,122,0.08) 0%, transparent 45%)` }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 560 }}>

        <Link to="/services" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, color: '#8a7560', fontSize: 13, fontWeight: 600, marginBottom: 28, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          <ArrowLeft size={14} /> Back to Plans
        </Link>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="done"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              style={{ padding: '56px 48px', borderRadius: 28, background: 'white', border: '1px solid rgba(201,168,76,0.18)', boxShadow: '0 16px 60px rgba(201,168,76,0.10)', textAlign: 'center' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                <CheckCircle size={32} color="#1a1410" />
              </motion.div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, color: '#1a1410', marginBottom: 12 }}>
                Payment <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Submitted</span>
              </h2>
              <p style={{ color: '#8a7560', fontSize: 14, lineHeight: 1.7, maxWidth: 360, margin: '0 auto 32px' }}>
                Thank you! We have received your payment details. Your <strong>{details.name}</strong> will be activated within 24 hours. A confirmation will be sent to <strong>{form.email}</strong>.
              </p>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ padding: '13px 32px', borderRadius: 100, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #c9a84c, #a8823a)', color: '#fdf8f0', fontWeight: 700, fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  Back to Home
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ borderRadius: 28, background: 'white', border: '1px solid rgba(201,168,76,0.18)', boxShadow: '0 16px 60px rgba(201,168,76,0.10)', overflow: 'hidden' }}>

              {/* Plan Header */}
              <div style={{ background: '#1a1410', padding: '28px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 11, color: 'rgba(253,248,240,0.4)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Selected Plan</p>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 800, color: '#fdf8f0' }}>{details.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 900, color: '#c9a84c', lineHeight: 1 }}>{details.price}</p>
                  <p style={{ fontSize: 12, color: 'rgba(253,248,240,0.35)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{details.period}</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
                {['Your Details', 'Payment', 'Confirm'].map((s, i) => (
                  <div key={i} style={{ flex: 1, padding: '14px', textAlign: 'center', fontSize: 12, fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif',
                    color: step === i + 1 ? '#c9a84c' : step > i + 1 ? '#7a9e7e' : '#c9b89a',
                    borderBottom: step === i + 1 ? '2px solid #c9a84c' : '2px solid transparent',
                    background: step === i + 1 ? 'rgba(201,168,76,0.04)' : 'transparent',
                    transition: 'all 0.2s' }}>
                    {step > i + 1 ? '✓ ' : `${i+1}. `}{s}
                  </div>
                ))}
              </div>

              <div style={{ padding: '36px' }}>

                {/* Error */}
                {error && (
                  <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(220,50,50,0.08)', border: '1px solid rgba(220,50,50,0.2)', color: '#c0392b', fontSize: 13, marginBottom: 20 }}>
                    {error}
                  </div>
                )}

                <AnimatePresence mode="wait">

                  {/* Step 1 */}
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: '#1a1410', marginBottom: 6 }}>Your Details</h3>
                      <p style={{ color: '#8a7560', fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>We need a few details to set up your account and send your confirmation.</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[['Full Name', 'name', 'e.g. Arjun Sharma', 'text'], ['Email Address', 'email', 'arjun@example.com', 'email'], ['Phone Number', 'phone', '+91 98765 43210', 'tel']].map(([label, key, ph, type]) => (
                          <div key={key}>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#5c4d3c', marginBottom: 7, letterSpacing: '0.3px' }}>{label}</label>
                            <input type={type} style={inputStyle} placeholder={ph} value={form[key]}
                              onChange={e => setForm({ ...form, [key]: e.target.value })}
                              onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.08)' }}
                              onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.22)'; e.target.style.boxShadow = 'none' }} />
                          </div>
                        ))}
                      </div>
                      <motion.button onClick={() => setStep(2)} disabled={!canStep1}
                        whileHover={canStep1 ? { scale: 1.03 } : {}} whileTap={canStep1 ? { scale: 0.97 } : {}}
                        style={{ marginTop: 28, width: '100%', padding: '14px', borderRadius: 100, border: 'none', cursor: canStep1 ? 'pointer' : 'not-allowed', background: canStep1 ? 'linear-gradient(135deg, #c9a84c, #a8823a)' : 'rgba(201,168,76,0.18)', color: canStep1 ? '#fdf8f0' : '#c9a84c', fontWeight: 700, fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.25s' }}>
                        Proceed to Payment →
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: '#1a1410', marginBottom: 6 }}>Complete Payment</h3>
                      <p style={{ color: '#8a7560', fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>Pay using any UPI app — GPay, PhonePe, Paytm, or any BHIM UPI app.</p>

                      <div style={{ padding: '18px 24px', borderRadius: 16, background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: 11, color: '#8a7560', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Amount to Pay</p>
                          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, color: '#1a1410' }}>{details.price}<span style={{ fontSize: 13, color: '#8a7560', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400 }}>{details.period}</span></p>
                        </div>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#1a1410', fontSize: 16 }}>₹</div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#5c4d3c', marginBottom: 8, letterSpacing: '0.3px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>UPI ID</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 18px', borderRadius: 12, border: '1.5px solid rgba(201,168,76,0.25)', background: 'rgba(253,248,240,0.7)' }}>
                          <span style={{ flex: 1, fontFamily: 'monospace', fontSize: 15, color: '#1a1410', fontWeight: 600 }}>{details.upiId}</span>
                          <motion.button onClick={copyUPI} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#7a9e7e' : '#c9a84c', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                          </motion.button>
                        </div>
                      </div>

                      <div style={{ padding: '16px 20px', borderRadius: 14, background: '#f9f4eb', border: '1px solid rgba(201,168,76,0.12)', marginBottom: 24 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#5c4d3c', marginBottom: 10, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '0.3px' }}>HOW TO PAY</p>
                        {['Open GPay, PhonePe, Paytm, or any UPI app', `Send ${details.price} to the UPI ID above`, 'Copy the Transaction ID / UTR Number', 'Paste it below and confirm'].map((s, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < 3 ? 8 : 0 }}>
                            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#1a1410', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                            <span style={{ fontSize: 13, color: '#5c4d3c', lineHeight: 1.5, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{s}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 12 }}>
                        <motion.button onClick={() => setStep(1)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          style={{ padding: '13px 20px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.3)', background: 'transparent', color: '#5c4d3c', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                          ← Back
                        </motion.button>
                        <motion.button onClick={() => setStep(3)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                          style={{ flex: 1, padding: '13px', borderRadius: 100, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #c9a84c, #a8823a)', color: '#fdf8f0', fontWeight: 700, fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                          I've Paid — Enter Transaction ID →
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 800, color: '#1a1410', marginBottom: 6 }}>Confirm Your Payment</h3>
                      <p style={{ color: '#8a7560', fontSize: 13, marginBottom: 28, lineHeight: 1.6 }}>Enter the Transaction ID or UTR number from your UPI app to complete verification.</p>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#5c4d3c', marginBottom: 7, letterSpacing: '0.3px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Transaction ID / UTR Number</label>
                        <input type="text" style={inputStyle} placeholder="e.g. 123456789012" value={form.txnId}
                          onChange={e => setForm({ ...form, txnId: e.target.value })}
                          onFocus={e => { e.target.style.borderColor = 'rgba(201,168,76,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.08)' }}
                          onBlur={e => { e.target.style.borderColor = 'rgba(201,168,76,0.22)'; e.target.style.boxShadow = 'none' }} />
                        <p style={{ fontSize: 11, color: '#a09080', marginTop: 6, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>You can find this in your UPI app under payment history.</p>
                      </div>

                      <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 14, background: '#f9f4eb', border: '1px solid rgba(201,168,76,0.12)' }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: '#8a7560', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Order Summary</p>
                        {[['Plan', details.name], ['Amount', `${details.price}${details.period}`], ['Name', form.name], ['Email', form.email], ['Phone', form.phone]].map(([k, v]) => (
                          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{ fontSize: 13, color: '#8a7560', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{k}</span>
                            <span style={{ fontSize: 13, color: '#1a1410', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{v}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                        <motion.button onClick={() => setStep(2)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          style={{ padding: '13px 20px', borderRadius: 100, border: '1.5px solid rgba(201,168,76,0.3)', background: 'transparent', color: '#5c4d3c', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                          ← Back
                        </motion.button>
                        <motion.button
                          onClick={handleConfirm}
                          disabled={!canStep2 || loading}
                          whileHover={canStep2 ? { scale: 1.03, boxShadow: '0 8px 24px rgba(201,168,76,0.35)' } : {}}
                          whileTap={canStep2 ? { scale: 0.97 } : {}}
                          style={{ flex: 1, padding: '13px', borderRadius: 100, border: 'none', cursor: canStep2 && !loading ? 'pointer' : 'not-allowed', background: canStep2 ? 'linear-gradient(135deg, #c9a84c, #a8823a)' : 'rgba(201,168,76,0.18)', color: canStep2 ? '#fdf8f0' : '#c9a84c', fontWeight: 700, fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif', transition: 'all 0.25s' }}>
                          {loading ? 'Submitting...' : 'Confirm & Activate Plan'}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}