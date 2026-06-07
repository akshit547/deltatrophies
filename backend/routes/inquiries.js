const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// POST new lead (popup form)
router.post('/lead', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await pool.query(
      'INSERT INTO leads (name, email, phone) VALUES ($1, $2, $3)',
      [name, email, phone]
    );
    res.json({ success: true, message: 'Lead saved successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, product_id, message } = req.body;
    await pool.query(
      'INSERT INTO inquiries (name, email, phone, product_id, message) VALUES ($1, $2, $3, $4, $5)',
      [name, email, phone, product_id, message]
    );
    res.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
const authMiddleware = require('../middleware/authMiddleware');

// GET all leads (admin only)
router.get('/leads', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json({ success: true, leads: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET all inquiries (admin only)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT i.*, p.name as product_name FROM inquiries i LEFT JOIN products p ON i.product_id = p.id ORDER BY i.created_at DESC'
    );
    res.json({ success: true, inquiries: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
module.exports = router;
