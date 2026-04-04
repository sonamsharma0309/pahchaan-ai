# Pahchaan AI — Backend

## Setup

1. Install dependencies
   npm install

2. Copy env file
   cp .env.example .env
   Fill in your real values

3. Run dev server
   npm run dev

4. Seed database (optional)
   npm run seed

## API Routes

| Method | Route                        | Description         |
|--------|------------------------------|---------------------|
| POST   | /api/auth/register           | Register user       |
| POST   | /api/auth/login              | Login user          |
| GET    | /api/auth/me                 | Get current user    |
| POST   | /api/brand/generate          | Generate brand kit  |
| GET    | /api/brand/my-kits           | Get all brand kits  |
| GET    | /api/brand/:id/download      | Download PDF        |
| POST   | /api/payment/create-order    | Create Razorpay order|
| POST   | /api/payment/verify          | Verify payment      |
| POST   | /api/marketing/contact       | Submit contact form |
| POST   | /api/marketing/newsletter    | Subscribe newsletter|