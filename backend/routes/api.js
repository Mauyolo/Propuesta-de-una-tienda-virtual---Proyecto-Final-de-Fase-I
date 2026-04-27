/**
 * backend/routes/api.js
 * Rutas de la API de NitroGames.
 * Base: /api
 */

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ── Health check ──────────────────────────────────────────────────────────────
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── GET /api/products ─────────────────────────────────────────────────────────
// Query params opcionales: ?type=game|coin|combo&category=RPG&search=zelda
router.get('/products', async (req, res) => {
  try {
    const { type, category, search } = req.query;

    const query = {};

    if (type && type !== 'all') {
      query.type = type;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('[GET /products]', error.message);
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

// ── GET /api/products/:id ─────────────────────────────────────────────────────
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('[GET /products/:id]', error.message);
    res.status(500).json({ message: 'Error al obtener producto', error: error.message });
  }
});

// ── GET /api/products/type/:type ──────────────────────────────────────────────
// Alias conveniente: /api/products/type/game
router.get('/products/type/:type', async (req, res) => {
  try {
    const validTypes = ['game', 'coin', 'combo'];
    const { type } = req.params;

    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: `Tipo inválido. Use: ${validTypes.join(', ')}` });
    }

    const products = await Product.find({ type });
    res.json(products);
  } catch (error) {
    console.error('[GET /products/type/:type]', error.message);
    res.status(500).json({ message: 'Error al obtener productos por tipo', error: error.message });
  }
});

// ── POST /api/checkout ────────────────────────────────────────────────────────
// Simula el procesamiento del pago.
// En producción real: integrar con Stripe u otro gateway.
router.post('/checkout', (req, res) => {
  const { cart, total } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ success: false, message: 'El carrito está vacío' });
  }

  // Simulación de procesamiento con delay
  setTimeout(() => {
    res.json({
      success: true,
      message: 'Pago procesado correctamente',
      orderId: `NG-${Date.now()}`,
      total,
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    });
  }, 1500);
});

module.exports = router;
