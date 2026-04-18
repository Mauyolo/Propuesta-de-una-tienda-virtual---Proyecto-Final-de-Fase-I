const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products or filter by type
router.get('/products', async (req, res) => {
  try {
    const { type } = req.query;
    const query = type && type !== 'all' ? { type } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Simulated Checkout
router.post('/checkout', (req, res) => {
  const { cart, total } = req.body;
  // Here we would normally integrate Stripe or another payment gateway
  // For now, we simulate a successful order
  setTimeout(() => {
    res.json({ success: true, message: 'Pago procesado correctamente', orderId: Date.now() });
  }, 1500);
});

module.exports = router;
