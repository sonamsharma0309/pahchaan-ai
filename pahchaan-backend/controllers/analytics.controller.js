const Analytics = require('../models/Analytics');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Payment = require('../models/Payment');

// @POST /api/analytics/event
const trackEvent = async (req, res) => {
  try {
    const { event, meta } = req.body;
    await Analytics.create({
      event,
      user: req.user?.id,
      meta,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @GET /api/analytics/admin (admin only)
const getAdminStats = async (req, res) => {
  try {
    const [totalUsers, totalBrands, totalRevenue, recentUsers] = await Promise.all([
      User.countDocuments(),
      Brand.countDocuments({ status: 'generated' }),
      Payment.aggregate([
        { $match: { status: 'paid' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      User.find().sort({ createdAt: -1 }).limit(5).select('name email plan createdAt'),
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalBrands,
        totalRevenue: revenueResult[0]?.total || 0,
        recentUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { trackEvent, getAdminStats };