import axios from 'axios'

// In development: Vite proxy handles /api → localhost:5000
// In production (Vercel): VITE_API_URL must be set to your Render backend URL
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const API = axios.create({
  baseURL: BASE_URL,
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
    }
    return Promise.reject(err)
  }
)

// Auth
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const getMe = () => API.get('/auth/me')

// Brand
export const generateBrandKit = (data) => API.post('/brand/generate', data)
export const getMyKits = () => API.get('/brand/my-kits')
export const downloadPDF = (id) => API.get(`/brand/${id}/download`, { responseType: 'blob' })

// Payment
export const createOrder = (plan) => API.post('/payment/create-order', { plan })
export const verifyPayment = (data) => API.post('/payment/verify', data)

// Marketing
export const submitContact = (data) => API.post('/marketing/contact', data)
export const subscribeNewsletter = (email) => API.post('/marketing/newsletter', { email })

export default API
