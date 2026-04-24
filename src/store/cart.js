import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    /** Notificación toast para feedback visual */
    toast: null,          // { message, type }  type: 'success' | 'info'
    _toastTimer: null
  }),

  persist: true,

  actions: {
    addToCart(product) {
      const existing = this.cart.find(p => p.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this._showToast(`✓ "${product.title ?? product.label ?? 'Ítem'}" añadido al carrito`)
    },

    removeFromCart(id) {
      this.cart = this.cart.filter(p => p.id !== id)
    },

    increase(id) {
      const item = this.cart.find(p => p.id === id)
      if (item) item.quantity++
    },

    decrease(id) {
      const item = this.cart.find(p => p.id === id)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeFromCart(id)
      }
    },

    clearCart() {
      this.cart = []
    },

    /** Muestra un toast de feedback durante 2.8 s */
    _showToast(message, type = 'success') {
      clearTimeout(this._toastTimer)
      this.toast = { message, type }
      this._toastTimer = setTimeout(() => {
        this.toast = null
      }, 2800)
    }
  },

  getters: {
    total: (state) =>
      state.cart.reduce((sum, p) => sum + p.price * p.quantity, 0),

    cartCount: (state) =>
      state.cart.reduce((sum, p) => sum + p.quantity, 0),

    itemCount: (state) => state.cart.length
  }
})