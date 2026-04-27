/**
 * src/store/products.js
 * Store de Pinia para gestionar el catálogo de productos.
 * 
 * - Hace fetch desde la API (backend Express)
 * - Cae automáticamente a datos locales si el backend no responde
 * - Cachea los resultados para evitar peticiones redundantes
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchProducts } from '../services/api'

export const useProductsStore = defineStore('products', () => {

  // ── State ──────────────────────────────────────────────────────────────────
  const games = ref([])
  const coins = ref([])
  const combos = ref([])
  const loading = ref(false)
  const error = ref(null)

  /** Flags para saber si ya se cargó cada tipo (evita re-fetches) */
  const loaded = ref({ games: false, coins: false, combos: false })

  // ── Getters ────────────────────────────────────────────────────────────────
  const allProducts = computed(() => [
    ...games.value,
    ...coins.value,
    ...combos.value
  ])

  const getGameById = computed(() => (id) =>
    games.value.find(g => g._id === id || String(g.id) === String(id))
  )

  const getProductById = computed(() => (id) =>
    allProducts.value.find(p => p._id === id || String(p.id) === String(id))
  )

  // ── Actions ────────────────────────────────────────────────────────────────

  /** Carga juegos desde la API (con fallback a datos locales vía api.js) */
  async function loadGames(force = false) {
    if (loaded.value.games && !force) return
    loading.value = true
    error.value = null
    try {
      games.value = await fetchProducts('game')
      loaded.value.games = true
    } catch (err) {
      error.value = err.message
      console.error('[productsStore] Error cargando juegos:', err.message)
    } finally {
      loading.value = false
    }
  }

  /** Carga NitroCoins desde la API */
  async function loadCoins(force = false) {
    if (loaded.value.coins && !force) return
    loading.value = true
    error.value = null
    try {
      coins.value = await fetchProducts('coin')
      loaded.value.coins = true
    } catch (err) {
      error.value = err.message
      console.error('[productsStore] Error cargando monedas:', err.message)
    } finally {
      loading.value = false
    }
  }

  /** Carga combos desde la API */
  async function loadCombos(force = false) {
    if (loaded.value.combos && !force) return
    loading.value = true
    error.value = null
    try {
      combos.value = await fetchProducts('combo')
      loaded.value.combos = true
    } catch (err) {
      error.value = err.message
      console.error('[productsStore] Error cargando combos:', err.message)
    } finally {
      loading.value = false
    }
  }

  /** Carga todo el catálogo de una vez */
  async function loadAll(force = false) {
    await Promise.all([
      loadGames(force),
      loadCoins(force),
      loadCombos(force)
    ])
  }

  return {
    // State
    games,
    coins,
    combos,
    loading,
    error,
    loaded,
    // Getters
    allProducts,
    getGameById,
    getProductById,
    // Actions
    loadGames,
    loadCoins,
    loadCombos,
    loadAll
  }
})
