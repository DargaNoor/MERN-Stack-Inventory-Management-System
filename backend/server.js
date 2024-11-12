// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const router = express.Router(); // Define the router
const userRoutes = require('./routes/userroutes');
const productRoutes = require('./routes/productroutes');
const { v4: uuidv4 } = require('uuid');

const { MongoClient } = require("mongodb")
const { productSchema } = require("./models/Product");
const { userSchema } = require("./models/User");
dotenv.config();
const bodyParser = require('body-parser');
// Serve static files from the 'uploads' folder

const app = express();
app.use(express.json());
app.use(cors())
app.options("*", cors())
app.use(bodyParser.json());


// Route to fetch specific fields from the database
app.get('/api/products', async (req, res) => {
        try {
                // Fetch only specific fields from the database
                const products = await Product.find({}, 'name category unitPrice discount totalValue status inStock');
                console.log("No of products in stock: ", products[0].inStock)
                res.json(products);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});
const Product = mongoose.model('Product', productSchema);

// Endpoint to get product counts by expiry status
app.get('/api/products/count', async (req, res) => {
        try {
                const currentDate = new Date();
                const activeCount = await Product.countDocuments({ action: 'Active' });
                const inactiveCount = await Product.countDocuments({ action: 'Inactive' });
                console.log("Active " + activeCount);
                console.log("InActive " + inactiveCount);
                res.json({
                        active: activeCount,
                        inactive: inactiveCount,
                });
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});



// Endpoint to get products with low stock
app.get('/api/products/low-stock', async (req, res) => {
        try {
                const lowStockProducts = await Product.find({ stock: { $lt: 5 } }); // Finds products with stock less than 5
                res.json(lowStockProducts);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Endpoint to get products that are expired or close to expiring
app.get('/api/products/expiry', async (req, res) => {
        try {
                const today = new Date();
                const expiryProducts = await Product.find({ expiryDate: { $lte: today } }); // Find products with expiryDate <= today
                res.json(expiryProducts);
        } catch (error) {
                res.status(500).json({ error: error.message });
        }
});



// Route to handle adding a new product
app.post('/api/inventory', async (req, res) => {
        try {
                const { name, category, inStock, unitPrice, discount, orderType, decription } = req.body;

                // Create a new product document
                const newProduct = new Product({
                        name,
                        category,
                        inStock,
                        unitPrice,
                        discount,
                        orderType,
                        decription
                });

                // Save to the database
                await newProduct.save();
                //   console.log("heeyyyy aagayaa tu")
                res.status(201).json({ message: 'Product added successfully' });
        } catch (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to add product' });
        }
});



// Configure storage
const storage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, 'uploads/'); // Folder to store uploaded images
        },
        filename: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the file name
        },
});

const upload = multer({ storage });

app.post('/api/new_inventory', upload.single('image'), async (req, res) => {
        try {
                const { name, category, inStock, unitPrice, discount, orderType, description } = req.body;
                const product_id = uuidv4();
                console.log("Description: ", description)
                console.log("Product ID", product_id)
                // Get the image path from multer's file info
                const imagePath = req.file ? path.basename(req.file.path) : null;
                console.log("IMage path :", imagePath)
                // Validate if all required fields are present
                if (!name || !category || !inStock || !unitPrice || !discount || !orderType) {
                        return res.status(400).json({ message: 'All fields are required.' });
                }

                const newInventoryItem = new Product({
                        product_id, // assign the unique ID
                        name,
                        category,
                        inStock,
                        unitPrice,
                        discount,
                        orderType,
                        description,
                        imagePath,
                });

                const savedItem = await newInventoryItem.save();
                res.status(201).json(savedItem);
        } catch (error) {
                console.error('Error saving product:', error);
                res.status(500).json({ error: 'Failed to save product.' });
        }
});



// Serve static images
app.use('/uploads', express.static('uploads'));

// Route to find product by name and inStock status
app.get('/products/:name/:inStock', async (req, res) => {
        const { name, inStock } = req.params;
        console.log(name)
        try {
                const inventoryItem = await Product.findOne({ name, inStock: parseInt(inStock) });
                if (!inventoryItem) {
                        return res.status(404).json({ message: 'Inventory item not found' });
                }
                res.json(inventoryItem);
        } catch (error) {
                res.status(500).json({ error: 'Error fetching inventory item' });
        }
});




// DELETE endpoint based on name and inStock
app.delete('/api/products/delete', async (req, res) => {
        const { name, inStock } = req.body;
        console.log("Name ", name, "Instock", inStock)
        try {
                const deletedProduct = await Product.findOneAndDelete({ name, inStock });
                if (deletedProduct) {
                        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
                } else {
                        res.status(404).json({ message: "Product not found" });
                }
        } catch (error) {
                res.status(500).json({ message: "Error deleting product", error });
        }
});




// PATCH /api/products - Update a product
app.patch('/api/products/update', async (req, res) => {
        const { name, inStock, field, newValue } = req.body;
        console.log("To be Updated ", field)
        try {
                // Find product by name and inStock values
                const product = await Product.findOne({ name, inStock });
                if (!product) {
                        return res.status(404).json({ message: 'Product not found' });
                }

                // Update the specified field with the new value
                product[field] = newValue;
                await product.save();

                res.json({ message: 'Product updated successfully' });
        } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error updating product' });
        }
});



app.use('/api/Inventory/users', userRoutes);
app.use('/api/Inventory/products', productRoutes);
const connectdb = require('./db/connect');
const port = 5000;
const start = async () => {
        const uri = "mongodb+srv://email:<generated_password>@users.w3p3e.mongodb.net/?retryWrites=true&w=majority&appName=Users";
        const client = new MongoClient(uri)
        try {
                await connectdb(uri)
                app.listen(port, console.log(`Server is listening at http://localhost:${port}/`))

        } catch (error) {
                console.log(error)
        }
}
start()
