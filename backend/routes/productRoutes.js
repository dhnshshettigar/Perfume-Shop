const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(400).json({ message: 'Product not found' });
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

})

module.exports = router;