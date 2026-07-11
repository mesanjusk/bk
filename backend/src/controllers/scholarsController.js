const Scholar = require('../models/Scholar');

async function getScholars(req, res, next) {
  try {
    const { year } = req.query;
    const filter = year ? { year: Number(year) } : {};
    const scholars = await Scholar.find(filter).sort({ year: -1, name: 1 });
    res.json(scholars);
  } catch (error) {
    next(error);
  }
}

async function getScholarsByYear(req, res, next) {
  try {
    const year = Number(req.params.year);
    const scholars = await Scholar.find({ year }).sort({ name: 1 });
    res.json(scholars);
  } catch (error) {
    next(error);
  }
}

async function getYears(req, res, next) {
  try {
    const years = await Scholar.distinct('year');
    res.json(years.sort((a, b) => b - a));
  } catch (error) {
    next(error);
  }
}

async function getScholarById(req, res, next) {
  try {
    const scholar = await Scholar.findById(req.params.id);
    if (!scholar) {
      return res.status(404).json({ error: 'Scholar not found.' });
    }
    res.json(scholar);
  } catch (error) {
    next(error);
  }
}

async function createScholar(req, res, next) {
  try {
    const { name, year, description, photoUrl, state, score, bio, achievements } = req.body;

    if (!name || !year || !description) {
      return res.status(400).json({ error: 'Name, year and description are required.' });
    }

    const scholar = await Scholar.create({
      name,
      year,
      description,
      photoUrl,
      state,
      score,
      bio,
      achievements,
    });

    res.status(201).json(scholar);
  } catch (error) {
    next(error);
  }
}

async function updateScholar(req, res, next) {
  try {
    const { name, year, description, photoUrl, state, score, bio, achievements } = req.body;

    const scholar = await Scholar.findByIdAndUpdate(
      req.params.id,
      { name, year, description, photoUrl, state, score, bio, achievements },
      { new: true, runValidators: true }
    );

    if (!scholar) {
      return res.status(404).json({ error: 'Scholar not found.' });
    }

    res.json(scholar);
  } catch (error) {
    next(error);
  }
}

async function deleteScholar(req, res, next) {
  try {
    const scholar = await Scholar.findByIdAndDelete(req.params.id);

    if (!scholar) {
      return res.status(404).json({ error: 'Scholar not found.' });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getScholars,
  getScholarsByYear,
  getYears,
  getScholarById,
  createScholar,
  updateScholar,
  deleteScholar,
};
