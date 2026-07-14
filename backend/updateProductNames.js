const pool = require('./config/db');
require('dotenv').config();

const categoryKeywords = {
  'Plastic Cups': {
    prefix: 'Plastic Cup Trophy',
    description: 'Premium plastic trophy cup ideal for sports events, school competitions, cricket tournaments, dance competitions and annual functions. Available in gold finish with customizable name and logo engraving. Perfect as sports trophy, winner trophy and achievement award.'
  },
  'Metal Cups': {
    prefix: 'Metal Cup Trophy',
    description: 'Premium metal trophy cup with gold plated finish. Ideal for corporate awards, sports championships, employee recognition awards, sales awards and dealer meet awards. Perfect as champion trophy, excellence award and achievement trophy.'
  },
  'Fiber Cups': {
    prefix: 'Fiber Cup Trophy',
    description: 'High quality fiber trophy cup with premium finish. Suitable for school trophy, sports trophy, annual function trophy, academic award and corporate recognition award. Lightweight yet durable with custom engraving option.'
  },
  'Iron Cups': {
    prefix: 'Iron Cup Trophy',
    description: 'Durable iron trophy cup with premium gold finish. Perfect for sports trophy, champion trophy, winner trophy, cricket trophy and football trophy. Available with custom name and logo engraving for corporate events and annual functions.'
  },
  'Wooden and Plastic Wooden Cups': {
    prefix: 'Wooden Trophy Cup',
    description: 'Premium wooden trophy cup combining wood and plastic elements. Ideal for corporate memento, appreciation award, long service award, business excellence award and graduation award. Features premium finish with custom engraving and logo printing options.'
  }
};

const updateProducts = async () => {
  try {
    // Get all products with their category names
    const result = await pool.query(`
      SELECT p.id, p.sku, p.name, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id
    `);

    console.log(`Found ${result.rows.length} products to update`);

    for (const product of result.rows) {
      const categoryConfig = categoryKeywords[product.category_name];

      if (!categoryConfig) {
        console.log(`Skipping ${product.sku} — unknown category: ${product.category_name}`);
        continue;
      }

      // New name format: "Plastic Cup Trophy | PC-117"
      const newName = `${categoryConfig.prefix} | ${product.sku}`;

      await pool.query(
        'UPDATE products SET name = $1, description = $2 WHERE id = $3',
        [newName, categoryConfig.description, product.id]
      );

      console.log(`✓ Updated: ${product.sku} → ${newName}`);
    }

    console.log('\n✅ All products updated with SEO names!');
    process.exit(0);

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

updateProducts();