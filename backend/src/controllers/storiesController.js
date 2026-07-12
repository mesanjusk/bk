const Story = require('../models/Story');

async function getStories(req, res, next) {
  try {
    const stories = await Story.find().sort({ createdAt: 1 });
    res.json(stories);
  } catch (error) {
    next(error);
  }
}

async function getStoryById(req, res, next) {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found.' });
    }
    res.json(story);
  } catch (error) {
    next(error);
  }
}

async function createStory(req, res, next) {
  try {
    const { name, state, photoUrl, before, after, narrative, extended } = req.body;

    if (!name || !before || !after || !narrative) {
      return res.status(400).json({ error: 'Name, before, after and narrative are required.' });
    }

    const story = await Story.create({ name, state, photoUrl, before, after, narrative, extended });
    res.status(201).json(story);
  } catch (error) {
    next(error);
  }
}

async function updateStory(req, res, next) {
  try {
    const { name, state, photoUrl, before, after, narrative, extended } = req.body;

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { name, state, photoUrl, before, after, narrative, extended },
      { new: true, runValidators: true }
    );

    if (!story) {
      return res.status(404).json({ error: 'Story not found.' });
    }

    res.json(story);
  } catch (error) {
    next(error);
  }
}

async function deleteStory(req, res, next) {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);

    if (!story) {
      return res.status(404).json({ error: 'Story not found.' });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { getStories, getStoryById, createStory, updateStory, deleteStory };
