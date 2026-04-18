<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { games } from '../data/games'

const router = useRouter()
const products = ref(games)
const search = ref('')
const category = ref('all')

const categories = computed(() => ['all', ...new Set(products.value.map((p) => p.category))])

const filtered = computed(() => {
  let result = products.value
  if (category.value !== 'all') {
    result = result.filter((p) => p.category === category.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }
  return result
})

const goToCoins = (id) => router.push(`/game/${id}/coins`)
const clearSearch = () => { search.value = ''; category.value = 'all' }
</script>

<template>
  <section class="page-shell page-section products-page">

    <!-- Hero / Filters bar -->
    <div class="products-hero glass-panel">
      <div>
        <span class="eyebrow">Catalogo gamer</span>
        <h1 class="section-title">Encuentra tu proxima aventura</h1>
        <p class="section-copy">
          Busca entre {{ products.length }} títulos o filtra por categoría.
        </p>
      </div>

      <div class="filters-panel">
        <!-- Search -->
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input
            id="products-search"
            v-model="search"
            type="search"
            placeholder="Buscar juego…"
            class="search-input"
          />
          <button
            v-if="search"
            class="clear-btn"
            aria-label="Limpiar búsqueda"
            @click="search = ''"
          >×</button>
        </div>

        <!-- Category select -->
        <label class="filter-panel">
          <span>Categoría</span>
          <select v-model="category" id="products-category">
            <option v-for="c in categories" :key="c" :value="c">
              {{ c === 'all' ? 'Todas las categorías' : c }}
            </option>
          </select>
        </label>
      </div>
    </div>

    <!-- Results bar -->
    <div class="results-bar">
      <span class="tag">{{ filtered.length }} juego{{ filtered.length !== 1 ? 's' : '' }} visibles</span>
      <span class="results-copy">
        <template v-if="search">Buscando: "{{ search }}" — </template>
        {{ category === 'all' ? 'Todo el catálogo' : `Categoría: ${category}` }}
      </span>
      <button v-if="search || category !== 'all'" class="btn btn-secondary reset-btn" @click="clearSearch">
        Limpiar filtros
      </button>
    </div>

    <!-- Empty state -->
    <div v-if="filtered.length === 0" class="no-results glass-panel">
      <span style="font-size: 2.8rem">🎮</span>
      <h2>Sin resultados</h2>
      <p class="section-copy">No encontramos juegos con esos filtros.</p>
      <button class="btn btn-primary" @click="clearSearch">Ver todos</button>
    </div>

    <!-- Grid -->
    <div v-else class="grid">
      <div v-for="p in filtered" :key="p.id" class="card-wrapper">
        <ProductCard :product="p" />
        <button class="coins-shortcut" @click.stop="goToCoins(p.id)" title="Ver ofertas de monedas">
          🪙 Monedas
        </button>
      </div>
    </div>

  </section>
</template>

<style scoped>
.products-page {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.products-hero {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  padding: 28px;
  border-radius: 28px;
  flex-wrap: wrap;
}

.products-hero .section-copy {
  margin-top: 14px;
  max-width: 36rem;
}

/* Filters */
.filters-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 260px;
}

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
  border-color: rgba(99, 245, 210, 0.35);
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

.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
  font-size: 0.92rem;
}

.filter-panel span {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.74rem;
}

.filter-panel select {
  min-height: 52px;
  padding: 0 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(5, 10, 18, 0.96);
  color: var(--text);
  outline: none;
  appearance: none;
  -webkit-appearance: none;
}

.filter-panel select option {
  background: #000;
  color: var(--text);
}

/* Results bar */
.results-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.results-copy {
  color: var(--muted);
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
  min-height: 320px;
  border-radius: 28px;
  text-align: center;
  padding: 40px;
}

.no-results h2 { margin: 0; }

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
}

.card-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Coins shortcut button */
.coins-shortcut {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  width: 100%;
  padding: 10px;
  border-radius: 14px;
  background: rgba(255, 200, 60, 0.08);
  border: 1px solid rgba(255, 200, 60, 0.18);
  color: #ffd04a;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.coins-shortcut:hover {
  background: rgba(255, 200, 60, 0.15);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 860px) {
  .products-hero {
    flex-direction: column;
    align-items: stretch;
    padding: 22px;
  }

  .filters-panel {
    min-width: 100%;
  }
}

@media (max-width: 560px) {
  .products-page { gap: 18px; }
  .products-hero { padding: 18px; border-radius: 22px; }
  .grid { grid-template-columns: 1fr; gap: 18px; }
  .results-bar { align-items: stretch; }
  .results-copy { font-size: 0.9rem; }
}
</style>
