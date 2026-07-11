const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

router.get('/', getSettings);
router.put('/', requireAdmin, updateSettings);

module.exports = router;
