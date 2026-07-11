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

module.exports = { getScholars, getScholarsByYear, getYears };
