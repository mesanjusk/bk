const SiteSettings = require('../models/SiteSettings');

async function getSettings(req, res, next) {
  try {
    const settings = await SiteSettings.getSingleton();
    res.json(settings);
  } catch (error) {
    next(error);
  }
}

async function updateSettings(req, res, next) {
  try {
    const { heroMediaType, heroMediaUrl } = req.body;
    const settings = await SiteSettings.getSingleton();

    if (heroMediaType !== undefined) settings.heroMediaType = heroMediaType;
    if (heroMediaUrl !== undefined) settings.heroMediaUrl = heroMediaUrl;

    await settings.save();
    res.json(settings);
  } catch (error) {
    next(error);
  }
}

module.exports = { getSettings, updateSettings };
