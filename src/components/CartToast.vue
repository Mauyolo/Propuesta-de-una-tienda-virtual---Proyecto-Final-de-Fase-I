<script setup>
/**
 * CartToast.vue
 * Toast global de feedback al agregar items al carrito.
 * Se monta en App.vue y lee el estado del cart store.
 */
import { computed } from 'vue'
import { useCartStore } from '../store/cart'

const cart = useCartStore()
const toast = computed(() => cart.toast)
</script>

<template>
  <Transition name="toast">
    <div v-if="toast" class="cart-toast" :class="toast.type" role="alert">
      <div class="toast-icon" aria-hidden="true"></div>
      <span class="toast-message">{{ toast.message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.cart-toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 22px;
  border-radius: 16px;
  background: rgba(14, 28, 46, 0.96);
  border: 1px solid rgba(99, 245, 210, 0.35);
  backdrop-filter: blur(20px);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(99, 245, 210, 0.08);
  max-width: 360px;
  color: var(--text);
  font-weight: 600;
}

.toast-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2363f5d2' stroke-width='2'%3E%3Ccircle cx='9' cy='21' r='1'/%3E%3Ccircle cx='20' cy='21' r='1'/%3E%3Cpath d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: contain;
}

.toast-message {
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Transition */
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}

@media (max-width: 480px) {
  .cart-toast {
    right: 12px;
    bottom: 16px;
    left: 12px;
    max-width: none;
  }
}
</style>
