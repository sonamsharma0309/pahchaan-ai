import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Help from './pages/Help'
import GetStarted from './pages/GetStarted'
import Checkout from './pages/Checkout'
import Documentation from './pages/Documentation'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './context/AuthContext'

// Protected route — login chahiye
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#fdf8f0' }}>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes — login required */}
          <Route path="/get-started" element={
            <ProtectedRoute><GetStarted /></ProtectedRoute>
          } />
          <Route path="/checkout/:plan" element={
            <ProtectedRoute><Checkout /></ProtectedRoute>
          } />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App