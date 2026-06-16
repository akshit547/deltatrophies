const pool = require('./config/db');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const categories = [
  { name: 'plastic-cups', dbName: 'Plastic Cups' },
  { name: 'metal-cups', dbName: 'Metal Cups' },
  { name: 'iron-cups', dbName: 'Iron Cups' },
  { name: 'fiber-cups', dbName: 'Fiber Cups' },
  { name: 'wooden-plastic-cups', dbName: 'Wooden and Plastic Wooden Cups' },
  { name: 'attachments', dbName: 'Wooden and Plastic Wooden Cups' },
];

const uploadAll = async () => {
  try {
    for (const category of categories) {
      // Get category ID from database
      const catResult = await pool.query(
        'SELECT id FROM categories WHERE name = $1',
        [category.dbName]
      );

      if (catResult.rows.length === 0) {
        console.log(`Category not found: ${category.dbName}`);
        continue;
      }

      const categoryId = catResult.rows[0].id;
      const folderPath = path.join(__dirname, 'uploads/delta-catalogue', category.name);

      // Check if folder exists
      if (!fs.existsSync(folderPath)) {
        console.log(`Folder not found: ${folderPath}`);
        continue;
      }

      // Get all image files
      const files = fs.readdirSync(folderPath).filter(file =>
        ['.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file).toLowerCase())
      );

      console.log(`Found ${files.length} images in ${category.dbName}`);

      for (const file of files) {
        const sku = path.basename(file, path.extname(file));
        const imagePath = `/uploads/delta-catalogue/${category.name}/${file}`;

        // Check if product already exists
        const existing = await pool.query(
          'SELECT id FROM products WHERE sku = $1',
          [sku]
        );

        if (existing.rows.length > 0) {
          console.log(`Skipping ${sku} — already exists`);
          continue;
        }

        // Insert product
        await pool.query(
          'INSERT INTO products (name, sku, category_id, images) VALUES ($1, $2, $3, $4)',
          [sku, sku, categoryId, [imagePath]]
        );

        console.log(`✓ Added: ${sku}`);
      }
    }

    console.log('\n✅ Bulk upload complete!');
    process.exit(0);

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

uploadAll();