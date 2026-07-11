require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const scholarsRouter = require('./src/routes/scholars');
const contactRouter = require('./src/routes/contact');
const authRouter = require('./src/routes/auth');
const uploadRouter = require('./src/routes/upload');
const settingsRouter = require('./src/routes/settings');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/scholars', scholarsRouter);
app.use('/api/contact', contactRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
