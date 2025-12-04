const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error('GET /api/products error:', err);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/:id/reviews', async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, rating, comment } = req.body;

        //basic validation
        if (!name || !rating || !comment) {
            return res.status(400).json({ message: 'name, rating and comment are required' });
        }
        const numericRating = Number(rating);
        if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ message: ' rating must be a number between 1 and 5' });
        }

        const product = await Product.findById(productId);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });

        const review = { name, rating: numericRating, comment };
        product.reviews.push(review);

        await product.save();

        res.status(201).json({ message: 'Review added', review: product.reviews[product.reviews.length - 1], reviews: product.reviews });

    } catch (error) {
        console.error(`POST /api/products/${productId}/reviews error:`, err);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.json(product)
    } catch (error) {
        console.error(`GET /api/products/${req.params.id} error:`, error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }

});



module.exports = router;