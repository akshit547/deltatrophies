const cloudinary = require('cloudinary').v2;
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prodPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const categories = [
  { folder: 'acrylic-trophies', dbSlug: 'acrylic-trophies' },
  { folder: 'ca-awards', dbSlug: 'ca-awards' },
  { folder: 'la-aca-ra-awards', dbSlug: 'la-aca-ra-awards' },
  { folder: 'mp-trophies', dbSlug: 'mp-trophies' },
  { folder: 'pf-trophies', dbSlug: 'pf-trophies' },
  { folder: 'wall-awards', dbSlug: 'wall-awards' },
  { folder: 'base-and-accessories', dbSlug: 'base-and-accessories' },
  { folder: 'wooden-cups-new', dbSlug: 'wooden-plastic-cups' },
  { folder: 'iron-cups-new', dbSlug: 'iron-cups' },
  { folder: 'metal-cups-new', dbSlug: 'metal-cups' },
  { folder: 'fiber-cups-new', dbSlug: 'fiber-cups' },
  { folder: 'plastic-cups-new', dbSlug: 'plastic-cups' },
  { folder: 'frames', dbSlug: 'frames' },
];

const uploadAll = async () => {
  try {
    for (const category of categories) {
      console.log(`\nProcessing: ${category.folder}`);

      const catResult = await prodPool.query(
        'SELECT id FROM categories WHERE slug = $1',
        [category.dbSlug]
      );

      if (catResult.rows.length === 0) {
        console.log(`⚠ Category not found: ${category.dbSlug}`);
        continue;
      }

      const categoryId = catResult.rows[0].id;
      const folderPath = path.join(__dirname, 'uploads/delta-catalogue', category.folder);

      if (!fs.existsSync(folderPath)) {
        console.log(`⚠ Folder not found: ${folderPath}`);
        continue;
      }

      const files = fs.readdirSync(folderPath).filter(file =>
        ['.jpg', '.jpeg', '.png', '.webp'].includes(
          path.extname(file).toLowerCase()
        )
      );

      console.log(`Found ${files.length} images`);

      for (const file of files) {
        const sku = path.basename(file, path.extname(file));
        const filePath = path.join(folderPath, file);

        // Check if already exists
        const existing = await prodPool.query(
          'SELECT id FROM products WHERE sku = $1',
          [sku]
        );

        if (existing.rows.length > 0) {
          console.log(`  Skipping ${sku} — already exists`);
          continue;
        }

        // Upload to Cloudinary
        try {
          const result = await cloudinary.uploader.upload(filePath, {
            folder: `deltatrophies/products/${category.folder}`,
            public_id: sku,
            overwrite: true,
            transformation: [
              { width: 800, height: 800, crop: 'limit' },
              { quality: 'auto', fetch_format: 'auto' }
            ]
          });

          // Insert into Supabase
          const productName = `${category.dbSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | ${sku}`;

          await prodPool.query(
            `INSERT INTO products (name, sku, category_id, images, in_stock)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (sku) DO NOTHING`,
            [productName, sku, categoryId, [result.secure_url], true]
          );

          console.log(`  ✓ ${sku}`);
        } catch (err) {
          console.log(`  ✗ ${sku}: ${err.message}`);
        }
      }
    }

    console.log('\n✅ All done!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

uploadAll();