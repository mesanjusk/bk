const ContactMessage = require('../models/ContactMessage');

async function submitContactMessage(req, res, next) {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    const contactMessage = await ContactMessage.create({ name, email, message });
    res.status(201).json({ success: true, id: contactMessage._id });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitContactMessage };
