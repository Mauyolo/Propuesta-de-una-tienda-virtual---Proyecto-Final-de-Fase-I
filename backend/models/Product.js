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
  // ── Coins ──────────────────────────────────────────────
  amount: {
    type: Number   // cantidad de monedas del pack
  },
  bonus: {
    type: String   // e.g. "200 de bonus"
  },
  // ── Combos ─────────────────────────────────────────────
  originalPrice: {
    type: Number   // precio antes del descuento
  },
  discount: {
    type: Number   // porcentaje de descuento (17, 20…)
  },
  badge: {
    type: String   // e.g. "Oferta saga", "Bundle RPG"
  },
  items: [{
    type: String   // nombres de los productos incluidos en el combo
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
