// server/data/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    name: 'Noir Velvet',
    shortDesc: 'Warm spicy oriental perfume',
    description: 'A rich blend of amber, cardamom and sandalwood — elegant and long-lasting.',
    price: 59.99,
    sizes: ['30ml', '50ml', '100ml'],
    mainImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
      'https://images.unsplash.com/photo-1550948390-1a19a0b4a0c5?w=1200&q=80',
      'https://images.unsplash.com/photo-1536305030012-3f2b7d6a2b7f?w=1200&q=80',
    ],
    reviews: [
      { name: 'Asha', rating: 5, comment: 'Beautiful scent, lasts all day' },
      { name: 'Rohit', rating: 4, comment: 'Loved it but a bit strong for daytime' },
    ],
  },
  {
    name: 'Azure Bloom',
    shortDesc: 'Fresh floral fragrance',
    description: 'A lively floral fragrance with jasmine, neroli and a citrus top note.',
    price: 49.99,
    sizes: ['30ml', '50ml'],
    mainImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
    ],
    reviews: [{ name: 'Priya', rating: 5, comment: 'Soft and feminine' }],
  },
  {
    name: 'Cedar Noir',
    shortDesc: 'Woody aromatic',
    description: 'A modern woody perfume combining cedar, vetiver and a hint of leather.',
    price: 69.99,
    sizes: ['50ml', '100ml'],
    mainImage: 'https://images.unsplash.com/photo-1541534401786-37d6d7b3d6c9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541534401786-37d6d7b3d6c9?w=1200&q=80',
      'https://images.unsplash.com/photo-1533743983669-94fa384b4b16?w=1200&q=80',
    ],
    reviews: [{ name: 'Arjun', rating: 4, comment: 'Lovely for evenings' }],
  },
  {
    name: 'Citrus Rush',
    shortDesc: 'Zesty unisex cologne',
    description: 'Bright citrus with neroli and a clean musk finish — perfect for daytime.',
    price: 39.99,
    sizes: ['30ml', '50ml'],
    mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80',
      'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80',
    ],
    reviews: [{ name: 'Neha', rating: 5, comment: 'Super fresh and clean' }],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB for seeding');

    // clear existing products (careful in prod!)
    await Product.deleteMany({});
    console.log('Cleared Product collection');

    // insert seed data
    await Product.insertMany(products);
    console.log('Seed data inserted');

    process.exit();
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
