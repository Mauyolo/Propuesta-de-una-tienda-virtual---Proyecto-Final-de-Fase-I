<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'

const router = useRouter()
const cart = useCartStore()

const goToCheckout = () => router.push('/checkout')
</script>

<template>
  <section class="page-shell page-section cart-page">
    <div class="cart-header glass-panel">
      <div>
        <span class="eyebrow">Resumen de compra</span>
        <h1 class="section-title">Tu carrito</h1>
      </div>

      <div class="cart-total">
        <span>Total actual</span>
        <strong>${{ cart.total.toFixed(2) }}</strong>
      </div>
    </div>

    <div v-if="cart.cart.length" class="cart-layout">
      <div class="cart-list">
        <article v-for="item in cart.cart" :key="item.id" class="cart-item glass-panel">
          <img :src="item.image" :alt="item.title" />

          <div class="item-copy">
            <h2>{{ item.title }}</h2>
            <p>${{ item.price }} c/u</p>
            <span v-if="item.type" class="item-type-badge">{{ item.type }}</span>
          </div>

          <div class="qty-box">
            <button @click="cart.decrease(item.id)" aria-label="Disminuir cantidad">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="cart.increase(item.id)" aria-label="Aumentar cantidad">+</button>
          </div>

          <strong class="line-total">${{ (item.price * item.quantity).toFixed(2) }}</strong>

          <button
            class="remove-btn"
            aria-label="Eliminar del carrito"
            @click="cart.removeFromCart(item.id)"
          >✕</button>
        </article>
      </div>

      <aside class="summary glass-panel">
        <h2>Checkout</h2>
        <p>Revisa cantidades, confirma tu total y finaliza tu compra de forma segura.</p>

        <div class="summary-row">
          <span>Artículos</span>
          <strong>{{ cart.cart.reduce((s, p) => s + p.quantity, 0) }}</strong>
        </div>
        <div class="summary-row">
          <span>Subtotal</span>
          <strong>${{ cart.total.toFixed(2) }}</strong>
        </div>
        <div class="summary-row total-row">
          <span>Total</span>
          <strong class="total-amount">${{ cart.total.toFixed(2) }}</strong>
        </div>

        <button class="btn btn-primary summary-btn" @click="goToCheckout">
          🔒 Finalizar compra
        </button>
        <button class="btn btn-secondary clear-btn" @click="cart.clearCart">
          Vaciar carrito
        </button>
      </aside>
    </div>

    <div v-else class="empty-state glass-panel">
      <span style="font-size: 3rem">🛒</span>
      <h2>Tu carrito está vacío</h2>
      <p class="section-copy">
        Agrega juegos, monedas o combos para ver aquí tu resumen de compra.
      </p>
      <div class="empty-actions">
        <router-link to="/products" class="btn btn-primary">Ver juegos</router-link>
        <router-link to="/combos" class="btn btn-secondary">Ver combos</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cart-page {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-end;
  padding: 28px;
  border-radius: 28px;
}

.cart-total {
  text-align: right;
}

.cart-total span,
.cart-total strong {
  display: block;
}

.cart-total span {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.76rem;
}

.cart-total strong {
  margin-top: 8px;
  font-family: var(--font-display);
  font-size: 2.2rem;
  color: var(--accent);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 22px;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: grid;
  grid-template-columns: 90px 1fr auto auto auto;
  gap: 18px;
  align-items: center;
  padding: 18px;
  border-radius: 24px;
}

.cart-item img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  padding: 10px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
}

.item-copy h2 {
  margin: 0 0 6px;
  font-size: 1.05rem;
}

.item-copy p {
  color: var(--muted);
  margin: 0 0 6px;
}

.item-type-badge {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(99, 245, 210, 0.1);
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.qty-box {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
}

.qty-box button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(99, 245, 210, 0.15);
  color: var(--text);
  font-size: 1.2rem;
  line-height: 1;
}

.qty-box span {
  min-width: 22px;
  text-align: center;
  font-weight: 700;
}

.line-total {
  font-family: var(--font-display);
  color: var(--accent);
  font-size: 1.3rem;
  white-space: nowrap;
}

.remove-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 80, 80, 0.12);
  color: #ff6b6b;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.remove-btn:hover {
  background: rgba(255, 80, 80, 0.25);
}

/* Summary sidebar */
.summary {
  padding: 28px;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: sticky;
  top: 100px;
  height: fit-content;
}

.summary h2 { margin: 0 0 8px; }
.summary > p {
  margin: 0 0 20px;
  color: var(--muted);
  line-height: 1.7;
  font-size: 0.94rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  color: var(--muted);
}

.summary-row strong { color: var(--text); }

.total-row {
  font-weight: 700;
  color: var(--text);
  margin-bottom: 16px;
}

.total-amount {
  font-family: var(--font-display);
  color: var(--accent) !important;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
}

.summary-btn,
.clear-btn {
  width: 100%;
}

.summary-btn { margin-bottom: 10px; }

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 380px;
  text-align: center;
  border-radius: 28px;
  padding: 40px;
}

.empty-state h2 { margin: 0; }

.empty-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

/* Responsive */
@media (max-width: 940px) {
  .cart-layout { grid-template-columns: 1fr; }
  .summary { position: static; }
}

@media (max-width: 700px) {
  .cart-header { flex-direction: column; align-items: flex-start; padding: 20px; }
  .cart-total { text-align: left; }
  .cart-item {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
  }
  .cart-item img { grid-row: 1 / 3; width: 80px; height: 80px; }
  .item-copy { grid-column: 2; }
  .qty-box { grid-column: 1 / 3; }
  .line-total { grid-column: 1; }
  .remove-btn { grid-column: 2; justify-self: end; }
}

@media (max-width: 480px) {
  .cart-item, .summary, .empty-state { padding: 18px; border-radius: 22px; }
  .empty-actions { flex-direction: column; width: 100%; }
}
</style>
