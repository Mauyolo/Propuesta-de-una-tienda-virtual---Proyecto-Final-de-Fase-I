<script setup>
import { useCartStore } from '../store/cart'

const cart = useCartStore()
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
          </div>

          <div class="qty-box">
            <button @click="cart.decrease(item.id)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="cart.increase(item.id)">+</button>
          </div>

          <strong class="line-total">${{ (item.price * item.quantity).toFixed(2) }}</strong>
        </article>
      </div>

      <aside class="summary glass-panel">
        <h2>Checkout rapido</h2>
        <p>Revisa cantidades, confirma tu total y deja la compra lista.</p>
        <div class="summary-row">
          <span>Productos</span>
          <strong>{{ cart.cart.length }}</strong>
        </div>
        <div class="summary-row">
          <span>Total</span>
          <strong>${{ cart.total.toFixed(2) }}</strong>
        </div>
        <button class="btn btn-primary summary-btn">Finalizar compra</button>
      </aside>
    </div>

    <div v-else class="empty-state glass-panel">
      <h2>Tu carrito esta vacio</h2>
      <p class="section-copy">
        Agrega algunos juegos al catalogo para ver aqui tu resumen de compra.
      </p>
      <router-link to="/products" class="btn btn-primary">Ir al catalogo</router-link>
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
  align-items: end;
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
  grid-template-columns: 90px 1fr auto auto;
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
  margin: 0 0 8px;
  font-size: 1.05rem;
}

.item-copy p {
  color: var(--muted);
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
}

.line-total {
  font-family: var(--font-display);
  color: var(--accent);
  font-size: 1.3rem;
}

.summary,
.empty-state {
  padding: 24px;
  border-radius: 28px;
}

.summary h2,
.empty-state h2 {
  margin: 0 0 10px;
}

.summary p {
  margin: 0 0 22px;
  color: var(--muted);
  line-height: 1.7;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.summary-btn {
  width: 100%;
  margin-top: 18px;
}

.empty-state {
  display: grid;
  place-items: center;
  gap: 14px;
  min-height: 340px;
  text-align: center;
}

@media (max-width: 940px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .cart-header {
    flex-direction: column;
    align-items: start;
    padding: 20px;
  }

  .cart-total {
    text-align: left;
  }

  .cart-item {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .cart-item img {
    width: 100%;
    max-width: 120px;
  }

  .qty-box,
  .line-total {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .cart-item,
  .summary,
  .empty-state {
    padding: 18px;
    border-radius: 22px;
  }

  .qty-box {
    justify-content: space-between;
  }
}
</style>
