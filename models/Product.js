const mongoose = require('mongoose');

// Create the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
    },
    details: {
        type: String,
    },
    category: {
        type: String,
    },
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('products', productSchema);
