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

const localPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Production Supabase connection
const prodPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const uploadAllImages = async () => {
  try {
    console.log('Fetching products from local database...');

    const products = await localPool.query(`
      SELECT p.id, p.name, p.sku, p.description, p.material, 
             p.in_stock, p.images, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
    `);

    console.log(`Found ${products.rows.length} products`);

    for (const product of products.rows) {
      console.log(`\nProcessing: ${product.sku}`);

      // Get category id from production db
      const catResult = await prodPool.query(
        'SELECT id FROM categories WHERE slug = $1',
        [product.category_slug]
      );

      if (catResult.rows.length === 0) {
        console.log(`  ⚠ Category not found for ${product.sku}`);
        continue;
      }

      const categoryId = catResult.rows[0].id;
      const cloudinaryUrls = [];

      // Upload each image to Cloudinary
      if (product.images && product.images.length > 0) {
        for (const imagePath of product.images) {
          const localPath = path.join(__dirname, imagePath);

          if (!fs.existsSync(localPath)) {
            console.log(`  ⚠ Image not found: ${localPath}`);
            continue;
          }

          try {
            const result = await cloudinary.uploader.upload(localPath, {
              folder: 'deltatrophies',
              public_id: product.sku,
              overwrite: true,
              transformation: [
                { width: 800, height: 800, crop: 'limit' },
                { quality: 'auto', fetch_format: 'auto' }
              ]
            });

            cloudinaryUrls.push(result.secure_url);
            console.log(`  ✓ Uploaded: ${result.secure_url}`);
          } catch (uploadErr) {
            console.log(`  ✗ Upload failed: ${uploadErr.message}`);
          }
        }
      }

      // Insert or update product in production database
      await prodPool.query(
        `INSERT INTO products (name, sku, description, material, category_id, in_stock, images)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (sku) DO UPDATE SET
           images = $7,
           name = $1,
           description = $3`,
        [
          product.name,
          product.sku,
          product.description,
          product.material,
          categoryId,
          product.in_stock,
          cloudinaryUrls
        ]
      );

      console.log(`  ✓ Saved to production DB: ${product.sku}`);
    }

    console.log('\n✅ All done! Products uploaded to Cloudinary and Supabase!');
    process.exit(0);

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

uploadAllImages();