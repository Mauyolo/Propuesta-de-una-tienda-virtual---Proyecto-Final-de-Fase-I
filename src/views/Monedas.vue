<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../store/cart'
import { gameCoinsCatalog, companies } from '../data/gameCoins'
import CurrencyCard from '../components/CurrencyCard.vue'

const cart = useCartStore()

// ── Filtros ────────────────────────────────────────────────────
const search = ref('')
const selectedCompany = ref('all')

const filtered = computed(() => {
  let list = gameCoinsCatalog
  if (selectedCompany.value !== 'all') {
    list = list.filter(g => g.company === selectedCompany.value)
  }
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      g =>
        g.game.toLowerCase().includes(q) ||
        g.currency.toLowerCase().includes(q) ||
        g.company.toLowerCase().includes(q)
    )
  }
  return list
})

// ── Modal de packs ─────────────────────────────────────────────
const selectedGame = ref(null)
const openModal  = (game) => { selectedGame.value = game }
const closeModal = () => { selectedGame.value = null }

const addPack = (pack, game) => {
  cart.addToCart({
    id: pack.id,
    title: `${game.currency} — ${pack.label}`,
    price: pack.price,
    image: game.image,
    type: 'coin',
    game: game.game,
    company: game.company
  })
}

// ── Compañías para filtro ──────────────────────────────────────
const companyFilters = [{ key: 'all', label: 'Todas' }, ...companies.map(c => ({ key: c, label: c }))]
</script>

<template>
  <section class="page-shell page-section monedas-page">

    <!-- Header -->
    <div class="monedas-hero glass-panel">
      <div class="hero-text">
        <span class="eyebrow">🪙 Monedas virtuales</span>
        <h1 class="section-title">Recarga tus juegos favoritos</h1>
        <p class="section-copy">
          Genesis Crystals, Riot Points, V-Bucks y más. Elige el pack perfecto para cada juego.
        </p>
      </div>

      <div class="hero-search-wrap">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input
            id="monedas-search"
            v-model="search"
            type="search"
            placeholder="Buscar juego o moneda…"
            class="search-input"
          />
          <button v-if="search" class="clear-btn" aria-label="Limpiar" @click="search = ''">×</button>
        </div>
      </div>
    </div>

    <!-- Filtros por empresa -->
    <div class="filter-bar">
      <span class="filter-label">Empresa:</span>
      <div class="filter-tabs">
        <button
          v-for="f in companyFilters"
          :key="f.key"
          class="filter-tab"
          :class="{ active: selectedCompany === f.key }"
          @click="selectedCompany = f.key"
        >
          {{ f.label }}
        </button>
      </div>
    </div>

    <!-- Resultados -->
    <div class="results-bar">
      <span class="tag">{{ filtered.length }} juego{{ filtered.length !== 1 ? 's' : '' }}</span>
      <span v-if="search || selectedCompany !== 'all'" class="results-text">
        {{ selectedCompany !== 'all' ? `Empresa: ${selectedCompany}` : 'Todas las empresas' }}
        <template v-if="search"> · "{{ search }}"</template>
      </span>
      <button
        v-if="search || selectedCompany !== 'all'"
        class="btn btn-secondary reset-btn"
        @click="search = ''; selectedCompany = 'all'"
      >
        Limpiar
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="filtered.length === 0" class="no-results glass-panel">
      <span style="font-size: 3rem">🪙</span>
      <h2>Sin resultados</h2>
      <p class="section-copy">No encontramos monedas con esos filtros.</p>
      <button class="btn btn-primary" @click="search = ''; selectedCompany = 'all'">Ver todas</button>
    </div>

    <!-- Grid de monedas -->
    <div v-else class="coins-grid">
      <CurrencyCard
        v-for="game in filtered"
        :key="game.id"
        :game="game"
        @select="openModal"
      />
    </div>

    <!-- Modal de packs -->
    <Transition name="modal">
      <div v-if="selectedGame" class="modal-overlay" @click.self="closeModal">
        <div class="modal glass-panel" role="dialog" :aria-label="`Packs de ${selectedGame.game}`">

          <button class="modal-close" aria-label="Cerrar" @click="closeModal">×</button>

          <div class="modal-header" :style="{ '--gcolor': selectedGame.color }">
            <div class="modal-cover">
              <img :src="selectedGame.image" :alt="selectedGame.game" class="modal-logo" />
            </div>
            <div>
              <span class="company-pill" :style="{ color: selectedGame.color }">
                {{ selectedGame.company }}
              </span>
              <h2 class="modal-game-title">{{ selectedGame.game }}</h2>
              <div class="modal-currency">
                {{ selectedGame.currencySymbol }} {{ selectedGame.currency }}
              </div>
            </div>
          </div>

          <div class="packs-grid">
            <article
              v-for="pack in selectedGame.packs"
              :key="pack.id"
              class="pack-card"
              :class="{ popular: pack.popular }"
            >
              <div v-if="pack.popular" class="popular-ribbon">⭐ Más popular</div>
              <div class="pack-amount">
                {{ selectedGame.currencySymbol }}
                <strong>{{ pack.amount.toLocaleString() }}</strong>
              </div>
              <div v-if="pack.bonus" class="pack-bonus">+{{ pack.bonus.toLocaleString() }} bonus</div>
              <div class="pack-label">{{ pack.label }}</div>
              <div class="pack-price">${{ pack.price.toFixed(2) }}</div>
              <button class="btn btn-primary pack-btn" @click="addPack(pack, selectedGame)">
                Agregar
              </button>
            </article>
          </div>

        </div>
      </div>
    </Transition>

  </section>
