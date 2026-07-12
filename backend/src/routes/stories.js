const express = require('express');
const {
  getStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
} = require('../controllers/storiesController');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

router.get('/', getStories);
router.get('/:id', requireAdmin, getStoryById);

router.post('/', requireAdmin, createStory);
router.put('/:id', requireAdmin, updateStory);
router.delete('/:id', requireAdmin, deleteStory);

module.exports = router;
