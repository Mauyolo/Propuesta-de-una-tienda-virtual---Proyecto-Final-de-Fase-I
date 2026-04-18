<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId = route.query.orderId
</script>

<template>
  <section class="page-shell page-section confirmed-page">
    <div class="confirmed-card glass-panel">
      <div class="checkmark-wrap">
        <div class="checkmark">✓</div>
      </div>
      <span class="eyebrow">🎉 Pedido confirmado</span>
      <h1 class="section-title">¡Pago exitoso!</h1>
      <p class="section-copy">
        Tu compra ha sido procesada correctamente. Recibirás los accesos a tus
        juegos y contenido digital en breve.
      </p>
      <div class="order-id glass-panel">
        <span>ID de orden</span>
        <strong>#{{ orderId }}</strong>
      </div>
      <div class="confirmed-actions">
        <router-link to="/products" class="btn btn-primary">Seguir comprando</router-link>
        <router-link to="/" class="btn btn-secondary">Ir al inicio</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.confirmed-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
}

.confirmed-card {
  max-width: 560px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 40px;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.checkmark-wrap {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #8cf7de);
  display: grid;
  place-items: center;
  box-shadow: 0 0 40px rgba(99, 245, 210, 0.4);
  animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}

@keyframes pop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.checkmark {
  font-size: 2.4rem;
  color: #031018;
  font-weight: 900;
  line-height: 1;
}

.confirmed-card .section-title {
  font-size: clamp(2rem, 5vw, 2.8rem);
}

.order-id {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 18px 32px;
  border-radius: 18px;
  width: 100%;
}

.order-id span {
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.order-id strong {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--accent);
  letter-spacing: 0.05em;
}

.confirmed-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

@media (max-width: 560px) {
  .confirmed-card {
    padding: 36px 22px;
  }

  .confirmed-actions {
    flex-direction: column;
  }
}
</style>
