const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true }, // 1-5
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortDesc: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    sizes: [{ type: String }],
    images: [{ type: String }],
    mainImage: [{ type: String }],
    reviews: [reviewSchema],
    createAt: { type: Date, defaul: Date.now },
});


module.exports = mongoose.model('Product', productSchema);