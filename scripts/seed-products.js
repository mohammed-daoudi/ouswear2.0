// Run this script to seed the database with sample products
// Usage: node scripts/seed-products.js

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Define the product schema (simplified for seeding)
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  images: [{ type: String, required: true }],
  models: [{ type: String }], // GLB/GLTF file URLs
  variants: [{
    name: String,
    value: String,
    price: Number,
    stock: Number,
    modelUrl: String,
  }],
  stock: { type: Number, required: true, default: 0 },
  tags: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    title: 'Crimson Aura Cap',
    slug: 'crimson-aura-cap',
    description: 'Premium streetwear cap with signature crimson gradient design. Features premium cotton construction and adjustable strap for perfect fit.',
    price: 49.99,
    currency: 'USD',
    images: [
      'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      'https://images.pexels.com/photos/1154861/pexels-photo-1154861.jpeg',
    ],
    models: ['/models/crimson-cap.glb'], // Placeholder 3D model
    variants: [
      { name: 'Color', value: 'Crimson Red', price: 49.99, stock: 15, modelUrl: '/models/crimson-cap.glb' },
      { name: 'Color', value: 'Deep Black', price: 49.99, stock: 20, modelUrl: '/models/black-cap.glb' },
      { name: 'Color', value: 'Midnight Blue', price: 52.99, stock: 8, modelUrl: '/models/blue-cap.glb' },
    ],
    stock: 43,
    tags: ['premium', 'streetwear', 'caps', 'signature'],
  },
  {
    title: 'Shadow Burst Snapback',
    slug: 'shadow-burst-snapback',
    description: 'Edgy snapback featuring our exclusive shadow burst design. Perfect for night adventures and urban exploration.',
    price: 45.99,
    currency: 'USD',
    images: [
      'https://images.pexels.com/photos/1194030/pexels-photo-1194030.jpeg',
      'https://images.pexels.com/photos/839836/pexels-photo-839836.jpeg',
    ],
    models: ['/models/shadow-snapback.glb'],
    variants: [
      { name: 'Size', value: 'One Size', price: 45.99, stock: 25 },
    ],
    stock: 25,
    tags: ['snapback', 'urban', 'limited', 'dark'],
  },
  {
    title: 'Neon Dreams Beanie',
    slug: 'neon-dreams-beanie',
    description: 'Cozy beanie with neon-inspired embroidered details. Perfect for those chilly nights with attitude.',
    price: 32.99,
    currency: 'USD',
    images: [
      'https://images.pexels.com/photos/2112651/pexels-photo-2112651.jpeg',
    ],
    models: ['/models/neon-beanie.glb'],
    variants: [
      { name: 'Color', value: 'Neon Pink', price: 32.99, stock: 12 },
      { name: 'Color', value: 'Electric Blue', price: 32.99, stock: 8 },
      { name: 'Color', value: 'Cyber Green', price: 35.99, stock: 6 },
    ],
    stock: 26,
    tags: ['beanie', 'neon', 'winter', 'cyber'],
  },
  {
    title: 'Blood Moon Trucker',
    slug: 'blood-moon-trucker',
    description: 'Classic trucker hat with our blood moon graphic. Mesh back for breathability, attitude for days.',
    price: 38.99,
    currency: 'USD',
    images: [
      'https://images.pexels.com/photos/1194030/pexels-photo-1194030.jpeg',
    ],
    models: ['/models/trucker-hat.glb'],
    variants: [
      { name: 'Style', value: 'Classic Mesh', price: 38.99, stock: 18 },
      { name: 'Style', value: 'Premium Canvas', price: 42.99, stock: 12 },
    ],
    stock: 30,
    tags: ['trucker', 'mesh', 'classic', 'gothic'],
  },
  {
    title: 'Void Runner Cap',
    slug: 'void-runner-cap',
    description: 'Minimalist design meets maximum impact. The void runner cap for those who move through shadows.',
    price: 55.99,
    currency: 'USD',
    images: [
      'https://images.pexels.com/photos/1154861/pexels-photo-1154861.jpeg',
    ],
    models: ['/models/void-cap.glb'],
    variants: [
      { name: 'Material', value: 'Premium Cotton', price: 55.99, stock: 10 },
      { name: 'Material', value: 'Tech Fabric', price: 62.99, stock: 5 },
    ],
    stock: 15,
    tags: ['premium', 'minimal', 'tech', 'limited'],
  },
  {
    title: 'Chaos Theory Bucket Hat',
    slug: 'chaos-theory-bucket-hat',
    description: 'Embrace the chaos with this avant-garde bucket hat. Features abstract patterns and premium construction.',
    price: 41.99,
    currency: 'USD',
    images: [
      'https://images.pexels.com/photos/2112651/pexels-photo-2112651.jpeg',
    ],
    models: ['/models/bucket-hat.glb'],
    variants: [
      { name: 'Pattern', value: 'Abstract Chaos', price: 41.99, stock: 14 },
      { name: 'Pattern', value: 'Geometric Storm', price: 44.99, stock: 9 },
    ],
    stock: 23,
    tags: ['bucket', 'abstract', 'artistic', 'unique'],
  },
];

async function seedProducts() {
  try {
    console.log('🌱 Starting product seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products (optional - remove in production)
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${insertedProducts.length} products`);

    // Display seeded products
    insertedProducts.forEach(product => {
      console.log(`  - ${product.title} (${product.slug}) - $${product.price}`);
    });

    console.log('🎉 Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    // Close connection
    await mongoose.disconnect();
    console.log('📦 Database connection closed');
    process.exit(0);
  }
}

// Run the seeding function
seedProducts();