const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    details: { type: String },
    category: { type: String },
    productId: { type: String, required: true, unique: true },
    imageUrl: { type: String },
}, { timestamps: true });

const Product = mongoose.models.products || mongoose.model('products', productSchema);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB', err);
});

module.exports = Product;
