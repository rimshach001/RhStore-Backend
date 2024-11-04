// routes/productRoutes.js
const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');
const Product = require('../models/product');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

// Routes
router.post('/add-product', upload.single('image'), async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    try {
        const { name, price, discountedPrice, details, category, productId } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const newProduct = new Product({
            name,
            price,
            discountedPrice,
            details,
            category,
            productId,
            imageUrl,
        });

        await newProduct.save();
        res.status(201).send({ success: true, message: 'Product added successfully' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error adding product', error });
    }
});

router.get('/', productController.getAllProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/search', productController.searchProducts);

module.exports = router;
