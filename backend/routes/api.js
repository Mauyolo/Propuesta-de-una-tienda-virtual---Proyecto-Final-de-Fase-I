/**
 * backend/routes/api.js
 * Rutas de la API de NitroGames.
 * Base: /api
 *
 * DISEÑO: Los productos (juegos, monedas, combos) son datos locales en el frontend.
 * MongoDB se usa EXCLUSIVAMENTE para guardar órdenes de compra reales.
 */

const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

// ── GET /api/health ───────────────────────────────────────────────────────────
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── POST /api/orders ──────────────────────────────────────────────────────────
// Recibe el carrito desde el frontend y guarda la compra en MongoDB.
// Body: { cart: [...], total: number, customer: { name, email } }
router.post('/orders', async (req, res) => {
  const { cart, total, customer } = req.body;

  // Validación básica
  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ success: false, message: 'El carrito está vacío.' });
  }
  if (typeof total !== 'number' || total < 0) {
    return res.status(400).json({ success: false, message: 'Total inválido.' });
  }

  try {
    // Construir items normalizados
    const items = cart.map(item => ({
      id:       String(item._id || item.id || ''),
      title:    item.title || item.name || 'Producto',
      price:    Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      type:     item.type || 'game',
      image:    item.image || ''
    }));

    const order = await Order.create({
      items,
      total: Number(total.toFixed(2)),
      customer: {
        name:  customer?.name  || '',
        email: customer?.email || ''
      },
      status: 'completed'
    });

    console.log(`[Order] Guardada: ${order.orderId} | Total: $${order.total} | Items: ${order.items.length}`);

    res.status(201).json({
      success:  true,
      orderId:  order.orderId,
      message:  'Compra registrada correctamente.',
      total:    order.total,
      itemCount: order.items.reduce((s, i) => s + i.quantity, 0)
    });
  } catch (err) {
    console.error('[POST /orders]', err.message);
    res.status(500).json({ success: false, message: 'Error al guardar la orden.', error: err.message });
  }
});

// ── GET /api/orders ───────────────────────────────────────────────────────────
// Devuelve todas las órdenes (útil para un panel de administración futuro).
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener órdenes.', error: err.message });
  }
});

// ── GET /api/orders/:orderId ──────────────────────────────────────────────────
router.get('/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: 'Orden no encontrada.' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la orden.', error: err.message });
  }
});

module.exports = router;
