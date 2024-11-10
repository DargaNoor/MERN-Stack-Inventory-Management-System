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
                const products = await Product.find({}, 'name category unitPrice discount totalValue status');
                console.log(products[0].name)
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
                // const activeCount = await Product.countDocuments({ expiryDate: { $gt: currentDate } });
                // const inactiveCount = await Product.countDocuments({ expiryDate: { $lte: currentDate } });
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
                console.log("Description: ",description)
                console.log("Product ID",product_id)
                // Get the image path from multer's file info
                const imagePath= req.file ? path.basename(req.file.path)  : null;
                console.log("IMage path :",imagePath)
                // var imagePath="/uploads/1731072608912.jpeg";
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
                        // image, // Save the image path from multer
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



app.use('/api/Inventory/users', userRoutes);
app.use('/api/Inventory/products', productRoutes);
// const path = require('path')
const connectdb = require('./db/connect')
// const port = process.env.PORT || 5555;
const port = 5000;
const start = async () => {
        const uri = "mongodb+srv://dnoorali2015:RU5VRfnPigBUAdlu@users.w3p3e.mongodb.net/?retryWrites=true&w=majority&appName=Users";
        const client = new MongoClient(uri)
        try {
                await connectdb(uri)
                app.listen(port, console.log(`Server is listening at http://localhost:${port}/`))

        } catch (error) {
                console.log(error)
        }
}
start()
