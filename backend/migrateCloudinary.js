const cloudinary = require('cloudinary').v2;
const { Pool } = require('pg');
require('dotenv').config();

const oldCloud = process.env.CLOUDINARY_CLOUD_NAME_OLD;

const newConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME_NEW,
  api_key: process.env.CLOUDINARY_API_KEY_NEW,
  api_secret: process.env.CLOUDINARY_API_SECRET_NEW,
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const migrateUrl = async (oldUrl) => {
  if (!oldUrl || !oldUrl.includes(oldCloud)) return oldUrl;

  cloudinary.config(newConfig);

  const match = oldUrl.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return oldUrl;
  const publicIdWithExt = match[1];
  const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');

  try {
    const result = await cloudinary.uploader.upload(oldUrl, {
      public_id: publicId,
      overwrite: true,
      resource_type: oldUrl.includes('/video/') ? 'video' : 'image',
    });
    return result.secure_url;
  } catch (err) {
    console.log(`  ✗ Failed: ${oldUrl} — ${err.message}`);
    return oldUrl;
  }
};

const run = async () => {
  console.log('Migrating product images...\n');
  const products = await pool.query('SELECT id, sku, images FROM products');
  console.log(`Found ${products.rows.length} products\n`);

  for (const product of products.rows) {
    if (!product.images || product.images.length === 0) continue;

    const newImages = [];
    for (const img of product.images) {
      const newUrl = await migrateUrl(img);
      newImages.push(newUrl);
    }

    await pool.query('UPDATE products SET images = $1 WHERE id = $2', [newImages, product.id]);
    console.log(`  ✓ ${product.sku}`);
  }

  console.log('\n✅ All product images migrated!');
  process.exit(0);
};

run();