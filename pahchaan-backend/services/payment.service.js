const razorpay = require('../config/razorpay');
const crypto = require('crypto');

// Plan prices in paise (INR)
const PLAN_PRICES = {
  starter: 99900,   // ₹999
  growth: 249900,   // ₹2499
  pro: 499900,      // ₹4999
};

// Create Razorpay order
const createRazorpayOrder = async (plan) => {
  const amount = PLAN_PRICES[plan];
  if (!amount) throw new Error('Invalid plan selected');

  const order = await razorpay.orders.create({
    amount,
    currency: 'INR',
    receipt: `pahchaan_${plan}_${Date.now()}`,
    notes: { plan },
  });

  return order;
};

// Verify Razorpay signature
const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
};

module.exports = { createRazorpayOrder, verifyRazorpaySignature, PLAN_PRICES };