// server/data/updateImages.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const mapping = {
  'Noir Velvet': {
    mainImage: '/images/noir-velvet.jpg',
    images: ['/images/noir-velvet.jpg', '/images/noir-velvet-2.jpg']
  },
  'Azure Bloom': {
    mainImage: '/images/azure-bloom.jpg',
    images: ['/images/azure-bloom.jpg', '/images/azure-bloom-2.jpg']
  },
  'Cedar Noir': {
    mainImage: '/images/cedar-noir.jpg',
    images: ['/images/cedar-noir.jpg', '/images/cedar-noir-2.jpg']
  },
  'Citrus Rush': {
    mainImage: '/images/citrus-rush.jpg',
    images: ['/images/citrus-rush.jpg', '/images/citrus-rush-2.jpg']
  }
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');

    const products = await Product.find();
    for (const p of products) {
      const m = mapping[p.name];
      if (!m) {
        console.log(`No mapping for product: ${p.name} — skipping`);
        continue;
      }
      p.mainImage = m.mainImage;
      p.images = m.images;
      await p.save();
      console.log(`Updated images for: ${p.name}`);
    }

    console.log('Done');
    process.exit(0);
  } catch (err) {
    console.error('Error updating images:', err);
    process.exit(1);
  }
};

run();
