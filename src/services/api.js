/**
 * src/services/api.js
 * Capa de servicio para comunicarse con el backend Express.
 *
 * Estrategia (Actualizada):
 *  1. Los productos (juegos, monedas, combos) se obtienen EXCLUSIVAMENTE de los datos locales JSON. NO de MongoDB.
 *  2. MongoDB y la API se utilizan EXCLUSIVAMENTE para registrar las compras (POST /api/orders).
 */

import axios from 'axios'
import { games as localGames } from '../data/games'
import { coins as localCoins } from '../data/coins'
import { combos as localCombos } from '../data/combos'

// En desarrollo Vite proxea /api → localhost:3000 (ver vite.config.js).
// En producción usar VITE_API_URL=https://tu-backend.onrender.com/api
const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Normaliza un producto local para que tenga el campo `_id` equivalente.
 * Esto mantiene compatibilidad con cualquier componente que espere `_id` (de cuando se usaba Mongo).
 */
function normalizeLocal(product, type) {
  return {
    ...product,
    type: product.type || type,
    _id: String(product.id),
    id: product.id
  }
}

// ── Productos (SOLO DATOS LOCALES) ─────────────────────────────────────────────

/**
 * Obtiene productos (siempre desde local).
 * @param {'game'|'coin'|'combo'|'all'} type
 */
export async function fetchProducts(type = 'all') {
  // Simulamos un leve delay para simular carga de red y mantener UX de loading spinners
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const all = [
    ...localGames.map(g => normalizeLocal(g, 'game')),
    ...localCoins.map(c => normalizeLocal(c, 'coin')),
    ...localCombos.map(c => normalizeLocal(c, 'combo'))
  ]
  if (type === 'all') return all
  return all.filter(p => p.type === type)
}

/**
 * Obtiene un producto por ID (siempre desde local).
 * @param {string|number} id
 */
export async function fetchProductById(id) {
  const all = [
    ...localGames.map(g => normalizeLocal(g, 'game')),
    ...localCoins.map(c => normalizeLocal(c, 'coin')),
    ...localCombos.map(c => normalizeLocal(c, 'combo'))
  ]
  return all.find(p => p._id === String(id) || Number(p.id) === Number(id)) || null
}

// ── Checkout (API MONGODB) ─────────────────────────────────────────────────────

/**
 * Procesa el checkout enviando la orden al backend (MongoDB).
 * @param {Array} cart  Items del carrito
 * @param {number} total  Total en USD
 * @param {Object} customer Info del cliente
 */
export async function processCheckout(cart, total, customer = {}) {
  try {
    const { data } = await api.post('/orders', { cart, total, customer })
    return data
  } catch (error) {
    console.error('[processCheckout] Error:', error)
    throw new Error(error.response?.data?.message || 'Error al procesar el pago y guardar la orden.')
  }
}
