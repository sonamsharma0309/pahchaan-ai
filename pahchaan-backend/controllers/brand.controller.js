const Brand = require('../models/Brand');
const { generateBrandKit } = require('../services/ai.service');
const { generateBrandPDF } = require('../services/pdf.service');
const { sendBrandKitEmail } = require('../services/email.service');

// @POST /api/brand/generate
const generateKit = async (req, res) => {
  try {
    const {
      businessName, industry, description,
      targetAudience, location, vibes,
      competitors, inspiration, email,
    } = req.body;

    if (!businessName || !description)
      return res.status(400).json({ success: false, message: 'Business name and description required' });

    // Save brand entry
    const brand = await Brand.create({
      user: req.user.id,
      businessName, industry, description,
      targetAudience, location, vibes,
      competitors, inspiration, email,
      status: 'pending',
    });

    // Generate with AI
    const generatedKit = await generateBrandKit({
      businessName, industry, description,
      targetAudience, location, vibes,
      competitors, inspiration,
    });

    // Update brand with generated kit
    brand.generatedKit = generatedKit;
    brand.status = 'generated';
    await brand.save();

    // Send email (non-blocking)
    if (email) sendBrandKitEmail(req.user.name, email).catch(console.error);

    res.json({
      success: true,
      message: 'Brand kit generated successfully',
      brand,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @GET /api/brand/my-kits
const getMyKits = async (req, res) => {
  try {
    const brands = await Brand.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, brands });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @GET /api/brand/:id
const getKitById = async (req, res) => {
  try {
    const brand = await Brand.findOne({ _id: req.params.id, user: req.user.id });
    if (!brand)
      return res.status(404).json({ success: false, message: 'Brand kit not found' });
    res.json({ success: true, brand });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @GET /api/brand/:id/download
const downloadPDF = async (req, res) => {
  try {
    const brand = await Brand.findOne({ _id: req.params.id, user: req.user.id });
    if (!brand || !brand.generatedKit)
      return res.status(404).json({ success: false, message: 'Brand kit not found' });

    const pdfBuffer = await generateBrandPDF(brand.generatedKit, brand.businessName);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=pahchaan-brandkit-${brand.businessName}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generateKit, getMyKits, getKitById, downloadPDF };