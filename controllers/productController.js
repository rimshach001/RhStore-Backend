// controllers/productController.js

const Product = require('../models/product');

// Get all products

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Search for products
exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query; // Get the search query from the request
        const searchQuery = new RegExp(query, 'i'); // 'i' makes the search case-insensitive

        const products = await Product.find({
            $or: [
                { name: searchQuery },
                { category: searchQuery }
            ]
        });

        res.json({ success: true, products });
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
