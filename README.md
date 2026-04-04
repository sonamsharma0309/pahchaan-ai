# ✦ Pahchaan AI — Full Stack Deployment Guide

> AI-Powered Brand Identity Platform · Built by Code Pirates  
> Frontend: React + Vite → **Vercel**  
> Backend: Node.js + Express + MongoDB → **Render**

---

## 📁 Project Structure

```
pahchaan-ai-FINAL/
├── pahchaan-frontend/     → Deploy to Vercel
└── pahchaan-backend/      → Deploy to Render
```

---

## 🚀 STEP 1 — GitHub Setup

### 1.1 — GitHub par do alag repos banao

**Option A: Ek monorepo (recommended)**
```
GitHub → New Repository → Name: pahchaan-ai → Public/Private
```

**Option B: Do alag repos**
```
Repo 1: pahchaan-frontend
Repo 2: pahchaan-backend
```

### 1.2 — Code push karo

```bash
# Apne project folder mein jao
cd pahchaan-ai-FINAL

# Git initialize karo
git init
git add .
git commit -m "feat: initial pahchaan ai deployment"

# GitHub remote add karo (apna username dalo)
git remote add origin https://github.com/YOUR_USERNAME/pahchaan-ai.git
git branch -M main
git push -u origin main
```

---

## 🗄️ STEP 2 — MongoDB Atlas Setup (Database)

1. [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) par jao
2. **Free M0 cluster** create karo
3. **Database Access** → Add User → Username + Password yaad rakho
4. **Network Access** → Add IP → `0.0.0.0/0` (allow all — Render ke liye zaroori)
5. **Connect** → **Drivers** → Connection string copy karo:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/pahchaan-ai
   ```

---

## ⚙️ STEP 3 — Backend Deploy on Render

### 3.1 — Render Account
1. [render.com](https://render.com) → Sign up with GitHub

### 3.2 — New Web Service
1. **New** → **Web Service**
2. Connect your GitHub repo
3. Select `pahchaan-backend` folder (ya root agar separate repo hai)

### 3.3 — Build Settings
```
Name:          pahchaan-backend
Runtime:       Node
Build Command: npm install
Start Command: node server.js
```

### 3.4 — Environment Variables (Render Dashboard → Environment)

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your Atlas connection string |
| `JWT_SECRET` | Random 64-char string |
| `JWT_EXPIRES_IN` | `7d` |
| `GROQ_API_KEY` | Your Groq key (free at console.groq.com) |
| `RAZORPAY_KEY_ID` | `rzp_live_...` or `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Your Razorpay secret |
| `MAIL_HOST` | `smtp.gmail.com` |
| `MAIL_PORT` | `587` |
| `MAIL_USER` | Your Gmail |
| `MAIL_PASS` | Gmail App Password |
| `FRONTEND_URL` | `https://pahchaan.vercel.app` (fill after Vercel deploy) |
| `ADMIN_EMAIL` | `admin@pahchaan.ai` |
| `ADMIN_PASSWORD` | Strong password |

### 3.5 — Deploy
Click **Create Web Service** → Wait 2-3 minutes

✅ Backend URL milegi: `https://pahchaan-backend.onrender.com`

**Test karo:**
```
https://pahchaan-backend.onrender.com/
```
Response: `{"status":"ok","message":"Pahchaan AI Backend Running 🚀"}`

---

## 🌐 STEP 4 — Frontend Deploy on Vercel

### 4.1 — Vercel Account
1. [vercel.com](https://vercel.com) → Sign up with GitHub

### 4.2 — Import Project
1. **New Project** → Import your GitHub repo
2. Select `pahchaan-frontend` folder

### 4.3 — Build Settings
```
Framework Preset: Vite
Root Directory:   pahchaan-frontend
Build Command:    npm run build
Output Directory: dist
```

### 4.4 — Environment Variables (Vercel Dashboard → Settings → Environment Variables)

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://pahchaan-backend.onrender.com` |

### 4.5 — Deploy
Click **Deploy** → Wait 1-2 minutes

✅ Frontend URL: `https://pahchaan.vercel.app`

---

## 🔄 STEP 5 — Final Cross-Connection

### 5.1 — Backend mein Frontend URL update karo
Render Dashboard → pahchaan-backend → Environment:
```
FRONTEND_URL = https://pahchaan.vercel.app
```
→ Render auto-redeploy karega

### 5.2 — Razorpay mein callback URL add karo
Razorpay Dashboard → Settings → Webhooks:
```
Webhook URL: https://pahchaan-backend.onrender.com/api/payment/webhook
```

---

## ✅ Deployment Checklist

- [ ] GitHub repo created and code pushed
- [ ] MongoDB Atlas cluster created, IP whitelisted
- [ ] Render backend deployed and health check passing
- [ ] All env vars set on Render
- [ ] Vercel frontend deployed
- [ ] `VITE_API_URL` set on Vercel
- [ ] `FRONTEND_URL` updated on Render
- [ ] Test: Register → Login → Generate Brand Kit → Download PDF
- [ ] Test: Payment flow (test mode)

---

## 🔑 API Keys — Where to Get

| Service | Free? | Link |
|---------|-------|------|
| Groq AI (LLaMA) | ✅ Free | [console.groq.com](https://console.groq.com) |
| MongoDB Atlas | ✅ Free (512MB) | [mongodb.com/atlas](https://mongodb.com/atlas) |
| Render | ✅ Free tier | [render.com](https://render.com) |
| Vercel | ✅ Free | [vercel.com](https://vercel.com) |
| Razorpay | ✅ Test mode free | [razorpay.com](https://razorpay.com) |
| Gmail SMTP | ✅ Free | Gmail App Password |

---

## 🐛 Common Issues

### Backend crash on Render?
→ Check Logs tab on Render  
→ Most common: `MONGODB_URI` wrong ya IP not whitelisted

### Frontend CORS error?
→ `FRONTEND_URL` on Render must exactly match Vercel URL (no trailing slash)  
→ `VITE_API_URL` on Vercel must exactly match Render URL (no trailing slash)

### React Router 404 on refresh?
→ `vercel.json` already handles this ✅

### Render backend sleeping?
→ Free Render tier sleeps after 15 min inactivity  
→ First request takes ~30s to wake up  
→ Upgrade to Render $7/month or use UptimeRobot to ping every 10 min

### Groq API error?
→ Check `GROQ_API_KEY` is correct at console.groq.com  
→ Free tier: 6000 requests/day — enough to start

---

Built with ❤️ by Code Pirates · Pahchaan AI
