// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id:{ type: String, required: true ,unique:true},
    name: { type: String, required: true },
    category: { type: String },
    inStock: { type: Number, default: 0 },
    unitPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalValue: { type: Number, default: 0 },
    action: { type: String, default: "Active" },
    totalOrders:{ type: Number, default: 0 },
    status: { type: String, default: "Available" },
    orderType:{ type: String},
    description:{type:String},
    expiryDate:{type:String},
    imagePath: {
      type: String,
      default: null, // Store the file path or URL of the image
      },
    productCreated:{ type: String,default: Date}
  },{ strict: true });
  

module.exports = mongoose.model('Product', productSchema);
