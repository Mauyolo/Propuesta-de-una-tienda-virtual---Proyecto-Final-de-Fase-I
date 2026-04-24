<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cart'

const cart = useCartStore()
const menuOpen = ref(false)

const cartCount = computed(() =>
  cart.cart.reduce((sum, p) => sum + p.quantity, 0)
)

const closeMenu = () => { menuOpen.value = false }
</script>

<template>
  <header class="nav-wrap">
    <nav class="nav page-shell glass-panel">

      <!-- Brand -->
      <router-link to="/" class="brand" @click="closeMenu">
        <span class="brand-mark" aria-hidden="true">
          <span class="joystick-base"></span>
          <span class="joystick-shaft"></span>
          <span class="joystick-knob">
            <span class="joystick-dot"></span>
          </span>
        </span>
        <div>
          <strong>NitroGames</strong>
          <small>GAME STORE</small>
        </div>
      </router-link>

      <!-- Desktop links -->
      <div class="links">
        <router-link to="/" class="nav-link" exact-active-class="router-link-exact-active">Inicio</router-link>
        <router-link to="/products" class="nav-link">Juegos</router-link>
        <span class="nav-divider" aria-hidden="true"></span>
        <router-link to="/monedas" class="nav-link coins-link">🪙 Monedas</router-link>
        <router-link to="/combos" class="nav-link">Combos</router-link>
        <router-link to="/cart" class="cart-link">
          Carrito
          <span class="cart-count" :class="{ pulse: cartCount > 0 }">{{ cartCount }}</span>
        </router-link>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="hamburger"
        :aria-expanded="menuOpen"
        aria-label="Menú"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="mobile-menu glass-panel page-shell">
        <router-link to="/" class="mobile-link" @click="closeMenu">Inicio</router-link>
        <router-link to="/products" class="mobile-link" @click="closeMenu">🎮 Juegos</router-link>
        <div class="mobile-group-label">Tienda virtual</div>
        <router-link to="/monedas" class="mobile-link" @click="closeMenu">🪙 Monedas</router-link>
        <router-link to="/combos" class="mobile-link" @click="closeMenu">🔥 Combos</router-link>
        <router-link to="/cart" class="mobile-link cart-mobile" @click="closeMenu">
          🛒 Carrito
          <span class="cart-count">{{ cartCount }}</span>
        </router-link>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav-wrap {
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 18px 0 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding: 16px 24px;
  border-radius: 22px;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-family: var(--font-display);
  font-size: 1.15rem;
  letter-spacing: 0.02em;
}

.brand small {
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* Joystick icon */
.brand-mark {
  position: relative;
  width: 58px;
  height: 58px;
  border-radius: 20px;
  overflow: hidden;
  flex: 0 0 auto;
  background:
    radial-gradient(circle at 75% 82%, rgba(255, 156, 96, 0.95), transparent 34%),
    linear-gradient(135deg, #78f0c8 8%, #b8edb2 48%, #ffbf8b 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 14px 28px rgba(0, 0, 0, 0.28);
}

.joystick-base,
.joystick-shaft,
.joystick-knob {
  position: absolute;
}

.joystick-base {
  left: 15px;
  bottom: 11px;
  width: 24px;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(180deg, #fffdf7 0%, #ece5d8 100%);
  box-shadow:
    inset 0 -2px 0 rgba(184, 176, 160, 0.45),
    0 6px 14px rgba(0, 0, 0, 0.16);
}

.joystick-shaft {
  left: 24px;
  bottom: 21px;
  width: 7px;
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(180deg, #fffdf7 0%, #f1eadf 100%);
}

.joystick-knob {
  left: 18px;
  bottom: 33px;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: linear-gradient(180deg, #fffefb 0%, #f0e7da 100%);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.14);
}

.joystick-dot {
  position: absolute;
  top: 5px;
  left: 4px;
  width: 7px;
  height: 4px;
  border-radius: 999px;
  background: rgba(132, 137, 112, 0.72);
  transform: rotate(-45deg);
}

/* Desktop links */
.links {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.12);
  margin: 0 4px;
}

.coins-link {
  color: #ffd04a !important;
}

.coins-link.router-link-active,
.coins-link:hover {
  background: rgba(255, 208, 74, 0.1) !important;
  color: #ffd04a !important;
}

.nav-link,
.cart-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  color: var(--muted);
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-link:hover,
.cart-link:hover,
.router-link-active {
  color: var(--text);
  background: rgba(255, 255, 255, 0.08);
}

.cart-link {
  gap: 10px;
  background: rgba(99, 245, 210, 0.08);
}

.cart-count {
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: #031018;
  font-size: 0.82rem;
  font-weight: 800;
  transition: transform 0.2s ease;
}

.cart-count.pulse {
  animation: cartPulse 0.4s ease;
}

@keyframes cartPulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.35); }
  100% { transform: scale(1); }
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  padding: 0 9px;
}

.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 2px;
  background: var(--text);
  transition: opacity 0.2s;
}

/* Mobile menu */
.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
  padding: 18px;
  border-radius: 18px;
}

.mobile-group-label {
  padding: 8px 16px 4px;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--muted);
  opacity: 0.6;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 12px;
  color: var(--muted);
  font-weight: 600;
  transition: background 0.2s, color 0.2s;
}

.mobile-link:hover,
.mobile-link.router-link-active {
  background: rgba(255, 255, 255, 0.07);
  color: var(--text);
}

.cart-mobile {
  background: rgba(99, 245, 210, 0.07);
}

/* Drawer transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
@media (max-width: 768px) {
  .links {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

@media (max-width: 460px) {
  .brand-mark {
    width: 50px;
    height: 50px;
    border-radius: 18px;
  }

  .brand strong {
    font-size: 1rem;
  }

  .brand small {
    font-size: 0.72rem;
  }
}
</style>
