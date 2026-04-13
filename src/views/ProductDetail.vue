<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../store/cart'
import { getGameById } from '../data/games'

const route = useRoute()
const cart = useCartStore()
const product = computed(() => getGameById(route.params.id) || {})

const shortCategory = computed(() => product.value.category || 'Coleccion Nitro')
const add = () => cart.addToCart(product.value)
</script>

<template>
  <section class="page-shell page-section detail-page">
    <div class="detail-card glass-panel">
      <div class="image-panel">
        <span class="eyebrow">{{ shortCategory }}</span>
        <div class="image-frame">
          <img :src="product.image" :alt="product.title" />
        </div>
      </div>

      <div class="info-panel">
        <span class="tag">Detalle del juego</span>
        <h1 class="section-title">{{ product.title }}</h1>
        <p class="section-copy">{{ product.description }}</p>

        <div class="purchase-box">
          <div>
            <span class="price-label">Precio final</span>
            <div class="price-highlight">${{ product.price }}</div>
          </div>

          <button class="btn btn-primary" @click="add">Agregar al carrito</button>
        </div>

        <div class="benefits">
          <div class="benefit glass-panel">
            <strong>Entrega digital</strong>
            <span>Acceso rápido y experiencia clara para comprar.</span>
          </div>
          <div class="benefit glass-panel">
            <strong>Diseño renovado</strong>
            <span>Más foco en el producto y mejor lectura del contenido.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.detail-page {
  padding-top: 28px;
}

.detail-card {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 30px;
  padding: 28px;
  border-radius: 32px;
}

.image-panel,
.info-panel {
  min-width: 0;
}

.image-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-frame {
  min-height: 500px;
  display: grid;
  place-items: center;
  padding: 30px;
  border-radius: 28px;
  background:
    radial-gradient(circle at top, rgba(99, 245, 210, 0.16), transparent 45%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
}

.image-frame img {
  width: 100%;
  max-width: 380px;
  max-height: 420px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 24px 54px rgba(0, 0, 0, 0.32);
}

.info-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
}

.purchase-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.price-label {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
}

.benefits {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.benefit {
  padding: 18px;
  border-radius: 22px;
}

.benefit strong,
.benefit span {
  display: block;
}

.benefit strong {
  margin-bottom: 8px;
}

.benefit span {
  color: var(--muted);
  line-height: 1.6;
}

@media (max-width: 920px) {
  .detail-card {
    grid-template-columns: 1fr;
  }

  .image-frame {
    min-height: 360px;
  }
}

@media (max-width: 620px) {
  .detail-card {
    padding: 18px;
  }

  .purchase-box,
  .benefits {
    grid-template-columns: 1fr;
  }

  .purchase-box {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>
