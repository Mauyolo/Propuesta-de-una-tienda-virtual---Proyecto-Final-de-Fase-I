<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../store/cart'
import { getGameById } from '../data/games'
import { coins } from '../data/coins'

const route = useRoute()
const cart = useCartStore()
const game = computed(() => getGameById(route.params.id) || {})

const addGame = () => cart.addToCart({ ...game.value, type: 'game' })
const addCoin = (coin) => cart.addToCart({ ...coin })
</script>

<template>
  <section class="page-shell page-section game-coins-page">

    <!-- Game header card -->
    <div class="game-header glass-panel">
      <div class="game-image-wrap">
        <img :src="game.image" :alt="game.title" class="game-img" />
      </div>
      <div class="game-info">
        <span class="eyebrow">{{ game.category }}</span>
        <h1 class="section-title">{{ game.title }}</h1>
        <p class="section-copy">{{ game.description }}</p>
        <div class="game-buy-row">
          <div>
            <span class="price-label">Precio del juego</span>
            <div class="price-highlight">${{ game.price }}</div>
          </div>
          <button class="btn btn-primary" @click="addGame">
            🎮 Comprar juego
          </button>
        </div>
      </div>
    </div>

    <!-- Coin offers section -->
    <div class="coins-section">
      <div class="coins-header">
        <span class="eyebrow">💰 NitroCoins</span>
        <h2 class="coins-title">Monedas virtuales para <span class="accent-text">{{ game.title }}</span></h2>
        <p class="section-copy">Elige el paquete de monedas que mejor se adapte a tu estilo de juego.</p>
      </div>

      <div class="coins-grid">
        <article
          v-for="coin in coins"
          :key="coin.id"
          class="coin-card glass-panel"
          :class="{ popular: coin.id === 102 }"
        >
          <div v-if="coin.id === 102" class="popular-tag">⭐ Más popular</div>
          <div class="coin-icon">🪙</div>
          <h3 class="coin-title">{{ coin.title }}</h3>
          <p class="coin-desc">{{ coin.description }}</p>
          <div v-if="coin.bonus" class="coin-bonus">
            + {{ coin.bonus }}
          </div>
          <div class="coin-footer">
            <span class="price-highlight">${{ coin.price.toFixed(2) }}</span>
            <button class="btn btn-primary coin-btn" @click="addCoin(coin)">
              Agregar
            </button>
          </div>
        </article>
      </div>
    </div>

  </section>
</template>

<style scoped>
.game-coins-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Game header */
.game-header {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  padding: 28px;
  border-radius: 32px;
  align-items: center;
}

.game-image-wrap {
  border-radius: 22px;
  overflow: hidden;
  height: 360px;
}

.game-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.game-buy-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 22px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
}

.price-label {
  display: block;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  margin-bottom: 6px;
}

/* Coins section */
.coins-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.coins-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.coins-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  letter-spacing: -0.03em;
}

.coins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 18px;
}

.coin-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 28px 20px 22px;
  border-radius: 24px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default;
}

.coin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.38);
}

.coin-card.popular {
  border-color: rgba(99, 245, 210, 0.35);
  background: rgba(99, 245, 210, 0.05);
}

.popular-tag {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 5px 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), #8cf7de);
  color: #031018;
  font-size: 0.74rem;
  font-weight: 800;
}

.coin-icon {
  font-size: 2.6rem;
  line-height: 1;
}

.coin-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}

.coin-desc {
  margin: 0;
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.5;
}

.coin-bonus {
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(255, 140, 90, 0.15);
  border: 1px solid rgba(255, 140, 90, 0.25);
  color: var(--accent-warm);
  font-size: 0.8rem;
  font-weight: 700;
}

.coin-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: auto;
}

.coin-btn {
  width: 100%;
}

@media (max-width: 860px) {
  .game-header {
    grid-template-columns: 1fr;
  }

  .game-image-wrap {
    height: 280px;
  }

  .game-buy-row {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 560px) {
  .coins-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .coin-card {
    padding: 22px 14px 18px;
  }
}
</style>
