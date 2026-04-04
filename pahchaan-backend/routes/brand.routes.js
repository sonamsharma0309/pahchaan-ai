const express = require('express');
const router = express.Router();
const { generateKit, getMyKits, getKitById, downloadPDF } = require('../controllers/brand.controller');
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimit');

router.post('/generate', protect, aiLimiter, generateKit);
router.get('/my-kits', protect, getMyKits);
router.get('/:id', protect, getKitById);
router.get('/:id/download', protect, downloadPDF);

module.exports = router;