const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
