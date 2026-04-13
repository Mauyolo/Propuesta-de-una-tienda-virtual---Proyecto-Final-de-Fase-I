<script setup>
import { useCartStore } from '../store/cart'

const cart = useCartStore()
</script>

<template>
  <header class="nav-wrap">
    <nav class="nav page-shell glass-panel">
      <router-link to="/" class="brand">
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
  .nav-wrap {
    padding-top: 12px;
  }

  .nav {
    padding: 14px 16px;
    border-radius: 18px;
    flex-direction: column;
    align-items: stretch;
  }

  .brand {
    justify-content: center;
  }

  .links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .nav-link,
  .cart-link {
    width: 100%;
    padding: 0 10px;
    font-size: 0.92rem;
  }

  .cart-count {
    min-width: 24px;
    height: 24px;
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
