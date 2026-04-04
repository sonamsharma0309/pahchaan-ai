const express = require('express');
const router = express.Router();
const { trackEvent, getAdminStats } = require('../controllers/analytics.controller');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/auth');

router.post('/event', protect, trackEvent);
router.get('/admin', protect, adminOnly, getAdminStats);

module.exports = router;