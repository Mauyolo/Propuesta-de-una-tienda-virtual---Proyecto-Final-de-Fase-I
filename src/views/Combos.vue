<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cart'
import { combos } from '../data/combos'
import ComboCard from '../components/ComboCard.vue'

const cart = useCartStore()
const filter = ref('all')

const filtered = computed(() => {
  if (filter.value === 'all') return combos
  if (filter.value === 'game')
    return combos.filter(
      c => !c.items.some(i => i.includes('Coins') || i.includes('Monedas') || i.includes('NitroCoins'))
    )
  return combos.filter(
    c => c.items.some(i => i.includes('Coins') || i.includes('Monedas') || i.includes('NitroCoins'))
  )
})

const addCombo = (combo) => {
  cart.addToCart({ ...combo, id: combo.id })
}
</script>

<template>
  <section class="page-shell page-section combos-page">

    <!-- Header -->
    <div class="combos-hero glass-panel">
      <div>
        <span class="eyebrow">🔥 Ofertas especiales</span>
        <h1 class="section-title">Combos y Bundles</h1>
        <p class="section-copy">
          Ahorra comprando paquetes combinados de juegos, monedas y colecciones especiales. Descuentos de hasta el 20%.
        </p>
      </div>
      <div class="filter-tabs">
        <button
          v-for="f in [{ key: 'all', label: 'Todos' }, { key: 'game', label: 'Solo juegos' }, { key: 'coin', label: 'Con monedas' }]"
          :key="f.key"
          class="filter-tab"
          :class="{ active: filter === f.key }"
          @click="filter = f.key"
        >
          {{ f.label }}
        </button>
      </div>
    </div>

    <!-- Results -->
    <div class="results-bar">
      <span class="tag">{{ filtered.length }} combo{{ filtered.length !== 1 ? 's' : '' }}</span>
      <router-link to="/monedas" class="monedas-link">
        🪙 Ver monedas por separado →
      </router-link>
    </div>

    <!-- Grid de combos -->
    <div class="combos-grid">
      <ComboCard
        v-for="combo in filtered"
        :key="combo.id"
        :combo="combo"
        @add="addCombo"
      />
    </div>

  </section>
</template>

<style scoped>
.combos-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.combos-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 28px;
  padding: 32px;
  border-radius: 28px;
  flex-wrap: wrap;
}

.combos-hero .section-copy {
  margin-top: 14px;
  max-width: 38rem;
}

.filter-tabs {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: var(--muted);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.filter-tab:hover,
.filter-tab.active {
  background: rgba(99, 245, 210, 0.12);
  border-color: rgba(99, 245, 210, 0.3);
  color: var(--accent);
}

.results-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.monedas-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffd04a;
  text-decoration: none;
  transition: opacity 0.2s;
}

.monedas-link:hover {
  opacity: 0.8;
}

.combos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .combos-hero {
    padding: 22px;
    flex-direction: column;
    align-items: stretch;
  }

  .combos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
