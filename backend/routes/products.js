const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all products
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id';
    let params = [];

    if (category) {
      query += ' WHERE c.slug = $1';
      params.push(category);
    }

    if (search) {
      query += params.length ? ' AND' : ' WHERE';
      query += ` p.name ILIKE $${params.length + 1}`;
      params.push(`%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    const result = await pool.query(query, params);
    res.json({ success: true, products: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// POST new product (admin only)
router.post('/', authMiddleware, upload.array('images', 10), async (req, res) => {
  try {
    const { name, sku, description, category_id, material } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);

    const result = await pool.query(
      'INSERT INTO products (name, sku, description, category_id, material, images) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, sku, description, category_id, material, images]
    );

    res.json({ success: true, product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update product (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, sku, description, category_id, material, in_stock } = req.body;

    const result = await pool.query(
      'UPDATE products SET name=$1, sku=$2, description=$3, category_id=$4, material=$5, in_stock=$6 WHERE id=$7 RETURNING *',
      [name, sku, description, category_id, material, in_stock, req.params.id]
    );

    res.json({ success: true, product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE product (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
module.exports = router;
