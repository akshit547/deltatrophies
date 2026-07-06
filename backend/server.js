const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const inquiryRoutes = require('./routes/inquiries');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRoutes);

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP per 15 minutes
  message: { success: false, error: 'Too many requests, please try again later' }
});
// Apply to all routes
app.use(limiter);
// Stricter limit for lead form specifically
const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // only 5 lead submissions per hour per IP
  message: { success: false, error: 'Too many submissions' }
});
app.use('/api/inquiries/lead', leadLimiter);


app.get('/', (req, res) => {
  res.json({ message: 'Delta Trophies API Running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
