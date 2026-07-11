const express = require('express');
const { getScholars, getScholarsByYear, getYears } = require('../controllers/scholarsController');

const router = express.Router();

router.get('/', getScholars);
router.get('/years', getYears);
router.get('/year/:year', getScholarsByYear);

module.exports = router;
