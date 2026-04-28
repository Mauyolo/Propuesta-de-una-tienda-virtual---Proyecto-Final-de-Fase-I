/**
 * backend/models/Product.js
 * Modelo Mongoose para todos los productos de NitroGames.
 * Soporta: juegos (game), monedas (coin) y combos (combo).
 */
const mongoose = require('mongoose');

const PackSchema = new mongoose.Schema({
  id:      { type: String },
  label:   { type: String },
  amount:  { type: Number },
  bonus:   { type: Number, default: 0 },
  price:   { type: Number },
  popular: { type: Boolean, default: false }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  // ── Comunes ────────────────────────────────────────────────
  type: {
    type: String,
    required: true,
    enum: ['game', 'coin', 'combo'],
    index: true
  },
  /** Nombre principal del producto (alias de title para compatibilidad) */
  name: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  /** Empresa/publisher (Riot Games, HoYoverse, etc.) */
  company: {
    type: String,
    default: ''
  },

  // ── Coins ───────────────────────────────────────────────────
  /** Cantidad base de monedas en el pack */
  amount: {
    type: Number
  },
  /** Texto de bonus, e.g. "200 de bonus" */
  bonus: {
    type: String
  },
  /** Sub-packs de monedas (para gameCoins si se migran al backend) */
  packs: {
    type: [PackSchema],
    default: undefined
  },

  // ── Combos ──────────────────────────────────────────────────
  /** Precio original antes del descuento */
  originalPrice: {
    type: Number
  },
  /** Porcentaje de descuento (ej: 17 → "17%") */
  discount: {
    type: Number
  },
  /** Etiqueta del badge (ej: "Oferta saga", "Bundle RPG") */
  badge: {
    type: String
  },
  /** Nombres de los productos incluidos en el combo */
  items: {
    type: [String],
    default: undefined
  }
}, {
  timestamps: true,
  // Permite que `name` y `title` se lean indistintamente
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      // Garantiza que `name` siempre esté presente
      if (!ret.name) ret.name = ret.title;
      return ret;
    }
  }
});

// Índice de texto para búsqueda
ProductSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
