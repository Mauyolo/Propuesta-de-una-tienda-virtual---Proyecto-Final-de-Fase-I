<script setup>
/**
 * CurrencyCard.vue
 * Card para mostrar un juego con sus monedas en la vista de monedas.
 * Emite 'select' cuando se hace click para abrir el modal de packs.
 */
defineProps({
  game: { type: Object, required: true }
})
const emit = defineEmits(['select'])
</script>

<template>
  <article class="currency-card glass-panel" @click="emit('select', game)">
    <div class="cover" :style="{ '--accent-color': game.color }">
      <img :src="game.image" :alt="game.game" class="game-logo" />
      <div class="overlay">
        <span class="company-badge">{{ game.company }}</span>
      </div>
    </div>

    <div class="body">
      <h3 class="game-name">{{ game.game }}</h3>
      <div class="currency-row">
        <span class="currency-icon">{{ game.currencySymbol }}</span>
        <span class="currency-name">{{ game.currency }}</span>
      </div>
      <div class="price-range">
        Desde <strong>${{ Math.min(...game.packs.map(p => p.price)).toFixed(2) }}</strong>
        — {{ game.packs.length }} packs
      </div>
    </div>

    <div class="footer">
      <button class="view-btn" @click.stop="emit('select', game)">
        Ver packs <span class="arrow">→</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.currency-card {
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.currency-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.42);
  border-color: rgba(var(--accent-rgb, 99, 245, 210), 0.3);
}

.cover {
  position: relative;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at center, color-mix(in srgb, v-bind('game.color') 20%, transparent), transparent 70%),
    linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  overflow: hidden;
}

.game-logo {
  max-height: 80px;
  max-width: 80%;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
  transition: transform 0.3s ease;
}

.currency-card:hover .game-logo {
  transform: scale(1.06);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 14px;
  background: linear-gradient(to top, rgba(7,17,31,0.9), transparent);
}

.company-badge {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: v-bind('game.color');
}

.body {
  padding: 18px 18px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.game-name {
  margin: 0;
  font-size: 1.05rem;
  font-family: var(--font-display);
  line-height: 1.3;
}

.currency-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.currency-icon {
  font-size: 1.1rem;
}

.currency-name {
  font-size: 0.88rem;
  color: var(--muted);
  font-weight: 600;
}

.price-range {
  font-size: 0.85rem;
  color: var(--muted);
  margin-top: 4px;
}

.price-range strong {
  color: var(--accent);
  font-family: var(--font-display);
}

.footer {
  padding: 12px 18px 18px;
}

.view-btn {
  width: 100%;
  padding: 11px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text);
  font-weight: 700;
  font-size: 0.9rem;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.currency-card:hover .view-btn {
  background: color-mix(in srgb, v-bind('game.color') 15%, transparent);
  border-color: v-bind('game.color');
  color: v-bind('game.color');
}

.arrow {
  display: inline-block;
  transition: transform 0.2s;
}

.currency-card:hover .arrow {
  transform: translateX(4px);
}
</style>
