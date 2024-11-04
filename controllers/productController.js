const Product = require('../models/Product');

const addProduct = async (req, res) => {
    try {
        const { name, price, discountedPrice, details, category, productId } = req.body;
        const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : '';

        const newProduct = new Product({
            name, price, discountedPrice, details, category, productId, imageUrl
        });

        await newProduct.save();
        res.status(201).send({ success: true, message: 'Product added successfully' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error adding product', error });
    }
};

// Additional product-related methods (update, delete, get products, search)
module.exports = { addProduct };
