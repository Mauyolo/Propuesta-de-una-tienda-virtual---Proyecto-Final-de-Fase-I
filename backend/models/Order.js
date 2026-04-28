/**
 * backend/models/Order.js
 * Modelo Mongoose para registrar compras en NitroGames.
 * MongoDB se usa EXCLUSIVAMENTE para persistir órdenes reales.
 * Los productos (catálogo) se mantienen en datos locales del frontend.
 */
const mongoose = require('mongoose');

// Sub-esquema de cada item comprado
const OrderItemSchema = new mongoose.Schema({
  id:       { type: String, required: true },
  title:    { type: String, required: true },
  price:    { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  type:     { type: String, enum: ['game', 'coin', 'combo', 'currency'] },
  image:    { type: String }
}, { _id: false });

// Esquema principal de la orden
const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: () => `NG-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  },
  items: {
    type: [OrderItemSchema],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'La orden debe tener al menos un item'
    }
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  customer: {
    name:  { type: String, default: '' },
    email: { type: String, default: '' }
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
