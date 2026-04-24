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
      <span class="toast-icon">🛒</span>
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
  font-size: 1.3rem;
  flex-shrink: 0;
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
