const express = require('express');
const router = express.Router();
const { submitContact, subscribeNewsletter } = require('../controllers/marketing.controller');
const { generalLimiter } = require('../middleware/rateLimit');

router.post('/contact', generalLimiter, submitContact);
router.post('/newsletter', generalLimiter, subscribeNewsletter);

module.exports = router;