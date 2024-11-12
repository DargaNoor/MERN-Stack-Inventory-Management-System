// backend/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Add new product
router.post('/add', async (req, res) => {
  const { name, category, inStock, unitPrice, discount,action,orderType,decription,productCreated,product_status } = req.body;
  const totalValue = unitPrice * inStock * (1 - discount / 100);
  const newProduct = new Product({ name, category, inStock, unitPrice, discount, totalValue,action,orderType,decription,productCreated,product_status });
  await newProduct.save();
  res.json(newProduct);
});

module.exports = router;
