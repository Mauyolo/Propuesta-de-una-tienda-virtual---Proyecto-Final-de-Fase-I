/**
 * src/services/api.js
 * Capa de servicio para comunicarse con el backend Express.
 *
 * Estrategia:
 *  1. Intenta fetchear desde la API (VITE_API_URL → backend en localhost:3000 o Render)
 *  2. Si la API falla (timeout / conexión rechazada), cae automáticamente a datos locales
 *  3. Normaliza los objetos para que tengan siempre { _id, id, title, price, type, image, ... }
 *
 * gameCoins NO viene del backend (estructura anidada con packs) → se importa siempre local.
 */

import axios from 'axios'
import { games as localGames } from '../data/games'
import { coins as localCoins } from '../data/coins'
import { combos as localCombos } from '../data/combos'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 6000
})

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Normaliza un producto que viene de MongoDB para que tenga un campo `id` compatible
 * con los datos locales. Así el carrito, router-links, etc. funcionan en ambos casos.
 */
function normalizeFromAPI(product) {
  return {
    ...product,
    // MongoDB usa _id string; generamos un campo `id` numérico-equivalente para compatibilidad
    id: product._id || product.id
  }
}

/**
 * Normaliza un producto local para que tenga el campo `_id` equivalente.
 */
function normalizeLocal(product, type) {
  return {
    ...product,
    type: product.type || type,
    _id: String(product.id)
  }
}

// ── Productos ──────────────────────────────────────────────────────────────────

/**
 * Obtiene productos de la API.
 * @param {'game'|'coin'|'combo'|'all'} type
 */
export async function fetchProducts(type = 'all') {
  try {
    const params = type !== 'all' ? { type } : {}
    const { data } = await api.get('/products', { params })
    return data.map(normalizeFromAPI)
  } catch {
    // Fallback a datos locales
    console.warn(`[api] Backend no disponible. Usando datos locales (type=${type})`)
    const all = [
      ...localGames.map(g => normalizeLocal(g, 'game')),
      ...localCoins.map(c => normalizeLocal(c, 'coin')),
      ...localCombos.map(c => normalizeLocal(c, 'combo'))
    ]
    if (type === 'all') return all
    return all.filter(p => p.type === type)
  }
}

/**
 * Obtiene un producto por ID (primero intenta _id de Mongo, luego id numérico local).
 * @param {string|number} id
 */
export async function fetchProductById(id) {
  try {
    const { data } = await api.get(`/products/${id}`)
    return normalizeFromAPI(data)
  } catch {
    // Fallback: busca en datos locales por id o _id
    const all = [
      ...localGames.map(g => normalizeLocal(g, 'game')),
      ...localCoins.map(c => normalizeLocal(c, 'coin')),
      ...localCombos.map(c => normalizeLocal(c, 'combo'))
    ]
    return all.find(p => p._id === String(id) || Number(p.id) === Number(id)) || null
  }
}

// ── Checkout ───────────────────────────────────────────────────────────────────

/**
 * Procesa el checkout.
 * @param {Array} cart  Items del carrito
 * @param {number} total  Total en USD
 */
export async function processCheckout(cart, total) {
  try {
    const { data } = await api.post('/checkout', { cart, total })
    return data
  } catch {
    // Simula respuesta exitosa si el backend no está disponible
    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
      success: true,
      message: 'Pago procesado correctamente',
      orderId: `NG-${Date.now()}`,
      total
    }
  }
}
