const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `Pahchaan AI <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Email failed: ${error.message}`);
    throw error;
  }
};

// Welcome email
const sendWelcomeEmail = (name, email) =>
  sendEmail({
    to: email,
    subject: 'Welcome to Pahchaan AI 🎉',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px">
        <h2 style="color:#c9a84c">Welcome, ${name}! 🙏</h2>
        <p>Your Pahchaan AI account is ready.</p>
        <p>Start building your brand identity today.</p>
        <a href="${process.env.FRONTEND_URL}/get-started"
           style="background:#c9a84c;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px">
          Get Started →
        </a>
        <p style="margin-top:32px;color:#999;font-size:12px">Pahchaan AI — Know Your Brand</p>
      </div>
    `,
  });

// Payment success email
const sendPaymentSuccessEmail = (name, email, plan) =>
  sendEmail({
    to: email,
    subject: `✅ Payment Confirmed — ${plan} Plan Activated`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px">
        <h2 style="color:#c9a84c">Payment Successful! 🎉</h2>
        <p>Hi ${name}, your <strong>${plan}</strong> plan is now active.</p>
        <a href="${process.env.FRONTEND_URL}/dashboard"
           style="background:#c9a84c;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px">
          Go to Dashboard →
        </a>
        <p style="margin-top:32px;color:#999;font-size:12px">Pahchaan AI — Know Your Brand</p>
      </div>
    `,
  });

// Brand kit ready email
const sendBrandKitEmail = (name, email) =>
  sendEmail({
    to: email,
    subject: '🎨 Your Brand Kit is Ready!',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px">
        <h2 style="color:#c9a84c">Your Brand Kit is Ready! 🚀</h2>
        <p>Hi ${name}, your AI-generated brand identity is ready to download.</p>
        <a href="${process.env.FRONTEND_URL}/dashboard"
           style="background:#c9a84c;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px">
          View Brand Kit →
        </a>
        <p style="margin-top:32px;color:#999;font-size:12px">Pahchaan AI — Know Your Brand</p>
      </div>
    `,
  });

module.exports = { sendEmail, sendWelcomeEmail, sendPaymentSuccessEmail, sendBrandKitEmail };