// backend/routes/userRoutes.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Create new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  var user_id='1';
  const newUser = new User({ username, password,user_id });
  await newUser.save();
  res.json(newUser);
});

module.exports = router;