</template>

<style scoped>
.monedas-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Hero */
.monedas-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  padding: 32px;
  border-radius: 28px;
  flex-wrap: wrap;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.hero-search-wrap {
  min-width: 280px;
  flex: 1;
  max-width: 380px;
}

/* Search */
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  font-size: 1rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  min-height: 52px;
  padding: 0 44px 0 42px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(5, 10, 18, 0.96);
  color: var(--text);
  font-size: 0.98rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: rgba(255, 208, 74, 0.4);
}

.search-input::-webkit-search-cancel-button { display: none; }

.clear-btn {
  position: absolute;
  right: 12px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
  font-size: 1.1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Filter bar */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-label {
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.filter-tabs {
  display: flex;
  gap: 10px;
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
  background: rgba(255, 208, 74, 0.12);
  border-color: rgba(255, 208, 74, 0.35);
  color: #ffd04a;
}

/* Results bar */
.results-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.results-text {
  color: var(--muted);
  font-size: 0.92rem;
  flex: 1;
}

.reset-btn {
  padding: 0 16px;
  min-height: 38px;
  font-size: 0.88rem;
}

/* No results */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 280px;
  border-radius: 28px;
  text-align: center;
  padding: 40px;
}

.no-results h2 { margin: 0; }

/* Grid */
.coins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 22px;
}

/* ── Modal ───────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(3, 10, 20, 0.82);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal {
  position: relative;
  width: min(760px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 28px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  scrollbar-width: thin;
}

.modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  color: var(--text);
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.modal-close:hover {
  background: rgba(255,255,255,0.16);
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 24px;
}

.modal-cover {
  width: 80px;
  height: 80px;
  border-radius: 18px;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-logo {
  max-width: 70px;
  max-height: 70px;
  object-fit: contain;
}

.company-pill {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 8px;
}

.modal-game-title {
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 1.7rem;
  letter-spacing: -0.03em;
}

.modal-currency {
  color: var(--muted);
  font-size: 0.95rem;
}

/* Packs grid */
.packs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}

.pack-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 22px 16px 18px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  text-align: center;
  transition: border-color 0.2s, transform 0.2s, background 0.2s;
}

.pack-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.06);
}

.pack-card.popular {
  border-color: rgba(99, 245, 210, 0.4);
  background: rgba(99, 245, 210, 0.05);
}

.popular-ribbon {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 4px 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), #8cf7de);
  color: #031018;
  font-size: 0.7rem;
  font-weight: 800;
}

.pack-amount {
  font-size: 1rem;
  color: var(--muted);
}

.pack-amount strong {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--text);
  display: block;
}

.pack-bonus {
  font-size: 0.78rem;
  color: var(--accent-warm);
  background: rgba(255, 140, 90, 0.1);
  border: 1px solid rgba(255, 140, 90, 0.2);
  padding: 3px 10px;
  border-radius: 999px;
  font-weight: 700;
}

.pack-label {
  font-size: 0.78rem;
  color: var(--muted);
  word-break: break-word;
}

.pack-price {
  font-family: var(--font-display);
  color: var(--accent);
  font-size: 1.4rem;
  letter-spacing: -0.04em;
}

.pack-btn {
  width: 100%;
  min-height: 40px;
  font-size: 0.9rem;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(12px);
}

/* Responsive */
@media (max-width: 860px) {
  .monedas-hero {
    flex-direction: column;
    align-items: stretch;
    padding: 22px;
  }

  .hero-search-wrap {
    max-width: 100%;
  }
}

@media (max-width: 560px) {
  .coins-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .packs-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .modal {
    padding: 22px 16px;
  }

  .modal-header {
    flex-direction: column;
    text-align: center;
  }
}
</style>
