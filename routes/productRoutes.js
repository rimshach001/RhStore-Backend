const express = require('express');
const { addProduct } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware'); // Middleware for file uploads
const router = express.Router();

router.post('/add-product', upload.single('image'), addProduct);

// Additional routes for update, delete, get, search
module.exports = router;
