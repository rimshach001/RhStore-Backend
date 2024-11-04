const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));
app.use('/uploads', express.static('uploads'));

app.use('/products', productRoutes);

// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// const express = require('express');
// require('./config/db');
// const User = require("./models/User");
// const Product = require("./models/Product");
// const multer = require('multer');
// const cors = require("cors");
// const app = express();

// app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:3000', // frontend URL
//     optionsSuccessStatus: 200
// }));
// app.use('/uploads', express.static('uploads'));


// app.post('/register', async (req, res) => {
//     let user = new User(req.body);
//     let result = await user.save()
//     result = result.toObject();
//     delete result.password;
//     res.send(result)
// });

// app.post('/login', async (req, res) => {
//     console.log("Request Body: ", req.body);

//     if (req.body.email && req.body.password) {
//         try {
//             let user = await User.findOne({ email: req.body.email, password: req.body.password }).select('-password');

//             if (user) {
//                 res.send(user);
//             } else {
//                 res.status(404).send({ result: 'User not found' });
//             }
//         } catch (error) {
//             console.error("Login error: ", error);
//             res.status(500).send({ result: 'Error during login' });
//         }
//     } else {
//         res.status(400).send({ result: 'Please provide email and password' });
//     }
// });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// app.post('/add-product', upload.single('image'), async (req, res) => {
//     try {
//         const { name, price, discountedPrice, details, category, productId } = req.body;
//         const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

//         const newProduct = new Product({
//             name,
//             price,
//             discountedPrice,
//             details,
//             category,
//             productId,
//             imageUrl,
//         });

//         await newProduct.save();
//         res.status(201).send({ success: true, message: 'Product added successfully' });
//     } catch (error) {
//         res.status(500).send({ success: false, message: 'Error adding product', error });
//     }
// });


// app.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find();
//         if (!products) {
//             return res.status(404).json({ message: 'No products found' });
//         }
//         res.status(200).json({ products });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }

// });

// app.put('/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedData = req.body;

//         const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
//             new: true,
//             runValidators: true
//         });

//         if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product updated successfully', updatedProduct });
//     } catch (error) {
//         console.error('Error updating product:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// app.delete('/products/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndDelete(id);

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json({ message: 'Product deleted successfully', product });
//     } catch (error) {
//         console.error('Error deleting product:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// app.get('/search', async (req, res) => {
//     try {
//         const { query } = req.query; // Get the search query from the request
//         const searchQuery = new RegExp(query, 'i'); // 'i' makes the search case-insensitive

//         const products = await Product.find({
//             $or: [
//                 { name: searchQuery },
//                 { category: searchQuery }
//             ]
//         });

//         res.json({ success: true, products });
//     } catch (error) {
//         console.error('Error searching products:', error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });


// app.listen(5000)