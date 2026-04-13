<script setup>
import { useCartStore } from '../store/cart'

const cart = useCartStore()
</script>

<template>
  <header class="nav-wrap">
    <nav class="nav page-shell glass-panel">
      <router-link to="/" class="brand">
        <span class="brand-mark">NG</span>
        <div>
          <strong>NitroGames</strong>
          <small>Arcade store</small>
        </div>
      </router-link>

      <div class="links">
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/products" class="nav-link">Juegos</router-link>
        <router-link to="/cart" class="cart-link">
          Carrito
          <span class="cart-count">{{ cart.cart.length }}</span>
        </router-link>
      </div>
    </nav>
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

.brand-mark {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-warm) 100%);
  color: #021018;
  font-family: var(--font-display);
  font-weight: 800;
}

.links {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
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
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
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
}

@media (max-width: 768px) {
  .nav {
    padding: 14px 16px;
    border-radius: 18px;
    flex-direction: column;
    align-items: stretch;
  }

  .links {
    justify-content: space-between;
  }
}
</style>
