const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['game', 'coin', 'combo']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  image: {
    type: String
  },
  amount: {
    type: Number // For coins
  },
  items: [{
    type: String // For combos (can just store descriptions or names of what's inside)
  }]
});

module.exports = mongoose.model('Product', ProductSchema);
