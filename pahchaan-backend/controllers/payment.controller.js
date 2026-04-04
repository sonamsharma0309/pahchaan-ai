const Payment = require('../models/Payment');
const User = require('../models/User');
const { createRazorpayOrder, verifyRazorpaySignature } = require('../services/payment.service');
const { sendPaymentSuccessEmail } = require('../services/email.service');

// @POST /api/payment/create-order
const createOrder = async (req, res) => {
  try {
    const { plan } = req.body;
    if (!plan)
      return res.status(400).json({ success: false, message: 'Plan is required' });

    const order = await createRazorpayOrder(plan);

    // Save order in DB
    await Payment.create({
      user: req.user.id,
      razorpayOrderId: order.id,
      plan,
      amount: order.amount,
      currency: order.currency,
      status: 'created',
    });

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @POST /api/payment/verify
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid)
      return res.status(400).json({ success: false, message: 'Payment verification failed' });

    // Update payment record
    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'paid',
      }
    );

    // Upgrade user plan
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { plan },
      { new: true }
    );

    // Send confirmation email
    sendPaymentSuccessEmail(user.name, user.email, plan).catch(console.error);

    res.json({
      success: true,
      message: `Payment verified. ${plan} plan activated!`,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @GET /api/payment/history
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, verifyPayment, getPaymentHistory };