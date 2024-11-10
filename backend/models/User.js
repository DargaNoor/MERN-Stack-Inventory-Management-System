// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
  user_id: { type: String, required: true,unique: true  },
  products_list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model('User', userSchema);
