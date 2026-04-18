/**
 * src/services/api.js
 * Capa de servicio para comunicarse con el backend.
 * Si el backend no está disponible, cae automáticamente a los datos locales.
 */

import axios from 'axios'
import { games } from '../data/games'
import { coins } from '../data/coins'
import { combos } from '../data/combos'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

// ─── Productos ───────────────────────────────────────────────────────────────

export async function fetchProducts(type = 'all') {
  try {
    const params = type !== 'all' ? { type } : {}
    const { data } = await api.get('/products', { params })
    return data
  } catch {
    // Fallback a datos locales si el backend no responde
    const all = [
      ...games.map(g => ({ ...g, type: 'game', _id: String(g.id) })),
      ...coins.map(c => ({ ...c, type: 'coin', _id: String(c.id) })),
      ...combos.map(c => ({ ...c, type: 'combo', _id: String(c.id) }))
    ]
    if (type === 'all') return all
    return all.filter(p => p.type === type)
  }
}

export async function fetchProductById(id) {
  try {
    const { data } = await api.get(`/products/${id}`)
    return data
  } catch {
    const all = [
      ...games.map(g => ({ ...g, type: 'game', _id: String(g.id) })),
      ...coins.map(c => ({ ...c, type: 'coin', _id: String(c.id) })),
      ...combos.map(c => ({ ...c, type: 'combo', _id: String(c.id) }))
    ]
    return all.find(p => p._id === String(id) || p.id === Number(id)) || null
  }
}

// ─── Checkout ────────────────────────────────────────────────────────────────

export async function processCheckout(cart, total) {
  try {
    const { data } = await api.post('/checkout', { cart, total })
    return data
  } catch {
    // Simula una respuesta de éxito si el backend no está disponible
    await new Promise(resolve => setTimeout(resolve, 1500))
    return { success: true, message: 'Pago procesado correctamente', orderId: Date.now() }
  }
}
