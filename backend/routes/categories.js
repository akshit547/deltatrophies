const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*,
        (
          SELECT p.images[1]
          FROM products p
          WHERE p.category_id = c.id AND array_length(p.images, 1) > 0
          ORDER BY p.id ASC
          LIMIT 1
        ) AS thumbnail
      FROM categories c
      ORDER BY c.display_order ASC, c.name ASC
    `);
    res.json({ success: true, categories: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
