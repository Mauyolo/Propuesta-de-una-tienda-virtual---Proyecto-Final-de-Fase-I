import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),

  actions: {
    addToCart(product) {
      const existing = this.cart.find(p => p.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
    },

    removeFromCart(id) {
      this.cart = this.cart.filter(p => p.id !== id)
    },

    increase(id) {
      const item = this.cart.find(p => p.id === id)
      item.quantity++
    },

    decrease(id) {
      const item = this.cart.find(p => p.id === id)

      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeFromCart(id)
      }
    }
  },

  getters: {
    total: (state) =>
      state.cart.reduce((sum, p) => sum + p.price * p.quantity, 0)
  }
})