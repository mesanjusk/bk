const express = require('express');
const {
  getScholars,
  getScholarsByYear,
  getYears,
  getScholarById,
  createScholar,
  updateScholar,
  deleteScholar,
} = require('../controllers/scholarsController');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

router.get('/', getScholars);
router.get('/years', getYears);
router.get('/year/:year', getScholarsByYear);
router.get('/:id', getScholarById);

router.post('/', requireAdmin, createScholar);
router.put('/:id', requireAdmin, updateScholar);
router.delete('/:id', requireAdmin, deleteScholar);

module.exports = router;
