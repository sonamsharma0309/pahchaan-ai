const Lead = require('../models/Lead');
const { sendEmail } = require('../services/email.service');

// @POST /api/marketing/contact
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!email || !message)
      return res.status(400).json({ success: false, message: 'Email and message required' });

    await Lead.create({ name, email, message, source: 'contact' });

    // Notify admin
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${name || email}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`,
    }).catch(console.error);

    res.json({ success: true, message: 'Message received! We will get back to you soon.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @POST /api/marketing/newsletter
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ success: false, message: 'Email required' });

    const existing = await Lead.findOne({ email, source: 'newsletter' });
    if (existing)
      return res.json({ success: true, message: 'Already subscribed!' });

    await Lead.create({ email, source: 'newsletter' });
    res.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitContact, subscribeNewsletter };